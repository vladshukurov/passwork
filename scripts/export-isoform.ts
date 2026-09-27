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
// Alternate geometry the page morphs to on hover (same topology as at rest).
const morphs: Record<string, Record<string, any>> = {
  storage: { 'drawer-2': box('drawer-2', -78, 90, T + 92, 156, 64, 34) },
};
const lidded = (id: string, x: number, y: number, size: number, height: number) => [
  box(`${id}-base`, x, y, T, size, size, height),
  plate(`${id}-lid`, x, y, T + height, size, size, 'none', 12),
];

const scenes: Record<string, { name: string; objects: any[]; order?: string[] }> = {
  government: { name: 'Государственная информационная система', objects: [
    plate('civic-step', -120, -120, T, 240, 240, 'none', T),
    ...[-100, 10].flatMap((x, col) => [-100, 10].map((y, row) =>
      box(`registry-${col}-${row}`, x, y, 2 * T, 90, 90, 36))),
    plate('civic-platform', -110, -110, 64, 220, 220, 'none', T),
    box('civic-core', -50, -50, 78, 100, 100, 56),
  ], order: ['civic-step', 'registry-0-0', 'registry-0-1', 'registry-1-0', 'registry-1-1', 'civic-platform', 'civic-core'] },
  infrastructure: { name: 'Резервируемая инфраструктура', objects: [
    ...[-120, 20].flatMap((x, tower) => [
      ...[0, 1, 2].map(level => box(`server-${tower}-${level}`, x, -60, T + level * 38, 100, 120, 32)),
      plate(`server-cap-${tower}`, x - 5, -65, T + 3 * 38, 110, 130, 'none', 10),
    ]),
  ], order: ['server-0-0', 'server-0-1', 'server-0-2', 'server-cap-0', 'server-1-0', 'server-1-1', 'server-1-2', 'server-cap-1'] },
  production: { name: 'Технологическая установка', objects: [
    // Three equal tanks on a frame, joined overhead by one continuous pipe.
    plate('frame', -170, -60, T, 340, 120, 'none', 14),
    ...[-110, 0, 110].map((cx, i) => box(`tank-${i}`, cx - 40, -40, 2 * T, 80, 80, 120)),
    ...[-110, 0, 110].map((cx, i) => box(`riser-${i}`, cx - 8, -8, 2 * T + 120, 16, 16, 20)),
    box('pipe', -118, -8, 2 * T + 140, 236, 16, 14),
  ], order: ['frame', 'tank-0', 'tank-1', 'tank-2', 'riser-0', 'riser-1', 'riser-2', 'pipe'] },
  personal: { name: 'Изолированные персональные данные', objects: [
    // A record inside two isolation rings; walls are split so the painter
    // draws back walls, the record, then front walls.
    ...ring('outer', 120, 34), ...ring('inner', 78, 60),
    box('record', -34, -34, T, 68, 68, 92),
  ], order: ['outer-back-x', 'outer-back-y', 'inner-back-x', 'inner-back-y', 'record', 'inner-front-y', 'inner-front-x', 'outer-front-y', 'outer-front-x'] },
  storage: { name: 'Защищённое хранилище', objects: [
    // A filing safe; drawer fronts sit flush and the top drawer slides out
    // (see morphs below) instead of the whole block moving.
    // Equal 12-unit margins and 6-unit gaps; fronts stand 8 units proud.
    box('safe-body', -90, -90, T, 180, 180, 138),
    ...[0, 1, 2].map(i => box(`drawer-${i}`, -78, 90, T + 12 + i * 40, 156, 8, 34)),
  ], order: ['safe-body', 'drawer-0', 'drawer-1', 'drawer-2'] },
  cicd: { name: 'Передача секретов в CI/CD', objects: [
    ...lidded('source', -130, -130, 80, 90),
    box('route-right', -50, -98, 30, 100, 16, T),
    box('route-left', -98, -50, 30, 16, 100, T),
    ...lidded('right', 50, -130, 80, 30),
    ...lidded('left', -130, 50, 80, 30),
  ], order: ['source-base', 'source-lid', 'route-right', 'route-left', 'right-base', 'right-lid', 'left-base', 'left-lid'] },
  config: { name: 'Параметры конфигурации', objects: [
    // Three switches; hover flips them.
    ...[0, 1, 2].flatMap(i => [
      box(`switch-base-${i}`, -150 + i * 105, -65, T, 84, 130, 30),
      box(`switch-${i}`, -138 + i * 105, [-53, 12, -53][i], T + 30, 60, 50, 26),
    ]),
  ], order: ['switch-base-0', 'switch-0', 'switch-base-1', 'switch-1', 'switch-base-2', 'switch-2'] },
  access: { name: 'Гранулярные права доступа', objects: [
    ...[0, 1, 2].flatMap(col => [0, 1, 2].map(row =>
      box(`cell-${col}-${row}`, -130 + col * 90, -130 + row * 90, T, 80, 80, [[48, 32, 16], [32, 16, 32], [16, 32, 16]][col][row]))),
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
    const markup = faceData(b, style).map((f: any, i: number) =>
      `<path data-face="${f.kind}"${attr('d', f.path)}${targetFaces[i] ? attr('data-open', targetFaces[i].path) : ''}${attr('fill', tone.page)}${attr('stroke', tone.line)}/>`).join('');
    const last = runs.at(-1);
    if (last?.owner === b.owner) last.parts.push(markup); else runs.push({ owner: b.owner, parts: [markup] });
  }
  const { width: w, height: h } = scene.artboard;
  const { scale, cx, cy, area } = fit(boxes);
  if (process.env.DEBUG_FIT) console.log(scene.name, Math.round(area), scale.toFixed(3));
  const body = runs.map(r => `<g data-object="${r.owner}">${r.parts.join('')}</g>`).join('\n');
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
