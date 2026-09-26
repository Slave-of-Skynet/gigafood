# APR-HT1 — HTF-03 Recommendation Acceptance Matrix & Oracle

**Document class:** INDEPENDENT ACCEPTANCE ORACLE / QA SPECIFICATION  
**Contract:** APR-HT1 — HTF-03 Recommendation Acceptance & Claims Safety  
**Owner:** Alisa (Product / QA / Acceptance)  
**Target Repository:** `Slave-of-Skynet/gigafood`  
**Accepted Base:** `main @ e067764d334e260440ed69ae6d68dab42205b3a4`  
**Upstream Contract:** `INT-HTF-04A — Canonical Runtime Transition & Parallelization Gate`  
**Canonical Evidence Baseline:** `docs/evidence/htf-03/**`  
**Execution Date:** 2026-09-26  

---

## 1. Executive Summary & Oracle Objective

This document establishes the **independent acceptance oracle** for the GigaFood / PackShift recommendation flow under canonical dataset `HTF-03`. As established by contract `APR-HT1` and architectural gate `INT-HTF-04A`:

1. **Independent Oracle (Phase A):** Defined purely from authoritative challenge rules, mentor clarifications, Team Integrator decisions, and the committed `HTF-03` canonical evidence snapshot (`bd4f7651fe9f82f5c0849c5708fcd2f315052317` merged into `main @ e067764d334e260440ed69ae6d68dab42205b3a4`). Expected product outcomes and claim bounds are frozen **prior to and independent of developer implementation**.
2. **Product Value Purpose:** The recommendation flow provides *decision support, evidence scoping, and demonstration* for sustainable hot-food packaging concepts for Profi. Physical packaging is the primary deliverable; software is an evidence tracking layer. Software **CANNOT** certify food safety, legal compliance, approve procurement, or declare production readiness.
3. **Canonical Snapshot Invariants:**
   - **4 Products:** `P1` (Whole rotisserie chicken), `P2` (Chicken wings / thighs), `P3` (Hot potatoes / vegetables), `P4` (Prepared hot meat portions).
   - **2 Workflows:** `POST_COOK_HOT_HOLD_6H` (Primary, Assumed), `LITERAL_OVEN_250C_THEN_HOLD` (Fallback, Thermal Inversion).
   - **6 Candidate Families:** `C1` (Sacma Gaia), `C2` (Sira-Cook Siralon 21), `C3` (CRYOVAC Oven Ease), `C4` (Faerch Evolve CPET historical exact track), `C5` (BIOPAP LC / SI-14), `C6` (Aluminium architecture: `C6-RO-P`, `C6-RO-W`, `C6-RO-H`, `C6-EU`).
   - **48 Evaluation Rows:** **28 QUALIFICATION REQUIRED**, **20 BLOCKED**, **0 Qualified Survivors**, **0 Procurement-Approved Candidates**.
4. **Historical QA Boundary:** Report `QA-R3C-current-main-final-acceptance.md` accepted the historical PackShift (Faerch Selection MVP). It must **NOT** be reused as evidence for HTF-03 recommendation runtime, Gaia/BIOPAP validity, or C6 configuration binding. It serves as regression context only.

---

## 2. Source-of-Truth Hierarchy & Precedence

All evaluations and acceptance assertions must follow strict precedence:
1. **Official AgriFood Challenge Brief / Rules (`OFFICIAL_REQUIREMENT`):** Virgin plastic reduction, high temperature, grease resistance, circularity.
2. **Explicit Mentor Clarifications (`MENTOR_CLARIFICATION`):** 11:19 Descript transcript: Physical concept is primary deliverable; high-temperature rotisserie focus; packaging bags preferred over rigid boxes; transparent window required; sizing for whole chicken vs portions; +10–15% cost tolerance is acceptable context; evidence/certificates required; domestic availability.
3. **Team Integrator Decisions (`TEAM_DECISION`):** Architecture freeze, scope bounding, fail-closed policy.
4. **Accepted Transition Gate (`INT-HTF-04A`):** Six-gate model, C6 binding matrix, baseline segregation, additive recommendation API target.
5. **HTF-03 Canonical Evidence (`CANONICAL_EVIDENCE`):** `docs/evidence/htf-03/**` datasets and ledgers.
6. **Current Implementation (`OBSERVED_IMPLEMENTATION`):** Code in `backend/` and `frontend/`. Implementation cannot override higher-level canon.
7. **Historical QA / Research (`HISTORICAL_QA`):** `QA-R3C`, `NDR-01`, `APR-EU-01`.
8. **Inference (`INFERENCE`):** Lowest authority; unevidenced facts remain `UNKNOWN`.

---

## 3. Epistemic States & Non-Compensatory Evaluation Rules

### 3.1 Epistemic State Definitions
- `OBSERVED_VERIFIED`: Directly evidenced by verified manufacturer technical data sheets, public catalogs, or laboratory certificates.
- `DERIVED_EXACT`: Exact deterministic calculation from verified observed inputs.
- `ESTIMATED`: Bounded engineering scenario calculation preserving interval bounds (`low`, `central`, `high`), confidence, and assumptions. Never rendered as a verified single point.
- `ASSUMED`: Unverified operating assumption (e.g., Profi post-cook holding workflow; PET density endpoint).
- `UNKNOWN`: Fact has not been evidenced or measured. **UNKNOWN is never zero**. Missing numeric evidence blocks dependent calculations.
- `CONFLICT`: Multiple authoritative or public sources publish contradictory metrics (e.g., BIOPAP 175°C vs 185°C). Must remain `CONFLICT`; neither value may be chosen silently.

### 3.2 Required Hard Gates
Every candidate evaluation row across all products and workflows must evaluate six non-compensatory gates:
1. `physical_fit`: Volume, dimensions, geometry, headspace, closure mechanism.
2. `food_contact`: Regulatory compliance (DoC, EU 10/2011, fatty food migration, PFAS, NIAS).
3. `thermal_workflow`: Temperature tolerance across the required workflow profile.
4. `grease_leak`: Grease/oil barrier, seam integrity, leak resistance over 6 hours.
5. `transparent_viewing`: Customer viewing window/lid during display, post-oven integrity, anti-fog.
6. `procurement`: Commercial availability in Romania, distributor/converter, MOQ, lead time, stock vs quote.

### 3.3 Non-Compensatory Rule
- **Any Gate FAIL → Outcome: `BLOCKED`**.
- **No Gate FAIL and ≥ 1 Gate UNKNOWN / QUALIFICATION_REQUIRED → Outcome: `QUALIFICATION REQUIRED`**.
- **All 6 Gates PASS → Outcome: `QUALIFIED SURVIVOR`** (Currently 0 candidates qualify).
- **Hard Rule:** Low virgin plastic or environmental benefit must **NEVER** rescue or compensate for a failed functional/safety gate. A candidate with 90% plastic reduction but failed thermal tolerance remains `BLOCKED`.

---

## 4. Master 48-Row Recommendation Acceptance Matrix

The following table constitutes the complete 48-row acceptance oracle. Every implementation API and UI must match these outcomes exactly:

| Row | Product | Workflow | Candidate | Physical Fit | Food Contact | Thermal Workflow | Grease / Leak | Transparent Viewing | Procurement | Outcome | Priority | Qualified Survivor | Procurement Approved | Key Rationale & Evidence Sources |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | P1 | POST_COOK | C1 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 1 | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S01,S02] |
| 2 | P1 | POST_COOK | C2 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S03] |
| 3 | P1 | POST_COOK | C3 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S04] |
| 4 | P1 | POST_COOK | C4 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | FAIL | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [R3,S05,S06] |
| 5 | P1 | POST_COOK | C5 | QUALIFICATION_REQUIRED | UNKNOWN | QUALIFICATION_REQUIRED | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: LC family 6h90 exists; selected film, fill an (+2 gates) [S07,S09,S10] |
| 6 | P1 | POST_COOK | C6 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 2 | FALSE | FALSE | physical_fit: C6-RO-W selects WePack 803261 body and 803262; procurement: WePack lists the C6-RO-W body/lid pair locall [S18] |
| 7 | P2 | POST_COOK | C1 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S01,S02] |
| 8 | P2 | POST_COOK | C2 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S03] |
| 9 | P2 | POST_COOK | C3 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S04] |
| 10 | P2 | POST_COOK | C4 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | FAIL | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [R3,S05,S06] |
| 11 | P2 | POST_COOK | C5 | QUALIFICATION_REQUIRED | UNKNOWN | QUALIFICATION_REQUIRED | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 1 | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: LC family 6h90 exists; selected film, fill an (+2 gates) [S07,S09,S10] |
| 12 | P2 | POST_COOK | C6 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 2 | FALSE | FALSE | physical_fit: C6-RO-P selects e-7291/729 body and a-680681 ; transparent_viewing: C6-RO-P lid a-680681 is listed as transparent (+1 gates) [S20,S22,S23] |
| 13 | P3 | POST_COOK | C1 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S01,S02] |
| 14 | P3 | POST_COOK | C2 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S03] |
| 15 | P3 | POST_COOK | C3 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S04] |
| 16 | P3 | POST_COOK | C4 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | FAIL | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [R3,S05,S06] |
| 17 | P3 | POST_COOK | C5 | QUALIFICATION_REQUIRED | UNKNOWN | QUALIFICATION_REQUIRED | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 1 | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: LC family 6h90 exists; selected film, fill an (+2 gates) [S07,S09,S10] |
| 18 | P3 | POST_COOK | C6 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 2 | FALSE | FALSE | physical_fit: C6-RO-P selects e-7291/729 body and a-680681 ; transparent_viewing: C6-RO-P lid a-680681 is listed as transparent (+1 gates) [S20,S22,S23] |
| 19 | P4 | POST_COOK | C1 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S01,S02] |
| 20 | P4 | POST_COOK | C2 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S03] |
| 21 | P4 | POST_COOK | C3 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S04] |
| 22 | P4 | POST_COOK | C4 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | FAIL | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [R3,S05,S06] |
| 23 | P4 | POST_COOK | C5 | QUALIFICATION_REQUIRED | UNKNOWN | QUALIFICATION_REQUIRED | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 1 | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: LC family 6h90 exists; selected film, fill an (+2 gates) [S07,S09,S10] |
| 24 | P4 | POST_COOK | C6 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 2 | FALSE | FALSE | physical_fit: C6-RO-P selects e-7291/729 body and a-680681 ; transparent_viewing: C6-RO-P lid a-680681 is listed as transparent (+1 gates) [S20,S22,S23] |
| 25 | P1 | LITERAL_250C | C1 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S01,S02] |
| 26 | P1 | LITERAL_250C | C2 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S03] |
| 27 | P1 | LITERAL_250C | C3 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S04] |
| 28 | P1 | LITERAL_250C | C4 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | FAIL | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [R3,S05,S06] |
| 29 | P1 | LITERAL_250C | C5 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S07,S09,S10] |
| 30 | P1 | LITERAL_250C | C6 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 2 | FALSE | FALSE | physical_fit: C6-RO-H selects the e-pui225 body. Actual fil; procurement: E-ambalaj lists the C6-RO-H e-pui225 body loc [S19,S23] |
| 31 | P2 | LITERAL_250C | C1 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S01,S02] |
| 32 | P2 | LITERAL_250C | C2 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S03] |
| 33 | P2 | LITERAL_250C | C3 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S04] |
| 34 | P2 | LITERAL_250C | C4 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | FAIL | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [R3,S05,S06] |
| 35 | P2 | LITERAL_250C | C5 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S07,S09,S10] |
| 36 | P2 | LITERAL_250C | C6 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 2 | FALSE | FALSE | physical_fit: C6-RO-H selects the e-pui225 body. Actual fil; procurement: E-ambalaj lists the C6-RO-H e-pui225 body loc [S19,S23] |
| 37 | P3 | LITERAL_250C | C1 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S01,S02] |
| 38 | P3 | LITERAL_250C | C2 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S03] |
| 39 | P3 | LITERAL_250C | C3 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S04] |
| 40 | P3 | LITERAL_250C | C4 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | FAIL | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [R3,S05,S06] |
| 41 | P3 | LITERAL_250C | C5 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S07,S09,S10] |
| 42 | P3 | LITERAL_250C | C6 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 2 | FALSE | FALSE | physical_fit: C6-RO-H selects the e-pui225 body. Actual fil; procurement: E-ambalaj lists the C6-RO-H e-pui225 body loc [S19,S23] |
| 43 | P4 | LITERAL_250C | C1 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; transparent_viewing: Clear concept/component identified; steam/ant (+1 gates) [S01,S02] |
| 44 | P4 | LITERAL_250C | C2 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S03] |
| 45 | P4 | LITERAL_250C | C3 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S04] |
| 46 | P4 | LITERAL_250C | C4 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | FAIL | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [R3,S05,S06] |
| 47 | P4 | LITERAL_250C | C5 | QUALIFICATION_REQUIRED | UNKNOWN | FAIL | UNKNOWN | QUALIFICATION_REQUIRED | QUALIFICATION_REQUIRED | **BLOCKED** | - | FALSE | FALSE | physical_fit: Actual fill dimensions, mass, usable headspac; thermal_workflow: Published upper body/grade claim is below 250 (+2 gates) [S07,S09,S10] |
| 48 | P4 | LITERAL_250C | C6 | QUALIFICATION_REQUIRED | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | QUALIFICATION_REQUIRED | **QUALIFICATION REQUIRED** | 2 | FALSE | FALSE | physical_fit: C6-RO-H selects the e-pui225 body. Actual fil; procurement: E-ambalaj lists the C6-RO-H e-pui225 body loc [S19,S23] |

---

## 5. Primary Product Decisions & Demo Critical Paths

### 5.1 Product 1 (Whole Rotisserie Chicken) — Post-Cook Workflow (`POST_COOK_HOT_HOLD_6H`)
- **Primary Qualification Path:** `C1 Sacma B.Life Gaia` (qualification_priority = 1).
  - *Rationale:* Renewable windowed whole-chicken bag architecture; bag format matches mentor preference for rotisserie chicken.
  - *Current Status:* `QUALIFICATION REQUIRED`.
  - *Local Sample Alternative:* `C6-RO-W` (WePack 803261+803262 paired whole-chicken container; lid material and transparency remain UNKNOWN; clear closure requires qualification).
  - *Secondary Qualification Path:* `C6 Aluminium` (qualification_priority = 2, strictly bound to `C6-RO-W`).
  - *Display Benefit Rule:* No verified plastic-saving claim. Show conditional model ranges in scenario details; C1 actual plastic unknown.
  - *Critical Gaps:* Food contact fatty-food DoC, 6-hour holding seam integrity, Romanian distributor stock/quote required.

### 5.2 Products 2, 3, 4 (Wings/Thighs, Potatoes/Veg, Meat Portions) — Post-Cook Workflow (`POST_COOK_HOT_HOLD_6H`)
- **Primary Qualification Path:** `C5 BIOPAP LC SI-14 + heat-sealable transparent film` (qualification_priority = 1).
  - *Rationale:* Explicit LC family 6h @ 90°C holding lead, exact SI-14 tray dimensions (180x138x44 mm), and historical body mass (23.5 g) make it the strongest portion qualification path.
  - *Current Status:* `QUALIFICATION REQUIRED`.
  - *Local Sample Alternative:* `C6-RO-P` (E-ambalaj 729 uncompartmented tray + La Habibi a-680681 transparent lid).
  - *Secondary Qualification Path:* `C6 Aluminium` (qualification_priority = 2, bound to `C6-RO-P`).
  - *Display Benefit Rule:* Show estimated SI-14 total pack mass (≈26.6 g, range 23.4–30.2 g). Conservative film-as-plastic scenario shows central 52.5% reduction vs B1-ESTIMATED, but interval spans **-67.6% to +82.1%**. Therefore, **NO unconditional saving badge** is permitted.
  - *Critical Gaps:* Exact SI-14 + selected film food contact DoC, 175°C vs 185°C conflict, Romanian procurement quote.

### 5.3 Products 1–4 — Fallback Workflow (`LITERAL_OVEN_250C_THEN_HOLD`)
- **Thermal Inversion Reality:**
  - Candidates `C2` (Siralon 21, max 200°C), `C3` (Oven Ease, max 200/220°C), `C4` (CPET, max 220°C), and `C5` (BIOPAP, max 175/185°C) are **STRICTLY BLOCKED** (`thermal_workflow: FAIL`).
  - Candidate `C1 Gaia`: `QUALIFICATION REQUIRED` (paper body thermal limit unverified at 250°C; qualification_priority = None).
  - High-Temperature Fallback Qualification Path: `C6 Aluminium` bound to `C6-RO-H` (E-ambalaj e-pui225).
  - *Outcome:* `QUALIFICATION REQUIRED` (qualification_priority = 2).
  - *Hard Demarcation:* C6 priority **REMAINS 2**. It must **NEVER** be renumbered as priority 1 or declared a "winner".
  - *Critical Unresolved Factors:* 280°C seller claim applies to aluminium body ONLY; compatible transparent lid cannot enter 250°C oven; duration at 250°C is UNKNOWN; 6-hour holding safety post-oven is UNKNOWN.

---

## 6. C6 Configuration Binding & Anti-Leakage Matrix

To prevent invalid cross-pollination between aluminium configurations, the runtime and UI must enforce strict isolation:

| Configuration ID | Context / Product Binding | Role / Description | Unit Price (RON) | Max Body Temp | Transparent Lid | Procurement Status | Anti-Leakage Isolation Rule |
|---|---|---|---|---|---|---|---|
| **`C6-RO-P`** | P2, P3, P4 + POST_COOK | E-ambalaj 729 tray + La Habibi clear lid | 1.15–1.29 RON/pair (E021) | No high-temp rating | Verified present (`a-680681`) | Local distributor listed | Pricing & lid CANNOT qualify RO-H or RO-W. |
| **`C6-RO-W`** | P1 + POST_COOK | WePack 803261+803262 whole chicken tray | 3.52 RON/pair (E027) | Body only | UNKNOWN (unverified material) | Local distributor listed | Lid transparency CANNOT be assumed from RO-P. |
| **`C6-RO-H`** | P1–P4 + LITERAL_250C | E-ambalaj e-pui225 2400 ml body | 1.43 RON/body (E029, lid absent) | 280°C seller claim | Absent / UNKNOWN | Local distributor listed | Body rating CANNOT qualify complete pack; price excludes clear lid. |
| **`C6-EU`** | Technical Reference Only | Plus Pack 0192110201 body + 5023100000 lid | UNKNOWN in Romania | 350°C body rating | Clear lid (post-oven only) | No confirmed RO route | 350°C body rating CANNOT qualify Romanian RO-H or complete system. |

---

## 7. Baseline Segregation & Comparison Safety

1. **`B1` (Actual Profi Incumbent):**
   - Format: Bag (`OBSERVED_VERIFIED`).
   - Material Class: Virgin plastic (`OBSERVED_VERIFIED`, 100% virgin fraction per mentor).
   - Unknowns: Exact polymer, gauge, dimensions, mass, supplier, unit cost, annual volume (`UNKNOWN`).
   - Rule: Never claim measured Profi mass or cost unless official supplier invoices are provided.
2. **`B1-ESTIMATED` (Modeled Scenario):**
   - Calculation ID: `E002`.
   - Total Mass: Central **6.5 g**, range **2.6–12.5 g** (`ESTIMATED`).
   - Assumptions: Modeled PET/PA commercial rotisserie bag geometry.
   - Rule: All comparisons must visibly state *"estimated Profi baseline scenario"*.
3. **`B2` (Virgin Plastic Market Reference):**
   - Role: Unresolved market reference. Must not be substituted with fiber or metal.
4. **`B3` (Romanian Market Reference):**
   - Product: Barleta 128002 paper + PP rotisserie bag (370.26 RON / 1000 pcs, 0.37 RON/pc).
   - Rule: **MUST NEVER BE CALLED "PROFI BASELINE"**. Must be explicitly labeled *"Romanian conventional rotisserie-market reference"*.

---

## 8. Target API Surface & Fail-Closed Transport Invariants (INT-HTF-04A Section H)

1. **Frozen Target Recommendation API Surface:**
   - As established in `INT-HTF-04A` Section H, the target recommendation surface consists strictly of:
     - `GET /api/v1/recommendation/products`: Product catalog P1–P4, two workflow definitions, default P1/post-cook, context assumptions, dataset revision/cutoff.
     - `GET /api/v1/recommendation/candidates`: C1–C6 catalog plus four separately keyed C6 configurations (`C6-RO-P`, `C6-RO-W`, `C6-RO-H`, `C6-EU`), B1/B2/B3 summaries; curated evidence and no computed universal recommendation.
     - `POST /api/v1/recommendation/evaluate`: Required `product_id`, `workflow_id`; optional `configuration_id` selecting a C6 variant (absent means exact C6 gate binding for that context).
   - Under no circumstances may the endpoint be referred to as `/api/v1/recommendations`.

2. **Transport & Failure Semantics:**
   - **Missing / Unreadable Recommendation Snapshot:** Return `503 RECOMMENDATION_EVIDENCE_UNAVAILABLE`. Never serve old Faerch Selection as a fallback substitute.
   - **Malformed / Unknown Product or Workflow IDs:** Return `422` validation error.
   - **Unsupported C6 Configuration Request:** If a request supplies a C6 configuration lacking an evaluated row for that context (e.g., `C6-EU` in any evaluated context, or `C6-RO-H` under post-cook), return `422 CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT`.
   - **Valid Request with Incomplete Evidence:** Return `200 OK` with explicit `QUALIFICATION REQUIRED` or `BLOCKED` assessments and preserved `UNKNOWN` / `CONFLICT` states; missing price or metric fields are valid payload output.

3. **Stale State Guard:**
   - Switching workflow from `POST_COOK` to `LITERAL_250C` must immediately invalidate post-cook qualification paths and display the thermal inversion landscape. Stale responses must be rejected.

4. **Forbidden Terminology:**
   - The words **"winner"**, **"best"**, **"approved"**, **"certified"**, **"safe"**, and **"ready for deployment"** are strictly forbidden in recommendation responses.
