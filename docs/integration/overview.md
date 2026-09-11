---
title: Обзор API
sidebar_label: Обзор
sidebar_position: 1
---

# Обзор API

TalkyHub предоставляет HTTP‑API для управления рабочими пространствами,
каналами, диалогами, сообщениями и контактами.

## Базовый адрес

```
https://api.talkyhub.ru
```

## Аутентификация

API использует JWT: передавайте токен в заголовке `Authorization`.

```bash
curl https://api.talkyhub.ru/api/v1/workspaces \
  -H "Authorization: Bearer <ваш_токен>"
```

Токен выдаётся после входа (email OTP + код устройства). Большинство методов
работают в контексте рабочего пространства, идентификатор которого передаётся в
пути: `/api/v1/workspaces/{workspaceId}/...`.

## Формат

- Запросы и ответы — `application/json`.
- Списки используют keyset‑пагинацию (по убыванию даты создания).
- Ошибки возвращаются в формате Problem Details (RFC 7807) с полем `detail`.

## Что дальше

- [Вебхуки](./webhooks.md)
