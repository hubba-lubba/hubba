#!/bin/bash

docker rm -f user-service
docker rm -f web-service
docker rm -f events-service
docker rm -f hubba-db
docker image prune -af

APP_ROOT=$(dirname $(dirname $(readlink -fm $0)))
cd $APP_ROOT

docker compose up -d
