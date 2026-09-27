import { useTranslation } from '../i18n';
import type { EolDetails, ProcurementDetails } from '../api/contracts';
import { MetricField } from './MetricField';

interface ProcurementSummaryProps {
  procurement?: ProcurementDetails | null;
  eol?: EolDetails | null;
}

export function ProcurementSummary({ procurement, eol }: ProcurementSummaryProps) {
  const t = useTranslation();
  if (!procurement && !eol) {
    return (
      <div className="procurement-summary-box empty-box">
        <span className="box-section-title">{t("Romania Procurement & Circularity")}</span>
        <p className="sub-note">{t("No commercial procurement evidence currently registered.")}</p>
      </div>
    );
  }

  return (
    <div className="procurement-summary-box">
      <div className="procurement-header">
        <div>
          <span className="box-section-title">{t("🇷🇴 Romania Procurement & Circularity Reality")}</span>
          <span className="procurement-disclaimer">{t("Supplier catalog listing ≠ confirmed stock or commercial supply agreement")}</span>
        </div>
      </div>

      <div className="procurement-grid">
        {t(procurement?.status && (
          <MetricField label="Procurement Status" field={procurement.status} />
        ))}
        {t(procurement?.supplier && (
          <MetricField label="Supplier / Quoted Route" field={procurement.supplier} />
        ))}
        {t(procurement?.romania_unit_price && (
          <MetricField
            label="Quoted Unit Price"
            field={procurement.romania_unit_price}
            unitOverride="RON / unit"
          />
        ))}
        {t(procurement?.order_unit && (
          <MetricField label="Pack / Order Unit" field={procurement.order_unit} />
        ))}
        {t(procurement?.industrial_moq && (
          <MetricField label="Industrial MOQ" field={procurement.industrial_moq} />
        ))}
        {t(procurement?.lead_time && (
          <MetricField label="Delivery Lead Time" field={procurement.lead_time} />
        ))}
      </div>

      {t(procurement?.supplier_contact_action && (
        <div className="procurement-action-note">
          <strong>{t("Procurement Next Step:")}</strong> {t(procurement.supplier_contact_action)}
        </div>
      ))}

      {t(eol && (
        <div className="eol-details-section">
          <strong className="eol-heading">{t("End-of-Life & Circularity Reality in Romania:")}</strong>
          <div className="eol-chips">
            {t(eol.design_for_recycling && (
              <span className="eol-chip">{t("Design for recycling: ")}{t(String(eol.design_for_recycling.value ?? 'Evidence required'))}
              </span>
            ))}
            {t(eol.certification && (
              <span className="eol-chip">{t("Certification: ")}{t(String(eol.certification.value ?? 'Unverified'))}
              </span>
            ))}
            {t(eol.likely_real_world_route && (
              <span className="eol-chip route-chip">{t("Likely Romanian route: ")}{t(String(eol.likely_real_world_route.value ?? 'Disposal'))}
              </span>
            ))}
          </div>
          {t(eol.likely_real_world_route?.qualifier && (
            <small className="eol-qualifier">{t(eol.likely_real_world_route.qualifier)}</small>
          ))}
        </div>
      ))}
    </div>
  );
}
