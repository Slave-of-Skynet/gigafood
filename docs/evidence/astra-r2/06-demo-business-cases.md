# ASTRA-R2 — Demo Business Cases

> **Epistemic note:** All figures are engineering estimates (ESTIMATED/ASSUMED). LOW/CENTRAL/HIGH are
> independent worst-/best-case corners, not a statistical confidence interval. Annual volume assumptions
> dominate the annual-spend ranges. No value represents Profi's actual procurement price, volume, or margin.
> Do NOT present CENTRAL values as measurements.

> **All values in this document are drawn directly from `synthesis-ledger.json`.**
> Do not independently recompute these numbers. The calculation ID is the authoritative reference.

---

## 1. Whole Chicken: B1-ESTIMATED → C1

**Stream:** Whole chicken (P1) — ASTRA-E024 (`NETWORK.whole_annual`)
- LOW 580,800 / CENTRAL **3,168,000** / HIGH 10,278,400 packs/year

**Baseline:** B1-ESTIMATED (modeled incumbent rotisserie bag).
**Candidate:** C1 Sacma B.Life Gaia format, all-liner-counted virgin-plastic accounting.

### Key metrics

| Metric | LOW | CENTRAL | HIGH | Unit | State | Calculation |
|---|---:|---:|---:|---|---|---|
| Annual packages (whole stream) | 580,800 | **3,168,000** | 10,278,400 | packs/year | ESTIMATED | ASTRA-E024 |
| Baseline cost/package (net) | 0.326 | **0.723** | 1.200 | RON/pack | ESTIMATED | ASTRA-E017 |
| C1 cost/package (net) | 0.770 | **1.483** | 3.888 | RON/pack | ESTIMATED | ASTRA-E084 |
| Cost premium (RON/pack) | −0.430 | **+0.760** | +3.562 | RON/pack | ESTIMATED | ASTRA-E446 |
| Cost premium (%) | −35.8 | **+105.2** | +1092.5 | % | ESTIMATED | ASTRA-E447 |
| Baseline virgin plastic (g/pack) | 2.592 | **6.499** | 12.460 | g/pack | ESTIMATED | ASTRA-E008 |
| C1 virgin plastic (g/pack)¹ | 8.093 | **11.080** | 15.400 | g/pack | ESTIMATED | ASTRA-E071 |
| Reduction (g/pack) | −12.808 | **−4.582** | +4.367 | g/pack | ESTIMATED | ASTRA-E444 |
| Reduction (%) | −494.2 | **−70.5** | +35.0 | % | ESTIMATED | ASTRA-E445 |
| Annual baseline spend | 189,341 | **2,290,464** | 12,334,080 | RON/year | ESTIMATED | ASTRA-E448 |
| Annual C1 spend | 447,384 | **4,699,149** | 39,958,374 | RON/year | ESTIMATED | ASTRA-E449 |
| Annual incremental cost | −4,416,741 | **+2,408,685** | +36,607,616 | RON/year | ESTIMATED | ASTRA-E450 |
| Annual baseline virgin | 1,505 | **20,587** | 128,069 | kg/year | ESTIMATED | ASTRA-E451 |
| Annual C1 virgin | 4,700 | **35,101** | 158,287 | kg/year | ESTIMATED | ASTRA-E452 |
| Annual virgin plastic avoided | −131,649 | **−14,514** | +44,884 | kg/year | ESTIMATED | ASTRA-E453 |
| Cost per kg virgin avoided | — | **N/A** | — | RON/kg | — | — |

¹ C1 plastic and virgin plastic use the conservative all-liner-counted accounting scenario.
Cellulose liner is not fossil polymer; this number must never be presented as a measured plastic fact.

### Business case narrative

In the central scenario, C1 costs approximately **+0.76 RON more per pack** than the baseline estimate
(+105.2%), translating to ~**+2.4 M RON/year** additional network cost (whole stream: 3,168,000 packs/year central).

Under the all-liner accounting convention, C1 accounts for **more** virgin plastic than baseline in the
central scenario (−4.58 g net, i.e., C1 is worse on this metric). This is a construction artifact of
counting the full cellulose liner as "plastic" in the conservative budget — the renewable content (91.4%)
is tracked separately and independently.

The cost-per-kg-avoided is **N/A** in the central scenario because the central reduction is negative
(no net avoidance). The uncertainty interval spans from −4.4 M RON/year to +36.6 M RON/year incremental.

**Positive outcome requires:** Sacma B.Life Gaia with a confirmed hot-hold liner grade, supplier quote,
and a separate real plastic BOM replacing the accounting scenario.

---

## 2. Portions: B1-ESTIMATED → C5

**Stream:** Portions (P2–P4) — ASTRA-E025 (`NETWORK.portions_annual`)
- LOW 1,161,600 / CENTRAL **6,336,000** / HIGH 20,556,800 packs/year

**Baseline:** B1-ESTIMATED (modeled incumbent bag, used as incumbent comparator for portions).
**Candidate:** C5 BIOPAP LC SI-14 tray + compatible transparent film.

> **Thermal CONFLICT retained:** BIOPAP LC family has a documented conflict between the 2016 historical
> 175 °C ceiling and 2026 press claims of 185 °C. The six-hour 90 °C hot-hold claim requires a
> co-developed nominated film that is not yet identified. This conflict is preserved from the canonical
> HTF-03 record and **may not be resolved to PASS by this document.**
>
> C5 is BLOCKED under LITERAL_OVEN_250C_THEN_HOLD (thermal FAIL gate). This document covers the
> POST_COOK_HOT_HOLD_6H workflow only, where the outcome is CONFLICT pending film qualification.

### Key metrics

| Metric | LOW | CENTRAL | HIGH | Unit | State | Calculation |
|---|---:|---:|---:|---|---|---|
| Annual packages (portions stream) | 1,161,600 | **6,336,000** | 20,556,800 | packs/year | ESTIMATED | ASTRA-E025 |
| Baseline cost/package (net) | 0.326 | **0.723** | 1.200 | RON/pack | ESTIMATED | ASTRA-E017 |
| C5 cost/package (net) | 1.787 | **2.673** | 4.246 | RON/pack | ESTIMATED | ASTRA-E131 |
| Cost premium (RON/pack) | +0.587 | **+1.950** | +3.920 | RON/pack | ESTIMATED | ASTRA-E494 |
| Cost premium (%) | +48.9 | **+269.7** | +1202.3 | % | ESTIMATED | ASTRA-E495 |
| Baseline virgin plastic (g/pack) | 2.592 | **6.499** | 12.460 | g/pack | ESTIMATED | ASTRA-E008 |
| C5 virgin plastic (g/pack)¹ | 2.426 | **4.336** | 5.935 | g/pack | ESTIMATED | ASTRA-E120 |
| Reduction (g/pack) | −3.343 | **+2.163** | +10.034 | g/pack | ESTIMATED | ASTRA-E492 |
| Reduction (%) | −129.0 | **+33.3** | +80.5 | % | ESTIMATED | ASTRA-E493 |
| Annual baseline spend | 378,682 | **4,580,928** | 24,668,160 | RON/year | ESTIMATED | ASTRA-E496 |
| Annual C5 spend | 2,075,867 | **16,933,741** | 87,275,336 | RON/year | ESTIMATED | ASTRA-E497 |
| Annual incremental cost | +681,947 | **+12,352,813** | +80,573,819 | RON/year | ESTIMATED | ASTRA-E498 |
| Annual baseline virgin | 3,010 | **41,174** | 256,138 | kg/year | ESTIMATED | ASTRA-E499 |
| Annual C5 virgin | 2,818 | **27,470** | 121,997 | kg/year | ESTIMATED | ASTRA-E500 |
| Annual virgin plastic avoided | −68,721 | **+13,705** | +206,259 | kg/year | ESTIMATED | ASTRA-E501 |
| Cost per kg virgin avoided | — | **~901** | — | RON/kg | ESTIMATED | ASTRA-E494/ASTRA-E492 |

¹ C5 plastic accounting uses all-film + body-coating budget. Renewable content ~95.1% tracked separately.

### Business case narrative

In the central scenario, C5 avoids approximately **+2.16 g/pack** of virgin plastic accountability
relative to B1-ESTIMATED, or **~+13,705 kg/year** across the portions network (6,336,000 packs/year central).
The uncertainty interval spans negative avoidance at the LOW bound (−3.34 g), meaning the sign depends
on how light the incumbent bag actually is.

The cost premium is ~**+1.95 RON/pack** (+270%), translating to ~**+12.4 M RON/year** additional network cost.
At ~901 RON/kg virgin avoided (central), the economics require strong sustainability positioning.

**Qualification blocker:** The thermal CONFLICT on the BIOPAP LC body and unidentified film must be
resolved through physical qualification before C5 can serve as a recommended candidate for hot-hold.

---

## 3. Literal 250 °C Fallback: B1-ESTIMATED → C6-RO-H

**Stream:** Whole chicken (P1) — ASTRA-E024 (`NETWORK.whole_annual`)
- LOW 580,800 / CENTRAL **3,168,000** / HIGH 10,278,400 packs/year

**Baseline:** B1-ESTIMATED.
**Candidate:** C6-RO-H (E-ambalaj e-pui225 aluminium body + modeled post-oven clear lid).
**Workflow:** LITERAL_OVEN_250C_THEN_HOLD.

> **Canonical gate outcome: QUALIFICATION REQUIRED (priority 2)**
>
> The E-ambalaj e-pui225 aluminium body is rated −40 to 280 °C by the seller. The **post-oven clear lid**
> is modeled as APET/PET-like with a screening ceiling of 60–70 °C. The unresolved transparent lid
> closure is a **qualification boundary** — the gate is QUALIFICATION_REQUIRED, **not a hard FAIL**.
>
> C6-RO-H is the designated high-temperature fallback qualification path with qualification_priority = 2
> for all products under LITERAL_OVEN_250C_THEN_HOLD, per oracle contract (see
> `backend/tests/acceptance_htf04/test_acceptance_oracle.py` lines 197–199).
>
> C2/C3/C4/C5 are BLOCKED under LITERAL_OVEN_250C_THEN_HOLD (thermal FAIL gate).
> Economic and environmental arithmetic below is provided for planning only and does not constitute
> a route-to-market recommendation without lid qualification.

### Key metrics

| Metric | LOW | CENTRAL | HIGH | Unit | State | Calculation |
|---|---:|---:|---:|---|---|---|
| Annual packages (whole stream) | 580,800 | **3,168,000** | 10,278,400 | packs/year | ESTIMATED | ASTRA-E024 |
| Baseline cost/package (net) | 0.326 | **0.723** | 1.200 | RON/pack | ESTIMATED | ASTRA-E017 |
| C6-RO-H cost/package (net) | 1.602 | **2.032** | 3.078 | RON/pack | ESTIMATED | ASTRA-E170 |
| Cost premium (RON/pack) | +0.402 | **+1.309** | +2.752 | RON/pack | ESTIMATED | ASTRA-E530 |
| Cost premium (%) | +33.5 | **+181.0** | +844.2 | % | ESTIMATED | ASTRA-E531 |
| Baseline virgin plastic (g/pack) | 2.592 | **6.499** | 12.460 | g/pack | ESTIMATED | ASTRA-E008 |
| C6-RO-H plastic (g/pack)¹ | 13.049 | **28.107** | 61.331 | g/pack | ESTIMATED | ASTRA-E163 |
| Reduction (g/pack) | −58.740 | **−21.608** | −0.589 | g/pack | ESTIMATED | ASTRA-E528 |
| Reduction (%) | −2266.5 | **−332.5** | −4.7 | % | ESTIMATED | ASTRA-E529 |
| Annual baseline spend | 189,341 | **2,290,464** | 12,334,080 | RON/year | ESTIMATED | ASTRA-E532 |
| Annual C6-RO-H spend | 930,336 | **6,436,800** | 31,638,784 | RON/year | ESTIMATED | ASTRA-E533 |
| Annual incremental cost | +233,376 | **+4,146,336** | +28,288,026 | RON/year | ESTIMATED | ASTRA-E534 |
| Annual virgin plastic avoided | −603,749 | **−68,455** | −342 | kg/year | ESTIMATED | ASTRA-E537 |
| Cost per kg virgin avoided | — | **N/A** | — | RON/kg | — | — |

¹ C6-RO-H plastic mass counts the clear lid and ancillary as virgin polymer; aluminium body is counted
as 20.8% recycled secondary aluminium. Virgin plastic does NOT decrease vs baseline in any scenario.

### Business case narrative

C6-RO-H adds approximately **+21.6 g/pack** additional virgin plastic accountability relative to the
incumbent baseline (central), making it environmentally worse on this metric in every scenario.
The 20.8% secondary aluminium content is a moderate positive, but the aluminium-body lid-plastic mass
far exceeds the incumbent bag.

The cost premium is ~**+1.31 RON/pack** (+181%), or ~**+4.1 M RON/year** additional
(whole stream, 3,168,000 packs/year central).

**Path to unblocking the lid qualification:** Nominate a transparent lid material qualified to withstand
oven insertion (e.g., borosilicate glass, ovenable APET confirmed by supplier, or equivalent). Any
such lid must independently qualify the LITERAL_OVEN_250C_THEN_HOLD gate before the system
can receive procurement approval. The gate outcome changes from QUALIFICATION REQUIRED to PASS
or BLOCKED based on qualification evidence, not on this economic analysis.

---

## Appendix: Ratio exceptions

| Candidate | Reason |
|---|---|
| C1 | No central virgin avoidance (conservative all-liner accounting exceeds baseline) |
| C3 | No central avoidance (C3 bag is heavier than B1-ESTIMATED central) |
| C4 | No avoidance (CPET tray has 5× more virgin plastic) |
| C6-RO-P | No avoidance (aluminium lid plastic exceeds baseline) |
| C6-RO-W | No avoidance (aluminium lid plastic exceeds baseline) |
| C6-RO-H | No avoidance (aluminium lid plastic exceeds baseline) |
| C6-EU | No avoidance (aluminium + DPET lid plastic exceeds baseline) |

C2 and C5 have a finite central ratio but only because the central reduction is positive while the LOW
bound is negative; full-domain LOW/HIGH are undefined (division by near-zero or negative reduction).
