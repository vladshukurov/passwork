// One pinned editorial scene. The blue stage stays put while its artwork and
// the active story change with scroll progress.
import { mountSecurityDashboardMotion } from './security-dashboard-motion.js';
import { gsap } from './page-motion.js';
import { chapterAt, centeredChapterScrollTop, centeredSceneProgress } from './security-scroll-progress.js';

export function mountSecuritySwitcher(section) {
  if (!section) return () => {};
  const gallery = section.querySelector('.security-switcher-grid');
  const intro = section.querySelector('.section-intro');
  const track = section.closest('.security-scroll-track');
  const choices = [...section.querySelectorAll('.security-story')];
  const visualNodes = [...section.querySelectorAll('.security-visual')];
  // The exported visual DOM is certificate, infrastructure, GOST; reading order
  // follows the Figma story: GOST, certificate, infrastructure.
  const visuals = [visualNodes[2], visualNodes[0], visualNodes[1]];
  if (!gallery || !intro || !track || choices.length !== 3 || choices.length !== visuals.length) return () => {};

  const bars = choices.map(choice => choice.querySelector('.security-story-progress span'));
  const buttons = choices.map(choice => choice.querySelector('.security-story-heading'));
  const dashboards = visuals.map(visual => mountSecurityDashboardMotion(visual.querySelector('.protection-card')));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 901px) and (min-height: 761px) and (prefers-reduced-motion: no-preference)');
  const scenes = [...visuals];
  let active = -1;
  let scrollFrame = 0;
  let inView = false;
  let artTransition = null;

  function setProgress(progress) {
    const { index, progress: chapterProgress } = chapterAt(progress, choices.length);
    if (index !== active) select(index, true);
    bars.forEach((bar, i) => gsap.set(bar, { scaleX: i === index ? chapterProgress : i < index ? 1 : 0 }));
  }

  function select(index, animate = false) {
    if (!Number.isInteger(index) || index < 0 || index >= choices.length || index === active) return;
    const previous = active;
    active = index;
    artTransition?.kill();
    artTransition = null;
    gsap.killTweensOf(scenes);
    choices.forEach((choice, i) => {
      const selected = i === index;
      choice.classList.toggle('is-active', selected);
      const detail = choice.querySelector('.security-story-detail');
      detail.setAttribute('aria-hidden', String(!selected));
      detail.inert = !selected;
      buttons[i].setAttribute('aria-expanded', String(selected));
      const element = visuals[i];
      element.classList.toggle('is-active', selected);
      element.setAttribute('aria-hidden', String(!selected));
      element.inert = !selected;
      if (!selected && i !== previous) gsap.set(element, { autoAlpha: 0, filter: 'none' });
    });
    const incoming = visuals[index];
    const outgoing = visuals[previous];
    if (animate && outgoing) {
      // Fade through the blue stage: the two white illustrations never overlap.
      gsap.set(outgoing, { visibility: 'visible', filter: 'none' });
      gsap.set(incoming, { autoAlpha: 0, filter: 'none' });
      artTransition = gsap.timeline({ onComplete: () => { artTransition = null; } })
        .to(outgoing, { autoAlpha: 0, duration: .12, ease: 'sine.inOut' })
        .to(incoming, { autoAlpha: 1, duration: .28, ease: 'sine.out' });
    } else {
      if (outgoing) gsap.set(outgoing, { autoAlpha: 0, filter: 'none' });
      gsap.set(incoming, { autoAlpha: 1, filter: 'none' });
    }
    section.dataset.activeFeature = String(index);
    dashboards.forEach((dashboard, i) => dashboard?.select(i === index));
    syncPlayback();
  }

  function syncPlayback() {
    dashboards.forEach(dashboard => dashboard?.setPlayback(inView && !document.hidden, reduced.matches));
  }

  function jumpTo(index) {
    if (!Number.isInteger(index) || index < 0 || index >= choices.length) return;
    if (desktop.matches && !reduced.matches) {
      const start = window.scrollY + track.getBoundingClientRect().top;
      const target = centeredChapterScrollTop(start, intro.offsetHeight, gallery.offsetHeight,
        track.offsetHeight, window.innerHeight, index, choices.length);
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      select(index, !reduced.matches);
      bars.forEach((bar, i) => gsap.set(bar, { scaleX: i <= index ? 1 : 0 }));
    }
  }

  const onKeyDown = event => {
    const next = {
      ArrowRight: (active + 1) % choices.length,
      ArrowLeft: (active - 1 + choices.length) % choices.length,
      Home: 0,
      End: choices.length - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    buttons[next].focus({ preventScroll: true });
    jumpTo(next);
  };
  const buttonHandlers = buttons.map(button => {
    const handler = () => {
      jumpTo(Number(button.dataset.featureIndex));
    };
    button.addEventListener('click', handler);
    return handler;
  });

  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    syncPlayback();
  });
  observer.observe(gallery);

  function updateScroll() {
    if (desktop.matches && !reduced.matches) {
      setProgress(centeredSceneProgress(track.getBoundingClientRect().top, intro.offsetHeight,
        gallery.offsetHeight, track.offsetHeight, window.innerHeight));
    } else {
      select(Math.max(0, active));
      bars.forEach((bar, i) => gsap.set(bar, { scaleX: i < Math.max(0, active) ? 1 : 0 }));
    }
  }

  function configureScroll() {
    artTransition?.kill();
    artTransition = null;
    gsap.killTweensOf(scenes);
    updateScroll();
  }

  function scheduleScroll() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; updateScroll(); });
  }

  gallery.addEventListener('keydown', onKeyDown);
  document.addEventListener('visibilitychange', syncPlayback);
  desktop.addEventListener('change', configureScroll);
  reduced.addEventListener('change', configureScroll);
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll);
  select(0);
  configureScroll();

  return () => {
    cancelAnimationFrame(scrollFrame);
    artTransition?.kill();
    observer.disconnect();
    dashboards.forEach(dashboard => dashboard?.destroy());
    gsap.killTweensOf([...scenes, ...bars].filter(Boolean));
    buttons.forEach((button, index) => button.removeEventListener('click', buttonHandlers[index]));
    gallery.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('visibilitychange', syncPlayback);
    desktop.removeEventListener('change', configureScroll);
    reduced.removeEventListener('change', configureScroll);
    window.removeEventListener('scroll', scheduleScroll);
    window.removeEventListener('resize', scheduleScroll);
  };
}
