import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { poses } from '../src/motion/isoform-motion.js';

// Every animated piece must exist in its exported scene, and every face must
// be addressable so the page can shade it through CSS tokens.
for (const [name, pose] of Object.entries(poses)) {
  const svg = readFileSync(`src/art/isoform/${name}.svg`, 'utf8');
  const scene = JSON.parse(readFileSync(`src/art/isoform/${name}.scene.json`, 'utf8'));
  assert.ok(scene.objects.length, `${name}: editable scene is empty`);
  assert.doesNotMatch(svg, /<image|<mask|NaN|undefined/);
  const ids = [...svg.matchAll(/data-object="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${name}: duplicate animation targets`);
  for (const [target] of pose) assert.ok(ids.includes(target), `${name}: missing ${target}`);
  assert.match(svg, /data-face="top"/, `${name}: faces are not tagged`);
  assert.doesNotMatch(svg, /<ellipse|data-detail/, `${name}: surface ornament is back`);
}
assert.equal(Object.keys(poses).length, 8);
console.log('Eight Isoform scenes: tagged faces, editable sources and animation targets OK');
