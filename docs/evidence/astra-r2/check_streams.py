"""Check which annual stream (whole vs portions) each candidate baseline_annual_spend uses."""
import json

calcs = json.loads(open('docs/evidence/astra-r2/synthesis-ledger.json', encoding='utf-8').read())
cmap = {c['calculation_id']: c for c in calcs}

for cid in ['C1', 'C2', 'C3', 'C4', 'C5', 'C6-RO-P', 'C6-RO-W', 'C6-RO-H', 'C6-EU']:
    field = cid + '.vs.B1-ESTIMATED.baseline_annual_spend'
    for c in calcs:
        if c['field'] == field:
            # Annual input
            for inp_key, inp_val in c['inputs'].items():
                ref = inp_val.get('calculation_ref')
                if ref and ref in cmap:
                    ref_c = cmap[ref]
                    if 'NETWORK' in ref_c['field'] or 'annual' in ref_c['field'].lower():
                        print(f"{cid}: annual_ref={ref} field={ref_c['field']} central={ref_c['central']:,.0f}")

print('\n--- Direct annual per candidate baseline_spend ---')
streams = {
    'C1':'whole', 'C2':'whole', 'C3':'whole',
    'C4':'portions', 'C5':'portions',
    'C6-RO-P':'portions', 'C6-RO-W':'whole', 'C6-RO-H':'whole', 'C6-EU':'portions'
}
network = {}
for c in calcs:
    if c['field'].startswith('NETWORK.'):
        network[c['field']] = c

print('NETWORK.whole_annual:', network.get('NETWORK.whole_annual', {}).get('central'))
print('NETWORK.portions_annual:', network.get('NETWORK.portions_annual', {}).get('central'))

for cid, stream in streams.items():
    n_field = f'NETWORK.{stream}_annual'
    n_central = network.get(n_field, {}).get('central', 0)
    spend_field = cid + '.vs.B1-ESTIMATED.baseline_annual_spend'
    for c in calcs:
        if c['field'] == spend_field:
            print(f"{cid} [{stream}]: baseline_spend central={c['central']:,.1f} (stream={n_central:,.0f})")
