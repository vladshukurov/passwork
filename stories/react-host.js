import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

// The existing catalog uses Storybook's HTML renderer. This host mounts the
// actual React components and disposes their roots when stories change.
class ReactStoryHost extends HTMLElement {
  set scene(value) {
    this.element = value;
    if (this.isConnected) this.renderScene();
  }

  connectedCallback() { this.renderScene(); }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = null;
  }

  renderScene() {
    if (!this.element) return;
    this.root ??= createRoot(this);
    flushSync(() => this.root.render(this.element));
  }
}

if (!customElements.get('pw-react-story')) customElements.define('pw-react-story', ReactStoryHost);

export function reactStory(element) {
  const host = document.createElement('pw-react-story');
  host.scene = element;
  return host;
}
