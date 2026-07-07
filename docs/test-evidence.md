# Evidência de testes

Não foram capturadas evidências runtime neste ambiente porque `daml`, `dpm` e `canton` não estavam disponíveis no `PATH`.

Quando o ambiente estiver instalado:

```bash
daml --version
canton --help
./scripts/run-tests.sh
./scripts/capture-evidence.sh
```

Guardar em `evidence/`:

- Saída do build do DAR.
- Resultado dos scripts `endToEnd`, `recallScenario` e `negativeTests`.
- Timestamp UTC real.
- Identificador real de transação/evento se a execução for feita contra Canton.
- Versão exata do Canton e se o termo usado pela ferramenta é Domain ou Synchronizer.

Não inventar capturas, hashes ou identificadores. Se o Canton Domain / Synchronizer estiver em baixo, a transferência de custódia não deve ser dada como finalizada.
