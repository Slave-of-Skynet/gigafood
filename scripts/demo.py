"""Local demo launcher shared by PowerShell and POSIX; standard library only."""
import argparse
import json
import os
from pathlib import Path
import shutil
import socket
import subprocess
import sys
import tempfile
import time
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
API = "http://127.0.0.1:8000"
UI = "http://127.0.0.1:5173"


def read_json(url):
    with urlopen(url, timeout=2) as response:
        return json.load(response)


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def wait_http(url, processes):
    deadline = time.monotonic() + 30
    while time.monotonic() < deadline:
        require(all(p.poll() is None for p in processes), "A demo process exited during startup; inspect logs.")
        try:
            with urlopen(url, timeout=2) as response:
                if response.status == 200:
                    return
        except (URLError, TimeoutError, OSError):
            pass
        time.sleep(0.2)
    raise RuntimeError(f"Timed out waiting for {url}; inspect logs.")


def validate_expected_portfolios(expected_portfolios):
    require(bool(expected_portfolios), "Demo portfolio pack must be non-empty.")
    for p in expected_portfolios:
        kind = getattr(p, 'dataset_kind', None) if not isinstance(p, dict) else p.get('dataset_kind')
        require(kind == 'PUBLIC', "Demo Selection pack must be PUBLIC.")


def validate_selection_discovery(summaries, expected_portfolios):
    expected_ids = [p.id if hasattr(p, 'id') else p['id'] for p in expected_portfolios]
    actual_ids = [s.get('id') if isinstance(s, dict) else getattr(s, 'id', None) for s in summaries]
    require(actual_ids == expected_ids, "Served portfolio discovery does not match committed demo pack.")
    for s in summaries:
        kind = s.get('dataset_kind') if isinstance(s, dict) else getattr(s, 'dataset_kind', None)
        require(kind == 'PUBLIC', f"Served portfolio discovery dataset_kind must be PUBLIC (got {kind}).")


def validate_selection_evaluation(evaluation, expected_first_portfolio):
    first_id = expected_first_portfolio.id if hasattr(expected_first_portfolio, 'id') else expected_first_portfolio['id']
    expected_candidates = expected_first_portfolio.candidates if hasattr(expected_first_portfolio, 'candidates') else expected_first_portfolio['candidates']
    eval_id = evaluation.get('portfolio_id') if isinstance(evaluation, dict) else getattr(evaluation, 'portfolio_id', None)
    eval_candidates = evaluation.get('candidates') if isinstance(evaluation, dict) else getattr(evaluation, 'candidates', None)
    eval_kind = evaluation.get('dataset_kind') if isinstance(evaluation, dict) else getattr(evaluation, 'dataset_kind', None)

    require(eval_id == first_id and len(eval_candidates) == len(expected_candidates), "Canonical Selection evaluation failed.")
    require(eval_kind == 'PUBLIC', f"Canonical Selection evaluation dataset_kind must be PUBLIC (got {eval_kind}).")


def validate_selection_presentation_identity(expected_portfolios, summaries, evaluation):
    validate_expected_portfolios(expected_portfolios)
    validate_selection_discovery(summaries, expected_portfolios)
    validate_selection_evaluation(evaluation, expected_portfolios[0])


def validate_recommendation_runtime(api_url):
    # 1. Products
    products_resp = read_json(f"{api_url}/api/v1/recommendation/products")
    require(len(products_resp.get("products", [])) == 4, f"Expected 4 products, got {len(products_resp.get('products', []))}")
    require(len(products_resp.get("workflows", [])) == 2, f"Expected 2 workflows, got {len(products_resp.get('workflows', []))}")
    require("source_revision_hash" in products_resp, "source_revision_hash missing in products response")

    # 2. Candidates
    candidates_resp = read_json(f"{api_url}/api/v1/recommendation/candidates")
    require(len(candidates_resp.get("candidates", [])) == 6, f"Expected 6 candidates, got {len(candidates_resp.get('candidates', []))}")
    require(len(candidates_resp.get("configurations", [])) == 4, f"Expected 4 configurations, got {len(candidates_resp.get('configurations', []))}")
    require(len(candidates_resp.get("baselines", [])) == 3, f"Expected 3 baselines, got {len(candidates_resp.get('baselines', []))}")
    candidates_json_str = json.dumps(candidates_resp)
    require("material_only_co2e_kg" not in candidates_json_str, "Leak detected: material_only_co2e_kg found in candidates response")

    # 3. Evaluation positive (P1 post-cook) -> C1 is first qualification path
    req_body = {"product_id": "P1", "workflow_id": "POST_COOK_HOT_HOLD_6H"}
    req = Request(
        f"{api_url}/api/v1/recommendation/evaluate",
        data=json.dumps(req_body).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    with urlopen(req, timeout=5) as response:
        require(response.status == 200, f"Expected 200 for evaluate, got {response.status}")
        eval_resp = json.load(response)

    eval_json_str = json.dumps(eval_resp)
    require("material_only_co2e_kg" not in eval_json_str, "Leak detected: material_only_co2e_kg found in evaluate response")
    first_cand = eval_resp.get("recommendation", {}).get("first_qualification_candidate_id")
    require(first_cand == "C1", f"Expected first qualification candidate to be C1, got {first_cand}")

    # 4. Evaluation 422 on invalid configuration (P1 + C6-RO-P)
    invalid_req_body = {"product_id": "P1", "workflow_id": "POST_COOK_HOT_HOLD_6H", "configuration_id": "C6-RO-P"}
    invalid_req = Request(
        f"{api_url}/api/v1/recommendation/evaluate",
        data=json.dumps(invalid_req_body).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    try:
        with urlopen(invalid_req, timeout=5) as response:
            raise RuntimeError(f"Expected HTTP 422 for invalid C6 config, got {response.status}")
    except HTTPError as e:
        require(e.code == 422, f"Expected HTTP 422 for invalid C6 config, got {e.code}")



def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Start, preflight, then stop both services.')
    args = parser.parse_args()
    processes = []
    logs = []
    try:
        require(sys.version_info >= (3, 11), "Python 3.11+ is required.")
        node = shutil.which('node')
        require(node is not None and (shutil.which('npm') or shutil.which('npm.cmd')),
                "Node and npm are required; install the README prerequisites first.")
        vite = ROOT / 'frontend/node_modules/vite/bin/vite.js'
        require(vite.is_file(), "Frontend dependencies missing; run npm ci in frontend first.")
        evidence_path = ROOT / 'data/evidence/public-packaging.json'
        portfolios_path = ROOT / 'data/evidence/selection-portfolios.json'
        for path in (evidence_path, portfolios_path):
            require(path.is_file(), f"Required demo evidence missing: {path}")
        sys.path.insert(0, str(ROOT / 'backend'))
        try:
            import uvicorn  # noqa: F401 -- fail before starting if environment is incomplete
            from app.domain.packaging import Evidence, Portfolio
            from app.main import create_app  # noqa: F401 -- backend import precondition
            expected_evidence = Evidence.model_validate_json(evidence_path.read_text(encoding='utf-8'))
            expected_portfolios = [Portfolio.model_validate(p) for p in json.loads(portfolios_path.read_text(encoding='utf-8'))]
        except Exception as error:
            raise RuntimeError(f"Backend import / demo evidence validation failed: {error}. Run scripts/verify first.") from error
        require(expected_evidence.dataset_kind == 'PUBLIC', "Demo A-core pack must be PUBLIC.")
        validate_expected_portfolios(expected_portfolios)
        for port in (8000, 5173):
            with socket.socket() as probe:
                if os.name == 'nt':
                    probe.setsockopt(socket.SOL_SOCKET, socket.SO_EXCLUSIVEADDRUSE, 1)
                try:
                    probe.bind(('127.0.0.1', port))
                except OSError as error:
                    raise RuntimeError(f"Port {port} is occupied. Stop its owner explicitly; this launcher never reuses an existing server.") from error

        env = os.environ.copy()
        env['GIGAFOOD_EVIDENCE_PATH'] = str(evidence_path)
        env['GIGAFOOD_PORTFOLIOS_PATH'] = str(portfolios_path)
        env['PYTHONPATH'] = str(ROOT / 'backend')
        log_dir = Path(tempfile.mkdtemp(prefix='packshift-demo-'))
        print(f"Demo evidence: {evidence_path}\nSelection pack: {portfolios_path}\nLogs: {log_dir}", flush=True)
        for name, command, cwd in (
            ('backend', [sys.executable, '-m', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', '8000'], ROOT),
            ('frontend', [node, str(vite), '--host', '127.0.0.1', '--port', '5173', '--strictPort'], ROOT / 'frontend'),
        ):
            log = (log_dir / f'{name}.log').open('w', encoding='utf-8')
            logs.append(log)
            options = {'creationflags': subprocess.CREATE_NO_WINDOW | subprocess.CREATE_NEW_PROCESS_GROUP} if os.name == 'nt' else {'start_new_session': True}
            processes.append(subprocess.Popen(command, cwd=cwd, env=env, stdout=log, stderr=subprocess.STDOUT, **options))

        wait_http(API + '/api/v1/health', processes)
        health = read_json(API + '/api/v1/health')
        require(health['status'] == 'READY' and health['dataset_kind'] == 'PUBLIC', "Wrong A-core health/dataset; demo NOT READY.")
        require(read_json(API + '/api/v1/scenarios') == expected_evidence.model_dump(), "Served scenario snapshot differs from the explicit PUBLIC pack.")
        summaries = read_json(API + '/api/v1/portfolios')
        validate_selection_discovery(summaries, expected_portfolios)
        first_id = summaries[0]['id']
        evaluation = read_json(API + '/api/v1/portfolios/' + quote(first_id, safe=''))
        validate_selection_evaluation(evaluation, expected_portfolios[0])
        validate_recommendation_runtime(API)
        wait_http(UI, processes)
        require(read_json(UI + '/api/v1/health') == health, "Frontend API proxy did not reach the demo backend.")
        require(all(p.poll() is None for p in processes), "A demo process exited; demo NOT READY.")
        print(f"PACKSHIFT DEMO READY\nA-core: READY / PUBLIC\nSelection: READY / {len(summaries)} portfolio(s)\nEvaluation: {first_id} / {len(evaluation['candidates'])} candidates\nRecommendation: READY / 4 products, 6 candidates\nAPI: {API}\nUI:  {UI}", flush=True)

        if args.check:
            print("Preflight-only check complete; stopping both services.", flush=True)
        else:
            print("Keep this terminal open. Press Ctrl+C to stop both services.", flush=True)
            while True:
                require(all(p.poll() is None for p in processes), "A demo process exited; stopping the other service. Inspect logs.")
                time.sleep(0.5)
        return 0
    except KeyboardInterrupt:
        print('\nStopping PackShift demo.', flush=True)
        return 0
    except Exception as error:
        print(f"PACKSHIFT DEMO NOT READY: {error}", file=sys.stderr, flush=True)
        return 1
    finally:
        for process in reversed(processes):
            if process.poll() is None:
                if os.name == 'nt':
                    # The Windows venv Python redirector can own a child Python process.
                    # Stop only this launcher's process tree, including that redirector.
                    subprocess.run(['taskkill', '/PID', str(process.pid), '/T', '/F'],
                                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False)
                else:
                    process.terminate()
                try:
                    process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    process.kill()
                    process.wait()
        for log in logs:
            log.close()


if __name__ == '__main__':
    sys.exit(main())
