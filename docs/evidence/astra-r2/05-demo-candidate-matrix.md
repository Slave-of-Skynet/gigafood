# ASTRA-R2 — Demo Candidate Matrix

> **Epistemic note:** All values are modeled engineering estimates (ESTIMATED or ASSUMED) unless marked
> OBSERVED_VERIFIED [OV]. No value represents a measured, supplier-confirmed, or Profi-observed fact
> unless explicitly marked. Thermal screen values are component-family ceilings, not assembled-system
> approvals. Fill ratio > 1 means the modeled bird ellipsoid does not fit the package in the central scenario.

## How to read this table

- **Total mass / Plastic mass / Virgin mass** in grams per pack (CENTRAL value; ESTIMATED).
- **Recycled %** = secondary-material fraction of full pack (aluminium secondary counted; no plastic PCR for C1–C3/C5).
- **Renewable %** = bio-based/cellulose mass fraction (modeled, not certified).
- **Complete cost RON** = net delivered Romania RON/pack; excludes recoverable VAT.
- **Thermal screen °C** = lowest modeled component-family maximum; **NOT** assembled-pack approval.
- **Whole fill ratio** = modeled occupied bird volume / package capacity (central); >1 = no geometric fit.
- **Outcome** = canonical gate outcome (HTF-03 gate matrix, unchanged).

All modeled values are flagged **[M]**.

---

| Candidate / config | Total mass (g) | Plastic mass (g) | Virgin mass (g) | Recycled % | Renewable % | Cost net RON | Thermal screen °C | Whole fill ratio | Outcome |
|---|---:|---:|---:|---:|---:|---:|---|---:|---|
| **B1-ESTIMATED** (baseline) | 6.50 [M] | 6.50 [M] | 6.50 [M] | 0 [M] | 0 [M] | 0.723 [M] | 200–220 [M] | 0.55 [M] | INCUMBENT |
| **C1** Sacma B.Life Gaia bag | 20.11 [M] | 11.08 [M]¹ | 11.08 [M]¹ | 0 [M] | 91.4% [M] | 1.483 [M] | 150–200 [M] | 0.55 [M] | QUALIFICATION REQUIRED |
| **C2** Sirane Siralon nylon bag | 5.74 [M] | 5.74 [M] | 5.74 [M] | 0 [M] | 0 [M] | 1.378 [M] | 210 [M] | 0.55 [M] | QUALIFICATION REQUIRED |
| **C3** Sealed Air Oven Ease bag | 14.97 [M] | 14.97 [M] | 14.97 [M] | 0 [M] | 0 [M] | 1.794 [M] | 220 [M] | 0.55 [M] | QUALIFICATION REQUIRED |
| **C4** Faerch CPET 2227 + lid | 73.32 [M] | 73.32 [M] | 36.20 [M] | 50.6% [M] | 0 [M] | 3.220 [M] | 60–70 [M]² | 1.94 [M] — NO FIT | BLOCKED |
| **C5** BIOPAP SI-14 + compat. film | 27.13 [M] | 4.34 [M]¹ | 4.34 [M]¹ | 0 [M] | 95.1% [M] | 2.673 [M] | 175 CONFLICT⁵ | 1.57 [M] — NO FIT³ | CONFLICT (thermal) |
| **C6-RO-P** Al portion 729 + lid | 43.90 [M] | 19.20 [M] | 19.20 [M] | 21.4% [M] | 0 [M] | 0.999 [M] | 60–70 [M]² | 1.73 [M] — NO FIT | QUALIFICATION REQUIRED |
| **C6-RO-W** WePack whole Al + lid | 65.71 [M] | 28.30 [M] | 28.30 [M] | 21.6% [M] | 0 [M] | 1.938 [M] | 60–70 [M]² | 0.63 [M] | QUALIFICATION REQUIRED |
| **C6-RO-H** E-ambalaj e-pui225 + lid | 61.97 [M] | 28.11 [M] | 28.11 [M] | 20.8% [M] | 0 [M] | 2.032 [M] | 60–70 [M]² | 0.81 [M] | **QUALIFICATION REQUIRED**⁴ |
| **C6-EU** Plus Pack Al + DPET lid | 64.41 [M] | 33.41 [M] | 33.41 [M] | 18.3% [M] | 0 [M] | 5.682 [M] | 60–70 [M]² | 1.03 [M] | QUALIFICATION REQUIRED |

---

### Geometry fill ratio sources (ASTRA-E calculations)

| Candidate | Calculation | Fill ratio (L / C / H) | Note |
|---|---|---|---|
| C1/C2/C3 (bags) | ASTRA-E246 / E265 / E284 | 0.34 / 0.55 / 1.50 | Deformable bag volume vs. bird ellipsoid |
| C4 CPET 2227 | ASTRA-E307 | 1.49 / 1.94 / 2.84 | Tray too small for whole 1.2 kg bird |
| C5 BIOPAP SI-14 | ASTRA-E332 | 1.21 / 1.57 / 2.30 | Tray sized for portions, not whole bird |
| C6-RO-P (portion) | ASTRA-E355 | 1.33 / 1.73 / 2.54 | Portion tray; whole bird does not fit |
| C6-RO-W (whole) | ASTRA-E380 | 0.39 / 0.63 / 1.23 | Whole chicken configuration |
| C6-RO-H (whole) | ASTRA-E405 | 0.62 / 0.81 / 1.19 | Whole chicken configuration |
| C6-EU | ASTRA-E430 | 0.79 / 1.03 / 1.51 | Central borderline; HIGH out of range |

---

### Notes

¹ **C1/C5 plastic accounting:** These values use conservative accounting scenarios (all-liner / all-film
counted as plastic). Actual chemical polymer mass is lower. These numbers must never be presented as
measured plastic facts. See `07-runtime-ui-implementation-map.md` §SHARED CONTRACT.

² **Lid thermal screen:** All aluminium configurations carry an unqualified post-oven clear lid modeled
as APET/PET-like at 60–70 °C. The aluminium body capability does not transfer to the assembled system.
The lid thermal qualification is a gate boundary, not a hard FAIL on the system — the gate is
QUALIFICATION_REQUIRED until an oven-safe lid is nominated and qualified.

³ **C5 fit:** BIOPAP LC SI-14 (190 × 247 × 37 mm) is a portion tray. The central fill ratio of 1.57
confirms it does not accommodate a whole 1.2 kg bird. It is evaluated on the portions stream (P2–P4).

⁴ **C6-RO-H canonical outcome:** QUALIFICATION REQUIRED (priority 2 — high-temperature fallback
qualification path). The unresolved transparent lid closure is a qualification boundary, not a
new hard FAIL. Gate semantics per oracle: the outcome is QUALIFICATION REQUIRED for all products
under LITERAL_OVEN_250C_THEN_HOLD, with qualification_priority = 2.

⁵ **C5 thermal CONFLICT:** BIOPAP LC family claims 175 °C (2016) vs 185 °C (2026). This conflict is
preserved from the canonical HTF-03 record. C2/C3/C4/C5 are BLOCKED under
LITERAL_OVEN_250C_THEN_HOLD (thermal FAIL gate).

---

### Reduction vs B1-ESTIMATED baseline (virgin plastic, CENTRAL, from ledger)

| Candidate | Calc | Baseline virgin (g) | Candidate virgin (g) | Reduction (g) | Reduction (%) |
|---|---|---:|---:|---:|---:|
| C1 | ASTRA-E444 | 6.50 | 11.08¹ | −4.58 [M] | −70.5% [M] |
| C2 | ASTRA-E456 | 6.50 | 5.74 | +0.76 [M] | +11.7% [M] |
| C3 | ASTRA-E468 | 6.50 | 14.97 | −8.47 [M] | −130.3% [M] |
| C4 | ASTRA-E480 | 6.50 | 36.20 | −29.70 [M] | −457.0% [M] |
| C5 | ASTRA-E492 | 6.50 | 4.34¹ | +2.16 [M] | +33.3% [M] |
| C6-RO-P | ASTRA-E504 | 6.50 | 19.20 | −12.71 [M] | −195.5% [M] |
| C6-RO-W | ASTRA-E516 | 6.50 | 28.30 | −21.80 [M] | −335.4% [M] |
| C6-RO-H | ASTRA-E528 | 6.50 | 28.11 | −21.61 [M] | −332.5% [M] |
| C6-EU | ASTRA-E540 | 6.50 | 33.41 | −26.91 [M] | −414.1% [M] |

> Only **C2** and **C5** show positive central virgin-plastic reduction. The wide uncertainty
> intervals mean sign reversals are possible at the confidence bounds (C2 LOW = −7.60 g, C5 LOW = −3.34 g).
