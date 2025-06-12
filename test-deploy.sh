#!/bin/sh

declare -x VERSION=$(jq -r '.version' package.json)

echo '================================================================'
echo 'NOTADO FRONTEND TEST DEPLOY ' ${VERSION}
echo '================================================================'

echo 'building'
yarn build-test

sshpass -p pwWR8Bes ssh root@31.31.73.39 "
    rm -rf /home/projects/notado/frontend/*
"

sshpass -p "pwWR8Bes" scp -rp ./build/* root@31.31.73.39:/home/projects/notado/frontend/


echo '================================================================'
echo 'NOTADO FRONTEND TEST DEPLOY FIN'
echo '================================================================'
