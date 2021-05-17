#!/bin/sh
set -e

docker-compose -f docker-compose-prod.yml build --no-cache

docker-compose -f docker-compose-prod.yml up -d