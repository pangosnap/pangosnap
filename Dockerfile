FROM node:20-alpine AS dependencies
WORKDIR /app

# Устанавливаем pnpm глобально без corepack enable (без лишних сложностей)
RUN npm install -g pnpm@latest --unsafe-perm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm@latest --unsafe-perm

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN pnpm run build:production

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm@latest --unsafe-perm

COPY --from=builder /app ./

EXPOSE 3000
CMD ["pnpm", "start"]
