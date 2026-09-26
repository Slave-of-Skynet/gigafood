import json
from pathlib import Path

from fastapi.testclient import TestClient
import pytest

from app.main import DEFAULT_EVIDENCE, DEFAULT_PORTFOLIOS, DEFAULT_HTF03, create_app


@pytest.fixture
def client():
    app = create_app(DEFAULT_EVIDENCE, DEFAULT_PORTFOLIOS, DEFAULT_HTF03)
    with TestClient(app) as test_client:
        yield test_client


def test_recommendation_products_catalogue(client: TestClient):
    response = client.get("/api/v1/recommendation/products")
    assert response.status_code == 200
    data = response.json()

    assert data["schema_version"] == "htf03.recommendation.v1"
    assert data["dataset_id"] == "HTF-03-canonical-packaging"
    assert data["market"] == "Romania"
    assert data["default_product_id"] == "P1"
    assert data["default_workflow_id"] == "POST_COOK_HOT_HOLD_6H"
    assert len(data["source_revision_hash"]) == 64

    products = data["products"]
    assert len(products) == 4
    product_ids = [p["product_id"] for p in products]
    assert product_ids == ["P1", "P2", "P3", "P4"]

    # Epistemic check on product geometry: provider dimensions not supplied
    p1 = next(p for p in products if p["product_id"] == "P1")
    assert p1["fill_geometry"]["state"] == "UNKNOWN"
    assert p1["fill_geometry"]["value"] is None
    assert p1["fill_geometry"]["display_policy"] == "DO_NOT_DISPLAY"
    assert p1["decision"]["first_qualification_candidate"] == "C1"
    assert p1["decision"]["outcome"] == "QUALIFICATION REQUIRED"

    workflows = data["workflows"]
    assert len(workflows) == 2
    workflow_ids = [w["workflow_id"] for w in workflows]
    assert "POST_COOK_HOT_HOLD_6H" in workflow_ids
    assert "LITERAL_OVEN_250C_THEN_HOLD" in workflow_ids

    primary_wf = next(w for w in workflows if w["workflow_id"] == "POST_COOK_HOT_HOLD_6H")
    assert primary_wf["is_primary"] is True
    assert primary_wf["target_duration_min"] == 360
    assert primary_wf["status"] == "ASSUMED"


def test_recommendation_candidates_catalogue(client: TestClient):
    response = client.get("/api/v1/recommendation/candidates")
    assert response.status_code == 200
    data = response.json()

    candidates = data["candidates"]
    assert len(candidates) == 6
    c_ids = [c["candidate_id"] for c in candidates]
    assert set(c_ids) == {"C1", "C2", "C3", "C4", "C5", "C6"}

    # Configurations check
    configs = data["configurations"]
    assert len(configs) == 4
    config_ids = [c["configuration_id"] for c in configs]
    assert set(config_ids) == {"C6-RO-P", "C6-RO-W", "C6-RO-H", "C6-EU"}

    # Baselines check
    baselines = data["baselines"]
    assert len(baselines) == 3
    b_ids = [b["baseline_id"] for b in baselines]
    assert set(b_ids) == {"B1", "B2", "B3"}
    b1 = next(b for b in baselines if b["baseline_id"] == "B1")
    assert b1["is_profi_incumbent"] is True
    assert b1["identity"] == "ACTUAL_PROFI_INCUMBENT"
    assert b1["observed_virgin_fraction"] == 1.0

    b3 = next(b for b in baselines if b["baseline_id"] == "B3")
    assert b3["is_profi_incumbent"] is False
    assert b3["observed_price_ron"] == pytest.approx(0.37026)

    # Disclosures check
    assert len(data["disclosures"]) >= 4


def test_evaluate_p1_post_cook(client: TestClient):
    payload = {
        "product_id": "P1",
        "workflow_id": "POST_COOK_HOT_HOLD_6H",
    }
    response = client.post("/api/v1/recommendation/evaluate", json=payload)
    assert response.status_code == 200
    data = response.json()

    # Recommendation summary
    rec = data["recommendation"]
    assert rec["first_qualification_candidate_id"] == "C1"
    assert rec["first_qualification_outcome"] == "QUALIFICATION REQUIRED"
    assert rec["first_qualification_priority"] == 1
    assert rec["qualified_survivors"] == []

    # Selected configuration for C6 is C6-RO-W
    assert data["context"]["selected_configuration_id"] == "C6-RO-W"

    assessments = data["assessments"]
    assert len(assessments) == 6

    # C1 is first qualification path
    c1 = next(a for a in assessments if a["candidate_id"] == "C1")
    assert c1["is_first_qualification_path"] is True
    assert c1["role"] == "FIRST_QUALIFICATION_PATH"
    assert c1["outcome"] == "QUALIFICATION REQUIRED"
    assert c1["qualification_priority"] == 1
    assert c1["qualified_survivor"] is False
    assert c1["approved_for_procurement"] is False
    assert len(c1["gates"]) == 6

    # C6 is priority 2 alternative with configuration C6-RO-W
    c6 = next(a for a in assessments if a["candidate_id"] == "C6")
    assert c6["configuration_id"] == "C6-RO-W"
    assert c6["qualification_priority"] == 2
    assert c6["role"] == "PRIORITY_ALTERNATIVE"
    assert c6["outcome"] == "QUALIFICATION REQUIRED"

    # C4 is BLOCKED
    c4 = next(a for a in assessments if a["candidate_id"] == "C4")
    assert c4["outcome"] == "BLOCKED"
    assert c4["role"] == "BLOCKED"

    # Explicitly check C6-RO-W explicit parameter
    response_explicit = client.post(
        "/api/v1/recommendation/evaluate",
        json={"product_id": "P1", "workflow_id": "POST_COOK_HOT_HOLD_6H", "configuration_id": "C6-RO-W"},
    )
    assert response_explicit.status_code == 200
    assert response_explicit.json()["context"]["selected_configuration_id"] == "C6-RO-W"


def test_evaluate_p1_literal_oven_250c(client: TestClient):
    payload = {
        "product_id": "P1",
        "workflow_id": "LITERAL_OVEN_250C_THEN_HOLD",
    }
    response = client.post("/api/v1/recommendation/evaluate", json=payload)
    assert response.status_code == 200
    data = response.json()

    # C6 binds to C6-RO-H
    assert data["context"]["selected_configuration_id"] == "C6-RO-H"

    assessments = data["assessments"]
    by_cid = {a["candidate_id"]: a for a in assessments}

    # C2, C3, C4, C5 are all BLOCKED
    assert by_cid["C2"]["outcome"] == "BLOCKED"
    assert by_cid["C3"]["outcome"] == "BLOCKED"
    assert by_cid["C4"]["outcome"] == "BLOCKED"
    assert by_cid["C5"]["outcome"] == "BLOCKED"

    # C6-RO-H is QUALIFICATION REQUIRED with priority 2
    assert by_cid["C6"]["configuration_id"] == "C6-RO-H"
    assert by_cid["C6"]["outcome"] == "QUALIFICATION REQUIRED"
    assert by_cid["C6"]["qualification_priority"] == 2
    assert by_cid["C6"]["role"] == "PRIORITY_ALTERNATIVE"

    # Zero qualified survivors
    assert data["recommendation"]["qualified_survivors"] == []


def test_evaluate_portions_post_cook(client: TestClient):
    for pid in ("P2", "P3", "P4"):
        response = client.post(
            "/api/v1/recommendation/evaluate",
            json={"product_id": pid, "workflow_id": "POST_COOK_HOT_HOLD_6H"},
        )
        assert response.status_code == 200
        data = response.json()

        rec = data["recommendation"]
        assert rec["first_qualification_candidate_id"] == "C5"
        assert rec["first_qualification_outcome"] == "QUALIFICATION REQUIRED"
        assert data["context"]["selected_configuration_id"] == "C6-RO-P"

        c6 = next(a for a in data["assessments"] if a["candidate_id"] == "C6")
        assert c6["configuration_id"] == "C6-RO-P"
        assert c6["qualification_priority"] == 2


def test_evaluate_invalid_c6_configurations(client: TestClient):
    # P1 + POST_COOK with C6-RO-P is invalid (only C6-RO-W is evaluated for P1 post-cook)
    res1 = client.post(
        "/api/v1/recommendation/evaluate",
        json={"product_id": "P1", "workflow_id": "POST_COOK_HOT_HOLD_6H", "configuration_id": "C6-RO-P"},
    )
    assert res1.status_code == 422
    assert res1.json()["detail"] == "CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT"

    # P1 + LITERAL_OVEN with C6-RO-W is invalid (only C6-RO-H is evaluated for literal oven)
    res2 = client.post(
        "/api/v1/recommendation/evaluate",
        json={"product_id": "P1", "workflow_id": "LITERAL_OVEN_250C_THEN_HOLD", "configuration_id": "C6-RO-W"},
    )
    assert res2.status_code == 422
    assert res2.json()["detail"] == "CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT"

    # C6-EU has no evaluated gate row for any context in the committed snapshot
    res3 = client.post(
        "/api/v1/recommendation/evaluate",
        json={"product_id": "P1", "workflow_id": "LITERAL_OVEN_250C_THEN_HOLD", "configuration_id": "C6-EU"},
    )
    assert res3.status_code == 422
    assert res3.json()["detail"] == "CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT"

    # P2 + POST_COOK with C6-RO-W is invalid (only C6-RO-P for portions)
    res4 = client.post(
        "/api/v1/recommendation/evaluate",
        json={"product_id": "P2", "workflow_id": "POST_COOK_HOT_HOLD_6H", "configuration_id": "C6-RO-W"},
    )
    assert res4.status_code == 422
    assert res4.json()["detail"] == "CONFIGURATION_NOT_EVALUATED_FOR_CONTEXT"


def test_evaluate_adversarial_inputs(client: TestClient):
    # Unknown product
    res = client.post(
        "/api/v1/recommendation/evaluate",
        json={"product_id": "P99", "workflow_id": "POST_COOK_HOT_HOLD_6H"},
    )
    assert res.status_code == 422
    assert res.json()["detail"] == "UNKNOWN_PRODUCT_ID"

    # Unknown workflow
    res = client.post(
        "/api/v1/recommendation/evaluate",
        json={"product_id": "P1", "workflow_id": "FREEZER_ONLY"},
    )
    assert res.status_code == 422
    assert res.json()["detail"] == "UNKNOWN_WORKFLOW_ID"

    # Unknown configuration
    res = client.post(
        "/api/v1/recommendation/evaluate",
        json={"product_id": "P1", "workflow_id": "POST_COOK_HOT_HOLD_6H", "configuration_id": "C6-NONEXISTENT"},
    )
    assert res.status_code == 422
    assert res.json()["detail"] == "UNKNOWN_CONFIGURATION_ID"

    # Extra forbidden keys in request body
    res = client.post(
        "/api/v1/recommendation/evaluate",
        json={"product_id": "P1", "workflow_id": "POST_COOK_HOT_HOLD_6H", "extra_injected_key": "bad"},
    )
    assert res.status_code == 422


def test_no_leak_of_material_only_co2e(client: TestClient):
    # Test candidate catalogue
    res_cand = client.get("/api/v1/recommendation/candidates")
    assert res_cand.status_code == 200
    cand_text = res_cand.text
    assert "material_only_co2e_kg" not in cand_text
    assert "eco_score" not in cand_text
    assert "carbon_score" not in cand_text

    # Test evaluation endpoint
    res_eval = client.post(
        "/api/v1/recommendation/evaluate",
        json={"product_id": "P1", "workflow_id": "POST_COOK_HOT_HOLD_6H"},
    )
    assert res_eval.status_code == 200
    eval_text = res_eval.text
    assert "material_only_co2e_kg" not in eval_text
    assert "eco_score" not in eval_text
    assert "carbon_score" not in eval_text


def test_unavailable_recommendation_runtime(tmp_path: Path):
    empty_dir = tmp_path / "empty_htf03"
    empty_dir.mkdir()
    app = create_app(DEFAULT_EVIDENCE, DEFAULT_PORTFOLIOS, empty_dir)
    with TestClient(app) as unavail_client:
        res1 = unavail_client.get("/api/v1/recommendation/products")
        assert res1.status_code == 503
        assert res1.json()["detail"] == "RECOMMENDATION_EVIDENCE_UNAVAILABLE"

        res2 = unavail_client.get("/api/v1/recommendation/candidates")
        assert res2.status_code == 503
        assert res2.json()["detail"] == "RECOMMENDATION_EVIDENCE_UNAVAILABLE"

        res3 = unavail_client.post(
            "/api/v1/recommendation/evaluate",
            json={"product_id": "P1", "workflow_id": "POST_COOK_HOT_HOLD_6H"},
        )
        assert res3.status_code == 503
        assert res3.json()["detail"] == "RECOMMENDATION_EVIDENCE_UNAVAILABLE"

        # Verify that legacy routes still work and do NOT fail due to recommendation unavailability
        health = unavail_client.get("/api/v1/health")
        assert health.status_code == 200
        assert health.json()["status"] == "READY"
