# demo-db-mysql-phpadmin

Ejecución de un par de contenedores de `MySQL` y de `PHPMyAdmin` conectados entre sí.

> ⚠️ La contraseña de root está hardcodeada en el `docker-compose.yaml` solo para simplificar la demo. Nunca hagas esto en producción: usa Docker secrets o variables de entorno inyectadas externamente.

## Opción 1: Docker Compose (recomendado)

`--link` está deprecado hace años; en su lugar usamos una red de Compose (creada automáticamente) y `depends_on` con `condition: service_healthy` para que phpMyAdmin espere a que MySQL esté realmente listo.

```bash
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
