# Canton Domain / Synchronizer local demo

This directory contains a local development template, not a validated production topology. In this repository the `canton` executable was not available on PATH, so `canton/canton.conf` and `canton/bootstrap.canton` must be checked against the exact installed Canton release before evidence is captured.

The academic terminology is “Canton Domain (Sequencer + Mediator)”. Newer Canton releases may call this a “Synchronizer”. In the report, use “Canton Domain / Synchronizer” and use the exact command names exposed by the installed tool.

Run:

```bash
./scripts/run-canton-local.sh
```

For production, each organisation would operate or be hosted on independent participant infrastructure. The local demo may host multiple logical DAML parties on one participant for repeatable development testing only.
