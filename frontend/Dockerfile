FROM node:18.16-alpine3.17

ENV APP_ROOT /frontend

RUN apk update && \
    apk add --no-cache \
    zsh \
    yarn && \
    mkdir -p $APP_ROOT && \
    chown 1000:1000 $APP_ROOT

WORKDIR $APP_ROOT

COPY . .

EXPOSE 3000