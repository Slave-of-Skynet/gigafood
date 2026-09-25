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
