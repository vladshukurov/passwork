import React from 'react';
import { tidyCopy } from '../lib/typography.js';

// Case studies from passwork.ru/blog. Each statement is one sentence from the
// case: the result in full ink, the context muted. Logo sizes are tuned so
// the four marks carry the same visual weight.
const cases = [
  {
    client: 'МТС Банк', industry: 'Финансы и банки', href: 'https://passwork.ru/blog/mts-bank-case-study/',
    logo: '/passwork-assets/cases/mts-bank.svg', width: 132, height: 22,
    statement: ['Один менеджер паролей', ' вместо отдельных решений в каждом подразделении'],
  },
  {
    client: 'Nexign', industry: 'ИТ и телеком', href: 'https://passwork.ru/blog/nexign-case-study/',
    logo: '/passwork-assets/cases/nexign.png', width: 84, height: 28,
    statement: ['Переход с зарубежного решения без сбоев', ' для 2\u00a0000+ специалистов'],
  },
  {
    client: 'ВкусВилл', industry: 'Ритейл', href: 'https://passwork.ru/blog/vkusvill-case-study/',
    logo: '/passwork-assets/cases/vkusvill.svg', width: 134, height: 17,
    statement: ['Секреты в отказоустойчивом кластере', ' — внедрение заняло около месяца'],
  },
  {
    client: 'Группа «Черкизово»', industry: 'Промышленность', href: 'https://passwork.ru/blog/cherkizovo-case-study/',
    logo: '/passwork-assets/cases/cherkizovo.svg', width: 136, height: 28,
    statement: ['Установка и настройка за один день', ' для службы безопасности в 20 регионах'],
  },
];

export default function CaseStudies() {
  return <section className="case-studies theme-dark" id="cases" aria-labelledby="cases-heading"><div className="case-studies-inner">
    <div className="section-intro case-studies-intro">
      <h2 id="cases-heading">Пассворк<br />{' '}в крупных компаниях</h2>
      <div>
        <p>{tidyCopy('Банк, ИТ, ритейл и промышленность: какие задачи решили наши клиенты и за какой срок')}</p>
        <a className="button button-dark" href="https://passwork.ru/blog/tag/case-study/" target="_blank" rel="noopener noreferrer">Все кейсы</a>
      </div>
    </div>
    <ul className="case-grid">{cases.map(({ client, industry, href, logo, width, height, statement: [result, rest] }) =>
      <li className="case-cell" key={href}>
        <div className="case-cell-top">
          <span className="case-logo" role="img" aria-label={client} style={{ '--logo': `url(${logo})`, width, height }}>
            <img src={logo} alt="" width={width} height={height} loading="lazy" />
          </span>
          <span className="case-cell-industry">{industry}</span>
        </div>
        <h3 className="case-cell-statement">
          <a href={href} target="_blank" rel="noopener noreferrer">
            {tidyCopy(result)}<span className="case-muted">{tidyCopy(rest)}</span>
          </a>
        </h3>
      </li>)}</ul>
  </div></section>;
}
