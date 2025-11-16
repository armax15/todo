#!/bin/bash

# Скрипт для деплоя Next.js приложения на VPS
# Использование: ./scripts/deploy-vps.sh

set -e  # Прерывать выполнение при ошибке

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Начало деплоя на VPS...${NC}"

# Проверка переменных окружения
if [ -z "$VPS_HOST" ] || [ -z "$VPS_USER" ]; then
    echo -e "${RED}❌ Ошибка: Установите переменные окружения VPS_HOST и VPS_USER${NC}"
    echo "Пример: export VPS_HOST=your-server.com"
    echo "         export VPS_USER=ubuntu"
    exit 1
fi

APP_DIR="${APP_DIR:-/app/task-manager}"
REPO_URL="${REPO_URL:-$(git config --get remote.origin.url)}"

echo -e "${BLUE}📋 Конфигурация:${NC}"
echo "  VPS Host: $VPS_HOST"
echo "  VPS User: $VPS_USER"
echo "  App Directory: $APP_DIR"
echo "  Repository: $REPO_URL"

# Функция для выполнения команд на сервере
run_remote() {
    ssh -o StrictHostKeyChecking=no "${VPS_USER}@${VPS_HOST}" "$@"
}

# Шаг 1: Проверка подключения к серверу
echo -e "\n${BLUE}🔌 Проверка подключения к серверу...${NC}"
if ! run_remote "echo 'Подключение успешно'"; then
    echo -e "${RED}❌ Не удалось подключиться к серверу${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Подключение установлено${NC}"

# Шаг 2: Установка зависимостей на сервере (если необходимо)
echo -e "\n${BLUE}📦 Проверка зависимостей на сервере...${NC}"
run_remote "which docker >/dev/null 2>&1 || (echo 'Docker не установлен. Установите Docker на сервере.' && exit 1)"
run_remote "which docker-compose >/dev/null 2>&1 || which docker compose >/dev/null 2>&1 || (echo 'Docker Compose не установлен.' && exit 1)"
echo -e "${GREEN}✅ Docker и Docker Compose установлены${NC}"

# Шаг 3: Клонирование/обновление репозитория на сервере
echo -e "\n${BLUE}📥 Обновление кода на сервере...${NC}"
run_remote "
    if [ -d '$APP_DIR' ]; then
        echo 'Обновление существующего репозитория...'
        cd $APP_DIR
        git fetch origin
        git reset --hard origin/main
    else
        echo 'Клонирование репозитория...'
        sudo mkdir -p $APP_DIR
        sudo chown $VPS_USER:$VPS_USER $APP_DIR
        git clone $REPO_URL $APP_DIR
        cd $APP_DIR
    fi
"
echo -e "${GREEN}✅ Код обновлен${NC}"

# Шаг 4: Копирование .env файла (если существует локально)
if [ -f ".env.production" ]; then
    echo -e "\n${BLUE}🔐 Копирование .env файла...${NC}"
    scp .env.production "${VPS_USER}@${VPS_HOST}:${APP_DIR}/.env"
    echo -e "${GREEN}✅ .env файл скопирован${NC}"
else
    echo -e "\n${BLUE}⚠️  .env.production не найден. Убедитесь, что переменные окружения настроены на сервере.${NC}"
fi

# Шаг 5: Сборка и запуск Docker контейнеров
echo -e "\n${BLUE}🐳 Сборка и запуск Docker контейнеров...${NC}"
run_remote "
    cd $APP_DIR

    # Останавливаем старые контейнеры
    docker compose down || true

    # Собираем новые образы
    docker compose build --no-cache

    # Запускаем контейнеры
    docker compose up -d

    # Показываем статус
    docker compose ps
"
echo -e "${GREEN}✅ Контейнеры запущены${NC}"

# Шаг 6: Очистка старых образов
echo -e "\n${BLUE}🧹 Очистка старых Docker образов...${NC}"
run_remote "docker image prune -af"
echo -e "${GREEN}✅ Очистка завершена${NC}"

# Шаг 7: Проверка здоровья приложения
echo -e "\n${BLUE}🏥 Проверка здоровья приложения...${NC}"
sleep 5  # Даем время приложению запуститься

if run_remote "curl -f http://localhost:3000 >/dev/null 2>&1"; then
    echo -e "${GREEN}✅ Приложение работает!${NC}"
else
    echo -e "${RED}⚠️  Приложение может быть недоступно. Проверьте логи.${NC}"
    echo "Команда для просмотра логов: ssh ${VPS_USER}@${VPS_HOST} 'cd ${APP_DIR} && docker compose logs -f'"
fi

echo -e "\n${GREEN}🎉 Деплой завершен!${NC}"
echo -e "${BLUE}📝 Полезные команды:${NC}"
echo "  Просмотр логов: ssh ${VPS_USER}@${VPS_HOST} 'cd ${APP_DIR} && docker compose logs -f'"
echo "  Перезапуск: ssh ${VPS_USER}@${VPS_HOST} 'cd ${APP_DIR} && docker compose restart'"
echo "  Остановка: ssh ${VPS_USER}@${VPS_HOST} 'cd ${APP_DIR} && docker compose down'"
