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

У вас есть несколько вариантов деплоя приложения в зависимости от ваших требований и инфраструктуры.

### 📋 Подготовка к деплою

Перед деплоем убедитесь, что у вас настроены:

1. Переменные окружения (скопируйте `.env.production.example` в `.env.production`)
2. Google OAuth credentials (если используете Google авторизацию)
3. Backend API (Go сервер должен быть доступен)
4. База данных PostgreSQL

### 🎯 Вариант 1: Vercel (рекомендуется для фронтенда)

**Преимущества:** Самый простой способ, автоматический CI/CD, глобальный CDN

**Шаги:**

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Залогиньтесь и задеплойте:
```bash
vercel
```

3. Настройте переменные окружения в Vercel Dashboard:
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXT_PUBLIC_API_URL`

4. Для production деплоя:
```bash
vercel --prod
```

**Альтернатива через GitHub:**
1. Подключите репозиторий к [Vercel](https://vercel.com)
2. Настройте переменные окружения в настройках проекта
3. Деплой произойдет автоматически при push в main

### 🐳 Вариант 2: Docker (универсальный)

**Преимущества:** Полный контроль, работает везде, легко масштабируется

#### Локальная сборка и запуск:

```bash
# Сборка образа
docker build -t task-manager-frontend .

# Запуск контейнера
docker run -p 3000:3000 \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXTAUTH_SECRET=your-secret \
  -e NEXT_PUBLIC_API_URL=http://localhost:8080/api \
  task-manager-frontend
```

#### Docker Compose (полный стек):

```bash
# Создайте .env файл с переменными окружения
cp .env.production.example .env.production

# Запустите все сервисы (frontend + backend + db + nginx)
docker compose up -d

# Просмотр логов
docker compose logs -f

# Остановка
docker compose down
```

### 🖥️ Вариант 3: VPS (Digital Ocean, AWS, Hetzner и т.д.)

**Преимущества:** Полный контроль, возможность размещения всего стека

#### Шаг 1: Настройка VPS

Запустите скрипт настройки на вашем сервере (требуется root):

```bash
# На локальной машине
scp scripts/setup-vps.sh root@your-server.com:/tmp/
ssh root@your-server.com 'bash /tmp/setup-vps.sh'
```

Или напрямую:

```bash
ssh root@your-server.com 'bash <(curl -s https://raw.githubusercontent.com/your-repo/main/scripts/setup-vps.sh)'
```

#### Шаг 2: Деплой приложения

```bash
# Настройте переменные окружения
export VPS_HOST=your-server.com
export VPS_USER=deploy
export APP_DIR=/app/task-manager

# Запустите деплой
./scripts/deploy-vps.sh
```

#### Шаг 3: Настройка SSL с Let's Encrypt

```bash
ssh $VPS_USER@$VPS_HOST
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 🚂 Вариант 4: Railway

**Преимущества:** Простой PaaS, автоматические деплои, бесплатный тариф

**Шаги:**

1. Создайте аккаунт на [Railway](https://railway.app)
2. Создайте новый проект из GitHub репозитория
3. Railway автоматически обнаружит `railway.json` и настроит деплой
4. Добавьте переменные окружения в настройках проекта
5. Деплой произойдет автоматически

**Через Railway CLI:**

```bash
# Установка
npm i -g @railway/cli

# Логин
railway login

# Инициализация проекта
railway init

# Деплой
railway up
```

### 🎨 Вариант 5: Render

**Преимущества:** Простой PaaS с бесплатным тариифом, автоматические деплои

**Шаги:**

1. Создайте аккаунт на [Render](https://render.com)
2. Создайте новый Web Service из GitHub репозитория
3. Render автоматически обнаружит `render.yaml`
4. Или настройте вручную:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
5. Добавьте переменные окружения

### 🔄 CI/CD с GitHub Actions

Проект включает готовый workflow для автоматического деплоя.

**Настройка GitHub Secrets:**

Перейдите в Settings → Secrets and variables → Actions и добавьте:

Для VPS деплоя:
- `VPS_HOST` - IP или домен вашего сервера
- `VPS_USERNAME` - пользователь для SSH
- `VPS_SSH_KEY` - приватный SSH ключ

Для Vercel деплоя:
- `VERCEL_TOKEN` - токен из Vercel dashboard
- `VERCEL_ORG_ID` - ID организации
- `VERCEL_PROJECT_ID` - ID проекта

**Автоматический деплой:**

После настройки secrets, деплой будет происходить автоматически при push в `main` ветку.

### 📊 Сравнение вариантов

| Вариант | Сложность | Стоимость | Контроль | Масштабируемость |
|---------|-----------|-----------|----------|------------------|
| Vercel | ⭐ Легко | Бесплатно / $20+ | Низкий | ⭐⭐⭐ |
| Railway | ⭐⭐ Легко | Бесплатно / $5+ | Средний | ⭐⭐ |
| Render | ⭐⭐ Легко | Бесплатно / $7+ | Средний | ⭐⭐ |
| Docker VPS | ⭐⭐⭐⭐ Сложно | $5-20/мес | Полный | ⭐⭐⭐⭐ |

### 🔧 Управление окружениями

**Development:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm run start
```

**Docker Production:**
```bash
docker compose -f docker-compose.yml up -d
```

### 📈 Мониторинг и логи

**Docker:**
```bash
docker compose logs -f frontend
```

**VPS:**
```bash
ssh $VPS_USER@$VPS_HOST 'cd /app/task-manager && docker compose logs -f'
```

**Vercel/Railway/Render:**
Используйте встроенные дашборды для просмотра логов и метрик.

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
