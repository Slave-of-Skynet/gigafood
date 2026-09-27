import { useTranslation } from '../i18n';
import type { EpistemicState } from '../api/contracts';

interface EvidenceStateBadgeProps {
  state: EpistemicState;
  qualifier?: string | null;
  className?: string;
}

export function EvidenceStateBadge({
  state,
  qualifier,
  className = '',
}: EvidenceStateBadgeProps) {
  const t = useTranslation();
  const getBadgeConfig = () => {
    switch (state) {
      case 'OBSERVED_VERIFIED':
        return {
          label: 'VERIFIED',
          subtext: 'Observed source',
          styleClass: 'epistemic-verified',
        };
      case 'DERIVED_EXACT':
        return {
          label: 'DERIVED',
          subtext: 'Exact calculation',
          styleClass: 'epistemic-derived',
        };
      case 'ESTIMATED':
        return {
          label: 'ESTIMATED',
          subtext: 'Model envelope',
          styleClass: 'epistemic-estimated',
        };
      case 'ASSUMED':
        return {
          label: 'ASSUMED',
          subtext: 'Working premise',
          styleClass: 'epistemic-assumed',
        };
      case 'UNKNOWN':
        return {
          label: 'Needs validation',
          subtext: 'Evidence required',
          styleClass: 'epistemic-unknown',
        };
      case 'CONFLICT':
        return {
          label: 'CONFLICT',
          subtext: 'Competing claims',
          styleClass: 'epistemic-conflict',
        };
      default:
        return {
          label: state,
          subtext: '',
          styleClass: 'epistemic-default',
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span
      className={`epistemic-badge ${config.styleClass} ${className}`}
      title={t(qualifier ? `Qualifier: ${qualifier}` : config.subtext)}
    >
      <span className="epistemic-indicator" />
      <span className="epistemic-label">{t(config.label)}</span>
      {t(qualifier && <span className="epistemic-qualifier">{t("· ")}{t(qualifier)}</span>)}
    </span>
  );
}
