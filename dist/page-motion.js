// Locally vendored GSAP 3.15.0; no runtime CDN dependency.
import {siteMotion} from './site-motion-tokens.js';
export const {gsap, ScrollTrigger} = window;
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

function certificationHoverTimeline(svg,layers) {
  if(svg.dataset.isoform)return isoformCertificationTimeline(svg);
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


function isoformCertificationTimeline(svg) {
  return articulatedTimeline(svg, svg.dataset.art);
}

// Whole solids unfold along isometric axes. No individual edge morphing.
function articulatedTimeline(svg, kind) {
  const timeline=gsap.timeline({paused:true});
  const object=id=>svg.querySelector(`[data-object="${id}"]`);
  const move=(id,pose,at=0)=>timeline.to(object(id),{...pose,duration:.85,ease:'power3.inOut'},at);
  const tint=(id,at)=>timeline.to(object(id).querySelectorAll('path:not([fill="none"])'),
    {fill:'var(--pw-art-hover-face)',duration:.3},at);
  switch(kind) {
    case 'government':
      move('civic-core',{y:-64});
      move('civic-platform',{y:-34},.05);
      [[0,0,0,-15],[0,1,-30,10],[1,0,30,10],[1,1,0,30]].forEach(([a,b,x,y],i)=>
        move(`registry-${a}-${b}`,{x,y},.1+i*.04));
      tint('civic-core',.2); break;
    case 'infrastructure':
      [0,1].forEach(tower=>[0,1,2].forEach(level=>{
        // Opposing server drawers extend along the two ground-plane axes.
        const distance=14+level*12;
        move(`server-${tower}-${level}`,{x:(tower?1:-1)*distance,y:distance*.577},level*.09+tower*.14);
      }));
      tint('server-0-2',.18); tint('server-1-2',.28); break;
    case 'production':
      // Raise the housing, then a travelling wave carries parts along the belt.
      move('press-support',{y:-10}); move('press-head',{y:-28},.06);
      move('conveyor',{x:8.66,y:5},.1);
      ['part-0','part-1','part-2'].forEach((id,i)=>{
        timeline.to(object(id),{y:-20,duration:.3,ease:'sine.out'},.15+i*.13)
          .to(object(id),{x:26,y:15,duration:.5,ease:'power2.inOut'},.45+i*.13);
        tint(id,.25+i*.13);
      }); break;
    case 'personal':
      move('cells-boundary',{y:-12});
      [[0,0,0,-24],[0,1,-32,0],[1,0,32,0],[1,1,0,24]].forEach(([a,b,x,y],i)=>{
        move(`cell-${a}-${b}`,{x,y},.08+i*.06); tint(`cell-${a}-${b}`,.2+i*.06);
      }); break;
    case 'storage':
      move('outer-architectural-corner',{y:-18});
      move('middle-architectural-corner',{y:-10},.12);
      move('inner-architectural-corner',{y:16},.24);
      move('central-cube',{y:-48},.15);
      move('left-front-rail',{x:-28,y:16.16},.08);
      move('right-front-rail',{x:28,y:16.16},.08);
      tint('central-cube',.2); break;
    case 'cicd':
      // Bases stay on the route endpoints while each paired layer unfolds.
      ['source','left','right'].forEach((id,i)=>{
        move(`${id}-base`,{y:-10},0);
        // Compression propagates through the pipeline, then receivers open.
        timeline.to(object(`${id}-lid`),{y:14,duration:.25,ease:'power2.in'},i*.23)
          .to(object(`${id}-lid`),{y:-32,duration:.55,ease:'power3.out'},.25+i*.23);
        tint(`${id}-lid`,.16+i*.23);
      });
      move('junction',{y:-10});
      ['route-source','route-left','route-right'].forEach(id=>move(id,{y:-10})); break;
    case 'config':
      // File trays fan out in their own plane, rather than floating vertically.
      move('config-base',{x:-28,y:-16.16});
      move('config-middle',{x:12,y:6.93},.09);
      move('config-top',{x:48,y:27.71},.18);
      tint('config-top',.22); tint('config-middle',.16); break;
    case 'access':
      move('outer-boundary',{y:-14}); move('inner-boundary',{y:-28},.12);
      move('gate-left',{x:-40,y:23.09},.24);
      move('gate-right',{x:40,y:23.09},.38);
      move('protected-core',{y:-20},.5); tint('protected-core',.5); break;
  }
  return timeline;
}

function secretsHoverTimeline(svg) {
  return articulatedTimeline(svg, svg.dataset.secretArt);
}


export function mountPageMotion() {
  const stopGlints=mountDotGlints();
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    // Separate inner entrance targets from the hero's scroll-controlled wrapper.
    if (window.scrollY < 8) {
      gsap.from('.header-inner', {opacity:0,y:-8,duration:.6,ease:'power2.out',clearProps:'opacity,transform'});
      if (document.querySelector('.react-site-header')) {
        // React's ScrollTrigger owns copy opacity and CTA scale. Keep its
        // entrance on the independent Y axis, including the Figma origin mark.
        gsap.from('.hero-origin,.hero h1,.hero-copy > p,.product-tabs', {
          y:12,duration:siteMotion.entrance,stagger:.09,ease:'power3.out',clearProps:'transform'
        });
      } else {
        gsap.from('.hero h1,.hero-copy > p,.hero-actions,.product-tabs', {
          opacity:0,y:12,duration:siteMotion.entrance,stagger:.09,ease:'power3.out',clearProps:'opacity,transform'
        });
      }
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
    // Later sections use the same restrained entrance as the original page.
    // Animate inner content, not full-width surfaces or dot-pattern backgrounds.
    [
      ['.pricing-heading', 'h2'],
      ['.pricing-team-selector', '.pricing-team-readout,.pricing-range-control'],
      ['.pricing-plans', '.pricing-plan'],
      ['.secrets .section-intro', ':scope > *'],
      ['.secrets-cards', '.secrets-card'],
      ['.trust-heading', 'h2,p'],
      ['.trust-cards', '.trust-card'],
      ['.platforms-intro', 'h2,:scope > div'],
      ['.platform-feature', '.platform-feature-copy,.platform-feature-art'],
      ['.platforms-cards', '.platform-card'],
    ].forEach(([triggerSelector,targetSelector]) => {
      const trigger=document.querySelector(triggerSelector);
      if(!trigger || trigger.getBoundingClientRect().bottom <= 0)return;
      const targets=trigger.querySelectorAll(targetSelector);
      if(!targets.length)return;
      gsap.from(targets, {
        opacity:0,y:14,duration:siteMotion.reveal,stagger:.07,ease:siteMotion.revealEase,
        clearProps:'opacity,transform',scrollTrigger:{trigger,start:'top 88%',once:true}
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
      const main=card.closest('main');
      const speed=()=>{
        const milliseconds=Number.parseFloat(getComputedStyle(main || card).getPropertyValue('--motion-certification-duration'));
        return Number.isFinite(milliseconds) && milliseconds>0?320/milliseconds:1;
      };
      const enter = event => {
        if(event.pointerType==='touch' || main?.classList.contains('motion-certification-off'))return;
        timeline.timeScale(siteMotion.hoverSpeed*speed()).play();
      };
      const leave = () => timeline.timeScale(siteMotion.returnSpeed*speed()).reverse();
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
        svg.querySelectorAll('[data-motion-packet]').forEach(packet=>packet.remove());
        gsap.killTweensOf([...layers,...svg.querySelectorAll('path')]);
      });
    });
    document.querySelectorAll('.secrets-card').forEach(card => {
      const svg=card.querySelector('.secrets-illustration');
      if(!svg)return;
      const timeline=secretsHoverTimeline(svg);
      const main=card.closest('main');
      const speed=()=>{
        const milliseconds=Number.parseFloat(getComputedStyle(main || card).getPropertyValue('--motion-certification-duration'));
        return Number.isFinite(milliseconds) && milliseconds>0?320/milliseconds:1;
      };
      const enter=event=>{
        if(event.pointerType==='touch' || main?.classList.contains('motion-certification-off'))return;
        timeline.timeScale(siteMotion.hoverSpeed*speed()).play();
      };
      const leave=()=>timeline.timeScale(siteMotion.returnSpeed*speed()).reverse();
      const visibility=()=>{if(document.hidden)timeline.pause(0);};
      const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)timeline.pause(0);});
      card.addEventListener('pointerenter',enter);
      card.addEventListener('pointerleave',leave);
      observer.observe(card);
      document.addEventListener('visibilitychange',visibility);
      cleanups.push(()=>{
        card.removeEventListener('pointerenter',enter);
        card.removeEventListener('pointerleave',leave);
        document.removeEventListener('visibilitychange',visibility);
        observer.disconnect();
        timeline.kill();
        svg.querySelectorAll('[data-motion-packet]').forEach(packet=>packet.remove());
        gsap.killTweensOf([...svg.querySelectorAll('[data-object], path')]);
      });
    });
    return () => cleanups.forEach(cleanup=>cleanup());
  });
  return () => {media.revert();stopGlints();};
}
