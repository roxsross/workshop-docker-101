# Flaskr - App Flask con blog/auth

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

> ⚠️ Solo para fines demostrativos: la imagen ejecuta `flask init-db` durante el build, por lo que la base de datos SQLite queda "horneada" dentro de la imagen (no persiste entre rebuilds). Tampoco definas `SECRET_KEY="dev"` (valor por defecto del tutorial de Flask) en un entorno real — sobreescribilo con una variable de entorno o `instance/config.py`.

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
