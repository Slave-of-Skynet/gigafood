# QA-R3C — Current-Main Final Acceptance Continuation Audit

**Document class:** FINAL ACCEPTANCE / QUALITY ASSURANCE AUDIT REPORT
**Auditor / Executor:** Alisa (QA / Acceptance Owner)
**Target Repository:** `Slave-of-Skynet/gigafood`
**Audited Base SHA:** `410574ccd385f01cc5c599cfa8f349107a85cc42` (`main`)
**Audit Branch:** `alisa/qa-r3c-current-main-final-acceptance`
**Execution Date:** 2026-09-26

---

## 1. Final Verdict

### **ACCEPTABLE**

Current committed PackShift on `main @ 410574ccd385f01cc5c599cfa8f349107a85cc42` is verified and acceptable for the tested hackathon demo / current-main scope across all four evidence layers (Automated Regression, Real Runtime, Real Browser/DOM, and Adversarial/Failure Behavior).

- **Intervening Drift Reconciled:** PR #25 (`ec2578f`) visual reconciliation cleanly integrated into current `main`. The new UI chrome language selector (EN/RU/MD), schematic packaging visual disclaimers, and Denis card layouts preserve all underlying canonical backend evidence, API enums, and epistemic boundaries.
- **STOP-11 Selection Identity Defect:** Permanently resolved and verified fail-closed. An `ILLUSTRATIVE` Selection pack rejects before child startup (`exit 1`), never emitting `PACKSHIFT DEMO READY`.
- **Selection Scenario & Invariants:** User-overrides (60°C, microwave safe false, annual units), reset to defaults, and invalid input validation function strictly within epistemic boundaries (`USER_PROVIDED / NOT_VERIFIED`).
- **Sign & Claim Integrity:** Zero and negative environmental deltas strictly forbid the word "saving" (`No change — zero virgin-plastic reduction`, `Virgin-plastic use increases`). Bounded/qualified savings wording is permitted strictly for positive calculated environmental deltas (`Theoretical annual saving only`, `Virgin-plastic reduction`), while never implying verified Profi savings or implementation approval.
- **INT-R5 Economic Scenario Amplifier:** Initializes blank with placeholder hints, computes unrounded packaging spend and signed deltas, preserves operational independence on `BLOCKED` candidates (`⛔ THEORETICAL / NON-ACTIONABLE`), displays total first-year transition impact without `/ year`, and guards division by zero / negative reduction.
- **Mobile Presentation (~390 × 844):** Responsive layout collapses cleanly to single column without horizontal overflow, clipped controls, or inaccessible tap targets.

This verdict certifies that current `main` is acceptable for the tested hackathon demo and current-main scope. It does not constitute commercial food-safety, legal regulatory, or supplier procurement qualification.

---

## 2. Audited SHA & Repository State

- **Audited Main Base:** `410574ccd385f01cc5c599cfa8f349107a85cc42` (Merge PR #25 `feat(ui): reconcile latest Denis frontend visual delta into PackShift (PUX-GF-02)`)
- **Intervening Drift Reconciled:** PR #25 introduced frontend visual and layout updates across four files (+1829 / -697 lines total):
  1. `frontend/src/components/ProductVisual.tsx` (+130 / -0): Schematic geometry SVG visuals with mandatory disclaimer (`Schematic geometry · Not supplier article photo`).
  2. `frontend/src/components/SelectionView.tsx` (+647 / -184): Two-column showcase layout (`.picture-product` + `.desc-product`), stat circles, and epistemic badge integration.
  3. `frontend/src/pages/HomePage.tsx` (+666 / -503): Sticky header, responsive navigation, and new EN/RU/MD UI chrome selector.
  4. `frontend/src/styles.css` (+386 / -10): Card layouts, circular stats, responsive breakpoints (`@media (max-width: 640px)`).
- **Backend & Script Drift:** None. All backend logic (`backend/**`), public evidence datasets (`data/evidence/**`), and launcher/verification scripts (`scripts/**`) remain identical to the verified bases of INT-R5 (`06fa24e`, `f7ee8d4`) and QA-R3F1 (`09e2bc1`).
- **Committed Changes in this Branch:** One file only: `docs/review/QA-R3C-current-main-final-acceptance.md`.

---

## 3. Scope & Historical Evidence Boundary

- `docs/review/QA-R3-final-acceptance.md` remains strictly an immutable historical audit record documenting the original STOP-11 condition.
- This report (`QA-R3C`) provides fresh, independent execution evidence for `main` following the integration of:
  1. Merged QA-R3 historical report (`efd4cf0`)
  2. INT-R5 Economic Scenario Amplifier (`06fa24e`, PR #21)
  3. INT-R5 epistemic semantics fix-up (`f7ee8d4`, PR #22)
  4. QA-R3F1 Selection fail-closed launcher guard (`09e2bc1`, PR #24)
  5. PUX-GF-02 Frontend visual reconciliation (`ec2578f`, PR #25)

---

## 4. Verification Environment

- **OS / Platform:** Windows 11 (PowerShell 7 / Windows PowerShell), Linux Ubuntu Latest (via GitHub Actions CI)
- **Python:** 3.13.15 (local virtual environment `.venv`), pytest 9.1.1, FastAPI 0.141.1, Pydantic 2.13.5
- **Node & Tooling:** Node v24.19.0, npm 11.17.0, Vite 6.4.3, TypeScript 5.8.2
- **Browser Execution:** Microsoft Edge (Chromium engine, headless and live presentation), HTTP/1.1 localhost live listeners (`http://127.0.0.1:8000`, `http://127.0.0.1:5173`)

---

## 5. Layer A — Automated Baseline Verification

### Full Pipeline: `scripts/verify.ps1`
Command executed:
```powershell
.\scripts\verify.ps1
```
- **Editable Backend Install:** `gigafood-0.1.0` editable build succeeded.
- **Backend Test Suite:** **127 passed**, 1 deprecation warning (`httpx` in Starlette testclient) in 1.32s.
  - `backend/tests/test_api.py`: 9 passed
  - `backend/tests/test_demo_launcher.py`: 10 passed
  - `backend/tests/test_economics.py`: 18 passed
  - `backend/tests/test_selection.py`: 41 passed
  - `backend/tests/test_virgin_plastic.py`: 49 passed
- **Frontend Dependencies & Build:** `npm ci` audited 22 packages (0 vulnerabilities). Production build `tsc --noEmit && vite build` transformed 33 modules cleanly (0 TypeScript errors).
- **Whitespace / Diff Check:** `git diff --check` passed cleanly (exit 0).
- **Overall Result:** **PASS** (Exit code `0`).

### Demo Preflight Verification: `scripts/demo.ps1 -Check`
Command executed:
```powershell
.\scripts\demo.ps1 -Check
```
Output:
```text
Demo evidence: D:\skynet\gigafood\data\evidence\public-packaging.json
Selection pack: D:\skynet\gigafood\data\evidence\selection-portfolios.json
Logs: C:\Users\igorg\AppData\Local\Temp\packshift-demo-s_u1rfng
PACKSHIFT DEMO READY
A-core: READY / PUBLIC
Selection: READY / 1 portfolio(s)
Evaluation: faerch-deli-trays / 2 candidates
API: http://127.0.0.1:8000
UI:  http://127.0.0.1:5173
Preflight-only check complete; stopping both services.
```
- **Exit Code:** `0`
- **Port Cleanup Check:** Verified ports 8000 and 5173 released after preflight completion.

---

## 6. QA-R3F1 STOP-11 Regression Confirmation

To independently confirm that the launcher defect fixed in QA-R3F1 cannot recur on current `main`, the STOP-11 adversarial reproduction was executed in an isolated temporary mirror:

- **Adversarial Setup:** Mirrored repository in temporary directory. Mutated Selection pack identity only: `dataset_kind = "ILLUSTRATIVE"`, `disclosure = "SIMULATION / QA PROBE; not PUBLIC or provider evidence."`. No modifications to IDs, candidates, materials, or numbers.
- **Observed Execution:**
  ```text
  PACKSHIFT DEMO NOT READY: Demo Selection pack must be PUBLIC.
  LAUNCHER EXIT 1
  ```
- **Invariants Verified:**
  1. Rejection occurs immediately upon parsing local pack, before any socket probing or child-process startup.
  2. `PACKSHIFT DEMO READY` is **NOT** printed.
  3. Exit code is `1` (nonzero).
  4. Runtime discovery tamper probe (`GET /portfolios` returning `ILLUSTRATIVE`) confirmed fail-closed rejection: `PACKSHIFT DEMO NOT READY: Served portfolio discovery dataset_kind must be PUBLIC (got ILLUSTRATIVE).`
  5. Runtime evaluation tamper probe (`GET /portfolios/{id}` returning `ILLUSTRATIVE`) confirmed fail-closed rejection: `PACKSHIFT DEMO NOT READY: Canonical Selection evaluation dataset_kind must be PUBLIC (got ILLUSTRATIVE).`
  6. All processes and port bindings (`8000`, `5173`) are terminated via `finally:` cleanup.

---

## 7. Layer B & C — Acceptance Matrix: Browser & Runtime

| Test ID | Area | Setup / Action | Expected Result | Observed Execution | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **QA3C-A01** | Presentation Shell & Identity | Launch normal PUBLIC demo, open browser at `http://127.0.0.1:5173`. | Product loads; A-core and Selection both available; dataset marked PUBLIC; no provider or illustrative fallback. | Both services report `READY / PUBLIC`. Banner displays `PUBLIC-EVIDENCE DEMO DATA · NOT PROFI PROVIDER DATA`. Selection pill shows `Selection: READY · 1 portfolio(s)`. | **PASS** |
| **QA3C-A01b** | UI Chrome Language Switcher | Click EN / RU / MD language buttons in header. | UI chrome strings update; underlying evidence and API enums remain canonical English. | Switching to RU/MD updates navigation labels and header text; scope note explicitly confirms: `UI chrome: [LANG] · Backend evidence & API enums remain canonical EN`. Canonical enums (`PUBLIC`, `CALCULATED`, `BLOCKED`, `REVIEW_REQUIRED`) remain unmodified. | **PASS** |
| **QA3C-A01c** | Truthful Schematic Imagery | Inspect packaging images in baseline and candidate cards. | SVGs render schematic packaging geometry; clear disclaimer disavows photographic supplier representation. | `ProductVisual.tsx` renders clean geometric SVG wireframes with explicit caption: `Schematic geometry · Not supplier article photo`. | **PASS** |
| **QA3C-A02** | Default Portfolio | Open default Selection view (`faerch-deli-trays`). | Baseline and 2 candidates render; missing evidence displayed as `Evidence required — missing ≠ 0`; `CALCULATED ≠ VERIFIED`. | Baseline `Faerch P 2226-1C (PP)` renders with 2 candidates. `missing_fields: ['candidate.components.tray-body.recycled_content_fraction']` shown; status `INSUFFICIENT_DATA`. Candidate cards display `.candidate-showcase-row` layout with stat circles. | **PASS** |
| **QA3C-A03** | Default Thermal Block | Inspect candidate `faerch-k-2182-1g` (Clear APET Tray) under defaults. | Candidate documented max is 70°C, required is 95°C. Must be `BLOCKED`. Favorable arithmetic does not override block. | Eligibility banner renders `BLOCKED` in red. Constraint `thermal-envelope-incompatibility -> BLOCKED (For the assumed demo operating requirement of 95°C, candidate documented maximum is 70°C.)`. | **PASS** |
| **QA3C-A04** | 60°C User Scenario | Set `Required max temperature = 60°C`, leave microwave default, evaluate. | Result reflects user override. Requirement origin `USER_PROVIDED / NOT_VERIFIED`. APET moves away from `BLOCKED`. | Context reports `max_temperature_c: 60.0 (USER_PROVIDED, NOT_VERIFIED)`. APET thermal constraint resolves (`70°C >= 60°C`); overall eligibility moves to `REVIEW_REQUIRED`. | **PASS** |
| **QA3C-A05** | Explicit Microwave False | Set `Required max temp = 60°C`, `Microwave = Not required in this scenario`. | Request preserves `microwave_required = false` (not omitted or coerced to true). Microwave incompatibility cleared. | Request payload: `{"required_max_temperature_c": 60.0, "microwave_required": false}`. Effective requirement `microwave_safe: false (USER_PROVIDED)`. Both candidates clear thermal & microwave blocks. | **PASS** |
| **QA3C-A06** | Combined Annual Scenario | Set 60°C, microwave false, `Annual units = 100,000`. | All overrides combine. With missing PCR evidence, annual reduction remains unavailable (not fabricated as 0). Discloses hypothetical volume. | Request submitted with all 3 parameters. `annual_impact` renders with `annual_units: 100,000`, `annual_reduction_kg: None`, `status: INSUFFICIENT_DATA`. Clear hypothetical volume disclosure rendered. | **PASS** |
| **QA3C-A07** | Selection Reset | Click `Reset to portfolio defaults`. | Inputs reset; fresh evaluation returns committed defaults (95°C, microwave required, APET blocked). | Inputs clear (`volume=''`, `temperature=''`, `microwave='default'`). Fresh fetch restores baseline defaults; APET reverts to `BLOCKED`. No stale overrides persist. | **PASS** |
| **QA3C-A10** | Service Outage & Recovery | Stop backend service while UI is active. Click Comparison / refresh. Restore backend, click Retry. | UI shows error panel with retry action; no blank screen/crash. Upon recovery, fresh data loads cleanly. | Status panel displays `Evidence unavailable`. Clicking `Retry loading evidence` after backend restart restores full UI state without page reload. | **PASS** |
| **QA3C-A11** | Selection Failure Isolation | Induce 500 / network failure on `/api/v1/portfolios`. | Selection reports unavailable. No silent fallback portfolio used. Comparison remains independently functional. | Banner states: `Selection unavailable. Comparison has its own evidence availability. No fallback portfolio is used.` Comparison mode continues operating. | **PASS** |
| **QA3C-A12** | Evaluation Retry | Induce network failure on `/evaluate`. Restore service, click `Retry evaluation`. | UI shows evaluation error panel. Clicking Retry triggers fresh POST and restores evaluation. | Panel shows `Selection evaluation unavailable` with `Retry evaluation` button. Clicking button executes fresh request and renders candidate cards. | **PASS** |

---

## 8. Layer D — Invalid Selection Inputs & Failure Isolation

| Test ID | Area | Setup / Action | Expected Result | Observed Execution | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **QA3C-A08** | Input Validation (Units) | Enter `0`, `-1`, `1.5`, or `abc` into annual volume. | Client validation blocks request; no malformed network request sent. | Client error rendered: `Enter a positive whole number within the supported integer range.` Form submission suppressed. | **PASS** |
| **QA3C-A09** | Input Validation (Temp) | Enter `abc`, `Infinity`, or `NaN` into temperature. | Client validation blocks request; no malformed network request sent. | Client error rendered: `Enter a finite numeric temperature in °C, or leave it blank for the portfolio default.` Form submission suppressed. | **PASS** |

---

## 9. Rendered Sign Semantics & Tone Discipline

| Test ID | Condition / Case | Rendered Text / Representation | Epistemic Guardrail Verified | Status |
| :--- | :--- | :--- | :--- | :--- :---: |
| **QA3C-A13** | **Committed PUBLIC Case A** (`cchbc-500ml-rpet-transition`)<br>Baseline: `22.0 g/unit`<br>Candidate: `2.5 g/unit`<br>Reduction: `+19.5 g/unit` (`+88.64%`)<br>1M units: `+19,500.0 kg / year` | `Virgin-plastic reduction`<br>`+19.5 g/unit · +88.6%`<br>`+19,500.0 kg / year` | Positive reduction uses qualified savings/reduction phrasing; clearly discloses hypothetical annual volume. | **PASS** |
| **QA3C-A14** | **Zero Reduction Probe** (`reduction_g == 0`)<br>(SIMULATION / QA PROBE:<br>Baseline `20.0 g`, Candidate `20.0 g`) | `No change — zero virgin-plastic reduction`<br>`0 kg / year`<br>`Packaging spend is neutral` | **NEVER** described as `saving` or `avoided plastic`. Status tagged `CALCULATED`. | **PASS** |
| **QA3C-A15** | **Negative Reduction Probe** (`reduction_g < 0`)<br>(SIMULATION / QA PROBE:<br>Baseline `20.0 g`, Candidate `25.0 g`, delta `-5.0 g`) | `Virgin-plastic use increases`<br>`-5.0 g/unit`<br>`Virgin-plastic use increases by X kg` | **NEVER** described as `saving`, `avoided`, or `green benefit`. Status tagged `CALCULATED`. | **PASS** |

---

## 10. Mobile & Narrow Viewport Acceptance (~390 × 844)

Tested on Microsoft Edge Chromium emulation at `390px × 844px` (iPhone 12/13/14 profile) and `360px × 800px` (Android profile):

1. **Header & Navigation:**
   - Logo, title, and chrome language pills wrap cleanly without overlapping or horizontal blowout.
   - Mode switcher tabs (`Comparison` and `Portfolio Selection`) wrap naturally with full touch visibility.
   - Jump navigation (`Overview`, `Portfolio & Baseline`, `Evaluated Candidates`) wraps cleanly into accessible pills.
2. **Schematic Candidate Cards (PUX-GF-02):**
   - The `.candidate-showcase-row` container wraps `.picture-product` above `.desc-product`.
   - Schematic SVG diagrams scale down proportionally to fit the viewport width.
   - Epistemic badges and status pills wrap with `overflow-wrap: anywhere` and `word-break: break-word`.
3. **Circular Stat Displays:**
   - `.circles-list` flex-wraps stat circles without clipping borders or numbers.
4. **Form Controls & Inputs:**
   - Scenario override form (`.scenario-form`) and Economic form inputs (`.economic-inputs-grid`) collapse to single-column (`1fr`) under `@media (max-width: 640px)`.
   - Numeric inputs, select dropdowns, and submission buttons maintain minimum 44px vertical touch targets.
5. **Economic Scenario View:**
   - Cards stack vertically into single-column layout.
   - First-year impact card cleanly displays currency values without horizontal overflow.
   - Alert banners (`⛔ THEORETICAL / NON-ACTIONABLE`) wrap full text cleanly within viewport boundaries.
6. **Horizontal Overflow Verification:**
   - Verified `document.documentElement.scrollWidth <= window.innerWidth` across all views.
   - Zero horizontal scroll bar present; `body { overflow-x: hidden }` and `.disclosure-banner { min-width: 0 }` prevent edge clipping.

---

## 11. INT-R5 — Economic Scenario Amplifier Acceptance

| Test ID | Area | Setup / Action | Expected Result | Observed Execution | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **QA3C-E01** | Initial State & Disclosure | Navigate to Economic Scenario in Comparison mode. | Inputs start blank (`""`) with placeholder hints only. Clear disclosure banner displayed. | Inputs are empty (`placeholder="e.g. 1000000"`, etc.). Disclosure: `Hypothetical economic scenario based on user-supplied volume and packaging costs. Not actual Profi pricing, procurement terms, commercial commitment, or verified savings.` | **PASS** |
| **QA3C-E02** | Case A Positive Cost Delta | Enter: `1,000,000` units, `€0.120` current, `€0.135` candidate, transition blank. | Current €120,000; Candidate €135,000; Annual delta +€15,000/year; 19,500 kg/year avoided; ≈ +€0.77/kg avoided. | All metrics render unrounded arithmetic matching expectation. Card 2 displays `+€15,000.00 / year` with `Additional annual packaging cost` subtext. | **PASS** |
| **QA3C-E03** | Case A with Transition Cost | Same inputs + `one-time transition cost = 50000`. | Annual delta = `+€15,000.00 / year`; First-year impact = `+€65,000.00` (strictly **WITHOUT** `/ year`). | Card 2 shows `+€15,000.00 / year`. Card 3 shows `+€65,000.00` (NO `/ year`) with subtext `Includes €50,000.00 one-time transition cost`. | **PASS** |
| **QA3C-E04** | Cost-Saving Candidate | Enter candidate cost lower than current (e.g. `€0.100` vs `€0.120` on 1M units). | Annual delta = `-€20,000.00 / year` (annual packaging-cost saving). | Card 2 displays `-€20,000.00 / year` with `Annual packaging-cost saving (candidate costs less)` subtext. Retains `USER_PROVIDED` badge. | **PASS** |
| **QA3C-E05** | BLOCKED Candidate (Case B) | Select Case B (deli PP to rPET, BLOCKED). Enter `500,000` units, `€0.100` current, `€0.080` candidate. | Arithmetic calculates, but UI displays prominent `⛔ THEORETICAL / NON-ACTIONABLE` banner. Delta badge receives theoretical style (no green). | Banner renders: `⛔ THEORETICAL / NON-ACTIONABLE: Candidate is operationally BLOCKED for the evaluated context. Economic values are scenario arithmetic only...` Cards styled with red alert outline. | **PASS** |
| **QA3C-E06** | Zero Environmental Reduction | Evaluate scenario where `reduction_g == 0`. | Card 4 shows `0 kg / year` (`No change — zero virgin-plastic reduction`). Card 5 shows `N/A — no virgin-plastic reduction`. | `incremental_cost_per_kg_avoided_eur` returns `null`. Frontend renders `N/A`. Division by zero is completely suppressed. | **PASS** |
| **QA3C-E07** | Negative Environmental Reduction | Evaluate scenario where candidate increases virgin plastic (`reduction_g < 0`). | Card 4 shows `Increases` (`Virgin-plastic use increases by X kg`). Card 5 shows `N/A — candidate increases virgin-plastic use`. | `incremental_cost_per_kg_avoided_eur` returns `null`. Card 5 renders `N/A`. No green benefit or "avoided" claim made. | **PASS** |
| **QA3C-E08** | Insufficient Environmental Data | Evaluate scenario where comparison status is `INSUFFICIENT_DATA`. | Packaging spend calculates; kg avoided and €/kg avoided render `N/A`. Missing evidence is not treated as 0. | Spend delta computes from user costs; environmental kg avoided and €/kg avoided remain `N/A` (`INSUFFICIENT_DATA`). | **PASS** |
| **QA3C-E09** | Validation: Annual Units | Test `blank`, `0`, `-1`, `1.5`, `abc`. | Client validation error; evaluation blocked. | Renders: `Annual units must be a positive whole number greater than 0.` No request sent. | **PASS** |
| **QA3C-E10** | Validation: Packaging Costs | Test `blank`, `-1`, `abc`, `Infinity`. (Note: `0` is allowed). | Client validation error; evaluation blocked. | Renders: `Current packaging cost must be a finite number ≥ 0.` / `Candidate packaging cost must be a finite number ≥ 0.` | **PASS** |
| **QA3C-E11** | Validation: Transition Cost | Test `blank` (allowed), `0` (allowed), `positive` (allowed), `-10` (rejected), `abc` (rejected). | Negative and non-finite rejected; valid or blank allowed. | Blank proceeds with `transCost = null`. Negative or `abc` blocked with `One-time transition cost must be a finite number ≥ 0, or left blank.` | **PASS** |
| **QA3C-E12** | Economics Reset | Click `Reset economic scenario` after evaluation. | Form inputs, validation alerts, and result cards clear completely. | All inputs return to `""`, `result` is set to `null`, cards unmount cleanly. | **PASS** |

### Network Contract Coherence (Case A)
Inspected actual HTTP payload for `POST /api/v1/scenarios/cchbc-500ml-rpet-transition/economics`:
```json
// Request
{
  "annual_units": 1000000,
  "current_cost_eur_per_unit": 0.12,
  "candidate_cost_eur_per_unit": 0.135,
  "one_time_transition_cost_eur": 50000.0
}

// Response (HTTP 200 OK)
{
  "scenario_id": "cchbc-500ml-rpet-transition",
  "annual_units": 1000000,
  "current_cost_eur_per_unit": 0.12,
  "candidate_cost_eur_per_unit": 0.135,
  "one_time_transition_cost_eur": 50000.0,
  "current_annual_spend_eur": 120000.0,
  "candidate_annual_spend_eur": 135000.0,
  "annual_cost_delta_eur": 15000.0,
  "first_year_cost_delta_eur": 65000.0,
  "annual_virgin_plastic_reduction_kg": 19500.0,
  "incremental_cost_per_kg_avoided_eur": 0.7692307692307693,
  "environmental_status": "CALCULATED",
  "eligibility_status": "REVIEW_REQUIRED",
  "origin": "CALCULATED",
  "input_origin": "USER_PROVIDED",
  "verification_state": "NOT_VERIFIED",
  "disclosure": "Hypothetical economic scenario based on user-supplied volume and packaging costs. Not actual Profi pricing, procurement terms, commercial commitment, or verified savings."
}
```
Client rendering strictly mirrors server-computed numbers with zero client-side arithmetic drift.

---

## 12. Claim-Integrity Sweep

A full codebase and DOM sweep across customer-facing strings confirmed that PackShift strictly honors its epistemic boundaries:

| Claim Category | Observed Product Behavior & Guardrails | Verdict |
| :--- | :--- | :---: |
| **Profi Evidence Boundary** | All references explicitly state: `Not actual Profi volume or measured impact`, `Not a verified Profi requirement`, and `Not actual Profi pricing`. | **CLEAN** |
| **Environmental Savings Language** | **Zero reduction** (`delta == 0`): strictly forbidden from using "saving"; renders as `No change — zero virgin-plastic reduction` or `No annual virgin-plastic reduction (no change)`.<br>**Negative reduction** (`delta < 0`): strictly forbidden from using "saving" or "avoided"; renders as `Virgin-plastic use increases`.<br>**Positive reduction** (`delta > 0`): permitted to use bounded/qualified savings wording (e.g. `Theoretical annual saving only`, `virgin-plastic reduction`, `avoided virgin plastic`), but **NEVER** implies verified Profi savings or implementation approval. | **CLEAN** |
| **Economic Spend Savings** | "Saving" is permitted strictly for signed packaging cost reductions (`annual_cost_delta_eur < 0`, rendered as `Annual packaging-cost saving (candidate costs less)`), tagged with `USER_PROVIDED / NOT_VERIFIED`. | **CLEAN** |
| **Verification State** | Calculated values consistently tagged with `CALCULATED ≠ VERIFIED` and `NOT_VERIFIED`. | **CLEAN** |
| **Approval / Procurement** | Explicitly disclaims authority: `Candidate comparisons are decision-support examples, not implementation approvals.` | **CLEAN** |
| **Missing Evidence** | Explicitly stated: `Evidence required — missing ≠ 0`. Marketing claims like "up to 80%" are classified as `NON_POINT_VALUE` and excluded from virgin plastic math. | **CLEAN** |
| **Operational vs Environmental** | Eligibility is strictly separated from environmental delta. Incompatible candidates are flagged `BLOCKED` regardless of plastic reduction. | **CLEAN** |

---

## 13. Known Boundaries & Limitations

1. **Hypothetical Inputs:** Economic scenarios and annual volume projections rely entirely on user-provided parameters (`USER_PROVIDED / NOT_VERIFIED`).
2. **Exclusion of Regulatory / External Fees:** The economic model computes direct unit packaging spend and one-time transition costs only. It does not model EPR fees, plastic taxes, freight logistics, or inflation.
3. **No Commercial or Food-Safety Certification:** PackShift provides decision-support evidence reconciliation, not food-contact certification or supplier contractual commitments.

---

## 14. Unverified Items

- **High-concurrency production load:** PackShift is designed as a local/edge decision-support tool; high-concurrency multi-tenant benchmarks were out of scope.
- **Mobile Safari WebKit rendering on physical iOS hardware:** Verified in standard Chromium mobile emulation (390×844) and headless Edge; physical iPhone testing was simulated.

---

## 15. Final Recommendation

**READY FOR BRAIN REVIEW.**
Current `main` meets all criteria for the tested hackathon demo and current-main scope, strictly maintains evidence integrity, and contains no blocking defects.

---

## Appendix: Top 5 Skeptical Judge Questions & Evidence-Backed Answers

1. **Judge:** *"Does this tool recommend that Profi should switch to the Faerch CPET tray?"*
   **Answer:** *"No. PackShift is a decision-support and evidence-reconciliation engine, not a procurement oracle. It shows that while CPET has favorable thermal compatibility, critical recycled-content evidence is unverified (`missing ≠ 0`), and food-contact certification requires human QA review. It explicitly does not grant implementation approval."*

2. **Judge:** *"Your economic scenario shows a €15,000 cost increase. Where did the €0.120 and €0.135 prices come from?"*
   **Answer:** *"Those numbers are purely hypothetical parameters entered by the user. PackShift starts with blank inputs and placeholder hints. It explicitly discloses that it does not possess or reveal proprietary Profi pricing."*

3. **Judge:** *"Faerch's public material says 'up to 70–80% recycled content'. Why does PackShift still show annual virgin-plastic avoided as N/A?"*
   **Answer:** *"Because Faerch's public marketing sheet quotes 'up to 70–80% recycled content'. Under our epistemic standard, an 'up to' ceiling is a `NON_POINT_VALUE`. We refuse to invent an exact point fraction, correctly reporting `INSUFFICIENT_DATA` rather than generating false precision."*

4. **Judge:** *"Why does the tool calculate economics for Case B if the candidate is BLOCKED?"*
   **Answer:** *"To provide transparent decision support. A user may want to know what the cost differential would be if equipment were upgraded, but the interface prominently brands the result `⛔ THEORETICAL / NON-ACTIONABLE`, preventing any misleading impression that the switch can be made today."*

5. **Judge:** *"How do I know this demo environment isn't accidentally serving mock or illustrative data?"*
   **Answer:** *"The launcher enforces a fail-closed presentation invariant (QA-R3F1). If any part of the A-core or Selection evidence pack is `ILLUSTRATIVE` or `PROVIDER`, the launcher halts with a nonzero exit and refuses to print `PACKSHIFT DEMO READY`."*
