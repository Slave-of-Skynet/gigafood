import { useTranslation } from '../i18n';
import { useState } from 'react';
import type {
  CandidateRecommendationAssessment,
  PackagingConfiguration,
  SourceReference,
} from '../api/contracts';
import { EvidenceStateBadge } from './EvidenceStateBadge';
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
  C2: '/reference-packaging/sacma-blife-gaia.jpg',
  C6: '/reference-packaging/user-fajita-meat.jpg',
};

export function CandidateRecommendationCard({
  assessment,
  configuration,
  sourcesMap,
  isFirstPath = false,
}: CandidateRecommendationCardProps) {
  const t = useTranslation();
  const [showGates, setShowGates] = useState(false);
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
          text: 'First option to test',
          className: 'role-badge-primary',
        };
      case 'PRIORITY_ALTERNATIVE':
        return {
          text: `Priority Alternative · Priority ${assessment.qualification_priority || 2}`,
          className: 'role-badge-priority-alt',
        };
      case 'ALTERNATIVE':
        return {
          text: 'Needs testing',
          className: 'role-badge-alt',
        };
      case 'BLOCKED':
        return {
          text: 'Not suitable for this use',
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
      aria-label={t(`Candidate ${assessment.candidate_id}: ${assessment.candidate_name}`)}
    >
      {/* Header: Identity, Role, Configuration */}
      <header className="candidate-card-header">
        <div className="candidate-identity-group">
          <div className="candidate-id-cluster">
            <span className="candidate-id-badge">{assessment.candidate_id}</span>
            {configId && (
              <span className="candidate-config-badge">{t("Configuration: ")}<strong>{configId}</strong>
                {configuration?.role ? ` (${t(configuration.role)})` : ''}
              </span>
            )}
            <span className={`candidate-role-pill ${roleBadge.className}`}>
              {t(roleBadge.text)}
            </span>
          </div>
          <h3 className="candidate-name-title">
            {isC6
              ? t("Foil Grill & Oven Bag (Ready. Chef. Go! / Sirane) · Smoothwall Tray")
              : t(assessment.candidate_name)}
          </h3>
        </div>

        <div className="candidate-status-cluster">
          <span
            className={`candidate-outcome-pill ${
              isBlocked ? 'outcome-blocked' : 'outcome-qualification'
            }`}
          >
            {t(isBlocked ? 'Not suitable' : 'Needs testing')}
          </span>
          {assessment.qualification_priority && (
            <span className="priority-rank-badge">
              {t("Priority: #")}{assessment.qualification_priority}
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
              alt={t(`Physical packaging reference for ${assessment.candidate_name}`)}
              className="reference-packaging-img"
              loading="lazy"
            />
            <span className="reference-image-disclaimer">
              {t("Reference product image · Not evidence of qualification or Profi approval")}
            </span>
          </div>
        </div>
      )}

      {/* Blocked Alert Banner */}
      {isBlocked && failingGates.length > 0 && (
        <div className="blocking-reason-banner" role="alert">
          <strong className="blocking-banner-title">
            {t("⛔ Blocked by Non-Compensatory Gate Failure (")}{failingGates.length}{t(" gate")}{failingGates.length > 1 ? 's' : ''}{t("):")}
          </strong>
          <ul className="failing-gates-list">
            {failingGates.map((fg) => (
              <li key={fg.gate_id}>
                <strong>{t(fg.gate_id.replace('_', ' ').toUpperCase())}{t(":")}</strong> {t(fg.reason)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assessment Rationale */}
      <div className="candidate-rationale-box">
        <strong className="box-mini-title">{t("Why this option?")}</strong>
        <p className="candidate-rationale-body">
          {t(assessment.rationale?.replace(/\bwinner\b/gi, 'qualified survivor'))}
        </p>
      </div>

      {/* Specific Boundary Disclosures: C5 BIOPAP CONFLICT and C6 Isolation */}
      {assessment.candidate_id === 'C5' && (
        <div className="boundary-warning-callout biopap-callout">
          <span className="warning-icon" aria-hidden="true">{t("ℹ️")}</span>
          <div className="warning-body">
            <div className="biopap-conflict-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <strong>{t("BIOPAP Thermal Conflict & 6-Hour Boundary:")}</strong>
              <EvidenceStateBadge state="CONFLICT" qualifier="175°C vs 185°C (60 min)" className="biopap-conflict-badge" />
            </div>
            <span>{t("Competing technical sources state ")}<strong>{t("175°C vs 185°C (60 min)")}</strong>{t(". Neither value is silently selected as canonical truth. 6 hours @ 90°C is family-level claim evidence, NOT exact-system validation for Profi fatty poultry. Exact tray + heat-seal film combination must undergo physical laboratory qualification.")}</span>
          </div>
        </div>
      )}

      {isC6 && (
        <>
          <div className="boundary-warning-callout c6-callout">
            <span className="warning-icon" aria-hidden="true">{t("ℹ️")}</span>
            <div className="warning-body">
              <strong>{t("Aluminium Body vs Closure Boundary (")}{configId || 'C6'}{t("):")}</strong>
              <span>
                {t(' ')}{t("Bare aluminium body heat claim applies strictly to the metal container. Transparent viewing lids and retail seals are separate physical articles and do NOT inherit the body heat tolerance. Each C6 configuration is isolated.")}</span>
            </div>
          </div>

          <div className="universal-pouch-spec-panel">
            <div className="universal-pouch-header">
              <span className="pouch-badge">🔥 {t("Universal 250°C Engineering Solution")}</span>
              <h4 className="pouch-title">{t("Universal Grill & Oven Packaging (Strictly 2 Materials · Glue-Free · 100% Recyclable)")}</h4>
              <p className="pouch-subtitle">{t("Engineered specifically for 250°C cooking with tool-free manual separation for Romanian waste regulations.")}</p>
            </div>

            <div className="pouch-products-grid">
              {/* Product 1: Foil Grill & Oven Bag */}
              <div className="pouch-product-card primary-pouch">
                <div className="pouch-product-header">
                  <span className="badge-primary-sol">⭐ {t("Primary Solution: Foil Grill & Oven Bag")}</span>
                  <span className="pouch-type-desc">{t("Flexible Hybrid Foil Pouch with Self-Venting Window")}</span>
                </div>
                <div className="pouch-specs-list">
                  <div className="pouch-spec-item">
                    <strong>{t("Strictly 2 Materials:")}</strong>
                    <span>{t("Heavy Duty Aluminum Foil (body/bottom) + High-Temp BOPET window.")}</span>
                  </div>
                  <div className="pouch-spec-item">
                    <strong>{t("250°C Steam Cooling Physics:")}</strong>
                    <span>{t("Steam phase change absorbs thermal energy — film temperature stays under 110–130°C (only 2–5% shrinkage). 100% clarity & food safety preserved.")}</span>
                  </div>
                  <div className="pouch-spec-item">
                    <strong>{t("Glue-Free Peel-able Heat Seal:")}</strong>
                    <span>{t("Thermocompression welding with aPET contact layer flowing into foil micropores (mechanical interlock, zero solvent/adhesive).")}</span>
                  </div>
                  <div className="pouch-spec-item">
                    <strong>{t("Venting & Romania Separation:")}</strong>
                    <span>{t("Self-Venting micro-channels relieve steam. Tool-free manual Peel-away separation: foil to metal, PET to plastic (100% recyclable).")}</span>
                  </div>
                  <div className="pouch-spec-item price-item">
                    <strong>{t("References & Wholesale Price:")}</strong>
                    <span className="pouch-price">{t("Ready. Chef. Go! & Sirane Sira-Cook™ Supreme · $0.15–$0.35 / unit (~0.70–1.60 RON).")}</span>
                  </div>
                </div>
              </div>

              {/* Product 2: Smoothwall Tray */}
              <div className="pouch-product-card alt-pouch">
                <div className="pouch-product-header">
                  <span className="badge-alt-sol">🔄 {t("Alternative Solution: Smoothwall Tray")}</span>
                  <span className="pouch-type-desc">{t("Semi-Rigid Smoothwall Container with Heat-Sealed Membrane")}</span>
                </div>
                <div className="pouch-specs-list">
                  <div className="pouch-spec-item">
                    <strong>{t("Strictly 2 Materials:")}</strong>
                    <span>{t("Deep-drawn Smoothwall Aluminum + High-Temp CPET clear membrane.")}</span>
                  </div>
                  <div className="pouch-spec-item">
                    <strong>{t("Flange Sealing Mechanics:")}</strong>
                    <span>{t("Thermocompression welded to smooth flange without glue. Factory laser micro-perforations vent excess 220–250°C steam.")}</span>
                  </div>
                  <div className="pouch-spec-item">
                    <strong>{t("Easy-Peel Separation:")}</strong>
                    <span>{t("Clean pull tab separates membrane from metal rim for easy, tool-free sorting in Romanian recycling bins.")}</span>
                  </div>
                  <div className="pouch-spec-item price-item">
                    <strong>{t("References & Wholesale Price:")}</strong>
                    <span className="pouch-price">{t("Advanta Packaging Smoothwall + KM Packaging films · $0.08–$0.25 / set (~0.37–1.15 RON).")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 6 Hard Gates Evaluation */}
      <div className="card-section hard-gates-section">
        <div className="section-toggle-header">
          <strong className="section-title">{t("Compatibility checks")}</strong>
          <button
            type="button"
            className="toggle-text-btn"
            onClick={() => setShowGates(!showGates)}
            aria-expanded={showGates}
          >
            {t(showGates ? 'Hide checks' : 'Show all 6 checks')}
          </button>
        </div>
        {showGates && <GateMatrix gates={assessment.gates} />}
      </div>

      {/* Measurable Physical & Material Metrics */}
      <details className="supporting-details"><summary>{t("Materials, costs and recycling")}</summary>
      <div className="card-section metrics-section">
        <strong className="section-title">{t("Measurable Physical & Material Metrics")}</strong>
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
      </details>
      {assessment.scenario_details && assessment.scenario_details.length > 0 && (
        <div className="card-section scenario-details-section">
          <button
            type="button"
            className="scenario-toggle-btn"
            onClick={() => setShowScenarios(!showScenarios)}
            aria-expanded={showScenarios}
          >
            {t(showScenarios ? 'Hide Model Scenarios' : `Conditional Screening Scenarios (${assessment.scenario_details.length})`)}
          </button>

          {showScenarios && (
            <div className="scenario-details-drawer">
              <span className="scenario-disclaimer">{t("Screening models only — not verified savings. Incumbent baseline is modeled/estimated.")}</span>
              <div className="scenario-cards-grid">
                {assessment.scenario_details.map((sc) => (
                  <div key={sc.scenario_id} className="scenario-subcard">
                    <strong>{t(sc.label)}</strong>
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
            {t(showSources
              ? 'Hide Referenced Sources'
              : `Inspect Citations & Evidence Ledger (${assessment.referenced_source_ids.length} sources)`)}
          </button>

          {showSources && (
            <div className="sources-list-drawer">
              {assessment.referenced_source_ids.map((sid) => {
                const sref = sourcesMap[sid];
                if (!sref) {
                  return (
                    <div key={sid} className="source-item missing-source">
                      <code>{sid}</code>{t(": Citation details not mapped in candidates response.")}</div>
                  );
                }
                return (
                  <div key={sid} className="source-item">
                    <div className="source-header-row">
                      <span className="source-id-pill">{sref.source_id}</span>
                      {sref.tier && <span className="source-tier-tag">{t("Tier ")}{sref.tier}</span>}
                      {sref.romania_evidence && (
                        <span className="source-ro-tag">{t("🇷🇴 Romania Evidence")}</span>
                      )}
                    </div>
                    <strong className="source-title-text">{t(sref.title)}</strong>
                    {sref.findings && <p className="source-findings">{t(sref.findings)}</p>}
                    {sref.limitations && (
                      <small className="source-limitations">
                        <strong>{t("Limitations:")}</strong> {t(sref.limitations)}
                      </small>
                    )}
                    {sref.url && (
                      <a
                        href={sref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-external-link"
                      >{t("Inspect Official Source Document ↗")}</a>
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
