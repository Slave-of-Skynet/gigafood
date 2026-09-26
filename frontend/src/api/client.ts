import type {
  Comparison,
  EconomicScenarioRequest,
  EconomicScenarioResponse,
  Evidence,
  Health,
  PortfolioSummary,
  SelectionRequest,
  SelectionResponse,
  RecommendationProductsResponse,
  RecommendationCandidatesResponse,
  RecommendationEvaluationRequest,
  RecommendationEvaluationResponse,
} from './contracts';

async function request<T>(path: string, signal: AbortSignal, body?: unknown): Promise<T> {
  const response = await fetch(`/api/v1/${path}`, {
    signal,
    ...(body === undefined ? {} : {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    }),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(`HTTP ${response.status}: ${errorBody?.detail ?? errorBody?.error ?? 'Service unavailable'}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  health: (signal: AbortSignal) => request<Health>('health', signal),
  scenarios: (signal: AbortSignal) => request<Evidence>('scenarios', signal),
  comparison: (id: string, signal: AbortSignal) => request<Comparison>(`scenarios/${encodeURIComponent(id)}/comparison`, signal),
  economicScenario: (id: string, body: EconomicScenarioRequest, signal: AbortSignal) =>
    request<EconomicScenarioResponse>(`scenarios/${encodeURIComponent(id)}/economics`, signal, body),
  portfolios: (signal: AbortSignal) => request<PortfolioSummary[]>('portfolios', signal),
  portfolio: (id: string, signal: AbortSignal) => request<SelectionResponse>(`portfolios/${encodeURIComponent(id)}`, signal),
  evaluatePortfolio: (id: string, body: SelectionRequest, signal: AbortSignal) =>
    request<SelectionResponse>(`portfolios/${encodeURIComponent(id)}/evaluate`, signal, body),
  recommendationProducts: (signal: AbortSignal) =>
    request<RecommendationProductsResponse>('recommendation/products', signal),
  recommendationCandidates: (signal: AbortSignal) =>
    request<RecommendationCandidatesResponse>('recommendation/candidates', signal),
  evaluateRecommendation: (body: RecommendationEvaluationRequest, signal: AbortSignal) =>
    request<RecommendationEvaluationResponse>('recommendation/evaluate', signal, body),
  getRecommendationProducts: (signal: AbortSignal) =>
    request<RecommendationProductsResponse>('recommendation/products', signal),
  getRecommendationCandidates: (signal: AbortSignal) =>
    request<RecommendationCandidatesResponse>('recommendation/candidates', signal),
};
