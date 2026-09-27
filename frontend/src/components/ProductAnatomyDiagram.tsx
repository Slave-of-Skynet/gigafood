import React, { useState } from 'react';
import { useTranslation } from '../i18n';

export interface LayerItem {
  id: string;
  name: string;
  material: string;
  thickness: string;
  tempRange: string;
  recycleStream: string;
  color: string;
  description: string;
  benefits: string[];
}

const BAG_LAYERS: LayerItem[] = [
  {
    id: 'bopet',
    name: '1. Верхнее смотровое окно',
    material: 'Термостойкая полиэфирная пленка (BOPET / CPET)',
    thickness: '12 – 15 мкм (2.8 г на весь пакет)',
    tempRange: 'до 250°C в печи и на гриле (Steam Cooling держит ≤130°C)',
    recycleStream: 'Желтый контейнер (Пластик / ПЭТ) — чистый поток без клеев',
    color: '#0284c7', // Sky blue
    description: 'Кристально прозрачная оптическая пленка высокой прочности на разрыв. Позволяет покупателю видеть свежесть продукта на полке, а повару — контролировать степень готовности без вскрытия.',
    benefits: [
      'Выдерживает жар углей и тэна без оплавления за счет циркуляции пара',
      'Сохраняет 100% герметичность при транспортировке и выкладке',
      'Снижает пластикоемкость на 91% по сравнению с 32 г пластиковыми боксами',
    ],
  },
  {
    id: 'cellulose',
    name: '2. Разделительная мембрана (Целлюлоза)',
    material: 'Натуральная микрокрепированная целлюлоза (пергамент)',
    thickness: '40 – 45 г/м² (растительная основа)',
    tempRange: 'до 260°C (100% термостабильность)',
    recycleStream: 'Органический компост или бумага (сертифицирована без микропластика)',
    color: '#d97706', // Amber
    description: 'Антипригарный внутренний слой из чистой растительной целлюлозы с силиконизацией растительными смолами. Предотвращает прилипание нежной кожицы лосося или мясных волокон к металлу.',
    benefits: [
      '100% PFAS-Free: без ядовитых фторорганических пропиток',
      'Впитывает избыточный жир и образует сочную паровую подушку',
      'Исключает прямой контакт маринадов повышенной кислотности с фольгой',
    ],
  },
  {
    id: 'aluminum',
    name: '3. Нижняя теплопроводящая подложка',
    material: 'Пищевая алюминиевая фольга (сплав EN AW-8011, H18)',
    thickness: '25 – 30 мкм (сверхпрочная термо-основа)',
    tempRange: 'до 350°C (прямой контакт с решеткой гриля и углями)',
    recycleStream: 'Синий контейнер (Металл / Алюминий) — 100% бесконечный рециклинг',
    color: '#475569', // Slate / metallic
    description: 'Сплошное алюминиевое основание с повышенной теплопроводностью. Быстро аккумулирует тепло углей или пода духовки, формируя аппетитную хрустящую корочку на дне блюда.',
    benefits: [
      'Абсолютный свето-, газо- и влагонепроницаемый барьер',
      'Защищает продукты от сажи, канцерогенов дыма и вспышек пламени',
      'Бесконечный цикл переплавки в Румынии с экономией 95% энергии',
    ],
  },
  {
    id: 'weld',
    name: '4. Бесклеевой замок aPET & Микроперфорация',
    material: 'Термокомпрессионный сварочный слой aPET (1.5 мкм) + лазерные микропоры',
    thickness: '1.5 мкм (микродиффузия в порах)',
    tempRange: 'до 250°C без термической деструкции',
    recycleStream: 'Полное отсутствие полиуретановых и акриловых клеев (Clean Stream)',
    color: '#10b981', // Emerald
    description: 'Инновационное механическое соединение разнородных материалов термокомпрессией при высоком давлении. Исключает химические клеи, которые при нагреве до 250°C разлагаются с выделением летучих токсинов.',
    benefits: [
      'Zero-Glue: нулевой риск миграции химикатов в готовящуюся пищу',
      'Лазерные микропоры стравливают избыточное давление пара, предотвращая хлопок пакета',
      'Шов держит соус и маринад при транспортировке в вертикальном и горизонтальном положении',
    ],
  },
  {
    id: 'easy_peel',
    name: '5. Линия ручного разделения (Easy-Peel / Peel-Away)',
    material: 'Механический язычок когезионного отрыва',
    thickness: 'Зона захвата 15 мм',
    tempRange: 'Шов размыкается при ручном усилии 2.5–3.5 Н/15мм',
    recycleStream: 'Разделение за 2 секунды под требования Legea 249/2015 (Румыния)',
    color: '#8b5cf6', // Violet
    description: 'Интуитивная система разделения упаковки после приготовления. Покупатель тянет за уголок, пленка отделяется от фольги начисто без ножниц, позволяя выбросить алюминий в металл, а ПЭТ — в пластик.',
    benefits: [
      '100% соответствие раздельному сбору мусора в Румынии и директивам ЕС',
      'Чистый отрыв без остатков фольги на пленке и без остатков пленки на алюминии',
      'Удобство сервировки: фольгированное дно служит гигиеничной одноразовой тарелкой',
    ],
  },
];

const TRAY_LAYERS: LayerItem[] = [
  {
    id: 'silicone_lid',
    name: '1. Прецизионная крышка LSR (Liquid Silicone Rubber)',
    material: 'Пищевой силикон платиновой вулканизации (Platinum Cured LSR, Shore A 50–60)',
    thickness: '1.2 – 1.5 мм (многоразовая, до 1000 циклов запекания)',
    tempRange: 'от -40°C до +250°C (духовой шкаф, гриль, автоклав, морозильник)',
    recycleStream: 'Оборотный цикл (Reusable) / Специализированный рециклинг эластомеров',
    color: '#0284c7',
    description: 'Эластичная термостойкая крышка индивидуального литья B2B (CAD/STEP). Идеально закрывает блюдо без запайщика, устойчива к жирам, фруктовым кислотам и высоким температурам без выделения летучих веществ.',
    benefits: [
      'Выдерживает прямой нагрев до 250°C без деформации и запаха',
      '100% отказ от одноразовых пластиковых пленок и пленок CPET',
      'Многоразовое использование дома или в сервисах оборотной тары (до 1000 циклов)',
    ],
  },
  {
    id: 'steam_vents',
    name: '2. Пароотводящие микроотверстия / DFM-клапан',
    material: 'Калиброванные микроотверстия (лазерная резка или формообразующие пины в пресс-форме)',
    thickness: 'Диаметр 0.8 – 1.2 мм (калиброванный сброс давления)',
    tempRange: 'Постоянный рабочий диапазон до 250°C',
    recycleStream: 'Интегрировано в структуру крышки (Zero Waste)',
    color: '#10b981',
    description: 'Система контролируемого сброса избыточного давления пара при запекании. Исключает срыв крышки в печи, предотвращает разбрызгивание жира и сохраняет естественную сочность мяса и рыбы.',
    benefits: [
      'Эффект пароварки-гриля (сохранение влаги и сочности продукта)',
      'Исключает вздутие и деформацию упаковки в конвектомате',
      'Выбор технологии: пины в форме (дешевле при тираже) или лазер (дешевле оснастка)',
    ],
  },
  {
    id: 'perimeter_seal',
    name: '3. Замок-паз сопряжения под бортик лотка (CAD Locking Rim)',
    material: 'Эластичный U-образный профиль обжима с внутренним ребром жесткости',
    thickness: 'Глубина паза 3.5 – 4.5 мм под стандартные фланцы Full Curl (G-rim) / L-rim',
    tempRange: 'Плотная фиксация от -40°C до +250°C без клеев',
    recycleStream: 'Механическая фиксация — ноль клеев и лаков',
    color: '#8b5cf6',
    description: 'Прецизионное механическое сопряжение с отбортовкой стандартного лотка. Крышка надевается вручную за 1 секунду без применения сварочного оборудования (трейсилера).',
    benefits: [
      'Нулевые затраты на трейсилер (упаковка без электрических запайщиков)',
      'Герметичная фиксация исключает самопроизвольное открывание при доставке',
      'Интуитивное открывание за угловой язычок (Easy-Grip Corner Tab)',
    ],
  },
  {
    id: 'aluminium_tray',
    name: '4. Алюминиевый корпус лотка 60–70 мкм (Zero CAPEX Body)',
    material: 'Пищевой алюминиевый прокат Heavy Duty (сплав EN AW-3003 / 8011) с отжигом Food Grade Annealing',
    thickness: '60 – 70 мкм (усиленная жесткость борта "под горло")',
    tempRange: 'от -40°C до +350°C (прямой контакт с печью и грилем)',
    recycleStream: 'Синий контейнер (Металл / Алюминий) — 100% бесконечный рециклинг в Румынии',
    color: '#475569',
    description: 'Готовый биржевой лоток евро-стандарта (250 / 500 мл) от ведущих европейских заводов (Contital, Plus Pack, Coppice). Поставляется от 1 паллеты с нулевыми затратами на штамповочную оснастку.',
    benefits: [
      'Zero CAPEX: сотни готовых типоразмеров со склада европейских производителей',
      'Обезжиренный высокотемпературный отжиг (Degreased foil) — ноль дыма и запаха при 250°C',
      'Высокая прочность: стенка 60–70 мкм держит налив соусов и штабелирование до 6 ярусов',
    ],
  },
];

interface ProductAnatomyDiagramProps {
  productType: 'bag' | 'tray';
}

export const ProductAnatomyDiagram: React.FC<ProductAnatomyDiagramProps> = ({ productType }) => {
  const t = useTranslation();
  const layers = productType === 'bag' ? BAG_LAYERS : TRAY_LAYERS;
  const [selectedLayerId, setSelectedLayerId] = useState<string>(layers[0].id);

  const selectedLayer = layers.find((l) => l.id === selectedLayerId) || layers[0];

  return (
    <div className="product-anatomy-container">
      <div className="anatomy-header">
        <div className="anatomy-badge">
          🔬 {t("Инженерная анатомия и материаловедение")}
        </div>
        <h3 className="anatomy-title">
          {productType === 'bag'
            ? t("Схема слоев и анатомия: Фольгированный термо-пакет (Foil Grill & Oven Bag)")
            : t("Схема слоев и анатомия: Гладкостенный лоток (Smoothwall Tray с мембраной)")}
        </h3>
        <p className="anatomy-subtitle">
          {t("Наглядная архитектура упаковки: послойное распределение функциональных материалов (алюминий, целлюлоза, термо-полимер, бесклеевой замок) с характеристиками термостойкости и рециклинга.")}
        </p>
      </div>

      <div className="anatomy-grid">
        {/* Left column: Visual Exploded Layers Stack */}
        <div className="anatomy-visual-stack">
          <div className="visual-stack-card">
            <div className="stack-diagram-label">
              {t("Схема слоев (нажмите на слой для деталей):")}
            </div>

            <div className="exploded-layers">
              {layers.map((layer, idx) => {
                const isSelected = layer.id === selectedLayerId;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`exploded-layer-row ${isSelected ? 'selected' : ''}`}
                    style={{
                      borderLeftColor: layer.color,
                      backgroundColor: isSelected ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                    }}
                  >
                    <div className="layer-step-badge" style={{ backgroundColor: layer.color }}>
                      {idx + 1}
                    </div>
                    <div className="layer-step-content">
                      <div className="layer-step-name">{t(layer.name)}</div>
                      <div className="layer-step-material">{t(layer.material)}</div>
                    </div>
                    <div className="layer-step-arrow">
                      {isSelected ? '●' : '○'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Visual Cross-Section Representation */}
            <div className="cross-section-box">
              <div className="cross-section-title">
                📐 {t("Поперечный разрез конструкции (Cross-Section)")}
              </div>
              <div className="cross-section-layers">
                {productType === 'bag' ? (
                  <>
                    <div className="cs-bar cs-bopet" title={t("BOPET Смотровое окно 15 мкм")}>
                      <span>{t("BOPET Окно (15 мкм)")}</span>
                      <span className="cs-tag">{t("Steam Cooling")}</span>
                    </div>
                    <div className="cs-bar cs-weld" title={t("Бесклеевой замок aPET")}>
                      <span>{t("Термокомпрессионный шов (aPET 1.5 мкм) • Микроперфорация")}</span>
                    </div>
                    <div className="cs-bar cs-cellulose" title={t("Целлюлозная основа 45 г/м²")}>
                      <span>{t("Натуральная целлюлоза / Пергамент (PFAS-Free)")}</span>
                      <span className="cs-tag">{t("Антипригарный барьер")}</span>
                    </div>
                    <div className="cs-bar cs-aluminum" title={t("Алюминиевая фольга 25–30 мкм")}>
                      <span>{t("Пищевой алюминий EN AW-8011 (25–30 мкм)")}</span>
                      <span className="cs-tag">{t("Прямой нагрев 250°C")}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="cs-bar cs-bopet" title={t("LSR Силиконовая крышка 1.2–1.5 мм")}>
                      <span>{t("Прецизионная крышка LSR (1.2–1.5 мм)")}</span>
                      <span className="cs-tag">{t("Platinum Cured")}</span>
                    </div>
                    <div className="cs-bar cs-weld" title={t("Пароотводящие микроотверстия / DFM-пины")}>
                      <span>{t("Калиброванные паровые микроотверстия • DFM Venting")}</span>
                      <span className="cs-tag">{t("Steam Venting")}</span>
                    </div>
                    <div className="cs-bar cs-cellulose" title={t("Замок-паз под бортик G-rim / L-rim")}>
                      <span>{t("Герметичный замок-паз под отбортовку (без клея и запайщика)")}</span>
                      <span className="cs-tag">{t("Zero-Tooling Seal")}</span>
                    </div>
                    <div className="cs-bar cs-aluminum" title={t("Алюминиевый корпус 60–70 мкм Heavy Duty")}>
                      <span>{t("Биржевой алюминиевый лоток 250/500 мл (60–70 мкм)")}</span>
                      <span className="cs-tag">{t("Zero CAPEX · 250°C")}</span>
                    </div>
                  </>
                )}
              </div>
              <div className="cross-section-note">
                ⚡ {t("100% механическое и термокомпрессионное сопряжение слоев без токсичных клеев.")}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Selected Layer Deep Dive Card */}
        <div className="anatomy-detail-panel">
          <div className="detail-panel-card" style={{ borderColor: selectedLayer.color }}>
            <div className="detail-panel-header">
              <span className="detail-layer-id" style={{ backgroundColor: selectedLayer.color }}>
                {selectedLayer.id.toUpperCase()}
              </span>
              <h4 className="detail-layer-title">{t(selectedLayer.name)}</h4>
            </div>

            <p className="detail-layer-desc">{t(selectedLayer.description)}</p>

            <div className="detail-specs-grid">
              <div className="detail-spec-item">
                <span className="spec-label">{t("Материал основы:")}</span>
                <strong className="spec-val">{t(selectedLayer.material)}</strong>
              </div>
              <div className="detail-spec-item">
                <span className="spec-label">{t("Толщина / плотность:")}</span>
                <strong className="spec-val">{t(selectedLayer.thickness)}</strong>
              </div>
              <div className="detail-spec-item">
                <span className="spec-label">{t("Рабочий диапазон:")}</span>
                <strong className="spec-val">{t(selectedLayer.tempRange)}</strong>
              </div>
              <div className="detail-spec-item">
                <span className="spec-label">{t("Утилизация и поток (Румыния):")}</span>
                <strong className="spec-val">{t(selectedLayer.recycleStream)}</strong>
              </div>
            </div>

            <div className="detail-benefits-box">
              <div className="benefits-title">{t("Ключевые инженерные преимущества слоя:")}</div>
              <ul className="benefits-list">
                {selectedLayer.benefits.map((b, i) => (
                  <li key={i}>
                    <span className="benefit-bullet">✓</span>
                    <span>{t(b)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
