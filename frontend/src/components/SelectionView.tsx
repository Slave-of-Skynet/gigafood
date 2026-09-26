import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../api/client';
import type { CandidateAssessment, PortfolioSummary, SelectionMetadata, SelectionResponse } from '../api/contracts';
import { format, OperationalRequirementsView, PackageView } from './EvidenceDetails';

type Load<T> = { state: 'loading' } | { state: 'error'; message: string } | { state: 'ready'; data: T };

// Presentation of the backend delta's sign only; all arithmetic stays on the server.
function deltaMeaning(value: number | null) {
  if (value === null) return 'Evidence required — delta N/A';
  if (value > 0) return 'Virgin-plastic reduction';
  if (value === 0) return 'No change — zero virgin-plastic reduction';
  return 'Virgin-plastic use increases';
}

function Metadata({ data }: { data: SelectionMetadata }) {
  return <dl className="selection-metadata">
    <div><dt>Component boundary</dt><dd>{data.component_boundary}</dd></div>
    <div><dt>Recycled-content evidence</dt><dd>{data.recycled_content_point_value_status}</dd></div>
    <div><dt>Evidence scope</dt><dd>{data.recycled_content_scope ?? 'Unknown'}</dd></div>
    <div><dt>Evidence date</dt><dd>{data.evidence_date ?? 'Unknown'}</dd></div>
  </dl>;
}

function CandidateCard({ data }: { data: CandidateAssessment }) {
  const { calculation: calc, eligibility, annual_impact: annual } = data;
  return <article className="products-board selection-candidate" aria-label={data.candidate.label}>
    <div className="section-header">
      <h3 className="section-title">{data.candidate.label}</h3>
      <span className="epistemic-badge">{data.metadata.component_boundary}</span>
    </div>
    <div className="selection-axes">
      <section className="exec-card selection-environment">
        <h4>Environmental result</h4>
        <strong>{deltaMeaning(calc.reduction_g)}</strong>
        <span>{calc.status} · {calc.verification_state}</span>
        <dl className="selection-metadata">
          <div><dt>Current virgin plastic</dt><dd>{format(calc.current_virgin_pack_g, 'g/unit')}</dd></div>
          <div><dt>Candidate virgin plastic</dt><dd>{format(calc.candidate_virgin_pack_g, 'g/unit')}</dd></div>
          <div><dt>Signed reduction</dt><dd>{format(calc.reduction_g, 'g/unit')} · {format(calc.reduction_pct, '%')}</dd></div>
        </dl>
        <small>Represented components only. CALCULATED ≠ VERIFIED.</small>
      </section>
      <section className={`eligibility-banner ${eligibility.status}`}>
        <h4>Operational eligibility</h4>
        <strong>{eligibility.status}</strong>
        <p>{eligibility.status === 'BLOCKED'
          ? 'Incompatible with the stated modeled operating context. Environmental benefit does not override this block.'
          : eligibility.status === 'REVIEW_REQUIRED'
          ? 'Evidence or verification required; unknown capability is not proven incompatibility.'
          : 'Meets evaluated thermal / microwave constraints. Still requires human QA review.'}</p>
      </section>
      <section className="exec-card next-action">
        <h4>Next action</h4>
        <strong>{data.next_action.summary}</strong>
        <small>{data.next_action.action_code}</small>
        <p>{data.next_action.details}</p>
      </section>
    </div>
    <section aria-label="Comparability">
      <h4>Comparability · {data.comparability.rating}</h4>
      {data.comparability.notes.map((note, i) => <p key={i}>{note}</p>)}
    </section>
    {calc.missing_fields.length > 0 && <div className="selection-evidence-gap">
      <strong>Evidence required — missing ≠ 0</strong>
      <ul>{calc.missing_fields.map((field) => <li key={field}>{field}</li>)}</ul>
      <p>Recycled-content point value: {data.metadata.recycled_content_point_value_status}.
        An “up to” marketing ceiling is not an exact recycled fraction.</p>
    </div>}
    <div className="constraints-list">
      {eligibility.constraints.map((finding) => <div key={finding.constraint_id} className={`constraint-card ${finding.status}`}>
        <strong>{finding.status} · {finding.constraint_id}</strong>
        <p>{finding.reason}</p>
        <small>{finding.verification_state}{finding.source_reference ? ` · Source: ${finding.source_reference}` : ''}</small>
      </div>)}
    </div>
    {annual && <section className={`annual-impact ${annual.is_actionable ? '' : 'non-actionable'}`} aria-label="Hypothetical annual impact">
      <h4>Hypothetical annual impact · {annual.status}</h4>
      <strong>{annual.is_actionable ? 'Available for scenario review — not implementation approval' : 'THEORETICAL / NON-ACTIONABLE'}</strong>
      <p>{deltaMeaning(annual.annual_reduction_kg)}</p>
      <dl className="selection-metadata">
        <div><dt>User-supplied annual units</dt><dd>{format(annual.annual_units, '')}</dd></div>
        <div><dt>Annual current virgin plastic</dt><dd>{format(annual.annual_current_virgin_kg, 'kg')}</dd></div>
        <div><dt>Annual candidate virgin plastic</dt><dd>{format(annual.annual_candidate_virgin_kg, 'kg')}</dd></div>
        <div><dt>Signed annual reduction</dt><dd>{format(annual.annual_reduction_kg, 'kg')}</dd></div>
        <div><dt>Actionable under modeled context</dt><dd>{String(annual.is_actionable)}</dd></div>
      </dl>
      <p className="disclosure-banner">{annual.disclosure}</p>
    </section>}
    <details>
      <summary>Candidate evidence and provenance</summary>
      <Metadata data={data.metadata} />
      <PackageView title="Candidate" data={data.candidate} eligibilityStatus={eligibility.status} />
    </details>
  </article>;
}

export function SelectionView({ visible }: { visible: boolean }) {
  const [attempt, setAttempt] = useState(0);
  const [portfolios, setPortfolios] = useState<Load<PortfolioSummary[]>>({ state: 'loading' });
  const [selected, setSelected] = useState('');
  const [volume, setVolume] = useState('');
  const [submitted, setSubmitted] = useState<number | null>(null);
  const [validation, setValidation] = useState('');
  const [evaluationAttempt, setEvaluationAttempt] = useState(0);
  const [result, setResult] = useState<Load<SelectionResponse>>({ state: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    setPortfolios({ state: 'loading' });
    api.portfolios(controller.signal).then((data) => {
      if (!Array.isArray(data) || !data.length) throw new Error('No portfolios available');
      if (controller.signal.aborted) return;
      setSelected((old) => data.some((p) => p.id === old) ? old : data[0].id);
      setPortfolios({ state: 'ready', data });
    }).catch((error) => {
      if (!controller.signal.aborted) setPortfolios({ state: 'error', message: String(error) });
    });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (portfolios.state !== 'ready' || !selected) return;
    const controller = new AbortController();
    setResult({ state: 'loading' });
    const request = submitted === null
      ? api.portfolio(selected, controller.signal)
      : api.evaluatePortfolio(selected, { annual_units: submitted }, controller.signal);
    request.then((data) => {
      if (!controller.signal.aborted) setResult({ state: 'ready', data });
    }).catch((error) => {
      if (!controller.signal.aborted) setResult({ state: 'error', message: String(error) });
    });
    return () => controller.abort();
  }, [portfolios, selected, submitted, evaluationAttempt]);

  function evaluate(event: FormEvent) {
    event.preventDefault();
    const units = Number(volume);
    if (volume.trim() && (!Number.isSafeInteger(units) || units <= 0)) {
      setValidation('Enter a positive whole number within the supported integer range.');
      return;
    }
    setValidation('');
    setResult({ state: 'loading' });
    setSubmitted(volume.trim() ? units : null);
    setEvaluationAttempt((n) => n + 1);
  }

  return <>
    <div className="runtime-pill selection-availability" role="status">
      {portfolios.state === 'loading' ? 'Selection: checking portfolios…'
        : portfolios.state === 'error' ? 'Selection unavailable'
        : result.state === 'error' ? 'Selection: evaluation unavailable'
        : result.state === 'loading' ? 'Selection: portfolios loaded · evaluating…'
        : `Selection: READY · ${portfolios.data.length} portfolio(s)`}
    </div>
    <div className="selection-mode" hidden={!visible}>
      {portfolios.state === 'loading' && <div className="status-panel">Loading Selection portfolios…</div>}
      {portfolios.state === 'error' && <div className="status-panel error-panel" role="alert">
        <h2>Selection unavailable</h2><p>{portfolios.message}</p>
        <p>Comparison has its own evidence availability. No fallback portfolio is used.</p>
        <button className="retry-btn" onClick={() => setAttempt((n) => n + 1)}>Retry Selection</button>
      </div>}
      {portfolios.state === 'ready' && <>
        <section className="control-deck" aria-label="Portfolio controls">
          <label className="scenario-label">Select portfolio
            <select className="scenario-select" value={selected} onChange={(event) => {
              setResult({ state: 'loading' }); setSelected(event.target.value);
              setVolume(''); setSubmitted(null); setValidation('');
            }}>
              {portfolios.data.map((p) => <option key={p.id} value={p.id}>{p.label} · {p.candidate_count} candidates</option>)}
            </select>
          </label>
          <form onSubmit={evaluate} className="annual-form">
            <label className="scenario-label" htmlFor="annual-units">Hypothetical annual units
              <input id="annual-units" type="number" min="1" step="1" max={Number.MAX_SAFE_INTEGER} value={volume} onChange={(event) => setVolume(event.target.value)} placeholder="Optional · e.g. 100000" aria-describedby="volume-disclosure" />
            </label>
            <button type="submit" className="scenario-pill">Evaluate scenario</button>
            <button type="button" className="scenario-pill" onClick={() => {
              setVolume(''); setSubmitted(null); setValidation('');
              setResult({ state: 'loading' }); setEvaluationAttempt((n) => n + 1);
            }}>Clear annual volume</button>
          </form>
          <small id="volume-disclosure">User-supplied hypothetical volume. Not actual Profi volume or measured impact. Leave blank for per-unit assessment.</small>
          {validation && <p role="alert">{validation}</p>}
        </section>
        {result.state === 'loading' && <div className="status-panel" role="status">Evaluating portfolio…</div>}
        {result.state === 'error' && <div className="status-panel error-panel" role="alert">
          <h2>Selection evaluation failed</h2><p>{result.message}</p>
          <button className="retry-btn" onClick={() => setEvaluationAttempt((n) => n + 1)}>Retry evaluation</button>
        </div>}
        {result.state === 'ready' && <div className="selection-results" aria-live="polite">
          <section className="products-board" aria-label="Portfolio assessment">
            <div className="section-header"><h2 className="section-title">{result.data.label}</h2>
              <span className={`dataset-badge ${result.data.dataset_kind}`}>Dataset: {result.data.dataset_kind}</span>
            </div>
            <p className="disclosure-banner">{result.data.disclosure}</p>
            <p><strong>Use context:</strong> {result.data.use_context} · {result.data.candidates.length} candidates</p>
            <div className="selection-verdict"><strong>Assessment summary</strong><p>{result.data.summary_verdict}</p></div>
            <small>Backend decision grouping, not a global ranking. No result grants implementation approval.</small>
            <section className="selection-baseline">
              <h3>Baseline · {result.data.baseline.package.label}</h3>
              <p><strong>{format(result.data.baseline.virgin_plastic_g, 'g/unit')}</strong> virgin plastic · {result.data.baseline.calculation_status}</p>
              <Metadata data={result.data.baseline.metadata} />
              <details><summary>Baseline evidence and modeled operating requirements</summary>
                <OperationalRequirementsView requirements={result.data.operational_requirements} />
                <PackageView title="Current" data={result.data.baseline.package} />
              </details>
            </section>
            {result.data.annual_units_requested !== null && <p>Evaluated with {format(result.data.annual_units_requested, '')} hypothetical annual units.</p>}
          </section>
          {result.data.candidates.map((candidate) => <CandidateCard key={candidate.candidate.id} data={candidate} />)}
        </div>}
      </>}
    </div>
  </>;
}
