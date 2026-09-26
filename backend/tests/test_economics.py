import math
from pathlib import Path
import pytest
from fastapi.testclient import TestClient

from app.domain.packaging import (
    Component,
    EconomicScenarioRequest,
    FractionInput,
    MassInput,
    Package,
    Provenance,
    Scenario,
)
from app.main import DEFAULT_EVIDENCE, DEFAULT_PORTFOLIOS, create_app
from app.services.economics import evaluate_economic_scenario

PUBLIC_EVIDENCE_PATH = Path(__file__).resolve().parents[2] / "data/evidence/public-packaging.json"


def make_provenance(origin="MANUFACTURER_SUPPLIED", verification="SOURCE_AVAILABLE"):
    return Provenance(
        origin=origin,
        verification_state=verification,
        source_reference="ref:test",
        note="test note",
    )


def make_package(pkg_id: str, label: str, mass: float | None, pcr: float | None) -> Package:
    return Package(
        id=pkg_id,
        label=label,
        components=[
            Component(
                id="body",
                material="PET",
                plastic_mass_g=MassInput(
                    value=mass,
                    provenance=make_provenance(),
                ),
                recycled_content_fraction=FractionInput(
                    value=pcr,
                    provenance=make_provenance(),
                ),
            )
        ],
    )


def make_scenario(
    scenario_id: str,
    base_mass: float | None,
    base_pcr: float | None,
    cand_mass: float | None,
    cand_pcr: float | None,
) -> Scenario:
    return Scenario(
        id=scenario_id,
        label=f"Scenario {scenario_id}",
        current=make_package("current", "Current Package", base_mass, base_pcr),
        candidate=make_package("candidate", "Candidate Package", cand_mass, cand_pcr),
    )


# --- Service Unit Tests ---


def test_economic_scenario_case_a_public_unrounded():
    """Case A from PUBLIC pack: 19.5g reduction, 1M units, €0.12 vs €0.135."""
    with TestClient(create_app(PUBLIC_EVIDENCE_PATH)) as client:
        # Fetch scenario from app state
        scenario = next(
            s for s in client.app.state.runtime.evidence.scenarios
            if s.id == "cchbc-500ml-rpet-transition"
        )
        req = EconomicScenarioRequest(
            annual_units=1_000_000,
            current_cost_eur_per_unit=0.120,
            candidate_cost_eur_per_unit=0.135,
            one_time_transition_cost_eur=None,
        )
        res = evaluate_economic_scenario(scenario, req)

        assert res.scenario_id == "cchbc-500ml-rpet-transition"
        assert res.annual_units == 1_000_000
        assert res.current_annual_spend_eur == 120_000.0
        assert res.candidate_annual_spend_eur == 135_000.0
        assert res.annual_cost_delta_eur == 15_000.0
        assert res.first_year_cost_delta_eur is None

        # 19.5 g * 1,000,000 / 1000 = 19,500 kg
        assert res.annual_virgin_plastic_reduction_kg == 19_500.0

        # 15,000 / 19,500 = 0.7692307692307693... unrounded
        expected_cost_per_kg = 15_000.0 / 19_500.0
        assert res.incremental_cost_per_kg_avoided_eur == expected_cost_per_kg
        assert math.isclose(res.incremental_cost_per_kg_avoided_eur, 0.769230769, rel_tol=1e-5)

        assert res.environmental_status == "CALCULATED"
        assert res.eligibility_status == "REVIEW_REQUIRED"
        assert res.origin == "CALCULATED"
        assert res.input_origin == "USER_PROVIDED"
        assert res.verification_state == "NOT_VERIFIED"
        assert "Hypothetical economic scenario based on user-supplied volume" in res.disclosure


def test_economic_scenario_with_one_time_transition_cost():
    """Optional one-time transition cost adds to annual delta for first-year delta."""
    scenario = make_scenario("test-trans", 20.0, 0.0, 10.0, 0.0)
    req = EconomicScenarioRequest(
        annual_units=100_000,
        current_cost_eur_per_unit=0.50,
        candidate_cost_eur_per_unit=0.55,
        one_time_transition_cost_eur=25_000.0,
    )
    res = evaluate_economic_scenario(scenario, req)

    assert math.isclose(res.annual_cost_delta_eur, 5_000.0)
    assert math.isclose(res.first_year_cost_delta_eur, 30_000.0)


def test_economic_scenario_saving_signed_negative():
    """When candidate costs less, annual delta is signed negative and incremental cost preserves sign."""
    scenario = make_scenario("test-saving", 20.0, 0.0, 10.0, 0.0)
    # 10g reduction per unit. 100,000 units = 1000 kg reduction.
    # Current spend = €50,000, Candidate spend = €40,000 -> delta = -€10,000
    req = EconomicScenarioRequest(
        annual_units=100_000,
        current_cost_eur_per_unit=0.50,
        candidate_cost_eur_per_unit=0.40,
        one_time_transition_cost_eur=None,
    )
    res = evaluate_economic_scenario(scenario, req)

    assert res.annual_cost_delta_eur == -10_000.0
    assert res.annual_virgin_plastic_reduction_kg == 1_000.0
    # -10,000 / 1000 = -10.0 €/kg
    assert res.incremental_cost_per_kg_avoided_eur == -10.0


def test_economic_scenario_case_b_blocked_preserves_arithmetic():
    """Case B (Deli container): candidate is operationally BLOCKED. Arithmetic is returned with BLOCKED status."""
    with TestClient(create_app(PUBLIC_EVIDENCE_PATH)) as client:
        scenario = next(
            s for s in client.app.state.runtime.evidence.scenarios
            if s.id == "deli-pp-to-rpet-transition"
        )
        req = EconomicScenarioRequest(
            annual_units=500_000,
            current_cost_eur_per_unit=0.20,
            candidate_cost_eur_per_unit=0.18,
            one_time_transition_cost_eur=None,
        )
        res = evaluate_economic_scenario(scenario, req)

        assert res.eligibility_status == "BLOCKED"
        assert res.environmental_status == "CALCULATED"
        assert res.current_annual_spend_eur == 100_000.0
        assert res.candidate_annual_spend_eur == 90_000.0
        assert res.annual_cost_delta_eur == -10_000.0
        assert res.annual_virgin_plastic_reduction_kg is not None
        assert res.incremental_cost_per_kg_avoided_eur is not None


def test_economic_scenario_guard_zero_reduction():
    """When reduction_g == 0, incremental_cost_per_kg_avoided_eur MUST be None (no division by zero)."""
    scenario = make_scenario("test-zero-red", 20.0, 0.0, 20.0, 0.0)
    req = EconomicScenarioRequest(
        annual_units=100_000,
        current_cost_eur_per_unit=0.10,
        candidate_cost_eur_per_unit=0.12,
    )
    res = evaluate_economic_scenario(scenario, req)

    assert res.annual_cost_delta_eur == 2_000.0
    assert res.annual_virgin_plastic_reduction_kg == 0.0
    assert res.incremental_cost_per_kg_avoided_eur is None


def test_economic_scenario_guard_negative_reduction():
    """When reduction_g < 0 (increases virgin plastic), incremental_cost_per_kg_avoided_eur MUST be None."""
    scenario = make_scenario("test-neg-red", 20.0, 0.0, 25.0, 0.0)
    req = EconomicScenarioRequest(
        annual_units=100_000,
        current_cost_eur_per_unit=0.10,
        candidate_cost_eur_per_unit=0.12,
    )
    res = evaluate_economic_scenario(scenario, req)

    assert res.annual_cost_delta_eur == 2_000.0
    assert res.annual_virgin_plastic_reduction_kg == -500.0
    assert res.incremental_cost_per_kg_avoided_eur is None


def test_economic_scenario_guard_insufficient_data():
    """When environmental data is missing, spend is calculated but kg avoided and €/kg are None."""
    scenario = make_scenario("test-missing", 20.0, None, 15.0, 0.0)
    req = EconomicScenarioRequest(
        annual_units=50_000,
        current_cost_eur_per_unit=0.20,
        candidate_cost_eur_per_unit=0.25,
    )
    res = evaluate_economic_scenario(scenario, req)

    assert res.environmental_status == "INSUFFICIENT_DATA"
    assert res.current_annual_spend_eur == 10_000.0
    assert res.candidate_annual_spend_eur == 12_500.0
    assert res.annual_cost_delta_eur == 2_500.0
    assert res.annual_virgin_plastic_reduction_kg is None
    assert res.incremental_cost_per_kg_avoided_eur is None


# --- HTTP API Route Tests ---


def test_api_scenario_economics_endpoint():
    """POST /api/v1/scenarios/{id}/economics returns HTTP 200 with valid payload."""
    with TestClient(create_app(PUBLIC_EVIDENCE_PATH)) as client:
        resp = client.post(
            "/api/v1/scenarios/cchbc-500ml-rpet-transition/economics",
            json={
                "annual_units": 1_000_000,
                "current_cost_eur_per_unit": 0.12,
                "candidate_cost_eur_per_unit": 0.135,
            },
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["scenario_id"] == "cchbc-500ml-rpet-transition"
        assert body["annual_cost_delta_eur"] == 15000.0
        assert body["first_year_cost_delta_eur"] is None
        assert body["annual_virgin_plastic_reduction_kg"] == 19500.0
        assert math.isclose(body["incremental_cost_per_kg_avoided_eur"], 0.769230769, rel_tol=1e-5)


def test_api_scenario_economics_not_found():
    """Unknown scenario returns HTTP 404."""
    with TestClient(create_app(PUBLIC_EVIDENCE_PATH)) as client:
        resp = client.post(
            "/api/v1/scenarios/non-existent-scenario/economics",
            json={
                "annual_units": 1000,
                "current_cost_eur_per_unit": 0.1,
                "candidate_cost_eur_per_unit": 0.2,
            },
        )
        assert resp.status_code == 404
        assert resp.json()["detail"] == "SCENARIO_NOT_FOUND"


@pytest.mark.parametrize(
    "bad_body",
    [
        {"annual_units": 0, "current_cost_eur_per_unit": 0.1, "candidate_cost_eur_per_unit": 0.2},
        {"annual_units": -100, "current_cost_eur_per_unit": 0.1, "candidate_cost_eur_per_unit": 0.2},
        {"annual_units": 1000, "current_cost_eur_per_unit": -0.01, "candidate_cost_eur_per_unit": 0.2},
        {"annual_units": 1000, "current_cost_eur_per_unit": 0.1, "candidate_cost_eur_per_unit": -0.01},
        {"annual_units": 1000, "current_cost_eur_per_unit": 0.1, "candidate_cost_eur_per_unit": 0.2, "one_time_transition_cost_eur": -10.0},
        {"annual_units": "abc", "current_cost_eur_per_unit": 0.1, "candidate_cost_eur_per_unit": 0.2},
        {"annual_units": 1000, "current_cost_eur_per_unit": None, "candidate_cost_eur_per_unit": 0.2},
    ],
)
def test_api_scenario_economics_validation_errors(bad_body):
    """Invalid or negative inputs return HTTP 422 Unprocessable Entity."""
    with TestClient(create_app(PUBLIC_EVIDENCE_PATH)) as client:
        resp = client.post(
            "/api/v1/scenarios/cchbc-500ml-rpet-transition/economics",
            json=bad_body,
        )
        assert resp.status_code == 422


def test_economic_scenario_rejects_non_finite_inputs():
    """Non-finite inputs (inf, nan) are strictly rejected by contract allow_inf_nan=False."""
    with pytest.raises(ValueError):
        EconomicScenarioRequest(
            annual_units=1_000,
            current_cost_eur_per_unit=float("inf"),
            candidate_cost_eur_per_unit=0.20,
        )

    with pytest.raises(ValueError):
        EconomicScenarioRequest(
            annual_units=1_000,
            current_cost_eur_per_unit=0.10,
            candidate_cost_eur_per_unit=float("nan"),
        )

    with pytest.raises(ValueError):
        EconomicScenarioRequest(
            annual_units=1_000,
            current_cost_eur_per_unit=0.10,
            candidate_cost_eur_per_unit=0.20,
            one_time_transition_cost_eur=float("inf"),
        )


def test_economic_scenario_case_a_with_transition_cost():
    """Case A with €50k transition cost: annual delta = +€15k, first-year total delta = +€65k."""
    with TestClient(create_app(PUBLIC_EVIDENCE_PATH)) as client:
        scenario = next(
            s for s in client.app.state.runtime.evidence.scenarios
            if s.id == "cchbc-500ml-rpet-transition"
        )
        req = EconomicScenarioRequest(
            annual_units=1_000_000,
            current_cost_eur_per_unit=0.120,
            candidate_cost_eur_per_unit=0.135,
            one_time_transition_cost_eur=50_000.0,
        )
        res = evaluate_economic_scenario(scenario, req)
        assert res.annual_cost_delta_eur == 15_000.0
        assert res.first_year_cost_delta_eur == 65_000.0
        assert res.annual_virgin_plastic_reduction_kg == 19_500.0
        assert math.isclose(res.incremental_cost_per_kg_avoided_eur, 0.769230769, rel_tol=1e-5)
