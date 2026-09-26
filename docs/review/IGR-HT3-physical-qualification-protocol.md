# IGR-HT3 — Physical Qualification Protocol & Pilot Readiness Pack

**Document class:** CORE TECHNICAL FEASIBILITY / PHYSICAL QUALIFICATION PROTOCOL
**Contract:** IGR-HT3 — Physical Qualification Protocol & Pilot Readiness Pack
**Owner / Author:** Igor (Core / Technical Feasibility / Physical Qualification)
**Target Repository:** `Slave-of-Skynet/gigafood`
**Verified Base SHA:** `513e0867feaf1b3062c1c02e98d51f2eaa4f1f93` (`origin/main`)
**Working Branch:** `igor/igr-ht3-physical-qualification-protocol`
**Upstream Dependencies:**
- `INT-HTF-04A — Canonical Runtime Transition & Parallelization Gate` (`e069950`)
- `APR-HT1 — HTF-03 Recommendation Acceptance & Claims Safety Audit Report` (`a15ae94`)
- `IGR-HT2 — Recommendation API Contract & Runtime Integrity` (`5d6ee2c`)
- Canonical Dataset: `docs/evidence/htf-03/**` (`bd4f765`)
**Execution Date:** 2026-09-27

---

## 1. Purpose and Epistemic Boundary

### 1.1 Objective
The purpose of this protocol is to convert current HTF-03 evidence gaps, unresolved candidate limitations, and canonical `next_qualification_actions` into a concrete, rigorous, and reproducible physical qualification protocol.

As established across canonical evidence and the runtime decision engine:
```text
CURRENT SURVIVOR STATE: ZERO (0) FULLY QUALIFIED PACKAGING SURVIVORS.
CURRENT PROCUREMENT STATE: ZERO (0) PROCUREMENT APPROVALS.
```

This protocol answers the operational question:
> **Exactly what physical samples, laboratory documentation, dimensional verifications, bench testing procedures, and supplier confirmations are required to move the most promising packaging concepts from unverified screening candidates toward a defensible, bounded retail store pilot at Profi?**

### 1.2 Primary Physical Qualification Paths
This protocol focuses on the three primary packaging candidates established in canonical HTF-03:

```
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│                                PRIMARY PHYSICAL PATHWAYS                                      │
├────────────────────────────────┬───────────────────────────────┬──────────────────────────────┤
│ Product / Context              │ Primary Qualification Lead    │ Canonical Role & Status      │
├────────────────────────────────┼───────────────────────────────┼──────────────────────────────┤
│ P1 Whole Rotisserie Chicken    │ C1 Sacma B.Life Gaia          │ FIRST QUALIFICATION PATH     │
│ Workflow: POST_COOK_HOT_HOLD_6H│ (Cellulosic bag + NatureFlex) │ Priority 1 / QUAL. REQUIRED  │
├────────────────────────────────┼───────────────────────────────┼──────────────────────────────┤
│ P2–P4 Deli Hot Portions        │ C5 BIOPAP LC SI-14            │ FIRST QUALIFICATION PATH     │
│ Workflow: POST_COOK_HOT_HOLD_6H│ (Compostable tray + clear film│ Priority 1 / QUAL. REQUIRED  │
├────────────────────────────────┼───────────────────────────────┼──────────────────────────────┤
│ P1–P4 Literal 250°C In-Pack    │ C6-RO-H E-ambalaj e-pui225    │ PRIORITY 2 FALLBACK          │
│ Workflow: LITERAL_OVEN_250C    │ (Aluminium body + post-oven)  │ Priority 2 / QUAL. REQUIRED  │
└────────────────────────────────┴───────────────────────────────┴──────────────────────────────┘
```

> [!IMPORTANT]
> **This protocol does NOT qualify these candidates.**
> It defines strictly and objectively **how qualification must be conducted** so that human quality assurance, food safety, and retail operations teams can make defensible decisions without relying on mathematical inferences or promotional claims.

### 1.3 Strict Product and Legal Boundary
Under no circumstances may digital tools, software calculations, or engineering protocols substitute for statutory regulatory approvals or physical validation:
- **Software is:** Evidence scoping, operational decision support, and demonstration.
- **Software is NOT:** Food-contact certification, legal compliance approval, Declaration of Compliance (DoC) verification, procurement authorization, or production release.
- **Physical engineering tests do NOT independently prove:** Legal food-contact compliance, overall or specific chemical migration compliance under EU 10/2011, absence of Non-Intentionally Added Substances (NIAS), PFAS compliance, microbiological shelf-life safety, or organoleptic food safety.
- **Qualification Priority means:** Work order for physical and desk investigation. It does NOT mean overall winner, approved packaging, or procurement award.

### 1.4 Critical Epistemic Taxonomy
Every requirement, test condition, parameter, and observation throughout this protocol must strictly apply the following epistemic labels:

| Epistemic Label | Strict Operational Definition | Protocol Usage Rule |
|---|---|---|
| `FACT` | Indisputable real-world truth verified by physical law, committed code, or direct statutory citation. | Use only for verified repository states, mathematical identities, and verbatim EU directives. |
| `OBSERVED_EVIDENCE` | Data extracted directly from verified manufacturer technical data sheets (TDS), published supplier catalogues, or formal test certificates. | Must cite specific source ID (`S01`–`S126`) and retain documented boundaries. |
| `MENTOR_CLARIFICATION` | Requirements, operational contexts, and tolerances provided directly by the challenge mentor. | Must be labeled as mentor context; cannot be upgraded into measured store facts. |
| `MODELED_TEST_CONDITION` | Engineering test parameters formulated by the team to execute bench testing in the absence of provider operational measurements. | Must be explicitly labeled as modeled; cannot be claimed as Profi operating standards. |
| `ENGINEERING_RECOMMENDATION` | Technical suggestions, best-practice methodologies, or test steps proposed by Team SoS engineers. | Cannot be cited as statutory requirements or official challenge rules. |
| `UNKNOWN` | Operational, dimensional, chemical, or commercial parameters that are currently unmeasured, unconfirmed, or absent. | Must remain explicit; non-compensatory; cannot be defaulted to zero or assumed safe. |
| `EXTERNAL_EVIDENCE_REQUIRED` | Necessary verification dossiers, migration reports, or distributor quotations that must be obtained from external third parties. | Identifies mandatory blockers preventing pilot progression. |

---

## 2. Current Candidate State & Epistemic Gap Analysis

### 2.1 The Current Canonical Snapshot
The committed HTF-03 runtime dataset models:
- **4 Product Archetypes:** `P1` (Whole rotisserie chicken), `P2` (Chicken wings / thighs), `P3` (Hot roasted potatoes / vegetables), `P4` (Prepared hot meat portions).
- **2 Workflows:** `POST_COOK_HOT_HOLD_6H` (Primary assumed retail workflow), `LITERAL_OVEN_250C_THEN_HOLD` (Stress-test package-in-oven workflow).
- **6 Candidate Families:** `C1` (Gaia), `C2` (Siralon 21), `C3` (CRYOVAC), `C4` (Faerch CPET), `C5` (BIOPAP SI-14), `C6` (Aluminium configurations).
- **48 Evaluated Gate Rows:** Exactly 28 `QUALIFICATION REQUIRED`, 20 `BLOCKED`.
- **Survivors:** Exactly 0 `qualified_survivor=true`, exactly 0 `approved_for_procurement=true`.

### 2.2 Deep Epistemic Gap Analysis (What We Know vs. What We Do Not Know)

To provide an authoritative audit trail for technical judges and QA stakeholders, every candidate is analyzed across four dimensions:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        FOUR-DIMENSION GAP SPECIFICATION MATRIX                         │
├──────────────────────────┬──────────────────────────┬──────────────────────────────────┤
│ WHAT WE KNOW NOW         │ WHAT WE DO NOT KNOW      │ WHAT EVIDENCE CLOSES IT          │
│ (Committed Evidence)     │ (Critical Gaps)          │ & WHO MUST PROVIDE IT            │
└──────────────────────────┴──────────────────────────┴──────────────────────────────────┘
```

#### A. C1 — Sacma B.Life Gaia (P1 Whole Chicken / Post-Cook Lead)
- **WHAT WE KNOW NOW:**
  - `OBSERVED_EVIDENCE`: Sacma positions B.Life Gaia as a cellulosic hot-bag architecture with an internal cellulose liner and a transparent NatureFlex window made from FSC-certified wood pulp (`S01`, `S02`).
  - `OBSERVED_EVIDENCE`: The bag is commercially marketed for rotisserie chicken, hot deli foods, and greasy applications (`S01`).
  - `OBSERVED_EVIDENCE`: Both paper and NatureFlex film are certified industrially compostable (EN 13432) and bio-based (`S02`).
  - `MENTOR_CLARIFICATION`: Whole chicken requires a flexible bag format rather than a rigid box to conserve hot-cabinet shelf space.
- **WHAT WE DO NOT KNOW:**
  - `UNKNOWN`: Exact Gaia article SKU, physical dimensions (face width, side gusset, total height), and nominal package mass.
  - `UNKNOWN`: Paper grammage (GSM), window film gauge/micron thickness, adhesive chemistry, and exact complete BOM.
  - `UNKNOWN`: Numeric maximum thermal limit and verified continuous duration for the complete composite bag.
  - `UNKNOWN`: Physical grease and hot-fat leak resistance across folded bottom seams over 6 hours of continuous hot display.
  - `UNKNOWN`: Anti-fog performance of the NatureFlex window under steaming chicken conditions.
  - `UNKNOWN`: Verified Declaration of Compliance (DoC) for fatty food contact (Simulant D2) at elevated temperatures.
  - `UNKNOWN`: Romanian distributor stock, commercial pricing, minimum order quantities (MOQ), and delivery lead times.
- **WHAT EVIDENCE WOULD CLOSE IT:**
  - Written technical data sheet with exact article drawing, dimensioned gussets, and component mass breakdown.
  - Laboratory migration report under EU 10/2011 for Simulant D2 (olive oil / 95% ethanol) covering 6h at elevated temperature.
  - Empirical bench leak test report under hot chicken fat holding conditions.
  - Formal commercial quotation from Sacma S.p.A. or an authorized CEE distributor specifying delivered Romanian pricing.
- **WHO CAN PROVIDE THAT EVIDENCE:**
  - Manufacturer: Sacma S.p.A. (Italy) / Futamura Chemical (film).
  - Testing: Accredited packaging test laboratory (e.g., ISEGA, Eurofins, Intertek) + Internal Profi QA bench testing.
  - Procurement: Sacma Commercial Export Sales / Romanian packaging distributor (Sunimprof Argo / Eximprod leads).

#### B. C5 — BIOPAP LC SI-14 + Transparent Film (P2–P4 Portions Lead)
- **WHAT WE KNOW NOW:**
  - `OBSERVED_EVIDENCE`: Exact tray article identified: BIOPAP LC SI-14 (`PCTSI14000LC31019`), dimensions 190 × 247 × 37 mm, capacity 1240 ml (`S10`, `S11`).
  - `OBSERVED_EVIDENCE`: BIOPAP publishes an explicit LC family holding claim: 6 hours at 90°C and 5 hours at 100°C for hot meals (`S09`).
  - `OBSERVED_EVIDENCE`: Tray is cellulose-based, circular, certified compostable, and heat-sealable with compatible films (`S09`, `S13`).
  - `MENTOR_CLARIFICATION`: Small hot deli portions (wings, thighs, potato wedges) should be packaged in trays with transparent viewing windows/lids.
- **WHAT WE DO NOT KNOW:**
  - `CONFLICT`: Open thermal limit conflict in manufacturer literature: 175°C / 60 min (`S08`, `S16`) vs. 185°C / 60 min (`S07`).
  - `UNKNOWN`: Exact compatible transparent sealing film SKU, film polymer composition, gauge, and supplier.
  - `UNKNOWN`: Complete system thermal, grease, and migration performance (tray + proprietary heat-seal + film).
  - `UNKNOWN`: Behavior of heat-sealed film under internal hot-food steam pressure (venting vs. seam ballooning/bursting).
  - `UNKNOWN`: Anti-fog visibility under hot humid portion holding.
  - `UNKNOWN`: Current active Romanian distributor (ReVive SRL lead is historical from 2021; `S10`).
  - `UNKNOWN`: Capital cost, footprint, and electrical requirements for in-store tray sealing tooling across retail stores.
- **WHAT EVIDENCE WOULD CLOSE IT:**
  - Formal written statement from BIOPAP resolving the 175°C vs. 185°C conflict and nominating the exact transparent film SKU.
  - Technical sealing specification defining heat-seal bar temperature, dwell time, sealing pressure, and tooling profiles.
  - Declaration of Compliance (DoC) and fatty food migration testing for the sealed tray-film system.
  - Current direct or distributor commercial quotation for tray cases, film reels, and tabletop sealing machinery.
- **WHO CAN PROVIDE THAT EVIDENCE:**
  - Manufacturer: BIOPAP S.r.l. (Milan, Italy).
  - Sealing Technology: BIOPAP Sealing Systems / ReVive SRL / Mixpack.
  - Testing: BIOPAP certified lab dossiers + Profi in-store operational trial.

#### C. C6-RO-H — E-ambalaj e-pui225 Aluminium Body (P1–P4 Literal 250°C Fallback)
- **WHAT WE KNOW NOW:**
  - `OBSERVED_EVIDENCE`: E-ambalaj lists `e-pui225` as a 2400 ml aluminium chicken roaster container, dimensions 255 × 195 × 90 mm (`S19`).
  - `OBSERVED_EVIDENCE`: Seller publishes a peak temperature rating of 280°C and cold rating of -40°C for the body (`S19`).
  - `OBSERVED_EVIDENCE`: Component unit price is 1.43 RON/unit (143 RON / 100 pcs, VAT included) with 4–5 day lead time (`S19`, `S23`).
  - `OBSERVED_IMPLEMENTATION`: Canonical runtime strictly models this as `LITERAL_OVEN_250C_THEN_HOLD` Priority 2 fallback.
- **WHAT WE DO NOT KNOW:**
  - `UNKNOWN`: Duration associated with the 280°C seller claim (continuous baking vs. momentary peak).
  - `UNKNOWN`: Unresolved subsystem: zero selected transparent lids are rated for 250°C oven exposure.
  - `UNKNOWN`: Mechanical rim stability and dimensional warping of lightweight aluminium foil under a 1.2 kg chicken load during oven baking.
  - `UNKNOWN`: Specific alloy composition, food-grade lubricant residues, and migration limits under hot salted chicken fat.
  - `UNKNOWN`: Post-oven handling ergonomics and burn safety for store associates handling 200°C+ flexible foil containers.
- **WHAT EVIDENCE WOULD CLOSE IT:**
  - Manufacturer alloy certificate and temperature-duration curve for the `e-pui225` container body.
  - Engineering definition and qualification of a two-stage operational procedure (oven body only during baking; post-oven transparent lid applied below 85°C).
  - Physical oven bake test measuring rim deformation, grease leakage, and post-oven lid snap-fit integrity.
- **WHO CAN PROVIDE THAT EVIDENCE:**
  - Distributor / Converter: E-ambalaj / SC Ambalaje Bio SRL.
  - Testing: Profi pilot test kitchen / store rotisserie oven trials.

---

## 3. Qualification-Stage Model (Q0 to Q5)

To systematically de-risk and qualify packaging candidates without conflating desk research with physical pilot readiness, this protocol defines a six-stage engineering progression (**Q0 through Q5**).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        Q0–Q5 QUALIFICATION PROGRESSION MODEL                           │
├───────┬──────────────────────────────────────────┬─────────────────────────────────────┤
│ Stage │ Definition & Focus                       │ Mandatory Gate / Exit Deliverable   │
├───────┼──────────────────────────────────────────┼─────────────────────────────────────┤
│  Q0   │ Identity, Desk Research & BOM Freeze     │ Complete BOM + Technical Data Sheets│
│  Q1   │ Physical Sample & Dimensional Audit      │ Physical Weighing & Fit Verification│
│  Q2   │ Controlled Benchtop Stress Testing       │ Thermal, Grease & Anti-Fog Testing  │
│  Q3   │ Laboratory Regulatory Compliance         │ Supplier DoC + Migration Dossier    │
│  Q4   │ Retail Logistics & Operational Trial     │ Commercial Quote + In-Store Packing │
│  Q5   │ Controlled Retail Store Pilot Release    │ Multi-Store Supervised Live Trial   │
└───────┴──────────────────────────────────────────┴─────────────────────────────────────┘
```

> [!CAUTION]
> **Process Stage vs. Runtime Domain Status:**
> `Q0` through `Q5` are **engineering workflow progression milestones only**. They do **NOT** modify or expand canonical PackShift runtime enums (`RecommendationOutcome`, `GateStatus`, `qualified_survivor`, `approved_for_procurement`). Canonical status updates require formal evidence ingestion and Integrator acceptance.

### 3.1 Detailed Stage Requirements

#### Q0 — Identity, Desk Research & BOM Freeze
- **Objective:** Freeze the exact article identity and obtain comprehensive technical documentation before procuring samples.
- **Mandatory Requirements:**
  - Exact manufacturer article code / SKU (not family name).
  - Complete Bill of Materials (BOM): body substrate, inner coating, barrier layer, viewing window/film, adhesives, and closures.
  - Published technical data sheets (TDS) detailing nominal dimensions, volume, mass, and operating temperature envelope.
  - Supplier written confirmation of recycled content percentage, certified renewable content basis, and chemical barrier chemistry (PFAS-free).
- **Exit Criteria:** Candidate cannot progress to Q1 if the physical system boundary is ambiguous or incomplete.

#### Q1 — Physical Sample & Dimensional Audit
- **Objective:** Obtain physical packaging specimens and verify dimensional compatibility against real-world retail food portions.
- **Mandatory Requirements:**
  - Receipt of minimum 20 physical samples from verified production runs.
  - High-precision physical weighing (0.01 g resolution) of empty components (body, window/film, lid) across 10 distinct samples to replace modeled estimates.
  - Physical dimensional audit (length, width, depth, gusset expansion, flange width) with calibrated calipers.
  - Cold and warm physical fit-check with whole rotisserie chicken (1.0–1.4 kg test range) and hot deli portions.
  - Assessment of closure snap-fit, heat-seal flange flatness, and initial handling ergonomics.
- **Exit Criteria:** Component compatibility verified; usable volume and headspace confirmed sufficient for food containment without seam tension.

#### Q2 — Controlled Benchtop Stress Testing
- **Objective:** Execute standardized, repeatable physical challenge tests evaluating thermal resistance, hot-holding endurance, hot-fat barrier integrity, steam management, and transparent visibility.
- **Mandatory Requirements:**
  - Execution of Protocol Section 5 (C1), Section 6 (C5), or Section 7 (C6).
  - Continuous hot-holding challenge (up to 6 hours at modeled 85–95°C cabinet conditions) using actual rotisserie chicken or calibrated food-grade hot-fat surrogates.
  - Timed inspection of grease strike-through, seam delamination, liquid pooling, and structural softening.
  - Transparent viewing evaluation: anti-fog performance, steam droplet coalescence, and window clarity over the entire 6-hour holding duration.
- **Exit Criteria:** Zero gross structural failure, zero external grease pooling, and sustained product visibility across test replicates.

#### Q3 — Laboratory Regulatory Compliance
- **Objective:** Establish formal regulatory compliance under European and Romanian food-contact legislation.
- **Mandatory Requirements:**
  - Written Declaration of Compliance (DoC) referencing Regulation (EC) No 1935/2004, Regulation (EC) No 2023/2006 (GMP), and Regulation (EU) No 10/2011 (plastics) or national paper resolutions.
  - Certified laboratory overall migration limit (OML < 10 mg/dm²) test results.
  - Certified specific migration limit (SML) testing under fatty food conditions using **Food Simulant D2 (vegetable oil)** or 95% ethanol at temperature and time profiles reflecting the intended high-temperature contact.
  - Screening confirmation for Non-Intentionally Added Substances (NIAS) and certified absence of intentionally added PFAS/fluorinated chemical treatments.
- **Exit Criteria:** Formal review and sign-off by responsible Profi QA/regulatory compliance officers. Bench tests cannot substitute for Q3.

#### Q4 — Retail Logistics & Operational Trial
- **Objective:** Validate packaging performance within the store operational workflow, kitchen packing line, and distributor supply chain.
- **Mandatory Requirements:**
  - Written commercial quotation covering delivered unit costs in Romania (RON, VAT-qualified, freight-qualified).
  - Supplier written confirmation of industrial minimum order quantities (MOQ), commercial stock availability, and production lead times.
  - Packing line trial in a live or simulated Profi deli counter: packing speed, worker burn safety, sealing machine cycle time (for C5 film), and closure reliability during peak hours.
  - Consumer transport simulation: carrying packed hot food in consumer shopping bags for 30 minutes; evaluation of grease containment, steam venting, and package rigidity.
- **Exit Criteria:** In-store operational packing approved by store operations; supply chain continuity verified.

#### Q5 — Controlled Retail Store Pilot Release
- **Objective:** Authorize and execute a bounded, supervised retail pilot in a limited number of Profi stores.
- **Mandatory Requirements:**
  - Successful closure of stages Q0 through Q4.
  - Formal joint sign-off by Profi Head of QA, Lead Packaging Buyer, and Deli Operations Director.
  - Execution confined to 3–5 designated retail stores under active monitoring for 14–30 days.
  - Daily customer feedback, store associate waste logs, and unsellable leakage incident tracking.
- **Exit Criteria:** Pilot completion with leakage failure rates below agreed commercial thresholds and validated customer acceptance.

---

## 4. Cross-Candidate Prerequisites & Thermal Semantics Separation

### 4.1 Strict Separation of Thermal and Duration Semantics
A fundamental defect in historical packaging assessments is the conflation of peak oven temperature with holding duration:
```text
CRITICAL INVARIANT:
250°C EXPOSURE ≠ 6 HOURS AT 250°C
```

To prevent catastrophic thermal failure and regulatory misclassification, this protocol enforces strict, visually distinct semantic boundaries across four operational temperature-time domains:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        TEMPERATURE-TIME DOMAIN DECOUPLING                              │
├──────┬────────────────────────────────┬────────────────────────┬───────────────────────┤
│ Domain│ Operational Phase              │ Target Conditions      │ Governing Invariant   │
├──────┼────────────────────────────────┼────────────────────────┼───────────────────────┤
│  A   │ Peak / Oven Cooking Exposure   │ 200–250°C              │ Transient cooking;    │
│      │                                │ (15–60 min)            │ Oven body only!       │
├──────┼────────────────────────────────┼────────────────────────┼───────────────────────┤
│  B   │ Post-Cook Hot Holding          │ Modeled 85–95°C        │ Long-term display;    │
│      │                                │ (up to 6 hours)        │ Full pack + grease!   │
├──────┼────────────────────────────────┼────────────────────────┼───────────────────────┤
│  C   │ Direct Food Contact & Migration│ Hot food interface     │ Chemical migration;   │
│      │                                │ (Simulant D2)          │ Substrate + coating!  │
├──────┼────────────────────────────────┼────────────────────────┼───────────────────────┤
│  D   │ Retail Customer Display        │ Ambient to 65°C        │ Visual clarity;       │
│      │                                │ (Consumer transit)     │ Anti-fog & handling!  │
└──────┴────────────────────────────────┴────────────────────────┴───────────────────────┘
```

#### Detailed Domain Definitions:
1. **Domain A — Peak / Oven Exposure:**
   - `MENTOR_CLARIFICATION`: 200–250°C oven reheating or cooking context.
   - `UNKNOWN`: Whether Profi standard operating procedure (SOP) allows in-pack baking or mandates rotisserie cooking outside the package.
   - `FACT`: Polymeric transparent films, windows, and closures (PET, PP, NatureFlex, APET) melt, degrade, or severely warp at 250°C.
   - `RULE`: No transparent closure may enter a 250°C oven unless specifically certified. In Domain A, testing evaluates the container body only.
2. **Domain B — Post-Cook Hot Holding:**
   - `MENTOR_CLARIFICATION`: Up to approximately 6 hours packaging condition without affecting safety/quality.
   - `UNKNOWN`: Actual Profi hot-cabinet holding temperature and humidity profile.
   - `MODELED_TEST_CONDITION`: Bench testing uses an 85–95°C holding scenario for validation planning.
   - `RULE`: Domain B requires the complete, sealed/closed packaging assembly containing hot chicken and liquid fat.
3. **Domain C — Food-Contact Duration & Matrix:**
   - `FACT`: High temperature accelerates plasticizer, monomer, and chemical additive migration into fatty food.
   - `RULE`: Proof of thermal survival (no melting) does NOT establish chemical food contact safety. Compliance requires certified migration testing under Domain C conditions.
4. **Domain D — Retail Shelf / Display Duration:**
   - `MENTOR_CLARIFICATION`: Transparent viewing window/lid is required so consumers can visually inspect the food on the shelf.
   - `UNKNOWN`: Exact acceptable visible window area and consumer anti-fog tolerance.
   - `RULE`: Optical clarity must be monitored dynamically throughout Domain B and Domain D.

### 4.2 Environmental Input Measurement Protocol
Current virgin plastic reduction calculations in HTF-03 rely on modeled estimates (`E008`, `E018`, `E051`). Physical samples obtained in Stage Q1 must be measured using the following standardized protocol:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        COMPONENT MASS WEIGHING PROTOCOL                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. Apparatus: Calibrated laboratory analytical balance (accuracy ±0.01 g).            │
│ 2. Conditioning: Samples conditioned at 23°C ± 2°C and 50% ± 5% RH for 24 hours.      │
│ 3. Sample Size: 10 individual, randomly selected complete package units per candidate. │
│ 4. Measurement Procedure:                                                              │
│    a. Weigh complete empty assembled package (M_total).                                │
│    b. Disassemble package: cleanly separate body, window/film, lid, and clips.        │
│    c. Weigh individual container body (M_body).                                        │
│    d. Weigh individual transparent viewing component (M_window or M_lid).              │
│    e. Weigh adhesive, sealing layer, or ancillary closure components (M_ancillary).     │
│ 5. Calculations:                                                                       │
│    - Record individual component masses and verify M_total = Σ M_components.          │
│    - Compute arithmetic mean, minimum, maximum, and standard deviation.                │
│    - Record supplier-certified post-consumer recycled (PCR) fraction: f_PCR.           │
│    - Record supplier-certified bio-based renewable fraction: f_renew.                  │
│    - Calculate actual virgin plastic mass: M_virgin = M_plastic × (1.0 - f_PCR).       │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Incumbent Baseline Packaging Measurement Opportunity
If physical access to Profi's current rotisserie chicken packaging (`B1`) becomes available during retail engagement, the team must execute the following non-intrusive capture:
- **`OBSERVED_EVIDENCE` Capture:**
  - Empty package tare mass (mean of 5 units).
  - Dimensions (length, width, gusset/depth, film gauge).
  - Material identification via resin recycling identification codes (RIC) or Fourier-Transform Infrared (FTIR) spectroscopy.
  - Visual photo documentation of print, seals, and vents.
- **Confidentiality Rule:** If commercial purchase prices or annual volumes are confidential, they remain `UNKNOWN`. Do not extrapolate or fabricate financial figures.

---

## 5. C1 Gaia Protocol (Whole Chicken P1 / Post-Cook Lead)

**Canonical Role:** `P1 / POST_COOK_HOT_HOLD_6H` | **Status:** `FIRST QUALIFICATION PATH` | `Priority 1` | `QUALIFICATION REQUIRED`

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        C1 SACMA B.LIFE GAIA SPECIFICATION                              │
├─────────────────────┬──────────────────────────────────────────────────────────────────┤
│ Architectural Form  │ Stand-up flexible windowed rotisserie bag                        │
│ Substrates          │ Kraft paper body + inner cellulosic liner + NatureFlex window    │
│ Target Food Item    │ P1: Whole rotisserie chicken (~1.0–1.4 kg hot whole bird)        │
│ Operating Workflow  │ POST_COOK_HOT_HOLD_6H (Cook rotisserie outside pack -> pack -> hold)│
└─────────────────────┴──────────────────────────────────────────────────────────────────┘
```

### 5.1 Protocol A: Exact Article Identity & BOM Verification
1. **Article Code Retrieval:** Obtain written confirmation from Sacma S.p.A. of the exact orderable catalog code for the large rotisserie chicken bag.
2. **Substrate & Gauge Specification:**
   - Outer paper grammage: Measure and record GSM ($g/m^2$).
   - Inner liner: Record exact cellulose grade, supplier, and barrier coating chemistry.
   - Transparent window: Confirm NatureFlex grade (e.g., NVO, NK, or NE), gauge (nominal $\mu m$), and surface treatment.
   - Adhesives & Inks: Record water-based/compostable adhesive specifications and printing ink compliance with EN 13432.
3. **Mass & Dimension Baseline:** Measure empty bag tare mass across 10 units. Measure flat width, side gusset depth, and total height.

### 5.2 Protocol B: Whole-Chicken Physical Fit & Headspace Verification
- `MODELED_TEST_ASSUMPTION`: Whole rotisserie chicken test mass distribution of **1.0 to 1.4 kg** (hot cooked bird). Actual Profi bird weight distribution remains `UNKNOWN`.
- **Fit & Ergonomic Procedure:**
  1. Procure 5 whole roasted chickens freshly cooked to an internal core temperature $\ge 85^\circ\text{C}$.
  2. Measure bird geometry: length, breast width, height.
  3. **Insertion Test:** A test operator wearing food-service safety gloves inserts the hot bird into the Gaia bag using standard rotisserie tongs. Record insertion duration (seconds) and any bag tearing or gusset snagging.
  4. **Headspace & Closure:** Fold or seal the top closure per manufacturer design. Measure residual vertical headspace (minimum 30 mm required above bird). Verify bag does not contact the top closure under tension.
  5. **Window Contact:** Inspect whether the hot, greasy chicken skin directly presses against the NatureFlex window. Record percentage of window area in direct skin contact.
  6. **Fat Pooling Headspace:** Verify that the bottom gusset expands fully flat to create a stable base. Inspect volume capacity for accumulated free fat/juices (minimum 100 ml liquid containment without overflowing).
  7. **Carry & Handle Strength:** Pick up the sealed, hot package by its handle/top fold. Suspend for 5 minutes. Inspect handle deformation, paper stretching, and tear propagation.

### 5.3 Protocol C: Continuous Hot-Holding Challenge (Domain B)
- `MODELED_TEST_CONDITION`: Hot holding cabinet maintained at **85°C to 95°C** (air temperature) at 30–50% RH.
- `MENTOR_CLARIFICATION`: Holding duration of **up to 6 hours**.
- **Holding Matrix & Procedure:**
  1. Prepare 3 replicate Gaia bags containing freshly roasted chickens (1.2 kg ± 0.1 kg, core temp $\ge 85^\circ\text{C}$).
  2. Prepare 2 control Gaia bags containing 150 ml of food-grade vegetable oil + 50 ml water heated to 90°C (liquid challenge).
  3. Place all 5 packages upright onto standard retail wire shelving inside the preheated 85–95°C holding cabinet.
  4. Maintain continuous holding for **6 hours (360 minutes)**. Record cabinet temperature continuously via calibrated thermocouples.
  5. Inspect at timed intervals: $T = 30\text{ min}$, $T = 60\text{ min}$, $T = 120\text{ min}$, $T = 240\text{ min}$, $T = 360\text{ min}$.

### 5.4 Protocol D: Grease & Hot-Fat Leakage Protocol
Inspect the packages under Protocol C at each inspection interval for the following failure modes:
1. **Substrate Strike-Through:** Visual and tactile inspection of paper outer surface. Record any grease spotting, darkening, or oil saturation ($cm^2$ stained).
2. **Bottom Gusset Seam Integrity:** Inspect the bottom transverse heat-seal/fold. Place clean white absorbent blotter paper beneath the bag. Record any oil droplet transfer onto the blotter paper.
3. **Window-Paper Lamination Seam:** Inspect the bonded perimeter between the NatureFlex window and the paper body. Verify absence of adhesive delamination or oil weeping along the seam edges.
4. **Handling Rigidity Post-Hold:** At $T = 360\text{ min}$, remove the bag from the cabinet. Lift by the handle and tilt $30^\circ$. Record any paper softening, structural collapse, or liquid breakthrough.
- `PROPOSED_ENGINEERING_CRITERION`: Zero liquid droplet leakage onto blotter paper at 6 hours. (Marked: *ACCEPTANCE THRESHOLD — OWNER DECISION REQUIRED*).

### 5.5 Protocol E: Window Transparency & Anti-Fog Evaluation
Evaluate the NatureFlex window during Protocol C holding:
1. **Visibility Rating:** Can the chicken breast, skin browning, and seasoning be clearly inspected through the window from a distance of 0.5 meters?
2. **Condensation Behavior:** Record condensation state:
   - *Class 1:* Clear, no visible moisture droplets.
   - *Class 2:* Thin, transparent micro-droplet film; product fully visible.
   - *Class 3:* Coarse droplets; partial optical distortion; product recognizable.
   - *Class 4:* Severe fogging / opaque white moisture barrier; product details obscured.
3. **Thermal Distortion:** Inspect whether the NatureFlex film wrinkles, sags, shrinks, or delaminates from the paper border under hot steam.

### 5.6 Protocol F: Food-Contact Regulatory Verification (Domain C)
1. **Supplier Dossier Audit:** Require Sacma S.p.A. to supply a formal Declaration of Compliance (DoC) covering the exact bag SKU.
2. **Migration Testing Specifications:**
   - Specific and overall migration test certificates must specify **Food Simulant D2** (vegetable oil).
   - Test exposure conditions must meet or exceed actual contact conditions (minimum test condition: 2 hours at 100°C or 10 days at 40°C with screening at 60°C).
   - Verify specific migration limits (SML) for plasticizers, slip agents, and photoinitiators.
3. **PFAS-Free Verification:** Require written laboratory certification that paper grease-proofing does not utilize per- and polyfluoroalkyl substances (PFAS / organic fluorine $< 50\text{ ppm}$).

---

## 6. C5 BIOPAP LC SI-14 Protocol (Portion Packs P2–P4 Lead)

**Canonical Role:** `P2–P4 / POST_COOK_HOT_HOLD_6H` | **Status:** `FIRST QUALIFICATION PATH` | `Priority 1` | `QUALIFICATION REQUIRED`

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        C5 BIOPAP LC SI-14 SPECIFICATION                                │
├─────────────────────┬──────────────────────────────────────────────────────────────────┤
│ Architectural Form  │ Semi-rigid compostable cellulose tray + heat-sealed clear film    │
│ Substrates          │ BIOPAP LC cellulose tray (`PCTSI14000LC31019`) + clear film reel │
│ Target Food Items   │ P2: Chicken wings/thighs | P3: Potatoes/veg | P4: Meat portions  │
│ Operating Workflow  │ POST_COOK_HOT_HOLD_6H (Cook rotisserie/deli -> pack -> seal -> hold│
└─────────────────────┴──────────────────────────────────────────────────────────────────┘
```

### 6.1 Protocol A: Complete System BOM Freeze & Sealing Machine Setup
1. **Tray SKU Verification:** Verify physical tray code `PCTSI14000LC31019` (BIOPAP LC SI-14, 190 × 247 × 37 mm, 1240 ml, tare mass ~23.5 g; `S10`).
2. **Film SKU Nomination:**
   - Require BIOPAP to officially nominate the exact compatible transparent film SKU (e.g., NatureFlex-based or PLA/PBAT-based compostable barrier film).
   - Record reel width (mm), film thickness ($\mu m$), oxygen transmission rate (OTR), and water vapor transmission rate (WVTR).
3. **Heat-Sealer Calibration:**
   - Tooling: Calibrated tray sealing machine equipped with CNC aluminum sealing head matching the SI-14 rim contour.
   - Parameter Optimization: Establish documented sealing parameters:
     - Sealing Temperature: $T_\text{seal} \in [140^\circ\text{C}, 175^\circ\text{C}]$.
     - Sealing Dwell Time: $t_\text{dwell} \in [1.0\text{ s}, 2.5\text{ s}]$.
     - Sealing Pressure: $P_\text{seal} \in [4\text{ bar}, 6\text{ bar}]$.

### 6.2 Protocol B: 175°C vs. 185°C Thermal Conflict Resolution
- `FACT`: Canonical dataset registers open conflict `D08` / `C01`: 175°C / 60 min (`S08`, `S16`) vs. 185°C / 60 min (`S07`).
- **Conflict Handling Rules:**
  1. **DO NOT** average the values (e.g., asserting 180°C).
  2. **DO NOT** select 185°C simply because it is newer or more favorable.
  3. **DO NOT** execute oven cooking tests at 250°C. C5 is BLOCKED for `LITERAL_OVEN_250C`.
- **Resolution Procedure:**
  - Submit formal technical inquiry to BIOPAP Technical Directorate requesting written clarification of the certified maximum temperature and duration for tray `PCTSI14000LC31019` when sealed with the nominated film.
  - Until written clarification is received, the operational safety envelope must remain constrained to the lower documented bound: **$\le 175^\circ\text{C}$ for $\le 60\text{ minutes}$**.

### 6.3 Protocol C: Portion Fit & Headspace Verification (P2, P3, P4)
- `UNKNOWN`: Profi exact portion recipe masses and serving volumes.
- `MODELED_TEST_ASSUMPTION`:
  - **P2 (Wings & Thighs):** 6–8 cooked wings or 3–4 roasted chicken thighs (~350–450 g).
  - **P3 (Hot Potatoes / Vegetables):** Roasted rosemary potato wedges (~300–400 g).
  - **P4 (Meat Portions):** Sliced roasted pork or chicken breast with gravy/sauce (~300–400 g).
- **Procedure:**
  1. Fill separate SI-14 trays with hot P2, P3, and P4 food portions at $85^\circ\text{C}$.
  2. Measure fill height against tray depth (37 mm). Verify a minimum **5 mm vertical clearance** between the top of the food and the top sealing rim.
  3. Inspect food contact with the film. Sharp wing bone tips must not puncture or exert upward pressure against the taut film lid.
  4. Seal trays using calibrated parameters. Verify hermetic, continuous perimeter seal along the entire rim flange.

### 6.4 Protocol D: Complete-System 6-Hour Hot Holding & Seam Challenge
- `OBSERVED_EVIDENCE`: BIOPAP publishes an LC family claim of **6 hours at 90°C** (`S09`).
- `RULE`: The family claim does not qualify the exact SI-14 tray + nominated film + hot chicken grease system. This test validates the assembled system.
- **Procedure:**
  1. Prepare 6 sealed SI-14 trays:
     - 2 trays with P2 (greasy chicken wings + 20 ml free liquid fat).
     - 2 trays with P3 (steaming roasted potatoes).
     - 2 trays with P4 (meat portions in hot savory gravy).
  2. Place all 6 sealed trays into a holding cabinet preheated to **90°C ± 2°C** for **6 hours (360 minutes)**.
  3. **Pressure & Steam Behavior:** Observe film profile at $T = 15\text{ min}$, $30\text{ min}$, $60\text{ min}$. Does steam pressure cause excessive ballooning (dome expansion $> 25\text{ mm}$)? Does the film vent steam naturally through micro-porosity, or is mechanical micro-perforation required?
  4. **Seal Delamination & Creep:** Inspect the seal boundary every 60 minutes. Record any peel delamination, corner lift, or liquid fat channeling through the seal seam.
  5. **Tray Softening & Base Warping:** At $T = 360\text{ min}$, inspect the cellulose tray base. Measure sagging when lifted by the rim. Does the bottom soften or deform under hot chicken grease and gravy?

### 6.5 Protocol E: Hot-Fat Grease Penetration & Barrier Testing
1. **Substrate Strike-Through:** Inspect outer bottom and side walls of the BIOPAP tray at $T = 360\text{ min}$.
2. **Blotter Paper Test:** Wipe outer base against white absorbent paper. Record any transferred grease.
3. **Corner Stress Analysis:** Cellulose pulp trays are vulnerable at corner draw radii. Inspect the 4 corner radii with magnifying optical inspection for grease seepage or structural thinning.

### 6.6 Protocol F: Film Transparency, Anti-Fog & Opening Ergonomics
1. **Optical Inspection:** Inspect product clarity through the clear film at $T = 1\text{ h}$, $2\text{ h}$, $4\text{ h}$, and $6\text{ h}$. Record anti-fog class (Class 1 to Class 4 per Section 5.5).
2. **Condensation Droplet Coalescence:** Verify whether condensation forms a continuous transparent water sheet (anti-fog success) or obstructing light-scattering droplets.
3. **Peel & Open Ergonomics:** At $T = 360\text{ min}$, test opening by a simulated consumer:
   - Grip corner peel tab. Measure manual pull force required to initiate and complete peeling.
   - Verify clean peel without film shredding or tearing of the cellulose tray flange into the food.

---

## 7. C6-RO-H Protocol (Literal 250°C Aluminium Fallback)

**Canonical Role:** `P1–P4 / LITERAL_OVEN_250C_THEN_HOLD` | **Status:** `PRIORITY 2 FALLBACK` | `QUALIFICATION REQUIRED`

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        C6-RO-H E-AMBALAJ E-PUI225 SPECIFICATION                        │
├─────────────────────┬──────────────────────────────────────────────────────────────────┤
│ Architectural Form  │ Deep rectangular semi-rigid aluminium container body             │
│ Substrates          │ Aluminium alloy foil body (`e-pui225`); closure unresolved       │
│ Dimensions / Volume │ 255 × 195 × 90 mm | 2400 ml capacity (`S19`)                      │
│ Operating Workflow  │ LITERAL_OVEN_250C_THEN_HOLD (In-pack bake 250°C -> post-oven lid)│
└─────────────────────┴──────────────────────────────────────────────────────────────────┘
```

### 7.1 Critical Subsystem Isolation & Anti-Leakage Rules
To prevent cross-configuration corruption, the following boundaries are absolute:
1. `C6-RO-H` represents **only** the `E-ambalaj e-pui225` body.
2. `DO NOT` transfer the 350°C rating, mass, or lid data from `C6-EU` (Plus Pack).
3. `DO NOT` transfer the clear plastic lid (`a-680681`) or prices from `C6-RO-P` into `C6-RO-H`.
4. `RULE`: An aluminium body temperature claim does **NOT** qualify a complete packaging system.

### 7.2 Protocol A: Body Identity & Material Verification
1. **Tare Mass & Alloy Confirmation:**
   - Weigh 10 empty `e-pui225` container bodies on analytical balance.
   - Request written material declaration from E-ambalaj / manufacturer confirming aluminium alloy designation (e.g., Alloy 8011 / 3003) and temper.
   - Confirm food-grade lubricant type (e.g., FDA-approved synthetic or vegetable oil lubricant $< 50\text{ mg}/m^2$).
2. **Geometric Audit:** Measure outer dimensions, base dimensions, depth (90 mm), and horizontal rim/flange curl geometry.

### 7.3 Protocol B: Literal 250°C Oven Thermal Exposure Challenge (Domain A)
- `FACT`: Literal oven workflow specifies target **250°C**.
- `RULE`: This test evaluates container **body only** (`OVEN_BODY_ONLY`). No plastic lid or window may enter the oven.
- **Procedure:**
  1. Preheat commercial convection bake oven to **250°C ± 3°C** (air temperature).
  2. Prepare 3 `e-pui225` containers loaded with raw marinated chicken (1.2 kg bird) + 50 ml oil/seasoning.
  3. Insert loaded open containers onto oven baking racks.
  4. Bake at continuous **250°C** for **45 minutes** (representative retail roasting cycle).
  5. Measure and record:
     - Ambient oven air temperature (continuous thermocouple log).
     - Container outer sidewall temperature.
     - Food core temperature at completion ($\ge 85^\circ\text{C}$).
  6. **Physical Observations Post-Bake:**
     - Container structural deformation or base buckling under 1.2 kg food load.
     - Rim/flange curl distortion or twisting (critical: rim warping will destroy post-oven lid seal).
     - Surface discoloration, blistering, oxidation, or thermal odor/smoke emission from lubricants.

### 7.4 Protocol C: Transparent Closure Subsystem Engineering Resolution
- `CRITICAL GAP`: `C6-RO-H` currently has **NO qualified transparent closure**.
- Two alternative engineering options are recognized for qualification investigation:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        C6-RO-H CLOSURE ENGINEERING OPTIONS                             │
├────────────────────────────────┬───────────────────────────────────────────────────────┤
│ Option 1: Complete Oven Lid    │ Transparent closure remains on pack during 250°C oven.│
│ (Currently UNQUALIFIED)        │ Status: BLOCKED. Zero commercial transparent polymers  │
│                                │ endure 250°C without melting/thermal decomposition.   │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ Option 2: Two-Stage Workflow   │ Body only in 250°C oven -> remove -> cool food        │
│ (Operational Engineering Path) │ below 85°C -> snap on transparent clear plastic lid.  │
│                                │ Status: INVESTIGATION. Requires validated retail SOP. │
└────────────────────────────────┴───────────────────────────────────────────────────────┘
```

> [!WARNING]
> **Engineering Options are NOT Approved Profi SOPs:**
> Option 2 is an **engineering research path**, not an approved Profi operational procedure. It cannot be presented as a qualified solution until store operational teams validate the cooling delay, association burn hazards, and food hygiene risks during post-oven lidding.

#### Option 2 Qualification Protocol (Two-Stage Post-Oven Capping):
1. Upon removal of container from 250°C oven, monitor food surface temperature cooling curve.
2. When surface temperature drops below **85°C** (target temperature safe for high-heat clear plastic lids), align a candidate transparent lid (to be sourced matching 255 × 195 mm rim).
3. Apply lid: test manual snap-fit engagement around the rim curl.
4. Measure lid dimensional stability: does residual radiant heat from the aluminium rim warp, shrink, or melt the plastic lid rim?
5. Inspect optical clarity and anti-fog performance when capped over 80°C steaming food.

### 7.5 Protocol D: Post-Oven Hot Holding (Domain B)
1. Transfer the two-stage assembled C6-RO-H pack (baked aluminium body + post-oven transparent lid) into the **85–95°C holding cabinet**.
2. Hold for **6 hours (360 minutes)**.
3. Inspect for:
   - Bottom aluminium pinhole leakage (inspect for salt/acid corrosion pitting from hot chicken seasoning).
   - Lid retention: does the lid remain securely snapped onto the rim curl during retail display handling?
   - Grease migration over the curled rim flange.

---

## 8. Six-Gate Acceptance Mapping & Objective Verification

Every physical protocol step must map back directly to the six canonical gates defined in the PackShift recommendation engine.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SIX-GATE MAPPING ARCHITECTURE                                   │
├──────────────┬──────────────────────────────────────────┬──────────────────────────────┤
│ Gate Name    │ Domain Covered                           │ Canonical Evaluation Criteria│
├──────────────┼──────────────────────────────────────────┼──────────────────────────────┤
│ Gate 1       │ Physical Fit & Handling                  │ Container sizing & volume    │
│ Gate 2       │ Food Contact & Chemical Safety           │ DoC, EU 10/2011, Simulant D2 │
│ Gate 3       │ Thermal Workflow Suitability             │ Peak bake & 6h hot-hold      │
│ Gate 4       │ Grease & Oil Barrier                     │ 6h hot-fat containment       │
│ Gate 5       │ Transparent Viewing & Anti-Fog           │ Visual inspection on shelf   │
│ Gate 6       │ Romania Procurement Route                │ Local stock, pricing, MOQ    │
└──────────────┴──────────────────────────────────────────┴──────────────────────────────┘
```

### 8.1 Detailed Gate Verification Specifications

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ GATE 1: PHYSICAL FIT & HANDLING                                                                         │
├───────────────────┬─────────────────────────────────────────────────────────────────────────────────────┤
│ Current Evidence  │ C1: Bag family marketed for chicken (`S01`). C5: Tray 1240 ml, 190x247x37 mm (`S10`).│
│                   │ C6-RO-H: Body 2400 ml, 255x195x90 mm (`S19`). Real Profi food dimensions: UNKNOWN.  │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Remaining Gap     │ Exact fill geometry, vertical headspace, bone puncture resistance, closure tension. │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Required Test     │ Protocol 5.2 (C1 whole chicken fit), 6.3 (C5 portion fit), 7.2 (C6-RO-H fit).       │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Observable Result │ Free headspace $\ge 30\text{ mm}$ (bag) or $\ge 5\text{ mm}$ (tray); zero bone       │
│                   │ punctures; secure closure without mechanical stress.                                │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Verifying Party   │ Profi Store Operations Lead + SoS Test Engineers.                                   │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Failure Condition │ Inability to close bag/tray; food protrusion; puncture of window/film; seam tear.   │
└───────────────────┴─────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ GATE 2: FOOD CONTACT & REGULATORY COMPLIANCE                                                            │
├───────────────────┬─────────────────────────────────────────────────────────────────────────────────────┤
│ Current Evidence  │ General commercial claims of food-grade status (`S01`, `S07`, `S19`). Formal        │
│                   │ fatty-food migration dossiers for exact articles: UNKNOWN.                          │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Remaining Gap     │ Specific Declaration of Compliance (DoC); Overall/Specific Migration testing under  │
│                   │ Simulant D2 at high heat; PFAS chemical barrier screening.                          │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Required Test     │ Protocol 5.6 (C1), 6.2 (C5), 7.2 (C6). Certified lab analytical testing.           │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Observable Result │ Written DoC referencing EU 10/2011 & EC 1935/2004; OML < 10 mg/dm²; SMLs satisfied; │
│                   │ total fluorine < 50 ppm.                                                            │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Verifying Party   │ Certified Analytical Testing Laboratory + Profi Regulatory Compliance QA.           │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Failure Condition │ Missing DoC; migration limit exceedance; presence of intentional PFAS; banned NIAS. │
└───────────────────┴─────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ GATE 3: THERMAL WORKFLOW SUITABILITY                                                                    │
├───────────────────┬─────────────────────────────────────────────────────────────────────────────────────┤
│ Current Evidence  │ C1: No numeric peak (`S01`). C5: 175/185°C conflict (`S07`, `S08`); 6h@90°C family  │
│                   │ claim (`S09`). C6-RO-H: Body 280°C seller claim (`S19`); duration UNKNOWN.          │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Remaining Gap     │ Validation of exact complete system under specified workflow (Post-cook 6h or 250°C)│
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Required Test     │ Protocol 5.3 (C1 6h hold), 6.4 (C5 6h hold), 7.3 (C6-RO-H 250°C oven bake).        │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Observable Result │ No polymer melting; no seam separation; no thermal shrinkage; structural integrity  │
│                   │ maintained throughout full operating duration.                                      │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Verifying Party   │ Test Laboratory / Internal Bench Testing Engineers.                                 │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Failure Condition │ Melting/charring of substrate; opening of heat-seals; collapse of container walls.  │
└───────────────────┴─────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ GATE 4: GREASE & OIL BARRIER                                                                            │
├───────────────────┬─────────────────────────────────────────────────────────────────────────────────────┤
│ Current Evidence  │ Commercial claims of grease resistance (`S01`, `S07`). 6h continuous hot-fat        │
│                   │ containment: UNKNOWN.                                                               │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Remaining Gap     │ Resistance to hot liquid chicken fat penetration across seams, folds, and corners.  │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Required Test     │ Protocol 5.4 (C1), 6.5 (C5), 7.5 (C6). Continuous 6h hot-fat holding challenge.     │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Observable Result │ Zero oil droplet breakthrough onto absorbent blotter paper after 6 hours holding    │
│                   │ at 85–95°C.                                                                         │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Verifying Party   │ Bench Test Engineers.                                                               │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Failure Condition │ Liquid fat leaking onto outer surfaces, display shelves, or consumer hands.         │
└───────────────────┴─────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ GATE 5: TRANSPARENT VIEWING & ANTI-FOG                                                                  │
├───────────────────┬─────────────────────────────────────────────────────────────────────────────────────┤
│ Current Evidence  │ Clear window (NatureFlex S02), clear film (S13), clear lid (a-680681 S22) exist.    │
│                   │ Anti-fog performance under steaming food: UNKNOWN.                                  │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Remaining Gap     │ Visual product clarity under continuous hot steaming retail cabinet conditions.     │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Required Test     │ Protocol 5.5 (C1), 6.6 (C5), 7.4 (C6). Visual fogging classification over 6 hours.  │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Observable Result │ Product details and browning clearly distinguishable from 0.5 m (Anti-fog Class 1-2)│
│                   │ throughout full 6-hour holding period.                                              │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Verifying Party   │ Retail Merchandising QA / Test Engineers.                                           │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Failure Condition │ Opaque white fogging (Class 4) obscuring product for > 30 minutes; window sagging.  │
└───────────────────┴─────────────────────────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ GATE 6: ROMANIA PROCUREMENT ROUTE                                                                       │
├───────────────────┬─────────────────────────────────────────────────────────────────────────────────────┤
│ Current Evidence  │ C1, C5: European manufacturers; local Romanian distributor stock: UNKNOWN.          │
│                   │ C6-RO-H: E-ambalaj catalogue listing (`S19`); stock/industrial MOQ: UNKNOWN.        │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Remaining Gap     │ Formal written quotation; commercial stock confirmation; MOQ; delivery lead times.  │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Required Test     │ Execution of Request for Quotation (RFQ) per HTF-03 Procurement Packet.             │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Observable Result │ Written quotation with fixed pricing in RON, defined lead times $\le 10$ days, and  │
│                   │ agreed trial MOQ.                                                                   │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Verifying Party   │ Profi Packaging Procurement Category Manager.                                       │
├───────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Failure Condition │ Unobtainable article; excessive lead times (> 8 weeks); prohibitive MOQ (> 100k).   │
└───────────────────┴─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Standardized Test Procedures & Evidence Capture Templates

### 9.1 Reusable Candidate-Agnostic Hot-Fat Holding Protocol Skeleton
This standardized procedure applies across any candidate evaluating hot-holding performance:

```text
================================================================================
STANDARD TEST PROCEDURE: STP-HTF-01 (HOT-FAT CONTINUOUS DISPLAY HOLDING)
================================================================================
1. SCOPE:
   Evaluation of complete packaging assemblies for thermal endurance, grease barrier
   integrity, structural stability, and transparent visibility under hot retail display.

2. TEST MATRICES & SURROGATES:
   Option A (Real Food): Freshly roasted seasoned rotisserie chicken or portions.
   Option B (Standardized Surrogate): Food-grade refined canola oil (85% w/w) +
   water (15% w/w) containing 1.0% sodium chloride and 0.5% oleic acid to simulate
   hot poultry fat/moisture chemistry.

3. TEST CONDITIONS:
   - Holding Environment: Forced-convection heated display cabinet.
   - Temperature Profile: Continuous 90°C ± 2°C (thermocouple verified).
   - Test Duration: 6.0 hours (360 minutes).
   - Sample Size: Minimum n = 5 complete assembled packaging units.

4. PARAMETERS TO LOG:
   - Pre-test tare mass of dry package (g).
   - Food/surrogate mass loaded (g) and initial core temperature (°C).
   - Ambient cabinet air temperature and humidity at 15-minute intervals.
   - Periodic strike-through and leak inspection at T = 30, 60, 120, 240, 360 min.
   - Post-test blotter paper weight change (Δg oil leakage).
================================================================================
```

### 9.2 Reusable Test Record Template
Every bench or pilot test execution must complete the following standardized test record:

```markdown
# PACKSHIFT PHYSICAL QUALIFICATION TEST RECORD: TR-[YYYYMMDD]-[TEST_ID]

### 1. General Metadata
- **Date & Time:** [YYYY-MM-DD HH:MM]
- **Test Facility / Location:** [Laboratory / Store Kitchen Name]
- **Test Operator(s):** [Full Name & Title]
- **Candidate ID:** [C1 / C5 / C6]
- **Configuration ID:** [e.g., C6-RO-H / C6-RO-P / SI-14]
- **Exact Article / SKU:** [Manufacturer Catalog Code]
- **Complete BOM Boundary:** [List Body, Liner, Film, Lid, Adhesive, Closure]

### 2. Test Purpose & Authority
- **Target Gate(s):** [Gate 1 Fit / Gate 3 Thermal / Gate 4 Grease / Gate 5 Viewing]
- **Test Procedure Followed:** [STP-HTF-01 / Custom Protocol Reference]

### 3. Test Inputs & Parameters
- **FACT / Measured Inputs:**
  - Ambient Room Temp / RH: [XX °C / XX %]
  - Empty Package Tare Mass: [XX.XX g]
  - Food / Simulant Mass: [XXX.X g]
- **MODELED / Assumed Test Conditions:**
  - Target Chamber Temperature: [XX °C] (MODELED_TEST_CONDITION)
  - Target Duration: [XXX minutes] (MENTOR_CLARIFICATION context)
  - Food Loading Geometry: [Whole Bird / Portion Type]

### 4. Empirical Observations & Measurements
| Interval | Chamber Temp (°C) | Food Core Temp (°C) | Grease Leakage Observed | Anti-Fog Class (1–4) | Structural / Seam Notes |
|---|---|---|---|---|---|
| T = 0m   | | | None / Dry | Class 1 | Setup complete |
| T = 30m  | | | | | |
| T = 60m  | | | | | |
| T = 120m | | | | | |
| T = 240m | | | | | |
| T = 360m | | | | | |

### 5. Quantitative Measurements & Results
- **External Oil Transfer (Blotter Test):** [Zero / XX mg oil transferred]
- **Post-Test Package Tare Mass:** [XX.XX g] (Moisture/grease absorption: XX %)
- **Residual Seam Peel Strength / Fit:** [Qualitative / N/mm if measured]
- **Photo / Video File References:** [Attach image paths / UUIDs]

### 6. Qualification Outcome & Next Action
- **Specific Protocol Result:** [ PASS / FAIL / INCONCLUSIVE ]
  *(Note: PASS applies strictly to this physical protocol criterion; it is NOT universal product approval).*
- **Evidence Confidence Level:** [ HIGH / MEDIUM / LOW / VERY_LOW ]
- **Remaining UNKNOWNs Identified:** [List open questions remaining]
- **Recommended Next Engineering Action:** [Specific next step]

**Operator Signature:** ___________________________  **Date:** ______________
```

---

## 10. Failure & Stop Conditions

To ensure physical safety, protect equipment, and prevent spurious testing, the execution of this protocol must immediately halt upon encountering any of the following **Hard Stop Conditions**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PROTOCOL HARD STOP CONDITIONS                                   │
├─────────┬───────────────────────────────┬──────────────────────────────────────────────┤
│ Code    │ Trigger Event                 │ Mandatory Immediate Action                   │
├─────────┼───────────────────────────────┼──────────────────────────────────────────────┤
│ STOP-01 │ Thermal Ignition / Smoke      │ Abort test; de-energize oven; trigger safety.│
│ STOP-02 │ Severe Substrate Melting      │ Abort test; record thermal failure; cool.    │
│ STOP-03 │ Gross Liquid Fat Dumping      │ Abort test; container unviable for hot food. │
│ STOP-04 │ Structural Collapse Under Load│ Abort test; packaging walls buckling.        │
│ STOP-05 │ Severe Toxic / Chemical Odor  │ Abort test; potential polymer decomposition. │
│ STOP-06 │ Identity Ambiguity on Sample  │ Halt testing; cannot test unverified BOM.    │
└─────────┴───────────────────────────────┴──────────────────────────────────────────────┘
```

#### Detailed Stop Trigger Specifications:
1. **STOP-01 (Thermal Ignition / Smoke):** Any emission of smoke, visible smoldering, or flame from paper, cellulosic liners, or polymer coatings during oven or cabinet exposure. *Result: Instant FAIL on Gate 3.*
2. **STOP-02 (Severe Melting / Decomposition):** Visual dripping, liquid pooling, or hole formation caused by polymer melting (e.g., attempting to expose PET/PP lids to 250°C). *Result: Instant FAIL on Gate 3.*
3. **STOP-03 (Gross Liquid Fat Dumping):** Sudden seam burst, catastrophic bottom rupture, or liquid leakage $> 5\text{ ml}$ spilling onto equipment. *Result: Instant FAIL on Gate 4.*
4. **STOP-04 (Structural Collapse):** Severe softening of cellulose tray or paper bag causing the container to fold in half or drop its contents when lifted. *Result: Instant FAIL on Gate 1 & Gate 4.*
5. **STOP-05 (Chemical / Plasticizer Off-Gassing):** Release of pungent acrid chemical fumes upon heating. *Result: Instant FAIL on Gate 2; quarantine samples for lab analysis.*
6. **STOP-06 (Identity Ambiguity):** Physical samples received do not match published manufacturer SKU, or supplier refuses to disclose substrate layers. *Action: Quarantine samples; do not generate invalid empirical data.*

---

## 11. Pilot Readiness Criteria & Decision Matrix

### 11.1 The Pilot-Readiness Decision Matrix
The table below maps the current canonical state against the physical testing milestones defined in this protocol:

```
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                     PILOT READINESS EVALUATION MATRIX                                             │
├────────────────────┬─────────────────────────────┬─────────────────────────────┬──────────────────────────────────┤
│ Gate Name          │ C1 Gaia (P1 Lead)           │ C5 BIOPAP SI-14 (P2–P4 Lead)│ C6-RO-H (250°C Fallback Lead)    │
├────────────────────┼─────────────────────────────┼─────────────────────────────┼──────────────────────────────────┤
│ 1. Physical Fit    │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED           │
│    Progression Req.│ Protocol 5.2 chicken fit    │ Protocol 6.3 portion fit    │ Protocol 7.2 body fit + curl     │
├────────────────────┼─────────────────────────────┼─────────────────────────────┼──────────────────────────────────┤
│ 2. Food Contact    │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED           │
│    Progression Req.│ Certified DoC + Simulant D2 │ Certified DoC + Simulant D2 │ Alloy cert + food lubricant DoC  │
├────────────────────┼─────────────────────────────┼─────────────────────────────┼──────────────────────────────────┤
│ 3. Thermal         │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED           │
│    Progression Req.│ Protocol 5.3 6h hold (85–95)│ Resolve 175/185°C; 6h hold  │ Protocol 7.3 250°C oven bake     │
├────────────────────┼─────────────────────────────┼─────────────────────────────┼──────────────────────────────────┤
│ 4. Grease / Leak   │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED           │
│    Progression Req.│ Protocol 5.4 6h blotter test│ Protocol 6.5 6h blotter test│ Protocol 7.5 rim/pitting check   │
├────────────────────┼─────────────────────────────┼─────────────────────────────┼──────────────────────────────────┤
│ 5. Transp. Viewing │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED           │
│    Progression Req.│ Protocol 5.5 anti-fog class │ Protocol 6.6 anti-fog class │ Protocol 7.4 two-stage lid trial │
├────────────────────┼─────────────────────────────┼─────────────────────────────┼──────────────────────────────────┤
│ 6. RO Procurement  │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED      │ QUALIFICATION REQUIRED           │
│    Progression Req.│ Written quote, MOQ, lead    │ Written quote, MOQ, sealer  │ Invoice quote, stock confirm     │
├────────────────────┼─────────────────────────────┼─────────────────────────────┼──────────────────────────────────┤
│ PILOT READINESS    │ STAGE Q0 / NOT READY        │ STAGE Q0 / NOT READY        │ STAGE Q0 / NOT READY             │
└────────────────────┴─────────────────────────────┴─────────────────────────────┴──────────────────────────────────┘
```

### 11.2 Release Decision Semantics
To maintain absolute integrity across team reporting:
- A candidate reaches **"Ready for Physical Bench Test"** only upon verified completion of Stage Q1.
- A candidate reaches **"Ready for Regulatory QA Review"** only upon verified completion of Stage Q2.
- A candidate reaches **"Ready for Bounded Store Pilot"** only upon formal sign-off of Stage Q4.
- **Strict Invariant:** These engineering milestones do **NOT** modify canonical PackShift database records, runtime API responses, or frontend decision screens until formal ingestion and Integrator acceptance.

---

## 12. Evidence Handoff Back into PackShift

When physical testing is executed under this protocol, empirical results must feed back into the PackShift digital architecture following strict governance:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PACKSHIFT EVIDENCE INGESTION PIPELINE                           │
├────────────────────────┬───────────────────────────────────────┬───────────────────────┤
│ Physical Test Output   │ Target PackShift Evidence Field       │ Ingestion Governance  │
├────────────────────────┼───────────────────────────────────────┼───────────────────────┤
│ Measured Component Mass│ `CandidateMetrics.total_package_mass` │ Replace ESTIMATED     │
│ (Protocol 4.2)         │ `CandidateMetrics.virgin_plastic_mass`│ with OBSERVED_VERIFIED│
├────────────────────────┼───────────────────────────────────────┼───────────────────────┤
│ 6-Hour Grease Leakage  │ `product_candidate_gates[].gates`     │ Update Gate 4 status  │
│ (Protocol 5.4 / 6.5)   │ `.grease_leak.status`                 │ from UNKNOWN to PASS  │
├────────────────────────┼───────────────────────────────────────┼───────────────────────┤
│ Anti-Fog Performance   │ `product_candidate_gates[].gates`     │ Update Gate 5 status  │
│ (Protocol 5.5 / 6.6)   │ `.transparent_viewing.status`         │ from UNKNOWN to PASS  │
├────────────────────────┼───────────────────────────────────────┼───────────────────────┤
│ Certified Supplier DoC │ `product_candidate_gates[].gates`     │ Update Gate 2 status  │
│ (Protocol 5.6 / 6.2)   │ `.food_contact.status`                │ from UNKNOWN to PASS  │
├────────────────────────┼───────────────────────────────────────┼───────────────────────┤
│ Written Commercial RFQ │ `ProcurementDetails.romania_unit_price`│ Replace UNKNOWN with  │
│ (HTF-03 Packet)        │ `ProcurementDetails.current_stock`    │ OBSERVED_VERIFIED     │
└────────────────────────┴───────────────────────────────────────┴───────────────────────┘
```

### Ingestion Rules:
1. Every new data point must create a new unique source ID (`SRC-XXX`) referencing the physical Test Record ID (`TR-...`), certified laboratory report number, or supplier quotation document.
2. The runtime hash (`source_revision_hash`) must be recomputed deterministically across canonical and display JSON snapshots.
3. Automated regression suites (`validate_htf03.py --self-test` and `test_acceptance_oracle.py`) must pass with zero defects prior to merge.

---

## 13. Risk Register, Open UNKNOWNs & Negative Case Guards (NG-01 to NG-10)

### 13.1 Master Negative Case Guardrail Matrix (NG-01 through NG-10)
This protocol enforces strict, hard-coded rejection against ten fatal packaging evaluation fallacies:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   TEN CRITICAL NEGATIVE TEST CASES (NG-01 to NG-10)                              │
├───────┬────────────────────────────────────────────────────────────────────────┬─────────────────────────────────┤
│ Code  │ Fatal Evaluation Fallacy / Pitfall                                     │ Mandatory Protocol Rejection    │
├───────┼────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ NG-01 │ High-temp body (e.g. 280°C aluminium) + unrated clear lid evaluated as │ REJECT. Packaging system fails  │
│       │ a single "oven-qualified" packaging system.                            │ Gate 3 thermally.               │
├───────┼────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ NG-02 │ Family-level 6h holding claim (BIOPAP LC) cited as proof that exact     │ REJECT. System boundary invalid;│
│       │ SI-14 tray + unselected film + chicken fat is qualified.               │ exact system remains UNKNOWN.   │
├───────┼────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ NG-03 │ General marketing claim ("grease-resistant rotisserie bag") cited as   │ REJECT. Requires physical 6-hour│
│       │ proof of 6-hour continuous hot chicken fat containment.                │ leak testing under Protocol 5.4.│
├───────┼────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ NG-04 │ Presence of a transparent window/film cited as proof of acceptable    │ REJECT. Fogging under steam is  │
│       │ optical product visibility without anti-fog validation.                │ UNKNOWN until tested (Gate 5).  │
├───────┼────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ NG-05 │ Public distributor catalogue listing cited as verified Romanian        │ REJECT. Listing ≠ stock;        │
│       │ inventory, commercial stock, and immediate delivery readiness.         │ procurement gate remains UNKNOWN│
├───────┼────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ NG-06 │ High renewable or recycled content cited as justification to overlook  │ REJECT. Environmental scores    │
│       │ a hard technical failure (e.g. melting at 250°C or leaking fat).       │ cannot compensate for Gate FAIL.│
├───────┼────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ NG-07 │ Technical data from European candidate (Plus Pack C6-EU 350°C) leaked   │ REJECT. Configurations are      │
│       │ into local Romanian configuration (e-pui225 C6-RO-H).                  │ isolated; zero data leakage.    │
├───────┼────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ NG-08 │ BIOPAP 175°C vs. 185°C conflict resolved silently by picking 185°C or   │ REJECT. Requires manufacturer   │
│       │ averaging to 180°C without written supplier resolution.                │ written resolution; test at 175.│
├───────┼────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ NG-09 │ Mentor 200–250°C oven context interpreted as requiring continuous      │ REJECT. Disentangle peak bake   │
│       │ exposure to 250°C for 6 hours.                                         │ (Domain A) from hold (Domain B).│
├───────┼────────────────────────────────────────────────────────────────────────┼─────────────────────────────────┤
│ NG-10 │ Successful physical benchtop leak/thermal test described as regulatory │ REJECT. Bench tests do not prove│
│       │ food-contact compliance or legal DoC certification.                    │ food safety or EU 10/2011 DoC.  │
└───────┴────────────────────────────────────────────────────────────────────────┴─────────────────────────────────┘
```

---

## 14. Execution Checklist & Phased Roadmap

To execute this qualification protocol in the physical world, the following phased sequence must be respected:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PHASED EXECUTION ROADMAP                                        │
├──────────────┬───────────────────────────────────┬─────────────────────────────────────┤
│ Phase        │ Action Items                      │ Key Deliverable                     │
├──────────────┼───────────────────────────────────┼─────────────────────────────────────┤
│ Phase 1      │ Supplier Engagement & Desk Audit  │ Q0 Frozen BOM & Written TDS         │
│ (Weeks 1–2)  │ • Issue RFQs to Sacma, BIOPAP,    │ • Resolved BIOPAP 175/185 conflict  │
│              │   E-ambalaj, and La Habibi.       │ • Nominated transparent film SKU    │
├──────────────┼───────────────────────────────────┼─────────────────────────────────────┤
│ Phase 2      │ Sample Procurement & Dimensional  │ Q1 Physical Inspection & Weighing   │
│ (Weeks 3–4)  │ • Procure 25 samples per candidate│ • Measured component mass breakdown │
│              │ • Precision analytical weighing   │ • Physical fit verification log     │
├──────────────┼───────────────────────────────────┼─────────────────────────────────────┤
│ Phase 3      │ Benchtop Environmental & Thermal  │ Q2 Stress Test Reports              │
│ (Weeks 5–6)  │ • Execute STP-HTF-01 hot holding  │ • 6-hour grease blotter logs        │
│              │ • Execute 250°C oven bake (C6)    │ • Anti-fog classification logs      │
├──────────────┼───────────────────────────────────┼─────────────────────────────────────┤
│ Phase 4      │ Laboratory Compliance Audit       │ Q3 Regulatory Dossier               │
│ (Weeks 7–8)  │ • Collect certified supplier DoCs │ • Certified Simulant D2 test reports│
│              │ • Independent lab migration audit │ • PFAS-free formal declaration      │
├──────────────┼───────────────────────────────────┼─────────────────────────────────────┤
│ Phase 5      │ Operational Store Trial & Pilot   │ Q4–Q5 Commercial Store Pilot        │
│ (Weeks 9–12) │ • Install tray sealer in test deli│ • Deli associate workflow audit     │
│              │ • 30-day supervised store trial   │ • Profi QA & Procurement sign-off   │
└──────────────┴───────────────────────────────────┴─────────────────────────────────────┘
```

### Protocol Execution Checklist for Test Engineers:
- [ ] Verify exact sample SKU matches frozen Q0 BOM prior to unpacking.
- [ ] Zero balance and record tare masses of all individual components across 10 units.
- [ ] Verify oven calibration using external independent dual thermocouples before Domain A tests.
- [ ] Verify hot-holding cabinet air temperature continuously at 90°C ± 2°C.
- [ ] Ensure white absorbent blotter paper is replaced and weighed at each 60-minute interval.
- [ ] Photograph anti-fog appearance at 0.5 m distance at every inspection interval.
- [ ] Log every observed anomaly immediately on Form `TR-HTF-01`.
- [ ] Never declare a candidate "approved" or "qualified" upon bench test completion.

---

## 15. Stretch Goal: "From Hackathon Concept to Profi Pilot"

*(One-Page Executive Transition Roadmap for Hackathon Jury & Leadership)*

```
====================================================================================================
                        FROM HACKATHON CONCEPT TO PROFI PILOT
                 A Defensible, Evidence-Backed Implementation Roadmap
====================================================================================================

      STAGE 1: DIGITAL SCREENING & EPISTEMIC SELECTION (Completed in PackShift)
      ┌────────────────────────────────────────────────────────────────────────────────────────┐
      │ • Evaluated 48 candidate/context combinations against 6 strict non-compensatory gates. │
      │ • Identified C1 Sacma Gaia (whole chicken) & C5 BIOPAP SI-14 (portions) as lead paths. │
      │ • Honest epistemic governance: 0 qualified survivors, 0 premature approvals.           │
      └────────────────────────────────────────────────────────────────────────────────────────┘
                                                  │
                                                  ▼
      STAGE 2: PHYSICAL SAMPLE SOURCING & BENCH VERIFICATION (Weeks 1 to 4)
      ┌────────────────────────────────────────────────────────────────────────────────────────┐
      │ • Procure physical production samples of Gaia bags, SI-14 trays, and e-pui225 bodies.  │
      │ • Replace modeled virgin plastic estimates with analytical balance component weighing. │
      │ • Execute 6-hour continuous hot-holding stress tests under real hot chicken fat.        │
      └────────────────────────────────────────────────────────────────────────────────────────┘
                                                  │
                                                  ▼
      STAGE 3: LABORATORY FOOD SAFETY & MIGRATION DOSSIER (Weeks 5 to 8)
      ┌────────────────────────────────────────────────────────────────────────────────────────┐
      │ • Secure formal Declarations of Compliance (DoC) under EU 10/2011 and EC 1935/2004.    │
      │ • Validate fatty food specific migration limits (Simulant D2) at high heat.            │
      │ • Confirm zero intentionally added PFAS / fluorinated grease-proofing chemicals.       │
      └────────────────────────────────────────────────────────────────────────────────────────┘
                                                  │
                                                  ▼
      STAGE 4: IN-STORE OPERATIONAL FIT & SEALING TRIAL (Weeks 9 to 10)
      ┌────────────────────────────────────────────────────────────────────────────────────────┐
      │ • Deploy compact tabletop heat-sealing machine to Profi pilot store rotisserie counter.│
      │ • Validate associate packing speed, burn safety, and customer handling ergonomics.     │
      │ • Confirm commercial delivered Romanian pricing, minimum order quantities, and stock.  │
      └────────────────────────────────────────────────────────────────────────────────────────┘
                                                  │
                                                  ▼
      STAGE 5: CONTROLLED 30-DAY RETAIL STORE PILOT (Weeks 11 to 14)
      ┌────────────────────────────────────────────────────────────────────────────────────────┐
      │ • Supervised rollout in 3–5 high-volume Profi hot food deli counters.                  │
      │ • Real-world tracking: zero package leaks, positive customer viewing, verified waste.  │
      │ • Final human decision: Profi QA & Procurement sign-off for nationwide supply contract.│
      └────────────────────────────────────────────────────────────────────────────────────────┘

====================================================================================================
  KEY COMPETITIVE ADVANTAGE: PackShift provides Profi with a scientifically defensible roadmap
  grounded in real physics, avoiding greenwashing and ensuring total food-contact regulatory safety.
====================================================================================================
```
