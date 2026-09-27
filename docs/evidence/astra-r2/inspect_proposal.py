"""Inspect and structurally validate the proposal canonical dataset."""
import json, sys, math, copy, itertools

data = json.loads(open('docs/evidence/astra-r2/proposal/HTF-03-canonical-packaging-dataset.json', encoding='utf-8').read())

print('Schema version:', data.get('schema_version'))
cands = data.get('candidates', [])
configs = data.get('configurations', [])
baselines = data.get('baselines', [])
sources = data.get('sources', [])
calcs = data.get('calculations', [])
gates = data.get('product_candidate_gates', [])

print('Candidates:', [c['candidate_id'] for c in cands])
print('Configurations:', [c['configuration_id'] for c in configs])
print('Baselines:', [b['baseline_id'] for b in baselines])
print('Sources count:', len(sources))
print('Calculations count:', len(calcs))
print('Gate rows:', len(gates))

astra_calcs = [c for c in calcs if c.get('calculation_id', '').startswith('ASTRA-')]
print('ASTRA-E calculations added:', len(astra_calcs))

print('\nModel metrics per candidate:')
for c in cands:
    mm = c.get('model_metrics', {})
    print(f'  {c["candidate_id"]}: {list(mm.keys())}')

print('\nModel metrics per configuration:')
for c in configs:
    mm = c.get('model_metrics', {})
    print(f'  {c["configuration_id"]}: {list(mm.keys())}')

# Check mass ordering
EPS = 1e-7
errors = []
for c in cands + configs:
    cid = c.get('candidate_id') or c.get('configuration_id')
    for group in ('exact_metrics', 'model_metrics'):
        m = c.get(group, {})
        total_v = m.get('total_package_mass_g', {}).get('value')
        plastic_v = m.get('plastic_mass_g', {}).get('value')
        virgin_v = m.get('virgin_plastic_mass_g', {}).get('value')
        def bounds(v):
            if isinstance(v, dict) and 'low' in v: return (v['low'], v['central'], v['high'])
            if isinstance(v, (int, float)): return (v, v, v)
            return None
        total = bounds(total_v)
        plastic = bounds(plastic_v)
        virgin = bounds(virgin_v)
        if total and plastic:
            if not all(p <= t + EPS for p, t in zip(plastic, total)):
                errors.append(f'{cid}/{group}: plastic exceeds total')
        if plastic and virgin:
            if not all(v <= p + EPS for v, p in zip(virgin, plastic)):
                errors.append(f'{cid}/{group}: virgin exceeds plastic')
        if total and not all(t > 0 for t in total):
            errors.append(f'{cid}/{group}: non-positive total mass')

# Check fraction bounds
for c in cands + configs + baselines:
    cid = c.get('candidate_id') or c.get('configuration_id') or c.get('baseline_id')
    for group in ('exact_metrics', 'model_metrics', 'observed'):
        m = c.get(group, {})
        for fname, fdata in m.items():
            if isinstance(fdata, dict):
                u = fdata.get('unit')
                v = fdata.get('value')
                if u == 'fraction' and isinstance(v, dict) and 'low' in v:
                    if not (0 <= v['low'] <= v['central'] <= v['high'] <= 1):
                        errors.append(f'{cid}/{group}/{fname}: fraction out of [0,1]: {v}')

# Check B1 epistemic constraints
b_map = {b['baseline_id']: b for b in baselines}
b1 = b_map.get('B1')
if b1:
    if b1.get('observed', {}).get('mass_g', {}).get('value') is not None:
        errors.append('B1: scenario mass inserted into provider facts')
    vf = b1.get('observed', {}).get('virgin_plastic_fraction', {}).get('value')
    if vf != 1:
        errors.append(f'B1: provider virgin fraction lost: {vf}')

# Check calculation IDs unique
calc_ids = [c['calculation_id'] for c in calcs]
if len(calc_ids) != len(set(calc_ids)):
    errors.append('duplicate calculation IDs')

# Check source IDs unique
src_ids = [s['source_id'] for s in sources]
if len(src_ids) != len(set(src_ids)):
    errors.append('duplicate source IDs')

# Check non-dangling source references (sample)
smap = {s['source_id'] for s in sources}
def walk(v, path='$'):
    yield path, v
    if isinstance(v, dict):
        for k, c in v.items():
            yield from walk(c, path + '.' + k)
    elif isinstance(v, list):
        for i, c in enumerate(v):
            yield from walk(c, path + f'[{i}]')

dangling = []
for path, item in walk(data):
    if isinstance(item, dict) and 'source_ids' in item:
        for sid in item.get('source_ids', []):
            if sid not in smap:
                dangling.append(f'{path}: missing source {sid}')
if dangling:
    errors.append(f'{len(dangling)} dangling source refs: ' + '; '.join(dangling[:5]))

# Gate count
gate_count = len(gates)
if gate_count != 48:
    errors.append(f'gate rows: expected 48, got {gate_count}')

# No estimate promoted
for path, f in walk(data):
    if isinstance(f, dict) and f.get('kind') == 'evidence_field':
        if f.get('state') == 'ESTIMATED' and f.get('display_policy') in ('DISPLAY_VERIFIED', 'DISPLAY_DERIVED'):
            errors.append(f'{path}: estimate promoted to exact display')

print('\nValidation errors:', len(errors))
for e in errors[:20]:
    print(' -', e)

print('\nSample ASTRA calculations (first 3):')
for c in astra_calcs[:3]:
    print(f'  {c["calculation_id"]} {c["field"]}: central={c["central"]} {c["unit"]}')
