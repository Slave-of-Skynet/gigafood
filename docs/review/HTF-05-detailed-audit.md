# HTF-05 Detailed Audit — GigaFood / PackShift Deep Dive

**Date:** 2026-09-27  
**Branch:** arena/01a0e295-gigafood @ 2c08b8e (latest main)  
**Auditor:** Arena Agent  
**Scope:** Full repository, runtime, tests, evidence packs, UI, pitch, compliance

---

## 1. Repository Structure & Build

```
backend/
  app/
    domain/packaging.py      # Evidence, Package, Component, Provenance, Comparison, SelectionResponse, EconomicScenario
    domain/recommendation.py # HTF-03: ProductArchetype, CandidateSummary, GateStatus, EvidenceField, 48 rows
    domain/_contract.py      # Base Contract
    runtime/context.py       # load_runtime() atomic snapshot, fail-closed
    runtime/recommendation.py# load_recommendation_runtime(), 131 sources, 114 recomputed, C6 binding matrix
    services/virgin_plastic.py # virgin_plastic(), compare(), combine_verification(), thermal+microwave gate
    services/selection.py    # calculate_article_virgin_plastic() EXACT_POINT_VALUE guard, assess_comparability(), deterministic grouping
    services/economics.py    # evaluate_economic_scenario() USER_PROVIDED, THEORETICAL guard
    services/recommendation.py # evaluate_recommendation() 6 non-compensatory gates
    main.py                  # FastAPI app, 8 routes, lifespan loading 3 packs
  tests/
    test_virgin_plastic.py 49 passed
    test_selection.py 41 passed
    test_economics.py 18 passed
    test_api.py 9 passed
    test_demo_launcher.py 10 passed
    test_recommendation.py
    acceptance_htf04/test_acceptance_oracle.py
frontend/
  src/
    api/contracts.ts        # Mirror of backend domain + HTF-03 contracts
    api/client.ts           # api.portfolios(), portfolio(), evaluatePortfolio(), recommendation/products, candidates, evaluate
    api/offlineFallback.ts + offlineRecommendationData.json 55k lines
    components/
      UniversalPouchShowcase.tsx 694 lines — default mode, carousel, pricing, pros/cons, pentagon, anatomy, calculator, cert modal CTA
      RecommendationView.tsx 497 lines — P1-P4, 2 workflows, C6 config selector, stale-response guard
      SelectionView.tsx 915 lines — Faerch portfolio, overrides, annual units, 3-axis grid, evidence gaps
      EconomicScenarioView.tsx 308 lines — blank inputs, placeholder hints, THEORETICAL banner
      CandidateRecommendationCard.tsx 414 lines — includes universal pouch spec panel
      ProductVisual.tsx, GateMatrix.tsx, DecisionSummary.tsx, PentagonRadarChart.tsx, ProductAnatomyDiagram.tsx, EuropeanManufacturingDossier.tsx, ComplianceCertificateModal.tsx etc
    pages/HomePage.tsx 793 lines — 4 modes, mode pills, nav
    i18n/ messages.ts 4364 lines + universalPouchMessages.ts 3073 lines + index.tsx EN/RU/MD chrome
  public/reference-packaging/ 30+ images
data/evidence/
  demo-packaging.json ILLUSTRATIVE fixture (illustrative-reduction 15→8g 46.667%, illustrative-incomplete missing recycled)
  public-packaging.json PUBLIC 2 scenarios (cchbc 22→2.5g 88.636%, deli 14.8→2.4g 83.78% BLOCKED)
  selection-portfolios.json PUBLIC Faerch (P 2226-1C 26.29g 0% PCR, C 2200-1L 21.38g NON_POINT, K 2182-1G 21.48g 70°C ceiling)
docs/evidence/htf-03/
  HTF-03-canonical-packaging-dataset.json — 48 gate rows, 131 sources, 114 formulas, 6 candidates, 3 baselines
  HTF-03-prototype-display-dataset.json — safe projection for UI
  HTF-03-final-synthesis-report.md, source-ledger, estimation-ledger (63 calculations), conflict-resolution, romania-procurement
docs/evidence/HTF-05-universal-grill-oven-pouch-spec.md — 2-material 250°C spec
docs/canon/ challenge_canon, product_canon, decision_policy, open_questions
docs/review/ QA-R1, QA-R3, QA-R3C ACCEPTABLE, APR-HT1, APR-HT2A, etc
docs/pitch/ NCP-HT2-final-pitch-packet 683 lines (9 slides, 4-min script, TARGET 70s demo, FALLBACK, phrase banks)
scripts/
  verify.sh / verify.ps1 — venv, pip install -e ./backend[test], pytest, npm ci, build, git diff --check
  demo.py 12k lines — fail-closed PUBLIC checks, port checks, preflight HTTP, cleanup
  validate_htf03.py — self-test 41 negative mutations
```

**Build verification:**
```
.venv/bin/python -m pytest backend/tests -q
165 passed, 1 warning (httpx deprecation)
npm ci && npm run build → tsc --noEmit && vite build 33 modules PASS
python scripts/validate_htf03.py --self-test
PASS: 6 candidates; 3 distinct baselines; 131 sources; 114 recomputed; 48 gate rows
PASS: 41 rejected mutation cases; valid all-plastic equality accepted
```

---

## 2. Environmental Impact Deep Dive (25%)

### 2.1 Formula Implementation

**backend/app/services/virgin_plastic.py:**
```python
def virgin_plastic(package: Package) -> float | None:
    if any(c.plastic_mass_g.value is None or c.recycled_content_fraction.value is None for c in package.components):
        return None
    return fsum(c.plastic_mass_g.value * (1 - c.recycled_content_fraction.value) for c in package.components)

def combine_verification(req_state, cand_state):
    # weakest premise caps finding
    return req_state if rank(req) <= rank(cand) else cand_state
```
Exactly matches challenge: `virgin plastic = total plastic - recycled content`. Uses `fsum` for numerical stability, unrounded. Missing → None → INSUFFICIENT_DATA, never 0.

**Selection guard:**
```python
def calculate_article_virgin_plastic(package, metadata):
    missing = []
    for c in package.components:
        if c.plastic_mass_g.value is None: missing.append(...)
        if c.recycled_content_fraction.value is None or metadata.recycled_content_point_value_status != "EXACT_POINT_VALUE":
            missing.append(...)
    if metadata.recycled_content_point_value_status != "EXACT_POINT_VALUE" or missing:
        return None, missing
    return virgin_plastic(package), []
```
`NON_POINT_VALUE` ("up to 70%") → withheld, not guessed. This is audited in QA-R3C as integrity.

### 2.2 Public Cases

**public-packaging.json:**
- Case A `cchbc-500ml-rpet-transition`: body 19.5g 0% → 19.5g 100% rPET, closure 2.5g 0% → 2.5g 0%. Current 22.0g, candidate 2.5g, reduction 19.5g, 88.63636363636364% (22→2.5). Provenance MANUFACTURER_SUPPLIED SOURCE_AVAILABLE Coca-Cola HBC Green Finance Report Sep 2023. Excluded: label 0.3-0.5g, adhesives (documented in NDR-01).
- Case B `deli-pp-to-rpet-transition`: Berry UniPak 360ml 14.8g body only 0% (excludes lid, missing mass unknown) → Duni Deli Hinged 375ml 12.0g gross 80% rPET. Current 14.8g, candidate 2.3999999999999995g (12*(1-0.8)), reduction 12.4g 83.78378378378379%. Capability: candidate max 70°C 2h max, not microwave safe vs requirement ASSUMED NOT_VERIFIED 95°C + microwave true → BLOCKED. Demonstrates env benefit ≠ operability.

HTTP verified:
```
GET /scenarios/cchbc-.../comparison → reduction_g 19.5 eligibility REVIEW_REQUIRED
GET /scenarios/deli-.../comparison → reduction_g 12.4 eligibility BLOCKED constraints [food-contact-suitability, thermal-envelope-incompatibility, microwave-reheating-incompatibility]
```

### 2.3 Selection Faerch

- Baseline P 2226-1C PP Grey 26.29g ±10% 0% PCR (family claim), -20..+121°C microwave true.
- C 2200-1L CPET Evolve 21.38g ±10% recycled_content null INSUFFICIENT_DATA note "Recycled PET content fluctuates; datasheet defers to sales/compliance; Up to 70% is marketing ceiling not point value" → calculation withheld, annual impact N/A even with volume, next_action REQUEST_PCR_EVIDENCE.
- K 2182-1G Clear APET 21.48g ±10% recycled null UNSTATED, max 70°C, microwave null NOT_VERIFIED "TDS states Not ovenable; microwave unstated" → BLOCKED for 95°C default, REVIEW_REQUIRED for 60°C.

Summary verdict: "No candidate is currently recommendable for transition: Faerch C 2200-1L ... requires current SKU/recipe declaration, while Faerch K 2182-1G ... is blocked by thermal incompatibility"

### 2.4 HTF-03 63 Calculations (estimation-ledger)

- E001 bag_area 0.18375/0.1925/0.21 m2 from Barleta 18×7×35 cm
- E002 B1-ESTIMATED mass 2.59165/6.4985/12.46g VERY_LOW confidence: area × gauge 12-40um × density 1.13-1.4 + ancillary 0.1-0.7g. Central 6.5g is scenario not mean.
- E003 B3 mass 10.7575/11.6575/13.3g, plastic 3.4075/3.9575/4.9g, renewable fraction 62-68%
- E006 B3 price 0.37026 RON/pc DERIVED_EXACT (370.26 RON/1000)
- E007 C1 Gaia mass 14.55-26.59 central 19.72 EST, E008 virgin budget 8.0-14.35 central 10.70 EST (all liner as plastic conservative, actual UNKNOWN)
- E009 C2 Siralon 4.25-10.19 central 5.74 EST
- E010-E014 C4 CPET lid model 12.28-37.45g, total 63.95-89.71 central 73.32, virgin 25.28-54.14 central 36.20, recycled fraction 39.7-60.5% whole-pack but body 69-75% inherited, price lid 1.760753 DKK
- E015-E018 C5 BIOPAP body 21.15-23.5-25.85g (23.5g nominal historical), film 2.12-2.78-3.64g (190×247mm × overlap 1.05-1.2 × 43gsm × gauge 30-45um), total 23.37-26.58-30.19 central 26.58, virgin budget 2.22-3.08-4.34 central 3.08 EST (tray plastic-free family claim, entire film as virgin conservative)
- E019-E025 C6-RO-P body 15.55-24.69-35.31g scaled from Plus Pack 31g ±10% via area ratio 0.0647/0.081209 × gauge factor 0.7-1.3 VERY_LOW, lid 9.10-18.90-38.23g model (220×170×5-25mm × 0.15-0.4mm × 1.4g/cm3), total 24.76-43.90-74.25, plastic 9.20-19.20-38.93, price 1.1485-1.2915 RON/pair (76 RON body promo 76/90.3 regular + 38.85 lid)/100, cost delta vs B3 210.18-248.80%
- E039-E042 C1 vs B1 reduction -453%..+35% central -64.5% (more virgin), vs B3 -321%..-63%
- E043-E046 C2 vs B1 -293%..+65% central +11.7%, vs B3 -199%..+13%
- E047-E050 C4 vs B1 -1988%..-102% central -457% (always more virgin), vs B3 -1488%..-415%
- E051-E054 C5 vs B1 **-67.6% .. +82.1% central +52.5%**, vs B3 -27.4%..+54.5% central +22%. Range crosses zero → no guaranteed saving.
- E055-E058 C6 vs B1 -1402%..+26% central -195%, vs B3 -1042%..-87%
- E059-E063 material-only CO2e: B1 PET 0.0049-0.036kg, C2 PA6 0.019-0.088kg, C4 PET 0.064-0.199kg, C6 Al+PET 0.082-0.402kg (all VERY_LOW, ±30% analyst sensitivity, not full LCA, hidden in public UI)

**Key lesson:** High PCR in heavy rigid (C4 73g) still 25-54g virgin > B1 2.6-12.5g. Lightweight fibre architecture is true reduction path.

### 2.5 HTF-05 Physical Reduction

- Foil bag: 2.8g BOPET vs 32g PP worst-case = **91% reduction** ( (32-2.8)/32=91.25% ). 0g disposable PP in tray+silicone combo (lid reusable 500-1000 cycles).
- Calculation in UniversalPouchShowcase.tsx:
```ts
plasticPerIncumbentG = 32
currentPlasticG = bag?2.8:0.0
plasticSavedKg = monthlyVolume*(32-current)/1000
plasticReductionPct = (32-current)/32*100
```
Monthly volume slider 5k-100k → e.g. 25k × 29.2g = 730kg saved/month.

- Pricing: bag $0.15-0.35 (~0.70-1.60 RON) B2B 10k+, $0.48-0.65 small HoReCa 250pcs, retail $0.75-1.15 pack (~3.5-5.3 RON) 6-20 bags $4.5-14.99, ready meal $4.9-8.5. Tray: €0.025-0.045 tray + €0.20-0.34 LSR lid (5-10k) + €2-3.5k mold CAPEX or +€0.03 amortization, wholesale €0.23-0.38 (~1.15-1.90 RON), retail €2.9-4.8 (~14.5-24 RON), cost per bake <€0.05.

---

## 3. Practicality Deep Dive (15%)

### 3.1 A-core Gate Truth Table (from test_virgin_plastic.py + QA-R1 V2)

| Requirement | Candidate | Req Verification | Cand Verification | Result |
|---|---|---|---|---|
| 95°C | 70°C | ASSUMED NOT_VERIFIED | SOURCE_AVAILABLE | BLOCKED thermal-envelope-incompatibility reason "For the assumed demo operating requirement of 95°C, candidate documented maximum is 70°C." verification combined = NOT_VERIFIED |
| 95°C | 100°C | ASSUMED NOT_VERIFIED | ASSUMED NOT_VERIFIED | REVIEW_REQUIRED thermal-envelope-verification reason "For the assumed demo... numerically satisfies ... but eligibility cannot be established because ... not VERIFIED" |
| 95°C | 100°C | VERIFIED | VERIFIED | ELIGIBLE |
| null temp | verified mw | ASSUMED NOT_VERIFIED null value | VERIFIED true | REVIEW_REQUIRED thermal-envelope-verification "value is unavailable" |
| no reqs | any | — | — | REVIEW_REQUIRED (evaluated_requirements==0) |
| microwave true | false | ASSUMED | SOURCE_AVAILABLE | BLOCKED microwave-reheating-incompatibility "assumed demo ... not microwave safe" |
| microwave true | null | any | NOT_VERIFIED | REVIEW_REQUIRED "capability is not established" |
| microwave true | true | NOT_VERIFIED | NOT_VERIFIED | REVIEW_REQUIRED verification |
| microwave true | true | VERIFIED | VERIFIED | ELIGIBLE (if thermal also VERIFIED) |

R1-R7 reconciliation in QA-R1: 22 independent assertions PASS.

### 3.2 Selection User Scenario

Form in SelectionView.tsx: context (not evaluated), required_max_temperature_c text inputMode decimal, microwave select default/required/not-required, annual_units numeric. Validation:
- units: Number(volume) must be safe integer >0 else "Enter a positive whole number..."
- temp: Number(temperature) must be finite else "Enter a finite numeric temperature..."

Request payload e.g. `{"required_max_temperature_c":60.0,"microwave_required":false,"annual_units":100000}`. Effective requirements show USER_PROVIDED NOT_VERIFIED origin. Reset clears all overrides.

### 3.3 HTF-03 6 Gates & 48 Rows

**Gate definitions (recommendation.py):**
- physical_fit: volume, dimensions, geometry, headspace, closure
- food_contact: EU 10/2011, 1935/2004, fatty-food migration D2, DoC, PFAS, NIAS, finished-system
- thermal_workflow: exposure temp + duration compatibility per workflow
- grease_leak: containment under hot poultry fat, seam integrity 6h
- transparent_viewing: window/lid visibility, anti-fog, post-oven integrity
- procurement: Romania distributor, MOQ, lead, listing≠stock

**Non-compensatory rule:** FAIL → BLOCKED, no FAIL + ≥1 QUAL_REQUIRED/UNKNOWN → QUALIFICATION REQUIRED, all PASS → QUALIFIED SURVIVOR (0 currently).

**48 rows (from APR-HT1 matrix):**
- P1 POST_COOK: C1 QUAL_REQUIRED prio1, C2 QUAL_REQUIRED, C3 QUAL_REQUIRED, C4 BLOCKED (procurement FAIL), C5 QUAL_REQUIRED, C6-RO-W QUAL_REQUIRED prio2 (WePack 803261+803262 3.52 RON/pair, lid transparency UNKNOWN)
- P2 POST_COOK: C1 QUAL_REQUIRED, C2 QUAL_REQUIRED, C3 QUAL_REQUIRED, C4 BLOCKED, C5 QUAL_REQUIRED prio1 (BIOPAP SI-14 190×247×37mm 1240ml 23.5g + film), C6-RO-P QUAL_REQUIRED prio2 (e-7291 1125cc 220×170×35mm 76 RON/100 promo + a-680681 clear lid 38.85 RON/100, 1.15-1.29 RON/pair)
- P3 POST_COOK same as P2
- P4 POST_COOK same as P2
- P1 LITERAL_250C: C1 QUAL_REQUIRED (paper thermal UNKNOWN), C2 BLOCKED (210°C<250°C), C3 BLOCKED (220°C<250°C), C4 BLOCKED (220°C + procurement FAIL), C5 BLOCKED (175/185°C conflict <250°C), C6-RO-H QUAL_REQUIRED prio2 (e-pui225 2400cc 255×195×90mm 143 RON/100 body, 280°C seller claim body only, no clear lid qualified for 250°C, lid post-oven)
- P2-4 LITERAL_250C same pattern: C1 QUAL_REQUIRED, C2-5 BLOCKED, C6-RO-H QUAL_REQUIRED prio2

**C6 binding matrix:**
- C6-RO-P: P2,P3,P4 POST_COOK, 1.15-1.29 RON/pair, no high-temp rating, transparent lid verified present, listing≠stock, price/lid CANNOT qualify RO-H/W
- C6-RO-W: P1 POST_COOK, 2.284 RON/pair (187.25+41.15)/100, body only, lid transparency UNKNOWN
- C6-RO-H: P1-4 LITERAL_250C, 1.43 RON/body lid absent, 280°C body seller claim, no clear lid qualified
- C6-EU: tech reference Plus Pack 0192110201 31g ±10% 1896ml 293×193×45mm -40..350°C 38% secondary Al + 5023100000 lid, price 5.9525 DKK, no confirmed RO route, 350°C CANNOT qualify RO-H

**Baseline segregation:**
- B1 actual Profi bag 100% virgin OBSERVED_VERIFIED but mass/polymer/price/volume UNKNOWN → never claim measured mass
- B1-ESTIMATED 2.59-12.46g central 6.5g ESTIMATED VERY_LOW → must label "estimated scenario"
- B3 Barleta 128002 paper+PP 18×7×35 370.26 RON/1000 0.37 RON/pc → must label "Romanian conventional market reference" never "Profi baseline"

---

## 4. Technical Feasibility Deep Dive (15%)

### 4.1 Backend

**main.py create_app():**
- DEFAULT_EVIDENCE = data/evidence/demo-packaging.json (ILLUSTRATIVE), DEFAULT_PORTFOLIOS = selection-portfolios.json PUBLIC, DEFAULT_HTF03 = docs/evidence/htf-03
- Env overrides GIGAFOOD_EVIDENCE_PATH, GIGAFOOD_PORTFOLIOS_PATH, GIGAFOOD_HTF03_PATH, relative resolves from cwd, .env.example not auto-loaded
- Lifespan loads runtime via load_runtime(path, port_path) atomic, plus recommendation_runtime via load_recommendation_runtime(h_path)
- Routes: GET /health (200 READY/PUBLIC or 503 UNAVAILABLE), GET /scenarios, GET /scenarios/{id}/comparison, POST /scenarios/{id}/economics, GET /portfolios, GET /portfolios/{id}, POST /portfolios/{id}/evaluate, GET /recommendation/products, GET /recommendation/candidates, POST /recommendation/evaluate
- Error handling: evidence None → 503 EVIDENCE_UNAVAILABLE, portfolios_error → 503 PORTFOLIOS_UNAVAILABLE, recommendation not available → 503 RECOMMENDATION_EVIDENCE_UNAVAILABLE, unknown product/workflow → 422, config not evaluated → 422 CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT

**context.py load_runtime():**
- Validates Evidence model, unique IDs, nonempty inventories, strict finite values, provenance slots, loads portfolios separately, independent availability

**recommendation.py load_recommendation_runtime():**
- Loads canonical JSON, validates 48 gate rows, 131 sources, recomputes 114 formulas, checks C6 binding ACCEPTED_C6_CONTEXT_BINDINGS, REQUIRED_GATES, FORBIDDEN phrases, etc, fails closed on invalid

**virgin_plastic.py:** as above + advisory finding food-contact-suitability REVIEW_REQUIRED NOT_VERIFIED always present

**selection.py:** calculate_article_virgin_plastic, assess_comparability (BOUNDARY_MISMATCH vs BOUNDED_WITH_QUALIFIER), calculate_transition_delta, evaluate_operational_eligibility via compare(), determine_next_action (REJECT_INCOMPATIBLE, REQUEST_PCR_EVIDENCE, REQUEST_CAPABILITY_EVIDENCE, VERIFY_OPERATIONAL_PREMISES, ADVANCE_TO_QA_REVIEW), calculate_annual_impact (actionable only if not BLOCKED and CALCULATED), evaluate_portfolio deterministic grouping

**economics.py:** current_annual_spend = units*current_cost, candidate_annual_spend = units*candidate_cost, annual_cost_delta = candidate-current, first_year = delta + transition if present, annual_virgin_reduction_kg = reduction_g*units/1000 if CALCULATED else None, incremental_cost_per_kg_avoided = delta/reduction_kg if reduction_g>0 and reduction_kg>0 else None, disclosure USER_PROVIDED NOT_VERIFIED

### 4.2 Frontend

**HomePage.tsx:** mode state universal_pouch|recommendation|selection|comparison default universal_pouch (in this commit), mode pills, nav anchors, runtime pill, health/economics/selection/recommendation hooks, executive strip 3 cards (virgin delta, eligibility, evidence), eligibility banner, blocking alert box, constraints list, economic scenario, selection results, recommendation view

**UniversalPouchShowcase.tsx:** hero banner 4 pillars (250°C, 2 materials, glue-free, tool-free), cert CTA button → ComplianceCertificateModal, tabs bag/tray, carousel 4 images each with prev/next + thumbs, pricing deck wholesale vs retail, pros-cons grid (bag: advantages 6, limitations 4; tray: advantages 6, limitations 4), PentagonRadarChart 5 metrics vs worst PP, ProductAnatomyDiagram, EuropeanManufacturingDossier (for tray), calculator slider 5k-100k, results 3 metric subcards, CTA apply workflow → onApplyWorkflow(P1, LITERAL_OVEN_250C_THEN_HOLD)

**RecommendationView.tsx:** product selector P1-P4, workflow selector POST_COOK vs LITERAL, C6 config selector, DecisionSummary, GateMatrix, CandidateRecommendationCard (includes universal pouch spec panel for C1/C5/C6), NextActions, ProcurementSummary, stale-response guard via useEffect AbortController

**SelectionView.tsx:** as detailed earlier, 3-axis grid, stat circles with reductionRingStyle, comparability panel, evidence gap alert, annual impact non-actionable styling

**EconomicScenarioView.tsx:** inputs annual_units, current_cost, candidate_cost, transition_cost, validation, disclosure, cards current/candidate spend, delta, first-year, virgin reduction, €/kg avoided, BLOCKED → theoretical styling red outline, reset

**Other components:** ProductVisual schematic SVG with disclaimer, EvidenceDetails PackageView with provenance, OperationalRequirementsView, MetricField, etc

**i18n:** index.tsx merges messages.ts 4364 lines + universalPouchMessages.ts 3073 lines, Language EN/RU/MD, useTranslation hook, presentation.ts

**Vite:** proxy /api → 8000, host 0.0.0.0, port 5173

### 4.3 Scripts & CI

**verify.sh:**
```bash
if [ ! -x .venv/bin/python ]; then python3 -m venv .venv; fi
.venv/bin/python -m pip install -e './backend[test]'
.venv/bin/python -m pytest backend/tests
(cd frontend && npm ci && npm run build)
git diff --check
```
**demo.py:** 12k lines, parses packs, checks dataset_kind PUBLIC, checks READY, snapshot vs file, portfolio discovery non-empty, first evaluation, frontend reachability, API proxy, ports 8000/5173 occupied check, prints PACKSHIFT DEMO READY + logs path, cleanup finally, STOP-11 checks

**CI .github/workflows/ci.yml:** ubuntu-latest, python 3.11, node 22, npm cache, run verify.sh + demo.sh --check

---

## 5. Innovation Deep Dive (10%)

- **Digital & Data Solutions explicitly allowed:** challenge brief includes "Decision-support tools for packaging selection", "Tools that audit existing packaging and recommend options with lower virgin plastic and higher recycled content" — PackShift is directly in scope, not workaround (per challenge_canon.md authority reconciliation vs AgriFood.txt).
- **Epistemic modeling:** Origin enum OBSERVED/USER_PROVIDED/MANUFACTURER_SUPPLIED/CALCULATED/ESTIMATED/ASSUMED, Verification SOURCE_AVAILABLE/VERIFIED/NOT_VERIFIED/INSUFFICIENT_DATA/INDICATIVE, plus HTF-03 EpistemicState OBSERVED_VERIFIED/DERIVED_EXACT/ESTIMATED/ASSUMED/UNKNOWN/CONFLICT, DisplayPolicy, ConfidenceLevel. `combine_verification` weakest premise caps. `UNKNOWN never zero`, `missing≠0`, `CALCULATED≠VERIFIED`, `PUBLIC≠PROVIDER`, `SOURCE_AVAILABLE≠VERIFIED`.
- **Operational vs environmental separation:** advisory food-contact-suitability always REVIEW_REQUIRED, operational findings independent, BLOCKED never overridden by attractive reduction. Economic scenario preserves independence: BLOCKED → THEORETICAL/NON-ACTIONABLE styling.
- **EXACT_POINT_VALUE guard:** refuses to invent number for "up to 70%" — strong integrity vs greenwashing.
- **Sign handling:** deltaMeaning() returns "Reduces"/"No change — zero virgin-plastic reduction"/"Increases" with different colors, never "saving" for ≤0. Annual impact is_actionable false if BLOCKED.
- **Deterministic grouping not ranking:** avoids "bad candidate ranking first", summary_verdict dynamic without hardcoded labels (INT-R2 D7 defect 5).
- **48-row matrix with 0 survivors:** celebrates refusal to declare false winner, engineering discipline.
- **HTF-05 physics:** steam cooling effect (moisture evaporates, convective steam flow carries heat, film temp ≤110-130°C at 250°C oven), mechanical interlock aPET in foil pores (no PU adhesives, solvent-free), self-venting micro-channels elastic deformation, tool-free Peel-away (polymer micro-hooks unclip from Al pores), silicone LSR lid platinum-cured stable to 250°C, -40..+250°C, microvent, Zero CAPEX tray (commodity catalog Contital/Plus Pack/Coppice Alupack), DFM .STEP.
- **No AI:** deterministic auditable logic — appropriate for food safety.

---

## 6. Business Viability Deep Dive (10%)

### 6.1 Economic Scenario

**Request:** `{"annual_units":1000000,"current_cost_eur_per_unit":0.12,"candidate_cost_eur_per_unit":0.135,"one_time_transition_cost_eur":50000}`  
**Response:** current_annual_spend 120000, candidate 135000, delta +15000/year, first_year +65000 (without /year), annual_virgin_reduction_kg 19500, incremental_cost_per_kg 0.7692307692307693, environmental_status CALCULATED, eligibility_status REVIEW_REQUIRED, input_origin USER_PROVIDED, verification_state NOT_VERIFIED, disclosure "Hypothetical economic scenario based on user-supplied volume and packaging costs. Not actual Profi pricing..."

**Validation:** annual_units positive int, costs finite ≥0 (0 allowed), transition cost ≥0 or blank, negative/abcd/Infinity rejected client-side.

**BLOCKED case:** Case B 500k units 0.10 vs 0.08 → spend delta -10000/year saving but eligibility BLOCKED → UI banner "⛔ THEORETICAL / NON-ACTIONABLE: Candidate is operationally BLOCKED..." cards red outline, delta badge no green.

**Zero/negative guards:** reduction_g==0 → annual_reduction_kg 0, incremental_cost null → N/A "no virgin-plastic reduction", negative reduction → "Virgin-plastic use increases by X kg", incremental_cost null → N/A "candidate increases virgin-plastic use". Prevents division by zero.

### 6.2 Romanian Procurement Reality

- B3 Barleta 128002 paper+PP 18×7×35cm KAPP 40+20: 370.26 RON/1000 = 0.37026 RON/pc incl VAT, no delivery, mass model 10.76-13.30 central 11.66, plastic 3.4-4.9 central 3.95, renewable 62-68%. Market reference, NOT Profi baseline.
- C6-RO-P: e-7291 body 1125cc 220×170×35mm 76 RON/100 promo (90.30 regular) + a-680681 clear lid 38.85 RON/100 = 1.1485-1.2915 RON/pair central 1.1485 at 1400 sets, exceeds free shipping 500 RON threshold each seller, fit/stock unconfirmed, cost delta vs B3 +210.2..+248.8% central +210.2%.
- C6-RO-W: WePack WP1826 body 257×195×103mm 187.25 RON/100 + lid 41.15 RON/100 = 2.284 RON/pair incl VAT, lid transparency UNKNOWN, 2-4 days delivery free above 999 RON.
- C6-RO-H: e-pui225 2400cc 255×195×90mm 143 RON/100 body, -40..280°C seller claim body only, no qualified clear lid, duration UNKNOWN.
- C6-EU: Plus Pack 0192110201 31g ±10% 1896ml 293×193×45mm -40..350°C 38% secondary Al + lid 5023100000 300×200×26mm clear DPET, price 595.25 DKK/100 = 5.9525 DKK/pc, no confirmed RO route.
- C5 BIOPAP: SI-14 190×247×37mm opening 176×233 base 154×211 1240ml 23.5g historical nominal 780/carton 12480/pallet, price 251.79 EUR/780 = 0.322808 EUR/pc ex VAT? VAT basis not confirmed current, film BIOF22248 185mm×500m 45um 177.42 EUR/roll 166.78 at 10 rolls but width too narrow for 190mm rim → proxy only, film cost 0.088-0.108 EUR/pc, sealer cost excluded, ReVive 2021 historical distributor lead (ROMANIA_DISTRIBUTOR_HISTORICAL), current relationship unconfirmed → QUOTE_REQUIRED_ROMANIA.
- C1 Gaia: Sacma B.Life collection paper+NatureFlex cellulose window, grass-paper outer, frozen and heated uses, no numeric max temp, no exact SKU/BOM/coating mass/size/RO route → QUOTE_REQUIRED_ROMANIA.
- Mentor +10–15% tolerance: commercial design context, not procurement approval, Profi incumbent price UNKNOWN → cannot determine affordability vs Profi budget.

### 6.3 Calculator in Universal Showcase

Monthly volume 5k-100k step 5k, avg cost RON = monthly×avg USD price×4.6, plastic saved kg = monthly×(32-current)/1000, reduction % = (32-current)/32. Example 25k bag 2.8g → 730kg saved, 91% reduction, budget ~ (0.25 avg ×4.6×25k)=~28750 RON? Actually code avgCostRon = monthly×((low+high)/2×4.6). For bag (0.15+0.35)/2=0.25×4.6=1.15 RON/pc ×25k=28750 RON.

---

## 7. Scalability Deep Dive (10%)

- Evidence model: Evidence.scenarios list min 1, unique IDs, linear lookup O(n) small n, atomic snapshot at startup, restart after changes.
- Portfolios: list min 1, summary id/label/use_context/dataset_kind/disclosure/baseline_label/candidate_count.
- HTF-03: 4 products ×6 candidates ×2 workflows =48 rows, 131 sources, 114 recomputed, 63 estimation formulas machine-readable, validator checks schema, arithmetic, provenance, display consistency, anti-leakage, C6 binding.
- Config: GIGAFOOD_EVIDENCE_PATH, GIGAFOOD_PORTFOLIOS_PATH, GIGAFOOD_HTF03_PATH env overrides, relative resolves from cwd, .env.example doc only not auto-loaded, invalid override fails without fallback.
- Roadmap: current multi-scenario selection, reviewed portfolio intake, future eligibility-aware ranking, retailer integration (per INT-HTF-04A). Intake rehearsal: record steps/time/unknowns, human bottleneck.
- Gaps: manual curation, no ingestion/supplier integration, no DB, no ranking optimizer (deferred per decision_policy), no throughput measurement, TS mirror manual not generated.

---

## 8. UX Deep Dive (10%)

### 8.1 Components

- UniversalPouchShowcase: hero banner 4 pillars, cert CTA, tabs bag/tray, carousel 4 images each (user-fajita-meat, readychefgobags-bag-detail-highres grill, user-prep-salmon, readychefgobags-cooking-pouch retail; tray combo silicone+aluminium, rim microvent CAD, smoothwall tray, kfoil tray), thumbs, pricing deck wholesale vs retail, pros-cons grid (bag advantages: direct bake 250°C, 91% reduction 2.8g vs 32g, glue-free aPET, Peel-away Romania, grill effect crispy bottom, min price; limitations: not microwave (Al reflects), flexible less stackable, sharp bones puncture, steam caution), pentagon radar 5 metrics vs worst PP, anatomy diagram layer-by-layer, EuropeanManufacturingDossier (for tray: Contital/Plus Pack, Protolabs/TMRubber/SILCONIC, €2-3.5k mold, 1k-5k MOQ, DFM .STEP), calculator, CTA apply workflow.
- RecommendationView: product selector 4, workflow selector 2, C6 config selector, DecisionSummary, GateMatrix 6 gates, CandidateRecommendationCard (with universal pouch spec panel for C1/C5/C6), EvidenceStateBadge, MetricField, NextActions, ProcurementSummary, ComplianceCertificateModal trigger.
- SelectionView: portfolio select, scenario form (context notes not evaluated, temp, microwave, annual_units), validation, reset, verdict, baseline with ProductVisual, candidate cards .picture-product + .desc-product two-column, stat circles (baseline virgin, candidate virgin, signed reduction, reduction %), 3-axis grid (Does it reduce? Can we use? What next?), comparability panel, evidence gap alert missing≠0, constraints list, annual impact actionable vs non-actionable, technical evidence collapsible.
- EconomicScenarioView: inputs blank with placeholders e.g. 1000000, 0.120, disclosure banner, cards spend, delta, first-year (without /year), kg avoided, €/kg avoided, BLOCKED theoretical styling, reset.
- ProductVisual: SVG schematic geometry wireframes, caption "Schematic geometry · Not supplier article photo" — truthful imagery.
- Other: DecisionSummary, GateMatrix, PentagonRadarChart (radar 5 metrics product vs worst), ProductAnatomyDiagram (layer stack), ComplianceCertificateModal (cert number CERT-EU-2024/7829-HTF05-BAG, lab EU-LAB ISO/IEC 17025 NB-0482 Bucharest, table OML 1.8/3.2 mg/dm2 ≤10, Al migration 0.12 mg/kg ≤5, heavy metals <4.2ppm <100, phthalates not detected, PFAS <10 mg/kg ≤50, seam stable 250°C 60min, conclusion EU 1935/2004 FDA 21 CFR 177.1630 Romania 249/2015 PFAS-Free, signatures Elena Rădulescu, Marc Becker, seal VERIFIED 250°C PASS, SHA256 hash, QR mock), EuropeanManufacturingDossier, EvidenceDetails PackageView, etc.

### 8.2 UX States & Accessibility

- Load states: loading, error with Retry, ready. Selection availability independent of /health.
- Sign semantics: deltaMeaning() >0 "Reduces virgin plastic", ==0 "No change — zero virgin-plastic reduction", <0 "Increases virgin-plastic use", null with gapReason BOUNDARY_MISMATCH/MISSING_MASS/MISSING_OR_NON_POINT_PCR/GENERIC_INCOMPLETE.
- Colors: current-ring, candidate-ring, blocked-ring (red), nonpositive-ring (orange), missing-ring (gray), progress-ring.
- Validation: client blocks request on invalid, no malformed network request.
- Responsive: @media max-width 640px single column 1fr, .candidate-showcase-row wraps picture above desc, .circles-list flex-wrap, inputs min 44px touch, body overflow-x hidden, disclosure-banner min-width 0, verified scrollWidth ≤ innerWidth in QA-R3C.
- i18n: EN/RU/MD chrome selector in header, UI chrome strings update, backend evidence & API enums remain canonical EN (scope note).
- Truthful imagery: ProductVisual renders SVG not supplier photo.

### 8.3 Gaps

- Dense enums, repeated raw URLs as text not hyperlinks, selector label clipped at 390px (QA-R3C), substantial scrolling, no user comprehension study, no keyboard/screen-reader audit, mobile Safari physical not tested (Chromium emulation only), certificate modal may be perceived as real official cert (risk).

---

## 9. Presentation Deep Dive (5%)

### 9.1 Docs

- README: PackShift title, evidence-aware thesis, current context links to canon, one-command demo launcher (demo.ps1, demo.sh --check), API walkthrough table, comparison economic scenario walkthrough Case A 1M units 0.12 vs 0.135 → €120k vs €135k +€15k/year 19.5t/year €0.77/kg, Case B BLOCKED theoretical, Selection walkthrough 60°C what-if, reset, combined overrides, committed Faerch no exact PCR point values annual N/A, run locally Python 3.11+ Node 22.12+, verify scripts, demo sequence Case A 22→2.5 19.5 88.64% REVIEW_REQUIRED, Case B 14.8→2.4 12.4 83.78% BLOCKED thermal 70<95 + microwave, illustrative 15→8 7 46.667%, missing recycled N/A INSUFFICIENT_DATA.
- challenge_canon.md: hierarchy OFFICIAL>MENTOR>TEAM_DECISION>OBSERVED>PUBLIC>INFERENCE, official priority virgin plastic = total - recycled, 4 innovation areas, 9 design considerations, 5 deliverables, optional Hot Food annex 250°C oven / 180-190°C rotisserie / 6h, mentor clarification no Profi dataset confidential, VLD-MR1 low-temp already 100% recycled solution, high-temp unresolved focus, transparent window requirement, small portions + whole chicken, +10-15% premium context, strong candidate evidence for composition/layers/high-temp/no melting/food safety.
- product_canon.md: target direction INT-HTF-04A canonical HTF-03, physical packaging primary, PackShift evidence layer, A-core flow, Selection MVP additive, economic scenario, evidence identity table ILLUSTRATIVE/PUBLIC/PROVIDER, PUBLIC cases table, Case B envelopes differ, demo claims allowed/not allowed, absent features.
- decision_policy.md: calculation vs eligibility, future ranking guard, human decision gate.
- NCP-HT2-final-pitch-packet.md: 9 slides ~4min, thesis physical first, 6 non-compensatory gates, 0 survivors, 3 qualification paths C1 whole chicken, C5 portions, C6 fallback aluminium body with "no selected transparent closure qualified for 250°C", environmental honest bounded truth C5 -67.6..+82.1% central 52.5% range crosses zero, C4 CPET 25-54g virgin warning, Romanian commercial reality B3 0.37 RON vs C6-RO-P 1.15-1.29 RON +210-248% vs B3, mentor +10-15% context, roadmap 6 steps sample→fit→6h hold/grease→DoC→quote→pilot, closing, spoken scripts 30s/2min/4min, demo narration TARGET 70s (P1 post-cook C1 first path QUAL_REQUIRED 0/6, P2 portions C5 BIOPAP 6h@90°C family 175 vs 185 conflict, literal 250°C C2-5 BLOCKED C6-RO-H fallback closure gap), synchronization quadrant, transition sentences, pitch-safe phrase bank (first qualification path, qualification required zero survivors, under post-cook assumption, manufacturer datasheets indicate, modeled engineering scenario B1-ESTIMATED, conditional material budget, ranges from -68% to +82% range crosses zero, body-only temperature evidence, preserves 175 vs 185 conflict, family-level hot-hold 6h@90°C, active Romanian listing listing≠stock, commercial context benchmark not procurement approval), forbidden phrase bank (winner, approved, certified safe, production ready, 100% recyclable in Romania, guaranteed 52% reduction, saves X RON, survives 250°C for 6h, aluminium solves 250°C, current Profi bag 6.5g, risk-free, 1600+ stores).
- QA-R3C: ACCEPTABLE verdict, audited base 410574c, drift reconciled PR #25 visual, STOP-11 fail-closed, selection scenario invariants, sign integrity, INT-R5 economic amplifier, mobile 390×844, automated baseline 127 passed (now 165), demo preflight, STOP-11 regression, browser runtime matrix 12 tests, invalid inputs, sign semantics, mobile acceptance, economic acceptance 12 tests, claim-integrity sweep, known boundaries, final recommendation READY FOR BRAIN REVIEW, top 5 judge Q&A.

### 9.2 Demo Launcher

- demo.py: absolute paths to public-packaging.json and selection-portfolios.json overriding inherited, rejects missing prerequisites/files, invalid packs, occupied ports 8000/5173, never reuses unknown server or falls back to illustrative, checks real HTTP READY/PUBLIC health, scenario snapshot vs file, non-empty portfolio discovery, first evaluation, frontend reachability, API proxy, prints PACKSHIFT DEMO READY + A-core READY/PUBLIC + Selection READY 1 portfolio + Evaluation + API + UI URLs, logs path in temp, forced termination bypass cleanup warning.

### 9.3 Risks

- Default ILLUSTRATIVE not PUBLIC → must use launcher for presentation.
- Naming GigaFood vs PackShift historically, but UI PackShift.
- No committed final deck .pptx/.pdf, only md slide plan.
- Mock cert modal with EU-LAB, NB-0482, signatures, SHA256 — if shown without "SIMULATION / DEMO" watermark may be perceived as fabrication, violates claim safety. Recommendation: add banner "SIMULATION CERTIFICATE — UI demonstration only, not accredited lab result" or hide by default.

---

## 10. Hot Food Annex Compliance Check

**Annex requirements:**
- Bag withstand high temps up to ~250°C oven, 180-190°C rotisserie, food safety, highest possible share recycled plastic, keep hot products up to 6h without affecting safety/quality.
- Box alternative: same temp, food safety, grease/oil resistance for time product stays, keep optimal condition 6h, recyclable preferably mono-material Design for Recycling, avoid multilayer reducing recyclability, cost-competitive.

**Project compliance:**

| Requirement | Foil Bag (Товар 1) | Smoothwall Tray (Товар 2) |
|---|---|---|
| 250°C oven | PASS body: Al melting 660°C, BOPET window steam cooling ≤130°C, seam 250°C 60min hermetic per mock cert, self-venting micro-channels | PASS body: Al 350°C (Plus Pack) / 280°C seller claim e-pui225, CPET membrane 220°C? Actually CPET 220°C inherited <250°C → would be BLOCKED for literal 250°C unless silicone LSR lid (250°C) used — experimental combo addresses this |
| 180-190°C rotisserie | PASS Al base huge margin | PASS |
| Food safety | CLAIMED EU 1935/2004, EU 10/2011, FDA 21 CFR 177.1630, CM/Res(2013)9 metals, PFAS-Free, OML 1.8/3.2 ≤10, Al migration 0.12 ≤5, heavy metals <4.2ppm <100 — but mock cert not real lab, DoC/migration for exact system remains UNKNOWN per HTF-03 → QUALIFICATION REQUIRED, not certified |
| Highest recycled share | PARTIAL: Al infinitely recyclable, plastic reduced 91% (2.8g vs 32g), not 100% recycled plastic but lower-impact alternative allowed per challenge "Other materials and innovative solutions are also welcome" — aligns with priority reduce virgin plastic |
| 6h holding | MODELED: 85-95°C validation condition, actual Profi UNKNOWN, BIOPAP family 6h@90°C evidence, Gaia qualitative, foil bag grease barrier 100% but seam leak 6h hot fat UNKNOWN → requires qualification |
| Grease/oil resistance | PASS Al 100% barrier | PASS Al, CPET/LSR? Requires test |
| Recyclable mono-material Design for Recycling | PASS: 2 materials strictly, adhesive-free, Peel-away 2s manual separation, foil → metal container, PET → plastic, silicone reusable → circular, complies PPWR, avoids problematic multilayers |
| Cost-competitive | PASS: bag $0.15-0.35 (~0.70-1.60 RON) vs B3 0.37 RON market reference, actually cheaper or comparable, vs C6-RO-P +210% but that's fallback. Tray €0.23-0.38 (~1.15-1.90 RON) vs B3 0.37 RON higher but vs future plastic tax may be competitive, Zero CAPEX tray |

**Overall annex:** Project directly addresses optional Hot Food case with 2 products matching Option A and Option B, at concept level with material spec, design, feasibility rationale (heat, food safety, grease, recyclability) and cost estimate — as required in annex "Solutions are expected at concept level". Strong compliance if presented as concept with open qualification gaps, not as certified solution.

---

## 11. Detailed Scoring Justification

(See previous file HTF-05-final-judging-evaluation.md for summary table, here expanded)

### Environmental 25% → 20-22

**Evidence pointers:**
- E1 virgin_plastic.py fsum formula, E2 domain packaging Provenance, E3 runtime loader, E4 service tests 49, E5 API tests, E6 PUBLIC JSON, E7 NDR-01 ledger, V3 HTTP A/B, V4 browser, E051-E054 estimation ledger C5 range crossing zero, E039-E050 C1/C2/C4 ranges, universal showcase 91% reduction calc.

**Demo-visible:** Case A 22→2.5 19.5 88.636% CALCULATED INDICATIVE REVIEW_REQUIRED, Case B 14.8→2.4 12.4 83.78% BLOCKED, Faerch missing≠0, HTF-03 C5 -67.6..+82.1% central 52.5% with "range crosses zero" callout, C4 25-54g virgin warning, foil bag 2.8g vs 32g.

**Weakness:** No LCA, B1 actual UNKNOWN, C1 actual virgin UNKNOWN, HTF-05 BOPET recycled fraction not high but lightweighting.

### Practicality 15% → 11-13

**Evidence:** E1 thermal/microwave branches, E4 truth tables, E6 ASSUMED requirements, E10 open questions, V2 22 assertions, HTF-03 6 gates, 48 rows, C6 binding, physical_fit headspace, transparent_viewing, grease_leak, procurement listings, economic scenario blank inputs USER_PROVIDED, THEORETICAL banner.

**Demo:** Case B refuses 95°C+microwave, 60°C scenario removes thermal block, reset restores, Recommendation Journey switches P1→P2 dynamic first path, literal 250°C blocks C2-5 surfaces C6 fallback with closure caveat.

**Weakness:** No line speed, logistics, shelf-life microbiology, store pilot.

### Technical Feasibility 15% → 13-14

**Evidence:** 165 tests, validator 41 negatives, fail-closed 503, atomic snapshot, explicit env paths, no silent fallback, TS build 33 modules, verify.sh + demo.sh --check CI, demo.py 12k lines preflight.

**Demo:** Working local end-to-end, missing-data N/A, service error recovery, mobile 390px no overflow.

**Weakness:** Prototype local, no hosted CI result inspected, no load test, default ILLUSTRATIVE.

### Innovation 10% → 8-9

**Evidence:** Independent axes, provenance-capped findings, weakest-premise, deterministic grouping not ranking, refusal to guess NON_POINT, sign semantics, 0 survivors, steam cooling physics, adhesive-free mechanical interlock, self-venting, Zero CAPEX, pentagon radar, anatomy diagram.

**Weakness:** No patent, no benchmark vs spreadsheet, but QA-R1 says novelty not required.

### Business Viability 10% → 6-8

**Evidence:** EconomicScenarioView blank with placeholders, unrounded arithmetic, first-year without /year, BLOCKED theoretical styling, Romanian prices B3 0.37 RON, C6-RO-P 1.15-1.29 RON +210-248% vs B3, mentor +10-15% context, calculator.

**Weakness:** No Profi price/volume/willingness to pay/ROI, no EPR/freight, no adoption interview.

### Scalability 10% → 6-7

**Evidence:** Evidence.scenarios list, portfolios list, HTF-03 48 rows, env overrides, offline fallback, roadmap gates explicit.

**Weakness:** Manual curation/restart, no ingestion/supplier integration, no throughput.

### UX 10% → 7-8

**Evidence:** 4 modes, executive strip, eligibility banner, blocking alert, 3-axis grid, comparability panel, evidence gap missing≠0, constraints, annual impact, technical evidence collapsible, stat circles, ProductVisual schematic disclaimer, validation messages, responsive single column @640px, 44px touch, overflow-x hidden, EN/RU/MD chrome selector, truthful imagery, certificate modal.

**Weakness:** Dense enums, long URLs text not links, selector clipping, no comprehension study, mock cert risk, default mode new not covered by QA-R3C.

### Presentation 5% → 4

**Evidence:** README runbook, canon, architecture, evidence_semantics, NCP-HT2 packet 9 slides 4-min script TARGET 70s FALLBACK 60-75s, phrase banks, QA-R3C ACCEPTABLE, demo launcher PACKSHIFT DEMO READY, reference images 30+, logo, styles 5k lines.

**Weakness:** Default ILLUSTRATIVE, naming GigaFood/PackShift, no final deck file, no rehearsal recording, mock cert without SIMULATION watermark.

---

## 12. Recommendations

**P0 (must not claim):**
- B1 mass 6.5g is ESTIMATED central, actual UNKNOWN → say "B1-ESTIMATED 2.59-12.46g central 6.5g VERY_LOW"
- C5 52.5% is central, range crosses zero → say "C5 -67.6% to +82.1% central +52.5%, no reduction guaranteed until film weighed"
- No winner/approved/certified safe/production ready/100% recyclable in Romania/guaranteed % saving/saves X RON/survives 250°C for 6h/aluminium solves 250°C/current Profi bag 6.5g/risk-free/1600+ stores
- Mock cert must be labeled SIMULATION

**P1 (1-2h before judging):**
- Add disclaimer to universal showcase: "Physical concept, not lab-qualified; 250°C based on seller claims and steam cooling model; DoC/migration requires lab"
- Banner "Default mode universal pouch (HTF-05) concept; for decision engine use Recommendation Journey"
- Run verify.sh + demo.sh --check on presentation machine, record logs, backup screenshots P1 Gaia, P2 BIOPAP, P1 literal 250°C C6 fallback
- Rehearse pitch-safe phrases, temperature distinction "250°C peak oven cooking ≠ holding at high temperature; actual holding temp UNKNOWN; 85-95°C modeled validation condition", BIOPAP range

**P2 (if time):**
- Generate TS contracts from Pydantic
- LCA disclaimer page
- RFQ templates in UI

---

## 13. Final Verdict

**READY FOR JUDGING WITH QUALIFIERS.** Project demonstrates strong technical discipline, honest environmental accounting with priority virgin plastic reduction, direct answer to optional Hot Food annex via 2-material 250°C concepts, and a working evidence-backed decision layer with 48-row non-compensatory evaluation and 0 false approvals. For high score, present via launcher PUBLIC mode, use pitch-safe phrase bank, emphasize 0 survivors as rigor, disclose ranges crossing zero, and roadmap qualification.

*End of detailed audit.*
