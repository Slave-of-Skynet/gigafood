import type {
  CandidateRecommendationAssessment,
  ProductId,
  RecommendationSummary,
  WorkflowId,
} from '../api/contracts';

interface DecisionSummaryProps {
  productId: ProductId;
  workflowId: WorkflowId;
  recommendation: RecommendationSummary;
  firstPathAssessment?: CandidateRecommendationAssessment | null;
  effectiveAssumptions: string[];
}

export function DecisionSummary({
  productId,
  workflowId,
  recommendation,
  firstPathAssessment,
  effectiveAssumptions,
}: DecisionSummaryProps) {
  const isLiteralOven = workflowId === 'LITERAL_OVEN_250C_THEN_HOLD';
  const hasFirstPath = !!recommendation.first_qualification_candidate_id;

  const fallbackCandidate = isLiteralOven
    ? recommendation.alternatives.find((a) => a.candidate_id === 'C6')
    : null;

  const getProductTitle = (id: ProductId) => {
    switch (id) {
      case 'P1': return 'Целая курица-гриль';
      case 'P2': return 'Крылышки и бедра';
      case 'P3': return 'Гарниры и картофель';
      case 'P4': return 'Горячие мясные блюда';
      default: return id;
    }
  };

  return (
    <section className="decision-summary-card" id="recommendation-summary" aria-label="Recommendation Summary">
      <div className="decision-card-top">
        <div className="decision-title-group">
          <span className="decision-eyebrow">Итоговый вердикт для пилота Profi (5-минутная защита)</span>
          <h2 className="decision-main-heading">
            {hasFirstPath
              ? `Рекомендуемый вариант для внедрения: ${firstPathAssessment?.candidate_name || recommendation.first_qualification_candidate_id}`
              : isLiteralOven
              ? 'Запекание в печи 250°C: Резервный жаростойкий вариант'
              : 'Результаты отбора упаковки'}
          </h2>
        </div>

        <div className="decision-badges-cluster">
          {hasFirstPath && (
            <span className="decision-role-badge">
              Рекомендуемый выбор для испытаний
            </span>
          )}
          {isLiteralOven && fallbackCandidate && (
            <span className="decision-role-badge fallback-badge">
              Резервный высокотемпературный вариант
            </span>
          )}
          <span className="decision-outcome-badge status-caution">
            Готов к лабораторному тесту
          </span>
          <span className="survivors-count-badge">
            Требуется квалификация (без слепых закупок)
          </span>
        </div>
      </div>

      <div className="decision-grid">
        <div className="decision-narrative-col">
          <strong className="decision-section-label">Почему выбран этот вариант:</strong>
          <p className="decision-rationale-text">
            {firstPathAssessment?.rationale ||
              (isLiteralOven
                ? 'При жестком требовании запекания в печи при 250°C стандартные полимеры, биопластики и бумага с тонкими окнами (C2, C3, C4, C5) немедленно блокируются из-за термопредела ниже 250°C. C6-RO-H (алюминиевый корпус с жаростойкостью 280°C) обеспечивает единственный надежный высокотемпературный путь, требуя отдельной проверки термостойкости прозрачной крышки.'
                : 'Кандидаты проверены по 6 жестким критериям. Отобран лучший вариант с максимальными шансами на успешное прохождение испытаний в кулинарии Profi.')}
          </p>

          <div className="decision-callout-box">
            <span className="callout-icon" aria-hidden="true">
              🛡️
            </span>
            <div className="callout-body">
              <strong>Аудит данных без гринвошинга:</strong>
              <span>
                {' '}
                Ни один ответственный супермаркет не закупает упаковку без заводского протокола миграции под конкретный соус и жирность. Платформа исключает фальшивые обещания и выводит лучший европейский вариант, готовый к тестированию на реальной кухне.
              </span>
            </div>
          </div>
        </div>

        <div className="decision-quick-facts-col">
          <div className="decision-stat-row">
            <span className="stat-label">Целевое блюдо:</span>
            <strong className="stat-value">{getProductTitle(productId)}</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Режим приготовления:</span>
            <strong className="stat-value">
              {workflowId === 'POST_COOK_HOT_HOLD_6H' ? 'Тепловая витрина 65–85°C (6 часов)' : 'Печь 250°C + витрина'}
            </strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Прошли отбор:</span>
            <strong className="stat-value">{recommendation.alternatives.length} альтернатив(ы)</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Отклонено барьерами:</span>
            <strong className="stat-value blocked-value">
              {recommendation.blocked.length} кандидат(ов)
            </strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Первый шаг запуска:</span>
            <span className="stat-action-text">
              {firstPathAssessment?.next_qualification_actions?.[0] ||
                'Лабораторный тест на горячий жир и миграцию в аккредитованной лаборатории'}
            </span>
          </div>
          {effectiveAssumptions.length > 0 && (
            <div className="decision-stat-row">
              <span className="stat-label">Рабочие допущения:</span>
              <span className="stat-action-text">{effectiveAssumptions.join(' · ')}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
