# NCP-HT1 — Authoritative Pitch Claim & Evidence Matrix

**Document:** Authoritative Claim-to-Evidence Traceability Ledger
**Role:** Pitch / Presentation / Data Narrative (Nicolae)
**Accepted Base:** `main @ e067764d334e260440ed69ae6d68dab42205b3a4`
**Canonical Evidence Baseline:** `docs/evidence/htf-03/**`

---

## 1. Epistemic Classification Scheme

Every statement used in the pitch, slides, demo, or judge Q&A is classified using the canonical proof hierarchy:

| State | Definition & Boundary |
|---|---|
| `OFFICIAL_REQUIREMENT` | Explicitly stated in the official AgriFood Hackathon challenge rules/brief. |
| `MENTOR_CLARIFICATION` | Explicitly attributed to the Profi mentor clarification session (VLD-MR1). |
| `OBSERVED_EVIDENCE` | Sourced directly from canonical HTF-03 datasets, manufacturer datasheets, seller listings, or standards. |
| `DERIVED_EXACT` | Deterministic mathematical calculation from exact observed numbers (e.g. price per unit from pack total). |
| `ESTIMATED` | Bounded engineering model with explicit assumptions (low, central, high). Never a single point fact. |
| `ASSUMED` | Plausible operational hypothesis adopted by Team SoS (e.g. post-cook workflow); not sponsor-confirmed. |
| `IMPLEMENTED_PENDING_INTEGRATION` | Verified on feature branch (e.g. IGR-HT2 PR #35); pending integration to accepted base `main @ e067764d`. |
| `DEMO_VERIFIED` | Verified as visibly rendered in the live UI presentation. |
| `UNKNOWN` | Fact is not established by evidence. Proactively acknowledged as a gap. |
| `CONFLICT` | Two competing values exist in official literature without mutual cancellation. |

---

## 2. Master Claim Ledger

| Claim ID | Pitch Wording | Slide / Demo | Candidate / Config | Metric / Requirement | Evidence Source | State | Scope | Confidence | Allowed? | Qualifier | Forbidden Stronger Version |
|---|---|---|---|---|---|---|---|---|:---:|---|---|
| **CLM-001** | *"Profi's incumbent hot-deli package is effectively 100% virgin plastic; cold packaging reportedly uses 100% recycled plastic."* | Slide 1, 2, 6 | B1 | Baseline recycled fraction | Task Canon / VLD-MR1 | `MENTOR_CLARIFICATION` | CONFIGURATION | MEDIUM | **YES** | Refers to plastic fraction only; exact mass/dimensions unmeasured; low-temperature reported working solution. | *"Profi uses 100% non-recyclable toxic plastic."* |
| **CLM-002** | *"Profi's actual bag mass, dimensions, and unit costs are confidential and unmeasured."* | Slide 6, 7, 8 | B1 | Baseline mass & price | Challenge Canon / NDR-01 | `UNKNOWN` | SYSTEM | HIGH | **YES** | No proprietary provider dataset supplied. | *"Profi's current bag weighs 6.5 grams and costs 0.30 RON."* |
| **CLM-003** | *"Our estimated baseline scenario models a PET/PA-like bag at 2.6 to 12.5 g (central 6.5 g)."* | Slide 6, Demo | B1-ESTIMATED | Baseline mass scenario | S17, E001, E002 | `ESTIMATED` | SCENARIO | VERY_LOW | **YES** | Engineering model based on local commercial bag geometries; not Profi data. | *"Current Profi bag weighs 6.5 g."* |
| **CLM-004** | *"A conventional Romanian rotisserie market bag (Barleta 128002) costs 0.37026 RON incl. VAT."* | Slide 7 | B3 | Market reference price | S17, E006 | `DERIVED_EXACT` | CONFIGURATION | MEDIUM | **YES** | 1,000-pack price on Barleta web store; market reference, NOT Profi's packaging. | *"Profi pays 0.37 RON for rotisserie bags."* |
| **CLM-005** | *"B3 market bag modelled mass is 10.8 to 13.3 g (central 11.7 g); virgin plastic 3.4 to 4.9 g."* | Slide 6, 7 | B3 | Market reference mass/plastic | S17, E003, E004 | `ESTIMATED` | CONFIGURATION | VERY_LOW | **YES** | Paper+PP bag model based on published KAPP GSM. | *"Barleta bag has exactly 3.9 g of plastic."* |
| **CLM-006** | *"B2 virgin all-plastic commercial hot-food market bag remains unresolved in Romania."* | Slide 4, 7 | B2 | Virgin plastic benchmark | R3, R4 | `UNKNOWN` | REGIONAL | LOW | **YES** | Exact virgin plastic bag with confirmed Romanian delivery not identified. | *"B2 is available across Romania."* |
| **CLM-007** | *"Sacma Gaia is our first qualification path for P1 Whole Chicken under post-cook workflow."* | Slide 4, 5, Demo | C1 | Qualification priority | S01, S02, HTF-03 Gate | `OBSERVED_EVIDENCE` | ARCHETYPE | MEDIUM | **YES** | First qualification path; status is QUALIFICATION REQUIRED, not approved. | *"Sacma Gaia is the winning package for whole chicken."* |
| **CLM-008** | *"Gaia estimated pack mass is 14.6 to 26.6 g (central 19.7 g); actual plastic mass is UNKNOWN."* | Slide 6, Demo | C1 | Total & plastic mass | S01, S02, E010, E011 | `ESTIMATED` | ARCHETYPE | LOW (mass) / VERY_LOW (model) | **YES** | Based on material area model; actual coating/liner plastic mass is unmeasured. | *"Gaia reduces plastic by 70%."* |
| **CLM-009** | *"Gaia combines renewable kraft paper with a NatureFlex cellulosic transparent window."* | Slide 4, 5 | C1 | Material & transparency | S01, S02 | `OBSERVED_EVIDENCE` | FAMILY | MEDIUM | **YES** | Certified industrial compostable cellulose film; viewing area/fogging unmeasured. | *"Gaia window is 100% anti-fog and indestructible."* |
| **CLM-010** | *"Gaia has no verified numeric thermal limit, 6h holding data, or confirmed Romanian route."* | Slide 4, 8 | C1 | Thermal & procurement gaps | S01, S02, R1 | `UNKNOWN` | SYSTEM | HIGH | **YES** | Requires factory RFQ, layer GSM confirmation, and deli hot-hold testing. | *"Gaia easily handles 220°C."* |
| **CLM-011** | *"Sira-Cook Siralon 21 is a nylon cook-in comparator rated up to 210°C; duration unknown."* | Slide 4, Demo | C2 | Comparator thermal | S03 | `OBSERVED_EVIDENCE` | GRADE | MEDIUM | **YES** | Sirane datasheet rating for grade; hold duration and 6h performance unverified. | *"Siralon 21 is approved for 250°C."* |
| **CLM-012** | *"Siralon 21 is 100% virgin nylon; modelled mass is 4.3 to 10.2 g (central 5.7 g)."* | Slide 6 | C2 | Material & plastic mass | S03, E013, E014 | `ESTIMATED` | SCENARIO | VERY_LOW | **YES** | Entire pack is plastic; does not eliminate virgin plastic over lightweight bags. | *"Siralon reduces plastic because it is thin."* |
| **CLM-013** | *"Cryovac Oven Ease current EU platform has a 220°C rating; exact current EU grade is unresolved."* | Slide 4 | C3 | Comparator thermal | S04 | `OBSERVED_EVIDENCE` | PLATFORM | LOW | **YES** | Sealed Air current UK/EMEA site; US 204°C/4h data explicitly excluded. | *"Cryovac Oven Ease is certified for 250°C."* |
| **CLM-014** | *"Faerch Evolve CPET rigid tray track is marked Inactive; not currently orderable in Romania."* | Slide 4, 7 | C4 | Commercial availability | S05, S06, R3 | `OBSERVED_EVIDENCE` | EXACT_SKU | MEDIUM | **YES** | Article 2227022094 marked inactive; complete system not available in Romania. | *"Faerch CPET is ready for store rollout."* |
| **CLM-015** | *"Faerch CPET rigid container has high PCR (69–75% body), but total pack mass is 64 to 90 g."* | Slide 6 | C4 | PCR & total mass | S05, S06, E015, E016 | `ESTIMATED` | SYSTEM | LOW | **YES** | High PCR does not offset high rigid mass; virgin plastic mass is 25.3–54.1 g. | *"Faerch CPET is the greenest solution because it has 75% recycled plastic."* |
| **CLM-016** | *"BIOPAP LC SI-14 is our first qualification path for P2–P4 portion trays under post-cook hold."* | Slide 4, 5, Demo | C5 | Qualification priority | S07, S10, HTF-03 Gate | `OBSERVED_EVIDENCE` | ARCHETYPE | MEDIUM | **YES** | Compact cellulose tray (1240 ml) with heat-sealable transparent film. | *"BIOPAP is the certified portion tray winner."* |
| **CLM-017** | *"BIOPAP SI-14 tray nominal mass is 23.5 g; complete pack with film is estimated at 23.4 to 30.2 g."* | Slide 6, Demo | C5 | Package mass | S10, S11, E017 | `ESTIMATED` | SYSTEM | LOW | **YES** | Tray nominal 23.5 g; film and ancillary allowance modelled. | *"BIOPAP pack weighs exactly 26.6 grams."* |
| **CLM-018** | *"BIOPAP public documentation contains a conflict: 175°C / 60 min vs 185°C / 60 min oven limit."* | Slide 4, 8 | C5 | Peak thermal conflict | S07, S08, S11, S16 | `CONFLICT` | FAMILY | HIGH | **YES** | Preserved openly; supplier written confirmation required before baking in tray. | *"BIOPAP withstands 185°C." (without mentioning 175°C conflict)* |
| **CLM-019** | *"BIOPAP publishes family-level hot-hold evidence up to 6h at 90°C and 5h at 100°C."* | Slide 4, 5 | C5 | Hot holding claim | S09, S13 | `OBSERVED_EVIDENCE` | FAMILY | MEDIUM | **YES** | Applies to LC family catering system; SI-14 + film + store chicken fat unvalidated. | *"BIOPAP is certified food-safe for 6 hours for Profi."* |
| **CLM-020** | *"Under conditional film budget, BIOPAP virgin plastic delta vs B1-ESTIMATED is −68% to +82%."* | Slide 6, Demo | C5 | Virgin plastic reduction | E051 | `ESTIMATED` | SCENARIO | VERY_LOW | **YES** | Budget assumes tray plastic-free and counts film as plastic; range crosses zero. | *"BIOPAP guarantees a 52.5% reduction in virgin plastic."* |
| **CLM-021** | *"BIOPAP Romania route is historical (ReVive 2021); direct BIOPAP/Mixpack RFQ required today."* | Slide 7 | C5 | Romanian procurement | S12, R4 | `OBSERVED_EVIDENCE` | ROUTE | MEDIUM | **YES** | ReVive distribution documented in 2021; current 2026 stock not verified. | *"BIOPAP has a local warehouse in Bucharest."* |
| **CLM-022** | *"Aluminium architecture (C6) requires separate configuration bindings for every claim."* | Slide 4, 5, 7 | C6 | Architectural integrity | HTF-03 Invariants | `OFFICIAL_REQUIREMENT` | SYSTEM | HIGH | **YES** | Never combine RO-P price with RO-H heat limit or EU recycled content. | *"Aluminium costs 1.15 RON and withstands 350°C."* |
| **CLM-023** | *"C6-RO-P portion pack (729 body + a-680681 lid) costs 1.15 to 1.29 RON incl. VAT per pair."* | Slide 7 | C6-RO-P | Romanian portion cost | S20, S22, S23, E021 | `ESTIMATED` | CONFIGURATION | MEDIUM | **YES** | 1,400-pair order scenario exceeding free delivery thresholds; cross-seller fit assumed. | *"Aluminium packaging costs 1.15 RON everywhere."* |
| **CLM-024** | *"C6-RO-P is +210% to +249% more expensive than conventional Romanian market bag (B3)."* | Slide 7 | C6-RO-P | Cost delta vs market | E059 | `DERIVED_EXACT` | COMPARISON | MEDIUM | **YES** | Derived against B3 Barleta reference (0.37026 RON); Profi B1 delta unknown. | *"Aluminium costs only slightly more than Profi's current pack."* |
| **CLM-025** | *"C6-RO-H (e-pui225) has a 280°C seller claim for body only; duration and clear closure UNKNOWN."* | Slide 5, Demo | C6-RO-H | High-temp oven fallback | S19 | `OBSERVED_EVIDENCE` | BODY_ONLY | LOW | **YES** | 2400 ml body only; transparent lid cannot enter 250°C oven and is unselected. | *"Aluminium solves the 250°C oven requirement completely."* |
| **CLM-026** | *"C6-RO-W (WePack 803261+803262) costs 2.284 RON incl. VAT; lid transparency is unknown."* | Slide 7 | C6-RO-W | Whole-chicken aluminium | S18, E020 | `DERIVED_EXACT` | CONFIGURATION | LOW | **YES** | Local paired listing; lid material and clarity unverified. | *"WePack provides a clear whole-chicken aluminium container."* |
| **CLM-027** | *"Under literal 250°C oven workflow, C2, C3, C4, and C5 evaluate to BLOCKED; C1 Gaia remains unresolved."* | Slide 5, Demo | C2, C3, C4, C5, C1 | Gate evaluation at 250°C | HTF-03 Gate Matrix | `OBSERVED_EVIDENCE` | WORKFLOW | HIGH | **YES** | Evaluated in canonical HTF-03 dataset (also verified on IGR-HT2 branch / pending integration). Candidates with tested limits below 250°C evaluate to BLOCKED; C1 Gaia has UNKNOWN numeric peak limit and remains QUALIFICATION REQUIRED (unprioritized). C6-RO-H surfaces as high-temperature body fallback. | *"Gaia is immediately blocked at 250°C."* |
| **CLM-028** | *"None of the 48 canonical product/workflow/candidate combinations is a fully qualified survivor today."* | Slide 4, 8 | All Candidates | Qualification status | HTF-03 Gate Matrix | `OBSERVED_EVIDENCE` | SYSTEM | HIGH | **YES** | Evaluated in canonical HTF-03 dataset (also verified on IGR-HT2 branch / pending integration). 28 rows are QUALIFICATION REQUIRED; 20 are BLOCKED; 0 qualified survivors. | *"We have selected and qualified the final packaging."* |
| **CLM-029** | *"Mentor indicated +10–15% packaging cost tolerance could be acceptable for sustainability."* | Slide 7 | Business Context | Commercial tolerance | VLD-MR1 | `MENTOR_CLARIFICATION` | SYSTEM | MEDIUM | **YES** | Design context and negotiation benchmark; NOT a procurement approval threshold. | *"Profi has agreed to pay 15% more for any green packaging."* |
| **CLM-030** | *"Material-only CO₂ calculations are indicative engineering models, not complete product LCAs."* | Slide 6 | Environmental | Carbon accounting | S34, S35, S36, S39 | `ESTIMATED` | METHODOLOGY | LOW | **YES** | Covers resin/material extraction only; omitted from public pitch headlines. | *"Our packaging reduces carbon footprint by 60% according to LCA."* |

---

## 3. Claim Audit Invariants

To maintain machine-verifiable integrity, the following rules apply to any text generated from this matrix:

1. **No point value for unmeasured properties:** Whenever `B1-ESTIMATED`, `C1`, or `C5` mass/plastic is cited, it MUST appear with its interval or the qualifier *"modelled scenario"*.
2. **Zero-crossing integrity:** The C5 virgin plastic comparison with B1-ESTIMATED MUST be stated as a range spanning negative to positive (`−67.6% to +82.1%`), never as the central estimate alone (`+52.5%`).
3. **No cross-configuration borrowing for C6:** C6-RO-P price (1.15 RON) must never be presented alongside C6-RO-H temperature (280°C) or C6-EU recycled content.
4. **Body vs System boundary:** High temperature ratings for C4 (220°C), C5 (175/185°C), C6-RO-H (280°C), and C6-EU (350°C) apply strictly to tray bodies; closures are separately qualified.
5. **Epistemic truth in Q&A:** Any question regarding certification, approval, or rollout readiness must immediately reference `QUALIFICATION REQUIRED` and cite the outstanding qualification actions.
