# Пассворк — сайт

[Открыть сайт](https://passwork-omega.vercel.app/) · [Репозиторий](https://github.com/vladshukurov/passwork)

Одностраничный сайт на React + Vite. Анимации — GSAP (из npm), живые демо интерфейса — TypeScript-движки в `src/dashboards`.

## Команды

```bash
npm install
npm run dev      # http://127.0.0.1:8773
npm run build    # сборка в dist/, её публикует Vercel
npm test         # юнит-тесты и проверка иллюстраций
npm run smoke    # поведенческий тест в браузере (нужен запущенный dev-сервер)
```

`npm run smoke` использует Chromium из Playwright (`npx playwright install chromium`)
или бинарник из `CHROMIUM_PATH`; адрес меняется через `SITE_URL`.

## Структура

```
index.html            точка входа
src/
  App.jsx             порядок секций и контроллеры уровня страницы
  sections/           секции страницы: Header, Hero, Certification, Teams, …
  components/         общие части: Button, SectionIntro, ContactDialog, IsoformArt, …
  hooks/              useController (подключение GSAP/движков), клавиатура вкладок
  lib/                чистые функции: типографика, шкала цен, навигация по якорям
  motion/             GSAP: токены движения, появление секций, hero, безопасность, иллюстрации
  dashboards/         живые демо: hero/ и teams/ (TypeScript + CSS)
  art/isoform/        SVG и редактируемые сцены изометрических иллюстраций
  styles/             токены и стили; порядок подключения — в src/main.jsx
public/passwork-assets/  картинки, шрифт, иконки — только то, что использует страница
scripts/              экспорт иллюстраций и тесты
docs/                 дизайн-система и правила движения
```

## Движение

Все длительности и кривые — общие токены: `src/motion/site-motion-tokens.js` для GSAP и
`--pw-motion-*` в `src/styles/passwork-tokens.css` для CSS. Правила — в [`docs/motion.md`](docs/motion.md).

## Иллюстрации (Isoform Studio)

Восемь изометрических сцен для блоков «Сертификация» и «Менеджер секретов» собираются
из геометрии [Isoform Studio](../Documents/ChatGPT/пока%20нет%20названия) — локального редактора
(`~/Documents/ChatGPT/пока нет названия`, пакет `isometric-atelier`).

- Сцены описаны кодом в `scripts/export-isoform.ts`: общий постамент 300×300, сетка 10,
  толщина плит 14, фиксированный масштаб — чтобы серия выглядела единой.
- Экспорт: `"<studio>/node_modules/.bin/tsx" scripts/export-isoform.ts "<studio>"`.
  Пишет `src/art/isoform/*.svg` (каждая грань помечена `data-face`) и `*.scene.json`,
  которые можно открыть в редакторе Studio.
- Цвета граней задаёт CSS (`src/styles/isoform-art.css`), позы hover — `src/motion/isoform-motion.js`.
  `npm test` проверяет, что все анимируемые объекты есть в SVG.

## Деплой

Vercel выполняет `npm run build` и публикует `dist/` (см. `vercel.json`).
