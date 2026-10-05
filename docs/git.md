# Работа с Git

Репозиторий содержит весь сайт: код, картинки, шрифты, тесты и документацию. Ветка `main` —
это то, что опубликовано. Всё остальное создаётся из неё.

## Перенести репозиторий к себе

Выберите один способ.

**1. Передача на GitHub (проще всего).** Владелец текущего репозитория открывает
Settings → General → Danger Zone → Transfer ownership и указывает вашу организацию.
История, ветки и настройки переедут целиком.

**2. Зеркало в любой Git-хостинг** (GitHub, GitLab, Bitbucket, свой Gitea). Создайте у себя
пустой репозиторий без README и выполните:

```bash
git clone --mirror <адрес-исходного-репозитория> passwork.git
cd passwork.git
git push --mirror <адрес-вашего-репозитория>
```

После этого работайте с вашим адресом: `git clone <адрес-вашего-репозитория>`.

**3. Файлом, без доступа к хостингу.** Если репозиторий передан файлом `passwork.bundle`:

```bash
git clone passwork.bundle passwork
cd passwork
git remote set-url origin <адрес-вашего-репозитория>
git push -u origin main
```

## Запустить вручную

```bash
cd passwork
npm ci            # ставит зависимости ровно по package-lock.json
npm run dev       # http://127.0.0.1:8773
```

Нужен Node.js 22 (или 20.19+). Файлы `.env`, ключи и доступы не нужны.

## Как вносить изменения

```bash
git switch main
git pull                        # свежая версия
git switch -c fix/pricing-copy  # своя ветка под задачу
# …правки…
npm test && npm run build       # проверить, что ничего не сломалось
git add -A
git commit -m "Pricing: shorter plan descriptions"
git push -u origin fix/pricing-copy
```

Затем откройте Pull Request в `main`. GitHub Actions
(`.github/workflows/react-verify.yml`) сам запустит `npm ci`, `npm test`, `npm run build`
и `npm audit` на каждом PR и на каждом пуше в `main`. Если проверка красная, сливать
не стоит.

Договорённости, которых держался проект:
- одна задача — одна ветка и один PR;
- сообщение коммита — что изменилось для посетителя, с указанием блока:
  `Header: frosted glass instead of the fading veil`;
- не коммитить `node_modules/`, `dist/` и `.env` (они уже в `.gitignore`);
- картинки — в WebP и в размере показа, чтобы репозиторий не разрастался.

Полезное:

```bash
git log --oneline -20          # последние коммиты
git diff                       # что изменено и ещё не закоммичено
git restore <файл>             # отменить незакоммиченные правки в файле
git revert <коммит>            # безопасно отменить уже опубликованный коммит
```

## Деплой

Сайт — статика: `npm run build` собирает папку `dist/`, её и нужно публиковать.

**Vercel** (настройки уже лежат в `vercel.json`):
1. vercel.com → Add New → Project → импортируйте свой репозиторий.
2. Framework подхватится как Vite, сборка — `npm run build`, папка — `dist`. Ничего
   менять не нужно.
3. Каждый пуш в `main` публикует сайт. Каждый PR получает свою ссылку для просмотра.
4. Подключите домен в Settings → Domains.

**Любой другой хостинг** (Netlify, nginx, S3 + CDN, GitHub Pages): выполните
`npm ci && npm run build` и выложите содержимое `dist/`. Заголовок
`Content-Security-Policy` из `vercel.json` стоит перенести в настройки сервера.

**После переезда на свой домен** замените адрес в `index.html` в тегах `og:url`,
`og:image` и `twitter:image`. От этого зависят превью ссылок в мессенджерах.

## Что не входит в репозиторий

- `node_modules/` — ставится командой `npm ci`.
- `dist/` — собирается командой `npm run build`.
- Исходники дизайна — в Figma-файле (см. [figma.md](figma.md)).
