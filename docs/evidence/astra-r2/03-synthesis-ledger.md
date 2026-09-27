# ASTRA-R2 — calculation ledger

All values are engineering bounds, not statistical confidence intervals. Complete expressions, typed input units/states, provenance, falsification conditions and safe central-value sentences are in synthesis-ledger.json / demo-model.json. ASTRA-TASK means a declared author assumption, never external proof.

| ID | Target | LOW / CENTRAL / HIGH | Unit | State | Dominant uncertainty / central rationale |
|---|---|---|---|---|---|
| ASTRA-E001 | FX.RON_per_EUR | 5.0000 / 5.2765 / 5.5000 | RON/EUR | ASSUMED | Central ECB 2026-09-25; outer bounds are a commercial FX stress scenario. |
| ASTRA-E002 | FX.DKK_per_EUR | 7.4755 / 7.4755 / 7.4755 | DKK/EUR | ASSUMED | Observed reference, held fixed for currency cross. |
| ASTRA-E003 | TAX.gross_factor | 1.2100 / 1.2100 / 1.2100 | factor | ASSUMED | Packaging purchased separately; recoverable VAT excluded in net costs. |
| ASTRA-E004 | COMMON.ancillary_g | 0.1000 / 0.3000 / 0.7000 | g | ASSUMED | Closure/seam/label allowance; all counted conservatively as virgin polymer, not omitted. |
| ASTRA-E005 | COMMON.bag_area_m2 | 0.1837 / 0.1925 / 0.2100 | m2 | ESTIMATED | Inherited HTF-03 calculation E001; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E006 | B1-ESTIMATED.total_package_mass_g | 2.5917 / 6.4985 / 12.4600 | g | ESTIMATED | Inherited HTF-03 calculation E002; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E007 | B1-ESTIMATED.plastic_mass_g | 2.5917 / 6.4985 / 12.4600 | g | ESTIMATED | Explicit modeled complete-pack projection; not a measured supplier or Profi value. |
| ASTRA-E008 | B1-ESTIMATED.virgin_plastic_mass_g | 2.5917 / 6.4985 / 12.4600 | g | ESTIMATED | Explicit modeled complete-pack projection; not a measured supplier or Profi value. |
| ASTRA-E009 | B1-ESTIMATED.virgin_fraction | 1.0000 / 1.0000 / 1.0000 | fraction | OBSERVED_VERIFIED | Inherited from provider/mentor observation: incumbent high-temperature plastic packaging in active store use is 100% virgin fossil plastic (virgin_plastic_fraction = 1.0). Exact polymer identity remains unobserved; PET/PA-like properties belong to the separate engineering mass/cost scenario. |
| ASTRA-E010 | B1-ESTIMATED.recycled_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Modeled baseline assumption: zero recycled or renewable mass credit in incumbent plastic bag scenario; not null imputation. |
| ASTRA-E011 | B1-ESTIMATED.renewable_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Modeled baseline assumption: zero recycled or renewable mass credit in incumbent plastic bag scenario; not null imputation. |
| ASTRA-E012 | PRICE.Barleta_net | 0.3060 / 0.3060 / 0.3060 | RON/pack | ASSUMED | Historical B3 370.26 RON/1000 VAT-included /1.21; unchanged inherited price, not a refreshed quote. |
| ASTRA-E013 | PRICE.SP31_net | 1.0400 / 1.0400 / 1.0400 | RON/pack | ASSUMED | Romanian resealable rotisserie price excluding VAT, 100-unit selling pack; different construction from B1. |
| ASTRA-E014 | B1-ESTIMATED.body_cost_net | 0.3060 / 0.6730 / 1.0400 | RON/pack | ESTIMATED | Midpoint of dissimilar Romanian complete-bag price anchors; broad analogue envelope, not actual Profi procurement. |
| ASTRA-E015 | COMMON.closure_cost_net | 0.0100 / 0.0300 / 0.0800 | RON/pack | ASSUMED | Separate closure/label purchasing allowance, conservatively additional even if comparator includes reseal. |
| ASTRA-E016 | BASELINE.freight_net | 0.0100 / 0.0200 / 0.0800 | RON/pack | ASSUMED | Consolidated domestic order freight allocation; scenario rather than free-delivery entitlement. |
| ASTRA-E017 | B1-ESTIMATED.cost_net | 0.3260 / 0.7230 / 1.2000 | RON/pack | ESTIMATED | Complete package Romania-delivered market model, recoverable VAT excluded; not Profi price. |
| ASTRA-E018 | NETWORK.stores | 1,760.0000 / 1,760.0000 / 1,760.0000 | locations | ASSUMED | Conservative scenario anchor from more-than-1760 public counter; not exact store census. |
| ASTRA-E019 | NETWORK.penetration | 0.1000 / 0.2500 / 0.4000 | fraction | ASSUMED | Bounded hot-deli participation assumption; no public format-specific count found. |
| ASTRA-E020 | NETWORK.participating_locations | 176.0000 / 440.0000 / 704.0000 | locations | ESTIMATED | Scenario store count times assumed participation. |
| ASTRA-E021 | NETWORK.operating_days | 330.0000 / 360.0000 / 365.0000 | days/year | ASSUMED | Calendar operating scenario; not observed store opening record. |
| ASTRA-E022 | NETWORK.whole_daily | 10.0000 / 20.0000 / 40.0000 | packs/location/day | ASSUMED | Central one 20-bird equipment batch/day; capacity analogue is not sales or installed Profi equipment. |
| ASTRA-E023 | NETWORK.portions_daily | 20.0000 / 40.0000 / 80.0000 | packs/location/day | ASSUMED | Two portion packs per modeled whole-bird pack; explicit independent product-mix scenario, not yields from the same birds. |
| ASTRA-E024 | NETWORK.whole_annual | 580,800.0000 / 3,168,000.0000 / 10,278,400.0000 | packs/year | ESTIMATED | Network scenario; daily throughput and participation dominate uncertainty. |
| ASTRA-E025 | NETWORK.portions_annual | 1,161,600.0000 / 6,336,000.0000 / 20,556,800.0000 | packs/year | ESTIMATED | Network scenario; daily throughput and participation dominate uncertainty. |
| ASTRA-E026 | NETWORK.annual_packages | 1,742,400.0000 / 9,504,000.0000 / 30,835,200.0000 | packs/year | ESTIMATED | Whole and portions are disjoint demand streams; fallback packs replace a stream and must not be added. |
| ASTRA-E027 | NETWORK.daily_packages | 30.0000 / 60.0000 / 120.0000 | packs/location/day | ESTIMATED | Combined disjoint whole and portions daily scenario. |
| ASTRA-E028 | WORKFLOW.cabinet_temperature | 85.0000 / 90.0000 / 95.0000 | degC | ASSUMED | MODELED RETAIL HOT-HOLD CONDITION: cabinet setpoint/stress range, not food core temperature or supplier qualification. |
| ASTRA-E029 | WORKFLOW.food_fill_temperature | 82.0000 / 85.0000 / 88.0000 | degC | ASSUMED | Hot-fill practice analogue; cooked chicken entering merchandiser. |
| ASTRA-E030 | WORKFLOW.package_contact_temperature | 70.0000 / 85.0000 / 95.0000 | degC | ASSUMED | Designed contact-temperature stress envelope; actual wall/contact temperature must be instrumented. |
| ASTRA-E031 | WORKFLOW.hold_minutes | 360.0000 / 360.0000 / 360.0000 | min | ASSUMED | Fixed six-hour task contact duration, not a safety permission. |
| ASTRA-E032 | WORKFLOW.oven_temperature | 250.0000 / 250.0000 / 250.0000 | degC | ASSUMED | Literal challenge screening condition; does not establish capability. |
| ASTRA-E033 | WORKFLOW.oven_duration | 30.0000 / 60.0000 / 90.0000 | min | ASSUMED | Explicit missing-duration stress design; central 60 minutes. Official exposure duration remains unconfirmed. |
| ASTRA-E034 | FOOD.bird_mass | 1.0000 / 1.2000 / 1.4000 | kg | ASSUMED | Cooked whole-bird trial envelope; central commercial prepared-food analogue. |
| ASTRA-E035 | FOOD.bird_length | 200.0000 / 220.0000 / 240.0000 | mm | ASSUMED | Assumed occupied ellipsoid dimensions for bird fit; not measured from a photo or mass-to-density inference. |
| ASTRA-E036 | FOOD.bird_width | 140.0000 / 150.0000 / 170.0000 | mm | ASSUMED | Assumed occupied ellipsoid dimensions for bird fit; not measured from a photo or mass-to-density inference. |
| ASTRA-E037 | FOOD.bird_height | 100.0000 / 110.0000 / 130.0000 | mm | ASSUMED | Assumed occupied ellipsoid dimensions for bird fit; not measured from a photo or mass-to-density inference. |
| ASTRA-E038 | FOOD.bird_volume | 1,466.0766 / 1,900.6636 / 2,777.1679 | ml | ESTIMATED | Ellipsoid occupied envelope, including air between limbs; physical pack trial can falsify dimensions. |
| ASTRA-E039 | FOOD.whole_free_liquid | 30.0000 / 50.0000 / 80.0000 | ml | ASSUMED | Poultry fat/juice stress allowance; added to occupied volume, not a measured drainage yield. |
| ASTRA-E040 | FOOD.portion_mass | 0.3000 / 0.5000 / 0.7000 | kg | ASSUMED | P2-P4 mixed deli portion design scenario, no claimed sales mix. |
| ASTRA-E041 | FOOD.portion_bulk_density | 0.6000 / 0.7500 / 0.9000 | g/ml | ASSUMED | Bulk food including voids; deliberately lower than dense liquid, recipe-specific. |
| ASTRA-E042 | FOOD.portion_volume | 333.3333 / 666.6667 / 1,166.6667 | ml | ESTIMATED | Portion mass divided by assumed bulk density. |
| ASTRA-E043 | FOOD.portion_free_liquid | 10.0000 / 25.0000 / 50.0000 | ml | ASSUMED | Fat/sauce challenge allowance; added to the portion occupied-volume model. |
| ASTRA-E044 | BAG.usable_length | 280.0000 / 300.0000 / 310.0000 | mm | ASSUMED | Deformable oval cross-section scenario for nominal 180+70 by 350 mm bag. Width and depth are not independent rectangular gusset dimensions. |
| ASTRA-E045 | BAG.usable_width | 160.0000 / 180.0000 / 190.0000 | mm | ASSUMED | Deformable oval cross-section scenario for nominal 180+70 by 350 mm bag. Width and depth are not independent rectangular gusset dimensions. |
| ASTRA-E046 | BAG.usable_height | 90.0000 / 120.0000 / 120.0000 | mm | ASSUMED | Deformable oval cross-section scenario for nominal 180+70 by 350 mm bag. Width and depth are not independent rectangular gusset dimensions. |
| ASTRA-E047 | BAG.shape_factor | 0.6000 / 0.7000 / 0.8000 | fraction | ASSUMED | Taper/folds and unfilled end derating of oval cylinder. |
| ASTRA-E048 | BAG.usable_volume | 1,900.0352 / 3,562.5661 / 4,440.9554 | ml | ESTIMATED | Oval cylinder times shape allowance. Circumference must fit 500 mm available lay-flat perimeter; supplier drawing and hot trial required. |
| ASTRA-E049 | BAG.closure_allowance | 40.0000 / 50.0000 / 70.0000 | mm | ESTIMATED | Nominal 350 mm bag length minus usable length. |
| ASTRA-E050 | B2.total_package_mass_g | 2.5917 / 6.4985 / 12.4600 | g | ESTIMATED | B2 all-plastic geometry stress model; not exact SP31 material identification. |
| ASTRA-E051 | B2.plastic_mass_g | 2.5917 / 6.4985 / 12.4600 | g | ESTIMATED | B2 all-plastic geometry stress model; not exact SP31 material identification. |
| ASTRA-E052 | B2.virgin_plastic_mass_g | 2.5917 / 6.4985 / 12.4600 | g | ESTIMATED | B2 all-plastic geometry stress model; not exact SP31 material identification. |
| ASTRA-E053 | B2.recycled_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ESTIMATED | B2 all-plastic geometry stress model; not exact SP31 material identification. |
| ASTRA-E054 | B2.renewable_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ESTIMATED | B2 all-plastic geometry stress model; not exact SP31 material identification. |
| ASTRA-E055 | B2.cost_net | 1.0600 / 1.0900 / 1.2000 | RON/pack | ESTIMATED | Complete Romanian market comparator model; no exact selected B2 SKU claim. |
| ASTRA-E056 | B3.total_package_mass_g | 10.7575 / 11.6575 / 13.3000 | g | ESTIMATED | Inherited HTF-03 calculation E003; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E057 | B3.plastic_mass_g | 3.4075 / 3.9575 / 4.9000 | g | ESTIMATED | Inherited HTF-03 calculation E004; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E058 | B3.virgin_plastic_mass_g | 3.4075 / 3.9575 / 4.9000 | g | ESTIMATED | Inherited HTF-03 calculation E004; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E059 | B3.renewable_material_fraction | 0.6269 / 0.6605 / 0.6840 | fraction | ESTIMATED | Inherited HTF-03 calculation E005; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E060 | B3.recycled_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Virgin paper/PP comparison scenario; no recycled-content credit without BOM. |
| ASTRA-E061 | B3.cost_net | 0.3260 / 0.3560 / 0.4660 | RON/pack | ESTIMATED | Historical body price normalized to net plus closure and domestic delivered allowance. |
| ASTRA-E062 | C1.paper_gsm | 40.0000 / 50.0000 / 60.0000 | g/m2 | ASSUMED | Bag-paper analogue; 50 gsm central engineering point. |
| ASTRA-E063 | C1.window_area | 0.0060 / 0.0120 / 0.0200 | m2 | ASSUMED | Designed visible cutout, central 100 by 120 mm; not exact Gaia drawing. |
| ASTRA-E064 | C1.liner_gsm | 43.0000 / 54.0000 / 65.0000 | g/m2 | ASSUMED | NatureFlex grade mass analogue; central intermediate design gauge. Exact Gaia film unspecified. |
| ASTRA-E065 | C1.coating_gsm | 0.5000 / 2.0000 / 5.0000 | g/m2 | ASSUMED | Effective coated-area allowance. Central 2 gsm is consistent in order with ADCOTE 1.95-4.07 gsm using assumed 3000 ft2/ream; not Gaia chemistry. |
| ASTRA-E066 | C1.paper_g | 6.5500 / 9.0250 / 12.2400 | g | ESTIMATED | Paper after removed viewing cutout; liner spans full area and provides the window without double counting. |
| ASTRA-E067 | C1.liner_g | 7.9013 / 10.3950 / 13.6500 | g | ESTIMATED | Full internal liner including window-covered region. |
| ASTRA-E068 | C1.coating_g | 0.0919 / 0.3850 / 1.0500 | g | ESTIMATED | Nonzero additional coating/adhesive budget, even though liner may already contain coatings; conservative possible overlap. |
| ASTRA-E069 | C1.total_package_mass_g | 14.6431 / 20.1050 / 27.6400 | g | ESTIMATED | Full Gaia-format design: cutout-subtracted paper + full liner + explicit extra coating + closure. |
| ASTRA-E070 | C1.plastic_mass_g | 8.0931 / 11.0800 / 15.4000 | g | ESTIMATED | Existing conditional all-liner-counted budget plus coating. Regenerated cellulose is not declared fossil polymer; display explicitly as accounting budget, never exact plastic. |
| ASTRA-E071 | C1.virgin_plastic_mass_g | 8.0931 / 11.0800 / 15.4000 | g | ESTIMATED | No recycled credit in conservative all-liner-counted scenario; virgin definition unchanged. |
| ASTRA-E072 | C1.recycled_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Virgin paper/film design assumption; zero recycled credit, not a supplier observation. |
| ASTRA-E073 | C1.film_renewable_share | 0.8500 / 0.9000 / 0.9500 | fraction | ASSUMED | Bounded regenerated-cellulose mass share of coated film; not a biobased-carbon certificate. |
| ASTRA-E074 | C1.renewable_material_fraction | 0.8188 / 0.9142 / 0.9711 | fraction | ESTIMATED | Renewable mass estimate; overlaps conservative plastic accounting budget because that budget counts all cellulose liner. |
| ASTRA-E075 | PRICE.film_EUR_m2 | 1.8030 / 1.9181 / 2.3208 | EUR/m2 | ASSUMED | Biopack area-price analogue from 185 mm x 500 m reel. VAT unconfirmed: central treats listing as net; high adds 21% contingency, low bulk tier. Does not select this narrow film. |
| ASTRA-E076 | PRICE.paper_EUR_kg | 1.5000 / 2.5000 / 4.0000 | EUR/kg | ASSUMED | Unquoted converted paper input scenario, not a supplier price; conversion cost modeled separately. |
| ASTRA-E077 | PRICE.adhesive_EUR_kg | 3.0000 / 5.0000 / 10.0000 | EUR/kg | ASSUMED | Explicit unquoted adhesive procurement scenario; chemistry and small-lot premium dominate. |
| ASTRA-E078 | C1.factory_film_factor | 0.3500 / 0.5000 / 1.0000 | factor | ASSUMED | Bulk converter versus small-reel price scenario, not a negotiated discount. |
| ASTRA-E079 | C1.paper_cost | 0.0491 / 0.1191 / 0.2693 | RON/pack | ESTIMATED | Paper input mass times explicit EUR/kg scenario. |
| ASTRA-E080 | C1.film_cost | 0.5798 / 0.9741 / 2.6806 | RON/pack | ESTIMATED | Full liner area times analogue film price, assumed converter quantity factor and FX. |
| ASTRA-E081 | C1.coating_cost | 0.0014 / 0.0102 / 0.0578 | RON/pack | ESTIMATED | Explicit coating material cost; conversion charged separately. |
| ASTRA-E082 | C1.conversion_cost | 0.1000 / 0.2500 / 0.5000 | RON/pack | ASSUMED | Bag/window cutting, lamination and seams conversion scenario; excludes food-packing labour and capital. |
| ASTRA-E083 | C1.freight_cost | 0.0300 / 0.1000 / 0.3000 | RON/pack | ASSUMED | Consolidated Italy-to-Romania import freight allocation; no carrier quote. |
| ASTRA-E084 | C1.cost_net | 0.7703 / 1.4833 / 3.8876 | RON/pack | ESTIMATED | Complete converted bag delivered Romania; net VAT; unquoted design market model. |
| ASTRA-E085 | C2.total_package_mass_g | 4.2527 / 5.7381 / 10.1920 | g | ESTIMATED | Inherited HTF-03 calculation E009; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E086 | C2.plastic_mass_g | 4.2527 / 5.7381 / 10.1920 | g | ESTIMATED | Explicit modeled complete-pack projection; not a measured supplier or Profi value. |
| ASTRA-E087 | C2.virgin_plastic_mass_g | 4.2527 / 5.7381 / 10.1920 | g | ESTIMATED | Explicit modeled complete-pack projection; not a measured supplier or Profi value. |
| ASTRA-E088 | C2.recycled_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Virgin fossil-polymer construction scenario; no recycled or renewable credit claimed. |
| ASTRA-E089 | C2.renewable_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Virgin fossil-polymer construction scenario; no recycled or renewable credit claimed. |
| ASTRA-E090 | C2.price_factor | 0.7000 / 1.2000 / 2.0000 | factor | ASSUMED | Specialty oven-bag market multiple of Romanian SP31 price; different heat dossier and construction, unquoted. |
| ASTRA-E091 | C2.cost_net | 0.7680 / 1.3780 / 2.4600 | RON/pack | ESTIMATED | Complete bag + closure + delivered import allowance; no exact supplier quote. |
| ASTRA-E092 | C3.gauge | 50.8000 / 63.5000 / 76.2000 | um | ASSUMED | 2/2.5/3 mil same-family historical gauge analogue; not exact current EMEA gauge. |
| ASTRA-E093 | C3.density | 1.1000 / 1.2000 / 1.4000 | g/cm3 | ASSUMED | Assumed multilayer density; PA/PET-like envelope, not disclosed film composition. |
| ASTRA-E094 | C3.total_package_mass_g | 10.3680 / 14.9685 / 23.1028 | g | ESTIMATED | Full flexible package geometry plus closure; gauge analogue dominates. |
| ASTRA-E095 | C3.plastic_mass_g | 10.3680 / 14.9685 / 23.1028 | g | ESTIMATED | Explicit modeled complete-pack projection; not a measured supplier or Profi value. |
| ASTRA-E096 | C3.virgin_plastic_mass_g | 10.3680 / 14.9685 / 23.1028 | g | ESTIMATED | Explicit modeled complete-pack projection; not a measured supplier or Profi value. |
| ASTRA-E097 | C3.recycled_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Virgin fossil-polymer construction scenario; no recycled or renewable credit claimed. |
| ASTRA-E098 | C3.renewable_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Virgin fossil-polymer construction scenario; no recycled or renewable credit claimed. |
| ASTRA-E099 | C3.price_factor | 1.0000 / 1.6000 / 2.5000 | factor | ASSUMED | Specialty oven-bag market multiple of Romanian SP31 price; different heat dossier and construction, unquoted. |
| ASTRA-E100 | C3.cost_net | 1.0800 / 1.7940 / 2.9800 | RON/pack | ESTIMATED | Complete bag + closure + delivered import allowance; no exact supplier quote. |
| ASTRA-E101 | C4.lid_g | 12.2898 / 21.4584 / 37.4546 | g | ESTIMATED | Inherited HTF-03 calculation E011; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E102 | C4.body_g | 51.5600 / 51.5600 / 51.5600 | g | ASSUMED | Inherited exact historical body listing, not fresh confirmation of currently orderable SKU. |
| ASTRA-E103 | C4.total_package_mass_g | 63.9498 / 73.3184 / 89.7146 | g | ESTIMATED | Inherited HTF-03 calculation E012; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E104 | C4.plastic_mass_g | 63.9498 / 73.3184 / 89.7146 | g | ESTIMATED | Inherited HTF-03 calculation E012; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E105 | C4.virgin_plastic_mass_g | 25.2798 / 36.1952 / 54.1382 | g | ESTIMATED | Inherited HTF-03 calculation E013; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E106 | C4.recycled_material_fraction | 0.3966 / 0.5063 / 0.6047 | fraction | ESTIMATED | Inherited HTF-03 calculation E014; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E107 | C4.renewable_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Fossil PET construction; PCR is recycled, not renewable mass. |
| ASTRA-E108 | C4.body_EUR | 0.2000 / 0.3500 / 0.6000 | EUR/pack | ASSUMED | Explicit replacement-order price scenario for body, because exact historic body SKU is inactive; no identity substitution authorized. |
| ASTRA-E109 | C4.body_cost | 1.0000 / 1.8468 / 3.3000 | RON/pack | ESTIMATED | Body price assumption converted to RON. |
| ASTRA-E110 | C4.lid_cost | 0.9421 / 1.2428 / 1.5675 | RON/pack | ESTIMATED | Historical 655 DKK/372 clear lids; VAT ambiguity bracketed, central treats list as net. |
| ASTRA-E111 | C4.cost_net | 1.9821 / 3.2196 / 5.2475 | RON/pack | ESTIMATED | Complete body/lid landed scenario; no availability or fit approval. |
| ASTRA-E112 | C5.body_g | 21.1500 / 23.5000 / 25.8500 | g | ASSUMED | Inherited same-family 23.5 g body analogue +/-10%; SI-14 finished body still unweighed. |
| ASTRA-E113 | C5.body_coating_fraction | 0.0100 / 0.0300 / 0.0500 | fraction | ASSUMED | Nonzero polymer/adhesive reserve INSIDE finished body weight, not added again; manufacturing chemistry unverified. |
| ASTRA-E114 | C5.body_coating_g | 0.2115 / 0.7050 / 1.2925 | g | ESTIMATED | Hidden coating reserve allocated within body mass. |
| ASTRA-E115 | C5.film_gsm | 42.9185 / 64.5161 / 70.0000 | g/m2 | ASSUMED | Transparent cellulose-film design: NVS30/NVS45 mass analogues, central 45 um; no thermal suitability transfer. |
| ASTRA-E116 | C5.trim_factor | 1.0500 / 1.1000 / 1.2000 | factor | ASSUMED | Retained seal-film flange/trim relative to 190 x 247 mm outside rectangle; scrap excluded from pack mass. |
| ASTRA-E117 | C5.film_g | 2.1149 / 3.3305 / 3.9421 | g | ESTIMATED | Full external rim covered plus retained trim; food aperture alone would undercount film. |
| ASTRA-E118 | C5.total_package_mass_g | 23.3649 / 27.1305 / 30.4921 | g | ESTIMATED | Complete tray + retained film + label; coating already inside body. |
| ASTRA-E119 | C5.plastic_mass_g | 2.4264 / 4.3355 / 5.9346 | g | ESTIMATED | Conservative all-film accounting budget plus explicit body coating and ancillary, not a measured plastic BOM. |
| ASTRA-E120 | C5.virgin_plastic_mass_g | 2.4264 / 4.3355 / 5.9346 | g | ESTIMATED | No recycled credit in all-film accounting scenario. |
| ASTRA-E121 | C5.recycled_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Virgin fibre/film scenario; no unverified recycled-content credit. |
| ASTRA-E122 | C5.renewable_material_fraction | 0.9089 / 0.9507 / 0.9835 | fraction | ESTIMATED | Cellulose body minus coating reserve + estimated cellulose share of film; mass-based, not carbon certification. |
| ASTRA-E123 | C5.body_cost | 1.2105 / 1.7033 / 2.1305 | RON/pack | ESTIMATED | Mixpack body-only 251.79 EUR/780; VAT unknown. Central conservatively treats as net; outer VAT/quantity/price scenario. |
| ASTRA-E124 | C5.film_width | 0.2100 / 0.2100 / 0.2100 | m | ASSUMED | Designed minimum 210 mm roll covers 190 mm outside rim; Weber 215 mm supports practical width. Verify jaw margins. |
| ASTRA-E125 | C5.roll_pitch | 0.2570 / 0.2670 / 0.2770 | m | ASSUMED | 247 mm tray length plus 10/20/30 mm web pitch waste; consumed reel, not retained pack film. |
| ASTRA-E126 | C5.consumed_film_area | 0.0540 / 0.0561 / 0.0582 | m2 | ESTIMATED | Charged reel footprint includes cutting waste; cannot buy 185 mm roll for a 190 mm tray. |
| ASTRA-E127 | C5.grade_price_factor | 1.0000 / 1.2500 / 2.0000 | factor | ASSUMED | Unquoted compatible high-temperature grade premium over commercial film area-price analogue; no selected grade or thermal transfer. |
| ASTRA-E128 | C5.film_cost | 0.4865 / 0.7093 / 1.4850 | RON/pack | ESTIMATED | Consumed web area times market analogue with designed compatible-grade premium. |
| ASTRA-E129 | C5.conversion_cost | 0.0300 / 0.0800 / 0.1500 | RON/pack | ASSUMED | Seal consumables/conversion allowance; excludes labour, sealer capital and energy. |
| ASTRA-E130 | C5.freight_cost | 0.0500 / 0.1500 / 0.4000 | RON/pack | ASSUMED | EU consolidated body and film import to Romania; allocation scenario, not carrier quote. |
| ASTRA-E131 | C5.cost_net | 1.7871 / 2.6726 / 4.2456 | RON/pack | ESTIMATED | Complete SI-14/compatible-film delivered design cost, net VAT. |
| ASTRA-E132 | C6-RO-P.body_g | 15.5597 / 24.6980 / 35.3181 | g | ESTIMATED | Inherited HTF-03 calculation E022; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E133 | C6-RO-P.lid_g | 9.1067 / 18.9035 / 38.2368 | g | ESTIMATED | Inherited HTF-03 calculation E023; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E134 | C6-RO-P.total_package_mass_g | 24.7664 / 43.9015 / 74.2549 | g | ESTIMATED | Complete aluminium body + clear closure design + ancillary, all net package mass. |
| ASTRA-E135 | C6-RO-P.plastic_mass_g | 9.2066 / 19.2035 / 38.9368 | g | ESTIMATED | All designed clear lid and ancillary counted as virgin polymer; body alloy is not plastic. |
| ASTRA-E136 | C6-RO-P.virgin_plastic_mass_g | 9.2066 / 19.2035 / 38.9368 | g | ESTIMATED | Explicit modeled complete-pack projection; not a measured supplier or Profi value. |
| ASTRA-E137 | C6-RO-P.body_secondary_fraction | 0.0000 / 0.3800 / 0.6000 | fraction | ASSUMED | Historical Plus Pack average 38% secondary aluminium anchors scenario; no transfer as observed to Romanian bodies. |
| ASTRA-E138 | C6-RO-P.recycled_material_fraction | 0.0000 / 0.2138 / 0.4759 | fraction | ESTIMATED | Whole-package secondary mass fraction, body weighted; no recycled-plastic claim. |
| ASTRA-E139 | C6-RO-P.renewable_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Metal and fossil-polymer design: no renewable mass credit. |
| ASTRA-E140 | C6-RO-P.body_cost | 0.6281 / 0.6281 / 0.7463 | RON/pack | ASSUMED | Romanian gross published body price /1.21; upper ordinary-price/20% stress scenario. |
| ASTRA-E141 | C6-RO-P.lid_cost | 0.3211 / 0.3211 / 0.3853 | RON/pack | ASSUMED | Matched nominated lid listed gross price /1.21, high 20% price stress; fit/material still conditional. |
| ASTRA-E142 | C6-RO-P.cost_net | 0.9692 / 0.9992 / 1.2916 | RON/pack | ESTIMATED | Complete matched/design body plus post-oven lid and label delivered Romania; net VAT; oven step must exclude unqualified lid. |
| ASTRA-E143 | C6-RO-W.base_scale | 0.6500 / 0.7500 / 0.8500 | factor | ASSUMED | Tapered aluminium tray developed-surface approximation using outside dimensions; not an exact drawing. |
| ASTRA-E144 | C6-RO-W.gauge_factor | 0.7000 / 1.0000 / 1.3000 | factor | ASSUMED | Wall-gauge/forming analogue relative to 31 g Plus Pack body; deliberately broad. |
| ASTRA-E145 | C6-RO-W.body_g | 21.8302 / 37.4187 / 57.2441 | g | ESTIMATED | Developed tapered base plus walls divided by reference 0.081209 m2; reference 31 g net body. |
| ASTRA-E146 | C6-RO-W.lid_dome | 0.0100 / 0.0250 / 0.0450 | m | ASSUMED | Post-oven clear-lid design dome; RO-W exact material/shape remains unknown, RO-H exact lid SKU unspecified. |
| ASTRA-E147 | C6-RO-W.lid_g | 13.0437 / 27.9953 / 61.0142 | g | ESTIMATED | PET-like post-oven lid branch only: developed area x wall mm x 1.4 g/cm3 x1000 x rim factor. Does not identify actual WePack lid polymer. |
| ASTRA-E148 | C6-RO-W.total_package_mass_g | 34.9739 / 65.7140 / 118.9584 | g | ESTIMATED | Complete aluminium body + clear closure design + ancillary, all net package mass. |
| ASTRA-E149 | C6-RO-W.plastic_mass_g | 13.1437 / 28.2953 / 61.7142 | g | ESTIMATED | All designed clear lid and ancillary counted as virgin polymer; body alloy is not plastic. |
| ASTRA-E150 | C6-RO-W.virgin_plastic_mass_g | 13.1437 / 28.2953 / 61.7142 | g | ESTIMATED | Explicit modeled complete-pack projection; not a measured supplier or Profi value. |
| ASTRA-E151 | C6-RO-W.body_secondary_fraction | 0.0000 / 0.3800 / 0.6000 | fraction | ASSUMED | Historical Plus Pack average 38% secondary aluminium anchors scenario; no transfer as observed to Romanian bodies. |
| ASTRA-E152 | C6-RO-W.recycled_material_fraction | 0.0000 / 0.2164 / 0.4880 | fraction | ESTIMATED | Whole-package secondary mass fraction, body weighted; no recycled-plastic claim. |
| ASTRA-E153 | C6-RO-W.renewable_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Metal and fossil-polymer design: no renewable mass credit. |
| ASTRA-E154 | C6-RO-W.body_cost | 1.5475 / 1.5475 / 1.8570 | RON/pack | ASSUMED | Romanian gross published body price /1.21; upper ordinary-price/20% stress scenario. |
| ASTRA-E155 | C6-RO-W.lid_cost | 0.3401 / 0.3401 / 0.4081 | RON/pack | ASSUMED | Matched nominated lid listed gross price /1.21, high 20% price stress; fit/material still conditional. |
| ASTRA-E156 | C6-RO-W.cost_net | 1.9076 / 1.9376 / 2.4251 | RON/pack | ESTIMATED | Complete matched/design body plus post-oven lid and label delivered Romania; net VAT; oven step must exclude unqualified lid. |
| ASTRA-E157 | C6-RO-H.base_scale | 0.6500 / 0.7500 / 0.8500 | factor | ASSUMED | Tapered aluminium tray developed-surface approximation using outside dimensions; not an exact drawing. |
| ASTRA-E158 | C6-RO-H.gauge_factor | 0.7000 / 1.0000 / 1.3000 | factor | ASSUMED | Wall-gauge/forming analogue relative to 31 g Plus Pack body; deliberately broad. |
| ASTRA-E159 | C6-RO-H.body_g | 19.6825 / 33.8673 / 51.9953 | g | ESTIMATED | Developed tapered base plus walls divided by reference 0.081209 m2; reference 31 g net body. |
| ASTRA-E160 | C6-RO-H.lid_dome | 0.0100 / 0.0250 / 0.0450 | m | ASSUMED | Post-oven clear-lid design dome; RO-W exact material/shape remains unknown, RO-H exact lid SKU unspecified. |
| ASTRA-E161 | C6-RO-H.lid_g | 12.9489 / 27.8066 / 60.6312 | g | ESTIMATED | PET-like post-oven lid branch only: developed area x wall mm x 1.4 g/cm3 x1000 x rim factor. Does not identify actual WePack lid polymer. |
| ASTRA-E162 | C6-RO-H.total_package_mass_g | 32.7314 / 61.9739 / 113.3265 | g | ESTIMATED | Complete aluminium body + clear closure design + ancillary, all net package mass. |
| ASTRA-E163 | C6-RO-H.plastic_mass_g | 13.0489 / 28.1066 / 61.3312 | g | ESTIMATED | All designed clear lid and ancillary counted as virgin polymer; body alloy is not plastic. |
| ASTRA-E164 | C6-RO-H.virgin_plastic_mass_g | 13.0489 / 28.1066 / 61.3312 | g | ESTIMATED | Explicit modeled complete-pack projection; not a measured supplier or Profi value. |
| ASTRA-E165 | C6-RO-H.body_secondary_fraction | 0.0000 / 0.3800 / 0.6000 | fraction | ASSUMED | Historical Plus Pack average 38% secondary aluminium anchors scenario; no transfer as observed to Romanian bodies. |
| ASTRA-E166 | C6-RO-H.recycled_material_fraction | 0.0000 / 0.2077 / 0.4796 | fraction | ESTIMATED | Whole-package secondary mass fraction, body weighted; no recycled-plastic claim. |
| ASTRA-E167 | C6-RO-H.renewable_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Metal and fossil-polymer design: no renewable mass credit. |
| ASTRA-E168 | C6-RO-H.body_cost | 1.1818 / 1.1818 / 1.4182 | RON/pack | ASSUMED | Romanian gross published body price /1.21; upper ordinary-price/20% stress scenario. |
| ASTRA-E169 | C6-RO-H.lid_cost | 0.4000 / 0.8000 / 1.5000 | RON/pack | ASSUMED | Unquoted clear-lid cost model anchored in local .3885 gross and C4 specialty lid reference; different geometry, not exact SKU quote. |
| ASTRA-E170 | C6-RO-H.cost_net | 1.6018 / 2.0318 / 3.0782 | RON/pack | ESTIMATED | Complete matched/design body plus post-oven lid and label delivered Romania; net VAT; oven step must exclude unqualified lid. |
| ASTRA-E171 | C6-EU.body_g | 27.9000 / 31.0000 / 34.1000 | g | ASSUMED | Exact historical TDS 31 g +/-10% net body; not gross carton. |
| ASTRA-E172 | C6-EU.lid_g | 18.9630 / 33.1100 / 34.9200 | g | ESTIMATED | Inherited HTF-03 calculation E031; original expression and input provenance retained in canonical calculation registry. |
| ASTRA-E173 | C6-EU.total_package_mass_g | 46.9630 / 64.4100 / 69.7200 | g | ESTIMATED | Complete aluminium body + clear closure design + ancillary, all net package mass. |
| ASTRA-E174 | C6-EU.plastic_mass_g | 19.0630 / 33.4100 / 35.6200 | g | ESTIMATED | All designed clear lid and ancillary counted as virgin polymer; body alloy is not plastic. |
| ASTRA-E175 | C6-EU.virgin_plastic_mass_g | 19.0630 / 33.4100 / 35.6200 | g | ESTIMATED | Explicit modeled complete-pack projection; not a measured supplier or Profi value. |
| ASTRA-E176 | C6-EU.body_secondary_fraction | 0.3000 / 0.3800 / 0.5000 | fraction | ASSUMED | Historical Plus Pack average 38% secondary aluminium anchors scenario; no transfer as observed to Romanian bodies. |
| ASTRA-E177 | C6-EU.recycled_material_fraction | 0.1318 / 0.1829 / 0.3207 | fraction | ESTIMATED | Whole-package secondary mass fraction, body weighted; no recycled-plastic claim. |
| ASTRA-E178 | C6-EU.renewable_material_fraction | 0.0000 / 0.0000 / 0.0000 | fraction | ASSUMED | Metal and fossil-polymer design: no renewable mass credit. |
| ASTRA-E179 | C6-EU.body_cost | 3.1851 / 4.2015 / 5.2992 | RON/pack | ESTIMATED | Inherited 595.25 DKK/100 body price, VAT unconfirmed; central treats as net; outer VAT/price allowance. |
| ASTRA-E180 | C6-EU.lid_cost | 0.7000 / 1.3000 / 2.0000 | RON/pack | ASSUMED | Unquoted clear-lid cost model anchored in local .3885 gross and C4 specialty lid reference; different geometry, not exact SKU quote. |
| ASTRA-E181 | C6-EU.cost_net | 3.9451 / 5.6815 / 7.7792 | RON/pack | ESTIMATED | Complete matched/design body plus post-oven lid and label delivered Romania; net VAT; oven step must exclude unqualified lid. |
| ASTRA-E182 | B1-ESTIMATED.outer_width_mm | 180.0000 / 180.0000 / 180.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E183 | B1-ESTIMATED.gusset_mm | 70.0000 / 70.0000 / 70.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E184 | B1-ESTIMATED.outer_length_mm | 350.0000 / 350.0000 / 350.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E185 | B1-ESTIMATED.usable_fill_ml | 1,330.0247 / 2,850.0529 / 3,996.8598 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E186 | B1-ESTIMATED.whole_headroom_length | 40.0000 / 80.0000 / 110.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E187 | B1-ESTIMATED.whole_headroom_width | -10.0000 / 30.0000 / 50.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E188 | B1-ESTIMATED.whole_headroom_height | -40.0000 / 10.0000 / 20.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E189 | B1-ESTIMATED.whole_fill_ratio | 0.3369 / 0.5475 / 1.5037 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E190 | B1-ESTIMATED.portion_fill_ratio | 0.0773 / 0.1941 / 0.6403 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E191 | B1-ESTIMATED.portion_capacity_kg | 0.7680 / 2.1188 / 3.5882 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E192 | B1-ESTIMATED.body_screening_degC | 200.0000 / 210.0000 / 220.0000 | degC | ASSUMED | Exploratory component test-design envelope only; no exact thermal capability established. Do not label this a safe maximum. |
| ASTRA-E193 | B1-ESTIMATED.industrial_moq | 100.0000 / 1,000.0000 / 5,000.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E194 | B1-ESTIMATED.order_unit | 100.0000 / 500.0000 / 1,000.0000 | packs/carton | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E195 | B1-ESTIMATED.pallet_quantity | 10,000.0000 / 20,000.0000 / 40,000.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E196 | B1-ESTIMATED.lead_time | 5.0000 / 14.0000 / 28.0000 | working_days | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E197 | B1-ESTIMATED.cost_gross | 0.3945 / 0.8748 / 1.4520 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E198 | B1-ESTIMATED.visible_area_m2 | 0.0378 / 0.0473 / 0.0536 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E199 | B1-ESTIMATED.visible_fraction | 0.6000 / 0.7500 / 0.8500 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E200 | B1-ESTIMATED.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E201 | B2.outer_width_mm | 180.0000 / 180.0000 / 180.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E202 | B2.gusset_mm | 70.0000 / 70.0000 / 70.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E203 | B2.outer_length_mm | 350.0000 / 350.0000 / 350.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E204 | B2.usable_fill_ml | 1,330.0247 / 2,850.0529 / 3,996.8598 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E205 | B2.whole_headroom_length | 40.0000 / 80.0000 / 110.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E206 | B2.whole_headroom_width | -10.0000 / 30.0000 / 50.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E207 | B2.whole_headroom_height | -40.0000 / 10.0000 / 20.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E208 | B2.whole_fill_ratio | 0.3369 / 0.5475 / 1.5037 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E209 | B2.portion_fill_ratio | 0.0773 / 0.1941 / 0.6403 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E210 | B2.portion_capacity_kg | 0.7680 / 2.1188 / 3.5882 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E211 | B2.body_screening_degC | 200.0000 / 210.0000 / 220.0000 | degC | ASSUMED | Exploratory component test-design envelope only; no exact thermal capability established. Do not label this a safe maximum. |
| ASTRA-E212 | B2.industrial_moq | 100.0000 / 1,000.0000 / 5,000.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E213 | B2.order_unit | 100.0000 / 500.0000 / 1,000.0000 | packs/carton | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E214 | B2.pallet_quantity | 10,000.0000 / 20,000.0000 / 40,000.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E215 | B2.lead_time | 5.0000 / 14.0000 / 28.0000 | working_days | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E216 | B2.cost_gross | 1.2826 / 1.3189 / 1.4520 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E217 | B2.visible_area_m2 | 0.0378 / 0.0473 / 0.0536 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E218 | B2.visible_fraction | 0.6000 / 0.7500 / 0.8500 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E219 | B2.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E220 | B3.outer_width_mm | 180.0000 / 180.0000 / 180.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E221 | B3.gusset_mm | 70.0000 / 70.0000 / 70.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E222 | B3.outer_length_mm | 350.0000 / 350.0000 / 350.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E223 | B3.usable_fill_ml | 1,330.0247 / 2,850.0529 / 3,996.8598 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E224 | B3.whole_headroom_length | 40.0000 / 80.0000 / 110.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E225 | B3.whole_headroom_width | -10.0000 / 30.0000 / 50.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E226 | B3.whole_headroom_height | -40.0000 / 10.0000 / 20.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E227 | B3.whole_fill_ratio | 0.3369 / 0.5475 / 1.5037 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E228 | B3.portion_fill_ratio | 0.0773 / 0.1941 / 0.6403 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E229 | B3.portion_capacity_kg | 0.7680 / 2.1188 / 3.5882 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E230 | B3.body_screening_degC | 70.0000 / 80.0000 / 90.0000 | degC | ASSUMED | Exploratory component test-design envelope only; no exact thermal capability established. Do not label this a safe maximum. |
| ASTRA-E231 | B3.industrial_moq | 100.0000 / 1,000.0000 / 5,000.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E232 | B3.order_unit | 100.0000 / 500.0000 / 1,000.0000 | packs/carton | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E233 | B3.pallet_quantity | 10,000.0000 / 20,000.0000 / 40,000.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E234 | B3.lead_time | 5.0000 / 14.0000 / 28.0000 | working_days | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E235 | B3.cost_gross | 0.3945 / 0.4308 / 0.5639 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E236 | B3.visible_area_m2 | 0.0378 / 0.0473 / 0.0536 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E237 | B3.visible_fraction | 0.6000 / 0.7500 / 0.8500 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E238 | B3.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E239 | C1.outer_width_mm | 180.0000 / 180.0000 / 180.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E240 | C1.gusset_mm | 70.0000 / 70.0000 / 70.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E241 | C1.outer_length_mm | 350.0000 / 350.0000 / 350.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E242 | C1.usable_fill_ml | 1,330.0247 / 2,850.0529 / 3,996.8598 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E243 | C1.whole_headroom_length | 40.0000 / 80.0000 / 110.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E244 | C1.whole_headroom_width | -10.0000 / 30.0000 / 50.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E245 | C1.whole_headroom_height | -40.0000 / 10.0000 / 20.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E246 | C1.whole_fill_ratio | 0.3369 / 0.5475 / 1.5037 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E247 | C1.portion_fill_ratio | 0.0773 / 0.1941 / 0.6403 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E248 | C1.portion_capacity_kg | 0.7680 / 2.1188 / 3.5882 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E249 | C1.body_screening_degC | 150.0000 / 175.0000 / 200.0000 | degC | ASSUMED | Exploratory component test-design envelope only; no exact thermal capability established. Do not label this a safe maximum. |
| ASTRA-E250 | C1.industrial_moq | 1,000.0000 / 5,000.0000 / 10,000.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E251 | C1.order_unit | 250.0000 / 500.0000 / 1,000.0000 | packs/carton | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E252 | C1.pallet_quantity | 10,000.0000 / 20,000.0000 / 40,000.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E253 | C1.lead_time | 10.0000 / 20.0000 / 40.0000 | working_days | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E254 | C1.cost_gross | 0.9320 / 1.7948 / 4.7040 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E255 | C1.visible_area_m2 | 0.0060 / 0.0120 / 0.0200 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E256 | C1.visible_fraction | 0.0952 / 0.1905 / 0.3175 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E257 | C1.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E258 | C2.outer_width_mm | 180.0000 / 180.0000 / 180.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E259 | C2.gusset_mm | 70.0000 / 70.0000 / 70.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E260 | C2.outer_length_mm | 350.0000 / 350.0000 / 350.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E261 | C2.usable_fill_ml | 1,330.0247 / 2,850.0529 / 3,996.8598 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E262 | C2.whole_headroom_length | 40.0000 / 80.0000 / 110.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E263 | C2.whole_headroom_width | -10.0000 / 30.0000 / 50.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E264 | C2.whole_headroom_height | -40.0000 / 10.0000 / 20.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E265 | C2.whole_fill_ratio | 0.3369 / 0.5475 / 1.5037 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E266 | C2.portion_fill_ratio | 0.0773 / 0.1941 / 0.6403 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E267 | C2.portion_capacity_kg | 0.7680 / 2.1188 / 3.5882 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E268 | C2.body_screening_degC | 210.0000 / 210.0000 / 210.0000 | degC | ASSUMED | Published component/family maximum, duration and assembled-package approval not implied. |
| ASTRA-E269 | C2.industrial_moq | 100.0000 / 1,000.0000 / 5,000.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E270 | C2.order_unit | 100.0000 / 500.0000 / 1,000.0000 | packs/carton | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E271 | C2.pallet_quantity | 10,000.0000 / 20,000.0000 / 40,000.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E272 | C2.lead_time | 5.0000 / 14.0000 / 28.0000 | working_days | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E273 | C2.cost_gross | 0.9293 / 1.6674 / 2.9766 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E274 | C2.visible_area_m2 | 0.0378 / 0.0473 / 0.0536 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E275 | C2.visible_fraction | 0.6000 / 0.7500 / 0.8500 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E276 | C2.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E277 | C3.outer_width_mm | 180.0000 / 180.0000 / 180.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E278 | C3.gusset_mm | 70.0000 / 70.0000 / 70.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E279 | C3.outer_length_mm | 350.0000 / 350.0000 / 350.0000 | mm | ASSUMED | Borrowed Barleta nominal bag geometry for explicit design comparison, not exact candidate size. |
| ASTRA-E280 | C3.usable_fill_ml | 1,330.0247 / 2,850.0529 / 3,996.8598 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E281 | C3.whole_headroom_length | 40.0000 / 80.0000 / 110.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E282 | C3.whole_headroom_width | -10.0000 / 30.0000 / 50.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E283 | C3.whole_headroom_height | -40.0000 / 10.0000 / 20.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E284 | C3.whole_fill_ratio | 0.3369 / 0.5475 / 1.5037 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E285 | C3.portion_fill_ratio | 0.0773 / 0.1941 / 0.6403 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E286 | C3.portion_capacity_kg | 0.7680 / 2.1188 / 3.5882 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E287 | C3.body_screening_degC | 220.0000 / 220.0000 / 220.0000 | degC | ASSUMED | Published component/family maximum, duration and assembled-package approval not implied. |
| ASTRA-E288 | C3.industrial_moq | 100.0000 / 1,000.0000 / 5,000.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E289 | C3.order_unit | 100.0000 / 500.0000 / 1,000.0000 | packs/carton | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E290 | C3.pallet_quantity | 10,000.0000 / 20,000.0000 / 40,000.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E291 | C3.lead_time | 5.0000 / 14.0000 / 28.0000 | working_days | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E292 | C3.cost_gross | 1.3068 / 2.1707 / 3.6058 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E293 | C3.visible_area_m2 | 0.0378 / 0.0473 / 0.0536 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E294 | C3.visible_fraction | 0.6000 / 0.7500 / 0.8500 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E295 | C3.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E296 | C4.outer_length | 227.0000 / 227.0000 / 227.0000 | mm | ASSUMED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E297 | C4.outer_width | 178.0000 / 178.0000 / 178.0000 | mm | ASSUMED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E298 | C4.outer_height | 43.0000 / 43.0000 / 43.0000 | mm | ASSUMED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E299 | C4.capacity_ml | 1,005.0000 / 1,005.0000 / 1,005.0000 | ml | ASSUMED | Published nominal body capacity; usable fill is lower. |
| ASTRA-E300 | C4.usable_length | 186.3000 / 207.0000 / 217.3500 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E301 | C4.usable_width | 142.2000 / 158.0000 / 165.9000 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E302 | C4.usable_height | 34.2000 / 38.0000 / 39.9000 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E303 | C4.usable_fill_ml | 703.5000 / 804.0000 / 904.5000 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E304 | C4.whole_headroom_length | -53.7000 / -13.0000 / 17.3500 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E305 | C4.whole_headroom_width | -27.8000 / 8.0000 / 25.9000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E306 | C4.whole_headroom_height | -95.8000 / -72.0000 / -60.1000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E307 | C4.whole_fill_ratio | 1.4886 / 1.9410 / 2.8430 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E308 | C4.portion_fill_ratio | 0.3416 / 0.6882 / 1.2106 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E309 | C4.portion_capacity_kg | 0.3921 / 0.5843 / 0.8051 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E310 | C4.body_screening_degC | 220.0000 / 220.0000 / 220.0000 | degC | ASSUMED | Published component/family maximum, duration and assembled-package approval not implied. |
| ASTRA-E311 | C4.lid_screening_degC | 60.0000 / 70.0000 / 80.0000 | degC | ASSUMED | APET/PET-like lid exploratory stress-screening range, not a rated safe temperature; no inherited aluminium/CPET oven capability. |
| ASTRA-E312 | C4.system_screening_degC | 60.0000 / 70.0000 / 80.0000 | degC | ESTIMATED | Minimum assumed component screening ceiling; explicitly NOT assembled-system certification. Proposed 90 C hold exceeds central lid screening and requires qualification. |
| ASTRA-E313 | C4.industrial_moq | 100.0000 / 1,000.0000 / 5,000.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E314 | C4.order_unit | 100.0000 / 500.0000 / 1,000.0000 | packs/carton | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E315 | C4.pallet_quantity | 10,000.0000 / 20,000.0000 / 40,000.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E316 | C4.lead_time | 5.0000 / 14.0000 / 28.0000 | working_days | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E317 | C4.cost_gross | 2.3984 / 3.8957 / 6.3495 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E318 | C4.visible_area_m2 | 0.0242 / 0.0303 / 0.0343 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E319 | C4.visible_fraction | 0.6000 / 0.7500 / 0.8500 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E320 | C4.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E321 | C5.outer_length | 247.0000 / 247.0000 / 247.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E322 | C5.outer_width | 190.0000 / 190.0000 / 190.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E323 | C5.outer_height | 37.0000 / 37.0000 / 37.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E324 | C5.capacity_ml | 1,240.0000 / 1,240.0000 / 1,240.0000 | ml | OBSERVED_VERIFIED | Published nominal body capacity; usable fill is lower. |
| ASTRA-E325 | C5.usable_length | 211.0000 / 222.0000 / 233.0000 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E326 | C5.usable_width | 154.0000 / 165.0000 / 176.0000 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E327 | C5.usable_height | 28.8000 / 32.0000 / 33.6000 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E328 | C5.usable_fill_ml | 868.0000 / 992.0000 / 1,116.0000 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E329 | C5.whole_headroom_length | -29.0000 / 2.0000 / 33.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E330 | C5.whole_headroom_width | -16.0000 / 15.0000 / 36.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E331 | C5.whole_headroom_height | -101.2000 / -78.0000 / -66.4000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E332 | C5.whole_fill_ratio | 1.2065 / 1.5731 / 2.3042 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E333 | C5.portion_fill_ratio | 0.2769 / 0.5578 / 0.9812 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E334 | C5.portion_capacity_kg | 0.4908 / 0.7252 / 0.9954 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E335 | C5.body_screening_degC | 175.0000 / 175.0000 / 185.0000 | degC | CONFLICT | Published LC conflict 175/185 C; conservative central 175 C, 60-minute family context. |
| ASTRA-E336 | C5.industrial_moq | 780.0000 / 780.0000 / 1,560.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E337 | C5.order_unit | 780.0000 / 780.0000 / 780.0000 | packs/carton | OBSERVED_VERIFIED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E338 | C5.pallet_quantity | 12,480.0000 / 12,480.0000 / 12,480.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E339 | C5.lead_time | 7.0000 / 14.0000 / 28.0000 | working_days | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E340 | C5.cost_gross | 2.1624 / 3.2339 / 5.1371 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E341 | C5.visible_area_m2 | 0.0282 / 0.0352 / 0.0399 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E342 | C5.visible_fraction | 0.6000 / 0.7500 / 0.8500 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E343 | C5.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E344 | C6-RO-P.outer_length | 220.0000 / 220.0000 / 220.0000 | mm | ASSUMED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E345 | C6-RO-P.outer_width | 170.0000 / 170.0000 / 170.0000 | mm | ASSUMED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E346 | C6-RO-P.outer_height | 35.0000 / 35.0000 / 35.0000 | mm | ASSUMED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E347 | C6-RO-P.capacity_ml | 1,125.0000 / 1,125.0000 / 1,125.0000 | ml | ASSUMED | Published nominal body capacity; usable fill is lower. |
| ASTRA-E348 | C6-RO-P.usable_length | 180.0000 / 200.0000 / 210.0000 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E349 | C6-RO-P.usable_width | 135.0000 / 150.0000 / 157.5000 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E350 | C6-RO-P.usable_height | 27.0000 / 30.0000 / 31.5000 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E351 | C6-RO-P.usable_fill_ml | 787.5000 / 900.0000 / 1,012.5000 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E352 | C6-RO-P.whole_headroom_length | -60.0000 / -20.0000 / 10.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E353 | C6-RO-P.whole_headroom_width | -35.0000 / 0.0000 / 17.5000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E354 | C6-RO-P.whole_headroom_height | -103.0000 / -80.0000 / -68.5000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E355 | C6-RO-P.whole_fill_ratio | 1.3298 / 1.7339 / 2.5397 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E356 | C6-RO-P.portion_fill_ratio | 0.3052 / 0.6148 / 1.0815 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E357 | C6-RO-P.portion_capacity_kg | 0.4425 / 0.6562 / 0.9022 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E358 | C6-RO-P.body_screening_degC | 200.0000 / 250.0000 / 280.0000 | degC | ASSUMED | Exploratory component test-design envelope only; no exact thermal capability established. Do not label this a safe maximum. |
| ASTRA-E359 | C6-RO-P.lid_screening_degC | 60.0000 / 70.0000 / 80.0000 | degC | ASSUMED | APET/PET-like lid exploratory stress-screening range, not a rated safe temperature; no inherited aluminium/CPET oven capability. |
| ASTRA-E360 | C6-RO-P.system_screening_degC | 60.0000 / 70.0000 / 80.0000 | degC | ESTIMATED | Minimum assumed component screening ceiling; explicitly NOT assembled-system certification. Proposed 90 C hold exceeds central lid screening and requires qualification. |
| ASTRA-E361 | C6-RO-P.industrial_moq | 100.0000 / 1,400.0000 / 5,000.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E362 | C6-RO-P.order_unit | 100.0000 / 100.0000 / 100.0000 | packs/carton | OBSERVED_VERIFIED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E363 | C6-RO-P.pallet_quantity | 4,000.0000 / 8,000.0000 / 12,000.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E364 | C6-RO-P.lead_time | 3.0000 / 5.0000 / 10.0000 | working_days | OBSERVED_VERIFIED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E365 | C6-RO-P.cost_gross | 1.1727 / 1.2090 / 1.5628 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E366 | C6-RO-P.visible_area_m2 | 0.0224 / 0.0280 / 0.0318 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E367 | C6-RO-P.visible_fraction | 0.6000 / 0.7500 / 0.8500 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E368 | C6-RO-P.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E369 | C6-RO-W.outer_length | 257.0000 / 257.0000 / 257.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E370 | C6-RO-W.outer_width | 195.0000 / 195.0000 / 195.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E371 | C6-RO-W.outer_height | 103.0000 / 103.0000 / 103.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E372 | C6-RO-W.capacity_ml | 2,322.8302 / 3,097.1070 / 3,871.3837 | ml | ESTIMATED | WePack reported 406 litres remains CONFLICT. Geometric bounding-box x taper factor supplies a separate capacity estimate; not a correction to 4.06 L. |
| ASTRA-E373 | C6-RO-W.usable_length | 213.3000 / 237.0000 / 248.8500 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E374 | C6-RO-W.usable_width | 157.5000 / 175.0000 / 183.7500 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E375 | C6-RO-W.usable_height | 113.0000 / 128.0000 / 143.0000 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E376 | C6-RO-W.usable_fill_ml | 1,625.9812 / 2,477.6856 / 3,484.2454 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E377 | C6-RO-W.whole_headroom_length | -26.7000 / 17.0000 / 48.8500 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E378 | C6-RO-W.whole_headroom_width | -12.5000 / 25.0000 / 43.7500 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E379 | C6-RO-W.whole_headroom_height | -17.0000 / 18.0000 / 43.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E380 | C6-RO-W.whole_fill_ratio | 0.3864 / 0.6298 / 1.2300 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E381 | C6-RO-W.portion_fill_ratio | 0.0887 / 0.2233 / 0.5238 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E382 | C6-RO-W.portion_capacity_kg | 0.9456 / 1.8395 / 3.1268 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E383 | C6-RO-W.body_screening_degC | 200.0000 / 250.0000 / 280.0000 | degC | ASSUMED | Exploratory component test-design envelope only; no exact thermal capability established. Do not label this a safe maximum. |
| ASTRA-E384 | C6-RO-W.lid_screening_degC | 60.0000 / 70.0000 / 80.0000 | degC | ASSUMED | APET/PET-like lid exploratory stress-screening range, not a rated safe temperature; no inherited aluminium/CPET oven capability. |
| ASTRA-E385 | C6-RO-W.system_screening_degC | 60.0000 / 70.0000 / 80.0000 | degC | ESTIMATED | Minimum assumed component screening ceiling; explicitly NOT assembled-system certification. Proposed 90 C hold exceeds central lid screening and requires qualification. |
| ASTRA-E386 | C6-RO-W.industrial_moq | 100.0000 / 200.0000 / 2,000.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E387 | C6-RO-W.order_unit | 200.0000 / 200.0000 / 200.0000 | packs/carton | OBSERVED_VERIFIED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E388 | C6-RO-W.pallet_quantity | 2,000.0000 / 4,000.0000 / 8,000.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E389 | C6-RO-W.lead_time | 3.0000 / 5.0000 / 10.0000 | working_days | OBSERVED_VERIFIED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E390 | C6-RO-W.cost_gross | 2.3082 / 2.3445 / 2.9344 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E391 | C6-RO-W.visible_area_m2 | 0.0301 / 0.0376 / 0.0426 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E392 | C6-RO-W.visible_fraction | 0.6000 / 0.7500 / 0.8500 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E393 | C6-RO-W.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E394 | C6-RO-H.outer_length | 255.0000 / 255.0000 / 255.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E395 | C6-RO-H.outer_width | 195.0000 / 195.0000 / 195.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E396 | C6-RO-H.outer_height | 90.0000 / 90.0000 / 90.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E397 | C6-RO-H.capacity_ml | 2,400.0000 / 2,400.0000 / 2,400.0000 | ml | OBSERVED_VERIFIED | Published nominal body capacity; usable fill is lower. |
| ASTRA-E398 | C6-RO-H.usable_length | 211.5000 / 235.0000 / 246.7500 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E399 | C6-RO-H.usable_width | 157.5000 / 175.0000 / 183.7500 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E400 | C6-RO-H.usable_height | 100.0000 / 115.0000 / 130.0000 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E401 | C6-RO-H.usable_fill_ml | 1,680.0000 / 1,920.0000 / 2,160.0000 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E402 | C6-RO-H.whole_headroom_length | -28.5000 / 15.0000 / 46.7500 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E403 | C6-RO-H.whole_headroom_width | -12.5000 / 25.0000 / 43.7500 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E404 | C6-RO-H.whole_headroom_height | -30.0000 / 5.0000 / 30.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E405 | C6-RO-H.whole_fill_ratio | 0.6234 / 0.8128 / 1.1905 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E406 | C6-RO-H.portion_fill_ratio | 0.1431 / 0.2882 / 0.5069 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E407 | C6-RO-H.portion_capacity_kg | 0.9780 / 1.4212 / 1.9350 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E408 | C6-RO-H.body_screening_degC | 280.0000 / 280.0000 / 280.0000 | degC | ASSUMED | Published component/family maximum, duration and assembled-package approval not implied. |
| ASTRA-E409 | C6-RO-H.lid_screening_degC | 60.0000 / 70.0000 / 80.0000 | degC | ASSUMED | APET/PET-like lid exploratory stress-screening range, not a rated safe temperature; no inherited aluminium/CPET oven capability. |
| ASTRA-E410 | C6-RO-H.system_screening_degC | 60.0000 / 70.0000 / 80.0000 | degC | ESTIMATED | Minimum assumed component screening ceiling; explicitly NOT assembled-system certification. Proposed 90 C hold exceeds central lid screening and requires qualification. |
| ASTRA-E411 | C6-RO-H.industrial_moq | 100.0000 / 1,000.0000 / 5,000.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E412 | C6-RO-H.order_unit | 100.0000 / 100.0000 / 100.0000 | packs/carton | OBSERVED_VERIFIED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E413 | C6-RO-H.pallet_quantity | 2,000.0000 / 4,000.0000 / 8,000.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E414 | C6-RO-H.lead_time | 3.0000 / 5.0000 / 10.0000 | working_days | OBSERVED_VERIFIED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E415 | C6-RO-H.cost_gross | 1.9382 / 2.4585 / 3.7246 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E416 | C6-RO-H.visible_area_m2 | 0.0298 / 0.0373 / 0.0423 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E417 | C6-RO-H.visible_fraction | 0.6000 / 0.7500 / 0.8500 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E418 | C6-RO-H.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E419 | C6-EU.outer_length | 293.0000 / 293.0000 / 293.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E420 | C6-EU.outer_width | 193.0000 / 193.0000 / 193.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E421 | C6-EU.outer_height | 45.0000 / 45.0000 / 45.0000 | mm | OBSERVED_VERIFIED | Published nominal outer dimensions (or inherited exact historical source), not food-clear internal dimensions. |
| ASTRA-E422 | C6-EU.capacity_ml | 1,896.0000 / 1,896.0000 / 1,896.0000 | ml | OBSERVED_VERIFIED | Published nominal body capacity; usable fill is lower. |
| ASTRA-E423 | C6-EU.usable_length | 245.7000 / 273.0000 / 286.6500 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E424 | C6-EU.usable_width | 155.7000 / 173.0000 / 181.6500 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E425 | C6-EU.usable_height | 36.0000 / 40.0000 / 42.0000 | mm | ASSUMED | Internal taper/rim model; deep whole-chicken configurations include a post-oven domed-lid assumption, to be tested. |
| ASTRA-E426 | C6-EU.usable_fill_ml | 1,327.2000 / 1,516.8000 / 1,706.4000 | ml | ESTIMATED | Usable fill 70/80/90% of capacity as a handling/seal stress scenario, not certified fill line. |
| ASTRA-E427 | C6-EU.whole_headroom_length | 5.7000 / 53.0000 / 86.6500 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E428 | C6-EU.whole_headroom_width | -14.3000 / 23.0000 / 41.6500 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E429 | C6-EU.whole_headroom_height | -94.0000 / -70.0000 / -58.0000 | mm | ESTIMATED | Signed dimensional headroom: negative means this bird-envelope corner does not fit; rotation/deformation not credited. |
| ASTRA-E430 | C6-EU.whole_fill_ratio | 0.7891 / 1.0288 / 1.5069 | fraction | ESTIMATED | Occupied ellipsoid plus free liquid / package capacity; ratio over one indicates no geometric fit. |
| ASTRA-E431 | C6-EU.portion_fill_ratio | 0.1811 / 0.3648 / 0.6417 | fraction | ESTIMATED | Portion occupied volume plus liquid / nominal capacity; usable-fill limit remains separate. |
| ASTRA-E432 | C6-EU.portion_capacity_kg | 0.7663 / 1.1188 / 1.5268 | kg | ESTIMATED | Usable fill less free liquid multiplied by bulk food density. |
| ASTRA-E433 | C6-EU.body_screening_degC | 350.0000 / 350.0000 / 350.0000 | degC | ASSUMED | Published component/family maximum, duration and assembled-package approval not implied. |
| ASTRA-E434 | C6-EU.lid_screening_degC | 60.0000 / 70.0000 / 80.0000 | degC | ASSUMED | APET/PET-like lid exploratory stress-screening range, not a rated safe temperature; no inherited aluminium/CPET oven capability. |
| ASTRA-E435 | C6-EU.system_screening_degC | 60.0000 / 70.0000 / 80.0000 | degC | ESTIMATED | Minimum assumed component screening ceiling; explicitly NOT assembled-system certification. Proposed 90 C hold exceeds central lid screening and requires qualification. |
| ASTRA-E436 | C6-EU.industrial_moq | 400.0000 / 400.0000 / 800.0000 | packs | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E437 | C6-EU.order_unit | 400.0000 / 400.0000 / 400.0000 | packs/carton | OBSERVED_VERIFIED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E438 | C6-EU.pallet_quantity | 9,600.0000 / 9,600.0000 / 9,600.0000 | packs/pallet | ASSUMED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E439 | C6-EU.lead_time | 7.0000 / 14.0000 / 28.0000 | working_days | OBSERVED_VERIFIED | Modeled purchasing/lead scenario, not supplier promise; C5 780/carton and 12480/pallet and EU 400/carton/9600 pallet use published anchors where stated. |
| ASTRA-E440 | C6-EU.cost_gross | 4.7735 / 6.8746 / 9.4128 | RON/pack | ESTIMATED | Gross illustration = net modeled complete delivered package cost x 1.21; actual invoice tax treatment requires procurement review. |
| ASTRA-E441 | C6-EU.visible_area_m2 | 0.0339 / 0.0424 / 0.0481 | m2 | ASSUMED | Designed clear window/top viewing aperture, not measured imaging; shrink, rim and fogging reduce effective visibility. |
| ASTRA-E442 | C6-EU.visible_fraction | 0.6000 / 0.7500 / 0.8500 | fraction | ESTIMATED | Visible clear area / outside front or top projection, before condensation. |
| ASTRA-E443 | C6-EU.anti_fog_target | 0.7000 / 0.8000 / 0.9000 | fraction | ASSUMED | Proposed minimum identifiable viewing area during hot trial; no anti-fog performance observed. |
| ASTRA-E444 | C1.vs.B1-ESTIMATED.reduction_g | -12.8084 / -4.5815 / 4.3669 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E445 | C1.vs.B1-ESTIMATED.reduction_pct | -494.2160 / -70.5009 / 35.0472 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E446 | C1.vs.B1-ESTIMATED.incremental_cost | -0.4297 / 0.7603 / 3.5616 | RON/pack | ESTIMATED | Signed complete-package net delivered cost premium. |
| ASTRA-E447 | C1.vs.B1-ESTIMATED.premium_pct | -35.8092 / 105.1614 / 1,092.5173 | % | ESTIMATED | Percent complete-pack cost premium with shared baseline denominator. |
| ASTRA-E448 | C1.vs.B1-ESTIMATED.baseline_annual_spend | 189,340.8000 / 2,290,464.0000 / 12,334,080.0000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E449 | C1.vs.B1-ESTIMATED.candidate_annual_spend | 447,383.8570 / 4,699,148.9213 / 39,958,374.1357 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E450 | C1.vs.B1-ESTIMATED.annual_incremental_cost | -4,416,741.4396 / 2,408,684.9213 / 36,607,615.7357 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E451 | C1.vs.B1-ESTIMATED.baseline_annual_virgin | 1,505.2303 / 20,587.2480 / 128,068.8640 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E452 | C1.vs.B1-ESTIMATED.candidate_annual_virgin | 4,700.4870 / 35,101.4400 / 158,287.3600 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E453 | C1.vs.B1-ESTIMATED.annual_virgin_avoided | -131,649.3446 / -14,514.1920 / 44,884.4880 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E454 | C1.vs.B3.reduction_g | -11.9925 / -7.1225 / -3.1931 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E455 | C1.vs.B3.reduction_pct | -351.9442 / -179.9747 / -65.1658 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E456 | C2.vs.B1-ESTIMATED.reduction_g | -7.6003 / 0.7604 / 8.2073 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E457 | C2.vs.B1-ESTIMATED.reduction_pct | -293.2630 / 11.7008 / 65.8688 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E458 | C2.vs.B1-ESTIMATED.incremental_cost | -0.4320 / 0.6550 / 2.1340 | RON/pack | ESTIMATED | Signed complete-package net delivered cost premium. |
| ASTRA-E459 | C2.vs.B1-ESTIMATED.premium_pct | -36.0000 / 90.5947 / 654.6012 | % | ESTIMATED | Percent complete-pack cost premium with shared baseline denominator. |
| ASTRA-E460 | C2.vs.B1-ESTIMATED.baseline_annual_spend | 189,340.8000 / 2,290,464.0000 / 12,334,080.0000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E461 | C2.vs.B1-ESTIMATED.candidate_annual_spend | 446,054.4000 / 4,365,504.0000 / 25,284,864.0000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E462 | C2.vs.B1-ESTIMATED.annual_incremental_cost | -4,440,268.8000 / 2,075,040.0000 / 21,934,105.6000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E463 | C2.vs.B1-ESTIMATED.baseline_annual_virgin | 1,505.2303 / 20,587.2480 / 128,068.8640 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E464 | C2.vs.B1-ESTIMATED.candidate_annual_virgin | 2,469.9972 / 18,178.3800 / 104,757.4528 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E465 | C2.vs.B1-ESTIMATED.annual_virgin_avoided | -78,119.4374 / 2,408.8680 / 84,357.3984 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E466 | C2.vs.B3.reduction_g | -6.7845 / -1.7806 / 0.6472 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E467 | C2.vs.B3.reduction_pct | -199.1049 / -44.9937 / 13.2092 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E468 | C3.vs.B1-ESTIMATED.reduction_g | -20.5112 / -8.4700 / 2.0920 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E469 | C3.vs.B1-ESTIMATED.reduction_pct | -791.4321 / -130.3378 / 16.7901 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E470 | C3.vs.B1-ESTIMATED.incremental_cost | -0.1200 / 1.0710 / 2.6540 | RON/pack | ESTIMATED | Signed complete-package net delivered cost premium. |
| ASTRA-E471 | C3.vs.B1-ESTIMATED.premium_pct | -10.0000 / 148.1328 / 814.1104 | % | ESTIMATED | Percent complete-pack cost premium with shared baseline denominator. |
| ASTRA-E472 | C3.vs.B1-ESTIMATED.baseline_annual_spend | 189,340.8000 / 2,290,464.0000 / 12,334,080.0000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E473 | C3.vs.B1-ESTIMATED.candidate_annual_spend | 627,264.0000 / 5,683,392.0000 / 30,629,632.0000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E474 | C3.vs.B1-ESTIMATED.annual_incremental_cost | -1,233,408.0000 / 3,392,928.0000 / 27,278,873.6000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E475 | C3.vs.B1-ESTIMATED.baseline_annual_virgin | 1,505.2303 / 20,587.2480 / 128,068.8640 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E476 | C3.vs.B1-ESTIMATED.candidate_annual_virgin | 6,021.7054 / 47,420.2080 / 237,459.8195 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E477 | C3.vs.B1-ESTIMATED.annual_virgin_avoided | -210,821.8042 / -26,832.9600 / 21,502.9267 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E478 | C3.vs.B3.reduction_g | -19.6953 / -11.0110 / -5.4680 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E479 | C3.vs.B3.reduction_pct | -577.9985 / -278.2312 / -111.5908 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E480 | C4.vs.B1-ESTIMATED.reduction_g | -51.5465 / -29.6967 / -12.8198 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E481 | C4.vs.B1-ESTIMATED.reduction_pct | -1,988.9469 / -456.9771 / -102.8875 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E482 | C4.vs.B1-ESTIMATED.incremental_cost | 0.7821 / 2.4966 / 4.9215 | RON/pack | ESTIMATED | Signed complete-package net delivered cost premium. |
| ASTRA-E483 | C4.vs.B1-ESTIMATED.premium_pct | 65.1788 / 345.3089 / 1,509.6611 | % | ESTIMATED | Percent complete-pack cost premium with shared baseline denominator. |
| ASTRA-E484 | C4.vs.B1-ESTIMATED.baseline_annual_spend | 378,681.6000 / 4,580,928.0000 / 24,668,160.0000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E485 | C4.vs.B1-ESTIMATED.candidate_annual_spend | 2,302,460.5380 / 20,399,278.2048 / 107,871,706.0383 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E486 | C4.vs.B1-ESTIMATED.annual_incremental_cost | 908,540.5380 / 15,818,350.2048 / 101,170,189.2383 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E487 | C4.vs.B1-ESTIMATED.baseline_annual_virgin | 3,010.4606 / 41,174.4960 / 256,137.7280 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E488 | C4.vs.B1-ESTIMATED.candidate_annual_virgin | 29,365.0017 / 229,332.5338 / 1,112,907.9853 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E489 | C4.vs.B1-ESTIMATED.annual_virgin_avoided | -1,059,631.9546 / -188,158.0378 / -14,891.4657 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E490 | C4.vs.B3.reduction_g | -50.7307 / -32.2377 / -20.3798 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E491 | C4.vs.B3.reduction_pct | -1,488.7951 / -814.5966 / -415.9140 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E492 | C5.vs.B1-ESTIMATED.reduction_g | -3.3430 / 2.1630 / 10.0336 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E493 | C5.vs.B1-ESTIMATED.reduction_pct | -128.9900 / 33.2844 / 80.5267 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E494 | C5.vs.B1-ESTIMATED.incremental_cost | 0.5871 / 1.9496 / 3.9196 | RON/pack | ESTIMATED | Signed complete-package net delivered cost premium. |
| ASTRA-E495 | C5.vs.B1-ESTIMATED.premium_pct | 48.9230 / 269.6574 / 1,202.3221 | % | ESTIMATED | Percent complete-pack cost premium with shared baseline denominator. |
| ASTRA-E496 | C5.vs.B1-ESTIMATED.baseline_annual_spend | 378,681.6000 / 4,580,928.0000 / 24,668,160.0000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E497 | C5.vs.B1-ESTIMATED.candidate_annual_spend | 2,075,867.1215 / 16,933,740.5952 / 87,275,335.8428 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E498 | C5.vs.B1-ESTIMATED.annual_incremental_cost | 681,947.1215 / 12,352,812.5952 / 80,573,819.0428 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E499 | C5.vs.B1-ESTIMATED.baseline_annual_virgin | 3,010.4606 / 41,174.4960 / 256,137.7280 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E500 | C5.vs.B1-ESTIMATED.candidate_annual_virgin | 2,818.4728 / 27,469.8302 / 121,996.7964 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E501 | C5.vs.B1-ESTIMATED.annual_virgin_avoided | -68,720.7657 / 13,704.6658 / 206,259.2997 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E502 | C5.vs.B3.reduction_g | -2.5271 / -0.3780 / 2.4736 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E503 | C5.vs.B3.reduction_pct | -74.1635 / -9.5519 / 50.4822 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E504 | C6-RO-P.vs.B1-ESTIMATED.reduction_g | -36.3451 / -12.7050 / 3.2534 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E505 | C6-RO-P.vs.B1-ESTIMATED.reduction_pct | -1,402.3942 / -195.5067 / 26.1104 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E506 | C6-RO-P.vs.B1-ESTIMATED.incremental_cost | -0.2308 / 0.2762 / 0.9656 | RON/pack | ESTIMATED | Signed complete-package net delivered cost premium. |
| ASTRA-E507 | C6-RO-P.vs.B1-ESTIMATED.premium_pct | -19.2355 / 38.1983 / 296.1872 | % | ESTIMATED | Percent complete-pack cost premium with shared baseline denominator. |
| ASTRA-E508 | C6-RO-P.vs.B1-ESTIMATED.baseline_annual_spend | 378,681.6000 / 4,580,928.0000 / 24,668,160.0000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E509 | C6-RO-P.vs.B1-ESTIMATED.candidate_annual_spend | 1,125,791.9957 / 6,330,763.6128 / 26,550,551.3152 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E510 | C6-RO-P.vs.B1-ESTIMATED.annual_incremental_cost | -4,745,053.1674 / 1,749,835.6128 / 19,849,034.5152 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E511 | C6-RO-P.vs.B1-ESTIMATED.baseline_annual_virgin | 3,010.4606 / 41,174.4960 / 256,137.7280 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E512 | C6-RO-P.vs.B1-ESTIMATED.candidate_annual_virgin | 10,694.4446 / 121,673.3760 / 800,416.0102 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E513 | C6-RO-P.vs.B1-ESTIMATED.annual_virgin_avoided | -747,139.9795 / -80,498.8800 / 66,878.4653 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E514 | C6-RO-P.vs.B3.reduction_g | -35.5293 / -15.2460 / -4.3067 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E515 | C6-RO-P.vs.B3.reduction_pct | -1,042.6794 / -385.2432 / -87.8908 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E516 | C6-RO-W.vs.B1-ESTIMATED.reduction_g | -59.1226 / -21.7968 / -0.6837 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E517 | C6-RO-W.vs.B1-ESTIMATED.reduction_pct | -2,281.2722 / -335.4124 / -5.4870 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E518 | C6-RO-W.vs.B1-ESTIMATED.incremental_cost | 0.7076 / 1.2146 / 2.0991 | RON/pack | ESTIMATED | Signed complete-package net delivered cost premium. |
| ASTRA-E519 | C6-RO-W.vs.B1-ESTIMATED.premium_pct | 58.9669 / 167.9949 / 643.9031 | % | ESTIMATED | Percent complete-pack cost premium with shared baseline denominator. |
| ASTRA-E520 | C6-RO-W.vs.B1-ESTIMATED.baseline_annual_spend | 189,340.8000 / 2,290,464.0000 / 12,334,080.0000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E521 | C6-RO-W.vs.B1-ESTIMATED.candidate_annual_spend | 1,107,935.9966 / 6,138,327.2544 / 24,926,394.1105 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E522 | C6-RO-W.vs.B1-ESTIMATED.annual_incremental_cost | 410,975.9966 / 3,847,863.2544 / 21,575,635.7105 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E523 | C6-RO-W.vs.B1-ESTIMATED.baseline_annual_virgin | 1,505.2303 / 20,587.2480 / 128,068.8640 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E524 | C6-RO-W.vs.B1-ESTIMATED.candidate_annual_virgin | 7,633.8479 / 89,639.4312 / 634,323.6444 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E525 | C6-RO-W.vs.B1-ESTIMATED.annual_virgin_avoided | -607,685.6291 / -69,052.1832 / -397.0799 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E526 | C6-RO-W.vs.B3.reduction_g | -58.3067 / -24.3378 / -8.2437 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E527 | C6-RO-W.vs.B3.reduction_pct | -1,711.1296 / -614.9785 / -168.2383 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E528 | C6-RO-H.vs.B1-ESTIMATED.reduction_g | -58.7396 / -21.6081 / -0.5889 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E529 | C6-RO-H.vs.B1-ESTIMATED.reduction_pct | -2,266.4924 / -332.5094 / -4.7260 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E530 | C6-RO-H.vs.B1-ESTIMATED.incremental_cost | 0.4018 / 1.3088 / 2.7522 | RON/pack | ESTIMATED | Signed complete-package net delivered cost premium. |
| ASTRA-E531 | C6-RO-H.vs.B1-ESTIMATED.premium_pct | 33.4848 / 181.0260 / 844.2276 | % | ESTIMATED | Percent complete-pack cost premium with shared baseline denominator. |
| ASTRA-E532 | C6-RO-H.vs.B1-ESTIMATED.baseline_annual_spend | 189,340.8000 / 2,290,464.0000 / 12,334,080.0000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E533 | C6-RO-H.vs.B1-ESTIMATED.candidate_annual_spend | 930,335.9989 / 6,436,799.9942 / 31,638,784.0187 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E534 | C6-RO-H.vs.B1-ESTIMATED.annual_incremental_cost | 233,375.9989 / 4,146,335.9942 / 28,288,025.6187 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E535 | C6-RO-H.vs.B1-ESTIMATED.baseline_annual_virgin | 1,505.2303 / 20,587.2480 / 128,068.8640 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E536 | C6-RO-H.vs.B1-ESTIMATED.candidate_annual_virgin | 7,578.7793 / 89,041.7880 / 630,386.6061 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E537 | C6-RO-H.vs.B1-ESTIMATED.annual_virgin_avoided | -603,748.5907 / -68,454.5400 / -342.0113 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E538 | C6-RO-H.vs.B3.reduction_g | -57.9237 / -24.1491 / -8.1489 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E539 | C6-RO-H.vs.B3.reduction_pct | -1,699.8885 / -610.2116 / -166.3033 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E540 | C6-EU.vs.B1-ESTIMATED.reduction_g | -33.0284 / -26.9115 / -6.6030 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E541 | C6-EU.vs.B1-ESTIMATED.reduction_pct | -1,274.4140 / -414.1186 / -52.9936 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E542 | C6-EU.vs.B1-ESTIMATED.incremental_cost | 2.7451 / 4.9585 / 7.4532 | RON/pack | ESTIMATED | Signed complete-package net delivered cost premium. |
| ASTRA-E543 | C6-EU.vs.B1-ESTIMATED.premium_pct | 228.7559 / 685.8239 / 2,286.2461 | % | ESTIMATED | Percent complete-pack cost premium with shared baseline denominator. |
| ASTRA-E544 | C6-EU.vs.B1-ESTIMATED.baseline_annual_spend | 378,681.6000 / 4,580,928.0000 / 24,668,160.0000 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E545 | C6-EU.vs.B1-ESTIMATED.candidate_annual_spend | 4,582,594.7408 / 35,998,028.9222 / 159,914,682.7464 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E546 | C6-EU.vs.B1-ESTIMATED.annual_incremental_cost | 3,188,674.7408 / 31,417,100.9222 / 153,213,165.9464 | RON/year | ESTIMATED | Unit net cost x selected stream annual packs; negative mixed-sign intervals propagate all corners. |
| ASTRA-E547 | C6-EU.vs.B1-ESTIMATED.baseline_annual_virgin | 3,010.4606 / 41,174.4960 / 256,137.7280 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E548 | C6-EU.vs.B1-ESTIMATED.candidate_annual_virgin | 22,143.5808 / 211,685.7600 / 732,233.2160 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E549 | C6-EU.vs.B1-ESTIMATED.annual_virgin_avoided | -678,957.1853 / -170,511.2640 / -7,670.0448 | kg/year | ESTIMATED | Signed virgin accounting grams/pack x annual packs /1000. Same annual demand both sides. |
| ASTRA-E550 | C6-EU.vs.B3.reduction_g | -32.2125 / -29.4525 / -14.1630 | g/pack | ESTIMATED | Signed baseline minus candidate; negative is additional virgin accounting mass, never savings. |
| ASTRA-E551 | C6-EU.vs.B3.reduction_pct | -945.3412 / -744.2198 / -289.0408 | % | ESTIMATED | Percent reduction with the same baseline denominator at each corner; negative is an increase. |
| ASTRA-E552 | C1.dimensions | 350 x 180 x 70 mm | mm[3] | ASSUMED | Full 3D envelope [length, width, height] mm representing nominal outer dimensions and modeled internal usable axes in demo-model.json. |
| ASTRA-E553 | C2.dimensions | 350 x 180 x 70 mm | mm[3] | ASSUMED | Full 3D envelope [length, width, height] mm representing nominal outer dimensions and modeled internal usable axes in demo-model.json. |
| ASTRA-E554 | C3.dimensions | 350 x 180 x 70 mm | mm[3] | ASSUMED | Full 3D envelope [length, width, height] mm representing nominal outer dimensions and modeled internal usable axes in demo-model.json. |
| ASTRA-E555 | C4.dimensions | 227 x 178 x 43 mm | mm[3] | ASSUMED | Full 3D envelope [length, width, height] mm representing nominal outer dimensions and modeled internal usable axes in demo-model.json. |
| ASTRA-E556 | C5.dimensions | 190 x 247 x 37 mm | mm[3] | OBSERVED_VERIFIED | Full 3D envelope [length, width, height] mm representing nominal outer dimensions and modeled internal usable axes in demo-model.json. |
| ASTRA-E557 | C6-RO-P.dimensions | 220 x 170 x 35 mm | mm[3] | ASSUMED | Full 3D envelope [length, width, height] mm representing nominal outer dimensions and modeled internal usable axes in demo-model.json. |
| ASTRA-E558 | C6-RO-W.dimensions | 257 x 195 x 103 mm | mm[3] | OBSERVED_VERIFIED | Full 3D envelope [length, width, height] mm representing nominal outer dimensions and modeled internal usable axes in demo-model.json. |
| ASTRA-E559 | C6-RO-H.dimensions | 255 x 195 x 90 mm | mm[3] | OBSERVED_VERIFIED | Full 3D envelope [length, width, height] mm representing nominal outer dimensions and modeled internal usable axes in demo-model.json. |
| ASTRA-E560 | C6-EU.dimensions | 293 x 193 x 45 mm | mm[3] | OBSERVED_VERIFIED | Full 3D envelope [length, width, height] mm representing nominal outer dimensions and modeled internal usable axes in demo-model.json. |
| ASTRA-E561 | B3.virgin_fraction_inventory | 0.6954 / 1.0000 / 1.4380 | fraction | ESTIMATED | Virgin fraction 1 in modeled no-PCR baseline scenario. |
| ASTRA-E562 | B3.virgin_fraction | 1.0000 / 1.0000 / 1.0000 | fraction | ASSUMED | No recycled PP credit in selected B3 scenario; identical virgin and polymer mass, ratio exactly 1. |
