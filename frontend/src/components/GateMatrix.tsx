import { useTranslation } from '../i18n';
import type { GateName, HardGate } from '../api/contracts';

interface GateMatrixProps {
  gates: Record<GateName, HardGate>;
  compact?: boolean;
}

const GATE_METADATA: Record<GateName, { title: string; subtitle: string; icon: string }> = {
  physical_fit: {
    title: 'Physical Fit',
    subtitle: 'Dimensional capacity & geometry',
    icon: '📐',
  },
  food_contact: {
    title: 'Food Contact',
    subtitle: 'EU migration & fatty-food dossier',
    icon: '🍽️',
  },
  thermal_workflow: {
    title: 'Thermal Workflow',
    subtitle: 'Peak exposure + holding',
    icon: '🌡️',
  },
  grease_leak: {
    title: 'Grease / Leak',
    subtitle: 'Hot oil retention & barrier integrity',
    icon: '🛡️',
  },
  transparent_viewing: {
    title: 'Transparent Viewing',
    subtitle: 'Consumer inspection window / lid',
    icon: '👁️',
  },
  procurement: {
    title: 'Romania Procurement',
    subtitle: 'Local supply route & MOQ terms',
    icon: '🇷🇴',
  },
};

export function GateMatrix({ gates, compact = false }: GateMatrixProps) {
  const t = useTranslation();
  const gateKeys: GateName[] = [
    'physical_fit',
    'food_contact',
    'thermal_workflow',
    'grease_leak',
    'transparent_viewing',
    'procurement',
  ];

  const getStatusBadge = (status: HardGate['status']) => {
    switch (status) {
      case 'PASS':
        return {
          text: 'PASS',
          className: 'gate-badge-pass',
        };
      case 'QUALIFICATION_REQUIRED':
        return {
          text: 'QUALIFICATION REQUIRED',
          className: 'gate-badge-caution',
        };
      case 'UNKNOWN':
        return {
          text: 'Needs verification',
          className: 'gate-badge-unknown',
        };
      case 'FAIL':
        return {
          text: 'FAIL (Hard blocking gate)',
          className: 'gate-badge-fail',
        };
      default:
        return {
          text: status,
          className: 'gate-badge-default',
        };
    }
  };

  return (
    <div className={`gate-matrix-container ${compact ? 'compact' : ''}`}>
      <div className="gate-matrix-grid">
        {t(gateKeys.map((key) => {
          const gate = gates[key];
          const meta = GATE_METADATA[key];
          const badge = getStatusBadge(gate?.status ?? 'UNKNOWN');

          return (
            <div
              key={key}
              className={`gate-cell-card ${gate?.status === 'FAIL' ? 'is-failing-gate' : ''} ${
                gate?.status === 'QUALIFICATION_REQUIRED' ? 'is-caution-gate' : ''
              }`}
            >
              <div className="gate-cell-top">
                <span className="gate-icon" aria-hidden="true">
                  {t(meta.icon)}
                </span>
                <div className="gate-title-group">
                  <strong className="gate-title">{t(meta.title)}</strong>
                  <span className="gate-sub">{t(meta.subtitle)}</span>
                </div>
              </div>

              <div className="gate-status-row">
                <span className={`gate-status-pill ${badge.className}`}>
                  {t(badge.text)}
                </span>
              </div>

              <p className="gate-reason-text">
                {t(gate?.reason || 'Evaluation criteria pending verification.')}
              </p>

              {t(gate?.source_ids && gate.source_ids.length > 0 && (
                <div className="gate-sources-ref">
                  <small>{t("Citations: ")}{gate.source_ids.join(', ')}</small>
                </div>
              ))}
            </div>
          );
        }))}
      </div>
      <div className="gate-non-compensatory-note">
        <strong>{t("Non-compensatory gate policy:")}</strong>{t(" Any single ")}<code>{t("FAIL")}</code>{t(" blocks candidate advancement. Virgin plastic reduction cannot compensate for thermal failure or unverified food-contact compliance.")}</div>
    </div>
  );
}
