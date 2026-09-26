from typing import Any
from fastapi import HTTPException

from app.domain.recommendation import (
    CandidateId,
    CandidateRecommendationAssessment,
    CandidateRef,
    ConfigurationId,
    GateName,
    HardGate,
    ProductId,
    RecommendationEvaluationRequest,
    RecommendationEvaluationResponse,
    RecommendationContextResponse,
    RecommendationSummary,
    SourceReference,
    WorkflowId,
)
from app.runtime.recommendation import RecommendationRuntime, build_candidate_metrics


def get_canonical_c6_configuration(product_id: str, workflow_id: str) -> ConfigurationId:
    if workflow_id == "POST_COOK_HOT_HOLD_6H":
        return "C6-RO-W" if product_id == "P1" else "C6-RO-P"
    elif workflow_id == "LITERAL_OVEN_250C_THEN_HOLD":
        return "C6-RO-H"
    raise HTTPException(status_code=422, detail="UNKNOWN_WORKFLOW_ID")


def collect_evidence_field_sources(field_val: Any, out_ids: set[str]) -> None:
    if field_val is None:
        return
    if hasattr(field_val, "source_ids") and isinstance(field_val.source_ids, list):
        out_ids.update(field_val.source_ids)


def evaluate_recommendation(
    runtime: RecommendationRuntime,
    request: RecommendationEvaluationRequest,
) -> RecommendationEvaluationResponse:
    if not runtime.is_available:
        raise HTTPException(status_code=503, detail="RECOMMENDATION_EVIDENCE_UNAVAILABLE")

    # 1. Validate Product ID
    if request.product_id not in runtime.products_by_id:
        raise HTTPException(status_code=422, detail="UNKNOWN_PRODUCT_ID")
    product = runtime.products_by_id[request.product_id]

    # 2. Validate Workflow ID
    if request.workflow_id not in runtime.workflows_by_id:
        raise HTTPException(status_code=422, detail="UNKNOWN_WORKFLOW_ID")
    workflow = runtime.workflows_by_id[request.workflow_id]

    # 3. Resolve & Validate C6 Configuration ID
    canonical_c6 = get_canonical_c6_configuration(request.product_id, request.workflow_id)
    if request.configuration_id is not None:
        if request.configuration_id not in runtime.configurations_by_id:
            raise HTTPException(status_code=422, detail="UNKNOWN_CONFIGURATION_ID")
        # Check if the requested configuration has an evaluated gate row for this context
        gate_lookup_key = (request.product_id, request.workflow_id, request.configuration_id)
        if gate_lookup_key not in runtime.c6_gate_rows:
            raise HTTPException(
                status_code=422,
                detail="CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT",
            )
        effective_c6_config_id = request.configuration_id
    else:
        effective_c6_config_id = canonical_c6

    # 4. Build Candidate Assessments for C1..C6
    all_referenced_source_ids: set[str] = set()
    assessments_raw: list[CandidateRecommendationAssessment] = []

    for cid in ("C1", "C2", "C3", "C4", "C5", "C6"):
        candidate_summary = runtime.candidates_by_id[cid]

        if cid == "C6":
            gate_row = runtime.c6_gate_rows.get((request.product_id, request.workflow_id, effective_c6_config_id))
            cfg = runtime.configurations_by_id[effective_c6_config_id]
            cfg_id: ConfigurationId | None = cfg.configuration_id
            limitations = list(candidate_summary.limitations) + list(cfg.limitations)
            thermal_claims = cfg.thermal_claims if cfg.thermal_claims else candidate_summary.thermal_claims

            # Configuration-specific metrics (if available in cfg)
            metrics = cfg.metrics if cfg.metrics else candidate_summary.metrics
        else:
            gate_row = runtime.gate_rows.get((request.product_id, request.workflow_id, cid))
            cfg_id = None
            limitations = list(candidate_summary.limitations)
            thermal_claims = candidate_summary.thermal_claims
            metrics = candidate_summary.metrics

        if gate_row is None:
            raise HTTPException(status_code=500, detail=f"MISSING_GATE_ROW_FOR_{cid}")

        # Parse 6 Hard Gates
        gates: dict[GateName, HardGate] = {}
        for gname in ("physical_fit", "food_contact", "thermal_workflow", "grease_leak", "transparent_viewing", "procurement"):
            gdata = gate_row.gates.get(gname)
            if gdata is None:
                raise HTTPException(status_code=500, detail=f"MISSING_GATE_{gname}_FOR_{cid}")
            hard_gate = HardGate(
                gate_id=gname,
                status=gdata.status,
                reason=gdata.reason,
                source_ids=list(gdata.source_ids),
            )
            gates[gname] = hard_gate
            all_referenced_source_ids.update(hard_gate.source_ids)

        outcome = gate_row.outcome
        priority = gate_row.qualification_priority
        is_first = (priority == 1)

        # Determine Role
        if is_first:
            role = "FIRST_QUALIFICATION_PATH"
        elif priority == 2:
            role = "PRIORITY_ALTERNATIVE"
        elif outcome == "BLOCKED":
            role = "BLOCKED"
        else:
            role = "ALTERNATIVE"

        # Determine Rationale
        if is_first and product.decision:
            rationale = product.decision.rationale
        elif priority == 2 and product.decision:
            if request.workflow_id == "LITERAL_OVEN_250C_THEN_HOLD" and product.decision.literal_250c_path:
                rationale = product.decision.literal_250c_path
            elif product.decision.local_sample_alternative:
                rationale = f"Local sample alternative ({product.decision.local_sample_alternative})"
            else:
                rationale = gate_row.decision_scope or "Priority 2 qualification alternative."
        elif outcome == "BLOCKED":
            # Identify first failing gate
            failing_gates = [gname for gname, g in gates.items() if g.status == "FAIL"]
            failing_str = ", ".join(failing_gates) if failing_gates else "unmet requirements"
            rationale = f"Candidate blocked by non-compensatory gate failure ({failing_str})."
        else:
            rationale = gate_row.decision_scope or "Alternative qualification candidate."

        # Collect source IDs from metrics, thermal claims, etc.
        cand_source_ids: set[str] = set()
        for g in gates.values():
            cand_source_ids.update(g.source_ids)
        for m_field in (metrics.total_package_mass_g, metrics.plastic_mass_g, metrics.virgin_plastic_mass_g, metrics.recycled_material_fraction, metrics.renewable_material_fraction):
            collect_evidence_field_sources(m_field, cand_source_ids)
        for tc in thermal_claims:
            collect_evidence_field_sources(tc.temperature_c, cand_source_ids)
            collect_evidence_field_sources(tc.duration_min, cand_source_ids)
            cand_source_ids.update(tc.source_ids)
        if candidate_summary.six_hour_hold:
            collect_evidence_field_sources(candidate_summary.six_hour_hold, cand_source_ids)
        if candidate_summary.procurement:
            collect_evidence_field_sources(candidate_summary.procurement.status, cand_source_ids)
            collect_evidence_field_sources(candidate_summary.procurement.supplier, cand_source_ids)
            collect_evidence_field_sources(candidate_summary.procurement.romania_unit_price, cand_source_ids)
        if candidate_summary.transparency:
            collect_evidence_field_sources(candidate_summary.transparency.transparent_component_present, cand_source_ids)
        if candidate_summary.eol:
            collect_evidence_field_sources(candidate_summary.eol.likely_real_world_route, cand_source_ids)
        for scen in candidate_summary.scenario_details:
            collect_evidence_field_sources(scen.reduction_pct, cand_source_ids)
            collect_evidence_field_sources(scen.reduction_g, cand_source_ids)

        all_referenced_source_ids.update(cand_source_ids)

        assessment = CandidateRecommendationAssessment(
            candidate_id=cid,
            candidate_name=candidate_summary.name,
            configuration_id=cfg_id,
            gates=gates,
            outcome=outcome,
            qualified_survivor=gate_row.qualified_survivor,
            approved_for_procurement=gate_row.approved_for_procurement,
            qualification_priority=priority,
            is_first_qualification_path=is_first,
            role=role,
            rationale=rationale,
            decision_scope=gate_row.decision_scope,
            limitations=limitations,
            next_qualification_actions=list(candidate_summary.next_qualification_actions),
            metrics=metrics,
            thermal_claims=thermal_claims,
            six_hour_hold=candidate_summary.six_hour_hold,
            transparency=candidate_summary.transparency,
            procurement=candidate_summary.procurement,
            eol=candidate_summary.eol,
            scenario_details=list(candidate_summary.scenario_details),
            referenced_source_ids=sorted(cand_source_ids),
        )
        assessments_raw.append(assessment)

    # 5. Stable Ordering:
    # First qualification path (priority 1) -> priority alternatives (priority 2..) -> other alternatives -> blocked
    first_path = [a for a in assessments_raw if a.role == "FIRST_QUALIFICATION_PATH"]
    priority_alts = sorted(
        [a for a in assessments_raw if a.role == "PRIORITY_ALTERNATIVE"],
        key=lambda a: a.qualification_priority or 99,
    )
    other_alts = [a for a in assessments_raw if a.role == "ALTERNATIVE"]
    blocked = [a for a in assessments_raw if a.role == "BLOCKED"]
    ordered_assessments = first_path + priority_alts + other_alts + blocked

    # 6. Recommendation Summary
    first_qual = first_path[0] if first_path else None
    summary = RecommendationSummary(
        first_qualification_candidate_id=first_qual.candidate_id if first_qual else None,
        first_qualification_configuration_id=first_qual.configuration_id if first_qual else None,
        first_qualification_outcome=first_qual.outcome if first_qual else None,
        first_qualification_priority=first_qual.qualification_priority if first_qual else None,
        qualified_survivors=[
            CandidateRef(
                candidate_id=a.candidate_id,
                configuration_id=a.configuration_id,
                candidate_name=a.candidate_name,
                outcome=a.outcome,
                role=a.role,
                qualification_priority=a.qualification_priority,
            )
            for a in ordered_assessments
            if a.qualified_survivor
        ],
        alternatives=[
            CandidateRef(
                candidate_id=a.candidate_id,
                configuration_id=a.configuration_id,
                candidate_name=a.candidate_name,
                outcome=a.outcome,
                role=a.role,
                qualification_priority=a.qualification_priority,
            )
            for a in (priority_alts + other_alts)
        ],
        blocked=[
            CandidateRef(
                candidate_id=a.candidate_id,
                configuration_id=a.configuration_id,
                candidate_name=a.candidate_name,
                outcome=a.outcome,
                role=a.role,
                qualification_priority=a.qualification_priority,
            )
            for a in blocked
        ],
    )

    # 7. Collect Referenced Sources
    referenced_sources = {
        sid: runtime.sources[sid] for sid in sorted(all_referenced_source_ids) if sid in runtime.sources
    }

    # 8. Context Response
    context_response = RecommendationContextResponse(
        product=product,
        workflow=workflow,
        selected_configuration_id=effective_c6_config_id,
        effective_assumptions=list(runtime.effective_assumptions),
    )

    return RecommendationEvaluationResponse(
        schema_version="htf03.recommendation.v1",
        dataset_id=runtime.dataset_id,
        research_cut_off=runtime.research_cut_off,
        source_revision_hash=runtime.source_revision_hash or "unknown",
        context=context_response,
        assessments=ordered_assessments,
        recommendation=summary,
        baselines=runtime.baselines,
        referenced_sources=referenced_sources,
        disclosures=list(runtime.disclosures),
    )
