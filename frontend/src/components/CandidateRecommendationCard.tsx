import { useState } from 'react';
import type {
  CandidateRecommendationAssessment,
  PackagingConfiguration,
  SourceReference,
} from '../api/contracts';
import { GateMatrix } from './GateMatrix';
import { MetricField } from './MetricField';
import { ProcurementSummary } from './ProcurementSummary';
import { NextActions } from './NextActions';

interface CandidateRecommendationCardProps {
  assessment: CandidateRecommendationAssessment;
  configuration?: PackagingConfiguration | null;
  sourcesMap: Record<string, SourceReference>;
  isFirstPath?: boolean;
}

export function CandidateRecommendationCard({
  assessment,
  configuration,
  sourcesMap,
  isFirstPath = false,
}: CandidateRecommendationCardProps) {
  const [showSources, setShowSources] = useState(false);
  const [showScenarios, setShowScenarios] = useState(false);
  const [showGates, setShowGates] = useState(true);

  const isBlocked = assessment.outcome === 'BLOCKED';
  const isC6 = assessment.candidate_id === 'C6';
  const configId = assessment.configuration_id;

  // Find failing gate if blocked
  const failingGates = Object.values(assessment.gates).filter((g) => g.status === 'FAIL');

  const getRoleLabel = () => {
    switch (assessment.role) {
      case 'FIRST_QUALIFICATION_PATH':
        return '1st Qualification Path (Priority 1)';
      case 'PRIORITY_ALTERNATIVE':
        return 'Priority Alternative / Fallback (Priority 2)';
      case 'ALTERNATIVE':
        return 'Evaluated Alternative';
      case 'BLOCKED':
        return 'Incompatible / Blocked';
      default:
        return assessment.role;
    }
  };

  return (
    <article
      className={`candidate-recommendation-card ${
        isFirstPath ? 'is-first-qualification-path' : ''
      } ${isBlocked ? 'is-blocked-card' : ''}`}
      id={`candidate-${assessment.candidate_id}`}
    >
      <div className="candidate-card-header">
        <div className="candidate-identity-group">
          <div className="candidate-tags-row">
            <span className="candidate-id-badge">{assessment.candidate_id}</span>
            {isC6 && configId && (
              <span className="candidate-config-badge">
                Config: <strong>{configId}</strong>
                {configuration?.role && ` · ${configuration.role}`}
              </span>
            )}
            <span className={`candidate-role-badge role-${assessment.role.toLowerCase()}`}>
              {getRoleLabel()}
            </span>
            <span
              className={`candidate-outcome-badge ${
                isBlocked ? 'outcome-blocked' : 'outcome-qualification'
              }`}
            >
              {assessment.outcome}
            </span>
          </div>

          <h3 className="candidate-name-heading">{assessment.candidate_name}</h3>
          {assessment.decision_scope && (
            <span className="candidate-scope-text">{assessment.decision_scope}</span>
          )}
        </div>
      </div>

      {/* Prominent Blocking Gate Callout (Sections 25 & 26) */}
      {isBlocked && failingGates.length > 0 && (
        <div className="blocking-alert-banner" role="alert">
          <strong className="blocking-banner-title">
            ⛔ HARD-GATE FAILURE — CANDIDATE BLOCKED FOR THIS WORKFLOW
          </strong>
          <ul className="failing-gates-list">
            {failingGates.map((fg) => (
              <li key={fg.gate_id}>
                <strong>{fg.gate_id.replace('_', ' ').toUpperCase()}:</strong> {fg.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Candidate Rationale */}
      <div className="candidate-rationale-box">
        <strong className="box-mini-title">Assessment Rationale:</strong>
        <p className="candidate-rationale-body">{assessment.rationale}</p>
      </div>

      {/* Thermal & Viewing Boundary Scope Warnings (Sections 33, 34, 35) */}
      {assessment.candidate_id === 'C5' && (
        <div className="boundary-warning-callout">
          <span className="warning-icon" aria-hidden="true">
            ℹ️
          </span>
          <div className="warning-body">
            <strong>BIOPAP Thermal & 6-Hour Boundary:</strong>
            <span>
              {' '}
              6 hours @ 90°C is family-level baseline evidence. Physical qualification of the exact
              SI-14 tray + selected sealing film + oily poultry food matrix is mandatory before deployment.
              Conflicting official documents report peak oven limits at 175°C vs 185°C.
            </span>
          </div>
        </div>
      )}

      {isC6 && configId === 'C6-RO-H' && (
        <div className="boundary-warning-callout">
          <span className="warning-icon" aria-hidden="true">
            ℹ️
          </span>
          <div className="warning-body">
            <strong>Aluminium High-Temperature Boundary:</strong>
            <span>
              {' '}
              The 280°C heat claim applies exclusively to the bare aluminium container body.
              Transparent viewing closure and retail hermetic seal remain completely unverified for
              the 250°C oven cycle and must be qualified separately.
            </span>
          </div>
        </div>
      )}

      {/* 6 Hard Gates Evaluation */}
      <div className="card-section hard-gates-section">
        <div className="section-toggle-header">
          <strong className="section-title">6 Non-Compensatory Hard Gates</strong>
          <button
            type="button"
            className="toggle-text-btn"
            onClick={() => setShowGates(!showGates)}
          >
            {showGates ? 'Collapse Gates' : 'Show 6 Gates'}
          </button>
        </div>
        {showGates && <GateMatrix gates={assessment.gates} />}
      </div>

      {/* Measurable Physical & Material Metrics */}
      <div className="card-section metrics-section">
        <strong className="section-title">Measurable Physical & Material Metrics</strong>
        <div className="metrics-grid">
          <MetricField
            label="Total Package Mass"
            field={assessment.metrics.total_package_mass_g}
            unitOverride="g"
          />
          <MetricField
            label="Plastic Mass in Pack"
            field={assessment.metrics.plastic_mass_g}
            unitOverride="g"
          />
          <MetricField
            label="Virgin Plastic Mass"
            field={assessment.metrics.virgin_plastic_mass_g}
            unitOverride="g"
          />
          <MetricField
            label="Recycled Material Content"
            field={assessment.metrics.recycled_material_fraction}
            unitOverride="%"
          />
          <MetricField
            label="Renewable Content"
            field={assessment.metrics.renewable_material_fraction}
            unitOverride="%"
          />
          {assessment.procurement?.romania_unit_price && (
            <MetricField
              label="Romania Quoted Price"
              field={assessment.procurement.romania_unit_price}
              unitOverride="RON / unit"
            />
          )}
        </div>
      </div>

      {/* Romania Procurement & EOL Route */}
      <ProcurementSummary procurement={assessment.procurement} eol={assessment.eol} />

      {/* Conditional Screening Scenarios (Opt-in) */}
      {assessment.scenario_details && assessment.scenario_details.length > 0 && (
        <div className="card-section scenario-details-section">
          <button
            type="button"
            className="scenario-toggle-btn"
            onClick={() => setShowScenarios(!showScenarios)}
          >
            {showScenarios ? 'Hide Model Scenarios' : `Conditional Screening Scenarios (${assessment.scenario_details.length})`}
          </button>

          {showScenarios && (
            <div className="scenario-details-drawer">
              <span className="scenario-disclaimer">
                Screening models only — not verified savings. Incumbent baseline is estimated.
              </span>
              <div className="scenario-cards-grid">
                {assessment.scenario_details.map((sc) => (
                  <div key={sc.scenario_id} className="scenario-subcard">
                    <strong>{sc.label}</strong>
                    {sc.reduction_pct && (
                      <MetricField label="Virgin Reduction (%)" field={sc.reduction_pct} unitOverride="%" />
                    )}
                    {sc.reduction_g && (
                      <MetricField label="Virgin Reduction (g)" field={sc.reduction_g} unitOverride="g" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Limitations & Next Actions */}
      <NextActions
        limitations={assessment.limitations}
        actions={assessment.next_qualification_actions}
      />

      {/* Referenced Sources Ledger */}
      {assessment.referenced_source_ids && assessment.referenced_source_ids.length > 0 && (
        <div className="card-section sources-drawer-section">
          <button
            type="button"
            className="sources-toggle-btn"
            onClick={() => setShowSources(!showSources)}
          >
            {showSources
              ? 'Hide Referenced Sources'
              : `Inspect Citations & Evidence Ledger (${assessment.referenced_source_ids.length} sources)`}
          </button>

          {showSources && (
            <div className="sources-list-drawer">
              {assessment.referenced_source_ids.map((sid) => {
                const sref = sourcesMap[sid];
                if (!sref) {
                  return (
                    <div key={sid} className="source-item missing-source">
                      <code>{sid}</code>: Citation details not mapped in candidates response.
                    </div>
                  );
                }
                return (
                  <div key={sid} className="source-item">
                    <div className="source-header-row">
                      <span className="source-id-pill">{sref.source_id}</span>
                      {sref.tier && <span className="source-tier-tag">Tier {sref.tier}</span>}
                      {sref.romania_evidence && (
                        <span className="source-ro-tag">🇷🇴 Romania Source</span>
                      )}
                    </div>
                    <strong className="source-title-text">{sref.title}</strong>
                    {sref.findings && <p className="source-findings">{sref.findings}</p>}
                    {sref.limitations && (
                      <small className="source-limitations">
                        <strong>Limitations:</strong> {sref.limitations}
                      </small>
                    )}
                    {sref.url && (
                      <a
                        href={sref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-external-link"
                      >
                        Inspect Official Source Document ↗
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
