# Стадия установки зависимостей
FROM node:20.11-alpine AS dependencies
WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Стадия сборки приложения
FROM node:20.11-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@latest

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY . .

RUN pnpm run build:production

# Стадия запуска
FROM node:20.11-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Если нужно запускать через pnpm, то оставить
RUN npm install -g pnpm@latest

COPY --from=builder /app/ ./

EXPOSE 3000

CMD ["pnpm", "start"]
