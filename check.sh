#!/bin/zsh

bundle exec rails_best_practices . &&
bundle exec brakeman -6 -A -w1 --skip-files frontend --no-pager &&
bundle exec bundle-audit check --update &&
bundle exec rubocop -a &&
bundle exec rspec