# ARC-01 — Human Integrator handoff

## Repository state

```text
Target path: C:\Users\user\Documents\skynet\gigafood
Was git already initialized: No; git init performed with authorization in ARC-01
Branch: master (unborn)
Base HEAD before work: none
Current HEAD: none
Remote(s): none
```

Initial mandatory recon found an empty directory and `not a git repository` for
Git status/branch/HEAD/remotes/diffs. No existing architecture, contracts or provider
data were found. No existing file was replaced. Files are unstaged additions with
intent-to-add entries so `git diff` can show them; cached diff is empty.
No commit, push, merge, PR or deployment was performed.

## Architecture created

Strict Pydantic domain → versioned JSON / validated in-memory startup snapshot → pure
deterministic service → typed FastAPI responses → typed React fetch client and one page.
Malformed/unavailable evidence causes 503; explicit null inputs cause an
INSUFFICIENT_DATA business result. Inputs/provenance are returned with each comparison.
The README contains local startup and a short demo/negative-case runbook.

## Changed files (all created)

- Docs: `README.md`, `docs/architecture.md`, `docs/evidence_semantics.md`, `docs/handoff.md`.
- Backend: `backend/pyproject.toml`, `backend/app/__init__.py`, `backend/app/main.py`,
  `backend/app/domain/__init__.py`, `backend/app/domain/_contract.py`,
  `backend/app/domain/packaging.py`, `backend/app/runtime/__init__.py`,
  `backend/app/runtime/context.py`, `backend/app/services/__init__.py`,
  `backend/app/services/virgin_plastic.py`, `backend/tests/test_api.py`,
  `backend/tests/test_virgin_plastic.py`.
- Frontend: `frontend/package.json`, `frontend/package-lock.json`, `frontend/tsconfig.json`,
  `frontend/vite.config.ts`, `frontend/index.html`, `frontend/src/main.tsx`,
  `frontend/src/api/client.ts`, `frontend/src/api/contracts.ts`,
  `frontend/src/pages/HomePage.tsx`, `frontend/src/styles.css`.
- Data: `data/evidence/demo-packaging.json`.
- CI/scripts/config: `.github/workflows/ci.yml`, `scripts/verify.ps1`, `scripts/verify.sh`,
  `.env.example`, `.gitignore`, `.gitattributes`.

Local generated `.venv`, `node_modules`, build output and caches are ignored.

## Shared semantics introduced

- Component virgin plastic = mass × (1 − recycled fraction); package = sum of components.
- Reduction = current − candidate; percentage = reduction/current × 100, null for zero current.
- Origin: OBSERVED, USER_PROVIDED, MANUFACTURER_SUPPLIED, CALCULATED, ESTIMATED, ASSUMED.
- Verification: SOURCE_AVAILABLE, VERIFIED, NOT_VERIFIED, INSUFFICIENT_DATA, INDICATIVE.
- CALCULATED does not verify inputs; NOT_VERIFIED does not mean false.
- Missing numeric values are explicit null, never zero. Omitted required schema fields are invalid.
- GET `/api/v1/health`, `/api/v1/scenarios`, `/api/v1/scenarios/{id}/comparison`.
- ConstraintFinding: constraint_id, status (REVIEW_REQUIRED/BLOCKED), reason,
  nullable source_reference, verification_state. No legal verdict.
- Scenario contains complete current/candidate plastic component inventories. Empty inventories
  are rejected; validation does not prove that the evidence curator included every component.

## Verification evidence

Environment: Windows, Python 3.11.9, Node 22.23.1, npm 10.9.8.
Backend installed with `.\.venv\Scripts\python -m pip install -e './backend[test]'`.
Resolved FastAPI 0.141.1, Pydantic 2.13.5, uvicorn 0.54.0, pytest 9.1.1, httpx 0.28.1.

```powershell
.\.venv\Scripts\python -m pytest backend/tests
```

Actual result: 27 passed. One upstream Starlette warning: its TestClient httpx integration
is deprecated in favor of httpx2. No extra test dependency was introduced.
Initial test run caught an incorrect default evidence path; corrected before successful rerun.

Real backend started with:

```powershell
.\.venv\Scripts\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
Invoke-RestMethod 'http://127.0.0.1:8000/api/v1/health'
Invoke-RestMethod 'http://127.0.0.1:8000/api/v1/scenarios/illustrative-reduction/comparison'
Invoke-RestMethod 'http://127.0.0.1:8000/api/v1/scenarios/illustrative-incomplete/comparison'
```

Actual: health READY; positive CALCULATED, 15 → 8 g/unit, reduction 7 g/unit,
46.666666666666664%; incomplete INSUFFICIENT_DATA, candidate/deltas null.
An additional temporary uvicorn process on port 8001 with GIGAFOOD_EVIDENCE_PATH pointing
to absent-smoke.json returned 503 EVIDENCE_UNAVAILABLE for both health and comparison.
That temporary process was stopped after the smoke.

Frontend commands, run from `frontend`:

```powershell
npm install
npm run build
```

Actual: install completed (21 packages, npm reported 0 vulnerabilities); package-lock.json
retained. TypeScript check and Vite 6.4.3 production build succeeded (30 modules).
The generated JavaScript bundle is 229.10 kB (71.31 kB gzip).

Browser smoke used local Vite on 127.0.0.1:5173 and the real backend:
positive result, incomplete selection with N/A and missing-field path, source/state labels,
backend stopped → visible error, backend restarted → Retry restored CALCULATED.
A screenshot confirmed the basic layout in the available narrow browser viewport.
This is a manual browser smoke, not an automated browser regression suite or a full
accessibility/cross-browser audit. Local smoke servers were stopped after verification.

Final Git commands: `git diff --check`, `git status --short`, `git diff --stat`,
`git diff`, `git diff --cached --name-only`, `git branch --show-current`,
`git rev-parse --verify HEAD`, `git remote -v`. Whitespace check passed after removing
trailing blank lines; all files are additions, cached diff empty, branch master,
HEAD absent and no remotes. Intent-to-add was used only to make new files reviewable.

## Negative cases verified

Behavioral pytest assertions cover:

- Unknown fraction, unknown mass, or both: no partial package sum or transition delta.
- Fraction outside [0,1], non-positive mass, NaN/infinity, strings and booleans: validation errors.
- Zero virgin baseline: percentage null with no division error.
- Increasing virgin plastic: negative absolute and percentage reductions retained.
- Missing file, simulated PermissionError, malformed JSON, invalid UTF-8, invalid schema,
  invalid numerical evidence and duplicate scenario IDs: 503; no fallback.
- Explicit missing environment override: no silent demo substitution.
- Unknown scenario: 404; empty/duplicate component inventory: rejected.
- No annual-impact field or fabricated VERIFIED/compliance verdict in the demo response.

## UNKNOWN / deferred

Real Profi/provider data, real decision owner, exact food-contact suitability, food safety,
shelf life, operational/logistics compatibility, affordability/scalability evidence,
candidate-specific regulatory applicability and portfolio ranking methodology remain unknown.
No public evidence claims were researched or invented. CI on GitHub and POSIX verification
have not been executed in this Windows task.

## Scope deviations

Routes live in main.py; no empty API/components folders. API uses scenarios rather than
packages to keep each current/candidate pairing explicit. Package __init__.py files enable
normal Python packaging. `.gitattributes` preserves LF across Windows/POSIX; this handoff
file records review evidence. No major dependency beyond the requested stack was added.

## Risks / next integration steps

1. Human Integrator reviews shared contracts, formula guards, schema and dependency baseline.
2. Nicolae curates attributable evidence; illustrative assumptions must not be relabeled as verified.
3. Alisa validates suitability requirements and acceptance with the real decision owner/mentor.
4. Coordinate Pydantic/TypeScript changes together; the frontend mirror is currently manual.
5. Decide dependency pinning/update policy, including upstream TestClient deprecation, before expansion.

STOP — ready for Project Brain / Human Integrator review.
