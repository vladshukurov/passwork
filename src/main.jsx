import React from 'react';
import { createRoot } from 'react-dom/client';
// Cascade order matters: tokens, base, sections, then the 2026 layout layer.
import './styles/attio-tokens.css';
import './styles/passwork-tokens.css';
import './styles/attio-buttons.css';
import './styles/passwork.css';
import './styles/passwork-motion.css';
import './styles/client-logos.css';
import './styles/hero-entrance.css';
import './styles/hero-scroll.css';
import './styles/security-switcher.css';
import './dashboards/hero/hero-base.css';
import './dashboards/hero/hero-light.css';
import './dashboards/teams/teams.css';
import './dashboards/teams/teams-light.css';
import './styles/site-footer.css';
import './styles/tokens.css';
import './styles/header-surface.css';
import './styles/figma-2026.css';
import './styles/isoform-art.css';
import './styles/typography.css';
import './styles/rhythm.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
