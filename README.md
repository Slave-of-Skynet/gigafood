# PackShift

Evidence-aware Packaging Transition Copilot for the AgriFood challenge's primary
goal: reducing virgin plastic in packaging. The working A-core compares current
and candidate packaging with deterministic calculations, provenance and visible
uncertainty. Digital decision support is explicitly within challenge scope.

The repository includes a public evidence pack and an illustrative fixture; the
illustrative fixture remains the runtime default. No Profi provider dataset is
available. Results are decision support, not certification or implementation approval.

## Current context

- [Challenge canon](docs/canon/challenge_canon.md): official scope, judging weights,
  optional Hot Food case and mentor clarification.
- [Product canon](docs/canon/product_canon.md): implementation, evidence and demo boundaries.
- [Decision policy](docs/canon/decision_policy.md): calculation versus eligibility,
  future ranking guard and human decision gate.
- [Open questions](docs/canon/open_questions.md): prioritized mentor questions and UNKNOWNs.
- [NDR-01 public evidence pack](docs/evidence/NDR-01-public-evidence-pack.md): source ledger and limitations.
- [Architecture](docs/architecture.md) and [evidence semantics](docs/evidence_semantics.md).

Current UI/API titles still use GigaFood. A bounded operational eligibility
gate is implemented in the runtime, evaluating modeled thermal and microwave
constraints with explicit provenance, strictly decoupled from environmental
calculations. No portfolio ranking, annual-impact field, costs/ROI, LCA/CO2
engine, comprehensive packaging qualification engine, database/accounts,
supplier integration, AI/LLM runtime or production deployment is implemented.

## Run locally

Requirements: Python 3.11+, Node 22.12+ and npm. From the repository root (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install -e './backend[test]'
.\.venv\Scripts\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

In another terminal:

```powershell
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite. Vite proxies `/api` to port 8000.
On POSIX use `.venv/bin/python` instead of `.venv\Scripts\python`.
FastAPI's interactive contract is at `http://127.0.0.1:8000/docs`.

The bundled, explicitly declared demo evidence loads once at backend startup.
Set `GIGAFOOD_EVIDENCE_PATH` to override it; relative paths resolve from the process
working directory. `.env.example` is documentation, not an automatically loaded file.
Restart after editing evidence. An unreadable/invalid override returns 503; no fallback.

To launch with the public evidence pack, stop the backend and run from the repository
root (PowerShell):

```powershell
$env:GIGAFOOD_EVIDENCE_PATH = 'data/evidence/public-packaging.json'
.\.venv\Scripts\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

On POSIX:

```sh
GIGAFOOD_EVIDENCE_PATH=data/evidence/public-packaging.json .venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Reload the UI after restarting. To return to the default illustrative pack, stop
the backend, remove the override (`Remove-Item Env:GIGAFOOD_EVIDENCE_PATH` in the
same PowerShell session, or `unset GIGAFOOD_EVIDENCE_PATH` on POSIX), then restart.
NDR-01 added the public pack; it did not change runtime defaults.

## Verify and demonstrate

Run `./scripts/verify.ps1` (PowerShell) or `bash scripts/verify.sh` (POSIX).
These install the declared dependencies, run backend tests, build the UI and check whitespace.

With the public pack selected, confirm `PUBLIC` and the not-Profi disclosure:

1. Select **Case A** (`cchbc-500ml-rpet-transition`): 22.0 → 2.5 g/unit;
   reduction 19.5 g/unit, about 88.64%, `CALCULATED` / `INDICATIVE`. Operational
   requirements are unmodeled for beverage bottles, safely returning `REVIEW_REQUIRED`.
   Component boundary: secondary wrap label (~0.3–0.5g) and adhesives excluded.
2. Select **Case B** (`deli-pp-to-rpet-transition`): 14.8 → 2.4 g/unit;
   reduction 12.4 g/unit, about 83.78%, `CALCULATED` / `INDICATIVE`. The bounded
   operational gate returns `BLOCKED` due to demonstrated thermal incompatibility
   (candidate max 70.0°C < required 95.0°C) and microwave incompatibility (candidate
   not microwave safe, operating context requires microwave reheating). Explain that
   theoretical reduction does not grant eligibility. Component boundary: Berry 14.8g
   is container body only (separate lid excluded, missing mass unknown); candidate
   12.0g is complete hinged container gross weight.
3. Inspect provenance and limitations in the ledger: represented components are not
   verified complete-package inventories. Neither case describes actual Profi impact.

With the illustrative pack selected, confirm `ILLUSTRATIVE`:

1. Select **Illustrative reduction**: 15 → 8 g/unit; reduction 7 g/unit, about 46.667%.
2. Select **Illustrative missing recycled content**: candidate and delta N/A;
   `INSUFFICIENT_DATA`, missing-field paths. Operational eligibility evaluates to
   `REVIEW_REQUIRED`, not `BLOCKED` (missing numerical evidence does not fabricate
   an operational incompatibility).
3. Inspect both packages' values, provenance, and `NOT_VERIFIED` suitability notice.
4. Stop the backend, reload the page: service error and Retry. Restart it and retry.
5. Start backend with an absent evidence path: health and calculation routes return 503.

For either pack, `CALCULATED ≠ VERIFIED`; public evidence is not provider data.
No safety/legal/shelf-life certification, implementation approval or annual Profi
savings may be claimed. See the [demo policy](docs/canon/product_canon.md#demo-claims-and-non-features).
The [ARC-01 handoff](docs/handoff.md) records historical results, not current repository state.
