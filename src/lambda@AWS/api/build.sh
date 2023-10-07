#!/bin/bash

set -euo pipefail

# Build
webpack --config ./src/lambda@AWS/api/webpack.config.js

# Configuration of Prisma to make it work on AWS Lambda
# https://kiririmode.hatenablog.jp/entry/20220619/1655622443
mkdir -p ./dist/api/node_modules/.prisma
mkdir -p ./dist/api/node_modules/prisma
mkdir -p ./dist/api/node_modules/@prisma/engines

cp -r ./node_modules/.prisma/client ./dist/api/node_modules/.prisma/client
cp -r ./node_modules/prisma/libquery_engine-linux-arm64-openssl-1.0.x.so.node ./dist/api/node_modules/prisma/
cp -r ./src/lambda@AWS/migration/node_modules/@prisma/engines/libquery_engine-linux-arm64-openssl-1.0.x.so.node ./dist/api/node_modules/@prisma/engines/
cp -r ./node_modules/@prisma/** ./dist/api/node_modules/@prisma/

# 容量削減のため、削除 (lambda の容量最大は 45MB ?)
rm -r ./dist/api/node_modules/.prisma/client/libquery_engine-linux-arm64-openssl-1.1.x.so.node
rm -r ./dist/api/node_modules/@prisma/engines/libquery_engine-linux-arm64-openssl-1.1.x.so.node

# zip で圧縮
cd ./dist/api && zip -r api.zip index.js node_modules
