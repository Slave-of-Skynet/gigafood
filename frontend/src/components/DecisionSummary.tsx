import { useTranslation } from '../i18n';
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
}

export function DecisionSummary({
  productId,
  workflowId,
  recommendation,
  firstPathAssessment,
}: DecisionSummaryProps) {
  const t = useTranslation();
  const isLiteralOven = workflowId === 'LITERAL_OVEN_250C_THEN_HOLD';
  const hasFirstPath = !!recommendation.first_qualification_candidate_id;

  // For literal 250°C, C6 is priority 2 fallback path
  const fallbackCandidate = isLiteralOven
    ? recommendation.alternatives.find((a) => a.candidate_id === 'C6')
    : null;

  const qualifiedCount = recommendation.qualified_survivors.length;
  const sanitizeRationale = (text: string) => text.replace(/\bwinner\b/gi, 'qualified survivor');

  return (
    <section className="decision-summary-card" aria-label={t("Recommendation Summary")}>
      <div className="decision-card-top">
        <div className="decision-title-group">
          <span className="decision-eyebrow">{t("Your result")}</span>
          <h2 className="decision-main-heading">
            {t(hasFirstPath
              ? `Start by testing: ${firstPathAssessment?.candidate_name || recommendation.first_qualification_candidate_id} (${recommendation.first_qualification_candidate_id})`
              : isLiteralOven
              ? 'Literal 250°C Oven Cycle: C6-RO-H High-Temperature Fallback Path (Priority 2)'
              : 'Qualification Evaluation Outcome')}
          </h2>
        </div>

        <div className="decision-badges-cluster">
          {t(hasFirstPath && (
            <span className="decision-role-badge">{t("First option to test")}</span>
          ))}
          {t(isLiteralOven && fallbackCandidate && (
            <span className="decision-role-badge fallback-badge">{t("High-Temperature Fallback Qualification Path · Priority 2")}</span>
          ))}
          <span className="decision-outcome-badge status-caution">
            {t("Testing required")}
            <code className="canonical-outcome-token">QUALIFICATION REQUIRED</code>
          </span>
          {/* Section 9: Qualified survivors: 0 must be obvious. No positive hero badge when 0. */}
          <span className="survivors-count-badge zero-survivors">{t("Fully checked options: ")}<strong>{t(qualifiedCount)}{t(" / 6")}</strong>
          </span>
        </div>
      </div>

      <div className="decision-grid">
        <div className="decision-narrative-col">
          <strong className="decision-section-label">{t("Why this result?")}</strong>
          <p className="decision-rationale-text">
            {t(sanitizeRationale(
              firstPathAssessment?.rationale ||
                (isLiteralOven
                  ? 'Under the literal 250°C oven requirement, C2, C3, C4 and C5 are hard-blocked by documented thermal limits. C1 Gaia remains an unresolved and unprioritized alternative because numeric peak evidence is insufficient. C6-RO-H (Aluminium body with 280°C claim) serves as a high-temperature fallback qualification path (Priority 2), with transparent closure compatibility and holding duration still unverified.'
                  : 'Packaging candidates evaluated against 6 canonical hard gates (physical fit; food contact; thermal workflow [peak exposure + holding]; grease/leak; transparent viewing; procurement). Critical physical evidence remains unresolved.')
            ))}
          </p>

          <div className="decision-callout-box">
            <span className="callout-icon" aria-hidden="true">{t("ℹ️")}</span>
            <div className="callout-body">
              <strong>{t("Before you switch:")}</strong>
              <span>
                {t(' ')}{t("Software cannot certify food migration compliance, legal regulatory status, or grant procurement approval. PackShift identifies candidate qualification priority while preventing premature deployment.")}</span>
            </div>
          </div>
        </div>

        <div className="decision-quick-facts-col">
          <div className="decision-stat-row">
            <span className="stat-label">{t("Product:")}</span>
            <strong className="stat-value">{t({ P1: 'Whole chicken', P2: 'Wings & thighs', P3: 'Potatoes & vegetables', P4: 'Meat portions' }[productId])}</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">{t("Use:")}</span>
            <strong className="stat-value">{t(isLiteralOven ? 'Cook in packaging, then keep hot' : 'Pack after cooking, then keep hot')}</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">{t("Fully checked options:")}</span>
            <strong className="stat-value zero-highlight">{t(qualifiedCount)}</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">{t("Alternatives Requiring Qualification:")}</span>
            <strong className="stat-value">{t(recommendation.alternatives.length)}{t(" candidate(s)")}</strong>
          </div>
          <div className="decision-stat-row">
            <span className="stat-label">{t("Not suitable:")}</span>
            <strong className="stat-value blocked-value">
              {t(recommendation.blocked.length)}{t(" candidate(s)")}</strong>
          </div>

        </div>
      </div>

      {/* Stretch Goal: 3-column comprehension block: What we know | What remains unknown | What to validate next */}
      <details className="supporting-details"><summary>{t("What we know and what to check next")}</summary>
      <div className="decision-stretch-block" aria-label={t("Qualification Roadmap")}>
        <div className="stretch-column">
          <div className="stretch-header">
            <span className="stretch-icon">{t("✓")}</span>
            <strong>{t("What Is Known")}</strong>
          </div>
          <ul className="stretch-list">
            <li>{t("Physical packaging concept candidates identified in European/Romanian market.")}</li>
            <li>{t("Candidate construction and component information is documented where published, while physical fit and complete food-contact migration/chemical qualification remain unresolved.")}</li>
            <li>{t("Theoretical virgin-plastic reductions modeled relative to incumbent baselines.")}</li>
          </ul>
        </div>

        <div className="stretch-column">
          <div className="stretch-header">
            <span className="stretch-icon">{t("❓")}</span>
            <strong>{t("What Remains Unknown")}</strong>
          </div>
          <ul className="stretch-list">
            <li>{t("Exact fatty-food migration dossiers for complete assembled package systems.")}</li>
            <li>{t("6-hour leak, seal, and oil retention tests under active store heating conditions.")}</li>
            <li>{t("Confirmed local Romanian distributor stock, MOQ terms, and firm unit pricing.")}</li>
          </ul>
        </div>

        <div className="stretch-column">
          <div className="stretch-header">
            <span className="stretch-icon">{t("→")}</span>
            <strong>{t("What Profi Should Validate Next")}</strong>
          </div>
          <ul className="stretch-list">
            <li>
              {t(firstPathAssessment?.next_qualification_actions?.[0] ||
                'Request exact complete-pack fatty-food migration testing from accredited laboratory.')}
            </li>
            <li>
              {t(firstPathAssessment?.next_qualification_actions?.[1] ||
                'Run physical 6-hour holding trial with rotisserie chicken in store warming cabinet.')}
            </li>
            <li>{t("Request formal written quotation with Romania delivery terms, lead times, and MOQ.")}</li>
          </ul>
        </div>
      </div>
      </details>
    </section>
  );
}
