// Optional browser regression using an available Playwright browser library (no added dependency).
// Run after npm run build and scripts/demo.py: PACKSHIFT_PLAYWRIGHT_MODULE=<installed module> node frontend/tests/browser.mjs
// Routes serve the local production build on synthetic static/local origins; API 'live' routes proxy the actual PUBLIC demo.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium, expect } = require(process.env.PACKSHIFT_PLAYWRIGHT_MODULE || '@playwright/test');
const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(process.env.PACKSHIFT_BROWSER_OUTPUT || path.join(frontend, '../.browser-results'));
const backend = process.env.PACKSHIFT_API_URL || 'http://127.0.0.1:8000';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
const record = name => { results.push(name); console.log('PASS:', name); };
const mime = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.jpg':'image/jpeg', '.png':'image/png', '.svg':'image/svg+xml' };
async function setup(staticHost, viewport = { width: 1440, height: 1050 }) {
  const context = await browser.newContext({ viewport, locale: 'en-GB' });
  await context.addInitScript(() => localStorage.setItem('packshift.language', 'en'));
  const page = await context.newPage();
  const faults = [];
  page.on('pageerror', error => faults.push(String(error)));
  const control = { mode: staticHost ? 'static' : 'live', holds: [], delayed: null, delayEconomics: false, failProduct: null, calls: [] };
  await page.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if (url.pathname.startsWith('/api/v1/')) {
      const payload = request.postDataJSON();
      control.calls.push({ url: url.pathname, payload });
      if (control.delayed && url.pathname.endsWith('recommendation/evaluate') && payload.product_id === control.delayed) {
        await new Promise(resolve => control.holds.push(resolve));
      }
      if (control.delayEconomics && url.pathname.endsWith('/economics')) await new Promise(resolve => control.holds.push(resolve));
      if (control.mode === 'static') return route.fulfill({ status: request.method() === 'POST' ? 405 : 404, body: '' });
      if (control.mode === 'network') return route.abort('connectionfailed');
      if (control.mode === '503' || payload?.product_id === control.failProduct) return route.fulfill({ status: 503, body: '' });
      const response = await fetch(backend + url.pathname, { method: request.method(), headers: { 'Content-Type': 'application/json' }, ...(request.postData() ? { body: request.postData() } : {}) });
      return route.fulfill({ status: response.status, contentType: 'application/json', body: await response.text() });
    }
    // No requests to real GitHub Pages or other remote hosts are made.
    let filename = decodeURIComponent(url.pathname).replace(/^\/packshift\/?/, '').replace(/^\/+/, '') || 'index.html';
    filename = path.resolve(frontend, 'dist', filename);
    if (!filename.startsWith(path.join(frontend, 'dist') + path.sep)) return route.fulfill({ status: 404, body: '' });
    try { await route.fulfill({ status: 200, body: await readFile(filename), contentType: mime[path.extname(filename)] || 'application/octet-stream' }); }
    catch { await route.fulfill({ status: 404, body: '' }); }
  });
  await page.goto(staticHost ? 'https://packshift-phase-e.github.io/packshift/' : 'http://localhost:4173/');
  return { page, context, control, faults };
}
const mode = (page, index) => page.locator('.mode-switch button').nth(index).click();
const source = (page, selector, origin) => expect(page.locator(selector + ' > .source-status').first()).toHaveAttribute('data-origin', origin);
async function noOverflow(page) {
  const overflow = await page.evaluate(() => [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).map(e => [e.tagName, e.className, Math.round(e.getBoundingClientRect().right)]).slice(0, 12));
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'horizontal page overflow: ' + JSON.stringify(overflow));
}
try {
  const { page, context, control, faults } = await setup(true);
  await mode(page, 3);
  await expect(page.locator('.comparison-mode > .source-status').last()).toHaveAttribute('data-origin', 'STATIC_SNAPSHOT');
  await expect(page.locator('.runtime-pill').first()).toContainText('Recorded health; backend availability not established');
  assert.equal(await page.locator('#econ-annual-units').isDisabled(), true);
  await expect(page.locator('#economics .source-status')).toHaveAttribute('data-origin', 'UNAVAILABLE');
  await page.locator('.comparison-mode > .source-status').first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(output, 'static-comparison.png'), fullPage: false });
  record('static Comparison + recorded READY + economics unavailable');
  await mode(page, 2);
  await source(page, '.selection-mode', 'STATIC_SNAPSHOT');
  await expect(page.locator('.selection-mode > .source-status').last()).toHaveAttribute('data-origin', 'STATIC_SNAPSHOT');
  for (const id of ['scenario-context','scenario-temperature','scenario-microwave','annual-units']) assert.equal(await page.locator('#' + id).isDisabled(), true);
  const postCount = control.calls.filter(c => c.url.endsWith('/evaluate') && c.url.includes('/portfolios/')).length;
  await page.locator('.selection-mode button').filter({ hasText: 'Reload defaults / check backend' }).click();
  await expect(page.locator('.selection-mode > .source-status').last()).toHaveAttribute('data-origin', 'STATIC_SNAPSHOT');
  assert.equal(control.calls.filter(c => c.url.endsWith('/evaluate') && c.url.includes('/portfolios/')).length, postCount);
  await page.locator('.selection-mode > .source-status').first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(output, 'static-selection.png'), fullPage: false });
  record('static Selection defaults visible; override controls disabled; defaults reload is GET');
  await mode(page, 1);
  await source(page, '.recommendation-view', 'STATIC_SNAPSHOT');
  await page.locator('.product-select-card').nth(2).click();
  await page.locator('.workflow-select-card').nth(1).click();
  await source(page, '.recommendation-view', 'STATIC_SNAPSHOT');
  await expect(page.locator('.selected-product-badge')).toContainText('P3');
  for (const [label, language] of [['RU','ru'],['RO / MD','ro'],['EN','en']]) {
    await page.locator('.lang-buttons-group button').filter({ hasText: label }).click();
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await source(page, '.recommendation-view', 'STATIC_SNAPSHOT');
    await expect(page.locator('.selected-product-badge')).toContainText('P3');
  }
  record('supported static Recommendation; EN/RU/RO preserves context and provenance');
  control.mode = 'live';
  await page.locator('.product-select-card').nth(3).click();
  await source(page, '.recommendation-view', 'LIVE_API');
  await expect(page.locator('.selected-product-badge')).toContainText('P4');
  control.mode = '503';
  await page.locator('.product-select-card').nth(1).click();
  await source(page, '.recommendation-view', 'UNAVAILABLE');
  await expect(page.locator('.recommendation-results-flow')).toHaveCount(0);
  control.mode = 'live';
  await page.locator('.recommendation-view .retry-btn').first().click();
  await source(page, '.recommendation-view', 'LIVE_API');
  await expect(page.locator('.selected-product-badge')).toContainText('P2');
  record('recorded → real backend → 503 clears result → Retry restores current P2 context');
  control.delayed = 'P1';
  await page.locator('.product-select-card').nth(0).click();
  await source(page, '.recommendation-view', 'LOADING');
  await expect.poll(() => control.holds.length).toBeGreaterThan(0);
  await page.locator('.workflow-select-card').nth(0).click();
  await page.locator('.product-select-card').nth(2).click();
  await source(page, '.recommendation-view', 'LIVE_API');
  control.delayed = null;
  control.holds.splice(0).forEach(resolve => resolve());
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.selected-product-badge')).toContainText('P3');
  await expect(page.locator('.workflow-select-card').nth(0)).toHaveAttribute('aria-pressed', 'true');
  await source(page, '.recommendation-view', 'LIVE_API');
  record('slow P1 + rapid workflow/product switch + abort cannot replace current P3 result');
  await mode(page, 0);
  await page.getByRole('button', { name: 'Open engineering qualification checklist', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('NOT A CERTIFICATE');
  assert.doesNotMatch(await dialog.innerText(), /CERT-EU|250°C PASS|VERIFIED|accredit|signature|Dr\.|sha256/i);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => !!document.activeElement.closest('[role=dialog]')), true);
  await page.emulateMedia({ media: 'print' });
  await expect(dialog.locator('h2')).toBeVisible();
  await page.pdf({ path: path.join(output, 'qualification-checklist.pdf'), format: 'A4', printBackground: true });
  await page.screenshot({ path: path.join(output, 'qualification-print.png') });
  await page.emulateMedia({ media: 'screen' });
  await page.bringToFront();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Open engineering qualification checklist', exact: true })).toBeFocused();
  record('non-certifying modal, keyboard focus, Escape/restore, print and PDF');
  await page.getByRole('button', { name: 'Aluminium tray + LSR lid concept', exact: true }).click();
  await expect(page.locator('.calc-results-grid')).toContainText('100%');
  await expect(page.locator('.manufacturing-dossier-card')).toContainText('not qualified partners');
  await page.getByRole('button', { name: 'Supplier enquiry checklist', exact: true }).click();
  await expect(page.locator('.dossier-tab-pane')).toContainText('No zero-tooling-cost');
  for (const label of ['RU','RO / MD','EN']) {
    await page.locator('.lang-buttons-group button').filter({ hasText: label }).click();
    await page.locator('.showcase-cert-btn').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
  }
  await page.locator('.product-title-text').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(output, 'tray-concept.png'), fullPage: false });
  record('tray concept, calculator assumptions, supplier enquiry and checklist in EN/RU/RO');
  assert.deepEqual(faults, []);
  await context.close();

  const local = await setup(false);
  await mode(local.page, 2);
  await expect(local.page.locator('.selection-mode > .source-status').last()).toHaveAttribute('data-origin', 'LIVE_API');
  await local.page.locator('#scenario-temperature').fill('60');
  await local.page.locator('#annual-units').fill('12345');
  await local.page.getByRole('button', { name: 'Evaluate scenario', exact: true }).click();
  await expect(local.page.locator('.selection-mode > .source-status').last()).toHaveAttribute('data-origin', 'LIVE_API');
  const override = local.control.calls.findLast(c => c.url.includes('/portfolios/') && c.url.endsWith('/evaluate'));
  assert.equal(override.payload.annual_units, 12345); assert.equal(override.payload.required_max_temperature_c, 60);
  await expect(local.page.locator('.selection-results')).toContainText('12,345');
  record('local Selection sends and displays real backend overrides');
  await mode(local.page, 3);
  await expect(local.page.locator('.comparison-mode > .source-status').last()).toHaveAttribute('data-origin', 'LIVE_API');
  await local.page.locator('#econ-annual-units').fill('10000');
  await local.page.locator('#econ-current-cost').fill('0.12');
  await local.page.locator('#econ-candidate-cost').fill('0.13');
  await local.page.getByRole('button', { name: 'Evaluate economic scenario', exact: true }).click();
  await expect(local.page.locator('#economics .source-status')).toHaveAttribute('data-origin', 'LIVE_API');
  await local.page.locator('#econ-annual-units').fill('20000');
  await expect(local.page.locator('.economic-results-container')).toHaveCount(0);
  local.control.delayEconomics = true;
  await local.page.getByRole('button', { name: 'Evaluate economic scenario', exact: true }).click();
  await expect.poll(() => local.control.holds.length).toBeGreaterThan(0);
  await local.page.locator('#econ-annual-units').fill('30000');
  local.control.delayEconomics = false;
  local.control.holds.splice(0).forEach(resolve => resolve());
  await local.page.waitForLoadState('networkidle');
  await expect(local.page.locator('.economic-results-container')).toHaveCount(0);
  await local.page.getByRole('button', { name: 'Evaluate economic scenario', exact: true }).click();
  await expect(local.page.locator('#economics .source-status')).toHaveAttribute('data-origin', 'LIVE_API');
  await expect(local.page.locator('.economic-results-container')).toContainText('30,000');
  record('local economics backend works; editing inputs removes the old answer');
  local.control.mode = 'network';
  await mode(local.page, 1);
  await local.page.locator('.product-select-card').nth(3).click();
  await source(local.page, '.recommendation-view', 'UNAVAILABLE');
  await expect(local.page.locator('.recommendation-results-flow')).toHaveCount(0);
  local.control.mode = 'live';
  await local.page.locator('.recommendation-view .retry-btn').first().click();
  await source(local.page, '.recommendation-view', 'LIVE_API');
  await expect(local.page.locator('.selected-product-badge')).toContainText('P4');
  record('localhost network outage never uses a saved answer; recovery keeps selection');
  assert.deepEqual(local.faults, []);
  await local.context.close();

  const mobile = await setup(true, { width: 390, height: 844 });
  await noOverflow(mobile.page);
  for (const label of ['RU','RO / MD','EN']) {
    await mobile.page.locator('.lang-buttons-group button').filter({ hasText: label }).click();
    for (const button of await mobile.page.locator('.lang-buttons-group button').all()) {
      const box = await button.boundingBox();
      assert.ok(box && box.x >= 0 && box.x + box.width <= 390, 'language button clipped on mobile');
    }
  }
  await mobile.page.locator('.showcase-hero-banner').scrollIntoViewIfNeeded();
  await mobile.page.screenshot({ path: path.join(output, 'concept-mobile.png'), fullPage: false });
  for (const index of [1,2,3]) {
    await mode(mobile.page, index);
    await expect(mobile.page.locator('.source-status:visible').first()).toContainText('RECORDED DEMO');
    await noOverflow(mobile.page);
  }
  await mobile.page.locator('.comparison-mode > .source-status').last().scrollIntoViewIfNeeded();
  await mobile.page.screenshot({ path: path.join(output, 'static-mobile.png'), fullPage: false });
  assert.deepEqual(mobile.faults, []);
  record('390px mobile concept and all response modes preserve visible provenance without overflow');
  await mobile.context.close();
  await writeFile(path.join(output, 'browser-results.json'), JSON.stringify({ results, staticPreview: 'locally built production assets on synthetic *.github.io origin; no deployment', liveAPI: backend }, null, 2));
} finally { await browser.close(); }
