import { useTranslation } from '../i18n';
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
  const t = useTranslation();
  return (
    <div className="input">
      <div className="input-header">
        <strong>
          {t(label)}{t(": ")}{t(input.value === null ? 'Unknown (N/A)' : format(input.value, unit))}
        </strong>
        <div className="provenance-chips">
          <span className="prov-chip origin">{t(input.provenance.origin)}</span>
          <span className={`prov-chip verification ${input.provenance.verification_state}`}>
            {t(input.provenance.verification_state)}
          </span>
        </div>
      </div>
      <small>{t("Source: ")}{t(input.provenance.source_reference)}</small>
      <small>{t(input.provenance.note)}</small>
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
  const t = useTranslation();
  const displayVal =
    input.value === null ? 'Unknown (N/A)' : input.value ? 'Yes (true)' : 'No (false)';
  return (
    <div className="input">
      <div className="input-header">
        <strong>
          {t(label)}{t(": ")}{t(displayVal)}
        </strong>
        <div className="provenance-chips">
          <span className="prov-chip origin">{t(input.provenance.origin)}</span>
          <span className={`prov-chip verification ${input.provenance.verification_state}`}>
            {t(input.provenance.verification_state)}
          </span>
        </div>
      </div>
      <small>{t("Source: ")}{t(input.provenance.source_reference)}</small>
      <small>{t(input.provenance.note)}</small>
    </div>
  );
}

export function OperationalRequirementsView({
  requirements,
}: {
  requirements?: OperationalRequirements | null;
}) {
  const t = useTranslation();
  if (
    !requirements ||
    (!requirements.max_temperature_c && !requirements.microwave_safe)
  ) {
    return null;
  }

  return (
    <div className="req-card">
      <h4>{t("Scenario Operational Requirements (Evaluated by Gate)")}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {t(requirements.max_temperature_c && (
          <NumericProvenanceItem
            label="Required max temperature"
            input={requirements.max_temperature_c}
            unit="°C"
          />
        ))}
        {t(requirements.microwave_safe && (
          <BooleanProvenanceItem
            label="Required microwave reheating"
            input={requirements.microwave_safe}
          />
        ))}
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
  const t = useTranslation();
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
          {t(title === 'Current' ? 'Current Baseline Packaging' : 'Candidate Transition Packaging')}
        </span>
        <h3>
          {t(title)}{t(": ")}{t(data.label)}
        </h3>
        <small>{t("Package ID: ")}{t(data.id)}</small>
      </div>

      <div className="package-meta-list">
        <p>
          <strong>{t("Use context:")}</strong> {t(data.use_context ?? 'Not specified')}
        </p>
        <p>
          <strong>{t("Food-contact use flag:")}</strong>{t(' ')}
          {t(data.food_contact === null ? 'Unknown' : String(data.food_contact))}{t(' ')}
          <em>{t("(not suitability or regulatory approval)")}</em>
        </p>
        {t(!capMaxTemp &&
          data.max_temperature_c !== undefined &&
          data.max_temperature_c !== null && (
            <p>
              <strong>{t("Max operating temperature:")}</strong> {t(data.max_temperature_c)}{t("°C")}</p>
          ))}
        {t(!capMicrowave &&
          data.microwave_safe !== undefined &&
          data.microwave_safe !== null && (
            <p>
              <strong>{t("Microwave safe:")}</strong> {t(data.microwave_safe ? 'Yes' : 'No')}
            </p>
          ))}
      </div>

      {t((capMaxTemp || capMicrowave) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <strong style={{ fontSize: '14px' }}>{t("Declared Technical Capabilities:")}</strong>
          {t(capMaxTemp && (
            <NumericProvenanceItem
              label="Max operating temperature"
              input={capMaxTemp}
              unit="°C"
            />
          ))}
          {t(capMicrowave && (
            <BooleanProvenanceItem label="Microwave safe" input={capMicrowave} />
          ))}
        </div>
      ))}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <strong style={{ fontSize: '14px' }}>{t("Represented Plastic Components (")}{t(data.components.length)}{t("):")}</strong>
        {t(data.components.map((c) => (
          <article key={c.id} className="component-card">
            <h4>
              <span>
                {t(c.id)}{t(" · ")}{t(c.material)}
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
        )))}
      </div>
    </section>
  );
}
