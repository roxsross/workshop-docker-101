# syntax=docker/dockerfile:1
FROM nginx:1.30-alpine

LABEL org.opencontainers.image.title="demo-nginx-docker" \
      org.opencontainers.image.description="Ejercicio 01 - Workshop Docker 101" \
      org.opencontainers.image.authors="RoxsRoss"

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1
