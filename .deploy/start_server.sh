#!/bin/sh

ssh root@188.68.208.249 '
cd fiber
docker-compose down
docker pull chepurkoaleksei/clothes_layout
docker-compose up
'
