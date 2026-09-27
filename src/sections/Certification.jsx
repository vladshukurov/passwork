import React from 'react';
import IsoformArt from '../components/IsoformArt.jsx';
import SectionIntro from '../components/SectionIntro.jsx';
import { tidyCopy } from '../lib/typography.js';

const certifications = [
  ['Госорганы', 'ГИС 1 класса', 'government'],
  ['Инфраструктура', 'КИИ 1 категории', 'infrastructure'],
  ['Производство', 'АСУ ТП 1 класса', 'production'],
  ['Операторы ПДн', 'ИСПДн 1 уровня', 'personal'],
];

function CertificationCard({ title, scope, art }) {
  return <article className="certification-card" role="listitem">
    <div className="certification-art"><IsoformArt name={art} /></div>
    <div className="certification-copy"><h3>{tidyCopy(title)}</h3><p>{tidyCopy(scope)}</p></div>
  </article>;
}

function Certification() {
  return <section className="certification" id="certification" aria-labelledby="certification-heading">
    <SectionIntro headingId="certification-heading" title={<>Пассворк сертифицирован <br />ФСТЭК России</>}
      description="Сертификат доверия подтверждает соответствие требованиям безопасности регулируемых отраслей. Разворачивается внутри компании, поддерживает ГОСТ-шифрование, исключает передачу данных во внешние сервисы" />
    <div className="certification-cards" role="list">{certifications.map(([title, scope, art]) =>
      <CertificationCard key={title} title={title} scope={scope} art={art} />)}</div>
  </section>;
}

export default Certification;
