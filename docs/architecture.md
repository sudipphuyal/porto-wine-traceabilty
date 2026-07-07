# Arquitetura

Este projeto modela uma cadeia de abastecimento permissionada para Vinho do Porto em DAML, executável sobre Canton. No enunciado, o serviço de consenso é chamado “Canton Domain (Sequencer + Mediator)”. Em versões recentes, a mesma camada pode aparecer como “Synchronizer”. Por isso, a documentação usa “Canton Domain / Synchronizer”.

## Participantes e entidades

| Entidade | Papel funcional | Tipo de nó em produção | Visibilidade contratual |
| --- | --- | --- | --- |
| Quinta do Vale | Produtor inicial, regista origem, vindima e GPS | Participant próprio ou alojado | Vê o lote privado enquanto é proprietário atual e contratos onde é stakeholder |
| Sandeman Winery | Adega, produção, pedido de certificação | Participant próprio | Vê o lote quando detém custódia e enquanto interage com o IVDP |
| IVDP | Regulador, certifica, rejeita e recolhe lotes | Participant regulador | Stakeholder do `WineBatch`; autoridade sobre certificação e recolha |
| LogisTrans | Operador logístico | Participant próprio | Vê o lote apenas quando recebe custódia |
| ViniShop Oslo | Retalhista final | Participant próprio | Vê o lote quando recebe custódia e publica a proveniência pública |
| Consumer Final | Verificação por QR | Sem participant empresarial; acesso a vista pública | Observador apenas de `PublicProvenance` |

No ambiente local, um único participant pode hospedar várias parties lógicas para testes. Isto não é uma implantação real de seis nós; é uma simplificação de desenvolvimento.

## Onboarding e autoridade do IVDP

O onboarding de uma entidade deve incluir identificação legal, criação ou associação a um participant Canton, atribuição da party DAML, políticas de chaves e autorização do IVDP para operar na rede. O IVDP pode aprovar, suspender ou revogar acesso de participantes por políticas operacionais e de governação. A revogação operacional é distinta da recolha (`RecallBatch`) de um lote já certificado.

## Porque blockchain permissionada

A cadeia inclui dados comerciais, produção, logística e certificação regulatória. Uma blockchain pública exporia metadados e teria custos/latência desnecessários. Canton permite finalização empresarial, privacidade por necessidade de conhecimento e governação por entidades conhecidas, preservando auditabilidade sem publicar receitas, margens ou dados IoT brutos.
