# VLD-MR1 — Post-Mentor Product & Architecture Reconciliation

Recorded 2026-09-26. Documentation / decision task only; no candidate selection,
runtime implementation, schema freeze, commit, push, PR or deployment.

## Basis and source ledger

- Verified base and inspected HEAD: `e6b326317d11663a401ba4288c27f05853c10d15`.
  `git fetch origin` succeeded; `origin/main` equals this SHA, so no newer-base
  semantic reconciliation was needed.
- The original checkout was on `vladimir/repo-cleanup-single-frontend` with five
  pre-existing staged deletions under `Проэкт Хакатон/`. They were left untouched.
  Work proceeds in the clean, detached managed worktree
  `C:/Users/user/.codex/worktrees/post-mentor-reconciliation/gigafood` at the exact
  base. Its initial `git status --short` was empty.
- **S1 — OFFICIAL_REQUIREMENT:** [challenge canon](../canon/challenge_canon.md),
  preserving the official extracts supplied by the Human Integrator in CANON-01.
  Original official artifact/URL is not archived; no new independent verification
  is asserted here.
- **S2 — MENTOR_CLARIFICATION:** Human Integrator's supplied VLD-MR1 task, section 3,
  received for this reconciliation. Local attachment:
  `C:/Users/user/.codex/attachments/6f0af480-e72b-4844-9706-69bc0b6a7b7f/Вставленный текст.txt`.
  This is a supplied session account, not an archived verbatim mentor transcript;
  mentor identity, session date and original recording remain UNKNOWN. The date
  above is the reconciliation date. Each mentor statement below is attributable
  to that account, not independently verified supplier or laboratory evidence.
- **S3 — TEAM_DECISION:** The Human Integrator's VLD-MR1 direction adopts physical
  high-temperature packaging as the primary solution/demo anchor. Technical
  proposals below are TARGET_DIRECTION / RECOMMENDATION, not new mentor quotes.
- **S4 — OBSERVED_IMPLEMENTATION:** Source inspection at the base: [README](../../README.md),
  all four canon files, [architecture](../architecture.md),
  [evidence semantics](../evidence_semantics.md),
  [domain](../../backend/app/domain/packaging.py),
  [calculation/gate](../../backend/app/services/virgin_plastic.py),
  [Selection](../../backend/app/services/selection.py),
  [public pack](../../data/evidence/public-packaging.json),
  [portfolio pack](../../data/evidence/selection-portfolios.json),
  [HomePage](../../frontend/src/pages/HomePage.tsx),
  [SelectionView](../../frontend/src/components/SelectionView.tsx), and
  [TypeScript contracts](../../frontend/src/api/contracts.ts). Additional checks:
  [economics](../../backend/app/services/economics.py),
  [API](../../backend/app/main.py), [loader](../../backend/app/runtime/context.py),
  [launcher](../../scripts/demo.py), [CI](../../.github/workflows/ci.yml) and test sources.
  These are code/data observations, not a fresh runtime or manufacturer audit.

Authority, highest first: official brief/rules/provider requirements; mentor/sponsor
clarification; Human Integrator team decisions; committed implementation; public
evidence; research; AI inference/recommendation. Lower authority cannot override higher.
Labels in this packet are documentation labels, not proposed runtime enums.

## A. Executive reconciliation

**MENTOR_CLARIFICATION:** Profi's valuable unresolved focus for this team is
high-temperature packaging; low-temperature packaging reportedly already has a
working solution using 100% recycled plastic. That statement does not identify a
SKU, establish a complete BOM, or prove all low-temperature applications solved.

**TEAM_DECISION:** Propose a defensible sustainable physical packaging concept for
that high-temperature use case. PackShift supports its evidence, limitations and
next validation steps. No physical candidate is selected in VLD-MR1.

Official Digital & Data Solutions eligibility and optional Hot Food status remain
unchanged. Environmental benefit, bounded operational eligibility and approval
remain separate; `PUBLIC ≠ PROVIDER`, `CALCULATED ≠ VERIFIED`, `missing ≠ 0`.

A full rewrite is unjustified: strict validation, provenance, calculations,
Selection, economics, typed UI and demo tooling are reusable. Continuing the old
demo unchanged is also inadequate: a 95°C/microwave scenario and plastic arithmetic
do not establish 200–250°C use, a 6 h condition, grease resistance, a viewing window,
food-contact suitability, recycling or whole-chicken feasibility. The new direction
requires evidence and conceptual qualification extensions before implementation.

## B. Source-aware change log

| Statement | Before mentor session | New evidence | Canonical status | Consequence |
| --- | --- | --- | --- | --- |
| Digital & Data scope | Explicitly allowed by S1; software-led team narrative | S2 says software is not Profi's primary desired deliverable | OFFICIAL_REQUIREMENT unchanged; TEAM_DECISION changes emphasis | Keep digital capability as supporting proof layer |
| Hot Food official status | Optional example in S1 | S2 gives team-specific practical focus | OFFICIAL_REQUIREMENT remains optional | Do not rewrite official mandatory scope |
| High-temperature focus | Demo anchor undecided (old Q2) | S2 prioritizes unresolved high-temperature packaging | MENTOR_CLARIFICATION + TEAM_DECISION | Primary physical solution/demo anchor |
| Low-temperature solution | No comparable claim in prior canon | S2 reports working 100% recycled-plastic solution | MENTOR_CLARIFICATION; detailed BOM UNKNOWN | Demote cold-pack transition from primary pitch; do not equate it with Case A |
| 200–250°C | S1 optional annex: oven context up to 250°C; rotisserie 180–190°C | S2 gives approximately 200–250°C target/context | MENTOR_CLARIFICATION; PARTIALLY DEFINED | Resolve exposure location, duration, peak/continuous use; no merged temperature profile invented |
| 6 h | S1 up to six hours packaged without safety/quality loss | S2 approximately 6 h holding/shelf condition | MENTOR_CLARIFICATION; PARTIALLY DEFINED | Not six hours at maximum temperature; acceptance conditions UNKNOWN |
| Grease / oil barrier | S1 alternative-box consideration; not runtime gate | S2 practical requirement | MENTOR_CLARIFICATION | Qualification dimension with scoped evidence |
| Transparent window | Not established in prior canon | S2 consumer must inspect food on shelf | MENTOR_CLARIFICATION | Physical qualification requirement, not cosmetic UX |
| Recyclability | S1 design consideration | S2 reinforces it, including paper/cardboard and multilayer concerns | OFFICIAL_REQUIREMENT + MENTOR_CLARIFICATION | Assess complete construction and local path, not resin alone |
| Sustainability/material | Virgin reduction and recycled content important; alternatives allowed | S2 permits non-plastic, seeks low impact; heavier rigid boxes not inherently better | MENTOR_CLARIFICATION | No material-family winner; mass and construction matter |
| +10–15% cost premium | Economics/scenario inputs exist; Profi prices UNKNOWN | S2 approximate tolerance for a genuinely more sustainable solution | MENTOR_CLARIFICATION / heuristic | No procurement promise, automatic pass threshold or price evidence |
| Two size cases | Single-portion narrative in current portfolio | S2 potatoes/wings/thighs and whole chicken | MENTOR_CLARIFICATION | Explicitly assess both sizes; dimensions UNKNOWN |
| Evidence/certificates | Provenance and evidence gaps already central | S2 wants composition/layers, thermal/no-melt/no-degradation and food-safety evidence, preferably formal manufacturer documents | MENTOR_CLARIFICATION | Build candidate-specific dossier; certificate title alone is insufficient |
| Software role | Packaging Transition Copilot as product thesis | S2 physical concept + technical/practical feasibility first | MENTOR_CLARIFICATION + TEAM_DECISION | Software demonstrates why a concept merits validation; no claim software is useless/out of scope |

## C. Canonical product thesis

**TEAM_DECISION:** We propose a sustainable high-temperature food-packaging concept
for Profi; PackShift is its evidence-backed decision and demonstration layer,
showing scoped physical feasibility, virgin-plastic reduction, uncertainty and the
validation still needed, without certifying safety or granting implementation approval.

**TARGET_DIRECTION:** Feasibility cannot be subordinated to environmental arithmetic.
The software supports selecting and validating a concept through evidence and human
review; it does not perform or replace physical qualification tests.

## D. Requirement matrix

Status describes requirement clarity, not demonstrated candidate compliance.
`CONFIRMED` means confirmed at the named authority; `NOT YET MODELED` describes the
runtime gap. No row says any candidate satisfies all requirements.

| Dimension | Requirement / target | Authority | Runtime modeled now? | Evidence needed | Status |
| --- | --- | --- | --- | --- | --- |
| Virgin-plastic reduction | Remains a priority; no minimum reduction invented | S1 official; S3 team | Yes, represented plastic components and guarded deltas | Complete comparable BOM, plastic masses and exact recycled fractions | CONFIRMED objective; actual Profi baseline UNKNOWN |
| Recycled content | Desirable for plastic; non-plastic allowed | S1 + S2 | Yes, fractions; Selection requires exact point evidence | SKU/recipe declaration and scope, not an “up to” ceiling | CONFIRMED direction; candidate values UNKNOWN |
| High-temperature capability | Around 200–250°C, exposure semantics unresolved | S2; distinct S1 annex preserved | Partial: scalar maximum and microwave only | Complete-system evidence with temperature location, process, duration and no melting/degradation under intended conditions | PARTIALLY DEFINED; exposure model NOT YET MODELED |
| Food safety / food contact | Suitability for intended food and process | S1 + S2 | Boolean/descriptive context and advisory only; no qualification | Scoped declaration, migration/test evidence and QA interpretation matching foods, time and temperature | CONFIRMED need; conditions UNKNOWN; qualification NOT YET MODELED |
| 6 h holding | Approximately 6 h holding/shelf condition | S2; S1 packaged safety/quality context | No structured duration gate | Defined holding process and safety/quality criteria with supporting tests | PARTIALLY DEFINED; NOT YET MODELED |
| Grease / oil barrier | Resist grease/oil in intended use | S1 box context + S2 | No | Food/process-specific barrier, leak and seal evidence for full construction | CONFIRMED need; test criteria UNKNOWN; NOT YET MODELED |
| Recyclability | Recyclable system, including paper/cardboard; avoid harmful multilayers | S1 + S2 | No | Composition, separability and applicable collection/sorting/reprocessing evidence | CONFIRMED need; local feasibility UNKNOWN; NOT YET MODELED |
| Viewing window | Transparent window for shelf inspection | S2 | No | Window material, joins/coatings, visibility and compatibility under defined use conditions | CONFIRMED need; material/exposure UNKNOWN; NOT YET MODELED |
| Composition / layer complexity | Know construction; minimize environmental impact and problematic layers | S2 | Material text and plastic components only | Full BOM: body, window, closure, coatings, adhesives/layers and masses | PARTIALLY DEFINED; general construction NOT YET MODELED |
| Small portion format | Potatoes, wings, thighs or similar portions | S2 | Context text; boundary metadata does not verify fit | Dimensions, fill mass/volume, closure and handling evidence | CONFIRMED use case; exact sizes UNKNOWN; fit NOT YET MODELED |
| Whole-chicken format | Significantly larger package | S2 | No dimensional fit evaluation | Chicken/package dimensions, usable volume and structural/handling evidence | CONFIRMED use case; dimensions UNKNOWN; NOT YET MODELED |
| Cost premium / economics | Approx. +10–15% could be acceptable for a more sustainable solution | S2 heuristic | Hypothetical Comparison costs/volume/transition cost arithmetic; no procurement threshold | Comparable unit quotes, baseline cost, volumes and commercial scope | PARTIALLY DEFINED tolerance; actual prices UNKNOWN |

Recycled share and virgin-plastic arithmetic are not a complete environmental
assessment. A heavier box cannot be declared better from recycled percentage alone.
No LCA/CO2 benefit is established by VLD-MR1.

## E. Preservation map

| Current area | Disposition | Repository-grounded reason / boundary |
| --- | --- | --- |
| FastAPI architecture | KEEP | Typed stateless responses and startup snapshots are reusable; no service rewrite needed |
| React/Vite frontend | KEEP + EXTEND | Typed fetching, independent availability, abort/retry and evidence views persist; narrative/coverage views later |
| Provenance semantics | KEEP | Numeric and gate inputs carry origin, verification, source and note; do not collapse these axes |
| Evidence loader | KEEP + EXTEND | Fail-closed scenario/portfolio loading; future accepted contracts need validation, not fallback data |
| Virgin-plastic calculation | KEEP | Deterministic formula and null behavior valid for plastic-bearing components; not a general material/LCA model |
| Selection architecture | KEEP + EXTEND | Boundary comparability, grouping, annual disclosure and next actions useful; no global ranking today |
| Eligibility engine | KEEP + EXTEND | Preserve bounded thermal/microwave behavior; additional qualification dimensions require coordinated semantics |
| Economic scenario | KEEP + EXTEND | `economics.py`, POST route and Comparison UI already exist; later link to researched concept without inventing prices |
| Current public evidence pack | REPLACE DATA / CONTENT in future primary demo | Bottle and 95°C prepared-food examples stay available as bounded examples/regression assets; unchanged here |
| Current Faerch portfolio | DEMOTE FROM PRIMARY DEMO | Tray bodies exclude sealing film; CPET source-attributed 220°C is not 250°C or full-system/6 h/window evidence; exact PCR missing |
| Current 95°C/microwave demo | DEMOTE FROM PRIMARY DEMO | Assumed, not verified Profi requirement; useful incompatibility demonstration, insufficient new solution anchor |
| Comparison mode | KEEP | Useful bounded arithmetic and economic scenarios; supporting proof, not sole solution narrative |
| CI/tests | KEEP + EXTEND | Existing API, calculation, Selection, economics and launcher tests plus CI build/preflight protect behavior; future qualification needs additional checks |
| Demo launcher | KEEP + EXTEND | PUBLIC identity, real HTTP preflight and process cleanup remain useful; later change selected evidence/acceptance under integration contract |
| Final material, construction and number of variants | UNKNOWN UNTIL RESEARCH | No chosen family/SKU; research must assess both formats and whether a bounded process/variant is acceptable |

The committed CPET and APET deltas remain unavailable because exact candidate PCR
is missing. No numeric annual saving can be recovered by guessing PCR or treating
the mentor's low-temperature “100%” statement as a value for these candidates.

## F. Target conceptual architecture

**TARGET_DIRECTION / RECOMMENDATION**, not a frozen schema or existing capability:

```text
Physical packaging candidate / explicitly bounded intended use
  ├─ composition / layers / component boundaries
  ├─ environmental assessment
  │    └─ plastic mass, recycled content, virgin-plastic calculation where supported
  ├─ technical qualification
  │    ├─ temperature AND exposure conditions / duration
  │    ├─ 6 h holding conditions
  │    ├─ grease / oil resistance
  │    ├─ food-contact evidence
  │    ├─ recyclability
  │    └─ viewing window and interfaces
  ├─ physical-format feasibility: small portion + whole chicken
  └─ business feasibility: comparable cost / premium scenario
                 ↓
       PackShift evidence / decision layer
                 ↓
  requirement coverage + scope + uncertainty / provenance
            + blockers / next validation actions
```

A requirement and a candidate capability must retain separate authority, evidence
and comparable use conditions. A body rating does not qualify its film/window,
adhesive, seal or assembled package. Six-hour holding is not inferred from a
temperature ceiling. Microwave suitability does not establish oven exposure.

Retain independent environmental and technical outcomes. Unknown evidence must
remain visible; known incompatibility remains a blocker within comparable stated
conditions. Current `ELIGIBLE` covers only evaluated thermal/microwave premises;
it must not be displayed as complete high-temperature qualification.

General composition must accommodate plastic and non-plastic components without
misusing `plastic_mass_g` as total mass. Today zero mass and empty component lists
are rejected: a plastic-free design cannot be encoded as a fabricated positive
mass, omitted component inventory, or assumed zero. IGR design must address that
representation after research, preserving the existing plastic formula. No enum,
JSON layout, class hierarchy, schema version or material family is selected here.

## G. Shared-contract impact assessment

Classification is prospective; **none of these surfaces is modified in VLD-MR1**.

| Surface | Classification | Later coordination / gate |
| --- | --- | --- |
| `backend/app/domain/packaging.py` | SEMANTIC CHANGE REQUIRED | Separate construction/non-plastic inventory and scoped qualification evidence; IGR design plus NDR evidence and Integrator approval |
| `frontend/src/api/contracts.ts` | ADDITIVE CHANGE LIKELY | Mirror accepted domain/API changes together; breaking changes/migration remain research-dependent |
| `data/evidence/*.json` | RESEARCH-DEPENDENT | VDR curates only sourced facts after NDR and approved IGR contract; preserve current examples |
| Selection / eligibility services | SEMANTIC CHANGE REQUIRED | Broader coverage, compatibility and next-action semantics; no silent reinterpretation of existing statuses or grouping |
| Frontend presentation components | SEMANTIC CHANGE REQUIRED | Physical problem/candidate first; expose requirement coverage, gaps and scoped status; do not invent capabilities |
| Tests | ADDITIVE CHANGE LIKELY | Retain regressions; add missing/incompatible/unverified/full-system and format cases under approved contract |
| Virgin-plastic formula | NO CHANGE EXPECTED | Preserve arithmetic; general composition mapping is a separate contract issue |
| API routes / JSON schema and version | RESEARCH-DEPENDENT | No route/version selected now; compatibility/migration decision belongs to Integrator after design |
| Dependencies, CI, deployment | NO CHANGE EXPECTED | No new infrastructure justified by this reconciliation |
| Launcher acceptance / chosen demo pack | RESEARCH-DEPENDENT | Existing readiness is runtime readiness only; final demo acceptance follows integration |

## H. New demo critical path

**TEAM_DECISION — target judging flow:**

1. Current Profi problem: mentor-reported unresolved high-temperature packaging;
   no invented baseline or confidential data.
2. Explicit requirements: distinguish S1/S2 authority and unresolved thermal/6 h scope.
3. Physical candidate/concept: only after NDR evidence and Human Integrator scope
   decision; identify bounded intended use and unresolved alternatives.
4. Composition: body, window, closure, barriers and layers; disclose missing BOM parts.
5. Technical evidence matrix: document scope, comparable conditions, contradictions,
   uncovered requirements and needed manufacturer/QA evidence.
6. Sustainability / virgin plastic: scoped inputs and comparable boundaries;
   unavailable results remain unavailable; no invented LCA or baseline.
7. Size feasibility: small portions and whole chicken, showing evidence or gaps for each.
8. Economics: sourced comparable quotes if available; otherwise clearly hypothetical
   arithmetic alongside mentor's approximate +10–15% tolerance.
9. Remaining UNKNOWN and validation needed: no completeness illusion from current gate.
10. Recommended next validation step: resolve exposure/holding definition, then request
    matching complete-system evidence and scoped physical validation with QA.

Judge question: **Why should Profi believe this physical concept is worth validating?**
The platform's sophistication is supporting evidence, not the central proposition.
Until candidate research succeeds, this is a target flow, not a ready new demo.
If no candidate has adequate evidence, show the gap/validation plan and report the
candidate gate blocked; do not relabel the 95°C demo as the high-temperature solution.

## I. Claims policy

| Group | Claims / conditions |
| --- | --- |
| Allowed | Source-attributed manufacturer capability within the exact document/SKU/use scope; deterministic calculation from explicit inputs; documented coverage and gaps; explicit uncertainty; mentor-indicated cost tolerance; hypothetical scenario arithmetic |
| Conditional | “Candidate appears promising” only with named supporting evidence and unresolved gates; “potential virgin-plastic reduction” only with explicit comparable input scope; “compatible with requirement X” only when evidence establishes comparable process, temperature, duration, food and construction conditions relevant to X |
| Forbidden without stronger evidence | “Certified by PackShift”; guaranteed food safe; guaranteed 6 h shelf life; guaranteed 250°C compatibility beyond source conditions; actual Profi savings without provider data; actual Profi cost premium without sourcing; production-ready; universally recyclable; drop-in replacement |

PackShift itself cannot confer certification. A formal manufacturer document is
evidence with scope, not blanket approval. Never combine separate temperature and
holding statements into “food-safe at 250°C for 6 h”. Recycled content does not
establish recyclability, and absence of melting alone does not establish food safety.
The original official optional annex and the new team anchor must remain distinct.

## J. UNKNOWN register and decision gates

“Blocks architecture” means final shared-contract choices/implementation, not the
conceptual map or independent research. “Can remain” permits only a disclosed gap,
not a claim of complete feasibility. All unresolved mentor facts: UNKNOWN — ASK MENTOR.
The earlier no-confidential-data response stands; do not assume repeated requests
will yield proprietary data.

| UNKNOWN / resolution owner | Blocks architecture? | Blocks candidate selection? | Blocks demo claim? | Can remain UNKNOWN for hackathon? |
| --- | --- | --- | --- | --- |
| Exact thermal exposure: air/surface/contact, bake-in/post-pack, peak/continuous, max duration — mentor/process owner | Yes, final exposure semantics | Yes, definitive intended-use fit; research shortlist can start | Yes, intended-use temperature compatibility | Yes as explicit limitation; no thermal-qualified solution claim |
| Exact 6 h meaning, holding environment and safety/quality criteria — mentor/QA | Yes, holding qualification semantics | Yes, qualified fit | Yes, 6 h safety/shelf-life claim | Yes, without a 6 h performance claim |
| One system for all hot processes vs bounded use/variants acceptable — mentor + Integrator | Yes, final scenario/coverage boundaries | Yes, final concept scope | Yes, universal coverage | Yes for bounded proposal pending acceptance |
| Actual current Profi package BOM — Profi if shareable; otherwise unavailable | No for conceptual design; inventory model must handle gaps | No for shortlist; yes for replacement comparison | Yes, complete actual transition | Yes, no invented Profi baseline |
| Actual current package mass/recycled fractions — attributed provider data | No | No for shortlist | Yes, actual Profi per-unit reduction | Yes, N/A or clearly separate public baseline |
| Actual Profi annual volume — provider if shareable | No | No | Yes, actual annual impact | Yes, hypothetical volume only |
| Actual unit costs/quotes and commercial terms — procurement/supplier | No; do not freeze approval threshold | Conditional, commercial recommendation | Yes, actual savings/premium | Yes, hypothetical economics only |
| Manufacturing / packing line and logistics compatibility — operations/supplier | Possibly, final qualification dimensions | Yes, deployable/drop-in choice | Yes, operational readiness | Yes, proposed trial and explicit limitation |
| Exact window material, location, visibility criteria and thermal exposure — mentor + manufacturer | Yes, final construction/qualification mapping | Yes, full-system fit | Yes, compliant window | Yes as gap; window requirement itself is already confirmed |
| Whole-chicken dimensions, fill volume/mass and closure needs — mentor/operations | Partly, dimensional fit semantics | Yes, whole-chicken variant fit | Yes, demonstrated large-format feasibility | Yes, without a fit claim |
| Small-portion dimensions/fill and handling needs — mentor/operations | Partly | Yes, specific format fit | Yes, validated small-format fit | Yes as explicit format gap |
| Specific food matrix / migration conditions — QA/manufacturer | Yes, final evidence scope | Yes, qualified food-contact choice | Yes, food-safety claim | Yes, no guaranteed safety claim |
| Local collection/sorting/recycling-path feasibility — local operator / scoped evidence research | Partly, final locality/coverage | Yes for validated recyclability | Yes, locally recyclable claim | Yes, qualified design intent only |
| Candidate composition/layers, masses, PCR, window/seal and formal evidence — NDR/manufacturer | Yes before schema freeze | Yes, defensible final concept | Yes, candidate-specific coverage | Gaps may remain; no winner invented |
| Jurisdiction and actual Profi decision owner/workflow — mentor/Integrator | No for reconciliation; affects scoped qualification | Conditional | Yes, jurisdiction-specific approval/process claims | Yes, explicitly unresolved |
| Judging minimum evidence threshold / illustrative-scenario acceptability — mentor/judges | No | No for evidence search | Yes, claim evidence is sufficient for judging | Yes, no guaranteed acceptance |
| Original official artifact and mentor date/transcript — Integrator | No | No for attributed research | Yes, independently authenticated quotation | Yes, preserve supplied-account attribution |

**Gate rule:** If official wording and clarification cannot be reconciled as scoped
preference, stop for the Human Integrator. If selection requires fabricated supplier
facts, stop selection. If schema choices require unresolved research, stop schema
freeze. No such uncertainty requires immediate runtime modification in VLD-MR1.

## K. Downstream contract graph

These are authorized planning boundaries, not tasks executed by VLD-MR1.

```text
VLD-MR1
  ├─ NDR-HT1: source-backed candidate research + unresolved process questions
  ├─ IGR-HT1: conceptual domain/compatibility design (no schema freeze yet)
  └─ PUX-HT1 recon/design: physical-first flow and explicit unknown states
          │
NDR evidence + mentor scope answers + Integrator bounded-concept decision
          ↓
IGR-HT1 final shared-contract approval (including migration/coverage semantics)
          ├─ VDR-HT1: canonical evidence pack against accepted contract
          └─ IGR-HT2: domain/service/API implementation and contract checks
                         │
       accepted VDR pack + IGR implementation
                         ↓
             PUX-HT1 implementation/integration
                         ↓
                APR-HT1 acceptance/claims
                         ↓
                VLD-DEMO1 final end-to-end
```

| Downstream contract | Status after VLD-MR1 | Dependency / deliverable boundary |
| --- | --- | --- |
| NDR-HT1 — High-Temperature Packaging Candidate Research | READY | Use S1/S2 matrix; compare material/construction options and both sizes; source original manufacturer evidence, record conditions and gaps; no subjective winner or fabricated data |
| IGR-HT1 — Packaging Qualification Domain Extension | PARTIAL | Conceptual design and compatibility audit ready in parallel; final contract requires NDR evidence, process scope and Human Integrator approval |
| VDR-HT1 — Canonical High-Temperature Evidence Pack | BLOCKED | Needs accepted NDR evidence/concept scope and approved IGR contract; a research ledger can precede JSON but cannot masquerade as canonical runtime data |
| PUX-HT1 — Evidence-First High-Temperature Demo UX | PARTIAL | Recon/design ready using requirements and explicit UNKNOWN placeholders; candidate-specific implementation requires accepted evidence and API contract, integrated demo requires IGR-HT2 + VDR |
| APR-HT1 — Acceptance & Claims Reconciliation | BLOCKED | Integrated model, evidence, UI and intended-use scope first; audit each claim against source coverage |
| VLD-DEMO1 — Final End-to-End Demo Reconciliation | BLOCKED | Final integration and APR acceptance first; runtime checks do not themselves qualify physical packaging |

IGR-HT2 implementation may run alongside VDR only after the shared contract is
approved; generated fixtures must remain explicitly synthetic and cannot supply
candidate facts to VDR or the judging UI. IGR-HT1 and PUX design cannot assume that
the current Faerch CPET, an unspecified paper system, or any material is selected.

## Verification and handoff boundary

Only this packet and the four allowed canon/architecture documents are changed.
The supplied clarification can be represented as a scoped mentor preference without
contradicting official scope. No immediate shared runtime change is necessary.

README and historical evidence/review documents remain current-runtime or historical
references, not the new judging narrative. Their 95°C examples remain valid within
their assumed contexts. In particular, INT-R2 D11's frozen Faerch/95°C demo and
QA-R1's pre-mentor assessment of optional high-temperature work describe the prior
team direction. VLD-MR1 supersedes their primary-demo choice, not the historical
test results or official optional status. The README's blanket “No costs/ROI” sentence is stale:
hypothetical economics is implemented (its own later walkthrough documents it).
Corrected current capabilities live in product canon and architecture; README is
outside the specified write set. Likewise, evidence_semantics.md's “Annual impact is
absent” is stale relative to Selection and the decision policy. Neither statement
overrides inspected code or this packet. No broad historical-document rewrite made.

Acceptance review must include tracked diff plus the new untracked packet, whitespace,
allowed-path checks, local links and semantic searches for every new requirement,
authority distinction, current/target distinction and demoted demo reference.
No backend/frontend suite or physical test is claimed from this documentation task.
Stop at the reviewed documentation handoff; do not start downstream implementation.
