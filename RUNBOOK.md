# Porto Wine Traceability runbook

This is a Daml/DPM project, not a Python project, so dependencies are recorded here instead of in `requirements.txt`.

## Dependencies

- macOS or Linux shell.
- Java available on `PATH`.
- Digital Asset Package Manager (`dpm`) and Daml SDK `3.5.2`.
- Optional: standalone Canton distribution if you want to adapt `canton/canton.conf`. The self-contained local demo uses `dpm script --ide-ledger`.

Official DPM documentation: <https://docs.digitalasset.com/build/3.4/dpm/dpm.html>

## First-time setup

### Step 1: install DPM

Run:

```bash
curl -fsSL https://get.digitalasset.com/install/install.sh | sh
```

Expected:

```text
Successfully installed Dpm.
Please add ".../.dpm/bin" to your PATH
```

### Step 2: add DPM to PATH

Run:

```bash
echo 'export PATH="$HOME/.dpm/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Expected:

```bash
command -v dpm
```

prints a path similar to:

```text
/Users/<you>/.dpm/bin/dpm
```

### Step 3: verify the SDK version

Run from the repository root:

```bash
dpm version --active
```

Expected:

```text
3.5.2
```

If it is missing, run:

```bash
dpm install 3.5.2
```

## Run and demonstrate

### Step 1: enter the project

Run:

```bash
cd /Users/sudipphuyal/Developments/porto-wine-traceability
```

Expected:

```bash
pwd
```

prints:

```text
/Users/sudipphuyal/Developments/porto-wine-traceability
```

### Step 2: build and run all scenarios

Run:

```bash
./scripts/run-tests.sh
```

Expected:

```text
Created .daml/dist/porto-wine-traceability-0.1.0.dar
WineTraceability.Test:endToEnd SUCCESS
WineTraceability.Test:recallScenario SUCCESS
WineTraceability.Test:negativeTests SUCCESS
```

What to say while demonstrating:

- `endToEnd`: registers batch `PW-2026-0042`, transfers custody, records production, requests and issues IVDP certification, moves through logistics/retail, and lets a consumer verify public QR provenance.
- `recallScenario`: proves IVDP can recall a certified batch and that recalled batches cannot continue custody transfer.
- `negativeTests`: proves invalid IDs, blank grape variety, future harvest dates, unauthorized certification/recall, rejected/recalled transfers, and wrong QR scans are rejected.

### Step 3: show the certificate hash

Run:

```bash
./scripts/hash-certificate.sh
```

Expected:

```text
sha256:b7ebf0110fed92f9fb03fbd2ed2da8a6f46ecd42503542cc814f6ced2db82b21
```

What to say: the certificate itself can remain off-chain, while the immutable SHA-256 hash is stored/checked by the smart-contract workflow.

### Step 4: run the short E2E wrapper

Run:

```bash
./scripts/run-e2e.sh
```

Expected:

```text
WineTraceability.Test:endToEnd SUCCESS
WineTraceability.Test:recallScenario SUCCESS
WineTraceability.Test:negativeTests SUCCESS
E2E Daml Script scenarios completed.
```

### Step 5: capture evidence

Run:

```bash
./scripts/capture-evidence.sh
```

Expected:

```text
Evidence log written to evidence/run-<UTC timestamp>.log
```

Open the generated log and show:

- UTC timestamp.
- DPM version and active SDK.
- DAR build output.
- `endToEnd SUCCESS`.
- `recallScenario SUCCESS`.
- `negativeTests SUCCESS`.

### Step 6: optional local sandbox

Run:

```bash
./scripts/run-canton-local.sh
```

Expected: a local DPM sandbox process starts and keeps running until stopped.

For an assessed Canton Domain / Synchronizer demonstration, validate `canton/canton.conf` against the exact standalone Canton version you install, then run scripts against that participant Ledger API using `dpm script --ledger-host ... --ledger-port ...`.

## Troubleshooting

- `dpm: command not found`: add `export PATH="$HOME/.dpm/bin:$PATH"` to your shell config and reopen the terminal.
- `SDK_NOT_INSTALLED`: run `dpm install 3.5.2` from outside or inside the project.
- `setTime is not supported in wallclock mode`: use the repo script, which passes `--static-time`.
- Deprecation warnings for `submitMulti` or `allocatePartyWithHint`: acceptable for this academic demo; the scripts still pass on SDK `3.5.2`.
