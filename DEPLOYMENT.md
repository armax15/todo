# 📘 Полное руководство по деплойменту Task Manager

Это детальное руководство по развертыванию Next.js приложения Task Manager на различных платформах.

## 📑 Содержание

1. [Подготовка](#подготовка)
2. [Vercel](#vercel)
3. [Docker](#docker)
4. [VPS](#vps)
5. [Railway](#railway)
6. [Render](#render)
7. [CI/CD](#cicd)
8. [Troubleshooting](#troubleshooting)

---

## Подготовка

### Переменные окружения

Создайте `.env.production` на основе `.env.production.example`:

```bash
cp .env.production.example .env.production
```

**Обязательные переменные:**

| Переменная | Описание | Как получить |
|------------|----------|--------------|
| `NEXTAUTH_URL` | URL вашего приложения | `https://your-domain.com` |
| `NEXTAUTH_SECRET` | Секретный ключ для NextAuth | `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | [Google Console](https://console.cloud.google.com/) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | Google Console |
| `NEXT_PUBLIC_API_URL` | URL Backend API | `https://api.your-domain.com/api` |

### Google OAuth настройка

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Google+ API
4. Создайте OAuth 2.0 credentials:
   - **Application type:** Web application
   - **Authorized redirect URIs:**
     - `http://localhost:3000/api/auth/callback/google` (dev)
     - `https://your-domain.com/api/auth/callback/google` (prod)
5. Скопируйте Client ID и Client Secret

---

## Vercel

### Быстрый старт

```bash
# Установка Vercel CLI
npm i -g vercel

# Логин
vercel login

# Деплой
vercel

# Production деплой
vercel --prod
```

### Через GitHub (рекомендуется)

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "New Project"
3. Импортируйте GitHub репозиторий
4. Настройте переменные окружения:
   - `NEXTAUTH_URL` → `https://your-project.vercel.app`
   - `NEXTAUTH_SECRET` → (сгенерируйте)
   - `GOOGLE_CLIENT_ID` → (из Google Console)
   - `GOOGLE_CLIENT_SECRET` → (из Google Console)
   - `NEXT_PUBLIC_API_URL` → URL вашего backend API
5. Нажмите "Deploy"

### Настройка домена

1. В Vercel Dashboard → Settings → Domains
2. Добавьте ваш домен
3. Настройте DNS записи у вашего регистратора:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```
4. Обновите `NEXTAUTH_URL` на ваш домен

### Автодеплой

После подключения к GitHub, каждый push в `main` будет автоматически деплоиться.

**Preview deployments:** Каждый PR получает свой preview URL

---

## Docker

### Локальная разработка

```bash
# Сборка образа
docker build -t task-manager:latest .

# Запуск
docker run -p 3000:3000 \
  --env-file .env.production \
  task-manager:latest
```

### Docker Compose (Full Stack)

Включает: Frontend + Backend + PostgreSQL + Nginx

```bash
# Подготовка
cp .env.production.example .env

# Заполните переменные в .env

# Запуск всех сервисов
docker compose up -d

# Проверка статуса
docker compose ps

# Просмотр логов
docker compose logs -f

# Остановка
docker compose down

# Полная очистка (включая volumes)
docker compose down -v
```

### Отдельные команды

```bash
# Только frontend
docker compose up -d frontend

# Только backend и база данных
docker compose up -d backend db

# Перезапуск сервиса
docker compose restart frontend

# Просмотр логов конкретного сервиса
docker compose logs -f frontend
```

### Обновление образов

```bash
# Пересобрать и перезапустить
docker compose up -d --build

# Принудительная пересборка без кеша
docker compose build --no-cache
docker compose up -d
```

---

## VPS

### Требования

- Ubuntu 20.04+ или Debian 11+
- Минимум 1GB RAM (рекомендуется 2GB+)
- 10GB+ свободного места
- Root доступ или sudo

### Шаг 1: Настройка сервера

```bash
# Подключитесь к серверу
ssh root@your-server-ip

# Скачайте и запустите скрипт настройки
curl -o setup-vps.sh https://raw.githubusercontent.com/your-repo/main/scripts/setup-vps.sh
chmod +x setup-vps.sh
./setup-vps.sh
```

**Что делает скрипт:**
- Обновляет систему
- Устанавливает Docker и Docker Compose
- Настраивает firewall (UFW)
- Устанавливает Fail2Ban для защиты от брутфорса
- Создает пользователя `deploy`
- Настраивает swap (если нужно)

### Шаг 2: Настройка SSH ключей

На локальной машине:

```bash
# Генерация SSH ключа (если нет)
ssh-keygen -t ed25519 -C "your-email@example.com"

# Копирование ключа на сервер
ssh-copy-id deploy@your-server-ip

# Проверка подключения
ssh deploy@your-server-ip
```

### Шаг 3: Деплой приложения

На локальной машине:

```bash
# Настройка переменных
export VPS_HOST=your-server.com
export VPS_USER=deploy

# Копирование .env файла
scp .env.production $VPS_USER@$VPS_HOST:/app/task-manager/.env

# Запуск деплоя
./scripts/deploy-vps.sh
```

### Шаг 4: Настройка Nginx и SSL

```bash
# Подключение к серверу
ssh deploy@your-server-ip

# Установка Certbot
sudo apt-get install certbot python3-certbot-nginx

# Получение SSL сертификата
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Автообновление сертификата
sudo certbot renew --dry-run
```

### Шаг 5: Настройка DNS

У вашего регистратора доменов настройте A-записи:

```
Type: A
Name: @
Value: YOUR_SERVER_IP

Type: A
Name: www
Value: YOUR_SERVER_IP
```

### Мониторинг и обслуживание

```bash
# Просмотр логов
ssh deploy@$VPS_HOST 'cd /app/task-manager && docker compose logs -f'

# Статус сервисов
ssh deploy@$VPS_HOST 'cd /app/task-manager && docker compose ps'

# Перезапуск
ssh deploy@$VPS_HOST 'cd /app/task-manager && docker compose restart'

# Обновление кода
./scripts/deploy-vps.sh

# Просмотр использования ресурсов
ssh deploy@$VPS_HOST 'docker stats'
```

---

## Railway

### Через веб-интерфейс

1. Создайте аккаунт на [railway.app](https://railway.app)
2. Создайте новый проект → "Deploy from GitHub repo"
3. Выберите ваш репозиторий
4. Railway автоматически определит Next.js приложение
5. Добавьте переменные окружения:
   - Settings → Variables → Raw Editor
   ```
   NEXTAUTH_URL=${{RAILWAY_PUBLIC_DOMAIN}}
   NEXTAUTH_SECRET=your-secret-here
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   NEXT_PUBLIC_API_URL=your-api-url
   ```
6. Deploy произойдет автоматически

### Через Railway CLI

```bash
# Установка
npm i -g @railway/cli

# Логин
railway login

# Инициализация в папке проекта
railway init

# Добавление переменных
railway variables set NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Деплой
railway up

# Добавление домена
railway domain
```

### Настройка PostgreSQL

1. В Railway dashboard → "New" → "Database" → "PostgreSQL"
2. Railway автоматически создаст `DATABASE_URL`
3. Подключите к вашему backend сервису

---

## Render

### Через веб-интерфейс

1. Создайте аккаунт на [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub репозиторий
4. Настройки:
   - **Name:** task-manager-frontend
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Plan:** Free (или платный)
5. Environment Variables:
   ```
   NEXTAUTH_URL=https://your-app.onrender.com
   NEXTAUTH_SECRET=<generate>
   GOOGLE_CLIENT_ID=<your-id>
   GOOGLE_CLIENT_SECRET=<your-secret>
   NEXT_PUBLIC_API_URL=<your-api-url>
   ```
6. Create Web Service

### Через render.yaml

Приложение уже содержит `render.yaml` с настройками. При подключении репозитория, Render автоматически применит эту конфигурацию.

### Blueprints (Infrastructure as Code)

1. В Render dashboard → Blueprints
2. New Blueprint Instance
3. Connect repository
4. Render создаст все сервисы из `render.yaml`

---

## CI/CD

### GitHub Actions

Проект включает `.github/workflows/deploy.yml` с готовым CI/CD pipeline.

#### Настройка для VPS деплоя

1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте secrets:

```
VPS_HOST = your-server.com
VPS_USERNAME = deploy
VPS_SSH_KEY = <содержимое вашего приватного SSH ключа>
```

Для получения SSH ключа:
```bash
cat ~/.ssh/id_ed25519
```

#### Настройка для Vercel

```
VERCEL_TOKEN = <токен из vercel.com/account/tokens>
VERCEL_ORG_ID = <из .vercel/project.json>
VERCEL_PROJECT_ID = <из .vercel/project.json>
```

#### Workflow Jobs

1. **quality-check** - ESLint и TypeScript проверки
2. **build-test** - Тестовая сборка
3. **docker-build** - Сборка и push Docker образа
4. **deploy-vps** - Деплой на VPS
5. **deploy-vercel** - Деплой на Vercel

#### Запуск вручную

```bash
# Через GitHub CLI
gh workflow run deploy.yml

# Или в GitHub → Actions → Deploy → Run workflow
```

---

## Troubleshooting

### Build ошибки

**Проблема:** TypeScript ошибки при сборке

```bash
# Проверьте типы локально
npm run type-check

# Очистите кеш и пересоберите
rm -rf .next node_modules
npm install
npm run build
```

**Проблема:** Out of memory

Увеличьте heap size:
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Docker проблемы

**Проблема:** Контейнер не запускается

```bash
# Просмотр логов
docker compose logs frontend

# Проверка переменных окружения
docker compose config

# Пересборка без кеша
docker compose build --no-cache frontend
```

**Проблема:** Порт занят

```bash
# Найти процесс на порту 3000
lsof -i :3000

# Убить процесс
kill -9 <PID>

# Или измените порт в docker-compose.yml
ports:
  - "3001:3000"
```

### Production проблемы

**Проблема:** 500 Internal Server Error

1. Проверьте логи:
```bash
# Docker
docker compose logs -f

# VPS
ssh deploy@server 'journalctl -u docker -f'

# Vercel
vercel logs
```

2. Проверьте переменные окружения
3. Проверьте доступность backend API

**Проблема:** NextAuth ошибки

- Убедитесь что `NEXTAUTH_URL` совпадает с actual URL
- Проверьте `NEXTAUTH_SECRET` (должен быть одинаковым на всех инстансах)
- Проверьте Google OAuth redirect URIs

**Проблема:** API недоступен

- Проверьте `NEXT_PUBLIC_API_URL`
- Проверьте CORS настройки на backend
- Проверьте firewall/security groups

### Performance оптимизация

1. **Включите кеширование:**
```javascript
// next.config.js
module.exports = {
  swcMinify: true,
  compress: true,
}
```

2. **Используйте CDN для статики** (Vercel делает это автоматически)

3. **Оптимизируйте изображения:**
```jsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  width={500}
  height={300}
  loading="lazy"
/>
```

4. **Мониторинг:**
- [Vercel Analytics](https://vercel.com/analytics)
- [Sentry](https://sentry.io) для error tracking
- [LogRocket](https://logrocket.com) для session replay

---

## Полезные команды

### Docker

```bash
# Очистка всех Docker ресурсов
docker system prune -a

# Просмотр размера образов
docker images

# Экспорт/импорт базы данных
docker compose exec db pg_dump -U postgres > backup.sql
docker compose exec -T db psql -U postgres < backup.sql
```

### Nginx

```bash
# Проверка конфигурации
sudo nginx -t

# Перезагрузка
sudo systemctl reload nginx

# Логи
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### SSL

```bash
# Обновление сертификата
sudo certbot renew

# Тест автообновления
sudo certbot renew --dry-run

# Список сертификатов
sudo certbot certificates
```

---

## Безопасность

### Checklist

- [ ] Используйте HTTPS (SSL сертификат)
- [ ] Настройте firewall (UFW/iptables)
- [ ] Используйте fail2ban для защиты SSH
- [ ] Отключите root login по SSH
- [ ] Используйте SSH ключи вместо паролей
- [ ] Регулярно обновляйте систему
- [ ] Используйте безопасные пароли для БД
- [ ] Не коммитьте .env файлы
- [ ] Настройте регулярные бэкапы
- [ ] Мониторинг логов на подозрительную активность

### Environment Variables Security

**НЕ КОММИТЬТЕ:**
- `.env`
- `.env.local`
- `.env.production`

**Можно коммитить:**
- `.env.example`
- `.env.production.example`

---

## Поддержка

Если у вас возникли проблемы:

1. Проверьте [Troubleshooting](#troubleshooting)
2. Просмотрите логи
3. Создайте issue в GitHub репозитории
4. Обратитесь к документации платформы:
   - [Next.js Docs](https://nextjs.org/docs)
   - [Vercel Docs](https://vercel.com/docs)
   - [Docker Docs](https://docs.docker.com/)

---

**Удачного деплоя! 🚀**
