import staticSnapshot from './staticApiSnapshot.json';
import { getOfflineCandidates, getOfflineEvaluation, getOfflineProducts } from './offlineFallback';
import { ApiUnavailableError, isRecord, type ApiResponse, type SnapshotIdentity } from './provenance';
import type {
  Comparison, EconomicScenarioRequest, EconomicScenarioResponse, Evidence, Health,
  PortfolioSummary, SelectionRequest, SelectionResponse, RecommendationProductsResponse,
  RecommendationCandidatesResponse, RecommendationEvaluationRequest, RecommendationEvaluationResponse,
} from './contracts';

type Guard<T> = (value: unknown) => value is T;
type Recording = { payload: unknown; file: string };
const hasArray = (v: Record<string, unknown>, key: string) => Array.isArray(v[key]);
const hasRevision = (v: Record<string, unknown>) => typeof v.dataset_id === 'string' && typeof v.source_revision_hash === 'string' && typeof v.research_cut_off === 'string';
const isHealth: Guard<Health> = (v): v is Health => isRecord(v) && ['READY', 'UNAVAILABLE'].includes(String(v.status));
const isEvidence: Guard<Evidence> = (v): v is Evidence => isRecord(v) && v.schema_version === '1.0' && hasArray(v, 'scenarios');
const isPortfolios: Guard<PortfolioSummary[]> = (v): v is PortfolioSummary[] => Array.isArray(v) && v.every(p => isRecord(p) && typeof p.id === 'string');
const isProducts: Guard<RecommendationProductsResponse> = (v): v is RecommendationProductsResponse =>
  isRecord(v) && hasRevision(v) && hasArray(v, 'products') && hasArray(v, 'workflows') && typeof v.default_product_id === 'string' && typeof v.default_workflow_id === 'string';
const isCandidates: Guard<RecommendationCandidatesResponse> = (v): v is RecommendationCandidatesResponse =>
  isRecord(v) && hasRevision(v) && hasArray(v, 'candidates') && hasArray(v, 'configurations') && isRecord(v.referenced_sources) && isRecord(v.rendering_contract);
function comparisonGuard(id: string): Guard<Comparison> {
  return (v): v is Comparison => isRecord(v) && isRecord(v.scenario) && v.scenario.id === id &&
    ['CALCULATED', 'INSUFFICIENT_DATA'].includes(String(v.status)) && Array.isArray(v.constraints);
}
function portfolioGuard(id: string, body: SelectionRequest = {}): Guard<SelectionResponse> {
  return (v): v is SelectionResponse => isRecord(v) && v.portfolio_id === id && isRecord(v.baseline) &&
    Array.isArray(v.candidates) && isRecord(v.operational_requirements) &&
    (body.annual_units == null || v.annual_units_requested === body.annual_units) &&
    (body.use_context == null || v.use_context === body.use_context) &&
    (body.required_max_temperature_c == null || (isRecord(v.operational_requirements.max_temperature_c) && v.operational_requirements.max_temperature_c.value === body.required_max_temperature_c)) &&
    (body.microwave_required == null || (isRecord(v.operational_requirements.microwave_safe) && v.operational_requirements.microwave_safe.value === body.microwave_required));
}
function recommendationGuard(body: RecommendationEvaluationRequest): Guard<RecommendationEvaluationResponse> {
  return (v): v is RecommendationEvaluationResponse => isRecord(v) && hasRevision(v) && isRecord(v.context) &&
    isRecord(v.context.product) && v.context.product.product_id === body.product_id &&
    isRecord(v.context.workflow) && v.context.workflow.workflow_id === body.workflow_id &&
    // Omitted configuration requests the backend's workflow-specific default.
    (body.configuration_id == null || v.context.selected_configuration_id === body.configuration_id) &&
    Array.isArray(v.assessments) && isRecord(v.recommendation) && isRecord(v.referenced_sources);
}
function idPath(id: string): string {
  if (typeof id !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]{0,199}$/.test(id)) throw new ApiUnavailableError('INVALID_CONTEXT');
  return encodeURIComponent(id);
}
function ownValue(values: unknown, id: string): unknown {
  return isRecord(values) && Object.hasOwn(values, id) ? values[id] : undefined;
}
function identity(recording: Recording): SnapshotIdentity {
  const value = recording.payload;
  return {
    file: recording.file, createdAt: null,
    ...(isRecord(value) && typeof value.dataset_id === 'string' ? { datasetId: value.dataset_id } : {}),
    ...(isRecord(value) && typeof value.research_cut_off === 'string' ? { researchCutoff: value.research_cut_off } : {}),
    ...(isRecord(value) && typeof value.source_revision_hash === 'string' ? { sourceRevision: value.source_revision_hash } : {}),
  };
}
// Small injection seam for deterministic tests. Runtime uses current host/fetch.
export function createApiClient(options: { fetch?: typeof fetch; isStaticHost?: () => boolean } = {}) {
  const staticHost = options.isStaticHost ?? (() => typeof window !== 'undefined' && window.location.hostname.endsWith('.github.io'));
  async function request<T>(path: string, signal: AbortSignal, guard: Guard<T>, recording?: Recording, body?: unknown): Promise<ApiResponse<T>> {
    signal.throwIfAborted();
    let response: Response;
    const recorded = (): ApiResponse<T> => {
      signal.throwIfAborted();
      if (!recording || !guard(recording.payload)) throw new ApiUnavailableError('BACKEND_REQUIRED');
      return { origin: 'STATIC_SNAPSHOT', data: recording.payload, snapshot: identity(recording) };
    };
    try {
      response = await (options.fetch ?? globalThis.fetch)(`/api/v1/${path}`, {
        signal, ...(body === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
      });
    } catch (error) {
      signal.throwIfAborted();
      if (staticHost() && error instanceof TypeError) return recorded();
      throw error;
    }
    signal.throwIfAborted();
    if (!response.ok) {
      // Missing static-host API routes can select recordings; server/auth/validation failures stay errors.
      if (staticHost() && [404, 405].includes(response.status)) return recorded();
      throw new ApiUnavailableError('HTTP_ERROR');
    }
    let value: unknown;
    try { value = await response.json(); } catch { signal.throwIfAborted(); throw new ApiUnavailableError('INVALID_RESPONSE'); }
    signal.throwIfAborted();
    if (!guard(value)) throw new ApiUnavailableError('INVALID_RESPONSE');
    return { origin: 'LIVE_API', data: value };
  }
  const saved = (payload: unknown, recommendation = false): Recording => ({ payload, file: recommendation ? 'offlineRecommendationData.json' : 'staticApiSnapshot.json' });
  return {
    health: (s: AbortSignal) => request('health', s, isHealth, saved(staticSnapshot.health)),
    scenarios: (s: AbortSignal) => request('scenarios', s, isEvidence, saved(staticSnapshot.scenarios)),
    comparison: (id: string, s: AbortSignal) => request(`scenarios/${idPath(id)}/comparison`, s, comparisonGuard(id), saved(ownValue(staticSnapshot.comparisons, id))),
    portfolios: (s: AbortSignal) => request('portfolios', s, isPortfolios, saved(staticSnapshot.portfolios)),
    portfolio: (id: string, s: AbortSignal) => request(`portfolios/${idPath(id)}`, s, portfolioGuard(id), saved(ownValue(staticSnapshot.portfolio_details, id))),
    evaluatePortfolio: (id: string, body: SelectionRequest, s: AbortSignal) => request(`portfolios/${idPath(id)}/evaluate`, s, portfolioGuard(id, body),
      Object.keys(body).length === 0 ? saved(ownValue(staticSnapshot.portfolio_details, id)) : undefined, body),
    economicScenario: (id: string, body: EconomicScenarioRequest, s: AbortSignal) => request<EconomicScenarioResponse>(`scenarios/${idPath(id)}/economics`, s,
      (v): v is EconomicScenarioResponse => isRecord(v) && v.scenario_id === id && v.annual_units === body.annual_units &&
        v.current_cost_eur_per_unit === body.current_cost_eur_per_unit && v.candidate_cost_eur_per_unit === body.candidate_cost_eur_per_unit &&
        v.one_time_transition_cost_eur === (body.one_time_transition_cost_eur ?? null) && typeof v.annual_cost_delta_eur === 'number', undefined, body),
    recommendationProducts: (s: AbortSignal) => request('recommendation/products', s, isProducts, saved(getOfflineProducts(), true)),
    recommendationCandidates: (s: AbortSignal) => request('recommendation/candidates', s, isCandidates, saved(getOfflineCandidates(), true)),
    evaluateRecommendation: (body: RecommendationEvaluationRequest, s: AbortSignal) => {
      idPath(body.product_id); idPath(body.workflow_id);
      if (body.configuration_id != null) idPath(body.configuration_id);
      return request('recommendation/evaluate', s, recommendationGuard(body), body.configuration_id ? undefined : saved(getOfflineEvaluation(body.product_id, body.workflow_id), true), body);
    },
  };
}
export const api = createApiClient();
