// Isoform artwork motion. Poses are written in scene space (x, y, z) and
// projected with the same 30° isometry as Isoform Studio, so every piece
// travels along a real axis of the drawing.
import {siteMotion} from './site-motion-tokens.js';

const COS = Math.cos(Math.PI / 6), SIN = Math.sin(Math.PI / 6);
const iso = ([x = 0, y = 0, z = 0]) => ({x: (x - y) * COS, y: (x + y) * SIN - z});

// Exploded view per scene: [object id, [x, y, z]]. Anything not listed rests.
export const poses = {
  // Every scene opens by pulling its floating layers further apart.
  government: [
    ...[0, 1].flatMap(col => [0, 1].map(row =>
      [`registry-${col}-${row}`, [col ? 14 : -14, row ? 14 : -14, 14]])),
    ['civic-platform', [0, 0, 28]],
    ['civic-core', [0, 0, 44]],
    ['civic-cap', [0, 0, 62]],
  ],
  infrastructure: [0, 1].flatMap(tower => [
    ...[0, 1, 2].map(level => [`server-${tower}-${level}`, [tower ? 12 : -12, 0, level * 10]]),
    [`server-cap-${tower}`, [tower ? 12 : -12, 0, 42]],
  ]),
  production: [
    ...[0, 1, 2].map(i => [`tank-${i}`, [0, 0, 8]]),
    ...[0, 1, 2].map(i => [`tank-cap-${i}`, [0, 0, 20]]),
    ...[0, 1, 2].map(i => [`riser-${i}`, [0, 0, 30]]),
    ['pipe', [0, 0, 40]],
  ],
  // Isolation walls step back from the record; its cap lifts.
  personal: [
    ...[['back-x', [0, -1]], ['back-y', [-1, 0]], ['front-x', [0, 1]], ['front-y', [1, 0]]].flatMap(([wall, [x, y]]) => [
      [`inner-${wall}`, [x * 12, y * 12, 0]],
      [`outer-${wall}`, [x * 24, y * 24, 0]],
    ]),
    ['record-cap', [0, 0, 24]],
  ],
  // The top drawer slides out through its morph; the lid lifts a little.
  storage: [['safe-lid', [0, 0, 18]]],
  cicd: [
    ['source-lid', [0, 0, 28]],
    ['left-lid', [0, 0, 24]],
    ['right-lid', [0, 0, 24]],
  ],
  // Switches flip to their opposite position; the deck lifts off the body.
  config: [
    ...[0, 1, 2].flatMap(i => [[`switch-base-${i}`, [0, 0, 8]], [`switch-rail-${i}`, [0, 0, 8]]]),
    ['switch-0', [0, 70, 8]], ['switch-1', [0, -70, 8]], ['switch-2', [0, 70, 8]],
  ],
  // Blocks rise to new levels; the centre permission rises furthest.
  access: [0, 1, 2].flatMap(col => [0, 1, 2].map(row =>
    [`cell-${col}-${row}`, [0, 0, [[8, 20, 8], [20, 34, 20], [8, 20, 8]][col][row]]])),
};

function pieces(svg) {
  const kind = svg.dataset.art;
  return (poses[kind] || []).map(([id, offset]) => {
    const node = svg.querySelector(`[data-object="${id}"]`);
    return node && {node, ...iso(offset)};
  }).filter(Boolean);
}

// Faces with an alternate outline (data-open) change shape instead of moving,
// e.g. a drawer that grows out of its cabinet.
function morphs(svg) {
  return [...svg.querySelectorAll('path[data-open]')].map(path =>
    ({path, rest: path.getAttribute('d'), open: path.dataset.open}));
}

// Hover: open quickly from the bottom up, close without replaying the choreography.
export function mountArtHover(gsap, svg) {
  const parts = pieces(svg);
  const shapes = morphs(svg);
  const open = () => {
    parts.forEach(({node, x, y}, i) => gsap.to(node, {
      x, y, duration: siteMotion.artEnter, ease: siteMotion.ease,
      delay: i * siteMotion.artStagger, overwrite: true,
    }));
    shapes.forEach(({path, open: d}) => gsap.to(path, {attr: {d}, duration: siteMotion.artEnter, ease: siteMotion.ease, overwrite: true}));
  };
  const close = () => {
    parts.forEach(({node}) => gsap.to(node, {
      x: 0, y: 0, duration: siteMotion.artLeave, ease: siteMotion.ease, overwrite: true,
    }));
    shapes.forEach(({path, rest: d}) => gsap.to(path, {attr: {d}, duration: siteMotion.artLeave, ease: siteMotion.ease, overwrite: true}));
  };
  const reset = () => {
    parts.forEach(({node}) => gsap.set(node, {x: 0, y: 0, overwrite: true}));
    shapes.forEach(({path, rest}) => gsap.set(path, {attr: {d: rest}, overwrite: true}));
  };
  return {open, close, reset, nodes: [...parts.map(part => part.node), ...shapes.map(shape => shape.path)]};
}

// First appearance: pieces start in the exploded pose and settle, so the
// entrance and the hover speak the same language.
export function assembleArt(gsap, svg, timeline, at = 0) {
  const parts = pieces(svg);
  timeline.from(svg, {opacity: 0, duration: siteMotion.reveal * .6, ease: 'power1.out', clearProps: 'opacity'}, at);
  parts.forEach(({node, x, y}, i) => timeline.from(node, {
    x: x * .7, y: y * .7, duration: siteMotion.artAssemble, ease: siteMotion.ease,
    clearProps: 'transform',
  }, at + i * siteMotion.artAssembleStagger));
}
