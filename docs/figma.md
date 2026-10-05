# Figma

Файл: **Passwork | Pragmatica**
(`https://www.figma.com/design/cJNZoxguk02Zbmg4X320R8/`).

## Страницы

| Страница | Что там |
| --- | --- |
| **Final** | финальный макет сайта на 1920, собран из компонентов UI kit |
| **UI Kit** | дизайн-система: токены, компоненты, блоки страницы, ассеты, экраны продукта |
| Макеты и UI kit · 29.09 | рабочая страница прошлой итерации; старый кит перенесён на «UI Kit» |
| Benchmark, Структура, Драфты, Архив… | история работы и референсы, для правок не нужны |

## Страница UI Kit

Разложена сверху вниз по разделам. Каждый раздел — это секция Figma с досками.

| Раздел | Доски |
| --- | --- |
| 00 · Обложка и как пользоваться | обложка, правила работы с китом |
| 01 · Основы | Color (Light и Dark рядом), Typography, Spacing / Layout tokens / Radius / Elevation |
| 02 · Компоненты | Actions (Button), Navigation (Nav link, Tab/Product, Tab/Team), Cards, Product UI, Snippets |
| 03 · Блоки страницы | Layout (Header, Footer), Page blocks: Hero copy, Section intro, About statement, Story item, Team caption, Feature chapter, Card/Review, Card/Case, Pricing/Team selector, Pricing plan, Platform feature copy, Section divider |
| 04 · Ассеты | Icons, Logos, Illustrations (компоненты), Illustration states (покой и hover каждой иллюстрации) |
| 05 · Продукт | Screens (экраны для демо), Web app и Mobile and extension (реальные скриншоты Пассворка 7.x) |

Каждый компонент лежит в карточке документации:
- название и тип (Component / Set);
- для чего он и в каком файле кода живёт;
- список свойств;
- сам мастер-компонент на подложке.

Кнопки, вкладки, карточки, иконки, логотипы, шапка и футер на странице Final — экземпляры
этих мастеров: правка мастера обновит макет.

Компоненты доски «Page blocks» (интро, тарифы, кейсы, отзывы и др.) собраны из фреймов
страницы Final. Сама Final пока использует исходные фреймы. Чтобы правки блоков
расходились по макету автоматически, замените эти фреймы экземплярами.

## Переменные

| Коллекция | Режимы | Что внутри |
| --- | --- | --- |
| Primitives | Value | палитра и шрифтовые переменные `font/*`; скрыта из публикации, напрямую не используется |
| Color | Light, Dark | семантические цвета `text/*`, `surface/*`, `border/*`, `button/*`, `illustration/*`, `product/*` |
| Typography | 1920, 1440 | размер, интерлиньяж и трекинг 15 ролей сайта |
| Layout | 1920, 1440 | отступы секций и карточек, ширина сетки, радиусы, размеры кнопок |

Как это использовать:
- **Тёмный блок.** Выберите фрейм секции → панель справа → Layer → режим коллекции
  Color = Dark.
- **Макет на 1440.** Переключите режимы Typography и Layout на фрейме макета.
- **Код.** Имена переменных совпадают с CSS: `text/primary` → `--color-text-primary`.
  Подробнее — в [design-system.md](design-system.md).

Текстовые стили: `Site/*` — роли сайта, `UI/*` — текст внутри макетов продукта, `Mono` —
код. Стили эффектов: `Elevation/1–4`, `Focus/Product field`, `Control/Range thumb`.

## Шрифт

Museo Sans Cyrl (300 / 500 / 700) — коммерческий шрифт Пассворка. Чтобы файл выглядел
правильно, установите его на компьютер. Файлы лежат в репозитории сайта:
`public/passwork-assets/MuseoSansCyrl-*.otf`. JetBrains Mono — бесплатный, ставится с
[jetbrains.com/mono](https://www.jetbrains.com/lp/mono/).

Семейство и начертание всех стилей задано переменными в коллекции Primitives:

| Переменная | Рабочее значение |
| --- | --- |
| `font/family/sans` | Museo Sans Cyrl |
| `font/family/ui` | Museo Sans Cyrl |
| `font/style/sans-regular` | 500 |
| `font/style/sans-medium` | 500 |
| `font/style/sans-bold` | 500 |
| `font/family/mono` | JetBrains Mono |

Если править файл скриптами через Figma MCP, на это время переключите эти переменные на
Inter (`Regular` / `Medium` / `Bold`): скрипты не умеют загружать Museo. Потом верните
значения из таблицы. Подробнее — в [ai.md](ai.md#требования-для-figma-mcp).

## Связь с кодом

| Figma | Код |
| --- | --- |
| Button (Variant × Size × State) | `src/components/Button.jsx`, `src/styles/attio-buttons.css` |
| Section intro | `src/components/SectionIntro.jsx` |
| Card/*, Pricing plan, Story item, Feature chapter… | разметка в `src/sections/*.jsx` |
| Illustration/* | `src/art/illustrations/*.svg` |
| Screen/*, UI/*, Snippet/* | демо-разметка в `src/dashboards/*` и `src/components/FeatureDetailPreview.jsx` |
| Переменные | `src/styles/ds-tokens.css` |

Если в Figma поменяли значение токена, перенесите его в `ds-tokens.css`: автоматической
синхронизации нет.
