# Decisão on-chain/off-chain

| Dado | Local | Justificação |
| --- | --- | --- |
| `batchId` | On-chain | Identificador primário auditável, validado por regra `PW-YYYY-NNNN` |
| GPS e origem | On-chain | Informação essencial de proveniência e certificação |
| `harvestDate` | On-chain | Necessário para rastreabilidade e validação temporal |
| PDF do certificado IVDP | Off-chain | Documento pesado e potencialmente atualizado em arquivo regulatório |
| Hash SHA-256 do certificado | On-chain | Prova de integridade do documento off-chain |
| Logs IoT CSV brutos | Off-chain | Volume alto e possível detalhe operacional sensível |
| Min/max temperatura por etapa | On-chain | Evidência resumida suficiente para auditoria sem expor leituras individuais |
| Receitas e notas proprietárias | Privado no contrato, nunca público | Informação industrial confidencial |
| `bottleQR` | On-chain em vista privada e pública | Permite verificação pelo consumidor |
| Histórico de eventos | Privado completo; público sanitizado | O contrato privado mantém detalhe auditável; `PublicProvenance` remove notas de produção e IoT detalhado |
