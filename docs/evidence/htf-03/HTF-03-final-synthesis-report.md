# HTF-03 — итоговый пакет решений по упаковке

Рынок: Румыния. Срез: **2026-09-26**. Статус: **готово для прототипа как evidence dataset; закупка и применение не одобрены**.

Для целой курицы (P1) первым следует квалифицировать **C1 Gaia**. Для крыльев/бёдер (P2), картофеля/овощей (P3) и мясных порций (P4) — **C5 BIOPAP LC SI-14 с точно выбранной прозрачной плёнкой**. Практичный местный путь к образцам для порций — **C6-RO-P: алюминиевый 729 + прозрачная крышка a-680681**. Это порядок квалификации: ни один вариант пока не прошёл все обязательные проверки.

Если упаковка действительно должна находиться в печи при 250°C, отдельный путь — алюминиевое тело **C6-RO-H (e-pui225)** или **C6-EU (0192110201)**, затем прозрачная крышка при допустимой температуре после печи. У первого нет подтверждённой прозрачной крышки, у второго нет подтверждённой поставки полного комплекта в Румынию. Для обоих неизвестна допустимая длительность при заданном режиме.

## Что показывать в прототипе

| Продукт | Первый путь | Статус сейчас | Число для основной карточки | Условие реального допуска |
|---|---|---|---|---|
| P1 целая курица | C1 Gaia | QUALIFICATION REQUIRED | Масса сценария ≈19.7 г, диапазон 14.6–26.6; фактический первичный пластик UNKNOWN | Размер/SKU, BOM, жирная пища/6h, швы, цена и поставка RO |
| P2 крылья/бёдра | C5 SI-14 + film | QUALIFICATION REQUIRED | Масса ≈26.6 г, 23.4–30.2; условный plastic-budget только в деталях | Порция/вместимость, точная плёнка, DoC/миграция, 6h, поставка |
| P3 картофель/овощи | C5 SI-14 + film | QUALIFICATION REQUIRED | Тот же сценарий; это не отдельное измерение порции | Конденсат, текстура, видимость и полный режим хранения |
| P4 горячие мясные порции | C5 SI-14 + film | QUALIFICATION REQUIRED | Тот же сценарий с явной неопределённостью | Жир/соль/соус, утечки, миграция и удержание температуры |

Все оценки относятся к одной номинальной упаковке. Реальные габариты, масса продукта и headspace Profi не предоставлены, поэтому одинаковая полезная функция сравниваемых форматов ещё не доказана. В JSON находятся **48 записей**: 4 продукта × 6 кандидатов × 2 workflow, каждая с шестью обязательными проверками. `UNKNOWN` не компенсируется экологическим показателем.

## Базы сравнения

- **B1-OBSERVED:** пакет Profi, пластик, фактически 100% первичного / 0% вторичного пластика по уточнению пользователя. Полимер, масса, размер, толщина, SKU, цена и годовой объём неизвестны.
- **B1-ESTIMATED:** отдельный сценарий PET/PA-подобного пакета по геометрии местного аналога и коммерческим толщинам. **2.59–12.46 г, central 6.50 г, VERY_LOW**. Это не доверительный интервал и не измерение Profi; иной полимер/размер может выйти за границы.
- **B2:** `UNRESOLVED`. Не найдено сочетание точного полностью пластикового virgin-пакета и подтверждённого маршрута в Румынию. Бумага+PP и американский продукт не заменяют B2.
- **B3:** Barleta 128002, бумага+PP, 18×7×35 см; **0.37026 RON/шт с НДС**, без доставки. Масса модели 10.76–13.30 г, central 11.66 г. Это рыночный ориентир, не упаковка Profi. [S17](https://magazin.barleta.ro/produs/punga-rotiserie-medie-18-x-7-x-35-cm-1000-buc/)

## Итоговая таблица для прототипа

EST. = расчёт с диапазоном. Положительная virgin reduction означает меньше первичного пластика; отрицательная — больше. Все проценты ниже условны и рассчитаны против **B1-ESTIMATED**. `budget` для C1/C5 считает всю целлюлозную плёнку пластиком при допущении отсутствия другого пластика в теле; это не установленный состав.

| Candidate | Best use | Romania | Mass g | Virgin plastic g | Virgin reduction | Recycled % | Renewable % | Peak temp | 6h hold | Unit cost RON | Cost delta | EOL Romania | Confidence |
|---|---|---|---:|---:|---:|---:|---:|---|---|---:|---:|---|---|
| C1 | P1 | RFQ | 14.55–26.59; central 19.72 EST. | 8.00–14.35; central 10.70 EST. budget; actual UNKNOWN | -453.7–35.8; central -64.6 EST.% | UNKNOWN | UNKNOWN | UNKNOWN numeric | UNKNOWN | UNKNOWN | UNKNOWN | operator acceptance UNKNOWN | LOW; model VERY_LOW |
| C2 | P1/P2/P4 comparator | RFQ | 4.25–10.19; central 5.74 EST. | 4.25–10.19; central 5.74 EST. | -293.3–65.9; central 11.7 EST.% | UNKNOWN | UNKNOWN | 210°C; duration UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | operator acceptance UNKNOWN | LOW; model VERY_LOW |
| C3 | P1/P2/P4 comparator | RFQ | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | 220°C platform; duration UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | operator acceptance UNKNOWN | LOW; model VERY_LOW |
| C4 | P2–P4 | inactive, inherited | 63.95–89.71; central 73.32 EST. | 25.28–54.14; central 36.20 EST. | -1988.9–-102.9; central -457.0 EST.% | 39.7–60.5% EST.; body 69–75% inherited | UNKNOWN | body 220°C inherited; duration UNKNOWN | UNKNOWN | UNKNOWN system; lid 1.24 ex VAT DERIVED | UNKNOWN | operator acceptance UNKNOWN | LOW; model VERY_LOW |
| C5 | P2–P4 | ReVive 2021 only / RFQ | 23.38–30.19; central 26.58 EST. | 2.23–4.34; central 3.08 EST. budget; actual UNKNOWN | -67.6–82.1; central 52.5 EST.% | UNKNOWN | UNKNOWN | 175/185°C ×60m CONFLICT, body/family | 90°C/6h FAMILY ONLY | UNKNOWN system; body 1.70 VAT unresolved DERIVED | UNKNOWN | operator acceptance UNKNOWN | mass LOW; saving VERY_LOW |
| C6 | P2–P4 | current local listings | 24.77–74.25; central 43.90 EST. | 9.21–38.94; central 19.20 EST. | -1402.4–26.1; central -195.5 EST.% | UNKNOWN | UNKNOWN | RO-P UNKNOWN; RO-H body 280°C, EU body 350°C; duration UNKNOWN | UNKNOWN | 1.15–1.29; central 1.15 EST. | 210.2–248.8; central 210.2 EST. vs B3; B1 UNKNOWN | operator acceptance UNKNOWN | LOW; model VERY_LOW |

Отсутствие численного renewable/recycled процента не означает ноль. Для C4 таблица показывает whole-pack модель при virgin-крышке; исторический PCR относится только к телу. Для C6 в основной строке используется только местный порционный комплект RO-P, а пределы 280/350°C подписаны как отдельные конфигурации.

## Что означает количественный результат

В модели C5 условный plastic-budget равен **2.23–4.34 г, central 3.08 г**. Против B1 это **−67.6…+82.1% reduction, central +52.5%**; эквивалентно от 68% больше до 82% меньше первичного пластика. Диапазон пересекает ноль: обещать сокращение нельзя. Тело считается plastic-free по семейному заявлению; вся плёнка и вспомогательный материал считаются virgin plastic консервативно. Точный состав может изменить расчёт. [S11](https://www.boostyup.com/wp-content/uploads/2024/05/Gamme-contenants-BIOPAP-LC.pdf), [S13](https://www.biopap.com/en/sealing-systems/biopap-trays-thermo-sealing-system-with-film-and-modular-mould/), [S15](https://www.biopap.com/en/category/news/page/3/), [S31](https://doi.org/10.1002/pts.70020)

C1 может быть полезной возобновляемой архитектурой, однако неизвестные покрытия не позволяют честно вычислить фактический первичный пластик. Консервативный сценарий «весь внутренний лайнер = пластик» даёт central −64.6% reduction и очень широкий диапазон; это не доказательство ухудшения или выигрыша Gaia. C2 — технический прозрачный компаратор, не доказанный low-plastic вариант. В C4 даже исторический PCR не устраняет большую массу тела и крышки: весь модельный интервал virgin-mass выше B1. У местного C6 толстая прозрачная крышка также может съесть предполагаемый выигрыш; её нужно взвесить.

Калькулятор использует независимые крайние значения для консервативного диапазона. Центральное значение — именованный сценарий, не среднее распределения. В [estimation ledger](HTF-03-estimation-ledger.md) сохранены все формулы, исходные значения, допущения и чувствительность; машиночитаемые выражения пересчитываются валидатором.

## Стоимость и возможность закупки

Для C6-RO-P опубликованные компоненты дают **1.1485–1.2915 RON/комплект с НДС**, central 1.1485. Диапазон использует текущую акцию/обычную цену тела. Модель заказа 1400 комплектов превышает порог бесплатной доставки у каждого из двух продавцов. Совместимость, текущий остаток и окончательный счёт не подтверждены. Это **+210.2…+248.8% к B3**, выше целевых +10–15%. К Profi дельта неизвестна: нет честно оцениваемой исходной закупочной цены. [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html), [S23](https://www.e-ambalaj.ro/termeni-si-conditii/)

WePack 803261+803262 стоит **2.284 RON/пара с НДС без доставки** по арифметике листинга; прозрачность крышки неизвестна. Это не цена прозрачной системы. У BIOPAP восстановлена цена EU-тела 251.79 EUR/780, но VAT basis текущей страницы не установлена; цену плёнки, станка и доставки нельзя незаметно считать включёнными. Для C1–C5 отсутствующие коммерческие параметры не заменены произвольной наценкой. RFQ в закупочном документе ограничен конкретными недостающими полями. [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery), [S12](https://mixpack.ee/en/product/biopap-easy-catering-si-14-pakis-780-tk/)

## Температура, безопасность и EOL

Рабочая модель — приготовление до упаковки, затем hot hold до шести часов; это ASSUMED, не подтверждённый режим Profi. Число 250°C проверяется отдельно. Ни температура плавления, ни peak rating не подтверждают длительное хранение, миграцию или микробиологическую безопасность. Семейное LC 6h90 не переносится автоматически на выбранную плёнку, 6h100 или конкретное блюдо. [S09](https://www.biopap.com/en/product-lines/compostable-efficient-and-safe-packaging-solutions-for-sustainable-collective-catering/)

Для каждого варианта раздельно сохранены design for recycling, certification, Romanian collection/sorting/reprocessing/composting и likely route. Без оператора маршрут — только INFERENCE; обещания «перерабатывается/компостируется в Румынии» отсутствуют. Национальный EEA-профиль служит контекстом, не доказательством судьбы конкретной упаковки; его устаревшее описание DRS не используется. [S37](https://www.eea.europa.eu/en/topics/in-depth/waste-and-recycling/municipal-and-packaging-waste-management-country-profiles-2025/ro-municipal-waste-factsheet.pdf/@@download/file)

Материальный CO₂e рассчитан лишь в условных PET/PA/primary-Al сценариях, с явной границей «сырьё/смола». Для PET/PA публичные сопоставимые факторы оказались историческими; ±30% — чувствительность аналитика, не статистический интервал. Для бумаги/целлюлозной композиции подходящего полного набора факторов нет. Полный product LCA и экологическое превосходство не заявляются; все CO₂-сценарии скрыты в публичном UI. [S34](https://plasticsrecycling.org/wp-content/uploads/2024/08/APR-Recycled-vs-Virgin-LCA-May2020.pdf), [S35](https://www.basf.com/dam/jcr%3A9b1b4707-e75e-3a84-a545-ef49dd719807/basf/www/hk/documents/en/products-industries/textile-ultramid/Eng_MassBalance_final.pdf), [S36](https://european-aluminium.eu/wp-content/uploads/2024/11/06-11-24-European-Aluminium-Environmental-Profile-Report-launch-PR.pdf), [S39](https://plasticseurope.org/sustainability/circularity/life-cycle-thinking/eco-profiles-set/)

## Карточки кандидатов

### C1 — Sacma B.Life Gaia

**Производитель / конфигурация:** Sacma; UNKNOWN.
**Commercial maturity:** Commercial product/family; no independently verified TRL or operational readiness at Profi.

**Применение / режим:** P1: first renewable whole-chicken qualification path; P2/P4 only after selecting a smaller bag. POST_COOK → HOT_HOLD.
**Румыния / поставщик:** QUOTE_REQUIRED_ROMANIA — ASSUMED; Sacma direct RFQ.
**Наблюдаемая цена:** UNKNOWN; public exact finished-system price not found.
**Оценка RO:** UNKNOWN RON/pack. **Order unit:** UNKNOWN; industrial MOQ UNKNOWN. **Lead:** UNKNOWN.

**Dimensions / capacity:** UNKNOWN; UNKNOWN ml.
**Total mass:** 14.55–26.59; central 19.72 EST. g. Exact complete total: UNKNOWN.
**Plastic / virgin plastic:** UNKNOWN / UNKNOWN g.
**Recycled / renewable fraction (0–1):** UNKNOWN / UNKNOWN.
**Отдельный сценарий:** Conservative liner-as-plastic accounting scenario; actual plastic mass UNKNOWN; budget 8.00–14.35; central 10.70 EST. g.

**Peak / duration / mode:** UNKNOWN for selected complete configuration.
**6h hold:** UNKNOWN
**Grease/leak:** Supplier positions Gaia for rotisserie/greasy food; exact six-hour leak performance unknown. — VERIFIED (scope below)
**Food contact / DoC / migration / NIAS / PFAS / actual 6h food safety:** UNKNOWN for exact nominated use; not mathematically estimated.
**Прозрачность:** True — VERIFIED (scope below); NatureFlex cellulosic liner/window — VERIFIED (scope below). Viewing area and exact thermal/anti-fog qualification UNKNOWN.
**Romania EOL:** Conservatively plan residual waste for greasy composite bags until the local operator accepts this configuration. — INFERENCE.
**Material-only CO₂e:** UNKNOWN kg/pack; not a full LCA; no public comparative carbon claim.
**Evidence / confidence:** exactness is field-specific; LOW; engineering savings scenarios VERY_LOW. Sources: [S01](https://sacmaspa.it/en/b-life-collection/), [S02](https://www.futamuragroup.com/Futamura/media/Futamura/Careers/SACMA-Press-Release-EN.pdf).

**Ограничения:** A cellulosic or compostable film cannot automatically be assigned zero plastic/coating mass. No numeric maximum temperature or six-hour duration. No validated Romania delivery.

**Следующее действие:** Obtain exact Gaia size, layer GSM/gauge and closure BOM; weigh 10 empty complete packs. Request fatty-food hot-fill/6h dossier and window/seam leak results. Get Romanian delivered quotation and sample availability.

### C2 — Sira-Cook Siralon 21

**Производитель / конфигурация:** Sirane; Siralon 21 nylon grade; bag size, gauge and closure to be nominated — VERIFIED (scope below).
**Commercial maturity:** Commercial product/family; no independently verified TRL or operational readiness at Profi.

**Применение / режим:** P1/P2/P4 clear cook-in comparator up to published 210 C, duration to qualify. COOK_IN → POST_COOK → HOT_HOLD.
**Румыния / поставщик:** QUOTE_REQUIRED_ROMANIA — ASSUMED; Sirane direct RFQ.
**Наблюдаемая цена:** UNKNOWN; public exact finished-system price not found.
**Оценка RO:** UNKNOWN RON/pack. **Order unit:** UNKNOWN; industrial MOQ UNKNOWN. **Lead:** UNKNOWN.

**Dimensions / capacity:** UNKNOWN; UNKNOWN ml.
**Total mass:** 4.25–10.19; central 5.74 EST. g. Exact complete total: UNKNOWN.
**Plastic / virgin plastic:** 4.25–10.19; central 5.74 EST. / 4.25–10.19; central 5.74 EST. g.
**Recycled / renewable fraction (0–1):** UNKNOWN / UNKNOWN.

**Peak / duration / mode:** 210 VERIFIED (scope below) C / UNKNOWN min / COOK_IN / Siralon 21 grade
**6h hold:** UNKNOWN
**Grease/leak:** UNKNOWN
**Food contact / DoC / migration / NIAS / PFAS / actual 6h food safety:** UNKNOWN for exact nominated use; not mathematically estimated.
**Прозрачность:** True — VERIFIED (scope below); Clear nylon — VERIFIED (scope below). Viewing area and exact thermal/anti-fog qualification UNKNOWN.
**Romania EOL:** Residual route likely unless a specialist film collector explicitly accepts it. — INFERENCE.
**Material-only CO₂e:** 0.0199–0.0888; central 0.0384 EST. kg/pack; not a full LCA; no public comparative carbon claim.
**Evidence / confidence:** exactness is field-specific; LOW; engineering savings scenarios VERY_LOW. Sources: [S03](https://sirane.com/product/oven-bags-and-ovenable-films-nylon/).

**Ограничения:** Nylon, not 80% recycled polyester. Peak 210 C is below literal 250 C branch. No six-hour hot-hold or Romania supply evidence.

**Следующее действие:** Nominate exact Siralon 21 bag dimensions/gauge/closure and time-temperature use. Obtain recycled content, DoC/migration, six-hour hold evidence and delivered Romania quotation.

### C3 — CRYOVAC Oven Ease current EMEA/UK

**Производитель / конфигурация:** Sealed Air; EMEA/UK Oven Ease platform; exact current grade unresolved — VERIFIED (scope below).
**Commercial maturity:** Commercial product/family; no independently verified TRL or operational readiness at Profi.

**Применение / режим:** P1/P2/P4 cook-in comparator after manufacturer nominates current EU grade. COOK_IN → POST_COOK → HOT_HOLD.
**Румыния / поставщик:** QUOTE_REQUIRED_ROMANIA — ASSUMED; Sealed Air EMEA sales.
**Наблюдаемая цена:** UNKNOWN; public exact finished-system price not found.
**Оценка RO:** UNKNOWN RON/pack. **Order unit:** UNKNOWN; industrial MOQ UNKNOWN. **Lead:** UNKNOWN.

**Dimensions / capacity:** UNKNOWN; UNKNOWN ml.
**Total mass:** UNKNOWN g. Exact complete total: UNKNOWN.
**Plastic / virgin plastic:** UNKNOWN / UNKNOWN g.
**Recycled / renewable fraction (0–1):** UNKNOWN / UNKNOWN.

**Peak / duration / mode:** 220 VERIFIED (scope below) C / UNKNOWN min / COOK_IN / EMEA/UK platform
**6h hold:** UNKNOWN
**Grease/leak:** UNKNOWN
**Food contact / DoC / migration / NIAS / PFAS / actual 6h food safety:** UNKNOWN for exact nominated use; not mathematically estimated.
**Прозрачность:** True — ASSUMED; UNKNOWN. Viewing area and exact thermal/anti-fog qualification UNKNOWN.
**Romania EOL:** Residual route provisionally assumed for unqualified multilayer bag. — INFERENCE.
**Material-only CO₂e:** UNKNOWN kg/pack; not a full LCA; no public comparative carbon claim.
**Evidence / confidence:** exactness is field-specific; LOW; engineering savings scenarios VERY_LOW. Sources: [S04](https://www.sealedair.com/uk/products/food-packaging/vacuum-shrink-bags/food-service-ovenable-shrink-bags).

**Ограничения:** Do not inherit current identity from HC2440 (2010). Do not transfer US 204 C / four-hour grade, gauges, price or layer structure. No defensible complete mass bounds without selecting current EU construction.

**Следующее действие:** Ask manufacturer to nominate current EU article, all layers/gauge/dimensions and closure. Obtain exact time/temp, migration, hold, virgin/PCR and Romania delivered quote.

### C4 — Evolve CPET C 2227-2AB + K5227-4

**Производитель / конфигурация:** Faerch; 2227022094 + 5227005011 — ASSUMED.
**Commercial maturity:** Historical body marked Inactive in R3; current availability unresolved. Successor requires new record.

**Применение / режим:** P2/P3/P4 historical rigid-tray comparator; not a currently orderable approved system. OVEN_BODY_ONLY → POST_OVEN_LID → POST_COOK → HOT_HOLD.
**Румыния / поставщик:** NOT_AVAILABLE — ASSUMED; No verified current complete system.
**Наблюдаемая цена:** 1.76–1.76; central 1.76 DERIVED DKK/unit; VAT EXCLUDED; 5227005011
**Оценка RO:** UNKNOWN RON/pack. **Order unit:** UNKNOWN; industrial MOQ UNKNOWN. **Lead:** UNKNOWN.

**Dimensions / capacity:** [227, 178, 43] — ASSUMED; 1005 ASSUMED ml.
**Total mass:** 63.95–89.71; central 73.32 EST. g. Exact complete total: UNKNOWN.
**Plastic / virgin plastic:** 63.95–89.71; central 73.32 EST. / 25.28–54.14; central 36.20 EST. g.
**Recycled / renewable fraction (0–1):** 0.397–0.605; central 0.506 EST. / UNKNOWN.

**Peak / duration / mode:** 220 ASSUMED C / UNKNOWN min / OVEN_BODY_ONLY / 2227022094 body
**6h hold:** UNKNOWN
**Grease/leak:** UNKNOWN
**Food contact / DoC / migration / NIAS / PFAS / actual 6h food safety:** UNKNOWN for exact nominated use; not mathematically estimated.
**Прозрачность:** True — VERIFIED (scope below); Clear APET/PET — VERIFIED (scope below). Viewing area and exact thermal/anti-fog qualification UNKNOWN.
**Romania EOL:** Collection as plastic depends on local rules; successful tray sorting/reprocessing not established. No bottle-to-tray inference. — INFERENCE.
**Material-only CO₂e:** 0.0641–0.1990; central 0.1145 EST. kg/pack; not a full LCA; no public comparative carbon claim.
**Evidence / confidence:** exactness is field-specific; LOW; engineering savings scenarios VERY_LOW. Sources: [S05](https://www.faerch.com/da/produkt/c-2227-2ab-evolve-cpet/2227022094), [S06](https://www.mml.dk/laag-til-plastbakker-2227-flat-372stk-kar-klar-a-pet).

**Ограничения:** Body source not reverified; never overwrite with 2227-2K / 31 g. Body PCR is not whole-pack PCR. Clear lid has unknown heat limit; no 250 C system.

**Следующее действие:** Ask Faerch to confirm archived article data and nominate a current successor separately. Obtain exact compatible lid weight/PCR/temperature and Romania quote; retain old article unchanged.

### C5 — BIOPAP LC SI-14 + clear sealing film

**Производитель / конфигурация:** BIOPAP; PCTSI14000LC31019 (LC SI-14) + manufacturer-nominated transparent film SKU pending — VERIFIED (scope below).
**Commercial maturity:** Commercial product/family; no independently verified TRL or operational readiness at Profi.

**Применение / режим:** P2/P3/P4: first portion hot-hold qualification path. POST_COOK → HOT_HOLD.
**Румыния / поставщик:** ROMANIA_DISTRIBUTOR_HISTORICAL — ASSUMED; ReVive historical; BIOPAP / Mixpack RFQ now.
**Наблюдаемая цена:** 0.32–0.32; central 0.32 DERIVED EUR/unit; VAT NOT_CONFIRMED_CURRENT; PCTSI14000LC31019 / SI-14
**Оценка RO:** UNKNOWN RON/pack. **Order unit:** 780 VERIFIED (scope below); industrial MOQ UNKNOWN. **Lead:** UNKNOWN.

**Dimensions / capacity:** [190, 247, 37] — VERIFIED (scope below); 1240 VERIFIED (scope below) ml.
**Total mass:** 23.38–30.19; central 26.58 EST. g. Exact complete total: UNKNOWN.
**Plastic / virgin plastic:** UNKNOWN / UNKNOWN g.
**Recycled / renewable fraction (0–1):** UNKNOWN / UNKNOWN.
**Отдельный сценарий:** Conditional budget: tray assumed plastic-free; entire film counted as virgin plastic; budget 2.23–4.34; central 3.08 EST. g.

**Peak / duration / mode:** 185 VERIFIED (scope below) C / 60 VERIFIED (scope below) min / OVEN_BODY_ONLY / LC family body; 175 VERIFIED (scope below) C / 60 VERIFIED (scope below) min / OVEN_BODY_ONLY / LC family body; 90 VERIFIED (scope below) C / 360 VERIFIED (scope below) min / HOT_HOLD / LC family hot-meal system; 100 VERIFIED (scope below) C / 300 VERIFIED (scope below) min / HOT_HOLD / LC family hot-meal system
**6h hold:** {"temperature_c": 90, "duration_min": 360} — VERIFIED (scope below)
**Grease/leak:** UNKNOWN
**Food contact / DoC / migration / NIAS / PFAS / actual 6h food safety:** UNKNOWN for exact nominated use; not mathematically estimated.
**Прозрачность:** True — VERIFIED (scope below); Compatible compostable transparent film; exact grade pending — VERIFIED (scope below). Viewing area and exact thermal/anti-fog qualification UNKNOWN.
**Romania EOL:** Residual waste is conservative default without an accepting separate biowaste/compost operator; do not claim Romanian composting is impossible. — INFERENCE.
**Material-only CO₂e:** UNKNOWN kg/pack; not a full LCA; no public comparative carbon claim.
**Evidence / confidence:** exactness is field-specific; LOW; engineering savings scenarios VERY_LOW. Sources: [S07](https://www.biopap.com/en/product-lines/), [S09](https://www.biopap.com/en/product-lines/compostable-efficient-and-safe-packaging-solutions-for-sustainable-collective-catering/), [S10](https://www.biopap.com/wp-content/uploads/2021/05/BIOPAP_Tabella_DimensioniSitoQR_ENG.pdf), [S11](https://www.boostyup.com/wp-content/uploads/2024/05/Gamme-contenants-BIOPAP-LC.pdf), [S13](https://www.biopap.com/en/sealing-systems/biopap-trays-thermo-sealing-system-with-film-and-modular-mould/).

**Ограничения:** 175/185 C conflict remains open. Film SKU, gauge, coatings and complete-system time/temp dossier missing. Six-hour family claim does not verify food safety or selected seal. ReVive lead is historical.

**Следующее действие:** Ask BIOPAP to resolve 175 vs 185 C and nominate exact film/reel width for SI-14. Obtain tray+film DoC, fatty-food migration for actual hot-fill and 6h cabinet profile, leak/steam/anti-fog results. Confirm current ReVive relationship or direct Romania delivery and complete price including sealer cost if needed.

### C6 — Aluminium body + clear post-oven lid

**Производитель / конфигурация:** Configuration-specific; Romanian sellers and Plus Pack reference; C6-RO-P: e-7291 body (E-ambalaj) + a-680681 clear lid (La Habibi) — ASSUMED.
**Commercial maturity:** Commercial product/family; no independently verified TRL or operational readiness at Profi.

**Применение / режим:** P2/P3/P4 local physical-sample alternative; whole-chicken/oven fallback uses separate configurations. POST_COOK → HOT_HOLD → OVEN_BODY_ONLY → POST_OVEN_LID.
**Румыния / поставщик:** ROMANIA_DISTRIBUTOR_CURRENT — VERIFIED (scope below); E-ambalaj body + La Habibi clear lid.
**Наблюдаемая цена:** 0.76–0.76; central 0.76 DERIVED RON/unit; VAT INCLUDED; e-7291 / 729; 0.39–0.39; central 0.39 DERIVED RON/unit; VAT INCLUDED; a-680681
**Оценка RO:** 1.15–1.29; central 1.15 EST. RON/pack. **Order unit:** 100 VERIFIED (scope below); industrial MOQ UNKNOWN. **Lead:** Body: 4-5 working days; lid: 24-48 h (seller estimates). — VERIFIED (scope below).

**Dimensions / capacity:** [220, 170, 35] — VERIFIED (scope below); 1125 VERIFIED (scope below) ml.
**Total mass:** 24.77–74.25; central 43.90 EST. g. Exact complete total: UNKNOWN.
**Plastic / virgin plastic:** 9.21–38.94; central 19.20 EST. / 9.21–38.94; central 19.20 EST. g.
**Recycled / renewable fraction (0–1):** UNKNOWN / UNKNOWN.

**Peak / duration / mode:** UNKNOWN for selected complete configuration.
**6h hold:** UNKNOWN
**Grease/leak:** UNKNOWN
**Food contact / DoC / migration / NIAS / PFAS / actual 6h food safety:** UNKNOWN for exact nominated use; not mathematically estimated.
**Прозрачность:** True — VERIFIED (scope below); Transparent plastic; polymer unspecified — VERIFIED (scope below). Viewing area and exact thermal/anti-fog qualification UNKNOWN.
**Romania EOL:** Empty separated aluminium may enter metal collection if locally accepted; dirty body and unknown lid route need operator confirmation. No recovery-rate claim. — INFERENCE.
**Material-only CO₂e:** 0.0830–0.4021; central 0.1984 EST. kg/pack; not a full LCA; no public comparative carbon claim.
**Evidence / confidence:** exactness is field-specific; LOW; engineering savings scenarios VERY_LOW. Sources: [S18](https://www.wepack.ro/p/tava-aluminiu-pentru-pui-406-l-tava-aluminiu-copt-pui-406-l-tava-unica-folosinta-ambalaje-restaurante-fast-food-delivery), [S19](https://www.e-ambalaj.ro/produs/caserole-din-aluminiu-pentru-pui-la-rotisor/), [S20](https://www.e-ambalaj.ro/produs/caserole-necompartimentate-din-aluminiu-729/), [S22](https://lahabibi.ro/caserole-aluminiu/4296-capac-caserole-680681729-100bucset.html), [S24](https://assets.ccntr.pbsnetwork.eu/assets/5790002196140/ts_dk_1731903_00_iss_28062021.pdf).

**Ограничения:** No numerical oven temperature for selected 729 body. 280 C belongs to e-pui225, 350 C to Plus Pack only. Clear lid polymer/temperature/anti-fog and cross-seller fit unverified. Whole-chicken WePack lid transparency is unknown. Aluminium mass and recycled share must not be borrowed as exact Romanian properties.

**Следующее действие:** Obtain paired body/lid samples and confirm 729 fit, lid material and hot-fill/6h limit. For literal 250 C, select e-pui225 or nominated Plus Pack body and obtain duration/fatty-salty-food dossier; clear lid applied only after oven at validated food temperature. Weigh both components; confirm alloy/coating/PCR, stock and invoice quote.

## Инженерный контракт и проверка

`HTF-03-canonical-packaging-dataset.json` — полная доказательная модель с источниками, архивом старых утверждений, 136 field-group reconciliations, 21 спором, формулами и gate matrix. `HTF-03-prototype-display-dataset.json` — безопасная проекция для нового адаптера. Существующий runtime не изменён. Сначала применяются обязательные gates, затем сравнение прошедших вариантов; сейчас множество прошедших пусто. При неизвестных полях нельзя выдавать procurement approval.

Проверка из корня репозитория: `python scripts/validate_htf03.py --self-test`. Валидатор проверяет ссылки, диапазоны, формулы, массы, тождества baseline, BOM, SKU/исторические границы, температуру/длительность/hold, страновые основания и безопасную проекцию. Встроенные отрицательные примеры проверяют отказ при подменах; равенство plastic=total допускается.

**Фактический результат проверки 2026-09-26:** PASS — 6 кандидатов, 3 различные базы, 126 ссылочных записей (включая архивные указатели), 63 пересчитанные формулы, 48 gate records. Все 26 отрицательных примеров отклонены; контроль plastic=total принят. Для семи файлов пакета и валидатора также выполнен `git diff --no-index --check` без замечаний. Это проверка данных и арифметики, не физических свойств или безопасности упаковки.

Файлы пакета: [canonical JSON](HTF-03-canonical-packaging-dataset.json), [UI JSON](HTF-03-prototype-display-dataset.json), [estimation ledger](HTF-03-estimation-ledger.md), [source ledger](HTF-03-source-ledger.md), [conflict resolution](HTF-03-conflict-resolution.md), [Romania procurement](HTF-03-romania-procurement.md).

## Pitch-safe формулировки

| Claim | Evidence | Confidence | Wording |
|---|---|---|---|
| Prioritised physical concepts for four hot-food use cases | 48 product/candidate/workflow gate records; no fully qualified survivor | MEDIUM | For whole chicken we prioritise Gaia qualification; for portions, BIOPAP LC SI-14. A locally listed aluminium option provides a practical sample path. All require exact-use qualification. |
| Estimated baseline mass | E002 | VERY_LOW | Our current PET/PA-like bag scenario gives about 2.6-12.5 g, central 6.5 g. We have not weighed the Profi pack. |
| BIOPAP portion-pack mass | E017 | LOW | The SI-14 tray has a historical manufacturer nominal mass of 23.5 g. With a modelled clear film and allowance, the pack is approximately 23.4-30.2 g, central 26.6 g. |
| Conditional virgin-plastic accounting | E051 | VERY_LOW | If the LC tray is plastic-free and we conservatively count the entire clear film as virgin plastic, the model gives about 53% central reduction against an estimated bag. Its range runs from 68% more to 82% less, so no reduction is verified. |
| Local component budget | E021 | MEDIUM | The listed Romanian portion tray and transparent lid cost about 1.15-1.29 RON including VAT per pair under our order scenario; fit and hot-hold suitability still need testing. |
| Six-hour lead | S09 | MEDIUM | BIOPAP publishes a six-hour, 90 C claim for its LC family. The exact tray-film-food combination and food safety have not been validated for Profi. |

## Что требуется до реальной закупки

- Provider: weigh empty complete B1 packs, identify polymer/size/gauge/SKU, supply same-VAT-basis invoice and annual units.
- Provider: confirm post-cook versus package-in-oven, actual hot-fill temperature, cabinet profile/duration and product fill geometry.
- Supplier: nominate exact body, viewing component, closure and ancillary BOM, current masses/PCR/renewable shares and source documents.
- Supplier: exact selected-use DoC/migration and safety-relevant substance statements; no calculated legal or food-safety pass.
- Physical test: fit, sealing, fatty-food leakage, steam/anti-fog, handling and six-hour organoleptic/microbiological validation by the responsible team.
- Procurement: exact paired SKU stock, delivery to Romanian site, current VAT/freight quote, MOQ and lead time.
- Waste operator: collection, sorting and reprocessing/composting acceptance for the actual greasy tray/bag/lid combination.

Практическое решение на этом срезе: **Gaia — первый путь для P1, BIOPAP SI-14 — для P2–P4, местный C6 — путь к физическим образцам и отдельной алюминиевой oven-body ветке**. В демо показывать массу и условные диапазоны, статус QUALIFICATION REQUIRED и точный список проверок. Подтверждённый процент экономии и допуск к эксплуатации пока отсутствуют.
