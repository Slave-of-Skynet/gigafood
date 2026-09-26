import type { EolDetails, ProcurementDetails } from '../api/contracts';
import { MetricField } from './MetricField';

interface ProcurementSummaryProps {
  procurement?: ProcurementDetails | null;
  eol?: EolDetails | null;
}

export function ProcurementSummary({ procurement, eol }: ProcurementSummaryProps) {
  if (!procurement && !eol) {
    return (
      <div className="procurement-summary-box empty-box">
        <span className="box-section-title">Romania Procurement & End-of-Life</span>
        <p className="sub-note">No commercial procurement evidence currently registered.</p>
      </div>
    );
  }

  return (
    <div className="procurement-summary-box">
      <div className="procurement-header">
        <span className="box-section-title">🇷🇴 Romania Procurement & Circularity Status</span>
        <span className="procurement-disclaimer">
          Public listing ≠ contracted stock for 1,700 Profi stores
        </span>
      </div>

      <div className="procurement-grid">
        {procurement?.status && (
          <MetricField label="Procurement Status" field={procurement.status} />
        )}
        {procurement?.supplier && (
          <MetricField label="Nominated Supplier / Source" field={procurement.supplier} />
        )}
        {procurement?.romania_unit_price && (
          <MetricField
            label="Observed Unit Price (RON)"
            field={procurement.romania_unit_price}
            unitOverride="RON / unit"
          />
        )}
        {procurement?.order_unit && (
          <MetricField label="Pack / Order Unit" field={procurement.order_unit} />
        )}
        {procurement?.industrial_moq && (
          <MetricField label="Industrial MOQ" field={procurement.industrial_moq} />
        )}
        {procurement?.lead_time && (
          <MetricField label="Delivery Lead Time" field={procurement.lead_time} />
        )}
      </div>

      {eol && (
        <div className="eol-details-section">
          <strong className="eol-heading">End-of-Life / Recycling Reality:</strong>
          <div className="eol-chips">
            {eol.design_for_recycling && (
              <span className="eol-chip">
                Design for recycling: {String(eol.design_for_recycling.value ?? 'Unknown')}
              </span>
            )}
            {eol.certification && (
              <span className="eol-chip">
                Certification: {String(eol.certification.value ?? 'Uncertified')}
              </span>
            )}
            {eol.likely_real_world_route && (
              <span className="eol-chip route-chip">
                Likely Romanian route: {String(eol.likely_real_world_route.value ?? 'Disposal')}
              </span>
            )}
          </div>
          {eol.likely_real_world_route?.qualifier && (
            <small className="eol-qualifier">{eol.likely_real_world_route.qualifier}</small>
          )}
        </div>
      )}
    </div>
  );
}
