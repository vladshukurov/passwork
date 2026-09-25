import { gsap } from './page-motion.js';

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

// Screens crossfade inside one stationary product window, without blur or a blank frame.
export function dissolveScreen(outgoing, incoming, onComplete, duration = .32) {
  const timeline = gsap.timeline({ onComplete: () => {
    outgoing.remove();
    gsap.set(incoming, { clearProps: 'opacity,filter' });
    onComplete?.();
  } });
  timeline.set(incoming, { opacity: 0 }, 0);
  timeline.fromTo(outgoing, { opacity: 1 }, { opacity: 0, duration, ease: 'sine.inOut' }, 0);
  timeline.to(incoming, { opacity: 1, duration, ease: 'sine.inOut' }, 0);
  return timeline;
}

// Team dashboard and caption share the same short, stationary crossfade.
export function fadeThroughScreen(outgoing, incoming, outgoingCaption, incomingCaption, onComplete, duration = .32) {
  const timeline = gsap.timeline({ onComplete: () => {
    outgoing.remove();
    outgoingCaption.remove();
    gsap.set(incoming, { clearProps: 'opacity,filter' });
    gsap.set(incomingCaption, { clearProps: 'opacity' });
    onComplete?.();
  } });
  timeline.set(incoming, { opacity: 0 }, 0);
  timeline.set(incomingCaption, { opacity: 0 }, 0);
  timeline.to([outgoing, outgoingCaption], { opacity: 0, duration, ease: 'sine.inOut' }, 0);
  timeline.to([incoming, incomingCaption], { opacity: 1, duration, ease: 'sine.inOut' }, 0);
  return timeline;
}
