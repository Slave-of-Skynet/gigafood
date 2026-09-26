from contextlib import asynccontextmanager
import os
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

from app.domain.packaging import (
    Comparison,
    EconomicScenarioRequest,
    EconomicScenarioResponse,
    Evidence,
    Health,
    Portfolio,
    PortfolioSummary,
    Scenario,
    SelectionRequest,
    SelectionResponse,
)
from app.domain.recommendation import (
    RecommendationCandidatesResponse,
    RecommendationEvaluationRequest,
    RecommendationEvaluationResponse,
    RecommendationProductsResponse,
)
from app.runtime.context import load_runtime
from app.runtime.recommendation import (
    RecommendationRuntime,
    load_recommendation_runtime,
)
from app.services.economics import evaluate_economic_scenario
from app.services.recommendation import evaluate_recommendation
from app.services.selection import evaluate_portfolio
from app.services.virgin_plastic import compare

DEFAULT_EVIDENCE = Path(__file__).resolve().parents[2] / "data/evidence/demo-packaging.json"
DEFAULT_PORTFOLIOS = Path(__file__).resolve().parents[2] / "data/evidence/selection-portfolios.json"
DEFAULT_HTF03 = Path(__file__).resolve().parents[2] / "docs/evidence/htf-03"


def create_app(
    evidence_path: Path | None = None,
    portfolios_path: Path | None = None,
    htf03_path: Path | None = None,
) -> FastAPI:
    path = evidence_path if evidence_path is not None else Path(os.environ.get("GIGAFOOD_EVIDENCE_PATH", str(DEFAULT_EVIDENCE)))
    port_path = (
        portfolios_path
        if portfolios_path is not None
        else Path(os.environ.get("GIGAFOOD_PORTFOLIOS_PATH", str(DEFAULT_PORTFOLIOS)))
    )
    h_path = (
        htf03_path
        if htf03_path is not None
        else Path(os.environ.get("GIGAFOOD_HTF03_PATH", str(DEFAULT_HTF03)))
    )

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        app.state.runtime = load_runtime(path, port_path)
        app.state.recommendation_runtime = load_recommendation_runtime(h_path)
        yield

    app = FastAPI(title="PackShift API", version="0.1.0", lifespan=lifespan)

    def evidence(request: Request) -> Evidence:
        runtime = request.app.state.runtime
        if runtime.evidence is None:
            raise HTTPException(503, detail="EVIDENCE_UNAVAILABLE")
        return runtime.evidence

    def get_recommendation_runtime(request: Request) -> RecommendationRuntime:
        rt = getattr(request.app.state, "recommendation_runtime", None)
        if rt is None or not rt.is_available:
            raise HTTPException(503, detail="RECOMMENDATION_EVIDENCE_UNAVAILABLE")
        return rt

    @app.get("/api/v1/health", response_model=Health, responses={503: {"model": Health}})
    def health(request: Request):
        runtime = request.app.state.runtime
        data = runtime.evidence
        body = Health(status="READY" if data else "UNAVAILABLE",
                      evidence_version=data.schema_version if data else None,
                      dataset_kind=data.dataset_kind if data else None,
                      disclosure=data.disclosure if data else None, error=runtime.error)
        return JSONResponse(body.model_dump(), status_code=200 if data else 503)

    @app.get("/api/v1/scenarios", response_model=Evidence)
    def scenarios(request: Request):
        return evidence(request)

    @app.get("/api/v1/scenarios/{scenario_id}/comparison", response_model=Comparison)
    def comparison(scenario_id: str, request: Request):
        data = evidence(request)
        scenario: Scenario | None = next((s for s in data.scenarios if s.id == scenario_id), None)
        if scenario is None:
            raise HTTPException(404, detail="SCENARIO_NOT_FOUND")
        return compare(scenario)

    @app.post("/api/v1/scenarios/{scenario_id}/economics", response_model=EconomicScenarioResponse)
    def scenario_economics(scenario_id: str, body: EconomicScenarioRequest, request: Request):
        data = evidence(request)
        scenario: Scenario | None = next((s for s in data.scenarios if s.id == scenario_id), None)
        if scenario is None:
            raise HTTPException(404, detail="SCENARIO_NOT_FOUND")
        return evaluate_economic_scenario(scenario, body)

    # --- Selection MVP Endpoints (INT-R2 D9 Additive Evolution) ---

    @app.get("/api/v1/portfolios", response_model=list[PortfolioSummary])
    def portfolios(request: Request):
        runtime = request.app.state.runtime
        if runtime.portfolios_error or not runtime.portfolios:
            raise HTTPException(503, detail="PORTFOLIOS_UNAVAILABLE")
        return [
            PortfolioSummary(
                id=p.id,
                label=p.label,
                use_context=p.use_context,
                dataset_kind=p.dataset_kind,
                disclosure=p.disclosure,
                baseline_label=p.baseline.package.label,
                candidate_count=len(p.candidates),
            )
            for p in runtime.portfolios
        ]

    @app.get("/api/v1/portfolios/{portfolio_id}", response_model=SelectionResponse)
    def portfolio_default(portfolio_id: str, request: Request):
        runtime = request.app.state.runtime
        if runtime.portfolios_error:
            raise HTTPException(503, detail="PORTFOLIOS_UNAVAILABLE")
        portfolio = next((p for p in runtime.portfolios if p.id == portfolio_id), None)
        if portfolio is None:
            raise HTTPException(404, detail="PORTFOLIO_NOT_FOUND")
        return evaluate_portfolio(portfolio, None)

    @app.post("/api/v1/portfolios/{portfolio_id}/evaluate", response_model=SelectionResponse)
    def portfolio_evaluate(portfolio_id: str, body: SelectionRequest, request: Request):
        runtime = request.app.state.runtime
        if runtime.portfolios_error:
            raise HTTPException(503, detail="PORTFOLIOS_UNAVAILABLE")
        portfolio = next((p for p in runtime.portfolios if p.id == portfolio_id), None)
        if portfolio is None:
            raise HTTPException(404, detail="PORTFOLIO_NOT_FOUND")
        return evaluate_portfolio(portfolio, body)

    # --- Recommendation Runtime Endpoints (IGR-HT2 Additive API) ---

    @app.get("/api/v1/recommendation/products", response_model=RecommendationProductsResponse)
    def recommendation_products(request: Request):
        rt = get_recommendation_runtime(request)
        return RecommendationProductsResponse(
            schema_version="htf03.recommendation.v1",
            dataset_id=rt.dataset_id,
            research_cut_off=rt.research_cut_off,
            market=rt.market,
            source_revision_hash=rt.source_revision_hash or "unknown",
            products=rt.products,
            workflows=rt.workflows,
            default_product_id="P1",
            default_workflow_id="POST_COOK_HOT_HOLD_6H",
            effective_assumptions=list(rt.effective_assumptions),
        )

    @app.get("/api/v1/recommendation/candidates", response_model=RecommendationCandidatesResponse)
    def recommendation_candidates(request: Request):
        rt = get_recommendation_runtime(request)
        return RecommendationCandidatesResponse(
            schema_version="htf03.recommendation.v1",
            dataset_id=rt.dataset_id,
            research_cut_off=rt.research_cut_off,
            market=rt.market,
            source_revision_hash=rt.source_revision_hash or "unknown",
            candidates=rt.candidates,
            configurations=rt.configurations,
            baselines=rt.baselines,
            referenced_sources=rt.sources,
            rendering_contract=rt.rendering_contract,
            disclosures=list(rt.disclosures),
        )

    @app.post("/api/v1/recommendation/evaluate", response_model=RecommendationEvaluationResponse)
    def recommendation_evaluate(body: RecommendationEvaluationRequest, request: Request):
        rt = get_recommendation_runtime(request)
        return evaluate_recommendation(rt, body)

    return app


app = create_app()
