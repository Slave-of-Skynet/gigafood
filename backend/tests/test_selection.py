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


@pytest.mark.parametrize(
    "candidate_mass, expected_delta, expected_wording",
    [
        (20.0, 0.0, "No annual virgin-plastic reduction (no change)"),
        (25.0, -5.0, "Annual virgin-plastic use increases"),
    ],
    ids=["zero", "negative"],
)
def test_f1_blocked_annual_disclosure_sign(candidate_mass, expected_delta, expected_wording):
    """INT-R3-F1: blocked zero/negative annual deltas are never called savings."""
    base = make_candidate_article("base", "Synthetic baseline", mass=20.0, pcr=0.0)
    cand = make_candidate_article(
        "cand", "Synthetic candidate", mass=candidate_mass, pcr=0.0, max_temp=70.0,
    )
    port = make_portfolio(base, [cand], req_temp=95.0)
    port.dataset_kind = "ILLUSTRATIVE"
    result = evaluate_portfolio(port, SelectionRequest(annual_units=1000)).candidates[0]

    assert result.calculation.status == "CALCULATED"
    assert result.calculation.reduction_g == expected_delta
    assert result.eligibility.status == "BLOCKED"
    annual = result.annual_impact
    assert annual is not None
    assert annual.status == "CALCULATED"
    assert annual.annual_units == 1000
    assert annual.annual_current_virgin_kg == 20.0
    assert annual.annual_candidate_virgin_kg == candidate_mass
    assert annual.annual_reduction_kg == expected_delta
    assert annual.is_actionable is False
    assert "saving" not in annual.disclosure.lower()
    assert expected_wording in annual.disclosure
    assert "operationally blocked" in annual.disclosure
    assert "not actionable under the stated modeled operating context" in annual.disclosure
    assert "Hypothetical scenario based on user-supplied volume" in annual.disclosure
    assert "Not actual Profi purchase volume" in annual.disclosure


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

    # STOP-01 / IGR-R2C: Negative delta must never be described as environmental savings
    assert "savings" not in resp.summary_verdict
    assert "saving" not in resp.summary_verdict.lower()
    assert "do not reduce virgin plastic" in resp.summary_verdict
    assert "virgin-plastic use increases" in resp.summary_verdict


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
    """Test GET /api/v1/portfolios returns list of curated portfolios as summary metadata (Fix 6 / INT-R2 D9)."""
    with TestClient(create_app()) as client:
        resp = client.get("/api/v1/portfolios")
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        summary = data[0]
        assert summary["id"] == "faerch-deli-trays"
        assert summary["label"] == "Faerch Rigid Prepared-Food Trays"
        assert summary["dataset_kind"] == "PUBLIC"
        assert summary["baseline_label"] == "Faerch P 2226-1C Rectangular Tray (PP Grey)"
        assert summary["candidate_count"] == 2
        # Must return summary metadata rather than full candidate inventories
        assert "candidates" not in summary
        assert "baseline" not in summary


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


# --- 5. Fix-Up Targeted Regression & Negative Tests (Fixes 1-7) ---


def test_fix1_arithmetic_matches_acore_unrounded():
    """Fix 1: Proves Selection and A-core arithmetic remain identical for non-trivial fractional inputs.
    Domain/service calculations must not round numbers."""
    from app.services.virgin_plastic import compare, virgin_plastic
    from app.domain.packaging import Scenario

    base = make_candidate_article("base-frac", "Base", mass=26.29, pcr=0.0)
    cand = make_candidate_article("cand-frac", "Cand", mass=21.38, pcr=0.3333333333333333)

    # A-core canonical
    scenario = Scenario(id="scen-frac", label="Frac", current=base.package, candidate=cand.package)
    comp = compare(scenario)

    # Selection service
    port = make_portfolio(base, [cand])
    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    # Virgin calculations must match exactly
    assert resp.baseline.virgin_plastic_g == virgin_plastic(base.package)
    assert c_res.calculation.candidate_virgin_pack_g == virgin_plastic(cand.package)
    assert c_res.calculation.current_virgin_pack_g == comp.current_virgin_pack_g
    assert c_res.calculation.reduction_g == comp.reduction_g
    assert c_res.calculation.reduction_pct == comp.reduction_pct


def test_fix2_unstated_status_with_numeric_pcr_withheld():
    """Fix 2: Point-Value Epistemic Guard.
    When recycled_content_point_value_status is UNSTATED, numeric recycled_content_fraction
    must NOT be used; calculation status must be INSUFFICIENT_DATA."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0)
    # Contradictory evidence: status is UNSTATED, but fraction has 0.40
    cand = make_candidate_article("cand-unstated-num", "Cand Unstated", mass=20.0, pcr=0.4, point_status="UNSTATED")
    port = make_portfolio(base, [cand])

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "INSUFFICIENT_DATA"
    assert c_res.calculation.reduction_g is None
    assert any("recycled_content_fraction" in f for f in c_res.calculation.missing_fields)


def test_fix3a_baseline_missing_data_preserved_in_missing_fields():
    """Fix 3a: Missing baseline calculation input must be represented in missing_fields."""
    base_pkg = Package(
        id="base-no-mass",
        label="Base No Mass",
        components=[make_component("tray", mass=None, pcr=0.0)],
    )
    base = CandidateArticle(
        package=base_pkg,
        metadata=SelectionMetadata(component_boundary="TRAY_BODY_ONLY", recycled_content_point_value_status="EXACT_POINT_VALUE"),
    )
    cand = make_candidate_article("cand", "Candidate", mass=20.0, pcr=0.2)
    port = make_portfolio(base, [cand])

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "INSUFFICIENT_DATA"
    assert any("baseline.components." in f and "plastic_mass_g" in f for f in c_res.calculation.missing_fields)
    assert c_res.next_action.action_code == "VERIFY_OPERATIONAL_PREMISES"
    assert "baseline" in c_res.next_action.details.lower()


def test_fix3b_candidate_mass_missing_routes_to_specification_evidence():
    """Fix 3b: Candidate mass is missing -> missing_fields lists candidate mass, next action routes to capability/spec."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0)
    cand = make_candidate_article("cand-no-mass", "Cand No Mass", mass=None, pcr=0.3, max_temp=120.0, mw_safe=True)
    port = make_portfolio(base, [cand])

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "INSUFFICIENT_DATA"
    assert any("candidate.components." in f and "plastic_mass_g" in f for f in c_res.calculation.missing_fields)
    assert c_res.next_action.action_code == "REQUEST_CAPABILITY_EVIDENCE"
    assert "physical specification" in c_res.next_action.details.lower() or "candidate" in c_res.next_action.details.lower()



def test_fix3c_missing_capability_with_missing_pcr_routes_to_capability():
    """Fix 3c: Missing operational capability combined with missing PCR -> REQUEST_CAPABILITY_EVIDENCE
    must remain reachable even if an environmental calculation gap also exists."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0)
    # Cand has microwave unknown (None) when required, AND PCR is None (UNSTATED)
    cand = make_candidate_article("cand-dual-gap", "Cand Dual Gap", mass=20.0, pcr=None, max_temp=120.0, mw_safe=None, point_status="UNSTATED")
    port = make_portfolio(base, [cand], req_mw=True)

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "INSUFFICIENT_DATA"
    assert c_res.eligibility.status == "REVIEW_REQUIRED"
    assert c_res.next_action.action_code == "REQUEST_CAPABILITY_EVIDENCE"


def test_fix4_custom_boundary_defaults_to_asymmetric_boundary():
    """Fix 4: CUSTOM component boundary defaults to ASYMMETRIC_BOUNDARY, not NOT_COMPARABLE."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0, boundary="TRAY_BODY_ONLY")
    cand = make_candidate_article("cand-custom", "Custom Cand", mass=20.0, pcr=0.2, boundary="CUSTOM")
    port = make_portfolio(base, [cand])

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.comparability.rating == "ASYMMETRIC_BOUNDARY"
    assert c_res.comparability.rating != "NOT_COMPARABLE"
    assert c_res.comparability.boundary_match is False
    assert c_res.calculation.reduction_g is None


def test_fix5_synthetic_summary_verdict_no_hardcoded_leakage():
    """Fix 5: Synthetic portfolio proves summary_verdict does not mention Candidate A/B or thermal
    when those facts are not present."""
    base = make_candidate_article("base", "Baseline Bowl", mass=30.0, pcr=0.0)
    cand1 = make_candidate_article("cand-alpha", "Alpha Box", mass=20.0, pcr=None, max_temp=100.0, mw_safe=True, point_status="NON_POINT_VALUE")
    # cand2 blocked on microwave (not thermal!)
    cand2 = make_candidate_article("cand-beta", "Beta Pouch", mass=15.0, pcr=0.5, max_temp=150.0, mw_safe=False)

    port = make_portfolio(base, [cand1, cand2], req_temp=80.0, req_mw=True)
    resp = evaluate_portfolio(port)

    verdict = resp.summary_verdict
    assert "Candidate A" not in verdict
    assert "Candidate B" not in verdict
    assert "thermal" not in verdict
    assert "Alpha Box" in verdict
    assert "Beta Pouch" in verdict
    assert "microwave" in verdict


def test_fix7_faerch_demo_portfolio_scopes_are_null():
    """Fix 7: Verifies that in data/evidence/selection-portfolios.json, Candidate A and Candidate B
    scopes are null, baseline has FAMILY_CLAIM, and Faerch default verdict communicates correct facts."""
    with TestClient(create_app()) as client:
        resp = client.get("/api/v1/portfolios/faerch-deli-trays")
        assert resp.status_code == 200
        data = resp.json()

        assert data["baseline"]["metadata"]["recycled_content_scope"] == "FAMILY_CLAIM"

        cand_a = next(c for c in data["candidates"] if c["candidate"]["id"] == "faerch-c-2200-1l")
        assert cand_a["metadata"]["recycled_content_scope"] is None

        cand_b = next(c for c in data["candidates"] if c["candidate"]["id"] == "faerch-k-2182-1g")
        assert cand_b["metadata"]["recycled_content_scope"] is None

        # Verify summary communicates CPET needs PCR evidence and APET is blocked
        verdict = data["summary_verdict"]
        assert "Faerch C 2200-1L Evolve CPET Tray" in verdict
        assert "Faerch K 2182-1G Clear APET Tray" in verdict
        assert "thermal incompatibility" in verdict


# --- 8. Negative Environmental Delta Summary Integrity Regression Suite (IGR-R2C / QA-R2A STOP-01: R1 to R5) ---


def test_r1_negative_delta_summary_verdict_truthful():
    """R1: Candidate with valid CALCULATED negative delta (reduction_g < 0).
    Must never be described as providing environmental savings; must communicate that virgin-plastic use increases."""
    base = make_candidate_article("base", "Baseline", mass=20.0, pcr=0.0)
    cand = make_candidate_article("cand-heavy", "Heavier Candidate", mass=25.0, pcr=0.0, max_temp=120.0, mw_safe=True)
    port = make_portfolio(base, [cand], req_temp=95.0, req_mw=True)

    resp = evaluate_portfolio(port, SelectionRequest(annual_units=1000))
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "CALCULATED"
    assert c_res.calculation.reduction_g == -5.0
    assert c_res.calculation.reduction_g < 0

    verdict = resp.summary_verdict
    assert "environmental savings" not in verdict
    assert "saving" not in verdict.lower()
    assert "do not reduce virgin plastic" in verdict
    assert "virgin-plastic use increases" in verdict
    assert "Verification of operational premises required before QA advancement." in verdict


def test_r2_zero_delta_summary_verdict_not_called_saving():
    """R2: Valid CALCULATED zero delta (reduction_g == 0).
    Must not be described as providing environmental savings; must communicate zero reduction."""
    base = make_candidate_article("base", "Baseline", mass=20.0, pcr=0.0)
    cand = make_candidate_article("cand-identical", "Identical Mass Candidate", mass=20.0, pcr=0.0, max_temp=120.0, mw_safe=True)
    port = make_portfolio(base, [cand], req_temp=95.0, req_mw=True)

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "CALCULATED"
    assert c_res.calculation.reduction_g == 0.0

    verdict = resp.summary_verdict
    assert "environmental savings" not in verdict
    assert "saving" not in verdict.lower()
    assert "zero virgin-plastic reduction" in verdict
    assert "no change in virgin-plastic use" in verdict
    assert "Verification of operational premises required before QA advancement." in verdict


def test_r3_positive_delta_summary_verdict_truthful():
    """R3: Valid CALCULATED positive delta (reduction_g > 0).
    Must still receive truthful positive wording regarding environmental savings."""
    base = make_candidate_article("base", "Baseline", mass=25.0, pcr=0.0)
    cand = make_candidate_article("cand-light", "Lighter Candidate", mass=20.0, pcr=0.2, max_temp=120.0, mw_safe=True)
    port = make_portfolio(base, [cand], req_temp=95.0, req_mw=True)

    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]

    assert c_res.calculation.status == "CALCULATED"
    assert c_res.calculation.reduction_g > 0

    verdict = resp.summary_verdict
    assert "1 candidate(s) viable with calculable environmental savings." in verdict
    assert "Verification of operational premises required before QA advancement." in verdict


def test_r4_mixed_group1_summary_verdict_distinguishes_outcomes():
    """R4: Mixed Group 1 portfolio containing at least one positive candidate and one zero/negative candidate.
    Summary must not describe all calculated candidates collectively as environmental savings."""
    base = make_candidate_article("base", "Baseline", mass=20.0, pcr=0.0)
    # cand1 has positive reduction (20g baseline vs 16g candidate -> +4g)
    cand1 = make_candidate_article("cand-pos", "Positive Candidate", mass=16.0, pcr=0.0, max_temp=120.0, mw_safe=True)
    # cand2 has zero reduction (20g vs 20g -> 0g)
    cand2 = make_candidate_article("cand-zero", "Zero Delta Candidate", mass=20.0, pcr=0.0, max_temp=120.0, mw_safe=True)
    # cand3 has negative reduction (20g vs 25g -> -5g)
    cand3 = make_candidate_article("cand-neg", "Negative Delta Candidate", mass=25.0, pcr=0.0, max_temp=120.0, mw_safe=True)

    # 4a: Positive + Negative
    port_pos_neg = make_portfolio(base, [cand1, cand3], req_temp=95.0, req_mw=True)
    resp_pn = evaluate_portfolio(port_pos_neg)
    v_pn = resp_pn.summary_verdict
    assert "2 candidate(s) viable with calculable environmental savings" not in v_pn
    assert "2 candidate(s) viable (1 with calculable environmental savings, 1 with increased virgin-plastic use)." in v_pn

    # 4b: Positive + Zero
    port_pos_zero = make_portfolio(base, [cand1, cand2], req_temp=95.0, req_mw=True)
    resp_pz = evaluate_portfolio(port_pos_zero)
    v_pz = resp_pz.summary_verdict
    assert "2 candidate(s) viable with calculable environmental savings" not in v_pz
    assert "2 candidate(s) viable (1 with calculable environmental savings, 1 with zero virgin-plastic reduction)." in v_pz

    # 4c: Positive + Zero + Negative (full triad)
    port_all = make_portfolio(base, [cand1, cand2, cand3], req_temp=95.0, req_mw=True)
    resp_all = evaluate_portfolio(port_all)
    v_all = resp_all.summary_verdict
    assert "3 candidate(s) viable with calculable environmental savings" not in v_all
    assert "3 candidate(s) viable (1 with calculable environmental savings, 1 with zero virgin-plastic reduction, 1 with increased virgin-plastic use)." in v_all


def test_r5_default_faerch_portfolio_summary_verdict_unchanged():
    """R5: Default Faerch portfolio (Candidate A in Group 2, Candidate B in Group 3).
    Existing safe no-recommendation behavior must remain unchanged in substance."""
    with TestClient(create_app()) as client:
        resp = client.get("/api/v1/portfolios/faerch-deli-trays")
        assert resp.status_code == 200
        data = resp.json()

        verdict = data["summary_verdict"]
        assert verdict.startswith("No candidate is currently recommendable for transition:")
        assert "Faerch C 2200-1L Evolve CPET Tray requires a current SKU/recipe recycled-content declaration with provenance" in verdict
        assert "Faerch K 2182-1G Clear APET Tray is blocked by thermal incompatibility under the stated modeled operating context." in verdict


# --- P0-2 Safe Comparability Truthfulness Tests ---


def test_t1_comparability_same_boundary_bottle_truthfulness():
    """T1 (AC1, AC2, AC4): Same-boundary bottle-style comparison (BOTTLE_AND_CLOSURE vs BOTTLE_AND_CLOSURE).
    Proves:
    - boundary_match is True
    - rating remains conservative BOUNDED_WITH_QUALIFIER (does not claim STRONG)
    - note does not invent uncomputed capacity difference (>15%, diff, etc.)
    - note truthfully states strong nominal-capacity/format comparability is not established."""
    base = make_candidate_article(
        "bottle-base", "500ml Baseline Bottle",
        mass=22.0, pcr=0.0, max_temp=60.0, mw_safe=False,
        boundary="BOTTLE_AND_CLOSURE",
    )
    cand = make_candidate_article(
        "bottle-cand", "500ml Candidate Bottle",
        mass=19.5, pcr=0.5, max_temp=60.0, mw_safe=False,
        boundary="BOTTLE_AND_CLOSURE",
    )

    assessment = assess_comparability(base, cand)
    assert assessment.boundary_match is True
    assert assessment.rating == "BOUNDED_WITH_QUALIFIER"
    assert assessment.rating != "STRONG"

    joined_notes = " ".join(assessment.notes)
    # AC1 & Negative criteria: no fabricated >15% claim or capacity difference claims
    assert "> 15%" not in joined_notes
    assert ">15%" not in joined_notes
    assert "15%" not in joined_notes
    assert "differs" not in joined_notes.lower()
    # Truthful explanation of what is and is not established
    assert "common component boundary matched" in joined_notes.lower()
    assert "strong" in joined_notes.lower()
    assert "not established" in joined_notes.lower()

    # Also verify through full evaluate_portfolio integration
    port = make_portfolio(base, [cand], req_temp=50.0, req_mw=False)
    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]
    assert c_res.comparability.boundary_match is True
    assert c_res.comparability.rating == "BOUNDED_WITH_QUALIFIER"
    cand_notes = " ".join(c_res.comparability.notes)
    assert "> 15%" not in cand_notes
    assert "differs" not in cand_notes.lower()


def test_t2_comparability_mismatched_boundary_regression():
    """T2 (AC3): Mismatched component boundaries (TRAY_BODY_ONLY vs HINGED_COMPLETE_PACK).
    Proves:
    - rating is ASYMMETRIC_BOUNDARY
    - boundary_match is False
    - transition reduction delta is withheld (None)
    - explanatory note states the actual component boundary mismatch."""
    base = make_candidate_article("tray-base", "Tray Base", mass=26.29, pcr=0.0, boundary="TRAY_BODY_ONLY")
    cand = make_candidate_article("hinged-cand", "Hinged Cand", mass=23.50, pcr=0.5, boundary="HINGED_COMPLETE_PACK")

    # Direct comparator check
    assessment = assess_comparability(base, cand)
    assert assessment.rating == "ASYMMETRIC_BOUNDARY"
    assert assessment.boundary_match is False
    joined_notes = " ".join(assessment.notes)
    assert "TRAY_BODY_ONLY" in joined_notes
    assert "HINGED_COMPLETE_PACK" in joined_notes
    assert "transition delta is withheld" in joined_notes.lower()

    # Integrated portfolio evaluation check
    port = make_portfolio(base, [cand])
    resp = evaluate_portfolio(port)
    c_res = resp.candidates[0]
    assert c_res.comparability.rating == "ASYMMETRIC_BOUNDARY"
    assert c_res.comparability.boundary_match is False
    assert c_res.calculation.status == "INSUFFICIENT_DATA"
    assert c_res.calculation.reduction_g is None
    assert c_res.calculation.reduction_pct is None
    assert "component_boundary_mismatch" in c_res.calculation.missing_fields
    assert c_res.next_action.action_code == "VERIFY_OPERATIONAL_PREMISES"
    assert c_res.next_action.summary == "Establish common component boundary"


def test_t3_current_selection_evaluation_regression():
    """T3 (AC5, AC6): Existing Selection evaluation path regression using default Faerch portfolio.
    Proves:
    - Calculation, eligibility, next-action fields remain unchanged
    - Comparability for same-boundary Faerch trays remains BOUNDED_WITH_QUALIFIER
    - Notes no longer contain uncomputed >15% capacity assertions."""
    with TestClient(create_app()) as client:
        resp = client.get("/api/v1/portfolios/faerch-deli-trays")
        assert resp.status_code == 200
        data = resp.json()

        assert data["baseline"]["calculation_status"] == "CALCULATED"
        assert data["baseline"]["virgin_plastic_g"] == 26.29

        candidates = data["candidates"]
        assert len(candidates) == 2

        # Candidate A: C 2200-1L (NON_POINT_VALUE PCR -> INSUFFICIENT_DATA, REVIEW_REQUIRED)
        cand_a = candidates[0]
        assert cand_a["candidate"]["id"] == "faerch-c-2200-1l"
        assert cand_a["comparability"]["rating"] == "BOUNDED_WITH_QUALIFIER"
        assert cand_a["comparability"]["boundary_match"] is True
        a_notes = " ".join(cand_a["comparability"]["notes"])
        assert "> 15%" not in a_notes
        assert ">15%" not in a_notes
        assert "differs" not in a_notes.lower()
        assert cand_a["calculation"]["status"] == "INSUFFICIENT_DATA"
        assert cand_a["calculation"]["reduction_g"] is None
        assert cand_a["eligibility"]["status"] == "REVIEW_REQUIRED"
        assert cand_a["next_action"]["action_code"] == "REQUEST_PCR_EVIDENCE"

        # Candidate B: K 2182-1G (UNSTATED PCR -> INSUFFICIENT_DATA, BLOCKED by 70°C ceiling vs 95°C req)
        cand_b = candidates[1]
        assert cand_b["candidate"]["id"] == "faerch-k-2182-1g"
        assert cand_b["comparability"]["rating"] == "BOUNDED_WITH_QUALIFIER"
        assert cand_b["comparability"]["boundary_match"] is True
        b_notes = " ".join(cand_b["comparability"]["notes"])
        assert "> 15%" not in b_notes
        assert ">15%" not in b_notes
        assert "differs" not in b_notes.lower()
        assert cand_b["calculation"]["status"] == "INSUFFICIENT_DATA"
        assert cand_b["calculation"]["reduction_g"] is None
        assert cand_b["eligibility"]["status"] == "BLOCKED"
        assert cand_b["next_action"]["action_code"] == "REJECT_INCOMPATIBLE"


def test_comparability_stretch_tray_same_boundary_truthfulness():
    """Stretch goal: Narrowly scoped test proving comparability notes remain truthful
    for TRAY_BODY_ONLY same-boundary comparisons."""
    base = make_candidate_article("tray-base", "Tray Base", boundary="TRAY_BODY_ONLY")
    cand = make_candidate_article("tray-cand", "Tray Cand", boundary="TRAY_BODY_ONLY")

    assessment = assess_comparability(base, cand)
    assert assessment.boundary_match is True
    assert assessment.rating == "BOUNDED_WITH_QUALIFIER"
    assert assessment.rating != "STRONG"

    joined_notes = " ".join(assessment.notes)
    assert "> 15%" not in joined_notes
    assert "differs" not in joined_notes.lower()
    assert "common component boundary matched" in joined_notes.lower()
    assert "strong" in joined_notes.lower()
