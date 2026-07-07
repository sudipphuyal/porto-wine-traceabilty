# Setup required

This project now uses Digital Asset Package Manager (`dpm`) and Daml SDK `3.5.2`.

Install:

```bash
curl -fsSL https://get.digitalasset.com/install/install.sh | sh
echo 'export PATH="$HOME/.dpm/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
dpm install 3.5.2
```

Verify:

```bash
dpm --version
dpm version --active
java -version
```

Expected active SDK:

```text
3.5.2
```

Run:

```bash
./scripts/run-tests.sh
./scripts/capture-evidence.sh
```

For command-by-command expected output and demonstration talking points, see `RUNBOOK.md`.

Standalone Canton is optional for the self-contained Daml Script demo. If standalone Canton is required for assessment evidence, validate `canton/canton.conf` against the exact installed Canton release before presenting runtime transaction identifiers.
