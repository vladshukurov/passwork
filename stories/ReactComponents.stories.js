import React from 'react';
import Button from '../react/src/Button.jsx';
import { Header, Footer, ProductTabs, TeamTabs, SectionIntro, SecurityStory, Pricing, Secrets, Trust } from '../react/src/App.jsx';
import { reactStory } from './react-host.js';

const h = React.createElement;

export default {
  title: 'React/Компоненты',
  parameters: { docs: { description: { component: 'Живые компоненты React-версии. Здесь показана реальная реализация, а не копии HTML.' } } },
};

export const ButtonPlayground = {
  name: 'Кнопка · параметры',
  args: { label: 'Запросить демо', variant: 'dark', disabled: false, onBlue: false },
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['default', 'dark', 'outline'] },
    disabled: { control: 'boolean' },
    onBlue: { control: 'boolean' },
  },
  render: args => reactStory(h('div', { className: `react-story-stage${args.onBlue ? ' react-story-stage--blue' : ''}` },
    h(Button, { variant: args.variant, disabled: args.disabled, dialog: null }, args.label))),
};

export const HeaderStates = {
  name: 'Хедер · фон и скролл',
  args: { surface: 'hero', hidden: false },
  argTypes: {
    surface: { control: 'select', options: ['hero', 'product', 'page', 'dark'] },
    hidden: { control: 'boolean' },
  },
  render: args => {
    const states = ['is-scroll-header'];
    if (args.surface === 'product') states.push('is-over-product', 'is-over-product-window');
    if (args.surface === 'page') states.push('is-past-hero');
    if (args.surface === 'dark') states.push('is-past-hero', 'is-over-dark-section');
    if (args.hidden) states.push('is-header-hidden');
    return reactStory(h('div', { className: `react-header-stage react-header-stage--${args.surface}` },
      h(Header, { className: states.join(' ') })));
  },
};

export const PricingPreview = {
  name: 'Тарифы · секция',
  render: () => reactStory(h(Pricing)),
};

export const SecretsPreview = {
  name: 'Менеджер секретов · секция',
  render: () => reactStory(h(Secrets)),
};

export const TrustPreview = {
  name: 'Доверие · секция',
  render: () => reactStory(h(Trust)),
};

export const FooterPreview = {
  name: 'Футер',
  render: () => reactStory(h(Footer)),
};

export const ProductTabsPlayground = {
  name: 'Вкладки продукта · параметры',
  args: { selected: 0, width: 1040 },
  argTypes: {
    selected: { control: { type: 'range', min: 0, max: 3, step: 1 } },
    width: { control: { type: 'range', min: 320, max: 1200, step: 20 } },
  },
  render: args => reactStory(h('div', { className: 'react-tabs-stage react-tabs-stage--blue' },
    h('div', { className: 'hero', style: { width: `min(100%, ${args.width}px)`, padding: 0, minHeight: 100 } },
      h(ProductTabs, { selected: args.selected })))),
};

export const TeamTabsPlayground = {
  name: 'Вкладки команд · параметры',
  args: { selected: 0, width: 1040 },
  argTypes: {
    selected: { control: { type: 'range', min: 0, max: 4, step: 1 } },
    width: { control: { type: 'range', min: 320, max: 1200, step: 20 } },
  },
  render: args => reactStory(h('div', { className: 'react-tabs-stage' },
    h('div', { style: { width: `min(100%, ${args.width}px)` } }, h(TeamTabs, { selected: args.selected })))),
};

export const SectionIntroPlayground = {
  name: 'Вводный блок · параметры',
  args: { title: 'Российское решение для корпоративной безопасности', description: 'Управляйте корпоративными паролями и доступом сотрудников в единой системе.', origin: false },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    origin: { control: 'boolean' },
  },
  render: args => reactStory(h('div', { className: 'react-intro-stage' },
    h(SectionIntro, { headingId: 'story-intro', ...args }))),
};

export const SecurityStoryPlayground = {
  name: 'Пункт безопасности · параметры',
  args: { title: 'ГОСТ-шифрование', description: 'Данные остаются на серверах вашей компании.', active: true },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    active: { control: 'boolean' },
  },
  render: args => reactStory(h('div', { className: 'react-security-stage' },
    h('div', { className: 'security-story-list' }, h(SecurityStory, { index: 0, ...args })))),
};
