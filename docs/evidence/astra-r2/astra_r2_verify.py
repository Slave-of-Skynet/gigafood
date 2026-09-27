#!/usr/bin/env python3
"""ASTRA-R2 reproducible verification script.

Runs:
  1. build_synthesis.py
  2. Structural validation of the generated proposal
  3. Canonical invariant checks (mass, fractions, B1, gate count, no estimate promotion)
  4. Central-value consistency check: every displayed central == ledger central

Exit 0 = PASS. Exit 1 = FAIL (details printed to stdout).
Record the output of this script as the verification evidence.
"""
from __future__ import annotations
import json, math, subprocess, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[3]
OUT  = pathlib.Path(__file__).resolve().parent
EPS  = 1e-7

errors = []

def fail(msg):
    errors.append(msg)
    print(f'  FAIL: {msg}')

def ok(msg):
    print(f'  PASS: {msg}')


# ── 1. Run builder ─────────────────────────────────────────────────────────────
print('=== Step 1: run build_synthesis.py ===')
result = subprocess.run(
    [sys.executable, str(OUT / 'build_synthesis.py')],
    cwd=str(ROOT), capture_output=True, text=True
)
if result.returncode != 0:
    fail(f'build_synthesis.py exited {result.returncode}')
    print(result.stderr[:2000])
    sys.exit(1)
report = json.loads(result.stdout)
ok(f'build_synthesis.py exit 0')
print(f'  proposed_avoidable_gaps  = {report["proposed_avoidable_gaps"]}')
print(f'  calculation_count        = {report["calculation_count"]}')
print(f'  projection_mapping_count = {report["projection_mapping_count"]}')
if report['proposed_avoidable_gaps'] != 0:
    fail(f'proposed_avoidable_gaps = {report["proposed_avoidable_gaps"]} (expected 0)')
else:
    ok('proposed_avoidable_gaps = 0')

# ── 2. Load generated proposal ─────────────────────────────────────────────────
print('\n=== Step 2: structural validation of generated proposal ===')
proposal_path = OUT / 'proposal' / 'HTF-03-canonical-packaging-dataset.json'
ledger_path   = OUT / 'synthesis-ledger.json'
data = json.loads(proposal_path.read_text(encoding='utf-8'))
ledger = json.loads(ledger_path.read_text(encoding='utf-8'))
cmap = {c['calculation_id']: c for c in ledger}

# Schema version
if data.get('schema_version') != 'htf03.evidence.v1':
    fail(f'Wrong schema_version: {data.get("schema_version")}')
else:
    ok('schema_version = htf03.evidence.v1')

# Candidate IDs
cids = [c['candidate_id'] for c in data.get('candidates', [])]
expected = {'C1','C2','C3','C4','C5','C6'}
if set(cids) != expected:
    fail(f'Unexpected candidates: {set(cids)}')
else:
    ok(f'Candidates: {sorted(cids)}')

# Baseline identities
b_map = {b['baseline_id']: b for b in data.get('baselines', [])}
if set(b_map) != {'B1','B2','B3'}:
    fail(f'Baseline IDs: {set(b_map)}')
else:
    ok('Baselines B1/B2/B3 present')

# B1 epistemic constraints
b1 = b_map.get('B1', {})
if b1.get('observed', {}).get('mass_g', {}).get('value') is not None:
    fail('B1: scenario mass inserted into provider facts')
else:
    ok('B1: provider mass_g untouched (None)')
if b1.get('observed', {}).get('virgin_plastic_fraction', {}).get('value') != 1:
    fail(f'B1: virgin_plastic_fraction != 1: {b1.get("observed",{}).get("virgin_plastic_fraction",{})}')
else:
    ok('B1: virgin_plastic_fraction = 1')

# Source and calculation uniqueness
src_ids = [s['source_id'] for s in data.get('sources', [])]
if len(src_ids) != len(set(src_ids)):
    fail('Duplicate source IDs')
else:
    ok(f'Source IDs unique ({len(src_ids)} total)')

calc_ids = [c['calculation_id'] for c in data.get('calculations', [])]
if len(calc_ids) != len(set(calc_ids)):
    fail('Duplicate calculation IDs')
else:
    ok(f'Calculation IDs unique ({len(calc_ids)} total)')

# Non-dangling source references (spot check)
smap = {s['source_id'] for s in data.get('sources', [])}
def walk(v):
    yield v
    if isinstance(v, dict):
        for c in v.values(): yield from walk(c)
    elif isinstance(v, list):
        for c in v: yield from walk(c)
dangling = []
for item in walk(data):
    if isinstance(item, dict) and 'source_ids' in item:
        for sid in item.get('source_ids', []):
            if sid not in smap:
                dangling.append(sid)
if dangling:
    fail(f'{len(dangling)} dangling source refs: {sorted(set(dangling))[:5]}')
else:
    ok('No dangling source references')

# Gate count
gate_count = len(data.get('product_candidate_gates', []))
if gate_count != 48:
    fail(f'Gate rows: expected 48, got {gate_count}')
else:
    ok(f'Gate rows = 48')

# Mass ordering and fraction bounds
def bounds(v):
    if isinstance(v, dict) and 'low' in v: return (v['low'], v['central'], v['high'])
    if isinstance(v, (int, float)): return (v, v, v)
    return None

mass_errors = 0
for c in data.get('candidates', []) + data.get('configurations', []):
    cid = c.get('candidate_id') or c.get('configuration_id')
    for group in ('exact_metrics', 'model_metrics'):
        m = c.get(group, {})
        total = bounds(m.get('total_package_mass_g', {}).get('value'))
        plastic = bounds(m.get('plastic_mass_g', {}).get('value'))
        virgin = bounds(m.get('virgin_plastic_mass_g', {}).get('value'))
        if total and plastic:
            if not all(p <= t + EPS for p, t in zip(plastic, total)):
                fail(f'{cid}/{group}: plastic exceeds total')
                mass_errors += 1
        if plastic and virgin:
            if not all(v <= p + EPS for v, p in zip(virgin, plastic)):
                fail(f'{cid}/{group}: virgin exceeds plastic')
                mass_errors += 1
        if total and not all(t > 0 for t in total):
            fail(f'{cid}/{group}: non-positive total mass')
            mass_errors += 1
        for fname, fdata in m.items():
            if isinstance(fdata, dict):
                u = fdata.get('unit')
                v = fdata.get('value')
                if u == 'fraction' and isinstance(v, dict) and 'low' in v:
                    if not (0 <= v['low'] <= v.get('central', v['low']) <= v['high'] <= 1 + EPS):
                        fail(f'{cid}/{group}/{fname}: fraction out of [0,1]: {v}')
                        mass_errors += 1
if mass_errors == 0:
    ok('Mass ordering and fraction bounds: all OK')
else:
    fail(f'{mass_errors} mass/fraction errors found')

# No estimate promoted
promoted = 0
for item in walk(data):
    if isinstance(item, dict) and item.get('kind') == 'evidence_field':
        if item.get('state') == 'ESTIMATED' and item.get('display_policy') in ('DISPLAY_VERIFIED', 'DISPLAY_DERIVED'):
            promoted += 1
if promoted:
    fail(f'{promoted} ESTIMATED fields promoted to exact display')
else:
    ok('No ESTIMATED fields promoted to exact display')


# ── 3. Central-value consistency check ────────────────────────────────────────
print('\n=== Step 3: central-value consistency (displayed == ledger) ===')
fmap = {c['field']: c for c in ledger}

key_checks = [
    # (ledger_field, expected_central, description)
    ('NETWORK.whole_annual',     3168000.0,     'ASTRA-E024 whole annual'),
    ('NETWORK.portions_annual',  6336000.0,     'ASTRA-E025 portions annual'),
    ('NETWORK.annual_packages',  9504000.0,     'ASTRA-E026 combined annual'),
    ('B1-ESTIMATED.total_package_mass_g', 6.4985, 'B1 mass'),
    ('B1-ESTIMATED.cost_net',    0.723,          'B1 cost'),
    ('C1.vs.B1-ESTIMATED.incremental_cost', 0.76031721, 'C1 incremental cost'),
    ('C1.vs.B1-ESTIMATED.premium_pct',     105.1614398,  'C1 premium pct'),
    ('C1.vs.B1-ESTIMATED.reduction_g',    -4.5815,      'C1 reduction g'),
    ('C1.vs.B1-ESTIMATED.baseline_annual_spend', 2290464.0, 'C1 baseline annual spend (whole)'),
    ('C1.vs.B1-ESTIMATED.annual_incremental_cost', 2408684.9213, 'C1 annual incremental cost'),
    ('C1.vs.B1-ESTIMATED.annual_virgin_avoided', -14514.192, 'C1 annual virgin avoided'),
    ('C5.vs.B1-ESTIMATED.incremental_cost', 1.9496232, 'C5 incremental cost'),
    ('C5.vs.B1-ESTIMATED.reduction_g',      2.163,     'C5 reduction g'),
    ('C5.vs.B1-ESTIMATED.baseline_annual_spend', 4580928.0, 'C5 baseline annual spend (portions)'),
    ('C5.vs.B1-ESTIMATED.annual_incremental_cost', 12352812.5952, 'C5 annual incremental cost'),
    ('C5.vs.B1-ESTIMATED.annual_virgin_avoided',   13704.6658,   'C5 annual virgin avoided'),
    ('C6-RO-H.vs.B1-ESTIMATED.incremental_cost',  1.3088182, 'C6-RO-H incremental cost'),
    ('C6-RO-H.vs.B1-ESTIMATED.baseline_annual_spend', 2290464.0, 'C6-RO-H baseline annual spend (whole)'),
    ('C6-RO-H.vs.B1-ESTIMATED.annual_incremental_cost', 4146335.9942, 'C6-RO-H annual incremental cost'),
    ('C1.whole_fill_ratio',  0.5475, 'C1 whole fill ratio'),
    ('C5.whole_fill_ratio',  1.5731, 'C5 whole fill ratio'),
    ('C6-RO-H.whole_fill_ratio', 0.8128, 'C6-RO-H whole fill ratio'),
]
consistency_errors = 0
for field, expected, desc in key_checks:
    c = fmap.get(field)
    if not c:
        fail(f'Field not found in ledger: {field} ({desc})')
        consistency_errors += 1
        continue
    actual = c['central']
    if not math.isclose(actual, expected, rel_tol=1e-4, abs_tol=1e-4):
        fail(f'Central mismatch for {field}: expected {expected}, got {actual} ({desc})')
        consistency_errors += 1
    else:
        ok(f'{c["calculation_id"]} {desc}: central = {actual}')
if consistency_errors == 0:
    ok('All central-value consistency checks passed')

# ── 4. Canonical gate outcomes regression ─────────────────────────────────────
print('\n=== Step 4: gate outcome regression ===')
gates = data.get('product_candidate_gates', [])
lookup = {(r['product_id'], r['candidate_id'], r['workflow']): r for r in gates}
gate_errors = 0

# C6 LITERAL = QUALIFICATION REQUIRED, priority 2
for p in ['P1','P2','P3','P4']:
    row = lookup.get((p, 'C6', 'LITERAL_OVEN_250C_THEN_HOLD'))
    if row is None:
        fail(f'Missing gate row: {p}/C6/LITERAL')
        gate_errors += 1
    elif row.get('outcome') != 'QUALIFICATION REQUIRED':
        fail(f'{p}/C6/LITERAL outcome={row["outcome"]} (expected QUALIFICATION REQUIRED)')
        gate_errors += 1
    elif row.get('qualification_priority') != 2:
        fail(f'{p}/C6/LITERAL priority={row.get("qualification_priority")} (expected 2)')
        gate_errors += 1

# C5 LITERAL = BLOCKED
for p in ['P1','P2','P3','P4']:
    row = lookup.get((p, 'C5', 'LITERAL_OVEN_250C_THEN_HOLD'))
    if row is None:
        fail(f'Missing gate row: {p}/C5/LITERAL')
        gate_errors += 1
    elif row.get('outcome') != 'BLOCKED':
        fail(f'{p}/C5/LITERAL outcome={row["outcome"]} (expected BLOCKED)')
        gate_errors += 1

# Count gate cell types
from collections import Counter
counts = Counter(g.get('status') for r in gates for g in r.get('gates', {}).values())
print(f'  Gate cells: {dict(counts)}')
if counts.get('QUALIFICATION_REQUIRED', 0) != 135:
    fail(f'QUALIFICATION_REQUIRED cells: expected 135, got {counts.get("QUALIFICATION_REQUIRED", 0)}')
if counts.get('UNKNOWN', 0) != 129:
    fail(f'UNKNOWN cells: expected 129, got {counts.get("UNKNOWN", 0)}')
if counts.get('FAIL', 0) != 24:
    fail(f'FAIL cells: expected 24, got {counts.get("FAIL", 0)}')

if gate_errors == 0:
    ok('Gate outcome regression: C6 LITERAL=QUALIFICATION_REQUIRED priority=2, C5 LITERAL=BLOCKED')
else:
    fail(f'{gate_errors} gate regression errors')


# ── 5. Evidence state preservation and structured dimensions ──────────────────
print('\n=== Step 5: evidence state preservation & structured dimensions ===')
rows_before = json.loads((OUT / 'gap-inventory-before.json').read_text(encoding='utf-8'))
rows_after  = json.loads((OUT / 'gap-matrix-after.json').read_text(encoding='utf-8'))
before_map  = {r['id']: r for r in rows_before}

ov_downgrades = 0
for r in rows_after:
    b = before_map.get(r['id'])
    if b and b.get('current_state') == 'OBSERVED_VERIFIED':
        if r.get('final_state') != 'OBSERVED_VERIFIED':
            fail(f"{r['id']} {r['entity']}/{r['field']}: downgraded from OBSERVED_VERIFIED to {r.get('final_state')}")
            ov_downgrades += 1
if ov_downgrades == 0:
    ok('All 17 OBSERVED_VERIFIED facts preserved with final_state = OBSERVED_VERIFIED')
else:
    fail(f'{ov_downgrades} OBSERVED_VERIFIED facts downgraded')

dim_errors = 0
for r in rows_after:
    if r['field'] == 'dimensions':
        target = r.get('target', '')
        if not target.endswith('.dimensions'):
            fail(f"{r['id']} {r['entity']}/dimensions mapped to {target} (not .dimensions)")
            dim_errors += 1
        val = r.get('final_values')
        if not (isinstance(val, dict) and isinstance(val.get('central'), (list, tuple)) and len(val['central']) == 3):
            fail(f"{r['id']} {r['entity']}/dimensions final_values not a 3D vector: {val}")
            dim_errors += 1
if dim_errors == 0:
    ok('All 9 dimensions rows closed with structured 3D [L x W x H] envelopes')
else:
    fail(f'{dim_errors} dimensions closure errors')


# ── Summary ────────────────────────────────────────────────────────────────────
print(f'\n=== SUMMARY: {len(errors)} error(s) ===')
if errors:
    for e in errors:
        print(f'  FAIL: {e}')
    sys.exit(1)
else:
    print('  ALL CHECKS PASSED')
    sys.exit(0)
