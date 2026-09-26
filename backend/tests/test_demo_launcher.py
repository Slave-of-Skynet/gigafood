"""Focused regression tests for demo launcher Selection identity validation (QA-R3 STOP-11)."""
import json
from pathlib import Path
import sys
import pytest

REPO_ROOT = Path(__file__).resolve().parents[2]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from app.domain.packaging import Portfolio
from scripts.demo import (
    validate_expected_portfolios,
    validate_selection_discovery,
    validate_selection_evaluation,
    validate_selection_presentation_identity,
)


def make_mock_portfolio(portfolio_id="faerch-deli-trays", dataset_kind="PUBLIC", candidate_count=2):
    return {
        "id": portfolio_id,
        "dataset_kind": dataset_kind,
        "candidates": [{"id": f"cand-{i}"} for i in range(candidate_count)],
    }


def make_mock_summary(portfolio_id="faerch-deli-trays", dataset_kind="PUBLIC", candidate_count=2):
    return {
        "id": portfolio_id,
        "dataset_kind": dataset_kind,
        "candidate_count": candidate_count,
    }


def make_mock_evaluation(portfolio_id="faerch-deli-trays", dataset_kind="PUBLIC", candidate_count=2):
    return {
        "portfolio_id": portfolio_id,
        "dataset_kind": dataset_kind,
        "candidates": [{"id": f"cand-{i}"} for i in range(candidate_count)],
    }


def test_p1_all_public_identity_passes():
    """P1 — all PUBLIC: Expected, discovery, and evaluation are all PUBLIC; validation passes."""
    expected = [make_mock_portfolio("p1", "PUBLIC", 2)]
    discovery = [make_mock_summary("p1", "PUBLIC", 2)]
    evaluation = make_mock_evaluation("p1", "PUBLIC", 2)

    validate_selection_presentation_identity(expected, discovery, evaluation)


def test_n1_expected_pack_illustrative_fails():
    """N1 — expected pack ILLUSTRATIVE: At least one expected portfolio is ILLUSTRATIVE -> fails fast."""
    expected = [make_mock_portfolio("p1", "ILLUSTRATIVE", 2)]
    with pytest.raises(RuntimeError, match="Demo Selection pack must be PUBLIC"):
        validate_expected_portfolios(expected)

    discovery = [make_mock_summary("p1", "PUBLIC", 2)]
    evaluation = make_mock_evaluation("p1", "PUBLIC", 2)
    with pytest.raises(RuntimeError, match="Demo Selection pack must be PUBLIC"):
        validate_selection_presentation_identity(expected, discovery, evaluation)


def test_n2_expected_pack_provider_fails():
    """N2 — expected pack PROVIDER: At least one expected portfolio is PROVIDER -> fails fast."""
    expected = [make_mock_portfolio("p1", "PROVIDER", 2)]
    with pytest.raises(RuntimeError, match="Demo Selection pack must be PUBLIC"):
        validate_expected_portfolios(expected)

    discovery = [make_mock_summary("p1", "PUBLIC", 2)]
    evaluation = make_mock_evaluation("p1", "PUBLIC", 2)
    with pytest.raises(RuntimeError, match="Demo Selection pack must be PUBLIC"):
        validate_selection_presentation_identity(expected, discovery, evaluation)


def test_n3_discovery_runtime_identity_wrong_fails():
    """N3 — discovery runtime identity wrong: Expected is PUBLIC, but actual discovery is ILLUSTRATIVE -> fails."""
    expected = [make_mock_portfolio("p1", "PUBLIC", 2)]
    discovery = [make_mock_summary("p1", "ILLUSTRATIVE", 2)]
    evaluation = make_mock_evaluation("p1", "PUBLIC", 2)

    with pytest.raises(RuntimeError, match="Served portfolio discovery dataset_kind must be PUBLIC"):
        validate_selection_discovery(discovery, expected)

    with pytest.raises(RuntimeError, match="Served portfolio discovery dataset_kind must be PUBLIC"):
        validate_selection_presentation_identity(expected, discovery, evaluation)


def test_n4_evaluation_runtime_identity_wrong_fails():
    """N4 — evaluation runtime identity wrong: Expected & discovery PUBLIC, but evaluation is ILLUSTRATIVE -> fails."""
    expected = [make_mock_portfolio("p1", "PUBLIC", 2)]
    discovery = [make_mock_summary("p1", "PUBLIC", 2)]
    evaluation = make_mock_evaluation("p1", "ILLUSTRATIVE", 2)

    with pytest.raises(RuntimeError, match="Canonical Selection evaluation dataset_kind must be PUBLIC"):
        validate_selection_evaluation(evaluation, expected[0])

    with pytest.raises(RuntimeError, match="Canonical Selection evaluation dataset_kind must be PUBLIC"):
        validate_selection_presentation_identity(expected, discovery, evaluation)


def test_n5_multi_portfolio_local_pack_fails_if_any_non_public():
    """N5 — multi-portfolio local pack [PUBLIC, PUBLIC, ILLUSTRATIVE] fails closed (does not check only [0])."""
    expected = [
        make_mock_portfolio("p1", "PUBLIC", 2),
        make_mock_portfolio("p2", "PUBLIC", 1),
        make_mock_portfolio("p3", "ILLUSTRATIVE", 3),
    ]
    with pytest.raises(RuntimeError, match="Demo Selection pack must be PUBLIC"):
        validate_expected_portfolios(expected)


def test_committed_selection_pack_is_public():
    """Committed data/evidence/selection-portfolios.json passes expected portfolio validation."""
    portfolios_path = REPO_ROOT / "data/evidence/selection-portfolios.json"
    portfolios = [Portfolio.model_validate(p) for p in json.loads(portfolios_path.read_text(encoding="utf-8"))]
    validate_expected_portfolios(portfolios)


def test_discovery_id_mismatch_fails():
    """Discovery IDs not matching expected IDs causes validation failure."""
    expected = [make_mock_portfolio("p1", "PUBLIC", 2)]
    discovery = [make_mock_summary("wrong-id", "PUBLIC", 2)]
    with pytest.raises(RuntimeError, match="Served portfolio discovery does not match committed demo pack"):
        validate_selection_discovery(discovery, expected)


def test_evaluation_candidate_count_mismatch_fails():
    """Evaluation candidate count mismatch causes validation failure."""
    expected = [make_mock_portfolio("p1", "PUBLIC", 2)]
    evaluation = make_mock_evaluation("p1", "PUBLIC", 1)  # expected 2, got 1
    with pytest.raises(RuntimeError, match="Canonical Selection evaluation failed"):
        validate_selection_evaluation(evaluation, expected[0])


def test_empty_expected_portfolios_fails():
    """Empty expected portfolio pack fails closed."""
    with pytest.raises(RuntimeError, match="Demo portfolio pack must be non-empty"):
        validate_expected_portfolios([])
