import {gsap} from './page-motion.js';
import {siteMotion} from './site-motion-tokens.js';
export function mountClientLogos(row) {
  if (!row) return () => {};
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',()=>{
    let visible=false;
    const timelines=[...row.querySelectorAll('.client-logo-track')].map((track,i)=>
      gsap.timeline({repeat:-1,paused:true,delay:i*.12})
        .to(track,{y:-70,duration:siteMotion.move,ease:siteMotion.easeInOut},2)
        .to(track,{y:-140,duration:siteMotion.move,ease:siteMotion.easeInOut},4.8)
        .set(track,{y:0},5.6));
    const sync=()=>timelines.forEach(t=>t.paused(!visible||document.hidden));
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});
    observer.observe(row);
    document.addEventListener('visibilitychange',sync);
    return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);};
  });
  return ()=>media.revert();
}
