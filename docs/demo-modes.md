# PackShift demo modes and response provenance

[Project](../README.md) · [Engineering case study](portfolio.md)

## Runtime states

Every API client result carries `LIVE_API` or `STATIC_SNAPSHOT` separately from the
unchanged backend DTO. Views display `LOADING` while a request is pending and
`UNAVAILABLE` when it fails. Visible source text does not depend only on color.

- **LIVE API** means that the configured API returned this response successfully.
  It does not establish verified source evidence, current supplier capability or
  physical qualification. Domain `ESTIMATED`, `ASSUMED`, `BLOCKED`, `REVIEW_REQUIRED`
  and `ELIGIBLE` meanings are unchanged.
- **RECORDED DEMO** means that a committed example was selected. It is not a new
  backend calculation. A recorded health `READY` does not establish backend availability.
- Pending/error operations do not retain an older answer as the current result.
  Aborted requests cannot select a recording or overwrite a newer selection.

[client.ts](../frontend/src/api/client.ts) owns all recorded lookups; Recommendation
has no independent, any-host fallback. Successful JSON receives structural/context
checks, including requested IDs and echoed Selection/economics inputs. These frontend
checks are not a replacement for backend evidence validation.

## Organization-managed GitHub Pages deployment

The source-controlled workflow [`pages.yml`](../.github/workflows/pages.yml) builds the
frontend from `gigafood/main` for the project path `/gigafood/`. Its **intended** URL
is <https://slave-of-skynet.github.io/gigafood/>. Treat the URL as **unverified**
until a successful deployment and browser inspection have been completed.

Initial setup by a repository admin: **Settings → Pages → Build and deployment →
Source: GitHub Actions**. Merge the reviewed workflow PR into `main` to publish
the initial build, or trigger **Publish PackShift on organization Pages** manually
on `main` from the Actions tab. Future `main` changes under `frontend/` or the
publishing workflow automatically rebuild and redeploy the static demo.

The Pages workflow runs the frontend presentation/provenance tests, builds with
`npm --prefix frontend run build -- --base=/gigafood/`, validates the output,
and deploys only the static `frontend/dist` artifact. Pull requests build and
test but **do not deploy**. The workflow never calls an LLM provider, deploys
FastAPI, or submits recorded snapshots as new calculations.

After the deployment, check the published page (not just CI): `RECORDED DEMO`
provenance, read-only static Selection controls, unavailable Comparison economics,
non-certifying engineering checklist, image loading, and all EN/RU/RO modes.
Backend evaluations require the [local demo](#reproduce-the-full-local-demo).

The separately maintained <https://denis100strike.github.io/packshift/> is a
**legacy preview**. This workflow does not modify that personal website or imply
that its deployed source is current.

## Static preview boundary

The [public preview](https://denis100strike.github.io/packshift/) is a separate hosted
static frontend. This source change does not deploy or establish its deployed revision.
Behavior described here applies when this frontend revision is built and served.

The client requests absolute same-origin `/api/v1/...` URLs. Only on `*.github.io`,
missing API routes (HTTP 404/405) or a network `TypeError` may select an exact recording.
HTTP 400/401/403/422/500/503, malformed successful responses and aborts stay errors;
they never become live successes or silently replay saved answers. On other hosts,
API failure stays unavailable, including Recommendation.

| Operation | Recorded support | Input boundary |
| --- | --- | --- |
| Health and scenario discovery | `staticApiSnapshot.json` | Saved health and scenario list; no live availability claim |
| Comparison | Two exact IDs | `cchbc-500ml-rpet-transition`, `deli-pp-to-rpet-transition` |
| Portfolio listing/detail | `faerch-deli-trays` | Read-only default assessment |
| Portfolio evaluate | Only an empty request may select the default recording | Any supplied override, including volume, temperature, microwave or context, requires the backend; static controls are disabled |
| Recommendation catalogues | `offlineRecommendationData.json` | Saved products, candidates, configurations and sources |
| Recommendation evaluate | Eight recorded product/workflow pairs | `P1`–`P4` × `POST_COOK_HOT_HOLD_6H` / `LITERAL_OVEN_250C_THEN_HOLD`; a custom configuration requires the backend |
| Comparison economics | None | Requires a connected backend; controls disabled for recorded Comparison |

Empty, malformed and unmatched IDs never select a default. A context without a
recording is unavailable. **Reload defaults / check backend** fetches Selection defaults
again; it does not submit custom overrides. Recommendation **Retry** reloads catalogues
and the selected product/workflow, preserving valid selections. Selection results describe
the last submitted scenario; editing draft fields requires another evaluation.

## Recording identity

- [staticApiSnapshot.json](../frontend/src/api/staticApiSnapshot.json) retains its saved
  PUBLIC health, two comparisons and Faerch assessment. No capture date is supplied.
- [offlineRecommendationData.json](../frontend/src/api/offlineRecommendationData.json)
  retains schema `htf03.recommendation.v1`, dataset `HTF-03-canonical-packaging`, research
  cutoff `2026-09-26` and source revision
  `a8445f85c4ad8e09addb858a3bac9d15583c0b6e1b9828226475ed33d7310e15`.
  The UI preserves these identifiers and explicitly separates research cutoff from
  recording time. It does not invent a new snapshot timestamp.
- Backend evidence paths and source numerical values are unchanged. PUBLIC, ESTIMATED,
  ASSUMED and USER_PROVIDED keep their existing meanings.

## Concept presentation and calculations

The default physical showcase is labelled **ILLUSTRATIVE CONCEPT**. Reference images
do not establish that the exact proposed PackShift configuration was manufactured,
tested or approved. The proposed 250°C oven workflow, film cooling, material composition,
food-contact migration/PFAS, seam fit, leakage, cleaning/reuse and local collection all
require configuration-specific documentation and testing. No guaranteed recycling rate,
bin color, absence of migration, manufacturing readiness or commercial benefit is asserted.

Radar values remain the existing manually assigned 0–100 judgments, visibly identified
as illustrations rather than measured performance or independent ratings. Layer dimensions
are proposed design assumptions. Supplier names are investigation leads, not qualified
partners; invented supplier-specific prices, MOQs, dates and guarantees are removed.

The browser slider retains its existing arithmetic and range: 5,000–100,000 monthly
units; 32 g incumbent, 2.8 g pouch, 0 g single-use plastic in the tray scenario. It
excludes the reusable lid, coatings, losses and lifecycle effects. Price assumptions
are $0.15–$0.35 / $0.25–$0.40 with fixed 4.6 RON/USD conversion. These are visibly
fixed inputs, not current quotes/exchange rates, measured environmental savings or
the backend Comparison economics calculation.

The historical `ComplianceCertificateModal.tsx` filename now renders **Engineering
Qualification Checklist — Concept Only**. It contains outstanding measurements/documents,
future qualification steps and an evidence-boundary link. Fictional lab identities,
certificate IDs, measured results, signatories, dates and approval/verification artifacts
are removed. The same non-certifying content is retained in print/PDF, with its explicit
no-conformity-approval statement. The older Russian portfolio remains historical material,
not a qualification record.

## Reproduce the full local demo

Requires Python 3.11+, Node 22.12+, and npm. From the repository root in PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install -e './backend[test]'
npm --prefix frontend ci
.\scripts\demo.ps1 -Check
.\scripts\demo.ps1
```

POSIX equivalents use `.venv/bin/python`, `bash scripts/demo.sh --check`, and
`bash scripts/demo.sh`. No provider key is needed. Ports 8000/5173 must be free.
The launcher selects absolute PUBLIC A-core/Selection paths, starts both services,
and checks HTTP evidence identity, portfolio evaluation, recommendation availability,
frontend reachability, and proxy behavior before `PACKSHIFT DEMO READY`. `-Check`
stops the services after preflight; the normal launcher stays running until Ctrl+C.
Run the existing verify script separately when the full test/build suite is needed.

The UI initially opens the concept showcase. Choose **Find packaging** for
Recommendation, **Browse packaging** for Selection, or **Compare plastic use** for
Comparison (labels vary by language). Backend-backed calculations and six-gate
recommendation semantics are unchanged. No provider key is needed.

Manual backend startup without evidence overrides uses ILLUSTRATIVE A-core evidence
and PUBLIC Selection, unlike the presentation launcher. A-core health alone does not
establish readiness of the other endpoints. Invalid evidence fails the affected endpoint;
HTTP 500/503 is not hidden by a saved frontend response.

## Verification

`scripts/verify.sh` / `scripts/verify.ps1` run backend tests, `npm test`, production build
and whitespace checks. `npm test` uses the existing Node/esbuild toolchain for presentation
and provenance/static-boundary regressions; it adds no test framework.

Optional browser checks use an already available Playwright browser library. After the
production build and local PUBLIC demo startup:

```powershell
$env:PACKSHIFT_PLAYWRIGHT_MODULE = '<path to installed @playwright/test>'
$env:PACKSHIFT_BROWSER_OUTPUT = '<external output directory>'
node frontend/tests/browser.mjs
```

The browser harness serves the local production assets on synthetic `*.github.io` and
localhost origins through request routing. Live routes proxy the actual local PUBLIC API;
failures/delays are controlled. It does not deploy or verify the currently hosted preview.
It covers source labels, static controls, real overrides/economics, outages/recovery,
abort/races, localization, checklist focus/printing and mobile layout. Browser artifacts
default to `.browser-results/` outside the frontend; use an external output directory
when keeping the worktree clean. CI runs the deterministic Node checks and full demo
preflight; browser verification is a separate optional run.

Physical qualification, actual supplier terms and production readiness remain outside
the conclusions of software tests.
