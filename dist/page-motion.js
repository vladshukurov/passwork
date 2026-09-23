// Locally vendored GSAP 3.15.0; no runtime CDN dependency.
import {siteMotion} from './site-motion-tokens.js?v=motion-20260923aa';
export const {gsap, ScrollTrigger} = window;
gsap.registerPlugin(ScrollTrigger);

function mountDotGlints() {
  const preference=matchMedia('(prefers-reduced-motion: no-preference)');
  let cleanups=[];
  const mount=()=>{
    cleanups.forEach(cleanup=>cleanup());
    cleanups=[];
    if(!preference.matches)return;
    document.querySelectorAll('.dot-glint').forEach((glint,index) => {
      // A single restrained sweep introduces each dot field as it enters view.
      const sweep=gsap.fromTo(glint,
        {webkitMaskPosition:'100% 0%',maskPosition:'100% 0%'},
        {webkitMaskPosition:'0% 0%',maskPosition:'0% 0%',duration:siteMotion.glintSweep,
          ease:'sine.inOut',paused:true,delay:.35+index*.15});
      let visible=false;
      let started=false;
      const update=()=>{
        if(!visible || document.hidden){sweep.pause();return;}
        if(!started){started=true;sweep.play(0);}
        else if(!sweep.progress() || sweep.progress()<1)sweep.resume();
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

function certificationHoverTimeline(svg,layers) {
  const art=svg.dataset.art;
  const faces=[...svg.querySelectorAll('path[fill]')];
  const timeline=gsap.timeline({paused:true,defaults:{overwrite:'auto'}});
  timeline.to(faces,{fill:'var(--pw-art-hover-face)',duration:.3,ease:'power2.out'},0);

  const pose={
    gis:index=>({x:0,y:-index*2}),
    'asu-tp':index=>({x:(3.5-index)*1.1,y:Math.sin(index/7*Math.PI)*-5}),
    ispdn:index=>({x:0,y:-4-index*4})
  }[art];

  if(art==='kii') {
    // Restore the original construction motion: both towers extend upward
    // while every base vertex and the connecting route remain anchored.
    [[0,46,-5],[2,167.5,-6]].forEach(([index,roofY,lift],order)=>{
      layers[index].querySelectorAll('path').forEach(path=>{
        const source=path.getAttribute('d');
        const raised=source.replace(/([ML])\s*(-?[\d.]+)[ ,]+(-?[\d.]+)|V\s*(-?[\d.]+)/g,
          (match,command,x,y,vertical)=>{
            const original=Number(y??vertical);
            const next=original<=roofY?original+lift:original;
            return command?`${command}${x} ${next}`:`V${next}`;
          });
        timeline.to(path,{attr:{d:raised},duration:siteMotion.layer,ease:siteMotion.layerEase},order*.08);
      });
    });
  } else {
    // Original poses: stacked hierarchy, production wave, and lifted core.
    layers.forEach((layer,index)=>timeline.to(layer,{
      ...pose(index),duration:siteMotion.layer,ease:siteMotion.layerEase
    },index*siteMotion.layerStagger));
  }

  return timeline;
}

export function mountPageMotion() {
  const stopGlints=mountDotGlints();
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    // Separate inner entrance targets from the hero's scroll-controlled wrapper.
    if (window.scrollY < 8) {
      gsap.from('.header-inner', {opacity:0,y:-8,duration:.6,ease:'power2.out',clearProps:'opacity,transform'});
      gsap.from('.hero h1,.hero-copy > p,.hero-actions,.product-tabs', {
        opacity:0,y:12,duration:siteMotion.entrance,stagger:.09,ease:'power3.out',clearProps:'opacity,transform'
      });
    }
    document.querySelectorAll('.certification-card').forEach((card,cardIndex) => {
      // A deep link may restore below these cards before ScrollTrigger initializes.
      // One-shot triggers that are already behind the viewport can self-kill mid-refresh.
      if (card.getBoundingClientRect().bottom <= 0) return;
      const art=card.querySelector('.certification-art');
      const copy=card.querySelector('.certification-copy');
      const timeline=gsap.timeline({
        scrollTrigger:{trigger:card,start:'top 90%',once:true},
        defaults:{ease:'power3.out'}
      });
      timeline.from(art,{opacity:0,y:10,duration:.5,clearProps:'opacity,transform'},cardIndex*.025);
      timeline.from(copy.children,{
        opacity:0,y:8,duration:.46,stagger:.05,clearProps:'opacity,transform'
      },.12+cardIndex*.025);
    });
    [
      ['.about', '.eyebrow,h2'],
      ['.certification > .section-intro', ':scope > *'],
      ['.teams-heading', ':scope > *'],
      ['.security-switcher > .section-intro', ':scope > *'],
    ].forEach(([triggerSelector,targetSelector]) => {
      const trigger=document.querySelector(triggerSelector);
      if(!trigger)return;
      if(trigger.getBoundingClientRect().bottom <= 0)return;
      gsap.from(trigger.querySelectorAll(targetSelector), {
        opacity:0,y:18,duration:siteMotion.reveal,stagger:.09,ease:siteMotion.revealEase,
        clearProps:'opacity,transform',scrollTrigger:{trigger,start:'top 86%',once:true}
      });
    });
    document.querySelectorAll('.team-tabs').forEach(block => {
      if(block.getBoundingClientRect().bottom <= 0)return;
      gsap.from(block,{opacity:0,y:14,duration:siteMotion.reveal,ease:siteMotion.revealEase,
        clearProps:'opacity,transform',scrollTrigger:{trigger:block,start:'top 90%',once:true}});
    });
  });
  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const cleanups = [];
    document.querySelectorAll('.certification-card').forEach(card => {
      const svg = card.querySelector('[data-art]');
      const layers = [...svg.querySelectorAll('.certification-layer')];
      const timeline=certificationHoverTimeline(svg,layers);
      const enter = event => {
        if(event.pointerType==='touch')return;
        timeline.timeScale(siteMotion.hoverSpeed).restart();
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
  return () => {media.revert();stopGlints();};
}
