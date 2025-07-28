# Стадия установки зависимостей
FROM node:20.11-alpine AS dependencies
WORKDIR /app

# Копируем package.json и lock-файл pnpm
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Стадия сборки приложения
FROM node:20.11-alpine AS builder
WORKDIR /app

# Копируем весь исходный код
COPY . .

# Копируем node_modules и lock-файл из предыдущей стадии
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Собираем проект (пример: build:production — твоя команда сборки)
RUN pnpm run build:production

# Стадия запуска
FROM node:20.11-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Копируем собранные файлы из стадии builder
COPY --from=builder /app/ ./

EXPOSE 3000

# Запуск приложения через pnpm
CMD ["pnpm", "start"]
