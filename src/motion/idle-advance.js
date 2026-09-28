// Idle autoplay for scroll-driven story sections. While the section sits in
// the middle of the viewport and the visitor does nothing, the current
// chapter's progress bar fills on its own and the page then glides to the
// next chapter. Any input (wheel, touch, keys, pointer, manual scroll) hands
// control straight back to scrolling.
import {gsap} from 'gsap';

const IDLE = 1.2;   // seconds of stillness before autoplay starts
const DWELL = 6;    // seconds a chapter's bar takes to fill

export function mountIdleAdvance({root, chapter, count, progress, fill, advance}) {
  if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  let inView = false, idleTimer = 0, tween = null, gliding = false, glideTimer = 0;

  const stop = () => {
    clearTimeout(idleTimer);
    if (tween) { tween.kill(); tween = null; fill(null); }
  };
  const arm = () => {
    stop();
    if (!inView || gliding || chapter() >= count - 1) return;
    idleTimer = setTimeout(run, IDLE * 1000);
  };
  function run() {
    const index = chapter();
    if (!inView || index >= count - 1) return;
    const state = {value: Math.max(0, Math.min(1, progress()))};
    tween = gsap.to(state, {
      value: 1, duration: DWELL * (1 - state.value), ease: 'none',
      onUpdate: () => fill(state.value),
      onComplete: () => {
        tween = null;
        gliding = true;
        advance(index + 1);
        // Our own smooth scroll is not the visitor's input; re-arm after it.
        clearTimeout(glideTimer);
        glideTimer = setTimeout(() => { gliding = false; fill(null); arm(); }, 1400);
      },
    });
  }
  const onInput = () => { gliding = false; clearTimeout(glideTimer); arm(); };
  const onScroll = () => { if (!gliding) arm(); };

  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) arm(); else stop();
  }, {rootMargin: '-45% 0px -45% 0px'});
  observer.observe(root);
  const inputs = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
  inputs.forEach(type => window.addEventListener(type, onInput, {passive: true}));
  window.addEventListener('scroll', onScroll, {passive: true});

  return () => {
    stop();
    clearTimeout(glideTimer);
    observer.disconnect();
    inputs.forEach(type => window.removeEventListener(type, onInput));
    window.removeEventListener('scroll', onScroll);
  };
}
