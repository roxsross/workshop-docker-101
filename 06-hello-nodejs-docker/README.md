# Hello NodeJS con Docker

Pequeña app Express que sirve `index.html` y muestra la versión leída desde `package.json`. Antes este ejercicio no tenía `Dockerfile`; ahora sí, con build multi-stage sobre `node:24-alpine`, usuario sin privilegios y `HEALTHCHECK`.

## Con Docker CLI

```bash
docker build -t hello-node:1.0 .
docker run -p 4000:4000 --name hello-node hello-node:1.0
curl http://localhost:4000
```

## Con Docker Compose

```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```
