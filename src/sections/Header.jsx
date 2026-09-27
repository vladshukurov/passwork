import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button.jsx';

const FOCUSABLE = '.brand, #main-nav a, #main-nav button, .header-demo, .menu-toggle';

// The header element is shared with motion/hero-scroll.js, which toggles its
// scroll-state classes directly, so the menu state is applied the same way.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef(null);
  const toggle = useRef(null);

  useEffect(() => {
    const main = document.querySelector('main');
    const footer = document.querySelector('.site-footer');
    header.current.classList.toggle('is-menu-open', menuOpen);
    document.body.classList.toggle('mobile-menu-open', menuOpen);
    if (main) main.inert = menuOpen;
    if (footer) footer.inert = menuOpen;
    if (!menuOpen) return;

    const onKey = event => {
      if (event.key === 'Escape') { setMenuOpen(false); toggle.current.focus({ preventScroll: true }); return; }
      if (event.key !== 'Tab') return;
      const focusable = [...header.current.querySelectorAll(FOCUSABLE)];
      const current = focusable.indexOf(document.activeElement);
      if (event.shiftKey && current === 0) { event.preventDefault(); focusable.at(-1).focus(); }
      else if (!event.shiftKey && current === focusable.length - 1) { event.preventDefault(); focusable[0].focus(); }
    };
    const onResize = () => { if (innerWidth > 800) setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      header.current?.classList.remove('is-menu-open');
      document.body.classList.remove('mobile-menu-open');
      if (main) main.inert = false;
      if (footer) footer.inert = false;
    };
  }, [menuOpen]);

  // Scrollspy: the nav marks the section currently under the reading line.
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    const ids = ['features', 'teams', 'security', 'pricing'];
    const targets = ids.map(id => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setCurrent(entry.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    targets.forEach(target => observer.observe(target));
    const clearAtTop = () => { if (scrollY < innerHeight * .6) setCurrent(null); };
    window.addEventListener('scroll', clearAtTop, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', clearAtTop); };
  }, []);
  const link = (id, label) => <a href={`#${id}`} aria-current={current === id ? 'true' : undefined}>{label}</a>;

  const close = () => setMenuOpen(false);
  return <header className="site-header react-site-header" ref={header}><div className="header-inner">
    <a className="brand" href="#top" aria-label="Пассворк — на главную" onClick={close}>
      <img className="brand-dark" src="/passwork-assets/logo-dark.svg" alt="Пассворк" />
      <img className="brand-light" src="/passwork-assets/logo-light.svg" alt="" aria-hidden="true" />
    </a>
    <nav id="main-nav" aria-label="Основная навигация" className={menuOpen ? 'open' : undefined}
      onClick={event => { if (event.target.closest('a, button')) close(); }}>
      <span className="mobile-nav-overline" aria-hidden="true">Разделы сайта</span>
      {link('features', 'Возможности')}{link('teams', 'Сценарии')}{link('security', 'Безопасность')}
      <button type="button" data-dialog="support">Поддержка</button>
      {link('pricing', 'Цены')}
      <span className="mobile-nav-footer" aria-hidden="true">Пароли и доступы под контролем вашей команды</span>
    </nav>
    <Button className="header-demo" onClick={close} />
    <button className="menu-toggle" type="button" ref={toggle} aria-expanded={menuOpen} aria-controls="main-nav"
      aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setMenuOpen(open => !open)}><span /><span /></button>
  </div></header>;
}
