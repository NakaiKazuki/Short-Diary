FROM node:18.13-alpine3.16

RUN apk update && apk add --no-cache \
    zsh \
    yarn

RUN mkdir -p /frontend

ENV APP_ROOT /frontend

WORKDIR $APP_ROOT

COPY package.json $APP_ROOT

RUN yarn install --frozen-lockfile --non-interactive --production=false --ignore-scripts

COPY . $APP_ROOT

EXPOSE 3000