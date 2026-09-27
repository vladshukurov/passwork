import React from 'react';

// Visual stage for the security stories: certification card, local contour
// and GOST scene. Controlled by motion/security-switcher.js via its classes.
// Preformatted: spacing and line breaks are part of the design.
const protectionParameters = [
  ['ГОСТ Р 34.10-2012', '  электронная подпись'],
  ['ГОСТ Р 34.11-2012', '  хеширование'],
  ['', ''],
  ['', 'Размещение данных'],
  ['', '  Серверы компании'],
  ['', ''],
  ['', 'Хранение резервных копий'],
  ['', '  Внутри инфраструктуры'],
];

export default function SecurityStage() {
  return <div className="security-switcher-stage">

<img src="/passwork-assets/security/imgIcon.svg" alt="" className="security-stage-pattern" />
<img src="/passwork-assets/security/imgIcon1.svg" alt="" className="security-stage-background" />
<img src="/passwork-assets/security/img1PxDots8PxPitch800600Source.svg" alt="" className="security-stage-dots" />
<img src="/passwork-assets/security/img1PxDots8PxPitch800600Source.svg" alt="" className="security-stage-dots dot-glint" />
<div className="security-visual" aria-hidden="true" role="img" aria-label="Сертификация Пассворка ФСТЭК России: 4 уровень доверия, применение в ГИС, КИИ, АСУ ТП и ИСПДн">
<div className="security-ui-card security-attestation" aria-hidden="true">
  <div className="security-attestation-top"><span className="security-attestation-mark"><img src="/passwork-assets/passwork-mark.svg" alt="" /></span><span>Пассворк</span><span className="security-attestation-status"><i></i>Сертифицирован</span></div>
  <div className="security-attestation-main"><span className="security-attestation-kicker">ФСТЭК России</span><strong>Подтверждённый уровень защиты</strong><div className="security-attestation-level"><b>4</b><span>уровень<br />доверия</span></div></div>
  <div className="security-attestation-scope"><span>Применение</span><div><span>ГИС</span><span>КИИ</span><span>АСУ ТП</span><span>ИСПДн</span></div></div>
</div>
</div>
<div className="security-visual" aria-hidden="true" role="img" aria-label="Пассворк, пароли и резервные копии соединены внутри закрытого контура компании">
<div aria-hidden="true" style={{ 'display': 'contents' }}><div className="protection-card infrastructure-card">
<div className="check-heading">Инфраструктура компании <img src="/passwork-assets/security/imgIcon2.svg" alt="" /></div>
<p>Пассворк и данные размещены на серверах компании.</p>
<div className="check-row"><img src="/passwork-assets/security/imgIcon3.svg" alt="" /><span>Размещение: <b>локально</b></span></div>
<div className="check-row"><img src="/passwork-assets/security/imgIcon4.svg" alt="" /><span>Передача данных: <b>внутри контура</b></span></div>
<div className="protection-code infrastructure-map">
<div className="infrastructure-map-heading"><span>Закрытый контур</span><span className="infrastructure-local">Серверы компании</span></div>
<div className="infrastructure-topology">
<div className="infrastructure-link infrastructure-link-data" data-motion-at="3500"></div>
<div className="infrastructure-link infrastructure-link-backup" data-motion-at="4100"></div>
<div className="infrastructure-node infrastructure-app" data-motion-at="2850"><div className="infrastructure-node-title"><img src="/passwork-assets/passwork-mark.svg" alt="" /><span>Пассворк</span><i></i></div><div className="infrastructure-node-detail">Локальная установка</div></div>
<div className="infrastructure-node infrastructure-data" data-motion-at="3800"><div className="infrastructure-node-title"><img src="/passwork-assets/security/imgIcon4.svg" alt="" /><span>Пароли и файлы</span><i></i></div><div className="infrastructure-node-detail">На серверах компании</div></div>
<div className="infrastructure-node infrastructure-backup" data-motion-at="4400"><div className="infrastructure-node-title"><img src="/passwork-assets/security/imgIcon5.svg" alt="" /><span>Резервные копии</span><i></i></div><div className="infrastructure-node-detail">Внутри контура</div></div>
</div>
</div></div></div></div>
<div className="security-visual is-active" aria-hidden="false" role="img" aria-label="Проверка ГОСТ-шифрования и работы в закрытом контуре"><div aria-hidden="true" style={{ 'display': 'contents' }}><div className="protection-card"><div className="check-heading">2 проверки выполнены <img src="/passwork-assets/security/imgIcon2.svg" alt="" /></div><p>Проверка шифрования и размещения данных</p><div className="check-row"><img src="/passwork-assets/security/imgIcon3.svg" alt="" /><span>Стандарты ГОСТ: <b>поддерживаются</b></span></div><div className="check-row"><img src="/passwork-assets/security/imgIcon4.svg" alt="" /><span>Обработка данных: <b>на серверах компании</b></span></div><div className="protection-code"><div>Параметры защиты <img src="/passwork-assets/security/imgIcon5.svg" alt="" /></div><pre>{protectionParameters.map(([key, value], index) => <React.Fragment key={index}>
  {key ? <span>{key}</span> : null}{value}{index < protectionParameters.length - 1 ? '\n' : null}</React.Fragment>)}</pre>
</div></div></div>
<img src="/passwork-assets/security/imgRectangle240650873.svg" alt="" className="security-stage-fade" /></div>
  </div>;
}
