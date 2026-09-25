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
    """Case 1: Missing calculation evidence yields INSUFFICIENT_DATA, but NOT operational BLOCKED.
    Under HG-QA-R1-01, unverified requirement yields REVIEW_REQUIRED rather than ELIGIBLE."""
    cand = package(component(fraction=None))
    reqs = OperationalRequirements(max_temperature_c=temp_input(70.0, origin="ASSUMED", verification="NOT_VERIFIED", ref="demo:req-temp", note="Demo req"))
    cand_with_caps = Package(id="cand", label="Cand", components=[component(fraction=None)],
                             capabilities=PackageCapabilities(max_temperature_c=temp_input(100.0)))
    result = transition(package(component()), cand_with_caps, operational_requirements=reqs)
    assert result.status == "INSUFFICIENT_DATA"
    assert result.reduction_g is None
    assert result.eligibility_status == "REVIEW_REQUIRED"
    assert result.eligibility_status != "BLOCKED"
    assert not any(c.status == "BLOCKED" for c in result.constraints)
    thermal = next(c for c in result.constraints if c.constraint_id == "thermal-envelope-verification")
    assert thermal.status == "REVIEW_REQUIRED"
    assert thermal.verification_state == "NOT_VERIFIED"


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
    # Epistemic combination: ASSUMED/NOT_VERIFIED requirement caps finding at NOT_VERIFIED
    assert mw_block.verification_state == "NOT_VERIFIED"
    assert mw_block.source_reference == "https://duni.com/product"
    assert "assumed demo operating context requires microwave reheating" in mw_block.reason.lower()


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
    # Epistemic combination: ASSUMED/NOT_VERIFIED requirement caps finding at NOT_VERIFIED
    assert thermal_block.verification_state == "NOT_VERIFIED"
    assert "70" in thermal_block.reason and "95" in thermal_block.reason
    assert "assumed demo operating requirement" in thermal_block.reason.lower()
    assert thermal_block.source_reference == "https://duni.com/product"


def test_operational_case5_requirements_satisfied():
    """Case 5: Numerically satisfied requirements with ASSUMED/NOT_VERIFIED premises -> REVIEW_REQUIRED."""
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
    assert result.eligibility_status == "REVIEW_REQUIRED"
    assert not any(c.status == "BLOCKED" for c in result.constraints)
    # Operational verification findings point to unverified premises, not incompatibility
    thermal = next(c for c in result.constraints if c.constraint_id == "thermal-envelope-verification")
    assert thermal.status == "REVIEW_REQUIRED"
    assert thermal.verification_state == "NOT_VERIFIED"
    assert "not verified" in thermal.reason.lower()
    assert "incompatible" not in thermal.reason.lower()

    mw = next(c for c in result.constraints if c.constraint_id == "microwave-reheating-verification")
    assert mw.status == "REVIEW_REQUIRED"
    assert mw.verification_state == "NOT_VERIFIED"
    assert "not verified" in mw.reason.lower()
    assert "incompatible" not in mw.reason.lower()

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
    assert result.eligibility_status == "REVIEW_REQUIRED"
    assert result.eligibility_status != "BLOCKED"
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


def test_operational_legacy_temperature_ignored():
    """FIX 1: Legacy max_temperature_c without structured capability is ignored by the operational gate."""
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(95.0, origin="ASSUMED", verification="NOT_VERIFIED", ref="demo:req-temp", note="95C required")
    )
    current = package(component(20, 0))
    # Candidate has legacy max_temperature_c=100.0, but capabilities=None (no provenance)
    candidate = package(component(20, 0.5), capabilities=None, max_temperature_c=100.0)
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    # Must NOT grant ELIGIBLE based on unprovenanced legacy field!
    assert result.eligibility_status == "REVIEW_REQUIRED"
    assert result.eligibility_status != "ELIGIBLE"
    finding = next(c for c in result.constraints if c.constraint_id == "thermal-envelope-incompatibility")
    assert finding.status == "REVIEW_REQUIRED"


def test_operational_legacy_microwave_ignored():
    """FIX 1: Legacy microwave_safe without structured capability is ignored by the operational gate."""
    reqs = OperationalRequirements(
        microwave_safe=bool_input(True, origin="ASSUMED", verification="NOT_VERIFIED", ref="demo:req-mw", note="MW required")
    )
    current = package(component(20, 0))
    # Candidate has legacy microwave_safe=True, but capabilities=None (no provenance)
    candidate = package(component(20, 0.5), capabilities=None, microwave_safe=True)
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    # Must NOT grant ELIGIBLE based on unprovenanced legacy field!
    assert result.eligibility_status == "REVIEW_REQUIRED"
    assert result.eligibility_status != "ELIGIBLE"
    finding = next(c for c in result.constraints if c.constraint_id == "microwave-reheating-incompatibility")
    assert finding.status == "REVIEW_REQUIRED"


def test_operational_sourced_requirement_and_capability_allows_source_available():
    """FIX 2: When both requirement and capability have SOURCE_AVAILABLE, derived finding has SOURCE_AVAILABLE."""
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(95.0, origin="MANUFACTURER_SUPPLIED", verification="SOURCE_AVAILABLE",
                                     ref="source:req-spec", note="Sourced requirement"),
    )
    current = package(component(14.8, 0))
    candidate = package(component(12.0, 0.8), capabilities=PackageCapabilities(
        max_temperature_c=temp_input(70.0, origin="MANUFACTURER_SUPPLIED", verification="SOURCE_AVAILABLE",
                                     ref="https://duni.com/product", note="Sourced capability"),
    ))
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "BLOCKED"
    thermal_block = next(c for c in result.constraints if c.constraint_id == "thermal-envelope-incompatibility")
    assert thermal_block.status == "BLOCKED"
    assert thermal_block.verification_state == "SOURCE_AVAILABLE"
    assert thermal_block.verification_state != "VERIFIED"
    assert "Thermal envelope: candidate max 70.0°C < required 95.0°C." in thermal_block.reason
    assert thermal_block.source_reference == "https://duni.com/product"


def test_operational_verified_compatible_emits_eligible():
    """True positive: All evaluated operational requirements and candidate capabilities are VERIFIED -> ELIGIBLE."""
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(95.0, origin="USER_PROVIDED", verification="VERIFIED", ref="spec:verified-temp", note="Verified temp req"),
        microwave_safe=bool_input(True, origin="USER_PROVIDED", verification="VERIFIED", ref="spec:verified-mw", note="Verified mw req"),
    )
    current = package(component(20, 0))
    candidate = package(component(20, 0.5), capabilities=PackageCapabilities(
        max_temperature_c=temp_input(100.0, origin="MANUFACTURER_SUPPLIED", verification="VERIFIED", ref="cert:lab-test", note="Lab certified temp"),
        microwave_safe=bool_input(True, origin="MANUFACTURER_SUPPLIED", verification="VERIFIED", ref="cert:lab-mw", note="Lab certified mw"),
    ))
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "ELIGIBLE"
    assert not any(c.status == "BLOCKED" for c in result.constraints)
    # Operational verification findings are NOT emitted when both premises are VERIFIED and compatible
    operational_findings = [c for c in result.constraints if c.constraint_id != "food-contact-suitability"]
    assert len(operational_findings) == 0


def test_operational_source_available_compatible_yields_review_required():
    """Positive-path regression: SOURCE_AVAILABLE != VERIFIED. Compatible dimensions yield REVIEW_REQUIRED."""
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(95.0, origin="MANUFACTURER_SUPPLIED", verification="SOURCE_AVAILABLE", ref="spec:doc-temp", note="Sourced temp req"),
        microwave_safe=bool_input(True, origin="MANUFACTURER_SUPPLIED", verification="SOURCE_AVAILABLE", ref="spec:doc-mw", note="Sourced mw req"),
    )
    current = package(component(20, 0))
    candidate = package(component(20, 0.5), capabilities=PackageCapabilities(
        max_temperature_c=temp_input(100.0, origin="MANUFACTURER_SUPPLIED", verification="SOURCE_AVAILABLE", ref="mfr:spec-temp", note="Sourced temp cap"),
        microwave_safe=bool_input(True, origin="MANUFACTURER_SUPPLIED", verification="SOURCE_AVAILABLE", ref="mfr:spec-mw", note="Sourced mw cap"),
    ))
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "REVIEW_REQUIRED"
    assert not any(c.status == "BLOCKED" for c in result.constraints)
    thermal = next(c for c in result.constraints if c.constraint_id == "thermal-envelope-verification")
    assert thermal.status == "REVIEW_REQUIRED"
    assert thermal.verification_state == "SOURCE_AVAILABLE"
    mw = next(c for c in result.constraints if c.constraint_id == "microwave-reheating-verification")
    assert mw.status == "REVIEW_REQUIRED"
    assert mw.verification_state == "SOURCE_AVAILABLE"


def test_operational_verified_compatible_with_insufficient_data_emits_eligible():
    """Environmental calculation status (INSUFFICIENT_DATA) remains independent of operational eligibility (ELIGIBLE)."""
    cand_incomplete = Package(
        id="cand-inc", label="Cand Incomplete", components=[component(fraction=None)],
        capabilities=PackageCapabilities(
            max_temperature_c=temp_input(100.0, origin="MANUFACTURER_SUPPLIED", verification="VERIFIED", ref="cert:temp", note="Lab certified"),
        ),
    )
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(70.0, origin="USER_PROVIDED", verification="VERIFIED", ref="spec:temp", note="Verified req"),
    )
    result = transition(package(component()), cand_incomplete, operational_requirements=reqs)
    assert result.status == "INSUFFICIENT_DATA"
    assert result.reduction_g is None
    assert result.eligibility_status == "ELIGIBLE"
    assert not any(c.status == "BLOCKED" for c in result.constraints)


@pytest.mark.parametrize("req_ver,cand_ver,cand_temp,expected_status,expected_ver,expected_cid", [
    ("NOT_VERIFIED", "SOURCE_AVAILABLE", 100.0, "REVIEW_REQUIRED", "NOT_VERIFIED", "thermal-envelope-verification"),
    ("SOURCE_AVAILABLE", "SOURCE_AVAILABLE", 100.0, "REVIEW_REQUIRED", "SOURCE_AVAILABLE", "thermal-envelope-verification"),
    ("VERIFIED", "NOT_VERIFIED", 100.0, "REVIEW_REQUIRED", "NOT_VERIFIED", "thermal-envelope-verification"),
    ("VERIFIED", "SOURCE_AVAILABLE", 100.0, "REVIEW_REQUIRED", "SOURCE_AVAILABLE", "thermal-envelope-verification"),
    ("VERIFIED", "VERIFIED", 100.0, "ELIGIBLE", None, None),
    ("NOT_VERIFIED", "SOURCE_AVAILABLE", 70.0, "BLOCKED", "NOT_VERIFIED", "thermal-envelope-incompatibility"),
    ("VERIFIED", "VERIFIED", 70.0, "BLOCKED", "VERIFIED", "thermal-envelope-incompatibility"),
])
def test_operational_section8_truth_table(req_ver, cand_ver, cand_temp, expected_status, expected_ver, expected_cid):
    """Section 8 truth table verification for thermal dimension."""
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(90.0, origin="USER_PROVIDED", verification=req_ver, ref="ref:req", note="Req"),
    )
    candidate = package(component(20, 0.5), capabilities=PackageCapabilities(
        max_temperature_c=temp_input(cand_temp, origin="MANUFACTURER_SUPPLIED", verification=cand_ver, ref="ref:cand", note="Cand"),
    ))
    result = transition(package(component(20, 0)), candidate, operational_requirements=reqs)
    assert result.eligibility_status == expected_status
    if expected_cid is not None:
        finding = next(c for c in result.constraints if c.constraint_id == expected_cid)
        assert finding.verification_state == expected_ver
        assert finding.status == expected_status
    else:
        assert not any(c.constraint_id == "thermal-envelope-verification" for c in result.constraints)
        assert not any(c.constraint_id == "thermal-envelope-incompatibility" for c in result.constraints)


@pytest.mark.parametrize("req_ver,cand_ver,cand_mw,expected_status,expected_ver,expected_cid", [
    ("NOT_VERIFIED", "SOURCE_AVAILABLE", True, "REVIEW_REQUIRED", "NOT_VERIFIED", "microwave-reheating-verification"),
    ("SOURCE_AVAILABLE", "SOURCE_AVAILABLE", True, "REVIEW_REQUIRED", "SOURCE_AVAILABLE", "microwave-reheating-verification"),
    ("VERIFIED", "NOT_VERIFIED", True, "REVIEW_REQUIRED", "NOT_VERIFIED", "microwave-reheating-verification"),
    ("VERIFIED", "SOURCE_AVAILABLE", True, "REVIEW_REQUIRED", "SOURCE_AVAILABLE", "microwave-reheating-verification"),
    ("VERIFIED", "VERIFIED", True, "ELIGIBLE", None, None),
    ("NOT_VERIFIED", "SOURCE_AVAILABLE", False, "BLOCKED", "NOT_VERIFIED", "microwave-reheating-incompatibility"),
    ("VERIFIED", "VERIFIED", False, "BLOCKED", "VERIFIED", "microwave-reheating-incompatibility"),
])
def test_operational_microwave_truth_table(req_ver, cand_ver, cand_mw, expected_status, expected_ver, expected_cid):
    """Section 8 truth table verification for microwave dimension."""
    reqs = OperationalRequirements(
        microwave_safe=bool_input(True, origin="USER_PROVIDED", verification=req_ver, ref="ref:req", note="Req"),
    )
    candidate = package(component(20, 0.5), capabilities=PackageCapabilities(
        microwave_safe=bool_input(cand_mw, origin="MANUFACTURER_SUPPLIED", verification=cand_ver, ref="ref:cand", note="Cand"),
    ))
    result = transition(package(component(20, 0)), candidate, operational_requirements=reqs)
    assert result.eligibility_status == expected_status
    if expected_cid is not None:
        finding = next(c for c in result.constraints if c.constraint_id == expected_cid)
        assert finding.verification_state == expected_ver
        assert finding.status == expected_status
    else:
        assert not any(c.constraint_id == "microwave-reheating-verification" for c in result.constraints)
        assert not any(c.constraint_id == "microwave-reheating-incompatibility" for c in result.constraints)


def test_operational_null_requirement_temperature_with_verified_microwave():
    """Test A: Temperature requirement input exists with value=null / INSUFFICIENT_DATA;
    microwave requirement = VERIFIED True and candidate microwave capability = VERIFIED True.
    Expected: REVIEW_REQUIRED, not ELIGIBLE, not BLOCKED."""
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(None, origin="USER_PROVIDED", verification="INSUFFICIENT_DATA", ref="spec:null-temp", note="Temp input unavailable"),
        microwave_safe=bool_input(True, origin="USER_PROVIDED", verification="VERIFIED", ref="spec:verified-mw", note="Verified mw req"),
    )
    current = package(component(20, 0))
    candidate = package(component(20, 0.5), capabilities=PackageCapabilities(
        microwave_safe=bool_input(True, origin="MANUFACTURER_SUPPLIED", verification="VERIFIED", ref="cert:mw", note="Certified mw"),
    ))
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "REVIEW_REQUIRED"
    assert result.eligibility_status != "ELIGIBLE"
    assert result.eligibility_status != "BLOCKED"
    assert not any(c.status == "BLOCKED" for c in result.constraints)
    thermal = next(c for c in result.constraints if c.constraint_id == "thermal-envelope-verification")
    assert thermal.status == "REVIEW_REQUIRED"
    assert thermal.verification_state == "INSUFFICIENT_DATA"
    assert "thermal operating requirement is present but its value is unavailable" in thermal.reason


def test_operational_verified_temperature_with_null_requirement_microwave():
    """Test B: Temperature requirement = VERIFIED and satisfied;
    microwave requirement input exists with value=null / INSUFFICIENT_DATA.
    Expected: REVIEW_REQUIRED, not ELIGIBLE, not BLOCKED."""
    reqs = OperationalRequirements(
        max_temperature_c=temp_input(90.0, origin="USER_PROVIDED", verification="VERIFIED", ref="spec:verified-temp", note="Verified temp req"),
        microwave_safe=bool_input(None, origin="USER_PROVIDED", verification="INSUFFICIENT_DATA", ref="spec:null-mw", note="MW input unavailable"),
    )
    current = package(component(20, 0))
    candidate = package(component(20, 0.5), capabilities=PackageCapabilities(
        max_temperature_c=temp_input(100.0, origin="MANUFACTURER_SUPPLIED", verification="VERIFIED", ref="cert:temp", note="Certified temp"),
    ))
    result = transition(current, candidate, operational_requirements=reqs)
    assert result.status == "CALCULATED"
    assert result.eligibility_status == "REVIEW_REQUIRED"
    assert result.eligibility_status != "ELIGIBLE"
    assert result.eligibility_status != "BLOCKED"
    assert not any(c.status == "BLOCKED" for c in result.constraints)
    mw = next(c for c in result.constraints if c.constraint_id == "microwave-reheating-verification")
    assert mw.status == "REVIEW_REQUIRED"
    assert mw.verification_state == "INSUFFICIENT_DATA"
    assert "microwave operating requirement is present but its value is unavailable" in mw.reason
