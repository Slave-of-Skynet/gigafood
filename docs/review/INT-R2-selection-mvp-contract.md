# INT-R2 — Selection MVP Contract Freeze & Integration Decision Packet

**Work Class:** CORE / INTEGRATION / SHARED-CONTRACT DECISION
**Owner:** Vladimir — Integrator / Architecture
**Document Version:** 1.1.0 (Reconciled with PR #10 / main)
**Target Repository:** `Slave-of-Skynet/gigafood`
**Original Inspected Base:** `bb17de0e55e3630cffc197c97982a73ba4e0ea1b` (`main`)
**Reconciled Current Main:** `73c94e95aa280024f2778195e54db22cba9dc000` (`origin/main`)
**Task Branch:** `vladimir/int-r2-selection-mvp-contract`
**Phase:** Phase A — Decision Packet (No runtime implementation)
**Human Decision Gate:** INT-R2-HG1

---

> [!IMPORTANT]
> **EPISTEMIC BOUNDARY & ANTI-GREENWASHING MANDATE**
> This integration decision packet defines the shared domain and API contracts for the Selection MVP. It does not implement runtime code, modify canon, alter frontend code, or certify packaging for food contact, migration, shelf-life, machine runnability, or regulatory compliance.
> - `CALCULATED ≠ VERIFIED`
> - `SOURCE_AVAILABLE ≠ VERIFIED`
> - `NOT_VERIFIED ≠ FALSE`
> - `missing ≠ 0`
> - `PUBLIC ≠ PROVIDER`
> - `ILLUSTRATIVE ≠ PUBLIC`
> - `environmental calculation ≠ operational eligibility ≠ implementation approval`
> Software provides decision support; the human specialist remains the decision-maker.

---

## 1. Current-State Summary

### 1.1 Base Repository Inspection & Reconciliation
- **Original Inspected Base:** `bb17de0e55e3630cffc197c97982a73ba4e0ea1b` on `main` (merge of PR #12: `IGR-R2A Candidate Portfolio Recon`).
- **Reconciled Current Main:** `73c94e95aa280024f2778195e54db22cba9dc000` on `origin/main` (incorporating merged PR #10: `feat(frontend): PUX-GF-01 PackShift integrated demo UI shell`).
- **Synchronization Status:** Branch `vladimir/int-r2-selection-mvp-contract` is rebased cleanly on top of `73c94e95aa280024f2778195e54db22cba9dc000`.
- **CI Status on Current Main:** **PASS** (backend test suites passing, frontend builds passing).
- **Inspected Assets on Base:**
  - Recon document available at: [`docs/evidence/IGR-R2A-candidate-portfolio-recon.md`](file:///c:/Users/user/Documents/skynet/gigafood/docs/evidence/IGR-R2A-candidate-portfolio-recon.md).
  - Public substantiation ledger: [`docs/evidence/A1-source-to-value-substantiation.md`](file:///c:/Users/user/Documents/skynet/gigafood/docs/evidence/A1-source-to-value-substantiation.md).
  - Canons: [`docs/canon/challenge_canon.md`](file:///c:/Users/user/Documents/skynet/gigafood/docs/canon/challenge_canon.md), [`docs/canon/product_canon.md`](file:///c:/Users/user/Documents/skynet/gigafood/docs/canon/product_canon.md), [`docs/canon/decision_policy.md`](file:///c:/Users/user/Documents/skynet/gigafood/docs/canon/decision_policy.md), [`docs/canon/open_questions.md`](file:///c:/Users/user/Documents/skynet/gigafood/docs/canon/open_questions.md).
  - Domain, services, runtime: [`backend/app/domain/packaging.py`](file:///c:/Users/user/Documents/skynet/gigafood/backend/app/domain/packaging.py), [`backend/app/services/virgin_plastic.py`](file:///c:/Users/user/Documents/skynet/gigafood/backend/app/services/virgin_plastic.py), [`backend/app/main.py`](file:///c:/Users/user/Documents/skynet/gigafood/backend/app/main.py), [`backend/app/runtime/context.py`](file:///c:/Users/user/Documents/skynet/gigafood/backend/app/runtime/context.py).

### 1.2 Concurrent Workstreams Status
- **PR #10 (`PUX-GF-01 PackShift integrated demo UI shell`):** Has been successfully merged into `main` at `73c94e95aa280024f2778195e54db22cba9dc000`.
- **Invariant:** INT-R2 has modified zero frontend files (`frontend/**`), preserving full isolation from frontend integration work.

### 1.3 Baseline Runtime Capabilities (A-Core)
Current runtime is strictly a **pairwise comparison** between one pre-authored current package and one pre-authored candidate package:
- Deterministic component virgin plastic: $m_i \times (1 - r_i)$.
- Independent dual-axis statuses:
  - Environmental calculation: `CALCULATED` vs `INSUFFICIENT_DATA`.
  - Operational eligibility: `ELIGIBLE`, `REVIEW_REQUIRED`, `BLOCKED`.
- Bounded operational dimensions: maximum service temperature (`max_temperature_c`) and microwave reheating (`microwave_safe`).
- Explicit input provenance (`origin`, `verification_state`, `source_reference`, `note`).
- Absence of portfolio evaluation, annual-impact extrapolation, cost/ROI modeling, LCA/CO₂ scoring, or AI/LLM heuristics.

---

## 2. Selection MVP Objective

The objective of the Selection MVP is to transition PackShift from a single pre-authored pair inspector into a **bounded portfolio decision-support engine**:

```text
CURRENT WORKFLOW (A-Core):
  pick one pre-authored scenario (current + candidate)
  → inspect one comparison delta + gate findings

TARGET WORKFLOW (Selection MVP):
  define a bounded packaging use context (service temp, microwave need, optional annual units)
  → inspect a curated candidate portfolio against an active baseline packaging article
  → reject demonstrably incompatible candidates with clear operational failure reasons
  → surface candidates requiring SKU-level evidence or verification
  → calculate environmental virgin-plastic savings ONLY where verified numeric evidence permits
  → optionally extrapolate per-unit results to annual volumes if an explicit volume is supplied
  → output concrete next actions, leaving implementation approval to the human specialist
```

This task freezes all integration contracts, schema models, truth tables, and behavioral rules so that **IGR-R2B (backend selection seam)** and subsequent frontend wiring can implement identical semantics without inventing parallel concepts.

---

## 3. Protected Existing Semantics

INT-R2 strictly preserves and protects the following established system invariants:

### 3.1 Epistemic Invariants
1. `CALCULATED ≠ VERIFIED`: A mathematically computed reduction is not an empirical verification of material performance, safety, or suitability.
2. `SOURCE_AVAILABLE ≠ VERIFIED`: Sourcing a manufacturer technical datasheet establishes that a source exists, not that the candidate is verified for the client's specific operations.
3. `NOT_VERIFIED ≠ FALSE`: Unverified premises indicate an evidence gap requiring human review, not an affirmative operational defect.
4. `missing ≠ 0`: An omitted parameter (mass, PCR fraction, temperature rating) is `UNKNOWN`, never defaulted to zero or assumed.
5. `PUBLIC ≠ PROVIDER`: Public manufacturer evidence does not constitute confidential client provider data.
6. `ILLUSTRATIVE ≠ PUBLIC`: Synthetic fixtures remain strictly separated from source-attributed public datasets.
7. `environmental calculation ≠ operational eligibility ≠ implementation approval`: These three axes are strictly independent.

### 3.2 Virgin-Plastic Arithmetic
The existing formula remains the sole authorized calculation:

$$\text{virgin\_plastic}_i = \text{plastic\_mass\_g}_i \times (1 - \text{recycled\_content\_fraction}_i)$$

$$\text{virgin\_package\_g} = \sum_{i} \text{virgin\_plastic}_i$$

$$\Delta_{\text{reduction\_g}} = \text{current\_virgin\_package\_g} - \text{candidate\_virgin\_package\_g}$$

$$\Delta_{\text{reduction\_pct}} = \frac{\Delta_{\text{reduction\_g}}}{\text{current\_virgin\_package\_g}} \times 100$$

### 3.3 Boundary & Edge Rules
- Missing recycled-content evidence is `UNKNOWN` and yields `status = INSUFFICIENT_DATA` for package virgin totals and transition deltas.
- Zero current virgin plastic makes `reduction_pct = None` (display `N/A`), avoiding division by zero.
- Increasing virgin plastic yields a negative reduction ($\Delta < 0$), which must be retained and reported as negative without truncation.
- Missing numeric evidence must never fabricate an operational incompatibility (`BLOCKED`).
- Operational incompatibility (`BLOCKED`) must never be inferred from missing environmental calculation evidence.
- `BLOCKED` means incompatible with the specific evaluated operating context, not universally unusable.
- `ELIGIBLE` strictly means that evaluated operational constraints passed and were verified; it does not grant food-safety, migration, shelf-life, or procurement approval.

---

## 4. IGR-R2A Portfolio Mapping

The Selection MVP demonstrates the Faerch A/S rigid prepared-food packaging portfolio reconsolidated in IGR-R2A:

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 FAERCH A/S DEMO PORTFOLIO                                   │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ BASELINE: Faerch P 2226-1C (Item 2226014004)                                                │
│ • Material: PP Grey (Recipe 9626)                                                           │
│ • Nominal Tray Mass: 26.29 g ±10% (Tray body only; sealing film excluded)                   │
│ • Recycled Content: 0.0 (0%) — Grounded in Faerch food-grade PP family claim                │
│ • Capabilities: Tmax = 121°C, Microwave = True (TDS affirmed)                               │
│ • Nominal Volume: UNKNOWN                                                                   │
│ • Calculation Outcome: Baseline Virgin Plastic = 26.29 g (CALCULATED, tray body only)      │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ CANDIDATE A: Faerch C 2200-1L (Item 2200012097)                                             │
│ • Material: CPET Evolve (Recipe 6811)                                                       │
│ • Nominal Tray Mass: 21.38 g ±10% (Tray body only; sealing film excluded)                   │
│ • Nominal Volume: 1000 ml                                                                   │
│ • Capabilities: Tmax = 220°C, Cooking = Oven/Microwave affirmed                             │
│ • Recycled Content: UNKNOWN at SKU level (TDS defers to annual recipe declaration)          │
│ • Against Demo Context (95°C, Microwave=True):                                              │
│   - Eligibility: REVIEW_REQUIRED (Numerically fits 220°C >= 95°C & MW, premises unverified) │
│   - Calculation: INSUFFICIENT_DATA (SKU PCR unknown; "up to 70%" is prohibited ceiling)     │
│   - Next Action: Request manufacturer declaration for current recipe 6811 PCR fraction      │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ CANDIDATE B: Faerch K 2182-1G (Item 2182015004)                                             │
│ • Material: APET Clear (Recipe 7900)                                                        │
│ • Nominal Tray Mass: 21.48 g ±10% (Tray body only; sealing film excluded)                   │
│ • Nominal Volume: 895 ml                                                                    │
│ • Capabilities: Tmax = 70°C (TDS stated), Cooking = Not ovenable, Microwave = UNKNOWN       │
│ • Recycled Content: UNKNOWN at SKU level                                                    │
│ • Against Demo Context (95°C, Microwave=True):                                              │
│   - Eligibility: BLOCKED (Documented 70°C < assumed 95°C requirement)                       │
│   - Calculation: INSUFFICIENT_DATA (SKU PCR unknown)                                        │
│   - Next Action: Candidate thermally incompatible with 95°C reheating; do not advance       │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Prohibited Substitutions (Anti-Hallucination Invariants):
1. **"Up to 70%" $\neq 0.70$:** Marketing recipe ceiling from corporate PR must not be ingested as a point value.
2. **"Minimum 40% Tray rPET" $\neq 0.40$ Total PCR:** Tray rPET circular metric is not total post-consumer resin.
3. **"Not ovenable" $\neq$ "Not microwaveable":** On Candidate B, microwave suitability remains strictly `UNKNOWN`.
4. **Historical 2021 recipe bands $\neq 2023/2025$ SKU values:** Fluctuating recipe bands cannot be cross-applied.
5. **Tray body $\neq$ complete package:** Sealing film is unquantified; comparisons are tray-body only.

---

## 5. D1–D11 Decision Table

| Decision Gate | Subject | Recommended Choice | Core Rationale |
| :--- | :--- | :--- | :--- |
| **D1** | Selection Unit | **1 Baseline + N Curated Candidates + 1 Operating Context** | Preserves transition comparison thesis; avoids unconstrained open-ended search engine complexity. |
| **D2** | Use-Context Inputs | **Reuse `OperationalRequirements` (`max_temperature_c`, `microwave_safe`); strict provenance distinction: portfolio defaults = `ASSUMED` / `NOT_VERIFIED`, interactive user overrides = `USER_PROVIDED` / `NOT_VERIFIED`** | Reuses proven domain structures; enforces that user input cannot become verified or provider data. `MODELING_ASSUMPTION` is descriptive documentation only, not an API enum. |
| **D3** | Annual Volume | **Optional strictly positive integer `annual_units`. Extrapolate linearly only when per-unit delta is `CALCULATED`. Null on `INSUFFICIENT_DATA`. When candidate is `BLOCKED`, return mathematical annual values only as theoretical potential with `is_actionable = false` and prominent operational block disclosure.** | Fulfills non-contradictory annual impact rule; volume cannot repair missing data; blocked candidates cannot claim actionable commercial savings. |
| **D4** | Evidence Guards | **Additive metadata wrapper (`SelectionMetadata` / `CandidateArticle`) around existing `Package`; NO breaking modifications to existing A-core `Package` or `Component`** | Preserves 100% backward compatibility with existing A-core evidence fixtures and API routes while equipping Selection candidates with `component_boundary`, `recycled_content_point_value_status`, `recycled_content_scope`, and `evidence_date`. |
| **D5** | Comparability | **Explicit 4-tier enum (`STRONG`, `BOUNDED_WITH_QUALIFIER`, `ASYMMETRIC_BOUNDARY`, `NOT_COMPARABLE`). Strengthen `ASYMMETRIC_BOUNDARY`: transition delta (`reduction_g`, `reduction_pct`) is WITHHELD when boundaries differ; individual package totals remain visible with explicit scope. Zero synthetic normalization.** | Prevents false complete-package claims when comparing tray body against hinged pack. Forbids dividing mass by missing volume. |
| **D6** | Dual-Axis Independence | **Preserve strict orthogonal axes: Calculation (`CALCULATED` / `INSUFFICIENT_DATA`) and Eligibility (`ELIGIBLE` / `REVIEW_REQUIRED` / `BLOCKED`)** | Eliminates greenwashing risk: operationally blocked candidates with high theoretical savings cannot be hidden or promoted. |
| **D7** | Selection Semantics | **Deterministic grouping by decision state; stable catalog order within groups; STRICT PROHIBITION of TOPSIS, AHP, or weighted scores** | Decision support, not automated ranking. Valid output includes "no candidate currently recommendable". |
| **D8** | Next Actions | **Structured machine-readable next-action code (`ADVANCE_TO_QA_REVIEW`, `REQUEST_PCR_EVIDENCE`, `REQUEST_CAPABILITY_EVIDENCE`, `VERIFY_OPERATIONAL_PREMISES`, `REJECT_INCOMPATIBLE`) + human guidance; never autonomous procurement or safety approval.** | Directs human specialist to specific missing SKU data or informs them of operating context mismatch. Replaces unsupported wording with "current SKU/recipe declaration with provenance". |
| **D9** | Shared API Boundary | **Additive endpoints: `GET /api/v1/portfolios`, `GET /api/v1/portfolios/{id}`, `POST /api/v1/portfolios/{id}/evaluate`** | Ergonomic, RESTful, reuses existing domain models (`Package`, `Scenario`, `Comparison`, `ConstraintFinding`). |
| **D10** | Compatibility Plan | **100% additive evolution; existing pairwise routes (`GET /api/v1/scenarios`, `/comparison`) remain fully supported and unmodified** | Prevents breaking existing A-core frontend or tests; enables seamless dual-mode operation. |
| **D11** | Demo Contract | **Freeze Faerch 3-article set against 95°C / microwave-safe context; demonstrate why Candidate A is review/withheld and Candidate B is blocked** | Delivers compelling judging value: demonstrates epistemic refusal and operational gating without fake data. |

---

## 6. Detailed Decisions (D1–D11)

### D1 — Selection Unit
- **Recommended Choice:** A Selection Unit consists of:
  - **One reference baseline packaging article** (e.g. current Faerch P 2226-1C PP tray).
  - **$N$ curated candidate articles** within an identified packaging portfolio (e.g. Faerch C 2200-1L CPET and K 2182-1G APET).
  - **One explicitly defined operational use context** (e.g. prepared-food reheating: 95°C max temp, microwave required).
- **Rationale:** Packaging transitions are fundamentally comparative: a transition replaces an existing container in an existing operational workflow. PackShift is not an unconstrained e-commerce search filter. The delta arithmetic ($\Delta = \text{baseline} - \text{candidate}$) requires a concrete baseline.
- **Implementation Consequence:** The backend selection service evaluates each candidate in the portfolio pairwise against the shared baseline and shared operational requirements, returning aggregated candidate assessments.
- **Rejected Alternatives:**
  - *Multi-baseline selection (matrix comparison of $M \times N$):* Unnecessary computational and UX complexity; real packaging transitions evaluate replacements for one active SKU at a time.
  - *Unconstrained search without baseline:* Violates the core product thesis of calculating virgin plastic reduction.

---

### D2 — User-Controlled Use-Context Inputs
- **Recommended Choice:** Support four bounded user inputs:
  1. `use_context`: string identifier or descriptive label (e.g. `"prepared-food-microwave-reheating"`).
  2. `required_max_temperature_c`: nullable float.
  3. `microwave_required`: nullable boolean.
  4. `annual_units`: optional strictly positive integer ($> 0$).
- **Strict Provenance Rules:**
  - **Curated / Default Demo Requirements Stored in Portfolio:**
    - `origin = "ASSUMED"`
    - `verification_state = "NOT_VERIFIED"`
  - **Interactive Values Supplied by User Through Evaluation Overrides:**
    - `origin = "USER_PROVIDED"`
    - `verification_state = "NOT_VERIFIED"`
    - `source_reference = "user:request"`
    - `note = "User-specified operating requirement override"`
  - **Guards:** User overrides must **never** silently inherit `ASSUMED`, `VERIFIED`, `PROVIDER`, or manufacturer provenance. `MODELING_ASSUMPTION` is descriptive documentation terminology only and is **NOT** introduced as an API enum.
- **Rationale:** Prevents epistemic drift. Reuses existing Pydantic classes (`OperationalRequirements`, `TemperatureInput`, `BooleanInput`, `Provenance`) internally without parallel provenance models.
- **Implementation Consequence:** In `POST /api/v1/portfolios/{id}/evaluate`, request bodies accept simple primitive types (`required_max_temperature_c: float | None`, etc.) for API ergonomics, which the service layer validates and wraps into structured domain inputs with `USER_PROVIDED` provenance.
- **Rejected Alternatives:**
  - *Introducing a separate, unprovenanced input model:* Contradicts `docs/evidence_semantics.md`.
  - *Allowing users to declare their inputs as `VERIFIED`:* Violates security and epistemic canons; software cannot accept user self-certification of compliance.

---

### D3 — Annual Volume Semantics
- **Recommended Choice:**
  - `annual_units` is **OPTIONAL**.
  - **When `annual_units` is absent / null:** `annual_impact = None`. No annual impact fields are computed or shown.
  - **When `annual_units` exists and calculation is `INSUFFICIENT_DATA`:** All annual result values remain strictly unavailable (`annual_reduction_kg = None`, `annual_current_virgin_kg = None`, `annual_candidate_virgin_kg = None`). Status is `INSUFFICIENT_DATA`. Volume cannot repair missing per-unit evidence.
  - **When `annual_units` exists, calculation is `CALCULATED`, and eligibility is `BLOCKED`:**
    Mathematical annual values **MAY be returned only as theoretical environmental potential**, with:
    - `is_actionable = False`
    - Prominent disclosure: *"Theoretical annual saving only. Candidate is operationally blocked and the annual result is not actionable under the stated modeled operating context."*
  - **When `annual_units` exists, calculation is `CALCULATED`, and eligibility is `ELIGIBLE` or `REVIEW_REQUIRED`:**
    $$\text{annual\_reduction\_kg} = \frac{\text{reduction\_g} \times \text{annual\_units}}{1000}$$
    $$\text{annual\_current\_virgin\_kg} = \frac{\text{current\_virgin\_pack\_g} \times \text{annual\_units}}{1000}$$
    $$\text{annual\_candidate\_virgin\_kg} = \frac{\text{candidate\_virgin\_pack\_g} \times \text{annual\_units}}{1000}$$
    - `is_actionable = True` (if `ELIGIBLE`) or qualified (if `REVIEW_REQUIRED`).
- **Provenance & Disclaimers:**
  - Annual figures carry: `origin: "CALCULATED"`, `verification_state: "INDICATIVE"`, with mandatory disclosure: *"Hypothetical scenario based on user-supplied volume. Not actual Profi purchase volume, commercial commitment, or verified retail impact."*
- **Rationale:** Removes all contradictions between D3, §10, and truth-table P-03. Fulfills mentor clarification: zero invented Profi volumes.
- **Implementation Consequence:** Fully standardized in `AnnualImpactResult`.
- **Rejected Alternatives:**
  - *Defaulting `annual_units` to an assumed baseline:* Strictly forbidden by `missing ≠ 0`.

---

### D4 — Candidate Evidence Contract & Additive Compatibility
- **Recommended Choice:**
  - **Additive Composition Pattern:** Do **NOT** make Selection evidence guards mandatory fields on the existing shared `Package`, `Component`, or `NumericInput` types.
  - Introduce an additive Selection metadata wrapper: `SelectionMetadata` (and composite `CandidateArticle`):
    ```python
    class SelectionMetadata(Contract):
        component_boundary: Literal["TRAY_BODY_ONLY", "BODY_AND_FILM", "HINGED_COMPLETE_PACK", "BOTTLE_AND_CLOSURE", "CUSTOM"]
        recycled_content_point_value_status: Literal["EXACT_POINT_VALUE", "NON_POINT_VALUE", "UNSTATED"] = "UNSTATED"
        recycled_content_scope: Literal["TOTAL_PCR", "TRAY_RPET", "MASS_BALANCE_ALLOCATION", "FAMILY_CLAIM"] | str | None = None
        evidence_date: str | None = None  # ISO 8601 (YYYY-MM-DD)
    ```
  - `CandidateArticle` bundles existing `Package` with `SelectionMetadata`:
    ```python
    class CandidateArticle(Contract):
        package: Package
        metadata: SelectionMetadata
    ```
  - **Recycled-Content Point Value Semantics (`recycled_content_point_value_status`):**
    - `EXACT_POINT_VALUE`: An exact, usable numeric fraction supported by SKU-level recipe documentation (e.g. `0.25`).
    - `NON_POINT_VALUE`: Any non-point claim including marketing ceilings/maxima (e.g. Faerch "up to 70%"), circular recipe minima (e.g. "minimum 40% Tray rPET"), historical recipe bands (e.g. 69–75%), or qualified ranges. When `NON_POINT_VALUE` is set, calculation must withhold the virgin-plastic delta (`status = INSUFFICIENT_DATA`) rather than hallucinating an exact point estimate.
    - `UNSTATED`: Recycled content is omitted or unknown on the primary source.
    - **Invariant:** `"up to 70%"` is a non-point maximum ceiling and must **never** be encoded as an exact `0.70` point value.
- **Rationale:** Guarantees 100% backward compatibility. Existing A-core Package contracts, pairwise routes (`/scenarios`), and committed JSON fixtures (`demo-packaging.json`, `public-packaging.json`) remain completely valid without requiring a schema migration.
- **Implementation Consequence:** IGR-R2B backend models use `CandidateArticle` and `SelectionMetadata` for portfolio endpoints while reusing existing `Package` without modification.
- **Rejected Alternatives:**
  - *Adding mandatory fields to `Package`:* Forces breaking changes across existing fixtures, tests, and the merged PUX-GF-01 frontend contracts.

---

### D5 — Candidate Comparability & Asymmetric Boundary Rule
- **Recommended Choice:** Every candidate evaluation computes a `ComparabilityAssessment`:
  - `rating: Literal["STRONG", "BOUNDED_WITH_QUALIFIER", "ASYMMETRIC_BOUNDARY", "NOT_COMPARABLE"]`
  - `boundary_match: bool`
  - `notes: list[str]`
- **Strengthened `ASYMMETRIC_BOUNDARY` Rule:**
  - **Default Rule:** Do **NOT** emit a transition `reduction_g` or `reduction_pct` by subtracting totals that represent different component boundaries (e.g. baseline `TRAY_BODY_ONLY` vs candidate `HINGED_COMPLETE_PACK`).
  - When `boundary_match == False` (e.g. `ASYMMETRIC_BOUNDARY`):
    - `reduction_g = None`
    - `reduction_pct = None`
    - `calculation_status = INSUFFICIENT_DATA` (for transition delta)
    - Individual represented package totals (`current_virgin_pack_g`, `candidate_virgin_pack_g`) remain visible with their explicit component boundary labels.
  - A transition delta may become calculable **only if a source-backed common component boundary is explicitly established for both sides**.
  - `NOT_COMPARABLE` also continues to withhold transition delta.
  - **Zero Synthetic Normalization:** PackShift **never fabricates normalization** by volume, mass, geometry, or assumed omitted components (e.g. never divides mass by missing volume or synthesizes a grams-per-ml metric).
- **Classification Rules:**
  - **`STRONG`:** Same manufacturer, same format, identical `component_boundary`, nominal volume within $\pm 15\%$, all SKU data available.
  - **`BOUNDED_WITH_QUALIFIER`:** Same packaging format and component boundary, but nominal capacity differs by $> 15\%$ or baseline capacity is `UNKNOWN` (e.g. Faerch P 2226-1C vs C 2200-1L). Delta is calculable on common boundary with visible qualifier.
  - **`ASYMMETRIC_BOUNDARY`:** Component boundaries differ. Transition delta is withheld.
  - **`NOT_COMPARABLE`:** Functional job structurally incompatible. Transition delta is withheld.
- **Rationale:** Prevents greenwashing. Subtracting a tray body from a hinged pack with integrated lid produces false savings claims.
- **Implementation Consequence:** Enforced deterministically in selection service.

---

### D6 — Calculation and Eligibility Axes
- **Recommended Choice:** Maintain complete orthogonal separation between:
  - **Calculation Axis:** `CALCULATED` vs `INSUFFICIENT_DATA`.
  - **Eligibility Axis:** `ELIGIBLE`, `REVIEW_REQUIRED`, `BLOCKED`.
- **Representable Coexistence States:**
  - `CALCULATED + ELIGIBLE`: Complete numeric inputs; evaluated requirements verified and satisfied.
  - `CALCULATED + REVIEW_REQUIRED`: Complete numeric inputs; operational requirements satisfied but premises unverified (`ASSUMED` / `NOT_VERIFIED`), or advisory findings present.
  - `CALCULATED + BLOCKED`: Complete numeric inputs; operational requirement demonstrably violated (e.g. Public Case B: 12.4 g theoretical savings, but 70°C < 95°C).
  - `INSUFFICIENT_DATA + REVIEW_REQUIRED`: Calculation inputs missing; operational constraints satisfied or unverified (e.g. Candidate A: CPET 220°C fits 95°C, but PCR is unknown).
  - `INSUFFICIENT_DATA + BLOCKED`: Calculation inputs missing; operational constraint demonstrably violated (e.g. Candidate B: APET 70°C < 95°C, and PCR is unknown).
- **Definition of `ELIGIBLE`:** Strictly means: *"Satisfies the explicit technical operational constraints evaluated by the bounded gate."* It is **never** food-safety, migration, shelf-life, legal, procurement, or implementation approval.
- **Rationale:** Core anti-greenwashing protection. A high virgin plastic saving must never override an operational failure, and missing environmental data must never fabricate an operational block.
- **Implementation Consequence:** Reuses existing separation from `app.services.virgin_plastic.compare`.

---

### D7 — Selection / Shortlist Semantics
- **Recommended Choice:**
  - **ABSOLUTE BAN ON TOPSIS, AHP, WEIGHTED SCORING, OR COMPOSITE SUSTAINABILITY INDEXES.**
  - Deterministic decision-support flow based on explicit states:
    1. **Operational Gating:** Evaluate hard constraints (`max_temperature_c`, `microwave_safe`). Candidates failing any constraint are classified as `BLOCKED`.
    2. **Evidence Auditing:** Candidates passing hard constraints are evaluated for premise verification and calculation completeness. Unverified premises yield `REVIEW_REQUIRED`. Missing inputs yield `INSUFFICIENT_DATA`.
    3. **Environmental Arithmetic:** Compute virgin plastic reduction independently for candidates with complete numeric data and matching component boundaries.
    4. **Deterministic Organization:**
       Candidates in the API response are presented in structured decision groups:
       - **Group 1 — Viable / Review with Calculable Benefit:** Candidates not blocked, with `CALCULATED` savings.
       - **Group 2 — Viable / Review with Missing Evidence:** Candidates not blocked, with calculation `INSUFFICIENT_DATA` (e.g. Candidate A).
       - **Group 3 — Operationally Incompatible:** Candidates with `BLOCKED` status (e.g. Candidate B).
       Within groups, items preserve **stable catalog/portfolio order**. No numerical rank score is emitted.
    5. **Valid Result State:** It is completely legitimate for PackShift to conclude: *"No candidate is currently recommendable for transition: Candidate A requires a current SKU/recipe recycled-content declaration with provenance, while Candidate B is blocked by thermal incompatibility under the stated modeled operating context."*
- **Rationale:** Avoids false scientific precision. Decision support keeps the human specialist in control.

---

### D8 — Next-Action Semantics & Action Safety
- **Recommended Choice:** Every candidate receives a concrete, deterministic `NextAction` structure:
  - `action_code: Literal["REJECT_INCOMPATIBLE", "REQUEST_PCR_EVIDENCE", "REQUEST_CAPABILITY_EVIDENCE", "VERIFY_OPERATIONAL_PREMISES", "ADVANCE_TO_QA_REVIEW"]`
  - `summary: Text` (concise human-readable next step)
  - `details: Text` (specific missing evidence or violated constraint)
- **Standard Action Mappings:**
  1. `BLOCKED` $\rightarrow$ `REJECT_INCOMPATIBLE`:
     *"Do not advance this candidate for the stated modeled operating context. Violated constraint: {constraint_name} (documented {value} vs required {threshold}). Modify requirements or evaluate alternative candidate."*
  2. `REVIEW_REQUIRED + INSUFFICIENT_DATA` (e.g. Candidate A) $\rightarrow$ `REQUEST_PCR_EVIDENCE`:
     *"Calculation withheld. Request current SKU/recipe recycled-content declaration with provenance from manufacturer for {fields} and verify operational suitability."*
  3. `REVIEW_REQUIRED + CALCULATED` $\rightarrow$ `VERIFY_OPERATIONAL_PREMISES`:
     *"Environmental delta available ({reduction_g} g / {reduction_pct}%). Verify operational premises and food contact migration under production conditions with QA."*
  4. `ELIGIBLE + CALCULATED` $\rightarrow$ `ADVANCE_TO_QA_REVIEW`:
     *"Technical operational constraints evaluated by the bounded gate are satisfied. Advance to internal QA review, chemical migration testing, barrier analysis, and procurement evaluation under production conditions."*
- **Action Safety Guards:**
  - `ADVANCE_TO_QA_REVIEW` strictly means the evaluated operational constraints passed and the candidate may advance to human QA review; it does **not** imply procurement approval, food-safety certification, legal compliance, supplier approval, or deployment readiness.
  - Unsupported wording such as "audited SKU recipe declaration" is replaced by **"current SKU/recipe recycled-content declaration with provenance"** (since audit requirements are not specified in cited TDS).
  - Language is strictly scoped to the stated modeled operating context rather than asserting general physical failure.
- **Rationale:** Actionable decision support with strict epistemic restraint.

---

### D9 — Proposed Shared API Boundary
- **Recommended Choice:** Introduce a bounded, additive Selection API consisting of exactly three routes:
  1. `GET /api/v1/portfolios`: List available candidate portfolios with summary metadata.
  2. `GET /api/v1/portfolios/{portfolio_id}`: Retrieve default portfolio evaluation using curated default requirements.
  3. `POST /api/v1/portfolios/{portfolio_id}/evaluate`: Evaluate portfolio against user-specified operational requirements and optional annual units.
- **Rationale:** Clear separation of concerns; provides both zero-config inspection and interactive evaluation without overloading pairwise endpoints.

---

### D10 — Compatibility & Migration Strategy
- **Recommended Choice:** **100% Additive Evolution**.
  - All existing routes remain completely functional and unmodified:
    - `GET /api/v1/health`
    - `GET /api/v1/scenarios`
    - `GET /api/v1/scenarios/{id}/comparison`
  - Existing test suites in `backend/tests/test_api.py` and `backend/tests/test_virgin_plastic.py` continue to pass without alteration.
  - The new selection endpoints live in parallel under `/api/v1/portfolios`.
- **Rationale:** Protects the stable A-core and merged PUX-GF-01 frontend shell.

---

### D11 — Demo Contract
- **Recommended Choice:** Freeze the demo behavior using the Faerch 3-article portfolio:
  - **Operating Context:** Prepared-food hot-fill / microwave reheating ($T_{\max} = 95^\circ\text{C}$, microwave required). Stored in portfolio with `origin = "ASSUMED"`, `verification_state = "NOT_VERIFIED"`.
  - **Baseline:** Faerch P 2226-1C PP tray ($26.29\text{ g}$, $0\%$ PCR, $121^\circ\text{C}$, microwave affirmed, `TRAY_BODY_ONLY`). Baseline tray-body virgin plastic = $26.29\text{ g}$ (`CALCULATED`).
  - **Candidate A (C 2200-1L CPET):** $21.38\text{ g}$, $220^\circ\text{C}$, dual-ovenable/microwave affirmed, `TRAY_BODY_ONLY`. Recycled content unstated at SKU level.
    - Result: `REVIEW_REQUIRED` + `INSUFFICIENT_DATA`.
    - Next Action: `REQUEST_PCR_EVIDENCE` ("Request current SKU/recipe recycled-content declaration with provenance").
    - Demonstration message: *"PackShift refuses to hallucinate 'up to 70%' from marketing materials. Virgin plastic calculation is withheld until a SKU/recipe declaration with provenance is provided."*
  - **Candidate B (K 2182-1G APET):** $21.48\text{ g}$, $70^\circ\text{C}$, not ovenable (microwave unknown), `TRAY_BODY_ONLY`. Recycled content unstated.
    - Result: `BLOCKED` (documented $70^\circ\text{C} < 95^\circ\text{C}$ demo requirement) + `INSUFFICIENT_DATA`.
    - Next Action: `REJECT_INCOMPATIBLE` ("Candidate is operationally blocked under stated 95°C demo operating context. Do not advance.").
    - Demonstration message: *"PackShift blocks Candidate B based on manufacturer thermal limits. Operational gating prevents recommending an incompatible material regardless of theoretical savings."*
- **Rationale:** Directly addresses official judging criteria: virgin plastic priority (25%), practicality (15%), feasibility (15%), and innovation (10%).

---

## 7. Proposed Domain / API Contract

### 7.1 Domain Schemas (Pydantic / Python)

```python
from typing import Annotated, Literal
from pydantic import Field
from app.domain._contract import Contract
from app.domain.packaging import (
    ConstraintFinding,
    OperationalRequirements,
    Package,
    Text,
)

# Component Boundary Guard (D4)
ComponentBoundary = Literal[
    "TRAY_BODY_ONLY",
    "BODY_AND_FILM",
    "HINGED_COMPLETE_PACK",
    "BOTTLE_AND_CLOSURE",
    "CUSTOM",
]

# Recycled Content Point Value Status (D4)
RecycledContentPointValueStatus = Literal[
    "EXACT_POINT_VALUE",
    "NON_POINT_VALUE",
    "UNSTATED",
]

# Comparability Rating (D5)
ComparabilityRating = Literal[
    "STRONG",
    "BOUNDED_WITH_QUALIFIER",
    "ASYMMETRIC_BOUNDARY",
    "NOT_COMPARABLE",
]

# Action Codes (D8)
NextActionCode = Literal[
    "REJECT_INCOMPATIBLE",
    "REQUEST_PCR_EVIDENCE",
    "REQUEST_CAPABILITY_EVIDENCE",
    "VERIFY_OPERATIONAL_PREMISES",
    "ADVANCE_TO_QA_REVIEW",
]


class SelectionMetadata(Contract):
    """Additive metadata wrapper for Selection MVP candidates and baseline.
    Preserves existing A-core Package models and evidence fixtures without modification."""
    component_boundary: ComponentBoundary
    recycled_content_point_value_status: RecycledContentPointValueStatus = "UNSTATED"
    recycled_content_scope: str | None = None
    evidence_date: str | None = None


class CandidateArticle(Contract):
    """Additive composition: pairs existing Package with Selection-specific metadata."""
    package: Package
    metadata: SelectionMetadata


class ComparabilityAssessment(Contract):
    rating: ComparabilityRating
    boundary_match: bool
    notes: list[str]


class NextAction(Contract):
    action_code: NextActionCode
    summary: Text
    details: Text


class AnnualImpactResult(Contract):
    annual_units: Annotated[int, Field(gt=0)]
    annual_reduction_kg: float | None = None
    annual_current_virgin_kg: float | None = None
    annual_candidate_virgin_kg: float | None = None
    status: Literal["CALCULATED", "INSUFFICIENT_DATA"]
    is_actionable: bool
    disclosure: Text


class CalculationResult(Contract):
    status: Literal["CALCULATED", "INSUFFICIENT_DATA"]
    verification_state: Literal["INDICATIVE", "INSUFFICIENT_DATA"]
    current_virgin_pack_g: float | None = None
    candidate_virgin_pack_g: float | None = None
    reduction_g: float | None = None
    reduction_pct: float | None = None
    missing_fields: list[str] = Field(default_factory=list)


class EligibilityResult(Contract):
    status: Literal["ELIGIBLE", "REVIEW_REQUIRED", "BLOCKED"]
    constraints: list[ConstraintFinding] = Field(default_factory=list)


class CandidateAssessment(Contract):
    candidate: Package
    metadata: SelectionMetadata
    comparability: ComparabilityAssessment
    calculation: CalculationResult
    eligibility: EligibilityResult
    annual_impact: AnnualImpactResult | None = None
    next_action: NextAction


class BaselineAssessment(Contract):
    package: Package
    metadata: SelectionMetadata
    virgin_plastic_g: float | None
    calculation_status: Literal["CALCULATED", "INSUFFICIENT_DATA"]


class Portfolio(Contract):
    id: Text
    label: Text
    use_context: Text
    dataset_kind: Literal["ILLUSTRATIVE", "PUBLIC", "PROVIDER"]
    disclosure: Text
    baseline: CandidateArticle
    candidates: Annotated[list[CandidateArticle], Field(min_length=1)]
    default_operational_requirements: OperationalRequirements | None = None


# --- API Request & Response Contracts ---


class SelectionRequest(Contract):
    use_context: Text | None = None
    required_max_temperature_c: float | None = None
    microwave_required: bool | None = None
    annual_units: Annotated[int, Field(gt=0)] | None = None


class SelectionResponse(Contract):
    portfolio_id: Text
    label: Text
    dataset_kind: Literal["ILLUSTRATIVE", "PUBLIC", "PROVIDER"]
    disclosure: Text
    use_context: Text
    operational_requirements: OperationalRequirements
    annual_units_requested: int | None = None
    baseline: BaselineAssessment
    candidates: list[CandidateAssessment]
    summary_verdict: Text
```

### 7.2 Mirrored TypeScript Interfaces (`frontend/src/api/contracts.ts`)

```typescript
export type ComponentBoundary =
  | 'TRAY_BODY_ONLY'
  | 'BODY_AND_FILM'
  | 'HINGED_COMPLETE_PACK'
  | 'BOTTLE_AND_CLOSURE'
  | 'CUSTOM';

export type RecycledContentPointValueStatus =
  | 'EXACT_POINT_VALUE'
  | 'NON_POINT_VALUE'
  | 'UNSTATED';

export type ComparabilityRating =
  | 'STRONG'
  | 'BOUNDED_WITH_QUALIFIER'
  | 'ASYMMETRIC_BOUNDARY'
  | 'NOT_COMPARABLE';

export type NextActionCode =
  | 'REJECT_INCOMPATIBLE'
  | 'REQUEST_PCR_EVIDENCE'
  | 'REQUEST_CAPABILITY_EVIDENCE'
  | 'VERIFY_OPERATIONAL_PREMISES'
  | 'ADVANCE_TO_QA_REVIEW';

export interface SelectionMetadata {
  component_boundary: ComponentBoundary;
  recycled_content_point_value_status?: RecycledContentPointValueStatus;
  recycled_content_scope?: string | null;
  evidence_date?: string | null;
}

export interface CandidateArticle {
  package: Package;
  metadata: SelectionMetadata;
}

export interface ComparabilityAssessment {
  rating: ComparabilityRating;
  boundary_match: boolean;
  notes: string[];
}

export interface NextAction {
  action_code: NextActionCode;
  summary: string;
  details: string;
}

export interface AnnualImpactResult {
  annual_units: number;
  annual_reduction_kg: number | null;
  annual_current_virgin_kg: number | null;
  annual_candidate_virgin_kg: number | null;
  status: 'CALCULATED' | 'INSUFFICIENT_DATA';
  is_actionable: boolean;
  disclosure: string;
}

export interface CalculationResult {
  status: 'CALCULATED' | 'INSUFFICIENT_DATA';
  verification_state: 'INDICATIVE' | 'INSUFFICIENT_DATA';
  current_virgin_pack_g: number | null;
  candidate_virgin_pack_g: number | null;
  reduction_g: number | null;
  reduction_pct: number | null;
  missing_fields: string[];
}

export interface EligibilityResult {
  status: 'ELIGIBLE' | 'REVIEW_REQUIRED' | 'BLOCKED';
  constraints: ConstraintFinding[];
}

export interface CandidateAssessment {
  candidate: Package;
  metadata: SelectionMetadata;
  comparability: ComparabilityAssessment;
  calculation: CalculationResult;
  eligibility: EligibilityResult;
  annual_impact?: AnnualImpactResult | null;
  next_action: NextAction;
}

export interface BaselineAssessment {
  package: Package;
  metadata: SelectionMetadata;
  virgin_plastic_g: number | null;
  calculation_status: 'CALCULATED' | 'INSUFFICIENT_DATA';
}

export interface SelectionRequest {
  use_context?: string | null;
  required_max_temperature_c?: number | null;
  microwave_required?: boolean | null;
  annual_units?: number | null;
}

export interface SelectionResponse {
  portfolio_id: string;
  label: string;
  dataset_kind: 'ILLUSTRATIVE' | 'PUBLIC' | 'PROVIDER';
  disclosure: string;
  use_context: string;
  operational_requirements: OperationalRequirements;
  annual_units_requested?: number | null;
  baseline: BaselineAssessment;
  candidates: CandidateAssessment[];
  summary_verdict: string;
}
```

---

## 8. Positive Truth Table

All combinations where inputs are well-formed and non-trivial:

| # | Environmental Evidence | Operational Capability vs Requirement | Requirement Verification | Candidate Verification | Calculation Status | Eligibility Status | Actionable Annual Impact? | Next Action Code |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **P-01** | Complete numeric inputs | Satisfies all constraints ($T_{\text{cand}} \ge T_{\text{req}}$, MW match) | `VERIFIED` | `VERIFIED` | `CALCULATED` | `ELIGIBLE` | Yes (if units supplied; `is_actionable=True`) | `ADVANCE_TO_QA_REVIEW` |
| **P-02** | Complete numeric inputs | Satisfies all constraints ($T_{\text{cand}} \ge T_{\text{req}}$, MW match) | `ASSUMED` / `NOT_VERIFIED` | `SOURCE_AVAILABLE` | `CALCULATED` | `REVIEW_REQUIRED` | Yes (qualified; `is_actionable=True`) | `VERIFY_OPERATIONAL_PREMISES` |
| **P-03** | Complete numeric inputs | Violates constraint ($T_{\text{cand}} < T_{\text{req}}$ or MW mismatch) | Any | `SOURCE_AVAILABLE` | `CALCULATED` | `BLOCKED` | **Theoretical potential only** (`is_actionable=False`; prominent block disclosure) | `REJECT_INCOMPATIBLE` |
| **P-04** | Incomplete numeric inputs (e.g. PCR unknown) | Satisfies all constraints ($T_{\text{cand}} \ge T_{\text{req}}$, MW match) | `ASSUMED` / `NOT_VERIFIED` | `SOURCE_AVAILABLE` | `INSUFFICIENT_DATA` | `REVIEW_REQUIRED` | **NO** (`annual_impact` values remain unavailable / null) | `REQUEST_PCR_EVIDENCE` |
| **P-05** | Incomplete numeric inputs (e.g. PCR unknown) | Violates constraint ($T_{\text{cand}} < T_{\text{req}}$) | `ASSUMED` / `NOT_VERIFIED` | `SOURCE_AVAILABLE` | `INSUFFICIENT_DATA` | `BLOCKED` | **NO** (`annual_impact` values remain unavailable / null) | `REJECT_INCOMPATIBLE` |
| **P-06** | Complete numeric inputs | Operational requirements completely unmodeled ($None$) | N/A | N/A | `CALCULATED` | `REVIEW_REQUIRED` | Yes (qualified; `is_actionable=True`) | `VERIFY_OPERATIONAL_PREMISES` |
| **P-07** | Complete numeric inputs; Candidate virgin > Baseline virgin | Satisfies all constraints | `ASSUMED` | `SOURCE_AVAILABLE` | `CALCULATED` ($\Delta < 0$) | `REVIEW_REQUIRED` | Yes (negative saving; `is_actionable=True`) | `VERIFY_OPERATIONAL_PREMISES` |

---

## 9. Negative Truth Table

Edge cases, missing data, and invalid states:

| # | Scenario Condition | Behavior / Handling | Calculation Status | Eligibility Status | Epistemic Rationale |
| :- | :--- | :--- | :--- | :--- | :--- |
| **N-01** | Candidate recycled fraction is `None` | Withhold package virgin plastic and delta; list field in `missing_fields` | `INSUFFICIENT_DATA` | Independent (evaluates capabilities) | `missing ≠ 0`; cannot assume 0% or marketing ceiling |
| **N-02** | Candidate recycled fraction has `recycled_content_point_value_status = "NON_POINT_VALUE"` | Treat as non-point value (range, minimum, maximum/ceiling); withhold calculation | `INSUFFICIENT_DATA` | Independent | Non-point claims ("up to 70%", "min 40% Tray rPET") are not point estimates and must never be encoded as exact values |
| **N-03** | Baseline virgin plastic = 0 | Reduction g computed; `reduction_pct = None` | `CALCULATED` | Independent | Avoid division by zero; percentage is mathematically undefined |
| **N-04** | Negative environmental delta ($\Delta < 0$) | Report negative absolute and percentage reduction | `CALCULATED` | Independent | Transition increases virgin plastic; must be exposed transparently |
| **N-05** | `annual_units` absent or null | Omit `annual_impact` or return `None` | Preserved | Preserved | Do not invent hypothetical annual volume |
| **N-06** | `annual_units` provided, but calculation is `INSUFFICIENT_DATA` | `annual_reduction_kg = None`; status `INSUFFICIENT_DATA` | `INSUFFICIENT_DATA` | Independent | Volume cannot repair missing per-unit data |
| **N-07** | `annual_units <= 0` | HTTP 422 Unprocessable Entity (Pydantic validation failure) | N/A | N/A | Volume must be strictly positive integer |
| **N-08** | Candidate capability missing (e.g. microwave `None`) and required | Emit `REVIEW_REQUIRED` constraint finding | Independent | `REVIEW_REQUIRED` | Unknown capability cannot be assumed compatible or incompatible |
| **N-09** | Operating requirement present but value is null | Emit `REVIEW_REQUIRED` constraint finding | Independent | `REVIEW_REQUIRED` | Unstated requirement cannot establish eligibility |
| **N-10** | Component boundary mismatch (`boundary_match == False`, e.g. `TRAY_BODY_ONLY` vs `HINGED_COMPLETE_PACK`) | Assign `ASYMMETRIC_BOUNDARY`; withhold transition `reduction_g` and `reduction_pct` (`None`). Individual package totals remain visible with explicit scope. Zero synthetic volume normalization. | `INSUFFICIENT_DATA` (for delta) | Independent | Subtracting totals representing different boundaries produces false complete-package savings claims. |
| **N-11** | Empty candidate components list | HTTP 422 / Startup validation error | N/A | N/A | Empty inventory is invalid, not zero plastic |

---

## 10. Annual-Volume Semantics

### 10.1 Deterministic Arithmetic
When an explicit `annual_units` parameter is supplied:

$$\text{annual\_reduction\_kg} = \frac{\Delta_{\text{reduction\_g}} \times \text{annual\_units}}{1000}$$

$$\text{annual\_current\_virgin\_kg} = \frac{\text{current\_virgin\_pack\_g} \times \text{annual\_units}}{1000}$$

$$\text{annual\_candidate\_virgin\_kg} = \frac{\text{candidate\_virgin\_pack\_g} \times \text{annual\_units}}{1000}$$

### 10.2 Guard Rules
1. **Refusal on Missing Data:** If candidate virgin plastic calculation is `INSUFFICIENT_DATA`, all annual impact values (`annual_reduction_kg`, `annual_current_virgin_kg`, `annual_candidate_virgin_kg`) remain **strictly unavailable ($None$)**. Volume cannot repair missing per-unit data.
2. **Behavior on Blocked Status:** When `annual_units` exists, calculation is `CALCULATED`, and candidate eligibility is `BLOCKED`, the mathematical annual values **MAY be returned only as theoretical environmental potential**, with:
   - `is_actionable = False`
   - Prominent disclosure: *"Theoretical annual saving only. Candidate is operationally blocked and the annual result is not actionable under the stated modeled operating context."*
3. **No Invented Profi Data:** Annual impact must never cite Profi store counts, confidential procurement volumes, or client sales estimates.
4. **Mandatory Response Disclosure:** Every annual result payload includes:
   `"Hypothetical scenario based on user-supplied volume. Not actual Profi purchase volume, commercial commitment, or verified retail impact."`

---

## 11. Candidate Comparability Rule

To prevent greenwashing and invalid comparisons, PackShift classifies candidate comparability against the baseline:

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                             CANDIDATE COMPARABILITY TAXONOMY                                │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. STRONG                                                                                   │
│    • Identical manufacturer system and packaging format (e.g. open sealable tray).           │
│    • Identical component boundary (e.g. TRAY_BODY_ONLY to TRAY_BODY_ONLY).                   │
│    • Nominal volume matched within ±15%.                                                    │
│    • Primary TDS evidence available for both baseline and candidate.                        │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. BOUNDED_WITH_QUALIFIER                                                                   │
│    • Identical packaging format and component boundary.                                     │
│    • Nominal capacity differs by > 15%, OR baseline capacity is UNKNOWN on TDS.             │
│    • Example: Faerch P 2226-1C (volume unprinted) vs C 2200-1L (1000 ml).                   │
│    • Rule: Retain comparison; delta calculable; DO NOT synthesize mass-per-ml ratio.        │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. ASYMMETRIC_BOUNDARY (Strengthened Guard)                                                 │
│    • Functional job similar, but component boundaries differ.                               │
│    • Example: Tray body only (26.29 g) vs Hinged complete pack with lid (23.5 g).            │
│    • Rule: WITHHOLD transition delta (reduction_g = None, reduction_pct = None).            │
│    • Individual package totals remain visible with explicit component boundary scope.       │
│    • Delta requires establishing a common component boundary on both sides.                 │
│    • Zero synthetic normalization (never divide mass by volume or guess lid mass).          │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. NOT_COMPARABLE                                                                           │
│    • Packaging format fundamentally incompatible (e.g. flexible bag vs rigid thermoform).   │
│    • Rule: Withhold virgin plastic transition delta; flag as structurally non-comparable.   │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 12. Demo Trace (Judging Walkthrough)

This trace demonstrates the end-to-end user story for judges during an evaluation:

### Step 1: Set Operating Context
The judge or presenter defines the operational use context:
- Category: **Single-portion hot prepared food**
- Stated operating requirements:
  - Required maximum temperature: **$95^\circ\text{C}$** (`origin: ASSUMED`, `verification_state: NOT_VERIFIED`)
  - Microwave reheating required: **`True`** (`origin: ASSUMED`, `verification_state: NOT_VERIFIED`)
  - Annual volume scenario: **$250,000\text{ units}$** (`origin: USER_PROVIDED`, `verification_state: NOT_VERIFIED`)

### Step 2: System Identifies Reference Baseline
- Baseline article: **Faerch P 2226-1C PP Tray** (Item `2226014004`).
- Documented mass: $26.29\text{ g}$ (tray body only; `component_boundary: TRAY_BODY_ONLY`).
- Recycled content: $0\%$ (food-grade virgin PP platform claim).
- Baseline virgin plastic: $26.29\text{ g}$ per unit.
- Baseline annual virgin plastic (at 250k units): $6,572.5\text{ kg}$.

### Step 3: Candidate Evaluation & Gating

```text
========================================================================================
SELECTION EVALUATION RESULT
========================================================================================

[CANDIDATE A] Faerch C 2200-1L Evolve CPET (Item 2200012097)
├── Boundary: TRAY_BODY_ONLY | Comparability: BOUNDED_WITH_QUALIFIER (Baseline volume unstated)
├── Operational Assessment:
│   ├── Max Temperature: 220°C >= 95°C (PASS)
│   ├── Microwave: Affirmed (PASS)
│   └── Eligibility Verdict: REVIEW_REQUIRED (Decision premises are unverified assumptions)
├── Environmental Calculation:
│   ├── Tray Mass: 21.38 g
│   ├── Recycled Content: UNKNOWN (Datasheet withholds fluctuating recipe figure)
│   └── Calculation Status: INSUFFICIENT_DATA (Calculation withheld)
├── Annual Extrapolation: WITHHELD (Volume cannot repair missing per-unit PCR)
└── Next Action: REQUEST_PCR_EVIDENCE
    "Calculation withheld. Request current SKU/recipe recycled-content declaration with
     provenance from manufacturer for recipe 6811 before calculating virgin plastic delta."

----------------------------------------------------------------------------------------

[CANDIDATE B] Faerch K 2182-1G Clear APET (Item 2182015004)
├── Boundary: TRAY_BODY_ONLY | Comparability: BOUNDED_WITH_QUALIFIER
├── Operational Assessment:
│   ├── Max Temperature: 70°C < 95°C (FAIL — Documented thermal ceiling mismatch)
│   ├── Microwave: UNKNOWN ("Not ovenable" != not microwaveable)
│   └── Eligibility Verdict: BLOCKED (Incompatible with stated 95°C demo reheating context)
├── Environmental Calculation:
│   ├── Tray Mass: 21.48 g
│   ├── Recycled Content: UNKNOWN
│   └── Calculation Status: INSUFFICIENT_DATA
├── Annual Extrapolation: WITHHELD
└── Next Action: REJECT_INCOMPATIBLE
    "Candidate is operationally blocked under stated 95°C demo operating context. Do not advance."
========================================================================================
```

### Step 4: Judge Decision Conclusion
- **Summary:** PackShift successfully prevents greenwashing. It demonstrates that Candidate A meets thermal needs but cannot claim savings without a current SKU/recipe declaration with provenance. It demonstrates that Candidate B cannot be recommended because it fails the physical thermal requirements of the use context.
- **Human Role:** The human specialist uses PackShift to request the specific declaration for Candidate A from Faerch Sales/Compliance, rather than making false claims to leadership.

---

## 13. Compatibility Plan with Current Pairwise A-Core

1. **Unmodified Routes:**
   - `GET /api/v1/health` $\rightarrow$ Unchanged.
   - `GET /api/v1/scenarios` $\rightarrow$ Unchanged.
   - `GET /api/v1/scenarios/{id}/comparison` $\rightarrow$ Unchanged.
2. **Additive New Routes:**
   - `GET /api/v1/portfolios`: Returns list of curated portfolios.
   - `GET /api/v1/portfolios/{portfolio_id}`: Returns portfolio evaluation with default requirements.
   - `POST /api/v1/portfolios/{portfolio_id}/evaluate`: Evaluates portfolio with user-specified request overrides.
3. **Data Model Reuse:**
   - Existing models `Package`, `Component`, `NumericInput`, `BooleanInput`, `Provenance`, and `ConstraintFinding` are preserved 100% untouched.
   - Additive wrapper models `SelectionMetadata` and `CandidateArticle` encapsulate Selection-specific evidence guards without modifying the core `Package` schema.
4. **Verification Safety:**
   - Existing backend tests in `test_api.py` and `test_virgin_plastic.py` continue to pass with zero modifications.

---

## 14. Expected Files & Surfaces for IGR-R2B

IGR-R2B will implement the backend seam defined by this contract. Its expected modification scope is strictly bounded to:

### Backend Files to Modify / Create in IGR-R2B
1. **Domain Extensions:**
   - `backend/app/domain/packaging.py`: Add `ComponentBoundary`, `RecycledContentPointValueStatus`, `ComparabilityRating`, `NextActionCode`, `SelectionMetadata`, `CandidateArticle`, `ComparabilityAssessment`, `NextAction`, `AnnualImpactResult`, `CalculationResult`, `EligibilityResult`, `CandidateAssessment`, `BaselineAssessment`, `Portfolio`, `SelectionRequest`, `SelectionResponse`.
   - **Protection:** Do NOT modify existing fields of `Package`, `Component`, `Scenario`, `Comparison`, or `OperationalRequirements`.
2. **Service Seam:**
   - `backend/app/services/selection.py` (NEW): Implement deterministic portfolio evaluation, comparability assessment with asymmetric boundary delta withholding, operational gating across candidates, annual extrapolation, and next-action assignment.
3. **FastAPI Endpoints:**
   - `backend/app/main.py`: Register the three Selection routes:
     - `GET /api/v1/portfolios`
     - `GET /api/v1/portfolios/{portfolio_id}`
     - `POST /api/v1/portfolios/{portfolio_id}/evaluate`
4. **Evidence / Data:**
   - `data/evidence/public-packaging.json` (or dedicated portfolio fixture): Ingest Faerch 3-article portfolio with attributed datasheets.
5. **Automated Tests:**
   - `backend/tests/test_selection.py` (NEW): Comprehensive unit and integration test suite covering truth tables, annual volume rules, comparability ratings, asymmetric boundary delta withholding, and negative cases.

### Protected Surfaces (Out of Scope for IGR-R2B)
- `frontend/**` (Reserved for frontend integration workstream).
- `docs/canon/**` (Protected canon).

---

## 15. Risks & UNKNOWNs

| Risk / UNKNOWN | Impact on Selection MVP | Mitigation / Handling Strategy |
| :--- | :--- | :--- |
| **Candidate A fluctuating PCR fraction** | Cannot calculate virgin-plastic reduction for Candidate A | Withhold calculation (`INSUFFICIENT_DATA`); demonstrate anti-greenwashing refusal. |
| **Candidate B microwave capability unstated** | Cannot evaluate microwave compatibility for Candidate B | Retain capability as `UNKNOWN`; emit `REVIEW_REQUIRED` finding for microwave; candidate remains `BLOCKED` on temperature. |
| **Baseline Faerch P 2226-1C volume unprinted** | Cannot compute exact volume-matched capacity ratio | Mark comparability as `BOUNDED_WITH_QUALIFIER`; forbid synthetic mass-per-ml division. |
| **Sealing film mass unquantified across all trays** | Complete packaging system weight is unknown | Enforce `component_boundary = TRAY_BODY_ONLY`; explicitly disclose that film is excluded. |
| **No confidential Profi provider data provided** | Cannot claim actual retailer impact | Label public dataset as `PUBLIC`; enforce explicit disclaimers on annual volume. |
| **Wider packaging qualification (migration, barrier)** | Cannot certify food safety or shelf life | Enforce advisory finding `food-contact-suitability` = `REVIEW_REQUIRED`; software provides decision support only. |

---

## 16. Explicit Human Gate (INT-R2-HG1)

```text
========================================================================================
INT-R2 PHASE A COMPLETE — HUMAN GATE INT-R2-HG1 (RECONCILED)
========================================================================================

Original Inspected Base: bb17de0e55e3630cffc197c97982a73ba4e0ea1b (main)
Reconciled Current Main: 73c94e95aa280024f2778195e54db22cba9dc000 (origin/main)
Task Branch: vladimir/int-r2-selection-mvp-contract
Current Branch HEAD: 14b1cbe8a1ef2519e0830fba62823595c3ca44e1 (reconciled on origin/main @ 73c94e95aa280024f2778195e54db22cba9dc000)

Changed Files (Phase A):
- docs/review/INT-R2-selection-mvp-contract.md (Reconciled)

Recommended Decisions:
D1 (Selection Unit): 1 Baseline + N Curated Candidates + 1 Operational Use Context.
D2 (Use-Context Inputs): Reuse OperationalRequirements with strict provenance: portfolio defaults = ASSUMED / NOT_VERIFIED, user overrides = USER_PROVIDED / NOT_VERIFIED. MODELING_ASSUMPTION remains descriptive language only.
D3 (Annual Volume): Optional integer annual_units; linear extrapolation when calculable; null on INSUFFICIENT_DATA; mathematical annual values returned only as theoretical potential with is_actionable=False and prominent block disclosure when BLOCKED.
D4 (Candidate Evidence): Additive SelectionMetadata wrapper around existing Package; ZERO breaking changes to existing A-core Package or Component models.
D5 (Comparability): Strengthened ASYMMETRIC_BOUNDARY: transition delta (reduction_g, reduction_pct) is WITHHELD when boundaries differ; individual package totals remain visible with explicit scope. Zero synthetic volume normalization.
D6 (Dual Axes): Preserve orthogonal Calculation (CALCULATED/INSUFFICIENT_DATA) and Eligibility (ELIGIBLE/REVIEW_REQUIRED/BLOCKED).
D7 (Selection Semantics): Deterministic decision-state grouping; strict ban on TOPSIS, AHP, or weighted ranking.
D8 (Next Actions): Structured action_code (ADVANCE_TO_QA_REVIEW, REQUEST_PCR_EVIDENCE, REQUEST_CAPABILITY_EVIDENCE, VERIFY_OPERATIONAL_PREMISES, REJECT_INCOMPATIBLE) + human guidance; replaced "audited declaration" with "current SKU/recipe declaration with provenance".
D9 (API Boundary): Exactly three additive routes: GET /api/v1/portfolios, GET /api/v1/portfolios/{portfolio_id}, POST /api/v1/portfolios/{portfolio_id}/evaluate.
D10 (Compatibility): 100% additive; zero modification or breakage of existing pairwise A-core.
D11 (Demo Contract): Faerch 3-article set against 95°C / microwave-safe context demonstrating refusal and operational gating.

Proposed Selection API / Domain Boundary:
- Domain Models:
  - ComponentBoundary, RecycledContentPointValueStatus, ComparabilityRating, NextActionCode
  - SelectionMetadata (component_boundary, recycled_content_point_value_status, recycled_content_scope, evidence_date)
  - CandidateArticle (package: Package, metadata: SelectionMetadata)
  - ComparabilityAssessment, NextAction, AnnualImpactResult, CalculationResult, EligibilityResult, CandidateAssessment, BaselineAssessment, Portfolio
  - SelectionRequest, SelectionResponse
- Endpoints (3 routes):
  - GET /api/v1/portfolios
  - GET /api/v1/portfolios/{portfolio_id}
  - POST /api/v1/portfolios/{portfolio_id}/evaluate

Protected Invariants Confirmed:
- CALCULATED != VERIFIED; SOURCE_AVAILABLE != VERIFIED; missing != 0; PUBLIC != PROVIDER.
- Environmental calculation != operational eligibility != implementation approval.
- Existing virgin plastic arithmetic unchanged.
- No TOPSIS, AHP, LCA, ROI, or AI/LLM models introduced.
- No frontend files modified; PUX-GF-01 cleanly merged on main.

Open UNKNOWNs:
- SKU-level recipe PCR for Candidate A and Candidate B (withheld by manufacturer TDS).
- Sealing film masses unquantified across all articles.
- Client-specific food-contact migration under real food matrices.

Expected IGR-R2B Implementation Surface:
- backend/app/domain/packaging.py (extend models additively via wrappers)
- backend/app/services/selection.py (new service with asymmetric delta withholding)
- backend/app/main.py (register the 3 selection routes)
- data/evidence/public-packaging.json (ingest Faerch portfolio)
- backend/tests/test_selection.py (new tests)

Verification Performed:
- Rebased cleanly onto origin/main (73c94e95aa280024f2778195e54db22cba9dc000).
- git diff --check -> PASS (0 whitespace errors).
- git diff --name-only origin/main...HEAD -> only docs/review/INT-R2-selection-mvp-contract.md.
- pytest backend/tests -> 58/58 passed in 2.29s.

HUMAN DECISION REQUIRED:
Approve / modify D1–D11 before shared-contract implementation in IGR-R2B.
========================================================================================
```
