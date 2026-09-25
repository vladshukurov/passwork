import {gsap, ScrollTrigger} from './page-motion.js';

export function mountHeroScroll(hero, header) {
  if (!hero || !header) return () => {};
  const shell = hero.querySelector('.hero-window-shell');
  const productWindow = shell.querySelector('.product-window');
  const heroArt = hero.querySelector('.hero-gradient');
  const copy = hero.querySelector('.hero-copy-scroll');
  const tabs = hero.querySelector('.product-tabs');
  const title = copy.querySelector('h1');
  const origin = copy.querySelector('.hero-origin');
  const description = copy.querySelector('p');
  const actions = copy.querySelector('.hero-actions');
  const main = hero.closest('main');
  const media = gsap.matchMedia();
  const originalInert = header.inert;
  let previousY = window.scrollY, direction = 0, distance = 0;
  let headerHeight = 0, heroEndY = 0, heroArtTopY = 0, previousArtY;
  header.classList.add('is-scroll-header');

  function measureHeaderBounds() {
    headerHeight = header.offsetHeight;
    heroEndY = hero.getBoundingClientRect().bottom + window.scrollY;
    if (heroArt) {
      heroArtTopY = heroArt.getBoundingClientRect().top + window.scrollY;
      header.style.setProperty('--header-art-height', `${heroArt.offsetHeight}px`);
      previousArtY = undefined;
    }
  }
  measureHeaderBounds();

  function updateHeader() {
    const y = Math.max(0,window.scrollY), delta = y-previousY;
    previousY = y;
    const heroAboveHeader = y + headerHeight >= heroEndY;
    const productReachedHeader = !heroAboveHeader && shell.getBoundingClientRect().top <= headerHeight + 24;
    const windowBounds = productReachedHeader && productWindow.getBoundingClientRect();
    const windowBehindHeader = windowBounds && windowBounds.top < headerHeight + 52 && windowBounds.bottom > 0;
    if (windowBehindHeader) {
      header.style.setProperty('--header-window-left', `${Math.max(0, Math.round(windowBounds.left))}px`);
      header.style.setProperty('--header-window-right', `${Math.max(0, Math.round(innerWidth - windowBounds.right))}px`);
    }
    header.classList.toggle('is-over-product-window', Boolean(windowBehindHeader));
    if (productReachedHeader && heroArt) {
      const artY = Math.round(heroArtTopY - y);
      if (artY !== previousArtY) {
        header.style.setProperty('--header-art-y', `${artY}px`);
        previousArtY = artY;
      }
    }
    header.classList.toggle('is-over-product',productReachedHeader && !heroAboveHeader);
    header.classList.toggle('is-past-hero',heroAboveHeader);
    if (header.classList.contains('react-site-header')) {
      const overDarkSection = [...document.querySelectorAll('.pricing,.trust')].some(section => {
        const bounds = section.getBoundingClientRect();
        return bounds.top < headerHeight && bounds.bottom > headerHeight / 2;
      });
      header.classList.toggle('is-over-dark-section', overDarkSection);
    }
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
    const visibilityThreshold = header.classList.contains('react-site-header')
      ? (direction > 0 ? 36 : 48)
      : 12;
    if(distance>=visibilityThreshold) {
      header.classList.toggle('is-header-hidden',direction>0);
      header.inert = direction>0 || originalInert;
    }
  }
  const headerTrigger = ScrollTrigger.create({start:0,end:'max',onUpdate:updateHeader,onRefresh:() => {
    measureHeaderBounds();
    updateHeader();
  }});
  media.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference)', () => {
    const baseScale = () => .86+.14*gsap.utils.clamp(0,1,(innerHeight-500)/300);
    const motionEnabled = () => !main?.classList.contains('motion-hero-off');
    const motionDuration = () => {
      const milliseconds = Number.parseFloat(getComputedStyle(main || hero).getPropertyValue('--motion-hero-duration'));
      return Number.isFinite(milliseconds) && milliseconds > 0 ? milliseconds / 1000 : .55;
    };
    const gapAtRest = {title:180,description:130};
    const progressState = {value:0};
    let progressTween;
    let settingsFrame = 0;
    const measure = () => {
      hero.style.setProperty('--hero-window-height',shell.offsetHeight+'px');
      hero.style.setProperty('--hero-window-overflow',Math.ceil(shell.offsetHeight*Math.max(0,baseScale()*1.05-1))+'px');
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
    const renderMotion = progress => {
      const movement=smoothstep(gsap.utils.clamp(0,1,progress/.76));
      gsap.set(hero,{
        '--hero-copy-y':`${-40*movement}px`,
        '--hero-copy-scale':1-.04*movement,
        '--hero-window-scale':baseScale()*(1+.05*progress)
      });
    };
    const resetScene = () => {
      progressTween?.kill();
      progressTween=undefined;
      hero.classList.remove('has-scroll-motion');
      hero.style.removeProperty('--hero-copy-y');
      hero.style.removeProperty('--hero-copy-scale');
      hero.style.removeProperty('--hero-window-scale');
      gsap.set([title,description,...(origin ? [origin] : [])],{clearProps:'opacity'});
      gsap.set(actions,{clearProps:'opacity,transform'});
      actions.inert=false;
      copy.inert=false;
    };
    const render = (self,{immediate=false}={}) => {
      if(!motionEnabled()) {
        resetScene();
        return;
      }
      hero.classList.add('has-scroll-motion');
      // Copy keeps a geometry-based fade so no line can ghost through the UI.
      // Read all bounds before changing transforms, avoiding a forced layout
      // when the user reverses quickly through the sticky product scene.
      const tabsTop=tabs.getBoundingClientRect().top;
      const descriptionOpacity=fadeBeforeContact(description,gapAtRest.description,tabsTop);
      const titleOpacity=fadeBeforeContact(title,gapAtRest.title,tabsTop);
      // Keep CTA motion tied to the same scroll position as the copy. Its
      // slightly deeper scale eases the bright surface away before the tabs
      // arrive, without moving the row on a separate trajectory.
      const actionPhase=smoothstep(gsap.utils.clamp(0,1,(self.progress*(self.end-self.start))/115));
      const actionOpacity=1-actionPhase;
      if(immediate) {
        progressTween?.kill();
        progressState.value=self.progress;
        renderMotion(progressState.value);
      } else {
        progressTween=gsap.to(progressState,{
          value:self.progress,
          duration:motionDuration(),
          ease:'power2.out',
          overwrite:'auto',
          onUpdate:()=>renderMotion(progressState.value)
        });
      }
      gsap.set(actions,{opacity:actionOpacity,scale:1-.1*actionPhase,transformOrigin:'50% 0%'});
      actions.inert=actionOpacity<.02;
      gsap.set(description,{opacity:descriptionOpacity});
      gsap.set(title,{opacity:titleOpacity});
      if (origin) gsap.set(origin,{opacity:titleOpacity});
      copy.inert=titleOpacity<.02 && descriptionOpacity<.02 && actionOpacity<.02;
    };
    const trigger=ScrollTrigger.create({trigger:hero,start:'top top',
      end:()=>'+='+gsap.utils.clamp(320,520,innerHeight*.45),
      onUpdate:render,onRefresh:self=>render(self,{immediate:true})});
    render(trigger,{immediate:true});
    const settingsObserver = new MutationObserver(() => {
      cancelAnimationFrame(settingsFrame);
      settingsFrame=requestAnimationFrame(() => {
        if(motionEnabled()) {
          const wasEnabled=hero.classList.contains('has-scroll-motion');
          hero.classList.add('has-scroll-motion');
          if(!wasEnabled) ScrollTrigger.refresh();
          else render(trigger);
        } else resetScene();
      });
    });
    if(main) settingsObserver.observe(main,{attributes:true,attributeFilter:['class','style']});
    return () => {
      cancelAnimationFrame(settingsFrame);
      settingsObserver.disconnect();
      ScrollTrigger.removeEventListener('refreshInit',measure);
      trigger.kill();
      resetScene();
      hero.style.removeProperty('--hero-window-height');
      hero.style.removeProperty('--hero-window-overflow');
    };
  });
  let active=true;
  document.fonts.ready.then(()=>{if(active)ScrollTrigger.refresh();});
  measureHeaderBounds();
  updateHeader();
  return () => {
    active=false;
    media.revert();
    headerTrigger.kill();
    header.classList.remove('is-scroll-header','is-over-product','is-over-product-window','is-past-hero','is-over-dark-section','is-header-hidden');
    header.style.removeProperty('--header-art-height');
    header.style.removeProperty('--header-art-y');
    header.inert=originalInert;
  };
}
