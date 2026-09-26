# HTF-02 — Source ledger

**Project:** Biomentorhub × Profi
**Research cut-off:** 2026-09-26
**Dataset:** [HTF-02-romania-candidate-dataset.json](HTF-02-romania-candidate-dataset.json)
**Report:** [HTF-02-romania-candidate-report.md](HTF-02-romania-candidate-report.md)

## Evidence-use rule

A source supports only the fields and boundaries written in its row. Platform evidence is not exact-SKU evidence. Body evidence is not lid/film evidence. A public EU listing is not Romanian delivery. A design or certification claim is not practical Romanian collection, sorting, reprocessing or composting.

| Label | Meaning |
|---|---|
| **Primary** | Regulation, authority, exact manufacturer TDS/article, certification directory or provider evidence. |
| **Secondary** | Distributor, trade press or retailer. Useful within the exact listed identity, price and stock scope. |
| **Context** | Can define a market/system boundary but cannot qualify the selected package. |
| **Adversarial** | Supports a stop, exclusion, inactive/non-stock state or scope limitation. |

---

## A. Field-level mapping by candidate

### B1 — actual Profi incumbent

| Dataset field | Status/value | Source | Boundary |
|---|---|---|---|
| `identity.provider_evidence_status` | `UNKNOWN` | HT2-S001 | Profi source reviewed; no package material, format, supplier or SKU appears. |
| Rotisserie-product context | Context only | HT2-S001, HT2-S002 | Does not identify the actual package. HT2-S002 is third-party and prohibited as provider evidence. |
| All material, mass, thermal, price and procurement fields | `null` / `UNKNOWN` | none | Generic Romanian packaging cannot fill these fields. |

### B2 — virgin-plastic `MARKET_REFERENCE`

| Dataset field | Status/value | Source | Boundary |
|---|---|---|---|
| `identity.complete_system_identity_status` | `UNKNOWN` | HT2-S003–S006, HT2-S035 | Searches found only composition or route near-misses. |
| Romanian paper+PP near-miss `128002` | Local stock, 1,000/case, 377.52 RON incl. VAT | HT2-S003 | Exact local product, but it is paper laminated with PP, not all-plastic. |
| Romanian paper bag near-miss | Local stock, 0.54 RON incl. VAT | HT2-S004 | Paper bag, not all-plastic. |
| Inno-Pak PET/CPP near-misses | `267301952`, `265895105`, stock, 250/case | HT2-S005 | Exact all-plastic bags, but no Romania/EU-to-Romania route. |
| Universal Plastic PET+CPP | US commercial reference | HT2-S006 | No Romania/EU route. |
| AV6 PP/OPS | Romanian stock; +120°C | HT2-S035 | Container rather than required bag. |

### C1 — Sacma B.Life Gaia

| Dataset field | Status/value | Source | Boundary |
|---|---|---|---|
| Product/platform identity | B.Life Gaia | HT2-S008 | Exact size/article absent. |
| Components | FSC grass paper + NatureFlex liner/window | HT2-S008 | No gsm, film grade, gauge or masses. |
| `POST_COOK` | Supported for cooked chicken/rotisserie | HT2-S008 | Supplier-submitted application statement. |
| `HOT_HOLD` | `PARTIAL_EVIDENCE` | HT2-S008 | “Hot cabinet” is stated without temperature/duration. |
| `COOK_IN` | `PARTIAL_EVIDENCE` | HT2-S008 | “Oven” is stated without temperature/duration/exact SKU. |
| Grease/liquid barrier | Claimed | HT2-S008 | No public exact six-hour filled-pack protocol. |
| Compost/paper-recycle claims | OK Compost Home / Aticelca claimed | HT2-S008 | Certificate numbers and Romanian routes not established. |
| Format/customisation/RFQ context | Platform offers configurable bags | HT2-S007 | Generic Sacma page does not itself qualify Gaia. |

### C2 — Sirane Sira-Cook Siralon 21

| Dataset field | Status/value | Source | Boundary |
|---|---|---|---|
| Named grade | Siralon 21 | HT2-S009 | No exact orderable article/format. |
| Material | Clear heat-sealable nylon | HT2-S009 | Full layer/additive construction absent. |
| `thermal_claims[0].temperature_c` | 210°C | HT2-S009 | Exact named grade; duration, oven type and fill condition absent. |
| Application fit | Whole joints, poultry, fish | HT2-S009 | Exact bag dimensions and sponsor fill trial absent. |
| Barrier/vacuum/seals | Good barrier, vacuum capable, robust seals | HT2-S009 | Manufacturer claims; exact test/DoC pack absent. |
| `HOT_HOLD` | `NOT_VERIFIED` | HT2-S009 | The hot-hold claim on the page applies to Siralon 10; it is not inherited by Siralon 21. |
| Procurement | `QUOTE_REQUIRED_ROMANIA` | HT2-S009 | Sample/RFQ route exists, but no Romanian listing or delivery. |

### C3 — CRYOVAC Oven Ease EMEA/UK

| Dataset field | Status/value | Source | Boundary |
|---|---|---|---|
| Current product identity | Oven Ease EMEA/UK platform | HT2-S010 | Current exact grade/SKU absent. |
| `thermal_claims[0].temperature_c` | 220°C | HT2-S010 | Platform ceiling; duration and current exact grade absent. |
| Oven contexts | Hot air, steam, water, convection, microwave | HT2-S010 | Platform-level. |
| Applications | Fish, meat, poultry, bacon, bread/sandwiches, vegetables | HT2-S010 | Platform-level; exact format absent. |
| Barrier/closure | Hermetic, leak-resistant, oxygen barrier | HT2-S010 | Platform-level; exact current grade dossier absent. |
| Historical grade lead | HC2440 | HT2-S011 | Historical discovery only; not current availability or current-grade qualification. |
| US numeric data | Excluded | none in selected field | US grade data are deliberately not mixed into the EU/UK record. |

### C4 — Faerch `2227022094` + `5227005011`

| Dataset field | Status/value | Source | Boundary |
|---|---|---|---|
| Body exact identity | `C 2227-2AB / 2227022094` | HT2-S012 | Exact article. |
| Body commercial state | `Inactive` | HT2-S012 | Adversarial; exact system is not currently orderable as specified. |
| Body capacity/dimensions | 1,005 ml; 227×178×43 mm; two compartments | HT2-S012 | Exact body only. |
| Body mass | 51.560 g | HT2-S012 | Must not be displayed as complete package/plastic mass. |
| Body thermal | -40 to 220°C | HT2-S012 | Exact body; public duration/oven type absent. |
| Body PCR | 69–75% | HT2-S012 | Exact body article only; not lid/system and not transferred from historical recipes. |
| Lid exact identity | `K 5227-4 / 5227005011` | HT2-S013 | Exact compatible 2227-series lid. |
| Lid dimensions/material | 232×183×16 mm, transparent APET | HT2-S013 | Unit mass and thermal limit absent. |
| Lid stock/pack/price | Danish stock, 372/carton, 655 DKK ex VAT | HT2-S013 | EU retail context only; no Romanian route. |

### C5 — BIOPAP SI-14 + clear film

| Dataset field | Status/value | Source | Boundary |
|---|---|---|---|
| Exact body identity | `SI-14` | HT2-S014, HT2-S015, HT2-S016 | Exact body; BPI directory certifies a component, not the complete EU system. |
| Capacity/dimensions | 1,240 ml; approximately 190×247×37 mm | HT2-S015, HT2-S016 | Distributor/manufacturer family evidence. |
| Pack/price | 780/pack; 251.79 EUR incl. VAT | HT2-S015 | Exact body, Estonian retail/distributor anchor only. |
| LC oven condition | 185°C / 60 min | HT2-S016 | LC family claim relevant to SI-14 technology; exact SI-14 TDS not public. |
| LC hold condition | 6 h/90°C or 5 h/100°C | HT2-S017 | LC system claim; exact SI-14 + named film SKU not explicit. |
| Compatible closure | Transparent compostable sealing film | HT2-S018 | Exact film SKU, polymer, gauge, reel and mass absent. |
| Hermetic/fat/humidity claims | Partial | HT2-S016–S018 | Complete exact combined FCM/seal dossier absent. |
| Compost certification | Component/system claims | HT2-S014, HT2-S016, HT2-S017 | Does not prove Romanian organics collection/processing. |

### C6 — Plus Pack `0192110201` + `5023100000`

| Dataset field | Status/value | Source | Boundary |
|---|---|---|---|
| Body exact identity | `0192110201 / RECT.1896ML.HANDLES` | HT2-S019 | Exact manufacturer TDS. |
| Body dimensions/capacity | 293×193×45 mm; 1,896 ml | HT2-S019 | Exact body. |
| Body unit mass | 31 g ±10% | HT2-S019 | Exact body only; not total package mass. |
| Body thermal | -40 to 350°C | HT2-S019 | Exact `OVEN_BODY_ONLY`; duration absent. |
| Body recycled content | Average 38% secondary-production aluminium | HT2-S019 | Supplier-calculated raw-material average; not stated as PCR and not complete-package fraction. |
| Food restriction | Avoid strongly acidic or salty direct contact | HT2-S019 | Exact body use restriction. |
| Matching lid list | Includes `5023100000` and `5023000000` | HT2-S019 | Compatibility only; not lid oven approval. |
| Selected lid identity | `5023100000`, clear DPET H26 | HT2-S020 | Exact selected closure. |
| Selected lid dimensions/pack | 300×200×26 mm; 200/carton | HT2-S020 | Unit mass and application temperature absent. |
| Selected lid gross weight | 6.984 kg/carton | HT2-S020 | Logistics only; must not be divided into unit lid mass. |
| Alternate H46 lid | `5023000000`, non-stock | HT2-S021 | Adversarial; not selected. |
| Generic Europe supply | Corporate context | HT2-S022 | Does not prove Romania delivery for exact articles. |
| Body price anchor | 595.25 DKK/100 | HT2-S023 | Exact OEM `0192110201`, Danish stock; no Romanian basis. |
| Lid price identity conflict | 353.76 DKK/100 lid is OEM `5024100200` | HT2-S037 | Not selected lid `5023100000`; excluded despite matching 300×200×26 mm geometry. |

---

## B. Candidate and market sources

| ID | Class | Source | Exact supported use | Does **not** support |
|---|---|---|---|---|
| HT2-S001 | Primary, provider context | [Profi chicken nutrition page](https://www.profi.ro/practic/sfaturi/diverse/cate-calorii-are-carnea-de-pui-valori-nutritionale/) | Profi-authored chicken/rotisserie context; records that provider evidence was checked. | Actual hot-food package material, supplier, SKU or configuration. |
| HT2-S002 | Context, third party | [Romania discussion mentioning Profi rotisserie chicken](https://www.reddit.com/r/Romania/comments/vp2303/atunci_c%C3%A2nd_descoperi_profi/) | Context that half rotisserie chicken was discussed as a Profi purchase. | Provider evidence or package identity. |
| HT2-S003 | Secondary, Romanian retailer | [Barleta rotisserie bag `128002`](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/) | Exact local SKU, stock, count, current observed price and paper+PP construction. | All-plastic B2 identity; Profi incumbent identity; six-hour performance. |
| HT2-S004 | Secondary, Romanian retailer | [Pungihartie rotisserie bag](https://pungihartie.com/punga-mare-rotiserie-18-x-7-x-35-cm) | Romanian stock and observed unit price for a paper rotisserie bag. | All-plastic B2 identity or FCM/thermal qualification. |
| HT2-S005 | Primary, manufacturer; route adverse | [Inno-Pak Rotisserie Chicken Bags](https://www.innopak.com/products/rotisserie-chicken-bags/) | Exact PET/CPP SKUs, stock, size and case pack. | Romania/EU-to-Romania route, EU DoC or Romanian price. |
| HT2-S006 | Secondary, US supplier; route adverse | [Universal Plastic rotisserie chicken bag](https://www.universalplastic.com/products/rotisserie-chicken-bag) | PET+CPP commercial reference in the US. | Romanian availability or Romanian landed/B2B price. |
| HT2-S007 | Primary, manufacturer | [Sacma glued flat-bottom bags](https://sacmaspa.it/en/glued-bags/) | Sacma format/customisation and sample/RFQ context. | Exact Gaia SKU, Gaia numeric temperature or Romania delivery. |
| HT2-S008 | Supplier-submitted trade press | [B.Life Gaia compostable ovenable bag](https://www.packworld.com/leaders-new/business-drivers-specialty/sustainability/product/22884843/sacma-spa-compostable-ovenable-bag-for-rotisserie) | Gaia name, paper/NatureFlex construction, rotisserie application, leak/grease and qualitative heat/certification claims. | Numeric maximum temperature/time, exact certificate numbers, complete FCM dossier or Romanian route. |
| HT2-S009 | Primary, manufacturer | [Sira-Cook Siralon](https://sirane.com/product/oven-bags-and-ovenable-films-nylon/) | Current Siralon 21 name, material, clarity/barrier/vacuum claims, poultry uses and 210°C. | Duration, exact format/SKU, six-hour hold, EU DoC or Romania delivery. |
| HT2-S010 | Primary, manufacturer EMEA/UK | [CRYOVAC Oven Ease Bags](https://www.sealedair.com/uk/products/food-packaging/vacuum-shrink-bags/food-service-ovenable-shrink-bags) | Current platform applications, oven types, up to 220°C, hermetic/leak/barrier claims. | Current exact grade/SKU, duration, Romania route or US-grade equivalence. |
| HT2-S011 | Historical secondary; adversarial boundary | [2010 European Oven Ease launch](https://www.packagingnews.co.uk/news/markets/food/sealed-air-launches-oven-ease-vacuum-bag-28-06-2010) | Historical grade lead `HC2440`. | Current identity, availability or current thermal qualification. |
| HT2-S012 | Primary, exact manufacturer article; adversarial | [Faerch `2227022094`](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094) | Exact identity, dimensions/capacity, body mass, range, body PCR and inactive status. | Lid mass, complete-package mass/PCR, current availability or Romanian route. |
| HT2-S013 | Secondary, exact EU distributor article | [Faerch lid `5227005011`](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet) | Exact compatible lid, APET, dimensions, stock, count and Danish price. | Unit mass, oven use, Romania delivery or complete-system qualification. |
| HT2-S014 | Certifier directory | [BPI BIOPAP directory](https://products.bpiworld.org/companies/biopap-srl) | Exact SI-14 certified component identity. | EU FCM approval, exact film identity or Romanian compost route. |
| HT2-S015 | Secondary, exact EU distributor article | [BIOPAP SI-14 listing](https://mixpack.ee/en/product/biopap-easy-catering-si-14-pakis-780-tk/) | Exact body SKU, capacity, dimensions, pack and Estonian price. | Film identity/mass, Romania route or exact combined thermal proof. |
| HT2-S016 | Primary, manufacturer family | [BIOPAP product lines](https://www.biopap.com/en/product-lines/) | LC 185°C/60 min family claim and Easy Catering SI-14 family mapping. | Exact SI-14 + film closed-pack qualification. |
| HT2-S017 | Primary, manufacturer system | [BIOPAP collective catering](https://www.biopap.com/en/product-lines/compostable-efficient-and-safe-packaging-solutions-for-sustainable-collective-catering/) | LC 6 h/90°C and 5 h/100°C system claims; film-development context. | Exact SI-14 + named-film binding, Romanian organics route or complete BOM. |
| HT2-S018 | Primary, manufacturer system | [BIOPAP Easy System](https://www.biopap.com/en/sealing-systems/biopap-trays-thermo-sealing-system-with-film-and-modular-mould/) | Compatible transparent compostable film and hermetic sealing architecture. | Exact film SKU/gauge/mass, SI-14-specific thermal condition or Romania route. |
| HT2-S019 | Primary, exact manufacturer TDS | [Plus Pack `0192110201` TDS](https://assets.ccntr.pbsnetwork.eu/assets/5790002196140/ts_dk_1731903_00_iss_28062021.pdf) | Exact body identity, 31 g, geometry, -40/350°C, 38% secondary aluminium, food restriction, logistics and matching lid IDs. | Lid unit mass/temperature, six-hour hold, Romanian supply or complete-system price. |
| HT2-S020 | Primary, exact manufacturer article | [Plus Pack H26 lid `5023100000`](https://pluspack.com/product/lid-dpet-af-rect-h26mm-clbag-3/) | Exact lid identity, DPET, dimensions, count, compatibility and gross carton weight. | Net unit mass, oven safety, application temperature or Romania delivery. |
| HT2-S021 | Primary, exact article; adversarial | [Plus Pack H46 lid `5023000000`](https://pluspack.com/product/lid-dpet-af-rect-h46mm-clbag/) | Exact alternate lid and explicit non-stock state. | Current selected closure orderability. |
| HT2-S022 | Primary corporate context | [Plus Pack](https://www.pluspack.com/) | General European manufacturer/supply context. | Exact-product delivery to Romania. |
| HT2-S023 | Secondary, exact EU distributor article | [Antalis Denmark body `0192110201`](https://www.antalis.dk/eshop/fodevareemballage-og-bordaekning/bakker-fodevarer/foliebakker-ready2cook-pdp-hq16491/sku-687194) | Exact OEM `0192110201`, Danish stock, 100-pack, 3.06 kg pack weight and 595.25 DKK price. | Romanian landed cost, industrial MOQ or selected-lid price. |
| HT2-S037 | Secondary, exact EU distributor article; adversarial | [Antalis Denmark lid OEM `5024100200`](https://www.antalis.dk/eshop/fodevareemballage-og-bordaekning/bakker-fodevarer/foliebakker-ready2cook-pdp-hq16491/sku-687107) | Establishes that the 300×200×26 mm PET lid price belongs to OEM `5024100200`. | Price or identity for selected lid `5023100000`; geometry cannot bridge the conflict. |
| HT2-S035 | Secondary, Romanian retailer | [EUROPACK AV6 rotisserie container](https://ambalaje-alimente.ro/produs/cutie-av6/) | Local PP/OPS set, stock, price and -20/+120°C listing. | B2 bag identity, six-hour hold or high-oven performance. |

---

## C. Regulatory sources

| ID | Class | Source | Supported use | Limitation |
|---|---|---|---|---|
| HT2-S024 | Primary, regulation | [Regulation (EC) 1935/2004](https://eur-lex.europa.eu/eli/reg/2004/1935/oj) | FCM safety, traceability and labelling framework. | Not product approval or temperature evidence. |
| HT2-S025 | Primary, regulation | [Regulation (EC) 2023/2006](https://eur-lex.europa.eu/eli/reg/2006/2023/oj) | FCM good manufacturing practice. | GMP alone does not qualify a candidate. |
| HT2-S026 | Primary, regulation | [Regulation (EU) 10/2011, consolidated](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A32011R0010) | Plastic FCM Union list, DoC and migration context. | Migration test conditions are not service-temperature evidence. |
| HT2-S027 | Primary, regulation | [Regulation (EU) 2022/1616](https://eur-lex.europa.eu/eli/reg/2022/1616/oj) | Recycled plastic FCM context. | Generic PCR percentage is not exact recycling-process compliance. |
| HT2-S028 | Primary, regulation | [Regulation (EU) 2024/3190](https://eur-lex.europa.eu/eli/reg/2024/3190/oj) | BPA and other bisphenol restrictions. | Product/use transition analysis remains supplier-specific. |
| HT2-S029 | Primary, regulation | [Regulation (EU) 2025/40](https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng) | PPWR and applicable PFAS/documentation context. | Does not prove FCM compliance, thermal suitability or practical recycling. |
| HT2-S036 | Primary, EU authority | [EU harmonised packaging standards](https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards/packaging-and-packaging-waste_en) | EN 13432 framework context. | Certification does not prove Romanian collection, acceptance or processing. |

---

## D. Romania end-of-life sources

| ID | Class | Source | Supported use | Limitation |
|---|---|---|---|---|
| HT2-S030 | Primary, authority | [EEA Romania waste profile 2025](https://www.eea.europa.eu/en/topics/in-depth/waste-and-recycling/municipal-and-packaging-waste-management-country-profiles-2025/ro-municipal-waste-factsheet.pdf/@@download/file) | National municipal/packaging system context and infrastructure caution. | No exact-pack collection, sorting or reprocessing acceptance. |
| HT2-S031 | Primary, EU statistics | [Eurostat packaging waste statistics](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Packaging_waste_statistics) | Aggregate Romanian packaging-recycling context. | No material/format-specific tray, bag or film route. |
| HT2-S032 | Primary, Romanian scheme operator | [RetuRO consumer FAQ](https://returosgr.ro/en/faqs-consumers) | Beverage DRS scope. | Hot-food trays, bags and lids are outside the evidenced DRS; bottle performance cannot be transferred. |
| HT2-S033 | Primary, industry association | [Petcore Europe thermoforms conference](https://www.petcore-europe.org/webinars-petcore-europe/657-thermoforms-conference-2025-pet-thermoforms-circularity-how-can-collection-and-sorting-of-pet-thermoforms-be-improved.html) | PET thermoform collection/sorting remains an improvement topic. | Not Romanian operator acceptance. |
| HT2-S034 | Primary, Romanian recycler context | [ALPLA Romania PET recycling](https://www.alpla.com/en/newsroom/news/production-starts-new-pet-recycling-plant-romania) | Romanian food-grade rPET capacity exists. | Description is bottle-focused and does not prove greasy CPET/APET/DPET acceptance. |

---

## Ledger conclusions

1. Eight required records are present, but B1 and B2 identities remain unresolved.
2. Exact selected component article IDs exist for C4 body/lid, C5 body and C6 body/lid; only C6 remains a current complete-system identity lead.
3. C4’s exact body evidence is unusually complete for mass/PCR/temperature, but its `Inactive` state blocks procurement.
4. C5 is the only candidate with public six-hour evidence, and even there the public claim is LC system/family evidence rather than an explicit SI-14 + named-film qualification.
5. C6 is not a transparent cook-in pack. Its transparent DPET lid is post-oven only.
6. No source proves positive exact-product Romanian availability, complete package mass, Romanian landed cost, industrial MOQ, exact-pack Romanian EOL or exact-system CO₂e.
