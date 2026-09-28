import React from 'react';
import { DarkHeadingDots, SectionHeroSurface } from '../components/Decor.jsx';
import { tidyCopy } from '../lib/typography.js';

const trustSignals = [
  { title: 'Реестр отечественного ПО', source: 'Минцифры России', image: 'figma-trust-registry-2026.webp', kind: 'registry' },
  { title: 'Лицензия ФСБ на криптографию', source: 'ФСБ России', image: 'figma-trust-fsb-2026.webp', kind: 'fsb' },
  { title: 'Программа Bug Bounty', source: 'Standoff Bug Bounty', image: 'figma-trust-bugbounty-2026.webp', kind: 'bugbounty' },
  { title: 'Лицензии ФСТЭК России', source: 'Регулятор ИБ', image: 'figma-trust-fstek-2026.webp', kind: 'fstek' },
];

function Trust() {
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

export default Trust;
