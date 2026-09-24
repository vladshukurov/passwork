import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const css = read('react/src/figma-2026.css');
const motion = read('dist/page-motion.js');
const navigation = read('react/src/section-navigation.js');

// The React page has long pinned scenes. Native smooth hash navigation must
// not animate a footer-to-top jump through every intermediate scene.
assert.match(css, /html\s*\{\s*scroll-behavior:\s*auto\s*!important\s*;/,
  'Pinned scenes must not inherit whole-page native smooth scroll');
assert.match(navigation, /footer a\[href\^="#"\]/, 'Footer anchors should use the controlled navigation');
assert.match(navigation, /behavior: 'instant'/, 'Long journeys should bypass intermediate pinned scenes');
assert.match(navigation, /behavior: 'smooth'/, 'The final approach should still scroll smoothly');

// A glint should be perceptible on entry, recur without a long invisible wait,
// and restart after returning to a section, while still pausing offscreen.
assert.match(motion, /sweep\.restart\(\)/, 'Dot sweep should restart when its section re-enters view');
assert.match(motion, /repeatDelay:recurring\?[0-6]:0/, 'Visible dot fields should not wait nine seconds between passes');
assert.match(css, /\.react-site-header ~ main \.hero-dots\.dot-glint,[\s\S]*?opacity:\s*\.3[5-9]/,
  'Hero, team and security dots need a readable moving highlight');
assert.match(css, /\.pricing-plan-glint\.dot-glint\s*\{[^}]*opacity:\s*\.3[5-9]/s,
  'Featured pricing dots need a readable moving highlight');
assert.match(css, /\.dark-heading-dots\s*\{[^}]*width:\s*1212px;[^}]*height:\s*866px/s,
  'Dark section headings must use the Figma dot pattern geometry');

// Four trust symbols have very different transparent margins in their square
// source files. Their displayed sizes must be balanced optically.
assert.match(css, /\.trust-card-registry \.trust-card-art\s*\{[^}]*width:\s*min\(298px/s);
assert.match(css, /\.trust-card-bugbounty \.trust-card-art\s*\{[^}]*width:\s*min\(295px/s);
assert.match(css, /\.trust-card-fsb \.trust-card-art\s*\{[^}]*width:\s*min\(163px/s);
assert.match(css, /\.trust-card-fstek \.trust-card-art\s*\{[^}]*width:\s*min\(163px/s);

console.log('Motion, anchor navigation and trust-card balance OK');
