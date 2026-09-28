# syntax=docker/dockerfile:1
FROM nginx:1.30-alpine

LABEL org.opencontainers.image.title="tetris" \
      org.opencontainers.image.description="roxs-tetris-games" \
      org.opencontainers.image.authors="RoxsRoss"

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1