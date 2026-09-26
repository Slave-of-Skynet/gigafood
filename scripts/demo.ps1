param([switch]$Check)
$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path $PSScriptRoot -Parent
$python = Join-Path $repoRoot '.venv/Scripts/python.exe'
if (-not (Test-Path -LiteralPath $python)) {
    throw "Missing repository Python environment. Run scripts/verify.ps1 first."
}
$demoArgs = @((Join-Path $PSScriptRoot 'demo.py'))
if ($Check) { $demoArgs += '--check' }
& $python @demoArgs
if ($LASTEXITCODE -ne 0) { throw "PackShift demo failed (exit $LASTEXITCODE). See the preflight message above." }
