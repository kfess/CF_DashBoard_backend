#!/bin/bash

set -euo pipefail

# Build
webpack --config ./src/lambda@AWS/jwt_generator/webpack.config.js