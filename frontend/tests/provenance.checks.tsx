import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { createApiClient } from '../src/api/client';
import { ApiUnavailableError } from '../src/api/provenance';
import snapshot from '../src/api/staticApiSnapshot.json';
import recommendation from '../src/api/offlineRecommendationData.json';
import { ProvenanceStatus } from '../src/components/ProvenanceStatus';
import { ComplianceCertificateModal } from '../src/components/ComplianceCertificateModal';
import { UniversalPouchShowcase } from '../src/components/UniversalPouchShowcase';
import { EuropeanManufacturingDossier } from '../src/components/EuropeanManufacturingDossier';
import { CandidateRecommendationCard } from '../src/components/CandidateRecommendationCard';
import { LanguageProvider, translate } from '../src/i18n';
import { trustMessages } from '../src/i18n/trustMessages';

const signal = () => new AbortController().signal;
const first = Object.keys(snapshot.comparisons)[0];
const portfolio = 'faerch-deli-trays';
const workflow = 'POST_COOK_HOT_HOLD_6H';
const body = { product_id: 'P1', workflow_id: workflow };
const before = JSON.stringify([snapshot, recommendation]);
const json = payload => new Response(JSON.stringify(payload), { headers: { 'Content-Type': 'application/json' } });
const failing = (status = 404, staticHost = true) => createApiClient({ isStaticHost: () => staticHost, fetch: async () => new Response('', { status }) });
const offline = failing();
const unavailable = async fn => assert.rejects(async () => fn(), ApiUnavailableError);

test('all recorded routes carry their origin and original identity without a generated date', async () => {
  const operations = [offline.health(signal()), offline.scenarios(signal()), offline.comparison(first, signal()),
    offline.portfolios(signal()), offline.portfolio(portfolio, signal()), offline.evaluatePortfolio(portfolio, {}, signal()),
    offline.recommendationProducts(signal()), offline.recommendationCandidates(signal()), offline.evaluateRecommendation(body, signal())];
  for (const response of await Promise.all(operations)) {
    assert.equal(response.origin, 'STATIC_SNAPSHOT');
    assert.equal(response.snapshot.createdAt, null);
    assert.ok(response.snapshot.file.endsWith('.json'));
  }
  const rec = await offline.evaluateRecommendation(body, signal());
  assert.equal(rec.snapshot.researchCutoff, '2026-09-26');
  assert.equal(rec.snapshot.sourceRevision, recommendation.products.source_revision_hash);
  assert.equal(rec.snapshot.datasetId, 'HTF-03-canonical-packaging');
  assert.deepEqual((await offline.health(signal())).data, snapshot.health);
});

for (const [id, workflows] of Object.entries(recommendation.evaluations)) {
  for (const [workflow_id, expected] of Object.entries(workflows)) {
    test(`recorded recommendation matches exact supported context ${id}/${workflow_id}`, async () => {
      assert.deepEqual((await offline.evaluateRecommendation({ product_id: id, workflow_id }, signal())).data, expected);
    });
  }
}
for (const id of Object.keys(snapshot.comparisons)) {
  test(`comparison recording matches ${id}`, async () => assert.equal((await offline.comparison(id, signal())).data.scenario.id, id));
}
for (const status of [400, 401, 403, 422, 500, 503]) {
  test(`HTTP ${status} is never a saved or live success, even on static host`, async () => {
    await unavailable(() => failing(status).evaluateRecommendation(body, signal()));
    await unavailable(() => failing(status).health(signal()));
  });
}
test('static route 405 and network failure select explicitly recorded responses', async () => {
  assert.equal((await failing(405).evaluateRecommendation(body, signal())).origin, 'STATIC_SNAPSHOT');
  const client = createApiClient({ isStaticHost: () => true, fetch: async () => { throw new TypeError('network'); } });
  assert.equal((await client.comparison(first, signal())).origin, 'STATIC_SNAPSHOT');
});
test('local unavailable API never falls back, including when a saved response exists', async () => {
  const client = createApiClient({ isStaticHost: () => false, fetch: async () => { throw new TypeError('network'); } });
  await assert.rejects(client.evaluateRecommendation(body, signal()), TypeError);
  await unavailable(() => failing(404, false).portfolio(portfolio, signal()));
});
test('unsupported contexts, prototype names and malformed IDs cannot select a default', async () => {
  for (const id of ['', ' ', '../faerch-deli-trays', 'faerch-deli-trays/extra', '%2F', '__proto__', 'constructor', 'missing']) {
    await unavailable(() => offline.portfolio(id, signal()));
    await unavailable(() => offline.comparison(id, signal()));
    await unavailable(() => offline.evaluateRecommendation({ product_id: id, workflow_id: workflow }, signal()));
  }
  await unavailable(() => offline.evaluateRecommendation({ ...body, workflow_id: 'missing' }, signal()));
  await unavailable(() => offline.evaluateRecommendation({ ...body, configuration_id: '' }, signal()));
  await unavailable(() => offline.evaluateRecommendation({ ...body, configuration_id: 'C6_custom' }, signal()));
});
for (const override of [{ annual_units: 5000 }, { required_max_temperature_c: 60 }, { microwave_required: false }, { use_context: 'draft' }, { annual_units: null }]) {
  test(`static Selection refuses override ${JSON.stringify(override)}`, async () => {
    await unavailable(() => offline.evaluatePortfolio(portfolio, override, signal()));
  });
}
test('economics has no static response', async () => {
  await unavailable(() => offline.economicScenario(first, { annual_units: 1000, current_cost_eur_per_unit: .12, candidate_cost_eur_per_unit: .13 }, signal()));
});
test('successful backend payloads retain LIVE_API and reject wrong contexts', async () => {
  const payload = recommendation.evaluations.P1[workflow];
  const client = createApiClient({ isStaticHost: () => true, fetch: async () => json(payload) });
  assert.equal((await client.evaluateRecommendation(body, signal())).origin, 'LIVE_API');
  await unavailable(() => client.evaluateRecommendation({ ...body, product_id: 'P2' }, signal()));
  await unavailable(() => client.evaluateRecommendation({ ...body, workflow_id: 'LITERAL_OVEN_250C_THEN_HOLD' }, signal()));
  const savedPortfolio = snapshot.portfolio_details[portfolio];
  const selection = createApiClient({ fetch: async () => json(savedPortfolio) });
  await unavailable(() => selection.evaluatePortfolio(portfolio, { annual_units: 5000 }, signal()));
  await unavailable(() => selection.evaluatePortfolio(portfolio, { required_max_temperature_c: 60 }, signal()));
  await unavailable(() => selection.evaluatePortfolio(portfolio, { microwave_required: false }, signal()));
  await unavailable(() => selection.evaluatePortfolio(portfolio, { use_context: 'other' }, signal()));
});
test('malformed successful responses and JSON parsing failures do not become recordings', async () => {
  for (const fetch of [async () => json({}), async () => new Response('<html>no API</html>')]) {
    const client = createApiClient({ isStaticHost: () => true, fetch });
    await unavailable(() => client.evaluateRecommendation(body, signal()));
  }
});
test('an explicitly requested configuration must match the returned context', async () => {
  const payload = structuredClone(recommendation.evaluations.P1[workflow]);
  payload.context.selected_configuration_id = 'C6-RO-H';
  const client = createApiClient({ isStaticHost: () => true, fetch: async () => json(payload) });
  await unavailable(() => client.evaluateRecommendation({ ...body, configuration_id: 'C6-EU' }, signal()));
});
test('abort before fetch, after slow fetch, and while parsing never selects a recording', async () => {
  const early = new AbortController(); early.abort();
  await assert.rejects(offline.health(early.signal), { name: 'AbortError' });
  for (const status of [200, 404]) {
    const controller = new AbortController();
    const client = createApiClient({ isStaticHost: () => true, fetch: async () => { controller.abort(); return status === 200 ? json(snapshot.health) : new Response('', { status }); } });
    await assert.rejects(client.health(controller.signal), { name: 'AbortError' });
  }
  const controller = new AbortController();
  const client = createApiClient({ isStaticHost: () => true, fetch: async () => ({ ok: true, json: async () => { controller.abort(); return snapshot.health; } }) });
  await assert.rejects(client.health(controller.signal), { name: 'AbortError' });
});
test('retry follows current transport, recorded → live → error → recovered live', async () => {
  let status = 404;
  const client = createApiClient({ isStaticHost: () => true, fetch: async () => status === 200 ? json(recommendation.evaluations.P1[workflow]) : new Response('', { status }) });
  assert.equal((await client.evaluateRecommendation(body, signal())).origin, 'STATIC_SNAPSHOT');
  status = 200; assert.equal((await client.evaluateRecommendation(body, signal())).origin, 'LIVE_API');
  status = 503; await unavailable(() => client.evaluateRecommendation(body, signal()));
  status = 200; assert.equal((await client.evaluateRecommendation(body, signal())).origin, 'LIVE_API');
});
test('concept, modal, source states and limitations survive all three languages and print markup', () => {
  for (const language of ['en', 'ru', 'ro']) {
    globalThis.localStorage = { getItem: () => language };
    const render = element => renderToStaticMarkup(<LanguageProvider>{element}</LanguageProvider>);
    for (const key of Object.keys(trustMessages)) {
      assert.ok(translate(key, language).trim());
      if (language !== 'en') assert.notEqual(translate(key, language), key, key);
    }
    for (const productType of ['bag', 'tray']) {
      const modal = render(<ComplianceCertificateModal isOpen onClose={() => {}} productType={productType} />);
      assert.ok(modal.includes(translate('NOT A CERTIFICATE · NO CONFORMITY APPROVAL ESTABLISHED', language)));
      assert.ok(modal.includes(translate(productType === 'bag' ? 'Foil pouch concept' : 'Aluminium tray + LSR lid concept', language)));
      assert.doesNotMatch(modal, /CERT-EU|VERIFIED|250°C PASS|ISO 17025|accredit|Dr\.|signature|sha256|expiry|notified.body/i);
      assert.equal((modal.match(/<dd>/g) ?? []).length, 5);
    }
    assert.equal(render(<ComplianceCertificateModal isOpen={false} onClose={() => {}} />), '');
    const source = render(<ProvenanceStatus response={{ origin: 'STATIC_SNAPSHOT', data: snapshot.health, snapshot: { file: 'staticApiSnapshot.json', createdAt: null } }} />);
    assert.match(source, /data-origin="STATIC_SNAPSHOT"/);
    assert.ok(source.includes(translate('RECORDED DEMO', language)));
    assert.ok(source.includes(translate('Recording date not provided', language)));
    assert.match(render(<ProvenanceStatus pending />), /data-origin="LOADING"/);
    assert.match(render(<ProvenanceStatus unavailable />), /data-origin="UNAVAILABLE"/);
    const showcase = render(<UniversalPouchShowcase />);
    assert.ok(showcase.includes(translate('Illustrative browser calculation', language)));
    assert.ok(showcase.includes(translate('Manual 0–100 scores retained for illustration. They are not measurements, independent ratings, probabilities or qualification results.', language)));
    assert.doesNotMatch(showcase, /100% recyclable|250°C PASS|zero.migration risk|ready to deploy|готовая к внедрению|100% переработка|reciclabil 100%/i);
    assert.match(showcase, /\/packshift\/reference-packaging/);
    const leads = render(<EuropeanManufacturingDossier />);
    assert.ok(leads.includes(translate('Potential supplier leads — not qualified partners', language)));
    assert.doesNotMatch(leads, /€0\.025|15–20|BfR|FDA compliant|Zero CAPEX/);
    const assessment = recommendation.evaluations.P1[workflow].assessments.find(a => a.candidate_id === 'C6');
    const card = render(<CandidateRecommendationCard assessment={assessment} sourcesMap={{}} />);
    assert.ok(card.includes(translate('Engineering concepts in the showcase do not qualify this assessed configuration. Use its gates and source-specific limitations below.', language)));
    assert.doesNotMatch(card, /100% Recyclable|100% clarity|100% переработка|100% păstrate|film temperature stays/);
  }
});
test('recordings and numerical evidence remain byte-equivalent in memory', () => {
  assert.equal(JSON.stringify([snapshot, recommendation]), before);
});
