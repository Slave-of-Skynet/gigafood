# QA-R3 — Final Acceptance & Adversarial Demo QA

## 1. Final verdict

**FIX REQUIRED**

**QA-R3 COMPLETE — STOP FOR PROJECT BRAIN REVIEW**

Acceptance is not granted. A fresh real-HTTP adversarial probe reproduced the
contract's hard STOP condition 11: the presentation launcher declares
`PACKSHIFT DEMO READY` while Selection serves `ILLUSTRATIVE`, not `PUBLIC`.
The normal committed PUBLIC fixture passes preflight; the defect is a missing
fail-closed identity guard, not a claim that the unchanged fixture is mislabeled.

The audit stopped when this was confirmed, as required by QA-R3 section 30.
Unexecuted browser/mobile/recovery cases remain explicitly NOT RUN; this report
does not substitute source inspection or backend tests for browser acceptance.

## 2. Audited base and repository state

**FACT:** Repository `Slave-of-Skynet/gigafood`, local directory
`C:\Users\djahe\OneDrive\Documents\Alisa\skynet\gigafood`.

**OBSERVED EXECUTION:** Initial checkout was clean `main` at
`3cdd4faab05d79c44b9caf9b34c98d56d4a693da`. `git fetch origin` advanced the
remote-tracking branch to exactly the contract's expected base:

```text
985004e9b699f496d8a308001d6a46242e230fae
```

Created `alisa/qa-r3-final-acceptance` with
`git switch -c alisa/qa-r3-final-acceptance origin/main`. HEAD and origin/main
both resolve to that SHA, the PR #20 INT-R4 merge. No newer main commits needed
reconciliation. No unrelated local work was discarded.

Only intended repository change: `docs/review/QA-R3-final-acceptance.md`.
No runtime, evidence, canon, script, dependency-manifest or workflow edits.
Dependency installation created ignored build/environment artifacts. No commit,
push, PR, deployment or external message was performed.

## 3. Scope and authority

**TEAM DECISION:** The supplied QA-R3 contract authorizes acceptance testing and a
report, prohibits runtime repairs, and requires immediate STOP on a launcher
declaring READY with the wrong evidence identity.

Authority used: challenge canon; accepted product/decision canon; evidence
semantics and architecture; committed implementation; historical QA-R1/QA-R2A
and INT-R2 contract; finally synthetic probes. Historical acceptance and STOP
results were not treated as current execution evidence. The official brief and
manufacturer sources were not independently revalidated in this audit.

Read the four canon documents, evidence semantics, architecture, README,
QA-R2A, and the relevant QA-R1/INT-R2 sections; inspected the domain, calculation,
selection, runtime, API, both evidence packs, frontend contracts/client/views,
demo/verification scripts and CI workflow. Some large initial reads were
truncated; focused follow-up reads supplied the relevant runtime and historical
sections. A full historical-document and claim sweep was not completed before STOP.

Labels in this report: **FACT** = directly inspectable repository fact;
**OBSERVED EXECUTION** = executed command/output; **TEAM DECISION** = accepted
scope/policy; **INFERENCE** = interpretation; **UNKNOWN** = unestablished;
**SIMULATION / QA PROBE** = synthetic test setup, never product evidence.

Protected boundaries remain the acceptance standard: CALCULATED is not VERIFIED;
SOURCE_AVAILABLE is not VERIFIED; NOT_VERIFIED is not FALSE; missing is not zero;
PUBLIC is not PROVIDER; ILLUSTRATIVE is not PUBLIC; environmental calculation,
operational eligibility and implementation approval are separate.

## 4. Verification environment

**OBSERVED EXECUTION:** Windows PowerShell, Python 3.12.10 as reported by pytest,
pytest 9.1.1, Node v24.19.0, npm 11.17.0, Vite 6.4.3. Declared dependencies were
installed by the repository verification script. FastAPI TestClient was used for
in-process HTTP probes; demo preflights used actual localhost HTTP and live
Uvicorn/Vite processes.

| Evidence | Actual command / method | Result |
| --- | --- | --- |
| E1 | `git fetch origin`; status, branch, SHA and log checks; branch creation | Clean base; expected SHA confirmed. |
| E2 | `.\scripts\verify.ps1` | Exit 0; 99 backend tests passed; one known Starlette/httpx deprecation warning; `npm ci`, TypeScript and Vite build passed (32 modules); whitespace check passed. |
| E3 | `.\scripts\demo.ps1 -Check` | Exit 0; `PACKSHIFT DEMO READY`, `A-core: READY / PUBLIC`, `Selection: READY / 1 portfolio(s)`, canonical evaluation with 2 candidates. |
| E4 | `.\.venv\Scripts\python.exe -u C:\Users\djahe\AppData\Local\Temp\qa-r3-probes.py` | Exit 0; independent service/TestClient probes plus real-HTTP temporary-copy launcher probe; detailed results below. Exit 0 here means the probe script completed, not acceptance passed. |
| E5 | `Get-NetTCPConnection -State Listen -LocalPort 8000,5173 -ErrorAction SilentlyContinue` | No presentation-port listeners after normal preflight and after the adversarial preflight. |
| E6 | `rg -n 'expected_portfolios\|dataset_kind\|summaries\|evaluation\|PACKSHIFT DEMO READY' scripts/demo.py` | Source locations corroborate the missing Selection identity guard. |
| E7 | `git diff --check`; final status and protected-path diff inspection | Whitespace check clean; report is the only repository change. |

E4 used `TemporaryDirectory(prefix='qa-r3-')`; temporary JSON and the copied
runtime were removed automatically on exit. Probe code remains only under OS
temp, not in the repository. Launcher logs are also under OS temp. No generated
QA script was added to the repository.

POSIX/Bash execution and external GitHub Actions results for this SHA were not
verified before STOP. Merely reading the committed workflow is not CI evidence.

## 5. Previous STOP reconciliation

### QA-R2A STOP-01

**RESOLVED — independently reproduced and no misleading language remains in the
exercised service/API summary and annual-disclosure paths.** Browser sign-language
acceptance remains unexecuted and is not included in that scoped conclusion.

**SIMULATION / QA PROBE; OBSERVED EXECUTION (E4):** Valid common-boundary portfolio,
baseline 20 g virgin plastic, candidate 25 g, exact PCR 0.0. Both direct service
and TestClient POST returned `reduction_g=-5`, `reduction_pct=-25`. API summary:

```text
1 candidate(s) viable but do not reduce virgin plastic (virgin-plastic use increases).
Verification of operational premises required before QA advancement.
```

With candidate 20 g, reduction was 0 and summary explicitly said
`zero virgin-plastic reduction (no change in virgin-plastic use)`. Neither
negative nor zero summary/annual disclosure contained `saving`. Next-action
details retained signed deltas (-5 g / -25%, or 0 g / 0%). The historical
QA-R2A failure at `f59625203fe5d054c1ec5a06ab5f7f12d72a6fd5` is preserved as history.

### INT-R3-F1 sign issue

**RESOLVED in fresh service/API probes.** With operationally BLOCKED synthetic
candidates and hypothetical 100,000 units:

| Candidate virgin g | Delta g | Annual delta kg | Disclosure / actionability |
| --- | --- | --- | --- |
| 15 | +5 | +500 | Theoretical annual saving; operationally blocked; not actionable; hypothetical user volume. |
| 20 | 0 | 0 | No annual virgin-plastic reduction (no change); no saving wording; not actionable. |
| 25 | -5 | -500 | Annual virgin-plastic use increases; no saving wording; not actionable. |

All three disclaim actual Profi purchase volume and verified retail impact.
These synthetic values are not manufacturer, PUBLIC, or Profi evidence.

## 6. Acceptance matrix

PASS is limited to the specified executed scope. PARTIAL is not acceptance.
NOT RUN follows the mandatory hard STOP, not a product-failure inference.

| ID | Purpose | Input/setup | Expected | Observed | Evidence | Result | Judge implication |
| --- | --- | --- | --- | --- | --- | --- | --- |
| QA3-A01 | Presentation identity | Normal committed demo path | PUBLIC/PUBLIC and visible not-Profi disclosure | Normal preflight passed; TestClient Selection PUBLIC; rendered disclosure not checked | E3/E4 | PARTIAL | Normal identity confirmed at runtime; visible UI remains unaccepted. |
| QA3-A02 | CPET missing PCR | Committed default portfolio | INSUFFICIENT_DATA, N/A, request PCR | Null candidate/delta; REQUEST_PCR_EVIDENCE; NON_POINT_VALUE remains a gap | E4 | PASS API | Marketing ceiling does not create a saving. |
| QA3-A03 | Default APET block | Default 95°C versus documented 70°C | BLOCKED independently of missing PCR | BLOCKED, REJECT_INCOMPATIBLE, null environmental delta; default ASSUMED/NOT_VERIFIED | E4 | PASS API | Thermal block survives environmental uncertainty. |
| QA3-A04 | 60°C judge scenario | POST 60, inherit microwave | USER_PROVIDED/NOT_VERIFIED; review; request capability | Exact API result obtained; UI submission not executed | E4 | PARTIAL | Backend semantics pass; frontend-to-backend flow unaccepted. |
| QA3-A05 | Reset | Default GET after override POST | 95°C and assumed provenance restored; no stale override | Stateless GET restored default context; reset button not exercised | E4 | PARTIAL | Backend state isolation is not proof of UI reset. |
| QA3-A06 | Explicit microwave false | POST 60 and false | Preserve false and user provenance | Effective microwave value false, USER_PROVIDED/NOT_VERIFIED; actual UI request not captured | E4 | PARTIAL | False means requirement absent, not candidate unsafe. |
| QA3-A07 | Combined annual scenario | POST 60/false/100000 | Coherent context; annual N/A; hypothetical disclosure | One request returned all three inputs; both annual results null/INSUFFICIENT_DATA/non-actionable | E4 | PARTIAL | API passes; browser form not exercised. |
| QA3-A08 | Old negative summary | SIMULATION / QA PROBE 20→25 g | -5 g; increased use, not savings | Service/API negative summary and next action preserve sign | E4 | PASS API | Historical STOP no longer reproduced in API. |
| QA3-A09 | Zero delta | SIMULATION / QA PROBE 20→20 g | Zero/no change, not savings | Zero summary, numerical delta and disclosure correct | E4 | PASS API | No invented positive effect. |
| QA3-A10 | BLOCKED annual signs | SIMULATION / QA PROBE 20→15/20/25 g, 100000 units | +500/0/-500 kg; sign-safe, non-actionable | All three results and disclosures matched | E4 | PASS API | Environmental number does not remove a block. |
| QA3-A11 | Case A | PUBLIC comparison API | 22→2.5, 19.5, 88.64%, review; UI explains unmodeled requirements | API matched; UI explanation inspected in code only | E4/source | PARTIAL | Rendered explanation remains unverified. |
| QA3-A12 | Case B | PUBLIC comparison API | 14.8→2.4, 12.4, 83.78%, BLOCKED | API matched; binary float precision retained; browser not exercised | E4 | PARTIAL | Backend preserves block; visible presentation unverified. |
| QA3-A13 | Selection failure isolation | PUBLIC A-core / missing temporary portfolio path | Health 200/PUBLIC, Selection 503; Comparison usable | TestClient status pair 200/503; frontend not exercised | E4 | PARTIAL | Health is not Selection readiness. |
| QA3-A14 | A-core failure isolation | Missing evidence / valid Selection | A-core 503; Selection independently 200 | TestClient status pair 503/200; frontend not exercised | E4 | PARTIAL | Backend isolation passes; UI unavailable-state handling unknown. |
| QA3-A15 | Retry/recovery | Real browser failure and restore | No crash, fresh result, preserved scenario | Not reached before STOP | — | NOT RUN | Recovery acceptance outstanding. |
| QA3-A16 | Invalid inputs | 0, negative, fractional annual units; invalid temperature | Useful UI validation; no malformed request | Validation implementation read; no browser execution | source only | NOT RUN | Cannot claim live validation success. |
| QA3-A17 | Grouping versus ranking | Source and rendered UI | Stable decision groups; no procurement winner | Backend grouping and UI disclaimer inspected; browser not checked | source | PARTIAL | No global optimizer seen in inspected Selection code. |
| QA3-A18 | Public/provider/procurement claims | Requested complete contextual sweep | No unsupported claims | Canon/disclosures inspected; comprehensive search not completed | source | PARTIAL | Claim audit must resume after fix. |
| QA3-A19 | Narrow viewport | Approximately 390×844 | Usable controls, cards, contexts, Comparison | Not reached before STOP | — | NOT RUN | Mobile acceptance outstanding. |
| QA3-A20 | Fail-closed preflight | Normal run, then temporary ILLUSTRATIVE Selection | Reject wrong Selection identity; otherwise verify both services and clean up | Normal run passed, but wrong-identity real HTTP run still printed READY and returned 0 | E3/E4/E5/E6 | FAIL — STOP-11 | READY does not guarantee PUBLIC/PUBLIC. |

## 7. Fresh adversarial probes

All synthetic changes below are **SIMULATION / QA PROBE**, not product evidence.
They were authored for this audit independently of the regression-test suite.

| Probe | Attack | Actual result |
| --- | --- | --- |
| P1 | Relax default requirement 95→60°C using committed PUBLIC portfolio | APET BLOCKED→REVIEW_REQUIRED; REQUEST_CAPABILITY_EVIDENCE; requirement USER_PROVIDED/NOT_VERIFIED. |
| P2 | Hypothetical annual units 9007199254740991 with missing PCR | Both candidates retain null annual numerics, INSUFFICIENT_DATA, is_actionable=false. |
| P3 | SIMULATION / QA PROBE: compatible all-VERIFIED premises; weaken only candidate microwave premise to SOURCE_AVAILABLE | ELIGIBLE→REVIEW_REQUIRED. No silent preservation of eligibility. |
| P4 | SIMULATION / QA PROBE: known individual values 20 and 15 g; mismatch TRAY_BODY_ONLY and HINGED_COMPLETE_PACK | Individual totals retained; transition delta null, INSUFFICIENT_DATA, component_boundary_mismatch. |
| P5 | SIMULATION / QA PROBE: signed 20→15/20/25 g, each nonblocked and BLOCKED, at 100000 units | Six fresh service/API cases; negative/zero summaries and annual disclosures contain no saving language. Rendered cards were not exercised. |
| P6 | SIMULATION / QA PROBE: temporary Selection fixture declares ILLUSTRATIVE; all runtime/launcher source unchanged | Real HTTP discovery and evaluation both ILLUSTRATIVE; launcher declares READY, exit 0. STOP-11. |

### STOP-11 minimal reproduction and evidence

**Affected surface:** `scripts/demo.py:68-72,101-105,109`, used by both demo wrappers.
Source validates the A-core identity and that the portfolio list is nonempty.
It compares Selection IDs and candidate counts, but never requires the portfolio,
discovery or evaluation identity to be PUBLIC.

**Expected:** A valid but non-PUBLIC Selection pack must produce
`PACKSHIFT DEMO NOT READY`, nonzero exit, and child-process cleanup.

**Observed real HTTP and launcher output:**

```text
GET /api/v1/portfolios                         dataset_kind = ILLUSTRATIVE
GET /api/v1/portfolios/faerch-deli-trays        dataset_kind = ILLUSTRATIVE
PACKSHIFT DEMO READY
A-core: READY / PUBLIC
Selection: READY / 1 portfolio(s)
Evaluation: faerch-deli-trays / 2 candidates
Preflight-only check complete; stopping both services.
Launcher exit = 0
```

The temporary-copy probe changed only Selection `dataset_kind` and its disclosure.
IDs, candidates, numeric inputs and capabilities stayed the same. It did not
mock HTTP responses. A wrapper around `read_json` only printed actual response
identities and returned those responses unchanged. PUBLIC A-core remained valid.

Reproduce from repository root after normal dependency setup using repository
Python. This script only changes an OS-temp copy and cleans that copy on exit:

```python
import copy, importlib.util, json, shutil, sys
from pathlib import Path
from tempfile import TemporaryDirectory

root = Path.cwd()
with TemporaryDirectory(prefix="qa-r3-identity-") as directory:
    mirror = Path(directory)
    (mirror / "scripts").mkdir()
    (mirror / "data/evidence").mkdir(parents=True)
    shutil.copy2(root / "scripts/demo.py", mirror / "scripts/demo.py")
    shutil.copytree(root / "backend/app", mirror / "backend/app",
                    ignore=shutil.ignore_patterns("__pycache__"))
    shutil.copytree(root / "frontend", mirror / "frontend")
    shutil.copy2(root / "data/evidence/public-packaging.json",
                 mirror / "data/evidence/public-packaging.json")
    pack = json.loads((root / "data/evidence/selection-portfolios.json")
                      .read_text(encoding="utf-8"))
    pack[0]["dataset_kind"] = "ILLUSTRATIVE"
    pack[0]["disclosure"] = "SIMULATION / QA PROBE; not PUBLIC or provider evidence."
    (mirror / "data/evidence/selection-portfolios.json").write_text(
        json.dumps(pack), encoding="utf-8")
    spec = importlib.util.spec_from_file_location("qa_demo", mirror / "scripts/demo.py")
    demo = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(demo)
    actual_read = demo.read_json
    def observe(url):
        result = actual_read(url)
        if "/portfolios" in url:
            print("REAL HTTP IDENTITY", [x["dataset_kind"] for x in result]
                  if isinstance(result, list) else result["dataset_kind"])
        return result
    demo.read_json = observe
    sys.argv = [str(mirror / "scripts/demo.py"), "--check"]
    print("LAUNCHER EXIT", demo.main())
```

**INFERENCE / impact:** An operator can trust a successful presentation preflight
even after an accidental evidence-identity change makes Selection unsuitable for
the promised PUBLIC/PUBLIC demo. The returned identity is not hidden or relabeled
as PUBLIC; the false assurance is specifically the launcher readiness result.
This is the explicit QA-R3 hard-stop class, not a style preference or a claim of
current committed PUBLIC evidence corruption.

**Recommended fix boundary for Project Brain:** A separate bounded launcher fix
should enforce PUBLIC for every selected expected portfolio and the actual
discovery/evaluation payloads before READY. Add negative-identity coverage and
retain cleanup. Do not change evidence values, arithmetic, eligibility or UI
semantics to address this finding. QA has made no repair.

## 8. Browser / UX acceptance

**UNKNOWN / NOT RUN:** Successful rendered-app acceptance was not completed.
A preparatory in-app browser navigation to `http://127.0.0.1:5173` occurred before
the services were started and returned `ERR_CONNECTION_REFUSED`; this is not a
product defect and is not evidence of a tested failure/recovery flow.

No successful rendered scenario, reset, invalid-input, mobile or sign-card check
is claimed. Backend results and inspected JSX cannot satisfy those requirements.
Resume these cases only after Project Brain disposition and the launcher fix.

## 9. Demo runtime / failure recovery

Normal PowerShell preflight passed real frontend reachability, backend health,
scenario snapshot equality, Selection discovery/evaluation and frontend-to-backend
proxy checks. Both normal and synthetic runs released ports 8000/5173.

TestClient independently confirmed missing Selection does not disable valid
A-core (200/503), and missing A-core does not disable valid Selection (503/200).
These were startup snapshots with missing temporary paths, not network mocks.
Browser Retry and scenario preservation during recovery remain UNKNOWN.

## 10. Claim integrity audit

**FACT:** Inspected canon and current Selection disclosures distinguish PUBLIC
from Profi provider data, user requirements from verified requirements, and
hypothetical annual units from actual Profi impact. The committed missing PCR
slots stayed null in execution. Direct service/API negative and zero wording
passed fresh probes. Selection source uses decision-state grouping, not scores.

**OBSERVED EXECUTION:** The launcher readiness claim failed the identity challenge
in section 7. A full contextual claim search and rendered-interface review were
not completed before the required STOP; no blanket claim-integrity PASS is issued.

## 11. Known limitations / UNKNOWNs

Retain these product boundaries irrespective of the launcher correction:

- No proprietary Profi provider dataset or verified Profi operating requirements.
- No exact PCR point values for committed PUBLIC Selection candidates.
- No actual Profi annual volume or annual impact.
- No cost/ROI model, global ranking or optimizer.
- No complete packaging qualification engine, regulatory/food-safety certification,
  or implementation approval.
- No production deployment verified by this audit.

Outstanding acceptance evidence: real browser flows and request capture, reset,
invalid inputs, outage/retry recovery, approximately 390×844 layout, rendered
negative/zero cards, full contextual claim sweep and POSIX execution/CI results.
Manufacturer source-to-value verification and real Profi workflow remain separate
external evidence questions, not facts established by passing software tests.

## 12. Final recommendation

**QA-R3 COMPLETE — STOP FOR PROJECT BRAIN REVIEW**

Report completion is not full matrix execution or product acceptance. Do not
freeze the core or proceed under DEP-R1 on the basis of this report. Project
Brain should assign the bounded Selection-identity preflight fix, then rerun the
adversarial identity case and complete all deferred browser/claim/POSIX checks.

Audited SHA: `985004e9b699f496d8a308001d6a46242e230fae`.
Changed repository file: `docs/review/QA-R3-final-acceptance.md` only.
Verification: 99 backend tests and frontend build passed; normal demo preflight
passed; six independent probes executed; one reproducible hard STOP found.
Historical negative-summary and BLOCKED annual-sign issues are resolved in the
freshly exercised service/API scope; browser confirmation remains outstanding.

**FIX REQUIRED**
