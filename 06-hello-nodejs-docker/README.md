# 06 — 🎉 Hello Node.js con Docker (¡con animación!)

Este es el ejercicio más "chico" del repo en código, pero el más divertido de abrir en el navegador. Levantalo, clickeá el título, y mirá las estrellitas volar. Todo eso corriendo dentro de un contenedor Docker.

## 🎯 Qué vas a aprender

- Dockerizar una app Express que sirve HTML + assets estáticos (JS/CSS).
- Por qué depender de CDNs externos puede romper tu demo justo cuando no tenés wifi (y cómo evitarlo).
- Leer un valor (la versión de tu app) desde `package.json` en tiempo de arranque.

Pequeña app Express que sirve `index.html` y muestra la versión leída desde `package.json`. Antes este ejercicio no tenía `Dockerfile`; ahora sí, con build multi-stage sobre `node:24-alpine`, usuario sin privilegios y `HEALTHCHECK` contra un endpoint `/health` dedicado.

La animación (estrellas + título) está hecha en JavaScript y CSS puro — antes dependía de jQuery, GSAP, Underscore.js y Font Awesome cargados desde CDNs externos, lo que rompía la demo sin conexión a internet.

## Con Docker CLI

```bash
docker build -t hello-node:1.0 .
docker run -p 4000:4000 --name hello-node hello-node:1.0
curl http://localhost:4000
```

## Con Docker Compose

```bash
docker compose up -d --build
docker compose logs -f
docker compose down
```

## 🏆 Reto extra

Abrí `http://localhost:4000` y clickeá varias veces el título "Congratulations!" — cada click reinicia la animación con valores random (mirá `public/site.js`, función `animateBlobs`). Después probá cambiar `NUM_STARS` a 100 en ese mismo archivo, reconstruí la imagen (`docker compose up -d --build`) y refrescá. ¿Aguanta el navegador? Es una forma entretenida de ver en vivo el ciclo completo: editás código → reconstruís imagen → el contenedor sirve la versión nueva.
