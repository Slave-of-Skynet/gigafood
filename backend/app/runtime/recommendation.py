from dataclasses import dataclass, field
import hashlib
import itertools
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
    CanonicalGateRecord,
    CanonicalGateRow,
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
    RenderingContract,
    ScenarioDetail,
    SourceReference,
    ThermalClaim,
    TransparencyDetails,
    WorkflowDefinition,
    WorkflowId,
)

logger = logging.getLogger(__name__)

class RuntimeSnapshotValidationError(Exception):
    """Raised when the HTF-03 canonical or display dataset violates fail-closed invariants."""
    pass


ACCEPTED_C6_CONTEXT_BINDINGS: dict[tuple[str, str], str] = {
    ("P1", "POST_COOK_HOT_HOLD_6H"): "C6-RO-W",
    ("P2", "POST_COOK_HOT_HOLD_6H"): "C6-RO-P",
    ("P3", "POST_COOK_HOT_HOLD_6H"): "C6-RO-P",
    ("P4", "POST_COOK_HOT_HOLD_6H"): "C6-RO-P",
    ("P1", "LITERAL_OVEN_250C_THEN_HOLD"): "C6-RO-H",
    ("P2", "LITERAL_OVEN_250C_THEN_HOLD"): "C6-RO-H",
    ("P3", "LITERAL_OVEN_250C_THEN_HOLD"): "C6-RO-H",
    ("P4", "LITERAL_OVEN_250C_THEN_HOLD"): "C6-RO-H",
}

REQUIRED_GATES: set[str] = {
    "physical_fit",
    "food_contact",
    "thermal_workflow",
    "grease_leak",
    "transparent_viewing",
    "procurement",
}

FORBIDDEN_PROJECTION_KEYS: set[str] = {
    "material_only_co2e_kg",
    "eco_score",
    "carbon_score",
}


def collect_source_ids(obj: Any) -> set[str]:
    res: set[str] = set()
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == "source_ids" and isinstance(v, list):
                for sid in v:
                    if isinstance(sid, str) and sid:
                        res.add(sid)
            else:
                res.update(collect_source_ids(v))
    elif isinstance(obj, list):
        for item in obj:
            res.update(collect_source_ids(item))
    return res


def scan_for_forbidden_keys(obj: Any, path: str = "$") -> None:
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in FORBIDDEN_PROJECTION_KEYS:
                raise RuntimeSnapshotValidationError(
                    f"Forbidden key '{k}' found at {path}.{k}"
                )
            scan_for_forbidden_keys(v, f"{path}.{k}")
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            scan_for_forbidden_keys(item, f"{path}[{i}]")


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
    canonical_hash: str | None = None
    display_hash: str | None = None
    dataset_id: str = "HTF-03-canonical-packaging"
    research_cut_off: str = "2026-09-26"
    market: str = "Romania"
    products: list[ProductArchetype] = field(default_factory=list)
    workflows: list[WorkflowDefinition] = field(default_factory=list)
    candidates: list[CandidateSummary] = field(default_factory=list)
    configurations: list[PackagingConfiguration] = field(default_factory=list)
    baselines: list[BaselineSummary] = field(default_factory=list)
    sources: dict[str, SourceReference] = field(default_factory=dict)
    gate_rows: dict[tuple[str, str, str], CanonicalGateRow] = field(default_factory=dict)
    c6_gate_rows: dict[tuple[str, str, str], CanonicalGateRow] = field(default_factory=dict)
    configurations_by_id: dict[str, PackagingConfiguration] = field(default_factory=dict)
    candidates_by_id: dict[str, CandidateSummary] = field(default_factory=dict)
    products_by_id: dict[str, ProductArchetype] = field(default_factory=dict)
    workflows_by_id: dict[str, WorkflowDefinition] = field(default_factory=dict)
    rendering_contract: RenderingContract | None = None
    disclosures: list[str] = field(default_factory=lambda: list(DISCLOSURES))
    effective_assumptions: list[str] = field(default_factory=lambda: list(EFFECTIVE_ASSUMPTIONS))


def validate_runtime_snapshot(
    data: dict[str, Any],
    display_data: dict[str, Any],
    runtime: RecommendationRuntime,
) -> None:
    # 1. P1-P4, 2 workflows, C1-C6, 4 C6 configurations, B1-B3
    product_ids = {a.get("product_id") for a in data.get("product_archetypes", [])}
    if product_ids != {"P1", "P2", "P3", "P4"}:
        raise RuntimeSnapshotValidationError(
            f"Expected product archetypes P1-P4, got {product_ids}"
        )

    workflow_ids = {w.workflow_id for w in runtime.workflows}
    if workflow_ids != {"POST_COOK_HOT_HOLD_6H", "LITERAL_OVEN_250C_THEN_HOLD"}:
        raise RuntimeSnapshotValidationError(
            f"Expected workflows POST_COOK_HOT_HOLD_6H, LITERAL_OVEN_250C_THEN_HOLD, got {workflow_ids}"
        )

    candidate_ids = {c.get("candidate_id") for c in data.get("candidates", [])}
    if candidate_ids != {f"C{i}" for i in range(1, 7)}:
        raise RuntimeSnapshotValidationError(
            f"Expected candidates C1-C6, got {candidate_ids}"
        )

    configuration_ids = {c.get("configuration_id") for c in data.get("configurations", [])}
    if configuration_ids != {"C6-RO-P", "C6-RO-W", "C6-RO-H", "C6-EU"}:
        raise RuntimeSnapshotValidationError(
            f"Expected configurations C6-RO-P, C6-RO-W, C6-RO-H, C6-EU, got {configuration_ids}"
        )

    baseline_ids = {b.get("baseline_id") for b in data.get("baselines", [])}
    if baseline_ids != {"B1", "B2", "B3"}:
        raise RuntimeSnapshotValidationError(
            f"Expected baselines B1, B2, B3, got {baseline_ids}"
        )

    # 2. Exactly 48 evaluated gate rows in canonical and display datasets
    raw_gate_rows = data.get("product_candidate_gates", [])
    raw_display_gate_rows = display_data.get("product_candidate_gates", [])
    if len(raw_gate_rows) != 48:
        raise RuntimeSnapshotValidationError(
            f"Expected exactly 48 evaluated gate rows, got {len(raw_gate_rows)}"
        )
    if len(raw_display_gate_rows) != 48:
        raise RuntimeSnapshotValidationError(
            f"Expected exactly 48 evaluated display gate rows, got {len(raw_display_gate_rows)}"
        )

    # 3. Gate matrix in display matches canonical
    if raw_display_gate_rows != raw_gate_rows:
        raise RuntimeSnapshotValidationError("Display dataset gate rows differ from canonical gate rows")

    # 4. Strict validation of each of the 48 gate rows and objects in canonical and display datasets
    for idx, r_raw in enumerate(raw_gate_rows):
        try:
            CanonicalGateRow.model_validate(r_raw)
        except ValidationError as err:
            raise RuntimeSnapshotValidationError(
                f"Canonical gate row {idx} violates strict contract: {err}"
            ) from err

    for idx, dr_raw in enumerate(raw_display_gate_rows):
        try:
            CanonicalGateRow.model_validate(dr_raw)
        except ValidationError as err:
            raise RuntimeSnapshotValidationError(
                f"Display gate row {idx} violates strict contract: {err}"
            ) from err

    expected_tuples = set(
        itertools.product(
            {"P1", "P2", "P3", "P4"},
            {"POST_COOK_HOT_HOLD_6H", "LITERAL_OVEN_250C_THEN_HOLD"},
            {f"C{i}" for i in range(1, 7)},
        )
    )
    actual_tuples = {(r.product_id, r.workflow, r.candidate_id) for r in runtime.gate_rows.values()}
    if actual_tuples != expected_tuples:
        raise RuntimeSnapshotValidationError(
            f"Gate rows do not cover all 48 combinations: missing {expected_tuples - actual_tuples}"
        )

    # 5. Canonical matrix outcome distribution: exactly 28 QUALIFICATION REQUIRED, 20 BLOCKED
    qual_count = sum(1 for r in runtime.gate_rows.values() if r.outcome == "QUALIFICATION REQUIRED")
    blocked_count = sum(1 for r in runtime.gate_rows.values() if r.outcome == "BLOCKED")
    if qual_count != 28 or blocked_count != 20:
        raise RuntimeSnapshotValidationError(
            f"Expected 28 QUALIFICATION REQUIRED and 20 BLOCKED rows, got {qual_count} and {blocked_count}"
        )

    # 6. Zero qualified_survivor and approved_for_procurement
    for r in runtime.gate_rows.values():
        if r.qualified_survivor is True:
            raise RuntimeSnapshotValidationError(
                f"Gate row {r.product_id}/{r.candidate_id}/{r.workflow} has qualified_survivor=True"
            )
        if r.approved_for_procurement is True:
            raise RuntimeSnapshotValidationError(
                f"Gate row {r.product_id}/{r.candidate_id}/{r.workflow} has approved_for_procurement=True"
            )

    for d in data.get("product_decisions", []):
        if d.get("approved_for_procurement") is True:
            raise RuntimeSnapshotValidationError(
                f"Product decision for {d.get('product_id')} has approved_for_procurement=True"
            )

    # 7. Strict Gate Contract and Full Outcome Truth Table
    for r in runtime.gate_rows.values():
        if set(r.gates.keys()) != REQUIRED_GATES:
            raise RuntimeSnapshotValidationError(
                f"Gate row {r.product_id}/{r.candidate_id}/{r.workflow} missing required gates"
            )

        for gname, g in r.gates.items():
            if g.status not in ("PASS", "QUALIFICATION_REQUIRED", "UNKNOWN", "FAIL"):
                raise RuntimeSnapshotValidationError(
                    f"Gate {gname} in row {r.product_id}/{r.candidate_id}/{r.workflow} has invalid status {g.status}"
                )
            if not isinstance(g.reason, str) or not g.reason.strip():
                raise RuntimeSnapshotValidationError(
                    f"Gate {gname} in row {r.product_id}/{r.candidate_id}/{r.workflow} has empty reason"
                )
            if not isinstance(g.source_ids, list) or not all(isinstance(sid, str) for sid in g.source_ids):
                raise RuntimeSnapshotValidationError(
                    f"Gate {gname} in row {r.product_id}/{r.candidate_id}/{r.workflow} has invalid source_ids"
                )

        if r.outcome == "RECOMMENDED UNDER CURRENT ASSUMPTIONS":
            raise RuntimeSnapshotValidationError(
                f"Gate row {r.product_id}/{r.candidate_id}/{r.workflow} has forbidden outcome 'RECOMMENDED UNDER CURRENT ASSUMPTIONS'"
            )

        has_fail = any(g.status == "FAIL" for g in r.gates.values())
        has_unresolved = any(g.status in ("UNKNOWN", "QUALIFICATION_REQUIRED") for g in r.gates.values())

        if has_fail:
            if r.outcome != "BLOCKED":
                raise RuntimeSnapshotValidationError(
                    f"Gate row {r.product_id}/{r.candidate_id}/{r.workflow} with FAIL gate has outcome {r.outcome}; expected BLOCKED"
                )
        elif has_unresolved:
            if r.outcome != "QUALIFICATION REQUIRED":
                raise RuntimeSnapshotValidationError(
                    f"Gate row {r.product_id}/{r.candidate_id}/{r.workflow} with unresolved gate(s) has outcome {r.outcome}; expected QUALIFICATION REQUIRED"
                )
        else:
            raise RuntimeSnapshotValidationError(
                f"Gate row {r.product_id}/{r.candidate_id}/{r.workflow} has all PASS gates; forbidden in current slice without qualification"
            )

    # 8. C6 configuration binding matches accepted context matrix
    for r in runtime.gate_rows.values():
        if r.candidate_id == "C6":
            ctx = (r.product_id, r.workflow)
            expected_cfg = ACCEPTED_C6_CONTEXT_BINDINGS.get(ctx)
            if r.configuration_id != expected_cfg:
                raise RuntimeSnapshotValidationError(
                    f"C6 binding mismatch for {ctx}: expected {expected_cfg}, got {r.configuration_id}"
                )

    # 9. C6-EU does not get a fabricated evaluated row
    for r in runtime.gate_rows.values():
        if r.configuration_id == "C6-EU":
            raise RuntimeSnapshotValidationError("C6-EU has a fabricated evaluated gate row")

    # 10. Referenced source IDs are not dangling
    smap = {s["source_id"] for s in data.get("sources", []) if "source_id" in s}
    all_referenced = collect_source_ids(data) | collect_source_ids(display_data)
    dangling = all_referenced - smap
    if dangling:
        raise RuntimeSnapshotValidationError(f"Dangling referenced source IDs found: {dangling}")

    # 10. Forbidden carbon/eco fields do not enter application/API projection
    for cand in runtime.candidates:
        scan_for_forbidden_keys(cand.model_dump())
    for cfg in runtime.configurations:
        scan_for_forbidden_keys(cfg.model_dump())
    if runtime.rendering_contract is not None:
        scan_for_forbidden_keys(runtime.rendering_contract.model_dump())



def load_recommendation_runtime(htf03_dir: Path) -> RecommendationRuntime:
    canonical_path = htf03_dir / "HTF-03-canonical-packaging-dataset.json"
    display_path = htf03_dir / "HTF-03-prototype-display-dataset.json"

    if not canonical_path.is_file() or not display_path.is_file():
        logger.error(
            "HTF-03 canonical or display dataset missing: canonical=%s, display=%s",
            canonical_path.is_file(),
            display_path.is_file(),
        )
        return RecommendationRuntime(
            is_available=False, error="RECOMMENDATION_EVIDENCE_UNAVAILABLE"
        )

    try:
        canonical_bytes = canonical_path.read_bytes()
        display_bytes = display_path.read_bytes()

        canonical_sha = hashlib.sha256(canonical_bytes).hexdigest()
        display_sha = hashlib.sha256(display_bytes).hexdigest()
        composite_hasher = hashlib.sha256()
        composite_hasher.update(
            f"canonical:{canonical_sha};display:{display_sha}".encode("utf-8")
        )
        source_revision_hash = composite_hasher.hexdigest()

        data = json.loads(canonical_bytes.decode("utf-8"))
        display_data = json.loads(display_bytes.decode("utf-8"))

        rendering_contract_raw = display_data.get("rendering_contract")
        if not isinstance(rendering_contract_raw, dict):
            raise RuntimeSnapshotValidationError(
                "rendering_contract missing or not a dict in display dataset"
            )
        rendering_contract = RenderingContract.model_validate(rendering_contract_raw)


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
        gate_rows: dict[tuple[str, str, str], CanonicalGateRow] = {}
        c6_gate_rows: dict[tuple[str, str, str], CanonicalGateRow] = {}
        for r_raw in data.get("product_candidate_gates", []):
            r = CanonicalGateRow.model_validate(r_raw)
            p = r.product_id
            w = r.workflow
            c = r.candidate_id
            gate_rows[(p, w, c)] = r
            if c == "C6" and r.configuration_id:
                c6_gate_rows[(p, w, r.configuration_id)] = r

        runtime = RecommendationRuntime(
            is_available=True,
            error=None,
            source_revision_hash=source_revision_hash,
            canonical_hash=canonical_sha,
            display_hash=display_sha,
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
            rendering_contract=rendering_contract,
        )

        validate_runtime_snapshot(data, display_data, runtime)
        return runtime

    except (
        OSError,
        UnicodeError,
        ValidationError,
        json.JSONDecodeError,
        KeyError,
        RuntimeSnapshotValidationError,
    ) as err:
        logger.error(
            "Failed to load HTF-03 recommendation runtime (%s): %s",
            type(err).__name__,
            err,
        )
        return RecommendationRuntime(
            is_available=False, error="RECOMMENDATION_EVIDENCE_UNAVAILABLE"
        )
