import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

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

console.log('React/Vercel build configuration and production assets OK');
