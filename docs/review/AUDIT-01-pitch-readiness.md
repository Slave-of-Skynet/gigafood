# AUDIT-01 — Independent Current-Main Audit & Pitch-Readiness Review

**Document class:** INDEPENDENT AUDIT / READINESS REVIEW (not an acceptance certificate)
**Author / executor:** Arena Agent Mode session on branch `arena/01a0dccf-gigafood`
**Audited base:** `152507f962aa7de6be2185e1eb9231b8a2eb0305` (`origin/main`, merge of PR #26)
**Audit date:** 2026-09-26
**Environment:** Linux (Ubuntu-class container), Python 3.11.2, Node v22.22.3, npm 10.9.8, Vite 6.4.3
**Authority notice:** findings below are `OBSERVED_IMPLEMENTATION` and `AI RECOMMENDATION`
(level 7 of [authority order](../canon/challenge_canon.md#authority-and-labels)). Product,
schema and scope decisions remain with the Human Integrator. Nothing here is a new canon decision.

---

## 1. Verdict

**1.1 Software state — ACCEPTABLE for the current demo scope.** Independently re-executed on
Linux (a different OS from the Windows base of QA-R3C): full verification pipeline green,
demo preflight `READY`, live API behaviour matches the documented epistemic contract, and
no defect found that breaks the rehearsed A/B/refusal story.

**1.2 Pitch readiness — YES, the pitch can be started now, with four bounded preconditions**
(§5, P0). The pitch is currently the largest outstanding deliverable: no deck, timed script,
rehearsal record, roadmap document or backup recording exists in the tracked repository
(consistent with QA-R1 G6/A3, still true on this base).

**1.3 Highest-leverage single gap (AI RECOMMENDATION, HIGH):** the *default* screen of the
flagship mode (**Portfolio Selection**) shows **no numeric environmental result at all** —
baseline `26.29 g`, both candidates `N/A`, verdict *“No candidate is currently recommendable
for transition”*. The best quantified story (`22.0 → 2.5 g/unit`, −88.64%) lives only in
**Comparison** mode on a different data set. Environmental impact carries **25%** of the
official score; the pitch should make the first 30 seconds show a *calculated* reduction.

**1.4 Secondary risk (AI RECOMMENDATION, MEDIUM):** there is no production serving path —
the built UI only works behind the Vite dev/preview proxy (no CORS, no static SPA mount),
and the frontend has **zero** automated tests while CI only type-checks and builds it.

---

## 2. Fresh independent verification (re-executed, not copied)

| ID | Procedure | Actual result on base `152507f` |
| --- | --- | --- |
| V1 | `bash scripts/verify.sh` | Backend: **127 passed**, 1 warning (Starlette/`httpx` TestClient deprecation), 1.07 s. `npm ci`: 22 packages, 0 vulnerabilities. `npm run build`: `tsc --noEmit` + Vite, 34 modules, `dist/assets/index-*.js` 278.53 kB (gzip 82.00 kB), CSS 20.41 kB (gzip 4.50 kB). `git diff --check` clean. Exit 0 |
| V2 | `bash scripts/demo.sh --check` | Exit 0, `PACKSHIFT DEMO READY`; `A-core: READY / PUBLIC`; `Selection: READY / 1 portfolio(s)`; `Evaluation: faerch-deli-trays / 2 candidates`; ports released afterwards |
| V3 | Live listeners (`uvicorn` :8000, `vite` :5173) + HTTP probes | `GET /health` 200 READY/PUBLIC; `GET /scenarios` 200 PUBLIC (2 scenarios); `GET /portfolios` 200 (1 portfolio, 2 candidates); `GET /portfolios/faerch-deli-trays` 200 with the documented all-`N/A` environmental result; `GET /portfolios/nope` 404; `POST /evaluate` with `0`/`abc` → 422; `GET /docs` 200 |
| V4 | 10-case `POST /evaluate` override matrix (60 °C, microwave `false`, `-100 °C`, `1e308`, annual units, context override, `{}`) | All responses internally consistent; `{}` correctly falls back to portfolio defaults (no override is silently treated as "no requirements"); `use_context` override is echoed and does not alter the gate (documented) |
| V5 | GitHub Actions on `main` | Latest run `36229044697` — **success** |
| V6 | Tracked-artifact search for pitch assets (`docs/pitch`, slides, script, recording, roadmap) | **Not found** on this base |

Limits of this audit: no browser automation / real-device run here (QA-R3C covers Chromium
desktop + 390×844 manual runs); no primary-source re-verification of manufacturer datasheets
(QA-R1 G1 remains open); no Profi data (unavailable by mentor clarification); no load testing.

---

## 3. Findings

### D1 — Comparability classifier is a stub; the UI shows an unverifiable fixed claim
- **Severity:** MEDIUM (judge-facing epistemic claim; no arithmetic impact)
- **Evidence:** `backend/app/services/selection.py:50-73`. When component boundaries match,
  the function unconditionally returns `BOUNDED_WITH_QUALIFIER` with a hardcoded note:
  *“Common component boundary matched. Comparison is bounded: baseline nominal volume is
  unstated on primary datasheet or capacity differs > 15%.”* No capacity is read, compared or
  validated; `STRONG` and `NOT_COMPARABLE` are unreachable, although
  [INT-R2 D5/§11](../review/INT-R2-selection-mvp-contract.md) (lines 290–291) defines
  `STRONG` as *nominal volume within ±15%, same format, all SKU data available* and
  `BOUNDED_WITH_QUALIFIER` as *differs >15% or baseline capacity UNKNOWN*. The note is
  rendered verbatim by `frontend/src/components/SelectionView.tsx:240-245`. Tests cover only
  `ASYMMETRIC_BOUNDARY` (`backend/tests/test_selection.py:454,727`).
- **Repro:** `curl -s http://127.0.0.1:8000/api/v1/portfolios/faerch-deli-trays | jq '.candidates[].comparability'`
  → identical fixed note for both candidates.
- **Why it matters:** it is exactly the class of claim the project forbids elsewhere
  (“no hardcoded facts”, INT-R2 D7). A judge asking *“where does ‘capacity differs > 15%’
  come from?”* has no computed answer. It becomes **visibly false** the moment a portfolio
  with a stated nominal volume (e.g. a 500 ml bottle article) is added to Selection.
- **Proposed fix (S–M):** add `nominal_capacity_ml` (+ provenance) to `SelectionMetadata`,
  compute the rating per the frozen D5 rules, emit the *actual* reason, and add tests for all
  four rating outcomes. Pair this with P0-1 below.

### D2 — `NextAction` capability routing depends on prose substring matching
- **Severity:** LOW–MEDIUM (silent semantic regression risk)
- **Evidence:** `backend/app/services/selection.py:163-167` detects “unknown capability” with
  `"not established" in c.reason.lower()`. That literal matches only
  `virgin_plastic.py:100,159` (“…capability **is not established**”); the
  satisfied-but-unverified phrasings (“eligibility **cannot be established**…”,
  `virgin_plastic.py:92,122,128,149,181,186`) do **not** match.
- **Observed consequence:** `POST /evaluate {"required_max_temperature_c":60}` →
  APET `REQUEST_CAPABILITY_EVIDENCE`; `{"required_max_temperature_c":60,"microwave_required":false}`
  → APET `REQUEST_PCR_EVIDENCE`. Both are defensible, but the change is an artefact of
  wording removal, not of an explicit precedence rule.
- **Proposed fix (S):** carry the discriminator structurally (e.g. a `capability_unknown`
  flag on `ConstraintFinding`, or an explicit `constraint_id`-based precedence) and add a
  unit test per combination. Do not reword the messages without the structural flag.

### D3 — Packaging shape is inferred from ID substrings
- **Severity:** LOW (cosmetic; the mandatory disclaimer is present)
- **Evidence:** `frontend/src/components/ProductVisual.tsx:11-22` — `includes('bottle'|'500ml'|'hinged'|'pot'|'unipak')`,
  otherwise `'tray'`. `'pot'|'unipak'` encode one data set's vocabulary.
- **Proposed fix (S):** declare a visual hint in article metadata; keep a labelled generic
  fallback otherwise. Never let imagery imply a supplier photo (already disclaimed).

### D4 — No production/serving path (no CORS, no SPA mount)
- **Severity:** MEDIUM (operational/robustness; blocks any non-Vite hosting)
- **Evidence:** `backend/app/main.py` registers no middleware and no `StaticFiles` mount;
  the client fetches relative `/api/v1/...` (`frontend/src/api/client.ts:12`), which only
  resolves through the Vite proxy (`frontend/vite.config.ts`). A built `frontend/dist`
  opened from any other origin or static host fails at the first API call. Node/npm is a hard
  prerequisite even for a pure UI demo (`scripts/demo.py` requires `frontend/node_modules/vite/bin/vite.js`).
  Additionally, Vite ≥5.4 rejects unknown `Host` headers by default, so proxied/remote hosts
  were blocked (see §8 for the local change made by this audit).
- **Proposed fix (S–M):** either mount `frontend/dist` from FastAPI with an SPA fallback
  (one command, one port, no Node at demo time), or add `CORSMiddleware` with an explicit
  allowlist plus a configurable client base URL. Both are additive; neither changes domain
  semantics. This also directly supports the *Scalability* criterion.

### D5 — User-supplied temperature has no plausibility bounds
- **Severity:** LOW
- **Evidence:** `SelectionRequest.required_max_temperature_c: float | None` (no bounds);
  observed `-100` accepted, `1e308` accepted (“all candidates blocked”). The UI validates
  finiteness only (`SelectionView.tsx`, `evaluate`).
- **Proposed fix (XS–S):** bounded range (e.g. −40…300 °C) on both sides with an explicit
  message; keep `NOT_VERIFIED / USER_PROVIDED` provenance unchanged.

### D6 — Zero automated frontend tests; CI never exercises UI behaviour
- **Severity:** MEDIUM (regression risk during final polish)
- **Evidence:** `frontend/package.json` has `dev`/`build`/`preview` only; `.github/workflows/ci.yml`
  runs `scripts/verify.sh` (type-check + build) and `demo.sh --check` (startup preflight).
  All UI behaviour assurance comes from manual QA (QA-R3C §7–§11).
- **Proposed fix (M):** minimal Playwright smoke for the three judge paths (default Selection;
  60 °C override; economics on `BLOCKED`) or Vitest+RTL for validation/sign wording; wire into CI.
  This is the cheapest insurance for the days immediately before judging.

### D7 — `use_context` override is accepted, echoed, and never evaluated
- **Severity:** LOW (expectation trap)
- **Evidence:** `resolve_requirements` copies it into the response; the gate consumes only
  temperature/microwave. The UI help text says *“Description only”*, and
  [decision policy](../canon/decision_policy.md) records this as intentional.
- **Proposed fix (XS):** relabel it as free-text *notes (not evaluated)* or hide it until the
  gate consumes it. No schema change required.

### D8 — Internal naming leftovers (informational)
`gigafood` / `gigafood-ui` package names and the legacy `GIGAFOOD_*_PATH` environment
variables remain. They are not judge-visible (UI, API title, logo and `index.html` are all
PackShift) and renaming the env vars would break the demo scripts, canon and QA records.
**Recommendation: no action.**

### Not defects (deliberate, but pitch-sensitive)
1. **All-`N/A` default Selection result** — a correct curation boundary (Faerch CPET/APET have
   no SKU-level numeric PCR). It is honest; it is also the weakest possible opening screen (§1.3).
2. **Illustrative A-core default** — correct by design; the launcher pins PUBLIC. Never start
   the demo manually.
3. **Bounded gate = thermal + microwave only** — documented; do not let any sentence imply
   complete qualification.
4. **No ranking, no ROI, no LCA/CO₂, no accounts/DB** — accepted scope; avoid implying them.

---

## 4. Coverage against the official judging criteria (weights from the brief)

| Criterion | Weight | Current state | What is missing / next action |
| --- | ---: | --- | --- |
| Environmental impact (virgin plastic) | 25% | Arithmetic is exact and defensible; Comparison Case A shows 22.0 → 2.5 g/unit (88.64% reduction); Selection default shows nothing numeric | **P0-1**: add one PUBLIC Selection portfolio whose candidate PCR is an `EXACT_POINT_VALUE` so the flagship screen opens with a calculated delta and optional annual kg. Keep the Faerch portfolio as the refusal/block story |
| Practicality in retail operations | 15% | Bounded thermal/microwave gate; block-before-benefit demonstrated | Add a one-slide **design-considerations coverage map** (food safety, shelf life, logistics, economics, regulations, recyclability, material optimisation → modelled / review-required / not modelled). Never claim more than the gate evaluates |
| Technical feasibility | 15% | Strong: typed contracts, 127 tests, fail-closed loading, CI green, deterministic, no runtime LLM | Freeze code after P0; add the UI smoke test (D6); record the audited SHA in the backup materials |
| Innovation | 10% | The differentiator is *evidence-gated computation that refuses* (`missing ≠ 0`, `CALCULATED ≠ VERIFIED`, block-before-benefit) | Articulate it in one sentence and demonstrate it live (Case B + missing-evidence refusal). Avoid the phrase “AI recommends” — the product deliberately has no inference layer |
| Business viability | 10% | Only user-supplied packaging-cost arithmetic (`/economics`), tagged `USER_PROVIDED / NOT_VERIFIED` | Keep it qualitative: shorter evidence cycles, avoided unqualified switches, auditable trail. Name the unblocking inputs (volumes, prices, EPR fees) as a roadmap item. Do **not** invent ROI |
| Scalability | 10% | JSON schema is effectively the intake interface; curation is the real bottleneck | Write the phased roadmap document (required deliverable): curated intake → multi-portfolio workflow → eligibility-aware ranking → retailer/PIM integration. Add the single-command serving path (D4) |
| User experience | 10% | Clear hierarchy, provenance chips, retry paths, mobile layout | Fix the first-screen value (§1.3); decide the demo language (body copy is EN; chrome switcher is EN/RU/MD); trim enum-dense copy near headlines |
| Quality of presentation | 5% | Rehearsable runbook exists | The deck, timed script, backup screenshots/video and rehearsal record do not exist yet |

---

## 5. Prioritised plan

**P0 — do before (or while) writing the pitch (all bounded, ≤ ~1 day total)**
1. **Add a second PUBLIC Selection portfolio with an exact point-value PCR** (reuse the
   committed NDR-01 Case A bottle evidence; `component_boundary: BOTTLE_AND_CLOSURE` on both
   sides, `recycled_content_point_value_status: EXACT_POINT_VALUE`). **Executed probe of the
   committed service with such a portfolio** (in-memory, no fixture written) returned:
   baseline `22.0 g` → candidate `2.5 g`, reduction `+19.5 g/unit` (+88.636%), status
   `CALCULATED / INDICATIVE`, eligibility `REVIEW_REQUIRED` (advisory food-contact finding
   only), next action `VERIFY_OPERATIONAL_PREMISES`, summary verdict *“1 candidate(s) viable
   with calculable environmental savings. Verification of operational premises required
   before QA advancement.”*, and, with `annual_units = 1 000 000`, `+19 500 kg` with
   `is_actionable = true`. Zero arithmetic change; curation + one test + README walkthrough only.
   The same probe shows D1 becoming **visibly false** on this portfolio (the hardcoded note
   claims the baseline nominal volume is unstated — the bottle article's capacity is stated).
2. **Fix D1** (comparability) in the same change: a bottle portfolio makes the current
   hardcoded note visibly wrong.
3. **Copy pass on the first screen** (Selection): make “what this shows / what is missing /
   what to do next” readable without enum knowledge; relabel `use_context` (D7).
4. **Rehearsal assets:** timed script, on-machine `scripts/demo.ps1 -Check`, and backup
   screenshots + screen recording labelled with the audited SHA.

**P1 — before judging if time allows**
5. D4 single-command serving path (FastAPI + built UI, or CORS + configurable base URL).
6. D6 frontend smoke tests in CI.
7. **Roadmap document** (implementation & scalability) and the design-considerations coverage map.

**P2 — schedule after the pitch**
8. D2 structured action routing, D3 declared visual shape, D5 bounds validation.
9. Optional: a **lightweighting** example (mass-difference delta), since the bottle case
   demonstrates recycled content only and Case B is blocked.

**Do not build now** (unchanged from [QA-R1 §7](QA-R1-judging-readiness-audit.md)): LLM chat
wrapper, ROI/annual-impact dashboard without inputs, ingestion/scraping platform, DB/accounts,
LCA/CO₂ engine, certification engine, ranking before the evidence/eligibility gate, full
visual redesign, or expanded Hot Food scope before the temperature/time questions are answered.

---

## 6. Answer to “can we start the pitch?”

**Yes — start it now, in parallel with P0.** The implementation is a defensible, tested,
locally demonstrable vertical slice; the remaining work is narration, one curation gap and
one robustness fix. Suggested spine for a ~5-minute demo (all states verified executable on
this base):

| Beat | Screen / action | Message |
| ---: | --- | --- |
| 0 | Launcher `PACKSHIFT DEMO READY` → `PUBLIC` banner | Only reviewed public evidence is served; fail-closed identity |
| 1 | **Selection, new bottle portfolio** (after P0-1) | “22 g → 2.5 g virgin per unit, +19.5 g/unit, −88.64%, and here is the volume assumption: 19.5 t/year if the volume holds” |
| 2 | Faerch portfolio, APET candidate | “−83.78% arithmetic, still **⛔ BLOCKED**: 70 °C vs the modelled 95 °C + microwave context. Benefit never overrides eligibility” |
| 3 | CPET candidate / missing PCR | “`N/A`, not `0`: an ‘up to 70%’ marketing ceiling is not a point value. The tool refuses to invent it” |
| 4 | 60 °C override + reset | Requirements are scenario inputs with explicit provenance, not hidden constants |
| 5 | Economics on the blocked case | Business arithmetic stays available but is branded *THEORETICAL / NON-ACTIONABLE* |
| 6 | Roadmap slide | Curated intake → workflow → ranking after evidence gates → retailer integration |

Cross-examination answers already exist and are good: QA-R3C §Appendix (5 questions) and
QA-R1 §5 (14 questions). Prepare only the two new ones: *“Why does Selection now show a
saving?”* (answer: newer public article with an exact PCR declaration) and *“Why didn’t the
first portfolio show numbers?”* (answer: that is the refusal behaviour, deliberately kept).

---

## 7. Unverified / out of scope for this audit

- Primary-source correctness of the manufacturer inputs (QA-R1 G1) — still UNKNOWN.
- Completeness of component inventories (QA-R1 G2/G10) — curator responsibility.
- Real Profi workflow, volumes, prices, adoption (mentor Q1–Q3) — UNKNOWN, unchanged.
- Real-device, screen-reader, contrast and slow-network behaviour; no frontend test suite exists.
- High-concurrency / multi-tenant behaviour — explicitly out of product scope.
- Judge scoring of any kind: the mapping in §4 is an inference, not a forecast.

---

## 8. Local modification made by this audit (needs Integrator approval to keep)

`frontend/vite.config.ts`: added `allowedHosts: true` to `server` and `preview` so the dev
server can also be reached through a proxied/non-localhost hostname (used here to run a live
review session). The demo launcher is unaffected (it still passes `--host 127.0.0.1` on the
CLI). No domain, API, dependency or evidence semantics changed. Revert or refine freely; this
audit also used that listener to run the V3/V4 probes above.

```text
Result: software ACCEPTABLE · pitch READY TO START · 8 findings (1 MEDIUM-high-leverage gap,
2 MEDIUM, 4 LOW/S, 1 informational) · 4 P0 actions before judging.
```
