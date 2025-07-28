# Этап 1: Установка зависимостей
FROM node:20.11-alpine as dependencies
WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm

# Копируем только package.json и pnpm-lock.yaml
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install

# Этап 2: Сборка
FROM node:20.11-alpine as builder
WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm

# Копируем все файлы проекта
COPY . .

# Копируем node_modules из предыдущего этапа
COPY --from=dependencies /app/node_modules ./node_modules

# Билдим проект
RUN pnpm run build:production

# Этап 3: Запуск
FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV=production

# Устанавливаем pnpm
RUN npm install -g pnpm

# Копируем всё из билдера
COPY --from=builder /app .

# Порт приложения (если у тебя Next.js, скорее всего 3000)
EXPOSE 3000

# Запуск
CMD ["pnpm", "start"]
