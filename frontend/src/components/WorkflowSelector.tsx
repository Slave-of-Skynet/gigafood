import type { WorkflowDefinition, WorkflowId } from '../api/contracts';

interface WorkflowSelectorProps {
  workflows: WorkflowDefinition[];
  selectedWorkflowId: WorkflowId;
  onSelectWorkflow: (id: WorkflowId) => void;
  disabled?: boolean;
}

export function WorkflowSelector({
  workflows,
  selectedWorkflowId,
  onSelectWorkflow,
  disabled = false,
}: WorkflowSelectorProps) {
  return (
    <section className="workflow-selector-deck" id="recommendation-workflow" aria-label="Select Operational Workflow">
      <div className="selector-title-row">
        <div>
          <span className="control-step-tag">Шаг 2 · Температурный режим</span>
          <h2 className="control-section-heading">Как блюдо готовится и выкладывается в магазине?</h2>
        </div>
        <span className="current-workflow-badge">
          Режим: <strong>{selectedWorkflowId === 'POST_COOK_HOT_HOLD_6H' ? 'Тепловая витрина 65–85°C' : 'Печь 250°C + витрина'}</strong>
        </span>
      </div>

      <div className="workflow-options-grid">
        {workflows.map((wf) => {
          const isSelected = wf.workflow_id === selectedWorkflowId;
          const isPostCook = wf.workflow_id === 'POST_COOK_HOT_HOLD_6H';

          return (
            <button
              key={wf.workflow_id}
              type="button"
              className={`workflow-select-card ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectWorkflow(wf.workflow_id)}
              disabled={disabled}
              aria-pressed={isSelected}
            >
              <div className="workflow-card-header">
                <span className="workflow-temp-chip">
                  {isPostCook ? '🔥 65–85°C · Тепловая витрина 6ч' : '⚡ 250°C · Запекание в печи'}
                </span>
                <span className="workflow-status-tag">
                  {isPostCook ? 'Основной режим Profi' : 'Экстремальный тест'}
                </span>
              </div>

              <div className="workflow-card-body">
                <strong className="workflow-title-text">
                  {isPostCook ? 'Витрина подогрева (65–85°C, до 6 часов)' : 'Запекание в печи (до 250°C) + выкладка'}
                </strong>
                <p className="workflow-desc-text">
                  {isPostCook
                    ? 'Горячее блюдо фасуется после гриля и сохраняет тепло на тепловой витрине самообслуживания Profi для покупателей.'
                    : 'Блюдо допекается прямо в упаковке в ротационной печи при 250°C, а затем поступает на витрину подогрева. Большинство био-материалов здесь не выдерживают!'}
                </p>
                <div className="workflow-modes-pills">
                  {wf.modes.map((m) => (
                    <span key={m} className="mode-pill">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {isSelected && (
                <div className="workflow-active-indicator">
                  <span>Выбранный режим оценки</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Mandatory Workflow Assumption & Thermal Boundary Disclosures */}
      <div className="workflow-assumption-banner" role="note">
        {selectedWorkflowId === 'POST_COOK_HOT_HOLD_6H' && (
          <div className="assumption-alert post-cook-alert">
            <span className="alert-icon" aria-hidden="true">
              ⚠️
            </span>
            <div className="alert-content">
              <strong>Параметры витрины сети Profi:</strong>
              <span>
                {' '}
                Хранение горячих блюд при 65–85°C до 6 часов — рабочий стандарт кулинарии Profi.
                Упаковка должна выдерживать конденсат и горячий птичий жир без размягчения дна.
              </span>
            </div>
          </div>
        )}

        {selectedWorkflowId === 'LITERAL_OVEN_250C_THEN_HOLD' && (
          <div className="assumption-alert oven-alert">
            <span className="alert-icon" aria-hidden="true">
              🔥
            </span>
            <div className="alert-content">
              <strong>Границы термостойкости (Важно для жюри):</strong>
              <span>
                {' '}
                250°C действует только на этапе запекания в печи (не 6 часов подряд при 250°C).
                Все биополимеры и бумага с тонкими окнами здесь блокируются. У алюминиевых лотков жаростойкость 280°C касается только металла, но не прозрачных пластиковых крышек!
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
