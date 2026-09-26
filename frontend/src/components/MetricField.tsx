import { useState } from 'react';
import type { EvidenceField, IntervalValue } from '../api/contracts';
import { EvidenceStateBadge } from './EvidenceStateBadge';

interface MetricFieldProps {
  label: string;
  field?: EvidenceField | null;
  unitOverride?: string;
  showSources?: boolean;
}

function isInterval(val: unknown): val is IntervalValue {
  return typeof val === 'object' && val !== null && 'central' in val && 'low' in val && 'high' in val;
}

export function MetricField({
  label,
  field,
  unitOverride,
  showSources = true,
}: MetricFieldProps) {
  const [expanded, setExpanded] = useState(false);

  // UNKNOWN or missing field handling: NEVER display 0 or 0 units.
  if (!field || field.state === 'UNKNOWN' || field.value === null || field.value === undefined) {
    const isPrice = label.toLowerCase().includes('price') || (unitOverride && unitOverride.includes('RON'));
    const unknownText = isPrice ? 'Quote required' : 'Evidence required';

    return (
      <div className="metric-field-box metric-field-unknown">
        <div className="metric-field-header">
          <span className="metric-field-label">{label}</span>
          <EvidenceStateBadge state={field?.state ?? 'UNKNOWN'} qualifier={field?.qualifier} />
        </div>
        <div className="metric-field-val unknown-text">{unknownText}</div>
        {field?.qualifier && (
          <small className="metric-field-qualifier">{field.qualifier}</small>
        )}
      </div>
    );
  }

  const unit = unitOverride ?? field.unit ?? '';

  let mainDisplay = '';
  let intervalSubtitle: string | null = null;

  if (isInterval(field.value)) {
    mainDisplay = `≈${field.value.central}${unit ? ` ${unit}` : ''}`;
    intervalSubtitle = `Range: ${field.value.low}–${field.value.high}${unit ? ` ${unit}` : ''} · ${field.confidence} confidence`;
  } else if (typeof field.value === 'number') {
    if (field.state === 'ESTIMATED') {
      mainDisplay = `≈${field.value}${unit ? ` ${unit}` : ''}`;
      if (field.estimate) {
        intervalSubtitle = `Range: ${field.estimate.low}–${field.estimate.high}${unit ? ` ${unit}` : ''} · ${field.confidence} confidence`;
      }
    } else {
      mainDisplay = `${field.value}${unit ? ` ${unit}` : ''}`;
    }
  } else if (typeof field.value === 'string') {
    mainDisplay = field.value;
  } else if (typeof field.value === 'boolean') {
    mainDisplay = field.value ? 'Yes' : 'No';
  } else {
    mainDisplay = String(field.value);
  }

  return (
    <div className={`metric-field-box state-${field.state.toLowerCase()}`}>
      <div className="metric-field-header">
        <span className="metric-field-label">{label}</span>
        <EvidenceStateBadge state={field.state} />
      </div>

      <div className="metric-field-val">
        <strong>{mainDisplay}</strong>
      </div>

      {intervalSubtitle && (
        <div className="metric-field-interval">{intervalSubtitle}</div>
      )}

      {field.qualifier && (
        <div className="metric-field-qualifier">{field.qualifier}</div>
      )}

      {showSources && field.source_ids.length > 0 && (
        <div className="metric-field-provenance">
          <button
            type="button"
            className="provenance-toggle-btn"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? 'Hide sources' : `Sources (${field.source_ids.length})`}
          </button>
          {expanded && (
            <div className="provenance-details-drawer">
              <small>
                <strong>Scope:</strong> {field.scope}
              </small>
              <small>
                <strong>Citations:</strong> {field.source_ids.join(', ')}
              </small>
              {field.calculation_id && (
                <small>
                  <strong>Calculation ID:</strong> {field.calculation_id}
                </small>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
