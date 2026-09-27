import React from 'react';
import SectionIntro from '../components/SectionIntro.jsx';
import SecurityStage from '../components/SecurityStage.jsx';
import { useController } from '../hooks/useController.js';
import { mountSecuritySwitcher } from '../motion/security-switcher.js';
import { tidyCopy } from '../lib/typography.js';

function Security() {
  const section = useController(mountSecuritySwitcher);
  return <div className="security-scroll-track" id="security"><section className="security-switcher" aria-labelledby="security-heading" ref={section}>
    <SectionIntro headingId="security-heading" title="Российское решение для корпоративной безопасности"
      description={<>{tidyCopy('Управляйте корпоративными паролями и доступом сотрудников в единой системе.')}<br />{tidyCopy('Размещайте Пассворк на своих серверах')}</>} />
    <div className="security-switcher-grid" role="group" aria-roledescription="карусель" aria-label="Особенности безопасности" tabIndex="0">
      <div className="security-switcher-copy">
        <div className="security-copy-heading"><h3>Защита данных<br />под вашим контролем</h3></div>
        <div className="security-story-list">{securityStories.map(([title, description], index) => <SecurityStory key={title}
          index={index} title={title} description={description} />)}</div>
      </div>
      <SecurityStage />
    </div>
  </section></div>;
}

const securityStories = [
  ['ГОСТ-шифрование', 'Поддержка ГОСТ Р 34.10-2012 и ГОСТ Р 34.11-2012. Данные остаются на серверах вашей компании'],
  ['Сертификат ФСТЭК России', 'Сертификат ФСТЭК России по 4 уровню доверия для систем с повышенными требованиями к защите информации'],
  ['В собственном контуре', 'Разверните Пассворк на своих серверах. Пароли, файлы и резервные копии останутся внутри инфраструктуры компании'],
];

function SecurityStory({ index, title, description, active = index === 0 }) {
  return <article className={`security-story${active ? ' is-active' : ''}`}>
    <button className="security-story-heading" type="button" data-feature-index={index} aria-expanded={active}
      aria-controls={`security-story-detail-${index}`}>{tidyCopy(title)}</button>
    <div className="security-story-detail" id={`security-story-detail-${index}`} aria-hidden={!active}>
      <div className="security-story-detail-inner"><p>{tidyCopy(description)}</p><div className="security-story-progress" aria-hidden="true"><span /></div></div>
    </div>
  </article>;
}

export default Security;
