# PackShift — product canon

Read with the [challenge and source hierarchy](challenge_canon.md),
[decision policy](decision_policy.md) and [open questions](open_questions.md).

## Thesis and user hypothesis

**TEAM_DECISION:** PackShift is an evidence-aware Packaging Transition Copilot that
compares current packaging against a candidate transition, computes defensible
virgin-plastic deltas from explicit inputs, exposes evidence provenance and
uncertainty, and refuses unsupported conclusions.

**INFERENCE — primary user hypothesis:** A packaging/sustainability specialist
preparing a transition for review with procurement and QA could use the comparison.
The actual Profi decision owner and workflow step are UNKNOWN (mentor Q3).

## Committed A-core

**OBSERVED_IMPLEMENTATION**, base `a1b938d0784bb36779172d26a80c053d6d05e56a`:

```text
current and candidate packaging
  → explicit plastic component masses + recycled fractions
  → deterministic virgin-plastic calculation
  → current vs candidate delta
  → provenance + evidence state + generic constraint findings
  → user-visible result
```

FastAPI / Pydantic, React / TypeScript / Vite, versioned JSON evidence and a
deterministic calculation service implement one comparison. Routes:

- `GET /api/v1/health`
- `GET /api/v1/scenarios`
- `GET /api/v1/scenarios/{id}/comparison`

Strict evidence validation loads an atomic startup snapshot. Missing/unreadable/invalid
evidence fails closed with 503, including explicitly configured invalid paths; there
is no silent fallback. Valid evidence with missing numeric values produces
`INSUFFICIENT_DATA`, null unavailable metrics and missing-field findings. Complete
numeric inputs produce `CALCULATED` / `INDICATIVE`. The UI receives inputs and
provenance and shows generic suitability findings, loading, errors and retry.
The existing UI title remains GigaFood and API title GigaFood A-core; PackShift is
the canonical product name. CANON-01 does not change those runtime strings.

Source pointers: [architecture](../architecture.md), [domain contracts](../../backend/app/domain/packaging.py),
[startup/API](../../backend/app/main.py), [loader](../../backend/app/runtime/context.py),
[calculation](../../backend/app/services/virgin_plastic.py), [UI](../../frontend/src/pages/HomePage.tsx).

## Evidence identity and public cases

**OBSERVED_IMPLEMENTATION:** Both files exist; NDR-01 added the public pack without
replacing the illustrative fixture or changing the runtime default.

| Identity | Repository state / meaning |
| --- | --- |
| `ILLUSTRATIVE` | [demo-packaging.json](../../data/evidence/demo-packaging.json): synthetic fixture; default at startup |
| `PUBLIC` | [public-packaging.json](../../data/evidence/public-packaging.json): curated public, source-attributed examples; explicitly selectable by environment variable |
| `PROVIDER` | Actual attributed provider data; no Profi provider dataset is present |

`PUBLIC ≠ PROVIDER`; `ILLUSTRATIVE ≠ PUBLIC`. Every numeric input has provenance;
source availability does not verify it. See [evidence semantics](../evidence_semantics.md)
and the full [NDR-01 ledger](../evidence/NDR-01-public-evidence-pack.md).

**PUBLIC_EVIDENCE / observed calculation from the committed JSON**, not independently
revalidated manufacturer specifications or Profi packaging:

| Case | Current virgin g/unit | Candidate virgin g/unit | Reduction g/unit | Reduction % |
| --- | ---: | ---: | ---: | ---: |
| A: PET bottle transition | 22.0 | 2.5 | 19.5 | ≈88.64% |
| B: prepared-food container transition | 14.8 | 2.4 | 12.4 | ≈83.78% |

Both results remain `CALCULATED` / `INDICATIVE`, over the components represented
in the JSON. NDR-01 reports excluded bottle labels/adhesives and a separate current
container lid; these totals must not be promoted to verified complete-package
inventories. Schema validation cannot prove inventory completeness or comparable scope.

Case B's recorded use envelopes differ materially. NDR-01 attributes a maximum
70°C for 2 h and no microwave use to the candidate, versus a hot-fill (up to 95°C)
and microwave reheating context for the demonstrated prepared-food scenario.
The runtime evaluates these constraints in a bounded operational eligibility gate:
candidate capabilities (sourced from manufacturer datasheets) are compared against
explicit scenario operational requirements (clearly marked as demonstration assumptions,
not Profi provider requirements). Because candidate maximum temperature (70°C) is
below required (95°C) and the candidate is not microwave safe, the operational gate
evaluates to `BLOCKED`. Simultaneously, the virgin-plastic calculation remains
`CALCULATED` / `INDICATIVE` (12.4 g / 83.78% reduction on represented components),
demonstrating that theoretical environmental benefit does not imply operational eligibility.
The generic `food-contact-suitability` finding remains `REVIEW_REQUIRED` / `NOT_VERIFIED`
as an advisory disclosure.

## Demo claims and non-features

**TEAM_DECISION — allowed:** Show explicit inputs, represented-component scope,
deterministic per-unit delta, dataset identity, provenance and uncertainty. Demonstrate
refusal on missing calculation inputs (`INSUFFICIENT_DATA` without false operational block).
Present Case B as a live demonstration of the bounded operational eligibility gate
blocking an operationally incompatible candidate despite attractive theoretical savings.
Use the [README runbook](../../README.md) to select either evidence pack.

**TEAM_DECISION — not allowed:** Claim actual Profi packaging/savings; verified
complete-package savings from incomplete inventories; guaranteed safety, shelf life,
legal compliance, supplier/procurement approval or implementation approval; a universal
drop-in replacement; annual Profi impact without sourced volume; or that public inputs
are automatically verified. Do not claim the bounded gate constitutes a comprehensive
packaging qualification or certification engine.

**OBSERVED_IMPLEMENTATION — absent:** Portfolio ranking, annual-volume impact,
costs/ROI, LCA/CO2 engine, legal certification, comprehensive packaging qualification engine,
database/accounts, supplier integration, AI/LLM runtime and production deployment.
PackShift is decision support, not a certification engine or an LCA oracle, and
must not fabricate commercial savings.
