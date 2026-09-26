from pathlib import Path
import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.domain.packaging import (
    BooleanInput,
    CandidateArticle,
    Component,
    MassInput,
    FractionInput,
    OperationalRequirements,
    Package,
    PackageCapabilities,
    Portfolio,
    Provenance,
    SelectionMetadata,
    SelectionRequest,
    TemperatureInput,
)
from app.main import DEFAULT_EVIDENCE, DEFAULT_PORTFOLIOS, create_app
from app.services.selection import (
    assess_comparability,
    calculate_annual_impact,
    calculate_article_virgin_plastic,
    calculate_transition_delta,
    determine_next_action,
    evaluate_operational_eligibility,
    evaluate_portfolio,
    resolve_requirements,
)


# --- Helper Fixture Authoring ---


def make_provenance(origin="MANUFACTURER_SUPPLIED", verification="SOURCE_AVAILABLE", ref="doc:1", note="Note"):
    return Provenance(
        origin=origin,
        verification_state=verification,
        source_reference=ref,
        note=note,
    )


def make_component(comp_id="tray", mass=25.0, pcr=0.0, origin="MANUFACTURER_SUPPLIED", verification="SOURCE_AVAILABLE"):
    return Component(
        id=comp_id,
        material="Plastic",
        plastic_mass_g=MassInput(
            value=mass,
            provenance=make_provenance(origin=origin, verification=verification),
        ),
        recycled_content_fraction=FractionInput(
            value=pcr,
            provenance=make_provenance(origin=origin, verification=verification),
        ),
    )


def make_package(pkg_id, label, mass=25.0, pcr=0.0, max_temp=100.0, mw_safe=True, verification="SOURCE_AVAILABLE"):
    caps = PackageCapabilities(
        max_temperature_c=TemperatureInput(
            value=max_temp,
            provenance=make_provenance(verification=verification),
        ) if max_temp is not None else None,
        microwave_safe=BooleanInput(
            value=mw_safe,
            provenance=make_provenance(verification=verification),
        ) if mw_safe is not None else None,
    )
    return Package(
        id=pkg_id,
        label=label,
        components=[make_component(comp_id="body", mass=mass, pcr=pcr, verification=verification)],
        capabilities=caps,
    )


def make_candidate_article(
    pkg_id, label, mass=25.0, pcr=0.0, max_temp=100.0, mw_safe=True,
    boundary="TRAY_BODY_ONLY", point_status="EXACT_POINT_VALUE", verification="SOURCE_AVAILABLE"
):
    pkg = make_package(pkg_id, label, mass, pcr, max_temp, mw_safe, verification=verification)
    meta = SelectionMetadata(
        component_boundary=boundary,
        recycled_content_point_value_status=point_status,
        recycled_content_scope="TOTAL_PCR",
        evidence_date="2024-01-01",
    )
    return CandidateArticle(package=pkg, metadata=meta)


def make_portfolio(baseline, candidates, req_temp=95.0, req_mw=True, req_ver="NOT_VERIFIED", req_origin="ASSUMED"):
    reqs = OperationalRequirements(
        max_temperature_c=TemperatureInput(
            value=req_temp,
            provenance=make_provenance(origin=req_origin, verification=req_ver),
        ) if req_temp is not None else None,
        microwave_safe=BooleanInput(
            value=req_mw,
            provenance=make_provenance(origin=req_origin, verification=req_ver),
        ) if req_mw is not None else None,
    )
    return Portfolio(
        id="test-portfolio",
        label="Test Portfolio",
        use_context="Single-portion prepared food",
        dataset_kind="PUBLIC",
        disclosure="Test disclosure",
        baseline=baseline,
        candidates=candidates,
        default_operational_requirements=reqs,
    )


# --- 1. Positive Truth Table Tests (P-01 to P-07) ---


def test_truth_table_p01_complete_numeric_verified_satisfied():
    """P-01: Complete numeric inputs, Satisfies all constraints, VERIFIED reqs + VERIFIED candidate.
    Outcome: CALCULATED, ELIGIBLE, ADVANCE_TO_QA_REVIEW, actionable annual impact."""
    base = make_candidate_article("base", "Baseline", mass=30.0, pcr=0.0, verification="VERIFIED")
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=0.5, max_temp=120.0, mw_safe=True, verification="VERIFIED")
    port = make_portfolio(base, [cand], req_temp=100.0, req_mw=True, req_ver="VERIFIED", req_origin="USER_PROVIDED")

    resp = evaluate_portfolio(port, SelectionRequest(annual_units=10000))
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "CALCULATED"
    assert c_res.calculation.reduction_g == 20.0  # 30 - 10
    assert c_res.calculation.reduction_pct == pytest.approx(66.6667, rel=1e-3)
    assert c_res.eligibility.status == "ELIGIBLE"
    assert c_res.next_action.action_code == "ADVANCE_TO_QA_REVIEW"
    assert c_res.annual_impact is not None
    assert c_res.annual_impact.is_actionable is True
    assert c_res.annual_impact.annual_reduction_kg == 200.0  # 20g * 10000 / 1000


def test_truth_table_p02_complete_numeric_assumed_reqs_satisfied():
    """P-02: Complete numeric inputs, Satisfies all constraints, ASSUMED/NOT_VERIFIED reqs + SOURCE_AVAILABLE candidate.
    Outcome: CALCULATED, REVIEW_REQUIRED, VERIFY_OPERATIONAL_PREMISES, actionable annual impact."""
    base = make_candidate_article("base", "Baseline", mass=30.0, pcr=0.0, verification="SOURCE_AVAILABLE")
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=0.5, max_temp=120.0, mw_safe=True, verification="SOURCE_AVAILABLE")
    port = make_portfolio(base, [cand], req_temp=95.0, req_mw=True, req_ver="NOT_VERIFIED", req_origin="ASSUMED")

    resp = evaluate_portfolio(port, SelectionRequest(annual_units=5000))
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "CALCULATED"
    assert c_res.eligibility.status == "REVIEW_REQUIRED"
    assert c_res.next_action.action_code == "VERIFY_OPERATIONAL_PREMISES"
    assert c_res.annual_impact is not None
    assert c_res.annual_impact.is_actionable is True
    assert c_res.annual_impact.annual_reduction_kg == 100.0


def test_truth_table_p03_complete_numeric_violates_constraint():
    """P-03: Complete numeric inputs, Violates constraint (70°C < 95°C).
    Outcome: CALCULATED, BLOCKED, REJECT_INCOMPATIBLE, theoretical annual impact (is_actionable=False)."""
    base = make_candidate_article("base", "Baseline", mass=30.0, pcr=0.0)
    cand = make_candidate_article("cand", "Candidate", mass=15.0, pcr=0.5, max_temp=70.0, mw_safe=True)
    port = make_portfolio(base, [cand], req_temp=95.0, req_mw=True)

    resp = evaluate_portfolio(port, SelectionRequest(annual_units=10000))
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "CALCULATED"
    assert c_res.calculation.reduction_g == 22.5  # 30 - 7.5
    assert c_res.eligibility.status == "BLOCKED"
    assert c_res.next_action.action_code == "REJECT_INCOMPATIBLE"
    assert c_res.annual_impact is not None
    assert c_res.annual_impact.status == "CALCULATED"
    assert c_res.annual_impact.is_actionable is False
    assert "Theoretical annual saving only" in c_res.annual_impact.disclosure


def test_truth_table_p04_incomplete_numeric_satisfies_constraints():
    """P-04: Incomplete numeric inputs (PCR unknown), Satisfies constraints (220°C >= 95°C, MW).
    Outcome: INSUFFICIENT_DATA, REVIEW_REQUIRED, REQUEST_PCR_EVIDENCE, annual_impact unavailable/null."""
    base = make_candidate_article("base", "Baseline", mass=26.29, pcr=0.0)
    cand = make_candidate_article("cand-a", "Candidate A", mass=21.38, pcr=None, max_temp=220.0, mw_safe=True, point_status="NON_POINT_VALUE")
    port = make_portfolio(base, [cand], req_temp=95.0, req_mw=True)

    resp = evaluate_portfolio(port, SelectionRequest(annual_units=250000))
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "INSUFFICIENT_DATA"
    assert c_res.calculation.reduction_g is None
    assert c_res.eligibility.status == "REVIEW_REQUIRED"
    assert c_res.next_action.action_code == "REQUEST_PCR_EVIDENCE"
    assert c_res.annual_impact is not None
    assert c_res.annual_impact.status == "INSUFFICIENT_DATA"
    assert c_res.annual_impact.annual_reduction_kg is None
    assert c_res.annual_impact.is_actionable is False


def test_truth_table_p05_incomplete_numeric_violates_constraint():
    """P-05: Incomplete numeric inputs (PCR unknown), Violates constraint (70°C < 95°C).
    Outcome: INSUFFICIENT_DATA, BLOCKED, REJECT_INCOMPATIBLE, annual_impact unavailable/null."""
    base = make_candidate_article("base", "Baseline", mass=26.29, pcr=0.0)
    cand = make_candidate_article("cand-b", "Candidate B", mass=21.48, pcr=None, max_temp=70.0, mw_safe=None, point_status="UNSTATED")
    port = make_portfolio(base, [cand], req_temp=95.0, req_mw=True)

    resp = evaluate_portfolio(port, SelectionRequest(annual_units=250000))
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "INSUFFICIENT_DATA"
    assert c_res.eligibility.status == "BLOCKED"
    assert c_res.next_action.action_code == "REJECT_INCOMPATIBLE"
    assert c_res.annual_impact is not None
    assert c_res.annual_impact.status == "INSUFFICIENT_DATA"
    assert c_res.annual_impact.annual_reduction_kg is None


def test_truth_table_p06_complete_numeric_unmodeled_requirements():
    """P-06: Complete numeric inputs, Operational requirements completely unmodeled (None).
    Outcome: CALCULATED, REVIEW_REQUIRED, VERIFY_OPERATIONAL_PREMISES, actionable annual impact."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0)
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=0.2)
    port = Portfolio(
        id="port-unmodeled",
        label="Unmodeled Portfolio",
        use_context="General packaging",
        dataset_kind="PUBLIC",
        disclosure="Disclosure",
        baseline=base,
        candidates=[cand],
        default_operational_requirements=None,
    )

    resp = evaluate_portfolio(port, SelectionRequest(annual_units=10000))
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "CALCULATED"
    assert c_res.eligibility.status == "REVIEW_REQUIRED"
    assert c_res.next_action.action_code == "VERIFY_OPERATIONAL_PREMISES"
    assert c_res.annual_impact is not None
    assert c_res.annual_impact.is_actionable is True


def test_truth_table_p07_complete_numeric_negative_environmental_delta():
    """P-07: Complete numeric inputs, Candidate virgin > Baseline virgin (Delta < 0).
    Outcome: CALCULATED (Delta < 0), REVIEW_REQUIRED, VERIFY_OPERATIONAL_PREMISES, actionable annual impact."""
    base = make_candidate_article("base", "Baseline", mass=20.0, pcr=0.0)
    cand = make_candidate_article("cand-heavy", "Heavier Candidate", mass=25.0, pcr=0.0, max_temp=120.0, mw_safe=True)
    port = make_portfolio(base, [cand], req_temp=95.0, req_mw=True)

    resp = evaluate_portfolio(port, SelectionRequest(annual_units=1000))
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "CALCULATED"
    assert c_res.calculation.reduction_g == -5.0
    assert c_res.calculation.reduction_pct == -25.0
    assert c_res.eligibility.status == "REVIEW_REQUIRED"
    assert c_res.next_action.action_code == "VERIFY_OPERATIONAL_PREMISES"
    assert c_res.annual_impact is not None
    assert c_res.annual_impact.annual_reduction_kg == -5.0
    assert c_res.annual_impact.is_actionable is True


# --- 2. Negative & Edge Truth Table Tests (N-01 to N-12) ---


def test_negative_n01_candidate_recycled_fraction_is_none():
    """N-01: Candidate recycled fraction is None -> withhold calculation, missing_fields listed."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0)
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=None, point_status="UNSTATED")
    port = make_portfolio(base, [cand])

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "INSUFFICIENT_DATA"
    assert c_res.calculation.reduction_g is None
    assert any("recycled_content_fraction" in f for f in c_res.calculation.missing_fields)


def test_negative_n02_candidate_non_point_value_status():
    """N-02: Candidate recycled fraction has recycled_content_point_value_status = 'NON_POINT_VALUE'.
    Even if fraction is set to 0.70, it must be withheld rather than ingested as exact point value."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0)
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=0.7, point_status="NON_POINT_VALUE")
    port = make_portfolio(base, [cand])

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "INSUFFICIENT_DATA"
    assert c_res.calculation.reduction_g is None


def test_negative_n03_baseline_virgin_plastic_zero():
    """N-03: Baseline virgin plastic = 0 -> reduction_g computed, reduction_pct is None (avoid div by zero)."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=1.0)
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=0.5)
    port = make_portfolio(base, [cand])

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "CALCULATED"
    assert c_res.calculation.current_virgin_pack_g == 0.0
    assert c_res.calculation.candidate_virgin_pack_g == 10.0
    assert c_res.calculation.reduction_g == -10.0
    assert c_res.calculation.reduction_pct is None


def test_negative_n04_negative_delta_reported_without_truncation():
    """N-04: Negative environmental delta (candidate virgin > current virgin) reported without truncation."""
    base = make_candidate_article("base", "Baseline", mass=10.0, pcr=0.0)
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=0.0)
    port = make_portfolio(base, [cand])

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.calculation.reduction_g == -10.0
    assert c_res.calculation.reduction_pct == -100.0


def test_negative_n05_annual_units_absent():
    """N-05: annual_units absent or null -> annual_impact is None."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0)
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=0.5)
    port = make_portfolio(base, [cand])

    resp = evaluate_portfolio(port, SelectionRequest(annual_units=None))
    c_res = resp.candidates[0]

    assert c_res.annual_impact is None
    assert resp.annual_units_requested is None


def test_negative_n06_annual_units_provided_with_insufficient_data():
    """N-06: annual_units provided, but calculation is INSUFFICIENT_DATA -> annual numerics remain None."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0)
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=None)
    port = make_portfolio(base, [cand])

    resp = evaluate_portfolio(port, SelectionRequest(annual_units=50000))
    c_res = resp.candidates[0]

    assert c_res.annual_impact is not None
    assert c_res.annual_impact.status == "INSUFFICIENT_DATA"
    assert c_res.annual_impact.annual_reduction_kg is None
    assert c_res.annual_impact.annual_current_virgin_kg is None
    assert c_res.annual_impact.annual_candidate_virgin_kg is None
    assert c_res.annual_impact.is_actionable is False


def test_negative_n07_annual_units_non_positive_validation():
    """N-07: annual_units <= 0 fails Pydantic validation."""
    with pytest.raises(ValidationError):
        SelectionRequest(annual_units=0)
    with pytest.raises(ValidationError):
        SelectionRequest(annual_units=-10)


def test_negative_n08_candidate_capability_missing_when_required():
    """N-08: Candidate capability missing (e.g. microwave None) when required -> REVIEW_REQUIRED."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0)
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=0.5, max_temp=120.0, mw_safe=None)
    port = make_portfolio(base, [cand], req_mw=True)

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.eligibility.status == "REVIEW_REQUIRED"
    assert any(c.constraint_id == "microwave-reheating-incompatibility" for c in c_res.eligibility.constraints)


def test_negative_n09_operating_requirement_present_but_value_null():
    """N-09: Operating requirement present but value is null -> REVIEW_REQUIRED."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0)
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=0.5, max_temp=120.0, mw_safe=True)
    reqs = OperationalRequirements(
        max_temperature_c=TemperatureInput(
            value=None,
            provenance=make_provenance(verification="NOT_VERIFIED"),
        )
    )
    port = Portfolio(
        id="port-null-req",
        label="Null Req Portfolio",
        use_context="Context",
        dataset_kind="PUBLIC",
        disclosure="Disclosure",
        baseline=base,
        candidates=[cand],
        default_operational_requirements=reqs,
    )

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.eligibility.status == "REVIEW_REQUIRED"
    assert any(c.constraint_id == "thermal-envelope-verification" for c in c_res.eligibility.constraints)


def test_negative_n10_component_boundary_mismatch_withheld_delta():
    """N-10: Component boundary mismatch (TRAY_BODY_ONLY vs HINGED_COMPLETE_PACK)
    -> ASYMMETRIC_BOUNDARY, transition delta withheld (None), package totals remain visible."""
    base = make_candidate_article("base", "Baseline", mass=26.29, pcr=0.0, boundary="TRAY_BODY_ONLY")
    cand = make_candidate_article("cand", "Candidate", mass=23.50, pcr=0.5, boundary="HINGED_COMPLETE_PACK")
    port = make_portfolio(base, [cand])

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.comparability.rating == "ASYMMETRIC_BOUNDARY"
    assert c_res.comparability.boundary_match is False
    assert c_res.calculation.status == "INSUFFICIENT_DATA"
    assert c_res.calculation.reduction_g is None
    assert c_res.calculation.reduction_pct is None
    # Individual package virgin masses remain visible
    assert c_res.calculation.current_virgin_pack_g == 26.29
    assert c_res.calculation.candidate_virgin_pack_g == 11.75


def test_negative_n11_empty_candidate_components_fails_validation():
    """N-11: Empty candidate components list raises validation error."""
    with pytest.raises(ValidationError):
        Package(id="empty-pkg", label="Empty", components=[])


def test_negative_n12_empty_portfolio_candidates_fails_validation():
    """N-12: Empty portfolio candidates list raises validation error."""
    base = make_candidate_article("base", "Baseline")
    with pytest.raises(ValidationError):
        Portfolio(
            id="empty-cand-port",
            label="Empty Portfolio",
            use_context="Context",
            dataset_kind="PUBLIC",
            disclosure="Disclosure",
            baseline=base,
            candidates=[],
        )


# --- 3. Selection Semantics & Grouping Tests (D7) ---


def test_decision_grouping_preserves_catalog_order_within_groups():
    """D7: Group 1 (Not BLOCKED + CALCULATED), Group 2 (Not BLOCKED + INSUFFICIENT_DATA),
    Group 3 (BLOCKED). Catalog order is preserved within each group, and no ranking scores exist."""
    base = make_candidate_article("base", "Baseline", mass=30.0, pcr=0.0)
    # Order in catalog:
    # 1. cand_blocked (BLOCKED -> Group 3)
    cand_blocked = make_candidate_article("cand-blocked", "Blocked", mass=15.0, pcr=0.5, max_temp=50.0)
    # 2. cand_viable1 (Viable + Calculated -> Group 1)
    cand_viable1 = make_candidate_article("cand-viable-1", "Viable 1", mass=20.0, pcr=0.2, max_temp=120.0)
    # 3. cand_review_nodata (Viable + Insufficient Data -> Group 2)
    cand_review_nodata = make_candidate_article("cand-review-nodata", "Review No Data", mass=18.0, pcr=None, max_temp=120.0)
    # 4. cand_viable2 (Viable + Calculated -> Group 1)
    cand_viable2 = make_candidate_article("cand-viable-2", "Viable 2", mass=22.0, pcr=0.5, max_temp=120.0)

    port = make_portfolio(base, [cand_blocked, cand_viable1, cand_review_nodata, cand_viable2], req_temp=95.0)
    resp = evaluate_portfolio(port)

    ordered_ids = [c.candidate.id for c in resp.candidates]
    # Expected ordering:
    # Group 1: cand-viable-1, cand-viable-2
    # Group 2: cand-review-nodata
    # Group 3: cand-blocked
    assert ordered_ids == ["cand-viable-1", "cand-viable-2", "cand-review-nodata", "cand-blocked"]


# --- 4. API Endpoints Integration Tests (TestClient) ---


def test_api_get_portfolios_list():
    """Test GET /api/v1/portfolios returns list of curated portfolios."""
    with TestClient(create_app()) as client:
        resp = client.get("/api/v1/portfolios")
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        assert data[0]["id"] == "faerch-deli-trays"
        assert data[0]["dataset_kind"] == "PUBLIC"


def test_api_get_portfolio_default_evaluation():
    """Test GET /api/v1/portfolios/faerch-deli-trays returns default evaluation."""
    with TestClient(create_app()) as client:
        resp = client.get("/api/v1/portfolios/faerch-deli-trays")
        assert resp.status_code == 200
        data = resp.json()
        assert data["portfolio_id"] == "faerch-deli-trays"
        assert data["baseline"]["virgin_plastic_g"] == 26.29
        assert data["baseline"]["calculation_status"] == "CALCULATED"

        candidates = data["candidates"]
        assert len(candidates) == 2

        # Candidate A: C 2200-1L (CPET)
        cand_a = candidates[0]
        assert cand_a["candidate"]["id"] == "faerch-c-2200-1l"
        assert cand_a["calculation"]["status"] == "INSUFFICIENT_DATA"
        assert cand_a["eligibility"]["status"] == "REVIEW_REQUIRED"
        assert cand_a["next_action"]["action_code"] == "REQUEST_PCR_EVIDENCE"

        # Candidate B: K 2182-1G (APET)
        cand_b = candidates[1]
        assert cand_b["candidate"]["id"] == "faerch-k-2182-1g"
        assert cand_b["calculation"]["status"] == "INSUFFICIENT_DATA"
        assert cand_b["eligibility"]["status"] == "BLOCKED"
        assert cand_b["next_action"]["action_code"] == "REJECT_INCOMPATIBLE"


def test_api_get_portfolio_not_found():
    """Test GET /api/v1/portfolios/non-existent returns 404."""
    with TestClient(create_app()) as client:
        resp = client.get("/api/v1/portfolios/non-existent-id")
        assert resp.status_code == 404
        assert resp.json()["detail"] == "PORTFOLIO_NOT_FOUND"


def test_api_post_portfolio_evaluate_with_annual_units():
    """Test POST /api/v1/portfolios/faerch-deli-trays/evaluate with annual_units."""
    with TestClient(create_app()) as client:
        body = {"annual_units": 250000}
        resp = client.post("/api/v1/portfolios/faerch-deli-trays/evaluate", json=body)
        assert resp.status_code == 200
        data = resp.json()
        assert data["annual_units_requested"] == 250000

        # Since Candidate A and B have INSUFFICIENT_DATA, annual reduction is None
        for c in data["candidates"]:
            assert c["annual_impact"]["status"] == "INSUFFICIENT_DATA"
            assert c["annual_impact"]["annual_reduction_kg"] is None
            assert c["annual_impact"]["is_actionable"] is False


def test_api_post_portfolio_evaluate_with_user_overrides():
    """Test POST /api/v1/portfolios/faerch-deli-trays/evaluate with user temperature override."""
    with TestClient(create_app()) as client:
        # Override required max temp to 60°C (now Candidate B at 70°C passes thermal threshold!)
        body = {"required_max_temperature_c": 60.0}
        resp = client.post("/api/v1/portfolios/faerch-deli-trays/evaluate", json=body)
        assert resp.status_code == 200
        data = resp.json()

        # Operational requirement carries USER_PROVIDED provenance
        temp_req = data["operational_requirements"]["max_temperature_c"]
        assert temp_req["value"] == 60.0
        assert temp_req["provenance"]["origin"] == "USER_PROVIDED"
        assert temp_req["provenance"]["verification_state"] == "NOT_VERIFIED"

        # Candidate B is no longer BLOCKED on thermal envelope (microwave is unknown -> REVIEW_REQUIRED)
        cand_b = next(c for c in data["candidates"] if c["candidate"]["id"] == "faerch-k-2182-1g")
        assert cand_b["eligibility"]["status"] == "REVIEW_REQUIRED"


def test_api_post_portfolio_evaluate_invalid_annual_units():
    """Test POST /api/v1/portfolios/{id}/evaluate with annual_units <= 0 returns 422."""
    with TestClient(create_app()) as client:
        resp = client.post("/api/v1/portfolios/faerch-deli-trays/evaluate", json={"annual_units": 0})
        assert resp.status_code == 422

        resp2 = client.post("/api/v1/portfolios/faerch-deli-trays/evaluate", json={"annual_units": -500})
        assert resp2.status_code == 422
