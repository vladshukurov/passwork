// Isoform artwork motion. Poses are written in scene space (x, y, z) and
// projected with the same 30° isometry as Isoform Studio, so every piece
// travels along a real axis of the drawing.
import {siteMotion} from './site-motion-tokens.js';

const COS = Math.cos(Math.PI / 6), SIN = Math.sin(Math.PI / 6);
const iso = ([x = 0, y = 0, z = 0]) => ({x: (x - y) * COS, y: (x + y) * SIN - z});

// Exploded view per scene: [object id, [x, y, z]]. Anything not listed rests.
export const poses = {
  government: [
    ['civic-step', [0, 0, 6]],
    ...[0, 1].flatMap(col => [0, 1].map(row =>
      [`registry-${col}-${row}`, [col ? 18 : -18, row ? 18 : -18, 14]])),
    ['civic-platform', [0, 0, 34]],
    ['civic-core', [0, 0, 64]],
  ],
  infrastructure: [0, 1].flatMap(tower => [
    ...[0, 1, 2].map(level => [`server-${tower}-${level}`, [tower ? 14 : -14, 0, level * 12]]),
    [`server-cap-${tower}`, [tower ? 14 : -14, 0, 52]],
  ]),
  // Exploded upwards in layers: tanks, risers, then the pipe.
  production: [
    ...[0, 1, 2].map(i => [`tank-${i}`, [0, 0, 10]]),
    ...[0, 1, 2].map(i => [`riser-${i}`, [0, 0, 24]]),
    ['pipe', [0, 0, 38]],
  ],
  // Isolation rings lift away from the record, outer ring highest.
  personal: [
    ...['back-x', 'back-y', 'front-x', 'front-y'].map(wall => [`inner-${wall}`, [0, 0, 22]]),
    ...['back-x', 'back-y', 'front-x', 'front-y'].map(wall => [`outer-${wall}`, [0, 0, 40]]),
  ],
  // The top drawer slides out: its geometry morphs (see data-open in the SVG).
  storage: [],
  cicd: [
    ['source-lid', [0, 0, 34]],
    ['left-lid', [0, 0, 30]],
    ['right-lid', [0, 0, 30]],
  ],
  // Switches flip to their opposite position.
  config: [['switch-0', [0, 65, 0]], ['switch-1', [0, -65, 0]], ['switch-2', [0, 65, 0]]],
  // The centre permission rises furthest; neighbours follow in rings.
  access: [0, 1, 2].flatMap(col => [0, 1, 2].map(row =>
    [`cell-${col}-${row}`, [0, 0, [[8, 22, 8], [22, 40, 22], [8, 22, 8]][col][row]]])),
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
