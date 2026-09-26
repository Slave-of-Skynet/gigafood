import { useState } from 'react';
import type {
  CandidateRecommendationAssessment,
  PackagingConfiguration,
  SourceReference,
} from '../api/contracts';
import { GateMatrix } from './GateMatrix';
import { MetricField } from './MetricField';
import { NextActions } from './NextActions';
import { ProcurementSummary } from './ProcurementSummary';

interface CandidateRecommendationCardProps {
  assessment: CandidateRecommendationAssessment;
  configuration?: PackagingConfiguration | null;
  sourcesMap: Record<string, SourceReference>;
  isFirstPath?: boolean;
}

// Reference packaging image map for physical concept visualization (Section 14)
const CONCEPT_REFERENCE_IMAGES: Record<string, string> = {
  C1: '/reference-packaging/sacma-gaia-futamura.jpg',
};

export function CandidateRecommendationCard({
  assessment,
  configuration,
  sourcesMap,
  isFirstPath = false,
}: CandidateRecommendationCardProps) {
  const [showGates, setShowGates] = useState(true);
  const [showScenarios, setShowScenarios] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const isBlocked = assessment.outcome === 'BLOCKED';
  const isC6 = assessment.candidate_id === 'C6';
  const configId = assessment.configuration_id;

  // Failing gates for blocked candidate explanation
  const failingGates = Object.values(assessment.gates).filter((g) => g.status === 'FAIL');

  const refImage = CONCEPT_REFERENCE_IMAGES[assessment.candidate_id];

  const getRoleBadge = () => {
    switch (assessment.role) {
      case 'FIRST_QUALIFICATION_PATH':
        return {
          text: 'First Qualification Path · Priority 1',
          className: 'role-badge-primary',
        };
      case 'PRIORITY_ALTERNATIVE':
        return {
          text: `Priority Alternative · Priority ${assessment.qualification_priority || 2}`,
          className: 'role-badge-priority-alt',
        };
      case 'ALTERNATIVE':
        return {
          text: 'Alternative Requiring Qualification',
          className: 'role-badge-alt',
        };
      case 'BLOCKED':
        return {
          text: 'Incompatible · Blocked by Hard Gate',
          className: 'role-badge-blocked',
        };
      default:
        return {
          text: assessment.role,
          className: 'role-badge-default',
        };
    }
  };

  const roleBadge = getRoleBadge();

  return (
    <article
      className={`candidate-recommendation-card ${isFirstPath ? 'is-first-path' : ''} ${
        isBlocked ? 'is-blocked' : ''
      } ${assessment.role === 'PRIORITY_ALTERNATIVE' ? 'is-priority-alt' : ''}`}
      aria-label={`Candidate ${assessment.candidate_id}: ${assessment.candidate_name}`}
    >
      {/* Header: Identity, Role, Configuration */}
      <header className="candidate-card-header">
        <div className="candidate-identity-group">
          <div className="candidate-id-cluster">
            <span className="candidate-id-badge">{assessment.candidate_id}</span>
            {configId && (
              <span className="candidate-config-badge">
                Configuration: <strong>{configId}</strong>
                {configuration?.role ? ` (${configuration.role})` : ''}
              </span>
            )}
            <span className={`candidate-role-pill ${roleBadge.className}`}>
              {roleBadge.text}
            </span>
          </div>
          <h3 className="candidate-name-title">{assessment.candidate_name}</h3>
        </div>

        <div className="candidate-status-cluster">
          <span
            className={`candidate-outcome-pill ${
              isBlocked ? 'outcome-blocked' : 'outcome-qualification'
            }`}
          >
            {assessment.outcome}
          </span>
          {assessment.qualification_priority && (
            <span className="priority-rank-badge">
              Priority: #{assessment.qualification_priority}
            </span>
          )}
        </div>
      </header>

      {/* Reference Image Amplifier (Section 14: optional visual amplifier with mandatory disclaimer) */}
      {refImage && (
        <div className="candidate-visual-reference">
          <div className="reference-image-container">
            <img
              src={refImage}
              alt={`Physical packaging reference for ${assessment.candidate_name}`}
              className="reference-packaging-img"
              loading="lazy"
            />
            <span className="reference-image-disclaimer">
              Reference product image · Not evidence of qualification or Profi approval
            </span>
          </div>
        </div>
      )}

      {/* Blocked Alert Banner */}
      {isBlocked && failingGates.length > 0 && (
        <div className="blocking-reason-banner" role="alert">
          <strong className="blocking-banner-title">
            ⛔ Blocked by Non-Compensatory Gate Failure ({failingGates.length} gate{failingGates.length > 1 ? 's' : ''}):
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

      {/* Assessment Rationale */}
      <div className="candidate-rationale-box">
        <strong className="box-mini-title">Assessment Rationale:</strong>
        <p className="candidate-rationale-body">
          {assessment.rationale?.replace(/\bwinner\b/gi, 'qualified survivor')}
        </p>
      </div>

      {/* Specific Boundary Disclosures: C5 BIOPAP CONFLICT and C6 Isolation */}
      {assessment.candidate_id === 'C5' && (
        <div className="boundary-warning-callout biopap-callout">
          <span className="warning-icon" aria-hidden="true">
            ℹ️
          </span>
          <div className="warning-body">
            <strong>BIOPAP Thermal Conflict & 6-Hour Boundary:</strong>
            <span>
              {' '}
              Competing technical sources state <strong>175°C vs 185°C</strong> (CONFLICT).
              6 hours @ 90°C is family-level claim evidence, NOT exact-system validation for Profi fatty poultry.
              Exact tray + heat-seal film combination must undergo physical laboratory qualification.
            </span>
          </div>
        </div>
      )}

      {isC6 && (
        <div className="boundary-warning-callout c6-callout">
          <span className="warning-icon" aria-hidden="true">
            ℹ️
          </span>
          <div className="warning-body">
            <strong>Aluminium Body vs Closure Boundary ({configId || 'C6'}):</strong>
            <span>
              {' '}
              Bare aluminium body heat claim applies strictly to the metal container.
              Transparent viewing lids and retail seals are separate physical articles and do NOT inherit
              the body heat tolerance. Each C6 configuration is isolated.
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
            aria-expanded={showGates}
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
              label="Quoted Unit Price"
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
            aria-expanded={showScenarios}
          >
            {showScenarios ? 'Hide Model Scenarios' : `Conditional Screening Scenarios (${assessment.scenario_details.length})`}
          </button>

          {showScenarios && (
            <div className="scenario-details-drawer">
              <span className="scenario-disclaimer">
                Screening models only — not verified savings. Incumbent baseline is modeled/estimated.
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
            aria-expanded={showSources}
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
                        <span className="source-ro-tag">🇷🇴 Romania Evidence</span>
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
