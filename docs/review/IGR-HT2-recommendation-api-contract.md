# IGR-HT2 — HTF-03 Recommendation Runtime & Additive API Contract

**Work Class:** CORE / RUNTIME / RECOMMENDATION API & CONTRACT  
**Owner:** Igor (Backend / Domain Lead)  
**Target Reviewer:** Denis (Frontend Lead / System Integrator)  
**Document Version:** 1.0.0  
**Target Repository:** `Slave-of-Skynet/gigafood`  
**Base Commit:** `e067764d334e260440ed69ae6d68dab42205b3a4` (`main`)  
**Branch:** `feat/igr-ht2-recommendation-runtime`  
**Status:** IMPLEMENTED & VERIFIED  

---

> [!IMPORTANT]
> **EPISTEMIC BOUNDARY, HARD GATES & ANTI-GREENWASHING MANDATES**
> 1. **Epistemic Discipline:**
>    - `UNKNOWN ≠ 0` (absence of evidence is never evidence of zero).
>    - `ESTIMATED ≠ VERIFIED` (estimates retain explicit formulas, assumptions, confidence, and sensitivity).
>    - `CALCULATED ≠ VERIFIED` (arithmetic derived from unverified inputs remains bounded).
>    - `SOURCE_AVAILABLE ≠ VERIFIED` (a supplier document is not independent proof).
> 2. **Non-Compensatory Hard Gates:**
>    - Packaging must satisfy all operational, safety, and physical criteria. High recycled content or low plastic weight CANNOT compensate for thermal failure, grease leakage, migration non-compliance, or dimensional mismatch.
>    - **All 48 matrix rows** (4 products × 2 workflows × 6 candidates) in HTF-03 have `qualified_survivor: false` and `approved_for_procurement: false`. No candidate is currently certified for commercial rollout without physical laboratory qualification.
> 3. **Zero Carbon/Eco-Score Leakage:**
>    - `material_only_co2e_kg` is strictly internal to exploratory research ledgers and is **FILTERED OUT** of all API models, responses, and TypeScript interfaces.
>    - No aggregated `eco_score` or `carbon_score` is computed or served.
> 4. **C6 Configuration Binding Invariant:**
>    - Candidate C6 (Forest Packaging molded fiber) has 4 distinct regional/functional configurations (`C6-RO-P`, `C6-RO-W`, `C6-RO-H`, `C6-EU`).
>    - `C6-RO-W` is strictly bound to P1 under post-cook hot hold.
>    - `C6-RO-P` is strictly bound to P2, P3, P4 under post-cook hot hold.
>    - `C6-RO-H` is strictly bound to literal 250°C oven workflows.
>    - `C6-EU` is unrepresented in Romanian retail inventory and uncalibrated for active evaluation.
>    - Submitting an incompatible configuration returns HTTP 422 (`CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT` or `INCOMPATIBLE_CONFIGURATION`).

---

## 1. Overview & Architecture

Task **IGR-HT2** delivers the production-ready recommendation runtime based on the canonical snapshot `HTF-03-canonical-packaging-dataset.json`. It is purely additive:
- Existing Selection (`/api/v1/portfolios/**`), Economics (`/api/v1/scenarios/**/economics`), and Health (`/api/v1/health`) endpoints are completely untouched and operational.
- New endpoints are isolated under `/api/v1/recommendation/**`.
- Provenance integrity: Every recommendation payload carries the SHA256 revision hash of `HTF-03-canonical-packaging-dataset.json`.
- Typed TypeScript interfaces and client methods are available in `frontend/src/api/contracts.ts` and `frontend/src/api/client.ts`.

---

## 2. API Endpoints

### 2.1 GET `/api/v1/recommendation/products`
Retrieves available product archetypes and thermal workflows with their baseline assumptions and decisions.

**Response Schema:** `RecommendationProductsResponse`
- `schema_version`: `"htf03.recommendation.v1"`
- `dataset_id`: `"HTF-03-canonical-packaging"`
- `research_cut_off`: `"2026-09-26"`
- `market`: `"Romania"`
- `source_revision_hash`: SHA256 of canonical dataset
- `products`: List of 4 product archetypes (`P1`, `P2`, `P3`, `P4`)
- `workflows`: List of 2 workflow definitions (`POST_COOK_HOT_HOLD_6H`, `LITERAL_OVEN_250C_THEN_HOLD`)
- `default_product_id`: `"P1"`
- `default_workflow_id`: `"POST_COOK_HOT_HOLD_6H"`
- `effective_assumptions`: Global operational premises

### 2.2 GET `/api/v1/recommendation/candidates`
Retrieves the full catalog of candidate packaging systems, specialized configurations, incumbent baselines, referenced sources, and UI rendering rules.

**Response Schema:** `RecommendationCandidatesResponse`
- `candidates`: List of 6 candidates (`C1` through `C6`) with physical, thermal, procurement, and end-of-life details.
- `configurations`: List of 4 C6 configurations (`C6-RO-P`, `C6-RO-W`, `C6-RO-H`, `C6-EU`).
- `baselines`: List of 3 incumbent baselines (`B1`, `B2`, `B3`).
- `referenced_sources`: Mapping of `source_id` to `SourceReference` (url, tier, findings, limitations).
- `rendering_contract`: UI formatting directives (badge styles, confidence labels).

### 2.3 POST `/api/v1/recommendation/evaluate`
Evaluates a specific product archetype and workflow combination.

**Request Schema:** `RecommendationEvaluationRequest`
```json
{
  "product_id": "P1",
  "workflow_id": "POST_COOK_HOT_HOLD_6H",
  "configuration_id": null
}
```

**Response Schema:** `RecommendationEvaluationResponse`
- `context`: Resolved context including archetype, workflow, and effective assumptions.
- `assessments`: Detailed assessment for each of the 6 candidates with evaluated 6 hard gates (`PASS`, `QUALIFICATION_REQUIRED`, `UNKNOWN`, `FAIL`).
- `recommendation`:
  - `first_qualification_candidate_id`: Top recommendation for laboratory testing.
  - `first_qualification_outcome`: E.g., `"RECOMMENDED UNDER CURRENT ASSUMPTIONS"`.
  - `first_qualification_priority`: 1.
  - `qualified_survivors`: Candidates with all gates passed (currently empty, consistent with canonical).
  - `alternatives`: Viable alternatives requiring qualification.
  - `blocked`: Incompatible candidates (e.g. CPET in oven).
- `referenced_sources`: Map of sources referenced by the evaluation.

---

## 3. Concrete JSON Payloads for Key Scenarios

### Scenario 1: P1 (Pork Neck) + POST_COOK_HOT_HOLD_6H
*Context:* Whole piece pork neck with bone, cooked in oven then transferred to hot hold for 6 hours.  
*Result:* Candidate **C1** (Faerch CPET) is selected as `FIRST_QUALIFICATION_PATH` (Priority 1) because it has verified 220°C oven resistance and 6-hour thermal stability, though requiring sealing and migration testing. C6 auto-binds to `C6-RO-W`.

**Request:**
```http
POST /api/v1/recommendation/evaluate HTTP/1.1
Content-Type: application/json

{
  "product_id": "P1",
  "workflow_id": "POST_COOK_HOT_HOLD_6H"
}
```

**Response (Status 200 OK):**
```json
{
  "schema_version": "htf03.recommendation.v1",
  "dataset_id": "HTF-03-canonical-packaging",
  "research_cut_off": "2026-09-26",
  "source_revision_hash": "90b4ff27f7eec88d374466d8ba9c5cf31e538ef1f630560a6a02b1c43b0eb61b",
  "context": {
    "product": {
      "product_id": "P1",
      "name": "Ceafă de porc la cuptor cu os",
      "fill_geometry": {
        "kind": "evidence_field",
        "value": "Whole piece bone-in pork neck, typical single serving 250-350g, dimensions approx 180x120x45mm",
        "state": "OBSERVED_VERIFIED",
        "unit": null,
        "source_ids": ["SRC-001", "SRC-004"],
        "confidence": "HIGH",
        "qualifier": null,
        "scope": "product_geometry",
        "display_policy": "DISPLAY_VERIFIED",
        "calculation_id": null,
        "inherited_boundary": null,
        "estimate": null,
        "reasoning_status": null,
        "environmental_boundary": null,
        "metric_class": null
      },
      "decision": {
        "product_id": "P1",
        "outcome": "RECOMMENDED UNDER CURRENT ASSUMPTIONS",
        "approved_for_procurement": false,
        "first_qualification_candidate": "C1",
        "local_sample_alternative": "C6",
        "rationale": "C1 Faerch CPET 1-comp represents the primary qualification path under post-cook hot hold premises.",
        "literal_250c_path": "C6 molded fiber tray without lid during oven phase",
        "display_benefit": "C1 offers high clarity window film vs opaque fiber alternatives"
      }
    },
    "workflow": {
      "workflow_id": "POST_COOK_HOT_HOLD_6H",
      "name": "Post-Cook Hot Hold 6 Hours (Rotisserie / Gastronorm / Retherm)",
      "description": "Product is cooked in combi-oven or rotisserie unsealed, then loaded hot into packaging and placed into heated display cabinet at 65-75°C for up to 6 hours.",
      "is_primary": true,
      "modes": ["HOT_FILL_85C", "HOT_HOLD_65C_75C_6H"],
      "assumption_summary": "Package does NOT enter 200-250°C oven; maximum packaging exposure is 85°C hot fill and 65-75°C extended hold.",
      "target_temperature_c": 85.0,
      "target_duration_min": 360,
      "status": "ASSUMED"
    },
    "selected_configuration_id": null,
    "effective_assumptions": [
      "No food-contact certified packaging currently approved for Romanian retail rollout without migration testing.",
      "Post-cook hot hold is the primary realistic workflow for rotisserie operations.",
      "Literal oven cooking inside packaging is evaluated separately under LITERAL_OVEN_250C_THEN_HOLD."
    ]
  },
  "assessments": [
    {
      "candidate_id": "C1",
      "candidate_name": "Faerch CPET 1-Compartment Ovenable Tray + Top Film",
      "configuration_id": null,
      "gates": {
        "physical_fit": {
          "gate_id": "physical_fit",
          "status": "PASS",
          "reason": "Tray dimensions 215x150x45mm accommodate P1 single piece pork neck (180x120x45mm).",
          "source_ids": ["SRC-001", "SRC-008"]
        },
        "food_contact": {
          "gate_id": "food_contact",
          "status": "QUALIFICATION_REQUIRED",
          "reason": "EU 10/2011 compliance documented for base PET; requires overall/specific migration tests with hot fatty food simulant (simulant D2) under 6h hold.",
          "source_ids": ["SRC-012", "SRC-015"]
        },
        "thermal_workflow": {
          "gate_id": "thermal_workflow",
          "status": "PASS",
          "reason": "Certified CPET operating range -40°C to +220°C comfortably exceeds 85°C fill and 75°C hold.",
          "source_ids": ["SRC-008", "SRC-014"]
        },
        "grease_leak": {
          "gate_id": "grease_leak",
          "status": "PASS",
          "reason": "Rigid monolithic polyester tray structure exhibits zero grease transmission.",
          "source_ids": ["SRC-008"]
        },
        "transparent_viewing": {
          "gate_id": "transparent_viewing",
          "status": "PASS",
          "reason": "Transparent anti-fog top seal film provides clear consumer viewing of cooked product.",
          "source_ids": ["SRC-009"]
        },
        "procurement": {
          "gate_id": "procurement",
          "status": "QUALIFICATION_REQUIRED",
          "reason": "Requires European distributor contract; MOQ 50,000 units.",
          "source_ids": ["SRC-031"]
        }
      },
      "outcome": "RECOMMENDED UNDER CURRENT ASSUMPTIONS",
      "qualified_survivor": false,
      "approved_for_procurement": false,
      "qualification_priority": 1,
      "is_first_qualification_path": true,
      "role": "FIRST_QUALIFICATION_PATH",
      "rationale": "C1 satisfies dimensional, grease, and thermal requirements; holds top qualification priority for P1 whole piece meat.",
      "decision_scope": "Primary recommended path for commercial qualification",
      "limitations": [
        "Oven film seal requires dedicated heat sealing tooling on store or commissary packaging lines.",
        "Migration testing required for fatty food contact above 70°C."
      ],
      "next_qualification_actions": [
        "Request supplier Declaration of Compliance for fatty food contact at 85°C.",
        "Commission certified migration testing with food simulant D2 for 6 hours at 75°C.",
        "Verify distributor delivery terms and pallet MOQ for Romanian market."
      ],
      "metrics": {
        "total_package_mass_g": {
          "kind": "evidence_field",
          "value": 18.5,
          "state": "OBSERVED_VERIFIED",
          "unit": "g",
          "source_ids": ["SRC-008"],
          "confidence": "HIGH",
          "qualifier": null,
          "scope": "total_package_mass",
          "display_policy": "DISPLAY_VERIFIED",
          "calculation_id": null,
          "inherited_boundary": null,
          "estimate": null,
          "reasoning_status": null,
          "environmental_boundary": null,
          "metric_class": null
        },
        "plastic_mass_g": {
          "kind": "evidence_field",
          "value": 18.5,
          "state": "OBSERVED_VERIFIED",
          "unit": "g",
          "source_ids": ["SRC-008"],
          "confidence": "HIGH",
          "qualifier": null,
          "scope": "plastic_mass",
          "display_policy": "DISPLAY_VERIFIED",
          "calculation_id": null,
          "inherited_boundary": null,
          "estimate": null,
          "reasoning_status": null,
          "environmental_boundary": null,
          "metric_class": null
        },
        "virgin_plastic_mass_g": {
          "kind": "evidence_field",
          "value": 5.55,
          "state": "DERIVED_EXACT",
          "unit": "g",
          "source_ids": ["SRC-008", "SRC-010"],
          "confidence": "HIGH",
          "qualifier": "Derived from 70% post-consumer recycled content in CPET core.",
          "scope": "virgin_plastic_mass",
          "display_policy": "DISPLAY_DERIVED",
          "calculation_id": "CALC-001",
          "inherited_boundary": null,
          "estimate": null,
          "reasoning_status": null,
          "environmental_boundary": null,
          "metric_class": null
        },
        "recycled_material_fraction": {
          "kind": "evidence_field",
          "value": 0.7,
          "state": "OBSERVED_VERIFIED",
          "unit": "fraction",
          "source_ids": ["SRC-008", "SRC-010"],
          "confidence": "HIGH",
          "qualifier": "EFSA-certified food-grade recycled post-consumer PET core.",
          "scope": "recycled_fraction",
          "display_policy": "DISPLAY_VERIFIED",
          "calculation_id": null,
          "inherited_boundary": null,
          "estimate": null,
          "reasoning_status": null,
          "environmental_boundary": null,
          "metric_class": null
        },
        "renewable_material_fraction": {
          "kind": "evidence_field",
          "value": 0.0,
          "state": "OBSERVED_VERIFIED",
          "unit": "fraction",
          "source_ids": ["SRC-008"],
          "confidence": "HIGH",
          "qualifier": null,
          "scope": "renewable_fraction",
          "display_policy": "DISPLAY_VERIFIED",
          "calculation_id": null,
          "inherited_boundary": null,
          "estimate": null,
          "reasoning_status": null,
          "environmental_boundary": null,
          "metric_class": null
        }
      },
      "thermal_claims": [
        {
          "component": "Tray body",
          "mode": "Oven and Hot Hold",
          "temperature_c": {
            "kind": "evidence_field",
            "value": 220.0,
            "state": "OBSERVED_VERIFIED",
            "unit": "°C",
            "source_ids": ["SRC-008"],
            "confidence": "HIGH",
            "qualifier": null,
            "scope": "max_temperature",
            "display_policy": "DISPLAY_VERIFIED",
            "calculation_id": null,
            "inherited_boundary": null,
            "estimate": null,
            "reasoning_status": null,
            "environmental_boundary": null,
            "metric_class": null
          },
          "duration_min": {
            "kind": "evidence_field",
            "value": 360,
            "state": "ESTIMATED",
            "unit": "min",
            "source_ids": ["SRC-008"],
            "confidence": "MEDIUM",
            "qualifier": "Based on extended hot cabinet testing data.",
            "scope": "max_duration",
            "display_policy": "DISPLAY_ESTIMATED",
            "calculation_id": null,
            "inherited_boundary": null,
            "estimate": null,
            "reasoning_status": null,
            "environmental_boundary": null,
            "metric_class": null
          },
          "evidence_kind": "MANUFACTURER_TDS",
          "qualification": "Certified to 220°C oven rethermalization",
          "source_ids": ["SRC-008"],
          "temperature_min_c": null
        }
      ],
      "six_hour_hold": {
        "kind": "evidence_field",
        "value": true,
        "state": "ESTIMATED",
        "unit": null,
        "source_ids": ["SRC-008", "SRC-014"],
        "confidence": "MEDIUM",
        "qualifier": "Hot hold maintained without tray softening or oil seepage.",
        "scope": "six_hour_hold_stability",
        "display_policy": "DISPLAY_ESTIMATED",
        "calculation_id": null,
        "inherited_boundary": null,
        "estimate": null,
        "reasoning_status": null,
        "environmental_boundary": null,
        "metric_class": null
      },
      "transparency": {
        "transparent_component_present": {
          "kind": "evidence_field",
          "value": true,
          "state": "OBSERVED_VERIFIED",
          "unit": null,
          "source_ids": ["SRC-009"],
          "confidence": "HIGH",
          "qualifier": "Top sealing film",
          "scope": "transparency_presence",
          "display_policy": "DISPLAY_VERIFIED",
          "calculation_id": null,
          "inherited_boundary": null,
          "estimate": null,
          "reasoning_status": null,
          "environmental_boundary": null,
          "metric_class": null
        }
      },
      "procurement": null,
      "eol": null,
      "scenario_details": [],
      "referenced_source_ids": ["SRC-001", "SRC-008", "SRC-009", "SRC-010", "SRC-012", "SRC-014", "SRC-015", "SRC-031"]
    }
  ],
  "recommendation": {
    "first_qualification_candidate_id": "C1",
    "first_qualification_configuration_id": null,
    "first_qualification_outcome": "RECOMMENDED UNDER CURRENT ASSUMPTIONS",
    "first_qualification_priority": 1,
    "qualified_survivors": [],
    "alternatives": [
      {
        "candidate_id": "C6",
        "configuration_id": "C6-RO-W",
        "candidate_name": "Forest Packaging Molded Sugarcane Pulp Tray + PET Lid",
        "outcome": "ALTERNATIVE",
        "role": "PRIORITY_ALTERNATIVE",
        "qualification_priority": 2
      },
      {
        "candidate_id": "C2",
        "configuration_id": null,
        "candidate_name": "Faerch CPET 2-Compartment Tray + Top Film",
        "outcome": "ALTERNATIVE",
        "role": "ALTERNATIVE",
        "qualification_priority": 3
      },
      {
        "candidate_id": "C3",
        "configuration_id": null,
        "candidate_name": "Faerch CPET 3-Compartment Tray + Top Film",
        "outcome": "ALTERNATIVE",
        "role": "ALTERNATIVE",
        "qualification_priority": 3
      },
      {
        "candidate_id": "C4",
        "configuration_id": null,
        "candidate_name": "Sabert Pulp Hinged Container with Clear PET Window",
        "outcome": "ALTERNATIVE",
        "role": "ALTERNATIVE",
        "qualification_priority": 3
      },
      {
        "candidate_id": "C5",
        "configuration_id": null,
        "candidate_name": "Colpac Kraft Paperboard Tray with PE Lining",
        "outcome": "ALTERNATIVE",
        "role": "ALTERNATIVE",
        "qualification_priority": 3
      }
    ],
    "blocked": []
  },
  "baselines": [
    {
      "baseline_id": "B1",
      "identity": "Profi Incumbent EPS Foam Meat Tray + Stretch PVC Wrap",
      "is_profi_incumbent": true,
      "description": "Expanded polystyrene foam base tray with manually applied PVC stretch overwrap.",
      "observed_virgin_fraction": 1.0,
      "estimated_mass_g": { "low": 9.2, "central": 9.8, "high": 10.5 },
      "observed_price_ron": 0.285,
      "resolution_status": "OBSERVED_VERIFIED",
      "notes": "Non-recyclable in municipal Romanian PMD yellow bin; non-reclosable."
    },
    {
      "baseline_id": "B2",
      "identity": "Profi Incumbent PP Clamshell Hinged Container",
      "is_profi_incumbent": true,
      "description": "Polypropylene injection or thermoformed hinged clamshell container.",
      "observed_virgin_fraction": 1.0,
      "estimated_mass_g": { "low": 18.0, "central": 21.0, "high": 24.5 },
      "observed_price_ron": 0.52,
      "resolution_status": "OBSERVED_VERIFIED",
      "notes": "100% virgin polypropylene; poor barrier performance in long hot hold."
    },
    {
      "baseline_id": "B3",
      "identity": "Profi Incumbent Kraft/PE Window Hot Bag",
      "is_profi_incumbent": true,
      "description": "Brown kraft paper pouch with PE inner barrier and perforated transparent viewing strip.",
      "observed_virgin_fraction": 1.0,
      "estimated_mass_g": { "low": 11.0, "central": 12.4, "high": 14.0 },
      "observed_price_ron": 0.37026,
      "resolution_status": "OBSERVED_VERIFIED",
      "notes": "Current hot-rotisserie poultry pouch; prone to oil wetting and bag collapse under heavy pieces."
    }
  ],
  "referenced_sources": {
    "SRC-001": {
      "source_id": "SRC-001",
      "title": "Profi Rom Food Store Reconnaissance Ledger",
      "url": "https://www.profi.ro",
      "scope": "retail_observation",
      "findings": "Documented in-store rotisserie counter dimensions and holding practices.",
      "limitations": "Observational study, non-laboratory measurements.",
      "published_or_version_date": "2026-09-24",
      "accessed_at": "2026-09-24",
      "access_status": "VERIFIED",
      "romania_evidence": true,
      "tier": 1
    }
  },
  "disclosures": [
    "No candidate packaging article is certified for commercial procurement without physical testing.",
    "Calculations reflect the 2026-09-26 research snapshot and require operational sign-off.",
    " material_only_co2e_kg is excluded by design under anti-greenwashing transparency standards."
  ]
}
```

---

### Scenario 2: P2 (Meatballs / Chiftele) + POST_COOK_HOT_HOLD_6H
*Context:* High-count small portion item (chiftele / pârjoale) with loose sauce and grease droplets.  
*Result:* Candidate **C5** (Colpac Kraft Paperboard Tray with PE Lining) is selected as `FIRST_QUALIFICATION_PATH` (Priority 1) because portioned items do not need deep individual compartments and benefit from grease-resistant folded paperboard with high consumer acceptance. C6 auto-binds to `C6-RO-P`.

**Request:**
```http
POST /api/v1/recommendation/evaluate HTTP/1.1
Content-Type: application/json

{
  "product_id": "P2",
  "workflow_id": "POST_COOK_HOT_HOLD_6H"
}
```

**Response Highlights:**
```json
{
  "context": {
    "product": {
      "product_id": "P2",
      "name": "Chiftele marinate / Chiftele la cuptor",
      "fill_geometry": {
        "value": "6-8 spherical or flattened meatballs (approx 35-45g each) in viscous tomato sauce"
      }
    },
    "workflow": {
      "workflow_id": "POST_COOK_HOT_HOLD_6H"
    }
  },
  "recommendation": {
    "first_qualification_candidate_id": "C5",
    "first_qualification_configuration_id": null,
    "first_qualification_outcome": "RECOMMENDED UNDER CURRENT ASSUMPTIONS",
    "first_qualification_priority": 1,
    "qualified_survivors": [],
    "alternatives": [
      {
        "candidate_id": "C6",
        "configuration_id": "C6-RO-P",
        "candidate_name": "Forest Packaging Molded Sugarcane Pulp Tray + PET Lid",
        "outcome": "ALTERNATIVE",
        "role": "PRIORITY_ALTERNATIVE",
        "qualification_priority": 2
      },
      {
        "candidate_id": "C1",
        "configuration_id": null,
        "candidate_name": "Faerch CPET 1-Compartment Ovenable Tray + Top Film",
        "outcome": "ALTERNATIVE",
        "role": "ALTERNATIVE",
        "qualification_priority": 3
      }
    ],
    "blocked": []
  }
}
```

---

### Scenario 3: P1 + LITERAL_OVEN_250C_THEN_HOLD
*Context:* Product is baked inside the final consumer container at 250°C, then held hot.  
*Result:* Candidates **C1, C2, C3, C4, C5 are strictly BLOCKED**:
- C1–C3 (CPET): Max temperature is 220°C. 250°C exceeds thermal safety envelope, risking thermal distortion and polymer degradation (`thermal_workflow` gate = `FAIL`).
- C4–C5 (Paperboard with window/PE): PE melting point is ~110–125°C, causing catastrophic liner failure and toxic smoke (`thermal_workflow` gate = `FAIL`).
- **C6-RO-H** is the ONLY viable configuration: Uncoated molded sugarcane bagasse can withstand up to 250°C dry oven heat (lid MUST be applied post-oven!). C6-RO-H receives `PRIORITY_ALTERNATIVE` (Priority 2), with `FIRST_QUALIFICATION_PATH` unassigned (no candidate can be unreservedly recommended without physical validation).

**Request:**
```http
POST /api/v1/recommendation/evaluate HTTP/1.1
Content-Type: application/json

{
  "product_id": "P1",
  "workflow_id": "LITERAL_OVEN_250C_THEN_HOLD"
}
```

**Response Highlights:**
```json
{
  "context": {
    "product": { "product_id": "P1" },
    "workflow": {
      "workflow_id": "LITERAL_OVEN_250C_THEN_HOLD",
      "name": "Literal Oven Bake 250°C then Extended Hot Hold",
      "target_temperature_c": 250.0
    }
  },
  "assessments": [
    {
      "candidate_id": "C1",
      "gates": {
        "thermal_workflow": {
          "gate_id": "thermal_workflow",
          "status": "FAIL",
          "reason": "CPET certified upper temperature is 220°C. Exposure to 250°C oven bake causes softening and structural collapse."
        }
      },
      "outcome": "BLOCKED",
      "role": "BLOCKED",
      "qualification_priority": null
    },
    {
      "candidate_id": "C6",
      "configuration_id": "C6-RO-H",
      "gates": {
        "thermal_workflow": {
          "gate_id": "thermal_workflow",
          "status": "QUALIFICATION_REQUIRED",
          "reason": "Base sugarcane fiber tray withstands 250°C dry heat without melting. PET lid MUST be attached after oven phase. Requires scorching and grease barrier tests."
        }
      },
      "outcome": "ALTERNATIVE",
      "role": "PRIORITY_ALTERNATIVE",
      "qualification_priority": 2
    }
  ],
  "recommendation": {
    "first_qualification_candidate_id": null,
    "first_qualification_configuration_id": null,
    "first_qualification_outcome": null,
    "first_qualification_priority": null,
    "qualified_survivors": [],
    "alternatives": [
      {
        "candidate_id": "C6",
        "configuration_id": "C6-RO-H",
        "candidate_name": "Forest Packaging Molded Sugarcane Pulp Tray + PET Lid",
        "outcome": "ALTERNATIVE",
        "role": "PRIORITY_ALTERNATIVE",
        "qualification_priority": 2
      }
    ],
    "blocked": [
      { "candidate_id": "C1", "outcome": "BLOCKED", "role": "BLOCKED" },
      { "candidate_id": "C2", "outcome": "BLOCKED", "role": "BLOCKED" },
      { "candidate_id": "C3", "outcome": "BLOCKED", "role": "BLOCKED" },
      { "candidate_id": "C4", "outcome": "BLOCKED", "role": "BLOCKED" },
      { "candidate_id": "C5", "outcome": "BLOCKED", "role": "BLOCKED" }
    ]
  }
}
```

---

### Scenario 4: Adversarial Request (Incompatible Configuration)
*Context:* Client attempts to evaluate product `P1` with `C6-RO-P` (the portion/meatball configuration), or an unrepresented configuration like `C6-EU`.  
*Result:* Returns **HTTP 422 Unprocessable Entity**.

**Request:**
```http
POST /api/v1/recommendation/evaluate HTTP/1.1
Content-Type: application/json

{
  "product_id": "P1",
  "workflow_id": "POST_COOK_HOT_HOLD_6H",
  "configuration_id": "C6-RO-P"
}
```

**Response (Status 422 Unprocessable Entity):**
```json
{
  "detail": {
    "error_code": "CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT",
    "message": "Configuration 'C6-RO-P' is not evaluated for product 'P1' and workflow 'POST_COOK_HOT_HOLD_6H'. Allowed configuration for this context is 'C6-RO-W'."
  }
}
```

---

## 4. Error Semantics Reference

| HTTP Status | Error Code | Trigger Condition | Recommended UI Action |
|:---|:---|:---|:---|
| **404 Not Found** | `PRODUCT_NOT_FOUND` | Unknown `product_id` (e.g. `"P99"`). | Reset selector to default product `"P1"`. |
| **404 Not Found** | `WORKFLOW_NOT_FOUND` | Unknown `workflow_id` (e.g. `"MICROWAVE_ONLY"`). | Reset selector to `"POST_COOK_HOT_HOLD_6H"`. |
| **400 Bad Request** | `MISSING_CONFIGURATION_ID` | Malformed configuration identifier string. | Clear configuration parameter or query valid list from `/candidates`. |
| **422 Unprocessable** | `CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT` | Configuration exists (e.g. `C6-RO-P`), but is invalid for the requested context (e.g. `P1` or oven workflow). | Prompt user with the valid configuration for the chosen product/workflow. |
| **422 Unprocessable** | `INCOMPATIBLE_CONFIGURATION` | Requesting `C6-EU` or any configuration not admissible in the active Romanian retail scope. | Display contextual disclaimer that EU configuration has no active Romanian stocking or validation. |
| **503 Unavailable** | `RECOMMENDATION_RUNTIME_UNAVAILABLE` | Canonical dataset file is missing or corrupted at runtime startup. | Display maintenance alert; contact backend on-call engineer. |

---

## 5. Security & Anti-Greenwashing Invariants

1. **`material_only_co2e_kg` Filtering:**
   In `HTF-03-canonical-packaging-dataset.json`, calculations derived theoretical cradle-to-gate polymer mass multipliers (e.g., `0.0463 kg CO₂e`). This value excludes transport, converting, lid, seal film, retail refrigeration, and end-of-life impacts. Emitting this single number to clients would mislead retailers and violate European green claims regulations (Directive (EU) 2024/825).
   - **Backend Invariant:** Stripped during dataset ingestion in `build_candidate_metrics()`.
   - **Frontend Invariant:** Field does not exist in `CandidateMetrics` in `contracts.ts`.
   - **Preflight Verification:** Validated automatically by `scripts/demo.py --check` and `test_recommendation.py`.

2. **No Eco / Carbon Scores:**
   No aggregate 1–100 or letter grade (A–E) eco-score is computed. Packaging environmental performance is presented strictly via auditable physical mass components:
   - Total package mass ($g$)
   - Plastic mass ($g$)
   - Virgin plastic mass ($g$)
   - Recycled material fraction ($\%$)
   - Renewable material fraction ($\%$)

---

## 6. Frontend Integration Guide

Denis and the frontend team can consume the runtime immediately using the typed client:

```typescript
import { api } from '@/api/client';
import type {
  RecommendationEvaluationRequest,
  RecommendationEvaluationResponse,
} from '@/api/contracts';

// 1. Fetch available products and workflows
const abortController = new AbortController();
const { products, workflows } = await api.recommendationProducts(abortController.signal);

// 2. Evaluate default recommendation
const request: RecommendationEvaluationRequest = {
  product_id: 'P1',
  workflow_id: 'POST_COOK_HOT_HOLD_6H',
};

try {
  const result: RecommendationEvaluationResponse = await api.evaluateRecommendation(
    request,
    abortController.signal
  );
  
  console.log('Top recommendation:', result.recommendation.first_qualification_candidate_id);
  console.log('Assessments:', result.assessments);
} catch (error) {
  // Handles HTTP 404, 422 with parsed error details
  console.error('Evaluation error:', error.message);
}
```
