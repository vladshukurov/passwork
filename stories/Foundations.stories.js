import {shell} from './site-template.js';

const colors = ['--pw-page', '--pw-surface', '--pw-surface-muted', '--pw-text', '--pw-text-muted', '--pw-text-secondary', '--pw-border', '--pw-accent', '--pw-control', '--pw-focus', '--pw-art-line', '--pw-art-hover-face'];
const space = ['--pw-space-1','--pw-space-2','--pw-space-3','--pw-space-4','--pw-space-5','--pw-space-6','--pw-space-7','--pw-space-8','--pw-space-10','--pw-space-12','--pw-space-14','--pw-space-16'];
const radii = ['--pw-radius-control','--pw-radius-window','--pw-radius-card','--pw-radius-dialog'];

export default {title: 'Основы/Токены', parameters: {docs: {description: {component: 'Значения берутся из актуального dist/passwork-tokens.css; управляйте шириной Storybook, чтобы увидеть адаптивные токены.'}}}};

export const Palette = {
  render: () => {
    const root = shell({title: 'Цвета', description: 'Текущие CSS custom properties — не придуманные дубликаты.'});
    const grid = document.createElement('div'); grid.className = 'story-token-grid';
    for (const token of colors) {
      const item = document.createElement('div'); item.className = 'story-token';
      const color = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
      item.innerHTML = `<div class="story-token-swatch"></div><code>${token}<br>${color}</code>`;
      item.firstElementChild.style.background = color;
      grid.append(item);
    }
    root.append(grid); return root;
  },
};

export const TypeAndSpacing = {
  render: () => {
    const root = shell({title: 'Типографика и размеры', description: 'Museo — рабочий шрифт сайта. Здесь видны используемые масштабы, интервалы и радиусы.'});
    const samples = document.createElement('div'); samples.style.cssText = 'display:grid;gap:22px;max-width:900px';
    for (const [label, style] of [['H1','font-size:clamp(38px,4vw,64px);line-height:1.06'],['H2','font-size:var(--pw-heading-size);line-height:var(--pw-heading-leading)'],['Lead','font-size:var(--pw-lead-size);line-height:var(--pw-lead-leading)'],['Body','font-size:16px;line-height:24px'],['Caption','font-size:14px;line-height:20px']]) {
      const row = document.createElement('div'); row.innerHTML = `<code style="display:block;font:12px monospace;color:#6f7988">${label}</code><span style="${style}">Защита данных под вашим контролем</span>`; samples.append(row);
    }
    root.append(samples);
    const chips = document.createElement('div'); chips.className='story-row'; chips.style.marginTop='36px';
    for (const token of [...space, ...radii]) { const chip=document.createElement('code'); chip.className='story-token'; chip.style.minHeight='auto'; chip.textContent=`${token}: ${getComputedStyle(document.documentElement).getPropertyValue(token).trim()}`; chips.append(chip); }
    root.append(chips); return root;
  },
};
