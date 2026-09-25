import pytest
from pydantic import ValidationError

from app.domain.packaging import (
    BooleanInput,
    Component,
    OperationalRequirements,
    Package,
    PackageCapabilities,
    Scenario,
    TemperatureInput,
)
from app.services.virgin_plastic import compare, virgin_plastic


def component(mass=20.0, fraction=0.25, id="body"):
    provenance = dict(origin="ASSUMED", verification_state="NOT_VERIFIED",
                      source_reference="fixture:test", note="Illustrative test input")
    return Component(id=id, material="Illustrative PET",
                     plastic_mass_g=dict(value=mass, provenance=provenance),
                     recycled_content_fraction=dict(value=fraction, provenance=provenance))


def temp_input(val=None, origin="MANUFACTURER_SUPPLIED", verification="SOURCE_AVAILABLE", ref="fixture:temp", note="Test temperature"):
    return TemperatureInput(value=val, provenance=dict(origin=origin, verification_state=verification, source_reference=ref, note=note))


def bool_input(val=None, origin="MANUFACTURER_SUPPLIED", verification="SOURCE_AVAILABLE", ref="fixture:mw", note="Test microwave"):
    return BooleanInput(value=val, provenance=dict(origin=origin, verification_state=verification, source_reference=ref, note=note))


def package(*components, capabilities=None, max_temperature_c=None, microwave_safe=None):
    return Package(id="fixture", label="Fixture", components=list(components),
                   capabilities=capabilities, max_temperature_c=max_temperature_c,
                   microwave_safe=microwave_safe)


def transition(current, candidate, operational_requirements=None):
    return compare(Scenario(id="test", label="Test", current=current, candidate=candidate,
                            operational_requirements=operational_requirements))


def test_single_component():
    assert virgin_plastic(package(component())) == 15


def test_multi_component_and_delta():
    current = package(component(), component(10, 0.5, "lid"))
    assert virgin_plastic(current) == 20
    result = transition(current, package(component(20, 0.5)))
    assert result.reduction_g == 10
    assert result.reduction_pct == 50
    assert result.origin == "CALCULATED"
    assert result.verification_state == "INDICATIVE"
    assert result.scenario.current.components[0].plastic_mass_g.provenance.origin == "ASSUMED"


@pytest.mark.parametrize("mass,fraction", [(20, None), (None, 0.25), (None, None)])
def test_unknown_never_zero_or_partial_sum(mass, fraction):
    incomplete = package(component(mass, fraction), component(10, 0, "lid"))
    for current, candidate in [(package(component()), incomplete), (incomplete, package(component()))]:
        result = transition(current, candidate)
        assert virgin_plastic(incomplete) is None
        assert result.status == "INSUFFICIENT_DATA"
        assert result.reduction_g is None
        assert result.reduction_pct is None
        assert result.missing_fields
        # Defect A fix: missing calculation evidence must NEVER produce operational BLOCKED
        assert not any(c.status == "BLOCKED" for c in result.constraints)
        assert result.eligibility_status != "BLOCKED"


@pytest.mark.parametrize("fraction", [-0.01, 1.01, float("nan"), float("inf"), "0.25", True])
def test_invalid_fraction(fraction):
    with pytest.raises(ValidationError):
        component(fraction=fraction)


@pytest.mark.parametrize("mass", [0, -1, float("nan"), float("inf"), "20", True])
def test_invalid_mass(mass):
    with pytest.raises(ValidationError):
        component(mass=mass)


def test_zero_baseline_and_increase():
    result = transition(package(component(20, 1)), package(component(20, 0.5)))
    assert result.current_virgin_pack_g == 0
    assert result.reduction_g == -10
    assert result.reduction_pct is None
    increase = transition(package(component(20, 0.5)), package(component(20, 0)))
    assert increase.reduction_g == -10
    assert increase.reduction_pct == -100


def test_empty_and_duplicate_components_invalid():
    with pytest.raises(ValidationError):
        package()
    with pytest.raises(ValidationError):
        package(component(), component())


# --- Operational Gate Tests (Section 7 Truth Table) ---

def test_operational_case1_missing_environmental_evidence_not_operationally_blocked():
    """Case 1: Missing calculation evidence yields INSUFFICIENT_DATA, but NOT operational BLOCKED."""
    cand = package(component(fraction=None))
    reqs = OperationalRequirements(max_temperature_c=temp_input(70.0, origin="ASSUMED", verification="NOT_VERIFIED", ref="demo:req-temp", note="Demo req"))
    cand_with_caps = Package(id="cand", label="Cand", components=[component(fraction=None)],
                             capabilities=PackageCapabilities(max_temperature_c=temp_input(100.0)))
    result = transition(package(component()), cand_with_caps, operational_requirements=reqs)
    assert result.status == "INSUFFICIENT_DATA"
    assert result.reduction_g is None
    assert result.eligibility_status == "ELIGIBLE"
    assert not any(c.status == "BLOCKED" for c in result.constraints)


def test_operational_case2_explicit_requirement_unknown_candidate_capability():
    """Case 2: Explicit requirement + unknown candidate capability -> REVIEW_REQUIRED (not ELIGIBLE, not BLOCKED)."""
    reqs = OperationalRequirements(
        microwave_safe=bool_input(True, origin="ASSUMED", verification="NOT_VERIFIED", ref="demo:mw-req", note="Req MW")
    )
    current = package(component(20, 0))
    candidate = package(component(20, 0.5))  # candidate has no capabilities defined
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "REVIEW_REQUIRED"
    assert result.eligibility_status != "ELIGIBLE"
    assert result.eligibility_status != "BLOCKED"
    finding = next((c for c in result.constraints if c.constraint_id == "microwave-reheating-incompatibility"), None)
    assert finding is not None
    assert finding.status == "REVIEW_REQUIRED"


def test_operational_case3_explicit_requirement_microwave_incompatibility():
    """Case 3: Explicit microwave requirement + candidate microwave_safe=False -> BLOCKED."""
    reqs = OperationalRequirements(
        microwave_safe=bool_input(True, origin="ASSUMED", verification="NOT_VERIFIED", ref="demo:mw-req", note="Req MW")
    )
    current = package(component(14.8, 0))
    candidate = package(component(12.0, 0.8), capabilities=PackageCapabilities(
        microwave_safe=bool_input(False, ref="https://duni.com/product", note="Not microwaveable")
    ))
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "BLOCKED"
    mw_block = next((c for c in result.constraints if c.constraint_id == "microwave-reheating-incompatibility"), None)
    assert mw_block is not None
    assert mw_block.status == "BLOCKED"
    assert mw_block.source_reference == "https://duni.com/product"


def test_operational_case4_temperature_incompatibility():
    """Case 4: Required temperature 95°C, candidate max 70°C -> BLOCKED."""
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(95.0, origin="ASSUMED", verification="NOT_VERIFIED", ref="demo:hot-fill", note="95C hot fill required")
    )
    current = package(component(14.8, 0))
    candidate = package(component(12.0, 0.8), capabilities=PackageCapabilities(
        max_temperature_c=temp_input(70.0, ref="https://duni.com/product", note="70C max")
    ))
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "BLOCKED"
    thermal_block = next((c for c in result.constraints if c.constraint_id == "thermal-envelope-incompatibility"), None)
    assert thermal_block is not None
    assert thermal_block.status == "BLOCKED"
    assert "70.0°C < required 95.0°C" in thermal_block.reason
    assert thermal_block.source_reference == "https://duni.com/product"


def test_operational_case5_requirements_satisfied():
    """Case 5: All evaluated operational requirements satisfied -> ELIGIBLE."""
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(95.0, origin="ASSUMED", verification="NOT_VERIFIED", ref="demo:hot-fill", note="95C hot fill required"),
        microwave_safe=bool_input(True, origin="ASSUMED", verification="NOT_VERIFIED", ref="demo:mw-req", note="Req MW"),
    )
    current = package(component(20, 0))
    candidate = package(component(20, 0.5), capabilities=PackageCapabilities(
        max_temperature_c=temp_input(100.0),
        microwave_safe=bool_input(True),
    ))
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "ELIGIBLE"
    assert not any(c.status == "BLOCKED" for c in result.constraints)
    # Advisory finding remains REVIEW_REQUIRED but does not break ELIGIBLE
    advisory = next(c for c in result.constraints if c.constraint_id == "food-contact-suitability")
    assert advisory.status == "REVIEW_REQUIRED"


def test_operational_case6_calculated_and_blocked_coexist():
    """Case 6: CALCULATED environmental delta + BLOCKED operational gate coexist."""
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(95.0, origin="ASSUMED", verification="NOT_VERIFIED", ref="demo:hot-fill", note="95C hot fill required"),
    )
    current = package(component(14.8, 0))
    candidate = package(component(12.0, 0.8), capabilities=PackageCapabilities(
        max_temperature_c=temp_input(70.0),
    ))
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    assert result.reduction_g == pytest.approx(12.4)
    assert result.reduction_pct == pytest.approx(12.4 / 14.8 * 100)
    assert result.eligibility_status == "BLOCKED"


def test_operational_case7_negative_reduction_not_operationally_blocked():
    """Case 7: Negative environmental reduction does not block operational eligibility."""
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(70.0, origin="ASSUMED", verification="NOT_VERIFIED", ref="demo:cold", note="70C max required"),
    )
    current = package(component(10, 0.5))  # virgin = 5g
    candidate = package(component(10, 0), capabilities=PackageCapabilities(
        max_temperature_c=temp_input(70.0),
    ))  # virgin = 10g
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    assert result.reduction_g == -5
    assert result.eligibility_status == "ELIGIBLE"
    assert not any(c.status == "BLOCKED" for c in result.constraints)


def test_operational_no_silent_inference_from_current():
    """Defect B invariant: current capability is NEVER silently inferred as an operational requirement."""
    # Current has high heat & microwave capability, candidate lacks them
    current = package(component(20, 0), capabilities=PackageCapabilities(
        max_temperature_c=temp_input(95.0),
        microwave_safe=bool_input(True),
    ))
    candidate = package(component(20, 0.5), capabilities=PackageCapabilities(
        max_temperature_c=temp_input(70.0),
        microwave_safe=bool_input(False),
    ))
    # Scenario does NOT require hot fill or microwave (requirements unmodeled)
    result = transition(current, candidate, operational_requirements=None)
    assert result.status == "CALCULATED"
    # Must NOT be BLOCKED just because candidate has lower capability than current!
    assert result.eligibility_status == "REVIEW_REQUIRED"
    assert result.eligibility_status != "BLOCKED"

