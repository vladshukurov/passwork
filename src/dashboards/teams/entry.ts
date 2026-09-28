// Original scenarios from reserve-passwork-copy; this adapter replaces only React mounting.
import { DASHBOARD_HEADER_MARKUP, DASHBOARD_SIDEBAR_MARKUP } from './live-dashboard-markup';
import { teamScenarios } from './scenarios';
import { initItDashboardDemo } from './it-dashboard-demo';
import { initDevopsDashboardDemo } from './devops-dashboard-demo';
import { initSecurityDashboardDemo } from './security-dashboard-demo';
import { initGovernmentDashboardDemo } from './government-dashboard-demo';
import { initManufacturingDashboardDemo } from './manufacturing-dashboard-demo';

const inits = {
  it: initItDashboardDemo, devops: initDevopsDashboardDemo, security: initSecurityDashboardDemo,
  government: initGovernmentDashboardDemo, manufacturing: initManufacturingDashboardDemo,
};

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
    controller = inits[scenario.id](embed, embed.querySelector<HTMLElement>('.pw-it__workspace')!, {
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
