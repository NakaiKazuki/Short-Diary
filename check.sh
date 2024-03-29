#!/bin/zsh

bundle exec rails_best_practices . &&
bundle exec brakeman -7 -A -w1 --no-pager &&
bundle exec bundle-audit check --update &&
bundle exec rubocop -a &&
bundle exec rspec