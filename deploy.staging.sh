#!/bin/bash -e

REACT_APP_ENV=staging npm run build
cp keys/staging.json functions/service-account.json
firebase deploy --project staging