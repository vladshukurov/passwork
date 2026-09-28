import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button.jsx';
import { DarkHeadingDots, SectionHeroSurface } from '../components/Decor.jsx';
import { peopleAtProgress, progressAtPeople } from '../lib/pricing-scale.js';
import { tidyCopy } from '../lib/typography.js';

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

const peopleLabel = count => {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return 'сотрудников';
  if (last === 1) return 'сотрудник';
  if (last >= 2 && last <= 4) return 'сотрудника';
  return 'сотрудников';
};

function Pricing() {
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
    <div className="pricing-heading"><h2 id="pricing-heading">Выберите размер команды<br />{' '}и&nbsp;сравните возможности Пассворка</h2></div>
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
            <img className="pricing-plan-gradient" src="/passwork-assets/figma-pricing-gradient-2026.webp" alt="" />
            <img className="pricing-plan-pattern" src="/passwork-assets/figma-pricing-dots-2026.svg" alt="" />
            <img className="pricing-plan-glint dot-glint" src="/passwork-assets/figma-pricing-dots-2026.svg" alt="" />
          </div>}
          <div className="pricing-plan-intro"><h3>{plan.name}</h3><p>{tidyCopy(plan.description)}</p></div>
          <div className="pricing-plan-offer">
            <p className="pricing-plan-kicker">{tidyCopy('Стоимость команды за год')}</p>
            <p className="pricing-plan-total">{largeTeam ? <span className="pricing-plan-on-request">По запросу</span> : <AnimatedPrice amount={Number.parseInt(plan.price, 10) * teamSize * 365} />}</p>
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

export default Pricing;
