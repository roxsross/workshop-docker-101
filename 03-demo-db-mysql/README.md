# 03 — 🗄️ MySQL con Docker

Acá viene la pregunta que todo el mundo se hace al empezar con contenedores: "si borro el contenedor, ¿pierdo mis datos?". Spoiler: no, si usás volúmenes bien. Este ejercicio te lo demuestra en carne propia.

## 🎯 Qué vas a aprender

- Levantar MySQL en un contenedor con un volumen nombrado (tus datos sobreviven a `docker rm`).
- Precargar datos automáticamente al primer arranque con `docker-entrypoint-initdb.d`.
- Manejar credenciales con `.env` en vez de hardcodearlas.

Imagen: `mysql:8.4` (rama LTS actual de MySQL; 8.0 llegó a EOL en abril de 2026).

> ⚠️ Los valores por defecto (`my-data-pass`) son solo para la demo. En un entorno real, copia `.env.example` a `.env`, cambia la contraseña ahí y nunca commitees el `.env`.

## Opción 1: Docker Compose (recomendado)

El `docker-compose.yaml` de esta carpeta usa un volumen nombrado (persistente y portable entre SO), carga automáticamente `data/mysql-data.sql` al iniciar por primera vez (vía `docker-entrypoint-initdb.d`) y agrega `healthcheck`. Las credenciales se leen desde variables de entorno (`.env`, ver `.env.example`).

```bash
# Copiar y (opcionalmente) personalizar las credenciales
cp .env.example .env

# Levantar MySQL
docker compose up -d

# Ver que el healthcheck esté "healthy"
docker compose ps

# Acceder a MySQL a través del contenedor
docker compose exec mysql mysql -u root -p
USE base_de_datos;
SELECT * FROM usuarios;

# Detener (los datos persisten en el volumen "mysql-data")
docker compose down

# Detener y borrar también los datos
docker compose down -v
```

## Opción 2: Docker CLI clásico

```bash
# Crear un volumen con nombre (evita problemas de permisos de bind mounts)
docker volume create mysql-data

# Ejecutar el contenedor MySQL
docker run -d --name mysql-container -e MYSQL_ROOT_PASSWORD=my-data-pass -v mysql-data:/var/lib/mysql mysql:8.4

# Acceder a MySQL a través del contenedor
docker exec -it mysql-container mysql -u root -p

# Ejecutar data/mysql-data.sql manualmente dentro del contenedor
docker cp data/mysql-data.sql mysql-container:/tmp/mysql-data.sql
docker exec -it mysql-container sh -c 'mysql -u root -p < /tmp/mysql-data.sql'

# Detener y eliminar el contenedor (el volumen persiste)
docker stop mysql-container
docker rm mysql-container

# Vuelve a ejecutar el contenedor MySQL reutilizando el mismo volumen
docker run -d --name mysql-container -e MYSQL_ROOT_PASSWORD=my-data-pass -v mysql-data:/var/lib/mysql mysql:8.4

# Verifica que los datos que habías agregado anteriormente aún estén allí
docker exec -it mysql-container mysql -u root -p
USE base_de_datos;
SELECT * FROM usuarios;
```

## 🏆 Reto extra

1. Con el stack levantado, insertá una fila nueva en `usuarios` desde el cliente `mysql`.
2. Corré `docker compose down` (sin `-v`) y volvé a levantar con `docker compose up -d`. ¿Sigue tu fila ahí? Debería.
3. Ahora probá `docker compose down -v` y levantalo de nuevo. Fijate que volviste a foja cero — esa `-v` es la diferencia entre "reiniciar" y "borrar todo". Es el error más común (y más doloroso) que vas a evitar de por vida.

