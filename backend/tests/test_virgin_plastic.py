import pytest
from pydantic import ValidationError

from app.domain.packaging import Component, Package, Scenario
from app.services.virgin_plastic import compare, virgin_plastic


def component(mass=20.0, fraction=0.25, id="body"):
    provenance = dict(origin="ASSUMED", verification_state="NOT_VERIFIED",
                      source_reference="fixture:test", note="Illustrative test input")
    return Component(id=id, material="Illustrative PET",
                     plastic_mass_g=dict(value=mass, provenance=provenance),
                     recycled_content_fraction=dict(value=fraction, provenance=provenance))


def package(*components):
    return Package(id="fixture", label="Fixture", components=list(components))


def transition(current, candidate):
    return compare(Scenario(id="test", label="Test", current=current, candidate=candidate))


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
        assert any(c.status == "BLOCKED" for c in result.constraints)


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


def test_operational_constraints_compatible():
    current = Package(id="cur", label="Current", components=[component(20, 0)],
                      max_temperature_c=95.0, microwave_safe=True)
    candidate = Package(id="cand", label="Candidate", components=[component(20, 0.5)],
                        max_temperature_c=100.0, microwave_safe=True)
    result = transition(current, candidate)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "ELIGIBLE"
    assert result.reduction_pct == 50
    assert not any(c.status == "BLOCKED" for c in result.constraints)


def test_operational_constraints_thermal_mismatch_blocks():
    current = Package(id="cur", label="Current PP", components=[component(14.8, 0)],
                      max_temperature_c=95.0, microwave_safe=True)
    candidate = Package(id="cand", label="Candidate rPET", components=[component(12.0, 0.8)],
                        max_temperature_c=70.0, microwave_safe=False)
    result = transition(current, candidate)
    assert result.status == "CALCULATED"
    assert result.reduction_pct is not None
    assert result.eligibility_status == "BLOCKED"
    thermal_block = next((c for c in result.constraints if c.constraint_id == "thermal-envelope-incompatibility"), None)
    assert thermal_block is not None
    assert thermal_block.status == "BLOCKED"
    assert "70.0°C < required 95.0°C" in thermal_block.reason


def test_operational_constraints_microwave_mismatch_blocks():
    current = Package(id="cur", label="Current PP", components=[component(14.8, 0)],
                      max_temperature_c=70.0, microwave_safe=True)
    candidate = Package(id="cand", label="Candidate rPET", components=[component(12.0, 0.8)],
                        max_temperature_c=70.0, microwave_safe=False)
    result = transition(current, candidate)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "BLOCKED"
    mw_block = next((c for c in result.constraints if c.constraint_id == "microwave-reheating-incompatibility"), None)
    assert mw_block is not None
    assert mw_block.status == "BLOCKED"


def test_operational_constraints_missing_temp_review_required():
    current = Package(id="cur", label="Current", components=[component(20, 0)],
                      max_temperature_c=95.0, microwave_safe=True)
    candidate = Package(id="cand", label="Candidate", components=[component(20, 0.5)],
                        max_temperature_c=None, microwave_safe=True)
    result = transition(current, candidate)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "REVIEW_REQUIRED"
    assert result.eligibility_status != "ELIGIBLE"

