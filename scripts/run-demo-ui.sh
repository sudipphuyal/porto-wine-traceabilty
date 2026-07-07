#!/usr/bin/env bash
set -euo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: node CLI not found on PATH." >&2
  exit 127
fi

node demo/server.js
