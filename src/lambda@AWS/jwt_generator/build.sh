#!/bin/bash

set -euo pipefail

# Set environment to production for the build
export NODE_ENV=production

# Build
webpack --config ./src/lambda@AWS/jwt_generator/webpack.config.js

# zip で圧縮
cd ./dist/jwt_generator && zip -r jwt_generator.zip index.js