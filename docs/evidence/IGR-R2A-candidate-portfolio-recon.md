# IGR-R2A — Candidate Portfolio Recon: Faerch A/S Rigid Prepared-Food Trays

**Work Class:** CORE / RECON
**Owner:** Igor (Packaging Recon & Technical Architecture)
**Date:** 2026-09-26 (Europe/Bucharest)
**Target Repository:** `Slave-of-Skynet/gigafood`
**Base Commit:** `9beacfe2a58b29ff08906aa32a0cb4ec9e9da288` (`main`)
**Branch:** `igor/igr-r2a-review-packet`
**Write Scope:** Strictly limited to `docs/evidence/IGR-R2A-candidate-portfolio-recon.md`

> [!IMPORTANT]
> **EPISTEMIC BOUNDARY & ANTI-GREENWASHING MANDATE**
> This packet does not implement multi-candidate selection, does not change any shared contract, and does not certify food safety, migration, shelf life, line compatibility, legal compliance, procurement approval, or suitability for any named retailer.
> - `CALCULATED ≠ VERIFIED`
> - `SOURCE_AVAILABLE ≠ VERIFIED`
> - A missing value is not zero (`missing ≠ 0`)
> - Public evidence is not a provider requirement
> - Environmental benefit is not operational eligibility, and neither is implementation approval
> Where a decision-critical number is not on a source that applies to that specific article, the value is **`UNKNOWN`**. It is not estimated, interpolated, or assumed.

---

## 1. Executive Conclusion

### Packaging Family Focus
This reconnaissance investigates the **Faerch A/S rigid food tray family** in the prepared-food, ready-meal, and food-to-go category: single-compartment sealable rigid tray bodies where the flexible sealing film lid is separate and excluded from stated article masses.

### Demo Viability: Operational Constraints vs. Epistemic Integrity (Calculation Withheld)
- **Operational Demo:** **FULLY VIABLE.** Manufacturer technical datasheets (TDS) support verifiable article identities, nominal tray body masses, nominal volumes (on two of three articles), documented maximum service temperatures, and explicit cooking suitability fields.
- **Virgin-Plastic Ranking Demo:** **NOT DEFENSIVE FROM PUBLIC EVIDENCE ALONE (INTENTIONAL CALCULATION-WITHHELD SEAM).** Manufacturer datasheets for PET articles explicitly state that recycled-content percentages fluctuate year-to-year and direct the reader to contact Sales/Compliance for current recipe declarations.
- **Product Value:** This portfolio demonstrates PackShift's core strength: **Epistemic Integrity & Anti-Greenwashing Protection**. Rather than fabricating a 70% or 40% recycled content figure from high-level corporate press releases, PackShift's engine enforces independent axes: withholding calculation (**`INSUFFICIENT_DATA`**) on the calculation axis due to missing SKU-level evidence, while evaluating operational eligibility (**`REVIEW_REQUIRED`** or **`BLOCKED`**) strictly against documented capability versus requirements.

### Recommended MVP Portfolio (3 Articles)
A three-article portfolio is recommended over four. A fourth candidate (C 2187-1F) merely duplicates the APET temperature limitation without introducing a distinct decision outcome:

1. **Baseline — Faerch P 2226-1C (Item 2226014004):** Grey virgin Polypropylene (PP) tray, $26.29\text{ g} \pm 10\%$, $T_{\max} = 121^\circ\text{C}$, Cooking: *Microwave*. Family-scoped recycled content: $0\%$ (food-grade PP declared 100% virgin). Volume: `UNKNOWN`.
   *Reference Role: Serves as the current packaging baseline with calculable virgin plastic ($26.29\text{ g}$ tray body only under family claim). PackShift evaluates operational requirements against transition candidates, not the current baseline.*
2. **Candidate A — Faerch C 2200-1L (Item 2200012097):** Evolve CPET tray, $1000\text{ ml}$, $21.38\text{ g} \pm 10\%$, $T_{\max} = 220^\circ\text{C}$, Cooking: *Oven/Microwave*. Recycled-content fraction: `UNKNOWN` at SKU level.
   *Outcome: Numerically satisfies modeled temperature ($220^\circ\text{C} \ge 95^\circ\text{C}$) and microwave assumptions; calculation status is `INSUFFICIENT_DATA` (because SKU-level recycled-content fraction is unavailable); operational eligibility is `REVIEW_REQUIRED` (because decision-critical premises and source capabilities are not VERIFIED).*
3. **Candidate B (Operational Block under Demo Assumptions) — Faerch K 2182-1G (Item 2182015004):** Clear APET tray, $895\text{ ml}$, $21.48\text{ g} \pm 10\%$, $T_{\max} = 70^\circ\text{C}$, Cooking: *Not ovenable*. Recycled-content fraction: `UNKNOWN`.
   *Outcome: Operational eligibility is `BLOCKED` because documented $70^\circ\text{C} < \text{assumed } 95^\circ\text{C}$ demo requirement; calculation status is `INSUFFICIENT_DATA` (recycled-content fraction unavailable); microwave suitability remains `UNKNOWN`.*

### Core Takeaway
Freeze the decision story (Documented $70^\circ\text{C} < 95^\circ\text{C}$ demo mismatch $\rightarrow$ `BLOCKED`; Modeled operational fit with unverified premises $\rightarrow$ `REVIEW_REQUIRED`; Missing PCR input $\rightarrow$ `CALCULATION WITHHELD — INSUFFICIENT_DATA`). **Do NOT freeze fabricated virgin-plastic deltas for the PET articles.**

---

## 2. Baseline & Use-Context Definition

### 2.1 Stated Demonstration Use Context
The comparison context represents a single-portion prepared / ready-to-eat hot food item packed in a rigid sealable tray where consumer microwave reheating is expected.

| Requirement | Value Used | Epistemic Status | Boundary / What It Is NOT |
| :--- | :--- | :--- | :--- |
| **Maximum Service Temp** | **$95^\circ\text{C}$** | `MODELING ASSUMPTION` (Demo context) | Not a Profi requirement. Not a universal material limit. Not food-safety certification. |
| **Microwave Reheating** | **Required (`true`)** | `MODELING ASSUMPTION` (Demo context) | Not a provider requirement. Not a chemical migration test. |
| **Nominal Volume Class** | $\sim 0.7\text{--}1.0\text{ L}$ | `RESEARCH FRAME` | Not an automated client packaging line constraint. |
| **Component Scope** | **Tray body only** | `PUBLIC EVIDENCE` (TDS specification) | Not a closed complete pack. Sealing film mass is `UNKNOWN`. |

Under these stated demonstration requirements:
- Documented $T_{\max} < 95^\circ\text{C}$ constitutes an operational constraint violation (**`BLOCKED`**) against the assumed $95^\circ\text{C}$ requirement.
- Documented $T_{\max} \ge 95^\circ\text{C}$ is **numerically sufficient** on that isolated dimension, but leaves operational eligibility as **`REVIEW_REQUIRED`** because the demo requirements are unverified assumptions.
- Meeting the operational threshold does **not** certify sealing integrity, shelf life, or food-contact migration compliance under specific food matrices.

### 2.2 Baseline Article Specification
- **Product Entity:** Faerch P 2226-1C Rectangular 1-Compartment Tray.
- **Item Number:** `2226014004` (EAN: `5023262137517`).
- **Material Recipe:** Polypropylene (PP), grey, recipe number `9626`.
- **Datasheet Source:** Faerch A/S Technical Product Sheet dated `07-09-2021` (European DD-MM-YYYY notation).
- **Physical Dimensions:** Length $227.0\text{ mm}$, Width $177.0\text{ mm}$, Depth $49.0\text{ mm}$ (tolerances $\pm 0.8\text{ mm}$).
- **Nominal Gauge:** $650\text{ }\mu\text{m}$.
- **Nominal Piece Mass:** **$26.29\text{ g}$** (tolerance $\pm 10\%$, tray body only).
- **Nominal Volume:** **`UNKNOWN`** (omitted from the manufacturer product sheet).
- **Operational Capabilities:**
  - Temperature Range: **$-20^\circ\text{C}$ to $+121^\circ\text{C}$** ($T_{\max} = 121^\circ\text{C}$).
  - Cooking Suitability: **`Microwave`** (explicitly affirmed).
  - NIR Detectable: `No` (carbon black / grey pigment).
- **Recycled Content Provenance:**
  - Article block does not state recycled content.
  - Live Faerch PP Material Platform explicitly states: *"PP is made from 100% virgin material"* and *"Food-grade PP must be produced from 100% virgin material, forming the essential first stage in the PP recycling chain."*
  - *Epistemic status:* Classified as `MANUFACTURER_SUPPLIED` / `SOURCE_AVAILABLE` with scope `FAMILY_CLAIM` (applies to Faerch food-grade PP class), **NOT** a third-party audited batch lot certificate.

### 2.3 Component Boundary & Mass Asymmetry
- **Included:** Nominal weight of the thermoformed rigid tray body only as declared on the manufacturer sheet.
- **Excluded / `UNKNOWN`:** Flexible top sealing film and snap-on lids. No paired film article number, film mass, or film polymer formulation is disclosed on the tray datasheets.
- **Manufacturing Tolerance:** $\pm 10\%$ on nominal weight. Figures reported are printed nominals, not measured samples.
- **Critical Comparison Rule:** A comparison of these masses is strictly a **tray-body comparison**. It is not a complete-package comparison.

---

## 3. Epistemic Rules (Faerch Evidence Invariants)

To prevent greenwashing and algorithmic hallucinations, the recon strictly enforces the following seven rules:

1. **"Up to 70%" $\neq 70\%$:** Faerch's corporate press release states the Evolve ready-meal recipe *"allows for up to 70% post-consumer recycled content"*. This is an engineering ceiling, not a point value or guaranteed minimum. It must **not** be ingested as $0.70$.
2. **"Minimum 40% Tray rPET" $\neq$ Total PCR:** Faerch's 2025 UK/Ireland chilled ready-meal commitment guarantees *"a minimum of 40% Tray rPET"*. Tray rPET is a specific circular metric (tray-to-tray recyclate), distinct from total post-consumer content (which includes bottle rPET). It must **not** be ingested as a $0.40$ total recycled content fraction.
3. **"Not Ovenable" $\neq$ "Not Microwaveable":** On APET sheets (K 2182-1G), the cooking field states *"Not ovenable"*. This denies conventional oven use; it does **not** assert whether microwave reheating is safe or unsafe. Microwave suitability remains **`UNKNOWN`**.
4. **"100% RECYCLABLE" $\neq 100\%$ Recycled Content:** Product sheets printing *"YES — 100% RECYCLABLE"* declare theoretical recyclability in collection streams, not post-consumer resin content.
5. **Historical 2021 Recipe Bands Do Not Apply to 2023/2025 SKUs:** The 2021 datasheet appendix listed historical recipe bands (e.g. CPET Standard 69–75% PCR). Current 2023 and 2025 sheets explicitly state that recycled PET content fluctuates and instruct the buyer to contact Sales/Compliance for the current figure. Applying 2021 bands to recipe `6811` or `7900` is invalid.
6. **Component Boundary Isolation:** All Faerch masses represent **tray body only**. Top sealing film mass and film polymer composition are unquantified (`UNKNOWN`).
7. **PP Baseline Recycled Content is Family-Scoped:** $0\%$ recycled content for P 2226-1C is grounded in Faerch's published policy on food-grade PP, not a lot-specific test certificate.

---

## 4. Comparability Classification Framework

- **STRONG:** Same manufacturer system, identical packaging format (open sealable tray body), identical component boundary, nominal capacity matched within $\pm 15\%$, intended use aligned, and all decision-critical inputs sourced at the specific SKU level.
- **BOUNDED / WITH QUALIFIER:** Same packaging family and component boundary, but constrained by an explicit qualifier: nominal capacity unknown or differing $> 15\%$, evidence dates differing, or inputs sourced at the family level rather than SKU level.
- **WEAK:** Same broad job, but structural format differs (e.g. hinged clamshell vs. separate open tray), material class differs substantially, or secondary components are missing.
- **NOT COMPARABLE:** Asymmetric component boundaries presented as like-for-like (e.g. comparing a complete closed container including lid against an open tray body).

---

## 5. Candidate Portfolio Matrix

`UNKNOWN` denotes that the primary source governing that specific SKU does not publish the value. No cell contains an assumed number.

| Candidate ID | Product & Item Number | Material & Recipe | Nominal Capacity | Mass Scope | Recycled Content Fraction | $T_{\max}$ Capability | Microwave Suitability | Comparability Rating | Evidence & Gate Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Baseline** | Faerch P 2226-1C<br>`2226014004` | Polypropylene (PP)<br>Grey · Recipe `9626` | **`UNKNOWN`**<br>($227 \times 177 \times 49\text{ mm}$) | Body only<br>**$26.29\text{ g}$** ($\pm 10\%$) | **$0.00$ ($0\%$)**<br>`FAMILY_CLAIM`<br>Food-grade PP virgin | **$+121^\circ\text{C}$**<br>(TDS stated) | **Yes**<br>Cooking: *Microwave* | **BOUNDED**<br>(Volume unknown; body only) | Sheet read (2021).<br>Role: **Reference Baseline**<br>Calc: **`CALCULATED`** (body) |
| **Candidate A** | Faerch C 2200-1L<br>`2200012097` | CPET Evolve<br>Recipe `6811` | **$1000\text{ ml}$**<br>($200 \times 155 \times 47\text{ mm}$) | Body only<br>**$21.38\text{ g}$** ($\pm 10\%$) | **`UNKNOWN`**<br>(TDS defers to current declaration) | **$+220^\circ\text{C}$**<br>(TDS stated) | **Yes**<br>Cooking: *Oven/Microwave* | **BOUNDED**<br>(Capacity known here, not in baseline) | Sheet read (2023).<br>Eligibility: **`REVIEW_REQUIRED`** (unverified premises)<br>Calc: **`INSUFFICIENT_DATA`** |
| **Candidate B** | Faerch K 2182-1G<br>`2182015004` | APET Clear<br>Recipe `7900` | **$895\text{ ml}$**<br>($180 \times 100 \times 76\text{ mm}$) | Body only<br>**$21.48\text{ g}$** ($\pm 10\%$) | **`UNKNOWN`**<br>(2025 TDS defers to current declaration) | **$+70^\circ\text{C}$**<br>(TDS stated) | **`UNKNOWN`**<br>*Not ovenable* $\neq$ not microwaveable | **BOUNDED**<br>(Dimensions differ; close volume to A) | Sheet read (2025).<br>Eligibility: **`BLOCKED`** (doc $70^\circ\text{C} < \text{assumed } 95^\circ\text{C}$)<br>Calc: **`INSUFFICIENT_DATA`** |

*Supporting Reference Article (Not recommended as 4th demo state):*
- **Faerch C 2187-1F (Item 2187015044):** Clear APET, $685\text{ ml}$, $16.93\text{ g} \pm 10\%$, Recipe `7900`, $T_{\max} = 70^\circ\text{C}$, Cooking: *Not ovenable*, Recycled fraction: `UNKNOWN`. Sheet date: 16-12-2021. Corroborates APET thermal limits, but introduces no distinct decision state.

---

## 6. Candidate Evidence Cards

### 6.1 Baseline — Faerch P 2226-1C Grey PP Tray
- **Identity:** Faerch A/S, Rasmus Færchs Vej 1, DK-7500 Holstebro. Article: `P 2226-1C`, Item: `2226014004`, EAN: `5023262137517`. Rectangular single-compartment grey PP tray, recipe `9626`. Sheet date: `07-09-2021`.
- **Supported Values (from Datasheet):** Length $227.0\text{ mm}$, Width $177.0\text{ mm}$, Depth $49.0\text{ mm}$ ($\pm 0.8\text{ mm}$). Nominal gauge: $650\text{ }\mu\text{m}$. Nominal piece weight: **$26.29\text{ g}$** ($\pm 10\%$). Cooking: **`Microwave`**. Temperature range: **$-20^\circ\text{C}$ to $+121^\circ\text{C}$**. NIR detectable: `No`.
- **Recycled Content Evidence:** Sourced from live Faerch PP Material Platform: *"PP is made from 100% virgin material"* and *"Food-grade PP must be produced from 100% virgin material"*. Scoped to Faerch food-grade PP class; not an audited SKU lot certificate.
- **Missing Evidence:** Nominal volume (`UNKNOWN`). Intended food matrix (`UNKNOWN`). Sealing film identity, mass, and recycled content (`UNKNOWN`).
- **Comparability:** **BOUNDED / WITH QUALIFIER**. Same manufacturer and body-only boundary, but baseline volume is unstated on the sheet. Grey color is stated NIR non-detectable (recyclability limitation, not modeled as a score).
- **Safe Conclusion:** Serves as the current reference baseline. Documented capabilities ($121^\circ\text{C}$, microwave affirmed) align with the assumed demo context. Virgin plastic for the tray body is `CALCULATED` under the family claim ($26.29\text{ g}$). (PackShift evaluates operational requirements against transition candidates, not the reference baseline). It is not a complete-pack verification.

---

### 6.2 Candidate A — Faerch C 2200-1L Evolve CPET Tray
- **Identity:** Faerch A/S. Article: `C 2200-1L`, Item: `2200012097`, EAN: `5703969041835`. Rectangular single-compartment tray, color Evolve, material CPET, recipe `6811`. Sheet date: `09-01-2023`. Cooking: **`Oven/Microwave`**.
- **Supported Values (from Datasheet):** Length $199.9\text{ mm}$, Width $154.8\text{ mm}$, Depth $47.1\text{ mm}$ ($\pm 0.6\text{ mm}$). Nominal volume: **$1000\text{ ml}$**. Sheet thickness: $550\text{ }\mu\text{m}$. Nominal piece weight: **$21.38\text{ g}$** ($\pm 10\%$). Temperature range: **$-40^\circ\text{C}$ to $+220^\circ\text{C}$**. NIR detectable: `Yes`. Recyclable: `YES`.
- **Recycled Content Evidence:** **`UNKNOWN` at SKU level.** The datasheet explicitly states recycled PET content fluctuates annually and directs the customer to contact Sales/Compliance for the current declaration for recipe `6811`.
- **Prohibited Substitutions:**
  - *Do NOT use "up to 70%":* Corporate press release (20-11-2024) cites "up to 70%" as a recipe ceiling, not an article point value.
  - *Do NOT use "minimum 40% Tray rPET":* 2025 launch applies specifically to UK/Ireland chilled ready-meal CPET; Tray rPET is not total PCR fraction.
  - *Do NOT use 2021 historical bands (69–75%):* Historical table does not cite recipe `6811`.
- **Comparability:** **BOUNDED / WITH QUALIFIER**. Nominal volume ($1000\text{ ml}$) is known here, unlike the baseline.
- **Safe Conclusion:** Numerically satisfies modeled operational constraints ($220^\circ\text{C} \ge 95^\circ\text{C}$, dual-ovenable/microwave affirmed). Because decision-critical premises and source capabilities are not VERIFIED, operational eligibility is **`REVIEW_REQUIRED`** (not ELIGIBLE). Because SKU-level recycled-content fraction is unavailable on the TDS, calculation status is **`INSUFFICIENT_DATA`** (`CALCULATION WITHHELD — INSUFFICIENT_DATA`). Calculation remains `INSUFFICIENT_DATA` until a numeric recycled-content fraction applicable to this SKU is supplied with provenance. PackShift must not calculate or present an unverified virgin-plastic reduction.

---

### 6.3 Candidate B — Faerch K 2182-1G Clear APET Tray
- **Identity:** Faerch A/S. Article: `K 2182-1G`, Item: `2182015004`, EAN: `5703969013399`. Rectangular single-compartment tray, clear APET, recipe `7900`. Sheet date: `25-06-2025`. Cooking: **`Not ovenable`**.
- **Supported Values (from Datasheet):** Length $180.1\text{ mm}$, Width $99.9\text{ mm}$, Depth $75.9\text{ mm}$ ($\pm 0.6\text{ mm}$). Nominal volume: **$895\text{ ml}$**. Sheet thickness: $900\text{ }\mu\text{m}$. Nominal piece weight: **$21.48\text{ g}$** ($\pm 10\%$). Temperature range: **$-40^\circ\text{C}$ to $+70^\circ\text{C}$**. NIR detectable: `Yes`. Recyclable: `YES`.
- **Recycled Content Evidence:** **`UNKNOWN` at SKU level.** The 2025 datasheet repeats the requirement to request current recipe figures. General claims that "the majority of APET contains rPET" do not establish an article percentage.
- **Operational Constraint Assessment:**
  - $T_{\max} = \mathbf{+70^\circ\text{C}}$: Mismatch against the assumed demo requirement of $95^\circ\text{C}$ (documented $70^\circ\text{C} < \text{assumed } 95^\circ\text{C}$).
  - Cooking field *"Not ovenable"*: Disallows conventional ovens; microwave suitability remains **`UNKNOWN`**.
- **Comparability:** **BOUNDED / WITH QUALIFIER**. Volume ($895\text{ ml}$) is within $10.5\%$ of Candidate A ($1000\text{ ml}$), but footprint and depth differ.
- **Safe Conclusion:** Operational eligibility is **`BLOCKED`** because documented $70^\circ\text{C} < \text{assumed } 95^\circ\text{C}$ demo requirement. This operational block is strictly bounded to the stated demo context and does not constitute a universal verdict on APET packaging. Calculation status is independently **`INSUFFICIENT_DATA`** due to unstated recycled content.

---

## 7. Potential PackShift Runtime Outcomes

Tracing execution through PackShift's deterministic runtime contracts:

```text
====================================================================================================
FAERCH A/S PREPARED-FOOD PORTFOLIO: DEMO OUTCOMES (Stated Context: Assumed 95°C, Microwave Safe)
====================================================================================================

[BASELINE]  Faerch P 2226-1C PP Tray (Item 2226014004) — Current Reference Package
            Mass: 26.29 g | Recycled: 0% (Family claim) | Virgin Plastic: 26.29 g (Body only)
            Capabilities: 121°C, Microwave Safe
            --> REFERENCE BASELINE: CALCULATION: CALCULATED (Body only)

----------------------------------------------------------------------------------------------------

1. [CANDIDATE A] Faerch C 2200-1L CPET Evolve (Item 2200012097)
   - Operational Capabilities:  220°C (>= 95°C), Microwave: Oven/Microwave affirmed
   - Eligibility Axis Status:   REVIEW_REQUIRED (Unverified demo premises and source capabilities)
   - Recycled Content Fraction: UNKNOWN (Datasheet withholds annual fluctuating figure)
   - Calculation Axis Status:   INSUFFICIENT_DATA (Missing required PCR input)
   --> PACKSHIFT VERDICT:       CALCULATION WITHHELD — INSUFFICIENT_DATA | Eligibility: REVIEW_REQUIRED.
                                Numerically satisfies modeled temperature and microwave assumptions,
                                but eligibility requires review and calculation cannot proceed
                                without a current SKU-level numeric recycled-content value.

2. [CANDIDATE B] Faerch K 2182-1G APET Clear (Item 2182015004)
   - Operational Capabilities:  70°C (documented), Microwave: UNKNOWN ("Not ovenable")
   - Eligibility Axis Status:   BLOCKED (Documented 70°C < assumed 95°C demo requirement)
   - Recycled Content Fraction: UNKNOWN
   - Calculation Axis Status:   INSUFFICIENT_DATA
   --> PACKSHIFT VERDICT:       Eligibility: BLOCKED | Calculation: INSUFFICIENT_DATA.
                                Documented thermal envelope is incompatible with the stated
                                95°C demo requirement. Calculation is independently INSUFFICIENT_DATA.
====================================================================================================
```

---

## 8. Environmental Calculation Truth Table

Under the protected formula:
$$\text{virgin\_plastic} = \text{plastic\_mass\_g} \times (1 - \text{recycled\_content\_fraction})$$

### 8.1 What Can Be Calculated
- **Baseline Tray Body (P 2226-1C):**
  $$\text{virgin}_{\text{body}} = 26.29\text{ g} \times (1 - 0.00) = \mathbf{26.29\text{ g}}$$
  *(Applying the $\pm 10\%$ datasheet mass tolerance yields a nominal band of $23.661\text{ g}$ to $28.919\text{ g}$. Does not include sealing film).*

### 8.2 What MUST NOT Be Calculated
- **No Virgin Plastic for Candidate A (C 2200-1L):** Mass ($21.38\text{ g}$) is known, but recycled content is `UNKNOWN`. Substituting $0.70$ or $0.40$ is prohibited.
- **No Virgin Plastic for Candidate B (K 2182-1G):** Mass ($21.48\text{ g}$) is known, but recycled content is `UNKNOWN`.
- **No Transition Deltas:** Transition delta ($\Delta_{\text{reduction}}$) cannot be computed because candidate virgin plastic is `UNKNOWN`, baseline volume is `UNKNOWN`, and sealing film is omitted across all articles.

---

## 9. Demo Portfolio Recommendation

### Smallest Coherent Set
Deploy the **3-article Faerch set** (Baseline P 2226-1C, Candidate A C 2200-1L, Candidate B K 2182-1G).

### Distinct Demonstration Roles
1. **Baseline (P 2226-1C):** Establishes the operational benchmark ($121^\circ\text{C}$, microwave safe) with a calculable virgin baseline for the tray body.
2. **Candidate A (C 2200-1L — Epistemic Rigor / Calculation Withheld):** Shows a modern CPET tray that numerically satisfies modeled thermal and microwave assumptions ($220^\circ\text{C}$, dual-ovenable), but PackShift visibly withholds calculation (`INSUFFICIENT_DATA`) and flags operational eligibility as `REVIEW_REQUIRED` because the TDS withholds the fluctuating PCR fraction and demo premises are unverified. This proves PackShift separates operational eligibility from environmental calculation and refuses to fabricate green claims.
3. **Candidate B (K 2182-1G — Operational Block under Demo Context):** Shows a clear APET tray cleanly blocked by the thermal gate (documented $70^\circ\text{C} < \text{assumed } 95^\circ\text{C}$ demo requirement), proving the constraint engine prevents recommending a candidate whose documented thermal envelope is incompatible with the stated 95°C demo requirement.

---

## 10. Schema & Implementation Implications

### 10.1 Supported by Existing Architecture (`main @ 9beacfe`)
- Independent calculation axis (`CALCULATED` vs `INSUFFICIENT_DATA`) and eligibility axis (`ELIGIBLE`, `REVIEW_REQUIRED`, `BLOCKED`).
- Bounded operational gate comparing `operational_requirements` on `Scenario` against `capabilities` on `Package`.
- Refusal to compute deltas on missing numeric inputs without fabricating operational blocks or falsifying eligibility.

### 10.2 Future API Anti-Hallucination Contracts (Recommended for Integrator)
When multi-candidate schemas are formally drafted, the domain model should introduce four explicit guards:

1. **`component_boundary: Literal["TRAY_BODY_ONLY", "BODY_AND_FILM", "HINGED_COMPLETE_PACK"]`:** Prevents comparing open tray bodies against complete closed containers without qualification.
2. **`recycled_content_scope: Literal["TOTAL_PCR", "TRAY_RPET", "MASS_BALANCE_ALLOCATION"]`:** Distinguishes total post-consumer content from tray-to-tray recyclate (CIRPET+) or chemical recycling mass balance.
3. **`recycled_content_is_range_or_minimum: bool`:** Blocks marketing ceilings (e.g. "up to 70%") or regulatory minima (e.g. "minimum 40%") from being ingested as point values.
4. **`evidence_date: str`:** Records the issuance date of the recipe declaration, since manufacturer PCR formulations fluctuate annually. Dates should follow ISO 8601 (`YYYY-MM-DD`) notation to harmonize with A1 evidence standards, while noting that raw manufacturer datasheets may use European format (`DD-MM-YYYY`).

### 10.3 Prohibited for MVP
- Do not introduce ranking algorithms (TOPSIS, AHP, weighted scores).
- Do not introduce carbon / LCA scoring engines.
- Do not add complex oven or dishwasher gates; operational dimensions remain strictly maximum temperature and microwave suitability.

---

## 11. UNKNOWNs & Stop Conditions

| Item / Parameter | Why It Precludes a Decision Claim | Stop Action |
| :--- | :--- | :--- |
| **Current PCR for Recipe `6811` (C 2200-1L)** | Sheet withholds value and states it fluctuates annually. "Up to 70%" is an unverified ceiling. | **STOP:** Do not calculate virgin plastic or delta. |
| **Current PCR for Recipe `7900` (K 2182-1G)** | 2025 sheet withholds value. 2021 historical tables do not cite recipe `7900`. | **STOP:** Do not calculate virgin plastic. |
| **UK/IE Jan 2025 40% Tray rPET Applicability** | Launch does not name item `2200012097`. Metric is Tray rPET, not total PCR. | **STOP:** Do not store $0.40$ as PCR fraction. |
| **Baseline Nominal Volume (P 2226-1C)** | Volume is unprinted on the manufacturer product sheet. | **QUALIFIER:** Capacity matching is bounded. |
| **Sealing Film Mass & Composition** | Film lid is not included in the weighed article on any sheet. | **STOP:** Comparison limited to tray body only. |
| **Microwave Suitability for K 2182-1G** | *"Not ovenable"* denies conventional oven; does not determine microwave. | **QUALIFIER:** Microwave field remains `UNKNOWN`. |
| **Chemical Migration & Food Contact Testing** | Product sheets reference framework compliance, but specific migration under client food matrices requires lab DoC. | **STOP:** Do not issue compliance verdicts. |

---

## 12. Considered and Excluded Packaging

- **ILIP Hinged Deli rPET:** Offers complete hinged packs ($23.5\text{ g}$, $1000\text{ ml}$), but mixes packaging formats (hinged clamshell vs. Faerch open sealable tray body). Excluded to preserve format consistency.
- **Sabert BePulp Molded Bagasse:** Bagasse bowls offer high heat resistance, but exact biopolymer lining mass (PBAT/PLA) is unquantified on public sheets, creating an unevidenced plastic mass boundary. Excluded.
- **Faerch Meat Trays (MAPET / Evolve Meat):** High recycled content declarations exist for fresh meat packaging (e.g. Danish Crown, Norfersk), but belong to a different packaging family. Excluded.
- **Faerch C 2187-1F (APET $685\text{ ml}$):** Corroborates the $70^\circ\text{C}$ APET ceiling, but adds no new decision outcome. Excluded from MVP to prevent redundancy.
- **Distributor / Retailer Listings:** Third-party retail websites claiming "85% recycled" or "230°C max" were rejected as weaker sources that conflict with Faerch's official TDS ($220^\circ\text{C}$).

---

## 13. Source Ledger

Decision-critical facts are traced to manufacturer-authored product sheets and official corporate sources, with provenance and limitations recorded below.

| Source ID | Source Entity | Title / Document Reference | Source URL | Key Attributed Facts | Scope / Limitations | Source Class |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **S1** | Faerch A/S | Product Sheet: C 2200-1L (Item `2200012097`), Date: `09-01-2023` | [Dayton Host: C 2200-1L PDF](https://verkkokauppa.daytongroup.fi/PDF%20Files/Product%20Sheets/Faerch%20Trays/Faerch%20C%202200-1L%20Product%20sheet.pdf) | $1000\text{ ml}$; $21.38\text{ g} \pm 10\%$; Recipe `6811`; $-40^\circ\text{C}$ to $220^\circ\text{C}$; Cooking: *Oven/Microwave*; PCR withheld. | Tray body only. Sealing film excluded. | Primary (Distributor-hosted) |
| **S2** | Faerch A/S | Product Sheet: K 2182-1G (Item `2182015004`), Date: `25-06-2025` | [HC Host: K 2182-1G PDF](https://www.hc.dk/.0/pp-static/prodimages/Datablade/datablad_140380.pdf) | $895\text{ ml}$; $21.48\text{ g} \pm 10\%$; Recipe `7900`; $-40^\circ\text{C}$ to $70^\circ\text{C}$; Cooking: *Not ovenable*; PCR withheld. | Tray body only. Microwave is unstated. | Primary (Distributor-hosted) |
| **S3** | Faerch A/S | Product Sheet: C 2187-1F (Item `2187015044`), Date: `16-12-2021` | [Dayton Host: C 2187-1F PDF](https://verkkokauppa.daytongroup.fi/PDF%20Files/Faerch%20C%202187-1F%20spec%20sheet.pdf) | $685\text{ ml}$; $16.93\text{ g} \pm 10\%$; Recipe `7900`; $T_{\max} = 70^\circ\text{C}$; "100% RECYCLABLE" $\neq$ recycled. | Supporting article only. | Primary (Distributor-hosted) |
| **S4** | Faerch A/S | Product Sheet: P 2226-1C (Item `2226014004`), Date: `07-09-2021` | [Bunzl IE Host: 152407 PDF](https://www.bunzlireland.ie/medias/sys_master/root/h46/h1b/8888294604830/152407-SPECS.pdf) | $26.29\text{ g} \pm 10\%$; $227 \times 177 \times 49\text{ mm}$; Recipe `9626`; $-20^\circ\text{C}$ to $121^\circ\text{C}$; Cooking: *Microwave*. | Tray body only. Volume unstated. | Primary (Distributor-hosted) |
| **S5** | Faerch A/S | Live PP Material Platform | [Faerch PP Ready Meals](https://www.faerch.com/en/products/ready-meals/pp) | "PP is made from 100% virgin material"; "Food-grade PP must be produced from 100% virgin material". | Family-scoped statement. Not lot certificate. | Primary (Live official page) |
| **S6** | Faerch A/S | Live CPET Material Platform | [Faerch CPET Ready Meals](https://www.faerch.com/en/products/ready-meals/cpet) | CPET temperature range $-40^\circ\text{C}$ to $220^\circ\text{C}$; freezer-to-oven and freezer-to-microwave. | Material class capabilities. | Primary (Live official page) |
| **S7** | Faerch A/S | Press Release: Chilled Ready Meal Trays Minimum 40% Tray rPET (20-11-2024) | [Faerch Launch Nov 2024](https://www.faerch.com/en/faerch-launches-chilled-ready-meal-trays-with-minimum-40-tray-rpet-content) | Evolve recipe allows "up to 70% post-consumer content"; Jan 2025 UK/IE launch min 40% Tray rPET. | Launch scope. Tray rPET $\neq$ total PCR. | Primary (Live official page) |
| **S8** | Faerch A/S | Product Sheet Appendix (07-09-2021): Historical PET PCR Bands | [Bunzl IE Host: 152408 PDF](https://www.bunzlireland.ie/medias/sys_master/root/h56/hbb/8888294670366/152408-SPECS.pdf) | Historical named-recipe bands (CPET Standard 69–75% PCR). Not mapped to current recipe `6811` or `7900`. | Historical reference only. Not applied to SKUs. | Primary (Historical datasheet) |

---

### Review & Sign-Off Ledger
| Role | Status | Notes |
| :--- | :--- | :--- |
| **Packaging Recon (Igor)** | `SUBMITTED` | Candidate portfolio verified against primary TDS sources. |
| **Project Core / Integrator** | `PENDING_REVIEW` | Operational gate & anti-greenwashing calculation withheld audit. |

---
*Report updated and certified under PackShift CANON-01 Epistemic and Evidence Guidelines.*
