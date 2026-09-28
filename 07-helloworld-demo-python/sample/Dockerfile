# syntax=docker/dockerfile:1
FROM python:3.14-alpine

WORKDIR /app
COPY . /app

RUN addgroup -S app && adduser -S app -G app \
    && chown -R app:app /app
USER app

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ || exit 1

CMD ["python3", "app.py"]
