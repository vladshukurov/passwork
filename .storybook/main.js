const config = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-docs'],
  framework: {name: '@storybook/html-vite', options: {}},
  staticDirs: [
    {from: '../dist', to: '/site'},
    {from: '../dist/passwork-assets', to: '/passwork-assets'},
  ],
};

export default config;
