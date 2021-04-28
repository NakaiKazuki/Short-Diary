FROM node:14.16.1-alpine3.13

RUN apk update && apk add --no-cache \
    zsh \
    yarn

RUN mkdir /frontend

ENV APP_ROOT /frontend

WORKDIR $APP_ROOT

COPY . $APP_ROOT

EXPOSE 3000