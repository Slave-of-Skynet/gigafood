import { useState } from 'react';
import { useTranslation } from '../i18n';
import type { ProductId, WorkflowId } from '../api/contracts';
import { PentagonRadarChart, type RadarMetric } from './PentagonRadarChart';
import { ProductAnatomyDiagram } from './ProductAnatomyDiagram';
import { ComplianceCertificateModal } from './ComplianceCertificateModal';
import { EuropeanManufacturingDossier } from './EuropeanManufacturingDossier';

interface UniversalPouchShowcaseProps {
  onApplyWorkflow?: (productId: ProductId, workflowId: WorkflowId) => void;
}

// Gallery images for Product 1 (Foil Grill & Oven Bag) with polished user-provided & manufacturer photos
const BAG_CAROUSEL_IMAGES = [
  {
    url: '/reference-packaging/user-fajita-meat.jpg',
    title: 'Мясо с овощами и перцем в пакете (Ready for Grill & Oven)',
    caption: 'Фольгированный термо-пакет на деревянном столе с маринованной говядиной, перцем и луком. Прозрачное окно BOPET готово к прямому запеканию.',
  },
  {
    url: '/reference-packaging/readychefgobags-bag-detail-highres.jpg',
    title: 'Запекание на гриле при 250°C (Direct Grill Exposure)',
    caption: 'Фольгированный термо-пакет на раскаленной решетке гриля над горящими углями. Прозрачное окно BOPET сохраняет чистоту, не плавится и удерживает соки.',
  },
  {
    url: '/reference-packaging/user-prep-salmon.jpg',
    title: 'Фасовка свежего лосося и соусов (Supermarket Prep Line)',
    caption: 'Выкладка свежего лосося с пряными травами, маслами и соусами прямо в открытый пакет на линии фасовки супермаркета.',
  },
  {
    url: '/reference-packaging/readychefgobags-cooking-pouch.jpg',
    title: 'Розничная упаковка на полке (Retail Ready Pack)',
    caption: 'Официальная потребительская упаковка Ready. Chef. Go! Grilling and Oven Bags для выкладки в отделах кулинарии супермаркетов.',
  },
];

// Gallery images for Product 2 (Aluminium Tray + Reusable Silicone LSR Steam-Lid Combo)
const TRAY_CAROUSEL_IMAGES = [
  {
    url: '/reference-packaging/silicone-lid-aluminium-tray-combo.jpg',
    title: 'Комплект: Алюминиевый лоток + Силиконовая крышка LSR (Ready to Bake Combo)',
    caption: 'Экспериментальная термо-комбинация: штампованный лоток Heavy Duty с прецизионной многоразовой силиконовой крышкой LSR и пароотводящими микроотверстиями для духовки и гриля до +250°C.',
  },
  {
    url: '/reference-packaging/silicone-lid-rim-microvent.jpg',
    title: 'Прецизионный замок-паз и микроперфорация (CAD Rim Seal & Vents)',
    caption: 'Плотная посадка эластичной кромки силикона на бортик Full Curl (G-rim) или Smoothwall L-rim лотка. Микроотверстия стравливают избыточное давление пара, сохраняя сочность блюда.',
  },
  {
    url: '/reference-packaging/kmpackaging-smoothwall-tray.jpg',
    title: 'Алюминиевая база 250 / 500 мл (Standard Commodity Tray)',
    caption: 'Биржевой штампованный пищевой алюминий без лакового покрытия с высокотемпературным отжигом (Food Grade Annealing). Нулевой CAPEX на оснастку лотка.',
  },
  {
    url: '/reference-packaging/kmpackaging-kfoil-tray.jpg',
    title: 'Формат готового блюда HoReCa & Ритейл (Ready Meal Foil Tray)',
    caption: 'Европейские стандартные типоразмеры от заводов Contital, Plus Pack и Coppice Alupack, доступные от 1 паллеты.',
  },
];

// Pentagon Metrics for Product 1 (Foil Bag vs Worst PP Container)
const BAG_RADAR_METRICS: RadarMetric[] = [
  {
    label: 'Термостойкость в духовке/гриле',
    shortLabel: 'Термостойкость 250°C',
    productScore: 98,
    worstScore: 20,
    productNote: 'Выдерживает прямой нагрев до 250°C; эффект парового охлаждения держит пленку ≤130°C.',
    worstNote: 'Обычный PP плавится и выделяет токсины при температуре выше 110–120°C (запрещен в духовке).',
  },
  {
    label: 'Сокращение первичного пластика',
    shortLabel: 'Пластикоемкость',
    productScore: 91,
    worstScore: 5,
    productNote: 'Всего 2.8 г BOPET-пленки на пакет (сокращение первичного пластика на 91%).',
    worstNote: '32 грамма первичного ископаемого полипропилена на один контейнер с куполом.',
  },
  {
    label: 'Переработка в Румынии',
    shortLabel: 'Рециклинг (Румыния)',
    productScore: 96,
    worstScore: 25,
    productNote: 'Интуитивный отрыв Peel-away без ножниц: алюминий в металл, чистый ПЭТ в пластик (без клея).',
    worstNote: 'Жировое загрязнение и неразделяемый клей часто бракуют полипропилен на сортировочных линиях.',
  },
  {
    label: 'Сохранение сочности и вкуса',
    shortLabel: 'Сочность (Steam Cooling)',
    productScore: 95,
    worstScore: 35,
    productNote: 'Паровой карман циркулирует соки внутри и дает золотистую корочку снизу за счет фольги.',
    worstNote: 'В закрытом пластиковом боксе образуется конденсат, который размягчает хрустящую корочку курицы.',
  },
  {
    label: 'Экономическая доступность',
    shortLabel: 'Оптовая цена',
    productScore: 92,
    worstScore: 60,
    productNote: '$0.15–$0.35 / шт. (~0.70–1.60 RON) при оптовой партии, без эко-штрафов за пластик.',
    worstNote: 'Дешевая базовая цена нивелируется будущими эко-налогами ЕС за тоннаж полимеров.',
  },
];

// Pentagon Metrics for Product 2 (Aluminium Tray + Silicone LSR Lid vs Worst PP Container)
const TRAY_RADAR_METRICS: RadarMetric[] = [
  {
    label: 'Термостойкость в духовке/гриле',
    shortLabel: 'Термостойкость 250°C',
    productScore: 99,
    worstScore: 20,
    productNote: 'Алюминий держит до 350°C, платиновый силикон LSR стабилен до +250°C без термической деструкции.',
    worstNote: 'PP размягчается и разрушается при 120°C; непригоден для разогрева в духовке.',
  },
  {
    label: 'Сокращение первичного пластика',
    shortLabel: 'Пластикоемкость',
    productScore: 98,
    worstScore: 5,
    productNote: '0 г одноразового полипропилена. Металл переплавляется на 100%, крышка служит сотни циклов.',
    worstNote: '32 грамма первичного пластика на жесткий корпус и крышку-купол.',
  },
  {
    label: 'Переработка в Румынии',
    shortLabel: 'Рециклинг (Румыния)',
    productScore: 97,
    worstScore: 25,
    productNote: 'Алюминиевый лоток идет в синий контейнер (100% переработка в Румынии), крышка возвращается в оборот.',
    worstNote: 'Трудно перерабатываемый пластиковый микс с остатками масел и этикеточного клея.',
  },
  {
    label: 'Формоустойчивость и защита',
    shortLabel: 'Защита и витрина',
    productScore: 99,
    worstScore: 40,
    productNote: 'Усиленный борт 60–70 мкм Heavy Duty + эластичный обжимной замок крышки исключают протекание и сминание.',
    worstNote: 'Тонкостенный пластик деформируется при нагреве на витрине и теряет герметичность.',
  },
  {
    label: 'Экономическая доступность',
    shortLabel: 'Оптовая цена',
    productScore: 91,
    worstScore: 60,
    productNote: 'Нулевой CAPEX на лоток (биржевой каталог €0.025–€0.04) + амортизация пресс-формы крышки в Blanket Order.',
    worstNote: 'Дешевая базовая цена нивелируется будущими эко-налогами ЕС за тоннаж полимеров.',
  },
];

export function UniversalPouchShowcase({ onApplyWorkflow }: UniversalPouchShowcaseProps) {
  const t = useTranslation();
  const [selectedProductTab, setSelectedProductTab] = useState<'bag' | 'tray'>('bag');
  const [bagImgIdx, setBagImgIdx] = useState(0);
  const [trayImgIdx, setTrayImgIdx] = useState(0);
  const [monthlyVolume, setMonthlyVolume] = useState<number>(25000);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);

  const plasticPerIncumbentG = 32;
  const currentPlasticG = selectedProductTab === 'bag' ? 2.8 : 0.0;
  const plasticSavedKg = Math.round((monthlyVolume * (plasticPerIncumbentG - currentPlasticG)) / 1000);
  const plasticReductionPct = Math.round(((plasticPerIncumbentG - currentPlasticG) / plasticPerIncumbentG) * 100);

  const priceLowUsd = selectedProductTab === 'bag' ? 0.15 : 0.25;
  const priceHighUsd = selectedProductTab === 'bag' ? 0.35 : 0.40;
  const avgCostRon = Math.round(monthlyVolume * ((priceLowUsd + priceHighUsd) / 2) * 4.6);

  const currentBagImg = BAG_CAROUSEL_IMAGES[bagImgIdx];
  const currentTrayImg = TRAY_CAROUSEL_IMAGES[trayImgIdx];

  return (
    <div className="universal-showcase-container" id="universal-pouch-showcase">
      {/* Top Engineering Banner */}
      <section className="showcase-hero-banner">
        <div className="showcase-badge-row">
          <span className="showcase-badge-pill">🔥 {t("Инженерная разработка по ТЗ Вадима (HTF-05)")}</span>
          <span className="showcase-badge-pill eco-pill">♻️ {t("100% Recyclable · Строго 2 материала")}</span>
          <span className="showcase-badge-pill romania-pill">🇷🇴 {t("Фактор Румынии: Без клея · Easy-Peel")}</span>
        </div>
        <h2 className="showcase-main-title">
          {t("Универсальная пищевая термо-упаковка (Grill & Oven Pouch до 250°C)")}
        </h2>
        <p className="showcase-main-subtitle">
          {t("Готовая к внедрению система из двух товаров: гибкий фольгированный пакет и полужесткий гладкостенный лоток для прямой фасовки, выкладки и запекания при 250°C без использования вредных клеев.")}
        </p>

        <div className="showcase-core-pillars-grid">
          <div className="pillar-card">
            <span className="pillar-icon">🌡️</span>
            <div>
              <strong>{t("До 250°C в печи и на гриле")}</strong>
              <p>{t("Фазовый переход пара охлаждает пленку до ≤110–130°C (steam cooling)")}</p>
            </div>
          </div>
          <div className="pillar-card">
            <span className="pillar-icon">🧪</span>
            <div>
              <strong>{t("Строго 2 материала")}</strong>
              <p>{t("Чистый алюминий + ПЭТ (BOPET/CPET) без скрытых полимерных примесей")}</p>
            </div>
          </div>
          <div className="pillar-card">
            <span className="pillar-icon">🚫</span>
            <div>
              <strong>{t("100% Отказ от клея")}</strong>
              <p>{t("Бесклеевая термокомпрессия со слоем aPET (механический замок в микропорах)")}</p>
            </div>
          </div>
          <div className="pillar-card">
            <span className="pillar-icon">✂️</span>
            <div>
              <strong>{t("Сепарация без инструментов")}</strong>
              <p>{t("Интуитивное разделение руками за 2 секунды под нормативы сортировки Румынии")}</p>
            </div>
          </div>
        </div>

        {/* View Official Certificate CTA */}
        <div className="showcase-cert-action-row">
          <button
            type="button"
            className="showcase-cert-btn"
            onClick={() => setIsCertModalOpen(true)}
          >
            📜 {t("Посмотреть официальный лабораторный сертификат соответствия (EU 1935/2004 & FDA 250°C) →")}
          </button>
        </div>
      </section>

      {/* Product Switcher Tabs */}
      <div className="showcase-tabs-bar">
        <button
          type="button"
          className={`showcase-tab-btn ${selectedProductTab === 'bag' ? 'active' : ''}`}
          onClick={() => setSelectedProductTab('bag')}
        >
          ⭐ <strong>{t("Товар 1 (Основной):")}</strong> {t("Фольгированный пакет (Foil Grill & Oven Bag)")}
        </button>
        <button
          type="button"
          className={`showcase-tab-btn ${selectedProductTab === 'tray' ? 'active' : ''}`}
          onClick={() => setSelectedProductTab('tray')}
        >
          🔄 <strong>{t("Товар 2 (Экспериментальный комбо):")}</strong> {t("Алюминиевый лоток + Силиконовая крышка LSR (250°C)")}
        </button>
      </div>

      {/* Detailed Product Section */}
      {selectedProductTab === 'bag' ? (
        <article className="showcase-product-detail-card bag-theme">
          <div className="product-detail-header-block">
            <div className="product-title-row">
              <span className="product-flag-chip">{t("Основной универсальный товар")}</span>
              <h3 className="product-title-text">{t("Foil Grill & Oven Bag (Гибкий фольгированный термо-пакет)")}</h3>
              <p className="product-concept-text">
                {t("Универсальный гибкий гибридный пакет, в котором курицу гриль, крылья, ребра или овощи можно упаковывать на кухне супермаркета, продавать на полке и запекать дома при 250°C.")}
              </p>
            </div>
          </div>

          {/* Large Interactive Image Carousel */}
          <div className="product-carousel-deck">
            <div className="carousel-main-viewport">
              <button
                type="button"
                className="carousel-nav-btn prev-btn"
                onClick={() => setBagImgIdx((i) => (i === 0 ? BAG_CAROUSEL_IMAGES.length - 1 : i - 1))}
                aria-label="Previous image"
              >
                ‹
              </button>

              <div className="carousel-image-frame">
                <img
                  src={currentBagImg.url}
                  alt={t(currentBagImg.title)}
                  className="carousel-hero-img"
                />
                <div className="carousel-caption-overlay">
                  <span className="carousel-view-tag">
                    {t("Ракурс")} {bagImgIdx + 1} / {BAG_CAROUSEL_IMAGES.length}: {t(currentBagImg.title)}
                  </span>
                  <p className="carousel-view-desc">{t(currentBagImg.caption)}</p>
                </div>
              </div>

              <button
                type="button"
                className="carousel-nav-btn next-btn"
                onClick={() => setBagImgIdx((i) => (i === BAG_CAROUSEL_IMAGES.length - 1 ? 0 : i + 1))}
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="carousel-thumbs-strip">
              {BAG_CAROUSEL_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`carousel-thumb-item ${idx === bagImgIdx ? 'active' : ''}`}
                  onClick={() => setBagImgIdx(idx)}
                >
                  <img src={img.url} alt={t(img.title)} className="thumb-preview" />
                  <span className="thumb-label">{t("Ракурс")} {idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dual Pricing Deck: Wholesale B2B vs Retail */}
          <div className="product-pricing-deck">
            <div className="pricing-card wholesale-card">
              <div className="pricing-badge wholesale-badge">🏢 {t("Оптовая закупка (B2B Bulk & Кулинария)")}</div>
              <div className="pricing-main-price">
                <span className="price-currency">$</span>
                <span className="price-number">0.15 – 0.35</span>
                <span className="price-unit">/ {t("шт.")} (~0.70–1.60 RON)</span>
              </div>
              <ul className="pricing-breakdown-list">
                <li><strong>{t("Промышленная партия (от 10 000 шт.):")}</strong> $0.15 – $0.25 / {t("шт.")}</li>
                <li><strong>{t("Мелкий опт HoReCa (коробки по 250 шт.):")}</strong> $0.48 – $0.65 / {t("шт.")}</li>
                <li><strong>{t("Эко-налог ЕС за пластик:")}</strong> $0.00 ({t("соответствует директивам ЕС, 2.8 г ПЭТ")})</li>
              </ul>
            </div>
            <div className="pricing-card retail-card">
              <div className="pricing-badge retail-badge">🛒 {t("Розничная покупка (Retail Pack для дома)")}</div>
              <div className="pricing-main-price">
                <span className="price-currency">$</span>
                <span className="price-number">0.75 – 1.15</span>
                <span className="price-unit">/ {t("пакет")} (~3.50–5.30 RON)</span>
              </div>
              <ul className="pricing-breakdown-list">
                <li><strong>{t("Потребительская упаковка (6–20 пакетов):")}</strong> $4.50 – $14.99 / {t("пачка")}</li>
                <li><strong>{t("Готовое блюдо в супермаркете (Ready to Cook):")}</strong> $4.90 – $8.50 {t("за порцию мяса/рыбы в пакете")}</li>
                <li><strong>{t("Чистота на кухне:")}</strong> 100% {t("запекание без мытья противня и решетки гриля")}</li>
              </ul>
            </div>
          </div>

          {/* Pros & Cons (Преимущества и Недостатки) */}
          <div className="pros-cons-grid">
            <div className="pros-card">
              <div className="pros-cons-header">
                <span className="badge-pro">✅ {t("Преимущества решения")}</span>
                <h4>{t("Сильные стороны Foil Grill & Oven Bag")}</h4>
              </div>
              <ul className="pros-cons-list">
                <li>
                  <strong>{t("Прямое запекание до 250°C:")}</strong>{' '}
                  {t("Готовка прямо в пакете в духовке и на открытом огне гриля без грязи и жира.")}
                </li>
                <li>
                  <strong>{t("Сокращение первичного пластика на 91%:")}</strong>{' '}
                  {t("Всего 2.8 г полиэфирной пленки BOPET против 32 г у пластиковых контейнеров.")}
                </li>
                <li>
                  <strong>{t("Бесклеевой замок aPET:")}</strong>{' '}
                  {t("Термокомпрессионная сварка исключает токсичные летучие клеи при 250°C.")}
                </li>
                <li>
                  <strong>{t("Ручной отрыв Peel-away (Румыния):")}</strong>{' '}
                  {t("Интуитивное разделение материалов за 2 секунды без ножниц (фольга в металл, ПЭТ в пластик).")}
                </li>
                <li>
                  <strong>{t("Эффект гриля:")}</strong>{' '}
                  {t("Алюминиевое дно передает тепло угля/тэна, формируя аппетитную хрустящую корочку снизу.")}
                </li>
                <li>
                  <strong>{t("Минимальная оптовая цена:")}</strong>{' '}
                  {t("$0.15–$0.35 / шт. (~0.70–1.60 RON) — лучшая экономика среди термостойких решений.")}
                </li>
              </ul>
            </div>

            <div className="cons-card">
              <div className="pros-cons-header">
                <span className="badge-con">⚠️ {t("Ограничения и недостатки")}</span>
                <h4>{t("Инженерные нюансы эксплуатации")}</h4>
              </div>
              <ul className="pros-cons-list">
                <li>
                  <strong>{t("Не подходит для микроволновых печей (СВЧ):")}</strong>{' '}
                  {t("Алюминиевая фольга отражает микроволны — использовать строго в духовке, на гриле или сковороде.")}
                </li>
                <li>
                  <strong>{t("Гибкая форма упаковки:")}</strong>{' '}
                  {t("Менее устойчив при вертикальном штабелировании на горячей полке супермаркета по сравнению с лотками.")}
                </li>
                <li>
                  <strong>{t("Калибровка костей при фасовке:")}</strong>{' '}
                  {t("Крупные выступающие острые кости птицы требуют аккуратного размещения во избежание прокола окна.")}
                </li>
                <li>
                  <strong>{t("Контроль пара при вскрытии:")}</strong>{' '}
                  {t("После запекания пакет содержит горячий пар; потребителю необходимо соблюдать осторожность при отрыве пленки.")}
                </li>
              </ul>
            </div>
          </div>

          {/* Pentagon Radar Chart Component */}
          <PentagonRadarChart
            productName="Foil Grill & Oven Bag"
            productColor="#059669"
            productFill="rgba(16, 185, 129, 0.35)"
            metrics={BAG_RADAR_METRICS}
          />

          {/* Layer-by-Layer Product Anatomy Architecture */}
          <ProductAnatomyDiagram productType="bag" />

          {/* Market References & Specs */}
          <div className="product-specifications-grid">
            <div className="spec-box">
              <span className="spec-box-icon">🧱</span>
              <h4>{t("Материалы конструкции (строго 2)")}</h4>
              <p>{t("Дно: Heavy Duty Aluminum Foil (45–60 мкм) · Окно: High-Temp BOPET (19–25 мкм). Без клеевых слоев.")}</p>
            </div>
            <div className="spec-box">
              <span className="spec-box-icon">💨</span>
              <h4>{t("Физика пара (Steam Cooling)")}</h4>
              <p>{t("Испарение влаги продукта поглощает тепло — температура пленки держится ≤110–130°C при 250°C в печи.")}</p>
            </div>
            <div className="spec-box">
              <span className="spec-box-icon">🏷️</span>
              <h4>{t("Официальные референсы")}</h4>
              <p>{t("Ready. Chef. Go! Cooking Bags · Sirane Sira-Cook™ Supreme ($0.15–$0.35 опт).")}</p>
            </div>
          </div>
        </article>
      ) : (
        <article className="showcase-product-detail-card tray-theme">
          <div className="product-detail-header-block">
            <div className="product-title-row">
              <span className="product-flag-chip alt-chip">{t("Экспериментальная модульная термо-комбинация (Zero CAPEX)")}</span>
              <h3 className="product-title-text">{t("Aluminium Tray + Reusable LSR Silicone Steam-Lid (Экспериментальная термо-комбинация)")}</h3>
              <p className="product-concept-text">
                {t("Гибридная система для кулинарии и запекания при 250°C: стандартный биржевой алюминиевый лоток 250/500 мл (нулевые затраты на штамп) и эластичная пищевая силиконовая крышка LSR с паровым микроклапаном под L/G-кромку (контрактное литье в ЕС).")}
              </p>
            </div>
          </div>

          {/* Large Interactive Image Carousel */}
          <div className="product-carousel-deck">
            <div className="carousel-main-viewport">
              <button
                type="button"
                className="carousel-nav-btn prev-btn"
                onClick={() => setTrayImgIdx((i) => (i === 0 ? TRAY_CAROUSEL_IMAGES.length - 1 : i - 1))}
                aria-label="Previous image"
              >
                ‹
              </button>

              <div className="carousel-image-frame">
                <img
                  src={currentTrayImg.url}
                  alt={t(currentTrayImg.title)}
                  className="carousel-hero-img"
                />
                <div className="carousel-caption-overlay">
                  <span className="carousel-view-tag">
                    {t("Ракурс")} {trayImgIdx + 1} / {TRAY_CAROUSEL_IMAGES.length}: {t(currentTrayImg.title)}
                  </span>
                  <p className="carousel-view-desc">{t(currentTrayImg.caption)}</p>
                </div>
              </div>

              <button
                type="button"
                className="carousel-nav-btn next-btn"
                onClick={() => setTrayImgIdx((i) => (i === TRAY_CAROUSEL_IMAGES.length - 1 ? 0 : i + 1))}
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="carousel-thumbs-strip">
              {TRAY_CAROUSEL_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`carousel-thumb-item ${idx === trayImgIdx ? 'active' : ''}`}
                  onClick={() => setTrayImgIdx(idx)}
                >
                  <img src={img.url} alt={t(img.title)} className="thumb-preview" />
                  <span className="thumb-label">{t("Ракурс")} {idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dual Pricing Deck: Wholesale B2B vs Retail */}
          <div className="product-pricing-deck">
            <div className="pricing-card wholesale-card">
              <div className="pricing-badge wholesale-badge">🏢 {t("Оптовая закупка (B2B Bulk & Производство)")}</div>
              <div className="pricing-main-price">
                <span className="price-currency">€</span>
                <span className="price-number">0.23 – 0.38</span>
                <span className="price-unit">/ {t("комплект")} (~1.15–1.90 RON)</span>
              </div>
              <ul className="pricing-breakdown-list">
                <li><strong>{t("Алюминиевый лоток 250/500 мл (паллета):")}</strong> €0.025 – €0.045 / {t("шт.")} (Contital / Plus Pack)</li>
                <li><strong>{t("Силиконовая крышка LSR (тираж 5k–10k):")}</strong> €0.20 – €0.34 / {t("шт.")} (TMRubber / SILCONIC)</li>
                <li><strong>{t("Оснастка / Пресс-форма (CAPEX):")}</strong> €2 000 – €3 500 {t("разово или амортизация +€0.03 в Blanket Order")}</li>
              </ul>
            </div>
            <div className="pricing-card retail-card">
              <div className="pricing-badge retail-badge">🛒 {t("Розничная покупка (Consumer Retail & HoReCa)")}</div>
              <div className="pricing-main-price">
                <span className="price-currency">€</span>
                <span className="price-number">2.90 – 4.80</span>
                <span className="price-unit">/ {t("комплект")} (~14.50–24.00 RON)</span>
              </div>
              <ul className="pricing-breakdown-list">
                <li><strong>{t("Лоток алюминиевый в рознице (5–10 шт.):")}</strong> €0.35 – €0.55 / {t("шт.")}</li>
                <li><strong>{t("Многоразовая крышка LSR (500–1000 циклов):")}</strong> €2.50 – €4.20 / {t("шт.")}</li>
                <li><strong>{t("Себестоимость одного запекания дома:")}</strong> &lt; €0.05 / {t("цикл (чистая экономия)")}</li>
              </ul>
            </div>
          </div>

          {/* Pros & Cons (Преимущества и Недостатки) */}
          <div className="pros-cons-grid">
            <div className="pros-card">
              <div className="pros-cons-header">
                <span className="badge-pro">✅ {t("Преимущества решения")}</span>
                <h4>{t("Сильные стороны комбинации Лоток + Крышка LSR")}</h4>
              </div>
              <ul className="pros-cons-list">
                <li>
                  <strong>{t("Многоразовость крышки (до 1000 циклов):")}</strong>{' '}
                  {t("Платиновый силикон LSR моется в посудомоечной машине и служит годами дома или в оборотной таре ритейла.")}
                </li>
                <li>
                  <strong>{t("Zero CAPEX на алюминиевую базу:")}</strong>{' '}
                  {t("Использование готовых штампов 250 и 500 мл от европейских заводов (Contital, Plus Pack) без затрат на матрицу.")}
                </li>
                <li>
                  <strong>{t("Отказ от запайщика (трейсилера):")}</strong>{' '}
                  {t("Плотное ручное сопряжение паза силикона с бортиком Full Curl G-rim или L-rim за 1 секунду.")}
                </li>
                <li>
                  <strong>{t("Пароотводящие микроотверстия:")}</strong>{' '}
                  {t("Автоматический сброс пара исключает раздувание и разбрызгивание, обеспечивая сочность блюда.")}
                </li>
                <li>
                  <strong>{t("Широкий температурный диапазон (-40°C...+250°C):")}</strong>{' '}
                  {t("Прямой переход из глубокой заморозки в раскаленную печь или на решетку гриля.")}
                </li>
                <li>
                  <strong>{t("100% рециклинг металла в Румынии:")}</strong>{' '}
                  {t("Алюминиевый корпус бесконечно переплавляется в синем контейнере с экономией 95% энергии.")}
                </li>
              </ul>
            </div>

            <div className="cons-card">
              <div className="pros-cons-header">
                <span className="badge-con">⚠️ {t("Ограничения и недостатки")}</span>
                <h4>{t("Инженерные нюансы контрактного внедрения")}</h4>
              </div>
              <ul className="pros-cons-list">
                <li>
                  <strong>{t("Индивидуальная оснастка для крышки:")}</strong>{' '}
                  {t("Разовый бюджет на пресс-форму (€2k–€15k) либо контрактная амортизация (Blanket Order на год).")}
                </li>
                <li>
                  <strong>{t("Минимальный тираж литья (MOQ):")}</strong>{' '}
                  {t("Фабрики силикона требуют заказ от 1 000 – 5 000 шт. для достижения целевой себестоимости.")}
                </li>
                <li>
                  <strong>{t("Логистика оборота крышек:")}</strong>{' '}
                  {t("При использовании в закрытом цикле доставки требуется возврат и мойка (либо продажа покупателю в собственность).")}
                </li>
                <li>
                  <strong>{t("Точность посадочного чертежа (.STEP):")}</strong>{' '}
                  {t("Паз крышки должен проектироваться строго по CAD-спецификации выбранного типоразмера лотка.")}
                </li>
              </ul>
            </div>
          </div>

          {/* Pentagon Radar Chart Component */}
          <PentagonRadarChart
            productName="Aluminium Tray + Silicone LSR Lid"
            productColor="#0284c7"
            productFill="rgba(2, 132, 199, 0.35)"
            metrics={TRAY_RADAR_METRICS}
          />

          {/* Layer-by-Layer Product Anatomy Architecture */}
          <ProductAnatomyDiagram productType="tray" />

          {/* European B2B Manufacturing Dossier */}
          <EuropeanManufacturingDossier />

          {/* Market References & Specs */}
          <div className="product-specifications-grid">
            <div className="spec-box">
              <span className="spec-box-icon">🧱</span>
              <h4>{t("Материалы конструкции (строго 2)")}</h4>
              <p>{t("Корпус: Food Grade Aluminium 60–70 мкм · Крышка: Platinum LSR Silicone 1.2–1.5 мм. 0% клеев.")}</p>
            </div>
            <div className="spec-box">
              <span className="spec-box-icon">🤝</span>
              <h4>{t("Контрактный DFM & Zero CAPEX")}</h4>
              <p>{t("Лоток со склада европейских заводов (€0.025–€0.04) + кастомная крышка по .STEP чертежу (DFM-анализ).")}</p>
            </div>
            <div className="spec-box">
              <span className="spec-box-icon">🏷️</span>
              <h4>{t("Официальные референсы")}</h4>
              <p>{t("Contital / Plus Pack (лотки) + Protolabs / TMRubber / SILCONIC (литье LSR крышек).")}</p>
            </div>
          </div>
        </article>
      )}

      {/* Interactive Savings Calculator */}
      <section className="showcase-calculator-card">
        <div className="calc-header">
          <span className="calc-icon">📊</span>
          <div>
            <h3 className="calc-title">{t("Экологический и экономический калькулятор внедрения")}</h3>
            <p className="calc-subtitle">{t("Сравнение с базовой полипропиленовой упаковкой (PP 32 г первичного пластика на контейнер)")}</p>
          </div>
        </div>

        <div className="calc-slider-box">
          <label htmlFor="volume-slider">
            {t("Планируемый объём фасовки в месяц:")} <strong>{monthlyVolume.toLocaleString()} {t("шт. / месяц")}</strong>
          </label>
          <input
            id="volume-slider"
            type="range"
            min="5000"
            max="100000"
            step="5000"
            value={monthlyVolume}
            onChange={(e) => setMonthlyVolume(Number(e.target.value))}
            className="calc-range-input"
          />
          <div className="range-markers">
            <span>5 000</span>
            <span>25 000</span>
            <span>50 000</span>
            <span>75 000</span>
            <span>100 000</span>
          </div>
        </div>

        <div className="calc-results-grid">
          <div className="calc-metric-subcard">
            <span className="metric-caption">{t("Сокращение первичного пластика")}</span>
            <strong className="metric-large green">-{plasticReductionPct}%</strong>
            <small>{t("с 32 г до ")}{currentPlasticG}{t(" г на упаковку")}</small>
          </div>

          <div className="calc-metric-subcard">
            <span className="metric-caption">{t("Сэкономлено пластика в месяц")}</span>
            <strong className="metric-large green">{plasticSavedKg.toLocaleString()} {t("кг")}</strong>
            <small>{t("чистой экономии полимеров")}</small>
          </div>

          <div className="calc-metric-subcard">
            <span className="metric-caption">{t("Ориентировочный бюджет поставки")}</span>
            <strong className="metric-large blue">~{avgCostRon.toLocaleString()} RON</strong>
            <small>{t("партия с европейской сертификацией")}</small>
          </div>
        </div>

        <div className="calc-cta-row">
          <button
            type="button"
            className="cta-apply-workflow-btn"
            onClick={() => onApplyWorkflow && onApplyWorkflow('P1', 'LITERAL_OVEN_250C_THEN_HOLD')}
          >
            🚀 {t("Применить и протестировать в матрице решений (250°C Workflow) →")}
          </button>
        </div>
      </section>

      {/* Official Laboratory Compliance Certificate Modal */}
      <ComplianceCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        productType={selectedProductTab}
      />
    </div>
  );
}
