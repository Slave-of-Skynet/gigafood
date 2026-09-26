# APR-HT2A — Post-Revert Acceptance Reconciliation & Final QA Preparation

**Document class:** PRODUCT ACCEPTANCE / CLAIMS SAFETY RECONCILIATION REPORT
**Contract:** APR-HT2A — Post-Revert Acceptance Reconciliation & Final QA Preparation
**Auditor / Owner:** Alisa (Product / QA / Acceptance / Claims Safety)
**Target Repository:** `Slave-of-Skynet/gigafood`
**Current Branch:** `alisa/apr-ht2a-post-revert-acceptance`
**Audited Base SHA:** `513e0867feaf1b3062c1c02e98d51f2eaa4f1f93` (`origin/main`)
**Predecessor Audited Base:** `a15ae948f0ea36bfda127e783684622df07e0b83` (`APR-HT1`)
**Upstream Contracts:** `INT-HTF-04A — Canonical Runtime Transition & Parallelization Gate` (`e069950`), `IGR-HT2 — Recommendation API Implementation` (`a15ae94`)
**Parallel Workstream:** Denis — `PUX-HT2R — Recommendation UX Re-Implementation`
**Canonical Evidence Baseline:** `docs/evidence/htf-03/**` (`bd4f765`)
**Execution Date:** 2026-09-27

---

## 0. Executive Summary & Objective

Following the merge of APR-HT1 ([PR #34](https://github.com/Slave-of-Skynet/gigafood/pull/34)), the repository underwent significant synchronization and cleanup:
1. Denis's initial UI implementation ([PR #37](https://github.com/Slave-of-Skynet/gigafood/pull/37)) was reverted in [PR #38](https://github.com/Slave-of-Skynet/gigafood/pull/38) by Vladimir due to unauthorized/premature UI additions and architectural drift.
2. Vladimir completed repository cleanup in [PR #39](https://github.com/Slave-of-Skynet/gigafood/pull/39), consolidating to a single canonical frontend (`frontend/`), removing the legacy non-ASCII directory (`"Сайт"`), and organizing reference packaging assets under canonical ASCII paths.

**Historical Audit Integrity:** The previous `APR-HT1` audit artifacts (`APR-HT1-final-acceptance.md`, `APR-HT1-claim-safety-matrix.md`, `APR-HT1-recommendation-acceptance-matrix.md`) remain preserved as immutable historical records of the exact commit (`a15ae94`) they evaluated. They are not rewritten.

**Primary Goal of APR-HT2A:** Establish the authoritative acceptance truth on current `main @ 513e086`:
- Reconcile drift between `APR-HT1` and current `main`.
- Revalidate that the Recommendation backend runtime still satisfies the canonical HTF-03 oracle (48 rows, 0 survivors, 6 non-compensatory hard gates).
- Confirm claim-safety boundaries and anti-leakage isolation remain 100% intact.
- Verify full regression across historical Comparison and Portfolio Selection features.
- Provide the exact, frozen acceptance checklist (`APR-HT2B`) that will govern Denis's upcoming `PUX-HT2R` handoff.

---

## 1. Audited Base & State Transitions

### 1.1 Repository State
- **Repository:** `Slave-of-Skynet/gigafood`
- **Current HEAD on `main`:** `513e0867feaf1b3062c1c02e98d51f2eaa4f1f93`
- **Latest Merged PRs:**
  - `e0418f5`: Merge PR #34 (`alisa/apr-ht1-recommendation-acceptance`) — Alisa's APR-HT1 oracle & claim safety.
  - `5f3afac`: Merge PR #38 (`vladimir/revert-pr37-unauthorized-ui`) — Revert PR #37 UI changes.
  - `513e086`: Merge PR #39 (`vladimir/repo-cleanup-single-frontend-v2`) — Single frontend cleanup & ASCII path preservation.

### 1.2 State Transition Graph
```text
  main @ a15ae94 (Base of APR-HT1 audit)
        │
        ├─► PR #34 Merged (APR-HT1 Acceptance Oracle, Claim Matrix, 8 tests)
        │
        ├─► PR #37 Merged (Premature Recommendation UI from Denis)
        │
        ├─► PR #38 Merged (Revert PR #37 UI: 10 components deleted, HomePage reverted)
        │
        └─► PR #39 Merged (Single canonical frontend; legacy "Сайт" removed; ASCII paths)
        │
  CURRENT MAIN @ 513e086
```

---

## 2. Drift Reconciliation Since APR-HT1

The table below reconciles each claim and finding from APR-HT1 against the reality of `main @ 513e086`:

| Item / Dimension | APR-HT1 Audited State (`a15ae94`) | Current Main State (`513e086`) | Drift Classification | Rationale / Current Reality |
|---|---|---|---|---|
| **HTF-03 Canonical Evidence** | Canonical dataset `v1`, 48 rows, 0 survivors | Canonical dataset `v1`, 48 rows, 0 survivors | **STILL CANONICAL / VERIFIED** | `validate_htf03.py --self-test` passes (41 mutation rejections). Hash `bd4f765` intact. |
| **Backend Runtime Endpoints** | Implemented in `IGR-HT2` (`/products`, `/candidates`, `/evaluate`) | Fully active in `backend/app/runtime` & `services` | **STILL TRUE / VERIFIED** | 162/162 tests pass. 503 fail-closed and 422 context errors operational. |
| **Shared Frontend API Contracts** | Mirrored in `frontend/src/api/contracts.ts` & `client.ts` | Fully present in `frontend/src/api/contracts.ts` & `client.ts` | **STILL PRESENT / VERIFIED** | Typed contracts and client methods for Recommendation were preserved through PR #38 & #39. |
| **Recommendation UI Components** | Mounted in `HomePage.tsx`, 10 components present | **NOT PRESENT** on current main | **STALE OBSERVATION (Reverted)** | Reverted in PR #38 (`6a3f456`). `RecommendationView.tsx` and subcomponents absent. |
| **UI Mode Switcher** | Exposing `Comparison`, `Portfolio Selection`, `Recommendation` | Exposing `Comparison`, `Portfolio Selection` only | **STALE OBSERVATION (Reverted)** | `HomePage.tsx` reverted to 2-mode state (`comparison` and `selection`). |
| **Defect DEF-03 (Winner Wording)** | Recorded as OPEN (P1) on `DecisionSummary.tsx` & `RecommendationView.tsx` | Specific offending code reverted in PR #38 | **HISTORICAL ON REVERTED CODE / PENDING PUX-HT2R** | Offending files are absent from main; requirement stands as a blocking gate (`HT2B-A14`) for PUX-HT2R. |
| **Browser UX Evidence from APR-HT1** | Headless code verified; live browser session UNVERIFIED | Recommendation UI unmounted; live browser session UNVERIFIED | **HISTORICAL ONLY** | Observations in APR-HT1 applied to `a15ae94`. Current main awaits Denis's `PUX-HT2R`. |
| **Legacy Frontend Cleanup** | Dual frontend directories present (`frontend/` & `"Сайт"`) | Single canonical `frontend/` directory | **STILL TRUE / VERIFIED (Improved)** | Cleaned up in PR #39. Non-ASCII directory removed; reference packaging preserved under ASCII paths. |

---

## 3. Current Implementation Inventory

Inspected file tree on current `main @ 513e086`:

### 3.1 Backend & Runtime Surfaces
- `backend/app/domain/recommendation.py` (`Contract` models: `CandidateRecommendationAssessment`, `ProductArchetype`, `WorkflowDefinition`, `HardGate`, `RecommendationOutcome`, etc.)
- `backend/app/runtime/recommendation.py` (`RecommendationRuntime`, fail-closed invariant validation, dataset loading, composite revision hash calculation)
- `backend/app/services/recommendation.py` (`evaluate_recommendation`, C6 context configuration binding, gate evaluation)
- `backend/app/main.py` (FastAPI app lifespan mounting `load_recommendation_runtime`, routes `/api/v1/recommendation/products`, `candidates`, `evaluate`)
- `backend/tests/test_recommendation.py` (23 runtime tests from Igor)
- `backend/tests/acceptance_htf04/test_acceptance_oracle.py` (8 acceptance oracle tests from Alisa)

### 3.2 Frontend Surfaces (`frontend/src/`)
- `frontend/src/api/contracts.ts` (Contains full TypeScript interfaces for Recommendation: `RecommendationProductsResponse`, `RecommendationCandidatesResponse`, `RecommendationEvaluationRequest`, `RecommendationEvaluationResponse`, `CandidateRecommendationAssessment`, etc.)
- `frontend/src/api/client.ts` (Contains client calls: `recommendationProducts`, `recommendationCandidates`, `evaluateRecommendation`)
- `frontend/src/pages/HomePage.tsx` (Contains `Comparison` and `Portfolio Selection` modes; `Recommendation` mode is **NOT** mounted)
- `frontend/src/components/SelectionView.tsx` (Portfolio Selection UI)
- `frontend/src/components/EconomicScenarioView.tsx` (Economic Scenario UI)
- `frontend/src/components/EvidenceDetails.tsx` (Operational requirements & packaging details)
- `frontend/src/components/ProductVisual.tsx` (Visual asset rendering)
- `frontend/src/components/metricRing.ts` (Metric circle rendering)
- **Recommendation UI Components:** `RecommendationView.tsx`, `DecisionSummary.tsx`, `CandidateRecommendationCard.tsx`, `GateMatrix.tsx`, `MetricField.tsx`, `ProductSelector.tsx`, `WorkflowSelector.tsx`, `ProcurementSummary.tsx`, `NextActions.tsx`, `EvidenceStateBadge.tsx` are **ABSENT** (awaiting `PUX-HT2R`).

---

## 4. Canonical HTF-03 Oracle Revalidation

Executing `python scripts/validate_htf03.py --self-test` yields:
```text
PASS: 6 candidates; 3 distinct baselines; 126 sources; 63 recomputed calculations; 48 gate rows.
PASS: 41 rejected mutation cases; valid all-plastic equality accepted.
Scope: schema, arithmetic, provenance boundaries and display consistency; not physical/safety qualification.
```

### 4.1 Master 48-Row Oracle Counts (Preserved & Revalidated)
- **Total evaluated gate rows:** 48 (4 Products × 2 Workflows × 6 Candidate Families)
- **Outcome breakdown:**
  - `QUALIFICATION REQUIRED`: **28**
  - `BLOCKED`: **20**
  - `QUALIFIED SURVIVOR`: **0**
  - `APPROVED FOR PROCUREMENT`: **0**

### 4.2 Primary Product Decision Invariants
1. **`P1` (Whole chicken) × `POST_COOK_HOT_HOLD_6H`:**
   - Primary lead: `C1 Gaia` (qualification_priority = 1, outcome = `QUALIFICATION REQUIRED`, qualified_survivor = `false`).
   - Secondary lead: `C6-RO-W` (qualification_priority = 2, outcome = `QUALIFICATION REQUIRED`).
   - Interpretation: **First qualification path**, NEVER "Winner", "Certified", or "Approved".
2. **`P2..P4` (Wings, Veg, Portions) × `POST_COOK_HOT_HOLD_6H`:**
   - Primary lead: `C5 BIOPAP LC SI-14` (qualification_priority = 1, outcome = `QUALIFICATION REQUIRED`).
   - Secondary lead: `C6-RO-P` (qualification_priority = 2, outcome = `QUALIFICATION REQUIRED`).
   - Conflict preserved: 175°C vs 185°C (60 min) remains `CONFLICT` (`C01`); family claim 6h @ 90°C remains `FAMILY_CLAIM`, not exact-pack proof.
3. **`P1..P4` × `LITERAL_OVEN_250C_THEN_HOLD`:**
   - `C2`, `C3`, `C4`, `C5` are strictly **`BLOCKED`** due to hard gate failure on `thermal_workflow == FAIL`.
   - `C1 Gaia`: `QUALIFICATION REQUIRED`, qualification_priority = `None` (paper body thermal limit unverified; NOT priority 1).
   - High-temperature fallback: `C6-RO-H` (e-pui225 body): qualification_priority = **2** (outcome = `QUALIFICATION REQUIRED`).
   - Demarcation: C6 priority **remains 2**; it must NEVER be renumbered as priority 1, declared a "winner", or presented as a complete 250°C package (compatible clear lid unverified).

---

## 5. Recommendation Runtime Verification

All live API queries executed on `main @ 513e086` against `FastAPI` runtime:

### 5.1 Positive Verification
- `GET /api/v1/recommendation/products`:
  - Status: **`200 OK`**
  - Payload: 4 products (`P1`–`P4`), 2 workflows (`POST_COOK_HOT_HOLD_6H`, `LITERAL_OVEN_250C_THEN_HOLD`), default `P1`/`POST_COOK_HOT_HOLD_6H`.
  - Composite source revision hash: `0de514db48ac41e9ac6763cb4141023ad1d2e733a932599b4ee42a59bd006817`.
  - Effective assumptions present and transparent.
- `GET /api/v1/recommendation/candidates`:
  - Status: **`200 OK`**
  - Payload: 6 candidate families (`C1`–`C6`), 4 configurations (`C6-RO-P`, `C6-RO-W`, `C6-RO-H`, `C6-EU`), 3 baselines (`B1`, `B2`, `B3`), rendering contract, disclosures.
- `POST /api/v1/recommendation/evaluate` (Valid requests):
  - `P1` + `POST_COOK_HOT_HOLD_6H`: **`200 OK`** -> 6 assessments, `first_qualification_candidate_id: "C1"`, `priority: 1`, `qualified_survivors: []`.
  - `P2..P4` + `POST_COOK_HOT_HOLD_6H`: **`200 OK`** -> 6 assessments, `first_qualification_candidate_id: "C5"`, `priority: 1`, `qualified_survivors: []`.
  - `P1..P4` + `LITERAL_OVEN_250C_THEN_HOLD`: **`200 OK`** -> `C2`, `C3`, `C4`, `C5` `BLOCKED`; `C6-RO-H` `priority: 2`; `first_qualification_candidate_id: None`; `qualified_survivors: []`.

### 5.2 Negative & Adversarial Verification
- **Corrupt / Missing HTF-03 Snapshot:** Returns **`503 {"detail": "RECOMMENDATION_EVIDENCE_UNAVAILABLE"}`**. Fail-closed; never silently falls back to historical Faerch Selection data.
- **Unknown Product ID:** `POST /evaluate` with `product_id: "P99"` returns **`422 {"detail": "UNKNOWN_PRODUCT_ID"}`**.
- **Unknown Workflow ID:** `POST /evaluate` with `workflow_id: "UNKNOWN_WF"` returns **`422 {"detail": "UNKNOWN_WORKFLOW_ID"}`**.
- **Unsupported Configuration Context:** `POST /evaluate` with `P1` + `POST_COOK` + `configuration_id: "C6-EU"` returns **`422 {"detail": "CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT"}`**.

---

## 6. Claim-Safety & Boundary Verification

### 6.1 Six Non-Compensatory Hard Gates
Evaluated gates:
1. `physical_fit`
2. `food_contact`
3. `thermal_workflow`
4. `grease_leak`
5. `transparent_viewing`
6. `procurement`

**Non-Compensatory Falsification Rule:**
A failure on any hard gate results in composite outcome `BLOCKED`. High environmental performance (e.g. virgin plastic reduction, low carbon) cannot compensate for a gate failure.
- **Falsification Probe:** Under `LITERAL_OVEN_250C_THEN_HOLD`, `C5 BIOPAP LC SI-14` has a central virgin plastic reduction of 52.5% (`E051`), but fails `thermal_workflow` (175/185°C limit vs 250°C oven). Runtime and oracle confirm `C5` is **`BLOCKED`**, proving zero compensation.

### 6.2 Epistemic Integrity
- **`UNKNOWN ≠ 0`:** Missing numeric values (such as unmeasured mass or unquoted freight) are preserved as `UNKNOWN` / `None`, blocking dependent calculations. Never coerced to `0` or `0.00 RON`.
- **`ESTIMATED ≠ VERIFIED`:** Bounds are strictly preserved. `E051` for C5 displays interval `[-67.6%, +82.1%]` with central `52.5%`. Central value is never presented as an exact point.
- **`DERIVED_EXACT / CALCULATED ≠ VERIFIED`:** Arithmetic correctness of formulas (`E008`, `E051`) does not upgrade input evidence states.
- **`CONFLICT` Preserved:** BIOPAP 175°C vs 185°C remains `CONFLICT` (`C01`). Neither literature value is silently selected.

### 6.3 Baseline Identities
- **`B1`:** Actual Profi incumbent rotisserie bag. Material: 100% virgin plastic. Exact mass, dimensions, cost, and annual volume: `UNKNOWN`.
- **`B1-ESTIMATED`:** Modeled scenario (`E002`: `[2.59, 12.46]` g, central `6.50` g). Distinct from observed truth.
- **`B2`:** Virgin plastic market reference. Never conflated with Profi incumbent.
- **`B3`:** Romanian conventional market reference (Barleta bag). Strictly isolated; **NEVER labeled as Profi baseline**.

### 6.4 C6 Configuration Anti-Leakage
- **Configuration Binding:**
  - `P1` + `POST_COOK` strictly binds to `C6-RO-W` (WePack 803261+803262).
  - `P2..P4` + `POST_COOK` strictly binds to `C6-RO-P` (E-ambalaj 729 + La Habibi lid).
  - `P1..P4` + `LITERAL_250` strictly binds to `C6-RO-H` (E-ambalaj e-pui225).
  - `C6-EU` (Plus Pack 0192110201) is strictly a technical reference, never an evaluated gate row.
- **Anti-Leakage Verification:**
  - `RO-P` pricing (1.15–1.29 RON/pair) does NOT qualify `RO-H`.
  - `RO-P` transparent lid does NOT qualify `RO-W` or `RO-H` transparency.
  - `C6-EU` 350°C rating does NOT qualify `RO-H` (seller claim: 280°C).
  - Aluminium body rating does NOT qualify complete package (transparent lid is separate and unverified at high temperature).

### 6.5 Procurement Claim Safety
- **`listing ≠ stock`:** `ROMANIA_DISTRIBUTOR_CURRENT` designates catalogue/order leads requiring stock/lead-time inquiry, not verified warehouse stock.
- **`Quote required ≠ 0`:** Missing prices remain unquoted, never `0.00 RON`.
- **Mentor Context:** The ~10–15% cost tolerance is commercial framing context only, **NOT** an automatic pass threshold or procurement approval. Because current Profi incumbent purchase cost is `UNKNOWN`, candidate costs cannot be claimed to "align" with or satisfy this tolerance until comparable incumbent commercial terms are established.

### 6.6 Forbidden Positive Claims Search
A regex search across all active code (`backend/app/**`, `frontend/src/**`) confirmed:
- Zero positive instances of *"Winner"*, *"Best"*, *"Approved"*, *"Certified"*, *"Safe"*, *"Ready for deployment"*, *"Guaranteed recyclable"*, or *"Guaranteed cost-effective"*.
- The word *"Winner"* is completely absent from all active code.

---

## 7. Regression Verification

| Test Suite / Tool | Command | Result | Details |
|---|---|---|---|
| **HTF-03 Validator** | `.\.venv\Scripts\python.exe scripts\validate_htf03.py --self-test` | **PASS** | 6 candidates, 3 baselines, 126 sources, 63 calculations, 48 gate rows, 41 mutation rejections |
| **Acceptance Oracle** | `.\.venv\Scripts\python.exe -m pytest backend/tests/acceptance_htf04 -q` | **PASS** | 8/8 tests passed in 0.76s |
| **Full Backend Suite** | `.\.venv\Scripts\python.exe -m pytest backend/tests -q` | **PASS** | 162/162 tests passed in 3.61s (Selection, Economics, Virgin Plastic, Recommendation) |
| **Verification Pipeline** | `powershell -File .\scripts\verify.ps1` | **PASS** | Editable install, pytest 162/162 passed, npm build passed (35 modules transformed) |
| **Demo Preflight** | `.\.venv\Scripts\python.exe scripts\demo.py --check` | **PASS** | `PACKSHIFT DEMO READY`: A-core READY / PUBLIC, Selection READY (1 portfolio), Recommendation READY (4 products, 6 candidates) |
| **Diff Hygiene** | `git diff --check` | **PASS** | Working tree clean, zero whitespace/CRLF errors |

---

## 8. Current Readiness Verdict (Layered Model)

Rather than collapsing the multi-faceted project state into a simplistic PASS/FAIL, APR-HT2A evaluates readiness by layer:

| Layer | Status | Justification / Ground Truth |
|---|---|---|
| **1. HTF-03 Canonical Evidence Integrity** | **ACCEPTABLE** | Verified canonical dataset, schema, arithmetic, and 41 mutation tests (`validate_htf03.py`). |
| **2. Recommendation Backend Runtime** | **ACCEPTABLE** | Verified active, 162/162 tests passing, 503 fail-closed, 422 context errors, non-compensatory 6-gate logic active. |
| **3. Acceptance Oracle & Invariants** | **ACCEPTABLE** | Master 48-row oracle, C6 anti-leakage, baseline segregation, and negative falsification probes pass. |
| **4. Legacy App Regression (Selection & Comparison)** | **ACCEPTABLE** | `scripts/verify.ps1` and `demo.py --check` pass completely. Comparison & Selection modes fully functional. |
| **5. Recommendation UI on Current Main** | **NOT CURRENTLY IMPLEMENTED** | Reverted in PR #38. Assigned to Denis under `PUX-HT2R`. (Not a defect of current main). |
| **6. Final Recommendation Browser Acceptance** | **BLOCKED: WAITING FOR PUX-HT2R** | Awaiting Denis's handoff of `PUX-HT2R` with required browser evidence. |
| **7. Physical Supplier Qualification** | **BLOCKED: MISSING EXTERNAL EVIDENCE** | Declaration of Compliance (DoC) fatty food migration certificates, physical 6h hot fat seam tests, distributor commercial terms remain external real-world gaps. |

---

## 9. APR-HT2B Browser Acceptance Checklist (For Denis's PUX-HT2R)

The following 17 test cases are frozen as the formal acceptance criteria to be executed during `APR-HT2B` once Denis hands off `PUX-HT2R`.

| Check ID | Title | Preconditions & Inputs | Expected Behavior & Criteria | Falsification / Rejection Trigger |
|---|---|---|---|---|
| **HT2B-A01** | Recommendation Mount & Navigation | Navigate to root URL (`/`); inspect header/nav. | `Comparison`, `Portfolio Selection`, and `Recommendation Journey` tabs are present and navigable. | Recommendation mode missing or crashes existing modes. |
| **HT2B-A02** | P1 Post-Cook Decision Summary | Select `P1 (Whole chicken)` + `POST_COOK_HOT_HOLD_6H`. | `C1 Gaia` displayed as `First qualification path` (`priority = 1`, `QUALIFICATION REQUIRED`, `0 qualified survivors`). | C1 labeled as "Winner", "Approved", or "Safe". |
| **HT2B-A03** | P2–P4 Post-Cook BIOPAP Conflict | Select `P2`, `P3`, or `P4` + `POST_COOK_HOT_HOLD_6H`. | `C5 BIOPAP` displayed as `First qualification path`. `CONFLICT` badge visible for `175°C vs 185°C (60 min)`. | Conflict collapsed into a single value or badge missing. |
| **HT2B-A04** | Literal 250°C High-Temp Fallback | Select any product + `LITERAL_OVEN_250C_THEN_HOLD`. | `C2`–`C5` displayed as `BLOCKED`. `C6-RO-H` displayed as `High-temperature fallback` (`priority = 2`, `QUALIFICATION REQUIRED`). | C6 labeled as "Winner" or priority promoted to 1. |
| **HT2B-A05** | UNKNOWN Rendering Policy | Inspect unmeasured metrics (e.g. incumbent mass, virgin mass of C1). | Displayed as `"UNKNOWN"`, `"Quote Required"`, or `"—"`. NEVER rendered as `0`, `0 g`, or `0.00 RON`. | UNKNOWN coerced to `0` or `0.00`. |
| **HT2B-A06** | ESTIMATED Bounds Preservation | Inspect estimated metrics (e.g. C5 reduction `E051`). | Interval bounds `[-67.6%, +82.1%]` rendered alongside central estimate `52.5%` with `ESTIMATED` badge. | Central value shown alone without range or badge. |
| **HT2B-A07** | CONFLICT Resolution Policy | Inspect candidate cards and details for C5. | Both conflicting source claims displayed with `CONFLICT` qualifier. | One literature source chosen silently over the other. |
| **HT2B-A08** | Procurement Transparency | Inspect procurement panels for Romanian candidates. | Distributor listings qualified with `listing ≠ stock` / `Catalogue Lead`. Missing price rendered as `"Quote Required"`. | Distributor listing presented as verified warehouse stock. |
| **HT2B-A09** | C6 Anti-Leakage in UI | Switch between P1, P2, and Literal 250°C workflows. | P1 displays WePack (`C6-RO-W`); P2 displays E-ambalaj 729 (`C6-RO-P`); 250°C displays e-pui225 (`C6-RO-H`). No lid leakage to RO-H. | RO-P transparent lid shown as feature of RO-H. |
| **HT2B-A10** | Stale Async Response Protection | Rapidly change product or workflow selection (e.g. from `POST_COOK` to `LITERAL_250C`) under throttled network conditions. | Stale or out-of-order async responses from previous selections are safely ignored or discarded; rendered UI consistently reflects the latest user selection. | A slower, out-of-order response from an earlier selection overwrites the active selection result. |
| **HT2B-A11** | Backend 503 Fail-Closed Handling | Simulate backend 503 (e.g. missing evidence file). | UI displays clear, user-friendly service unavailable message with Retry button. Does NOT crash or fallback to legacy data. | App crashes (blank screen) or silently renders old Faerch data. |
| **HT2B-A12** | 422 Client Error Handling | Simulate 422 validation response from backend. | Error handled gracefully with inline alert banner. | Unhandled Promise rejection / blank screen crash. |
| **HT2B-A13** | Zero-Survivor Semantics | Inspect Decision Summary banner across all products. | Explicitly displays `Qualified Survivors: 0 / 6` and `QUALIFICATION REQUIRED`. | UI invents a winning candidate when 0 survivors exist. |
| **HT2B-A14** | Unsupported Positive Claims Elimination | Inspect all user-visible strings, headers, cards, tooltips. | No unsupported positive candidate claims (e.g. *"Winner"*, *"Best"*, *"Approved"*, *"Certified"*, *"Safe"*, *"Ready for deployment"*). Permitted only in truthful negative boundaries, qualification disclaimers, or evidence state explanations (e.g. "not approved", "requires safety qualification", "no winner available under current assumptions"). | Any user-visible claim presenting a candidate as an approved, certified, safe, or winning packaging solution. |
| **HT2B-A15** | Responsive Layout Verification | Test viewport widths: `1440px` (desktop), `1024px` (tablet), `390px` (mobile). | Layout adapts smoothly; cards stack; no horizontal scrollbar or clipped text. | Horizontal overflow or broken layout on mobile. |
| **HT2B-A16** | Accessibility (A11y) Verification | Test keyboard Tab navigation, focus states, screen reader ARIA labels. | All interactive controls keyboard accessible; visible focus rings; state communicated by text + badge, not color alone. | Unfocusable buttons, missing labels, color-only states. |
| **HT2B-A17** | Legacy Modes Non-Regression | Navigate to `Comparison` and `Portfolio Selection` modes. | Existing scenario switching, virgin plastic rings, and portfolio evaluation continue functioning identically. | Broken Selection view, missing charts, or broken styling. |

---

## 10. Required Screenshot Evidence for Denis / APR-HT2B

To satisfy `APR-HT2B`, Denis must provide the following 5 DOM screenshots captured from a live running browser session:
1. **`p1-post-cook-decision-summary.png`**: Viewport `1440px`, showing P1 Whole Chicken, Post-Cook Hot Hold, C1 Gaia qualification lead, `Qualified Survivors: 0 / 6`, and epistemic badges.
2. **`p2-biopap-conflict.png`**: Viewport `1440px`, showing P2 Portion Pack, C5 BIOPAP LC SI-14 qualification lead, and explicit `CONFLICT` badge on 175°C vs 185°C.
3. **`literal-250-blocked-and-c6-fallback.png`**: Viewport `1440px`, showing Literal 250°C Oven Baking workflow, C2–C5 `BLOCKED` thermal status, and `C6-RO-H` high-temperature fallback path.
4. **`recommendation-mobile-390px.png`**: Viewport `390px`, showing full vertical stack of Recommendation Journey without horizontal page overflow.
5. **`recommendation-503-unavailable.png`**: Viewport `1440px`, showing the fail-closed error UI with Retry button when backend returns 503.

> [!IMPORTANT]
> Screenshots prove **visual layout and rendering compliance only**. They do NOT prove physical food contact safety, 6-hour seam integrity, or real-world supplier availability.

---

## 11. Remaining UNKNOWN & External Evidence Gaps

The backend runtime, canonical oracle, and automated regression layers are validated on the audited snapshot, while full end-to-end and browser acceptance remains pending `PUX-HT2R` / `APR-HT2B`. Furthermore, software evaluation cannot substitute for real-world physical tests and commercial supplier contracts:
1. **Official Declarations of Compliance (DoC) & Migration Lab Reports:** EU 10/2011 overall and specific migration tests (Simulant D2 for fatty hot poultry) remain supplier obligations for all candidates.
2. **Physical Seam & Grease Leak Testing:** Physical 6-hour holding tests under hot chicken fat and juices under modeled hot deli cabinet conditions (actual Profi display holding temperature `UNKNOWN`).
3. **Physical Whole Chicken Fit:** Geometric fit checks for modeled 1.0–1.4 kg hot whole chickens in Gaia bags (actual Profi whole bird mass distribution `UNKNOWN`).
4. **Transparent Closure Performance:** Anti-fog performance, lid sealing integrity, and consumer handle ergonomics under high humidity.
5. **Real-World Romanian Recycling Reality:** Post-consumer paper/board collection, sorting, and organic composting infrastructure in Romanian municipalities (`RESEARCH_INVESTIGATION` / `UNKNOWN`).
6. **Commercial Supplier Terms:** Distributor inventory status (`listing ≠ stock`), minimum order quantities (MOQs), delivery lead times, and negotiated price tiers for retail store network volume (`UNKNOWN`).

---

## 12. Stretch Goal — Judge-Risk Delta Matrix

To prepare the team for hackathon judging and live Q&A, this table delineates what software mathematically proves versus what physical validation remains external:

| High-Risk Claim Area | Current Grounded Evidence | What PackShift Software Proves | What Remains Physical / External Gap | Demo-Safe Claim Wording |
|---|---|---|---|---|
| **250°C In-Pack Baking** | Seller claims 280°C for e-pui225 aluminium body; C2–C5 max ratings ≤ 200°C. | Blocks C2–C5 thermally. Binds C6 to RO-H body. Demarcates body claim from complete package. | High-temp duration unverified; compatible transparent lid for 250°C unverified. | *"Aluminium body provides a high-temperature fallback path for 250°C in-pack cooking; complete sealed system and holding duration require physical qualification."* |
| **Up to 6h Hot Holding** | BIOPAP family claim: 6h @ 90°C. Modeled holding test condition: 85–95°C. | Identifies C1 and C5 as primary qualification leads. Isolates family claim from exact-pack proof. | Exact SI-14 tray + film + hot chicken juices 6h seam integrity unverified. Actual Profi holding temp UNKNOWN. | *"Candidate materials demonstrate hot-holding potential up to 6 hours under modeled deli conditions, but exact tray-seam integrity must be physically qualified under hot chicken fat."* |
| **Food Contact Safety** | Manufacturer marketing mentions food contact suitability. | Requires formal DoC and fatty food migration certificates before approval. | Physical Declaration of Compliance (DoC) and EU 10/2011 Simulant D2 lab certificates missing. | *"Packaging candidates are designed for food contact, but full EU 10/2011 regulatory compliance requires formal supplier certificates and fatty-food migration testing."* |
| **Recyclability in Romania** | Monomaterial paper/cellulose and unlaminated aluminium identified; multilayers avoided. | Quantifies theoretical recyclability potential; distinguishes material design from waste reality. | Actual Romanian municipal sorting and organic composting infrastructure outcomes UNKNOWN. | *"Packaging materials are designed for recycling or composting, while real-world recovery depends on local Romanian municipal sorting capabilities."* |
| **Transparent Viewing Closure** | E-ambalaj a-680681 OPS lid for C6-RO-P; Futamura NatureFlex window for C1. | Isolates transparent lids to specific configurations. Enforces non-leakage to RO-W or RO-H. | In-pack anti-fog behavior under high humidity and heat holding unverified. | *"Portion and bag configurations incorporate transparent viewing elements, with anti-fog performance subject to live display testing."* |
| **Grease & Oil Barrier** | Koehler NexPlus OGR paper; BIOPAP cellulose barrier; Hostaphan PET film. | Evaluates barrier claims against hot chicken grease; blocks non-barrier formats. | Physical 6-hour hot fat seam leak testing unverified. | *"Candidates utilize specialized grease-resistant barriers, requiring physical seam-leak verification under hot poultry fat."* |
| **+10–15% Cost Tolerance** | Romanian distributor catalogue prices captured (1.15–1.29 RON/pair, 0.37 RON for B3). | Integrates mentor tolerance as economic screening context only; preserves missing incumbent cost as `UNKNOWN` and refuses to invent savings or declare cost compliance. | Actual Profi incumbent purchase cost and annual store volume UNKNOWN. European freight unquoted. | *"Mentor ~10–15% cost tolerance serves as commercial context only; actual cost premium or compliance with this threshold cannot be calculated until comparable Profi incumbent unit cost and network volumes are known."* |
| **Romania Availability** | Local distributors identified (E-ambalaj, La Habibi, Barleta) with active catalogue listings. | Tags status as `ROMANIA_DISTRIBUTOR_CURRENT` (`listing ≠ stock`), requiring formal quote. | Real warehouse inventory, MOQs, and delivery lead times unverified. | *"Local Romanian distributors offer active catalogue order leads, with commercial volume availability and delivery lead times subject to formal inquiry."* |

---

## 13. Handoff Evidence Block

```text
APR-HT2A HANDOFF

Repository: Slave-of-Skynet/gigafood
Branch: alisa/apr-ht2a-post-revert-acceptance
Base SHA: 513e0867feaf1b3062c1c02e98d51f2eaa4f1f93
Working HEAD: 7eb246695fe22b91d62561a1af36c15a6bf8a2ba

Current main drift from APR-HT1:
- PR #38 impact: Reverted premature PR #37 UI changes. Deleted 10 Recommendation visual components (RecommendationView.tsx, DecisionSummary.tsx, etc.); restored HomePage.tsx to Comparison and Selection modes.
- PR #39 impact: Consolidated to single canonical frontend/ directory. Removed legacy non-ASCII "Сайт" folder; preserved packaging reference PDFs and images under canonical ASCII paths.

Files changed: 0
Files added: 1 (docs/review/APR-HT2A-post-revert-acceptance-reconciliation.md)

HTF-03 validator: PASS (6 candidates, 3 baselines, 126 sources, 63 calculations, 48 gate rows, 41 mutation rejections)
Acceptance tests: 8/8 passed in 0.76s (pytest backend/tests/acceptance_htf04)
Full backend tests: 162/162 passed in 3.61s
verify.ps1: PASS (backend editable install, pytest, npm run build with 35 modules)
demo.py --check: PASS (PACKSHIFT DEMO READY, A-core READY, Selection READY, Recommendation READY)
git diff --check: PASS (clean, zero whitespace/CRLF errors)

48-row oracle:
- total: 48
- qualification required: 28
- blocked: 20
- survivors: 0
- procurement approvals: 0

P1 post-cook: C1 Gaia (qualification_priority=1, outcome=QUALIFICATION REQUIRED, qualified_survivor=false)
P2/P3/P4 post-cook: C5 BIOPAP LC SI-14 (qualification_priority=1, outcome=QUALIFICATION REQUIRED, qualified_survivor=false)
Literal 250C: C2-C5 BLOCKED (thermal gate FAIL); C6-RO-H (qualification_priority=2, outcome=QUALIFICATION REQUIRED)
C5 conflict: PRESERVED (175°C vs 185°C C01 conflict explicit; 6h/90°C family-scoped)
C6 priority: STRICTLY 2 (never promoted to priority 1 or declared winner)
B1/B2/B3 separation: STRICTLY PRESERVED (B1 incumbent unmeasured, B2 virgin plastic ref, B3 Romanian ref NEVER Profi)
C6 anti-leakage: STRICTLY ISOLATED (RO-P price/lids do not qualify RO-H; C6-EU 350°C does not qualify RO-H)
UNKNOWN handling: NEVER ZERO (unmeasured mass/cost blocks calculation)
ESTIMATED handling: PRESERVES BOUNDS (E051 range [-67.6%, +82.1%] explicit)
CONFLICT handling: VISIBLE IN ALL LAYERS (no silent collapse)
503 fail-closed: VERIFIED (missing/corrupt snapshot returns 503 RECOMMENDATION_EVIDENCE_UNAVAILABLE)
422 invalid-context: VERIFIED (unknown product/workflow and C6-EU in unsupported context return 422)

Unsafe runtime claims found: 0 (clean search across backend/app/** and frontend/src/**)
Stale APR-HT1 implementation claims identified:
- "RecommendationView is mounted on current main" (STALE: reverted in PR #38)
- "DEF-03 open on DecisionSummary.tsx & RecommendationView.tsx" (STALE on main: files reverted; requirement stands for PUX-HT2R)

Recommendation UI current-main state:
NOT CURRENTLY IMPLEMENTED (Assigned to Denis under PUX-HT2R)

APR-HT2B checklist prepared:
YES (17 frozen test cases HT2B-A01 through HT2B-A17 + 5 required screenshots defined)

Unexpected findings:
- All typed Recommendation contracts and client methods were preserved in frontend/src/api/ through PR #38 & #39, providing a clean integration foundation for Denis's PUX-HT2R.

Anything unverified:
- Live in-browser visual execution of Recommendation Journey (pending Denis's PUX-HT2R handoff)
- Real-world supplier DoC migration lab certificates and physical 6h hot fat seam tests (external physical gaps)

Verdict by layer:
- Evidence: ACCEPTABLE
- Runtime: ACCEPTABLE
- Oracle: ACCEPTABLE
- Existing app regression: ACCEPTABLE
- Recommendation UI: NOT CURRENTLY IMPLEMENTED — assigned to PUX-HT2R
- Physical qualification: BLOCKED: MISSING EXTERNAL EVIDENCE
```
