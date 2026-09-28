# Ejemplo: Desplegando la aplicación MediaWiki

MediaWiki es una aplicación web escrita en PHP que nos permite gestionar una wiki. En este ejemplo vamos a hacer un ejemplo simple de despliegue en contenedor usando la imagen [`mediawiki`](https://hub.docker.com/_/mediawiki) que encontramos en Docker Hub.

En este ejemplo nos vamos a fijar cómo por medio de la etiqueta del nombre de la imagen podemos tener distintas versiones de la aplicación.

En concreto, si estudiamos la [documentación](https://hub.docker.com/_/mediawiki) de la imagen `mediawiki`, podemos ver las etiquetas disponibles para la imagen que corresponden a versiones distintas de la aplicación.

## La etiqueta `latest`

Si utilizamos el nombre de una imagen sin indicar la etiqueta, se toma por defecto la etiqueta `latest`, que suele corresponder a la última versión estable de la aplicación. En el caso concreto de `mediawiki`, la etiqueta `latest` corresponde actualmente a la versión `1.46` (release estable de junio de 2026). Podemos usar las siguientes etiquetas para indicar la misma versión: `1.46.0`, `1.46`, `stable`, `latest`.

## Las imágenes base y la arquitectura también se indican con las etiquetas

Podemos seguir observando que algunas etiquetas nos indican, además de la versión, los servicios que tiene instalada la imagen. Por ejemplo, si usamos la etiqueta `1.46-fpm` estaremos creando un contenedor con esa versión de la aplicación, pero que además tendrá un servidor de aplicaciones `php-fpm` para servir la aplicación.

Otro ejemplo: si usamos la etiqueta `1.46-fpm-alpine`, además de tener instalado `php-fpm`, nos indica que la imagen base usada para crearla es una distribución `alpine`, que se caracteriza por ser muy liviana.

## Instalación de distintas versiones de MediaWiki

Vamos a crear distintos contenedores usando etiquetas distintas al indicar el nombre de la imagen; posteriormente accederemos a la aplicación y podremos ver la versión instalada.

En primer lugar vamos a instalar la última versión estable:

```bash
docker run -d -p 8080:80 --name mediawiki1 mediawiki:1.46
```

Si accedemos a `http://localhost:8080`, podemos ver que hemos instalado la versión `1.46`.

A continuación vamos a instalar una versión anterior, la `1.43`, creando otro contenedor con otro nombre y mapeando otro puerto:

```bash
docker run -d -p 8081:80 --name mediawiki2 mediawiki:1.43
```

Si accedemos a `http://localhost:8081`, podemos ver que hemos instalado la versión `1.43`.

Y finalmente vamos a instalar una versión mucho más antigua en otro contenedor, solo para comparar:

```bash
docker run -d -p 8082:80 --name mediawiki3 mediawiki:1.39
```

Si accedemos a `http://localhost:8082`, podemos ver que hemos instalado la versión `1.39`.

**Nota:** puedes observar que la primera imagen que se descarga trae todas sus capas, pero al descargar las otras versiones, solo se bajan las capas que difieren de la primera (comparten la misma base `alpine`/`debian`).

## Stack completo con Docker Compose (MediaWiki + MySQL)

> ⚠️ Los valores por defecto son solo para la demo (el password de root sí se randomiza vía `MYSQL_RANDOM_ROOT_PASSWORD`). En un entorno real, copia `.env.example` a `.env`, cambia la contraseña ahí y nunca commitees el `.env`.

Levantar solo el contenedor de `mediawiki` sin base de datos solo sirve para explorar la imagen: para completar el instalador web necesitas una base de datos. El `docker-compose.yaml` de esta carpeta define ese stack completo, con `healthcheck` en MySQL y volúmenes nombrados para persistir la wiki y la base de datos. Las credenciales se leen desde variables de entorno (`.env`, ver `.env.example`).

```bash
cp .env.example .env
docker compose up -d

# Completa el instalador en el navegador
# http://localhost:8080

# Al terminar el instalador, descarga el LocalSettings.php generado,
# colócalo en esta carpeta y descomenta el bind mount en docker-compose.yaml
# para que persista entre reinicios del contenedor.

docker compose down
```
