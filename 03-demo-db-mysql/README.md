# MySQL con Docker

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
