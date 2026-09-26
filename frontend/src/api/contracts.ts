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

export interface EconomicScenarioRequest {
  annual_units: number;
  current_cost_eur_per_unit: number;
  candidate_cost_eur_per_unit: number;
  one_time_transition_cost_eur?: number | null;
}

export interface EconomicScenarioResponse {
  scenario_id: string;
  annual_units: number;
  current_cost_eur_per_unit: number;
  candidate_cost_eur_per_unit: number;
  one_time_transition_cost_eur: number | null;
  current_annual_spend_eur: number;
  candidate_annual_spend_eur: number;
  annual_cost_delta_eur: number;
  first_year_cost_delta_eur: number | null;
  annual_virgin_plastic_reduction_kg: number | null;
  incremental_cost_per_kg_avoided_eur: number | null;
  environmental_status: 'CALCULATED' | 'INSUFFICIENT_DATA';
  eligibility_status: EligibilityStatus;
  origin: 'CALCULATED';
  input_origin: 'USER_PROVIDED';
  verification_state: 'NOT_VERIFIED';
  disclosure: string;
}

// ============================================================================
// HTF-03 Recommendation Runtime Contracts (Mirrors backend/app/domain/recommendation.py)
// ============================================================================

export type EpistemicState =
  | 'OBSERVED_VERIFIED'
  | 'DERIVED_EXACT'
  | 'ESTIMATED'
  | 'ASSUMED'
  | 'UNKNOWN'
  | 'CONFLICT';

export type DisplayPolicy =
  | 'DISPLAY_VERIFIED'
  | 'DISPLAY_DERIVED'
  | 'DISPLAY_ESTIMATED'
  | 'DISPLAY_WITH_QUALIFIER'
  | 'DO_NOT_DISPLAY';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'VERY_LOW';

export type GateStatus = 'PASS' | 'QUALIFICATION_REQUIRED' | 'UNKNOWN' | 'FAIL';

export type RecommendationOutcome =
  | 'RECOMMENDED UNDER CURRENT ASSUMPTIONS'
  | 'ALTERNATIVE'
  | 'QUALIFICATION REQUIRED'
  | 'BLOCKED';

export type CandidateRole =
  | 'FIRST_QUALIFICATION_PATH'
  | 'PRIORITY_ALTERNATIVE'
  | 'ALTERNATIVE'
  | 'COMPARATOR'
  | 'BLOCKED';

export type ProductId = 'P1' | 'P2' | 'P3' | 'P4';
export type WorkflowId = 'POST_COOK_HOT_HOLD_6H' | 'LITERAL_OVEN_250C_THEN_HOLD';
export type CandidateId = 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';
export type ConfigurationId = 'C6-RO-P' | 'C6-RO-W' | 'C6-RO-H' | 'C6-EU';
export type BaselineId = 'B1' | 'B2' | 'B3';

export type GateName =
  | 'physical_fit'
  | 'food_contact'
  | 'thermal_workflow'
  | 'grease_leak'
  | 'transparent_viewing'
  | 'procurement';

export interface IntervalValue {
  low: number;
  central: number;
  high: number;
}

export interface EstimateDetails {
  low: number;
  central: number;
  high: number;
  method: string;
  formula: string;
  assumptions?: string[] | string | null;
  confidence?: ConfidenceLevel | string | null;
  sensitivity?: string | null;
  interval_kind?: string | null;
}

export interface EvidenceField<T = number | string | boolean | IntervalValue | unknown[] | Record<string, unknown> | null> {
  kind: 'evidence_field';
  value?: T;
  state: EpistemicState;
  unit?: string | null;
  source_ids: string[];
  confidence: ConfidenceLevel;
  qualifier?: string | null;
  scope: string;
  display_policy: DisplayPolicy;
  calculation_id?: string | null;
  inherited_boundary?: Record<string, unknown> | null;
  estimate?: EstimateDetails | null;
  reasoning_status?: string | null;
  environmental_boundary?: string | null;
  metric_class?: string | null;
}

export interface ThermalClaim {
  component: string;
  mode: string;
  temperature_c: EvidenceField;
  duration_min: EvidenceField;
  evidence_kind?: string | null;
  qualification?: string | null;
  source_ids: string[];
  temperature_min_c?: EvidenceField | null;
}

export interface SourceReference {
  source_id: string;
  title: string;
  url?: string | null;
  scope: string;
  findings?: string | null;
  limitations?: string | null;
  published_or_version_date?: string | null;
  accessed_at?: string | null;
  access_status?: string | null;
  romania_evidence: boolean;
  tier?: number | null;
}

export interface HardGate {
  gate_id: GateName;
  status: GateStatus;
  reason: string;
  source_ids: string[];
}

export interface ProductDecisionSummary {
  product_id: ProductId;
  outcome: RecommendationOutcome;
  approved_for_procurement: boolean;
  first_qualification_candidate?: CandidateId | null;
  local_sample_alternative?: string | null;
  rationale: string;
  literal_250c_path?: string | null;
  display_benefit?: string | null;
}

export interface ProductArchetype {
  product_id: ProductId;
  name: string;
  fill_geometry: EvidenceField;
  decision?: ProductDecisionSummary | null;
}

export interface WorkflowDefinition {
  workflow_id: WorkflowId;
  name: string;
  description: string;
  is_primary: boolean;
  modes: string[];
  assumption_summary: string;
  target_temperature_c?: number | null;
  target_duration_min?: number | null;
  status: 'ASSUMED';
}

export interface BaselineSummary {
  baseline_id: BaselineId;
  identity: string;
  is_profi_incumbent: boolean;
  description: string;
  observed_virgin_fraction?: number | null;
  estimated_mass_g?: IntervalValue | null;
  observed_price_ron?: number | null;
  resolution_status?: string | null;
  notes?: string | null;
}

export interface CandidateMetrics {
  total_package_mass_g?: EvidenceField | null;
  plastic_mass_g?: EvidenceField | null;
  virgin_plastic_mass_g?: EvidenceField | null;
  recycled_material_fraction?: EvidenceField | null;
  renewable_material_fraction?: EvidenceField | null;
}

export interface PackagingConfiguration {
  configuration_id: ConfigurationId;
  parent_candidate_id: 'C6';
  role: string;
  identity: EvidenceField;
  dimensions?: EvidenceField | null;
  capacity_ml?: EvidenceField | null;
  thermal_claims: ThermalClaim[];
  metrics?: CandidateMetrics | null;
  limitations: string[];
}

export interface ScenarioDetail {
  scenario_id: string;
  baseline_id: BaselineId;
  label: string;
  default_headline: boolean;
  conditional_only: boolean;
  reduction_pct?: EvidenceField | null;
  reduction_g?: EvidenceField | null;
}

export interface ProcurementDetails {
  status: EvidenceField;
  supplier: EvidenceField;
  current_stock: EvidenceField;
  order_unit: EvidenceField;
  industrial_moq: EvidenceField;
  lead_time: EvidenceField;
  romania_unit_price: EvidenceField;
  supplier_contact_action?: string | null;
}

export interface TransparencyDetails {
  transparent_component_present: EvidenceField;
  material?: EvidenceField | null;
  area_coverage?: EvidenceField | null;
  used_during_oven?: EvidenceField | null;
  used_post_oven?: EvidenceField | null;
  anti_fog?: EvidenceField | null;
  temperature_limit?: EvidenceField | null;
}

export interface EolDetails {
  design_for_recycling?: EvidenceField | null;
  certification?: EvidenceField | null;
  Romanian_collection?: EvidenceField | null;
  Romanian_sorting?: EvidenceField | null;
  Romanian_reprocessing?: EvidenceField | null;
  Romanian_composting?: EvidenceField | null;
  likely_real_world_route?: EvidenceField | null;
}

export interface CandidateSummary {
  candidate_id: CandidateId;
  name: string;
  exact_configuration?: EvidenceField | null;
  recommended_applications: string[];
  dimensions?: EvidenceField | null;
  capacity_ml?: EvidenceField | null;
  metrics: CandidateMetrics;
  thermal_claims: ThermalClaim[];
  six_hour_hold?: EvidenceField | null;
  procurement?: ProcurementDetails | null;
  transparency?: TransparencyDetails | null;
  eol?: EolDetails | null;
  scenario_details: ScenarioDetail[];
  limitations: string[];
  next_qualification_actions: string[];
}

export interface CandidateRecommendationAssessment {
  candidate_id: CandidateId;
  candidate_name: string;
  configuration_id?: ConfigurationId | null;
  gates: Record<GateName, HardGate>;
  outcome: RecommendationOutcome;
  qualified_survivor: boolean;
  approved_for_procurement: boolean;
  qualification_priority?: number | null;
  is_first_qualification_path: boolean;
  role: CandidateRole;
  rationale: string;
  decision_scope?: string | null;
  limitations: string[];
  next_qualification_actions: string[];
  metrics: CandidateMetrics;
  thermal_claims: ThermalClaim[];
  six_hour_hold?: EvidenceField | null;
  transparency?: TransparencyDetails | null;
  procurement?: ProcurementDetails | null;
  eol?: EolDetails | null;
  scenario_details: ScenarioDetail[];
  referenced_source_ids: string[];
}

export interface RecommendationContextResponse {
  product: ProductArchetype;
  workflow: WorkflowDefinition;
  selected_configuration_id?: ConfigurationId | null;
  effective_assumptions: string[];
}

export interface CandidateRef {
  candidate_id: CandidateId;
  configuration_id?: ConfigurationId | null;
  candidate_name: string;
  outcome: RecommendationOutcome;
  role: CandidateRole;
  qualification_priority?: number | null;
}

export interface RecommendationSummary {
  first_qualification_candidate_id?: CandidateId | null;
  first_qualification_configuration_id?: ConfigurationId | null;
  first_qualification_outcome?: RecommendationOutcome | null;
  first_qualification_priority?: number | null;
  qualified_survivors: CandidateRef[];
  alternatives: CandidateRef[];
  blocked: CandidateRef[];
}

export interface RecommendationProductsResponse {
  schema_version: string;
  dataset_id: string;
  research_cut_off: string;
  market: string;
  source_revision_hash: string;
  products: ProductArchetype[];
  workflows: WorkflowDefinition[];
  default_product_id: ProductId;
  default_workflow_id: WorkflowId;
  effective_assumptions: string[];
}

export interface RecommendationCandidatesResponse {
  schema_version: string;
  dataset_id: string;
  research_cut_off: string;
  market: string;
  source_revision_hash: string;
  candidates: CandidateSummary[];
  configurations: PackagingConfiguration[];
  baselines: BaselineSummary[];
  referenced_sources: Record<string, SourceReference>;
  rendering_contract: Record<string, unknown>;
  disclosures: string[];
}

export interface RecommendationEvaluationRequest {
  product_id: string;
  workflow_id: string;
  configuration_id?: string | null;
}

export interface RecommendationEvaluationResponse {
  schema_version: string;
  dataset_id: string;
  research_cut_off: string;
  source_revision_hash: string;
  context: RecommendationContextResponse;
  assessments: CandidateRecommendationAssessment[];
  recommendation: RecommendationSummary;
  baselines: BaselineSummary[];
  referenced_sources: Record<string, SourceReference>;
  disclosures: string[];
}
