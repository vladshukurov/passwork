import React, { useEffect } from 'react';
import ContactDialog from './components/ContactDialog.jsx';
import { SectionDivider } from './components/Decor.jsx';
import Header from './sections/Header.jsx';
import Hero from './sections/Hero.jsx';
import ClientLogos from './sections/ClientLogos.jsx';
import About from './sections/About.jsx';
import Certification from './sections/Certification.jsx';
import Teams, { TeamsHeading } from './sections/Teams.jsx';
import MainFeatures from './sections/MainFeatures.jsx';
import Secrets from './sections/Secrets.jsx';
import Trust from './sections/Trust.jsx';
import Security from './sections/Security.jsx';
import Pricing from './sections/Pricing.jsx';
import CaseStudies from './sections/CaseStudies.jsx';
import Reviews from './sections/Reviews.jsx';
import Platforms from './sections/Platforms.jsx';
import Footer from './sections/Footer.jsx';
import { mountPageMotion } from './motion/page-motion.js';
import { mountHeroScroll } from './motion/hero-scroll.js';
import { mountSectionNavigation } from './lib/section-navigation.js';

// Page-wide controllers mount after every section has mounted its own
// (React runs child effects first), matching their ScrollTrigger order.
function usePageControllers() {
  useEffect(() => {
    const stops = [
      mountSectionNavigation(),
      mountPageMotion(),
      mountHeroScroll(document.querySelector('.hero'), document.querySelector('.site-header')),
    ];
    // The target does not exist during the browser's native initial hash jump.
    let frame = 0;
    if (location.hash && scrollY < 2) frame = requestAnimationFrame(() =>
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' }));
    return () => { cancelAnimationFrame(frame); stops.forEach(stop => stop()); };
  }, []);
}

export default function App() {
  usePageControllers();
  return <>
    <a className="skip-link" href="#main">Перейти к содержимому</a>
    <Header />
    <main id="main">
      <Hero />
      <div className="page-grid">
        <ClientLogos /><About /><Certification />
        <TeamsHeading /><Teams /><SectionDivider inGrid />
        <MainFeatures /><Secrets /><SectionDivider inGrid />
      </div>
      <Trust />
      <div className="page-grid security-page-grid"><Security /><CaseStudies /></div>
      <SectionDivider openBottom />
      <Pricing /><Reviews /><Platforms />
    </main>
    <Footer />
    <ContactDialog />
  </>;
}
