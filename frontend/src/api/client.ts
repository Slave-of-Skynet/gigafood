import type { Comparison, Evidence, Health, PortfolioSummary, SelectionRequest, SelectionResponse } from './contracts';

async function request<T>(path: string, signal: AbortSignal, body?: SelectionRequest): Promise<T> {
  const response = await fetch(`/api/v1/${path}`, {
    signal,
    ...(body === undefined ? {} : {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(`HTTP ${response.status}: ${body?.detail ?? body?.error ?? 'Service unavailable'}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  health: (signal: AbortSignal) => request<Health>('health', signal),
  scenarios: (signal: AbortSignal) => request<Evidence>('scenarios', signal),
  comparison: (id: string, signal: AbortSignal) => request<Comparison>(`scenarios/${encodeURIComponent(id)}/comparison`, signal),
  portfolios: (signal: AbortSignal) => request<PortfolioSummary[]>('portfolios', signal),
  portfolio: (id: string, signal: AbortSignal) => request<SelectionResponse>(`portfolios/${encodeURIComponent(id)}`, signal),
  evaluatePortfolio: (id: string, body: SelectionRequest, signal: AbortSignal) =>
    request<SelectionResponse>(`portfolios/${encodeURIComponent(id)}/evaluate`, signal, body),
};
