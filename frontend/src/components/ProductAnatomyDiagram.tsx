import { useState } from 'react';
import { useTranslation } from '../i18n';

// Proposed design dimensions from the existing UI, not physical measurements.
const BAG_LAYERS = [
  ['window', 'Polyester viewing window proposal', '12–15 µm; 2.8 g', '#0284c7'],
  ['separator', 'Cellulose separator proposal', '40–45 g/m²', '#d97706'],
  ['base', 'Aluminium base proposal', '25–30 µm', '#475569'],
  ['seam', 'Seam and vent proposal', 'aPET 1.5 µm', '#10b981'],
  ['peel', 'Peel separation proposal', '15 mm', '#8b5cf6'],
];
const TRAY_LAYERS = [
  ['lid', 'LSR lid proposal', '1.2–1.5 mm', '#0284c7'],
  ['vent', 'Steam vent proposal', '0.8–1.2 mm', '#10b981'],
  ['rim', 'Rim fit proposal', 'G-rim / L-rim', '#d97706'],
  ['base', 'Aluminium base proposal', '60–70 µm; 250/500 ml', '#475569'],
];
export function ProductAnatomyDiagram({ productType }: { productType: 'bag' | 'tray' }) {
  const t = useTranslation();
  const layers = productType === 'bag' ? BAG_LAYERS : TRAY_LAYERS;
  const [selected, setSelected] = useState(0);
  const layer = layers[selected] ?? layers[0];
  return <div className="product-anatomy-container">
    <div className="anatomy-header"><span className="anatomy-badge">{t('ILLUSTRATIVE CONCEPT')}</span>
      <h3 className="anatomy-title">{t('Proposed layer anatomy')}</h3>
      <p className="anatomy-subtitle">{t('Select a layer to inspect its proposed role. Dimensions are illustrative design assumptions, not measured specifications.')}</p>
    </div>
    <div className="anatomy-grid"><div className="anatomy-visual-stack"><div className="visual-stack-card">
      <div className="exploded-layers">{layers.map(([id, name, dimension, color], i) => <button key={id} type="button" aria-pressed={selected === i} className={`exploded-layer-row ${selected === i ? 'selected' : ''}`} onClick={() => setSelected(i)} style={{borderLeftColor: color}}>
        <span className="layer-step-badge" style={{backgroundColor: color}}>{i + 1}</span>
        <span className="layer-step-content"><span className="layer-step-name">{t(name)}</span><span className="layer-step-material">{t('Illustrative dimension assumption')}: {dimension}</span></span>
      </button>)}</div>
      <div className="cross-section-box"><div className="cross-section-title">{t('Proposed construction')}</div><div className="cross-section-layers">
        {layers.map(([id, name, , color]) => <div key={id} className="cs-bar" style={{backgroundColor: color}}>{t(name)}</div>)}
      </div></div>
    </div></div>
    <div className="anatomy-detail-panel"><div className="detail-panel-card" style={{borderColor: layer[3]}}>
      <h4 className="detail-layer-title">{t(layer[1])}</h4>
      <p className="detail-layer-desc">{t('Proposed material and joining choices require supplier confirmation, manufacturing trials and configuration-specific tests.')}</p>
      <dl className="detail-specs-grid">
        <div className="detail-spec-item"><dt>{t('Illustrative dimension assumption')}</dt><dd>{layer[2]}</dd></div>
        <div className="detail-spec-item"><dt>{t('Thermal verification')}</dt><dd>{t('Thermal limit not established')}</dd></div>
        <div className="detail-spec-item"><dt>{t('Separation and collection')}</dt><dd>{t('Collection route not established for the assembled pack')}</dd></div>
      </dl>
      <p>{t('Confirm the complete bill of materials, coatings, seams and food-contact migration under the intended conditions. No PFAS-free or zero-migration result is established.')}</p>
    </div></div></div>
  </div>;
}
