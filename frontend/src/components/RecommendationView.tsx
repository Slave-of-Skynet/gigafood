import { useTranslation } from '../i18n';
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
import {
  getOfflineProducts,
  getOfflineCandidates,
  getOfflineEvaluation,
} from '../api/offlineFallback';

interface RecommendationViewProps {
  visible: boolean;
  uiLang?: 'en' | 'ru' | 'ro';
  targetWorkflowId?: WorkflowId;
  targetProductId?: ProductId;
}

type LoadState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string; is503?: boolean }
  | { status: 'ready'; data: T };

export function RecommendationView({
  visible,
  uiLang: _uiLang = 'en',
  targetWorkflowId,
  targetProductId,
}: RecommendationViewProps) {
  const t = useTranslation();
  // Catalogues state - initialized with offline fallback for instant render
  const [productsLoad, setProductsLoad] = useState<LoadState<RecommendationProductsResponse>>(() => {
    try {
      const off = getOfflineProducts();
      if (off) return { status: 'ready', data: off };
    } catch {}
    return { status: 'loading' };
  });
  const [candidatesLoad, setCandidatesLoad] = useState<LoadState<RecommendationCandidatesResponse>>(() => {
    try {
      const off = getOfflineCandidates();
      if (off) return { status: 'ready', data: off };
    } catch {}
    return { status: 'loading' };
  });

  // User selection context
  const [selectedProductId, setSelectedProductId] = useState<ProductId>(targetProductId || 'P1');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<WorkflowId>(targetWorkflowId || 'POST_COOK_HOT_HOLD_6H');

  useEffect(() => {
    if (targetWorkflowId) {
      setSelectedWorkflowId(targetWorkflowId);
    }
  }, [targetWorkflowId]);

  useEffect(() => {
    if (targetProductId) {
      setSelectedProductId(targetProductId);
    }
  }, [targetProductId]);

  // Evaluation response state - initialized with offline fallback for instant render
  const [evaluationLoad, setEvaluationLoad] = useState<LoadState<RecommendationEvaluationResponse>>(() => {
    try {
      const off = getOfflineEvaluation('P1', 'POST_COOK_HOT_HOLD_6H');
      if (off) return { status: 'ready', data: off };
    } catch {}
    return { status: 'loading' };
  });

  // Stale-response protection: generation guard & abort controller
  const evalGenerationRef = useRef(0);
  const evalAbortControllerRef = useRef<AbortController | null>(null);

  // Attempt counter for retry
  const [attempt, setAttempt] = useState(0);

  // 1. Load initial catalogues (Products & Candidates)
  useEffect(() => {
    const controller = new AbortController();

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
        try {
          const offProd = getOfflineProducts();
          const offCand = getOfflineCandidates();
          if (offProd && offCand) {
            setProductsLoad({ status: 'ready', data: offProd });
            setCandidatesLoad({ status: 'ready', data: offCand });
            return;
          }
        } catch {
          // Ignore
        }
        const msg = String(err?.message || err);
        const is503 = msg.includes('503') || msg.includes('RECOMMENDATION_EVIDENCE_UNAVAILABLE');
        setProductsLoad((prev) => (prev.status === 'ready' ? prev : { status: 'error', message: msg, is503 }));
        setCandidatesLoad((prev) => (prev.status === 'ready' ? prev : { status: 'error', message: msg, is503 }));
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

    try {
      const offEval = getOfflineEvaluation(selectedProductId, selectedWorkflowId);
      if (offEval) {
        setEvaluationLoad({ status: 'ready', data: offEval });
      } else {
        setEvaluationLoad({ status: 'loading' });
      }
    } catch {
      setEvaluationLoad({ status: 'loading' });
    }

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
        try {
          const offEval = getOfflineEvaluation(selectedProductId, selectedWorkflowId);
          if (offEval) {
            setEvaluationLoad({ status: 'ready', data: offEval });
            return;
          }
        } catch {
          // Ignore
        }
        const msg = String(err?.message || err);
        const is503 = msg.includes('503') || msg.includes('RECOMMENDATION_EVIDENCE_UNAVAILABLE');
        setEvaluationLoad((prev) => (prev.status === 'ready' ? prev : { status: 'error', message: msg, is503 }));
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
      <section id="problem" className="simple-intro" aria-label={t("How to find packaging")}>
        <h2>{t("Find packaging in two simple steps")}</h2>
        <p>{t("Choose a product, then select how it is heated. Your results update automatically below.")}</p>
      </section>

      {/* Catalogue Loading / Error States */}
      {productsLoad.status === 'loading' && (
        <div className="status-panel" role="status">
          <h2>{t("Loading packaging options…")}</h2>
          <p>{t("Getting the product list ready.")}</p>
        </div>
      )}

      {productsLoad.status === 'error' && (
        <div className="status-panel error-panel" role="alert">
          <h2>
            {t(productsLoad.is503
              ? 'Recommendation evidence unavailable'
              : 'Failed to load recommendation catalogue')}
          </h2>
          <p>{t("Calculation could not be loaded. Please retry.")}</p>
          <button type="button" className="retry-btn" onClick={handleRetry}>{t("Retry")}</button>
        </div>
      )}

      {/* Universal 250°C Engineering Solution Spotlight Banner */}
      <div className="recommendation-spotlight-banner">
        <div className="spotlight-content">
          <span className="spotlight-icon">🔥</span>
          <div>
            <strong className="spotlight-title">{t("Универсальная разработка для 250°C: Foil Grill Bag и Smoothwall Tray")}</strong>
            <span className="spotlight-desc">{t("Строго 2 материала · Шов без клея · 100% переработка под нормативы Румынии")}</span>
          </div>
        </div>
        <button
          type="button"
          className="spotlight-action-btn"
          onClick={() => setSelectedWorkflowId('LITERAL_OVEN_250C_THEN_HOLD')}
        >
          {t("Выбрать сценарий 250°C →")}
        </button>
      </div>

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
            <h2>{t("Checking packaging options…")}</h2>
            <p>{t("Checking size, heat resistance and other requirements for your selection.")}</p>
          </div>
        </div>
      )}

      {/* Evaluation Error State */}
      {evaluationLoad.status === 'error' && (
        <div className="status-panel error-panel" role="alert">
          <h2>
            {t(evaluationLoad.is503
              ? 'Recommendation evidence unavailable'
              : 'Evaluation request failed')}
          </h2>
          <p>{t("Calculation could not be loaded. Please retry.")}</p>
          <button type="button" className="retry-btn" onClick={handleRetry}>{t("Retry")}</button>
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
            />
          </div>

          {/* Primary Qualification Path or High-Temperature Fallback Path */}
          <div id="candidate-evaluations">
            <section className="results-group primary-path-group" aria-label={t("First Qualification Path")}>
              <div className="group-header">
                <span className="group-tag">{t("Where to start")}</span>
                <h3 className="group-heading">
                  {t(firstPathAssessment
                    ? 'First option to test'
                    : selectedWorkflowId === 'LITERAL_OVEN_250C_THEN_HOLD'
                    ? 'An option to investigate for oven use'
                    : 'Candidate Under Evaluation')}
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
                    <span className="icon-warn">{t("⚠️")}</span>
                    <div>
                      <strong>{t("No Priority 1 Path Identified for Current Context")}</strong>
                      <p>{t("Candidate solutions require laboratory qualification before being advanced.")}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Viable Alternatives Section */}
            {alternativeAssessments.length > 0 && (
              <details className="results-group alternatives-group" aria-label={t("Alternatives Requiring Qualification")}>
                <summary>{t("Other options to test (")}{alternativeAssessments.length}{t(")")}</summary>
                <div className="group-header">
                  <span className="group-tag">{t("More options")}</span>
                  <h3 className="group-heading">{t("Other options to test (")}{alternativeAssessments.length}{t(")")}</h3>
                  <p className="group-desc">{t("These candidate concepts satisfy basic thermal holding or material requirements but require empirical testing for food contact migration, seal integrity, or store operations.")}</p>
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
              </details>
            )}

            {/* Incompatible options Section */}
            {blockedAssessments.length > 0 && (
              <details className="results-group blocked-group" aria-label={t("Incompatible options")}>
                <summary>{t("Incompatible options (")}{blockedAssessments.length}{t(")")}</summary>
                <div className="group-header">
                  <span className="group-tag blocked-tag">{t("Not suitable for this use")}</span>
                  <h3 className="group-heading">{t("Incompatible options (")}{blockedAssessments.length}{t(")")}</h3>
                  <p className="group-desc">{t("These candidates fail at least one non-compensatory hard gate (e.g. thermal limits below the required workflow or geometry mismatch).")}</p>
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
              </details>
            )}
          </div>

          {/* Reference Baselines Context (Section 20) */}
          <details id="baselines" className="results-group baselines-group" aria-label={t("Reference Baselines Context")}>
            <summary>{t("Current packaging and market references")}</summary>
            <div className="group-header">
              <span className="group-tag">{t("Reference Baselines")}</span>
              <h3 className="group-heading">{t("Profi Incumbent vs Market References")}</h3>
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
                      {t(b.is_profi_incumbent ? 'Actual Profi Incumbent' : 'Romanian Market Reference')}
                    </span>
                  </div>
                  <strong className="baseline-identity">{t(b.identity)}</strong>
                  <p className="baseline-desc">{t(b.description)}</p>
                  <div className="baseline-specs-row">
                    <span>{t("Virgin plastic fraction:")}{' '}
                      <strong>
                        {b.observed_virgin_fraction != null
                          ? `${b.observed_virgin_fraction * 100}%`
                          : t('Not measured by the team')}
                      </strong>
                    </span>
                    {b.estimated_mass_g && (
                      <span>{t("Modeled mass scenario:")}{' '}
                        <strong>{t("≈")}{b.estimated_mass_g.central}{t(" g (")}{b.estimated_mass_g.low}{t("–")}{b.estimated_mass_g.high}{t(" g)")}</strong>
                      </span>
                    )}
                    {b.observed_price_ron != null && (
                      <span>{t("Market price: ")}<strong>{b.observed_price_ron}{t(" RON")}</strong>
                      </span>
                    )}
                  </div>
                  {b.notes && <small className="baseline-note">{t(b.notes)}</small>}
                </div>
              ))}
            </div>
          </details>

          {/* Mandatory Disclosures & Epistemic Guardrails */}
          <footer className="recommendation-disclosures-footer">
            <div className="disclosures-inner">
              <strong className="disclosures-title">{t("⚖️ About these results:")}</strong>
              <ul className="disclosures-list">
                {evaluation.disclosures.map((d, idx) => (
                  <li key={idx}>{t(d)}</li>
                ))}
              </ul>
              <div className="revision-hash-row">
                <small>{t("Canonical Dataset: ")}<code>{evaluation.dataset_id}</code></small>
                <small>{t("Research Cut-Off: ")}<code>{t(evaluation.research_cut_off)}</code></small>
                <small>{t("SHA256: ")}<code>{evaluation.source_revision_hash.slice(0, 16)}{t("…")}</code></small>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
