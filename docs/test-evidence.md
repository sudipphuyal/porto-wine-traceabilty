# Evidência de testes

O ambiente local usa `dpm` com Daml SDK `3.5.2`.

Para capturar evidência:

```bash
dpm --version
dpm version --active
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
