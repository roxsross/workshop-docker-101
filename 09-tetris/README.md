# Tetris con Docker + Nginx

Juego de Tetris estático servido con `nginx:1.30-alpine`. Incluye configuración custom de Nginx para cacheo de assets y `HEALTHCHECK`.

## Con Docker CLI

```bash
docker build -t roxs-tetris:1.0 .
docker run -p 8080:80 --name tetris roxs-tetris:1.0
```

Abre <http://localhost:8080> y juega.

## Con Docker Compose

```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```
