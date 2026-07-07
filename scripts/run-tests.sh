#!/usr/bin/env bash
set -euo pipefail

if ! command -v daml >/dev/null 2>&1; then
  echo "ERROR: daml CLI not found on PATH. See SETUP_REQUIRED.md." >&2
  exit 127
fi

daml build
daml script --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:endToEnd
daml script --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:recallScenario
daml script --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:negativeTests
