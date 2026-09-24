import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const css = readFileSync(new URL('../dist/passwork.css', import.meta.url), 'utf8');

// The dot layer must clear only the caption's central reading area. A full-width
// bottom clip or fade leaves dots behind the label or flattens the whole scene.
assert.ok(/\.team-scene>\.scene-dots:not\(\.dot-glint\)\{[^}]*mask-image:radial-gradient\(/.test(css), 'Caption needs a local radial cutout in the regular dot layer');
assert.ok(!/\.team-scene>\.scene-dots\{clip-path:inset\(0 0 14% 0\)\}/.test(css), 'A full-width clip flattens the whole lower scene');

console.log('Team caption pattern is locally cleared');
