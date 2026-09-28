/* The other three hero tabs, drawn in the same product window as the live
   dashboard (window bar, sidebar, folder header) with a quietly alive body:
   access rights, 2FA codes and the activity log. */
import { DASHBOARD_HEADER_MARKUP, DASHBOARD_SIDEBAR_MARKUP } from './live-dashboard-markup';
import { WINDOW_BAR } from './entry';

export type ProductView = 'access' | 'codes' | 'log';

const WIDTH = 1344;
const PEOPLE = {
  marina: { name: 'Марина Ковалёва', mail: 'marina@passwork.ru', init: 'М', color: 'linear-gradient(135deg,#ff8a65,#ff5a3a)' },
  ilya: { name: 'Илья Смирнов', mail: 'ilya@passwork.ru', init: 'И', color: 'linear-gradient(135deg,#a89bff,#7a66ff)' },
  sasha: { name: 'Саша Орлов', mail: 'sasha@passwork.ru', init: 'С', color: 'linear-gradient(135deg,#4fdba6,#22b57a)' },
  andrey: { name: 'Андрей Пьянков', mail: 'andrey@passwork.ru', init: 'А', color: '#c9ced6' },
} as const;
type Person = keyof typeof PEOPLE;

const chevron = '<svg class="pw-ico" viewBox="0 0 10 10"><path d="m2 3.5 3 3 3-3"/></svg>';
const copyIcon = '<svg class="pw-ico" viewBox="0 0 16 16"><rect x="5" y="5" width="8.5" height="8.5" rx="1.6"/><path d="M10.8 5V3.6A1.1 1.1 0 0 0 9.7 2.5H3.6a1.1 1.1 0 0 0-1.1 1.1v6.1a1.1 1.1 0 0 0 1.1 1.1H5"/></svg>';
const avatar = (key: Person) => `<span class="pw-avatar pw-pv__avatar" style="background:${PEOPLE[key].color}">${PEOPLE[key].init}</span>`;
const groupIcon = '<span class="pw-pv__group"><svg class="pw-ico" viewBox="0 0 16 16"><circle cx="6" cy="5.4" r="2.4"/><path d="M1.8 13c.4-2.4 2-3.7 4.2-3.7s3.8 1.3 4.2 3.7M10.6 3.3a2.2 2.2 0 0 1 0 4.2M11.6 9.6c1.5.4 2.4 1.5 2.6 3.4"/></svg></span>';
const tabs = (active: string) => `<div class="pw-tabs pw-pv__tabs">${['Пароли', 'Права доступа', 'История действий', 'Настройки']
  .map(t => `<span class="pw-tab${t === active ? ' is-active' : ''}">${t}</span>`).join('')}</div>`;

/* ---------- access rights ---------- */
const ACCESS: [string, string, string, string][] = [
  ['group:Администраторы', '3 участника', 'Группа', 'Полный доступ'],
  ['marina', PEOPLE.marina.mail, 'Администратор', 'Полный доступ'],
  ['ilya', PEOPLE.ilya.mail, 'Разработчик', 'Редактирование'],
  ['group:IT-команда', '12 участников', 'Группа', 'Редактирование'],
  ['sasha', PEOPLE.sasha.mail, 'Аналитик', 'Только чтение'],
  ['andrey', PEOPLE.andrey.mail, 'Владелец', 'Администрирование'],
];
// Plausible edits only: who changes, and between which two levels.
const EDITS: [string, [string, string]][] = [['ilya', ['Редактирование', 'Полный доступ']], ['sasha', ['Только чтение', 'Редактирование']]];
const accessBody = () => `
  ${tabs('Права доступа')}
  <div class="pw-pv__bar"><div class="pw-search pw-pv__search"><svg class="pw-ico" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.6"/><path d="M10.5 10.5 14 14"/></svg><span>Поиск пользователей и групп</span></div><span class="pw-pv__select">Все роли${chevron}</span><span class="pw-pv__ghost">Добавить</span></div>
  <div class="pw-pv__table pw-pv__table--access">
    <div class="pw-pv__head"><span>Пользователь или группа</span><span>Роль</span><span>Доступ к папке</span></div>
    ${ACCESS.map(([who, sub, role, level], i) => {
      const group = who.startsWith('group:');
      const title = group ? who.slice(6) : PEOPLE[who as Person].name;
      const owner = role === 'Владелец';
      return `<div class="pw-pv__row" data-row="${i}" data-who="${who}"><span class="pw-pv__who">${group ? groupIcon : avatar(who as Person)}<span><b>${title}</b><small>${sub}</small></span></span><span class="pw-pv__muted">${role}</span><span class="pw-pv__level${owner ? ' is-locked' : ''}" data-level>${level}${owner ? '' : chevron}</span></div>`;
    }).join('')}
  </div>
  <div class="pw-pv__note">Изменения прав сразу попадают в журнал действий</div>`;

/* ---------- 2FA codes ---------- */
const CODES: [string, string, string, number][] = [
  ['Sprinthost', 'user@passwork.ru', 'sprinthost', 0],
  ['Emergency Server User', 'emergency@passwork.ru', 'emergency', 7],
  ['Корпоративная почта', 'admin@passwork.ru', 'mail', 13],
  ['GitLab', 'deploy@passwork.ru', 'gitlab', 19],
  ['VPN компании', 'vpn@passwork.ru', 'vpn', 24],
];
const code = () => String(Math.floor(Math.random() * 1e6)).padStart(6, '0').replace(/(\d{3})(\d{3})/, '$1 $2');
const codeGlyph = (kind: string, name: string) => `<span class="pw-glyph pw-glyph--sq pw-pv__glyph pw-pv__glyph--${kind}">${name[0]}</span>`;
const codesBody = () => `
  ${tabs('Пароли')}
  <div class="pw-pv__bar"><span class="pw-label">Коды двухфакторной аутентификации · ${CODES.length}</span><span class="pw-pv__ghost">Добавить код</span></div>
  <div class="pw-pv__table pw-pv__table--codes">
    ${CODES.map(([name, login, kind, phase], i) => `<div class="pw-pv__row" data-code="${i}" style="--phase:${phase}s">
      <span class="pw-pv__who">${codeGlyph(kind, name)}<span><b>${name}</b><small>${login}</small></span></span>
      <span class="pw-pv__code" data-value>${code()}</span>
      <span class="pw-pv__timer"><svg class="pw-ring pw-pv__ring" viewBox="0 0 16 16"><circle class="pw-ring__bg" cx="8" cy="8" r="6"/><circle class="pw-ring__fg" cx="8" cy="8" r="6"/></svg><span class="pw-ib">${copyIcon}</span></span>
    </div>`).join('')}
  </div>
  <div class="pw-pv__note">Коды хранятся рядом с паролями и доступны всем, у кого есть доступ к записи</div>`;

/* ---------- activity log ---------- */
type Event = [Person, string, string];
const EVENTS: Event[] = [
  ['marina', 'Просмотрела пароль', 'Sprinthost'],
  ['ilya', 'Изменил пароль', 'Astra Linux'],
  ['sasha', 'Добавил ярлык «Admin»', 'Emergency Server User'],
  ['andrey', 'Выдал доступ к папке', 'Доступы к серверам'],
  ['marina', 'Отправила пароль по ссылке', 'Per.py'],
  ['ilya', 'Создал запись', 'Site24x7 Monitoring'],
];
const LIVE_EVENTS: Event[] = [
  ['sasha', 'Скопировал логин', 'Sprinthost'],
  ['marina', 'Изменила права группы', 'IT-команда'],
  ['ilya', 'Открыл пароль', 'Emergency Server User'],
  ['andrey', 'Отозвал доступ', 'Саша Орлов'],
];
const time = (minutesAgo: number) => {
  const d = new Date(Date.now() - minutesAgo * 60000);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};
const eventRow = ([who, action, object]: Event, minutesAgo: number, fresh = false) =>
  `<div class="pw-pv__row${fresh ? ' is-fresh' : ''}"><span class="pw-pv__muted pw-pv__time">${time(minutesAgo)}</span><span class="pw-pv__who">${avatar(who)}<b>${PEOPLE[who].name}</b></span><span>${action}</span><span class="pw-pv__muted">${object}</span></div>`;
const logBody = () => `
  ${tabs('История действий')}
  <div class="pw-pv__bar">${['Сегодня', 'Все пользователи', 'Все действия'].map(f => `<span class="pw-pv__select">${f}${chevron}</span>`).join('')}<span class="pw-pv__ghost">Экспорт</span></div>
  <div class="pw-pv__table pw-pv__table--log">
    <div class="pw-pv__head"><span>Время</span><span>Пользователь</span><span>Действие</span><span>Объект</span></div>
    <div data-events>${EVENTS.map((e, i) => eventRow(e, 1 + i * 4)).join('')}</div>
  </div>`;

const BODIES: Record<ProductView, () => string> = { access: accessBody, codes: codesBody, log: logBody };

export function mountProductView(embed: HTMLElement, view: ProductView): () => void {
  embed.innerHTML = `<div class="pw-stage pw-pv-stage" aria-hidden="true">${WINDOW_BAR}<div class="pw-app">${DASHBOARD_SIDEBAR_MARKUP}
    <div class="pw-main">${DASHBOARD_HEADER_MARKUP}<div class="pw-pv" data-view="${view}">${BODIES[view]()}</div></div></div></div>`;
  const stage = embed.querySelector<HTMLElement>('.pw-stage')!;
  const fit = () => embed.style.setProperty('--pw-s', String(embed.clientWidth / (stage.offsetWidth || WIDTH) || 1));
  const resize = new ResizeObserver(fit);
  resize.observe(embed);
  fit();

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timers: number[] = [];
  if (!reduced && view === 'access') {
    // An administrator adjusts one person's access at a time.
    let step = 0;
    timers.push(window.setInterval(() => {
      const [who, [a, b]] = EDITS[step++ % EDITS.length];
      const cell = embed.querySelector<HTMLElement>(`[data-who="${who}"] [data-level]`);
      if (!cell?.firstChild) return;
      cell.firstChild.textContent = cell.firstChild.textContent === a ? b : a;
      cell.classList.remove('is-changed'); void cell.offsetWidth; cell.classList.add('is-changed');
    }, 2600));
  }
  if (!reduced && view === 'codes') {
    // Each code renews when its ring completes (30s cycle, staggered phases).
    embed.querySelectorAll<HTMLElement>('[data-code]').forEach((row, i) => {
      const value = row.querySelector<HTMLElement>('[data-value]')!;
      const renew = () => { value.textContent = code(); value.classList.remove('is-new'); void value.offsetWidth; value.classList.add('is-new'); };
      const phase = CODES[i][3];
      timers.push(window.setTimeout(() => { renew(); timers.push(window.setInterval(renew, 30000)); }, (30 - phase) * 1000));
    });
  }
  if (!reduced && view === 'log') {
    // New events arrive at the top; the oldest leaves.
    const list = embed.querySelector<HTMLElement>('[data-events]')!;
    let next = 0;
    timers.push(window.setInterval(() => {
      list.insertAdjacentHTML('afterbegin', eventRow(LIVE_EVENTS[next++ % LIVE_EVENTS.length], 0, true));
      list.lastElementChild?.remove();
    }, 3200));
  }
  return () => {
    timers.forEach(id => { clearInterval(id); clearTimeout(id); });
    resize.disconnect();
    embed.innerHTML = '';
  };
}
