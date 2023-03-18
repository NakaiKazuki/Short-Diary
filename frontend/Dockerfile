FROM node:18.13-alpine3.16

ENV APP_ROOT /frontend

RUN apk update && \
    apk add --no-cache \
    zsh \
    yarn && \
    addgroup -S app && \
    adduser -S -G app app && \
    mkdir -p $APP_ROOT && chown -R app:app $APP_ROOT

WORKDIR $APP_ROOT

COPY . .

EXPOSE 3000