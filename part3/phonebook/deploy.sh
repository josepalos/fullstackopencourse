#!/bin/bash
set -e
APP="safe-escarpment-58737"

heroku stack:set container -a ${APP}
heroku container:push web -a ${APP}
heroku container:release web -a ${APP}