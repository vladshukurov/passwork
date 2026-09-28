// Run with Isoform Studio's tsx, passing its directory as the first argument:
//   "<studio>/node_modules/.bin/tsx" scripts/export-isoform.ts "<studio>"
// Studio owns the geometry; this script owns the site's SVG markup. Every face
// carries data-face so the page can shade top/left/right through CSS tokens.
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const studio = process.argv[2];
if (!studio) throw new Error('Pass the Isoform Studio directory');
const load = (file: string) => import(pathToFileURL(resolve(studio, file)).href);
const { expandScene, makeBox, project } = await load('src/geometry/core.ts');
const { faceData } = await load('src/export/svg.ts');
const { makeNode, sceneSchema } = await load('src/scene/schema.ts');

// Fallback colours for opening the SVG outside the site; the page overrides them.
const tone = { top: '#fafafb', left: '#f0f1f4', right: '#e6e8ec', line: '#a3a9b2', page: '#fafafb' };
const style = {
  background: tone.page, stroke: tone.line, secondaryStroke: tone.line,
  strokeWidth: .85, fill: tone.top, fillOpacity: 1,
  hiddenStroke: tone.line, hiddenStrokeOpacity: 0, hiddenDash: [],
  cornerRadius: 0, topFillOpacity: 1, leftFillOpacity: 1, rightFillOpacity: 1,
};
const piece = (id: string, type: string, x: number, y: number, z: number, geometry: object) => ({
  ...makeNode(type, id), id, transform: { x, y, z }, geometry: { ...makeNode(type).geometry, ...geometry },
});
const box = (id: string, x: number, y: number, z: number, width: number, depth: number, height: number, motif = 'none') =>
  piece(id, 'box', x, y, z, { width, depth, height, motif });
const plate = (id: string, x: number, y: number, z: number, width = 120, depth = 120, motif = 'none', thickness = 18) =>
  piece(id, 'slab', x, y, z, { width, depth, thickness, motif });
const corner = (id: string, x: number, y: number, z: number, size: number, height: number, side = 'back', thickness = 18) =>
  piece(id, 'corner', x, y, z, { width: size, depth: size, height, thickness, cornerSide: side });

// Series grammar: pure line drawing (faces take the page colour), a 10-unit
// grid, one 14-unit plate/wall thickness and a fixed scale, so the eight cards
// read as one family. Objects stand on an implied ground at z = T; there is no
// pedestal. Connections are solid bars, never hairlines.
const T = 14;
// Four separate walls of a square ring of half-size r around the origin.
const ring = (id: string, r: number, height: number) => [
  box(`${id}-back-x`, -r, -r, T, 2 * r, T, height),
  box(`${id}-back-y`, -r, -r + T, T, T, 2 * r - T, height),
  box(`${id}-front-x`, -r + T, r - T, T, 2 * r - T, T, height),
  box(`${id}-front-y`, r - T, -r + T, T, T, 2 * r - 2 * T, height),
];
// Must match the cap offsets in src/motion/isoform-motion.js.
const TANK_GROWTH = [60, 36, 12];
// Alternate geometry the page morphs to on hover (same topology as at rest).
const morphs: Record<string, Record<string, any>> = {
  storage: { 'drawer-2': box('drawer-2', -78, 90, T + 106, 156, 64, 32) },
  production: Object.fromEntries([-110, 0, 110].map((cx, i) =>
    [`tank-${i}`, box(`tank-${i}`, cx - 40, -40, T + 12, 80, 80, 110 + TANK_GROWTH[i])])),
};
// Layers float with one shared gap; this is the series' depth device.
const G = 10;
const lidded = (id: string, x: number, y: number, size: number, height: number) => [
  box(`${id}-base`, x, y, T, size, size, height),
  plate(`${id}-lid`, x, y, T + height + G, size, size, 'none', 10),
];

const scenes: Record<string, { name: string; objects: any[]; order?: string[] }> = {
  // A civic building: stylobate, colonnade, entablature, stepped roof.
  government: { name: 'Государственное учреждение', objects: [
    plate('steps-1', -150, -115, T, 300, 230, 'none', 10),
    plate('steps-2', -138, -103, T + 10, 276, 206, 'none', 10),
    box('hall', -118, -92, T + 20, 236, 118, 84),
    ...[0, 1, 2, 3, 4].map(i => box(`column-${i}`, -118 + i * 54.5, 62, T + 20, 18, 18, 84)),
    plate('entablature', -134, -99, T + 104 + G, 268, 196, 'none', 12),
    plate('roof-1', -116, -81, T + 116 + 2 * G, 232, 160, 'none', 10),
    plate('roof-2', -90, -55, T + 126 + 3 * G, 180, 108, 'none', 10),
  ], order: ['steps-1', 'steps-2', 'hall', 'column-0', 'column-1', 'column-2', 'column-3', 'column-4', 'entablature', 'roof-1', 'roof-2'] },
  infrastructure: { name: 'Резервируемая инфраструктура', objects: [
    // Two racks of floating server slabs, each under a cap.
    ...[-120, 20].flatMap((x, tower) => [
      ...[0, 1, 2].map(level => box(`server-${tower}-${level}`, x, -60, T + level * (28 + G), 100, 120, 28)),
      plate(`server-cap-${tower}`, x - 5, -65, T + 3 * (28 + G), 110, 130, 'none', 8),
    ]),
  ], order: ['server-0-0', 'server-0-1', 'server-0-2', 'server-cap-0', 'server-1-0', 'server-1-1', 'server-1-2', 'server-cap-1'] },
  production: { name: 'Технологическая установка', objects: [
    // Three tanks with floating caps on a double frame; on hover the tanks
    // grow (see morphs) and the caps ride up with them.
    plate('frame-base', -180, -70, T - 18, 360, 140, 'none', 8),
    plate('frame', -170, -60, T, 340, 120, 'none', 12),
    ...[-110, 0, 110].map((cx, i) => box(`tank-${i}`, cx - 40, -40, T + 12, 80, 80, 110)),
    ...[-110, 0, 110].map((cx, i) => plate(`tank-cap-${i}`, cx - 40, -40, T + 122 + G, 80, 80, 'none', 8)),
  ], order: ['frame-base', 'frame', 'tank-0', 'tank-cap-0', 'tank-1', 'tank-cap-1', 'tank-2', 'tank-cap-2'] },
  // A person inside the isolation rings.
  personal: { name: 'Человек внутри колец изоляции', objects: [
    ...ring('outer', 120, 24), ...ring('inner', 78, 36),
    box('body', -28, -20, T, 56, 40, 78),
    box('head', -16, -16, T + 78 + G, 32, 32, 32),
  ], order: ['outer-back-x', 'outer-back-y', 'inner-back-x', 'inner-back-y', 'body', 'head', 'inner-front-y', 'inner-front-x', 'outer-front-y', 'outer-front-x'] },
  storage: { name: 'Защищённое хранилище', objects: [
    // A filing safe on a floating plinth under a floating lid. Drawer fronts
    // have even 12-unit margins; the top one slides out (see morphs).
    plate('safe-plinth', -100, -100, T, 200, 200, 'none', 8),
    box('safe-body', -90, -90, T + 8 + G, 180, 180, 130),
    ...[0, 1, 2].map(i => box(`drawer-${i}`, -78, 90, T + 30 + i * 38, 156, 8, 32)),
    plate('safe-lid', -96, -96, T + 148 + G, 192, 192, 'none', 8),
  ], order: ['safe-plinth', 'safe-body', 'drawer-0', 'drawer-1', 'drawer-2', 'safe-lid'] },
  cicd: { name: 'Передача секретов в CI/CD', objects: [
    ...lidded('source', -130, -130, 80, 90),
    box('route-right', -50, -98, 30, 100, 16, T),
    box('route-left', -98, -50, 30, 16, 100, T),
    ...lidded('right', 50, -130, 80, 30),
    ...lidded('left', -130, 50, 80, 30),
  ], order: ['source-base', 'source-lid', 'route-right', 'route-left', 'right-base', 'right-lid', 'left-base', 'left-lid'] },
  config: { name: 'Параметры конфигурации', objects: [
    // A control panel: body, floating deck, three switch bases and switches.
    plate('panel-body', -165, -85, T, 330, 170, 'none', 16),
    ...[0, 1, 2].flatMap(i => [
      box(`switch-base-${i}`, -150 + i * 105, -65, T + 16 + G, 84, 130, 20),
      box(`switch-${i}`, -136 + i * 105, [-53, 17, -53][i], T + 46, 56, 40, 22),
    ]),
  ], order: ['panel-body', ...[0, 1, 2].flatMap(i => [`switch-base-${i}`, `switch-${i}`])] },
  access: { name: 'Гранулярные права доступа', objects: [
    // Each permission: a tile with a floating block whose height is its level.
    ...[0, 1, 2].flatMap(col => [0, 1, 2].flatMap(row => [
      plate(`tile-${col}-${row}`, -130 + col * 90, -130 + row * 90, T, 80, 80, 'none', 8),
      box(`cell-${col}-${row}`, -122 + col * 90, -122 + row * 90, T + 8 + G, 64, 64, [[44, 28, 14], [28, 14, 28], [14, 28, 14]][col][row]),
    ])),
  ] },
};

// Every scene is scaled to the same silhouette area (convex hull of the
// projected geometry) so light scenes don't look small next to dense ones,
// then capped to the frame and centred.
const TARGET_AREA = Number(process.env.TARGET_AREA ?? 72000), MAX_W = 440, MAX_H = 380;
function hull(points: { x: number; y: number }[]) {
  const p = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o: any, a: any, b: any) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const half = (list: any[]) => list.reduce((h: any[], q) => {
    while (h.length > 1 && cross(h.at(-2), h.at(-1), q) <= 0) h.pop();
    h.push(q); return h;
  }, []);
  return [...half(p).slice(0, -1), ...half(p.reverse()).slice(0, -1)];
}
function fit(boxes: any[]) {
  const points = boxes.flatMap((b: any) => makeBox(b).getVertices().map(project));
  const h = hull(points);
  const area = Math.abs(h.reduce((sum, p, i) => sum + p.x * h[(i + 1) % h.length].y - h[(i + 1) % h.length].x * p.y, 0)) / 2;
  const xs = points.map(p => p.x), ys = points.map(p => p.y);
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const scale = Math.min(Math.sqrt(TARGET_AREA / area), MAX_W / (maxX - minX), MAX_H / (maxY - minY));
  return { scale, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, area };
}
const attr = (name: string, value: string | number) => ` ${name}="${value}"`;
function render(scene: any, order?: string[], open: Record<string, any> = {}) {
  const boxes = expandScene(scene).sort((a: any, b: any) => (a.x + a.y + a.z) - (b.x + b.y + b.z));
  // Stable painter order: explicit order for intersecting structures, then depth.
  if (order) boxes.sort((a: any, b: any) => order.indexOf(a.owner) - order.indexOf(b.owner));
  const runs: { owner: string; parts: string[] }[] = [];
  for (const b of boxes) {
    const target = open[b.owner] && expandScene({ ...scene, objects: [open[b.owner]] })[0];
    const targetFaces = target ? faceData(target, style) : [];
    const faces = faceData(b, style).map((f: any, i: number) =>
      `<path data-face="${f.kind}"${attr('d', f.path)}${targetFaces[i] ? attr('data-open', targetFaces[i].path) : ''}${attr('fill', tone.page)}${attr('stroke', tone.line)}/>`).join('');
    // Silhouette drawn a touch heavier than inner edges: the object reads
    // as one solid, and later objects still cover it in painter order.
    const outlinePath = (box: any) => 'M ' + hull(makeBox(box).getVertices().map(project))
      .map((p: any) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' L ') + ' Z';
    const markup = faces + `<path data-edge="outline"${attr('d', outlinePath(b))}${target ? attr('data-open', outlinePath(target)) : ''} fill="none"${attr('stroke', tone.line)}/>`;
    const last = runs.at(-1);
    if (last?.owner === b.owner) last.parts.push(markup); else runs.push({ owner: b.owner, parts: [markup] });
  }
  const { width: w, height: h } = scene.artboard;
  const { scale, cx, cy, area } = fit(boxes);
  if (process.env.DEBUG_FIT) console.log(scene.name, Math.round(area), scale.toFixed(3));
  // Hover target: the silhouette of the figure at rest. It never moves, so
  // the hover follows the figure itself, not the card or the moving parts.
  const hit = 'M ' + hull(boxes.flatMap((b: any) => makeBox(b).getVertices().map(project)))
    .map((p: any) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' L ') + ' Z';
  const body = `<path data-hit d="${hit}" fill="none" stroke="none"/>\n`
    + runs.map(r => `<g data-object="${r.owner}">${r.parts.join('')}</g>`).join('\n');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><title>${scene.name}</title>`
    + `<g data-iso stroke-width="0.85" stroke-linejoin="round" transform="translate(${w / 2} ${h / 2}) scale(${scale.toFixed(4)}) translate(${(-cx).toFixed(2)} ${(-cy).toFixed(2)})">\n${body}\n</g></svg>`;
  return svg.replace(/<path /g, '<path vector-effect="non-scaling-stroke" ');
}

const destination = resolve('src/art/isoform');
mkdirSync(destination, { recursive: true });
for (const [key, { order, ...definition }] of Object.entries(scenes)) {
  const scene = sceneSchema.parse({ version: '1.0', ...definition, artboard: { width: 600, height: 600, padding: 64 }, stylePreset: style });
  writeFileSync(resolve(destination, `${key}.svg`), render(scene, order, morphs[key]));
  writeFileSync(resolve(destination, `${key}.scene.json`), JSON.stringify(scene, null, 2) + '\n');
}
console.log('Exported editable Isoform scenes and SVG illustrations');
