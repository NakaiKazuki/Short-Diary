#!/bin/zsh
set -e

docker-compose -f docker-compose-prod.yml down

git pull

docker-compose -f docker-compose-prod.yml build

docker-compose -f docker-compose-prod.yml up -d

docker rmi $(docker images -f "dangling=true" -q)

docker system prune -f