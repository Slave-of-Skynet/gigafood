$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path $PSScriptRoot -Parent
Push-Location $repoRoot
try {
    if (-not (Test-Path '.venv/Scripts/python.exe')) {
        python -m venv .venv
        if ($LASTEXITCODE -ne 0) { throw 'venv creation failed' }
    }
    & ./.venv/Scripts/python.exe -m pip install -e './backend[test]'
    if ($LASTEXITCODE -ne 0) { throw 'Backend install failed' }
    & ./.venv/Scripts/python.exe -m pytest backend/tests
    if ($LASTEXITCODE -ne 0) { throw 'Backend tests failed' }
    Push-Location frontend
    try {
        npm ci
        if ($LASTEXITCODE -ne 0) { throw 'Frontend install failed' }
        npm run build
        if ($LASTEXITCODE -ne 0) { throw 'Frontend build failed' }
    } finally { Pop-Location }
    git diff --check
    if ($LASTEXITCODE -ne 0) { throw 'Whitespace check failed' }
} finally { Pop-Location }
