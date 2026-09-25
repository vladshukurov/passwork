import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const security = readFileSync(new URL('../dist/security-switcher.css', import.meta.url), 'utf8');
const securityMotion = readFileSync(new URL('../dist/security-switcher.js', import.meta.url), 'utf8');
const header = readFileSync(new URL('../dist/hero-scroll.css', import.meta.url), 'utf8');
const page = readFileSync(new URL('../dist/passwork.css', import.meta.url), 'utf8');
const motion = readFileSync(new URL('../dist/site-motion-tokens.js', import.meta.url), 'utf8');
const builder = readFileSync(new URL('../scripts/build-passwork.py', import.meta.url), 'utf8');
const dashboard = readFileSync(new URL('../dist/live-dashboard.js', import.meta.url), 'utf8');
const dashboardCss = readFileSync(new URL('../dist/live-dashboard-light.css', import.meta.url), 'utf8');
const pageMotion = readFileSync(new URL('../dist/page-motion.js', import.meta.url), 'utf8');

const rule = (source, selector) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = [...source.matchAll(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, 'g'))];
  assert.ok(matches.length, `Missing CSS rule: ${selector}`);
  return matches.map(match => match[1]).join(';');
};

// Chapters must remain in their DOM order while the active detail expands.
assert.doesNotMatch(security, /\.security-story\.is-active\s*\{[^}]*\border\s*:\s*-1\b/);
assert.match(rule(security, '.security-scroll-track'), /height\s*:\s*calc\(100svh\s*\+\s*225svh\)/);
assert.match(rule(security, '.security-switcher'), /height\s*:\s*100%/);
assert.match(rule(security, '.security-switcher-grid'), /position\s*:\s*sticky/);
assert.match(rule(security, '.security-switcher-grid'), /height\s*:\s*calc\(100svh\s*-\s*var\(--security-stage-inset\)\s*-\s*var\(--security-stage-inset\)\)/);
assert.doesNotMatch(securityMotion, /ScrollTrigger\.create|pin\s*:/, 'The security pin must survive reload at its hash');
assert.match(builder, /class="security-scroll-track"/, 'The sticky section needs a scroll track');
assert.match(pageMotion, /getBoundingClientRect\(\)\.bottom <= 0/, 'Deep-link reload must skip expired entrance triggers');
assert.doesNotMatch(rule(security, '.security-story-detail p'), /height\s*:\s*4\.7em/);
assert.match(rule(security, '.security-story-detail p'), /max-width\s*:\s*min\(510px,\s*calc\(100%\s*-\s*8px\)\)/, 'Text wrapping must have room for the pin-width rounding difference');

// Both header surfaces use the same veil geometry, without blurring content.
const fade = rule(header, '.site-header.is-scroll-header::before,\n.site-header.is-scroll-header::after');
assert.match(fade, /inset\s*:\s*0\s+0\s+-52px/, 'Both header layers share the same fade extent');
assert.match(fade, /mask-image\s*:\s*var\(--header-veil-mask\)/, 'Both layers must share one opacity curve');
assert.match(rule(header, '.site-header.is-scroll-header::before'), /blue-gradient-figma\.png/, 'The blue veil should reuse the hero art');
assert.match(rule(header, '.site-header.is-scroll-header::after'), /background\s*:\s*#fff/, 'The light veil stays white');
assert.doesNotMatch(fade, /backdrop-filter/, 'Header layers must not blur page content');
assert.doesNotMatch(rule(security, '.security-switcher-stage'), /border-right\s*:/, 'Blue stage must not have a gray right stripe');
assert.doesNotMatch(rule(security, '.security-switcher-grid'), /margin-right\s*:\s*-1px/, 'The parent grid border must remain visible at the right edge');
assert.match(rule(security, '.security-stage-fade'), /display\s*:\s*none/, 'Do not fade or blur the lower illustration');
assert.match(rule(security, '.security-stage-dots'), /object-fit\s*:\s*cover/, 'Security dots must retain their square pitch instead of stretching with the stage');
assert.match(rule(security, '.security-story:not(.is-active) .security-story-heading:hover'), /color\s*:\s*#525e70/, 'Only inactive story labels change colour on hover');
assert.doesNotMatch(security, /\.security-story-heading:hover[^}]*color\s*:\s*#266df0/, 'Active story labels should not flash blue');
assert.doesNotMatch(builder, /security-code-expand/, 'The illustration must not include the unwanted Show all affordance');
assert.match(dashboard, /pw-window-chevron--back/);
assert.match(dashboardCss, /\.pw-window-chevron--forward/);

// Motion belongs inside illustrations; no decorative shadow/aura behind them.
assert.doesNotMatch(page, /\.certification-art::before/);
assert.match(rule(security, '.security-visual .security-attestation'), /border-radius\s*:\s*18px/,
  'The certification story uses the new evidence card');
assert.doesNotMatch(rule(security, '.security-visual .security-attestation'), /filter\s*:\s*blur\(/,
  'The new security evidence card must remain sharp');
assert.doesNotMatch(rule(security, '.security-visual .protection-card'), /box-shadow\s*:/);

// Keep the original blue art, but smooth its bands without blurring foreground UI.
assert.match(rule(page, '.hero-gradient'), /blue-gradient-figma\.png/, 'Keep the locally supplied hero artwork');
assert.match(rule(page, '.hero-gradient'), /filter\s*:\s*blur\(56px\)/, 'Keep the local background smoothing');
assert.doesNotMatch(rule(page, '.hero-gradient'), /background-attachment\s*:/, 'Do not change the local hero framing');
assert.match(rule(page, '.hero-dots.dot-glint,.team-scene>.scene-dots.dot-glint,.security-stage-dots.dot-glint'), /opacity\s*:\s*\.42/, 'Dot glints stay understated');
assert.match(pageMotion, /if \(document\.querySelector\('\.react-site-header'\)\) return \(\) => \{\};/,
  'React owns its stationary dots; the archived site keeps its separate one-shot treatment');
assert.match(pageMotion, /IntersectionObserver/, 'Dot glints run when their section enters view');
assert.match(rule(page, '.certification-art :is(img,.certification-svg)'), /height\s*:\s*202px/);
assert.match(motion, /layer\s*:\s*\.28\b/);

console.log('Visual contracts OK');
