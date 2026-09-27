import offlineData from './offlineRecommendationData.json';
import type {
  RecommendationProductsResponse,
  RecommendationCandidatesResponse,
  RecommendationEvaluationResponse,
  ProductId,
  WorkflowId,
} from './contracts';

export function getOfflineProducts(): RecommendationProductsResponse {
  return offlineData.products as unknown as RecommendationProductsResponse;
}

export function getOfflineCandidates(): RecommendationCandidatesResponse {
  return offlineData.candidates as unknown as RecommendationCandidatesResponse;
}

export function getOfflineEvaluation(
  productId: ProductId,
  workflowId: WorkflowId
): RecommendationEvaluationResponse | null {
  const evals = (offlineData.evaluations as Record<string, Record<string, unknown>>);
  const result = evals?.[productId]?.[workflowId];
  return (result as unknown as RecommendationEvaluationResponse) || null;
}
