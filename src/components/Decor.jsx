import React from 'react';

export function SectionDivider({ openBottom = false, inGrid = false }) {
  return <div className={`section-divider${openBottom ? ' section-divider-open' : ''}${inGrid ? ' section-divider-in-grid' : ''}`} aria-hidden="true"><div /></div>;
}

export function DarkHeadingDots() {
  return <>
    <img className="dark-heading-dots" src="/passwork-assets/figma-dark-heading-dots-2026.webp" width="1212" height="866" alt="" aria-hidden="true" />
    <img className="dark-heading-dots dark-heading-glint dot-glint" src="/passwork-assets/figma-dark-heading-dots-2026.webp" width="1212" height="866" alt="" aria-hidden="true" />
  </>;
}

export function SectionHeroSurface() {
  return <div className="section-hero-surface" aria-hidden="true">
    <div className="section-hero-gradient" />
    <img className="section-hero-dots" src="/passwork-assets/imgVector1.svg" alt="" />
    <img className="section-hero-dots dot-glint" src="/passwork-assets/imgVector1.svg" alt="" />
  </div>;
}
