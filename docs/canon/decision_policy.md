# PackShift — decision policy

**TARGET_CONTRACT — INT-HTF-04A:** For the HTF-03 recommendation transition, use
the [six-gate policy, evidence states and exact label mapping](../recon/INT-HTF-04A-canonical-runtime-transition.md#g4-bounded-recommendation-policy).
No current HTF-03 record is a qualified survivor. Qualification work priority is
separate from outcome; current UI outcomes remain QUALIFICATION REQUIRED or BLOCKED.
Estimates retain full bounds and assumptions; B1-ESTIMATED and B3 must never become
measured Profi facts. Failed/unknown gates cannot be offset by environmental metrics.
The transition proposes shared semantics for Integrator acceptance, not a runtime
change. Existing arithmetic and old Selection/economics behavior below remain protected.

Product policy for CANON-01, **not an implemented API contract**. Authority and
base: [challenge canon](challenge_canon.md). Implementation: [product canon](product_canon.md).

## Protected calculation and evidence semantics

**OBSERVED_IMPLEMENTATION:** The [existing service](../../backend/app/services/virgin_plastic.py)
uses these unchanged formulas for each listed plastic-bearing component:

```text
virgin_i = plastic_mass_g_i × (1 - recycled_content_fraction_i)
virgin_package = sum(virgin_i)
reduction_g = current_virgin - candidate_virgin
reduction_pct = reduction_g / current_virgin × 100
```

Unknown is never zero. Missing required numeric evidence blocks the corresponding
package total and delta; a known other-package total may remain available. Zero
recycled fraction is valid. Zero current virgin plastic makes percentage N/A;
negative reduction is retained; rounding is display-only. Input plastic mass must
be positive, recycled fraction within [0,1], and numbers finite. A complete component
inventory is the curator's responsibility; an empty inventory is rejected.

Preserve [evidence semantics](../evidence_semantics.md):

```text
CALCULATED ≠ VERIFIED
SOURCE_AVAILABLE ≠ VERIFIED
NOT_VERIFIED ≠ FALSE
missing ≠ 0
PUBLIC ≠ PROVIDER
ILLUSTRATIVE ≠ PUBLIC
```

## Environmental benefit, eligibility and approval

**TEAM_DECISION:** A calculated environmental benefit is not sufficient evidence
that a packaging transition is eligible, feasible or recommendable.

```text
environmental calculation ≠ candidate eligibility ≠ implementation approval
```

Use-context / hard-constraint eligibility must be evaluated separately before
environmental benefit can drive future recommendation or ranking. A calculable
delta can remain visible with its limitations; it does not become permission to use
the candidate. NDR-01 Case B exposes this distinction.

| Epistemic situation | Meaning | Policy implication |
| --- | --- | --- |
| UNKNOWN | No evidence establishes whether a required property is satisfied | Review / insufficient evidence; do not assume compatibility |
| Demonstrated incompatibility | Manufacturer evidence explicitly excludes a required use condition | Treat as incompatible for that stated context; do not flatten into mere missing evidence or a universal material verdict |

**OBSERVED_IMPLEMENTATION — BOUNDED OPERATIONAL GATE:** The runtime implements a
bounded operational eligibility gate that evaluates explicit operational requirements
(`operational_requirements` on `Scenario`) against candidate packaging capabilities
(`capabilities` on `Package`) across thermal envelope and microwave reheating dimensions.
Calculation status (`CALCULATED` vs `INSUFFICIENT_DATA`) and operational eligibility
(`ELIGIBLE`, `REVIEW_REQUIRED`, `BLOCKED`) are strictly independent axes. Missing
numerical calculation inputs do not fabricate an operational incompatibility.
Demonstrated incompatibilities yield `BLOCKED`. Unmodeled or unverified requirements
yield `REVIEW_REQUIRED`. Generic `food-contact-suitability` remains an advisory finding.

**OBSERVED_IMPLEMENTATION — SELECTION:** Portfolio assessments combine comparability,
calculation, independent eligibility and evidence-aware next action. Deterministic
grouping is implemented; global ranking and automatic approval are absent.

## Future ranking guard

**TEAM_DECISION:** No future ranking should order candidates purely by virgin-plastic
reduction when hard use-context constraints are unresolved or demonstrably incompatible.
Separate at least evidence completeness, hard eligibility/compatibility, environmental
benefit, and optional business/operational dimensions. Ranking is not implemented.
No scoring formula, new enum or schema is frozen here.

## Annual impact and human boundary

**TEAM_DECISION:** No annual Profi plastic savings without real sourced volume.
Per-unit reductions are defensible only within the sourced input/component scope.
Hypothetical volume can support an explicitly labelled hypothetical scenario, never
actual Profi impact.

**OBSERVED_IMPLEMENTATION:** Selection supports optional positive integer
`annual_units` supplied by the user and returns `AnnualImpactResult` with signed
annual kg values, status, `is_actionable` and disclosure. Missing calculation
evidence produces N/A. BLOCKED calculated annual results are theoretical /
non-actionable. Positive reduction may be called a saving; zero is no change;
negative means virgin-plastic use increases. INT-R3-F1 corrects disclosure wording
for BLOCKED zero/negative results without changing arithmetic or actionability.
Actual Profi annual volume/impact remains UNKNOWN — ASK MENTOR. The backend
`is_actionable` flag never grants QA, procurement or implementation approval.

**TEAM_DECISION:** The bounded operational eligibility gate evaluates only explicitly
modeled technical dimensions (thermal, microwave). Product output never grants
food-contact, shelf-life, supplier, procurement, legal or implementation approval.
Wider packaging qualification (barrier properties, line speeds, migration under specific
food matrices) remains outside current runtime scope. See [questions that unblock decisions](open_questions.md).
