FROM node:14.16.1-alpine3.13

RUN apk update && apk add --no-cache \
    zsh \
    yarn

RUN mkdir -p /var/www/frontend

ENV APP_ROOT /var/www/frontend

WORKDIR $APP_ROOT

COPY . $APP_ROOT

EXPOSE 3000