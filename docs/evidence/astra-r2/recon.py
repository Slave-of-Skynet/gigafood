"""Read-only committed-snapshot reconnaissance; no production files are written."""
import json, pathlib, hashlib, collections
ROOT = pathlib.Path(__file__).resolve().parents[3]
OUT = pathlib.Path(__file__).resolve().parent
D = json.loads((ROOT/'docs/evidence/htf-03/HTF-03-canonical-packaging-dataset.json').read_text(encoding='utf-8'))
UI = json.loads((ROOT/'docs/evidence/htf-03/HTF-03-prototype-display-dataset.json').read_text(encoding='utf-8'))
metrics = ['total_package_mass_g','plastic_mass_g','virgin_plastic_mass_g','recycled_material_fraction','renewable_material_fraction']
rows=[]
def add(entity, field, obj, group, surface, route):
    obj=obj or {}; value=obj.get('value'); state=obj.get('state','ABSENT')
    missing=value is None or state=='UNKNOWN'
    rows.append(dict(id=f'GAP-{len(rows)+1:03}',entity=entity,field=field,current_value=value,current_state=state,missing=missing,group=group,surface=surface,why=obj.get('qualifier','Projection absent or exact object shadows model') if missing else 'Present; scope/normalization review',can_estimate=True,research_route=route))
for c in D['candidates'][:5]+D['configurations']:
    cid=c.get('candidate_id',c.get('configuration_id'))
    for m in metrics:
        # clean_ef returns a truthy Pydantic object even for UNKNOWN/null.
        e=c.get('exact_metrics',{}).get(m) or c.get('model_metrics',{}).get(m)
        add(cid,m,e,'G3','CandidateRecommendationCard / configuration metrics','BOM geometry + bounded composition')
    parent=c if 'candidate_id' in c else D['candidates'][5]
    for p in ['romania_unit_price','order_unit','industrial_moq','lead_time']:
        add(cid,p,parent.get('procurement',{}).get(p),'G4','ProcurementSummary (C6 currently inherits parent)','Exact list price -> EU landed market/order scenario')
    for key in ['dimensions','capacity_ml']:
        add(cid,key,c.get(key),'G3','API catalogue (not currently visible card)','Exact drawing -> geometric usable-envelope scenario')
for c in UI['candidates']:
    for s in c.get('scenario_details',[]):
        for k in ['reduction_g','reduction_pct']:
            add(c['candidate_id'],s['scenario_id']+'.'+k,s.get(k),'G3','Conditional Screening Scenarios','Recompute complete-pack model; C6 must bind selected configuration')
for b in D['baselines']:
    bid=b['baseline_id']
    observed=b.get('observed',{})
    add(bid,'virgin_fraction',observed.get('virgin_plastic_fraction') if bid=='B1' else None,'G5','Baseline card','Keep provider observation separate from bounded scenario')
    add(bid,'complete_mass',b.get('estimated',{}).get('model_metrics',{}).get('total_package_mass_g') if bid=='B1' else b.get('model_metrics',{}).get('total_package_mass_g'),'G3','Baseline card (missing optional field hidden)','Reuse E002/E003 or explicit B2 all-plastic scenario')
    add(bid,'complete_cost',None,'G4','Baseline card (B1/B2 hidden; B3 raw listed price not normalized)','Romanian market benchmark + closure + delivery + VAT')
for field in ['annual_packages','participating_locations','daily_packages','operating_days','hot_hold_temperature','oven_duration']:
    add('DEMO',field,None,'G5','Required narrative extension; not current numeric card','Observed network anchor + explicit bounded scenario')
OUT.mkdir(exist_ok=True)
(OUT/'gap-inventory-before.json').write_text(json.dumps(rows,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
lines=['# ASTRA-R2 — GAP INVENTORY BEFORE NEW WEB RESEARCH','','Base: `21e9caa540dd710218147a2c343586dcd40f429b`; origin/main freshly fetched, no delta. Read-only source/code inspection.','',
'Counting unit: unique entity/configuration + field, not repeated cards across 8 contexts. Duplicate price widgets count once. Catalogue-only and newly required narrative fields are separately tagged; source archive, carbon (explicitly excluded), actual confidential provider facts, stock, and nonnumeric gates are not numeric demo gaps. B3 normalized complete cost is an extension, not a missing observed listing.','',
'| ID | UI/runtime field | Entity | Current value/state | Why missing | Class / can estimate | Research route |','|---|---|---|---|---|---|---|']
for r in rows:
    lines.append('| '+' | '.join([r['id'],r['surface']+': '+r['field'],r['entity'],str(r['current_value'])+' / '+r['current_state'],r['why'].replace('|','/'),r['group']+' / yes',r['research_route']])+' |')
counts=collections.Counter(g['status'] for r in D['product_candidate_gates'] for g in r['gates'].values())
lines += ['',f'Inventory rows: {len(rows)}; absent/UNKNOWN numeric or structured-geometry records: {sum(r["missing"] for r in rows)}.',f'G6: 48 evaluated rows × six gates = {dict(counts)}. No proposed numeric value will change any gate. Actual provider observations remain outside the modeled record.']
(OUT/'01-gap-inventory-before.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
paths=[]
for pattern in ['docs/canon/*.md','docs/evidence_semantics.md','docs/evidence/htf-03/*','docs/recon/INT-HTF-04A*','docs/review/APR-HT1-*','docs/pitch/NCP-HT1-*','docs/pitch/NCP-HT2-*','backend/app/*/recommendation.py','frontend/src/api/contracts.ts','frontend/src/components/*.tsx','scripts/validate_htf03.py']:
    for p in ROOT.glob(pattern):
        if p.is_file():
            raw=p.read_bytes(); paths.append({'path':p.relative_to(ROOT).as_posix(),'sha256':hashlib.sha256(raw).hexdigest(),'bytes':len(raw)})
(OUT/'recon-manifest.json').write_text(json.dumps(paths,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'inventory_rows':len(rows),'missing':sum(r['missing'] for r in rows),'gate_status_counts':dict(counts),'files':len(paths)},indent=2))
