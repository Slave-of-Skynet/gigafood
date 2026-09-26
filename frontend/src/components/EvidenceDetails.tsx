import type { BooleanInput, Comparison, NumericInput, OperationalRequirements, Package } from '../api/contracts';

export const format = (value: number | null, unit: string) => value === null ? 'N/A' : `${value.toLocaleString('en-US', { maximumFractionDigits: 3 })}${unit ? ` ${unit}` : ''}`;

function NumericProvenanceItem({
  label,
  input,
  unit,
}: {
  label: string;
  input: NumericInput;
  unit: string;
}) {
  return (
    <div className="input">
      <div className="input-header">
        <strong>
          {label}: {input.value === null ? 'Unknown (N/A)' : format(input.value, unit)}
        </strong>
        <div className="provenance-chips">
          <span className="prov-chip origin">{input.provenance.origin}</span>
          <span className={`prov-chip verification ${input.provenance.verification_state}`}>
            {input.provenance.verification_state}
          </span>
        </div>
      </div>
      <small>Source: {input.provenance.source_reference}</small>
      <small>{input.provenance.note}</small>
    </div>
  );
}

function BooleanProvenanceItem({
  label,
  input,
}: {
  label: string;
  input: BooleanInput;
}) {
  const displayVal =
    input.value === null ? 'Unknown (N/A)' : input.value ? 'Yes (true)' : 'No (false)';
  return (
    <div className="input">
      <div className="input-header">
        <strong>
          {label}: {displayVal}
        </strong>
        <div className="provenance-chips">
          <span className="prov-chip origin">{input.provenance.origin}</span>
          <span className={`prov-chip verification ${input.provenance.verification_state}`}>
            {input.provenance.verification_state}
          </span>
        </div>
      </div>
      <small>Source: {input.provenance.source_reference}</small>
      <small>{input.provenance.note}</small>
    </div>
  );
}

export function OperationalRequirementsView({
  requirements,
}: {
  requirements?: OperationalRequirements | null;
}) {
  if (
    !requirements ||
    (!requirements.max_temperature_c && !requirements.microwave_safe)
  ) {
    return null;
  }

  return (
    <div className="req-card">
      <h4>Scenario Operational Requirements (Evaluated by Gate)</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {requirements.max_temperature_c && (
          <NumericProvenanceItem
            label="Required max temperature"
            input={requirements.max_temperature_c}
            unit="°C"
          />
        )}
        {requirements.microwave_safe && (
          <BooleanProvenanceItem
            label="Required microwave reheating"
            input={requirements.microwave_safe}
          />
        )}
      </div>
    </div>
  );
}

export function PackageView({
  title,
  data,
  eligibilityStatus,
}: {
  title: 'Current' | 'Candidate';
  data: Package;
  eligibilityStatus?: Comparison['eligibility_status'];
}) {
  const isCandidate = title === 'Candidate';
  const cardClass = isCandidate
    ? `package-card candidate-package ${eligibilityStatus ?? ''}`
    : 'package-card current-package';

  const capMaxTemp = data.capabilities?.max_temperature_c;
  const capMicrowave = data.capabilities?.microwave_safe;

  return (
    <section className={cardClass}>
      <div className="package-header">
        <span className="package-role-tag">
          {title === 'Current' ? 'Current Baseline Packaging' : 'Candidate Transition Packaging'}
        </span>
        <h3>
          {title}: {data.label}
        </h3>
        <small>Package ID: {data.id}</small>
      </div>

      <div className="package-meta-list">
        <p>
          <strong>Use context:</strong> {data.use_context ?? 'Not specified'}
        </p>
        <p>
          <strong>Food-contact use flag:</strong>{' '}
          {data.food_contact === null ? 'Unknown' : String(data.food_contact)}{' '}
          <em>(not suitability or regulatory approval)</em>
        </p>
        {!capMaxTemp &&
          data.max_temperature_c !== undefined &&
          data.max_temperature_c !== null && (
            <p>
              <strong>Max operating temperature:</strong> {data.max_temperature_c}°C
            </p>
          )}
        {!capMicrowave &&
          data.microwave_safe !== undefined &&
          data.microwave_safe !== null && (
            <p>
              <strong>Microwave safe:</strong> {data.microwave_safe ? 'Yes' : 'No'}
            </p>
          )}
      </div>

      {(capMaxTemp || capMicrowave) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <strong style={{ fontSize: '14px' }}>Declared Technical Capabilities:</strong>
          {capMaxTemp && (
            <NumericProvenanceItem
              label="Max operating temperature"
              input={capMaxTemp}
              unit="°C"
            />
          )}
          {capMicrowave && (
            <BooleanProvenanceItem label="Microwave safe" input={capMicrowave} />
          )}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <strong style={{ fontSize: '14px' }}>
          Represented Plastic Components ({data.components.length}):
        </strong>
        {data.components.map((c) => (
          <article key={c.id} className="component-card">
            <h4>
              <span>
                {c.id} · {c.material}
              </span>
            </h4>
            <NumericProvenanceItem
              label="Plastic mass"
              input={c.plastic_mass_g}
              unit="g"
            />
            <NumericProvenanceItem
              label="Recycled fraction (0–1)"
              input={c.recycled_content_fraction}
              unit=""
            />
          </article>
        ))}
      </div>
    </section>
  );
}
