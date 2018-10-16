#!/bin/bash -e

firebase --project staging deploy --only database --token=$FIREBASE_DEPLOY_TOKEN