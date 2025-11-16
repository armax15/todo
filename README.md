# Task Manager - SaaS приложение для управления задачами

Современное веб-приложение для управления личными задачами с разделением на frontend и backend.

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
- **Language:** Go 1.21+
- **Router:** gorilla/mux
- **CORS:** rs/cors middleware
- **Database:** In-Memory (для разработки)
- **API Base URL:** http://localhost:8080/api (dev)

## 📦 Установка

1. Клонируйте репозиторий
```bash
git clone <repository-url>
cd task-manager-saas
```

### Backend Setup

2. Перейдите в папку backend и установите зависимости Go
```bash
cd backend
go mod download
```

3. Создайте файл `.env` (опционально)
```bash
cp .env.example .env
# Отредактируйте PORT при необходимости (по умолчанию 8080)
```

### Frontend Setup

4. Перейдите в папку frontend и установите зависимости
```bash
cd ../frontend
npm install
```

5. Создайте файл `.env.local`
```bash
cp .env.example .env.local
```

6. Заполните переменные окружения в `.env.local`:
   - `NEXTAUTH_SECRET` - секретный ключ для NextAuth (сгенерируйте с помощью `openssl rand -base64 32`)
   - `GOOGLE_CLIENT_ID` и `GOOGLE_CLIENT_SECRET` - учетные данные Google OAuth
   - `NEXT_PUBLIC_API_URL` - URL вашего Go backend API (по умолчанию http://localhost:8080/api)

## 🛠 Разработка

### Запуск Backend

В папке `backend`:
```bash
go run main.go
```

Backend будет доступен на [http://localhost:8080](http://localhost:8080)
- Health check: `http://localhost:8080/health`
- API endpoints: `http://localhost:8080/api/tasks`

### Запуск Frontend

В папке `frontend`:
```bash
npm run dev
```

Frontend будет доступен на [http://localhost:3000](http://localhost:3000)

## 📝 Доступные скрипты

### Frontend (в папке `frontend/`)
- `npm run dev` - запуск сервера разработки
- `npm run build` - сборка для продакшена
- `npm run start` - запуск продакшен-сервера
- `npm run lint` - проверка кода с помощью ESLint
- `npm run type-check` - проверка типов TypeScript

### Backend (в папке `backend/`)
- `go run main.go` - запуск сервера разработки
- `go build` - сборка исполняемого файла
- `go test ./...` - запуск тестов

## 🏗 Структура проекта

```
task-manager-saas/
├── frontend/                 # Next.js Frontend
│   ├── app/                 # Next.js App Router
│   │   ├── (marketing)/    # Публичные страницы
│   │   ├── (auth)/         # Авторизация
│   │   ├── (app)/          # Приложение
│   │   └── api/            # API routes
│   ├── components/         # React компоненты
│   │   ├── ui/            # UI компоненты (shadcn/ui)
│   │   ├── marketing/     # Маркетинговые компоненты
│   │   ├── app/           # Компоненты приложения
│   │   └── auth/          # Компоненты авторизации
│   ├── lib/               # Утилиты
│   │   ├── api.ts        # API клиент
│   │   ├── auth.ts       # NextAuth конфигурация
│   │   ├── utils.ts      # Вспомогательные функции
│   │   └── store.ts      # Zustand store
│   ├── types/            # TypeScript типы
│   └── content/          # Контент (Markdown)
│
├── backend/              # Go Backend API
│   ├── main.go          # Точка входа
│   ├── handlers/        # HTTP обработчики
│   │   └── tasks.go    # Task endpoints
│   ├── models/         # Модели данных
│   │   └── task.go    # Task model
│   ├── db/            # Database layer
│   │   └── database.go # In-memory DB
│   ├── middleware/    # Middleware
│   │   └── cors.go   # CORS middleware
│   └── go.mod        # Go dependencies
│
└── README.md         # Этот файл
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

## 📚 API Endpoints

Backend предоставляет следующие REST API endpoints:

### Tasks
- `GET /api/tasks` - получить все задачи
- `GET /api/tasks/:id` - получить задачу по ID
- `POST /api/tasks` - создать новую задачу
- `PUT /api/tasks/:id` - обновить задачу
- `DELETE /api/tasks/:id` - удалить задачу

### Health
- `GET /health` - проверка состояния сервера

API клиент находится в `frontend/lib/api.ts` и включает функции для работы с задачами.
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
