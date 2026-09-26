from typing import Annotated, Literal

from pydantic import Field, model_validator

from ._contract import Contract

Origin = Literal["OBSERVED", "USER_PROVIDED", "MANUFACTURER_SUPPLIED", "CALCULATED", "ESTIMATED", "ASSUMED"]
Verification = Literal["SOURCE_AVAILABLE", "VERIFIED", "NOT_VERIFIED", "INSUFFICIENT_DATA", "INDICATIVE"]
Text = Annotated[str, Field(min_length=1)]


class Provenance(Contract):
    origin: Origin
    verification_state: Verification
    source_reference: Text
    note: Text


class MassInput(Contract):
    value: Annotated[float, Field(gt=0)] | None
    provenance: Provenance


class FractionInput(Contract):
    value: Annotated[float, Field(ge=0, le=1)] | None
    provenance: Provenance


class TemperatureInput(Contract):
    value: float | None = None
    provenance: Provenance


class BooleanInput(Contract):
    value: bool | None = None
    provenance: Provenance


class PackageCapabilities(Contract):
    max_temperature_c: TemperatureInput | None = None
    microwave_safe: BooleanInput | None = None


class OperationalRequirements(Contract):
    max_temperature_c: TemperatureInput | None = None
    microwave_safe: BooleanInput | None = None


class Component(Contract):
    id: Text
    material: Text
    plastic_mass_g: MassInput
    recycled_content_fraction: FractionInput


class Package(Contract):
    id: Text
    label: Text
    components: Annotated[list[Component], Field(min_length=1)]
    food_contact: bool | None = None
    use_context: str | None = None
    capabilities: PackageCapabilities | None = None
    # Deprecated transitional/presentation fields preserved for backward compatibility with frontend mock.
    # Strictly ignored by the operational eligibility gate; decision-critical capabilities must carry explicit provenance in `capabilities`.
    max_temperature_c: float | None = None
    microwave_safe: bool | None = None

    @model_validator(mode="after")
    def unique_components(self):
        if len({c.id for c in self.components}) != len(self.components):
            raise ValueError("Component IDs must be unique within a package")
        return self


class Scenario(Contract):
    id: Text
    label: Text
    current: Package
    candidate: Package
    operational_requirements: OperationalRequirements | None = None


class Evidence(Contract):
    schema_version: Literal["1.0"]
    dataset_kind: Literal["ILLUSTRATIVE", "PUBLIC", "PROVIDER"]
    disclosure: Text
    scenarios: Annotated[list[Scenario], Field(min_length=1)]

    @model_validator(mode="after")
    def unique_scenarios(self):
        if len({s.id for s in self.scenarios}) != len(self.scenarios):
            raise ValueError("Scenario IDs must be unique")
        return self


class ConstraintFinding(Contract):
    constraint_id: str
    status: Literal["REVIEW_REQUIRED", "BLOCKED"]
    reason: str
    source_reference: str | None
    verification_state: Verification


class Comparison(Contract):
    scenario: Scenario
    status: Literal["CALCULATED", "INSUFFICIENT_DATA"]
    eligibility_status: Literal["ELIGIBLE", "REVIEW_REQUIRED", "BLOCKED"]
    origin: Literal["CALCULATED"] = "CALCULATED"
    verification_state: Literal["INDICATIVE", "INSUFFICIENT_DATA"]
    current_virgin_pack_g: float | None
    candidate_virgin_pack_g: float | None
    reduction_g: float | None
    reduction_pct: float | None
    missing_fields: list[str]
    constraints: list[ConstraintFinding]


class Health(Contract):
    status: Literal["READY", "UNAVAILABLE"]
    evidence_version: str | None
    dataset_kind: str | None
    disclosure: str | None
    error: str | None


# --- Selection MVP Models (INT-R2 Additive Domain Extension) ---

ComponentBoundary = Literal[
    "TRAY_BODY_ONLY",
    "BODY_AND_FILM",
    "HINGED_COMPLETE_PACK",
    "BOTTLE_AND_CLOSURE",
    "CUSTOM",
]

RecycledContentPointValueStatus = Literal[
    "EXACT_POINT_VALUE",
    "NON_POINT_VALUE",
    "UNSTATED",
]

ComparabilityRating = Literal[
    "STRONG",
    "BOUNDED_WITH_QUALIFIER",
    "ASYMMETRIC_BOUNDARY",
    "NOT_COMPARABLE",
]

NextActionCode = Literal[
    "REJECT_INCOMPATIBLE",
    "REQUEST_PCR_EVIDENCE",
    "REQUEST_CAPABILITY_EVIDENCE",
    "VERIFY_OPERATIONAL_PREMISES",
    "ADVANCE_TO_QA_REVIEW",
]


class SelectionMetadata(Contract):
    """Additive metadata wrapper for Selection MVP candidates and baseline.
    Preserves existing A-core Package models and evidence fixtures without modification."""
    component_boundary: ComponentBoundary
    recycled_content_point_value_status: RecycledContentPointValueStatus = "UNSTATED"
    recycled_content_scope: str | None = None
    evidence_date: str | None = None


class CandidateArticle(Contract):
    """Additive composition: pairs existing Package with Selection-specific metadata."""
    package: Package
    metadata: SelectionMetadata


class ComparabilityAssessment(Contract):
    rating: ComparabilityRating
    boundary_match: bool
    notes: list[str]


class NextAction(Contract):
    action_code: NextActionCode
    summary: Text
    details: Text


class AnnualImpactResult(Contract):
    annual_units: Annotated[int, Field(gt=0)]
    annual_reduction_kg: float | None = None
    annual_current_virgin_kg: float | None = None
    annual_candidate_virgin_kg: float | None = None
    status: Literal["CALCULATED", "INSUFFICIENT_DATA"]
    is_actionable: bool
    disclosure: Text


class CalculationResult(Contract):
    status: Literal["CALCULATED", "INSUFFICIENT_DATA"]
    verification_state: Literal["INDICATIVE", "INSUFFICIENT_DATA"]
    current_virgin_pack_g: float | None = None
    candidate_virgin_pack_g: float | None = None
    reduction_g: float | None = None
    reduction_pct: float | None = None
    missing_fields: list[str] = Field(default_factory=list)


class EligibilityResult(Contract):
    status: Literal["ELIGIBLE", "REVIEW_REQUIRED", "BLOCKED"]
    constraints: list[ConstraintFinding] = Field(default_factory=list)


class CandidateAssessment(Contract):
    candidate: Package
    metadata: SelectionMetadata
    comparability: ComparabilityAssessment
    calculation: CalculationResult
    eligibility: EligibilityResult
    annual_impact: AnnualImpactResult | None = None
    next_action: NextAction


class BaselineAssessment(Contract):
    package: Package
    metadata: SelectionMetadata
    virgin_plastic_g: float | None
    calculation_status: Literal["CALCULATED", "INSUFFICIENT_DATA"]


class Portfolio(Contract):
    id: Text
    label: Text
    use_context: Text
    dataset_kind: Literal["ILLUSTRATIVE", "PUBLIC", "PROVIDER"]
    disclosure: Text
    baseline: CandidateArticle
    candidates: Annotated[list[CandidateArticle], Field(min_length=1)]
    default_operational_requirements: OperationalRequirements | None = None


# --- API Request & Response Contracts ---


class SelectionRequest(Contract):
    use_context: Text | None = None
    required_max_temperature_c: float | None = None
    microwave_required: bool | None = None
    annual_units: Annotated[int, Field(gt=0)] | None = None


class SelectionResponse(Contract):
    portfolio_id: Text
    label: Text
    dataset_kind: Literal["ILLUSTRATIVE", "PUBLIC", "PROVIDER"]
    disclosure: Text
    use_context: Text
    operational_requirements: OperationalRequirements
    annual_units_requested: int | None = None
    baseline: BaselineAssessment
    candidates: list[CandidateAssessment]
    summary_verdict: Text
