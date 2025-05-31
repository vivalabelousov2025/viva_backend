FROM ubuntu:24.04

# Установка Node.js и необходимых пакетов
RUN apt-get update -y && apt-get install -y \
    curl \
    unzip \
    netcat-traditional \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Установка pnpm
RUN curl -fsSL https://get.pnpm.io/install.sh | bash - && ln -s /root/.local/share/pnpm/pnpm /usr/local/bin/pnpm

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Копируем package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем остальной код приложения
COPY . .

# Генерируем Prisma Client
RUN pnpm prisma generate

# Сборка приложения
RUN pnpm run build

EXPOSE 8000
EXPOSE 587

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

CMD ["/bin/bash", "/app/entrypoint.sh"]