import assert from 'node:assert/strict';
import { featureProgress } from '../src/lib/feature-scroll-state.js';

assert.equal(featureProgress({ top: -100, height: 900 }, 1000), 1,
  'Progress must finish once the next chapter can enter the visible viewport');
assert.ok(featureProgress({ top: 100, height: 900 }, 1000) < 1,
  'Progress must remain partial while the current chapter still fills the viewport');

console.log('Feature scroll state checks passed');
