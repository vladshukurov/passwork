import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const exists = path => existsSync(new URL(path, root));
const read = path => readFileSync(new URL(path, root), 'utf8');
const config = JSON.parse(read('vercel.json'));
const html = read('react-dist/index.html');

assert.equal(config.buildCommand, 'npm run react:build');
assert.equal(config.outputDirectory, 'react-dist');
assert.match(html, /src="\/assets\/index-[^"/]+\.js"/);
assert.doesNotMatch(html, /src="\/src\/main\.jsx"/);
for (const path of [
  'react-dist/passwork.css',
  'react-dist/code/design-tokens.css',
  'react-dist/vendor/gsap/gsap.min.js',
  'react-dist/vendor/gsap/ScrollTrigger.min.js',
  'react-dist/passwork-assets/figma-dark-heading-dots-2026.png',
  'react-dist/passwork-assets/figma-trust-fstek-2026.png',
]) assert.ok(exists(path), `Missing production asset: ${path}`);
assert.ok(!exists('react-dist/attio-original.html'), 'React deployment must not publish the archived site');
const productionJs = readdirSync(new URL('react-dist/assets/', root))
  .filter(file => file.endsWith('.js'))
  .map(file => read(`react-dist/assets/${file}`))
  .join('\n');
assert.doesNotMatch(productionJs, /Настроить вид|Скругления|Микроинтеракции/,
  'Preview-only appearance switches must not ship in production');
const appSource = read('react/src/App.jsx');
if (appSource.includes('FramePreviewControls')) {
  assert.match(appSource, /import\.meta\.env\.DEV && params\.has\('frame'\)/,
    'Local appearance switches must be development-only');
} else {
  assert.doesNotMatch(appSource, /framePreview|Настроить вид/,
    'The release source must not include appearance switches');
}
const builtFiles = [
  'react-dist/index.html',
  ...readdirSync(new URL('react-dist/assets/', root))
    .filter(file => /\.(?:js|css)$/.test(file))
    .map(file => `react-dist/assets/${file}`),
  ...readdirSync(new URL('react-dist/', root))
    .filter(file => file.endsWith('.css'))
    .map(file => `react-dist/${file}`),
];
for (const file of builtFiles) {
  for (const [asset] of read(file).matchAll(/\/(?:passwork-assets|vendor|code)\/[A-Za-z0-9_./%+-]+\.(?:png|jpe?g|webp|svg|gif|woff2?|js|css)/g)) {
    assert.ok(exists(`react-dist/${decodeURIComponent(asset.slice(1))}`), `Missing production asset ${asset} referenced by ${file}`);
  }
}

console.log('React/Vercel build configuration and production assets OK');
