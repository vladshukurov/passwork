import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const headerCss = read('dist/hero-scroll.css');
const headerScroll = read('dist/hero-scroll.js');
const heroEngine = read('source/live-dashboard/live-dashboard-engine.ts');

// Both states use the same soft edge. The blue state samples the *existing*
// hero artwork, so a flat colour cannot form a dirty band above the UI.
assert.match(headerCss, /--header-veil-mask:\s*linear-gradient\(/);
assert.match(headerCss, /\.site-header\.is-scroll-header::before,\s*\.site-header\.is-scroll-header::after\s*\{[^}]*mask-image:\s*var\(--header-veil-mask\)/s);
assert.match(headerCss, /#000 63%/);
assert.match(headerCss, /\.site-header\.is-scroll-header::before\s*\{[^}]*blue-gradient-figma\.png/s);
assert.match(headerScroll, /--header-art-y/);
assert.match(headerCss, /\.site-header\.is-scroll-header\.is-over-product-window::after\s*\{[^}]*opacity:\s*1/s);
assert.match(headerCss, /clip-path:\s*inset\(0 var\(--header-window-right\) 0 var\(--header-window-left\)\)/);
assert.match(headerScroll, /is-over-product-window/);

// Returning from deep down the page should not measure hero descendants on
// every scroll update when the entire section is already out of view.
assert.match(headerScroll, /const heroAboveHeader = y \+ headerHeight >= heroEndY/);
assert.match(headerScroll, /!heroAboveHeader && shell\.getBoundingClientRect\(\)/);
assert.ok(
  headerScroll.indexOf('const tabsTop=tabs.getBoundingClientRect().top;', headerScroll.indexOf('const render = self =>')) <
    headerScroll.indexOf('gsap.set(hero,{', headerScroll.indexOf('const render = self =>')),
  'Read hero geometry before writing animated styles in the scroll callback'
);

// The hero cursor may wait while offscreen, but it must not keep a frame loop
// alive or redraw an unchanged frame on every refresh interval.
assert.match(heroEngine, /const waitForPlayback\s*=/);
assert.match(heroEngine, /if \(isPaused\(\)\)\s*\{\s*await waitForPlayback\(\)/);
assert.doesNotMatch(heroEngine, /if \(!isPaused\(\)\) elapsed \+=/);

console.log('Header and scroll quality contracts OK');
