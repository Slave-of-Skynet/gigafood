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
