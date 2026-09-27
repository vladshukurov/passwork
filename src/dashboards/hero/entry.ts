import { initLiveDashboard } from './live-dashboard-engine';
import { LIVE_DASHBOARD_MARKUP } from './live-dashboard-markup';

// The live engine and SVGs are copied from reserve-clone without changing its timeline.
// The toolbar, light palette and coordinate scaling adapt it to the supplied homepage.
const toolbar = `<div class="pw-window-bar" aria-hidden="true">
  <div class="pw-window-dots"><i></i><i></i><i></i></div>
  <div class="pw-window-arrows" aria-hidden="true"><span class="pw-window-chevron pw-window-chevron--back"></span><span class="pw-window-chevron pw-window-chevron--forward"></span></div>
  <span class="pw-window-title">Настройки и пользователи</span>
  <div class="pw-window-user"><span>Андрей Пьянков</span><span class="pw-window-avatar">А</span></div>
</div>`;
const markup = LIVE_DASHBOARD_MARKUP.replace('<div class="pw-stage">', `<div class="pw-stage" aria-hidden="true">${toolbar}`);

export function mountHeroDashboard(embed: HTMLElement): () => void {
  const phone = matchMedia('(max-width: 809.98px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let stop: (() => void) | undefined;
  const initialize = () => {
    stop?.();
    embed.innerHTML = markup;
    stop = initLiveDashboard(embed, { animate: !phone.matches && !reduced.matches });
  };
  initialize();
  phone.addEventListener('change', initialize);
  reduced.addEventListener('change', initialize);
  return () => {
    stop?.();
    phone.removeEventListener('change', initialize);
    reduced.removeEventListener('change', initialize);
  };
}
