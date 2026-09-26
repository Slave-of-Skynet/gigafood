# PackShift

Evidence-aware Packaging Transition Copilot for the AgriFood challenge's primary
goal: reducing virgin plastic in packaging. The working A-core compares current
and candidate packaging with deterministic calculations, provenance and visible
uncertainty. Selection MVP adds curated portfolio assessment, comparability,
operational eligibility, deterministic next actions and optional hypothetical annual impact. Digital decision support is explicitly within challenge scope.

The repository includes a public evidence pack and an illustrative fixture; the
illustrative fixture remains the A-core runtime default; Selection defaults to the PUBLIC portfolio. No Profi provider dataset is
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

The UI uses PackShift and the API display title is PackShift API. The bounded
thermal/microwave eligibility gate remains independent of environmental calculations.
Selection uses deterministic decision grouping, not global ranking or optimization.
No costs/ROI, LCA/CO2 engine, comprehensive qualification, database/accounts,
supplier integration, AI/LLM runtime or production deployment is implemented.

## One-command presentation demo

For presentation/rehearsal, use the demo launcher: it explicitly selects and verifies
PUBLIC A-core and PUBLIC Selection.

Install the declared prerequisites once using `./scripts/verify.ps1` (Windows) or
`bash scripts/verify.sh` (POSIX). Then, from repository root:

```powershell
.\scripts\demo.ps1
# Start, preflight, then stop both services (for rehearsals / checks):
.\scripts\demo.ps1 -Check
```

POSIX equivalents: `bash scripts/demo.sh` and `bash scripts/demo.sh --check`.
Both wrappers use the standard-library `scripts/demo.py` helper and repository
Python environment. No extra dependency or process supervisor is required.
Keep the terminal open; Ctrl+C stops both child services on either platform.
Startup failure also stops any children already started. Logs are printed as a
path in the system temporary directory. Forced termination of the launcher or
closing its terminal abruptly can bypass cleanup; stop remaining port owners
explicitly before relaunching.

The launcher explicitly sets absolute paths to `public-packaging.json` and
`selection-portfolios.json`, overriding inherited pack settings for its children
only. It rejects missing prerequisites/files, invalid packs and occupied ports
8000/5173; it never reuses an unknown server or falls back to illustrative data.
Before printing `PACKSHIFT DEMO READY`, it checks real HTTP: READY/PUBLIC health,
the served scenario snapshot against the selected file, non-empty portfolio
discovery, the first portfolio evaluation, frontend reachability and API proxy.
UI: http://127.0.0.1:5173. API: http://127.0.0.1:8000.
This is a local development demo, not a deployment.

## Current API and Selection walkthrough

| Route | Purpose |
| --- | --- |
| `GET /api/v1/health` | A-core evidence availability only |
| `GET /api/v1/scenarios` | Scenario evidence and identity |
| `GET /api/v1/scenarios/{id}/comparison` | A-core comparison |
| `POST /api/v1/scenarios/{id}/economics` | Hypothetical economic scenario assessment |
| `GET /api/v1/portfolios` | Independent Selection discovery |
| `GET /api/v1/portfolios/{id}` | Default portfolio assessment |
| `POST /api/v1/portfolios/{id}/evaluate` | Assessment with optional request overrides / annual units |

### Comparison Economic Scenario walkthrough

In **Comparison mode**, below Environmental Impact, PackShift provides a bounded **Economic Scenario** evaluator for testing retail business viability alongside environmental impact.

1. Select **Case A** (`cchbc-500ml-rpet-transition`). Enter hypothetical parameters:
   - Annual units: `1000000`
   - Current packaging cost: `0.120` (€/unit)
   - Candidate packaging cost: `0.135` (€/unit)
   - One-time transition cost: blank (or optional, e.g. `50000`)
2. Click **Evaluate economic scenario**:
   - Current annual spend: `€120,000.00`
   - Candidate annual spend: `€135,000.00`
   - Annual packaging-cost delta: `+€15,000.00 / year` (additional packaging cost)
   - Annual virgin plastic avoided: `19,500.0 kg / year` (≈ 19.5 t/year)
   - Economic delta per kg avoided: `+0.77 €/kg`
3. Switch to **Case B** (`deli-pp-to-rpet-transition`) and evaluate economics (e.g. `500000` units, `0.20` vs `0.18` €/unit):
   - Candidate is operationally `BLOCKED` (70°C < 95°C).
   - Even though the economics show packaging savings (`-€10,000 / year`), PackShift prominently marks the results: **`⛔ THEORETICAL / NON-ACTIONABLE`**. Operational eligibility remains visually dominant; economic attractiveness never overrides operational incompatibility.

**Epistemic boundary:**
- Prices, volumes, and transition costs are strictly `USER_PROVIDED` / `NOT_VERIFIED` scenario inputs.
- Values are not actual Profi economics, commercial terms, or procurement commitments.
- This is packaging-cost scenario arithmetic, not a full ROI/TCO/LCA engine.
- Operationally BLOCKED candidates remain non-actionable even if economic arithmetic appears attractive.


Open **Portfolio Selection** (default mode). Inspect PUBLIC / not-Profi disclosure,
baseline, candidates, comparability, environmental result, operational eligibility
and next action. Effective backend requirements and provenance are visible above the baseline.
Candidate order comes directly from backend decision grouping.

For the judge's “what if 60°C?” question:

1. Observe APET `BLOCKED` at the default 95°C requirement (`ASSUMED` / `NOT_VERIFIED`).
2. Enter `60` in **Required maximum temperature (°C)**. Leave microwave at **Use portfolio default** and evaluate.
3. Observe effective 60°C with `USER_PROVIDED` / `NOT_VERIFIED`. The thermal block disappears;
   APET becomes `REVIEW_REQUIRED` / `REQUEST_CAPABILITY_EVIDENCE`. Microwave capability remains unknown.
4. **Reset to portfolio defaults** restores 95°C and the APET block and clears all overrides.

60°C is a hypothetical user scenario, not an actual or verified Profi requirement.
Microwave offers default, required, and **Not required in this scenario** (explicit `false`);
this says nothing about candidate microwave safety. Operating context is descriptive only,
not parsed into constraints. Switching portfolios clears overrides.

Optionally combine temperature, microwave and **Hypothetical annual units** (e.g. `100000`)
in one evaluation. Where evidence permits calculation, annual kg deltas are signed;
BLOCKED results remain theoretical / non-actionable. Zero means no change; negative means
increased virgin-plastic use. `is_actionable` never grants implementation approval.
Actual Profi annual volume/impact remains UNKNOWN.

The committed Faerch portfolio deliberately has no exact candidate PCR point
values: both annual deltas remain N/A even after entering volume. CPET requires
PCR evidence; its “up to 70%” ceiling cannot become a point value. APET is thermally
BLOCKED for the modeled 95°C context; its microwave capability is unknown. This
pack does not demonstrate numerical annual savings. Calculable annual cases and
sign handling are covered by synthetic tests, not invented public evidence.

Selection availability is fetched independently of `/health`. An invalid
`GIGAFOOD_PORTFOLIOS_PATH` yields Selection unavailable while A-core may remain
READY. The two legacy `GIGAFOOD_*_PATH` configuration names are unchanged.

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

Manual launch with no environment overrides uses a mixed development default:

- A-core: **ILLUSTRATIVE** `data/evidence/demo-packaging.json`.
- Selection: **PUBLIC** `data/evidence/selection-portfolios.json`.

This is not the recommended presentation state. Use `./scripts/demo.ps1` for presentation
or rehearsal; do not reconstruct environment settings before judging.
For development, `GIGAFOOD_EVIDENCE_PATH` and `GIGAFOOD_PORTFOLIOS_PATH` override the
respective packs. Relative paths resolve from the process working directory.
`.env.example` is documentation only, not automatically loaded. Packs load at backend
startup; restart after changes. Invalid overrides fail without fallback.

## Verify and demonstrate

Run `./scripts/verify.ps1` (PowerShell) or `bash scripts/verify.sh` (POSIX).
These install the declared dependencies, run backend tests, build the UI and check whitespace.
CI then runs `bash scripts/demo.sh --check` to verify the runtime demo and clean shutdown.
Locally run `./scripts/demo.ps1 -Check` for the same preflight.

Launch the presentation demo, confirm `PUBLIC` and the not-Profi disclosure, then
switch from default **Portfolio Selection** to **Comparison**:

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

For a separate manual development check with illustrative A-core, switch to **Comparison** and confirm `ILLUSTRATIVE`:

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
