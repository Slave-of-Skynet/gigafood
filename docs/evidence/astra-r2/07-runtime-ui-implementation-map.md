# ASTRA-R2 — Runtime / UI Implementation Map

> **Scope:** This document maps which ASTRA-R2 synthesized fields require DATA-ONLY changes, which
> require additive implementation effort, and which require Integrator approval. It does NOT implement
> any runtime, API, or UI changes. This PR is evidence/handoff only.

---

## DATA-ONLY changes

Changes that can be delivered by updating the accepted canonical dataset and display dataset, with no
code modification required. These are additive model_metrics fields that map directly to existing
EvidenceField rendering logic.

### C1–C5 candidate model_metrics (mass fields)

| Field | Current state | Proposed | Files affected |
|---|---|---|---|
| `C1.model_metrics.total_package_mass_g` | absent | add ASTRA-E069 | `docs/evidence/htf-03/HTF-03-canonical-packaging-dataset.json` |
| `C1.model_metrics.plastic_mass_g` | absent | add ASTRA-E070 | same |
| `C1.model_metrics.virgin_plastic_mass_g` | absent | add ASTRA-E071 | same |
| `C1.model_metrics.recycled_material_fraction` | absent | add ASTRA-E072 | same |
| `C1.model_metrics.renewable_material_fraction` | absent | add ASTRA-E074 | same |
| `C2.model_metrics.*` (5 fields) | absent | add ASTRA-E085–E089 | same |
| `C3.model_metrics.*` (5 fields) | absent | add ASTRA-E094–E098 | same |
| `C4.model_metrics.recycled_material_fraction` | absent | add ASTRA-E106 | same |
| `C4.model_metrics.renewable_material_fraction` | absent | add ASTRA-E107 | same |
| `C5.model_metrics.*` (5 fields) | absent | add ASTRA-E118–E122 | same |

### C6 configuration model_metrics

| Configuration | Fields | Files affected |
|---|---|---|
| C6-RO-P | total/plastic/virgin/recycled/renewable | `HTF-03-canonical-packaging-dataset.json` |
| C6-RO-W | same 5 fields | same |
| C6-RO-H | same 5 fields | same |
| C6-EU | same 5 fields | same |

### B1-ESTIMATED model_metrics

| Field | Current state | Proposed | Notes |
|---|---|---|---|
| `B1.estimated.complete_mass` | absent | ASTRA-E006 | Scenario mass; provider facts untouched |
| `B1.estimated.complete_cost` | absent | ASTRA-E017 | Scenario cost; provider facts untouched |

### New ASTRA-sourced calculations

All 553 new `ASTRA-E*` calculations from the ASTRA-R2 synthesis ledger can be appended to the
`calculations` array in the canonical dataset without modifying existing entries.
The existing 61 legacy calculations remain unchanged.

**Files:** `docs/evidence/htf-03/HTF-03-canonical-packaging-dataset.json`  
**Reference:** `docs/evidence/astra-r2/proposal/HTF-03-canonical-packaging-dataset.json`  
**Patch:** `docs/evidence/astra-r2/canonical-patch-proposal.json`

### New ASTRA-sourced sources

24 new `ASTRA-S*` source records from `new-sources.json` can be appended to the `sources` array.

---

## ADDITIVE IMPLEMENTATION

Changes that require exposing new modeled fields in runtime API or UI, but do not require semantic
redesign of the shared contract.

### Model cost fields (romania_unit_price / complete_cost)

The demo model computes `*.cost_net` (RON/pack) for all candidates and configurations. These fields
are not currently in the canonical schema `model_metrics`. Exposing them requires:

1. Adding `cost_net` as a recognized `model_metrics` slot in the schema documentation.
2. Wiring the new field to the existing `DISPLAY_WITH_QUALIFIER` rendering path in the frontend.
3. Ensuring the recommendation engine does not interpret modeled cost as a verified procurement price.

**Files to modify:**
- `docs/evidence/htf-03/HTF-03-canonical-packaging-dataset.json` — add cost field
- `docs/evidence/htf-03/HTF-03-prototype-display-dataset.json` — add display entry
- `backend/` — extend candidate schema to expose `model_metrics.cost_net` in API response
- `frontend/src/` — add cost display card with explicit ESTIMATED/ASSUMED qualifier badge

### Annual network scenario fields

The demo model computes `NETWORK.whole_annual`, `NETWORK.portions_annual`, `NETWORK.participating_locations`, etc. These are not currently surfaced in the runtime or UI. Exposing them requires:

1. A new `scenario` or `network_model` slot in the API response.
2. A UI panel for "network scenario assumptions" with full LOW/CENTRAL/HIGH and qualifier display.

**Files to modify:**
- `backend/` — add `/api/network-scenario` or embed in existing packaging response
- `frontend/src/` — add scenario panel component
- `docs/evidence/htf-03/HTF-03-canonical-packaging-dataset.json` — add scenario block

### Business case comparison fields

The demo model computes `*.vs.B1-ESTIMATED.*` incremental costs, reductions, and annual totals.
These are not currently in the API or UI. Exposing them requires:

1. A `business_case` block on each candidate/configuration in the API.
2. A UI comparison table with signed reduction and incremental cost.

**Files to modify:**
- `backend/` — extend candidate response to include business case metrics
- `frontend/src/` — add business case table component

### Geometry and procurement modeled fields

The demo model includes `dimensions`, `capacity_ml`, `industrial_moq`, `order_unit`, `lead_time` for all
candidates. These exist in the canonical schema but are not always populated. Populating them from the
ASTRA model requires:

1. Confirming the existing frontend rendering handles ASSUMED/ESTIMATED states correctly.
2. Committing the filled fields to the canonical dataset.

**Files to modify:**
- `docs/evidence/htf-03/HTF-03-canonical-packaging-dataset.json`
- `docs/evidence/htf-03/HTF-03-prototype-display-dataset.json`

---

## SHARED CONTRACT CHANGE

Changes that require explicit Integrator approval before implementation, because they affect the
semantics of the shared API/UI contract or introduce new enumeration values.

### New `plastic_accounting_scenario` pattern for C1/C5

C1 and C5 use a conservative accounting scenario where all cellulose liner/film is counted as the
plastic budget. This is distinct from `plastic_mass_g` (actual chemical plastic). The existing schema
supports this through `plastic_accounting_scenario`, but exposing it distinctly in the UI (separate
from the headline plastic figure) requires:

1. Integrator sign-off on how to present "accounting budget vs actual" to end users without confusion.
2. Potentially a new display policy value (`DISPLAY_ACCOUNTING_BUDGET`) or explicit UI label.
3. Agreement on whether the headline widget shows the accounting budget or the physical mass (currently
   C1/C5 have neither filled in the production dataset).

**Affects:** API schema contract, UI copy, recommendation logic epistemic boundary.

### C6 configuration-specific display routing

The current UI routes C6 as a single candidate. The ASTRA-R2 model produces separate metrics for
C6-RO-P, C6-RO-W, C6-RO-H, and C6-EU as independent configurations. Surfacing these distinctly
requires:

1. Integrator decision on whether C6 sub-configurations appear in the main comparison table,
   a separate details panel, or only in the qualification workflow.
2. Changes to the recommendation copy if sub-configurations have different outcomes.

**Affects:** API `configurations` endpoint semantics, UI routing, gate matrix display.

### Cost-per-kg-avoided display with undefined domains

The cost/kg avoided metric has mathematically undefined full-domain LOW/HIGH for candidates where
the central reduction crosses zero. Displaying this in the UI requires:

1. Integrator decision on display format: suppress LOW/HIGH, show "not applicable" tooltip, or
   show only central with clear caveat.
2. Confirmation that this does not violate the existing `hide_central_without_range = true` contract
   (it does — this needs explicit override or a new display policy).

**Affects:** `rendering_contract` in display dataset, frontend rendering logic.

---

## File surface map

| File | DATA-ONLY | ADDITIVE | CONTRACT |
|---|---|---|---|
| `docs/evidence/htf-03/HTF-03-canonical-packaging-dataset.json` | ✓ add ASTRA-E calcs, model_metrics, sources | ✓ add cost/network fields | ✓ accounting scenario pattern |
| `docs/evidence/htf-03/HTF-03-prototype-display-dataset.json` | ✓ add display entries for new model_metrics | ✓ add cost/network display | ✓ rendering contract change |
| `backend/` | — | ✓ API schema extension | ✓ new endpoints / field types |
| `frontend/src/` | — | ✓ new display components | ✓ copy/UX for undefined domains |
| `scripts/validate_htf03.py` | — | — | ✓ may need new policy values |

---

## Important constraints

1. **No runtime changes in this PR.** All code in `backend/` and `frontend/src/` is read-only from
   this research branch's perspective. The 162 existing backend tests must continue to pass unchanged.
2. **No gate outcome changes.** Hard gates in `product_candidate_gates` must not be modified by any
   data-only implementation step without an explicit new qualifying source.
3. **No epistemic promotion.** ESTIMATED model values may not be relabeled as OBSERVED_VERIFIED or
   DISPLAY_VERIFIED in the display dataset without a real measurement or supplier confirmation.
4. **C1/C5 plastic accounting cannot become the headline figure** without Integrator approval and
   explicit user-facing qualification language.
5. **C5 thermal CONFLICT must remain CONFLICT** until a nominated film grade with explicit six-hour
   qualification evidence is provided to the canonical dataset.
