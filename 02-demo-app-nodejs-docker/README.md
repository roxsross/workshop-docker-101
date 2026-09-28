# NodeJS con Docker

Imagen base: `node:24-alpine` (LTS "Krypton"). El `Dockerfile` usa build multi-stage, `npm ci` con `package-lock.json` para builds reproducibles, usuario sin privilegios y `HEALTHCHECK` contra un endpoint `/health` dedicado (separado de la home, que hace un render EJS).

## Tests

La app exporta `app` (sin llamar a `listen` fuera de ejecución directa) para poder testearla. Corre los tests con el test runner nativo de Node:

```bash
npm test
```

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
