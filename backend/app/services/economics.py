from app.domain.packaging import (
    EconomicScenarioRequest,
    EconomicScenarioResponse,
    Scenario,
)
from app.services.virgin_plastic import compare

ECONOMIC_DISCLOSURE = (
    "Hypothetical economic scenario based on user-supplied volume and packaging costs. "
    "Not actual Profi pricing, procurement terms, commercial commitment, or verified savings."
)


def evaluate_economic_scenario(
    scenario: Scenario,
    request: EconomicScenarioRequest,
) -> EconomicScenarioResponse:
    """Evaluates a hypothetical economic scenario for a pairwise transition scenario (INT-R5).

    Reuses the canonical Comparison calculation; arithmetic is unrounded.
    """
    comp = compare(scenario)

    current_annual_spend = request.annual_units * request.current_cost_eur_per_unit
    candidate_annual_spend = request.annual_units * request.candidate_cost_eur_per_unit
    annual_cost_delta = candidate_annual_spend - current_annual_spend

    if request.one_time_transition_cost_eur is not None:
        first_year_cost_delta = annual_cost_delta + request.one_time_transition_cost_eur
    else:
        first_year_cost_delta = None

    if comp.status == "CALCULATED" and comp.reduction_g is not None:
        annual_virgin_reduction_kg = (comp.reduction_g * request.annual_units) / 1000.0
    else:
        annual_virgin_reduction_kg = None

    if (
        comp.status == "CALCULATED"
        and comp.reduction_g is not None
        and comp.reduction_g > 0
        and annual_virgin_reduction_kg is not None
        and annual_virgin_reduction_kg > 0
    ):
        incremental_cost_per_kg_avoided = annual_cost_delta / annual_virgin_reduction_kg
    else:
        incremental_cost_per_kg_avoided = None

    return EconomicScenarioResponse(
        scenario_id=scenario.id,
        annual_units=request.annual_units,
        current_cost_eur_per_unit=request.current_cost_eur_per_unit,
        candidate_cost_eur_per_unit=request.candidate_cost_eur_per_unit,
        one_time_transition_cost_eur=request.one_time_transition_cost_eur,
        current_annual_spend_eur=current_annual_spend,
        candidate_annual_spend_eur=candidate_annual_spend,
        annual_cost_delta_eur=annual_cost_delta,
        first_year_cost_delta_eur=first_year_cost_delta,
        annual_virgin_plastic_reduction_kg=annual_virgin_reduction_kg,
        incremental_cost_per_kg_avoided_eur=incremental_cost_per_kg_avoided,
        environmental_status=comp.status,
        eligibility_status=comp.eligibility_status,
        origin="CALCULATED",
        input_origin="USER_PROVIDED",
        verification_state="NOT_VERIFIED",
        disclosure=ECONOMIC_DISCLOSURE,
    )
