import type { GateName, HardGate } from '../api/contracts';

interface GateMatrixProps {
  gates: Record<GateName, HardGate>;
  compact?: boolean;
}

const GATE_METADATA: Record<GateName, { title: string; subtitle: string; icon: string }> = {
  physical_fit: {
    title: 'Размер и объем',
    subtitle: 'Вместимость под порцию блюда',
    icon: '📐',
  },
  food_contact: {
    title: 'Пищевой контакт (EU)',
    subtitle: 'Нормы миграции веществ в пищу',
    icon: '🍽️',
  },
  thermal_workflow: {
    title: 'Температурный режим',
    subtitle: 'Стойкость на витрине 85°C или в печи 250°C',
    icon: '🌡️',
  },
  grease_leak: {
    title: 'Стойкость к жиру',
    subtitle: 'Барьер против горячего масла и соуса',
    icon: '🛡️',
  },
  transparent_viewing: {
    title: 'Прозрачное окно',
    subtitle: 'Визуальный обзор продукта для покупателя',
    icon: '👁️',
  },
  procurement: {
    title: 'Закупка в Румынии',
    subtitle: 'Официальный склад и дистрибьютор в RO',
    icon: '🇷🇴',
  },
};

export function GateMatrix({ gates, compact = false }: GateMatrixProps) {
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
          text: '✅ Пройдено',
          className: 'gate-badge-pass',
        };
      case 'QUALIFICATION_REQUIRED':
        return {
          text: '🧪 Требует теста',
          className: 'gate-badge-caution',
        };
      case 'UNKNOWN':
        return {
          text: '❓ Нет замера',
          className: 'gate-badge-unknown',
        };
      case 'FAIL':
        return {
          text: '⛔ Блокировка',
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
        {gateKeys.map((key) => {
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
                  {meta.icon}
                </span>
                <div className="gate-title-group">
                  <strong className="gate-title">{meta.title}</strong>
                  <span className="gate-sub">{meta.subtitle}</span>
                </div>
              </div>

              <div className="gate-status-row">
                <span className={`gate-status-pill ${badge.className}`}>
                  {badge.text}
                </span>
              </div>

              <p className="gate-reason-text">
                {gate?.reason || 'Evaluation criteria pending verification.'}
              </p>

              {gate?.source_ids && gate.source_ids.length > 0 && (
                <div className="gate-sources-ref">
                  <small>Citations: {gate.source_ids.join(', ')}</small>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
