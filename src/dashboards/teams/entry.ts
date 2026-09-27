// Original scenarios from reserve-passwork-copy; this adapter replaces only React mounting.
import { DASHBOARD_HEADER_MARKUP, DASHBOARD_SIDEBAR_MARKUP } from './live-dashboard-markup';
import { initItDashboardDemo } from './it-dashboard-demo';
import { initDevopsDashboardDemo } from './devops-dashboard-demo';
import { initSecurityDashboardDemo } from './security-dashboard-demo';
import { initGovernmentDashboardDemo } from './government-dashboard-demo';
import { initManufacturingDashboardDemo } from './manufacturing-dashboard-demo';

export const teamScenarios = [
  {
    id: 'it', name: 'IT-команды', init: initItDashboardDemo, shell: '',
    caption: 'Разграничение доступа по ролям и группам',
    label: 'Пассворк для IT-команд: доступ по ролям и его отзыв, общие папки, журнал действий, ротация, 2FA, SSO, файлы и заметки, обмен ссылкой, браузер и телефон.',
  },
  {
    id: 'devops', name: 'DevOps', init: initDevopsDashboardDemo, shell: 'pw-devops-embed',
    caption: 'Безопасная работа с учётными данными инфраструктуры',
    label: 'Пассворк для DevOps: отдельные сейфы Production, Staging и Development, временный токен сборки, получение секрета по API и CLI, ротация ключей и журнал обращений.',
  },
  {
    id: 'security', name: 'Безопасность', init: initSecurityDashboardDemo, shell: 'pw-security-embed',
    caption: 'Контроль доступа и аудит действий сотрудников',
    label: 'Пассворк для безопасности: уведомление о массовом открытии паролей, журнал действий пользователя, сравнение версий записи, права доступа и настройка уведомлений.',
  },
  {
    id: 'government', name: 'Госорганизации', init: initGovernmentDashboardDemo, shell: 'pw-industry-embed',
    caption: 'Российское решение для защищённой инфраструктуры',
    label: 'Пассворк для госорганизаций: роли сотрудников, пароли ведомственных систем, журнал действий и отзыв доступа с сохранением истории.',
  },
  {
    id: 'manufacturing', name: 'Производство', init: initManufacturingDashboardDemo, shell: 'pw-industry-embed',
    caption: 'Управление доступом для подразделений и рабочих команд',
    label: 'Пассворк для производства: доступ к техническим системам, история пароля SCADA, политика ротации, уведомления о подозрительной активности и журнал действий.',
  },
] as const;

function shellFor(index: number) {
  let sidebar = DASHBOARD_SIDEBAR_MARKUP;
  let header = DASHBOARD_HEADER_MARKUP;
  if (index === 1) {
    const sharedStart = sidebar.indexOf('<div class="pw-sec"><span class="pw-sec__title">Общие сейфы');
    const treeStart = sidebar.indexOf('<div class="pw-tree">', sharedStart);
    const sharedEnd = sidebar.indexOf('<div class="pw-sec"><span class="pw-sec__title">Корпоративные сейфы', treeStart);
    const folder = sidebar.match(/<span class="pw-tree-row__folder">(.*?)<\/span>/)?.[1].replace(/fill="#[^"]+"/g, 'fill="currentColor"') ?? '';
    sidebar = sidebar.slice(0, treeStart) + `<div class="pw-tree pw-devops__vaults">${['Production', 'Staging', 'Development'].map((name, i) => `<div class="pw-tree-row pw-tree-row--l1${i === 0 ? ' pw-tree-row--active' : ''}" data-environment="${name}"><span class="pw-tree-row__folder">${folder}</span><span class="pw-tree-row__text">${name}</span><span class="pw-devops__vault-count">${[12, 8, 6][i]}</span></div>`).join('')}</div>` + sidebar.slice(sharedEnd);
    header = header.replace('Администрирование', 'DevOps').replace('Доступы к серверам', 'Production').replace('Доступ к папке:', 'Доступ к сейфу:').replace('33 пользователя', '8 пользователей').replace('Добавить пароль', 'Добавить секрет');
  } else if (index >= 3) {
    const [vault, group, folder, other] = index === 3
      ? ['Госорганизация', 'Ведомственные системы', 'Документооборот', 'Служебные сервисы']
      : ['Производство', 'Технологическая сеть', 'Линия № 1', 'Офисные сервисы'];
    sidebar = sidebar.replace('Администрирование', vault).replace('Авторизация и 2FA', group).replace('Доступы к серверам', folder).replace('Тестовые сервера', 'Тестовые системы').replace('>Реклама<', `>${other}<`);
    header = header.replace('Администрирование', vault).replace('Доступы к серверам', folder);
  }
  return `<div class="pw-stage" aria-hidden="true"><div class="pw-app"><div class="pw-audit__sidebar">${sidebar}</div><div class="pw-main"><div class="pw-audit__header">${header}</div><div class="pw-audit__workspace pw-it__workspace"></div></div></div></div>`;
}

export function mountTeamDashboard(embed: HTMLElement, index: number) {
  const scenario = teamScenarios[index];
  if (!embed || !scenario) return () => {};
  let alive = true;
  let controller: ReturnType<typeof initItDashboardDemo> | undefined;
  embed.className = `pw-team-dashboard pw-embed pw-audit-embed pw-it-embed ${scenario.shell}`;
  embed.setAttribute('aria-label', scenario.label);
  embed.dataset.scenario = scenario.id;
  const fit = () => embed.style.setProperty('--pw-s', String(embed.clientWidth / 1344));
  const play = () => {
    if (!alive) return;
    controller?.dispose();
    // Reset the entire shell too: cues change avatars, counts and the active vault.
    embed.innerHTML = shellFor(index);
    fit();
    controller = scenario.init(embed, embed.querySelector<HTMLElement>('.pw-it__workspace')!, {
      onComplete: () => queueMicrotask(play),
    });
  };
  const resize = new ResizeObserver(fit);
  resize.observe(embed);
  play();
  return () => {
    alive = false;
    controller?.dispose();
    resize.disconnect();
    embed.replaceChildren();
  };
}
