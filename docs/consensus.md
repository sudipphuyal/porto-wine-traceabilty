# Consenso e finalização

## Comparação conceptual

PoW usa prova computacional, com alto consumo energético e finalização probabilística. PoS reduz energia ao usar participação económica, mas continua tipicamente público ou semi-público e depende de incentivos criptoeconómicos. PoA, PBFT e IBFT usam validadores conhecidos, adequados a redes permissionadas, com finalização mais determinística.

Canton não deve ser confundido com uma escolha DAML de “votação 2/3”. A finalização é função da infraestrutura Canton Domain / Synchronizer, composta conforme a versão por serviços como sequencer e mediator. A aprovação do IVDP é uma regra de negócio, não o mecanismo de consenso.

## Modelo local

Este repositório fornece uma configuração local de desenvolvimento para um participant e um Canton Domain / Synchronizer. Como `canton` não estava instalado neste ambiente, a configuração deve ser validada com os exemplos da versão instalada antes de ser usada como evidência.

## Transferência de custódia

Durante `TransferCustody`, DAML valida autorização, estado do lote e regras de negócio. Canton ordena, sincroniza e finaliza a transação entre stakeholders. Se o serviço Canton Domain / Synchronizer estiver indisponível, a transação não deve ser considerada finalizada. Uma repetição pelo cliente deve ser tratada de forma idempotente e não deve criar eventos duplicados de custódia.

## Adequação

Para vinho do Porto, os participantes são conhecidos, regulados e sujeitos a confidencialidade comercial. Uma rede permissionada com finalização empresarial é mais apropriada do que uma blockchain pública com finalização probabilística e dados amplamente replicados.
