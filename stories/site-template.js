import pageHtml from '../dist/index.html?raw';

const page = document.createElement('template');
page.innerHTML = pageHtml;

export function fromSite(selector) {
  const source = page.content.querySelector(selector);
  if (!source) throw new Error(`Production markup not found: ${selector}`);
  return source.cloneNode(true);
}

export function shell({title, description, blue = false, white = false} = {}) {
  const root = document.createElement('div');
  root.className = `story-shell${blue ? ' story-shell--blue' : ''}${white ? ' story-shell--white' : ''}`;
  if (title) {
    const heading = document.createElement('h1');
    heading.textContent = title;
    root.append(heading);
  }
  if (description) {
    const copy = document.createElement('p');
    copy.textContent = description;
    root.append(copy);
  }
  return root;
}

export function note(root, content) {
  const element = document.createElement('p');
  element.className = 'story-note';
  element.textContent = content;
  root.append(element);
}

export function setSelected(tablist, selected) {
  [...tablist.querySelectorAll('[role="tab"]')].forEach((tab, index) => {
    const active = index === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    tab.onclick = () => setSelected(tablist, index);
  });
}

export function livePage({section = 'top', product = 0, team = 0} = {}) {
  const iframe = document.createElement('iframe');
  iframe.className = 'story-iframe';
  iframe.title = 'Живая локальная страница Пассворка';
  iframe.srcdoc = pageHtml.replace(/(src|href)="\/(?!\/)/g, '$1="/site/');
  iframe.addEventListener('load', () => {
    const inner = iframe.contentDocument;
    inner?.querySelector(`[data-product="${product}"]`)?.click();
    inner?.querySelector(`[data-team="${team}"]`)?.click();
    inner?.getElementById(section)?.scrollIntoView({behavior: 'instant', block: 'start'});
  }, {once: true});
  return iframe;
}
