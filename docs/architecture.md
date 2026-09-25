# ARC-01 architecture

Product boundary: one current → candidate packaging comparison, prioritizing virgin
plastic reduction. Results are evidence-aware decision support, not approval to implement.

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
  numbers, duplicate IDs and empty component lists. Every numerical input carries provenance.
- `backend/app/services/virgin_plastic.py`: pure deterministic calculation; no IO or web calls.
- `backend/app/runtime/context.py`: validates the complete evidence file atomically at startup.
- `backend/app/main.py`: small application factory, lifespan and three read-only routes.
  A separate routes module adds no value at this size.
- `data/evidence/demo-packaging.json`: schema v1.0, two explicitly synthetic scenarios.
- `data/evidence/public-packaging.json`: NDR-01 public evidence, two source-attributed
  comparisons. Select with `GIGAFOOD_EVIDENCE_PATH`; the illustrative default is unchanged.
- `frontend/src/api`: TypeScript mirror of the shared Pydantic contract and fetch client.
- `frontend/src/pages/HomePage.tsx`: service state, selection, result, evidence and retry.
  Aborted requests cannot replace a newer selection. UI never recalculates business values.

## API boundary

| Route | Successful response | Failure |
| --- | --- | --- |
| `GET /api/v1/health` | 200 Health: READY, evidence version/kind/disclosure | 503 Health: UNAVAILABLE |
| `GET /api/v1/scenarios` | 200 Evidence including current/candidate inputs | 503 detail EVIDENCE_UNAVAILABLE |
| `GET /api/v1/scenarios/{id}/comparison` | 200 Comparison with source scenario and constraints | 404 SCENARIO_NOT_FOUND; 503 EVIDENCE_UNAVAILABLE |

Incomplete evidence is a valid 200 business response with `INSUFFICIENT_DATA` and
null unavailable metrics, not a transport failure. Health READY means evidence loaded,
not verified packaging. No mutation or future CRUD endpoints are frozen.

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
nullable source_reference and verification_state. The current generic suitability finding
is NOT_VERIFIED; missing required inputs attach a BLOCKED calculation finding.
This seam can accept cited reference findings later; it is not a regulation engine.

Missing, unreadable or invalid evidence makes the whole runtime unavailable (503).
No fallback dataset, partial load, automatic reload or hidden repairs. A validated snapshot
remains stable until restart. Logs identify error class without publishing source data.
Vite proxies API calls on localhost; no CORS dependency or production hosting is introduced.

## Non-goals and extension

No portfolio/ranking, annual volumes/impact, costs, LCA/CO2, legal certification, risk or
sustainability score, database/ORM, accounts, Docker, external APIs, ingestion framework,
LLM/ML, supplier integration, PDF extraction, deployment or final visual design.
Future direction: single comparison → curated portfolio ranking, under a separate contract
and the [eligibility/evidence gate](canon/decision_policy.md). Current generic findings
do not evaluate specific use-context incompatibilities. See [current product canon](canon/product_canon.md).

Smart Harvest / `training_agrifood` is rehearsal only. No crop, telemetry, evaluation or
old sponsor semantics belong here. No historical repository code was imported.

## Parallel handoff boundaries

Igor: runtime/service; Nicolae: evidence; Denis: comparison UI; Alisa: acceptance/QA;
Vladimir: shared contracts/integration/demo. Changes to domain, mirrored TypeScript,
schema/version, formulas, API or dependencies need Human Integrator coordination.
TypeScript types are a manual mirror, not runtime payload validators or generated bindings.
