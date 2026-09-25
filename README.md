# GigaFood — ARC-01

Evidence-aware Packaging Transition Copilot: a minimal A-core comparison, with
illustrative inputs only. No implementation approval, safety certification or legal verdict.

## Run locally

Requirements: Python 3.11+, Node 22.12+ and npm. From the repository root (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install -e './backend[test]'
.\.venv\Scripts\python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

In another terminal:

```powershell
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite. Vite proxies `/api` to port 8000.
On POSIX use `.venv/bin/python` instead of `.venv\Scripts\python`.
FastAPI's interactive contract is at `http://127.0.0.1:8000/docs`.

The bundled, explicitly declared demo evidence loads once at backend startup.
Set `GIGAFOOD_EVIDENCE_PATH` to override it; relative paths resolve from the process
working directory. `.env.example` is documentation, not an automatically loaded file.
Restart after editing evidence. An unreadable/invalid override returns 503; no fallback.

## Verify and demonstrate

Run `./scripts/verify.ps1` (PowerShell) or `bash scripts/verify.sh` (POSIX).
These install the declared dependencies, run backend tests, build the UI and check whitespace.

1. Select **Illustrative reduction**: 15 → 8 g/unit; reduction 7 g/unit, about 46.667%.
2. Select **Illustrative missing recycled content**: candidate and delta N/A;
   `INSUFFICIENT_DATA`, missing-field path and a blocked calculation finding.
3. Inspect both packages' values, provenance, and `NOT_VERIFIED` suitability notice.
4. Stop the backend, reload the page: service error and Retry. Restart it and retry.
5. Start backend with an absent evidence path: health and calculation routes return 503.

See [architecture](docs/architecture.md), [evidence semantics](docs/evidence_semantics.md)
and [ARC-01 handoff](docs/handoff.md). No database, AI, ranking or deployment.
