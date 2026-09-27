import React from 'react';
import IsoformArt from '../components/IsoformArt.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { tidyCopy } from '../lib/typography.js';

const secretFeatures = [
  ['Хранение API-ключей и токенов', 'Держите ключи, токены и пароли в защищённом хранилище', 'storage'],
  ['Интеграция с CI/CD', 'Передавайте секреты в GitLab CI, Jenkins и GitHub Actions через API и вебхуки', 'cicd'],
  ['Работа с конфигурациями', 'Храните файлы конфигурации и переменные окружения рядом с секретами', 'config'],
  ['Гранулярный контроль доступа', 'Назначайте права для каждого секрета, проекта и команды', 'access'],
];

function Secrets() {
  return <section className="secrets" id="secrets" aria-labelledby="secrets-heading"><div className="secrets-inner">
    <SectionIntro headingId="secrets-heading" title={<>Менеджер секретов<br />{' '}для разработчиков<br />{' '}и DevOps</>}
      description="Храните ключи, токены и конфигурации в одном месте. Выдавайте доступ команде и передавайте секреты в приложения через API" />
    <div className="secrets-cards" role="list">{secretFeatures.map(([title, description, art]) =>
      <article className="secrets-card" role="listitem" key={title}>
        <div className="secrets-card-art" aria-hidden="true"><IsoformArt name={art} /></div>
        <div className="secrets-card-copy"><h3>{tidyCopy(title)}</h3><p>{tidyCopy(description)}</p></div>
      </article>)}</div>
  </div></section>;
}

export default Secrets;
