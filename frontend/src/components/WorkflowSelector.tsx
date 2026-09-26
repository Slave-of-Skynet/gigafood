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
    <section className="workflow-selector-deck" aria-label="Select Operational Workflow">
      <div className="selector-title-row">
        <div>
          <span className="control-step-tag">Step 2 · Thermal Workflow</span>
          <h2 className="control-section-heading">Select Operational Workflow & Thermal Requirements</h2>
        </div>
        <span className="current-workflow-badge">
          Workflow: <strong>{selectedWorkflowId}</strong>
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
                  {isPostCook ? '🔥 65–85°C Hot Hold' : '⚡ 250°C Peak Oven'}
                </span>
                <span className="workflow-status-tag">{wf.status}</span>
              </div>

              <div className="workflow-card-body">
                <strong className="workflow-title-text">{wf.name}</strong>
                <p className="workflow-desc-text">{wf.description}</p>
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
                  <span>Active Evaluation Workflow</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Mandatory Workflow Assumption & Thermal Boundary Disclosures (Sections 12 & 13) */}
      <div className="workflow-assumption-banner" role="note">
        {selectedWorkflowId === 'POST_COOK_HOT_HOLD_6H' && (
          <div className="assumption-alert post-cook-alert">
            <span className="alert-icon" aria-hidden="true">
              ⚠️
            </span>
            <div className="alert-content">
              <strong>Working workflow assumption:</strong>
              <span>
                {' '}
                Actual Profi store process still requires operational confirmation. 6-hour holding at
                65–85°C is an evaluation target, not yet lab-verified for all candidates.
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
              <strong>Thermal boundary distinction:</strong>
              <span>
                {' '}
                250°C applies exclusively to the peak cooking oven cycle. Hot holding is a separate
                6-hour requirement at 65–85°C (<strong>NEVER 250°C continuous for 6 hours</strong>).
                For aluminium packaging, oven body rating does not confer thermal tolerance to
                unqualified transparent lids.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
