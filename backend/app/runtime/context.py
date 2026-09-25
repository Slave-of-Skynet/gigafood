from dataclasses import dataclass
import logging
from pathlib import Path

from pydantic import ValidationError

from app.domain.packaging import Evidence


@dataclass(frozen=True)
class Runtime:
    evidence: Evidence | None
    error: str | None


def load_runtime(path: Path) -> Runtime:
    try:
        return Runtime(Evidence.model_validate_json(path.read_text(encoding="utf-8")), None)
    except (OSError, UnicodeError, ValidationError) as error:
        logging.getLogger(__name__).error("Evidence unavailable (%s)", type(error).__name__)
        return Runtime(None, "EVIDENCE_UNAVAILABLE")
