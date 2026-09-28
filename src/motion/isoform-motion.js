// Isoform artwork motion. Poses are written in scene space (x, y, z) and
// projected with the same 30° isometry as Isoform Studio, so every piece
// travels along a real axis of the drawing.
import {siteMotion} from './site-motion-tokens.js';

const COS = Math.cos(Math.PI / 6), SIN = Math.sin(Math.PI / 6);
const iso = ([x = 0, y = 0, z = 0]) => ({x: (x - y) * COS, y: (x + y) * SIN - z});

// Per scene: how its pieces move on hover. Each piece is
// [object id, [x, y, z] offset, optional {delay, duration, ease}]; anything
// not listed rests. morphDelay staggers outlines that change shape.
// Mechanisms (drawers, switches, flow) use an in-out curve like a real part;
// layered diagrams open with the site's ease-out.
const mechanical = {ease: 'power2.inOut', enter: siteMotion.artEnter, leave: siteMotion.artLeave};
const layered = {ease: siteMotion.ease, enter: siteMotion.artEnter, leave: siteMotion.artLeave, assemble: true};

export const scenes = {
  // Tiers of a layered system separate vertically.
  government: {...layered, pieces: [
    ['entablature', [0, 0, 16], {delay: 0}],
    ['roof-1', [0, 0, 30], {delay: .04}],
    ['roof-2', [0, 0, 46], {delay: .08}],
  ]},
  // Servers slide out of both racks in a cascade, like drawers on rails.
  infrastructure: {...mechanical, pieces: [0, 1].flatMap(tower => [0, 1, 2].map(level =>
    [`server-${tower}-${level}`, [0, [20, 42, 30][level] + tower * 10, 0], {delay: tower * .06 + (2 - level) * .04}]))},
  // Tanks grow in a wave (their outlines morph, see data-open); caps ride on top.
  production: {...mechanical, pieces: [0, 1, 2].map(i =>
    [`tank-cap-${i}`, [0, 0, [60, 36, 12][i]], {delay: i * .08}]),
    morphDelay: {'tank-0': 0, 'tank-1': .08, 'tank-2': .16}},
  // Isolation walls slide back from the record; its cap lifts.
  personal: {...mechanical, pieces: [
    ...[['back-x', [0, -1]], ['back-y', [-1, 0]], ['front-x', [0, 1]], ['front-y', [1, 0]]].flatMap(([wall, [x, y]]) => [
      [`inner-${wall}`, [x * 12, y * 12, 0]],
      [`outer-${wall}`, [x * 24, y * 24, 0], {delay: .06}],
    ]),
    ['head', [0, 0, 14], {delay: .12}],
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
  config: {...mechanical, pieces: [
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
    return node && {node, delay: options.delay ?? 0, duration: options.duration, ease: options.ease,
      ...iso(offset)};
  }).filter(Boolean);
}

// Faces with an alternate outline (data-open) change shape instead of moving,
// e.g. a drawer that grows out of its cabinet.
function morphs(svg) {
  const delays = sceneOf(svg).morphDelay ?? {};
  return [...svg.querySelectorAll('path[data-open]')].map(path =>
    ({path, rest: path.getAttribute('d'), open: path.dataset.open,
      delay: delays[path.closest('[data-object]')?.dataset.object] ?? 0}));
}

// Hover: each scene moves with its own mechanism; closing never replays delays.
export function mountArtHover(gsap, svg) {
  const {ease, enter, leave} = sceneOf(svg);
  const parts = pieces(svg);
  const shapes = morphs(svg);
  const open = () => {
    parts.forEach(part => gsap.to(part.node, {x: part.x, y: part.y, duration: part.duration ?? enter,
      ease: part.ease ?? ease, delay: part.delay, overwrite: true}));
    shapes.forEach(({path, open: d, delay}) => gsap.to(path, {attr: {d}, duration: enter, ease, delay, overwrite: true}));
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
