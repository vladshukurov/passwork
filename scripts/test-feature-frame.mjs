import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const features = readFileSync(new URL('../react/src/figma-2026.css', import.meta.url), 'utf8');
const security = readFileSync(new URL('../dist/security-switcher.css', import.meta.url), 'utf8');

assert.equal(/\.main-features-grid::before\s*\{/.test(features), false,
  'The center divider must not belong to the scrolling grid');
assert.equal(/\.main-features-sidebar\s*\{[^}]*border-right:\s*1px solid var\(--pw-border\)/.test(features), true,
  'The pinned sidebar must own the center divider');
assert.equal(/\.main-features-sidebar::after\s*\{[^}]*bottom:\s*-7svh/.test(features), true,
  'The pinned sidebar must own the bottom divider');
assert.equal(/width:\s*263\.1579%/.test(features), true,
  'Horizontal dividers must span both columns of the pinned frame');
assert.equal(/\.main-features-sidebar::before\s*\{[^}]*border-bottom:\s*1px solid var\(--pw-border\)/.test(features), true,
  'The top edge must mask content before drawing its full-width line');
assert.equal(/\.main-features-sidebar::after\s*\{[^}]*border-top:\s*1px solid var\(--pw-border\)/.test(features), true,
  'The bottom edge must mask content after drawing its full-width line');
assert.equal(/\.main-features-sidebar\.security-switcher-copy\s*\{[^}]*padding-bottom:\s*clamp\(32px,\s*4\.2vw,\s*76px\)/.test(features), true,
  'Feature bottom inset must match its horizontal inset');
assert.equal(/\.security-story-list\s*\{[^}]*margin-bottom:\s*0/.test(security), true,
  'Security navigation must not add an extra bottom gap');

console.log('Sticky feature frame checks passed');
