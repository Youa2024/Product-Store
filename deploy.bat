@echo off

set IMAGE=registry.ldblao.la/youa/ldb-border-report

set VERSION=%1

if defined VERSION GOTO :version_arg_exists

set VERSION=latest

:version_arg_exists

echo Building image: %IMAGE%:dev-%VERSION%

docker build -t %IMAGE%:dev-%VERSION%  --no-cache .
docker push %IMAGE%:dev-%VERSION%