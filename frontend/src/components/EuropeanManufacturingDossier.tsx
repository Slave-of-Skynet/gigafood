import React, { useState } from 'react';
import { useTranslation } from '../i18n';

interface SiliconeManufacturer {
  name: string;
  country: string;
  flag: string;
  specialization: string;
  moq: string;
  formatNote: string;
  priceNote: string;
  termsNote: string;
}

interface AluminiumManufacturer {
  name: string;
  country: string;
  flag: string;
  specialization: string;
  moq: string;
  formatNote: string;
  priceNote: string;
  negotiationNote: string;
}

const SILICONE_MANUFACTURERS: SiliconeManufacturer[] = [
  {
    name: 'Protolabs Europe',
    country: 'Германия / Великобритания',
    flag: '🇩🇪 / 🇬🇧',
    specialization: 'Сверхбыстрый прототипинг и малые серии',
    moq: 'От 25 до 10 000 шт.',
    formatNote: 'Строго по вашему 3D-файлу (.STEP). Автоматический DFM-анализ геометрии.',
    priceNote: 'Автоматический онлайн-расчет, торг минимален. Зависит от числа гнезд.',
    termsNote: 'Сроки: 15–20 дней на алюминиевую форму и готовую партию.',
  },
  {
    name: 'Hubs EU (Protiq)',
    country: 'Общеевропейская сеть',
    flag: '🇪🇺',
    specialization: 'Контрактное литье по требованию (On-Demand LSR)',
    moq: 'От 50 до 50 000 шт.',
    formatNote: 'Полная кастомизация геометрии, подбор твердости по Шору (Shore A 40–70).',
    priceNote: 'Гибкая, подбирается под выбор подрядчика в европейской производственной сети.',
    termsNote: 'Удобно для быстрой валидации пилотных образцов и предсерийных тестов.',
  },
  {
    name: 'TMRubber',
    country: 'Польша',
    flag: '🇵🇱',
    specialization: 'Заказные РТИ и LSR-литье без каталога',
    moq: 'От 2 000 – 5 000 шт.',
    formatNote: '100% заказной дизайн крышек и прокладок под чертеж заказчика.',
    priceNote: 'Самая конкурентная цена в ЕС, недорогая стальная и алюминиевая оснастка.',
    termsNote: 'Прямой торг по объему партий, открытость к рассрочке оснастки.',
  },
  {
    name: 'SILCONIC®',
    country: 'Германия',
    flag: '🇩🇪',
    specialization: 'Пищевой силикон, крышки, посуда (BfR / FDA compliant)',
    moq: 'От 1 000 – 5 000 шт.',
    formatNote: 'Адаптация под строгие европейские пищевые нормативы и термостойкость до 250°C.',
    priceNote: 'Средне-высокая (премиальное немецкое качество платиновой вулканизации).',
    termsNote: 'Охотно оптимизируют конструктив изделия под серийное литье (DFM).',
  },
  {
    name: 'SternMaute',
    country: 'Германия',
    flag: '🇩🇪',
    specialization: 'Высокоточное техническое LSR-литье',
    moq: 'От 5 000 – 10 000 шт.',
    formatNote: 'Микронные допуски, прецизионные микроотверстия и паровые клапаны.',
    priceNote: 'Выше среднего, индивидуальный детальный сметный расчет под проект.',
    termsNote: 'Консервативны по цене, чрезвычайно сильны в пресс-формах и материаловедении.',
  },
  {
    name: 'Plax Group',
    country: 'Италия',
    flag: '🇮🇹',
    specialization: 'Литье силикона до +250°C, оптика и пищевые уплотнения',
    moq: 'От 10 000 шт.',
    formatNote: 'Индивидуальные многогнездные пресс-формы высокой производительности.',
    priceNote: 'Очень конкурентная стоимость детали при средних и крупных сериях.',
    termsNote: 'Шкала существенных скидок от годового прогноза поставок (Blanket Order).',
  },
  {
    name: 'Rico Group',
    country: 'Австрия / Швейцария',
    flag: '🇦🇹 / 🇨🇭',
    specialization: 'Премиальные многогнездные пресс-формы и масштабный выпуск',
    moq: 'От 50 000 – 100 000+ шт.',
    formatNote: 'Любая микромеханика клапанов, сложные щелевые рассекатели пара.',
    priceNote: 'Дорогая форма (€15k+), но минимальная копеечная цена готовой детали.',
    termsNote: 'Прямые контракты под масштабный европейский ритейл и фасовочные фабрики.',
  },
];

const ALUMINIUM_MANUFACTURERS: AluminiumManufacturer[] = [
  {
    name: 'Contital S.r.l.',
    country: 'Италия',
    flag: '🇮🇹',
    specialization: 'Крупнейший завод в Южной Европе; штамповка гладкостенных и рифленых контейнеров',
    moq: 'От 1 паллеты (~10 000–30 000 шт. для каталожных моделей)',
    formatNote: 'Огромный готовый каталог (типоразмеры 250 и 500 мл в наличии на складе).',
    priceNote: 'Очень низкая биржевая цена (€0.025–€0.04 / шт.), шкала скидок от тоннажа.',
    negotiationNote: 'Готовы предоставлять точные CAD-чертежи кромки для идеального сопряжения с крышкой.',
  },
  {
    name: 'Plus Pack',
    country: 'Дания / Бельгия',
    flag: '🇩🇰 / 🇧🇪',
    specialization: 'Премиальная пищевая упаковка, фольгированные формы для запекания',
    moq: 'От 1–2 паллет (через дистрибьюторскую сеть — от коробки)',
    formatNote: 'Высокоточные жесткие кромки Smoothwall (L-rim) для плотной посадки замка.',
    priceNote: 'Средний европейский уровень с гарантией чистоты сплава EN AW-3003.',
    negotiationNote: 'Гибкие условия по логистике в пределах ЕС, строгие сертификаты безопасности.',
  },
  {
    name: 'Coppice Alupack',
    country: 'Великобритания',
    flag: '🇬🇧',
    specialization: 'Промышленные лотки из фольги для ритейла и пищевых производств',
    moq: 'От 20 000 – 50 000 шт.',
    formatNote: 'Стандартные европейские гастронормированные размеры с усиленным фланцем.',
    priceNote: 'Конкурентная цена на средних и крупных регулярных партиях.',
    negotiationNote: 'Прямой контракт, скидки при регулярных ежемесячных отгрузках.',
  },
  {
    name: 'Alupkg (Alufoil)',
    country: 'Польша / Чехия',
    flag: '🇵🇱 / 🇨🇿',
    specialization: 'Фольгированная тара для сегмента HoReCa и пищепрома Восточной Европы',
    moq: 'От 1 коробки (у локальных дилеров) до паллеты (напрямую с завода)',
    formatNote: 'Базовые типовые контейнеры 250 мл и 500 мл с кромкой Full Curl (G-rim).',
    priceNote: 'Минимальная логистическая надбавка для Румынии, Польши и Восточной Европы.',
    negotiationNote: 'Максимально простая коммуникация по малым объемам и быстрая отгрузка.',
  },
  {
    name: 'iPac Packaging',
    country: 'Великобритания',
    flag: '🇬🇧',
    specialization: 'Лотки под температурную обработку и кулинарные полуфабрикаты',
    moq: 'От 10 000 – 25 000 шт.',
    formatNote: 'Специальная геометрия под конвекционную выпечку и высокие статические нагрузки.',
    priceNote: 'Зависит от выбранной толщины фольги (55 мкм эконом vs 70 мкм Heavy Duty).',
    negotiationNote: 'Открыты к кастомизации сплава (например, сплав 3003 вместо 8011) под заказчика.',
  },
];

export const EuropeanManufacturingDossier: React.FC = () => {
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<'silicone' | 'aluminium' | 'negotiations'>('silicone');

  return (
    <div className="manufacturing-dossier-card">
      <div className="dossier-header-bar">
        <div className="dossier-title-wrap">
          <span className="dossier-tag">🏭 {t("Реестр европейских B2B производителей")}</span>
          <h3 className="dossier-main-title">
            {t("Контрактное производство модульной системы (Лоток + Силиконовая крышка LSR)")}
          </h3>
          <p className="dossier-lead">
            {t("Сводная карта заводов ЕС: готовая биржевая алюминиевая тара со склада (Zero CAPEX) и контрактное литье прецизионных термостойких крышек по CAD-файлу заказчика.")}
          </p>
        </div>

        <div className="dossier-notice-banner">
          <span className="notice-icon">⚠️</span>
          <div className="notice-text">
            <strong>{t("Правило B2B Custom Molders:")}</strong>{' '}
            {t("Все перечисленные предприятия являются контрактными производителями: у них нет готовых складских изделий с ценниками. Формат изделия, тип оснастки, марка сырья и конечная цена за единицу всегда определяются прямыми переговорами на основе вашего чертежа/CAD-файла.")}
          </div>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="dossier-subtabs-nav">
        <button
          type="button"
          className={`dossier-subtab-btn ${activeTab === 'silicone' ? 'active' : ''}`}
          onClick={() => setActiveTab('silicone')}
        >
          🧪 <strong>{t("1. Литье силиконовых крышек LSR")}</strong> ({SILICONE_MANUFACTURERS.length} {t("фабрик")})
        </button>
        <button
          type="button"
          className={`dossier-subtab-btn ${activeTab === 'aluminium' ? 'active' : ''}`}
          onClick={() => setActiveTab('aluminium')}
        >
          🥫 <strong>{t("2. Производители алюминиевых лотков")}</strong> ({ALUMINIUM_MANUFACTURERS.length} {t("заводов")})
        </button>
        <button
          type="button"
          className={`dossier-subtab-btn ${activeTab === 'negotiations' ? 'active' : ''}`}
          onClick={() => setActiveTab('negotiations')}
        >
          🤝 <strong>{t("3. Регламент и стратегия переговоров")}</strong>
        </button>
      </div>

      {/* Tab 1: Silicone LSR Molders */}
      {activeTab === 'silicone' && (
        <div className="dossier-tab-pane">
          <div className="dossier-table-responsive">
            <table className="dossier-data-table">
              <thead>
                <tr>
                  <th>{t("Фабрика / Платформа")}</th>
                  <th>{t("Страна")}</th>
                  <th>{t("Специализация")}</th>
                  <th>{t("Минимальный тираж (MOQ)")}</th>
                  <th>{t("Возможность договориться по параметрам")}</th>
                </tr>
              </thead>
              <tbody>
                {SILICONE_MANUFACTURERS.map((m, idx) => (
                  <tr key={idx}>
                    <td className="col-factory">
                      <strong>{m.name}</strong>
                    </td>
                    <td className="col-country">
                      <span className="country-badge">{m.flag} {t(m.country)}</span>
                    </td>
                    <td className="col-spec">{t(m.specialization)}</td>
                    <td className="col-moq">
                      <span className="moq-pill">{t(m.moq)}</span>
                    </td>
                    <td className="col-negotiation">
                      <ul className="negotiation-points-list">
                        <li><strong>{t("Формат:")}</strong> {t(m.formatNote)}</li>
                        <li><strong>{t("Цена:")}</strong> {t(m.priceNote)}</li>
                        <li><strong>{t("Сроки / Условия:")}</strong> {t(m.termsNote)}</li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Aluminium Foil Trays */}
      {activeTab === 'aluminium' && (
        <div className="dossier-tab-pane">
          <div className="dossier-intro-box">
            <span className="intro-icon">💡</span>
            <p>
              {t("В отличие от силиконовой крышки, где требуется индивидуальная литьевая форма, алюминиевая база — это массовый биржевой продукт. У всех профильных заводов уже есть сотни готовых штампов (типоразмеры 250 мл и 500 мл с L- и G-образным буртиком подходят под стандарты кейтеринга и пекарен). Это исключает затраты на оснастку: достаточно запросить стандартный каталог лотков (smoothwall или wrinklewall) и передать чертеж внешнего бортика выбранной модели силиконовому заводу.")}
            </p>
          </div>

          <div className="dossier-table-responsive">
            <table className="dossier-data-table">
              <thead>
                <tr>
                  <th>{t("Завод / Производитель")}</th>
                  <th>{t("Страна")}</th>
                  <th>{t("Специализация")}</th>
                  <th>{t("Минимальный заказ (MOQ)")}</th>
                  <th>{t("Возможности договоренностей (формат, цена, условия)")}</th>
                </tr>
              </thead>
              <tbody>
                {ALUMINIUM_MANUFACTURERS.map((m, idx) => (
                  <tr key={idx}>
                    <td className="col-factory">
                      <strong>{m.name}</strong>
                    </td>
                    <td className="col-country">
                      <span className="country-badge">{m.flag} {t(m.country)}</span>
                    </td>
                    <td className="col-spec">{t(m.specialization)}</td>
                    <td className="col-moq">
                      <span className="moq-pill">{t(m.moq)}</span>
                    </td>
                    <td className="col-negotiation">
                      <ul className="negotiation-points-list">
                        <li><strong>{t("Формат:")}</strong> {t(m.formatNote)}</li>
                        <li><strong>{t("Цена:")}</strong> {t(m.priceNote)}</li>
                        <li><strong>{t("Переговоры:")}</strong> {t(m.negotiationNote)}</li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Detailed Negotiations Guide */}
      {activeTab === 'negotiations' && (
        <div className="dossier-tab-pane negotiations-pane">
          <div className="negotiations-columns-grid">
            {/* Column A: Silicone Negotiations */}
            <div className="negotiation-guide-card silicone-guide">
              <div className="guide-header">
                <span className="guide-icon">🧪</span>
                <h4>{t("О чем и как договариваются с силиконовыми заводами")}</h4>
              </div>

              <div className="guide-item">
                <h5>1. {t("О геометрии и микроотверстиях (Формат):")}</h5>
                <p>
                  {t("Вы передаете файл .STEP. Завод проводит DFM-анализ (Design for Manufacturability) и согласует: делать микроотверстия формообразующими пинами в пресс-форме (дешевле при тираже) или лазером после съема (дешевле на этапе формы).")}
                </p>
              </div>

              <div className="guide-item">
                <h5>2. {t("О стоимости единицы (Unit Price):")}</h5>
                <p>
                  {t("Зависит от количества гнезд в пресс-форме (Cavities). С заводом можно договориться о компромиссе: «Делаем пилотную форму на 2–4 гнезда (дешевле запуск), но согласовываем фиксированную цену детали до момента окупаемости».")}
                </p>
              </div>

              <div className="guide-item">
                <h5>3. {t("О стоимости формы (Tooling Cost):")}</h5>
                <p>
                  {t("Если объем регулярного заказа гарантирован контрактом на год вперед (Blanket Order), европейские заводы (особенно в Польше и Италии) соглашаются на амортизацию оснастки — пресс-форма изготавливается с рассрочкой, а ее стоимость закладывается надбавкой в несколько евроцентов к каждой поставленной крышке.")}
                </p>
              </div>
            </div>

            {/* Column B: Aluminium Tray Negotiations */}
            <div className="negotiation-guide-card aluminium-guide">
              <div className="guide-header">
                <span className="guide-icon">🥫</span>
                <h4>{t("О чем и как договариваются с производителями лотков")}</h4>
              </div>

              <div className="guide-item">
                <h5>1. {t("О подборе готовой формы (нулевой CAPEX):")}</h5>
                <p>
                  {t("Переговоры начинаются с запроса: «Нужен лоток без внутреннего лака под температуру +250°C объемом 250 мл (и 500 мл) с типом кромки Full Curl (G-rim) или Smoothwall L-rim». Завод высылает технический паспорт (Spec Sheet) с точными размерами бортика, под которые проектируется паз силиконовой крышки.")}
                </p>
              </div>

              <div className="guide-item">
                <h5>2. {t("О толщине фольги (жесткость «под горло»):")}</h5>
                <p>
                  {t("Стандартный эконом-вариант — фольга 45–50 мкм (может играть в руках при наливе до краев). С заводом можно согласовать прокат из фольги повышенной толщины — 60–70 мкм (Heavy Duty / Semi-rigid). Это добавит к цене доли цента, но обеспечит устойчивость геометрии при наливе жидкости.")}
                </p>
              </div>

              <div className="guide-item">
                <h5>3. {t("О чистоте поверхности и масле (Food Grade Annealing):")}</h5>
                <p>
                  {t("При штамповке используется смазка. На переговорах фиксируется требование: лотки должны пройти финишный высокотемпературный отжиг (Annealing / Degreased foil), чтобы на металле не оставалось следов прокатных масел, которые при +250°C могут дать дым или посторонний запах.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
