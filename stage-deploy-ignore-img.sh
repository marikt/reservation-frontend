#!/bin/sh

# [REDACTED] - bitbucket app password

declare -x VERSION=$(jq -r '.version' package.json)

echo '================================================================'
echo 'NOTADO FRONTEND DEPLOY ' ${VERSION}
echo '================================================================'

echo 'delete old version except /resources and /media folders'

ssh -i /Users/tomas/.ssh/id_rsa tommarik15@34.159.198.249 "
    sudo find /home/tommarik15/stage-notado/frontend/ -mindepth 1 \
        ! -path '/home/tommarik15/stage-notado/frontend/resources/*' \
        ! -path '/home/tommarik15/stage-notado/frontend/media/*' \
        ! -name 'resources' \
        ! -name 'media' \
        ! -name '.htaccess' \
        -delete
"

echo 'copy new version except /resources and /media folders'

sudo rsync -avz --exclude 'resources/' --exclude 'media/' \
    -e "ssh -i /Users/tomas/.ssh/id_rsa" \
    /Users/tomas/Workspace/notado/reservation-frontend/build/browser/ \
    tommarik15@34.159.198.249:/home/tommarik15/stage-notado/frontend/

# Optional: re-sync assets if needed
sudo rsync -avz -e "ssh -i /Users/tomas/.ssh/id_rsa" \
    /Users/tomas/Workspace/notado/reservation-frontend/build/browser/assets/ \
    tommarik15@34.159.198.249:/home/tommarik15/stage-notado/frontend/assets/

echo '================================================================'
echo 'NOTADO FRONTEND DEPLOY FIN'
echo '================================================================'
