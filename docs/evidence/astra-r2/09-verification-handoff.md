# ASTRA-R2 — Verification Handoff & Evidence

> **Purpose:** Committed, reproducible verification evidence for the ASTRA-R2 synthesis proposal.
> Existing CI PASS alone is not proof of ASTRA proposal correctness. This document records the
> exact verification commands, invariants checked, and execution outputs.

---

## 1. Reproducible Verification Runner

The primary test runner for ASTRA-R2 is [`astra_r2_verify.py`](file:///docs/evidence/astra-r2/astra_r2_verify.py).
It executes end-to-end and exits with code 0 on success (or code 1 with failure details).

### Command

```bash
python docs/evidence/astra-r2/astra_r2_verify.py
```

### Scope of verification

1. **Step 1: Synthesis Builder Execution**
   - Runs `docs/evidence/astra-r2/build_synthesis.py`.
   - Confirms exit code 0.
   - Asserts `proposed_avoidable_gaps == 0`.
   - Confirms calculation count (562) and projection mapping count (417).

2. **Step 2: Structural Proposal Validation**
   - Validates schema version is `htf03.evidence.v1`.
   - Checks presence and identities of all 6 candidates (C1–C6) and 3 baselines (B1–B3).
   - Verifies B1 epistemic invariants: `observed.mass_g` is untouched (`None`), `virgin_plastic_fraction == 1`.
   - Confirms source IDs (151) and calculation IDs (614) are unique.
   - Verifies 0 dangling source references.
   - Asserts exact 48 gate matrix rows.
   - Validates mass hierarchy: `virgin_plastic_mass <= plastic_mass <= total_mass` for all entities.
   - Validates fraction bounds: all fractions within `[0.0, 1.0]`.
   - Asserts no `ESTIMATED` field is promoted to `DISPLAY_VERIFIED` or `DISPLAY_DERIVED`.

3. **Step 3: Central-Value Consistency (`displayed == ledger`)**
   - Compares 22 critical demo/business central values against `synthesis-ledger.json`.
   - Asserts relative and absolute tolerance `< 1e-4`.
   - Verified fields include:
     - `NETWORK.whole_annual` (ASTRA-E024): 3,168,000 packs/year
     - `NETWORK.portions_annual` (ASTRA-E025): 6,336,000 packs/year
     - `NETWORK.annual_packages` (ASTRA-E026): 9,504,000 packs/year
     - B1 mass (ASTRA-E006): 6.4985 g, cost (ASTRA-E017): 0.723 RON/pack
     - C1 incremental cost (ASTRA-E446): +0.7603 RON/pack, premium (ASTRA-E447): +105.1614%
     - C1 virgin reduction (ASTRA-E444): −4.5815 g/pack, virgin avoided (ASTRA-E453): −14,514.192 kg/year
     - C1 annual spend: baseline (ASTRA-E448) 2,290,464 RON, incremental (ASTRA-E450) +2,408,685 RON
     - C5 incremental cost (ASTRA-E494): +1.9496 RON/pack, reduction (ASTRA-E492): +2.1630 g/pack
     - C5 annual spend: baseline (ASTRA-E496) 4,580,928 RON, incremental (ASTRA-E498) +12,352,813 RON
     - C5 virgin avoided (ASTRA-E501): +13,704.6658 kg/year
     - C6-RO-H incremental cost (ASTRA-E530): +1.3088 RON/pack
     - C6-RO-H annual spend: baseline (ASTRA-E532) 2,290,464 RON, incremental (ASTRA-E534) +4,146,336 RON
     - Geometry fill ratios: C1 (ASTRA-E246) 0.5475, C5 (ASTRA-E332) 1.5731, C6-RO-H (ASTRA-E405) 0.8128

4. **Step 4: Canonical Gate Outcomes Regression & Candidate Matrix Consistency**
   - Asserts `C6` under `LITERAL_OVEN_250C_THEN_HOLD` has `outcome == "QUALIFICATION REQUIRED"` and `qualification_priority == 2` for all 4 products (P1–P4).
   - Asserts `C5` under `LITERAL_OVEN_250C_THEN_HOLD` has `outcome == "BLOCKED"` with `thermal_workflow == FAIL` for all 4 products.
   - Asserts `C5` under `POST_COOK_HOT_HOLD_6H` has `outcome == "QUALIFICATION REQUIRED"` and `qualification_priority == 1` for portions (P2–P4).
   - Asserts `C1` under `POST_COOK_HOT_HOLD_6H` has `outcome == "QUALIFICATION REQUIRED"` and `qualification_priority == 1` for whole chicken (P1).
   - Asserts `ASTRA-E009` provenance: `state == "OBSERVED_VERIFIED"`, basis notes provider/mentor observation of 100% virgin fossil plastic, does NOT imply PET/PA itself was observed.
   - Asserts `05-demo-candidate-matrix.md` consistency: C5 outcome is NOT collapsed to `CONFLICT`, but shows context-specific primary demo-path `QUALIFICATION REQUIRED, priority 1` (P2–P4), literal 250°C `BLOCKED`, and thermal evidence `CONFLICT 175°C vs 185°C`.
   - Verifies exact canonical gate cell counts:
     - `QUALIFICATION_REQUIRED`: 135
     - `UNKNOWN`: 129
     - `FAIL`: 24

5. **Step 5: Evidence State Preservation & Structured Dimensions**
   - Asserts all 17 `OBSERVED_VERIFIED` facts from `gap-inventory-before.json` retain `final_state == "OBSERVED_VERIFIED"` in `gap-matrix-after.json` (0 downgrades to `ASSUMED`).
   - Asserts all 9 `dimensions` inventory rows map to `*.dimensions` calculations with full 3D `[L x W x H]` vectors (no 1D length reduction).

---

## 2. Actual Runner Output

```
=== Step 1: run build_synthesis.py ===
  PASS: build_synthesis.py exit 0
  proposed_avoidable_gaps  = 0
  calculation_count        = 562
  projection_mapping_count = 417
  PASS: proposed_avoidable_gaps = 0

=== Step 2: structural validation of generated proposal ===
  PASS: schema_version = htf03.evidence.v1
  PASS: Candidates: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6']
  PASS: Baselines B1/B2/B3 present
  PASS: B1: provider mass_g untouched (None)
  PASS: B1: virgin_plastic_fraction = 1
  PASS: Source IDs unique (151 total)
  PASS: Calculation IDs unique (614 total)
  PASS: No dangling source references
  PASS: Gate rows = 48
  PASS: Mass ordering and fraction bounds: all OK
  PASS: No ESTIMATED fields promoted to exact display

=== Step 3: central-value consistency (displayed == ledger) ===
  PASS: ASTRA-E024 ASTRA-E024 whole annual: central = 3168000.0
  PASS: ASTRA-E025 ASTRA-E025 portions annual: central = 6336000.0
  PASS: ASTRA-E026 ASTRA-E026 combined annual: central = 9504000.0
  PASS: ASTRA-E006 B1 mass: central = 6.4985
  PASS: ASTRA-E017 B1 cost: central = 0.723
  PASS: ASTRA-E446 C1 incremental cost: central = 0.76031721
  PASS: ASTRA-E447 C1 premium pct: central = 105.16143983
  PASS: ASTRA-E444 C1 reduction g: central = -4.5815
  PASS: ASTRA-E448 C1 baseline annual spend (whole): central = 2290464.0
  PASS: ASTRA-E450 C1 annual incremental cost: central = 2408684.92128
  PASS: ASTRA-E453 C1 annual virgin avoided: central = -14514.192
  PASS: ASTRA-E494 C5 incremental cost: central = 1.9496232
  PASS: ASTRA-E492 C5 reduction g: central = 2.16298387
  PASS: ASTRA-E496 C5 baseline annual spend (portions): central = 4580928.0
  PASS: ASTRA-E498 C5 annual incremental cost: central = 12352812.5952
  PASS: ASTRA-E501 C5 annual virgin avoided: central = 13704.66580032
  PASS: ASTRA-E530 C6-RO-H incremental cost: central = 1.30881818
  PASS: ASTRA-E532 C6-RO-H baseline annual spend (whole): central = 2290464.0
  PASS: ASTRA-E534 C6-RO-H annual incremental cost: central = 4146335.99424
  PASS: ASTRA-E246 C1 whole fill ratio: central = 0.54754453
  PASS: ASTRA-E332 C5 whole fill ratio: central = 1.57311577
  PASS: ASTRA-E405 C6-RO-H whole fill ratio: central = 0.81277648
  PASS: All central-value consistency checks passed

=== Step 4: gate outcome regression ===
  Gate cells: {'QUALIFICATION_REQUIRED': 135, 'UNKNOWN': 129, 'FAIL': 24}
  PASS: Gate outcome regression: C6 LITERAL=QUAL_REQ p2, C5 LITERAL=BLOCKED, C5 POST_COOK=QUAL_REQ p1, C1 POST_COOK=QUAL_REQ p1, matrix consistent

=== Step 5: evidence state preservation & structured dimensions ===
  PASS: All 17 OBSERVED_VERIFIED facts preserved with final_state = OBSERVED_VERIFIED
  PASS: All 9 dimensions rows closed with structured 3D [L x W x H] envelopes

=== SUMMARY: 0 error(s) ===
  ALL CHECKS PASSED
```

---

## 3. Regression Suite Status

| Check | Command | Result |
|---|---|---|
| ASTRA Verification Runner | `python docs/evidence/astra-r2/astra_r2_verify.py` | **0 errors, ALL CHECKS PASSED** |
| Backend Pytest | `.venv\Scripts\python.exe -m pytest backend/tests/ -q` | **162 passed** |
| Demo Preflight | `.venv\Scripts\python.exe scripts/demo.py --check` | **PACKSHIFT DEMO READY** |
| Git Diff Whitespace | `git diff --check` | **CLEAN** |
