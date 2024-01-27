#!/bin/bash

docker rm -f $(docker ps -a -q)
docker image prune -af
cd ..
docker compose up -d
