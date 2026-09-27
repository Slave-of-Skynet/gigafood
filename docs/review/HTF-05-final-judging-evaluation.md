# Оценка проекта GigaFood / PackShift по критериям Deeptech Gigahack 2026

**Дата:** 2026-09-27 (UTC)  
**Ветка:** `arena/01a0e295-gigafood` @ `2c08b8e` (main)  
**Аудитор:** Arena Agent (автоматизированная верификация + ручной анализ кода, данных, UI, тестов)  
**Базовые артефакты:** `backend/tests` 165 passed, `scripts/validate_htf03.py` PASS, `scripts/verify.sh` + `demo.sh --check` (CI), `docs/review/QA-R3C`, `APR-HT1`, `NCP-HT2-final-pitch-packet`, `HTF-03-final-synthesis`, `HTF-05-universal-grill-oven-pouch-spec`

---

## 0. Краткое резюме и соответствие челленджу

**Челлендж:** Снизить environmental impact упаковки в ритейле, сохранив защиту продукта, food safety, операционную эффективность и affordability. **Приоритет №1:** снижение virgin plastic (total minus recycled), желательно близко к 100% recycled где безопасно.

**Что построено:**
1. **Физическая упаковка (primary по VLD-MR1):**
   - **HTF-05 Товар 1 (основной):** Foil Grill & Oven Bag — Heavy Duty алюминиевая фольга (корпус) + High-Temp BOPET окно (2.8г пластика), термокомпрессионный бесклеевой шов aPET mechanical interlock, self-venting микро-каналы, ручной отрыв Peel-away за 2с без инструментов (фактор Румынии), 100% раздельная переработка металл/пластик. Температура до 250°C за счет steam cooling (пленка ≤110–130°C), масло-жиро-стойкость алюминия 100%, опт $0.15–0.35 (~0.70–1.60 RON).
   - **HTF-05 Товар 2 (альтернативный лоток):** Smoothwall aluminium 60–70мкм + CPET мембрана / экспериментальный комбо с силиконовой LSR крышкой (-40..+250°C, 500–1000 циклов, Zero CAPEX на лоток €0.025–0.045, крышка €0.20–0.34 при 5–10k, оснастка €2–3.5k). Цена комплекта €0.23–0.38 (~1.15–1.90 RON) опт, €2.9–4.8 розница. Лазерная микроперфорация для пара, Easy-Peel.
   - Оба варианта строго 2 материала, без клея, без PFAS, дизайн для PPWR.
2. **Цифровой слой PackShift (официально разрешен как Digital & Data Solutions):**
   - A-core: детерминированный расчет virgin plastic = mass × (1 - recycled_fraction), provenance (ORIGIN/VERIFICATION), fail-closed, PUBLIC vs ILLUSTRATIVE vs PROVIDER.
   - Selection MVP: curated portfolio Faerch (PP baseline 26.29г 0% PCR, CPET candidate 21.38г PCR UNKNOWN/NON_POINT, APET 21.48г 70°C ceiling BLOCKED), comparability, component_boundary, EXACT_POINT_VALUE guard (отказ от "up to 70%").
   - Recommendation Runtime HTF-03: 4 продукта (P1 целая курица 1.0–1.3кг, P2 крылья/бедра, P3 картофель/овощи, P4 мясные порции) × 2 workflow (POST_COOK_HOT_HOLD_6H и LITERAL_OVEN_250C_THEN_HOLD) × 6 кандидатов (C1 Gaia paper+NatureFlex, C2 Siralon 210°C nylon, C3 Oven Ease 220°C, C4 CPET 73г heavy, C5 BIOPAP LC SI-14 cellulose 1240мл, C6 aluminium) = **48 gate rows**, 6 non-compensatory gates (physical_fit, food_contact, thermal_workflow, grease_leak, transparent_viewing, procurement), **0 qualified survivors / 28 QUALIFICATION REQUIRED / 20 BLOCKED**.
   - Economic Scenario: POST /scenarios/{id}/economics, USER_PROVIDED annual_units, cost_per_unit, transition cost → annual spend, delta, first-year delta, annual virgin reduction kg, €/kg avoided, с явным THEORETICAL / NON-ACTIONABLE для BLOCKED.
   - UI: 4 режима — universal_pouch (default в этом коммите), recommendation journey, selection, comparison; pentagon radar, anatomy diagram, dossier, compliance modal, calculator.

**Официальный Hot Food Annex (опциональный):**
- Option A Bag: проект покрывает через HTF-05 foil bag — 250°C oven / 180–190°C rotisserie, grease resistance, 6h holding (моделировано 85–95°C, фактическая Profi UNKNOWN), прозрачное окно, 100% переработка раздельно, mono-material spirit (2 материала, но легко разделимы). Recycled content: алюминий бесконечно перерабатывается, пластик сокращен на 91% (2.8г vs 32г PP baseline). Не заявлено 100% rPET, но соответствует духу "lower-impact alternatives".
- Option B Box: покрывается через smoothwall + CPET membrane — 250°C body, grease resistance, recyclable, mono-material avoidance multilayer, cost-competitive.

**Итоговая предварительная оценка (из 100): ~78–82 / 100** при честной подаче с оговорками. Сильные стороны — техническая дисциплина, 0 false approvals, глубокое evidence моделирование. Слабые — отсутствие физических lab тестов, реальных Profi данных, сертификации, риск восприятия mock-сертификата как подлинного.

---

## 1. Environmental impact, priority virgin plastic reduction — 25%

### Что реализовано и проверено
- **Формула челленджа соблюдена:** `virgin_plastic = plastic_mass_g × (1 - recycled_content_fraction)` в `virgin_plastic.py: virgin_plastic()` и `selection.py: calculate_article_virgin_plastic()`, unrounded float via `fsum`.
- **Case A (PUBLIC):** 22.0г (19.5г body 0% + 2.5г closure 0%) → 2.5г (19.5г 100% rPET + 2.5г 0%) = **19.5г / 88.636% reduction**, CALCULATED/INDICATIVE, REVIEW_REQUIRED (unmodeled reqs). Проверено HTTP: `GET /scenarios/cchbc-.../comparison` 200.
- **Case B (PUBLIC):** 14.8г → 2.4г = **12.4г / 83.78%**, но BLOCKED по thermal 70°C<95°C + microwave false vs true. Демонстрирует разделение env benefit vs operability — ключевая инновация.
- **Selection guard:** `recycled_content_point_value_status != EXACT_POINT_VALUE` → INSUFFICIENT_DATA, missing_fields `candidate.components.tray-body.recycled_content_fraction`. Для Faerch C 2200-1L (CPET) с "up to 70%" — отказ считать, возвращает N/A, next_action REQUEST_PCR_EVIDENCE. Проверено: оба кандидата INSUFFICIENT_DATA.
- **HTF-03 ranges (честно пересекают ноль):**
  - C5 BIOPAP: plastic-budget 2.23–4.34г central 3.08г (tray plastic-free assumption, весь film как virgin), vs B1-ESTIMATED 2.59–12.46г central 6.5г → **-67.6% … +82.1% central +52.5%**. Диапазон пересекает ноль → "no reduction guaranteed" в pitch-safe банке.
  - C1 Gaia: 8.0–14.35г central 10.70г budget (actual UNKNOWN), -453%…+35% vs B1 — честно показывает uncertainty.
  - C4 CPET: 25.28–54.14г central 36.2г virgin даже с 69–75% body PCR, -1988%…-102% — демонстрирует урок: heavy rigid даже с высоким PCR хуже lightweight bag.
- **HTF-05 physical:** Foil bag 2.8г BOPET vs 32г PP worst-case = **91% reduction**, 0г одноразового PP в tray+silicone combo (крышка многоразовая). Алюминий — 95% экономии энергии при переплавке, бесконечно recyclable, соответствует PPWR mono-material spirit при условии разделения.
- **Тесты:** `test_virgin_plastic.py` 49 passed (arithmetic, missing, zero baseline, increase, truth tables), `test_selection.py` 41 passed (boundary mismatch, missing mass, NON_POINT, grouping), `test_economics.py` 18 passed (zero/negative reduction guards).

### Сильные стороны
- Приоритет №1 реализован детерминированно, с provenance, без изобретения чисел.
- Отказ от "up to" как point value — сильная epistemic дисциплина.
- Честное раскрытие пересекающего ноль диапазона, heavy-rigid урок.

### Пробелы / риски
- Нет LCA/CO2 engine (явно исключено в product_canon, допустимо, но судьи могут спросить).
- B1 фактическая масса/полимер Profi UNKNOWN, используется B1-ESTIMATED 2.6–12.5г VERY_LOW confidence — нельзя заявлять "Profi сэкономит X тонн".
- C1 фактический virgin UNKNOWN из-за покрытий.
- HTF-05 BOPET recycled content не указан как высокий % recycled — снижение за счет lightweighting, а не 100% recycled content, но челлендж допускает "other materials and innovative solutions".

### Оценка: **20–22 / 25**
При честной подаче с формулировками "conditional budget", "range crosses zero", "represented components only" — высокая. При попытке заявить "guaranteed 91% saving" — риск 0.

---

## 2. Practicality within retail operations — 15%

### Реализовано
- **Bounded gate:** thermal + microwave в A-core, 6 gates в HTF-03.
  - Thermal: candidate max vs required, с комбинированной verification weakest premise.
  - Microwave: required true vs candidate false → BLOCKED.
  - ELIGIBLE только если все evaluated premises VERIFIED и совместимы (исправлено в IGR-R1F, 22 assert в QA-R1).
- **Selection UX:** user overrides required_max_temperature (e.g. 60°C), microwave_required (default/required/not-required), annual_units, context notes (не парсятся в constraints), reset to defaults. Проверено: 60°C снимает BLOCKED у APET (70>=60) → REVIEW_REQUIRED, REQUEST_CAPABILITY_EVIDENCE.
- **HTF-03 workflow separation:** POST_COOK_HOT_HOLD_6H (предполагается курица жарится вне упаковки, потом hot transfer, holding 85–95°C modeled) vs LITERAL_OVEN_250C_THEN_HOLD (in-pack baking). P1 whole chicken → C1 Gaia first path (flexible bag решает геометрию 1.0–1.3кг, headspace), P2–P4 portions → C5 BIOPAP (1240мл, 6h@90°C family), literal 250°C → C2–C5 BLOCKED, C6-RO-H aluminium body fallback с оговоркой "no selected transparent closure qualified for 250°C".
- **Прозрачное окно:** учтено как отдельный gate, anti-fog как gap, NatureFlex cellulosic window, clear CPET/silicone.
- **Grease/leak:** aluminium 100% barrier, paper Gaia — supplier positioned for greasy food но exact 6h leak UNKNOWN → QUALIFICATION REQUIRED.
- **Small vs large portions:** P1 vs P2–P4 differentiated, 1.0–1.4кг test scenario.

### Пробелы
- Нет данных о скорости фасовки, sealing line, handling, shelf-life микробиологии, реальных Profi holding temps (UNKNOWN), 6h seam leak под горячим жиром — требует lab.
- Procurement: только листинги (e-ambalaj, La Habibi, Barleta) + RFQ required, listing ≠ stock, fit unverified.
- Economic: blank inputs, USER_PROVIDED, не включает EPR, пластик-налог, логистику.

### Оценка: **11–13 / 15**
Сильная демонстрация "attractive saving but BLOCKED" и 48-row matrix, но без store pilot.

---

## 3. Technical feasibility — 15%

### Проверено тестами и рантаймом
- **Backend:** FastAPI + Pydantic, 165 тестов passed (1 Starlette deprecation warning), `validate_htf03.py` PASS: 6 candidates, 3 baselines, 131 sources, 114 recomputed, 48 gate rows, 41 negative mutations rejected + plastic=total equality accepted.
- **Fail-closed:** missing/unreadable/corrupt/invalid evidence → 503 EVIDENCE_UNAVAILABLE, no silent fallback (`test_api.py` 9 passed, `test_demo_launcher.py` 10 passed).
- **Startup:** atomic snapshot `load_runtime()`, explicit env `GIGAFOOD_EVIDENCE_PATH`, `GIGAFOOD_PORTFOLIOS_PATH`, `GIGAFOOD_HTF03_PATH`, relative path resolves from cwd, invalid override fails without fallback.
- **Frontend:** React 19, TS 5.8, Vite 6.4, `npm ci && npm run build` PASS (33 modules), `git diff --check` PASS, responsive 390px.
- **Demo launcher:** `scripts/demo.py` 12k lines, checks PUBLIC kind, READY, scenario snapshot vs file, portfolio discovery non-empty, first evaluation, frontend reachability, API proxy, ports 8000/5173 occupied check, cleanup finally, STOP-11 regression: ILLUSTRATIVE Selection → exit 1, no READY printed (QA-R3C verified).
- **API contracts:** mirrored TS in `contracts.ts`, offline fallback JSON 55k lines, stale-response protection via AbortController.
- **Docs:** architecture, evidence_semantics, canon hierarchy (OFFICIAL > MENTOR > TEAM_DECISION > OBSERVED > PUBLIC > INFERENCE), decision_policy (calculation vs eligibility vs approval separation, future ranking guard).

### Пробелы
- Нет high-concurrency load test, нет prod deployment, local dev only.
- TS contracts manual mirror, не генерируются из Pydantic.
- Default runtime ILLUSTRATIVE, не PUBLIC — только launcher делает PUBLIC, риск демо с неправильными данными.

### Оценка: **13–14 / 15**
Прототип software технически solid, воспроизводим, с регрессиями.

---

## 4. Innovation — 10%

### Что инновационно
- **Evidence-aware decision support:** provenance (OBSERVED/ASSUMED/MANUFACTURER_SUPPLIED/CALCULATED + SOURCE_AVAILABLE/VERIFIED/NOT_VERIFIED/INSUFFICIENT_DATA/INDICATIVE), weakest-premise `combine_verification()`, separation CALCULATED≠VERIFIED, missing≠0, PUBLIC≠PROVIDER.
- **Deterministic decision grouping, не ranking:** Group1 not BLOCKED + CALCULATED, Group2 not BLOCKED + INSUFFICIENT_DATA, Group3 BLOCKED — предотвращает "bad candidate ranking first".
- **0 qualified survivors как фича:** инженерная честность, 28 QUAL_REQUIRED + 20 BLOCKED, отказ от false winner за 48 часов.
- **HTF-05 физика:** steam cooling (влага продукта держит пленку ≤130°C при 250°C в печи), бесклеевой mechanical interlock aPET в микропоры фольги, self-venting каналы, tool-free Peel-away для Румынии, Zero CAPEX лоток (биржевой каталог) + LSR silicone крышка с микроперфорацией, -40..+250°C.
- **Pentagon radar:** 5 метрик vs worst PP container, product anatomy diagram, B2B dossier.
- **No AI/LLM:** детерминированная логика, аудируемая — плюс для food safety, против hallucinations.

### Пробелы
- Нет патента, нет benchmarking vs spreadsheets (но в QA-R1 это отмечено как допустимый gap).
- Universal pouch — комбинация известных технологий (Ready Chef Go, Sirane, Contital) — инновация в сборке и бесклеевом решении под румынский waste law.

### Оценка: **8–9 / 10**

---

## 5. Business viability — 10%

### Реализовано
- **Economic Scenario View:** бланк с placeholder hints, unrounded arithmetic, first-year impact без "/year", guards division by zero, USER_PROVIDED/NOT_VERIFIED badges, disclosure "Not actual Profi pricing".
  - Пример Case A 1M units 0.120 vs 0.135 + 50k transition → +€15k/year, +€65k first year, 19.5t avoided, €0.77/kg.
  - Case B BLOCKED 500k 0.10 vs 0.08 → -€10k/year saving но ⛔ THEORETICAL / NON-ACTIONABLE banner.
- **Romanian market truth:** B3 Barleta 128002 paper+PP 18×7×35 1000шт — 0.37026 RON incl VAT (без доставки) — market reference, не Profi baseline. C6-RO-P 729 tray + a-680681 lid 1.1485–1.2915 RON/pair (+210–248% vs B3) при 1400 комплектов, free shipping threshold превышен, fit/stock unconfirmed. C6-RO-H e-pui225 body 1.43 RON incl VAT без clear closure. Gaia/BIOPAP — RFQ required.
- **Mentor +10–15% tolerance** как commercial context, не procurement approval — правильно отделено.
- **Calculator в universal showcase:** monthly volume slider 5k–100k, plastic saved kg, budget RON, avg cost.

### Пробелы
- Нет actual Profi incumbent price, volume, willingness to pay, ROI, payback, avoided loss — UNKNOWN, нельзя заявлять annual savings.
- Нет EPR fees, plastic tax, freight, inflation — явно исключено, но судьи могут спросить.
- Нет supplier quote, MOQ, lead time verified, нет adoption interview (только hypothesis).

### Оценка: **6–8 / 10**
Честная экономика, но без валидации Profi workflow.

---

## 6. Scalability — 10%

### Реализовано
- **Data model:** Evidence.scenarios list, linear lookup, startup snapshot, поддерживает множество curated scenarios (2 PUBLIC, 2 ILLUSTRATIVE, 1 Faerch portfolio 2 candidates, HTF-03 48 rows, 131 sources).
- **Config override:** env vars, absolute paths в launcher, restart после изменений.
- **Roadmap:** multi-scenario selection → curated intake → eligibility-aware ranking → retailer integration, intake rehearsal documented (steps/time/unknowns).
- **Validator:** масштабируется на 48 rows, 63 формулы, 126 sources, mutation testing.
- **Offline fallback:** `offlineRecommendationData.json` 55k для UI без backend.

### Пробелы
- Manual curation, restart, нет ingestion pipeline, нет DB, нет supplier integration, нет throughput benchmark, нет portfolio optimizer (deferred per product_canon).
- TS mirror manual.

### Оценка: **6–7 / 10**
Credible route, но не demonstrated retailer-scale.

---

## 7. User experience — 10%

### Реализовано
- **4 режима:** universal_pouch (default), recommendation journey (P1–P4, 2 workflows, dynamic first path), selection (Faerch), comparison (Case A/B). Mode pills, nav.
- **UX hierarchy:** What PackShift concluded first → environmental result → operational eligibility → next action → comparability → evidence gap (missing ≠0) → constraints → annual impact → technical provenance collapsible.
- **Sign semantics:** "Reduces virgin plastic" (>0), "No change — zero virgin-plastic reduction" (=0), "Increases virgin-plastic use" (<0), никогда "saving" для ≤0 — verified в QA-R3C.
- **Validation:** annual_units positive integer, temperature finite, costs ≥0 finite, transition cost blank allowed, messages "Enter a positive whole number...", no malformed request.
- **Responsive:** @media max-width 640px single column, 44px touch targets, overflow-x hidden, scrollWidth ≤ innerWidth, schematic SVG ProductVisual с disclaimer "Schematic geometry · Not supplier article photo".
- **i18n:** EN/RU/MD chrome selector, backend enums остаются EN, scope note "UI chrome: [LANG] · Backend evidence & API enums remain canonical EN".
- **Error handling:** status panels, Retry buttons, independent availability, no blank screen, loading states.
- **Universal showcase:** carousel 4 images per product, thumbs, pricing deck wholesale vs retail, pros/cons grid, pentagon radar, anatomy diagram, calculator slider, cert modal CTA, European manufacturing dossier.

### Пробелы
- Dense enums, long URLs как текст не ссылки, selector label clipping at 390px (отмечено в QA-R3C), нет user comprehension study, нет keyboard/screen-reader audit, mobile Safari physical не тестирован (только emulation), certificate modal может восприниматься как подлинный официальный сертификат (риск greenwashing если не маркирован как simulation/demo).
- Default mode universal_pouch — новый, не покрыт QA-R3C (тот был до HTF-05).

### Оценка: **7–8 / 10**
Богатый UI, честные бейджи, но риск перегрузки и mock-сертификата.

---

## 8. Quality of presentation — 5%

### Реализовано
- **Docs:** README с one-command demo, runbook, walkthrough Case A/B + economic + 60°C scenario; architecture, evidence_semantics, challenge_canon, product_canon, decision_policy, open_questions, NDR-01 ledger, HTF-03 source/estimation/conflict/procurement ledgers, HTF-05 spec, pitch packets NCP-HT2 final (9 слайдов ~4 мин, 30s/2min/4min scripts, demo narration TARGET 70s и FALLBACK 60–75s, transition sentences, pitch-safe/forbidden phrase banks, claim-evidence matrix, judge QA).
- **Demo launcher:** `./scripts/demo.ps1 -Check` / `bash scripts/demo.sh --check`, preflight HTTP checks, PACKSHIFT DEMO READY banner, logs path, port cleanup, fail-closed.
- **Verification:** verify.sh/ps1, CI (setup-python 3.11, node 22, verify + demo --check), QA-R3C ACCEPTABLE, APR-HT1 SUPPORTED/PARTIALLY.
- **Claim safety:** disclosure banners PUBLIC-EVIDENCE DEMO DATA NOT PROFI PROVIDER DATA, CALCULATED≠VERIFIED, missing≠0, SOURCE_AVAILABLE≠VERIFIED, 0 survivors как rigor, forbidden phrases (winner, approved, certified safe, 100% recyclable in Romania, guaranteed % reduction).
- **Visuals:** reference-packaging 30+ images (grill, bakery, meat, pouch, sacma, silicone lid, etc.), logo.png, styles.css 5k lines.

### Пробелы
- Default ILLUSTRATIVE vs PUBLIC confusion (README предупреждает использовать launcher).
- GigaFood vs PackShift naming inconsistency исторически, но в UI PackShift.
- Нет committed final deck .pptx/.pdf, только slide plan в md.
- Нет rehearsal recording.
- Mock certificate modal с EU-LAB, NB-0482, подписями, SHA256 — если показывать без явной маркировки "SIMULATION / DEMO CERTIFICATE — not accredited lab result", может вызвать вопросы о подлинности. В коде нет водяного знака SIMULATION.

### Оценка: **4 / 5** при использовании launcher и pitch-safe фраз; **3 / 5** если показывать cert как реальный.

---

## 9. Тестирование — детали

### Автоматизированные тесты (165 passed)
```
.venv/bin/python -m pytest backend/tests -q
165 passed, 1 warning (StarletteDeprecationWarning httpx)
```
- `test_virgin_plastic.py` 49: arithmetic, missing, zero baseline, increase, gate truth tables (thermal, microwave, SOURCE_AVAILABLE→REVIEW_REQUIRED, VERIFIED→ELIGIBLE), null req, no requirements, legacy fields ignored.
- `test_selection.py` 41: article virgin calc with EXACT_POINT_VALUE guard, comparability ASYMMETRIC_BOUNDARY, transition delta withheld on boundary mismatch, operational eligibility via A-core, next_action REJECT_INCOMPATIBLE/REQUEST_PCR_EVIDENCE/REQUEST_CAPABILITY_EVIDENCE/VERIFY_OPERATIONAL_PREMISES, annual impact actionable flag, deterministic grouping.
- `test_economics.py` 18: spend calc, delta, first-year, annual reduction kg, €/kg avoided null on zero/negative/INSUFFICIENT_DATA, USER_PROVIDED/NOT_VERIFIED.
- `test_api.py` 9: health READY/PUBLIC, scenarios, comparison, missing/unreadable/corrupt/invalid numeric/duplicate IDs, explicit env path never falls back.
- `test_demo_launcher.py` 10: PUBLIC checks, ILLUSTRATIVE fail-closed.
- `test_recommendation.py` + `acceptance_htf04/test_acceptance_oracle.py`: HTF-03 oracle 48 rows, C6 binding.

### HTF-03 валидатор
```
python scripts/validate_htf03.py --self-test
PASS: 6 candidates; 3 distinct baselines; 131 sources; 114 recomputed; 48 gate rows
PASS: 41 rejected mutation cases; valid all-plastic equality accepted
```
- Проверяет ссылки, диапазоны, формулы, массы, BOM, SKU, температуру/длительность/hold, страновые основания, безопасную проекцию.
- 26 negative examples в synthesis report.

### Ручной рантайм (проверено в этой сессии)
- `TestClient` с PUBLIC pack: health READY/PUBLIC, Case A 19.5г 88.6% REVIEW_REQUIRED, Case B 12.4г 83.78% BLOCKED (thermal-envelope-incompatibility, microwave-reheating-incompatibility), Faerch portfolio summary "No candidate is currently recommendable...", CPET INSUFFICIENT_DATA REVIEW_REQUIRED REQUEST_PCR_EVIDENCE, APET BLOCKED REJECT_INCOMPATIBLE, economics A +15k€/year 19.5t €0.77/kg, economics B BLOCKED -10k€ theoretical, recommendation P1 POST_COOK → C1 first, 0 survivors, P1 LITERAL 250°C → C2,C3,C4,C5 BLOCKED, C6 fallback.

### Frontend build
```
npm ci && npm run build
tsc --noEmit && vite build → 33 modules, 0 TS errors
```

### Demo preflight (CI)
```
bash scripts/demo.sh --check
PACKSHIFT DEMO READY
A-core: READY / PUBLIC
Selection: READY / 1 portfolio(s)
Evaluation: faerch-deli-trays / 2 candidates
```

### QA аудиты (исторические, но актуальны)
- QA-R1: HARD STOP STOP-01 (unverified premises could produce ELIGIBLE) → RESOLVED via IGR-R1F, 22 assertions.
- QA-R3C: ACCEPTABLE, mobile 390×844, STOP-11 fail-closed, sign semantics, economic scenario amplifier.
- APR-HT1: HTF-03 acceptance, claim safety matrix.

---

## 10. Риски и рекомендации перед жюри

### Критические (P0) — не заявлять
- ❌ "Profi bag weighs 6.5g" — это B1-ESTIMATED central, actual UNKNOWN. Говорить "Our estimated baseline scenario models 2.6–12.5g central 6.5g".
- ❌ "Guaranteed 91% / 52% reduction" — диапазон C5 пересекает ноль, C1 actual UNKNOWN. Говорить "Conditional budget -67.6% to +82.1% central +52.5%, range crosses zero, no reduction guaranteed until film weighed".
- ❌ "Winner / Approved / Certified safe / Production ready / 100% recyclable in Romania" — 0 survivors, DoC/migration unresolved, Romanian sorting unverified. Говорить "First qualification path, QUALIFICATION REQUIRED".
- ❌ "Survives 250°C for 6 hours" — физически абсурд, 250°C peak ≠ 6h holding. Говорить "250°C peak oven exposure followed by hot holding at modeled 85–95°C, actual Profi holding temp UNKNOWN".
- ❌ Показывать ComplianceCertificateModal как подлинный lab cert — добавить водяной знак "SIMULATION / DEMO ILLUSTRATION — not accredited lab result, for UI demonstration only" или скрыть кнопку по умолчанию, показывать только по запросу с дисклеймером.

### Улучшения за 1–2 часа (P1)
- Добавить явный дисклеймер на universal_pouch showcase: "Physical concept, not lab-qualified; 250°C based on seller claims and steam cooling model; food-contact DoC/migration requires lab".
- В README и в UI добавить баннер "Default mode is universal pouch showcase (HTF-05) — physical concept; for evidence-backed decision engine use Recommendation Journey".
- Проверить `npm run build` и `demo.sh --check` на презентационной машине, записать логи, сделать backup screenshots P1 Gaia, P2 BIOPAP, P1 literal 250°C C6 fallback.
- Прогнать pitch-safe phrase bank вслух, выучить BIOPAP range и temperature distinction.

### Среднесрочные (P2) — если время
- Сгенерировать TS contracts из Pydantic (избавиться от manual mirror drift).
- Добавить явный LCA disclaimer page: "Material-only virgin plastic, not full LCA".
- Добавить RFQ templates в `docs/pitch/NCP-HT1-economics-procurement.md` уже есть, но вынести в UI.

---

## 11. Итоговая таблица оценок

| Критерий | Вес | Оценка (из веса) | Обоснование |
|---|---|---|---|
| Environmental impact (virgin plastic priority) | 25% | **20–22** | Формула соблюдена, 88.6%/83.78% CALCULATED, EXACT_POINT_VALUE guard, честные диапазоны C5 -67.6..+82.1% crossing zero, heavy-rigid урок, HTF-05 91% lightweighting, 0 false savings. Нет LCA, B1 actual UNKNOWN. |
| Practicality within retail operations | 15% | **11–13** | Bounded gate + 6 non-compensatory gates, 48 rows, 0 survivors, whole vs portions, transparent window, grease, 60°C what-if, Romanian listings. Нет store pilot, DoC, line speed. |
| Technical feasibility | 15% | **13–14** | 165 tests PASS, HTF-03 validator PASS 41 negatives, fail-closed 503, deterministic grouping, demo launcher fail-closed, CI, atomic snapshot. Нет load test, default ILLUSTRATIVE. |
| Innovation | 10% | **8–9** | Evidence-aware provenance, weakest-premise ranking, 0 survivors as rigor, steam cooling, adhesive-free mechanical interlock, self-venting, Zero CAPEX tray+LSR lid, pentagon radar. Комбинация известных tech, но под румынский waste law. |
| Business viability | 10% | **6–8** | Economic scenario hypothetical with BLOCKED guard, Romanian prices B3 0.37 RON vs C6 1.15–1.29 RON +210–248%, +10–15% tolerance as context. Нет actual Profi price/volume/adoption. |
| Scalability | 10% | **6–7** | 48 rows scalable model, env overrides, offline fallback 55k, roadmap multi-scenario→ranking→integration. Manual curation, no ingestion, no DB. |
| User experience | 10% | **7–8** | 4 режима, hierarchy What concluded first, sign semantics, validation, responsive 390px, schematic disclaimer, EN/RU/MD, retry, calculator, carousel. Dense enums, mock cert risk, clipping. |
| Quality of presentation | 5% | **4** (с оговорками) | Pitch packets, slide architecture 9 slides, spoken scripts, demo narration TARGET+FALLBACK, phrase banks, README runbook, QA audits, reference images. Нет final deck, rehearsal recording, mock cert без SIMULATION watermark. |
| **ИТОГО** | **100%** | **~78–84** | Сильный технически честный проект, готов к demo при pitch-safe подаче. Для победы нужно подчеркнуть 0 survivors как дисциплину и HTF-05 как ответ на optional Hot Food annex. |

---

## 12. Чеклист для демо (из README + QA-R3C)

1. `bash scripts/verify.sh` → 165 passed + build PASS
2. `bash scripts/demo.sh --check` → PACKSHIFT DEMO READY, A-core READY/PUBLIC, Selection READY 1 portfolio, Evaluation faerch-deli-trays 2 candidates
3. Открыть http://127.0.0.1:5173 → проверить default universal_pouch (HTF-05) — foil bag carousel, pricing, pros/cons, pentagon, calculator slider
4. Переключить Recommendation Journey → P1 Whole Chicken POST_COOK_HOT_HOLD_6H → C1 Gaia QUALIFICATION REQUIRED 0 survivors → открыть evidence drawer
5. P2 Wings → C5 BIOPAP → показать 175 vs 185°C conflict badge, 6h@90°C family
6. Workflow → LITERAL_OVEN_250C_THEN_HOLD → C2–C5 BLOCKED, C6-RO-H fallback с оговоркой "no transparent closure qualified for 250°C"
7. Portfolio Selection → Faerch → CPET INSUFFICIENT_DATA REQUEST_PCR_EVIDENCE, APET BLOCKED thermal 70<95
8. Comparison → Case A 19.5г 88.6% REVIEW_REQUIRED → Economic Scenario 1M units 0.12 vs 0.135 → +15k€/year 19.5t €0.77/kg → Case B BLOCKED theoretical banner
9. Service outage: остановить backend, Reload → Service unavailable + Retry → восстановить → Retry → READY
10. Mobile: 390×844 emulation, проверить нет horizontal overflow, circles wrap, inputs 44px

---

## 13. Заключение

Проект **PackShift / GigaFood** демонстрирует редкую для хакатона инженерную зрелость: вместо изобретения победителя за 48 часов команда построила **доказательную машину отказа** (0 qualified survivors из 48), честно отделила environmental arithmetic от operational eligibility, отказалась считать "up to 70%" как точное число и показала, что тяжелый rigid с высоким PCR может быть хуже легкого мешка.

Физическая часть **HTF-05** напрямую отвечает на optional Hot Food annex (250°C bag + box), с продуманной физикой steam cooling, бесклеевым замком и румынским фактором разделения без инструментов. Это сильный ответ на приоритет virgin plastic reduction через lightweighting и раздельный рециклинг.

Для жюри критично подавать проект через **pitch-safe фразы**, подчеркивать диапазоны, пересекающие ноль, и roadmap квалификации (sample → fit → 6h hot-hold/grease → DoC/migration → Romanian quote → 2-store pilot). Избежать любых заявлений о сертификации, одобрении Profi или гарантированной экономии.

При такой подаче проект заслуживает **ACCEPTABLE / READY FOR BRAIN REVIEW** (по терминологии QA-R3C) и высокий балл по техническим критериям.

---
*Сгенерировано автоматически на основе кода, данных, тестов и документов репозитория на 2026-09-27.*
