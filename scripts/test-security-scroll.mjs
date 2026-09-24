import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chapterAt, chapterScrollTop, centeredChapterScrollTop, centeredSceneProgress, pinnedProgress } from '../dist/security-scroll-progress.js';

assert.equal(pinnedProgress(200, 3000, 1000), 0);
assert.equal(pinnedProgress(-1000, 3000, 1000), .5);
assert.equal(pinnedProgress(-3000, 3000, 1000), 1);

assert.deepEqual(chapterAt(0, 3), { index: 0, progress: 0 });
assert.deepEqual(chapterAt(1 / 3, 3), { index: 1, progress: 0 });
assert.deepEqual(chapterAt(.5, 3), { index: 1, progress: .5 });
assert.deepEqual(chapterAt(1, 3), { index: 2, progress: 1 });

const target = chapterScrollTop(2000, 3000, 1000, 1, 3);
assert.equal(chapterAt(pinnedProgress(2000 - target, 3000, 1000), 3).index, 1);
// The intro passes before the near-full-height gallery pins with even insets.
const intro = 350;
const gallery = 860;
const track = 3250;
const viewport = 1000;
const centeredStart = intro - (viewport - gallery) / 2;
assert.equal(centeredSceneProgress(-centeredStart, intro, gallery, track, viewport), 0);
assert.equal(centeredSceneProgress(-centeredStart - 2250, intro, gallery, track, viewport), 1);
const centeredTarget = centeredChapterScrollTop(2000, intro, gallery, track, viewport, 1, 3);
assert.equal(chapterAt(centeredSceneProgress(2000 - centeredTarget, intro, gallery, track, viewport), 3).index, 1);
const css = readFileSync(new URL('../dist/security-switcher.css', import.meta.url), 'utf8');
const controller = readFileSync(new URL('../dist/security-switcher.js', import.meta.url), 'utf8');
const dashboardMotion = readFileSync(new URL('../dist/security-dashboard-motion.js', import.meta.url), 'utf8');
assert.match(css, /\.security-switcher-grid\s*\{\s*position:\s*sticky;\s*top:\s*var\(--security-stage-inset\)/);
assert.match(css, /\.security-switcher > \.section-intro\s*\{[^}]*border-bottom:\s*0/s,
  'The scrolling intro must not create a second line above the pinned gallery');
assert.doesNotMatch(css, /\.security-switcher > \.section-intro\s*\{[^}]*(?:padding-top|padding-bottom):/s,
  'The security introduction should inherit the same vertical padding as certification');
assert.doesNotMatch(css, /--security-intro-height:/,
  'The introduction should size to its content instead of forcing extra space below');
assert.match(css, /height:\s*calc\(100svh - var\(--security-stage-inset\) - var\(--security-stage-inset\)\)/);
assert.match(css, /\.security-visual \.protection-card\s*\{[^}]*border-radius:\s*calc\(11\.437 \* var\(--security-unit\)\);/s,
  'Security artwork should have rounded bottom corners');
assert.match(css, /\.security-story-list\s*\{[^}]*margin-bottom:\s*clamp\(56px, 7svh, 88px\)/s,
  'Pinned story list should not sit against the bottom edge');
assert.match(css, /\.security-visual \.infrastructure-card\s*\{[^}]*left:\s*50%;[^}]*top:\s*50%;[^}]*transform:\s*translate\(-50%, -50%\)/s,
  'The infrastructure illustration should be centered in the stage');
assert.doesNotMatch(controller, /filter:\s*'blur\(/, 'Chapter transitions should not blur the illustrations');
assert.match(dashboardMotion, /element === card\s*\?\s*\[\{opacity: 0\}, \{opacity: 1\}\]/,
  'The illustration entrance must preserve the card centering transform');
assert.doesNotMatch(dashboardMotion, /filter:\s*`blur\(/, 'Illustration contents should appear without blur');
assert.match(controller, /centeredSceneProgress\(track\.getBoundingClientRect\(\)\.top/);
console.log('Security scroll math OK');
