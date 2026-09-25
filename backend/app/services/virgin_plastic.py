from math import fsum

from app.domain.packaging import Comparison, ConstraintFinding, Package, Scenario


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
    constraints = [ConstraintFinding(
        constraint_id="food-contact-suitability", status="REVIEW_REQUIRED",
        reason="Food-contact suitability, food safety, shelf life and implementation suitability are NOT VERIFIED. This calculation is not an approval or legal verdict.",
        source_reference=None, verification_state="NOT_VERIFIED",
    )]
    if missing:
        constraints.append(ConstraintFinding(
            constraint_id="required-calculation-evidence", status="BLOCKED",
            reason="Required numerical evidence is missing; no transition delta can be calculated.",
            source_reference=None, verification_state="INSUFFICIENT_DATA",
        ))
    return Comparison(
        scenario=scenario, status="INSUFFICIENT_DATA" if missing else "CALCULATED",
        verification_state="INSUFFICIENT_DATA" if missing else "INDICATIVE",
        current_virgin_pack_g=current, candidate_virgin_pack_g=candidate,
        reduction_g=reduction,
        reduction_pct=None if reduction is None or current == 0 else reduction / current * 100,
        missing_fields=missing, constraints=constraints,
    )
