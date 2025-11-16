#!/bin/bash

# Скрипт для начальной настройки VPS сервера
# Запускается на удаленном сервере
# Использование: bash <(curl -s https://raw.githubusercontent.com/your-repo/main/scripts/setup-vps.sh)

set -e

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Настройка VPS для Task Manager...${NC}"

# Проверка прав root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ Пожалуйста, запустите скрипт с правами root${NC}"
    exit 1
fi

# Обновление системы
echo -e "\n${BLUE}📦 Обновление системы...${NC}"
apt-get update
apt-get upgrade -y

# Установка базовых утилит
echo -e "\n${BLUE}🔧 Установка базовых утилит...${NC}"
apt-get install -y \
    curl \
    wget \
    git \
    vim \
    htop \
    ufw \
    fail2ban \
    ca-certificates \
    gnupg \
    lsb-release

# Установка Docker
echo -e "\n${BLUE}🐳 Установка Docker...${NC}"
if ! command -v docker &> /dev/null; then
    # Добавление официального GPG ключа Docker
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    # Настройка репозитория
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Установка Docker Engine
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    echo -e "${GREEN}✅ Docker установлен${NC}"
else
    echo -e "${GREEN}✅ Docker уже установлен${NC}"
fi

# Запуск Docker при загрузке системы
systemctl enable docker
systemctl start docker

# Настройка firewall (UFW)
echo -e "\n${BLUE}🔥 Настройка firewall...${NC}"
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
echo "y" | ufw enable

echo -e "${GREEN}✅ Firewall настроен${NC}"

# Настройка Fail2Ban
echo -e "\n${BLUE}🛡️  Настройка Fail2Ban...${NC}"
systemctl enable fail2ban
systemctl start fail2ban

# Создание пользователя для деплоя (если не существует)
DEPLOY_USER="deploy"
if ! id "$DEPLOY_USER" &>/dev/null; then
    echo -e "\n${BLUE}👤 Создание пользователя $DEPLOY_USER...${NC}"
    useradd -m -s /bin/bash $DEPLOY_USER
    usermod -aG docker $DEPLOY_USER
    echo -e "${GREEN}✅ Пользователь $DEPLOY_USER создан${NC}"
else
    echo -e "${GREEN}✅ Пользователь $DEPLOY_USER уже существует${NC}"
fi

# Создание директории для приложения
APP_DIR="/app/task-manager"
mkdir -p $APP_DIR
chown -R $DEPLOY_USER:$DEPLOY_USER /app

# Установка Node.js (опционально, для PM2 деплоя)
echo -e "\n${BLUE}📗 Установка Node.js...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    echo -e "${GREEN}✅ Node.js установлен${NC}"
else
    echo -e "${GREEN}✅ Node.js уже установлен${NC}"
fi

# Установка PM2 глобально (опционально)
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    pm2 startup systemd -u $DEPLOY_USER --hp /home/$DEPLOY_USER
    echo -e "${GREEN}✅ PM2 установлен${NC}"
else
    echo -e "${GREEN}✅ PM2 уже установлен${NC}"
fi

# Настройка swap (если меньше 2GB RAM)
TOTAL_MEM=$(free -m | awk '/^Mem:/{print $2}')
if [ $TOTAL_MEM -lt 2048 ] && [ ! -f /swapfile ]; then
    echo -e "\n${BLUE}💾 Создание swap файла...${NC}"
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
    echo -e "${GREEN}✅ Swap файл создан${NC}"
fi

# Настройка автоматических обновлений безопасности
echo -e "\n${BLUE}🔒 Настройка автоматических обновлений безопасности...${NC}"
apt-get install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

echo -e "\n${GREEN}🎉 Настройка VPS завершена!${NC}"
echo -e "${BLUE}📝 Информация:${NC}"
echo "  Пользователь для деплоя: $DEPLOY_USER"
echo "  Директория приложения: $APP_DIR"
echo "  Docker версия: $(docker --version)"
echo "  Node.js версия: $(node --version)"
echo "  npm версия: $(npm --version)"
echo ""
echo -e "${BLUE}🔑 Следующие шаги:${NC}"
echo "  1. Настройте SSH ключи для пользователя $DEPLOY_USER"
echo "  2. Скопируйте .env файл в $APP_DIR"
echo "  3. Запустите деплой: ./scripts/deploy-vps.sh"
echo ""
echo -e "${BLUE}🔐 Рекомендации по безопасности:${NC}"
echo "  - Отключите вход по паролю в SSH (используйте только ключи)"
echo "  - Измените стандартный порт SSH"
echo "  - Настройте регулярные бэкапы"
echo "  - Используйте SSL сертификаты (Let's Encrypt)"
