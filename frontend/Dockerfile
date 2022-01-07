FROM node:16.13.1-alpine3.12

RUN apk update && apk add --no-cache \
    zsh \
    yarn

RUN mkdir -p /frontend

ENV APP_ROOT /frontend

WORKDIR $APP_ROOT

COPY . $APP_ROOT

EXPOSE 3000