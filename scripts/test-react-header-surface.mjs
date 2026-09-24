import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../react/src/App.jsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../react/src/header-surface.css', import.meta.url), 'utf8');

assert.match(app, /'site-header', 'react-site-header', className/);
assert.match(css, /\.react-site-header\.is-scroll-header\.is-over-product-window:not\(\.is-past-hero\)::after\s*\{\s*opacity:\s*0/);
assert.match(css, /\.react-site-header\.is-scroll-header\.is-header-hidden\s*\{[^}]*opacity:\s*0;[^}]*transform:\s*none/);
assert.match(css, /\.react-site-header\.is-scroll-header::before\s*\{[^}]*background-color:/);
console.log('React header surface contracts passed');
