#!/bin/sh
set -e

DB_PATH="/app/instance/flaskr.sqlite"

if [ ! -f "$DB_PATH" ]; then
  echo "No existe $DB_PATH todavía: inicializando la base de datos..."
  flask init-db
fi

exec "$@"
