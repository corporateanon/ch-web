#!/bin/bash -e

REACT_APP_ENV=production npm run build
firebase --project=production functions:config:set application.env=production
firebase --project production deploy