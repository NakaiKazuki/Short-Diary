FROM ruby:3.2.0-alpine3.17

ENV APP_ROOT /Short-Diary

RUN apk update && apk add --no-cache \
    libxml2-dev \
    curl-dev \
    make \
    gcc \
    g++ \
    git \
    libc-dev \
    mysql-client \
    mysql-dev \
    tzdata \
    zsh \
    vim  && \
    mkdir -p $APP_ROOT

WORKDIR $APP_ROOT

COPY Gemfile Gemfile.lock $APP_ROOT/

RUN gem install bundler -v 2.4.4 && \
    bundle install --verbose

COPY . $APP_ROOT
RUN mkdir -p tmp/sockets tmp/pids log

EXPOSE 3001
