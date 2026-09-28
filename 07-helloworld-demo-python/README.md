# 07 — 🐍 Hello World en Python (con `docker init`)

¿Tenés una app y no tenés ni idea de cómo escribir el `Dockerfile`? Esa era la excusa de siempre... hasta que llegó `docker init`. En este ejercicio la CLI te lo escribe por vos, y solo tenés que entender qué generó.

## 🎯 Qué vas a aprender

- Usar `docker init` para generar `Dockerfile`, `.dockerignore` y `docker-compose.yaml` automáticamente.
- Leer y entender ese Dockerfile generado (usuario sin privilegios, `HEALTHCHECK`, etc.) en vez de copiarlo a ciegas.

Ejemplo simple para demostrar la CLI `docker init` con un programa Python de tipo "Hello World".

## Ejecutar la aplicación sin Docker

Podés correr el script directamente con `python3 app.py`. El handler responde a peticiones GET con un texto fijo y levanta un servidor HTTP en el puerto `8080`.

Al ejecutarlo, vas a poder acceder al servidor en `http://localhost:8080` y ver el siguiente resultado:

```shell
❯ curl http://localhost:8080

          ##         .
    ## ## ##        ==
 ## ## ## ## ##    ===
/"""""""""""""""""\___/ ===
{                       /  ===-
\______ O           __/
 \    \         __/
  \____\_______/


Hello from Docker!
```

## Usando `docker init`

La carpeta [`sample/`](sample/) es un directorio autocontenido (`app.py`, `Dockerfile`, `docker-compose.yaml`, `.dockerignore`) con el resultado de correr `docker init`, ya actualizado. Para probarlo:

```bash
cd sample
docker compose up -d --build
curl http://localhost:8080
docker compose down
```

### Generar los archivos desde cero en un proyecto nuevo

```bash
docker init
```

Este comando te guía para crear los siguientes archivos con valores por defecto razonables para tu proyecto:
- `.dockerignore`
- `Dockerfile`
- `docker-compose.yaml`

## El Dockerfile generado

Actualizado a la última versión estable de Python (`3.14`), usando `COPY` en lugar del `ADD` (deprecado) para archivos locales, ejecutando como usuario sin privilegios y agregando un `HEALTHCHECK`:

```Dockerfile
FROM python:3.14-alpine

WORKDIR /app
COPY . /app

RUN addgroup -S app && adduser -S app -G app \
    && chown -R app:app /app
USER app

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:8080/ || exit 1

CMD ["python3", "app.py"]
```

## El docker-compose.yaml generado

La clave `version:` de nivel superior está obsoleta en la Compose Specification actual (Compose v2/v5) y se puede omitir:

```yaml
services:
  app:
    build: .
    image: hello-python:1.0
    ports:
      - "8080:8080"
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:8080/"]
      interval: 30s
      timeout: 3s
      retries: 3
```

## Levantar el servicio

```bash
docker compose up -d --build
```

## Acceder a la app

```
curl localhost:8080

          ##         .
    ## ## ##        ==
 ## ## ## ## ##    ===
/"""""""""""""""""\___/ ===
{                       /  ===-
\______ O           __/
 \    \         __/
  \____\_______/


Hello from Docker!
```

## 🏆 Reto extra

Corré `docker init` en una carpeta vacía nueva (fuera de este repo) apuntando a otro lenguaje que uses (Node, Go, PHP...) y compará el `Dockerfile` que te genera con el de `sample/`. ¿Qué prácticas se repiten (usuario sin privilegios, `HEALTHCHECK`, `.dockerignore`) sin importar el lenguaje? Esas son las que de verdad importa recordar.

