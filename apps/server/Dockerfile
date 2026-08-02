FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/server/package.json ./apps/server/package.json

RUN pnpm install --frozen-lockfile

COPY apps/server ./apps/server

WORKDIR /app/apps/server

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]