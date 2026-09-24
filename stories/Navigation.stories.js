import {fromSite, shell, note, setSelected} from './site-template.js';

export default {title: 'Компоненты/Навигация и вкладки'};

export const Header = {
  args: {surface: 'blue', menuOpen: false, cta: 'Запросить демо'},
  argTypes: {
    surface: {control: 'select', options: ['blue','white','over product window'], description: 'Контекст страницы при скролле'},
    menuOpen: {control: 'boolean', description: 'Состояние мобильного меню'},
    cta: {control: 'text', description: 'Текст CTA'},
  },
  render: args => {
    const blue=args.surface==='blue';
    const root=shell({title:'Шапка',description:'Реальная разметка хедера. Размер окна Storybook можно менять для мобильного состояния.',blue});
    const frame=document.createElement('div'); frame.style.cssText='position:relative;min-height:130px;background:'+(blue?'#315f9b':'#fff');
    const header=fromSite('.site-header');
    header.style.cssText='position:relative;left:auto;right:auto;top:auto';
    if (!blue) header.classList.add(args.surface==='white'?'is-past-hero':'is-over-product-window');
    header.querySelector('.header-demo').textContent=args.cta;
    header.querySelector('nav').classList.toggle('open',args.menuOpen);
    header.querySelector('.menu-toggle').setAttribute('aria-expanded',String(args.menuOpen));
    frame.append(header); root.append(frame);
    note(root,'Приоритет: бренд Пассворка → навигация → запрос демо. Знак «Сделано в России» находится отдельно, в сертификации.');
    return root;
  },
};

export const ProductTabs = {
  args: {selected: 0, width: 1100},
  argTypes: {
    selected: {control: {type:'number',min:0,max:3,step:1},description:'Выбранная возможность, 0–3'},
    width: {control: {type:'range',min:320,max:1280,step:20},description:'Ширина области для проверки переполнения'},
  },
  render: args => {
    const root=shell({title:'Вкладки Hero',description:'Четыре варианта — один компонент, связанный с окном продукта.',blue:true});
    const hero=document.createElement('div'); hero.className='hero'; hero.style.cssText=`position:relative;min-height:100px;padding:0;width:min(100%,${args.width}px)`;
    const tabs=fromSite('.product-tabs'); setSelected(tabs,Math.max(0,Math.min(3,args.selected)));
    hero.append(tabs); root.append(hero); return root;
  },
};

export const TeamTabs = {
  args: {selected: 0, width: 1100},
  argTypes: {
    selected: {control: {type:'number',min:0,max:4,step:1},description:'Выбранная команда, 0–4'},
    width: {control: {type:'range',min:320,max:1280,step:20},description:'Ширина области'},
  },
  render: args => {
    const root=shell({title:'Вкладки команд',description:'Пять состояний одного ряда.'});
    const frame=document.createElement('div'); frame.className='story-frame'; frame.style.width=`min(100%,${args.width}px)`;
    const tabs=fromSite('.team-tabs'); setSelected(tabs,Math.max(0,Math.min(4,args.selected)));
    frame.append(tabs); root.append(frame); return root;
  },
};
