import React from 'react';
import government from '../../dist/passwork-assets/secrets-isoform/government.svg?raw';
import infrastructure from '../../dist/passwork-assets/secrets-isoform/infrastructure.svg?raw';
import production from '../../dist/passwork-assets/secrets-isoform/production.svg?raw';
import personal from '../../dist/passwork-assets/secrets-isoform/personal.svg?raw';

const illustrations = [government, infrastructure, production, personal];
const names = ['government', 'infrastructure', 'production', 'personal'];
export default function CertificationIllustration({ index }) {
  const content = illustrations[index].replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
    .replace(/<rect[^>]*\/>/, '');
  return <svg className="certification-svg" data-art={names[index]} data-isoform="true"
    viewBox="35 35 530 530" aria-hidden="true" dangerouslySetInnerHTML={{ __html: content }} />;
}
