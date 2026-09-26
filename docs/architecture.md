# PackShift architecture

Product boundary: A-core current → candidate comparison plus curated Selection
portfolio evaluation, prioritizing virgin-plastic reduction. Results are evidence-aware decision support, not approval to implement.

```text
versioned evidence JSON
  → strict Pydantic domain validation
  → startup in-memory runtime snapshot
  → pure virgin-plastic service + constraint findings
  → FastAPI response models / OpenAPI
  → typed fetch client → React loading / error / result view
```

## Responsibilities and shared surfaces

- `backend/app/domain`: strict input/output contracts; rejects extra keys, invalid
  numbers, duplicate IDs and empty component lists. Every numerical and decision-critical
  constraint input carries provenance. Includes `OperationalRequirements` on Scenario
  and `PackageCapabilities` on Package.
- `backend/app/services/virgin_plastic.py`: pure deterministic calculation and bounded
  operational eligibility gate evaluation; no IO or web calls.
- `backend/app/services/selection.py`: additive comparability, guarded per-unit delta,
  independent eligibility via A-core, deterministic grouping, next action and optional
  hypothetical annual impact. No global ranking or optimizer.
- `backend/app/runtime/context.py`: independently validates scenario and portfolio
  startup snapshots; a portfolio failure does not disable valid A-core evidence.
- `backend/app/main.py`: application factory, lifespan, five GET routes and one
  stateless POST evaluation route (no persistence).
  A separate routes module adds no value at this size.
- `data/evidence/demo-packaging.json`: schema v1.0, two explicitly synthetic scenarios.
- `data/evidence/public-packaging.json`: NDR-01 public evidence, two source-attributed
  comparisons. Select with `GIGAFOOD_EVIDENCE_PATH`; the illustrative default is unchanged.
- `data/evidence/selection-portfolios.json`: curated PUBLIC portfolio selected by
  `GIGAFOOD_PORTFOLIOS_PATH`; no actual Profi provider volume.
- `frontend/src/api`: TypeScript mirror of the shared Pydantic contract and fetch client.
- `frontend/src/pages/HomePage.tsx`: service state, selection, result, evidence and retry.
  `components/SelectionView.tsx` maintains independent discovery/evaluation state,
  presents backend output and submits optional annual units. `EvidenceDetails.tsx`
  shares provenance views between modes. Aborted requests cannot replace newer results.
  UI only formats numbers and sign labels; it never recalculates business values.
- `scripts/demo.ps1` / `demo.sh` delegate lifecycle and real HTTP preflight to
  `demo.py`: explicit PUBLIC packs, strict ports, both services and cleanup.

## API boundary

| Route | Successful response | Failure |
| --- | --- | --- |
| `GET /api/v1/health` | 200 Health: READY, evidence version/kind/disclosure | 503 Health: UNAVAILABLE |
| `GET /api/v1/scenarios` | 200 Evidence including current/candidate inputs | 503 detail EVIDENCE_UNAVAILABLE |
| `GET /api/v1/scenarios/{id}/comparison` | 200 Comparison with source scenario and constraints | 404 SCENARIO_NOT_FOUND; 503 EVIDENCE_UNAVAILABLE |
| `GET /api/v1/portfolios` | 200 list of PortfolioSummary | 503 PORTFOLIOS_UNAVAILABLE |
| `GET /api/v1/portfolios/{id}` | 200 SelectionResponse with default requirements | 404 PORTFOLIO_NOT_FOUND; 503 PORTFOLIOS_UNAVAILABLE |
| `POST /api/v1/portfolios/{id}/evaluate` | 200 SelectionResponse | 422 invalid request; 404 unknown ID; 503 unavailable pack |

Incomplete evidence is a valid 200 business response with `INSUFFICIENT_DATA` and
null unavailable metrics, not a transport failure. Health READY means evidence loaded,
not verified packaging or Selection readiness. Selection discovery must be requested
separately. POST evaluates request data without mutating the snapshot.

## Deterministic boundary

For every listed plastic component: `virgin_i = plastic_mass_g_i × (1 - recycled_content_fraction_i)`.
`virgin_pack_g = sum(virgin_i)`; `reduction_g = current - candidate`;
`reduction_pct = reduction_g / current × 100`. Current zero makes percentage null.
Negative reduction is retained. Missing mass/fraction yields no package total;
either package unknown yields no delta. A known other-package total may still be returned.
Fraction must be within [0,1], mass strictly positive, numbers finite. Rounding is display-only.
Components in v1 are plastic-bearing components; mass means plastic mass, not total material
mass. The curator must supply a complete component inventory. An empty list is rejected,
not interpreted as a verified plastic-free package. Fully recycled plastic can produce zero.

## Evidence, constraints and failure

Provenance and verification are separate axes; CALCULATED never verifies inputs.
`ConstraintFinding` exposes constraint_id, status (REVIEW_REQUIRED/BLOCKED), reason,
nullable source_reference and verification_state. Findings are separated into advisory
disclosures (`food-contact-suitability`) and operational gate findings
(`thermal-envelope-incompatibility`, `microwave-reheating-incompatibility`,
`thermal-envelope-verification`, `microwave-reheating-verification`).
Aggregated `eligibility_status` is derived solely from operational gate findings:
BLOCKED if any operational incompatibility is demonstrated, REVIEW_REQUIRED if
requirements/capabilities are unmodeled or unverified, and ELIGIBLE when evaluated
requirements and candidate capabilities are verified and compatible. Missing calculation evidence produces `INSUFFICIENT_DATA`
for environmental calculation, never an operational BLOCKED.

Missing, unreadable or invalid scenario evidence makes A-core routes unavailable
(503). Missing/invalid portfolio evidence independently makes Selection unavailable.
The frontend exposes both availability states and retries separately.
No fallback dataset, partial load, automatic reload or hidden repairs. A validated snapshot
remains stable until restart. Logs identify error class without publishing source data.
Vite proxies API calls on localhost; no CORS dependency or production hosting is introduced.

## Selection and annual-impact boundary

`SelectionMetadata` requires an exact recycled-content point value before article
calculation. Missing/non-point PCR evidence yields N/A. Boundary mismatch withholds
transition delta while known individual totals may remain visible. Comparability
qualifiers and operational requirements retain their provenance.

Grouping is deterministic: non-BLOCKED/CALCULATED, non-BLOCKED/INSUFFICIENT_DATA,
then BLOCKED; source order is preserved within groups. This is not a ranked winner.
`NextAction` is backend-authored evidence/QA guidance. The client displays it directly.

Optional positive integer `annual_units` produces linear signed annual kg deltas,
explicitly hypothetical and user-supplied. Missing calculation evidence produces
null annual metrics. BLOCKED calculated results remain visible with `is_actionable=false`.
INT-R3-F1 corrects only their disclosure wording by sign: saving for positive,
no reduction for zero, increased use for negative. Arithmetic, grouping and
non-BLOCKED actionability are unchanged. No value grants implementation approval.

## Non-goals and extension

No global ranking/optimization, actual Profi annual impact, costs, LCA/CO2, legal certification, risk or
sustainability score, database/ORM, accounts, Docker, external APIs, ingestion framework,
LLM/ML, supplier integration, PDF extraction, deployment or final visual design.
Future ranking would require a separate contract
and the [eligibility/evidence gate](canon/decision_policy.md). The bounded operational gate
evaluates modeled thermal and microwave dimensions; it is not a complete packaging
qualification or certification engine. See [current product canon](canon/product_canon.md).

Smart Harvest / `training_agrifood` is rehearsal only. No crop, telemetry, evaluation or
old sponsor semantics belong here. No historical repository code was imported.

## Parallel handoff boundaries

Igor: runtime/service; Nicolae: evidence; Denis: comparison UI; Alisa: acceptance/QA;
Vladimir: shared contracts/integration/demo. Changes to domain, mirrored TypeScript,
schema/version, formulas, API or dependencies need Human Integrator coordination.
TypeScript types are a manual mirror, not runtime payload validators or generated bindings.
