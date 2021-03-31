FROM ruby:3.0.0

RUN apt-get update -qq && apt-get install -y \
    build-essential \
    imagemagick \
    vim

RUN apt-get clean

RUN rm -rf /var/lib/apt/lists/*

RUN mkdir /Short-Diary

ENV APP_ROOT /Short-Diary

WORKDIR $APP_ROOT

COPY Gemfile $APP_ROOT/Gemfile
COPY Gemfile.lock $APP_ROOT/Gemfile.lock

RUN gem install bundler
RUN bundle install

COPY . $APP_ROOT
RUN mkdir -p tmp/sockets

EXPOSE 3001