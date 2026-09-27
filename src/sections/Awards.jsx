import React from 'react';

const awards = [
  ['/passwork-assets/awards/capterra-ease-of-use-2025.svg', 'Capterra Best Ease of Use 2025', 'https://www.capterra.com/p/151018/Passwork/'],
  ['/passwork-assets/awards/capterra-shortlist-2026.svg', 'Capterra Shortlist 2026', 'https://www.capterra.com/password-management-software/shortlist/'],
  ['/passwork-assets/awards/software-advice-support-2026.svg', 'Software Advice Best Customer Support 2026', 'https://www.softwareadvice.com/password-management/passwork-profile/'],
  ['/passwork-assets/awards/software-advice-front-runners-2026.svg', 'Software Advice Front Runners 2026', 'https://www.softwareadvice.com/password-management/'],
  ['/passwork-assets/awards/sourceforge-user-reviews.svg', 'SourceForge User Reviews', 'https://sourceforge.net/software/product/Passwork/'],
  ['/passwork-assets/awards/sourceforge-top-performer-2026.svg', 'SourceForge Top Performer Summer 2026', 'https://sourceforge.net/software/product/Passwork/'],
];

function Awards() {
  return <section className="awards" aria-labelledby="awards-heading"><div className="awards-inner">
    <svg className="awards-color-filter" aria-hidden="true" focusable="false" width="0" height="0">
      <filter id="awards-monochrome" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values=".075 .260 .015 0 .550  .075 .250 .015 0 .590  .075 .240 .015 0 .650  0 0 0 1 0" />
      </filter>
      <filter id="awards-monochrome-inverted" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="-1 0 0 0 1  0 -1 0 0 1  0 0 -1 0 1  0 0 0 1 0" />
        <feColorMatrix type="matrix" values=".075 .260 .015 0 .600  .075 .250 .015 0 .640  .075 .240 .015 0 .700  0 0 0 1 0" />
      </filter>
    </svg>
    <div className="section-intro awards-heading">
      <h2 id="awards-heading">Пассворк ценят за удобство и поддержку</h2>
      <div><p>Об этом говорят оценки пользователей и награды Capterra, Software Advice и SourceForge</p></div>
    </div>
    <div className="awards-list" role="list">{awards.map(([src, label, href], index) => <div className={`award award-${index + 1}`} role="listitem" key={src}>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <img className="award-logo-mono" src={src} alt="" width="100" height="100" loading="lazy" />
        <img className="award-logo-color" src={src} alt="" width="100" height="100" loading="lazy" />
      </a>
    </div>)}</div>
  </div></section>;
}

export default Awards;
