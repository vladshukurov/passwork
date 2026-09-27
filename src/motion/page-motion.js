import {siteMotion} from './site-motion-tokens.js';
import {assembleArt, mountArtHover} from './isoform-motion.js';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export {gsap, ScrollTrigger};
gsap.registerPlugin(ScrollTrigger);

function mountDotGlints() {
  // React owns its dot treatments through the preview controls. Avoid a
  // second GSAP mask tween fighting the selected CSS animation.
  if (document.querySelector('.react-site-header')) return () => {};
  const preference=matchMedia('(prefers-reduced-motion: no-preference)');
  let cleanups=[];
  const mount=()=>{
    cleanups.forEach(cleanup=>cleanup());
    cleanups=[];
    if(!preference.matches)return;
    document.querySelectorAll('.dot-glint').forEach((glint,index) => {
      // The archived static site keeps its original one-shot sweep.
      const sweep=gsap.fromTo(glint,
        {webkitMaskPosition:'100% 0%',maskPosition:'100% 0%'},
        {webkitMaskPosition:'0% 0%',maskPosition:'0% 0%',duration:siteMotion.glintSweep,
          ease:'sine.inOut',paused:true,delay:.35+index*.15,
          repeat:0});
      let visible=false;
      let started=false;
      const update=()=>{
        if(!visible || document.hidden){sweep.pause();return;}
        if(!started){started=true;sweep.play(0);}
        else if(sweep.progress()<1)sweep.resume();
      };
      const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();});
      observer.observe(glint.parentElement);
      document.addEventListener('visibilitychange',update);
      cleanups.push(()=>{observer.disconnect();document.removeEventListener('visibilitychange',update);sweep.kill();});
    });
  };
  mount();
  preference.addEventListener('change',mount);
  return ()=>{preference.removeEventListener('change',mount);cleanups.forEach(cleanup=>cleanup());};
}

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
  const stopGlints=mountDotGlints();
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    // Separate inner entrance targets from the hero's scroll-controlled wrapper.
    if (window.scrollY < 8) {
      gsap.from('.header-inner', {opacity:0,y:-8,duration:siteMotion.reveal,ease:siteMotion.ease,clearProps:'opacity,transform'});
      if (document.querySelector('.react-site-header')) {
        // React's ScrollTrigger owns copy opacity and CTA scale. Keep its
        // entrance on the independent Y axis, including the Figma origin mark.
        gsap.from('.hero-origin,.hero h1,.hero-copy > p,.product-tabs', {
          y:siteMotion.revealY,duration:siteMotion.entrance,stagger:siteMotion.stagger,ease:siteMotion.ease,clearProps:'transform'
        });
      } else {
        gsap.from('.hero h1,.hero-copy > p,.hero-actions,.product-tabs', {
          opacity:0,y:siteMotion.revealY,duration:siteMotion.entrance,stagger:siteMotion.stagger,ease:siteMotion.ease,clearProps:'opacity,transform'
        });
      }
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
      ['.platforms-intro', 'h2,:scope > div'],
      ['.platform-feature', '.platform-feature-copy,.platform-feature-art'],
      ['.platforms-cards', '.platform-card'],
    ].forEach(([triggerSelector,targetSelector]) =>
      reveal(document.querySelector(triggerSelector), targetSelector));
    document.querySelectorAll('.team-tabs').forEach(block => reveal(block, [block]));
  });
  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const cleanups = [];
    document.querySelectorAll('.certification-card, .secrets-card').forEach(card => {
      const svg = card.querySelector('.iso-art');
      if (!svg) return;
      const art = mountArtHover(gsap, svg);
      const main = card.closest('main');
      const enter = event => {
        if (event.pointerType === 'touch' || main?.classList.contains('motion-certification-off')) return;
        art.open();
      };
      const leave = () => art.close();
      const observer = new IntersectionObserver(([entry]) => {if (!entry.isIntersecting) art.reset();});
      card.addEventListener('pointerenter', enter);
      card.addEventListener('pointerleave', leave);
      observer.observe(card);
      cleanups.push(() => {
        card.removeEventListener('pointerenter', enter);
        card.removeEventListener('pointerleave', leave);
        observer.disconnect();
        gsap.killTweensOf(art.nodes);
        gsap.set(art.nodes, {clearProps: 'transform'});
      });
    });
    return () => cleanups.forEach(cleanup => cleanup());
  });
  return () => {media.revert();stopGlints();};
}
