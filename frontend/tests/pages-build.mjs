// Verify a production Vite build made specifically for the /gigafood/ Pages project path.
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const base = '/gigafood/';
const html = await readFile(join(dist, 'index.html'), 'utf8');
const urls = [...html.matchAll(/(?:src|href)="(\/gigafood\/assets\/[^"]+)"/g)].map(x => x[1]);
assert.ok(urls.length >= 2, 'HTML must reference JS/CSS under /gigafood/assets/');
for (const url of urls) {
  const entry = join(dist, url.slice(base.length));
  assert.ok((await stat(entry)).size > 0, 'Missing/empty generated asset: ' + url);
}
assert.ok((await stat(join(dist, 'logo.png'))).size > 0, 'Missing logo');
for (const name of ['pouch-chicken-l.jpg', 'pouch-wings-sm.jpg', 'veg-1.jpg', 'meat-1.jpg', 'sacma-gaia-futamura.jpg', 'sacma-blife-gaia.jpg', 'user-fajita-meat.jpg']) {
  assert.ok((await stat(join(dist, 'reference-packaging', name))).size > 0, 'Missing public image: ' + name);
}
const assetNames = (await readdir(join(dist, 'assets'))).filter(name => name.endsWith('.js'));
assert.ok(assetNames.length > 0, 'Missing JavaScript bundle');
const bundle = (await Promise.all(assetNames.map(name => readFile(join(dist, 'assets', name), 'utf8')))).join('\n');
assert.ok(bundle.includes(base), 'Runtime bundle lacks Pages base URL');
for (const unsupported of ['"/logo.png"', "'/logo.png'", '"/reference-packaging/', "'/reference-packaging/"]) {
  assert.ok(!bundle.includes(unsupported), 'Found a root-relative public asset: ' + unsupported);
}
console.log('PackShift organization Pages asset-path checks passed: /gigafood/');
