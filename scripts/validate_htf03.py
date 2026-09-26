#!/usr/bin/env python3
"""Validate HTF-03 evidence, recompute bounded arithmetic and exercise failure cases.

Standard library only. Run from any directory:
    python scripts/validate_htf03.py --self-test
This checks internal evidence discipline, not authenticity, migration or food safety.
"""
from __future__ import annotations

import argparse
import copy
import itertools
import json
import math
from pathlib import Path
import re
import sys


DEFAULT = Path(__file__).resolve().parents[1] / "docs/evidence/htf-03"
STATES = {"OBSERVED_VERIFIED", "DERIVED_EXACT", "ESTIMATED", "ASSUMED", "UNKNOWN", "CONFLICT"}
POLICIES = {"DISPLAY_VERIFIED", "DISPLAY_DERIVED", "DISPLAY_ESTIMATED", "DISPLAY_WITH_QUALIFIER", "DO_NOT_DISPLAY"}
MODES = {"POST_COOK", "HOT_HOLD", "COOK_IN", "OVEN_BODY_ONLY", "POST_OVEN_LID"}
CONFIDENCES = {"HIGH", "MEDIUM", "LOW", "VERY_LOW"}
SAFETY = {"legal_food_contact_approval", "declaration_of_compliance", "migration_for_selected_use", "NIAS",
          "PFAS_compliance", "six_hour_microbiological_safety", "six_hour_organoleptic_safety",
          "actual_grease_leak_test", "certification_number"}
EPS = 1e-7


def walk(value, path="$", skip=()):
    yield path, value
    if isinstance(value, dict):
        for key, child in value.items():
            if key not in skip:
                yield from walk(child, f"{path}.{key}", skip)
    elif isinstance(value, list):
        for i, child in enumerate(value):
            yield from walk(child, f"{path}[{i}]", skip)


def interval(value):
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return (value, value, value)
    if isinstance(value, dict) and {"low", "central", "high"} <= value.keys():
        return tuple(value[k] for k in ("low", "central", "high"))
    return None


def evaluate(expr, inputs):
    if isinstance(expr, (int, float)) and not isinstance(expr, bool):
        return expr
    if isinstance(expr, str):
        return inputs[expr]
    if not isinstance(expr, dict) or len(expr) != 1:
        raise ValueError("expression must be a scalar, variable or one allowed operator")
    op, children = next(iter(expr.items()))
    if not isinstance(children, list) or not children:
        raise ValueError("operator needs operands")
    a = [evaluate(child, inputs) for child in children]
    if op == "add":
        return sum(a)
    if op == "mul":
        return math.prod(a)
    if op == "min":
        return min(a)
    if op in {"sub", "div"} and len(a) == 2:
        return a[0] - a[1] if op == "sub" else a[0] / a[1]
    raise ValueError(f"unsupported expression operator/arity: {op}")


def validate(data, display):
    errors = []

    def require(condition, path, message):
        if not condition:
            errors.append(f"{path}: {message}")

    require(data.get("schema_version") == "htf03.evidence.v1", "$", "unsupported canonical schema")
    require(display.get("schema_version") == "htf03.display.v1", "$display", "unsupported display schema")
    candidates = data.get("candidates", [])
    sources = data.get("sources", [])
    cids = [c.get("candidate_id") for c in candidates]
    sids = [s.get("source_id") for s in sources]
    require(len(cids) == len(set(cids)), "candidates", "duplicate candidate IDs")
    require(set(cids) == {f"C{i}" for i in range(1, 7)}, "candidates", "C1-C6 must be present exactly once")
    require(len(sids) == len(set(sids)), "sources", "duplicate source IDs")
    smap = {s["source_id"]: s for s in sources}
    config_ids = [v.get("configuration_id") for v in data.get("configurations", [])]
    require(len(config_ids) == len(set(config_ids)), "configurations", "duplicate configuration IDs")
    calcs = data.get("calculations", [])
    calcids = [c.get("calculation_id") for c in calcs]
    require(len(calcids) == len(set(calcids)), "calculations", "duplicate calculation IDs")
    cmap = {c["calculation_id"]: c for c in calcs}

    # Source references, including archived original claims, must resolve.
    for path, item in walk(data):
        if isinstance(item, dict) and "source_ids" in item:
            require(isinstance(item["source_ids"], list), path, "source_ids must be a list")
            for sid in item["source_ids"]:
                require(sid in smap, path, f"missing referenced source {sid}")

    # Original research assertions retain their old schemas and must never be interpreted as canonical fields.
    for path, f in walk(data, skip={"input_claim_archive", "field_reconciliation", "original_metadata"}):
        if not isinstance(f, dict) or f.get("kind") != "evidence_field":
            continue
        state = f.get("state")
        policy = f.get("display_policy")
        require(state in STATES, path, "invalid epistemic state")
        require(policy in POLICIES, path, "invalid display policy")
        require(f.get("confidence") in CONFIDENCES, path, "invalid confidence")
        require("value" in f and "source_ids" in f and "scope" in f, path, "missing typed-field metadata")
        if state == "UNKNOWN":
            require(f.get("value") is None, path, "UNKNOWN must have null value")
            require(policy == "DO_NOT_DISPLAY", path, "UNKNOWN must suppress numeric display")
        if policy == "DISPLAY_VERIFIED":
            require(state == "OBSERVED_VERIFIED", path, "non-observed value marked VERIFIED")
        if policy == "DISPLAY_DERIVED":
            require(state == "DERIVED_EXACT", path, "non-exact value marked DERIVED")
        if state == "OBSERVED_VERIFIED":
            require(bool(f.get("source_ids")), path, "observed value requires sources")
        if state in {"ASSUMED", "CONFLICT"}:
            require(policy in {"DISPLAY_WITH_QUALIFIER", "DO_NOT_DISPLAY"}, path, "assumption/conflict needs qualifier")
        bounds = interval(f.get("value"))
        if bounds:
            require(all(isinstance(v, (int, float)) and not isinstance(v, bool) and math.isfinite(v) for v in bounds), path, "non-finite/non-numeric bounds")
            require(bounds[0] <= bounds[1] <= bounds[2], path, "unordered interval")
            if f.get("unit") == "fraction":
                require(0 <= bounds[0] <= bounds[2] <= 1, path, "fraction outside 0-1")
            if "total_package_mass_g" in path or path.endswith(".mass_g") or path.endswith(".exact_mass_g"):
                require(bounds[0] > 0, path, "known total/component mass must be positive")
            if f.get("unit") in {"RON/pack", "EUR/pack", "DKK/pack", "RON", "EUR", "DKK"}:
                require(bounds[0] > 0, path, "known price must be positive")
        if state in {"ESTIMATED", "DERIVED_EXACT"}:
            cid = f.get("calculation_id")
            require(cid in cmap, path, "calculated field has no registered calculation")
            est = f.get("estimate", {})
            require(all(k in est for k in ("low", "central", "high", "method", "formula", "inputs", "assumptions", "confidence", "sensitivity")), path,
                    "estimate missing method/inputs/range/confidence/sensitivity")
            require(bool(est.get("method")) and bool(est.get("confidence")), path, "estimate method/confidence empty")
            if cid in cmap:
                require(est == cmap[cid], path, "inline estimate differs from calculation registry")
                require(bounds == interval(cmap[cid]), path, "field result differs from calculation")
                require(state == cmap[cid].get("state"), path, "calculation epistemic state mismatch")
            require(not (state == "ESTIMATED" and policy in {"DISPLAY_VERIFIED", "DISPLAY_DERIVED"}), path, "estimate promoted to exact")
            if state == "ESTIMATED":
                require(isinstance(f.get("value"), dict) and {"low", "central", "high"} <= f["value"].keys(),
                        path, "estimate must expose full low/central/high interval")
        scope = f.get("scope", "")
        if scope.startswith("EXACT"):
            inherited = f.get("inherited_boundary")
            exact_source = any(re.search(r"\d{3,}|SI-14|e-pui225", smap[s].get("scope", ""))
                               for s in f.get("source_ids", []) if s in smap)
            require(exact_source or bool(inherited), path, "exact-SKU claim lacks exact source or inherited boundary")
            if "INHERITED" in scope:
                require(bool(inherited), path, "inherited exact claim requires explicit boundary")
                require(state != "OBSERVED_VERIFIED", path, "unreverified inherited claim promoted to fresh verification")

    # Check every formula independently. No eval, imports, scripts or calls from the JSON are executed.
    for calc in calcs:
        path = "calculations." + calc["calculation_id"]
        try:
            ins = calc["inputs"]
            require(bool(ins), path, "empty calculation inputs")
            for key, v in ins.items():
                require(v["low"] <= v["central"] <= v["high"], path + "." + key, "unordered input")
                if v.get("unit") == "fraction":
                    require(0 <= v["low"] <= v["high"] <= 1, path + "." + key, "input fraction outside 0-1")
                r = v.get("calculation_ref")
                if r:
                    require(r in cmap, path, "missing input calculation reference")
                    if r in cmap:
                        require(interval(v) == interval(cmap[r]), path, "referenced calculation input altered")
                if calc["state"] == "DERIVED_EXACT":
                    require(v["state"] in {"OBSERVED_VERIFIED", "DERIVED_EXACT"}, path, "exact arithmetic contains estimated/assumed input")
                    require(v["low"] == v["high"], path, "DERIVED_EXACT cannot hide uncertain input")
            keys = list(ins)
            # Size cap prevents an edited dataset from causing unbounded corner work.
            require(len(keys) <= 16, path, "too many independent inputs")
            if len(keys) > 16:
                continue
            corners = [evaluate(calc["expression"], dict(zip(keys, values)))
                       for values in itertools.product(*[(ins[k]["low"], ins[k]["high"]) for k in keys])]
            central = evaluate(calc["expression"], {k: v["central"] for k, v in ins.items()})
            for name, actual in zip(("low", "central", "high"), (min(corners), central, max(corners))):
                require(math.isclose(calc[name], actual, rel_tol=EPS, abs_tol=EPS), path, f"incorrect {name} arithmetic")
        except (KeyError, TypeError, ValueError, ZeroDivisionError, OverflowError) as exc:
            errors.append(f"{path}: invalid calculation: {exc}")

    def check_mass(record, path):
        for group in ("exact_metrics", "model_metrics"):
            metrics = record.get(group, {})
            values = {k: interval(metrics.get(k, {}).get("value")) for k in
                      ("total_package_mass_g", "plastic_mass_g", "virgin_plastic_mass_g")}
            total, plastic, virgin = (values[k] for k in values)
            for key, bounds in values.items():
                if bounds:
                    require(min(bounds) >= 0, path + "." + group, f"negative {key}")
                    if key == "total_package_mass_g":
                        require(min(bounds) > 0, path + "." + group, "non-positive total mass")
            # Corresponding endpoints compare envelopes; do not require plastic.high <= total.low.
            if total and plastic:
                require(all(p <= t + EPS for p, t in zip(plastic, total)), path + "." + group, "plastic exceeds total; equality is allowed")
            if plastic and virgin:
                require(all(v <= p + EPS for v, p in zip(virgin, plastic)), path + "." + group, "virgin exceeds plastic")
            total_field = metrics.get("total_package_mass_g", {})
            if total_field.get("state") == "DERIVED_EXACT":
                require(record.get("bom", {}).get("exact_complete") is True, path + "." + group, "incomplete BOM cannot yield exact total")
                components = record.get("components", [])
                require(bool(components) and all(component.get("exact_mass_g", {}).get("value") is not None
                        and component["exact_mass_g"].get("state") in {"OBSERVED_VERIFIED", "DERIVED_EXACT"}
                        for component in components), path + "." + group,
                        "incomplete component masses cannot yield exact total even if BOM flag says complete")
        scenario = record.get("plastic_accounting_scenario")
        if scenario:
            require(scenario.get("default_headline") is False, path, "conditional plastic scenario promoted to headline")
            require(record.get("exact_metrics", {}).get("plastic_mass_g", {}).get("value") is None,
                    path, "actual plastic fact must not be supplied by an accounting scenario")

    def check_thermal(record, path):
        for i, t in enumerate(record.get("thermal_claims", [])):
            p = f"{path}.thermal_claims[{i}]"
            require(t.get("mode") in MODES, p, "missing/invalid thermal mode")
            require("duration_min" in t and "temperature_c" in t, p, "thermal claim must preserve duration including UNKNOWN")
            require(bool(t.get("component")), p, "thermal claim has no component boundary")
            if t.get("mode") == "HOT_HOLD":
                require(t.get("evidence_kind") == "HOT_HOLD_EXPLICIT", p, "hold inferred from peak temperature")
                require(t.get("duration_min", {}).get("value") is not None, p, "explicit hold needs time")
        hold = record.get("six_hour_hold", {})
        if isinstance(hold.get("value"), dict) and hold["value"].get("duration_min", 0) >= 360:
            require(any(t.get("mode") == "HOT_HOLD" and t.get("evidence_kind") == "HOT_HOLD_EXPLICIT"
                        and (t.get("duration_min", {}).get("value") or 0) >= 360
                        and t.get("temperature_c", {}).get("value") == hold["value"].get("temperature_c")
                        for t in record.get("thermal_claims", [])), path, "six-hour claim has no explicit matching hold source")

    def check_procurement(record, path):
        p = record.get("procurement") or {}
        status = p.get("status", {})
        if status.get("value") in {"ROMANIA_LOCAL_STOCK", "ROMANIA_DISTRIBUTOR_CURRENT", "ROMANIA_DISTRIBUTOR_HISTORICAL", "MANUFACTURER_ROMANIA_ENTITY"}:
            require(any(smap.get(s, {}).get("romania_evidence") for s in status.get("source_ids", [])), path, "Romania status lacks Romania evidence")
        if status.get("value") == "ROMANIA_LOCAL_STOCK":
            require(p.get("current_stock", {}).get("state") == "OBSERVED_VERIFIED", path, "local stock badge lacks stock evidence")

    for c in candidates:
        path = c["candidate_id"]
        check_mass(c, path)
        check_thermal(c, path)
        check_procurement(c, path)
        for name in SAFETY:
            f = c.get("food_safety", {}).get(name, {})
            require(f.get("state") != "ESTIMATED", path, "non-calculable safety field estimated: " + name)
    for config in data.get("configurations", []):
        require(config.get("parent_candidate_id") in cids, "configurations", "orphan configuration")
        check_mass(config, config["configuration_id"])
        check_thermal(config, config["configuration_id"])
        check_procurement(config, config["configuration_id"])

    baselines = {b.get("baseline_id"): b for b in data.get("baselines", [])}
    require(set(baselines) == {"B1", "B2", "B3"} and len(data.get("baselines", [])) == 3, "baselines", "baseline identities missing or duplicated")
    if set(baselines) == {"B1", "B2", "B3"}:
        b1, b2, b3 = (baselines[k] for k in ("B1", "B2", "B3"))
        require(b1.get("is_profi_incumbent") is True and b3.get("is_profi_incumbent") is False and b2.get("is_profi_incumbent") is False,
                "baselines", "B3/B2 represented as Profi or B1 identity lost")
        require(b1.get("identity") == "ACTUAL_PROFI_INCUMBENT", "B1", "wrong identity")
        require(b2.get("identity") == "VIRGIN_ALL_PLASTIC_MARKET_BAG", "B2", "B2 construction conflated")
        require(b3.get("identity") == "ROMANIAN_CONVENTIONAL_MARKET_REFERENCE", "B3", "B3 identity conflated")
        require(b1.get("estimated", {}).get("record_id") == "B1-ESTIMATED", "B1", "estimated baseline not separate")
        require(b1.get("observed", {}).get("mass_g", {}).get("value") is None, "B1", "scenario mass inserted into provider facts")
        require(b1.get("observed", {}).get("actual_profi_procurement_price", {}).get("value") is None, "B1", "unsupported provider price")
        require(b1.get("observed", {}).get("virgin_plastic_fraction", {}).get("value") == 1, "B1", "provider virgin fraction lost")
        check_mass(b3, "B3")
        check_procurement(b3, "B3")

    rows = data.get("product_candidate_gates", [])
    tuples = {(r.get("product_id"), r.get("candidate_id"), r.get("workflow")) for r in rows}
    require(len(rows) == len(tuples) == 48, "gate_matrix", "must cover 4 products x 6 candidates x 2 workflows")
    for r in rows:
        path = "/".join((r["product_id"], r["candidate_id"], r["workflow"]))
        require(len(r.get("gates", {})) == 6, path, "missing hard gate")
        failed = any(g.get("status") == "FAIL" for g in r.get("gates", {}).values())
        all_pass = all(g.get("status") == "PASS" for g in r.get("gates", {}).values())
        if failed:
            require(r.get("outcome") == "BLOCKED", path, "failed hard gate was compensated")
        if r.get("qualified_survivor") or r.get("approved_for_procurement"):
            require(all_pass, path, "unknown/failed gates promoted to qualified/approved")
        require(r.get("outcome") in {"RECOMMENDED UNDER CURRENT ASSUMPTIONS", "ALTERNATIVE", "QUALIFICATION REQUIRED", "BLOCKED"}, path, "invalid outcome")

    # Display data must preserve value/state/policy, not merely look plausible on its own.
    canonical_fields = {}
    for _, f in walk(data, skip={"input_claim_archive", "field_reconciliation", "original_metadata"}):
        if isinstance(f, dict) and f.get("kind") == "evidence_field":
            key = (f.get("calculation_id"), json.dumps(f.get("value"), sort_keys=True, ensure_ascii=False), f.get("state"))
            canonical_fields.setdefault(key, []).append(f)
    require({c.get("candidate_id") for c in display.get("candidates", [])} == set(cids), "display", "display candidate IDs differ")
    require(display.get("rendering_contract", {}).get("use_null_as_zero") is False, "display", "null-to-zero conversion enabled")
    require(display.get("rendering_contract", {}).get("hide_central_without_range") is True, "display", "central-only estimate enabled")
    for path, f in walk(display):
        if not isinstance(f, dict):
            continue
        if "source_ids" in f:
            require(all(s in smap for s in f["source_ids"]), path, "display source missing")
        if f.get("kind") != "evidence_field":
            continue
        if f.get("display_policy") == "DO_NOT_DISPLAY":
            require(f.get("value") is None, path, "hidden value leaked to display")
            continue
        key = (f.get("calculation_id"), json.dumps(f.get("value"), sort_keys=True, ensure_ascii=False), f.get("state"))
        matches = canonical_fields.get(key, [])
        require(bool(matches), path, "display value/state differs from canonical data")
        require(any(m.get("display_policy") == f.get("display_policy") and m.get("qualifier") == f.get("qualifier") for m in matches),
                path, "display strips canonical policy/qualifier")
        if f.get("state") == "ESTIMATED":
            require(isinstance(f.get("value"), dict) and interval(f.get("value")) is not None
                    and bool(f.get("estimate", {}).get("method")), path, "display estimate missing interval/method")
            require(f.get("display_policy") != "DISPLAY_VERIFIED", path, "UI estimate marked verified")
    for c in display.get("candidates", []):
        require(c.get("approved_for_procurement") is False, c["candidate_id"], "unapproved UI candidate promoted")
        for scenario in c.get("scenario_details", []):
            require(scenario.get("conditional_only") is True and scenario.get("default_headline") is False,
                    c["candidate_id"], "conditional comparison promoted to default benefit")
    return errors


def self_test(data, display):
    """Mutation tests target evidence failures, not a snapshot of the implementation."""
    tests = []

    def bad(name, mutate, expected):
        d, ui = copy.deepcopy(data), copy.deepcopy(display)
        mutate(d, ui)
        found = validate(d, ui)
        if not any(expected in e for e in found):
            raise AssertionError(f"{name}: expected rejection containing {expected!r}; got {found[:4]}")
        tests.append(name)

    bad("duplicate candidate", lambda d, u: d["candidates"].append(copy.deepcopy(d["candidates"][0])), "duplicate candidate")
    bad("duplicate source", lambda d, u: d["sources"].append(copy.deepcopy(d["sources"][0])), "duplicate source")
    bad("broken source", lambda d, u: d["candidates"][0]["commercial_name"]["source_ids"].append("MISSING"), "missing referenced source")
    bad("invalid fraction", lambda d, u: d["baselines"][0]["observed"]["virgin_plastic_fraction"].update(value=1.1), "fraction outside")
    bad("negative mass", lambda d, u: d["candidates"][0]["model_metrics"]["total_package_mass_g"]["value"].update(low=-1), "mass must be positive")
    bad("plastic above total", lambda d, u: d["candidates"][1]["model_metrics"]["plastic_mass_g"]["value"].update(high=99), "plastic exceeds total")
    bad("virgin above plastic", lambda d, u: d["candidates"][1]["model_metrics"]["virgin_plastic_mass_g"]["value"].update(high=99), "virgin exceeds plastic")
    bad("estimated marked verified", lambda d, u: d["candidates"][0]["model_metrics"]["total_package_mass_g"].update(display_policy="DISPLAY_VERIFIED"), "marked VERIFIED")
    bad("method omitted", lambda d, u: d["candidates"][0]["model_metrics"]["total_package_mass_g"]["estimate"].pop("method"), "estimate missing")
    bad("incomplete exact total", lambda d, u: d["candidates"][0]["model_metrics"]["total_package_mass_g"].update(state="DERIVED_EXACT"), "incomplete BOM")
    def false_bom(d, u):
        d["candidates"][0]["bom"]["exact_complete"] = True
        d["candidates"][0]["model_metrics"]["total_package_mass_g"]["state"] = "DERIVED_EXACT"
    bad("false complete BOM flag", false_bom, "incomplete component masses")
    bad("B3 presented as Profi", lambda d, u: d["baselines"][2].update(is_profi_incumbent=True), "B3/B2 represented as Profi")
    bad("B2 construction changed", lambda d, u: d["baselines"][1].update(identity="PAPER_PP"), "B2 construction conflated")
    bad("scenario inserted into provider facts", lambda d, u: d["baselines"][0]["observed"]["mass_g"].update(value=6.5,state="ASSUMED"), "scenario mass inserted")
    bad("Romania status without country evidence", lambda d, u: d["candidates"][0]["procurement"]["status"].update(value="ROMANIA_DISTRIBUTOR_CURRENT"), "Romania status lacks")
    bad("stock badge from listing", lambda d, u: d["candidates"][5]["procurement"]["status"].update(value="ROMANIA_LOCAL_STOCK"), "local stock badge lacks")
    bad("false exact SKU", lambda d, u: d["candidates"][0]["commercial_name"].update(scope="EXACT_SKU"), "exact-SKU claim lacks")
    bad("inherited boundary removed", lambda d, u: d["candidates"][3]["dimensions"].pop("inherited_boundary"), "inherited exact claim requires")
    bad("duration dropped", lambda d, u: d["candidates"][1]["thermal_claims"][0].pop("duration_min"), "must preserve duration")
    bad("hold from peak", lambda d, u: d["candidates"][4]["thermal_claims"][2].update(evidence_kind="PEAK_THERMAL_CLAIM"), "hold inferred from peak")
    bad("false six-hour claim", lambda d, u: d["candidates"][1]["six_hour_hold"].update(value={"temperature_c":210,"duration_min":360},state="ASSUMED"), "six-hour claim has no")
    bad("incorrect formula result", lambda d, u: d["calculations"][0].update(central=77), "incorrect central arithmetic")
    bad("safety estimated", lambda d, u: d["candidates"][0]["food_safety"]["PFAS_compliance"].update(state="ESTIMATED"), "non-calculable safety field estimated")
    bad("unknown gates compensated", lambda d, u: d["product_candidate_gates"][0].update(qualified_survivor=True), "promoted to qualified")
    bad("UI central without interval", lambda d, u: u["candidates"][0]["estimated_pack_mass"].update(value=19.72), "display estimate missing interval")
    bad("UI scenario promotion", lambda d, u: u["candidates"][4]["scenario_details"][0].update(default_headline=True), "conditional comparison promoted")
    # Positive control: C2 is an all-plastic model and all three metrics may be equal.
    c2 = next(c for c in data["candidates"] if c["candidate_id"] == "C2")["model_metrics"]
    assert c2["plastic_mass_g"]["value"] == c2["total_package_mass_g"]["value"]
    assert c2["virgin_plastic_mass_g"]["value"] == c2["plastic_mass_g"]["value"]
    assert not validate(data, display), "valid all-plastic equality control was rejected"
    return len(tests)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--directory", type=Path, default=DEFAULT)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    try:
        data = json.loads((args.directory / "HTF-03-canonical-packaging-dataset.json").read_text(encoding="utf-8"))
        ui = json.loads((args.directory / "HTF-03-prototype-display-dataset.json").read_text(encoding="utf-8"))
        errors = validate(data, ui)
        if errors:
            print("FAIL: HTF-03 evidence validation")
            for error in errors:
                print("- " + error)
            return 1
        count = self_test(data, ui) if args.self_test else 0
    except (OSError, ValueError, KeyError, TypeError, AssertionError) as exc:
        print("FAIL: " + str(exc))
        return 1
    print(f"PASS: {len(data['candidates'])} candidates; 3 distinct baselines; {len(data['sources'])} sources; "
          f"{len(data['calculations'])} recomputed calculations; {len(data['product_candidate_gates'])} gate rows.")
    if args.self_test:
        print(f"PASS: {count} rejected mutation cases; valid all-plastic equality accepted.")
    print("Scope: schema, arithmetic, provenance boundaries and display consistency; not physical/safety qualification.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
