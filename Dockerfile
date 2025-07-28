# Устанавливаем зависимости
FROM node:20.11-alpine AS dependencies
WORKDIR /app

# Включаем поддержку pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Копируем необходимые файлы
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Билдим приложение
FROM node:20.11-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm run build:production

# Стейдж запуска
FROM node:20.11-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/ ./

EXPOSE 3000
CMD ["pnpm", "start"]
