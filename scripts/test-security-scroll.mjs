import assert from 'node:assert/strict';
import { chapterAt, chapterScrollTop, pinnedProgress } from '../dist/security-scroll-progress.js';

assert.equal(pinnedProgress(200, 3000, 1000), 0);
assert.equal(pinnedProgress(-1000, 3000, 1000), .5);
assert.equal(pinnedProgress(-3000, 3000, 1000), 1);

assert.deepEqual(chapterAt(0, 3), { index: 0, progress: 0 });
assert.deepEqual(chapterAt(1 / 3, 3), { index: 1, progress: 0 });
assert.deepEqual(chapterAt(.5, 3), { index: 1, progress: .5 });
assert.deepEqual(chapterAt(1, 3), { index: 2, progress: 1 });

const target = chapterScrollTop(2000, 3000, 1000, 1, 3);
assert.equal(chapterAt(pinnedProgress(2000 - target, 3000, 1000), 3).index, 1);
console.log('Security scroll math OK');
