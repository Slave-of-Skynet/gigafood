import { useState } from 'react';
import { useTranslation } from '../i18n';
import type { ProductId, WorkflowId } from '../api/contracts';
import { PentagonRadarChart, type RadarMetric } from './PentagonRadarChart';
import { ProductAnatomyDiagram } from './ProductAnatomyDiagram';
import { ComplianceCertificateModal } from './ComplianceCertificateModal';
import { EuropeanManufacturingDossier } from './EuropeanManufacturingDossier';

const BAG_IMAGES = [
  ['user-fajita-meat.jpg', 'Preparation reference'],
  ['readychefgobags-bag-detail-highres.jpg', 'Supplier bag reference'],
  ['user-prep-salmon.jpg', 'Preparation reference'],
  ['readychefgobags-cooking-pouch.jpg', 'Retail bag reference'],
];
const TRAY_IMAGES = [
  ['silicone-lid-aluminium-tray-combo.jpg', 'Tray and lid visualization'],
  ['silicone-lid-rim-microvent.jpg', 'Rim and vent visualization'],
  ['kmpackaging-smoothwall-tray.jpg', 'Supplier tray reference'],
  ['kmpackaging-kfoil-tray.jpg', 'Supplier tray reference'],
];
const CHECKS = [
  ['Thermal verification', '250°C is a proposed oven setting, not a qualified package temperature limit. Film cooling is a hypothesis requiring measurement.'],
  ['Materials and migration', 'Confirm the complete bill of materials, coatings, seams and food-contact migration under the intended conditions. No PFAS-free or zero-migration result is established.'],
  ['Separation and collection', 'Peel separation and local collection acceptance need testing and confirmation. No guaranteed recycling rate or bin color is specified.'],
  ['Fit, vents and reuse', 'Seal fit, leakage, steam release, cleaning and reuse life require tests on the exact assembled pack. No leak-free or cycle-life result is available.'],
];
const RADAR_LABELS = ['Thermal verification', 'Plastic mass scenario', 'Collection feasibility', 'Handling and food quality', 'Commercial feasibility'];
// Existing manual scores are illustrative judgments, with no measurement provenance.
function radarMetrics(tray: boolean): RadarMetric[] {
  const scores = tray ? [99, 98, 97, 99, 91] : [98, 91, 96, 95, 92];
  const comparator = tray ? [20, 5, 25, 40, 60] : [20, 5, 25, 35, 60];
  return RADAR_LABELS.map((label, i) => ({ label, shortLabel: label, productScore: scores[i], worstScore: comparator[i],
    productNote: 'Manual score; performance requires configuration-specific evidence.',
    worstNote: 'Assumed comparator, not a tested product ranking.' }));
}

export function UniversalPouchShowcase({ onApplyWorkflow }: {
  onApplyWorkflow?: (productId: ProductId, workflowId: WorkflowId) => void;
}) {
  const t = useTranslation();
  const [selectedProductTab, setSelectedProductTab] = useState<'bag' | 'tray'>('bag');
  const [bagImgIdx, setBagImgIdx] = useState(0);
  const [trayImgIdx, setTrayImgIdx] = useState(0);
  const [monthlyVolume, setMonthlyVolume] = useState(25000);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const tray = selectedProductTab === 'tray';
  const images = tray ? TRAY_IMAGES : BAG_IMAGES;
  const imageIndex = tray ? trayImgIdx : bagImgIdx;
  const setImageIndex = tray ? setTrayImgIdx : setBagImgIdx;
  const name = tray ? 'Aluminium tray + LSR lid concept' : 'Foil pouch concept';
  // Preserve the existing illustrative arithmetic and fixed inputs; no research data are changed.
  const plasticPerIncumbentG = 32;
  const currentPlasticG = tray ? 0.0 : 2.8;
  const plasticSavedKg = Math.round(monthlyVolume * (plasticPerIncumbentG - currentPlasticG) / 1000);
  const plasticReductionPct = Math.round((plasticPerIncumbentG - currentPlasticG) / plasticPerIncumbentG * 100);
  const priceLowUsd = tray ? 0.25 : 0.15;
  const priceHighUsd = tray ? 0.40 : 0.35;
  const avgCostRon = Math.round(monthlyVolume * ((priceLowUsd + priceHighUsd) / 2) * 4.6);

  return <div className="universal-showcase-container" id="universal-pouch-showcase">
    <section className="showcase-hero-banner">
      <span className="showcase-badge-pill">{t('ILLUSTRATIVE CONCEPT')}</span>
      <h2 className="showcase-main-title">{t('Engineering concepts for a proposed oven workflow')}</h2>
      <p className="showcase-main-subtitle">{t('No configuration-specific thermal, food-contact or conformity approval has been established in this showcase.')}</p>
      <div className="showcase-core-pillars-grid">{CHECKS.map(([title, text]) => <div className="pillar-card" key={title}>
        <div><strong>{t(title)}</strong><p>{t(text)}</p></div>
      </div>)}</div>
      <div className="showcase-cert-action-row"><button type="button" className="showcase-cert-btn" onClick={() => setIsCertModalOpen(true)}>
        {t('Open engineering qualification checklist')}
      </button></div>
    </section>
    <div className="showcase-tabs-bar" role="group" aria-label={t('Proposed configuration')}>
      <button type="button" className={`showcase-tab-btn ${!tray ? 'active' : ''}`} aria-pressed={!tray} onClick={() => setSelectedProductTab('bag')}>{t('Foil pouch concept')}</button>
      <button type="button" className={`showcase-tab-btn ${tray ? 'active' : ''}`} aria-pressed={tray} onClick={() => setSelectedProductTab('tray')}>{t('Aluminium tray + LSR lid concept')}</button>
    </div>
    <article className={`showcase-product-detail-card ${tray ? 'tray-theme' : 'bag-theme'}`}>
      <div className="product-detail-header-block"><h3 className="product-title-text">{t(name)}</h3>
        <p className="product-concept-text">{t('Proposed 250°C workflow — qualification not established')}</p>
      </div>
      <div className="product-carousel-deck">
        <h4>{t('Reference gallery')}</h4>
        <p className="disclosure-banner">{t('Reference image only. It does not establish that this exact PackShift configuration was manufactured, tested or approved.')}</p>
        <div className="carousel-main-viewport">
          <button type="button" className="carousel-nav-btn prev-btn" aria-label={t('Previous image')} onClick={() => setImageIndex((imageIndex + images.length - 1) % images.length)}>‹</button>
          <div className="carousel-image-frame"><img src={`${import.meta.env.BASE_URL}reference-packaging/${images[imageIndex][0]}`} alt={t(images[imageIndex][1])} className="carousel-hero-img" />
            <div className="carousel-caption-overlay"><span className="carousel-view-tag">{imageIndex + 1} / {images.length}: {t(images[imageIndex][1])}</span></div>
          </div>
          <button type="button" className="carousel-nav-btn next-btn" aria-label={t('Next image')} onClick={() => setImageIndex((imageIndex + 1) % images.length)}>›</button>
        </div>
        <div className="carousel-thumbs-strip">{images.map(([file, title], i) => <button type="button" key={file} className={`carousel-thumb-item ${i === imageIndex ? 'active' : ''}`} aria-label={`${t(title)} ${i + 1}`} aria-pressed={i === imageIndex} onClick={() => setImageIndex(i)}>
          <img src={`${import.meta.env.BASE_URL}reference-packaging/${file}`} alt={t(title)} className="thumb-preview" />
        </button>)}</div>
      </div>
      <div className="product-pricing-deck"><div className="pricing-card wholesale-card">
        <div className="pricing-badge wholesale-badge">{t('Commercial assumptions — not supplier quotes')}</div>
        <p>{t('Illustrative unit price input')}: <strong>${priceLowUsd.toFixed(2)}–${priceHighUsd.toFixed(2)}</strong></p>
        <p>{t('No current price, MOQ, tooling budget, stock availability or delivery commitment has been confirmed for this configuration.')}</p>
      </div></div>
      <div className="pros-cons-grid">
        <div className="pros-card"><h4>{t('Proposed functions and checks')}</h4><p>{t(tray
          ? 'A removable LSR lid with vents and a matching aluminium rim is proposed for manual closure and potential reuse. Fit and service life remain to be qualified.'
          : 'A viewing window, separator and foil base are proposed to combine visibility with heat transfer. The assembled configuration remains untested.')}</p></div>
        <div className="cons-card"><h4>{t('Operational limitations')}</h4><p>{t('Microwave use is not qualified. Foil, punctures, hot steam and sharp edges require a specific handling and safety assessment.')}</p></div>
      </div>
      <PentagonRadarChart productName={name} metrics={radarMetrics(tray)} />
      <ProductAnatomyDiagram key={selectedProductTab} productType={selectedProductTab} />
      {tray && <EuropeanManufacturingDossier />}
    </article>
    <section className="showcase-calculator-card">
      <div className="calc-header"><h3 className="calc-title">{t('Illustrative browser calculation')}</h3>
        <p className="calc-subtitle">{t('Fixed assumptions: baseline 32 g; pouch 2.8 g; tray scenario 0 g of single-use plastic. This excludes the reusable lid, coatings, losses and lifecycle effects.')}</p>
        <p>{t('Price assumptions: pouch $0.15–$0.35; tray combination $0.25–$0.40; fixed conversion 4.6 RON/USD. These are not current exchange rates or confirmed quotes.')}</p>
      </div>
      <label className="volume-slider-label" htmlFor="concept-volume">{t('Monthly units')}: <strong>{monthlyVolume.toLocaleString()}</strong></label>
      <input id="concept-volume" type="range" min="5000" max="100000" step="5000" value={monthlyVolume} onChange={e => setMonthlyVolume(Number(e.target.value))} className="calc-range-input" />
      <div className="calc-results-grid">
        <div className="calc-metric-subcard"><span className="metric-caption">{t('Modeled plastic reduction')}</span><strong className="metric-large green">{plasticReductionPct}%</strong></div>
        <div className="calc-metric-subcard"><span className="metric-caption">{t('Modeled plastic difference per month')}</span><strong className="metric-large green">{plasticSavedKg.toLocaleString()} kg</strong></div>
        <div className="calc-metric-subcard"><span className="metric-caption">{t('Illustrative monthly budget')}</span><strong className="metric-large">{avgCostRon.toLocaleString()} RON</strong></div>
      </div>
      <p>{t('No measured environmental saving or procurement offer is implied.')}</p>
      <button type="button" className="showcase-apply-btn" onClick={() => onApplyWorkflow?.('P1', 'LITERAL_OVEN_250C_THEN_HOLD')}>{t('Open the decision engine for this workflow')}</button>
    </section>
    <ComplianceCertificateModal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} productType={selectedProductTab} />
  </div>;
}
