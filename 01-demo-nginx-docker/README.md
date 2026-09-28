# 01 — 🌐 NGINX con Docker

Tu primer contenedor. En menos de un minuto vas a tener un servidor web corriendo, y vas a ver con tus propios ojos por qué todo el mundo se volvió loco con Docker: "funciona en mi máquina" deja de ser un chiste.

## 🎯 Qué vas a aprender

- Levantar un contenedor con la imagen oficial de Nginx, sin escribir una sola línea de config.
- La diferencia entre usar una imagen tal cual viene y construir la tuya con un `Dockerfile` propio.
- Cómo Docker sabe si tu contenedor está "sano" (`HEALTHCHECK`).

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

## 🏆 Reto extra

Editá `index.html` (cambiá el título, poné tu nombre, lo que quieras), corré `docker compose up -d --build` de nuevo y refrescá el navegador. Si no ves el cambio, pensá: ¿tenés que reconstruir la imagen o alcanza con reiniciar el contenedor? Ese es exactamente el tipo de duda que vas a tener todo el workshop — y ya la resolviste.
