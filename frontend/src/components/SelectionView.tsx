import { useTranslation } from '../i18n';
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
    ? 'Required inputs need verification'
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
      return 'Cannot calculate delta — package scopes differ';
    }
    if (gapReason === 'MISSING_MASS') {
      return 'Cannot calculate yet — required package mass missing';
    }
    return 'Cannot calculate yet — required numeric evidence missing';
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
  const t = useTranslation();
  return (
    <dl className="selection-metadata">
      <div>
        <dt>{t("Component boundary")}</dt>
        <dd>
          {t(componentBoundaryLabel(data.component_boundary))}{t(' ')}
          <span className="tech-enum-inline">{t("(")}{t(data.component_boundary)}{t(")")}</span>
        </dd>
      </div>
      <div>
        <dt>{t("Recycled-content evidence")}</dt>
        <dd>
          {t(recycledEvidenceLabel(data.recycled_content_point_value_status))}{t(' ')}
          <span className="tech-enum-inline">{t("(")}{t(data.recycled_content_point_value_status)}{t(")")}</span>
        </dd>
      </div>
      <div>
        <dt>{t("Evidence scope")}</dt>
        <dd>{t(data.recycled_content_scope ?? 'Scope not provided')}</dd>
      </div>
      <div>
        <dt>{t("Evidence date")}</dt>
        <dd>{t(data.evidence_date ?? 'Source date not provided')}</dd>
      </div>
    </dl>
  );
}

function CandidateCard({ data }: { data: CandidateAssessment }) {
  const t = useTranslation();
  const { calculation: calc, eligibility, annual_impact: annual } = data;
  const gapReason = detectCalculationGapReason(data);
  const primaryComponentsSummary = data.candidate.components
    .map((c) => `${c.id}: ${c.material}`)
    .join(' · ');

  return (
    <article
      className={`products-board selection-candidate candidate-${eligibility.status}`}
      aria-label={t(data.candidate.label)}
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
              <span className="candidate-kicker">{t("What is this packaging option? · ID: ")}{data.candidate.id}
              </span>
              <h3 className="name-product section-title">{t(data.candidate.label)}</h3>
            </div>
            <div className="epistemic-badges">
              <span className="epistemic-badge">
                {t(componentBoundaryLabel(data.metadata.component_boundary))}{t(" ·")}{t(' ')}
                <small>{t(data.metadata.component_boundary)}</small>
              </span>
              <span className={`eligibility-status-pill ${eligibility.status}`}>
                {t(eligibility.status === 'BLOCKED'
                  ? '⛔ BLOCKED'
                  : eligibility.status === 'REVIEW_REQUIRED'
                  ? '⚠️ Review required'
                  : '✓ Eligible')}
              </span>
            </div>
          </div>

          <p className="info-product">
            <strong>{t("Use context:")}</strong> {t(data.candidate.use_context ?? 'Not specified')}{t(" ·")}{t(' ')}
            <strong>{t("Represented components:")}</strong> {t(primaryComponentsSummary)}{t(" ·")}{t(' ')}
            <strong>{t("Recycled-content evidence:")}</strong>{t(' ')}
            {t(recycledEvidenceLabel(data.metadata.recycled_content_point_value_status))}{t(' ')}
            <span className="tech-enum-inline">{t("(")}{t(data.metadata.recycled_content_point_value_status)}{t(")")}</span>
          </p>

          <div className="option-product">
            <div className="comparison-heading-group">
              <h4 className="table-desc">{t("Virgin-plastic comparison")}</h4>
              <p className="comparison-human-sub">
                {t(calculationSummaryText(data))}
              </p>
              <small className="tech-enum-trace">{t("Technical state: ")}{t(calc.status)}{t(" · ")}{t(calc.verification_state)}
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
                    {t(formatNumberOnly(calc.current_virgin_pack_g))}
                  </span>
                  <span className="circle-unit">{t("g / unit")}</span>
                </div>
                <span className="circle-text">{t("Baseline virgin")}</span>
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
                    {t(formatNumberOnly(calc.candidate_virgin_pack_g))}
                  </span>
                  <span className="circle-unit">
                    {t(calc.candidate_virgin_pack_g === null ? 'missing ≠ 0' : 'g / unit')}
                  </span>
                </div>
                <span className="circle-text">{t("Candidate virgin")}</span>
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
                  <span className="circle-num">{t(formatNumberOnly(calc.reduction_g))}</span>
                  <span className="circle-unit">
                    {t(calc.reduction_g === null ? 'Package inputs needed' : 'g / unit')}
                  </span>
                </div>
                <span className="circle-text">{t("Signed reduction")}</span>
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
                    {t(calc.reduction_pct === null
                      ? 'Required inputs need verification'
                      : `${formatNumberOnly(calc.reduction_pct)}%`)}
                  </span>
                  <span className="circle-unit">{t("virgin delta")}</span>
                </div>
                <span className="circle-text">{t("Reduction %")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Axis Judge Decision Grid: Environmental Result, Operational Eligibility, Next Action */}
      <div className="selection-axes">
        <section className="exec-card selection-environment">
          <span className="judge-question-kicker">{t("Does it reduce virgin plastic?")}</span>
          <h4>{t("Environmental result")}</h4>
          <strong>{t(deltaMeaning(calc.reduction_g, gapReason))}</strong>
          <p className="axis-human-note">
            {t(calculationGapExplanation(data))}
          </p>
          <dl className="selection-metadata">
            <div>
              <dt>{t("Current virgin plastic")}</dt>
              <dd>{t(format(calc.current_virgin_pack_g, 'g/unit'))}</dd>
            </div>
            <div>
              <dt>{t("Candidate virgin plastic")}</dt>
              <dd>{t(format(calc.candidate_virgin_pack_g, 'g/unit'))}</dd>
            </div>
            <div>
              <dt>{t("Signed reduction")}</dt>
              <dd>
                {t(format(calc.reduction_g, 'g/unit'))}{t(" · ")}{t(format(calc.reduction_pct, '%'))}
              </dd>
            </div>
          </dl>
          <small className="tech-enum-trace">{t("Represented components only · CALCULATED ≠ VERIFIED · Technical state:")}{t(' ')}
            {t(calc.status)}{t(" · ")}{t(calc.verification_state)}
          </small>
        </section>

        <section className={`eligibility-banner ${eligibility.status}`}>
          <span className="judge-question-kicker">{t("Can we use it in this operating context?")}</span>
          <h4>{t("Operational eligibility")}</h4>
          <strong>{t(eligibilityHeadline(eligibility.status))}</strong>
          <p>
            {t(eligibility.status === 'BLOCKED'
              ? 'Incompatible with the stated modeled operating requirements. Environmental benefit does not override this operational block.'
              : eligibility.status === 'REVIEW_REQUIRED'
              ? 'Evidence or human verification is required before confirming compatibility; an unverified capability is not proven incompatibility.'
              : 'Passes the bounded evaluated thermal and microwave requirements. Still requires human QA and food-safety review.')}
          </p>
          <small className="tech-enum-trace">{t("Technical state: ")}{t(eligibility.status)}
          </small>
        </section>

        <section className="exec-card next-action">
          <span className="judge-question-kicker">{t("What should Profi investigate next?")}</span>
          <h4>{t("Next action")}</h4>
          <strong>{t(data.next_action.summary)}</strong>
          <p>{t(data.next_action.details)}</p>
          <small className="tech-enum-trace">{t("Action code: ")}{data.next_action.action_code}
          </small>
        </section>
      </div>

      <section className="comparability-panel" aria-label={t("Comparability")}>
        <span className="judge-question-kicker">{t("Comparison scope")}</span>
        <h4>{t(comparabilityLabel(data.comparability.rating))}</h4>
        {t(data.comparability.notes.map((note, i) => (
          <p key={i}>{t(note)}</p>
        )))}
        <small className="tech-enum-trace">{t("Technical state: ")}{t(data.comparability.rating)}
        </small>
      </section>

      {t(calc.status === 'INSUFFICIENT_DATA' || calc.missing_fields.length > 0 ? (
        <div className="selection-evidence-gap" role="alert">
          <span className="judge-question-kicker">{t("What evidence is missing?")}</span>
          <strong>{t("Evidence required — missing ≠ 0")}</strong>
          <p>
            <strong>{t("Why no number is shown:")}</strong>{t(' ')}
            {t(calculationGapExplanation(data))}
          </p>
          {t(calc.missing_fields.length > 0 && (
            <ul>
              {t(calc.missing_fields.map((field) => (
                <li key={field}>{t(field)}</li>
              )))}
            </ul>
          ))}
          <small className="tech-enum-trace">{t("Recycled-content evidence:")}{t(' ')}
            {t(recycledEvidenceLabel(
              data.metadata.recycled_content_point_value_status
            ))}{t(' ')}{t("(")}{t(data.metadata.recycled_content_point_value_status)}{t(")")}</small>
        </div>
      ) : (
        <div className="comparability-panel">
          <span className="judge-question-kicker">{t("What evidence is missing?")}</span>
          <strong>{t("No missing numeric fields for represented components")}</strong>
          <p>
            {t(recycledEvidenceExplanation(
              data.metadata.recycled_content_point_value_status
            ))}{t(' ')}{t("The arithmetic is computed from represented inputs, but this is not implementation approval (CALCULATED ≠ VERIFIED).")}</p>
          <small className="tech-enum-trace">{t("Recycled-content evidence:")}{t(' ')}
            {t(recycledEvidenceLabel(
              data.metadata.recycled_content_point_value_status
            ))}{t(' ')}{t("(")}{t(data.metadata.recycled_content_point_value_status)}{t(") · Verification state: ")}{t(calc.verification_state)}
          </small>
        </div>
      ))}

      <div className="constraints-list">
        {t(eligibility.constraints.map((finding) => (
          <div
            key={finding.constraint_id}
            className={`constraint-card ${finding.status}`}
          >
            <strong>
              {t(finding.status === 'BLOCKED' ? '⛔ Blocked' : '⚠️ Review required')}{t(" ·")}{t(' ')}
              {finding.constraint_id}
            </strong>
            <p>{t(finding.reason)}</p>
            <small className="tech-enum-trace">{t("Technical state: ")}{t(finding.status)}{t(" · ")}{t(finding.verification_state)}
              {finding.source_reference && <>{t(' · Source: ')}{finding.source_reference}</>}
            </small>
          </div>
        )))}
      </div>

      {t(annual && (
        <section
          className={`annual-impact ${annual.is_actionable ? '' : 'non-actionable'}`}
          aria-label={t("Hypothetical annual impact")}
        >
          <h4>{t("Hypothetical annual impact ·")}{t(' ')}
            {t(annual.status === 'CALCULATED'
              ? 'Calculated from hypothetical volume'
              : gapReason === 'BOUNDARY_MISMATCH'
              ? 'Calculation withheld (scopes differ)'
              : 'Calculation withheld (missing evidence)')}
          </h4>
          <strong>
            {t(annual.is_actionable
              ? 'Available for scenario review — not implementation approval'
              : 'THEORETICAL / NON-ACTIONABLE')}
          </strong>
          <p>{t(deltaMeaning(annual.annual_reduction_kg, gapReason))}</p>
          <dl className="selection-metadata">
            <div>
              <dt>{t("User-supplied annual units")}</dt>
              <dd>{t(format(annual.annual_units, ''))}</dd>
            </div>
            <div>
              <dt>{t("Annual current virgin plastic")}</dt>
              <dd>{t(format(annual.annual_current_virgin_kg, 'kg'))}</dd>
            </div>
            <div>
              <dt>{t("Annual candidate virgin plastic")}</dt>
              <dd>{t(format(annual.annual_candidate_virgin_kg, 'kg'))}</dd>
            </div>
            <div>
              <dt>{t("Signed annual reduction")}</dt>
              <dd>{t(format(annual.annual_reduction_kg, 'kg'))}</dd>
            </div>
            <div>
              <dt>{t("Actionable under modeled context")}</dt>
              <dd>{t(String(annual.is_actionable))}</dd>
            </div>
          </dl>
          <p className="disclosure-banner">{t(annual.disclosure)}</p>
          <small className="tech-enum-trace">{t("Technical state: ")}{t(annual.status)}
          </small>
        </section>
      ))}

      <details>
        <summary>{t("Technical evidence and provenance")}</summary>
        <Metadata data={data.metadata} />
        <PackageView
          title={t("Candidate")}
          data={data.candidate}
          eligibilityStatus={eligibility.status}
        />
      </details>
    </article>
  );
}

export function SelectionView({ visible }: { visible: boolean }) {
  const t = useTranslation();
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
        {t(portfolios.state === 'loading'
          ? 'Selection: checking portfolios…'
          : portfolios.state === 'error'
          ? 'Selection unavailable'
          : result.state === 'error'
          ? 'Selection: evaluation unavailable'
          : result.state === 'loading'
          ? 'Selection: portfolios loaded · evaluating…'
          : `Selection: READY · ${portfolios.data.length} portfolio(s)`)}
      </div>

      <div className="selection-mode" hidden={!visible}>
        {t(portfolios.state === 'loading' && (
          <div className="status-panel">{t("Loading Selection portfolios…")}</div>
        ))}

        {t(portfolios.state === 'error' && (
          <div className="status-panel error-panel" role="alert">
            <h2>{t("Selection unavailable")}</h2>
            <p>{t("Calculation could not be loaded. Please retry.")}</p>
            <p>{t("Comparison has its own evidence availability. No fallback portfolio is used.")}</p>
            <button
              className="retry-btn"
              onClick={() => setAttempt((n) => n + 1)}
            >{t("Retry Selection")}</button>
          </div>
        ))}

        {t(portfolios.state === 'ready' && (
          <>
            <section className="control-deck" aria-label={t("Portfolio controls")}>
              <label className="scenario-label">{t("Select portfolio")}<select
                  className="scenario-select"
                  value={selected}
                  onChange={(event) => {
                    setResult({ state: 'loading' });
                    setSelected(event.target.value);
                    resetScenario();
                  }}
                >
                  {t(portfolios.data.map((p) => (
                    <option key={p.id} value={p.id}>
                      {t(p.label)}{t(" · ")}{t(p.candidate_count)}{t(" candidates")}</option>
                  )))}
                </select>
              </label>

              <form onSubmit={evaluate} className="scenario-form" noValidate>
                <div className="scenario-form-heading">
                  <h3>{t("User-supplied scenario")}</h3>
                  <p>{t("Not a verified Profi requirement. Blank fields and “Use portfolio default” inherit the committed portfolio assumptions.")}</p>
                </div>

                <label className="scenario-label" htmlFor="scenario-context">{t("Scenario notes (not evaluated)")}<input
                    id="scenario-context"
                    value={context}
                    onChange={(event) => setContext(event.target.value)}
                    placeholder={t("Optional context notes (not evaluated)")}
                    aria-describedby="context-help"
                  />
                  <small id="context-help">{t("Optional notes for this scenario. These notes are shown for context only. Eligibility is evaluated from the structured temperature and microwave fields below.")}</small>
                </label>

                <label
                  className="scenario-label"
                  htmlFor="scenario-temperature"
                >{t("Required maximum temperature (°C)")}<input
                    id="scenario-temperature"
                    type="text"
                    inputMode="decimal"
                    value={temperature}
                    onChange={(event) => setTemperature(event.target.value)}
                    placeholder={t("Optional · e.g. 60")}
                  />
                </label>

                <label className="scenario-label" htmlFor="scenario-microwave">{t("Microwave reheating")}<select
                    id="scenario-microwave"
                    className="scenario-select"
                    value={microwave}
                    onChange={(event) => setMicrowave(event.target.value)}
                  >
                    <option value="default">{t("Use portfolio default")}</option>
                    <option value="required">{t("Required")}</option>
                    <option value="not-required">{t("Not required in this scenario")}</option>
                  </select>
                </label>

                <label className="scenario-label" htmlFor="annual-units">{t("Hypothetical annual units")}<input
                    id="annual-units"
                    type="text"
                    inputMode="numeric"
                    value={volume}
                    onChange={(event) => setVolume(event.target.value)}
                    placeholder={t("Optional · e.g. 100000")}
                    aria-describedby="volume-disclosure"
                  />
                  <small id="volume-disclosure">{t("User-supplied hypothetical volume. Not actual Profi volume or measured impact. Leave blank for per-unit assessment.")}</small>
                </label>

                <div className="scenario-actions">
                  <button type="submit" className="scenario-pill">{t("Evaluate scenario")}</button>
                  <button
                    type="button"
                    className="scenario-pill"
                    onClick={resetScenario}
                  >{t("Reset to portfolio defaults")}</button>
                </div>
              </form>

              {t(validation && <p role="alert">{t(validation)}</p>)}
            </section>

            {t(result.state === 'loading' && (
              <div className="status-panel" role="status">{t("Evaluating portfolio…")}</div>
            ))}

            {t(result.state === 'error' && (
              <div className="status-panel error-panel" role="alert">
                <h2>{t("Selection evaluation failed")}</h2>
                <p>{t("Calculation could not be loaded. Please retry.")}</p>
                <button
                  className="retry-btn"
                  onClick={() => setEvaluationAttempt((n) => n + 1)}
                >{t("Retry evaluation")}</button>
              </div>
            ))}

            {t(result.state === 'ready' && (
              <div
                className="selection-results all-products-board"
                aria-live="polite"
              >
                {/* Denis Category Section Heading with 50% underline (.option-class / .name-option-class) */}
                <div className="option-class">
                  <h2 className="name-option-class" id="portfolio-category-title">
                    {t(result.data.label)}
                  </h2>
                </div>

                <section
                  className="products-board"
                  aria-label={t("Portfolio assessment")}
                >
                  <div className="section-header">
                    <h3 className="section-title">{t("Portfolio Decision Context & Baseline")}</h3>
                    <span className={`dataset-badge ${result.data.dataset_kind}`}>{t("Dataset: ")}{t(result.data.dataset_kind)}
                    </span>
                  </div>

                  <p className="disclosure-banner">{t(result.data.disclosure)}</p>

                  {/* UX-9: First-screen narrative hierarchy — What PackShift concluded first */}
                  <div className="selection-verdict">
                    <strong>{t("What PackShift concluded")}</strong>
                    <p>{t(result.data.summary_verdict)}</p>
                  </div>
                  <small>{t("Backend decision grouping, not a global ranking. No result grants implementation approval.")}</small>

                  <h3>{t("Modeled decision context")}</h3>
                  <p>
                    <strong>{t("Scenario context / notes (not evaluated by gate):")}</strong>{t(' ')}
                    {t(result.data.use_context)}{t(" · ")}{t(result.data.candidates.length)}{t(' ')}{t("candidates")}</p>

                  <OperationalRequirementsView
                    requirements={result.data.operational_requirements}
                  />

                  <p>
                    <strong>{t("Hypothetical annual units:")}</strong>{t(' ')}
                    {t(result.data.annual_units_requested === null
                      ? 'Not supplied · per-unit assessment'
                      : format(result.data.annual_units_requested, ''))}
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
                        <h3 className="name-product">{t("Baseline · ")}{t(result.data.baseline.package.label)}
                        </h3>
                        <p className="info-product">
                          <strong>
                            {t(format(
                              result.data.baseline.virgin_plastic_g,
                              'g/unit'
                            ))}
                          </strong>{t(' ')}{t("virgin plastic ·")}{t(' ')}
                          {t(result.data.baseline.calculation_status === 'CALCULATED'
                            ? 'Calculated from represented components'
                            : 'Insufficient numeric data')}{t(' ')}
                          <span className="tech-enum-inline">{t("(")}{t(result.data.baseline.calculation_status)}{t(")")}</span>
                        </p>
                        <Metadata data={result.data.baseline.metadata} />
                        <details>
                          <summary>{t("Baseline technical evidence and provenance")}</summary>
                          <PackageView
                            title={t("Current")}
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
                  >{t("Evaluated Candidates (")}{t(result.data.candidates.length)}{t(")")}</h2>
                </div>

                <div className="section-product-board">
                  {t(result.data.candidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.candidate.id}
                      data={candidate}
                    />
                  )))}
                </div>
              </div>
            ))}
          </>
        ))}
      </div>
    </>
  );
}
