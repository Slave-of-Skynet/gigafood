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

  // For literal 250°C, C6 is priority 2 fallback path
  const fallbackCandidate = isLiteralOven
    ? recommendation.alternatives.find((a) => a.candidate_id === 'C6')
    : null;

  const qualifiedCount = recommendation.qualified_survivors.length;
  const sanitizeRationale = (text: string) => text.replace(/\bwinner\b/gi, 'qualified survivor');

  return (
    <section className="decision-summary-card" aria-label="Recommendation Summary">
      <div className="decision-card-top">
        <div className="decision-title-group">
          <span className="decision-eyebrow">Canonical Evidence-Backed Decision Layer</span>
          <h2 className="decision-main-heading">
            {hasFirstPath
              ? `First Qualification Path: ${firstPathAssessment?.candidate_name || recommendation.first_qualification_candidate_id} (${recommendation.first_qualification_candidate_id})`
              : isLiteralOven
              ? 'Literal 250°C Oven Cycle: C6-RO-H High-Temperature Fallback Path (Priority 2)'
              : 'Qualification Evaluation Outcome'}
          </h2>
        </div>

        <div className="decision-badges-cluster">
          {hasFirstPath && (
            <span className="decision-role-badge">
              First Qualification Path · Priority 1
            </span>
          )}
          {isLiteralOven && fallbackCandidate && (
            <span className="decision-role-badge fallback-badge">
              High-Temperature Fallback Qualification Path · Priority 2
            </span>
          )}
          <span className="decision-outcome-badge status-caution">
            QUALIFICATION REQUIRED
          </span>
          {/* Section 9: Qualified survivors: 0 must be obvious. No positive hero badge when 0. */}
          <span className="survivors-count-badge zero-survivors">
            Qualified Survivors: <strong>{qualifiedCount} / 6</strong>
          </span>
        </div>
      </div>

      <div className="decision-grid">
        <div className="decision-narrative-col">
          <strong className="decision-section-label">Decision Synthesis & Rationale:</strong>
          <p className="decision-rationale-text">
            {sanitizeRationale(
              firstPathAssessment?.rationale ||
                (isLiteralOven
                  ? 'Under the literal 250°C oven requirement, standard polymer and cellulose films (C2, C3, C4, C5) are hard-blocked due to documented thermal limits below 250°C. C1 Sacma Gaia remains an unprioritized alternative. C6-RO-H (Aluminium body with 280°C claim) serves as a high-temperature fallback qualification path (Priority 2), requiring separate physical qualification of food-contact coatings and transparent closures.'
                  : 'Packaging candidates evaluated against 6 hard gates. Critical physical evidence remains unresolved.')
            )}
          </p>

          <div className="decision-callout-box">
            <span className="callout-icon" aria-hidden="true">
              ℹ️
            </span>
            <div className="callout-body">
              <strong>Evidence-backed decision layer — zero approvals:</strong>
              <span>
                {' '}
                Software cannot certify food migration compliance, legal regulatory status, or grant procurement approval.
                PackShift identifies candidate qualification priority while preventing premature deployment.
              </span>
            </div>
          </div>
        </div>

        <div className="decision-quick-facts-col">
          <div className="decision-stat-row">
            <span className="stat-label">Product Archetype:</span>
            <strong className="stat-value">{productId}</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Evaluated Workflow:</span>
            <strong className="stat-value">{workflowId}</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Qualified Survivors:</span>
            <strong className="stat-value zero-highlight">{qualifiedCount}</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Alternatives Requiring Qualification:</span>
            <strong className="stat-value">{recommendation.alternatives.length} candidate(s)</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">Hard-Blocked Candidates:</span>
            <strong className="stat-value blocked-value">
              {recommendation.blocked.length} candidate(s)
            </strong>
          </div>
          {effectiveAssumptions.length > 0 && (
            <div className="decision-stat-row">
              <span className="stat-label">Active Premise:</span>
              <span className="stat-action-text">{effectiveAssumptions.join(' · ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stretch Goal: 3-column comprehension block: What we know | What remains unknown | What to validate next */}
      <div className="decision-stretch-block" aria-label="Qualification Roadmap">
        <div className="stretch-column">
          <div className="stretch-header">
            <span className="stretch-icon">✓</span>
            <strong>What Is Known</strong>
          </div>
          <ul className="stretch-list">
            <li>Physical packaging concept candidates identified in European/Romanian market.</li>
            <li>Basic dimensional suitability & non-toxic substrate composition documented.</li>
            <li>Theoretical virgin-plastic reductions modeled relative to incumbent baselines.</li>
          </ul>
        </div>

        <div className="stretch-column">
          <div className="stretch-header">
            <span className="stretch-icon">❓</span>
            <strong>What Remains Unknown</strong>
          </div>
          <ul className="stretch-list">
            <li>Exact fatty-food migration dossiers for complete assembled package systems.</li>
            <li>6-hour leak, seal, and oil retention tests under active store heating conditions.</li>
            <li>Confirmed local Romanian distributor stock, MOQ terms, and firm unit pricing.</li>
          </ul>
        </div>

        <div className="stretch-column">
          <div className="stretch-header">
            <span className="stretch-icon">→</span>
            <strong>What Profi Should Validate Next</strong>
          </div>
          <ul className="stretch-list">
            <li>
              {firstPathAssessment?.next_qualification_actions?.[0] ||
                'Request exact complete-pack fatty-food migration testing from accredited laboratory.'}
            </li>
            <li>
              {firstPathAssessment?.next_qualification_actions?.[1] ||
                'Run physical 6-hour holding trial with rotisserie chicken in store warming cabinet.'}
            </li>
            <li>Request formal written quotation with Romania delivery terms, lead times, and MOQ.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
