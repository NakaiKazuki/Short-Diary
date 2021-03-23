#!/bin/sh
set -e

bundle exec rubocop

bundle exec brakeman -6 -A -w1

bundle exec rspec