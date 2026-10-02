import { initVaultScene, VAULT_MARKUP } from './vault-scene';
import './vault.css';

// The window bar still frames the other hero tabs (product-views.ts); the live
// scene draws the product's own top bar from the Figma mockups instead.
export const WINDOW_BAR = `<div class="pw-window-bar" aria-hidden="true">
  <div class="pw-window-dots"><i></i><i></i><i></i></div>
  <div class="pw-window-arrows" aria-hidden="true"><span class="pw-window-chevron pw-window-chevron--back"></span><span class="pw-window-chevron pw-window-chevron--forward"></span></div>
  <span class="pw-window-title">Настройки и пользователи</span>
  <div class="pw-window-user"><span>Андрей Пьянков</span><span class="pw-window-avatar">А</span></div>
</div>`;

export function mountHeroDashboard(embed: HTMLElement): () => void {
  const phone = matchMedia('(max-width: 809.98px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let stop: (() => void) | undefined;
  const initialize = () => {
    stop?.();
    embed.innerHTML = VAULT_MARKUP;
    stop = initVaultScene(embed, { animate: !phone.matches && !reduced.matches });
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
