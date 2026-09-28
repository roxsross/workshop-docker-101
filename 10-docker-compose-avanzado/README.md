# 10 - Docker Compose avanzado (Compose v2/v5)

Ejercicio nuevo que muestra features actuales de Docker Compose (integrado en el CLI como `docker compose`, ya en su versión 5.x) que no existían o eran poco usadas cuando se armó este workshop originalmente:

- **`healthcheck` + `depends_on: condition: service_healthy`**: `app` no arranca hasta que `db` está realmente lista (no solo "iniciada"), y `proxy` espera a que `app` esté sana.
- **`profiles`**: `adminer` solo se levanta si pides explícitamente el perfil `tools`, para no encender servicios que no siempre necesitas.
- **`.env` / interpolación de variables**: `${APP_MESSAGE:-...}` con valores por defecto. Copia `.env.example` a `.env` para personalizarlo (el `.env` real nunca se commitea).
- **`develop.watch`**: sincroniza cambios de código en caliente dentro del contenedor en desarrollo, sin tener que reconstruir la imagen en cada cambio.
- **Volúmenes nombrados** para persistir datos de MySQL entre `down`/`up`.

## Arquitectura

```
cliente -> proxy (nginx:1.30-alpine, :8080) -> app (node:24-alpine, :3000) -> db (mysql:8.4)
                                                                              ^
                                                                     adminer (perfil "tools", :8081)
```

## Uso

```bash
cp .env.example .env

# Levantar el stack base (proxy + app + db)
docker compose up -d --build

# Ver el estado (deberían quedar todos "healthy")
docker compose ps

# Probar
curl http://localhost:8080

# Levantar además Adminer (perfil opcional) para inspeccionar la base de datos
docker compose --profile tools up -d
# Abre http://localhost:8081 (servidor: db, usuario: root)

# Desarrollo con sincronización en caliente (requiere Docker Compose reciente)
docker compose watch

# Bajar todo (agrega -v para borrar también los volúmenes de datos)
docker compose down
```
