import type { ComponentBoundary, EligibilityStatus, Package } from '../api/contracts';
import { format } from './EvidenceDetails';

interface ProductVisualProps {
  pkg: Package;
  boundary?: ComponentBoundary;
  roleLabel: string;
  eligibilityStatus?: EligibilityStatus;
}

function inferShape(pkg: Package, boundary?: ComponentBoundary): 'bottle' | 'hinged' | 'pot' | 'tray' {
  if (boundary === 'BOTTLE_AND_CLOSURE' || pkg.id.includes('bottle') || pkg.id.includes('500ml')) {
    return 'bottle';
  }
  if (boundary === 'HINGED_COMPLETE_PACK' || pkg.id.includes('hinged')) {
    return 'hinged';
  }
  if (pkg.id.includes('pot') || pkg.id.includes('unipak')) {
    return 'pot';
  }
  return 'tray';
}

export function ProductVisual({
  pkg,
  boundary,
  roleLabel,
  eligibilityStatus,
}: ProductVisualProps) {
  const shape = inferShape(pkg, boundary);
  const maxTemp = pkg.capabilities?.max_temperature_c?.value ?? pkg.max_temperature_c ?? null;
  const microwave = pkg.capabilities?.microwave_safe?.value ?? pkg.microwave_safe ?? null;
  const primaryComponent = pkg.components[0];

  return (
    <div className={`picture-product ${eligibilityStatus ? `visual-${eligibilityStatus}` : ''}`}>
      <div className="img-product schematic-visual-card" role="img" aria-label={`Schematic packaging illustration for ${pkg.label} (${boundary ?? 'represented components'})`}>
        <div className="schematic-top-row">
          <span className="schematic-role-chip">{roleLabel}</span>
          {boundary && <span className="schematic-boundary-chip">{boundary}</span>}
        </div>

        <div className="schematic-svg-wrap" aria-hidden="true">
          {shape === 'bottle' && (
            <svg viewBox="0 0 160 120" className="schematic-svg">
              <rect x="68" y="10" width="24" height="14" rx="4" fill="#86efac" stroke="#dcfce7" strokeWidth="2.5" />
              <path
                d="M64 24 L96 24 L108 46 L108 102 C108 106 104 110 100 110 L60 110 C56 110 52 106 52 102 L52 46 Z"
                fill="rgba(220, 252, 231, 0.18)"
                stroke="#bbf7d0"
                strokeWidth="2.5"
              />
              <line x1="55" y1="62" x2="105" y2="62" stroke="#86efac" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="55" y1="84" x2="105" y2="84" stroke="#86efac" strokeWidth="1.5" strokeDasharray="4 3" />
            </svg>
          )}

          {shape === 'hinged' && (
            <svg viewBox="0 0 160 120" className="schematic-svg">
              <polygon
                points="28,48 52,22 128,22 140,48"
                fill="rgba(220, 252, 231, 0.14)"
                stroke="#86efac"
                strokeWidth="2.2"
              />
              <polygon
                points="22,56 138,56 126,98 34,98"
                fill="rgba(220, 252, 231, 0.22)"
                stroke="#bbf7d0"
                strokeWidth="2.5"
              />
              <line x1="20" y1="52" x2="140" y2="52" stroke="#fde047" strokeWidth="2" />
            </svg>
          )}

          {shape === 'pot' && (
            <svg viewBox="0 0 160 120" className="schematic-svg">
              <ellipse cx="80" cy="36" rx="48" ry="12" fill="rgba(220, 252, 231, 0.25)" stroke="#bbf7d0" strokeWidth="2.5" />
              <path
                d="M32 36 L44 94 C44 101 60 106 80 106 C100 106 116 101 116 94 L128 36"
                fill="rgba(220, 252, 231, 0.16)"
                stroke="#bbf7d0"
                strokeWidth="2.5"
              />
            </svg>
          )}

          {shape === 'tray' && (
            <svg viewBox="0 0 160 120" className="schematic-svg">
              <polygon
                points="20,40 44,24 136,24 144,40"
                fill="rgba(220, 252, 231, 0.15)"
                stroke="#86efac"
                strokeWidth="2"
              />
              <polygon
                points="18,40 142,40 128,94 32,94"
                fill="rgba(220, 252, 231, 0.22)"
                stroke="#bbf7d0"
                strokeWidth="2.5"
              />
              <line x1="42" y1="58" x2="118" y2="58" stroke="#86efac" strokeWidth="1.5" strokeDasharray="5 4" />
              <line x1="46" y1="74" x2="114" y2="74" stroke="#86efac" strokeWidth="1.5" strokeDasharray="5 4" />
            </svg>
          )}
        </div>

        <div className="schematic-specs">
          {primaryComponent && (
            <span className="schematic-spec-pill">
              {primaryComponent.material} · {format(primaryComponent.plastic_mass_g.value, 'g')}
            </span>
          )}
          <div className="schematic-cap-row">
            <span className="schematic-cap-tag">
              Max temp: {maxTemp === null ? 'Unknown (N/A)' : `${maxTemp}°C`}
            </span>
            <span className="schematic-cap-tag">
              MW: {microwave === null ? 'Unknown (N/A)' : microwave ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <small className="schematic-disclaimer">
          Schematic geometry · Not supplier article photo
        </small>
      </div>
    </div>
  );
}
