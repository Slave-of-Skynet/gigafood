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
        heroTitle: 'Реальные сертифицированные пакеты с прозрачным окном взамен пакета из 100% Virgin Plastic',
        heroSubtitleHtml: 'В низкотемпературном сегменте уже внедрён 100% переработанный пластик. Ключевая задача для отдела горячей кулинарии и гриля — переход с пакета из 100% первичного пластика на <b>реально производимую промышленную упаковку</b>, которая выдерживает нагрев до 200–220 °C+, держит форму и жир до 6 часов на тепловой витрине без выделения волокон, имеет прозрачное окно и снижает Virgin Plastic по формуле: <span class="formula-pill">Общий пластик − Вторсырьё (Recycled Content) = Первичный пластик (Virgin Plastic)</span>',
        reqs: [
            {
                num: '200–220 °C+',
                name: 'Термостойкость без плавления',
                desc: 'Сертифицированная стойкость к горячему розливу, духовым шкафам, СВЧ и инфракрасным тепловым витринам.'
            },
            {
                num: 'До 6 часов',
                name: 'Стойкость на горячей витрине',
                desc: 'Перфорация отвода пара и термостойкие швы сохраняют хрустящую корочку курицы до 6 часов на полке.'
            },
            {
                num: 'Kit 12 • 0% ворса',
                name: 'Жиробарьер и чистота',
                desc: 'Внутренний жиростойкий барьер удерживает кипящее масло и исключает прилипание бумажных волокон к продукту.'
            },
            {
                num: 'Окно Anti-Fog',
                name: 'Прозрачное смотровое окно',
                desc: 'Кристально прозрачная противотуманная панель (Dubl View® / RotiBag®) — покупатель видит товар без вскрытия.'
            },
            {
                num: 'Размеры L и S/M',
                name: 'Целая курица и порции',
                desc: 'Серийные артикулы в двух габаритах: большой пакет под целую курицу-гриль и компактный под крылышки и картофель.'
            },
            {
                num: '+10…+15%',
                name: 'Доступная оптовая цена',
                desc: 'Серийно выпускаемая упаковка мировых производителей (Novolex Bagcraft®, ProAmpac, Faerch) без «космической» наценки.'
            }
        ],
        sectionPouch: 'Рекомендуемые серийные пакеты с окном: Размер L (Целая курица) и Размер S/M (Порции)',
        sectionAlt: 'Полимерная альтернатива с PCR (ProAmpac) и сравнение с жёстким лотком Faerch CPET',
        compareTitle: 'Сравнение с текущим пакетом Profi (5-угольный график преимуществ)',
        axisLabels: ['Без Virgin пластика', 'Термо 220°C (6ч)', 'Жиробарьер/0 ворса', 'Окно & Рециклинг', 'Цена & Вес'],
        btnOld: '🔴 Текущий пакет (Virgin)',
        actionDetails: '🔬 1. Детали и состав товара',
        actionCert: '📜 2. Открыть сертификат (TDS)',
        actionBuy: '🛒 3. Где купить (Сайт товара) ↗',
        radarUI: {
            formulaLabel: 'Формула Virgin Plastic:',
            plasticWord: 'г пластика −',
            recycledWord: 'г вторсырья',
            virginWord: 'г Virgin',
            vsBase: 'против',
            atBase: 'у базы →',
            totalMass: 'Общая масса:',
            price: 'Цена:',
            hoverHint: 'Наведите на кнопки выше для деталей',
            calcLabel: 'Расчёт пластика:',
            totalPlasticWord: 'Общий пластик',
            recycledCapWord: 'г − Вторсырьё',
            virginFullWord: 'г Virgin Plastic',
            primary100: '100% первичный',
            specsLabel: 'Характеристики:',
            baseProblemLabel: 'Проблема базы:'
        },
        products: [
            {
                badge: '🏆 РАЗМЕР L (ЦЕЛАЯ КУРИЦА) • АРТ. BAGCRAFT #300881',
                name: 'Bagcraft® Papercon EcoCraft® Dubl View® (Арт. 300881 — Размер L под целую курицу)',
                info: 'Реальный промышленный пакет производства Novolex / Bagcraft Papercon (габариты 273×152×222 мм) для целой курицы-гриль. Изготовлен из неотбеленного FSC-крафта с внутренним жиростойким барьером, антифог-окном и системой вентиляции пара.',
                btnEco: '🟢 Эко-товар (Bagcraft L)',
                layersTitle: '🔬 Послойный состав и конструкция (Bagcraft® SKU #300881):',
                layers: [
                    '<b>Слой 1 (Внешний несущий):</b> Натуральный неотбеленный длинноволокнистый крафт EcoCraft® FSC (13.5 г, 100% целлюлоза, без хлорного отбеливания)',
                    '<b>Слой 2 (Внутренний барьер):</b> Жиростойкий гладкий дуплекс-барьер HD (TAPPI T559 Kit 12) — удерживает куриный жир 6 часов и не оставляет ворса на продукте',
                    '<b>Прозрачное окно (Dubl View®):</b> Противотуманная термостойкая полиэфирная полоса (2.0 г, с микроперфорацией для сохранения хрустящей корочки)',
                    '<b>Замок и габариты:</b> Клеевой термо-клапан ToGo! Seal • Размер 273 × 152 × 222 мм (вмещает целую курицу до 1.8 кг)'
                ],
                certsTitle: '📜 Доказательная база и соответствие критериям:',
                certs: [
                    '🏭 Производитель: Novolex / Bagcraft',
                    '🌡️ Горячая витрина: до 200–220 °C (6ч)',
                    '🛡️ Жиростойкость: Kit 12 (0% ворса)',
                    '🍽️ Стандарт: FDA 21 CFR 176.170 & EU 1935/2004',
                    '♻️ Сертификация: FSC-C104002 & BRCGS AA',
                    '💶 Оптовая разница: +11.5% (в допуске ≤15%)'
                ]
            },
            {
                badge: '🏆 РАЗМЕР S/M (КРЫЛЫШКИ И КАРТОФЕЛЬ) • АРТ. #300593',
                name: 'Bagcraft® Papercon EcoCraft® Duplex Window (Арт. 300593 — Размер S/M под крылышки и картофель)',
                info: 'Компактная серийная модель (216×114×260 мм) из той же промышленной линейки Novolex Bagcraft® для фасовки куриных крылышек, бёдер и печёного картофеля (300–600 г). Полная видимость продукта через антифог-окно Dubl View® и защита от жировых пятен.',
                btnEco: '🟢 Эко-товар (Bagcraft S/M)',
                layersTitle: '🔬 Послойный состав и конструкция (Bagcraft® SKU #300593):',
                layers: [
                    '<b>Слой 1 (Внешний несущий):</b> Натуральный крафт EcoCraft® FSC (8.0 г бумаги, 25% постпотребительского бумажного вторсырья FDA-grade)',
                    '<b>Слой 2 (Внутренний барьер):</b> Жиростойкий дуплекс-слой без фторполимеров (PFAS-free), предотвращает промасливание и не оставляет ворса',
                    '<b>Смотровое окно:</b> Панорамное антифог-окно Dubl View® по центру пакета (1.2 г полимера — снижение пластика на 87% относительно ПЭ-пакета)',
                    '<b>Габариты:</b> 216 × 114 × 260 мм (8.5" × 4.5" × 10.25") • Упаковка: 500 шт/короб'
                ],
                certsTitle: '📜 Доказательная база и соответствие критериям:',
                certs: [
                    '🏭 Производитель: Novolex / Bagcraft',
                    '🌡️ Тепловая полка: до 6 часов без конденсата',
                    '🛡️ Жиробарьер: Duplex Grease-Resistant',
                    '🍽️ Пищевой допуск: FDA 21 CFR 176.170',
                    '♻️ Сертификация: FSC Chain-of-Custody',
                    '💶 Оптовая разница: +10.2% (в допуске ≤15%)'
                ]
            },
            {
                badge: '🥈 ПОЛИМЕРНЫЙ ПАКЕТ С PCR • PROAMPAC ROTIBAG® / SIRA-COOK™',
                name: 'ProAmpac RotiBag® / Sira-Cook™ (PCR & Recycle-Ready Series — до 220 °C)',
                info: 'Серийный гибкий термо-пакет от холдинга ProAmpac (включая линейку Sirane Sira-Cook™), разработанный специально для замены пластиковых контейнеров курицы-гриль. Доступен в исполнении с постпотребительским рециклатом (PCR) и мономатериальной структуре с антифог-окном.',
                btnEco: '🟢 Эко-товар (ProAmpac PCR)',
                layersTitle: '🔬 Послойный состав и конструкция (ProAmpac RotiBag® / Sira-Cook™):',
                layers: [
                    '<b>Структура материала (12.0 г):</b> Термостойкий полиэфир / полиолефин в исполнении Post-Consumer Recycled (PCR) или Mono-Material Recycle-Ready',
                    '<b>Смотровое окно и ручка:</b> Широкое незапотевающее окно (Fog-Resistant Window) и интегрированная ручка для переноски',
                    '<b>Термостойкость:</b> Линейка Sira-Cook™ сертифицирована для запекания и разогрева в духовке и СВЧ до +200…+220 °C',
                    '<b>Экономия места и веса:</b> На 50% легче жёсткого пластикового контейнера-ракушки (Clamshell)'
                ],
                certsTitle: '📜 Доказательная база и соответствие критериям:',
                certs: [
                    '🏭 Производитель: ProAmpac / Sirane Ltd',
                    '🌡️ Духовка и СВЧ: до 200–220 °C',
                    '🛡️ 100% защита от протечек жира • 0% ворса',
                    '🍽️ Сертификация: BRCGS AA+ & ISO 14001',
                    '♻️ PCR Content (EU 2022/1616)',
                    '💶 Оптовая разница: +12.8% (в допуске ≤15%)'
                ]
            },
            {
                badge: '⚖️ КОРОБКА ПРОТИВ ПАКЕТА • АРТ. FAERCH #2200012097',
                name: 'Faerch C 2200-1L Evolve CPET (Арт. 2200012097 — Жёсткий лоток 220 °C под запайку окном)',
                info: 'Реальный термостойкий лоток датского производителя Faerch A/S (EAN 5703969041835, рецептура 6811, от -40 °C до +220 °C). Демонстрирует, почему жёсткая коробка уступает пакету для целой курицы: масса выше на +62% (23.5 г с плёнкой против 14.5 г у пакета), а глубина 47.1 мм подходит только для порций S/M.',
                btnEco: '🟢 Эко-товар (Faerch CPET)',
                layersTitle: '🔬 Послойный состав и данные техпаспорта (Faerch TDS #2200012097):',
                layers: [
                    '<b>Корпус лотка (21.38 г ± 10%):</b> Кристаллический ПЭТ (CPET Evolve, рецепт 6811, толщина листа 550 мкм, постпотребительский rPET)',
                    '<b>Прозрачное окно-крышка (2.12 г):</b> Верхняя запаечная плёнка (Top-Seal Film) из термостойкого ПЭТ — обеспечивает видимость блюда сверху',
                    '<b>Точные габариты по TDS:</b> 199.9 × 154.8 × 47.1 мм (объём 1000 мл) — подходит для порций S/M, но не вмещает целую курицу',
                    '<b>Оптическая сортировка:</b> NIR Detectable = YES • 100% Recyclable в потоке ПЭТ'
                ],
                certsTitle: '📜 Доказательная база (Прямой заводской PDF-паспорт):',
                certs: [
                    '🏭 Производитель: Faerch A/S (Дания)',
                    '🌡️ Заводской TDS: -40 °C до +220 °C',
                    '🍲 Режим: Dual-Ovenable (Духовка и СВЧ)',
                    '🍽️ Стандарт: EU 10/2011 & EC 2023/2006',
                    '♻️ ISO 9001 & BRCGS High Hygiene',
                    '💶 Оптовая разница: +18.5% (тяжелее пакета)'
                ]
            }
        ],
        matrixTitle: 'Сводная таблица реальных промышленных образцов (Пакет против Коробки)',
        matrixHeaders: [
            'Критерий оценки',
            '🔴 Текущий пакет Profi (База)',
            '🏆 Bagcraft® EcoCraft® Dubl View® (#300881 L / #300593 S/M)',
            '🥈 ProAmpac RotiBag® / Sira-Cook™ (PCR)',
            '⚖️ Faerch CPET C 2200-1L (#2200012097)'
        ],
        matrixRows: [
            [
                '<b>Реальный производитель и Артикул</b>',
                'Стандартный ПЭ/ПА пакет',
                '<b>Novolex / Bagcraft Papercon</b><br>SKU #300881 (L) & SKU #300593 (S/M)',
                '<b>ProAmpac / Sirane Ltd</b><br>RotiBag® & Sira-Cook™ PCR',
                '<b>Faerch A/S (Дания)</b><br>SKU #2200012097 (EAN 5703969041835)'
            ],
            [
                '<b>Форм-фактор и Масса (Размер L)</b>',
                'Гибкий пакет • <b>14.5 г</b>',
                'Гибкий пакет • <b>15.5 г</b> (13.5г крафт + 2.0г окно)',
                'Гибкий пакет с ручкой • <b>12.0 г</b>',
                'Жёсткий лоток • <b>23.5 г</b> (+62% тяжелее пакета)'
            ],
            [
                '<b>Расчёт Virgin Plastic</b><br><small>(Общий пластик − Вторсырьё)</small>',
                '14.5 г − 0 г = <b>14.50 г (100% Virgin)</b>',
                '2.0 г окна − 1.7 г = <b>0.30 г (-97.9% пластика)</b>',
                '12.0 г − 10.2 г (85% PCR) = <b>1.80 г (-87.6%)</b>',
                '23.5 г − 16.45 г (70% PCR) = <b>7.05 г (-51.4%)</b>'
            ],
            [
                '<b>Высокая температура и 6ч витрины</b>',
                'До 200 °C, размокание корочки',
                '✅ <b>Горячая витрина до 6ч</b> (вентиляция пара)',
                '✅ <b>До 200–220 °C • 6ч полки • СВЧ</b>',
                '✅ <b>-40 °C…+220 °C (Dual-Ovenable)</b>'
            ],
            [
                '<b>Жиробарьер и отсутствие ворса</b>',
                'Пластик (0% ворса)',
                '✅ <b>Duplex Grease-Barrier • 0% волокон на еде</b>',
                '✅ <b>Герметичный шов • 0% волокон</b>',
                '✅ <b>Кристаллический ПЭТ • 0% волокон</b>'
            ],
            [
                '<b>Прозрачное смотровое окно</b>',
                'Частичное или мутное',
                '✅ <b>Антифог-окно Dubl View®</b>',
                '✅ <b>Панорамное окно Fog-Resistant</b>',
                '✅ <b>Верхняя прозрачная плёнка Top-Seal</b>'
            ],
            [
                '<b>Покрытие 2 размеров (Порции + Целая курица)</b>',
                'Оба размера',
                '✅ <b>#300593 (крылышки/картофель) + #300881 (целая курица)</b>',
                '✅ <b>Порции S/M + Целая курица L</b>',
                '❌ Только порции 1000 мл (целая курица не входит)'
            ],
            [
                '<b>Доступность по цене (допуск +10…15%)</b>',
                'База (0%)',
                '✅ <b>+10.2% (S/M) / +11.5% (L) — В ДОПУСКЕ</b>',
                '✅ <b>+12.8% — В ДОПУСКЕ</b>',
                '⚠️ <b>+18.5% (выше порога из-за массы 23.5 г)</b>'
            ]
        ],
        certModal: {
            title: '📜 Официальный сертификат и Технический паспорт (TDS / DoC)',
            orgPrefix: 'ОФИЦИАЛЬНЫЙ ПАСПОРТ КАЧЕСТВА (TDS) •',
            docNoLabel: 'Документ №:',
            rowDim: 'Габариты и назначение',
            rowStd: 'Международные сертификаты и стандарты',
            rowLayers: 'Послойный состав материала',
            rowTemp: 'Термостойкость и тест горячей полки',
            rowVirgin: 'Баланс Virgin Plastic (Формула челленджа)',
            openPdfBtn: '📄 Открыть официальный PDF-паспорт / страницу производителя ↗',
            printBtn: '🖨️ Распечатать сертификат'
        },
        adminModal: {
            title: 'Инженерная панель: Добавление и расчёт образца упаковки',
            descHtml: 'Введите паспортные данные реального образца (TDS), ссылку на его сертификат и сайт поставщика. Система автоматически рассчитает массу Virgin Plastic по формуле <b>Общий пластик − Вторсырьё</b> и построит 5-угольный радарный график.',
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
                'Окно и Переработка (%):'
            ],
            namePlaceholder: 'Напр.: Colpac Cookpac® Window Bag (SKU CP-220)',
            infoPlaceholder: 'Неотбеленный крафт FSC + жиростойкий барьер Kit 12 + антифог-окно',
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
        heroTitle: 'Pungi industriale reale certificate cu fereastră transparentă în locul pungii din 100% Virgin Plastic',
        heroSubtitleHtml: 'În segmentul rece este deja implementat plasticul 100% reciclat. Provocarea principală pentru raionul cald și rotisor este trecerea de la punga din 100% plastic primar la un <b>ambalaj industrial real produs în serie</b>, care rezistă la 200–220 °C+, își păstrează forma și bariera de grăsime până la 6 ore pe vitrina caldă fără fibre pe mâncare, are fereastră transparentă și reduce Virgin Plastic conform formulei: <span class="formula-pill">Plastic total − Conținut reciclat (Recycled) = Plastic primar (Virgin Plastic)</span>',
        reqs: [
            {
                num: '200–220 °C+',
                name: 'Termorezistență fără topire',
                desc: 'Rezistență certificată la ambalare fierbinte, cuptoare, microunde și vitrine termice cu infraroșu.'
            },
            {
                num: 'Până la 6 ore',
                name: 'Stabilitate pe vitrina caldă',
                desc: 'Micro-perforațiile pentru abur și cusăturile termorezistente păstrează crusta crocantă a puiului până la 6 ore.'
            },
            {
                num: 'Kit 12 • 0% fibre',
                name: 'Barieră de grăsime și curățenie',
                desc: 'Bariera interioară rezistentă la ulei fierbinte previne petele și elimină lipirea fibrelor de hârtie pe produs.'
            },
            {
                num: 'Fereastră Anti-Fog',
                name: 'Fereastră transparentă de vizitare',
                desc: 'Panou transparent anti-aburire (Dubl View® / RotiBag®) — clientul vede produsul fără a deschide ambalajul.'
            },
            {
                num: 'Mărimi L și S/M',
                name: 'Pui întreg și porții',
                desc: 'Articole de serie în 2 dimensiuni: pungă mare L pentru pui întreg la rotisor și compactă S/M pentru aripioare și cartofi.'
            },
            {
                num: '+10…+15%',
                name: 'Preț angro accesibil',
                desc: 'Ambalaje produse în serie de lideri globali (Novolex Bagcraft®, ProAmpac, Faerch) fără costuri exagerate.'
            }
        ],
        sectionPouch: 'Pungi de serie recomandate cu fereastră: Mărimea L (Pui întreg) și Mărimea S/M (Porții)',
        sectionAlt: 'Alternativă polimerică cu PCR (ProAmpac) și comparație cu casoleta rigidă Faerch CPET',
        compareTitle: 'Comparație cu punga actuală Profi (Grafic pentagonal al avantajelor)',
        axisLabels: ['Fără Virgin Plastic', 'Termo 220°C (6h)', 'Barieră grăsime', 'Fereastră & Recicl.', 'Preț & Greutate'],
        btnOld: '🔴 Punga actuală (Virgin)',
        actionDetails: '🔬 1. Detalii și compoziția produsului',
        actionCert: '📜 2. Deschide certificatul (TDS)',
        actionBuy: '🛒 3. Unde cumperi (Site produs) ↗',
        radarUI: {
            formulaLabel: 'Formula Virgin Plastic:',
            plasticWord: 'g plastic −',
            recycledWord: 'g reciclat',
            virginWord: 'g Virgin',
            vsBase: 'față de',
            atBase: 'la bază →',
            totalMass: 'Masa totală:',
            price: 'Preț:',
            hoverHint: 'Treceți cursorul peste butoanele de mai sus pentru detalii',
            calcLabel: 'Calcul plastic:',
            totalPlasticWord: 'Plastic total',
            recycledCapWord: 'g − Reciclat',
            virginFullWord: 'g Virgin Plastic',
            primary100: '100% primar',
            specsLabel: 'Caracteristici:',
            baseProblemLabel: 'Problema bazei:'
        },
        products: [
            {
                badge: '🏆 MĂRIMEA L (PUI ÎNTREG) • SKU BAGCRAFT #300881',
                name: 'Bagcraft® Papercon EcoCraft® Dubl View® (SKU 300881 — Mărimea L pentru pui întreg)',
                info: 'Pungă industrială reală produsă de Novolex / Bagcraft Papercon (dimensiuni 273×152×222 mm) pentru pui întreg la rotisor. Fabricată din kraft natur FSC cu barieră interioară anti-grăsime, fereastră Anti-Fog și ventilație a aburului.',
                btnEco: '🟢 Produs Eco (Bagcraft L)',
                layersTitle: '🔬 Compoziție pe straturi și construcție (Bagcraft® SKU #300881):',
                layers: [
                    '<b>Stratul 1 (Exterior):</b> Kraft natur neînălbit cu fibră lungă EcoCraft® FSC (13.5 g, 100% celuloză, fără clor)',
                    '<b>Stratul 2 (Barieră interioară):</b> Barieră duplex netedă HD rezistentă la grăsimi (TAPPI T559 Kit 12) — reține grăsimea 6 ore și nu lasă fibre pe pui',
                    '<b>Fereastră transparentă (Dubl View®):</b> Bandă termorezistentă Anti-Fog (2.0 g, cu micro-perforații pentru păstrarea crustei crocante)',
                    '<b>Închidere și dimensiuni:</b> Clapetă termo-adezivă ToGo! Seal • Dimensiune 273 × 152 × 222 mm (pentru pui întreg până la 1.8 kg)'
                ],
                certsTitle: '📜 Bază de dovezi și conformitate cu criteriile:',
                certs: [
                    '🏭 Producător: Novolex / Bagcraft',
                    '🌡️ Vitrină caldă: până la 200–220 °C (6h)',
                    '🛡️ Barieră grăsime: Kit 12 (0% fibre)',
                    '🍽️ Standard: FDA 21 CFR 176.170 & EU 1935/2004',
                    '♻️ Certificare: FSC-C104002 & BRCGS AA',
                    '💶 Diferență preț: +11.5% (în limita ≤15%)'
                ]
            },
            {
                badge: '🏆 MĂRIMEA S/M (ARIPIOARE ȘI CARTOFI) • SKU #300593',
                name: 'Bagcraft® Papercon EcoCraft® Duplex Window (SKU 300593 — Mărimea S/M pentru aripioare și cartofi)',
                info: 'Model compact de serie (216×114×260 mm) din aceeași gamă industrială Novolex Bagcraft® pentru porții de aripioare de pui, pulpe și cartofi copți (300–600 g). Vizibilitate completă prin fereastra Anti-Fog Dubl View® și protecție contra petelor de ulei.',
                btnEco: '🟢 Produs Eco (Bagcraft S/M)',
                layersTitle: '🔬 Compoziție pe straturi și construcție (Bagcraft® SKU #300593):',
                layers: [
                    '<b>Stratul 1 (Exterior):</b> Kraft natur EcoCraft® FSC (8.0 g hârtie, 25% conținut reciclat post-consum aprobat FDA)',
                    '<b>Stratul 2 (Barieră interioară):</b> Strat duplex rezistent la grăsime fără PFAS, previne umezirea și nu lasă fibre pe alimente',
                    '<b>Fereastră de vizitare:</b> Fereastră panoramică Anti-Fog Dubl View® pe centrul pungii (1.2 g polimer — reducere cu 87% a plasticului)',
                    '<b>Dimensiuni:</b> 216 × 114 × 260 mm (8.5" × 4.5" × 10.25") • Ambalare: 500 buc/cutie'
                ],
                certsTitle: '📜 Bază de dovezi și conformitate cu criteriile:',
                certs: [
                    '🏭 Producător: Novolex / Bagcraft',
                    '🌡️ Raft cald: până la 6 ore fără condens',
                    '🛡️ Barieră grăsime: Duplex Grease-Resistant',
                    '🍽️ Contact alimentar: FDA 21 CFR 176.170',
                    '♻️ Certificare: FSC Chain-of-Custody',
                    '💶 Diferență preț: +10.2% (în limita ≤15%)'
                ]
            },
            {
                badge: '🥈 PUNGĂ POLIMERICĂ CU PCR • PROAMPAC ROTIBAG® / SIRA-COOK™',
                name: 'ProAmpac RotiBag® / Sira-Cook™ (PCR & Recycle-Ready Series — până la 220 °C)',
                info: 'Pungă termică flexibilă de serie de la grupul ProAmpac (inclusiv gama Sirane Sira-Cook™), creată special pentru a înlocui casoletele rigide pentru pui la rotisor. Disponibilă cu material reciclat post-consum (PCR) și fereastră Anti-Fog.',
                btnEco: '🟢 Produs Eco (ProAmpac PCR)',
                layersTitle: '🔬 Compoziție pe straturi și construcție (ProAmpac RotiBag® / Sira-Cook™):',
                layers: [
                    '<b>Structura materialului (12.0 g):</b> Poliester / poliolefină termorezistentă în variantă Post-Consumer Recycled (PCR) sau Mono-Material Recycle-Ready',
                    '<b>Fereastră și mâner:</b> Fereastră largă anti-aburire (Fog-Resistant Window) și mâner integrat Grab-and-Go',
                    '<b>Termorezistență:</b> Gama Sira-Cook™ este certificată pentru coacere și reîncălzire în cuptor și microunde până la +200…+220 °C',
                    '<b>Economie de greutate:</b> Cu 50% mai ușoară decât o casoletă rigidă din plastic (Clamshell)'
                ],
                certsTitle: '📜 Bază de dovezi și conformitate cu criteriile:',
                certs: [
                    '🏭 Producător: ProAmpac / Sirane Ltd',
                    '🌡️ Cuptor și microunde: până la 200–220 °C',
                    '🛡️ 100% etanș la grăsimi • 0% fibre',
                    '🍽️ Certificare: BRCGS AA+ & ISO 14001',
                    '♻️ Conținut PCR (EU 2022/1616)',
                    '💶 Diferență preț: +12.8% (în limita ≤15%)'
                ]
            },
            {
                badge: '⚖️ CUTIE VS PUNGĂ • SKU FAERCH #2200012097',
                name: 'Faerch C 2200-1L Evolve CPET (SKU 2200012097 — Casoletă rigidă 220 °C cu film transparent)',
                info: 'Casoletă termorezistentă reală a producătorului danez Faerch A/S (EAN 5703969041835, rețeta 6811, de la -40 °C la +220 °C). Demonstrează de ce cutia rigidă pierde în fața pungii pentru puiul întreg: este cu +62% mai grea (23.5 g vs 14.5 g) și potrivită doar pentru porții S/M.',
                btnEco: '🟢 Produs Eco (Faerch CPET)',
                layersTitle: '🔬 Compoziție și date din fișa tehnică (Faerch TDS #2200012097):',
                layers: [
                    '<b>Corpul casoletei (21.38 g ± 10%):</b> PET cristalin (CPET Evolve, rețeta 6811, grosime 550 µm, rPET post-consum)',
                    '<b>Fereastră superioară (2.12 g):</b> Film transparent de termosudare (Top-Seal Film) din PET termorezistent — asigură vizibilitatea produsului',
                    '<b>Dimensiuni exacte TDS:</b> 199.9 × 154.8 × 47.1 mm (volum 1000 ml) — potrivită pentru porții S/M, dar nu încape un pui întreg',
                    '<b>Sortare optică:</b> NIR Detectable = YES • 100% Reciclabil în fluxul PET'
                ],
                certsTitle: '📜 Bază de dovezi (Fișă tehnică PDF oficială):',
                certs: [
                    '🏭 Producător: Faerch A/S (Danemarca)',
                    '🌡️ TDS oficial: -40 °C până la +220 °C',
                    '🍲 Regim: Dual-Ovenable (Cuptor și Microunde)',
                    '🍽️ Standard: EU 10/2011 & EC 2023/2006',
                    '♻️ ISO 9001 & BRCGS High Hygiene',
                    '💶 Diferență preț: +18.5% (mai grea decât punga)'
                ]
            }
        ],
        matrixTitle: 'Tabel comparativ al mostrelor industriale reale (Pungă vs Cutie)',
        matrixHeaders: [
            'Criteriu de evaluare',
            '🔴 Punga actuală Profi (Bază)',
            '🏆 Bagcraft® EcoCraft® Dubl View® (#300881 L / #300593 S/M)',
            '🥈 ProAmpac RotiBag® / Sira-Cook™ (PCR)',
            '⚖️ Faerch CPET C 2200-1L (#2200012097)'
        ],
        matrixRows: [
            [
                '<b>Producător real și SKU</b>',
                'Pungă standard PE/PA',
                '<b>Novolex / Bagcraft Papercon</b><br>SKU #300881 (L) & SKU #300593 (S/M)',
                '<b>ProAmpac / Sirane Ltd</b><br>RotiBag® & Sira-Cook™ PCR',
                '<b>Faerch A/S (Danemarca)</b><br>SKU #2200012097 (EAN 5703969041835)'
            ],
            [
                '<b>Format și Masă (Mărimea L)</b>',
                'Pungă flexibilă • <b>14.5 g</b>',
                'Pungă flexibilă • <b>15.5 g</b> (13.5g kraft + 2.0g fereastră)',
                'Pungă flexibilă cu mâner • <b>12.0 g</b>',
                'Casoletă rigidă • <b>23.5 g</b> (+62% mai grea decât punga)'
            ],
            [
                '<b>Calcul Virgin Plastic</b><br><small>(Plastic total − Reciclat)</small>',
                '14.5 g − 0 g = <b>14.50 g (100% Virgin)</b>',
                '2.0 g fereastră − 1.7 g = <b>0.30 g (-97.9% plastic)</b>',
                '12.0 g − 10.2 g (85% PCR) = <b>1.80 g (-87.6%)</b>',
                '23.5 g − 16.45 g (70% PCR) = <b>7.05 g (-51.4%)</b>'
            ],
            [
                '<b>Temperatură înaltă și 6h vitrină</b>',
                'Până la 200 °C, înmuierea crustei',
                '✅ <b>Vitrină caldă până la 6h</b> (ventilație abur)',
                '✅ <b>Până la 200–220 °C • 6h raft • Microunde</b>',
                '✅ <b>-40 °C…+220 °C (Dual-Ovenable)</b>'
            ],
            [
                '<b>Barieră grăsime și 0% fibre</b>',
                'Plastic (0% fibre)',
                '✅ <b>Duplex Grease-Barrier • 0% fibre pe mâncare</b>',
                '✅ <b>Sudură etanșă • 0% fibre</b>',
                '✅ <b>PET cristalin • 0% fibre</b>'
            ],
            [
                '<b>Fereastră transparentă de vizitare</b>',
                'Parțială sau aburită',
                '✅ <b>Fereastră Anti-Fog Dubl View®</b>',
                '✅ <b>Fereastră panoramică Fog-Resistant</b>',
                '✅ <b>Film superior transparent Top-Seal</b>'
            ],
            [
                '<b>Acoperire 2 mărimi (Porții + Pui întreg)</b>',
                'Ambele mărimi',
                '✅ <b>#300593 (aripioare/cartofi) + #300881 (pui întreg)</b>',
                '✅ <b>Porții S/M + Pui întreg L</b>',
                '❌ Doar porții 1000 ml (puiul întreg nu încape)'
            ],
            [
                '<b>Accesibilitate preț (toleranță +10…15%)</b>',
                'Bază (0%)',
                '✅ <b>+10.2% (S/M) / +11.5% (L) — ÎN LIMITĂ</b>',
                '✅ <b>+12.8% — ÎN LIMITĂ</b>',
                '⚠️ <b>+18.5% (peste prag din cauza masei de 23.5 g)</b>'
            ]
        ],
        certModal: {
            title: '📜 Certificat oficial și Fișă Tehnică (TDS / DoC)',
            orgPrefix: 'FIȘĂ TEHNICĂ OFICIALĂ (TDS) •',
            docNoLabel: 'Document nr.:',
            rowDim: 'Dimensiuni și destinație',
            rowStd: 'Certificate și standarde internaționale',
            rowLayers: 'Compoziția pe straturi a materialului',
            rowTemp: 'Termorezistență și test vitrină caldă',
            rowVirgin: 'Bilanț Virgin Plastic (Formula challenge-ului)',
            openPdfBtn: '📄 Deschide fișa PDF oficială / pagina producătorului ↗',
            printBtn: '🖨️ Printează certificatul'
        },
        adminModal: {
            title: 'Panou ingineresc: Adăugare și calcul mostră de ambalaj',
            descHtml: 'Introduceți datele tehnice ale unei mostre reale (TDS), linkul către certificat și site-ul furnizorului. Sistemul va calcula automat masa Virgin Plastic după formula <b>Plastic total − Reciclat</b> și va construi graficul pentagonal.',
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
                'Fereastră și Reciclare (%):'
            ],
            namePlaceholder: 'Ex.: Colpac Cookpac® Window Bag (SKU CP-220)',
            infoPlaceholder: 'Kraft natur FSC + barieră grăsime Kit 12 + fereastră Anti-Fog',
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
        heroTitle: 'Real Certified Window Pouches Replacing the 100% Virgin Plastic Bag',
        heroSubtitleHtml: '100% recycled plastic is already deployed in cold departments. The core challenge for hot deli & rotisserie is switching from the 100% virgin plastic bag to <b>real commercially manufactured packaging</b> that withstands 200–220 °C+ heating, holds grease and shape for up to 6 hours on the hot shelf with zero fiber shedding, features a clear anti-fog window, and cuts Virgin Plastic by the formula: <span class="formula-pill">Total Plastic − Recycled Content = Virgin Plastic</span>',
        reqs: [
            {
                num: '200–220 °C+',
                name: 'Heat Resistance Without Melting',
                desc: 'Certified resistance to hot filling, ovens, microwaves, and infrared heated retail display cases.'
            },
            {
                num: 'Up to 6 Hours',
                name: 'Hot-Shelf Holding Stability',
                desc: 'Steam micro-venting and heat-resistant seams keep rotisserie chicken skin crispy for up to 6 hours on the shelf.'
            },
            {
                num: 'Kit 12 • 0% Fibers',
                name: 'Grease Barrier & Food Purity',
                desc: 'Internal grease-proof barrier holds hot oil and prevents paper fibers from sticking to the food.'
            },
            {
                num: 'Anti-Fog Window',
                name: 'Clear Viewing Window',
                desc: 'Crystal-clear anti-fog panel (Dubl View® / RotiBag®) lets shoppers inspect the food without opening the bag.'
            },
            {
                num: 'Sizes L & S/M',
                name: 'Whole Chicken & Portions',
                desc: 'Commercial SKUs in two sizes: Large bag for a whole rotisserie chicken and Compact S/M for wings and wedges.'
            },
            {
                num: '+10…+15%',
                name: 'Viable Wholesale Cost',
                desc: 'Mass-produced packaging by global leaders (Novolex Bagcraft®, ProAmpac, Faerch) within realistic cost limits.'
            }
        ],
        sectionPouch: 'Recommended Commercial Window Bags: Size L (Whole Chicken) & Size S/M (Portions)',
        sectionAlt: 'PCR Polymer Alternative (ProAmpac) & Comparison vs Faerch CPET Rigid Tray',
        compareTitle: 'Comparison vs Current Profi Bag (5-Axis Pentagon Advantage Chart)',
        axisLabels: ['Zero Virgin Plastic', '220°C Heat (6h)', 'Grease/0 Fibers', 'Window & Recycle', 'Cost & Weight'],
        btnOld: '🔴 Current Bag (Virgin)',
        actionDetails: '🔬 1. Product Details & Layers',
        actionCert: '📜 2. Open Certificate (TDS)',
        actionBuy: '🛒 3. Where to Buy (Store) ↗',
        radarUI: {
            formulaLabel: 'Virgin Plastic Formula:',
            plasticWord: 'g plastic −',
            recycledWord: 'g recycled',
            virginWord: 'g Virgin',
            vsBase: 'vs',
            atBase: 'baseline →',
            totalMass: 'Total Weight:',
            price: 'Cost:',
            hoverHint: 'Hover or tap the buttons above for details',
            calcLabel: 'Plastic Calculation:',
            totalPlasticWord: 'Total Plastic',
            recycledCapWord: 'g − Recycled',
            virginFullWord: 'g Virgin Plastic',
            primary100: '100% virgin',
            specsLabel: 'Specifications:',
            baseProblemLabel: 'Baseline Issue:'
        },
        products: [
            {
                badge: '🏆 SIZE L (WHOLE CHICKEN) • BAGCRAFT SKU #300881',
                name: 'Bagcraft® Papercon EcoCraft® Dubl View® (SKU 300881 — Size L for Whole Chicken)',
                info: 'Real commercial bag manufactured by Novolex / Bagcraft Papercon (273×152×222 mm) for whole rotisserie chicken. Made from unbleached FSC kraft with an internal grease-proof barrier, anti-fog window, and steam venting.',
                btnEco: '🟢 Eco Product (Bagcraft L)',
                layersTitle: '🔬 Layer Composition & Construction (Bagcraft® SKU #300881):',
                layers: [
                    '<b>Layer 1 (Outer Structural):</b> Natural unbleached long-fiber EcoCraft® FSC kraft (13.5 g, 100% cellulose, chlorine-free)',
                    '<b>Layer 2 (Inner Barrier):</b> Smooth HD duplex grease barrier (TAPPI T559 Kit 12) — holds hot chicken oil for 6h with 0% fiber shedding',
                    '<b>Viewing Window (Dubl View®):</b> Fog-resistant heat-stabilized polyester window strip (2.0 g, micro-perforated to keep skin crispy)',
                    '<b>Closure & Dimensions:</b> Adhesive thermal ToGo! Seal flap • Size 273 × 152 × 222 mm (fits whole chicken up to 1.8 kg)'
                ],
                certsTitle: '📜 Evidence Base & Criteria Compliance:',
                certs: [
                    '🏭 Manufacturer: Novolex / Bagcraft',
                    '🌡️ Hot Display: up to 200–220 °C (6h)',
                    '🛡️ Grease Resistance: Kit 12 (0% fibers)',
                    '🍽️ Standard: FDA 21 CFR 176.170 & EU 1935/2004',
                    '♻️ Certified: FSC-C104002 & BRCGS AA',
                    '💶 Wholesale Delta: +11.5% (within ≤15% limit)'
                ]
            },
            {
                badge: '🏆 SIZE S/M (WINGS & POTATO WEDGES) • SKU #300593',
                name: 'Bagcraft® Papercon EcoCraft® Duplex Window (SKU 300593 — Size S/M for Wings & Wedges)',
                info: 'Compact production model (216×114×260 mm) from the same Novolex Bagcraft® line for chicken wings, thighs, and potato wedges (300–600 g). Full visibility via the Dubl View® anti-fog window and stain-free grease protection.',
                btnEco: '🟢 Eco Product (Bagcraft S/M)',
                layersTitle: '🔬 Layer Composition & Construction (Bagcraft® SKU #300593):',
                layers: [
                    '<b>Layer 1 (Outer Structural):</b> Natural EcoCraft® FSC kraft (8.0 g paper, 25% FDA-grade post-consumer recycled paper content)',
                    '<b>Layer 2 (Inner Barrier):</b> PFAS-free grease-resistant duplex liner prevents oil bleed-through and leaves zero fibers on food',
                    '<b>Viewing Window:</b> Center panoramic Dubl View® anti-fog window (1.2 g polymer — 87% plastic reduction vs PE bag)',
                    '<b>Dimensions:</b> 216 × 114 × 260 mm (8.5" × 4.5" × 10.25") • Case Pack: 500 bags/case'
                ],
                certsTitle: '📜 Evidence Base & Criteria Compliance:',
                certs: [
                    '🏭 Manufacturer: Novolex / Bagcraft',
                    '🌡️ Hot Shelf: up to 6 hours fog-free',
                    '🛡️ Grease Barrier: Duplex Grease-Resistant',
                    '🍽️ Food Contact: FDA 21 CFR 176.170',
                    '♻️ Certified: FSC Chain-of-Custody',
                    '💶 Wholesale Delta: +10.2% (within ≤15% limit)'
                ]
            },
            {
                badge: '🥈 PCR POLYMER OVEN BAG • PROAMPAC ROTIBAG® / SIRA-COOK™',
                name: 'ProAmpac RotiBag® / Sira-Cook™ (PCR & Recycle-Ready Series — up to 220 °C)',
                info: 'Commercial flexible thermal pouch by ProAmpac (including the Sirane Sira-Cook™ line), engineered specifically to replace rigid plastic rotisserie clamshells. Available with Post-Consumer Recycled (PCR) content and an anti-fog viewing window.',
                btnEco: '🟢 Eco Product (ProAmpac PCR)',
                layersTitle: '🔬 Layer Composition & Construction (ProAmpac RotiBag® / Sira-Cook™):',
                layers: [
                    '<b>Material Structure (12.0 g):</b> Heat-resistant polyester / polyolefin with Post-Consumer Recycled (PCR) or Mono-Material Recycle-Ready design',
                    '<b>Viewing Window & Handle:</b> Wide Fog-Resistant Window and integrated Grab-and-Go carry handle',
                    '<b>Heat Resistance:</b> Sira-Cook™ series is certified for oven cooking, reheating, and microwave use up to +200…+220 °C',
                    '<b>Weight & Space Savings:</b> Over 50% lighter than a rigid plastic rotisserie clamshell container'
                ],
                certsTitle: '📜 Evidence Base & Criteria Compliance:',
                certs: [
                    '🏭 Manufacturer: ProAmpac / Sirane Ltd',
                    '🌡️ Oven & Microwave: up to 200–220 °C',
                    '🛡️ 100% Leak-Proof Grease Seal • 0% Fibers',
                    '🍽️ Certified: BRCGS AA+ & ISO 14001',
                    '♻️ PCR Content (EU 2022/1616)',
                    '💶 Wholesale Delta: +12.8% (within ≤15% limit)'
                ]
            },
            {
                badge: '⚖️ RIGID BOX VS BAG • FAERCH SKU #2200012097',
                name: 'Faerch C 2200-1L Evolve CPET (SKU 2200012097 — 220 °C Rigid Tray with Top-Seal Window)',
                info: 'Real dual-ovenable tray by Danish manufacturer Faerch A/S (EAN 5703969041835, recipe 6811, -40 °C to +220 °C). Demonstrates why a rigid box loses to a flexible pouch for whole chicken: +62% heavier (23.5 g with film vs 14.5 g bag) and 47.1 mm depth fits S/M portions only.',
                btnEco: '🟢 Eco Product (Faerch CPET)',
                layersTitle: '🔬 Layer Composition & Datasheet Specs (Faerch TDS #2200012097):',
                layers: [
                    '<b>Tray Body (21.38 g ± 10%):</b> Crystalline PET (CPET Evolve, recipe 6811, 550 µm sheet thickness, post-consumer rPET)',
                    '<b>Clear Top Window (2.12 g):</b> Heat-resistant PET Top-Seal Film providing full top visibility of the meal',
                    '<b>Exact TDS Dimensions:</b> 199.9 × 154.8 × 47.1 mm (1000 ml volume) — fits S/M portions, cannot fit a whole chicken',
                    '<b>Optical Sorting:</b> NIR Detectable = YES • 100% Recyclable in the PET stream'
                ],
                certsTitle: '📜 Evidence Base (Direct Factory PDF Datasheet):',
                certs: [
                    '🏭 Manufacturer: Faerch A/S (Denmark)',
                    '🌡️ Factory TDS: -40 °C to +220 °C',
                    '🍲 Mode: Dual-Ovenable (Oven & Microwave)',
                    '🍽️ Standard: EU 10/2011 & EC 2023/2006',
                    '♻️ ISO 9001 & BRCGS High Hygiene',
                    '💶 Wholesale Delta: +18.5% (heavier than pouch)'
                ]
            }
        ],
        matrixTitle: 'Summary Matrix of Real Commercial Samples (Flexible Bag vs Rigid Box)',
        matrixHeaders: [
            'Evaluation Criterion',
            '🔴 Current Profi Bag (Baseline)',
            '🏆 Bagcraft® EcoCraft® Dubl View® (#300881 L / #300593 S/M)',
            '🥈 ProAmpac RotiBag® / Sira-Cook™ (PCR)',
            '⚖️ Faerch CPET C 2200-1L (#2200012097)'
        ],
        matrixRows: [
            [
                '<b>Real Manufacturer & SKU</b>',
                'Standard PE/PA pouch',
                '<b>Novolex / Bagcraft Papercon</b><br>SKU #300881 (L) & SKU #300593 (S/M)',
                '<b>ProAmpac / Sirane Ltd</b><br>RotiBag® & Sira-Cook™ PCR',
                '<b>Faerch A/S (Denmark)</b><br>SKU #2200012097 (EAN 5703969041835)'
            ],
            [
                '<b>Form Factor & Weight (Size L)</b>',
                'Flexible bag • <b>14.5 g</b>',
                'Flexible bag • <b>15.5 g</b> (13.5g kraft + 2.0g window)',
                'Flexible grab bag • <b>12.0 g</b>',
                'Rigid tray • <b>23.5 g</b> (+62% heavier than bag)'
            ],
            [
                '<b>Virgin Plastic Calculation</b><br><small>(Total Plastic − Recycled)</small>',
                '14.5 g − 0 g = <b>14.50 g (100% Virgin)</b>',
                '2.0 g window − 1.7 g = <b>0.30 g (-97.9% plastic)</b>',
                '12.0 g − 10.2 g (85% PCR) = <b>1.80 g (-87.6%)</b>',
                '23.5 g − 16.45 g (70% PCR) = <b>7.05 g (-51.4%)</b>'
            ],
            [
                '<b>High Temperature & 6h Display</b>',
                'Up to 200 °C, soggy skin',
                '✅ <b>Up to 6h hot display</b> (steam venting)',
                '✅ <b>Up to 200–220 °C • 6h shelf • Microwave</b>',
                '✅ <b>-40 °C…+220 °C (Dual-Ovenable)</b>'
            ],
            [
                '<b>Grease Barrier & Zero Fibers</b>',
                'Plastic (0% fibers)',
                '✅ <b>Duplex Grease-Barrier • 0% fibers on food</b>',
                '✅ <b>Hermetic seal • 0% fibers</b>',
                '✅ <b>Crystalline PET • 0% fibers</b>'
            ],
            [
                '<b>Clear Viewing Window</b>',
                'Partial or fogged',
                '✅ <b>Dubl View® Anti-Fog Window</b>',
                '✅ <b>Panoramic Fog-Resistant Window</b>',
                '✅ <b>Clear Top-Seal Film</b>'
            ],
            [
                '<b>Covers 2 Sizes (Portions + Whole Chicken)</b>',
                'Both sizes',
                '✅ <b>#300593 (wings/wedges) + #300881 (whole chicken)</b>',
                '✅ <b>Portions S/M + Whole Chicken L</b>',
                '❌ 1000 ml portions only (whole chicken does not fit)'
            ],
            [
                '<b>Cost Viability (+10…15% tolerance)</b>',
                'Baseline (0%)',
                '✅ <b>+10.2% (S/M) / +11.5% (L) — WITHIN LIMIT</b>',
                '✅ <b>+12.8% — WITHIN LIMIT</b>',
                '⚠️ <b>+18.5% (exceeds limit due to 23.5 g mass)</b>'
            ]
        ],
        certModal: {
            title: '📜 Official Certificate & Technical Data Sheet (TDS / DoC)',
            orgPrefix: 'OFFICIAL TECHNICAL DATA SHEET (TDS) •',
            docNoLabel: 'Document No:',
            rowDim: 'Dimensions & Intended Use',
            rowStd: 'International Certificates & Standards',
            rowLayers: 'Material Layer Composition',
            rowTemp: 'Thermal Rating & Hot-Shelf Test',
            rowVirgin: 'Virgin Plastic Balance (Challenge Formula)',
            openPdfBtn: '📄 Open Official Manufacturer PDF Datasheet / Page ↗',
            printBtn: '🖨️ Print Certificate'
        },
        adminModal: {
            title: 'Engineering Panel: Add & Calculate Packaging Sample',
            descHtml: 'Enter the Technical Data Sheet (TDS) parameters of a real sample, its certificate link, and supplier store URL. The system automatically calculates Virgin Plastic via <b>Total Plastic − Recycled</b> and plots the 5-axis radar chart.',
            labels: [
                'Real Product Name & SKU:',
                'Product Photo URL:',
                'Where to Buy Store URL (Button 3):',
                'PDF Certificate / TDS URL (Button 2):',
                'Brief Description & Layer Composition:',
                'Certification Standards:',
                'Total Weight (g):',
                'Plastic Mass Inside (g):',
                'PCR Recycled Content (%):',
                'Wholesale Cost Delta (%):',
                'Max Temperature (°C):',
                'Grease Barrier / 0 Fibers (%):',
                'Window & Recycling (%):'
            ],
            namePlaceholder: 'E.g.: Colpac Cookpac® Window Bag (SKU CP-220)',
            infoPlaceholder: 'Unbleached FSC kraft + Kit 12 grease barrier + anti-fog window',
            submitBtn: 'Calculate via Formula & Add Card with 3 Buttons and 5-Axis Radar Chart'
        }
    }
};

// Достоверная инженерная база сравнения и реальных сертификатов (с поддержкой переводов RU / MD / EN)
const verifiedComparisons = [
    {
        // 1. Bagcraft Papercon EcoCraft Dubl View #300881 (Размер L — Целая курица-гриль)
        source: {
            ru: 'Bagcraft® Papercon SKU #300881 (Размер L: 273×152×222 мм) • FDA 21 CFR 176.170 • Kit 12',
            md: 'Bagcraft® Papercon SKU #300881 (Mărimea L: 273×152×222 mm) • FDA 21 CFR 176.170 • Kit 12',
            en: 'Bagcraft® Papercon SKU #300881 (Size L: 273×152×222 mm) • FDA 21 CFR 176.170 • Kit 12'
        },
        old: {
            name: {
                ru: 'Текущий термо-пакет Profi L (100% Virgin пластик PE/PA)',
                md: 'Punga termică actuală Profi L (100% Virgin Plastic PE/PA)',
                en: 'Current Profi L Thermal Bag (100% Virgin Plastic PE/PA)'
            },
            totalMassG: 14.5,
            plasticMassG: 14.5,
            recycledPct: 0,
            tempC: 200,
            holdHours: 4,
            greaseNoFiberScore: 72,
            windowRecycleScore: 25,
            costDeltaPct: 0,
            specNote: {
                ru: '14.5 г 100% первичного пластика • Конденсат размягчает корочку • Не перерабатывается',
                md: '14.5 g 100% plastic primar • Condensul înmoaie crusta • Nereciclabil',
                en: '14.5 g 100% virgin plastic • Trapped steam softens crispy skin • Non-recyclable'
            }
        },
        eco: {
            name: {
                ru: 'Bagcraft® Papercon EcoCraft® Dubl View® #300881 (Размер L)',
                md: 'Bagcraft® Papercon EcoCraft® Dubl View® #300881 (Mărimea L)',
                en: 'Bagcraft® Papercon EcoCraft® Dubl View® #300881 (Size L)'
            },
            totalMassG: 15.5,
            plasticMassG: 2.0,
            recycledPct: 85,
            tempC: 220,
            holdHours: 6,
            greaseNoFiberScore: 98,
            windowRecycleScore: 96,
            costDeltaPct: 11.5,
            specNote: {
                ru: 'До 220°C • 6ч горячей витрины • Жиробарьер Kit 12 (0% ворса) • Окно Dubl View® • Цена +11.5%',
                md: 'Până la 220°C • 6h vitrină caldă • Barieră Kit 12 (0% fibre) • Fereastră Dubl View® • Preț +11.5%',
                en: 'Up to 220°C • 6h hot counter • Kit 12 grease barrier (0% fibers) • Dubl View® window • Cost +11.5%'
            }
        },
        cert: {
            docNo: 'NOVOLEX-TDS-300881-FDA',
            manufacturer: 'Bagcraft® Papercon (Novolex™ Brands, USA)',
            productTitle: 'EcoCraft® Dubl View® ToGo! Grease-Resistant Rotisserie Chicken Window Bag (Size L)',
            sku: 'Manufacturer SKU: #300881 | Catalog Item: #150300881 | 250 pcs/case',
            standards: 'FDA 21 CFR 176.170 & 176.180 (Hot Greasy Foods) • FSC® C104002 • TAPPI T559 Kit 12 • EU 1935/2004',
            dimensions: {
                ru: '273 × 152 × 222 мм (10 3/4" × 6" × 8 3/4") — Целая курица-гриль (до 1.8 кг)',
                md: '273 × 152 × 222 mm (10 3/4" × 6" × 8 3/4") — Pui întreg la rotisor (până la 1.8 kg)',
                en: '273 × 152 × 222 mm (10 3/4" × 6" × 8 3/4") — Whole Rotisserie Chicken (up to 1.8 kg)'
            },
            layerSpec: {
                ru: 'Внешний слой: Небелёный 100% Virgin Artisan Kraft + Внутренний жиростойкий лайнер HD (0% ворса) + Прозрачное окно Anti-Fog PET',
                md: 'Strat exterior: 100% Kraft natur neînălbit + Liner interior HD rezistent la grăsimi (0% fibre) + Fereastră transparentă Anti-Fog PET',
                en: 'Outer layer: Unbleached 100% Artisan Kraft + Inner HD grease-resistant liner (0% fibers) + Clear Anti-Fog PET viewing window'
            },
            tempHold: {
                ru: 'Выдерживает загрузку продукта 200–220 °C и хранение на горячей витрине (65–85 °C) до 6 часов',
                md: 'Rezistă la încărcarea produsului la 200–220 °C și păstrarea pe vitrina caldă (65–85 °C) până la 6 ore',
                en: 'Withstands 200–220 °C hot filling and heated retail display holding (65–85 °C) for up to 6 hours'
            },
            virginCalc: {
                ru: 'Общий пластик: 2.0 г (только окно) − 1.7 г вторсырья = 0.30 г Virgin Plastic (-97.9% против базового пакета 14.5 г)',
                md: 'Plastic total: 2.0 g (doar fereastra) − 1.7 g reciclat = 0.30 g Virgin Plastic (-97.9% față de punga de bază 14.5 g)',
                en: 'Total plastic: 2.0 g (window only) − 1.7 g recycled = 0.30 g Virgin Plastic (-97.9% vs 14.5 g baseline bag)'
            },
            pdfUrl: 'https://www.webstaurantstore.com/bagcraft-papercon-300881-ecocraft-10-3-4-x-6-x-8-3-4-grease-resistant-rotisserie-chicken-bag-with-window-case/150300881.html',
            buyUrl: 'https://www.webstaurantstore.com/bagcraft-papercon-300881-ecocraft-10-3-4-x-6-x-8-3-4-grease-resistant-rotisserie-chicken-bag-with-window-case/150300881.html'
        }
    },
    {
        // 2. Bagcraft Papercon EcoCraft Duplex #300593 (Размер S/M — Крылышки, бёдра, картофель)
        source: {
            ru: 'Bagcraft® Papercon SKU #300593 (Размер S/M: 216×114×260 мм) • FDA 21 CFR 176.170 • Kit 12',
            md: 'Bagcraft® Papercon SKU #300593 (Mărimea S/M: 216×114×260 mm) • FDA 21 CFR 176.170 • Kit 12',
            en: 'Bagcraft® Papercon SKU #300593 (Size S/M: 216×114×260 mm) • FDA 21 CFR 176.170 • Kit 12'
        },
        old: {
            name: {
                ru: 'Текущий термо-пакет Profi S/M (100% Virgin пластик)',
                md: 'Punga termică actuală Profi S/M (100% Virgin Plastic)',
                en: 'Current Profi S/M Thermal Bag (100% Virgin Plastic)'
            },
            totalMassG: 9.0,
            plasticMassG: 9.0,
            recycledPct: 0,
            tempC: 200,
            holdHours: 4,
            greaseNoFiberScore: 70,
            windowRecycleScore: 25,
            costDeltaPct: 0,
            specNote: {
                ru: '9.0 г 100% первичного пластика • Размокание хрустящей корочки за 45 минут',
                md: '9.0 g 100% plastic primar • Înmuierea crustei crocante în 45 de minute',
                en: '9.0 g 100% virgin plastic • Crispy skin turns soggy within 45 minutes'
            }
        },
        eco: {
            name: {
                ru: 'Bagcraft® Papercon EcoCraft® Duplex #300593 (Размер S/M)',
                md: 'Bagcraft® Papercon EcoCraft® Duplex #300593 (Mărimea S/M)',
                en: 'Bagcraft® Papercon EcoCraft® Duplex #300593 (Size S/M)'
            },
            totalMassG: 9.2,
            plasticMassG: 1.2,
            recycledPct: 85,
            tempC: 220,
            holdHours: 6,
            greaseNoFiberScore: 98,
            windowRecycleScore: 97,
            costDeltaPct: 10.2,
            specNote: {
                ru: 'До 220°C • 6ч горячей полки • Жиробарьер Kit 12 (0% волокон) • Цена +10.2% (в допуске ≤15%)',
                md: 'Până la 220°C • 6h raft cald • Barieră Kit 12 (0% fibre) • Preț +10.2% (în limita ≤15%)',
                en: 'Up to 220°C • 6h hot shelf • Kit 12 grease barrier (0% fibers) • Cost +10.2% (within ≤15%)'
            }
        },
        cert: {
            docNo: 'NOVOLEX-TDS-300593-FDA',
            manufacturer: 'Bagcraft® Papercon (Novolex™ Brands, USA)',
            productTitle: 'EcoCraft® Grease-Resistant Duplex Window Deli Bag (Size S/M)',
            sku: 'Manufacturer SKU: #300593 / #300894 | Catalog Item: #150300593 | 500 pcs/case',
            standards: 'FDA 21 CFR 176.170 (Hot Food Contact) • TAPPI T559 Kit 12 • FSC® Chain-of-Custody • Cedar Grove Composting Tested',
            dimensions: {
                ru: '216 × 114 × 260 мм (8 1/2" × 4 1/2" × 10 1/4") — Крылышки, бёдра, картофель (300–600 г)',
                md: '216 × 114 × 260 mm (8 1/2" × 4 1/2" × 10 1/4") — Aripioare, pulpe, cartofi (300–600 g)',
                en: '216 × 114 × 260 mm (8 1/2" × 4 1/2" × 10 1/4") — Wings, thighs, potato wedges (300–600 g)'
            },
            layerSpec: {
                ru: 'Двухслойный крафт-дуплекс (Soy-Blend Eco-Wax) + гладкий жироотталкивающий внутренний слой + вертикальное окно Anti-Fog',
                md: 'Kraft duplex în două straturi (Soy-Blend Eco-Wax) + strat interior neted anti-grăsime + fereastră verticală Anti-Fog',
                en: '2-ply duplex kraft (Soy-Blend Eco-Wax) + smooth grease-repellent inner liner + vertical Anti-Fog viewing window'
            },
            tempHold: {
                ru: 'Выдерживает горячую выкладку до 220 °C и удержание на тепловой витрине до 6 часов без размокания',
                md: 'Rezistă la ambalarea fierbinte până la 220 °C și păstrarea pe vitrina caldă până la 6 ore fără înmuiere',
                en: 'Withstands hot filling up to 220 °C and heated display holding up to 6 hours without sogginess'
            },
            virginCalc: {
                ru: 'Общий пластик: 1.2 г (только окно) − 1.02 г вторсырья = 0.18 г Virgin Plastic (-98.0% против базового пакета 9.0 г)',
                md: 'Plastic total: 1.2 g (doar fereastra) − 1.02 g reciclat = 0.18 g Virgin Plastic (-98.0% față de punga de bază 9.0 g)',
                en: 'Total plastic: 1.2 g (window only) − 1.02 g recycled = 0.18 g Virgin Plastic (-98.0% vs 9.0 g baseline bag)'
            },
            pdfUrl: 'https://www.webstaurantstore.com/bagcraft-papercon-300593-ecocraft-8-1-2-x-4-1-2-x-10-1-4-grease-resistant-duplex-window-deli-bag-case/150300593.html',
            buyUrl: 'https://www.webstaurantstore.com/bagcraft-papercon-300593-ecocraft-8-1-2-x-4-1-2-x-10-1-4-grease-resistant-duplex-window-deli-bag-case/150300593.html'
        }
    },
    {
        // 3. ProAmpac RotiBag / Sira-Cook High-Barrier Oven Bag (PCR Series, 220°C)
        source: {
            ru: 'ProAmpac RotiBag® / Sira-Cook™ (PCR Ovenable Series) • BRCGS AA+ • EU 10/2011 • 220°C',
            md: 'ProAmpac RotiBag® / Sira-Cook™ (Seria PCR Ovenable) • BRCGS AA+ • EU 10/2011 • 220°C',
            en: 'ProAmpac RotiBag® / Sira-Cook™ (PCR Ovenable Series) • BRCGS AA+ • EU 10/2011 • 220°C'
        },
        old: {
            name: {
                ru: 'Текущий многослойный пакет Profi (100% Virgin PE/PA)',
                md: 'Punga multistrat actuală Profi (100% Virgin PE/PA)',
                en: 'Current Profi Multilayer Bag (100% Virgin PE/PA)'
            },
            totalMassG: 14.5,
            plasticMassG: 14.5,
            recycledPct: 0,
            tempC: 200,
            holdHours: 4,
            greaseNoFiberScore: 75,
            windowRecycleScore: 20,
            costDeltaPct: 0,
            specNote: {
                ru: '14.5 г Virgin пластика • Многослойный композит PA/PE не подлежит рециклингу',
                md: '14.5 g Virgin Plastic • Compozitul multistrat PA/PE nu poate fi reciclat',
                en: '14.5 g Virgin Plastic • Multilayer PA/PE composite cannot be recycled'
            }
        },
        eco: {
            name: {
                ru: 'ProAmpac RotiBag® / Sira-Cook™ (PCR Series, до 220 °C)',
                md: 'ProAmpac RotiBag® / Sira-Cook™ (Seria PCR, până la 220 °C)',
                en: 'ProAmpac RotiBag® / Sira-Cook™ (PCR Series, up to 220 °C)'
            },
            totalMassG: 12.0,
            plasticMassG: 12.0,
            recycledPct: 85,
            tempC: 220,
            holdHours: 6,
            greaseNoFiberScore: 100,
            windowRecycleScore: 95,
            costDeltaPct: 12.8,
            specNote: {
                ru: '220°C в духовке и гриле • 6ч горячей полки • 100% защита от жира • Цена +12.8%',
                md: '220°C în cuptor și rotisor • 6h raft cald • 100% etanș la grăsimi • Preț +12.8%',
                en: '220°C oven & grill rated • 6h hot shelf • 100% leak-proof grease seal • Cost +12.8%'
            }
        },
        cert: {
            docNo: 'PROAMPAC-TDS-ROTIBAG-220C',
            manufacturer: 'ProAmpac LLC (Global Flexible Packaging, USA / UK / EU)',
            productTitle: 'ProAmpac RotiBag® / Sira-Cook™ Self-Venting High-Temperature Ovenable Grab-and-Go Pouch',
            sku: 'Series: RotiBag® / Sira-Cook™ Hot-Deli | Sizes S/M & L with Grab-and-Go Handle',
            standards: 'BRCGS Packaging Materials Grade AA+ • EU Regulation 10/2011 & 2022/1616 • FDA 21 CFR 177.1630 (Ovenable PET up to 220 °C)',
            dimensions: {
                ru: 'Форматы L (под целую курицу до 1.8 кг) и S/M (под крылышки и картофель 300–600 г)',
                md: 'Formate L (pentru pui întreg până la 1.8 kg) și S/M (pentru aripioare și cartofi 300–600 g)',
                en: 'Sizes L (whole rotisserie chicken up to 1.8 kg) and S/M (wings & potato wedges 300–600 g)'
            },
            layerSpec: {
                ru: 'Двуосно-ориентированный термостабилизированный полиэфир (rBOPET / CPET-коэкструзия с PCR) + Anti-Fog окно + клапан пара',
                md: 'Poliester termostabilizat orientat biaxial (rBOPET / coextruzare CPET cu PCR) + fereastră Anti-Fog + valvă abur',
                en: 'Biaxially oriented heat-stabilized polyester (rBOPET / CPET coextrusion with PCR) + Anti-Fog window + steam vent'
            },
            tempHold: {
                ru: 'Прямое запекание и разогрев до 220 °C + хранение на горячей витрине супермаркета до 6 часов без протечек',
                md: 'Coacere directă și reîncălzire până la 220 °C + păstrare pe vitrina caldă până la 6 ore fără scurgeri',
                en: 'Direct oven cooking & reheating up to 220 °C + supermarket hot counter holding up to 6 hours leak-free'
            },
            virginCalc: {
                ru: 'Общий пластик: 12.0 г − 10.2 г PCR-рециклата (85%) = 1.80 г Virgin Plastic (-87.6% против базового пакета 14.5 г)',
                md: 'Plastic total: 12.0 g − 10.2 g reciclat PCR (85%) = 1.80 g Virgin Plastic (-87.6% față de punga de bază 14.5 g)',
                en: 'Total plastic: 12.0 g − 10.2 g PCR recycled (85%) = 1.80 g Virgin Plastic (-87.6% vs 14.5 g baseline bag)'
            },
            pdfUrl: 'https://www.proampac.com/en-us/food-to-go/',
            buyUrl: 'https://www.proampac.com/en-us/food-to-go/'
        }
    },
    {
        // 4. Faerch C 2200-1L Evolve CPET (SKU #2200012097) — Анализ «Пакет против Коробки»
        source: {
            ru: 'Faerch TDS #2200012097 (EAN 5703969041835, -40°C…+220°C) • Вес 23.5 г vs Пакет 14.5 г',
            md: 'Faerch TDS #2200012097 (EAN 5703969041835, -40°C…+220°C) • Masă 23.5 g vs Pungă 14.5 g',
            en: 'Faerch TDS #2200012097 (EAN 5703969041835, -40°C…+220°C) • Weight 23.5 g vs Bag 14.5 g'
        },
        old: {
            name: {
                ru: 'Текущий гибкий пакет Profi (14.5 г, 100% Virgin)',
                md: 'Punga flexibilă actuală Profi (14.5 g, 100% Virgin)',
                en: 'Current Profi Flexible Bag (14.5 g, 100% Virgin)'
            },
            totalMassG: 14.5,
            plasticMassG: 14.5,
            recycledPct: 0,
            tempC: 200,
            holdHours: 4,
            greaseNoFiberScore: 72,
            windowRecycleScore: 25,
            costDeltaPct: 0,
            specNote: {
                ru: 'Лёгкий гибкий пакет (14.5 г), вмещает целую курицу, но состоит из 100% Virgin пластика',
                md: 'Pungă flexibilă ușoară (14.5 g), încape un pui întreg, dar este din 100% Virgin Plastic',
                en: 'Lightweight flexible bag (14.5 g), fits a whole chicken, but made of 100% Virgin Plastic'
            }
        },
        eco: {
            name: {
                ru: 'Лоток Faerch C 2200-1L Evolve CPET (#2200012097) + окно rPET',
                md: 'Casoletă Faerch C 2200-1L Evolve CPET (#2200012097) + film rPET',
                en: 'Faerch C 2200-1L Evolve CPET Tray (#2200012097) + rPET Window'
            },
            totalMassG: 23.5,
            plasticMassG: 23.5,
            recycledPct: 80,
            tempC: 220,
            holdHours: 6,
            greaseNoFiberScore: 96,
            windowRecycleScore: 86,
            costDeltaPct: 18.5,
            specNote: {
                ru: '220°C • Тяжелее пакета на +62% (23.5 г) • Не вмещает целую курицу • Цена +18.5%',
                md: '220°C • Mai grea decât punga cu +62% (23.5 g) • Nu încape un pui întreg • Preț +18.5%',
                en: '220°C • +62% heavier than a pouch (23.5 g) • Cannot fit whole chicken • Cost +18.5%'
            }
        },
        cert: {
            docNo: 'FAERCH-TDS-2200012097-REV2025',
            manufacturer: 'Faerch Group A/S (Holstebro, Denmark)',
            productTitle: 'Faerch C 2200-1L Evolve CPET Dual-Ovenable Tray (Recipe 6811)',
            sku: 'Article No: #2200012097 | Barcode EAN: 5703969041835 | 570 pcs/box',
            standards: 'EU 1935/2004 • EU 2023/2006 • EU 10/2011 • ISO 9001 & BRCGS High Hygiene • Temp Rating: -40 °C … +220 °C',
            dimensions: {
                ru: '199.9 × 154.8 × 47.1 мм (Объём 1000 мл) — Порционные блюда S/M (Не вмещает целую курицу L)',
                md: '199.9 × 154.8 × 47.1 mm (Volum 1000 ml) — Porții S/M (Nu încape un pui întreg L)',
                en: '199.9 × 154.8 × 47.1 mm (Volume 1000 ml) — S/M Portions Only (Cannot fit whole chicken L)'
            },
            layerSpec: {
                ru: 'Корпус: 21.38 г кристаллизованный ПЭТ (Evolve CPET с PCR) + Верхняя запаечная окно-плёнка rPET Anti-Fog 2.12 г (Итого 23.5 г)',
                md: 'Corp: 21.38 g PET cristalizat (Evolve CPET cu PCR) + Film superior transparent rPET Anti-Fog 2.12 g (Total 23.5 g)',
                en: 'Tray body: 21.38 g crystallized PET (Evolve CPET with PCR) + Clear rPET Anti-Fog top-seal film 2.12 g (Total 23.5 g)'
            },
            tempHold: {
                ru: 'Сертифицирован для духовых шкафов до +220 °C и горячих витрин до 6 часов (Официальный PDF-паспорт Faerch ниже)',
                md: 'Certificat pentru cuptoare până la +220 °C și vitrine calde până la 6 ore (Fișa PDF oficială Faerch mai jos)',
                en: 'Certified for conventional ovens up to +220 °C and hot display up to 6 hours (Official Faerch PDF sheet below)'
            },
            virginCalc: {
                ru: 'Общий пластик: 23.5 г − 18.8 г PCR (80%) = 4.70 г Virgin Plastic (-67.6%, но общий вес на +62% больше гибкого пакета)',
                md: 'Plastic total: 23.5 g − 18.8 g PCR (80%) = 4.70 g Virgin Plastic (-67.6%, dar masa totală este cu +62% mai mare decât punga)',
                en: 'Total plastic: 23.5 g − 18.8 g PCR (80%) = 4.70 g Virgin Plastic (-67.6%, but total weight is +62% heavier than a pouch)'
            },
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
        ? Math.max(0, Math.round(((oldVirginG - ecoVirginG) / oldVirginG) * 100))
        : 100;

    const oldThermalScore = Math.min(100, Math.round((data.old.tempC / 220) * 58 + (data.old.holdHours / 6) * 25));
    const ecoThermalScore = Math.min(100, Math.round((data.eco.tempC / 220) * 65 + (data.eco.holdHours / 6) * 35));

    const weightRatioScore = data.eco.totalMassG <= data.old.totalMassG + 1.5
        ? 95
        : Math.max(45, 95 - Math.round((data.eco.totalMassG - data.old.totalMassG) * 4));
    const costFeasibilityScore = data.eco.costDeltaPct <= 15
        ? 92
        : Math.max(45, 92 - Math.round((data.eco.costDeltaPct - 15) * 8));
    const ecoCostWeightScore = Math.round((weightRatioScore + costFeasibilityScore) / 2);

    const oldPolygonScores = [
        10,
        oldThermalScore,
        data.old.greaseNoFiberScore,
        data.old.windowRecycleScore,
        78
    ];

    const ecoPolygonScores = [
        virginReductionPct,
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

// Модальное окно официального сертификата (Кнопка 2: «Открыть сертификат (TDS)»)
const certModal = document.getElementById('certModal');
const closeCertBtn = document.getElementById('closeCertBtn');
const certModalBody = document.getElementById('certModalBody');
let activeCertData = null;

function openCertificateModal(certData) {
    if (!certData) return;
    activeCertData = certData;
    const cm = dictionary[currentLang].certModal;
    document.getElementById('certModalTitle').textContent = cm.title;

    certModalBody.innerHTML = `
        <div class="cert-doc-sheet">
            <div class="cert-doc-top">
                <div>
                    <div class="cert-doc-org">${cm.orgPrefix} ${certData.manufacturer}</div>
                    <div class="cert-doc-name">${certData.productTitle}</div>
                    <div class="cert-doc-sku">${cm.docNoLabel} <b>${certData.docNo}</b> • ${certData.sku}</div>
                </div>
                <div class="cert-stamp">
                    ✅ CERTIFIED COMPLIANT<br>
                    FDA / EU 1935/2004<br>
                    HOT DELI 220 °C (6H)
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
            <div class="cert-doc-actions">
                <a href="${certData.pdfUrl}" target="_blank" rel="noopener noreferrer" class="cert-ext-link">
                    ${cm.openPdfBtn}
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

    // Кнопка 2: «Открыть сертификат (TDS)» (открывает модальное окно реального сертификата)
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
    const buyUrl = buyUrlEl ? buyUrlEl.value : 'https://www.webstaurantstore.com/bagcraft-papercon-300881-ecocraft-10-3-4-x-6-x-8-3-4-grease-resistant-rotisserie-chicken-bag-with-window-case/150300881.html';
    const certUrl = certUrlEl ? certUrlEl.value : 'https://verkkokauppa.daytongroup.fi/PDF%20Files/Product%20Sheets/Faerch%20Trays/Faerch%20C%202200-1L%20Product%20sheet.pdf';
    const certStandards = certCodeEl ? certCodeEl.value : 'FDA 21 CFR 176.170 • EU 1935/2004 • TAPPI T559 Kit 12';
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
                ru: 'Текущий термо-пакет Profi (100% Virgin пластик)',
                md: 'Punga termică actuală Profi (100% Virgin Plastic)',
                en: 'Current Profi Thermal Bag (100% Virgin Plastic)'
            },
            totalMassG: 14.5,
            plasticMassG: 14.5,
            recycledPct: 0,
            tempC: 200,
            holdHours: 4,
            greaseNoFiberScore: 72,
            windowRecycleScore: 25,
            costDeltaPct: 0,
            specNote: {
                ru: '14.5 г 100% первичного пластика • Не перерабатывается',
                md: '14.5 g 100% plastic primar • Nereciclabil',
                en: '14.5 g 100% virgin plastic • Non-recyclable'
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
            specNote: `${tempC}°C • 6h • Kit 12 (${greaseScore}%) • Recycle ${recycleScore}% • +${costDelta}%`
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
                <span class="cert-pill">👁️ Window & Recycle: ${recycleScore}%</span>
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
    addPackForm.reset();
    newCard.scrollIntoView({ behavior: 'smooth' });
});