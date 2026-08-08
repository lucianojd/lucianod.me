# Base image
FROM node:26-slim AS base

WORKDIR /app
RUN npm install -g pnpm

# Build image
FROM base AS builder
WORKDIR /app
RUN mkdir -p /app/data
COPY . .

ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAACFiGNWG2Rq3LqGG

RUN pnpm install --frozen-lockfile && pnpm build && pnpm prune --production
RUN chown -R node:node .

# Production image
FROM node:26-slim AS runner

USER node
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["node", "server.js"]