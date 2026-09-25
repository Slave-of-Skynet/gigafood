import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { Comparison, Evidence, Health, NumericInput, Package } from '../api/contracts';

type Load<T> = { state: 'loading' } | { state: 'error'; message: string } | { state: 'ready'; data: T };
const format = (value: number | null, unit: string) => value === null ? 'N/A' : `${value.toLocaleString(undefined, { maximumFractionDigits: 3 })} ${unit}`;

function Input({ label, input, unit }: { label: string; input: NumericInput; unit: string }) {
  return <div className="input"><strong>{label}: {input.value === null ? 'Unknown' : format(input.value, unit)}</strong>
    <small>{input.provenance.origin} · {input.provenance.verification_state}</small>
    <small>Source: {input.provenance.source_reference}</small><small>{input.provenance.note}</small></div>;
}

function PackageView({ title, data }: { title: string; data: Package }) {
  return <section><h3>{title}: {data.label}</h3><p>{data.use_context}</p>
    <p>Food-contact use flag: {data.food_contact === null ? 'Unknown' : String(data.food_contact)} (not suitability approval)</p>
    {data.max_temperature_c !== undefined && data.max_temperature_c !== null && (
      <p>Max operating temperature: {data.max_temperature_c}°C</p>
    )}
    {data.microwave_safe !== undefined && data.microwave_safe !== null && (
      <p>Microwave safe: {data.microwave_safe ? 'Yes' : 'No'}</p>
    )}
    {data.components.map(c => <article key={c.id}><h4>{c.id} · {c.material}</h4>
      <Input label="Plastic mass" input={c.plastic_mass_g} unit="g" />
      <Input label="Recycled fraction (0–1)" input={c.recycled_content_fraction} unit="" /></article>)}
  </section>;
}

export function HomePage() {
  const [attempt, setAttempt] = useState(0);
  const [selected, setSelected] = useState('');
  const [runtime, setRuntime] = useState<Load<{ health: Health; evidence: Evidence }>>({ state: 'loading' });
  const [result, setResult] = useState<Load<Comparison>>({ state: 'loading' });
  useEffect(() => {
    const controller = new AbortController();
    setRuntime({ state: 'loading' });
    setResult({ state: 'loading' });
    (async () => {
      const health = await api.health(controller.signal);
      const evidence = await api.scenarios(controller.signal);
      if (health.status !== 'READY' || !evidence.scenarios.length) throw new Error('Evidence unavailable');
      if (controller.signal.aborted) return;
      setSelected(old => evidence.scenarios.some(s => s.id === old) ? old : evidence.scenarios[0].id);
      setRuntime({ state: 'ready', data: { health, evidence } });
    })().catch(error => { if (!controller.signal.aborted) setRuntime({ state: 'error', message: String(error) }); });
    return () => controller.abort();
  }, [attempt]);
  useEffect(() => {
    if (runtime.state !== 'ready' || !selected) return;
    const controller = new AbortController();
    setResult({ state: 'loading' });
    api.comparison(selected, controller.signal).then(data => {
      if (!controller.signal.aborted) setResult({ state: 'ready', data });
    }).catch(error => { if (!controller.signal.aborted) setResult({ state: 'error', message: String(error) }); });
    return () => controller.abort();
  }, [selected, runtime]);
  const retry = () => setAttempt(n => n + 1);
  return <main><h1>GigaFood</h1><p>Packaging Transition Copilot · A-core demonstration</p>
    <p className="notice">Decision support only. Food safety, shelf life, operational suitability and legal compliance are NOT VERIFIED.</p>
    {runtime.state === 'loading' && <p role="status">Checking service and evidence…</p>}
    {runtime.state === 'error' && <div role="alert"><h2>Service / evidence unavailable</h2><p>{runtime.message}</p><button onClick={retry}>Retry</button></div>}
    {runtime.state === 'ready' && <>
      <p>Service: {runtime.data.health.status} · Evidence v{runtime.data.evidence.schema_version} · {runtime.data.evidence.dataset_kind}</p>
      <p className="notice">{runtime.data.evidence.disclosure}</p>
      <label>Scenario <select value={selected} onChange={event => { setResult({ state: 'loading' }); setSelected(event.target.value); }}>
        {runtime.data.evidence.scenarios.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
      </select></label>
      {result.state === 'loading' && <p role="status">Calculating…</p>}
      {result.state === 'error' && <div role="alert"><p>{result.message}</p><button onClick={retry}>Retry</button></div>}
      {result.state === 'ready' && <div aria-live="polite">
        <div
          role="status"
          style={{
            padding: '12px 16px',
            margin: '16px 0',
            borderRadius: '6px',
            fontWeight: 'bold',
            border: '2px solid',
            ...(result.data.eligibility_status === 'BLOCKED' ? {
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              borderColor: '#ef4444'
            } : result.data.eligibility_status === 'REVIEW_REQUIRED' ? {
              backgroundColor: '#fef3c7',
              color: '#92400e',
              borderColor: '#f59e0b'
            } : {
              backgroundColor: '#dcfce7',
              color: '#15803d',
              borderColor: '#22c55e'
            })
          }}
        >
          {result.data.eligibility_status === 'BLOCKED' && <span>⛔ NOT ELIGIBLE FOR OPERATING CONTEXT</span>}
          {result.data.eligibility_status === 'REVIEW_REQUIRED' && <span>⚠️ REVIEW REQUIRED — UNVERIFIED OPERATIONAL CONSTRAINTS</span>}
          {result.data.eligibility_status === 'ELIGIBLE' && <span>✅ ELIGIBLE — MEETS EVALUATED CONSTRAINTS</span>}
        </div>

        {result.data.eligibility_status === 'BLOCKED' && (
          <div role="alert" style={{
            backgroundColor: '#fff1f2',
            border: '1px solid #fecdd3',
            padding: '12px',
            marginBottom: '16px',
            borderRadius: '4px'
          }}>
            <h4 style={{ color: '#be123c', marginTop: 0, marginBottom: '8px' }}>Blocking Operational Incompatibilities:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#9f1239' }}>
              {result.data.constraints.filter(c => c.status === 'BLOCKED').map(c => (
                <li key={c.constraint_id}><strong>{c.constraint_id}:</strong> {c.reason}</li>
              ))}
            </ul>
          </div>
        )}

        <h2>{result.data.status}</h2>
        <p>Derivation: {result.data.origin} · Decision state: {result.data.verification_state} · Eligibility: {result.data.eligibility_status}</p>

        <dl style={result.data.eligibility_status === 'BLOCKED' ? { opacity: 0.6 } : undefined}>
          <dt>Current virgin plastic</dt>
          <dd>{format(result.data.current_virgin_pack_g, 'g/unit')}</dd>
          <dt>Candidate virgin plastic</dt>
          <dd>{format(result.data.candidate_virgin_pack_g, 'g/unit')}</dd>
          <dt>{result.data.eligibility_status === 'BLOCKED' ? 'Theoretical reduction' : 'Reduction'}</dt>
          <dd>{result.data.eligibility_status === 'BLOCKED' && <small>(Ineligible) </small>}{format(result.data.reduction_g, 'g/unit')}</dd>
          <dt>{result.data.eligibility_status === 'BLOCKED' ? 'Theoretical reduction percentage' : 'Reduction percentage'}</dt>
          <dd>{result.data.eligibility_status === 'BLOCKED' && <small>(Ineligible) </small>}{format(result.data.reduction_pct, '%')}</dd>
        </dl>
        {result.data.current_virgin_pack_g === 0 && <p>Percentage is N/A because current virgin plastic is zero.</p>}
        {result.data.reduction_g !== null && result.data.reduction_g < 0 && <p>The candidate uses more virgin plastic.</p>}
        {!!result.data.missing_fields.length && <><p>Comparison refused: required inputs are missing.</p><ul>{result.data.missing_fields.map(f => <li key={f}>{f}</li>)}</ul></>}
        <h3>Constraints requiring review</h3>{result.data.constraints.map(c => <p className="notice" key={c.constraint_id}>
          <strong>{c.status} · {c.verification_state}</strong><br />{c.reason}{c.source_reference && <small>Source: {c.source_reference}</small>}</p>)}
        <div className="packages"><PackageView title="Current" data={result.data.scenario.current} /><PackageView title="Candidate" data={result.data.scenario.candidate} /></div>
      </div>}
    </>}
  </main>;
}
