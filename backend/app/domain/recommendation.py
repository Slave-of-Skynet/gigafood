from typing import Annotated, Any, Literal
from pydantic import Field, field_validator
from app.domain._contract import Contract

EpistemicState = Literal[
    "OBSERVED_VERIFIED",
    "DERIVED_EXACT",
    "ESTIMATED",
    "ASSUMED",
    "UNKNOWN",
    "CONFLICT",
]

DisplayPolicy = Literal[
    "DISPLAY_VERIFIED",
    "DISPLAY_DERIVED",
    "DISPLAY_ESTIMATED",
    "DISPLAY_WITH_QUALIFIER",
    "DO_NOT_DISPLAY",
]

ConfidenceLevel = Literal["HIGH", "MEDIUM", "LOW", "VERY_LOW"]

GateStatus = Literal["PASS", "QUALIFICATION_REQUIRED", "UNKNOWN", "FAIL"]

RecommendationOutcome = Literal[
    "RECOMMENDED UNDER CURRENT ASSUMPTIONS",
    "ALTERNATIVE",
    "QUALIFICATION REQUIRED",
    "BLOCKED",
]

CandidateRole = Literal[
    "FIRST_QUALIFICATION_PATH",
    "PRIORITY_ALTERNATIVE",
    "ALTERNATIVE",
    "COMPARATOR",
    "BLOCKED",
]

ProductId = Literal["P1", "P2", "P3", "P4"]
WorkflowId = Literal["POST_COOK_HOT_HOLD_6H", "LITERAL_OVEN_250C_THEN_HOLD"]
CandidateId = Literal["C1", "C2", "C3", "C4", "C5", "C6"]
ConfigurationId = Literal["C6-RO-P", "C6-RO-W", "C6-RO-H", "C6-EU"]
BaselineId = Literal["B1", "B2", "B3"]

GateName = Literal[
    "physical_fit",
    "food_contact",
    "thermal_workflow",
    "grease_leak",
    "transparent_viewing",
    "procurement",
]

Text = Annotated[str, Field(min_length=1)]


class IntervalValue(Contract):
    low: float
    central: float
    high: float


class EstimateDetails(Contract):
    low: float
    central: float
    high: float
    method: str
    formula: str
    assumptions: list[str] | str | None = None
    confidence: ConfidenceLevel | str | None = None
    sensitivity: str | None = None
    interval_kind: str | None = None


class EvidenceField(Contract):
    kind: Literal["evidence_field"] = "evidence_field"
    value: IntervalValue | float | int | str | bool | list[Any] | dict[str, Any] | None = None
    state: EpistemicState
    unit: str | None = None
    source_ids: list[str] = Field(default_factory=list)
    confidence: ConfidenceLevel
    qualifier: str | None = None
    scope: str
    display_policy: DisplayPolicy
    calculation_id: str | None = None
    inherited_boundary: dict[str, Any] | None = None
    estimate: EstimateDetails | None = None
    reasoning_status: str | None = None
    environmental_boundary: str | None = None
    metric_class: str | None = None


class ThermalClaim(Contract):
    component: str
    mode: str
    temperature_c: EvidenceField
    duration_min: EvidenceField
    evidence_kind: str | None = None
    qualification: str | None = None
    source_ids: list[str] = Field(default_factory=list)
    temperature_min_c: EvidenceField | None = None


class SourceReference(Contract):
    source_id: str
    title: str
    url: str | None = None
    scope: str
    findings: str | None = None
    limitations: str | None = None
    published_or_version_date: str | None = None
    accessed_at: str | None = None
    access_status: str | None = None
    romania_evidence: bool = False
    tier: int | None = None


class HardGate(Contract):
    gate_id: GateName
    status: GateStatus
    reason: str
    source_ids: list[str] = Field(default_factory=list)


class CanonicalGateRecord(Contract):
    status: GateStatus
    reason: Annotated[str, Field(min_length=1)]
    source_ids: list[str] = Field(default_factory=list)

    @field_validator("reason")
    @classmethod
    def validate_reason_non_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Gate reason must be a non-empty string")
        return v


class CanonicalGateRow(Contract):
    product_id: ProductId
    candidate_id: CandidateId
    workflow: WorkflowId
    configuration_id: ConfigurationId | None = None
    gates: dict[GateName, CanonicalGateRecord]
    outcome: Literal["QUALIFICATION REQUIRED", "BLOCKED"]
    approved_for_procurement: Literal[False] = False
    qualified_survivor: Literal[False] = False
    qualification_priority: int | None = None
    decision_scope: str | None = None



class ProductDecisionSummary(Contract):
    product_id: ProductId
    outcome: RecommendationOutcome
    approved_for_procurement: bool = False
    first_qualification_candidate: CandidateId | None = None
    local_sample_alternative: str | None = None
    rationale: str
    literal_250c_path: str | None = None
    display_benefit: str | None = None


class ProductArchetype(Contract):
    product_id: ProductId
    name: str
    fill_geometry: EvidenceField
    decision: ProductDecisionSummary | None = None


class WorkflowDefinition(Contract):
    workflow_id: WorkflowId
    name: str
    description: str
    is_primary: bool
    modes: list[str]
    assumption_summary: str
    target_temperature_c: float | None = None
    target_duration_min: int | None = None
    status: Literal["ASSUMED"] = "ASSUMED"


class BaselineSummary(Contract):
    baseline_id: BaselineId
    identity: str
    is_profi_incumbent: bool
    description: str
    observed_virgin_fraction: float | None = None
    estimated_mass_g: IntervalValue | None = None
    observed_price_ron: float | None = None
    resolution_status: str | None = None
    notes: str | None = None


class CandidateMetrics(Contract):
    total_package_mass_g: EvidenceField | None = None
    plastic_mass_g: EvidenceField | None = None
    virgin_plastic_mass_g: EvidenceField | None = None
    recycled_material_fraction: EvidenceField | None = None
    renewable_material_fraction: EvidenceField | None = None


class PackagingConfiguration(Contract):
    configuration_id: ConfigurationId
    parent_candidate_id: Literal["C6"] = "C6"
    role: str
    identity: EvidenceField
    dimensions: EvidenceField | None = None
    capacity_ml: EvidenceField | None = None
    thermal_claims: list[ThermalClaim] = Field(default_factory=list)
    metrics: CandidateMetrics | None = None
    limitations: list[str] = Field(default_factory=list)


class ScenarioDetail(Contract):
    scenario_id: str
    baseline_id: BaselineId
    label: str
    default_headline: bool = False
    conditional_only: bool = True
    reduction_pct: EvidenceField | None = None
    reduction_g: EvidenceField | None = None


class ProcurementDetails(Contract):
    status: EvidenceField
    supplier: EvidenceField
    current_stock: EvidenceField
    order_unit: EvidenceField
    industrial_moq: EvidenceField
    lead_time: EvidenceField
    romania_unit_price: EvidenceField
    supplier_contact_action: str | None = None


class TransparencyDetails(Contract):
    transparent_component_present: EvidenceField
    material: EvidenceField | None = None
    area_coverage: EvidenceField | None = None
    used_during_oven: EvidenceField | None = None
    used_post_oven: EvidenceField | None = None
    anti_fog: EvidenceField | None = None
    temperature_limit: EvidenceField | None = None


class EolDetails(Contract):
    design_for_recycling: EvidenceField | None = None
    certification: EvidenceField | None = None
    Romanian_collection: EvidenceField | None = None
    Romanian_sorting: EvidenceField | None = None
    Romanian_reprocessing: EvidenceField | None = None
    Romanian_composting: EvidenceField | None = None
    likely_real_world_route: EvidenceField | None = None


class CandidateSummary(Contract):
    candidate_id: CandidateId
    name: str
    exact_configuration: EvidenceField | None = None
    recommended_applications: list[str] = Field(default_factory=list)
    dimensions: EvidenceField | None = None
    capacity_ml: EvidenceField | None = None
    metrics: CandidateMetrics
    thermal_claims: list[ThermalClaim] = Field(default_factory=list)
    six_hour_hold: EvidenceField | None = None
    procurement: ProcurementDetails | None = None
    transparency: TransparencyDetails | None = None
    eol: EolDetails | None = None
    scenario_details: list[ScenarioDetail] = Field(default_factory=list)
    limitations: list[str] = Field(default_factory=list)
    next_qualification_actions: list[str] = Field(default_factory=list)


class CandidateRecommendationAssessment(Contract):
    candidate_id: CandidateId
    candidate_name: str
    configuration_id: ConfigurationId | None = None
    gates: dict[GateName, HardGate]
    outcome: RecommendationOutcome
    qualified_survivor: bool = False
    approved_for_procurement: bool = False
    qualification_priority: int | None = None
    is_first_qualification_path: bool = False
    role: CandidateRole
    rationale: str
    decision_scope: str | None = None
    limitations: list[str] = Field(default_factory=list)
    next_qualification_actions: list[str] = Field(default_factory=list)
    metrics: CandidateMetrics
    thermal_claims: list[ThermalClaim] = Field(default_factory=list)
    six_hour_hold: EvidenceField | None = None
    transparency: TransparencyDetails | None = None
    procurement: ProcurementDetails | None = None
    eol: EolDetails | None = None
    scenario_details: list[ScenarioDetail] = Field(default_factory=list)
    referenced_source_ids: list[str] = Field(default_factory=list)


class RecommendationContextResponse(Contract):
    product: ProductArchetype
    workflow: WorkflowDefinition
    selected_configuration_id: ConfigurationId | None = None
    effective_assumptions: list[str] = Field(default_factory=list)


class CandidateRef(Contract):
    candidate_id: CandidateId
    configuration_id: ConfigurationId | None = None
    candidate_name: str
    outcome: RecommendationOutcome
    role: CandidateRole
    qualification_priority: int | None = None


class RecommendationSummary(Contract):
    first_qualification_candidate_id: CandidateId | None = None
    first_qualification_configuration_id: ConfigurationId | None = None
    first_qualification_outcome: RecommendationOutcome | None = None
    first_qualification_priority: int | None = None
    qualified_survivors: list[CandidateRef] = Field(default_factory=list)
    alternatives: list[CandidateRef] = Field(default_factory=list)
    blocked: list[CandidateRef] = Field(default_factory=list)


class RecommendationProductsResponse(Contract):
    schema_version: str = "htf03.recommendation.v1"
    dataset_id: str = "HTF-03-canonical-packaging"
    research_cut_off: str = "2026-09-26"
    market: str = "Romania"
    source_revision_hash: str
    products: list[ProductArchetype]
    workflows: list[WorkflowDefinition]
    default_product_id: ProductId = "P1"
    default_workflow_id: WorkflowId = "POST_COOK_HOT_HOLD_6H"
    effective_assumptions: list[str] = Field(default_factory=list)


class RenderingContract(Contract):
    always_show: list[str] = Field(default_factory=list)
    estimated_prefix: str
    unknown_label: str
    use_null_as_zero: bool
    round_mass_decimals: int
    round_percentage_decimals: int
    hide_central_without_range: bool
    hide_unknown_numeric: bool
    automatic_procurement_approval: bool
    default_benefit_badge: str
    gating: str
    material_carbon: str
    estimated_baseline: str


class RecommendationCandidatesResponse(Contract):
    schema_version: str = "htf03.recommendation.v1"
    dataset_id: str = "HTF-03-canonical-packaging"
    research_cut_off: str = "2026-09-26"
    market: str = "Romania"
    source_revision_hash: str
    candidates: list[CandidateSummary]
    configurations: list[PackagingConfiguration]
    baselines: list[BaselineSummary]
    referenced_sources: dict[str, SourceReference]
    rendering_contract: RenderingContract
    disclosures: list[str] = Field(default_factory=list)



class RecommendationEvaluationRequest(Contract):
    product_id: str
    workflow_id: str
    configuration_id: str | None = None


class RecommendationEvaluationResponse(Contract):
    schema_version: str = "htf03.recommendation.v1"
    dataset_id: str = "HTF-03-canonical-packaging"
    research_cut_off: str = "2026-09-26"
    source_revision_hash: str
    context: RecommendationContextResponse
    assessments: list[CandidateRecommendationAssessment]
    recommendation: RecommendationSummary
    baselines: list[BaselineSummary]
    referenced_sources: dict[str, SourceReference]
    disclosures: list[str] = Field(default_factory=list)
