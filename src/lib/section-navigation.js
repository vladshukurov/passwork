// Native smooth scrolling through the long pinned scenes replays every scene.
// Start long jumps close to their destination, then let the last screenful
// settle smoothly. Nearby links use a normal continuous smooth scroll.
export function mountSectionNavigation() {
  const prefersLessMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let pendingFrame = 0;

  const navigate = event => {
    const link = event.target.closest('header a[href^="#"], footer a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hash = link.getAttribute('href');
    const target = hash && document.getElementById(hash.slice(1));
    if (!target) return;

    event.preventDefault();
    cancelAnimationFrame(pendingFrame);
    const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const destination = Math.max(0, target.getBoundingClientRect().top + scrollY - padding - margin);
    const distance = destination - scrollY;
    history.pushState(null, '', hash);

    if (prefersLessMotion.matches) {
      window.scrollTo({ top: destination, behavior: 'instant' });
      return;
    }

    const runway = Math.min(640, innerHeight * .75);
    if (Math.abs(distance) > runway * 1.5) {
      window.scrollTo({ top: Math.max(0, destination - Math.sign(distance) * runway), behavior: 'instant' });
      pendingFrame = requestAnimationFrame(() => window.scrollTo({ top: destination, behavior: 'smooth' }));
    } else {
      window.scrollTo({ top: destination, behavior: 'smooth' });
    }
  };

  document.addEventListener('click', navigate);
  return () => { document.removeEventListener('click', navigate); cancelAnimationFrame(pendingFrame); };
}
