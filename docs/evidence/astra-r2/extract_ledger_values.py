"""Extract ALL business-case and geometry values from synthesis-ledger.json for handoff reconciliation."""
import json

calcs = json.loads(open('docs/evidence/astra-r2/synthesis-ledger.json', encoding='utf-8').read())
cmap = {c['calculation_id']: c for c in calcs}

def val(cid):
    c = cmap.get(cid)
    if not c: return None, None, None, None
    return c['low'], c['central'], c['high'], c['field']

def find(field_substr):
    return [(c['calculation_id'], c['field'], c['low'], c['central'], c['high'])
            for c in calcs if field_substr in c['field']]

# Network volumes
print('=== NETWORK VOLUMES ===')
for f in ['NETWORK.whole_annual', 'NETWORK.portions_annual', 'NETWORK.annual_packages',
          'NETWORK.participating_locations', 'NETWORK.daily_packages']:
    rows = find(f)
    for cid, field, l, c, h in rows:
        print(f'  {cid} {field}: LOW={l:,.0f} CENTRAL={c:,.0f} HIGH={h:,.0f}')

# All business case fields
print('\n=== BUSINESS CASES ===')
for cid in ['C1', 'C2', 'C3', 'C4', 'C5', 'C6-RO-P', 'C6-RO-W', 'C6-RO-H', 'C6-EU']:
    print(f'\n--- {cid} ---')
    prefix = cid + '.vs.B1-ESTIMATED'
    for suffix in ['incremental_cost', 'premium_pct', 'reduction_g', 'reduction_pct',
                   'baseline_annual_spend', 'candidate_annual_spend', 'annual_incremental_cost',
                   'baseline_annual_virgin', 'candidate_annual_virgin', 'annual_virgin_avoided']:
        rows = find(prefix + '.' + suffix)
        for calc_id, field, l, c, h in rows:
            print(f'  {calc_id} {field.split(".")[-1]}: L={l:.4f} C={c:.4f} H={h:.4f}')

# Geometry fill ratios
print('\n=== GEOMETRY FILL RATIOS ===')
for cid in ['C1', 'C2', 'C3', 'C4', 'C5', 'C6-RO-P', 'C6-RO-W', 'C6-RO-H', 'C6-EU', 'B1-ESTIMATED', 'B2', 'B3']:
    rows = find(cid + '.whole_fill_ratio')
    for calc_id, field, l, c, h in rows:
        print(f'  {calc_id} {field}: L={l:.4f} C={c:.4f} H={h:.4f}')

# Dimensions - usable length for each candidate
print('\n=== USABLE DIMENSIONS ===')
for cid in ['C1', 'C2', 'C3', 'C4', 'C5', 'C6-RO-P', 'C6-RO-W', 'C6-RO-H', 'C6-EU']:
    for axis in ['length', 'width', 'height']:
        rows = find(cid + '.usable_' + axis)
        for calc_id, field, l, c, h in rows:
            print(f'  {calc_id} {field}: L={l} C={c} H={h}')

# B1-ESTIMATED key fields
print('\n=== B1-ESTIMATED KEY FIELDS ===')
for field in ['B1-ESTIMATED.total_package_mass_g', 'B1-ESTIMATED.cost_net',
              'B1-ESTIMATED.body_cost_net', 'B1-ESTIMATED.virgin_plastic_mass_g']:
    rows = find(field)
    for calc_id, f, l, c, h in rows:
        print(f'  {calc_id} {f}: L={l} C={c} H={h}')

# C5 OV fields
print('\n=== C5 PROCUREMENT (checking states) ===')
demo = json.loads(open('docs/evidence/astra-r2/demo-model.json', encoding='utf-8').read())
F = demo['fields']
for key in ['C5.order_unit', 'C5.industrial_moq', 'C5.outer_length_mm', 'C5.outer_width_mm',
            'C5.outer_height_mm', 'C5.capacity_ml']:
    f = F.get(key)
    if f:
        v = f.get('value')
        print(f'  {key}: state={f["state"]} value={v}')

# C6-RO-H procurement
print('\n=== C6-RO-H PROCUREMENT ===')
for key in ['C6-RO-H.order_unit', 'C6-RO-H.lead_time', 'C6-RO-H.outer_length_mm']:
    f = F.get(key)
    if f:
        v = f.get('value')
        print(f'  {key}: state={f["state"]} value={v}')
