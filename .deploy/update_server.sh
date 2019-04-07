#!/bin/sh

if [[ $CLOTHES_API = "" ]]
then
    echo You need to provide CLOTHES_API env var
    exit
fi

ssh root@188.68.208.249 "
cd clothes
git pull
docker build . -t fiber/clothes --build-arg clothes_api=$CLOTHES_API --build-arg ssh_prv_key=\"$(cat ~/.ssh/id_rsa)\" --build-arg ssh_pub_key=\"$(cat ~/.ssh/id_rsa.pub)\" --build-arg ssh_known_hosts=\"$(cat ~/.ssh/known_hosts)\"
docker-compose down
docker-compose up -d
docker system prune -f
"
