import {fromSite, shell, note} from './site-template.js';

export default {
  title: 'Компоненты/Кнопки',
  args: {label: 'Запросить демо', variant: 'dark', size: 'normal', disabled: false},
  argTypes: {
    label: {control: 'text', description: 'Текст кнопки'},
    variant: {control: 'select', options: ['light', 'dark', 'outline'], description: 'Реальные палитры .button'},
    size: {control: 'select', options: ['normal', 'small', 'header'], description: 'Обычная, наследуемая компактная или CTA хедера'},
    disabled: {control: 'boolean', description: 'Нативное disabled'},
  },
  parameters: {docs: {description: {component: 'Один базовый .button и палитры .button-dark/.button-outline. .button-small сейчас не используется на странице и показан как кандидат на удаление.'}}},
};

export const Playground = {
  render: args => {
    const blue = args.variant !== 'dark';
    const root = shell({title: 'Кнопка', description: 'Наведите курсор, нажмите Tab и переключите disabled.', blue});
    const row = document.createElement('div'); row.className='story-row';
    const button = fromSite('.hero-actions .button');
    button.textContent = args.label;
    button.className = ['button', args.variant === 'dark' && 'button-dark', args.variant === 'outline' && 'button-outline', args.size === 'small' && 'button-small', args.size === 'header' && 'header-demo'].filter(Boolean).join(' ');
    button.disabled = args.disabled;
    button.removeAttribute('data-dialog');
    if (args.size === 'header') { const header=document.createElement('div'); header.className=`site-header${blue ? '' : ' is-past-hero'}`; header.style.cssText='position:relative;inset:auto;width:fit-content;height:72px;padding:14px'; header.append(button); row.append(header); }
    else row.append(button);
    root.append(row);
    note(root, 'Контрольные состояния: hover — спокойный контраст, focus-visible — явный контур, active — нажатие, disabled — недоступно.');
    return root;
  },
};

export const AllVariants = {
  render: () => {
    const root = shell({title: 'Все варианты рядом', description: 'Так проще увидеть, где варианты различаются только цветом, а где меняется геометрия.'});
    for (const [name, variant, blue] of [['Белая CTA','button',true],['Контурная CTA','button button-outline',true],['Тёмная CTA','button button-dark',false],['Компактная (не используется)','button button-small',false]]) {
      const frame=document.createElement('div'); frame.className=`story-row${blue ? ' story-shell--blue' : ''}`; frame.style.cssText='padding:24px;margin:8px 0;border-radius:8px;max-width:620px';
      const label=document.createElement('span'); label.textContent=name; label.style.width='210px';
      const button=document.createElement('button'); button.className=variant; button.textContent='Запросить демо';
      frame.append(label,button); root.append(frame);
    }
    return root;
  },
};
