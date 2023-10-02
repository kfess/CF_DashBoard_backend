#!/bin/bash

set -euo pipefail

# Compile
tsc -p ./tsconfig.migration.json

# move node_modules
cp -r ./src/lambda@AWS/migration/node_modules ./dist/migration/

# move prisma directory
cp -r ./src/prisma ./dist/migration/
