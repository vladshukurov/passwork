import React, { useEffect, useRef, useState } from 'react';
import siteHtml from '../../dist/index.html?raw';
import Button from './Button.jsx';
import FeatureDetailPreview from './FeatureDetailPreview.jsx';
import { AccessIllustration, CicdIllustration, ConfigurationsIllustration, SecureStorageIllustration } from './SecretsIllustrations.jsx';
import './feature-detail-preview.css';
import { peopleAtProgress, progressAtPeople } from './pricing-scale.js';
import { mountSectionNavigation } from './section-navigation.js';
import { featureProgress } from './feature-scroll-state.js';
import { tidyCopy } from './typography.js';

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
      <span className="mobile-nav-overline" aria-hidden="true">Разделы сайта</span>
      <a href="#features">Возможности</a><a href="#teams">Сценарии</a><a href="#security">Безопасность</a>
      <button type="button" data-dialog="support">Поддержка</button>
      <a href="#pricing">Цены</a>
      <span className="mobile-nav-footer" aria-hidden="true">Пароли и доступы под контролем вашей команды</span>
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
      <p>{tidyCopy('Управление корпоративными паролями, доступами и действиями — в одном контуре')}</p>
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

const awards = [
  ['/passwork-assets/awards/capterra-ease-of-use-2025.svg', 'Capterra Best Ease of Use 2025', 'https://www.capterra.com/p/151018/Passwork/'],
  ['/passwork-assets/awards/capterra-shortlist-2026.svg', 'Capterra Shortlist 2026', 'https://www.capterra.com/password-management-software/shortlist/'],
  ['/passwork-assets/awards/software-advice-support-2026.svg', 'Software Advice Best Customer Support 2026', 'https://www.softwareadvice.com/password-management/passwork-profile/'],
  ['/passwork-assets/awards/software-advice-front-runners-2026.svg', 'Software Advice Front Runners 2026', 'https://www.softwareadvice.com/password-management/'],
  ['/passwork-assets/awards/sourceforge-user-reviews.svg', 'SourceForge User Reviews', 'https://sourceforge.net/software/product/Passwork/'],
  ['/passwork-assets/awards/sourceforge-top-performer-2026.svg', 'SourceForge Top Performer Summer 2026', 'https://sourceforge.net/software/product/Passwork/'],
];

function Awards() {
  return <section className="awards" aria-labelledby="awards-heading"><div className="awards-inner">
    <svg className="awards-color-filter" aria-hidden="true" focusable="false" width="0" height="0">
      <filter id="awards-monochrome" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values=".075 .260 .015 0 .550  .075 .250 .015 0 .590  .075 .240 .015 0 .650  0 0 0 1 0" />
      </filter>
      <filter id="awards-monochrome-inverted" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0" />
        <feColorMatrix type="matrix" values=".075 .260 .015 0 .600  .075 .250 .015 0 .640  .075 .240 .015 0 .700  0 0 0 1 0" />
      </filter>
    </svg>
    <div className="section-intro awards-heading">
      <h2 id="awards-heading">Пассворк ценят за удобство и поддержку</h2>
      <div><p>Об этом говорят оценки пользователей и награды Capterra, Software Advice и SourceForge</p></div>
    </div>
    <div className="awards-list" role="list">{awards.map(([src, label, href], index) => <div className={`award award-${index + 1}`} role="listitem" key={src}>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <img className="award-logo-mono" src={src} alt="" width="100" height="100" loading="lazy" />
        <img className="award-logo-color" src={src} alt="" width="100" height="100" loading="lazy" />
      </a>
    </div>)}</div>
  </div></section>;
}

function About() {
  return <section className="about" id="about"><h2>Пассворк — корпоративный менеджер паролей
    <span>{tidyCopy('для ИТ-команд, DevOps и специалистов по безопасности. Он помогает хранить пароли, управлять доступом и отслеживать действия внутри инфраструктуры')}</span>
  </h2></section>;
}

const mainFeatures = [
  {
    label: 'Аудит безопасности',
    title: 'Отслеживайте старые, слабые и скомпрометированные пароли в панели безопасности',
    summary: 'Видите риски и вовремя обновляйте доступы',
    image: '/passwork-assets/feature-figma-audit.png',
    imageAlt: 'Панель безопасности Пассворка со списком паролей и показателями риска',
    details: [
      ['Доступ только к нужному', 'Настраивайте права для каждого сейфа и папки', 'permissions'],
      ['Права через группы', 'Управляйте доступом сотрудников без ручной настройки каждого профиля', 'groups'],
    ],
  },
  {
    label: 'Совместная работа',
    title: 'Настраивайте совместную работу с паролями без пересылки доступов',
    summary: 'Выдавайте команде нужные права без лишней ручной работы',
    image: '/passwork-assets/passwork-feature-team.webp',
    imageAlt: 'Настройка прав сотрудников для общего сейфа в Пассворке',
    details: [
      ['Общие сейфы для команды', 'Соберите рабочие пароли в понятную структуру', 'team'],
      ['Гибкие роли', 'Разделите права на просмотр, изменение и администрирование', 'roles'],
    ],
  },
  {
    label: 'Хранение паролей',
    title: 'Храните пароли в сейфах и находите нужное за секунды',
    summary: 'Соберите рабочие доступы в понятной структуре',
    image: '/passwork-assets/passwork-feature-vault.webp',
    imageAlt: 'Сейф Пассворка с папками, записями и подробностями пароля',
    details: [
      ['Порядок в сейфах', 'Разложите доступы по проектам, командам и задачам', 'vault-order'],
      ['Быстрый поиск', 'Находите запись по названию, тегу или цветовой метке', 'vault-search'],
    ],
  },
];

function MainFeatures() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const chapters = useRef([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const marker = Math.min(window.innerHeight * .42, 360);
      let current = 0;
      chapters.current.forEach((chapter, index) => {
        if (chapter && chapter.getBoundingClientRect().top <= marker) current = index;
      });
      const rect = chapters.current[current]?.getBoundingClientRect();
      setActive(current);
      setProgress(rect ? featureProgress(rect, window.innerHeight) : 0);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); }); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const goTo = index => {
    setActive(index);
    setProgress(0);
    chapters.current[index]?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  };

  return <section className="main-features" id="features" aria-labelledby="features-heading">
    <div className="main-features-grid">
      <div className="main-features-sidebar security-switcher-copy">
        <div className="security-copy-heading"><h2 id="features-heading">Пароли и доступы под контролем</h2></div>
        <nav className="main-features-nav security-story-list" aria-label="Разделы основных возможностей">
          {mainFeatures.map((item, index) => <div className={`security-story${active === index ? ' is-active' : ''}`} key={item.label}>
            <button className="security-story-heading" type="button" aria-current={active === index ? 'step' : undefined}
              aria-controls={`feature-${index}`} onClick={() => goTo(index)}>{tidyCopy(item.label)}</button>
            <div className="security-story-detail"><div className="security-story-detail-inner">
              <p>{tidyCopy(item.summary)}</p><div className="security-story-progress" aria-hidden="true"><span style={{ transform: `scaleX(${active === index ? progress : 0})` }} /></div>
            </div></div>
          </div>)}
        </nav>
      </div>
      <div className="main-features-content">
        {mainFeatures.map((feature, index) => <article className="main-features-chapter" id={`feature-${index}`} key={feature.label}
          ref={node => { chapters.current[index] = node; }} aria-label={feature.label}>
          <div className="main-features-chapter-heading"><h3>{tidyCopy(feature.title)}</h3></div>
          <div className="main-features-art"><img className="main-features-screen" src={feature.image} alt={feature.imageAlt} width="1200" height="750" loading={index === 0 ? 'eager' : 'lazy'} /></div>
          <div className="main-features-details">{feature.details.map(([title, description, preview]) => <div className="main-features-detail" key={title}>
            <div className="main-features-detail-copy"><h4>{tidyCopy(title)}</h4><p>{tidyCopy(description)}</p></div>
            <div className="main-features-detail-art"><FeatureDetailPreview variant={preview} /></div>
          </div>)}</div>
        </article>)}
      </div>
    </div>
  </section>;
}

export function SectionIntro({ headingId, title, description }) {
  return <div className="section-intro"><h2 id={headingId}>{title}</h2><div>
    <p>{tidyCopy(description)}</p><Button variant="dark" />
  </div></div>;
}

function CertificationCard({ node }) {
  const artwork = node.querySelector('.certification-art');
  const copy = node.querySelector('.certification-copy');
  return <article className="certification-card" role="listitem">
    <div className={artwork.className} dangerouslySetInnerHTML={{ __html: artwork.innerHTML }} />
    <div className="certification-copy"><h3>{tidyCopy(copy.querySelector('h3').textContent)}</h3><p>{tidyCopy(copy.querySelector('p').textContent)}</p></div>
  </article>;
}

function Certification() {
  return <section className="certification" id="certification" aria-labelledby="certification-heading">
    <SectionIntro headingId="certification-heading" title={<>Пассворк сертифицирован <br />ФСТЭК России</>}
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
    <p className="team-caption" aria-live="polite">{tidyCopy('Разграничение доступа по ролям и группам')}</p>
  </section>;
}

function Security() {
  // The three illustrations are large, layered SVG/HTML scenes. Keep their
  // exported geometry intact while migrating the section shell to React.
  const stage = by('.security-switcher-stage');
  return <div className="security-scroll-track" id="security"><section className="security-switcher" aria-labelledby="security-heading">
    <SectionIntro headingId="security-heading" title="Российское решение для корпоративной безопасности"
      description={<>{tidyCopy('Управляйте корпоративными паролями и доступом сотрудников в единой системе.')}<br />{tidyCopy('Размещайте Пассворк на своих серверах')}</>} />
    <div className="security-switcher-grid" role="group" aria-roledescription="карусель" aria-label="Особенности безопасности" tabIndex="0">
      <div className="security-switcher-copy">
        <div className="security-copy-heading"><h3>Защита данных<br />под вашим контролем</h3></div>
        <div className="security-story-list">{securityStories.map(([title, description], index) => <SecurityStory key={title}
          index={index} title={title} description={description} />)}</div>
      </div>
      <div className="security-switcher-stage" dangerouslySetInnerHTML={{ __html: stage.innerHTML }} />
    </div>
  </section></div>;
}

const securityStories = [
  ['ГОСТ-шифрование', 'Поддержка ГОСТ Р 34.10-2012 и ГОСТ Р 34.11-2012. Данные остаются на серверах вашей компании'],
  ['Сертификат ФСТЭК России', 'Сертификат ФСТЭК России по 4 уровню доверия для систем с повышенными требованиями к защите информации'],
  ['В собственном контуре', 'Разверните Пассворк на своих серверах. Пароли, файлы и резервные копии останутся внутри инфраструктуры компании'],
];

export function SecurityStory({ index, title, description, active = index === 0 }) {
  return <article className={`security-story${active ? ' is-active' : ''}`}>
    <button className="security-story-heading" type="button" data-feature-index={index} aria-expanded={active}
      aria-controls={`security-story-detail-${index}`}>{tidyCopy(title)}</button>
    <div className="security-story-detail" id={`security-story-detail-${index}`} aria-hidden={!active}>
      <div className="security-story-detail-inner"><p>{tidyCopy(description)}</p><div className="security-story-progress" aria-hidden="true"><span /></div></div>
    </div>
  </article>;
}

const plans = [
  {
    name: 'Стандарт', price: '11 ₽',
    description: 'Общие сейфы, права доступа и история действий для команды',
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
    description: 'Единый вход, политики доступа и отказоустойчивость для крупных команд',
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
    description: 'Сертифицированная защита для регулируемых организаций и госсистем',
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
function AnimatedPrice({ amount, duration = 650, enabled = true }) {
  const node = useRef(null);
  const initial = useRef(amount);
  const displayed = useRef(amount);

  useEffect(() => {
    if (!node.current || displayed.current === amount) return;
    if (!enabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      displayed.current = amount;
      node.current.textContent = `${formatRubles(amount)} ₽`;
      return;
    }
    const from = displayed.current;
    const started = performance.now();
    let frame = 0;
    const tick = now => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      displayed.current = Math.round(from + (amount - from) * eased);
      node.current.textContent = `${formatRubles(displayed.current)} ₽`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [amount, duration, enabled]);

  return <span className="pricing-plan-amount" ref={node}>{formatRubles(initial.current)} ₽</span>;
}
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

export function Pricing({ motion = { enabled: true, duration: 650 } }) {
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
    <DarkHeadingDots />
    <div className="pricing-heading"><h2 id="pricing-heading">Выберите размер команды<br />и&nbsp;сравните возможности Пассворка</h2></div>
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
          <div className="pricing-plan-intro"><h3>{plan.name}</h3><p>{tidyCopy(plan.description)}</p></div>
          <div className="pricing-plan-offer">
            <p className="pricing-plan-kicker">{tidyCopy('Стоимость команды за год')}</p>
            <p className="pricing-plan-total">{largeTeam ? <span className="pricing-plan-on-request">По запросу</span> : <AnimatedPrice amount={Number.parseInt(plan.price, 10) * teamSize * 365} duration={motion.duration} enabled={motion.enabled} />}</p>
            <p className="pricing-plan-term">{tidyCopy(largeTeam ? 'Для команды от 101 человека' : `${plan.price} за пользователя в день`)}</p>
            <Button dialog="pricing" className="pricing-plan-action">{plan.action}</Button>
          </div>
          <ul className="pricing-features">{plan.features.map(feature => <li key={feature}>
            <img src="/passwork-assets/figma-pricing-check-2026.svg" alt="" width="16" height="16" />{tidyCopy(feature)}
          </li>)}</ul>
        </article>)}
      </div>
    </div>
  </section>;
}

const secretFeatures = [
  ['Хранение API-ключей и токенов', 'Держите ключи, токены и пароли в защищённом хранилище', SecureStorageIllustration],
  ['Интеграция с CI/CD', 'Передавайте секреты в GitLab CI, Jenkins и GitHub Actions через API и вебхуки', CicdIllustration],
  ['Работа с конфигурациями', 'Храните файлы конфигурации и переменные окружения рядом с секретами', ConfigurationsIllustration],
  ['Гранулярный контроль доступа', 'Назначайте права для каждого секрета, проекта и команды', AccessIllustration],
];

export function Secrets() {
  return <section className="secrets" id="secrets" aria-labelledby="secrets-heading"><div className="secrets-inner">
    <SectionIntro headingId="secrets-heading" title={<>Менеджер секретов<br />{' '}для разработчиков<br />{' '}и DevOps</>}
      description="Храните ключи, токены и конфигурации в одном месте. Выдавайте доступ команде и передавайте секреты в приложения через API" />
    <div className="secrets-cards" role="list">{secretFeatures.map(([title, description, Illustration]) =>
      <article className="secrets-card" role="listitem" key={title}>
        <div className="secrets-card-art" aria-hidden="true"><Illustration /></div>
        <div className="secrets-card-copy"><h3>{tidyCopy(title)}</h3><p>{tidyCopy(description)}</p></div>
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
        <p>{tidyCopy('Пассворк включён в реестр отечественного ПО и имеет лицензии ФСТЭК и ФСБ. Программа Bug Bounty помогает находить и устранять уязвимости')}</p>
      </div>
      <div className="trust-cards" role="list">
        {trustSignals.map(signal => <article className={`trust-card trust-card-${signal.kind}`} role="listitem" key={signal.kind}>
          <img className="trust-card-art" src={`/passwork-assets/${signal.image}`} alt="" loading="lazy" />
          <div className="trust-card-copy"><h3>{tidyCopy(signal.title)}</h3><p>{tidyCopy(signal.source)}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}

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

export function Platforms() {
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

export function Footer() {
  return <footer className="site-footer"><div className="footer-inner">
    <div className="footer-main">
      <div className="footer-brand">
        <a href="#top" aria-label="Пассворк — к началу страницы"><img className="footer-logo" src="/passwork-assets/logo-dark.svg" alt="Пассворк" /></a>
        <p>Корпоративные пароли и доступы<br />под контролем вашей команды</p>
        <Button>Запросить демо</Button>
        <img className="footer-russia" src="/passwork-assets/imgVector.svg" alt="Сделано в России" />
      </div>
      <nav className="footer-column" aria-label="Продукт">
        <h2>Пассворк</h2>
      <a href="#features">Возможности</a><a href="#teams">Для вашей команды</a><a href="#certification">Сертификация</a>
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
  const motion = {
    hero: { enabled: true, duration: 550 },
    tabs: { enabled: true, duration: 320 },
    features: { enabled: true, duration: 360 },
    security: { enabled: true, duration: 360 },
    pricing: { enabled: true, duration: 650 },
    ui: { enabled: true, duration: 180 },
    certification: { enabled: true, duration: 320 },
  };
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
    <main id="main" className={[HERO_SURFACE_EXPERIMENT && 'hero-surface-experiment', 'dot-motion-sweep', ...Object.entries(motion).map(([key, value]) => `motion-${key}-${value.enabled ? 'on' : 'off'}`)].filter(Boolean).join(' ')} style={{ '--dot-duration': '7s', '--dot-glow': .85, ...Object.fromEntries(Object.entries(motion).map(([key, value]) => [`--motion-${key}-duration`, `${value.duration}ms`])) }}><Hero /><div className="page-grid">
      <ClientLogos /><About /><Certification />
      <section className="teams-heading" id="teams"><h2>Пассворк решает<br />задачи разных команд</h2></section>
      <TeamTabs /><TeamScene /><SectionDivider inGrid /><MainFeatures /><Secrets /><SectionDivider inGrid />
    </div><Trust /><div className="page-grid security-page-grid"><Security /></div><SectionDivider openBottom /><Pricing motion={motion.pricing} /><Awards /><Platforms /><SectionDivider openBottom /></main>
    <Footer />
    <ContactDialog />
  </>;
}

export default App;
