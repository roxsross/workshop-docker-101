# 04 — 🛠️ MySQL + phpMyAdmin

Misma base de datos que el ejercicio 03, pero ahora con una interfaz visual: nada de escribir `SELECT * FROM` a mano. Este ejercicio también te muestra cómo hacer que dos contenedores se hablen entre sí sin el viejo (y deprecado) `--link`.

## 🎯 Qué vas a aprender

- Conectar dos contenedores por una red de Compose, sin `--link`.
- Usar `depends_on: condition: service_healthy` para que un servicio espere a que el otro esté realmente listo (no solo "iniciado").
- Administrar MySQL desde una UI web (phpMyAdmin) en vez de la terminal.

Ejecución de un par de contenedores de `MySQL` y de `PHPMyAdmin` conectados entre sí.

> ⚠️ El valor por defecto (`secret-pw`) es solo para la demo. En un entorno real, copia `.env.example` a `.env`, cambia la contraseña ahí y nunca commitees el `.env`.

## Opción 1: Docker Compose (recomendado)

`--link` está deprecado hace años; en su lugar usamos una red de Compose (creada automáticamente) y `depends_on` con `condition: service_healthy` para que phpMyAdmin espere a que MySQL esté realmente listo. La contraseña se lee desde variables de entorno (`.env`, ver `.env.example`).

```bash
cp .env.example .env
docker compose up -d

# Ver logs de la base de datos
docker compose logs db

# Conectarte al contenedor de MySQL
docker compose exec db mysql -u root -p

# Detener y limpiar
docker compose down
```

Podrás ver tu contenedor de `PHPMyAdmin` corriendo en <http://localhost:82/>. Una vez ahí introduce las credenciales correctas (usuario `root`, password `secret-pw`) para acceder y comenzar a jugar con tus contenedores.

## Opción 2: Docker CLI clásico (con red en vez de --link)

```bash
# Crear una red para que los contenedores se vean entre sí
docker network create demo-net

# Inicia el contenedor de MySQL
docker run --name=db --network=demo-net -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret-pw -d mysql:8.4

# Puedes revisar los logs del contenedor con:
docker logs db

# Puedes conectarte al contenedor con:
docker exec -it db bash
# luego conectarte a MySQL por medio del comando
mysql -u root -p

# Para salir de la terminal interactiva del contenedor, primero hay que salir de MySQL con `exit`,
# y una vez fuera puedes teclear la combinación Ctrl+P y Ctrl+Q para salir sin detener el contenedor.

# Inicia el contenedor de PHPMyAdmin apuntando a "db" por nombre de red
docker run --name=my-admin --network=demo-net -p 82:80 -e PMA_HOST=db -d phpmyadmin:5.2

# Una vez que hayas jugado un poco con los contenedores, detenlos y bórralos:
docker stop db my-admin
docker rm db my-admin
docker network rm demo-net
```

## 🏆 Reto extra

Entrá a phpMyAdmin (<http://localhost:82/>), creá una tabla nueva desde la UI (sin escribir SQL) y agregale un par de filas. Después conectate por consola con `docker compose exec db mysql -u root -p` y hacé un `SELECT` para confirmar que es la misma base de datos, solo que ahora la tocaste desde dos lugares distintos. Eso es justamente la gracia de que ambos contenedores compartan red.

