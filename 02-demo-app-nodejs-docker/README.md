# NodeJS con Docker

Imagen base: `node:24-alpine` (LTS "Krypton"). El `Dockerfile` usa build multi-stage, `npm ci` con `package-lock.json` para builds reproducibles, usuario sin privilegios y `HEALTHCHECK`.

## Con Docker CLI

```bash
# Construir imagen de nodejs
docker build -t node-app:0.1 .
docker run -p 3000:3000 --name my-app node-app:0.1
```

## Con Docker Compose (recomendado)

```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```
