# ASTRA-R2 — Demo Central Values

> **Scope:** Exact CENTRAL values recommended for the next implementation task. All values are
> engineering estimates (state noted). Use LOW/CENTRAL/HIGH from synthesis-ledger.json for full
> uncertainty treatment. These are point values for planning and UI design only.
>
> **Evidence states:**
> - `[ESTIMATED]` — model calculation with cited sources; falsifiable by measurement
> - `[ASSUMED]` — declared design assumption; no external empirical support
> - `[OV]` — OBSERVED_VERIFIED (inherited from existing canonical dataset)

---

## Baseline B1-ESTIMATED

The modeled incumbent rotisserie bag. Provider observations (virgin fraction = 1) are unchanged.
Scenario mass and cost are added by ASTRA-R2 modeling, not from Profi procurement records.

| Field | CENTRAL | Unit | State | Calculation |
|---|---:|---|---|---|
| total_package_mass_g | **6.50** | g | ESTIMATED | ASTRA-E006 |
| plastic_mass_g | **6.50** | g | ESTIMATED | ASTRA-E007 |
| virgin_plastic_mass_g | **6.50** | g | ESTIMATED | ASTRA-E008 |
| virgin_fraction | **1.000** | fraction | ASSUMED | ASTRA-E009 |
| recycled_material_fraction | **0.000** | fraction | ASSUMED | ASTRA-E010 |
| renewable_material_fraction | **0.000** | fraction | ASSUMED | ASTRA-E011 |
| complete_cost (net RON) | **0.723** | RON/pack | ESTIMATED | ASTRA-E017 |
| annual whole-chicken packages | **9,504,000** | packs/year | ESTIMATED | ASTRA-E025 |
| annual portions packages | **19,008,000** | packs/year | ESTIMATED | ASTRA-E023 |

> B1 mass range: LOW 2.59 g — CENTRAL 6.50 g — HIGH 12.46 g. The broad range reflects the
> unknown exact bag format; the range must not be collapsed to a point value.

---

## C1 Whole Chicken (Sacma B.Life Gaia format)

Compared to B1-ESTIMATED on the whole-chicken stream.

| Field | CENTRAL | Unit | State | Calculation |
|---|---:|---|---|---|
| total_package_mass_g | **20.11** | g | ESTIMATED | ASTRA-E069 |
| plastic accounting mass (all-liner) | **11.08** | g | ESTIMATED | ASTRA-E070 |
| virgin plastic accounting mass | **11.08** | g | ESTIMATED | ASTRA-E071 |
| renewable_material_fraction | **91.4%** | fraction | ESTIMATED | ASTRA-E074 |
| cost_net RON/pack | **1.483** | RON/pack | ESTIMATED | ASTRA-E084 |
| virgin plastic reduction vs B1 | **−4.58** g | g/pack | ESTIMATED | ASTRA-E444 |
| reduction % vs B1 | **−70.5%** | % | ESTIMATED | ASTRA-E445 |
| annual virgin avoided (whole stream) | **−14,514** | kg/year | ESTIMATED | ASTRA-E449 |
| annual incremental cost | **+2,408,685** | RON/year | ESTIMATED | ASTRA-E447 |
| cost premium | **+1.05 RON/pack** (+105%) | — | ESTIMATED | ASTRA-E446 |

> **Plastic accounting note:** The −4.58 g "reduction" is negative — C1 accounts for MORE virgin
> plastic than B1-ESTIMATED under the all-liner-counted convention. This is a model construction
> artifact. The high renewable content (91.4%) is the genuine environmental positive.
> Do not present C1 as a "virgin plastic reduction" candidate without this caveat.

---

## C5 Portions (BIOPAP LC SI-14 + compatible film)

Compared to B1-ESTIMATED on the portions stream.

| Field | CENTRAL | Unit | State | Calculation |
|---|---:|---|---|---|
| total_package_mass_g | **27.13** | g | ESTIMATED | ASTRA-E118 |
| plastic accounting mass (all-film) | **4.34** | g | ESTIMATED | ASTRA-E119 |
| virgin plastic accounting mass | **4.34** | g | ESTIMATED | ASTRA-E120 |
| renewable_material_fraction | **95.1%** | fraction | ESTIMATED | ASTRA-E122 |
| cost_net RON/pack | **2.673** | RON/pack | ESTIMATED | ASTRA-E131 |
| virgin plastic reduction vs B1 | **+2.16** g | g/pack | ESTIMATED | ASTRA-E492 |
| reduction % vs B1 | **+33.3%** | % | ESTIMATED | ASTRA-E493 |
| annual virgin avoided (portions stream) | **+13,705** | kg/year | ESTIMATED | ASTRA-E496 |
| annual incremental cost | **+12,352,813** | RON/year | ESTIMATED | ASTRA-E494 |
| cost premium | **+1.95 RON/pack** (+270%) | — | ESTIMATED | ASTRA-E494 |
| cost per kg virgin avoided | **~901** | RON/kg | ESTIMATED | ASTRA-E494 / ASTRA-E492 |

> **Thermal CONFLICT:** BIOPAP LC body claims 175 °C (2016) vs 185 °C (2026). Six-hour hold at
> 90 °C requires a co-developed film not yet nominated. This CONFLICT is retained from the canonical
> HTF-03 dataset and must not be changed by implementation without new qualifying evidence.

---

## C6 250 °C Fallback (C6-RO-H — E-ambalaj body + post-oven lid)

Compared to B1-ESTIMATED on the whole-chicken stream, LITERAL_OVEN_250C_THEN_HOLD workflow.
**Gate outcome: BLOCKED** (unqualified lid).

| Field | CENTRAL | Unit | State | Calculation |
|---|---:|---|---|---|
| total_package_mass_g | **61.97** | g | ESTIMATED | ASTRA-E162 |
| plastic_mass_g (lid + ancillary) | **28.11** | g | ESTIMATED | ASTRA-E163 |
| virgin_plastic_mass_g | **28.11** | g | ESTIMATED | ASTRA-E164 |
| recycled_material_fraction (body Al) | **20.8%** | fraction | ESTIMATED | ASTRA-E166 |
| renewable_material_fraction | **0%** | fraction | ASSUMED | ASTRA-E167 |
| cost_net RON/pack | **2.032** | RON/pack | ESTIMATED | ASTRA-E170 |
| virgin plastic reduction vs B1 | **−21.61** g | g/pack | ESTIMATED | ASTRA-E528 |
| reduction % vs B1 | **−332.5%** | % | ESTIMATED | ASTRA-E529 |
| annual incremental cost | **+4,146,336** | RON/year | ESTIMATED | ASTRA-E530 |
| cost per kg virgin avoided | **N/A** | — | — | No central avoidance |

> **Gate outcome is BLOCKED.** The aluminium body alone can withstand 250 °C. The post-oven clear lid
> is modeled at 60–70 °C thermal ceiling. The assembled system cannot pass the LITERAL_OVEN_250C_THEN_HOLD
> gate without a qualified oven-safe lid. No RON/kg avoided ratio is defined because C6-RO-H uses
> MORE virgin plastic than the baseline in every scenario (ratio domain is non-positive).

---

## Notes on implementation

1. These CENTRAL values are the recommended design-point inputs for the next implementation task.
2. Use the full LOW/CENTRAL/HIGH intervals from `synthesis-ledger.json` for any range display.
3. ESTIMATED values use `DISPLAY_ESTIMATED` policy (show qualifier); do not upgrade to `DISPLAY_VERIFIED`.
4. ASSUMED values (recycled_material_fraction = 0, renewable_material_fraction = 0 for C6) use
   `DISPLAY_WITH_QUALIFIER` policy.
5. The calculation IDs listed above are stable references into `proposal/HTF-03-canonical-packaging-dataset.json`.
6. The production canonical dataset at `docs/evidence/htf-03/HTF-03-canonical-packaging-dataset.json`
   must be updated by a separate implementation task using the patch in `canonical-patch-proposal.json`.
