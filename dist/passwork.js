import {gsap, mountPageMotion} from './page-motion.js?v=motion-20260923e';
import {mountHeroDashboard} from './live-dashboard.js?v=security-20260923d';
import {mountClientLogos} from './client-logos.js';
import {mountHeroScroll} from './hero-scroll.js?v=motion-20260923e';
import {mountOrbitAnimation} from './orbit-animation.js';
import {mountSecuritySwitcher} from './security-switcher.js?v=security-20260923e';
import {mountTeamDashboard,teamScenarios} from './team-dashboards.js';
import {snapshotScreen,dissolveScreen,fadeThroughScreen} from './screen-transitions.js?v=motion-20260923e';

mountClientLogos(document.querySelector('.client-logos'));
mountOrbitAnimation(document.querySelector('.orbit-scene'));
mountSecuritySwitcher(document.querySelector('.security-switcher'));

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
mountPageMotion();
const productPanel=document.querySelector('#product-panel');
const detail=document.querySelector('.product-detail');
const productTabs=[...document.querySelectorAll('[data-product]')];
const liveDashboard=document.querySelector('.pw-live-dashboard');
let stopDashboard=mountHeroDashboard(liveDashboard);
mountHeroScroll(document.querySelector('.hero'),document.querySelector('.site-header'));
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
  const outgoing=!reduced.matches?snapshotScreen(activeProduct===0?liveDashboard:detail):null;
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
    });
  }
}
productTabs.forEach((button,i)=>button.addEventListener('click',()=>selectProduct(i)));

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
  const animate=!reduced.matches;
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
  });
}
teamTabs.forEach((button,i)=>button.addEventListener('click',()=>selectTeam(i)));
function tabKeyboard(buttons,select){buttons.forEach((button,i)=>button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(i+1)%buttons.length;else if(event.key==='ArrowLeft')next=(i-1+buttons.length)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();select(next);buttons[next].focus();}));}
tabKeyboard(productTabs,selectProduct);tabKeyboard(teamTabs,selectTeam);

const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('#main-nav');
function closeMenu(){menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Открыть меню');}
menuButton.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');});
menu.addEventListener('click',event=>{if(event.target.closest('a,button'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});

const dialog=document.querySelector('.contact-dialog');
const form=document.querySelector('#contact-form');
const result=document.querySelector('.form-result');
const dialogCopy={
  demo:['Запросить демо','Познакомьтесь с Пассворком и возможностями для вашей команды.'],
  implementation:['Обсудить внедрение','Расскажите о вашей компании, чтобы обсудить развёртывание Пассворка в вашей инфраструктуре.'],
  pricing:['Стоимость Пассворка','Подготовьте запрос на расчёт стоимости для вашей компании.'],
  support:['Поддержка Пассворка','Оставьте контактные данные для обращения в поддержку.']
};
document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{const [title,description]=dialogCopy[button.dataset.dialog];document.querySelector('#dialog-title').textContent=title;document.querySelector('.dialog-description').textContent=description;form.hidden=false;result.hidden=true;form.reset();dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;form.hidden=true;result.hidden=false;result.textContent='Заявка подготовлена. Это локальный прототип — данные не отправлены и не сохранены.';});
