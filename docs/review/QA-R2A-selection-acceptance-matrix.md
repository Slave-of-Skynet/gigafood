# QA-R2A — Selection MVP Acceptance & Adversarial Judge QA

**Owner:** Alisa / `@lisqrn`
**QA status:** **BLOCKED for acceptance — STOP-01**
**Audited base:** `f59625203fe5d054c1ec5a06ab5f7f12d72a6fd5` (`origin/main` after fetch, 2026-09-26)
**Branch:** `alisa/qa-r2a-selection-acceptance`
**Write scope:** This report only. No runtime, test, fixture, or frontend change.

## 1. Audited base and scope

**OBSERVED EXECUTION:** `git fetch origin` resolved `origin/main` to the expected PR #14 merge SHA above. Before branching, `git status --short` was empty and local `main` was `bb17de0e55e3630cffc197c97982a73ba4e0ea1b`, three commits behind. `git switch -c alisa/qa-r2a-selection-acceptance origin/main` created the QA branch on the exact requested base. There was no base drift to reconcile. The audit exercises committed backend Selection service and API behavior, plus temporary in-memory/API fixtures; synthetic values below are **SIMULATION / QA PROBE**, never public product evidence or Profi facts.

The normal verification script also built the frontend, but browser/UI acceptance belongs to QA-R2B. The report does not independently reauthenticate the manufacturer documents or establish actual Profi requirements, packaging inventory, purchasing volume, or implementation approval.

**POST-AUDIT DELIVERY NOTE — MATERIAL BASE DRIFT:** During PR preparation, a fresh `git fetch origin` found `origin/main` at `994e352adee7e5eb5e90dbb38aad6f4c3aa1223e` (PR #15), two commits beyond the audited SHA. `git diff --stat f596252..origin/main` shows changes in Selection domain, service, API, tests, and the public portfolio fixture (five files; 309 insertions, 70 deletions). Inspection found changed numeric point-value guards, unrounded arithmetic, next-action precedence, dynamic summary wording, list endpoint shape, and candidate scope metadata. These are material Selection semantics/API/evidence changes. **This report is historical evidence for `f596252…`, not acceptance of `994e352…`; current-main acceptance is UNKNOWN pending Project Brain reconciliation and fresh QA.** STOP-01's old-base reproduction is preserved below and must not be silently called current-main verified.

## 2. Authority and protected semantics

**FACT — accepted authority:** [challenge canon](../canon/challenge_canon.md), [product canon](../canon/product_canon.md), [decision policy](../canon/decision_policy.md), [evidence semantics](../evidence_semantics.md), [INT-R2 contract](INT-R2-selection-mvp-contract.md), [IGR-R2A recon](../evidence/IGR-R2A-candidate-portfolio-recon.md), then runtime and tests. [QA-R1](QA-R1-judging-readiness-audit.md) records the prior unverified-premise fix. The challenge canon carries supplied official-brief extracts; this audit did not independently inspect the original brief. Runtime/tests cannot override accepted higher-level semantics.

Calculation (`CALCULATED` / `INSUFFICIENT_DATA`) and operational eligibility (`ELIGIBLE` / `REVIEW_REQUIRED` / `BLOCKED`) remain independent. Missing recycled fraction is not zero, a marketing ceiling, or an article point value. An explicit 70°C versus modeled 95°C mismatch blocks the candidate while retaining the 95°C requirement's `ASSUMED / NOT_VERIFIED` boundary. `SOURCE_AVAILABLE` is not `VERIFIED`; `PUBLIC` is not `PROVIDER`. Hypothetical volume is not actual Profi demand. A negative delta must remain unfavorable in **all result language**, not only in numeric fields. The Selection contract permits stable decision-state grouping, not weighted scoring or autonomous procurement.

## 3. Verification environment and evidence keys

**OBSERVED EXECUTION:** Windows PowerShell, Python 3.11.9, pytest 9.1.1, repository `.venv`; FastAPI `TestClient` instantiated `create_app(DEFAULT_EVIDENCE, DEFAULT_PORTFOLIOS)` against the committed fixture. Temporary malformed/synthetic portfolio JSON was created under `TemporaryDirectory` and removed on exit. No network manufacturer validation was performed.

| Key | Command actually executed / evidence |
| --- | --- |
| E1 | `git fetch origin`; `git status --short`; `git rev-parse HEAD`; `git rev-parse origin/main`; `git log -5 --oneline`; branch creation above. |
| E2 | `& ./.venv/Scripts/python.exe -m pytest backend/tests/test_selection.py -q` → **26 passed**, one Starlette/httpx deprecation warning. |
| E3 | PowerShell inline Python via `@' ... '@ \| & ./.venv/Scripts/python.exe -`: `TestClient` called default GET, list GET, unknown GET/POST, invalid-volume POST, 60°C POST, 250,000-unit POST, and 1,000,000,000-unit POST. Assertions and selected actual payload fields are recorded below. Exit 0. |
| E4 | Same inline Python execution: `copy.deepcopy` of committed portfolio, `Portfolio.model_validate`, and `evaluate_portfolio` for verification weakening, boundary mismatch, and negative delta; all synthetic. Exit 0. |
| E5 | Separate inline Python execution: `TestClient(create_app(DEFAULT_EVIDENCE, temporary_fixture))` for negative-delta API reproduction and a four-candidate grouping probe. Exit 0. |
| E6 | `rg -n -i 'topsis\|\bahp\b\|weighted\|composite\|score\|rank\|best candidate\|procurement recommendation\|candidate\(s\) viable\|summary_verdict\|group1\|group2\|group3' backend/app/services/selection.py backend/app/main.py backend/app/domain/packaging.py`; inspected the matches in `selection.py:379-422`. |
| E7 | `./scripts/verify.ps1` → editable backend install, **84 passed**, one Starlette/httpx deprecation warning; `npm ci` completed with zero reported vulnerabilities; `tsc --noEmit && vite build` passed (30 modules); script's `git diff --check` passed; exit 0. |

`TestClient` is in-process HTTP against the real app routes, not an external server/deployed environment. Both the unchanged default fixture and deliberately synthetic fixture paths are identified in each result.

## 4. Acceptance matrix

`PASS` means the stated case passed within its inspected/executed scope. `FAIL` means an accepted output semantic failed. The matrix is **11/12 PASS, 1/12 FAIL**; the failure blocks overall acceptance despite a green existing test suite.

| ID | Purpose | Inputs / setup | Expected contract behavior | Observed behavior | Evidence / command | Result | Judge/demo implication |
| --- | --- | --- | --- | --- | --- | --- | --- |
| QA2-A01 | Unknown PCR / Candidate A | Committed default `GET /api/v1/portfolios/faerch-deli-trays` | `INSUFFICIENT_DATA`, null delta, `REVIEW_REQUIRED`, `REQUEST_PCR_EVIDENCE` | Exactly those states; `candidate_virgin_pack_g=null`, missing `components.tray-body.recycled_content_fraction`; action requests current SKU/recipe declaration. Fixture marks `NON_POINT_VALUE`; no 70% substitution. | E3; [fixture](../../data/evidence/selection-portfolios.json), [service](../../backend/app/services/selection.py) | **PASS** | Do not quote a Candidate A saving. |
| QA2-A02 | Candidate B hard gate | Same default GET; modeled 95°C, documented 70°C | `INSUFFICIENT_DATA + BLOCKED`; `REJECT_INCOMPATIBLE` with explicit thermal reason | Exactly those states. Thermal finding says assumed demo 95°C vs documented 70°C and carries `NOT_VERIFIED`; PCR remains null. | E3 | **PASS** | Block is scoped to the modeled context, not a universal APET verdict. |
| QA2-A03 | Unknown microwave capability | Default B and 60°C override, microwave required | Unknown never becomes true/approved; without dominant hard block, `REVIEW_REQUIRED` | B's microwave value is null; finding is `REVIEW_REQUIRED / NOT_VERIFIED`, reason says capability not established. At 60°C overall B is `REVIEW_REQUIRED`. | E3 | **PASS** | State the unanswered microwave question explicitly. |
| QA2-A04 | Override provenance | `POST .../evaluate` with `{"required_max_temperature_c":60}` | `USER_PROVIDED / NOT_VERIFIED`; B no longer thermally blocked, remains review; PCR delta null | Returned 60°C provenance matches; B `REVIEW_REQUIRED + INSUFFICIENT_DATA`; thermal finding says 70°C >= 60°C; microwave still unknown. | E3 | **PASS** | A changed assumption changes the thermal gate, not verification. |
| QA2-A05 | Missing PCR through annual impact | POST 250,000 and 1,000,000,000 annual units | For both candidates: `INSUFFICIENT_DATA`, all annual numerics null, `is_actionable=false` | Both volumes retained as requested; both candidates have null `annual_reduction_kg`, `annual_current_virgin_kg`, `annual_candidate_virgin_kg`; no multiplication of missing delta. | E3 | **PASS** | A large scenario volume cannot manufacture savings. |
| QA2-A06 | Volume disclosure | Same volume POSTs | Explicitly hypothetical user volume; no actual Profi demand/impact claim | Each `annual_impact.disclosure` says “Hypothetical scenario based on user-supplied volume. Not actual Profi purchase volume, commercial commitment, or verified retail impact.” | E3 | **PASS** | Never present entered units as Profi purchasing. |
| QA2-A07 | Public/provider boundary | Default list and evaluation | `dataset_kind=PUBLIC`; not Profi provider data | List and result show `PUBLIC`; result disclosure says `NOT PROFI PROVIDER DATA` and “not implementation approval.” Defaults' notes say hypothetical demo assumptions, not Profi requirements. | E3; [fixture](../../data/evidence/selection-portfolios.json) | **PASS** | Answer “These values came directly from Profi” with no. |
| QA2-A08 | Source available vs verified | Default findings; synthetic verified premises then weaken one candidate capability to `SOURCE_AVAILABLE` | Positive unverified premise must lead to review, never silent `VERIFIED` | Default A has `SOURCE_AVAILABLE` capabilities but review findings with weakest premise `NOT_VERIFIED`. Synthetic all-verified case was `ELIGIBLE`; weakening microwave capability alone changed it to `REVIEW_REQUIRED`, finding `SOURCE_AVAILABLE`. | E3, E4 | **PASS** | A source citation is not field verification. |
| QA2-A09 | Component boundary | **SIMULATION / QA PROBE:** numeric candidate, baseline `TRAY_BODY_ONLY`, candidate `HINGED_COMPLETE_PACK` | `ASYMMETRIC_BOUNDARY`, transition `INSUFFICIENT_DATA`, null delta; individual values may remain | Returned rating `ASYMMETRIC_BOUNDARY`, `boundary_match=false`, individual virgin values 26.29 g / 14.966 g, null `reduction_g` and `reduction_pct`, missing `component_boundary_mismatch`. | E4 | **PASS** | Do not subtract unlike package scopes. |
| QA2-A10 | Negative outcome integrity | **SIMULATION / QA PROBE:** one candidate, 31 g and 0 PCR versus 26.29 g baseline, common boundary; through service and temporary-fixture GET API | Negative delta remains negative and is never called a favorable saving | Numeric delta correctly `-4.71 g` / `-17.9156%`, but HTTP 200 `summary_verdict` says **“1 candidate(s) viable with calculable environmental savings.”** | E4, E5; reproduction in §5 | **FAIL — STOP-01** | A judge can hear a false saving even while the number is negative. |
| QA2-A11 | Decision grouping without fabricated rank | Source order blocked, calculated-1, missing, calculated-2 in **SIMULATION / QA PROBE**; inspect executable code | Group nonblocked/calculated, nonblocked/insufficient, blocked; stable catalog order within group; no score | API order was calculated-1, calculated-2, missing, blocked. Source scan found list grouping and no executable TOPSIS/AHP/weighted score or rank field in inspected Selection backend. | E5, E6 | **PASS** | Order is decision-state organization, not a winner. |
| QA2-A12 | Safe no-recommendation result | Committed default portfolio | Explicitly say no current recommendable transition | `summary_verdict`: “No candidate is currently recommendable for transition: Candidate A requires a current SKU/recipe recycled-content declaration with provenance, while Candidate B is blocked by thermal incompatibility under the stated modeled operating context.” | E3 | **PASS** | Safe refusal is the correct default demo conclusion. |

## 5. Fresh adversarial probes

These are **OBSERVED EXECUTION of SIMULATION / QA PROBE inputs**, except P1/P2 which use the committed portfolio with user request overrides. They were written for this audit and do not rely on the dedicated Selection test assertions.

| Probe | Deliberate attack | Actual result |
| --- | --- | --- |
| P1 — requirement relaxation | POST 60°C instead of committed default 95°C | B changed `BLOCKED → REVIEW_REQUIRED`; 70°C >= 60°C is numerically sufficient, but user requirement stays `USER_PROVIDED / NOT_VERIFIED`, microwave remains unknown, PCR delta null. |
| P2 — huge hypothetical volume | POST `annual_units=1000000000` with unchanged committed missing PCR | Both candidates' annual environmental numerics stayed null, status `INSUFFICIENT_DATA`, `is_actionable=false`; disclosure remained hypothetical. |
| P3 — epistemic weakening | In memory, supply synthetic numeric PCR; label both requirements and candidate capabilities `VERIFIED`, then weaken only candidate microwave capability to `SOURCE_AVAILABLE` | Eligibility changed `ELIGIBLE → REVIEW_REQUIRED`; microwave finding retained `SOURCE_AVAILABLE`. No fixture write. |
| P4 — asymmetric boundary | In memory, supply synthetic numeric PCR then change candidate boundary to `HINGED_COMPLETE_PACK` | Both individual values survived; transition delta withheld as `INSUFFICIENT_DATA`. No fixture write. |
| P5 — unfavorable arithmetic and text | In memory and temporary-file API, candidate 31.0 g × (1−0) versus baseline 26.29 g × (1−0) | Arithmetic returned `-4.71 g / -17.9156%`; summary asserted “environmental savings.” This is STOP-01. Temporary JSON was removed automatically. |
| P6 — stable grouping | Temporary API fixture with source order `[blocked, calculated-1, missing, calculated-2]` | Response order `[calculated-1, calculated-2, missing, blocked]`; order within calculated group remained stable. Temporary JSON was removed automatically. |

Minimal executable **SIMULATION / QA PROBE** reproduction of STOP-01 (the audit executed this through `TestClient`; these synthetic values are not product evidence):

```python
import copy, json
from pathlib import Path
from tempfile import TemporaryDirectory
from fastapi.testclient import TestClient
from app.main import DEFAULT_EVIDENCE, DEFAULT_PORTFOLIOS, create_app

portfolio = copy.deepcopy(json.loads(DEFAULT_PORTFOLIOS.read_text(encoding="utf-8"))[0])
portfolio["candidates"] = [portfolio["candidates"][0]]
candidate = portfolio["candidates"][0]
candidate["package"]["components"][0]["plastic_mass_g"]["value"] = 31.0
candidate["package"]["components"][0]["recycled_content_fraction"]["value"] = 0.0
candidate["metadata"]["recycled_content_point_value_status"] = "EXACT_POINT_VALUE"
with TemporaryDirectory(prefix="qa-r2a-api-") as tmp:
    path = Path(tmp) / "negative.json"
    path.write_text(json.dumps([portfolio]), encoding="utf-8")
    with TestClient(create_app(DEFAULT_EVIDENCE, path)) as client:
        response = client.get("/api/v1/portfolios/faerch-deli-trays")
        body = response.json()
        print(response.status_code, body["candidates"][0]["calculation"]["reduction_g"], body["summary_verdict"])
```

Observed: `200 -4.71 1 candidate(s) viable with calculable environmental savings. Verification of operational premises required before QA advancement.` The minimal affected surface is [selection.py:395-411](../../backend/app/services/selection.py): the summary path tests whether `group1` exists, not whether its deltas are positive. The API passes that sentence through unchanged. This code path is reachable for a valid, complete numeric portfolio, although the current committed public candidates both lack numeric PCR.

## 6. API boundary checks

**OBSERVED EXECUTION (E3):** `GET /api/v1/portfolios` returned HTTP 200 with one `PUBLIC` portfolio; `GET /api/v1/portfolios/faerch-deli-trays` returned HTTP 200; `POST /api/v1/portfolios/faerch-deli-trays/evaluate` returned HTTP 200 for both override and annual-volume bodies. Unknown portfolio GET and POST each returned HTTP 404 `{"detail":"PORTFOLIO_NOT_FOUND"}`. POST `{"annual_units":0}` and `{"annual_units":-1}` each returned HTTP 422; neither was normalized.

**OBSERVED EXECUTION (E3, isolated corrupt fixture):** A temporary portfolio file containing `{broken` made list GET, portfolio GET, and evaluation POST return HTTP 503 `{"detail":"PORTFOLIOS_UNAVAILABLE"}`. The A-core `/api/v1/health` still returned HTTP 200 because its health check reflects the separately loaded scenario evidence. **INFERENCE / NON-BLOCKING RISK:** an operator watching only A-core health could miss a Selection portfolio outage; integrated error visibility belongs in QA-R2B. This is not a silent fallback or a false Selection result. The corrupt fixture was removed automatically.

## 7. Regression verification

**OBSERVED EXECUTION:** Focused Selection suite E2: **26 passed**. Normal verification E7: editable backend install succeeded; backend suite **84 passed**; frontend `npm ci`, TypeScript check, and Vite production build passed; script's `git diff --check` passed. Both pytest runs emitted one `StarletteDeprecationWarning` about `httpx` with `starlette.testclient`; no test failed. The green suite does not cover STOP-01's negative-delta summary assertion. No browser interaction, deployment, load test, or external CI run is claimed.

## Judge Adversarial Questions

| Question | Evidence-backed answer |
| --- | --- |
| J1 — Why not use Faerch's “up to 70% recycled PET”? | **FACT:** [IGR-R2A](../evidence/IGR-R2A-candidate-portfolio-recon.md) scopes it as a marketing/recipe ceiling, not a current numeric article point. **OBSERVED:** Candidate A's `NON_POINT_VALUE` / null fraction yields `INSUFFICIENT_DATA` and `REQUEST_PCR_EVIDENCE`. |
| J2 — Why does B fail if rPET might reduce virgin plastic? | Operational suitability is independent. **OBSERVED:** documented 70°C is below the modeled 95°C requirement, so B is `BLOCKED`; its environmental delta is unavailable due to missing PCR. |
| J3 — Are 95°C and microwave actual Profi requirements? | No. **OBSERVED:** both defaults are `ASSUMED / NOT_VERIFIED` and their notes call them hypothetical demo requirements, not Profi provider requirements. |
| J4 — Are these packages currently used by Profi? | **UNKNOWN.** The result is `PUBLIC` demonstration evidence and explicitly says `NOT PROFI PROVIDER DATA`; it is not a Profi inventory assertion. |
| J5 — Which package should Profi buy? | The default API says no candidate is currently recommendable: A needs a current SKU/recipe PCR declaration; B fails the modeled temperature gate. PackShift does not make procurement approval. |
| J6 — What if Profi only needs 60°C? | **OBSERVED request scenario, not a verified Profi requirement:** POST 60°C marks it `USER_PROVIDED / NOT_VERIFIED`; B becomes `REVIEW_REQUIRED` rather than thermally blocked. Microwave and PCR gaps remain. |
| J7 — Are one million entered units Profi's annual savings? | No. `annual_units` is user-supplied hypothetical volume. With this portfolio's missing PCR, even one billion units returned null annual savings and a disclosure denying actual Profi volume/verified retail impact. |
| J8 — Why trust the numbers? | Inspect source-attributed input, component boundary, origin and verification state separately from deterministic arithmetic and the operational gate. **OBSERVED:** missing values/boundary mismatch withhold deltas; external source-to-value and physical verification remain **UNKNOWN**. STOP-01 shows why result wording also needs acceptance review. |

## 9. Findings

### STOP-01 — Unfavorable delta called “environmental savings”

**Severity:** STOP; **status:** reproduced through service and temporary-fixture HTTP. **Accepted rule:** negative reduction is valid unfavorable information and must not be turned into favorable saving language ([decision policy](../canon/decision_policy.md), [INT-R2 N-04/P-07](INT-R2-selection-mvp-contract.md)). **Observed:** `-4.71 g` and `-17.9156%` survive in `calculation`, but `summary_verdict` claims a candidate is “viable with calculable environmental savings.” The branch in `selection.py:395-411` counts any nonblocked calculated candidate, regardless of reduction sign. A reviewer reading only the summary can be misled. **Scope:** summary generation and its API field; no evidence that arithmetic or grouping is corrupted. **Action for Project Brain:** decide the bounded fix contract and acceptance wording. QA-R2A does not repair runtime or change shared semantics.

**Other STOP findings:** none in the exercised scope. **FIX REQUIRED findings:** none separately classified. **NON-BLOCKING RISK:** Selection portfolio load failure returns 503 on Selection routes while A-core health stays 200; monitor/UI error presentation needs integrated QA. The warning from Starlette's TestClient adapter is a tooling deprecation, not a product failure.

## 10. Risks deferred to QA-R2B

- Browser display of candidate states, source/assumption disclosure, negative values and summary text, including mobile layout and screen-reader wording.
- Integrated handling of Selection 503 responses and recovery while A-core health is ready.
- Timed demo/judge rehearsal and whether an operator can distinguish public demo data from actual Profi evidence from the rendered UI.

These are **UNKNOWN in QA-R2A**, not claims of a tested UI result. Manufacturer document authenticity/currentness, physical food-contact testing and actual Profi workflow are separate human evidence gaps, not backend QA passes.

## 11. Handoff

```text
QA-R2A status: BLOCKED for acceptance (STOP-01)
Audited base SHA: f59625203fe5d054c1ec5a06ab5f7f12d72a6fd5
Branch: alisa/qa-r2a-selection-acceptance
Changed files: docs/review/QA-R2A-selection-acceptance-matrix.md only
Focused command: ./.venv/Scripts/python.exe -m pytest backend/tests/test_selection.py -q — 26 passed
Fresh probes: P1-P6 executed; P5 reproduced STOP-01 through service and temporary-fixture HTTP
Full command: ./scripts/verify.ps1 — 84 backend tests passed; frontend build passed; exit 0
Acceptance matrix: 11/12 PASS; QA2-A10 FAIL
STOP findings: STOP-01, negative delta summarized as environmental savings
Non-blocking risk: Selection 503 not reflected in A-core health
Deferred to QA-R2B: integrated UI, outage display, demo rehearsal
Commit / push / PR / merge / deploy at original QA handoff: none
```

**OBSERVED EXECUTION — original QA handoff diff:** `git add -N -- docs/review/QA-R2A-selection-acceptance-matrix.md` exposed the new file to unstaged diff without staging its content. The complete `git diff -- docs/review/QA-R2A-selection-acceptance-matrix.md` was inspected. After correcting trailing spaces, `git diff --check` returned clean; `git diff --stat` reported `1 file changed, 151 insertions(+)`; `git status --short` reported ` A docs/review/QA-R2A-selection-acceptance-matrix.md` (intent-to-add, content unstaged). These are the recorded pre-delivery results; the PR commit is a later delivery action.
