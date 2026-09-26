"""
Independent Acceptance Oracle Tests — HTF-03 Recommendation Flow
Contract: APR-HT1 — HTF-03 Recommendation Acceptance & Claims Safety
Owner: Alisa (Product / QA / Acceptance)
Repository: Slave-of-Skynet/gigafood
Base SHA: e067764d334e260440ed69ae6d68dab42205b3a4
Upstream: INT-HTF-04A — Canonical Runtime Transition & Parallelization Gate

This suite implements black-box acceptance verification against the canonical
HTF-03 packaging evidence dataset and runtime transition constraints.
"""

import json
from pathlib import Path
import pytest
from fastapi.testclient import TestClient

from app.main import create_app

REPO_ROOT = Path(__file__).resolve().parents[3]
CANONICAL_DATASET_PATH = REPO_ROOT / "docs/evidence/htf-03/HTF-03-canonical-packaging-dataset.json"


@pytest.fixture(scope="module")
def canonical_data():
    assert CANONICAL_DATASET_PATH.exists(), f"Missing canonical dataset at {CANONICAL_DATASET_PATH}"
    with open(CANONICAL_DATASET_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


@pytest.fixture(scope="module")
def api_client():
    app = create_app()
    with TestClient(app) as client:
        yield client


# -----------------------------------------------------------------------------
# 1. Canonical Snapshot Invariants (Section 14)
# -----------------------------------------------------------------------------

def test_canonical_snapshot_invariants(canonical_data):
    """
    Assert snapshot invariants:
    - 4 products: P1, P2, P3, P4
    - 2 workflows: POST_COOK_HOT_HOLD_6H, LITERAL_OVEN_250C_THEN_HOLD
    - 6 candidates: C1, C2, C3, C4, C5, C6
    - Exactly 48 gate evaluation rows
    - Exactly 28 QUALIFICATION REQUIRED
    - Exactly 20 BLOCKED
    - Exactly 0 qualified survivors
    - Exactly 0 procurement-approved candidates
    """
    products = {"P1", "P2", "P3", "P4"}
    workflows = {"POST_COOK_HOT_HOLD_6H", "LITERAL_OVEN_250C_THEN_HOLD"}
    candidates = {"C1", "C2", "C3", "C4", "C5", "C6"}

    gates = canonical_data.get("product_candidate_gates", [])
    assert len(gates) == 48, f"Expected 48 gate rows, found {len(gates)}"

    seen_tuples = set()
    outcomes = {"QUALIFICATION REQUIRED": 0, "BLOCKED": 0}
    survivors = 0
    procurement_approved = 0

    for row in gates:
        p = row["product_id"]
        w = row["workflow"]
        c = row["candidate_id"]
        out = row["outcome"]

        assert p in products, f"Unknown product_id: {p}"
        assert w in workflows, f"Unknown workflow: {w}"
        assert c in candidates, f"Unknown candidate_id: {c}"

        key = (p, w, c)
        assert key not in seen_tuples, f"Duplicate gate evaluation for {key}"
        seen_tuples.add(key)

        assert out in outcomes, f"Invalid outcome: {out}"
        outcomes[out] += 1

        if row.get("qualified_survivor"):
            survivors += 1
        if row.get("approved_for_procurement"):
            procurement_approved += 1

    assert len(seen_tuples) == 48
    assert outcomes["QUALIFICATION REQUIRED"] == 28, f"Expected 28 QUALIFICATION REQUIRED, got {outcomes['QUALIFICATION REQUIRED']}"
    assert outcomes["BLOCKED"] == 20, f"Expected 20 BLOCKED, got {outcomes['BLOCKED']}"
    assert survivors == 0, f"Expected 0 qualified survivors, got {survivors}"
    assert procurement_approved == 0, f"Expected 0 procurement approved, got {procurement_approved}"


# -----------------------------------------------------------------------------
# 2. Non-Compensatory Hard Gate Semantics (Sections 12, 13)
# -----------------------------------------------------------------------------

def test_non_compensatory_hard_gate_semantics(canonical_data):
    """
    Every row must evaluate all six gates:
    - physical_fit
    - food_contact
    - thermal_workflow
    - grease_leak
    - transparent_viewing
    - procurement

    Non-compensatory rule:
    - If ANY gate is FAIL => outcome MUST be BLOCKED.
    - If NO gate is FAIL and >= 1 gate is UNKNOWN or QUALIFICATION_REQUIRED => outcome MUST be QUALIFICATION REQUIRED.
    - Environmental or low-virgin-plastic metrics must NEVER compensate for a failed gate.
    """
    required_gates = {
        "physical_fit",
        "food_contact",
        "thermal_workflow",
        "grease_leak",
        "transparent_viewing",
        "procurement",
    }

    gates = canonical_data.get("product_candidate_gates", [])
    for row in gates:
        gate_dict = row["gates"]
        assert set(gate_dict.keys()) == required_gates, f"Missing gates in {row['product_id']}/{row['workflow']}/{row['candidate_id']}"

        statuses = [g["status"] for g in gate_dict.values()]
        for st in statuses:
            assert st in {"PASS", "QUALIFICATION_REQUIRED", "UNKNOWN", "FAIL"}, f"Invalid gate status {st}"

        has_fail = "FAIL" in statuses
        all_pass = all(st == "PASS" for st in statuses)

        if has_fail:
            assert row["outcome"] == "BLOCKED", f"Row with FAIL must be BLOCKED: {row}"
        elif not all_pass:
            assert row["outcome"] == "QUALIFICATION REQUIRED", f"Row with unresolved gates must be QUALIFICATION REQUIRED: {row}"
        else:
            assert row["outcome"] == "QUALIFIED SURVIVOR"

        # Hard invariant: no current row may be a qualified survivor
        assert not row.get("qualified_survivor", False)
        assert not row.get("approved_for_procurement", False)


# -----------------------------------------------------------------------------
# 3. Primary Expected Product Decisions (Section 15, 16)
# -----------------------------------------------------------------------------

def test_primary_expected_product_decisions(canonical_data):
    """
    Assert expected product decisions:
    Under POST_COOK_HOT_HOLD_6H:
    - P1: C1 Gaia has qualification_priority == 1, C6 has qualification_priority == 2.
    - P2: C5 BIOPAP LC SI-14 has qualification_priority == 1, C6 has qualification_priority == 2.
    - P3: C5 BIOPAP LC SI-14 has qualification_priority == 1, C6 has qualification_priority == 2.
    - P4: C5 BIOPAP LC SI-14 has qualification_priority == 1, C6 has qualification_priority == 2.
    - All other candidates have qualification_priority is None.

    Under LITERAL_OVEN_250C_THEN_HOLD:
    - C2, C3, C4, C5 are BLOCKED (thermal_workflow == FAIL).
    - C1 is QUALIFICATION REQUIRED (qualification_priority is None; paper body thermal limits unverified).
    - C6 is QUALIFICATION REQUIRED (qualification_priority == 2; high-temp fallback qualification path).
      C6 must NOT be renumbered as priority 1 or labeled 'winner'.
    """
    gates = canonical_data.get("product_candidate_gates", [])
    lookup = {(r["product_id"], r["workflow"], r["candidate_id"]): r for r in gates}

    # Post-cook checks
    assert lookup[("P1", "POST_COOK_HOT_HOLD_6H", "C1")]["qualification_priority"] == 1
    assert lookup[("P1", "POST_COOK_HOT_HOLD_6H", "C6")]["qualification_priority"] == 2
    assert lookup[("P1", "POST_COOK_HOT_HOLD_6H", "C2")]["qualification_priority"] is None
    assert lookup[("P1", "POST_COOK_HOT_HOLD_6H", "C3")]["qualification_priority"] is None
    assert lookup[("P1", "POST_COOK_HOT_HOLD_6H", "C4")]["outcome"] == "BLOCKED"
    assert lookup[("P1", "POST_COOK_HOT_HOLD_6H", "C5")]["qualification_priority"] is None

    for p in ["P2", "P3", "P4"]:
        assert lookup[(p, "POST_COOK_HOT_HOLD_6H", "C5")]["qualification_priority"] == 1
        assert lookup[(p, "POST_COOK_HOT_HOLD_6H", "C6")]["qualification_priority"] == 2
        assert lookup[(p, "POST_COOK_HOT_HOLD_6H", "C1")]["qualification_priority"] is None
        assert lookup[(p, "POST_COOK_HOT_HOLD_6H", "C2")]["qualification_priority"] is None
        assert lookup[(p, "POST_COOK_HOT_HOLD_6H", "C3")]["qualification_priority"] is None
        assert lookup[(p, "POST_COOK_HOT_HOLD_6H", "C4")]["outcome"] == "BLOCKED"

    # Literal 250C checks
    for p in ["P1", "P2", "P3", "P4"]:
        for c_blocked in ["C2", "C3", "C4", "C5"]:
            row = lookup[(p, "LITERAL_OVEN_250C_THEN_HOLD", c_blocked)]
            assert row["outcome"] == "BLOCKED"
            assert row["gates"]["thermal_workflow"]["status"] == "FAIL"

        c1_row = lookup[(p, "LITERAL_OVEN_250C_THEN_HOLD", "C1")]
        assert c1_row["outcome"] == "QUALIFICATION REQUIRED"
        assert c1_row["qualification_priority"] is None  # Must NOT be priority 1

        c6_row = lookup[(p, "LITERAL_OVEN_250C_THEN_HOLD", "C6")]
        assert c6_row["outcome"] == "QUALIFICATION REQUIRED"
        assert c6_row["qualification_priority"] == 2  # High-temperature fallback qualification path, priority remains 2


# -----------------------------------------------------------------------------
# 4. C6 Configuration Binding & Anti-Leakage (Sections 17, 18)
# -----------------------------------------------------------------------------

def test_c6_configuration_binding_and_anti_leakage(canonical_data):
    """
    Verify configuration integrity for C6:
    - P1 + POST_COOK => C6-RO-W (WePack whole chicken)
    - P2..P4 + POST_COOK => C6-RO-P (E-ambalaj 729 + La Habibi lid)
    - P1..P4 + LITERAL_250C => C6-RO-H (E-ambalaj e-pui225)
    - C6-EU (Plus Pack 0192110201) remains technical reference only.

    Anti-leakage rules:
    - RO-P price (1.1485–1.2915 RON/pair) must NOT qualify RO-H.
    - RO-P transparent lid (a-680681) must NOT qualify RO-W or RO-H transparency.
    - C6-EU 350°C body rating must NOT qualify RO-H (RO-H seller claim is 280°C).
    - Aluminium body heat rating must NEVER qualify complete pack (lids are separate).
    """
    configs = {c["configuration_id"]: c for c in canonical_data.get("configurations", [])}
    assert "C6-RO-P" in configs
    assert "C6-RO-W" in configs
    assert "C6-RO-H" in configs
    assert "C6-EU" in configs

    ro_p = configs["C6-RO-P"]
    ro_w = configs["C6-RO-W"]
    ro_h = configs["C6-RO-H"]
    c6_eu = configs["C6-EU"]

    # 1. Transparency isolation
    assert ro_p["transparency"]["transparent_component_present"]["value"] is True
    # RO-W lid transparency is unknown/unverified
    assert ro_w["transparent_component_present"]["state"] == "UNKNOWN"
    # RO-H transparent lid is absent / unverified
    assert ro_h["transparent_component_present"]["state"] == "UNKNOWN"
    assert ro_h["transparent_component_present"]["value"] is None

    # 2. Temperature limits isolation
    # RO-H body has 280°C seller claim
    ro_h_claims = ro_h.get("thermal_claims", [])
    assert len(ro_h_claims) > 0
    assert ro_h_claims[0]["temperature_c"]["value"] == 280

    # C6-EU has 350°C body rating
    c6_eu_claims = c6_eu.get("thermal_claims", [])
    assert len(c6_eu_claims) > 0
    assert c6_eu_claims[0]["temperature_c"]["value"] == 350

    # Must not cross-pollinate
    assert ro_h_claims[0]["temperature_c"]["value"] != c6_eu_claims[0]["temperature_c"]["value"]

    # 3. Procurement isolation
    assert ro_p["procurement"]["status"]["value"] == "ROMANIA_DISTRIBUTOR_CURRENT"
    ro_p_price = ro_p["procurement"]["romania_unit_price"]["value"]["central"]
    assert ro_p_price == pytest.approx(1.1485, rel=1e-2)

    # RO-H does not inherit RO-P pricing
    ro_h_supplier = ro_h["procurement"]["supplier"]["value"]
    assert "E-ambalaj" in ro_h_supplier
    assert ro_h["price"]["amount"]["value"] == 143  # 143 RON per 100 bodies only (1.43 RON/body), lid absent


# -----------------------------------------------------------------------------
# 5. Baseline Identities & Separation (Sections 10, 27, 28)
# -----------------------------------------------------------------------------

def test_baseline_identities_and_separation(canonical_data):
    """
    Baselines must remain strictly segregated:
    - B1: Actual Profi incumbent bag. Plastic class: VIRGIN_PLASTIC. Exact mass/SKU/cost: UNKNOWN.
    - B1-ESTIMATED: Modelled scenario (E002, 2.6–12.5 g, central 6.5 g, NOT measured Profi pack).
    - B2: Unresolved virgin all-plastic market reference.
    - B3: Romanian market reference Barleta bag (greaseproof paper + plastic strip).
      MUST NEVER be labeled 'Profi baseline'.
    """
    baselines = {b["baseline_id"]: b for b in canonical_data.get("baselines", [])}
    assert "B1" in baselines
    assert "B2" in baselines
    assert "B3" in baselines

    b1 = baselines["B1"]
    b2 = baselines["B2"]
    b3 = baselines["B3"]

    # B1 checks
    assert b1["is_profi_incumbent"] is True
    assert b1["identity"] == "ACTUAL_PROFI_INCUMBENT"
    assert b1["observed"]["material_class"]["value"] == "plastic"
    assert b1["observed"]["virgin_plastic_fraction"]["value"] == 1.0
    assert b1["observed"]["mass_g"]["state"] == "UNKNOWN"
    assert b1["estimated"]["total_package_mass_g"]["state"] == "ESTIMATED"
    assert b1["estimated"]["total_package_mass_g"]["value"]["central"] == pytest.approx(6.4985, rel=1e-2)
    assert b1["estimated"]["cost"]["state"] == "UNKNOWN"

    # B1-ESTIMATED calculation checks (E002)
    calc_e002 = next((c for c in canonical_data.get("calculations", []) if c["calculation_id"] == "E002"), None)
    assert calc_e002 is not None
    assert calc_e002["low"] == pytest.approx(2.59165, rel=1e-2)
    assert calc_e002["central"] == pytest.approx(6.4985, rel=1e-2)
    assert calc_e002["high"] == pytest.approx(12.46, rel=1e-2)
    assert calc_e002["state"] == "ESTIMATED"

    # B3 checks: Romanian market reference, NOT Profi incumbent
    assert b3["is_profi_incumbent"] is False
    assert b3["identity"] == "ROMANIAN_CONVENTIONAL_MARKET_REFERENCE"
    assert "Barleta" in b3["name"]
    assert b3["observed_price"]["amount"]["value"] == 370.26  # 370.26 RON per pack of 1000 bags (0.37 RON/pc)


# -----------------------------------------------------------------------------
# 6. Thermal Conflicts & Family vs System Boundaries (Sections 21, 22)
# -----------------------------------------------------------------------------

def test_c5_biopap_conflicts_and_family_boundaries(canonical_data):
    """
    C5 BIOPAP LC / SI-14 acceptance:
    - 175°C vs 185°C (60 min) must remain CONFLICT (conflict ID C01).
    - 6h @ 90°C and 5h @ 100°C are LC family claims, NOT proof of exact SI-14 + selected film + food matrix.
    - UI/API must require qualification qualifier and must not collapse conflict into a single value.
    """
    cand_c5 = next((c for c in canonical_data.get("candidates", []) if c["candidate_id"] == "C5"), None)
    assert cand_c5 is not None
    assert cand_c5["peak_temperature_resolution"]["state"] == "CONFLICT"
    assert cand_c5["peak_temperature_resolution"]["value"]["current_page_c"] == 185
    assert cand_c5["peak_temperature_resolution"]["value"]["alternate_c"] == 175
    assert cand_c5["six_hour_hold"]["scope"] == "FAMILY_CLAIM"


# -----------------------------------------------------------------------------
# 7. Virgin Plastic Reduction Bounds (Section 26)
# -----------------------------------------------------------------------------

def test_virgin_plastic_reduction_bounds_preservation(canonical_data):
    """
    For C5 SI-14:
    - Calculation E051 (virgin plastic reduction vs B1-ESTIMATED) has range crossing zero:
      low: -67.6%, high: +82.1%, central: 52.5%.
    - No unconditional positive reduction claim is permitted.
    - Must preserve full interval and state == ESTIMATED.
    """
    calc_e051 = next((c for c in canonical_data.get("calculations", []) if c["calculation_id"] == "E051"), None)
    assert calc_e051 is not None
    assert calc_e051["low"] < 0, f"Expected lower bound to cross zero, got {calc_e051['low']}"
    assert calc_e051["high"] > 0, f"Expected upper bound > 0, got {calc_e051['high']}"
    assert calc_e051["central"] == pytest.approx(52.54, rel=1e-2)
    assert calc_e051["state"] == "ESTIMATED"


# -----------------------------------------------------------------------------
# 8. Black-box Runtime Integration State (Section 48, 55)
# -----------------------------------------------------------------------------

def test_blackbox_recommendation_api_absence_fails_closed(api_client):
    """
    Verify current runtime implementation state:
    - Target recommendation endpoint `/api/v1/recommendations` is NOT yet integrated on main @ e067764.
    - Requesting it returns 404 Not Found (fail-closed), rather than serving unevidenced or mock recommendations.
    - Legacy endpoints (`/api/v1/health`, `/api/v1/portfolios`) remain intact for Selection MVP reference.
    """
    # 1. Target recommendation route is not present
    res = api_client.get("/api/v1/recommendations")
    assert res.status_code == 404, f"Expected 404 for unintegrated recommendation route, got {res.status_code}"

    # 2. Existing reference routes remain functional
    health_res = api_client.get("/api/v1/health")
    assert health_res.status_code in (200, 503)

    portfolios_res = api_client.get("/api/v1/portfolios")
    assert portfolios_res.status_code in (200, 503)
