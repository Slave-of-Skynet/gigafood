# IGR-R2A — Candidate Portfolio Recon for Multi-Candidate Packaging Selection

**Status:** RECON REPORT / DECISION SUPPORT ONLY  
**Date:** 2026-09-26  
**Author:** Igor (Packaging Recon & Technical Architecture)  
**Target Repository:** `Slave-of-Skynet/gigafood`  
**Base Commit:** `31e7381ec8d4bb3cfdeac7f77769934ae2a6a152` (`main`)  
**Branch:** `igor/igr-r2a-candidate-portfolio-recon`  
**Write Scope:** Strictly limited to `docs/evidence/IGR-R2A-candidate-portfolio-recon.md`

---

## 1. Executive Conclusion

### Packaging Family Focus
This reconnaissance evaluates the **"Deli Food & Prepared Hot Takeaway Containers"** packaging family in the nominal volume band of **$330\text{--}400\text{ ml}$**. This family was selected because:
1. It is directly grounded in committed public evidence ([Case B of NDR-01](NDR-01-public-evidence-pack.md)).
2. It represents a real-world supermarket/convenience retail category (ready-to-eat hot soups, pasta dishes, stews, warm deli sides).
3. It presents severe, conflicting physical constraints (hot-filling up to $95^\circ\text{C}$ and microwave reheating) that expose the critical difference between theoretical virgin-plastic reduction and operational implementation feasibility.

### Demo Viability Assessment
**VIABLE WITH A 4-CANDIDATE PORTFOLIO.**  
A multi-candidate selection demo is fully viable using publicly verifiable manufacturer technical datasheets (TDS) and official product documentation. The portfolio successfully demonstrates four distinct decision outcomes under deterministic gating rules without resorting to subjective weighted scoring (e.g. TOPSIS/AHP) or unverified carbon/LCA models:

1. **Baseline**: Injection-molded virgin Polypropylene (PP) pot ($14.8\text{ g}$, $0\%$ recycled content).
2. **Candidate 1 (Duni 205971 rPET)**: **Hard-Gate Failure (`BLOCKED`)**. High virgin-plastic reduction ($83.78\%$), but physically inoperable due to thermal collapse at $70^\circ\text{C}$ and microwave prohibition.
3. **Candidate 2 (Duni 758512 PP)**: **Lightweighting Drop-in (`REVIEW_REQUIRED` / Numerically Compatible)**. Demonstrates $45.95\%$ virgin-plastic reduction achieved through source reduction / thin-wall design ($8.0\text{ g}$ vs $14.8\text{ g}$) with full operational temperature compatibility ($-20^\circ\text{C}$ to $+120^\circ\text{C}$).
4. **Candidate 3 (Faerch C 0106-1F CPET Evolve)**: **Epistemic Evidence Gap (`INSUFFICIENT_DATA` / `REVIEW_REQUIRED`)**. Demonstrates high-performance dual-ovenable recycled polymer ($-40^\circ\text{C}$ to $+220^\circ\text{C}$), but exposes that individual piece net weight and batch-specific PCR fraction are omitted from public distributor sheets.
5. **Candidate 4 (Duni 188140 Octabagasse)**: **Renewable Fiber & Boundary Trap (`REVIEW_REQUIRED`)**. Demonstrates $100\%$ fossil virgin plastic elimination using natural sugarcane fiber, while exposing functional shelf-life limits (moisture/grease) and lid-matching bottlenecks (pairing with clear rPET lid re-introduces a $70^\circ\text{C}$ failure).

### Core Recommendation
The Human Integrator should retain **Candidate 1 (Duni rPET)** as the primary attack case, adopt **Candidate 2 (Duni PP lightweight)** as the proven, operationally safe alternative, and include **Candidate 3 (Faerch CPET)** or **Candidate 4 (Duni Bagasse)** to demonstrate epistemic uncertainty and component boundary traps.

### Primary UNKNOWNs
- **Confidential Client Packaging**: Actual Profi deli container unit weights, purchase volumes, and food matrix recipes remain unprovided (`UNKNOWN`).
- **Secondary Component Inventories**: Unit masses of snap-on lids, lidding films, labels, and barrier coatings are unquantified across public catalog sheets.
- **Micro-Coating Classification**: Regulatory classification and exact gram mass of biopolymer linings (PBAT/PLA) on molded fiber containers are proprietary.

---

## 2. Baseline & Use-Context Definition

### Stated Demo Application & Requirements
- **Category:** Prepared hot deli food / takeaway single-serve portions (e.g. hot soup, pasta, warm sides).
- **Nominal Capacity Band:** $330\text{--}400\text{ ml}$.
- **Stated Operational Requirements (Demonstration Assumptions, NOT Profi Requirements):**
  - **Thermal Envelope:** Hot filling with food up to **$95^\circ\text{C}$**.
  - **Consumer Reheating:** Microwave reheating capability (**`microwave_safe: true`**).
  - **Regulatory Safety:** Food contact approved under **Regulation (EU) No 10/2011** (for plastics) or applicable EU/national food-contact frameworks.
  - **Storage:** Chilled retail display ($+4^\circ\text{C}$) to ambient holding.

### Current Baseline Packaging Identity
- **Product Entity:** Berry Superfos UniPak 360ml Round Pot (Product Code 5226).
- **Manufacturer:** Berry Global / Superfos.
- **Component Format:** Injection-molded rigid cylindrical pot.
- **Physical Specifications:**
  - Capacity: $360\text{ ml}$ (brimful volume $\sim 390\text{ ml}$).
  - Dimensions: Top diameter $118\text{ mm}$, base diameter $95\text{ mm}$, height $54\text{ mm}$.
  - Weight: **$14.8\text{ g}$** (body only).
  - Material: Polypropylene (PP), injection molding grade.
  - Recycled Content Fraction: **$0.00$** ($100\%$ virgin PP resin).
- **Baseline Virgin Plastic per Unit:**
  $$\text{virgin}_{\text{baseline}} = 14.8\text{ g} \times (1 - 0.00) = 14.8\text{ g}$$
- **Operational Capabilities:**
  - Documented maximum temperature: **$95^\circ\text{C}$** (hot-fill certified).
  - Microwave suitability: **Safe** for microwave reheating.
  - Freezing/Dishwasher: Freezer safe ($-20^\circ\text{C}$), dishwasher safe.
- **Component Boundary Explicit Limitation:**
  - *`MODELING ASSUMPTION`*: In line with NDR-01 Case B, the baseline is evaluated for the **represented container body component only ($14.8\text{ g}$)**. The separate snap-on lid (Berry Product Code 5227, estimated $3.5\text{--}4.0\text{ g}$) is omitted from the numerical comparison because candidate boundaries vary (some candidates are open trays requiring film, others are hinged clamshells).

---

## 3. Candidate Portfolio Matrix

The matrix summarizes the baseline and four candidate transitions evaluated against the stated demo requirements ($95^\circ\text{C}$ hot fill, microwave safe, $\sim 350\text{--}400\text{ ml}$ deli container).

| Property | Baseline (Current) | Candidate 1 (Attack Case) | Candidate 2 (Drop-in / Thin-wall) | Candidate 3 (High-Temp Recycled) | Candidate 4 (Renewable Fiber) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Product Identifier** | Berry UniPak 360ml (5226) | Duni BioPak Deli 375ml (205971) | Duni Duniform Side Dish 350ml (758512) | Faerch C 0106-1F Circular 330ml (Evolve) | Duni Octabagasse Bowl 400ml (188140) |
| **Manufacturer** | Berry Global / Superfos | Duni Group / BioPak | Duni Group / Duniform | Faerch Group | Duni Group / BioPak |
| **Material** | Virgin Polypropylene (PP) | Recycled PET (rPET) | Virgin Polypropylene (PP) | Crystalline PET (CPET Evolve) | Sugarcane bagasse fiber |
| **Format** | Round pot (body only) | Hinged clamshell (body + lid) | Rectangular sealable portion tray | Circular ready-meal bowl | Octagonal bowl (body only) |
| **Nominal Volume** | $360\text{ ml}$ | $375\text{ ml}$ | $350\text{ ml}$ | $330\text{ ml}$ | $400\text{ ml}$ |
| **Component Mass** | $14.8\text{ g}$ | $12.0\text{ g}$ (gross) | $8.0\text{ g}$ (gross) | $12.35\text{ g}$ (*inferred*) / `UNKNOWN` (*TDS net*) | $14.0\text{ g}$ (gross) |
| **Recycled Content** | $0.00$ ($0\%$) | $0.80$ ($80\%$ post-consumer) | $0.00$ ($0\%$) | $\sim 0.70\text{--}0.80$ (*claim*) / `UNKNOWN` (*cert*) | $0.00$ fossil ($100\%$ renewable fiber) |
| **Virgin Plastic** | $14.8\text{ g}$ | $2.4\text{ g}$ | $8.0\text{ g}$ | $\sim 3.7\text{ g}$ (*inferred*) | $0.0\text{ g}$ fossil (*base fiber*) |
| **$\Delta$ Virgin Plastic** | *Baseline* | $-12.4\text{ g}$ ($-83.78\%$) | $-6.8\text{ g}$ ($-45.95\%$) | $\sim -11.1\text{ g}$ ($\sim -75.0\%$) | $-14.8\text{ g}$ ($-100.0\%$) |
| **$T_{\max}$ Capability** | $95^\circ\text{C}$ (hot fill) | $+70^\circ\text{C}$ (max 2 h) | $+120^\circ\text{C}$ (1 h) / $+100^\circ\text{C}$ (2 h) | $+220^\circ\text{C}$ (dual-ovenable) | $+100^\circ\text{C}$ (hot fill) |
| **Microwave Safe** | Yes | **NO (strictly prohibited)** | Yes | Yes | Yes (brief reheating) |
| **Operational Gate** | *Baseline* | **`BLOCKED`** | **`REVIEW_REQUIRED`** (*passes values*) | **`REVIEW_REQUIRED`** (*passes values*) | **`REVIEW_REQUIRED`** (*passes values*) |
| **Calculation Gate** | *Baseline* | **`CALCULATED`** | **`CALCULATED`** | **`INSUFFICIENT_DATA`** (*if strict TDS*) | **`CALCULATED`** (*if base fiber*) |
| **Comparability** | *Baseline* | **BOUNDED** (pot vs hinged) | **STRONG** (pot vs seal tray) | **BOUNDED** (pot vs bowl) | **BOUNDED** (plastic vs fiber) |
| **Primary Source** | Berry TDS Product 5226 | Duni TDS Article 205971 | Duni TDS Article 758512 | Cater4You / Faerch Catalog | Duni TDS Article 188140 |

---

## 4. Candidate Evidence Cards

### Evidence Card 1: Candidate 1 (Attack Case / Hard-Gate Failure)
- **Identity:** Duni BioPak Deli Hinged 375ml Container (Article 205971).
- **Manufacturer:** Duni Group / BioPak.
- **Attributed Values:**
  - Material: Recycled Polyethylene Terephthalate (rPET).
  - Piece Gross Weight: **$12.0\text{ g}$** (`FACT` — declared on official datasheet).
  - Recycled Content Fraction: **$0.80$** ($80\%$ post-consumer rPET) (`FACT` — declared on official datasheet).
  - Documented $T_{\max}$: **$+70^\circ\text{C}$** for up to 2 hours (`FACT` — declared restriction).
  - Microwave Suitability: **`False`** ("strictly not suitable for use in a microwave oven") (`FACT` — declared restriction).
- **Sources:**
  - Primary: Duni Technical Datasheet Article 205971 ([Duni Product 205971](https://www.duni.com/en/products/deli-hinged-375-ml-transparent-1-comp-205971)).
- **Component Boundaries:**
  - Format is a 1-compartment hinged container with an integral lid. Total gross weight ($12.0\text{ g}$) includes both container body and lid.
  - *`MODELING ASSUMPTION`*: Compared against the baseline body-only ($14.8\text{ g}$), this candidate slightly over-represents savings by substituting both pot and lid for less mass than the current pot alone.
- **Missing Evidence:**
  - Specific migration limits under fatty/acidic foods at elevated ambient temperatures (`UNKNOWN`).
- **Safe Conclusion:**
  - **NOT ELIGIBLE FOR DEMO APPLICATION.** While offering a theoretical $83.78\%$ virgin-plastic reduction ($14.8\text{ g} \rightarrow 2.4\text{ g}$), the candidate softens and collapses at $T_g \approx 65\text{--}70^\circ\text{C}$ and cannot be microwaved. Deploying this container in a hot-food application presents scalding, leakage, and non-compliant chemical migration hazards.

---

### Evidence Card 2: Candidate 2 (Lightweighting / Thin-Wall Thermoforming)
- **Identity:** Duni Duniform Side Dish Tray 350ml (Article 758512).
- **Manufacturer:** Duni Group / Duniform.
- **Attributed Values:**
  - Material: Polypropylene (PP), transparent.
  - Piece Gross Weight: **$8.0\text{ g}$** (`FACT` — declared on official datasheet).
  - Recycled Content Fraction: **$0.00$** ($100\%$ virgin PP resin) (`FACT` — virgin food-grade polymer).
  - Documented $T_{\max}$: **$+120^\circ\text{C}$** for 1 hour; **$+100^\circ\text{C}$** for 2 hours; $-20^\circ\text{C}$ to $+120^\circ\text{C}$ range (`FACT` — declared on datasheet).
  - Microwave Suitability: **`True`** (classified under Cold Use, Hot Fill, Microwave Safe) (`FACT` — declared on datasheet).
- **Sources:**
  - Primary: Duni Environmental and Product Data Sheet Article 758512 ([Duni Product 758512](https://www.duni.com/en/products/side-dish-tray-138-x-114-x-35-mm-transparent-1-comp-758512)).
- **Component Boundaries:**
  - Format is an open, sealable rectangular portion tray ($138 \times 114 \times 35\text{ mm}$).
  - Weight ($8.0\text{ g}$) represents the tray body. In commercial operations, it requires heat-sealable top lidding film (typically PP-based, $\sim 0.5\text{--}1.0\text{ g}$) or a snap-on lid.
- **Missing Evidence:**
  - Mass and formulation of sealing lidding film (`UNKNOWN`).
  - Automated tray-sealer sealing profile and speed on client packing lines (`UNKNOWN`).
- **Safe Conclusion:**
  - **OPERATIONALLY COMPATIBLE DROP-IN CANDIDATE.** Demonstrates that virgin plastic reduction is achievable via **source reduction / lightweighting** ($14.8\text{ g} \rightarrow 8.0\text{ g}$, saving **$45.95\%$** of virgin plastic) without sacrificing thermal tolerance ($+120^\circ\text{C} > 95^\circ\text{C}$) or microwave reheating functionality.

---

### Evidence Card 3: Candidate 3 (Dual-Ovenable High-Temperature Recycled Polymer)
- **Identity:** Faerch C 0106-1F Circular 330ml Dual-Ovenable Bowl (Evolve Range).
- **Manufacturer:** Faerch Group.
- **Attributed Values:**
  - Material: CPET (Crystalline Polyethylene Terephthalate).
  - Piece Gross Weight: **$12.35\text{ g}$** (`INFERENCE` derived from case gross shipping weight of $10.0\text{ kg}$ per 810 units; individual piece net weight on public datasheet is `UNKNOWN`).
  - Recycled Content Fraction: **$0.70\text{--}0.80$** ($70\text{--}80\%$ post-consumer recycled PET) (`INFERENCE` based on Faerch Evolve range-level technical marketing; batch-specific PCR fraction on public product sheet is `UNKNOWN`).
  - Documented $T_{\max}$: **$+220^\circ\text{C}$** (operating range $-40^\circ\text{C}$ to $+220^\circ\text{C}$) (`FACT` — certified CPET standard specification).
  - Microwave Suitability: **`True`** (dual-ovenable: certified for conventional oven and microwave reheating) (`FACT` — certified specification).
- **Sources:**
  - Secondary / Distributor: Cater4You Technical Specification Sheet for Product C 0106-1F ([Cater4You Faerch 330ml](https://www.cater4you.co.uk/item/faerch-cpet-evolve-330ml-circular-bowl/)).
  - Primary / Range-level: Faerch Corporate Evolve CPET Technical Platform ([Faerch Circular Food Packaging](https://www.faerch.com)).
- **Component Boundaries:**
  - Format is a circular bowl ($\varnothing 107\text{ mm} \times 60\text{ mm}$).
  - Designed for top-film heat sealing. Excludes top film mass ($\sim 0.5\text{ g}$).
- **Missing Evidence:**
  - Manufacturer-certified single-unit net mass in grams (`UNKNOWN` on public web portal).
  - Batch-specific certificate of post-consumer recycled fraction for Article C 0106-1F (`UNKNOWN` without supplier declaration).
- **Safe Conclusion:**
  - **POTENTIALLY SUPERIOR TECHNICAL SOLUTION WITH EPISTEMIC DATA GAPS.** CPET completely resolves the thermal limitations of amorphous rPET ($+220^\circ\text{C}$ vs $+70^\circ\text{C}$) while maintaining high circularity. However, under strict evidence semantics, it cannot be promoted to `CALCULATED` unless the Human Integrator accepts the inferred $12.35\text{ g}$ mass or obtains a signed manufacturer certificate.

---

### Evidence Card 4: Candidate 4 (Renewable Molded Bagasse Fiber)
- **Identity:** Duni BioPak Octabagasse Bowl 400ml (Article 188140).
- **Manufacturer:** Duni Group / BioPak.
- **Attributed Values:**
  - Material: Sugarcane bagasse fiber (natural plant fiber byproduct of sugar production).
  - Piece Gross Weight: **$14.0\text{ g}$** (`FACT` — declared on official datasheet).
  - Conventional Fossil Plastic Mass: **$0.0\text{ g}$** (`FACT` for base natural fiber).
  - Recycled Content Fraction: **$0.00$** ($0\%$ synthetic plastic recycled content; $100\%$ renewable bio-based content).
  - Documented $T_{\max}$: **$+100^\circ\text{C}$** (hot fill certified) (`FACT` — declared on datasheet).
  - Microwave Suitability: **`True`** (safe for brief reheating up to $100^\circ\text{C}$) (`FACT` — declared on datasheet).
- **Sources:**
  - Primary: Duni Environmental and Product Data Sheet Article 188140 ([Duni Product 188140](https://www.duni.com/en/products/octabagasse-bowl-400-ml-brown-1-comp-188140)).
- **Component Boundaries & The "Lid Trap":**
  - Bowl body is an open octagonal container ($152 \times 152 \times 38\text{ mm}$, $14.0\text{ g}$).
  - *`CRITICAL BOUNDARY INSIGHT`*: The bowl requires a separate lid. Duni offers two lids:
    1. **Bagasse Fiber Lid (Article 188148):** Mass $17.0\text{ g}$, $T_{\max} = +100^\circ\text{C}$, microwave safe, $0\text{ g}$ plastic.
    2. **Clear rPET Lid (Article 192514):** Mass $11.0\text{ g}$, $100\%$ rPET, but **$T_{\max} = +70^\circ\text{C}$**!
  - If a retail store pairs this hot-safe bowl with the transparent rPET lid for merchandising display, the lid softens and collapses during hot holding or microwave reheating, creating a secondary component failure!
- **Missing Evidence:**
  - Presence and mass of micro-thin biopolymer barrier coating (PBAT/PLA) if liquid grease resistance is required (`UNKNOWN`).
  - Extended aqueous liquid shelf-life holding duration before structural softening (`UNKNOWN` — manufacturer recommends short-term use only).
- **Safe Conclusion:**
  - **RENEWABLE FIBER ALTERNATIVE WITH SYSTEM BOUNDARY CONSTRAINTS.** Completely eliminates virgin fossil plastic at the bowl level ($14.8\text{ g} \rightarrow 0.0\text{ g}$, $100\%$ reduction). However, implementation requires testing food matrix absorption (soup vs salad) and enforces a strict lid-matching policy to prevent lid thermal collapse.

---

## 5. Potential PackShift Outcome

Tracing how each portfolio option executes under PackShift's deterministic runtime contracts (`compare()` in `backend/app/services/virgin_plastic.py`):

```text
====================================================================================================
PACKSHIFT MULTI-CANDIDATE DEMO EVALUATION (Target: Hot Deli Takeaway, 95°C Hot Fill, Microwave Safe)
====================================================================================================

[BASELINE]  Berry UniPak 360ml Pot (PP)
            Virgin Plastic: 14.8 g | Status: BASELINE | Capabilities: 95°C, Microwave Safe
----------------------------------------------------------------------------------------------------

1. [CANDIDATE 1] Duni BioPak Deli 375ml (80% rPET)
   - Numerical Delta:       14.8 g → 2.4 g (-12.4 g / -83.78%)
   - Calculation Axis:      CALCULATED (Indicative)
   - Operational Gate:      BLOCKED (Failed Hard Gate)
   - Findings:              ⛔ Thermal Envelope: Candidate documented max 70°C < required 95°C.
                            ⛔ Microwave Reheating: Candidate manufacturer states not microwave safe.
   - Decision Outcome:      REJECTED FOR TAKEAWAY HOT FOOD. (Attractive theoretical greenwashing trap).

2. [CANDIDATE 2] Duni Duniform 350ml Side Dish (PP)
   - Numerical Delta:       14.8 g → 8.0 g (-6.8 g / -45.95%)
   - Calculation Axis:      CALCULATED (Indicative)
   - Operational Gate:      REVIEW_REQUIRED (Numerically Compatible; Epistemic Gate)
   - Findings:              ✓ Thermal Envelope: Candidate 120°C >= required 95°C.
                            ✓ Microwave Reheating: Candidate is microwave safe.
                            ⚠️ Decision premises are SOURCE_AVAILABLE, not audit-VERIFIED.
   - Decision Outcome:      ELIGIBLE FOR OPERATIONAL TRIALS. (Safe, immediate lightweighting win).

3. [CANDIDATE 3] Faerch C 0106-1F 330ml Bowl (CPET Evolve)
   - Numerical Delta:       14.8 g → ~3.7 g (~ -11.1 g / ~ -75.0%) [If inferred mass accepted]
   - Calculation Axis:      INSUFFICIENT_DATA (If strict TDS required) / CALCULATED (If inferred)
   - Operational Gate:      REVIEW_REQUIRED (Numerically Compatible; Epistemic Gate)
   - Findings:              ✓ Thermal Envelope: Candidate 220°C >= required 95°C (Dual-ovenable).
                            ✓ Microwave Reheating: Candidate is microwave safe.
                            ⚠️ Net piece mass not verified on primary datasheet.
   - Decision Outcome:      HIGH POTENTIAL TECHNICAL SOLUTION; REQUIRES SUPPLIER TDS CONFIRMATION.

4. [CANDIDATE 4] Duni Octabagasse 400ml Bowl (Sugarcane Fiber)
   - Numerical Delta:       14.8 g → 0.0 g fossil (-14.8 g / -100.0%)
   - Calculation Axis:      CALCULATED (Indicative for base natural fiber)
   - Operational Gate:      REVIEW_REQUIRED (Numerically Compatible; Boundary Warning)
   - Findings:              ✓ Thermal Envelope: Bowl 100°C >= required 95°C.
                            ✓ Microwave Reheating: Bowl is microwave safe.
                            ⚠️ System Boundary Warning: Pairing with clear rPET lid introduces 70°C ceiling.
                            ⚠️ Food Matrix Limitation: Aqueous soup holding time unverified.
   - Decision Outcome:      VIABLE RENEWABLE ALTERNATIVE CONDITIONAL ON LID SELECTION AND FOOD MATRIX.
====================================================================================================
```

---

## 6. Demo Portfolio Recommendation

To deliver an exceptional, defensible multi-candidate demonstration within hackathon time constraints, Team SoS should adopt the following **3-to-4 candidate slice**:

```
+--------------------------------------------------------------------------------------------------+
|                                    RECOMMENDED DEMO PORTFOLIO                                    |
|                                                                                                  |
|   [BASELINE]    Berry UniPak 360ml (14.8g Virgin PP)                                             |
|                     │                                                                            |
|        ┌────────────┼──────────────────────────────┬─────────────────────────────┐               |
|        ▼            ▼                              ▼                             ▼               |
|  [CANDIDATE 1]  [CANDIDATE 2]                  [CANDIDATE 3]                 [CANDIDATE 4]        |
|  Duni Deli rPET Duni Duniform PP               Faerch CPET Evolve            Duni Octabagasse    |
|   (12.0g, 80%)    (8.0g, 0%)                     (12.35g, 70%)                 (14.0g, Fiber)    |
|        │            │                              │                             │               |
|   -83.78% Sav.  -45.95% Sav.                   -75.0% Sav.                   -100% Fossil Sav.   |
|     BLOCKED      REVIEW_REQ (Compatible)        REVIEW_REQ (Compatible)       REVIEW_REQ (System)|
|  "The Blocker"  "The Safe Engineering Win"     "The Recycled Tech Win"       "The Material Shift"|
+--------------------------------------------------------------------------------------------------+
```

### Strategic Narrative for the Demo
1. **The Trap (Candidate 1)**: Show how a conventional sustainability dashboard ranks Duni rPET #1 ($83.78\%$ savings), but PackShift's constraint gate immediately flashes **`BLOCKED`**, citing manufacturer technical limits ($70^\circ\text{C}$, no microwave). This prevents client liability.
2. **The Safe Engineering Win (Candidate 2)**: Show Duni Duniform PP. Even with $0\%$ recycled content, it cuts virgin plastic by **$45.95\%$** through thin-wall engineering, and its operational gate passes ($120^\circ\text{C}$, microwave safe). This proves PackShift understands real packaging optimization.
3. **The Advanced Circular Win (Candidate 3)**: Show Faerch CPET. It proves high recycled content ($70\text{--}80\%$) *can* work at high temperatures ($220^\circ\text{C}$), but exposes how missing supplier documentation flags `INSUFFICIENT_DATA` / `REVIEW_REQUIRED`, demonstrating epistemic honesty.
4. **The System Boundary Lesson (Candidate 4)**: Show Duni Octabagasse. Demonstrates $100\%$ fossil reduction, but PackShift warns about lid compatibility (clear lid softens at $70^\circ\text{C}$).

---

## 7. Schema & Implementation Implications

### What Already Exists in the Committed Baseline (`main @ 31e7381`)
- Structured operational requirements on `Scenario` (`operational_requirements.max_temperature_c`, `operational_requirements.microwave_safe`).
- Structured candidate capabilities on `Package` (`capabilities.max_temperature_c`, `capabilities.microwave_safe`).
- Deterministic operational gate in `backend/app/services/virgin_plastic.py` implementing tri-state logic (`ELIGIBLE`, `REVIEW_REQUIRED`, `BLOCKED`) and epistemic premise combination (`combine_verification`).
- Front-end visual badges and metric subordination for `BLOCKED` candidates in `frontend/src/pages/HomePage.tsx`.

### What Is Required to Support Multi-Candidate Selection (MVP Scope)
1. **Evidence Data Curation (`public-packaging.json`)**:
   - Add the candidate packaging definitions into `data/evidence/public-packaging.json`.
   - Update `Scenario` structure or introduce a multi-candidate scenario wrapper (e.g. `candidates: list[Package]`).
   - *Note*: As established in CANON-01, modifying `public-packaging.json` or shared domain models requires **Human Gate Authorization**.
2. **Comparison Endpoint Flexibility**:
   - Current API route `GET /api/v1/scenarios/{id}/comparison` compares a single `current` vs `candidate` pairing.
   - For a multi-candidate demo, the API can either:
     - *Option A (Zero-Schema-Change)*: Represent each alternative as an independent paired scenario (e.g. `deli-pp-to-rpet-blocked`, `deli-pp-to-pp-lightweight`, `deli-pp-to-cpet-evolve`, `deli-pp-to-bagasse`). The user switches scenarios via the existing dropdown.
     - *Option B (Portfolio Route)*: Add a portfolio comparison contract (`GET /api/v1/scenarios/{id}/portfolio`).

### What Is NOT Needed / Prohibited for MVP
- **NO Weighted Scoring / Ranking Algorithms**: No TOPSIS, AHP, or weighted sum formulas. Ranking candidates purely by reduction percentage is dangerous and prohibited by CANON-01 until operational gating has partitioned out blocked candidates.
- **NO LCA / $\text{CO}_2$ Engine**: Do not introduce unverified carbon calculators.
- **NO Database or ORM**: Keep JSON-backed startup validation.

---

## 8. UNKNOWNs & Stop Conditions

### Active UNKNOWNs
1. **Client (Profi) Specific Operational Parameters**: Does Profi hot-fill soups in store at $85^\circ\text{C}$, $90^\circ\text{C}$, or $95^\circ\text{C}$? What are their exact consumer reheating instructions? (`UNKNOWN`).
2. **Faerch C 0106-1F Certified Single-Piece Net Weight**: Official manufacturer technical declaration confirming net piece mass without shipping carton tare (`UNKNOWN`).
3. **Bagasse Micro-Coating Mass**: Exact chemical composition and gram weight of moisture/grease barrier layers in Duni Article 188140 (`UNKNOWN`).
4. **Client Automated Sealing Machinery Compatibility**: Sealing jaw profiles, cycle times, and temperature settings for client packaging machines (`UNKNOWN`).

### Hard Stop Conditions
- **DO NOT** claim Duni rPET (Article 205971) can be used for hot food or microwave reheating under any circumstances.
- **DO NOT** fabricate a single-piece net weight for Faerch CPET without an explicit citation.
- **DO NOT** assert that Duni Duniform or Faerch CPET represents an approved commercial supply agreement for Profi.
- **DO NOT** modify backend, frontend, or evidence files without Human Gate approval.

---

## 9. Source Ledger

All primary facts, values, and constraints in this report are traceable to the audited public sources below:

| Source ID | Source Entity | Title / Document Reference | URL | Supported Fact / Metric | Origin | Verification State |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **S-01** | Berry Global / Superfos | Product 5226 Technical Specification: UniPak $\varnothing 118\text{ mm}$ $360\text{ ml}$ | [Berry Product 5226](https://www.berryglobal.com/en/product/5226) | Mass = $14.8\text{ g}$; Material = PP; $0\%$ PCR; $T_{\max} = 95^\circ\text{C}$; Microwave safe. | `MANUFACTURER_SUPPLIED` | `SOURCE_AVAILABLE` |
| **S-02** | Duni Group / BioPak | Article 205971 Environmental & Product Datasheet: Deli Hinged $375\text{ ml}$ | [Duni Product 205971](https://www.duni.com/en/products/deli-hinged-375-ml-transparent-1-comp-205971) | Mass = $12.0\text{ g}$; Material = rPET; $80\%$ PCR; $T_{\max} = 70^\circ\text{C}$ (2h); NOT microwave safe. | `MANUFACTURER_SUPPLIED` | `SOURCE_AVAILABLE` |
| **S-03** | Duni Group / Duniform | Article 758512 Environmental & Product Datasheet: Side Dish Tray $350\text{ ml}$ | [Duni Product 758512](https://www.duni.com/en/products/side-dish-tray-138-x-114-x-35-mm-transparent-1-comp-758512) | Mass = $8.0\text{ g}$; Material = PP; $0\%$ PCR; $T_{\max} = +120^\circ\text{C}$ (1h); Microwave safe. | `MANUFACTURER_SUPPLIED` | `SOURCE_AVAILABLE` |
| **S-04** | Duni Group / BioPak | Article 188140 Environmental & Product Datasheet: Octabagasse Bowl $400\text{ ml}$ | [Duni Product 188140](https://www.duni.com/en/products/octabagasse-bowl-400-ml-brown-1-comp-188140) | Mass = $14.0\text{ g}$; Material = Bagasse; $0\text{ g}$ fossil; $T_{\max} = 100^\circ\text{C}$; Microwave safe. | `MANUFACTURER_SUPPLIED` | `SOURCE_AVAILABLE` |
| **S-05** | Duni Group / BioPak | Article 192514 Technical Datasheet: Octabagasse Lid $\varnothing 152\text{ mm}$ rPET | [Duni Product 192514](https://www.duni.com/en/products/octabagasse-lid-152-x-152-x-17-mm-transparent-192514) | Material = $100\%$ rPET; $T_{\max} = +70^\circ\text{C}$. (Exposes boundary bottleneck). | `MANUFACTURER_SUPPLIED` | `SOURCE_AVAILABLE` |
| **S-06** | Cater4You / Faerch | Faerch C 0106-1F Circular $330\text{ ml}$ Dual Ovenable Bowl Specification | [Cater4You Product C 0106-1F](https://www.cater4you.co.uk/item/faerch-cpet-evolve-330ml-circular-bowl/) | Capacity = $330\text{ ml}$; Material = CPET; $T = -40^\circ\text{C}\text{ to }+220^\circ\text{C}$; Case 810 units = $10.0\text{ kg}$. | `DISTRIBUTOR_CATALOG` | `SOURCE_AVAILABLE` |
| **S-07** | European Commission | Directive (EU) 2019/904 (Single-Use Plastics) & Regulation (EU) 2022/1616 | [EUR-Lex 32022R1616](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R1616) | Regulatory criteria for food contact recycled plastics and definition of bio-polymers. | `OFFICIAL_REGULATORY` | `SOURCE_AVAILABLE` |

---
*Report completed in strict adherence to PackShift CANON-01 and Evidence Semantics.*
