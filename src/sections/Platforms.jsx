import React from 'react';
import { tidyCopy } from '../lib/typography.js';

const platformIcons = {
  desktop: [['apple', 'macOS'], ['windows', 'Windows'], ['linux', 'Linux']],
  mobile: [['apple', 'iOS'], ['googleplay', 'Android']],
  browser: [['googlechrome', 'Chrome'], ['firefoxbrowser', 'Firefox'], ['microsoftedge', 'Edge'], ['safari', 'Safari']],
};

function PlatformAvailability({ platforms, light = false }) {
  return <div className={`platform-availability${light ? ' platform-availability-light' : ''}`} aria-label={`Доступно: ${platforms.map(([, name]) => name).join(', ')}`}>
    <span>Доступно для</span>
    <div className="platform-availability-icons" aria-hidden="true">{platforms.map(([icon, name]) =>
      <span key={icon} className={`platform-availability-icon platform-icon-${icon}`}
        style={{ '--platform-icon': `url("/passwork-assets/platform-${icon}.svg")` }} title={name} />)}</div>
  </div>;
}

function Platforms() {
  return <section className="platforms" id="platforms" aria-labelledby="platforms-heading"><div className="platforms-inner">
    <div className="section-intro platforms-intro">
      <h2 id="platforms-heading"><span>{tidyCopy('Пассворк на компьютере,')}</span>{' '}<span>{tidyCopy('телефоне и в браузере')}</span></h2>
      <div><p>{tidyCopy('Управляйте паролями, подтверждайте вход и получайте доступ к данным с удобного устройства')}</p>
        <a className="button button-dark" href="https://passwork.ru/manuals/apps/desktop-app/" target="_blank" rel="noopener noreferrer" aria-label="Скачать Пассворк — инструкция по установке">Скачать Пассворк</a>
      </div>
    </div>
    <article className="platform-feature">
      <img className="platform-feature-gradient" src="/passwork-assets/figma-platform-wide-gradient-2026.png" alt="" aria-hidden="true" />
      <img className="platform-feature-dots" src="/passwork-assets/figma-platform-wide-dots-2026.svg" alt="" aria-hidden="true" />
      <img className="platform-feature-dots dot-glint" src="/passwork-assets/figma-platform-wide-dots-2026.svg" alt="" aria-hidden="true" />
      <div className="platform-feature-copy"><h3>Десктопное приложение</h3><p>{tidyCopy('Управляйте паролями и доступами в приложении для macOS, Windows и Linux')}</p>
        <PlatformAvailability platforms={platformIcons.desktop} light /></div>
      <img className="platform-feature-art" src="/passwork-assets/figma-platform-browser-hero-2026.png" alt="Десктопное приложение Пассворк: работа с паролем и доступами" loading="lazy" />
    </article>
    <div className="platforms-cards">
      <article className="platform-card platform-card-mobile">
        <div className="platform-card-copy"><h3>Мобильное приложение</h3><p>{tidyCopy('Открывайте рабочие пароли с телефона, когда вы не за компьютером')}</p>
          <PlatformAvailability platforms={platformIcons.mobile} /></div>
        <img className="platform-phone-art" src="/passwork-assets/figma-platform-phone-auth-2026.png" alt="Экран мобильного приложения Пассворк" loading="lazy" />
      </article>
      <article className="platform-card platform-card-2fa">
        <div className="platform-card-copy"><h3>2FA</h3><p>{tidyCopy('Подтверждайте вход с помощью приложения аутентификатора Пассворк')}</p>
          <PlatformAvailability platforms={platformIcons.mobile} /></div>
        <img className="platform-phone-art" src="/passwork-assets/figma-platform-phone-app-2026.png" alt="Экран приложения Пассворк" loading="lazy" />
      </article>
      <article className="platform-card platform-card-browser">
        <div className="platform-card-copy"><h3>{tidyCopy('Расширение для браузера')}</h3><p>{tidyCopy('Ищите и создавайте учётные данные, не покидая браузер')}</p>
          <PlatformAvailability platforms={platformIcons.browser} /></div>
        <div className="platform-access-screens" role="img" aria-label="Интерфейс расширения Пассворка в браузере">
          <img src="/passwork-assets/figma-platform-access-folder-2026.png" alt="" loading="lazy" />
          <img src="/passwork-assets/figma-platform-access-create-2026.png" alt="" loading="lazy" />
        </div>
      </article>
    </div>
  </div></section>;
}

export default Platforms;
