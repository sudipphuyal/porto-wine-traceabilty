#!/usr/bin/env bash
set -euo pipefail

if ! command -v dpm >/dev/null 2>&1; then
  echo "ERROR: dpm CLI not found on PATH. See SETUP_REQUIRED.md." >&2
  exit 127
fi

dpm build
dpm script --ide-ledger --static-time --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:endToEnd
dpm script --ide-ledger --static-time --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:recallScenario
dpm script --ide-ledger --static-time --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:negativeTests
