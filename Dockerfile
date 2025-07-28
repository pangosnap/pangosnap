# Устанавливаем зависимости
FROM node:20.11-alpine as dependencies
WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm@latest --unsafe-perm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Билдим приложение
FROM node:20.11-alpine as builder
WORKDIR /app

RUN npm install -g pnpm@latest --unsafe-perm

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN pnpm run build:production

# Стейдж запуска
FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm@latest --unsafe-perm

COPY --from=builder /app/ ./

EXPOSE 3000
CMD ["pnpm", "start"]
