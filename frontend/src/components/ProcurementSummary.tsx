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
        <span className="box-section-title">Romania Procurement & Circularity</span>
        <p className="sub-note">No commercial procurement evidence currently registered.</p>
      </div>
    );
  }

  return (
    <div className="procurement-summary-box">
      <div className="procurement-header">
        <div>
          <span className="box-section-title">🇷🇴 Romania Procurement & Circularity Reality</span>
          <span className="procurement-disclaimer">
            Supplier catalog listing ≠ confirmed stock or commercial supply agreement
          </span>
        </div>
      </div>

      <div className="procurement-grid">
        {procurement?.status && (
          <MetricField label="Procurement Status" field={procurement.status} />
        )}
        {procurement?.supplier && (
          <MetricField label="Supplier / Quoted Route" field={procurement.supplier} />
        )}
        {procurement?.romania_unit_price && (
          <MetricField
            label="Quoted Unit Price"
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

      {procurement?.supplier_contact_action && (
        <div className="procurement-action-note">
          <strong>Procurement Next Step:</strong> {procurement.supplier_contact_action}
        </div>
      )}

      {eol && (
        <div className="eol-details-section">
          <strong className="eol-heading">End-of-Life & Circularity Reality in Romania:</strong>
          <div className="eol-chips">
            {eol.design_for_recycling && (
              <span className="eol-chip">
                Design for recycling: {String(eol.design_for_recycling.value ?? 'Evidence required')}
              </span>
            )}
            {eol.certification && (
              <span className="eol-chip">
                Certification: {String(eol.certification.value ?? 'Unverified')}
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
