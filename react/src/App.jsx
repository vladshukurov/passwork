import React, { useEffect, useState } from 'react';
import siteHtml from '../../dist/index.html?raw';
import Button from './Button.jsx';
import { peopleAtProgress, progressAtPeople } from './pricing-scale.js';
import { mountSectionNavigation } from './section-navigation.js';

// The production HTML is the visual contract during migration. The React
// components below own the page structure; complex exported artwork remains
// byte-for-byte identical to the existing site until it has React equivalents.
const reference = new DOMParser().parseFromString(siteHtml, 'text/html');
// Flip to false for an immediate rollback of the blue pricing/trust experiment.
const HERO_SURFACE_EXPERIMENT = false;
const by = selector => {
  const node = reference.querySelector(selector);
  if (!node) throw new Error(`Missing production markup: ${selector}`);
  return node;
};

export function Header({ className = '' }) {
  return <header className={['site-header', 'react-site-header', className].filter(Boolean).join(' ')}><div className="header-inner">
    <a className="brand" href="#top" aria-label="Пассворк — на главную">
      <img className="brand-dark" src="/passwork-assets/logo-dark.svg" alt="Пассворк" />
      <img className="brand-light" src="/passwork-assets/logo-light.svg" alt="" aria-hidden="true" />
    </a>
    <nav id="main-nav" aria-label="Основная навигация">
      <a href="#about">Компания</a><a href="#teams">Сценарии</a><a href="#security">Ресурсы</a>
      <button type="button" data-dialog="support">Поддержка</button>
      <a href="#pricing">Цены</a>
    </nav>
    <Button className="header-demo" />
    <button className="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Открыть меню"><span /><span /></button>
  </div></header>;
}

const productTabs = [
  ['Хранение паролей', 'imgKey02'],
  ['Управление доступом', 'imgUsersProfiles01'],
  ['Коды 2FA', 'imgShield02'],
  ['Журнал действий', 'imgBook01'],
];

export function ProductTabs({ selected = 0 }) {
  return <div className="product-tabs" role="tablist" aria-label="Возможности Пассворка">
    {productTabs.map(([label, icon], index) => <button key={label} id={`product-tab-${index}`} role="tab"
      aria-selected={index === selected} aria-controls="product-panel" tabIndex={index === selected ? 0 : -1}
      data-product={index}><img src={`/passwork-assets/${icon}.svg`} alt="" /><span>{label}</span></button>)}
  </div>;
}

function Hero() {
  return <section className="hero" id="top">
    <div className="hero-gradient" aria-hidden="true" />
    <img src="/passwork-assets/imgVector1.svg" alt="" className="hero-dots" />
    <img src="/passwork-assets/imgVector1.svg" alt="" className="hero-dots dot-glint" aria-hidden="true" />
    <div className="hero-copy-scroll"><div className="hero-copy">
      <img className="hero-origin" src="/passwork-assets/figma-made-in-russia-2026.svg" alt="Сделано в России" width="120" height="34" />
      <h1><span className="hero-title-line">Пассворк — основа вашей</span>{' '}<span className="hero-title-line">информационной безопасности</span></h1>
      <p>Управление корпоративными паролями, доступами и действиями — в одном контуре</p>
      <div className="hero-actions"><Button dialog="implementation">Обсудить внедрение</Button></div>
    </div></div>
    <div className="product-showcase"><ProductTabs />
      <div className="hero-window-shell"><div className="hero-window-scale">
        <div id="product-panel" role="tabpanel" aria-labelledby="product-tab-0" className="product-window" tabIndex="0">
          <div className="pw-live-dashboard pw-embed" role="img" aria-label="Анимированная демонстрация Пассворка: поиск пароля, просмотр записи, журнал действий и права доступа" />
          <noscript><img src="/passwork-assets/imgImage27.png" alt="Интерфейс Пассворка" className="product-screenshot" width="1341" height="787" /></noscript>
          <div className="product-detail" hidden />
        </div>
      </div></div>
    </div>
  </section>;
}

const clientLogos = [
  [['/passwork-assets/imgVkusvillTextlogo20211.svg', 'ВкусВилл', 133, 17], ['/passwork-assets/client-logos/open-mobile-platform.svg', 'Открытая мобильная платформа', 87, 31]],
  [['/passwork-assets/imgFrame.svg', 'ПИК', 67, 21], ['/passwork-assets/client-logos/cherkizovo.svg', 'Группа Черкизово', 115, 24]],
  [['/passwork-assets/imgGroup1.svg', 'ВТБ', 79, 29], ['/passwork-assets/client-logos/dit-moscow.svg', 'ДИТ Москвы', 93, 33]],
  [['/passwork-assets/imgFrame1.svg', 'Иви', 65, 19], ['/passwork-assets/imgHeadHunterLogo1.svg', 'HeadHunter', 35, 35]],
  [['/passwork-assets/imgOkkoLogo1.svg', 'Okko', 76, 28], ['/passwork-assets/client-logos/sber-health.png', 'СберЗдоровье', 112, 34]],
  [['/passwork-assets/imgHeadHunterLogo1.svg', 'HeadHunter', 35, 35], ['/passwork-assets/imgFrame1.svg', 'Иви', 65, 19]],
];

function ClientLogoArt({ logo }) {
  const [src, , width, height] = logo;
  return <span className="client-logo-frame">
    {src.startsWith('/passwork-assets/client-logos/')
      ? <span className="client-logo-art" style={{ width, height, '--logo-art': `url(${src})` }} />
      : <img src={src} alt="" width={width} height={height} />}
  </span>;
}

function ClientLogos() {
  return <section aria-label="Пассворк выбирают"><div className="client-logos" role="list">
    {clientLogos.map(([first, second], index) => <div key={first[1]} className="client-logo" role="listitem"
      aria-label={`${first[1]}, ${second[1]}`} style={{ '--logo-delay': `${index * 100}ms` }}>
      <div className="client-logo-viewport" aria-hidden="true"><div className="client-logo-track">
        <ClientLogoArt logo={first} /><ClientLogoArt logo={second} /><ClientLogoArt logo={first} />
      </div></div>
    </div>)}
  </div></section>;
}

function About() {
  return <section className="about" id="about"><h2>Пассворк — корпоративный менеджер паролей
    <span>для ИТ-команд, DevOps и специалистов по безопасности. Он помогает хранить пароли, управлять доступом и отслеживать действия внутри инфраструктуры</span>
  </h2></section>;
}

export function SectionIntro({ headingId, title, description }) {
  return <div className="section-intro"><h2 id={headingId}>{title}</h2><div>
    <p>{description}</p><Button variant="dark" />
  </div></div>;
}

function CertificationCard({ node }) {
  const artwork = node.querySelector('.certification-art');
  const copy = node.querySelector('.certification-copy');
  return <article className="certification-card" role="listitem">
    <div className={artwork.className} dangerouslySetInnerHTML={{ __html: artwork.innerHTML }} />
    <div className="certification-copy"><h3>{copy.querySelector('h3').textContent}</h3><p>{copy.querySelector('p').textContent}</p></div>
  </article>;
}

function Certification() {
  return <section className="certification" id="certification" aria-labelledby="certification-heading">
    <SectionIntro headingId="certification-heading" title={<>Пассворк сертифицирован<br />ФСТЭК России</>}
      description="Сертификат доверия подтверждает соответствие требованиям безопасности регулируемых отраслей. Разворачивается внутри компании, поддерживает ГОСТ-шифрование, исключает передачу данных во внешние сервисы" />
    <div className="certification-cards" role="list">{[...by('.certification-cards').children].map((node, index) => <CertificationCard key={index} node={node} />)}</div>
  </section>;
}

const teamLabels = ['IT-команды', 'DevOps', 'Безопасность', 'Госорганизации', 'Производство'];

export function TeamTabs({ selected = 0 }) {
  return <div className="team-tabs" role="tablist" aria-label="Пассворк для вашей команды">
    {teamLabels.map((label, index) => <button key={label} id={`team-tab-${index}`} role="tab"
      aria-selected={index === selected} aria-controls="team-panel" tabIndex={index === selected ? 0 : -1}
      data-team={index}>{label}</button>)}
  </div>;
}

function TeamScene() {
  return <section className="team-scene" id="team-panel" role="tabpanel" aria-labelledby="team-tab-0" tabIndex="0">
    <img src="/passwork-assets/img1PxDots8PxPitch800600Source.svg" alt="" className="scene-dots" />
    <img src="/passwork-assets/img1PxDots8PxPitch800600Source.svg" alt="" className="scene-dots dot-glint" aria-hidden="true" />
    <div className="team-dashboard-window team-screenshot"><div className="pw-team-dashboard pw-embed" role="img" aria-label="Анимированная демонстрация Пассворка для IT-команд" /></div>
    <p className="team-caption" aria-live="polite">Разграничение доступа по ролям и группам</p>
  </section>;
}

function Security() {
  // The three illustrations are large, layered SVG/HTML scenes. Keep their
  // exported geometry intact while migrating the section shell to React.
  const stage = by('.security-switcher-stage');
  return <div className="security-scroll-track" id="security"><section className="security-switcher" aria-labelledby="security-heading">
    <SectionIntro headingId="security-heading" title="Российское решение для корпоративной безопасности"
      description={<>Управляйте корпоративными паролями и доступом сотрудников в единой системе.<br />Размещайте Пассворк на своих серверах.</>} />
    <div className="security-switcher-grid" role="group" aria-roledescription="карусель" aria-label="Особенности безопасности" tabIndex="0">
      <div className="security-switcher-copy">
        <div className="security-copy-heading"><div className="feature-label">Безопасность</div><h3>Защита данных<br />под вашим контролем</h3></div>
        <div className="security-story-list">{securityStories.map(([title, description], index) => <SecurityStory key={title}
          index={index} title={title} description={description} />)}</div>
      </div>
      <div className="security-switcher-stage" dangerouslySetInnerHTML={{ __html: stage.innerHTML }} />
    </div>
  </section></div>;
}

const securityStories = [
  ['ГОСТ-шифрование', 'Поддержка ГОСТ Р 34.10-2012 и ГОСТ Р 34.11-2012. Данные остаются на серверах вашей компании.'],
  ['Сертификат ФСТЭК России', 'Пассворк имеет сертификат ФСТЭК России по 4 уровню доверия — для систем с повышенными требованиями к защите информации.'],
  ['В собственном контуре', 'Разверните Пассворк на своих серверах: пароли, файлы и резервные копии останутся внутри инфраструктуры компании.'],
];

export function SecurityStory({ index, title, description, active = index === 0 }) {
  return <article className={`security-story${active ? ' is-active' : ''}`}>
    <button className="security-story-heading" type="button" data-feature-index={index} aria-expanded={active}
      aria-controls={`security-story-detail-${index}`}>{title}</button>
    <div className="security-story-detail" id={`security-story-detail-${index}`} aria-hidden={!active}>
      <div className="security-story-detail-inner"><p>{description}</p><div className="security-story-progress" aria-hidden="true"><span /></div></div>
    </div>
  </article>;
}

const plans = [
  {
    name: 'Стандарт', price: '11 ₽',
    description: 'Подходит для небольших команд и повседневного управления паролями и доступами',
    features: [
      'Совместная работа с паролями и сейфами',
      'API и импорт/экспорт для интеграций',
      'Гибкие права доступа пользователей и групп',
      'История действий и изменений',
      'Двухфакторная аутентификация',
    ],
    action: 'Попробовать',
  },
  {
    name: 'Расширенная', price: '17 ₽', featured: true,
    description: 'Для крупных компаний с повышенными требованиями к безопасности, контролю и масштабированию',
    features: [
      'SAML SSO и синхронизация с LDAP',
      'Роли администраторов и групповые политики',
      'Репликация и отказоустойчивость',
      'Сервисные аккаунты для автоматизации',
      'Офлайн-доступ с контролем администратора',
    ],
    action: 'Попробовать',
  },
  {
    name: 'ФСТЭК', price: '14 ₽',
    description: 'Сертифицированная версия для организаций с повышенными требованиями к безопасности и соответствию',
    features: [
      'Сертификация ФСТЭК 4-го уровня доверия',
      'Для КИИ и регулируемых организаций',
      'Соответствие требованиям ГИС, АСУ ТП и ИСПДн',
      'Поддержка ГОСТ-шифрования',
      'Совместимость с российскими ОС',
    ],
    action: 'Запросить демо',
  },
];

const formatRubles = amount => new Intl.NumberFormat('ru-RU').format(amount);
function DarkHeadingDots() {
  return <>
    <img className="dark-heading-dots" src="/passwork-assets/figma-dark-heading-dots-2026.png" width="1212" height="866" alt="" aria-hidden="true" />
    <img className="dark-heading-dots dark-heading-glint dot-glint" src="/passwork-assets/figma-dark-heading-dots-2026.png" width="1212" height="866" alt="" aria-hidden="true" />
  </>;
}
function SectionHeroSurface() {
  return <div className="section-hero-surface" aria-hidden="true">
    <div className="section-hero-gradient" />
    <img className="section-hero-dots" src="/passwork-assets/imgVector1.svg" alt="" />
    <img className="section-hero-dots dot-glint" src="/passwork-assets/imgVector1.svg" alt="" />
  </div>;
}

const peopleLabel = count => {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return 'сотрудников';
  if (last === 1) return 'сотрудник';
  if (last >= 2 && last <= 4) return 'сотрудника';
  return 'сотрудников';
};

export function Pricing() {
  const [teamProgress, setTeamProgress] = useState(progressAtPeople(25));
  const largeTeam = teamProgress === 1000;
  const teamSize = peopleAtProgress(teamProgress);
  const changeTeamSize = count => {
    const next = Math.max(1, Math.round(count));
    setTeamProgress(next > 100 ? 1000 : next === 100 ? 999 : progressAtPeople(next));
  };
  return <section className="pricing" id="pricing" aria-labelledby="pricing-heading">
    <SectionHeroSurface />
    <div className="pricing-inner">
      <div className="pricing-heading"><DarkHeadingDots /><h2 id="pricing-heading">Выберите размер команды<br />и сравните возможности Пассворка</h2></div>
      <div className="pricing-team-selector">
        <div className={`pricing-team-readout${largeTeam ? ' is-large' : ''}`}><span>Размер команды</span>
          <strong>{largeTeam ? 'Больше 100 сотрудников' : `${teamSize} ${peopleLabel(teamSize)}`}</strong>
        </div>
        <div className="pricing-range-control">
          <div className="pricing-range-main">
            <div className="pricing-range-wrap" style={{ '--pricing-progress': `${teamProgress / 10}%` }}>
              <input id="pricing-team-size" type="range" min="0" max="1000" step="1"
                value={teamProgress} aria-label="Размер команды" aria-valuetext={largeTeam ? 'Больше 100 сотрудников' : `${teamSize} ${peopleLabel(teamSize)}`}
                onChange={event => setTeamProgress(Number(event.target.value))}
                onKeyDown={event => {
                  const delta = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 }[event.key];
                  if (delta) {
                    event.preventDefault();
                    if (largeTeam && delta < 0) setTeamProgress(999);
                    else changeTeamSize(teamSize + delta);
                  }
                }} />
            </div>
          </div>
        </div>
      </div>
      <div className="pricing-plans">
        {plans.map(plan => <article className={`pricing-plan${plan.featured ? ' pricing-plan-featured' : ''}`} key={plan.name}>
          {plan.featured && <div className="pricing-plan-art" aria-hidden="true">
            <img className="pricing-plan-gradient" src="/passwork-assets/figma-pricing-gradient-2026.png" alt="" />
            <img className="pricing-plan-pattern" src="/passwork-assets/figma-pricing-dots-2026.svg" alt="" />
            <img className="pricing-plan-glint dot-glint" src="/passwork-assets/figma-pricing-dots-2026.svg" alt="" />
          </div>}
          <div className="pricing-plan-intro"><h3>{plan.name}</h3><p>{plan.description}</p></div>
          <div className="pricing-plan-offer">
            <p className="pricing-plan-total">{largeTeam ? 'По запросу' : `${formatRubles(Number.parseInt(plan.price, 10) * teamSize * 365)} ₽`}</p>
            <p className="pricing-plan-term">{largeTeam ? 'Индивидуальный расчёт' : `≈${plan.price} за пользователя в день`}</p>
            <Button dialog="pricing" className="pricing-plan-action">{plan.action}</Button>
          </div>
          <ul className="pricing-features">{plan.features.map(feature => <li key={feature}>
            <img src="/passwork-assets/figma-pricing-check-2026.svg" alt="" width="16" height="16" />{feature}
          </li>)}</ul>
        </article>)}
      </div>
    </div>
  </section>;
}

const secretFeatures = [
  ['Хранение API-ключей и токенов', 'Централизованное хранилище для API-ключей, токенов и паролей', 'key-round.svg'],
  ['Интеграция с CI/CD', 'Нативная интеграция с GitLab CI, Jenkins, GitHub Actions через API и webhooks', 'figma-secrets-cicd-2026.svg'],
  ['Работа с конфигурациями', 'Хранение конфигурационных файлов, переменных окружения и секретов', 'figma-secrets-config-2026.svg'],
  ['Гранулярный контроль доступа', 'Разграничение прав на уровне отдельных секретов, проектов и команд', 'figma-secrets-access-2026.svg'],
];

export function Secrets() {
  return <section className="secrets" id="secrets" aria-labelledby="secrets-heading"><div className="secrets-inner">
    <SectionIntro headingId="secrets-heading" title={<>Менеджер секретов<br />{' '}для разработчиков<br />{' '}и DevOps</>}
      description="Безопасное хранение и доставка секретов в ваши приложения и инфраструктуру. Полный контроль доступа и аудит без компромиссов в скорости разработки" />
    <div className="secrets-cards" role="list">{secretFeatures.map(([title, description, icon]) =>
      <article className="secrets-card" role="listitem" key={title}>
        <img className="secrets-card-icon" src={`/passwork-assets/${icon}`} width="24" height="24" alt="" />
        <div className="secrets-card-copy"><h3>{title}</h3><p>{description}</p></div>
      </article>)}</div>
  </div></section>;
}

function SectionDivider({ openBottom = false, inGrid = false }) {
  return <div className={`section-divider${openBottom ? ' section-divider-open' : ''}${inGrid ? ' section-divider-in-grid' : ''}`} aria-hidden="true"><div /></div>;
}

const trustSignals = [
  { title: 'Реестр отечественного ПО', source: 'Минцифры России', image: 'figma-trust-registry-2026.png', kind: 'registry' },
  { title: 'Лицензия ФСБ на криптографию', source: 'ФСБ России', image: 'figma-trust-fsb-2026.png', kind: 'fsb' },
  { title: 'Программа Bug Bounty', source: 'Standoff Bug Bounty', image: 'figma-trust-bugbounty-2026.png', kind: 'bugbounty' },
  { title: 'Лицензии ФСТЭК России', source: 'Регулятор ИБ', image: 'figma-trust-fstek-2026.png', kind: 'fstek' },
];

export function Trust() {
  return <section className="trust" id="trust" aria-labelledby="trust-heading">
    <SectionHeroSurface />
    <div className="trust-inner">
      <div className="trust-heading">
        <DarkHeadingDots />
        <h2 id="trust-heading">Соответствие требованиям и доверие регуляторов</h2>
        <p>Пассворк включён в реестр отечественного ПО, имеет лицензии ФСТЭК и ФСБ, проходит сертификацию и участвует в программе Bug Bounty<br className="trust-desktop-break" /> для независимой проверки безопасности</p>
      </div>
      <div className="trust-cards" role="list">
        {trustSignals.map(signal => <article className={`trust-card trust-card-${signal.kind}`} role="listitem" key={signal.kind}>
          <img className="trust-card-art" src={`/passwork-assets/${signal.image}`} alt="" loading="lazy" />
          <div className="trust-card-copy"><h3>{signal.title}</h3><p>{signal.source}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}

const platformIcons = {
  desktop: [['apple', 'macOS'], ['windows', 'Windows'], ['linux', 'Linux']],
  mobile: [['apple', 'iOS'], ['googleplay', 'Google Play']],
  twoFactor: [['apple', 'iOS'], ['googleplay', 'Google Play']],
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

export function Platforms() {
  return <section className="platforms" id="platforms" aria-labelledby="platforms-heading"><div className="platforms-inner">
    <div className="platforms-intro">
      <h2 id="platforms-heading">Используйте Пассворк<br />в браузере, на телефоне</h2>
      <div><p>Безопасное хранение и доставка секретов в ваши приложения и инфраструктуру. Полный контроль доступа и аудит без компромиссов в скорости разработки</p>
        <a className="button button-dark" href="https://passwork.ru/manuals/apps/desktop-app/" target="_blank" rel="noopener noreferrer" aria-label="Скачать Пассворк — инструкция по установке">Скачать Пассворк</a>
      </div>
    </div>
    <article className="platform-feature">
      <img className="platform-feature-gradient" src="/passwork-assets/figma-platform-wide-gradient-2026.png" alt="" aria-hidden="true" />
      <img className="platform-feature-dots" src="/passwork-assets/figma-platform-wide-dots-2026.svg" alt="" aria-hidden="true" />
      <div className="platform-feature-copy"><h3>Десктопное приложение</h3><p>Полная функциональность управления паролями в нативном приложении для ПК</p>
        <PlatformAvailability platforms={platformIcons.desktop} light /></div>
      <img className="platform-feature-art" src="/passwork-assets/figma-platform-browser-hero-2026.png" alt="Десктопное приложение Пассворк: работа с паролем и доступами" loading="lazy" />
    </article>
    <div className="platforms-cards">
      <article className="platform-card platform-card-mobile">
        <div className="platform-card-copy"><h3>Мобильное приложение</h3><p>Быстрый доступ к вашим корпоративным паролям с мобильного устройства</p>
          <PlatformAvailability platforms={platformIcons.mobile} /></div>
        <img className="platform-phone-art" src="/passwork-assets/figma-platform-phone-auth-2026.png" alt="Экран мобильного приложения Пассворк" loading="lazy" />
      </article>
      <article className="platform-card platform-card-2fa">
        <div className="platform-card-copy"><h3>2FA</h3><p>Удобная проверка входа с помощью приложения аутентификатора Пассворк</p>
          <PlatformAvailability platforms={platformIcons.twoFactor} /></div>
        <img className="platform-phone-art" src="/passwork-assets/figma-platform-phone-app-2026.png" alt="Экран приложения Пассворк" loading="lazy" />
      </article>
      <article className="platform-card platform-card-browser">
        <div className="platform-card-copy"><h3>Расширение для браузера</h3><p>Ищите и создавайте учетные данные, не покидая браузер.<br />Работает с Chrome, Firefox, Edge и Safari</p>
          <PlatformAvailability platforms={platformIcons.browser} /></div>
        <div className="platform-access-screens" role="img" aria-label="Интерфейс расширения Пассворка в браузере">
          <img src="/passwork-assets/figma-platform-access-folder-2026.png" alt="" loading="lazy" />
          <img src="/passwork-assets/figma-platform-access-create-2026.png" alt="" loading="lazy" />
        </div>
      </article>
    </div>
  </div></section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-inner">
    <div className="footer-main">
      <div className="footer-brand">
        <a href="#top" aria-label="Пассворк — к началу страницы"><img className="footer-logo" src="/passwork-assets/logo-light.svg" alt="Пассворк" /></a>
        <p>Управление корпоративными паролями<br />и доступами в одном контуре.</p>
        <Button variant="dark">Запросить демо</Button>
        <img className="footer-russia" src="/passwork-assets/imgVector.svg" alt="Сделано в России" />
      </div>
      <nav className="footer-column" aria-label="Продукт">
        <h2>Пассворк</h2>
        <a href="#top">Возможности</a><a href="#teams">Для вашей команды</a><a href="#certification">Сертификация</a>
        <a href="#pricing">Стоимость</a>
      </nav>
      <nav className="footer-column" aria-label="Ресурсы">
        <h2>Ресурсы</h2>
        <a href="https://passwork.ru/docs/" target="_blank" rel="noopener noreferrer">Техническая документация</a>
        <a href="https://manuals.passwork.ru/" target="_blank" rel="noopener noreferrer">Руководство пользователя</a>
        <a href="https://passwork.ru/help/" target="_blank" rel="noopener noreferrer">Центр поддержки</a>
        <button type="button" data-dialog="implementation">Обсудить внедрение</button>
      </nav>
    </div>
    <div className="footer-bottom">
      <span>© 2014–2026 ООО «Пассворк»</span>
      <a href="https://passwork.ru/Политика_конфиденциальности.pdf" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a>
      <a href="https://passwork.ru/Лицензионное_соглашение.pdf" target="_blank" rel="noopener noreferrer">Лицензионное соглашение</a>
      <a href="#top" className="footer-top" aria-label="К началу страницы">Наверх</a>
    </div>
  </div></footer>;
}

function ContactDialog() {
  return <dialog className="contact-dialog" aria-labelledby="dialog-title">
    <button className="dialog-close" type="button" aria-label="Закрыть окно">×</button>
    <h2 id="dialog-title">Запросить демо</h2><p className="dialog-description" />
    <form id="contact-form">
      <label>Имя<input name="name" autoComplete="name" required placeholder="Как к вам обращаться" /></label>
      <label>Рабочая почта<input name="email" type="email" autoComplete="email" required placeholder="you@company.ru" /></label>
      <label>Компания<input name="company" autoComplete="organization" required placeholder="Название компании" /></label>
      <p className="form-note">Это локальный прототип: данные не отправляются.</p>
      <button className="button button-dark" type="submit">Подготовить заявку</button>
    </form><div className="form-result" role="status" hidden />
  </dialog>;
}

function App() {
  useEffect(() => {
    const stopSectionNavigation = mountSectionNavigation();
    let active = true;
    let stopMotion;
    let anchorFrame = 0;
    const initialHash = location.hash;
    // Mount after commit and release every GSAP/dashboard controller on unmount.
    import('../../dist/passwork.js').then(({ mountPasswork }) => {
      if (!active) return;
      stopMotion = mountPasswork();
      // The target does not exist during the browser's native initial hash jump.
      if (initialHash && location.hash === initialHash && scrollY < 2) {
        anchorFrame = requestAnimationFrame(() => {
          document.getElementById(decodeURIComponent(initialHash.slice(1)))?.scrollIntoView({ behavior: 'instant' });
        });
      }
    }).catch(error => console.error('Не удалось запустить анимации сайта', error));
    return () => {
      active = false;
      cancelAnimationFrame(anchorFrame);
      stopMotion?.();
      stopSectionNavigation();
    };
  }, []);

  return <>
    <a className="skip-link" href="#main">Перейти к содержимому</a>
    <Header className={HERO_SURFACE_EXPERIMENT ? 'hero-surface-experiment' : ''} />
    <main id="main" className={HERO_SURFACE_EXPERIMENT ? 'hero-surface-experiment' : ''}><Hero /><div className="page-grid">
      <ClientLogos /><About /><Certification />
      <section className="teams-heading" id="teams"><h2>Пассворк решает<br />задачи разных команд</h2></section>
      <TeamTabs /><TeamScene /><Security /><SectionDivider inGrid />
    </div><Pricing /><SectionDivider /><Secrets /><SectionDivider openBottom /><Trust /><Platforms /></main>
    <Footer />
    <ContactDialog />
  </>;
}

export default App;
