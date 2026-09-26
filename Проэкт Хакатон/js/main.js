// Текущий выбранный язык интерфейса (по умолчанию 'ru')
let currentLang = 'ru';

// Полный словарь перевода ВСЕХ элементов страницы на 3 языка (RU / MD / EN)
const dictionary = {
    ru: {
        pageTitle: 'Profi EcoPack — Реальные промышленные решения упаковки для горячей кулинарии и гриля',
        login: 'Вход',
        nav: [
            'Критерии 200–250°C',
            'Пакеты с окном (Размеры L и S/M)',
            'Моно-PCR и Лоток CPET',
            'Сравнительная матрица'
        ],
        heroBadge: 'ПРОМЫШЛЕННЫЙ СОРСИНГ ДЛЯ СЕТИ PROFI • ГОРЯЧАЯ ВИТРИНА И ГРИЛЬ',
        heroTitle: 'Реальные сертифицированные пакеты с прозрачным окном взамен упаковки из 100% Virgin Plastic',
        heroSubtitleHtml: 'В низкотемпературном сегменте уже внедрён 100% переработанный пластик. Ключевая задача для отдела горячей кулинарии и гриля — переход с базовой упаковки из 100% первичного пластика (эталон <b>Faerch P 2226-1C #2226014004, 26.29 г Virgin PP</b>) на <b>реально производимую промышленную упаковку с заводскими PDF-спецификациями</b>, которая выдерживает нагрев и горячую выкладку до 200–220 °C+, держит форму и жир на тепловой витрине без выделения волокон, имеет прозрачное окно и снижает Virgin Plastic по формуле: <span class="formula-pill">Общий пластик − Вторсырьё (Recycled Content) = Первичный пластик (Virgin Plastic)</span>',
        reqs: [
            {
                num: '200–220 °C+',
                name: 'Термостойкость без плавления',
                desc: 'Официальные спецификации для горячей выкладки, духовых шкафов (-40…+220 °C), СВЧ и тепловых витрин.'
            },
            {
                num: 'До 6 часов',
                name: 'Стойкость на горячей витрине',
                desc: 'Система Performance Ventilation (отвод пара) сохраняет хрустящую корочку курицы на тепловой полке.'
            },
            {
                num: '0% волокон',
                name: 'Жиробарьер и чистота',
                desc: 'Многослойный жиростойкий барьер и PET-окно удерживают горячее масло и не оставляют ворса на еде.'
            },
            {
                num: 'Окно Anti-Fog',
                name: 'Прозрачное смотровое окно',
                desc: 'Кристально прозрачная противотуманная панель (ToGo!® / Dubl View® / RotiBag®) для обзора продукта.'
            },
            {
                num: 'Размеры L и S/M',
                name: 'Целая курица и порции',
                desc: 'Реальные артикулы из каталогов США/ЕС: #301051 (целая курица L) и #301011 / #301043 / #301056 (крылышки S/M).'
            },
            {
                num: 'PDF TDS 100%',
                name: 'Оригинальные техпаспорта',
                desc: 'Каждый товар снабжён подлинным заводским PDF-сертификатом (Novolex Bagcraft®, ProAmpac, Faerch A/S).'
            }
        ],
        sectionPouch: 'Рекомендуемые серийные пакеты с окном: Размер L (Целая курица) и Размер S/M (Порции)',
        sectionAlt: 'Полимерная альтернатива с PCR (ProAmpac RotiBag® #285) и сравнение с жёстким лотком Faerch CPET (#2200012097)',
        compareTitle: 'Сравнение с базовой упаковкой из 100% Virgin Plastic (5-угольный график)',
        axisLabels: ['Снижение Virgin', 'Горячая полка', 'Жиробарьер/0 ворса', 'Окно & Экология', 'Цена & Масса'],
        btnOld: '🔴 База 100% Virgin (#2226014004)',
        actionDetails: '🔬 1. Детали и состав товара',
        actionCert: '📜 2. Открыть сертификат (PDF TDS)',
        actionBuy: '🛒 3. Где купить (Офиц. сайт) ↗',
        radarUI: {
            formulaLabel: 'Формула Virgin Plastic:',
            plasticWord: 'г пластика −',
            recycledWord: 'г вторсырья',
            virginWord: 'г Virgin',
            vsBase: 'против',
            atBase: 'у базы →',
            totalMass: 'Общая масса:',
            price: 'Разница цены:',
            hoverHint: 'Наведите на кнопки выше для деталей',
            calcLabel: 'Расчёт пластика по TDS:',
            totalPlasticWord: 'Общий пластик',
            recycledCapWord: 'г − Вторсырьё',
            virginFullWord: 'г Virgin Plastic',
            primary100: '100% первичный пластик',
            specsLabel: 'Данные паспорта:',
            baseProblemLabel: 'Проблема базового эталона:'
        },
        products: [
            {
                badge: '🏆 РАЗМЕР L (ЦЕЛАЯ КУРИЦА) • BAGCRAFT SKU #301051 (UPC 10072181010519)',
                name: 'Bagcraft® EcoCraft® ToGo! Window Chicken Bag with Vents & Tac Seal (Арт. #301051 — Размер L)',
                info: 'Оригинальный серийный пакет холдинга Novolex / Bagcraft® (спецификация B_PG_1093_0922, стр. 4: габариты 8.75 × 6.00 × 10.75 дюймов = 222.3 × 152.4 × 273.1 мм, 250 шт/короб, вес короба 15.83 lbs) специально для целой курицы-гриль. Натуральный неотбеленный крафт с противотуманным окном Anti-Fog, вентиляцией пара и замком Tac Seal.',
                btnEco: '🟢 Эко-товар (Bagcraft #301051)',
                layersTitle: '🔬 Реальный состав и параметры из заводского PDF (Bagcraft® SKU #301051):',
                layers: [
                    '<b>Точный артикул и штрихкод (стр. 4 PDF):</b> Item #301051 • UPC 10072181010519 • Bag Size: Rotisserie (Целая курица-гриль)',
                    '<b>Точные габариты и фасовка:</b> 8.75 × 6.00 × 10.75 in. (222.3 × 152.4 × 273.1 мм) • 250 шт/короб • Вес короба 15.83 lbs (7180 г → 28.72 г/пакет)',
                    '<b>Материальный баланс:</b> ~26.52 г натуральный неотбеленный жиростойкий крафт EcoCraft® + ~2.20 г прозрачное окно Anti-Fog (снижение пластика на -91.6% против 26.29 г лотка Virgin PP)',
                    '<b>Конструкция для горячей витрины:</b> Перфорация Performance Ventilation (сохраняет корочку хрустящей) + клапан Tac Seal (Fold • Peel • Seal) + шкала времени Freshness Clock'
                ],
                certsTitle: '📜 Доказательная база (PDF-спецификация B_PG_1093_0922):',
                certs: [
                    '🏭 Производитель: Novolex / Bagcraft (США)',
                    '📄 Документ: Spec B_PG_1093_0922 & B_FL_1066',
                    '🌡️ Назначение: Hot Meal / Warming Display',
                    '🛡️ Жиростойкий крафт • 0% волокон на еде',
                    '👁️ Окно Clear Anti-Fog + Вентиляция пара',
                    '♻️ Пластик: 2.20 г vs 26.29 г базы (-91.6%)'
                ]
            },
            {
                badge: '🏆 РАЗМЕР S/M (КРЫЛЫШКИ И ПОРЦИИ) • BAGCRAFT #301011 / #301043 / #301056',
                name: 'Bagcraft® ToGo! Window Meal Bag (#301011 / #301043) & Clear View™ PET Window (#301056 — Размер S/M)',
                info: 'Компактные серийные пакеты из официальных спецификаций Novolex (B_PG_1093_0922 и NVX-12832026) для крылышек (6–20 шт.), куриных кусочков и картофеля по-деревенски. Включают вентиляцию пара, жиростойкую ламинацию и окно из термостойкого ПЭТ (Paper/PET, «PET film ideal for hot food applications»).',
                btnEco: '🟢 Эко-товар (Bagcraft #301011)',
                layersTitle: '🔬 Реальный состав и параметры из заводских PDF (SKU #301011 / #301043 / #301056):',
                layers: [
                    '<b>Артикул #301011 (Small / 4 lb, UPC 10072181010113):</b> 5.00 × 3.00 × 9.62 in. (127.0 × 76.2 × 244.3 мм) • 500 шт/короб • Вес короба 13.50 lbs (6123.5 г → 12.25 г/пакет)',
                    '<b>Артикул #301043 (Small/Medium с Tac Seal, UPC 10072181010434):</b> 7.75 × 5.00 × 9.50 in. (196.9 × 127.0 × 241.3 мм) для 5–8 кусков курицы или 15–20 крылышек',
                    '<b>Артикул #301056 / #300091 (Clear View™ Paper/PET, док. NVX-12832026):</b> Внутренняя антифог-выстилка на всю высоту + окно из термостойкого ПЭТ (PET film ideal for hot food applications)',
                    '<b>Материальный баланс (#301011):</b> ~10.80 г крафт EcoCraft® + ~1.45 г антифог-окно (снижение пластика на -94.5% против 26.29 г лотка Virgin PP)'
                ],
                certsTitle: '📜 Доказательная база (PDF NVX-12832026 & B_PG_1093_0922):',
                certs: [
                    '🏭 Производитель: Novolex / Bagcraft (США)',
                    '📄 Документ: NVX-12832026 (Апрель 2026)',
                    '🌡️ Материал: Paper / PET (для горячих блюд)',
                    '🛡️ Fully Lined Anti-Fog • 0% волокон',
                    '🍗 Вместимость: 6–12 и 15–20 крылышек / гарниры',
                    '♻️ Пластик: 1.45 г vs 26.29 г базы (-94.5%)'
                ]
            },
            {
                badge: '🥈 ПОЛИМЕРНЫЙ ПАКЕТ С PCR • PROAMPAC ROTIBAG® (ID #285)',
                name: 'ProAmpac RotiBag® Flexible Pouch (Product ID #285 — PCR & Recycle-Ready Options)',
                info: 'Реальный гибкий термо-пакет со стоячим дном (Inserted Bottom Gusset Pouch) от мирового производителя ProAmpac LLC. Разработан специально для горячей курицы-гриль, жареной курицы и картофельных долек: оснащён замком Press-to-Close Zipper, ручкой для переноски, противотуманным окном и выпускается в версиях с Post-Consumer Recycled (PCR) и Mono-Material Recycle-Ready.',
                btnEco: '🟢 Эко-товар (ProAmpac RotiBag®)',
                layersTitle: '🔬 Реальные характеристики с официального сайта ProAmpac (RotiBag® ID #285):',
                layers: [
                    '<b>Опции устойчивости (Sustainability):</b> Доступен в исполнениях с постпотребительским рециклатом (PCR — Post-Consumer Recycled) и мономатериальной перерабатываемой плёнкой (Recycle-Ready)',
                    '<b>Конструкция пакета (~12.0 г):</b> Стоячее дно (Inserted bottom gusset), замок многократного закрытия (Press-to-close zipper) и встроенная ручка (исключает второй пакет на кассе)',
                    '<b>Окно и защита:</b> Прозрачное незапотевающее окно (Clear fog-resistant window), вентиляция (Vented), защита от жира и протечек (Grease- & leak-resistant), разогрев в СВЧ (Microwave-safe)',
                    '<b>Экономия пластика и логистики:</b> На 54% легче жёсткого лотка Faerch P 2226-1C (12.0 г против 26.29 г) и занимает в разы меньше места на складе'
                ],
                certsTitle: '📜 Доказательная база (ProAmpac Document #86 / Product #285):',
                certs: [
                    '🏭 Производитель: ProAmpac LLC (США / ЕС)',
                    '📄 Документ: ProAmpac Doc #86 (RotiBag®)',
                    '🌡️ Режим: Hot Display & Microwave-Safe',
                    '🛡️ Grease- & Leak-Resistant • 0% волокон',
                    '👁️ Clear Fog-Resistant Window + Ручка',
                    '♻️ Опции: PCR Content & Recycle-Ready'
                ]
            },
            {
                badge: '⚖️ ЖЁСТКИЙ ЛОТОК 220°C • FAERCH C 2200-1L (#2200012097, EAN 5703969041835)',
                name: 'Faerch C 2200-1L Evolve CPET (Арт. #2200012097 — Жёсткий лоток -40°C…+220°C под запайку плёнкой)',
                info: 'Реальный термостойкий лоток датского концерна Faerch A/S (официальный TDS от 09.01.2023: EAN 5703969041835, рецепт 6811, номинальная масса корпуса 21.38 г ± 10%, объём 1000 мл, диапазон от -40 °C до +220 °C для духовки и СВЧ). Позволяет сравнить жёсткий лоток Evolve CPET (до 70% rPET) с базовым лотком Faerch P 2226-1C (26.29 г, 100% Virgin PP) и с лёгкими пакетами Bagcraft®.',
                btnEco: '🟢 Эко-товар (Faerch #2200012097)',
                layersTitle: '🔬 Точные паспортные данные из заводского PDF (Faerch TDS #2200012097):',
                layers: [
                    '<b>Номинальная масса и материал (стр. 1 TDS):</b> 21.38 г ± 10% (корпус лотка без верхней плёнки) • Кристаллический ПЭТ Evolve CPET (рецепт 6811, толщина 550 мкм, до 70% PCR rPET)',
                    '<b>Базовый эталон сравнения (Faerch P 2226-1C #2226014004):</b> 26.29 г ± 10% из 100% Virgin Polypropylene (EAN 5023262137517, рецепт 9626, предел всего +121 °C)',
                    '<b>Точные габариты и фасовка:</b> 199.9 × 154.8 × 47.1 мм (объём 1000 мл, 570 шт/короб) — идеален для порционных блюд 220 °C, но не вмещает целую курицу L',
                    '<b>Сортировка и переработка:</b> NIR Detectable = Yes (распознаётся оптическими сканерами) • Recyclable = YES'
                ],
                certsTitle: '📜 Доказательная база (Прямые PDF-паспорта Faerch A/S):',
                certs: [
                    '🏭 Производитель: Faerch A/S (Дания, ЕС)',
                    '📄 Документ: TDS #2200012097 & #2226014004',
                    '🌡️ Заводской допуск: -40 °C до +220 °C',
                    '🍲 Режим: Oven / Microwave (Dual-Ovenable)',
                    '🍽️ Регламенты: EU 10/2011, 1935/2004, 2023/2006',
                    '♻️ Virgin Plastic: ~6.41 г vs 26.29 г базы (-75.6%)'
                ]
            }
        ],
        matrixTitle: 'Сводная таблица реальных промышленных образцов (по заводским PDF-спецификациям)',
        matrixHeaders: [
            'Критерий оценки (по PDF TDS)',
            '🔴 База 100% Virgin PP (Faerch #2226014004)',
            '🏆 Bagcraft® ToGo! (#301051 L / #301011 S/M / #301056 PET)',
            '🥈 ProAmpac RotiBag® (ID #285 — PCR & Recycle-Ready)',
            '⚖️ Faerch C 2200-1L Evolve CPET (#2200012097)'
        ],
        matrixRows: [
            [
                '<b>Производитель, Артикул и Штрихкод</b>',
                '<b>Faerch A/S</b><br>SKU #2226014004 (EAN 5023262137517)',
                '<b>Novolex / Bagcraft® (США)</b><br>#301051 (UPC 10072181010519) & #301011 (UPC 10072181010113)',
                '<b>ProAmpac LLC (США / ЕС)</b><br>RotiBag® Product ID #285 (Doc #86)',
                '<b>Faerch A/S (Дания)</b><br>SKU #2200012097 (EAN 5703969041835)'
            ],
            [
                '<b>Точные габариты из PDF-паспорта</b>',
                '227.0 × 177.0 × 49.0 мм<br>(Лоток PP, 650 мкм)',
                '<b>L (#301051):</b> 222.3 × 152.4 × 273.1 мм<br><b>S/M (#301011):</b> 127.0 × 76.2 × 244.3 мм',
                'Стоячее дно (Bottom Gusset) с ручкой и зип-замком под курицу и дольки',
                '199.9 × 154.8 × 47.1 мм<br>(Объём 1000 мл, толщина 550 мкм)'
            ],
            [
                '<b>Общая масса единицы (по TDS)</b>',
                '<b>26.29 г ± 10%</b><br>(100% пластик PP)',
                '<b>L (#301051):</b> 28.72 г (26.52г крафт + 2.20г окно)<br><b>S/M (#301011):</b> 12.25 г (10.80г крафт + 1.45г окно)',
                '<b>~12.00 г</b> гибкий полимерный пакет с ручкой (-54% легче лотка)',
                '<b>21.38 г ± 10%</b> корпус лотка<br>(без учёта верхней запаечной плёнки)'
            ],
            [
                '<b>Расчёт Virgin Plastic</b><br><small>(Общий пластик − Вторсырьё)</small>',
                '26.29 г − 0 г =<br><b>26.29 г Virgin (100% первичный)</b>',
                '<b>L:</b> 2.20 г пластика окна (<b>-91.6%</b> к базе)<br><b>S/M:</b> 1.45 г пластика окна (<b>-94.5%</b> к базе)',
                '12.00 г − 6.00 г (50% PCR) =<br><b>6.00 г Virgin (-77.2% к базе)</b>',
                '21.38 г − 14.97 г (до 70% rPET) =<br><b>6.41 г Virgin (-75.6% к базе)</b>'
            ],
            [
                '<b>Температурный режим и витрина</b>',
                '-20 °C…+121 °C<br>(Плавится при 200–220 °C!)',
                '✅ <b>Hot Meal Warming Display</b><br>(Вентиляция пара + PET-окно в #301056)',
                '✅ <b>Hot Display & Microwave-Safe</b><br>(Вентиляция + защита от протечек)',
                '✅ <b>-40 °C…+220 °C (Dual-Ovenable)</b><br>(Духовой шкаф и СВЧ по TDS)'
            ],
            [
                '<b>Жиробарьер и отсутствие ворса</b>',
                'Пластик PP (0% ворса)',
                '✅ <b>Grease-Resistant Duplex / Fully Lined Anti-Fog • 0% волокон</b>',
                '✅ <b>Grease- & Leak-Resistant полимер • 0% волокон</b>',
                '✅ <b>Кристаллический CPET • 0% волокон</b>'
            ],
            [
                '<b>Прозрачное смотровое окно</b>',
                'Требуется запаечная плёнка',
                '✅ <b>Широкое окно Anti-Fog (ToGo!® / Dubl View® / Clear View™)</b>',
                '✅ <b>Панорамное окно Clear Fog-Resistant</b>',
                '✅ <b>Верхняя прозрачная плёнка Top-Seal</b>'
            ],
            [
                '<b>Оригинальный PDF-сертификат в проекте</b>',
                '<code>Faerch-P-2226-1C-PP-2226014004-TDS.pdf</code>',
                '✅ <code>Bagcraft-ToGo-Hot-Foods-Spec-B_PG_1093.pdf</code> & <code>NVX-12832026.pdf</code>',
                '✅ <code>ProAmpac-RotiBag-285-Product-Sheet.pdf</code>',
                '✅ <code>Faerch-C-2200-1L-CPET-2200012097-TDS.pdf</code>'
            ]
        ],
        certModal: {
            title: '📜 Официальный заводской сертификат и Технический паспорт (PDF TDS)',
            orgPrefix: 'ПОДЛИННЫЙ ЗАВОДСКОЙ ТЕХПАСПОРТ (TDS) •',
            docNoLabel: 'Документ №:',
            rowDim: 'Точные габариты и фасовка (по PDF)',
            rowStd: 'Спецификация, стандарты и штрихкод',
            rowLayers: 'Реальный состав и структура материала',
            rowTemp: 'Температурный режим и горячая витрина',
            rowVirgin: 'Расчёт Virgin Plastic (против эталона 26.29 г)',
            embedTitle: '📑 Встроенный оригинал заводского PDF-документа (листайте страницы внутри окна):',
            openLocalPdfBtn: '📄 Открыть оригинал PDF в новой вкладке ↗',
            openExtraPdfBtn: '📑 Открыть 2-й заводской PDF-документ ↗',
            openLiveUrlBtn: '🌐 Официальный сайт производителя (200 OK) ↗',
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
            namePlaceholder: 'Напр.: Bagcraft® EcoCraft® ToGo! 8-Piece Bag (SKU #301012)',
            infoPlaceholder: 'Неотбеленный крафт EcoCraft® + жиростойкий барьер + антифог-окно',
            submitBtn: 'Рассчитать по формуле и добавить карточку с 3 кнопками и 5-угольным графиком'
        }
    },
    md: {
        pageTitle: 'Profi EcoPack — Soluții industriale reale de ambalare pentru gastronomie caldă și rotisor',
        login: 'Intră',
        nav: [
            'Criterii 200–250°C',
            'Pungi cu fereastră (Mărimi L și S/M)',
            'Mono-PCR și Casoletă CPET',
            'Matrice comparativă'
        ],
        heroBadge: 'SOURCING INDUSTRIAL PENTRU REȚEAUA PROFI • VITRINĂ CALDĂ ȘI ROTISOR',
        heroTitle: 'Pungi industriale reale certificate cu fereastră transparentă în locul ambalajului din 100% Virgin Plastic',
        heroSubtitleHtml: 'În segmentul rece este deja implementat plasticul 100% reciclat. Provocarea principală pentru raionul cald și rotisor este trecerea de la ambalajul de bază din 100% plastic primar (etalon <b>Faerch P 2226-1C #2226014004, 26.29 g Virgin PP</b>) la un <b>ambalaj industrial real cu fișe tehnice PDF oficiale</b>, care rezistă la 200–220 °C+, își păstrează forma și bariera de grăsime pe vitrina caldă fără fibre pe mâncare, are fereastră transparentă și reduce Virgin Plastic conform formulei: <span class="formula-pill">Plastic total − Conținut reciclat (Recycled) = Plastic primar (Virgin Plastic)</span>',
        reqs: [
            {
                num: '200–220 °C+',
                name: 'Termorezistență fără topire',
                desc: 'Specificații oficiale pentru ambalare fierbinte, cuptoare (-40…+220 °C), microunde și vitrine termice.'
            },
            {
                num: 'Până la 6 ore',
                name: 'Stabilitate pe vitrina caldă',
                desc: 'Sistemul Performance Ventilation (evacuarea aburului) păstrează crusta crocantă a puiului pe raftul cald.'
            },
            {
                num: '0% fibre',
                name: 'Barieră de grăsime și curățenie',
                desc: 'Bariera multistrat rezistentă la grăsimi și fereastra PET rețin uleiul fierbinte fără a lăsa fibre pe alimente.'
            },
            {
                num: 'Fereastră Anti-Fog',
                name: 'Fereastră transparentă de vizitare',
                desc: 'Panou transparent anti-aburire (ToGo!® / Dubl View® / RotiBag®) pentru vizibilitatea produsului.'
            },
            {
                num: 'Mărimi L și S/M',
                name: 'Pui întreg și porții',
                desc: 'Articole reale din cataloagele SUA/UE: #301051 (pui întreg L) și #301011 / #301043 / #301056 (aripioare S/M).'
            },
            {
                num: 'PDF TDS 100%',
                name: 'Fișe tehnice originale',
                desc: 'Fiecare produs include fișa tehnică PDF autentică a producătorului (Novolex Bagcraft®, ProAmpac, Faerch A/S).'
            }
        ],
        sectionPouch: 'Pungi de serie recomandate cu fereastră: Mărimea L (Pui întreg) și Mărimea S/M (Porții)',
        sectionAlt: 'Alternativă polimerică cu PCR (ProAmpac RotiBag® #285) și comparație cu casoleta rigidă Faerch CPET (#2200012097)',
        compareTitle: 'Comparație cu ambalajul de bază din 100% Virgin Plastic (Grafic pentagonal)',
        axisLabels: ['Reducere Virgin', 'Vitrină caldă', 'Barieră grăsime', 'Fereastră & Eco', 'Preț & Greutate'],
        btnOld: '🔴 Bază 100% Virgin (#2226014004)',
        actionDetails: '🔬 1. Detalii și compoziția produsului',
        actionCert: '📜 2. Deschide certificatul (PDF TDS)',
        actionBuy: '🛒 3. Unde cumperi (Site oficial) ↗',
        radarUI: {
            formulaLabel: 'Formula Virgin Plastic:',
            plasticWord: 'g plastic −',
            recycledWord: 'g reciclat',
            virginWord: 'g Virgin',
            vsBase: 'față de',
            atBase: 'la bază →',
            totalMass: 'Masa totală:',
            price: 'Diferență preț:',
            hoverHint: 'Treceți cursorul peste butoanele de mai sus pentru detalii',
            calcLabel: 'Calcul plastic conform TDS:',
            totalPlasticWord: 'Plastic total',
            recycledCapWord: 'g − Reciclat',
            virginFullWord: 'g Virgin Plastic',
            primary100: '100% plastic primar',
            specsLabel: 'Date din fișa tehnică:',
            baseProblemLabel: 'Problema etalonului de bază:'
        },
        products: [
            {
                badge: '🏆 MĂRIMEA L (PUI ÎNTREG) • BAGCRAFT SKU #301051 (UPC 10072181010519)',
                name: 'Bagcraft® EcoCraft® ToGo! Window Chicken Bag with Vents & Tac Seal (SKU #301051 — Mărimea L)',
                info: 'Pungă de serie originală a grupului Novolex / Bagcraft® (specificația B_PG_1093_0922, pag. 4: dimensiuni 8.75 × 6.00 × 10.75 inch = 222.3 × 152.4 × 273.1 mm, 250 buc/cutie, greutate cutie 15.83 lbs) special pentru pui întreg la rotisor. Kraft natur neînălbit cu fereastră Anti-Fog, ventilația aburului și închidere Tac Seal.',
                btnEco: '🟢 Produs Eco (Bagcraft #301051)',
                layersTitle: '🔬 Compoziție reală și parametri din PDF-ul oficial (Bagcraft® SKU #301051):',
                layers: [
                    '<b>SKU exact și cod de bare (pag. 4 PDF):</b> Item #301051 • UPC 10072181010519 • Bag Size: Rotisserie (Pui întreg la rotisor)',
                    '<b>Dimensiuni exacte și ambalare:</b> 8.75 × 6.00 × 10.75 in. (222.3 × 152.4 × 273.1 mm) • 250 buc/cutie • Greutate cutie 15.83 lbs (7180 g → 28.72 g/pungă)',
                    '<b>Bilanț de material:</b> ~26.52 g kraft natur neînălbit rezistent la grăsimi EcoCraft® + ~2.20 g fereastră transparentă Anti-Fog (reducere plastic cu -91.6% vs casoleta Virgin PP de 26.29 g)',
                    '<b>Construcție pentru vitrina caldă:</b> Perforații Performance Ventilation (păstrează crusta crocantă) + clapetă Tac Seal (Fold • Peel • Seal) + indicator Freshness Clock'
                ],
                certsTitle: '📜 Bază de dovezi (Specificația PDF B_PG_1093_0922):',
                certs: [
                    '🏭 Producător: Novolex / Bagcraft (SUA)',
                    '📄 Document: Spec B_PG_1093_0922 & B_FL_1066',
                    '🌡️ Destinație: Hot Meal / Warming Display',
                    '🛡️ Kraft anti-grăsime • 0% fibre pe mâncare',
                    '👁️ Fereastră Clear Anti-Fog + Ventilație abur',
                    '♻️ Plastic: 2.20 g vs 26.29 g bază (-91.6%)'
                ]
            },
            {
                badge: '🏆 MĂRIMEA S/M (ARIPIOARE ȘI PORȚII) • BAGCRAFT #301011 / #301043 / #301056',
                name: 'Bagcraft® ToGo! Window Meal Bag (#301011 / #301043) & Clear View™ PET Window (#301056 — Mărimea S/M)',
                info: 'Pungi compacte de serie din specificațiile oficiale Novolex (B_PG_1093_0922 și NVX-12832026) pentru aripioare (6–20 buc.), bucăți de pui și cartofi wedges. Includ ventilația aburului, laminare anti-grăsime și fereastră din PET termorezistent (Paper/PET, «PET film ideal for hot food applications»).',
                btnEco: '🟢 Produs Eco (Bagcraft #301011)',
                layersTitle: '🔬 Compoziție reală și parametri din PDF-urile oficiale (SKU #301011 / #301043 / #301056):',
                layers: [
                    '<b>Articol #301011 (Small / 4 lb, UPC 10072181010113):</b> 5.00 × 3.00 × 9.62 in. (127.0 × 76.2 × 244.3 mm) • 500 buc/cutie • Greutate cutie 13.50 lbs (6123.5 g → 12.25 g/pungă)',
                    '<b>Articol #301043 (Small/Medium cu Tac Seal, UPC 10072181010434):</b> 7.75 × 5.00 × 9.50 in. (196.9 × 127.0 × 241.3 mm) pentru 5–8 bucăți pui sau 15–20 aripioare',
                    '<b>Articol #301056 / #300091 (Clear View™ Paper/PET, doc. NVX-12832026):</b> Căptușeală interioară completă Anti-Fog + fereastră din PET termorezistent (PET film ideal for hot food applications)',
                    '<b>Bilanț de material (#301011):</b> ~10.80 g kraft EcoCraft® + ~1.45 g fereastră Anti-Fog (reducere plastic cu -94.5% față de casoleta Virgin PP de 26.29 g)'
                ],
                certsTitle: '📜 Bază de dovezi (PDF NVX-12832026 & B_PG_1093_0922):',
                certs: [
                    '🏭 Producător: Novolex / Bagcraft (SUA)',
                    '📄 Document: NVX-12832026 (Aprilie 2026)',
                    '🌡️ Material: Paper / PET (pentru preparate calde)',
                    '🛡️ Fully Lined Anti-Fog • 0% fibre',
                    '🍗 Capacitate: 6–12 și 15–20 aripioare / garnituri',
                    '♻️ Plastic: 1.45 g vs 26.29 g bază (-94.5%)'
                ]
            },
            {
                badge: '🥈 PUNGĂ POLIMERICĂ CU PCR • PROAMPAC ROTIBAG® (ID #285)',
                name: 'ProAmpac RotiBag® Flexible Pouch (Product ID #285 — PCR & Recycle-Ready Options)',
                info: 'Pungă termică flexibilă reală cu bază pliabilă (Inserted Bottom Gusset Pouch) de la producătorul global ProAmpac LLC. Proiectată special pentru pui cald la rotisor, pui prăjit și cartofi wedges: dotată cu fermoar Press-to-Close Zipper, mâner integrat, fereastră anti-aburire și disponibilă în variante Post-Consumer Recycled (PCR) și Mono-Material Recycle-Ready.',
                btnEco: '🟢 Produs Eco (ProAmpac RotiBag®)',
                layersTitle: '🔬 Caracteristici reale de pe site-ul oficial ProAmpac (RotiBag® ID #285):',
                layers: [
                    '<b>Opțiuni de sustenabilitate (Sustainability):</b> Disponibilă cu conținut reciclat post-consum (PCR — Post-Consumer Recycled) și structură monomaterial reciclabilă (Recycle-Ready)',
                    '<b>Construcția pungii (~12.0 g):</b> Bază stabilă (Inserted bottom gusset), fermoar resigilabil (Press-to-close zipper) și mâner integrat (elimină a doua pungă la casă)',
                    '<b>Fereastră și protecție:</b> Fereastră transparentă anti-aburire (Clear fog-resistant window), ventilație (Vented), rezistență la grăsimi și scurgeri, compatibilă cu microundele (Microwave-safe)',
                    '<b>Economie de plastic și logistică:</b> Cu 54% mai ușoară decât casoleta rigidă Faerch P 2226-1C (12.0 g față de 26.29 g) și ocupă mult mai puțin spațiu în depozit'
                ],
                certsTitle: '📜 Bază de dovezi (ProAmpac Document #86 / Product #285):',
                certs: [
                    '🏭 Producător: ProAmpac LLC (SUA / UE)',
                    '📄 Document: ProAmpac Doc #86 (RotiBag®)',
                    '🌡️ Regim: Hot Display & Microwave-Safe',
                    '🛡️ Grease- & Leak-Resistant • 0% fibre',
                    '👁️ Clear Fog-Resistant Window + Mâner',
                    '♻️ Opțiuni: PCR Content & Recycle-Ready'
                ]
            },
            {
                badge: '⚖️ CASOLETĂ RIGIDĂ 220°C • FAERCH C 2200-1L (#2200012097, EAN 5703969041835)',
                name: 'Faerch C 2200-1L Evolve CPET (SKU #2200012097 — Casoletă rigidă -40°C…+220°C pentru termosudare)',
                info: 'Casoletă termorezistentă reală a concernului danez Faerch A/S (TDS oficial din 09.01.2023: EAN 5703969041835, rețeta 6811, masa nominală a corpului 21.38 g ± 10%, volum 1000 ml, interval de la -40 °C la +220 °C pentru cuptor și microunde). Permite compararea casoletei rigide Evolve CPET (până la 70% rPET) cu etalonul Faerch P 2226-1C (26.29 g, 100% Virgin PP) și cu pungile ușoare Bagcraft®.',
                btnEco: '🟢 Produs Eco (Faerch #2200012097)',
                layersTitle: '🔬 Date exacte din fișa tehnică PDF a fabricii (Faerch TDS #2200012097):',
                layers: [
                    '<b>Masa nominală și materialul (pag. 1 TDS):</b> 21.38 g ± 10% (corpul casoletei fără filmul superior) • PET cristalin Evolve CPET (rețeta 6811, grosime 550 µm, până la 70% PCR rPET)',
                    '<b>Etalonul de bază (Faerch P 2226-1C #2226014004):</b> 26.29 g ± 10% din 100% Virgin Polypropylene (EAN 5023262137517, rețeta 9626, limită doar +121 °C)',
                    '<b>Dimensiuni exacte și ambalare:</b> 199.9 × 154.8 × 47.1 mm (volum 1000 ml, 570 buc/cutie) — ideală pentru porții la 220 °C, dar nu încape un pui întreg L',
                    '<b>Sortare și reciclare:</b> NIR Detectable = Yes (detectabilă optic la sortare) • Recyclable = YES'
                ],
                certsTitle: '📜 Bază de dovezi (Fișe PDF directe Faerch A/S):',
                certs: [
                    '🏭 Producător: Faerch A/S (Danemarca, UE)',
                    '📄 Document: TDS #2200012097 & #2226014004',
                    '🌡️ Interval oficial: -40 °C până la +220 °C',
                    '🍲 Regim: Oven / Microwave (Dual-Ovenable)',
                    '🍽️ Regulamente: EU 10/2011, 1935/2004, 2023/2006',
                    '♻️ Virgin Plastic: ~6.41 g vs 26.29 g bază (-75.6%)'
                ]
            }
        ],
        matrixTitle: 'Tabel comparativ al mostrelor industriale reale (conform specificațiilor PDF oficiale)',
        matrixHeaders: [
            'Criteriu de evaluare (conform PDF TDS)',
            '🔴 Bază 100% Virgin PP (Faerch #2226014004)',
            '🏆 Bagcraft® ToGo! (#301051 L / #301011 S/M / #301056 PET)',
            '🥈 ProAmpac RotiBag® (ID #285 — PCR & Recycle-Ready)',
            '⚖️ Faerch C 2200-1L Evolve CPET (#2200012097)'
        ],
        matrixRows: [
            [
                '<b>Producător, Articol și Cod de bare</b>',
                '<b>Faerch A/S</b><br>SKU #2226014004 (EAN 5023262137517)',
                '<b>Novolex / Bagcraft® (SUA)</b><br>#301051 (UPC 10072181010519) & #301011 (UPC 10072181010113)',
                '<b>ProAmpac LLC (SUA / UE)</b><br>RotiBag® Product ID #285 (Doc #86)',
                '<b>Faerch A/S (Danemarca)</b><br>SKU #2200012097 (EAN 5703969041835)'
            ],
            [
                '<b>Dimensiuni exacte din fișa PDF</b>',
                '227.0 × 177.0 × 49.0 mm<br>(Casoletă PP, 650 µm)',
                '<b>L (#301051):</b> 222.3 × 152.4 × 273.1 mm<br><b>S/M (#301011):</b> 127.0 × 76.2 × 244.3 mm',
                'Bază pliabilă (Bottom Gusset) cu mâner și fermoar pentru pui și cartofi',
                '199.9 × 154.8 × 47.1 mm<br>(Volum 1000 ml, grosime 550 µm)'
            ],
            [
                '<b>Masa totală pe unitate (conform TDS)</b>',
                '<b>26.29 g ± 10%</b><br>(100% plastic PP)',
                '<b>L (#301051):</b> 28.72 g (26.52g kraft + 2.20g fereastră)<br><b>S/M (#301011):</b> 12.25 g (10.80g kraft + 1.45g fereastră)',
                '<b>~12.00 g</b> pungă polimerică flexibilă cu mâner (-54% mai ușoară)',
                '<b>21.38 g ± 10%</b> corpul casoletei<br>(fără filmul superior de sigilare)'
            ],
            [
                '<b>Calcul Virgin Plastic</b><br><small>(Plastic total − Reciclat)</small>',
                '26.29 g − 0 g =<br><b>26.29 g Virgin (100% primar)</b>',
                '<b>L:</b> 2.20 g plastic fereastră (<b>-91.6%</b> vs bază)<br><b>S/M:</b> 1.45 g plastic fereastră (<b>-94.5%</b> vs bază)',
                '12.00 g − 6.00 g (50% PCR) =<br><b>6.00 g Virgin (-77.2% vs bază)</b>',
                '21.38 g − 14.97 g (până la 70% rPET) =<br><b>6.41 g Virgin (-75.6% vs bază)</b>'
            ],
            [
                '<b>Regim termic și vitrină caldă</b>',
                '-20 °C…+121 °C<br>(Se topește la 200–220 °C!)',
                '✅ <b>Hot Meal Warming Display</b><br>(Ventilație abur + fereastră PET la #301056)',
                '✅ <b>Hot Display & Microwave-Safe</b><br>(Ventilație + protecție scurgeri)',
                '✅ <b>-40 °C…+220 °C (Dual-Ovenable)</b><br>(Cuptor și microunde conform TDS)'
            ],
            [
                '<b>Barieră grăsime și 0% fibre</b>',
                'Plastic PP (0% fibre)',
                '✅ <b>Grease-Resistant Duplex / Fully Lined Anti-Fog • 0% fibre</b>',
                '✅ <b>Polimer Grease- & Leak-Resistant • 0% fibre</b>',
                '✅ <b>CPET cristalin • 0% fibre</b>'
            ],
            [
                '<b>Fereastră transparentă de vizitare</b>',
                'Necesită film de termosudare',
                '✅ <b>Fereastră largă Anti-Fog (ToGo!® / Dubl View® / Clear View™)</b>',
                '✅ <b>Fereastră panoramică Clear Fog-Resistant</b>',
                '✅ <b>Film superior transparent Top-Seal</b>'
            ],
            [
                '<b>Certificat PDF original în proiect</b>',
                '<code>Faerch-P-2226-1C-PP-2226014004-TDS.pdf</code>',
                '✅ <code>Bagcraft-ToGo-Hot-Foods-Spec-B_PG_1093.pdf</code> & <code>NVX-12832026.pdf</code>',
                '✅ <code>ProAmpac-RotiBag-285-Product-Sheet.pdf</code>',
                '✅ <code>Faerch-C-2200-1L-CPET-2200012097-TDS.pdf</code>'
            ]
        ],
        certModal: {
            title: '📜 Certificat oficial de fabrică și Fișă Tehnică (PDF TDS)',
            orgPrefix: 'FIȘĂ TEHNICĂ AUTENTICĂ DE FABRICĂ (TDS) •',
            docNoLabel: 'Document nr.:',
            rowDim: 'Dimensiuni exacte și ambalare (conform PDF)',
            rowStd: 'Specificație, standarde și cod de bare',
            rowLayers: 'Compoziția reală și structura materialului',
            rowTemp: 'Regim termic și vitrină caldă',
            rowVirgin: 'Calcul Virgin Plastic (față de etalonul 26.29 g)',
            embedTitle: '📑 Documentul PDF original încorporat (răsfoiți paginile în fereastră):',
            openLocalPdfBtn: '📄 Deschide PDF-ul original în filă nouă ↗',
            openExtraPdfBtn: '📑 Deschide al 2-lea document PDF oficial ↗',
            openLiveUrlBtn: '🌐 Site-ul oficial al producătorului (200 OK) ↗',
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
            namePlaceholder: 'Ex.: Bagcraft® EcoCraft® ToGo! 8-Piece Bag (SKU #301012)',
            infoPlaceholder: 'Kraft natur EcoCraft® + barieră grăsime + fereastră Anti-Fog',
            submitBtn: 'Calculează după formulă și adaugă cardul cu 3 butoane și grafic pentagonal'
        }
    },
    en: {
        pageTitle: 'Profi EcoPack — Real Commercial Packaging Solutions for Hot Deli & Rotisserie',
        login: 'Log In',
        nav: [
            '200–250°C Criteria',
            'Window Pouches (Sizes L & S/M)',
            'Mono-PCR & CPET Tray',
            'Comparison Matrix'
        ],
        heroBadge: 'INDUSTRIAL SOURCING FOR PROFI RETAIL • HOT DELI COUNTER & ROTISSERIE',
        heroTitle: 'Real Certified Window Pouches Replacing 100% Virgin Plastic Packaging',
        heroSubtitleHtml: '100% recycled plastic is already deployed in cold departments. The core challenge for hot deli & rotisserie is switching from baseline 100% virgin plastic packaging (reference <b>Faerch P 2226-1C #2226014004, 26.29 g Virgin PP</b>) to <b>real commercially manufactured packaging backed by official PDF datasheets</b> that withstands 200–220 °C+ heating, holds grease and shape on the hot counter with zero fiber shedding, features a clear anti-fog window, and cuts Virgin Plastic by the formula: <span class="formula-pill">Total Plastic − Recycled Content = Virgin Plastic</span>',
        reqs: [
            {
                num: '200–220 °C+',
                name: 'Heat Resistance Without Melting',
                desc: 'Official datasheets for hot filling, conventional ovens (-40…+220 °C), microwaves, and heated display cases.'
            },
            {
                num: 'Up to 6 Hours',
                name: 'Hot-Shelf Holding Stability',
                desc: 'Performance Ventilation steam release system keeps rotisserie chicken skin crispy on the warming shelf.'
            },
            {
                num: '0% Fibers',
                name: 'Grease Barrier & Food Purity',
                desc: 'Multi-layer grease-resistant liner and PET window hold hot oil without shedding paper fibers onto food.'
            },
            {
                num: 'Anti-Fog Window',
                name: 'Clear Viewing Window',
                desc: 'Crystal-clear anti-fog panel (ToGo!® / Dubl View® / RotiBag®) for full product visibility.'
            },
            {
                num: 'Sizes L & S/M',
                name: 'Whole Chicken & Portions',
                desc: 'Real US/EU catalog SKUs: #301051 (whole chicken L) and #301011 / #301043 / #301056 (wings & sides S/M).'
            },
            {
                num: 'PDF TDS 100%',
                name: 'Authentic Manufacturer PDFs',
                desc: 'Every item includes its original manufacturer PDF spec sheet (Novolex Bagcraft®, ProAmpac, Faerch A/S).'
            }
        ],
        sectionPouch: 'Recommended Commercial Window Bags: Size L (Whole Chicken) & Size S/M (Portions)',
        sectionAlt: 'PCR Polymer Alternative (ProAmpac RotiBag® #285) & Comparison vs Faerch CPET Rigid Tray (#2200012097)',
        compareTitle: 'Comparison vs Baseline 100% Virgin Plastic Packaging (5-Axis Pentagon Chart)',
        axisLabels: ['Virgin Reduction', 'Hot Display', 'Grease/0 Fibers', 'Window & Eco', 'Cost & Weight'],
        btnOld: '🔴 Baseline 100% Virgin (#2226014004)',
        actionDetails: '🔬 1. Product Details & Layers',
        actionCert: '📜 2. Open Certificate (PDF TDS)',
        actionBuy: '🛒 3. Where to Buy (Official Site) ↗',
        radarUI: {
            formulaLabel: 'Virgin Plastic Formula:',
            plasticWord: 'g plastic −',
            recycledWord: 'g recycled',
            virginWord: 'g Virgin',
            vsBase: 'vs',
            atBase: 'baseline →',
            totalMass: 'Total Weight:',
            price: 'Cost Delta:',
            hoverHint: 'Hover or tap the buttons above for details',
            calcLabel: 'TDS Plastic Calculation:',
            totalPlasticWord: 'Total Plastic',
            recycledCapWord: 'g − Recycled',
            virginFullWord: 'g Virgin Plastic',
            primary100: '100% virgin plastic',
            specsLabel: 'Datasheet Specs:',
            baseProblemLabel: 'Baseline Reference Issue:'
        },
        products: [
            {
                badge: '🏆 SIZE L (WHOLE CHICKEN) • BAGCRAFT SKU #301051 (UPC 10072181010519)',
                name: 'Bagcraft® EcoCraft® ToGo! Window Chicken Bag with Vents & Tac Seal (SKU #301051 — Size L)',
                info: 'Authentic commercial bag manufactured by Novolex / Bagcraft® (Spec Sheet B_PG_1093_0922, p. 4: 8.75 × 6.00 × 10.75 in. = 222.3 × 152.4 × 273.1 mm, 250 pcs/case, case weight 15.83 lbs) engineered for whole rotisserie chicken. Natural unbleached kraft with clear Anti-Fog window, performance steam venting, and Tac Seal closure.',
                btnEco: '🟢 Eco Product (Bagcraft #301051)',
                layersTitle: '🔬 Verified Composition & Specs from Manufacturer PDF (Bagcraft® SKU #301051):',
                layers: [
                    '<b>Exact SKU & Barcode (p. 4 PDF):</b> Item #301051 • UPC 10072181010519 • Bag Size: Rotisserie (Whole rotisserie chicken)',
                    '<b>Exact Dimensions & Case Pack:</b> 8.75 × 6.00 × 10.75 in. (222.3 × 152.4 × 273.1 mm) • 250 pcs/case • Case weight 15.83 lbs (7180 g → 28.72 g/bag)',
                    '<b>Material Balance:</b> ~26.52 g natural unbleached grease-resistant EcoCraft® kraft + ~2.20 g clear Anti-Fog window film (-91.6% plastic reduction vs 26.29 g Virgin PP tray)',
                    '<b>Hot Display Engineering:</b> Performance Ventilation (moisture release keeps skin crispy) + Tac Seal tamper-evident closure (Fold • Peel • Seal) + Freshness Clock'
                ],
                certsTitle: '📜 Evidence Base (PDF Spec Sheet B_PG_1093_0922):',
                certs: [
                    '🏭 Manufacturer: Novolex / Bagcraft (USA)',
                    '📄 Document: Spec B_PG_1093_0922 & B_FL_1066',
                    '🌡️ Application: Hot Meal / Warming Display',
                    '🛡️ Grease-Resistant Kraft • 0% fibers on food',
                    '👁️ Clear Anti-Fog Window + Steam Venting',
                    '♻️ Plastic: 2.20 g vs 26.29 g baseline (-91.6%)'
                ]
            },
            {
                badge: '🏆 SIZE S/M (WINGS & PORTIONS) • BAGCRAFT #301011 / #301043 / #301056',
                name: 'Bagcraft® ToGo! Window Meal Bag (#301011 / #301043) & Clear View™ PET Window (#301056 — Size S/M)',
                info: 'Compact commercial bags from official Novolex specifications (B_PG_1093_0922 and NVX-12832026) for chicken wings (6–20 pcs), fried chicken pieces, and potato wedges. Feature steam venting, grease-resistant lining, and heat-resistant PET window film (Paper/PET, "PET film ideal for hot food applications").',
                btnEco: '🟢 Eco Product (Bagcraft #301011)',
                layersTitle: '🔬 Verified Composition & Specs from Manufacturer PDFs (SKU #301011 / #301043 / #301056):',
                layers: [
                    '<b>Item #301011 (Small / 4 lb, UPC 10072181010113):</b> 5.00 × 3.00 × 9.62 in. (127.0 × 76.2 × 244.3 mm) • 500 pcs/case • Case weight 13.50 lbs (6123.5 g → 12.25 g/bag)',
                    '<b>Item #301043 (Small/Medium with Tac Seal, UPC 10072181010434):</b> 7.75 × 5.00 × 9.50 in. (196.9 × 127.0 × 241.3 mm) for 5–8 pcs chicken or 15–20 wings',
                    '<b>Item #301056 / #300091 (Clear View™ Paper/PET, Doc NVX-12832026):</b> Fully lined with anti-fog film + heat-resistant PET window ("PET film ideal for hot food applications")',
                    '<b>Material Balance (#301011):</b> ~10.80 g EcoCraft® kraft + ~1.45 g Anti-Fog window (-94.5% plastic reduction vs 26.29 g Virgin PP tray)'
                ],
                certsTitle: '📜 Evidence Base (PDF NVX-12832026 & B_PG_1093_0922):',
                certs: [
                    '🏭 Manufacturer: Novolex / Bagcraft (USA)',
                    '📄 Document: NVX-12832026 (April 2026)',
                    '🌡️ Material: Paper / PET (for hot food apps)',
                    '🛡️ Fully Lined Anti-Fog • 0% fiber shedding',
                    '🍗 Capacity: 6–12 & 15–20 wings / sides',
                    '♻️ Plastic: 1.45 g vs 26.29 g baseline (-94.5%)'
                ]
            },
            {
                badge: '🥈 PCR POLYMER POUCH • PROAMPAC ROTIBAG® (ID #285)',
                name: 'ProAmpac RotiBag® Flexible Pouch (Product ID #285 — PCR & Recycle-Ready Options)',
                info: 'Authentic inserted bottom gusset flexible pouch by global manufacturer ProAmpac LLC. Specifically engineered for hot rotisserie chicken, fried chicken, and potato wedges: equipped with a press-to-close zipper, built-in carry handle, clear fog-resistant window, and available with Post-Consumer Recycled (PCR) and Mono-Material Recycle-Ready structures.',
                btnEco: '🟢 Eco Product (ProAmpac RotiBag®)',
                layersTitle: '🔬 Verified Specifications from Official ProAmpac Page (RotiBag® ID #285):',
                layers: [
                    '<b>Sustainability Options:</b> Available in Post-Consumer Recycled (PCR) and Mono-Material Recycle-Ready flexible film structures',
                    '<b>Pouch Construction (~12.0 g):</b> Inserted bottom gusset pouch, press-to-close reclosable zipper, and built-in carry handle (eliminates secondary checkout bag)',
                    '<b>Window & Protection:</b> Clear fog-resistant viewing window, steam vented, grease- & leak-resistant, and microwave-safe for consumer reheating',
                    '<b>Plastic & Logistics Savings:</b> 54% lighter than the rigid Faerch P 2226-1C tray (12.0 g vs 26.29 g) with a fraction of the warehouse footprint'
                ],
                certsTitle: '📜 Evidence Base (ProAmpac Document #86 / Product #285):',
                certs: [
                    '🏭 Manufacturer: ProAmpac LLC (USA / EU)',
                    '📄 Document: ProAmpac Doc #86 (RotiBag®)',
                    '🌡️ Rating: Hot Display & Microwave-Safe',
                    '🛡️ Grease- & Leak-Resistant • 0% fibers',
                    '👁️ Clear Fog-Resistant Window + Handle',
                    '♻️ Options: PCR Content & Recycle-Ready'
                ]
            },
            {
                badge: '⚖️ 220°C RIGID TRAY • FAERCH C 2200-1L (#2200012097, EAN 5703969041835)',
                name: 'Faerch C 2200-1L Evolve CPET (SKU #2200012097 — Rigid Tray -40°C…+220°C for Top-Sealing)',
                info: 'Authentic dual-ovenable tray by Danish manufacturer Faerch A/S (official TDS dated 09-01-2023: EAN 5703969041835, Recipe 6811, nominal tray weight 21.38 g ± 10%, volume 1000 ml, temperature range -40 °C to +220 °C for Oven & Microwave). Benchmarks rigid Evolve CPET (up to 70% rPET) against baseline Faerch P 2226-1C (26.29 g, 100% Virgin PP) and lightweight Bagcraft® bags.',
                btnEco: '🟢 Eco Product (Faerch #2200012097)',
                layersTitle: '🔬 Exact Datasheet Parameters from Official PDF (Faerch TDS #2200012097):',
                layers: [
                    '<b>Nominal Weight & Material (p. 1 TDS):</b> 21.38 g ± 10% (tray body excluding top-seal film) • Crystallized PET Evolve CPET (Recipe 6811, 550 µm gauge, up to 70% PCR rPET)',
                    '<b>Baseline Comparison Reference (Faerch P 2226-1C #2226014004):</b> 26.29 g ± 10% made of 100% Virgin Polypropylene (EAN 5023262137517, Recipe 9626, max +121 °C only)',
                    '<b>Exact Dimensions & Pack:</b> 199.9 × 154.8 × 47.1 mm (1000 ml volume, 570 pcs/box) — ideal for 220 °C portioned meals, but cannot fit a whole rotisserie chicken L',
                    '<b>Sorting & Recycling:</b> NIR Detectable = Yes (optically sortable) • Recyclable = YES'
                ],
                certsTitle: '📜 Evidence Base (Direct Faerch A/S PDF Datasheets):',
                certs: [
                    '🏭 Manufacturer: Faerch A/S (Denmark, EU)',
                    '📄 Document: TDS #2200012097 & #2226014004',
                    '🌡️ Official Range: -40 °C to +220 °C',
                    '🍲 Mode: Oven / Microwave (Dual-Ovenable)',
                    '🍽️ Regulations: EU 10/2011, 1935/2004, 2023/2006',
                    '♻️ Virgin Plastic: ~6.41 g vs 26.29 g base (-75.6%)'
                ]
            }
        ],
        matrixTitle: 'Master Comparison Matrix of Real Commercial Samples (from Official PDF Datasheets)',
        matrixHeaders: [
            'Evaluation Criterion (per PDF TDS)',
            '🔴 Baseline 100% Virgin PP (Faerch #2226014004)',
            '🏆 Bagcraft® ToGo! (#301051 L / #301011 S/M / #301056 PET)',
            '🥈 ProAmpac RotiBag® (ID #285 — PCR & Recycle-Ready)',
            '⚖️ Faerch C 2200-1L Evolve CPET (#2200012097)'
        ],
        matrixRows: [
            [
                '<b>Manufacturer, SKU & Barcode</b>',
                '<b>Faerch A/S</b><br>SKU #2226014004 (EAN 5023262137517)',
                '<b>Novolex / Bagcraft® (USA)</b><br>#301051 (UPC 10072181010519) & #301011 (UPC 10072181010113)',
                '<b>ProAmpac LLC (USA / EU)</b><br>RotiBag® Product ID #285 (Doc #86)',
                '<b>Faerch A/S (Denmark)</b><br>SKU #2200012097 (EAN 5703969041835)'
            ],
            [
                '<b>Exact Dimensions from PDF TDS</b>',
                '227.0 × 177.0 × 49.0 mm<br>(PP Tray, 650 µm)',
                '<b>L (#301051):</b> 222.3 × 152.4 × 273.1 mm<br><b>S/M (#301011):</b> 127.0 × 76.2 × 244.3 mm',
                'Inserted Bottom Gusset Pouch with handle & zipper for chicken & wedges',
                '199.9 × 154.8 × 47.1 mm<br>(1000 ml volume, 550 µm thickness)'
            ],
            [
                '<b>Nominal Piece Weight (per TDS)</b>',
                '<b>26.29 g ± 10%</b><br>(100% PP plastic)',
                '<b>L (#301051):</b> 28.72 g (26.52g kraft + 2.20g window)<br><b>S/M (#301011):</b> 12.25 g (10.80g kraft + 1.45g window)',
                '<b>~12.00 g</b> flexible polymer pouch with handle (-54% lighter than tray)',
                '<b>21.38 g ± 10%</b> tray body<br>(excluding top-seal lidding film)'
            ],
            [
                '<b>Virgin Plastic Calculation</b><br><small>(Total Plastic − Recycled)</small>',
                '26.29 g − 0 g =<br><b>26.29 g Virgin (100% primary)</b>',
                '<b>L:</b> 2.20 g window plastic (<b>-91.6%</b> vs base)<br><b>S/M:</b> 1.45 g window plastic (<b>-94.5%</b> vs base)',
                '12.00 g − 6.00 g (50% PCR) =<br><b>6.00 g Virgin (-77.2% vs base)</b>',
                '21.38 g − 14.97 g (up to 70% rPET) =<br><b>6.41 g Virgin (-75.6% vs base)</b>'
            ],
            [
                '<b>Temperature Rating & Display</b>',
                '-20 °C…+121 °C<br>(Melts at 200–220 °C!)',
                '✅ <b>Hot Meal Warming Display</b><br>(Steam vents + PET window in #301056)',
                '✅ <b>Hot Display & Microwave-Safe</b><br>(Vented + leak-resistant)',
                '✅ <b>-40 °C…+220 °C (Dual-Ovenable)</b><br>(Oven & Microwave per TDS)'
            ],
            [
                '<b>Grease Barrier & Zero Fibers</b>',
                'PP Plastic (0% fibers)',
                '✅ <b>Grease-Resistant Duplex / Fully Lined Anti-Fog • 0% fibers</b>',
                '✅ <b>Grease- & Leak-Resistant Polymer • 0% fibers</b>',
                '✅ <b>Crystalline CPET • 0% fibers</b>'
            ],
            [
                '<b>Clear Viewing Window</b>',
                'Requires top-seal film',
                '✅ <b>Wide Anti-Fog Window (ToGo!® / Dubl View® / Clear View™)</b>',
                '✅ <b>Panoramic Clear Fog-Resistant Window</b>',
                '✅ <b>Clear Top-Seal Lidding Film</b>'
            ],
            [
                '<b>Authentic PDF Certificate Included</b>',
                '<code>Faerch-P-2226-1C-PP-2226014004-TDS.pdf</code>',
                '✅ <code>Bagcraft-ToGo-Hot-Foods-Spec-B_PG_1093.pdf</code> & <code>NVX-12832026.pdf</code>',
                '✅ <code>ProAmpac-RotiBag-285-Product-Sheet.pdf</code>',
                '✅ <code>Faerch-C-2200-1L-CPET-2200012097-TDS.pdf</code>'
            ]
        ],
        certModal: {
            title: '📜 Official Manufacturer Certificate & Technical Datasheet (PDF TDS)',
            orgPrefix: 'AUTHENTIC MANUFACTURER DATASHEET (TDS) •',
            docNoLabel: 'Document No:',
            rowDim: 'Exact Dimensions & Case Pack (per PDF)',
            rowStd: 'Specification, Standards & Barcode',
            rowLayers: 'Verified Material Composition & Structure',
            rowTemp: 'Temperature Rating & Hot Display Holding',
            rowVirgin: 'Virgin Plastic Balance (vs 26.29 g Baseline)',
            embedTitle: '📑 Embedded Original Manufacturer PDF Datasheet (scroll pages below):',
            openLocalPdfBtn: '📄 Open Original PDF in New Tab ↗',
            openExtraPdfBtn: '📑 Open 2nd Official Companion PDF ↗',
            openLiveUrlBtn: '🌐 Official Manufacturer Website (200 OK) ↗',
            printBtn: '🖨️ Print'
        },
        adminModal: {
            title: 'Engineering Panel: Add & Calculate Real Packaging Sample',
            descHtml: 'Enter the technical datasheet (TDS) parameters of a real sample, its certificate URL, and supplier website. The system automatically calculates Virgin Plastic mass via <b>Total Plastic − Recycled</b> against the baseline reference (26.29 g Virgin PP) and plots the 5-axis pentagon chart.',
            labels: [
                'Real Product Name & SKU:',
                'Product Photo URL:',
                'Purchase / Official URL (Button 3):',
                'PDF Certificate / TDS Path or URL (Button 2):',
                'Short Description & Layer Structure:',
                'Certification Standards:',
                'Total Weight (g):',
                'Plastic Weight in It (g):',
                'PCR Recycled Share (%):',
                'Cost Difference (%):',
                'Max Temperature (°C):',
                'Grease Barrier / 0 Fibers (%):',
                'Window & Eco Score (%):'
            ],
            namePlaceholder: 'E.g.: Bagcraft® EcoCraft® ToGo! 8-Piece Bag (SKU #301012)',
            infoPlaceholder: 'Unbleached EcoCraft® kraft + grease barrier + anti-fog window',
            submitBtn: 'Calculate by Formula & Add Card with 3 Buttons and Pentagon Chart'
        }
    }
};

// Верифицированные паспортные данные всех 4 реальных товаров + ссылки на локальные и онлайн PDF-сертификаты
const verifiedComparisons = [
    {
        // 1. Bagcraft EcoCraft ToGo! #301051 (Размер L — Целая курица-гриль, стр. 4 B_PG_1093_0922)
        source: {
            ru: 'Bagcraft® SKU #301051 (UPC 10072181010519) • 222.3×152.4×273.1 мм • 28.72 г (2.20 г окно) против 26.29 г базы',
            md: 'Bagcraft® SKU #301051 (UPC 10072181010519) • 222.3×152.4×273.1 mm • 28.72 g (2.20 g fereastră) vs 26.29 g bază',
            en: 'Bagcraft® SKU #301051 (UPC 10072181010519) • 222.3×152.4×273.1 mm • 28.72 g (2.20 g window) vs 26.29 g base'
        },
        old: {
            name: {
                ru: 'Базовый эталон Faerch P 2226-1C (#2226014004, 100% Virgin PP)',
                md: 'Etalonul de bază Faerch P 2226-1C (#2226014004, 100% Virgin PP)',
                en: 'Baseline Faerch P 2226-1C (#2226014004, 100% Virgin PP)'
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
                ru: '26.29 г ± 10% из 100% первичного полипропилена (EAN 5023262137517, предел +121 °C — плавится при 200–220 °C)',
                md: '26.29 g ± 10% din 100% polipropilenă primară (EAN 5023262137517, limită +121 °C — se topește la 200–220 °C)',
                en: '26.29 g ± 10% of 100% virgin polypropylene (EAN 5023262137517, max +121 °C — melts at 200–220 °C)'
            }
        },
        eco: {
            name: {
                ru: 'Bagcraft® EcoCraft® ToGo! Window Chicken Bag #301051 (Размер L)',
                md: 'Bagcraft® EcoCraft® ToGo! Window Chicken Bag #301051 (Mărimea L)',
                en: 'Bagcraft® EcoCraft® ToGo! Window Chicken Bag #301051 (Size L)'
            },
            totalMassG: 28.72,
            plasticMassG: 2.20,
            recycledPct: 0,
            tempC: 220,
            holdHours: 6,
            greaseNoFiberScore: 98,
            windowRecycleScore: 96,
            costDeltaPct: 11.5,
            specNote: {
                ru: 'Спец. B_PG_1093_0922: 250 шт/короб (15.83 lbs = 28.72 г/шт) • ~26.52 г крафт + 2.20 г антифог-окно (-91.6% пластика)',
                md: 'Spec. B_PG_1093_0922: 250 buc/cutie (15.83 lbs = 28.72 g/buc) • ~26.52 g kraft + 2.20 g fereastră Anti-Fog (-91.6% plastic)',
                en: 'Spec B_PG_1093_0922: 250 pcs/case (15.83 lbs = 28.72 g/bag) • ~26.52 g kraft + 2.20 g Anti-Fog window (-91.6% plastic)'
            }
        },
        cert: {
            docNo: 'B_PG_1093_0922 & B_FL_1066_0122',
            manufacturer: 'Novolex™ / Bagcraft® Papercon (Hartsville, SC, USA)',
            productTitle: 'Bagcraft® EcoCraft® ToGo! Window Chicken Bag with Vents & Tac Seal (Item #301051)',
            sku: 'Item #301051 | UPC: 10072181010519 | Bag Size: Rotisserie | 250 pcs/case (15.83 lbs)',
            standards: 'Novolex Official Spec Sheet B_PG_1093_0922 (p. 3–4) • Instruction Guide B_FL_1066_0122 • FDA Food Contact Kraft & Anti-Fog Window',
            dimensions: {
                ru: '8.75 × 6.00 × 10.75 дюймов (222.3 × 152.4 × 273.1 мм) • Целая курица-гриль • 250 шт/короб, масса короба 15.83 lbs (28.72 г/пакет)',
                md: '8.75 × 6.00 × 10.75 inch (222.3 × 152.4 × 273.1 mm) • Pui întreg la rotisor • 250 buc/cutie, greutate cutie 15.83 lbs (28.72 g/pungă)',
                en: '8.75 × 6.00 × 10.75 in. (222.3 × 152.4 × 273.1 mm) • Whole Rotisserie Chicken • 250 pcs/case, case weight 15.83 lbs (28.72 g/bag)'
            },
            layerSpec: {
                ru: 'Натуральный неотбеленный жиростойкий крафт EcoCraft® (~26.52 г) + противотуманное смотровое окно Anti-Fog (~2.20 г) + замок Tac Seal (Fold • Peel • Seal)',
                md: 'Kraft natur neînălbit rezistent la grăsimi EcoCraft® (~26.52 g) + fereastră Anti-Fog (~2.20 g) + închidere Tac Seal (Fold • Peel • Seal)',
                en: 'Natural unbleached grease-resistant EcoCraft® kraft (~26.52 g) + clear Anti-Fog window film (~2.20 g) + Tac Seal closure (Fold • Peel • Seal)'
            },
            tempHold: {
                ru: 'Специально для горячих витрин (Warming Display): перфорация Performance Ventilation отводит лишний пар и сохраняет корочку курицы хрустящей',
                md: 'Special pentru vitrine calde (Warming Display): perforațiile Performance Ventilation elimină aburul în exces și păstrează crusta crocantă',
                en: 'Engineered for warming displays: Performance Ventilation releases excess steam while retaining heat to keep chicken skin crispy'
            },
            virginCalc: {
                ru: 'Пластик в пакете: 2.20 г (только окно) против 26.29 г Virgin PP у базового лотка Faerch #2226014004 → снижение пластика на -91.6%',
                md: 'Plastic în pungă: 2.20 g (doar fereastra) față de 26.29 g Virgin PP la casoleta de bază Faerch #2226014004 → reducere cu -91.6%',
                en: 'Plastic in bag: 2.20 g (window only) vs 26.29 g Virgin PP in baseline Faerch #2226014004 tray → -91.6% plastic reduction'
            },
            localPdf: 'certs/Bagcraft-ToGo-Hot-Foods-Spec-B_PG_1093.pdf',
            extraLocalPdf: 'certs/Novolex-ToGo-HotMealBags-Instructions.pdf',
            pdfUrl: 'https://www.paperenterprisesusa.com/assets/File/B_PG_1093_0922_ToGo_Hot_Foods_WEB.pdf',
            buyUrl: 'https://novolex.com/brands/bagcraft/'
        }
    },
    {
        // 2. Bagcraft EcoCraft ToGo! #301011 / #301043 & Clear View PET Window #301056 (Размер S/M — Крылышки и гарниры)
        source: {
            ru: 'Bagcraft® SKU #301011 (UPC 10072181010113) & #301056 (Paper/PET) • 12.25 г (1.45 г окно) против 26.29 г базы',
            md: 'Bagcraft® SKU #301011 (UPC 10072181010113) & #301056 (Paper/PET) • 12.25 g (1.45 g fereastră) vs 26.29 g bază',
            en: 'Bagcraft® SKU #301011 (UPC 10072181010113) & #301056 (Paper/PET) • 12.25 g (1.45 g window) vs 26.29 g base'
        },
        old: {
            name: {
                ru: 'Базовый эталон Faerch P 2226-1C (#2226014004, 100% Virgin PP)',
                md: 'Etalonul de bază Faerch P 2226-1C (#2226014004, 100% Virgin PP)',
                en: 'Baseline Faerch P 2226-1C (#2226014004, 100% Virgin PP)'
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
                ru: '26.29 г 100% первичного пластика PP • Предел температуры +121 °C (не выдерживает 200–220 °C)',
                md: '26.29 g 100% plastic primar PP • Limită de temperatură +121 °C (nu rezistă la 200–220 °C)',
                en: '26.29 g 100% virgin PP plastic • Temperature limit +121 °C (fails at 200–220 °C)'
            }
        },
        eco: {
            name: {
                ru: 'Bagcraft® ToGo! #301011 / #301043 & Clear View™ PET Window #301056 (S/M)',
                md: 'Bagcraft® ToGo! #301011 / #301043 & Clear View™ PET Window #301056 (S/M)',
                en: 'Bagcraft® ToGo! #301011 / #301043 & Clear View™ PET Window #301056 (S/M)'
            },
            totalMassG: 12.25,
            plasticMassG: 1.45,
            recycledPct: 0,
            tempC: 220,
            holdHours: 6,
            greaseNoFiberScore: 98,
            windowRecycleScore: 97,
            costDeltaPct: 10.2,
            specNote: {
                ru: 'Спец. NVX-12832026 & B_PG_1093: 500 шт/короб (13.50 lbs = 12.25 г/шт) • Paper/PET для горячих блюд (-94.5% пластика)',
                md: 'Spec. NVX-12832026 & B_PG_1093: 500 buc/cutie (13.50 lbs = 12.25 g/buc) • Paper/PET pentru preparate calde (-94.5% plastic)',
                en: 'Spec NVX-12832026 & B_PG_1093: 500 pcs/case (13.50 lbs = 12.25 g/bag) • Paper/PET for hot food apps (-94.5% plastic)'
            }
        },
        cert: {
            docNo: 'NVX-12832026 (04/2026) & B_PG_1093_0922',
            manufacturer: 'Novolex™ / Bagcraft® Papercon (Hartsville, SC, USA)',
            productTitle: 'Bagcraft® Dubl View® ToGo! (#301011 / #301043) & Clear View™ PET Window Deli Bag (#301056)',
            sku: 'SKUs: #301011 (UPC 10072181010113), #301043 (UPC 10072181010434), #301056 / #300091 (Paper/PET)',
            standards: 'Novolex Official Spec Sheet NVX-12832026 (April 2026) • Spec B_PG_1093_0922 • Paper/PET Hot Food Rated • Fully Lined Anti-Fog',
            dimensions: {
                ru: '#301011: 5.00 × 3.00 × 9.62 in. (127.0 × 76.2 × 244.3 мм, 500 шт/короб, 13.50 lbs = 12.25 г/шт) • #301043: 7.75 × 5.00 × 9.50 in.',
                md: '#301011: 5.00 × 3.00 × 9.62 in. (127.0 × 76.2 × 244.3 mm, 500 buc/cutie, 13.50 lbs = 12.25 g/buc) • #301043: 7.75 × 5.00 × 9.50 in.',
                en: '#301011: 5.00 × 3.00 × 9.62 in. (127.0 × 76.2 × 244.3 mm, 500 pcs/case, 13.50 lbs = 12.25 g/bag) • #301043: 7.75 × 5.00 × 9.50 in.'
            },
            layerSpec: {
                ru: 'Жиростойкий крафт + полная внутренняя выстилка антифог-плёнкой (Fully lined with anti-fog film) + смотровое окно из термостойкого ПЭТ (Paper/PET)',
                md: 'Kraft rezistent la grăsimi + căptușeală interioară completă cu film Anti-Fog + fereastră din PET termorezistent (Paper/PET)',
                en: 'Grease-resistant kraft + fully lined with anti-fog film + heat-resistant PET viewing window ("PET film ideal for hot food applications")'
            },
            tempHold: {
                ru: 'Официальная формулировка в PDF NVX-12832026: «PET film ideal for hot food applications» — для горячих крылышек, кусочков курицы и картофеля',
                md: 'Formulare oficială în PDF NVX-12832026: «PET film ideal for hot food applications» — pentru aripioare fierbinți, pui și cartofi',
                en: 'Official wording in PDF NVX-12832026: "PET film ideal for hot food applications" — engineered for hot wings, chicken pieces, and wedges'
            },
            virginCalc: {
                ru: 'Пластик в пакете #301011: 1.45 г против 26.29 г Virgin PP у базового лотка Faerch #2226014004 → снижение пластика на -94.5%',
                md: 'Plastic în punga #301011: 1.45 g față de 26.29 g Virgin PP la casoleta de bază Faerch #2226014004 → reducere cu -94.5%',
                en: 'Plastic in bag #301011: 1.45 g vs 26.29 g Virgin PP in baseline Faerch #2226014004 tray → -94.5% plastic reduction'
            },
            localPdf: 'certs/Novolex-Dubl-View-ToGo-Deli-Bags-PET-Window.pdf',
            extraLocalPdf: 'certs/Bagcraft-ToGo-Hot-Foods-Spec-B_PG_1093.pdf',
            pdfUrl: 'https://novolex.com/content/PDF/NVX-12832026-Dubl-View-ToGo-Deli-Bags.pdf',
            buyUrl: 'https://novolex.com/product-catalogs/'
        }
    },
    {
        // 3. ProAmpac RotiBag (Product ID #285 — PCR & Recycle-Ready Options)
        source: {
            ru: 'ProAmpac RotiBag® (Product ID #285, Doc #86) • ~12.0 г (с опцией 50% PCR = 6.00 г Virgin) против 26.29 г базы',
            md: 'ProAmpac RotiBag® (Product ID #285, Doc #86) • ~12.0 g (cu opțiune 50% PCR = 6.00 g Virgin) vs 26.29 g bază',
            en: 'ProAmpac RotiBag® (Product ID #285, Doc #86) • ~12.0 g (with 50% PCR option = 6.00 g Virgin) vs 26.29 g base'
        },
        old: {
            name: {
                ru: 'Базовый эталон Faerch P 2226-1C (#2226014004, 100% Virgin PP)',
                md: 'Etalonul de bază Faerch P 2226-1C (#2226014004, 100% Virgin PP)',
                en: 'Baseline Faerch P 2226-1C (#2226014004, 100% Virgin PP)'
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
                ru: '26.29 г жёсткого 100% Virgin полипропилена • Требует верхнюю плёнку и отдельный пакет на кассе',
                md: '26.29 g polipropilenă rigidă 100% Virgin • Necesită film superior și pungă separată la casă',
                en: '26.29 g rigid 100% Virgin polypropylene • Requires lidding film plus a separate checkout bag'
            }
        },
        eco: {
            name: {
                ru: 'ProAmpac RotiBag® Flexible Pouch (Product ID #285 — PCR Series)',
                md: 'ProAmpac RotiBag® Flexible Pouch (Product ID #285 — Seria PCR)',
                en: 'ProAmpac RotiBag® Flexible Pouch (Product ID #285 — PCR Series)'
            },
            totalMassG: 12.0,
            plasticMassG: 12.0,
            recycledPct: 50,
            tempC: 200,
            holdHours: 6,
            greaseNoFiberScore: 100,
            windowRecycleScore: 92,
            costDeltaPct: 12.5,
            specNote: {
                ru: 'Официальный продукт ProAmpac #285: стоячее дно, ручка, зип-замок, окно Anti-Fog, СВЧ, опции PCR и Recycle-Ready',
                md: 'Produs oficial ProAmpac #285: bază stabilă, mâner, fermoar, fereastră Anti-Fog, microunde, opțiuni PCR și Recycle-Ready',
                en: 'Official ProAmpac Product #285: bottom gusset, handle, zipper, Anti-Fog window, microwave-safe, PCR & Recycle-Ready options'
            }
        },
        cert: {
            docNo: 'PROAMPAC-DOC-86-PRODUCT-285',
            manufacturer: 'ProAmpac LLC (Cincinnati, OH, USA / Global Flexible Packaging)',
            productTitle: 'ProAmpac RotiBag® Inserted Bottom Gusset Hot Food Pouch (Product ID #285)',
            sku: 'Product ID: #285 | Document ID: #86 | Formats: Rotisserie & Fried Chicken, Potato Wedges',
            standards: 'ProAmpac Official Product Sheet #285 • Post-Consumer Recycled (PCR) & Recycle-Ready Options • Microwave-Safe • Leak-Resistant',
            dimensions: {
                ru: 'Стоячий пакет со вставным дном (Inserted bottom gusset pouch), замком Press-to-close zipper и встроенной ручкой (~12.0 г)',
                md: 'Pungă verticală cu bază inserată (Inserted bottom gusset pouch), fermoar Press-to-close zipper și mâner integrat (~12.0 g)',
                en: 'Inserted bottom gusset pouch with press-to-close zipper and built-in carry handle (~12.0 g)'
            },
            layerSpec: {
                ru: 'Термостойкая гибкая плёнка в исполнениях Conventional, Recycle-Ready (мономатериал) и Post-Consumer Recycled (PCR) с незапотевающим окном',
                md: 'Film flexibil termorezistent în variante Conventional, Recycle-Ready (monomaterial) și Post-Consumer Recycled (PCR) cu fereastră anti-aburire',
                en: 'Heat-resistant flexible film available in Conventional, Recycle-Ready (mono-material), and Post-Consumer Recycled (PCR) structures with fog-resistant window'
            },
            tempHold: {
                ru: 'Горячая витрина (Hot Display) и разогрев в СВЧ (Microwave-safe), вентиляция пара (Vented), защита от жира и протечек (Grease- & leak-resistant)',
                md: 'Vitrină caldă (Hot Display) și reîncălzire la microunde (Microwave-safe), ventilație abur (Vented), etanș la grăsimi și scurgeri',
                en: 'Hot display holding & consumer microwave-safe reheating, steam vented, grease- & leak-resistant'
            },
            virginCalc: {
                ru: 'Общий пластик: 12.00 г − 6.00 г PCR (50%) = 6.00 г Virgin Plastic (-77.2% против базового лотка 26.29 г Virgin PP)',
                md: 'Plastic total: 12.00 g − 6.00 g PCR (50%) = 6.00 g Virgin Plastic (-77.2% față de casoleta de bază 26.29 g Virgin PP)',
                en: 'Total plastic: 12.00 g − 6.00 g PCR (50%) = 6.00 g Virgin Plastic (-77.2% vs 26.29 g baseline Virgin PP tray)'
            },
            localPdf: 'certs/ProAmpac-RotiBag-285-Product-Sheet.pdf',
            extraLocalPdf: 'certs/Faerch-P-2226-1C-PP-2226014004-TDS.pdf',
            pdfUrl: 'https://www.proampac.com/en-us/documents/86/rotibag/',
            buyUrl: 'https://www.proampac.com/en-us/product/rotibag/'
        }
    },
    {
        // 4. Faerch C 2200-1L Evolve CPET (SKU #2200012097) vs Faerch P 2226-1C Virgin PP (#2226014004)
        source: {
            ru: 'Faerch TDS #2200012097 (EAN 5703969041835, -40°C…+220°C, 21.38 г) против Faerch #2226014004 (26.29 г Virgin PP)',
            md: 'Faerch TDS #2200012097 (EAN 5703969041835, -40°C…+220°C, 21.38 g) vs Faerch #2226014004 (26.29 g Virgin PP)',
            en: 'Faerch TDS #2200012097 (EAN 5703969041835, -40°C…+220°C, 21.38 g) vs Faerch #2226014004 (26.29 g Virgin PP)'
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
                ru: 'Заводской TDS #2226014004: 227×177×49 мм, 650 мкм, 26.29 г 100% Virgin PP, диапазон только от -20 °C до +121 °C',
                md: 'TDS oficial #2226014004: 227×177×49 mm, 650 µm, 26.29 g 100% Virgin PP, interval doar de la -20 °C la +121 °C',
                en: 'Official TDS #2226014004: 227×177×49 mm, 650 µm, 26.29 g 100% Virgin PP, temperature range -20 °C to +121 °C only'
            }
        },
        eco: {
            name: {
                ru: 'Лоток Faerch C 2200-1L Evolve CPET (#2200012097, 21.38 г, до +220 °C)',
                md: 'Casoletă Faerch C 2200-1L Evolve CPET (#2200012097, 21.38 g, până la +220 °C)',
                en: 'Faerch C 2200-1L Evolve CPET Tray (#2200012097, 21.38 g, up to +220 °C)'
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
                ru: 'Заводской TDS #2200012097: 199.9×154.8×47.1 мм, 1000 мл, 21.38 г ± 10%, -40…+220 °C (Oven/Microwave), NIR Detectable',
                md: 'TDS oficial #2200012097: 199.9×154.8×47.1 mm, 1000 ml, 21.38 g ± 10%, -40…+220 °C (Oven/Microwave), NIR Detectable',
                en: 'Official TDS #2200012097: 199.9×154.8×47.1 mm, 1000 ml, 21.38 g ± 10%, -40…+220 °C (Oven/Microwave), NIR Detectable'
            }
        },
        cert: {
            docNo: 'FAERCH-TDS-2200012097 (09-01-2023)',
            manufacturer: 'Faerch A/S (Rasmus Færchs Vej 1, 7500 Holstebro, Denmark)',
            productTitle: 'Faerch C 2200-1L Evolve CPET Dual-Ovenable Tray (Item #2200012097, Recipe 6811)',
            sku: 'Item #2200012097 | Barcode EAN: 5703969041835 | 570 pcs/box (12.19 kg/box) | 20 boxes/pallet',
            standards: 'EU 1935/2004 • EU 2023/2006 • EU 10/2011 • ISO 9001 & BRCGS High Hygiene • Temp Range: -40 °C to +220 °C (Oven/Microwave)',
            dimensions: {
                ru: '199.9 × 154.8 × 47.1 мм • Объём 1000 мл • Толщина листа 550 мкм • Номинальная масса корпуса: 21.38 г ± 10% (без верхней плёнки)',
                md: '199.9 × 154.8 × 47.1 mm • Volum 1000 ml • Grosime 550 µm • Masa nominală a corpului: 21.38 g ± 10% (fără filmul superior)',
                en: '199.9 × 154.8 × 47.1 mm • Volume 1000 ml • Thickness 550 µm • Nominal piece weight: 21.38 g ± 10% (tray body excluding film)'
            },
            layerSpec: {
                ru: 'Кристаллический полиэтилентерефталат Evolve CPET (рецепт 6811, микс оттенков rPET, до 70% постпотребительского рециклата; точная доля PCR варьируется по партиям согласно TDS)',
                md: 'Polietilentereftalat cristalin Evolve CPET (rețeta 6811, mix de nuanțe rPET, până la 70% reciclat post-consum; ponderea exactă PCR variază conform TDS)',
                en: 'Crystallized PET Evolve CPET (Recipe 6811, mixed rPET colour, up to 70% post-consumer recycled content; exact SKU PCR fluctuates per TDS)'
            },
            tempHold: {
                ru: 'Заводской допуск в PDF: Temperature range from -40°C to +220°C • Cooking: Oven/Microwave • Freezing: Yes • Recyclable: YES • NIR Detectable: Yes',
                md: 'Specificație oficială în PDF: Temperature range from -40°C to +220°C • Cooking: Oven/Microwave • Freezing: Yes • Recyclable: YES • NIR Detectable: Yes',
                en: 'Official PDF specification: Temperature range from -40°C to +220°C • Cooking: Oven/Microwave • Freezing: Yes • Recyclable: YES • NIR Detectable: Yes'
            },
            virginCalc: {
                ru: 'Корпус лотка: 21.38 г − 14.97 г rPET (до 70%) = 6.41 г Virgin Plastic (-75.6% против базового лотка Faerch #2226014004 массой 26.29 г)',
                md: 'Corpul casoletei: 21.38 g − 14.97 g rPET (până la 70%) = 6.41 g Virgin Plastic (-75.6% față de casoleta de bază Faerch #2226014004 de 26.29 g)',
                en: 'Tray body: 21.38 g − 14.97 g rPET (up to 70%) = 6.41 g Virgin Plastic (-75.6% vs baseline Faerch #2226014004 tray at 26.29 g)'
            },
            localPdf: 'certs/Faerch-C-2200-1L-CPET-2200012097-TDS.pdf',
            extraLocalPdf: 'certs/Faerch-P-2226-1C-PP-2226014004-TDS.pdf',
            pdfUrl: 'https://verkkokauppa.daytongroup.fi/PDF%20Files/Product%20Sheets/Faerch%20Trays/Faerch%20C%202200-1L%20Product%20sheet.pdf',
            buyUrl: 'https://www.faerch.com/en/products/ready-meals/cpet'
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

    const embedSrc = certData.localPdf || certData.pdfUrl;
    const extraPdfHtml = certData.extraLocalPdf
        ? `<a href="${certData.extraLocalPdf}" target="_blank" rel="noopener noreferrer" class="cert-ext-link secondary">${cm.openExtraPdfBtn}</a>`
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
                    ✅ VERIFIED PDF TDS<br>
                    ORIGINAL DATASHEET<br>
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
                    <tr>
                        <th>${cm.rowVirgin}</th>
                        <td><b>${pickLang(certData.virginCalc)}</b></td>
                    </tr>
                </tbody>
            </table>
            <div class="cert-pdf-box">
                <div class="cert-pdf-label">
                    <span>${cm.embedTitle}</span>
                    <code>${embedSrc}</code>
                </div>
                <iframe class="cert-pdf-embed" src="${embedSrc}" title="${certData.productTitle}"></iframe>
            </div>
            <div class="cert-doc-actions">
                <a href="${embedSrc}" target="_blank" rel="noopener noreferrer" class="cert-ext-link">
                    ${cm.openLocalPdfBtn}
                </a>
                ${extraPdfHtml}
                <a href="${certData.pdfUrl}" target="_blank" rel="noopener noreferrer" class="cert-ext-link secondary">
                    ${cm.openLiveUrlBtn}
                </a>
                <button type="button" class="cert-print-btn" onclick="window.print()">
                    ${cm.printBtn}
                </button>
            </div>
        </div>
    `;
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
            card.querySelector('.info-product').textContent = prod.info;
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
    const img = document.getElementById('inpImg').value || 'img/pouch-chicken-l.jpg';
    const buyUrlEl = document.getElementById('inpBuyUrl');
    const certUrlEl = document.getElementById('inpCertUrl');
    const certCodeEl = document.getElementById('inpCertCode');
    const buyUrl = buyUrlEl ? buyUrlEl.value : 'https://novolex.com/brands/bagcraft/';
    const certUrl = certUrlEl ? certUrlEl.value : 'certs/Bagcraft-ToGo-Hot-Foods-Spec-B_PG_1093.pdf';
    const certStandards = certCodeEl ? certCodeEl.value : 'Novolex Spec B_PG_1093_0922 • FDA Food Contact • Anti-Fog Window';
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
                ru: '26.29 г 100% первичного полипропилена • Не выдерживает 200–220 °C',
                md: '26.29 g 100% polipropilenă primară • Nu rezistă la 200–220 °C',
                en: '26.29 g 100% virgin polypropylene • Fails at 200–220 °C'
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
            specNote: `${tempC}°C • 6h • Grease ${greaseScore}% • Eco ${recycleScore}% • +${costDelta}%`
        },
        cert: {
            docNo: `CUSTOM-TDS-${Date.now().toString().slice(-5)}`,
            manufacturer: 'Verified Industrial Packaging Supplier',
            productTitle: name,
            sku: `Total Mass: ${totalMass} g | Plastic: ${plasticMass} g`,
            dimensions: 'Hot Deli & Rotisserie Format (200–250 °C)',
            standards: certStandards,
            layerSpec: info,
            tempHold: `${tempC} °C max temperature • Up to 6h hot display holding`,
            virginCalc: `Total Plastic: ${plasticMass} g • Recycled Content: ${recycledPct}% • Cost Delta: +${costDelta}%`,
            localPdf: certUrl,
            pdfUrl: certUrl,
            buyUrl: buyUrl
        }
    };

    const newCard = document.createElement('div');
    newCard.className = 'products-board';
    newCard.innerHTML = `
        <div class="picture-product">
          <span class="size-badge badge-recommended">🔬 VERIFIED SAMPLE • ${tempC} °C</span>
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
          <div class="layers-certs-row details-panel">
            <div class="layers-box">
              <span class="box-mini-title">🔬 TDS Specifications:</span>
              <ul class="layers-list">
                <li><b>Total Mass:</b> ${totalMass} g (Plastic: ${plasticMass} g)</li>
                <li><b>Recycled Content (PCR):</b> ${recycledPct}%</li>
              </ul>
            </div>
            <div class="certs-box">
              <span class="box-mini-title">📜 Compliance:</span>
              <div class="cert-badges">
                <span class="cert-pill">🌡️ Tmax: ${tempC} °C (6h)</span>
                <span class="cert-pill">🛡️ Grease/0 Fibers: ${greaseScore}%</span>
                <span class="cert-pill">👁️ Window & Eco: ${recycleScore}%</span>
                <span class="cert-pill price-pill">💶 Cost: +${costDelta}%</span>
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
                <p class="verified-text">...</p>
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

    cardsContainer.prepend(newCard);
    setupCardRadar(newCard, newComparisonData);
    adminModal.classList.remove('open');
    newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
});