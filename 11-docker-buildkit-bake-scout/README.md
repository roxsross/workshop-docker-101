# 11 - BuildKit, Bake y Docker Scout

Ejercicio nuevo enfocado en herramientas de build/seguridad modernas del ecosistema Docker (2026): **BuildKit cache mounts**, **`docker buildx bake`** y **Docker Scout**.

## 1. Cache mounts de BuildKit

El `Dockerfile` usa `RUN --mount=type=cache,target=/root/.npm` para que `npm ci` reutilice la caché de paquetes entre builds, aunque el `package.json` no haya cambiado de capa base. Esto acelera mucho builds repetidos (típico en CI).

```bash
# BuildKit viene habilitado por defecto desde hace años en Docker Engine/Desktop
docker build -t buildkit-demo:1.0 .

# Vuelve a construir tras tocar un archivo: la instalación de dependencias
# reutiliza la caché de /root/.npm en vez de descargar todo de nuevo
docker build -t buildkit-demo:1.0 .
```

## 2. `docker buildx bake`

`docker-bake.hcl` define el target `app`, con tags y **build multi-plataforma** (`linux/amd64` + `linux/arm64`) en un solo archivo declarativo, en vez de recordar flags largos de `docker build`.

```bash
# Crea (una sola vez) un builder que soporte multi-plataforma
docker buildx create --name multiarch --use

# Construye usando el bake file (usa los defaults del archivo)
docker buildx bake

# Sobrescribe variables desde la línea de comandos
docker buildx bake --set app.args.TAG=2.0.0

# Bake + push directo a un registro
docker buildx bake --push
```

## 3. Docker Scout: escaneo de vulnerabilidades

Docker Scout viene integrado en el CLI (`docker scout`) y genera SBOMs automáticamente para las imágenes construidas localmente.

```bash
# Vista rápida de vulnerabilidades de la imagen
docker scout quickview buildkit-demo:1.0

# Detalle de CVEs
docker scout cves buildkit-demo:1.0

# Recomendaciones de imagen base más segura/liviana
docker scout recommendations buildkit-demo:1.0

# Comparar dos versiones de la misma imagen
docker scout compare buildkit-demo:1.0 --to buildkit-demo:2.0.0
```

## Por qué importa

- Los cache mounts evitan reinstalar dependencias en cada build → CI más rápido.
- Bake reemplaza scripts de shell frágiles para builds multi-imagen/multi-plataforma.
- Scout te dice, imagen por imagen, qué CVEs tienes y cómo corregirlas antes de llegar a producción.
