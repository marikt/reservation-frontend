#!/bin/sh

# [REDACTED] - bitbucket app password

declare -x VERSION=$(jq -r '.version' package.json)

echo '================================================================'
echo 'NOTADO FRONTEND DEPLOY ' ${VERSION}
echo '================================================================'

echo 'delete old version'

ssh -i /Users/tomas/.ssh/id_rsa tommarik15@34.159.198.249  "
   sudo find /home/tommarik15/notado/frontend/ -mindepth 1 ! -name '.htaccess' -delete
"

echo 'copy new version'

sudo rsync -avz -e "ssh -i /Users/tomas/.ssh/id_rsa" /Users/tomas/Workspace/notado/reservation-frontend/build/browser/ tommarik15@34.159.198.249:/home/tommarik15/notado/frontend/
sudo rsync -avz -e "ssh -i /Users/tomas/.ssh/id_rsa" /Users/tomas/Workspace/notado/reservation-frontend/build/browser/media/ tommarik15@34.159.198.249:/home/tommarik15/notado/frontend/
sudo rsync -avz -e "ssh -i /Users/tomas/.ssh/id_rsa" /Users/tomas/Workspace/notado/reservation-frontend/build/browser/assets/ tommarik15@34.159.198.249:/home/tommarik15/notado/frontend/assets/
sudo rsync -avz -e "ssh -i /Users/tomas/.ssh/id_rsa" /Users/tomas/Workspace/notado/reservation-frontend/build/browser/resources/ tommarik15@34.159.198.249:/home/tommarik15/notado/frontend/resources/


echo '================================================================'
echo 'NOTADO FRONTEND DEPLOY FIN'
echo '================================================================'
