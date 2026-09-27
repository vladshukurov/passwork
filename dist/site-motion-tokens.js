// One motion vocabulary for GSAP and CSS (see --pw-motion-* in passwork-tokens.css).
// Durations are seconds. Decorative dashboard scenarios own their timings.
export const siteMotion = Object.freeze({
  micro: .16,          // colour and press feedback
  ui: .28,             // tabs, header, toggles
  move: .56,           // anything that travels
  reveal: .72,         // first appearance on scroll
  ease: 'power4.out',  // = cubic-bezier(.22, 1, .36, 1)
  easeInOut: 'power2.inOut',
  stagger: .06,
  revealY: 16,
  revealStart: 'top 85%',
  // Isoform artwork: pieces settle into place, hover opens an exploded view.
  artEnter: .62,
  artLeave: .48,
  artStagger: .03,
  artAssemble: 1.05,
  artAssembleStagger: .045,
  entrance: .8,
  scrub: .45,
  screenBlurDesktop: 3.5,
  screenBlurCompact: 2,
  screenFocus: .56,
  screenFade: .32,
  screenFadeDelay: .08,
  glintSweep: 2.6,
});
