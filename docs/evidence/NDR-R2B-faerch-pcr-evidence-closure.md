# NDR-R2B — Faerch Numeric PCR Evidence Closure
## Defensible Public Evidence Closure for Selection MVP Candidates A & B

**Document Version:** 1.2.0 (Current-Main Reconciliation Revision)
**Work Class:** AMPLIFIER / EVIDENCE RESEARCH / DECISION SUPPORT
**Owner:** Mister Ressentiment (`@Mr-Ressentiment`)
**Base Commit:** `20f50983bae76bae14b86d03fea4eea764801ee7` (`origin/main` at research start)
**Reconciled Main Commit:** `994e352adee7e5eb5e90dbb38aad6f4c3aa1223e` (`origin/main` with merged IGR-R2B Selection MVP)
**Task Branch:** `mister-ressentiment/ndr-r2b-faerch-pcr-evidence`
**Target Pull Request:** PR #16 (`Slave-of-Skynet/gigafood/pull/16`)
**Primary Deliverable:** `docs/evidence/NDR-R2B-faerch-pcr-evidence-closure.md`
**Target Repository:** `Slave-of-Skynet/gigafood`
**Inspected Reference Documents:**
- `docs/review/INT-R2-selection-mvp-contract.md`
- `docs/evidence/IGR-R2A-candidate-portfolio-recon.md`
- `docs/evidence/A1-source-to-value-substantiation.md`
- `docs/canon/challenge_canon.md`
- `docs/canon/product_canon.md`
- `docs/canon/decision_policy.md`
- `docs/canon/open_questions.md`
- `docs/evidence_semantics.md`

---

> [!IMPORTANT]
> **EPISTEMIC BOUNDARY & ANTI-GREENWASHING MANDATE**
> This document closes the numeric Post-Consumer Recyclate (PCR) evidence investigation for the accepted Faerch Selection MVP portfolio.
> In accordance with PackShift core tenets:
> - `CALCULATED ≠ VERIFIED`
> - `SOURCE_AVAILABLE ≠ VERIFIED`
> - `NOT_VERIFIED ≠ FALSE`
> - `missing ≠ 0`
> - `PUBLIC ≠ PROVIDER`
> - `ILLUSTRATIVE ≠ PUBLIC`
> - `environmental calculation ≠ operational eligibility ≠ implementation approval`
>
> A negative research result (`NON_POINT_EVIDENCE_ONLY` or `NO_CURRENT_SKU_EVIDENCE_FOUND`) is an authoritative evidence closure, **not** a task failure. PackShift explicitly refuses to invent numbers, extrapolate marketing ceilings, or transform unknown values into zero.

---

## Current-main reconciliation

**Original research base:**
`20f50983bae76bae14b86d03fea4eea764801ee7`

**Reconciled against current main:**
`994e352adee7e5eb5e90dbb38aad6f4c3aa1223e`

The merged IGR-R2B Selection MVP remains consistent with NDR-R2B:

**Candidate A:**
- `INSUFFICIENT_DATA` + `REVIEW_REQUIRED`
- PCR point value unavailable

**Candidate B:**
- `INSUFFICIENT_DATA` + `BLOCKED` under the modeled 95°C context
- PCR point value unavailable
- Microwave capability remains `UNKNOWN`

No runtime/data/shared-contract change is required by NDR-R2B.

---

## 1. Executive Summary & Research Verdicts

### 1.1 Core Mission & Question
This investigation answered the central numeric evidence question posed by INT-R2 for the Faerch prepared-food packaging portfolio:

> **Do we have a defensible current SKU/recipe-level recycled-content point value for Candidate A and/or Candidate B that PackShift may use for deterministic virgin-plastic calculation?**

### 1.2 Summary of Findings

| Packaging Item | Article & Recipe | Investigated Material | Investigated Property | Authoritative Public Finding | Epistemic Verdict | Runtime Status Impact |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Candidate A** | Faerch C 2200-1L<br>Item `2200012097` | CPET Evolve<br>Recipe `6811` | Numeric PCR / Recycled Content Point Value | Manufacturer-authored TDS hosted by Dayton Group (09-01-2023, Tier B) explicitly withholds fluctuating percentage and directs buyers to Compliance/Sales. Corporate launch mentions "up to 70%" (ceiling) and "min 40% Tray rPET" (floor for UK/IE launch). | **`NON_POINT_EVIDENCE_ONLY`**<br>(PCR = `UNKNOWN`) | Calculation remains **`INSUFFICIENT_DATA`**.<br>Eligibility remains **`REVIEW_REQUIRED`** (unverified operational premises). |
| **Candidate B** | Faerch K 2182-1G<br>Item `2182015004` | APET Clear<br>Recipe `7900` | Numeric PCR / Recycled Content Point Value | Manufacturer-authored TDS hosted by H.C. Emballage (25-06-2025, Tier B) explicitly withholds fluctuating percentage. No applicable current SKU/recipe-level point value was found in the public sources covered by this research. | **`NO_CURRENT_SKU_EVIDENCE_FOUND`**<br>(PCR = `UNKNOWN`) | Calculation remains **`INSUFFICIENT_DATA`**.<br>Eligibility remains **`BLOCKED`** ($70^\circ\text{C} < 95^\circ\text{C}$ demo requirement). |
| **Candidate B (Secondary)** | Faerch K 2182-1G<br>Item `2182015004` | APET Clear<br>Recipe `7900` | Microwave Heating Suitability | Manufacturer TDS cooking field states verbatim: *"Not ovenable"*. No located public sheet declares `microwave = true` or `microwave = false`. | **`UNKNOWN`**<br>(*Not ovenable* does not imply microwave capability) | Retains **`UNKNOWN`**.<br>Candidate B is already independently **`BLOCKED`** by service temperature in the demo context. |

### 1.3 Key Epistemic Conclusion
No applicable current SKU/recipe-level point value was found in the public sources covered by this research for either Candidate A (recipe `6811`) or Candidate B (recipe `7900`).

Faerch's official Technical Product Sheets explicitly disclose that post-consumer PET formulation fluctuates year-to-year and instruct clients to request annual recipe declarations from Sales or Compliance.

**Therefore, PackShift's refusal to calculate virgin plastic reduction deltas for Candidate A and Candidate B is not a software omission, but an essential anti-greenwashing protection.**

---

## 2. Core Epistemic Tenets & Anti-Greenwashing Invariants

The evaluation of discovered evidence enforces seven non-negotiable invariants established in `docs/evidence_semantics.md` and `docs/canon/decision_policy.md`:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        CORE EPISTEMIC TENETS                           │
├────────────────────────────────────────────────────────────────────────┤
│ 1. CALCULATED ≠ VERIFIED                                               │
│    A formula result is not empirical proof of physical performance.    │
│                                                                        │
│ 2. SOURCE_AVAILABLE ≠ VERIFIED                                         │
│    A published PDF establishes existence, not operational validity.   │
│                                                                        │
│ 3. NOT_VERIFIED ≠ FALSE                                                │
│    An unverified parameter is an evidence gap, not an operational defect│
│                                                                        │
│ 4. missing ≠ 0                                                         │
│    An unstated recycled content fraction is UNKNOWN, never 0.00.       │
│                                                                        │
│ 5. PUBLIC ≠ PROVIDER                                                   │
│    Public datasheets cannot substitute for private client batch tests. │
│                                                                        │
│ 6. ILLUSTRATIVE ≠ PUBLIC                                               │
│    Synthetic demo fixtures must never be confused with manufacturer TDS│
│                                                                        │
│ 7. environmental calculation ≠ operational eligibility ≠ approval      │
│    These three decision axes are strictly orthogonal.                  │
└────────────────────────────────────────────────────────────────────────┘
```

Furthermore, PackShift strictly prohibits:
1. Converting marketing ceilings ("up to 70%") into deterministic point inputs;
2. Equating circular sub-metrics ("minimum 40% Tray rPET") with total post-consumer recyclate (PCR);
3. Transferring historical 2021 recipe tables to 2023–2025 SKUs;
4. Promoting material-family claims (CPET/APET) to SKU-level facts;
5. Equating theoretical collection recyclability ("100% recyclable") with existing recycled content;
6. Assuming that "Not ovenable" implies microwave incompatibility.

---

## 3. Primary Research Coverage & Methodology

### 3.1 Search Methodology & Queries Executed
Systematic automated and manual retrieval covered manufacturer domains (`faerch.com`, `faerchplast.com`), primary distributor repositories (`daytongroup.fi`, `bunzlireland.ie`, `hc.dk`), regulatory databases, and packaging industry publications.

Queries executed during this research session:
```text
Candidate A Searches:
• "2200012097" Faerch
• "C 2200-1L" Faerch
• "6811" Faerch CPET
• "recipe 6811" Faerch PCR
• "6811" "Faerch" "recycled" OR "PCR"
• site:faerch.com "2200012097" OR "C 2200-1L" OR "6811"
• site:daytongroup.fi "Faerch" "6811"
• site:daytongroup.fi "CPET St. Evolve" "6811"

Candidate B & Secondary Searches:
• "2182015004" Faerch
• "K 2182-1G" Faerch
• "7900" Faerch APET
• "recipe 7900" Faerch PCR
• "7900" "Faerch" "recycled" OR "PCR" OR "rPET"
• site:faerch.com "2182015004" OR "K 2182-1G" OR "7900"
• "2182015004" microwave OR mikrobølgeovn
• "K 2182-1G" microwave OR mikrobølgeovn OR mikrobølgeegnet
• "APET" "microwave" site:faerch.com
• site:faerch.com "APET" "-40" "70"

General Policy & Historical Searches:
• "Faerch" "Recycled Content Declaration" OR "Recycled PET in Food Packaging"
• "Faerch" "recycled content" "fluctuate" OR "fluctuates" OR "third-party audit"
• site:bunzlireland.ie "152408-SPECS.pdf"
```

### 3.2 Primary Documents Retrieved & Inspected
All primary PDF documents were retrieved and programmatically decoded at the stream and glyph level:
1. **Faerch C 2200-1L Product Sheet (09-01-2023):** Manufacturer-authored original document retrieved from Dayton Group host (Tier B). Decoded using embedded font CMap (CIDInit / Aspose-Identity-UCS). All 3 pages inspected.
2. **Faerch K 2182-1G Product Sheet (25-06-2025):** Manufacturer-authored original document retrieved from HC host (Tier B). Decoded using embedded Adobe UCS CMAPs across linearized page streams. All 3 pages inspected.
3. **Faerch Corporate Launch Press Release (20-11-2024):** Fetched live from `faerch.com` (Tier C). Full text analyzed.
4. **Faerch Historical Product Sheet Appendix (07-09-2021):** Retrieved from Bunzl Ireland host (Doc ID 152408-SPECS, Tier B). Form XObject stream 9 decoded via byte-shift algorithm.
5. **Faerch CPET Material Platform:** Fetched from `faerch.com/en/products/ready-meals/cpet` (Tier C).

---

## 4. Candidate A Investigation: Faerch C 2200-1L / Recipe 6811

### 4.1 Article Identity & Stated Properties
- **Product Name:** Faerch C 2200-1L Evolve CPET
- **Item Number:** `2200012097` (EAN: `5703969041835`)
- **Material & Recipe:** CPET, Evolve colour, Recipe `6811`
- **Datasheet Issue Date:** `09-01-2023`
- **Tray Body Nominal Mass:** $21.38\text{ g} \pm 10\%$
- **Nominal Capacity:** $1000\text{ ml}$ (Dimensions: $199.9 \times 154.8 \times 47.1\text{ mm}$)
- **Documented Thermal Envelope:** $-40^\circ\text{C}$ to $+220^\circ\text{C}$ ($T_{\max} = 220^\circ\text{C}$)
- **Cooking Suitability Field:** **`Oven/Microwave`** (dual-ovenable affirmed)
- **Component Boundary:** Rigid tray body only. Top sealing film and snap-on lids are excluded from declared weight.

### 4.2 Recycled Content Statement on Official Datasheet
Page 3 of the official Technical Product Sheet for item `2200012097` contains an explicit section titled **"Recycled Content"**:

> *"Recycled Content: Faerch is committed to full transparency when communicating recycled content, and has established third party auditing recycled PET (rPET) content on an annual basis. As recycled PET (rPET) content can fluctuate year to year, please contact your Compliance or Sales contact for the most up to date recycled PET (rPET) content figure for this recipe. For more information on why recycled content fluctuates year on year, or the ISO definitions of recycled PET (rPET), post-consumer content, and pre-consumer content, please see our documents “Recycled PET in Food Packaging” & “Recycled Content Declaration”"*

**Finding:** The located manufacturer datasheet deliberately **withholds** a static numeric recycled content fraction on the product sheet itself, acknowledging annual supply fluctuations and directing the customer to request an up-to-date declaration from Compliance/Sales for this recipe.

### 4.3 Evaluation of Corporate Press Release Claims
In a global corporate release dated 20 November 2024 (*"Faerch launches chilled ready meal trays with minimum 40% Tray rPET content"*), Faerch makes two headline statements:
1. *"In 2019, Faerch launched Evolve by Faerch for the Ready Meals market, a recipe that allows for up to 70% post-consumer recycled content, including mixed colour 'jazz' bottle flakes."*
   - **Form:** Ceiling ("up to 70%").
   - **Scope:** Generic technology platform launch (Evolve family), not item `2200012097`.
   - **Metric:** Post-consumer recycled content.
   - **Epistemic Test:** An engineering maximum of 70% does not prove that recipe `6811` as manufactured in 2023–2026 contains 70%, 50%, or 30%. Ingesting $0.70$ is greenwashing.
2. *"With the recent expansion of its Cirrec recycling facility, Faerch will, starting January 1, 2025, introduce a minimum of 40% Tray rPET in CPET trays for chilled ready meals in the UK & Ireland..."*
   - **Form:** Minimum / threshold ("minimum of 40%").
   - **Scope:** UK & Ireland geographic market; chilled ready meals category. Item `2200012097` is not named.
   - **Metric:** **`Tray rPET`** (closed-loop tray-to-tray recyclate from post-consumer pots, tubs, and trays), which is a specific circular subset, **not** total PCR. Total PCR additionally includes bottle rPET.
   - **Epistemic Test:** A minimum floor of 40% Tray rPET cannot be ingested as a total PCR point value of $0.40$.

### 4.4 Evaluation of Historical 2021 Recipe Tables
Faerch's historical technical product sheet appendix dated 07-09-2021 (Bunzl 152408-SPECS) contained a table titled *"Post-consumer recycled content"*:
- *"CPET Standard\* 69-75% PCR"* (with footnote: *"Dual colour applications will have a lower rPET percentage due to the complexity of the structure"*).
- **Finding:** Older generic/historical ranges were not applied because they are not mapped to the exact current SKU/recipe and do not provide a usable point value. Furthermore, the latest exact-SKU sheet located in this research is dated 09-01-2023 and explicitly states that recycled content fluctuates annually, so historical 2021 ranges cannot establish a current PCR point value.

### 4.5 Candidate A Evidence Ledger

| Field | Record |
| :--- | :--- |
| **Candidate** | Candidate A |
| **Item Number** | `2200012097` |
| **Recipe** | `6811` (CPET Evolve) |
| **Primary Source Entity** | Faerch A/S (hosted by Dayton Group Oy) |
| **Document Title** | Technical Product Sheet: C 2200-1L Evolve CPET |
| **Source URL** | `https://verkkokauppa.daytongroup.fi/PDF%20Files/Product%20Sheets/Faerch%20Trays/Faerch%20C%202200-1L%20Product%20sheet.pdf` |
| **Publication Date** | `09-01-2023` |
| **Retrieval Date** | `2026-09-26` (Session verified) |
| **Exact Scope** | Specific SKU (`2200012097`) and recipe (`6811`) |
| **Recycled Content Statement** | *"As recycled PET (rPET) content can fluctuate year to year, please contact your Compliance or Sales contact for the most up to date recycled PET (rPET) content figure for this recipe."* |
| **Numeric Form** | **NONE** (Deferred to Sales/Compliance recipe declaration) |
| **Metric Scope** | Not disclosed on sheet (refers to ISO PCR/PIR definitions) |
| **Temporal Status** | The latest exact-SKU sheet located in this research is dated 09-01-2023. Because Faerch states that recycled content can fluctuate annually, the sheet does not establish a current 2026 PCR point value. |
| **Source Strength Tier** | **Tier B** (Acceptable manufacturer-authored primary-document hosting; Dayton Group host) |
| **Runtime Usability** | **NO** (Cannot populate numeric fraction; must remain `UNKNOWN`) |
| **Reason** | The located TDS does not publish a numeric point value. Extrapolating generic marketing ceilings ("up to 70%") or regional launch floors ("minimum 40% Tray rPET") violates anti-greenwashing invariants. |

### 4.6 RQ1–RQ4 Explicit Answers (Candidate A)
- **RQ1 (Exact Point Value):** **NO.** No applicable current SKU/recipe-level point value was found in the public sources covered by this research for item `2200012097` or recipe `6811`.
- **RQ2 (Recycled Content Scope):** Discovered marketing mentions distinguish `TOTAL_PCR` (corporate Evolve ceiling) from `TRAY_RPET` (closed-loop tray recyclate minimum). Neither provides a SKU point value.
- **RQ3 (Temporal Applicability):** The latest exact-SKU sheet located in this research is dated 09-01-2023. Because Faerch states that recycled content fluctuates annually, the sheet does not establish a current 2026 PCR point value. Older generic/historical ranges were not applied because they are not mapped to the exact current SKU/recipe and do not provide a usable point value.
- **RQ4 (Article Applicability):** The datasheet applies to the exact item `2200012097`. The "up to 70%" and "40% Tray rPET" statements apply only to generic technology platforms and regional launch programs.

### 4.7 Candidate A Research Conclusion
```text
CANDIDATE A CONCLUSION: NON_POINT_EVIDENCE_ONLY
Current SKU/recipe PCR point value: UNKNOWN
```

---

## 5. Candidate B Investigation: Faerch K 2182-1G / Recipe 7900

### 5.1 Article Identity & Stated Properties
- **Product Name:** Faerch K 2182-1G Clear APET
- **Item Number:** `2182015004` (EAN: `5703969013399`)
- **Material & Recipe:** APET, Clear, Recipe `7900`
- **Datasheet Issue Date:** `25-06-2025`
- **Tray Body Nominal Mass:** $21.48\text{ g} \pm 10\%$
- **Nominal Capacity:** $895\text{ ml}$ (Dimensions: $180.1 \times 99.9 \times 75.9\text{ mm}$)
- **Documented Thermal Envelope:** $-40^\circ\text{C}$ to $+70^\circ\text{C}$ ($T_{\max} = 70^\circ\text{C}$, documented directly on TDS)
- **Cooking Suitability Field:** **`Not ovenable`** (documented directly on TDS)
- **Component Boundary:** Rigid tray body only. Lids and sealing films excluded.

### 5.2 Recycled Content Statement on Official Datasheet
Page 3 of the official Technical Product Sheet for item `2182015004` (dated 25-06-2025) contains the identical standard disclosure:

> *"Recycled Raw Materials: The majority of Faerch APET, CPET, MAPET® and MAPET® II packaging contains recycled PET (rPET). All raw materials used in the manufacture of Faerch products are certified suitable for direct food contact.*
> *Recycled Content: Faerch is committed to full transparency when communicating recycled content, and has established third party auditing recycled PET (rPET) content on an annual basis. As recycled PET (rPET) content can fluctuate year to year, please contact your Compliance or Sales contact for the most up to date recycled PET (rPET) content figure for this recipe..."*

**Finding:** As with Candidate A, the manufacturer does not publish a static numeric point value for recipe `7900` on the technical product sheet.

### 5.3 Candidate B Secondary Target: Microwave Capability Investigation
PackShift's demonstration context requires consumer microwave reheating (`microwave_safe = true`).
The investigation specifically targeted whether authoritative evidence establishes `microwave = true` or `microwave = false` for item `2182015004` / recipe `7900`:

1. **Datasheet Cooking Field:** Stated as *"Not ovenable"*.
   - In culinary and packaging terminology, "ovenable" refers to conventional radiant, fan, or convection ovens.
   - Denying conventional oven use does **not** logically or legally declare whether microwave reheating is acceptable or prohibited.
2. **Thermal Envelope Documented on TDS:**
   - Candidate B TDS explicitly documents the thermal envelope as $-40^\circ\text{C}$ to $+70^\circ\text{C}$.
3. **Format vs. Material Disambiguation:**
   - Distributor listings for tray geometry "2182-1G" produced in **Polypropylene (PP)** state "mikrobølgeovnsegnet" (microwave safe).
   - This capability belongs to the PP material variant (which has $T_{\max} = 121^\circ\text{C}$), **not** to the APET clear item `2182015004`.
4. **Epistemic Result:**
   - Because no manufacturer datasheet or declaration explicitly affirms `microwave = true` or explicitly states `microwave = false` for item `2182015004`, PackShift must record:
     $$\text{microwave\_capability} = \mathbf{UNKNOWN}$$
   - **Crucially:** Candidate B is already independently **`BLOCKED`** under the stated modeled $95^\circ\text{C}$ demo operating context because its documented maximum service temperature ($70^\circ\text{C}$) is below the assumed $95^\circ\text{C}$ requirement ($70^\circ\text{C} < 95^\circ\text{C}$). This thermal constraint resolves the decision without needing to guess or infer microwave capability.

### 5.4 Candidate B Evidence Ledger

| Field | Record |
| :--- | :--- |
| **Candidate** | Candidate B |
| **Item Number** | `2182015004` |
| **Recipe** | `7900` (APET Clear) |
| **Primary Source Entity** | Faerch A/S (hosted by H.C. Emballage / HC DK) |
| **Document Title** | Technical Product Sheet: K 2182-1G Clear APET |
| **Source URL** | `https://www.hc.dk/.0/pp-static/prodimages/Datablade/datablad_140380.pdf` |
| **Publication Date** | `25-06-2025` |
| **Retrieval Date** | `2026-09-26` (Session verified) |
| **Exact Scope** | Specific SKU (`2182015004`) and recipe (`7900`) |
| **Recycled Content Statement** | *"As recycled PET (rPET) content can fluctuate year to year, please contact your Compliance or Sales contact for the most up to date recycled PET (rPET) content figure for this recipe."* |
| **Numeric Form** | **NONE** (Withheld) |
| **Metric Scope** | Not disclosed on sheet |
| **Temporal Status** | The latest exact-SKU sheet located in this research is dated 25-06-2025. Because Faerch states that recycled content can fluctuate annually, the sheet does not establish a current 2026 PCR point value. |
| **Source Strength Tier** | **Tier B** (Acceptable manufacturer-authored primary-document hosting; H.C. Emballage host) |
| **Runtime Usability** | **NO** (Cannot populate numeric fraction; must remain `UNKNOWN`) |
| **Reason** | No applicable current SKU/recipe-level point value was found in the public sources covered by this research. Documented maximum temperature (70°C) independently blocks the candidate under the stated modeled 95°C demo context. |

### 5.5 RQ1–RQ4 Explicit Answers (Candidate B)
- **RQ1 (Exact Point Value):** **NO.** No applicable current SKU/recipe-level point value was found in the public sources covered by this research for item `2182015004` or recipe `7900`.
- **RQ2 (Recycled Content Scope):** Datasheet mentions that "the majority of APET contains rPET", but publishes no specific metric breakdown for recipe `7900`.
- **RQ3 (Temporal Applicability):** The latest exact-SKU sheet located in this research is dated 25-06-2025. Because Faerch states that recycled content fluctuates annually, the sheet does not establish a current 2026 PCR point value. Older generic/historical ranges were not applied because they are not mapped to the exact current SKU/recipe and do not provide a usable point value.
- **RQ4 (Article Applicability):** Datasheet applies directly to item `2182015004`.
- **Microwave Finding:** Stated as "Not ovenable". Remains **`UNKNOWN`**.

### 5.6 Candidate B Research Conclusion
```text
CANDIDATE B CONCLUSION: NO_CURRENT_SKU_EVIDENCE_FOUND
Current SKU/recipe PCR point value: UNKNOWN
Microwave capability: UNKNOWN
Operational Status under 95°C Demo Context: BLOCKED
(Operational incompatibility for the evaluated 95°C context because documented 70°C < 95°C requirement;
not a universal material verdict. Microwave remains UNKNOWN and is not required to establish the thermal block).
```

---

## 6. Rejected Evidence & Anti-Greenwashing Trap Analysis

This research explicitly tested and rejected seven potential evidence substitutions:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   REJECTED EVIDENCE & TRAP AUDIT                       │
├────────────────────────────────────────────────────────────────────────┤
│ TRAP A: "up to 70%"                                                    │
│ REJECTED: Ceiling/maximum from 2019/2024 press releases.               │
│ Reason: An upper boundary is not a deterministic point input.          │
│                                                                        │
│ TRAP B: "minimum 40% Tray rPET"                                        │
│ REJECTED: Regulatory/circular floor from 2024 UK/IE launch.            │
│ Reason: Minimum threshold ≠ point value; Tray rPET ≠ total PCR.        │
│                                                                        │
│ TRAP C: 2021 Historical Appendix Bands ("69-75% PCR")                  │
│ REJECTED: 2021 table from Bunzl 152408.                                │
│ Reason: Unmapped historical range; not applicable as a current SKU/    │
│ recipe point value, while later exact-SKU sheets state that recycled   │
│ content fluctuates annually.                                           │
│                                                                        │
│ TRAP D: PP Geometry Microwave Transfer to APET                         │
│ REJECTED: Distributor listings declaring "2182-1G" microwave-safe.     │
│ Reason: Applies to PP version (121°C), not APET Clear 7900 (70°C).    │
│                                                                        │
│ TRAP E: Recycled Content ≠ Post-Consumer Recyclate (PCR)               │
│ REJECTED: Conflating post-industrial scrap with post-consumer resin.   │
│ Reason: ISO 14021 and EN 15343 require strict separation.              │
│                                                                        │
│ TRAP F: "100% Recyclable" ≠ 100% Recycled Content                      │
│ REJECTED: Treating collection recyclability as existing recycled resin.│
│ Reason: Recyclability declares end-of-life stream, not resin origin.   │
│                                                                        │
│ TRAP G: "Not Ovenable" ≠ "Not Microwaveable"                           │
│ REJECTED: Assuming negative conventional oven rating implies microwave.│
│ Reason: Logic fallacy. Microwave remains UNKNOWN.                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Runtime Implications Analysis

> [!NOTE]
> This analysis describes the architectural and runtime consequences of this research closure for the Integrator and future PRs. **NDR-R2B makes zero code, API, or data changes.**

### 7.1 If Candidate A Had Obtained a Defensible Point PCR
If a defensible, source-backed current SKU/recipe point value were established (e.g. $0.62$ PCR):
- Environmental calculation: Would transition from `INSUFFICIENT_DATA` to `CALCULATED`.
  $$\text{virgin\_plastic}_{\text{candidate\_A}} = 21.38\text{ g} \times (1 - 0.62) = 8.12\text{ g}$$
  $$\Delta_{\text{reduction}} = 26.29\text{ g} - 8.12\text{ g} = 18.17\text{ g}\quad (69.1\%\text{ reduction})$$
- Operational eligibility: Would **still remain `REVIEW_REQUIRED`**. Under PackShift's orthogonal decision architecture, operational premises (assumed 95°C service temperature, microwave reheating requirement) remain unverified demo assumptions. A calculable green saving never grants automatic operational approval.

### 7.2 If Candidate B Had Obtained a Defensible Point PCR
If a defensible, source-backed current SKU/recipe point value were established for Candidate B:
- Environmental calculation: Would transition from `INSUFFICIENT_DATA` to `CALCULATED`.
- Operational eligibility: Would **remain strictly `BLOCKED`** under the evaluated context.
  $$\text{Documented } T_{\max} = 70^\circ\text{C} < \text{Assumed Requirement } 95^\circ\text{C}$$
- Under no circumstances may an environmental calculation override an operational constraint incompatibility. Candidate B is BLOCKED under the stated modeled 95°C operating context because its documented maximum temperature is 70°C. This is an operational incompatibility for that evaluated context, not a universal material/product verdict.

### 7.3 Actual State: Neither Candidate Has Public Point PCR
Because public manufacturer evidence withholds static point values:
```text
Candidate A (C 2200-1L):
• Environmental Calculation: INSUFFICIENT_DATA (PCR unknown)
• Operational Eligibility:   REVIEW_REQUIRED (Numerically satisfies 220°C >= 95°C & MW; premises unverified)
• Human Next Action:         Request a current Recipe 6811 declaration from Faerch Sales or Compliance.

Candidate B (K 2182-1G):
• Environmental Calculation: INSUFFICIENT_DATA (PCR unknown)
• Operational Eligibility:   BLOCKED (Documented 70°C < 95°C demo requirement)
• Human Next Action:         Treat candidate as BLOCKED for the evaluated 95°C operating context;
                             evaluate for ambient/chilled applications where documented 70°C limit is respected.
```

This outcome provides the exact demonstration posture required by INT-R2 and the GigaFood judging story: **PackShift visibly withholds calculation rather than hallucinating green claims.**

---

## 8. Remaining UNKNOWNs & Data Request Specification

To transition Candidate A from `INSUFFICIENT_DATA` to `CALCULATED`, what exact document would be required from a provider?

| Evidence Gap | Affected Candidate | Why It Precludes Calculation | Required Document to Close Gap | Required Document Content |
| :--- | :--- | :--- | :--- | :--- |
| **Recipe 6811 Recycled Content** | Candidate A (`2200012097`) | Located TDS withholds annual fluctuating percentage. | Manufacturer-issued declaration for Recipe 6811 from Faerch Sales or Compliance | Stated calendar year or validity period; explicit Recipe `6811`; explicit point value for total PCR or total recycled content with clear metric scope. |
| **Recipe 7900 Recycled Content** | Candidate B (`2182015004`) | Located 2025 TDS withholds fluctuating percentage. | Manufacturer-issued declaration for Recipe 7900 from Faerch Sales or Compliance | Stated calendar year or validity period; explicit Recipe `7900`; explicit point value for recycled content with clear metric scope. |
| **Candidate B Microwave Rating** | Candidate B (`2182015004`) | TDS only states "Not ovenable". | Faerch Technical Customer Service Statement or product declaration | Explicit affirmation or denial of microwave reheating under defined conditions. |
| **Complete Pack Sealing Film Mass** | All Articles (Baseline, A, B) | Datasheets represent open thermoformed tray bodies only. | Flexible Top Sealing Film Technical Datasheet | Film item number, material polymer formulation (PET/PE or PP), and basis weight ($g/m^2$). |

---

## 9. Stretch Goal: Compact Judge-Defense Evidence Card

These 5 defense cards provide rapid (15–20 second) spoken or written answers for judges:

### Card 1: Why can't PackShift calculate Candidate A today?
> *"Because Faerch's official technical product sheet deliberately does not publish a fixed recycled content percentage. The datasheet explicitly states that rPET content fluctuates year-to-year and directs customers to request an annual declaration for Recipe 6811. Calculating a virgin plastic reduction without that declaration would be an unevidenced green claim."*

### Card 2: Why is "up to 70%" not enough?
> *"Because 'up to 70%' is an engineering ceiling from a corporate announcement, not an article-specific point value. In packaging calculation, using an upper ceiling as a deterministic point input produces inflated, greenwashed savings. PackShift requires an actual point value."*

### Card 3: Why doesn't 40% Tray rPET automatically mean PCR = 0.40?
> *"Because Tray rPET measures only closed-loop tray-to-tray recyclate from post-consumer pots, tubs, and trays. Total PCR also includes bottle rPET. Furthermore, 'minimum 40%' was a regional launch commitment for the UK and Ireland chilled ready-meal market starting in 2025; it is a minimum threshold, not an article-level point value for Item 2200012097."*

### Card 4: Why can Candidate B be BLOCKED while its environmental calculation is unknown?
> *"Because PackShift evaluates operational constraints independently from environmental calculations. Candidate B has a documented maximum service temperature of 70°C. Under the stated modeled 95°C operating context, Candidate B is BLOCKED because its documented maximum temperature (70°C) is below the assumed 95°C requirement. This is an operational incompatibility for that evaluated context, not a universal material/product verdict. Microwave capability remains UNKNOWN and is not needed to establish the thermal block in the accepted demo context."*

### Card 5: What exact document would close each remaining evidence gap?
> *"A dated, manufacturer-issued recipe declaration for Recipe 6811 from Faerch Sales or Compliance providing a current point value for recycled content with clear metric scope and temporal validity. Once provided, PackShift can calculate deterministic virgin plastic for this SKU."*

---

## 10. Traceability Ledger & Source Log

Every source URL cited below was retrieved, opened, and programmatically inspected during this research session.

| Source ID | Author / Host | Document / Reference | Direct Accessible URL | Retrieval Date | Key Attributed Fact |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NDR-S1** | Faerch A/S / Dayton Group Oy | Technical Product Sheet: C 2200-1L Evolve CPET (Item `2200012097`, Recipe `6811`) | [`https://verkkokauppa.daytongroup.fi/...`](https://verkkokauppa.daytongroup.fi/PDF%20Files/Product%20Sheets/Faerch%20Trays/Faerch%20C%202200-1L%20Product%20sheet.pdf) | 2026-09-26 | Tier B primary-document hosting. $21.38\text{ g} \pm 10\%$, $1000\text{ ml}$, $-40^\circ\text{C}$ to $220^\circ\text{C}$, Cooking: *Oven/Microwave*. PCR withheld due to annual fluctuation. |
| **NDR-S2** | Faerch A/S / H.C. Emballage | Technical Product Sheet: K 2182-1G Clear APET (Item `2182015004`, Recipe `7900`) | [`https://www.hc.dk/...`](https://www.hc.dk/.0/pp-static/prodimages/Datablade/datablad_140380.pdf) | 2026-09-26 | Tier B primary-document hosting. $21.48\text{ g} \pm 10\%$, $895\text{ ml}$, $-40^\circ\text{C}$ to $70^\circ\text{C}$, Cooking: *Not ovenable*. Primary source for APET $-40^\circ\text{C}$ to $+70^\circ\text{C}$ thermal envelope and cooking restriction. PCR withheld due to annual fluctuation. |
| **NDR-S3** | Faerch A/S | Press Release (20.11.2024): Chilled ready meal trays with minimum 40% Tray rPET | [`https://www.faerch.com/...`](https://www.faerch.com/en/faerch-launches-chilled-ready-meal-trays-with-minimum-40-tray-rpet-content) | 2026-09-26 | Tier C corporate release: Evolve platform "allows for up to 70% post-consumer content"; Jan 2025 UK/IE launch guarantees "minimum 40% Tray rPET". |
| **NDR-S4** | Faerch A/S / Bunzl Ireland | Historical Technical Product Sheet Appendix (07-09-2021, Doc 152408-SPECS) | [`https://www.bunzlireland.ie/...`](https://www.bunzlireland.ie/medias/sys_master/root/h56/hbb/8888294670366/152408-SPECS.pdf) | 2026-09-26 | Tier B historical appendix: "CPET Standard\* 69-75% PCR", "APET Standard 82% PCR". Unmapped historical range; not applicable as a current SKU/recipe point value. |
| **NDR-S5** | Faerch A/S | Official Material Platform: CPET Ready Meals | [`https://www.faerch.com/...`](https://www.faerch.com/en/products/ready-meals/cpet) | 2026-09-26 | Tier C material platform: CPET thermal envelope $-40^\circ\text{C}$ to $+220^\circ\text{C}$; CPET specified for freezer-to-oven and freezer-to-microwave ready meal applications. |

---

*Report prepared and certified under PackShift CANON-01 Epistemic and Evidence Guidelines.*
*STOP: No runtime code or data files were modified. Submitted for Project Brain / Integrator review.*
