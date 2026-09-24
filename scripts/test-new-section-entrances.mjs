import assert from 'node:assert/strict';

const entranceTargets = [
  '.pricing-heading', '.pricing-team-selector', '.pricing-plans',
  '.secrets .section-intro', '.secrets-cards',
  '.trust-heading', '.trust-cards', '.platforms-intro',
  '.platform-feature', '.platforms-cards',
];
const entrances = [];
const blocks = new Map(entranceTargets.map(selector => [selector, {
  selector,
  getBoundingClientRect: () => ({ bottom: 500 }),
  querySelectorAll: () => [{ className: `${selector}-child` }],
}]));

globalThis.window = {
  scrollY: 100,
  gsap: {
    registerPlugin() {},
    matchMedia: () => ({
      add(query, callback) {
        if (query === '(prefers-reduced-motion: no-preference)') callback();
      },
      revert() {},
    }),
    from(targets, options) {
      if (options.scrollTrigger) entrances.push(options.scrollTrigger.trigger.selector);
    },
  },
  ScrollTrigger: {},
};
globalThis.document = {
  querySelector: selector => blocks.get(selector) ?? null,
  querySelectorAll: () => [],
};
globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });

const { mountPageMotion } = await import('../dist/page-motion.js');
mountPageMotion();
for (const selector of entranceTargets) {
  assert.ok(entrances.includes(selector), `Missing scroll entrance for ${selector}`);
}
console.log('New section entrances are registered for pricing, secrets, trust, and platforms');
