# HTF-02 — Romania-ready hot-food packaging candidate report

**Project:** Biomentorhub × Profi
**Research cut-off:** 2026-09-26
**Market gate:** Romania
**Dataset:** [HTF-02-romania-candidate-dataset.json](HTF-02-romania-candidate-dataset.json)
**Companion ledgers:** [source ledger](HTF-02-source-ledger.md) · [procurement ledger](HTF-02-romania-procurement.md)
**Runtime status:** research artifacts only; no runtime, schema, Selection, formula or UI integration

> **Decision: zero candidates are fully qualified and zero pass the Romania procurement hard gate.**

This is a candidate-evidence dataset, not an approval list. It retains every mandatory track B1/B2 and C1–C6, including unresolved and adverse findings. `UNKNOWN` is not a hidden pass.

---

# 1. Executive summary

Eight mandatory track records are present. The evidence state is:

- **B1 incumbent:** actual Profi packaging identity remains `UNKNOWN`. No supplier, SKU, material or configuration is inferred from generic Romanian packs.
- **B2 market reference:** unresolved. Romanian listings found were paper bags with PP liners or a PP/OPS container; exact all-plastic PET/CPP bags found had US, not Romania/EU-to-Romania, routes.
- **C1 Gaia:** strong post-cook renewable rotisserie concept, but no exact SKU, numeric high-temperature limit, public complete FCM dossier or Romanian route.
- **C2 Siralon 21:** strongest named flexible cook-in grade; clear nylon and up to 210°C are supported, but duration, exact format and Romanian route are open.
- **C3 Oven Ease:** current EMEA/UK platform supports up to 220°C, but the current exact grade is not public. Historical European `HC2440` and US data are not transferred.
- **C4 Faerch:** exact body `2227022094` and clear lid `5227005011` are identified. The body is `Inactive`; this exact configuration is not currently orderable as specified.
- **C5 BIOPAP:** exact SI-14 body is identified. LC-family/system claims cover 185°C/60 min and 6 h/90°C, but the exact clear-film SKU and SI-14-specific binding evidence are missing.
- **C6 Plus Pack:** exact body `0192110201` and H26 lid `5023100000` are identified. It is a valid **oven body + post-oven clear lid** concept, never a clear closed oven pack. Romanian supply remains quote-only/unverified.

No complete package has a complete mass BOM. No complete virgin-plastic mass, Romanian public price, exact-package Romanian EOL route or exact-system CO₂e/EPD is available.

---

# 2. Scope, operating hypothesis and non-assumptions

The working primary-flow hypothesis is:

> Food is cooked, transferred hot into a retail pack, held/displayed for up to approximately six hours, and sold.

This is **not sponsor-confirmed**. The following inputs remain mandatory before physical qualification:

1. food/fill dimensions and mass ranges;
2. fill temperature and recipe chemistry, including fat, salt, acid and sauce;
3. actual hot-cabinet minimum/maximum temperature and humidity;
4. maximum hold time and retail display orientation;
5. whether a clear lid/window is needed during cooking or only after cooking;
6. line rate, closure method, tamper evidence and stacking load;
7. incumbent package mass, delivered cost and annual volumes.

Peak oven exposure and hot hold are separate conditions. A useful `POST_COOK` candidate is not rejected solely for lacking 250°C capability. Conversely, a high-temperature body does not qualify its clear lid.

---

# 3. Method and evidence controls

The evidence hierarchy is regulation/authority → exact DoC/TDS/certificate → exact manufacturer article → manufacturer platform → distributor → trade press/context.

Applied controls:

- exact commercial identity is required where public;
- platform data are labelled and never silently converted into exact-SKU proof;
- body evidence does not qualify lid, film, adhesive, ink, anti-fog or label;
- US and EU/UK Oven Ease grades are segregated;
- Faerch PCR is used only for exact article `2227022094`;
- carton gross weight is logistics evidence, not unit component mass;
- a partial component sum is not a complete package mass;
- renewable/recycled fractions are not calculated without a complete BOM;
- compostability does not prove Romanian organics collection or processing;
- design-for-recycling does not prove collection, sorting or reprocessing;
- public non-Romanian retail prices are `REFERENCE_PRICE_ONLY`;
- absent evidence is `null`, `UNKNOWN` or `NOT_VERIFIED`, never zero.

Field-level source scope and limitations are in the [source ledger](HTF-02-source-ledger.md).

---

# 4. Application-mode model and decision gates

| Mode | Meaning in this dataset | Qualification boundary |
|---|---|---|
| `POST_COOK` | Food is cooked first and transferred hot into the package. | Needs hot-fill/contact, handling, closure and hold validation; oven ceiling may be irrelevant. |
| `HOT_HOLD` | Closed or covered pack remains in a controlled hot cabinet/display. | Six hours must be evidenced separately at a stated temperature. |
| `COOK_IN` | Food is cooked/reheated while enclosed in the selected package. | Exact grade/system, time, temperature, oven type, fill and venting required. |
| `OVEN_BODY_ONLY` | Tray/body enters the oven without the selected display lid. | Body evidence cannot qualify closure or closed-pack use. |
| `POST_OVEN_LID` | Transparent lid/film is applied after the oven step. | Maximum application/food temperature and closure integrity still require evidence. |

The Romania procurement hard gate passes only with explicit Romanian listing, distributor territory, delivery commitment or equivalent exact-product evidence. Generic EU/UK availability does not pass.

---

# 5. Mandatory candidate summary

| ID | Candidate / required track | Identity state | Strongest evidenced mode | Romania procurement | Decision |
|---|---|---|---|---|---|
| B1 | Actual Profi incumbent pack | **UNKNOWN** | UNKNOWN | `ROMANIA_AVAILABILITY_UNVERIFIED` | Stop until provider evidence identifies it. |
| B2 | Virgin-plastic rotisserie-bag `MARKET_REFERENCE` | **UNRESOLVED** | Target is `POST_COOK`; no qualifying product | `ROMANIA_AVAILABILITY_UNVERIFIED` | Do not substitute paper+PP or a US-only bag. |
| C1 | Sacma B.Life Gaia | Platform only; no SKU | `POST_COOK`; hot cabinet/oven claims lack numbers | `ROMANIA_AVAILABILITY_UNVERIFIED` | Retain for RFQ. |
| C2 | Sirane Siralon 21 | Named grade; format/SKU absent | `COOK_IN`, up to 210°C, duration unknown | `QUOTE_REQUIRED_ROMANIA` | Retain for RFQ/sample track. |
| C3 | CRYOVAC Oven Ease EMEA/UK | Current platform; grade unknown | `COOK_IN`, up to 220°C platform claim | `ROMANIA_AVAILABILITY_UNVERIFIED` | Stop grade-level claims until exact identity. |
| C4 | Faerch `2227022094` + lid `5227005011` | Exact complete component identities | `OVEN_BODY_ONLY` up to 220°C; post-oven lid not thermally qualified | `NOT_AVAILABLE_ROMANIA` | Body is inactive; no silent replacement. |
| C5 | BIOPAP SI-14 + clear compostable film | Exact body; film SKU unknown | `POST_COOK`; LC-system 6 h/90°C partial evidence | `QUOTE_REQUIRED_ROMANIA` | Retain for bounded hold RFQ. |
| C6 | Plus Pack `0192110201` + `5023100000` | Exact body and selected lid | `OVEN_BODY_ONLY` to 350°C + `POST_OVEN_LID` | `QUOTE_REQUIRED_ROMANIA` | Retain as two-stage architecture. |

**Prototype-ready count: 0.** C2, C5 and C6 are sufficiently bounded for supplier RFQ and sample planning, not for production approval.

---

# 6. B1 — actual Profi incumbent packaging

The provider source reviewed discusses Profi chicken/rotisserie context but does not identify the retail package [HT2-S001]. Third-party Romanian discussion supports that rotisserie chicken has been sold at Profi, but is not provider evidence and cannot identify material or SKU [HT2-S002].

Therefore:

- package identity: `UNKNOWN`;
- material/construction: `UNKNOWN`;
- body/bag/closure configuration: `UNKNOWN`;
- mass and plastic mass: `null`;
- thermal and six-hour hold: `NOT_VERIFIED`;
- supplier, price and annual volume: `UNKNOWN`.

Required closure evidence is a provider photo/specification tied to store/date, supplier invoice or internal packaging specification. A generic Romanian rotisserie bag must never be displayed as “Profi’s current pack.”

---

# 7. B2 — virgin-plastic market reference

The required record is explicitly a `MARKET_REFERENCE`, not the Profi incumbent.

No exact all-plastic virgin-plastic rotisserie/hot-food bag with a Romanian listing or explicit EU-to-Romania route was verified. The closest findings are deliberately excluded:

| Finding | Positive evidence | Why it does not satisfy B2 |
|---|---|---|
| Barleta `128002`, 18×7×35 cm | Romanian stock, 1,000/case, 377.52 RON incl. VAT [HT2-S003] | KAPP 40+20 paper laminated with PP; not all-plastic. |
| Pungihartie 18×7×35 cm | Romanian stock, 0.54 RON incl. VAT [HT2-S004] | Paper rotisserie bag; not all-plastic. |
| Inno-Pak `267301952` / `265895105` | Exact stock anti-fog PET/CPP bags, 250/case [HT2-S005] | US route only; no Romanian/EU-to-Romania evidence. |
| Universal Plastic PET+CPP bag | Exact commercial reference [HT2-S006] | US route only. |
| EUROPACK `AV6` | Romanian PP/OPS hot-chicken set, +120°C, in stock [HT2-S035] | Container, not the required bag. |

The B2 hard gate remains unresolved rather than being filled with a scope near-miss.

---

# 8. C1–C3 — flexible and cook-in candidate evidence

## C1 — Sacma B.Life Gaia

Gaia combines FSC grass paper with a NatureFlex cellulosic liner/window. Supplier-originated evidence supports cooked-chicken/rotisserie use, liquid and grease resistance, hot-cabinet/oven/microwave positioning, a transparent-window option, OK Compost Home and Aticelca claims [HT2-S008].

It is strongest for `POST_COOK`. Oven and hot-cabinet language has no public maximum temperature or duration. No exact dimensions, gsm, film grade, mass, SKU, certificate number, complete DoC or Romanian supply route were found. It stays in RFQ; it is not a 190°C or six-hour pass.

## C2 — Sirane Sira-Cook Siralon 21

The current manufacturer page identifies Siralon 21 as clear, heat-sealable nylon for whole joints, poultry and whole fish, suitable for vacuum packing, with good barrier and a ceiling of 210°C [HT2-S009].

This is direct named-grade evidence for `COOK_IN`, but the duration, oven type, venting, gauge, bag dimensions, closure and article number are absent. The page’s separate Siralon 10 hot-hold statement is **not** transferred to Siralon 21. Six-hour hold and Romania delivery are unverified.

## C3 — CRYOVAC Oven Ease EMEA/UK

The current EMEA/UK page supports barrier vacuum packaging for meat, poultry, fish and vegetables, cooking/reheating in pack in several oven types up to 220°C, plus hermetic/leak-resistant and oxygen-barrier claims [HT2-S010].

The current exact grade/SKU and duration are not public. Historical European `HC2440` is retained as a discovery lead only [HT2-S011]. US 204°C/4 h data are excluded from this EU/UK record. Procurement and product claims must stop until Sealed Air identifies the current EMEA grade supplied to Romania.

---

# 9. C4–C6 — body/tray plus transparent-closure evidence

## C4 — Faerch Evolve C 2227-2AB

Exact body `2227022094` is 1,005 ml, 227×178×43 mm, 51.560 g, two-compartment Evolve CPET, -40 to 220°C, with exact-article 69–75% PCR evidence. It is also marked **Inactive** [HT2-S012].

Exact compatible transparent lid `K 5227-4 / 5227005011` is APET, 232×183×16 mm and 372/carton; a Danish retailer lists it in stock [HT2-S013]. Lid unit mass and thermal/application limit are absent. The complete package mass and complete recycled fraction are therefore `null`. The exact inactive body cannot be silently replaced by another 2227-series tray.

## C5 — BIOPAP SI-14

`SI-14` is an exact 1,240 ml component with dimensions approximately 190×247×37 mm and 780/pack [HT2-S014, HT2-S015]. Manufacturer evidence identifies clear compostable film as a compatible system component, but does not expose the exact film SKU, gauge or mass [HT2-S018].

BIOPAP LC family evidence supports conventional oven use to 185°C for 60 min [HT2-S016]. A current LC collective-catering page states 6 h at 90°C or 5 h at 100°C and describes a co-developed compostable sealing film [HT2-S017]. Public evidence does not explicitly bind exact SI-14 plus a named film SKU to those conditions, so the result remains `PARTIAL_EVIDENCE`.

## C6 — Plus Pack READY2COOK two-stage system

Exact body `0192110201 / RECT.1896ML.HANDLES` is 1,896 ml, 293×193×45 mm, 31 g ±10%, aluminium, sealable, and rated -40 to 350°C for freezer/microwave/oven/grill. The TDS reports average 38% secondary-production aluminium and instructs users to avoid direct contact with strongly acidic or salty foods [HT2-S019].

Selected exact transparent lid `5023100000` is clear DPET, 300×200×26 mm and 200/carton [HT2-S020]. Its 6.984 kg carton weight is gross logistics weight and is **not divided into a unit mass**. Alternate H46 lid `5023000000` is explicitly non-stock and is not selected [HT2-S021].

The valid sequence is:

1. `OVEN_BODY_ONLY`;
2. cool or otherwise reach the supplier-approved lid application temperature;
3. apply `POST_OVEN_LID`;
4. validate closure, stacking, fogging, leakage and six-hour hold.

The selected DPET lid is never described as oven-safe.

---

# 10. Product-fit matrix

`PARTIAL` means product/family application or geometry is relevant, but exact sponsor fill and line trials are absent. It is not a fit approval.

| Candidate | Whole chicken | Wings / thighs | Potatoes / vegetables | Prepared meat | Key boundary |
|---|---|---|---|---|---|
| B1 incumbent | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Actual pack unidentified. |
| B2 market reference | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | No qualifying exact product. |
| C1 Gaia | **PARTIAL** | PARTIAL | NOT VERIFIED | PARTIAL | Rotisserie chicken is named; exact bag size/thermal profile absent. |
| C2 Siralon 21 | **PARTIAL** | PARTIAL | NOT VERIFIED | PARTIAL | Poultry/joints are named; exact format and fill trial absent. |
| C3 Oven Ease EMEA/UK | **PARTIAL** | PARTIAL | PARTIAL | PARTIAL | Poultry/meat/vegetables named at platform level; grade unknown. |
| C4 C2227 + APET lid | NOT VERIFIED | PARTIAL | PARTIAL | PARTIAL | Two-compartment 1,005 ml tray; target fill dimensions absent and body inactive. |
| C5 SI-14 + film | NOT VERIFIED | PARTIAL | PARTIAL | PARTIAL | Ready-meal/vegetable use supported; 37 mm body needs real-fill check. |
| C6 1,896 ml Al + H26 lid | NOT VERIFIED | PARTIAL | PARTIAL | PARTIAL | 45 mm body + 26 mm lid may be too shallow for a whole bird; no guess replaces trial. |

There is no evidence that a single selected format covers all four food groups. Whole chicken should remain a separate format branch.

---

# 11. Romania procurement and commercial availability

| ID | Status | Evidence boundary | Next action |
|---|---|---|---|
| B1 | `ROMANIA_AVAILABILITY_UNVERIFIED` | Incumbent observation, but packaging supplier/article unknown. | Profi provider evidence. |
| B2 | `ROMANIA_AVAILABILITY_UNVERIFIED` | Romanian near-misses do not satisfy all-plastic bag identity. | Find explicit Romanian/EU-to-Romania exact bag. |
| C1 | `ROMANIA_AVAILABILITY_UNVERIFIED` | Manufacturer RFQ exists; no SKU or Romania evidence. | Ask Sacma for exact Romania-delivered configuration. |
| C2 | `QUOTE_REQUIRED_ROMANIA` | Current manufacturer sample/RFQ channel; no local route. | Quote named Siralon 21 format to Romania. |
| C3 | `ROMANIA_AVAILABILITY_UNVERIFIED` | UK/EMEA page is not Romanian supply; current grade unknown. | Identify grade first, then route. |
| C4 | `NOT_AVAILABLE_ROMANIA` | Exact body marked Inactive; Danish lid stock does not restore system. | Ask for discontinuation/replacement dossier; do not substitute. |
| C5 | `QUOTE_REQUIRED_ROMANIA` | Exact body and commercial film platform exist; no complete Romania route. | Quote exact SI-14 + named film. |
| C6 | `QUOTE_REQUIRED_ROMANIA` | Exact EU articles exist; general Europe language is not Romania delivery evidence. | Written delivery, quote, MOQ, lead time and sample commitment. |

The detailed ledger and RFQ fields are in [HTF-02-romania-procurement.md](HTF-02-romania-procurement.md).

---

# 12. BOM, mass, virgin plastic and recycled/renewable content

| ID | Known mass | Missing component mass | `total_package_mass_g` | `plastic_mass_g` | Sustainability fraction boundary |
|---|---:|---|---:|---:|---|
| B1 | none | all | `null` | `null` | UNKNOWN |
| B2 | none | all | `null` | `null` | UNKNOWN |
| C1 | none | paper, liner/window, print/closure | `null` | `null` | Renewable construction qualitative only; no fraction. |
| C2 | none | bag/film and closure | `null` | `null` | Nylon named; complete construction/mass unknown. |
| C3 | none | complete current EMEA grade | `null` | `null` | Composition and mass unknown. |
| C4 | body 51.560 g | APET lid | `null` | `null` | Body-only PCR 69–75%; not complete-package PCR. |
| C5 | none | SI-14 body and film | `null` | `null` | Renewable/compostable positioning; no final-pack fraction. |
| C6 | aluminium body 31 g | DPET lid | `null` | `null` | Body-only average secondary aluminium 38%; not PCR and not package fraction. |

There are **2 exact unit component weights** and **0 complete package weights**. There are **0 complete virgin-plastic totals**. In particular:

- C4’s 51.560 g is not reported as full plastic-package mass;
- C6’s 31 g is aluminium and is not reported as plastic mass;
- C6 lid gross carton weights are not divided by case count;
- unknown closure mass never becomes zero.

---

# 13. Thermal evidence and six-hour hold

| ID | Peak evidence | Mode / exactness | Duration | Six-hour hold |
|---|---|---|---|---|
| B1 | none | UNKNOWN | UNKNOWN | `NOT_VERIFIED` |
| B2 | none | UNKNOWN | UNKNOWN | `NOT_VERIFIED` |
| C1 | “oven/hot cabinet” with no maximum | Gaia platform | UNKNOWN | `NOT_VERIFIED` |
| C2 | 210°C | Siralon 21 `COOK_IN` | UNKNOWN | `NOT_VERIFIED` |
| C3 | 220°C | Current EMEA/UK platform, grade unknown | UNKNOWN | `NOT_VERIFIED` |
| C4 | -40 to 220°C | Exact body `2227022094`, `OVEN_BODY_ONLY` | UNKNOWN | `NOT_VERIFIED` |
| C5 | 185°C | LC family relevant to SI-14, `OVEN_BODY_ONLY` | 60 min | **PARTIAL:** LC system 6 h/90°C; exact SI-14 + named film not explicit. |
| C6 | -40 to 350°C | Exact body `0192110201`, `OVEN_BODY_ONLY` | UNKNOWN | `NOT_VERIFIED` |

No peak oven number is used as evidence of six-hour holding. No selected transparent lid is qualified at C4 or C6 body oven temperature. C6 lid is post-oven only.

---

# 14. Food contact, barrier, closure and shelf-life evidence

Every production decision still requires current complete-system evidence under Regulations 1935/2004, 2023/2006 and, for plastic components, 10/2011, plus recycled-plastic, bisphenol and PPWR/PFAS evidence where applicable [HT2-S024–S029].

| ID | FCM state | Barrier / closure state | Stop condition |
|---|---|---|---|
| B1/B2 | UNKNOWN | UNKNOWN | Identity first. |
| C1 | Partial supplier claims | Grease/liquid resistance claimed | Exact DoC, migration, film/paper/adhesive/ink scope and filled six-hour test absent. |
| C2 | Exact EU dossier not public | Good barrier, robust seals and vacuum suitability claimed | Exact format/gauge and migration/leak evidence absent. |
| C3 | Exact current EU grade dossier not public | Hermetic/leak-resistant/oxygen barrier claimed at platform level | Grade identity unresolved. |
| C4 | Body/lid evidence is component-level | Exact compatible snap lid; full-system seal/leak unknown | Inactive body and lid mass/application condition unresolved. |
| C5 | LC system claims migration-supported hot-meal suitability | Hermetic sealing and humidity/fat resistance claimed | Exact film SKU and combined dossier absent. |
| C6 | Body TDS has material/use restrictions; full dossier incomplete | Sealable body + compatible lid; hot application/leak unknown | Strong acid/salt restriction, lid temperature and full-system validation unresolved. |

No public record proves the requested retail shelf life, anti-fog retention, aroma barrier, drop/stack performance or six-hour organoleptic performance for an exact complete candidate.

---

# 15. Price, MOQ, end of life and CO₂e

## 15.1 Price and MOQ

Three public EU price records are retained only as anchors:

- C4 exact lid `5227005011`: 655 DKK ex VAT / 372 = **1.7608 DKK/lid**, Danish retailer [HT2-S013].
- C5 exact SI-14 body: 251.79 EUR incl. VAT / 780 = **0.3228 EUR/tray**, Estonian distributor [HT2-S015].
- C6 exact body `0192110201`: 595.25 DKK / 100 = **5.9525 DKK/body**, Danish distributor [HT2-S023].

A 300×200×26 mm transparent PET lid priced at 353.76 DKK/100 is **excluded** from the selected C6 price: the distributor identifies it as OEM `5024100200`, not selected lid `5023100000` [HT2-S037]. Geometry is not identity. Therefore no public selected C6 system price is calculated.

Published packs/cartons are order units, not negotiated industrial MOQs. Exact industrial MOQ count is **0**. Romanian public price count is **0**. The +10–15% premium constraint cannot be evaluated without the incumbent baseline and like-for-like Romanian quotes.

## 15.2 End of life

Romanian national statistics and scheme information are context only [HT2-S030–S032]. RetuRO beverage DRS does not cover these hot-food bags/trays/lids. PET recycling capacity does not prove greasy CPET/APET/DPET thermoform acceptance [HT2-S033, HT2-S034]. EN 13432 or home-compost certification does not prove Romanian collection or processing [HT2-S036].

For every candidate, these stages remain separately controlled:

1. **designed/certified:** some supplier claims exist for C1, C4 body, C5 and C6 body;
2. **collected in Romania:** `UNKNOWN` for each exact complete pack;
3. **sorted in Romania:** `UNKNOWN`;
4. **reprocessed/composted in Romania:** `UNKNOWN`.

## 15.3 CO₂e

No exact selected complete system has a verified EPD or comparable LCA with a usable functional unit. Every CO₂e field is `null`; no arbitrary eco-score is produced.

---

# 16. Gaps, qualification actions and UI-display safety

## 16.1 Priority actions

1. **Sponsor/profile closure:** confirm fill dimensions, recipes, fill temperature, actual cabinet curve, six-hour need, visibility timing and incumbent baseline.
2. **B1 provider evidence:** obtain actual package photos/specification, supplier, SKU, component BOM/masses and current price.
3. **B2 identity closure:** find an exact all-plastic bag with explicit Romanian or EU-to-Romania supply; otherwise keep unresolved.
4. **C1 RFQ:** exact Gaia format, NatureFlex grade, mass, numeric thermal profile, FCM dossier, Romania quote and certificate scope.
5. **C2 RFQ:** exact Siralon 21 article/format, duration at 210°C, six-hour profile, EU dossier, samples and Romania terms.
6. **C3 identity request:** current EMEA/UK Oven Ease grade/SKU first; do not use US or historical evidence to fill the gap.
7. **C4 stop/replacement request:** confirm discontinuation and supplier-nominated exact replacement. Re-run evidence from zero for any replacement.
8. **C5 RFQ:** exact SI-14 film SKU and masses; written condition binding the configuration to 185°C/60 min and 6 h/90°C.
9. **C6 RFQ:** confirm Romania delivery, H26 unit mass/application temperature, closure performance and exact complete-system price.
10. **Romanian EOL tests:** obtain written acceptance from named collector, sorter and reprocessor/composter for each complete, food-contaminated construction.

## 16.2 UI display safety

| Claim class | Safe UI treatment |
|---|---|
| Exact candidate/article name | `DISPLAY_VERIFIED` only where the source identifies it; B1/B2 identities are not factual products. |
| Platform/family construction | `DISPLAY_WITH_QUALIFIER` and label it platform/family evidence. |
| Thermal number | Show exact mode, component, duration if known and source boundary. Never show C6’s 350°C as a closed-pack/lid value. |
| Six-hour claim | Only C5 may show “LC system: 6 h at 90°C,” with the qualifier that exact SI-14 + film binding is not public. |
| Mass/PCR | Show C4 51.560 g and 69–75% only for the exact body; show C6 31 g and 38% only for the aluminium body with the supplier’s secondary-aluminium qualifier. |
| Romania availability | Do not display “available in Romania” for any selected candidate. |
| Price | Label every retained price `REFERENCE_PRICE_ONLY`, currency/market/VAT/basis included. |
| Recyclable/compostable | Separate design/certificate from Romanian collection, sorting and reprocessing, which remain unknown. |
| CO₂e / score | `DO_NOT_DISPLAY_AS_FACT`; values are `null`. |

**Final decision:** keep C1–C6 as bounded qualification candidates, not approved production packs. Advance C2, C5 and C6 to RFQ/sample evidence closure; keep C1 as a post-cook renewable comparator; stop C3 at exact-grade identity; stop C4 at inactive article; leave B1 and B2 explicitly unresolved.
