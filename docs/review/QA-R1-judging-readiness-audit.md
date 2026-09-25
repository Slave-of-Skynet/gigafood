# QA-R1 — Judging Readiness & Evidence Gap Audit

**Current status: COMPLETE — STOP FOR PROJECT BRAIN REVIEW.**

**Reconciled audited base:** `d3b28c68330d89d251cc588002d550c0cca901b7` (`origin/main`, fetched 2026-09-25). **Owner:** Alisa / `@lisqrn`. **Original STOP-01:** VERIFIED RESOLVED by HG-QA-R1-01 / IGR-R1F, PR #6. **Official challenge brief authority:** RESOLVED by direct reconciliation against `AgriFood.txt`. **New protected-contract conflict:** none found in the inspected and exercised scope.

**Judging conclusion:** PackShift can demonstrate a working, evidence-labelled per-unit comparison and a meaningful refusal/blocking story. It cannot yet substantiate actual Profi impact, complete-package savings, validated retail adoption or commercial viability. The strongest next investment is source-to-value substantiation plus a concise, rehearsed explanation of the decision boundaries; large new platform features would dilute that work.

The original report is retained below as historical evidence, including its then-correct incomplete status. All current findings, verification and handoff follow the historical block. Completion means the audit is delivered, not that every judging gap is closed.

<details>
<summary>Historical audit at 4f9c5fd — original HARD STOP and reproduction, preserved</summary>

**Status: HARD STOP — INCOMPLETE; Project Brain / Vladimir decision required.**

This is an interim conflict record, not the completed eight-criterion audit or a judging-readiness approval. Execution stopped under section 18 of the supplied QA-R1 contract: “Also stop if new evidence contradicts an accepted canonical decision.”

## Base-state gate

- Inspected on 2026-09-25 in `C:\Users\user\Documents\skynet\gigafood`.
- Remote: `https://github.com/Slave-of-Skynet/gigafood.git`.
- `git fetch origin`: successful; remote main advanced locally from `21c5f45` to the contract's expected base.
- Audited base: `4f9c5fd3cae18769b72bb268638c8cacc358ad96`, matching refreshed `origin/main` and the issuance SHA. No newer remote commits required inspection.
- Initial branch: `fix/post-pr4-provenance-gate`; initial HEAD: `e76071409348cb802b89b026a2148523311a5da2`; initial `git status --short`: empty.
- Created `alisa/qa-r1-judging-readiness-audit` at `origin/main`. Only this report is added. No application, tests, evidence, canon, dependency or infrastructure changes; no commit, push or PR.
- No uncommitted frontend mock is counted as evidence.

## STOP-01 — Unverified premises can produce ELIGIBLE

**FACT — canonical statement:** [decision_policy.md](../canon/decision_policy.md), lines 62–63, says: “Unmodeled or unverified requirements yield `REVIEW_REQUIRED`.” [architecture.md](../architecture.md), lines 65–67, similarly describes unmodeled or unverified requirements/capabilities as requiring review.

**FACT — implementation:** [virgin_plastic.py](../../backend/app/services/virgin_plastic.py), `compare`, checks the presence and values of the modeled requirements and candidate capabilities. If their values satisfy the comparisons and at least one requirement is evaluated, line 139 returns `ELIGIBLE`. Verification states affect incompatibility findings, but do not prevent this successful branch. The generic food-contact advisory remains `REVIEW_REQUIRED / NOT_VERIFIED` and does not change operational eligibility.

**FACT — existing test expectation:** [test_virgin_plastic.py](../../backend/tests/test_virgin_plastic.py), `test_operational_case5_requirements_satisfied` (line 177), explicitly expects `ELIGIBLE` with `ASSUMED / NOT_VERIFIED` requirements and `SOURCE_AVAILABLE` capabilities. This is evidence of conflicting committed expectations, not a claim that the test suite was run or failed.

**OBSERVED EXECUTION — bounded service probe:** Using the existing `.venv\Scripts\python.exe`, loaded committed public Case B into memory, set candidate thermal capability to 100°C and microwave capability to true, and labelled both candidate capabilities `ASSUMED / NOT_VERIFIED` with a synthetic QA reference. Left the committed demonstration requirements at 95°C and microwave=true, both `ASSUMED / NOT_VERIFIED`. Validated through `Scenario.model_validate` and invoked the committed `compare` service. No evidence file was edited.

Actual result (process exit 0):

```json
{
  "status": "CALCULATED",
  "eligibility_status": "ELIGIBLE",
  "constraints": [{
    "constraint_id": "food-contact-suitability",
    "status": "REVIEW_REQUIRED",
    "verification_state": "NOT_VERIFIED"
  }]
}
```

This is a **synthetic QA probe of committed service behavior**, not a committed demo scenario, live HTTP verification, manufacturer fact, or modification to accepted Case B. It does not establish that the unchanged public Case B fails to block.

### Reproduction

Run from repository root; this reads the pack and changes only an in-memory object:

```powershell
@'
import json
from pathlib import Path
from app.domain.packaging import Scenario
from app.services.virgin_plastic import compare
s = json.loads(Path('data/evidence/public-packaging.json').read_text(encoding='utf-8'))['scenarios'][1]
s['candidate']['capabilities']['max_temperature_c']['value'] = 100.0
s['candidate']['capabilities']['microwave_safe']['value'] = True
for cap in s['candidate']['capabilities'].values():
    cap['provenance'].update(origin='ASSUMED', verification_state='NOT_VERIFIED',
        source_reference='qa:synthetic-in-memory', note='QA probe only; not manufacturer evidence')
r = compare(Scenario.model_validate(s))
print(r.model_dump_json(indent=2))
'@ | .\.venv\Scripts\python.exe -
```

**INFERENCE — judging risk:** The broad claim “unverified operational evidence cannot produce eligibility” is not established by the implementation. A presenter must not use that claim pending reconciliation. This does not equate operational eligibility with implementation approval.

**UNKNOWN / DECISION REQUIRED:** Is `ELIGIBLE` intentionally conditional on numerically satisfied assumptions, or should unverified requirements/capabilities force review? The audit cannot choose between changing the canonical wording and changing gate behavior. The existing successful-case tests make this an Integrator decision rather than a routine audit correction.

**RECOMMENDATION:** Vladimir should resolve STOP-01 with Igor and Alisa in a separate bounded contract. Acceptance evidence: explicit approved semantics for satisfied but unverified premises, aligned canon and truth-table tests, preserved calculation/eligibility/approval separation, and regression checks for original Cases A and B. No repair is made here.

## Authority and unfinished verification

The supplied QA-R1 contract lists all eight weights (25/15/15/10/10/10/10/5). The four canon documents were inspected. However, the original official AgriFood brief was not attached to this request or archived in the inspected canon; `challenge_canon.md` explicitly reports its original URL/date as UNKNOWN. Direct official-source verification remains unavailable; a canon restatement is not independent verification. *(Historical execution note: At the time of this interim STOP on 4f9c5fd, the official brief was not accessible to the auditor. It has since been directly accessed and reconciled via `AgriFood.txt` in Section 1.1 below.)*

The existing verification path `scripts/verify.ps1` was inspected but **not run**, because the confirmed canonical conflict triggers the explicit stop. Public HTTP health/scenarios/comparison checks, full test/build results, browser UX/mobile/error-retry verification, independent source-to-value checks and the completed eight-row judging matrix remain outstanding. No runtime or visual verification is inferred from source inspection.

The negative-case matrix, twelve judge questions, full claim audit and maximum-five next-work queue are also outstanding. Evidence-state totals across criteria are **not assigned**; this report must not be handed off as QA-R1 COMPLETE.

## Interim handoff to Vladimir

```text
QA-R1 HARD STOP — PROJECT BRAIN REVIEW REQUIRED
Audited base: 4f9c5fd3cae18769b72bb268638c8cacc358ad96
Artifact: docs/review/QA-R1-judging-readiness-audit.md
New canon conflict found: YES — STOP-01
Confirmed: unverified satisfied operational premises can yield ELIGIBLE.
Verification: direct service probe passed execution and reproduced the conflict.
Full verification and audit: incomplete; stopped under QA-R1 section 18.
Repository changes: only this interim report.
Commit / push / PR: none.
Required next decision: reconcile intended eligibility semantics before resuming QA-R1.
```

</details>

## 1. Current base, method and authority

On continuation, the checkout was on `fix/igr-r1f-epistemic-eligibility` at `77b360e3081d11aca3489b99fd27193a03afe1cd`, with only `?? docs/review/` untracked. The existing report was copied to `%TEMP%/QA-R1-before-continuation.md` before synchronization. After `git fetch origin`, the existing audit branch `alisa/qa-r1-judging-readiness-audit` was fast-forwarded to `d3b28c68330d89d251cc588002d550c0cca901b7`. The report was preserved and extended, not replaced. The inspected delta from the original base changes only the service, service tests and architecture document: commits `9ab83c2`, `77b360e`, merge `d3b28c6`. No newer `origin/main` was present at fetch.

Evidence hierarchy and limitations:

1. **OFFICIAL REQUIREMENT (`AgriFood.txt` — directly read Level 1 authority):** Directly verified from the official Deeptech Gigahack 2026 AgriFood challenge brief sponsored by Biomentorhub x Profi (`C:\Users\user\Downloads\Telegram Desktop\AgriFood.txt`). It establishes the official objective, number-one priority (virgin plastic reduction = total plastic minus recycled content), four permitted innovation areas (specifically including Digital & Data Solutions: packaging selection decision support and auditing/recommendation tools), nine design considerations, five hackathon deliverables, permitted use of public datasets/resources, the explicitly optional Hot Food counter packaging annex, and all eight judging criteria and weights (25/15/15/10/10/10/10/5 = 100%). The authority gap regarding the official brief is RESOLVED (see Section 1.1). Note: The separate oral mentor clarification transcript regarding confidential Profi data remains UNKNOWN/unavailable as an archived document, though its substance is respected under canon.
2. **TEAM DECISION (Level 2 canon):** HG-QA-R1-01 is supplied by the Human Integrator in the continuation request. The four canon documents, [evidence semantics](../evidence_semantics.md) and [architecture](../architecture.md) define accepted scope. Thermal/microwave eligibility is bounded; the optional Hot Food oven-temperature/six-hour questions are unsolved and are not equivalent to the 95°C demonstration assumption.
3. **FACT / OBSERVED IMPLEMENTATION (Level 3):** committed code, tests, public and illustrative JSON, frontend, startup scripts and CI were inspected. Evidence IDs below identify exact paths and functions. No parallel-agent conclusions were used.
4. **OBSERVED EXECUTION:** fresh project verification, independent in-memory service probes, real localhost HTTP and browser checks are explicitly distinguished below. Synthetic QA probes do not become new committed product scenarios.
5. **INFERENCE / RECOMMENDATION (Level 5):** judging assessments and proposed contracts. **UNKNOWN:** missing external/provider/user facts. **UNSUPPORTED CLAIM:** an assertion the inspected product/evidence does not establish. Matrix evidence states are not API enums, judge scores, probabilities or certification.

### 1.1 Official brief authority reconciliation

Direct examination of `AgriFood.txt` (`Deeptech Gigahack 2026`, sponsored by `Biomentorhub x Profi`, located at `C:\Users\user\Downloads\Telegram Desktop\AgriFood.txt`) provides Level 1 challenge authority. This resolves the previous authority gap where the official brief was known only through task contracts and challenge canon. The reconciliation establishes:

1. **Product direction — CONFIRMED IN SCOPE (YES):**
   The brief defines four open innovation areas and explicitly includes under *Digital & Data Solutions*: packaging traceability, waste monitoring, decision-support tools for packaging selection, lifecycle assessment, and "tools that audit existing packaging and recommend options with lower virgin plastic and higher recycled content." PackShift's positioning as an evidence-aware packaging transition decision-support tool is an explicitly permitted digital solution, not an off-target workaround.

2. **Virgin-plastic priority — CONFIRMED AS #1 PRIORITY (YES):**
   The brief explicitly states: *"The number one priority is reducing the amount of virgin plastic used in packaging. Virgin plastic is reported as total plastic minus recycled content, so solutions that increase recycled content, ideally as close to 100% as is technically safe and legally compliant, are of particular interest."* PackShift's core arithmetic (`virgin_plastic = mass × (1 - recycled_fraction)`) and focus on virgin-plastic reduction delta directly align with this stated priority.

3. **Judging criteria and weights — CONFIRMED EXACT MATCH (8/8, 100%):**
   The official brief specifies eight judging criteria with exact weights:
   - Environmental impact, with priority on virgin plastic reduction: 25%
   - Practicality within retail operations: 15%
   - Technical feasibility: 15%
   - Innovation: 10%
   - Business viability: 10%
   - Scalability: 10%
   - User experience: 10%
   - Quality of presentation: 5%
   These match the audit matrix in Section 3 without addition, omission, or re-weighting.

4. **Design considerations — CONFIRMED AS CRITICAL CONSTRAINTS (YES):**
   The brief lists nine design considerations: food safety and product quality, shelf life, logistics and supply chain compatibility, economic feasibility for large-scale implementation, consumer acceptance and ease of use, consumer education, sustainability regulations, recyclability (mono-material / Design for Recycling), and optimized material use. The existing audit correctly distinguishes *official relevance* from *demonstrated software capability*: PackShift evaluates bounded thermal/microwave compatibility but does not certify food safety, shelf life, migration, or logistics. Treating these unmodeled dimensions as REVIEW_REQUIRED and keeping them outside claimed approval is strictly consistent with the brief's framing.

5. **Deliverables — CONFIRMED ALIGNMENT (YES):**
   The brief requires five hackathon deliverables:
   - *A working prototype, concept, or proof of concept:* PackShift is an operational, locally verified software prototype.
   - *A clear explanation of the problem addressed:* PackShift addresses retail packaging transition risks (separating plastic arithmetic from operational suitability).
   - *The proposed solution and how it works:* Demonstrated via Case A (arithmetic reduction) and Case B (operational gating and refusal).
   - *Expected environmental, operational and business benefits:* Addressed as qualitative hackathon narratives; the audit correctly insists that expected business benefits must not be fabricated as precise ROI, payback, or unvalidated Profi annual savings without real commercial inputs.
   - *A roadmap for implementation and scalability:* Included as an explicit deliverable; the audit correctly treats a phased roadmap (multi-scenario selection → curated intake → eligibility ranking → retailer integration) as the appropriate deliverable rather than claiming large-scale throughput is already implemented.

6. **Hot Food annex — CONFIRMED OPTIONAL (YES):**
   The brief explicitly designates the hot food counter packaging scenario (Option A: bag; Option B: alternative box; up to 250°C oven / 180–190°C rotisserie; 6-hour holding) under: *"Example use case (optional): Hot food packaging for the counter. This use case is optional. Teams may address it or pursue any other direction within the areas of innovation."* PackShift is not penalized for not implementing high-temperature oven packaging. Furthermore, the demo Case B assumption (95°C + microwave reheating) is distinct from the Hot Food annex and must not be conflated with it.

7. **Permitted resources — CONFIRMED PUBLIC PERMISSION (YES):**
   The brief explicitly permits *"publicly available datasets, lifecycle assessment resources, packaging standards, scientific literature, sustainability reports, and any relevant technologies."* The use of public manufacturer datasheets (Coca-Cola HBC, Berry Global, Duni) is legitimate under challenge rules. However, challenge permission to consult public sources does not elevate public attribution to `PROVIDER` evidence or eliminate the need for source-to-value substantiation.

**Authority reconciliation verdict: NO MATERIAL CHANGE** to the audit's findings, evidence states (1 SUPPORTED, 7 PARTIAL), judging matrix, or claim boundaries. The official brief independently substantiates the challenge framing previously inherited through canon and contract instructions.

Denis's newer mock remains **WORK IN PROGRESS / NOT PART OF AUDITED PRODUCT**: the merged delta contains no frontend changes. Only the committed UI is assessed. No deck, rehearsal recording, production deployment or real-user research artifact was found in the tracked inventory; absence from this repository does not prove none exists elsewhere.

### Evidence index

| ID | Exact repository evidence | What it establishes / limit |
| --- | --- | --- |
| E1 | [service](../../backend/app/services/virgin_plastic.py): `virgin_plastic`, `compare`, `combine_verification` | Formula, null handling, independent eligibility aggregation and weakest-premise findings; no source retrieval or physical qualification |
| E2 | [domain](../../backend/app/domain/packaging.py): `Evidence`, `Scenario`, `Package`, `Provenance`; [Contract](../../backend/app/domain/_contract.py) | Strict finite typed values, provenance slots, distinct dataset labels, unique IDs, nonempty inventories; no authenticity or completeness proof |
| E3 | [runtime](../../backend/app/runtime/context.py): `load_runtime`; [API](../../backend/app/main.py): `create_app`, `health`, `scenarios`, `comparison` | Atomic startup snapshot, explicit pack selection, 200/404/503 behavior; no online supplier integration |
| E4 | [service tests](../../backend/tests/test_virgin_plastic.py) | Arithmetic, invalid/missing inputs, zero baseline/increase, gate truth tables, legacy fields ignored, null requirements; synthetic tests are not packaging certification |
| E5 | [API tests](../../backend/tests/test_api.py): `test_ready_and_comparisons`, `test_public_evidence_pack_api`, `test_missing_evidence`, `test_unreadable_evidence`, `test_corrupt_evidence`, `test_invalid_numeric_evidence_and_duplicate_ids`, `test_explicit_environment_path_never_falls_back` | Freshly executed route, pack identity, public-case and fail-closed assertions |
| E6 | [PUBLIC JSON](../../data/evidence/public-packaging.json): `cchbc-500ml-rpet-transition`, `deli-pp-to-rpet-transition`; [ILLUSTRATIVE JSON](../../data/evidence/demo-packaging.json): `illustrative-reduction`, `illustrative-incomplete` | Two scenarios per pack; exact values and provenance served by runtime |
| E7 | [NDR-01 ledger](../evidence/NDR-01-public-evidence-pack.md), Case A/B and S-01–S-06 | Recorded source attribution and excluded components; not independent source-to-value validation |
| E8 | [HomePage](../../frontend/src/pages/HomePage.tsx): `HomePage`, `PackageView`, `Input`; [client](../../frontend/src/api/client.ts); [styles](../../frontend/src/styles.css); [contracts](../../frontend/src/api/contracts.ts) | Selection, provenance text, status hierarchy, N/A, loading/errors/retry and responsive layout; TypeScript is a manual mirror, not payload validation |
| E9 | [PowerShell verification](../../scripts/verify.ps1), [POSIX verification](../../scripts/verify.sh), [CI](../../.github/workflows/ci.yml), [frontend package](../../frontend/package.json), [backend package](../../backend/pyproject.toml) | Reproducible local checks and configured CI; local success does not prove hosted CI/deployment or load capacity |
| E10 | [README](../../README.md), [product canon](../canon/product_canon.md), [decision policy](../canon/decision_policy.md), [open questions](../canon/open_questions.md) | Demo runbook, accepted thesis, current exclusions, mentor/user/provider unknowns; user hypothesis is not validation |
| V1–V5 | Section 8 of this report | Fresh verification, reconciliation probes, real PUBLIC HTTP, browser observations and fail-closed probe |

## 2. Original HARD STOP reconciliation

```text
QA-R1 FOUND CANON/RUNTIME CONFLICT
Original base: 4f9c5fd3cae18769b72bb268638c8cacc358ad96
Conflict: unverified compatible operational premises could produce ELIGIBLE.
Human decision: HG-QA-R1-01
Fix: IGR-R1F / PR #6
Merged main: d3b28c68330d89d251cc588002d550c0cca901b7
Reconciliation status: VERIFIED RESOLVED
```

**Current decision:** `ELIGIBLE` requires VERIFIED, compatible premises for all evaluated decision-critical dimensions. Present unavailable inputs require review. Explicit incompatibility still blocks the stated scenario even where its operating requirement is assumed; the finding must retain that assumption boundary. Calculation, eligibility and implementation approval remain different axes. `ELIGIBLE` does not establish that every real-world operational dimension was modeled.

| Gate | Independent fresh observation | Committed regression evidence in E4/E5 | Result |
| --- | --- | --- | --- |
| R1 — compatible unverified | For each of thermal/microwave, independently weaken either requirement or capability to NOT_VERIFIED, INDICATIVE or INSUFFICIENT_DATA; each returns REVIEW_REQUIRED | `test_operational_section8_truth_table`, `test_operational_microwave_truth_table`, `test_operational_case5_requirements_satisfied`; extra states also covered by V2 probes | PASS |
| R2 — compatible SOURCE_AVAILABLE | Either essential premise at SOURCE_AVAILABLE returns REVIEW_REQUIRED; never upgraded to VERIFIED | Same truth tables; `test_operational_source_available_compatible_yields_review_required` | PASS |
| R3 — VERIFIED positive | Both dimensions compatible and both premises marked VERIFIED return ELIGIBLE; generic suitability advisory remains | `test_operational_verified_compatible_emits_eligible` and truth tables | PASS, synthetic scoped labels only |
| R4 — present null requirement | Thermal null plus verified microwave, and microwave null plus verified thermal, each returns REVIEW_REQUIRED | `test_operational_null_requirement_temperature_with_verified_microwave`; `test_operational_verified_temperature_with_null_requirement_microwave` | PASS |
| R5 — no requirements | Removing requirements returns REVIEW_REQUIRED; committed Case A does the same through HTTP/UI | `test_operational_no_silent_inference_from_current`; `test_public_evidence_pack_api` | PASS |
| R6 — original public Case B | CALCULATED / INDICATIVE and BLOCKED coexist; reasons say assumed 95°C and assumed microwave requirement; finding states NOT_VERIFIED | `test_public_evidence_pack_api`; thermal/microwave incompatibility service tests | PASS, HTTP/UI observed |
| R7 — independent axes | Null candidate recycled fraction with verified compatible operational inputs gives INSUFFICIENT_DATA + ELIGIBLE. Bundled incomplete fixture gives INSUFFICIENT_DATA + REVIEW_REQUIRED | `test_operational_verified_compatible_with_insufficient_data_emits_eligible`; `test_unknown_never_zero_or_partial_sum`; `test_ready_and_comparisons` | PASS |

V2 ran 22 independent assertions: 16 weakened-premise combinations, one positive case, two null-input cases, absent requirements, unchanged Case B and calculation independence. No committed evidence or tests were changed. The pre-merge “58 tests passed” statement from the request is historical PR evidence; V1 independently obtained 58 passes on the reconciled base.

## 3. Judging Gap / Evidence Matrix

States assess the bounded claim in each row, not an anticipated judge score. A criterion can be PARTIAL while specific mechanisms are well supported and stronger claims remain unsupported. A1–A5 are the five proposed actions in section 7.

| Criterion | Weight | What judges need to believe | Current evidence | Demo-visible evidence | Evidence state | Main weakness | Claim risk | Recommended action | Priority | Work class | Suggested owner | Dependencies | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Environmental impact, with priority on virgin plastic reduction | 25% | Explicit masses/recycled fractions support an honest current-to-candidate per-unit virgin-plastic delta | E1 `virgin_plastic`; E4 `test_multi_component_and_delta`, `test_unknown_never_zero_or_partial_sum`; E6 Case A/B; E7 scope ledger; V3 | A: 22→2.5 g/unit, 19.5 g / 88.636%; B: 14.8→2.4, 12.4 g / 83.784%, blocked; missing fixture refuses delta | PARTIAL | Input attribution not independently substantiated; A excludes label/adhesive; B body-only baseline vs hinged gross candidate | “88.64% verified complete-package or annual Profi saving”; recycled content is not LCA/recycling outcome | A1 trace each headline input to exact source location and retain unknown exclusions; A2 show scope beside numbers | P1 | CORE | Nicolae + Alisa; Denis for A2 | Original source artifacts; curator/Integrator review | Value-by-value evidence mapping, no unsupported VERIFIED upgrade, visible scope and successful A/B replay |
| Practicality within retail operations | 15% | Tool distinguishes attractive plastic arithmetic from suitability for a stated use context | E1 thermal/microwave branches; E4 truth tables; E6 explicit ASSUMED requirements; E10 open questions; V2–V4 | Case B refuses 95°C + microwave use; A asks for review; requirements/capability nulls refuse positive eligibility in QA | PARTIAL | No line, sealing, logistics, procurement, handling, shelf-life or real Profi workflow evidence; only two modeled dimensions | “Retail-ready/drop-in/food-safe/approved” or implying 95°C is a Profi requirement or optional annex solution | A4 validate owner and review step; A2 explain bounded gate and source of requirements | P1 | CORE | Alisa + Vladimir; Denis for visibility | Nonconfidential stakeholder access; no invented proprietary inputs | Recorded owner/workflow feedback or explicit unanswered question; a scoped pilot checklist with QA/procurement sign-off still external |
| Technical feasibility | 15% | PackShift software can reproducibly load evidence, calculate and serve a safe bounded comparison | E1–E5; E8 typed client; E9 scripts/CI; V1 58 passes + build, V3 HTTP, V4 browser/retry, V5 fail closed | Working local end-to-end A/B, missing-data N/A, service error and recovery | SUPPORTED | Prototype software proven locally; hosted CI result, clean-machine rehearsal and physical packaging transition not established | “Production deployed”, “physical transition validated”, “all data truth checked”, “security/load tested” | A3 repeat the demo on presentation machine, record startup/recovery and pack preflight | P2 | AMPLIFIER | Igor + Alisa; Vladimir integrates | Chosen presentation machine and versions; reviewed evidence pack | Named-machine run of verification plus HTTP/UI preflight and recovery; preserve lockfiles |
| Innovation | 10% | Evidence/eligibility separation changes the decision compared with a bare savings calculation | E1 independent axes and provenance-capped findings; E4 gate regressions; E8 block hierarchy; V2–V4 | An 83.784% theoretical reduction is visibly blocked; unknown inputs produce no fabricated saving | PARTIAL | Working differentiation is demonstrated; novelty vs spreadsheets/existing tools and user value not benchmarked | “AI-powered”, “unique/first”, “automatically recommends best candidate”; no LLM or ranking exists | A3 tell the failed-transition story; A4 ask a target reviewer whether this distinction changes their decision | P2 | AMPLIFIER | Vladimir + Alisa | Case B boundary and sources; willing reviewer | Rehearsed comparison with a simple delta-only decision plus attributable reviewer feedback, no novelty superlative |
| Business viability | 10% | A packaging/QA/procurement reviewer could use the evidence to screen transitions and request missing proof | E10 product user hypothesis and open Q3; E8 comparison/review display; E3 read-only local architecture | Qualitative walkthrough: compare → identify incompatibility/unknown → take evidence to human review; no measured saving | PARTIAL | Exact owner, adoption, willingness to pay, costs, volumes, supplier terms and avoided-loss value UNKNOWN | ROI, payback, annual cost saving, validated demand or Profi adoption | A4 validate one workflow and qualitative value hypothesis; explicitly defer numeric business case until inputs exist | P1 | EXPERIMENT | Alisa + Vladimir | Nonconfidential interview; no confidential dataset expected | Attributable answer on user/step/usefulness and unresolved commercial inputs; no invented metrics |
| Scalability | 10% | There is a credible route from individual comparison to curated scenarios and later a portfolio workflow | E2 `Evidence.scenarios`; E3 startup snapshot + linear scenario lookup; E6 two per pack; E9 local toolchain; E10 absent-feature list | Select multiple curated scenarios now; explain a staged roadmap as a proposal | PARTIAL | Manual curation/restart, full evidence returned by scenarios route, no ingestion/supplier integration/ranking/workflow validation or measured throughput | “Retailer-scale demonstrated”, “automatic portfolio optimization”, “integrates with Profi” | A5 rehearse one additional curated scenario intake outside demo data and document the human bottleneck; defer platform build | P2 | EXPERIMENT | Nicolae + Igor; Vladimir | Reviewed schema and curation checklist from A1 | One attributable intake exercise, steps/time/unknowns recorded, roadmap gates explicit; no throughput claim |
| User experience | 10% | A viewer can distinguish benefit, eligibility, evidence identity and next review need without misreading approval | E8 `HomePage`, `PackageView`, `Input`, styles/client; V4 browser A/B/missing/error/retry, desktop and 390px Case B | Badge before numbers; block reasons; PUBLIC/ILLUSTRATIVE disclosure; input provenance; N/A and Retry | PARTIAL | Dense enums/repeated URLs; scope away from headline; structured requirement/capability provenance not presented as a comparison; mobile scenario label clipped; no user comprehension study | “Intuitive/validated”, “fully mobile accessible”, “all provenance immediately visible”; legacy fields are not gate inputs | A2 add nearby scope and bounded-status explanation, readable source links and requirement/capability context using current API; give Denis these acceptance checks | P1 | CORE | Denis + Alisa | Existing design work merged separately; stable current contract; A1 evidence decisions | A/B/incomplete/error states reviewed at desktop/390px; correct scope visible with result; novice can explain why B is blocked; no schema change |
| Quality of presentation | 5% | Team can explain problem → comparison → guarded decision, with defensible numbers, recovery and roadmap | E10 README demo sequence; E7 ledger; E8 existing UI; V3/V4 replay | Stable A then B; optional illustrative refusal; public disclosure and assumed-context reasons visibly present | PARTIAL | No committed final deck/timed rehearsal; default is illustrative; PackShift canon vs GigaFood UI/API; weak primary-source evidence for cross-examination | Treating proposed slides/rehearsal as finished; demo public pack as default; “100% saving” | A3 produce/rehearse exact script and preflight; include naming consistency within existing UI work, not a redesign | P1 | AMPLIFIER | Vladimir + shared; Alisa QA | A1 qualifiers; A2 where available; presentation timing | Timed replay with pack identity checked, question answers/source fallback, recovery, scoped roadmap and consistent spoken/product name |

**Evidence-state summary (8 criterion rows):** SUPPORTED **1** (technical feasibility of prototype software); PARTIAL **7** (environment, practicality, innovation, business, scalability, UX, presentation); UNSUPPORTED **0** whole rows; UNKNOWN **0** whole rows. This does not imply all subclaims have evidence: validated business viability, novelty leadership and large-scale operation are unsupported; actual Profi commercial/operational inputs are unknown. No weighted readiness score is invented.

### Case A / Case B: strongest defensible interpretation

**Case A — FACT from committed inputs and runtime:** body 19.5 g and virgin closure 2.5 g; baseline fractions 0/0, candidate 1/0. Arithmetic is `22 − 2.5 = 19.5 g/unit`, `19.5 / 22 × 100 = 88.63636…%`. Recycled content eliminates virgin plastic in the represented body, not the closure. The same mass for baseline/candidate body means this example demonstrates recycled-content effect, not lightweighting. Requirements are unmodeled, so eligibility is REVIEW_REQUIRED. The excluded label/adhesives are not independently quantified here. It proves software arithmetic over listed inputs, not actual Profi inventory, source accuracy, a complete package or a usable approved transition.

**Case B — FACT from committed inputs and runtime:** `14.8 × (1 − 0) = 14.8`; `12 × (1 − 0.8) ≈ 2.4`; delta ≈12.4 g/unit / 83.78378…%. The baseline is represented body only, candidate is represented hinged gross weight; 360ml vs 375ml also does not establish functional equivalence. Missing baseline lid mass is not represented as a null component, so the calculator cannot detect that omission. The bounded gate blocks candidate 70°C/no microwave against the explicitly assumed 95°C/microwave context. It does not evaluate duration, migration, grease, barrier, line speed, logistics, procurement or six-hour shelf life. It proves that favorable arithmetic can coexist with refusal for the specified context; it does not establish a general rPET verdict or an implementable saving.

**Practicality story — INFERENCE:** “screen out a candidate inconsistent with stated conditions, expose unknowns, then obtain human qualification” is credible and demonstrable. “This solves Profi operations” is unsupported. **Business story — INFERENCE:** making the evidence and missing review work explicit may reduce poorly grounded decisions; no avoided incident, time saving, cost saving or adoption has been measured. Local read-only software uses no LLM calls or database in current code, but zero operating cost does not follow: evidence curation, review, hosting/support and maintenance costs remain unmeasured.

### Additional adversarial findings and deliberate boundaries

| ID | Observation and evidence | Consequence / disposition |
| --- | --- | --- |
| G1 — source-to-value gap | E6/E7 attribute 19.5/2.5/14.8/12.0 g, fractions and use envelopes to manufacturer pages. Fresh web opens of the three exact primary URLs failed with “not accessible via this tool”; no source page was read independently | UNKNOWN source validity/retrievability, not FALSE. A1 is P1; upgrading these to “verified specifications” is a P0 claim blocker. Do not repeat ledger language such as “certified facts”, immediate material collapse or legal approval as independently established facts |
| G2 — omitted components | In-memory schema-valid A candidate with closure removed returned CALCULATED, 100% reduction, REVIEW_REQUIRED. E2 enforces nonempty list, not inventory completeness | QA-only demonstration of known curation boundary, not a new formula defect. A1 review inventory; A2 place represented-component qualifier next to numbers. Accepted original case remains unchanged |
| G3 — dataset and verification labels | In-memory copy of E6 manually relabelled PROVIDER was accepted by `Evidence.model_validate`, despite unchanged public disclosure. No code automatically changes PUBLIC into PROVIDER. VERIFIED is also a supplied provenance label, not an external validation service | Honest committed identity is supported; tamper-proof origin/authenticity is not. E10/evidence semantics already require curator/Integrator review, so record a claim/process gap and continue; do not redefine schema. No supplier/authentication feature is promised |
| G4 — wording/provenance display | E8 prints `use_context` verbatim, including Case B “food-contact approved under Regulation (EU) 10/2011”, alongside explicit non-approval warnings. It renders legacy top-level thermal/microwave fields if provided, while backend ignores those for decisions; structured capabilities and requirement provenance are not fully shown as inputs | Wording/UX risk, not evidence of current API wrongly granting approval. A2 should explain source-attributed text and show decision-driving fields; do not claim those prose statements are verified or legacy fields drive the gate. No protected contract change required for audit |
| G5 — scope prominence | A's label/adhesive exclusion appears in docs, not beside UI result; B's missing lid note is deep in current mass provenance. Headline totals say “virgin plastic” | A2: make scope prominent without inventing missing masses. Rounding to 88.636/83.784 in UI is display precision, not greater evidence confidence |
| G6 — default and naming | `DEFAULT_EVIDENCE` is illustrative; public needs environment override and restart. UI/browser/API still say GigaFood, canon says PackShift. NDR-01 introduction says “replacing” fixtures, but both packs and actual default remain | A3 preflight chooses PUBLIC explicitly and explains naming until aligned. Ledger introductory wording is not runtime evidence; do not credit unseen Denis mock |
| G7 — scale/trust boundary | Entire curated evidence snapshot served by scenarios route; scenario lookup is linear; evidence loaded once; TypeScript fetch only casts response; no DB/import pipeline or source validator | Current small reviewed pack is reasonable for prototype. A5 bounds roadmap; do not promise automatic ingestion, malicious-data defense, throughput or enterprise readiness. No broad architecture change recommended |

These are evidence, curation, wording and UX limitations already compatible with the accepted bounded product. None was silently repaired or treated as a new protected-contract decision. `SOURCE_AVAILABLE ≠ VERIFIED`, `NOT_VERIFIED ≠ FALSE`, `missing ≠ 0`, `PUBLIC ≠ PROVIDER`, `ILLUSTRATIVE ≠ PUBLIC` and `CALCULATED ≠ VERIFIED` remain intact.

## 4. Negative / Adversarial Demo Cases

“YES” means a committed scenario can be selected in the appropriate pack and was observed. “NO” means no selectable committed scenario or promised defense exists. “RISKY” means a restart, deliberate outage or QA fixture is required. QA-only is not a promise to show it live. SUPPORTED refers to the observed safe behavior at its stated scope, not safety of a real package.

| Case ID | Failure/adversarial condition | Expected safe behavior | Current evidence | Live-demo reproducible? | Classification | Why judges should care | Failure if broken | Evidence state |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NEG-01 | Missing candidate recycled fraction | INSUFFICIENT_DATA; current 15 g remains; candidate and delta N/A; REVIEW_REQUIRED, no fabricated block | E6 `illustrative-incomplete`; E4 `test_unknown_never_zero_or_partial_sum`; E5 `test_ready_and_comparisons`; V4 UI | YES, with illustrative pack preselected | DEMO-SAFE | Refuses false precision | Unknown converted to zero or partial package total | SUPPORTED |
| NEG-02 | Attractive saving but wrong thermal/microwave context | CALCULATED / INDICATIVE + BLOCKED, reasons explicitly assumed context | E6 Case B; E5 `test_public_evidence_pack_api`; V3/V4 | YES, PUBLIC pack | DEMO-SAFE | Prevents savings alone from implying usability | Incompatible candidate presented as approved | SUPPORTED |
| NEG-03 | Compatible values with unverified essential premise, including SOURCE_AVAILABLE | REVIEW_REQUIRED, never positive eligibility | E4 thermal/microwave truth tables; V2 16 combinations, including NOT_VERIFIED/INDICATIVE/INSUFFICIENT_DATA | NO selectable committed scenario; reproducible in QA | QA-ONLY | Corrected epistemic defect has regression evidence | Old false ELIGIBLE returns | SUPPORTED |
| NEG-04 | Present thermal or microwave requirement with null value, other dimension verified | REVIEW_REQUIRED, missing dimension retained in aggregation | E4 two named null tests; V2 | NO selectable committed scenario | QA-ONLY | Unknown condition cannot disappear behind a passing one | False positive eligibility | SUPPORTED |
| NEG-05 | No modeled operational requirements | REVIEW_REQUIRED without inferring them from current package | E6 Case A; E4 `test_operational_no_silent_inference_from_current`; V3/V4 | YES, PUBLIC pack | DEMO-SAFE | Honest unresolved suitability | Silence interpreted as approval | SUPPORTED |
| NEG-06 | Fully VERIFIED compatible bounded positive control | ELIGIBLE for evaluated dimensions; advisory remains NOT_VERIFIED; not approval | E4 `test_operational_verified_compatible_emits_eligible`; V2 | NO committed real verified package case | QA-ONLY | Positive path exists without manufacturing a supplier claim | Inability to qualify bounded case, or false general approval | SUPPORTED for synthetic control only |
| NEG-07 | Missing/unreadable/invalid configured evidence file | Health/scenarios/comparison 503, no silent fallback | E3 loader; E5 missing/unreadable/corrupt/invalid/environment tests; V5 absent-file TestClient | RISKY, startup override/restart required | QA-ONLY | Broken evidence cannot masquerade as ready data | Silent fallback or partial corrupt dataset | SUPPORTED |
| NEG-08 | Backend unavailable, then restored | Service error; Retry reloads evidence and result | E8 client/HomePage; V4 stopped audit-owned backend, reload showed HTTP 500 via Vite, restart+Retry restored PUBLIC A | RISKY, disrupts live demo | QA-ONLY | Recoverable presentation and honest service state | Stale result presented as fresh, unrecoverable UI | SUPPORTED for exercised reload/retry path |
| NEG-09 | Public data claimed as provider data | Preserve PUBLIC label/disclosure; do not promote origin based on calculation | E2/E3/E6, E5 public pack test, V3/V4. Manual relabel probe G3 is accepted; there is no authenticity detector | YES for disclosure; NO for automatic tamper rejection | DEMO-SAFE for disclosure only | Separates public examples from confidential client data | Invented Profi provenance | PARTIAL: identity retained, manual falsification not detected |
| NEG-10 | Component omitted entirely rather than value null | Only represented total is defensible; curator must detect omission | E2/E7; V2 supplemental G2 probe returns 100% after deleting candidate closure in memory | NO automatic completeness refusal | NOT-CURRENTLY-DEMONSTRABLE | Schema validity is not a full BOM audit | Incomplete inventory sold as 100% package reduction | UNSUPPORTED for automated completeness defense |
| NEG-11 | Environmental input missing but operational premises independently verified | INSUFFICIENT_DATA + ELIGIBLE, never fabricated operational BLOCKED | E4 `test_operational_verified_compatible_with_insufficient_data_emits_eligible`; V2 R7 | NO selectable committed scenario | QA-ONLY | Keeps separate questions separate | Missing mass treated as physical incompatibility | SUPPORTED |
| NEG-12 | Zero current virgin total or increased candidate virgin mass | Percentage N/A for zero baseline; negative reduction retained | E4 `test_zero_baseline_and_increase`; E8 corresponding explanatory text; V1 tests | NO selectable committed scenario; UI branch not exercised | QA-ONLY | No divide-by-zero or hidden worsening | Misleading improvement or invalid percentage | SUPPORTED at service/test level |

**Recommended live negative:** NEG-02, immediately after Case A, with no pack switch. NEG-01 is a useful secondary demo if the illustrative restart is prepared in advance. Keep NEG-03/04/06 as QA evidence; do not relabel synthetic fixtures as real verified packaging. Backend outage is rehearsable but optional during judging.

## 5. Skeptical judge questions

| # / Question | Current defensible answer | Evidence supporting answer | What remains UNKNOWN | Forbidden overclaim |
| --- | --- | --- | --- | --- |
| 1. Are these really Profi packages? | No. They are public-source-attributed examples, explicitly not Profi provider data | E6 disclosure, V3/V4, E10 | Actual Profi inventory, masses, owners | “This is Profi's packaging baseline” |
| 2. Where did each number come from? | Committed provenance attributes it to manufacturer documentation; ledger lists sources. This audit verified arithmetic, not primary-source correctness | E6/E7; web retrieval limitation G1 | Exact independently checked source passages and continued availability | “Every input was independently verified” |
| 3. Why trust 88.64%? | Given listed inputs: 22→2.5 g, delta 19.5/22. That percentage is reproducible and indicative | E1/E4, V3/V4 | Real-world input correctness and omitted components | “Verified whole-package 88.64% saving” |
| 4. Is a 100% rPET body a zero-virgin package? | No: the represented candidate retains a 2.5 g virgin closure; exclusions remain outside calculation | E6 Case A; E7 limitations | Full decoration/adhesive inventory | “Zero virgin plastic in complete bottle” |
| 5. What happens when evidence is missing? | A null mass/fraction prevents that package total and delta. Missing requirements/capabilities require review. Omitted components require curation | E4/E5, V2/V4, G2 | Whether an external supplier BOM is complete | “We automatically detect every missing component” |
| 6. Why block a candidate with 83.78% reduction? | Recorded 70°C/no-microwave capability conflicts with stated demo 95°C/microwave conditions; arithmetic and usability are different | E6 B, V3/V4 | Real Profi use envelope and independently verified datasheet facts | “It is universally unsafe” or “Profi requires 95°C” |
| 7. Does ELIGIBLE guarantee food safety? | No. It means VERIFIED compatible premises for evaluated bounded dimensions; generic suitability remains unverified | HG-QA-R1-01, E1/E4 V2 positive control | Migration, food matrix, seal/barrier, shelf life and regulatory qualification | “Certified/approved/safe to implement” |
| 8. Is SOURCE_AVAILABLE sufficient for eligibility? | No; compatible SOURCE_AVAILABLE premises require REVIEW_REQUIRED | V2 R2; E4 truth tables | Independent scoped verification of each premise | “A URL equals verification” |
| 9. How is this different from a spreadsheet? | A spreadsheet could implement it; this prototype makes provenance, independent eligibility, refusal states and shared API explicit. B demonstrates the behavior | E1–E8, V3/V4 | Comparative user benefit and market novelty | “Unique/first AI recommendation engine” |
| 10. What stops a bad candidate ranking first? | There is no ranking. This comparison blocks incompatible candidates; future ranking is required by policy to respect evidence/eligibility | E10 decision policy; E1/E3 | Ranking methodology and validation | “Portfolio optimizer already chooses the best option” |
| 11. Where is the business case? | Qualitative hypothesis: help a packaging reviewer identify missing proof and unsuitable transitions before requesting qualification | E10 user hypothesis; E8 behavior | Adoption, avoided losses, effort saved, prices, volumes, willingness to pay | ROI, payback or validated cost savings |
| 12. What proves retail scale? | Only multiple curated scenarios are demonstrated. Stateless calculation can plausibly extend, but intake/curation and workflow are unproven | E2/E3/E6, G7 | Throughput, portfolio size, integration and curation cost | “Retailer-scale proven” |
| 13. How would Profi integrate this? | A proposed entry point is packaging/QA/procurement review; exact owner and process must be validated | E10 Q3; section 7 A4 | Actual workflow owner, systems and approval steps | “Already integrated/adopted by Profi” |
| 14. What is needed before a real packaging change? | Complete comparable BOM, scoped evidence verification, actual use requirements, physical/food-contact qualification, line/logistics trial and commercial/human approval | E7 unknowns; E10 policy/questions | Provider values, trial outcomes, applicable jurisdiction and approvals | “ELIGIBLE completes procurement or legal approval” |
| 15. How much annual plastic or CO2 will Profi save? | This product calculates per-unit virgin plastic over represented components; no annual volume or LCA/CO2 engine exists | E1/E2/E10 | Volumes, complete baseline, lifecycle inventories/end-of-life | Annual Profi impact or complete LCA |
| 16. What if the demo starts with the wrong data or loses service? | Check PUBLIC and not-Profi disclosure before presenting. Default is illustrative. Outage+reload showed an error, restart+Retry recovered | E3/E8/E10, V4 | Presentation-machine rehearsal and network/venue conditions | “Public is the default” or “production reliability proven” |

## 6. Claim safety

### SAFE TO SAY NOW

- The committed local prototype calculates virgin plastic as the sum of listed component masses multiplied by one minus recycled fraction, and compares current/candidate totals.
- Missing numerical inputs produce unavailable totals/deltas rather than invented zero; operational evaluation is a separate axis.
- The reconciled gate refuses positive eligibility when an evaluated essential premise is not VERIFIED. Explicit incompatibility blocks the stated context; that is not a general safety verdict.
- The public pack retains its PUBLIC identity and not-Profi disclosure. The default pack is ILLUSTRATIVE. There is no automatic promotion to provider evidence or verification.
- Fresh local checks passed 58 backend tests and the frontend build; public routes, selected UI flows and error recovery worked in this audit. CI is configured, but its hosted run was not independently inspected.

### SAFE ONLY WITH QUALIFIER

- “Case A calculates about **88.64% per-unit reduction over represented components, from public-source-attributed inputs, INDICATIVE**; it excludes label/adhesives and remains REVIEW_REQUIRED.”
- “Case B calculates about **83.78% theoretical reduction over asymmetrically represented components** and is **BLOCKED for explicitly assumed 95°C/microwave conditions**; the baseline lid is unknown/excluded.”
- “ELIGIBLE means **VERIFIED compatible premises for evaluated bounded dimensions**, not proof of all real operational conditions or implementation approval.” No bundled public scenario currently demonstrates a real verified positive case.
- “This could support packaging/QA/procurement review” is a **user/value hypothesis**, not an observed Profi workflow or paid demand.
- “The architecture can plausibly extend to more curated scenarios” is an **inference/roadmap**; only two scenarios per pack are currently demonstrated.
- “Evidence-aware decision support” describes visible provenance and rules over curated labels; it does not imply source authenticity checking, full inventory detection, AI reasoning or optimal recommendation.

### DO NOT CLAIM

- Actual Profi packaging inventory, savings, supplier composition, annual volume/impact, ROI, payback, operating cost savings, willingness to pay or adoption.
- Verified complete-package reduction, like-for-like qualification of Case B, “100% plastic saving”, complete LCA/CO2 benefit, actual collection/recycling outcomes.
- Guaranteed food safety, shelf-life approval, legal certification, regulatory compliance, supplier approval, procurement approval or implementation approval.
- Universal compatibility, comprehensive packaging qualification, Hot Food annex solved, or all real operational dimensions evaluated.
- Production deployment, measured retailer-scale throughput, automated supplier ingestion, portfolio ranking, AI/LLM runtime or competitor-leading novelty.
- Tamper-proof PROVIDER/VERIFIED labels, independently verified primary sources, or “not verified means false.”

The NDR ledger's stronger material/regulatory wording and UI use-context prose are attributed statements, not fresh legal/food-safety findings by this audit. No external qualification decision is made here.

## 7. Recommended next-work queue — maximum five

Ranking is a qualitative judgement of judging impact, visible demo benefit, remaining time and integration risk. Weights below identify affected official criteria, not additive score gains. No P0 software/demo blocker was observed in the tested path; unsupported approval/Profi/verified-source claims are P0 **claim blockers** if used. Most work is P1/P2; avoid turning every gap into an emergency.

| Action | Why now / criteria and official weights affected | Impact | Effort | Risk | Suggested owner | Dependencies | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **A1 — P1 CORE: source-to-value substantiation of PUBLIC packaging inputs** | Strongest numbers face immediate cross-examination; environment 25%, practicality 15%, presentation 5% | High: separates defensible inputs from attribution-only assertions | Medium, bounded to A/B headline inputs and operating limits; time-box retrieval | Source unavailable or inconsistent; escalate a real accepted-semantics contradiction, do not repair data silently | Nicolae + Alisa; Vladimir approves boundary decisions | Exact manufacturer artifacts/pages; no confidential Profi data expected (official challenge brief authority already resolved) | Each headline value/fraction/operating limit (19.5g body, 2.5g closure, 14.8g Berry PP, 12.0g Duni rPET 80%, 70°C/microwave limits) mapped to exact source document section/page or explicitly unresolved; component inclusion/exclusion boundaries verified; source artifacts retrievable during rehearsal; verification labels upgraded only with scoped proof/review |
| **A2 — P1 CORE: make result scope and gate evidence immediately readable** | Correct backend distinctions can still be misunderstood; UX 10%, environment 25%, practicality 15%, presentation 5% | High, directly visible | Small/medium within Denis's existing layout, no redesign or shared-schema change | Integration drift from WIP; accidental approval wording | Denis + Alisa | Current API and HG-QA-R1-01; A1 source boundary; merge/review of UI work separately | Beside metrics: per-unit/represented-component scope; visible B asymmetry and demo assumption; status explanation and decision-driving requirement/capability provenance; readable source links; A/B/incomplete/retry replay at desktop/390px; consistent product label |
| **A3 — P1 AMPLIFIER: presentation-machine preflight and timed story/recovery rehearsal** | Stable code alone is not a stable presentation; presentation 5%, technical 15%, innovation 10% | High; turns implemented behavior into judge-visible evidence | Small | Wrong pack, process restart or unqualified spoken claim | Vladimir + Igor + Alisa; shared speakers | Reviewed A1 qualifiers; available presentation machine; latest approved UI | Verification and explicit PUBLIC health/scenario checks on that machine; timed A→B story and optional separately prepared missing-data case; script distinguishes 88.64 from 100%, why B blocks, public vs provider, and roadmap; tested error/retry plus fallback screenshots labelled with audited SHA |
| **A4 — P1 EXPERIMENT: validate one nonconfidential reviewer workflow** | Business/practicality remain hypotheses; business 10%, practicality 15%, UX 10%, innovation 10% | High if access exists; useful even as a recorded unanswered question | Small, one short stakeholder interaction | Access/time; confusing mentor opinion with adoption or paid demand | Alisa + Vladimir | Willing mentor/retail-domain reviewer; Q1/Q3 in open questions; do not request unavailable confidential dataset | Record role, date, evidence standard answer, initiation/review step and whether the B refusal is useful; if unavailable, retain UNKNOWN and proposed pilot. No fabricated ROI, volumes or supplier terms |
| **A5 — P2 EXPERIMENT: evidence-intake rehearsal and gated scale roadmap** | Scaling bottleneck is curation before software volume; scalability 10%, technical 15%, business 10% | Medium | Small/medium, one bounded exercise | Extra scenario consumes source-validation time; defer if A1–A3 incomplete | Nicolae + Igor; Vladimir | A1 curation checklist; stable schema; separate QA workspace/fixture authorization for any future artifact | Demonstrate one additional candidate intake in QA, record actual steps/effort and missing inputs; roadmap distinguishes current multi-scenario selection, reviewed portfolio intake, future eligibility-aware ranking, then retailer integration; no large-scale claim |

**DO NOT BUILD NOW:** AI chat/LLM wrapper (LOW-VALUE/P3 for these gaps); broad portfolio optimizer before evidence/eligibility methodology; supplier scraping/ingestion platform; database/accounts/deployment overhaul; annual-impact/ROI dashboard without volumes/prices; LCA/CO2 engine; comprehensive legal/food-safety certification; full visual redesign unrelated to A2; expanding optional Hot Food scope before temperature/time questions are answered. Defer each under a separate future contract. None is needed to close the present audit.

## 8. Fresh verification record

All results below were obtained on `d3b28c68330d89d251cc588002d550c0cca901b7` during this continuation. Verification did not modify tracked application/dependency files.

| ID | Command / procedure | Actual result | Scope limit |
| --- | --- | --- | --- |
| V1 | `.\scripts\verify.ps1` | Exit 0. Python 3.11.9 / pytest 9.1.1: **58 passed in 1.64s**, one Starlette TestClient deprecation warning about httpx. `npm ci`: 21 packages added, audit 22 packages, 0 reported vulnerabilities. `npm run build`: TypeScript + Vite 6.4.3 success, 30 modules, build 2.16s. Included `git diff --check` clean | Fresh local result, not copied PR result; npm audit output is not a comprehensive security audit. No dependency or lockfile repair performed |
| V2 | In-memory Python probes using `Scenario.model_validate` then `compare`, as described in section 2 | **22/22 reconciliation assertions passed**. Supplemental curation probes: manually relabelled PUBLIC→PROVIDER accepted by schema; omitted A candidate closure yielded CALCULATED / 100% / REVIEW_REQUIRED | Synthetic direct-service execution, not real supplier verification or selectable UI scenarios; no fixture files written |
| V3 | From root: `$env:GIGAFOOD_EVIDENCE_PATH = 'data/evidence/public-packaging.json'`; `.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000`; HTTP GETs via Python `urllib.request` | `/api/v1/health`: 200 READY/PUBLIC; `/api/v1/scenarios`: 200 PUBLIC, both expected IDs; A comparison: 200 CALCULATED/INDICATIVE/REVIEW_REQUIRED, 22/2.5/19.5/88.63636363636364; B comparison: 200 CALCULATED/INDICATIVE/BLOCKED, 14.8/2.3999999999999995/12.400000000000002/83.78378378378379 | Real localhost HTTP. Floating-point tails are display-rounded; not evidence uncertainty estimates. No production hosting tested |
| V4 | `npm run dev -- --port 5173 --strictPort`; in-app browser at `http://127.0.0.1:5173`; select A/B; inspect default desktop screenshot and Case B at 390×844; stop audit backend, reload, restart PUBLIC and click Retry; restart with explicit illustrative pack, reload/select incomplete | A/B states and metrics rendered correctly. B block precedes dimmed theoretical metrics and gives assumed-context reasons. At 390px, content wraps and numbers remain readable after scrolling; selected scenario label is clipped. Outage reload shows `Service / evidence unavailable`, `Error: HTTP 500: Service unavailable` (Vite proxy); Retry after restart restores PUBLIC A. Illustrative load exposes service-check loading text, then 15→8/7/46.667%; incomplete shows current 15, candidate/delta N/A, missing-field path, INSUFFICIENT_DATA + REVIEW_REQUIRED | Browser-tested paths only; no claim of automated frontend test suite, all-device/accessibility certification, slow-network race testing or positive ELIGIBLE UI verification. Viewport reset, temporary tab closed and all audit-owned servers stopped |
| V5 | `TestClient(create_app(Path('data/evidence/QA-R1-intentionally-absent.json')))`; GET health, scenarios and B comparison | **3/3 return 503**; health UNAVAILABLE/EVIDENCE_UNAVAILABLE, other routes detail EVIDENCE_UNAVAILABLE. Log: `Evidence unavailable (FileNotFoundError)` | In-process API execution, not a browser outage test. Invalid/unreadable file cases independently passed within V1 existing tests |
| V6 | Exact primary-source URLs in E6/E7 opened with web tool | Coca-Cola HBC PDF, Berry 5226 and Duni 205971 each reported not accessible via this tool | No primary contents obtained; cannot conclude 404, false attribution or VERIFIED facts. Source-to-value check remains UNKNOWN |
| V7 | Final `git diff --check`; `git diff --no-index --check -- NUL docs/review/QA-R1-judging-readiness-audit.md`; status/scope and relative-link checks | See final handoff; the additional no-index check covers this untracked report, which ordinary diff would omit | No commit, push, PR or external message sent |

### Browser UX observations for Denis

The first desktop screen exposes dataset identity, not-Profi disclosure and eligibility before the arithmetic: useful hierarchy. It does not explain the target user's decision in plain terms; headings like CALCULATED and “Decision state: INDICATIVE” need interpretation. B's negative result is much clearer than A's review state. Repeated raw source URLs/enum strings add length; they are text, not hyperlinks. The structured thermal/microwave capabilities and requirement provenance exist in the API but are not rendered as a full input comparison. The UI shows B assumption language in findings, so that boundary is available, though inventory exclusions remain too far from the numbers.

The missing-data view correctly shows N/A and a specific field path; `Derivation: CALCULATED` alongside `INSUFFICIENT_DATA` is consistent with the API but can confuse a first-time viewer. Explain “calculation unavailable” in product copy without changing schema semantics. Loading was briefly observed during pack reload; errors/retry were exercised. Narrow-screen wrapping worked in the inspected B regions, but the long selector label was clipped and results required substantial scrolling. Full keyboard/screen-reader usability, contrast measurements, real-device behavior and novice comprehension remain unverified. These are A2 acceptance inputs, not a request to redesign Denis's separate WIP.

## 9. Final handoff

```text
QA-R1 COMPLETE — STOP FOR PROJECT BRAIN REVIEW

Previous audited base:
4f9c5fd3cae18769b72bb268638c8cacc358ad96

Reconciled audited base:
d3b28c68330d89d251cc588002d550c0cca901b7

Original HARD STOP:
Unverified compatible operational premises could produce ELIGIBLE.

IGR-R1F reconciliation:
RESOLVED — fresh R1–R7 checks, 22 independent assertions, committed tests.

Fresh verification:
scripts/verify.ps1: exit 0; 58 tests passed, 1 deprecation warning; frontend build passed.
PUBLIC live HTTP: health, scenarios, Case A and Case B all 200 with expected states.
Browser: A/B, illustrative missing-data refusal, desktop/390px spot-check, outage/retry passed.
Absent-file TestClient probe: 3 routes returned 503, no fallback.

Judging matrix:
8/8 criteria covered; weights 25/15/15/10/10/10/10/5, sum 100%.

Evidence-state summary:
SUPPORTED: 1 — technical feasibility of prototype software.
PARTIAL: 7 — environment, practicality, innovation, business, scalability, UX, presentation.
UNSUPPORTED: 0 whole criteria; stronger subclaims explicitly excluded.
UNKNOWN: 0 whole criteria; external/provider/user inputs explicitly unknown.

Top 3 current gaps:
1. Independent source-to-value substantiation and complete/comparable component boundaries.
2. Real reviewer/workflow and qualitative business validation absent.
3. Result-scope visibility and presentation-machine/script rehearsal incomplete.

Top 3 current opportunities:
1. Explain A's body/closure arithmetic without claiming a complete-package saving.
2. Show B blocking a large theoretical benefit for explicit assumed conditions.
3. Turn evidence gaps into a concrete human review step, demonstrated with missing-data refusal.

Best demo-positive case:
Case A — CALCULATED / INDICATIVE, 19.5 g/unit represented-component reduction,
approximately 88.64%, still REVIEW_REQUIRED (not an eligibility-positive case).

Best negative/adversarial case:
Case B — CALCULATED / INDICATIVE + BLOCKED for assumed 95°C/microwave context.

Highest-risk judge-facing claim:
“Verified 88.64% complete-package saving for Profi” (unsupported on multiple axes).

New HARD STOP conflict:
NO within inspected/exercised scope. Curation/authenticity and UX gaps recorded, not redefined.

Current demo blockers:
No software blocker observed for the qualified local A/B demo.
Unqualified verified-source/Profi/approval claims are blocked by missing evidence.

Recommended next contracts/actions:
1. A1 — source-to-value substantiation of public inputs (official challenge brief authority resolved).
2. A2 — expose scope and decision-driving evidence beside results.
3. A3 — presentation-machine preflight, timed story and recovery rehearsal.
4. A4 — validate one nonconfidential reviewer workflow/value hypothesis.
5. A5 — bounded curation-intake exercise and gated scale roadmap, only after higher priorities.

Things deliberately not worth building now:
AI wrapper, unsupported ROI/annual/LCA dashboard, broad ranking/ingestion platform,
enterprise infrastructure overhaul, certification engine, unrelated redesign.

Unverified items:
Official challenge brief: RESOLVED as authority source (AgriFood.txt); mentor clarification transcript: UNKNOWN / unavailable;
manufacturer source-to-value accuracy; complete inventories; real Profi workflow/costs/volumes/adoption;
physical packaging qualification; hosted CI run; production/load/security/full accessibility;
presentation-machine rehearsal and finished deck.

Changed files:
docs/review/QA-R1-judging-readiness-audit.md only (existing untracked report extended).

git diff --check:
Clean; untracked-report no-index whitespace check also clean.

git status --short:
?? docs/review/

Commit / push / PR:
None. Stop for Project Brain review.
```
