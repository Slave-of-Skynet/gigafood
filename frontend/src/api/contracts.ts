// Shared surface: mirrors backend/app/domain/packaging.py. Review changes together.
export type Origin = 'OBSERVED' | 'USER_PROVIDED' | 'MANUFACTURER_SUPPLIED' | 'CALCULATED' | 'ESTIMATED' | 'ASSUMED';
export type Verification = 'SOURCE_AVAILABLE' | 'VERIFIED' | 'NOT_VERIFIED' | 'INSUFFICIENT_DATA' | 'INDICATIVE';
export interface Provenance {
  origin: Origin; verification_state: Verification; source_reference: string; note: string;
}
export interface NumericInput { value: number | null; provenance: Provenance }
export interface BooleanInput { value: boolean | null; provenance: Provenance }
export interface PackageCapabilities {
  max_temperature_c?: NumericInput | null;
  microwave_safe?: BooleanInput | null;
}
export interface OperationalRequirements {
  max_temperature_c?: NumericInput | null;
  microwave_safe?: BooleanInput | null;
}
export interface Component {
  id: string; material: string; plastic_mass_g: NumericInput; recycled_content_fraction: NumericInput;
}
export interface Package {
  id: string; label: string; components: Component[]; food_contact: boolean | null; use_context: string | null;
  // Deprecated transitional fields preserved for UI mock compatibility.
  // Strictly ignored by backend eligibility gate; decision-critical capabilities must be in capabilities.
  max_temperature_c?: number | null; microwave_safe?: boolean | null;
  capabilities?: PackageCapabilities | null;
}
export interface Scenario {
  id: string; label: string; current: Package; candidate: Package;
  operational_requirements?: OperationalRequirements | null;
}
export interface Evidence {
  schema_version: '1.0'; dataset_kind: 'ILLUSTRATIVE' | 'PUBLIC' | 'PROVIDER'; disclosure: string; scenarios: Scenario[];
}
export interface ConstraintFinding {
  constraint_id: string; status: 'REVIEW_REQUIRED' | 'BLOCKED'; reason: string;
  source_reference: string | null; verification_state: Verification;
}
export type EligibilityStatus = 'ELIGIBLE' | 'REVIEW_REQUIRED' | 'BLOCKED';

export interface Comparison {
  scenario: Scenario; status: 'CALCULATED' | 'INSUFFICIENT_DATA';
  eligibility_status: EligibilityStatus;
  origin: 'CALCULATED';
  verification_state: 'INDICATIVE' | 'INSUFFICIENT_DATA';
  current_virgin_pack_g: number | null; candidate_virgin_pack_g: number | null;
  reduction_g: number | null; reduction_pct: number | null;
  missing_fields: string[]; constraints: ConstraintFinding[];
}
export interface Health {
  status: 'READY' | 'UNAVAILABLE'; evidence_version: string | null; dataset_kind: string | null;
  disclosure: string | null; error: string | null;
}

export type ComponentBoundary = 'TRAY_BODY_ONLY' | 'BODY_AND_FILM' | 'HINGED_COMPLETE_PACK' | 'BOTTLE_AND_CLOSURE' | 'CUSTOM';
export type RecycledContentPointValueStatus = 'EXACT_POINT_VALUE' | 'NON_POINT_VALUE' | 'UNSTATED';
export type ComparabilityRating = 'STRONG' | 'BOUNDED_WITH_QUALIFIER' | 'ASYMMETRIC_BOUNDARY' | 'NOT_COMPARABLE';
export type NextActionCode = 'REJECT_INCOMPATIBLE' | 'REQUEST_PCR_EVIDENCE' | 'REQUEST_CAPABILITY_EVIDENCE' | 'VERIFY_OPERATIONAL_PREMISES' | 'ADVANCE_TO_QA_REVIEW';
export interface SelectionMetadata {
  component_boundary: ComponentBoundary;
  recycled_content_point_value_status: RecycledContentPointValueStatus;
  recycled_content_scope: string | null;
  evidence_date: string | null;
}
export interface CandidateArticle { package: Package; metadata: SelectionMetadata }
export interface ComparabilityAssessment {
  rating: ComparabilityRating; boundary_match: boolean; notes: string[];
}
export interface NextAction { action_code: NextActionCode; summary: string; details: string }
export interface AnnualImpactResult {
  annual_units: number; annual_reduction_kg: number | null;
  annual_current_virgin_kg: number | null; annual_candidate_virgin_kg: number | null;
  status: Comparison['status']; is_actionable: boolean; disclosure: string;
}
export interface CalculationResult {
  status: Comparison['status']; verification_state: Comparison['verification_state'];
  current_virgin_pack_g: number | null; candidate_virgin_pack_g: number | null;
  reduction_g: number | null; reduction_pct: number | null; missing_fields: string[];
}
export interface EligibilityResult { status: EligibilityStatus; constraints: ConstraintFinding[] }
export interface CandidateAssessment {
  candidate: Package; metadata: SelectionMetadata; comparability: ComparabilityAssessment;
  calculation: CalculationResult; eligibility: EligibilityResult;
  annual_impact: AnnualImpactResult | null; next_action: NextAction;
}
export interface BaselineAssessment {
  package: Package; metadata: SelectionMetadata; virgin_plastic_g: number | null;
  calculation_status: Comparison['status'];
}
export interface Portfolio {
  id: string; label: string; use_context: string; dataset_kind: Evidence['dataset_kind'];
  disclosure: string; baseline: CandidateArticle; candidates: CandidateArticle[];
  default_operational_requirements?: OperationalRequirements | null;
}
export interface PortfolioSummary {
  id: string; label: string; use_context: string; dataset_kind: Evidence['dataset_kind'];
  disclosure: string; baseline_label: string; candidate_count: number;
}
export interface SelectionRequest {
  use_context?: string | null; required_max_temperature_c?: number | null;
  microwave_required?: boolean | null; annual_units?: number | null;
}
export interface SelectionResponse {
  portfolio_id: string; label: string; dataset_kind: Evidence['dataset_kind'];
  disclosure: string; use_context: string; operational_requirements: OperationalRequirements;
  annual_units_requested: number | null; baseline: BaselineAssessment;
  candidates: CandidateAssessment[]; summary_verdict: string;
}
