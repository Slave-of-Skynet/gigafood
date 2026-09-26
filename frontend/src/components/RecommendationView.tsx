import { useEffect, useRef, useState } from 'react';
import { api } from '../api/client';
import type {
  PackagingConfiguration,
  ProductId,
  RecommendationCandidatesResponse,
  RecommendationEvaluationResponse,
  RecommendationProductsResponse,
  SourceReference,
  WorkflowId,
} from '../api/contracts';
import { ProductSelector } from './ProductSelector';
import { WorkflowSelector } from './WorkflowSelector';
import { DecisionSummary } from './DecisionSummary';
import { CandidateRecommendationCard } from './CandidateRecommendationCard';

interface RecommendationViewProps {
  visible: boolean;
}

export function RecommendationView({ visible }: RecommendationViewProps) {
  // Discovery state
  const [productsData, setProductsData] = useState<RecommendationProductsResponse | null>(null);
  const [candidatesData, setCandidatesData] = useState<RecommendationCandidatesResponse | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const [initLoading, setInitLoading] = useState(true);

  // Selection state
  const [selectedProductId, setSelectedProductId] = useState<ProductId>('P1');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<WorkflowId>('POST_COOK_HOT_HOLD_6H');

  // Evaluation state
  const [evaluation, setEvaluation] = useState<RecommendationEvaluationResponse | null>(null);
  const [evalLoading, setEvalLoading] = useState(false);
  const [evalError, setEvalError] = useState<string | null>(null);

  // Stale-response protection ref (Section 48)
  const evalRequestGenRef = useRef<number>(0);
  const [attempt, setAttempt] = useState(0);

  // Step 1: Initialize metadata (products, workflows, candidate definitions)
  useEffect(() => {
    if (!visible) return;
    const controller = new AbortController();
    setInitLoading(true);
    setInitError(null);

    Promise.all([
      api.getRecommendationProducts(controller.signal),
      api.getRecommendationCandidates(controller.signal),
    ])
      .then(([pResp, cResp]) => {
        if (controller.signal.aborted) return;
        setProductsData(pResp);
        setCandidatesData(cResp);
        setSelectedProductId(pResp.default_product_id);
        setSelectedWorkflowId(pResp.default_workflow_id);
        setInitLoading(false);
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setInitError(err instanceof Error ? err.message : String(err));
          setInitLoading(false);
        }
      });

    return () => controller.abort();
  }, [visible, attempt]);

  // Step 2: Evaluate recommendation whenever product or workflow changes (with strict stale-response protection)
  useEffect(() => {
    if (!visible || !productsData || !candidatesData) return;

    const controller = new AbortController();
    const currentGeneration = ++evalRequestGenRef.current;

    setEvalLoading(true);
    setEvalError(null);

    api
      .evaluateRecommendation(
        {
          product_id: selectedProductId,
          workflow_id: selectedWorkflowId,
        },
        controller.signal
      )
      .then((resp) => {
        // Discard response if a newer request was dispatched in the meantime
        if (controller.signal.aborted || currentGeneration !== evalRequestGenRef.current) {
          return;
        }
        setEvaluation(resp);
        setEvalLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted || currentGeneration !== evalRequestGenRef.current) {
          return;
        }
        setEvalError(err instanceof Error ? err.message : String(err));
        setEvalLoading(false);
      });

    return () => controller.abort();
  }, [visible, productsData, candidatesData, selectedProductId, selectedWorkflowId, attempt]);

  const handleRetry = () => {
    setAttempt((n) => n + 1);
  };

  if (!visible) return null;

  if (initLoading) {
    return (
      <div className="status-panel loading-panel" role="status">
        <span className="pulse-dot" />
        <h2>Loading GigaFood Recommendation Engine…</h2>
        <p>Fetching canonical packaging datasets, archetype definitions, and evaluation models…</p>
      </div>
    );
  }

  if (initError) {
    return (
      <div className="status-panel error-panel" role="alert">
        <h2>Recommendation evidence unavailable</h2>
        <p>{initError}</p>
        <button type="button" className="retry-btn" onClick={handleRetry}>
          Retry Connection
        </button>
      </div>
    );
  }

  if (!productsData || !candidatesData) return null;

  // Build sources lookup map
  const sourcesMap: Record<string, SourceReference> = {
    ...candidatesData.referenced_sources,
    ...(evaluation?.referenced_sources || {}),
  };

  // Find configurations map
  const configMap = new Map<string, PackagingConfiguration>();
  candidatesData.configurations.forEach((c) => {
    configMap.set(c.configuration_id, c);
  });

  // Segregate evaluated assessments into First Path, Alternatives, and Blocked
  const firstPathId = evaluation?.recommendation.first_qualification_candidate_id;
  const firstPathAssessment = evaluation?.assessments.find(
    (a) => a.candidate_id === firstPathId && a.is_first_qualification_path
  );

  const alternativeAssessments = evaluation?.assessments.filter(
    (a) => a.candidate_id !== firstPathId && a.outcome !== 'BLOCKED'
  ) || [];

  const blockedAssessments = evaluation?.assessments.filter(
    (a) => a.outcome === 'BLOCKED'
  ) || [];

  return (
    <div className="recommendation-experience-root">
      {/* 1. Product & Workflow Selection Deck */}
      <section className="recommendation-controls-deck">
        <ProductSelector
          products={productsData.products}
          selectedProductId={selectedProductId}
          onSelectProduct={(id) => setSelectedProductId(id)}
          disabled={evalLoading}
        />

        <WorkflowSelector
          workflows={productsData.workflows}
          selectedWorkflowId={selectedWorkflowId}
          onSelectWorkflow={(id) => setSelectedWorkflowId(id)}
          disabled={evalLoading}
        />
      </section>

      {/* Loading Transition Overlay / Indicator */}
      {evalLoading && (
        <div className="evaluation-loading-bar" role="status">
          <span className="loading-spinner" />
          <span>Evaluating 6 non-compensatory hard gates for {selectedProductId} under {selectedWorkflowId}…</span>
        </div>
      )}

      {/* Evaluation Error */}
      {evalError && (
        <div className="status-panel error-panel" role="alert">
          <h2>Evaluation Request Failed</h2>
          <p>{evalError}</p>
          <button type="button" className="retry-btn" onClick={handleRetry}>
            Retry Evaluation
          </button>
        </div>
      )}

      {/* Main Results View */}
      {evaluation && !evalLoading && (
        <div className="recommendation-results-flow">
          {/* 2. Primary Decision Summary */}
          <DecisionSummary
            productId={selectedProductId}
            workflowId={selectedWorkflowId}
            recommendation={evaluation.recommendation}
            firstPathAssessment={firstPathAssessment}
            effectiveAssumptions={evaluation.context.effective_assumptions}
          />

          {/* 3. Primary Candidate Section (First Qualification Path or High-Temp Fallback) */}
          <section className="results-group primary-path-group" aria-label="First Qualification Path">
            <div className="group-header">
              <span className="group-tag">Primary Investigation Focus</span>
              <h3 className="group-heading">
                {firstPathAssessment
                  ? 'First Packaging Path Worth Qualifying (Priority 1)'
                  : selectedWorkflowId === 'LITERAL_OVEN_250C_THEN_HOLD'
                  ? 'High-Temperature Fallback Architecture (Priority 2)'
                  : 'Candidate Under Evaluation'}
              </h3>
            </div>

            {firstPathAssessment ? (
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
            ) : (
              <div className="no-first-path-card">
                <div className="no-first-path-inner">
                  <span className="icon-warn">⚠️</span>
                  <div>
                    <strong>No Priority 1 Qualification Path Available for Literal 250°C Oven Path</strong>
                    <p>
                      All polymer, biopolymer, and paper-window solutions (C2, C3, C4, C5) are hard-blocked
                      due to heat limits below 250°C. C1 Sacma Gaia remains an unprioritized alternative.
                      C6-RO-H (Aluminium bare body) serves as a high-temperature fallback path (Priority 2),
                      requiring separate qualification of food-contact coatings and transparent closures.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 4. Viable Alternatives Section (Requiring Qualification) */}
          {alternativeAssessments.length > 0 && (
            <section className="results-group alternatives-group" aria-label="Viable Alternatives">
              <div className="group-header">
                <span className="group-tag">Candidate Landscape</span>
                <h3 className="group-heading">
                  Viable Alternatives Requiring Qualification ({alternativeAssessments.length})
                </h3>
                <p className="group-desc">
                  These solutions satisfy basic thermal holding or material constraints but still require
                  empirical laboratory verification for food contact, seal integrity, or store workflow.
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

          {/* 5. Hard-Blocked Candidates Section */}
          {blockedAssessments.length > 0 && (
            <section className="results-group blocked-group" aria-label="Blocked Candidates">
              <div className="group-header">
                <span className="group-tag blocked-tag">Hard-Gate Rejections</span>
                <h3 className="group-heading">
                  Incompatible & Hard-Blocked Candidates ({blockedAssessments.length})
                </h3>
                <p className="group-desc">
                  These candidates fail at least one non-compensatory hard gate (e.g. thermal limit below oven cycle
                  or dimensional incompatibility with the selected hot-food portion).
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

          {/* 6. Baseline Incumbent Context (Section 40) */}
          <section className="results-group baselines-group" aria-label="Incumbent Baselines Context">
            <div className="group-header">
              <span className="group-tag">Reference Baselines</span>
              <h3 className="group-heading">Profi Incumbent vs Market References</h3>
            </div>

            <div className="baselines-cards-grid">
              {evaluation.baselines.map((b) => (
                <div
                  key={b.baseline_id}
                  className={`baseline-info-card ${b.is_profi_incumbent ? 'profi-incumbent-card' : 'market-ref-card'}`}
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
                    <span>Virgin plastic fraction: <strong>{b.observed_virgin_fraction != null ? `${b.observed_virgin_fraction * 100}%` : 'Unknown'}</strong></span>
                    {b.estimated_mass_g && (
                      <span>Estimated mass: <strong>≈{b.estimated_mass_g.central} g ({b.estimated_mass_g.low}–{b.estimated_mass_g.high} g)</strong></span>
                    )}
                    {b.observed_price_ron && (
                      <span>Market price: <strong>{b.observed_price_ron} RON</strong></span>
                    )}
                  </div>
                  {b.notes && <small className="baseline-note">{b.notes}</small>}
                </div>
              ))}
            </div>
          </section>

          {/* 7. Mandatory Disclosures & Epistemic Guardrails (Section 86) */}
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
