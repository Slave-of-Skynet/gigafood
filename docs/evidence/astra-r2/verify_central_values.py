"""Generate a complete verification report: check all central values in markdown against ledger."""
import json, re

calcs = json.loads(open('docs/evidence/astra-r2/synthesis-ledger.json', encoding='utf-8').read())
cmap = {c['calculation_id']: c for c in calcs}

# Build field->calc map
fmap = {}
for c in calcs:
    fmap[c['field']] = c

# Network volumes (exact)
WHOLE_ANNUAL    = cmap['ASTRA-E024']  # 3,168,000
PORTIONS_ANNUAL = cmap['ASTRA-E025']  # 6,336,000
ANNUAL_PACKAGES = cmap['ASTRA-E026']  # 9,504,000

print('Network volumes:')
print(f'  ASTRA-E024 NETWORK.whole_annual: L={WHOLE_ANNUAL["low"]:,.0f} C={WHOLE_ANNUAL["central"]:,.0f} H={WHOLE_ANNUAL["high"]:,.0f}')
print(f'  ASTRA-E025 NETWORK.portions_annual: L={PORTIONS_ANNUAL["low"]:,.0f} C={PORTIONS_ANNUAL["central"]:,.0f} H={PORTIONS_ANNUAL["high"]:,.0f}')
print(f'  ASTRA-E026 NETWORK.annual_packages: L={ANNUAL_PACKAGES["low"]:,.0f} C={ANNUAL_PACKAGES["central"]:,.0f} H={ANNUAL_PACKAGES["high"]:,.0f}')

# Key business case values for docs
print('\nC1 business case (whole stream ASTRA-E024=3,168,000 central):')
for field, cid in [
    ('C1.vs.B1-ESTIMATED.incremental_cost', 'ASTRA-E446'),
    ('C1.vs.B1-ESTIMATED.premium_pct', 'ASTRA-E447'),
    ('C1.vs.B1-ESTIMATED.reduction_g', 'ASTRA-E444'),
    ('C1.vs.B1-ESTIMATED.reduction_pct', 'ASTRA-E445'),
    ('C1.vs.B1-ESTIMATED.baseline_annual_spend', 'ASTRA-E450'),
    ('C1.vs.B1-ESTIMATED.candidate_annual_spend', 'ASTRA-E451'),
    ('C1.vs.B1-ESTIMATED.annual_incremental_cost', 'ASTRA-E452'),
    ('C1.vs.B1-ESTIMATED.baseline_annual_virgin', 'ASTRA-E453'),
    ('C1.vs.B1-ESTIMATED.candidate_annual_virgin', 'ASTRA-E454'),
    ('C1.vs.B1-ESTIMATED.annual_virgin_avoided', 'ASTRA-E455'),
]:
    c = fmap.get(field)
    if c:
        print(f'  {c["calculation_id"]} {field.split(".")[-1]}: L={c["low"]:.4f} C={c["central"]:.4f} H={c["high"]:.4f}')

print('\nC5 business case (portions stream ASTRA-E025=6,336,000 central):')
for field in [
    'C5.vs.B1-ESTIMATED.incremental_cost',
    'C5.vs.B1-ESTIMATED.premium_pct',
    'C5.vs.B1-ESTIMATED.reduction_g',
    'C5.vs.B1-ESTIMATED.reduction_pct',
    'C5.vs.B1-ESTIMATED.baseline_annual_spend',
    'C5.vs.B1-ESTIMATED.candidate_annual_spend',
    'C5.vs.B1-ESTIMATED.annual_incremental_cost',
    'C5.vs.B1-ESTIMATED.baseline_annual_virgin',
    'C5.vs.B1-ESTIMATED.candidate_annual_virgin',
    'C5.vs.B1-ESTIMATED.annual_virgin_avoided',
]:
    c = fmap.get(field)
    if c:
        print(f'  {c["calculation_id"]} {field.split(".")[-1]}: L={c["low"]:.4f} C={c["central"]:.4f} H={c["high"]:.4f}')

print('\nC6-RO-H business case (whole stream, central):')
for field in [
    'C6-RO-H.vs.B1-ESTIMATED.incremental_cost',
    'C6-RO-H.vs.B1-ESTIMATED.premium_pct',
    'C6-RO-H.vs.B1-ESTIMATED.reduction_g',
    'C6-RO-H.vs.B1-ESTIMATED.reduction_pct',
    'C6-RO-H.vs.B1-ESTIMATED.baseline_annual_spend',
    'C6-RO-H.vs.B1-ESTIMATED.candidate_annual_spend',
    'C6-RO-H.vs.B1-ESTIMATED.annual_incremental_cost',
    'C6-RO-H.vs.B1-ESTIMATED.annual_virgin_avoided',
]:
    c = fmap.get(field)
    if c:
        print(f'  {c["calculation_id"]} {field.split(".")[-1]}: L={c["low"]:.4f} C={c["central"]:.4f} H={c["high"]:.4f}')

# Geometry fill ratios
print('\nFill ratios (whole_fill_ratio):')
for cid in ['C1','C2','C3','C4','C5','C6-RO-P','C6-RO-W','C6-RO-H','C6-EU']:
    c = fmap.get(f'{cid}.whole_fill_ratio')
    if c:
        print(f'  {c["calculation_id"]} {cid}: C={c["central"]:.4f}')

# B1-ESTIMATED mass and cost
print('\nB1-ESTIMATED:')
for field in ['B1-ESTIMATED.total_package_mass_g','B1-ESTIMATED.virgin_plastic_mass_g','B1-ESTIMATED.cost_net']:
    c = fmap.get(field)
    if c:
        print(f'  {c["calculation_id"]} {field.split(".")[-1]}: L={c["low"]} C={c["central"]} H={c["high"]}')

# C1 cost
print('\nC1 cost_net:')
c = fmap.get('C1.cost_net')
if c: print(f'  {c["calculation_id"]}: L={c["low"]} C={c["central"]} H={c["high"]}')

# C5 cost
print('\nC5 cost_net:')
c = fmap.get('C5.cost_net')
if c: print(f'  {c["calculation_id"]}: L={c["low"]} C={c["central"]} H={c["high"]}')
