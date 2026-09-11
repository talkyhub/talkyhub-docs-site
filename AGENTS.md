# AGENTS — talkyhub-docs-site

This repository is the **Docusaurus engine** for TalkyHub docs. The Markdown
**content** lives in [`talkyhub-docs`](https://github.com/talkyhub/talkyhub-docs)
and is pulled in at build time. Published at https://docs.talkyhub.ru.

## Layout
- `docusaurus.config.ts`, `sidebars.ts` — site config (ru default + en,
  navbar/footer). `src/` — theme, brand components (violet TalkyHub mark +
  wordmark, mirroring the landing), homepage.
- `docs/` — **committed fallback** so the site builds offline; CI replaces it with
  content from `talkyhub-docs`. `i18n/` is a build artifact (git-ignored).
- `Dockerfile`, `docker-compose.yml`, `deploy/` — self-hosted deploy artifacts.

> **No API reference for now.** The OpenAPI docs (plugin/theme, `gen-api`, the
> `openapi/` spec, `docs/reference/`) were intentionally removed. Don't
> reintroduce them without an explicit request.

## Working rules
- Engine/theme/config changes go here; **doc prose lives in `talkyhub-docs`**,
  not here (edit the fallback only to keep local builds sane).
- Keep `onBrokenLinks: 'throw'` — always `npm run build` before committing.
- Don't reintroduce GitHub Pages (no `CNAME`, no `deploy-pages`). Deploy is
  self-hosted (see below).

## Deploy (self-hosted, mirrors the API/landing)
- `.github/workflows/deploy.yml`: clone content → build → bake `build/` into an
  nginx image → push to GHCR → SSH `docker compose pull && up -d` on the server.
- Container listens on `127.0.0.1:${DOCS_PORT:-8083}`; host nginx
  (`deploy/nginx/docs.talkyhub.ru.conf`, exact `server_name` so it beats the
  `*.talkyhub.ru` wildcard) terminates TLS and proxies to it.
- Triggers: push to `production`, `repository_dispatch` (`docs-update`) from the
  content repo, or manual. Image tag = run id (+ `:latest`); rollback = redeploy
  an older tag via `IMAGE_TAG`.

## Brand
- Tone: plain Russian, concrete. Matches the landing (`talkyhub-web-landing`).
- Product: TalkyHub — платформа для общения с клиентами (омниканальная
  поддержка). API base `https://api.talkyhub.ru`; site `https://talkyhub.ru`.

## Standard flow
1. Smallest valid change; `npm run build` (both locales) must pass.
2. Commit with a clear, scoped message; push to `production` to deploy.
