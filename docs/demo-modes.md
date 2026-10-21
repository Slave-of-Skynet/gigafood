# PackShift demo modes and recorded-response disclosure

[Project](../README.md) · [Engineering case study](portfolio.md)

## Public hosted preview

<https://denis100strike.github.io/packshift/> is a **static frontend preview**. A
22 October 2026 browser inspection returned HTTP 200 for the page, while same-origin
`/api/v1/` reads returned 404 and recommendation POST returned 405. The interface still
displayed content. This is evidence of the observed hosted behavior, not a live FastAPI
backend or an uptime guarantee. Its deployed SHA was not established.

The behavior below was traced at organization-repository baseline
`b6d8df2064d753a283cccb5b535a5bbe06acd3b0`; future deployments may differ.

The [client](../frontend/src/api/client.ts) first requests absolute same-origin
`/api/v1/...` URLs, not an API under the `/packshift/` path. On `*.github.io`, an HTTP
error or caught fetch failure can return a matching committed snapshot instead. The
response is not newly evaluated by Python.

| UI/API operation | Static fallback | Input boundary |
| --- | --- | --- |
| Health and scenario discovery | `staticApiSnapshot.json` | Saved PUBLIC demo state, not current backend availability |
| Comparison | Saved comparison | Only `cchbc-500ml-rpet-transition` and `deli-pp-to-rpet-transition` |
| Portfolio discovery/detail | Saved portfolio listing/assessment | `faerch-deli-trays` |
| Portfolio evaluate POST | Same saved portfolio detail | Annual units, temperature, and microwave overrides are **not recalculated** in the static resolver |
| Recommendation catalogues | `offlineRecommendationData.json` | Saved products, candidates, configurations, and sources |
| Recommendation evaluate POST | Lookup by product/workflow | `P1`–`P4` × `POST_COOK_HOT_HOLD_6H` or `LITERAL_OVEN_250C_THEN_HOLD`; other request fields do not drive a new calculation |
| Comparison economics POST | No static fallback | Requires a working backend; an API failure remains an error |

Unknown comparison/portfolio IDs have no matching fallback and remain errors after a
failed API call. The recommendation lookup returns `null` for an absent saved context;
it cannot synthesize an assessment. A saved health `READY` means only that a recorded
payload says READY, not that any backend has just passed its health check.

## Fallback also affects local recommendation

[RecommendationView](../frontend/src/components/RecommendationView.tsx) initializes
catalogues and a default assessment from saved data before API completion. It also
restores saved product/workflow assessments after errors **on any hostname**, independently
of the client's GitHub Pages rule. Successful API responses can replace that data.
There is no reliable live/recorded status in this flow; source research labels do not
disclose transport mode. This documentation adds disclosure in the repository, not in
the runtime UI.

Outside GitHub Pages, Comparison and Selection normally expose request errors rather
than using the client's static resolver. A failed recommendation request can still
appear successful because of the component-level fallback. Do not use continued UI
rendering as evidence of backend availability or validation of a changed scenario.

## Showcase calculations and presentation caveats

The default [Grill & Oven Pouch showcase](../frontend/src/components/UniversalPouchShowcase.tsx)
is a concept presentation. Its browser-side slider recomputes illustrative arithmetic
using a fixed 32 g incumbent and 2.8 g bag / 0 g tray plastic assumptions, with fixed
price assumptions and a currency conversion factor. These are not measurements of the
selected canonical candidate, supplier quotes, or actual Profi economics. This calculator
is separate from the Comparison economics endpoint.

Manual radar scores, thermal/recyclability assertions, and the
[compliance-passport simulation](../frontend/src/components/ComplianceCertificateModal.tsx)
must not be treated as laboratory evidence, certification, or implementation approval.
The modal includes `VERIFIED` / `250°C PASS` presentation text; this documentation review
did not establish primary qualification documents for those exact claims/configurations.
The existing Russian portfolio write-up is historical presentation material, not the
current evidence contract. No additional customer or private research material is
published by this PR.

## Snapshot identity and provenance

- [staticApiSnapshot.json](../frontend/src/api/staticApiSnapshot.json) contains saved
  health, two comparisons, and the Faerch portfolio. Health records evidence version
  `1.0` and PUBLIC / not-Profi disclosure; no snapshot-generation timestamp is provided.
- [offlineRecommendationData.json](../frontend/src/api/offlineRecommendationData.json)
  declares schema `htf03.recommendation.v1`, dataset `HTF-03-canonical-packaging`, research
  cutoff `2026-09-26`, and source revision
  `a8445f85c4ad8e09addb858a3bac9d15583c0b6e1b9828226475ed33d7310e15`.
  That metadata identifies recorded research, not capture time or present supplier capability.
- Local backend startup loads [PUBLIC comparisons](../data/evidence/public-packaging.json),
  [Selection portfolios](../data/evidence/selection-portfolios.json), and the
  [HTF-03 research/projection](evidence/htf-03/) through their respective validators.
  PUBLIC, ESTIMATED, ASSUMED, and USER_PROVIDED values retain their different meanings.

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

The UI starts with the physical-concept showcase. Choose **Find packaging** for
recommendation, **Browse packaging** for Selection, or **Compare plastic use** for
Comparison (labels vary by language). With the backend healthy, Selection overrides
and Comparison economics are actually evaluated by their Python services. Recommendation
uses product/workflow/configuration evidence; its component fallback caveat still applies.

Manual backend startup without overrides uses ILLUSTRATIVE A-core evidence and PUBLIC
Selection, unlike the presentation launcher. A-core health does not establish Selection
or recommendation readiness. Invalid backend packs fail their affected endpoints rather
than silently replacing the evidence; the frontend fallback can mask that failure.

## Proposed product follow-ups — not implemented here

1. Display live, loading, recorded, and unavailable modes with snapshot date/version;
   do not mask server validation errors as successful recommendations.
2. Disable unsupported static scenario overrides or disclose that they replay defaults.
3. Mark illustrative slider/radar values at their point of use and bind every physical
   qualification claim to configuration-specific primary evidence; make the passport
   simulation unmistakably non-certifying.

These require a separately authorized runtime/UI change. This PR changes documentation only.
