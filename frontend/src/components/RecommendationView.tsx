import { useEffect, useRef, useState } from 'react';
import { api } from '../api/client';
import type {
  CandidateRecommendationAssessment,
  PackagingConfiguration,
  ProductId,
  RecommendationCandidatesResponse,
  RecommendationEvaluationResponse,
  RecommendationProductsResponse,
  SourceReference,
  WorkflowId,
} from '../api/contracts';
import { CandidateRecommendationCard } from './CandidateRecommendationCard';
import { DecisionSummary } from './DecisionSummary';
import { ProductSelector } from './ProductSelector';
import { WorkflowSelector } from './WorkflowSelector';

interface RecommendationViewProps {
  visible: boolean;
  uiLang?: 'en' | 'ru' | 'md';
}

type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string; is503?: boolean }
  | { status: 'ready'; data: T };

export function RecommendationView({ visible, uiLang: _uiLang = 'en' }: RecommendationViewProps) {
  // Catalogues state
  const [productsLoad, setProductsLoad] = useState<LoadState<RecommendationProductsResponse>>({
    status: 'loading',
  });
  const [candidatesLoad, setCandidatesLoad] = useState<LoadState<RecommendationCandidatesResponse>>({
    status: 'loading',
  });

  // User selection context
  const [selectedProductId, setSelectedProductId] = useState<ProductId>('P1');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<WorkflowId>('POST_COOK_HOT_HOLD_6H');

  // Evaluation response state
  const [evaluationLoad, setEvaluationLoad] = useState<LoadState<RecommendationEvaluationResponse>>({
    status: 'loading',
  });

  // Stale-response protection: generation guard & abort controller
  const evalGenerationRef = useRef(0);
  const evalAbortControllerRef = useRef<AbortController | null>(null);

  // Attempt counter for retry
  const [attempt, setAttempt] = useState(0);

  // 1. Load initial catalogues (Products & Candidates)
  useEffect(() => {
    const controller = new AbortController();
    setProductsLoad({ status: 'loading' });
    setCandidatesLoad({ status: 'loading' });

    Promise.all([
      api.recommendationProducts(controller.signal),
      api.recommendationCandidates(controller.signal),
    ])
      .then(([productsResp, candidatesResp]) => {
        if (controller.signal.aborted) return;
        setProductsLoad({ status: 'ready', data: productsResp });
        setCandidatesLoad({ status: 'ready', data: candidatesResp });

        if (productsResp.default_product_id) {
          setSelectedProductId(productsResp.default_product_id);
        }
        if (productsResp.default_workflow_id) {
          setSelectedWorkflowId(productsResp.default_workflow_id);
        }
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        const msg = String(err?.message || err);
        const is503 = msg.includes('503') || msg.includes('RECOMMENDATION_EVIDENCE_UNAVAILABLE');
        setProductsLoad({ status: 'error', message: msg, is503 });
        setCandidatesLoad({ status: 'error', message: msg, is503 });
      });

    return () => controller.abort();
  }, [attempt]);

  // 2. Evaluate recommendation when selectedProductId or selectedWorkflowId changes
  useEffect(() => {
    // Abort any prior in-flight evaluation request
    if (evalAbortControllerRef.current) {
      evalAbortControllerRef.current.abort();
    }

    const currentGeneration = ++evalGenerationRef.current;
    const controller = new AbortController();
    evalAbortControllerRef.current = controller;

    setEvaluationLoad({ status: 'loading' });

    api
      .evaluateRecommendation(
        {
          product_id: selectedProductId,
          workflow_id: selectedWorkflowId,
        },
        controller.signal
      )
      .then((data) => {
        // Discard stale response if a newer selection request has been issued
        if (currentGeneration !== evalGenerationRef.current || controller.signal.aborted) {
          return;
        }
        setEvaluationLoad({ status: 'ready', data });
      })
      .catch((err) => {
        if (currentGeneration !== evalGenerationRef.current || controller.signal.aborted) {
          return;
        }
        const msg = String(err?.message || err);
        const is503 = msg.includes('503') || msg.includes('RECOMMENDATION_EVIDENCE_UNAVAILABLE');
        setEvaluationLoad({ status: 'error', message: msg, is503 });
      });

    return () => {
      controller.abort();
    };
  }, [selectedProductId, selectedWorkflowId, attempt]);

  const handleRetry = () => {
    setAttempt((n) => n + 1);
  };

  // Helper lookups
  const configurations = candidatesLoad.status === 'ready' ? candidatesLoad.data.configurations : [];
  const configMap = new Map<string, PackagingConfiguration>(
    configurations.map((c) => [c.configuration_id, c])
  );

  const sourcesMap: Record<string, SourceReference> =
    candidatesLoad.status === 'ready' ? candidatesLoad.data.referenced_sources : {};

  const evaluation = evaluationLoad.status === 'ready' ? evaluationLoad.data : null;

  // Assessments grouping
  const assessments: CandidateRecommendationAssessment[] = evaluation?.assessments || [];
  const firstPathAssessment = assessments.find((a) => a.role === 'FIRST_QUALIFICATION_PATH') || null;
  const fallbackAssessment =
    !firstPathAssessment && selectedWorkflowId === 'LITERAL_OVEN_250C_THEN_HOLD'
      ? assessments.find((a) => a.candidate_id === 'C6') || null
      : null;

  const alternativeAssessments = assessments.filter(
    (a) =>
      a.role === 'PRIORITY_ALTERNATIVE' && a !== fallbackAssessment ||
      a.role === 'ALTERNATIVE'
  );

  const blockedAssessments = assessments.filter((a) => a.role === 'BLOCKED');

  return (
    <div className="recommendation-view" hidden={!visible} aria-live="polite">
      {/* Physical Packaging Challenge Introduction */}
      <section id="problem" className="recommendation-header-card" aria-label="Physical Packaging Problem">
        <div className="recommendation-header-content">
          <div className="header-badge-row">
            <span className="recommendation-pill">HTF-03 · Canonical Recommendation Journey</span>
            <span className="recommendation-role-pill">Decision Layer (Not Certification)</span>
          </div>
          <h2 className="recommendation-main-title">
            High-Temperature Hot-Food Packaging Transition
          </h2>
          <p className="recommendation-lead-text">
            Evaluating sustainable physical packaging concepts for Profi hot rotisserie chicken and deli portions.
            Analyzing 6 hard operational gates: physical fit, food safety contact, 200–250°C thermal resistance,
            up to 6-hour heated holding, grease/oil barrier, transparent viewing window, and Romanian procurement.
          </p>

          <div className="challenge-axioms-bar">
            <div className="axiom-item">
              <span className="axiom-label">Challenge Focus:</span>
              <strong className="axiom-value">Physical packaging concept qualification</strong>
            </div>
            <div className="axiom-item">
              <span className="axiom-label">Commercial Premise:</span>
              <span className="axiom-value">+10–15% cost allowance is a commercial heuristic, not automatic approval</span>
            </div>
            <div className="axiom-item">
              <span className="axiom-label">Epistemic Rule:</span>
              <strong className="axiom-value">0 qualified survivors · Software is evidence-backed decision layer</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Loading / Error States */}
      {productsLoad.status === 'loading' && (
        <div className="status-panel" role="status">
          <h2>Loading Recommendation Evidence Snapshot…</h2>
          <p>Connecting to HTF-03 canonical packaging dataset…</p>
        </div>
      )}

      {productsLoad.status === 'error' && (
        <div className="status-panel error-panel" role="alert">
          <h2>
            {productsLoad.is503
              ? 'Recommendation evidence unavailable'
              : 'Failed to load recommendation catalogue'}
          </h2>
          <p>{productsLoad.message}</p>
          <button type="button" className="retry-btn" onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}

      {/* Controls Deck: Stage A (Product) & Stage B (Workflow) */}
      {productsLoad.status === 'ready' && (
        <div id="journey-context" className="recommendation-controls-deck">
          <ProductSelector
            products={productsLoad.data.products}
            selectedProductId={selectedProductId}
            onSelectProduct={(id) => setSelectedProductId(id)}
          />

          <WorkflowSelector
            workflows={productsLoad.data.workflows}
            selectedWorkflowId={selectedWorkflowId}
            onSelectWorkflow={(id) => setSelectedWorkflowId(id)}
          />
        </div>
      )}

      {/* Evaluation Loading State */}
      {evaluationLoad.status === 'loading' && productsLoad.status === 'ready' && (
        <div className="status-panel evaluating-panel" role="status">
          <div className="eval-spinner" aria-hidden="true" />
          <div>
            <h2>Evaluating 6 Hard Gates & Qualification Priority…</h2>
            <p>
              Testing candidate physical concepts against selected product geometry and thermal workflow…
            </p>
          </div>
        </div>
      )}

      {/* Evaluation Error State */}
      {evaluationLoad.status === 'error' && (
        <div className="status-panel error-panel" role="alert">
          <h2>
            {evaluationLoad.is503
              ? 'Recommendation evidence unavailable'
              : 'Evaluation request failed'}
          </h2>
          <p>{evaluationLoad.message}</p>
          <button type="button" className="retry-btn" onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}

      {/* Evaluation Results Flow */}
      {evaluation && evaluationLoad.status === 'ready' && (
        <div className="recommendation-results-flow">
          {/* Decision Summary */}
          <div id="decision-summary">
            <DecisionSummary
              productId={selectedProductId}
              workflowId={selectedWorkflowId}
              recommendation={evaluation.recommendation}
              firstPathAssessment={firstPathAssessment}
              effectiveAssumptions={evaluation.context.effective_assumptions}
            />
          </div>

          {/* Primary Qualification Path or High-Temperature Fallback Path */}
          <div id="candidate-evaluations">
            <section className="results-group primary-path-group" aria-label="First Qualification Path">
              <div className="group-header">
                <span className="group-tag">Primary Qualification Focus</span>
                <h3 className="group-heading">
                  {firstPathAssessment
                    ? 'First Physical Packaging Path Worth Qualifying (Priority 1)'
                    : selectedWorkflowId === 'LITERAL_OVEN_250C_THEN_HOLD'
                    ? 'High-Temperature Fallback Qualification Path (Priority 2)'
                    : 'Candidate Under Evaluation'}
                </h3>
              </div>

              {firstPathAssessment && (
                <CandidateRecommendationCard
                  assessment={firstPathAssessment}
                  configuration={
                    firstPathAssessment.configuration_id
                      ? configMap.get(firstPathAssessment.configuration_id)
                      : null
                  }
                  sourcesMap={sourcesMap}
                  isFirstPath={true}
                />
              )}

              {fallbackAssessment && (
                <CandidateRecommendationCard
                  assessment={fallbackAssessment}
                  configuration={
                    fallbackAssessment.configuration_id
                      ? configMap.get(fallbackAssessment.configuration_id)
                      : null
                  }
                  sourcesMap={sourcesMap}
                  isFirstPath={false}
                />
              )}

              {!firstPathAssessment && !fallbackAssessment && (
                <div className="no-first-path-card">
                  <div className="no-first-path-inner">
                    <span className="icon-warn">⚠️</span>
                    <div>
                      <strong>No Priority 1 Path Identified for Current Context</strong>
                      <p>
                        Candidate solutions require laboratory qualification before being advanced.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Viable Alternatives Section */}
            {alternativeAssessments.length > 0 && (
              <section className="results-group alternatives-group" aria-label="Alternatives Requiring Qualification">
                <div className="group-header">
                  <span className="group-tag">Candidate Landscape</span>
                  <h3 className="group-heading">
                    Alternatives Requiring Physical Qualification ({alternativeAssessments.length})
                  </h3>
                  <p className="group-desc">
                    These candidate concepts satisfy basic thermal holding or material requirements but require
                    empirical testing for food contact migration, seal integrity, or store operations.
                  </p>
                </div>

                <div className="candidates-list-stack">
                  {alternativeAssessments.map((alt) => (
                    <CandidateRecommendationCard
                      key={`${alt.candidate_id}-${alt.configuration_id || 'default'}`}
                      assessment={alt}
                      configuration={
                        alt.configuration_id ? configMap.get(alt.configuration_id) : null
                      }
                      sourcesMap={sourcesMap}
                      isFirstPath={false}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Hard-Blocked Candidates Section */}
            {blockedAssessments.length > 0 && (
              <section className="results-group blocked-group" aria-label="Hard-Blocked Candidates">
                <div className="group-header">
                  <span className="group-tag blocked-tag">Hard-Gate Incompatibilities</span>
                  <h3 className="group-heading">
                    Hard-Blocked Candidates ({blockedAssessments.length})
                  </h3>
                  <p className="group-desc">
                    These candidates fail at least one non-compensatory hard gate (e.g. thermal limits below the
                    required workflow or geometry mismatch).
                  </p>
                </div>

                <div className="candidates-list-stack">
                  {blockedAssessments.map((blocked) => (
                    <CandidateRecommendationCard
                      key={`${blocked.candidate_id}-${blocked.configuration_id || 'default'}`}
                      assessment={blocked}
                      configuration={
                        blocked.configuration_id ? configMap.get(blocked.configuration_id) : null
                      }
                      sourcesMap={sourcesMap}
                      isFirstPath={false}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Reference Baselines Context (Section 20) */}
          <section id="baselines" className="results-group baselines-group" aria-label="Reference Baselines Context">
            <div className="group-header">
              <span className="group-tag">Reference Baselines</span>
              <h3 className="group-heading">Profi Incumbent vs Market References</h3>
            </div>

            <div className="baselines-cards-grid">
              {evaluation.baselines.map((b) => (
                <div
                  key={b.baseline_id}
                  className={`baseline-info-card ${
                    b.is_profi_incumbent ? 'profi-incumbent-card' : 'market-ref-card'
                  }`}
                >
                  <div className="baseline-card-top">
                    <span className="baseline-id-tag">{b.baseline_id}</span>
                    <span className="baseline-role-tag">
                      {b.is_profi_incumbent ? 'Actual Profi Incumbent' : 'Romanian Market Reference'}
                    </span>
                  </div>
                  <strong className="baseline-identity">{b.identity}</strong>
                  <p className="baseline-desc">{b.description}</p>
                  <div className="baseline-specs-row">
                    <span>
                      Virgin plastic fraction:{' '}
                      <strong>
                        {b.observed_virgin_fraction != null
                          ? `${b.observed_virgin_fraction * 100}%`
                          : 'Unknown'}
                      </strong>
                    </span>
                    {b.estimated_mass_g && (
                      <span>
                        Estimated mass:{' '}
                        <strong>
                          ≈{b.estimated_mass_g.central} g ({b.estimated_mass_g.low}–{b.estimated_mass_g.high} g)
                        </strong>
                      </span>
                    )}
                    {b.observed_price_ron != null && (
                      <span>
                        Market price: <strong>{b.observed_price_ron} RON</strong>
                      </span>
                    )}
                  </div>
                  {b.notes && <small className="baseline-note">{b.notes}</small>}
                </div>
              ))}
            </div>
          </section>

          {/* Mandatory Disclosures & Epistemic Guardrails */}
          <footer className="recommendation-disclosures-footer">
            <div className="disclosures-inner">
              <strong className="disclosures-title">⚖️ Mandatory Product Governance & Legal Disclosures:</strong>
              <ul className="disclosures-list">
                {evaluation.disclosures.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
              <div className="revision-hash-row">
                <small>Canonical Dataset: <code>{evaluation.dataset_id}</code></small>
                <small>Research Cut-Off: <code>{evaluation.research_cut_off}</code></small>
                <small>SHA256: <code>{evaluation.source_revision_hash.slice(0, 16)}…</code></small>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
