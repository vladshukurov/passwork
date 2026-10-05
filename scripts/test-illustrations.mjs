import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { poses } from '../src/motion/illustration-motion.js';

// Every animated piece must exist in its exported scene, and every face must
// be addressable so the page can shade it through CSS tokens.
for (const [name, pose] of Object.entries(poses)) {
  const svg = readFileSync(`src/art/illustrations/${name}.svg`, 'utf8');
  assert.doesNotMatch(svg, /<image|<mask|NaN|undefined/);
  const ids = [...svg.matchAll(/data-object="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${name}: duplicate animation targets`);
  for (const [target] of pose) assert.ok(ids.includes(target), `${name}: missing ${target}`);
  assert.match(svg, /data-face="top"/, `${name}: faces are not tagged`);
  assert.doesNotMatch(svg, /<ellipse|data-detail/, `${name}: surface ornament is back`);
}
assert.equal(Object.keys(poses).length, 8);
// Morph targets must keep the rest outline's structure so GSAP can interpolate.
for (const name of ['storage', 'production']) {
  const svg = readFileSync(`src/art/illustrations/${name}.svg`, 'utf8');
  assert.ok(/data-open=/.test(svg), `${name}: no open state`);
  for (const [, rest, open] of svg.matchAll(/ d="([^"]+)" data-open="([^"]+)"/g))
    assert.equal(rest.replace(/[-\d.]+/g, '#'), open.replace(/[-\d.]+/g, '#'), `${name}: morph changes path structure`);
}
console.log('Eight illustrations: tagged faces and animation targets OK');
