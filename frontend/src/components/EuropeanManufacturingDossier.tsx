import { useState } from 'react';
import { useTranslation } from '../i18n';

const LEADS = {"silicone": ["Protolabs Europe", "Hubs EU (Protiq)", "TMRubber", "SILCONIC®", "SternMaute", "Plax Group", "Rico Group"], "aluminium": ["Contital S.r.l.", "Plus Pack", "Coppice Alupack", "Alupkg (Alufoil)", "iPac Packaging"]};
export function EuropeanManufacturingDossier() {
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<'silicone' | 'aluminium' | 'negotiations'>('silicone');
  const tabs = [['silicone', 'LSR investigation leads'], ['aluminium', 'Aluminium investigation leads'], ['negotiations', 'Supplier enquiry checklist']] as const;
  return <div className="manufacturing-dossier-card">
    <div className="dossier-header-bar"><h3 className="dossier-main-title">{t('Potential supplier leads — not qualified partners')}</h3>
      <p className="dossier-lead">{t('Names retained from the existing research as investigation leads. Capability for this configuration, location, MOQ, price, tooling, lead time and certification scope require direct confirmation.')}</p>
    </div>
    <div className="dossier-subtabs-nav">{tabs.map(([id, label]) => <button type="button" key={id} aria-pressed={activeTab === id} className={`dossier-subtab-btn ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>{t(label)}</button>)}</div>
    <div className="dossier-tab-pane">
      {activeTab === 'negotiations' ? <div className="negotiations-columns-grid">
        <div className="negotiation-guide-card"><p>{t('Request drawings, complete material grades and surface treatments, intended-use limits, traceable documentation and configuration-specific test reports.')}</p></div>
        <div className="negotiation-guide-card"><p>{t('Request a written quote with volume, tooling ownership, tolerances, sampling, delivery and payment terms. No zero-tooling-cost or manufacturing-readiness promise is established.')}</p></div>
      </div> : <ul className="negotiation-points-list">{LEADS[activeTab].map(name => <li key={name}><strong>{name}</strong> — {t('Supplier confirmation needed')}</li>)}</ul>}
    </div>
  </div>;
}
