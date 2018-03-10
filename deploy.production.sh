#!/bin/bash -e

REACT_APP_ENV=production npm run build
cp keys/production.json functions/service-account.json
firebase deploy --project production