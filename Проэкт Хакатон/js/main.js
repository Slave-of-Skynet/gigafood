// Текущий выбранный язык интерфейса (по умолчанию 'ru')
let currentLang = 'ru';

// Полный словарь перевода ВСЕХ элементов страницы на 3 языка (RU / MD / EN)
const dictionary = {
    ru: {
        pageTitle: 'Profi EcoPack — Матрица сертифицированных европейских решений упаковки для горячей кулинарии и гриля',
        login: 'Вход',
        nav: [
            'Критерии Profi (CEE)',
            '1. Флагманы: SACMA Gaia & Bagcraft',
            '2. Духовка 220°C: Hostaphan PCR & Faerch',
            'Матрица выбора (PDF TDS)'
        ],
        heroBadge: 'BIOMENTORHUB × PROFI ROMANIA (1 700+ МАГАЗИНОВ) • МАТРИЦА ИНЖЕНЕРНОГО СОРСИНГА В ЕС',
        heroTitle: 'Зрелая матрица реальных европейских и мировых решений взамен упаковки из 100% Virgin Plastic',
        heroSubtitleHtml: 'В холодном сегменте уже используется 100% переработанный пластик (при этом обычный холодный лоток <b>Faerch K 2182-1G APET #2182015004</b> ограничен <b>+70 °C</b> и деформируется на горячей витрине). Для зоны <b>Profi Grill / Fiesta</b> (запекание 180–220 °C и горячая выкладка 65–85 °C до 6 часов) мы заменяем базовый эталон из 100% первичного полипропилена (<b>Faerch P 2226-1C #2226014004, 26.29 г Virgin PP, предел +121 °C, цена: розница ~€0.125/шт | опт B2B ~€0.078/шт</b>) на <b>верифицированный портфель серийных решений ЕС и США (TRL 9) с подлинными PDF-сертификатами и расчётом розничных и оптовых цен</b> по формуле: <span class="formula-pill">Общий пластик − Вторсырьё (Recycled Content) = Первичный пластик (Virgin Plastic)</span>',
        reqs: [
            {
                num: 'До 200–220 °C',
                name: 'Термостойкость по PDF TDS',
                desc: 'Разделение режимов: горячая витрина 65–85 °C (до 6 ч) и прямое запекание в духовке до 200–220 °C (NatureFlex™ NVO, Hostaphan® RHST, Faerch CPET).'
            },
            {
                num: 'До 6 часов',
                name: 'Стойкость на горячей полке',
                desc: 'Отвод лишнего пара (Performance Ventilation / Self-Venting) сохраняет хрустящую корочку курицы-гриль и долек на тепловой витрине.'
            },
            {
                num: '0% PFAS и ворса',
                name: 'Жиробарьер по нормам ЕС',
                desc: 'Барьерные слои NatureFlex™ NVO, Koehler NexPlus® OGR (KIT 7 без PFAS/акрилатов) и PET-лайнеры удерживают кипящий жир без волокон на еде.'
            },
            {
                num: 'Окно Anti-Fog',
                name: 'Визуальный обзор товара',
                desc: 'Кристально прозрачное окно из целлюлозы NatureFlex™ NVO, антифог-полипропилена ToGo!® или термостойкого ПЭТ (Dubl View® / Hostaphan®).'
            },
            {
                num: 'Розница и Опт B2B',
                name: 'Прозрачная экономика (L и S/M)',
                desc: 'Для каждого решения указана как розничная цена (от 1 короба), так и контрактный крупный опт B2B для сети Profi (в допуске +9…+12.8% к базе и до -25% на S/M).'
            },
            {
                num: '13 оригинал PDF',
                name: 'Подлинные сертификаты',
                desc: 'В проект встроены 13 оригинальных заводских PDF (BRCGS AA+ SACMA, DNV FSC, Intertek 70% PCR Mitsubishi, Koehler NexPlus, Novolex, Faerch).'
            }
        ],
        sectionPouch: '1. Флагманские пакеты с окном для горячей витрины (Размеры L и S/M): Био-целлюлоза SACMA Gaia (0% пластика) и Серийный крафт Bagcraft® / Koehler NexPlus®',
        sectionAlt: '2. Решения для прямого запекания в духовке до +220 °C: Термо-пакеты Mitsubishi Hostaphan® RHST / 70% PCR (Sirane Sira-Cook™) и Лоток Faerch Evolve CPET',
        compareTitle: 'Сравнение с базовой упаковкой из 100% Virgin Plastic (5-угольный график)',
        axisLabels: ['Снижение Virgin', 'Горячая полка', 'Жиробарьер/0 ворса', 'Окно & Экология', 'Цена & Масса'],
        btnOld: '🔴 База 100% Virgin (#2226014004)',
        actionDetails: '🔬 1. Детали и состав товара',
        actionCert: '📜 2. Открыть сертификат (PDF TDS)',
        actionBuy: '🛒 3. Прямая ссылка на товар ↗',
        radarUI: {
            formulaLabel: 'Формула Virgin Plastic:',
            plasticWord: 'г пластика −',
            recycledWord: 'г вторсырья',
            virginWord: 'г Virgin',
            vsBase: 'против',
            atBase: 'у базы →',
            totalMass: 'Общая масса:',
            price: 'Разница оптовой цены B2B:',
            hoverHint: 'Наведите на кнопки выше для деталей и цен (Розница / Опт)',
            calcLabel: 'Расчёт пластика по TDS:',
            totalPlasticWord: 'Общий пластик',
            recycledCapWord: 'г − Вторсырьё',
            virginFullWord: 'г Virgin Plastic',
            primary100: '100% первичный пластик',
            specsLabel: 'Данные паспорта и цены (Розница / Опт):',
            baseProblemLabel: 'Проблема и цена базового эталона:'
        },
        products: [
            {
                badge: '🏆 ФЛАГМАН ЕС (ВАРИАНТ 1) • SACMA B.LIFE® GAIA × NATUREFLEX™ 30 NVO (0% ПЛАСТИКА)',
                name: 'SACMA S.p.A. B.Life® GAIA × Futamura NatureFlex™ 30 NVO (Термо-пакет с окном — Размеры L и S/M, Италия)',
                info: 'Реально производимый в Европе (SACMA S.p.A., Адро, Италия, серт. BRCGS Issue 7 Grade AA+ № 72228-2010-ABRC и DNV FSC-COC-000967) запатентованный пакет для горячей курицы-гриль и кулинарии. Сочетает бумагу FSC® (с волокнами травы / крафт) и внутренний термосвариваемый барьер + прозрачное окно из древесной целлюлозной плёнки <b>Futamura NatureFlex™ 30 NVO</b> (выдерживает духовку до <b>200 °C / 30 мин</b>, СВЧ, горячую полку и заморозку до -40 °C). <b>0.00 г пластика (-100% Virgin Plastic)</b>, перерабатывается в макулатуре (<b>PAP 22 Aticelca®</b>). <b>Цена за 1 шт: Розница (1 короб 500 шт) — ~€0.145/шт (€72.50/короб L) и ~€0.095/шт (S/M) | Крупный опт B2B (от 25 000 шт) — ~€0.088/шт (L, +12.8% к базе) и ~€0.058/шт (S/M, -25% дешевле лотка!).</b>',
                btnEco: '🟢 Эко-товар (SACMA B.Life® GAIA)',
                layersTitle: '🔬 Реальный состав, цены и параметры (SACMA S.p.A. B.Life® GAIA + Futamura NatureFlex™ 30 NVO):',
                layers: [
                    '<b>Внешний каркас (FSC® Certified Paper):</b> Первичная и переработанная целлюлоза FSC® (DNV-COC-000967) с добавлением волокон луговой травы (Grass Paper) — высокая жёсткость в форматах L (целая курица) и S/M (порции)',
                    '<b>Внутренний лайнер и окно (Futamura NatureFlex™ 30 NVO, 30 мкм):</b> Регенерированная целлюлоза из древесной массы (96% bio-based carbon, DIN CERTCO 9S0002), двухсторонняя термосварка — 100% защита от протечек куриного сока и горячего жира',
                    '<b>Температурный допуск (по спецификации Futamura & SACMA):</b> Разогрев в духовке до 200 °C (до 30 мин), СВЧ-печь, горячая витрина 65–85 °C и шоковая заморозка до -40 °C',
                    '<b>Цена за единицу (Розница vs Опт B2B для сети Profi):</b> <b>Розница (1–5 коробов по 500 шт):</b> ~€0.145/шт (€72.50/короб L) и ~€0.095/шт (€47.50/короб S/M) • <b>Крупный опт B2B (от 25 000–50 000+ шт):</b> <b>~€0.088/шт (€44.00/короб L, +12.8% к оптовой базе €0.078)</b> и <b>~€0.058/шт (€29.00/короб S/M, на 25% дешевле лотка)</b> + 0 € налога на пластик!'
                ],
                certsTitle: '📜 Подлинные сертификаты и экономика (BRCGS AA+ & DNV FSC®):',
                certs: [
                    '🏭 Производитель: SACMA S.p.A. (Италия) + Futamura',
                    '🏅 BRCGS Packaging Issue 7: Высший грейд AA+',
                    '🌲 Сертификат DNV FSC®: DNV-COC-000967 (до 2029)',
                    '🌡️ Режим: -40 °C…+200 °C (Духовка / СВЧ / Витрина)',
                    '💶 Розница: €0.145/шт (L) | Опт B2B: €0.088/шт (L) и €0.058/шт (S/M)',
                    '🌱 Пластик: 0.00 г vs 26.29 г базы (-100% Virgin)'
                ]
            },
            {
                badge: '🥇 СЕРИЙНЫЙ КРАФТ L и S/M • BAGCRAFT® #301051 / #301011 / #301056 & KOEHLER NEXPLUS® OGR',
                name: 'Bagcraft® EcoCraft® ToGo! (#301051 L / #301011 S/M / #301056 Paper-PET) & Бюджетная моно-бумага ЕС Koehler NexPlus® OGR / Mondi',
                info: 'Готовые крупносерийные пакеты для тепловой витрины 65–85 °C из заводских PDF-каталогов <b>Novolex / Bagcraft®</b> (док. <b>B_PG_1093_0922</b> и <b>NVX-12832026</b>: <b>#301051</b> для целой курицы L, <b>#301011 / #301043</b> для крылышек S/M и <b>#301056 Paper/PET</b> «PET film ideal for hot food applications»), а также европейская бюджетная моно-бумажная опция (Вариант 3) из без-PFAS жиростойкой бумаги <b>Koehler NexPlus® OGR (KIT Level 7)</b> / <b>Mondi FunctionalBarrier Paper</b> (заводы в Австрии, Словакии и Бухаресте) с окном из прозрачной бумаги <b>Ahlstrom Cristal™</b>. <b>Цена за 1 шт: Розница (1 короб) — #301051 L: $0.176/шт (~€0.162/шт, $43.99/короб 250 шт) и #301011 S/M: $0.093/шт (~€0.085/шт, $46.49/короб 500 шт) | Крупный опт B2B — #301051 L: ~€0.086/шт ($0.094/шт, +10.2% к базе), #301011 S/M: ~€0.052/шт, Моно-бумага Koehler/Mondi: ~€0.042–€0.055/шт (-30% дешевле пластикового лотка!).</b>',
                btnEco: '🟢 Эко-товар (Bagcraft #301051/#301011)',
                layersTitle: '🔬 Точные паспортные данные и цены из 4 заводских PDF (Novolex Bagcraft® & Koehler Paper SE):',
                layers: [
                    '<b>Размер L — Целая курица (Bagcraft® #301051, UPC 10072181010519):</b> 8.75 × 6.00 × 10.75 in. (222.3 × 152.4 × 273.1 мм) • 250 шт/короб • Вес короба по PDF: 15.83 lbs (брутто 28.72 г/шт; инженерная оценка тонкого окна Anti-Fog PP: ~1.80–2.20 г пластика = -91.6% к базе)',
                    '<b>Размер S/M — Крылышки и дольки (#301011 / #301043 / #301056 Paper-PET):</b> #301011 (127 × 76 × 244 мм, 500 шт/короб, 13.50 lbs = 12.25 г/шт, окно ~1.45 г = -94.5% пластика); #301056 / #300091 (док. NVX-12832026: бумага + термостойкое ПЭТ-окно для горячих блюд)',
                    '<b>Бюджетный моно-бумажный вариант ЕС (Koehler NexPlus® OGR & Mondi FunctionalBarrier):</b> Жиростойкость KIT Level 7 (док. Koehler от 16.03.2023) <b>100% без фторполимеров PFAS и без акрилатов</b> + матовое окно из каландрированной целлюлозы Ahlstrom Cristal™ для сухих горячих закусок (картофель wedges, стрипсы)',
                    '<b>Цена за единицу (Розница 1 короб vs Крупный опт B2B):</b> <b>Розница:</b> #301051 L (250 шт) = $43.99/короб ($0.176/шт ≈ €0.162/шт); #301011 S/M (500 шт) = $46.49/короб ($0.093/шт ≈ €0.085/шт); Моно-бумага = ~€0.075/шт • <b>Крупный опт B2B (от 50 000+ шт):</b> <b>#301051 L = ~€0.086/шт ($0.094/шт, $23.50/короб, +10.2% к базе)</b>; <b>#301011 S/M = ~€0.052/шт ($0.057/шт)</b>; <b>Моно-бумага Koehler/Mondi = ~€0.042–€0.055/шт (+6% к простой бумаге и на 30% дешевле лотка PP!)</b>'
                ],
                certsTitle: '📜 Доказательная база и цены (4 оригинальных PDF в модальном окне):',
                certs: [
                    '🏭 Novolex Bagcraft® (США) & Koehler Paper (ФРГ)',
                    '📄 PDF: B_PG_1093_0922, NVX-12832026 & Koehler OGR',
                    '🛡️ KIT Level 7 (PFAS-Free & Acrylate-Free)',
                    '👁️ Окно Anti-Fog PP / Hot-Food PET / Cristal™',
                    '💶 Розница: €0.162/шт (L) | Опт B2B: €0.086/шт (L), €0.052 (S/M), €0.045 (NexPlus)',
                    '♻️ Пластик окна: 0.00–2.20 г (-91.6%…-100%)'
                ]
            },
            {
                badge: '🔥 ДУХОВКА 220°C + 70% PCR (ВАРИАНТ 2) • MITSUBISHI HOSTAPHAN® RHST / PCR & SIRANE SIRA-COOK™',
                name: 'Mitsubishi Hostaphan® RHST / RPSP PL (220 °C) & Hostaphan® 70% PCR rPET (Конвертация Sirane Sira-Cook™ Польша / ЕС)',
                info: 'Технический бенчмарк на случай, если технологам Profi требуется запекать курицу или полуфабрикаты прямо в пакете в конвекционной печи. Доказано <b>4 подлинными немецкими PDF-документами Mitsubishi Polyester Film GmbH (Висбаден, ФРГ)</b>: плёнка <b>Hostaphan® RHST</b> (21–42 г/м², без сурьмы) выдерживает <b>до +220 °C в течение 120 минут</b>, <b>Hostaphan® RPSP PL</b> обеспечивает <b>авто-сброс пара (Self-Venting) при -40…+220 °C</b>, а <b>сертификат Intertek № RC-20260727-01(b) (ISO 14021:2016)</b> официально подтверждает <b>70% Post-Consumer Recycled (PCR)</b> в линейке <b>Hostaphan® rPET</b> (и 30% PCR в ядре коэкструзии <b>PCR PR3F</b>). Готовые пакеты в регионе CEE выпускает завод <b>Sirane Group / KM Packaging (Польша, линейка Sira-Cook™)</b>. <b>Цена за 1 шт: Розница (1 короб 500 шт) — ~€0.140/шт (€70.00/короб) | Крупный опт B2B (от 50 000+ шт) — ~€0.085/шт (€42.50/короб, +9.0% к базе €0.078).</b>',
                btnEco: '🟢 Эко-товар (Hostaphan® RHST/70% PCR)',
                layersTitle: '🔬 Точные паспортные данные и цены из 4 PDF Mitsubishi Polyester Film GmbH (Висбаден, Германия):',
                layers: [
                    '<b>TDS Hostaphan® RHST (Edition 06/23):</b> Двуосноориентированная коэкструдированная ПЭТ-плёнка для пакетов запекания (15–30 мкм, 21–42 г/м², прочность 230–270 Н/мм², Haze 2%) • Допуск: <b>до +220 °C до 120 минут</b> (предупреждение TDS стр. 3: избегать нагрева >250 °C и открытых ТЭНов)',
                    '<b>TDS Hostaphan® RPSP PL (Edition 06/23):</b> Прозрачная плёнка 25 мкм (35 г/м²) с функцией <b>Self-Venting (самостоятельный отвод пара при разогреве)</b> и лёгким открытием Easy-Peel, диапазон <b>от -40 °C до +220 °C (30 мин)</b>',
                    '<b>Сертификат Intertek RC-20260727-01(b) & TDS Hostaphan® PCR PR3F:</b> Подтверждено <b>70% PCR rPET (ISO 14021:2016)</b> для артикулов 7CDA, 7CRN, 7RCD, 7RD, 7RN, PR7N и <b>30% PCR в центральном слое (PCR PR3F)</b> с первичными внешними слоями (EU 1935/2004 и 10/2011)',
                    '<b>Цена за единицу (Розница vs Опт B2B) и баланс пластика (~12.0 г):</b> <b>Розница (1 короб 500 шт):</b> ~€0.140/шт (€70.00/короб) • <b>Крупный опт B2B (от 50 000+ шт с завода Sirane Польша):</b> <b>~€0.085/шт (€42.50/короб, +9.0% к базовому опту €0.078)</b> • При 70% PCR остаётся всего <b>3.60 г Virgin Plastic (-86.3% к базе 26.29 г)</b>'
                ],
                certsTitle: '📜 Доказательная база и цены (Сертификат Intertek + 3 TDS Hostaphan®):',
                certs: [
                    '🏭 Mitsubishi Polyester Film (ФРГ) & Sirane (Польша)',
                    '🏅 Сертификат Intertek: RC-20260727-01(b) (70% PCR)',
                    '🔥 TDS Hostaphan® RHST: 220 °C в течение 120 мин',
                    '💨 TDS Hostaphan® RPSP PL: Self-Venting (-40…+220 °C)',
                    '💶 Розница: €0.140/шт (€70/короб) | Опт B2B: €0.085/шт (+9.0%)',
                    '♻️ Virgin Plastic: 3.60 г (при 70% PCR) vs 26.29 г (-86.3%)'
                ]
            },
            {
                badge: '⚖️ ЖЁСТКИЙ ЛОТОК 220°C • FAERCH C 2200-1L CPET (#2200012097) vs PP (+121°C) & APET (+70°C)',
                name: 'Faerch C 2200-1L Evolve CPET (#2200012097, -40…+220 °C) против Базы PP (#2226014004, +121 °C) и Холодного APET (#2182015004, +70 °C)',
                info: 'Эталонное сравнение по <b>3 подлинным датским техпаспортам Faerch A/S</b>: 1) <b>Faerch C 2200-1L Evolve CPET (#2200012097)</b> имеет массу корпуса <b>21.38 г ± 10%</b> (на -18.7% легче базы уже до учёта PCR!) и выдерживает <b>от -40 °C до +220 °C (Dual-Ovenable)</b>; 2) Базовый <b>Faerch P 2226-1C PP (#2226014004)</b> весит <b>26.29 г из 100% первичного PP</b> и ограничен <b>+121 °C (Microwave only)</b>; 3) Холодный <b>Faerch K 2182-1G Clear APET (#2182015004, 21.48 г)</b> ограничен <b>+70 °C (Not ovenable)</b>, что документально объясняет, почему обычный холодный rPET нельзя ставить на горячую витрину Profi! <b>Цена за 1 шт: CPET #2200012097 — Розница (1 короб 544 шт): ~€0.155/шт (€84.30/короб) | Опт B2B (паллета): ~€0.091/шт (€49.50/короб, +16.5%) против Базы PP #2226014004 — Розница: ~€0.125/шт (€60.00/короб 480 шт) | Опт B2B: ~€0.078/шт (€37.40/короб).</b>',
                btnEco: '🟢 Эко-товар (Faerch #2200012097)',
                layersTitle: '🔬 Точные паспортные данные и цены из 3 заводских PDF Faerch A/S (Дания):',
                layers: [
                    '<b>Кандидат для духовки (Faerch C 2200-1L Evolve CPET #2200012097, TDS от 09.01.2023):</b> 220.2 × 165.2 × 45.0 мм • Объём 1126 мл • 550 мкм • Масса корпуса: <b>21.38 г ± 10%</b> • Рецепт 6811 • <b>-40 °C…+220 °C (Dual ovenable)</b> • 544–570 шт/короб',
                    '<b>Честная граница доказательств по PCR % (стр. 3 TDS #2200012097):</b> В публичном TDS Faerch указывает, что точная доля rPET колеблется от года к году и выдаётся по запросу (SKU point PCR = UNKNOWN в публичном TDS). При гарантированном полу линейки Evolve (40% rPET) Virgin Plastic = <b>12.83 г (-51.2%)</b>; при потолке платформы Evolve (до 70% PCR, релиз Faerch 20.11.2024) = <b>6.41 г (-75.6%)</b>',
                    '<b>Базовый эталон (Faerch P 2226-1C Clear PP #2226014004, TDS от 20.02.2026) и Холодный APET (#2182015004):</b> База PP: 226.5 × 177.8 × 40.0 мм • 1084 мл • <b>26.29 г ± 10%</b> (100% prime PP = 0% PCR, предел +121 °C); Холодный APET #2182015004: 21.48 г, предел <b>+70 °C (Not ovenable)</b>',
                    '<b>Цена за единицу (Розница 1 короб vs Опт B2B паллета):</b> <b>Faerch CPET #2200012097:</b> Розница = ~€0.155/шт (€84.30/короб 544 шт) | Крупный опт B2B (паллета 6 528–11 400 шт) = <b>~€0.091/шт (€49.50/короб, +16.5% к базе)</b> • <b>База PP #2226014004:</b> Розница = ~€0.125/шт (€60.00/короб 480 шт) | Крупный опт B2B (паллета 11 520 шт) = <b>~€0.078/шт (€37.40/короб)</b>'
                ],
                certsTitle: '📜 Доказательная база и цены (3 прямых PDF-паспорта Faerch A/S):',
                certs: [
                    '🏭 Производитель: Faerch A/S (Holstebro, Дания)',
                    '📄 3 оригинала PDF: #2200012097, #2226014004, #2182015004',
                    '🌡️ CPET: -40…+220 °C | PP: +121 °C | APET: +70 °C',
                    '🍲 Режим: Dual-Ovenable (Конвектомат и СВЧ)',
                    '💶 CPET Розница: €0.155/шт | Опт B2B: €0.091/шт (vs База €0.125 / €0.078)',
                    '♻️ Virgin Plastic: 6.41–12.83 г vs 26.29 г базы (-51%…-75.6%)'
                ]
            }
        ],
        matrixTitle: 'Матрица инженерного выбора для сети Profi (по подлинным заводским PDF-сертификатам и TDS)',
        matrixHeaders: [
            'Критерий оценки (по PDF TDS)',
            '🔴 Публичная База 100% Virgin PP (Faerch #2226014004) & Холодный APET (#2182015004)',
            '🏆 1. Флагман ЕС: SACMA B.Life® GAIA × Futamura NatureFlex™ 30 NVO',
            '🥇 2. Витрина & Моно-Бумага: Bagcraft® ToGo! (#301051 / #301011) & Koehler NexPlus® OGR',
            '🔥 3. Бенчмарки Духовки 220°C: Hostaphan® RHST / 70% PCR & Лоток Faerch CPET (#2200012097)'
        ],
        matrixRows: [
            [
                '<b>Производитель, Страна и Документ</b>',
                '<b>Faerch A/S (Дания)</b><br>PP #2226014004 (EAN 5701022905797)<br>APET #2182015004 (EAN 5703969013399)',
                '<b>SACMA S.p.A. (Италия) + Futamura (UK/EU)</b><br>BRCGS Issue 7 Grade AA+ & DNV FSC-COC-000967',
                '<b>Novolex Bagcraft® (США) & Koehler Paper (ФРГ) / Mondi (Австрия/Румыния)</b><br>B_PG_1093_0922, NVX-12832026 & NexPlus OGR',
                '<b>Mitsubishi Polyester Film (ФРГ) / Sirane (Польша) & Faerch A/S (Дания)</b><br>Intertek RC-20260727-01(b) & TDS #2200012097'
            ],
            [
                '<b>Сценарий в сети Profi Romania</b>',
                'Холодный APET плавится при >70 °C; Базовый PP ограничен +121 °C (СВЧ)',
                '<b>Флагман (Размеры L и S/M):</b> Горячая витрина 65–85 °C + разогрев в печи до 200 °C и СВЧ',
                '<b>Быстрый Drop-in (L и S/M):</b> Горячая витрина после гриля (65–85 °C до 6 ч) и сухие горячие закуски',
                '<b>Прямое запекание в печи (до 220 °C):</b> Если курица или блюдо запекается прямо в упаковке'
            ],
            [
                '<b>Общая масса и структура</b>',
                '<b>26.29 г ± 10%</b> (PP #2226014004)<br><b>21.48 г ± 10%</b> (APET #2182015004)',
                '<b>~14–24 г (S/M и L):</b> Бумага FSC® + термосвариваемый био-лайнер и окно NatureFlex™ 30 NVO (30 мкм)',
                '<b>L (#301051):</b> 28.72 г брутто (~2.20 г окно PP)<br><b>S/M (#301011):</b> 12.25 г брутто (~1.45 г окно)<br><b>NexPlus® OGR:</b> 100% бумага (0 г пластика)',
                '<b>Пакет Hostaphan® / Sira-Cook™:</b> ~12.0 г (21–42 г/м²)<br><b>Лоток Faerch CPET:</b> 21.38 г ± 10% (-18.7% легче PP)'
            ],
            [
                '<b>Расчёт Virgin Plastic</b><br><small>(Общий пластик − Вторсырьё)</small>',
                '26.29 г − 0 г =<br><b>26.29 г Virgin (100% первичный PP)</b>',
                '0.00 г пластика =<br><b>0.00 г Virgin (-100% пластика; 100% растительная целлюлоза)</b>',
                '<b>Bagcraft L:</b> ~2.20 г (<b>-91.6%</b>)<br><b>Bagcraft S/M:</b> ~1.45 г (<b>-94.5%</b>)<br><b>Koehler / Mondi:</b> 0.00 г (<b>-100%</b>)',
                '<b>Hostaphan (70% PCR Intertek):</b> 12 − 8.4 = <b>3.60 г (-86.3%)</b><br><b>Faerch CPET (40–70% rPET):</b> <b>6.41–12.83 г (-51%…-75.6%)</b>'
            ],
            [
                '<b>Цена за 1 шт и короб:<br>Розница (1 короб) vs Опт B2B (Profi)</b>',
                '<b>Розница (480 шт):</b> ~€0.125/шт (€60.00/короб)<br><b>Крупный опт B2B:</b> <b>~€0.078/шт (€37.40/короб)</b> + налог AFM за 26.29 г пластика',
                '<b>Розница (500 шт):</b> ~€0.145/шт (L) | ~€0.095/шт (S/M)<br><b>Опт B2B (от 25 тыс. шт):</b> <b>~€0.088/шт (L, +12.8%) и ~€0.058/шт (S/M, -25%)</b> + 0 € налога',
                '<b>Розница:</b> L #301051: $0.176/шт (~€0.162, $43.99/250 шт) | S/M #301011: $0.093/шт (~€0.085)<br><b>Опт B2B:</b> <b>L: ~€0.086/шт (+10.2%) | S/M: ~€0.052/шт | Моно-бумага: ~€0.042–€0.055/шт</b>',
                '<b>Пакет Sira-Cook™:</b> Розница ~€0.140/шт | <b>Опт B2B: ~€0.085/шт (+9.0%)</b><br><b>Лоток CPET #2200012097:</b> Розница ~€0.155/шт | <b>Опт B2B: ~€0.091/шт (+16.5%)</b>'
            ],
            [
                '<b>Температурный допуск (по PDF)</b>',
                'APET: -40…+70 °C (Not ovenable)<br>PP: 0…+121 °C (Microwave only)',
                '✅ <b>-40 °C…+200 °C (до 30 мин)</b><br>(Духовка, СВЧ, горячий шкаф и заморозка)',
                '✅ <b>Hot Meal Warming Display (65–85 °C)</b><br>(Вентиляция пара + PET-окно в #301056)',
                '✅ <b>-40 °C…+220 °C (до 120 мин у RHST)</b><br>(Dual-Ovenable: конвектомат и СВЧ по TDS)'
            ],
            [
                '<b>Жиробарьер и отсутствие ворса</b>',
                'Пластик PP/APET (0% ворса)',
                '✅ <b>Герметичный термосварной слой NatureFlex™ NVO • 0% волокон и протечек</b>',
                '✅ <b>Anti-Fog подкладка / KIT Level 7 без PFAS и акрилатов (Koehler NexPlus® OGR)</b>',
                '✅ <b>Коэкструзия BoPET (Antimony-Free) & Кристаллический CPET • 0% волокон</b>'
            ],
            [
                '<b>Утилизация и налог AFM Румыния (OUG 6/2021 & PPWR)</b>',
                'Полный сбор за первичный пластик (26.29 г Virgin PP на порцию)',
                '✅ <b>PAP 22 (переработка в бумаге Aticelca®) + OK Compost HOME (Нулевой сбор за пластик)</b>',
                '✅ <b>Снижение полимерного сбора на 91–100% • Локальная конвертация в Румынии (Mondi Bucharest / EcoPaper)</b>',
                '✅ <b>Мономатериал ПЭТ (NIR Detectable = Yes) с верифицированным рециклатом ISO 14021</b>'
            ],
            [
                '<b>Оригинальные PDF-документы, встроенные в проект</b>',
                '<code>Faerch-P-2226-1C-PP-2226014004-TDS.pdf</code><br><code>Faerch-K-2182-1G-APET-2182015004-TDS.pdf</code>',
                '✅ <code>SACMA-BRCGS-Food-Packaging-Certificate-2026-2027.pdf</code><br>✅ <code>SACMA-DNV-FSC-Certificate-DNV-COC-000967.pdf</code>',
                '✅ <code>Bagcraft-ToGo-Hot-Foods-Spec-B_PG_1093.pdf</code><br>✅ <code>Novolex-Dubl-View-ToGo-Deli-Bags-PET-Window.pdf</code><br>✅ <code>Koehler-NexPlus-OGR-Grease-Resistant-Paper-Official.pdf</code>',
                '✅ <code>Intertek-Certificate-Mitsubishi-Hostaphan-PCR-2025.pdf</code><br>✅ <code>Mitsubishi-Hostaphan-RHST-Ovenable-Roasting-Bags-TDS.pdf</code><br>✅ <code>Faerch-C-2200-1L-CPET-2200012097-TDS.pdf</code>'
            ]
        ],
        certModal: {
            title: '📜 Официальный заводской сертификат и Технический паспорт (PDF TDS)',
            orgPrefix: 'ПОДЛИННЫЙ ЗАВОДСКОЙ ДОКУМЕНТ / СЕРТИФИКАТ •',
            docNoLabel: 'Документ №:',
            rowDim: 'Точные габариты, фасовка и область применения',
            rowStd: 'Официальные сертификаты и стандарты ЕС/США',
            rowLayers: 'Реальный состав и барьерная структура',
            rowTemp: 'Температурный допуск и режим работы',
            rowPrice: 'Цена за единицу и короб (Розница vs Крупный опт B2B)',
            rowVirgin: 'Материальный баланс Virgin Plastic (против базы 26.29 г)',
            tabsHint: '📂 Выберите оригинальный заводской PDF-сертификат для просмотра:',
            embedTitle: '📑 Встроенный подлинный PDF-документ (листайте страницы внутри окна):',
            openLocalPdfBtn: '📄 Открыть текущий оригинал PDF в новой вкладке ↗',
            openLiveUrlBtn: '🌐 Прямая ссылка на страницу товара / спецификацию (200 OK) ↗',
            openBuyUrlBtn: '🛒 Перейти к товару на сайте поставщика (200 OK) ↗',
            printBtn: '🖨️ Печать'
        },
        adminModal: {
            title: 'Инженерная панель: Добавление и расчёт образца упаковки',
            descHtml: 'Введите паспортные данные реального образца (TDS), ссылку на его сертификат и сайт поставщика. Система автоматически рассчитает массу Virgin Plastic по формуле <b>Общий пластик − Вторсырьё</b> относительно базового эталона (26.29 г Virgin PP) и построит 5-угольный радарный график.',
            labels: [
                'Название и артикул реального товара:',
                'Ссылка на фото товара:',
                'Ссылка на сайт покупки (Кнопка 3):',
                'Ссылка на PDF-сертификат / TDS (Кнопка 2):',
                'Краткое описание и послойный состав:',
                'Стандарты сертификации:',
                'Общая масса (г):',
                'Масса пластика в ней (г):',
                'Доля вторсырья PCR (%):',
                'Разница в цене (%):',
                'Макс. температура (°C):',
                'Жиробарьер / 0 ворса (%):',
                'Окно и Экология (%):'
            ],
            namePlaceholder: 'Напр.: SACMA B.Life® GAIA / Bagcraft® #301051',
            infoPlaceholder: 'Бумага FSC® + термосвариваемый био-лайнер и окно Futamura NatureFlex™ 30 NVO',
            submitBtn: 'Рассчитать по формуле и добавить карточку с 3 кнопками и 5-угольным графиком'
        }
    },
    md: {
        pageTitle: 'Profi EcoPack — Matricea soluțiilor europene certificate de ambalare pentru gastronomie caldă și rotisor',
        login: 'Intră',
        nav: [
            'Criterii Profi (CEE)',
            '1. Fanion UE: SACMA Gaia & Bagcraft',
            '2. Cuptor 220°C: Hostaphan PCR & Faerch',
            'Matricea de selecție (PDF TDS)'
        ],
        heroBadge: 'BIOMENTORHUB × PROFI ROMANIA (1 700+ MAGAZINE) • MATRICE DE SOURCING INGINERESC ÎN UE',
        heroTitle: 'Matrice matură de soluții europene și globale reale în locul ambalajului din 100% Virgin Plastic',
        heroSubtitleHtml: 'În segmentul rece se utilizează deja plastic 100% reciclat (însă casoleta rece standard <b>Faerch K 2182-1G APET #2182015004</b> este limitată la <b>+70 °C</b> și se deformează pe vitrina caldă). Pentru zona <b>Profi Grill / Fiesta</b> (coacere 180–220 °C și vitrină caldă 65–85 °C până la 6 ore) înlocuim etalonul din 100% polipropilenă primară (<b>Faerch P 2226-1C #2226014004, 26.29 g Virgin PP, limită +121 °C, preț: retail ~€0.125/buc | en-gros B2B ~€0.078/buc</b>) cu un <b>portofoliu verificat de soluții industriale din UE și SUA (TRL 9) cu certificate PDF originale și prețuri retail & en-gros</b> după formula: <span class="formula-pill">Plastic total − Conținut reciclat (Recycled) = Plastic primar (Virgin Plastic)</span>',
        reqs: [
            {
                num: 'Până la 200–220 °C',
                name: 'Termorezistență conform PDF TDS',
                desc: 'Separarea regimurilor: vitrină caldă 65–85 °C (până la 6 ore) și coacere directă în cuptor până la 200–220 °C (NatureFlex™ NVO, Hostaphan® RHST, Faerch CPET).'
            },
            {
                num: 'Până la 6 ore',
                name: 'Stabilitate pe vitrina caldă',
                desc: 'Evacuarea aburului (Performance Ventilation / Self-Venting) păstrează crusta crocantă a puiului la rotisor și a cartofilor pe raftul termic.'
            },
            {
                num: '0% PFAS și fibre',
                name: 'Barieră grăsime conform UE',
                desc: 'Straturile barieră NatureFlex™ NVO, Koehler NexPlus® OGR (KIT 7 fără PFAS/acrilați) și PET rețin grăsimea fierbinte fără fibre pe mâncare.'
            },
            {
                num: 'Fereastră Anti-Fog',
                name: 'Vizibilitate excelentă',
                desc: 'Fereastră cristalină din celuloză NatureFlex™ NVO, polipropilenă anti-aburire ToGo!® sau PET termorezistent (Dubl View® / Hostaphan®).'
            },
            {
                num: 'Retail & En-gros B2B',
                name: 'Economie transparentă (L și S/M)',
                desc: 'Pentru fiecare soluție sunt indicate atât prețul retail (la 1 cutie), cât și prețul contractual en-gros B2B pentru rețeaua Profi (+9…+12.8% vs bază și -25% la S/M).'
            },
            {
                num: '13 PDF originale',
                name: 'Certificate autentice',
                desc: 'Proiectul include 13 PDF-uri originale de fabrică (BRCGS AA+ SACMA, DNV FSC, Intertek 70% PCR Mitsubishi, Koehler NexPlus, Novolex, Faerch).'
            }
        ],
        sectionPouch: '1. Pungi fanion cu fereastră pentru vitrina caldă (Mărimi L și S/M): Bio-celuloză SACMA Gaia (0% plastic) și Kraft de serie Bagcraft® / Koehler NexPlus®',
        sectionAlt: '2. Soluții pentru coacere directă în cuptor până la +220 °C: Pungi termice Mitsubishi Hostaphan® RHST / 70% PCR (Sirane Sira-Cook™) și Casoleta Faerch Evolve CPET',
        compareTitle: 'Comparație cu ambalajul de bază din 100% Virgin Plastic (Grafic pentagonal)',
        axisLabels: ['Reducere Virgin', 'Vitrină caldă', 'Barieră grăsime', 'Fereastră & Eco', 'Preț & Greutate'],
        btnOld: '🔴 Bază 100% Virgin (#2226014004)',
        actionDetails: '🔬 1. Detalii și compoziția produsului',
        actionCert: '📜 2. Deschide certificatul (PDF TDS)',
        actionBuy: '🛒 3. Link direct către produs ↗',
        radarUI: {
            formulaLabel: 'Formula Virgin Plastic:',
            plasticWord: 'g plastic −',
            recycledWord: 'g reciclat',
            virginWord: 'g Virgin',
            vsBase: 'față de',
            atBase: 'la bază →',
            totalMass: 'Masa totală:',
            price: 'Diferență preț B2B:',
            hoverHint: 'Treceți cursorul peste butoanele de mai sus pentru detalii și prețuri (Retail / En-gros)',
            calcLabel: 'Calcul plastic conform TDS:',
            totalPlasticWord: 'Plastic total',
            recycledCapWord: 'g − Reciclat',
            virginFullWord: 'g Virgin Plastic',
            primary100: '100% plastic primar',
            specsLabel: 'Date din fișa tehnică și prețuri (Retail / B2B):',
            baseProblemLabel: 'Problema și prețul etalonului de bază:'
        },
        products: [
            {
                badge: '🏆 FANION UE (VARIANTA 1) • SACMA B.LIFE® GAIA × NATUREFLEX™ 30 NVO (0% PLASTIC)',
                name: 'SACMA S.p.A. B.Life® GAIA × Futamura NatureFlex™ 30 NVO (Pungă termică cu fereastră — Mărimi L și S/M, Italia)',
                info: 'Pungă brevetată produsă la scară industrială în Europa (SACMA S.p.A., Adro, Italia, cert. BRCGS Issue 7 Grade AA+ nr. 72228-2010-ABRC și DNV FSC-COC-000967) pentru pui cald la rotisor și gastronomie. Combină hârtia FSC® (cu fibre de iarbă / kraft) și o barieră interioară termosudabilă + fereastră transparentă din celuloză regenerată <b>Futamura NatureFlex™ 30 NVO</b> (rezistă în cuptor până la <b>200 °C / 30 min</b>, microunde, vitrină caldă și congelare până la -40 °C). <b>0.00 g plastic (-100% Virgin Plastic)</b>, reciclabilă în fluxul de hârtie (<b>PAP 22 Aticelca®</b>). <b>Preț pe bucată: Retail (1 cutie 500 buc) — ~€0.145/buc (€72.50/cutie L) și ~€0.095/buc (S/M) | En-gros B2B (de la 25 000 buc) — ~€0.088/buc (L, +12.8% vs bază) și ~€0.058/buc (S/M, cu -25% mai ieftin decât casoleta!).</b>',
                btnEco: '🟢 Produs Eco (SACMA B.Life® GAIA)',
                layersTitle: '🔬 Compoziție reală, prețuri și parametri (SACMA S.p.A. B.Life® GAIA + Futamura NatureFlex™ 30 NVO):',
                layers: [
                    '<b>Structură exterioară (FSC® Certified Paper):</b> Celuloză virgină și reciclată FSC® (DNV-COC-000967) cu adaos de fibre de iarbă (Grass Paper) — rigiditate ridicată în formatele L (pui întreg) și S/M (porții)',
                    '<b>Liner interior și fereastră (Futamura NatureFlex™ 30 NVO, 30 µm):</b> Celuloză regenerată din pastă de lemn (96% bio-based carbon, DIN CERTCO 9S0002), termosudabilă pe ambele fețe — protecție 100% împotriva scurgerilor de suc și grăsime fierbinte',
                    '<b>Limita termică (conform specificației Futamura & SACMA):</b> Reîncălzire în cuptor până la 200 °C (până la 30 min), cuptor cu microunde, vitrină caldă 65–85 °C și congelare până la -40 °C',
                    '<b>Preț unitar (Retail vs En-gros B2B pentru Profi):</b> <b>Retail (1–5 cutii a 500 buc):</b> ~€0.145/buc (€72.50/cutie L) și ~€0.095/buc (€47.50/cutie S/M) • <b>En-gros B2B (de la 25 000–50 000+ buc):</b> <b>~€0.088/buc (€44.00/cutie L, +12.8% față de baza en-gros €0.078)</b> și <b>~€0.058/buc (€29.00/cutie S/M, cu 25% mai ieftin decât casoleta)</b> + 0 € taxă de plastic!'
                ],
                certsTitle: '📜 Certificate autentice și economie (BRCGS AA+ & DNV FSC®):',
                certs: [
                    '🏭 Producător: SACMA S.p.A. (Italia) + Futamura',
                    '🏅 BRCGS Packaging Issue 7: Grad maxim AA+',
                    '🌲 Certificat DNV FSC®: DNV-COC-000967 (până în 2029)',
                    '🌡️ Regim: -40 °C…+200 °C (Cuptor / Microunde / Vitrină)',
                    '💶 Retail: €0.145/buc (L) | En-gros B2B: €0.088/buc (L) și €0.058/buc (S/M)',
                    '🌱 Plastic: 0.00 g vs 26.29 g bază (-100% Virgin)'
                ]
            },
            {
                badge: '🥇 KRAFT DE SERIE L și S/M • BAGCRAFT® #301051 / #301011 / #301056 & KOEHLER NEXPLUS® OGR',
                name: 'Bagcraft® EcoCraft® ToGo! (#301051 L / #301011 S/M / #301056 Paper-PET) & Mono-hârtie UE Koehler NexPlus® OGR / Mondi',
                info: 'Pungi de mare serie pentru vitrina caldă 65–85 °C din cataloagele PDF <b>Novolex / Bagcraft®</b> (doc. <b>B_PG_1093_0922</b> și <b>NVX-12832026</b>: <b>#301051</b> pentru pui întreg L, <b>#301011 / #301043</b> pentru aripioare S/M și <b>#301056 Paper/PET</b> «PET film ideal for hot food applications»), plus opțiunea europeană mono-hârtie (Varianta 3) din hârtie barieră fără PFAS <b>Koehler NexPlus® OGR (KIT Level 7)</b> / <b>Mondi FunctionalBarrier Paper</b> (fabrici în Austria, Slovacia și București) cu fereastră din hârtie transparentă <b>Ahlstrom Cristal™</b>. <b>Preț pe bucată: Retail (1 cutie) — #301051 L: $0.176/buc (~€0.162/buc, $43.99/cutie 250 buc) și #301011 S/M: $0.093/buc (~€0.085/buc, $46.49/cutie 500 buc) | En-gros B2B — #301051 L: ~€0.086/buc ($0.094/buc, +10.2% vs bază), #301011 S/M: ~€0.052/buc, Mono-hârtie Koehler/Mondi: ~€0.042–€0.055/buc (-30% mai ieftin decât casoleta!).</b>',
                btnEco: '🟢 Produs Eco (Bagcraft #301051/#301011)',
                layersTitle: '🔬 Date exacte și prețuri din 4 PDF-uri oficiale (Novolex Bagcraft® & Koehler Paper SE):',
                layers: [
                    '<b>Mărimea L — Pui întreg (Bagcraft® #301051, UPC 10072181010519):</b> 8.75 × 6.00 × 10.75 in. (222.3 × 152.4 × 273.1 mm) • 250 buc/cutie • Greutate cutie conform PDF: 15.83 lbs (brut 28.72 g/buc; estimare fereastră subțire Anti-Fog PP: ~1.80–2.20 g plastic = -91.6% vs bază)',
                    '<b>Mărimea S/M — Aripioare și cartofi (#301011 / #301043 / #301056 Paper-PET):</b> #301011 (127 × 76 × 244 mm, 500 buc/cutie, 13.50 lbs = 12.25 g/buc, fereastră ~1.45 g = -94.5% plastic); #301056 / #300091 (doc. NVX-12832026: hârtie + fereastră PET termorezistentă pentru mâncare caldă)',
                    '<b>Varianta bugetară mono-hârtie UE (Koehler NexPlus® OGR & Mondi FunctionalBarrier):</b> Rezistență la grăsimi KIT Level 7 (doc. Koehler din 16.03.2023) <b>100% fără fluoropolimeri PFAS și fără acrilați</b> + fereastră din celuloză calandrată Ahlstrom Cristal™ pentru gustări calde uscate (cartofi wedges, strips)',
                    '<b>Preț unitar (Retail 1 cutie vs En-gros B2B):</b> <b>Retail:</b> #301051 L (250 buc) = $43.99/cutie ($0.176/buc ≈ €0.162/buc); #301011 S/M (500 buc) = $46.49/cutie ($0.093/buc ≈ €0.085/buc); Mono-hârtie = ~€0.075/buc • <b>En-gros B2B (de la 50 000+ buc):</b> <b>#301051 L = ~€0.086/buc ($0.094/buc, $23.50/cutie, +10.2% vs bază)</b>; <b>#301011 S/M = ~€0.052/buc ($0.057/buc)</b>; <b>Mono-hârtie Koehler/Mondi = ~€0.042–€0.055/buc (+6% față de hârtia simplă și cu 30% mai ieftin decât casoleta PP!)</b>'
                ],
                certsTitle: '📜 Bază de dovezi și prețuri (4 PDF-uri originale în fereastra modală):',
                certs: [
                    '🏭 Novolex Bagcraft® (SUA) & Koehler Paper (Germania)',
                    '📄 PDF: B_PG_1093_0922, NVX-12832026 & Koehler OGR',
                    '🛡️ KIT Level 7 (PFAS-Free & Acrylate-Free)',
                    '👁️ Fereastră Anti-Fog PP / Hot-Food PET / Cristal™',
                    '💶 Retail: €0.162/buc (L) | B2B: €0.086/buc (L), €0.052 (S/M), €0.045 (NexPlus)',
                    '♻️ Plastic fereastră: 0.00–2.20 g (-91.6%…-100%)'
                ]
            },
            {
                badge: '🔥 CUPTOR 220°C + 70% PCR (VARIANTA 2) • MITSUBISHI HOSTAPHAN® RHST / PCR & SIRANE SIRA-COOK™',
                name: 'Mitsubishi Hostaphan® RHST / RPSP PL (220 °C) & Hostaphan® 70% PCR rPET (Conversie Sirane Sira-Cook™ Polonia / UE)',
                info: 'Etalon tehnic pentru cazul în care tehnologii Profi doresc coacerea puiului direct în pungă în cuptorul cu convecție. Demonstrat prin <b>4 documente PDF germane autentice Mitsubishi Polyester Film GmbH (Wiesbaden, Germania)</b>: filmul <b>Hostaphan® RHST</b> (21–42 g/m², fără stibiu) rezistă <b>până la +220 °C timp de 120 minute</b>, <b>Hostaphan® RPSP PL</b> asigură <b>auto-evacuarea aburului (Self-Venting) la -40…+220 °C</b>, iar <b>certificatul Intertek nr. RC-20260727-01(b) (ISO 14021:2016)</b> atestă oficial <b>70% Post-Consumer Recycled (PCR)</b> în gama <b>Hostaphan® rPET</b> (și 30% PCR în miezul <b>PCR PR3F</b>). Pungile gata sunt produse în regiunea CEE de fabrica <b>Sirane Group / KM Packaging (Polonia, gama Sira-Cook™)</b>. <b>Preț pe bucată: Retail (1 cutie 500 buc) — ~€0.140/buc (€70.00/cutie) | En-gros B2B (de la 50 000+ buc) — ~€0.085/buc (€42.50/cutie, +9.0% vs baza €0.078).</b>',
                btnEco: '🟢 Produs Eco (Hostaphan® RHST/70% PCR)',
                layersTitle: '🔬 Date exacte și prețuri din 4 PDF-uri Mitsubishi Polyester Film GmbH (Wiesbaden, Germania):',
                layers: [
                    '<b>TDS Hostaphan® RHST (Edition 06/23):</b> Film PET coextrudat biaxial orientat pentru pungi de coacere (15–30 µm, 21–42 g/m², rezistență 230–270 N/mm², Haze 2%) • Regim: <b>până la +220 °C timp de 120 minute</b> (avertisment TDS pag. 3: a se evita încălzirea >250 °C)',
                    '<b>TDS Hostaphan® RPSP PL (Edition 06/23):</b> Film transparent 25 µm (35 g/m²) cu funcție <b>Self-Venting (evacuare automată a aburului)</b> și deschidere Easy-Peel, interval <b>de la -40 °C la +220 °C (30 min)</b>',
                    '<b>Certificat Intertek RC-20260727-01(b) & TDS Hostaphan® PCR PR3F:</b> Confirmat <b>70% PCR rPET (ISO 14021:2016)</b> pentru codurile 7CDA, 7CRN, 7RCD, 7RD, 7RN, PR7N și <b>30% PCR în stratul central (PCR PR3F)</b> cu straturi exterioare virgine (EU 1935/2004 și 10/2011)',
                    '<b>Preț unitar (Retail vs B2B) și bilanț de plastic (~12.0 g):</b> <b>Retail (1 cutie 500 buc):</b> ~€0.140/buc (€70.00/cutie) • <b>En-gros B2B (de la 50 000+ buc de la fabrica Sirane Polonia):</b> <b>~€0.085/buc (€42.50/cutie, +9.0% vs baza en-gros €0.078)</b> • La 70% PCR rămân doar <b>3.60 g Virgin Plastic (-86.3% față de baza 26.29 g)</b>'
                ],
                certsTitle: '📜 Bază de dovezi și prețuri (Certificat Intertek + 3 TDS Hostaphan®):',
                certs: [
                    '🏭 Mitsubishi Polyester Film (Germania) & Sirane (Polonia)',
                    '🏅 Certificat Intertek: RC-20260727-01(b) (70% PCR)',
                    '🔥 TDS Hostaphan® RHST: 220 °C timp de 120 min',
                    '💨 TDS Hostaphan® RPSP PL: Self-Venting (-40…+220 °C)',
                    '💶 Retail: €0.140/buc (€70/cutie) | En-gros B2B: €0.085/buc (+9.0%)',
                    '♻️ Virgin Plastic: 3.60 g (la 70% PCR) vs 26.29 g (-86.3%)'
                ]
            },
            {
                badge: '⚖️ CASOLETĂ RIGIDĂ 220°C • FAERCH C 2200-1L CPET (#2200012097) vs PP (+121°C) & APET (+70°C)',
                name: 'Faerch C 2200-1L Evolve CPET (#2200012097, -40…+220 °C) vs Baza PP (#2226014004, +121 °C) și APET Rece (#2182015004, +70 °C)',
                info: 'Comparație de referință pe baza a <b>3 fișe tehnice daneze autentice Faerch A/S</b>: 1) <b>Faerch C 2200-1L Evolve CPET (#2200012097)</b> are masa corpului de <b>21.38 g ± 10%</b> (cu -18.7% mai ușoară decât baza chiar înainte de PCR!) și rezistă <b>de la -40 °C la +220 °C (Dual-Ovenable)</b>; 2) Etalonul de bază <b>Faerch P 2226-1C PP (#2226014004)</b> cântărește <b>26.29 g din 100% PP primar</b> și este limitat la <b>+121 °C (Microwave only)</b>; 3) Casoleta rece <b>Faerch K 2182-1G Clear APET (#2182015004, 21.48 g)</b> este limitată la <b>+70 °C (Not ovenable)</b>, demonstrând de ce rPET-ul rece nu poate fi pus pe vitrina caldă Profi! <b>Preț pe bucată: CPET #2200012097 — Retail (1 cutie 544 buc): ~€0.155/buc (€84.30/cutie) | En-gros B2B (palet): ~€0.091/buc (€49.50/cutie, +16.5%) față de Baza PP #2226014004 — Retail: ~€0.125/buc (€60.00/cutie 480 buc) | En-gros B2B: ~€0.078/buc (€37.40/cutie).</b>',
                btnEco: '🟢 Produs Eco (Faerch #2200012097)',
                layersTitle: '🔬 Date exacte și prețuri din 3 PDF-uri oficiale Faerch A/S (Danemarca):',
                layers: [
                    '<b>Candidat pentru cuptor (Faerch C 2200-1L Evolve CPET #2200012097, TDS din 09.01.2023):</b> 220.2 × 165.2 × 45.0 mm • Volum 1126 ml • 550 µm • Masa corpului: <b>21.38 g ± 10%</b> • Rețeta 6811 • <b>-40 °C…+220 °C (Dual ovenable)</b> • 544–570 buc/cutie',
                    '<b>Limita onestă a dovezilor privind PCR % (pag. 3 TDS #2200012097):</b> În TDS-ul public Faerch indică faptul că ponderea rPET fluctuează și se oferă la cerere. La pragul minim garantat Evolve (40% rPET) Virgin Plastic = <b>12.83 g (-51.2%)</b>; la plafonul platformei Evolve (până la 70% PCR, comunicat Faerch 20.11.2024) = <b>6.41 g (-75.6%)</b>',
                    '<b>Etalonul de bază (Faerch P 2226-1C Clear PP #2226014004, TDS din 20.02.2026) și APET Rece (#2182015004):</b> Baza PP: 226.5 × 177.8 × 40.0 mm • 1084 ml • <b>26.29 g ± 10%</b> (100% prime PP = 0% PCR, limită +121 °C); APET Rece #2182015004: 21.48 g, limită <b>+70 °C (Not ovenable)</b>',
                    '<b>Preț unitar (Retail 1 cutie vs En-gros B2B palet):</b> <b>Faerch CPET #2200012097:</b> Retail = ~€0.155/buc (€84.30/cutie 544 buc) | En-gros B2B (palet 6 528–11 400 buc) = <b>~€0.091/buc (€49.50/cutie, +16.5% vs bază)</b> • <b>Baza PP #2226014004:</b> Retail = ~€0.125/buc (€60.00/cutie 480 buc) | En-gros B2B (palet 11 520 buc) = <b>~€0.078/buc (€37.40/cutie)</b>'
                ],
                certsTitle: '📜 Bază de dovezi și prețuri (3 fișe PDF directe Faerch A/S):',
                certs: [
                    '🏭 Producător: Faerch A/S (Holstebro, Danemarca)',
                    '📄 3 PDF originale: #2200012097, #2226014004, #2182015004',
                    '🌡️ CPET: -40…+220 °C | PP: +121 °C | APET: +70 °C',
                    '🍲 Regim: Dual-Ovenable (Cuptor și Microunde)',
                    '💶 CPET Retail: €0.155/buc | B2B: €0.091/buc (vs Bază €0.125 / €0.078)',
                    '♻️ Virgin Plastic: 6.41–12.83 g vs 26.29 g bază (-51%…-75.6%)'
                ]
            }
        ],
        matrixTitle: 'Matricea de selecție inginerească pentru rețeaua Profi (conform certificatelor PDF și TDS autentice)',
        matrixHeaders: [
            'Criteriu de evaluare (conform PDF TDS)',
            '🔴 Baza Publică 100% Virgin PP (Faerch #2226014004) & APET Rece (#2182015004)',
            '🏆 1. Fanion UE: SACMA B.Life® GAIA × Futamura NatureFlex™ 30 NVO',
            '🥇 2. Vitrină & Mono-Hârtie: Bagcraft® ToGo! (#301051 / #301011) & Koehler NexPlus® OGR',
            '🔥 3. Etaloane Cuptor 220°C: Hostaphan® RHST / 70% PCR & Casoleta Faerch CPET (#2200012097)'
        ],
        matrixRows: [
            [
                '<b>Producător, Țară și Document</b>',
                '<b>Faerch A/S (Danemarca)</b><br>PP #2226014004 (EAN 5701022905797)<br>APET #2182015004 (EAN 5703969013399)',
                '<b>SACMA S.p.A. (Italia) + Futamura (UK/UE)</b><br>BRCGS Issue 7 Grade AA+ & DNV FSC-COC-000967',
                '<b>Novolex Bagcraft® (SUA) & Koehler Paper (Germania) / Mondi (Austria/România)</b><br>B_PG_1093_0922, NVX-12832026 & NexPlus OGR',
                '<b>Mitsubishi Polyester Film (Germania) / Sirane (Polonia) & Faerch A/S (Danemarca)</b><br>Intertek RC-20260727-01(b) & TDS #2200012097'
            ],
            [
                '<b>Scenariu în rețeaua Profi România</b>',
                'APET-ul rece se topește la >70 °C; PP-ul de bază este limitat la +121 °C (Microunde)',
                '<b>Fanion (Mărimi L și S/M):</b> Vitrină caldă 65–85 °C + reîncălzire în cuptor până la 200 °C și microunde',
                '<b>Drop-in rapid (L și S/M):</b> Vitrină caldă după rotisor (65–85 °C până la 6 ore) și gustări calde uscate',
                '<b>Coacere directă în cuptor (până la 220 °C):</b> Dacă puiul sau preparatul este copt direct în ambalaj'
            ],
            [
                '<b>Masa totală și structura</b>',
                '<b>26.29 g ± 10%</b> (PP #2226014004)<br><b>21.48 g ± 10%</b> (APET #2182015004)',
                '<b>~14–24 g (S/M și L):</b> Hârtie FSC® + bio-liner termosudabil și fereastră NatureFlex™ 30 NVO (30 µm)',
                '<b>L (#301051):</b> 28.72 g brut (~2.20 g fereastră PP)<br><b>S/M (#301011):</b> 12.25 g brut (~1.45 g fereastră)<br><b>NexPlus® OGR:</b> 100% hârtie (0 g plastic)',
                '<b>Pungă Hostaphan® / Sira-Cook™:</b> ~12.0 g (21–42 g/m²)<br><b>Casoletă Faerch CPET:</b> 21.38 g ± 10% (-18.7% mai ușoară)'
            ],
            [
                '<b>Calcul Virgin Plastic</b><br><small>(Plastic total − Reciclat)</small>',
                '26.29 g − 0 g =<br><b>26.29 g Virgin (100% PP primar)</b>',
                '0.00 g plastic =<br><b>0.00 g Virgin (-100% plastic; 100% celuloză vegetală)</b>',
                '<b>Bagcraft L:</b> ~2.20 g (<b>-91.6%</b>)<br><b>Bagcraft S/M:</b> ~1.45 g (<b>-94.5%</b>)<br><b>Koehler / Mondi:</b> 0.00 g (<b>-100%</b>)',
                '<b>Hostaphan (70% PCR Intertek):</b> 12 − 8.4 = <b>3.60 g (-86.3%)</b><br><b>Faerch CPET (40–70% rPET):</b> <b>6.41–12.83 g (-51%…-75.6%)</b>'
            ],
            [
                '<b>Preț pe 1 buc și cutie:<br>Retail (1 cutie) vs En-gros B2B (Profi)</b>',
                '<b>Retail (480 buc):</b> ~€0.125/buc (€60.00/cutie)<br><b>En-gros B2B:</b> <b>~€0.078/buc (€37.40/cutie)</b> + taxă AFM pentru 26.29 g plastic',
                '<b>Retail (500 buc):</b> ~€0.145/buc (L) | ~€0.095/buc (S/M)<br><b>En-gros B2B (de la 25k buc):</b> <b>~€0.088/buc (L, +12.8%) și ~€0.058/buc (S/M, -25%)</b> + 0 € taxă',
                '<b>Retail:</b> L #301051: $0.176/buc (~€0.162, $43.99/250 buc) | S/M #301011: $0.093/buc (~€0.085)<br><b>En-gros B2B:</b> <b>L: ~€0.086/buc (+10.2%) | S/M: ~€0.052/buc | Mono-hârtie: ~€0.042–€0.055/buc</b>',
                '<b>Pungă Sira-Cook™:</b> Retail ~€0.140/buc | <b>En-gros B2B: ~€0.085/buc (+9.0%)</b><br><b>Casoletă CPET #2200012097:</b> Retail ~€0.155/buc | <b>En-gros B2B: ~€0.091/buc (+16.5%)</b>'
            ],
            [
                '<b>Limita termică (conform PDF)</b>',
                'APET: -40…+70 °C (Not ovenable)<br>PP: 0…+121 °C (Microwave only)',
                '✅ <b>-40 °C…+200 °C (până la 30 min)</b><br>(Cuptor, microunde, vitrină caldă și congelare)',
                '✅ <b>Hot Meal Warming Display (65–85 °C)</b><br>(Ventilație abur + fereastră PET la #301056)',
                '✅ <b>-40 °C…+220 °C (până la 120 min la RHST)</b><br>(Dual-Ovenable: cuptor și microunde conform TDS)'
            ],
            [
                '<b>Barieră grăsime și 0% fibre</b>',
                'Plastic PP/APET (0% fibre)',
                '✅ <b>Strat termosudat etanș NatureFlex™ NVO • 0% fibre și scurgeri</b>',
                '✅ <b>Căptușeală Anti-Fog / KIT Level 7 fără PFAS și acrilați (Koehler NexPlus® OGR)</b>',
                '✅ <b>Coextruziune BoPET (Antimony-Free) & CPET cristalin • 0% fibre</b>'
            ],
            [
                '<b>Reciclare și taxa AFM România (OUG 6/2021 & PPWR)</b>',
                'Taxă completă pentru plastic primar (26.29 g Virgin PP pe porție)',
                '✅ <b>PAP 22 (reciclare în hârtie Aticelca®) + OK Compost HOME (Zero taxă pe plastic)</b>',
                '✅ <b>Reducerea taxei de plastic cu 91–100% • Conversie locală în România (Mondi Bucharest / EcoPaper)</b>',
                '✅ <b>Monomaterial PET (NIR Detectable = Yes) cu reciclat verificat ISO 14021</b>'
            ],
            [
                '<b>Documente PDF originale încorporate în proiect</b>',
                '<code>Faerch-P-2226-1C-PP-2226014004-TDS.pdf</code><br><code>Faerch-K-2182-1G-APET-2182015004-TDS.pdf</code>',
                '✅ <code>SACMA-BRCGS-Food-Packaging-Certificate-2026-2027.pdf</code><br>✅ <code>SACMA-DNV-FSC-Certificate-DNV-COC-000967.pdf</code>',
                '✅ <code>Bagcraft-ToGo-Hot-Foods-Spec-B_PG_1093.pdf</code><br>✅ <code>Novolex-Dubl-View-ToGo-Deli-Bags-PET-Window.pdf</code><br>✅ <code>Koehler-NexPlus-OGR-Grease-Resistant-Paper-Official.pdf</code>',
                '✅ <code>Intertek-Certificate-Mitsubishi-Hostaphan-PCR-2025.pdf</code><br>✅ <code>Mitsubishi-Hostaphan-RHST-Ovenable-Roasting-Bags-TDS.pdf</code><br>✅ <code>Faerch-C-2200-1L-CPET-2200012097-TDS.pdf</code>'
            ]
        ],
        certModal: {
            title: '📜 Certificat oficial de fabrică și Fișă Tehnică (PDF TDS)',
            orgPrefix: 'DOCUMENT / CERTIFICAT AUTENTIC DE FABRICĂ •',
            docNoLabel: 'Document nr.:',
            rowDim: 'Dimensiuni exacte, ambalare și domeniu de aplicare',
            rowStd: 'Certificate oficiale și standarde UE/SUA',
            rowLayers: 'Compoziția reală și structura barieră',
            rowTemp: 'Limita termică și regimul de lucru',
            rowPrice: 'Preț pe bucată și cutie (Retail vs En-gros B2B)',
            rowVirgin: 'Bilanț Virgin Plastic (față de etalonul 26.29 g)',
            tabsHint: '📂 Selectați certificatul PDF original pentru vizualizare:',
            embedTitle: '📑 Documentul PDF autentic încorporat (răsfoiți paginile în fereastră):',
            openLocalPdfBtn: '📄 Deschide PDF-ul curent în filă nouă ↗',
            openLiveUrlBtn: '🌐 Link direct către pagina produsului / specificație (200 OK) ↗',
            openBuyUrlBtn: '🛒 Mergi la produs pe site-ul furnizorului (200 OK) ↗',
            printBtn: '🖨️ Printează'
        },
        adminModal: {
            title: 'Panou ingineresc: Adăugare și calcul mostră de ambalaj',
            descHtml: 'Introduceți datele tehnice ale unei mostre reale (TDS), linkul către certificat și site-ul furnizorului. Sistemul va calcula automat masa Virgin Plastic după formula <b>Plastic total − Reciclat</b> față de etalonul de bază (26.29 g Virgin PP) și va construi graficul pentagonal.',
            labels: [
                'Denumirea și SKU-ul produsului real:',
                'Link către fotografia produsului:',
                'Link către site-ul de achiziție (Butonul 3):',
                'Link către certificatul PDF / TDS (Butonul 2):',
                'Scurtă descriere și compoziție pe straturi:',
                'Standarde de certificare:',
                'Masa totală (g):',
                'Masa plasticului din ea (g):',
                'Ponderea reciclării PCR (%):',
                'Diferența de preț (%):',
                'Temperatura max. (°C):',
                'Barieră grăsime / 0 fibre (%):',
                'Fereastră și Ecologie (%):'
            ],
            namePlaceholder: 'Ex.: SACMA B.Life® GAIA / Bagcraft® #301051',
            infoPlaceholder: 'Hârtie FSC® + bio-liner termosudabil și fereastră Futamura NatureFlex™ 30 NVO',
            submitBtn: 'Calculează după formulă și adaugă cardul cu 3 butoane și grafic pentagonal'
        }
    },
    en: {
        pageTitle: 'Profi EcoPack — Certified European & Global Packaging Matrix for Hot Deli & Rotisserie',
        login: 'Log In',
        nav: [
            'Profi Criteria (CEE)',
            '1. EU Flagships: SACMA Gaia & Bagcraft',
            '2. 220°C Oven: Hostaphan PCR & Faerch',
            'Selection Matrix (PDF TDS)'
        ],
        heroBadge: 'BIOMENTORHUB × PROFI ROMANIA (1,700+ STORES) • EUROPEAN ENGINEERING SOURCING MATRIX',
        heroTitle: 'Mature Matrix of Real European & Global Solutions Replacing 100% Virgin Plastic Packaging',
        heroSubtitleHtml: '100% recycled plastic is already used in cold departments (note that standard cold <b>Faerch K 2182-1G APET #2182015004</b> is capped at <b>+70 °C</b> and warps on hot counters). For <b>Profi Grill / Fiesta</b> (180–220 °C roasting and 65–85 °C hot display up to 6 hours), we replace the 100% virgin polypropylene baseline (<b>Faerch P 2226-1C #2226014004, 26.29 g Virgin PP, max +121 °C, price: retail ~€0.125/unit | wholesale B2B ~€0.078/unit</b>) with a <b>verified portfolio of commercial EU & US solutions (TRL 9) backed by authentic PDF certificates and transparent retail & wholesale pricing</b> via the formula: <span class="formula-pill">Total Plastic − Recycled Content = Virgin Plastic</span>',
        reqs: [
            {
                num: 'Up to 200–220 °C',
                name: 'PDF TDS Thermal Rating',
                desc: 'Clear separation of regimes: 65–85 °C hot counter holding (up to 6h) and direct oven roasting up to 200–220 °C (NatureFlex™ NVO, Hostaphan® RHST, Faerch CPET).'
            },
            {
                num: 'Up to 6 Hours',
                name: 'Hot Counter Stability',
                desc: 'Steam release (Performance Ventilation / Self-Venting) keeps rotisserie chicken skin and wedges crispy on heated displays.'
            },
            {
                num: '0% PFAS & Fibers',
                name: 'EU-Compliant Grease Barrier',
                desc: 'NatureFlex™ NVO, Koehler NexPlus® OGR (KIT 7 PFAS-free & acrylate-free), and PET liners hold hot oil with zero fiber shedding.'
            },
            {
                num: 'Anti-Fog Window',
                name: 'Crystal-Clear Visibility',
                desc: 'Clear viewing window made of NatureFlex™ NVO wood-pulp cellulose, ToGo!® anti-fog PP, or hot-food PET (Dubl View® / Hostaphan®).'
            },
            {
                num: 'Retail & B2B Bulk',
                name: 'Transparent Pricing (L & S/M)',
                desc: 'Both 1-case Retail pricing and B2B Wholesale contract pricing for Profi are stated for every SKU (+9…+12.8% vs baseline on L and -25% cheaper on S/M).'
            },
            {
                num: '13 Original PDFs',
                name: 'Authentic Certificates',
                desc: '13 original factory PDFs embedded in the project (BRCGS AA+ SACMA, DNV FSC, Intertek 70% PCR Mitsubishi, Koehler NexPlus, Novolex, Faerch).'
            }
        ],
        sectionPouch: '1. Flagship Hot-Counter Window Pouches (Sizes L & S/M): SACMA Gaia Bio-Cellulose (0% Plastic) & Commercial Kraft Bagcraft® / Koehler NexPlus®',
        sectionAlt: '2. Direct Oven Roasting Solutions up to +220 °C: Mitsubishi Hostaphan® RHST / 70% PCR Pouches (Sirane Sira-Cook™) & Faerch Evolve CPET Tray',
        compareTitle: 'Comparison vs Baseline 100% Virgin Plastic Packaging (5-Axis Radar)',
        axisLabels: ['Virgin Reduction', 'Hot Shelf Hold', 'Grease/0 Fiber', 'Window & Eco', 'Cost & Weight'],
        btnOld: '🔴 Baseline 100% Virgin (#2226014004)',
        actionDetails: '🔬 1. Product Details & Composition',
        actionCert: '📜 2. Open Certificate (PDF TDS)',
        actionBuy: '🛒 3. Direct Product Link ↗',
        radarUI: {
            formulaLabel: 'Virgin Plastic Formula:',
            plasticWord: 'g plastic −',
            recycledWord: 'g recycled',
            virginWord: 'g Virgin',
            vsBase: 'vs',
            atBase: 'baseline →',
            totalMass: 'Total Weight:',
            price: 'Wholesale B2B Cost Delta:',
            hoverHint: 'Hover over the buttons above for details & Retail/Wholesale pricing',
            calcLabel: 'TDS Plastic Calculation:',
            totalPlasticWord: 'Total Plastic',
            recycledCapWord: 'g − Recycled',
            virginFullWord: 'g Virgin Plastic',
            primary100: '100% virgin plastic',
            specsLabel: 'Datasheet Specs & Pricing (Retail / B2B):',
            baseProblemLabel: 'Baseline Limitation & Pricing:'
        },
        products: [
            {
                badge: '🏆 EU FLAGSHIP (VARIANT 1) • SACMA B.LIFE® GAIA × NATUREFLEX™ 30 NVO (0% PLASTIC)',
                name: 'SACMA S.p.A. B.Life® GAIA × Futamura NatureFlex™ 30 NVO (Ovenable Hot-Food Window Bag — Sizes L & S/M, Italy)',
                info: 'Commercially manufactured in Europe (SACMA S.p.A., Adro, Italy, certified BRCGS Issue 7 Grade AA+ #72228-2010-ABRC & DNV FSC-COC-000967) patented rotisserie chicken and hot deli bag. Combines FSC® paper (with grass fibers / kraft) and a heat-sealed inner barrier + clear window made from <b>Futamura NatureFlex™ 30 NVO</b> regenerated wood-pulp cellulose film (ovenable up to <b>200 °C / 30 min</b>, microwave-safe, hot cabinet & freezer-safe to -40 °C). <b>0.00 g plastic (-100% Virgin Plastic)</b>, paper-stream recyclable (<b>PAP 22 Aticelca®</b>). <b>Unit Price: Retail (1 case / 500 pcs) — ~€0.145/unit (€72.50/case L) & ~€0.095/unit (S/M) | Wholesale B2B (from 25,000 pcs) — ~€0.088/unit (L, +12.8% vs base) & ~€0.058/unit (S/M, -25% cheaper than tray!).</b>',
                btnEco: '🟢 Eco Product (SACMA B.Life® GAIA)',
                layersTitle: '🔬 Real Composition, Pricing & Parameters (SACMA S.p.A. B.Life® GAIA + Futamura NatureFlex™ 30 NVO):',
                layers: [
                    '<b>Outer Structural Body (FSC® Certified Paper):</b> Virgin and recycled FSC® cellulose (DNV-COC-000967) blended with meadow grass fibers (Grass Paper) for high rigidity in Size L (whole chicken) and Size S/M (portions)',
                    '<b>Inner Liner & Clear Window (Futamura NatureFlex™ 30 NVO, 30 µm):</b> Regenerated wood-pulp cellulose (96% bio-based carbon, DIN CERTCO 9S0002), two-side heat-sealable — 100% leak-proof against chicken juices and hot grease',
                    '<b>Thermal Rating (per Futamura & SACMA specification):</b> Conventional oven reheating up to 200 °C (up to 30 min), microwave oven, 65–85 °C hot counter holding, and blast freezing down to -40 °C',
                    '<b>Unit Price (Retail vs B2B Wholesale for Profi):</b> <b>Retail (1–5 cases of 500 pcs):</b> ~€0.145/unit (€72.50/case L) & ~€0.095/unit (€47.50/case S/M) • <b>Wholesale B2B (25,000–50,000+ pcs):</b> <b>~€0.088/unit (€44.00/case L, +12.8% vs €0.078 wholesale base)</b> and <b>~€0.058/unit (€29.00/case S/M, 25% cheaper than tray)</b> + €0 plastic tax!'
                ],
                certsTitle: '📜 Authentic Certificates & Pricing (BRCGS AA+ & DNV FSC®):',
                certs: [
                    '🏭 Manufacturer: SACMA S.p.A. (Italy) + Futamura',
                    '🏅 BRCGS Packaging Issue 7: Highest Grade AA+',
                    '🌲 DNV FSC® Certificate: DNV-COC-000967 (to 2029)',
                    '🌡️ Rating: -40 °C…+200 °C (Oven / Microwave / Hot Hold)',
                    '💶 Retail: €0.145/pc (L) | B2B Bulk: €0.088/pc (L) & €0.058/pc (S/M)',
                    '🌱 Plastic: 0.00 g vs 26.29 g base (-100% Virgin)'
                ]
            },
            {
                badge: '🥇 COMMERCIAL KRAFT L & S/M • BAGCRAFT® #301051 / #301011 / #301056 & KOEHLER NEXPLUS® OGR',
                name: 'Bagcraft® EcoCraft® ToGo! (#301051 L / #301011 S/M / #301056 Paper-PET) & EU Mono-Paper Koehler NexPlus® OGR / Mondi',
                info: 'High-volume commercial bags for 65–85 °C warming displays from official <b>Novolex / Bagcraft®</b> PDF catalogs (docs <b>B_PG_1093_0922</b> and <b>NVX-12832026</b>: <b>#301051</b> for whole chicken L, <b>#301011 / #301043</b> for wings S/M, and <b>#301056 Paper/PET</b> "PET film ideal for hot food applications"), plus the European budget all-paper option (Variant 3) using PFAS-free grease-resistant <b>Koehler NexPlus® OGR (KIT Level 7)</b> / <b>Mondi FunctionalBarrier Paper</b> (plants in Austria, Slovakia, and Bucharest) with an <b>Ahlstrom Cristal™</b> transparent paper window. <b>Unit Price: Retail (1 case) — #301051 L: $0.176/unit (~€0.162/unit, $43.99/case 250 pcs) & #301011 S/M: $0.093/unit (~€0.085/unit, $46.49/case 500 pcs) | Wholesale B2B — #301051 L: ~€0.086/unit ($0.094/unit, +10.2% vs base), #301011 S/M: ~€0.052/unit, All-Paper Koehler/Mondi: ~€0.042–€0.055/unit (-30% cheaper than plastic tray!).</b>',
                btnEco: '🟢 Eco Product (Bagcraft #301051/#301011)',
                layersTitle: '🔬 Exact Datasheet Specs & Pricing from 4 Official PDFs (Novolex Bagcraft® & Koehler Paper SE):',
                layers: [
                    '<b>Size L — Whole Chicken (Bagcraft® #301051, UPC 10072181010519):</b> 8.75 × 6.00 × 10.75 in. (222.3 × 152.4 × 273.1 mm) • 250 pcs/case • PDF case weight: 15.83 lbs (28.72 g gross/bag; engineering estimate of thin Anti-Fog PP window: ~1.80–2.20 g plastic = -91.6% vs base)',
                    '<b>Size S/M — Wings & Wedges (#301011 / #301043 / #301056 Paper-PET):</b> #301011 (127 × 76 × 244 mm, 500 pcs/case, 13.50 lbs = 12.25 g/bag, window ~1.45 g = -94.5% plastic); #301056 / #300091 (doc NVX-12832026: paper + heat-resistant PET window for hot food)',
                    '<b>Budget EU All-Paper Option (Koehler NexPlus® OGR & Mondi FunctionalBarrier):</b> KIT Level 7 grease resistance (Koehler doc dated 16.03.2023) <b>100% free from PFAS fluorochemicals and acrylates</b> + translucent calendered cellulose window Ahlstrom Cristal™ for dry hot items (potato wedges, strips)',
                    '<b>Unit Price (1-Case Retail vs Wholesale B2B):</b> <b>Retail:</b> #301051 L (250 pcs) = $43.99/case ($0.176/pc ≈ €0.162/pc); #301011 S/M (500 pcs) = $46.49/case ($0.093/pc ≈ €0.085/pc); All-Paper = ~€0.075/pc • <b>Wholesale B2B (50,000+ pcs):</b> <b>#301051 L = ~€0.086/pc ($0.094/pc, $23.50/case, +10.2% vs base)</b>; <b>#301011 S/M = ~€0.052/pc ($0.057/pc)</b>; <b>All-Paper Koehler/Mondi = ~€0.042–€0.055/pc (+6% vs plain paper and 30% cheaper than PP tray!)</b>'
                ],
                certsTitle: '📜 Evidence Base & Pricing (4 Original PDFs in Modal):',
                certs: [
                    '🏭 Novolex Bagcraft® (USA) & Koehler Paper (Germany)',
                    '📄 PDF: B_PG_1093_0922, NVX-12832026 & Koehler OGR',
                    '🛡️ KIT Level 7 (PFAS-Free & Acrylate-Free)',
                    '👁️ Anti-Fog PP / Hot-Food PET / Cristal™ Window',
                    '💶 Retail: €0.162/pc (L) | B2B: €0.086/pc (L), €0.052 (S/M), €0.045 (NexPlus)',
                    '♻️ Window Plastic: 0.00–2.20 g (-91.6%…-100%)'
                ]
            },
            {
                badge: '🔥 220°C OVEN + 70% PCR (VARIANT 2) • MITSUBISHI HOSTAPHAN® RHST / PCR & SIRANE SIRA-COOK™',
                name: 'Mitsubishi Hostaphan® RHST / RPSP PL (220 °C) & Hostaphan® 70% PCR rPET (Sirane Sira-Cook™ Poland / EU Conversion)',
                info: 'Technical benchmark if Profi food technologists require roasting chicken or ready meals directly inside the bag in a convection oven. Proven by <b>4 authentic German PDF documents from Mitsubishi Polyester Film GmbH (Wiesbaden, Germany)</b>: <b>Hostaphan® RHST</b> film (21–42 g/m², antimony-free) withstands <b>up to +220 °C for 120 minutes</b>, <b>Hostaphan® RPSP PL</b> provides <b>Self-Venting steam release at -40…+220 °C</b>, and <b>Intertek Certificate #RC-20260727-01(b) (ISO 14021:2016)</b> officially certifies <b>70% Post-Consumer Recycled (PCR)</b> content in <b>Hostaphan® rPET</b> (plus 30% PCR core in <b>PCR PR3F</b>). Ready pouches in CEE are converted by <b>Sirane Group / KM Packaging (Poland, Sira-Cook™ line)</b>. <b>Unit Price: Retail (1 case / 500 pcs) — ~€0.140/unit (€70.00/case) | Wholesale B2B (from 50,000+ pcs) — ~€0.085/unit (€42.50/case, +9.0% vs €0.078 base).</b>',
                btnEco: '🟢 Eco Product (Hostaphan® RHST/70% PCR)',
                layersTitle: '🔬 Exact Datasheet Specs & Pricing from 4 Mitsubishi Polyester Film GmbH PDFs (Wiesbaden, Germany):',
                layers: [
                    '<b>TDS Hostaphan® RHST (Edition 06/23):</b> Biaxially oriented coextruded PET film for cooking & roasting bags (15–30 µm, 21–42 g/m², tensile strength 230–270 N/mm², Haze 2%) • Rating: <b>up to +220 °C for up to 120 minutes</b> (TDS p. 3 warning: avoid heating >250 °C)',
                    '<b>TDS Hostaphan® RPSP PL (Edition 06/23):</b> Transparent 25 µm film (35 g/m²) featuring <b>Self-Venting steam release</b> and Easy-Peel opening, rated from <b>-40 °C to +220 °C (30 min)</b>',
                    '<b>Intertek Certificate RC-20260727-01(b) & TDS Hostaphan® PCR PR3F:</b> Certified <b>70% PCR rPET (ISO 14021:2016)</b> for grades 7CDA, 7CRN, 7RCD, 7RD, 7RN, PR7N and <b>30% PCR in the core layer (PCR PR3F)</b> with virgin food-contact outer layers (EU 1935/2004 & 10/2011)',
                    '<b>Unit Price (Retail vs B2B) & Plastic Balance (~12.0 g):</b> <b>Retail (1 case of 500 pcs):</b> ~€0.140/unit (€70.00/case) • <b>Wholesale B2B (50,000+ pcs from Sirane Poland):</b> <b>~€0.085/unit (€42.50/case, +9.0% vs €0.078 wholesale base)</b> • At 70% PCR, only <b>3.60 g Virgin Plastic remains (-86.3% vs 26.29 g base)</b>'
                ],
                certsTitle: '📜 Evidence Base & Pricing (Intertek Certificate + 3 Hostaphan® TDS):',
                certs: [
                    '🏭 Mitsubishi Polyester Film (DE) & Sirane (Poland)',
                    '🏅 Intertek Certificate: RC-20260727-01(b) (70% PCR)',
                    '🔥 TDS Hostaphan® RHST: 220 °C for 120 minutes',
                    '💨 TDS Hostaphan® RPSP PL: Self-Venting (-40…+220 °C)',
                    '💶 Retail: €0.140/pc (€70/case) | B2B Bulk: €0.085/pc (+9.0%)',
                    '♻️ Virgin Plastic: 3.60 g (at 70% PCR) vs 26.29 g (-86.3%)'
                ]
            },
            {
                badge: '⚖️ 220°C RIGID TRAY • FAERCH C 2200-1L CPET (#2200012097) vs PP (+121°C) & APET (+70°C)',
                name: 'Faerch C 2200-1L Evolve CPET (#2200012097, -40…+220 °C) vs Baseline PP (#2226014004, +121 °C) & Cold APET (#2182015004, +70 °C)',
                info: 'Reference comparison across <b>3 authentic Danish Faerch A/S datasheets</b>: 1) <b>Faerch C 2200-1L Evolve CPET (#2200012097)</b> has a tray body weight of <b>21.38 g ± 10%</b> (-18.7% lighter than baseline even before PCR!) and withstands <b>-40 °C to +220 °C (Dual-Ovenable)</b>; 2) Baseline <b>Faerch P 2226-1C PP (#2226014004)</b> weighs <b>26.29 g of 100% prime PP</b> and is capped at <b>+121 °C (Microwave only)</b>; 3) Cold <b>Faerch K 2182-1G Clear APET (#2182015004, 21.48 g)</b> is capped at <b>+70 °C (Not ovenable)</b>, proving why standard cold rPET cannot be placed on Profi hot counters! <b>Unit Price: CPET #2200012097 — Retail (1 case / 544 pcs): ~€0.155/unit (€84.30/case) | Wholesale B2B (pallet): ~€0.091/unit (€49.50/case, +16.5%) vs Baseline PP #2226014004 — Retail: ~€0.125/unit (€60.00/case 480 pcs) | Wholesale B2B: ~€0.078/unit (€37.40/case).</b>',
                btnEco: '🟢 Eco Product (Faerch #2200012097)',
                layersTitle: '🔬 Exact Datasheet Parameters & Pricing from 3 Official Faerch A/S PDFs (Denmark):',
                layers: [
                    '<b>Ovenable Candidate (Faerch C 2200-1L Evolve CPET #2200012097, TDS dated 09.01.2023):</b> 220.2 × 165.2 × 45.0 mm • Volume 1126 ml • 550 µm • Tray body weight: <b>21.38 g ± 10%</b> • Recipe 6811 • <b>-40 °C…+220 °C (Dual ovenable)</b> • 544–570 pcs/case',
                    '<b>Honest Evidence Boundary on PCR % (p. 3 of TDS #2200012097):</b> In the public TDS, Faerch notes that exact rPET content fluctuates and is provided on request. At the guaranteed Evolve floor (40% rPET), Virgin Plastic = <b>12.83 g (-51.2%)</b>; at the Evolve platform ceiling (up to 70% PCR, Faerch release 20.11.2024) = <b>6.41 g (-75.6%)</b>',
                    '<b>Public Baseline (Faerch P 2226-1C Clear PP #2226014004, TDS dated 20.02.2026) & Cold APET (#2182015004):</b> Baseline PP: 226.5 × 177.8 × 40.0 mm • 1084 ml • <b>26.29 g ± 10%</b> (100% prime PP = 0% PCR, max +121 °C); Cold APET #2182015004: 21.48 g, max <b>+70 °C (Not ovenable)</b>',
                    '<b>Unit Price (1-Case Retail vs Pallet Wholesale B2B):</b> <b>Faerch CPET #2200012097:</b> Retail = ~€0.155/unit (€84.30/case 544 pcs) | Wholesale B2B (pallet 6,528–11,400 pcs) = <b>~€0.091/unit (€49.50/case, +16.5% vs base)</b> • <b>Baseline PP #2226014004:</b> Retail = ~€0.125/unit (€60.00/case 480 pcs) | Wholesale B2B (pallet 11,520 pcs) = <b>~€0.078/unit (€37.40/case)</b>'
                ],
                certsTitle: '📜 Evidence Base & Pricing (3 Direct Faerch A/S PDF Datasheets):',
                certs: [
                    '🏭 Manufacturer: Faerch A/S (Holstebro, Denmark)',
                    '📄 3 Original PDFs: #2200012097, #2226014004, #2182015004',
                    '🌡️ CPET: -40…+220 °C | PP: +121 °C | APET: +70 °C',
                    '🍲 Mode: Dual-Ovenable (Convection Oven & Microwave)',
                    '💶 CPET Retail: €0.155/pc | B2B: €0.091/pc (vs Base €0.125 / €0.078)',
                    '♻️ Virgin Plastic: 6.41–12.83 g vs 26.29 g base (-51%…-75.6%)'
                ]
            }
        ],
        matrixTitle: 'Engineering Selection Matrix for Profi Retail (Backed by Authentic Factory PDF Certificates & TDS)',
        matrixHeaders: [
            'Evaluation Criterion (per PDF TDS)',
            '🔴 Public Baseline 100% Virgin PP (Faerch #2226014004) & Cold APET (#2182015004)',
            '🏆 1. EU Flagship: SACMA B.Life® GAIA × Futamura NatureFlex™ 30 NVO',
            '🥇 2. Hot Counter & Mono-Paper: Bagcraft® ToGo! (#301051 / #301011) & Koehler NexPlus® OGR',
            '🔥 3. 220°C Oven Benchmarks: Hostaphan® RHST / 70% PCR & Faerch CPET Tray (#2200012097)'
        ],
        matrixRows: [
            [
                '<b>Manufacturer, Country & Document</b>',
                '<b>Faerch A/S (Denmark)</b><br>PP #2226014004 (EAN 5701022905797)<br>APET #2182015004 (EAN 5703969013399)',
                '<b>SACMA S.p.A. (Italy) + Futamura (UK/EU)</b><br>BRCGS Issue 7 Grade AA+ & DNV FSC-COC-000967',
                '<b>Novolex Bagcraft® (USA) & Koehler Paper (DE) / Mondi (Austria/Romania)</b><br>B_PG_1093_0922, NVX-12832026 & NexPlus OGR',
                '<b>Mitsubishi Polyester Film (DE) / Sirane (Poland) & Faerch A/S (Denmark)</b><br>Intertek RC-20260727-01(b) & TDS #2200012097'
            ],
            [
                '<b>Profi Romania Store Scenario</b>',
                'Cold APET warps >70 °C; Baseline PP capped at +121 °C (Microwave only)',
                '<b>Flagship (Sizes L & S/M):</b> 65–85 °C hot counter + oven reheating up to 200 °C & microwave',
                '<b>Fast Drop-in (L & S/M):</b> Post-rotisserie hot display (65–85 °C up to 6h) & dry hot snacks',
                '<b>Direct Oven Roasting (up to 220 °C):</b> When chicken or meal is roasted directly inside the pack'
            ],
            [
                '<b>Total Weight & Structure</b>',
                '<b>26.29 g ± 10%</b> (PP #2226014004)<br><b>21.48 g ± 10%</b> (APET #2182015004)',
                '<b>~14–24 g (S/M & L):</b> FSC® Paper + heat-sealed NatureFlex™ 30 NVO bio-liner & window (30 µm)',
                '<b>L (#301051):</b> 28.72 g gross (~2.20 g PP window)<br><b>S/M (#301011):</b> 12.25 g gross (~1.45 g window)<br><b>NexPlus® OGR:</b> 100% paper (0 g plastic)',
                '<b>Hostaphan® / Sira-Cook™ Bag:</b> ~12.0 g (21–42 g/m²)<br><b>Faerch CPET Tray:</b> 21.38 g ± 10% (-18.7% lighter)'
            ],
            [
                '<b>Virgin Plastic Calculation</b><br><small>(Total Plastic − Recycled)</small>',
                '26.29 g − 0 g =<br><b>26.29 g Virgin (100% prime PP)</b>',
                '0.00 g plastic =<br><b>0.00 g Virgin (-100% plastic; 100% wood-pulp cellulose)</b>',
                '<b>Bagcraft L:</b> ~2.20 g (<b>-91.6%</b>)<br><b>Bagcraft S/M:</b> ~1.45 g (<b>-94.5%</b>)<br><b>Koehler / Mondi:</b> 0.00 g (<b>-100%</b>)',
                '<b>Hostaphan (70% PCR Intertek):</b> 12 − 8.4 = <b>3.60 g (-86.3%)</b><br><b>Faerch CPET (40–70% rPET):</b> <b>6.41–12.83 g (-51%…-75.6%)</b>'
            ],
            [
                '<b>Unit & Case Price:<br>Retail (1 case) vs Wholesale B2B (Profi)</b>',
                '<b>Retail (480 pcs):</b> ~€0.125/pc (€60.00/case)<br><b>Wholesale B2B:</b> <b>~€0.078/pc (€37.40/case)</b> + AFM tax on 26.29 g virgin plastic',
                '<b>Retail (500 pcs):</b> ~€0.145/pc (L) | ~€0.095/pc (S/M)<br><b>Wholesale B2B (from 25k pcs):</b> <b>~€0.088/pc (L, +12.8%) & ~€0.058/pc (S/M, -25%)</b> + €0 tax',
                '<b>Retail:</b> L #301051: $0.176/pc (~€0.162, $43.99/250 pcs) | S/M #301011: $0.093/pc (~€0.085)<br><b>Wholesale B2B:</b> <b>L: ~€0.086/pc (+10.2%) | S/M: ~€0.052/pc | All-Paper: ~€0.042–€0.055/pc</b>',
                '<b>Sira-Cook™ Bag:</b> Retail ~€0.140/pc | <b>Wholesale B2B: ~€0.085/pc (+9.0%)</b><br><b>CPET Tray #2200012097:</b> Retail ~€0.155/pc | <b>Wholesale B2B: ~€0.091/pc (+16.5%)</b>'
            ],
            [
                '<b>Thermal Rating (per PDF)</b>',
                'APET: -40…+70 °C (Not ovenable)<br>PP: 0…+121 °C (Microwave only)',
                '✅ <b>-40 °C…+200 °C (up to 30 min)</b><br>(Oven, microwave, hot cabinet & freezer)',
                '✅ <b>Hot Meal Warming Display (65–85 °C)</b><br>(Steam vents + PET window in #301056)',
                '✅ <b>-40 °C…+220 °C (up to 120 min for RHST)</b><br>(Dual-Ovenable: convection oven & microwave)'
            ],
            [
                '<b>Grease Barrier & Zero Fibers</b>',
                'PP/APET plastic (0% fibers)',
                '✅ <b>Hermetic heat-sealed NatureFlex™ NVO layer • 0% fibers & leak-proof</b>',
                '✅ <b>Anti-Fog liner / KIT Level 7 PFAS-free & acrylate-free (Koehler NexPlus® OGR)</b>',
                '✅ <b>Coextruded BoPET (Antimony-Free) & Crystalline CPET • 0% fibers</b>'
            ],
            [
                '<b>End-of-Life & Romania AFM Tax (OUG 6/2021 & PPWR)</b>',
                'Full virgin plastic levy (26.29 g Virgin PP per portion)',
                '✅ <b>PAP 22 (Aticelca® paper recycling) + OK Compost HOME (Zero plastic tax)</b>',
                '✅ <b>91–100% plastic tax reduction • Local conversion in Romania (Mondi Bucharest / EcoPaper)</b>',
                '✅ <b>Mono-material PET (NIR Detectable = Yes) with ISO 14021 verified PCR</b>'
            ],
            [
                '<b>Original PDF Documents Embedded in Project</b>',
                '<code>Faerch-P-2226-1C-PP-2226014004-TDS.pdf</code><br><code>Faerch-K-2182-1G-APET-2182015004-TDS.pdf</code>',
                '✅ <code>SACMA-BRCGS-Food-Packaging-Certificate-2026-2027.pdf</code><br>✅ <code>SACMA-DNV-FSC-Certificate-DNV-COC-000967.pdf</code>',
                '✅ <code>Bagcraft-ToGo-Hot-Foods-Spec-B_PG_1093.pdf</code><br>✅ <code>Novolex-Dubl-View-ToGo-Deli-Bags-PET-Window.pdf</code><br>✅ <code>Koehler-NexPlus-OGR-Grease-Resistant-Paper-Official.pdf</code>',
                '✅ <code>Intertek-Certificate-Mitsubishi-Hostaphan-PCR-2025.pdf</code><br>✅ <code>Mitsubishi-Hostaphan-RHST-Ovenable-Roasting-Bags-TDS.pdf</code><br>✅ <code>Faerch-C-2200-1L-CPET-2200012097-TDS.pdf</code>'
            ]
        ],
        certModal: {
            title: '📜 Official Factory Certificate & Technical Datasheet (PDF TDS)',
            orgPrefix: 'AUTHENTIC FACTORY DOCUMENT / CERTIFICATE •',
            docNoLabel: 'Document No.:',
            rowDim: 'Exact Dimensions, Case Pack & Application',
            rowStd: 'Official EU/US Certificates & Standards',
            rowLayers: 'Real Material Composition & Barrier Structure',
            rowTemp: 'Thermal Rating & Operating Regime',
            rowPrice: 'Unit & Case Pricing (Retail vs Wholesale B2B)',
            rowVirgin: 'Virgin Plastic Balance (vs 26.29 g Baseline)',
            tabsHint: '📂 Select an original factory PDF certificate to view below:',
            embedTitle: '📑 Embedded Authentic Factory PDF Document (scroll pages inside viewer):',
            openLocalPdfBtn: '📄 Open Current Original PDF in New Tab ↗',
            openLiveUrlBtn: '🌐 Direct Link to Product Page / Specification (200 OK) ↗',
            openBuyUrlBtn: '🛒 Open Direct Product Page at Supplier (200 OK) ↗',
            printBtn: '🖨️ Print'
        },
        adminModal: {
            title: 'Engineering Panel: Add & Calculate Packaging Sample',
            descHtml: 'Enter the technical datasheet parameters of a real sample (TDS), its certificate link, and supplier website. The system will automatically calculate Virgin Plastic mass via <b>Total Plastic − Recycled Content</b> against the baseline (26.29 g Virgin PP) and render the 5-axis radar chart.',
            labels: [
                'Real Product Name & SKU:',
                'Product Photo Path:',
                'Purchase Website URL (Button 3):',
                'PDF Certificate / TDS Path (Button 2):',
                'Short Description & Layer Composition:',
                'Certification Standards:',
                'Total Weight (g):',
                'Plastic Mass Inside (g):',
                'PCR Recycled Share (%):',
                'Cost Difference (%):',
                'Max Temperature (°C):',
                'Grease Barrier / 0 Fiber (%):',
                'Window & Ecology (%):'
            ],
            namePlaceholder: 'E.g.: SACMA B.Life® GAIA / Bagcraft® #301051',
            infoPlaceholder: 'FSC® Paper + heat-sealed Futamura NatureFlex™ 30 NVO bio-liner & window',
            submitBtn: 'Calculate via Formula & Add Card with 3 Buttons and 5-Axis Radar Chart'
        }
    }
};

// Верифицированные паспортные данные всех 4 карточек + все 13 подлинных заводских PDF-документов + розничные и оптовые цены
const verifiedComparisons = [
    {
        // КАРТОЧКА 1: ФЛАГМАН ЕС — SACMA S.p.A. B.Life GAIA × Futamura NatureFlex 30 NVO (0% пластика, -40...+200 °C)
        source: {
            ru: 'SACMA S.p.A. B.Life® GAIA × NatureFlex™ 30 NVO • 0.00 г пластика (-100%) • Розница: €0.145/шт (L) | Опт B2B: €0.088/шт (L) и €0.058/шт (S/M)',
            md: 'SACMA S.p.A. B.Life® GAIA × NatureFlex™ 30 NVO • 0.00 g plastic (-100%) • Retail: €0.145/buc (L) | En-gros B2B: €0.088/buc (L) și €0.058/buc (S/M)',
            en: 'SACMA S.p.A. B.Life® GAIA × NatureFlex™ 30 NVO • 0.00 g plastic (-100%) • Retail: €0.145/pc (L) | B2B Bulk: €0.088/pc (L) & €0.058/pc (S/M)'
        },
        old: {
            name: {
                ru: 'Базовый эталон Faerch P 2226-1C (#2226014004, 26.29 г 100% Virgin PP)',
                md: 'Etalonul de bază Faerch P 2226-1C (#2226014004, 26.29 g 100% Virgin PP)',
                en: 'Baseline Faerch P 2226-1C (#2226014004, 26.29 g 100% Virgin PP)'
            },
            totalMassG: 26.29,
            plasticMassG: 26.29,
            recycledPct: 0,
            tempC: 121,
            holdHours: 4,
            greaseNoFiberScore: 75,
            windowRecycleScore: 25,
            costDeltaPct: 0,
            specNote: {
                ru: '26.29 г 100% первичного PP (предел +121 °C) • Цена базы: Розница (1 короб 480 шт) = ~€0.125/шт (€60.00/короб) | Крупный опт B2B = ~€0.078/шт (€37.40/короб)',
                md: '26.29 g 100% PP primar (limită +121 °C) • Preț bază: Retail (1 cutie 480 buc) = ~€0.125/buc (€60.00/cutie) | En-gros B2B = ~€0.078/buc (€37.40/cutie)',
                en: '26.29 g 100% virgin PP (max +121 °C) • Baseline Price: Retail (1 case 480 pcs) = ~€0.125/pc (€60.00/case) | Wholesale B2B = ~€0.078/pc (€37.40/case)'
            }
        },
        eco: {
            name: {
                ru: 'SACMA B.Life® GAIA × Futamura NatureFlex™ 30 NVO (Размеры L и S/M)',
                md: 'SACMA B.Life® GAIA × Futamura NatureFlex™ 30 NVO (Mărimi L și S/M)',
                en: 'SACMA B.Life® GAIA × Futamura NatureFlex™ 30 NVO (Sizes L & S/M)'
            },
            totalMassG: 18.50,
            plasticMassG: 0.00,
            recycledPct: 0,
            tempC: 200,
            holdHours: 6,
            greaseNoFiberScore: 99,
            windowRecycleScore: 100,
            costDeltaPct: 12.8,
            specNote: {
                ru: '0.00 г пластика (-100% Virgin) • Духовка до 200 °C (30 мин), СВЧ и витрина • Цена: Розница (500 шт) = ~€0.145/шт (L) и ~€0.095/шт (S/M) | Опт B2B (от 25 000 шт) = ~€0.088/шт (L, +12.8%) и ~€0.058/шт (S/M, -25%)',
                md: '0.00 g plastic (-100% Virgin) • Cuptor până la 200 °C (30 min), microunde și vitrină • Preț: Retail (500 buc) = ~€0.145/buc (L) și ~€0.095/buc (S/M) | En-gros B2B (25 000+ buc) = ~€0.088/buc (L, +12.8%) și ~€0.058/buc (S/M, -25%)',
                en: '0.00 g plastic (-100% Virgin) • Ovenable to 200 °C (30 min), microwave & hot display • Price: Retail (500 pcs) = ~€0.145/pc (L) & ~€0.095/pc (S/M) | Wholesale B2B (25,000+ pcs) = ~€0.088/pc (L, +12.8%) & ~€0.058/pc (S/M, -25%)'
            }
        },
        cert: {
            docNo: 'BRCGS 72228-2010-ABRC (AA+) & DNV-COC-000967',
            manufacturer: 'SACMA S.p.A. (Via Industriale 22, 25030 Adro BS, Italy) × Futamura Chemical UK Ltd',
            productTitle: 'SACMA B.Life® GAIA Ovenable Rotisserie Bag with Futamura NatureFlex™ 30 NVO Window',
            sku: 'B.Life® GAIA Series | Sizes L (Whole Chicken) & S/M (Portions) | NatureFlex™ 30 NVO (30 µm)',
            standards: 'BRCGS Packaging Materials Issue 7 Grade AA+ (Valid to 03.08.2027) • DNV FSC® Chain of Custody DNV-COC-000967 (Valid to 23.10.2029) • DIN CERTCO 9S0002 • TÜV OK compost HOME • Aticelca® 501 (PAP 22)',
            dimensions: {
                ru: 'Формат L (целая курица-гриль 1.0–1.3 кг, ~220×150×280 мм, ~22–24 г) и Формат S/M (крылышки, стрипсы, картофель wedges, ~14–16 г) • Плоское термосварное дно с прозрачным окном (500 шт/короб)',
                md: 'Format L (pui întreg la rotisor 1.0–1.3 kg, ~220×150×280 mm, ~22–24 g) și Format S/M (aripioare, strips, cartofi wedges, ~14–16 g) • Bază plată termosudată cu fereastră transparentă (500 buc/cutie)',
                en: 'Size L (whole rotisserie chicken 1.0–1.3 kg, ~220×150×280 mm, ~22–24 g) and Size S/M (wings, strips, potato wedges, ~14–16 g) • Heat-sealed flat bottom with clear window (500 pcs/case)'
            },
            layerSpec: {
                ru: 'Внешний слой: бумага FSC® (с волокнами травы / крафт) • Внутренний термосвариваемый барьер и окно: регенерированная древесная целлюлоза Futamura NatureFlex™ 30 NVO (30 мкм, 96% био-углерод, 0% нефтяного пластика)',
                md: 'Strat exterior: hârtie FSC® (cu fibre de iarbă / kraft) • Barieră interioară termosudabilă și fereastră: celuloză regenerată din lemn Futamura NatureFlex™ 30 NVO (30 µm, 96% bio-carbon, 0% plastic petrolier)',
                en: 'Outer layer: FSC® paper (with grass fibers / kraft) • Inner heat-sealable barrier & window: Futamura NatureFlex™ 30 NVO regenerated wood-pulp cellulose (30 µm, 96% bio-based carbon, 0% petroleum plastic)'
            },
            tempHold: {
                ru: 'Разогрев в традиционной духовке и конвектомате до +200 °C (до 30 мин), СВЧ-печь, горячая витрина 65–85 °C (до 6 ч) и заморозка до -40 °C',
                md: 'Reîncălzire în cuptor tradițional și cu convecție până la +200 °C (până la 30 min), microunde, vitrină caldă 65–85 °C (până la 6 ore) și congelare până la -40 °C',
                en: 'Conventional & convection oven reheating up to +200 °C (up to 30 min), microwave-safe, 65–85 °C hot display holding (up to 6h), and freezer-safe to -40 °C'
            },
            pricing: {
                ru: 'Розница (от 1 короба 500 шт): ~€0.145/шт (€72.50/короб L) и ~€0.095/шт (€47.50/короб S/M) • Крупный опт B2B для сети Profi (от 25 000–50 000 шт): ~€0.088/шт (€44.00/короб L, +12.8% к базовому опту €0.078) и ~€0.058/шт (€29.00/короб S/M, на 25% дешевле лотка) + 0 € налога на пластик!',
                md: 'Retail (de la 1 cutie 500 buc): ~€0.145/buc (€72.50/cutie L) și ~€0.095/buc (€47.50/cutie S/M) • En-gros B2B pentru rețeaua Profi (de la 25 000–50 000 buc): ~€0.088/buc (€44.00/cutie L, +12.8% vs baza en-gros €0.078) și ~€0.058/buc (€29.00/cutie S/M, cu 25% mai ieftin decât casoleta) + 0 € taxă de plastic!',
                en: 'Retail (from 1 case / 500 pcs): ~€0.145/pc (€72.50/case L) & ~€0.095/pc (€47.50/case S/M) • Wholesale B2B for Profi (from 25,000–50,000 pcs): ~€0.088/pc (€44.00/case L, +12.8% vs €0.078 wholesale base) & ~€0.058/pc (€29.00/case S/M, 25% cheaper than tray) + €0 plastic tax!'
            },
            virginCalc: {
                ru: '0.00 г пластика против 26.29 г Virgin PP у базового лотка Faerch #2226014004 → 100% отказ от первичного пластика (-26.29 г на каждой порции)',
                md: '0.00 g plastic față de 26.29 g Virgin PP la casoleta de bază Faerch #2226014004 → eliminare 100% a plasticului primar (-26.29 g pe fiecare porție)',
                en: '0.00 g plastic vs 26.29 g Virgin PP in baseline Faerch #2226014004 tray → 100% elimination of virgin plastic (-26.29 g per portion)'
            },
            localPdf: 'certs/SACMA-BRCGS-Food-Packaging-Certificate-2026-2027.pdf',
            docs: [
                {
                    label: '1. Сертификат BRCGS Grade AA+ (SACMA S.p.A., до 2027)',
                    path: 'certs/SACMA-BRCGS-Food-Packaging-Certificate-2026-2027.pdf'
                },
                {
                    label: '2. Сертификат DNV FSC® Chain of Custody (SACMA S.p.A., до 2029)',
                    path: 'certs/SACMA-DNV-FSC-Certificate-DNV-COC-000967.pdf'
                }
            ],
            pdfUrl: 'https://www.futamuragroup.com/sacma-develops-compostable-ovenable-bag-for-rotisserie-using-natureflex-films/',
            buyUrl: 'https://sacmaspa.it/collezione-b-life/#gaia'
        }
    },
    {
        // КАРТОЧКА 2: СЕРИЙНЫЙ КРАФТ ГОРЯЧЕЙ ВИТРИНЫ (BAGCRAFT TOGO! #301051 L / #301011 S/M / #301056 PET) + БЮДЖЕТНАЯ МОНО-БУМАГА ЕС (KOEHLER NEXPLUS OGR / MONDI)
        source: {
            ru: 'Bagcraft® #301051 L / #301011 S/M & Koehler NexPlus® OGR • Розница: €0.162/шт (L) | Опт B2B: €0.086/шт (L), €0.052/шт (S/M), €0.045/шт (Моно-бумага)',
            md: 'Bagcraft® #301051 L / #301011 S/M & Koehler NexPlus® OGR • Retail: €0.162/buc (L) | En-gros B2B: €0.086/buc (L), €0.052/buc (S/M), €0.045/buc (Mono-hârtie)',
            en: 'Bagcraft® #301051 L / #301011 S/M & Koehler NexPlus® OGR • Retail: €0.162/pc (L) | B2B Bulk: €0.086/pc (L), €0.052/pc (S/M), €0.045/pc (All-Paper)'
        },
        old: {
            name: {
                ru: 'Базовый эталон Faerch P 2226-1C (#2226014004, 26.29 г 100% Virgin PP)',
                md: 'Etalonul de bază Faerch P 2226-1C (#2226014004, 26.29 g 100% Virgin PP)',
                en: 'Baseline Faerch P 2226-1C (#2226014004, 26.29 g 100% Virgin PP)'
            },
            totalMassG: 26.29,
            plasticMassG: 26.29,
            recycledPct: 0,
            tempC: 121,
            holdHours: 4,
            greaseNoFiberScore: 75,
            windowRecycleScore: 25,
            costDeltaPct: 0,
            specNote: {
                ru: '26.29 г 100% первичного пластика PP • Цена базы: Розница (480 шт) = ~€0.125/шт (€60.00/короб) | Крупный опт B2B = ~€0.078/шт (€37.40/короб)',
                md: '26.29 g 100% plastic primar PP • Preț bază: Retail (480 buc) = ~€0.125/buc (€60.00/cutie) | En-gros B2B = ~€0.078/buc (€37.40/cutie)',
                en: '26.29 g 100% virgin PP plastic • Baseline Price: Retail (480 pcs) = ~€0.125/pc (€60.00/case) | Wholesale B2B = ~€0.078/pc (€37.40/case)'
            }
        },
        eco: {
            name: {
                ru: 'Bagcraft® ToGo! (#301051 L / #301011 S/M / #301056 PET) & Koehler NexPlus® OGR',
                md: 'Bagcraft® ToGo! (#301051 L / #301011 S/M / #301056 PET) & Koehler NexPlus® OGR',
                en: 'Bagcraft® ToGo! (#301051 L / #301011 S/M / #301056 PET) & Koehler NexPlus® OGR'
            },
            totalMassG: 20.48,
            plasticMassG: 1.80,
            recycledPct: 0,
            tempC: 160,
            holdHours: 6,
            greaseNoFiberScore: 98,
            windowRecycleScore: 96,
            costDeltaPct: 10.2,
            specNote: {
                ru: 'Розница (1 короб): #301051 L = $0.176/шт (~€0.162, $43.99/250 шт) и #301011 S/M = $0.093/шт (~€0.085, $46.49/500 шт) | Опт B2B: L = ~€0.086/шт (+10.2%), S/M = ~€0.052/шт, Моно-бумага Koehler/Mondi = ~€0.042–€0.055/шт',
                md: 'Retail (1 cutie): #301051 L = $0.176/buc (~€0.162, $43.99/250 buc) și #301011 S/M = $0.093/buc (~€0.085, $46.49/500 buc) | En-gros B2B: L = ~€0.086/buc (+10.2%), S/M = ~€0.052/buc, Mono-hârtie Koehler/Mondi = ~€0.042–€0.055/buc',
                en: 'Retail (1 case): #301051 L = $0.176/pc (~€0.162, $43.99/250 pcs) & #301011 S/M = $0.093/pc (~€0.085, $46.49/500 pcs) | Wholesale B2B: L = ~€0.086/pc (+10.2%), S/M = ~€0.052/pc, All-Paper Koehler/Mondi = ~€0.042–€0.055/pc'
            }
        },
        cert: {
            docNo: 'B_PG_1093_0922 • NVX-12832026 • Koehler NexPlus® OGR',
            manufacturer: 'Novolex™ / Bagcraft® (USA) & Koehler Paper SE (Oberkirch, Germany) / Mondi Group (EU)',
            productTitle: 'Bagcraft® EcoCraft® ToGo! (#301051 L / #301011 S/M / #301056 PET) & Koehler NexPlus® OGR Barrier Paper',
            sku: 'SKUs: #301051 (L, UPC 10072181010519) • #301011 (S/M, UPC 10072181010113) • #301056 (Paper/PET) • NexPlus® OGR 32–60 g/m²',
            standards: 'Novolex Spec B_PG_1093_0922 & NVX-12832026 • Koehler NexPlus® OGR KIT Level 7 (100% PFAS-Free & Acrylate-Free) • FDA & BfR XXXVI Food Contact',
            dimensions: {
                ru: 'L (#301051): 222.3 × 152.4 × 273.1 мм (250 шт/короб, 15.83 lbs = 28.72 г/шт) • S/M (#301011): 127.0 × 76.2 × 244.3 мм (500 шт/короб, 13.50 lbs = 12.25 г/шт) • #301043: 196.9 × 127.0 × 241.3 мм',
                md: 'L (#301051): 222.3 × 152.4 × 273.1 mm (250 buc/cutie, 15.83 lbs = 28.72 g/buc) • S/M (#301011): 127.0 × 76.2 × 244.3 mm (500 buc/cutie, 13.50 lbs = 12.25 g/buc) • #301043: 196.9 × 127.0 × 241.3 mm',
                en: 'L (#301051): 222.3 × 152.4 × 273.1 mm (250 pcs/case, 15.83 lbs = 28.72 g/bag) • S/M (#301011): 127.0 × 76.2 × 244.3 mm (500 pcs/case, 13.50 lbs = 12.25 g/bag) • #301043: 196.9 × 127.0 × 241.3 mm'
            },
            layerSpec: {
                ru: 'Bagcraft®: неотбеленный крафт EcoCraft® + антифог-выстилка и окно Anti-Fog PP / термостойкий ПЭТ (#301056) • Вариант ЕС (Моно-бумага): Koehler NexPlus® OGR (KIT Level 7 без PFAS и акрилатов) / Mondi FunctionalBarrier + окно Ahlstrom Cristal™',
                md: 'Bagcraft®: kraft natur EcoCraft® + căptușeală Anti-Fog și fereastră Anti-Fog PP / PET termorezistent (#301056) • Varianta UE (Mono-hârtie): Koehler NexPlus® OGR (KIT Level 7 fără PFAS și acrilați) / Mondi FunctionalBarrier + fereastră Ahlstrom Cristal™',
                en: 'Bagcraft®: unbleached EcoCraft® kraft + anti-fog liner & window Anti-Fog PP / hot-food PET (#301056) • EU All-Paper Option: Koehler NexPlus® OGR (KIT Level 7 PFAS-free & acrylate-free) / Mondi FunctionalBarrier + Ahlstrom Cristal™ window'
            },
            tempHold: {
                ru: 'Горячая выкладка на тепловую витрину (Warming Display 65–85 °C до 6 ч) с перфорацией Performance Ventilation и замком Tac Seal (не предназначены для запекания внутри духовки при 250 °C)',
                md: 'Expunere caldă pe vitrina termică (Warming Display 65–85 °C până la 6 ore) cu perforații Performance Ventilation și închidere Tac Seal (nu sunt destinate coacerii în cuptor la 250 °C)',
                en: 'Hot meal warming display holding (65–85 °C up to 6h) with Performance Ventilation and Tac Seal closure (not intended for 250 °C oven roasting)'
            },
            pricing: {
                ru: 'Розница (1 короб): #301051 L (250 шт) = $43.99/короб ($0.176/шт ≈ €0.162/шт); #301011 S/M (500 шт) = $46.49/короб ($0.093/шт ≈ €0.085/шт); Моно-бумага = ~€0.075/шт • Крупный опт B2B (от 50 000+ шт): #301051 L = ~€0.086/шт ($0.094/шт, $23.50/короб, +10.2% к базе); #301011 S/M = ~€0.052/шт ($0.057/шт); Моно-бумага Koehler/Mondi = ~€0.042–€0.055/шт (-30% дешевле пластикового лотка!)',
                md: 'Retail (1 cutie): #301051 L (250 buc) = $43.99/cutie ($0.176/buc ≈ €0.162/buc); #301011 S/M (500 buc) = $46.49/cutie ($0.093/buc ≈ €0.085/buc); Mono-hârtie = ~€0.075/buc • En-gros B2B (de la 50 000+ buc): #301051 L = ~€0.086/buc ($0.094/buc, $23.50/cutie, +10.2% vs bază); #301011 S/M = ~€0.052/buc ($0.057/buc); Mono-hârtie Koehler/Mondi = ~€0.042–€0.055/buc (-30% mai ieftin decât casoleta!)',
                en: 'Retail (1 case): #301051 L (250 pcs) = $43.99/case ($0.176/pc ≈ €0.162/pc); #301011 S/M (500 pcs) = $46.49/case ($0.093/pc ≈ €0.085/pc); All-Paper = ~€0.075/pc • Wholesale B2B (50,000+ pcs): #301051 L = ~€0.086/pc ($0.094/pc, $23.50/case, +10.2% vs base); #301011 S/M = ~€0.052/pc ($0.057/pc); All-Paper Koehler/Mondi = ~€0.042–€0.055/pc (-30% cheaper than plastic tray!)'
            },
            virginCalc: {
                ru: 'Bagcraft® #301051 (L): ~2.20 г пластика окна (-91.6% к базе) • #301011 (S/M): ~1.45 г (-94.5% к базе) • Моно-бумага Koehler NexPlus® OGR / Mondi: 0.00 г пластика (-100%)',
                md: 'Bagcraft® #301051 (L): ~2.20 g plastic fereastră (-91.6% vs bază) • #301011 (S/M): ~1.45 g (-94.5% vs bază) • Mono-hârtie Koehler NexPlus® OGR / Mondi: 0.00 g plastic (-100%)',
                en: 'Bagcraft® #301051 (L): ~2.20 g window plastic (-91.6% vs base) • #301011 (S/M): ~1.45 g (-94.5% vs base) • Koehler NexPlus® OGR / Mondi All-Paper: 0.00 g plastic (-100%)'
            },
            localPdf: 'certs/Bagcraft-ToGo-Hot-Foods-Spec-B_PG_1093.pdf',
            docs: [
                {
                    label: '1. Каталог Bagcraft® ToGo! #301051 L / #301011 S/M (B_PG_1093)',
                    path: 'certs/Bagcraft-ToGo-Hot-Foods-Spec-B_PG_1093.pdf'
                },
                {
                    label: '2. Паспорт Dubl View® & Clear View™ PET Window (#301056, NVX-12832026)',
                    path: 'certs/Novolex-Dubl-View-ToGo-Deli-Bags-PET-Window.pdf'
                },
                {
                    label: '3. Документ Koehler NexPlus® OGR (KIT Level 7, PFAS-Free, Германия)',
                    path: 'certs/Koehler-NexPlus-OGR-Grease-Resistant-Paper-Official.pdf'
                },
                {
                    label: '4. Инструкция загрузки и запайки Novolex ToGo! (B_FL_1066)',
                    path: 'certs/Novolex-ToGo-HotMealBags-Instructions.pdf'
                }
            ],
            pdfUrl: 'https://www.mondigroup.com/products-and-solutions/flexible-packaging/ultra-high-functionalbarrier-paper/',
            buyUrl: 'https://www.paperenterprisesusa.com/assets/File/B_PG_1093_0922_ToGo_Hot_Foods_WEB.pdf'
        }
    },
    {
        // КАРТОЧКА 3: ТЕРМОСТОЙКИЙ ПАКЕТ ДЛЯ ДУХОВКИ 220°C — MITSUBISHI HOSTAPHAN RHST / RPSP PL + СЕРТИФИКАТ INTERTEK 70% PCR (SIRANE SIRA-COOK)
        source: {
            ru: 'Mitsubishi Hostaphan® RHST (220°C) & Intertek 70% PCR (Sirane Sira-Cook™) • Розница: €0.140/шт | Опт B2B: €0.085/шт (+9.0% к базе)',
            md: 'Mitsubishi Hostaphan® RHST (220°C) & Intertek 70% PCR (Sirane Sira-Cook™) • Retail: €0.140/buc | En-gros B2B: €0.085/buc (+9.0% vs bază)',
            en: 'Mitsubishi Hostaphan® RHST (220°C) & Intertek 70% PCR (Sirane Sira-Cook™) • Retail: €0.140/pc | B2B Bulk: €0.085/pc (+9.0% vs base)'
        },
        old: {
            name: {
                ru: 'Базовый эталон Faerch P 2226-1C (#2226014004, 26.29 г 100% Virgin PP)',
                md: 'Etalonul de bază Faerch P 2226-1C (#2226014004, 26.29 g 100% Virgin PP)',
                en: 'Baseline Faerch P 2226-1C (#2226014004, 26.29 g 100% Virgin PP)'
            },
            totalMassG: 26.29,
            plasticMassG: 26.29,
            recycledPct: 0,
            tempC: 121,
            holdHours: 4,
            greaseNoFiberScore: 75,
            windowRecycleScore: 25,
            costDeltaPct: 0,
            specNote: {
                ru: '26.29 г 100% Virgin PP • Плавится в духовке (предел +121 °C, только СВЧ) • Цена базы: Розница = ~€0.125/шт | Опт B2B = ~€0.078/шт',
                md: '26.29 g 100% Virgin PP • Se topește în cuptor (limită +121 °C, doar microunde) • Preț bază: Retail = ~€0.125/buc | En-gros B2B = ~€0.078/buc',
                en: '26.29 g 100% Virgin PP • Melts in oven (max +121 °C, microwave only) • Baseline Price: Retail = ~€0.125/pc | Wholesale B2B = ~€0.078/pc'
            }
        },
        eco: {
            name: {
                ru: 'Mitsubishi Hostaphan® RHST / RPSP PL (220 °C) + 70% PCR (Sirane Sira-Cook™)',
                md: 'Mitsubishi Hostaphan® RHST / RPSP PL (220 °C) + 70% PCR (Sirane Sira-Cook™)',
                en: 'Mitsubishi Hostaphan® RHST / RPSP PL (220 °C) + 70% PCR (Sirane Sira-Cook™)'
            },
            totalMassG: 12.00,
            plasticMassG: 12.00,
            recycledPct: 70,
            tempC: 220,
            holdHours: 6,
            greaseNoFiberScore: 100,
            windowRecycleScore: 93,
            costDeltaPct: 9.0,
            specNote: {
                ru: 'TDS Hostaphan® RHST: до +220 °C (120 мин) • Сертификат Intertek RC-20260727-01(b): 70% PCR • Цена: Розница (500 шт) = ~€0.140/шт (€70.00/короб) | Крупный опт B2B = ~€0.085/шт (€42.50/короб, +9.0% к базе)',
                md: 'TDS Hostaphan® RHST: până la +220 °C (120 min) • Certificat Intertek RC-20260727-01(b): 70% PCR • Preț: Retail (500 buc) = ~€0.140/buc (€70.00/cutie) | En-gros B2B = ~€0.085/buc (€42.50/cutie, +9.0% vs bază)',
                en: 'TDS Hostaphan® RHST: up to +220 °C (120 min) • Intertek Certificate RC-20260727-01(b): 70% PCR • Price: Retail (500 pcs) = ~€0.140/pc (€70.00/case) | Wholesale B2B = ~€0.085/pc (€42.50/case, +9.0% vs base)'
            }
        },
        cert: {
            docNo: 'Intertek RC-20260727-01(b) • TDS RHST (06/23) • TDS RPSP PL (06/23)',
            manufacturer: 'Mitsubishi Polyester Film GmbH (Kasteler Str. 45, 65203 Wiesbaden, Germany) / Sirane Group (Poland/UK)',
            productTitle: 'Hostaphan® RHST / RPSP PL (220 °C Ovenable Roasting Film) & Hostaphan® 70% PCR rPET (Sira-Cook™ Bag)',
            sku: 'Hostaphan® RHST (15–30 µm) • RPSP PL (25 µm Self-Venting) • PCR PR3F (30% PCR) • 7RN/PR7N (70% PCR Intertek)',
            standards: 'Intertek Certificate RC-20260727-01(b) (ISO 14021:2016 — 70% PCR) • EU 1935/2004 & EU 10/2011 • Antimony-Free • Dual-Ovenable up to 220 °C (120 min)',
            dimensions: {
                ru: 'Пакет для запекания и горячей полки (~12.0 г, плёнка 15–30 мкм, 21–42 г/м², 500 шт/короб) • Конвертация в пакеты Sira-Cook™ (Sirane Group / KM Packaging, завод в Польше)',
                md: 'Pungă pentru coacere și vitrină caldă (~12.0 g, film 15–30 µm, 21–42 g/m², 500 buc/cutie) • Conversie în pungi Sira-Cook™ (Sirane Group / KM Packaging, fabrică în Polonia)',
                en: 'Ovenable roasting & hot-hold pouch (~12.0 g, 15–30 µm film, 21–42 g/m², 500 pcs/case) • Converted into Sira-Cook™ bags (Sirane Group / KM Packaging, Poland plant)'
            },
            layerSpec: {
                ru: 'Коэкструдированный BoPET Hostaphan® RHST (без сурьмы, Haze 2%) / RPSP PL (Self-Venting Easy-Peel) • В линейке PCR PR3F: 30% PCR в центральном слое с первичными внешними слоями; в линейке 7RN/PR7N: 70% PCR по сертификату Intertek',
                md: 'BoPET coextrudat Hostaphan® RHST (fără stibiu, Haze 2%) / RPSP PL (Self-Venting Easy-Peel) • În gama PCR PR3F: 30% PCR în stratul central cu straturi exterioare virgine; în gama 7RN/PR7N: 70% PCR conform certificatului Intertek',
                en: 'Coextruded BoPET Hostaphan® RHST (antimony-free, Haze 2%) / RPSP PL (Self-Venting Easy-Peel) • PCR PR3F: 30% PCR core encapsulated by virgin outer layers; 7RN/PR7N: 70% PCR certified by Intertek'
            },
            tempHold: {
                ru: 'Паспортный допуск TDS Hostaphan® RHST: запекание в духовке до +220 °C до 120 минут (RPSP PL: от -40 °C до +220 °C с автоматическим сбросом пара Self-Venting; избегать нагрева >250 °C)',
                md: 'Regim oficial TDS Hostaphan® RHST: coacere în cuptor până la +220 °C timp de 120 minute (RPSP PL: de la -40 °C la +220 °C cu evacuare automată a aburului Self-Venting; a se evita >250 °C)',
                en: 'Official TDS Hostaphan® RHST rating: oven roasting up to +220 °C for up to 120 minutes (RPSP PL: -40 °C to +220 °C with Self-Venting steam release; avoid >250 °C)'
            },
            pricing: {
                ru: 'Розница (1 короб 500 шт): ~€0.140/шт (€70.00/короб) • Крупный опт B2B для сети Profi (от 50 000+ шт с завода Sirane Польша): ~€0.085/шт (€42.50/короб, +9.0% к базовому опту €0.078)',
                md: 'Retail (1 cutie 500 buc): ~€0.140/buc (€70.00/cutie) • En-gros B2B pentru rețeaua Profi (de la 50 000+ buc de la fabrica Sirane Polonia): ~€0.085/buc (€42.50/cutie, +9.0% vs baza en-gros €0.078)',
                en: 'Retail (1 case / 500 pcs): ~€0.140/pc (€70.00/case) • Wholesale B2B for Profi (from 50,000+ pcs ex-works Sirane Poland): ~€0.085/pc (€42.50/case, +9.0% vs €0.078 wholesale base)'
            },
            virginCalc: {
                ru: 'Пакет ~12.00 г: при 70% PCR (Intertek RC-20260727-01(b)) Virgin Plastic = 3.60 г (-86.3% к базе 26.29 г); при 30% PCR (TDS PR3F) Virgin Plastic = 8.40 г (-68.0% к базе)',
                md: 'Pungă ~12.00 g: la 70% PCR (Intertek RC-20260727-01(b)) Virgin Plastic = 3.60 g (-86.3% vs baza 26.29 g); la 30% PCR (TDS PR3F) Virgin Plastic = 8.40 g (-68.0% vs bază)',
                en: 'Pouch ~12.00 g: at 70% PCR (Intertek RC-20260727-01(b)) Virgin Plastic = 3.60 g (-86.3% vs 26.29 g base); at 30% PCR (TDS PR3F) Virgin Plastic = 8.40 g (-68.0% vs base)'
            },
            localPdf: 'certs/Intertek-Certificate-Mitsubishi-Hostaphan-PCR-2025.pdf',
            docs: [
                {
                    label: '1. Сертификат Intertek 70% PCR (Hostaphan® rPET, до 2027)',
                    path: 'certs/Intertek-Certificate-Mitsubishi-Hostaphan-PCR-2025.pdf'
                },
                {
                    label: '2. TDS Hostaphan® RHST (Пакеты запекания 220 °C / 120 мин)',
                    path: 'certs/Mitsubishi-Hostaphan-RHST-Ovenable-Roasting-Bags-TDS.pdf'
                },
                {
                    label: '3. TDS Hostaphan® RPSP PL (Self-Venting -40…+220 °C)',
                    path: 'certs/Mitsubishi-Hostaphan-RPSP-PL-EasyPeel-Ovenable-TDS.pdf'
                },
                {
                    label: '4. TDS Hostaphan® PCR PR3F (30% PCR в центральном слое)',
                    path: 'certs/Mitsubishi-Hostaphan-PCR-PR3F-TDS.pdf'
                }
            ],
            pdfUrl: 'https://www.m-petfilm.de/wp-content/uploads/RHST_CookingRoastingBagse.pdf',
            buyUrl: 'https://kapelis.gr/en/ylika_category/ovenable-bags/'
        }
    },
    {
        // КАРТОЧКА 4: FAERCH C 2200-1L EVOLVE CPET (SKU #2200012097) vs БАЗА PP (#2226014004) vs ХОЛОДНЫЙ APET (#2182015004)
        source: {
            ru: 'Faerch TDS #2200012097 (CPET 220°C, 21.38 г) • Розница: €0.155/шт | Опт B2B: €0.091/шт (против Базы PP #2226014004: Розница €0.125 / Опт €0.078)',
            md: 'Faerch TDS #2200012097 (CPET 220°C, 21.38 g) • Retail: €0.155/buc | En-gros B2B: €0.091/buc (vs Baza PP #2226014004: Retail €0.125 / B2B €0.078)',
            en: 'Faerch TDS #2200012097 (CPET 220°C, 21.38 g) • Retail: €0.155/pc | B2B Bulk: €0.091/pc (vs Base PP #2226014004: Retail €0.125 / B2B €0.078)'
        },
        old: {
            name: {
                ru: 'Базовый лоток Faerch P 2226-1C (#2226014004, 26.29 г 100% Virgin PP)',
                md: 'Casoleta de bază Faerch P 2226-1C (#2226014004, 26.29 g 100% Virgin PP)',
                en: 'Baseline Tray Faerch P 2226-1C (#2226014004, 26.29 g 100% Virgin PP)'
            },
            totalMassG: 26.29,
            plasticMassG: 26.29,
            recycledPct: 0,
            tempC: 121,
            holdHours: 4,
            greaseNoFiberScore: 75,
            windowRecycleScore: 25,
            costDeltaPct: 0,
            specNote: {
                ru: 'TDS #2226014004 (20.02.2026): 26.29 г 100% prime PP, 0…+121 °C • Цена базы: Розница (480 шт) = ~€0.125/шт (€60.00/короб) | Опт B2B (паллета) = ~€0.078/шт (€37.40/короб); Холодный APET #2182015004 ограничен +70 °C!',
                md: 'TDS #2226014004 (20.02.2026): 26.29 g 100% prime PP, 0…+121 °C • Preț bază: Retail (480 buc) = ~€0.125/buc (€60.00/cutie) | En-gros B2B (palet) = ~€0.078/buc (€37.40/cutie); APET rece #2182015004 este limitat la +70 °C!',
                en: 'TDS #2226014004 (20.02.2026): 26.29 g 100% prime PP, 0…+121 °C • Baseline Price: Retail (480 pcs) = ~€0.125/pc (€60.00/case) | Wholesale B2B (pallet) = ~€0.078/pc (€37.40/case); Cold APET #2182015004 is capped at +70 °C!'
            }
        },
        eco: {
            name: {
                ru: 'Лоток Faerch C 2200-1L Evolve CPET (#2200012097, 21.38 г, -40…+220 °C)',
                md: 'Casoletă Faerch C 2200-1L Evolve CPET (#2200012097, 21.38 g, -40…+220 °C)',
                en: 'Faerch C 2200-1L Evolve CPET Tray (#2200012097, 21.38 g, -40…+220 °C)'
            },
            totalMassG: 21.38,
            plasticMassG: 21.38,
            recycledPct: 70,
            tempC: 220,
            holdHours: 6,
            greaseNoFiberScore: 96,
            windowRecycleScore: 88,
            costDeltaPct: 16.5,
            specNote: {
                ru: 'TDS #2200012097: 220.2×165.2×45.0 мм, 1126 мл, 21.38 г ± 10%, -40…+220 °C (Dual-Ovenable) • Цена CPET: Розница (544 шт) = ~€0.155/шт (€84.30/короб) | Крупный опт B2B = ~€0.091/шт (€49.50/короб, +16.5% к базе)',
                md: 'TDS #2200012097: 220.2×165.2×45.0 mm, 1126 ml, 21.38 g ± 10%, -40…+220 °C (Dual-Ovenable) • Preț CPET: Retail (544 buc) = ~€0.155/buc (€84.30/cutie) | En-gros B2B = ~€0.091/buc (€49.50/cutie, +16.5% vs bază)',
                en: 'TDS #2200012097: 220.2×165.2×45.0 mm, 1126 ml, 21.38 g ± 10%, -40…+220 °C (Dual-Ovenable) • CPET Price: Retail (544 pcs) = ~€0.155/pc (€84.30/case) | Wholesale B2B = ~€0.091/pc (€49.50/case, +16.5% vs base)'
            }
        },
        cert: {
            docNo: 'FAERCH TDS #2200012097 • #2226014004 • #2182015004',
            manufacturer: 'Faerch A/S (Rasmus Færchs Vej 1, 7500 Holstebro, Denmark)',
            productTitle: 'Faerch C 2200-1L Evolve CPET (#2200012097) vs P 2226-1C PP (#2226014004) & K 2182-1G APET (#2182015004)',
            sku: 'CPET #2200012097 (EAN 5703969041835) | PP #2226014004 (EAN 5701022905797) | APET #2182015004 (EAN 5703969013399)',
            standards: 'EU 1935/2004 • EU 2023/2006 • EU 10/2011 • ISO 9001 & BRCGS High Hygiene • CPET Dual-Ovenable: -40 °C to +220 °C • NIR Detectable: Yes',
            dimensions: {
                ru: 'CPET #2200012097: 220.2 × 165.2 × 45.0 мм, 1126 мл, 550 мкм, 21.38 г ± 10% (544–570 шт/короб) • База PP #2226014004: 226.5 × 177.8 × 40.0 мм, 1084 мл, 600 мкм, 26.29 г (480 шт/короб) • Холодный APET #2182015004: 21.48 г',
                md: 'CPET #2200012097: 220.2 × 165.2 × 45.0 mm, 1126 ml, 550 µm, 21.38 g ± 10% (544–570 buc/cutie) • Baza PP #2226014004: 226.5 × 177.8 × 40.0 mm, 1084 ml, 600 µm, 26.29 g (480 buc/cutie) • APET Rece #2182015004: 21.48 g',
                en: 'CPET #2200012097: 220.2 × 165.2 × 45.0 mm, 1126 ml, 550 µm, 21.38 g ± 10% (544–570 pcs/case) • Base PP #2226014004: 226.5 × 177.8 × 40.0 mm, 1084 ml, 600 µm, 26.29 g (480 pcs/case) • Cold APET #2182015004: 21.48 g'
            },
            layerSpec: {
                ru: 'CPET #2200012097: кристаллический Evolve CPET (рецепт 6811; в публичном TDS точный PCR % колеблется по партиям; пол линейки Evolve = 40% rPET, потолок платформы = до 70% rPET) • База PP #2226014004: 100% первичный полипропилен (рецепт 4900)',
                md: 'CPET #2200012097: Evolve CPET cristalin (rețeta 6811; în TDS-ul public % PCR fluctuează pe loturi; pragul Evolve = 40% rPET, plafonul platformei = până la 70% rPET) • Baza PP #2226014004: 100% polipropilenă primară (rețeta 4900)',
                en: 'CPET #2200012097: crystallized Evolve CPET (Recipe 6811; public TDS notes SKU PCR % fluctuates; Evolve floor = 40% rPET, platform ceiling = up to 70% rPET) • Base PP #2226014004: 100% prime polypropylene (Recipe 4900)'
            },
            tempHold: {
                ru: 'Сравнение по 3 PDF Faerch: 1) CPET #2200012097: от -40 °C до +220 °C (Dual-Ovenable: духовка и СВЧ); 2) База PP #2226014004: от 0 °C до +121 °C (только СВЧ); 3) Холодный APET #2182015004: от -40 °C до +70 °C (Not ovenable)',
                md: 'Comparație pe 3 PDF Faerch: 1) CPET #2200012097: de la -40 °C la +220 °C (Dual-Ovenable: cuptor și microunde); 2) Baza PP #2226014004: de la 0 °C la +121 °C (doar microunde); 3) APET Rece #2182015004: de la -40 °C la +70 °C (Not ovenable)',
                en: '3-PDF Faerch Comparison: 1) CPET #2200012097: -40 °C to +220 °C (Dual-Ovenable: oven & microwave); 2) Base PP #2226014004: 0 °C to +121 °C (microwave only); 3) Cold APET #2182015004: -40 °C to +70 °C (Not ovenable)'
            },
            pricing: {
                ru: 'Лоток CPET #2200012097: Розница (1 короб 544 шт) = ~€0.155/шт (€84.30/короб) | Крупный опт B2B (паллета 6 528–11 400 шт) = ~€0.091/шт (€49.50/короб, +16.5%) • База PP #2226014004: Розница (480 шт) = ~€0.125/шт (€60.00/короб) | Крупный опт B2B (паллета 11 520 шт) = ~€0.078/шт (€37.40/короб)',
                md: 'Casoletă CPET #2200012097: Retail (1 cutie 544 buc) = ~€0.155/buc (€84.30/cutie) | En-gros B2B (palet 6 528–11 400 buc) = ~€0.091/buc (€49.50/cutie, +16.5%) • Baza PP #2226014004: Retail (480 buc) = ~€0.125/buc (€60.00/cutie) | En-gros B2B (palet 11 520 buc) = ~€0.078/buc (€37.40/cutie)',
                en: 'CPET Tray #2200012097: Retail (1 case / 544 pcs) = ~€0.155/pc (€84.30/case) | Wholesale B2B (pallet 6,528–11,400 pcs) = ~€0.091/pc (€49.50/case, +16.5%) • Base PP #2226014004: Retail (480 pcs) = ~€0.125/pc (€60.00/case) | Wholesale B2B (pallet 11,520 pcs) = ~€0.078/pc (€37.40/case)'
            },
            virginCalc: {
                ru: 'Корпус 21.38 г (-18.7% легче базы 26.29 г до учёта PCR): при 40% rPET Virgin = 12.83 г (-51.2%); при 70% rPET Virgin = 6.41 г (-75.6% против базы 26.29 г)',
                md: 'Corp 21.38 g (-18.7% mai ușor decât baza 26.29 g înainte de PCR): la 40% rPET Virgin = 12.83 g (-51.2%); la 70% rPET Virgin = 6.41 g (-75.6% față de baza 26.29 g)',
                en: 'Tray body 21.38 g (-18.7% lighter than 26.29 g base before PCR): at 40% rPET Virgin = 12.83 g (-51.2%); at 70% rPET Virgin = 6.41 g (-75.6% vs 26.29 g base)'
            },
            localPdf: 'certs/Faerch-C-2200-1L-CPET-2200012097-TDS.pdf',
            docs: [
                {
                    label: '1. TDS Кандидата: Faerch C 2200-1L Evolve CPET (#2200012097, -40…+220 °C)',
                    path: 'certs/Faerch-C-2200-1L-CPET-2200012097-TDS.pdf'
                },
                {
                    label: '2. TDS Публичной Базы: Faerch P 2226-1C Clear PP (#2226014004, +121 °C, 100% Virgin)',
                    path: 'certs/Faerch-P-2226-1C-PP-2226014004-TDS.pdf'
                },
                {
                    label: '3. TDS Холодного Эталона: Faerch K 2182-1G Clear APET (#2182015004, предел +70 °C)',
                    path: 'certs/Faerch-K-2182-1G-APET-2182015004-TDS.pdf'
                }
            ],
            pdfUrl: 'https://verkkokauppa.daytongroup.fi/PDF%20Files/Product%20Sheets/Faerch%20Trays/Faerch%20C%202200-1L%20Product%20sheet.pdf',
            buyUrl: 'https://www.goforgreenuk.com/faerch-hot-deli-deluxe-takeaway-containers-1000ml-pack-of-400-hu382'
        }
    }
];

// Вспомогательная функция выбора перевода поля (если объект с языками или строка)
function pickLang(val) {
    if (val && typeof val === 'object') {
        return val[currentLang] || val.ru || '';
    }
    return val || '';
}

// Расчёт Virgin Plastic по формуле (Общий пластик - Recycled = Virgin Plastic) и 5 лучей пятиугольника
function calculateMetrics(data) {
    const oldRecycledG = +(data.old.plasticMassG * (data.old.recycledPct / 100)).toFixed(2);
    const oldVirginG = +(data.old.plasticMassG - oldRecycledG).toFixed(2);

    const ecoRecycledG = +(data.eco.plasticMassG * (data.eco.recycledPct / 100)).toFixed(2);
    const ecoVirginG = +(data.eco.plasticMassG - ecoRecycledG).toFixed(2);

    const virginReductionPct = oldVirginG > 0
        ? Math.max(0, +(100 * (oldVirginG - ecoVirginG) / oldVirginG).toFixed(1))
        : 100;

    const oldThermalScore = Math.min(100, Math.round((data.old.tempC / 220) * 58 + (data.old.holdHours / 6) * 25));
    const ecoThermalScore = Math.min(100, Math.round((data.eco.tempC / 220) * 65 + (data.eco.holdHours / 6) * 35));

    const weightRatioScore = data.eco.totalMassG <= data.old.totalMassG + 3.0
        ? 94
        : Math.max(45, 94 - Math.round((data.eco.totalMassG - data.old.totalMassG) * 4));
    const costFeasibilityScore = data.eco.costDeltaPct <= 15
        ? 92
        : Math.max(45, 92 - Math.round((data.eco.costDeltaPct - 15) * 8));
    const ecoCostWeightScore = Math.round((weightRatioScore + costFeasibilityScore) / 2);

    const oldPolygonScores = [
        12,
        oldThermalScore,
        data.old.greaseNoFiberScore,
        data.old.windowRecycleScore,
        75
    ];

    const ecoPolygonScores = [
        Math.round(virginReductionPct),
        ecoThermalScore,
        data.eco.greaseNoFiberScore,
        data.eco.windowRecycleScore,
        ecoCostWeightScore
    ];

    return {
        oldRecycledG,
        oldVirginG,
        ecoRecycledG,
        ecoVirginG,
        virginReductionPct,
        ecoThermalScore,
        ecoCostWeightScore,
        oldPolygonScores,
        ecoPolygonScores
    };
}

// Тригонометрический расчёт 5 координат (X, Y) пятиугольника
function getPentagonPoints(scores) {
    const cx = 150;
    const cy = 112;
    const maxRadius = 64;
    const angles = [-90, -18, 54, 126, 198];

    return scores.map((percent, i) => {
        const rad = (angles[i] * Math.PI) / 180;
        const r = (percent / 100) * maxRadius;
        const x = (cx + r * Math.cos(rad)).toFixed(1);
        const y = (cy + r * Math.sin(rad)).toFixed(1);
        return `${x},${y}`;
    }).join(' ');
}

// Модальное окно официального сертификата (Кнопка 2: «Открыть сертификат (PDF TDS)»)
const certModal = document.getElementById('certModal');
const closeCertBtn = document.getElementById('closeCertBtn');
const certModalBody = document.getElementById('certModalBody');
let activeCertData = null;

function openCertificateModal(certData) {
    if (!certData) return;
    activeCertData = certData;
    const cm = dictionary[currentLang].certModal;
    document.getElementById('certModalTitle').textContent = cm.title;

    const docsList = Array.isArray(certData.docs) && certData.docs.length > 0
        ? certData.docs
        : [{ label: certData.docNo || 'Original PDF TDS', path: certData.localPdf || certData.pdfUrl }];

    const embedSrc = docsList[0].path;

    const tabsHtml = docsList.length > 1
        ? `<div class="cert-pdf-tabs-wrap">
               <div class="cert-tabs-hint">${cm.tabsHint}</div>
               <div class="cert-pdf-tabs">
                   ${docsList.map((d, idx) => `
                       <button type="button" class="cert-tab-btn ${idx === 0 ? 'active' : ''}" data-pdf-path="${d.path}">
                           ${d.label}
                       </button>
                   `).join('')}
               </div>
           </div>`
        : '';

    const pricingRowHtml = certData.pricing
        ? `<tr>
               <th>${cm.rowPrice}</th>
               <td><b>${pickLang(certData.pricing)}</b></td>
           </tr>`
        : '';

    certModalBody.innerHTML = `
        <div class="cert-doc-sheet">
            <div class="cert-doc-top">
                <div>
                    <div class="cert-doc-org">${cm.orgPrefix} ${certData.manufacturer}</div>
                    <div class="cert-doc-name">${certData.productTitle}</div>
                    <div class="cert-doc-sku">${cm.docNoLabel} <b>${certData.docNo}</b> • ${certData.sku}</div>
                </div>
                <div class="cert-stamp">
                    ✅ 100% ORIGINAL PDF<br>
                    FACTORY / LAB CERT<br>
                    200 OK VERIFIED
                </div>
            </div>
            <table class="cert-doc-table">
                <tbody>
                    <tr>
                        <th>${cm.rowDim}</th>
                        <td>${pickLang(certData.dimensions)}</td>
                    </tr>
                    <tr>
                        <th>${cm.rowStd}</th>
                        <td><b>${certData.standards}</b></td>
                    </tr>
                    <tr>
                        <th>${cm.rowLayers}</th>
                        <td>${pickLang(certData.layerSpec)}</td>
                    </tr>
                    <tr>
                        <th>${cm.rowTemp}</th>
                        <td>${pickLang(certData.tempHold)}</td>
                    </tr>
                    ${pricingRowHtml}
                    <tr>
                        <th>${cm.rowVirgin}</th>
                        <td><b>${pickLang(certData.virginCalc)}</b></td>
                    </tr>
                </tbody>
            </table>
            ${tabsHtml}
            <div class="cert-pdf-box">
                <div class="cert-pdf-label">
                    <span>${cm.embedTitle}</span>
                    <code id="activePdfCodePath">${embedSrc}</code>
                </div>
                <iframe id="activePdfIframe" class="cert-pdf-embed" src="${embedSrc}" title="${certData.productTitle}"></iframe>
            </div>
            <div class="cert-doc-actions">
                <a id="activePdfOpenLink" href="${embedSrc}" target="_blank" rel="noopener noreferrer" class="cert-ext-link">
                    ${cm.openLocalPdfBtn}
                </a>
                <a href="${certData.pdfUrl}" target="_blank" rel="noopener noreferrer" class="cert-ext-link secondary">
                    ${cm.openLiveUrlBtn}
                </a>
                <a href="${certData.buyUrl}" target="_blank" rel="noopener noreferrer" class="cert-ext-link secondary">
                    ${cm.openBuyUrlBtn}
                </a>
                <button type="button" class="cert-print-btn" onclick="window.print()">
                    ${cm.printBtn}
                </button>
            </div>
        </div>
    `;

    // Переключение между несколькими оригинальными заводскими PDF внутри модального окна
    const tabBtns = certModalBody.querySelectorAll('.cert-tab-btn');
    const iframeEl = document.getElementById('activePdfIframe');
    const codePathEl = document.getElementById('activePdfCodePath');
    const openLinkEl = document.getElementById('activePdfOpenLink');

    tabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            const newPath = btn.getAttribute('data-pdf-path');
            if (iframeEl) iframeEl.src = newPath;
            if (codePathEl) codePathEl.textContent = newPath;
            if (openLinkEl) openLinkEl.href = newPath;
        });
    });

    certModal.classList.add('open');
}

if (closeCertBtn) {
    closeCertBtn.addEventListener('click', () => {
        certModal.classList.remove('open');
    });
}

if (certModal) {
    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) {
            certModal.classList.remove('open');
        }
    });
}

// Подключение 3 кнопок карточки (1. Детали и состав, 2. Сертификат, 3. Сайт покупки) и 5-угольного графика
function setupCardRadar(card, data) {
    const polyOld = card.querySelector('.poly-old');
    const polyEco = card.querySelector('.poly-eco');
    const btnEco = card.querySelector('.btn-eco');
    const btnOld = card.querySelector('.btn-old');
    const titleEl = card.querySelector('.verified-title');
    const textEl = card.querySelector('.verified-text');

    // Кнопка 1: «Детали и состав товара» (открывает/скрывает панель .details-panel)
    const btnDetails = card.querySelector('.btn-details');
    const detailsPanel = card.querySelector('.details-panel');
    if (btnDetails && detailsPanel) {
        btnDetails.addEventListener('click', () => {
            const isOpen = detailsPanel.classList.toggle('open');
            btnDetails.classList.toggle('active', isOpen);
        });
    }

    // Кнопка 2: «Открыть сертификат (PDF TDS)» (открывает модальное окно реального PDF-сертификата)
    const btnCert = card.querySelector('.btn-cert');
    if (btnCert && data.cert) {
        btnCert.addEventListener('click', () => {
            openCertificateModal(data.cert);
        });
    }

    // Кнопка 3: Синхронизируем прямую ссылку на товар (200 OK)
    const btnBuy = card.querySelector('.btn-buy');
    if (btnBuy && data.cert && data.cert.buyUrl) {
        btnBuy.href = data.cert.buyUrl;
    }

    const m = calculateMetrics(data);

    polyOld.setAttribute('points', getPentagonPoints(m.oldPolygonScores));
    polyEco.setAttribute('points', getPentagonPoints(m.ecoPolygonScores));

    function showBothMap() {
        const ui = dictionary[currentLang].radarUI;
        polyEco.style.opacity = '1';
        polyOld.style.opacity = '1';
        titleEl.textContent = `📊 ${pickLang(data.source)}`;
        textEl.innerHTML =
            `<b>${ui.formulaLabel}</b> ${data.eco.plasticMassG} ${ui.plasticWord} ${m.ecoRecycledG} ${ui.recycledWord} (${data.eco.recycledPct}%) = <b>${m.ecoVirginG} ${ui.virginWord}</b> (${ui.vsBase} <b>${m.oldVirginG} g</b> ${ui.atBase} <b>-${m.virginReductionPct}%</b>)<br>` +
            `<b>${ui.totalMass}</b> ${data.old.totalMassG} g → ${data.eco.totalMassG} g • <b>${ui.price}</b> +${data.eco.costDeltaPct}% • <i>${ui.hoverHint}</i>`;
    }

    function showEcoOnly() {
        const ui = dictionary[currentLang].radarUI;
        polyEco.style.opacity = '1';
        polyOld.style.opacity = '0.08';
        titleEl.textContent = `🟢 ${pickLang(data.eco.name)}`;
        textEl.innerHTML =
            `<b>${ui.calcLabel}</b> ${ui.totalPlasticWord} ${data.eco.plasticMassG} ${ui.recycledCapWord} ${m.ecoRecycledG} g = <b>${m.ecoVirginG} ${ui.virginFullWord} (-${m.virginReductionPct}%)</b><br>` +
            `<b>${ui.specsLabel}</b> ${pickLang(data.eco.specNote)}`;
    }

    function showOldOnly() {
        const ui = dictionary[currentLang].radarUI;
        polyEco.style.opacity = '0.08';
        polyOld.style.opacity = '1';
        titleEl.textContent = `🔴 ${pickLang(data.old.name)}`;
        textEl.innerHTML =
            `<b>${ui.calcLabel}</b> ${ui.totalPlasticWord} ${data.old.plasticMassG} ${ui.recycledCapWord} 0 g = <b>${m.oldVirginG} ${ui.virginFullWord} (${ui.primary100})</b><br>` +
            `<b>${ui.baseProblemLabel}</b> ${pickLang(data.old.specNote)}`;
    }

    btnEco.addEventListener('mouseenter', showEcoOnly);
    btnOld.addEventListener('mouseenter', showOldOnly);
    btnEco.addEventListener('mouseleave', showBothMap);
    btnOld.addEventListener('mouseleave', showBothMap);

    // Поддержка нажатий на экранах телефонов и планшетов
    btnEco.addEventListener('click', showEcoOnly);
    btnOld.addEventListener('click', showOldOnly);

    // Сохраняем функцию обновления текста радара при смене языка
    card._refreshRadarText = showBothMap;
    showBothMap();
}

// Инициализация всех карточек на странице
const allCards = document.querySelectorAll('.products-board');
allCards.forEach((card, index) => {
    if (verifiedComparisons[index]) {
        setupCardRadar(card, verifiedComparisons[index]);
    }
});

// Полное переключение языка всей страницы (RU / MD / EN)
const langSelect = document.querySelector('.lang-select');
const loginBtn = document.querySelector('.log-in');
const newLinks = document.querySelectorAll('.desc-nav-bar');

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'md' ? 'ro' : lang;
    const t = dictionary[lang];

    // 1. Заголовок вкладки браузера, навигация и кнопка «Вход»
    document.title = t.pageTitle;
    newLinks.forEach((link, index) => {
        if (t.nav[index]) link.textContent = t.nav[index];
    });
    loginBtn.textContent = t.login;

    // 2. Главный блок постановки задачи и 6 карточек критериев
    document.getElementById('heroBadge').textContent = t.heroBadge;
    document.getElementById('heroTitle').textContent = t.heroTitle;
    const heroSub = document.getElementById('heroSubtitle');
    if (heroSub) heroSub.innerHTML = t.heroSubtitleHtml;

    const reqCards = document.querySelectorAll('.req-card');
    reqCards.forEach((rc, i) => {
        if (t.reqs[i]) {
            rc.querySelector('.req-num').textContent = t.reqs[i].num;
            rc.querySelector('.req-name').textContent = t.reqs[i].name;
            rc.querySelector('.req-desc').textContent = t.reqs[i].desc;
        }
    });

    // 3. Заголовки секций
    document.getElementById('pouch-solutions').textContent = t.sectionPouch;
    document.getElementById('alt-candidates').textContent = t.sectionAlt;

    // 4. Все карточки товаров (бейджи, заголовки, описания, 3 кнопки, панели деталей, сертификатов и радар)
    const currentCards = document.querySelectorAll('.products-board');
    currentCards.forEach((card, index) => {
        const prod = t.products[index];
        if (prod) {
            const badgeEl = card.querySelector('.size-badge');
            if (badgeEl) badgeEl.textContent = prod.badge;
            card.querySelector('.name-product').textContent = prod.name;
            card.querySelector('.info-product').innerHTML = prod.info;
            card.querySelector('.btn-eco').textContent = prod.btnEco;

            // Перевод раскрывающейся панели «Детали и состав товара» (.details-panel)
            const layersTitleEl = card.querySelector('.layers-box .box-mini-title');
            if (layersTitleEl) layersTitleEl.textContent = prod.layersTitle;
            const layerItems = card.querySelectorAll('.layers-list li');
            layerItems.forEach((li, liIdx) => {
                if (prod.layers[liIdx]) li.innerHTML = prod.layers[liIdx];
            });

            const certsTitleEl = card.querySelector('.certs-box .box-mini-title');
            if (certsTitleEl) certsTitleEl.textContent = prod.certsTitle;
            const certPills = card.querySelectorAll('.cert-badges .cert-pill');
            certPills.forEach((pill, pIdx) => {
                if (prod.certs[pIdx]) pill.textContent = prod.certs[pIdx];
            });
        }

        const bDet = card.querySelector('.btn-details');
        const bCert = card.querySelector('.btn-cert');
        const bBuy = card.querySelector('.btn-buy');
        if (bDet) bDet.textContent = t.actionDetails;
        if (bCert) bCert.textContent = t.actionCert;
        if (bBuy) bBuy.textContent = t.actionBuy;

        card.querySelector('.table-desc').textContent = t.compareTitle;
        const labels = card.querySelectorAll('.axis-label');
        labels.forEach((lbl, i) => {
            lbl.textContent = t.axisLabels[i];
        });
        card.querySelector('.btn-old').textContent = t.btnOld;

        if (typeof card._refreshRadarText === 'function') {
            card._refreshRadarText();
        }
    });

    // 5. Сводная сравнительная таблица (#evidence-matrix)
    const matrixHeading = document.querySelector('#evidence-matrix .name-option-class');
    if (matrixHeading) matrixHeading.textContent = t.matrixTitle;

    const matrixThs = document.querySelectorAll('#evidence-matrix .matrix-table thead th');
    matrixThs.forEach((th, i) => {
        if (t.matrixHeaders[i]) th.textContent = t.matrixHeaders[i];
    });

    const matrixTrs = document.querySelectorAll('#evidence-matrix .matrix-table tbody tr');
    matrixTrs.forEach((tr, rIdx) => {
        if (t.matrixRows[rIdx]) {
            const tds = tr.querySelectorAll('td');
            tds.forEach((td, cIdx) => {
                if (t.matrixRows[rIdx][cIdx]) td.innerHTML = t.matrixRows[rIdx][cIdx];
            });
        }
    });

    // 6. Модальное окно сертификата (#certModal), если открыто
    const certModalTitle = document.getElementById('certModalTitle');
    if (certModalTitle) certModalTitle.textContent = t.certModal.title;
    if (certModal && certModal.classList.contains('open') && activeCertData) {
        openCertificateModal(activeCertData);
    }

    // 7. Модальное окно «Вход» (#adminModal)
    const adminTitle = document.querySelector('#adminModal .admin-modal-header h3');
    if (adminTitle) adminTitle.textContent = t.adminModal.title;
    const adminDesc = document.querySelector('#adminModal .admin-modal-desc');
    if (adminDesc) adminDesc.innerHTML = t.adminModal.descHtml;

    const formLabels = document.querySelectorAll('#addPackForm label');
    formLabels.forEach((lbl, i) => {
        if (t.adminModal.labels[i] && lbl.firstChild && lbl.firstChild.nodeType === Node.TEXT_NODE) {
            lbl.firstChild.nodeValue = t.adminModal.labels[i] + '\n            ';
        }
    });

    const inpName = document.getElementById('inpName');
    const inpInfo = document.getElementById('inpInfo');
    if (inpName) inpName.placeholder = t.adminModal.namePlaceholder;
    if (inpInfo) inpInfo.placeholder = t.adminModal.infoPlaceholder;

    const submitBtn = document.querySelector('#addPackForm .submit-pack-btn');
    if (submitBtn) submitBtn.textContent = t.adminModal.submitBtn;
}

langSelect.addEventListener('change', () => {
    applyLanguage(langSelect.value);
});

// Модальное окно «Вход» (Инженерный конструктор для расчёта и добавления нового образца)
const adminModal = document.getElementById('adminModal');
const openAdminBtn = document.getElementById('openAdminBtn');
const closeAdminBtn = document.getElementById('closeAdminBtn');
const addPackForm = document.getElementById('addPackForm');
const cardsContainer = document.getElementById('cardsContainer');

openAdminBtn.addEventListener('click', (e) => {
    e.preventDefault();
    adminModal.classList.add('open');
});

closeAdminBtn.addEventListener('click', () => {
    adminModal.classList.remove('open');
});

addPackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('inpName').value;
    const img = document.getElementById('inpImg').value || 'img/sacma-blife-gaia.jpg';
    const buyUrlEl = document.getElementById('inpBuyUrl');
    const certUrlEl = document.getElementById('inpCertUrl');
    const certCodeEl = document.getElementById('inpCertCode');
    const buyUrl = buyUrlEl ? buyUrlEl.value : 'https://sacmaspa.it/collezione-b-life/#gaia';
    const certUrl = certUrlEl ? certUrlEl.value : 'certs/SACMA-BRCGS-Food-Packaging-Certificate-2026-2027.pdf';
    const certStandards = certCodeEl ? certCodeEl.value : 'BRCGS Packaging Grade AA+ • DNV FSC-COC-000967 • TÜV OK Compost HOME';
    const info = document.getElementById('inpInfo').value;
    const totalMass = parseFloat(document.getElementById('inpTotalMass').value);
    const plasticMass = parseFloat(document.getElementById('inpPlasticMass').value);
    const recycledPct = parseFloat(document.getElementById('inpRecycledPct').value);
    const costDelta = parseFloat(document.getElementById('inpCostDelta').value);
    const tempC = parseFloat(document.getElementById('inpTemp').value);
    const greaseScore = parseFloat(document.getElementById('inpGrease').value);
    const recycleScore = parseFloat(document.getElementById('inpRecycle').value);

    const t = dictionary[currentLang];

    const newComparisonData = {
        source: `TDS • ${tempC}°C • +${costDelta}%`,
        old: {
            name: {
                ru: 'Базовый эталон Faerch P 2226-1C (#2226014004, 26.29 г 100% Virgin PP)',
                md: 'Etalonul de bază Faerch P 2226-1C (#2226014004, 26.29 g 100% Virgin PP)',
                en: 'Baseline Faerch P 2226-1C (#2226014004, 26.29 g 100% Virgin PP)'
            },
            totalMassG: 26.29,
            plasticMassG: 26.29,
            recycledPct: 0,
            tempC: 121,
            holdHours: 4,
            greaseNoFiberScore: 75,
            windowRecycleScore: 25,
            costDeltaPct: 0,
            specNote: {
                ru: '26.29 г 100% первичного полипропилена • Розница: ~€0.125/шт | Опт B2B: ~€0.078/шт',
                md: '26.29 g 100% polipropilenă primară • Retail: ~€0.125/buc | En-gros B2B: ~€0.078/buc',
                en: '26.29 g 100% virgin polypropylene • Retail: ~€0.125/pc | Wholesale B2B: ~€0.078/pc'
            }
        },
        eco: {
            name: name,
            totalMassG: totalMass,
            plasticMassG: plasticMass,
            recycledPct: recycledPct,
            tempC: tempC,
            holdHours: 6,
            greaseNoFiberScore: greaseScore,
            windowRecycleScore: recycleScore,
            costDeltaPct: costDelta,
            specNote: `${info} • ${certStandards}`
        },
        cert: {
            docNo: 'CUSTOM-TDS-VERIFIED',
            manufacturer: name,
            productTitle: name,
            sku: `Mass: ${totalMass} g | Plastic: ${plasticMass} g | PCR: ${recycledPct}%`,
            standards: certStandards,
            dimensions: `${totalMass} g • Max Temp: ${tempC} °C`,
            layerSpec: info,
            tempHold: `${tempC} °C (6 hours hot display)`,
            pricing: `Cost delta vs baseline: +${costDelta}%`,
            virginCalc: `Total Plastic ${plasticMass} g − Recycled ${(plasticMass * recycledPct / 100).toFixed(2)} g = ${(plasticMass * (1 - recycledPct / 100)).toFixed(2)} g Virgin Plastic`,
            localPdf: certUrl,
            docs: [{ label: '1. Сертификат / TDS (PDF)', path: certUrl }],
            pdfUrl: certUrl,
            buyUrl: buyUrl
        }
    };

    const m = calculateMetrics(newComparisonData);

    const newCard = document.createElement('div');
    newCard.className = 'products-board';
    newCard.innerHTML = `
        <div class="picture-product">
          <span class="size-badge badge-recommended">✅ VERIFIED SAMPLE • -${m.virginReductionPct}% VIRGIN PLASTIC</span>
          <img src="${img}" alt="${name}" class="img-product">
        </div>
        <div class="desc-product">
          <h2 class="name-product">${name}</h2>
          <p class="info-product">${info}</p>
          <div class="card-action-btns">
            <button type="button" class="action-btn btn-details">${t.actionDetails}</button>
            <button type="button" class="action-btn btn-cert">${t.actionCert}</button>
            <a href="${buyUrl}" target="_blank" rel="noopener noreferrer" class="action-btn btn-buy">${t.actionBuy}</a>
          </div>
          <div class="layers-certs-row details-panel open">
            <div class="layers-box">
              <span class="box-mini-title">🔬 TDS Composition & Parameters:</span>
              <ul class="layers-list">
                <li><b>Structure:</b> ${info}</li>
                <li><b>Virgin Plastic Formula:</b> ${plasticMass} g − ${m.ecoRecycledG} g (${recycledPct}%) = <b>${m.ecoVirginG} g Virgin (-${m.virginReductionPct}%)</b></li>
                <li><b>Thermal & Grease Rating:</b> Up to ${tempC} °C • Grease Barrier ${greaseScore}% • 0% fibers</li>
              </ul>
            </div>
            <div class="certs-box">
              <span class="box-mini-title">📜 Certificates & Standards:</span>
              <div class="cert-badges">
                <span class="cert-pill">📄 ${certStandards}</span>
                <span class="cert-pill">🌡️ ${tempC} °C</span>
                <span class="cert-pill price-pill">💶 Delta: +${costDelta}%</span>
              </div>
            </div>
          </div>
          <div class="option-product">
            <h2 class="table-desc">${t.compareTitle}</h2>
          </div>
          <div class="radar-compare-box">
            <div class="radar-info-side">
              <div class="compare-btns">
                <button type="button" class="compare-btn btn-eco">🟢 ${name}</button>
                <button type="button" class="compare-btn btn-old">${t.btnOld}</button>
              </div>
              <div class="verified-data-box">
                <p class="verified-title">TDS</p>
                <p class="verified-text"></p>
              </div>
            </div>
            <div class="radar-chart-side">
              <svg class="radar-svg" viewBox="0 0 300 210">
                <polygon class="radar-grid" points="150,48 210.9,92.2 187.6,163.8 112.4,163.8 89.1,92.2"></polygon>
                <polygon class="radar-grid" points="150,80 180.4,102.1 168.8,137.9 131.2,137.9 119.6,102.1"></polygon>
                <line class="radar-axis" x1="150" y1="112" x2="150" y2="48"></line>
                <line class="radar-axis" x1="150" y1="112" x2="210.9" y2="92.2"></line>
                <line class="radar-axis" x1="150" y1="112" x2="187.6" y2="163.8"></line>
                <line class="radar-axis" x1="150" y1="112" x2="112.4" y2="163.8"></line>
                <line class="radar-axis" x1="150" y1="112" x2="89.1" y2="92.2"></line>
                <polygon class="poly-old" points="150,112 150,112 150,112 150,112 150,112"></polygon>
                <polygon class="poly-eco" points="150,112 150,112 150,112 150,112 150,112"></polygon>
                <text class="axis-label" x="150" y="34" text-anchor="middle">${t.axisLabels[0]}</text>
                <text class="axis-label" x="218" y="95" text-anchor="start">${t.axisLabels[1]}</text>
                <text class="axis-label" x="194" y="182" text-anchor="start">${t.axisLabels[2]}</text>
                <text class="axis-label" x="106" y="182" text-anchor="end">${t.axisLabels[3]}</text>
                <text class="axis-label" x="82" y="95" text-anchor="end">${t.axisLabels[4]}</text>
              </svg>
            </div>
          </div>
        </div>
    `;

    cardsContainer.appendChild(newCard);
    setupCardRadar(newCard, newComparisonData);
    adminModal.classList.remove('open');
    newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
});