from math import fsum

from app.domain.packaging import Comparison, ConstraintFinding, Package, Scenario, Verification


def combine_verification(req_state: Verification, cand_state: Verification) -> Verification:
    """A derived finding's verification state cannot be stronger than its weakest essential premise."""
    if req_state == "INSUFFICIENT_DATA" or cand_state == "INSUFFICIENT_DATA":
        return "INSUFFICIENT_DATA"
    if req_state == "NOT_VERIFIED" or cand_state == "NOT_VERIFIED":
        return "NOT_VERIFIED"
    if req_state == "INDICATIVE" or cand_state == "INDICATIVE":
        return "INDICATIVE"
    if req_state == "SOURCE_AVAILABLE" and cand_state == "SOURCE_AVAILABLE":
        return "SOURCE_AVAILABLE"
    return "NOT_VERIFIED"


def virgin_plastic(package: Package) -> float | None:
    """Unknown required inputs invalidate the whole package total, never a partial sum."""
    if any(c.plastic_mass_g.value is None or c.recycled_content_fraction.value is None
           for c in package.components):
        return None
    return fsum(c.plastic_mass_g.value * (1 - c.recycled_content_fraction.value)
                for c in package.components)


def compare(scenario: Scenario) -> Comparison:
    missing = [f"{side}.components.{c.id}.{field}"
               for side in ("current", "candidate")
               for c in getattr(scenario, side).components
               for field in ("plastic_mass_g", "recycled_content_fraction")
               if getattr(c, field).value is None]
    current = virgin_plastic(scenario.current)
    candidate = virgin_plastic(scenario.candidate)
    reduction = None if current is None or candidate is None else current - candidate

    # Advisory safety finding: PackShift provides decision support, not legal certification
    advisory_findings = [ConstraintFinding(
        constraint_id="food-contact-suitability", status="REVIEW_REQUIRED",
        reason="Food-contact suitability, food safety, shelf life and implementation suitability are NOT VERIFIED. This calculation is not an approval or legal verdict.",
        source_reference=None, verification_state="NOT_VERIFIED",
    )]

    # Bounded operational eligibility gate: evaluate operational requirements against candidate capabilities
    operational_findings: list[ConstraintFinding] = []
    evaluated_requirements = 0

    reqs = scenario.operational_requirements
    cand_pkg = scenario.candidate
    cand_caps = cand_pkg.capabilities

    # Extract candidate capabilities strictly from structured capabilities (never legacy fallback)
    if cand_caps and cand_caps.max_temperature_c:
        cand_temp_val = cand_caps.max_temperature_c.value
        cand_temp_source = cand_caps.max_temperature_c.provenance.source_reference
        cand_temp_verification = cand_caps.max_temperature_c.provenance.verification_state
    else:
        cand_temp_val = None
        cand_temp_source = None
        cand_temp_verification = "NOT_VERIFIED"

    if cand_caps and cand_caps.microwave_safe:
        cand_mw_val = cand_caps.microwave_safe.value
        cand_mw_source = cand_caps.microwave_safe.provenance.source_reference
        cand_mw_verification = cand_caps.microwave_safe.provenance.verification_state
    else:
        cand_mw_val = None
        cand_mw_source = None
        cand_mw_verification = "NOT_VERIFIED"

    # Extract operational requirements (never inferred from current package capabilities)
    req_temp = reqs.max_temperature_c if reqs else None
    req_temp_val = req_temp.value if req_temp else None

    req_mw = reqs.microwave_safe if reqs else None
    req_mw_val = req_mw.value if req_mw else None

    # Evaluate thermal constraint
    if req_temp_val is not None:
        evaluated_requirements += 1
        req_temp_ver = req_temp.provenance.verification_state if req_temp else "NOT_VERIFIED"
        req_temp_origin = req_temp.provenance.origin if req_temp else "ASSUMED"
        if cand_temp_val is None:
            operational_findings.append(ConstraintFinding(
                constraint_id="thermal-envelope-incompatibility",
                status="REVIEW_REQUIRED",
                reason=f"Operating context requires maximum temperature {req_temp_val}°C, but candidate packaging thermal capability is not established.",
                source_reference=None,
                verification_state="NOT_VERIFIED",
            ))
        elif cand_temp_val < req_temp_val:
            if req_temp_origin == "ASSUMED":
                reason = f"For the assumed demo operating requirement of {req_temp_val:g}°C, candidate documented maximum is {cand_temp_val:g}°C."
            else:
                reason = f"Thermal envelope: candidate max {cand_temp_val}°C < required {req_temp_val}°C."
            combined_ver = combine_verification(req_temp_ver, cand_temp_verification)
            operational_findings.append(ConstraintFinding(
                constraint_id="thermal-envelope-incompatibility",
                status="BLOCKED",
                reason=reason,
                source_reference=cand_temp_source,
                verification_state=combined_ver,
            ))

    # Evaluate microwave constraint
    if req_mw_val is True:
        evaluated_requirements += 1
        req_mw_ver = req_mw.provenance.verification_state if req_mw else "NOT_VERIFIED"
        req_mw_origin = req_mw.provenance.origin if req_mw else "ASSUMED"
        if cand_mw_val is None:
            operational_findings.append(ConstraintFinding(
                constraint_id="microwave-reheating-incompatibility",
                status="REVIEW_REQUIRED",
                reason="Operating context requires microwave reheating, but candidate packaging microwave capability is not established.",
                source_reference=None,
                verification_state="NOT_VERIFIED",
            ))
        elif cand_mw_val is False:
            if req_mw_origin == "ASSUMED":
                reason = "The assumed demo operating context requires microwave reheating, while the candidate manufacturer source states it is not microwave safe."
            else:
                reason = "Operating context requires microwave reheating, but candidate packaging is not microwave safe."
            combined_ver = combine_verification(req_mw_ver, cand_mw_verification)
            operational_findings.append(ConstraintFinding(
                constraint_id="microwave-reheating-incompatibility",
                status="BLOCKED",
                reason=reason,
                source_reference=cand_mw_source,
                verification_state=combined_ver,
            ))

    # Aggregate operational eligibility: strictly from operational findings
    if any(f.status == "BLOCKED" for f in operational_findings):
        eligibility_status = "BLOCKED"
    elif any(f.status == "REVIEW_REQUIRED" for f in operational_findings) or evaluated_requirements == 0:
        eligibility_status = "REVIEW_REQUIRED"
    else:
        eligibility_status = "ELIGIBLE"

    return Comparison(
        scenario=scenario,
        status="INSUFFICIENT_DATA" if missing else "CALCULATED",
        eligibility_status=eligibility_status,
        origin="CALCULATED",
        verification_state="INSUFFICIENT_DATA" if missing else "INDICATIVE",
        current_virgin_pack_g=current, candidate_virgin_pack_g=candidate,
        reduction_g=reduction,
        reduction_pct=None if reduction is None or current == 0 else reduction / current * 100,
        missing_fields=missing,
        constraints=advisory_findings + operational_findings,
    )
