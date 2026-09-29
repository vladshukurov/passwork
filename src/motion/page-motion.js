import {siteMotion} from './site-motion-tokens.js';
import {assembleArt, mountArtHover} from './isoform-motion.js';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export {gsap, ScrollTrigger};
gsap.registerPlugin(ScrollTrigger);

// Every section enters the same way: a short rise with one curve and one
// stagger. Surfaces stay put; only their contents move.
function reveal(trigger, targets, extra = {}) {
  if (!trigger || trigger.getBoundingClientRect().bottom <= 0) return;
  const nodes = typeof targets === 'string' ? trigger.querySelectorAll(targets) : targets;
  if (!nodes.length) return;
  gsap.from(nodes, {
    opacity: 0, y: siteMotion.revealY, duration: siteMotion.reveal, stagger: siteMotion.stagger,
    ease: siteMotion.ease, clearProps: 'opacity,transform',
    scrollTrigger: {trigger, start: siteMotion.revealStart, once: true}, ...extra,
  });
}

export function mountPageMotion() {
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    // Separate inner entrance targets from the hero's scroll-controlled wrapper.
    if (window.scrollY < 8) {
      gsap.from('.header-inner', {opacity:0,y:-8,duration:siteMotion.reveal,ease:siteMotion.ease,clearProps:'opacity,transform'});
      // The hero's ScrollTrigger owns copy opacity and CTA scale, so the
      // entrance only moves along Y.
      gsap.from('.hero-origin,.hero h1,.hero-copy > p,.product-tabs', {
        y:siteMotion.revealY,duration:siteMotion.entrance,stagger:siteMotion.stagger,ease:siteMotion.ease,clearProps:'transform'
      });
    }
    // Illustrated cards: the artwork assembles, then the copy follows.
    document.querySelectorAll('.certification-cards, .secrets-cards').forEach(row => {
      if (row.getBoundingClientRect().bottom <= 0) return;
      const timeline = gsap.timeline({scrollTrigger:{trigger:row,start:siteMotion.revealStart,once:true}});
      row.querySelectorAll('.certification-card, .secrets-card').forEach((card, index) => {
        const at = index * siteMotion.stagger * 1.5;
        const art = card.querySelector('.iso-art');
        if (art) assembleArt(gsap, art, timeline, at);
        const copy = card.querySelector('.certification-copy, .secrets-card-copy');
        if (copy) timeline.from(copy.children, {
          opacity:0, y:siteMotion.revealY*.6, duration:siteMotion.reveal, stagger:siteMotion.stagger,
          ease:siteMotion.ease, clearProps:'opacity,transform',
        }, at + .18);
      });
    });
    [
      ['.about', '.eyebrow,h2'],
      ['.certification > .section-intro', ':scope > *'],
      ['.teams-heading', ':scope > *'],
      ['.security-switcher > .section-intro', ':scope > *'],
      ['.pricing-heading', 'h2'],
      ['.pricing-team-selector', '.pricing-team-readout,.pricing-range-control'],
      ['.pricing-plans', '.pricing-plan'],
      ['.secrets .section-intro', ':scope > *'],
      ['.trust-heading', 'h2,p'],
      ['.trust-cards', '.trust-card'],
      ['.case-studies-intro', ':scope > *'],
      ['.case-grid', '.case-cell > *'],
      ['.reviews-heading', ':scope > *'],
      ['.review-columns', '.review-column > figure'],
      ['.platforms-intro', 'h2,:scope > div'],
      ['.platform-feature', '.platform-feature-copy,.platform-feature-art'],
      ['.platforms-cards', '.platform-card'],
    ].forEach(([triggerSelector,targetSelector]) =>
      reveal(document.querySelector(triggerSelector), targetSelector));
    document.querySelectorAll('.team-tabs').forEach(block => reveal(block, [block]));
  });
  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const cleanups = [];
    // Hover follows the figure itself: its rest silhouette ([data-hit]) is the
    // only hit area, so leaving the figure closes it even inside the card.
    document.querySelectorAll('.certification-card .iso-art, .secrets-card .iso-art').forEach(svg => {
      const hit = svg.querySelector('[data-hit]');
      if (!hit) return;
      const art = mountArtHover(gsap, svg);
      const enter = event => {
        if (event.pointerType === 'touch') return;
        svg.classList.add('is-active');
        art.open();
      };
      const leave = () => { svg.classList.remove('is-active'); art.close(); };
      const observer = new IntersectionObserver(([entry]) => {if (!entry.isIntersecting) { svg.classList.remove('is-active'); art.reset(); }});
      hit.addEventListener('pointerenter', enter);
      hit.addEventListener('pointerleave', leave);
      observer.observe(svg);
      cleanups.push(() => {
        hit.removeEventListener('pointerenter', enter);
        hit.removeEventListener('pointerleave', leave);
        observer.disconnect();
        svg.classList.remove('is-active');
        gsap.killTweensOf(art.nodes);
        gsap.set(art.nodes, {clearProps: 'transform'});
      });
    });
    return () => cleanups.forEach(cleanup => cleanup());
  });
  return () => media.revert();
}
