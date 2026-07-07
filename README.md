# Porto Wine Traceability

Smart-contract project for “Smart Contracts em Blockchain — Cadeia de Abastecimento do Vinho do Porto”, implemented with DAML and intended for a local Canton Domain / Synchronizer development environment.

The project models private custody, production, IVDP certification, recall, logistics, and a separate consumer QR verification view. It deliberately does not implement a fake PoA voting contract: consensus/finality belongs to Canton infrastructure, while IVDP approval is a business workflow.

## Prerequisites

- Java available on `PATH`.
- Digital Asset Package Manager (`dpm`) with Daml SDK `3.5.2`.
- POSIX shell.
- Optional standalone Canton distribution if adapting `canton/canton.conf`.

For reproducible install and demo commands, see `RUNBOOK.md`.

## Build and test

```bash
./scripts/run-tests.sh
```

The script runs:

```bash
dpm build
dpm script --ide-ledger --static-time --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:endToEnd
dpm script --ide-ledger --static-time --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:recallScenario
dpm script --ide-ledger --static-time --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:negativeTests
```

Expected successful output includes a completed DAR build and successful Daml Script execution for all three scripts.

## Browser demo

Start the local evaluation UI:

```bash
./scripts/run-demo-ui.sh
```

Then open:

```text
http://localhost:4173
```

The UI visualizes the batch lifecycle and can run the real hash, test and evidence scripts from the browser.

## Local Canton

Start the local development template with:

```bash
./scripts/run-canton-local.sh
```

The default helper starts `dpm sandbox`. For standalone Canton assessment evidence, validate `canton/canton.conf` against the examples shipped with your installed Canton version.

## E2E and evidence

```bash
./scripts/run-e2e.sh
./scripts/capture-evidence.sh
```

Evidence must be real: timestamps, transaction identifiers, final statuses and logs should only be captured from actual runs. Do not fabricate screenshots or logs.

## Why this is not a public blockchain

The network contains regulated actors, confidential production data, logistics records and certification workflows. A public blockchain would expose too much metadata and add unnecessary cost and probabilistic finality. Canton supports permissioned operation, known participants, enterprise finality and privacy by need-to-know disclosure.

## Why consumer verification is separated from private custody data

Consumers only need the QR, origin, harvest date, grape variety, certification status, certificate hash and high-level public events. They must not receive fermentation notes, recipes, raw IoT logs, commercial details or private custody state. `PublicProvenance` is a separate sanitized contract for this reason.

## Project structure

```text
daml/WineTraceability/   DAML data types, private contracts, public provenance, scripts
canton/                  Local Canton Domain / Synchronizer templates
scripts/                 Build, test, Canton, evidence and hash helpers
fixtures/                Clearly labelled sample certificate and temperature data
docs/                    Portuguese report documentation
evidence/                Place for real generated evidence
```

## Troubleshooting

- `dpm: command not found`: install DPM and ensure `$HOME/.dpm/bin` is on `PATH`.
- `SDK_NOT_INSTALLED`: run `dpm install 3.5.2`.
- Canton terminology mismatch: use the installed tool’s terminology in config, and explain “Canton Domain / Synchronizer” in the report.
- Custody transfer stuck or rejected: check both controller authorizations and whether the Canton finality service is reachable.

## Academic transparency

The repository includes source, tests, configuration templates and documentation. Runtime success should be demonstrated from actual command output and captured evidence logs, not fabricated screenshots or identifiers.
