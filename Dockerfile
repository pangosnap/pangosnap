# Стадия установки зависимостей
FROM node:20.11-alpine AS dependencies
WORKDIR /app

# Устанавливаем pnpm глобально (без corepack)
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Стадия сборки приложения
FROM node:20.11-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm run build:production

# Стадия запуска
FROM node:20.11-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm

COPY --from=builder /app/ ./

EXPOSE 3000

CMD ["pnpm", "start"]
