import staticSnapshot from './staticApiSnapshot.json';
import {
  getOfflineCandidates,
  getOfflineEvaluation,
  getOfflineProducts,
} from './offlineFallback';
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
  ProductId,
  WorkflowId,
} from './contracts';

function resolveStaticFallback(path: string, body?: unknown): unknown {
  if (path === 'health') return staticSnapshot.health;
  if (path === 'scenarios') return staticSnapshot.scenarios;
  const compMatch = path.match(/^scenarios\/([^/]+)\/comparison$/);
  if (compMatch) {
    const id = decodeURIComponent(compMatch[1]);
    return (staticSnapshot.comparisons as Record<string, unknown>)[id];
  }
  if (path === 'portfolios') return staticSnapshot.portfolios;
  const portMatch = path.match(/^portfolios\/([^/]+)(\/evaluate)?$/);
  if (portMatch) {
    const id = decodeURIComponent(portMatch[1]);
    return (staticSnapshot.portfolio_details as Record<string, unknown>)[id];
  }
  if (path === 'recommendation/products') return getOfflineProducts();
  if (path === 'recommendation/candidates') return getOfflineCandidates();
  if (path === 'recommendation/evaluate' && body && typeof body === 'object') {
    const req = body as { product_id?: ProductId; workflow_id?: WorkflowId };
    if (req.product_id && req.workflow_id) {
      return getOfflineEvaluation(req.product_id, req.workflow_id);
    }
  }
  return undefined;
}

async function request<T>(path: string, signal: AbortSignal, body?: unknown): Promise<T> {
  const isStaticHost = typeof window !== 'undefined' && window.location.hostname.endsWith('github.io');
  try {
    const response = await fetch(`/api/v1/${path}`, {
      signal,
      ...(body === undefined ? {} : {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      }),
    });
    if (!response.ok) {
      if (isStaticHost) {
        const fallback = resolveStaticFallback(path, body);
        if (fallback !== undefined) return fallback as T;
      }
      const errorBody = await response.json().catch(() => null);
      throw new Error(`HTTP ${response.status}: ${errorBody?.detail ?? errorBody?.error ?? 'Service unavailable'}`);
    }
    return response.json() as Promise<T>;
  } catch (err) {
    if (isStaticHost) {
      const fallback = resolveStaticFallback(path, body);
      if (fallback !== undefined) return fallback as T;
    }
    throw err;
  }
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
