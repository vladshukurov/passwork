# Дизайн-основа Пассворка

## Источник токенов

`src/styles/passwork-tokens.css` — общие токены сайта.
`src/styles/tokens.css` задаёт размер текста React-кнопки. Новое оформление берёт цвет, шрифт, типографический масштаб, расстояния,
радиусы, тени и длительности из переменных `--pw-*`. Разовые значения допустимы
для геометрии конкретной иллюстрации, но не для повторяемых элементов интерфейса.
Разметка живёт только в React-компонентах `src/sections` и `src/components`;
генерируемых HTML-файлов больше нет.

## Токены Figma

`src/styles/ds-tokens.css` (подключается из `passwork-tokens.css`) повторяет
переменные файла Figma `cJNZoxguk02Zbmg4X320R8` под теми же именами:
`группа/имя` → `--группа-имя`. Слой аддитивный: каждый токен равен значению,
которое сайт рисует сейчас, чаще всего через ссылку на `--pw-*`/`--s-*`, поэтому
старые имена продолжают работать. Режимы Figma 1920/1440 соответствуют крайним
точкам `clamp()` между этими ширинами. Коллекции `product/*` (макеты интерфейса)
и `Primitives` не переносим.

| Figma | CSS | Сейчас на сайте |
| --- | --- | --- |
| Color `text/primary`, `text/secondary`, `text/tertiary` | `--color-text-primary`, `-secondary`, `-tertiary` | `--pw-text`, `--pw-text-secondary`, `--pw-text-muted` |
| Color `surface/default`, `surface/page`, `surface/subtle` | `--color-surface-default`, `-page`, `-subtle` | `--pw-surface`, `--pw-page`, `--pw-surface-muted` |
| Color `border/default`, `border/focus` | `--color-border-default`, `--color-border-focus` | `--pw-border`, `--pw-focus` |
| Color `accent/default` | `--color-accent-default` | `--pw-accent` |
| Color `illustration/iso/*` | `--color-illustration-iso-line`, `-front`, `-face`, `-face-hover` | `--pw-art-*` |
| Color `button/{default,dark,ghost,disabled}/*` | `--color-button-default-bg`, `-bg-hover`, `-bg-pressed`, `-fg` и т. д. | значения из `figma-2026.css` |
| Layout `section/padding-top`, `padding-bottom`, `inset` | `--space-section-top`, `-bottom`, `-inset` | `--s-section-top`, `--s-section-bottom`, `--s-inset` |
| Layout `section/intro-gap`, `heading-gap` | `--space-section-intro-gap`, `--space-section-heading-gap` | 28 px, 20 px |
| Layout `card/padding`, `padding-lg`, `gap` | `--space-card`, `--space-card-lg`, `--space-card-gap` | `--s-card`, `--s-card-lg`, 8 px |
| Layout `page/grid-width` | `--page-grid-width` | `--content` (1524 px) |
| Layout `radius/*` | `--radius-control` (10), `-control-sm` (8), `-window`, `-card`, `-dialog`, `-pill` | `--pw-radius-*` |
| Layout `button/height/{s,m,l}`, `button/padding-x/*`, `button/gap` | `--button-height-s` (36), `-m` (42), `-l` (48), `--button-padding-x-*`, `--button-gap` | `--pw-button-height`, `--pw-button-padding` |
| Typography `Display`, `Heading 1`, `Heading 3`, `Title`, `Body L`, `Body`, `Body S`, `Label L`, `Label`, `Caption L`, `Caption`, `Small` | `--type-display-size/-leading`, `--type-h1-*`, `--type-h3-*`, `--type-title-*`, `--type-body-l-*`, `--type-body-*`, `--type-body-s-*`, `--type-label-l-*`, `--type-label-*`, `--type-caption-l-*`, `--type-caption-*`, `--type-small-*` | `--pw-heading-size`, `--pw-lead-size` и фиксированные размеры |

Тёмный режим коллекции Color — область `[data-theme="dark"]` или `.theme-dark`:
она переопределяет `--color-*` значениями режима Dark. Существующие тёмные полосы
(доверие, тарифы, подвал) пока оформлены собственными правилами; новые блоки на
тёмной поверхности берут цвета из этой области. Там, где Figma расходится с сайтом
(например, `section/padding-top` = 152 px на 1920 при 120 px на сайте), токен
хранит значение сайта, а комментарий в `ds-tokens.css` — значение Figma.

## Типографика

Основной шрифт — Museo Sans Cyrl 500. `Inter` сохраняется только в наследованной
демонстрации интерфейса, где он часть самого макета продукта; в новых React-компонентах
его не используем.

| Роль | Токен | Применение |
| --- | --- | --- |
| Заголовок секции | `--pw-heading-size` | Стандартный h2 сайта |
| Основной текст | `--pw-type-body` | Описания |
| Основной UI-текст | `--pw-button-font-size` | Текст кнопки |

Размеры зависят от роли, а не от HTML-тега. Внутри компонента разрешены локальные
адаптивные поправки, если токен в узком контейнере не помещается.

## Компоненты и состояния

Вводные блоки ФСТЭК, менеджера секретов и безопасности используют один
`SectionIntro` и одну сетку `.section-intro`. На десктопе внутренние отступы:
152 px сверху и 56 px по бокам и снизу; две колонки и межколоночный зазор
задаются общим правилом. На ширине до 1100 px боковой отступ — 40 px, до
800 px блок становится одноколоночным с отступом 28 px, до 480 px — 24 px.
Отдельные секции могут менять текст или иллюстрации, но не позиции заголовка
и описания.

`src/components/Button.jsx` — единый React CTA с вариантами `default`, `dark`,
`ghost` (класс `.button-ghost`, тихая кнопка на тёмной поверхности, например в
тарифах) и `outline`. Геометрия и hover, active, focus и disabled определяются
общим `src/styles/attio-buttons.css`, цвета вариантов — `src/styles/figma-2026.css`
через токены `--color-button-*`. Новые компоненты не создают ещё один базовый стиль
кнопки. Пункт «Цены» ведёт к секции тарифов; её шкала считает стоимость для
1–100 сотрудников, а команды больше 100 получают вариант «По запросу».

## Граница миграции

React-страница пока использует старые слои CSS и JS для точного сохранения сложных
иллюстраций и анимаций. Их нельзя одномоментно переименовать без визуальных
регрессий. При переносе очередной секции в React её стили нужно переводить на
эти токены и проверять десктоп, мобильную ширину, hover/focus и reduced motion.
Хедер React-версии имеет отдельный слой `src/styles/header-surface.css`: на синем
продуктовом экране он остаётся единой синей поверхностью без белого прямоугольного
выреза, а скрытие при прокрутке происходит сдвигом, без полупрозрачного наложения
на интерфейс. Статическая версия использует прежний эффект.

Локальный Storybook разделяет реальные React-компоненты с управляемыми параметрами
и унаследованные HTML-истории. Это помогает обнаруживать дублирующие стили,
не выдавая старую DOM-разметку за новую компонентную библиотеку.

## Поверхности и иллюстрации

Вариант `?frame=rounded` сохраняет непрерывную внешнюю серую направляющую,
но разделяет соседние поверхности зазором `--frame-rule` и скругляет только
сами поверхности на `--frame-radius`. Пустые `.section-divider` — тоже
поверхности этого ритма; их нельзя скрывать только потому, что у них нет
контента. Обычный вариант страницы остаётся с плоскими разделителями.

Изометрические рисунки ФСТЭК и «Менеджера секретов» используют один язык:
светлая заливка `#F7F7F8`, контур `#ADB1B7`, тонкая линия с круглыми концами,
центрированная композиция над текстом. Смысл рисунков секретов различается:
хранилище ключей, цепочка CI/CD, слои конфигурации и контур прав доступа.
Растровую текстуру, тень или отдельную hover-анимацию для этих рисунков не добавляем.
