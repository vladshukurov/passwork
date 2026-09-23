import {gsap, ScrollTrigger} from './page-motion.js?v=motion-20260923ab';

export function mountHeroScroll(hero, header) {
  if (!hero || !header) return () => {};
  const shell = hero.querySelector('.hero-window-shell');
  const copy = hero.querySelector('.hero-copy-scroll');
  const tabs = hero.querySelector('.product-tabs');
  const title = copy.querySelector('h1');
  const description = copy.querySelector('p');
  const actions = copy.querySelector('.hero-actions');
  const media = gsap.matchMedia();
  const originalInert = header.inert;
  let previousY = window.scrollY, direction = 0, distance = 0;
  header.classList.add('is-scroll-header');

  function updateHeader() {
    const y = Math.max(0,window.scrollY), delta = y-previousY;
    previousY = y;
    const productReachedHeader = shell.getBoundingClientRect().top <= header.offsetHeight + 24;
    const heroAboveHeader = hero.getBoundingClientRect().bottom <= header.offsetHeight;
    header.classList.toggle('is-over-product',productReachedHeader && !heroAboveHeader);
    header.classList.toggle('is-past-hero',heroAboveHeader);
    const menuOpen = header.querySelector('.menu-toggle[aria-expanded="true"]');
    if (y <= 8 || menuOpen || header.contains(document.activeElement)) {
      header.classList.remove('is-header-hidden');
      header.inert = originalInert;
      distance = 0;
      return;
    }
    if (Math.abs(delta)<.1) return;
    const nextDirection = Math.sign(delta);
    distance = nextDirection===direction ? distance+Math.abs(delta) : Math.abs(delta);
    direction = nextDirection;
    if(distance>=12) {
      header.classList.toggle('is-header-hidden',direction>0);
      header.inert = direction>0 || originalInert;
    }
  }
  const headerTrigger = ScrollTrigger.create({start:0,end:'max',onUpdate:updateHeader,onRefresh:updateHeader});
  media.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference)', () => {
    hero.classList.add('has-scroll-motion');
    const baseScale = () => .86+.14*gsap.utils.clamp(0,1,(innerHeight-500)/300);
    const gapAtRest = {title:180,description:130};
    const measure = () => {
      hero.style.setProperty('--hero-window-height',shell.offsetHeight+'px');
      hero.style.setProperty('--hero-window-overflow',Math.ceil(shell.offsetHeight*Math.max(0,baseScale()*1.12-1))+'px');
      if (window.scrollY <= 16) {
        const tabsTop=tabs.getBoundingClientRect().top;
        gapAtRest.title=Math.max(48,tabsTop-title.getBoundingClientRect().bottom);
        gapAtRest.description=Math.max(40,tabsTop-description.getBoundingClientRect().bottom);
      }
    };
    measure();
    ScrollTrigger.addEventListener('refreshInit',measure);
    const smoothstep = value => value*value*(3-2*value);
    const fadeBeforeContact = (node,restGap,tabsTop) => {
      const gap=tabsTop-node.getBoundingClientRect().bottom;
      return smoothstep(gsap.utils.clamp(0,1,(gap-8)/Math.max(1,restGap-8)));
    };
    const render = self => {
      const movement=smoothstep(gsap.utils.clamp(0,1,self.progress/.72));
      gsap.set(hero,{
        '--hero-copy-y':`${-40*movement}px`,
        '--hero-copy-scale':1-.04*movement,
        '--hero-window-scale':baseScale()*(1+.12*self.progress)
      });
      // Copy keeps a geometry-based fade so no line can ghost through the UI.
      const tabsTop=tabs.getBoundingClientRect().top;
      const descriptionOpacity=fadeBeforeContact(description,gapAtRest.description,tabsTop);
      const titleOpacity=fadeBeforeContact(title,gapAtRest.title,tabsTop);
      // Keep CTA motion tied to the same scroll position as the copy. Their
      // slightly deeper scale eases the bright surfaces away before the tabs
      // arrive, without moving the row on a separate trajectory.
      const actionPhase=smoothstep(gsap.utils.clamp(0,1,(self.progress*(self.end-self.start))/115));
      const actionOpacity=1-actionPhase;
      gsap.set(actions,{opacity:actionOpacity,scale:1-.1*actionPhase,transformOrigin:'50% 0%'});
      actions.inert=actionOpacity<.02;
      gsap.set(description,{opacity:descriptionOpacity});
      gsap.set(title,{opacity:titleOpacity});
      copy.inert=titleOpacity<.02 && descriptionOpacity<.02 && actionOpacity<.02;
    };
    const trigger=ScrollTrigger.create({trigger:hero,start:'top top',
      end:()=>'+='+gsap.utils.clamp(320,520,innerHeight*.45),
      onUpdate:render,onRefresh:render});
    render(trigger);
    return () => {
      ScrollTrigger.removeEventListener('refreshInit',measure);
      trigger.kill();
      hero.classList.remove('has-scroll-motion');
      hero.style.removeProperty('--hero-window-height');
      hero.style.removeProperty('--hero-window-overflow');
      hero.style.removeProperty('--hero-copy-y');
      hero.style.removeProperty('--hero-copy-scale');
      hero.style.removeProperty('--hero-window-scale');
      gsap.set([title,description],{clearProps:'opacity'});
      gsap.set(actions,{clearProps:'opacity,transform'});
      actions.inert=false;
      copy.inert=false;
    };
  });
  document.fonts.ready.then(()=>ScrollTrigger.refresh());
  updateHeader();
  return () => {
    media.revert();
    headerTrigger.kill();
    header.classList.remove('is-scroll-header','is-over-product','is-past-hero','is-header-hidden');
    header.inert=originalInert;
  };
}
