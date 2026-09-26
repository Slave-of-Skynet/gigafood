# PackShift — product canon

Read with the [challenge and source hierarchy](challenge_canon.md),
[decision policy](decision_policy.md) and [open questions](open_questions.md).

## Thesis and user hypothesis

**TEAM_DECISION — VLD-MR1:** We propose a sustainable high-temperature food-packaging
concept for Profi; PackShift is its evidence-backed decision and demonstration
layer, showing scoped physical feasibility, virgin-plastic reduction, uncertainty
and the validation still needed, without certifying safety or granting
implementation approval.

**TARGET_DIRECTION:** Physical packaging is the proposed solution; software supports
its evidence and review. Feasibility is not subordinate to environmental arithmetic.
No material/candidate has been selected by this reconciliation. The previous
software-led thesis is superseded as the primary judging narrative; working
comparison, Selection and economic capabilities remain supporting assets.
See [VLD-MR1 requirements, preservation and gates](../recon/VLD-MR1-post-mentor-reconciliation.md).

**INFERENCE — primary user hypothesis:** A packaging/sustainability specialist
preparing a transition for review with procurement and QA could use the comparison.
The actual Profi decision owner and workflow step are UNKNOWN (mentor Q3).

## Committed A-core

**OBSERVED_IMPLEMENTATION:** A-core originated at CANON-01 base
`a1b938d0784bb36779172d26a80c053d6d05e56a`; current observations were inspected at
`e6b326317d11663a401ba4288c27f05853c10d15`, including Selection, INT-R3/INT-R4
integration and the implemented economic scenario.

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
The UI uses PackShift and the FastAPI display title is PackShift API. Legacy
`GIGAFOOD_EVIDENCE_PATH` and `GIGAFOOD_PORTFOLIOS_PATH` names remain unchanged.

Source pointers: [architecture](../architecture.md), [domain contracts](../../backend/app/domain/packaging.py),
[startup/API](../../backend/app/main.py), [loader](../../backend/app/runtime/context.py),
[calculation](../../backend/app/services/virgin_plastic.py), [UI](../../frontend/src/pages/HomePage.tsx).

## Current Selection MVP

**OBSERVED_IMPLEMENTATION:** Additive curated portfolio evaluation is implemented:
`GET /api/v1/portfolios`, `GET /api/v1/portfolios/{id}` and
`POST /api/v1/portfolios/{id}/evaluate`. The browser exposes a prominent Portfolio
Selection mode alongside Comparison, with independent availability and error states.
It shows baseline/candidates, component boundaries, comparability qualifiers,
environmental calculation, operational eligibility, missing evidence and backend
next actions. Candidate order is deterministic grouping, not global ranking.

Optional positive integer annual units are user-supplied hypothetical volume.
Annual kg results are calculated only when evidence permits; they never establish
actual Profi impact. BLOCKED annual results are theoretical and non-actionable.
The INT-R3-F1 disclosure fix preserves the sign: positive reduction, zero/no change,
or increased virgin-plastic use. No arithmetic or eligibility policy changed.

The committed PUBLIC Faerch portfolio has missing exact candidate PCR values.
CPET requests PCR evidence; APET is thermally blocked. Both environmental deltas
and annual numerical results are N/A. “Up to 70%” is not a point value. Synthetic
tests cover calculable annual scenarios without changing accepted public evidence.
The demo launcher explicitly selects PUBLIC A-core evidence and the committed
portfolio pack; normal runtime defaults remain unchanged.

## Current economic scenario

**OBSERVED_IMPLEMENTATION:** Comparison mode exposes
`POST /api/v1/scenarios/{id}/economics`, backed by
[economics.py](../../backend/app/services/economics.py) and
[EconomicScenarioView](../../frontend/src/components/EconomicScenarioView.tsx).
User-supplied costs, volume and optional transition cost produce hypothetical spend,
cost deltas and, where supported, annual virgin-plastic arithmetic/cost per kg avoided.
Inputs remain `USER_PROVIDED` / `NOT_VERIFIED`; operationally BLOCKED results remain
theoretical/non-actionable in the UI. This is not actual Profi pricing or full ROI/TCO.
The mentor's approximate +10–15% tolerance is context for later scenarios, not a
currently implemented acceptance threshold or a procurement commitment.

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

**TEAM_DECISION — post-mentor primary flow:** Physical problem → explicit requirements
→ researched physical concept → composition → technical evidence matrix → sustainability
/ virgin plastic → small-portion and whole-chicken feasibility → economics → remaining
UNKNOWN → next validation step. This is a planned flow; the committed UI and evidence
have not been changed by VLD-MR1.

**DEMOTE FROM PRIMARY DEMO:** The current Faerch portfolio and assumed 95°C/microwave
examples are retained as bounded runtime demonstrations. They do not demonstrate
the new high-temperature physical solution. A tray body's recorded 220°C capability
does not establish 250°C, window/seal compatibility or a 6 h condition. Bottle/cold
transition examples remain officially allowed, but are not the team's primary anchor.

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

**OBSERVED_IMPLEMENTATION — absent:** Global portfolio ranking, actual Profi annual impact,
actual Profi costs/full ROI, LCA/CO2 engine, legal certification, comprehensive packaging qualification engine,
database/accounts, supplier integration, AI/LLM runtime and production deployment.
PackShift is decision support, not a certification engine or an LCA oracle, and
must not fabricate commercial savings.

**TARGET_DIRECTION — not yet implemented:** Scoped thermal exposure, 6 h holding,
food-contact evidence, grease/oil barrier, recyclability, transparent viewing window,
composition/layers and both size formats need coordinated qualification coverage.
Current gate inputs remain temperature and microwave only; `food_contact` and the
generic advisory do not qualify safety. Current component mass is plastic mass,
not general material mass. No non-plastic representation, schema, enum or additional
gate is frozen here. Follow the [VLD-MR1 claims policy and dependency graph](../recon/VLD-MR1-post-mentor-reconciliation.md).
