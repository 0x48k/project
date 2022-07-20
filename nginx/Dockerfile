FROM nginx:1.23.0-alpine as dev

RUN rm /etc/nginx/conf.d/default.conf \
    && apk add --no-cache openssl

COPY ./dev.conf /etc/nginx/conf.d/
COPY ./cert.crt /etc/ssl/certs/
COPY ./cert.key /etc/ssl/private/
