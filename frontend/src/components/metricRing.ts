import type { CSSProperties } from 'react';

/** Only a numeric percentage may paint a progress arc. The text keeps the
 * backend's signed value; an absent or negative value has no progress arc. */
export function reductionRingStyle(
  percentage: number | null,
  blocked: boolean
): CSSProperties | undefined {
  if (percentage === null || !Number.isFinite(percentage) || percentage < 0) {
    return undefined;
  }

  return {
    '--ring-progress': `${Math.min(100, percentage)}%`,
    '--ring-color': blocked ? '#c04b43' : '#238b60',
  } as CSSProperties;
}
