import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../api/client';
import type {
  CandidateAssessment,
  ComparabilityRating,
  ComponentBoundary,
  EligibilityStatus,
  PortfolioSummary,
  RecycledContentPointValueStatus,
  SelectionMetadata,
  SelectionRequest,
  SelectionResponse,
} from '../api/contracts';
import { format, OperationalRequirementsView, PackageView } from './EvidenceDetails';
import { ProductVisual } from './ProductVisual';
import { reductionRingStyle } from './metricRing';

type Load<T> =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'ready'; data: T };

const formatNumberOnly = (value: number | null) =>
  value === null
    ? 'N/A'
    : value.toLocaleString('en-US', { maximumFractionDigits: 2 });
type CalculationGapReason =
  | 'BOUNDARY_MISMATCH'
  | 'MISSING_MASS'
  | 'MISSING_OR_NON_POINT_PCR'
  | 'GENERIC_INCOMPLETE';

// Presentation of the backend delta's sign only; all arithmetic stays on the server.
function deltaMeaning(
  value: number | null,
  gapReason?: CalculationGapReason | null
) {
  if (value === null) {
    if (gapReason === 'BOUNDARY_MISMATCH') {
      return 'Cannot calculate delta — package scopes differ (delta N/A)';
    }
    if (gapReason === 'MISSING_MASS') {
      return 'Cannot calculate yet — required package mass missing (delta N/A)';
    }
    return 'Cannot calculate yet — required numeric evidence missing (delta N/A)';
  }
  if (value > 0) return 'Reduces virgin plastic';
  if (value === 0) return 'No change — zero virgin-plastic reduction';
  return 'Increases virgin-plastic use';
}

function componentBoundaryLabel(boundary: ComponentBoundary) {
  switch (boundary) {
    case 'TRAY_BODY_ONLY':
      return 'Tray body only';
    case 'BODY_AND_FILM':
      return 'Container body and film';
    case 'HINGED_COMPLETE_PACK':
      return 'Complete hinged pack';
    case 'BOTTLE_AND_CLOSURE':
      return 'Bottle and closure';
    case 'CUSTOM':
      return 'Custom component boundary';
  }
}

function recycledEvidenceLabel(status: RecycledContentPointValueStatus) {
  switch (status) {
    case 'EXACT_POINT_VALUE':
      return 'Exact numeric value available';
    case 'NON_POINT_VALUE':
      return 'Non-exact claim only';
    case 'UNSTATED':
      return 'Numeric value not stated';
  }
}

function recycledEvidenceExplanation(status: RecycledContentPointValueStatus) {
  switch (status) {
    case 'EXACT_POINT_VALUE':
      return 'A specific numeric recycled-content fraction is stated for the represented component.';
    case 'NON_POINT_VALUE':
      return 'Only a range or marketing ceiling (such as “up to 70%”) is available. Because an “up to” claim is not a precise point value, PackShift refuses to guess a number for the deterministic calculation.';
    case 'UNSTATED':
      return 'The required numeric recycled-content evidence is not available in the source documentation. PackShift never treats missing recycled content as 0%.';
  }
}

function comparabilityLabel(rating: ComparabilityRating) {
  switch (rating) {
    case 'STRONG':
      return 'Strong comparison';
    case 'BOUNDED_WITH_QUALIFIER':
      return 'Bounded comparison';
    case 'ASYMMETRIC_BOUNDARY':
      return 'Different component boundaries';
    case 'NOT_COMPARABLE':
      return 'Not comparable';
  }
}

function eligibilityHeadline(status: EligibilityStatus) {
  switch (status) {
    case 'BLOCKED':
      return '⛔ Blocked — incompatible with operating requirements';
    case 'REVIEW_REQUIRED':
      return '⚠️ Review required';
    case 'ELIGIBLE':
      return '✓ Eligible under modeled requirements';
  }
}

function detectCalculationGapReason(
  data: CandidateAssessment
): CalculationGapReason | null {
  const { calculation: calc, comparability, metadata } = data;
  if (calc.status === 'CALCULATED') {
    return null;
  }

  // Precedence 1 — Component boundary mismatch
  if (
    calc.missing_fields.includes('component_boundary_mismatch') ||
    !comparability.boundary_match ||
    comparability.rating === 'ASYMMETRIC_BOUNDARY'
  ) {
    return 'BOUNDARY_MISMATCH';
  }

  // Precedence 2 — Missing physical package mass/specification
  if (calc.missing_fields.some((f) => f.includes('plastic_mass_g'))) {
    return 'MISSING_MASS';
  }

  // Precedence 3 — Missing/non-point recycled-content evidence
  if (
    calc.missing_fields.some((f) => f.includes('recycled_content_fraction')) ||
    metadata.recycled_content_point_value_status === 'NON_POINT_VALUE' ||
    metadata.recycled_content_point_value_status === 'UNSTATED'
  ) {
    return 'MISSING_OR_NON_POINT_PCR';
  }

  // Precedence 4 — Generic conservative fallback
  return 'GENERIC_INCOMPLETE';
}

function missingMassScope(
  missingFields: string[]
): 'baseline' | 'candidate' | 'both' | 'general' {
  const hasBaseline = missingFields.some(
    (f) => f.startsWith('baseline.') && f.includes('plastic_mass_g')
  );
  const hasCandidate = missingFields.some(
    (f) => f.startsWith('candidate.') && f.includes('plastic_mass_g')
  );
  if (hasBaseline && hasCandidate) return 'both';
  if (hasBaseline) return 'baseline';
  if (hasCandidate) return 'candidate';
  return 'general';
}

function calculationSummaryText(data: CandidateAssessment): string {
  const { calculation: calc } = data;
  if (calc.status === 'CALCULATED') {
    return calc.verification_state === 'INDICATIVE'
      ? 'Calculated from available numeric evidence (indicative arithmetic — not implementation approval or verified operational evidence)'
      : 'Calculated from available numeric evidence';
  }

  const reason = detectCalculationGapReason(data);
  switch (reason) {
    case 'BOUNDARY_MISMATCH':
      return 'Calculation withheld — baseline and candidate represent different component boundaries (scopes not comparable)';
    case 'MISSING_MASS': {
      const massScope = missingMassScope(calc.missing_fields);
      if (massScope === 'candidate') {
        return 'Calculation withheld — candidate package mass is missing (missing ≠ 0)';
      }
      if (massScope === 'baseline') {
        return 'Calculation withheld — baseline package mass is missing (missing ≠ 0)';
      }
      return 'Calculation withheld — required package mass is missing (missing ≠ 0)';
    }
    case 'MISSING_OR_NON_POINT_PCR':
      return 'Calculation withheld — exact numeric evidence is missing (missing ≠ 0)';
    case 'GENERIC_INCOMPLETE':
    default:
      return 'Calculation withheld — required evidence for comparable transition is incomplete (missing ≠ 0)';
  }
}

function calculationGapExplanation(data: CandidateAssessment): string {
  const { calculation: calc, metadata } = data;
  if (calc.status === 'CALCULATED') {
    return 'The arithmetic is computed from represented component inputs, but this is not implementation approval or fully verified operational evidence.';
  }

  const reason = detectCalculationGapReason(data);
  switch (reason) {
    case 'BOUNDARY_MISMATCH':
      return 'Transition delta is withheld because the baseline and candidate represent different component boundaries. PackShift does not subtract non-equivalent package scopes.';
    case 'MISSING_MASS': {
      const massScope = missingMassScope(calc.missing_fields);
      if (massScope === 'candidate') {
        return 'Calculation is withheld because candidate package mass specification is missing. PackShift never assumes missing data equals zero.';
      }
      if (massScope === 'baseline') {
        return 'Calculation is withheld because baseline package mass specification is missing. PackShift never assumes missing data equals zero.';
      }
      if (massScope === 'both') {
        return 'Calculation is withheld because required baseline and candidate package mass specifications are missing. PackShift never assumes missing data equals zero.';
      }
      return 'Calculation is withheld because a required package/component mass is missing. PackShift never assumes missing data equals zero.';
    }
    case 'MISSING_OR_NON_POINT_PCR':
      if (metadata.recycled_content_point_value_status === 'NON_POINT_VALUE') {
        return 'Only a range or marketing ceiling such as “up to 70%” is available. That is not an exact point value, so PackShift refuses to guess a deterministic number (missing ≠ 0).';
      }
      if (metadata.recycled_content_point_value_status === 'UNSTATED') {
        return 'The required numeric recycled-content value is not stated. Missing evidence is not treated as 0%.';
      }
      return 'Calculation is withheld because required recycled-content evidence is missing. PackShift never treats missing recycled content as 0%.';
    case 'GENERIC_INCOMPLETE':
    default:
      return 'Calculation is withheld because required evidence for a comparable numeric transition is incomplete. PackShift never assumes missing data equals zero.';
  }
}

function Metadata({ data }: { data: SelectionMetadata }) {
  return (
    <dl className="selection-metadata">
      <div>
        <dt>Component boundary</dt>
        <dd>
          {componentBoundaryLabel(data.component_boundary)}{' '}
          <span className="tech-enum-inline">({data.component_boundary})</span>
        </dd>
      </div>
      <div>
        <dt>Recycled-content evidence</dt>
        <dd>
          {recycledEvidenceLabel(data.recycled_content_point_value_status)}{' '}
          <span className="tech-enum-inline">
            ({data.recycled_content_point_value_status})
          </span>
        </dd>
      </div>
      <div>
        <dt>Evidence scope</dt>
        <dd>{data.recycled_content_scope ?? 'Unknown'}</dd>
      </div>
      <div>
        <dt>Evidence date</dt>
        <dd>{data.evidence_date ?? 'Unknown'}</dd>
      </div>
    </dl>
  );
}

function CandidateCard({ data }: { data: CandidateAssessment }) {
  const { calculation: calc, eligibility, annual_impact: annual } = data;
  const gapReason = detectCalculationGapReason(data);
  const primaryComponentsSummary = data.candidate.components
    .map((c) => `${c.id}: ${c.material}`)
    .join(' · ');

  return (
    <article
      className={`products-board selection-candidate candidate-${eligibility.status}`}
      aria-label={data.candidate.label}
    >
      {/* Reconciled Denis Product Card Layout: .picture-product left + .desc-product right */}
      <div className="candidate-showcase-row">
        <ProductVisual
          pkg={data.candidate}
          boundary={data.metadata.component_boundary}
          roleLabel="Candidate Option"
          eligibilityStatus={eligibility.status}
        />

        <div className="desc-product">
          <div className="section-header">
            <div>
              <span className="candidate-kicker">
                What is this packaging option? · ID: {data.candidate.id}
              </span>
              <h3 className="name-product section-title">{data.candidate.label}</h3>
            </div>
            <div className="epistemic-badges">
              <span className="epistemic-badge">
                {componentBoundaryLabel(data.metadata.component_boundary)} ·{' '}
                <small>{data.metadata.component_boundary}</small>
              </span>
              <span className={`eligibility-status-pill ${eligibility.status}`}>
                {eligibility.status === 'BLOCKED'
                  ? '⛔ BLOCKED'
                  : eligibility.status === 'REVIEW_REQUIRED'
                  ? '⚠️ Review required'
                  : '✓ Eligible'}
              </span>
            </div>
          </div>

          <p className="info-product">
            <strong>Use context:</strong> {data.candidate.use_context ?? 'Not specified'} ·{' '}
            <strong>Represented components:</strong> {primaryComponentsSummary} ·{' '}
            <strong>Recycled-content evidence:</strong>{' '}
            {recycledEvidenceLabel(data.metadata.recycled_content_point_value_status)}{' '}
            <span className="tech-enum-inline">
              ({data.metadata.recycled_content_point_value_status})
            </span>
          </p>

          <div className="option-product">
            <div className="comparison-heading-group">
              <h4 className="table-desc">Virgin-plastic comparison</h4>
              <p className="comparison-human-sub">
                {calculationSummaryText(data)}
              </p>
              <small className="tech-enum-trace">
                Technical state: {calc.status} · {calc.verification_state}
              </small>
            </div>

            <div className="circles-list">
              <div className="stat-circle-wrapper">
                <div
                  className={`stat-circle ${
                    calc.current_virgin_pack_g === null ? 'missing-ring' : 'current-ring'
                  }`}
                >
                  <span className="circle-num">
                    {formatNumberOnly(calc.current_virgin_pack_g)}
                  </span>
                  <span className="circle-unit">g / unit</span>
                </div>
                <span className="circle-text">Baseline virgin</span>
              </div>

              <div className="stat-circle-wrapper">
                <div
                  className={`stat-circle ${
                    calc.candidate_virgin_pack_g === null
                      ? 'missing-ring'
                      : 'candidate-ring'
                  }`}
                >
                  <span className="circle-num">
                    {formatNumberOnly(calc.candidate_virgin_pack_g)}
                  </span>
                  <span className="circle-unit">
                    {calc.candidate_virgin_pack_g === null ? 'missing ≠ 0' : 'g / unit'}
                  </span>
                </div>
                <span className="circle-text">Candidate virgin</span>
              </div>

              <div className="stat-circle-wrapper">
                <div
                  className={`stat-circle ${
                    calc.reduction_g === null
                      ? 'missing-ring'
                      : eligibility.status === 'BLOCKED'
                      ? 'blocked-ring'
                      : calc.reduction_g <= 0
                      ? 'nonpositive-ring'
                      : 'candidate-ring'
                  }`}
                >
                  <span className="circle-num">{formatNumberOnly(calc.reduction_g)}</span>
                  <span className="circle-unit">
                    {calc.reduction_g === null ? 'delta N/A' : 'g / unit'}
                  </span>
                </div>
                <span className="circle-text">Signed reduction</span>
              </div>

              <div className="stat-circle-wrapper">
                <div
                  style={reductionRingStyle(calc.reduction_pct, eligibility.status === 'BLOCKED')}
                  className={`stat-circle ${
                    calc.reduction_pct === null
                      ? 'missing-ring'
                      : eligibility.status === 'BLOCKED'
                      ? 'blocked-ring'
                      : calc.reduction_pct <= 0
                      ? 'nonpositive-ring'
                      : 'candidate-ring'
                  } ${calc.reduction_pct !== null && calc.reduction_pct >= 0 ? 'progress-ring' : ''}`}
                >
                  <span className="circle-num">
                    {calc.reduction_pct === null
                      ? 'N/A'
                      : `${formatNumberOnly(calc.reduction_pct)}%`}
                  </span>
                  <span className="circle-unit">virgin delta</span>
                </div>
                <span className="circle-text">Reduction %</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Axis Judge Decision Grid: Environmental Result, Operational Eligibility, Next Action */}
      <div className="selection-axes">
        <section className="exec-card selection-environment">
          <span className="judge-question-kicker">Does it reduce virgin plastic?</span>
          <h4>Environmental result</h4>
          <strong>{deltaMeaning(calc.reduction_g, gapReason)}</strong>
          <p className="axis-human-note">
            {calculationGapExplanation(data)}
          </p>
          <dl className="selection-metadata">
            <div>
              <dt>Current virgin plastic</dt>
              <dd>{format(calc.current_virgin_pack_g, 'g/unit')}</dd>
            </div>
            <div>
              <dt>Candidate virgin plastic</dt>
              <dd>{format(calc.candidate_virgin_pack_g, 'g/unit')}</dd>
            </div>
            <div>
              <dt>Signed reduction</dt>
              <dd>
                {format(calc.reduction_g, 'g/unit')} · {format(calc.reduction_pct, '%')}
              </dd>
            </div>
          </dl>
          <small className="tech-enum-trace">
            Represented components only · CALCULATED ≠ VERIFIED · Technical state:{' '}
            {calc.status} · {calc.verification_state}
          </small>
        </section>

        <section className={`eligibility-banner ${eligibility.status}`}>
          <span className="judge-question-kicker">
            Can we use it in this operating context?
          </span>
          <h4>Operational eligibility</h4>
          <strong>{eligibilityHeadline(eligibility.status)}</strong>
          <p>
            {eligibility.status === 'BLOCKED'
              ? 'Incompatible with the stated modeled operating requirements. Environmental benefit does not override this operational block.'
              : eligibility.status === 'REVIEW_REQUIRED'
              ? 'Evidence or human verification is required before confirming compatibility; an unknown capability is not proven incompatibility.'
              : 'Passes the bounded evaluated thermal and microwave requirements. Still requires human QA and food-safety review.'}
          </p>
          <small className="tech-enum-trace">
            Technical state: {eligibility.status}
          </small>
        </section>

        <section className="exec-card next-action">
          <span className="judge-question-kicker">
            What should Profi investigate next?
          </span>
          <h4>Next action</h4>
          <strong>{data.next_action.summary}</strong>
          <p>{data.next_action.details}</p>
          <small className="tech-enum-trace">
            Action code: {data.next_action.action_code}
          </small>
        </section>
      </div>

      <section className="comparability-panel" aria-label="Comparability">
        <span className="judge-question-kicker">Comparison scope</span>
        <h4>{comparabilityLabel(data.comparability.rating)}</h4>
        {data.comparability.notes.map((note, i) => (
          <p key={i}>{note}</p>
        ))}
        <small className="tech-enum-trace">
          Technical state: {data.comparability.rating}
        </small>
      </section>

      {calc.status === 'INSUFFICIENT_DATA' || calc.missing_fields.length > 0 ? (
        <div className="selection-evidence-gap" role="alert">
          <span className="judge-question-kicker">What evidence is missing?</span>
          <strong>Evidence required — missing ≠ 0</strong>
          <p>
            <strong>Why no number is shown:</strong>{' '}
            {calculationGapExplanation(data)}
          </p>
          {calc.missing_fields.length > 0 && (
            <ul>
              {calc.missing_fields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          )}
          <small className="tech-enum-trace">
            Recycled-content evidence:{' '}
            {recycledEvidenceLabel(
              data.metadata.recycled_content_point_value_status
            )}{' '}
            ({data.metadata.recycled_content_point_value_status})
          </small>
        </div>
      ) : (
        <div className="comparability-panel">
          <span className="judge-question-kicker">What evidence is missing?</span>
          <strong>No missing numeric fields for represented components</strong>
          <p>
            {recycledEvidenceExplanation(
              data.metadata.recycled_content_point_value_status
            )}{' '}
            The arithmetic is computed from represented inputs, but this is not
            implementation approval (CALCULATED ≠ VERIFIED).
          </p>
          <small className="tech-enum-trace">
            Recycled-content evidence:{' '}
            {recycledEvidenceLabel(
              data.metadata.recycled_content_point_value_status
            )}{' '}
            ({data.metadata.recycled_content_point_value_status}) · Verification
            state: {calc.verification_state}
          </small>
        </div>
      )}

      <div className="constraints-list">
        {eligibility.constraints.map((finding) => (
          <div
            key={finding.constraint_id}
            className={`constraint-card ${finding.status}`}
          >
            <strong>
              {finding.status === 'BLOCKED' ? '⛔ Blocked' : '⚠️ Review required'} ·{' '}
              {finding.constraint_id}
            </strong>
            <p>{finding.reason}</p>
            <small className="tech-enum-trace">
              Technical state: {finding.status} · {finding.verification_state}
              {finding.source_reference ? ` · Source: ${finding.source_reference}` : ''}
            </small>
          </div>
        ))}
      </div>

      {annual && (
        <section
          className={`annual-impact ${annual.is_actionable ? '' : 'non-actionable'}`}
          aria-label="Hypothetical annual impact"
        >
          <h4>
            Hypothetical annual impact ·{' '}
            {annual.status === 'CALCULATED'
              ? 'Calculated from hypothetical volume'
              : gapReason === 'BOUNDARY_MISMATCH'
              ? 'Calculation withheld (scopes differ)'
              : 'Calculation withheld (missing evidence)'}
          </h4>
          <strong>
            {annual.is_actionable
              ? 'Available for scenario review — not implementation approval'
              : 'THEORETICAL / NON-ACTIONABLE'}
          </strong>
          <p>{deltaMeaning(annual.annual_reduction_kg, gapReason)}</p>
          <dl className="selection-metadata">
            <div>
              <dt>User-supplied annual units</dt>
              <dd>{format(annual.annual_units, '')}</dd>
            </div>
            <div>
              <dt>Annual current virgin plastic</dt>
              <dd>{format(annual.annual_current_virgin_kg, 'kg')}</dd>
            </div>
            <div>
              <dt>Annual candidate virgin plastic</dt>
              <dd>{format(annual.annual_candidate_virgin_kg, 'kg')}</dd>
            </div>
            <div>
              <dt>Signed annual reduction</dt>
              <dd>{format(annual.annual_reduction_kg, 'kg')}</dd>
            </div>
            <div>
              <dt>Actionable under modeled context</dt>
              <dd>{String(annual.is_actionable)}</dd>
            </div>
          </dl>
          <p className="disclosure-banner">{annual.disclosure}</p>
          <small className="tech-enum-trace">
            Technical state: {annual.status}
          </small>
        </section>
      )}

      <details>
        <summary>Technical evidence and provenance</summary>
        <Metadata data={data.metadata} />
        <PackageView
          title="Candidate"
          data={data.candidate}
          eligibilityStatus={eligibility.status}
        />
      </details>
    </article>
  );
}

export function SelectionView({ visible }: { visible: boolean }) {
  const [attempt, setAttempt] = useState(0);
  const [portfolios, setPortfolios] = useState<Load<PortfolioSummary[]>>({
    state: 'loading',
  });
  const [selected, setSelected] = useState('');
  const [volume, setVolume] = useState('');
  const [context, setContext] = useState('');
  const [temperature, setTemperature] = useState('');
  const [microwave, setMicrowave] = useState('default');
  const [submitted, setSubmitted] = useState<SelectionRequest | null>(null);
  const [validation, setValidation] = useState('');
  const [evaluationAttempt, setEvaluationAttempt] = useState(0);
  const [result, setResult] = useState<Load<SelectionResponse>>({
    state: 'loading',
  });

  useEffect(() => {
    const controller = new AbortController();
    setPortfolios({ state: 'loading' });
    api
      .portfolios(controller.signal)
      .then((data) => {
        if (!Array.isArray(data) || !data.length)
          throw new Error('No portfolios available');
        if (controller.signal.aborted) return;
        setSelected((old) => (data.some((p) => p.id === old) ? old : data[0].id));
        setPortfolios({ state: 'ready', data });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setPortfolios({ state: 'error', message: String(error) });
      });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (portfolios.state !== 'ready' || !selected) return;
    const controller = new AbortController();
    setResult({ state: 'loading' });
    const request =
      submitted === null
        ? api.portfolio(selected, controller.signal)
        : api.evaluatePortfolio(selected, submitted, controller.signal);
    request
      .then((data) => {
        if (!controller.signal.aborted) setResult({ state: 'ready', data });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setResult({ state: 'error', message: String(error) });
      });
    return () => controller.abort();
  }, [portfolios, selected, submitted, evaluationAttempt]);

  function evaluate(event: FormEvent) {
    event.preventDefault();
    const units = Number(volume);
    if (volume.trim() && (!Number.isSafeInteger(units) || units <= 0)) {
      setValidation(
        'Enter a positive whole number within the supported integer range.'
      );
      return;
    }
    const degrees = Number(temperature);
    if (temperature.trim() && !Number.isFinite(degrees)) {
      setValidation(
        'Enter a finite numeric temperature in °C, or leave it blank for the portfolio default.'
      );
      return;
    }
    const request: SelectionRequest = {};
    if (context.trim()) request.use_context = context.trim();
    if (temperature.trim()) request.required_max_temperature_c = degrees;
    if (microwave !== 'default')
      request.microwave_required = microwave === 'required';
    if (volume.trim()) request.annual_units = units;
    setValidation('');
    setResult({ state: 'loading' });
    setSubmitted(request);
    setEvaluationAttempt((n) => n + 1);
  }

  function resetScenario() {
    setContext('');
    setTemperature('');
    setMicrowave('default');
    setVolume('');
    setSubmitted(null);
    setValidation('');
    setResult({ state: 'loading' });
    setEvaluationAttempt((n) => n + 1);
  }

  return (
    <>
      <div className="runtime-pill selection-availability" role="status">
        {portfolios.state === 'loading'
          ? 'Selection: checking portfolios…'
          : portfolios.state === 'error'
          ? 'Selection unavailable'
          : result.state === 'error'
          ? 'Selection: evaluation unavailable'
          : result.state === 'loading'
          ? 'Selection: portfolios loaded · evaluating…'
          : `Selection: READY · ${portfolios.data.length} portfolio(s)`}
      </div>

      <div className="selection-mode" hidden={!visible}>
        {portfolios.state === 'loading' && (
          <div className="status-panel">Loading Selection portfolios…</div>
        )}

        {portfolios.state === 'error' && (
          <div className="status-panel error-panel" role="alert">
            <h2>Selection unavailable</h2>
            <p>{portfolios.message}</p>
            <p>
              Comparison has its own evidence availability. No fallback portfolio
              is used.
            </p>
            <button
              className="retry-btn"
              onClick={() => setAttempt((n) => n + 1)}
            >
              Retry Selection
            </button>
          </div>
        )}

        {portfolios.state === 'ready' && (
          <>
            <section className="control-deck" aria-label="Portfolio controls">
              <label className="scenario-label">
                Select portfolio
                <select
                  className="scenario-select"
                  value={selected}
                  onChange={(event) => {
                    setResult({ state: 'loading' });
                    setSelected(event.target.value);
                    resetScenario();
                  }}
                >
                  {portfolios.data.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label} · {p.candidate_count} candidates
                    </option>
                  ))}
                </select>
              </label>

              <form onSubmit={evaluate} className="scenario-form" noValidate>
                <div className="scenario-form-heading">
                  <h3>User-supplied scenario</h3>
                  <p>
                    Not a verified Profi requirement. Blank fields and “Use
                    portfolio default” inherit the committed portfolio
                    assumptions.
                  </p>
                </div>

                <label className="scenario-label" htmlFor="scenario-context">
                  Scenario notes (not evaluated)
                  <input
                    id="scenario-context"
                    value={context}
                    onChange={(event) => setContext(event.target.value)}
                    placeholder="Optional context notes (not evaluated)"
                    aria-describedby="context-help"
                  />
                  <small id="context-help">
                    Optional notes for this scenario. These notes are shown for
                    context only. Eligibility is evaluated from the structured
                    temperature and microwave fields below.
                  </small>
                </label>

                <label
                  className="scenario-label"
                  htmlFor="scenario-temperature"
                >
                  Required maximum temperature (°C)
                  <input
                    id="scenario-temperature"
                    type="text"
                    inputMode="decimal"
                    value={temperature}
                    onChange={(event) => setTemperature(event.target.value)}
                    placeholder="Optional · e.g. 60"
                  />
                </label>

                <label className="scenario-label" htmlFor="scenario-microwave">
                  Microwave reheating
                  <select
                    id="scenario-microwave"
                    className="scenario-select"
                    value={microwave}
                    onChange={(event) => setMicrowave(event.target.value)}
                  >
                    <option value="default">Use portfolio default</option>
                    <option value="required">Required</option>
                    <option value="not-required">
                      Not required in this scenario
                    </option>
                  </select>
                </label>

                <label className="scenario-label" htmlFor="annual-units">
                  Hypothetical annual units
                  <input
                    id="annual-units"
                    type="text"
                    inputMode="numeric"
                    value={volume}
                    onChange={(event) => setVolume(event.target.value)}
                    placeholder="Optional · e.g. 100000"
                    aria-describedby="volume-disclosure"
                  />
                  <small id="volume-disclosure">
                    User-supplied hypothetical volume. Not actual Profi volume
                    or measured impact. Leave blank for per-unit assessment.
                  </small>
                </label>

                <div className="scenario-actions">
                  <button type="submit" className="scenario-pill">
                    Evaluate scenario
                  </button>
                  <button
                    type="button"
                    className="scenario-pill"
                    onClick={resetScenario}
                  >
                    Reset to portfolio defaults
                  </button>
                </div>
              </form>

              {validation && <p role="alert">{validation}</p>}
            </section>

            {result.state === 'loading' && (
              <div className="status-panel" role="status">
                Evaluating portfolio…
              </div>
            )}

            {result.state === 'error' && (
              <div className="status-panel error-panel" role="alert">
                <h2>Selection evaluation failed</h2>
                <p>{result.message}</p>
                <button
                  className="retry-btn"
                  onClick={() => setEvaluationAttempt((n) => n + 1)}
                >
                  Retry evaluation
                </button>
              </div>
            )}

            {result.state === 'ready' && (
              <div
                className="selection-results all-products-board"
                aria-live="polite"
              >
                {/* Denis Category Section Heading with 50% underline (.option-class / .name-option-class) */}
                <div className="option-class">
                  <h2 className="name-option-class" id="portfolio-category-title">
                    {result.data.label}
                  </h2>
                </div>

                <section
                  className="products-board"
                  aria-label="Portfolio assessment"
                >
                  <div className="section-header">
                    <h3 className="section-title">
                      Portfolio Decision Context & Baseline
                    </h3>
                    <span className={`dataset-badge ${result.data.dataset_kind}`}>
                      Dataset: {result.data.dataset_kind}
                    </span>
                  </div>

                  <p className="disclosure-banner">{result.data.disclosure}</p>

                  {/* UX-9: First-screen narrative hierarchy — What PackShift concluded first */}
                  <div className="selection-verdict">
                    <strong>What PackShift concluded</strong>
                    <p>{result.data.summary_verdict}</p>
                  </div>
                  <small>
                    Backend decision grouping, not a global ranking. No result
                    grants implementation approval.
                  </small>

                  <h3>Modeled decision context</h3>
                  <p>
                    <strong>Scenario context / notes (not evaluated by gate):</strong>{' '}
                    {result.data.use_context} · {result.data.candidates.length}{' '}
                    candidates
                  </p>

                  <OperationalRequirementsView
                    requirements={result.data.operational_requirements}
                  />

                  <p>
                    <strong>Hypothetical annual units:</strong>{' '}
                    {result.data.annual_units_requested === null
                      ? 'Not supplied · per-unit assessment'
                      : format(result.data.annual_units_requested, '')}
                  </p>

                  <section className="selection-baseline">
                    <div className="candidate-showcase-row">
                      <ProductVisual
                        pkg={result.data.baseline.package}
                        boundary={
                          result.data.baseline.metadata.component_boundary
                        }
                        roleLabel="Current Baseline"
                      />
                      <div className="desc-product">
                        <h3 className="name-product">
                          Baseline · {result.data.baseline.package.label}
                        </h3>
                        <p className="info-product">
                          <strong>
                            {format(
                              result.data.baseline.virgin_plastic_g,
                              'g/unit'
                            )}
                          </strong>{' '}
                          virgin plastic ·{' '}
                          {result.data.baseline.calculation_status === 'CALCULATED'
                            ? 'Calculated from represented components'
                            : 'Insufficient numeric data'}{' '}
                          <span className="tech-enum-inline">
                            ({result.data.baseline.calculation_status})
                          </span>
                        </p>
                        <Metadata data={result.data.baseline.metadata} />
                        <details>
                          <summary>Baseline technical evidence and provenance</summary>
                          <PackageView
                            title="Current"
                            data={result.data.baseline.package}
                          />
                        </details>
                      </div>
                    </div>
                  </section>
                </section>

                {/* Denis Category Section Heading for Candidate Cards */}
                <div className="option-class">
                  <h2
                    className="name-option-class"
                    id="evaluated-candidates-heading"
                  >
                    Evaluated Candidates ({result.data.candidates.length})
                  </h2>
                </div>

                <div className="section-product-board">
                  {result.data.candidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.candidate.id}
                      data={candidate}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
