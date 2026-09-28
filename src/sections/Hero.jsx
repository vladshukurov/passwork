import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Button from '../components/Button.jsx';
import { mountHeroDashboard } from '../dashboards/hero/entry.ts';
import { mountProductView } from '../dashboards/hero/product-views.ts';
import '../dashboards/hero/product-views.css';
import { dissolveScreen, snapshotScreen } from '../motion/screen-transitions.js';
import { siteMotion } from '../motion/site-motion-tokens.js';
import { tabKeyHandler } from '../hooks/useTabList.js';
import { tidyCopy } from '../lib/typography.js';

const productTabs = [
  ['Хранение паролей', 'imgKey02'],
  ['Управление доступом', 'imgUsersProfiles01'],
  ['Коды 2FA', 'imgShield02'],
  ['Журнал действий', 'imgBook01'],
];

// Tabs 2–4 are drawn in the same product window as the live dashboard.
const productViews = [null, 'access', 'codes', 'log'];

export default function Hero() {
  const [selected, setSelected] = useState(0);
  const dashboard = useRef(null);
  const detail = useRef(null);
  const view = useRef(null);
  const outgoing = useRef(null);
  const transition = useRef(null);

  // The live dashboard runs only while its tab is visible; the other tabs
  // mount their own view in the same window.
  useEffect(() => (selected === 0 ? mountHeroDashboard(dashboard.current) : undefined), [selected]);
  useEffect(() => (selected > 0 ? mountProductView(view.current, productViews[selected]) : undefined), [selected]);

  // Crossfade from a snapshot of the previous screen to the new one.
  useLayoutEffect(() => {
    const snapshot = outgoing.current;
    if (!snapshot) return;
    outgoing.current = null;
    transition.current = dissolveScreen(snapshot, selected === 0 ? dashboard.current : detail.current, null, siteMotion.ui);
  }, [selected]);
  useEffect(() => () => transition.current?.kill(), []);

  const select = index => {
    if (index === selected) return;
    transition.current?.progress(1);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      outgoing.current = snapshotScreen(selected === 0 ? dashboard.current : detail.current);
    setSelected(index);
  };
  const onKeyDown = tabKeyHandler(productTabs.length, select);

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
    <div className="product-showcase">
      <div className="product-tabs" role="tablist" aria-label="Возможности Пассворка">
        {productTabs.map(([label, icon], index) => <button key={label} id={`product-tab-${index}`} role="tab" type="button"
          aria-selected={index === selected} aria-controls="product-panel" tabIndex={index === selected ? 0 : -1}
          onClick={() => select(index)} onKeyDown={event => onKeyDown(event, index)}>
          <img src={`/passwork-assets/${icon}.svg`} alt="" /><span>{label}</span></button>)}
      </div>
      <div className="hero-window-shell"><div className="hero-window-scale">
        <div id="product-panel" role="tabpanel" aria-labelledby={`product-tab-${selected}`} className="product-window" tabIndex="0">
          <div className="pw-live-dashboard pw-embed" ref={dashboard} hidden={selected !== 0} role="img"
            aria-label="Анимированная демонстрация Пассворка: поиск пароля, просмотр записи, журнал действий и права доступа" />
          <noscript><img src="/passwork-assets/imgImage27.png" alt="Интерфейс Пассворка" className="product-screenshot" width="1341" height="787" /></noscript>
          <div className="product-detail" ref={detail} hidden={selected === 0}>
            <div className="pw-live-dashboard pw-embed" ref={view} />
          </div>
        </div>
      </div></div>
    </div>
  </section>;
}
