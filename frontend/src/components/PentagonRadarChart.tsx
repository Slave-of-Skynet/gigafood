import { useState } from 'react';
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'worst'>('all');
  const [hoveredSeries, setHoveredSeries] = useState<'product' | 'worst' | null>(null);

  // Hover takes priority for instant feedback, falls back to clicked filter
  const effectiveView = hoveredSeries || activeFilter;
  const showProduct = effectiveView === 'all' || effectiveView === 'product';
  const showWorst = effectiveView === 'all' || effectiveView === 'worst';
  const isProductOnly = effectiveView === 'product';
  const isWorstOnly = effectiveView === 'worst';

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

      {/* Interactive Filter Pills (Both, Green only, Red only) */}
      <div className="radar-filter-bar">
        <button
          type="button"
          className={`radar-filter-btn ${effectiveView === 'all' ? 'active' : ''}`}
          onClick={() => { setActiveFilter('all'); setHoveredSeries(null); }}
          onMouseEnter={() => setHoveredSeries(null)}
        >
          ⚖️ {t("Совмещенный вид (Оба)")}
        </button>
        <button
          type="button"
          className={`radar-filter-btn product-filter-btn ${effectiveView === 'product' ? 'active' : ''}`}
          onClick={() => setActiveFilter(activeFilter === 'product' ? 'all' : 'product')}
          onMouseEnter={() => setHoveredSeries('product')}
          onMouseLeave={() => setHoveredSeries(null)}
        >
          🟢 {t("Только наше решение")}
        </button>
        <button
          type="button"
          className={`radar-filter-btn worst-filter-btn ${effectiveView === 'worst' ? 'active' : ''}`}
          onClick={() => setActiveFilter(activeFilter === 'worst' ? 'all' : 'worst')}
          onMouseEnter={() => setHoveredSeries('worst')}
          onMouseLeave={() => setHoveredSeries(null)}
        >
          🔴 {t("Только худшая альтернатива")}
        </button>
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
            <g
              className="worst-series-group"
              style={{
                opacity: showWorst ? 1 : 0.04,
                transition: 'opacity 0.22s ease-in-out',
                pointerEvents: showWorst ? 'auto' : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredSeries('worst')}
              onMouseLeave={() => setHoveredSeries(null)}
            >
              <polygon
                points={worstPoints}
                fill={isWorstOnly ? 'rgba(239, 68, 68, 0.45)' : 'rgba(239, 68, 68, 0.22)'}
                stroke="#ef4444"
                strokeWidth={isWorstOnly ? '3.5' : '2'}
                className="worst-poly"
              />
              {metrics.map((m, i) => {
                const { x, y } = getCoordinates(i, m.worstScore);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={isWorstOnly ? '5' : '3.5'}
                    fill="#ef4444"
                    stroke="#ffffff"
                    strokeWidth="1"
                  />
                );
              })}
            </g>

            {/* Product Polygon (Emerald / Blue) */}
            <g
              className="product-series-group"
              style={{
                opacity: showProduct ? 1 : 0.04,
                transition: 'opacity 0.22s ease-in-out',
                pointerEvents: showProduct ? 'auto' : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredSeries('product')}
              onMouseLeave={() => setHoveredSeries(null)}
            >
              <polygon
                points={productPoints}
                fill={isProductOnly ? 'rgba(5, 150, 105, 0.52)' : productFill}
                stroke={productColor}
                strokeWidth={isProductOnly ? '4' : '2.5'}
                className="product-poly"
              />
              {metrics.map((m, i) => {
                const { x, y } = getCoordinates(i, m.productScore);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={isProductOnly ? '6' : '4.5'}
                    fill={productColor}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>

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

          {/* Interactive Legend (Click or Hover to isolate) */}
          <div className="radar-legend">
            <button
              type="button"
              className={`legend-item legend-btn product-legend ${isProductOnly ? 'legend-isolated' : ''} ${!showProduct ? 'legend-dimmed' : ''}`}
              onClick={() => setActiveFilter(activeFilter === 'product' ? 'all' : 'product')}
              onMouseEnter={() => setHoveredSeries('product')}
              onMouseLeave={() => setHoveredSeries(null)}
              title={t("Нажмите или наведите, чтобы показать только этот график")}
            >
              <span className="legend-color-dot" style={{ background: productColor }} />
              <strong>{t(productName)}</strong>
              <small>({t("Наше решение")})</small>
            </button>
            <button
              type="button"
              className={`legend-item legend-btn worst-legend ${isWorstOnly ? 'legend-isolated' : ''} ${!showWorst ? 'legend-dimmed' : ''}`}
              onClick={() => setActiveFilter(activeFilter === 'worst' ? 'all' : 'worst')}
              onMouseEnter={() => setHoveredSeries('worst')}
              onMouseLeave={() => setHoveredSeries(null)}
              title={t("Нажмите или наведите, чтобы показать только этот график")}
            >
              <span className="legend-color-dot worst-dot" />
              <strong>{t("Худшая альтернатива (PP)")}</strong>
              <small>({t("Полипропилен 32г")})</small>
            </button>
          </div>
        </div>

        {/* Detailed Metrics Breakdown Column */}
        <div className="radar-metrics-breakdown">
          {metrics.map((m, idx) => (
            <div key={idx} className="metric-compare-row">
              <div className="compare-label-row">
                <span className="compare-name">{t(m.label)}</span>
                <div className="compare-scores-pill">
                  <span
                    className="score-our"
                    style={{
                      color: productColor,
                      fontWeight: isProductOnly ? 850 : 700,
                      opacity: showProduct ? 1 : 0.25,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {m.productScore}/100
                  </span>
                  <span className="score-vs">vs</span>
                  <span
                    className="score-worst"
                    style={{
                      fontWeight: isWorstOnly ? 850 : 700,
                      opacity: showWorst ? 1 : 0.25,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {m.worstScore}/100
                  </span>
                </div>
              </div>

              <div className="compare-bars-stack">
                <div className="bar-track">
                  <div
                    className="bar-fill our-bar"
                    style={{
                      width: `${m.productScore}%`,
                      background: productColor,
                      opacity: showProduct ? 1 : 0.15,
                      transition: 'all 0.25s ease',
                    }}
                  />
                </div>
                <div className="bar-track worst-track">
                  <div
                    className="bar-fill worst-bar"
                    style={{
                      width: `${m.worstScore}%`,
                      background: '#ef4444',
                      opacity: showWorst ? 1 : 0.15,
                      transition: 'all 0.25s ease',
                    }}
                  />
                </div>
              </div>

              <div className="compare-notes-grid">
                <span
                  className="note-our"
                  style={{
                    opacity: showProduct ? 1 : 0.25,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <strong>✓ {t("Решение:")}</strong> {t(m.productNote)}
                </span>
                <span
                  className="note-worst"
                  style={{
                    opacity: showWorst ? 1 : 0.25,
                    transition: 'opacity 0.2s ease',
                  }}
                >
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
