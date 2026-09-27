// Run: node frontend/tests/presentation.mjs (uses the existing Vite/esbuild toolchain).
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const temp = await mkdtemp(join(tmpdir(), 'packshift-presentation-'));
try {
  const outfile = join(temp, 'checks.cjs');
  await build({
    stdin: { resolveDir: root, loader: 'tsx', contents: `
      import assert from 'node:assert/strict';
      import { renderToStaticMarkup } from 'react-dom/server';
      import { translate, LanguageProvider } from './src/i18n';
      import { messages } from './src/i18n/messages';
      import { MetricField } from './src/components/MetricField';
      import { GateMatrix } from './src/components/GateMatrix';
      const forbidden = /\\bunknown\\b|N\\/A|неизвест|necunosc/i;
      const visible = html => html.replace(/<[^>]*>/g, '');
      const field = {kind:'evidence_field', state:'UNKNOWN', value:null,
        source_ids:[], confidence:'LOW', scope:'complete pack', display_policy:'SHOW'};
      for (const language of ['en','ru','ro']) {
        globalThis.localStorage = { getItem: () => language };
        const render = element => renderToStaticMarkup(<LanguageProvider>{element}</LanguageProvider>);
        const probePhrases = [
          'UNKNOWN',
          'Unknown (N/A)',
          'actual temperature remains UNKNOWN',
          'duration UNKNOWN',
          'delta N/A',
          'неизвестно',
          'неизвестен',
          'неизвестна',
          'неизвестны',
          'неизвестная',
          'неизвестной',
          'температура остаётся неизвестной',
          'necunoscut',
          'necunoscută',
          'necunoscute',
          'necunoscuți',
          'rămâne necunoscut',
        ];
        for (const text of probePhrases) {
          assert.doesNotMatch(translate(text, language), forbidden, 'Probe phrase ' + text + ' in ' + language + ' matched forbidden');
        }
        for (const [key] of Object.entries(messages)) {
          const result = translate(key, language);
          assert.doesNotMatch(result, forbidden, 'Catalogue key ' + key + ' in ' + language + ' matched forbidden: ' + result);
        }
        for (const token of ['QUALIFICATION REQUIRED','BLOCKED','ESTIMATED','ASSUMED','CONFLICT']) {
          assert.equal(translate(token, language), token);
        }
        for (const label of ['Price','Exact package mass','Food contact','Temperature limit','Availability']) {
          const result = visible(render(<MetricField label={label} field={field}/>));
          assert.doesNotMatch(result, forbidden);
          assert.doesNotMatch(result, /0 g|0%|false/);
        }
        const estimate = {...field, state:'ESTIMATED', value:{low:23.4,central:27.1,high:30.5}};
        const before = JSON.stringify(estimate);
        const bounded = visible(render(<MetricField label="Mass" field={estimate} unitOverride="g"/>));
        assert.match(bounded, /≈27.1 g/); assert.match(bounded, /23.4–30.5/); assert.match(bounded, /ESTIMATED/);
        assert.equal(JSON.stringify(estimate), before);
        const unbounded = visible(render(<MetricField label="Mass" field={{...field,state:'ESTIMATED',value:27.1}}/>));
        assert.doesNotMatch(unbounded, /27.1/);
        const zero = visible(render(<MetricField label="Mass" field={{...field,state:'OBSERVED_VERIFIED',value:0}} unitOverride="g"/>));
        assert.match(zero, /0 g/);
        const no = visible(render(<MetricField label="Microwave" field={{...field,state:'OBSERVED_VERIFIED',value:false}}/>));
        assert.match(no, /No|Нет|Nu/);
        const gates = Object.fromEntries(['physical_fit','food_contact','thermal_workflow','grease_leak','transparent_viewing','procurement'].map(gate_id=>[gate_id,{gate_id,status:'UNKNOWN',reason:'Actual capability remains UNKNOWN',source_ids:['SOURCE-UNKNOWN-123']} ]));
        const gateHtml = render(<GateMatrix gates={gates}/>);
        assert.match(gateHtml, /SOURCE-UNKNOWN-123/); // Source identifiers bypass prose normalization.
        assert.doesNotMatch(visible(gateHtml).replaceAll('SOURCE-UNKNOWN-123',''), forbidden);
        assert.equal(gates.food_contact.status,'UNKNOWN');
      }
      console.log('Presentation checks passed: EN/RU/RO, null, zero, false, bounded estimates, canonical outcomes, IDs and gate truth.');
    ` },
    outfile, bundle: true, platform: 'node', format: 'cjs', jsx: 'automatic',
  });
  process.stdout.write(execFileSync(process.execPath, [outfile], { encoding: 'utf8' }));
} finally {
  await rm(temp, { recursive: true, force: true });
}
