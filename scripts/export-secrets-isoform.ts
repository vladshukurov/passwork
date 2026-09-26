// Run with Isoform Studio's tsx, passing its directory as the first argument.
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const studio = process.argv[2];
if (!studio) throw new Error('Pass the Isoform Studio directory');
const load = (file: string) => import(pathToFileURL(resolve(studio, file)).href);
const { svgString } = await load('src/export/svg.ts');
const { makeNode, sceneSchema } = await load('src/scene/schema.ts');
const { architecturalStudies } = await load('src/presets/architectural-studies.ts');
const style = {
  background: '#fafafb', stroke: '#a7b1bf', secondaryStroke: '#a7b1bf',
  strokeWidth: .85, fill: '#f7f8fb', fillOpacity: 1,
  hiddenStroke: '#a7b1bf', hiddenStrokeOpacity: 0, hiddenDash: [],
  cornerRadius: 0, topFillOpacity: 1, leftFillOpacity: 1, rightFillOpacity: 1,
};
const piece = (id: string, type: string, x: number, y: number, z: number, geometry: object) => ({
  ...makeNode(type, id), id, transform: { x, y, z }, geometry: { ...makeNode(type).geometry, ...geometry },
});
const box = (id: string, x: number, y: number, z: number, width: number, depth: number, height: number) => piece(id, 'box', x, y, z, {width, depth, height});
const plate = (id: string, x: number, y: number, z: number, width=120, depth=120, motif='none') => piece(id, 'slab', x, y, z, {width, depth, thickness:18, motif});
const wire = (id: string, x: number, y: number, z: number, dx: number, dy: number, dz: number) => ({...piece(id,'wire',x,y,z,{}),end:{x:dx,y:dy,z:dz}});
const corner = (id: string, x: number, y: number, z: number, size: number, height: number, side='back') => piece(id,'corner',x,y,z,{width:size,depth:size,height,thickness:18,cornerSide:side});
const storage = architecturalStudies['Study 04 · Nested Corners']();
const rename = (nodes: any[]) => nodes.forEach((n:any) => { n.id=n.name.toLowerCase().replace(/[^a-z0-9]+/g,'-'); if(n.children)rename(n.children); });
rename(storage.objects);
const scenes = {
  government: {name:'Государственная информационная система',objects:[
    plate('civic-foundation',-150,-150,0,300,300),
    ...[-110,15].flatMap((x,col)=>[-110,15].map((y,row)=>
      box(`registry-${col}-${row}`,x,y,30,95,95,46))),
    plate('civic-platform',-112,-112,96,224,224),
    box('civic-core',-54,-54,136,108,108,60),
  ]},
  infrastructure: {name:'Резервируемая инфраструктура',objects:[
    plate('network-base',-180,-100,0,360,200),
    wire('network-link',-80,0,25,160,0,0),
    ...[-145,45].flatMap((x,tower)=>[0,1,2].map((level)=>
      box(`server-${tower}-${level}`,x,-60,30+level*48,100,120,34))),
  ]},
  production: {name:'Управляемая производственная линия',objects:[
    plate('line-base',-180,-70,0,400,140),
    box('conveyor',-150,-38,18,345,76,20),
    ...[-125,-15,95].map((x,i)=>box(`part-${i}`,x,-25,38,40,50,35)),
    box('press-support',-40,-65,18,90,18,142),
    box('press-head',-40,-47,125,90,92,24),
  ]},
  personal: {name:'Изолированные ячейки персональных данных',objects:[
    plate('cells-base',-135,-110,0,270,270),
    corner('cells-boundary',-135,-110,18,270,105),
    ...[-95,25].flatMap((x,col)=>[-65,55].map((y,row)=>
      box(`cell-${col}-${row}`,x,y,18,85,80,58))),
  ]},
  storage: {name:'Защищённое хранилище',objects:storage.objects},
  cicd: {name:'Передача секретов в CI/CD',objects:[
    wire('route-source',0,0,60,0,0,220), wire('route-left',-20,20,40,-75,140,-22), wire('route-right',20,-20,40,140,-75,-22),
    plate('source-base',-80,-80,280,160,160),plate('source-lid',-80,-80,321,160,160),
    box('junction',-20,-20,20,40,40,40),
    plate('left-base',-175,125,0,160,160),plate('left-lid',-175,125,41,160,160),
    plate('right-base',125,-175,0,160,160),plate('right-lid',125,-175,41,160,160),
  ]},
  config: {name:'Файлы конфигурации и параметры',objects:[
    plate('foundation',-125,-100,0,250,200),
    plate('config-base',-100,-78,30,200,156,'slots'),
    plate('config-middle',-100,-78,72,200,156,'slots'),
    plate('config-top',-100,-78,114,200,156,'slots'),
  ]},
  access: {name:'Уровни доступа к секрету',objects:[
    corner('outer-boundary',-190,-190,0,380,128),
    corner('inner-boundary',-125,-125,0,250,83),
    box('protected-core',-42,-42,32,84,84,70),
    box('gate-left',-166,147,0,266,22,72),
    box('gate-right',147,-166,0,22,266,72),
  ]},
};
const destination=resolve('dist/passwork-assets/secrets-isoform');
mkdirSync(destination,{recursive:true});
for (const [key, definition] of Object.entries(scenes)) {
  const scene=sceneSchema.parse({version:'1.0',...definition,artboard:{width:600,height:600,padding:64},stylePreset:style});
  // Keep strokes in screen units, exactly like the FSTEK artwork.
  let svg=svgString(scene).replace(/stroke-width="[^"]+"/g,'stroke-width="0.85" vector-effect="non-scaling-stroke"');
  // Intersecting structures need an explicit painter order: roofs cover columns,
  // and network routes sit on the platform rather than underneath its opaque face.
  const orders: Record<string,string[]> = {
    government:['civic-foundation','registry-0-0','registry-0-1','registry-1-0','registry-1-1','civic-platform','civic-core'],
    infrastructure:['network-base','network-link','server-0-0','server-0-1','server-0-2','server-1-0','server-1-1','server-1-2'],
  };
  if(orders[key]) {
    const groups=new Map([...svg.matchAll(/<g data-object="([^"]+)">[\s\S]*?<\/g>/g)].map(m=>[m[1],m[0]]));
    let cursor=0;
    svg=svg.replace(/<g data-object="[^"]+">[\s\S]*?<\/g>/g,()=>groups.get(orders[key][cursor++])!);
  }
  writeFileSync(resolve(destination,`${key}.svg`),svg);
  writeFileSync(resolve(destination,`${key}.scene.json`),JSON.stringify(scene,null,2)+'\n');
}
console.log('Exported editable Isoform scenes and SVG illustrations');
