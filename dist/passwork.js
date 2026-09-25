import {gsap, mountPageMotion} from './page-motion.js';
import {mountHeroDashboard} from './live-dashboard.js';
import {mountClientLogos} from './client-logos.js';
import {mountHeroScroll} from './hero-scroll.js';
import {mountOrbitAnimation} from './orbit-animation.js';
import {mountSecuritySwitcher} from './security-switcher.js';
import {mountTeamDashboard,teamScenarios} from './team-dashboards.js';
import {snapshotScreen,dissolveScreen,fadeThroughScreen} from './screen-transitions.js';

let activeTeardown;

export function mountPasswork() {
if (activeTeardown) return activeTeardown;
const listeners=[];
const listen=(element,type,handler,options)=>{
  element.addEventListener(type,handler,options);
  listeners.push(()=>element.removeEventListener(type,handler,options));
};
const stopLogos=mountClientLogos(document.querySelector('.client-logos'));
const stopOrbit=mountOrbitAnimation(document.querySelector('.orbit-scene'));
const stopSecurity=mountSecuritySwitcher(document.querySelector('.security-switcher'));

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const main=document.querySelector('main');
const motionEnabled=key=>!main?.classList.contains(`motion-${key}-off`) && !reduced.matches;
const motionDuration=(key,fallback)=>{
  const milliseconds=Number.parseFloat(getComputedStyle(main).getPropertyValue(`--motion-${key}-duration`));
  return Number.isFinite(milliseconds) && milliseconds>0?milliseconds/1000:fallback;
};
const stopPageMotion=mountPageMotion();
const productPanel=document.querySelector('#product-panel');
const detail=document.querySelector('.product-detail');
const productTabs=[...document.querySelectorAll('[data-product]')];
const liveDashboard=document.querySelector('.pw-live-dashboard');
let stopDashboard=mountHeroDashboard(liveDashboard);
const stopHeroScroll=mountHeroScroll(document.querySelector('.hero'),document.querySelector('.site-header'));
const logo=document.querySelector('.brand-light').src;
const productViews=[null,
  {title:'Управление доступом',description:'Доступ к нужным паролям — для нужных людей.',body:`<table class="preview-table"><thead><tr><th>Команда</th><th>Уровень доступа</th><th>Статус</th></tr></thead><tbody><tr><td>Администраторы</td><td>Полный доступ</td><td><span class="status-pill">Активен</span></td></tr><tr><td>IT-команда</td><td>Редактирование</td><td><span class="status-pill">Активен</span></td></tr><tr><td>Сотрудники</td><td>Просмотр</td><td><span class="status-pill">Активен</span></td></tr></tbody></table>`},
  {title:'Коды двухфакторной аутентификации',description:'Пароли и одноразовые коды в одном защищённом пространстве.',body:`<div class="preview-item"><div><h4>Корпоративная почта</h4><p>Пример одноразового кода</p></div><span class="code-number">482 916</span></div><div class="preview-item"><div><h4>Рабочие сервисы</h4><p>Пример одноразового кода</p></div><span class="code-number">735 204</span></div>`},
  {title:'Журнал действий',description:'История работы с паролями и доступами внутри компании.',body:`<table class="preview-table"><thead><tr><th>Время</th><th>Действие</th><th>Пользователь</th></tr></thead><tbody><tr><td>12:41</td><td>Обновлён пароль</td><td>Администратор</td></tr><tr><td>12:35</td><td>Предоставлен доступ</td><td>IT-команда</td></tr><tr><td>12:28</td><td>Создан новый сейф</td><td>Администратор</td></tr></tbody></table>`}
];

function setSelection(buttons,index,panel){
  buttons.forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;});
  panel.setAttribute('aria-labelledby',buttons[index].id);
}
let activeProduct=0;
let productSwitch;
let outgoingProductScreen;
function selectProduct(index){
  if(index===activeProduct)return;
  productSwitch?.progress(1);
  outgoingProductScreen?.remove();
  gsap.set([liveDashboard,detail],{clearProps:'opacity,filter'});
  const outgoing=motionEnabled('tabs')?snapshotScreen(activeProduct===0?liveDashboard:detail):null;
  outgoingProductScreen=outgoing;
  activeProduct=index;
  setSelection(productTabs,index,productPanel);
  detail.hidden=index===0;
  stopDashboard?.();stopDashboard=null;
  liveDashboard.hidden=index!==0;
  const view=productViews[index];
  if(view){
    detail.innerHTML=`<aside class="preview-sidebar"><img src="${logo}" alt="Пассворк"><p>Рабочее пространство</p><p>Избранное</p><p>Все пароли</p><p class="active">${view.title}</p></aside><div class="preview-content"><span class="preview-kicker">Пассворк / Рабочее пространство</span><h3>${view.title}</h3><p>${view.description}</p>${view.body}</div>`;
  }else stopDashboard=mountHeroDashboard(liveDashboard);
  if(outgoing){
    const incoming=index===0?liveDashboard:detail;
    productSwitch=dissolveScreen(outgoing,incoming,()=>{
      if(outgoingProductScreen===outgoing)outgoingProductScreen=null;
    },motionDuration('tabs',.32));
  }
}
productTabs.forEach((button,i)=>listen(button,'click',()=>selectProduct(i)));

const teamTabs=[...document.querySelectorAll('[data-team]')];
const teamPanel=document.querySelector('#team-panel');
const teamDashboard=document.querySelector('.pw-team-dashboard');
const caption=document.querySelector('.team-caption');
let activeTeam=0;
let stopTeamDashboard=mountTeamDashboard(teamDashboard,0);
let teamSwitch;
let outgoingTeamScreen;
let outgoingTeamCaption;
function selectTeam(index){
  if(index===activeTeam)return;
  teamSwitch?.progress(1);
  outgoingTeamScreen?.remove();
  outgoingTeamCaption?.remove();
  gsap.set(teamDashboard,{clearProps:'opacity,filter'});
  gsap.set(caption,{clearProps:'opacity,filter'});
  const animate=motionEnabled('tabs');
  if(animate){
    outgoingTeamScreen=snapshotScreen(teamDashboard);
    outgoingTeamCaption=caption.cloneNode(true);
    outgoingTeamCaption.classList.add('team-caption-outgoing');
    outgoingTeamCaption.removeAttribute('aria-live');
    outgoingTeamCaption.setAttribute('aria-hidden','true');
    caption.parentElement.append(outgoingTeamCaption);
  }
  stopTeamDashboard?.();
  activeTeam=index;
  setSelection(teamTabs,index,teamPanel);
  const team=teamScenarios[index];
  caption.textContent=team.caption;
  stopTeamDashboard=mountTeamDashboard(teamDashboard,index);
  if(!animate)return;
  const outgoing=outgoingTeamScreen;
  const oldCaption=outgoingTeamCaption;
  teamSwitch=fadeThroughScreen(outgoing,teamDashboard,oldCaption,caption,()=>{
    if(outgoingTeamScreen===outgoing)outgoingTeamScreen=null;
    if(outgoingTeamCaption===oldCaption)outgoingTeamCaption=null;
  },motionDuration('tabs',.32));
}
teamTabs.forEach((button,i)=>listen(button,'click',()=>selectTeam(i)));
function tabKeyboard(buttons,select){buttons.forEach((button,i)=>listen(button,'keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%buttons.length;else if(event.key==='ArrowLeft')next=(i-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();select(next);buttons[next].focus();}));}
tabKeyboard(productTabs,selectProduct);tabKeyboard(teamTabs,selectTeam);

const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('#main-nav');
const menuHeader=menuButton.closest('.site-header');
const menuFooter=document.querySelector('.site-footer');
const mainWasInert=main?.inert ?? false;
const footerWasInert=menuFooter?.inert ?? false;
function closeMenu({restoreFocus=false}={}){
  const wasOpen=menu.classList.contains('open');
  menu.classList.remove('open');
  menuHeader.classList.remove('is-menu-open');
  document.body.classList.remove('mobile-menu-open');
  if(main)main.inert=mainWasInert;
  if(menuFooter)menuFooter.inert=footerWasInert;
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Открыть меню');
  if(restoreFocus&&wasOpen)menuButton.focus({preventScroll:true});
}
listen(menuButton,'click',()=>{
  if(menu.classList.contains('open')){closeMenu();return;}
  menu.classList.add('open');
  menuHeader.classList.add('is-menu-open');
  document.body.classList.add('mobile-menu-open');
  if(main)main.inert=true;
  if(menuFooter)menuFooter.inert=true;
  menuButton.setAttribute('aria-expanded','true');
  menuButton.setAttribute('aria-label','Закрыть меню');
});
listen(menu,'click',event=>{if(event.target.closest('a,button'))closeMenu();});
listen(menuHeader.querySelector('.brand'),'click',()=>closeMenu());
listen(menuHeader.querySelector('.header-demo'),'click',()=>closeMenu());
listen(window,'resize',()=>{if(innerWidth>800)closeMenu();});
listen(document,'keydown',event=>{
  if(event.key==='Escape'){closeMenu({restoreFocus:true});return;}
  if(event.key!=='Tab'||!menu.classList.contains('open'))return;
  const focusable=[...menuHeader.querySelectorAll('.brand, #main-nav a, #main-nav button, .header-demo, .menu-toggle')];
  const current=focusable.indexOf(document.activeElement);
  if(event.shiftKey&&current===0){event.preventDefault();focusable.at(-1).focus();}
  else if(!event.shiftKey&&current===focusable.length-1){event.preventDefault();focusable[0].focus();}
});

const dialog=document.querySelector('.contact-dialog');
const form=document.querySelector('#contact-form');
const result=document.querySelector('.form-result');
const dialogCopy={
  demo:['Запросить демо','Познакомьтесь с Пассворком и возможностями для вашей команды.'],
  implementation:['Обсудить внедрение','Расскажите о вашей компании, чтобы обсудить развёртывание Пассворка в вашей инфраструктуре.'],
  pricing:['Стоимость Пассворка','Подготовьте запрос на расчёт стоимости для вашей компании.'],
  support:['Поддержка Пассворка','Оставьте контактные данные для обращения в поддержку.']
};
document.querySelectorAll('[data-dialog]').forEach(button=>listen(button,'click',()=>{const [title,description]=dialogCopy[button.dataset.dialog];document.querySelector('#dialog-title').textContent=title;document.querySelector('.dialog-description').textContent=description;form.hidden=false;result.hidden=true;form.reset();dialog.showModal();}));
listen(document.querySelector('.dialog-close'),'click',()=>dialog.close());
listen(dialog,'click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
listen(form,'submit',event=>{event.preventDefault();if(!form.reportValidity())return;form.hidden=true;result.hidden=false;result.textContent='Заявка подготовлена. Это локальный прототип — данные не отправлены и не сохранены.';});

activeTeardown=()=>{
  if(!activeTeardown)return;
  closeMenu();
  activeTeardown=null;
  listeners.forEach(remove=>remove());
  productSwitch?.kill();
  teamSwitch?.kill();
  outgoingProductScreen?.remove();
  outgoingTeamScreen?.remove();
  outgoingTeamCaption?.remove();
  stopDashboard?.();
  stopTeamDashboard?.();
  stopHeroScroll();
  stopPageMotion();
  stopSecurity();
  stopOrbit();
  stopLogos();
  if(dialog.open)dialog.close();
};
return activeTeardown;
}

// The archived static page mounts itself; React calls the same interface after
// committing its markup and owns teardown on unmount/HMR.
if (!document.querySelector('.react-site-header')) mountPasswork();
