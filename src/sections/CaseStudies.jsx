import React from 'react';
import { tidyCopy } from '../lib/typography.js';

// Case studies from passwork.ru/blog. Each statement is one sentence from the
// case: the client in muted ink, the result in full ink, the context muted.
const cases = [
  {
    client: 'МТС Банк', industry: 'Финансы и банки', href: 'https://passwork.ru/blog/mts-bank-case-study/',
    logo: '/passwork-assets/cases/mts-bank.svg', width: 154, height: 26,
    statement: ['МТС Банк: ', 'один менеджер паролей', ' вместо отдельных решений в каждом подразделении'],
  },
  {
    client: 'Nexign', industry: 'ИТ и телеком', href: 'https://passwork.ru/blog/nexign-case-study/',
    logo: '/passwork-assets/cases/nexign.png', width: 96, height: 32,
    statement: ['Nexign: ', 'переход с зарубежного решения без сбоев', ' для 2\u00a0000+ специалистов'],
  },
  {
    client: 'ВкусВилл', industry: 'Ритейл', href: 'https://passwork.ru/blog/vkusvill-case-study/',
    logo: '/passwork-assets/cases/vkusvill.svg', width: 190, height: 24,
    statement: ['ВкусВилл: ', 'секреты в отказоустойчивом кластере', ' — внедрение заняло около месяца'],
  },
  {
    client: 'Группа «Черкизово»', industry: 'Промышленность', href: 'https://passwork.ru/blog/cherkizovo-case-study/',
    logo: '/passwork-assets/cases/cherkizovo.svg', width: 155, height: 32,
    statement: ['Черкизово: ', 'установка и настройка за один день', ' для службы безопасности в 20 регионах'],
  },
];

export default function CaseStudies() {
  return <section className="case-studies" id="cases" aria-labelledby="cases-heading">
    <div className="section-intro case-studies-intro">
      <h2 id="cases-heading">Пассворк<br />{' '}в крупных компаниях</h2>
      <div>
        <p>{tidyCopy('Банк, ИТ, ритейл и промышленность: какие задачи решили наши клиенты и за какой срок')}</p>
        <a className="button button-dark" href="https://passwork.ru/blog/tag/case-study/" target="_blank" rel="noopener noreferrer">Все кейсы</a>
      </div>
    </div>
    <ul className="case-grid">{cases.map(({ client, industry, href, logo, width, height, statement: [lead, result, rest] }) =>
      <li className="case-cell" key={href}>
        <div className="case-cell-top">
          <img src={logo} alt={client} width={width} height={height} loading="lazy" />
          <span className="case-cell-industry">{industry}</span>
        </div>
        <h3 className="case-cell-statement">
          <a href={href} target="_blank" rel="noopener noreferrer">
            <span className="case-muted">{lead}</span>{tidyCopy(result)}<span className="case-muted">{tidyCopy(rest)}</span>
          </a>
        </h3>
        <p className="case-cell-foot" aria-hidden="true">Читать кейс<span className="case-cell-arrow">&nbsp;→</span></p>
      </li>)}</ul>
  </section>;
}
