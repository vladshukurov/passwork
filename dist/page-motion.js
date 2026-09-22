// Locally vendored GSAP 3.15.0; no runtime CDN dependency.
import {siteMotion} from './site-motion-tokens.js';
export const {gsap, ScrollTrigger} = window;
gsap.registerPlugin(ScrollTrigger);

export function mountPageMotion() {
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    // Separate inner entrance targets from the hero's scroll-controlled wrapper.
    if (window.scrollY < 8) {
      gsap.from('.header-inner', {opacity:0,y:-8,duration:.6,ease:'power2.out',clearProps:'opacity,transform'});
      gsap.from('.hero h1,.hero-copy > p,.hero-actions,.product-tabs', {
        opacity:0,y:12,duration:siteMotion.entrance,stagger:.09,ease:'power3.out',clearProps:'opacity,transform'
      });
    }
    document.querySelectorAll('.certification-card').forEach(card => {
      gsap.from(card.querySelectorAll('.certification-art,.certification-copy'), {
        opacity:0,y:12,duration:siteMotion.reveal,stagger:.08,ease:'power2.out',clearProps:'opacity,transform',
        scrollTrigger:{trigger:card,start:'top 90%',once:true}
      });
    });
    [
      ['.about', '.eyebrow,h2'],
      ['.certification > .section-intro', ':scope > *'],
      ['.teams-heading', ':scope > *'],
      ['.security-switcher > .section-intro', ':scope > *'],
    ].forEach(([triggerSelector,targetSelector]) => {
      const trigger=document.querySelector(triggerSelector);
      if(!trigger)return;
      gsap.from(trigger.querySelectorAll(targetSelector), {
        opacity:0,y:18,duration:siteMotion.reveal,stagger:.09,ease:siteMotion.revealEase,
        clearProps:'opacity,transform',scrollTrigger:{trigger,start:'top 86%',once:true}
      });
    });
    document.querySelectorAll('.team-tabs,.security-switcher-grid').forEach(block => {
      gsap.from(block,{opacity:0,y:14,duration:siteMotion.reveal,ease:siteMotion.revealEase,
        clearProps:'opacity,transform',scrollTrigger:{trigger:block,start:'top 90%',once:true}});
    });
    const footer=document.querySelector('.site-footer');
    if(footer){
      gsap.from(footer.querySelectorAll('.footer-main > *'),{
        opacity:0,y:16,duration:siteMotion.reveal,stagger:.07,ease:siteMotion.revealEase,
        clearProps:'opacity,transform',scrollTrigger:{trigger:footer,start:'top 88%',once:true}
      });
    }
  });
  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const cleanups = [];
    document.querySelectorAll('.certification-card').forEach(card => {
      const svg = card.querySelector('[data-art]');
      const layers = [...svg.querySelectorAll('.certification-layer')];
      const pose = {
        gis: i => ({x:0,y:-i*2}),
        'asu-tp': i => ({x:(3.5-i)*1.1,y:Math.sin(i/7*Math.PI)*-5}),
        ispdn: i => ({x:0,y:-4-i*4})
      }[svg.dataset.art];
      // Only the exported construction layers move; the artwork stays anchored.
      const timeline = gsap.timeline({paused:true});
      const accents = layers.map(layer => layer.querySelector('path:last-child')).filter(Boolean);
      timeline.to(accents,{stroke:'var(--pw-art-active)',duration:.24,ease:'power2.out',stagger:.025},0);
      if (svg.dataset.art === 'kii') {
        // Extend the side walls and move their roof vertices together, keeping
        // every base vertex fixed. This export uses absolute M/L/V commands.
        [[0,46,-5],[2,167.5,-6]].forEach(([index,roofY,lift],order) => {
          layers[index].querySelectorAll('path').forEach(path=>{
            const source=path.getAttribute('d');
            const raised=source.replace(/([ML])\s*(-?[\d.]+)[ ,]+(-?[\d.]+)|V\s*(-?[\d.]+)/g,
              (match,command,x,y,vertical)=>{
                const original=Number(y ?? vertical);
                const next=original<=roofY ? original+lift : original;
                return command ? `${command}${x} ${next}` : `V${next}`;
              });
            timeline.to(path,{attr:{d:raised},duration:siteMotion.layer,ease:siteMotion.layerEase},order*.08);
          });
        });
      } else {
        layers.forEach((layer,i) => timeline.to(layer, {
          ...pose(i),duration:siteMotion.layer,ease:siteMotion.layerEase
        },i*siteMotion.layerStagger));
      }
      const enter = event => {
        if(event.pointerType==='touch')return;
        timeline.timeScale(siteMotion.hoverSpeed).play();
      };
      const leave = () => timeline.timeScale(siteMotion.returnSpeed).reverse();
      card.addEventListener('pointerenter',enter);
      card.addEventListener('pointerleave',leave);
      const visibility = () => {if(document.hidden) timeline.pause(0);};
      const observer = new IntersectionObserver(([entry]) => {if(!entry.isIntersecting) timeline.pause(0);});
      observer.observe(card);
      document.addEventListener('visibilitychange',visibility);
      cleanups.push(() => {
        card.removeEventListener('pointerenter',enter);
        card.removeEventListener('pointerleave',leave);
        document.removeEventListener('visibilitychange',visibility);
        observer.disconnect();
        timeline.kill();
        gsap.killTweensOf([...layers,...svg.querySelectorAll('path')]);
      });
    });
    return () => cleanups.forEach(cleanup=>cleanup());
  });
  return () => media.revert();
}
