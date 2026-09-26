# HTF-03 — estimation and arithmetic ledger

Cut-off 2026-09-26. All 63 calculations are machine-readable in the canonical JSON and independently recomputed by the validator.

Low/central/high are conditional engineering bounds. Central is a nominated scenario, not a mean. No random simulation or statistical confidence is implied. Independent extreme propagation deliberately widens comparisons. Source observations and assumptions are kept distinct. Mass units: m² × µm × g/cm³ = g. Formed rigid parts use m² × mm × g/cm³ × 1000 = g.

Reported geometric areas, tolerance endpoints, FX ratios and percentages below are arithmetic constants of the shown source dimensions/nominals. A geometry model does not qualify thermal or food-contact use. Positive reduction means avoided virgin plastic; negative means an increase.

## E001 — SCENARIO.bag_area_m2

**State:** ESTIMATED. **Result:** 0.183750 / 0.192500 / 0.210000 m2 (low / central / high).
**Formula:** `A = 2*(width+gusset)*height*fold_factor`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| width | 0.180000 / 0.180000 / 0.180000 | m / OBSERVED_VERIFIED | Barleta B3 width; borrowed geometry, not Profi measurement  [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| gusset | 0.070000 / 0.070000 / 0.070000 | m / OBSERVED_VERIFIED | B3 gusset; interpretation as lay-flat extension is assumed  [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| height | 0.350000 / 0.350000 / 0.350000 | m / OBSERVED_VERIFIED | B3 height  [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| allowance | 1.050000 / 1.100000 / 1.200000 | factor / ASSUMED | Folds, flap, seam and overlap envelope   |

**Assumptions:** Same nominal 18+7 by 35 cm bag envelope across flexible screening cases. Does not prove whole-chicken fit.
**Sensitivity / dominant uncertainty:** Area scales linearly; gusset definition and seams need supplier drawing.

## E002 — B1-ESTIMATED.total_package_mass_g

**State:** ESTIMATED. **Result:** 2.591650 / 6.498500 / 12.460000 g (low / central / high).
**Formula:** `m = A_m2 * gauge_um * density_g_cm3 + ancillary_g`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| area | 0.183750 / 0.192500 / 0.210000 | m2 / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E001 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| gauge | 12.000000 / 23.000000 / 40.000000 | um / ASSUMED | Comparable commercial gauges; exact Profi film unknown  [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/) |
| density | 1.130000 / 1.400000 / 1.400000 | g/cm3 / ASSUMED | PA/PET family endpoints; central PET is a scenario only  [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** PET/PA-like bag branch only; other polymer constructions may lie outside these bounds. All mass treated as virgin plastic; no claimed measured Profi mass.
**Sensitivity / dominant uncertainty:** Gauge 12-40 um dominates (3.33x); area 1.05-1.20 fold factor, then polymer density.

## E003 — B3.total_package_mass_g

**State:** ESTIMATED. **Result:** 10.757500 / 11.657500 / 13.300000 g (low / central / high).
**Formula:** `m = A*(paper_gsm+PP_gsm)+ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| area | 0.183750 / 0.192500 / 0.210000 | m2 / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E001 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| paper | 40.000000 / 40.000000 / 40.000000 | g/m2 / ASSUMED | Interpretation of KAPP 40+20; not a confirmed GSM specification  [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| pp | 18.000000 / 19.000000 / 20.000000 | g/m2 / ASSUMED | 20 interpreted as either 20 um PP (~18 gsm using assumed 0.9 density) or 20 gsm; midpoint is a scenario  [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** KAPP interpretation must be confirmed. Gross shipping mass is excluded.
**Sensitivity / dominant uncertainty:** GSM interpretation, gusset/fold area and extra closure.

## E004 — B3.plastic_mass_g

**State:** ESTIMATED. **Result:** 3.407500 / 3.957500 / 4.900000 g (low / central / high).
**Formula:** `plastic = A*PP_gsm + ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| area | 0.183750 / 0.192500 / 0.210000 | m2 / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E001 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| pp | 18.000000 / 19.000000 / 20.000000 | g/m2 / ASSUMED | 20 interpreted as either 20 um PP (~18 gsm using assumed 0.9 density) or 20 gsm; midpoint is a scenario  [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** Ancillary allowance entirely counted as plastic.
**Sensitivity / dominant uncertainty:** PP gauge/GSM interpretation and closure.

## E005 — B3.renewable_material_fraction

**State:** ESTIMATED. **Result:** 0.626866 / 0.660519 / 0.684039 fraction (low / central / high).
**Formula:** `renewable = paper / total`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| area | 0.183750 / 0.192500 / 0.210000 | m2 / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E001 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| paper | 40.000000 / 40.000000 / 40.000000 | g/m2 / ASSUMED | Interpretation of KAPP 40+20; not a confirmed GSM specification  [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| pp | 18.000000 / 19.000000 / 20.000000 | g/m2 / ASSUMED | 20 interpreted as either 20 um PP (~18 gsm using assumed 0.9 density) or 20 gsm; midpoint is a scenario  [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** Assume paper mass renewable; do not infer recycled fibre content.
**Sensitivity / dominant uncertainty:** Coating and additives absent from public BOM.

## E006 — PRICE-B3.unit_price

**State:** DERIVED_EXACT. **Result:** 0.370260 / 0.370260 / 0.370260 RON/pack (low / central / high).
**Formula:** `published amount / published quantity`
**Method:** Exact arithmetic on published observations. **Confidence:** MEDIUM.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| amount | 370.260000 / 370.260000 / 370.260000 | RON / OBSERVED_VERIFIED | Published amount; see VAT basis.  [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| count | 1000.000000 / 1000.000000 / 1000.000000 | pieces / OBSERVED_VERIFIED | Published selling pack  [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** No currency, tax or freight conversion.
**Sensitivity / dominant uncertainty:** Price/stock can change.

## E007 — C1.total_package_mass_g

**State:** ESTIMATED. **Result:** 14.551250 / 19.720000 / 26.590000 g (low / central / high).
**Formula:** `total = (A-window_cutout)*paper_gsm + A*liner_gsm + ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| area | 0.183750 / 0.192500 / 0.210000 | m2 / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E001 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| window | 0.006000 / 0.012000 / 0.020000 | m2 / ASSUMED | Unmeasured paper cutout, 60-200 cm2; full liner remains   |
| paper | 40.000000 / 50.000000 / 60.000000 | g/m2 / ASSUMED | Engineering paper envelope around 40 gsm Romanian comparator; not Gaia specification  [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| film | 43.000000 / 54.000000 / 65.000000 | g/m2 / ASSUMED | Comparable cellulose 30-45 um range; not selected Gaia gauge  [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** Full-area liner retained behind window; folds included in A. No exact Gaia SKU; size, GSM and liner gauge are assumed.
**Sensitivity / dominant uncertainty:** Liner coverage/gauge, paper GSM and selected bag size.

## E008 — C1-SCENARIO.virgin_plastic_accounting_budget_g

**State:** ESTIMATED. **Result:** 8.001250 / 10.695000 / 14.350000 g (low / central / high).
**Formula:** `budget = all liner mass + ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| area | 0.183750 / 0.192500 / 0.210000 | m2 / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E001 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| film | 43.000000 / 54.000000 / 65.000000 | g/m2 / ASSUMED | Comparable cellulose 30-45 um range; not selected Gaia gauge  [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** All cellulosic film counted as virgin plastic for conservative accounting; this is NOT its legal/material classification. Paper body assumed to carry no additional plastic outside the counted liner.
**Sensitivity / dominant uncertainty:** Actual coating BOM may change accounting; this scenario cannot identify actual virgin plastic.

## E009 — C2.total_package_mass_g

**State:** ESTIMATED. **Result:** 4.252750 / 5.738125 / 10.192000 g (low / central / high).
**Formula:** `m = A*gauge*density + ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| area | 0.183750 / 0.192500 / 0.210000 | m2 / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E001 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| gauge | 20.000000 / 25.000000 / 40.000000 | um / ASSUMED | Comparable commercial nylon envelope, not Siralon specification  [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/) |
| density | 1.130000 / 1.130000 / 1.130000 | g/cm3 / ASSUMED | PA6 family proxy; exact nylon blend unknown  [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** All components treated as plastic in this model. Recycled fraction assumed zero only for conservative virgin-plastic scenario.
**Sensitivity / dominant uncertainty:** Gauge, bag size and actual nylon formulation.

## E010 — PRICE-C4-LID.unit_price

**State:** DERIVED_EXACT. **Result:** 1.760753 / 1.760753 / 1.760753 DKK/pack (low / central / high).
**Formula:** `published amount / published quantity`
**Method:** Exact arithmetic on published observations. **Confidence:** MEDIUM.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| amount | 655.000000 / 655.000000 / 655.000000 | DKK / OBSERVED_VERIFIED | Published amount; see VAT basis.  [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet) |
| count | 372.000000 / 372.000000 / 372.000000 | pieces / OBSERVED_VERIFIED | Published selling pack  [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet) |

**Assumptions:** No currency, tax or freight conversion.
**Sensitivity / dominant uncertainty:** Price/stock can change.

## E011 — C4.lid_model_g

**State:** ESTIMATED. **Result:** 12.289788 / 21.458360 / 37.454592 g (low / central / high).
**Formula:** `lid = (L*W + 2*H*(L+W))*t_mm*rho*1000*rim_factor`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| L | 0.232000 / 0.232000 / 0.232000 | m / OBSERVED_VERIFIED | Lid outside length  [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet) |
| W | 0.183000 / 0.183000 / 0.183000 | m / OBSERVED_VERIFIED | Outside width  [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet) |
| H | 0.016000 / 0.016000 / 0.016000 | m / OBSERVED_VERIFIED | Outside height  [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet) |
| t | 0.150000 / 0.250000 / 0.400000 | mm / ASSUMED | Assumed average formed wall gauge; not sheet feed gauge or manufacturer tolerance   |
| rho | 1.400000 / 1.400000 / 1.400000 | g/cm3 / ASSUMED | PET proxy  [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| flange | 1.050000 / 1.100000 / 1.200000 | factor / ASSUMED | Rim/corners allowance   |

**Assumptions:** Simple developed area of lid dome; no measured forming thickness.
**Sensitivity / dominant uncertainty:** Average formed gauge 0.15-0.40 mm dominates.

## E012 — C4.total_package_mass_g

**State:** ESTIMATED. **Result:** 63.949788 / 73.318360 / 89.714592 g (low / central / high).
**Formula:** `total = historical body + modelled lid + ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| body | 51.560000 / 51.560000 / 51.560000 | g / ASSUMED | Calculated conditional range; original dependencies retained in referenced calculation.  `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094) |
| lid | 12.289788 / 21.458360 / 37.454592 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E011 [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** Body assumed unchanged at historical 51.56 g.
**Sensitivity / dominant uncertainty:** Unmeasured lid gauge dominates.

## E013 — C4.virgin_plastic_mass_g

**State:** ESTIMATED. **Result:** 25.279788 / 36.195160 / 54.138192 g (low / central / high).
**Formula:** `virgin = body*(1-body_PCR) + lid + ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| body | 51.560000 / 51.560000 / 51.560000 | g / ASSUMED | Calculated conditional range; original dependencies retained in referenced calculation.  `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094) |
| lid | 12.289788 / 21.458360 / 37.454592 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E011 [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |
| pcr | 0.690000 / 0.720000 / 0.750000 | fraction / ASSUMED | Inherited exact body PCR; midpoint assumed  `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094) |

**Assumptions:** Lid and ancillary conservatively assumed virgin; actual lid PCR unknown.
**Sensitivity / dominant uncertainty:** Lid gauge and body PCR; body historical-source risk.

## E014 — C4.recycled_material_fraction

**State:** ESTIMATED. **Result:** 0.396551 / 0.506329 / 0.604693 fraction (low / central / high).
**Formula:** `whole_pack_recycled = body*body_PCR/(body+lid+ancillary)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| body | 51.560000 / 51.560000 / 51.560000 | g / ASSUMED | Calculated conditional range; original dependencies retained in referenced calculation.  `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094) |
| lid | 12.289788 / 21.458360 / 37.454592 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E011 [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |
| pcr | 0.690000 / 0.720000 / 0.750000 | fraction / ASSUMED | Inherited exact body PCR; midpoint assumed  `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094) |

**Assumptions:** Only body PCR counted; lid recycled share unverified.
**Sensitivity / dominant uncertainty:** Lid mass dilutes whole-package recycled fraction.

## E015 — PRICE-C5-BODY.unit_price

**State:** DERIVED_EXACT. **Result:** 0.322808 / 0.322808 / 0.322808 EUR/pack (low / central / high).
**Formula:** `published amount / published quantity`
**Method:** Exact arithmetic on published observations. **Confidence:** MEDIUM.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| amount | 251.790000 / 251.790000 / 251.790000 | EUR / OBSERVED_VERIFIED | Published amount; see VAT basis.  [S12](https://mixpack.ee/en/product/biopap-easy-catering-si-14-pakis-780-tk/) |
| count | 780.000000 / 780.000000 / 780.000000 | pieces / OBSERVED_VERIFIED | Published selling pack  [S12](https://mixpack.ee/en/product/biopap-easy-catering-si-14-pakis-780-tk/) |

**Assumptions:** No currency, tax or freight conversion.
**Sensitivity / dominant uncertainty:** Price/stock can change.

## E016 — C5.film_model_g

**State:** ESTIMATED. **Result:** 2.125976 / 2.784016 / 3.644530 g (low / central / high).
**Formula:** `film = 0.190*0.247*overlap_factor*43*(gauge/29.9)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| L | 0.190000 / 0.190000 / 0.190000 | m / OBSERVED_VERIFIED | Outside rim width  [S10](https://www.biopap.com/wp-content/uploads/2021/05/BIOPAP_Tabella_DimensioniSitoQR_ENG.pdf) |
| W | 0.247000 / 0.247000 / 0.247000 | m / OBSERVED_VERIFIED | Outside rim length  [S10](https://www.biopap.com/wp-content/uploads/2021/05/BIOPAP_Tabella_DimensioniSitoQR_ENG.pdf) |
| waste | 1.050000 / 1.100000 / 1.200000 | factor / ASSUMED | Seal overlap/trim assigned per package; net attached film may be lower   |
| basis_gsm | 43.000000 / 43.000000 / 43.000000 | g/m2 / ASSUMED | Comparable 29.9 um cellulose film  [S31](https://doi.org/10.1002/pts.70020) |
| gauge | 30.000000 / 37.500000 / 45.000000 | um / ASSUMED | Comparable cellulose thickness envelope, not selected closure  [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| reference_gauge | 29.900000 / 29.900000 / 29.900000 | um / OBSERVED_VERIFIED | Comparable basis weight reference  [S31](https://doi.org/10.1002/pts.70020) |

**Assumptions:** No film SKU selected. 185 mm BIOF22248 price reference is NOT physically compatible with 190 mm tray; use only material analogue.
**Sensitivity / dominant uncertainty:** Film gauge, seal trim and actual coating system.

## E017 — C5.total_package_mass_g

**State:** ESTIMATED. **Result:** 23.375976 / 26.584016 / 30.194530 g (low / central / high).
**Formula:** `total = tray + film allocation + ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| body | 21.150000 / 23.500000 / 25.850000 | g / ASSUMED | Historical nominal 23.5 g with assumed +/-10% engineering allowance, not manufacturer tolerance  [S11](https://www.boostyup.com/wp-content/uploads/2024/05/Gamme-contenants-BIOPAP-LC.pdf) |
| film | 2.125976 / 2.784016 / 3.644530 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E016 [S10](https://www.biopap.com/wp-content/uploads/2021/05/BIOPAP_Tabella_DimensioniSitoQR_ENG.pdf), [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** Film trim allocated to each unit, conservative for mass screening.
**Sensitivity / dominant uncertainty:** Current body specification and film gauge; nominal body has historical exact evidence.

## E018 — C5-SCENARIO.virgin_plastic_accounting_budget_g

**State:** ESTIMATED. **Result:** 2.225976 / 3.084016 / 4.344530 g (low / central / high).
**Formula:** `budget = all film allocation + ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| film | 2.125976 / 2.784016 / 3.644530 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E016 [S10](https://www.biopap.com/wp-content/uploads/2021/05/BIOPAP_Tabella_DimensioniSitoQR_ENG.pdf), [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** Assume selected LC body plastic-free based on family statement; this is not exact-BOM verification. Count entire cellulose film plus ancillary as virgin plastic conservatively; not a legal classification.
**Sensitivity / dominant uncertainty:** Tray coating classification and film gauge; invalid if uncounted plastic-bearing body layers exist.

## E019 — PRICE-C6-RO-BODY.unit_price

**State:** DERIVED_EXACT. **Result:** 0.760000 / 0.760000 / 0.760000 RON/pack (low / central / high).
**Formula:** `published amount / published quantity`
**Method:** Exact arithmetic on published observations. **Confidence:** MEDIUM.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| amount | 76.000000 / 76.000000 / 76.000000 | RON / OBSERVED_VERIFIED | Published amount; see VAT basis.  [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S23](https://www.e-ambalaj.ro/termeni-si-conditii/) |
| count | 100.000000 / 100.000000 / 100.000000 | pieces / OBSERVED_VERIFIED | Published selling pack  [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S23](https://www.e-ambalaj.ro/termeni-si-conditii/) |

**Assumptions:** No currency, tax or freight conversion.
**Sensitivity / dominant uncertainty:** Price/stock can change.

## E020 — PRICE-C6-RO-LID.unit_price

**State:** DERIVED_EXACT. **Result:** 0.388500 / 0.388500 / 0.388500 RON/pack (low / central / high).
**Formula:** `published amount / published quantity`
**Method:** Exact arithmetic on published observations. **Confidence:** MEDIUM.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| amount | 38.850000 / 38.850000 / 38.850000 | RON / OBSERVED_VERIFIED | Published amount; see VAT basis.  [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html) |
| count | 100.000000 / 100.000000 / 100.000000 | pieces / OBSERVED_VERIFIED | Published selling pack  [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html) |

**Assumptions:** No currency, tax or freight conversion.
**Sensitivity / dominant uncertainty:** Price/stock can change.

## E021 — C6-RO-P.romania_unit_price

**State:** ESTIMATED. **Result:** 1.148500 / 1.148500 / 1.291500 RON/pack (low / central / high).
**Formula:** `(body pack price + lid pack price)/100`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** MEDIUM.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| body_set | 76.000000 / 76.000000 / 90.300000 | RON / OBSERVED_VERIFIED | Published sale and regular prices; central is current sale  [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S23](https://www.e-ambalaj.ro/termeni-si-conditii/) |
| lid_set | 38.850000 / 38.850000 / 38.850000 | RON / OBSERVED_VERIFIED | Published VAT-included lid pack  [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html) |
| count | 100.000000 / 100.000000 / 100.000000 | pieces / OBSERVED_VERIFIED | Both sellers sell packs of 100  [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html) |

**Assumptions:** Conditional component combination; cross-seller 729 fit must be confirmed. For 1400 sets, order 1400 bodies and 1400 lids separately: each order exceeds its published 500 RON free-delivery threshold. No invented distributor margin, VAT rate, conversion premium or freight. Packaging machine/labour excluded. Interval spans advertised sale/regular body prices, not a forecast or negotiated industrial quotation.
**Sensitivity / dominant uncertainty:** Promotional body price and supplier fit; below free-delivery threshold freight becomes UNKNOWN.

## E022 — C6-RO-P.body_model_g

**State:** ESTIMATED. **Result:** 15.559741 / 24.698001 / 35.318142 g (low / central / high).
**Formula:** `m_local = m_reference * A_local/A_reference * gauge_draw_factor`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| reference_mass | 27.900000 / 31.000000 / 34.100000 | g / OBSERVED_VERIFIED | 31 g +/-10% manufacturer tolerance  [S24](https://assets.ccntr.pbsnetwork.eu/assets/5790002196140/ts_dk_1731903_00_iss_28062021.pdf) |
| target_area | 0.064700 / 0.064700 / 0.064700 | m2 / ASSUMED | Developed rectangle estimate using outside dimensions  [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/) |
| reference_area | 0.081209 / 0.081209 / 0.081209 | m2 / ASSUMED | Approximate developed area using reference base and height  [S24](https://assets.ccntr.pbsnetwork.eu/assets/5790002196140/ts_dk_1731903_00_iss_28062021.pdf) |
| scale | 0.700000 / 1.000000 / 1.300000 | factor / ASSUMED | Assumed gauge/draw/flange differences; no supplier tolerance for local article   |

**Assumptions:** 0192110201 is a mass analogue only; local alloy, gauge and recycled share unknown. Outside-wall approximation deliberately widened by +/-30% scaling envelope.
**Sensitivity / dominant uncertainty:** Unknown local foil gauge/draw; dimensions alone do not fix mass.

## E023 — C6-RO-P.lid_model_g

**State:** ESTIMATED. **Result:** 9.106650 / 18.903500 / 38.236800 g (low / central / high).
**Formula:** `lid=(L*W+2*H*(L+W))*t*rho*1000*rim_factor`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| L | 0.220000 / 0.220000 / 0.220000 | m / ASSUMED | Nominated 729 footprint, cross-seller fit assumed  [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S21](https://www.e-ambalaj.ro/produs/capac-caserole-680-681-729/) |
| W | 0.170000 / 0.170000 / 0.170000 | m / ASSUMED | Nominated footprint  [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S21](https://www.e-ambalaj.ro/produs/capac-caserole-680-681-729/) |
| H | 0.005000 / 0.015000 / 0.025000 | m / ASSUMED | Unmeasured lid rise, assumed   |
| t | 0.150000 / 0.250000 / 0.400000 | mm / ASSUMED | Unmeasured average formed gauge   |
| rho | 1.400000 / 1.400000 / 1.400000 | g/cm3 / ASSUMED | PET branch only; actual polymer is unknown  [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| flange | 1.050000 / 1.100000 / 1.200000 | factor / ASSUMED | Rim/corners envelope   |

**Assumptions:** PET clear-lid branch only; do not present polymer as observed.
**Sensitivity / dominant uncertainty:** Formed gauge, dome rise, actual polymer.

## E024 — C6-RO-P.total_package_mass_g

**State:** ESTIMATED. **Result:** 24.766391 / 43.901501 / 74.254942 g (low / central / high).
**Formula:** `total = scaled aluminium body + modelled clear PET lid + ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| body | 15.559741 / 24.698001 / 35.318142 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E022 [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S24](https://assets.ccntr.pbsnetwork.eu/assets/5790002196140/ts_dk_1731903_00_iss_28062021.pdf) |
| lid | 9.106650 / 18.903500 / 38.236800 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E023 [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S21](https://www.e-ambalaj.ro/produs/capac-caserole-680-681-729/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** All unmeasured coating/labels represented by ancillary envelope; may be invalid if a substantial liner exists.
**Sensitivity / dominant uncertainty:** Foil gauge, lid gauge/height and unknown material.

## E025 — C6-RO-P.plastic_mass_g

**State:** ESTIMATED. **Result:** 9.206650 / 19.203500 / 38.936800 g (low / central / high).
**Formula:** `plastic = PET-branch lid + all ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| lid | 9.106650 / 18.903500 / 38.236800 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E023 [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S21](https://www.e-ambalaj.ro/produs/capac-caserole-680-681-729/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** Body assumed without a substantial polymer laminate. All modelled plastic conservatively assumed virgin; recycled content remains unknown.
**Sensitivity / dominant uncertainty:** Actual lid polymer/gauge and body coating.

## E026 — PRICE-C6-W-BODY.unit_price

**State:** DERIVED_EXACT. **Result:** 1.872500 / 1.872500 / 1.872500 RON/pack (low / central / high).
**Formula:** `published amount / published quantity`
**Method:** Exact arithmetic on published observations. **Confidence:** MEDIUM.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| amount | 187.250000 / 187.250000 / 187.250000 | RON / OBSERVED_VERIFIED | Published amount; see VAT basis.  [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery) |
| count | 100.000000 / 100.000000 / 100.000000 | pieces / OBSERVED_VERIFIED | Published selling pack  [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery) |

**Assumptions:** No currency, tax or freight conversion.
**Sensitivity / dominant uncertainty:** Price/stock can change.

## E027 — PRICE-C6-W-LID.unit_price

**State:** DERIVED_EXACT. **Result:** 0.411500 / 0.411500 / 0.411500 RON/pack (low / central / high).
**Formula:** `published amount / published quantity`
**Method:** Exact arithmetic on published observations. **Confidence:** MEDIUM.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| amount | 41.150000 / 41.150000 / 41.150000 | RON / OBSERVED_VERIFIED | Published amount; see VAT basis.  [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery) |
| count | 100.000000 / 100.000000 / 100.000000 | pieces / OBSERVED_VERIFIED | Published selling pack  [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery) |

**Assumptions:** No currency, tax or freight conversion.
**Sensitivity / dominant uncertainty:** Price/stock can change.

## E028 — C6-RO-W.pair_reference_price

**State:** DERIVED_EXACT. **Result:** 2.284000 / 2.284000 / 2.284000 RON/pack (low / central / high).
**Formula:** `(187.25+41.15)/100`
**Method:** Exact arithmetic on published observations. **Confidence:** LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| body | 187.250000 / 187.250000 / 187.250000 | RON / OBSERVED_VERIFIED | 100 body pack including VAT  [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery) |
| lid | 41.150000 / 41.150000 / 41.150000 | RON / OBSERVED_VERIFIED | 100 lid pack including VAT  [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery) |

**Assumptions:** Lid transparency unknown; freight excluded.
**Sensitivity / dominant uncertainty:** Listing changes.

## E029 — PRICE-C6-H.unit_price

**State:** DERIVED_EXACT. **Result:** 1.430000 / 1.430000 / 1.430000 RON/pack (low / central / high).
**Formula:** `published amount / published quantity`
**Method:** Exact arithmetic on published observations. **Confidence:** MEDIUM.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| amount | 143.000000 / 143.000000 / 143.000000 | RON / OBSERVED_VERIFIED | Published amount; see VAT basis.  [S19](https://www.e-ambalaj.ro/produs/caserole-din-aluminiu-pentru-pui-la-rotisor/), [S23](https://www.e-ambalaj.ro/termeni-si-conditii/) |
| count | 100.000000 / 100.000000 / 100.000000 | pieces / OBSERVED_VERIFIED | Published selling pack  [S19](https://www.e-ambalaj.ro/produs/caserole-din-aluminiu-pentru-pui-la-rotisor/), [S23](https://www.e-ambalaj.ro/termeni-si-conditii/) |

**Assumptions:** No currency, tax or freight conversion.
**Sensitivity / dominant uncertainty:** Price/stock can change.

## E030 — PRICE-C6-EU.unit_price

**State:** ESTIMATED. **Result:** 5.952500 / 5.952500 / 5.952500 DKK/pack (low / central / high).
**Formula:** `published amount / published quantity`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** MEDIUM.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| amount | 595.250000 / 595.250000 / 595.250000 | DKK / ASSUMED | Published amount; see VAT basis.  `R3` (input manifest), [S26](https://www.antalis.dk/eshop/fodevareemballage-og-bordaekning/bakker-fodevarer/foliebakker-ready2cook-pdp-hq16491/sku-687194) |
| count | 100.000000 / 100.000000 / 100.000000 | pieces / OBSERVED_VERIFIED | Published selling pack  `R3` (input manifest), [S26](https://www.antalis.dk/eshop/fodevareemballage-og-bordaekning/bakker-fodevarer/foliebakker-ready2cook-pdp-hq16491/sku-687194) |

**Assumptions:** No currency, tax or freight conversion.
**Sensitivity / dominant uncertainty:** Price/stock can change.

## E031 — C6-EU.lid_model_g

**State:** ESTIMATED. **Result:** 18.963000 / 33.110000 / 34.920000 g (low / central / high).
**Formula:** `lid = min(geometry estimate, 6984g/200)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| L | 0.300000 / 0.300000 / 0.300000 | m / ASSUMED | Inherited exact lid dimension  `R3` (input manifest), [S25](https://pluspack.com/product/lid-dpet-af-rect-h26mm-clbag-3/) |
| W | 0.200000 / 0.200000 / 0.200000 | m / ASSUMED | Inherited exact lid dimension  `R3` (input manifest), [S25](https://pluspack.com/product/lid-dpet-af-rect-h26mm-clbag-3/) |
| H | 0.026000 / 0.026000 / 0.026000 | m / ASSUMED | Inherited exact lid dimension  `R3` (input manifest), [S25](https://pluspack.com/product/lid-dpet-af-rect-h26mm-clbag-3/) |
| t | 0.150000 / 0.250000 / 0.400000 | mm / ASSUMED | Unmeasured average formed gauge   |
| rho | 1.400000 / 1.400000 / 1.400000 | g/cm3 / ASSUMED | PET branch only; actual polymer is unknown  [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| flange | 1.050000 / 1.100000 / 1.200000 | factor / ASSUMED | Rim/corners envelope   |
| gross_cap | 34.920000 / 34.920000 / 34.920000 | g / ASSUMED | Gross carton per piece is an upper bound only; tare unknown  `R3` (input manifest), [S25](https://pluspack.com/product/lid-dpet-af-rect-h26mm-clbag-3/) |

**Assumptions:** Geometry central plus gross-carton upper cap; no assumed carton tare.
**Sensitivity / dominant uncertainty:** Formed wall gauge; inherited gross carton mass ceiling.

## E032 — C6-EU.total_package_mass_g

**State:** ESTIMATED. **Result:** 46.963000 / 64.410000 / 69.720000 g (low / central / high).
**Formula:** `total=body+lid+ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| body | 27.900000 / 31.000000 / 34.100000 | g / OBSERVED_VERIFIED | Calculated conditional range; original dependencies retained in referenced calculation.  [S24](https://assets.ccntr.pbsnetwork.eu/assets/5790002196140/ts_dk_1731903_00_iss_28062021.pdf) |
| lid | 18.963000 / 33.110000 / 34.920000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E031 `R3` (input manifest), [S25](https://pluspack.com/product/lid-dpet-af-rect-h26mm-clbag-3/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** Lid estimated, so complete sum is not DERIVED_EXACT.
**Sensitivity / dominant uncertainty:** Lid thickness and carton-tare uncertainty.

## E033 — C6-EU.plastic_mass_g

**State:** ESTIMATED. **Result:** 19.063000 / 33.410000 / 35.620000 g (low / central / high).
**Formula:** `plastic=lid+ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| lid | 18.963000 / 33.110000 / 34.920000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E031 `R3` (input manifest), [S25](https://pluspack.com/product/lid-dpet-af-rect-h26mm-clbag-3/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** Ancillary/coating allowance all counted as plastic; lid recycled share unknown.
**Sensitivity / dominant uncertainty:** Lid mass.

## E034 — C6-RO-P.cost_delta_vs_B3_pct

**State:** ESTIMATED. **Result:** 210.187436 / 210.187436 / 248.808945 % (low / central / high).
**Formula:** `100*(candidate/B3 - 1)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 1.148500 / 1.148500 / 1.291500 | RON/pack / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E021 [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html), [S23](https://www.e-ambalaj.ro/termeni-si-conditii/) |
| baseline | 0.370260 / 0.370260 / 0.370260 | RON/pack / DERIVED_EXACT | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E006 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** Both selected prices include VAT; different formats/functionality are not yet equal-fill qualified. B3 freight excluded, candidate free-shipping scenario requires stated order.
**Sensitivity / dominant uncertainty:** Promotion and configuration compatibility; no statement about Profi actual procurement cost.

## E035 — C6-RO-P.B1_price_threshold_for_15pct_premium

**State:** ESTIMATED. **Result:** 0.998696 / 0.998696 / 1.123043 RON/pack (low / central / high).
**Formula:** `B1 threshold = candidate_price/1.15`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** MEDIUM.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 1.148500 / 1.148500 / 1.291500 | RON/pack / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E021 [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html), [S23](https://www.e-ambalaj.ro/termeni-si-conditii/) |

**Assumptions:** This is a break-even threshold, NOT an estimate of Profi price.
**Sensitivity / dominant uncertainty:** Candidate price and same VAT/functional basis.

## E036 — C4.ron_component_reference

**State:** DERIVED_EXACT. **Result:** 1.242808 / 1.242808 / 1.242808 RON/pack (low / central / high).
**Formula:** `source unit price * EURRON / EURDKK if DKK, otherwise source unit price * EURRON`
**Method:** Exact arithmetic on published observations. **Confidence:** LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| unit | 1.760753 / 1.760753 / 1.760753 | DKK/pack / DERIVED_EXACT | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E010 [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet) |
| eur_ron | 5.276500 / 5.276500 / 5.276500 | RON/EUR / OBSERVED_VERIFIED | ECB 2026-09-25 reference  [S33](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.ga.html) |
| eur_dkk | 7.475500 / 7.475500 / 7.475500 | DKK/EUR / OBSERVED_VERIFIED | Same ECB date  [S33](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.ga.html) |

**Assumptions:** Currency conversion does not add freight, resolve VAT or make a complete system price.
**Sensitivity / dominant uncertainty:** Reference FX, original seller price.

## E037 — C5.ron_component_reference

**State:** DERIVED_EXACT. **Result:** 1.703295 / 1.703295 / 1.703295 RON/pack (low / central / high).
**Formula:** `source unit price * EURRON / EURDKK if DKK, otherwise source unit price * EURRON`
**Method:** Exact arithmetic on published observations. **Confidence:** LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| unit | 0.322808 / 0.322808 / 0.322808 | EUR/pack / DERIVED_EXACT | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E015 [S12](https://mixpack.ee/en/product/biopap-easy-catering-si-14-pakis-780-tk/) |
| eur_ron | 5.276500 / 5.276500 / 5.276500 | RON/EUR / OBSERVED_VERIFIED | ECB 2026-09-25 reference  [S33](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.ga.html) |

**Assumptions:** Currency conversion does not add freight, resolve VAT or make a complete system price.
**Sensitivity / dominant uncertainty:** Reference FX, original seller price.

## E038 — C5.film_material_reference_EUR

**State:** ESTIMATED. **Result:** 0.088847 / 0.099016 / 0.108017 EUR/pack (low / central / high).
**Formula:** `film material reference = allocated area * comparable price/roll area`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| area | 0.046930 / 0.046930 / 0.046930 | m2 / OBSERVED_VERIFIED | Rim plan area  [S10](https://www.biopap.com/wp-content/uploads/2021/05/BIOPAP_Tabella_DimensioniSitoQR_ENG.pdf) |
| waste | 1.050000 / 1.100000 / 1.200000 | factor / ASSUMED | Seal/trim use   |
| roll_price | 166.780000 / 177.420000 / 177.420000 | EUR / OBSERVED_VERIFIED | 10-roll vs 1-roll tier  [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| roll_area | 92.500000 / 92.500000 / 92.500000 | m2 / OBSERVED_VERIFIED | Comparable roll, NOT physically compatible width  [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |

**Assumptions:** Ex VAT; same cost per square metre assumed at a wider compatible reel. Do not add to a VAT-ambiguous body price as a gross total. No conversion, sealer amortization or delivered-to-Romania price.
**Sensitivity / dominant uncertainty:** Exact film grade, width, trim and quote.

## E039 — C1-vs-B1.virgin_plastic_reduction_pct

**State:** ESTIMATED. **Result:** -453.701310 / -64.576441 / 35.784510 % (low / central / high).
**Formula:** `low=100*(1-C_high/B_low); central=100*(1-C_central/B_central); high=100*(1-C_low/B_high)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 8.001250 / 10.695000 / 14.350000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E008 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| baseline | 2.591650 / 6.498500 / 12.460000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E002 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Baseline film gauge and candidate closure mass/composition.

## E040 — C1-vs-B1.virgin_plastic_reduction_g

**State:** ESTIMATED. **Result:** -11.758350 / -4.196500 / 4.458750 g (low / central / high).
**Formula:** `low=B_low-C_high; central=B_central-C_central; high=B_high-C_low`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 8.001250 / 10.695000 / 14.350000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E008 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| baseline | 2.591650 / 6.498500 / 12.460000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E002 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Same as percentage; this is per nominated pack, not annual saving.

## E041 — C1-vs-B3.virgin_plastic_reduction_pct

**State:** ESTIMATED. **Result:** -321.129861 / -170.246368 / -63.290816 % (low / central / high).
**Formula:** `low=100*(1-C_high/B_low); central=100*(1-C_central/B_central); high=100*(1-C_low/B_high)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 8.001250 / 10.695000 / 14.350000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E008 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| baseline | 3.407500 / 3.957500 / 4.900000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E004 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Baseline film gauge and candidate closure mass/composition.

## E042 — C1-vs-B3.virgin_plastic_reduction_g

**State:** ESTIMATED. **Result:** -10.942500 / -6.737500 / -3.101250 g (low / central / high).
**Formula:** `low=B_low-C_high; central=B_central-C_central; high=B_high-C_low`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 8.001250 / 10.695000 / 14.350000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E008 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| baseline | 3.407500 / 3.957500 / 4.900000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E004 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Same as percentage; this is per nominated pack, not annual saving.

## E043 — C2-vs-B1.virgin_plastic_reduction_pct

**State:** ESTIMATED. **Result:** -293.262979 / 11.700777 / 65.868780 % (low / central / high).
**Formula:** `low=100*(1-C_high/B_low); central=100*(1-C_central/B_central); high=100*(1-C_low/B_high)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 4.252750 / 5.738125 / 10.192000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E009 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |
| baseline | 2.591650 / 6.498500 / 12.460000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E002 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Baseline film gauge and candidate closure mass/composition.

## E044 — C2-vs-B1.virgin_plastic_reduction_g

**State:** ESTIMATED. **Result:** -7.600350 / 0.760375 / 8.207250 g (low / central / high).
**Formula:** `low=B_low-C_high; central=B_central-C_central; high=B_high-C_low`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 4.252750 / 5.738125 / 10.192000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E009 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |
| baseline | 2.591650 / 6.498500 / 12.460000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E002 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Same as percentage; this is per nominated pack, not annual saving.

## E045 — C2-vs-B3.virgin_plastic_reduction_pct

**State:** ESTIMATED. **Result:** -199.104916 / -44.993683 / 13.209184 % (low / central / high).
**Formula:** `low=100*(1-C_high/B_low); central=100*(1-C_central/B_central); high=100*(1-C_low/B_high)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 4.252750 / 5.738125 / 10.192000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E009 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |
| baseline | 3.407500 / 3.957500 / 4.900000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E004 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Baseline film gauge and candidate closure mass/composition.

## E046 — C2-vs-B3.virgin_plastic_reduction_g

**State:** ESTIMATED. **Result:** -6.784500 / -1.780625 / 0.647250 g (low / central / high).
**Formula:** `low=B_low-C_high; central=B_central-C_central; high=B_high-C_low`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 4.252750 / 5.738125 / 10.192000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E009 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |
| baseline | 3.407500 / 3.957500 / 4.900000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E004 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Same as percentage; this is per nominated pack, not annual saving.

## E047 — C4-vs-B1.virgin_plastic_reduction_pct

**State:** ESTIMATED. **Result:** -1988.946887 / -456.977149 / -102.887544 % (low / central / high).
**Formula:** `low=100*(1-C_high/B_low); central=100*(1-C_central/B_central); high=100*(1-C_low/B_high)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 25.279788 / 36.195160 / 54.138192 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E013 `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094), [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| baseline | 2.591650 / 6.498500 / 12.460000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E002 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Baseline film gauge and candidate closure mass/composition.

## E048 — C4-vs-B1.virgin_plastic_reduction_g

**State:** ESTIMATED. **Result:** -51.546542 / -29.696660 / -12.819788 g (low / central / high).
**Formula:** `low=B_low-C_high; central=B_central-C_central; high=B_high-C_low`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 25.279788 / 36.195160 / 54.138192 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E013 `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094), [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| baseline | 2.591650 / 6.498500 / 12.460000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E002 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Same as percentage; this is per nominated pack, not annual saving.

## E049 — C4-vs-B3.virgin_plastic_reduction_pct

**State:** ESTIMATED. **Result:** -1488.795070 / -814.596589 / -415.914041 % (low / central / high).
**Formula:** `low=100*(1-C_high/B_low); central=100*(1-C_central/B_central); high=100*(1-C_low/B_high)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 25.279788 / 36.195160 / 54.138192 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E013 `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094), [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| baseline | 3.407500 / 3.957500 / 4.900000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E004 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Baseline film gauge and candidate closure mass/composition.

## E050 — C4-vs-B3.virgin_plastic_reduction_g

**State:** ESTIMATED. **Result:** -50.730692 / -32.237660 / -20.379788 g (low / central / high).
**Formula:** `low=B_low-C_high; central=B_central-C_central; high=B_high-C_low`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 25.279788 / 36.195160 / 54.138192 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E013 `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094), [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| baseline | 3.407500 / 3.957500 / 4.900000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E004 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Same as percentage; this is per nominated pack, not annual saving.

## E051 — C5-vs-B1.virgin_plastic_reduction_pct

**State:** ESTIMATED. **Result:** -67.635693 / 52.542644 / 82.135023 % (low / central / high).
**Formula:** `low=100*(1-C_high/B_low); central=100*(1-C_central/B_central); high=100*(1-C_low/B_high)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 2.225976 / 3.084016 / 4.344530 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E018 [S10](https://www.biopap.com/wp-content/uploads/2021/05/BIOPAP_Tabella_DimensioniSitoQR_ENG.pdf), [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| baseline | 2.591650 / 6.498500 / 12.460000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E002 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Baseline film gauge and candidate closure mass/composition.

## E052 — C5-vs-B1.virgin_plastic_reduction_g

**State:** ESTIMATED. **Result:** -1.752880 / 3.414484 / 10.234024 g (low / central / high).
**Formula:** `low=B_low-C_high; central=B_central-C_central; high=B_high-C_low`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 2.225976 / 3.084016 / 4.344530 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E018 [S10](https://www.biopap.com/wp-content/uploads/2021/05/BIOPAP_Tabella_DimensioniSitoQR_ENG.pdf), [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| baseline | 2.591650 / 6.498500 / 12.460000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E002 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Same as percentage; this is per nominated pack, not annual saving.

## E053 — C5-vs-B3.virgin_plastic_reduction_pct

**State:** ESTIMATED. **Result:** -27.499059 / 22.071603 / 54.571917 % (low / central / high).
**Formula:** `low=100*(1-C_high/B_low); central=100*(1-C_central/B_central); high=100*(1-C_low/B_high)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 2.225976 / 3.084016 / 4.344530 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E018 [S10](https://www.biopap.com/wp-content/uploads/2021/05/BIOPAP_Tabella_DimensioniSitoQR_ENG.pdf), [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| baseline | 3.407500 / 3.957500 / 4.900000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E004 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Baseline film gauge and candidate closure mass/composition.

## E054 — C5-vs-B3.virgin_plastic_reduction_g

**State:** ESTIMATED. **Result:** -0.937030 / 0.873484 / 2.674024 g (low / central / high).
**Formula:** `low=B_low-C_high; central=B_central-C_central; high=B_high-C_low`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 2.225976 / 3.084016 / 4.344530 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E018 [S10](https://www.biopap.com/wp-content/uploads/2021/05/BIOPAP_Tabella_DimensioniSitoQR_ENG.pdf), [S31](https://doi.org/10.1002/pts.70020), [S32](https://www.biopack.be/en/biof22248-rol-transparent-compostable-topsealing-film-natureflex) |
| baseline | 3.407500 / 3.957500 / 4.900000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E004 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Same as percentage; this is per nominated pack, not annual saving.

## E055 — C6-vs-B1.virgin_plastic_reduction_pct

**State:** ESTIMATED. **Result:** -1402.394228 / -195.506655 / 26.110353 % (low / central / high).
**Formula:** `low=100*(1-C_high/B_low); central=100*(1-C_central/B_central); high=100*(1-C_low/B_high)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 9.206650 / 19.203500 / 38.936800 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E025 [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S21](https://www.e-ambalaj.ro/produs/capac-caserole-680-681-729/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| baseline | 2.591650 / 6.498500 / 12.460000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E002 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Baseline film gauge and candidate closure mass/composition.

## E056 — C6-vs-B1.virgin_plastic_reduction_g

**State:** ESTIMATED. **Result:** -36.345150 / -12.705000 / 3.253350 g (low / central / high).
**Formula:** `low=B_low-C_high; central=B_central-C_central; high=B_high-C_low`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 9.206650 / 19.203500 / 38.936800 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E025 [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S21](https://www.e-ambalaj.ro/produs/capac-caserole-680-681-729/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| baseline | 2.591650 / 6.498500 / 12.460000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E002 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Same as percentage; this is per nominated pack, not annual saving.

## E057 — C6-vs-B3.virgin_plastic_reduction_pct

**State:** ESTIMATED. **Result:** -1042.679384 / -385.243209 / -87.890816 % (low / central / high).
**Formula:** `low=100*(1-C_high/B_low); central=100*(1-C_central/B_central); high=100*(1-C_low/B_high)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 9.206650 / 19.203500 / 38.936800 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E025 [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S21](https://www.e-ambalaj.ro/produs/capac-caserole-680-681-729/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| baseline | 3.407500 / 3.957500 / 4.900000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E004 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Baseline film gauge and candidate closure mass/composition.

## E058 — C6-vs-B3.virgin_plastic_reduction_g

**State:** ESTIMATED. **Result:** -35.529300 / -15.246000 / -4.306650 g (low / central / high).
**Formula:** `low=B_low-C_high; central=B_central-C_central; high=B_high-C_low`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| candidate | 9.206650 / 19.203500 / 38.936800 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E025 [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S21](https://www.e-ambalaj.ro/produs/capac-caserole-680-681-729/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| baseline | 3.407500 / 3.957500 / 4.900000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E004 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |

**Assumptions:** Different filled-pack functionality is unverified; compare only after matching fill and format. Conservative independent extremes; not a probability interval. Negative reduction means more virgin plastic.
**Sensitivity / dominant uncertainty:** Same as percentage; this is per nominated pack, not annual saving.

## E059 — B1-PET-ONLY.mass_g

**State:** ESTIMATED. **Result:** 3.187000 / 6.498500 / 12.460000 g (low / central / high).
**Formula:** `PET bag mass=A*gauge*1.4+ancillary`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| area | 0.183750 / 0.192500 / 0.210000 | m2 / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E001 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) |
| gauge | 12.000000 / 23.000000 / 40.000000 | um / ASSUMED | Comparable commercial gauges; exact Profi film unknown  [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/) |
| density | 1.400000 / 1.400000 / 1.400000 | g/cm3 / ASSUMED | PET-only branch  [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |

**Assumptions:** PET-only scenario for coherent carbon estimate.
**Sensitivity / dominant uncertainty:** Gauge and size.

## E060 — B1-PET-ONLY.material_only_co2e_kg

**State:** ESTIMATED. **Result:** 0.004975 / 0.014492 / 0.036122 kg CO2e/pack (low / central / high).
**Formula:** `sum(material_mass_g/1000 * material_EF_kgCO2e_per_kg)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| mass | 3.187000 / 6.498500 / 12.460000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E059 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/), [S28](https://www.m-petfilm.de/en/products-by-application/packaging/hostaphan-polyester-films-for-oven-applications/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/) |
| ef | 1.561000 / 2.230000 / 2.899000 | kg CO2e/kg / ASSUMED | Historical US virgin PET factor, analyst +/-30% sensitivity  [S34](https://plasticsrecycling.org/wp-content/uploads/2024/08/APR-Recycled-vs-Virgin-LCA-May2020.pdf) |

**Assumptions:** PET assumed; actual B1 polymer unknown. Ancillary assigned PET factor. Factor uncertainty +/-30% is an analyst sensitivity envelope, not a published confidence interval.
**Sensitivity / dominant uncertainty:** Polymer/alloy branch, old/geographically mismatched factor, and component mass.

## E061 — C2-PA6.material_only_co2e_kg

**State:** ESTIMATED. **Result:** 0.019945 / 0.038445 / 0.088772 kg CO2e/pack (low / central / high).
**Formula:** `sum(material_mass_g/1000 * material_EF_kgCO2e_per_kg)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| mass | 4.252750 / 5.738125 / 10.192000 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E009 [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S29](https://aalmirplastic.com/products/plastic-bags/oven-bags-baking-bags/), [S30](https://download.basf.com/p1/8a8082587fd4b608017fd637941722b5/en/ULTRAMID%3Csup%3E%C2%AE%3Csup%3E_B3K_Product_Data_Sheet_Asia_PacificEurope_English.pdf) |
| ef | 4.690000 / 6.700000 / 8.710000 | kg CO2e/kg / ASSUMED | Historical PA6 factor, analyst +/-30% sensitivity  [S35](https://www.basf.com/dam/jcr%3A9b1b4707-e75e-3a84-a545-ef49dd719807/basf/www/hk/documents/en/products-industries/textile-ultramid/Eng_MassBalance_final.pdf) |

**Assumptions:** PA6 proxy for exact unreported nylon formulation; ancillary assigned same factor. Factor uncertainty +/-30% is an analyst sensitivity envelope, not a published confidence interval.
**Sensitivity / dominant uncertainty:** Polymer/alloy branch, old/geographically mismatched factor, and component mass.

## E062 — C4-PET.material_only_co2e_kg

**State:** ESTIMATED. **Result:** 0.064095 / 0.114497 / 0.199034 kg CO2e/pack (low / central / high).
**Formula:** `sum(material_mass_g/1000 * material_EF_kgCO2e_per_kg)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| body | 51.560000 / 51.560000 / 51.560000 | g / ASSUMED | Calculated conditional range; original dependencies retained in referenced calculation.  `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094) |
| lid | 12.289788 / 21.458360 / 37.454592 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E011 [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |
| pcr | 0.690000 / 0.720000 / 0.750000 | fraction / ASSUMED | Inherited exact body PCR; midpoint assumed  `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094) |
| vEF | 1.561000 / 2.230000 / 2.899000 | kg CO2e/kg / ASSUMED | Historical US virgin PET factor, analyst +/-30% sensitivity  [S34](https://plasticsrecycling.org/wp-content/uploads/2024/08/APR-Recycled-vs-Virgin-LCA-May2020.pdf) |
| rEF | 0.637000 / 0.910000 / 1.183000 | kg CO2e/kg / ASSUMED | Historical US rPET factor, analyst +/-30% sensitivity  [S34](https://plasticsrecycling.org/wp-content/uploads/2024/08/APR-Recycled-vs-Virgin-LCA-May2020.pdf) |

**Assumptions:** Historical body PCR; lid and ancillary assumed virgin PET. Exact CPET additives and converting excluded. Factor uncertainty +/-30% is an analyst sensitivity envelope, not a published confidence interval.
**Sensitivity / dominant uncertainty:** Polymer/alloy branch, old/geographically mismatched factor, and component mass.

## E063 — C6-RO-P-PRIMARY-AL-PET.material_only_co2e_kg

**State:** ESTIMATED. **Result:** 0.082990 / 0.198421 / 0.402133 kg CO2e/pack (low / central / high).
**Formula:** `sum(material_mass_g/1000 * material_EF_kgCO2e_per_kg)`
**Method:** Deterministic bounded corner propagation; central is a scenario, not an expected value. **Confidence:** VERY_LOW.

| Input | Low / central / high | Unit / state | Basis / source |
|---|---|---|---|
| body | 15.559741 / 24.698001 / 35.318142 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E022 [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S24](https://assets.ccntr.pbsnetwork.eu/assets/5790002196140/ts_dk_1731903_00_iss_28062021.pdf) |
| lid | 9.106650 / 18.903500 / 38.236800 | g / ESTIMATED | Calculated conditional range; original dependencies retained in referenced calculation. ; calculation E023 [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S21](https://www.e-ambalaj.ro/produs/capac-caserole-680-681-729/), [S27](https://www.m-petfilm.de/en/service/hostaphan-technical-properties/) |
| extra | 0.100000 / 0.300000 / 0.700000 | g / ASSUMED | Unmeasured closure/ink/label allowance; all counted as virgin plastic in conservative screening.   |
| alEF | 4.410000 / 6.300000 / 8.190000 | kg CO2e/kg / ASSUMED | 2023 European primary aluminium average +/-30% sensitivity  [S36](https://european-aluminium.eu/wp-content/uploads/2024/11/06-11-24-European-Aluminium-Environmental-Profile-Report-launch-PR.pdf) |
| petEF | 1.561000 / 2.230000 / 2.899000 | kg CO2e/kg / ASSUMED | Historical US virgin PET factor, analyst +/-30% sensitivity  [S34](https://plasticsrecycling.org/wp-content/uploads/2024/08/APR-Recycled-vs-Virgin-LCA-May2020.pdf) |

**Assumptions:** Assume entirely primary European aluminium and virgin PET lid; actual secondary fraction, origin and polymer unknown. This conservative scenario is not the expected footprint of the listed Romanian product. Factor uncertainty +/-30% is an analyst sensitivity envelope, not a published confidence interval.
**Sensitivity / dominant uncertainty:** Polymer/alloy branch, old/geographically mismatched factor, and component mass.

## Why some values remain unknown

Exact B1 price cannot be derived from another construction. C1/C2/C3 finished price and landed freight have no sourced conversion parameters. C4 body is historical/inactive. C5 body/film references have incomplete VAT and delivery bases. C3 exact current EU construction prevents defensible mass modelling. C1/C5 actual plastic fraction depends on undisclosed coating chemistry: separately labelled film-as-plastic scenarios do not resolve that fact.

No calculations estimate DoC, migration, NIAS, PFAS compliance, six-hour food safety, actual stock, certification numbers, industrial MOQ or actual Profi procurement cost. No missing-carbon material is assigned zero. No mass-based renewable fraction is inferred from ASTM bio-based carbon content.
