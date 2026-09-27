import React from 'react';
import Button from './Button.jsx';
import { tidyCopy } from '../lib/typography.js';

export default function SectionIntro({ headingId, title, description }) {
  return <div className="section-intro"><h2 id={headingId}>{title}</h2><div>
    <p>{tidyCopy(description)}</p><Button variant="dark" />
  </div></div>;
}
