# APR-EU-01 — EU Alignment & Market Validation Evidence Packet

**Status: FULL COACH-SOURCE RECONCILIATION COMPLETE — ready for Project Brain review.
Independent conservative reassessment: 2.59.
Supplied mentor/team workbook: 2.56.
Baseline-preserving APR uplift projection: ≈2.94 if accepted.
Target 3.10–3.15: NOT YET ACHIEVED.**

Prepared 2026-09-26 for Alisa / Team SoS / Vladimir. Inspected base and HEAD:
`29f0b8b1b237a6812b75ba2affd8b246d6f9399b`, branch `main`, matching refreshed
`origin/main` and the issuance SHA. Working tree was clean before this document.

The research and proposed validation/business roadmaps below are usable inputs
to coach review. The user supplied the Level-1 coach sources:
`EU Alignment Scorecard GigaHack2026.xlsx` and `EU_Frameworks_Supporting_Document.docx`
(Serghey Drive folder).
All three workbook sheets (Read Me, Criteria Guide, Team Scorecard), including formulas,
were inspected read-only. The user approved reporting both aggregation methods
on 2026-09-26, resolving the methodological HARD STOP. The supporting coach document
`EU_Frameworks_Supporting_Document.docx` has now been inspected and reconciled by
Project Brain: it confirms the framework mappings used throughout this packet
(Green Deal, Fit for 55, ESPR, CE marking, Twin Transition, EU Taxonomy/DNSH;
DIGITAL, EIT Deep Tech, Data Act, AI Act/ALTAI, NIS2/CRA, EDIH/TEF/EuroHPC;
GDPR Arts 5/6/9/25/35; Farm to Fork, CAP, Soil Strategy 2030; Single Market,
EIC Pathfinder/Transition/Accelerator, Horizon Europe / Moldova association).
Result: **SUPPORTING DOCX RECONCILIATION: NO MATERIAL CONFLICT**.
This DOCX is a scorecard framework reference guide, not external compliance certification.

This packet clearly separates four distinct evaluation perspectives:
1. **Supplied mentor/team workbook state**: baseline index **2.56** (applicable-criterion average **2.55**).
2. **INDEPENDENT CONSERVATIVE REASSESSMENT**: coach formula **2.59**, applicable-criterion average **2.60**.
   This is an independent adversarial review and not a replacement for workbook scores.
3. **Project Brain conditional projection**: **≈2.94** if current candidate uplifts (A3, B1, B4, E1, E3, E4, E5) are accepted by mentor.
4. **Target 3.10–3.15 path**: conditional on future D2, D3, E2, B3 evidence (**NOT YET ACHIEVED**).
No missing criterion is silently assigned zero, and no target score is treated
as evidence. No sheet, runtime, canon, API, dataset or dependency was changed.

## 1. Authority, source register and implementation reconciliation

Labels: **FACT / INSPECTED CODE** means a repository observation;
**REPORTED QA** means a committed report, not a test rerun in this task;
**EXTERNAL PRIMARY SOURCE** means the cited organisation's own publication;
**PROPOSAL / HYPOTHESIS** means work not yet executed or validated;
**UNKNOWN** means evidence is absent. No interview or external contact was conducted.

| Internal evidence | Scope and limitation |
| --- | --- |
| R1: four documents in `docs/canon/` | Accepted product, challenge, policy and remaining questions. They do not establish actual customer demand or regulatory approval. |
| R2: `docs/evidence_semantics.md`, `docs/architecture.md` | Evidence boundaries and design. Some implementation descriptions predate economics. |
| R3: `backend/app/main.py`, `runtime/context.py`, `services/{virgin_plastic,selection,economics}.py`, `backend/pyproject.toml` | Current routes, startup snapshots, deterministic services and declared runtime dependencies inspected. |
| R4: `frontend/src/api/client.ts`, current Selection/economic views and `scripts/demo.py` | API-driven interaction; current PUBLIC guards in launcher. No fresh browser acceptance claimed. |
| R5: `docs/review/QA-R3C-current-main-final-acceptance.md` | Reports ACCEPTABLE at `410574ccd385f01cc5c599cfa8f349107a85cc42`, 127 passing tests, browser/mobile/runtime acceptance and resolved STOP-11. This is historical execution evidence, not a fresh test of HEAD. |
| R6: `docs/review/QA-R1-judging-readiness-audit.md`, `QA-R3-final-acceptance.md` | Historical gaps and original STOP; not current unresolved defects merely because old reports retain them. |
| R7: `README.md` and diff from R5 base to HEAD | Subsequent changes include comparability truthfulness, Selection tests, UI copy/CSS and the QA report. Do not claim R5 reran against those later commits. |
| R8: local `C:\Users\djahe\Downloads\AgriFood (1).txt` | Supplied challenge-text copy identifies Biomentorhub x Profi; explicit virgin-plastic priority, digital selection tools, public resources and feasibility/scalability. Original publication URL/date unavailable. `AgriFood.txt` instead contains proposed interview questions, not answers or customer evidence. |
| R9: user-supplied `EU Alignment Scorecard GigaHack2026.xlsx` | Level-1 source. Read Me A14:C20: scoring scale and N/A; Criteria Guide A4:F30: all descriptors; Team Scorecard D10:D34: supplied scores, C37:C42: formulas. Metadata names SoS, AgriTech, Serghey Tkachenko, 26.09.2026 and TRL 4. Notes/evidence cells are empty: recorded scores are not independently verified explanations or customer-validation evidence. |
| R10: coach-supplied `EU_Frameworks_Supporting_Document.docx` (Serghey Drive folder) | Level-1 source. Scorecard framework reference guide mapping 21 criteria to EU instruments: A (Green Deal, Fit for 55, ESPR, CE marking, Twin Transition, EU Taxonomy/DNSH); B (DIGITAL, EIT Deep Tech, Data Act, AI Act/ALTAI, NIS2/CRA, EDIH/TEF/EuroHPC); C (GDPR Arts 5, 6, 9, 25, 35); D (Farm to Fork, CAP, Soil Strategy 2030, Green Deal/Fit for 55 for stakeholder and validation routes); E (Single Market, CE harmonised standards, EIC Pathfinder/Transition/Accelerator, Horizon Europe / Moldova association). Serves as framework guide, not external certification. SUPPORTING DOCX RECONCILIATION: NO MATERIAL CONFLICT. |

Repository gate executed: `git fetch origin`, `git switch main`,
`git pull --ff-only`, `git status --short`, `git rev-parse HEAD`,
`git rev-parse origin/main`. No issuance-base drift. No commit, push or PR in this task.

**Reconciliation:** The economic scenario is implemented in current `main`
(`POST /api/v1/scenarios/{scenario_id}/economics`): user-entered costs/volume,
annual spend and signed cost differences, optional first-year cost and guarded
cost per kg avoided. It remains hypothetical, USER_PROVIDED/NOT_VERIFIED, and
preserves operational status. Older blanket statements that all cost calculations
are absent are stale. This does not establish ROI, customer willingness to pay,
actual Profi costs or verified savings. Recommend a separately owned documentation
reconciliation; no protected canon edit or score increase is made here.

**TRL:** retain the task's working team estimate TRL 4. Integrated software and
reported controlled demonstrations support that working position; no retailer
environment validation or production deployment is evidenced. Writing this packet
does not establish TRL 5 or any formal external TRL certification.

## 2. A3 — Technology footprint

**FACT / INSPECTED CODE (R3):** decision-critical services perform arithmetic,
evidence checks and bounded comparisons. There is no model inference, training,
supplier scraping or external API call in these evaluation services. Startup reads
local JSON into an in-memory snapshot. Evaluation routes return results without
database writes; no database dependency is declared. The frontend calls the local
API. This is a small deterministic prototype, not a deployed multi-tenant SaaS.

| Driver | Existing implementation choice | What is not established / next measurement |
| --- | --- | --- |
| Compute | Arithmetic over represented components and curated candidates; no inference service or GPU requirement in the inspected core | No joules/request, production latency/load or cloud carbon measurement. Measure CPU time and memory for fixed portfolio sizes on a named machine. |
| Storage/retention | Local versioned evidence and in-memory startup snapshots; scenario evaluation is not persisted by inspected handlers | Not a promise of zero retention: browser memory, access logs, source-control history and future hosting have separate lifecycles. Inventory logs and retention before pilot. |
| Network | No runtime fetching of supplier documents or remote inference in core evaluation; browser/API exchange only | Software installation/update traffic and any future hosting/integrations remain footprint drivers. Measure bytes/request and asset sizes separately. |

**Safe A3 evidence statement:** PackShift's current core uses deterministic
arithmetic and an application stack without scenario-result persistence or AI
inference. These choices avoid those particular dependencies; environmental
superiority or measured carbon savings have not been demonstrated.

A3=3 is proposed against the inspected descriptor: the compute/storage drivers
are identified and concrete mitigations exist. No score of 4 or measured footprint
reduction is claimed.

## 3. B1 / B4 — Digital capacity and a named support route

**EXTERNAL PRIMARY SOURCE:** DIGITAL includes wider use of digital technologies
across the economy and society and supports business transformation through EDIHs
([SRC-01](https://digital-strategy.ec.europa.eu/en/activities/digital-programme)).

**Mapping / INFERENCE:** PackShift digitises the assembly and review of packaging
inputs, provenance, environmental deltas, operating constraints and next evidence
actions. The hypothesised process it supports is a specialist reconciling supplier
specifications, spreadsheets and QA requirements. The current implementation is
concrete; prevalence and value of that workflow at Profi remain unvalidated.
The appropriate capacity argument is business deployment of digital decision
support, not AI/HPC, and not an existing sovereign-cloud/data-space integration.

**Named route:** The European Digital Innovation Hub in Transilvania (Romania)
lists test-before-invest, training, networking and investment-support services.
Its principal audience is SMEs/public-sector organisations, with regional and
sector priorities ([SRC-02](https://european-digital-innovation-hubs.ec.europa.eu/edih-catalogue/european-digital-innovation-hub-transilvania-website/about)).

**PROPOSED next action:** Alisa prepares a two-page intake brief; Vladimir asks
the hub to assess Team SoS's legal-entity/geographic eligibility and whether a
non-AI packaging workflow pilot falls within its current services. Request a
facilitated shadow review with a packaging SME or retailer participant: test data
ingestion effort, evidence comprehension and handoff to QA. Ask for referral to
another EDIH if sector fit fails. No free service, acceptance, partnership or
retailer subsidy is assumed; a large retailer is not automatically an eligible SME.

This is a named, specific route, **not infrastructure already used**. The inspected
B4 descriptor accepts a named facility and concrete test idea; B4=3 is proposed
for that plan, not completed engagement. No outreach has occurred. No EuroHPC need is evidenced. AgrifoodTEF targets AI/robotics testing;
it is not the primary route for this deterministic prototype
([SRC-03](https://digital-strategy.ec.europa.eu/en/policies/testing-and-experimentation-facilities)).

## 4. D2 — Stakeholders and value chain

All assignments below are **WORKFLOW HYPOTHESES**, not the discovered Profi org chart.

| Function | Proposed role | Decision/evidence interaction | Question requiring real participant |
| --- | --- | --- | --- |
| Packaging/sustainability specialist | USER; prospective internal champion | Builds transition dossier; checks component boundaries and unknowns | Who currently prepares this review, and how often? |
| QA / food safety | APPROVER / GATEKEEPER | Evaluates migration, food matrix, temperature/time and qualification evidence | Which findings require a hard stop versus further testing? |
| Procurement | USER; BUYER influence; commercial gatekeeper | Obtains supplier declarations, prices and terms; coordinates sourcing | Who owns purchasing risk and tool budget? |
| Category management | USER / integration stakeholder | Defines product/category needs and pilot availability | Which packaging family is worth reviewing first? |
| Packaging suppliers | DATA / EVIDENCE PROVIDER | Supplies exact SKU/recipe PCR, mass, capabilities and dated declarations | Can evidence be shared non-confidentially and versioned? |
| Regulatory/compliance | APPROVER / GATEKEEPER | Determines applicable laws and qualification documentation | Who confirms jurisdiction and permitted claim language? |
| IT/security/data owner | INTEGRATION STAKEHOLDER / gatekeeper | Controls access, hosting, data classification and integrations | What procurement/security requirements apply to a pilot? |
| Management/budget owner | BUYER / sponsor | Approves pilot budget and criteria for continuation | Which budget line and measurable outcome justify purchase? |

**MENTOR / DOMAIN INPUT:** no new answers supplied. Canon records that confidential
Profi data will not be provided, but the exact speaker/date/transcript are absent.
That clarification is an access boundary, not validation of buyer, workflow,
demand, price or product efficacy. Serghey's customer-representative capacity is
UNKNOWN. Record future input as person/role, date, exact question, answer,
validated proposition and exclusions; obtain permission for attributable quotes.

D2 cannot be raised on the basis of this hypothetical map alone where the rubric
requires interaction. A conservative D2=2 is retained: role mapping is considered, but consultation
has not been substantiated. Q1–Q5 in `open_questions.md` remain open unless separately evidenced.

## 5. D3 — Retail Packaging Transition Shadow Review

**PROPOSED EXPERIMENT, NOT EXECUTED.** Scope: one non-confidential/anonymised real
transition, one retailer or packaging organisation, two candidate options where
available, a two-week preparation/review cycle. Owner proposed: Alisa; domain
reviewer nominated by participant; integration support from Vladimir.

Participants: one packaging/sustainability user, one independent QA reviewer,
procurement/supplier evidence contact, and optional IT observer. Do not allow the
software operator alone to define the reference result.

Minimum inputs: component inventory and consistent boundaries; mass and exact
PCR per relevant component (or explicit unknown); dated source references;
thermal/microwave requirements with provenance; candidate capabilities; food/use
context and known exclusions. Optional volume/prices must be labelled hypothetical
unless permission and provenance establish otherwise. No personal or confidential
data is required for initial recruitment; an unsuitable case is declined or redacted.

Procedure:

1. Obtain participant consent and data-use scope; freeze a case and evidence version.
2. QA records the independent human assessment, evidence gaps and excluded qualification
   dimensions before viewing PackShift's output. Record time and reviewer identity.
3. Run PackShift on the same evidence; separate data-entry time from review time.
   Preserve input/output version, provenance and refusal reasons. Existing static
   fixture onboarding may need supervised preparation; do not promise an upload feature.
4. User explains each result and next action in their own words. Test comprehension
   of PUBLIC/provider, CALCULATED/VERIFIED and requirement/capability distinctions.
5. Compare disagreements with the human reference. Add explicitly labelled
   SIMULATION / QA PROBE variants for missing PCR and incompatible temperature;
   these are not additional real customer cases.
6. QA adjudicates false positives/negatives, records causes and follow-up evidence;
   no packaging purchase or use is authorised by the experiment.

| Measure | Proposed preregistered acceptance rule | Limitation |
| --- | --- | --- |
| Blocking gaps and incompatibilities | All safety-critical issues **within the modeled thermal/microwave scope** found by QA must remain blocked/unknown as appropriate; zero falsely cleared cases | Wider packaging safety remains human QA's responsibility. |
| Missing-data integrity | All deliberately withheld numeric evidence yields refusal/N/A; zero fabricated deltas | Small test set is not a population error-rate estimate. |
| Review effort | Record paired preparation/review minutes and denominator; target at least 20% lower review-assembly time as a pilot hypothesis | No current time-saving claim; one case cannot generalise. |
| Provenance comprehension | Each user correctly identifies source, verification state and unknowns for the demonstrated outputs | Record exact misunderstandings, not just satisfaction. |
| Next-action usefulness | User rates each action 1–5, with a concrete explanation; proposed median target ≥4 | Exploratory usability measure, not market validation. |
| False positives/negatives | Publish a discrepancy table and counts against the frozen reference, including unmodeled dimensions | Do not call source availability independent verification. |

Outputs: consent/data scope, anonymised case, software SHA, human reference,
timings, comparison/discrepancy log, participant feedback and signed review
conclusion. A successfully demonstrated representative retailer workflow could
support discussion of TRL 5; recruitment, representativeness and validation must
actually occur first. A written protocol alone only establishes a validation plan.

## 6. E1 — First-market hypothesis and bounded sizing

**PROPOSAL:** Romania-first discovery with grocery retail organisations that own
packaging-transition decisions, initially prepared-food/private-label packaging.
Commercial unit: organisation/workspace, not store. Romania is practical because
the challenge provides a Profi-related context (R8), actual named grocery networks
exist, and a Romanian EDIH route can be investigated. This does not prove access
to their buyers. Alternatives such as Germany may offer customers and ecosystem
depth, but no comparative acquisition-cost/access evidence was obtained; do not
claim Romania is quantitatively the largest or objectively optimal EU market.

**Observed prospect-universe construction:** From the association's member list,
select nine grocery banners relevant to the proposed discovery segment: Auchan,
Carrefour, Kaufland, Lidl, Mega Image, Metro, Penny, Profi, Selgros
([SRC-04](https://www.amrcr.ro/membri-amrcr/)). Exclude non-food chains and avoid
counting Artima/Columbus as additional banner opportunities without resolving
ownership and procurement scope. This is a named shortlist, not the Romanian TAM.

Ownership affects addressability: Ahold Delhaize reports Profi's acquisition and
its Romanian brands ([SRC-05](https://aholddelhaize.com/digitalannualreport/2025/));
Lidl and Kaufland are Schwarz retail divisions
([SRC-06](https://gruppe.schwarz/en/who-we-are)). Deduplicating just those two
known pairs yields **7 prospect-account clusters from 9 selected banners**.
This is a transparent initial planning count, not a verified count of independent
buyers: procurement may be centralised further, other ownership may change, and
some organisations may have no suitable use case or budget.

**Rough sizing logic:** start with those seven research accounts; verify local
decision rights, packaging ownership, willingness to pilot and existing systems;
only then estimate serviceable accounts. One or two recruited pilots is an
internal recruitment target, not expected conversion. Revenue TAM/SAM is UNKNOWN
because qualification rates, subscription pricing and willingness to pay are
unknown. No store multiplier, market-share percentage or invented euro TAM is used.

## 7. E2 — Competitor landscape

Capabilities are **vendor-published**, not independently tested. `Unknown` means
not established by the reviewed source, never a claim that the competitor lacks
the feature. No benchmark, quote or paid product evaluation was performed.

| Product / source | Main job and overlap | Important difference from current PackShift |
| --- | --- | --- |
| Recyda [SRC-07](https://www.recyda.com/) | Packaging data, recyclability assessment and EPR/regulatory reporting; overlaps evidence organisation and packaging sustainability review | Much broader compliance workflow; PackShift does not replace country rulesets or reporting. |
| Trayak EcoImpact-COMPASS [SRC-08](https://trayak.com/ecoimpact-compass/) | Packaging life-cycle assessment and design comparison; overlaps environmental transition assessment | LCA covers broader environmental dimensions; PackShift computes represented-component virgin-plastic deltas, not full LCA. |
| Specright [SRC-09](https://www.specright.com/sustainable-packaging/) | Specification/BOM data management and supplier collaboration; supports sustainability reporting and COMPASS integration | Enterprise specification foundation; PackShift is a narrow review prototype without comparable supplier/integration breadth. |

| Dimension | PackShift, inspected code | Recyda | COMPASS | Specright |
| --- | --- | --- | --- | --- |
| Packaging specs/data | Versioned curated JSON, not enterprise master-data system | Centralised packaging data | Packaging LCA inputs | Centralised component-level specs/BOM |
| Recyclability/compliance | No compliance determination | Published core capability | Published sustainability/recyclability platform capabilities | Published reporting/data and integrations |
| LCA | Not implemented | Not established in reviewed page | Core capability | COMPASS integration, not assumed native LCA engine |
| Recycled content | Explicit numeric input and missing-value gate | Exact PCR-analysis behaviour UNKNOWN | Exact PCR refusal behaviour UNKNOWN | Recycled-content fields published |
| Transition comparison | Deterministic per-unit delta, optional hypothetical annual/economics | Packaging assessment; exact equivalent UNKNOWN | Design/environmental comparison | Exact transition-decision equivalent UNKNOWN |
| Thermal/microwave gate | Explicit, bounded and independent of environmental delta | UNKNOWN | UNKNOWN | UNKNOWN |
| Provenance/uncertainty | Per-input provenance and distinct evidence states | Data/ruleset workflow; equivalent states UNKNOWN | Equivalent state model UNKNOWN | Auditable specifications; equivalent states UNKNOWN |
| Missing-data refusal | Explicit INSUFFICIENT_DATA/null | Equivalent refusal semantics UNKNOWN | Equivalent refusal semantics UNKNOWN | Completeness indicators; identical refusal UNKNOWN |
| Retail workflow | Hypothesis; no real retailer validation established | Vendor positioning, not tested here | Vendor positioning, not tested here | Brands/retailers/CPGs addressed by vendor |
| Availability/price | Local prototype; no commercial price | Demo route; reviewed page supplies no validated quote | Commercial product; quote UNKNOWN | Commercial product; quote UNKNOWN |

**Differentiation, not superiority:** PackShift currently makes a narrow review
workflow explicit: source provenance, uncertain evidence, environmental arithmetic
and bounded operational eligibility remain separate. This may be useful as a
review layer alongside broader tools. Its commercial defensibility, switching
advantage and uniqueness relative to untested competitor features remain UNKNOWN.

## 8. E3 — Business model hypothesis for EU scale

**HYPOTHESIS — NOT VALIDATED WILLINGNESS TO PAY.** Primary buyer proposed:
retailer's packaging/sustainability budget owner jointly sponsoring QA/procurement.
The likely user is the specialist assembling repeatable transition reviews; the
economic sponsor must value review effort, traceability or prevented rework.
Budget ownership is not established. Packaging consultants/SME suppliers are a
secondary pilot segment if retailer access fails, not assumed equivalent customers.

Model: a paid, fixed-scope pilot for one organisation and a small agreed case set,
followed only if successful by an annual organisation/workspace subscription with
user access and portfolio limits. Quote onboarding/integration separately. Do not
charge per store by default. No numerical price or validated revenue forecast is
asserted; enterprise SaaS is a proposed productisation step, not implemented today.

Acquisition: founder-led B2B interviews; a domain introduction through the
challenge if consented; EDIH/industry networking; a pilot invitation based on the
shadow-review protocol. None is an existing distribution agreement. Proposed
pricing validation: interview at least five qualified budget owners, ask about
their current substitute, buying authority, procurement cycle and actual pilot
budget; test a written scope/quote and record refusals as well as commitments.
Interest without budget commitment does not establish willingness to pay.

Scale with limited changes: arithmetic, provenance semantics, constraint-state
separation and review protocol. Productisation still needs tenancy, access control,
managed evidence ingestion, support and production operations; no reusable SaaS
platform is claimed to exist. Localise language, applicable rules, supplier
evidence, retailer process, integrations, contracts and security procurement.

Economics to validate: acquisition/onboarding effort, evidence-curation/support
cost, hosting, expert QA escalation and integration maintenance. Low arithmetic
cost does not establish low total cost-to-serve. The current hypothetical package
cost calculator is not evidence of the software business model's unit economics.

## 9. E4 — Market-entry roadmap, with two separate boundaries

This is a scoped research roadmap, not legal clearance or packaging certification.

| Requirement | Applies to | Relevance/current status | Proposed next step / effort |
| --- | --- | --- | --- |
| GDPR [SRC-13](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations_en) | Software operations handling personal data | Core material numbers are not necessarily personal data; contact details, accounts, free text and logs can be. No GDPR compliance audit established | Inventory data and roles; lawful basis, notices, processor agreements where relevant, retention/access/incident controls; MEDIUM. |
| Cybersecurity and production operations | Software | Local demo, no production hosting/security acceptance established | Threat model, authentication/authorisation, secrets, TLS, tenant isolation if SaaS, backup/recovery, dependency/update management and incident owner; HIGH. This is a proposed engineering gate, not a claim all items are legally mandatory in every deployment. |
| CRA scope [SRC-14](https://digital-strategy.ec.europa.eu/en/library/cyber-resilience-act-implementation-frequently-asked-questions) | Potential commercial software/product distribution | EU framework covers products with digital elements; PackShift's commercial delivery model is not fixed | Determine exact distribution/remote-processing scope, applicable dates and duties before release; MEDIUM applicability review, implementation effort UNKNOWN. Do not assume blanket exemption or current compliance. |
| Enterprise procurement/contracts | Software vendor/customer | No customer contract, SLA or vendor qualification evidenced | Data-use permissions, support scope, liability/claims boundary, security questionnaire and controller/processor responsibilities; MEDIUM. |
| CE applicability [SRC-15](https://europa.eu/youreurope/business/product-rules-compliance/general-product-compliance/ce-marking/index_en.htm) | Only products covered by applicable harmonised rules | No legal basis determined for a PackShift CE claim | Scope relevant legislation for the delivered product, including applicable software rules; do not affix/claim CE simply because customers are in the EU; LOW initial triage, further work UNKNOWN. |
| PPWR Regulation (EU) 2025/40 [SRC-10](https://environment.ec.europa.eu/news/new-eu-rules-packaging-enter-application-2026-08-11_en) | Packaging decisions/economic operators | Rules began phased application on 12 August 2026; not all future recyclability/recycled-content provisions became due that day. PackShift does not certify compliance | Compliance specialist maps article, material/use, operator role, exceptions and dates to required evidence; HIGH. Maintain versioned checklist outside runtime unless separately authorised. |
| Food-contact framework: 1935/2004, plastics 10/2011, GMP 2023/2006, relevant amendments [SRC-11](https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials/legislation_en) | Packaging qualification | Software thermal/microwave checks do not establish migration, shelf life or food-contact compliance | Obtain applicable supplier declarations/supporting documents and competent QA/lab review for actual food/time/temperature; HIGH. |
| Recycled food-contact plastics: 2022/1616 [SRC-12](https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials/plastic-recycling_en) | Packaging/recycling supply chain | PCR percentage alone is insufficient qualification evidence | Verify applicable process/material provenance and compliance documentation with supplier/QA; HIGH. |
| Retailer/supplier qualification | Real packaging change | No production-line, seal/barrier, transport or shelf-life validation established | Retailer-approved trials and release process beyond software output; HIGH. |

PPWR alignment is a problem/roadmap connection, not “PackShift certified under
PPWR.” Environmental benefit does not waive these gates. No unsupported account
of legal costs, certification, deadlines for every article or legal applicability
to an unspecified commercial delivery model is supplied.

## 10. E5 — Stage-matched support and 12-month pathway

TRL 4 alone does not establish eligibility. Legal entity, establishment country,
IP rights, eligible prior projects, call topic, consortium and co-financing remain
to be checked. No application, eligibility decision or funding award exists here.

| Instrument | Stage/relevance and support | Fit now | Eligibility caveat / source |
| --- | --- | --- | --- |
| EDIH services | Digital maturity, test-before-invest, skills and investment navigation | POSSIBLE; first enquiry recommended | Specific hub must accept entity/region/sector and non-AI use; no automatic free entitlement [SRC-02]. |
| Horizon Europe, especially Cluster 6 | Collaborative R&I around food systems, circularity and digitalisation | POSSIBLE as topic-matched partner | Programme theme is not an eligible live call; identify an actual topic and consortium/TRL requirements with NCP [SRC-16](https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe/cluster-6-food-bioeconomy-natural-resources-agriculture-and-environment_en). |
| Digital Europe | Deployment/adoption capacity; EDIH route more immediate than direct grant | POSSIBLE via services; direct grant UNKNOWN | Topic, entity/geography, partnership and co-financing vary; thematic fit is not award eligibility [SRC-01]. |
| EIC Pathfinder | Early high-risk scientific/technological breakthrough, typically TRL 1–4 | NO for the currently evidenced proposition | Conventional deterministic review software does not evidence the required science-to-technology breakthrough; low TRL alone is insufficient [SRC-17](https://eic.ec.europa.eu/eic-funding-opportunities/eic-pathfinder_en). |
| EIC Transition | Develops eligible prior research results from starting TRL 3/4 towards validation | NO demonstrated eligible route now | Requires an eligible linked research project/result and other conditions; no such origin or rights are evidenced [SRC-18](https://eic.ec.europa.eu/eic-frequently-asked-questions/faqs-eic-transition_en). |
| EIC Accelerator | Development/scale-up; grant innovation activities TRL 6–8 | NO as an immediate TRL-4 application; reconsider later | Maturity, innovation/market-disruption case, eligible applicant and scale ambition must be established [SRC-19](https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en). |

**PROPOSED pathway starting September 2026:**

- Months 0–3: confirm legal entity/IP and coach rubric; interview users/budget
  owners; ask EDIH for service eligibility; recruit and run the shadow review.
  Exit evidence: named participants, real case, discrepancy log and buyer feedback.
- Months 3–6: if the shadow review passes, agree a relevant-environment pilot
  scope and production/security boundary; measure repeated workflow outcomes.
  Exit evidence: participant-approved pilot results and documented TRL reassessment,
  not an automatic TRL upgrade.
- Months 6–12: use results and NCP/EDIH advice to select an **actually eligible**
  national/collaborative or DIGITAL/Horizon opportunity; verify then-current call
  text, deadlines and financing. Pursue paid pilot/subscription validation in
  parallel. Stop grant preparation if eligibility or evidence fails.

No grant timeline or future call availability is promised. This is a concrete
growth plan; it is not completed EU programme participation.

## 11. External source ledger

All URLs below were opened successfully via web retrieval on **2026-09-26**.
Publication/update date is recorded only where clearly visible; `n/d` means not
established, not that the page is new. Page access is not independent verification
of every vendor claim. The ledger has **20 primary sources: 14 EU official pages,
5 company publications and 1 industry-association page**.

| SRC-ID | Claim supported | Organisation / page title and URL | Published/updated | Access date | Authority | Limitations |
| --- | --- | --- | --- | --- | --- | --- |
| SRC-01 | DIGITAL capacity and deployment route | EC DG CONNECT — [The Digital Europe Programme](https://digital-strategy.ec.europa.eu/en/activities/digital-programme) | Updated 2026-06-23 | 2026-09-26 | EU official | Not a PackShift eligibility decision or specific call. |
| SRC-02 | Named hub and services | EDIH network — [The European Digital Innovation Hub in Transilvania: About](https://european-digital-innovation-hubs.ec.europa.eu/edih-catalogue/european-digital-innovation-hub-transilvania-website/about) | n/d | 2026-09-26 | EU official catalogue / hub description | Service capacity, SME/geography/sector eligibility and availability need confirmation. |
| SRC-03 | TEF AI/robotics scope | EC — [Sectorial AI Testing and Experimentation Facilities](https://digital-strategy.ec.europa.eu/en/policies/testing-and-experimentation-facilities) | n/d | 2026-09-26 | EU official | No demonstrated non-AI PackShift fit. |
| SRC-04 | Named Romanian retail prospects | AMRCR — [Membri AMRCR](https://www.amrcr.ro/membri-amrcr/) | n/d | 2026-09-26 | Primary industry association | Membership is not total market, ownership map, customer demand or independent budget count. |
| SRC-05 | Profi ownership, Romanian group context | Ahold Delhaize — [Annual Report 2025](https://aholddelhaize.com/digitalannualreport/2025/) | Reporting year 2025; exact publication date not recorded | 2026-09-26 | Primary company report | Ownership does not establish joint procurement/budget. |
| SRC-06 | Lidl/Kaufland common group | Schwarz — [Who We Are](https://gruppe.schwarz/en/who-we-are) | n/d | 2026-09-26 | Primary company | Does not prove a single software buyer. |
| SRC-07 | Recyda capability positioning | Recyda — [Packaging Sustainability & Compliance Software](https://www.recyda.com/) | n/d | 2026-09-26 | Primary vendor | Self-description; not tested, no validated price. |
| SRC-08 | COMPASS LCA positioning | Trayak — [EcoImpact-COMPASS LCA](https://trayak.com/ecoimpact-compass/) | n/d | 2026-09-26 | Primary vendor | No independent feature/performance comparison. |
| SRC-09 | Specright specs and integrations | Specright — [Driving Sustainable Packaging Initiatives](https://www.specright.com/sustainable-packaging/) | n/d | 2026-09-26 | Primary vendor | Completeness indicators are not proof of PackShift-equivalent refusal semantics. |
| SRC-10 | PPWR phased application | EC Environment — [New EU rules on packaging enter into application](https://environment.ec.europa.eu/news/new-eu-rules-packaging-enter-application-2026-08-11_en) | 2026-08-11 | 2026-09-26 | EU official | Overview, not a complete article-by-article legal assessment. |
| SRC-11 | Food-contact laws and amendments | EC Food Safety — [Legislation](https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials/legislation_en) | n/d | 2026-09-26 | EU official | Case/material-specific qualification remains required. |
| SRC-12 | Recycled-plastic food-contact framework | EC Food Safety — [Plastic Recycling](https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials/plastic-recycling_en) | n/d | 2026-09-26 | EU official | Does not establish compliance of selected articles. |
| SRC-13 | GDPR applicability topics | EC — [Information for business and organisations](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations_en) | n/d | 2026-09-26 | EU official | PackShift's future data map/legal roles not assessed. |
| SRC-14 | CRA scope review needed | EC — [Cyber Resilience Act implementation: FAQs](https://digital-strategy.ec.europa.eu/en/library/cyber-resilience-act-implementation-frequently-asked-questions) | Published 2025-12-03; updated 2026-09-04 | 2026-09-26 | EU official | Landing-page scope only; no claim of complete FAQ/legal applicability review. |
| SRC-15 | CE requires applicable legislation | Your Europe — [CE marking](https://europa.eu/youreurope/business/product-rules-compliance/general-product-compliance/ce-marking/index_en.htm) | n/d | 2026-09-26 | EU official | Not a determination of PackShift's exact future product classification. |
| SRC-16 | Horizon Cluster 6 thematic route | EC Research — [Cluster 6](https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe/cluster-6-food-bioeconomy-natural-resources-agriculture-and-environment_en) | n/d | 2026-09-26 | EU official | No matching live call/consortium eligibility established. |
| SRC-17 | Pathfinder stage and breakthrough requirement | EIC — [EIC Pathfinder](https://eic.ec.europa.eu/eic-funding-opportunities/eic-pathfinder_en) | 2026 programme information; page update n/d | 2026-09-26 | EU official | TRL overlap alone does not qualify. |
| SRC-18 | Transition linked-project and stage gates | EIC — [FAQs: EIC Transition](https://eic.ec.europa.eu/eic-frequently-asked-questions/faqs-eic-transition_en) | Includes WP2026 conditions; update n/d | 2026-09-26 | EU official | No eligible prior project/IP basis evidenced. |
| SRC-19 | Accelerator stage and applicant context | EIC — [EIC Accelerator](https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en) | 2026 programme information; update n/d | 2026-09-26 | EU official | No maturity or funding eligibility decision for PackShift. |

| SRC-20 | Named Green Deal / sector-policy mapping | European Parliament — [The Farm to Fork Strategy](https://www.europarl.europa.eu/factsheets/en/sheet/293547/the) | 2025-10 | 2026-09-26 | EU official | Policy objectives and historical initiatives, not proof all proposed measures became law or that PackShift delivers measured impact. |

## 12. Additional rubric evidence and boundaries

**A1 / D1 policy mapping:** Farm to Fork is part of the Green Deal and names
sustainable food processing/distribution, including retail and sustainable
packaging (SRC-20). PackShift's resource-efficiency proposition is represented-
component virgin-plastic reduction, with independent QA gates. This concretely
maps its existing product framing to that priority; it does not demonstrate
reduced food waste or an achieved EU-wide environmental outcome. A1=3, D1=3.

**A4 risk register / proposed review policy:** reducing virgin plastic can shift
impacts to production energy, transport or end-of-life; recycled material can
introduce qualification needs; an unsuitable package can cause food loss; cheap
review can encourage more consumption (rebound). The existing independent
thermal/microwave gate mitigates modeled incompatibility, not all these effects.
Require competent packaging QA and lifecycle/end-of-life review before adoption,
and monitor absolute material use rather than percentages alone. This documented
risk policy plus an existing bounded mitigation supports 3, not certified DNSH.

**B3:** malformed inputs and unavailable/invalid evidence are handled through
typed validation and fail-closed loading (R3). These are actual narrow controls,
but are not a complete security threat model, authentication or secure hosting.
Score stays 2; proposed production controls in section 9 are not implemented.

**C1–C4:** the core needs packaging masses, PCR fractions, constraints and optional
numeric volume/cost, not identities or special-category data. Nevertheless public
source attribution/free text can contain names; server access logs can contain
IP/URL information, and future interview notes contain personal data. Complete
field/log inventory, retention and controller/processor mapping are not evidenced.
Local processing and no evaluation persistence are real choices, but a documented
privacy-driven design rationale and complete default settings have not been
verified. No claim that “no accounts” means “no GDPR” is made.

Proposed pilot data boundary: use redacted technical cases, no sensitive personal
data, minimum recruitment contact details, a participant notice and agreed
recording/attribution scope. Assign a responsible data owner to establish purpose,
lawful basis, access and deletion before collecting contacts/feedback. Consent to
participate is not automatically the lawful basis for every processing purpose.
Screen any future high-risk processing for DPIA requirements (SRC-13); no DPIA
determination or complete basis-per-purpose schedule has been performed. These
are concrete considerations, but do not satisfy all C1–C4 level-3 descriptors.
Conservative proposed scores: 2 each.

**D3:** section 5 names a partner type, procedure and measures. Planning estimate,
not a booked allocation: Alisa 2 person-days, independent QA 1 day, packaging
participant 0.5 day, procurement/evidence contact 0.5 day, technical support
0.5 day over two weeks. Before recruitment Vladimir must confirm availability,
data permission and any expert costs. With no partner/resource commitment,
retain 2 against the descriptor's “resourced” requirement; do not claim a pilot
already exists.

**E2:** three real relevant products are sourced, but reviewed pages do not fully
establish all three are already selling in the EU, nor a customer-tested reason
to switch. Retain 2 conservatively against the coach prompt. This is an evidence
gap, not a claim that those vendors do not operate in Europe.

## 13. Scorecard reconciliation & independent conservative reassessment

### INDEPENDENT CONSERVATIVE REASSESSMENT
> This is not a replacement for the scores already entered in the mentor/team workbook.

This reassessment applies a stricter evidence interpretation than the already populated
coach workbook, evaluating criteria from verified repository evidence rather than inheriting
unsupported workbook scores. This provides useful adversarial evidence for Project Brain.

The supplied scores are transcribed, not overwritten. **Before** is a conservative
independent assessment of evidence in the inspected repository before this packet,
not an assertion about undocumented team knowledge. **After** includes concrete
plans and source mapping in this document where the actual rubric permits them.
A 1 means awareness without a substantiated integrated treatment; a 2 means partial
consideration; a 3 requires the criterion-specific integrated design/plan. No 4 is
awarded merely because public sources or a working demo exist. Supporting coach DOCX
reconciliation found no material framework conflict; confidence is in the proposed
score, not external approval.

| ID | Criterion | Supplied XLSX | Before | Proposed after | Evidence / APR improvement | Remaining gap | Confidence |
| --- | --- | ---: | ---: | ---: | --- | --- | --- |
| A1 | Green Deal problem fit | 4 | 3 | 3 | R1/R8, section 12/SRC-20: virgin-resource reduction already frames product; clearer policy link | No measured customer/environment outcome for 4 | MEDIUM |
| A2 | Eco-design & circularity | 3 | 3 | 3 | R1/R3: component mass/PCR and resource-efficiency comparison shape design; no numeric uplift | Broader lifecycle, repair/reuse/end-of-life not evaluated | MEDIUM |
| A3 | Footprint of the tech itself | 2 | 2 | 3 | Section 2: drivers tied to implemented deterministic/stateless choices; YES | No measured footprint or production-hosting analysis | HIGH |
| A4 | Do no significant harm | 3 | 2 | 3 | Section 12: explicit side-effect list and bounded implemented gate; YES | Wider lifecycle and rebound need pilot assessment | MEDIUM |
| B1 | Digital Europe capacity fit | 2 | 1 | 3 | Sections 3/10, SRC-01: named capacity now shapes roadmap; YES | No programme participation/acceptance | MEDIUM |
| B2 | Trustworthy AI & AI Act awareness | N/A | N/A | N/A | R3 has no AI; Read Me permits N/A, excluded from both methods | Reassess if AI added | HIGH |
| B3 | Cybersecurity by design | 2 | 2 | 2 | R3/section 12: narrow validation/fail-closed controls; no implemented uplift | Articulated security threat model and production controls | HIGH |
| B4 | Use of EU digital infrastructure | 2 | 1 | 3 | Section 3, SRC-02: named hub + exact test idea meets descriptor; YES | Eligibility and contact unknown; no engagement claimed | HIGH |
| C1 | Personal data mapping & minimisation | 4 | 2 | 2 | R3/section 12: low-data core and identified residuals; no uplift | Complete inventory including logs/free text | MEDIUM |
| C2 | Lawful basis & consent | 3 | 1 | 2 | Sections 9/12: purpose and pilot-data review now specified; YES | Correct lawful basis for every purpose not established | MEDIUM |
| C3 | Privacy by design & by default | 3 | 2 | 2 | R3 local/stateless choices; no new implementation | Two privacy-driven controls and defaults need documented verification | MEDIUM |
| C4 | Experimentation ethics | 3 | 2 | 2 | Sections 5/12 improve ethical pilot planning; public/synthetic demo | Participant process, complete data screen/DPIA applicability unverified | MEDIUM |
| D1 | Sector policy priority fit | 4 | 2 | 3 | Section 12/SRC-20: explicit Farm to Fork retail/packaging mapping; YES | Sector impact not externally validated | MEDIUM |
| D2 | Stakeholder & value-chain fit | 2 | 2 | 2 | Section 4 map improves specificity, not consultation evidence | Real completed/scheduled conversation with evidence | HIGH |
| D3 | Sector validation route | 2 | 2 | 2 | Sections 5/12: bounded protocol and effort estimate, not booked resources | Partner and resource commitment | MEDIUM |
| D4 | Sector evidence & data standards | 3 | 3 | 3 | R1–R3: provenance, evidence states, requirements and refusal designed into prototype | Qualification breadth, real-sector data and reviewer verification | MEDIUM |
| E1 | EU market definition | 2 | 1 | 3 | Section 6/SRC-04–06: Romania, company unit and bounded 7-account sizing; YES | Shortlist is not full TAM; actual decision rights/access unknown | MEDIUM |
| E2 | EU value proposition & competition | 2 | 1 | 2 | Section 7: three real competitors and narrow differences; YES | Complete evidence of EU sales and buyer switching rationale | MEDIUM |
| E3 | Business model for EU scale | 1 | 1 | 3 | Section 8: buyer, paid pilot, annual workspace unit, channel/localisation; YES at plan level | Pricing, demand and willingness to pay unvalidated | MEDIUM |
| E4 | Market-entry requirements & costs | 2 | 1 | 3 | Section 9: separate software/packaging roadmap with rough effort; YES | Delivery-specific legal review and cost estimates | MEDIUM |
| E5 | EU funding & growth pathway | 2 | 1 | 3 | Section 10: stage-matched exclusions, caveats, 12-month path; YES | Entity/IP/eligible live call and partner unknown | MEDIUM |

### Both aggregation methods — user-approved resolution

On 2026-09-26 the user requested “сделай и так и так” (calculate both).
The methodological stop is resolved. Preserve the coach formula as the named
**EU Alignment Index** and label the second output **applicable-criterion average**.

The workbook first rounds each category mean to two decimals
(`Team Scorecard!C37:C41`), then C42 computes
`=IFERROR(ROUND(AVERAGE(C37:C41),2),"")`.
The supplementary method sums all numeric criterion scores and divides by 20;
B2 is text N/A, not zero. Category sizes are A=4, B=3, C=4, D=4, E=5.

| Measure | Supplied workbook scores | Independently assessed before | Proposed after |
| --- | ---: | ---: | ---: |
| A mean | 3.00 | 2.50 | 3.00 |
| B mean, excluding B2 | 2.00 | 1.33 | 2.67 |
| C mean | 3.25 | 1.75 | 2.00 |
| D mean | 2.75 | 2.25 | 2.50 |
| E mean | 1.80 | 1.00 | 2.80 |
| Coach EU Alignment Index, mean of rounded category means | **2.56** | **1.77** | **2.59** |
| Applicable-criterion average | **2.55** | **1.75** | **2.60** |
| Numeric score sum / count | 51 / 20 | 35 / 20 | 52 / 20 |

After-score coach calculation: (3.00 + 2.67 + 2.00 + 2.50 + 2.80) / 5
= 2.594, rounded to **2.59**. Supplementary: 52 / 20 = **2.60**.
The two outcomes need not move in the same direction relative to the supplied
baseline because category weights differ. Both proposed results are in the
workbook's **Aligned** band; neither reaches 3.10–3.15. Numerical improvement from
the independent before assessment reflects documented evidence/planning, not
new runtime capabilities, customers, environmental savings or coach endorsement.

## Baseline-preserving Project Brain planning view

This is NOT another independent rescore. It begins from the scores already present
in the supplied coach/team workbook and assesses the impact of accepting only those
candidate uplifts for which APR-EU-01 provides credible rubric-level-3 evidence, while
preserving all other supplied workbook entries.

### SUPPLIED MENTOR/TEAM WORKBOOK STATE

These scores represent the baseline entered in the supplied coach/team workbook
(`EU Alignment Scorecard GigaHack2026.xlsx`). They are recorded here as the team/coach
starting baseline, NOT as independently verified facts:

| ID | Supplied score |
|---|---:|
| A1 | 4 |
| A2 | 3 |
| A3 | 2 |
| A4 | 3 |
| B1 | 2 |
| B2 | N/A |
| B3 | 2 |
| B4 | 2 |
| C1 | 4 |
| C2 | 3 |
| C3 | 3 |
| C4 | 3 |
| D1 | 4 |
| D2 | 2 |
| D3 | 2 |
| D4 | 3 |
| E1 | 2 |
| E2 | 2 |
| E3 | 1 |
| E4 | 2 |
| E5 | 2 |

Workbook category baseline:
```text
A = 3.00
B = 2.00
C = 3.25
D = 2.75
E = 1.80
EU Alignment Index = 2.56
```
(Applicable-criterion average: 51 / 20 = 2.55).

### Candidate uplifts already substantiated by APR-EU-01

The following table presents criteria for which APR-EU-01 now provides a credible level-3
argument against the coach rubric.

Candidate uplifts:
```text
A3: 2 → 3
B1: 2 → 3
B4: 2 → 3
E1: 2 → 3
E3: 1 → 3
E4: 2 → 3
E5: 2 → 3
```

*Important planning constraints:*
- Do NOT promote E2 yet (requires customer-tested switching rationale and verified EU competitor presence).
- Do NOT promote D2 or D3 yet (requires real/scheduled attributable stakeholder conversation and confirmed partner/resource commitment).
- Do NOT promote B3 yet (requires articulated threat model and verified implemented controls).
- Do NOT change supplied C scores in this planning view (preserves supplied workbook baseline C = 3.25).

| ID | Criterion | Workbook baseline | Proposed score | Evidence from APR-EU-01 | Why rubric level 3 may be defensible | Remaining limitation | Confidence |
|---|---|---:|---:|---|---|---|---|
| A3 | Footprint of the tech itself | 2 | 3 | Section 2: Footprint drivers (compute, storage, network) identified and directly mitigated by deterministic in-memory startup snapshot, arithmetic-only evaluation services, no GPU/ML inference, and no evaluation persistence. | Rubric level 3 requires identifying technology footprint drivers and having concrete architectural mitigations designed into the system. | Empirical joules/request and cloud carbon audits not yet measured for production hosting. | HIGH |
| B1 | Digital Europe capacity fit | 2 | 3 | Section 3, Section 10, SRC-01: PackShift maps directly to Digital Europe Programme objective of deploying digital decision support and digital capacity for business transformation, digitising the packaging transition review workflow. | Explicit alignment with Digital Europe deployment capacity objectives, structured around realistic business process digitisation rather than unsupported AI hype. | No formal programme application, awarded grant, or completed institutional adoption. | MEDIUM |
| B4 | Use of EU digital infrastructure | 2 | 3 | Section 3, SRC-02: Named facility identified (European Digital Innovation Hub in Transilvania, Romania) with concrete test idea (test-before-invest shadow review intake brief for packaging transition workflow). Excludes mismatched facilities (AgrifoodTEF AI/robotics, EuroHPC). | Rubric level 3 explicitly accepts a named facility and concrete test idea. | Team SoS legal-entity/geographic eligibility, hub availability, and formal contact not yet completed; no outreach has taken place. | HIGH |
| E1 | EU market definition | 2 | 3 | Section 6, SRC-04–06: Romania-first discovery segment, grocery retail organisation unit, and initial bounded prospect universe of 7 account clusters from 9 AMRCR member banners with group ownership deduplication (Ahold Delhaize / Profi, Schwarz / Lidl & Kaufland). | Specific target country, customer unit defined, and bottom-up prospect sizing without fabricated macro TAM multipliers. | Account shortlist is not a full TAM; buyer decision rights, local packaging ownership, and actual access are unvalidated. | MEDIUM |
| E3 | Business model for EU scale | 1 | 3 | Section 8: Formulates structured B2B business model hypothesis for EU scale: buyer profile (sustainability/packaging sponsor with QA/procurement gatekeepers), paid fixed-scope pilot transitioning to annual workspace subscription, clear acquisition channels, and key unit-economics drivers to validate. | Rubric level 3 requires a defined business model hypothesis, customer unit, and pricing/scaling logic. | Commercial willingness to pay, price points, and actual sales cycles remain unvalidated hypotheses. | MEDIUM |
| E4 | Market-entry requirements & costs | 2 | 3 | Section 9: 8-dimension market-entry roadmap with two clear boundaries: software operational requirements (GDPR, cybersecurity/operations, CRA scoping, procurement contracts, CE non-applicability) strictly separated from physical packaging qualification requirements (PPWR 2025/40, food contact 1935/2004 & 10/2011, recycled plastics 2022/1616, retailer trials), with rough effort levels. | Explicit separation of software vendor duties vs packaging compliance, preventing false claims while mapping required entry gates. | Commercial delivery model not yet frozen; detailed legal counsel and exact article-by-article compliance costs not established. | MEDIUM |
| E5 | EU funding & growth pathway | 2 | 3 | Section 10: Systematically reviews 6 EU funding instruments (EDIH, Horizon Europe Cluster 6, Digital Europe, EIC Pathfinder, EIC Transition, EIC Accelerator), providing evidence-grounded exclusions (e.g. Pathfinder/Transition not fitting deterministic TRL 4 software) and presents a concrete 12-month phased pathway. | Rubric level 3 requires stage-matched instrument identification, realistic eligibility boundaries, and a 12-month roadmap. | Legal entity, IP ownership, live call matching, and consortium partnership remain unconfirmed. | MEDIUM |

### Baseline-preserving projection calculation

If the mentor accepts the candidate uplifts above while all other supplied workbook scores remain unchanged:

- **Category A:** (4 + 3 + 3 + 3) / 4 = 13 / 4 = **3.25** (A3 uplifted from 2 to 3)
- **Category B:** (3 + 2 + 3) / 3 = 8 / 3 = **2.67** (B1, B4 uplifted from 2 to 3; B2 excluded as N/A; B3 remains 2)
- **Category C:** (4 + 3 + 3 + 3) / 4 = 13 / 4 = **3.25** (supplied workbook scores preserved unchanged)
- **Category D:** (4 + 2 + 2 + 3) / 4 = 11 / 4 = **2.75** (supplied workbook scores preserved unchanged)
- **Category E:** (3 + 2 + 3 + 3 + 3) / 5 = 14 / 5 = **2.80** (E1, E3, E4, E5 uplifted; E2 remains 2)

Coach-formula projection:
```text
(3.25 + 2.67 + 3.25 + 2.75 + 2.80) / 5
= 2.944
≈ 2.94
```

```text
PROJECT-BRAIN CONDITIONAL PROJECTION: ≈ 2.94
NOT AN ACHIEVED OR MENTOR-ENDORSED SCORE
```

**Why this differs from Alisa's 2.59:**
- **2.59** = Independent conservative rescore of everything: evaluates all criteria strictly against current repository evidence, setting unevidenced workbook assumptions (such as C1–C4 and D1) to conservative baselines (2s).
- **2.94** = Planning projection preserving the already supplied coach/team baseline and applying only newly evidenced candidate uplifts.

Both are useful, but answer different questions.

## Remaining path to the 3.10–3.15 target

To advance from the conditional APR uplift projection (≈2.94) to the target band of **3.10–3.15**, the team must resolve four key remaining criteria. These criteria cannot be promoted based on desk research alone and require specific external interaction or engineering implementation.

### D2 — Stakeholder & value-chain fit

Current supplied:
```text
2
```

Target:
```text
3
```

Rubric requires:
- value chain mapped;
- at least one real conversation completed OR scheduled;
- evidence of that interaction.

APR-EU-01 already provides the value-chain map (Section 4).

Missing:
```text
real/scheduled attributable conversation
```

Examples of candidate participants:
- Serghey if his domain role genuinely supports the point;
- retailer packaging/sustainability specialist;
- QA/procurement expert;
- packaging-sector mentor.

Record:
- person;
- role;
- date;
- question;
- answer;
- what it validates;
- what it does NOT validate.

Do not call mentor input customer validation unless justified.

### D3 — Sector validation route

Current supplied:
```text
2
```

Target:
```text
3
```

APR-EU-01 already provides a strong shadow-review protocol (Section 5).

Missing for rubric level 3:
```text
specific + resourced + sector-credible next step
```

Required uplift evidence:
- named partner type;
- confirmed responsible team owner;
- confirmed internal resource availability;
- realistic next-step timing;
- preferably a candidate external participant / introduction path.

Do not pretend the pilot already ran.

### E2 — EU value proposition & competition

Current supplied:
```text
2
```

Target:
```text
3
```

APR-EU-01 already has:
- Recyda;
- Trayak EcoImpact-COMPASS;
- Specright.

Missing:
1. stronger evidence that each relevant competitor actually operates/sells into EU customers/market;
2. buyer-relevant reason to choose PackShift;
3. clear differentiation without claiming overall superiority.

Safe differentiation direction:
```text
PackShift focuses on an evidence-aware packaging transition review:
provenance + missing-data refusal + environmental arithmetic +
operational eligibility kept separate.
```

Do not claim competitors lack a capability unless verified.

### B3 — Cybersecurity by design

Current supplied:
```text
2
```

Target:
```text
3
```

Rubric explicitly requires:
```text
threat model articulated
+
2–3 basic controls actually implemented
```

Existing candidate controls include:
- strict typed input validation;
- fail-closed evidence loading;
- no persistent evaluation DB;
- bounded local runtime surface.

But do NOT automatically count architectural absence as a security control unless it directly mitigates an articulated threat.

A future fix should define approximately:
```text
Threat → implemented mitigation → verification evidence
```

No auth/TLS/production-security claims unless actually implemented.

---

### Conditional target projections

| Scenario | Candidate criteria uplifts | Category Means (A, B, C, D, E) | Projected Coach Index | Status |
|---|---|---|---:|---|
| **Supplied baseline** | Baseline workbook state | A=3.00, B=2.00, C=3.25, D=2.75, E=1.80 | **2.56** | Supplied mentor/team workbook state |
| **Independent reassessment** | Conservative rescore of all 20 criteria | A=3.00, B=2.67, C=2.00, D=2.50, E=2.80 | **2.59** | INDEPENDENT CONSERVATIVE REASSESSMENT |
| **Current APR-EU-01 projection** | A3, B1, B4, E1, E3, E4, E5 (all 2 → 3, E3 1 → 3) | A=3.25, B=2.67, C=3.25, D=2.75, E=2.80 | **≈ 2.94** | Conditional Project Brain projection |
| **Projection A** | Current APR uplifts + **D2 (2→3), D3 (2→3), E2 (2→3)** | A=3.25, B=2.67, C=3.25, D=3.25, E=3.00 | **≈ 3.08** | **CONDITIONAL — NOT ACHIEVED** |
| **Projection B** | Projection A + **B3 (2→3)** | A=3.25, B=3.00, C=3.25, D=3.25, E=3.00 | **≈ 3.15** | **TARGET PROJECTION ≈ 3.15 — CONDITIONAL — NOT ACHIEVED** |

#### Projection A Calculation
If:
```text
D2 2 → 3
D3 2 → 3
E2 2 → 3
```
in addition to the already proposed APR uplifts:

Category means become approximately:
```text
A = 3.25
B = 2.67
C = 3.25
D = 3.25
E = 3.00
```

Coach-formula projection:
```text
(3.25 + 2.67 + 3.25 + 3.25 + 3.00) / 5 = 15.42 / 5 = 3.084 ≈ 3.08
```

Label:
```text
CONDITIONAL — NOT ACHIEVED
```

#### Projection B Calculation (Target 3.15)
If B3 also becomes:
```text
B3 2 → 3
```
then:
```text
B = 3.00
```
and projected overall coach index becomes:
```text
(3.25 + 3.00 + 3.25 + 3.25 + 3.00) / 5
= 15.75 / 5
= 3.15
```

Label:
```text
TARGET PROJECTION ≈ 3.15
CONDITIONAL — NOT ACHIEVED
```

## Handoff for Project Brain review

**FULL COACH-SOURCE RECONCILIATION COMPLETE — ready for Project Brain review.**

The supporting coach document (`EU_Frameworks_Supporting_Document.docx`) has been inspected from the Serghey Drive folder and reconciled with the 21-criterion framework mapping:
```text
SUPPORTING DOCX RECONCILIATION: NO MATERIAL CONFLICT
```

Four distinct index perspectives are reported:
```text
Supplied workbook EU Alignment Index: 2.56

Independent conservative APR-EU-01 reassessment:
2.59

Baseline-preserving Project Brain projection
if current APR candidate uplifts are accepted:
≈2.94

Target:
3.10–3.15 — NOT YET ACHIEVED
```

Exact remaining blocking criteria to reach target 3.10–3.15:
- **D2:** Stakeholder & value-chain fit (requires real or scheduled attributable conversation).
- **D3:** Sector validation route (requires confirmed team owner, resourcing, and candidate partner commitment).
- **E2:** EU value proposition & competition (requires verified EU competitor presence and buyer-relevant switching rationale).
- **B3:** Cybersecurity by design (requires articulated threat model mapped to verified implemented controls).

Base inspected / HEAD: `29f0b8b1b237a6812b75ba2affd8b246d6f9399b`.
Changed file: `docs/review/APR-EU-01-eu-alignment-market-validation.md` only.

Candidate uplifts substantiated by APR-EU-01: A3, B1, B4, E1, E3, E4, E5.
Criteria held at baseline: A1, A2, A4, B3, C1, C2, C3, C4, D1, D2, D3, D4, E2. B2 remains N/A.

External ledger: **20 primary sources, 14 EU official**, 5 company and 1 association.
All ledger URLs retrieved during this task. Verification: read-only code/QA/source
inspection; all arithmetic methods independently verified; repository scope checks passed.
No application tests rerun for this documentation-only change; historical QA remains explicitly labelled.

Shared/API/schema/data/runtime changes: **NONE**. No original workbook edits,
no unauthorized commits, no push, no PR, no external outreach, and no fabricated validation.
Recommended immediate follow-up:
1. Review candidate uplifts (A3, B1, B4, E1, E3, E4, E5) with the mentor to validate baseline-preserving projection (≈2.94).
2. Schedule one attributable domain discussion for D2.
3. Confirm shadow-review resource commitment for D3.
4. Articulate threat model mapping to existing controls for B3.
5. Deepen EU competitor market evidence for E2.
