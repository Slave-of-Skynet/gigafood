from typing import Annotated

from app.domain.packaging import (
    AnnualImpactResult,
    BaselineAssessment,
    BooleanInput,
    CalculationResult,
    CandidateArticle,
    CandidateAssessment,
    ComparabilityAssessment,
    ComparabilityRating,
    EligibilityResult,
    NextAction,
    NextActionCode,
    OperationalRequirements,
    Package,
    Portfolio,
    Provenance,
    SelectionMetadata,
    SelectionRequest,
    SelectionResponse,
    Scenario,
    TemperatureInput,
)
from app.services.virgin_plastic import compare, virgin_plastic


def calculate_article_virgin_plastic(
    package: Package,
    metadata: SelectionMetadata,
) -> tuple[float | None, list[str]]:
    """Calculates virgin plastic for an individual package under selection epistemic rules.
    Recycled-content numeric values may be used ONLY when recycled_content_point_value_status
    is EXACT_POINT_VALUE. If UNSTATED or NON_POINT_VALUE, calculation is withheld."""
    missing_fields: list[str] = []

    for c in package.components:
        if c.plastic_mass_g.value is None:
            missing_fields.append(f"components.{c.id}.plastic_mass_g")
        if c.recycled_content_fraction.value is None or metadata.recycled_content_point_value_status != "EXACT_POINT_VALUE":
            missing_fields.append(f"components.{c.id}.recycled_content_fraction")

    if metadata.recycled_content_point_value_status != "EXACT_POINT_VALUE" or missing_fields:
        return None, missing_fields

    # Reuse canonical virgin_plastic arithmetic from app.services.virgin_plastic (unrounded)
    return virgin_plastic(package), []


def assess_comparability(
    baseline: CandidateArticle,
    candidate: CandidateArticle,
) -> ComparabilityAssessment:
    """Classifies comparability between baseline and candidate under INT-R2 D5/§11 taxonomy."""
    base_bound = baseline.metadata.component_boundary
    cand_bound = candidate.metadata.component_boundary

    if base_bound != cand_bound:
        # Default safe rating for differing component boundaries (including CUSTOM)
        rating: ComparabilityRating = "ASYMMETRIC_BOUNDARY"
        notes = [
            f"Component boundary mismatch: baseline is {base_bound}, candidate is {cand_bound}. "
            "Transition delta is withheld."
        ]
        return ComparabilityAssessment(rating=rating, boundary_match=False, notes=notes)

    # Boundaries match
    rating = "BOUNDED_WITH_QUALIFIER"
    notes = [
        "Common component boundary matched. Comparison is bounded: baseline nominal volume is unstated "
        "on primary datasheet or capacity differs > 15%."
    ]
    return ComparabilityAssessment(rating=rating, boundary_match=True, notes=notes)


def calculate_transition_delta(
    baseline_virgin_g: float | None,
    candidate_virgin_g: float | None,
    baseline_missing: list[str],
    candidate_missing: list[str],
    comparability: ComparabilityAssessment,
) -> CalculationResult:
    """Computes virgin plastic reduction delta and percentage under epistemic guards without rounding."""
    missing_fields = [f"baseline.{f}" for f in baseline_missing] + [f"candidate.{f}" for f in candidate_missing]

    if not comparability.boundary_match:
        return CalculationResult(
            status="INSUFFICIENT_DATA",
            verification_state="INSUFFICIENT_DATA",
            current_virgin_pack_g=baseline_virgin_g,
            candidate_virgin_pack_g=candidate_virgin_g,
            reduction_g=None,
            reduction_pct=None,
            missing_fields=missing_fields + ["component_boundary_mismatch"],
        )

    if baseline_virgin_g is None or candidate_virgin_g is None:
        return CalculationResult(
            status="INSUFFICIENT_DATA",
            verification_state="INSUFFICIENT_DATA",
            current_virgin_pack_g=baseline_virgin_g,
            candidate_virgin_pack_g=candidate_virgin_g,
            reduction_g=None,
            reduction_pct=None,
            missing_fields=missing_fields,
        )

    # Unrounded float arithmetic (rounding is presentation/display-only)
    reduction_g = baseline_virgin_g - candidate_virgin_g
    if baseline_virgin_g == 0:
        reduction_pct = None
    else:
        reduction_pct = (reduction_g / baseline_virgin_g) * 100.0

    return CalculationResult(
        status="CALCULATED",
        verification_state="INDICATIVE",
        current_virgin_pack_g=baseline_virgin_g,
        candidate_virgin_pack_g=candidate_virgin_g,
        reduction_g=reduction_g,
        reduction_pct=reduction_pct,
        missing_fields=[],
    )


def evaluate_operational_eligibility(
    baseline_pkg: Package,
    candidate_pkg: Package,
    requirements: OperationalRequirements | None,
) -> EligibilityResult:
    """Evaluates candidate capabilities against operational requirements using the A-core gate."""
    scenario = Scenario(
        id="eval-scenario",
        label="Evaluation Scenario",
        current=baseline_pkg,
        candidate=candidate_pkg,
        operational_requirements=requirements,
    )
    comp = compare(scenario)
    return EligibilityResult(
        status=comp.eligibility_status,
        constraints=comp.constraints,
    )


def determine_next_action(
    candidate: CandidateArticle,
    comparability: ComparabilityAssessment,
    calculation: CalculationResult,
    eligibility: EligibilityResult,
) -> NextAction:
    """Determines the structured next action and human guidance (INT-R2 D8)."""
    if eligibility.status == "BLOCKED":
        blocked_findings = [c for c in eligibility.constraints if c.status == "BLOCKED"]
        reasons = "; ".join(f"{c.constraint_id} ({c.reason})" for c in blocked_findings)
        return NextAction(
            action_code="REJECT_INCOMPATIBLE",
            summary="Reject candidate: operationally incompatible with stated operating context",
            details=f"Do not advance this candidate for the stated modeled operating context. Violated constraint: {reasons}. Modify requirements or evaluate alternative candidate.",
        )

    # Operational capability unknown check must remain reachable even if calculation gaps exist
    unknown_capability = any(
        c.constraint_id in ("thermal-envelope-incompatibility", "thermal-envelope-verification", "microwave-reheating-incompatibility", "microwave-reheating-verification")
        and "not established" in c.reason.lower()
        for c in eligibility.constraints
    )
    if unknown_capability:
        return NextAction(
            action_code="REQUEST_CAPABILITY_EVIDENCE",
            summary="Request operational capability evidence",
            details="Operational capability is not established for required constraints. Request verified technical datasheet affirming required operational performance.",
        )

    if calculation.status == "INSUFFICIENT_DATA":
        has_cand_mass_gap = any("candidate.components." in f and "plastic_mass_g" in f for f in calculation.missing_fields)
        has_baseline_gap = any(f.startswith("baseline.") for f in calculation.missing_fields)
        has_boundary_gap = "component_boundary_mismatch" in calculation.missing_fields
        has_cand_pcr_gap = (
            any("candidate.components." in f and "recycled_content_fraction" in f for f in calculation.missing_fields)
            or candidate.metadata.recycled_content_point_value_status != "EXACT_POINT_VALUE"
        )

        if has_cand_mass_gap:
            return NextAction(
                action_code="REQUEST_CAPABILITY_EVIDENCE",
                summary="Request packaging specification evidence",
                details=f"Calculation withheld due to missing candidate physical specification: {', '.join(calculation.missing_fields)}. Request complete technical datasheet from manufacturer.",
            )
        if has_baseline_gap:
            return NextAction(
                action_code="VERIFY_OPERATIONAL_PREMISES",
                summary="Verify baseline packaging specifications",
                details=f"Calculation withheld due to missing baseline evidence: {', '.join(calculation.missing_fields)}. Verify current packaging article specifications.",
            )
        if has_boundary_gap:
            return NextAction(
                action_code="VERIFY_OPERATIONAL_PREMISES",
                summary="Establish common component boundary",
                details=f"Component boundaries differ between baseline and candidate ({'; '.join(comparability.notes)}). Establish a source-backed common component boundary before evaluating transition delta.",
            )
        if has_cand_pcr_gap:
            return NextAction(
                action_code="REQUEST_PCR_EVIDENCE",
                summary="Request SKU/recipe recycled-content declaration",
                details="Calculation withheld. Request current SKU/recipe recycled-content declaration with provenance from manufacturer for candidate components before calculating virgin plastic delta.",
            )

        return NextAction(
            action_code="VERIFY_OPERATIONAL_PREMISES",
            summary="Verify evidence completeness",
            details=f"Calculation withheld due to incomplete evidence: {', '.join(calculation.missing_fields)}.",
        )

    # calculation is CALCULATED
    if eligibility.status == "REVIEW_REQUIRED":
        pct_str = f" / {calculation.reduction_pct:g}%" if calculation.reduction_pct is not None else ""
        return NextAction(
            action_code="VERIFY_OPERATIONAL_PREMISES",
            summary="Verify operational premises and food contact suitability",
            details=f"Environmental delta available ({calculation.reduction_g:g} g{pct_str}). Verify operational premises and food contact migration under production conditions with QA.",
        )

    return NextAction(
        action_code="ADVANCE_TO_QA_REVIEW",
        summary="Advance to QA review and validation",
        details="Technical operational constraints evaluated by the bounded gate are satisfied. Advance to internal QA review, chemical migration testing, barrier analysis, and procurement evaluation under production conditions.",
    )


def calculate_annual_impact(
    annual_units: int | None,
    calculation: CalculationResult,
    eligibility: EligibilityResult,
) -> AnnualImpactResult | None:
    """Calculates linear annual virgin plastic impact if annual_units is supplied (INT-R2 D3/§10). Unrounded."""
    if annual_units is None:
        return None

    disclosure_base = (
        "Hypothetical scenario based on user-supplied volume. Not actual Profi purchase volume, "
        "commercial commitment, or verified retail impact."
    )

    if calculation.status == "INSUFFICIENT_DATA":
        return AnnualImpactResult(
            annual_units=annual_units,
            annual_reduction_kg=None,
            annual_current_virgin_kg=None,
            annual_candidate_virgin_kg=None,
            status="INSUFFICIENT_DATA",
            is_actionable=False,
            disclosure=disclosure_base,
        )

    # calculation is CALCULATED - unrounded arithmetic
    ann_red = (
        (calculation.reduction_g * annual_units) / 1000.0
        if calculation.reduction_g is not None
        else None
    )
    ann_curr = (
        (calculation.current_virgin_pack_g * annual_units) / 1000.0
        if calculation.current_virgin_pack_g is not None
        else None
    )
    ann_cand = (
        (calculation.candidate_virgin_pack_g * annual_units) / 1000.0
        if calculation.candidate_virgin_pack_g is not None
        else None
    )

    if eligibility.status == "BLOCKED":
        impact_description = "Theoretical annual impact only."
        if ann_red is not None and ann_red > 0:
            impact_description = "Theoretical annual saving only."
        elif ann_red == 0:
            impact_description += " No annual virgin-plastic reduction (no change)."
        elif ann_red is not None and ann_red < 0:
            impact_description += " Annual virgin-plastic use increases."
        return AnnualImpactResult(
            annual_units=annual_units,
            annual_reduction_kg=ann_red,
            annual_current_virgin_kg=ann_curr,
            annual_candidate_virgin_kg=ann_cand,
            status="CALCULATED",
            is_actionable=False,
            disclosure=(
                f"{impact_description} Candidate is operationally blocked and the annual result is "
                f"not actionable under the stated modeled operating context. {disclosure_base}"
            ),
        )

    return AnnualImpactResult(
        annual_units=annual_units,
        annual_reduction_kg=ann_red,
        annual_current_virgin_kg=ann_curr,
        annual_candidate_virgin_kg=ann_cand,
        status="CALCULATED",
        is_actionable=True,
        disclosure=disclosure_base,
    )


def resolve_requirements(
    portfolio: Portfolio,
    request: SelectionRequest | None,
) -> tuple[str, OperationalRequirements, int | None]:
    """Resolves operational requirements with strict provenance distinction (INT-R2 D2).
    User overrides receive origin=USER_PROVIDED, verification_state=NOT_VERIFIED."""
    use_context = portfolio.use_context
    annual_units: int | None = None

    if request is not None:
        if request.use_context is not None:
            use_context = request.use_context
        annual_units = request.annual_units

    default_reqs = portfolio.default_operational_requirements

    if request is not None and request.required_max_temperature_c is not None:
        temp = TemperatureInput(
            value=request.required_max_temperature_c,
            provenance=Provenance(
                origin="USER_PROVIDED",
                verification_state="NOT_VERIFIED",
                source_reference="user:request",
                note="User-specified operating requirement override",
            ),
        )
    else:
        temp = default_reqs.max_temperature_c if default_reqs else None

    if request is not None and request.microwave_required is not None:
        mw = BooleanInput(
            value=request.microwave_required,
            provenance=Provenance(
                origin="USER_PROVIDED",
                verification_state="NOT_VERIFIED",
                source_reference="user:request",
                note="User-specified operating requirement override",
            ),
        )
    else:
        mw = default_reqs.microwave_safe if default_reqs else None

    reqs = OperationalRequirements(max_temperature_c=temp, microwave_safe=mw)
    return use_context, reqs, annual_units


def evaluate_portfolio(
    portfolio: Portfolio,
    request: SelectionRequest | None = None,
) -> SelectionResponse:
    """Evaluates a portfolio against operational requirements and optional volume (INT-R2 engine)."""
    use_context, op_reqs, annual_units = resolve_requirements(portfolio, request)

    # 1. Evaluate baseline
    base_virgin, base_missing = calculate_article_virgin_plastic(
        portfolio.baseline.package, portfolio.baseline.metadata
    )
    baseline_assessment = BaselineAssessment(
        package=portfolio.baseline.package,
        metadata=portfolio.baseline.metadata,
        virgin_plastic_g=base_virgin,
        calculation_status="CALCULATED" if base_virgin is not None else "INSUFFICIENT_DATA",
    )

    # 2. Evaluate candidates
    candidate_assessments: list[CandidateAssessment] = []
    for cand in portfolio.candidates:
        cand_virgin, cand_missing = calculate_article_virgin_plastic(cand.package, cand.metadata)
        comparability = assess_comparability(portfolio.baseline, cand)
        calc_result = calculate_transition_delta(
            baseline_assessment.virgin_plastic_g,
            cand_virgin,
            base_missing,
            cand_missing,
            comparability,
        )
        elig_result = evaluate_operational_eligibility(
            portfolio.baseline.package,
            cand.package,
            op_reqs,
        )
        annual_impact = calculate_annual_impact(annual_units, calc_result, elig_result)
        next_act = determine_next_action(cand, comparability, calc_result, elig_result)

        candidate_assessments.append(
            CandidateAssessment(
                candidate=cand.package,
                metadata=cand.metadata,
                comparability=comparability,
                calculation=calc_result,
                eligibility=elig_result,
                annual_impact=annual_impact,
                next_action=next_act,
            )
        )

    # 3. Deterministic Decision Grouping (INT-R2 D7)
    # Group 1: Not BLOCKED + CALCULATED
    # Group 2: Not BLOCKED + INSUFFICIENT_DATA
    # Group 3: BLOCKED
    group1 = [
        c for c in candidate_assessments
        if c.eligibility.status != "BLOCKED" and c.calculation.status == "CALCULATED"
    ]
    group2 = [
        c for c in candidate_assessments
        if c.eligibility.status != "BLOCKED" and c.calculation.status == "INSUFFICIENT_DATA"
    ]
    group3 = [
        c for c in candidate_assessments
        if c.eligibility.status == "BLOCKED"
    ]

    ordered_candidates = group1 + group2 + group3

    # 4. Generate dynamic summary verdict (INT-R2 D7 / Defect 5: zero hardcoded candidate labels/facts)
    if not group1:
        if group2 and group3:
            g2_items: list[str] = []
            for c in group2:
                if c.next_action.action_code == "REQUEST_PCR_EVIDENCE":
                    g2_items.append(f"{c.candidate.label} requires a current SKU/recipe recycled-content declaration with provenance")
                elif c.next_action.action_code == "REQUEST_CAPABILITY_EVIDENCE":
                    g2_items.append(f"{c.candidate.label} requires operational capability evidence")
                else:
                    g2_items.append(f"{c.candidate.label} requires evidence verification")

            g3_items: list[str] = []
            for c in group3:
                blocked_reasons = [cf.constraint_id for cf in c.eligibility.constraints if cf.status == "BLOCKED"]
                if any("thermal" in r for r in blocked_reasons):
                    reason_str = "thermal incompatibility"
                elif any("microwave" in r for r in blocked_reasons):
                    reason_str = "microwave incompatibility"
                else:
                    reason_str = "operational incompatibility"
                g3_items.append(f"{c.candidate.label} is blocked by {reason_str}")

            summary_verdict = (
                f"No candidate is currently recommendable for transition: {', '.join(g2_items)}, while "
                f"{', '.join(g3_items)} under the stated modeled operating context."
            )
        elif group3:
            g3_items = []
            for c in group3:
                blocked_reasons = [cf.constraint_id for cf in c.eligibility.constraints if cf.status == "BLOCKED"]
                if any("thermal" in r for r in blocked_reasons):
                    reason_str = "thermal incompatibility"
                elif any("microwave" in r for r in blocked_reasons):
                    reason_str = "microwave incompatibility"
                else:
                    reason_str = "operational incompatibility"
                g3_items.append(f"{c.candidate.label} is blocked by {reason_str}")
            summary_verdict = f"All candidates are operationally blocked ({'; '.join(g3_items)}) under the stated modeled operating context."
        else:
            g2_items = [f"{c.candidate.label} requires evidence verification" for c in group2]
            summary_verdict = f"No candidate is currently recommendable for transition: {'; '.join(g2_items)} under the stated modeled operating context."
    else:
        g1_positive = [
            c for c in group1
            if c.calculation.reduction_g is not None and c.calculation.reduction_g > 0
        ]
        g1_zero = [
            c for c in group1
            if c.calculation.reduction_g is not None and c.calculation.reduction_g == 0
        ]
        g1_negative = [
            c for c in group1
            if c.calculation.reduction_g is not None and c.calculation.reduction_g < 0
        ]

        if len(g1_positive) == len(group1):
            summary_verdict = (
                f"{len(group1)} candidate(s) viable with calculable environmental savings. "
                "Verification of operational premises required before QA advancement."
            )
        elif len(g1_negative) == len(group1):
            summary_verdict = (
                f"{len(group1)} candidate(s) viable but do not reduce virgin plastic (virgin-plastic use increases). "
                "Verification of operational premises required before QA advancement."
            )
        elif len(g1_zero) == len(group1):
            summary_verdict = (
                f"{len(group1)} candidate(s) viable with zero virgin-plastic reduction (no change in virgin-plastic use). "
                "Verification of operational premises required before QA advancement."
            )
        else:
            parts = []
            if g1_positive:
                parts.append(f"{len(g1_positive)} with calculable environmental savings")
            if g1_zero:
                parts.append(f"{len(g1_zero)} with zero virgin-plastic reduction")
            if g1_negative:
                parts.append(f"{len(g1_negative)} with increased virgin-plastic use")
            breakdown = ", ".join(parts)
            summary_verdict = (
                f"{len(group1)} candidate(s) viable ({breakdown}). "
                "Verification of operational premises required before QA advancement."
            )

    return SelectionResponse(
        portfolio_id=portfolio.id,
        label=portfolio.label,
        dataset_kind=portfolio.dataset_kind,
        disclosure=portfolio.disclosure,
        use_context=use_context,
        operational_requirements=op_reqs,
        annual_units_requested=annual_units,
        baseline=baseline_assessment,
        candidates=ordered_candidates,
        summary_verdict=summary_verdict,
    )
