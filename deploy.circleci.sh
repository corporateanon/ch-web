#!/bin/bash -eo pipefail

BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "======================================"
echo "| Running CircleCI deployment script |"
echo "|          Lord help us...           |"
echo "======================================"
echo

if [ "$BRANCH" = "deploy/production" ]; then 
    ./deploy.production.sh
    exit 0
fi;

if [ "$BRANCH" = "deploy/staging" ]; then 
    ./deploy.staging.sh
    exit 0
fi;

echo "Branch '$BRANCH' is not set up for deployment"