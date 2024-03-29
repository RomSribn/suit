#!/bin/sh

ssh root@$SERVER "
cd clothes
git checkout develop
git pull origin develop
docker build . -t fiber/clothes --build-arg ssh_prv_key=\"$(cat ~/.ssh/id_rsa)\" --build-arg ssh_pub_key=\"$(cat ~/.ssh/id_rsa.pub)\" --build-arg ssh_known_hosts=\"$(cat ~/.ssh/known_hosts)\"
docker-compose down
docker-compose up -d
docker system prune -f
"
