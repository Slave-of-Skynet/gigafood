from dataclasses import dataclass, field
import json
import logging
from pathlib import Path

from pydantic import ValidationError

from app.domain.packaging import Evidence, Portfolio


@dataclass(frozen=True)
class Runtime:
    evidence: Evidence | None
    error: str | None
    portfolios: list[Portfolio] = field(default_factory=list)
    portfolios_error: str | None = None


def load_runtime(path: Path, portfolios_path: Path | None = None) -> Runtime:
    evidence: Evidence | None = None
    error: str | None = None
    try:
        evidence = Evidence.model_validate_json(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, ValidationError) as err:
        logging.getLogger(__name__).error("Evidence unavailable (%s)", type(err).__name__)
        error = "EVIDENCE_UNAVAILABLE"

    portfolios: list[Portfolio] = []
    port_error: str | None = None
    if portfolios_path is not None:
        try:
            raw_data = json.loads(portfolios_path.read_text(encoding="utf-8"))
            if isinstance(raw_data, list):
                portfolios = [Portfolio.model_validate(p) for p in raw_data]
            else:
                port_error = "PORTFOLIOS_INVALID"
        except (OSError, UnicodeError, ValidationError, json.JSONDecodeError) as err:
            logging.getLogger(__name__).error("Portfolios unavailable (%s)", type(err).__name__)
            port_error = "PORTFOLIOS_UNAVAILABLE"

    return Runtime(evidence, error, portfolios, port_error)
