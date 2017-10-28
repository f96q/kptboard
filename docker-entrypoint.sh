#!/bin/bash

set -e

PARAMETER_STORE_PREFIX=${PARAMETER_STORE_PREFIX:-}

if [ -n "$PARAMETER_STORE_PREFIX" ]; then
  export SECRET_KEY_BASE=$(aws ssm get-parameters --name ${PARAMETER_STORE_PREFIX}.secret.key.base --with-decryption --query "Parameters[0].Value" --output text)
  export DATABASE_URL=$(aws ssm get-parameters --name ${PARAMETER_STORE_PREFIX}.database.url --with-decryption --query "Parameters[0].Value" --output text)
  export RAILS_LOG_TO_STDOUT=true
  export RAILS_SERVE_STATIC_FILES=true
fi

exec "$@"
