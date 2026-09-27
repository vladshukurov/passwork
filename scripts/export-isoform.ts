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
const { expandScene } = await load('src/geometry/core.ts');
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

// Series grammar: every scene stands on the same 300 × 300 pedestal, uses a
// 10-unit grid, one 14-unit plate/wall thickness and a fixed scale, so the
// eight cards read as one family. Connections are solid bars, never hairlines.
const T = 14;
const pedestal = () => plate('pedestal', -150, -150, 0, 300, 300, 'none', T);
const lidded = (id: string, x: number, y: number, size: number, height: number) => [
  box(`${id}-base`, x, y, T, size, size, height),
  plate(`${id}-lid`, x, y, T + height, size, size, 'none', 12),
];

const scenes: Record<string, { name: string; objects: any[]; order?: string[] }> = {
  government: { name: 'Государственная информационная система', objects: [
    pedestal(),
    plate('civic-step', -120, -120, T, 240, 240, 'none', T),
    ...[-100, 10].flatMap((x, col) => [-100, 10].map((y, row) =>
      box(`registry-${col}-${row}`, x, y, 2 * T, 90, 90, 36))),
    plate('civic-platform', -110, -110, 64, 220, 220, 'none', T),
    box('civic-core', -50, -50, 78, 100, 100, 56),
  ], order: ['pedestal', 'civic-step', 'registry-0-0', 'registry-0-1', 'registry-1-0', 'registry-1-1', 'civic-platform', 'civic-core'] },
  infrastructure: { name: 'Резервируемая инфраструктура', objects: [
    pedestal(),
    ...[-120, 20].flatMap((x, tower) => [
      ...[0, 1, 2].map(level => box(`server-${tower}-${level}`, x, -60, T + level * 38, 100, 120, 32)),
      plate(`server-cap-${tower}`, x - 5, -65, T + 3 * 38, 110, 130, 'none', 10),
    ]),
  ], order: ['pedestal', 'server-0-0', 'server-0-1', 'server-0-2', 'server-cap-0', 'server-1-0', 'server-1-1', 'server-1-2', 'server-cap-1'] },
  production: { name: 'Роботизированная производственная ячейка', objects: [
    // A cantilever press over a conveyor: one column behind the belt, so
    // nothing stands in front of the parts.
    pedestal(),
    plate('conveyor', -130, -30, T, 260, 60, 'none', 16),
    box('column', -50, -90, T, 20, 20, 120),
    ...[-120, -60, 0, 60].map((x, i) => box(`part-${i}`, x, -20, T + 16, 40, 40, 28)),
    // Press: fixed body under the arm, a rod hidden until the head strokes.
    box('press-rod', -44, -4, 100, 8, 8, 24),
    box('press-head', -55, -15, 84, 30, 30, 26),
    box('press-body', -50, -10, 110, 20, 20, 24),
    box('press-arm', -50, -90, T + 120, 20, 100, 16),
  ], order: ['pedestal', 'conveyor', 'column', 'part-0', 'part-1', 'press-rod', 'press-head', 'press-body', 'press-arm', 'part-2', 'part-3'] },
  personal: { name: 'Изолированные ячейки персональных данных', objects: [
    pedestal(),
    corner('cells-boundary', -150, -150, T, 300, 100, 'back', T),
    ...[-100, 20].flatMap((x, col) => [-100, 20].map((y, row) =>
      box(`cell-${col}-${row}`, x, y, T, 100, 100, 50))),
  ] },
  storage: { name: 'Защищённое хранилище', objects: [
    // A filing safe: three full-width drawers, the upper one left ajar.
    pedestal(),
    box('safe-body', -90, -90, T, 180, 180, 138),
    ...[6, 6, 22].map((out, i) => box(`drawer-${i}`, -75, 90, T + 8 + i * 44, 150, out, 38)),
  ], order: ['pedestal', 'safe-body', 'drawer-0', 'drawer-1', 'drawer-2'] },
  cicd: { name: 'Передача секретов в CI/CD', objects: [
    pedestal(),
    ...lidded('source', -130, -130, 80, 90),
    box('route-right', -50, -98, 30, 100, 16, T),
    box('route-left', -98, -50, 30, 16, 100, T),
    ...lidded('right', 50, -130, 80, 30),
    ...lidded('left', -130, 50, 80, 30),
  ], order: ['pedestal', 'source-base', 'source-lid', 'route-right', 'route-left', 'right-base', 'right-lid', 'left-base', 'left-lid'] },
  config: { name: 'Файлы конфигурации и параметры', objects: [
    pedestal(),
    ...['config-base', 'config-middle', 'config-top'].map((id, level) =>
      plate(id, -110, -90, T + 26 + level * 30, 220, 180, 'none', 12)),
  ] },
  access: { name: 'Гранулярные права доступа', objects: [
    pedestal(),
    ...[0, 1, 2].flatMap(col => [0, 1, 2].map(row =>
      box(`cell-${col}-${row}`, -130 + col * 90, -130 + row * 90, T, 80, 80, [[48, 32, 16], [32, 16, 32], [16, 32, 16]][col][row]))),
  ] },
};

// Fixed for the series: the pedestal lands in the same place in every card.
const SCALE = .9, BASELINE = 100;
const attr = (name: string, value: string | number) => ` ${name}="${value}"`;
function render(scene: any, order?: string[]) {
  const boxes = expandScene(scene).sort((a: any, b: any) => (a.x + a.y + a.z) - (b.x + b.y + b.z));
  // Stable painter order: explicit order for intersecting structures, then depth.
  if (order) boxes.sort((a: any, b: any) => order.indexOf(a.owner) - order.indexOf(b.owner));
  const runs: { owner: string; parts: string[] }[] = [];
  for (const b of boxes) {
    const markup = faceData(b, style).map((f: any) =>
      `<path data-face="${f.kind}"${attr('d', f.path)}${attr('fill', (tone as any)[f.kind])}${attr('stroke', tone.line)}/>`).join('');
    const last = runs.at(-1);
    if (last?.owner === b.owner) last.parts.push(markup); else runs.push({ owner: b.owner, parts: [markup] });
  }
  const { width: w, height: h } = scene.artboard;
  const body = runs.map(r => `<g data-object="${r.owner}">${r.parts.join('')}</g>`).join('\n');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><title>${scene.name}</title>`
    + `<g data-iso stroke-width="0.85" stroke-linejoin="round" transform="translate(${w / 2} ${h / 2}) scale(${SCALE}) translate(0 ${BASELINE})">\n${body}\n</g></svg>`;
  return svg.replace(/<path /g, '<path vector-effect="non-scaling-stroke" ');
}

const destination = resolve('src/art/isoform');
mkdirSync(destination, { recursive: true });
for (const [key, { order, ...definition }] of Object.entries(scenes)) {
  const scene = sceneSchema.parse({ version: '1.0', ...definition, artboard: { width: 600, height: 600, padding: 64 }, stylePreset: style });
  writeFileSync(resolve(destination, `${key}.svg`), render(scene, order));
  writeFileSync(resolve(destination, `${key}.scene.json`), JSON.stringify(scene, null, 2) + '\n');
}
console.log('Exported editable Isoform scenes and SVG illustrations');
