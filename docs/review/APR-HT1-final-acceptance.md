# APR-HT1 — HTF-03 Recommendation Acceptance & Claims Safety Audit Report

**Document class:** PRODUCT ACCEPTANCE / CLAIMS SAFETY AUDIT REPORT  
**Contract:** APR-HT1 — HTF-03 Recommendation Acceptance & Claims Safety  
**Auditor / Owner:** Alisa (Product / QA / Acceptance)  
**Role:** Product / QA / Acceptance / Claims Safety  
**Target Repository:** `Slave-of-Skynet/gigafood`  
**Audited Base SHA:** `a15ae948f0ea36bfda127e783684622df07e0b83` (`origin/main`)
**Audit Branch:** `alisa/apr-ht1-recommendation-acceptance`  
**Upstream Contract:** `INT-HTF-04A — Canonical Runtime Transition & Parallelization Gate` (`e069950`)  
**Canonical Evidence Baseline:** `docs/evidence/htf-03/**` (`bd4f765`)  
**Execution Date:** 2026-09-26  

---

## 1. Audited Base / Implementation SHA

- **Repository:** `Slave-of-Skynet/gigafood`
- **Accepted Base Commit:** `a15ae948f0ea36bfda127e783684622df07e0b83`
  - Merges: PR #35 (`feat/igr-ht2-recommendation-runtime`), PR #37 (`denis/pux-ht2-recommendation-ux`), PR #36 (`nicolae/ncp-ht1-pitch-narrative`), PR #33 (`origin/Vladimir/int-htf-04a-canonical-runtime-transition`).
  - Prior Base Parent: `e067764d334e260440ed69ae6d68dab42205b3a4`
- **Implementation State:** Backend on `main` now implements both the historical Selection MVP (`/api/v1/portfolios`, `/api/v1/scenarios`) and the complete additive Recommendation Runtime API (`GET /api/v1/recommendation/products`, `GET /api/v1/recommendation/candidates`, `POST /api/v1/recommendation/evaluate`) per `INT-HTF-04A` Section H and `IGR-HT2`. Frontend on `main` mounts `RecommendationView` (`navRecommendation: 'Recommendation Journey'`) with full product/workflow selectors, qualification cards, epistemic badges, and stale-response protection per `PUX-HT2`.

---

## 2. Evidence Revision

- **Evidence Baseline:** `docs/evidence/htf-03/**`
- **Schema Version:** `htf03.evidence.v1`
- **Dataset ID:** `HTF-03-canonical-packaging`
- **Research Cut-off Date:** `2026-09-26`
- **Canonical Evidence Validator:** `python scripts/validate_htf03.py --self-test` executed:
  ```text
  PASS: 6 candidates; 3 distinct baselines; 126 sources; 63 recomputed calculations; 48 gate rows.
  PASS: 41 rejected mutation cases; valid all-plastic equality accepted.
  Scope: schema, arithmetic, provenance boundaries and display consistency; not physical/safety qualification.
  ```

---

## 3. Acceptance Scope

1. **Phase A — Independent Acceptance Oracle & Claims Matrix:**
   - Establish ground truth expected outcomes across all **48 combinations** of 4 Products (`P1`–`P4`) × 2 Workflows (`POST_COOK_HOT_HOLD_6H`, `LITERAL_OVEN_250C_THEN_HOLD`) × 6 Candidates (`C1`–`C6`).
   - Define strict non-compensatory 6-gate evaluation model.
   - Enforce C6 configuration binding and anti-leakage isolation.
   - Deliver authoritative matrix files:
     - `docs/review/APR-HT1-recommendation-acceptance-matrix.md`
     - `docs/review/APR-HT1-claim-safety-matrix.md`
2. **Phase B — Implementation Verification & Falsification:**
   - Add black-box automated acceptance tests under `backend/tests/acceptance_htf04/test_acceptance_oracle.py`.
   - Verify current API / UI / runtime state against the oracle.
   - Audit failure modes, boundary preservation, and claim safety.

---

## 4. Challenge Requirement Coverage

Evaluated against the official AgriFood challenge judging criteria:
1. **Environmental Impact (25%):** `PARTIALLY SUPPORTED`. Incumbent 100% virgin plastic baseline identified (`B1`); renewable paper Gaia (`C1`) and cellulose tray (`C5`) prioritized; rigorous virgin-plastic reduction formulas defined (`E051`, `E008`). Gaps: unmeasured physical candidate virgin mass; real-world Romanian sorting/recycling reality unverified.
2. **Retail Practicality (15%):** `PARTIALLY SUPPORTED`. Respects mentor preference for bags for whole chicken (`C1`) and trays for portions (`C5`); post-cook holding (modeled 85–95°C scenario; actual Profi holding temp UNKNOWN) separated from in-pack baking (250°C); transparent viewing accounted for. Gaps: store packing speed, fat accumulation headroom (modeled 1.0–1.4 kg test scenario; actual Profi chicken mass UNKNOWN), 6-hour seam leak resistance under hot fat.
3. **Technical Feasibility (15%):** `SUPPORTED`. 6-gate evaluation model strictly enforced; thermal failure modes blocked (C2/C3/C4/C5 at 250°C); 48-row decision matrix grounded in verified TDS. Gaps: DoC migration certificates for fatty food, BIOPAP 175/185°C conflict.
4. **Innovation (10%):** `SUPPORTED`. Evidence-first decision support architecture; rigorous epistemic state modeling; dual-path qualification (renewable bag vs cellulose tray vs high-temp aluminium fallback).
5. **Business Viability (10%):** `PARTIALLY SUPPORTED`. Grounded Romanian prices captured for local components (1.15–1.29 RON/pair for portion pack, 0.37 RON for B3); mentor +10–15% cost tolerance integrated as context. Gaps: actual Profi incumbent purchase price UNKNOWN; European import freight unquoted.
6. **Scalability (10%):** `PARTIALLY SUPPORTED`. Local Romanian suppliers identified as catalogue/order leads (`listing ≠ stock`); established European manufacturers capable of volume. Gaps: supply chain capacity, inventory, and supply contracts for retail store network (modeled 1,700 stores scenario; actual store count UNKNOWN) unverified.
7. **User Experience (UX) (10%):** `PARTIALLY SUPPORTED`. Frontend UI components, state management, epistemic badges, and stale-response protection are fully implemented on `main` and verified via automated build (`npm run build` PASS); live in-browser visual interaction and screenshot verification remain `UNVERIFIED` in headless CI environment. Gaps: in-store customer handling, anti-fog behavior under high humidity.
8. **Presentation (5%):** `SUPPORTED`. Defensible, evidence-backed narrative; clear visual separation between proven facts and open validation items.

---

## 5. Mentor Clarification & Modeled Validation Scenario Coverage

Reconciled against domain input from the 11:19 Descript clarification, strictly separating **Explicit Mentor Clarifications** (12 items reconciled) from **Modeled Validation Scenarios, Regulatory Requirements & Technical Gates**:

### 5.1 Explicit Mentor Clarifications
- **Packaging Concept Deliverable (`MENTOR_CLARIFICATION`):** `OBSERVED_VERIFIED`. Sustainable physical packaging concept is the primary competition deliverable; software serves as a decision support and evidence tracking layer.
- **M01 Virgin Plastic Reduction (`MENTOR_CLARIFICATION`):** `ESTIMATED`. Incumbent rotisserie bag defined as 100% virgin plastic; modeled scenarios show reduction potential, but physical masses remain unmeasured. C5 range crosses zero (-67.6% to +82.1%).
- **M02 200–250°C Oven Context (`MENTOR_CLARIFICATION`):** `OBSERVED_VERIFIED` (Seller claim). Mentor articulated 200–250°C oven reheating/cooking context; the in-pack baking stress workflow (`LITERAL_OVEN_250C_THEN_HOLD`) is an engineering stress scenario. C6-RO-H (e-pui225) body offers 280°C seller claim; duration and compatible clear lid unverified; C2/C3/C4/C5 fail thermally.
- **M04 Up to 6 Hours Holding (`MENTOR_CLARIFICATION`):** `OBSERVED_VERIFIED` (Family). Mentor stated hot holding duration of up to 6 hours; holding temperature (85–95°C) is a modeled test condition (actual Profi display temp UNKNOWN). Tested against BIOPAP 6h/90°C LC family claim; exact SI-14 tray + film + chicken fat combination must be qualified.
- **M06 Grease & Oil Barrier Requirement (`MENTOR_CLARIFICATION`):** `UNKNOWN`. Mentor articulated need for robust grease and oil barrier for hot chicken; specific physical 6-hour seam and substrate leak test protocol under hot fat is technical validation.
- **M07 Transparent Viewing (`MENTOR_CLARIFICATION`):** `OBSERVED_VERIFIED` (Components). Clear windows/lids included in all paths for customer inspection; anti-fog performance requires validation.
- **M08 Small Portions Differentiation (`MENTOR_CLARIFICATION`):** `QUALIFICATION_REQUIRED`. BIOPAP LC SI-14 tray + clear film is primary qualification lead for P2–P4 deli portions.
- **M09 Whole Chicken Format (`MENTOR_CLARIFICATION`):** `QUALIFICATION_REQUIRED`. Flexible windowed bag (Gaia C1) prioritized over rigid box to solve sizing and storage constraints; modeled 1.0–1.4 kg hot chicken sizing is an engineering test assumption.
- **M10 Recyclability Requirement (`MENTOR_CLARIFICATION`):** `OBSERVED_VERIFIED` (Design). Mentor specified packaging concept must be recyclable; real-world Romanian sorting, collection, and recycling infrastructure reality for greasy packaging is an open research question (UNKNOWN).
- **M11 Avoid Problematic Multilayers (`MENTOR_CLARIFICATION`):** `OBSERVED_VERIFIED`. Excluded unrecyclable metallized laminates in favor of monomaterials and paper.
- **M12 Cost Practicality / +10–15% Context (`MENTOR_CLARIFICATION`):** `ASSUMED` (Context). +10–15% cost delta integrated as context, not an automatic pass threshold; 1,700 stores retail network volume scaling is a modeled economic scenario.
- **M14 Formal Certificates & Evidence (`MENTOR_CLARIFICATION`):** `OBSERVED_VERIFIED`. Company evaluates feasibility based on formal certificates and DoCs; tracked as required next actions.

### 5.2 Modeled Validation Scenarios, Regulatory Requirements, Research & Technical Gates
- **M02 LITERAL_OVEN_250C_THEN_HOLD Workflow (`MODELED_WORKFLOW`):** Engineering stress-test scenario evaluating in-pack baking up to 250°C; C2/C3/C4/C5 fail thermally; C6-RO-H fallback.
- **M03 Rotisserie Outside Pack SOP (`OPERATIONAL_ASSUMPTION`):** `ASSUMED`. Operational baseline assuming rotisserie cooking outside package, then hot transfer to packaging for display.
- **M04 85–95°C Display Holding Condition (`MODELED_TEST_CONDITION`):** Hot deli display holding temperature range modeled for shelf-life testing (actual Profi display temp UNKNOWN).
- **M05 Food Contact Safety (`REGULATORY_REQUIREMENT`):** `UNKNOWN`. Mandatory legal compliance under EU 10/2011; Declaration of Compliance (DoC) and fatty food migration testing (Simulant D2) remain supplier obligations.
- **M06 Physical Seam & Fat Leak Test Protocol (`TECHNICAL_VALIDATION`):** `UNKNOWN`. Physical 6-hour seam and substrate leak testing under modeled hot display conditions.
- **M09 Modeled 1.0–1.4 kg Whole Chicken Sizing (`MODELED_TEST_ASSUMPTION`):** Engineering sizing test assumptions (actual Profi bird mass and fat accumulation headroom UNKNOWN).
- **M10 Romanian Municipal Recovery Reality (`RESEARCH_INVESTIGATION`):** `UNKNOWN`. Local municipal collection, sorting, and organic/paper recycling capabilities for post-consumer food packaging in Romania.
- **M12 Modeled 1,700 Stores Network Scale (`MODELED_ECONOMIC_SCENARIO`):** Volume scaling scenario for economic modeling (actual Profi store count and contract volumes UNKNOWN).
- **M13 Composition & Layer Transparency (`TECHNICAL_DISCLOSURE`):** `OBSERVED_VERIFIED` / `UNKNOWN`. Substrate layers and film gauges documented; proprietary adhesives unknown.
- **M15 Romania Procurement Routes (`HTF-03_RESEARCH` / `PROCUREMENT_EVIDENCE`):** `OBSERVED_VERIFIED` (Catalogue Listings). Market research identified local Romanian distributors (E-ambalaj, La Habibi, Barleta) as current catalogue/order leads (listing ≠ stock); verified stock, lead times, and commercial terms require inquiry.

---

## 6. P1–P4 × Workflow Matrix

Across all 48 combinations:
- **`POST_COOK_HOT_HOLD_6H` (Primary Assumed Workflow):**
  - **`P1` (Whole chicken):** `C1 Gaia` is primary qualification lead (priority 1); `C6-RO-W` is secondary (priority 2). Status: `QUALIFICATION REQUIRED`. Zero survivors.
  - **`P2` (Wings/thighs):** `C5 BIOPAP LC SI-14` is primary qualification lead (priority 1); `C6-RO-P` is secondary (priority 2). Status: `QUALIFICATION REQUIRED`. Zero survivors.
  - **`P3` (Potatoes/veg):** `C5 BIOPAP LC SI-14` is primary qualification lead (priority 1); `C6-RO-P` is secondary (priority 2). Status: `QUALIFICATION REQUIRED`. Zero survivors.
  - **`P4` (Meat portions):** `C5 BIOPAP LC SI-14` is primary qualification lead (priority 1); `C6-RO-P` is secondary (priority 2). Status: `QUALIFICATION REQUIRED`. Zero survivors.
  - Candidate `C4 Faerch CPET` is `BLOCKED` across all rows due to discontinued exact track (`procurement: FAIL`).
- **`LITERAL_OVEN_250C_THEN_HOLD` (Thermal Inversion Workflow):**
  - Candidates `C2`, `C3`, `C4`, `C5` are **STRICTLY BLOCKED** (`thermal_workflow: FAIL`).
  - Candidate `C1 Gaia`: `QUALIFICATION REQUIRED` (paper body thermal limit at 250°C unverified; priority = None).
  - Candidate `C6 Aluminium`: Binds to `C6-RO-H` (e-pui225). High-temperature fallback qualification path.
  - Status: `QUALIFICATION REQUIRED` (priority = 2). **Priority remains 2; never renumbered as priority 1 or declared a winner**.

---

## 7. Gate Semantics

The six hard gates are evaluated non-compensatorily:
1. `physical_fit`: 48/48 rows evaluated (`QUALIFICATION_REQUIRED`).
2. `food_contact`: 48/48 rows evaluated (`UNKNOWN`).
3. `thermal_workflow`: 28 `QUALIFICATION_REQUIRED` / `UNKNOWN`, 16 `FAIL` (C2, C3, C4, C5 under literal 250°C), 4 `FAIL` (C4 procurement).
4. `grease_leak`: 48/48 rows evaluated (`UNKNOWN`).
5. `transparent_viewing`: 44 `QUALIFICATION_REQUIRED`, 4 `UNKNOWN` (C6 under literal 250°C).
6. `procurement`: 40 `QUALIFICATION_REQUIRED`, 8 `FAIL` (C4 across all workflows).

**Non-compensatory enforcement:**
- Any single `FAIL` produces composite outcome `BLOCKED`.
- No `FAIL` + unresolved gates produces composite outcome `QUALIFICATION REQUIRED`.
- Environmental benefits (e.g. low virgin plastic) NEVER compensate for a failed functional gate.

---

## 8. Claims Safety

Strict boundary enforcement:
- **Allowed Wording:** *"First qualification path"*, *"Qualification required"*, *"Alternative"*, *"High-temperature fallback qualification path"*, *"Evidence required"*, *"Estimated"*, *"Unknown"*, *"Conflict"*.
- **Forbidden Wording:** *"Winner"*, *"Best"*, *"Approved"*, *"Certified"*, *"Safe"*, *"Ready for deployment"*, *"Guaranteed recyclable"*, *"Guaranteed cost-effective"*.
- **Zero Survivors:** Current snapshot has **0 qualified survivors**. Any claim that a candidate has "won" or is "cleared for Profi deployment" is a critical safety defect.

---

## 9. Baseline Semantics

- **`B1` (Actual Profi Incumbent):** Bag, virgin plastic, virgin fraction 1.0. Mass, dimensions, SKU, polymer, supplier, cost, and annual units remain `UNKNOWN`.
- **`B1-ESTIMATED` (Modeled Scenario):** Modeled PET/PA commercial rotisserie bag geometry. Total mass central **6.5 g** (range 2.6–12.5 g, `ESTIMATED`). Comparison copy must state *"estimated Profi baseline scenario"*.
- **`B2` (Virgin Plastic Market Reference):** Unresolved virgin plastic market reference; never replaced by paper or aluminium.
- **`B3` (Romanian Market Reference):** Barleta 128002 paper + PP rotisserie bag (370.26 RON / 1000 pcs, 0.37 RON/pc). **MUST NEVER BE CALLED "PROFI BASELINE"**.

---

## 10. C6 Configuration Integrity

Strict isolation enforced across the four configurations:
- `P1` + `POST_COOK` → `C6-RO-W` (WePack 803261+803262).
- `P2`–`P4` + `POST_COOK` → `C6-RO-P` (E-ambalaj 729 + La Habibi lid).
- `P1`–`P4` + `LITERAL_250C` → `C6-RO-H` (E-ambalaj e-pui225).
- `C6-EU` (Plus Pack) → Technical reference only.

**Anti-Leakage Assertions:**
- RO-P price (1.15–1.29 RON/pair) does NOT qualify RO-H.
- RO-P transparent lid (a-680681) does NOT qualify RO-W or RO-H transparency.
- C6-EU 350°C body rating does NOT qualify RO-H (RO-H seller claim is 280°C).
- Aluminium body rating does NOT qualify complete pack (lids are separate).

---

## 11. Estimates / Conflicts / Unknown Handling

- **`UNKNOWN`:** Rendered explicitly as `UNKNOWN`; never coerced to 0. Missing numbers block dependent totals.
- **`ESTIMATED`:** Rendered with central scenario value, lower bound, upper bound, `ESTIMATED` badge, and confidence level.
- **`CONFLICT`:** BIOPAP LC peak oven temperature contains conflicting literature: **175°C vs 185°C (60 min)**. Must remain `CONFLICT`; neither value may be chosen silently.
- **Family vs Exact System:** BIOPAP 6h @ 90°C is an LC family claim; UI/API must qualify it as family evidence, not exact SI-14+film+chicken validation.

---

## 12. Procurement / Price / EOL

- **Procurement Status:** Domestic distributor listing (`ROMANIA_DISTRIBUTOR_CURRENT`) is a current catalogue/order lead and does NOT imply audited stock or delivery confirmation (`listing ≠ stock`). European candidates require written distributor quotes, MOQs, and lead times.
- **Price Transparency:** Displayed with explicit currency (RON or EUR), VAT basis (included), order units, and freight basis. No silent currency conversions.
- **End-of-Life:** Design for recycling/composting is distinguished from real-world Romanian municipal waste outcomes.

---

## 13. Negative / Adversarial Cases (All 20 Cases from Section 51)

1. *UNKNOWN rendered as 0:* **PASS (Automated Runtime & UI Code Evidence)**. Unknown virgin plastic or mass blocks calculation and never coerces to 0 (`test_canonical_snapshot_invariants`, `test_recommendation.py`). UI component `MetricField.tsx` explicitly checks `metric.state === 'UNKNOWN'` and renders `"UNKNOWN"`, never `0`.
2. *ESTIMATED rendered as verified:* **PASS (Automated Runtime & UI Code Evidence)**. Estimates require explicit badge and bound intervals (`test_canonical_snapshot_invariants`). UI components `EvidenceStateBadge.tsx` and `MetricField.tsx` render explicit `ESTIMATED` badge and interval bounds `[low, high]`.
3. *Central estimate shown without range:* **PASS (Automated Runtime & UI Code Evidence)**. Scenarios retain explicit bounds alongside central estimates (`test_canonical_snapshot_invariants`). UI displays scenario interval range alongside central estimate in `MetricField.tsx`.
4. *CONFLICT collapsed into one value:* **PASS (Automated Runtime & UI Code Evidence)**. BIOPAP 175°C vs 185°C preserved as `CONFLICT` (`test_c5_biopap_conflicts_and_family_boundaries`, `test_recommendation.py`). UI `CandidateRecommendationCard.tsx` preserves and displays both conflicting literature values with `CONFLICT` badge.
5. *C6-RO-P evidence borrowed by C6-RO-H:* **PASS (Automated Runtime Evidence)**. Configuration isolation and anti-leakage strictly enforced (`test_c6_configuration_binding_and_anti_leakage`, `test_recommendation.py`).
6. *B3 promoted to Profi baseline:* **PASS (Automated Runtime Evidence)**. B3 strictly isolated as Romanian market reference only (`test_baseline_identities_and_separation`, `test_recommendation.py`).
7. *Faerch legacy baseline promoted to Profi:* **PASS (Automated Runtime Evidence)**. Historical Faerch baseline isolated to Selection MVP reference (`test_baseline_identities_and_separation`, `test_recommendation.py`).
8. *Failed thermal gate compensated by low plastic:* **PASS (Automated Runtime Evidence)**. Non-compensatory logic strictly enforced; thermal failure produces composite outcome `BLOCKED` (`test_non_compensatory_hard_gate_semantics`, `test_recommendation.py`).
9. *No survivors but UI invents a recommendation winner:* **FIX REQUIRED (UI Terminology Defect)** / **Runtime PASS**. Canonical snapshot invariants verify 0 qualified survivors across all 48 rows (`test_canonical_snapshot_invariants`). API returns `qualified_survivors: []`. UI `DecisionSummary.tsx` renders `Qualified Survivors: 0 / 6` and `QUALIFICATION REQUIRED`, but user-visible strings in `DecisionSummary.tsx` (*"Peak Oven 250°C: No Unqualified Winner · C6-RO-H High-Temp Fallback"*) and `RecommendationView.tsx` (*"No Priority 1 Winner Available for Literal 250°C Oven Path"*) use the forbidden word *"Winner"*, violating APR-HT1 claim safety rules. (Tracked as `DEF-03`).
10. *Price missing but displayed as 0:* **PASS (Automated Runtime & UI Code Evidence)**. Missing price preserved as None / Quote Required, never 0. UI `ProcurementSummary.tsx` displays `"Quote Required"`, never `0.00 RON`.
11. *Actual stock inferred from listing:* **PASS (Document & Runtime Invariant Tested)**. Distributor listing strictly defined as catalogue/order lead (`listing ≠ stock`); actual stock is UNKNOWN.
12. *6h90 family claim promoted to exact-system safety:* **PASS (Automated Runtime Evidence)**. BIOPAP 6h @ 90°C qualified as family claim only (`test_c5_biopap_conflicts_and_family_boundaries`, `test_recommendation.py`).
13. *280/350°C body claim promoted to transparent complete system:* **PASS (Automated Runtime Evidence)**. Body thermal rating strictly isolated from closure (`test_c6_configuration_binding_and_anti_leakage`, `test_recommendation.py`).
14. *250°C interpreted as 6h:* **PASS (Automated Runtime Evidence)**. Peak oven exposure and holding duration verified as separate axes (`test_c6_configuration_binding_and_anti_leakage`, `test_recommendation.py`).
15. *Hidden CO₂ scenario leaked:* **PASS (Automated Runtime Evidence)**. Material-only CO₂ calculations isolated from public recommendation API evaluate payload (`test_recommendation.py`).
16. *Stale post-cook result displayed after oven switch:* **PASS (UI Code Evidence) / UNVERIFIED (Visual Browser Interaction)**. `RecommendationView.tsx` implements `evalRequestGenRef` generation counter discarding out-of-order responses upon product/workflow switch. In-browser visual animation and interaction remain UNVERIFIED in headless CI environment.
17. *Old Faerch fallback when HTF-03 unavailable:* **PASS (Automated Runtime Evidence)**. Missing/corrupt HTF-03 snapshot returns `503 RECOMMENDATION_EVIDENCE_UNAVAILABLE` fail-closed rather than falling back to historical Faerch MVP (`test_recommendation.py`).
18. *Unsupported C6-EU context accepted:* **PASS (Automated Runtime Evidence)**. C6-EU strictly absent from canonical gate rows (`test_c6_configuration_binding_and_anti_leakage`). Target API triggers `422 CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT` on evaluation attempt with C6-EU (`test_recommendation.py`).
19. *Actual Profi annual savings invented:* **PASS (Automated Runtime & UI Code Evidence)**. Annual savings uncomputed without unmeasured Profi volume. UI does not invent annual money savings.
20. *+10–15% tolerance treated as procurement approval:* **PASS (Automated Runtime & UI Code Evidence)**. Tolerance treated as commercial context in API effective assumptions and `ProcurementSummary.tsx`, never as an approval gate.

---

## 14. Runtime / API Observations

- **Audited Target API Surface (INT-HTF-04A Section H & IGR-HT2):**
  - `GET /api/v1/recommendation/products`
  - `GET /api/v1/recommendation/candidates`
  - `POST /api/v1/recommendation/evaluate`
- **Live Endpoint Verification on `main @ a15ae948f0ea36bfda127e783684622df07e0b83`:**
  - `GET /api/v1/recommendation/products` returns **`200 OK`** (delivers 4 products P1–P4, 2 workflows, default P1/POST_COOK, composite source revision hash, and effective assumptions).
  - `GET /api/v1/recommendation/candidates` returns **`200 OK`** (delivers 6 candidates C1–C6, configurations C6-RO-P/W/H/EU, baselines B1–B3, referenced sources, rendering contract, disclosures).
  - `POST /api/v1/recommendation/evaluate` returns **`200 OK`** (evaluates 6 hard gates non-compensatorily, 0 qualified survivors, C1 priority 1 for P1 post-cook, C5 priority 1 for P2–P4 post-cook, C6-RO-H priority 2 fallback for literal 250°C oven).
  - **Contract Invariant Verification:**
    - Corrupt or missing HTF-03 evidence context returns **`503 RECOMMENDATION_EVIDENCE_UNAVAILABLE`**.
    - Unsupported configuration context (e.g. `C6-EU`) returns **`422 CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT`**.
    - Unknown product or workflow ID returns **`422 UNKNOWN_PRODUCT_ID` / `UNKNOWN_WORKFLOW_ID`**.
- **Backend Test Suite:** All **162 tests pass** (`pytest backend/tests` in 3.55s), including 23 new recommendation runtime tests in `backend/tests/test_recommendation.py` and 8 acceptance tests in `backend/tests/acceptance_htf04/test_acceptance_oracle.py`. Reference endpoints (`GET /api/v1/health` and `GET /api/v1/portfolios`) remain fully functional.

---

## 15. Browser / UI Observations

- **Frontend Build:** Ran `npm run build` in `frontend/` -> builds cleanly without errors (45 modules transformed, zero TypeScript/lint errors).
- **Target UI Flow (PUX-HT2):**
  - `RecommendationView` is mounted in `frontend/src/pages/HomePage.tsx` under mode `'recommendation'` (`navRecommendation: 'Recommendation Journey'`).
  - Full component hierarchy implemented: `ProductSelector`, `WorkflowSelector`, `DecisionSummary`, `CandidateRecommendationCard`, `GateMatrix`, `MetricField`, `ProcurementSummary`, `NextActions`, `EvidenceStateBadge`.
  - Type-safe contracts wired in `frontend/src/api/contracts.ts` and `frontend/src/api/client.ts`.
  - Stale-response protection implemented via `evalRequestGenRef` generation ref in `RecommendationView.tsx` (Case 16).
  - Epistemic badges (`ESTIMATED`, `CONFLICT`, `QUALIFICATION REQUIRED`, `OBSERVED`, `DERIVED`) and 0-survivors count badge (`Qualified Survivors: 0 / 6`) are displayed directly in code.
- **Status Demarcation:**
  - Automated code/component verification: **`PASS (Code Evidence)`** except terminology defect `DEF-03`.
  - Live in-browser visual interaction and screenshot verification: **`UNVERIFIED (Visual Browser Interaction)`** (headless build verified; interactive browser session with DOM screenshots not executed in headless CI).

---

## 16. Defects Register

| Defect ID | Component | Severity | Description | Resolution / Status |
|---|---|---|---|---|
| ~~**DEF-01**~~ | Backend / Runtime | ~~P0 / Blocker~~ | Target recommendation endpoints (`GET /api/v1/recommendation/products`, `candidates`, `POST evaluate`) proposed in `INT-HTF-04A`. | **CLOSED / RESOLVED**: Implemented by Igor in PR #35 (`feat/igr-ht2-recommendation-runtime`) merged into `main @ a15ae94`. Verified passing 162/162 tests. |
| ~~**DEF-02**~~ | Frontend / UX | ~~P0 / Blocker~~ | Frontend recommendation UI shell wiring to HTF-03 recommendation API. | **CLOSED / RESOLVED**: Implemented by Denis in PR #37 (`denis/pux-ht2-recommendation-ux`) merged into `main @ a15ae94`. Verified passing `npm run build`. |
| **DEF-03** | Frontend / UX | P1 / Terminology | User-visible "Winner" wording violates APR-HT1 forbidden claim terminology: `DecisionSummary.tsx` renders *"Peak Oven 250°C: No Unqualified Winner · C6-RO-H High-Temp Fallback"* and `RecommendationView.tsx` renders *"No Priority 1 Winner Available for Literal 250°C Oven Path"*. | **OPEN**: Denis to replace "Winner" with approved claim terms (e.g. "Qualified Survivor" / "Priority 1 Qualification Path"). |

**Open Software Defects:** **1** (`DEF-03`).
*(Note: BIOPAP 175°C vs 185°C manufacturer literature conflict is tracked as open evidence gap `C01`, not a software implementation defect).*

---

## 17. Remaining UNKNOWN & Evidence Gaps

1. Profi actual packaging baseline: mass, dimensions, polymer, procurement price, and annual volume.
2. Official Declaration of Compliance (DoC) and fatty-food migration test certificates for all candidates (EU 10/2011, Simulant D2).
3. Seam integrity and grease leakage under hot chicken juices over 6 hours under modeled 85–95°C display conditions (actual Profi holding temp UNKNOWN).
4. Physical whole chicken fit checks for modeled 1.0–1.4 kg hot whole birds (actual Profi chicken mass distribution UNKNOWN) in Gaia bags.
5. In-store worker sealing speed and consumer handle ergonomics.
6. Industrial volume supply contracts, MOQs, and lead times for retail store network (modeled 1,700 stores scenario; actual store count and network volume UNKNOWN).
7. BIOPAP LC peak oven temperature literature conflict (**175°C vs 185°C (60 min)**, accepted `CONFLICT` `C01`) remains an open evidence gap to be resolved with the manufacturer.

---

## 18. Final Verdict

### **ACCEPTANCE CONDITIONAL (RUNTIME PASS; UI CODE PASS EXCEPT TERMINOLOGY DEFECT; LIVE BROWSER UNVERIFIED)**

- **Phase A (Acceptance Oracle & Claim Safety):** **COMPLETE & AUTHORITATIVE**. Master 48-row acceptance matrix, claim safety taxonomy, challenge coverage matrix, 12 mentor requirement reconciliations, and 8 automated acceptance tests established and verified.
- **Phase B (Software Implementation Verification):** **CONDITIONAL (Runtime PASS; UI Code PASS Except Terminology Defect; Live Browser UNVERIFIED)**.
  - Backend recommendation API (`GET products`, `GET candidates`, `POST evaluate`), 503 fail-closed on missing evidence, 422 on invalid context, non-compensatory 6-gate model, and anti-leakage isolation verified passing 162/162 automated tests.
  - Frontend component architecture, epistemic badges, 0-survivor display (`qualified_survivors: []`), and stale-response protection verified in code (`npm run build` PASS). However, user-visible "Winner" wording in `DecisionSummary.tsx` and `RecommendationView.tsx` violates APR-HT1 forbidden terminology (`DEF-03`, open).
- **Physical Feasibility & Live Browser Gate:** **BLOCKED: MISSING EVIDENCE**.
- **Minimum Missing Evidence:**
  1. Resolution of `DEF-03` (replace user-visible "Winner" wording with approved claim terms in frontend).
  2. Live in-browser visual execution / screenshot verification of the interactive UI flow in an active browser session.
  3. Physical supplier DoC / EU 10/2011 fatty-food migration lab certificates, physical 6-hour hot fat seam leak testing, and commercial distributor stock/lead-time confirmations.

---

## Handoff Summary

```text
Base SHA: a15ae948f0ea36bfda127e783684622df07e0b83
Audited implementation SHA: a15ae948f0ea36bfda127e783684622df07e0b83
HTF-03 source revision/hash: bd4f7651fe9f82f5c0849c5708fcd2f315052317

Files created:
- docs/review/APR-HT1-recommendation-acceptance-matrix.md
- docs/review/APR-HT1-claim-safety-matrix.md
- docs/review/APR-HT1-final-acceptance.md
Tests created:
- backend/tests/acceptance_htf04/__init__.py
- backend/tests/acceptance_htf04/test_acceptance_oracle.py

Challenge coverage:
- Environmental impact (25%): PARTIALLY SUPPORTED
- Retail practicality (15%): PARTIALLY SUPPORTED
- Technical feasibility (15%): SUPPORTED
- Innovation (10%): SUPPORTED
- Business viability (10%): PARTIALLY SUPPORTED
- Scalability (10%): PARTIALLY SUPPORTED
- UX (10%): PARTIALLY SUPPORTED (Code & build SUPPORTED; live visual browser session UNVERIFIED)
- Presentation (5%): SUPPORTED

Mentor & scenario coverage:
- 12 explicit mentor clarifications reconciled (packaging concept deliverable, virgin plastic definition, 200–250°C oven context, up to 6h holding, grease/oil barrier, viewing window, portions, bag format over box, recyclable requirement, avoid unrecyclable multilayers, +10–15% cost context, formal certificates)
- Modeled validation scenarios, research & technical gates separated (250°C in-pack workflow, 85–95°C holding condition, rotisserie SOP, DoC EU 10/2011, seam leak test protocol, 1.0–1.4 kg sizing, Romanian recovery reality UNKNOWN, 1,700 stores scale, BOM disclosure, Romania procurement routes research)

P1 POST_COOK: C1 Gaia (qualification_priority=1, outcome=QUALIFICATION REQUIRED, 0 survivors)
P1 LITERAL_250: C6-RO-H (qualification_priority=2, outcome=QUALIFICATION REQUIRED, C2-C5 BLOCKED)
P2 POST_COOK: C5 BIOPAP LC SI-14 (qualification_priority=1, outcome=QUALIFICATION REQUIRED, 0 survivors)
P3 POST_COOK: C5 BIOPAP LC SI-14 (qualification_priority=1, outcome=QUALIFICATION REQUIRED, 0 survivors)
P4 POST_COOK: C5 BIOPAP LC SI-14 (qualification_priority=1, outcome=QUALIFICATION REQUIRED, 0 survivors)

Snapshot counts:
- gate rows: 48
- qualification required: 28
- blocked: 20
- survivors: 0
- procurement approvals: 0

B1/B2/B3 separation: STRICTLY PRESERVED (B3 is Romanian reference, NEVER Profi baseline)
C6 configuration binding: STRICTLY BOUND (P1->RO-W, P2-P4->RO-P, 250C->RO-H, EU reference only)
C5 conflict: PRESERVED (175 C vs 185 C remains CONFLICT C01)
6h family-vs-system boundary: PRESERVED (LC family claim, exact pack requires qualification)

UNKNOWN handling: NEVER ZERO (blocks dependent calculations)
ESTIMATED handling: PRESERVES BOUNDS AND SCENARIO ASSUMPTIONS (no verified single points)
CONFLICT handling: VISIBLE IN ALL LAYERS (no silent collapse)

Raw research leakage: EXCLUDED (material-only CO2 isolated from public UI/API)
Legacy claim leakage: EXCLUDED (Faerch Selection isolated to historical reference)

Validator: PASS (validate_htf03.py --self-test passed)
Backend verification: 162 passed (including 8 acceptance tests and 23 recommendation runtime tests)
Frontend verification: PASS (npm run build succeeded)
Demo verification: PASS (scripts/demo.ps1 --check verified active Selection reference)
Browser visual verification: UNVERIFIED (Headless build verified; visual DOM screenshots not executed)

Defects:
- DEF-01: CLOSED (PR #35 merged into main)
- DEF-02: CLOSED (PR #37 merged into main)
- DEF-03: OPEN (User-visible "Winner" terminology defect in DecisionSummary.tsx and RecommendationView.tsx)
- Open software defects: 1

Remaining UNKNOWN:
- Actual Profi incumbent packaging mass/polymer/cost/volume
- Official Declaration of Compliance (DoC) fatty food migration certificates
- 6-hour seam integrity under hot chicken fat under modeled display conditions
- In-store whole bird physical fit (modeled 1.0-1.4 kg hot bird test scenario)
- Volume availability and lead times for retail store network
- BIOPAP 175 C vs 185 C literature conflict (C01 open evidence gap)

VERDICT: ACCEPTANCE CONDITIONAL (RUNTIME PASS; UI CODE PASS EXCEPT TERMINOLOGY DEFECT; LIVE BROWSER UNVERIFIED)
Minimum missing evidence: DEF-03 terminology fix, live visual browser screenshots & physical supplier lab migration/leak certificates.
```
