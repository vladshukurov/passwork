// Isoform artwork motion. Poses are written in scene space (x, y, z) and
// projected with the same 30° isometry as Isoform Studio, so every piece
// travels along a real axis of the drawing.
import {siteMotion} from './site-motion-tokens.js';

const COS = Math.cos(Math.PI / 6), SIN = Math.sin(Math.PI / 6);
const iso = ([x = 0, y = 0, z = 0]) => ({x: (x - y) * COS, y: (x + y) * SIN - z});

// Per scene: how its pieces move on hover. Each piece is
// [object id, [x, y, z] offset, optional {delay}]; anything not listed rests.
// Mechanisms (drawers, switches, flow) use an in-out curve like a real part;
// layered diagrams open with the site's ease-out.
const mechanical = {ease: 'power2.inOut', enter: .55, leave: .45};
const layered = {ease: siteMotion.ease, enter: siteMotion.artEnter, leave: siteMotion.artLeave, assemble: true};

export const scenes = {
  // Tiers of a layered system separate vertically.
  government: {...layered, pieces: [
    ['civic-platform', [0, 0, 14], {delay: 0}],
    ['civic-core', [0, 0, 26], {delay: .04}],
    ['civic-cap', [0, 0, 40], {delay: .08}],
  ]},
  // One server slides out of its rack for service.
  infrastructure: {...mechanical, pieces: [['server-1-1', [0, 32, 0]]]},
  // The coupling travels the length of the pipe: flow through the unit.
  production: {ease: 'power1.inOut', enter: 1.1, leave: .7, pieces: [['flow', [220, 0, 0]]]},
  // Isolation walls slide back from the record; its cap lifts.
  personal: {...mechanical, pieces: [
    ...[['back-x', [0, -1]], ['back-y', [-1, 0]], ['front-x', [0, 1]], ['front-y', [1, 0]]].flatMap(([wall, [x, y]]) => [
      [`inner-${wall}`, [x * 12, y * 12, 0]],
      [`outer-${wall}`, [x * 24, y * 24, 0], {delay: .06}],
    ]),
    ['record-cap', [0, 0, 18], {delay: .12}],
  ]},
  // Only the top drawer moves, through its morph (data-open).
  storage: {...mechanical, pieces: []},
  // The source opens first, then the receivers: the secret is handed over.
  cicd: {...mechanical, pieces: [
    ['source-lid', [0, 0, 22], {delay: 0}],
    ['left-lid', [0, 0, 18], {delay: .18}],
    ['right-lid', [0, 0, 18], {delay: .18}],
  ]},
  // Switches flip one after another.
  config: {...mechanical, enter: .42, leave: .36, pieces: [
    ['switch-0', [0, 70, 0], {delay: 0}],
    ['switch-1', [0, -70, 0], {delay: .08}],
    ['switch-2', [0, 70, 0], {delay: .16}],
  ]},
  // Blocks rise to new levels in a wave from the centre.
  access: {...layered, pieces: [0, 1, 2].flatMap(col => [0, 1, 2].map(row => {
    const ring = Math.max(Math.abs(col - 1), Math.abs(row - 1));
    return [`cell-${col}-${row}`, [0, 0, [34, 20, 8][ring] - (col + row) % 2 * 4], {delay: ring * .06}];
  }))},
};
export const poses = Object.fromEntries(Object.entries(scenes).map(([kind, scene]) => [kind, scene.pieces]));

function sceneOf(svg) {
  return scenes[svg.dataset.art] ?? {...layered, pieces: []};
}

function pieces(svg) {
  return sceneOf(svg).pieces.map(([id, offset, options = {}]) => {
    const node = svg.querySelector(`[data-object="${id}"]`);
    return node && {node, delay: options.delay ?? 0, ...iso(offset)};
  }).filter(Boolean);
}

// Faces with an alternate outline (data-open) change shape instead of moving,
// e.g. a drawer that grows out of its cabinet.
function morphs(svg) {
  return [...svg.querySelectorAll('path[data-open]')].map(path =>
    ({path, rest: path.getAttribute('d'), open: path.dataset.open}));
}

// Hover: each scene moves with its own mechanism; closing never replays delays.
export function mountArtHover(gsap, svg) {
  const {ease, enter, leave} = sceneOf(svg);
  const parts = pieces(svg);
  const shapes = morphs(svg);
  const open = () => {
    parts.forEach(({node, x, y, delay}) => gsap.to(node, {x, y, duration: enter, ease, delay, overwrite: true}));
    shapes.forEach(({path, open: d}) => gsap.to(path, {attr: {d}, duration: enter, ease, overwrite: true}));
  };
  const close = () => {
    parts.forEach(({node}) => gsap.to(node, {x: 0, y: 0, duration: leave, ease, overwrite: true}));
    shapes.forEach(({path, rest: d}) => gsap.to(path, {attr: {d}, duration: leave, ease, overwrite: true}));
  };
  const reset = () => {
    parts.forEach(({node}) => gsap.set(node, {x: 0, y: 0, overwrite: true}));
    shapes.forEach(({path, rest}) => gsap.set(path, {attr: {d: rest}, overwrite: true}));
  };
  return {open, close, reset, nodes: [...parts.map(part => part.node), ...shapes.map(shape => shape.path)]};
}

// First appearance: layered diagrams settle from their open pose; mechanisms
// simply fade up, since a drawer or a switch shouldn't move on its own.
export function assembleArt(gsap, svg, timeline, at = 0) {
  const parts = pieces(svg);
  timeline.from(svg, {opacity: 0, y: sceneOf(svg).assemble ? 0 : 8, duration: siteMotion.reveal * .8, ease: siteMotion.ease, clearProps: 'opacity,transform'}, at);
  if (!sceneOf(svg).assemble) return;
  parts.forEach(({node, x, y}, i) => timeline.from(node, {
    x: x * .7, y: y * .7, duration: siteMotion.artAssemble, ease: siteMotion.ease,
    clearProps: 'transform',
  }, at + i * siteMotion.artAssembleStagger));
}
