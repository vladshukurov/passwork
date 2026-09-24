import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const securityCss = read('dist/security-switcher.css');
const securityJs = read('dist/security-switcher.js');
const builder = read('scripts/build-passwork.py');
const teamEngine = read('source/team-dashboards/dashboard-demo-engine.ts');
const buttonCss = read('dist/attio-buttons.css');
const vercel = JSON.parse(read('vercel.json'));

// Pinning must only run when both the content and the viewport can fit it.
assert.match(securityCss, /@media \(min-width: 901px\) and \(min-height: 761px\) and \(prefers-reduced-motion: no-preference\)\s*\{\s*\.security-scroll-track\s*\{/);
assert.match(securityJs, /matchMedia\('\(min-width: 901px\) and \(min-height: 761px\) and \(prefers-reduced-motion: no-preference\)'\)/);

// The nav anchor belongs to the track start, not the sticky child mid-scroll.
assert.match(builder, /class="security-scroll-track" id="security"/);
assert.doesNotMatch(builder, /class="security-switcher" id="security"/);

// Selecting a story keeps focus on its button, including keyboard arrows.
assert.doesNotMatch(securityJs, /gallery\.focus\(/);
assert.match(securityJs, /buttons\[next\]\.focus\(/);

// Offscreen, hidden and reduced-motion demos must have no queued animation frame.
assert.match(teamEngine, /function syncPlayback\(/);
assert.match(teamEngine, /cancelAnimationFrame\(raf\)/);

// Only the generated HTML needs versioned entry points; imports revalidate normally.
assert.match(builder, /asset_version\s*=/);
for (const path of ['dist/passwork.js', 'dist/page-motion.js', 'dist/hero-scroll.js', 'dist/security-switcher.js', 'dist/screen-transitions.js', 'dist/client-logos.js']) {
  assert.doesNotMatch(read(path), /from\s*['"][^'"]+\?v=/, `${path} has a manually versioned import`);
}

const csp = vercel.headers?.flatMap(entry => entry.headers ?? []).find(header => header.key.toLowerCase() === 'content-security-policy');
const localCsp = read('serve.py').match(/self\.send_header\('Content-Security-Policy', "([^"]+)"\)/)?.[1];
assert.ok(localCsp, 'Local CSP was not found');
assert.equal(csp?.value, localCsp, 'Production CSP differs from local preview');

assert.match(read('README.md'), /git clone https:\/\/github\.com\/vladshukurov\/passwork\.git/);
assert.match(read('docs/motion.md'), /однократн(?:ый|ое|ая)\s+(?:проход|свечение|блик)/);
assert.ok(!/\.button-dark:hover,[\s\S]*?--pw-button-from:\s*#2e69d3/.test(buttonCss), 'Dark CTA hover must not turn saturated blue');
assert.equal(existsSync(new URL('../dist/feature-stack.js', import.meta.url)), false, 'Dead feature stack JS remains');
assert.equal(existsSync(new URL('../dist/feature-stack.css', import.meta.url)), false, 'Dead feature stack CSS remains');

console.log('Site quality contracts OK');
