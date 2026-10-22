// Transport origin is independent of evidence/eligibility fields in API payloads.
export interface SnapshotIdentity {
  file: string;
  createdAt: null; // Recordings do not provide a capture timestamp.
  datasetId?: string;
  researchCutoff?: string;
  sourceRevision?: string;
}
export type ApiResponse<T> =
  | { origin: 'LIVE_API'; data: T }
  | { origin: 'STATIC_SNAPSHOT'; data: T; snapshot: SnapshotIdentity };
export type Load<T> =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | ({ state: 'ready' } & ApiResponse<T>);
export class ApiUnavailableError extends Error {
  constructor(public readonly reason: 'HTTP_ERROR' | 'BACKEND_REQUIRED' | 'INVALID_RESPONSE' | 'INVALID_CONTEXT') {
    super(reason); this.name = 'ApiUnavailableError';
  }
}
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
