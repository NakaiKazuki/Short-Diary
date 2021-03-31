#!/bin/sh
set -e

bundle exec rails_best_practices .

bundle exec rubocop -a

bundle exec brakeman -6 -A -w1

bundle exec rspec