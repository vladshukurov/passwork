import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
for (const file of ['.storybook/main.js', '.storybook/preview.js', 'stories/Overview.stories.js',
  'stories/Foundations.stories.js', 'stories/Buttons.stories.js', 'stories/Navigation.stories.js',
  'stories/ReactComponents.stories.js', 'stories/react-host.js']) {
  const url = new URL(file, root);
  assert.ok(existsSync(url), `Missing Storybook file: ${file}`);
  assert.ok(readFileSync(url, 'utf8').trim(), `Empty Storybook file: ${file}`);
}

const reactStories = readFileSync(new URL('stories/ReactComponents.stories.js', root), 'utf8');
for (const component of ['Button', 'Header', 'Footer', 'ProductTabs', 'TeamTabs', 'SectionIntro', 'SecurityStory']) {
  assert.match(reactStories, new RegExp(`\\b${component}\\b`), `Missing React story: ${component}`);
}

console.log('Storybook configuration, legacy catalog and live React stories OK');
