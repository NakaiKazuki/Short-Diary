#!/bin/sh
set -e

bundle exec rails db:migrate

bundle exec pumactl start