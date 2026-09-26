import { useEffect, useState } from 'react';
import { format, OperationalRequirementsView, PackageView } from '../components/EvidenceDetails';
import { SelectionView } from '../components/SelectionView';
import { EconomicScenarioView } from '../components/EconomicScenarioView';
import { RecommendationView } from '../components/RecommendationView';
import { reductionRingStyle } from '../components/metricRing';
import { api } from '../api/client';
import type {
  Comparison,
  Evidence,
  Health,
} from '../api/contracts';

type Load<T> =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'ready'; data: T };

type UiLang = 'en' | 'ru' | 'md';

const CHROME_I18N: Record<
  UiLang,
  {
    eyebrow: string;
    subtitle: string;
    scopeNote: string;
    navOverview: string;
    navRecommendation: string;
    navPortfolio: string;
    navCandidates: string;
  }
> = {
  en: {
    eyebrow: 'Evidence-Aware Decision Support',
    subtitle: 'Packaging Transition Copilot',
    scopeNote: 'UI chrome: EN · Backend evidence & API enums remain canonical EN',
    navOverview: 'Overview',
    navRecommendation: 'Recommendation Journey',
    navPortfolio: 'Portfolio & Baseline',
    navCandidates: 'Evaluated Candidates',
  },
  ru: {
    eyebrow: 'Поддержка решений на основе доказательств',
    subtitle: 'Копилот перехода на устойчивую упаковку',
    scopeNote: 'Шапка UI: RU · Данные backend и доказательства остаются на каноническом EN',
    navOverview: 'Обзор (Overview)',
    navRecommendation: 'Рекомендация (Recommendation)',
    navPortfolio: 'Портфель и база (Baseline)',
    navCandidates: 'Кандидаты (Candidates)',
  },
  md: {
    eyebrow: 'Suport decizional bazat pe dovezi',
    subtitle: 'Copilot pentru tranziția ambalajelor',
    scopeNote: 'Interfață: MD · Dovezile și stările API rămân în EN canonic',
    navOverview: 'Prezentare (Overview)',
    navRecommendation: 'Recomandare (Recommendation)',
    navPortfolio: 'Portofoliu & Bază',
    navCandidates: 'Candidați Evaluați',
  },
};

const formatNumberOnly = (value: number | null) =>
  value === null
    ? 'N/A'
    : value.toLocaleString('en-US', { maximumFractionDigits: 2 });

export function HomePage() {
  const [mode, setMode] = useState<'recommendation' | 'selection' | 'comparison'>('recommendation');
  const [uiLang, setUiLang] = useState<UiLang>('en');
  const [attempt, setAttempt] = useState(0);
  const [selected, setSelected] = useState('');
  const [runtime, setRuntime] = useState<
    Load<{ health: Health; evidence: Evidence }>
  >({ state: 'loading' });
  const [result, setResult] = useState<Load<Comparison>>({ state: 'loading' });

  const chrome = CHROME_I18N[uiLang];

  useEffect(() => {
    const controller = new AbortController();
    setRuntime({ state: 'loading' });
    setResult({ state: 'loading' });
    (async () => {
      const health = await api.health(controller.signal);
      const evidence = await api.scenarios(controller.signal);
      if (health.status !== 'READY' || !evidence.scenarios.length) {
        throw new Error('Evidence unavailable');
      }
      if (controller.signal.aborted) return;
      setSelected((old) =>
        evidence.scenarios.some((s) => s.id === old)
          ? old
          : evidence.scenarios[0].id
      );
      setRuntime({ state: 'ready', data: { health, evidence } });
    })().catch((error) => {
      if (!controller.signal.aborted) {
        setRuntime({ state: 'error', message: String(error) });
      }
    });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (runtime.state !== 'ready' || !selected) return;
    const controller = new AbortController();
    setResult({ state: 'loading' });
    api
      .comparison(selected, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setResult({ state: 'ready', data });
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setResult({ state: 'error', message: String(error) });
        }
      });
    return () => controller.abort();
  }, [selected, runtime]);

  const requirementsNotModeled =
    result.state === 'ready' &&
    !result.data.scenario.operational_requirements?.max_temperature_c &&
    !result.data.scenario.operational_requirements?.microwave_safe;

  const retry = () => setAttempt((n) => n + 1);

  return (
    <>
      <header className="header-project">
        <div className="nav-bar">
          <div className="blk-lang">
            <div className="runtime-pill">
              <span
                className={`pulse-dot ${
                  runtime.state === 'ready' ? '' : 'offline'
                }`}
              />
              <span>
                {runtime.state === 'ready'
                  ? `A-core: ${runtime.data.health.status} · ${runtime.data.evidence.dataset_kind}`
                  : runtime.state === 'loading'
                  ? 'Checking runtime…'
                  : 'A-core unavailable'}
              </span>
            </div>

            <div className="lang-control-cluster">
              <span className="lang-scope-note">{chrome.scopeNote}</span>
              <select
                name="lang"
                aria-label="Header UI language"
                className="lang-select"
                value={uiLang}
                onChange={(e) => setUiLang(e.target.value as UiLang)}
              >
                <option value="en" className="lang">
                  EN
                </option>
                <option value="ru" className="lang">
                  RU
                </option>
                <option value="md" className="lang">
                  MD
                </option>
              </select>
            </div>
          </div>

          <div className="brand-cluster">
            <a href="#overview" className="logo-img" aria-label="PackShift Home">
              <img src="/logo.png" alt="PackShift" className="logo-log" />
            </a>
          </div>

          <div className="nav-bar-sect">
            <nav
              hidden={mode !== 'recommendation'}
              className="btn-nav-bar"
              aria-label="Recommendation Navigation"
            >
              <a href="#overview" className="desc-nav-bar">
                {chrome.navOverview}
              </a>
              <a href="#recommendation-archetypes" className="desc-nav-bar">
                Hot Food (P1–P4)
              </a>
              <a href="#recommendation-workflow" className="desc-nav-bar">
                Workflow
              </a>
              <a href="#recommendation-summary" className="desc-nav-bar">
                Decision Summary
              </a>
              <a href="#recommendation-candidates" className="desc-nav-bar">
                Candidates
              </a>
            </nav>

            <nav
              hidden={mode !== 'selection'}
              className="btn-nav-bar"
              aria-label="Selection Navigation"
            >
              <a href="#overview" className="desc-nav-bar">
                {chrome.navOverview}
              </a>
              <a href="#portfolio-category-title" className="desc-nav-bar">
                {chrome.navPortfolio}
              </a>
              <a href="#evaluated-candidates-heading" className="desc-nav-bar">
                {chrome.navCandidates}
              </a>
            </nav>

            <nav
              hidden={mode !== 'comparison'}
              className="btn-nav-bar"
              aria-label="Primary Navigation"
            >
              <a href="#overview" className="desc-nav-bar">
                Overview
              </a>
              <a href="#impact" className="desc-nav-bar">
                Impact
              </a>
              <a href="#economics" className="desc-nav-bar">
                Economics
              </a>
              <a href="#eligibility" className="desc-nav-bar">
                Eligibility
              </a>
              <a href="#packages" className="desc-nav-bar">
                Packaging
              </a>
              <a href="#evidence" className="desc-nav-bar">
                Evidence
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="app-shell">
        <section id="overview" className="hero-card">
          <div className="hero-top">
            <div>
              <div className="hero-eyebrow">
                <span>{chrome.eyebrow}</span>
              </div>
              <h1 className="hero-title">PackShift</h1>
              <p className="hero-subtitle">{chrome.subtitle}</p>
              <p className="hero-description">
                Evaluate packaging transitions and portfolios. Measure
                virgin-plastic change, test bounded operating-context scenarios,
                and see the evidence and uncertainty behind each result.
              </p>
            </div>
          </div>

          <div className="policy-guard-banner">
            <span>
              <strong>Decision support only:</strong> Food safety, shelf life,
              comprehensive operational suitability and legal compliance are{' '}
              <strong>NOT VERIFIED</strong>. Environmental calculation ≠
              candidate eligibility ≠ implementation approval.
            </span>
            <div className="axiom-chips">
              <span className="axiom-chip">CALCULATED ≠ VERIFIED</span>
              <span className="axiom-chip">SOURCE_AVAILABLE ≠ VERIFIED</span>
              <span className="axiom-chip">missing ≠ 0</span>
              <span className="axiom-chip">PUBLIC ≠ PROVIDER</span>
            </div>
          </div>
        </section>

        <div className="mode-switch" role="group" aria-label="Product mode">
          <button
            type="button"
            className={`scenario-pill ${mode === 'recommendation' ? 'active' : ''}`}
            aria-pressed={mode === 'recommendation'}
            onClick={() => setMode('recommendation')}
          >
            Hot-Food Recommendation
          </button>
          <button
            type="button"
            className={`scenario-pill ${mode === 'selection' ? 'active' : ''}`}
            aria-pressed={mode === 'selection'}
            onClick={() => setMode('selection')}
          >
            Portfolio Selection
          </button>
          <button
            type="button"
            className={`scenario-pill ${mode === 'comparison' ? 'active' : ''}`}
            aria-pressed={mode === 'comparison'}
            onClick={() => setMode('comparison')}
          >
            Comparison
          </button>
        </div>

        <RecommendationView visible={mode === 'recommendation'} />
        <SelectionView visible={mode === 'selection'} />

        <div className="comparison-mode" hidden={mode !== 'comparison'}>
          {runtime.state === 'loading' && (
            <div className="status-panel" role="status">
              <h2>Checking service and evidence…</h2>
              <p>Loading validated packaging evidence snapshot from backend…</p>
            </div>
          )}

          {runtime.state === 'error' && (
            <div className="status-panel error-panel" role="alert">
              <h2>Service / evidence unavailable</h2>
              <p>{runtime.message}</p>
              <button className="retry-btn" onClick={retry}>
                Retry
              </button>
            </div>
          )}

          {runtime.state === 'ready' && (
            <>
              <section
                className="control-deck"
                aria-label="Dataset and Scenario Controls"
              >
                <div className="evidence-bar">
                  <div className="dataset-identity-group">
                    <span
                      className={`dataset-badge ${runtime.data.evidence.dataset_kind}`}
                    >
                      Dataset: {runtime.data.evidence.dataset_kind}
                    </span>
                    <span style={{ fontSize: '13.5px', fontWeight: 600 }}>
                      Service: {runtime.data.health.status} · Schema v
                      {runtime.data.evidence.schema_version}
                    </span>
                  </div>
                  <div className="disclosure-banner">
                    {runtime.data.evidence.disclosure}
                  </div>
                </div>

                <div className="scenario-selector-row">
                  <label className="scenario-label">
                    <span>Select Transition Scenario</span>
                    <select
                      className="scenario-select"
                      value={selected}
                      onChange={(event) => {
                        setResult({ state: 'loading' });
                        setSelected(event.target.value);
                      }}
                    >
                      {runtime.data.evidence.scenarios.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div
                    className="scenario-pills"
                    role="group"
                    aria-label="Quick scenario switcher"
                  >
                    {runtime.data.evidence.scenarios.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`scenario-pill ${
                          selected === s.id ? 'active' : ''
                        }`}
                        onClick={() => {
                          if (selected !== s.id) {
                            setResult({ state: 'loading' });
                            setSelected(s.id);
                          }
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {result.state === 'loading' && (
                <div className="status-panel" role="status">
                  <h2>Calculating…</h2>
                  <p>
                    Evaluating virgin-plastic delta and operational constraints…
                  </p>
                </div>
              )}

              {result.state === 'error' && (
                <div className="status-panel error-panel" role="alert">
                  <h2>Comparison calculation failed</h2>
                  <p>{result.message}</p>
                  <button className="retry-btn" onClick={retry}>
                    Retry
                  </button>
                </div>
              )}

              {result.state === 'ready' && (
                <div
                  className="all-products-board"
                  aria-live="polite"
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                  <div className="option-class">
                    <h2 className="name-option-class">
                      {result.data.scenario.label}
                    </h2>
                  </div>

                  {/* Stretch Goal: 3-Card Executive Decision Summary */}
                  <section
                    className="executive-strip"
                    aria-label="Decision Summary At-A-Glance"
                  >
                    <div className="exec-card">
                      <span className="exec-kicker">
                        {result.data.eligibility_status === 'BLOCKED'
                          ? 'Theoretical Virgin Plastic Delta (Ineligible)'
                          : 'Virgin Plastic Impact (Represented Components)'}
                      </span>
                      <div className="exec-main-value">
                        <span>
                          {format(result.data.current_virgin_pack_g, 'g/unit')} →{' '}
                          {format(result.data.candidate_virgin_pack_g, 'g/unit')}
                        </span>
                        {result.data.status === 'CALCULATED' &&
                        result.data.reduction_pct !== null ? (
                          <span
                            className={`exec-delta-badge ${
                              result.data.reduction_g !== null &&
                              result.data.reduction_g <= 0
                                ? 'nonpositive'
                                : ''
                            } ${
                              result.data.eligibility_status === 'BLOCKED'
                                ? 'theoretical'
                                : ''
                            }`}
                          >
                            {result.data.reduction_g !== null &&
                            result.data.reduction_g > 0
                              ? '↓ '
                              : result.data.reduction_g === 0
                              ? 'No change · '
                              : '↑ '}
                            {format(result.data.reduction_pct, '%')}
                            {result.data.eligibility_status === 'BLOCKED'
                              ? ' (Theoretical)'
                              : ''}
                          </span>
                        ) : (
                          <span className="exec-delta-badge insufficient">
                            Insufficient data (N/A)
                          </span>
                        )}
                      </div>
                      <span className="exec-meta">
                        Calculation: <strong>{result.data.status}</strong> ·{' '}
                        {result.data.eligibility_status === 'BLOCKED'
                          ? `Theoretical reduction: ${format(
                              result.data.reduction_g,
                              'g/unit'
                            )}`
                          : `Reduction: ${format(
                              result.data.reduction_g,
                              'g/unit'
                            )}`}
                      </span>
                    </div>

                    <div
                      className={`exec-card ${
                        result.data.eligibility_status === 'BLOCKED'
                          ? 'blocked-card'
                          : result.data.eligibility_status === 'REVIEW_REQUIRED'
                          ? 'review-card'
                          : 'eligible-card'
                      }`}
                    >
                      <span className="exec-kicker">
                        Operational Eligibility Gate
                      </span>
                      <div className="exec-main-value">
                        {result.data.eligibility_status === 'BLOCKED' && (
                          <span>⛔ BLOCKED</span>
                        )}
                        {result.data.eligibility_status ===
                          'REVIEW_REQUIRED' && <span>⚠️ REVIEW REQUIRED</span>}
                        {result.data.eligibility_status === 'ELIGIBLE' && (
                          <span>✓ ELIGIBLE</span>
                        )}
                      </div>
                      <span className="exec-meta">
                        {result.data.eligibility_status === 'BLOCKED'
                          ? 'Candidate incompatible with evaluated operating context.'
                          : result.data.eligibility_status === 'REVIEW_REQUIRED'
                          ? requirementsNotModeled
                            ? 'Operating requirements not modeled; review is required.'
                            : 'Evidence / verification insufficient to confirm operational compatibility.'
                          : 'Meets evaluated runtime constraints (not implementation approval).'}
                      </span>
                    </div>

                    <div className="exec-card">
                      <span className="exec-kicker">
                        Evidence & Epistemic State
                      </span>
                      <div className="exec-main-value">
                        <span>
                          {runtime.data.evidence.dataset_kind} ·{' '}
                          {result.data.verification_state}
                        </span>
                      </div>
                      <span className="exec-meta">
                        Derivation: <strong>{result.data.origin}</strong> ·
                        CALCULATED ≠ VERIFIED
                      </span>
                    </div>
                  </section>

                  {/* Primary Operational Eligibility Gate Banner */}
                  <section
                    id="eligibility"
                    aria-label="Operational Eligibility Status"
                  >
                    <div
                      role="status"
                      className={`eligibility-banner ${result.data.eligibility_status}`}
                    >
                      <div className="eligibility-header">
                        <span className="eligibility-title">
                          {result.data.eligibility_status === 'BLOCKED' && (
                            <span>
                              ⛔ BLOCKED — NOT ELIGIBLE FOR OPERATING CONTEXT
                            </span>
                          )}
                          {result.data.eligibility_status ===
                            'REVIEW_REQUIRED' && (
                            <span>
                              ⚠️ REVIEW REQUIRED —{' '}
                              {requirementsNotModeled
                                ? 'OPERATING REQUIREMENTS NOT MODELED'
                                : 'UNVERIFIED OPERATIONAL CONSTRAINTS'}
                            </span>
                          )}
                          {result.data.eligibility_status === 'ELIGIBLE' && (
                            <span>
                              ✓ ELIGIBLE — MEETS EVALUATED CONSTRAINTS
                            </span>
                          )}
                        </span>
                        <span className="eligibility-scope-note">
                          Bounded gate (thermal & microwave only) · Not
                          certification or rollout approval
                        </span>
                      </div>

                      {result.data.eligibility_status === 'REVIEW_REQUIRED' &&
                        requirementsNotModeled && (
                          <p>
                            No explicit thermal or microwave requirements are
                            defined for this scenario, so PackShift does not
                            infer operational eligibility. Review is required
                            before advancing the candidate.
                          </p>
                        )}

                      {result.data.eligibility_status === 'BLOCKED' && (
                        <div role="alert" className="blocking-alert-box">
                          <h4>
                            Why Blocked? Demonstrated Operational
                            Incompatibilities:
                          </h4>
                          <ul>
                            {result.data.constraints
                              .filter((c) => c.status === 'BLOCKED')
                              .map((c) => (
                                <li key={c.constraint_id}>
                                  <strong>{c.constraint_id}:</strong> {c.reason}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Environmental Impact Section with Denis's Characteristic Circles */}
                  <section
                    id="impact"
                    className="products-board"
                    aria-label="Environmental Impact Comparison"
                  >
                    <div className="section-header">
                      <div>
                        <h2 className="section-title">
                          Environmental Impact · {result.data.status}
                        </h2>
                        <small>
                          Scenario:{' '}
                          <strong>{result.data.scenario.label}</strong>
                        </small>
                      </div>
                      <div className="epistemic-badges">
                        <span className="epistemic-badge">
                          Derivation: {result.data.origin}
                        </span>
                        <span className="epistemic-badge">
                          Decision state: {result.data.verification_state}
                        </span>
                        <span className="epistemic-badge">
                          Eligibility: {result.data.eligibility_status}
                        </span>
                      </div>
                    </div>

                    {/* Denis's Characteristic Circles (.circles-list / .stat-circle) */}
                    <div className="circles-list">
                      <div className="stat-circle-wrapper">
                        <div
                          className={`stat-circle ${
                            result.data.current_virgin_pack_g === null
                              ? 'missing-ring'
                              : 'current-ring'
                          }`}
                        >
                          <span className="circle-num">
                            {formatNumberOnly(
                              result.data.current_virgin_pack_g
                            )}
                          </span>
                          <span className="circle-unit">g / unit</span>
                        </div>
                        <span className="circle-text">
                          Current virgin plastic
                        </span>
                      </div>

                      <div className="stat-circle-wrapper">
                        <div
                          className={`stat-circle ${
                            result.data.candidate_virgin_pack_g === null
                              ? 'missing-ring'
                              : 'candidate-ring'
                          }`}
                        >
                          <span className="circle-num">
                            {formatNumberOnly(
                              result.data.candidate_virgin_pack_g
                            )}
                          </span>
                          <span className="circle-unit">g / unit</span>
                        </div>
                        <span className="circle-text">
                          Candidate virgin plastic
                        </span>
                      </div>

                      <div className="stat-circle-wrapper">
                        <div
                          className={`stat-circle ${
                            result.data.reduction_g === null
                              ? 'missing-ring'
                              : result.data.eligibility_status === 'BLOCKED'
                              ? 'blocked-ring'
                              : result.data.reduction_g <= 0
                              ? 'nonpositive-ring'
                              : 'candidate-ring'
                          }`}
                        >
                          <span className="circle-num">
                            {formatNumberOnly(result.data.reduction_g)}
                          </span>
                          <span className="circle-unit">g / unit</span>
                        </div>
                        <span className="circle-text">
                          {result.data.eligibility_status === 'BLOCKED'
                            ? 'Theoretical reduction'
                            : 'Reduction'}
                        </span>
                        {result.data.eligibility_status === 'BLOCKED' && (
                          <span className="circle-subnote">
                            (Ineligible candidate)
                          </span>
                        )}
                      </div>

                      <div className="stat-circle-wrapper">
                        <div
                          style={reductionRingStyle(
                            result.data.reduction_pct,
                            result.data.eligibility_status === 'BLOCKED'
                          )}
                          className={`stat-circle ${
                            result.data.reduction_pct === null
                              ? 'missing-ring'
                              : result.data.eligibility_status === 'BLOCKED'
                              ? 'blocked-ring'
                              : result.data.reduction_pct <= 0
                              ? 'nonpositive-ring'
                              : 'candidate-ring'
                          } ${result.data.reduction_pct !== null && result.data.reduction_pct >= 0 ? 'progress-ring' : ''}`}
                        >
                          <span className="circle-num">
                            {result.data.reduction_pct === null
                              ? 'N/A'
                              : `${formatNumberOnly(
                                  result.data.reduction_pct
                                )}%`}
                          </span>
                          <span className="circle-unit">virgin delta</span>
                        </div>
                        <span className="circle-text">
                          {result.data.eligibility_status === 'BLOCKED'
                            ? 'Theoretical reduction %'
                            : 'Reduction percentage'}
                        </span>
                        {result.data.eligibility_status === 'BLOCKED' && (
                          <span className="circle-subnote">
                            (Ineligible candidate)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Accessible Definition List Summary */}
                    <dl
                      className={`metrics-dl ${
                        result.data.eligibility_status === 'BLOCKED'
                          ? 'ineligible-dimmed'
                          : ''
                      }`}
                    >
                      <div className="metric-item">
                        <dt>Current virgin plastic</dt>
                        <dd>
                          {format(result.data.current_virgin_pack_g, 'g/unit')}
                        </dd>
                      </div>
                      <div className="metric-item">
                        <dt>Candidate virgin plastic</dt>
                        <dd>
                          {format(
                            result.data.candidate_virgin_pack_g,
                            'g/unit'
                          )}
                        </dd>
                      </div>
                      <div className="metric-item">
                        <dt>
                          {result.data.eligibility_status === 'BLOCKED'
                            ? 'Theoretical reduction'
                            : 'Reduction'}
                        </dt>
                        <dd>
                          {result.data.eligibility_status === 'BLOCKED' && (
                            <small>(Ineligible) </small>
                          )}
                          {format(result.data.reduction_g, 'g/unit')}
                        </dd>
                      </div>
                      <div className="metric-item">
                        <dt>
                          {result.data.eligibility_status === 'BLOCKED'
                            ? 'Theoretical reduction percentage'
                            : 'Reduction percentage'}
                        </dt>
                        <dd>
                          {result.data.eligibility_status === 'BLOCKED' && (
                            <small>(Ineligible) </small>
                          )}
                          {format(result.data.reduction_pct, '%')}
                        </dd>
                      </div>
                    </dl>

                    {result.data.current_virgin_pack_g === 0 && (
                      <p className="disclosure-banner">
                        Percentage is N/A because current virgin plastic is
                        zero.
                      </p>
                    )}

                    {result.data.reduction_g === 0 && (
                      <p className="disclosure-banner">
                        No change — zero virgin-plastic reduction.
                      </p>
                    )}

                    {result.data.reduction_g !== null &&
                      result.data.reduction_g < 0 && (
                        <p className="disclosure-banner">
                          The candidate uses more virgin plastic than the
                          current packaging.
                        </p>
                      )}

                    {!!result.data.missing_fields.length && (
                      <div className="refusal-box" role="alert">
                        <h4>
                          Comparison refused: required numeric inputs are
                          missing (INSUFFICIENT_DATA — missing ≠ 0)
                        </h4>
                        <ul>
                          {result.data.missing_fields.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>

                  {/* INT-R5 Economic Scenario Amplifier Section */}
                  <EconomicScenarioView
                    scenarioId={result.data.scenario.id}
                    scenarioLabel={result.data.scenario.label}
                    comparison={result.data}
                  />

                  {/* Why? / Constraints & Operational Requirements Section */}
                  <section
                    id="evidence"
                    className="products-board"
                    aria-label="Operational Constraints and Evidence Findings"
                  >
                    <div className="section-header">
                      <h2 className="section-title">
                        Operational Constraints & Suitability Findings
                      </h2>
                      <span className="epistemic-badge">
                        NOT_VERIFIED ≠ FALSE · SOURCE_AVAILABLE ≠ VERIFIED
                      </span>
                    </div>

                    <OperationalRequirementsView
                      requirements={
                        result.data.scenario.operational_requirements
                      }
                    />

                    <div className="constraints-list">
                      {result.data.constraints.map((c) => (
                        <div
                          className={`constraint-card ${c.status}`}
                          key={c.constraint_id}
                        >
                          <div className="constraint-top">
                            <strong>
                              {c.status === 'BLOCKED' ? '⛔ ' : '⚠️ '}
                              {c.constraint_id} · {c.status}
                            </strong>
                            <span className="prov-chip verification">
                              {c.verification_state}
                            </span>
                          </div>
                          <p style={{ margin: 0 }}>{c.reason}</p>
                          {c.source_reference && (
                            <small>Source: {c.source_reference}</small>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Side-by-Side Current vs Candidate Packaging Inputs & Provenance */}
                  <section
                    id="packages"
                    className="products-board"
                    aria-label="Current vs Candidate Packaging Inputs and Provenance"
                  >
                    <div className="section-header">
                      <h2 className="section-title">
                        Current vs Candidate Packaging Inputs & Provenance
                      </h2>
                      <span className="epistemic-badge">
                        Dataset: {runtime.data.evidence.dataset_kind}
                      </span>
                    </div>

                    <div className="packages">
                      <PackageView
                        title="Current"
                        data={result.data.scenario.current}
                      />
                      <PackageView
                        title="Candidate"
                        data={result.data.scenario.candidate}
                        eligibilityStatus={result.data.eligibility_status}
                      />
                    </div>
                  </section>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default HomePage;
