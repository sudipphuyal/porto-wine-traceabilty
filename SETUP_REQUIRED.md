# Setup required

The source project, scripts, fixtures, and documentation have been created, but the required DAML/Canton command-line tools were not available in this environment. Runtime compilation and Canton integration evidence could not be honestly claimed.

Observed command output:

```text
$ dpm --version
zsh:1: command not found: dpm

$ daml --version
zsh:1: command not found: daml

$ canton --help
zsh:1: command not found: canton

$ which dpm; which daml; which canton
dpm not found
daml not found
canton not found

$ java -version
openjdk version "23.0.2" 2025-01-21
OpenJDK Runtime Environment Homebrew (build 23.0.2)
OpenJDK 64-Bit Server VM Homebrew (build 23.0.2, mixed mode, sharing)

$ node --version
v24.2.0
```

Install prerequisites:

1. Install the DAML SDK that supports the `daml` CLI.
2. Install a compatible Canton distribution.
3. Add both tools to `PATH`.
4. Run `daml --version` and `canton --help`.
5. Build and test with `./scripts/run-tests.sh`.
6. Validate `canton/canton.conf` against the examples bundled with your Canton version before using it as evidence.
