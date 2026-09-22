// Three synchronized feature scenes in the Figma layout, with Attio-style fades.
import { mountSecurityDashboardMotion } from './security-dashboard-motion.js';
import {gsap} from './page-motion.js';

export function mountSecuritySwitcher(section) {
  if (!section) return () => {};
  const gallery = section.querySelector('.security-switcher-grid');
  const choices = [...section.querySelectorAll('.security-choice')];
  const visuals = [...section.querySelectorAll('.security-visual')];
  const progressBars = choices.map(choice => choice.querySelector('.security-choice-progress span'));
  const nextButtons = [...section.querySelectorAll('.security-next-choice')];
  if (!gallery || !choices.length || choices.length !== visuals.length) return () => {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dashboards = visuals.map(visual => mountSecurityDashboardMotion(visual.querySelector('.protection-card')));
  const duration = 8000;
  const dashboardDuration = 12000;
  let active = choices.findIndex(choice => choice.classList.contains('is-active'));
  const clock = {elapsed:0};
  const cycle = gsap.to(clock,{elapsed:1,duration:12,ease:'none',paused:true,onUpdate:()=>{
    if(progressBars[active]) gsap.set(progressBars[active],{scaleX:clock.elapsed});
  },onComplete:()=>select((active+1)%choices.length)});
  let inView = false;
  let hovered = false;
  let focused = false;

  function select(index) {
    active = index;
    choices.forEach((choice, i) => {
      const selected = i === index;
      for (const element of [choice, visuals[i]]) {
        element.classList.toggle('is-active', selected);
        element.setAttribute('aria-hidden', String(!selected));
        element.inert = !selected;
        gsap.to(element,{autoAlpha:selected?1:0,y:selected?0:6,duration:reduced.matches?0:.42,
          ease:'power2.out',overwrite:true});
      }
    });
    section.dataset.activeFeature = String(index);
    progressBars.forEach(bar => { if (bar) bar.style.transform = 'scaleX(0)'; });
    dashboards.forEach((dashboard, i) => dashboard?.select(i === index));
    cycle.duration((dashboards[active]?dashboardDuration:duration)/1000).restart().pause();
    syncPlayback();
  }
  function syncPlayback() {
    dashboards.forEach(dashboard => dashboard?.setPlayback(inView && !document.hidden, reduced.matches));
    const playing = inView && !document.hidden && !reduced.matches && !hovered && !focused;
    section.dataset.autoplay = playing ? 'playing' : 'paused';
    cycle.paused(!playing);
  }
  const key = event => {
    let next;
    if (event.key === 'ArrowRight') next = (active + 1) % choices.length;
    else if (event.key === 'ArrowLeft') next = (active - 1 + choices.length) % choices.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = choices.length - 1;
    else return;
    event.preventDefault();
    gallery.focus({preventScroll: true});
    select(next);
  };
  const enter = event => { if (event.pointerType !== 'touch') { hovered = true; syncPlayback(); } };
  const nextHandlers = nextButtons.map(button => {
    const click = () => {
      // Move focus out of the outgoing panel before it becomes inert.
      gallery.focus({preventScroll: true});
      select(Number(button.dataset.featureIndex));
    };
    button.addEventListener('click', click);
    return click;
  });
  const leave = () => { hovered = false; syncPlayback(); };
  const focusIn = () => { focused = true; syncPlayback(); };
  const focusOut = event => { if (!gallery.contains(event.relatedTarget)) { focused = false; syncPlayback(); } };
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting && entry.intersectionRatio >= .3;
    syncPlayback();
  }, {threshold: [0, .3]});
  observer.observe(gallery);
  gallery.addEventListener('keydown', key);
  gallery.addEventListener('pointerenter', enter);
  gallery.addEventListener('pointerleave', leave);
  gallery.addEventListener('focusin', focusIn);
  gallery.addEventListener('focusout', focusOut);
  document.addEventListener('visibilitychange', syncPlayback);
  reduced.addEventListener('change', syncPlayback);
  select(Math.max(0, active));
  syncPlayback();
  return () => {
    cycle.kill();
    gsap.killTweensOf([...choices,...visuals,...progressBars]);
    observer.disconnect();
    dashboards.forEach(dashboard => dashboard?.destroy());
    nextButtons.forEach((button, index) => button.removeEventListener('click', nextHandlers[index]));
    gallery.removeEventListener('keydown', key);
    gallery.removeEventListener('pointerenter', enter);
    gallery.removeEventListener('pointerleave', leave);
    gallery.removeEventListener('focusin', focusIn);
    gallery.removeEventListener('focusout', focusOut);
    document.removeEventListener('visibilitychange', syncPlayback);
    reduced.removeEventListener('change', syncPlayback);
  };
}
