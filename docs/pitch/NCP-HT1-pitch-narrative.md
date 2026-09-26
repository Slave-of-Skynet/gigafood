# NCP-HT1 — Pitch Narrative & Presentation Scripts

**Document:** Authoritative Spoken Pitch Scripts, Demo Narration & Phrase Banks
**Role:** Pitch / Presentation / Data Narrative (Nicolae)
**Accepted Base:** `main @ e067764d334e260440ed69ae6d68dab42205b3a4`
**Canonical Evidence Baseline:** `docs/evidence/htf-03/**`

---

## 1. Core Pitch Thesis & Non-Negotiables

Across every version of this pitch—from 30 seconds to 4 minutes—the factual core remains completely identical:

1. **Physical packaging is the primary solution:** Software alone does not hold a rotisserie chicken. We identify and model real physical candidate packaging systems.
2. **PackShift is the decision & demonstration layer:** It enforces hard technical operating gates, tracks scientific provenance, models honest uncertainty, and recalculates paths when workflow requirements change.
3. **The Core Pitch Differentiator:** We do not pretend to have found a "universal magic green package." Instead:
   > *“The correct sustainable packaging depends on the actual product and operating workflow, and our system refuses to recommend a packaging path that fails hard technical requirements.”*
4. **Honest Engineering Over Greenwashing:** None of the six researched candidate families / 48 evaluated context rows is fully qualified for the evaluated Profi use cases today. We do not hide unknowns; we turn scientific discipline into our strongest proof of credibility.

---

## 2. 30-Second Elevator Pitch

> *"Profi reportedly already has a working low-temperature solution using 100% recycled plastic, but high-temperature rotisserie and oven food remains an unresolved packaging challenge (approx. 200–250°C requirement context, alongside the official brief's 180–190°C rotisserie context). In hot-food retail, you cannot sacrifice grease barriers, food safety, transparency, or six hours of holding time just to claim a green metric.*
>
> *We built **PackShift**: an evidence-backed decision layer supporting a real physical transition. Instead of guessing a single 'winner,' PackShift maps Profi's products and store workflows against hard technical qualification gates.*
>
> *For whole rotisserie chicken under a post-cook workflow, our system nominates **Sacma Gaia** as the first qualification path; for portions, **BIOPAP** cellulose trays. But if store operations require literal 250°C oven exposure, candidates with tested limits below 250°C are blocked, Gaia remains thermally unverified, and the candidate landscape shifts to an aluminium body fallback.*
>
> *PackShift doesn't sell green illusions—it tells Profi exactly what to qualify next, and exactly what evidence is required before procurement."*

---

## 3. ~2-Minute Standard Pitch

> *"Good afternoon, judges. Profi reportedly has a working solution using 100% recycled plastic in cold deli packaging. But when you walk up to the hot rotisserie counter, the rules completely change.*
>
> *Hot-food packaging is one of retail’s toughest engineering problems. You have temperature requirements of approximately 200–250°C, alongside the official brief's 180–190°C rotisserie context, hot chicken fat, steam, condensation, up to six hours of in-store holding, and the commercial necessity of a transparent window so customers can see what they buy. Today, Profi relies on an unmeasured conventional plastic bag.*
>
> *Our team did not attempt to invent a miracle material overnight. Instead, we developed a defensible physical packaging transition supported by **PackShift**—an evidence-backed decision engine.*
>
> *We evaluated six candidate families across six strict, non-compensable gates: Physical Fit, Food Contact, Thermal Envelope, Grease Resistance, Transparency, and Romanian Procurement maturity.*
>
> *Here is what the evidence taught us:*
>
> *First, **the right package depends strictly on the food format and store workflow.** For a whole rotisserie chicken packed after cooking, the first qualification lead is **Sacma Gaia**—a renewable paper and NatureFlex cellulosic window bag. For portioned sides like wings and roasted potatoes, the lead path is **BIOPAP LC SI-14**, a compostable cellulose tray backed by family-level hot-hold testing up to six hours at 90°C.*
>
> *Second, **workflows dictate survival.** If Profi cooks food inside the packaging at a literal 250°C, C2, C3, C4, and C5 are strictly blocked by published thermal limits, while Gaia remains unresolved pending numeric limits. The system surfaces an aluminium high-temperature body fallback (C6-RO-H), while warning that a transparent lid must be applied post-oven and still requires qualification.*
>
> *Third, **we refuse to greenwash.** On C5 BIOPAP, under our conservative material model, virgin plastic reduction spans from −68% to +82%. Because that interval crosses zero, we tell Profi honestly: no reduction is guaranteed until the exact sealing film is measured.*
>
> *PackShift does not pretend that any candidate is 100% certified today. It gives Profi the exact roadmap, supplier RFQ questions, and lab protocols needed to make a risk-free procurement decision."*

---

## 4. ~4-Minute Comprehensive Pitch (Full Deck Narration)

*(Matches the 9-slide deck blueprint)*

### Slide 1: Introduction & Thesis [0:00 – 0:30]
> *"Judges, sustainable packaging cannot exist only on a PowerPoint slide or in a marketing brochure. In retail grocery, food safety, customer visibility, and store operations determine whether a sustainable material survives.*
>
> *Our project, **PackShift**, provides a sustainable physical packaging transition for Profi's hot deli counter, driven by an evidence-backed decision engine. Our primary deliverable is physical packaging; our software ensures that environmental metrics never override hard operational physics.*
>
> *Our central thesis is simple: **The correct sustainable packaging depends on product and workflow, and our system refuses to recommend a packaging path that fails hard technical requirements.**"*

### Slide 2: The High-Temperature Reality [0:30 – 1:00]
> *"Why is hot food so difficult? In cold packaging, Profi reportedly has a working solution using 100% recycled plastic. In hot food, you are managing temperature requirements of approximately 200–250°C, alongside the official brief's 180–190°C rotisserie context, hot poultry fats, condensation, food contact migration, and up to six hours in a warming cabinet.*
>
> *Furthermore, a transparent window is an absolute commercial requirement—shoppers will not buy rotisserie chicken blindly. Yet, many bio-based films melt above 120°C, heavier rigid plastic boxes can actually increase total plastic mass, and complex plastic-paper laminates ruin recyclability.*
>
> *Crucially, **250°C in an oven does not mean six hours at 250°C.** Operating workflows differ: food may be cooked in the pack, or cooked first and packed hot. That distinction changes every material calculation."*

### Slide 3: Products & Workflows [1:00 – 1:30]
> *"To solve this, we mapped Profi's deli into four product archetypes: P1 Whole Rotisserie Chicken, P2 Chicken Wings and Thighs, P3 Roasted Potatoes and Vegetables, and P4 Hot Meat Portions.*
>
> *We then evaluated them against two distinct operating workflows:*
> *First, `POST_COOK_HOT_HOLD_6H`: chicken is roasted on rotisserie spits, placed hot into retail packaging, and displayed in a 70–90°C cabinet for up to six hours.*
> *Second, `LITERAL_OVEN_250C_THEN_HOLD`: packaging must enter a convection oven at 250°C before holding.*
>
> *These two workflows require completely different physical containers."*

### Slide 4: The 6 Qualification Gates [1:30 – 2:00]
> *"We investigated six candidate families: Sacma Gaia, Sirane Siralon nylon, Cryovac Oven Ease, Faerch CPET, BIOPAP cellulose trays, and Aluminium architectures.*
>
> *Rather than computing an arbitrary 'eco-score,' PackShift screens every candidate through **six non-compensable gates**: Physical Fit, Food Contact, Thermal Envelope, Grease Resistance, Transparent Viewing, and Romanian Procurement.*
>
> *Our findings from the 48 evaluated combinations in the canonical dataset: **none of the candidate rows is fully qualified today.** 28 require qualification; 20 are technically blocked. We don't hide this—we use it to establish a disciplined qualification priority."*

### Slide 5: Live Demo [2:00 – 3:00]
*(Transition to live demo — see Section 5 for the exact 60–90 second spoken script)*

### Slide 6: Environmental Evidence [3:00 – 3:25]
> *"Returning to the numbers: our environmental accounting follows the official challenge formula: Virgin Plastic equals Plastic Mass times one minus Recycled Content. We measure plastic mass, not total package weight.*
>
> *Mentor clarification confirmed that Profi's incumbent bag is effectively 100% virgin plastic. Because Profi's exact bag mass is confidential, we built a conservative engineering model—B1-ESTIMATED—at 2.6 to 12.5 grams.*
>
> *Look at our C5 BIOPAP model: against B1-ESTIMATED, its virgin plastic reduction spans from −67.6% to +82.1%. Why does it cross zero? Because until the exact barrier film is nominated and weighed, a heavy film could use more plastic than a lightweight incumbent bag. We refuse to advertise the central 52% reduction until that film is laboratory-verified.*
>
> *Meanwhile, C4 Faerch CPET proves that high recycled content (up to 75% body PCR) in a heavy 73-gram rigid container still results in 25 to 54 grams of virgin plastic—four times more plastic than a simple bag. High PCR alone does not guarantee a sustainable transition."*

### Slide 7: Economics & Romanian Sourcing [3:25 – 3:45]
> *"We also evaluated Romanian procurement reality. We didn't stop at European brochures; we found real, orderable Romanian listings.*
>
> *For portion samples, we identified a locally sourceable aluminium body from E-ambalaj and a transparent lid from La Habibi (C6-RO-P), costing 1.15 to 1.29 RON per pair including VAT at 1,400 units.*
>
> *The economic truth: A conventional Romanian paper-plus-PP rotisserie bag (B3 Barleta) costs 0.37 RON. Sourcing the local aluminium pair represents a +210% to +249% cost premium. While the mentor noted an acceptable premium of +10–15% for genuine sustainability, aluminium is a technical high-temperature fallback, not our preferred commercial path. For our preferred fibre paths (Gaia and BIOPAP), direct supplier RFQs are required to establish landed Romanian pricing."*

### Slide 8 & 9: Gaps, Roadmap & Scalability [3:45 – 4:15]
> *"To ensure Profi can take immediate action, we prepared an 8-stage qualification roadmap:*
> *Step 1: Confirm store deli temperature profiles.*
> *Step 2: Weigh 10 incumbent Profi bags.*
> *Step 3: Dispatch our pre-drafted RFQs to Sacma, BIOPAP, and local distributors.*
> *Step 4: Execute a proposed qualification plan with suppliers and accredited laboratories for overall and specific migration testing under fatty-food hot-fill conditions per applicable material frameworks.*
> *Step 5: Run 6-hour warming cabinet tests for grease barrier and anti-fog clarity.*
> *Step 6: Confirm delivered Romanian case pricing.*
> *Step 7: Launch a 2-store customer pilot.*
> *Step 8: Re-run PackShift with verified laboratory inputs.*
>
> *PackShift is not just for this hackathon. Its decision engine can scale across all 1,600+ Profi stores, evaluating bakery, fresh meat, and ready-to-eat packaging as EU PPWR packaging regulations phase in mandatory design-for-recycling criteria and minimum post-consumer recycled content targets.*
>
> *Thank you. We are ready for your questions."*

---

## 5. Synchronized Demo Narration Script (60–90 Seconds)

**Target Duration:** 75 seconds
**Operator Sync:** Follows live UI actions step-by-step.

```text
[0:00 – 0:10] OPERATOR: Selects "P1 — Whole Rotisserie Chicken" in Product dropdown.
PRESENTER:
"Let’s see PackShift in action. We start by selecting P1: Whole Rotisserie Chicken.
Notice the primary workflow is set to 'POST_COOK_HOT_HOLD_6H'—our assumed in-store
operating baseline where chicken is roasted first, then packed hot."

[0:10 – 0:25] OPERATOR: Scrolls to Candidate List; hovers over C1 Gaia card.
PRESENTER:
"Under this workflow, PackShift nominates Sacma B.Life Gaia as our First Qualification Path.
Gaia combines renewable paper with a NatureFlex cellulosic transparent window.
Crucially, look at the status badge: it does NOT say 'APPROVED' or 'WINNER'.
It says 'QUALIFICATION REQUIRED'. PackShift refuses to approve it because exact thermal limits,
complete layer BOM, and delivered Romanian pricing must still be confirmed by the supplier."

[0:25 – 0:40] OPERATOR: Clicks into C1 Evidence Details / Environmental comparison.
PRESENTER:
"Opening the evidence drawer, you see complete scientific transparency.
Every metric is bound to its source and epistemic confidence.
We see the estimated pack mass of 19.7 grams, but actual virgin plastic mass remains UNKNOWN.
PackShift displays the exact missing evidence fields required before procurement can sign off."

[0:40 – 0:60] OPERATOR: Changes Workflow dropdown to "LITERAL_OVEN_250C_THEN_HOLD".
PRESENTER:
"Now, watch what happens when store operating realities change.
If Profi tells us: 'No, this packaging must enter a convection oven at literal 250°C'—
we change the workflow selector.
Instantly, the candidate landscape transforms.
Candidates with tested limits below 250°C—Siralon, Oven Ease, Faerch CPET, and BIOPAP—are now strictly BLOCKED,
while Gaia remains unresolved without a verified numeric peak rating.
The system surfaces the Aluminium High-Temperature Body fallback (C6-RO-H)."

[0:60 – 0:75] OPERATOR: Points to C6-RO-H gate breakdown and closure caveat.
PRESENTER:
"Even here, PackShift prevents false claims.
While the aluminium body withstands 280°C, the transparent closure cannot survive the oven.
The lid must be applied post-oven, and its fit and retail clarity remain an open qualification action.
PackShift rejects false universal answers—it gives Profi the truth."
```

---

## 6. Pitch-Safe Phrase Bank

Use these verified, defensible phrases during presentation and judge Q&A:

| Context | Approved Pitch-Safe Phrasing | Why It Is Safe |
|---|---|---|
| Candidate Status | *"First qualification path"* | Designates priority of research/testing without claiming approval. |
| Workflow Context | *"Under our current post-cook workflow assumption"* | Explicitly scopes findings to the stated operating model. |
| Evidence Provenance | *"Public manufacturer documentation indicates..."* | Attributes claims to published datasheets rather than lab certainty. |
| Baseline Numbers | *"Modelled engineering scenario (B1-ESTIMATED)"* | Prevents confusing an engineering estimate with measured Profi data. |
| Environmental Deltas | *"Conditional material budget"* | Discloses that plastic mass is modelled based on explicit assumptions. |
| Zero-Crossing Ranges | *"Spans from increased to reduced virgin plastic"* | Accurately describes intervals crossing zero without cherry-picking. |
| Temperature Limits | *"Body-only temperature evidence"* | Separates container tray thermal limits from lid/window limits. |
| Thermal Conflict | *"Two scoped thermal values exist in public documentation"* | Honestly preserves the 175°C vs 185°C BIOPAP conflict. |
| 6-Hour Performance | *"Family-level hot-hold evidence up to six hours at 90°C"* | Accurately bounds BIOPAP claims without claiming store food safety. |
| Procurement Lead | *"Locally listed component route"* / *"Direct supplier RFQ required"* | Accurately distinguishes local web stock from factory quote paths. |
| Cost Tolerance | *"Business context target, not an automatic pass threshold"* | Correctly frames the mentor's +10–15% cost guidance. |

---

## 7. Forbidden Phrase Bank

**NEVER** use these phrases in slides, spoken pitch, or judge Q&A:

| Forbidden Phrase | Why It Is Forbidden / Dangerous | Replace With Approved Phrasing |
|---|---|---|
| *"Winner"* / *"Best packaging"* | Misleading; zero candidates have passed all 6 gates. | *"First qualification path"* |
| *"Certified safe for Profi"* | Fabricates legal compliance; food-contact testing is unperformed. | *"Requires food-contact and migration qualification"* |
| *"Approved supplier"* | Profi procurement has not approved any vendor. | *"Researched commercial candidate"* |
| *"Ready for rollout / store deployment"* | Bypasses all store trials, DoC, and line testing. | *"Candidate for store pilot after lab validation"* |
| *"100% recyclable in Romania"* | Local Romanian collection and recycling for greasy containers is unverified. | *"Designed for recyclability, subject to local waste operator acceptance"* |
| *"Guaranteed 90% plastic reduction"* | Untrue; C5 crosses zero, C1 is unmeasured, C4 increases plastic. | *"Conditional material model spanning −68% to +82%"* |
| *"Proven annual savings of X RON / tonnes"* | Fabricates Profi purchase volume and unit cost. | *"Annual impact depends on actual Profi purchasing volumes"* |
| *"Survives 250°C for 6 hours"* | Physically absurd; 250°C is an oven peak, not a 6h holding temperature. | *"250°C oven exposure followed by hot holding"* |
| *"Aluminium solves the 250°C requirement"* | Ignores the transparent lid, which melts at oven temperatures. | *"Aluminium body provides a high-temperature fallback; closure unresolved"* |
| *"AI/ML packaging optimization"* | Fabricates artificial intelligence algorithms where none exist. | *"Deterministic, evidence-aware decision support engine"* |
| *"Current Profi bag weighs 6.5 grams"* | Converts a synthetic scenario into an invented provider fact. | *"Our estimated baseline scenario models 2.6 to 12.5 grams"* |
| *"Profi packaging costs X RON"* | Fabricates confidential commercial pricing. | *"Actual Profi incumbent cost remains confidential and unknown"* |
