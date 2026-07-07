#!/usr/bin/env bash
set -o errexit

bundle exec rails db:migrate

if [ "$(bundle exec rails runner 'print Item.count' 2>/dev/null)" = "0" ]; then
  bundle exec rails db:seed
fi
