import { useTranslation } from '../i18n';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../api/client';
import type { Comparison, EconomicScenarioRequest, EconomicScenarioResponse } from '../api/contracts';

interface Props {
  scenarioId: string;
  scenarioLabel: string;
  comparison: Comparison;
}

const formatCurrency = (val: number | null): string => {
  if (val === null) return 'N/A';
  const prefix = val < 0 ? '-€' : '€';
  const absVal = Math.abs(val);
  return `${prefix}${absVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDeltaCurrency = (val: number | null): string => {
  if (val === null) return 'N/A';
  if (val > 0) return `+€${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / year`;
  if (val < 0) return `-€${Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / year`;
  return `€0.00 / year`;
};

const formatFirstYearDeltaCurrency = (val: number | null): string => {
  if (val === null) return 'N/A';
  if (val > 0) return `+€${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (val < 0) return `-€${Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `€0.00`;
};

const formatKg = (val: number | null): string => {
  if (val === null) return 'N/A';
  return `${val.toLocaleString('en-US', { maximumFractionDigits: 1 })} kg / year`;
};

export function EconomicScenarioView({ scenarioId, scenarioLabel, comparison }: Props) {
  const t = useTranslation();
  const [annualUnits, setAnnualUnits] = useState('');
  const [currentCost, setCurrentCost] = useState('');
  const [candidateCost, setCandidateCost] = useState('');
  const [transitionCost, setTransitionCost] = useState('');
  const [validation, setValidation] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EconomicScenarioResponse | null>(null);

  // Clear previous results when scenario changes
  useEffect(() => {
    setResult(null);
    setError(null);
    setValidation('');
  }, [scenarioId]);

  function evaluate(event: FormEvent) {
    event.preventDefault();
    const units = Number(annualUnits.trim());
    if (!annualUnits.trim() || !Number.isSafeInteger(units) || units <= 0) {
      setValidation('Annual units must be a positive whole number greater than 0.');
      return;
    }

    const curCost = Number(currentCost.trim());
    if (!currentCost.trim() || !Number.isFinite(curCost) || curCost < 0) {
      setValidation('Current packaging cost must be a finite number ≥ 0.');
      return;
    }

    const candCost = Number(candidateCost.trim());
    if (!candidateCost.trim() || !Number.isFinite(candCost) || candCost < 0) {
      setValidation('Candidate packaging cost must be a finite number ≥ 0.');
      return;
    }

    let transCost: number | null = null;
    if (transitionCost.trim()) {
      transCost = Number(transitionCost.trim());
      if (!Number.isFinite(transCost) || transCost < 0) {
        setValidation('One-time transition cost must be a finite number ≥ 0, or left blank.');
        return;
      }
    }

    setValidation('');
    setError(null);
    setEvaluating(true);

    const req: EconomicScenarioRequest = {
      annual_units: units,
      current_cost_eur_per_unit: curCost,
      candidate_cost_eur_per_unit: candCost,
      one_time_transition_cost_eur: transCost,
    };

    const controller = new AbortController();
    api.economicScenario(scenarioId, req, controller.signal)
      .then((data) => {
        setResult(data);
        setEvaluating(false);
      })
      .catch((err) => {
        setError(String(err));
        setEvaluating(false);
      });
  }

  function resetScenario() {
    setAnnualUnits('');
    setCurrentCost('');
    setCandidateCost('');
    setTransitionCost('');
    setValidation('');
    setError(null);
    setResult(null);
  }

  const isBlocked = comparison.eligibility_status === 'BLOCKED';

  return (
    <section id="economics" className="products-board economic-scenario-section" aria-label={t("Hypothetical Economic Scenario")}>
      <div className="section-header">
        <div>
          <h2 className="section-title">{t("Economic Scenario · Business Impact Amplifier")}</h2>
          <small>{t("Hypothetical packaging transition economics for ")}<strong>{t(scenarioLabel)}</strong></small>
        </div>
        <div className="epistemic-badges">
          <span className="epistemic-badge">{t("Derivation: CALCULATED")}</span>
          <span className="epistemic-badge">{t("Input origin: USER_PROVIDED")}</span>
          <span className="epistemic-badge">{t("Verification: NOT_VERIFIED")}</span>
        </div>
      </div>

      <p className="disclosure-banner">{t("Hypothetical economic scenario based on user-supplied volume and packaging costs. Not actual Profi pricing, procurement terms, commercial commitment, or verified savings.")}</p>

      <form onSubmit={evaluate} className="scenario-form economic-form" noValidate>
        <div className="scenario-form-heading">
          <h3>{t("User-Supplied Economic Parameters")}</h3>
          <p>{t("Supply retail volume and packaging unit economics to calculate hypothetical annual spend and incremental cost per kg avoided.")}</p>
        </div>

        <div className="economic-inputs-grid">
          <label className="scenario-label" htmlFor="econ-annual-units">{t("Annual units")}<input
              id="econ-annual-units"
              type="text"
              inputMode="numeric"
              value={annualUnits}
              onChange={(e) => setAnnualUnits(e.target.value)}
              placeholder={t("e.g. 1000000")}
              aria-describedby="econ-units-help"
            />
            <small id="econ-units-help">{t("Required positive whole number (e.g. 1,000,000).")}</small>
          </label>

          <label className="scenario-label" htmlFor="econ-current-cost">{t("Current packaging cost (€ / unit)")}<input
              id="econ-current-cost"
              type="text"
              inputMode="decimal"
              value={currentCost}
              onChange={(e) => setCurrentCost(e.target.value)}
              placeholder={t("e.g. 0.120")}
              aria-describedby="econ-current-help"
            />
            <small id="econ-current-help">{t("Baseline unit packaging cost (€ ≥ 0).")}</small>
          </label>

          <label className="scenario-label" htmlFor="econ-candidate-cost">{t("Candidate packaging cost (€ / unit)")}<input
              id="econ-candidate-cost"
              type="text"
              inputMode="decimal"
              value={candidateCost}
              onChange={(e) => setCandidateCost(e.target.value)}
              placeholder={t("e.g. 0.135")}
              aria-describedby="econ-candidate-help"
            />
            <small id="econ-candidate-help">{t("Candidate unit packaging cost (€ ≥ 0).")}</small>
          </label>

          <label className="scenario-label" htmlFor="econ-transition-cost">{t("One-time transition cost (€)")}<input
              id="econ-transition-cost"
              type="text"
              inputMode="decimal"
              value={transitionCost}
              onChange={(e) => setTransitionCost(e.target.value)}
              placeholder={t("Optional · e.g. 50000")}
              aria-describedby="econ-trans-help"
            />
            <small id="econ-trans-help">{t("Optional tooling / switch costs. Blank = none supplied.")}</small>
          </label>
        </div>

        <div className="scenario-actions">
          <button type="submit" className="scenario-pill active" disabled={evaluating}>
            {t(evaluating ? 'Calculating…' : 'Evaluate economic scenario')}
          </button>
          <button type="button" className="scenario-pill" onClick={resetScenario}>{t("Reset economic scenario")}</button>
        </div>
      </form>

      {t(validation && <p className="validation-alert" role="alert">{t(validation)}</p>)}
      {t(error && <div className="status-panel error-panel" role="alert"><p>{t(error)}</p></div>)}

      {t(result && (
        <div className="economic-results-container" aria-live="polite">
          {t(isBlocked && (
            <div role="alert" className="blocking-alert-box economic-blocked-alert">
              <h4>{t("⛔ THEORETICAL / NON-ACTIONABLE")}</h4>
              <p>{t("Candidate is operationally BLOCKED for the evaluated context. Economic values are scenario arithmetic only and do not represent an implementable business case.")}</p>
            </div>
          ))}

          <div className="executive-strip" aria-label={t("Economic Results Summary")}>
            {/* Card 1: Annual Packaging Spend */}
            <div className={`exec-card ${isBlocked ? 'blocked-card' : ''}`}>
              <span className="exec-kicker">{t("Annual Packaging Spend")}</span>
              <div className="exec-main-value">
                <span>{t(formatCurrency(result.current_annual_spend_eur))}{t(" → ")}{t(formatCurrency(result.candidate_annual_spend_eur))}</span>
              </div>
              <span className="exec-meta">{t("Based on ")}{t(result.annual_units.toLocaleString('en-US'))}{t(" units/year (")}{t(formatCurrency(result.current_cost_eur_per_unit))}{t(" vs ")}{t(formatCurrency(result.candidate_cost_eur_per_unit))}{t("/unit)")}</span>
            </div>

            {/* Card 2: Annual Packaging-Cost Delta */}
            <div className={`exec-card ${isBlocked ? 'blocked-card' : result.annual_cost_delta_eur < 0 ? 'eligible-card' : result.annual_cost_delta_eur > 0 ? 'review-card' : ''}`}>
              <span className="exec-kicker">{t("Annual Cost Delta")}</span>
              <div className="exec-main-value">
                <span className={`exec-delta-badge ${isBlocked ? 'theoretical' : result.annual_cost_delta_eur < 0 ? 'eligible-card' : result.annual_cost_delta_eur > 0 ? 'nonpositive' : ''}`}>
                  {t(formatDeltaCurrency(result.annual_cost_delta_eur))}
                </span>
              </div>
              <span className="exec-meta">
                {t(result.annual_cost_delta_eur > 0 && 'Additional annual packaging cost (candidate costs more)')}
                {t(result.annual_cost_delta_eur === 0 && 'No annual packaging-cost change')}
                {t(result.annual_cost_delta_eur < 0 && 'Annual packaging-cost saving (candidate costs less)')}
              </span>
            </div>

            {/* Card 3: First-year cost delta if supplied */}
            {t(result.first_year_cost_delta_eur !== null && (
              <div className={`exec-card ${isBlocked ? 'blocked-card' : ''}`}>
                <span className="exec-kicker">{t("First-Year Transition Impact")}</span>
                <div className="exec-main-value">
                  <span>{t(formatFirstYearDeltaCurrency(result.first_year_cost_delta_eur))}</span>
                </div>
                <span className="exec-meta">{t("Includes ")}{t(formatCurrency(result.one_time_transition_cost_eur))}{t(" one-time transition cost")}</span>
              </div>
            ))}

            {/* Card 4: Annual Virgin Plastic Avoided */}
            <div className="exec-card">
              <span className="exec-kicker">{t("Annual Virgin Plastic Avoided")}</span>
              <div className="exec-main-value">
                <span>
                  {t(result.annual_virgin_plastic_reduction_kg !== null && result.annual_virgin_plastic_reduction_kg > 0
                    ? formatKg(result.annual_virgin_plastic_reduction_kg)
                    : result.annual_virgin_plastic_reduction_kg === 0
                    ? '0 kg / year'
                    : result.annual_virgin_plastic_reduction_kg !== null && result.annual_virgin_plastic_reduction_kg < 0
                    ? 'Increases'
                    : 'N/A')}
                </span>
              </div>
              <span className="exec-meta">
                {t(result.annual_virgin_plastic_reduction_kg !== null && result.annual_virgin_plastic_reduction_kg > 0 &&
                  `≈ ${(result.annual_virgin_plastic_reduction_kg / 1000).toLocaleString('en-US', { maximumFractionDigits: 2 })} t/year avoided`)}
                {t(result.annual_virgin_plastic_reduction_kg === 0 && 'No change — zero virgin-plastic reduction')}
                {t(result.annual_virgin_plastic_reduction_kg !== null && result.annual_virgin_plastic_reduction_kg < 0 &&
                  `Virgin-plastic use increases by ${formatKg(Math.abs(result.annual_virgin_plastic_reduction_kg))}`)}
                {t(result.annual_virgin_plastic_reduction_kg === null && 'Environmental delta unavailable (INSUFFICIENT_DATA)')}
              </span>
            </div>

            {/* Card 5: Economic Delta Per Kg Virgin Plastic Avoided */}
            <div className={`exec-card ${isBlocked ? 'blocked-card' : ''}`}>
              <span className="exec-kicker">{t("Economic Delta per kg Avoided")}</span>
              <div className="exec-main-value">
                <span>
                  {t(result.incremental_cost_per_kg_avoided_eur !== null
                    ? `${result.incremental_cost_per_kg_avoided_eur > 0 ? '+' : ''}${result.incremental_cost_per_kg_avoided_eur.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €/kg`
                    : 'N/A')}
                </span>
              </div>
              <span className="exec-meta">
                {t(result.incremental_cost_per_kg_avoided_eur !== null ? (
                  result.incremental_cost_per_kg_avoided_eur > 0
                    ? `Each kg of avoided virgin plastic corresponds to an additional €${result.incremental_cost_per_kg_avoided_eur.toFixed(2)} packaging cost.`
                    : result.incremental_cost_per_kg_avoided_eur === 0
                    ? 'Packaging spend is neutral per kg of virgin plastic avoided.'
                    : `Candidate reduces virgin plastic while reducing packaging spend by €${Math.abs(result.incremental_cost_per_kg_avoided_eur).toFixed(2)} per kg avoided.`
                ) : comparison.reduction_g === 0 ? (
                  'N/A — no virgin-plastic reduction'
                ) : comparison.reduction_g !== null && comparison.reduction_g < 0 ? (
                  'N/A — candidate increases virgin-plastic use'
                ) : (
                  'N/A — environmental delta unavailable'
                ))}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
