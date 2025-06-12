#!/bin/bash

declare -x VERSION=$(jq -r '.version' package.json)

echo releasing $VERSION

yarn install
yarn build-prod
git tag $VERSION
git push origin --tags
ssh root@31.31.74.54  'rm -rf /home/notado/notado-frontend/*'
scp -rp ./build/* ssh root@31.31.74.54:/home/notado/notado-frontend/

