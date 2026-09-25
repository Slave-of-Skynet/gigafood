import json
from pathlib import Path

from fastapi.testclient import TestClient
import pytest

from app.main import DEFAULT_EVIDENCE, create_app


def test_ready_and_comparisons():
    with TestClient(create_app(DEFAULT_EVIDENCE)) as client:
        health = client.get("/api/v1/health")
        assert health.status_code == 200
        assert health.json()["status"] == "READY"
        evidence = client.get("/api/v1/scenarios").json()
        assert evidence["dataset_kind"] == "ILLUSTRATIVE"
        assert "NOT PROFI" in evidence["disclosure"]
        assert len(evidence["scenarios"]) == 2
        response = client.get("/api/v1/scenarios/illustrative-reduction/comparison")
        assert response.status_code == 200
        body = response.json()
        assert body["current_virgin_pack_g"] == 15
        assert body["candidate_virgin_pack_g"] == 8
        assert body["reduction_g"] == 7
        assert body["reduction_pct"] == pytest.approx(7 / 15 * 100)
        assert body["constraints"][0]["verification_state"] == "NOT_VERIFIED"
        assert '"VERIFIED"' not in response.text
        assert "annual" not in response.text.lower()
        assert "ppwr_compliant" not in response.text
        incomplete = client.get("/api/v1/scenarios/illustrative-incomplete/comparison").json()
        assert incomplete["status"] == "INSUFFICIENT_DATA"
        assert incomplete["candidate_virgin_pack_g"] is None
        assert incomplete["reduction_g"] is None
        assert incomplete["reduction_pct"] is None
        # Defect A fix: missing calculation evidence must not result in operational BLOCKED
        assert incomplete["eligibility_status"] != "BLOCKED"
        assert not any(c["status"] == "BLOCKED" for c in incomplete["constraints"])
        assert client.get("/api/v1/scenarios/no-such-id/comparison").status_code == 404


def assert_unavailable(path):
    with TestClient(create_app(path)) as client:
        response = client.get("/api/v1/health")
        assert response.status_code == 503
        assert response.json()["status"] == "UNAVAILABLE"
        assert response.json()["error"] == "EVIDENCE_UNAVAILABLE"
        for route in ["/api/v1/scenarios", "/api/v1/scenarios/illustrative-reduction/comparison"]:
            response = client.get(route)
            assert response.status_code == 503
            assert response.json() == {"detail": "EVIDENCE_UNAVAILABLE"}


def test_missing_evidence(tmp_path):
    assert_unavailable(tmp_path / "absent.json")


def test_unreadable_evidence(monkeypatch):
    def deny(*args, **kwargs):
        raise PermissionError("test access denied")
    monkeypatch.setattr(Path, "read_text", deny)
    assert_unavailable(DEFAULT_EVIDENCE)


@pytest.mark.parametrize("content", [b"{broken", b"\xff", b'{}'])
def test_corrupt_evidence(tmp_path, content):
    path = tmp_path / "evidence.json"
    path.write_bytes(content)
    assert_unavailable(path)


def test_invalid_numeric_evidence_and_duplicate_ids(tmp_path):
    for invalid in ["fraction", "duplicate", "unknown_field"]:
        data = json.loads(DEFAULT_EVIDENCE.read_text(encoding="utf-8"))
        if invalid == "fraction":
            data["scenarios"][0]["candidate"]["components"][0]["recycled_content_fraction"]["value"] = 2
        elif invalid == "duplicate":
            data["scenarios"][1]["id"] = data["scenarios"][0]["id"]
        else:
            data["annual_impact"] = 100
        path = tmp_path / "evidence.json"
        path.write_text(json.dumps(data), encoding="utf-8")
        assert_unavailable(path)


def test_explicit_environment_path_never_falls_back(tmp_path, monkeypatch):
    monkeypatch.setenv("GIGAFOOD_EVIDENCE_PATH", str(tmp_path / "missing.json"))
    with TestClient(create_app()) as client:
        assert client.get("/api/v1/health").status_code == 503


PUBLIC_EVIDENCE = Path(__file__).resolve().parents[2] / "data/evidence/public-packaging.json"


def test_public_evidence_pack_api():
    with TestClient(create_app(PUBLIC_EVIDENCE)) as client:
        health = client.get("/api/v1/health")
        assert health.status_code == 200
        assert health.json()["status"] == "READY"
        assert health.json()["dataset_kind"] == "PUBLIC"

        # Case A: 500ml PET bottle transition
        resp_a = client.get("/api/v1/scenarios/cchbc-500ml-rpet-transition/comparison")
        assert resp_a.status_code == 200
        case_a = resp_a.json()
        assert case_a["status"] == "CALCULATED"
        assert case_a["verification_state"] == "INDICATIVE"
        assert case_a["current_virgin_pack_g"] == 22.0
        assert case_a["candidate_virgin_pack_g"] == 2.5
        assert case_a["reduction_g"] == 19.5
        assert case_a["reduction_pct"] == pytest.approx(19.5 / 22.0 * 100)
        # Unmodeled operational requirements safely evaluate to REVIEW_REQUIRED
        assert case_a["eligibility_status"] == "REVIEW_REQUIRED"
        assert '"VERIFIED"' not in resp_a.text

        # Case B: Prepared food container (Berry UniPak PP vs Duni Deli rPET)
        resp_b = client.get("/api/v1/scenarios/deli-pp-to-rpet-transition/comparison")
        assert resp_b.status_code == 200
        case_b = resp_b.json()
        # Coexistence: CALCULATED environmental delta + BLOCKED operational eligibility
        assert case_b["status"] == "CALCULATED"
        assert case_b["verification_state"] == "INDICATIVE"
        assert case_b["current_virgin_pack_g"] == 14.8
        assert case_b["candidate_virgin_pack_g"] == pytest.approx(2.4)
        assert case_b["reduction_g"] == pytest.approx(12.4)
        assert case_b["reduction_pct"] == pytest.approx(12.4 / 14.8 * 100)
        assert case_b["eligibility_status"] == "BLOCKED"

        # Operational gating findings for Case B
        thermal = next((c for c in case_b["constraints"] if c["constraint_id"] == "thermal-envelope-incompatibility"), None)
        assert thermal is not None
        assert thermal["status"] == "BLOCKED"
        assert "70.0°C < required 95.0°C" in thermal["reason"]
        assert thermal["source_reference"] == "https://www.duni.com/en/products/deli-hinged-375-ml-transparent-1-comp-205971"
        assert thermal["verification_state"] == "SOURCE_AVAILABLE"

        mw = next((c for c in case_b["constraints"] if c["constraint_id"] == "microwave-reheating-incompatibility"), None)
        assert mw is not None
        assert mw["status"] == "BLOCKED"
        assert "microwave" in mw["reason"].lower()
        assert mw["source_reference"] == "https://www.duni.com/en/products/deli-hinged-375-ml-transparent-1-comp-205971"
        assert mw["verification_state"] == "SOURCE_AVAILABLE"

        # Advisory safety finding
        advisory = next((c for c in case_b["constraints"] if c["constraint_id"] == "food-contact-suitability"), None)
        assert advisory is not None
        assert advisory["status"] == "REVIEW_REQUIRED"
        assert advisory["verification_state"] == "NOT_VERIFIED"
