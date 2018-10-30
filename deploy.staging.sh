#!/bin/bash -e

firebase --project=staging functions:config:set application.env=staging --token=$FIREBASE_DEPLOY_TOKEN
firebase --project staging deploy --token=$FIREBASE_DEPLOY_TOKEN