"""Reproducible research artifact builder. Writes only this handoff directory."""
import copy, hashlib, itertools, json, math, pathlib, collections
OUT = pathlib.Path(__file__).resolve().parent
ROOT = OUT.parents[2]
BASE = '21e9caa540dd710218147a2c343586d40f429b'  # corrected below; full Git identifier
BASE = '21e9caa540dd710218147a2c343586dcd40f429b'
CP = ROOT/'docs/evidence/htf-03/HTF-03-canonical-packaging-dataset.json'
D = json.loads(CP.read_text(encoding='utf-8'))
OLD = {c['calculation_id']: c for c in D['calculations']}
CALCS = []
FIELDS = {}
def dump(name, obj):
    (OUT/name).write_text(json.dumps(obj, ensure_ascii=False, indent=2, allow_nan=False)+'\n', encoding='utf-8')
def ev(expr, vals):
    if isinstance(expr, (int,float)): return expr
    if isinstance(expr,str): return vals[expr]
    op,args=next(iter(expr.items())); a=[ev(x,vals) for x in args]
    return {'add':lambda:sum(a),'mul':lambda:math.prod(a),'sub':lambda:a[0]-a[1], 'div':lambda:a[0]/a[1], 'min':lambda:min(a)}[op]()
def E(op,*args): return {op:list(args)}
def calc(field, unit, expression, inputs, basis, sources=(), state='ESTIMATED', confidence='LOW', uncertainty=None, falsify=None):
    cid=f'ASTRA-E{len(CALCS)+1:03}'
    ins={}
    for k,v in inputs.items():
        if isinstance(v,str):
            c=FIELDS[v]['estimate']; ins[k]={z:c[z] for z in ('low','central','high','unit','state')}
            ins[k].update(calculation_ref=c['calculation_id'],source_ids=FIELDS[v]['source_ids'],basis=c['field'])
        elif isinstance(v,dict): ins[k]=v
        else:
            seq=v if isinstance(v,(list,tuple)) else [v]*3
            ins[k]=dict(zip(('low','central','high'),seq),unit=unit,state='ASSUMED',source_ids=list(sources) or ['ASTRA-TASK'],basis=basis)
    keys=list(ins)
    values=[ev(expression,dict(zip(keys,corner))) for corner in itertools.product(*[(ins[k]['low'],ins[k]['high']) for k in keys])]
    central=ev(expression,{k:v['central'] for k,v in ins.items()})
    src=sorted(set(sources)|{s for v in ins.values() for s in v.get('source_ids',[])})
    c=dict(calculation_id=cid,field=field,state=state,unit=unit,low=round(min(values),8),central=round(central,8),high=round(max(values),8),
           method='Independent input corner bounds; deterministic central design point; not a statistical confidence interval',
           formula=json.dumps(expression,separators=(',',':')),expression=expression,inputs=ins,
           assumptions=[basis],analogue_validity=basis,central_selection=basis,
           confidence=confidence,sensitivity=uncertainty or basis,dominant_uncertainty=uncertainty or basis,
           falsification_condition=falsify or 'Replace when a measured finished-pack BOM, exact supplier specification, invoice or site trial falls outside these conditional bounds.',
           interval_kind='CONDITIONAL_ENGINEERING_BOUNDS_NOT_STATISTICAL_CI',source_ids=src)
    CALCS.append(c)
    f=dict(kind='evidence_field',value={k:c[k] for k in ('low','central','high')},state=state,unit=unit,source_ids=src,calculation_id=cid,
           confidence=confidence,qualifier=basis,scope='CONFIGURATION',display_policy='DISPLAY_WITH_QUALIFIER' if state in ('ASSUMED','CONFLICT') else 'DISPLAY_ESTIMATED',estimate=c)
    f['demo_safe_sentence']=f"Modeled {field}: {c['central']:g} {unit} (engineering bounds {c['low']:g}–{c['high']:g}); {basis}"
    FIELDS[field]=f
    return field
def a(field, values, unit, basis, sources=('ASTRA-TASK',), state='ASSUMED', confidence='LOW'):
    return calc(field,unit,'x',{'x':values},basis,sources,state,confidence)
def old(field,cid):
    o=OLD[cid]; i={k:o[k] for k in ('low','central','high','unit','state')}
    i.update(calculation_ref=cid,source_ids=sorted({s for v in o['inputs'].values() for s in v.get('source_ids',[])}),basis=o['field'])
    return calc(field,o['unit'],'x',{'x':i},'Inherited HTF-03 calculation '+cid+'; original expression and input provenance retained in canonical calculation registry.',i['source_ids'],confidence=o['confidence'])
def alias(field,other,basis='Explicit modeled complete-pack projection; not a measured supplier or Profi value.'):
    return calc(field,FIELDS[other]['unit'],'x',{'x':other},basis)
def summ(field,unit,items,basis): return calc(field,unit,E('add',*items),items,basis)
def central(key): return FIELDS[key]['value']['central']
def rr(key):
    v=FIELDS[key]['value']; return ' / '.join(f'{v[k]:,.4f}' for k in ('low','central','high'))

# Fixed exchange scenario and procurement boundary.
a('FX.RON_per_EUR',[5,5.2765,5.5],'RON/EUR','Central ECB 2026-09-25; outer bounds are a commercial FX stress scenario.',('ASTRA-S05',))
a('FX.DKK_per_EUR',7.4755,'DKK/EUR','Observed reference, held fixed for currency cross.',('ASTRA-S05',))
a('TAX.gross_factor',1.21,'factor','Packaging purchased separately; recoverable VAT excluded in net costs.',('ASTRA-S06',))
a('COMMON.ancillary_g',[.1,.3,.7],'g','Closure/seam/label allowance; all counted conservatively as virgin polymer, not omitted.',('ASTRA-TASK','S17'))
old('COMMON.bag_area_m2','E001')
old('B1-ESTIMATED.total_package_mass_g','E002')
for k in ('plastic_mass_g','virgin_plastic_mass_g'): alias('B1-ESTIMATED.'+k,'B1-ESTIMATED.total_package_mass_g')
for k,v in [('virgin_fraction',1),('recycled_material_fraction',0),('renewable_material_fraction',0)]:
    a('B1-ESTIMATED.'+k,v,'fraction','Virgin PET/PA-like scenario; zero recycled/renewable credit is an explicit construction assumption, not null imputation.',('TASK','S27','S30'))
a('PRICE.Barleta_net',.37026/1.21,'RON/pack','Historical B3 370.26 RON/1000 VAT-included /1.21; unchanged inherited price, not a refreshed quote.',('S17','ASTRA-S06'))
a('PRICE.SP31_net',1.04,'RON/pack','Romanian resealable rotisserie price excluding VAT, 100-unit selling pack; different construction from B1.',('ASTRA-S04',))
calc('B1-ESTIMATED.body_cost_net','RON/pack','x',{'x':[.37026/1.21,(.37026/1.21+1.04)/2,1.04]},'Midpoint of dissimilar Romanian complete-bag price anchors; broad analogue envelope, not actual Profi procurement.',('S17','ASTRA-S04'))
a('COMMON.closure_cost_net',[.01,.03,.08],'RON/pack','Separate closure/label purchasing allowance, conservatively additional even if comparator includes reseal.',('ASTRA-S04','ASTRA-TASK'))
a('BASELINE.freight_net',[.01,.02,.08],'RON/pack','Consolidated domestic order freight allocation; scenario rather than free-delivery entitlement.',('ASTRA-S04','ASTRA-TASK'))
summ('B1-ESTIMATED.cost_net','RON/pack',dict(body='B1-ESTIMATED.body_cost_net',closure='COMMON.closure_cost_net',freight='BASELINE.freight_net'),'Complete package Romania-delivered market model, recoverable VAT excluded; not Profi price.')

# Network and operating scenario. No installed equipment or store participation is claimed.
a('NETWORK.stores',1760,'locations','Conservative scenario anchor from more-than-1760 public counter; not exact store census.',('ASTRA-S01',))
a('NETWORK.penetration',[.1,.25,.4],'fraction','Bounded hot-deli participation assumption; no public format-specific count found.',('ASTRA-S01','ASTRA-TASK'))
calc('NETWORK.participating_locations','locations',E('mul','n','p'),dict(n='NETWORK.stores',p='NETWORK.penetration'),'Scenario store count times assumed participation.')
a('NETWORK.operating_days',[330,360,365],'days/year','Calendar operating scenario; not observed store opening record.')
a('NETWORK.whole_daily',[10,20,40],'packs/location/day','Central one 20-bird equipment batch/day; capacity analogue is not sales or installed Profi equipment.',('ASTRA-S02',))
a('NETWORK.portions_daily',[20,40,80],'packs/location/day','Two portion packs per modeled whole-bird pack; explicit independent product-mix scenario, not yields from the same birds.',('ASTRA-S02','ASTRA-TASK'))
for stream in ('whole','portions'):
    calc('NETWORK.'+stream+'_annual','packs/year',E('mul','n','d','t'),dict(n='NETWORK.participating_locations',d='NETWORK.'+stream+'_daily',t='NETWORK.operating_days'),'Network scenario; daily throughput and participation dominate uncertainty.')
summ('NETWORK.annual_packages','packs/year',dict(w='NETWORK.whole_annual',p='NETWORK.portions_annual'),'Whole and portions are disjoint demand streams; fallback packs replace a stream and must not be added.')
summ('NETWORK.daily_packages','packs/location/day',dict(w='NETWORK.whole_daily',p='NETWORK.portions_daily'),'Combined disjoint whole and portions daily scenario.')
a('WORKFLOW.cabinet_temperature',[85,90,95],'degC','MODELED RETAIL HOT-HOLD CONDITION: cabinet setpoint/stress range, not food core temperature or supplier qualification.',('ASTRA-S14','ASTRA-S20'))
a('WORKFLOW.food_fill_temperature',[82,85,88],'degC','Hot-fill practice analogue; cooked chicken entering merchandiser.',('ASTRA-S20',))
a('WORKFLOW.package_contact_temperature',[70,85,95],'degC','Designed contact-temperature stress envelope; actual wall/contact temperature must be instrumented.',('ASTRA-S14','ASTRA-S20','ASTRA-TASK'))
a('WORKFLOW.hold_minutes',360,'min','Fixed six-hour task contact duration, not a safety permission.',('ASTRA-TASK',))
a('WORKFLOW.oven_temperature',250,'degC','Literal challenge screening condition; does not establish capability.',('TASK',))
a('WORKFLOW.oven_duration',[30,60,90],'min','Explicit missing-duration stress design; central 60 minutes. Official exposure duration remains unconfirmed.')

# Geometry. Deformable bag dimensions are a bounded design, not a transfer of rectangular tray capacity.
a('FOOD.bird_mass',[1,1.2,1.4],'kg','Cooked whole-bird trial envelope; central commercial prepared-food analogue.',('ASTRA-S03',))
for axis,v in [('length',[200,220,240]),('width',[140,150,170]),('height',[100,110,130])]:
    a('FOOD.bird_'+axis,v,'mm','Assumed occupied ellipsoid dimensions for bird fit; not measured from a photo or mass-to-density inference.',('ASTRA-S03','ASTRA-TASK'))
calc('FOOD.bird_volume','ml',E('div',E('mul',math.pi/6,'l','w','h'),1000),dict(l='FOOD.bird_length',w='FOOD.bird_width',h='FOOD.bird_height'),'Ellipsoid occupied envelope, including air between limbs; physical pack trial can falsify dimensions.')
a('FOOD.whole_free_liquid',[30,50,80],'ml','Poultry fat/juice stress allowance; added to occupied volume, not a measured drainage yield.')
a('FOOD.portion_mass',[.3,.5,.7],'kg','P2-P4 mixed deli portion design scenario, no claimed sales mix.')
a('FOOD.portion_bulk_density',[.6,.75,.9],'g/ml','Bulk food including voids; deliberately lower than dense liquid, recipe-specific.')
calc('FOOD.portion_volume','ml',E('div',E('mul','m',1000),'rho'),dict(m='FOOD.portion_mass',rho='FOOD.portion_bulk_density'),'Portion mass divided by assumed bulk density.')
a('FOOD.portion_free_liquid',[10,25,50],'ml','Fat/sauce challenge allowance; added to the portion occupied-volume model.')
for axis,v in [('length',[280,300,310]),('width',[160,180,190]),('height',[90,120,120])]:
    a('BAG.usable_'+axis,v,'mm','Deformable oval cross-section scenario for nominal 180+70 by 350 mm bag. Width and depth are not independent rectangular gusset dimensions.',('S17','ASTRA-TASK'))
a('BAG.shape_factor',[.6,.7,.8],'fraction','Taper/folds and unfilled end derating of oval cylinder.')
calc('BAG.usable_volume','ml',E('div',E('mul',math.pi/4,'l','w','h','f'),1000),dict(l='BAG.usable_length',w='BAG.usable_width',h='BAG.usable_height',f='BAG.shape_factor'),'Oval cylinder times shape allowance. Circumference must fit 500 mm available lay-flat perimeter; supplier drawing and hot trial required.')
calc('BAG.closure_allowance','mm',E('sub',350,'l'),dict(l='BAG.usable_length'),'Nominal 350 mm bag length minus usable length.')

MODEL={}
def record(cid, identity, accounting='polymer estimate'):
    MODEL[cid]=dict(entity_id=cid,identity=identity,accounting=accounting,metrics={},components={},geometry={},thermal={},procurement={},viewing={})
    return MODEL[cid]
def metric(cid,name,key): MODEL[cid]['metrics'][name]=key
def make_sum(cid,name,items,basis):
    key=summ(cid+'.'+name,'g',items,basis);metric(cid,name,key);return key
def zero_credit(cid,name,basis):
    key=a(cid+'.'+name,0,'fraction',basis);metric(cid,name,key)
record('B1-ESTIMATED','Modeled incumbent format; actual Profi observations remain untouched')
for k in ('total_package_mass_g','plastic_mass_g','virgin_plastic_mass_g','recycled_material_fraction','renewable_material_fraction'): metric('B1-ESTIMATED',k,'B1-ESTIMATED.'+k)
record('B2','Virgin all-plastic market-bag geometry scenario; SP31 is price analogue only')
for k in MODEL['B1-ESTIMATED']['metrics']: metric('B2',k,alias('B2.'+k,'B1-ESTIMATED.'+k,'B2 all-plastic geometry stress model; not exact SP31 material identification.'))
summ('B2.cost_net','RON/pack',dict(body='PRICE.SP31_net',closure='COMMON.closure_cost_net',freight='BASELINE.freight_net'),'Complete Romanian market comparator model; no exact selected B2 SKU claim.')
record('B3','Barleta paper + PP public comparator, not Profi packaging')
for k,e in [('total_package_mass_g','E003'),('plastic_mass_g','E004'),('virgin_plastic_mass_g','E004'),('renewable_material_fraction','E005')]:metric('B3',k,old('B3.'+k,e))
zero_credit('B3','recycled_material_fraction','Virgin paper/PP comparison scenario; no recycled-content credit without BOM.')
summ('B3.cost_net','RON/pack',dict(body='PRICE.Barleta_net',closure='COMMON.closure_cost_net',freight='BASELINE.freight_net'),'Historical body price normalized to net plus closure and domestic delivered allowance.')

record('C1','Sacma B.Life Gaia-format complete bag, modeled geometry/BOM; no nominated liner grade','conservative all-liner virgin-plastic accounting budget; not measured chemical plastic')
a('C1.paper_gsm',[40,50,60],'g/m2','Bag-paper analogue; 50 gsm central engineering point.',('S17','S01'))
a('C1.window_area',[.006,.012,.020],'m2','Designed visible cutout, central 100 by 120 mm; not exact Gaia drawing.',('S01','ASTRA-TASK'))
a('C1.liner_gsm',[43,54,65],'g/m2','NatureFlex grade mass analogue; central intermediate design gauge. Exact Gaia film unspecified.',('ASTRA-S09','ASTRA-S10'))
a('C1.coating_gsm',[.5,2,5],'g/m2','Effective coated-area allowance. Central 2 gsm is consistent in order with ADCOTE 1.95-4.07 gsm using assumed 3000 ft2/ream; not Gaia chemistry.',('ASTRA-S11',))
calc('C1.paper_g','g',E('mul',E('sub','a','w'),'gsm'),dict(a='COMMON.bag_area_m2',w='C1.window_area',gsm='C1.paper_gsm'),'Paper after removed viewing cutout; liner spans full area and provides the window without double counting.')
calc('C1.liner_g','g',E('mul','a','gsm'),dict(a='COMMON.bag_area_m2',gsm='C1.liner_gsm'),'Full internal liner including window-covered region.')
calc('C1.coating_g','g',E('mul','a','gsm'),dict(a='COMMON.bag_area_m2',gsm='C1.coating_gsm'),'Nonzero additional coating/adhesive budget, even though liner may already contain coatings; conservative possible overlap.')
make_sum('C1','total_package_mass_g',dict(paper='C1.paper_g',film='C1.liner_g',coat='C1.coating_g',extra='COMMON.ancillary_g'),'Full Gaia-format design: cutout-subtracted paper + full liner + explicit extra coating + closure.')
make_sum('C1','plastic_mass_g',dict(film='C1.liner_g',coat='C1.coating_g',extra='COMMON.ancillary_g'),'Existing conditional all-liner-counted budget plus coating. Regenerated cellulose is not declared fossil polymer; display explicitly as accounting budget, never exact plastic.')
metric('C1','virgin_plastic_mass_g',alias('C1.virgin_plastic_mass_g','C1.plastic_mass_g','No recycled credit in conservative all-liner-counted scenario; virgin definition unchanged.'))
zero_credit('C1','recycled_material_fraction','Virgin paper/film design assumption; zero recycled credit, not a supplier observation.')
a('C1.film_renewable_share',[.85,.9,.95],'fraction','Bounded regenerated-cellulose mass share of coated film; not a biobased-carbon certificate.',('ASTRA-S09','ASTRA-S10'))
calc('C1.renewable_material_fraction','fraction',E('div',E('add','p',E('mul','l','r')),E('add','p','l','c','e')),dict(p='C1.paper_g',l='C1.liner_g',r='C1.film_renewable_share',c='C1.coating_g',e='COMMON.ancillary_g'),'Renewable mass estimate; overlaps conservative plastic accounting budget because that budget counts all cellulose liner.')
metric('C1','renewable_material_fraction','C1.renewable_material_fraction')
MODEL['C1']['components']=dict(paper='C1.paper_g',liner_including_window='C1.liner_g',coating='C1.coating_g',closure='COMMON.ancillary_g')
a('PRICE.film_EUR_m2',[166.78/92.5,177.42/92.5,177.42/92.5*1.21],'EUR/m2','Biopack area-price analogue from 185 mm x 500 m reel. VAT unconfirmed: central treats listing as net; high adds 21% contingency, low bulk tier. Does not select this narrow film.',('ASTRA-S18',))
a('PRICE.paper_EUR_kg',[1.5,2.5,4],'EUR/kg','Unquoted converted paper input scenario, not a supplier price; conversion cost modeled separately.',('S17','ASTRA-TASK'))
a('PRICE.adhesive_EUR_kg',[3,5,10],'EUR/kg','Explicit unquoted adhesive procurement scenario; chemistry and small-lot premium dominate.',('ASTRA-S11','ASTRA-TASK'))
a('C1.factory_film_factor',[.35,.5,1],'factor','Bulk converter versus small-reel price scenario, not a negotiated discount.',('ASTRA-S18','ASTRA-TASK'))
calc('C1.paper_cost','RON/pack',E('div',E('mul','m','p','fx'),1000),dict(m='C1.paper_g',p='PRICE.paper_EUR_kg',fx='FX.RON_per_EUR'),'Paper input mass times explicit EUR/kg scenario.')
calc('C1.film_cost','RON/pack',E('mul','a','p','f','fx'),dict(a='COMMON.bag_area_m2',p='PRICE.film_EUR_m2',f='C1.factory_film_factor',fx='FX.RON_per_EUR'),'Full liner area times analogue film price, assumed converter quantity factor and FX.')
calc('C1.coating_cost','RON/pack',E('div',E('mul','m','p','fx'),1000),dict(m='C1.coating_g',p='PRICE.adhesive_EUR_kg',fx='FX.RON_per_EUR'),'Explicit coating material cost; conversion charged separately.')
a('C1.conversion_cost',[.1,.25,.5],'RON/pack','Bag/window cutting, lamination and seams conversion scenario; excludes food-packing labour and capital.')
a('C1.freight_cost',[.03,.1,.3],'RON/pack','Consolidated Italy-to-Romania import freight allocation; no carrier quote.')
summ('C1.cost_net','RON/pack',dict(paper='C1.paper_cost',film='C1.film_cost',coat='C1.coating_cost',conversion='C1.conversion_cost',closure='COMMON.closure_cost_net',freight='C1.freight_cost'),'Complete converted bag delivered Romania; net VAT; unquoted design market model.')

for cid,identity in [('C2','Sirane Siralon 21 ovenable nylon format'),('C3','Sealed Air Oven Ease EMEA family, 2014 US gauge analogue only')]:
    record(cid,identity)
    if cid=='C2':old(cid+'.total_package_mass_g','E009')
    else:
        a('C3.gauge',[50.8,63.5,76.2],'um','2/2.5/3 mil same-family historical gauge analogue; not exact current EMEA gauge.',('ASTRA-S19',))
        a('C3.density',[1.1,1.2,1.4],'g/cm3','Assumed multilayer density; PA/PET-like envelope, not disclosed film composition.',('S27','S30'))
        calc('C3.total_package_mass_g','g',E('add',E('mul','a','t','rho'),'extra'),dict(a='COMMON.bag_area_m2',t='C3.gauge',rho='C3.density',extra='COMMON.ancillary_g'),'Full flexible package geometry plus closure; gauge analogue dominates.')
    for k in ('total_package_mass_g','plastic_mass_g','virgin_plastic_mass_g'): metric(cid,k,cid+'.total_package_mass_g' if k=='total_package_mass_g' else alias(cid+'.'+k,cid+'.total_package_mass_g'))
    for k in ('recycled_material_fraction','renewable_material_fraction'):zero_credit(cid,k,'Virgin fossil-polymer construction scenario; no recycled or renewable credit claimed.')
    a(cid+'.price_factor',[.7,1.2,2] if cid=='C2' else [1,1.6,2.5],'factor','Specialty oven-bag market multiple of Romanian SP31 price; different heat dossier and construction, unquoted.',('ASTRA-S04','ASTRA-TASK'))
    calc(cid+'.cost_net','RON/pack',E('add',E('mul','p','f'),'closure','freight'),dict(p='PRICE.SP31_net',f=cid+'.price_factor',closure='COMMON.closure_cost_net',freight='C1.freight_cost'),'Complete bag + closure + delivered import allowance; no exact supplier quote.')

record('C4','Faerch CPET 2227022094 body + clear APET lid 5227005011; historical body SKU inactive')
old('C4.lid_g','E011');a('C4.body_g',51.56,'g','Inherited exact historical body listing, not fresh confirmation of currently orderable SKU.',('S05',))
for k,e in [('total_package_mass_g','E012'),('plastic_mass_g','E012'),('virgin_plastic_mass_g','E013'),('recycled_material_fraction','E014')]:metric('C4',k,old('C4.'+k,e))
zero_credit('C4','renewable_material_fraction','Fossil PET construction; PCR is recycled, not renewable mass.')
MODEL['C4']['components']=dict(body='C4.body_g',lid='C4.lid_g')
a('C4.body_EUR',[.2,.35,.6],'EUR/pack','Explicit replacement-order price scenario for body, because exact historic body SKU is inactive; no identity substitution authorized.',('S05','ASTRA-TASK'))
calc('C4.body_cost','RON/pack',E('mul','p','fx'),dict(p='C4.body_EUR',fx='FX.RON_per_EUR'),'Body price assumption converted to RON.')
calc('C4.lid_cost','RON/pack',E('mul',E('div',655/372,'cross'),'fx','v'),dict(cross='FX.DKK_per_EUR',fx='FX.RON_per_EUR',v=[1/1.25,1,1.21]),'Historical 655 DKK/372 clear lids; VAT ambiguity bracketed, central treats list as net.',('S06',))
summ('C4.cost_net','RON/pack',dict(body='C4.body_cost',lid='C4.lid_cost',closure='COMMON.closure_cost_net',freight='C1.freight_cost'),'Complete body/lid landed scenario; no availability or fit approval.')

record('C5','BIOPAP LC SI-14 + designed compatible transparent film, not NVS45 selected SKU','conservative all-film + hidden-body-coating budget; not measured chemical plastic')
a('C5.body_g',[21.15,23.5,25.85],'g','Inherited same-family 23.5 g body analogue +/-10%; SI-14 finished body still unweighed.',('S10',))
a('C5.body_coating_fraction',[.01,.03,.05],'fraction','Nonzero polymer/adhesive reserve INSIDE finished body weight, not added again; manufacturing chemistry unverified.',('ASTRA-S11','ASTRA-TASK'))
calc('C5.body_coating_g','g',E('mul','m','f'),dict(m='C5.body_g',f='C5.body_coating_fraction'),'Hidden coating reserve allocated within body mass.')
a('C5.film_gsm',[1000/23.3,1000/15.5,70],'g/m2','Transparent cellulose-film design: NVS30/NVS45 mass analogues, central 45 um; no thermal suitability transfer.',('ASTRA-S09',))
a('C5.trim_factor',[1.05,1.1,1.2],'factor','Retained seal-film flange/trim relative to 190 x 247 mm outside rectangle; scrap excluded from pack mass.',('ASTRA-S15','ASTRA-TASK'))
calc('C5.film_g','g',E('mul',.19,.247,'trim','gsm'),dict(trim='C5.trim_factor',gsm='C5.film_gsm'),'Full external rim covered plus retained trim; food aperture alone would undercount film.')
make_sum('C5','total_package_mass_g',dict(body='C5.body_g',film='C5.film_g',extra='COMMON.ancillary_g'),'Complete tray + retained film + label; coating already inside body.')
make_sum('C5','plastic_mass_g',dict(coat='C5.body_coating_g',film='C5.film_g',extra='COMMON.ancillary_g'),'Conservative all-film accounting budget plus explicit body coating and ancillary, not a measured plastic BOM.')
metric('C5','virgin_plastic_mass_g',alias('C5.virgin_plastic_mass_g','C5.plastic_mass_g','No recycled credit in all-film accounting scenario.'))
zero_credit('C5','recycled_material_fraction','Virgin fibre/film scenario; no unverified recycled-content credit.')
calc('C5.renewable_material_fraction','fraction',E('div',E('add',E('mul','b',E('sub',1,'c')),E('mul','f','r')),E('add','b','f','e')),dict(b='C5.body_g',c='C5.body_coating_fraction',f='C5.film_g',r='C1.film_renewable_share',e='COMMON.ancillary_g'),'Cellulose body minus coating reserve + estimated cellulose share of film; mass-based, not carbon certification.')
metric('C5','renewable_material_fraction','C5.renewable_material_fraction')
MODEL['C5']['components']=dict(body_including_coating='C5.body_g',coating_already_in_body='C5.body_coating_g',film='C5.film_g',label='COMMON.ancillary_g')
calc('C5.body_cost','RON/pack',E('mul',251.79/780,'fx','v'),dict(fx='FX.RON_per_EUR',v=[.75,1,1.2]),'Mixpack body-only 251.79 EUR/780; VAT unknown. Central conservatively treats as net; outer VAT/quantity/price scenario.',('ASTRA-S17',))
a('C5.film_width',.210,'m','Designed minimum 210 mm roll covers 190 mm outside rim; Weber 215 mm supports practical width. Verify jaw margins.',('ASTRA-S07','ASTRA-S16'))
a('C5.roll_pitch',[.257,.267,.277],'m','247 mm tray length plus 10/20/30 mm web pitch waste; consumed reel, not retained pack film.')
calc('C5.consumed_film_area','m2',E('mul','w','p'),dict(w='C5.film_width',p='C5.roll_pitch'),'Charged reel footprint includes cutting waste; cannot buy 185 mm roll for a 190 mm tray.')
a('C5.grade_price_factor',[1,1.25,2],'factor','Unquoted compatible high-temperature grade premium over commercial film area-price analogue; no selected grade or thermal transfer.',('ASTRA-S07','ASTRA-S14','ASTRA-TASK'))
calc('C5.film_cost','RON/pack',E('mul','a','p','f','fx'),dict(a='C5.consumed_film_area',p='PRICE.film_EUR_m2',f='C5.grade_price_factor',fx='FX.RON_per_EUR'),'Consumed web area times market analogue with designed compatible-grade premium.')
a('C5.conversion_cost',[.03,.08,.15],'RON/pack','Seal consumables/conversion allowance; excludes labour, sealer capital and energy.')
a('C5.freight_cost',[.05,.15,.4],'RON/pack','EU consolidated body and film import to Romania; allocation scenario, not carrier quote.')
summ('C5.cost_net','RON/pack',dict(body='C5.body_cost',film='C5.film_cost',conversion='C5.conversion_cost',label='COMMON.closure_cost_net',freight='C5.freight_cost'),'Complete SI-14/compatible-film delivered design cost, net VAT.')

# Aluminium configurations remain separate, including unidentified-lid design branches.
configs={'C6-RO-P':(220,170,35,1125,.76,.3885),'C6-RO-W':(257,195,103,None,1.8725,.4115),'C6-RO-H':(255,195,90,2400,1.43,None),'C6-EU':(293,193,45,1896,None,None)}
for cid,(l,w,h,cap,bp,lp) in configs.items():
    record(cid,next(c['identity']['value'] for c in D['configurations'] if c['configuration_id']==cid))
    if cid=='C6-RO-P':old(cid+'.body_g','E022');old(cid+'.lid_g','E023')
    elif cid=='C6-EU':a(cid+'.body_g',[27.9,31,34.1],'g','Exact historical TDS 31 g +/-10% net body; not gross carton.',('S24',));old(cid+'.lid_g','E031')
    else:
        a(cid+'.base_scale',[.65,.75,.85],'factor','Tapered aluminium tray developed-surface approximation using outside dimensions; not an exact drawing.',('S18' if cid=='C6-RO-W' else 'S19','ASTRA-TASK'))
        a(cid+'.gauge_factor',[.7,1,1.3],'factor','Wall-gauge/forming analogue relative to 31 g Plus Pack body; deliberately broad.',('S24','ASTRA-TASK'))
        calc(cid+'.body_g','g',E('mul',31,E('div',E('add',E('mul',l/1000,w/1000,'f','f'),E('mul',2,h/1000,(l+w)/1000,'f')),.081209),'t'),dict(f=cid+'.base_scale',t=cid+'.gauge_factor'),'Developed tapered base plus walls divided by reference 0.081209 m2; reference 31 g net body.')
        a(cid+'.lid_dome',[.01,.025,.045],'m','Post-oven clear-lid design dome; RO-W exact material/shape remains unknown, RO-H exact lid SKU unspecified.')
        calc(cid+'.lid_g','g',E('mul',E('add',l*w/1e6,E('mul',2,(l+w)/1000,'d')),'t',1.4,1000,'r'),dict(d=cid+'.lid_dome',t=[.15,.25,.4],r=[1.05,1.1,1.2]),'PET-like post-oven lid branch only: developed area x wall mm x 1.4 g/cm3 x1000 x rim factor. Does not identify actual WePack lid polymer.',('S27','ASTRA-TASK'))
    make_sum(cid,'total_package_mass_g',dict(body=cid+'.body_g',lid=cid+'.lid_g',extra='COMMON.ancillary_g'),'Complete aluminium body + clear closure design + ancillary, all net package mass.')
    make_sum(cid,'plastic_mass_g',dict(lid=cid+'.lid_g',extra='COMMON.ancillary_g'),'All designed clear lid and ancillary counted as virgin polymer; body alloy is not plastic.')
    metric(cid,'virgin_plastic_mass_g',alias(cid+'.virgin_plastic_mass_g',cid+'.plastic_mass_g'))
    a(cid+'.body_secondary_fraction',[.3,.38,.5] if cid=='C6-EU' else [0,.38,.6],'fraction','Historical Plus Pack average 38% secondary aluminium anchors scenario; no transfer as observed to Romanian bodies.',('S24',))
    calc(cid+'.recycled_material_fraction','fraction',E('div',E('mul','b','r'),E('add','b','l','e')),dict(b=cid+'.body_g',r=cid+'.body_secondary_fraction',l=cid+'.lid_g',e='COMMON.ancillary_g'),'Whole-package secondary mass fraction, body weighted; no recycled-plastic claim.')
    metric(cid,'recycled_material_fraction',cid+'.recycled_material_fraction')
    zero_credit(cid,'renewable_material_fraction','Metal and fossil-polymer design: no renewable mass credit.')
    MODEL[cid]['components']=dict(body=cid+'.body_g',lid=cid+'.lid_g',ancillary='COMMON.ancillary_g')
    if bp:
        a(cid+'.body_cost',[bp/1.21,bp/1.21,(.903 if cid=='C6-RO-P' else bp*1.2)/1.21],'RON/pack','Romanian gross published body price /1.21; upper ordinary-price/20% stress scenario.',('S20' if cid=='C6-RO-P' else 'S18' if cid=='C6-RO-W' else 'S19','ASTRA-S06'))
    else:
        calc(cid+'.body_cost','RON/pack',E('mul',E('div',5.9525,'cross'),'fx','v'),dict(cross='FX.DKK_per_EUR',fx='FX.RON_per_EUR',v=[.8,1,1.21]),'Inherited 595.25 DKK/100 body price, VAT unconfirmed; central treats as net; outer VAT/price allowance.',('S26',))
    if lp:a(cid+'.lid_cost',[lp/1.21,lp/1.21,lp*1.2/1.21],'RON/pack','Matched nominated lid listed gross price /1.21, high 20% price stress; fit/material still conditional.',('S22' if cid=='C6-RO-P' else 'S18','ASTRA-S06'))
    else:a(cid+'.lid_cost',[.4,.8,1.5] if cid=='C6-RO-H' else [.7,1.3,2],'RON/pack','Unquoted clear-lid cost model anchored in local .3885 gross and C4 specialty lid reference; different geometry, not exact SKU quote.',('S22','S06','ASTRA-TASK'))
    summ(cid+'.cost_net','RON/pack',dict(body=cid+'.body_cost',lid=cid+'.lid_cost',closure='COMMON.closure_cost_net',freight='C5.freight_cost' if cid=='C6-EU' else 'BASELINE.freight_net'),'Complete matched/design body plus post-oven lid and label delivered Romania; net VAT; oven step must exclude unqualified lid.')

# Common per-entity geometry, procurement and numerical screening.
thermals={'B1-ESTIMATED':(200,210,220),'B2':(200,210,220),'B3':(70,80,90),'C1':(150,175,200),'C2':(210,210,210),'C3':(220,220,220),'C4':(220,220,220),'C5':(175,175,185),'C6-RO-P':(200,250,280),'C6-RO-W':(200,250,280),'C6-RO-H':(280,280,280),'C6-EU':(350,350,350)}
moqs={'C1':([1000,5000,10000],[250,500,1000],[10000,20000,40000],[10,20,40]),'C5':([780,780,1560],[780]*3,[12480]*3,[7,14,28]),'C6-RO-P':([100,1400,5000],[100]*3,[4000,8000,12000],[3,5,10]),'C6-RO-W':([100,200,2000],[200]*3,[2000,4000,8000],[3,5,10]),'C6-RO-H':([100,1000,5000],[100]*3,[2000,4000,8000],[3,5,10]),'C6-EU':([400,400,800],[400]*3,[9600]*3,[7,14,28])}
for cid,r in MODEL.items():
    if cid not in configs and cid not in ('C4','C5'):
        for axis in ('length','width','height'):r['geometry']['usable_'+axis+'_mm']='BAG.usable_'+axis
        r['geometry']['capacity_ml']='BAG.usable_volume';r['geometry']['closure_allowance_mm']='BAG.closure_allowance'
        for label,v in [('outer_width_mm',180),('gusset_mm',70),('outer_length_mm',350)]:r['geometry'][label]=a(cid+'.'+label,v,'mm','Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size.',('S17',))
    else:
        l,w,h,cap=(227,178,43,1005) if cid=='C4' else (247,190,37,1240) if cid=='C5' else configs[cid][:4]
        for axis,v in [('length',l),('width',w),('height',h)]:r['geometry']['outer_'+axis+'_mm']=a(cid+'.outer_'+axis,v,'mm','Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions.',('ASTRA-S15' if cid=='C5' else 'S05' if cid=='C4' else 'S24' if cid=='C6-EU' else 'S18' if cid=='C6-RO-W' else 'S19' if cid=='C6-RO-H' else 'S20',))
        if cap is None:
            r['geometry']['capacity_ml']=calc(cid+'.capacity_ml','ml',E('mul',l*w*h/1000,'f'),dict(f=[.45,.6,.75]),'WePack reported 406 litres remains CONFLICT. Geometric bounding-box x taper factor supplies a separate capacity estimate; not a correction to 4.06 L.',('S18','ASTRA-TASK'))
        else:r['geometry']['capacity_ml']=a(cid+'.capacity_ml',cap,'ml','Published nominal body capacity; usable fill is lower.',('ASTRA-S15' if cid=='C5' else 'S24' if cid=='C6-EU' else 'S05' if cid=='C4' else 'S19' if cid=='C6-RO-H' else 'S20',))
        for axis,v in [('length',l-20),('width',w-20),('height',h-5)]:
            vals=[v*.9,v,v*1.05]
            if axis=='height' and cid in ('C6-RO-W','C6-RO-H'):vals=[h+10,h+25,h+40]
            if cid=='C5' and axis=='length':vals=[211,222,233]
            if cid=='C5' and axis=='width':vals=[154,165,176]
            r['geometry']['usable_'+axis+'_mm']=a(cid+'.usable_'+axis,vals,'mm','Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested.',('ASTRA-S15' if cid=='C5' else 'ASTRA-TASK',))
    r['geometry']['usable_fill_ml']=calc(cid+'.usable_fill_ml','ml',E('mul','v','f'),dict(v=r['geometry']['capacity_ml'],f=[.7,.8,.9]),'Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line.')
    for axis in ('length','width','height'):
        r['geometry']['whole_headroom_'+axis+'_mm']=calc(cid+'.whole_headroom_'+axis,'mm',E('sub','p','b'),dict(p=r['geometry']['usable_'+axis+'_mm'],b='FOOD.bird_'+axis),'Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited.')
    r['geometry']['whole_fill_ratio']=calc(cid+'.whole_fill_ratio','fraction',E('div',E('add','b','fat'),'p'),dict(b='FOOD.bird_volume',fat='FOOD.whole_free_liquid',p=r['geometry']['capacity_ml']),'Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit.')
    r['geometry']['portion_fill_ratio']=calc(cid+'.portion_fill_ratio','fraction',E('div',E('add','b','fat'),'p'),dict(b='FOOD.portion_volume',fat='FOOD.portion_free_liquid',p=r['geometry']['capacity_ml']),'Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate.')
    r['geometry']['portion_capacity_kg']=calc(cid+'.portion_capacity_kg','kg',E('div',E('mul',E('sub','v','fat'),'rho'),1000),dict(v=r['geometry']['usable_fill_ml'],fat='FOOD.portion_free_liquid',rho='FOOD.portion_bulk_density'),'Usable fill less free liquid multiplied by bulk food density.')
    r['thermal']['body_screening_degC']=a(cid+'.body_screening_degC',thermals[cid],'degC',
        'Published LC conflict 175/185 C; conservative central 175 C, 60-minute family context.' if cid=='C5' else
        'Published component/family maximum, duration and assembled-package approval not implied.' if cid in ('C2','C3','C4','C6-RO-H','C6-EU') else
        'Exploratory component test-design envelope only; no exact thermal capability established. Do not label this a safe maximum.',
        ('ASTRA-S12','ASTRA-S13') if cid=='C5' else ('S03',) if cid=='C2' else ('S04',) if cid=='C3' else ('S05',) if cid=='C4' else ('S19',) if cid=='C6-RO-H' else ('S24',) if cid=='C6-EU' else ('ASTRA-TASK',),state='CONFLICT' if cid=='C5' else 'ASSUMED')
    r['thermal']['hold_degC']='WORKFLOW.cabinet_temperature';r['thermal']['hold_minutes']='WORKFLOW.hold_minutes'
    if cid in configs or cid=='C4':
        r['thermal']['lid_screening_degC']=a(cid+'.lid_screening_degC',[60,70,80],'degC','APET/PET-like lid exploratory stress-screening range, not a rated safe temperature; no inherited aluminium/CPET oven capability.',('S27','ASTRA-TASK'))
        r['thermal']['complete_system_screening_degC']=calc(cid+'.system_screening_degC','degC',E('min','b','l'),dict(b=r['thermal']['body_screening_degC'],l=r['thermal']['lid_screening_degC']),'Minimum assumed component screening ceiling; explicitly NOT assembled-system certification. Proposed 90 C hold exceeds central lid screening and requires qualification.')
    else:r['thermal']['complete_system_screening_degC']=r['thermal']['body_screening_degC']
    r['thermal']['qualification_only']=True
    vals=moqs.get(cid,([100,1000,5000],[100,500,1000],[10000,20000,40000],[5,14,28]))
    for key,seq,u in zip(('industrial_moq','order_unit','pallet_quantity','lead_time'),vals,('packs','packs/carton','packs/pallet','working_days')):
        r['procurement'][key]=a(cid+'.'+key,seq,u,'Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated.',('ASTRA-S16',) if cid=='C5' else ('S24',) if cid=='C6-EU' else ('ASTRA-TASK',))
    r['procurement']['cost_net']=cid+'.cost_net'
    r['procurement']['cost_gross']=calc(cid+'.cost_gross','RON/pack',E('mul','n','v'),dict(n=cid+'.cost_net',v='TAX.gross_factor'),'Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review.')
    r['procurement']['region_route']='Romanian catalogue delivery' if cid in ('B1-ESTIMATED','B2','B3','C6-RO-P','C6-RO-W','C6-RO-H') else 'Consolidated EU import to Romania; stock unreserved'
    r['procurement']['supplier_route']={'C1':'Sacma Italy / converter; modeled buy, no quote','C5':'Mixpack/Weber BIOPAP body; manufacturer-qualified >=210 mm film to be nominated','C6-RO-P':'E-ambalaj e-7291 + La Habibi a-680681','C6-RO-W':'WePack 803261 + 803262; exact lid material unresolved','C6-RO-H':'E-ambalaj e-pui225 + modeled post-oven clear lid, no SKU','C6-EU':'Plus Pack 0192110201 + 5023100000, historical DK price route'}.get(cid,'Exact public/inherited listing where available; otherwise declared analogue model')
    front=.18*.35 if cid not in configs and cid not in ('C4','C5') else central(r['geometry']['outer_length_mm'])*central(r['geometry']['outer_width_mm'])/1e6
    view=[.006,.012,.02] if cid=='C1' else [front*.6,front*.75,front*.85]
    r['viewing']['visible_area_m2']=a(cid+'.visible_area_m2',view,'m2','Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility.',('S01' if cid=='C1' else 'ASTRA-TASK',))
    r['viewing']['visible_fraction']=calc(cid+'.visible_fraction','fraction',E('div','a',front),dict(a=r['viewing']['visible_area_m2']),'Visible clear area / outside front or top projection, before condensation.')
    r['viewing']['anti_fog_target']=a(cid+'.anti_fog_target',[.7,.8,.9],'fraction','Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed.')

# Business comparisons. Ratios retain shared baseline variable within each expression.
BUSINESS={}
for cid in [c for c in MODEL if c.startswith('C')]:
    for baseline in ('B1-ESTIMATED','B3'):
        prefix=cid+'.vs.'+baseline
        calc(prefix+'.reduction_g','g/pack',E('sub','b','c'),dict(b=baseline+'.virgin_plastic_mass_g',c=cid+'.virgin_plastic_mass_g'),'Signed baseline minus candidate; negative is additional virgin accounting mass, never savings.')
        calc(prefix+'.reduction_pct','%',E('mul',100,E('div',E('sub','b','c'),'b')),dict(b=baseline+'.virgin_plastic_mass_g',c=cid+'.virgin_plastic_mass_g'),'Percent reduction with the same baseline denominator at each corner; negative is an increase.')
        if baseline=='B3':continue
        stream='portions' if cid in ('C4','C5','C6-RO-P','C6-EU') else 'whole'
        annual='NETWORK.'+stream+'_annual';bk=baseline+'.cost_net';ck=cid+'.cost_net'
        BUSINESS[cid]=dict(stream=stream,annual_packages=annual,baseline_cost=bk,candidate_cost=ck,baseline_virgin=baseline+'.virgin_plastic_mass_g',candidate_virgin=cid+'.virgin_plastic_mass_g',reduction_g=prefix+'.reduction_g',reduction_pct=prefix+'.reduction_pct')
        b=BUSINESS[cid]
        b['incremental_cost']=calc(prefix+'.incremental_cost','RON/pack',E('sub','c','b'),dict(c=ck,b=bk),'Signed complete-package net delivered cost premium.')
        b['premium_pct']=calc(prefix+'.premium_pct','%',E('mul',100,E('div',E('sub','c','b'),'b')),dict(c=ck,b=bk),'Percent complete-pack cost premium with shared baseline denominator.')
        for name,pkey in [('baseline_annual_spend',bk),('candidate_annual_spend',ck),('annual_incremental_cost',b['incremental_cost'])]:
            b[name]=calc(prefix+'.'+name,'RON/year',E('mul','p','n'),dict(p=pkey,n=annual),'Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners.')
        for name,pkey in [('baseline_annual_virgin',b['baseline_virgin']),('candidate_annual_virgin',b['candidate_virgin']),('annual_virgin_avoided',b['reduction_g'])]:
            b[name]=calc(prefix+'.'+name,'kg/year',E('div',E('mul','p','n'),1000),dict(p=pkey,n=annual),'Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides.')
        red=FIELDS[b['reduction_g']]['value'];inc=FIELDS[b['incremental_cost']]['value']
        b['cost_per_kg_avoided']=dict(unit='RON/kg',formula='incremental_cost_RON_per_pack / (positive_reduction_g_per_pack /1000); annual volume cancels',source_calculations=[FIELDS[b[k]]['calculation_id'] for k in ('incremental_cost','reduction_g')],state='ESTIMATED',confidence='VERY_LOW')
        if red['central']<=0:b['cost_per_kg_avoided'].update(low=None,central=None,high=None,display='Not applicable — no virgin plastic avoided in the central scenario; no finite whole-domain ratio across non-positive reductions.')
        elif red['low']<=0:b['cost_per_kg_avoided'].update(low=None,central=round(1000*inc['central']/red['central'],8),high=None,display='Central ratio only; uncertainty crosses zero avoided mass, so no finite full-domain LOW/HIGH. Near zero positive reduction the ratio is unbounded.')
        else:
            vals=[1000*i/r for i in (inc['low'],inc['high']) for r in (red['low'],red['high'])]
            b['cost_per_kg_avoided'].update(low=min(vals),central=1000*inc['central']/red['central'],high=max(vals),display='Positive-avoidance domain ratio.')

# Source ledger and immutable base references.
sources=json.loads((OUT/'new-sources.json').read_text(encoding='utf-8'))
for s in sources:
    s.update(accessed_at='2026-09-27',geographical_relevance='Romania' if s['source_id'] in ('ASTRA-S01','ASTRA-S04','ASTRA-S06','ASTRA-S21','ASTRA-S23') else 'International technical/commercial analogue; transfer limited to stated scope',access_status='DIRECT_HTTP_READ' if s['source_id'] in ('ASTRA-S17','ASTRA-S18') else 'SEARCH_INDEX_ONLY_DIRECT_OPEN_FAILED' if s['source_id']=='ASTRA-S21' else 'OPENED_PUBLIC_DOCUMENT')
sources.append(dict(source_id='ASTRA-TASK',organization='User / ASTRA-R2 research author',title='Authorized bounded engineering and market demo scenario',url='user-attachment:58f952f0-7057-4e7a-9e17-c17679618c3d',scope='Explicit design assumptions only',published_or_version_date='2026-09-27',accessed_at='2026-09-27',findings='Authorizes transparent LOW/CENTRAL/HIGH modeling without fabricating measured, supplier, provider or approval claims.',geographical_relevance='Romanian demonstration',limitations='Not external empirical evidence. Inputs citing only this record are assumptions, not researched market facts.'))
used={s for c in CALCS for s in c['source_ids']}
for s in D['sources']:
    if s['source_id'] in used:
        s=copy.deepcopy(s);s.setdefault('organization',s['title'].split(' ')[0]);s['geographical_relevance']='Inherited HTF-03 scope; see limitations';s['access_status']='INHERITED_2026_09_26_RECORD_UNLESS_NEW_SOURCE_SUPERSEDES';sources.append(s)
dump('source-ledger.json',sources)
dump('synthesis-ledger.json',CALCS)
dump('demo-model.json',dict(artifact_kind='ASTRA-R2 research handoff; NOT an API schema or new runtime enum',base_sha=BASE,base_canonical_sha256=hashlib.sha256(CP.read_bytes()).hexdigest(),interval_policy='Engineering sensitivity bounds; endpoints are independent corners, not two simultaneous network worlds. Central is deterministic. No probability claims.',accounting_boundary='C1/C5 use separately labeled existing all-liner/all-film accounting scenarios with explicit added coating budget. Actual polymer measurements remain unknown; do not relabel scenario as exact plastic.',fields=FIELDS,entities=MODEL,business_cases=BUSINESS,source_registry='source-ledger.json',original_calculation_registry='../htf-03/HTF-03-canonical-packaging-dataset.json#/calculations'))

# Executable, conservative canonical proposal: numeric model slots only, no thermal/gates/procurement observations overwritten.
# C1/C5 accounting-budget projection is kept in sidecar, because legacy scenario names encode different BOM assumptions.
ops=[];mapping=[]
def clean(f):
    f=copy.deepcopy(f);f.pop('demo_safe_sentence',None);return f
for i,c in enumerate(D['candidates'][:5]):
    cid=c['candidate_id']
    for k,fkey in MODEL[cid]['metrics'].items():
        if cid in ('C1','C5') and k in ('plastic_mass_g','virgin_plastic_mass_g'):continue
        ops.append(dict(op='add',path=f'/candidates/{i}/model_metrics/{k}',value=clean(FIELDS[fkey])))
for i,c in enumerate(D['configurations']):
    cid=c['configuration_id'];m=copy.deepcopy(c.get('model_metrics') or {})
    m.update({k:clean(FIELDS[fkey]) for k,fkey in MODEL[cid]['metrics'].items()})
    ops.append(dict(op='add',path=f'/configurations/{i}/model_metrics',value=m))
for c in CALCS:ops.append(dict(op='add',path='/calculations/-',value=c))
for s in sources:
    if s['source_id'].startswith('ASTRA-'):ops.append(dict(op='add',path='/sources/-',value=s))
for cid,r in MODEL.items():
    for category in ('metrics','components','geometry','thermal','procurement','viewing'):
        for slot,key in r[category].items():
            if isinstance(key,str) and key in FIELDS:mapping.append(dict(entity_id=cid,surface=category,field=slot,model_field=key,calculation_id=FIELDS[key]['calculation_id'],sidecar_pointer='/fields/'+key,implementation='Existing EvidenceField projection where slot exists; otherwise additive design/API acceptance. Preserve source and modeled record separately.'))
dump('canonical-patch-proposal.json',dict(format='RFC6902 operations in envelope; proposal only',base_sha=BASE,base_file=CP.relative_to(ROOT).as_posix(),base_sha256=hashlib.sha256(CP.read_bytes()).hexdigest(),operations=ops,limitations='Do not apply alone as zero-gap runtime delivery. C1/C5 budget scenario, normalized cost, fit, annuals and thermal test designs need explicit modeled projection from demo-model.json. Existing scenario tables remain historical until reconciled; see implementation map. No gates, identities, observed facts, or virgin definition changed.'))
dump('projection-map.json',mapping)

def apply(doc,op):
    parts=op['path'].strip('/').split('/');node=doc
    for p in parts[:-1]:node=node[int(p)] if isinstance(node,list) else node[p]
    k=parts[-1]
    if isinstance(node,list):node.append(copy.deepcopy(op['value'])) if k=='-' else node.__setitem__(int(k),copy.deepcopy(op['value']))
    else:node[k]=copy.deepcopy(op['value'])
proposed=copy.deepcopy(D)
for op in ops:apply(proposed,op)
(OUT/'proposal').mkdir(exist_ok=True)
dump('proposal/HTF-03-canonical-packaging-dataset.json',proposed)

# Exact inventory closure mapping; split current widget metrics from extension inventory.
rows=json.loads((OUT/'gap-inventory-before.json').read_text(encoding='utf-8'))
for row in rows:
    cid=row['entity'];field=row['field'];target=None
    if cid=='B1':cid='B1-ESTIMATED'
    if cid=='DEMO':target={'annual_packages':'NETWORK.annual_packages','participating_locations':'NETWORK.participating_locations','daily_packages':'NETWORK.daily_packages','operating_days':'NETWORK.operating_days','hot_hold_temperature':'WORKFLOW.cabinet_temperature','oven_duration':'WORKFLOW.oven_duration'}[field]
    elif field in ('total_package_mass_g','plastic_mass_g','virgin_plastic_mass_g','recycled_material_fraction','renewable_material_fraction'):target=MODEL[cid]['metrics'][field]
    elif field in ('romania_unit_price','complete_cost'):target=cid+'.cost_net'
    elif field in ('industrial_moq','order_unit','lead_time'):target=MODEL[cid]['procurement'][field]
    elif field=='complete_mass':target=MODEL[cid]['metrics']['total_package_mass_g']
    elif field=='virgin_fraction':
        target=calc(cid+'.virgin_fraction_inventory','fraction',E('div','v','p'),dict(v=MODEL[cid]['metrics']['virgin_plastic_mass_g'],p=MODEL[cid]['metrics']['plastic_mass_g']),'Virgin fraction 1 in modeled no-PCR baseline scenario.') if cid=='B3' else 'B1-ESTIMATED.virgin_fraction'
        # same virgin and plastic mass are identical variables; ratio is exactly one by construction
        if cid=='B3':target=a('B3.virgin_fraction',1,'fraction','No recycled PP credit in selected B3 scenario; identical virgin and polymer mass, ratio exactly 1.')
    elif field=='capacity_ml':target=MODEL[cid]['geometry']['capacity_ml']
    elif field=='dimensions':target=MODEL[cid]['geometry']['usable_length_mm']
    elif '.reduction_' in field:
        suffix=field.rsplit('.',1)[1];base='B3' if 'B3' in field else 'B1-ESTIMATED'
        # Parent C6 legacy widget must bind configuration; central default route is RO-P, not implicit aggregate.
        target=('C6-RO-P' if cid=='C6' else cid)+'.vs.'+base+'.'+suffix
    assert target in FIELDS,(cid,field,target)
    f=FIELDS[target];row.update(target=target,final_state=f['state'],final_values=f['value'],calculation_id=f['calculation_id'],source_ids=f['source_ids'],synthesis=f['qualifier'],closure_scope='Proposed modeled projection only; current runtime unchanged')
dump('gap-matrix-after.json',rows)
# Rewrite after inventory-only fields were registered.
dump('synthesis-ledger.json',CALCS)
model=json.loads((OUT/'demo-model.json').read_text(encoding='utf-8'));model['fields']=FIELDS;dump('demo-model.json',model)
counts=collections.Counter(g['status'] for row in D['product_candidate_gates'] for g in row['gates'].values())
report=dict(base_sha=BASE,inventory_rows=len(rows),broad_missing_before=sum(r['missing'] for r in rows),current_widget_missing_before=sum(r['missing'] and 'API catalogue' not in r['surface'] and 'Required narrative' not in r['surface'] for r in rows),proposed_avoidable_gaps=sum(r['final_values'] is None for r in rows),current_runtime_changed=False,gate_cells=dict(counts),gate_rows=len(D['product_candidate_gates']),ratio_exceptions={k:v['cost_per_kg_avoided'] for k,v in BUSINESS.items() if v['cost_per_kg_avoided']['low'] is None},calculation_count=len(CALCS),field_count=len(FIELDS),projection_mapping_count=len(mapping))
dump('verification-summary.json',report)
print(json.dumps(report,ensure_ascii=False,indent=2))

lines=['# ASTRA-R2 — completed gap matrix','','A numeric projection closes estimable quantities; provider unknowns and safety gates are retained. Structured dimensions link to the full geometry group in demo-model.json, not just the representative length below.','','| ID | Entity / field | Before | Final state | LOW / CENTRAL / HIGH | Calculation / evidence |','|---|---|---|---|---|---|']
for r in rows:lines.append(f"| {r['id']} | {r['entity']} / {r['field']} | {r['current_state']} | {r['final_state']} | {rr(r['target'])} | {r['calculation_id']}; {', '.join(r['source_ids'])} |")
(OUT/'02-gap-matrix-after.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
lines=['# ASTRA-R2 — calculation ledger','','All values are engineering bounds, not statistical confidence intervals. Complete expressions, typed input units/states, provenance, falsification conditions and safe central-value sentences are in synthesis-ledger.json / demo-model.json. ASTRA-TASK means a declared author assumption, never external proof.','','| ID | Target | LOW / CENTRAL / HIGH | Unit | State | Dominant uncertainty / central rationale |','|---|---|---|---|---|---|']
for c in CALCS:lines.append(f"| {c['calculation_id']} | {c['field']} | {rr(c['field'])} | {c['unit']} | {c['state']} | {c['sensitivity'].replace('|','/')} |")
(OUT/'03-synthesis-ledger.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
lines=['# ASTRA-R2 — source ledger','','New sources were researched on 2026-09-27; old S/R identifiers retain their inherited scope/date. No unread source is represented as fresh evidence. ANPC S21 is explicitly index-only and is not used to certify the workflow.','','| ID / organization | Source | Date / access | Exact supported input and limitation |','|---|---|---|---|']
for s in sources:lines.append(f"| {s['source_id']} / {s.get('organization','')} | [{s['title']}]({s['url']}) | {s.get('published_or_version_date','undated')} / {s.get('accessed_at')} / {s.get('access_status','user request')} | {s.get('findings','')} Limit: {s.get('limitations','')} |")
(OUT/'04-source-ledger.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
