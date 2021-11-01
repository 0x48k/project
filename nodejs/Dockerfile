FROM node:17-alpine as dev

ARG USER_ID=1000
ARG GROUP_ID=1000
ARG USER_ID=${USER_ID}
ARG GROUP_ID=${GROUP_ID}

RUN apk add --no-cache shadow \
    && usermod -u $USER_ID node \
    && groupmod -g $GROUP_ID node \
    && yarn config set --home enableTelemetry 0

USER node
WORKDIR /home/node/app

ENTRYPOINT []

FROM node:17-alpine as prod

COPY --chown=node:node ./ /home/node/app/
USER node
WORKDIR /home/node/app

RUN yarn config set --home enableTelemetry 0 \
    && yarn install --immutable --immutable-cache --check-cache

ENTRYPOINT []
