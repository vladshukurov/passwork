import {shell, livePage} from './site-template.js';

const families = [
  ['React-кнопка', 'default / dark / outline, disabled, фон', 'react/src/Button.jsx'],
  ['React-хедер', 'Hero / продукт / белая страница, скрытие при скролле', 'react/src/App.jsx · react/src/header-surface.css'],
  ['React-футер', 'Продуктовые и ресурсные ссылки, CTA, юридические ссылки', 'react/src/App.jsx · dist/site-footer.css'],
  ['React-вкладки и вводный блок', 'Выбор вкладки, ширина, заголовок, описание, знак происхождения', 'react/src/App.jsx'],
  ['Основы', 'Цвет, шрифт, интервалы, радиусы', 'dist/passwork-tokens.css'],
  ['Кнопки', 'Основная, тёмная, контурная, компактная, состояния', 'dist/attio-buttons.css'],
  ['Шапка', 'Тёмный/светлый фон, меню, CTA', 'scripts/build-passwork.py · dist/hero-scroll.css'],
  ['Вкладки', 'Возможности продукта и команды', 'scripts/build-passwork.py · dist/passwork.js'],
  ['Клиенты', 'Сетка логотипов и смена пары', 'dist/client-logos.css · dist/client-logos.js'],
  ['Вводный блок', 'Общий двухколоночный шаблон', 'dist/passwork.css · .section-intro'],
  ['Сертификация', 'Четыре карточки с разными SVG', 'scripts/build-passwork.py · dist/page-motion.js'],
  ['Команды', 'Пять сценариев и подпись на синей сцене', 'dist/team-dashboards.js'],
  ['Безопасность', 'Три истории и три визуальные панели', 'dist/security-switcher.js'],
  ['Диалог', 'Контактная форма и локальные состояния', 'dist/passwork.js'],
];

const meta = {
  title: 'Обзор/Карта компонентов',
  parameters: {docs: {description: {component: 'Инвентаризация React-компонентов и унаследованной статической версии. Раздел React монтирует реальные компоненты; старые истории читают HTML и CSS из dist.'}}},
};
export default meta;

export const Inventory = {
  render: () => {
    const root = shell({title: 'Компонентная карта', description: 'React-компоненты и унаследованные HTML-семейства показаны отдельно. Демонстрационные экраны — вложенные мини-приложения, а не десятки новых кнопок сайта.'});
    const table = document.createElement('table');
    table.style.cssText = 'border-collapse:collapse;width:min(100%,1100px);background:white';
    table.innerHTML = '<thead><tr><th>Семейство</th><th>Варианты и состояния</th><th>Источник</th></tr></thead>' +
      `<tbody>${families.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>`;
    table.querySelectorAll('td,th').forEach(cell => { cell.style.cssText = 'padding:14px;border:1px solid #e4e7ec;text-align:left;vertical-align:top'; });
    root.append(table);
    const findings = document.createElement('div');
    findings.style.cssText = 'max-width:1100px;margin-top:28px;line-height:1.65';
    findings.innerHTML = '<h2 style="font-size:22px;margin:0 0 12px">Что проверить на лишнее</h2><ul><li><code>.button-small</code> есть в CSS, но не применяется в актуальной разметке.</li><li><code>.eyebrow</code> и разделители бренда/навигации остались как стили после удаления соответствующих элементов.</li><li><code>.certification-intro</code> выглядит как прежний специализированный класс: текущая секция использует общий <code>.section-intro</code>.</li><li>Шапка и Hero используют свои варианты кнопок поверх общей <code>.button</code>; стоит свести геометрию и палитры к явным токенам.</li></ul><p>Это кандидаты на очистку, не автоматическое удаление: перед рефакторингом проверить динамическую разметку и мобильные состояния.</p>';
    root.append(findings);
    return root;
  },
};

export const WholePage = {
  args: {section: 'top', product: 0, team: 0},
  argTypes: {
    section: {control: 'select', options: ['top', 'certification', 'teams', 'team-panel', 'security'], description: 'Якорь прокрутки в живой странице'},
    product: {control: {type: 'number', min: 0, max: 3, step: 1}, description: 'Вкладка Hero, 0–3'},
    team: {control: {type: 'number', min: 0, max: 4, step: 1}, description: 'Команда, 0–4'},
  },
  render: args => {
    const root = shell({title: 'Сайт целиком', description: 'Реальная сборка внутри Storybook: проверяйте композицию, скролл и анимации в контексте.'});
    root.append(livePage(args));
    return root;
  },
};
