# TalkyHub Docs Site

Движок документации TalkyHub на **Docusaurus**. При сборке (CI) клонирует
контент из [`talkyhub-docs`](https://github.com/talkyhub/talkyhub-docs),
подставляет `docs/`/`i18n/`, собирает статический сайт и **деплоит на собственный
сервер** (тот же хост, что и API) — не на GitHub Pages.

> Справочник API (OpenAPI) сейчас **не включён** — документация API временно
> убрана из сайта.

Прод: **https://docs.talkyhub.ru**

Стиль (палитра, шрифты, логотип, шапка/подвал) повторяет лендинг
`talkyhub-web-landing`.

## Локальная разработка

```bash
npm install
npm start          # дев-сервер
npm run build      # прод-сборка (в build/)
```

Папка `docs/` в этом репозитории — **локальный фолбэк** (копия контента), чтобы
сайт собирался офлайн. В CI она заменяется содержимым из `talkyhub-docs`.
`i18n/` — артефакт сборки.

## Архитектура

Два репозитория работают вместе:

1. `talkyhub-docs` — источник истины для Markdown-контента и
   `registry/links.json`.
2. `talkyhub-docs-site` (этот репозиторий) — движок и тема Docusaurus + артефакты
   деплоя (`Dockerfile`, `docker-compose.yml`, `deploy/`).

## Деплой (self-hosted, как API)

Статический сайт запекается в nginx-образ и запускается контейнером за
хост-nginx — так же, как лендинг/приложение/API.

Workflow `.github/workflows/deploy.yml`:
1. клонирует `talkyhub-docs`, подставляет `docs/`/`i18n/`;
2. `npm ci && npm run build` → `build/`;
3. собирает образ (`Dockerfile`: nginx + `build/`), пушит в GHCR
   (`ghcr.io/talkyhub/talkyhub-docs-site`, тег = id прогона + `:latest`);
4. по SSH: `scp docker-compose.yml` → `docker compose pull && up -d` на сервере.

Контейнер слушает `127.0.0.1:${DOCS_PORT:-8083}`; хост-nginx
(`deploy/nginx/docs.talkyhub.ru.conf`) терминирует TLS для `docs.talkyhub.ru` и
проксирует на него. Откат — повторный деплой более старого тега (`IMAGE_TAG`).

Триггеры:
- push в `production`
- `repository_dispatch` типа `docs-update` (его шлёт `talkyhub-docs` при пуше в `production`)
- ручной запуск (`workflow_dispatch`)

## Настройка (на стороне сервера/репозитория)

GitHub → Settings → Environments → **production**:
- Секрет `SSH_KEY` — приватный ключ, чей публичный лежит в `~/.ssh/authorized_keys` на сервере
- Переменные `SSH_HOST`, `SSH_USER`, опц. `SSH_PORT` (22), `DOCS_DEPLOY_PATH` (`/opt/talkyhub-docs-site`)
- Опц. секреты DocSearch: `DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`

`talkyhub-docs` — публичный, поэтому токен для клона контента не нужен.

На сервере:
- установить `deploy/nginx/docs.talkyhub.ru.conf` в `/etc/nginx/sites-available/`,
  симлинк в `sites-enabled/`, `nginx -t && systemctl reload nginx`;
- `*.talkyhub.ru` wildcard-сертификат уже покрывает `docs.talkyhub.ru`.

## DNS

- Тип `A`/`AAAA`: `docs` → IP сервера (тот же, что `api`/`app`).
