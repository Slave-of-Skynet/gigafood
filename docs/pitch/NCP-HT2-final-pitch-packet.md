# NCP-HT2 — Final Judge Narrative, Pitch Packet & Synchronization Master

**Document class:** AUTHORITATIVE PITCH PACKET / SLIDE ARCHITECTURE / SPOKEN SCRIPTS / DEMO SYNCHRONIZATION
**Contract:** NCP-HT2 — Final Judge Narrative, Demo & Evidence Synchronization (Claim-Safety Reconciliation)
**Owner:** Mr-Ressentiment (Nicolae)
**Role:** Pitch / Presentation / Data Narrative / Claim-Evidence Synchronization
**Target Repository:** `Slave-of-Skynet/gigafood`
**Working Branch:** `nicolae/ncp-ht2-final-judge-narrative`
**Verified Base SHA:** `513e0867feaf1b3062c1c02e98d51f2eaa4f1f93` (`origin/main`)
**Canonical Evidence Baseline:** `docs/evidence/htf-03/**`
**Execution Date:** 2026-09-27

---

## Parallel Workstream Alignment Status

| Workstream | Owner | Status | Reconciled Content & State |
|---|---|---|---|
| **PUX-HT2R** (Canonical Recommendation Journey) | Denis | **INSPECTED ON BRANCH** (`158abd5f`) | Inspected on `origin/denis/pux-ht2r-canonical-recommendation-ux`. UI components, mode pills, button labels, and 6-gate cards reconciled as **TARGET DEMO — pending merge to main**. |
| **APR-HT2A** (Post-Revert Acceptance Reconciliation) | Alisa | **PENDING APR-HT2A RECONCILIATION** | Current-main backend runtime verified (`GET /api/v1/recommendation/products`, `GET /api/v1/recommendation/candidates`, `POST /api/v1/recommendation/evaluate`). Anchored to APR-HT1 acceptance invariants. |
| **IGR-HT3** (Physical Qualification Protocol) | Igor | **PENDING IGR-HT3 RECONCILIATION** | Physical qualification protocol, lab testing sequencing, and store pilot roadmap reconciled to canonical HTF-03 evidence. |

---

# A. Core Pitch Thesis & Non-Negotiables

## 1. The Core Thesis

> **The primary solution is a sustainable physical packaging transition for Profi hot food.**
> **PackShift is the evidence-backed decision and demonstration layer** that shows which physical concepts are worth qualifying, why they are not yet approved, and what evidence must be obtained next.

We do **NOT** present a software-first pitch. Software does not hold a rotisserie chicken, seal in hot fat, prevent steam condensation, or satisfy EU food-contact migration laws.

## 2. Core Operational Axioms

1. **Physical Challenge First:** The challenge is physical: evaluating transitions from an unmeasured, 100% virgin plastic rotisserie bag to sustainable physical packaging concepts capable of surviving retail hot-food constraints.
2. **Six Non-Compensatory Technical Gates:** Every candidate must be evaluated against:
   - **Physical Fit** (packaging volume, geometry, headspace, closures)
   - **Food Contact** (EU 10/2011, Framework 1935/2004, fatty-food migration, finished-system DoC)
   - **Thermal Envelope** (exposure temperature and duration compatibility)
   - **Grease / Leak Resistance** (containment under hot poultry fat)
   - **Transparent Viewing** (customer visibility into hot display)
   - **Romania Procurement** (delivered Romanian supply route and pricing)
   *Rule: Environmental benefit cannot compensate for a hard technical gate failure.* A material that exceeds thermal limits evaluates to **BLOCKED**. Where critical food-contact, grease resistance, or procurement evidence is missing or UNKNOWN, the status evaluates to **QUALIFICATION REQUIRED**, never approved.
3. **Zero False Approvals (0 Qualified Survivors):** Across all 6 candidate families, 4 product archetypes, 2 workflows, and 48 evaluated context rows:
   - **28 QUALIFICATION REQUIRED**
   - **20 BLOCKED**
   - **0 QUALIFIED SURVIVORS**
   - **0 PROCUREMENT APPROVALS**
   We did not fabricate a winner in 48 hours. A hackathon team cannot responsibly certify food contact or store safety. Refusing to declare a false winner demonstrates engineering integrity.
4. **Distinct Physical Qualification Paths:**
   - **Whole Chicken (`P1`) / Post-Cook Hot Hold:** Prioritise **C1 Sacma B.Life Gaia** (Priority 1 qualification path; renewable kraft paper + NatureFlex cellulosic transparent window).
   - **Portions (`P2`–`P4`) / Post-Cook Hot Hold:** Prioritise **C5 BIOPAP LC SI-14** (Priority 1 qualification path; compostable cellulose tray + transparent sealing film; family-level 6h@90°C hot-hold evidence).
   - **Literal 250°C Workflow:** Standard polymers and cellulose fail (`C2`–`C5` **BLOCKED**; `C1` unprioritized/unresolved). System surfaces **C6-RO-H aluminium body** as a **Priority 2 High-Temperature Fallback Qualification Path** (with explicit disclosure that **no selected transparent closure is qualified for 250°C** and clear lid remains a post-oven component).
5. **Temperature Exposure Semantics:**
   $$\text{250°C peak oven cooking} \neq \text{holding at high temperature}$$
   We strictly separate peak cooking exposure (up to 250°C in combi/rotisserie oven) from in-store hot holding (actual Profi holding temperature = **UNKNOWN**; **85–95°C is an explicitly labeled modeled validation condition**; not 65–85°C or 70–90°C as facts).
6. **Epistemic Discipline:**
   - Actual Profi incumbent mass, unit price, volume, and store network volume = **UNKNOWN**.
   - Virgin plastic reduction for C5 BIOPAP spans from **−67.6% to +82.1%** (central +52.5%). Because the range crosses zero, **no reduction can be guaranteed** until exact film and incumbent package are measured.
   - Sourcing listings $\neq$ warehouse stock.
   - Mentor $+10\text{--}15\%$ cost tolerance is a **commercial design context**, not procurement approval.

## 3. Semantic Distinctions

- `CURRENT FACT`: Implemented and verified on `origin/main` at `513e0867`.
- `TARGET AFTER PUX-HT2R`: Implemented on Denis' branch `origin/denis/pux-ht2r-canonical-recommendation-ux` (`158abd5f`), verified against code, pending merge to `main`.
- `PROPOSED PHYSICAL VALIDATION`: Laboratory protocols, RFQs, and store pilot steps required before Profi commercial deployment.

---

# B. Slide Architecture (~4 Minutes, 9 Slides)

| Slide | Title / Purpose | Key Visual / Screen | Spoken Time | Supported Judging Criteria |
|:---:|---|---|:---:|---|
| **1** | **Sustainable Hot-Food Packaging That Survives Real Retail Constraints** | Split visual: Physical concept mockup (C1 bag & C5 tray) + PackShift decision layer | 0:00–0:25 (25s) | Quality of presentation (5%), Innovation (10%) |
| **2** | **The High-Temperature Hot-Food Problem** | Multi-factor retail constraint hexagon (Temp, Hold, Grease, Food Contact, Visibility, Cost) | 0:25–0:55 (30s) | Technical feasibility (15%), Retail practicality (15%) |
| **3** | **Candidate Research: Six Real Packaging Families** | 6 candidate packaging architectures mapped against format & materials | 0:55–1:20 (25s) | Technical feasibility (15%), Retail practicality (15%) |
| **4** | **Engineering Discipline: Six Non-Compensatory Gates** | 6-gate evaluation model + 48-row outcome tally (28 Qual. Req., 20 Blocked, 0 Qualified) | 1:20–1:50 (30s) | Technical feasibility (15%), Innovation (10%) |
| **5** | **Physical Qualification Paths: C1, C5 & C6 Fallback** | 3-column physical roadmap: Whole Chicken (C1), Portions (C5), High-Temp Fallback (C6) | 1:50–2:15 (25s) | Technical feasibility (15%), Retail practicality (15%) |
| **DEMO** | **PackShift Decision Engine Live Demonstration** | Synchronized software demonstration (TARGET or FALLBACK path) | 2:15–3:25 (70s) | User experience (10%), Innovation (10%), Feasibility (15%) |
| **6** | **Environmental Impact: Virgin Plastic Priority & Honest Bounded Truth** | B1-ESTIMATED vs C5 plastic budget range (−68% to +82%) vs C4 rigid mass warning | 3:25–3:55 (30s) | Environmental impact / Virgin plastic priority (25%) |
| **7** | **Romanian Commercial Reality: Local Sourcing Truth & Cost Limits** | Romanian market pricing (B3 0.37 RON vs C6-RO-P 1.15–1.29 RON) + Mentor +10–15% context | 3:55–4:20 (25s) | Business viability (10%), Scalability (10%) |
| **8** | **From Physical Concept to Store Pilot** | 6-step qualification roadmap: Sample → Fit → 6h Hold/Grease → DoC → Quote → Pilot | 4:20–4:45 (25s) | Scalability (10%), Retail practicality (15%) |
| **CLOSE** | **Closing Argument & Transition to Q&A** | Definitive summary: "Evidence-backed physical transition, zero greenwashing" | 4:45–5:00 (15s) | Presentation (5%), Feasibility (15%) |

---

## Detailed Slide Specifications & Presenter Handoff Cards

### Slide 1: Sustainable Hot-Food Packaging That Survives Real Retail Constraints
- **Slide Goal:** Hook judges immediately with the physical packaging thesis; define PackShift as the evidence-backed decision layer; eliminate software-first confusion.
- **Headline:** **Sustainable Hot-Food Packaging That Survives Real Retail Constraints**
- **Sub-headline:** *Physical Packaging Concepts Backed by Hard Technical Qualification Gates and Romanian Market Reality*
- **What to Show:**
  - Left: Physical packaging concepts (render/mockup of C1 Sacma Gaia paper bag with transparent NatureFlex window + C5 BIOPAP cellulose tray with clear seal film).
  - Right: PackShift decision layer card showing 6 hard gates and zero false approvals.
  - Context Banner: *"According to mentor clarification, low-temperature packaging reportedly already has a working solution using 100% recycled plastic; high-temperature hot-food packaging remains Profi's unresolved focus."*
- **What to Say:**
  > *"Good afternoon, judges. Our team did not build software to avoid the physical packaging challenge. Our primary solution is a sustainable physical packaging transition for Profi's hot deli counter. PackShift is our evidence-backed decision and demonstration layer.*
  >
  > *In cold packaging, Profi reportedly already has a working 100% recycled plastic solution. But when you walk up to the hot rotisserie counter, the laws of physics change. Today, we show you which physical concepts are worth qualifying, why none is yet approved, and the exact evidence required before Profi buys."*
- **What NOT to Say:**
  - Do NOT say: *"We built an AI platform that solves packaging"* or *"We built an app that recommends the best package."*
  - Do NOT say: *"Profi verified that cold packaging is 100% solved"* (frame as mentor clarification).
- **Likely Judge Interruption:** *"Why are you showing software if this is a packaging challenge?"*
- **One-Line Recovery Answer:** *"Software cannot hold a chicken; our deliverable is the physical packaging concept (C1 Gaia and C5 BIOPAP), and PackShift is the decision layer evaluating candidate evidence against operational gates."*

---

### Slide 2: The High-Temperature Hot-Food Problem
- **Slide Goal:** Establish the extreme physical difficulty of hot food; separate 250°C oven cooking from hot holding.
- **Headline:** **Why Hot Food is Hard: Temperature, Grease, Visibility, and Time**
- **What to Show:**
  - Multi-dimensional retail constraint diagram:
    1. Thermal Envelope (approx. 200–250°C oven context; 180–190°C rotisserie context)
    2. Holding Duration (up to approx. 6 hours; actual Profi holding temperature = UNKNOWN; 85–95°C modeled validation condition)
    3. Food Contact Safety (EU 10/2011, Framework 1935/2004, fatty-food migration, DoC)
    4. Grease & Oil Resistance (hot poultry fat containment)
    5. Transparent Viewing Window (shoppers must see the food; anti-fog requirement)
    6. Product Formats (1.0–1.3 kg whole chicken vs small deli portions)
  - Critical Callout Box: **$\text{250°C peak oven cooking} \neq \text{holding at high temperature}$. Actual holding temperature is UNKNOWN; 85–95°C modeled validation condition.**
- **What to Say:**
  > *"Why has hot food remained unresolved? Because you must satisfy six brutal retail constraints simultaneously. You need heat resistance up to 250°C in an oven, grease barrier against hot poultry fat, food contact compliance, and up to six hours of heated display.*
  >
  > *Crucially, shoppers demand a transparent window—nobody buys rotisserie chicken blindly. Yet standard bio-plastics melt at hot temperatures, and heavy plastic containers defeat the environmental mission.*
  >
  > *Most importantly: 250°C in an oven is NOT six hours at 250°C. Food cooked on a rotisserie and packed hot undergoes a completely different physical stress than food baked directly inside packaging."*
- **What NOT to Say:**
  - Do NOT say: *"The package must survive 250°C for 6 hours."*
  - Do NOT claim that high temperature resistance automatically equals food safety.
- **Likely Judge Interruption:** *"Does the packaging actually go into the 250°C oven?"*
- **One-Line Recovery Answer:** *"That depends on store workflow: rotisserie chickens are roasted first and packed hot (actual holding temperature UNKNOWN; 85–95°C modeled validation condition), but if Profi requires in-pack 250°C baking, our system evaluates that as a separate high-temperature stress workflow."*

---

### Slide 3: Candidate Research: Six Real Packaging Families
- **Slide Goal:** Demonstrate breadth of engineering search across 6 physical packaging families; emphasize market breadth over a narrow catalogue.
- **Headline:** **Candidate Research: Six Physical Packaging Families**
- **What to Show:**
  - Grid of 6 physical packaging families:
    1. **C1 Sacma B.Life Gaia:** Renewable kraft paper + NatureFlex cellulose transparent window (flexible bag format).
    2. **C2 Sira-Cook Siralon 21:** High-temperature nylon cook-in film (rated to 210°C; comparator).
    3. **C3 CRYOVAC Oven Ease:** Multilayer cook-in shrink platform (rated to 220°C; comparator).
    4. **C4 Faerch Evolve CPET:** Rigid recycled plastic tray (historical track; 69–75% body PCR).
    5. **C5 BIOPAP LC SI-14:** Compostable cellulose tray + transparent compostable sealing film (1,240 ml).
    6. **C6 Aluminium Architecture:** Aluminium container body + transparent closure (Romanian listings & EU reference).
- **What to Say:**
  > *"We conducted extensive market research across six distinct physical packaging families—from Italian cellulosic paper bags and compostable catering trays, to high-temperature nylon cook-in films, rigid CPET, and Romanian aluminium systems.*
  >
  > *We did not look for marketing slogans. We gathered technical datasheets, material declarations, temperature limits, and local Romanian distribution listings for each family."*
- **What NOT to Say:**
  - Do NOT spend equal presentation time on all six (focus on C1, C5, and C6 fallback).
  - Do NOT call any candidate "the winner" or "production ready."
- **Likely Judge Interruption:** *"Why did you include CPET or nylon if they are plastics?"*
- **One-Line Recovery Answer:** *"They serve as essential technical comparators: evaluating them showed that high PCR in heavy rigid plastic (C4) still uses four times more virgin plastic than our modeled bag scenario."*

---

### Slide 4: Engineering Discipline: Six Non-Compensatory Gates
- **Slide Goal:** Present the 6-gate evaluation model; celebrate **0 qualified survivors** as rigorous engineering discipline.
- **Headline:** **Six Hard Technical Gates: Zero False Approvals**
- **What to Show:**
  - 6 Non-Compensatory Gates Diagram:
    $\text{Physical Fit} \rightarrow \text{Food Contact} \rightarrow \text{Thermal Envelope} \rightarrow \text{Grease/Leak} \rightarrow \text{Transparent Viewing} \rightarrow \text{Procurement}$
  - Rule Callout: *Environmental benefit cannot compensate for a hard technical gate failure.*
  - The 48-Row Decision Matrix Tally:
    - **4 Products** (P1 Whole Chicken, P2 Wings/Thighs, P3 Potatoes/Veg, P4 Hot Meat Portions)
    - $\times$ **2 Workflows** (Post-Cook Hot Hold vs Literal 250°C Oven Cycle)
    - $\times$ **6 Candidates**
    - = **48 Candidate/Context Rows**
    - **28 QUALIFICATION REQUIRED** | **20 BLOCKED** | **0 QUALIFIED SURVIVORS** | **0 FALSE APPROVALS**
- **What to Say:**
  > *"Here is our core engineering differentiator. PackShift evaluates packaging against six strict, non-compensatory gates: Physical Fit, Food Contact, Thermal Envelope, Grease Resistance, Transparent Viewing, and Romanian Procurement.*
  >
  > *Our rule is absolute: an environmental metric cannot compensate for a technical failure. If a material exceeds thermal limits or fails a physical gate, it evaluates to BLOCKED; where critical food-contact migration or grease barrier evidence is missing or UNKNOWN, it evaluates to QUALIFICATION REQUIRED, never approved.*
  >
  > *Across 48 evaluated combinations, our canonical result is: 28 require physical qualification, 20 are technically blocked, and exactly ZERO are qualified survivors today.*
  >
  > *We did not fabricate a winner in 48 hours. A hackathon team cannot grant food safety certifications. We tell Profi the truth."*
- **What NOT to Say:**
  - Do NOT apologize for 0 survivors; present it as proof of scientific rigor.
  - Do NOT say: *"None of the packages work"* (they require qualification, not all are blocked).
- **Likely Judge Interruption:** *"If you have zero qualified survivors, did you fail the challenge?"*
- **One-Line Recovery Answer:** *"No, we solved the real transition challenge: we eliminated 20 unviable paths, identified the top 2 qualification paths, and defined the exact tests required before procurement commits capital."*

---

### Slide 5: Physical Qualification Paths: C1, C5 & C6 Fallback
- **Slide Goal:** Map the 3 primary physical paths; show why whole chicken and portions diverge; state remaining gaps.
- **Headline:** **Physical Qualification Paths: Tailored by Format and Workflow**
- **What to Show:**
  - 3-Column Architecture:
    1. **P1 Whole Chicken / Post-Cook:** **C1 Sacma Gaia** (Priority 1 Qualification Path)
       - *Architecture:* Renewable paper + NatureFlex cellulosic window bag.
       - *Gaps to Qualify:* Exact size/BOM, physical whole-chicken fit, finished-system fatty-food migration DoC, 6h hot grease leak test, anti-fog clarity, delivered Romanian pricing.
    2. **P2–P4 Deli Portions / Post-Cook:** **C5 BIOPAP LC SI-14** (Priority 1 Qualification Path)
       - *Architecture:* Cellulose tray (1,240 ml) + transparent compostable heat-seal film.
       - *Gaps to Qualify:* Tray+film system food-contact DoC, resolve 175°C vs 185°C datasheet conflict, verify 6h@90°C hot fat barrier on nominated system, Romanian commercial supply contract.
    3. **Literal 250°C Oven Cycle:** **C6-RO-H Aluminium Body** (Priority 2 High-Temp Fallback)
       - *Architecture:* Heavy-gauge aluminium oven body (280°C seller claim).
       - *Gaps to Qualify:* Body $\neq$ complete package; **no selected transparent closure is qualified for 250°C**; clear lid applied post-oven; complete finished system pricing unconfirmed (e-pui225 body listed at 1.43 RON incl. VAT without clear closure; portion pricing of +210–249% applies strictly to C6-RO-P against B3, not C6-RO-H).
- **What to Say:**
  > *"Because physical packaging depends on format, our solution provides three clear paths:*
  >
  > *For Whole Rotisserie Chicken under post-cook hot holding, our first qualification path is **Sacma Gaia**. It combines renewable kraft paper with a NatureFlex cellulosic viewing window in a flexible format that accommodates bird geometry without bulky headspace.*
  >
  > *For Portioned Sides like wings and roasted potatoes, our first qualification path is **BIOPAP LC SI-14**—a compostable cellulose tray backed by family-level hot-hold evidence up to six hours at 90°C.*
  >
  > *If Profi requires literal 250°C in-pack oven baking, candidates C2 through C5 evaluate to BLOCKED, C1 Gaia remains unresolved, and the **C6-RO-H aluminium body** serves as a Priority 2 fallback. But we do not hide the catch: no selected transparent closure is qualified for 250°C. The clear lid must be applied after baking, and complete system pricing remains unconfirmed."*
- **What NOT to Say:**
  - Do NOT say C6 is a complete 250°C transparent package.
  - Do NOT say "only aluminium survives 250°C".
  - Do NOT transfer C6-RO-P +210–249% cost deltas to C6-RO-H.
- **Likely Judge Interruption:** *"Why not use a rigid box for the whole chicken?"*
- **One-Line Recovery Answer:** *"A rigid whole-chicken box adds severe tare weight, increases transport volume, and requires 1,800–2,200 ml capacity, multiplying virgin material mass."*

---

### Slide 6: Environmental Impact: Virgin Plastic Priority & Honest Bounded Truth
- **Slide Goal:** Prioritize virgin plastic reduction; disclose that BIOPAP range crosses zero; explain baseline uncertainty; share the C4 CPET cautionary lesson.
- **Headline:** **Environmental Impact: Virgin Plastic Priority & Bounded Accounting**
- **What to Show:**
  - Official Challenge Formula:
    $$\text{Virgin Plastic} = \text{Plastic Mass} \times (1 - \text{Recycled Content Fraction})$$
  - Baseline Reality: Profi incumbent bag (`B1`) is 100% virgin plastic (mentor clarification), but exact mass is unmeasured and UNKNOWN. Modeled engineering scenario (`B1-ESTIMATED`) = 2.59–12.46 g (central 6.50 g).
  - C5 BIOPAP Virgin Plastic Reduction Range:
    - **−67.6% to +82.1% (central +52.5%)**
    - Callout: *Range crosses zero. No reduction is guaranteed until exact film gauge and incumbent mass are measured.*
  - Cautionary Lesson (C4 Faerch CPET):
    - Whole-pack model results in **25.3–54.1 g of virgin plastic** (central 36.2 g) due to 73 g total mass; even against the upper bound of the modeled bag scenario (B1-ESTIMATED: 2.59–12.46 g, central 6.50 g; actual Profi incumbent mass is UNKNOWN), a rigid CPET tray substantially increases virgin plastic use. High PCR alone in a heavy rigid container does not guarantee a sustainable transition.
- **What to Say:**
  > *"The official challenge's top priority is virgin plastic reduction. We follow the exact official formula: virgin plastic equals plastic mass times one minus recycled fraction.*
  >
  > *Profi's incumbent bag is effectively 100% virgin plastic, but its exact mass is confidential and UNKNOWN. We built a conservative engineering model—B1-ESTIMATED—at 2.6 to 12.5 grams.*
  >
  > *Look at our C5 BIOPAP model: if the cellulose tray is plastic-free and we treat the entire sealing film as virgin plastic, the central reduction is 52.5%. But the full engineering interval spans from MINUS 67.6% to PLUS 82.1%.*
  >
  > *Why does it cross zero? Because if the sealing film is thick and the incumbent bag is lightweight, virgin plastic use could increase! We refuse to advertise the 52% headline without disclosing that the range crosses zero.*
  >
  > *Furthermore, C4 CPET demonstrates that a 75% recycled rigid tray still uses 25 to 54 grams of virgin plastic—substantially higher than our modeled bag scenario. Lightweight fibre architecture, not heavy recycled plastic, is the true reduction path."*
- **What NOT to Say:**
  - Do NOT say: *"BIOPAP reduces plastic by 52.5%"* without stating that the range crosses zero.
  - Do NOT compare C4 as a factual multiple of an "actual 6.5g bag" (B1 actual is UNKNOWN; 6.5g is central B1-ESTIMATED model).
  - Do NOT substitute carbon/LCA percentages for virgin plastic reduction.
- **Likely Judge Interruption:** *"Why didn't you do a full lifecycle assessment (LCA)?"*
- **One-Line Recovery Answer:** *"A material-only carbon factor is not a cradle-to-grave LCA; we prioritized the challenge's number-one criterion—virgin plastic reduction—and avoided greenwashing with incomplete LCA numbers."*

---

### Slide 7: Romanian Commercial Reality: Local Sourcing Truth & Cost Limits
- **Slide Goal:** Ground commercial feasibility in Romanian supply chain facts; separate listing from stock; analyze mentor +10–15% cost context honestly without making ungrounded Profi affordability claims.
- **Headline:** **Romanian Procurement Reality: Local Market Pricing vs Cost Ceilings**
- **What to Show:**
  - Unit Cost Comparison Chart:
    - Conventional Romanian Rotisserie Bag (`B3 Barleta 128002`): **0.37026 RON incl. VAT** (market reference, NOT Profi baseline).
    - Local Aluminium Portion Pair (`C6-RO-P` 729 tray + clear lid): **1.1485–1.2915 RON incl. VAT** (+210.2% to +248.8% vs B3). *(Explicitly scoped to C6-RO-P portion pair; does not apply to C6-RO-H).*
    - Mentor Cost Tolerance Context Line: **+10% to +15% over incumbent** (commercial context, NOT procurement approval; Profi incumbent price UNKNOWN).
  - Procurement Maturity Badges:
    - `ROMANIA_DISTRIBUTOR_CURRENT`: C6 local listings (listing $\neq$ stock; physical fit unverified).
    - `QUOTE_REQUIRED_ROMANIA`: C1 Gaia, C2 Siralon, C3 Oven Ease (direct factory RFQs required).
    - `ROMANIA_DISTRIBUTOR_HISTORICAL`: C5 BIOPAP (ReVive 2021 lead; factory/Mixpack RFQ today).
- **What to Say:**
  > *"We did not stop at European brochures. We investigated real Romanian procurement channels.*
  >
  > *A conventional Romanian rotisserie market bag—B3 Barleta—costs 0.37 RON including VAT. If Profi purchases locally listed aluminium portion pairs (C6-RO-P), the cost is 1.15 to 1.29 RON. That is a 210% to 249% cost increase against the B3 market benchmark. (Note that this premium applies strictly to portion pair C6-RO-P, not C6-RO-H).*
  >
  > *The mentor indicated that approximately +10 to 15% could be commercially acceptable context for a genuinely sustainable solution. However, because Profi's actual incumbent cost remains confidential and UNKNOWN, we cannot make an affordability determination against Profi's budget.*
  >
  > *For our preferred fibre candidates, Gaia and BIOPAP, direct factory RFQs must be executed to confirm volume case pricing. We do not invent Profi unit costs or claim fictitious savings."*
- **What NOT to Say:**
  - Do NOT say: *"Profi approved a 15% price increase"* or *"Our solution costs within budget."*
  - Do NOT say: *"Aluminium is unaffordable for Profi"* without actual incumbent price.
  - Do NOT call B3 Barleta "Profi's current packaging."
  - Do NOT treat online catalogue listings as guaranteed warehouse stock.
- **Likely Judge Interruption:** *"Can Profi actually buy Sacma Gaia in Romania tomorrow?"*
- **One-Line Recovery Answer:** *"No, Gaia requires a direct factory RFQ to specify bag dimensions and volume freight; our packet includes the pre-drafted RFQ ready for procurement dispatch."*

---

### Slide 8: PackShift Runtime & Decision Layer
- **Slide Goal:** Frame software as the evidence-backed decision layer that operationalizes physical constraints; set up the live demo.
- **Headline:** **PackShift: The Evidence-Backed Decision Layer**
- **What to Show:**
  - Decision Architecture Flow:
    $\text{Product Selection} + \text{Store Workflow} \rightarrow \text{6 Hard Gates} \rightarrow \text{Deterministic Decision Synthesis} \rightarrow \text{Actionable Roadmap}$
  - Epistemic Badges Cluster: `QUALIFICATION REQUIRED`, `BLOCKED`, `0 QUALIFIED SURVIVORS`, `SOURCE_AVAILABLE ≠ VERIFIED`.
  - Core Capability: Dynamic constraint re-evaluation when operating workflow changes.
- **What to Say:**
  > *"How does Profi navigate these trade-offs across multiple deli SKUs? Through **PackShift**.*
  >
  > *PackShift is not an AI black box or an e-commerce catalog. It is a deterministic decision engine that links physical candidate data, retail workflows, and non-compensatory gates.*
  >
  > *It demonstrates why a material that looks green on paper must be blocked if it cannot satisfy operational gates, and it recalculates qualification priority the instant store operating conditions change.*
  >
  > *Let’s look at PackShift live."*
- **What NOT to Say:**
  - Do NOT claim PackShift certifies packaging, guarantees compliance, or eliminates all procurement risk.
- **Likely Judge Interruption:** *"Does this use machine learning or AI?"*
- **One-Line Recovery Answer:** *"No, it uses deterministic, auditable domain logic and strict epistemic modeling—because food safety and retail procurement cannot rely on probabilistic AI hallucinations."*

---

### Slide 9: From Physical Concept to Store Pilot
- **Slide Goal:** Provide an actionable, low-risk physical qualification protocol; deliver the definitive closing statement.
- **Headline:** **From Concept to Pilot: The Physical Qualification Roadmap**
- **What to Show:**
  - 6-Stage Qualification Flow:
    1. **Exact Sample Procurement:** Receive nominated Gaia bags, BIOPAP SI-14 trays, and clear films.
    2. **Physical Fit & Headspace:** Measure bird geometry (1.0–1.3 kg), closure sealing, and shelf footprint.
    3. **Store Hot-Hold & Grease Test:** 6 hours under modeled 85–95°C validation condition with hot fatty chicken (actual Profi holding temperature = UNKNOWN); evaluate seam leaks and window anti-fog.
    4. **Food Contact & Migration DoC:** Exact selected-system Declarations of Compliance and fatty-food migration testing (Simulant D2) under EU 10/2011 & Framework 1935/2004 remain unresolved and required.
    5. **Delivered Romanian Pricing:** Confirm commercial case pricing and lead times via pre-drafted RFQs.
    6. **Bounded Store Pilot:** Execute a controlled 2-store trial before network-wide rollout.
  - Concluding Callout: *"From marketing guesswork to evidence-backed physical transition."*
- **What to Say:**
  > *"To take Profi from hackathon concept to commercial pilot, we defined a 6-stage qualification protocol:*
  >
  > *First, order physical candidate samples. Second, test physical fit with 1.0 to 1.3 kg rotisserie chickens. Third, run 6-hour warming cabinet trials under modeled 85 to 95°C validation conditions (actual store temperature UNKNOWN) to test hot fat containment and anti-fog visibility.*
  >
  > *Fourth, obtain exact finished-system Declarations of Compliance and fatty-food migration certificates under EU 10/2011, which remain unresolved today. Fifth, establish delivered Romanian volume pricing. Sixth, launch a controlled 2-store trial.*
  >
  > *Judges: we don't ask Profi to trust an unverified green claim. We showed what is known, what remains unknown, and the exact qualification roadmap to follow.*
  >
  > *Thank you. We welcome your questions."*
- **What NOT to Say:**
  - Do NOT claim that store rollout can happen next week.
  - Do NOT cite exact store counts (e.g., 1,600 or 1,700 stores) as verified facts.
- **Likely Judge Interruption:** *"How long will this qualification take?"*
- **One-Line Recovery Answer:** *"Physical hot-hold and fit testing takes 1 to 2 weeks; lab migration testing and factory RFQ confirmation require approximately 4 to 8 weeks."*

---

# C. Spoken Pitch Scripts

## 1. 30-Second Judge Summary (Stretch Goal 1)

> *"Profi reportedly already has a working low-temperature solution using 100% recycled plastic, but high-temperature hot food remains an unresolved physical packaging challenge.*
>
> *We developed a physical packaging transition supported by **PackShift**—an evidence-backed decision layer. For whole chicken, we qualify **Sacma Gaia** paper bags first; for portions, **BIOPAP** cellulose trays. If store operations demand literal 250°C oven exposure, polymer and cellulose candidates evaluate to BLOCKED, C1 remains unresolved, and an aluminium body surfaces as a high-temperature fallback.*
>
> *Across 48 evaluated contexts, exactly zero candidates are qualified today. PackShift doesn’t sell green illusions—it tells Profi what to qualify next, and what evidence is required before procurement."*

---

## 2. 30-Second Technical Defense (Stretch Goal 2)

> *"Our technical foundation is a strict, non-compensatory 6-gate model: Physical Fit, Food Contact, Thermal Envelope, Grease Resistance, Transparent Viewing, and Romania Procurement. An environmental delta cannot compensate for a hard gate failure.*
>
> *We strictly separate 250°C peak oven cooking from in-store hot holding (actual Profi holding temperature = UNKNOWN; 85–95°C modeled validation condition). For BIOPAP, our virgin plastic model spans −67.6% to +82.1%, honestly disclosing that the range crosses zero until the barrier film is weighed.*
>
> *PackShift is decision support, not certification. It gives QA and procurement an auditable qualification protocol from sample testing to fatty-food migration compliance."*

---

## 3. ~2-Minute Condensed Executive Pitch

> *"Good afternoon, judges. Profi reportedly has a working solution using 100% recycled plastic in cold deli packaging. But when you walk up to the hot rotisserie counter, the rules completely change.*
>
> *Hot-food packaging is one of retail’s toughest engineering problems: you have temperature requirements of approximately 200–250°C, alongside the official brief's 180–190°C rotisserie context, hot poultry fat, condensation, up to six hours of heated display, and the commercial necessity of a transparent window so shoppers can inspect the food.*
>
> *Our team did not try to invent a miracle polymer overnight. Our primary deliverable is a sustainable physical packaging transition for Profi hot food, supported by **PackShift**—an evidence-backed decision layer.*
>
> *We evaluated six physical candidate families across six strict, non-compensatory gates: Physical Fit, Food Contact, Thermal Envelope, Grease Resistance, Transparency, and Romanian Procurement.*
>
> *Here is what the evidence taught us:*
>
> *First, **the right package depends strictly on format and workflow.** For a whole rotisserie chicken packed after cooking, the first qualification path is **Sacma Gaia**—a renewable paper and NatureFlex cellulosic window bag. For portioned sides like wings and roasted potatoes, the first qualification path is **BIOPAP LC SI-14**, a compostable cellulose tray backed by family-level hot-hold testing up to six hours at 90°C.*
>
> *Second, **workflows dictate survival.** If Profi cooks food inside the packaging at a literal 250°C, C2 through C5 evaluate to BLOCKED due to published thermal limits, while Gaia remains unresolved. The system surfaces an aluminium body fallback (C6-RO-H), while noting that no selected transparent closure is qualified for 250°C and clear lids must be applied post-oven.*
>
> *Third, **we refuse to greenwash.** On BIOPAP, under our conservative material model, virgin plastic reduction spans from −68% to +82%. Because that interval crosses zero, we tell Profi honestly: no reduction is guaranteed until the exact sealing film is measured.*
>
> *Across 48 evaluated combinations, exactly ZERO are qualified survivors today. PackShift does not pretend that any candidate is certified. It gives Profi the exact roadmap, supplier RFQ questions, and lab protocols needed to make a disciplined, evidence-backed procurement decision."*

---

## 4. ~4-Minute Comprehensive Pitch (Synchronized Full Script)

*(Matches the 9-slide deck blueprint and integrates the 70-second live demo)*

### Part 1: Problem & Challenge Reality [0:00 – 1:20]
> *"Judges, sustainable packaging cannot exist only on a PowerPoint slide or in a marketing brochure. In retail grocery, food safety, customer visibility, and store operations determine whether a sustainable material survives.*
>
> *Our project provides a sustainable physical packaging transition for Profi's hot deli counter, driven by an evidence-backed decision engine called **PackShift**. Physical packaging is our primary deliverable; software is our decision layer ensuring that environmental metrics never override hard operational physics.*
>
> *Why is hot food so difficult? In cold packaging, Profi reportedly already has a working solution using 100% recycled plastic. In hot food, you are managing temperature requirements of approximately 200–250°C, alongside the official brief's 180–190°C rotisserie context, hot poultry fats, condensation, food contact migration, and up to six hours in a warming cabinet.*
>
> *Furthermore, a transparent window is an absolute commercial requirement—shoppers will not buy rotisserie chicken blindly. Yet standard bio-based films melt, rigid plastic boxes can actually increase total virgin plastic mass, and complex plastic-paper laminates ruin recyclability.*
>
> *Crucially, **250°C in an oven does not mean six hours at 250°C.** Rotisserie chicken cooked on spits and packed hot undergoes a completely different physical stress than food baked directly inside packaging."*

### Part 2: Formats, Candidates & The 6 Hard Gates [1:20 – 2:15]
> *"To solve this, we mapped Profi's deli into four product archetypes: P1 Whole Rotisserie Chicken, P2 Chicken Wings and Thighs, P3 Roasted Potatoes and Vegetables, and P4 Hot Meat Portions.*
>
> *We researched six physical candidate families: Sacma Gaia paper bags, Siralon nylon, Cryovac Oven Ease, Faerch CPET rigid trays, BIOPAP cellulose trays, and Romanian aluminium systems.*
>
> *Rather than computing an arbitrary 'eco-score,' PackShift screens every candidate through **six non-compensatory gates**: Physical Fit, Food Contact, Thermal Envelope, Grease Resistance, Transparent Viewing, and Romanian Procurement.*
>
> *Our findings from the 48 evaluated combinations in the canonical dataset: **none of the candidate rows is fully qualified today.** 28 require qualification; 20 are technically blocked. We don't hide this—we use it to establish a disciplined qualification priority.*
>
> *Let's see PackShift enforce this discipline live."*

### Part 3: Live Demonstration [2:15 – 3:25]
*(Presenter and Operator transition to live software screen — see Section D for exact spoken demo narration)*

### Part 4: Environmental & Commercial Reality [3:25 – 4:20]
> *"Returning to the data: our environmental accounting follows the official challenge formula: Virgin Plastic equals Plastic Mass times one minus Recycled Content.*
>
> *Mentor clarification confirmed that Profi's incumbent bag is effectively 100% virgin plastic. Because Profi's exact bag mass is confidential, we built a conservative engineering model—B1-ESTIMATED—at 2.6 to 12.5 grams.*
>
> *Look at our C5 BIOPAP model: against B1-ESTIMATED, its virgin plastic reduction spans from −67.6% to +82.1%. Why does it cross zero? Because until the exact barrier film is nominated and weighed, a heavy film could use more plastic than a lightweight incumbent bag. We refuse to advertise the central 52% reduction without disclosing that the range crosses zero.*
>
> *Meanwhile, C4 Faerch CPET demonstrates that high recycled content (up to 75% body PCR) in a heavy 73-gram rigid container still results in 25 to 54 grams of virgin plastic—substantially higher than our modeled bag scenario. High PCR alone does not guarantee sustainability.*
>
> *We also evaluated Romanian procurement reality. A conventional Romanian rotisserie market bag (B3 Barleta) costs 0.37 RON. Sourcing locally listed aluminium portion pairs (C6-RO-P) costs 1.15 to 1.29 RON—over 200% more than the conventional B3 market benchmark (this premium applies strictly to portion pair C6-RO-P, not C6-RO-H). While the mentor noted an acceptable premium of approximately +10–15% as commercial context for genuine sustainability, whether any candidate is within Profi's budget cannot be determined because Profi's incumbent purchase price remains confidential and UNKNOWN. For Gaia and BIOPAP, direct supplier RFQs are required to establish landed Romanian pricing."*

### Part 5: Qualification Roadmap & Closing [4:20 – 4:50]
> *"To ensure Profi can take immediate action, we prepared an actionable qualification roadmap:*
>
> *Step 1: Order physical samples of Gaia bags and BIOPAP SI-14 trays.*
> *Step 2: Weigh 10 incumbent Profi bags and verify chicken sizing.*
> *Step 3: Dispatch pre-drafted technical RFQs to Sacma and BIOPAP.*
> *Step 4: Execute fatty-food migration testing under EU 10/2011 with accredited laboratories.*
> *Step 5: Run 6-hour warming cabinet trials for seam leakage and anti-fog clarity.*
> *Step 6: Launch a controlled 2-store customer pilot.*
>
> *Judges: we don't ask Profi to trust an unverified green claim. We show what is known, what remains unknown, and the exact qualification roadmap to follow.*
>
> *Thank you. We are ready for your questions."*

---

# D. Demo Narration (TARGET Path)

> **DEMO ENVIRONMENT STATUS:**
> **TARGET DEMO — Pending PUX-HT2R verification / merge to main.**
> Inspected against Denis' implementation on `origin/denis/pux-ht2r-canonical-recommendation-ux` (`158abd5f`).
> *If Denis' branch is not merged at presentation time, see Section G for the FALLBACK DEMO on current main.*

**Target Demo Duration:** 70 seconds
**Operator Sync:** Operator drives live UI clicks; Presenter delivers synchronized spoken narration.

```text
[0:00 – 0:05]
OPERATOR ACTION:
Clicks mode-switch button "Recommendation Journey" in the top navigation bar.

PRESENTER:
"Let’s see PackShift in action. We navigate to the Recommendation Journey.
PackShift is an evidence-backed decision layer that operationalizes retail constraints."

[0:05 – 0:20]
OPERATOR ACTION:
Under "Stage A · Product Context", clicks "P1 Whole Rotisserie Chicken".
Ensures "Stage B · Operational Workflow" is set to "Post-Cook Hot Holding Scenario (POST_COOK_HOT_HOLD_6H)".

PRESENTER:
"We start with Product P1: Whole Rotisserie Chicken under our primary assumed workflow:
Post-Cook Hot Holding, where chicken is roasted on spits and packed hot
(actual Profi holding temperature = UNKNOWN; 85–95°C modeled validation condition)."

[0:20 – 0:40]
OPERATOR ACTION:
Scrolls to DecisionSummary card, then highlights the C1 Sacma B.Life Gaia card.
Points to the badges: "First Qualification Path · Priority 1" and "QUALIFICATION REQUIRED",
and the metric "Qualified Survivors: 0 / 6".

PRESENTER:
"Under this workflow, PackShift nominates Sacma B.Life Gaia as our First Qualification Path.
Gaia combines renewable paper with a NatureFlex cellulosic transparent window.
Crucially, look at the status badge: it does NOT say 'APPROVED' or 'WINNER'.
It says 'QUALIFICATION REQUIRED', and qualified survivors show exactly 0 out of 6.
PackShift refuses false approvals because physical bird fit, finished-system fatty-food migration DoC,
and delivered Romanian pricing remain to be qualified by the supplier."

[0:40 – 0:55]
OPERATOR ACTION:
Under "Stage A · Product Context", clicks "P2 Chicken Wings & Thighs".
Card updates dynamically to show C5 BIOPAP LC SI-14 as the First Qualification Path.

PRESENTER:
"Now we switch product format to P2: Chicken Wings and Thighs.
Instantly, PackShift switches the First Qualification Path to BIOPAP LC SI-14—
a compostable cellulose tray backed by published family hot-hold evidence up to six hours at 90°C.
Notice the open conflict badge: PackShift transparently flags the 175°C versus 185°C datasheet conflict,
and requires finished tray-plus-film migration testing before store pilot."

[0:55 – 1:10]
OPERATOR ACTION:
Under "Stage B · Operational Workflow", clicks "Literal 250°C Oven Cycle + Holding Scenario (LITERAL_OVEN_250C_THEN_HOLD)".
Screen re-evaluates: C2, C3, C4, C5 drop into "Hard-Blocked Candidates (4)",
C1 shows no priority, and C6 surfaces under "High-Temperature Fallback Qualification Path (Priority 2)".

PRESENTER:
"Now watch what happens when store operating realities change.
If Profi specifies in-pack cooking at a literal 250°C oven cycle, we switch the workflow.
The environmental story does not override physics: candidates with tested limits below 250°C—
Siralon, Oven Ease, CPET, and BIOPAP—are immediately BLOCKED.
The system surfaces the C6-RO-H Aluminium Body as a Priority 2 high-temperature fallback.
Even here, PackShift prevents false claims: it explicitly flags that no selected transparent closure
is qualified for 250°C, and clear lids must be applied post-oven.
PackShift rejects green illusions—it gives Profi the truth."
```

### Demo Synchronization Quadrant

For every demo step, ensure the presenter addresses all four dimensions:

| Step | What is Visible? | What Does it Demonstrate? | What Does it NOT Establish? | Why Does the Judge Care? |
|---|---|---|---|---|
| **Step 1 (P1 Post-Cook)** | C1 Gaia card; `First Qualification Path · Priority 1`; `QUALIFICATION REQUIRED`; `Qualified Survivors: 0 / 6`. | PackShift prioritises renewable fibre packaging for whole chicken without fabricating approval. | Does NOT establish food-contact certification, fatty-food leak resistance, or store readiness. | Shows that the software refuses premature green marketing and enforces evidence discipline. |
| **Step 2 (P2 Portions)** | Dynamic switch to C5 BIOPAP SI-14; 6h@90°C family evidence; 175°C vs 185°C conflict badge. | Packaging selection is format-dependent; cellulose trays suit deli portions; system surfaces datasheet conflicts. | Does NOT establish that the exact SI-14 tray + film combination is food-safe for Profi chicken fat. | Shows that the tool handles multi-format retail complexity and preserves unvarnished truth. |
| **Step 3 (Literal 250°C)** | C2–C5 move to `BLOCKED`; C6-RO-H surfaces as `Priority 2 Fallback`; closure gap alert displayed. | Operational constraints override green metrics; materials that exceed thermal limits are blocked; aluminium fallback surfaced. | Does NOT establish that C6 is a complete 250°C transparent system (**no selected transparent closure is qualified for 250°C**; clear closure remains post-oven). | Shows that store workflows dictate material survival, protecting Profi from operational disaster. |

---

# E. Transition Sentences & Phrase Banks

## 1. Seamless Presentation Transitions

- **From Slide 1 (Thesis) to Slide 2 (Problem):**
  > *"To understand why we need an evidence layer, we have to look at the brutal physics of hot-food retail."*
- **From Slide 2 (Problem) to Slide 3 (Candidates):**
  > *"Because hot food involves multiple constraints, we searched across six distinct physical packaging families."*
- **From Slide 3 (Candidates) to Slide 4 (Gates):**
  > *"Having six candidate families is not enough; we needed an objective, non-compensatory filter to test them."*
- **From Slide 4 (Gates) to Slide 5 (Paths):**
  > *"When you run 48 retail contexts through six hard gates, distinct physical qualification paths emerge."*
- **From Slide 5 (Paths) to Live Demo:**
  > *"Let's see PackShift enforce these qualification gates live in software."*
- **From Live Demo back to Slide 6 (Environment):**
  > *"Now that you've seen the decision engine, let's examine the underlying environmental numbers."*
- **From Slide 6 (Environment) to Slide 7 (Economics):**
  > *"Environmental models mean nothing if Romanian supply chains cannot deliver the packaging at viable cost."*
- **From Slide 7 (Economics) to Slide 8 (Runtime / Architecture):**
  > *"PackShift brings these physical, environmental, and financial constraints into a single operational architecture."*
- **From Slide 8 to Slide 9 (Roadmap / Close):**
  > *"Finally, here is the exact 6-step qualification roadmap Profi should execute starting Monday morning."*

---

## 2. Pitch-Safe Phrase Bank

| Context | Approved Pitch-Safe Phrasing | Why It Is Safe |
|---|---|---|
| **Candidate Status** | *"First qualification path"* / *"Priority alternative"* | Designates research priority without claiming approval. |
| **Overall State** | *"Qualification required — zero qualified survivors"* | Honestly reflects that all candidates have open technical gates. |
| **Workflow Framing** | *"Under our post-cook hot-holding operational scenario (actual holding temp UNKNOWN; 85–95°C modeled validation condition)"* | Explicitly scopes findings to the stated operating model without asserting unverified store temperatures. |
| **Evidence Basis** | *"Manufacturer technical datasheets indicate..."* | Attributes claims to published literature rather than lab certainty. |
| **Baseline Mass** | *"Modeled engineering scenario (B1-ESTIMATED: 2.6–12.5 g)"* | Prevents confusing an engineering estimate with measured Profi data. |
| **Environmental Deltas** | *"Conditional material budget"* | Discloses that plastic mass is modeled based on explicit assumptions. |
| **Zero-Crossing Range** | *"Ranges from −68% to +82%; range crosses zero"* | Accurately describes intervals crossing zero without cherry-picking. |
| **Thermal Ratings** | *"Body-only temperature evidence"* | Separates container body thermal limits from lid/window limits. |
| **BIOPAP Conflict** | *"Preserves the 175°C vs 185°C datasheet conflict"* | Honestly preserves competing values from public literature. |
| **6-Hour Evidence** | *"Family-level hot-hold evidence up to 6 hours at 90°C"* | Accurately bounds BIOPAP claims without claiming store food safety. |
| **Procurement Status** | *"Active Romanian catalogue listing"* (listing $\neq$ stock) | Distinguishes e-commerce product listings from volume supply contracts. |
| **Cost Tolerance** | *"Commercial context benchmark, not procurement approval"* | Correctly frames the mentor's +10–15% cost guidance. |

---

## 3. Strictly Forbidden Phrase Bank

| Forbidden Phrase | Why It Is Dangerous / Greenwashing | Approved Replacement |
|---|---|---|
| ❌ *"Winner"* / *"Best packaging"* | Misleading; zero candidates have passed all 6 gates. | *"First qualification path"* |
| ❌ *"Approved"* / *"Certified safe for Profi"* | Fabricates legal compliance; migration tests are unperformed. | *"Requires food-contact and migration qualification"* |
| ❌ *"Production ready"* / *"Ready for rollout"* | Bypasses all store trials, DoC, and line testing. | *"Candidate for store pilot after lab validation"* |
| ❌ *"100% recyclable in Romania"* | Local Romanian collection and sorting for greasy containers is unverified. | *"Designed for recyclability, subject to local waste operator acceptance"* |
| ❌ *"Guaranteed 52% plastic reduction"* | Untrue; C5 range crosses zero (−68% to +82%), C1 is unmeasured. | *"Modeled scenario crossing zero (−68% to +82%); unverified"* |
| ❌ *"Saves Profi X RON annually"* | Fabricates confidential Profi purchase volume and unit cost. | *"Annual impact depends on actual confidential Profi volumes"* |
| ❌ *"Survives 250°C for 6 hours"* | Physically absurd; 250°C is an oven peak, not a 6h holding temperature. | *"250°C peak oven exposure followed by hot holding"* |
| ❌ *"Aluminium solves the 250°C requirement"* | Ignores transparent closure; no selected transparent closure is qualified for 250°C. | *"Aluminium body provides a high-temp fallback; no selected transparent closure is qualified for 250°C"* |
| ❌ *"Current Profi bag weighs 6.5 grams"* | Converts a synthetic scenario into an invented provider fact. | *"Our estimated baseline scenario models 2.6 to 12.5 grams"* |
| ❌ *"PackShift makes procurement risk-free"* | Software cannot eliminate physical or commercial risk. | *"PackShift helps surface qualification gaps before procurement"* |
| ❌ *"1,600+ stores"* / *"1,700 stores"* | Treats modeled retail network scale as verified Profi fact. | *"Across a large retail network"* / *"At network scale"* |

---

# F. Definitive Pitch Closing

> *"Judges, the easiest thing in a hackathon is to pick a green material from a brochure and declare it the winner.*
>
> *We did not do that.*
>
> *We showed you six real packaging families, six hard technical gates, and 48 retail contexts. We showed you why Sacma Gaia is the first path to qualify for whole chicken, why BIOPAP is the first path for portions, and why an aluminium body is a high-temperature fallback.*
>
> *Most importantly, we showed you the zero survivors. We don't ask Profi to trust a green claim. PackShift shows exactly what is known, what remains unknown, and the exact physical qualification protocol Profi must run before spending capital.*
>
> *That is how retail transitions from marketing guesswork to real, defensible sustainability.*
>
> *Thank you."*

---

# G. Fallback Demo Narration (Current Main @ 513e0867)

> **WHEN TO USE THIS FALLBACK:**
> Use this narration if Denis' Recommendation UI (`PUX-HT2R`) is not merged into `main` at presentation time.
> This fallback executes exclusively on **verified current main**, utilizing the live **Comparison** and **Portfolio Selection** modes alongside verified **Backend API** responses.

**Fallback Demo Duration:** 60–75 seconds
**Surfaces Used:**
1. Browser: `http://localhost:5173` (Comparison Mode & Portfolio Selection Mode)
2. Terminal / API: `POST /api/v1/recommendation/evaluate` or `GET /api/v1/recommendation/products`

```text
[0:00 – 0:15]
OPERATOR ACTION:
Opens live browser at http://localhost:5173. Clicks "Comparison" mode pill.
Selects "Case B: Prepared-Food Container Transition".

PRESENTER:
"Judges, let's look at the core engine of PackShift live on our current production build.
Here in Comparison mode, we see Case B: a prepared-food container transition.
Notice the environmental calculation: it shows a theoretical 83.8% virgin plastic reduction."

[0:15 – 0:35]
OPERATOR ACTION:
Scrolls down to "Operational Constraints & Suitability Findings" section.
Points to the prominent red badge: "⛔ operational-requirements · BLOCKED"
and the epistemic badge: "NOT_VERIFIED ≠ FALSE · SOURCE_AVAILABLE ≠ VERIFIED".

PRESENTER:
"Now look at the operational gate. Despite that attractive 83% theoretical plastic reduction,
the system evaluates candidate maximum temperature—70°C—against scenario requirements of 95°C.
The operational gate evaluates to BLOCKED.
This demonstrates our core engineering rule: environmental benefit NEVER compensates for an operational failure.
PackShift refuses to recommend an incompatible container."

[0:35 – 0:50]
OPERATOR ACTION:
Clicks "Portfolio Selection" mode pill in the top navigation bar.
Selects the Faerch CPET portfolio. Points to the missing PCR finding.

PRESENTER:
"Next, we switch to Portfolio Selection mode.
Here, PackShift evaluates candidate portfolios under deterministic grouping.
When manufacturer PCR data is missing or unverified, PackShift refuses to invent an eco-score.
It returns INSUFFICIENT_DATA and outputs the exact missing fields required from the supplier."

[0:50 – 0:70]
OPERATOR ACTION:
Switches to terminal / browser tab showing:
GET http://localhost:8000/api/v1/recommendation/products
POST http://localhost:8000/api/v1/recommendation/evaluate (P1 + POST_COOK_HOT_HOLD_6H)

PRESENTER:
"Finally, running behind this interface is our canonical Recommendation API.
Evaluating Product P1 under post-cook hot holding returns Sacma Gaia as First Qualification Path,
with 0 qualified survivors across all candidates.
When evaluated against a literal 250°C oven cycle, the API immediately blocks thermal failures
and surfaces C6-RO-H as high-temperature fallback.
PackShift enforces hard physical discipline across every layer."
```

---

# H. Presenter Handoff & Rehearsal Checklist

## 1. Technical Rehearsal Checklist

- [ ] **Backend service running:** `uvicorn app.main:app --port 8000` responds 200 OK to `/api/v1/health`.
- [ ] **Recommendation API verified:** `GET /api/v1/recommendation/products` returns 4 products, 2 workflows.
- [ ] **Frontend build verified:** `npm run build` passes with zero TypeScript or bundling errors.
- [ ] **Frontend dev server running:** `npm run dev` serves on `http://localhost:5173`.
- [ ] **Correct dataset loaded:** Startup logs confirm canonical packaging dataset loaded without errors.
- [ ] **UI Navigation verified:** Presenter knows whether live UI is running `TARGET` (Recommendation Journey) or `FALLBACK` (Comparison + Portfolio Selection + Terminal API).
- [ ] **Backup screenshots available:** Pre-captured screenshots of Step 1 (P1 Gaia), Step 2 (P2 BIOPAP), and Step 3 (250°C C6 Fallback) stored locally on presenter desktop.
- [ ] **Presenter claims checked:** No positive words (*winner*, *approved*, *certified*, *safe*, *rollout-ready*).
- [ ] **Temperature distinction memorized:** Presenter can recite *"250°C oven cooking $\neq$ holding duration; actual holding temp UNKNOWN; 85–95°C modeled validation condition"* under pressure.
- [ ] **BIOPAP range memorized:** Presenter can recite *"−68% to +82%, range crosses zero"*.
- [ ] **Time limit timed:** Spoken pitch + demo clocked under 4 minutes 15 seconds in rehearsal.

## 2. Emergency Recovery Playbook

| Issue During Presentation | Immediate Presenter Action | Spoken Recovery Line |
|---|---|---|
| **Demo frontend fails to load / white screen** | Immediately switch to pre-captured backup screenshots. | *"While our local dev port refreshes, let's look at the exact qualification states rendered by our runtime."* |
| **Denis' branch not merged at judging time** | Seamlessly execute Section G Fallback Demo (Comparison Case B + Selection). | *"Let's look at PackShift's hard-gate engine live on our current build, demonstrating how thermal gates block candidates."* |
| **Judge interrupts: "Is this certified food safe?"** | Deliver Q7 defense immediately. | *"No. Neither candidate is certified food-safe for Profi store conditions; exact selected-system Declarations of Compliance and fatty-food migration evidence remain unresolved."* |
| **Judge interrupts: "Who is the winner?"** | Deliver Q6 / 0-survivor defense immediately. | *"We deliberately do not declare a winner. Out of 48 combinations, zero are qualified today; declaring a winner would be greenwashing."* |
| **Judge interrupts: "How much plastic does Profi save?"** | Deliver Q5 / BIOPAP range defense immediately. | *"Our model shows central 52% reduction for BIOPAP, but the range spans −68% to +82%. No saving is guaranteed until the film is weighed."* |
