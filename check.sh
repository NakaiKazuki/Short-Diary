#!/bin/sh
set -e

bundle exec rails_best_practices .

bundle exec brakeman -6 -A -w1 --skip-files frontend/

bundle exec bundle-audit check --update

bundle exec rubocop

bundle exec rspec
