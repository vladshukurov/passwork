import React from 'react';
import { illustrationMarkup } from '../lib/illustration-markup.js';

// SVG sources live in art/illustrations; motion targets in motion/illustration-motion.js.
const sources = import.meta.glob('../art/illustrations/*.svg', { query: '?raw', import: 'default', eager: true });
const art = Object.fromEntries(Object.entries(sources).map(([path, source]) =>
  [path.match(/([\w-]+)\.svg$/)[1], illustrationMarkup(source)]));

export default function IllustrationArt({ name, label }) {
  return <svg className="iso-art" data-art={name} viewBox="35 35 530 530"
    {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    dangerouslySetInnerHTML={{ __html: art[name] }} />;
}
