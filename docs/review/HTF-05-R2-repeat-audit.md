# Повторный аудит после обновления репозитория — HTF-05-R2

**Дата повторного аудита:** 2026-09-27 14:30 EEST  
**Ветка:** arena/01a0e295-gigafood (fast-forward merged origin/main)  
**Новый коммит:** `026b778 fix(compliance): add simulation disclaimer watermark and concept qualifiers (P0/P1 audit closure)`  
**Предыдущий аудит:** HTF-05-final-judging-evaluation + HTF-05-detailed-audit @ 2c08b8e  
**Статус тестов после обновления:** 165 passed, 1 warning, validator PASS 6/3/131/114/48 + 41 negatives, frontend build PASS 56 modules 77.64kB CSS 2312kB JS (chunk large due to offlineRecommendationData.json 55k lines)

---

## 1. Что изменилось (diff origin/main 2c08b8e..026b778)

**3 файла, +88 -3:**

### ComplianceCertificateModal.tsx
- Было: `Официальный верифицированный сертификат безопасности EU / FDA` + зеленый dot
- Стало: `Симуляция спецификации соответствия EU / FDA (Demo Model)` + оранжевый dot `#f59e0b`
- Добавлен watermark banner:
```tsx
<div style={{background:'#fffbeb', border:'1px dashed #f59e0b', borderRadius:'6px', padding:'8px 12px', marginBottom:'14px', fontSize:'12px', color:'#b45309'}}>
  ⚠️ SIMULATION SPECIFICATION (TRL 4–5): Инженерная симуляция паспорта соответствия для демонстрации интерфейса. Для коммерческого внедрения в Profi требуется финальный протокол аккредитованной лаборатории.
</div>
```
- Кнопка: было `Посмотреть официальный лабораторный сертификат соответствия (EU 1935/2004 & FDA 250°C) →` → стало `Посмотреть спецификацию и симуляцию паспорта соответствия (EU / FDA) →`

### UniversalPouchShowcase.tsx
- Добавлен epistemic disclaimer блок:
```tsx
<div style={{backgroundColor:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'10px 16px', marginTop:'16px', fontSize:'12.5px', color:'#475569'}}>
  ℹ️ Инженерная физическая концепция HTF-05: Термостойкость 250°C основана на спецификациях фольги/LSR и модели парового охлаждения. Для аудита существующих SKU ритейлера перейдите в режим Recommendation Journey.
  [Кнопка: Открыть Decision Engine →] → onApplyWorkflow('P1','LITERAL_OVEN_250C_THEN_HOLD')
</div>
```
Связывает физическую концепцию с decision engine, предотвращает восприятие как certified product.

### universalPouchMessages.ts
- Добавлены 6 переводов EN/RU/RO для новых строк:
  - Симуляция спецификации соответствия EU / FDA (Demo Model)
  - SIMULATION SPECIFICATION (TRL 4–5): ...
  - Посмотреть спецификацию и симуляцию паспорта соответствия...
  - Инженерная физическая концепция HTF-05:
  - Термостойкость 250°C основана на...
  - Открыть Decision Engine →

**Итог:** P0 claim safety defect (mock cert как официальный) закрыт, P1 UX связка физика→digital закрыта. Это именно то, что рекомендовалось в предыдущем аудите.

---

## 2. Повторная верификация ключевых инвариантов

### 2.1 Backend (без изменений, но перепроверено)
```
TestClient PUBLIC:
health READY/PUBLIC disclosure "PUBLIC-EVIDENCE DEMO DATA — NOT PROFI PROVIDER DATA"
Case A 19.5g 88.636% REVIEW_REQUIRED
Case B 12.4g 83.78% BLOCKED [food-contact-suitability, thermal-envelope-incompatibility, microwave-reheating-incompatibility]
Faerch: summary "No candidate is currently recommendable..." CPET INSUFFICIENT_DATA REQUEST_PCR_EVIDENCE, APET BLOCKED REJECT_INCOMPATIBLE
Economics A 1M 0.12 vs 0.135 → +15000€/year 19500kg 0.769€/kg, B BLOCKED -10000€ theoretical
Recommendation P1 POST_COOK → C1 first 0 survivors 1 blocked, P1 LITERAL 250C → C2,C3,C4,C5 BLOCKED, C6-RO-H prio2 fallback
```
Все инварианты сохранены.

### 2.2 Frontend build
```
npm ci → 22 packages, 0 vulnerabilities
npm run build → 56 modules, dist/index-DAPinivI.css 77.64kB gzip 15.05kB, index-mbW-kZj2.js 2312.93kB gzip 421.40kB (! chunk >500k)
```
Chunk large из-за `offlineRecommendationData.json` 55k lines — не блокер для хакатона, но стоит упомянуть как scalability UX (lazy load). Build PASS, tsc --noEmit PASS.

### 2.3 Claim safety sweep после фикса

| Проверка | Было (2c08b8e) | Стало (026b778) | Статус |
|---|---|---|---|
| Certificate toolbar | "Официальный верифицированный сертификат" зеленый dot → риск восприятия как реальный lab | "Симуляция спецификации (Demo Model)" оранжевый dot + watermark SIMULATION TRL 4-5 | **CLEAN** |
| Cert button | "официальный лабораторный сертификат" | "спецификацию и симуляцию паспорта" | **CLEAN** |
| Universal showcase | Только hero + tabs, нет явной связки с decision engine | Добавлен disclaimer "Инженерная физическая концепция HTF-05: 250°C основана на спецификациях и модели... Для аудита SKU перейдите в Recommendation Journey" + кнопка Open Decision Engine | **CLEAN** |
| Forbidden phrases | В модалке были "VERIFIED", "NB-0482", подписи без SIMULATION | Теперь везде SIMULATION, TRL 4-5, требуется финальный протокол аккредитованной лаборатории | **CLEAN** |
| Остальные forbidden (winner, approved, certified safe, production ready, 100% recyclable in Romania, guaranteed % ) | Отсутствовали в коде (проверено в NCP-HT2 forbidden bank) | Отсутствуют | **CLEAN** |

**Вывод:** P0/P1 audit closure выполнен корректно. Теперь продукт полностью соответствует claim safety policy из product_canon и NCP-HT2.

---

## 3. Переоценка по критериям (после фикса)

### Environmental 25% — было 20-22 → **21-23 / 25**

- Без изменений в расчете, но улучшение презентации снижает риск misinterpretation. HTF-05 теперь явно маркирован как концепция, не certified saving, что повышает доверие к честным диапазонам C5 -67.6..+82.1%. Foil bag 2.8г vs 32г PP 91% reduction остается strong lightweighting story, соответствует "other materials welcome".

### Practicality 15% — было 11-13 → **12-13 / 15**

- Добавлена явная связка физика→digital: кнопка "Открыть Decision Engine →" применяет LITERAL_OVEN_250C workflow. Это демонстрирует, как операционный workflow меняет квалификацию (thermal inversion). Улучшает понимание retail practicality.

### Technical feasibility 15% — **13-14 / 15** (без изменений)

- 165 tests PASS, validator PASS, build PASS. Новый код не ломает контракты, только UI текст + стили. No new backend.

### Innovation 10% — **8-9 / 10** (без изменений)

- Steam cooling, adhesive-free mechanical interlock, self-venting, Zero CAPEX + LSR lid, 6 gates, 0 survivors. Фикс улучшает инновацию через TRL маркировку (TRL 4-5) — честная зрелость.

### Business viability 10% — **7-8 / 10** (было 6-8)

- Disclaimer снижает риск claim "Profi approved", повышает доверие. Экономика без изменений, но теперь явно simulation.

### Scalability 10% — **6-7 / 10** (без изменений, но chunk size warning)

- JS 2.3MB gzip 421kB — большой из-за offline data. Для хакатона ок, но для прод стоит code-split. Не снижает балл сильно, но отметить.

### UX 10% — было 7-8 → **8-9 / 10**

- **Улучшение:** certificate modal теперь simulation с оранжевым dot и watermark, universal showcase disclaimer с actionable кнопкой в Recommendation Journey. Это закрывает основной UX риск.
- Остались minor: dense enums, long URLs text, selector clipping at 390px (из QA-R3C), chunk large.

### Presentation 5% — было 4 → **5 / 5**

- **P0 закрыт:** теперь pitch-safe. Можно показывать cert modal без страха, что судья воспримет как подделку официального сертификата. Добавлена связка между физической концепцией и decision engine — сильный сторителлинг для демо.

### **Итог после фикса: 81-87 / 100** (было 78-84)

- При честной подаче с pitch-safe фразами и launcher PUBLIC: **~85/100** — strong contender.
- Без launcher (default ILLUSTRATIVE) или с заявлениями "guaranteed saving": ~60/100.

---

## 4. Дополнительные детали, запрошенные как "подробности"

### 4.1 Детерминированный расчет — код и тесты

**Формула virgin plastic:**
```python
# backend/app/services/virgin_plastic.py:15-19
def virgin_plastic(package):
    if any(c.plastic_mass_g.value is None or c.recycled_content_fraction.value is None for c in package.components):
        return None
    return fsum(c.plastic_mass_g.value * (1 - c.recycled_content_fraction.value) for c in package.components)
```
**Тест zero baseline:**
```python
# test_virgin_plastic.py
def test_zero_baseline_and_increase():
    # current 0g → reduction_pct None (no divide-by-zero)
    # candidate > current → reduction_g negative preserved
```
**Тест missing ≠ 0:**
```python
def test_unknown_never_zero_or_partial_sum():
    # null mass/fraction → package total None, not partial sum
```

### 4.2 Operational gate — truth table (22 assertions V2)

См. предыдущий detailed-audit раздел 3.1 — все 22 комбинации NOT_VERIFIED/INDICATIVE/INSUFFICIENT_DATA/SOURCE_AVAILABLE → REVIEW_REQUIRED, только VERIFIED+VERIFIED+compatible → ELIGIBLE. Это исправление STOP-01 из QA-R1.

### 4.3 Selection grouping — код

```python
# selection.py
group1 = [c for c in candidates if eligibility != BLOCKED and calculation == CALCULATED]
group2 = [c for c in candidates if eligibility != BLOCKED and calculation == INSUFFICIENT_DATA]
group3 = [c for c in candidates if eligibility == BLOCKED]
ordered = group1 + group2 + group3
```
Никакого global ranking, только deterministic grouping per INT-R2 D7.

### 4.4 Recommendation 48 rows — как проверяется

**Validator:** `validate_htf03.py` пересчитывает 114 формул из estimation-ledger, проверяет 131 source reference, 48 gate rows outcome, 41 negative mutation (подмена temp, mass, PCR, gate status) → must reject, plus plastic=total equality accepted.

**Acceptance oracle test:** `backend/tests/acceptance_htf04/test_acceptance_oracle.py` — black-box сравнивает API `/recommendation/evaluate` с ожидаемой матрицей APR-HT1 (28 QUAL_REQUIRED, 20 BLOCKED, 0 survivors).

### 4.5 Economic scenario — формулы и guards

```python
current_annual_spend = annual_units * current_cost
candidate_annual_spend = annual_units * candidate_cost
annual_cost_delta = candidate - current
first_year = delta + transition if transition else None
annual_virgin_reduction_kg = reduction_g * units /1000 if CALCULATED else None
incremental_cost_per_kg = delta / reduction_kg if reduction_g>0 and reduction_kg>0 else None
```
Guards: reduction_g==0 → kg 0, cost_per_kg null → N/A "no virgin-plastic reduction", reduction_g<0 → "Increases" + null, INSUFFICIENT_DATA → N/A.

### 4.6 HTF-05 физика подробно

- **Aluminium melting 660°C** → запас 410°C над 250°C.
- **BOPET:** Tg ~78°C, Tm ~260°C, но steam cooling: влага продукта испаряется, конвективный поток пара уносит тепло, фактическая temp пленки ≤110-130°C (данные Ready Chef Go, Sirane Sira-Cook Supreme industrial proven). Усадка 2-5% после длительного нагрева, легкая волнистость после остывания, прозрачность сохраняется.
- **Шов:** коэкструдированная пленка нижний слой aPET аморфный пониженная Tc/Tm, под нагревом+давлением затекает в микронеровности фольги → механический интерлок (физический микро-замок), без PU клеев, solvent-free, adhesive-free.
- **Self-venting:** калиброванные микро-каналы в термошве эластично деформируются при избыточном давлении пара, стравливают пар, предотвращают вздутие/разрыв.
- **Peel-away:** прочность рассчитана держать давление пара при запекании, но легко ручным усилием, микро-крючки выщелкиваются без расслоения, фольга→металл, PET→пластик (100% селективный сбор Румыния Legea 249/2015, EU PPWR).
- **LSR silicone:** platinum-cured, stable -60..+250°C (some grades +300°C), reusable 500-1000 cycles, dishwasher safe, microvent holes, rim seal Full Curl G-rim / Smoothwall L-rim, Zero CAPEX tray (Contital, Plus Pack, Coppice Alupack commodity catalog).

### 4.7 Frontend performance

- Build 56 modules, CSS 77.64kB gzip 15.05kB, JS 2312kB gzip 421kB. Large chunk due to offlineRecommendationData.json 55k lines + i18n messages 4364+3073 lines. Рекомендация: dynamic import() для RecommendationView и UniversalPouchShowcase, manualChunks для i18n. Для хакатона не критично, но упомянуть как scalability.

---

## 5. Итоговый чеклист для жюри (обновленный)

1. `bash scripts/verify.sh` → 165 passed + build PASS
2. `bash scripts/demo.sh --check` → PACKSHIFT DEMO READY A-core READY/PUBLIC Selection READY 1 portfolio Evaluation faerch-deli-trays 2 candidates
3. UI http://127.0.0.1:5173 default universal_pouch → проверить новый disclaimer "Инженерная физическая концепция HTF-05..." + кнопка "Открыть Decision Engine →" → переходит в Recommendation Journey P1 LITERAL_250C
4. Certificate modal → теперь "Симуляция спецификации (Demo Model)" оранжевый dot + watermark SIMULATION TRL 4-5 + "требуется финальный протокол аккредитованной лаборатории"
5. Recommendation Journey P1 POST_COOK → C1 Gaia QUALIFICATION REQUIRED 0/6 survivors, P2 → C5 BIOPAP 175 vs 185 conflict, LITERAL_250C → C2-5 BLOCKED C6-RO-H fallback closure gap
6. Selection Faerch CPET INSUFFICIENT_DATA REQUEST_PCR_EVIDENCE APET BLOCKED 70<95
7. Comparison Case A 88.6% REVIEW_REQUIRED → Economic 1M 0.12 vs 0.135 +50k → +15k/year +65k first year 19.5t €0.77/kg, Case B BLOCKED theoretical banner
8. Mobile 390×844 no horizontal overflow, circles wrap, 44px touch
9. Pitch-safe фразы: "B1-ESTIMATED 2.6-12.5 central 6.5 VERY_LOW", "C5 -67.6..+82.1 central +52.5 range crosses zero", "First qualification path QUALIFICATION REQUIRED 0 survivors", "250°C peak ≠ holding, actual holding UNKNOWN 85-95 modeled"

---

## 6. Заключение повторного аудита

**Обновление 026b778 полностью закрывает P0/P1 дефекты предыдущего аудита.** Claim safety теперь CLEAN, UX связка физика→digital добавлена, TRL маркировка честная.

**Статус:** **ACCEPTABLE / READY FOR JUDGING** с повышенным баллом Presentation 5/5 и UX 8-9/10.

**Итоговая оценка после фикса: 81-87 / 100, центральная ~85.**

Рекомендация: использовать launcher PUBLIC для демо, начинать с universal pouch (концепция 250°C) → сразу показать disclaimer и переход в Recommendation Journey → показать 0 survivors как дисциплину → показать C5 range crossing zero как честность → показать Faerch missing≠0 как integrity → закончить roadmap 6 steps.

---
*Повторный аудит сгенерирован автоматически после merge origin/main 026b778.*
