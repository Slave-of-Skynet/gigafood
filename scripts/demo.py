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
from urllib.error import URLError
from urllib.parse import quote
from urllib.request import urlopen

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
        require(bool(expected_portfolios), "Demo portfolio pack must be non-empty.")
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
        require([p['id'] for p in summaries] == [p.id for p in expected_portfolios], "Served portfolio discovery does not match committed demo pack.")
        first_id = summaries[0]['id']
        evaluation = read_json(API + '/api/v1/portfolios/' + quote(first_id, safe=''))
        require(evaluation['portfolio_id'] == first_id and len(evaluation['candidates']) == len(expected_portfolios[0].candidates), "Canonical Selection evaluation failed.")
        wait_http(UI, processes)
        require(read_json(UI + '/api/v1/health') == health, "Frontend API proxy did not reach the demo backend.")
        require(all(p.poll() is None for p in processes), "A demo process exited; demo NOT READY.")
        print(f"PACKSHIFT DEMO READY\nA-core: READY / PUBLIC\nSelection: READY / {len(summaries)} portfolio(s)\nEvaluation: {first_id} / {len(evaluation['candidates'])} candidates\nAPI: {API}\nUI:  {UI}", flush=True)
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
