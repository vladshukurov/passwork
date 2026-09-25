import React from 'react';

// Each illustration is built from independently movable physical SVG parts.
export function SecureStorageIllustration() {
  return <svg className="secrets-illustration secrets-illustration-storage" viewBox="170 190 915 820" role="img" aria-label="Защищённое хранилище секретов" data-secret-art="storage">
    <g className="secrets-illustration-layer" data-pose="outer-left">
      <path d="M225 474 627 246v44L268 501v280l-43-24Z" />
    </g>
    <g className="secrets-illustration-layer" data-pose="outer-right">
      <path d="M627 246 1029 474v278l-41 23V501L627 290Z" />
    </g>
    <path className="secrets-illustration-detail" d="M627 290v93" />
    <g className="secrets-illustration-layer" data-pose="inner-left">
      <path d="M343 553 627 383v44L379 575v133l-36-22Z" />
    </g>
    <g className="secrets-illustration-layer" data-pose="inner-right">
      <path d="M627 383 913 553v132l-35 20V575L627 427Z" />
    </g>
    <path className="secrets-illustration-detail" d="M627 427v72" />
    <g className="secrets-illustration-layer" data-pose="core">
      <path d="m502 573 125-74 123 74-123 74Z" />
      <path d="m502 573 125 74v67L502 640Z" />
      <path d="m627 647 123-74v67l-123 74Z" />
    </g>
    <g className="secrets-illustration-layer" data-pose="front-left">
      <path d="m427 627 27-18 173 104 172-103 27 17-199 120Z" />
      <path d="m427 627 200 120v141L427 769Z" />
    </g>
    <g className="secrets-illustration-layer" data-pose="front-right">
      <path d="m627 747 199-120v142L627 888Z" />
    </g>
    <g className="secrets-illustration-layer" data-pose="bar-left">
      <path d="m279 691 47-28 265 163-43 26Z" />
      <path d="m279 691 269 161v97L279 792Z" />
      <path d="m548 852 43-26v97l-43 26Z" />
    </g>
    <g className="secrets-illustration-layer" data-pose="bar-right">
      <path d="m655 835 263-157 44 25-265 155Z" />
      <path d="m655 835 42 23v95l-42-23Z" />
      <path d="m697 858 265-155v92L697 953Z" />
    </g>
  </svg>;
}

function Stack({ x, y, pose }) {
  return <g>
    <g className="secrets-illustration-layer" data-pose={`${pose}-base`}>
      <path d={`m${x} ${y + 61} 144-84 145 84-145 84Z`} />
      <path d={`m${x} ${y + 61} 144 84v36L${x} ${y + 97}Z`} />
      <path d={`m${x + 144} ${y + 145} 145-84v36l-145 84Z`} />
    </g>
    <g className="secrets-illustration-layer" data-pose={`${pose}-lid`}>
      <path d={`m${x} ${y} 144-84 145 84-145 84Z`} />
      <path d={`m${x} ${y} 144 84v36L${x} ${y + 36}Z`} />
      <path d={`m${x + 144} ${y + 84} 145-84v36l-145 84Z`} />
    </g>
  </g>;
}

export function CicdIllustration() {
  return <svg className="secrets-illustration secrets-illustration-cicd" viewBox="130 170 995 880" role="img" aria-label="Секреты передаются по трём веткам CI/CD" data-secret-art="cicd">
    <g className="secrets-illustration-routes" fill="none">
      <path d="M627 490v98" />
      <path d="M564 692 428 775" />
      <path d="M690 692l136 83" />
    </g>
    <g className="secrets-illustration-flow" fill="none" aria-hidden="true">
      <path d="M627 490v98" />
      <path d="M564 692 428 775" />
      <path d="M690 692l136 83" />
    </g>
    <g className="secrets-illustration-layer" data-pose="top-stack">
      <path d="m482 372 145-84 145 84-145 84Z" />
      <path d="m482 372 145 84v36l-145-84Z" />
      <path d="m627 456 145-84v36l-145 84Z" />
    </g>
    <g className="secrets-illustration-layer" data-pose="top-lid">
      <path d="m482 310 145-84 145 84-145 84Z" />
      <path d="m482 310 145 84v36l-145-84Z" />
      <path d="m627 394 145-84v36l-145 84Z" />
    </g>
    <g className="secrets-illustration-layer" data-pose="node">
      <path d="m564 624 63-36 63 36-63 36Z" />
      <path d="m564 624 63 36v68l-63-36Z" />
      <path d="m627 660 63-36v68l-63 36Z" />
    </g>
    <Stack x={185} y={803} pose="stack-left" />
    <Stack x={781} y={803} pose="stack-right" />
  </svg>;
}

export function ConfigurationsIllustration() {
  return <svg className="secrets-illustration secrets-illustration-config" viewBox="245 220 820 805" role="img" aria-label="Четыре файла конфигурации на общей платформе" data-secret-art="config">
    <defs>
      <path id="config-front-panel-shape" d="M297 524 325 509 541 639v291l-25 15-219-147Z" />
      <clipPath id="config-front-panel-clip"><use href="#config-front-panel-shape" /></clipPath>
      <mask id="config-without-front" maskUnits="userSpaceOnUse" x="245" y="220" width="820" height="805">
        <path d="M245 220h820v805H245Z" fill="white" />
        <use href="#config-front-panel-shape" fill="black" />
      </mask>
    </defs>
    <image href="/passwork-assets/secrets-config-vector.svg" width="1254" height="1254" mask="url(#config-without-front)" />
    <g data-pose="config-front" clipPath="url(#config-front-panel-clip)">
      <image href="/passwork-assets/secrets-config-vector.svg" width="1254" height="1254" />
    </g>
  </svg>;
}

export function AccessIllustration() {
  return <svg className="secrets-illustration secrets-illustration-access" viewBox="110 230 1030 790" role="img" aria-label="Многоуровневая защита секрета" data-secret-art="access">
    <defs>
      <path id="access-core-shape" d="M499 570 621 497l88 88v83l-91 51-119-72Z" />
      <clipPath id="access-core-clip"><use href="#access-core-shape" /></clipPath>
      <mask id="access-without-core" maskUnits="userSpaceOnUse" x="110" y="230" width="1030" height="790">
        <path d="M110 230h1030v790H110Z" fill="white" />
        <use href="#access-core-shape" fill="black" />
      </mask>
    </defs>
    <image href="/passwork-assets/secrets-access-vector.svg" width="1254" height="1254" mask="url(#access-without-core)" />
    <g data-pose="access-core" clipPath="url(#access-core-clip)">
      <image href="/passwork-assets/secrets-access-vector.svg" width="1254" height="1254" />
    </g>
  </svg>;
}
