// Built-in Node tests, bundled with the existing esbuild dependency. No new test framework.
import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const temp = await mkdtemp(join(tmpdir(), 'packshift-provenance-'));
try {
  const outfile = join(temp, 'checks.cjs');
  await build({ entryPoints: [join(root, 'tests/provenance.checks.tsx')], outfile,
    bundle: true, platform: 'node', format: 'cjs', jsx: 'automatic',
    define: { 'import.meta.env.BASE_URL': '"/packshift/"' } });
  execFileSync(process.execPath, ['--test', outfile], { stdio: 'inherit' });
} finally {
  await rm(temp, { recursive: true, force: true });
}
