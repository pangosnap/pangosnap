# Стадия установки зависимостей
FROM node:20.11-alpine AS dependencies
WORKDIR /app

RUN npm install -g pnpm@latest --unsafe-perm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Стадия сборки приложения
FROM node:20.11-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@latest --unsafe-perm

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=dependencies /app/package.json ./package.json
COPY . .

RUN pnpm run build:production

# Стадия запуска
FROM node:20.11-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm@latest --unsafe-perm

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["pnpm", "start"]
