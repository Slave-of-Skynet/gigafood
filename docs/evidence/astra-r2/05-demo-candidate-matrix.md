# ASTRA-R2 — Demo Candidate Matrix

> **Epistemic note:** All values are modeled engineering estimates (ESTIMATED or ASSUMED). No value
> in this table represents a measured, supplier-confirmed, or Profi-observed fact unless explicitly marked
> as OBSERVED_VERIFIED. Blank cells (—) denote genuinely undefined metrics (e.g. no virgin plastic
> reduction possible). Thermal screen values are component-family ceilings, not assembled-system approvals.

## How to read this table

- **Total mass / Plastic mass / Virgin mass** in grams per pack (CENTRAL value).
- **Recycled %** = secondary-material fraction of full pack (aluminium secondary counted; no plastic PCR for C1–C3/C5).
- **Renewable %** = bio-based/cellulose mass fraction (modeled, not certified).
- **Complete cost RON** = net delivered Romania RON/pack; excludes recoverable VAT.
- **Thermal screen** = lowest modeled component-family maximum; NOT assembled-pack approval.
- **Fit** = geometric fill ratio estimate (whole-bird 1.2 kg ellipsoid vs package capacity); >1 = no fit.
- **Outcome** = current canonical gate outcome for whole-chicken / portions; gate semantics unchanged.

All modeled values are flagged **[M]**. Observed-verified values are flagged **[OV]**.

---

| Candidate / config | Total mass (g) | Plastic mass (g) | Virgin mass (g) | Recycled % | Renewable % | Cost net RON | Thermal screen °C | Whole fill ratio | Outcome |
|---|---:|---:|---:|---:|---:|---:|---|---:|---|
| **B1-ESTIMATED** (baseline) | 6.50 [M] | 6.50 [M] | 6.50 [M] | 0 [M] | 0 [M] | 0.72 [M] | 200–220 [M] | ~0.01 [M] | INCUMBENT |
| **C1** Sacma B.Life Gaia bag | 20.11 [M] | 11.08 [M] | 11.08 [M] | 0 [M] | 91.4 [M] | 1.48 [M] | 150–200 [M] | ~0.01 [M] | QUALIFICATION REQUIRED |
| **C2** Sirane Siralon nylon bag | 5.74 [M] | 5.74 [M] | 5.74 [M] | 0 [M] | 0 [M] | 1.38 [M] | 210 [M] | ~0.01 [M] | QUALIFICATION REQUIRED |
| **C3** Sealed Air Oven Ease bag | 14.97 [M] | 14.97 [M] | 14.97 [M] | 0 [M] | 0 [M] | 1.79 [M] | 220 [M] | ~0.01 [M] | QUALIFICATION REQUIRED |
| **C4** Faerch CPET 2227+lid | 73.32 [M] | 73.32 [M] | 36.20 [M] | 50.6 [M] | 0 [M] | 3.22 [M] | 60–70 [M]¹ | 0.83 [M] | BLOCKED (lid thermal) |
| **C5** BIOPAP SI-14 + compat. film | 27.13 [M] | 4.34 [M] | 4.34 [M] | 0 [M] | 95.1 [M] | 2.67 [M] | 175 CONFLICT⁵ | 0.63 [M] | CONFLICT (thermal) |
| **C6-RO-P** Al portion + lid | 43.90 [M] | 19.20 [M] | 19.20 [M] | 21.4 [M] | 0 [M] | 1.00 [M] | 60–70 [M]¹ | N/A² | QUALIFICATION REQUIRED |
| **C6-RO-W** WePack whole Al + lid | 65.71 [M] | 28.30 [M] | 28.30 [M] | 21.6 [M] | 0 [M] | 1.94 [M] | 60–70 [M]¹ | 0.61 [M] | QUALIFICATION REQUIRED |
| **C6-RO-H** E-ambalaj whole Al + lid | 61.97 [M] | 28.11 [M] | 28.11 [M] | 20.8 [M] | 0 [M] | 2.03 [M] | 60–70 [M]¹ | 0.60 [M] | BLOCKED (lid thermal)³ |
| **C6-EU** Plus Pack Al + DPET lid | 64.41 [M] | 33.41 [M] | 33.41 [M] | 18.3 [M] | 0 [M] | 5.68 [M] | 60–70 [M]¹ | 0.63 [M] | QUALIFICATION REQUIRED⁴ |

---

### Notes

¹ **Lid thermal screen**: All aluminium configurations carry an unqualified post-oven clear lid. APET/PET-like
lid screening is modeled at 60–70 °C, far below any oven exposure scenario. The 250 °C oven capability
of the aluminium body does not transfer to the assembled system with an unqualified lid.

² **C6-RO-P fill ratio**: This configuration is sized for portions (P2–P4 deli packs, ~0.5 kg).
Whole-chicken (P1) fill ratio is not applicable; the tray is physically too small for a 1.2 kg bird.

³ **C6-RO-H body route**: The E-ambalaj e-pui225 body alone can withstand oven temperatures, but the
LITERAL_OVEN_250C_THEN_HOLD gate matrix hard-gates on a complete qualified system including the lid. The
unqualified post-oven lid yields BLOCKED for the 250 °C workflow. The body-only route (oven, then remove
lid and add post-oven clear lid) is a separate operational scenario that requires physical qualification.

⁴ **C6-EU procurement**: Romanian procurement route not established. DKK-based historical pricing only.

⁵ **C5 thermal CONFLICT**: BIOPAP LC family claims span 175 °C (historical 2016) to 185 °C (2026 news).
This conflict is preserved as-is from the canonical HTF-03 record and must NOT be resolved to PASS or FAIL
by this research PR. Six-hour hot-hold at 90 °C is explicitly claimed for a co-developed film; this film
is not identified as NatureFlex NVS45 or any specific commercial grade.

---

### Reduction vs B1-ESTIMATED baseline (virgin plastic, CENTRAL)

| Candidate | Baseline virgin (g) | Candidate virgin (g) | Reduction (g) | Reduction (%) |
|---|---:|---:|---:|---:|
| C1 | 6.50 | 11.08 | −4.58 [M] | −70.5% [M] |
| C2 | 6.50 | 5.74 | +0.76 [M] | +11.7% [M] |
| C3 | 6.50 | 14.97 | −8.47 [M] | −130.3% [M] |
| C4 | 6.50 | 36.20 | −29.70 [M] | −457.0% [M] |
| C5 | 6.50 | 4.34 | +2.16 [M] | +33.3% [M] |
| C6-RO-P | 6.50 | 19.20 | −12.71 [M] | −195.5% [M] |
| C6-RO-W | 6.50 | 28.30 | −21.80 [M] | −335.4% [M] |
| C6-RO-H | 6.50 | 28.11 | −21.61 [M] | −332.5% [M] |
| C6-EU | 6.50 | 33.41 | −26.91 [M] | −414.1% [M] |

> Negative reduction = more virgin plastic than baseline. Only **C2** and **C5** show positive central
> virgin-plastic reduction. The wide uncertainty intervals for all candidates mean that sign reversals
> are possible at the confidence bounds.

---

### Summary

- **C5** is the only portions candidate with a positive central virgin-plastic reduction and ~95% renewable
  content, pending thermal conflict resolution.
- **C2** shows modest positive central reduction (~0.76 g) but uncertainty spans negative values; no
  renewable content.
- **C1** uses renewable cellulose/paper but the plastic accounting scenario places it above baseline
  in the central scenario under the all-liner-counted conservative approach.
- **C6-RO-H** provides the oven-then-hold body capability but lacks a qualified lid system and
  cannot currently pass the LITERAL_OVEN_250C_THEN_HOLD gate.
