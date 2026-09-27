// Behavioural smoke test against a running dev or preview server:
//   npm run dev  →  npm run smoke  (SITE_URL overrides http://127.0.0.1:8773/)
// Uses Playwright's Chromium; set CHROMIUM_PATH to reuse an existing binary.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const url = process.env.SITE_URL ?? 'http://127.0.0.1:8773/';
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const failures = [];
const check = async (name, fn) => {
  try { await fn(); console.log(`ok   ${name}`); }
  catch (error) { failures.push(name); console.log(`FAIL ${name}\n     ${error.message.split('\n')[0]}`); }
};

async function open(width, height = 900) {
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => message.type() === 'error' && errors.push(message.text()));
  await page.goto(url, { waitUntil: 'networkidle' });
  return { page, errors };
}

for (const width of [1440, 900, 390]) {
  const { page, errors } = await open(width);
  await check(`${width}px: scrolls the whole page without errors`, async () => {
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 450) { await page.evaluate(top => scrollTo(0, top), y); await page.waitForTimeout(40); }
    await page.waitForTimeout(500);
    assert.deepEqual(errors, []);
  });
  await page.close();
}

const { page, errors } = await open(1440);
await check('product tabs switch the hero screen', async () => {
  const tab = page.locator('#product-tab-2');
  await tab.click();
  await assert.doesNotReject(page.locator('.product-detail h3', { hasText: 'Коды двухфакторной' }).waitFor());
  assert.equal(await tab.getAttribute('aria-selected'), 'true');
  assert.equal(await page.locator('.pw-live-dashboard:not(.screen-switch-outgoing)').isHidden(), true);
  await page.keyboard.press('Home');
  assert.equal(await page.locator('#product-tab-0').getAttribute('aria-selected'), 'true');
  await page.waitForTimeout(400);
  assert.equal(await page.locator('.screen-switch-outgoing').count(), 0, 'snapshots are cleaned up');
});
await check('team tabs switch scenario and caption', async () => {
  await page.locator('#team-tab-1').scrollIntoViewIfNeeded();
  await page.locator('#team-tab-1').click();
  await page.waitForTimeout(500);
  assert.equal(await page.locator('.pw-team-dashboard').getAttribute('data-scenario'), 'devops');
  assert.match(await page.locator('.team-caption:not(.team-caption-outgoing)').textContent(), /инфраструктуры/);
  assert.equal(await page.locator('.team-caption-outgoing').count(), 0);
});
await check('illustrations render with tagged faces', async () => {
  assert.equal(await page.locator('.iso-art').count(), 8);
  assert.ok(await page.locator('.iso-art [data-face="top"]').count() > 40);
});
await check('dot patterns keep their light sweep', async () => {
  const names = await page.$$eval('.dot-glint', nodes => nodes.map(node => getComputedStyle(node).animationName));
  assert.ok(names.length >= 8);
  assert.ok(names.every(name => name === 'pw-dot-sweep'), names.join(', '));
});
await check('contact dialog opens with the right copy and submits', async () => {
  await page.locator('.pricing-plan-action').first().scrollIntoViewIfNeeded();
  await page.locator('.pricing-plan-action').first().click();
  await assert.doesNotReject(page.locator('.contact-dialog[open]').waitFor());
  assert.equal(await page.locator('#dialog-title').textContent(), 'Стоимость Пассворка');
  await page.fill('input[name=name]', 'Тест');
  await page.fill('input[name=email]', 'test@example.com');
  await page.fill('input[name=company]', 'Пример');
  await page.locator('#contact-form button[type=submit]').click();
  assert.match(await page.locator('.form-result').textContent(), /Заявка подготовлена/);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.contact-dialog[open]').count(), 0);
});
await check('no console errors during interaction', async () => assert.deepEqual(errors, []));
await page.close();

const mobile = await open(390, 844);
await check('mobile menu opens, traps focus and closes', async () => {
  const toggle = mobile.page.locator('.menu-toggle');
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(await mobile.page.evaluate(() => document.querySelector('main').inert), true);
  await mobile.page.keyboard.press('Escape');
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(await mobile.page.evaluate(() => document.querySelector('main').inert), false);
  await toggle.click();
  await mobile.page.locator('#main-nav a[href="#pricing"]').click();
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
});
await mobile.page.close();

await browser.close();
if (failures.length) { console.log(`\n${failures.length} failed`); process.exit(1); }
console.log('\nSmoke test passed');
