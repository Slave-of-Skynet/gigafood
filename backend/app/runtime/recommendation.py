from dataclasses import dataclass, field
import hashlib
import json
import logging
from pathlib import Path
from typing import Any

from pydantic import ValidationError

from app.domain.recommendation import (
    BaselineId,
    BaselineSummary,
    CandidateId,
    CandidateMetrics,
    CandidateSummary,
    ConfigurationId,
    EolDetails,
    EstimateDetails,
    EvidenceField,
    HardGate,
    PackagingConfiguration,
    ProductArchetype,
    ProductDecisionSummary,
    ProductId,
    ProcurementDetails,
    ScenarioDetail,
    SourceReference,
    ThermalClaim,
    TransparencyDetails,
    WorkflowDefinition,
    WorkflowId,
)

logger = logging.getLogger(__name__)

DISCLOSURES = [
    "Software cannot certify food safety, legal compliance, or approve procurement.",
    "All 48 evaluated packaging paths require physical and safety qualification before commercial use.",
    "Zero candidates are approved for procurement or confirmed as qualified survivors.",
    "Primary workflow (POST_COOK_HOT_HOLD_6H) is an ASSUMED operational model; hot-fill temperatures and holding criteria are unconfirmed.",
    "No verified plastic-saving claim is established against Profi incumbent; comparisons are indicative screening models.",
    "Missing evidence (UNKNOWN) is non-compensatory and never treated as zero.",
]

EFFECTIVE_ASSUMPTIONS = [
    "Working sequence: cook -> transfer hot food -> retail pack -> hot hold up to 6 hours -> purchase.",
    "Hot-fill temperatures, cabinet holding conditions, and food geometry at Profi remain UNKNOWN.",
    "Literal oven 250°C branch targets oven body only; clear lid must be applied post-oven at a validated temperature.",
    "All plastic accounting reductions are calculated against B1-ESTIMATED (2.59–12.46 g, central 6.50 g), not a measured incumbent.",
]


def clean_estimate_dict(ef_dict: dict[str, Any] | None) -> dict[str, Any] | None:
    if not isinstance(ef_dict, dict):
        return None
    d = dict(ef_dict)
    if "estimate" in d and isinstance(d["estimate"], dict):
        est = dict(d["estimate"])
        allowed_keys = {
            "low",
            "central",
            "high",
            "method",
            "formula",
            "assumptions",
            "confidence",
            "sensitivity",
            "interval_kind",
        }
        d["estimate"] = {k: v for k, v in est.items() if k in allowed_keys}
    return d


def clean_ef(f: dict[str, Any] | None) -> EvidenceField | None:
    if not f or not isinstance(f, dict):
        return None
    return EvidenceField(**clean_estimate_dict(f))


def build_candidate_metrics(exact_m: dict[str, Any], model_m: dict[str, Any]) -> CandidateMetrics:
    # Explicitly excludes material_only_co2e_kg and internal carbon scenarios!
    return CandidateMetrics(
        total_package_mass_g=clean_ef(exact_m.get("total_package_mass_g")) or clean_ef(model_m.get("total_package_mass_g")),
        plastic_mass_g=clean_ef(exact_m.get("plastic_mass_g")) or clean_ef(model_m.get("plastic_mass_g")),
        virgin_plastic_mass_g=clean_ef(exact_m.get("virgin_plastic_mass_g")) or clean_ef(model_m.get("virgin_plastic_mass_g")),
        recycled_material_fraction=clean_ef(exact_m.get("recycled_material_fraction")) or clean_ef(model_m.get("recycled_material_fraction")),
        renewable_material_fraction=clean_ef(exact_m.get("renewable_material_fraction")) or clean_ef(model_m.get("renewable_material_fraction")),
    )


@dataclass(frozen=True)
class RecommendationRuntime:
    is_available: bool
    error: str | None
    source_revision_hash: str | None = None
    dataset_id: str = "HTF-03-canonical-packaging"
    research_cut_off: str = "2026-09-26"
    market: str = "Romania"
    products: list[ProductArchetype] = field(default_factory=list)
    workflows: list[WorkflowDefinition] = field(default_factory=list)
    candidates: list[CandidateSummary] = field(default_factory=list)
    configurations: list[PackagingConfiguration] = field(default_factory=list)
    baselines: list[BaselineSummary] = field(default_factory=list)
    sources: dict[str, SourceReference] = field(default_factory=dict)
    gate_rows: dict[tuple[str, str, str], dict[str, Any]] = field(default_factory=dict)
    c6_gate_rows: dict[tuple[str, str, str], dict[str, Any]] = field(default_factory=dict)
    configurations_by_id: dict[str, PackagingConfiguration] = field(default_factory=dict)
    candidates_by_id: dict[str, CandidateSummary] = field(default_factory=dict)
    products_by_id: dict[str, ProductArchetype] = field(default_factory=dict)
    workflows_by_id: dict[str, WorkflowDefinition] = field(default_factory=dict)
    rendering_contract: dict[str, Any] = field(default_factory=dict)
    disclosures: list[str] = field(default_factory=lambda: list(DISCLOSURES))
    effective_assumptions: list[str] = field(default_factory=lambda: list(EFFECTIVE_ASSUMPTIONS))


def load_recommendation_runtime(htf03_dir: Path) -> RecommendationRuntime:
    canonical_path = htf03_dir / "HTF-03-canonical-packaging-dataset.json"
    display_path = htf03_dir / "HTF-03-prototype-display-dataset.json"

    if not canonical_path.is_file():
        logger.error("HTF-03 canonical dataset missing: %s", canonical_path)
        return RecommendationRuntime(is_available=False, error="RECOMMENDATION_EVIDENCE_UNAVAILABLE")

    try:
        raw_bytes = canonical_path.read_bytes()
        source_revision_hash = hashlib.sha256(raw_bytes).hexdigest()
        data = json.loads(raw_bytes.decode("utf-8"))
        display_data = json.loads(display_path.read_text(encoding="utf-8")) if display_path.is_file() else {}

        # 1. Sources
        sources_map: dict[str, SourceReference] = {}
        for s in data.get("sources", []):
            sources_map[s["source_id"]] = SourceReference(
                source_id=s["source_id"],
                title=s.get("title", ""),
                url=s.get("url"),
                scope=s.get("scope", ""),
                findings=s.get("findings"),
                limitations=s.get("limitations"),
                published_or_version_date=s.get("published_or_version_date"),
                accessed_at=s.get("accessed_at"),
                access_status=s.get("access_status"),
                romania_evidence=bool(s.get("romania_evidence", False)),
                tier=s.get("tier"),
            )

        # 2. Product Archetypes & Decisions
        decisions_map: dict[str, ProductDecisionSummary] = {}
        for d in data.get("product_decisions", []):
            decisions_map[d["product_id"]] = ProductDecisionSummary(
                product_id=d["product_id"],
                outcome=d["outcome"],
                approved_for_procurement=bool(d.get("approved_for_procurement", False)),
                first_qualification_candidate=d.get("first_qualification_candidate"),
                local_sample_alternative=d.get("local_sample_alternative"),
                rationale=d.get("rationale", ""),
                literal_250c_path=d.get("literal_250c_path"),
                display_benefit=d.get("display_benefit"),
            )

        products: list[ProductArchetype] = []
        products_by_id: dict[str, ProductArchetype] = {}
        for a in data.get("product_archetypes", []):
            pid = a["product_id"]
            pa = ProductArchetype(
                product_id=pid,
                name=a.get("name", pid),
                fill_geometry=clean_ef(a["fill_geometry"]),
                decision=decisions_map.get(pid),
            )
            products.append(pa)
            products_by_id[pid] = pa

        # 3. Workflows
        workflows: list[WorkflowDefinition] = [
            WorkflowDefinition(
                workflow_id="POST_COOK_HOT_HOLD_6H",
                name="Post-cook hot hold up to 6 hours",
                description="Food prepared before packaging, transferred hot to retail pack, displayed/held up to 6 hours in hot cabinet/shelf.",
                is_primary=True,
                modes=["POST_COOK", "HOT_HOLD"],
                assumption_summary="Cook -> transfer hot food -> retail pack -> hot hold up to six hours -> purchase. Primary ASSUMED workflow; actual hot-fill/cabinet temperatures and food geometry remain UNKNOWN.",
                target_temperature_c=None,
                target_duration_min=360,
                status="ASSUMED",
            ),
            WorkflowDefinition(
                workflow_id="LITERAL_OVEN_250C_THEN_HOLD",
                name="Literal oven 250°C then hold",
                description="Food cooked in packaging in oven at target 250°C, then held. Oven body only during oven phase; clear lid applied post-oven.",
                is_primary=False,
                modes=["OVEN_BODY_ONLY", "POST_OVEN_LID", "HOT_HOLD"],
                assumption_summary="Separate assumed package/oven branch targeting 250°C, duration UNKNOWN, followed by separately qualified holding. For aluminium, distinguish OVEN_BODY_ONLY and POST_OVEN_LID; never expose an unqualified clear lid to oven heat.",
                target_temperature_c=250.0,
                target_duration_min=None,
                status="ASSUMED",
            ),
        ]
        workflows_by_id: dict[str, WorkflowDefinition] = {w.workflow_id: w for w in workflows}

        # 4. Packaging Configurations (metrics allowlisted to exclude co2e)
        configurations: list[PackagingConfiguration] = []
        configurations_by_id: dict[str, PackagingConfiguration] = {}
        for c in data.get("configurations", []):
            cid = c["configuration_id"]
            t_claims = [
                ThermalClaim(
                    component=tc["component"],
                    mode=tc["mode"],
                    temperature_c=clean_ef(tc["temperature_c"]),
                    duration_min=clean_ef(tc["duration_min"]),
                    evidence_kind=tc.get("evidence_kind"),
                    qualification=tc.get("qualification"),
                    source_ids=tc.get("source_ids", []),
                    temperature_min_c=clean_ef(tc.get("temperature_min_c")),
                )
                for tc in c.get("thermal_claims", [])
            ]
            cfg = PackagingConfiguration(
                configuration_id=cid,
                parent_candidate_id=c.get("parent_candidate_id", "C6"),
                role=c.get("role", ""),
                identity=clean_ef(c["identity"]),
                dimensions=clean_ef(c.get("dimensions")),
                capacity_ml=clean_ef(c.get("capacity_ml")),
                thermal_claims=t_claims,
                metrics=build_candidate_metrics(c.get("exact_metrics", {}), c.get("model_metrics", {})),
                limitations=c.get("limitations", []),
            )
            configurations.append(cfg)
            configurations_by_id[cid] = cfg

        # 5. Baselines
        baselines: list[BaselineSummary] = []
        for b in data.get("baselines", []):
            bid = b["baseline_id"]
            if bid == "B1":
                b1_est = b.get("estimated", {}).get("model_metrics", {}).get("total_package_mass_g", {}).get("value")
                est_mass = None
                if isinstance(b1_est, dict) and {"low", "central", "high"} <= b1_est.keys():
                    est_mass = b1_est
                baselines.append(
                    BaselineSummary(
                        baseline_id="B1",
                        identity=b.get("identity", "ACTUAL_PROFI_INCUMBENT"),
                        is_profi_incumbent=True,
                        description="Actual Profi incumbent bag: plastic class, effectively zero recycled plastic and 100% virgin fraction of plastic, attributed to user-provided mentor clarification (TASK). Exact polymer, mass, dimensions, gauge, SKU, supplier, price and annual units are UNKNOWN.",
                        observed_virgin_fraction=1.0,
                        estimated_mass_g=est_mass,
                        observed_price_ron=None,
                        resolution_status="PROFI_INCUMBENT_UNMEASURED",
                        notes="B1-ESTIMATED is a separate scenario record under B1 (2.59–12.46 g, central 6.50 g, VERY_LOW), never a measured incumbent or a fourth baseline.",
                    )
                )
            elif bid == "B2":
                baselines.append(
                    BaselineSummary(
                        baseline_id="B2",
                        identity=b.get("identity", "VIRGIN_ALL_PLASTIC_MARKET_BAG"),
                        is_profi_incumbent=False,
                        description="Theoretical 100% virgin all-plastic market bag. No candidate combining certified 100% virgin all-plastic bag and verified Romania availability was found.",
                        observed_virgin_fraction=None,
                        estimated_mass_g=None,
                        observed_price_ron=None,
                        resolution_status="UNRESOLVED",
                        notes="Do not substitute a paper/plastic bag or another construction to fill B2.",
                    )
                )
            elif bid == "B3":
                b3_est = b.get("model_metrics", {}).get("total_package_mass_g", {}).get("value")
                est_mass = None
                if isinstance(b3_est, dict) and {"low", "central", "high"} <= b3_est.keys():
                    est_mass = b3_est
                unit_price_val = b.get("observed_price", {}).get("unit_price", {}).get("value")
                if isinstance(unit_price_val, dict):
                    price_val = unit_price_val.get("central")
                elif isinstance(unit_price_val, (int, float)):
                    price_val = unit_price_val
                else:
                    price_val = None
                baselines.append(
                    BaselineSummary(
                        baseline_id="B3",
                        identity=b.get("identity", "ROMANIAN_CONVENTIONAL_MARKET_REFERENCE"),
                        is_profi_incumbent=False,
                        description="Barleta 128002 rotisserie bag: paper + PP window, 18×7×35 cm. Market reference, never Profi baseline.",
                        observed_virgin_fraction=None,
                        estimated_mass_g=est_mass,
                        observed_price_ron=float(price_val) if price_val is not None else None,
                        resolution_status="MARKET_REFERENCE_AVAILABLE",
                        notes="Price is 0.37026 RON/pack with VAT, freight excluded.",
                    )
                )

        # 6. Candidates (metrics allowlisted to exclude co2e)
        candidates: list[CandidateSummary] = []
        candidates_by_id: dict[str, CandidateSummary] = {}
        for c in data.get("candidates", []):
            cid = c["candidate_id"]
            name = c.get("commercial_name", {}).get("value") or c.get("name", cid)
            exact_m = c.get("exact_metrics", {})
            model_m = c.get("model_metrics", {})
            metrics = build_candidate_metrics(exact_m, model_m)

            t_claims = [
                ThermalClaim(
                    component=tc["component"],
                    mode=tc["mode"],
                    temperature_c=clean_ef(tc["temperature_c"]),
                    duration_min=clean_ef(tc["duration_min"]),
                    evidence_kind=tc.get("evidence_kind"),
                    qualification=tc.get("qualification"),
                    source_ids=tc.get("source_ids", []),
                    temperature_min_c=clean_ef(tc.get("temperature_min_c")),
                )
                for tc in c.get("thermal_claims", [])
            ]

            proc = c.get("procurement")
            proc_details = (
                ProcurementDetails(
                    status=clean_ef(proc.get("status")),
                    supplier=clean_ef(proc.get("supplier")),
                    current_stock=clean_ef(proc.get("current_stock")),
                    order_unit=clean_ef(proc.get("order_unit")),
                    industrial_moq=clean_ef(proc.get("industrial_moq")),
                    lead_time=clean_ef(proc.get("lead_time")),
                    romania_unit_price=clean_ef(proc.get("romania_unit_price")),
                    supplier_contact_action=proc.get("supplier_contact_action"),
                )
                if proc
                else None
            )

            transp = c.get("transparency")
            transp_details = (
                TransparencyDetails(
                    transparent_component_present=clean_ef(transp["transparent_component_present"]),
                    material=clean_ef(transp.get("material")),
                    area_coverage=clean_ef(transp.get("area_coverage")),
                    used_during_oven=clean_ef(transp.get("used_during_oven")),
                    used_post_oven=clean_ef(transp.get("used_post_oven")),
                    anti_fog=clean_ef(transp.get("anti_fog")),
                    temperature_limit=clean_ef(transp.get("temperature_limit")),
                )
                if transp
                else None
            )

            eol = c.get("eol")
            eol_details = (
                EolDetails(
                    design_for_recycling=clean_ef(eol.get("design_for_recycling")),
                    certification=clean_ef(eol.get("certification")),
                    Romanian_collection=clean_ef(eol.get("Romanian_collection")),
                    Romanian_sorting=clean_ef(eol.get("Romanian_sorting")),
                    Romanian_reprocessing=clean_ef(eol.get("Romanian_reprocessing")),
                    Romanian_composting=clean_ef(eol.get("Romanian_composting")),
                    likely_real_world_route=clean_ef(eol.get("likely_real_world_route")),
                )
                if eol
                else None
            )

            disp_c = next((dc for dc in display_data.get("candidates", []) if dc["candidate_id"] == cid), None)
            scenarios = []
            if disp_c and "scenario_details" in disp_c:
                for s in disp_c["scenario_details"]:
                    scenarios.append(
                        ScenarioDetail(
                            scenario_id=s["scenario_id"],
                            baseline_id=s["baseline_id"],
                            label=s["label"],
                            default_headline=s.get("default_headline", False),
                            conditional_only=s.get("conditional_only", True),
                            reduction_pct=clean_ef(s.get("reduction_pct")),
                            reduction_g=clean_ef(s.get("reduction_g")),
                        )
                    )

            summary = CandidateSummary(
                candidate_id=cid,
                name=name,
                exact_configuration=clean_ef(c.get("exact_configuration")),
                recommended_applications=c.get("recommended_applications", []),
                dimensions=clean_ef(c.get("dimensions")),
                capacity_ml=clean_ef(c.get("capacity_ml")),
                metrics=metrics,
                thermal_claims=t_claims,
                six_hour_hold=clean_ef(c.get("six_hour_hold")),
                procurement=proc_details,
                transparency=transp_details,
                eol=eol_details,
                scenario_details=scenarios,
                limitations=c.get("limitations", []),
                next_qualification_actions=c.get("next_qualification_actions", []),
            )
            candidates.append(summary)
            candidates_by_id[cid] = summary

        # 7. Gate Matrix
        gate_rows: dict[tuple[str, str, str], dict[str, Any]] = {}
        c6_gate_rows: dict[tuple[str, str, str], dict[str, Any]] = {}
        for r in data.get("product_candidate_gates", []):
            p = r["product_id"]
            w = r["workflow"]
            c = r["candidate_id"]
            gate_rows[(p, w, c)] = r
            if c == "C6" and "configuration_id" in r:
                c6_gate_rows[(p, w, r["configuration_id"])] = r

        return RecommendationRuntime(
            is_available=True,
            error=None,
            source_revision_hash=source_revision_hash,
            dataset_id=data.get("dataset_id", "HTF-03-canonical-packaging"),
            research_cut_off=data.get("research_cut_off", "2026-09-26"),
            market=data.get("market", "Romania"),
            products=products,
            workflows=workflows,
            candidates=candidates,
            configurations=configurations,
            baselines=baselines,
            sources=sources_map,
            gate_rows=gate_rows,
            c6_gate_rows=c6_gate_rows,
            configurations_by_id=configurations_by_id,
            candidates_by_id=candidates_by_id,
            products_by_id=products_by_id,
            workflows_by_id=workflows_by_id,
            rendering_contract=display_data.get("rendering_contract", {}),
        )

    except (OSError, UnicodeError, ValidationError, json.JSONDecodeError, KeyError) as err:
        logger.error("Failed to load HTF-03 recommendation runtime (%s): %s", type(err).__name__, err)
        return RecommendationRuntime(is_available=False, error="RECOMMENDATION_EVIDENCE_UNAVAILABLE")
