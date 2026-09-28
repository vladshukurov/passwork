import React, { useEffect, useRef, useState } from 'react';
import FeatureDetailPreview from '../components/FeatureDetailPreview.jsx';
import '../styles/feature-detail-preview.css';
import { featureProgress } from '../lib/feature-scroll-state.js';
import { mountIdleAdvance } from '../motion/idle-advance.js';
import { tidyCopy } from '../lib/typography.js';

const mainFeatures = [
  {
    label: 'Аудит безопасности',
    title: 'Отслеживайте старые, слабые и скомпрометированные пароли в панели безопасности',
    summary: 'Видите риски и вовремя обновляйте доступы',
    image: '/passwork-assets/feature-figma-audit.webp',
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
  const [autoFill, setAutoFill] = useState(null);
  const chapters = useRef([]);
  const grid = useRef(null);
  const live = useRef({ active: 0, progress: 0 });
  live.current = { active, progress };

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

  // Idle autoplay: the active bar fills by itself, then the page glides on.
  useEffect(() => mountIdleAdvance({
    root: grid.current,
    count: mainFeatures.length,
    chapter: () => live.current.active,
    progress: () => live.current.progress,
    fill: value => setAutoFill(value),
    advance: index => goTo(index),
  }), []); // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = index => {
    setActive(index);
    setProgress(0);
    chapters.current[index]?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  };

  return <section className="main-features" id="features" aria-labelledby="features-heading">
    <div className="main-features-grid" ref={grid}>
      <div className="main-features-sidebar security-switcher-copy">
        <div className="security-copy-heading"><h2 id="features-heading">Пароли и доступы под контролем</h2></div>
        <nav className="main-features-nav security-story-list" aria-label="Разделы основных возможностей">
          {mainFeatures.map((item, index) => <div className={`security-story${active === index ? ' is-active' : ''}`} key={item.label}>
            <button className="security-story-heading" type="button" aria-current={active === index ? 'step' : undefined}
              aria-controls={`feature-${index}`} onClick={() => goTo(index)}>{tidyCopy(item.label)}</button>
            <div className="security-story-detail"><div className="security-story-detail-inner">
              <p>{tidyCopy(item.summary)}</p><div className="security-story-progress" aria-hidden="true"><span style={{ transform: `scaleX(${active === index ? (autoFill ?? progress) : 0})` }} /></div>
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

export default MainFeatures;
