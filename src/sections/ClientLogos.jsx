import React from 'react';
import { useController } from '../hooks/useController.js';
import { mountClientLogos } from '../motion/client-logos.js';

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
  const row = useController(mountClientLogos);
  return <section aria-label="Пассворк выбирают"><div className="client-logos" role="list" ref={row}>
    {clientLogos.map(([first, second], index) => <div key={first[1]} className="client-logo" role="listitem"
      aria-label={`${first[1]}, ${second[1]}`} style={{ '--logo-delay': `${index * 100}ms` }}>
      <div className="client-logo-viewport" aria-hidden="true"><div className="client-logo-track">
        <ClientLogoArt logo={first} /><ClientLogoArt logo={second} /><ClientLogoArt logo={first} />
      </div></div>
    </div>)}
  </div></section>;
}

export default ClientLogos;
