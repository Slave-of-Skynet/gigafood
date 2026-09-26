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

  return (
    <section className="decision-summary-card" aria-label="Recommendation Summary">
      <div className="decision-card-top">
        <div className="decision-title-group">
          <span className="decision-eyebrow">Canonical Recommendation Synthesis</span>
          <h2 className="decision-main-heading">
            {hasFirstPath
              ? `First Qualification Path: ${firstPathAssessment?.candidate_name || recommendation.first_qualification_candidate_id}`
              : isLiteralOven
              ? 'Peak Oven 250°C: No Unqualified Winner · C6-RO-H High-Temp Fallback'
              : 'Qualification Evaluation Outcome'}
          </h2>
        </div>

        <div className="decision-badges-cluster">
          {hasFirstPath && (
            <span className="decision-role-badge">
              1st Qualification Path (Priority 1)
            </span>
          )}
          {isLiteralOven && fallbackCandidate && (
            <span className="decision-role-badge fallback-badge">
              High-Temp Fallback Path ({fallbackCandidate.configuration_id || 'C6-RO-H'}) · Priority 2
            </span>
          )}
          <span className="decision-outcome-badge status-caution">
            QUALIFICATION REQUIRED
          </span>
          <span className="survivors-count-badge">
            Qualified Survivors: <strong>0 / 6</strong>
          </span>
        </div>
      </div>

      <div className="decision-grid">
        <div className="decision-narrative-col">
          <strong className="decision-section-label">Core Recommendation Rationale:</strong>
          <p className="decision-rationale-text">
            {firstPathAssessment?.rationale ||
              (isLiteralOven
                ? 'Under the literal 250°C oven requirement, standard polymer and cellulose films (C2, C3, C4, C5) are hard-blocked due to documented thermal limits below 250°C. C1 Sacma Gaia remains an unresolved alternative without priority. C6-RO-H (Aluminium body with 280°C claim) provides the primary high-temperature fallback path, but transparent viewing and food contact remain to be laboratory qualified.'
                : 'Packaging candidates have been evaluated against 6 hard gates. No candidate satisfies all operational and compliance criteria without empirical laboratory testing.')}
          </p>

          <div className="decision-callout-box">
            <span className="callout-icon" aria-hidden="true">
              ℹ️
            </span>
            <div className="callout-body">
              <strong>Epistemic State: Zero Qualified Survivors.</strong>
              <span>
                {' '}
                Software cannot certify food safety, legal compliance, or approve supplier procurement.
                Every candidate is currently marked <strong>QUALIFICATION REQUIRED</strong>.
              </span>
            </div>
          </div>
        </div>

        <div className="decision-quick-facts-col">
          <div className="decision-stat-row">
            <span className="stat-label">Target Product Archetype:</span>
            <strong className="stat-value">{productId}</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Evaluated Workflow:</span>
            <strong className="stat-value">{workflowId}</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Viable Alternatives:</span>
            <strong className="stat-value">{recommendation.alternatives.length} candidate(s)</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Hard-Blocked Candidates:</span>
            <strong className="stat-value blocked-value">
              {recommendation.blocked.length} candidate(s)
            </strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Top Next Action:</span>
            <span className="stat-action-text">
              {firstPathAssessment?.next_qualification_actions?.[0] ||
                'Commission accredited laboratory migration & thermal test'}
            </span>
          </div>
          {effectiveAssumptions.length > 0 && (
            <div className="decision-stat-row">
              <span className="stat-label">Active Assumptions:</span>
              <span className="stat-action-text">{effectiveAssumptions.join(' · ')}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
