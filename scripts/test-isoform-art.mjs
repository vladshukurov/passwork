import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const required = {
  government: ['registry-0-0', 'registry-1-1', 'civic-platform', 'civic-core'],
  infrastructure: ['network-link', 'server-0-1', 'server-1-1'],
  production: ['press-head', 'part-0', 'part-1', 'part-2', 'conveyor'],
  personal: ['cell-0-1', 'cells-boundary'],
  storage: ['central-cube', 'left-front-rail', 'right-front-rail'],
  cicd: ['route-source', 'route-left', 'route-right', 'source-lid', 'left-lid', 'right-lid'],
  config: ['config-top', 'config-middle'],
  access: ['gate-left', 'gate-right', 'protected-core'],
};
for (const [name, targets] of Object.entries(required)) {
  const svg = readFileSync(`dist/passwork-assets/secrets-isoform/${name}.svg`, 'utf8');
  const scene = JSON.parse(readFileSync(`dist/passwork-assets/secrets-isoform/${name}.scene.json`, 'utf8'));
  assert.ok(scene.objects.length, `${name}: editable scene is empty`);
  assert.doesNotMatch(svg, /<image|<mask|NaN|undefined/);
  const ids = [...svg.matchAll(/data-object="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${name}: duplicate animation targets`);
  for (const target of targets) assert.ok(ids.includes(target), `${name}: missing ${target}`);
  assert.match(svg, /stroke-width="0.85" vector-effect="non-scaling-stroke"/);
}
console.log('Eight Isoform scenes: native vector geometry, editable sources and animation targets OK');
