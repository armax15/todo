# Task Manager - SaaS приложение для управления задачами

Современное веб-приложение для управления личными задачами, созданное с использованием Next.js 14, TypeScript, Tailwind CSS и NextAuth.js.

## 🚀 Технологический стек

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **UI Components:** shadcn/ui
- **HTTP Client:** @tanstack/react-query
- **Blog:** react-markdown
- **Icons:** lucide-react

### Backend
- **API:** Go REST API (отдельный сервер)
- **Database:** PostgreSQL
- **API Base URL:** http://localhost:8080/api (dev)

## 📦 Установка

1. Клонируйте репозиторий
```bash
git clone <repository-url>
cd task-manager-saas
```

2. Установите зависимости
```bash
npm install
```

3. Создайте файл `.env.local` на основе `.env.example`
```bash
cp .env.example .env.local
```

4. Заполните переменные окружения в `.env.local`:
   - `NEXTAUTH_SECRET` - секретный ключ для NextAuth (сгенерируйте с помощью `openssl rand -base64 32`)
   - `GOOGLE_CLIENT_ID` и `GOOGLE_CLIENT_SECRET` - учетные данные Google OAuth
   - `NEXT_PUBLIC_API_URL` - URL вашего Go backend API

## 🛠 Разработка

Запустите сервер разработки:

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📝 Доступные скрипты

- `npm run dev` - запуск сервера разработки
- `npm run build` - сборка для продакшена
- `npm run start` - запуск продакшен-сервера
- `npm run lint` - проверка кода с помощью ESLint
- `npm run type-check` - проверка типов TypeScript

## 🏗 Структура проекта

```
task-manager-frontend/
├── app/                      # Next.js App Router
│   ├── (marketing)/         # Публичные страницы
│   │   ├── page.tsx        # Лендинг
│   │   ├── pricing/        # Тарифы
│   │   └── blog/           # Блог
│   ├── (auth)/             # Авторизация
│   │   ├── login/
│   │   └── register/
│   ├── (app)/              # Приложение
│   │   ├── dashboard/
│   │   ├── tasks/
│   │   └── settings/
│   └── api/                # API routes
├── components/             # React компоненты
│   ├── ui/                # UI компоненты (shadcn/ui)
│   ├── marketing/         # Маркетинговые компоненты
│   ├── app/               # Компоненты приложения
│   └── auth/              # Компоненты авторизации
├── lib/                   # Утилиты
│   ├── api.ts            # API клиент
│   ├── auth.ts           # NextAuth конфигурация
│   ├── utils.ts          # Вспомогательные функции
│   ├── validations.ts    # Zod схемы
│   └── store.ts          # Zustand store
├── types/                # TypeScript типы
├── content/              # Контент (Markdown файлы)
│   └── blog/
└── public/               # Статические файлы
```

## 🔐 Авторизация

Приложение поддерживает:
- Email Magic Link (passwordless)
- Google OAuth

Дополнительные провайдеры можно легко добавить в `lib/auth.ts`.

## 🎨 UI компоненты

Используются компоненты в стиле shadcn/ui:
- Button, Input, Card, Dialog
- Checkbox, Badge, Dropdown Menu
- Form components

Все компоненты настраиваются через Tailwind CSS.

## 📄 Блог

Статьи блога создаются как Markdown файлы в папке `content/blog/`.

Формат frontmatter:
```markdown
---
title: Заголовок статьи
date: 2024-01-15
description: Описание статьи
author: Автор
tags: [tag1, tag2]
---

Содержание статьи...
```

## 🚀 Деплой

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Деплой произойдет автоматически

### Другие платформы

Приложение можно развернуть на любой платформе, поддерживающей Node.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean

## 📚 API интеграция

API клиент находится в `lib/api.ts` и включает функции для:
- Получения списка задач
- Создания задачи
- Обновления задачи
- Удаления задачи
- Переключения статуса задачи

Все запросы автоматически включают JWT токен из NextAuth сессии.

## 🤝 Вклад

Если вы хотите внести вклад в проект:
1. Форкните репозиторий
2. Создайте ветку для вашей функции
3. Сделайте коммит изменений
4. Создайте Pull Request

## 📝 Лицензия

MIT

## 👥 Команда

Task Manager Team
