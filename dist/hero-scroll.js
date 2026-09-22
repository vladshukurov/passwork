import {gsap, ScrollTrigger} from './page-motion.js';

export function mountHeroScroll(hero, header) {
  if (!hero || !header) return () => {};
  const shell = hero.querySelector('.hero-window-shell');
  const copy = hero.querySelector('.hero-copy-scroll');
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
    const measure = () => {
      hero.style.setProperty('--hero-window-height',shell.offsetHeight+'px');
      hero.style.setProperty('--hero-window-overflow',Math.ceil(shell.offsetHeight*Math.max(0,baseScale()*1.12-1))+'px');
    };
    measure();
    ScrollTrigger.addEventListener('refreshInit',measure);
    gsap.set(hero,{'--hero-window-scale':baseScale(),'--hero-copy-opacity':1,'--hero-copy-y':'0px'});
    const timeline = gsap.timeline({
      scrollTrigger:{trigger:hero,start:'top top',end:()=>'+='+gsap.utils.clamp(320,520,innerHeight*.45),
        scrub:.45,invalidateOnRefresh:true},
      onUpdate:()=>{copy.inert=timeline.progress()>.72;}
    });
    timeline.fromTo(hero,{'--hero-copy-opacity':1,'--hero-copy-y':'0px'},
      {'--hero-copy-opacity':0,'--hero-copy-y':'-12px',duration:.72,ease:'power1.inOut'},0);
    timeline.fromTo(hero,{'--hero-window-scale':()=>baseScale()},
      {'--hero-window-scale':()=>baseScale()*1.12,duration:1,ease:'none'},0);
    return () => {
      ScrollTrigger.removeEventListener('refreshInit',measure);
      hero.classList.remove('has-scroll-motion');
      hero.style.removeProperty('--hero-window-height');
      hero.style.removeProperty('--hero-window-overflow');
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
