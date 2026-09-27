import { useTranslation } from '../i18n';
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
  const t = useTranslation();
  const [expanded, setExpanded] = useState(false);

  // UNKNOWN or missing field handling: NEVER display 0 or 0 units.
  if (!field || field.state === 'UNKNOWN' || field.value === null || field.value === undefined) {
    const isPrice = label.toLowerCase().includes('price') || (unitOverride && unitOverride.includes('RON'));
    const unknownText = isPrice ? 'Quote required' : 'Evidence required';

    return (
      <div className="metric-field-box metric-field-unknown">
        <div className="metric-field-header">
          <span className="metric-field-label">{t(label)}</span>
          <EvidenceStateBadge state={field?.state ?? 'UNKNOWN'} qualifier={field?.qualifier} />
        </div>
        <div className="metric-field-val unknown-text">{t(unknownText)}</div>
        {t(field?.qualifier && (
          <small className="metric-field-qualifier">{t(field.qualifier)}</small>
        ))}
      </div>
    );
  }

  const unit = unitOverride ?? field.unit ?? '';
  const isFractionToPercent = field.unit === 'fraction' && unitOverride === '%';

  const formatVal = (val: number): number => {
    if (!isFractionToPercent) return val;
    return Number((val * 100).toFixed(2));
  };

  let mainDisplay = '';
  let intervalSubtitle: string | null = null;

  if (isInterval(field.value)) {
    const central = formatVal(field.value.central);
    const low = formatVal(field.value.low);
    const high = formatVal(field.value.high);
    mainDisplay = `≈${central}${unit ? ` ${unit}` : ''}`;
    intervalSubtitle = `Range: ${low}–${high}${unit ? ` ${unit}` : ''} · ${field.confidence} confidence`;
  } else if (typeof field.value === 'number') {
    const displayVal = formatVal(field.value);
    if (field.state === 'ESTIMATED') {
      mainDisplay = `≈${displayVal}${unit ? ` ${unit}` : ''}`;
      if (field.estimate) {
        const estLow = formatVal(field.estimate.low);
        const estHigh = formatVal(field.estimate.high);
        intervalSubtitle = `Range: ${estLow}–${estHigh}${unit ? ` ${unit}` : ''} · ${field.confidence} confidence`;
      }
    } else {
      mainDisplay = `${displayVal}${unit ? ` ${unit}` : ''}`;
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
        <span className="metric-field-label">{t(label)}</span>
        <EvidenceStateBadge state={field.state} />
      </div>

      <div className="metric-field-val">
        <strong>{t(mainDisplay)}</strong>
      </div>

      {t(intervalSubtitle && (
        <div className="metric-field-interval">{t(intervalSubtitle)}</div>
      ))}

      {t(field.qualifier && (
        <div className="metric-field-qualifier">{t(field.qualifier)}</div>
      ))}

      {t(showSources && field.source_ids.length > 0 && (
        <div className="metric-field-provenance">
          <button
            type="button"
            className="provenance-toggle-btn"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {t(expanded ? 'Hide sources' : `Sources (${field.source_ids.length})`)}
          </button>
          {t(expanded && (
            <div className="provenance-details-drawer">
              <small>
                <strong>{t("Scope:")}</strong> {t(field.scope)}
              </small>
              <small>
                <strong>{t("Citations:")}</strong> {t(field.source_ids.join(', '))}
              </small>
              {t(field.calculation_id && (
                <small>
                  <strong>{t("Calculation ID:")}</strong> {t(field.calculation_id)}
                </small>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
