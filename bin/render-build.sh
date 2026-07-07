#!/usr/bin/env bash
set -o errexit

bundle install
npm run build
