# INT-HTF-04A — Canonical Runtime Transition & Parallelization Gate

Status: **PROPOSED CONTRACT FREEZE — ready for Human Integrator acceptance**. 2026-09-26.
Role: Integrator / Architecture / Reconciliation. Documentation only; no runtime migration.
`OBSERVED_IMPLEMENTATION` and `OBSERVED_EVIDENCE` describe the inspected commit.
`TARGET_CONTRACT` describes the next implementation, subject to Integrator acceptance.
This document does not record an acceptance, commit, merge, release or deployment decision.

## A. Executive decision

**TARGET_CONTRACT:** GigaFood / PackShift is an evidence-backed packaging decision system supporting a sustainable physical hot-food packaging solution for Profi. Use the committed HTF-03 snapshot through a curated, strictly validated application adapter and an additive recommendation API, rendered by the existing FastAPI + React/TypeScript/Vite application. The primary story is P1 whole chicken under the assumed post-cook six-hour holding workflow, with Gaia as first qualification path; portions prioritise BIOPAP, and literal 250°C uses a separate aluminium body branch. All remain qualification paths. Historical Faerch Selection and the separate static demo are reference assets, not the canonical Profi recommendation. Software cannot certify food safety/legal compliance, approve procurement, establish production readiness or invent provider facts.

## B. Verified base/state

**OBSERVED_IMPLEMENTATION:** Repository `Slave-of-Skynet/gigafood`; verified base and inspection HEAD both `bd4f7651fe9f82f5c0849c5708fcd2f315052317`. Remote `refs/heads/main` was checked with `git ls-remote`; after `git fetch origin main`, `origin/main` also resolves to this SHA. `gh pr list --state open --json number,title,headRefName,files` returned `[]` at inspection time.

The user's original checkout is on `main @ e6b326317d11663a401ba4288c27f05853c10d15`, with five pre-existing staged deletions under `Проэкт Хакатон/`, untracked HTF-03 files and an untracked validator. It was not a safe source of committed truth. Those changes were preserved. Reconciliation was performed in managed worktree `C:/Users/user/.codex/worktrees/htf04a-transition/gigafood`, detached at the verified base; `git branch --show-current` is empty there. Initial worktree status was clean. At the reconciliation checkpoint, no delivery branch or commit had been created.

Inspection inventory (source inspection, not a claim that every historical test or PDF was rerun/revalidated):

| Area | Inspected files / evidence |
| --- | --- |
| Canon | `docs/canon/{challenge_canon,product_canon,decision_policy,open_questions}.md`, `docs/architecture.md`, `docs/recon/VLD-MR1-post-mentor-reconciliation.md` |
| HTF-03 | Both JSON datasets, `HTF-03-final-synthesis-report.md`, source/estimation/conflict/procurement ledger structures and relevant boundaries, `scripts/validate_htf03.py` |
| Runtime | `backend/app/domain/{packaging,_contract}.py`, `backend/app/runtime/context.py`, `backend/app/main.py`, services `selection.py`, `virgin_plastic.py`, `economics.py`; package directory inventory |
| Data | `data/evidence/{selection-portfolios,public-packaging,demo-packaging}.json` |
| Tests | `backend/tests/test_{api,selection,virgin_plastic,economics,demo_launcher}.py`: contracts, truth tables, regression cases and fixture consumers |
| Frontend | `frontend/src/api/{contracts,client}.ts`, `components/{SelectionView,EvidenceDetails,EconomicScenarioView}.tsx`, `pages/HomePage.tsx`, styles and visual helper references |
| Launch/CI | `scripts/demo.{py,ps1,sh}`, `.github/workflows/{ci,htf-03-validation}.yml`, README demo references |
| History/static | `docs/evidence/IGR-R2A-candidate-portfolio-recon.md`, `docs/review/INT-R2-selection-mvp-contract.md`, old QA report references; `Проэкт Хакатон/` inventory, HTML/JS claims and asset paths |

Current consumers were searched repository-wide. `main.py` resolves the portfolio path, `runtime/context.py` loads it, `selection.py` evaluates it, and `demo.py` explicitly supplies and checks it. `test_selection.py` pins `faerch-deli-trays` discovery/default/POST behavior and regression outcomes; `test_demo_launcher.py` pins PUBLIC identity and candidate counts. README and QA reports also reference it. It is not removable.

`HomePage.tsx` defaults to `mode='selection'`, mounts `SelectionView` independently of Comparison, and renders hypothetical economics in Comparison. The launcher selects PUBLIC scenario and portfolio packs, checks real HTTP discovery/evaluation and frontend proxy, owns ports/process cleanup, and currently has no HTF-03 preflight. A-core health alone does not prove Selection or future recommendation readiness. Runtime default scenario evidence remains illustrative; launcher settings explicitly override it.

Repository-wide literal-path search found historical recon references to `Проэкт Хакатон`; launcher/React/API do not serve that directory as their application root. Its `js/main.js` contains Faerch-as-baseline and hardcoded reduction claims (for example 91.6%, 94.5%, and use of “up to 70%” as a point). PDFs/images remain useful source/visual assets; their existence is not verification or designation as the final demo. No contrary Human Integrator designation was found in inspected canon.

Verification in the isolated worktree:

```text
git branch --show-current        -> empty (detached HEAD)
git rev-parse HEAD               -> bd4f7651fe9f82f5c0849c5708fcd2f315052317
git rev-parse origin/main        -> bd4f7651fe9f82f5c0849c5708fcd2f315052317
git status --short               -> clean before edits
python scripts/validate_htf03.py --self-test
PASS: 6 candidates; 3 distinct baselines; 126 sources;
      63 recomputed calculations; 48 gate rows.
PASS: 41 rejected mutation cases; valid all-plastic equality accepted.
```

The synthesis report's older 26-negative-case count is historical; the committed validator now executes 41. This does not change evidence values or create a dataset/validator contradiction. Validation establishes internal schema/arithmetic/provenance/display consistency, not source authenticity, physical suitability or safety. No full backend/frontend suite or live app test is claimed for this docs-only task.

Post-edit verification: `git diff --check` PASS; `git diff --no-index --check -- NUL docs/recon/INT-HTF-04A-canonical-runtime-transition.md` PASS (the new untracked document is checked explicitly). The HTF-03 self-test was rerun unchanged and produced the same 41-case PASS. Worktree status contains only this new document and the three allowed documentation updates. No runtime implementation, legacy deletion or HTF-03 value change was performed.

## C. Canonical identities

**OBSERVED_EVIDENCE → TARGET_CONTRACT:** Preserve IDs, source labels and scope; labels below are concise product names, not invented exact SKUs.

| Product ID | Archetype |
| --- | --- |
| P1 | Whole rotisserie chicken |
| P2 | Chicken wings / thighs |
| P3 | Hot potatoes / vegetables |
| P4 | Prepared hot meat portions |

| Workflow ID | Meaning and boundary |
| --- | --- |
| `POST_COOK_HOT_HOLD_6H` | Prepare food → transfer hot to retail pack → display/hold → purchase. Primary **ASSUMED** process, not sponsor-confirmed; actual hot-fill/cabinet temperatures and food geometry remain UNKNOWN. Six hours is a requirement, not verified safety. |
| `LITERAL_OVEN_250C_THEN_HOLD` | Separate assumed package/oven branch targeting 250°C, duration UNKNOWN, followed by separately qualified holding. For aluminium, distinguish `OVEN_BODY_ONLY` and `POST_OVEN_LID`; never expose an unqualified clear lid to oven heat by inference. |

`POST_COOK`, `HOT_HOLD`, `COOK_IN`, `OVEN_BODY_ONLY`, `POST_OVEN_LID` are component/process modes within workflows, not interchangeable workflow IDs. A peak heat claim is not a six-hour holding claim.

| Family ID | Identity and exactness limit |
| --- | --- |
| C1 | Sacma B.Life Gaia; whole-chicken qualification lead, exact nominated configuration/BOM unresolved |
| C2 | Sira-Cook Siralon 21; preserve its own evidence/use envelope |
| C3 | CRYOVAC Oven Ease EU/EMEA; committed label is current EMEA/UK, no cross-region claim transfer |
| C4 | Faerch Evolve CPET historical exact track: `C 2227-2AB + K5227-4`; not the old Selection `C 2200-1L` body |
| C5 | BIOPAP LC / SI-14 + clear sealing film; family six-hour lead does not qualify exact tray-film-food system |
| C6 | Aluminium body + transparent post-oven closure architecture; configuration mandatory for evidence and evaluation |

| Configuration | Binding that must travel with every price, metric, gate and procurement claim |
| --- | --- |
| `C6-RO-P` | E-ambalaj e-7291 body + La Habibi a-680681 clear lid; local portions, cross-seller fit assumed, no numerical oven claim for this body |
| `C6-RO-W` | WePack WP1826 body 803261 + lid 803262; whole-chicken local reference, transparent viewing unresolved |
| `C6-RO-H` | E-ambalaj e-pui225; local oven-body lead with 280°C body claim, duration/closure unresolved |
| `C6-EU` | Plus Pack 0192110201 + 5023100000; separate technical reference, 350°C body claim, inherited lid boundary and Romania complete-system route unresolved |

The 280°C and 350°C statements are scoped observations in HTF-03, not new thermal qualification. No copying their heat limits to RO-P, or RO-P price/transparency to RO-H/EU.

| Baseline | Identity and allowed interpretation |
| --- | --- |
| B1 | `ACTUAL_PROFI_INCUMBENT`: bag, plastic class, effectively zero recycled plastic and 100% virgin fraction **of plastic**, attributed to user-provided mentor clarification (`TASK`). Not laboratory analysis. Exact polymer/mass/dimensions/gauge/SKU/supplier/price/annual units UNKNOWN. |
| B1-ESTIMATED | Separate scenario record under B1, never a measured incumbent or a fourth baseline. Every comparison using it names the estimate explicitly. |
| B2 | `VIRGIN_ALL_PLASTIC_MARKET_BAG`, UNRESOLVED. Do not substitute a paper/plastic bag or another construction to fill it. |
| B3 | `ROMANIAN_CONVENTIONAL_MARKET_REFERENCE`: Barleta 128002 paper + PP rotisserie bag. UI role MARKET_REFERENCE, never PROFI_BASELINE; `is_profi_incumbent=false`. |

## D. Source-of-truth hierarchy

Authority for challenge/process requirements remains [challenge canon](../canon/challenge_canon.md): official brief → attributed mentor/sponsor clarification → explicit Human Integrator decisions. This contract fixes the transition direction within those boundaries; it does not amend the challenge or convert assumptions to process facts.

For packaging evidence in the new recommendation experience, **HTF-03 is the canonical committed baseline**:

1. [Canonical dataset](../evidence/htf-03/HTF-03-canonical-packaging-dataset.json), with its current typed fields, configuration-bound gate records and source references; preserve conflict and inherited boundaries.
2. [Prototype display dataset](../evidence/htf-03/HTF-03-prototype-display-dataset.json) and validator: a checked display projection and rendering policy, not a raw production response contract. It lacks the full top-level configuration catalogue and cannot alone support every configuration view.
3. HTF-03 synthesis, source ledger, estimation ledger, conflict resolution and Romania procurement report explain the records. Disagreement with canonical values/validator requires reconciliation, not a prose override.
4. Older research, Selection recon, public fixtures and archived claims retain historical/provenance value. They cannot overwrite HTF-03 current fields. Static HTML/JS is presentation reference only.

Committed code is authoritative for **what runs now**, not for new packaging truth. HTF-03 is research-backed, not a single PROVIDER dataset: preserve each field's actual source, including mentor attribution, public observations, inherited values and estimates. Do not coerce its six epistemic states into the old two-axis provenance enums or label all HTF-03 as verified.

## E. Reuse matrix

| Current capability | Action | Target use / protected boundary |
| --- | --- | --- |
| FastAPI factory, Pydantic strict `Contract` | KEEP | Reuse framework, extra-key rejection, finite numbers and explicit validation; add distinct recommendation models |
| Startup snapshot / independent availability | ADAPT | Add independently validated recommendation snapshot with source revision identity; no request-time research fetch or fallback to Faerch |
| Plastic arithmetic and missingness | KEEP | Preserve existing service and old tests; only apply to compatible plastic-bearing inputs |
| Selection comparability, grouping, next actions | ADAPT | Reuse design patterns; old grouping is not HTF-03 qualification priority or complete-system qualification |
| Two-dimension temperature/microwave gate as full recommendation engine | REPLACE | New six-gate assessment for selected product/workflow/configuration; keep old gate behavior behind old routes |
| EUR scenario economics | KEEP | Historical hypothetical tool; new scoped RON evidence is not passed through EUR-named fields |
| React/Vite, typed fetch, loading/error/retry/abort | KEEP | New entrypoint consumes server decisions; no client business calculations |
| `EvidenceDetails` disclosure patterns | ADAPT | Scope, state, bounds, sources, configuration and unknown reason; existing type is not sufficient unchanged |
| Selection/default homepage | ADAPT | Recommendation becomes primary only after integration acceptance; legacy modes clearly labelled |
| Launcher + CI + test infrastructure | ADAPT | Retain lifecycle and negative checks; add HTF-03/API identity preflight during implementation |

## F. Legacy classification and cleanup

Classification is the planned treatment, not permission to edit now. KEEP preserves useful capability; ADAPT means controlled replacement/extension; FREEZE preserves historical meaning. ARCHIVE_LATER is conditional retirement, not deletion.

| Surface | Classification | Owner / condition |
| --- | --- | --- |
| `docs/evidence/htf-03/**` | KEEP | Canonical evidence; frozen values during all four downstream scopes |
| `scripts/validate_htf03.py` | KEEP | Frozen evidence safeguard; evidence changes require separate reconciliation |
| `data/evidence/selection-portfolios.json` | FREEZE | Old PUBLIC Faerch demo; still consumed by code/tests/launcher |
| `data/evidence/public-packaging.json` | FREEZE | Historical bounded comparisons, not actual Profi baseline |
| `data/evidence/demo-packaging.json` | KEEP | Explicit ILLUSTRATIVE fixture/default and test coverage |
| `backend/app/domain/**` | ADAPT | Igor, additive models; old Component/Selection semantics protected |
| `backend/app/services/selection.py` | FREEZE | Keep old API behavior; new service separate |
| `backend/app/services/virgin_plastic.py` | KEEP | Protected arithmetic and old gate semantics |
| `backend/app/services/economics.py` | KEEP | Old EUR hypothetical semantics unchanged |
| `backend/app/runtime/**` | ADAPT | Igor adds independent curated snapshot |
| `backend/app/main.py` | ADAPT | Igor sole writer for additive route wiring, Integrator reviews |
| `backend/tests/**` | ADAPT | Igor owns implementation/regression tests; Alisa has a disjoint acceptance area below |
| `frontend/src/api/**` | ADAPT | Igor owns additive types/client contract publication; Denis consumes |
| `frontend/src/components/SelectionView.tsx` | FREEZE | Retain bounded legacy behavior; Denis builds recommendation view alongside |
| `frontend/src/components/EvidenceDetails.tsx` | ADAPT | Denis extends/adds compatible disclosures, preserves existing uses |
| `frontend/src/components/EconomicScenarioView.tsx` | FREEZE | Historical hypothetical tool; new recommendation prices have different scope/currency |
| `frontend/src/pages/HomePage.tsx` | ADAPT | Denis owns primary flow switch and honest legacy labels |
| `frontend/src/styles.css` | ADAPT | Denis sole writer; reusable visuals need evidence-safe labels |
| `scripts/demo.py` | ADAPT | Igor sole writer for new preflight; integrate after endpoints/UI are available |
| `scripts/demo.ps1`, `scripts/demo.sh` | KEEP | Wrappers already delegate lifecycle; Igor owns any strictly necessary change |
| `.github/workflows/**`, `scripts/verify.*` | KEEP | Integrator protected; no new dependency assumed by reconciliation |
| `docs/evidence/IGR-R2A-candidate-portfolio-recon.md` | FREEZE | Historical evidence/provenance; not new candidate canon |
| `docs/review/INT-R2-selection-mvp-contract.md` | FREEZE | Historical Selection contract; do not relabel its portfolio as HTF-03 |
| `docs/review/QA-R1-judging-readiness-audit.md`, `QA-R2A-selection-acceptance-matrix.md`, `QA-R3-final-acceptance.md`, `QA-R3C-current-main-final-acceptance.md` | FREEZE | Results are base/scope-specific, not proof of new recommendation behavior |
| `Проэкт Хакатон/**` | ARCHIVE_LATER | **LEGACY / REFERENCE / NOT CANONICAL DEMO TRUTH**. Retain intact now; asset/source references must be accounted for before relocation |
| Any current file | DELETE_LATER: none | No file is established as eligible for deletion by this task |

Required sequence: **freeze → replace → verify → remove**. DELETE_LATER requires all five facts: no runtime consumer, no test dependency, no demo dependency, no evidence/provenance value, and replacement E2E verified. Human Integrator separately authorises retirement/deletion. Old recon/review evidence is not discarded just because superseded. Frontend may reuse inspected assets/interaction ideas, but must rebind labels/data to API evidence and preserve provenance; no bulk copy of static business claims.

## G. Target conceptual runtime model

### G1. Entities and invariants

These are semantic responsibilities, not a requirement to use aesthetically identical class names. New assessment types must not silently change the existing `CandidateAssessment` contract.

| Entity | Required semantics |
| --- | --- |
| ProductArchetype | P1–P4, label, fill geometry as unknown/scoped evidence; no invented provider dimensions |
| Workflow | Stable ID, ordered component/process modes, assumption disclosure, temperature and duration independently typed |
| PackagingCandidate | Family ID/name and evidence-scoped configuration description; not an exact SKU by default |
| PackagingConfiguration | Parent family + immutable configuration ID where present, nominated BOM/components, component roles/exposure, exactness and completeness; no cross-configuration joins |
| EvidenceField<T> | `value` (including null), six-state `state`, `unit`, `scope`, `qualifier`, `confidence`, source IDs, display policy, optional calculation reference; retain inherited/historical boundary |
| QualificationGate | Six fixed IDs; status, reason, source IDs, bound product/workflow/candidate/configuration; source observation alone never creates PASS |
| CandidateAssessment | Identity tuple, all gates, outcome, qualified-survivor flag, qualification priority, rationale, metrics/comparisons, limitations and next actions |
| RecommendationResult | Requested context, effective assumptions, revision identity, all assessments, explicit survivor list, first qualification path and alternatives; no hidden approval |
| ProcurementEvidence | Country/route maturity, nominated articles, listing vs confirmed stock, order unit vs industrial MOQ, lead-time source, price basis/currency/VAT/freight/date |
| MaterialComposition | Complete-system boundary, component inventory, total/plastic/paper-fibre/aluminium/other masses separately, recycled/renewable fractions with denominators and exactness |
| MetricEstimate | Separate low/central/high, unit, assumption summary, confidence, conditional-envelope warning and calculation ID; never overwrite exact value |
| SourceReference | Stable ID, title, URL or attributed non-web source, evidence/research date and scope; enough to inspect support, not entire archive |

Preserve `UNKNOWN ≠ 0`, `ESTIMATED ≠ VERIFIED`, `CALCULATED ≠ VERIFIED`, `PUBLIC ≠ PROVIDER`, market reference ≠ Profi baseline, family ≠ SKU, body evidence ≠ complete-system evidence. False is not absent. A missing configuration assessment is not an inferred PASS or copied sibling assessment.

### G2. Ingestion allowlist and projection boundary

**TARGET_CONTRACT:** HTF-03 research snapshot → explicit allowlisted adapter → strict application model → recommendation service → API projection. Use canonical records as input, with display JSON/validator as projection guardrails. Validate canonical and display together offline/build-time and validate the curated application snapshot at startup. No automatic raw JSON passthrough, dynamic source fetch, arbitrary formula execution or new database is needed.

| Actual HTF-03 fields | Runtime domain | API projection | Research-only boundary |
| --- | --- | --- | --- |
| `schema_version`, `dataset_id`, `research_cut_off`, `market`; `contract` assumptions/modes | Revision and process context | Curated dataset/revision/cutoff and explicit assumptions | Never forward full `contract` object blindly |
| `product_archetypes`, `product_candidate_gates`, `product_decisions` | Exact identities and scoped policy records | Products, six gates/reasons, outcome, priority, rationale, gaps | Product-level prose cannot override workflow-specific gate row |
| `candidates`: names, `exact_configuration`, applications, dimensions/capacity; `configurations` | Candidate catalogue plus full configuration binding | Identity, scoped geometry/BOM summary and selected configuration | Nonselected configuration facts must not fill selected fields |
| `components`, `bom`, `exact_metrics`, `model_metrics`; baseline `observed`/`estimated` | Distinct observed/modelled material measures and complete-system bounds | Allowlisted total/plastic/virgin masses, recycled/renewable fractions, scope and estimate envelope | Model formula expression trees, full engineering inputs and unrelated material-only carbon remain internal |
| `thermal_claims`, `six_hour_hold`, `food_safety`, `grease_leak`, `transparency`, C5 `peak_temperature_resolution` | Scoped facts and unresolved conflicts | Relevant temperature **and duration and component**, safety gaps, viewing evidence, 175/185°C conflict with qualifier | No migration/DoC/NIAS/PFAS/food-safety prediction from arithmetic; no automatic conflict resolution |
| `procurement`, `observed_prices`, config prices, `cost_delta_vs_B1/B3`, `eol` | Country/configuration/price and comparison bases | Route maturity, stock/lead caveat, unit price with VAT/currency/freight context; EOL evidence narrative | No supplier availability fabrication, exchange-rate guessing, universal recycling or procurement approval |
| `plastic_accounting_scenario`, `comparisons`, display `scenario_details` | Validated conditional scenario outputs and explicit reference baseline | Opt-in details with full bounds, assumption warning and no verified-saving badge | Never promote scenario centre into actual plastic metric or default headline |
| `limitations`, `next_qualification_actions`, `evidence_quality`, `confidence`, referenced `sources` | Scoped disclosure and provenance | Relevant limitations/actions/confidence, minimal referenced sources | Unreferenced source ledger entries and audit scaffolding stay internal |
| `calculations`, `conflicts`, `field_reconciliation`, `input_claim_archive`, `input_manifest`, `search_audit`, `qualification_release_checklist` | Only references/curated implications where needed; not business inputs by recursive traversal | Calculation ID and readable assumptions/conflict/gap summary only | Full archives, reconciliation internals, formula machinery and search logs |
| `pitch_safe_claims`, `forbidden_claims`, rendering policy | Constraints for curated output/acceptance | Applicable disclosure text, no autonomous claim generation | Not a global marketing feed or a substitute for field evidence |

`DO_NOT_DISPLAY` suppresses the source value, not the fact that a required metric is unknown: UI may show N/A + UNKNOWN + gap reason. Non-unknown hidden research fields, especially `material_only_co2e_kg` and carbon scenarios, must be absent from API, not merely CSS-hidden. The adapter must carry C5's public-safe conflict summary even though the display candidate card does not expose the full resolution record. Unsupported source states/IDs, dangling sources, invalid ranges, inconsistent gates or mixed C6 configuration facts reject the snapshot.

### G3. Numerical and UI-safe semantics

| State | Display / evaluation meaning |
| --- | --- |
| `OBSERVED_VERIFIED` | “VERIFIED — [source scope]”; observation of cited source, not safety/compliance approval. Preserve historical/source-attributed limits. |
| `DERIVED_EXACT` | “DERIVED”; deterministic derivation from exact scoped premises. Never relabel as directly observed/verified. |
| `ESTIMATED` | “≈ central, range low–high, ESTIMATED”, confidence/assumptions; bounds are conditional engineering envelopes, not statistical confidence intervals. |
| `ASSUMED` | “ASSUMED” and explicit qualifier; cannot satisfy an evidence-required hard gate. |
| `UNKNOWN` | Null/N/A with missing-evidence action. No zero, no invented range. |
| `CONFLICT` | Both competing scoped claims plus conflict reason, e.g. C5 175/185°C; never choose the larger number silently. |

Preserve the display contract's approximate prefix, full estimated range, one-decimal mass and whole-percent display defaults, with full precision retained server-side. A rendering precision choice never removes a tolerance/source qualifier. Old Selection's 21.38 g body value must not become C4's complete-package mass.

Protected arithmetic remains:

```text
virgin_i = plastic_mass_g_i × (1 - recycled_content_fraction_i)
virgin_package = sum(virgin_i)
reduction_g = baseline_virgin - candidate_virgin
reduction_pct = reduction_g / baseline_virgin × 100
```

Old `Component` represents **plastic-bearing components** and requires positive plastic mass; it is not a general-material BOM. Do not feed paper/aluminium total mass to it, invent a positive plastic mass, or pass an empty inventory as proof of plastic-free packaging. New MaterialComposition supports independently evidenced zero plastic and non-plastic components without changing old arithmetic/validation. Missing plastic mass or recycled fraction blocks the corresponding total; no partial total disguised as complete. Retain signed increases, zero baseline → percentage N/A, and display-only rounding. Fractions require explicit plastic/component/whole-pack denominator; whole-material recycled fraction cannot substitute for plastic PCR fraction.

Total package, plastic, virgin plastic, paper/fibre, aluminium and other-material masses remain distinct. Missing component masses prevent exact complete totals. Source-exact body mass may coexist with estimated complete-pack mass. Where known and equivalently scoped, `0 ≤ virgin ≤ plastic ≤ total`; plastic=total is valid. Compare equal fill/function and complete-system boundaries, otherwise disclose screening scope or withhold delta. B1-ESTIMATED comparisons stay scenario outputs; B3 comparisons stay market-reference comparisons. Do not infer actual Profi savings from either.

Next recommendation slice exposes curated HTF-03 price/cost-delta evidence, not new freeform economics. Preserve currency, unit, VAT, quantity and freight basis; mismatches/missing B1 price yield N/A. Keep the old EUR hypothetical tool under its existing route. HTF-03 annualization is disabled: no annual-volume field in the first new evaluation request, no annual savings, no MOQ-as-volume. A later hypothetical-volume contract can reuse arithmetic only with explicit labels and acceptance. No eco score, LCA/CO₂ headline or invented +10–15% acceptance test.

### G4. Bounded recommendation policy

Stage A uses `physical_fit`, `food_contact`, `thermal_workflow`, `grease_leak`, `transparent_viewing`, `procurement`. Gate statuses preserve `PASS`, `QUALIFICATION_REQUIRED`, `UNKNOWN`, `FAIL`. Any FAIL → BLOCKED for that tuple. Any unresolved gate → QUALIFICATION REQUIRED; it cannot enter the qualified-survivor set. Only exact selected-use evidence satisfying all required gates can support a survivor, still without procurement/safety approval. Do not recompute these research qualifications from one temperature scalar.

**OBSERVED_EVIDENCE:** All 48 current rows have `qualified_survivor=false` and `approved_for_procurement=false`; 28 are QUALIFICATION REQUIRED, 20 BLOCKED. P1 post-cook prioritises C1; P2/P3/P4 prioritise C5; local C6 is priority 2. Priority is qualification work order, not environmental rank. C4 is BLOCKED for all eight contexts. Literal-oven rows block C2/C3/C4/C5; C1 remains unresolved without priority, and C6-RO-H is the configuration-bound fallback row, retaining priority 2. Do not renumber it to manufacture a first-place winner.

Stage B shows dimensions, not a composite score: total/package plastic/virgin mass, virgin reduction, recycled and renewable fractions, price/cost delta, Romania procurement maturity, EOL and evidence confidence. Currently there are no qualified survivors to rank. Conditional comparisons among unresolved paths may be shown as explicitly unqualified screening/scenario details. BLOCKED candidates remain visible for explanation, never selected as a qualification recommendation because of lower plastic.

Exact label mapping for the next slice:

| Source/role | API and UI policy |
| --- | --- |
| `QUALIFICATION REQUIRED` | Preserve outcome exactly; first-path card says “First qualification path — QUALIFICATION REQUIRED” |
| `BLOCKED` | Preserve outcome exactly with failing gate/reason and context |
| `first_qualification_candidate` / `qualification_priority` | Separate position/role, not an approval status |
| `ALTERNATIVE` | Presentation role only; always show the independent actual outcome and configuration |
| `RECOMMENDED UNDER CURRENT ASSUMPTIONS` | Reserved wording, **not emitted in this first slice**: current rows do not carry it. Use first qualification path to avoid falsely promoting unresolved gates. Any later use needs accepted policy/evidence revision. |

No `BEST`, `WINNER`, `APPROVED`, `SAFE`, `CERTIFIED` runtime verdicts. Preserve `approved_for_procurement=false` as a compatibility disclosure, never toggle it from environmental calculations. General family recommendation prose cannot override selected workflow/configuration outcomes.

## H. Proposed API transition

**Decision: Option B, additive recommendation surface.** Replacing `/api/v1/portfolios` meaning would break tested Faerch identity, Component boundaries, old enums and annual overrides. Separate endpoints preserve bounded demos, give frontend an unambiguous new contract and support a small end-to-end path without rewriting the application. No routes are implemented here.

Proposed concrete transport boundary for Integrator acceptance (semantic fields frozen by this packet; Igor publishes strict Pydantic/TypeScript details as the first downstream checkpoint):

| Endpoint | Request / response meaning |
| --- | --- |
| `GET /api/v1/recommendation/products` | Product catalogue P1–P4, two workflow definitions, default P1/post-cook, context assumptions, dataset revision/cutoff |
| `GET /api/v1/recommendation/candidates` | C1–C6 catalogue plus four separately keyed C6 configurations, B1/B2/B3 summaries; relevant curated evidence and no computed universal recommendation |
| `POST /api/v1/recommendation/evaluate` | Required `product_id`, `workflow_id`; optional `configuration_id` selecting a C6 variant. Absent means the exact C6 gate binding for that context. No numeric gate override, annual volume or arbitrary source payload. |

Evaluation envelope semantic contract:

| Field group | Required payload semantics |
| --- | --- |
| Identity | `schema_version` for the new API, `dataset_id`, source revision/hash, research cutoff; not old `schema_version=1.0` reused under a different meaning |
| Context | Echo product/workflow, selected C6 configuration and effective assumptions/requirements; baseline references retained on every comparison |
| Assessments | One result per C1–C6 for the chosen context; candidate ID, configuration ID where applicable, six gates, outcome, survivor boolean, source priority, rationale and next actions |
| Recommendation | First qualification path or null; separate alternatives and `qualified_survivors` (currently empty). No “best” fallback when evidence unavailable |
| Evidence/comparison | Typed exact fields and separate estimates/scenarios, units/scope/state/confidence/qualifiers, missing fields, price/EOL/procurement details, referenced source map |
| Disclosure | Explicit no-approval/no-verified-saving and assumed-workflow boundaries; price or metric absence is valid output |

Catalogue configuration availability does not imply an evaluated gate row. The first slice supports only committed `(product, workflow, candidate, configuration)` rows. For P1 post-cook C6 binds RO-W, for P2–P4 post-cook RO-P, and for all literal-oven contexts RO-H. A supplied C6 configuration lacking a row, including C6-EU, returns 422 `CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT`; it may be shown as a technical reference but cannot borrow gates. This keeps all four identities accessible without inventing assessments. Broader evaluation requires new accepted evidence rows.

Transport/failure semantics: valid request and available snapshot → 200, even when all paths are unresolved/blocked or prices are unknown. Malformed/extra/non-finite request values → 422. Unknown product/workflow/configuration IDs → 422 with a stable validation reason. Missing/unreadable/invalid recommendation snapshot → 503 `RECOMMENDATION_EVIDENCE_UNAVAILABLE`; never serve old Faerch as substitute. Existing 404/422/503 behavior on old routes remains intact. New discovery/evaluation establish their own availability; do not reinterpret the old `/health` contract. Stable ordering uses qualification priority within applicable nonblocked paths, then catalogue order; blocked explanations follow, with source IDs retained. No sorting by low price/plastic through gates.

Igor owns the new API mirror/client publication. Denis may initially build presentational views against an explicit UI view model from these semantics, with any local preview clearly marked synthetic and kept out of production data paths. He binds to the accepted TypeScript mirror at the contract checkpoint; he must not independently define enums, compute recommendation/metrics or parse raw HTF-03 in-browser. Existing TypeScript is a manual mirror, not a runtime payload validator.

## I. Demo critical path

**TARGET_CONTRACT:** Freeze this implementation story; final demonstration/release acceptance remains with Human Integrator.

1. Select P1 whole chicken (default); expose P2–P4 without changing identities.
2. Show primary `POST_COOK_HOT_HOLD_6H`, prominently ASSUMED, with separate fallback selector.
3. Show six operational requirements and actual unknown fill/temperature/holding details.
4. Show C1 Gaia as first qualification path, QUALIFICATION REQUIRED, zero qualified survivors.
5. Show alternatives with independent gates; P1 local C6 is RO-W, not a generic aluminium card.
6. Separate observed/derived mass from approximate range and unknown plastic. For P2–P4 show C5 SI-14 estimated pack mass (~26.6 g, range ~23.4–30.2 g) with full model limitations, never as observed complete-pack weight.
7. Compare environmental/economic evidence with explicit reference baseline; missing actual B1 price → N/A. Optional scenario details cannot show a central-only savings badge.
8. Show Romania procurement maturity, selected articles and listing-vs-stock/fit caveats.
9. Open field provenance, scopes, assumptions, historical qualifiers and conflict disclosures.
10. Show remaining supplier/QA/process actions. Switch to literal 250°C: C5 becomes BLOCKED; C6 switches to RO-H oven body + separately unresolved clear closure, not six hours at 250°C.

Acceptance negatives include C5 blocked despite environmental estimates; UNKNOWN food contact never PASS; RO-W unresolved viewing never borrowed from RO-P; no price/volume → N/A; unavailable snapshot → visible retry/error, no old-data fallback. User switches must cancel/ignore stale responses so a post-cook result cannot be displayed under the oven selector. Backend outputs own business calculations, recommendation ordering and qualification; frontend formats units and labels only.

## J. Protected shared surfaces

| Protected surface | Sole downstream writer / acceptance boundary |
| --- | --- |
| `backend/app/domain/**`, `runtime/**`, `main.py`; new recommendation service | Igor; Integrator accepts semantics, no independent competing domain edits |
| `frontend/src/api/contracts.ts`, `client.ts`, any additive API contract files | Igor for the first contract publication and revisions; Denis consumes, requests changes through the checkpoint |
| HTF-03 JSON/ledgers, validator, candidate/configuration/product/workflow IDs | Frozen for all four tasks; Integrator commissions evidence reconciliation separately |
| New outcome/gate/evidence states, projection allowlist, B1/B2/B3 identities | This packet; changes require Integrator reconciliation across backend/frontend/QA/pitch |
| Existing `Component`, formula, old Selection/economics route behavior and fixtures | Igor preserves regression invariants; no new generic-material reinterpretation |
| `HomePage.tsx`, styles and UI components outside frozen legacy components | Denis; Igor does not wire UI files |
| `scripts/demo.py` and launcher tests | Igor; demo readiness accepted after UI integration |
| `.github/workflows/**`, dependency manifests, canon and this transition document | Integrator controlled; none of four scopes may silently change CI/dependencies/architecture |

Igor may extend domain/shared files as their sole implementation writer after acceptance; “protected” does not mean no one can implement them. It means other parallel tasks must not redefine or edit those contracts. All four may inspect everything relevant. No destructive cleanup or code implementation belongs to this reconciliation.

## K. Parallel task graph and four packets

```text
Human Integrator accepts INT-HTF-04A semantic/API direction
    ├─ A Igor: strict types + curated sample response checkpoint → adapter/API/tests
    ├─ B Denis: flow/components/disclosures → bind accepted API checkpoint → UI
    ├─ C Alisa: independent acceptance/claims matrix → API/UI verification
    └─ D Nicolae: source-bound pitch/economics tables → validate served claims
Igor API + Denis UI → launcher identity/preflight → Alisa E2E/claims report
    → Human Integrator demo acceptance, merge order and release decision
```

All four contracts can be issued immediately from this packet. Implementation against shared transport types joins at Igor's early contract checkpoint; this is an explicit dependency, not a need to rediscover architecture. No parallel agent is dispatched by this document.

### A. Igor — HTF-03 backend/runtime

- Goal: curated HTF-03 adapter → independently validated snapshot → six-gate recommendation service → additive endpoints and TypeScript client contract.
- Write scope: additive `backend/app/domain/**`, `runtime/**`, `main.py`, new `backend/app/services/recommendation.py` (or equivalent); `backend/tests/**` except reserved acceptance area; new `data/runtime/**` if a materialised projection is chosen; `frontend/src/api/**`; `scripts/demo.py` and necessary wrapper adjustments.
- Preserve: old selection/economics services, fixtures, formula, API behavior. No source dataset edits or new dependencies by default.
- First checkpoint: strict request/response schemas, curated response examples for P1/post-cook, P2/post-cook, P1/oven and unavailable/unsupported configuration cases; Integrator accepts the mirror once for all consumers.
- Acceptance: 48 rows preserved, C6 row binding and absence checked, all six-state/projection invariants, empty survivor set, 20 blocked/28 unresolved records, no research carbon leakage, fail-closed independent availability, old regressions preserved. Run appropriate backend and launcher checks, and typecheck client contract.
- Handoff: source revision/hash, schema/API examples, test evidence, remaining gaps; no self-authorised merge/deploy.

### B. Denis — UX/frontend

- Goal: product → workflow → first qualification path / alternatives → scoped comparison → evidence / next actions.
- Write scope: new recommendation components in `frontend/src/components/**`, `pages/**`, `styles.css`, compatible extensions of EvidenceDetails and visual helpers. Existing SelectionView/EconomicScenarioView stay frozen; retain them as legacy modes if exposed.
- Exclusions: API contracts/client (Igor publishes), backend/data/HTF-03, launcher/CI, business calculations, copied static winner/savings claims.
- Start immediately with layout/disclosure components; bind accepted API at checkpoint. Do not ship locally fabricated responses as evidence.
- Acceptance: all states including UNKNOWN/CONFLICT and bounds, visible configuration/baseline distinctions, loading/error/retry and stale-response protection, no false PASS or percent-only saving badge. Build/typecheck; exercise primary and negative flows.
- Handoff: UI path, supported contexts, screenshots/manual checks tied to served revision, remaining integration issues.

### C. Alisa — QA/product acceptance

- Goal: independent acceptance/claims matrix across P1–P4 × two workflows, six candidates and selected configurations; mentor requirement coverage and demo-safe wording.
- Write scope: new `docs/review/INT-HTF-04A-*` acceptance artifacts; optional black-box tests confined to new `backend/tests/acceptance_htf04/` (reserved to Alisa, excluded from Igor ownership). No implementation edits or modifications to existing tests/fixtures, canon or HTF-03.
- Start immediately from canonical gate rows and this contract; add implementation observations only when backend/UI are available. Synthetic fault injection must be labelled and kept separate from real evidence.
- Acceptance: baseline identities; all six states; failed hard gate non-compensation; explicit empty survivor set; missing-price/volume handling; C6 wrong-context refusal; source/configuration scope; raw archive/carbon omission; claims against mentor needs with UNKNOWN coverage. Old QA reports are not reused as current passes.
- Handoff: PASS / FIX REQUIRED / UNVERIFIED by case and source revision, actual payload/visual evidence; owner-routed defects, no out-of-scope fixes.

### D. Nicolae — pitch/economics/evidence presentation

- Goal: judge-safe physical problem, candidate rationale, environmental/economic characteristics, Romania procurement, evidence confidence and qualification roadmap.
- Write scope: new `docs/pitch/INT-HTF-04A-*` narrative/claim/economics artifacts only; inspect all evidence and legacy visuals, but do not alter them or frontend files.
- Start immediately with P1 Gaia, portions BIOPAP and configuration-bound aluminium fallback. Use HTF-03 pitch-safe claims, exact vs modelled numbers, comparison baseline, price VAT/quantity/freight and observation date.
- Acceptance: no actual Profi savings, fabricated annual units, procurement-approved candidate, central-only uncertain reduction, material-only CO₂ headline or unsourced winner. Missing price and negative/inconclusive ranges remain visible. Approximate cost tolerance is context, not a pass threshold.
- Handoff: claim → field/source → state/scope → wording → outstanding validation; reconcile live-demo claims after integration without inventing missing runtime capability.

## L. Hard stop conditions

Stop the affected work and report evidence to Human Integrator if canonical records fail the validator, a required identity is absent, or prose/code conflicts with the committed gate semantics. Also stop on material main/domain/API drift, a competing active PR owning protected files, a requirement to redefine HTF-03 to preserve legacy routes, a new dependency/database migration merely to reconcile documentation, or explicit Human Integrator designation of the static demo contrary to this contract.

During implementation, stop on cross-configuration qualification, guessed unknown-to-PASS, estimated-to-verified promotion, baseline substitution, forced procurement approval, incompatible currency/BOM comparisons, or requests for shared-file changes outside the single-writer map. Unknown business fields alone do not block the bounded prototype: they are valid output. New evidence/qualified claims require separate reconciliation; do not silently repair source values. Recheck remote base and active PR ownership before starting downstream writes.

## M. UNKNOWN / unresolved questions

| Class | UNKNOWN and consequence / owner |
| --- | --- |
| Implementation | Integrator acceptance of proposed route/schema boundary and final transport spelling; Igor publishes strict mirror before UI integration. No need to invent architecture independently. |
| Implementation | Whether to materialise `data/runtime/**` or build the curated snapshot in memory at startup; Igor may choose either with explicit revision identity and the same allowlist/validation. |
| Implementation | Exact file factoring/response size and added regression cases; implementation choices within the accepted semantics, no new dependency assumed. |
| Implementation | Live recommendation readiness, E2E outcomes and final launch defaults: not implemented/tested by INT-HTF-04A. |
| Product/process | **UNKNOWN — ASK MENTOR:** actual post-cook vs oven sequence, hot-fill/cabinet/food temperatures, peak duration, six-hour meaning and acceptance criteria, dimensions/fill/headspace, whether bounded variants suffice. Blocks qualified use claims. |
| Provider | B1 polymer/BOM/mass/price/volume/SKU/supplier; source remains absent, confidentiality constraint persists. No fabricated baseline or repeated-request assumption that data will become available. |
| Supplier/QA | Exact nominated system DoC/migration/food matrix, window/film/closure fit, thermal exposure, leak/anti-fog and six-hour safety/quality. Blocks approval, not displaying qualification work. |
| Procurement/EOL | Stock, current delivered complete-system quote, industrial MOQ/lead-time commitment, Romanian recovery route for greasy mixed materials. Public listing and market reference do not resolve these. |
| Human Integrator | Shared contract acceptance, final demo path/candidate positioning, merge order, release/deploy, legacy deletion and downstream integration remain human decisions. |

## N. Handoff

Downstream agents may assume one canonical packaging evidence snapshot (HTF-03 at the verified base), one target application (FastAPI + React), fixed P1–P4/two workflows/C1–C6/four C6 configurations/three distinct baselines, six evidence states and six non-compensatory gates. They may use bounded estimates with full qualifiers; no current path is fully qualified. They may reuse existing infrastructure under the single-writer map and preserve old Selection as historical reference. Frontend may not compute business results; no one may delete legacy or revise evidence under these scopes.

The deliverable is this document plus minimal cross-references in product canon, decision policy and architecture to prevent older unfrozen-target language/ownership from misleading downstream work. Challenge canon is unchanged: no challenge-level conflict was found. No implementation, source-value change, merge, release or deployment is included. Subsequent commit/PR delivery is authorised by the user follow-up; it does not constitute acceptance of the proposed shared contract. Human Integrator can issue the four packets above immediately and accept the shared checkpoint once.
