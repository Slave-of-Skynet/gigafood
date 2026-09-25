# Evidence semantics — protected shared surface

## Value origin

| Origin | Meaning |
| --- | --- |
| OBSERVED | Recorded observation/measurement; verification remains separate |
| USER_PROVIDED | Entered by a user |
| MANUFACTURER_SUPPLIED | Attributed to manufacturer documentation |
| CALCULATED | Deterministically derived from explicit inputs; never verification of those inputs |
| ESTIMATED | Approximation with stated method/limitations |
| ASSUMED | Explicit scenario assumption, not an observed fact |

Every mass/fraction field includes value (nullable) and provenance with origin,
verification_state, source_reference and note. Fixture references identify synthetic
inputs; they are not public citations. A null value's provenance describes the input slot
and why it is unavailable; it does not supply a numerical assumption.

## Verification / decision states

| State | Meaning |
| --- | --- |
| SOURCE_AVAILABLE | A source exists; its existence alone does not establish correctness |
| VERIFIED | Explicit scoped verification backed by evidence; never assigned by the demo |
| NOT_VERIFIED | Not established; does not mean false or unsafe |
| INSUFFICIENT_DATA | Necessary data unavailable; requested result cannot be fabricated |
| INDICATIVE | Calculation useful for exploration, with decision limitations |

The computation always emits INDICATIVE when calculable, and INSUFFICIENT_DATA
otherwise. `origin: CALCULATED` describes the derivation method even when null metrics
indicate that it cannot be completed. `status` explicitly says whether it completed.
Neither food_contact nor use_context proves suitability. Constraint findings do not
certify food safety, shelf life, operations or legal compliance.

Unknown is never zero. Missing mass or recycled fraction blocks the corresponding
package total and transition delta. Explicit zero recycled fraction is valid; zero mass
is invalid. A zero current virgin total makes percentage N/A. Annual impact is absent.

## Dataset identity

- PROVIDER means actual attributed provider data, requiring supplied provenance.
- PUBLIC means source-attributed public evidence, not privileged provider data.
- ILLUSTRATIVE means synthetic demonstration assumptions, not factual recommendations.

The ARC-01 file is ILLUSTRATIVE, NOT PROFI PROVIDER DATA. No input or suitability
claim is marked VERIFIED. Replacing it with public/provider data requires evidence
curation and Integrator review; changing a label cannot establish verification.

NDR-01 added [public-packaging.json](../data/evidence/public-packaging.json) as a
PUBLIC pack alongside the ILLUSTRATIVE fixture; it did not replace the runtime
default. No Profi PROVIDER dataset is present. Its source-attributed inputs remain
SOURCE_AVAILABLE and its calculable outputs INDICATIVE, not VERIFIED. See the
[ledger](evidence/NDR-01-public-evidence-pack.md) for source scope and excluded
components. Validation does not establish inventory completeness.

The [decision policy](canon/decision_policy.md) separates calculation, eligibility
and approval, including UNKNOWN versus demonstrated incompatibility. It is future
product policy, not a change to current enums, contracts or generic findings.
