# NCP-HT1 — Slide Plan: PackShift / GigaFood Pitch Deck

**Document:** Slide Deck Architecture & Presentation Blueprint
**Role:** Pitch / Presentation / Data Narrative (Nicolae)
**Accepted Base:** `main @ e067764d334e260440ed69ae6d68dab42205b3a4`
**Target Length:** 9 slides (recommended 7–10 range)
**Target Pitch Time:** ~4 minutes (with ~60–90 second demo block)
**Canonical Evidence Baseline:** `docs/evidence/htf-03/**`

---

## Deck Overview & Judging Criteria Mapping

| Slide | Title / Topic | Primary Official Judging Criteria Supported | Weight |
|:---:|---|---|:---:|
| 1 | Title & Core Thesis | Presentation / Innovation | 5% / 10% |
| 2 | The High-Temperature Packaging Problem | Technical Feasibility / Retail Practicality | 15% / 15% |
| 3 | Why "One Green Package" Fails: Formats & Workflows | Retail Practicality / Technical Feasibility | 15% / 15% |
| 4 | Candidate Architecture & The 6 Hard Qualification Gates | Technical Feasibility / Innovation | 15% / 10% |
| 5 | Live Demo: PackShift Decision Engine in Action | User Experience / Innovation / Technical Feasibility | 10% / 10% / 15% |
| 6 | Environmental Evidence & Honest Uncertainty | Environmental Impact / Virgin Plastic Reduction | 25% |
| 7 | Romanian Procurement & Commercial Economics | Business Viability / Scalability | 10% / 10% |
| 8 | Qualification Gaps & Risk Management (Why Trust Us?) | Technical Feasibility / Retail Practicality | 15% / 15% |
| 9 | Implementation Roadmap & Scaling for Profi | Scalability / Business Viability / Retail Practicality | 10% / 10% / 15% |

---

## Detailed Slide Specifications

### Slide 1: Title & Core Thesis
- **Purpose:** Introduce the team, establish that physical packaging is the primary solution, and introduce PackShift as the evidence-backed decision support engine.
- **Headline:** **PackShift: Evidence-Backed Packaging Transition for Profi Hot Food**
- **Sub-headline:** *Physical sustainable packaging concepts backed by hard technical qualification gates and Romanian market reality.*
- **Key Claims:**
  1. Physical packaging is the primary deliverable; PackShift software is the evidence-backed decision and demonstration layer.
  2. Profi reportedly already has a working low-temperature solution using 100% recycled plastic; high-temperature hot-deli food (approx. 200–250°C requirement context, alongside the official brief's 180–190°C rotisserie context, and up to ~6h holding) remains the unresolved retail packaging challenge.
  3. Our core principle: **The correct sustainable packaging depends on product and workflow, and our system refuses to recommend packaging that fails hard technical requirements.**
- **Visual / Evidence Anchor:**
  - Split visual: Physical packaging concept mockup (fibre whole-chicken bag + portion tray) alongside PackShift software decision screen.
  - Logos / branding: Team Slave of Skynet / GigaFood • PackShift • Profi AgriFood Challenge.
- **Judge Criterion Supported:** Presentation (5%), Innovation (10%).
- **Demo Dependency:** Sets up the application thesis; no live software action on this slide.

---

### Slide 2: The High-Temperature Packaging Reality
- **Purpose:** Ground the judges in the severe, multi-dimensional physical constraints of hot-food retail operations.
- **Headline:** **The Real Challenge: Temperature, Grease, Visibility, and Holding Time**
- **Key Claims:**
  1. Low-temperature packaging reportedly already has a working solution using 100% recycled plastic; high-temperature rotisserie and oven deli packaging requires simultaneously satisfying temperature resistance (approx. 200–250°C target context, alongside the official brief's 180–190°C rotisserie context), food-contact safety, grease barrier, transparent viewing, and ~6 hours holding.
  2. Over-simplification creates failure: Heavier rigid plastic boxes are not automatically green; multilayer laminates harm recyclability; bags can leak or fog.
  3. Operating temperature semantics are critical: **250°C oven exposure ≠ 6 hours at 250°C.** Direct bake-in vs. post-cook hot-fill represent two fundamentally distinct physical operating regimes.
- **Visual / Evidence Anchor:**
  - 5-factor constraint hexagon: Thermal resistance (approx. 200–250°C target; 180–190°C rotisserie context) • Food Contact / Grease Barrier • Transparent Viewing Window • ~6h Hot Holding • Virgin Plastic Elimination.
  - Clear citation: Profi Challenge Canon & Mentor Clarification (VLD-MR1).
- **Judge Criterion Supported:** Technical Feasibility (15%), Retail Practicality (15%).
- **Demo Dependency:** Explains the operational requirements shown in the PackShift header.

---

### Slide 3: Why "One Green Package" Fails: Formats & Workflows
- **Purpose:** Demonstrate why universal supplier catalogues fail and why packaging must be tailored to product geometry and store workflow.
- **Headline:** **4 Products × 2 Store Workflows = Distinct Physical Solutions**
- **Key Claims:**
  1. Format divide: A whole rotisserie chicken (P1) requires a large-volume, grease-resistant, flexible or rigid format; portions (P2 wings/thighs, P3 potatoes/veg, P4 meat portions) require compact, sealable portion trays.
  2. Workflow divide: In `POST_COOK_HOT_HOLD_6H` (food cooked first, packaged hot, held up to 6h), renewable fibre architectures with cellulosic windows become viable.
  3. In `LITERAL_OVEN_250C_THEN_HOLD` (packaging placed directly in an oven at 250°C), C2, C3, C4, and C5 are strictly BLOCKED by tested thermal limits; C1 Gaia remains unresolved pending numeric peak data; and C6-RO-H aluminium body surfaces as a high-temperature fallback with closure unresolved.
- **Visual / Evidence Anchor:**
  - Matrix table diagram:
    - Rows: P1 Whole Chicken, P2 Wings/Thighs, P3 Potatoes/Vegetables, P4 Meat Portions.
    - Columns: Workflow A (`POST_COOK_HOT_HOLD_6H`) vs. Workflow B (`LITERAL_OVEN_250C_THEN_HOLD`).
- **Judge Criterion Supported:** Retail Practicality (15%), Technical Feasibility (15%).
- **Demo Dependency:** Direct conceptual match to the product and workflow selectors in the UI.

---

### Slide 4: Candidate Architecture & The 6 Hard Qualification Gates
- **Purpose:** Introduce the researched candidate families and show that PackShift enforces strict technical gates before considering environmental metrics.
- **Headline:** **Six Hard Technical Gates: Zero Qualified Survivors Today**
- **Key Claims:**
  1. We researched 6 physical candidate families: C1 Sacma Gaia (cellulose/paper), C2 Siralon 21 (nylon cook-in), C3 Cryovac Oven Ease (cook-in shrink), C4 Faerch CPET (rigid tray historical track), C5 BIOPAP LC SI-14 (cellulose tray + film), C6 Aluminium architecture.
  2. Every candidate must pass 6 non-compensable gates: Physical Fit, Food Contact, Thermal Envelope, Grease/Leak Resistance, Transparent Viewing, and Romania Procurement.
  3. **Zero False Approvals:** None of the six researched candidate families / 48 evaluated context rows in the canonical HTF-03 dataset is fully qualified today (28 QUALIFICATION REQUIRED, 20 BLOCKED, 0 qualified survivors). We never award a premature "winner" badge.
- **Visual / Evidence Anchor:**
  - The 6-Gate Funnel Graphic: Physical Fit → Food Contact → Thermal → Grease/Leak → Viewing → Procurement.
  - Gate status tally: 28 Qualification Required / 20 Blocked / 0 Fully Qualified.
- **Judge Criterion Supported:** Technical Feasibility (15%), Innovation (10%).
- **Demo Dependency:** Grounds the gate badges shown in the candidate cards.

---

### Slide 5: Live Demo: PackShift Decision Engine in Action
- **Purpose:** Synchronize with a 60–90 second live software demonstration showing dynamic constraint re-evaluation.
- **Headline:** **Demo: PackShift Enforces Discipline When Operating Constraints Change**
- **Key Claims:**
  1. **Demo Step 1 (P1 Post-Cook):** Select Whole Chicken + Post-Cook Holding. PackShift nominates **C1 Sacma Gaia** as the first qualification path (renewable paper/NatureFlex architecture), while clearly displaying `QUALIFICATION REQUIRED` because complete BOM, exact thermal limits, and delivered Romanian pricing remain to be confirmed.
  2. **Demo Step 2 (P2–P4 Post-Cook):** Switch to Portion Trays. PackShift selects **C5 BIOPAP LC SI-14**, supported by published 6h@90°C hot-hold evidence, while flagging that tray+film food-contact migration in store conditions still requires qualification.
  3. **Demo Step 3 (Workflow Switch):** Switch from Post-Cook to `LITERAL_OVEN_250C_THEN_HOLD`. Instantly, C2, C3, C4, and C5 evaluate to `BLOCKED` by tested thermal limits, while C1 Gaia remains unprioritized with thermal limits unresolved. PackShift surfaces the **C6-RO-H aluminium oven-body** fallback (Priority 2), explicitly warning that transparent retail closure cannot enter the oven, must be applied post-oven, and is not yet qualified.
- **Visual / Evidence Anchor:**
  - Live PackShift UI interaction (or side-by-side screenshot carousel showing the post-cook vs 250°C oven state changes).
- **Judge Criterion Supported:** User Experience (10%), Innovation (10%), Technical Feasibility (15%).
- **Demo Dependency:** This slide is the live demo narration checkpoint (60–90 seconds).

---

### Slide 6: Environmental Evidence & Honest Uncertainty
- **Purpose:** Present virgin plastic calculations with full scientific integrity, without greenwashing or false certainty.
- **Headline:** **Virgin Plastic Accounting: Bounded Truth Over Greenwashing**
- **Key Claims:**
  1. Canonical Formula: $\text{Virgin Plastic} = \text{Plastic Mass} \times (1 - \text{Recycled Fraction})$. Calculated per plastic component, not against total package mass.
  2. Baseline reality: Profi incumbent (B1) is virgin plastic with 0% recycled content, but its exact mass is unmeasured. We model a conservative PET/PA-like bag scenario (B1-ESTIMATED) at 2.59–12.46 g (central 6.50 g, VERY_LOW confidence).
  3. **Why we refuse to claim a single reduction percentage:**
     - In C5 BIOPAP, under our conditional material budget (treating film as virgin plastic), virgin plastic reduction vs B1-ESTIMATED ranges from **−67.6% to +82.1%** (central +52.5%). Because the range crosses zero, no saving can be guaranteed without exact film measurement.
     - In C4 Faerch CPET, even with 69–75% body PCR, total virgin plastic mass remains 25.3–54.1 g due to heavy rigid construction—substantially worse than a 6.5 g bag!
- **Visual / Evidence Anchor:**
  - Range chart showing B1-ESTIMATED (2.6–12.5 g) vs C5 film budget (2.2–4.3 g) vs C4 rigid virgin plastic (25.3–54.1 g).
  - Explicit warning callout: "Range crosses zero: no guaranteed reduction before BOM qualification."
- **Judge Criterion Supported:** Environmental Impact / Virgin Plastic Reduction (25%).
- **Demo Dependency:** Explains the environmental comparison card and assumption disclosures in the UI.

---

### Slide 7: Romanian Procurement & Commercial Economics
- **Purpose:** Demonstrate practical commercial grounding in Romanian supply chains, price transparency, and cost barriers.
- **Headline:** **Romanian Procurement Reality: Locally Sourced Samples vs Cost Truth**
- **Key Claims:**
  1. We did not stop at theoretical European materials: We mapped real Romanian procurement routes. B3 (Barleta) and C6 components have active Romanian web store listings; C1, C2, C3 require factory RFQs; C5 has a historical 2021 Romanian distributor; C4 is inactive.
  2. Public Romanian pricing: C6-RO-P portion pack (E-ambalaj 729 aluminium tray + La Habibi clear lid) costs **1.15–1.29 RON / pair incl. VAT** at 1,400-unit order scale (with free domestic shipping).
  3. **The Economic Gap:** Conventional Romanian rotisserie market reference (B3 Barleta paper+PP bag) costs **0.37026 RON incl. VAT**. Sourcing the local aluminium pair is **+210% to +249% more expensive** than conventional packaging. Profi's actual incumbent cost is UNKNOWN; the mentor's +10–15% cost tolerance is a strategic design target, not an automatic pass.
- **Visual / Evidence Anchor:**
  - Cost comparison bar chart: B3 Market Reference (0.37 RON) vs C6-RO-P Local Component Pair (1.15–1.29 RON) vs the +10–15% tolerance line.
  - Procurement maturity badges: `ROMANIA_DISTRIBUTOR_CURRENT` (C6) vs `QUOTE_REQUIRED_ROMANIA` (C1, C2, C3) vs `ROMANIA_DISTRIBUTOR_HISTORICAL` (C5).
- **Judge Criterion Supported:** Business Viability (10%), Scalability (10%).
- **Demo Dependency:** Matches the procurement and cost findings shown in the prototype.

---

### Slide 8: Qualification Gaps & Risk Management (Why Trust Us?)
- **Purpose:** Disclose remaining risks proactively and turn uncertainty into evidence of engineering discipline.
- **Headline:** **Engineering Discipline: We Disclose Exactly What Remains to be Tested**
- **Key Claims:**
  1. **Risk 1 (Baseline Unknown):** Profi's actual incumbent mass and cost are confidential. *Our solution:* We provide a bounded engineering baseline (B1-ESTIMATED) and allow live recalculation when Profi weighs their pack.
  2. **Risk 2 (Process Ambiguity):** Does Profi cook in-pack or hold post-cook? *Our solution:* We model both workflows separately rather than guessing a single temperature.
  3. **Risk 3 (Candidate Qualification):** C5 has a 175°C vs 185°C datasheet conflict, and C1 thermal limits are unpublished. *Our solution:* We preserve the conflict openly, restrict C5 to post-cook hot hold, and require formal supplier DoC before purchase.
- **Visual / Evidence Anchor:**
  - Risk & Mitigation Matrix: 5 Top Risks (R1–R5), Disclosed Status, Software Handling, Next Lab/Supplier Action.
- **Judge Criterion Supported:** Technical Feasibility (15%), Retail Practicality (15%).
- **Demo Dependency:** Grounds the "Missing Evidence & Next Actions" drawer in PackShift.

---

### Slide 9: Implementation Roadmap & Scaling for Profi
- **Purpose:** Show an actionable, low-risk transition path from hackathon prototype to store deployment across Profi's network.
- **Headline:** **The 8-Stage Qualification & Scale Roadmap**
- **Key Claims:**
  1. **Immediate Next Steps (Weeks 1–4):** Confirm Profi's exact deli temperature profile; weigh 10 incumbent bags; dispatch targeted RFQs to Sacma (C1), BIOPAP (C5), and local converters.
  2. **Validation Testing (Weeks 5–8):** Execute a proposed qualification plan with suppliers and accredited laboratories for overall and specific migration testing under fatty-food hot-fill conditions per applicable material frameworks, followed by 6-hour warming cabinet grease-barrier and anti-fog evaluation.
  3. **Store Pilot & System Scalability:** Run a 2-store trial for P1 and P2 formats; scale PackShift to evaluate all hot-deli, bakery, and fresh-meat packaging SKUs across Profi's 1,600+ Romanian stores as EU Packaging and Packaging Waste Regulation (PPWR) recyclability and minimum post-consumer recycled content targets phase in.
- **Visual / Evidence Anchor:**
  - 3-Phase Gantt / Flow Diagram: Phase 1: Operational Alignment & RFQ → Phase 2: Lab & Hot-Hold Validation → Phase 3: In-Store Deli Pilot & Digital Scaling.
- **Judge Criterion Supported:** Scalability (10%), Business Viability (10%), Retail Practicality (15%).
- **Demo Dependency:** Concluding call to action demonstrating software longevity beyond the hackathon.

---

## Slide-to-Criteria Traceability Summary

```text
Environmental impact (25%)  ──► Slide 6 (Virgin plastic formula, bounded models, C4 cautionary lesson)
Retail practicality  (15%)  ──► Slide 2 (Hot deli constraints), Slide 3 (P1–P4 formats), Slide 8 (Risk mitigation)
Technical feasibility (15%) ──► Slide 4 (6 hard gates), Slide 5 (Demo gate enforcement), Slide 8 (Gaps)
Innovation           (10%)  ──► Slide 1 (Decision engine thesis), Slide 4 (Gating architecture), Slide 5 (Dynamic logic)
Business viability   (10%)  ──► Slide 7 (Romanian pricing, B3 delta, +10–15% context), Slide 9 (Commercial pilot)
Scalability          (10%)  ──► Slide 7 (Local supply chains), Slide 9 (Network-wide SKU evaluation)
User experience      (10%)  ──► Slide 5 (PackShift live workflow demo and transparent disclosure UI)
Quality of presentation(5%) ──► Slide 1 (Framing), Slide 9 (Defensible conclusion, professional rigor)
```
