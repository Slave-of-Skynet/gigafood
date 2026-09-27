import { useTranslation } from '../i18n';
import type { WorkflowDefinition, WorkflowId } from '../api/contracts';

interface WorkflowSelectorProps {
  workflows: WorkflowDefinition[];
  selectedWorkflowId: WorkflowId;
  onSelectWorkflow: (id: WorkflowId) => void;
  disabled?: boolean;
}

const WORKFLOW_METADATA: Record<
  WorkflowId,
  { label: string; badge: string; tempDimension: string; holdDimension: string; summary: string }
> = {
  POST_COOK_HOT_HOLD_6H: {
    label: 'Pack after cooking',
    badge: 'Standard Hot-Bar Workflow',
    tempDimension: '85–95°C in this test; actual store temperature unknown',
    holdDimension: 'Up to 6 hours required; performance needs testing',
    summary: 'Food is cooked in rotisserie/combi oven prior to packaging; packaging only undergoes post-cook hot holding.',
  },
  LITERAL_OVEN_250C_THEN_HOLD: {
    label: 'Cook inside the packaging',
    badge: 'High-Temperature Workflow',
    tempDimension: '250°C peak oven cooking exposure',
    holdDimension: 'Followed by holding phase: up to 6 hours holding requirement; 85–95°C is a MODELED TEST CONDITION and actual Profi display temperature remains UNKNOWN',
    summary: 'Food is cooked or reheated directly inside the package at up to 250°C, then held on heated display.',
  },
};

export function WorkflowSelector({
  workflows,
  selectedWorkflowId,
  onSelectWorkflow,
  disabled = false,
}: WorkflowSelectorProps) {
  const t = useTranslation();
  return (
    <section className="workflow-selector-deck" aria-label={t("Select Operational Workflow")}>
      <div className="selector-title-row">
        <div>
          <span className="control-step-tag">{t("Step 2")}</span>
          <h2 className="control-section-heading">{t("How will the packaging be used?")}</h2>
        </div>
        <span className="current-workflow-badge">{t("Workflow: ")}<strong>{t(WORKFLOW_METADATA[selectedWorkflowId]?.label || selectedWorkflowId)}</strong>
        </span>
      </div>

      <div className="workflow-options-grid">
        {t(workflows.map((wf) => {
          const isSelected = wf.workflow_id === selectedWorkflowId;
          const meta = WORKFLOW_METADATA[wf.workflow_id];

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
                  {t(meta?.badge || wf.name)}
                </span>
                <span className="workflow-status-tag">{t(wf.status)}</span>
              </div>

              <div className="workflow-card-body">
                <strong className="workflow-title-text">{t(meta?.label || wf.name)}</strong>
                <p className="workflow-desc-text">{t(meta?.summary || wf.description)}</p>

                {/* Explicitly separate the 2 dimensions: Peak Temp vs Hold Duration */}
                <div className="workflow-dimensions-grid">
                  <div className="dimension-row">
                    <span className="dim-label">{t("Peak Temperature:")}</span>
                    <strong className="dim-value">{t(meta?.tempDimension)}</strong>
                  </div>
                  <div className="dimension-row">
                    <span className="dim-label">{t("Hot holding:")}</span>
                    <strong className="dim-value">{t(meta?.holdDimension)}</strong>
                  </div>
                </div>
              </div>

              {t(isSelected && (
                <div className="workflow-active-indicator">
                  <span>{t("Selected")}</span>
                </div>
              ))}
            </button>
          );
        }))}
      </div>

      {/* Explicit Dimension Separation and Workflow Disclosures */}
      <div className="workflow-assumption-banner" role="note">
        {t(selectedWorkflowId === 'POST_COOK_HOT_HOLD_6H' && (
          <div className="assumption-alert post-cook-alert">
            <span className="alert-icon" aria-hidden="true">{t("ℹ️")}</span>
            <div className="alert-content">
              <strong>{t("What this means:")}</strong>
              <span>
                {t(' ')}{t("Up to 6 hours required; performance needs testing; 85–95°C is a MODELED TEST CONDITION and actual Profi display temperature remains UNKNOWN. Because food is packaged after cooking, packaging is NOT exposed to 250°C oven heat in this scenario. Full 6-hour holding performance with fatty poultry remains subject to physical qualification.")}</span>
            </div>
          </div>
        ))}

        {t(selectedWorkflowId === 'LITERAL_OVEN_250C_THEN_HOLD' && (
          <div className="assumption-alert oven-alert">
            <span className="alert-icon" aria-hidden="true">{t("⚠️")}</span>
            <div className="alert-content">
              <strong>{t("Oven use needs extra checks:")}</strong>
              <span>
                {t(' ')}
                <strong>{t("250°C peak oven cooking")}</strong>{t(" is a distinct dimension from ")}<strong>{t("subsequent heated holding")}</strong>{t(". C2, C3, C4 and C5 are hard-blocked by documented thermal limits; C1 Gaia remains unresolved/unprioritized because numeric peak evidence is insufficient; C6-RO-H is a Priority 2 high-temperature fallback qualification path, with closure/duration still unverified. For aluminium solutions, an aluminium body heat rating does NOT confer heat resistance to transparent lids or closures.")}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
