# APR-HT1 — Claim Safety Matrix, Challenge Coverage & Mentor Alignment

**Document class:** CLAIM SAFETY SPECIFICATION / ACCEPTANCE BOUNDARY  
**Contract:** APR-HT1 — HTF-03 Recommendation Acceptance & Claims Safety  
**Owner:** Alisa (Product / QA / Acceptance)  
**Target Repository:** `Slave-of-Skynet/gigafood`  
**Accepted Base:** `main @ e067764d334e260440ed69ae6d68dab42205b3a4`  
**Upstream Contract:** `INT-HTF-04A — Canonical Runtime Transition & Parallelization Gate`  
**Canonical Evidence Baseline:** `docs/evidence/htf-03/**`  
**Execution Date:** 2026-09-26  

---

## 1. Executive Summary & Epistemic Boundary

This document defines the **Claims Safety Matrix**, **Challenge Coverage Matrix**, and **Mentor Requirement Matrix** for GigaFood / PackShift under contract `APR-HT1`.

### 1.1 The Prime Product Boundary
Software is:
```text
EVIDENCE SCOPING + DECISION SUPPORT + DEMONSTRATION
```
Software is **NOT**:
```text
CERTIFICATION
FOOD-SAFETY APPROVAL
LEGAL / DECLARATION OF COMPLIANCE (DoC) APPROVAL
PROCUREMENT APPROVAL
PRODUCTION DEPLOYMENT READINESS
```

### 1.2 Non-Inference Rules for Safety Claims
Under no circumstances may the recommendation engine, API, frontend, or pitch copy infer physical safety or legal status mathematically:
- **High temperature does NOT imply food safety.** (Thermal endurance of a polymer or aluminium body does not prove compliance with specific migration limits for hot chicken fat under EU 10/2011).
- **A 6-hour temperature claim does NOT prove microbiological safety or organoleptic stability.**
- **A recyclable polymer design does NOT imply actual recycling in Romanian municipal waste streams.**
- **A public distributor product listing does NOT imply verified stock, delivery readiness, or agreed commercial terms.**
- **A lower virgin-plastic mass does NOT compensate for a failed or unverified functional/thermal gate.**

---

## 2. Master Claim Taxonomy (Section 35)

The table below catalogs every claim across the nine required categories, establishing strict boundaries between **Allowed Demo-Safe Wording** and **Forbidden Stronger Wording**:

| Claim ID | Category | Claim Subject | Product / Workflow | Candidate / Config | Evidence Ref | Epistemic State | Allowed Wording (Demo-Safe) | Forbidden Stronger Wording (Reject/Defect) | Demo Priority |
|---|---|---|---|---|---|---|---|---|---|
| **CLM-01** | Technical | Whole chicken packaging concept | P1 / POST_COOK | C1 Gaia | S01, S02 | `QUALIFICATION_REQUIRED` | *"For whole chicken, we prioritize Gaia as the first qualification path; sizing, fatty-food migration, and 6-hour holding require physical testing."* | *"Gaia is the best/winning packaging for whole chicken; approved for Profi."* | Critical Path |
| **CLM-02** | Technical | Portions packaging concept | P2–P4 / POST_COOK | C5 BIOPAP LC SI-14 | S07, S09, S14 | `QUALIFICATION_REQUIRED` | *"For portions, BIOPAP LC SI-14 is our primary qualification lead based on its 6h/90°C family claim; exact tray+film system must be qualified."* | *"BIOPAP is the certified winning container for hot deli portions."* | Critical Path |
| **CLM-03** | Technical | High-temperature oven fallback | P1–P4 / LITERAL_250C | C6-RO-H | S19, S23 | `QUALIFICATION_REQUIRED` | *"If pack must endure 250°C oven baking, aluminium body (e-pui225) provides a high-temperature fallback path; compatible transparent closure and duration remain unverified."* | *"Aluminium pack is 100% oven safe at 250°C for 6 hours; complete oven-ready winner."* | Contrast Demo |
| **CLM-04** | Technical | Siralon 21 oven limits | P1–P4 / LITERAL_250C | C2 Siralon 21 | S03, S04 | `FAIL` | *"Siralon 21 is rated up to 200°C; it cannot endure literal 250°C baking and is blocked for this workflow."* | *"Dual-ovenable bag suitable for high-heat 250°C baking."* | Contrast Demo |
| **CLM-05** | Technical | BIOPAP thermal conflict | P1–P4 / Both | C5 BIOPAP | S07, S08, C01 | `CONFLICT` | *"Manufacturer literature lists both 175°C and 185°C (60 min) for LC bodies; neither clears 250°C baking, and exact limit remains a conflict."* | *"BIOPAP is certified up to 185°C." (Collapsing conflict into single value)* | Critical Path |
| **CLM-06** | Technical | 6-hour hot holding duration | P2–P4 / POST_COOK | C5 BIOPAP | S09 | `OBSERVED_VERIFIED` (Family) | *"BIOPAP publishes a 6-hour at 90°C hot-meal holding claim for the LC family. Exact SI-14 tray, film seal, and chicken grease performance must still be tested."* | *"BIOPAP guarantees 6 hours food safety at 90°C for Profi deli chicken."* | Critical Path |
| **CLM-07** | Technical | Whole chicken sizing / fit | P1 / Both | All candidates | S01, S18, S19 | `QUALIFICATION_REQUIRED` | *"Whole chicken sizing (1.0–1.4 kg hot whole bird) requires physical sample fit-checks against bag gussets and container headspace."* | *"Guaranteed fit for all Profi rotisserie chickens."* | Secondary |
| **CLM-08** | Environmental | Virgin plastic reduction vs incumbent | P1 / POST_COOK | C1 Gaia | E008, E039 | `ESTIMATED` | *"Under our model, Gaia's paper body could substantially reduce plastic, but exact C1 virgin plastic mass is unmeasured; no reduction is verified."* | *"Gaia cuts virgin plastic by 85% vs Profi."* | Critical Path |
| **CLM-09** | Environmental | SI-14 virgin plastic reduction | P2–P4 / POST_COOK | C5 BIOPAP | E018, E051 | `ESTIMATED` | *"Counting clear film as virgin plastic gives an estimated central 52.5% reduction vs modeled bag, but the scenario range spans -67.6% to +82.1%. No positive reduction is verified."* | *"SI-14 guarantees 53% virgin plastic reduction."* | Critical Path |
| **CLM-10** | Environmental | Incumbent bag virgin fraction | Baseline | B1 Incumbent | TASK (Mentor) | `OBSERVED_VERIFIED` | *"Profi's current rotisserie packaging is effectively 100% virgin plastic (virgin fraction 1.0); incumbent mass and polymer remain unmeasured."* | *"Profi uses 6.5 g PET bag." (Treating model as measured fact)* | Critical Path |
| **CLM-11** | Environmental | B1 baseline modeled mass | Baseline | B1-ESTIMATED | E002 | `ESTIMATED` | *"Our modeled baseline scenario for a PET/PA rotisserie bag yields approximately 2.6–12.5 g (central 6.5 g). We have not weighed Profi's actual bag."* | *"Current Profi packaging weighs 6.5 g."* | Critical Path |
| **CLM-12** | Environmental | Romanian recyclability reality | All | All candidates | S33, S35 | `QUALIFICATION_REQUIRED` | *"While paper and aluminium are designed for recycling, actual recycling depends on local municipal collection, sorting, and grease contamination levels in Romania."* | *"Guaranteed 100% recyclable in Romania; zero landfill impact."* | Secondary |
| **CLM-13** | Environmental | Multilayer barrier trade-offs | All | C2, C3 | S03, S05 | `QUALIFICATION_REQUIRED` | *"Coextruded barrier films provide grease and thermal resistance, but complex multi-layer structures present major challenges for municipal mechanical recycling."* | *"Advanced multi-layer bags are fully eco-friendly."* | Background |
| **CLM-14** | Environmental | Material-only CO₂ scenario | All | C1, C5, C6 | E059, E060 | `ESTIMATED` (Research) | *"Material-only CO₂ estimates reflect raw resin production screening only; they exclude converting, logistics, food waste, and end-of-life, and are NOT a full product LCA."* | *"Gaia has the lowest carbon footprint; verified net-zero solution."* | Off-limits / Research |
| **CLM-15** | Commercial | Portion packaging budget | P2–P4 / POST_COOK | C6-RO-P | E021 | `ESTIMATED` | *"Public retail listings for 729 aluminium tray and clear lid indicate an indicative budget of 1.15–1.29 RON/pair including VAT at 1400-set orders. Cross-seller fit requires validation."* | *"Fixed procurement price of 1.15 RON approved for Profi."* | Critical Path |
| **CLM-16** | Commercial | Whole chicken aluminium body cost | P1 / LITERAL_250C | C6-RO-H | E029 | `DERIVED_EXACT` | *"E-ambalaj lists e-pui225 bodies at 1.43 RON/piece (143 RON / 100 pcs, VAT included). This price excludes any clear closure or freight below order threshold."* | *"Complete whole-chicken pack costs 1.43 RON."* | Contrast Demo |
| **CLM-17** | Commercial | Romanian market reference price | Baseline | B3 Barleta | S17 | `OBSERVED_VERIFIED` | *"Barleta 128002 paper+PP rotisserie bag is listed at 370.26 RON / 1000 pcs (0.37 RON/pc, VAT included) as a Romanian market reference, NOT Profi's price."* | *"Current Profi bag costs 0.37 RON."* | Critical Path |
| **CLM-18** | Commercial | Mentor +10–15% cost tolerance | All | All | Mentor | `ASSUMED` (Context) | *"Mentor indicated +10–15% cost delta over incumbent is approximately acceptable context for a viable sustainable solution. It is NOT an automatic qualification gate."* | *"Cost delta <= 15% means candidate is officially approved."* | Critical Path |
| **CLM-19** | Procurement | Domestic Romanian availability | All | C6-RO-P, C6-RO-W, C6-RO-H, B3 | S17, S18, S19, S20, S22 | `OBSERVED_VERIFIED` | *"Domestic Romanian distributor catalogue listings exist for B3 bag and C6 aluminium components, enabling immediate sample procurement for testing."* | *"All packaging is in stock and ready for store rollout."* | Critical Path |
| **CLM-20** | Procurement | European candidate supply route | All | C1, C2, C3, C5 | S01, S04, S07 | `QUALIFICATION_REQUIRED` | *"C1 Gaia, C2 Siralon, C3 CRYOVAC, and C5 BIOPAP are European manufacturers without verified Romanian shelf stock; written distributor quotes, MOQs, and lead times are required."* | *"Rapid drop-in delivery available from local stock."* | Critical Path |
| **CLM-21** | Procurement | Faerch CPET procurement status | All | C4 Faerch CPET | S06 | `FAIL` | *"Historical Faerch CPET track is discontinued / unobtainable for new deployment without an updated successor article; procurement gate is BLOCKED."* | *"Faerch CPET is available for order."* | Background |
| **CLM-22** | Food Contact | Fatty food migration & DoC | All | All | EU 10/2011 | `UNKNOWN` | *"Official Declaration of Compliance (DoC) and overall/specific migration tests under actual hot chicken fat conditions (Simulant D2) remain to be provided by suppliers."* | *"Package is fully certified food-safe for hot deli chicken."* | Critical Path |
| **CLM-23** | Food Contact | PFAS & chemical barrier safety | All | C1, C5 | S01, S07 | `UNKNOWN` | *"Supplier confirmation of PFAS-free oil barriers and NIAS screening is required before food contact clearance."* | *"Certified 100% non-toxic and chemical-free."* | Secondary |
| **CLM-24** | User Experience | Transparent product viewing | All | C1, C5, C6-RO-P | S01, S14, S22 | `QUALIFICATION_REQUIRED` | *"C1 bag window, C5 heat-sealed clear film, and C6-RO-P clear lid provide visible product display. Anti-fog performance and post-oven clarity require hot-counter validation."* | *"Clear view guaranteed under all steaming conditions."* | Critical Path |
| **CLM-25** | User Experience | High-temperature viewing barrier | P1 / LITERAL_250C | C6-RO-H | S19 | `UNKNOWN` | *"Aluminium 2400 ml body does not include a verified transparent closure. Clear plastic lids cannot enter a 250°C oven; viewing is possible only if capped post-oven."* | *"Transparent ovenable chicken roaster."* | Contrast Demo |
| **CLM-26** | User Experience | Hot-counter handling & closure | All | All | Mentor | `QUALIFICATION_REQUIRED` | *"In-store worker workflow (filling, folding/sealing hot chicken quickly) and customer grease-free transport require physical ergonomic trials."* | *"Flawless store UX and easy handling."* | Secondary |
| **CLM-27** | Scalability | Volume for 1,700 Profi stores | All | All | Mentor | `UNKNOWN` | *"Supplier production capacity, distributor supply contracts, and regional logistics across Profi's 1,700-store network remain unverified."* | *"Fully scalable for nationwide retail rollout tomorrow."* | Secondary |
| **CLM-28** | Business Viability | Total packaging cost impact | All | All | Mentor | `ESTIMATED` | *"Annual packaging expenditure depends on unmeasured Profi store sales volume. Indicative per-unit packaging premiums must be balanced against customer brand loyalty."* | *"Profi will save 500,000 EUR annually by switching."* | Secondary |
| **CLM-29** | Architecture | C6 configuration independence | All | C6 | INT-HTF-04A | `DERIVED_EXACT` | *"C6 configurations (RO-P, RO-W, RO-H, EU) represent distinct physical articles. Evidence, pricing, and ratings must NEVER leak between them."* | *"Aluminium body 350°C rating proves Romanian portion pack is heat resistant."* | Critical Path |
| **CLM-30** | Safety | Anti-fog & steam condensation | All | C1, C5, C6-RO-P | S01, S14, S22 | `UNKNOWN` | *"Steam venting and anti-fog coatings are unverified; condensation on clear windows could obstruct customer inspection."* | *"Permanent crystal-clear view without fogging."* | Secondary |

---

## 3. Official Challenge Coverage Matrix (Section 36)

This matrix maps the proposed solution and decision demonstration against the eight official AgriFood judging criteria. Every category is evaluated with strict epistemic integrity:

| Judging Criterion | Weight | Coverage Status | Grounded Demo Evidence Anchor | Identified Technical & Evidence Gaps |
|---|---|---|---|---|
| **Environmental Impact** | 25% | **PARTIALLY SUPPORTED** | • Incumbent 100% virgin plastic baseline identified (`B1`).<br>• Renewable paper-first Gaia (`C1`) and cellulose tray (`C5`) prioritized.<br>• Rigorous virgin plastic accounting formulas defined (`E051`, `E008`). | • No physical candidate has measured virgin plastic mass for exact SKU.<br>• Real-world Romanian mechanical recycling and composting routes for contaminated paper/laminates remain unverified.<br>• Full LCA excluded (material-only screening only). |
| **Retail Practicality** | 15% | **PARTIALLY SUPPORTED** | • Respects mentor preference for bags for whole chicken (`C1`) and trays for portions (`C5`).<br>• Differentiates post-cook hot holding (85–95°C) from in-pack baking (250°C).<br>• Transparent viewing window/lid accounted for in all paths. | • Actual worker pack-closure speed and ease during peak store hours unverified.<br>• Whole bird sizing (1.0–1.4 kg) headroom and fat accumulation unvalidated.<br>• Seam leak-tightness under hot chicken fat during 6-hour hold unproven. |
| **Technical Feasibility** | 15% | **SUPPORTED** | • Explicit 6-gate evaluation model (fit, food contact, thermal, grease, viewing, procurement).<br>• Thermal constraints enforced (C2/C3/C4/C5 blocked at 250°C; C6-RO-H fallback identified).<br>• 48-row decision matrix grounded in verified manufacturer TDS where available. | • Migration testing (DoC / EU 10/2011) for hot fatty chicken remains supplier responsibility.<br>• BIOPAP 175°C vs 185°C conflict unresolved.<br>• Post-oven transparent closure for C6-RO-H unverified. |
| **Innovation** | 10% | **SUPPORTED** | • Evidence-first decision support architecture replacing unverified "greenwashing" claims.<br>• Rigorous epistemic state modeling (`OBSERVED`, `ESTIMATED`, `CONFLICT`, `UNKNOWN`).<br>• Novel dual-path qualification (Gaia renewable bag vs BIOPAP portion tray vs C6 high-temp fallback). | • Physical material chemistry is commercial, not proprietary team invention.<br>• Final physical performance dependent on commercial converter manufacturing. |
| **Business Viability** | 10% | **PARTIALLY SUPPORTED** | • Grounded Romanian commercial prices captured for local components (1.15–1.29 RON for portion pack, 0.37 RON for B3 reference).<br>• Mentor +10–15% cost tolerance integrated as evaluation context.<br>• Transparent pricing basis (VAT included, order units, free freight thresholds). | • Profi incumbent packaging procurement cost is UNKNOWN.<br>• European candidate (C1, C5) industrial volume pricing requires written quotes.<br>• Capital cost of in-store heat-sealing equipment for BIOPAP film uncosted. |
| **Scalability** | 10% | **PARTIALLY SUPPORTED** | • Local Romanian suppliers identified (E-ambalaj, La Habibi, Barleta, WePack) for rapid sampling.<br>• Established multinational manufacturers (Sacma, BIOPAP, Plus Pack) capable of industrial volumes. | • Supply chain capacity and inventory for 1,700 Profi stores unverified.<br>• Lead times for imported European articles (C1, C5) uncontracted. |
| **User Experience (UX)** | 10% | **SUPPORTED** | • Interactive PackShift decision UI demonstrating transparent trade-offs.<br>• Visible epistemic badges (`ESTIMATED`, `CONFLICT`, `QUALIFICATION REQUIRED`).<br>• Explicit customer viewing requirements preserved (windowed bag, clear lid/film). | • In-store consumer opening and grease-free home transport require physical testing.<br>• Anti-fog performance under hot humid counter conditions unverified. |
| **Presentation** | 5% | **SUPPORTED** | • Honest, defensible pitch structure strictly aligned with evidence.<br>• Clear visual demarcation between proven facts and open validation items.<br>• Concrete next physical validation roadmap for Profi procurement teams. | • Final pitch rehearsal and slide deck synchronization required. |

---

## 4. Mentor Requirement Alignment Matrix (Section 37)

The table below directly reconciles all 15 points articulated by the mentor during the 11:19 Descript clarification:

| # | Mentor Requirement | Representation in HTF-03 / PackShift | Evidence Status & Confidence | Approved Demo Wording | Identified Gap & Uncertainty | Next Physical Validation Action |
|---|---|---|---|---|---|---|
| **M01** | Virgin plastic reduction | `B1` virgin fraction 1.0; `E008` (C1), `E051` (C5), `E025` (C6) scenarios. | `ESTIMATED` (Very Low) | *"Modeled scenarios indicate significant virgin plastic reduction potential; physical masses must be weighed to verify."* | Incumbent mass and candidate BOM unmeasured. C5 range crosses zero (-67.6% to +82.1%). | Weigh actual Profi bag; weigh physical candidate samples with closures. |
| **M02** | 200–250°C oven context | Workflow `LITERAL_OVEN_250C_THEN_HOLD`; `C6-RO-H` seller 280°C claim (`S19`). | `OBSERVED_VERIFIED` (Seller claim, Low confidence) | *"Aluminium body (e-pui225) offers a 280°C seller claim for high-heat baking; duration and transparent lid unverified."* | C2, C3, C4, C5 fail thermally. C6 clear lid cannot enter 250°C oven. | Perform 250°C oven test with chicken fill; measure temperature curve. |
| **M03** | 180–190°C rotisserie context | Cook outside package -> hot hold, or gentle oven reheat. | `ASSUMED` (Low) | *"Primary workflow assumes chickens are cooked outside packaging, then transferred hot into bags/trays for display."* | Profi store equipment settings and standard operating procedure unconfirmed. | Audit Profi in-store rotisserie cooking and packing SOP. |
| **M04** | Up to 6 hours holding | Workflow `POST_COOK_HOT_HOLD_6H`; `S09` BIOPAP 6h @ 90°C claim. | `OBSERVED_VERIFIED` (Family, Medium confidence) | *"BIOPAP documents a 6h/90°C holding claim for LC family; exact tray+film configuration must be qualified."* | Gaia and aluminium 6-hour thermal degradation and seam integrity unevidenced. | 6-hour holding trial at 85–95°C in commercial hot deli display case. |
| **M05** | Food contact safety | Gate `food_contact` evaluated across all 48 rows. | `UNKNOWN` (All candidates) | *"Supplier Declaration of Compliance (DoC) and fatty food migration testing (Simulant D2) are required before deployment."* | No candidate has an exact selected complete-system fatty-food migration certificate on file. | Request official EU 10/2011 DoCs and migration lab reports from suppliers. |
| **M06** | Grease and oil barrier | Gate `grease_leak` evaluated across all 48 rows. | `UNKNOWN` (All candidates) | *"Chicken fat and juices require robust grease barrier and leak-tight closures; physical seam testing is essential."* | Liquid grease holding under 85–95°C over 6 hours unverified for paper bag seams. | Hot chicken grease leakage and paper saturation test over 6 hours. |
| **M07** | Transparent viewing | Gate `transparent_viewing`; `C1` window, `C5` film, `C6-RO-P` clear lid. | `OBSERVED_VERIFIED` (Components, Medium) | *"Packaging includes clear viewing windows/lids for customer inspection; anti-fog performance requires validation."* | Condensation/fogging behavior unverified. C6-RO-H clear lid absent. | Test window clarity and anti-fog behavior under high humidity at 90°C. |
| **M08** | Small portions | Products `P2` (wings/thighs), `P3` (potatoes/veg), `P4` (meat portions). | `QUALIFICATION_REQUIRED` (Prio 1: C5) | *"For hot deli portions, BIOPAP LC SI-14 tray with clear film is our primary qualification lead."* | Optimal portion volume, tray compartments, and heat-sealing equipment in stores. | Conduct portion packing trials with store deli staff. |
| **M09** | Whole chicken | Product `P1` (1.0–1.4 kg hot whole bird); bag preferred over box. | `QUALIFICATION_REQUIRED` (Prio 1: C1) | *"For whole chicken, we prioritize flexible bags (Gaia C1) over rigid boxes to resolve sizing and storage constraints."* | Headspace, steam venting, and bag structural collapse under chicken weight. | Fit-check 1.4 kg hot chickens in sample bags; evaluate handle strength. |
| **M10** | Recyclability in Romania | Gate `procurement` / EOL; `S33`, `S35`. | `OBSERVED_VERIFIED` (Design, Medium) | *"Materials are designed for recycling or composting, but real-world recovery depends on local Romanian municipal infrastructure."* | Grease-contaminated paper and PLA/cellulose films are frequently incinerated or landfilled in Romania. | Review Romanian waste management regulations and local recycler acceptance. |
| **M11** | Avoid problematic multilayers | Excluded unrecyclable metallized laminates; focused on monomaterials / paper. | `OBSERVED_VERIFIED` (Literature) | *"We avoid multi-material plastic laminates that cannot be separated in mechanical recycling streams."* | High-barrier monomaterials often have lower thermal limits. | Verify barrier sufficiency of unlaminated renewable substrates. |
| **M12** | Cost practicality / +10–15% | Commercial price ledgers `PRICE-B3`, `PRICE-C6-P`, `PRICE-C6-H`. | `ESTIMATED` / `OBSERVED` | *"Packaging cost delta is evaluated with mentor's +10–15% tolerance as context; absolute savings remain unverified."* | Actual Profi baseline purchase price is unknown. European import freight unquoted. | Obtain written commercial volume quotations for 1,700-store scale. |
| **M13** | Composition & layer transparency | Candidate BOMs documented (`BOM-C1`, `BOM-C5`, `BOM-C6`). | `OBSERVED_VERIFIED` / `UNKNOWN` | *"Exact substrate layers, coatings, and film gauges are documented where published; undisclosed adhesives remain unknown."* | Proprietary barrier coating chemistries not fully disclosed by manufacturers. | Request full material composition disclosures under NDA. |
| **M14** | Formal certificates & evidence | Source ledger with 35 cited sources (`S01`–`S35`). | `OBSERVED_VERIFIED` (Public) | *"All claims are grounded in verifiable manufacturer data sheets and public catalogues; lab certificates are tracked as required."* | Formal lab test reports for exact food simulant contact are not yet in hand. | Commission independent laboratory migration and grease barrier audits. |
| **M15** | Romania procurement routes | Procurement ledger `HTF-03-romania-procurement.md`. | `OBSERVED_VERIFIED` (Local listings) | *"Local Romanian distributors (E-ambalaj, La Habibi, Barleta) identified for immediate sample procurement."* | European manufacturers require commercial agency / distributor agreements in Romania. | Order physical sample lots from local distributors; initiate direct contact with Sacma & BIOPAP. |

---

## 5. Demo Critical Paths & Presentation Safeguards

### 5.1 Primary Demo Path (`P1` + `POST_COOK_HOT_HOLD_6H`)
- **Interactive Narrative:** Whole rotisserie chicken in store deli display counter.
- **Decision Engine Output:**
  - First qualification path: **`C1 Sacma B.Life Gaia`** (qualification_priority = 1).
  - Status: **`QUALIFICATION REQUIRED`**.
  - Qualified survivors: **0**.
  - Local sample alternative: **`C6-RO-W / C6-RO-H`** (qualification_priority = 2).
  - Virgin plastic claim: **Estimated scenario only** (range displayed; no single verified saving badge).
  - Romanian supply: Distributor quote required; no stock verified.
  - Gaps clearly shown: Food contact DoC, 6-hour grease test, physical whole-bird fit check.
  - Forbidden terms strictly blocked: *"Winner"*, *"Approved"*, *"Best"*, *"Certified"*.

### 5.2 Contrast Demo Path (`P1` + `LITERAL_OVEN_250C_THEN_HOLD`)
- **Interactive Narrative:** In-pack oven baking / reheating up to 250°C.
- **Decision Engine Output:**
  - Candidate landscape immediately changes.
  - Candidates `C2`, `C3`, `C4`, `C5` are **STRICTLY BLOCKED** (`thermal_workflow: FAIL`).
  - Candidate `C6 Aluminium` binds to **`C6-RO-H`** (E-ambalaj e-pui225).
  - Status: **`QUALIFICATION REQUIRED`** (qualification_priority = 2).
  - Priority remains 2: **Must NOT be renumbered as priority 1 or declared a winner**.
  - Transparent viewing: Clear closure absent / cannot enter 250°C oven.
  - Duration at 250°C and 6-hour holding post-oven remain UNKNOWN.

### 5.3 Portion Demo Path (`P2`–`P4` + `POST_COOK_HOT_HOLD_6H`)
- **Interactive Narrative:** Hot chicken wings, thighs, potatoes, and meat portions.
- **Decision Engine Output:**
  - First qualification path: **`C5 BIOPAP LC SI-14 + heat-sealable transparent film`** (qualification_priority = 1).
  - Status: **`QUALIFICATION REQUIRED`**.
  - Mass: Estimated central **26.6 g** (range 23.4–30.2 g, `ESTIMATED`).
  - Thermal conflict visible: **175°C vs 185°C (60 min)**.
  - 6-hour holding claim: Explicitly qualified as **LC family claim**, not exact SI-14+film+chicken validation.
  - Local sample alternative: **`C6-RO-P`** (E-ambalaj 729 tray + La Habibi lid, 1.15–1.29 RON/pair).
