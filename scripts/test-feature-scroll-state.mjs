import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { featureProgress } from '../react/src/feature-scroll-state.js';

assert.equal(featureProgress({ top: -100, height: 900 }, 1000), 1,
  'Progress must finish once the next chapter can enter the visible viewport');
assert.ok(featureProgress({ top: 100, height: 900 }, 1000) < 1,
  'Progress must remain partial while the current chapter still fills the viewport');

const css = readFileSync(new URL('../react/src/figma-2026.css', import.meta.url), 'utf8');
assert.match(css, /\.main-features-sidebar::before\s*,\s*\.main-features-sidebar::after/,
  'The pinned sidebar must own persistent top and bottom horizontal dividers');

console.log('Feature scroll state checks passed');
