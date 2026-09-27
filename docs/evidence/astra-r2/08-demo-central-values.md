# ASTRA-R2 — Demo Central Values

> **Scope:** Exact CENTRAL values recommended for the next implementation task.
> Every number in this document references the exact calculation ID in `synthesis-ledger.json`.
> Values are mechanically consistent with the ledger; do not accept any copy that deviates.
>
> **Invariant check:** `displayed central == synthesis-ledger[calculation_id].central`
> Run `verify_central_values.py` to confirm. This document fails if any row violates this invariant.
>
> **Evidence states:**
> - `[ESTIMATED]` — model calculation with cited sources; falsifiable by measurement
> - `[ASSUMED]` — declared design assumption; no external empirical support
> - `[OV]` — OBSERVED_VERIFIED (inherited from existing canonical dataset; not changed by ASTRA-R2)

---

## Baseline B1-ESTIMATED

Provider observations (virgin fraction = 1) are unchanged from canonical HTF-03.
Scenario mass and cost are added by ASTRA-R2 modeling, not from Profi procurement records.

| Field | CENTRAL | Unit | State | Calculation |
|---|---:|---|---|---|
| total_package_mass_g | **6.4985** | g | ESTIMATED | ASTRA-E006 |
| plastic_mass_g | **6.4985** | g | ESTIMATED | ASTRA-E007 |
| virgin_plastic_mass_g | **6.4985** | g | ESTIMATED | ASTRA-E008 |
| virgin_fraction | **1.000** | fraction | ASSUMED | ASTRA-E009 |
| recycled_material_fraction | **0.000** | fraction | ASSUMED | ASTRA-E010 |
| renewable_material_fraction | **0.000** | fraction | ASSUMED | ASTRA-E011 |
| complete_cost (net RON) | **0.7230** | RON/pack | ESTIMATED | ASTRA-E017 |
| annual whole-chicken packages | **3,168,000** | packs/year | ESTIMATED | ASTRA-E024 |
| annual portions packages | **6,336,000** | packs/year | ESTIMATED | ASTRA-E025 |
| annual packages (combined) | **9,504,000** | packs/year | ESTIMATED | ASTRA-E026 |

> B1 mass range: LOW 2.59 g — CENTRAL 6.50 g — HIGH 12.46 g. The broad range reflects the
> unknown exact bag format; the range must not be collapsed to a point value.

---

## C1 Whole Chicken (Sacma B.Life Gaia format)

Compared to B1-ESTIMATED on the **whole-chicken stream** (ASTRA-E024: 3,168,000 packs/year central).

| Field | CENTRAL | Unit | State | Calculation |
|---|---:|---|---|---|
| total_package_mass_g | **20.1050** | g | ESTIMATED | ASTRA-E069 |
| plastic accounting mass (all-liner)¹ | **11.0800** | g | ESTIMATED | ASTRA-E070 |
| virgin plastic accounting mass¹ | **11.0800** | g | ESTIMATED | ASTRA-E071 |
| renewable_material_fraction | **0.9142** (91.4%) | fraction | ESTIMATED | ASTRA-E074 |
| cost_net RON/pack | **1.4833** | RON/pack | ESTIMATED | ASTRA-E084 |
| virgin plastic reduction vs B1 | **−4.5815** | g/pack | ESTIMATED | ASTRA-E444 |
| reduction % vs B1 | **−70.5009%** | % | ESTIMATED | ASTRA-E445 |
| cost premium RON/pack | **+0.7603** | RON/pack | ESTIMATED | ASTRA-E446 |
| cost premium % | **+105.1614%** | % | ESTIMATED | ASTRA-E447 |
| annual baseline spend | **2,290,464** | RON/year | ESTIMATED | ASTRA-E448 |
| annual C1 spend | **4,699,149** | RON/year | ESTIMATED | ASTRA-E449 |
| annual incremental cost | **+2,408,685** | RON/year | ESTIMATED | ASTRA-E450 |
| annual baseline virgin | **20,587** | kg/year | ESTIMATED | ASTRA-E451 |
| annual C1 virgin | **35,101** | kg/year | ESTIMATED | ASTRA-E452 |
| annual virgin plastic avoided | **−14,514** | kg/year | ESTIMATED | ASTRA-E453 |
| whole fill ratio | **0.5475** | fraction | ESTIMATED | ASTRA-E246 |

¹ C1 plastic accounting is a conservative all-liner scenario; cellulose liner is not fossil polymer.
This value must not be presented as a measured plastic fact. See §SHARED CONTRACT in implementation map.

> **Plastic accounting note:** The −4.58 g "reduction" is negative — C1 accounts for MORE virgin
> plastic than B1-ESTIMATED under the all-liner-counted convention. This is a model construction
> artifact. The high renewable content (91.4%) is the genuine environmental positive.

---

## C5 Portions (BIOPAP LC SI-14 + compatible film)

Compared to B1-ESTIMATED on the **portions stream** (ASTRA-E025: 6,336,000 packs/year central).

| Field | CENTRAL | Unit | State | Calculation |
|---|---:|---|---|---|
| total_package_mass_g | **27.1305** | g | ESTIMATED | ASTRA-E118 |
| plastic accounting mass (all-film)¹ | **4.3355** | g | ESTIMATED | ASTRA-E119 |
| virgin plastic accounting mass¹ | **4.3355** | g | ESTIMATED | ASTRA-E120 |
| renewable_material_fraction | **0.9507** (95.1%) | fraction | ESTIMATED | ASTRA-E122 |
| cost_net RON/pack | **2.6726** | RON/pack | ESTIMATED | ASTRA-E131 |
| virgin plastic reduction vs B1 | **+2.1630** | g/pack | ESTIMATED | ASTRA-E492 |
| reduction % vs B1 | **+33.2844%** | % | ESTIMATED | ASTRA-E493 |
| cost premium RON/pack | **+1.9496** | RON/pack | ESTIMATED | ASTRA-E494 |
| cost premium % | **+269.6574%** | % | ESTIMATED | ASTRA-E495 |
| annual baseline spend | **4,580,928** | RON/year | ESTIMATED | ASTRA-E496 |
| annual C5 spend | **16,933,741** | RON/year | ESTIMATED | ASTRA-E497 |
| annual incremental cost | **+12,352,813** | RON/year | ESTIMATED | ASTRA-E498 |
| annual baseline virgin | **41,174** | kg/year | ESTIMATED | ASTRA-E499 |
| annual C5 virgin | **27,470** | kg/year | ESTIMATED | ASTRA-E500 |
| annual virgin plastic avoided | **+13,705** | kg/year | ESTIMATED | ASTRA-E501 |
| whole fill ratio | **1.5731** | fraction | ESTIMATED | ASTRA-E332 |

¹ C5 plastic accounting is a conservative all-film scenario; cellulose body mass far exceeds film+coating.
This value must not be presented as a measured plastic fact.

> **Thermal CONFLICT:** BIOPAP LC body claims 175 °C (2016) vs 185 °C (2026). Six-hour hold at
> 90 °C requires a co-developed film not yet nominated. This CONFLICT is retained from the canonical
> HTF-03 dataset and must not be changed by implementation without new qualifying evidence.
> C5 whole fill ratio 1.57 confirms this tray is designed for portions, not whole birds.

---

## C6 250 °C Fallback (C6-RO-H — E-ambalaj body + post-oven lid)

Compared to B1-ESTIMATED on the **whole-chicken stream** (ASTRA-E024: 3,168,000 packs/year central).
**Canonical gate outcome: QUALIFICATION REQUIRED, priority 2** (high-temperature fallback path).

| Field | CENTRAL | Unit | State | Calculation |
|---|---:|---|---|---|
| total_package_mass_g | **61.9739** | g | ESTIMATED | ASTRA-E162 |
| plastic_mass_g (lid + ancillary) | **28.1066** | g | ESTIMATED | ASTRA-E163 |
| virgin_plastic_mass_g | **28.1066** | g | ESTIMATED | ASTRA-E164 |
| recycled_material_fraction (body Al) | **0.2077** (20.8%) | fraction | ESTIMATED | ASTRA-E166 |
| renewable_material_fraction | **0.000** | fraction | ASSUMED | ASTRA-E167 |
| cost_net RON/pack | **2.0318** | RON/pack | ESTIMATED | ASTRA-E170 |
| virgin plastic reduction vs B1 | **−21.6081** | g/pack | ESTIMATED | ASTRA-E528 |
| reduction % vs B1 | **−332.5094%** | % | ESTIMATED | ASTRA-E529 |
| cost premium RON/pack | **+1.3088** | RON/pack | ESTIMATED | ASTRA-E530 |
| cost premium % | **+181.0260%** | % | ESTIMATED | ASTRA-E531 |
| annual baseline spend | **2,290,464** | RON/year | ESTIMATED | ASTRA-E532 |
| annual C6-RO-H spend | **6,436,800** | RON/year | ESTIMATED | ASTRA-E533 |
| annual incremental cost | **+4,146,336** | RON/year | ESTIMATED | ASTRA-E534 |
| annual virgin plastic avoided | **−68,455** | kg/year | ESTIMATED | ASTRA-E537 |
| whole fill ratio | **0.8128** | fraction | ESTIMATED | ASTRA-E405 |
| cost per kg virgin avoided | **N/A** | — | — | No central avoidance |

> **Gate outcome is QUALIFICATION REQUIRED (priority 2), not BLOCKED.**
> The aluminium body alone can withstand 250 °C. The post-oven clear lid has no thermal qualification
> for oven exposure. The unresolved lid closure is a qualification boundary requiring evidence, not
> a hard gate FAIL. The LITERAL_OVEN_250C_THEN_HOLD outcome is QUALIFICATION REQUIRED per oracle
> contract for all products, with qualification_priority = 2 for C6.
>
> No RON/kg avoided ratio is defined because C6-RO-H uses MORE virgin plastic than the baseline
> in every scenario (the ratio domain is non-positive).

---

## Notes on implementation

1. These CENTRAL values are the recommended design-point inputs for the next implementation task.
2. Use the full LOW/CENTRAL/HIGH intervals from `synthesis-ledger.json` for any range display.
3. ESTIMATED values use `DISPLAY_ESTIMATED` policy; do not upgrade to `DISPLAY_VERIFIED`.
4. ASSUMED values (recycled/renewable = 0 for C6) use `DISPLAY_WITH_QUALIFIER` policy.
5. All calculation IDs reference `proposal/HTF-03-canonical-packaging-dataset.json`.
6. Use **per-stream** annual volumes for business case arithmetic:
   - Whole chicken (C1, C2, C3, C6-RO-W, C6-RO-H): ASTRA-E024 (3,168,000 central)
   - Portions (C4, C5, C6-RO-P, C6-EU): ASTRA-E025 (6,336,000 central)
   - Combined (ASTRA-E026 = 9,504,000) must NOT be used as an individual stream volume.
