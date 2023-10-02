#!/bin/bash

set -euo pipefail

# Compile
tsc -p ./tsconfig.daily_update.json

mv ./dist/daily_update/lambda@AWS/daily_update/* ./dist/daily_update/

# move prisma directory
cp -r ./src/prisma ./dist/daily_update/

# Remove unnecessary files
rm -r ./dist/daily_update/lambda@AWS