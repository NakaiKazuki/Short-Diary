FROM node:14.16.1

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install -y \
    yarn

RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*

RUN mkdir /frontend

ENV APP_ROOT /frontend

WORKDIR $APP_ROOT

COPY . $APP_ROOT

EXPOSE 3000