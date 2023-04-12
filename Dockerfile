FROM ruby:3.2.2-alpine3.17
ENV APP_ROOT /Short-Diary

WORKDIR $APP_ROOT

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

COPY Gemfile Gemfile.lock $APP_ROOT/

RUN gem install bundler -v 2.4.4 && \
    bundle install --verbose

COPY . $APP_ROOT
RUN mkdir -p $APP_ROOT/tmp/sockets $APP_ROOT/tmp/pids $APP_ROOT/log

EXPOSE 3001