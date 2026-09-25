# A1 — PUBLIC Evidence Source-to-Value Substantiation
## Exact Source → Modeled Value → Boundary → Allowed Claim → Demo Fallback

**Document Version:** 1.1.0  
**Status:** REVISED / READY FOR INTEGRATOR REVIEW  
**Author:** Mister Ressentiment (`@Mr-Ressentiment`)  
**Reconciled Base Commit:** `31e7381ec8d4bb3cfdeac7f77769934ae2a6a152` (`origin/main`)  
**Reviewed Commit:** `afadfe507a8798e909de10324b450c55fd80a61a` (PR #8 HEAD)  
**Target Repository:** `https://github.com/Slave-of-Skynet/gigafood`  
**Dataset Reference:** `data/evidence/public-packaging.json` (`dataset_kind: PUBLIC`)

---

## 1. Executive Summary & Epistemic Boundaries

### 1.1 Purpose
This document provides complete, line-by-line epistemic substantiation for all headline input values used in PackShift's public demonstration evidence pack (`cchbc-500ml-rpet-transition` and `deli-pp-to-rpet-transition`).

PackShift's calculations are deterministic and verified in code. However, under rigorous stakeholder or hackathon judge questioning, numerical correctness of formulas is insufficient. The team must defend:
1. **Source Provenance:** Exactly where each input originated.
2. **Literal vs Modeled Content:** What the primary source text actually states versus what PackShift models as domain assumptions.
3. **Component Boundaries:** What packaging components are represented versus omitted.
4. **Claim Boundaries:** What statements are logically and legally defensible versus prohibited overclaims.
5. **Retrieval Resilience:** How the demo holds up if a source URL moves or returns a 404, using reproducible official lookup paths.

### 1.2 Core Epistemic Tenets
PackShift enforces strict epistemic separation defined in `docs/evidence_semantics.md` and `docs/canon/decision_policy.md`:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CORE EPISTEMIC TENETS                           │
├────────────────────────────────────────────────────────────────────────┤
│ 1. CALCULATED ≠ VERIFIED                                               │
│    A mathematically correct calculation is not an empirical           │
│    verification of material performance or environmental impact.       │
│                                                                        │
│ 2. SOURCE_AVAILABLE ≠ VERIFIED                                         │
│    Having a downloadable PDF or web datasheet proves the source exists;│
│    it does not verify the data applies to the client's operation.      │
│                                                                        │
│ 3. MISSING ≠ 0                                                         │
│    If a component mass or parameter is omitted from a source, it is   │
│    UNKNOWN. It is never assumed to be zero.                            │
│                                                                        │
│ 4. WEAKEST-LINK VERIFICATION                                           │
│    A derived finding's verification state cannot exceed the weakest    │
│    essential premise upon which it relies.                             │
│                                                                        │
│ 5. SOURCE-BACKED vs MODELED INPUT SEPARATION                           │
│    Values stated directly in primary sources must not be conflated     │
│    with domain modeling assumptions where the source is silent.        │
└────────────────────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **What PackShift Is:** A transparent, decision-support calculation tool that compares packaging scenarios based on publicly disclosed specifications and explicit operational requirements.  
> **What PackShift Is NOT:** A packaging laboratory, an environmental auditing body, a food contact migration certification bureau, or an automated implementation approver.
>
> **Calculation vs Verification Scope:** The headline virgin plastic reductions of **-88.64%** (Case A) and **-83.78%** (Case B) are correct deterministic calculations across explicitly defined modeled inputs and represented components. They must **never** be described as fully manufacturer-verified transitions.

---

## 2. Source-to-Value Matrix

The following matrix audits all seventeen headline inputs (8 for Case A, 9 for Case B) across the public demonstration pack.

### Classification Taxonomy
- `EXACT_PRIMARY`: Directly stated in cited source with identical numerical value and boundary.
- `PRIMARY_WITH_QUALIFIER`: Found in primary source, but source contains qualifications, boundary differences, or conditions not fully captured by raw number.
- `DERIVED_FROM_PRIMARY`: Computed or aggregated from primary source figures using explicit, reproducible arithmetic.
- `MODELING_ASSUMPTION`: Explicit domain/engineering assumption where source is silent or ambiguous. Must be labeled as ASSUMPTION.
- `SOURCE_SILENT`: The cited source does not mention or report the parameter.
- `UNSUBSTANTIATED`: Mentioned in repo docs/code but cannot be found in or supported by the cited source.
- `CONTRADICTED`: Primary source directly disagrees with what repo docs/code state.

| Input ID | Scenario / Component | Parameter / Field | Modeled Value | Primary Source Entity & Document | Exact Location in Source | Verbatim Quote / Reference Text | Evidence Classification | Boundary / Scope Qualifier | Allowed Claim | Demo Fallback |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **A-01** | Case A / Baseline `body` | `plastic_mass_g` | `19.5` | Coca-Cola HBC AG, *Green Finance Report* (Sep 2023) | Page 18, Footnote 2 (Methodology section) | *"Average weight of one 500ml PET bottle is 19.5 g and its closure is 2.5 g in average as per our internal data."* | `EXACT_PRIMARY` | CCHBC-reported average from internal data. The cited footnote does not state geographic weighting or label/adhesive inclusion; PackShift treats unquantified decoration outside represented boundary. | "Modeled body mass is 19.5g, representing Coca-Cola HBC's reported average portfolio weight for a 500ml PET bottle." | Point to CCHBC Green Finance Report (Sep 2023), Page 18, Footnote 2. |
| **A-02** | Case A / Baseline `closure` | `plastic_mass_g` | `2.5` | Coca-Cola HBC AG, *Green Finance Report* (Sep 2023) | Page 18, Footnote 2 (Methodology section) | *"Average weight of one 500ml PET bottle is 19.5 g and its closure is 2.5 g in average as per our internal data."* | `EXACT_PRIMARY` | Reported closure portfolio average mass. | "Modeled closure mass is 2.5g, reflecting Coca-Cola HBC's reported average closure weight." | Point to CCHBC Green Finance Report (Sep 2023), Page 18, Footnote 2. |
| **A-03** | Case A / Baseline `body` | `recycled_content_fraction` | `0.0` | Coca-Cola HBC AG, *Green Finance Report* (Sep 2023) | Page 19, Circular Economy use/reuse section | *"the rPET is used instead of virgin PET"* | `MODELING_ASSUMPTION` | Counterfactual baseline representing a 100% virgin PET bottle. Report uses virgin PET as the avoided counterfactual, but historical fleet was not necessarily 0.00% across all markets. | "Demonstration assumes a counterfactual 100% virgin PET baseline to isolate the maximum conversion impact." | Clarify that 0% is an illustrative baseline counterfactual reflecting pre-conversion virgin state. |
| **A-04** | Case A / Baseline `closure` | `recycled_content_fraction` & `material` | `0.0` / `HDPE` | Unstated in CCHBC report; PackShift domain assumption | Silent in CCHBC report | CCHBC report gives closure mass (2.5g) but is completely silent on closure resin (HDPE vs PP) and recycled content. | `MODELING_ASSUMPTION` | CCHBC report does not state closure polymer or recycled fraction. Modeling closure as virgin HDPE (0.0 recycled content) is an explicit PackShift domain assumption. | "Closure is modeled with 0.0 recycled content as an explicit PackShift baseline assumption, reflecting conventional beverage closure practice where the cited report is silent." | Transparently state that CCHBC report does not specify closure polymer or recycled content; this is an explicit PackShift modeling assumption. |
| **A-05** | Case A / Candidate `body` | `recycled_content_fraction` | `1.0` | Coca-Cola HBC AG, *Green Finance Report* (Sep 2023) | Page 15 & Page 19 | Page 15: *"Gaglianico plant in Italy that will transform up to 30,000 tonnes of PET each year into 100% recycled PET preforms... We are transitioning to 100% rPET portfolio in selected markets, including Switzerland, Italy and Austria."* | `PRIMARY_WITH_QUALIFIER` | 100% rPET body applies to dedicated converted markets (e.g. Switzerland, Italy, Austria) and in-house preform facilities, NOT universal global deployment. | "Candidate body represents Coca-Cola HBC's 100% rPET bottle conversion deployed in selected European markets." | Quote CCHBC Report p. 15 on Gaglianico plant and selected 100% rPET markets. |
| **A-06** | Case A / Candidate `body` | `plastic_mass_g` | `19.5` | PackShift Preform Tooling Invariance Assumption | Derived from p. 18 baseline body mass | Preform mass is conserved in blow-moulding tooling conversion. Report does not publish post-conversion scale weight. | `MODELING_ASSUMPTION` | Candidate body mass 19.5 g is a PackShift modeling assumption; CCHBC does not publish a post-conversion measured bottle mass in the cited report. | "Candidate body mass is modeled at 19.5g under a PackShift mass-conservation assumption, as post-conversion bottle scale weight is not published in the CCHBC report." | Explain that 19.5g is an explicit modeling assumption of nominal mass conservation. |
| **A-07** | Case A / Candidate `closure` | `plastic_mass_g` & `recycled_content_fraction` | `2.5` g / `0.0` | CCHBC Report pp. 15, 18 (mass); PackShift assumption (retained virgin status) | Page 15 & Page 18 | Scope of rPET investment in CCHBC report is specifically "rPET preforms" for bottle bodies. Report is silent on closure conversions. | `MODELING_ASSUMPTION (candidate mass retention; 2.5g seeded from source-backed baseline average)` | CCHBC report does not discuss closure conversion or closure resin. Candidate closure is modeled as an unconverted 2.5g virgin component under explicit PackShift domain assumptions. | "Under PackShift's modeled assumption of an unconverted 2.5g virgin closure, complete-package virgin plastic drops from 22.0g to 2.5g (-88.64%)." | State clearly that CCHBC's reported transition covers bottle preforms; retaining the closure as virgin is a PackShift modeling assumption demonstrating component boundary effects. |
| **A-08** | Case A / Label & Adhesive | `plastic_mass_g` | *EXCLUDED* (Unmodeled) | Omitted from CCHBC Green Finance Report | Silent in primary source | Earlier NDR-01 text cited "~0.3–0.5g OPP label"; this specific number does NOT appear anywhere in the CCHBC report. | `SOURCE_SILENT` / `MODELING_ASSUMPTION` (boundary scope) / `UNSUBSTANTIATED` (earlier numeric estimate) | CCHBC report is silent on label/adhesive mass. PackShift explicitly excludes secondary decoration from the modeled boundary, treating missing mass as unknown rather than zero. | "Secondary packaging components (labels, adhesives) are unquantified in the primary source and remain outside the represented component boundary with unknown mass." | Confirm that CCHBC does not report label mass; PackShift treats missing mass as unknown rather than fabricating an assumption. |
| **B-01** | Case B / Current `container` | Identity & Code | `Berry UniPak 360ml (5226)` | Berry Global / Superfos Technical Datasheet | Product code 5226 | *"UniPak Round 360 ml... Product code: 5226... Diameter: 118 mm... Height: 52.6 mm"* | `EXACT_PRIMARY` | Technical catalog identity for standard injection-molded round pot. | "Baseline is Berry Global / Superfos Product 5226, a 360ml injection-moulded UniPak container." | Present Berry technical product catalog for code 5226. |
| **B-02** | Case B / Current `pot` | `plastic_mass_g` | `14.8` | Berry Global / Superfos Technical Datasheet | Specification field: Weight | *"Weight: 14.8 g ±0.7 g"* | `PRIMARY_WITH_QUALIFIER` | 14.8g is the **pot body only**. The snap-on lid is sold separately and not included in this figure. | "Baseline container body has a manufacturer-specified weight of 14.8g (excluding separate snap-on lid)." | Note explicitly that 14.8g covers the container body only; lid is separate catalog item. |
| **B-03** | Case B / Current `pot` | `material` & `recycled_content_fraction` | `PP` / `0.0` | Berry Global / Superfos Technical Datasheet | Specification field: Raw material | *"Raw material: PP"* | `EXACT_PRIMARY` (PP) / `MODELING_ASSUMPTION` (0.0) | Datasheet documents raw material "PP" without declaring recycled content. PackShift models 0.0 recycled content as an explicit baseline assumption. | "The container body material is documented as polypropylene (PP); PackShift models 0.0 recycled content as an explicit baseline assumption." | Point to datasheet field 'Raw material: PP'; explain 0.0% is a baseline modeling assumption, not a source-certified figure. |
| **B-04** | Case B / Current `pot` | `max_temperature_c` & `microwave_safe` | `95.0` °C / `true` | Berry Global / Superfos Technical Datasheet | Specification field: Performance / Hot filling | *"Suitable for hot filling (up to 95°C)... Microwave safe"* | `PRIMARY_WITH_QUALIFIER` | 95°C rating applies to transient hot-filling operations, not indefinite continuous service. | "Baseline container is rated by the manufacturer for hot-filling up to 95°C and microwave reheating." | Quote Berry UniPak performance section on hot-fill and microwave suitability. |
| **B-05** | Case B / Candidate `container` | Identity, Code & Material | `Duni Deli Hinged 375ml (205971)` / `80% rPET` | Duni Group / BioPak Technical Datasheet & DoC | Article no: 205971; Material description | *"Deli Hinged 375 ml Transparent 1-Comp... Article number: 205971... Material: RPET (80% PCR PET)"* | `EXACT_PRIMARY` | Complete hinged thermoformed container manufactured from 80% post-consumer recycled PET. | "Candidate is Duni BioPak Article 205971, a 375ml hinged container manufactured with 80% post-consumer rPET." | Present Duni Declaration of Compliance (DoC) and datasheet for Article 205971. |
| **B-06** | Case B / Candidate `container` | `plastic_mass_g` | `12.0` | Duni Group / BioPak Technical Datasheet | Specification field: Piece gross weight | *"Piece Gross Weight: 12.0 g"* | `PRIMARY_WITH_QUALIFIER` | 12.0g represents the **complete hinged container** (integral body + lid), whereas baseline 14.8g was body only. | "Candidate container has a manufacturer piece gross weight of 12.0g for the complete hinged unit." | Highlight the component boundary asymmetry between body-only baseline and complete hinged candidate. |
| **D-01** | Case B / Candidate `container` | `max_temperature_c` | `70.0` | Duni Group / BioPak Declaration of Compliance | Section: Intended food contact conditions | *"Maximum temperature: +70°C for up to 2 hours"* | `PRIMARY_WITH_QUALIFIER` | Bounded condition: contact allowed up to 70°C for at most 2 hours. Material softens at amorphous PET glass transition (~67–70°C). | "Candidate container has a documented manufacturer thermal ceiling of 70°C for up to 2 hours." | Show Duni DoC food contact temperature-time condition clause (+70°C / 2h max). |
| **D-02** | Case B / Candidate `container` | `microwave_safe` | `false` | Duni Group / BioPak Declaration of Compliance & Datasheet | Section: Limitations / Restrictions | *"Not suitable for use in a microwave oven"* | `EXACT_PRIMARY` | Explicit negative declaration by manufacturer. | "Manufacturer explicitly declares candidate container unsuitable for microwave oven use." | Quote verbatim restriction clause from Duni DoC and product datasheet. |
| **D-03** | Case B / Scenario Requirements | `max_temperature_c` (95°C) & `microwave_safe` (true) | `95.0` °C / `true` | PackShift Demonstration Premise | Scenario `operational_requirements` fixture | Not from manufacturer; defined as scenario premise (`demo:prepared-food-hot-fill`) | `MODELING_ASSUMPTION` / `SCENARIO_PREMISE` | Illustrative operating requirements chosen to demonstrate PackShift's eligibility gate. NOT Profi client data. | "These operational requirements are demonstration scenario premises chosen to test candidate eligibility." | Emphasize provenance: origin `ASSUMED`, verification state `NOT_VERIFIED`. |

---

## 3. Detailed Case A Source-to-Value Substantiation

### 3.1 Primary Document
- **Issuing Entity:** Coca-Cola HBC AG
- **Document Title:** *Green Finance Report — September 2023*
- **Publication Date:** September 2023
- **Document Nature:** Green Bond Allocation and Impact Report (governed by ICMA Harmonised Framework for Impact Reporting)
- **External Assurance:** Contains an Independent Limited Assurance Report by PricewaterhouseCoopers (PwC) covering quantitative Use of Proceeds disclosures (allocation section). The PwC assurance scope explicitly does NOT cover the Impact Report or packaging metrics. The 19.5g and 2.5g figures remain CCHBC-reported values from internal data (`SOURCE_AVAILABLE`), not audited or externally assured impact values.
- **Official Online Location:** Publicly accessible via corporate investor relations: `https://www.coca-colahellenic.com/content/dam/cch/us/documents/investors-and-financial/debt-investors/Green%20Finance%20Report%20-%20September%202023.pdf`
- **Committed Local Copy:** *No committed local PDF in repository.* Primary verification relies on official corporate URL and external public investor archives.

### 3.2 Verbatim Evidence Analysis

#### 1. Baseline Body (19.5 g) & Closure (2.5 g) Masses
- **Source Location:** Page 18, Section "1. Circular Economy: Impact report methodology", Subsection "Single-use plastic material saved", Footnote 2.
- **Verbatim Text:**
  > *"For calculation of the single-use plastic material saved, we assume that every 1.04 (520ml/500ml) packaging unit from these dispensers replace one single 500ml PET bottle² and its closure and then the packaging units sold are multiplied by the average weight of the 500ml PET bottle and its closure."*  
  > *"² Average weight of one 500ml PET bottle is 19.5 g and its closure is 2.5 g in average as per our internal data."*
- **Epistemic Classification:** `EXACT_PRIMARY` (for body and closure mass values).
- **Scope & Context:** CCHBC-reported average from internal data (`SOURCE_AVAILABLE`), not an empirical single-sample weigh-scale measurement. The cited footnote does not state geographic weighting or label/adhesive inclusion.
- **Exclusions:** Footnote 2 specifies only the average weight of the 500ml PET bottle and its closure. Labels, hot-melt adhesives, and secondary packaging are unquantified in the cited source; PackShift treats unquantified decoration outside represented boundary.

#### 2. Recycled Content Baseline (0.0 / 0%)
- **Source Location:** Page 19, Circular Economy use/reuse phase.
- **Verbatim Text:**
  > *"The same amount of rPET purchased is multiplied by the emissions factor of the virgin PET (as the rPET is used instead of virgin PET²) and the diﬀerence between the two calculated total emissions is the CO₂e saving."*
- **Epistemic Classification:** `MODELING_ASSUMPTION`.
- **Reasoning:** In green bond carbon avoidance accounting, savings are measured against a counterfactual baseline of 100% virgin PET. Coca-Cola HBC does not assert that its pre-conversion historical packaging contained 0.000% rPET across all countries. PackShift adopts 0.0 as an explicit modeling baseline to isolate the theoretical maximum conversion benefit.

#### 3. Candidate Recycled Content (1.0 / 100% rPET Body)
- **Source Location:** Page 15, Case Study "Circular Economy: producing rPET in house"; Page 15, footnote 3; Page 19, use/reuse methodology.
- **Verbatim Text:**
  > *"We have invested over €50m in in-house rPET facilities to date to help us reach our rPET goals. This includes our Gaglianico plant in Italy that will transform up to 30,000 tonnes of PET each year into 100% recycled PET preforms, enough to meet our annual beverage bottling needs in Italy."* (Page 15)  
  > *"We are transitioning to 100% rPET portfolio in selected markets, including Switzerland, Italy³ and Austria. (³ Excluding water.)"* (Page 15)  
  > *"We calculate the amount of virgin PET saved as the amount of rPET preforms produced in-house and used for bottle production."* (Page 19)
- **Epistemic Classification:** `PRIMARY_WITH_QUALIFIER`.
- **Nuance & Restriction:** The 100% rPET conversion is market-specific (Switzerland, Italy, Austria for CSD) and enabled by dedicated food-grade preform manufacturing assets (Gaglianico). It is NOT an undifferentiated claim for Coca-Cola HBC's entire global or 29-country volume.

#### 4. Candidate Body Mass Conservation (19.5 g)
- **Source Location:** Inferred from Page 15 (preform manufacturing) and Page 18 (bottle geometry).
- **Epistemic Classification:** `MODELING_ASSUMPTION`.
- **Epistemic Boundary:** Candidate body mass 19.5 g is a PackShift modeling assumption; CCHBC does not publish a post-conversion measured bottle mass in the cited report. While preform blow-molding conversions conventionally aim to preserve container geometry and nominal weight, no post-conversion scale measurement is disclosed in the source.

#### 5. Candidate Closure (2.5 g Virgin Component)
- **Source Location:** Page 15 & Page 18.
- **Epistemic Classification:** `MODELING_ASSUMPTION (candidate mass retention; 2.5g seeded from source-backed baseline average)`.
- **Epistemic Boundary:** The CCHBC report confirms an average closure mass of 2.5 g (p. 18, Footnote 2), but does **not** state the closure polymer or its recycled fraction, nor does it discuss closure conversions alongside its rPET preform investments. In PackShift, the candidate closure is modeled with retained baseline mass (2.5 g seeded from source-backed baseline average) and virgin status (0.0 recycled fraction) as an explicit domain modeling assumption. This assumption illustrates that marketing claims of "100% rPET bottles" do not automatically imply a 100% virgin-free complete package when closures are excluded from the conversion scope. This candidate closure specification is a PackShift modeling assumption, **not** a manufacturer-verified transition.

#### 6. Label & Adhesive Boundary Exclusion
- **Source Evidence:** The CCHBC Green Finance Report is completely silent on bottle label and adhesive masses.
- **Epistemic Classification:** `SOURCE_SILENT` / `MODELING_ASSUMPTION` (boundary scope) / `UNSUBSTANTIATED` (earlier numeric estimate).
- **Epistemic Boundary:** In earlier repo prose, a range of `~0.3–0.5 g` was mentioned. A full text search of the 26-page report confirms that no such figure exists in the primary source text. PackShift explicitly excludes secondary decoration (labels, adhesives) from the component boundary, treating unquantified mass as unknown rather than zero.

---

## 4. Detailed Case B Source-to-Value Substantiation

### 4.1 Primary Documents

#### Document 1: Berry Superfos Technical Specification
- **Issuing Entity:** Berry Global / Superfos
- **Product Code:** 5226
- **Product Designation:** UniPak Round 360 ml
- **Dimensions:** Top diameter approx. 118 mm; Height approx. 52.6 mm
- **Document Source:** Berry Global Product Catalog / Technical Datasheet 5226 (Legacy URL: `https://www.berryglobal.com/en/product/5226`; current lookup via Berry Global Product Catalog under UniPak 118mm diameter).
- **Committed Local Copy:** *No committed local datasheet in repository.* Verified via manufacturer catalog documentation.

#### Document 2: Duni BioPak Declaration of Compliance & Technical Datasheet
- **Issuing Entity:** Duni Group / BioPak
- **Article Number:** 205971
- **Product Designation:** Deli Hinged 375 ml Transparent 1-Comp
- **Document Nature:** Official Declaration of Compliance (DoC) for Food Contact Materials (FCM) & Technical Product Sheet
- **Document Source:** Duni MediaBank Article 205971 (Legacy URL: `https://www.duni.com/en/products/deli-hinged-375-ml-transparent-1-comp-205971`; current lookup via Duni Group Product Catalog / MediaBank).
- **Committed Local Copy:** *No committed local DoC in repository.* Verified via Duni MediaBank regulatory documentation.

### 4.2 Verbatim Evidence Analysis

#### 1. Berry UniPak 360ml Mass, Material & Recycled Content (14.8 g, PP, 0.0 Recycled)
- **Verbatim Specification:**
  - Product Code: `5226`
  - Raw Material: `PP` (Polypropylene)
  - Weight: `14.8 g ±0.7 g`
  - Performance: `Suitable for hot filling (up to 95°C)... Microwave safe`
- **Epistemic Classification:**
  - Product Code & Material (`PP`): `EXACT_PRIMARY`
  - 14.8 g Mass: `PRIMARY_WITH_QUALIFIER` (Applies strictly to **container body only**; snap-on lid is sold separately under a different article code).
  - Recycled Content Fraction (`0.0`): `MODELING_ASSUMPTION`. The Berry datasheet specifies `Raw material: PP`. The source does **not** state "0% recycled content" or "virgin resin". PackShift assigns `recycled_content_fraction = 0.0` as an explicit domain assumption representing a standard un-recycled baseline.
  - 95°C & Microwave: `PRIMARY_WITH_QUALIFIER` (Applies to transient hot-filling and reheating; not long-term retort cooking).

#### 2. Duni Deli Hinged 375ml Mass, Material & Recycled Fraction (12.0 g, 80% rPET)
- **Verbatim Specification (DoC Article 205971):**
  - Article Number: `205971`
  - Description: `Deli Hinged 375 ml Transparent 1-Comp`
  - Material: `RPET (80% PCR PET)` (80% post-consumer recycled PET)
  - Piece Gross Weight: `12.0 g`
- **Epistemic Classification:** `EXACT_PRIMARY` (for piece gross weight and 80% recycled content fraction).
- **Component Boundary:** The Duni 12.0 g specification represents the **complete thermoformed hinged package** (container basin plus integrated fold-over lid).

#### 3. Duni Thermal Limit & Microwave Incompatibility (70°C max, microwave=false)
- **Verbatim Specification (DoC Article 205971):**
  - Temperature Conditions:
    > *"Intended food contact conditions: Long term storage at room temperature or below, including when packaged under hot-fill conditions and/or heating up to 70°C for up to 2 hours."*
  - Explicit Restrictions:
    > *"Restrictions: Not suitable for use in a microwave oven."*
- **Epistemic Classification:**
  - Max Temperature (70°C): `PRIMARY_WITH_QUALIFIER` (Restricted to max 2 hours at 70°C).
  - Microwave Safe (`false`): `EXACT_PRIMARY` (Verbatim manufacturer prohibition).

#### 4. Scenario Operational Requirements (95°C hot fill, microwave safe)
- **PackShift Provenance:**
  - `origin`: `ASSUMED`
  - `verification_state`: `NOT_VERIFIED`
  - `source_reference`: `demo:prepared-food-hot-fill` / `demo:prepared-food-microwave`
- **Epistemic Classification:** `MODELING_ASSUMPTION` / `SCENARIO_PREMISE`.
- **Epistemic Rule:** This requirement is **NOT** customer or client data. It is a synthetic demonstration scenario constraint formulated to test PackShift's eligibility gate.

---

## 5. Calculation Cross-Check & Arithmetic Verification

PackShift calculates virgin plastic mass strictly per component, then aggregates totals across each package:

$$\text{virgin\_plastic}_i = \text{plastic\_mass\_g}_i \times (1 - \text{recycled\_content\_fraction}_i)$$

$$\text{package\_virgin\_total} = \sum_{i} \text{virgin\_plastic}_i$$

$$\Delta_{\text{reduction\_g}} = \text{current\_virgin\_total} - \text{candidate\_virgin\_total}$$

$$\Delta_{\text{reduction\_pct}} = \frac{\Delta_{\text{reduction\_g}}}{\text{current\_virgin\_total}} \times 100$$

### 5.1 Case A: Coca-Cola HBC 500ml Transition
```text
Current Package (cchbc-500ml-virgin):
  - body:    19.5 g * (1 - 0.00) = 19.5 g virgin
  - closure:  2.5 g * (1 - 0.00) =  2.5 g virgin
  - Total Current Virgin Plastic  = 22.0 g

Candidate Package (cchbc-500ml-rpet):
  - body:    19.5 g * (1 - 1.00) =  0.0 g virgin
  - closure:  2.5 g * (1 - 0.00) =  2.5 g virgin
  - Total Candidate Virgin Plastic =  2.5 g

Transition Delta:
  - Absolute Reduction: 22.0 g - 2.5 g = 19.5 g
  - Percentage Reduction: (19.5 / 22.0) * 100 = 88.636363...%
  - Displayed String: 88.64% (-88.64%)
```

- **Backend Code Execution Result:**
  - `status`: `CALCULATED`
  - `verification_state`: `INDICATIVE`
  - `current_virgin_pack_g`: `22.0`
  - `candidate_virgin_pack_g`: `2.5`
  - `reduction_g`: `19.5`
  - `reduction_pct`: `88.63636363636364`
- **Arithmetic Parity:** Exact match between manual calculation, documentation, and Python backend.
- **Epistemic Status:** 88.64% is a correct deterministic calculation on explicitly stated modeled inputs (reported masses + modeled virgin closure assumption), not a fully manufacturer-verified transition.

### 5.2 Case B: Prepared Food Container Transition
```text
Current Package (berry-unipak-360ml-pp):
  - pot:     14.8 g * (1 - 0.00) = 14.8 g virgin
  - Total Current Virgin Plastic  = 14.8 g

Candidate Package (duni-deli-375ml-rpet):
  - container: 12.0 g * (1 - 0.80) = 2.4 g virgin
  - Total Candidate Virgin Plastic  = 2.4 g

Transition Delta:
  - Absolute Reduction: 14.8 g - 2.4 g = 12.4 g
  - Percentage Reduction: (12.4 / 14.8) * 100 = 83.783783...%
  - Displayed String: 83.78% (-83.78%)
```

- **Backend Code Execution Result:**
  - `status`: `CALCULATED`
  - `eligibility_status`: `BLOCKED`
  - `verification_state`: `INDICATIVE`
  - `current_virgin_pack_g`: `14.8`
  - `candidate_virgin_pack_g`: `2.4` (IEEE float: `2.3999999999999995`)
  - `reduction_g`: `12.4` (IEEE float: `12.400000000000002`
  - `reduction_pct`: `83.78378378378379`
- **Arithmetic Parity:** Exact match between manual calculation, documentation, and Python backend.
- **Epistemic Status:** 83.78% is a deterministic calculation over represented components under the explicit baseline 0% recycled content modeling assumption.

---

## 6. Component Boundary & Comparability Analysis

### 6.1 Case A Boundary Breakdown: High Comparability (Symmetric Boundary)

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   CASE A COMPONENT BOUNDARY MAP                        │
├────────────────────────────────────────────────────────────────────────┤
│ CURRENT PACKAGE (22.0 g represented)                                   │
│ ├── Body: 19.5 g Virgin PET [INCLUDED]                                 │
│ ├── Closure: 2.5 g Virgin HDPE [INCLUDED]                              │
│ └── Label & Adhesive: Unknown mass [EXCLUDED]                          │
│                                                                        │
│ CANDIDATE PACKAGE (22.0 g represented)                                 │
│ ├── Body: 19.5 g 100% rPET [INCLUDED]                                  │
│ ├── Closure: 2.5 g Virgin HDPE [INCLUDED]                              │
│ └── Label & Adhesive: Unknown mass [EXCLUDED]                          │
└────────────────────────────────────────────────────────────────────────┘
```

- **Boundary Assessment:** **SYMMETRIC**. Both baseline and candidate explicitly account for identical functional components (body + closure). Both exclude secondary decoration (label and adhesive).
- **Comparability Verdict:** Highly comparable on modeled components. The conversion represents a preform resin transition on equivalent blowing machinery.
- **Critical Caveat:** The virgin plastic reduction of -88.64% applies strictly to the represented body and closure components under explicit closure modeling assumptions.

### 6.2 Case B Boundary Breakdown: Asymmetric Boundary (Body vs Complete Package)

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   CASE B COMPONENT BOUNDARY MAP                        │
├────────────────────────────────────────────────────────────────────────┤
│ CURRENT PACKAGE (14.8 g represented)                                   │
│ ├── Pot Body: 14.8 g PP [INCLUDED]                                     │
│ └── Snap-on Lid: Unknown mass (~3–5 g) [MISSING / EXCLUDED]            │
│                                                                        │
│ CANDIDATE PACKAGE (12.0 g represented)                                 │
│ └── Complete Hinged Container (Body + Lid): 12.0 g (80% rPET) [INCL]   │
└────────────────────────────────────────────────────────────────────────┘
```

- **Boundary Assessment:** **ASYMMETRIC**.
  - Current baseline (Berry 5226) includes **only the pot body** (14.8 g). The required snap-on lid is sold separately and omitted from the datasheet weight.
  - Candidate (Duni 205971) includes the **entire hinged article** (12.0 g, body + lid thermoformed as one piece).
- **Mathematical Impact of Asymmetry:**
  - If a typical injection-molded PP lid adds ~3.0 g to 5.0 g of virgin plastic, the true current package baseline is ~17.8 g to 19.8 g virgin PP.
  - Replacing an entire container + lid system (17.8 g) with a 2.4 g virgin rPET unit would yield an actual reduction of ~15.4 g (-86.5%), which is *higher* than the modeled 12.4 g (-83.78%).
  - Conversely, if an operator compared the 14.8 g body to only the body portion of the candidate (~7–8 g), the numbers would shift again.
- **Comparability Verdict:** **NON-COMPARABLE COMPLETE SYSTEMS**. The 83.78% reduction is strictly an environmental calculation on **represented components**, NOT a certified like-for-like complete-package transition.
- **PackShift Canon Compliance:** In accordance with the tenet `missing ≠ 0`, PackShift does not invent an assumed lid weight for the Berry container. The missing lid remains unquantified, and the asymmetry is explicitly disclosed to the user.

---

## 7. Claim Safety Table

| # | Proposed Claim Statement | Verdict | Rationale & Epistemic Barrier | Defensible Alternative Phrasing |
| :- | :--- | :--- | :--- | :--- |
| **C-01** | *"PackShift proves that converting this 500ml bottle saves 88.64% of virgin plastic."* | `SAFE WITH QUALIFIER` | The formula calculation is exact, but `CALCULATED ≠ VERIFIED`. The figure applies to represented body and closure weights from CCHBC reported averages, combined with explicit PackShift closure modeling assumptions. | *"PackShift calculates an 88.64% virgin plastic reduction across represented components, based on Coca-Cola HBC's reported portfolio averages and explicit modeled closure assumptions."* |
| **C-02** | *"Coca-Cola HBC bottles are 100% recycled plastic, and CCHBC confirms closures remain virgin HDPE."* | `DO NOT CLAIM` | Factually incorrect. The bottle body is 100% rPET, but the CCHBC report does not state closure resin or discuss closure conversion; virgin closure status is a PackShift modeling assumption. | *"The scenario models a 100% rPET bottle body with a retained virgin closure assumption, demonstrating why complete-package analysis matters."* |
| **C-03** | *"PackShift certifies that this rPET bottle is food-contact safe and legally compliant."* | `DO NOT CLAIM` | Regulatory overclaim. PackShift is a decision-support calculation tool, not a food contact testing laboratory or regulatory body. | *"PackShift references the manufacturer's public regulatory references, but flags food-contact suitability as REVIEW_REQUIRED because software cannot certify regulatory compliance."* |
| **C-04** | *"The candidate saves 19.5g of virgin plastic per 500ml bottle based on Coca-Cola HBC reported averages."* | `SAFE` | Directly supported by CCHBC Green Finance Report p. 18 footnote 2 (19.5 g body converted to 100% rPET). | *"Based on Coca-Cola HBC's reported 19.5g average 500ml PET body weight, converting the body to 100% rPET saves 19.5g of virgin plastic per bottle."* |
| **C-05** | *"PackShift proves that Duni 205971 cannot replace Berry 5226 for hot-filling."* | `SAFE WITH QUALIFIER` | PackShift's operational gate blocks the candidate based on documented manufacturer specifications (70°C max vs 95°C requirement), but PackShift does not perform physical stress testing. | *"PackShift's operational gate identifies that Duni declares a 70°C maximum limit, which fails the scenario's assumed 95°C hot-fill requirement."* |
| **C-06** | *"Using the Duni container for hot food will cause container collapse and severe scalding."* | `DO NOT CLAIM` | Speculative physical hazard claim. PackShift evaluates documented spec mismatch, not physical accident forecasting. | *"The candidate container's documented 70°C ceiling is incompatible with the 95°C hot-fill operating requirement, causing an operational gate block."* |
| **C-07** | *"PackShift proves an 83.78% virgin plastic reduction for the prepared food container."* | `SAFE WITH QUALIFIER` | The arithmetic is correct for the modeled components, but the baseline excludes the separate snap-on lid while the candidate includes the integral lid, and 0% recycled content is an assumption. | *"On the represented components, the calculation indicates an 83.78% virgin plastic reduction under explicit baseline assumptions, though baseline lid mass remains an unquantified boundary difference."* |
| **C-08** | *"Duni 205971 is certified under Regulation (EU) 2022/1616 for all food service uses."* | `DO NOT CLAIM` | Duni's DoC restricts food contact to cold/chilled storage and short-term ambient contact (max 70°C / 2h). It is explicitly prohibited in microwaves. | *"Duni's Declaration of Compliance cites Regulation (EU) 2022/1616 for its 80% rPET, but restricts application to cold/ambient food up to 70°C for 2 hours, excluding microwaves."* |
| **C-09** | *"The Berry 5226 package weighs 14.8g total."* | `DO NOT CLAIM` | Factually inaccurate. The 14.8g weight covers the container body only; the separate lid is omitted from this figure. | *"The Berry 5226 container body weighs 14.8g according to manufacturer specifications; lid weight is separate and unquantified."* |
| **C-10** | *"Under the assumed demo requirement of 95°C hot fill, the candidate's documented 70°C ceiling creates an operational incompatibility."* | `SAFE` | Accurately describes the bounded operational gate logic: candidate capability (70°C) < assumed requirement (95°C). | *"Under the assumed 95°C demo requirement, the candidate's documented 70°C limit triggers an operational gate block."* |

---

## 8. Demo Source Card

A rapid-lookup reference card for presenters facing judge questioning.

```text
╔══════════════════════════════════════════════════════════════════════════════════════════╗
║                                 PACKSHIFT DEMO SOURCE CARD                               ║
╠══════════════════════════════════════════════════════════════════════════════════════════╣
║ SCENARIO A: 500ml PET Beverage Bottle (Virgin -> 100% rPET Body)                         ║
║ ──────────────────────────────────────────────────────────────────────────────────────── ║
║ • Primary Source: Coca-Cola HBC AG — Green Finance Report (September 2023)               ║
║ • PwC Limited Assurance: Applies strictly to quantitative Use of Proceeds allocations;   ║
║   explicitly does NOT cover Impact Report figures or packaging metrics. 19.5g and 2.5g   ║
║   are CCHBC-reported internal figures (SOURCE_AVAILABLE), not audited impact values.     ║
║ • Key Citations:                                                                         ║
║   - Page 18, Footnote 2: "Average weight of one 500ml PET bottle is 19.5 g and its       ║
║     closure is 2.5 g in average as per our internal data."                               ║
║   - Page 15: Gaglianico plant produces 100% rPET preforms (30k t/yr); selected 100%      ║
║     rPET markets (Switzerland, Italy, Austria).                                          ║
║ • Headline Numbers:                                                                      ║
║   - Baseline Virgin: 22.0 g (19.5g body + 2.5g closure reported averages)                ║
║   - Candidate Virgin: 2.5 g (0.0g body + 2.5g closure modeled as virgin component)       ║
║   - Delta: -19.5 g virgin plastic (-88.64%) on modeled inputs                            ║
║ • The Core Caveat: Footnote 2 documents average body (19.5g) and closure (2.5g) masses.   ║
║   The report covers in-house rPET preforms for bodies, but is silent on closure resin    ║
║   and conversions. In PackShift, the closure is modeled as unconverted (2.5g virgin)     ║
║   as an explicit domain assumption. Complete package virgin plastic is NOT 0.0g.         ║
║ • If Questioned: "Our body and closure masses match Footnote 2 on page 18 of CCHBC's     ║
║   Green Finance Report. The closure's virgin status and 0.0 recycled content are         ║
║   explicit PackShift modeling assumptions, demonstrating that body-only rPET transitions ║
║   do not eliminate closure virgin plastic."                                              ║
╠══════════════════════════════════════════════════════════════════════════════════════════╣
║ SCENARIO B: Prepared Food Container (PP Pot -> 80% rPET Hinged)                          ║
║ ──────────────────────────────────────────────────────────────────────────────────────── ║
║ • Baseline Source: Berry Global / Superfos Product 5226 (UniPak 360ml Round Pot)         ║
║   - Weight: 14.8 g (pot body only; lid is separate catalog item)                         ║
║   - Material: PP (0.0 recycled content is an explicit baseline modeling assumption)      ║
║   - Capabilities: 95°C hot fill, microwave safe                                         ║
║ • Candidate Source: Duni Group / BioPak Article 205971 (Deli Hinged 375ml 1-Comp)        ║
║   - Weight: 12.0 g (piece gross weight of complete hinged unit)                          ║
║   - Material: 80% post-consumer rPET                                                     ║
║   - Limits: Max 70°C for 2h; explicitly NOT suitable for microwave oven                  ║
║ • Headline Numbers:                                                                      ║
║   - Numerical Saving: 14.8g -> 2.4g virgin plastic (-12.4 g / -83.78%)                   ║
║   - Operational Eligibility: BLOCKED (Candidate 70°C < 95°C required; microwave false)   ║
║ • The Core Caveat: Boundary asymmetry (body-only vs hinged container) means saving is    ║
║   on represented components only under explicit baseline assumptions. The candidate is   ║
║   operationally blocked for hot-fill and microwave applications.                         ║
║ • If Questioned: "PackShift proves why virgin plastic calculation alone is dangerous.    ║
║   On paper, the Duni container cuts virgin plastic by 83.78%. But our operational gate   ║
║   immediately blocks it because Duni's DoC caps temperature at 70°C and prohibits        ║
║   microwave use, failing the 95°C requirement."                                          ║
╚══════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 9. Source Retrieval Status & Fallback Table

During live demonstrations, external URLs may fail due to corporate website redesigns, CDN bot blocks, or transient downtime. The table below documents verified retrieval status, legacy URLs, and reproducible official lookup paths.

| Source Entity | Document / Resource | Dataset Stale/Legacy URL | Current Web Status | Exact Document Location / Identifying Fields | Reproducible Official Lookup Path | Committed Local Artifact Status | Presenter Action if Challenged |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Coca-Cola HBC AG** | *Green Finance Report* (Sep 2023) | `https://www.coca-colahellenic.com/content/dam/cch/us/documents/investors-and-financial/debt-investors/Green%20Finance%20Report%20-%20September%202023.pdf` | `LIVE (200 OK)` | Page 18, Footnote 2 (19.5g body, 2.5g closure); Page 15 (preforms); Page 19 (methodology). | Official corporate investor relations website: Debt Investors → Green Finance Documentation archive. | *No committed local fallback in repository.* | Direct judge to official PDF live URL, Page 18, Footnote 2. |
| **Berry Global / Superfos** | UniPak 360ml Round Technical Specification | `https://www.berryglobal.com/en/product/5226` | `404 (Stale URL)` | Product Code 5226: Weight 14.8g (body only), Raw material PP, 95°C hot fill, microwave safe. | Berry Global official website: Product Catalog → Search "UniPak Round Container 360 ml Ø 118 mm" (Product Code 5226). | *No committed local fallback in repository.* | State: "The dataset URL is legacy due to site restructuring; Product 5226 is Berry's standard UniPak 118mm 360ml injection-molded PP pot (14.8g body)." |
| **Duni Group / BioPak** | Deli Hinged 375ml Technical Datasheet & DoC | `https://www.duni.com/en/products/deli-hinged-375-ml-transparent-1-comp-205971` | `404 / CDN Restricted (Stale URL)` | Article Number 205971: Piece gross weight 12.0g, 80% rPET, max 70°C for 2h, not microwave safe. | Duni Group official portal: Product Catalog / Duni MediaBank → Search Article "205971" (Deli Hinged 375 ml). | *No committed local fallback in repository.* | State: "The direct URL is restricted by CDN; Duni's official MediaBank Declaration of Compliance for Article 205971 declares 12.0g, 80% rPET, 70°C limit, and microwave prohibition." |
| **European Commission** | *Regulation (EU) 2022/1616* (Recycled Plastics FCM) | `https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R1616` | `LIVE (200 OK)` | Articles 3, 4, 6 (Decontamination technology criteria and quality monitoring). | EUR-Lex Official Journal of the European Union, CELEX 32022R1616. | *No committed local fallback in repository.* | Reference official EUR-Lex portal for EU legal framework on mechanical food-contact recycling. |

---

## 10. Audit of Regulatory & Physical Hazard Claims

In earlier drafts of project documentation, enthusiastic language about thermal failure and regulatory compliance bordered on unsubstantiated overclaiming. This audit reconciles repo documentation with Challenge Canon and Product Canon rules.

### 10.1 "Structural Collapse and Scalding" vs Documented Operational Mismatch
- **Previous Wording:**
  > *"If an operator or consumer uses this container for hot food packaging, soup hot-filling, or microwave reheating, the material suffers immediate thermal deformation, softening, and structural collapse, creating severe scalding and leaking hazards."*
- **Audit Assessment:** **EXCESSIVE / SPECULATIVE HAZARD FORECASTING**.
  - While amorphous PET (APET) has a glass transition temperature ($T_g$) around 67°C–70°C and will soften when exposed to liquid above this temperature, PackShift is not a physical failure forensics simulator.
  - Asserting "severe scalding and leaking hazards" in an analytical software tool exceeds the evidence provided by manufacturer datasheets.
- **Canon Rule Alignment:**
  - `docs/canon/challenge_canon.md`: *"PackShift evaluates eligibility against explicit operational constraints. It does not certify physical danger or provide accident liability analysis."*
- **Corrected Formulation:**
  > *"The Duni Deli Hinged container has a manufacturer-documented temperature ceiling of +70°C for up to 2 hours, and is explicitly designated as not microwave safe. Subjecting the container to 95°C hot-fill or microwave reheating exceeds the manufacturer-documented operational envelope. PackShift's operational gate flags this as an operational incompatibility block."*

### 10.2 "Regulation (EU) 2022/1616 Compliance" vs Food Contact Suitability
- **Previous Implication:** Citations of Regulation (EU) 2022/1616 implied that citing the regulation proved the candidate's food-contact suitability.
- **Audit Assessment:** **LEGAL / REGULATORY OVERCLAIM**.
  - Regulation (EU) 2022/1616 governs the authorization of recycling processes and decontamination technologies. It does not certify that a specific finished article is compliant with all food contact requirements for a specific customer's recipe.
  - Specific migration limits (SML) depend on food stimulants (fatty vs aqueous vs acidic), contact duration, and temperature.
- **Canon Rule Alignment:**
  - `backend/app/services/virgin_plastic.py` explicitly injects an advisory finding:
    `food-contact-suitability: REVIEW_REQUIRED (NOT_VERIFIED)`
    *"Food-contact suitability, food safety, shelf life and implementation suitability are NOT VERIFIED. This calculation is not an approval or legal verdict."*
- **Corrected Formulation:**
  > *"PackShift cites Regulation (EU) 2022/1616 to illustrate the regulatory framework governing post-consumer rPET decontamination. However, PackShift automatically outputs an advisory finding marking food-contact suitability as REVIEW_REQUIRED, because software calculations cannot substitute for laboratory migration testing."*

---

## 11. Remaining UNKNOWNs

To maintain epistemic honesty, PackShift explicitly catalogues all factors that remain unproven or unknown.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        WHAT IS STILL NOT PROVEN                        │
├────────────────────────────────────────────────────────────────────────┤
│ • Actual Bill-of-Materials & Resin Mix of Client Packaging.           │
│ • Migration Testing Results Under Specific High-Fat / Acidic Foods.    │
│ • Production Line Performance (Denesting, Sealing Speed, Capping).    │
│ • Unmodeled Secondary Components (Inks, Glues, Tamper Seals).          │
│ • Commercial Availability & Contract Pricing of Food-Grade rPET vs    │
│   virgin polymers.                                                     │
│ • Supplier Minimum Order Quantities (MOQ) & Regional Allocation Quotas.│
│ • Municipal End-of-Life Sorting & Real-World Recycling Infrastructure  │
│   Recovery Rates in Client Geographies.                                │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 12. Stretch Goal: Judge Evidence Backup Plan

Detailed, defensible scripted answers to five challenging judge questions.

### Question 1: *"Coca-Cola HBC is a massive multinational. How can you claim their numbers represent standard packaging for other companies?"*
- **Defensible Response:**
  > *"We do not claim Coca-Cola HBC's numbers represent all beverage packaging. In fact, our public evidence pack explicitly labels this scenario as an illustrative public case study. The 19.5g body and 2.5g closure are reported portfolio averages from Coca-Cola HBC's Green Finance Report (September 2023, page 18, Footnote 2; verification state `SOURCE_AVAILABLE`). While the Green Finance Report contains a PwC limited assurance report, that assurance scope strictly covers quantitative Use of Proceeds allocations and explicitly does not cover the Impact Report or packaging metrics. The 19.5g and 2.5g figures are CCHBC-reported internal portfolio metrics (`SOURCE_AVAILABLE`), not audited or externally assured impact numbers. When deployed for a private client like Profi, PackShift replaces these public reference numbers with the client's actual bill-of-materials. The calculation engine remains identical, but the provenance changes."*

### Question 2: *"In Case B, you're comparing a 14.8g pot body without a lid to a 12.0g complete hinged container with a lid. Isn't that an apples-to-oranges comparison?"*
- **Defensible Response:**
  > *"You are entirely correct, and PackShift explicitly highlights that asymmetry rather than hiding it. Berry's technical datasheet (Product 5226) only certifies the pot body weight at 14.8g because the lid is sold separately. In our documentation and UI disclosures, we explicitly state that the 83.78% virgin plastic reduction applies strictly to the represented components under explicit baseline assumptions. In accordance with our core principle that missing data does not equal zero, we refuse to fabricate an assumed lid weight. Furthermore, our operational gate blocks this transition anyway due to thermal and microwave incompatibility, demonstrating that numerical savings on paper never override operational reality."*

### Question 3: *"Why does your system output 88.64% reduction for Case A when public marketing claims Coca-Cola uses 100% rPET bottles?"*
- **Defensible Response:**
  > *"That distinction is precisely why PackShift exists. Consumer marketing often advertises '100% rPET bottles', but from a packaging engineering standpoint, the complete package includes the closure. The CCHBC report documents average body (19.5g) and closure (2.5g) masses. While CCHBC reports in-house rPET preform investments for bottle bodies, the report is silent on closure conversions. In PackShift, the candidate closure is modeled with 2.5g virgin mass (0.0 recycled fraction) as an explicit domain assumption. Under these modeled inputs, complete package virgin plastic drops from 22.0g to 2.5g (-88.64%), rather than 100%. PackShift prevents companies from making misleading complete-package claims, while being transparent about which values are source-backed versus modeled assumptions."*

### Question 4: *"Can an operator use PackShift's output to certify legal compliance under EU Food Contact Regulation 2022/1616?"*
- **Defensible Response:**
  > *"Absolutely not. PackShift is a decision-support calculation tool, not a legal or laboratory certifier. Under our decision policy, every scenario output automatically includes an advisory finding marking food-contact suitability as REVIEW_REQUIRED with verification state NOT_VERIFIED. While our evidence ledger cites Regulation (EU) 2022/1616 and Duni's Declaration of Compliance, software calculations cannot replace laboratory specific migration testing under Regulation (EU) 10/2011 for an operator's specific food matrices."*

### Question 5: *"Both of your URLs for Case B return 404 or access errors. How can we verify these numbers are real?"*
- **Defensible Response:**
  > *"Manufacturer product URLs frequently change during website restructuring, which is why PackShift maintains an explicit Source Retrieval Status and Fallback Table. For Berry Product 5226, the product is standard UniPak 118mm round pot documented in Berry Superfos's technical catalog. For Duni Article 205971, the technical specifications are drawn directly from Duni's official Declaration of Compliance and technical datasheet, which declares a piece gross weight of 12.0g, 80% rPET, a 70°C / 2h ceiling, and explicit microwave unsuitability. We have documented these verbatim in our Source-to-Value Matrix with reproducible catalog/DoC lookup paths."*

---
*End of Document A1-source-to-value-substantiation.md*
