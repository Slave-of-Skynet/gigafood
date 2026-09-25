from contextlib import asynccontextmanager
import os
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

from app.domain.packaging import Comparison, Evidence, Health, Scenario
from app.runtime.context import load_runtime
from app.services.virgin_plastic import compare

DEFAULT_EVIDENCE = Path(__file__).resolve().parents[2] / "data/evidence/demo-packaging.json"


def create_app(evidence_path: Path | None = None) -> FastAPI:
    path = evidence_path if evidence_path is not None else Path(os.environ.get("GIGAFOOD_EVIDENCE_PATH", str(DEFAULT_EVIDENCE)))

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        app.state.runtime = load_runtime(path)
        yield

    app = FastAPI(title="GigaFood A-core", version="0.1.0", lifespan=lifespan)

    def evidence(request: Request) -> Evidence:
        runtime = request.app.state.runtime
        if runtime.evidence is None:
            raise HTTPException(503, detail="EVIDENCE_UNAVAILABLE")
        return runtime.evidence

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

    return app


app = create_app()
