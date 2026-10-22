import offlineData from './offlineRecommendationData.json';
import { isRecord } from './provenance';

// Client guards validate these unknown recordings before attaching origin.
export const getOfflineProducts = (): unknown => offlineData.products;
export const getOfflineCandidates = (): unknown => offlineData.candidates;
export function getOfflineEvaluation(productId: string, workflowId: string): unknown {
  const evaluations: unknown = offlineData.evaluations;
  if (!isRecord(evaluations) || !Object.hasOwn(evaluations, productId)) return undefined;
  const workflows = evaluations[productId];
  return isRecord(workflows) && Object.hasOwn(workflows, workflowId) ? workflows[workflowId] : undefined;
}
