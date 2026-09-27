import React from 'react';
import { isoformMarkup } from '../lib/isoform-markup.js';

// Exported by scripts/export-isoform.ts; motion targets live in motion/isoform-motion.js.
const sources = import.meta.glob('../art/isoform/*.svg', { query: '?raw', import: 'default', eager: true });
const art = Object.fromEntries(Object.entries(sources).map(([path, source]) =>
  [path.match(/([\w-]+)\.svg$/)[1], isoformMarkup(source)]));

export default function IsoformArt({ name, label }) {
  return <svg className="iso-art" data-art={name} viewBox="35 35 530 530"
    {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    dangerouslySetInnerHTML={{ __html: art[name] }} />;
}
