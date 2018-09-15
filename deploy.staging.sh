#!/bin/bash -e

REACT_APP_ENV=staging npm run build
firebase --project=staging functions:config:set application.env=staging
firebase --project staging deploy