import { gsap } from './page-motion.js';
import { siteMotion } from './site-motion-tokens.js';

export function snapshotScreen(source) {
  const snapshot = source.cloneNode(true);
  snapshot.classList.add('screen-switch-outgoing');
  snapshot.removeAttribute('hidden');
  snapshot.removeAttribute('role');
  snapshot.setAttribute('aria-hidden', 'true');
  snapshot.removeAttribute('id');
  snapshot.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
  source.parentElement.append(snapshot);
  return snapshot;
}

// Hero screens can dissolve into each other because their content stays
// contained within one stationary product window.
export function dissolveScreen(outgoing, incoming, onComplete) {
  const blur = incoming.clientWidth < 700 ? siteMotion.screenBlurCompact : siteMotion.screenBlurDesktop;
  const timeline = gsap.timeline({ onComplete: () => {
    outgoing.remove();
    gsap.set(incoming, { clearProps: 'opacity,filter' });
    onComplete?.();
  } });
  timeline.set(incoming, { opacity: 0, filter: `blur(${blur}px)` }, 0);
  timeline.fromTo(outgoing, { opacity: 1 }, { opacity: 0, duration: siteMotion.screenFade, ease: 'sine.inOut' }, 0);
  timeline.to(incoming, { opacity: 1, filter: 'blur(0px)', duration: siteMotion.screenFocus,
    ease: 'sine.out' }, siteMotion.screenFadeDelay);
  return timeline;
}

// Distinct team dashboards fade through a neutral frame. They must never be
// legible on top of each other; only the arriving screen gets a 2px focus-in.
export function fadeThroughScreen(outgoing, incoming, outgoingCaption, incomingCaption, onComplete) {
  const timeline = gsap.timeline({ onComplete: () => {
    outgoing.remove();
    outgoingCaption.remove();
    gsap.set(incoming, { clearProps: 'opacity,filter' });
    gsap.set(incomingCaption, { clearProps: 'opacity' });
    onComplete?.();
  } });
  timeline.set(incoming, { opacity: 0, filter: 'blur(2px)' }, 0);
  timeline.set(incomingCaption, { opacity: 0 }, 0);
  timeline.to([outgoing, outgoingCaption], { opacity: 0, duration: .2, ease: 'sine.inOut' }, 0);
  timeline.to(incoming, { opacity: 1, filter: 'blur(0px)', duration: .46, ease: 'sine.out' }, .2);
  timeline.to(incomingCaption, { opacity: 1, duration: .38, ease: 'sine.out' }, .24);
  return timeline;
}
