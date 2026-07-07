#!/usr/bin/env bash
set -euo pipefail

if ! command -v dpm >/dev/null 2>&1; then
  echo "ERROR: dpm CLI not found on PATH. See SETUP_REQUIRED.md." >&2
  exit 127
fi

./scripts/run-tests.sh

cat <<'MSG'
E2E Daml Script scenarios completed.
For a Canton-backed ledger run, start Canton with ./scripts/run-canton-local.sh,
then adapt dpm script --ledger-host/--ledger-port to the participant Ledger API port exposed by the installed Canton version.
MSG
