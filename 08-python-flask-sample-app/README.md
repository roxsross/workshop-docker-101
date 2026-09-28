# 08 — 📝 Flaskr: un mini blog con Flask

El ejercicio más "completo" del repo: una app real con registro, login y posts, no solo un "Hello World". Ideal para ver cómo se dockeriza algo que se parece a un producto de verdad.

## 🎯 Qué vas a aprender

- Dockerizar una app Flask servida con Gunicorn (no `flask run`, que es solo para desarrollo).
- Por qué "hornear" una base de datos dentro de la imagen es una mala idea, y cómo evitarlo con un volumen + un entrypoint inteligente.
- Registrarte, loguearte y publicar en un blog que corre 100% en tu contenedor.

Ejemplo basado en el tutorial oficial de Flask ("flaskr"): una app de blog con registro/login de usuarios, servida con Gunicorn dentro del contenedor.

## Ejecutar sin Docker (entorno local)

Crear un virtualenv y activarlo:

```bash
python3 -m venv venv
. venv/bin/activate
```

En Windows cmd:

```cmd
py -3 -m venv venv
venv\Scripts\activate.bat
```

Instalar Flaskr:

```bash
pip install -e .
```

> Nota: la variable `FLASK_ENV` fue eliminada en Flask 2.3+; usa `FLASK_DEBUG` en su lugar.

Ejecutar:

```bash
export FLASK_APP=flaskr
export FLASK_DEBUG=1
flask init-db
flask run
```

En Windows cmd:

```cmd
set FLASK_APP=flaskr
set FLASK_DEBUG=1
flask init-db
flask run
```

Abrir http://127.0.0.1:5000 en el navegador.

## Instrucciones Docker

Imagen base: `python:3.14-alpine`. El `Dockerfile` corre como usuario sin privilegios, expone un `HEALTHCHECK` y sirve la app con `gunicorn` (servidor WSGI de producción) en lugar de `flask run`.

La base de datos SQLite vive en `instance/flaskr.sqlite`, montado como volumen nombrado (`flaskr-instance`) para que persista entre `docker compose down`/`up`. Un `docker-entrypoint.sh` corre `flask init-db` automáticamente solo la primera vez (si el archivo todavía no existe en el volumen); en rebuilds o restarts posteriores tus datos se mantienen.

> ⚠️ No definas `SECRET_KEY="dev"` (valor por defecto del tutorial de Flask) en un entorno real — sobreescribilo con una variable de entorno o `instance/config.py`.

### Con Docker CLI

Para construir la imagen:

```bash
docker build . -t flaskr:1.0.0
```

Para correr el contenedor:

```bash
docker run -p 5000:5000 flaskr:1.0.0
```

y visitar http://localhost:5000 en el navegador.

Para ejecutar una shell dentro del contenedor:

```bash
docker run -it flaskr:1.0.0 /bin/sh
```

### Con Docker Compose (recomendado)

```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```

## 🏆 Reto extra

1. Abrí `http://localhost:5000`, registrate y escribí tu primer post en el blog.
2. Corré `docker compose down` (sin `-v`) y `docker compose up -d` de nuevo. Tu post debería seguir ahí — gracias al volumen `flaskr-instance`.
3. Metete dentro del contenedor y mirá la base de datos con tus propios ojos:

```bash
docker compose exec server python3 -c "
import sqlite3
con = sqlite3.connect('instance/flaskr.sqlite')
print(con.execute('SELECT username FROM user').fetchall())
"
```

