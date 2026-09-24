import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const app = read('react/src/App.jsx');
const css = read('react/src/figma-2026.css');
const header = read('react/src/header-surface.css');

assert.match(app, /const HERO_SURFACE_EXPERIMENT = false;/);
assert.match(app, /className=\{HERO_SURFACE_EXPERIMENT \? 'hero-surface-experiment' : ''\}/);
assert.equal((app.match(/<SectionHeroSurface \/>/g) || []).length, 2);
assert.match(app, /section-hero-dots" src="\/passwork-assets\/imgVector1\.svg"/);
assert.match(app, /section-hero-dots dot-glint" src="\/passwork-assets\/imgVector1\.svg"/);
assert.match(css, /\.section-hero-surface\s*\{\s*display:\s*none;/);
assert.match(css, /main\.hero-surface-experiment :is\(\.pricing, \.trust\)/);
assert.match(css, /section-hero-gradient\s*\{[^}]*blue-gradient-figma\.png/s);
assert.match(css, /main\.hero-surface-experiment \.pricing-range-wrap::before\s*\{[^}]*#e5f2ff[^}]*#143a6dad/s);
assert.match(css, /main\.hero-surface-experiment \.pricing-plan-featured\s*\{[^}]*#142d51/s);
assert.match(header, /\.react-site-header\.hero-surface-experiment\.is-scroll-header\.is-over-dark-section::after/);

console.log('Reversible Hero surface experiment OK');
