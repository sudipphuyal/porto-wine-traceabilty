#!/usr/bin/env bash
set -euo pipefail

if ! command -v dpm >/dev/null 2>&1; then
  echo "ERROR: dpm CLI not found on PATH. See SETUP_REQUIRED.md." >&2
  exit 127
fi

dpm sandbox
