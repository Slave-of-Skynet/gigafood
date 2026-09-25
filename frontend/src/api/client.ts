import type { Comparison, Evidence, Health } from './contracts';

async function get<T>(path: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(`/api/v1/${path}`, { signal });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(`HTTP ${response.status}: ${body?.detail ?? body?.error ?? 'Service unavailable'}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  health: (signal: AbortSignal) => get<Health>('health', signal),
  scenarios: (signal: AbortSignal) => get<Evidence>('scenarios', signal),
  comparison: (id: string, signal: AbortSignal) => get<Comparison>(`scenarios/${encodeURIComponent(id)}/comparison`, signal),
};
