# PackShift — challenge canon

Recorded 2026-09-25 for CANON-01. Challenge and mentor statements below come from
the Human Integrator's supplied CANON-01 brief, which identifies them as official
brief extracts and an obtained mentor clarification. The original official brief
and mentor transcript are not archived here; their original URL/date and the
clarification's exact date are UNKNOWN. This is a provenance boundary, not a new
independent verification of those sources.

## Authority and labels

Resolve conflicts in this order; a lower level never silently overrides a higher one:

1. Official AgriFood challenge brief / rules (`OFFICIAL_REQUIREMENT`).
2. Explicit mentor or sponsor clarifications (`MENTOR_CLARIFICATION`).
3. Human Integrator decisions for Team SoS (`TEAM_DECISION`).
4. Committed implementation (`OBSERVED_IMPLEMENTATION`).
5. Public evidence curated into [NDR-01](../evidence/NDR-01-public-evidence-pack.md) (`PUBLIC_EVIDENCE`).
6. External research / reconnaissance, retaining its source scope.
7. AI `INFERENCE` or `RECOMMENDATION`.

Unestablished facts remain `UNKNOWN`. These are documentation labels, not new API enums.
Historical CANON-01 observations used `a1b938d0784bb36779172d26a80c053d6d05e56a`.
VLD-MR1 reconciliation (2026-09-26) inspects committed base
`e6b326317d11663a401ba4288c27f05853c10d15`; see the
[source ledger and decision packet](../recon/VLD-MR1-post-mentor-reconciliation.md).

## Official challenge

**OFFICIAL_REQUIREMENT:** The number-one priority is reducing virgin plastic in
packaging: conceptually, **virgin plastic = total plastic − recycled content**.
Higher recycled content, ideally close to 100% where technically safe and legally
compliant, is explicitly of interest. Other materials and innovative solutions are allowed.

All four innovation areas remain open: Packaging Design; Circular Packaging Systems;
Consumer Engagement; Digital & Data Solutions. The digital area explicitly includes
packaging traceability, waste monitoring, packaging-selection decision support,
lifecycle assessment, and tools auditing packaging and recommending options with
lower virgin plastic and higher recycled content.

**TEAM_DECISION / challenge fit:** PackShift's digital decision-support capability
remains within official scope. After VLD-MR1 it supports the primary physical
high-temperature packaging concept; official digital eligibility is not withdrawn.

**OFFICIAL_REQUIREMENT — design considerations:** Food safety and product quality;
shelf life; retail logistics and supply-chain compatibility; economic feasibility
at scale; consumer acceptance/ease of use and education; current and future
sustainability regulations; recyclability; preferably mono-material / Design for
Recycling; optimized material use. These are considerations and constraints, not
properties already verified by PackShift.

**OFFICIAL_REQUIREMENT — deliverable:** A working prototype, concept, or proof of
concept is permitted. Present the problem, solution and operation, expected
environmental/operational/business benefits, and implementation/scalability roadmap.
A certified production packaging solution is not required by this brief.
Public datasets, LCA resources, packaging standards, scientific literature,
sustainability reports and relevant technologies are explicitly permitted.

## Official judging weights

| Criterion | Weight |
| --- | ---: |
| Environmental impact, with priority on virgin plastic reduction | 25% |
| Practicality within retail operations | 15% |
| Technical feasibility | 15% |
| Innovation | 10% |
| Business viability | 10% |
| Scalability | 10% |
| User experience | 10% |
| Quality of presentation | 5% |

**TEAM_DECISION:** Anchor the judging narrative in a defensible physical packaging
concept, supported by a working evidence layer with environmental calculation,
scoped operational constraints, provenance and safe failure behavior.

## Optional Hot Food annex

**OFFICIAL_REQUIREMENT:** Hot Food is an **optional** example. Teams may pursue
another direction within the allowed innovation areas.

For a bag, the stated temperature context is approximately up to **250°C for
oven-prepared products** and **180–190°C for rotisserie-prepared products**. The
brief also asks for food safety, the highest possible recycled-plastic share, and
up to **6 hours packaged** without affecting safety/quality.

If a bag is infeasible, an alternative box has the same stated temperature context,
food safety, grease/oil resistance, up to 6 h condition/safety, recyclability,
preferably mono-material / Design for Recycling, avoidance of problematic multilayer
structures, and competitive cost.

**UNKNOWN:** Is packaging inside the oven? Does 250°C mean oven air, packaging
surface, or food-contact temperature? Is six hours in-store hot holding,
transport/takeaway, or total shelf life after packaging? Neither requirement has
been solved or reinterpreted. These are now critical for the chosen team anchor;
see [mentor Q5](open_questions.md#mentor-questions).

## Mentor clarification and data response

**MENTOR_CLARIFICATION:** No additional proprietary / internal Profi packaging
dataset will be provided to the team because the data is confidential. Context:
obtained before CANON-01 and also reported in NDR-01; exact clarification date UNKNOWN.

**TEAM_DECISION (consequences, not a mentor quote):** Do not invent Profi masses,
annual volumes, unit costs, supplier composition, or Profi-specific savings. Use
public manufacturer/regulatory evidence where available. Synthetic values remain
`ILLUSTRATIVE`; public sourced values remain `PUBLIC`; neither is `PROVIDER`.
Public-resource permission does not answer the judging evidence-standard question.

## Post-mentor clarification — VLD-MR1

Recorded 2026-09-26 from the Human Integrator's supplied VLD-MR1 session account,
section 3; original session date/transcript UNKNOWN. This is an attributed mentor
clarification, not independently verified manufacturer evidence or an amendment to
the official brief. Source details: [VLD-MR1](../recon/VLD-MR1-post-mentor-reconciliation.md#basis-and-source-ledger).

**OFFICIAL_REQUIREMENT:** Multiple packaging/circular/digital directions remain
allowed; Hot Food remains an optional official example.

**MENTOR_CLARIFICATION:** Low-temperature packaging reportedly already has a working
solution using 100% recycled plastic. Profi's unresolved practical focus for this
team is high-temperature packaging. That account does not supply a SKU, BOM or
verified complete-package recycled fraction.

**MENTOR_CLARIFICATION — practical requirements:**

- Food safety / food-contact suitability, recyclability, grease/oil barrier,
  approximately 200–250°C resistance and approximately 6 h holding/shelf condition.
- Transparent viewing window so consumers can inspect food on shelf: a physical
  qualification requirement, not cosmetic UX.
- Small portions (potatoes, wings, thighs or similar) and a significantly larger
  whole-chicken package. Exact dimensions and volumes are not supplied.
- Minimize environmental impact; recycled content is desirable for plastic and
  non-plastic materials are allowed. Paper/cardboard must remain recyclable and
  grease-resistant; problematic multilayers that harm recyclability are undesirable.
  A heavier rigid plastic box is not automatically environmentally preferable.
- Approximately +10–15% packaging cost premium could be acceptable for a genuinely
  more sustainable solution. This is a practical tolerance, not procurement approval,
  a contract, an automatic threshold or evidence of actual prices.
- Strong candidate evidence for composition/layers, high-temperature suitability,
  absence of melting/degradation under the intended conditions and food safety;
  preferably formal manufacturer certificates, declarations, datasheets or equivalent.
- Physical sustainable packaging and technical/practical feasibility are the primary
  desired deliverable. Software / website / app is a supporting demonstration layer.

**UNKNOWN — ASK MENTOR:** Does 200–250°C describe oven air, package surface, direct
food contact, a short peak or continuous exposure; for how long at maximum? What
exactly does 6 h mean? Can a bounded process/variant satisfy the intended use, or
must one system cover all processes? Do not infer “250°C for 6 h”. The official
annex's 180–190°C rotisserie context remains recorded above, not silently replaced.

**TEAM_DECISION:** Team SoS adopts sustainable high-temperature physical packaging
as its primary solution/demo anchor. PackShift is the evidence-backed decision and
demonstration layer. Preserve useful software; select no material or supplier in
VLD-MR1 and do not describe planned qualification dimensions as implemented.

Continue with [product canon](product_canon.md), [decision policy](decision_policy.md)
and [open questions](open_questions.md).
