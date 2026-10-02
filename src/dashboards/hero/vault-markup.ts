/*
 * Сцена живого окна в hero, свёрстанная по макетам Figma «Сценарии» (узел 24:7180).
 * Канвас 1400×820 — как фрейм Main; масштабируется под ширину окна через --pw-s.
 * Все состояния сценария лежат в разметке сразу и переключаются классами:
 *   сайдбар    — навигация / поиск по цветам и тегам;
 *   шапка      — папка / результаты поиска;
 *   тело       — папка с записью Sprinthost / таблица результатов / найденная запись Мегаплан.
 */

const A = '/passwork-assets/hero-app/';
const img = (name: string, cls = '', size = '') => `<img class="${cls}" src="${A}${name}" alt=""${size}>`;

/* ---------- данные ---------- */

type Card = {
  id: string;
  name: string;
  logo: string;
  login: string;
  urls: string[];
  tags: string[];
};

export const CARDS: Record<'sprinthost' | 'megaplan', Card> = {
  sprinthost: {
    id: 'sprinthost',
    name: 'Sprinthost',
    logo: img('logo-sprinthost-lg.svg', 'pwv-card__logo'),
    login: 'user@passwork.ru',
    urls: ['https://sprinthost.ru/', 'https://cp.sprinthost.ru/auth/login'],
    tags: ['Лендинг', 'Хостинг'],
  },
  megaplan: {
    id: 'megaplan',
    name: 'Мегаплан',
    logo: img('logo-megaplan.png', 'pwv-card__logo pwv-card__logo--tile'),
    login: 'admin@passwork.ru',
    urls: ['https://megaplan.ru/', 'https://help.megaplan.ru/'],
    tags: ['Продажи', 'Проекты'],
  },
};

export const PASSWORD = 'PBiP)[^yxm1wS%1N3NJI';
export const PASSWORD_MASK = '•'.repeat(15);

const COLORS: [string, string][] = [
  ['turquoise', '#3dcfac'],
  ['blue', '#48bfea'],
  ['brown', '#e4b68f'],
  ['pink', '#ff83c9'],
  ['yellow', '#ffc72e'],
  ['violet', '#ac8fed'],
];

const TAGS = ['Дизайн', 'Аналитика', 'Разработка', 'UI', 'Инфраструктура', 'UX', 'Идеи', 'Frontend', 'Партнерства', 'Бренд', 'Лиды', 'Безопасность', 'HR', 'Отчеты', 'Backend', 'Документы', 'Мобильный', 'Тестирование'];

const FOUND_FOLDERS: [string, string][] = [
  ['Администрирование', '../ИТ-служба'],
  ['Имейлы', 'Рабочие сервисы'],
  ['Дизайн', '../Маркетинг'],
  ['Социальные сети', '../Продвижение'],
];

type Mark = 'star' | 'bookmark' | '';
type Found = { id: string; name: string; logo: string; login: string; url: string; tags: string[]; more?: number; dir: string; mark: Mark };

const FOUND: Found[] = [
  { id: 'bitrix24', name: 'Битрикс24', logo: 'logo-bitrix24.png', login: 'admin@passwork.ru', url: 'https://bitrix24.ru/', tags: ['Команда'], more: 1, dir: 'Рабочие сервисы', mark: 'star' },
  { id: 'kaiten', name: 'Кайтен', logo: 'logo-kaiten.png', login: 'team@passwork.ru', url: 'https://kaiten.ru/', tags: ['Канбан'], dir: '../ Разработка', mark: '' },
  { id: 'leadertask', name: 'ЛидерТаск', logo: 'logo-leadertask.png', login: 'pm@passwork.ru', url: 'https://leadertask.ru/', tags: ['Задачи'], more: 1, dir: 'Планирование', mark: 'bookmark' },
  { id: 'megaplan', name: 'Мегаплан', logo: 'logo-megaplan.png', login: 'admin@passwork.ru', url: 'https://megaplan.ru/', tags: ['Продажи'], dir: '../Отдел продаж', mark: '' },
  { id: 'planfix', name: 'ПланФикс', logo: 'logo-planfix.svg', login: 'team@passwork.ru', url: 'https://planfix.ru/', tags: ['Задачи'], dir: 'Рабочие сервисы', mark: '' },
  { id: 'singularity', name: 'Сингулярити', logo: 'logo-singularity.png', login: 'pm@passwork.ru', url: 'https://singularity-app.ru/', tags: ['Планы'], more: 3, dir: '../Планирование', mark: 'star' },
  { id: 'yougile', name: 'Юджайл', logo: 'logo-yougile.png', login: 'team@passwork.ru', url: 'https://yougile.com/', tags: ['Канбан'], dir: 'Разработка', mark: 'star' },
  { id: 'yandex-tracker', name: 'Яндекс Трекер', logo: 'logo-yandex-tracker.png', login: 'admin@passwork.ru', url: 'https://tracker.yandex.ru/', tags: ['Задачи'], dir: '../Разработка', mark: 'star' },
];

/* ---------- общие куски ---------- */

const divider = (cls = '') => `<div class="pwv-divider ${cls}"></div>`;
const tag = (text: string) => `<span class="pwv-tag">${text}</span>`;
const roundButton = (icon: string, act = '') => `<span class="pwv-round"${act ? ` data-act="${act}"` : ''}>${img(icon)}</span>`;

const TOPBAR = `<header class="pwv-topbar">
  <div class="pwv-topbar__left"><b class="pwv-brand">Пассворк</b><i class="pwv-topbar__rule"></i><span class="pwv-muted">Настройки и пользователи</span></div>
  <div class="pwv-topbar__right">
    <span class="pwv-topbar__icon">${img('topbar-check.svg', 'pwv-i18')}</span>
    <span class="pwv-topbar__icon pwv-topbar__bell">${img('topbar-bell.svg', 'pwv-i20')}<em>2</em></span>
    <span class="pwv-user"><span class="pwv-muted">Игорь Иванов</span>${img('avatar-igor.png', 'pwv-user__photo')}</span>
  </div>
</header>`;

/* ---------- сайдбар: навигация ---------- */

const navItem = (icon: string, text: string) => `<div class="pwv-nav">${img(icon, 'pwv-i19')}<span>${text}</span></div>`;
const sectionHead = (title: string, chevron: string) => `<div class="pwv-sec"><span class="pwv-sec__title">${title}</span>${img(chevron, 'pwv-i20')}${img('plus-circle.svg', 'pwv-i20 pwv-sec__add')}</div>`;
const treeRow = (level: 1 | 2 | 3, chevron: string, text: string, opts: { folder?: string; active?: boolean } = {}) =>
  `<div class="pwv-tree pwv-tree--l${level}${opts.active ? ' is-active' : ''}">${img(chevron, `pwv-i20${level === 3 ? ' pwv-chev-right' : ''}`)}${opts.folder ? img(opts.folder, 'pwv-i24') : ''}<span>${text}</span></div>`;

/* Поле поиска — одно и то же в обоих режимах: при фокусе оно сужается и
   выпускает «Отмена», а под ним сменяется только содержимое сайдбара. */
const SIDEBAR_SEARCH_ROW = `<div class="pwv-search-row">
  <div class="pwv-search" data-id="search">${img('search.svg', 'pwv-i16')}<span class="pwv-search__placeholder"><i class="pwv-caret"></i>Поиск</span></div>
  <span class="pwv-link pwv-cancel" data-act="cancel">Отмена</span>
</div>`;

const SIDEBAR_NAV = `<div class="pwv-pane pwv-side__nav is-active">
  <div class="pwv-navs">
    ${navItem('nav-recent.svg', 'Недавние')}
    ${navItem('nav-favorites.svg', 'Избранные')}
    ${navItem('nav-inbox.svg', 'Входящие')}
    ${navItem('nav-offline.svg', 'Офлайн')}
  </div>
  ${divider('pwv-divider--side')}
  <div class="pwv-group">
    ${sectionHead('Приватные сейфы', 'chevron-up.svg')}
    ${treeRow(1, 'chevron-right.svg', 'Реклама и подрядчики')}
  </div>
  ${divider('pwv-divider--side')}
  <div class="pwv-group">
    ${sectionHead('Общие сейфы', 'chevron-up-2.svg')}
    <div class="pwv-trees">
      ${treeRow(1, 'chevron-down.svg', 'Администрирование')}
      ${treeRow(2, 'chevron-down-sm.svg', 'Авторизация и 2ФА', { folder: 'folder-purple.svg' })}
      ${treeRow(3, 'chevron-tree.svg', 'Доступ к серверам', { folder: 'folder-grey.svg', active: true })}
      ${treeRow(3, 'chevron-tree.svg', 'Клиенты', { folder: 'folder-grey.svg' })}
      ${treeRow(3, 'chevron-tree.svg', 'Подрядчики', { folder: 'folder-grey.svg' })}
      ${treeRow(2, 'chevron-right-sm.svg', 'Тестовые стенды', { folder: 'folder-blue.svg' })}
    </div>
  </div>
  ${divider('pwv-divider--side')}
  <div class="pwv-group">${sectionHead('Корпоративные сейфы', 'chevron-down.svg')}</div>
  ${divider('pwv-divider--side')}
  ${navItem('nav-hidden.svg', '14 скрытых сейфов')}
  ${divider('pwv-divider--side')}
  ${navItem('nav-trash.svg', 'Корзина')}
</div>`;

/* ---------- сайдбар: поиск по цветам и тегам ---------- */

const SIDEBAR_FILTERS = `<div class="pwv-pane pwv-side__search">
  <div class="pwv-group pwv-group--filters">
    <div class="pwv-label">Цвета</div>
    <div class="pwv-colors">${COLORS.map(([id, color]) => `<span class="pwv-color" data-color="${id}" style="--c:${color}"></span>`).join('')}</div>
  </div>
  ${divider('pwv-divider--side')}
  <div class="pwv-group pwv-group--filters">
    <div class="pwv-label">Теги</div>
    <div class="pwv-tags">${TAGS.map(tag).join('')}</div>
  </div>
</div>`;

/* ---------- шапки контента ---------- */

const AVATARS = ['avatar-igor.png', 'avatar-2.png', 'avatar-3.png', 'avatar-4.png', 'avatar-5.png'];

const HEAD_FOLDER = `<div class="pwv-pane pwv-head pwv-head--folder is-active">
  <div class="pwv-head__row">
    <div class="pwv-crumbs"><span>Администрирование</span><i>/</i><span>…</span><i>/</i><b>Доступ к серверам</b></div>
    <div class="pwv-head__actions">${roundButton('more.svg')}<span class="pwv-button">Добавить запись</span></div>
  </div>
  <div class="pwv-head__info">
    <div class="pwv-avatars">${AVATARS.map(a => `<span class="pwv-avatar">${img(a)}</span>`).join('')}</div>
    ${roundButton('user-add.svg')}
    <div class="pwv-head__access"><b>Доступ к папке:</b><span>14 пользователей</span></div>
  </div>
</div>`;

const HEAD_RESULTS = `<div class="pwv-pane pwv-head pwv-head--results">
  <b class="pwv-head__title">Результаты поиска</b>
  <span class="pwv-head__count">Найдено: 12</span>
</div>`;

/* ---------- карточка записи ---------- */

const copyButton = (copy: string) => `<span class="pwv-ib" data-copy="${copy}">${img('copy.svg')}</span>`;

const cardRows = (c: Card) => `<div class="pwv-rows">
  <div class="pwv-row"><span class="pwv-row__label">Логин</span><span class="pwv-row__value">${c.login}</span><span class="pwv-row__acts">${copyButton('login')}</span></div>
  <div class="pwv-row"><span class="pwv-row__label">Пароль</span><span class="pwv-row__value" data-role="secret"><span class="pwv-dots">${PASSWORD_MASK}</span></span><span class="pwv-row__acts"><span class="pwv-ib" data-act="eye">${img('eye.svg', 'pwv-eye')}${img('eye-off.svg', 'pwv-eye-off')}</span>${copyButton('pass')}</span></div>
  <div class="pwv-row pwv-row--urls"><span class="pwv-row__label">URL-адреса</span><span class="pwv-urls">${c.urls.map((url, i) => `<span class="pwv-url"><a>${url}</a><span class="pwv-row__acts">${copyButton(`url${i + 1}`)}</span></span>`).join('')}</span></div>
  <div class="pwv-row"><span class="pwv-row__label">TOTP</span><span class="pwv-row__value pwv-num">203 572</span><span class="pwv-row__acts">${img('totp-ring.svg', 'pwv-i18')}${copyButton('totp')}</span></div>
  <div class="pwv-row pwv-row--last"><span class="pwv-row__label">Теги</span><span class="pwv-row__value pwv-row__tags">${c.tags.map(tag).join('')}</span></div>
</div>`;

const card = (c: Card) => `<div class="pwv-card" data-card="${c.id}">
  <div class="pwv-card__head">
    <div class="pwv-card__title">${c.logo}<b>${c.name}</b>${img('star.svg', 'pwv-i18')}</div>
    <span class="pwv-card__close">${img('close.svg')}</span>
  </div>
  <div class="pwv-card__meta"><b>Дополнительный доступ:</b><span>2 отправленных записи, 4 ссылки, 1 ярлык</span></div>
  <div class="pwv-card__actions">${roundButton('card-share.svg')}${roundButton('card-edit.svg')}${roundButton('card-more.svg')}</div>
  <div class="pwv-tabs"><span class="is-active">Данные</span><span>История событий</span><span>Редакции</span></div>
  ${cardRows(c)}
</div>`;

/* ---------- тело: папка «Доступ к серверам» ---------- */

const folderEntry = (logo: string, name: string, opts: { selected?: boolean; extra?: string } = {}) =>
  `<div class="pwv-entry${opts.selected ? ' is-selected' : ''}">${logo}<span>${name}</span>${opts.extra ?? ''}</div>`;

const BODY_FOLDER = `<div class="pwv-pane pwv-body pwv-body--folder is-active">
  <div class="pwv-list pwv-list--folder">
    <div class="pwv-list__section pwv-list__section--folders">
      <div class="pwv-label">Папки</div>
      <div class="pwv-folder">${img('folder-green.svg', 'pwv-i24')}<span>Серверы</span></div>
      <div class="pwv-folder">${img('folder-orange.svg', 'pwv-i24')}<span>Пароли</span></div>
    </div>
    ${divider('pwv-divider--list')}
    <div class="pwv-list__section">
      <div class="pwv-label">Название</div>
      ${folderEntry('<span class="pwv-letter">E' + img('shared-badge.svg', 'pwv-letter__badge') + '</span>', 'Emergency Server User', { extra: img('status-dot.svg', 'pwv-entry__status') })}
      ${folderEntry(img('logo-site24x7.png', 'pwv-i20'), 'Site24x7 Monitoring')}
      ${folderEntry(img('logo-regru.svg', 'pwv-logo-regru'), 'Рег.ру')}
      ${folderEntry('<span class="pwv-logo-sprint">' + img('logo-sprinthost-sm.svg') + '</span>', 'Sprinthost', { selected: true })}
      ${folderEntry(img('logo-astra.svg', 'pwv-i20'), 'Astra Linux')}
    </div>
  </div>
  ${card(CARDS.sprinthost)}
</div>`;

/* ---------- тело: результаты поиска по цвету ---------- */

const markIcons = (mark: Mark) =>
  `<span class="pwv-marks"><span class="pwv-mark">${mark === 'star' ? img('star-filled.svg') : img('star-outline.svg', 'pwv-mark__hover')}</span><span class="pwv-mark">${mark === 'bookmark' ? img('bookmark-filled.svg') : img('bookmark-outline.svg', 'pwv-mark__hover')}</span></span>`;

const resultRow = (f: Found) => `<div class="pwv-tr" data-id="${f.id}">
  <span class="pwv-td pwv-td--name">${img(f.logo, 'pwv-logo')}<span>${f.name}</span><i class="pwv-indicator"></i></span>
  <span class="pwv-td">${f.login}</span>
  <span class="pwv-td pwv-blue">${f.url}</span>
  <span class="pwv-td pwv-td--tags">${f.tags.map(t => `<span class="pwv-tag pwv-tag--sm">${t}</span>`).join('')}${f.more ? `<span class="pwv-more">+${f.more}</span>` : ''}</span>
  <span class="pwv-td pwv-blue">${f.dir}</span>
  <span class="pwv-td pwv-td--marks">${markIcons(f.mark)}</span>
</div>`;

const BODY_RESULTS = `<div class="pwv-pane pwv-body pwv-body--results">
  <div class="pwv-table pwv-table--folders">
    <div class="pwv-tr pwv-tr--head"><span class="pwv-th pwv-th--first">Папки</span></div>
    ${FOUND_FOLDERS.map(([name, dir]) => `<div class="pwv-tr"><span class="pwv-td pwv-td--name">${img('folder-sky.svg', 'pwv-i20')}<span>${name}</span></span><span class="pwv-td pwv-blue pwv-td--dir">${dir}</span></div>`).join('')}
  </div>
  ${divider('pwv-divider--table')}
  <div class="pwv-table pwv-table--entries">
    <div class="pwv-tr pwv-tr--head pwv-tr--tall"><span class="pwv-th">Название${img('sort-down.svg', 'pwv-i16')}</span><span class="pwv-th">Логин</span><span class="pwv-th">URL-адреса</span><span class="pwv-th">Теги</span><span class="pwv-th">Директория</span></div>
    ${FOUND.map(resultRow).join('')}
  </div>
</div>`;

/* ---------- тело: открытая найденная запись ---------- */

const BODY_FOUND = `<div class="pwv-pane pwv-body pwv-body--found">
  <div class="pwv-list pwv-list--found">
    <div class="pwv-list__section pwv-list__section--folders">
      <div class="pwv-label">Папки</div>
      ${FOUND_FOLDERS.map(([name]) => `<div class="pwv-folder">${img('folder-sky.svg', 'pwv-i20')}<span>${name}</span></div>`).join('')}
    </div>
    ${divider('pwv-divider--list')}
    <div class="pwv-list__section">
      <div class="pwv-label">Название</div>
      ${FOUND.map(f => folderEntry(img(f.logo, 'pwv-logo'), f.name, { selected: f.id === 'megaplan', extra: '<i class="pwv-indicator"></i>' })).join('')}
    </div>
  </div>
  ${card(CARDS.megaplan)}
</div>`;

export const VAULT_MARKUP = `<div class="pwv-stage" aria-hidden="true">
  ${TOPBAR}
  <div class="pwv-work">
    <aside class="pwv-side">${SIDEBAR_SEARCH_ROW}<div class="pwv-side__panes">${SIDEBAR_NAV}${SIDEBAR_FILTERS}</div></aside>
    <div class="pwv-content">
      <div class="pwv-heads">${HEAD_FOLDER}${HEAD_RESULTS}</div>
      <div class="pwv-bodies">${BODY_FOLDER}${BODY_RESULTS}${BODY_FOUND}</div>
    </div>
  </div>
  <div class="pwv-cursors"></div>
</div>`;
