# 02 — 🟩 App Node.js con Docker

Ahora subimos la apuesta: una app Express de verdad, con vistas, dependencias y su propio `package.json`. Vas a ver cómo un build multi-stage evita que tu imagen final termine pesando lo mismo que todo tu disco.

## 🎯 Qué vas a aprender

- Empaquetar una app Node/Express en una imagen liviana con build multi-stage.
- Por qué `npm ci` + `package-lock.json` te da builds 100% reproducibles.
- Separar el healthcheck de la lógica de negocio con un endpoint `/health` dedicado.
- Testear una app Express sin levantar Docker (con el test runner nativo de Node).

Imagen base: `node:24-alpine` (LTS "Krypton"). El `Dockerfile` usa build multi-stage, `npm ci` con `package-lock.json` para builds reproducibles, usuario sin privilegios y `HEALTHCHECK` contra un endpoint `/health` dedicado (separado de la home, que hace un render EJS).

## Tests

La app exporta `app` (sin llamar a `listen` fuera de ejecución directa) para poder testearla. Corre los tests con el test runner nativo de Node:

```bash
npm test
```

## Con Docker CLI

```bash
# Construir imagen de nodejs
docker build -t node-app:0.1 .
docker run -p 3000:3000 --name my-app node-app:0.1
```

## Con Docker Compose (recomendado)

```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```

## 🏆 Reto extra

1. Abrí `http://localhost:3000` y fijate que te muestra la IP de tu máquina — mirá `getIPv4Address()` en `app.js` para entender cómo la calcula.
2. Agregá una ruta nueva, por ejemplo `/adios` que responda con un mensaje tuyo, y un test en `app.test.js` que la verifique.
3. Corré `npm test` (sin Docker) y después `docker compose up -d --build` para confirmar que funciona igual dentro del contenedor. Si ambos pasan, ya entendiste la gracia de poder testear la app "desnuda" antes de empaquetarla.
