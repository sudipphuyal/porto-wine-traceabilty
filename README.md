# Porto Wine Traceability

Smart-contract project for “Smart Contracts em Blockchain — Cadeia de Abastecimento do Vinho do Porto”, implemented with DAML and intended for a local Canton Domain / Synchronizer development environment.

The project models private custody, production, IVDP certification, recall, logistics, and a separate consumer QR verification view. It deliberately does not implement a fake PoA voting contract: consensus/finality belongs to Canton infrastructure, while IVDP approval is a business workflow.

## Prerequisites

- DAML SDK with `daml` CLI.
- Compatible Canton distribution with `canton` CLI.
- Java supported by the selected Canton/DAML versions.
- POSIX shell.

Detect versions:

```bash
dpm --version || true
daml --version
canton --help
java -version
node --version
```

In this environment, `daml`, `dpm`, and `canton` were missing. See `SETUP_REQUIRED.md`.

## Build and test

```bash
./scripts/run-tests.sh
```

The script runs:

```bash
daml build
daml script --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:endToEnd
daml script --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:recallScenario
daml script --dar .daml/dist/porto-wine-traceability-0.1.0.dar --script-name WineTraceability.Test:negativeTests
```

Expected successful output includes a completed DAR build and successful Daml Script execution for all three scripts.

## Local Canton

Start the local development template with:

```bash
./scripts/run-canton-local.sh
```

Because Canton was not installed here, validate `canton/canton.conf` against the examples shipped with your installed Canton version before using it as assessment evidence.

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

- `daml: command not found`: install the DAML SDK and ensure the CLI is on `PATH`.
- `canton: command not found`: install Canton and validate the local config syntax for that release.
- Canton terminology mismatch: use the installed tool’s terminology in config, and explain “Canton Domain / Synchronizer” in the report.
- Custody transfer stuck or rejected: check both controller authorizations and whether the Canton finality service is reachable.

## Academic transparency

The repository includes source, tests, configuration templates and documentation. Runtime success must be demonstrated only after the required tools are installed. Current local blocker details are recorded in `SETUP_REQUIRED.md` and `STATUS.md`.
