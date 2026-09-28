# Workshop Docker 101
Time to Demo by RoxsRoss


Docker es una plataforma de código abierto diseñada para facilitar la creación, implementación y administración de aplicaciones y servicios en contenedores. Los contenedores son entornos ligeros y portátiles que pueden incluir aplicaciones y todas sus dependencias, lo que los hace ideales para garantizar que las aplicaciones funcionen de manera consistente en diferentes entornos, desde el desarrollo hasta la producción.

### Algunos conceptos clave de Docker incluyen:

- Contenedor: Un contenedor es una instancia ejecutable de una aplicación junto con todas las dependencias y configuraciones necesarias para que funcione. Los contenedores son aislados entre sí y del sistema operativo subyacente, lo que garantiza la consistencia y la portabilidad de las aplicaciones.

- Imagen de Docker: Una imagen de Docker es una plantilla que contiene una aplicación y sus dependencias. Las imágenes se utilizan para crear contenedores. Puedes pensar en una imagen como una instantánea de una aplicación lista para ejecutarse.

- Dockerfile: Un Dockerfile es un archivo de configuración que define cómo se debe construir una imagen de Docker. Contiene instrucciones para copiar archivos, instalar software y configurar la imagen.

- Registro de Docker: Un registro de Docker es un repositorio en línea donde puedes almacenar y compartir imágenes de Docker. Docker Hub es un registro público muy conocido, pero también puedes configurar registros privados para tu organización.

- Orquestación de contenedores: Docker se utiliza comúnmente en combinación con herramientas de orquestación de contenedores como Docker Swarm o Kubernetes para administrar y escalar aplicaciones en contenedores en entornos de producción.

Docker ha revolucionado la forma en que se desarrollan y despliegan aplicaciones, ya que permite a los desarrolladores empacar una aplicación y todas sus dependencias en un contenedor, lo que facilita la ejecución de aplicaciones de manera consistente en diferentes entornos, desde las estaciones de trabajo de desarrollo hasta los servidores de producción. Esto ha mejorado la portabilidad, la escalabilidad y la eficiencia de desarrollo y despliegue de aplicaciones.

## 🔥 Actualizado (2026)

Todos los ejercicios fueron revisados y modernizados: imágenes base actuales (`node:24-alpine`, `python:3.14-alpine`, `nginx:1.30-alpine`, `mysql:8.4`, `mediawiki:1.46`), `Dockerfile` con builds multi-stage, usuario sin privilegios y `HEALTHCHECK`, y `docker-compose.yaml` (Compose v2/v5, sin la clave `version:` obsoleta) donde antes solo había comandos sueltos de `docker run`. Se agregaron además dos ejercicios nuevos sobre herramientas actuales del ecosistema Docker.

| # | Ejercicio | Qué muestra |
|---|-----------|-------------|
| 01 | [demo-nginx-docker](01-demo-nginx-docker/) | Nginx básico, imagen oficial vs. build propio |
| 02 | [demo-app-nodejs-docker](02-demo-app-nodejs-docker/) | App Node/Express, build multi-stage |
| 03 | [demo-db-mysql](03-demo-db-mysql/) | MySQL con volumen nombrado y seed de datos |
| 04 | [demo-db-mysql-phpadmin](04-demo-db-mysql-phpadmin/) | MySQL + phpMyAdmin en red de Compose |
| 05 | [mediawiki](05-mediawiki/) | Tags de imagen y versiones, stack con base de datos |
| 06 | [hello-nodejs-docker](06-hello-nodejs-docker/) | App Express mínima (antes sin `Dockerfile`) |
| 07 | [helloworld-demo-python](07-helloworld-demo-python/) | `docker init` con Python |
| 08 | [python-flask-sample-app](08-python-flask-sample-app/) | App Flask con blog/auth, servida con Gunicorn |
| 09 | [tetris](09-tetris/) | Sitio estático servido con Nginx |
| 10 | [docker-compose-avanzado](10-docker-compose-avanzado/) | **Nuevo:** `healthcheck` + `depends_on: condition`, `profiles`, `.env`, `docker compose watch` |
| 11 | [docker-buildkit-bake-scout](11-docker-buildkit-bake-scout/) | **Nuevo:** cache mounts de BuildKit, `docker buildx bake`, `docker scout` |

Consulta también la carpeta [doc/](doc/) para comandos de Docker y guías de instalación.

---
![](https://github.com/roxsross/roxsross/blob/main/images/roxsross-banner-1.png)

##### Nos Vemos 🔥🔥🔥🔥


---
---
<p align="left" width="100%">
  <br>
    <img width="20%" src="https://raw.githubusercontent.com/roxsross/roxsross/main/images/Copia de ROXSROSS FINAL (1).png"> 
</p>

⌨️ con ❤️ por [roxsross](https://github.com/roxsross) 😊

"No se trata de cambiar el mundo, creo que creas un cambio pequeño, pero que te importe estás cambiando las cosas".


[![site](https://img.shields.io/badge/Hashnode-2962FF?style=for-the-badge&logo=hashnode&logoColor=white&link=https://blog.295devops.com) ](https://blog.295devops.com)
[![Blog](https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white&link=https://dev.to/roxsross)](https://dev.to/roxsross)
![Twitter](https://img.shields.io/twitter/follow/roxsross?style=for-the-badge)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/roxsross/)](https://www.linkedin.com/in/roxsross/)
[![Instagram Badge](https://img.shields.io/badge/-Instagram-purple?style=for-the-badge&logo=instagram&logoColor=white&link=https://www.instagram.com/roxsross)](https://www.instagram.com/roxsross/)
[![Youtube Badge](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white&link=https://www.youtube.com/channel/UCa-FcaB75ZtqWd1YCWW6INQ)](https://www.youtube.com/channel/UCa-FcaB75ZtqWd1YCWW6INQ)