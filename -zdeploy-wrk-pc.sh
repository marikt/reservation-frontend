#!/bin/sh

# [REDACTED] - bitbucket app password

declare -x VERSION=$(jq -r '.version' package.json)

echo '================================================================'
echo 'NOTADO FRONTEND DEPLOY ' ${VERSION}
echo '================================================================'

echo 'delete old version'

ssh -i /Users/tomas.marik/.ssh/id_rsa tommarik15@34.159.198.249 "
    sudo rm -rf /home/tommarik15/notado/frontend/*
"

echo 'copy new version'

scp -i /Users/tomas.marik/.ssh/id_rsa -r ./build/* tommarik15@34.159.198.249:/home/tommarik15/notado/frontend/


echo '================================================================'
echo 'NOTADO FRONTEND DEPLOY FIN'
echo '================================================================'
