# syntax=docker/dockerfile:1.7

FROM node:24-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
# Cache mount de BuildKit: reutiliza la caché de npm entre builds
# aunque cambien las capas anteriores (mucho más rápido que solo layer caching)
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM base AS release
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN addgroup -S app && adduser -S app -G app \
    && chown -R app:app /app
USER app

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ || exit 1

CMD ["node", "app.js"]
