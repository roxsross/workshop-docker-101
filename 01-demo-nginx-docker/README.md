# NGINX con Docker

## Opción 1: imagen oficial directa

```bash
# Ejecutar Servidor Web Nginx
docker run --name mynginx -p 80:80 -d nginx:1.30-alpine

# Verificar que el contenedor se creó y se está ejecutando
docker ps

# Testear mynginx
curl http://localhost

# Ver el estado de salud (healthcheck) del contenedor
docker inspect --format='{{json .State.Health.Status}}' mynginx

# Detener y eliminar el contenedor mynginx
docker stop mynginx
docker rm mynginx
```

## Opción 2: build propio con Dockerfile + Compose

Este ejercicio ahora incluye un `Dockerfile` (imagen `nginx:1.30-alpine` con un `index.html` propio y `HEALTHCHECK`) y un `docker-compose.yaml`.

```bash
# Construir y levantar con Docker Compose (v2/v5, integrado en el CLI)
docker compose up -d --build

# Ver logs
docker compose logs -f

# Bajar el stack
docker compose down
```
