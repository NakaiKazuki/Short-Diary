#!/bin/sh
set -e

git pll

docker-compose -f docker-compose-prod.yml build --no-cache

docker-compose -f docker-compose-prod.yml up -d

docker rmi $(docker images -f "dangling=true" -q)