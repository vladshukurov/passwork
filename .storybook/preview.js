import '../dist/code/design-tokens.css';
import '../dist/passwork-tokens.css';
import '../dist/attio-buttons.css';
import '../dist/passwork.css';
import '../dist/passwork-motion.css';
import '../dist/client-logos.css';
import '../dist/hero-scroll.css';
import '../dist/security-switcher.css';
import '../dist/live-dashboard-base.css';
import '../dist/live-dashboard-light.css';
import '../dist/team-dashboards.css';
import '../dist/team-dashboards-light.css';
import '../react/src/tokens.css';
import '../react/src/header-surface.css';
import './story-canvas.css';

export default {
  parameters: {
    layout: 'fullscreen',
    controls: {expanded: true},
    docs: {source: {type: 'dynamic'}},
    options: {storySort: {order: ['Обзор', 'Основы', 'React', 'Компоненты', 'Секции', 'Демонстрации']}},
  },
};
