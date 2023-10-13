FROM nginx:alpine

LABEL org.opencontainers.image.description="roxs-tetris-games" \
      org.opencontainers.image.authors="RoxsRoss" 

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
COPY . /usr/share/nginx/html