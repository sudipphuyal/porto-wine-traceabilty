# Status

Prepared on: 2026-07-07, Europe/Lisbon workspace context.

## Implemented

- DAML data model for origin, events, status and public provenance summaries.
- `WineBatchFactory` registration workflow that checks harvest date using ledger time via `getTime`.
- Private `WineBatch` state machine for custody transfer, production recording, certification request, certification issue/rejection and recall.
- Public `PublicProvenance` template with sanitized QR verification.
- Daml Script scenarios for end-to-end flow, recall and negative cases.
- Canton local development templates.
- Portuguese documentation for architecture, topology, privacy, consensus, on-chain/off-chain choices, evidence and report outline.
- Fixture data and helper scripts.

## Environment inspection

```text
pwd
/Users/sudipphuyal/Developments/porto-wine-traceability

ls -la
total 0
drwxr-xr-x   3 sudipphuyal  staff   96 Jul  7 00:54 .
drwxr-xr-x  13 sudipphuyal  staff  416 Jul  7 00:52 ..
drwxr-xr-x@ 11 sudipphuyal  staff  352 Jul  7 00:57 .git

git status --short --branch
## No commits yet on sudip-dev

dpm --version
zsh:1: command not found: dpm

daml --version
zsh:1: command not found: daml

canton --help
zsh:1: command not found: canton

which dpm; which daml; which canton
dpm not found
daml not found
canton not found

java -version
openjdk version "23.0.2" 2025-01-21
OpenJDK Runtime Environment Homebrew (build 23.0.2)
OpenJDK 64-Bit Server VM Homebrew (build 23.0.2, mixed mode, sharing)

node --version
v24.2.0
```

## Checks

`./scripts/hash-certificate.sh` succeeded:

```text
sha256:b7ebf0110fed92f9fb03fbd2ed2da8a6f46ecd42503542cc814f6ced2db82b21
```

`./scripts/run-tests.sh` failed because DAML is unavailable:

```text
ERROR: daml CLI not found on PATH. See SETUP_REQUIRED.md.
```

`./scripts/run-canton-local.sh` failed because Canton is unavailable:

```text
ERROR: canton CLI not found on PATH. See SETUP_REQUIRED.md.
```

Runtime DAML/Canton checks could not pass because the required tools are unavailable on `PATH`.

Planned checks once installed:

```bash
./scripts/run-tests.sh
./scripts/run-canton-local.sh
./scripts/run-e2e.sh
./scripts/capture-evidence.sh
```

Do not treat this repository as having compiled successfully until `daml build` and the Daml Script tests pass in an installed SDK.

## Known limitations

- `canton/canton.conf` is a local development template and must be validated against the installed Canton examples.
- No real Canton transaction identifier or screenshot has been generated.
- `daml.yaml` uses SDK `2.10.0` as a conservative project default because no installed DAML SDK was available to detect an exact local version.
