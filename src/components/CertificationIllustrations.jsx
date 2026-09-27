import React from 'react';
import { isoformMarkup } from '../isoform-markup.js';
import government from '../art/isoform/government.svg?raw';
import infrastructure from '../art/isoform/infrastructure.svg?raw';
import production from '../art/isoform/production.svg?raw';
import personal from '../art/isoform/personal.svg?raw';

const illustrations = [government, infrastructure, production, personal].map(isoformMarkup);
const names = ['government', 'infrastructure', 'production', 'personal'];
export default function CertificationIllustration({ index }) {
  return <svg className="certification-svg iso-art" data-art={names[index]} data-isoform="true"
    viewBox="35 35 530 530" aria-hidden="true" dangerouslySetInnerHTML={{ __html: illustrations[index] }} />;
}
