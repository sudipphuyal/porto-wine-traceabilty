#!/usr/bin/env bash
set -euo pipefail

if ! command -v canton >/dev/null 2>&1; then
  echo "ERROR: canton CLI not found on PATH. See SETUP_REQUIRED.md." >&2
  exit 127
fi

canton -c canton/canton.conf
