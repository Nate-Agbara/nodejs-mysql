#!/bin/sh
# Script to start wallet-app

LOG_DIR=./logs

set -e

npm install --no-audit --quiet

mkdir -p ${LOG_DIR}
npm run start
