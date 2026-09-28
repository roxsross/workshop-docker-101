# syntax=docker/dockerfile:1
FROM python:3.14-alpine

ENV FLASK_APP=flaskr \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

RUN chmod +x docker-entrypoint.sh \
    && mkdir -p instance \
    && addgroup -S app && adduser -S app -G app \
    && chown -R app:app /app
USER app

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:5000/ || exit 1

# El entrypoint corre "flask init-db" solo la primera vez (si no existe instance/flaskr.sqlite),
# para no volver a crear el esquema en cada arranque cuando el volumen ya persiste datos.
ENTRYPOINT ["./docker-entrypoint.sh"]

# gunicorn como servidor WSGI de producción en lugar de "flask run"
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "flaskr:create_app()"]
