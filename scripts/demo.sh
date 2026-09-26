#!/usr/bin/env bash
set -euo pipefail
repo_root="$(cd "$(dirname "$0")/.." && pwd)"
if [ ! -x "$repo_root/.venv/bin/python" ]; then
  echo "Missing repository Python environment. Run bash scripts/verify.sh first." >&2
  exit 1
fi
exec "$repo_root/.venv/bin/python" "$repo_root/scripts/demo.py" "$@"
