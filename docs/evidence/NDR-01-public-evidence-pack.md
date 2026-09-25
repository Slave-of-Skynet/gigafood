# NDR-01 — PackShift Public Evidence Pack v1

## Executive Summary & Boundary

This evidence pack establishes the first publicly verifiable dataset for PackShift, replacing synthetic illustrative fixtures with traceable packaging specifications sourced from corporate sustainability/green finance reports and manufacturer technical datasheets.

Profi confirmed that proprietary internal packaging data will not be provided due to confidentiality. In accordance with NDR-01 guidelines:
- All figures are derived strictly from public manufacturer documentation and official regulatory references.
- No Profi data has been fabricated or assumed.
- Dataset kind is set to `PUBLIC` with an explicit disclosure:
  > *PUBLIC-EVIDENCE DEMO DATA — NOT PROFI PROVIDER DATA. Candidate comparisons are decision-support examples, not implementation approvals.*
- Strict adherence to PackShift semantics: `CALCULATED ≠ VERIFIED`, `SOURCE_AVAILABLE ≠ VERIFIED`, and `missing ≠ 0`.

---

## Case A — Calculable Comparison (500ml PET Beverage Bottle)

### 1. Application & Use Context
- **Packaging Format**: Single-use 500ml rigid beverage bottle with 28mm neck finish and screw closure.
- **Intended Use**: Packaging for carbonated soft drinks (CSD) and mineral water distributed at ambient and refrigerated temperatures.
- **Baseline Packaging**: Conventional bottle manufactured from virgin polyethylene terephthalate (PET) with virgin high-density polyethylene (HDPE) closure.
- **Candidate Packaging**: Bottle body converted to 100% post-consumer recycled PET (rPET), retaining standard virgin HDPE closure.

### 2. Sources
1. **Coca-Cola HBC AG** — *Green Finance Report* (September 2023), Circular Economy / Packaging Allocation section:
   - URL: [Coca-Cola HBC Green Finance Report (PDF)](https://www.coca-colahellenic.com/content/dam/cch/us/documents/investors-and-financial/debt-investors/Green%20Finance%20Report%20-%20September%202023.pdf)
   - Exact locations: Page 15 (Case study: in-house 100% rPET preforms at Gaglianico plant; 100% rPET portfolio in selected markets); Page 18, Footnote 2 (500ml PET bottle average weight 19.5g, closure 2.5g); Page 19 (Impact report methodology for rPET preforms).
   - Scope: Project allocation for in-house food-grade rPET preform manufacturing plants (e.g. Gaglianico, Italy; Edelstal, Austria). The report contains an independent limited assurance report by PricewaterhouseCoopers (PwC) covering quantitative Use of Proceeds allocations; the assurance scope explicitly does not cover the Impact Report or packaging metrics (19.5g and 2.5g are CCHBC-reported internal figures, SOURCE_AVAILABLE).
2. **Directive (EU) 2019/904** (Single-Use Plastics Directive) & **Regulation (EU) 2022/1616** (Recycled Plastic Food Contact Materials):
   - Establishes mandatory recycled content targets for PET beverage bottles (min. 25% by 2025, 30% by 2030) and regulatory authorization of closed-loop/bottle-to-bottle mechanical decontamination processes.

### 3. Traceable Inputs

| Side | Component ID | Material | Mass (g) | Recycled Fraction | Mass Origin / State | Fraction Origin / State | Source Reference |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Current** | `body` | Polyethylene terephthalate (PET) | 19.5 | 0.00 (0%) | MANUFACTURER_SUPPLIED / SOURCE_AVAILABLE | MANUFACTURER_SUPPLIED / SOURCE_AVAILABLE | Coca-Cola HBC Green Finance Report (Sep 2023) |
| **Current** | `closure` | High-density polyethylene (HDPE) | 2.5 | 0.00 (0%) | MANUFACTURER_SUPPLIED / SOURCE_AVAILABLE | MANUFACTURER_SUPPLIED / SOURCE_AVAILABLE | Coca-Cola HBC Green Finance Report (Sep 2023) |
| **Candidate** | `body` | Recycled PET (rPET) | 19.5 | 1.00 (100%) | MANUFACTURER_SUPPLIED / SOURCE_AVAILABLE | MANUFACTURER_SUPPLIED / SOURCE_AVAILABLE | Coca-Cola HBC Green Finance Report (Sep 2023) |
| **Candidate** | `closure` | High-density polyethylene (HDPE) | 2.5 | 0.00 (0%) | MANUFACTURER_SUPPLIED / SOURCE_AVAILABLE | MANUFACTURER_SUPPLIED / SOURCE_AVAILABLE | Coca-Cola HBC Green Finance Report (Sep 2023) |

### 4. Deterministic Manual Calculation

Formula per component:
$$\text{virgin}_i = \text{plastic\_mass\_g}_i \times (1 - \text{recycled\_content\_fraction}_i)$$

- **Current Package Total**:
  $$\text{virgin}_{\text{body}} = 19.5\text{ g} \times (1 - 0.00) = 19.5\text{ g}$$
  $$\text{virgin}_{\text{closure}} = 2.5\text{ g} \times (1 - 0.00) = 2.5\text{ g}$$
  $$\text{virgin}_{\text{current}} = 19.5\text{ g} + 2.5\text{ g} = 22.0\text{ g}$$

- **Candidate Package Total**:
  $$\text{virgin}_{\text{body}} = 19.5\text{ g} \times (1 - 1.00) = 0.0\text{ g}$$
  $$\text{virgin}_{\text{closure}} = 2.5\text{ g} \times (1 - 0.00) = 2.5\text{ g}$$
  $$\text{virgin}_{\text{candidate}} = 0.0\text{ g} + 2.5\text{ g} = 2.5\text{ g}$$

- **Transition Delta**:
  $$\Delta_{\text{reduction\_g}} = 22.0\text{ g} - 2.5\text{ g} = 19.5\text{ g}$$
  $$\Delta_{\text{reduction\_pct}} = \frac{19.5\text{ g}}{22.0\text{ g}} \times 100 = 88.636\ldots\% \approx 88.64\%$$

### 5. Calculation Result
- **Status**: `CALCULATED`
- **Verification State**: `INDICATIVE`
- **Current Virgin Plastic**: 22.0 g/unit
- **Candidate Virgin Plastic**: 2.5 g/unit
- **Reduction**: 19.5 g/unit (-88.64%)
- **Active Constraints**:
  - `food-contact-suitability`: `REVIEW_REQUIRED` (verification_state: `NOT_VERIFIED`)

### 6. Limitations & Nuances
- **Component Boundary**: Secondary packaging components, specifically the label and hot-melt adhesives, are excluded from the calculation boundary because their masses are unquantified in the cited Green Finance Report. In accordance with PackShift semantics, unquantified component mass is treated as unknown, not zero.
- **The Closure Reality Check**: Public marketing frequently promotes "100% rPET bottles." However, at the complete package level, closures are often excluded from rPET preform conversions. In PackShift, the 2.5 g closure reported by CCHBC is modeled as an unconverted virgin component (0.0 recycled fraction) under explicit domain assumptions. Under these modeled inputs, virgin plastic drops from 22.0 g to 2.5 g (-88.64%), rather than 0.0 g (-100%), highlighting the importance of component-level boundaries.
- **Scope**: Figures represent a specific 500ml CSD preform/bottle geometry lightweighted to 19.5 g and cannot be extrapolated linearly to larger formats (e.g. 1.5L or 2.0L bottles).

---

## Case B — Constraint-Sensitive Case (Prepared Food Container)

### 1. Numerical Opportunity
- **Current Packaging**: Berry Superfos UniPak 360ml Round Pot (Product Code 5226).
  - Material: Polypropylene (PP)
  - Plastic Mass: 14.8 g
  - Recycled Content Fraction: 0.00 (PackShift baseline modeling assumption; source specifies PP but does not declare recycled fraction)
  - Current Virgin Plastic: $14.8\text{ g} \times (1 - 0.00) = 14.8\text{ g}$
- **Candidate Packaging**: Duni BioPak Deli Hinged 375ml Container (Article 205971).
  - Material: Recycled Polyethylene Terephthalate (rPET)
  - Plastic Mass: 12.0 g (piece gross weight)
  - Recycled Content Fraction: 0.80 (80% post-consumer rPET)
  - Candidate Virgin Plastic: $12.0\text{ g} \times (1 - 0.80) = 2.4\text{ g}$
- **Numerical Transition Delta**:
  - Absolute Reduction: $14.8\text{ g} - 2.4\text{ g} = 12.4\text{ g}$
  - Percentage Reduction: $\frac{12.4\text{ g}}{14.8\text{ g}} \times 100 = 83.78\%$

On paper, this transition demonstrates an exceptional **83.78% reduction in virgin plastic** per package, accompanied by a 18.9% overall mass reduction (14.8 g → 12.0 g).

#### Critical Component Boundary & Comparability Limitation
- **Baseline Boundary**: The Berry UniPak 14.8 g specification represents the **container body only**; the separate snap-on lid is not quantified in the cited datasheet. Missing lid mass remains **unknown**, never assumed to be zero.
- **Candidate Boundary**: The Duni Deli Hinged 12.0 g specification represents the **complete hinged container gross weight** (body + integral lid).
- **Comparability Verdict**: The 83.78% delta is strictly an environmental calculation on **represented components**, NOT a verified like-for-like complete-package transition or implementable saving.

### 2. Operational & Regulatory Constraints

#### A. Thermal & Microwave Incompatibility
- **Current Container Capability**: The Berry UniPak PP container is injection-moulded PP; 0.0 recycled content is a PackShift modeling assumption. It is rated for hot-filling up to **95°C** and safe for consumer **microwave reheating**.
- **Candidate Container Constraint**: The Duni Deli Hinged container is thermoformed from amorphous rPET. The official manufacturer technical datasheet specifies:
  > *Maximum temperature: +70°C for up to 2 hours.*
  > *Restrictions: Not suitable for use in a microwave oven.*
- **Operational Requirement Incompatibility**: Exposing this article to 95°C hot-filling or microwave reheating exceeds the manufacturer-documented operational envelope (maximum +70°C for up to 2 hours; explicitly not suitable for microwave oven). PackShift evaluates this strictly as an operational gate block based on documented manufacturer limits, without asserting specific physical failure mechanisms.

#### B. Food Contact Migration Limits
- Under **Regulation (EU) No 10/2011** and **Regulation (EU) 2022/1616**, food contact migration testing for rPET containers is valid only within declared temperature-time envelopes (chilled storage and short-term ambient contact). Subjecting rPET to elevated temperatures without a high-temperature compliance certification risks non-compliant migration of non-intentionally added substances (NIAS) and polymer degradation products.

### 3. Sources
1. **Berry Global / Superfos** — *UniPak 360ml Round Technical Specification* (Product Code 5226):
   - URL: [Berry Global Product 5226](https://www.berryglobal.com/en/product/5226)
   - Documented specifications: Weight 14.8 g (body only), material PP, hot filling up to 95°C, dishwasher and freezer safe.
2. **Duni Group / BioPak** — *Deli Hinged 375ml Transparent 1-Comp Technical Datasheet & Declaration of Compliance* (Article 205971):
   - URL: [Duni Product 205971](https://www.duni.com/en/products/deli-hinged-375-ml-transparent-1-comp-205971)
   - Documented specifications: Piece gross weight 12.0 g, 80% post-consumer rPET, maximum temperature +70°C for up to 2 hours, explicitly not suitable for microwave oven.
3. **Commission Regulation (EU) 2022/1616** on recycled plastic materials and articles intended to come into contact with foods.

### 4. Safe Conclusion
- **Conditional Suitability**: The candidate avoids these specific modeled thermal/microwave incompatibility blocks only when the operating context is strictly limited to **cold/chilled foods** (e.g., fresh salads, sliced fruits, cold dips) where no hot-filling or consumer reheating occurs; food-contact and implementation suitability remain `REVIEW_REQUIRED` / `NOT_VERIFIED`.
- **Operational Block**: For prepared meals requiring hot-filling (95°C) or microwave reheating, the candidate **exceeds the manufacturer-documented operational envelope**, triggering an operational gate block regardless of numerical virgin plastic calculations.
- **PackShift Status**:
  - Environmental calculation: status `CALCULATED`, verification state `INDICATIVE` (12.4 g / 83.78% reduction on represented body components).
  - Bounded operational eligibility gate: status `BLOCKED` due to explicit gating findings:
    - `thermal-envelope-incompatibility`: candidate max 70.0°C < required 95.0°C (`NOT_VERIFIED`, derived from `ASSUMED` requirement premise; candidate manufacturer source cited)
    - `microwave-reheating-incompatibility`: candidate not microwave safe (`NOT_VERIFIED`, derived from `ASSUMED` requirement premise; candidate manufacturer source cited)
  - Advisory disclosure: `food-contact-suitability`: `REVIEW_REQUIRED` (`NOT_VERIFIED`).
  - Provenance: Demo operational requirements are explicitly attributed as `ASSUMED` / `NOT_VERIFIED` scenario assumptions, not actual Profi provider requirements. Finding verification is conservatively capped by the requirement premise.

### 5. What PackShift Must NOT Claim
- PackShift must **NOT** claim that Duni 205971 is a universal or "drop-in" substitute for Berry UniPak 5226.
- PackShift must **NOT** claim that 83.78% represents a like-for-like complete-package saving, because the baseline excludes the separate lid.
- PackShift must **NOT** certify microwave safety, heat tolerance, or hot-fill compatibility.
- PackShift must **NOT** state that 80% rPET compliance in chilled conditions implies regulatory approval for general food service applications.
- PackShift must **NOT** produce a unilateral legal, regulatory, or food-contact safety verdict.

---

## Evidence Ledger

| # | Source Entity | Source URL / Document | Supported Fact / Value | Value Origin | Verification State | Scope / Limitations |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| **S-01** | Coca-Cola HBC AG | [Green Finance Report Sep 2023](https://www.coca-colahellenic.com/content/dam/cch/us/documents/investors-and-financial/debt-investors/Green%20Finance%20Report%20-%20September%202023.pdf) | 500ml PET bottle body mass = 19.5 g | MANUFACTURER_SUPPLIED | SOURCE_AVAILABLE | CCHBC-reported average 500ml PET bottle mass from internal data. The cited footnote does not state geographic weighting or label/adhesive inclusion; those components remain outside PackShift's represented boundary because their masses are unquantified. |
| **S-02** | Coca-Cola HBC AG | [Green Finance Report Sep 2023](https://www.coca-colahellenic.com/content/dam/cch/us/documents/investors-and-financial/debt-investors/Green%20Finance%20Report%20-%20September%202023.pdf) | 500ml bottle closure mass = 2.5 g | MANUFACTURER_SUPPLIED | SOURCE_AVAILABLE | Average closure mass of 2.5 g reported by CCHBC (p. 18, Footnote 2). Closure resin identity (HDPE) and 0.0 recycled content are PackShift modeling assumptions; CCHBC report does not state closure resin or recycled content. |
| **S-03** | Coca-Cola HBC AG | [Green Finance Report Sep 2023](https://www.coca-colahellenic.com/content/dam/cch/us/documents/investors-and-financial/debt-investors/Green%20Finance%20Report%20-%20September%202023.pdf) | In-house bottle body conversion = 100% rPET (fraction 1.0) | MANUFACTURER_SUPPLIED | SOURCE_AVAILABLE | Attributed to eligible capital expenditures on in-house decontamination and preform blowing (Gaglianico / Edelstal). |
| **S-04** | Berry Global / Superfos | [Berry Global Product 5226](https://www.berryglobal.com/en/product/5226) | UniPak 360ml container body mass = 14.8 g, material = PP | MANUFACTURER_SUPPLIED | SOURCE_AVAILABLE | Standard injection-moulded PP pot. Rated for 95°C hot fill. 0.0 recycled content is a PackShift modeling assumption. Excludes separate snap-on lid. |
| **S-05** | Duni Group / BioPak | [Duni Product 205971](https://www.duni.com/en/products/deli-hinged-375-ml-transparent-1-comp-205971) | Deli Hinged 375ml gross weight = 12.0 g; recycled content = 80% rPET | MANUFACTURER_SUPPLIED | SOURCE_AVAILABLE | 1-comp hinged container. Rated Tmax 70°C for 2h; explicitly not microwaveable. |
| **S-06** | European Commission | [Regulation (EU) 2022/1616](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R1616) | Regulatory criteria for food-contact recycled plastic processes | OFFICIAL_REGULATORY | SOURCE_AVAILABLE | Framework governing decontamination technologies. Does not certify specific finished article suitability. |

---

## Remaining UNKNOWN / What Is Still Not Proven

1. **Client / Profi Actual Packaging Inventory**: The actual bill-of-materials, resin formulations, unit weights, and annual purchase volumes of Profi's packaging remain unknown and unverified due to confidentiality.
2. **Specific Migration Under Client Food Formulations**: Neither manufacturer data sheet proves compliance with specific migration limits (SML) for the user's specific food matrices (e.g. high-fat sauces, acidic dressings, alcohol content).
3. **Packaging Machine Compatibility**: Line speeds, denesting behavior, vacuum-sealing tolerances, and friction coefficients on automated client packing lines have not been tested or established.
4. **Secondary Components & Decoration**: Mass and chemical composition of adhesive labels, inks, barrier coatings, and tamper-evident shrink bands are unquantified in both cases.
5. **Real-World Recycling Infrastructure Yield**: High theoretical recycled content (80–100%) does not guarantee that the discarded container will be collected, sorted, and reprocessed in the client's local municipal waste management system.
6. **Supply Chain Commercial Viability**: Availability of food-grade rPET at required volumes, minimum order quantities (MOQ), and spot price premiums over virgin resin remain unverified for commercial procurement.
