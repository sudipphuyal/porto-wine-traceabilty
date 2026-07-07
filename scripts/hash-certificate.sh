#!/usr/bin/env bash
set -euo pipefail

file="${1:-fixtures/sample-ivdp-certificate.txt}"

if [[ ! -f "$file" ]]; then
  echo "File not found: $file" >&2
  exit 1
fi

if command -v shasum >/dev/null 2>&1; then
  digest="$(shasum -a 256 "$file" | awk '{print $1}')"
elif command -v sha256sum >/dev/null 2>&1; then
  digest="$(sha256sum "$file" | awk '{print $1}')"
else
  echo "No SHA-256 command found. Install shasum or sha256sum." >&2
  exit 1
fi

echo "sha256:${digest}"
