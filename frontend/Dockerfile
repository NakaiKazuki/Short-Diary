FROM node:18.13-alpine3.16

ENV APP_ROOT /frontend

RUN apk update && \
    apk add --no-cache \
    zsh \
    yarn && \
    mkdir -p $APP_ROOT

WORKDIR $APP_ROOT

COPY . .

EXPOSE 3000