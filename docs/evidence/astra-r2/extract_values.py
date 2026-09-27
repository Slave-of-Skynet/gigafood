"""Extract central values for handoff documents."""
import json

demo = json.loads(open('docs/evidence/astra-r2/demo-model.json', encoding='utf-8').read())
F = demo['fields']
B = demo['entities']
BUS = demo['business_cases']

def cv(key):
    f = F.get(key)
    if not f: return None
    v = f.get('value')
    if v is None: return None
    if isinstance(v, dict): return v.get('central')
    return v

def lcv(key):
    f = F.get(key)
    if not f: return (None, None, None)
    v = f.get('value')
    if v is None: return (None, None, None)
    if isinstance(v, dict): return (v.get('low'), v.get('central'), v.get('high'))
    return (v, v, v)

def st(key):
    f = F.get(key)
    if not f: return 'UNKNOWN'
    return f.get('state', 'UNKNOWN')

# B1-ESTIMATED baseline
print('=== BASELINE B1-ESTIMATED ===')
for k in ['B1-ESTIMATED.total_package_mass_g', 'B1-ESTIMATED.plastic_mass_g', 'B1-ESTIMATED.virgin_plastic_mass_g', 'B1-ESTIMATED.cost_net']:
    l,c,h = lcv(k)
    print(f'  {k}: LOW={l:.4f} CENTRAL={c:.4f} HIGH={h:.4f} [{st(k)}]')

# Annual scenarios
print('\n=== ANNUAL SCENARIOS ===')
for k in ['NETWORK.whole_annual', 'NETWORK.portions_annual', 'NETWORK.participating_locations']:
    l,c,h = lcv(k)
    print(f'  {k}: {c:,.0f} (LOW={l:,.0f} HIGH={h:,.0f})')

# Candidates
for cid in ['C1', 'C2', 'C3', 'C4', 'C5', 'C6-RO-P', 'C6-RO-W', 'C6-RO-H', 'C6-EU']:
    print(f'\n=== {cid} ===')
    ent = B.get(cid, {})
    metrics = ent.get('metrics', {})
    for mname, mkey in metrics.items():
        l,c,h = lcv(mkey)
        s = st(mkey)
        print(f'  {mname}: LOW={l} CENTRAL={c} HIGH={h} [{s}]')
    cost_key = cid + '.cost_net'
    l,c,h = lcv(cost_key)
    print(f'  cost_net RON/pack: LOW={l:.4f} CENTRAL={c:.4f} HIGH={h:.4f} [{st(cost_key)}]')

# Business cases
print('\n=== BUSINESS CASES ===')
for cid, bc in BUS.items():
    print(f'\n{cid}:')
    stream = bc['stream']
    for bk in ['incremental_cost', 'premium_pct', 'reduction_g', 'reduction_pct', 'annual_incremental_cost', 'annual_virgin_avoided']:
        if bk in bc:
            l,c,h = lcv(bc[bk])
            print(f'  {bk}: LOW={l} CENTRAL={c} HIGH={h}')
    cpk = bc.get('cost_per_kg_avoided', {})
    print(f'  cost_per_kg_avoided: central={cpk.get("central")} display={cpk.get("display","")[:60]}')
