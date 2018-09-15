#!/bin/bash -e

REACT_APP_ENV=production npm run build
firebase --project=production functions:config:set application.env=production --token=$FIREBASE_DEPLOY_TOKEN
firebase --project production deploy --token=$FIREBASE_DEPLOY_TOKEN