# HTF-03 — conflict resolution

2026-09-26. A newer packet is not stronger evidence by itself. Original exact field evidence is retained with its current verification boundary.

## Decision-critical conflicts

### D01 — Romania availability / commercial maturity

- **Research 1:** All five concepts commercially available in CEE now, effectively 100%; local converters and rapid drop-in claimed.
- **Research 3:** Exact Romania route gate remains strict.
- **Research 4:** More Romanian supplier leads, but some old/local/generic claims over-promoted.
- **Final:** Domestic listing routes verified for B3 and C6 components only. C1/C2/C3 quote required; C4 excluded pending successor; C5 historical Romanian lead.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** European product existence and distributor websites do not establish exact stock, lead time, MOQ or Profi implementation readiness.
- **Evidence:** `R1` (input manifest), `R3` (input manifest), `R4` (input manifest), [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery), [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html)

### D02 — C1 Gaia Romania route

- **Research 1:** Sacma direct CEE plus Sunimprof Argo/Eximprod converting; MOQ 25-50k and Profi consumption 1-2 weeks.
- **Research 3:** No exact Romania route.
- **Research 4:** European supply/company existence only.
- **Final:** QUOTE_REQUIRED_ROMANIA; names retained as unverified leads, no MOQ or consumption estimate.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** No current exact-product Romanian territory, delivery or converter authorisation evidence found. Annual Profi demand cannot be inferred.
- **Evidence:** `R1` (input manifest), [S01](https://sacmaspa.it/en/b-life-collection/), [S02](https://www.futamuragroup.com/Futamura/media/Futamura/Careers/SACMA-Press-Release-EN.pdf)

### D03 — C1 Gaia thermal

- **Research 1:** High-temperature/drop-in implication; NatureFlex NVO.
- **Research 3:** Qualitative oven/hot cabinet and -40 C freezing only.
- **Research 4:** Qualitative high/low-temperature commercial press statements.
- **Final:** No numeric maximum or duration; 250 C and six-hour hold NOT_VERIFIED.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** Direct Sacma/Futamura material improves source tier but supplies no qualifying time/temperature pair.
- **Evidence:** [S01](https://sacmaspa.it/en/b-life-collection/), [S02](https://www.futamuragroup.com/Futamura/media/Futamura/Careers/SACMA-Press-Release-EN.pdf)

### D04 — C2 Siralon identity / procurement

- **Research 1:** 80% rPET BoPET/Supreme, Poland, retail adoption, 3-4 week supply.
- **Research 3:** Siralon 21 is nylon 210 C; no Romania route.
- **Research 4:** Nylon 210 C; Romania unconfirmed.
- **Final:** Retain nylon grade and 210 C with unknown duration. Virgin/PCR and Romanian route unknown.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** Sirane primary grade page outranks unsupported cross-product claims. Siralon 10 hot-hold evidence cannot qualify Siralon 21.
- **Evidence:** `R1` (input manifest), [S03](https://sirane.com/product/oven-bags-and-ovenable-films-nylon/)

### D05 — C3 current EU grade

- **Research 1:** Generic European high-temp transparent films and local availability.
- **Research 3:** Current UK/EMEA 220 C platform; HC2440 historical only.
- **Research 4:** HC2440 named as EU grade while current article still quote-only; US pages included.
- **Final:** Current platform verified; exact current EU grade UNKNOWN. 220 C duration UNKNOWN; exclude US 204 C/four-hour transfer.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** A 2010 launch name does not establish a current orderable grade. Directory legal entity is not selected-product distribution.
- **Evidence:** [S04](https://www.sealedair.com/uk/products/food-packaging/vacuum-shrink-bags/food-service-ovenable-shrink-bags), `R3` (input manifest), `R4` (input manifest)

### D06 — C4 exact body 2227022094

- **Research 1:** No exact evidence.
- **Research 3:** 51.560 g; 1005 ml; 227x178x43 mm; -40 to 220 C; Inactive.
- **Research 4:** Exact 2AB mass left unknown after finding 2227-2K 31 g / 1065 ml sibling.
- **Final:** Preserve all original exact-article numbers with inherited source boundary. Original page now 404; current verification absent. No overwrite with sibling.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** Search failure does not erase stronger earlier exact identification. Report is not itself proof, so unrecovered values are ASSUMED/inherited, not fresh VERIFIED.
- **Evidence:** `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094), [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet)

### D07 — C4 PCR

- **Research 1:** Broad recycled-plastic marketing.
- **Research 3:** 69-75% PCR exact body.
- **Research 4:** Family 80-85% or up to 100%; exact body not resolved.
- **Final:** 69-75% historical exact-body claim retained; virgin body factor 25-31%; complete-pack PCR recomputed only in a model including lid.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** No use of other Faerch SKU or family maximum. Do not treat entire 51.56 g as virgin; do not omit lid.
- **Evidence:** `R3` (input manifest), [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094)

### D08 — C5 oven temperature

- **Research 1:** No exact SI-14 data.
- **Research 3:** 185 C / 60 min current product-lines page.
- **Research 4:** 175 C / 60 min catalogue.
- **Final:** CONFLICT: current page 185/60; older catalogue 175/60 and accessible current partnership 175. Neither qualifies 250.
- **Status:** OPEN_CONFLICT
- **Rationale:** A later search does not automatically outrank a primary source; preserve both and require written exact-article resolution.
- **Evidence:** [S07](https://www.biopap.com/en/product-lines/), [S08](https://www.biopap.com/wp-content/uploads/2017/05/Catalogo-vaschette-BIOPAP-LC.pdf), [S16](https://www.futamuragroup.com/futamura-and-biopap-advance-compostable-food-service-solutions/)

### D09 — C5 six-hour hold

- **Research 1:** Broad operational readiness.
- **Research 3:** 6h90 and 5h100 family/system; exact closure unknown.
- **Research 4:** Family 6h90 and 5h100 promoted as positive lead.
- **Final:** Explicit LC family claim retained. Exact SI-14 + selected film + fatty-food migration, seal performance and food safety stay UNKNOWN.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** Packaging temperature compatibility cannot establish microbial or organoleptic safety, nor 6h100 from 5h100.
- **Evidence:** [S09](https://www.biopap.com/en/product-lines/compostable-efficient-and-safe-packaging-solutions-for-sustainable-collective-catering/), [S13](https://www.biopap.com/en/sealing-systems/biopap-trays-thermo-sealing-system-with-film-and-modular-mould/)

### D10 — C5 Romanian distributor

- **Research 1:** General local availability narrative.
- **Research 3:** No verified Romanian delivery for complete system.
- **Research 4:** ReVive announcement interpreted as current Romanian distributor.
- **Final:** ROMANIA_DISTRIBUTOR_HISTORICAL, announcement 2021-04-26. 2026 relationship/stock/lead/price require RFQ.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** Current searches did not corroborate a live exact SI-14 Romanian offer. Historical country evidence remains useful but not current stock.
- **Evidence:** [S14](https://www.ecomunicate.ro/comunicat/revive-face-sustenabilitatea-mai-usoara-pentru-businessurile-romanesti-prin-solutii-de-ambalaje-biodegradabile/), [S12](https://mixpack.ee/en/product/biopap-easy-catering-si-14-pakis-780-tk/)

### D11 — C5 mass / price

- **Research 1:** No exact values.
- **Research 3:** Mass unknown; EU body 251.79 EUR/780.
- **Research 4:** No public body mass or EU price found.
- **Final:** Restore EU body offer and add 2021 exact manufacturer mass 23.50 g. Complete mass estimated with film. VAT basis of live Mixpack page unresolved.
- **Status:** RESOLVED_WITH_VAT_GAP
- **Rationale:** Exact historical row visually checked. Preserve stronger field evidence instead of keeping later search negatives.
- **Evidence:** [S10](https://www.biopap.com/wp-content/uploads/2021/05/BIOPAP_Tabella_DimensioniSitoQR_ENG.pdf), [S11](https://www.boostyup.com/wp-content/uploads/2024/05/Gamme-contenants-BIOPAP-LC.pdf), [S12](https://mixpack.ee/en/product/biopap-easy-catering-si-14-pakis-780-tk/)

### D12 — C6 Romanian availability / inventory

- **Research 1:** Aluminium + transparent constructions locally available in 24-48h.
- **Research 3:** Exact Plus Pack reference, Romania route unknown.
- **Research 4:** WePack/E-ambalaj domestic listings promoted as local stock.
- **Final:** ROMANIA_DISTRIBUTOR_CURRENT = current catalogue/order route. Actual stock UNKNOWN. Separate RO-P, RO-W, RO-H and EU configurations.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** Listed prices/estimated delivery are observed statements, not audited inventory or a single interchangeable package.
- **Evidence:** [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery), [S19](https://www.e-ambalaj.ro/produs/caserole-din-aluminiu-pentru-pui-la-rotisor/), [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html), [S23](https://www.e-ambalaj.ro/termeni-si-conditii/)

### D13 — C6 transparent lid / peak temperature

- **Research 1:** Broad transparent foil-hybrid claim.
- **Research 3:** Exact 0192110201 + clear DPET 5023100000; lid post-oven only.
- **Research 4:** WePack 803261+803262 labelled transparent; 280 C borrowed from E-ambalaj body.
- **Final:** WePack lid transparency UNKNOWN; 280 C only e-pui225. New clear a-680681 for 729 portion family; cross-seller fit and hot-hold unknown. 350 C stays Plus Pack body only.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** Each body, lid, seller and workflow has its own identity. No body rating transfers to lid or another aluminium article.
- **Evidence:** [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery), [S19](https://www.e-ambalaj.ro/produs/caserole-din-aluminiu-pentru-pui-la-rotisor/), [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html), [S24](https://assets.ccntr.pbsnetwork.eu/assets/5790002196140/ts_dk_1731903_00_iss_28062021.pdf), [S25](https://pluspack.com/product/lid-dpet-af-rect-h26mm-clbag-3/)

### D14 — B1 actual incumbent

- **Research 1:** Implied generic/current hot-food construction.
- **Research 3:** Provider material/format entirely unknown.
- **Research 4:** Provider material/format entirely unknown.
- **Final:** New task-authoritative clarification: plastic BAG, effectively 100% virgin / 0% recycled plastic. Exact polymer, mass, size, gauge, SKU, cost and annual volume unknown.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** User-provided mentor clarification outranks older reports; physical mass model is parallel B1-ESTIMATED, never provider fact.
- **Evidence:** `TASK` (input manifest)

### D15 — B2 vs B3 identity

- **Research 1:** Romanian conventional bags treated as operational references.
- **Research 3:** B2 virgin all-plastic bag unresolved; paper+PP excluded.
- **Research 4:** B2 relabelled as generic Romanian paper+PP market bag.
- **Final:** B2 remains UNRESOLVED. Barleta paper+PP becomes B3, explicitly not Profi.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** Identity is part of the comparison contract; changing material construction would falsely resolve the missing virgin-plastic reference.
- **Evidence:** `TASK` (input manifest), `R3` (input manifest), `R4` (input manifest), [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/)

### D16 — Plastic equals total / validation

- **Research 1:** No validator.
- **Research 3:** All-plastic systems permitted; missing BOM cannot yield totals.
- **Research 4:** Validator rejects equality of plastic and total mass.
- **Final:** New validator allows 0 <= virgin <= plastic <= total; equality valid for all-plastic packs. Null never coerced to zero.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** Mathematical identity of an all-plastic pack must not be treated as an error.
- **Evidence:** `TASK` (input manifest), `R3` (input manifest), `R4` (input manifest)

### D17 — Generic TRL / barrier / commercial leads

- **Research 1:** All-paper glassine Mondi/Ahlstrom/Koehler, local converting, Kit12, <=2 weeks, zero capex; TerraShield Crisp-Pouch SteamVent / Huhtamaki Romania.
- **Research 3:** Exact-SKU gate; no substitution.
- **Research 4:** Additional ideas, no complete selected evidence.
- **Final:** Unverified discovery leads only. No new C7 and no certification, grease-test score, MOQ, lead-time or capital requirement invented.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** No exact commercial construction, supplier dossier and Romanian route tied to these claims.
- **Evidence:** `R1` (input manifest), `TASK` (input manifest)

### D18 — Recycled / renewable / compostable semantics

- **Research 1:** Broad sustainability and plastic-levy benefits; RetuRO relevance implied.
- **Research 3:** Mass fractions and Romania EOL mostly unknown.
- **Research 4:** Some unknown recycled fields effectively zero; compost route unavailable in broad terms.
- **Final:** Unknown fractions remain null; scenario zeros are named assumptions. Regenerated-cellulose/biobased carbon fraction is not plastic mass. No automatic RetuRO/tax saving.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** Exact accepted waste stream and applicable obligations require separate evidence; no blanket country compostability inference.
- **Evidence:** [S15](https://www.biopap.com/en/category/news/page/3/), [S37](https://www.eea.europa.eu/en/topics/in-depth/waste-and-recycling/municipal-and-packaging-waste-management-country-profiles-2025/ro-municipal-waste-factsheet.pdf/@@download/file), `TASK` (input manifest)

### D19 — Cost premium feasibility

- **Research 1:** Rapid drop-in economic benefits implied.
- **Research 3:** No Profi price; exact EU component reference prices retained.
- **Research 4:** WePack pair 2.284 RON presented as local concept price.
- **Final:** Keep WePack price only for its unqualified-visibility pair. New local portion model 1.1485-1.2915 RON includes VAT under stated order assumptions. B1 delta UNKNOWN; B3 delta well above +15%.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** No invented incumbent price, freight, margin or tax basis to force a favourable cost result.
- **Evidence:** [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/), [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery), [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html), [S23](https://www.e-ambalaj.ro/termeni-si-conditii/)

### D20 — Product fit and safety PASS

- **Research 1:** Whole chicken and portions commercially ready/drop-in.
- **Research 3:** Product classes often supported, exact fill unqualified.
- **Research 4:** Some family/product-class fit PASS claims.
- **Final:** All P1-P4 require actual fill geometry/headspace plus exact use dossier; product-class marketing is not physical fit or food safety.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** No candidate has cleared all non-compensatory gates. Output is a prioritised qualification decision, not procurement approval.
- **Evidence:** `TASK` (input manifest), `R3` (input manifest), `R4` (input manifest)

### D21 — C6 EU recycled share / carton / wrong price

- **Research 1:** No exact data.
- **Research 3:** Body 31g +/-10%; 38% secondary; gross lid carton 6.984kg/200; wrong OEM price excluded.
- **Research 4:** Mass unknown after later search; generic Plus Pack pages substituted.
- **Final:** Retain exact body TDS and source chain; secondary aluminium is not PCR/current lot. Gross carton becomes only upper cap; exclude lid OEM 5024100200 price.
- **Status:** RESOLVED_FOR_DATASET
- **Rationale:** Exact SKU evidence and component boundaries survive a later weaker search.
- **Evidence:** [S24](https://assets.ccntr.pbsnetwork.eu/assets/5790002196140/ts_dk_1731903_00_iss_28062021.pdf), [S25](https://pluspack.com/product/lid-dpet-af-rect-h26mm-clbag-3/), [S26](https://www.antalis.dk/eshop/fodevareemballage-og-bordaekning/bakker-fodevarer/foliebakker-ready2cook-pdp-hq16491/sku-687194)

## Field-by-field coverage of both structured packets

The canonical JSON retains every complete candidate record from R3 and R4 in `input_claim_archive`, with namespaced source IDs. Each of the following 136 records also retains the exact old field values under `field_reconciliation`; the table gives the adopted rule without copying the full reports into this document. R1 was unstructured and uncited; all decision-relevant assertions and its extra architectures are explicitly resolved in D01–D05 and D17–D20.

| Record | Canonical targets | Adopted field resolution |
|---|---|---|
| B1-identity | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Canonical exact_configuration and component IDs control; no platform/sibling substitution. |
| B1-maturity | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Commercial product existence retained; TRL, stock and Profi readiness not inferred. C4 historic inactive separately retained. |
| B1-components | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Historical/exact component evidence preserved; complete totals are unknown or explicit geometry estimates, never missing-component sums. |
| B1-recycled | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Exact historical C4 body PCR retained; C6-EU secondary aluminium kept distinct; all other unverified shares null. Scenario virgin assumptions explicit. |
| B1-renewable | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Qualitative material positioning retained; no numeric whole-pack fraction without full BOM. B3 paper-only fraction is a scenario. |
| B1-thermal | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Mode, component, source scope and duration preserved. C5 175/185 conflict open; no transferred ratings. |
| B1-hold | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Only C5 has explicit family 6h90 lead; exact system/fill and all microbiological safety unqualified. |
| B1-food_contact | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Marketing food-use statements do not qualify exact DoC, migration, NIAS, PFAS or food safety; missing fields remain unknown. |
| B1-grease | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Keep supplier application/barrier claims as scoped observations; exact leak/grease tests remain unknown. |
| B1-viewing | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Select actual clear component, separate oven/post-oven. C6-W unknown; local C6-P clear counterpart identified, fit and temperature unverified. |
| B1-fit | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Archetype interest is retained; no PASS without exact fill size, portion mass/headspace and physical check. |
| B1-modes | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Use task vocabulary with post-cook primary, literal 250 C branch separate. |
| B1-price | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Retain exact public pack prices; fresh prices supersede older observations only for same item. VAT/freight/component boundaries explicit; B1 cost null. |
| B1-procurement | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Current domestic catalogue route distinct from stock. ReVive historical. Manufacturer presence or EU listing not Romania delivery. |
| B1-eol | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Design/certification/collection/sorting/reprocessing/composting separated; only likely route may be an inference. |
| B1-environmental | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Concrete masses and conditional intervals replace unsupported totals/eco scores. Carbon boundary and old factor sensitivity explicit. |
| B1-display | B1 | B1 user clarification supersedes old all-unknown facts; mass and cost remain separate. Prototype uses typed fields, qualifiers and full intervals; old unsafe PASS/zero/price/availability badges excluded. |
| B2-identity | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Canonical exact_configuration and component IDs control; no platform/sibling substitution. |
| B2-maturity | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Commercial product existence retained; TRL, stock and Profi readiness not inferred. C4 historic inactive separately retained. |
| B2-components | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Historical/exact component evidence preserved; complete totals are unknown or explicit geometry estimates, never missing-component sums. |
| B2-recycled | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Exact historical C4 body PCR retained; C6-EU secondary aluminium kept distinct; all other unverified shares null. Scenario virgin assumptions explicit. |
| B2-renewable | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Qualitative material positioning retained; no numeric whole-pack fraction without full BOM. B3 paper-only fraction is a scenario. |
| B2-thermal | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Mode, component, source scope and duration preserved. C5 175/185 conflict open; no transferred ratings. |
| B2-hold | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Only C5 has explicit family 6h90 lead; exact system/fill and all microbiological safety unqualified. |
| B2-food_contact | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Marketing food-use statements do not qualify exact DoC, migration, NIAS, PFAS or food safety; missing fields remain unknown. |
| B2-grease | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Keep supplier application/barrier claims as scoped observations; exact leak/grease tests remain unknown. |
| B2-viewing | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Select actual clear component, separate oven/post-oven. C6-W unknown; local C6-P clear counterpart identified, fit and temperature unverified. |
| B2-fit | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Archetype interest is retained; no PASS without exact fill size, portion mass/headspace and physical check. |
| B2-modes | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Use task vocabulary with post-cook primary, literal 250 C branch separate. |
| B2-price | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Retain exact public pack prices; fresh prices supersede older observations only for same item. VAT/freight/component boundaries explicit; B1 cost null. |
| B2-procurement | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Current domestic catalogue route distinct from stock. ReVive historical. Manufacturer presence or EU listing not Romania delivery. |
| B2-eol | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Design/certification/collection/sorting/reprocessing/composting separated; only likely route may be an inference. |
| B2-environmental | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Concrete masses and conditional intervals replace unsupported totals/eco scores. Carbon boundary and old factor sensitivity explicit. |
| B2-display | B2, B3 | B2 all-plastic unresolved; R4 paper+PP moved to B3. Prototype uses typed fields, qualifiers and full intervals; old unsafe PASS/zero/price/availability badges excluded. |
| C1-identity | C1 | Canonical exact_configuration and component IDs control; no platform/sibling substitution. |
| C1-maturity | C1 | Commercial product existence retained; TRL, stock and Profi readiness not inferred. C4 historic inactive separately retained. |
| C1-components | C1 | Historical/exact component evidence preserved; complete totals are unknown or explicit geometry estimates, never missing-component sums. |
| C1-recycled | C1 | Exact historical C4 body PCR retained; C6-EU secondary aluminium kept distinct; all other unverified shares null. Scenario virgin assumptions explicit. |
| C1-renewable | C1 | Qualitative material positioning retained; no numeric whole-pack fraction without full BOM. B3 paper-only fraction is a scenario. |
| C1-thermal | C1 | Mode, component, source scope and duration preserved. C5 175/185 conflict open; no transferred ratings. |
| C1-hold | C1 | Only C5 has explicit family 6h90 lead; exact system/fill and all microbiological safety unqualified. |
| C1-food_contact | C1 | Marketing food-use statements do not qualify exact DoC, migration, NIAS, PFAS or food safety; missing fields remain unknown. |
| C1-grease | C1 | Keep supplier application/barrier claims as scoped observations; exact leak/grease tests remain unknown. |
| C1-viewing | C1 | Select actual clear component, separate oven/post-oven. C6-W unknown; local C6-P clear counterpart identified, fit and temperature unverified. |
| C1-fit | C1 | Archetype interest is retained; no PASS without exact fill size, portion mass/headspace and physical check. |
| C1-modes | C1 | Use task vocabulary with post-cook primary, literal 250 C branch separate. |
| C1-price | C1 | Retain exact public pack prices; fresh prices supersede older observations only for same item. VAT/freight/component boundaries explicit; B1 cost null. |
| C1-procurement | C1 | Current domestic catalogue route distinct from stock. ReVive historical. Manufacturer presence or EU listing not Romania delivery. |
| C1-eol | C1 | Design/certification/collection/sorting/reprocessing/composting separated; only likely route may be an inference. |
| C1-environmental | C1 | Concrete masses and conditional intervals replace unsupported totals/eco scores. Carbon boundary and old factor sensitivity explicit. |
| C1-display | C1 | Prototype uses typed fields, qualifiers and full intervals; old unsafe PASS/zero/price/availability badges excluded. |
| C2-identity | C2 | Canonical exact_configuration and component IDs control; no platform/sibling substitution. |
| C2-maturity | C2 | Commercial product existence retained; TRL, stock and Profi readiness not inferred. C4 historic inactive separately retained. |
| C2-components | C2 | Historical/exact component evidence preserved; complete totals are unknown or explicit geometry estimates, never missing-component sums. |
| C2-recycled | C2 | Exact historical C4 body PCR retained; C6-EU secondary aluminium kept distinct; all other unverified shares null. Scenario virgin assumptions explicit. |
| C2-renewable | C2 | Qualitative material positioning retained; no numeric whole-pack fraction without full BOM. B3 paper-only fraction is a scenario. |
| C2-thermal | C2 | Mode, component, source scope and duration preserved. C5 175/185 conflict open; no transferred ratings. |
| C2-hold | C2 | Only C5 has explicit family 6h90 lead; exact system/fill and all microbiological safety unqualified. |
| C2-food_contact | C2 | Marketing food-use statements do not qualify exact DoC, migration, NIAS, PFAS or food safety; missing fields remain unknown. |
| C2-grease | C2 | Keep supplier application/barrier claims as scoped observations; exact leak/grease tests remain unknown. |
| C2-viewing | C2 | Select actual clear component, separate oven/post-oven. C6-W unknown; local C6-P clear counterpart identified, fit and temperature unverified. |
| C2-fit | C2 | Archetype interest is retained; no PASS without exact fill size, portion mass/headspace and physical check. |
| C2-modes | C2 | Use task vocabulary with post-cook primary, literal 250 C branch separate. |
| C2-price | C2 | Retain exact public pack prices; fresh prices supersede older observations only for same item. VAT/freight/component boundaries explicit; B1 cost null. |
| C2-procurement | C2 | Current domestic catalogue route distinct from stock. ReVive historical. Manufacturer presence or EU listing not Romania delivery. |
| C2-eol | C2 | Design/certification/collection/sorting/reprocessing/composting separated; only likely route may be an inference. |
| C2-environmental | C2 | Concrete masses and conditional intervals replace unsupported totals/eco scores. Carbon boundary and old factor sensitivity explicit. |
| C2-display | C2 | Prototype uses typed fields, qualifiers and full intervals; old unsafe PASS/zero/price/availability badges excluded. |
| C3-identity | C3 | Canonical exact_configuration and component IDs control; no platform/sibling substitution. |
| C3-maturity | C3 | Commercial product existence retained; TRL, stock and Profi readiness not inferred. C4 historic inactive separately retained. |
| C3-components | C3 | Historical/exact component evidence preserved; complete totals are unknown or explicit geometry estimates, never missing-component sums. |
| C3-recycled | C3 | Exact historical C4 body PCR retained; C6-EU secondary aluminium kept distinct; all other unverified shares null. Scenario virgin assumptions explicit. |
| C3-renewable | C3 | Qualitative material positioning retained; no numeric whole-pack fraction without full BOM. B3 paper-only fraction is a scenario. |
| C3-thermal | C3 | Mode, component, source scope and duration preserved. C5 175/185 conflict open; no transferred ratings. |
| C3-hold | C3 | Only C5 has explicit family 6h90 lead; exact system/fill and all microbiological safety unqualified. |
| C3-food_contact | C3 | Marketing food-use statements do not qualify exact DoC, migration, NIAS, PFAS or food safety; missing fields remain unknown. |
| C3-grease | C3 | Keep supplier application/barrier claims as scoped observations; exact leak/grease tests remain unknown. |
| C3-viewing | C3 | Select actual clear component, separate oven/post-oven. C6-W unknown; local C6-P clear counterpart identified, fit and temperature unverified. |
| C3-fit | C3 | Archetype interest is retained; no PASS without exact fill size, portion mass/headspace and physical check. |
| C3-modes | C3 | Use task vocabulary with post-cook primary, literal 250 C branch separate. |
| C3-price | C3 | Retain exact public pack prices; fresh prices supersede older observations only for same item. VAT/freight/component boundaries explicit; B1 cost null. |
| C3-procurement | C3 | Current domestic catalogue route distinct from stock. ReVive historical. Manufacturer presence or EU listing not Romania delivery. |
| C3-eol | C3 | Design/certification/collection/sorting/reprocessing/composting separated; only likely route may be an inference. |
| C3-environmental | C3 | Concrete masses and conditional intervals replace unsupported totals/eco scores. Carbon boundary and old factor sensitivity explicit. |
| C3-display | C3 | Prototype uses typed fields, qualifiers and full intervals; old unsafe PASS/zero/price/availability badges excluded. |
| C4-identity | C4 | Canonical exact_configuration and component IDs control; no platform/sibling substitution. |
| C4-maturity | C4 | Commercial product existence retained; TRL, stock and Profi readiness not inferred. C4 historic inactive separately retained. |
| C4-components | C4 | Historical/exact component evidence preserved; complete totals are unknown or explicit geometry estimates, never missing-component sums. |
| C4-recycled | C4 | Exact historical C4 body PCR retained; C6-EU secondary aluminium kept distinct; all other unverified shares null. Scenario virgin assumptions explicit. |
| C4-renewable | C4 | Qualitative material positioning retained; no numeric whole-pack fraction without full BOM. B3 paper-only fraction is a scenario. |
| C4-thermal | C4 | Mode, component, source scope and duration preserved. C5 175/185 conflict open; no transferred ratings. |
| C4-hold | C4 | Only C5 has explicit family 6h90 lead; exact system/fill and all microbiological safety unqualified. |
| C4-food_contact | C4 | Marketing food-use statements do not qualify exact DoC, migration, NIAS, PFAS or food safety; missing fields remain unknown. |
| C4-grease | C4 | Keep supplier application/barrier claims as scoped observations; exact leak/grease tests remain unknown. |
| C4-viewing | C4 | Select actual clear component, separate oven/post-oven. C6-W unknown; local C6-P clear counterpart identified, fit and temperature unverified. |
| C4-fit | C4 | Archetype interest is retained; no PASS without exact fill size, portion mass/headspace and physical check. |
| C4-modes | C4 | Use task vocabulary with post-cook primary, literal 250 C branch separate. |
| C4-price | C4 | Retain exact public pack prices; fresh prices supersede older observations only for same item. VAT/freight/component boundaries explicit; B1 cost null. |
| C4-procurement | C4 | Current domestic catalogue route distinct from stock. ReVive historical. Manufacturer presence or EU listing not Romania delivery. |
| C4-eol | C4 | Design/certification/collection/sorting/reprocessing/composting separated; only likely route may be an inference. |
| C4-environmental | C4 | Concrete masses and conditional intervals replace unsupported totals/eco scores. Carbon boundary and old factor sensitivity explicit. |
| C4-display | C4 | Prototype uses typed fields, qualifiers and full intervals; old unsafe PASS/zero/price/availability badges excluded. |
| C5-identity | C5 | Canonical exact_configuration and component IDs control; no platform/sibling substitution. |
| C5-maturity | C5 | Commercial product existence retained; TRL, stock and Profi readiness not inferred. C4 historic inactive separately retained. |
| C5-components | C5 | Historical/exact component evidence preserved; complete totals are unknown or explicit geometry estimates, never missing-component sums. |
| C5-recycled | C5 | Exact historical C4 body PCR retained; C6-EU secondary aluminium kept distinct; all other unverified shares null. Scenario virgin assumptions explicit. |
| C5-renewable | C5 | Qualitative material positioning retained; no numeric whole-pack fraction without full BOM. B3 paper-only fraction is a scenario. |
| C5-thermal | C5 | Mode, component, source scope and duration preserved. C5 175/185 conflict open; no transferred ratings. |
| C5-hold | C5 | Only C5 has explicit family 6h90 lead; exact system/fill and all microbiological safety unqualified. |
| C5-food_contact | C5 | Marketing food-use statements do not qualify exact DoC, migration, NIAS, PFAS or food safety; missing fields remain unknown. |
| C5-grease | C5 | Keep supplier application/barrier claims as scoped observations; exact leak/grease tests remain unknown. |
| C5-viewing | C5 | Select actual clear component, separate oven/post-oven. C6-W unknown; local C6-P clear counterpart identified, fit and temperature unverified. |
| C5-fit | C5 | Archetype interest is retained; no PASS without exact fill size, portion mass/headspace and physical check. |
| C5-modes | C5 | Use task vocabulary with post-cook primary, literal 250 C branch separate. |
| C5-price | C5 | Retain exact public pack prices; fresh prices supersede older observations only for same item. VAT/freight/component boundaries explicit; B1 cost null. |
| C5-procurement | C5 | Current domestic catalogue route distinct from stock. ReVive historical. Manufacturer presence or EU listing not Romania delivery. |
| C5-eol | C5 | Design/certification/collection/sorting/reprocessing/composting separated; only likely route may be an inference. |
| C5-environmental | C5 | Concrete masses and conditional intervals replace unsupported totals/eco scores. Carbon boundary and old factor sensitivity explicit. |
| C5-display | C5 | Prototype uses typed fields, qualifiers and full intervals; old unsafe PASS/zero/price/availability badges excluded. |
| C6-identity | C6 | Canonical exact_configuration and component IDs control; no platform/sibling substitution. |
| C6-maturity | C6 | Commercial product existence retained; TRL, stock and Profi readiness not inferred. C4 historic inactive separately retained. |
| C6-components | C6 | Historical/exact component evidence preserved; complete totals are unknown or explicit geometry estimates, never missing-component sums. |
| C6-recycled | C6 | Exact historical C4 body PCR retained; C6-EU secondary aluminium kept distinct; all other unverified shares null. Scenario virgin assumptions explicit. |
| C6-renewable | C6 | Qualitative material positioning retained; no numeric whole-pack fraction without full BOM. B3 paper-only fraction is a scenario. |
| C6-thermal | C6 | Mode, component, source scope and duration preserved. C5 175/185 conflict open; no transferred ratings. |
| C6-hold | C6 | Only C5 has explicit family 6h90 lead; exact system/fill and all microbiological safety unqualified. |
| C6-food_contact | C6 | Marketing food-use statements do not qualify exact DoC, migration, NIAS, PFAS or food safety; missing fields remain unknown. |
| C6-grease | C6 | Keep supplier application/barrier claims as scoped observations; exact leak/grease tests remain unknown. |
| C6-viewing | C6 | Select actual clear component, separate oven/post-oven. C6-W unknown; local C6-P clear counterpart identified, fit and temperature unverified. |
| C6-fit | C6 | Archetype interest is retained; no PASS without exact fill size, portion mass/headspace and physical check. |
| C6-modes | C6 | Use task vocabulary with post-cook primary, literal 250 C branch separate. |
| C6-price | C6 | Retain exact public pack prices; fresh prices supersede older observations only for same item. VAT/freight/component boundaries explicit; B1 cost null. |
| C6-procurement | C6 | Current domestic catalogue route distinct from stock. ReVive historical. Manufacturer presence or EU listing not Romania delivery. |
| C6-eol | C6 | Design/certification/collection/sorting/reprocessing/composting separated; only likely route may be an inference. |
| C6-environmental | C6 | Concrete masses and conditional intervals replace unsupported totals/eco scores. Carbon boundary and old factor sensitivity explicit. |
| C6-display | C6 | Prototype uses typed fields, qualifiers and full intervals; old unsafe PASS/zero/price/availability badges excluded. |
