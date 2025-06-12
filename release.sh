#!/bin/sh

echo '================================================================'
echo 'NOTADO FRONTEND RELEASE'
echo '================================================================'


echo 'building'
yarn build-prod


# [REDACTED]
declare -x VERSION=$(jq -r '.version' package.json)

#echo 'git push origin v'${VERSION}
#
#git push origin v${VERSION}

echo '================================================================'
echo 'NOTADO FRONTEND RELEASE FIN'
echo '================================================================'
