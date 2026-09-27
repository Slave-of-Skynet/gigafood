import { useTranslation } from '../i18n';
import { useLanguage, type Language } from '../i18n';
import { useEffect, useState } from 'react';
import { format, OperationalRequirementsView, PackageView } from '../components/EvidenceDetails';
import { SelectionView } from '../components/SelectionView';
import { RecommendationView } from '../components/RecommendationView';
import { EconomicScenarioView } from '../components/EconomicScenarioView';
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

const formatNumberOnly = (value: number | null) =>
  value === null
    ? 'N/A'
    : value.toLocaleString('en-US', { maximumFractionDigits: 2 });

export function HomePage() {
  const t = useTranslation();
  const [mode, setMode] = useState<'comparison' | 'selection' | 'recommendation'>('recommendation');
  const { language: uiLang, setLanguage: setUiLang } = useLanguage();
  const [attempt, setAttempt] = useState(0);
  const [selected, setSelected] = useState('');
  const [runtime, setRuntime] = useState<
    Load<{ health: Health; evidence: Evidence }>
  >({ state: 'loading' });
  const [result, setResult] = useState<Load<Comparison>>({ state: 'loading' });



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
      <a className="skip-link" href="#main-content">{t("Skip to content")}</a>
      <header className="header-project">
        <div className="nav-bar">
          <div className="blk-lang">
            <div className="runtime-pill" hidden={mode !== 'comparison'}>
              <span
                className={`pulse-dot ${
                  runtime.state === 'ready' ? '' : 'offline'
                }`}
              />
              <span>
                {t(runtime.state === 'ready'
                  ? `A-core: ${runtime.data.health.status} · ${runtime.data.evidence.dataset_kind}`
                  : runtime.state === 'loading'
                  ? 'Checking runtime…'
                  : 'A-core unavailable')}
              </span>
            </div>

            <div className="lang-control-cluster">
              <span className="lang-scope-note">{t("Language")}</span>
              <select
                name="lang"
                aria-label={t("Language")}
                className="lang-select"
                value={uiLang}
                onChange={(e) => setUiLang(e.target.value as Language)}
              >
                <option value="en" className="lang">{t("EN")}</option>
                <option value="ru" className="lang">{t("RU")}</option>
                <option value="ro" className="lang">{t("RO")}</option>
              </select>
            </div>
          </div>

          <div className="brand-cluster">
            <a href="#overview" className="logo-img" aria-label={t("PackShift Home")}>
              <img src="/logo.png" alt={t("PackShift")} className="logo-log" />
            </a>
          </div>

          <div className="nav-bar-sect">
            <nav
              hidden={mode !== 'recommendation'}
              className="btn-nav-bar"
              aria-label={t("Recommendation Navigation")}
            >
              <a href="#overview" className="desc-nav-bar">{t("Overview")}</a>
              <a href="#journey-context" className="desc-nav-bar">{t("Choose your food")}</a>
              <a href="#decision-summary" className="desc-nav-bar">{t("Your result")}</a>
              <a href="#candidate-evaluations" className="desc-nav-bar">{t("Packaging options")}</a>
            </nav>

            <nav
              hidden={mode !== 'selection'}
              className="btn-nav-bar"
              aria-label={t("Selection Navigation")}
            >
              <a href="#overview" className="desc-nav-bar">{t("Overview")}</a>
              <a href="#portfolio-category-title" className="desc-nav-bar">{t("Portfolio & Baseline")}</a>
              <a href="#evaluated-candidates-heading" className="desc-nav-bar">{t("Packaging options")}</a>
            </nav>

            <nav
              hidden={mode !== 'comparison'}
              className="btn-nav-bar"
              aria-label={t("Primary Navigation")}
            >
              <a href="#overview" className="desc-nav-bar">{t("Overview")}</a>
              <a href="#impact" className="desc-nav-bar">{t("Impact")}</a>
              <a href="#economics" className="desc-nav-bar">{t("Economics")}</a>
              <a href="#eligibility" className="desc-nav-bar">{t("Eligibility")}</a>
              <a href="#packages" className="desc-nav-bar">{t("Packaging")}</a>
              <a href="#evidence" className="desc-nav-bar">{t("Evidence")}</a>
            </nav>
          </div>
        </div>
      </header>

      <main id="main-content" className="app-shell" tabIndex={-1}>
        <section id="overview" className="hero-card">
          <div className="hero-top">
            <div>
              <div className="hero-eyebrow">
                <span>{t("Less plastic. Clearer choices.")}</span>
              </div>
              <h1 className="hero-title">{t("PackShift")}</h1>
              <p className="hero-subtitle">{t("Find better packaging for your food")}</p>
              <p className="hero-description">{t("Choose your food and how you use the packaging. See which options are worth testing, what could reduce plastic, and what needs checking before you switch.")}</p>
            </div>
            <ol className="hero-guide" aria-label={t("How it works")}>
              <li><span aria-hidden="true">{t("01")}</span><div><strong>{t("Choose your food")}</strong><small>{t("Chicken, vegetables or a hot meal")}</small></div></li>
              <li><span aria-hidden="true">{t("02")}</span><div><strong>{t("Set the conditions")}</strong><small>{t("Pack after cooking or use in the oven")}</small></div></li>
              <li><span aria-hidden="true">{t("03")}</span><div><strong>{t("Find your next step")}</strong><small>{t("Compare options and plan the checks")}</small></div></li>
            </ol>
          </div>

          <p className="simple-scope-note">{t("A guide to your next packaging trial. Results still need food-safety, shelf-life and operational checks before use.")}</p>
        </section>

        <div className="mode-switch" role="group" aria-label={t("Product mode")}>
          <button
            type="button"
            className={`scenario-pill ${mode === 'comparison' ? 'active' : ''}`}
            aria-pressed={mode === 'comparison'}
            onClick={() => setMode('comparison')}
          >{t("Compare plastic use")}</button>
          <button
            type="button"
            className={`scenario-pill ${mode === 'selection' ? 'active' : ''}`}
            aria-pressed={mode === 'selection'}
            onClick={() => setMode('selection')}
          >{t("Browse packaging")}</button>
          <button
            type="button"
            className={`scenario-pill ${mode === 'recommendation' ? 'active' : ''}`}
            aria-pressed={mode === 'recommendation'}
            onClick={() => setMode('recommendation')}
          >{t("Find packaging")}</button>
        </div>

        <RecommendationView visible={mode === 'recommendation'} uiLang={uiLang} />
        <SelectionView visible={mode === 'selection'} />

        <div className="comparison-mode" hidden={mode !== 'comparison'}>
          {t(runtime.state === 'loading' && (
            <div className="status-panel" role="status">
              <h2>{t("Checking service and evidence…")}</h2>
              <p>{t("Loading validated packaging evidence snapshot from backend…")}</p>
            </div>
          ))}

          {t(runtime.state === 'error' && (
            <div className="status-panel error-panel" role="alert">
              <h2>{t("Service / evidence unavailable")}</h2>
              <p>{t(runtime.message)}</p>
              <button className="retry-btn" onClick={retry}>{t("Retry")}</button>
            </div>
          ))}

          {t(runtime.state === 'ready' && (
            <>
              <section
                className="control-deck"
                aria-label={t("Dataset and Scenario Controls")}
              >
                <div className="evidence-bar">
                  <div className="dataset-identity-group">
                    <span
                      className={`dataset-badge ${runtime.data.evidence.dataset_kind}`}
                    >{t("Dataset: ")}{t(runtime.data.evidence.dataset_kind)}
                    </span>
                    <span style={{ fontSize: '13.5px', fontWeight: 600 }}>{t("Service: ")}{t(runtime.data.health.status)}{t(" · Schema v")}{t(runtime.data.evidence.schema_version)}
                    </span>
                  </div>
                  <div className="disclosure-banner">
                    {t(runtime.data.evidence.disclosure)}
                  </div>
                </div>

                <div className="scenario-selector-row">
                  <label className="scenario-label">
                    <span>{t("Select Transition Scenario")}</span>
                    <select
                      className="scenario-select"
                      value={selected}
                      onChange={(event) => {
                        setResult({ state: 'loading' });
                        setSelected(event.target.value);
                      }}
                    >
                      {t(runtime.data.evidence.scenarios.map((s) => (
                        <option key={s.id} value={s.id}>
                          {t(s.label)}
                        </option>
                      )))}
                    </select>
                  </label>

                  <div
                    className="scenario-pills"
                    role="group"
                    aria-label={t("Quick scenario switcher")}
                  >
                    {t(runtime.data.evidence.scenarios.map((s) => (
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
                        {t(s.label)}
                      </button>
                    )))}
                  </div>
                </div>
              </section>

              {t(result.state === 'loading' && (
                <div className="status-panel" role="status">
                  <h2>{t("Calculating…")}</h2>
                  <p>{t("Evaluating virgin-plastic delta and operational constraints…")}</p>
                </div>
              ))}

              {t(result.state === 'error' && (
                <div className="status-panel error-panel" role="alert">
                  <h2>{t("Comparison calculation failed")}</h2>
                  <p>{t(result.message)}</p>
                  <button className="retry-btn" onClick={retry}>{t("Retry")}</button>
                </div>
              ))}

              {t(result.state === 'ready' && (
                <div
                  className="all-products-board"
                  aria-live="polite"
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                  <div className="option-class">
                    <h2 className="name-option-class">
                      {t(result.data.scenario.label)}
                    </h2>
                  </div>

                  {/* Stretch Goal: 3-Card Executive Decision Summary */}
                  <section
                    className="executive-strip"
                    aria-label={t("Decision Summary At-A-Glance")}
                  >
                    <div className="exec-card">
                      <span className="exec-kicker">
                        {t(result.data.eligibility_status === 'BLOCKED'
                          ? 'Theoretical Virgin Plastic Delta (Ineligible)'
                          : 'Virgin Plastic Impact (Represented Components)')}
                      </span>
                      <div className="exec-main-value">
                        <span>
                          {t(format(result.data.current_virgin_pack_g, 'g/unit'))}{t(" →")}{t(' ')}
                          {t(format(result.data.candidate_virgin_pack_g, 'g/unit'))}
                        </span>
                        {t(result.data.status === 'CALCULATED' &&
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
                            {t(result.data.reduction_g !== null &&
                            result.data.reduction_g > 0
                              ? '↓ '
                              : result.data.reduction_g === 0
                              ? 'No change · '
                              : '↑ ')}
                            {t(format(result.data.reduction_pct, '%'))}
                            {t(result.data.eligibility_status === 'BLOCKED'
                              ? ' (Theoretical)'
                              : '')}
                          </span>
                        ) : (
                          <span className="exec-delta-badge insufficient">{t("Insufficient data (N/A)")}</span>
                        ))}
                      </div>
                      <span className="exec-meta">{t("Calculation: ")}<strong>{t(result.data.status)}</strong>{t(" ·")}{t(' ')}
                        {t(result.data.eligibility_status === 'BLOCKED'
                          ? `Theoretical reduction: ${format(
                              result.data.reduction_g,
                              'g/unit'
                            )}`
                          : `Reduction: ${format(
                              result.data.reduction_g,
                              'g/unit'
                            )}`)}
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
                      <span className="exec-kicker">{t("Operational Eligibility Gate")}</span>
                      <div className="exec-main-value">
                        {t(result.data.eligibility_status === 'BLOCKED' && (
                          <span>{t("⛔ BLOCKED")}</span>
                        ))}
                        {t(result.data.eligibility_status ===
                          'REVIEW_REQUIRED' && <span>{t("⚠️ REVIEW REQUIRED")}</span>)}
                        {t(result.data.eligibility_status === 'ELIGIBLE' && (
                          <span>{t("✓ ELIGIBLE")}</span>
                        ))}
                      </div>
                      <span className="exec-meta">
                        {t(result.data.eligibility_status === 'BLOCKED'
                          ? 'Candidate incompatible with evaluated operating context.'
                          : result.data.eligibility_status === 'REVIEW_REQUIRED'
                          ? requirementsNotModeled
                            ? 'Operating requirements not modeled; review is required.'
                            : 'Evidence / verification insufficient to confirm operational compatibility.'
                          : 'Meets evaluated runtime constraints (not implementation approval).')}
                      </span>
                    </div>

                    <div className="exec-card">
                      <span className="exec-kicker">{t("Evidence & Epistemic State")}</span>
                      <div className="exec-main-value">
                        <span>
                          {t(runtime.data.evidence.dataset_kind)}{t(" ·")}{t(' ')}
                          {t(result.data.verification_state)}
                        </span>
                      </div>
                      <span className="exec-meta">{t("Derivation: ")}<strong>{t(result.data.origin)}</strong>{t(" · CALCULATED ≠ VERIFIED")}</span>
                    </div>
                  </section>

                  {/* Primary Operational Eligibility Gate Banner */}
                  <section
                    id="eligibility"
                    aria-label={t("Operational Eligibility Status")}
                  >
                    <div
                      role="status"
                      className={`eligibility-banner ${result.data.eligibility_status}`}
                    >
                      <div className="eligibility-header">
                        <span className="eligibility-title">
                          {t(result.data.eligibility_status === 'BLOCKED' && (
                            <span>{t("⛔ BLOCKED — NOT ELIGIBLE FOR OPERATING CONTEXT")}</span>
                          ))}
                          {t(result.data.eligibility_status ===
                            'REVIEW_REQUIRED' && (
                            <span>{t("⚠️ REVIEW REQUIRED —")}{t(' ')}
                              {t(requirementsNotModeled
                                ? 'OPERATING REQUIREMENTS NOT MODELED'
                                : 'UNVERIFIED OPERATIONAL CONSTRAINTS')}
                            </span>
                          ))}
                          {t(result.data.eligibility_status === 'ELIGIBLE' && (
                            <span>{t("✓ ELIGIBLE — MEETS EVALUATED CONSTRAINTS")}</span>
                          ))}
                        </span>
                        <span className="eligibility-scope-note">{t("Bounded gate (thermal & microwave only) · Not certification or rollout approval")}</span>
                      </div>

                      {t(result.data.eligibility_status === 'REVIEW_REQUIRED' &&
                        requirementsNotModeled && (
                          <p>{t("No explicit thermal or microwave requirements are defined for this scenario, so PackShift does not infer operational eligibility. Review is required before advancing the candidate.")}</p>
                        ))}

                      {t(result.data.eligibility_status === 'BLOCKED' && (
                        <div role="alert" className="blocking-alert-box">
                          <h4>{t("Why Blocked? Demonstrated Operational Incompatibilities:")}</h4>
                          <ul>
                            {t(result.data.constraints
                              .filter((c) => c.status === 'BLOCKED')
                              .map((c) => (
                                <li key={c.constraint_id}>
                                  <strong>{t(c.constraint_id)}{t(":")}</strong> {t(c.reason)}
                                </li>
                              )))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Environmental Impact Section with Denis's Characteristic Circles */}
                  <section
                    id="impact"
                    className="products-board"
                    aria-label={t("Environmental Impact Comparison")}
                  >
                    <div className="section-header">
                      <div>
                        <h2 className="section-title">{t("Environmental Impact · ")}{t(result.data.status)}
                        </h2>
                        <small>{t("Scenario:")}{t(' ')}
                          <strong>{t(result.data.scenario.label)}</strong>
                        </small>
                      </div>
                      <div className="epistemic-badges">
                        <span className="epistemic-badge">{t("Derivation: ")}{t(result.data.origin)}
                        </span>
                        <span className="epistemic-badge">{t("Decision state: ")}{t(result.data.verification_state)}
                        </span>
                        <span className="epistemic-badge">{t("Eligibility: ")}{t(result.data.eligibility_status)}
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
                            {t(formatNumberOnly(
                              result.data.current_virgin_pack_g
                            ))}
                          </span>
                          <span className="circle-unit">{t("g / unit")}</span>
                        </div>
                        <span className="circle-text">{t("Current virgin plastic")}</span>
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
                            {t(formatNumberOnly(
                              result.data.candidate_virgin_pack_g
                            ))}
                          </span>
                          <span className="circle-unit">{t("g / unit")}</span>
                        </div>
                        <span className="circle-text">{t("Candidate virgin plastic")}</span>
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
                            {t(formatNumberOnly(result.data.reduction_g))}
                          </span>
                          <span className="circle-unit">{t("g / unit")}</span>
                        </div>
                        <span className="circle-text">
                          {t(result.data.eligibility_status === 'BLOCKED'
                            ? 'Theoretical reduction'
                            : 'Reduction')}
                        </span>
                        {t(result.data.eligibility_status === 'BLOCKED' && (
                          <span className="circle-subnote">{t("(Ineligible candidate)")}</span>
                        ))}
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
                            {t(result.data.reduction_pct === null
                              ? 'N/A'
                              : `${formatNumberOnly(
                                  result.data.reduction_pct
                                )}%`)}
                          </span>
                          <span className="circle-unit">{t("virgin delta")}</span>
                        </div>
                        <span className="circle-text">
                          {t(result.data.eligibility_status === 'BLOCKED'
                            ? 'Theoretical reduction %'
                            : 'Reduction percentage')}
                        </span>
                        {t(result.data.eligibility_status === 'BLOCKED' && (
                          <span className="circle-subnote">{t("(Ineligible candidate)")}</span>
                        ))}
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
                        <dt>{t("Current virgin plastic")}</dt>
                        <dd>
                          {t(format(result.data.current_virgin_pack_g, 'g/unit'))}
                        </dd>
                      </div>
                      <div className="metric-item">
                        <dt>{t("Candidate virgin plastic")}</dt>
                        <dd>
                          {t(format(
                            result.data.candidate_virgin_pack_g,
                            'g/unit'
                          ))}
                        </dd>
                      </div>
                      <div className="metric-item">
                        <dt>
                          {t(result.data.eligibility_status === 'BLOCKED'
                            ? 'Theoretical reduction'
                            : 'Reduction')}
                        </dt>
                        <dd>
                          {t(result.data.eligibility_status === 'BLOCKED' && (
                            <small>{t("(Ineligible) ")}</small>
                          ))}
                          {t(format(result.data.reduction_g, 'g/unit'))}
                        </dd>
                      </div>
                      <div className="metric-item">
                        <dt>
                          {t(result.data.eligibility_status === 'BLOCKED'
                            ? 'Theoretical reduction percentage'
                            : 'Reduction percentage')}
                        </dt>
                        <dd>
                          {t(result.data.eligibility_status === 'BLOCKED' && (
                            <small>{t("(Ineligible) ")}</small>
                          ))}
                          {t(format(result.data.reduction_pct, '%'))}
                        </dd>
                      </div>
                    </dl>

                    {t(result.data.current_virgin_pack_g === 0 && (
                      <p className="disclosure-banner">{t("Percentage is N/A because current virgin plastic is zero.")}</p>
                    ))}

                    {t(result.data.reduction_g === 0 && (
                      <p className="disclosure-banner">{t("No change — zero virgin-plastic reduction.")}</p>
                    ))}

                    {t(result.data.reduction_g !== null &&
                      result.data.reduction_g < 0 && (
                        <p className="disclosure-banner">{t("The candidate uses more virgin plastic than the current packaging.")}</p>
                      ))}

                    {t(!!result.data.missing_fields.length && (
                      <div className="refusal-box" role="alert">
                        <h4>{t("Comparison refused: required numeric inputs are missing (INSUFFICIENT_DATA — missing ≠ 0)")}</h4>
                        <ul>
                          {t(result.data.missing_fields.map((f) => (
                            <li key={f}>{t(f)}</li>
                          )))}
                        </ul>
                      </div>
                    ))}
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
                    aria-label={t("Operational Constraints and Evidence Findings")}
                  >
                    <div className="section-header">
                      <h2 className="section-title">{t("Operational Constraints & Suitability Findings")}</h2>
                      <span className="epistemic-badge">{t("NOT_VERIFIED ≠ FALSE · SOURCE_AVAILABLE ≠ VERIFIED")}</span>
                    </div>

                    <OperationalRequirementsView
                      requirements={
                        result.data.scenario.operational_requirements
                      }
                    />

                    <div className="constraints-list">
                      {t(result.data.constraints.map((c) => (
                        <div
                          className={`constraint-card ${c.status}`}
                          key={c.constraint_id}
                        >
                          <div className="constraint-top">
                            <strong>
                              {t(c.status === 'BLOCKED' ? '⛔ ' : '⚠️ ')}
                              {t(c.constraint_id)}{t(" · ")}{t(c.status)}
                            </strong>
                            <span className="prov-chip verification">
                              {t(c.verification_state)}
                            </span>
                          </div>
                          <p style={{ margin: 0 }}>{t(c.reason)}</p>
                          {t(c.source_reference && (
                            <small>{t("Source: ")}{t(c.source_reference)}</small>
                          ))}
                        </div>
                      )))}
                    </div>
                  </section>

                  {/* Side-by-Side Current vs Candidate Packaging Inputs & Provenance */}
                  <section
                    id="packages"
                    className="products-board"
                    aria-label={t("Current vs Candidate Packaging Inputs and Provenance")}
                  >
                    <div className="section-header">
                      <h2 className="section-title">{t("Current vs Candidate Packaging Inputs & Provenance")}</h2>
                      <span className="epistemic-badge">{t("Dataset: ")}{t(runtime.data.evidence.dataset_kind)}
                      </span>
                    </div>

                    <div className="packages">
                      <PackageView
                        title={t("Current")}
                        data={result.data.scenario.current}
                      />
                      <PackageView
                        title={t("Candidate")}
                        data={result.data.scenario.candidate}
                        eligibilityStatus={result.data.eligibility_status}
                      />
                    </div>
                  </section>
                </div>
              ))}
            </>
          ))}
        </div>
      </main>
    </>
  );
}
export default HomePage;
