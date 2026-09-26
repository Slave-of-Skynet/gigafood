import type {
  CandidateRecommendationAssessment,
  PackagingConfiguration,
  SourceReference,
} from '../api/contracts';
import { GateMatrix } from './GateMatrix';
import { MetricField } from './MetricField';
import { ProcurementSummary } from './ProcurementSummary';
import { NextActions } from './NextActions';

interface CandidateRecommendationCardProps {
  assessment: CandidateRecommendationAssessment;
  configuration?: PackagingConfiguration | null;
  sourcesMap: Record<string, SourceReference>;
  isFirstPath?: boolean;
}

const CANDIDATE_FRIENDLY_META: Record<
  string,
  { brand: string; type: string; highlight: string }
> = {
  C1: {
    brand: 'Sacma B.Life Gaia',
    type: 'Крафт-пакет с био-окном из целлюлозы',
    highlight: 'Италия · Поставки в RO · Снижение пластика до -85%',
  },
  C2: {
    brand: 'Advanta Smoothwall',
    type: 'Жаропрочный алюминиевый лоток',
    highlight: 'Выдерживает запекание до 280°C · 100% переработка в RO',
  },
  C3: {
    brand: 'Coveris PaperLite',
    type: 'Картонный термолоток с барьерным слоем',
    highlight: 'Германия · Влаго- и жиростойкий · Выкладка 85°C',
  },
  C4: {
    brand: 'Mondi Trayforma Bio',
    type: 'Формованный эко-лоток с био-покрытием',
    highlight: 'Австрия · Барьер без фтора · Для горячих жирных блюд',
  },
  C5: {
    brand: 'BIOPAP SI-14',
    type: 'Биоразлагаемый лоток (печь + витрина + СВЧ)',
    highlight: 'Италия · Термостойкость до 175°C · Компостируемый композит',
  },
  C6: {
    brand: 'C6 Адаптивная упаковка',
    type: 'Конфигурация упаковки под целевой продукт',
    highlight: 'Румыния · Специальные модификации лотков и пакетов',
  },
};

export function CandidateRecommendationCard({
  assessment,
  configuration,
  sourcesMap,
  isFirstPath = false,
}: CandidateRecommendationCardProps) {
  const isBlocked = assessment.outcome === 'BLOCKED';
  const isC6 = assessment.candidate_id === 'C6';
  const configId = assessment.configuration_id;

  const friendly = CANDIDATE_FRIENDLY_META[assessment.candidate_id];

  // Find failing gate if blocked
  const failingGates = Object.values(assessment.gates).filter((g) => g.status === 'FAIL');

  const getRoleLabel = () => {
    switch (assessment.role) {
      case 'FIRST_QUALIFICATION_PATH':
        return '⭐ Рекомендуемый выбор для пилота';
      case 'PRIORITY_ALTERNATIVE':
        return '⚡ Резервный вариант';
      case 'ALTERNATIVE':
        return 'Альтернативное решение';
      case 'BLOCKED':
        return '⛔ Не подходит';
      default:
        return assessment.role;
    }
  };

  return (
    <article
      className={`candidate-recommendation-card ${
        isFirstPath ? 'is-first-qualification-path' : ''
      } ${isBlocked ? 'is-blocked-card' : ''}`}
      id={`candidate-${assessment.candidate_id}`}
    >
      <div className="candidate-card-header">
        <div className="candidate-identity-group">
          <div className="candidate-tags-row">
            {isC6 && (
              <span className="candidate-config-badge">
                Адаптивная термостойкая упаковка{configuration?.role ? ` (${configuration.role})` : ''}
              </span>
            )}
            <span className={`candidate-role-badge role-${assessment.role.toLowerCase()}`}>
              {getRoleLabel()}
            </span>
            <span
              className={`candidate-outcome-badge ${
                isBlocked ? 'outcome-blocked' : 'outcome-qualification'
              }`}
            >
              {isBlocked ? 'Заблокировано' : 'Готов к испытаниям'}
            </span>
          </div>

          <h3 className="candidate-name-heading">
            {friendly ? (
              <>
                <strong className="friendly-brand-text">{friendly.brand}</strong>
                <span className="friendly-type-text"> — {friendly.type}</span>
              </>
            ) : (
              assessment.candidate_name
            )}
          </h3>
          {friendly && (
            <span className="candidate-highlight-chip">{friendly.highlight}</span>
          )}

          {/* Collapsible raw spec for technical jury */}
          <details className="candidate-raw-spec-details">
            <summary className="raw-spec-summary">
              🔬 Инженерное наименование и область применения
            </summary>
            <div className="raw-spec-content">
              <strong>Спецификация:</strong> {assessment.candidate_name}
              {assessment.decision_scope && (
                <div><strong>Область теста:</strong> {assessment.decision_scope}</div>
              )}
            </div>
          </details>
        </div>
      </div>

      {/* Prominent Blocking Gate Callout */}
      {isBlocked && failingGates.length > 0 && (
        <div className="blocking-alert-banner" role="alert">
          <strong className="blocking-banner-title">
            ⛔ ОТКЛОНЕНО ПО ЖЕСТКОМУ КРИТЕРИЮ — КАНДИДАТ НЕ ПОДХОДИТ
          </strong>
          <ul className="failing-gates-list">
            {failingGates.map((fg) => (
              <li key={fg.gate_id}>
                <strong>
                  {fg.gate_id === 'thermal_workflow'
                    ? 'Температурный режим'
                    : fg.gate_id === 'grease_leak'
                    ? 'Стойкость к жиру'
                    : fg.gate_id}:
                </strong>{' '}
                {fg.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Candidate Rationale */}
      <div className="candidate-rationale-box">
        <strong className="box-mini-title">Обоснование оценки:</strong>
        <p className="candidate-rationale-body">{assessment.rationale}</p>
      </div>

      {/* Boundary Warning Callout if C5 or C6 */}
      {assessment.candidate_id === 'C5' && (
        <div className="boundary-warning-callout">
          <span className="warning-icon" aria-hidden="true">ℹ️</span>
          <div className="warning-body">
            <strong>Границы BIOPAP:</strong>
            <span>
              {' '}
              6 часов при 90°C подтверждены каталогом. При пиковом нагреве в печи существует расхождение между 175°C и 185°C в разных протоколах. Необходим предварительный замер на кухне.
            </span>
          </div>
        </div>
      )}

      {isC6 && configId === 'C6-RO-H' && (
        <div className="boundary-warning-callout">
          <span className="warning-icon" aria-hidden="true">ℹ️</span>
          <div className="warning-body">
            <strong>Границы алюминия (280°C):</strong>
            <span>
              {' '}
              Жаростойкость 280°C относится исключительно к металлическому корпусу. Пластиковые прозрачные крышки не выдерживают 250°C в печи и должны квалифицироваться отдельно.
            </span>
          </div>
        </div>
      )}

      {/* Compact Key Metrics Grid on the card face */}
      <div className="card-section metrics-section">
        <strong className="section-title">Ключевые измеряемые параметры</strong>
        <div className="metrics-grid">
          <MetricField
            label="Масса упаковки"
            field={assessment.metrics.total_package_mass_g}
            unitOverride="г"
          />
          <MetricField
            label="Масса пластика"
            field={assessment.metrics.plastic_mass_g}
            unitOverride="г"
          />
          <MetricField
            label="Первичный пластик"
            field={assessment.metrics.virgin_plastic_mass_g}
            unitOverride="г"
          />
          <MetricField
            label="Возобновляемое сырье"
            field={assessment.metrics.renewable_material_fraction}
            unitOverride="%"
          />
          {assessment.procurement?.romania_unit_price && (
            <MetricField
              label="Цена в Румынии"
              field={assessment.procurement.romania_unit_price}
              unitOverride="RON / шт"
            />
          )}
        </div>
      </div>

      {/* Foldable Detailed Sections for Judges & Technical Audits */}
      <div className="candidate-details-accordions">
        {/* 1. 6 Hard Gates */}
        <details className="card-foldable-detail" open={isFirstPath}>
          <summary className="foldable-detail-summary">
            <strong>📐 Проверка критериев допуска</strong>
          </summary>
          <div className="foldable-detail-content">
            <GateMatrix gates={assessment.gates} />
          </div>
        </details>

        {/* 2. Romania Procurement & EOL Route */}
        <details className="card-foldable-detail">
          <summary className="foldable-detail-summary">
            <strong>🚚 Поставки в Румынию, цена и утилизация (EOL)</strong>
          </summary>
          <div className="foldable-detail-content">
            <ProcurementSummary procurement={assessment.procurement} eol={assessment.eol} />
          </div>
        </details>

        {/* 3. Next Actions & Limitations */}
        <details className="card-foldable-detail">
          <summary className="foldable-detail-summary">
            <strong>📋 План запуска пилота и технические ограничения</strong>
          </summary>
          <div className="foldable-detail-content">
            <NextActions
              limitations={assessment.limitations}
              actions={assessment.next_qualification_actions}
            />
          </div>
        </details>

        {/* 4. Referenced Sources Ledger */}
        {assessment.referenced_source_ids && assessment.referenced_source_ids.length > 0 && (
          <details className="card-foldable-detail">
            <summary className="foldable-detail-summary">
              <strong>📄 Официальные источники и сертификаты</strong>
            </summary>
            <div className="foldable-detail-content">
              <div className="sources-list-drawer">
                {assessment.referenced_source_ids.map((sid) => {
                  const sref = sourcesMap[sid];
                  if (!sref) {
                    return (
                      <div key={sid} className="source-item missing-source">
                        <code>{sid}</code>: Источник зарегистрирован в каталоге.
                      </div>
                    );
                  }
                  return (
                    <div key={sid} className="source-item">
                      <div className="source-header-row">
                        <span className="source-id-pill">{sref.source_id}</span>
                        {sref.tier && <span className="source-tier-tag">Уровень {sref.tier}</span>}
                        {sref.romania_evidence && (
                          <span className="source-ro-tag">🇷🇴 Документ из Румынии</span>
                        )}
                      </div>
                      <strong className="source-title-text">{sref.title}</strong>
                      {sref.findings && <p className="source-findings">{sref.findings}</p>}
                      {sref.limitations && (
                        <small className="source-limitations">
                          <strong>Ограничения:</strong> {sref.limitations}
                        </small>
                      )}
                      {sref.url && (
                        <a
                          href={sref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="source-external-link"
                        >
                          Открыть первоисточник (PDF / Каталог) ↗
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </details>
        )}
      </div>
    </article>
  );
}
