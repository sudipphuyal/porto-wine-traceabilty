#!/usr/bin/env bash
set -euo pipefail

mkdir -p evidence
stamp="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
out="evidence/run-${stamp}.log"

{
  echo "timestamp_utc=${stamp}"
  echo "pwd=$(pwd)"
  echo "dpm_version=$(dpm --version 2>&1 || true)"
  echo "sdk_version=$(dpm version --active 2>&1 || true)"
  echo "sandbox_help_first_lines=$(dpm sandbox --help 2>&1 | head -20 || true)"
  echo
  echo "Running tests:"
  ./scripts/run-tests.sh
} | tee "$out"

echo "Evidence log written to $out"
