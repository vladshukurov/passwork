import React, { useState } from 'react';

// Local preview of the Figma "Color" Dark mode. Rendered only by the dev
// server (see main.jsx); production builds never include it.
const KEY = 'pw-theme';
const read = () => {
  const fromUrl = new URLSearchParams(location.search).get('theme');
  if (fromUrl) return fromUrl;
  try { return localStorage.getItem(KEY) || 'light'; } catch { return 'light'; }
};
export const applyStoredTheme = () => { document.documentElement.dataset.theme = read(); };

export default function ThemeToggle() {
  const [theme, setTheme] = useState(read);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(KEY, next); } catch { /* private mode */ }
    setTheme(next);
  };
  return <button type="button" className="dev-theme-toggle" onClick={toggle} aria-pressed={theme === 'dark'}>
    <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>{theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
  </button>;
}
