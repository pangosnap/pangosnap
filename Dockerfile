FROM node:20-alpine

WORKDIR /app

# Устанавливаем pnpm без corepack
RUN npm install -g pnpm@latest --unsafe-perm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build:production

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "start"]
