# PackShift — GigaHack 2026 AgriFood / Profi prototype

**Team SoS (Slave of Skynet)** built an evidence-aware packaging decision-support
prototype alongside a proposed high-temperature food-packaging concept. Python services
calculate represented virgin-plastic use, check bounded operational eligibility, evaluate
portfolios, and expose qualification next actions. React/TypeScript presents the results.

**Calculation ≠ operational eligibility ≠ implementation approval.** Public evidence,
illustrative fixtures, estimates, and hypothetical user inputs are kept distinct. This
runtime uses deterministic rules, not LLM inference; participation does not imply an award.

**[Public static preview](https://denis100strike.github.io/packshift/)** · [Run the full local demo](docs/demo-modes.md#reproduce-the-full-local-demo) · [Engineering case study](docs/portfolio.md) · [Demo modes and limitations](docs/demo-modes.md)

The GitHub Pages preview can display **committed responses after API failure**. It does
not establish a live backend: Selection overrides replay saved defaults, recommendation
uses saved contexts, and Comparison economics needs a working API. The separate showcase
slider performs illustrative browser-side arithmetic. Thermal/certification-style UI
claims are concept/simulation material, not proof of physical qualification.

## Engineering highlights

- **Evidence-aware calculations:** component boundaries, signed deltas, explicit missing values and provenance.
- **Eligibility before action:** `BLOCKED` and `REVIEW_REQUIRED` remain distinct from numerical attractiveness; bounded `ELIGIBLE` is not certification.
- **Portfolio and qualification workflows:** deterministic Selection grouping plus a separate six-gate HTF-03 recommendation path.
- **Hypothetical economics:** implemented packaging-cost/volume scenarios with `USER_PROVIDED` / `NOT_VERIFIED` inputs, not actual Profi savings or full ROI/TCO/LCA.
- **Reproducible local demo:** strict PUBLIC-pack selection and real HTTP preflight, with backend tests and frontend build in CI.

## Team contributions

| Team member | Role | Contributions and representative merged work |
| --- | --- | --- |
| **Denis Mironov** ([@denis100strike](https://github.com/denis100strike)) | **Frontend Developer & UI Integration** | Interactive React/TypeScript components, responsive layouts, Pentagon Radar Chart, multilingual UI/API integration; canonical recommendation journey [#40](https://github.com/Slave-of-Skynet/gigafood/pull/40). |
| **Vadim** ([@Mr-Ressentiment](https://github.com/Mr-Ressentiment)) | **Product Owner & Physical Packaging (HTF-05)** | Proposed Grill & Oven Pouch specification, thermal-bonding/steam-cooling concept and product archetypes; pitch/evidence narrative [#42](https://github.com/Slave-of-Skynet/gigafood/pull/42). These are proposed physical concepts, not verified 250°C qualification. |
| **Igor Gladyshev** ([@IgorGlUTMStudent](https://github.com/IgorGlUTMStudent)) | **Packaging Research & Data Recon / Backend Engineering** | European supplier/evidence and food-contact research; Selection backend [#14](https://github.com/Slave-of-Skynet/gigafood/pull/14), economic evaluator [#21](https://github.com/Slave-of-Skynet/gigafood/pull/21), HTF-03 runtime/API [#35](https://github.com/Slave-of-Skynet/gigafood/pull/35). |
| **Alisa Anusat** ([@lisqrn](https://github.com/lisqrn)) | **Frontend Development & Data Modeling / QA** | Gate visualization and evaluation cards, acceptance/claim-safety matrices [#34](https://github.com/Slave-of-Skynet/gigafood/pull/34), interface/language integration [#46](https://github.com/Slave-of-Skynet/gigafood/pull/46) and presentation text [#47](https://github.com/Slave-of-Skynet/gigafood/pull/47). |
| **Vladimir Barbalat** ([@barbalatv](https://github.com/barbalatv)) | **Team Lead / Backend & Domain Engineering / Integration** | Architecture/contracts and domain reconciliation [#4](https://github.com/Slave-of-Skynet/gigafood/pull/4), eligibility correctness [#6](https://github.com/Slave-of-Skynet/gigafood/pull/6), Selection/UI and demo preflight integration [#19](https://github.com/Slave-of-Skynet/gigafood/pull/19), evidence synthesis [#32](https://github.com/Slave-of-Skynet/gigafood/pull/32). |

Team leadership is supplied by the project owner. Other role titles retain the existing
team credits; PR links substantiate implementation/documentation contributions rather
than independently verifying organizational titles. Team integration is not sole authorship.

The repository includes a PUBLIC evidence pack and an illustrative fixture. Manual
startup defaults to ILLUSTRATIVE A-core and PUBLIC Selection; the presentation launcher
selects PUBLIC for both. The additive recommendation runtime loads HTF-03 research and
its display projection. No Profi provider dataset is available. Estimates remain estimates,
and unknown supplier capabilities do not become verified by entering the application.

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
Hypothetical packaging-cost arithmetic is implemented in the Comparison economic evaluator.
A full ROI/TCO/LCA or CO2 engine, comprehensive qualification, database/accounts, supplier
integration, AI/LLM inference, and a production backend deployment are not established by
this prototype. The public static preview is a separate demo mode.
Older architecture/handoff reports carry their own inspected revisions; the
[current case study](docs/portfolio.md) and [demo-mode disclosure](docs/demo-modes.md)
describe the source baseline used for this showcase.

## One-command presentation demo

For presentation/rehearsal, use the demo launcher: it explicitly selects and verifies
PUBLIC A-core and PUBLIC Selection, and checks the independent HTF-03 recommendation runtime.

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


The UI initially opens the physical-concept showcase. Choose **Browse packaging**
(**Portfolio Selection**; labels vary by language). Inspect PUBLIC / not-Profi disclosure,
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
choose **Compare plastic use** (**Comparison**; labels vary by language):

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
4. In local **Comparison** or **Selection**, stop the backend and reload: service error and Retry. Restart it and retry. Recommendation has an additional saved-response fallback; see [demo modes](docs/demo-modes.md#fallback-also-affects-local-recommendation).
5. Start backend with an absent evidence path: health and calculation routes return 503.

For either pack, `CALCULATED ≠ VERIFIED`; public evidence is not provider data.
No safety/legal/shelf-life certification, implementation approval or annual Profi
savings may be claimed. See the [demo policy](docs/canon/product_canon.md#demo-claims-and-non-features).
The [ARC-01 handoff](docs/handoff.md) records historical results, not current repository state.

## Further reading

- [Engineering case study](docs/portfolio.md): source-linked architecture, evidence, decisions and collaboration.
- [Demo modes](docs/demo-modes.md): static responses, local evaluation, provenance and proposed UI follow-ups.
- [Historical Russian portfolio write-up](О_ПРОЕКТЕ_PORTFOLIO.md): original presentation material; its hosting and physical-performance claims are qualified by the current demo-mode disclosure.
