import { useTranslation } from '../i18n';

export interface RadarMetric {
  label: string;
  shortLabel: string;
  productScore: number; // 0..100
  worstScore: number;   // 0..100
  productNote: string;
  worstNote: string;
}

interface PentagonRadarChartProps {
  productName: string;
  productColor?: string;
  productFill?: string;
  metrics: RadarMetric[];
}

export function PentagonRadarChart({
  productName,
  productColor = '#059669',
  productFill = 'rgba(16, 185, 129, 0.35)',
  metrics,
}: PentagonRadarChartProps) {
  const t = useTranslation();

  const cx = 175;
  const cy = 165;
  const radius = 115;
  const count = 5;

  const getCoordinates = (index: number, score: number, offsetR = 0) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
    const r = (score / 100) * radius + offsetR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Build grid rings (20%, 40%, 60%, 80%, 100%)
  const rings = [20, 40, 60, 80, 100];
  const ringPolygons = rings.map((pct) => {
    return Array.from({ length: count })
      .map((_, i) => {
        const { x, y } = getCoordinates(i, pct);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  });

  // Build axes
  const axes = Array.from({ length: count }).map((_, i) => {
    const { x, y } = getCoordinates(i, 100);
    return { x1: cx, y1: cy, x2: x, y2: y };
  });

  // Build product polygon
  const productPoints = metrics
    .map((m, i) => {
      const { x, y } = getCoordinates(i, m.productScore);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  // Build worst alternative polygon
  const worstPoints = metrics
    .map((m, i) => {
      const { x, y } = getCoordinates(i, m.worstScore);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  // Labels coordinates
  const labelPositions = metrics.map((m, i) => {
    const { x, y, angle } = getCoordinates(i, 100, 22);
    let anchor: 'middle' | 'start' | 'end' = 'middle';
    if (Math.cos(angle) > 0.3) anchor = 'start';
    else if (Math.cos(angle) < -0.3) anchor = 'end';

    return {
      x,
      y,
      anchor,
      shortLabel: m.shortLabel,
      fullLabel: m.label,
    };
  });

  return (
    <div className="pentagon-comparison-card">
      <div className="radar-header">
        <span className="radar-tag">📊 {t("Сравнительный радар эффективности")}</span>
        <h4 className="radar-title">
          {t("График-пентагон:")} <strong>{t(productName)}</strong> {t("vs Худшая альтернатива (Стандартный PP-бокс 32г)")}
        </h4>
        <p className="radar-desc">
          {t("Оценка по 5 ключевым инженерным факторам: термостойкость, пластикоемкость, вторичная переработка, сочность продукта и экономика.")}
        </p>
      </div>

      <div className="radar-main-layout">
        {/* SVG Radar Chart */}
        <div className="radar-svg-wrapper">
          <svg viewBox="0 0 350 340" className="pentagon-svg" aria-label={t("Pentagon Radar Chart")}>
            {/* Background concentric pentagon rings */}
            {ringPolygons.map((pts, idx) => (
              <polygon
                key={idx}
                points={pts}
                className="radar-ring"
                stroke="#cbd5e1"
                strokeWidth={idx === 4 ? '1.5' : '1'}
                fill={idx === 4 ? 'rgba(248, 250, 252, 0.6)' : 'none'}
              />
            ))}

            {/* Axes lines */}
            {axes.map((a, idx) => (
              <line
                key={idx}
                x1={a.x1}
                y1={a.y1}
                x2={a.x2}
                y2={a.y2}
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ))}

            {/* Worst Alternative Polygon (Red) */}
            <polygon
              points={worstPoints}
              fill="rgba(239, 68, 68, 0.22)"
              stroke="#ef4444"
              strokeWidth="2"
              className="worst-poly"
            />
            {metrics.map((m, i) => {
              const { x, y } = getCoordinates(i, m.worstScore);
              return <circle key={i} cx={x} cy={y} r="3.5" fill="#ef4444" />;
            })}

            {/* Product Polygon (Emerald / Blue) */}
            <polygon
              points={productPoints}
              fill={productFill}
              stroke={productColor}
              strokeWidth="2.5"
              className="product-poly"
            />
            {metrics.map((m, i) => {
              const { x, y } = getCoordinates(i, m.productScore);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4.5"
                  fill={productColor}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Axis Labels */}
            {labelPositions.map((pos, idx) => (
              <text
                key={idx}
                x={pos.x}
                y={pos.y}
                textAnchor={pos.anchor}
                className="radar-axis-text"
              >
                {t(pos.shortLabel)}
              </text>
            ))}
          </svg>

          {/* Interactive Legend */}
          <div className="radar-legend">
            <div className="legend-item product-legend">
              <span className="legend-color-dot" style={{ background: productColor }} />
              <strong>{t(productName)}</strong>
              <small>({t("Наше решение")})</small>
            </div>
            <div className="legend-item worst-legend">
              <span className="legend-color-dot worst-dot" />
              <strong>{t("Худшая альтернатива (PP)")}</strong>
              <small>({t("Полипропилен 32г")})</small>
            </div>
          </div>
        </div>

        {/* Detailed Metrics Breakdown Column */}
        <div className="radar-metrics-breakdown">
          {metrics.map((m, idx) => (
            <div key={idx} className="metric-compare-row">
              <div className="compare-label-row">
                <span className="compare-name">{t(m.label)}</span>
                <div className="compare-scores-pill">
                  <span className="score-our" style={{ color: productColor }}>{m.productScore}/100</span>
                  <span className="score-vs">vs</span>
                  <span className="score-worst">{m.worstScore}/100</span>
                </div>
              </div>

              <div className="compare-bars-stack">
                <div className="bar-track">
                  <div
                    className="bar-fill our-bar"
                    style={{ width: `${m.productScore}%`, background: productColor }}
                  />
                </div>
                <div className="bar-track worst-track">
                  <div
                    className="bar-fill worst-bar"
                    style={{ width: `${m.worstScore}%`, background: '#ef4444' }}
                  />
                </div>
              </div>

              <div className="compare-notes-grid">
                <span className="note-our">
                  <strong>✓ {t("Решение:")}</strong> {t(m.productNote)}
                </span>
                <span className="note-worst">
                  <strong>✗ {t("Худший вариант:")}</strong> {t(m.worstNote)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
