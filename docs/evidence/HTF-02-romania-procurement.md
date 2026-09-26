# HTF-02 — Romania procurement ledger

**Project:** Biomentorhub × Profi
**Research cut-off:** 2026-09-26
**Market gate:** Romania
**Dataset:** [HTF-02-romania-candidate-dataset.json](HTF-02-romania-candidate-dataset.json)
**Source ledger:** [HTF-02-source-ledger.md](HTF-02-source-ledger.md)

> **Hard-gate result: 0/8 records have a positive exact-configuration Romanian supply status.**

## 1. Status rules

Only these statuses are used:

- `ROMANIA_LOCAL_STOCK`
- `ROMANIA_DISTRIBUTOR_CONFIRMED`
- `MANUFACTURER_DELIVERS_TO_ROMANIA`
- `EU_SUPPLY_ROUTE_CONFIRMED`
- `QUOTE_REQUIRED_ROMANIA`
- `ROMANIA_AVAILABILITY_UNVERIFIED`
- `NOT_AVAILABLE_ROMANIA`

A positive Romania status requires an explicit Romanian listing, territory, delivery statement or manufacturer/distributor confirmation tied to the exact article/configuration. “Available in Europe,” a UK page or an EU retailer is not enough.

`QUOTE_REQUIRED_ROMANIA` means the candidate is defined well enough to ask for a Romania quote; it is **not** evidence that supply is available. `REFERENCE_PRICE_ONLY` is not Romanian landed cost.

---

## 2. Procurement summary

| ID | Exact requested configuration | Identity state | Status | Romanian evidence | Blocking result |
|---|---|---|---|---|---|
| B1 | Actual Profi incumbent pack | UNKNOWN | `ROMANIA_AVAILABILITY_UNVERIFIED` | The pack is observed as an incumbent research track, but provider/supplier/SKU evidence is absent. | Cannot source or compare an unidentified pack. |
| B2 | All-plastic virgin-plastic rotisserie/hot-food bag | UNKNOWN | `ROMANIA_AVAILABILITY_UNVERIFIED` | Romanian paper+PP bags and PP/OPS container exist; no qualifying all-plastic bag. | Scope identity hard gate unresolved. |
| C1 | Exact Sacma B.Life Gaia bag | Platform only | `ROMANIA_AVAILABILITY_UNVERIFIED` | No exact SKU, Romanian listing, territory or delivery statement. | Identity must be fixed before quote comparison. |
| C2 | Exact Siralon 21 bag/flow-wrap format | Named grade; format absent | `QUOTE_REQUIRED_ROMANIA` | Manufacturer sample/technical request exists; no Romanian supply evidence. | Quote must identify format/SKU and explicitly commit to Romania. |
| C3 | Current exact EMEA/UK Oven Ease grade | Current platform only | `ROMANIA_AVAILABILITY_UNVERIFIED` | UK/EMEA product page only; historical `HC2440` is not treated as current. | Exact current grade first. |
| C4 | `2227022094` + `5227005011` | Exact body/lid | `NOT_AVAILABLE_ROMANIA` | Body is marked `Inactive`; Danish lid stock cannot restore the complete configuration. | Stop; no silent body replacement. |
| C5 | `SI-14` + exact clear compostable film | Exact body; film SKU absent | `QUOTE_REQUIRED_ROMANIA` | SI-14 is sold in Estonia; no Romanian route or exact film article. | Quote complete named body+film system. |
| C6 | `0192110201` + `5023100000` | Exact body/lid | `QUOTE_REQUIRED_ROMANIA` | Exact EU product records exist; no explicit Romanian listing, territory or delivery. | Obtain written Romania commitment and exact-system quote. |

### Status count

| Status | Count |
|---|---:|
| `ROMANIA_AVAILABILITY_UNVERIFIED` | 4 |
| `QUOTE_REQUIRED_ROMANIA` | 3 |
| `NOT_AVAILABLE_ROMANIA` | 1 |
| Positive Romania statuses | 0 |

---

## 3. Candidate-by-candidate procurement record

### B1 — actual Profi incumbent

- **Status:** `ROMANIA_AVAILABILITY_UNVERIFIED`
- **Identity:** `UNKNOWN`
- **Reason:** no provider evidence identifies supplier, article, bag/tray/lid architecture or contract item.
- **Do not use:** generic Romanian packs, store photographs without traceable article context, or third-party assumptions.
- **Required internal evidence:** current packaging specification, supplier/article number, purchase unit, annual volume, delivered unit cost, quality agreement and change-control history.

### B2 — all-plastic market reference

- **Status:** `ROMANIA_AVAILABILITY_UNVERIFIED`
- **Required identity:** exact virgin-plastic rotisserie/hot-food bag with Romanian or explicit EU-to-Romania supply.
- **Rejected local substitutes:**
  - Barleta `128002`: Romania local stock, but paper laminated with PP [HT2-S003].
  - Pungihartie 18×7×35 cm: Romania local stock, but paper bag [HT2-S004].
  - EUROPACK `AV6`: Romania local stock, but PP/OPS container rather than bag [HT2-S035].
- **Route near-miss:** Inno-Pak exact anti-fog PET/CPP SKUs are stock products, but only a US route was found [HT2-S005].
- **Required supplier response:** manufacturer, exact SKU, construction, country of manufacture, Romanian delivery basis, Incoterm, case/pallet, MOQ, annual-volume tiers and FCM/thermal dossier.

### C1 — Sacma B.Life Gaia

- **Status:** `ROMANIA_AVAILABILITY_UNVERIFIED`
- **Public route:** Sacma has sample/catalog/technical-sheet request channels [HT2-S007].
- **Blocker:** public evidence does not identify the exact Gaia size, NatureFlex grade, gsm/gauge or commercial article.
- **Quote unit required:** one complete printed bag including paper, liner/window, adhesive, closure and ink.
- **Romania request:** written confirmation of delivery to Profi’s named Romanian distribution point, manufacturing site, Incoterm, MOQ, lead time, pallet count, sample quantity and annual capacity.

### C2 — Sirane Sira-Cook Siralon 21

- **Status:** `QUOTE_REQUIRED_ROMANIA`
- **Public route:** current manufacturer page offers sample and technical-team requests [HT2-S009].
- **Blocker:** no public stock format/article or Romanian route.
- **Quote unit required:** exact Siralon 21 pre-made bag or flow-wrap consumption per finished pack, including closure/label where required.
- **Romania request:** exact article, dimensions, gauge, manufacturing site, delivery confirmation, Incoterm, MOQ, price tiers, lead time, reels/bags per case and pallets per truck.

### C3 — CRYOVAC Oven Ease EMEA/UK

- **Status:** `ROMANIA_AVAILABILITY_UNVERIFIED`
- **Public route:** current EMEA/UK platform/contact page [HT2-S010].
- **Blocker:** exact current grade/SKU is not exposed. Historical `HC2440` cannot be quoted as if current [HT2-S011].
- **Sequence:**
  1. Sealed Air identifies current EMEA grade for the required food/process.
  2. Supplier binds TDS/DoC/migration and dimensions to that grade.
  3. Supplier confirms Romanian delivery/distributor.
  4. Only then request comparative landed price.
- **Prohibited:** US retail price, US grade conditions or a historical grade presented as Romanian current supply.

### C4 — Faerch `2227022094` + lid `5227005011`

- **Status:** `NOT_AVAILABLE_ROMANIA`
- **Body:** exact Faerch article is `Inactive` [HT2-S012].
- **Lid:** Danish retailer lists exact `5227005011` in stock, 372/carton [HT2-S013].
- **System conclusion:** a current lid does not make an inactive body configuration orderable.
- **Required manufacturer response:** formal discontinuation status, last-order possibility, and supplier-nominated replacement with exact new article, recipe, mass, PCR, thermal range and closure compatibility.
- **Control:** any replacement starts a new evidence record; do not inherit `2227022094`’s 51.560 g or 69–75% PCR.

### C5 — BIOPAP SI-14 plus clear film

- **Status:** `QUOTE_REQUIRED_ROMANIA`
- **Body:** exact SI-14 is commercially listed by an Estonian distributor [HT2-S015].
- **Closure:** manufacturer supports transparent compostable sealing film but no exact film SKU is public [HT2-S018].
- **Blocker:** complete orderable body+film identity and Romanian delivery are unverified.
- **Quote unit required:** SI-14 tray plus film consumption per sealed tray, with reel waste, labels and secondary packaging separated.
- **Romania request:** exact film grade/SKU, compatible sealer/tool, Romanian delivery, Incoterm, MOQ, body/film price tiers, samples, tooling, lead time and shelf life of packaging stock.

### C6 — Plus Pack `0192110201` + H26 `5023100000`

- **Status:** `QUOTE_REQUIRED_ROMANIA`
- **Body:** exact TDS and logistics exist [HT2-S019].
- **Selected lid:** exact compatible H26 DPET article exists [HT2-S020].
- **Alternate lid:** H46 `5023000000` is non-stock and excluded [HT2-S021].
- **EU context:** a Danish distributor lists exact OEM body `0192110201` in stock with a reference price [HT2-S023]. Its visually matching 300×200×26 mm PET lid is OEM `5024100200`, not selected `5023100000`, so that lid price is excluded [HT2-S037]. General Europe supply language does not establish Romanian delivery [HT2-S022].
- **Quote unit required:** one body `0192110201` plus one H26 lid `5023100000`, secondary packaging and freight separated.
- **Romania request:** written exact-article delivery commitment, Incoterm, stock/make-to-order state, MOQ, price tiers, lead time, sample availability, pallet minimum, body/lid manufacturing sites and change control.

---

## 4. Public price and order-unit ledger

All entries below are `REFERENCE_PRICE_ONLY`.

| Candidate/component | Exactness | Observed price | Arithmetic unit anchor | Public order unit | Market/basis | Romania landed/B2B? |
|---|---|---:|---:|---:|---|---|
| C4 lid `5227005011` | Exact component | 655 DKK ex VAT | 1.7608 DKK/lid | 372 lids | Denmark retailer [HT2-S013] | **No** |
| C5 SI-14 body | Exact component | 251.79 EUR incl. VAT | 0.3228 EUR/tray | 780 trays | Estonia distributor [HT2-S015] | **No** |
| C6 body `0192110201` | Exact OEM component | 595.25 DKK | 5.9525 DKK/body | 100 bodies | Denmark distributor [HT2-S023] | **No** |

The apparent C6 lid price of 353.76 DKK/100 is excluded: the exact distributor record identifies OEM `5024100200`, not selected lid `5023100000` [HT2-S037]. No public selected C6 system price is calculated. None of the retained anchors may be compared to the sponsor’s +10–15% premium constraint.

### Logistics units that are not MOQ

- C4 lid: 372/carton [HT2-S013].
- C5 body: 780/pack [HT2-S015].
- C6 body: 400/manufacturer carton, 100/bag [HT2-S019].
- C6 selected H26 lid: 200/manufacturer carton [HT2-S020].

**Industrial MOQ records: 0.** A published pack/carton is not automatically a manufacturer MOQ at Profi volume.

---

## 5. Romania RFQ schedule

Each supplier must answer against the exact component identities and sponsor operating profile.

| Required commercial field | Supplier response required |
|---|---|
| Exact product name/article | Body/bag and every lid/film/window/closure article separately. |
| Manufacturing site | Country and plant for each component. |
| Romania delivery | Explicit yes/no and named delivery point/territory. |
| Incoterm | State named place and version. |
| Currency and tax | Net unit prices; VAT and duties separated. |
| Annual volume tiers | Sponsor-defined tiers after incumbent volume is known. |
| MOQ | Bags/reels/trays/lids per order and mixed-pallet rules. |
| Standard order unit | Units per bag, carton and pallet. |
| Lead time | Samples, first order and repeat orders. |
| Tooling/development | Print plates, dies, moulds, sealer tooling and one-time fees. |
| Freight | Romania freight, fuel/handling surcharges and pallet return terms. |
| Capacity | Monthly/annual capacity and allocation commitment. |
| Shelf life | Storage temperature/humidity and packaging-stock expiry. |
| Change control | Notice period for resin/recipe/gauge/site/article changes. |
| Samples | Quantity, exact article revision and supporting documents. |

---

## 6. Candidate-specific technical questions attached to procurement

### C1 Gaia

1. What exact Gaia article and bag dimensions fit the sponsor’s whole chicken?
2. What are paper gsm, NatureFlex grade/gauge and masses per bag?
3. What exact oven and hot-cabinet time/temperature conditions apply?
4. Are window, liner, adhesive, inks and closure included in the DoC/certificates?
5. Is the quoted configuration supplied to Romania today?

### C2 Siralon 21

1. What exact Siralon 21 grade/article, bag dimensions and gauge are quoted?
2. What is the allowed time at 210°C, oven type, venting and fill condition?
3. Is six-hour holding tested at the sponsor cabinet profile?
4. What EU DoC/migration/NIAS evidence applies to the exact grade?
5. Is the quote pre-made bag or reel yield; what waste factor is assumed?

### C3 Oven Ease

1. What current EMEA grade replaces or corresponds to historical `HC2440`?
2. What exact grade is supplied for poultry to Romania?
3. What time-at-220°C applies to that grade?
4. What is the exact construction, gauge, bag size and mass?
5. Confirm that all evidence supplied is EU/UK grade evidence, not US-grade evidence.

### C4 Faerch

1. Is `2227022094` discontinued, temporarily inactive or available by special run?
2. If replaced, what exact article is supplier-nominated?
3. Provide new exact mass, recipe, PCR, thermal range and lid compatibility.
4. Provide `5227005011` net unit mass and post-oven application limit.
5. Do not answer with family-level Evolve data alone.

### C5 BIOPAP

1. Identify the exact clear compostable film SKU used with SI-14.
2. Provide body and film masses, composition, reel dimensions and yield.
3. Bind exact SI-14 + film in writing to 185°C/60 min and 6 h/90°C, or state narrower conditions.
4. Provide full FCM, seal, leak, anti-fog and compost-certificate scope.
5. Confirm Romania delivery, machinery/tooling and line speed.

### C6 Plus Pack

1. Confirm current supply of `0192110201` and `5023100000` to Romania.
2. Provide H26 lid net unit mass and maximum food/application temperature.
3. Confirm lid is post-oven only and state cooling/application instructions.
4. Provide complete-system FCM, snap/seal, leak, stack and six-hour test evidence.
5. Confirm recipe restrictions for salty/acidic prepared foods and lacquer options, if any.
6. Provide exact system quote and annual-volume tiers.

---

## 7. Procurement decision rule

A candidate may move from this ledger to a Romania pilot only when all of the following are tied to the same exact configuration:

1. complete component identity;
2. written Romanian supply commitment;
3. current FCM dossier;
4. exact thermal and six-hour conditions for the intended mode;
5. complete BOM and masses;
6. sample availability and filled-pack qualification plan;
7. Romanian quote, MOQ, lead time and logistics;
8. no unresolved identity, inactive article, food-chemistry restriction or closure-temperature conflict.

No candidate meets all eight today.
mplete BOM and masses;
6. sample availability and filled-pack qualification plan;
7. Romanian quote, MOQ, lead time and logistics;
8. no unresolved identity, inactive article, food-chemistry restriction or closure-temperature conflict.

No candidate meets all eight today.
