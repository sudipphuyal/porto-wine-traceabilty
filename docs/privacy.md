# Privacidade

Em DAML, signatories autorizam e mantêm o contrato. Observers recebem visibilidade sem necessariamente controlar escolhas. O modelo separa `WineBatch`, privado, de `PublicProvenance`, público para consumidor.

`WineBatch` usa `currentOwner` e `ivdp` como signatories. O proprietário atual vê o estado completo necessário à custódia. O IVDP é stakeholder porque certifica, rejeita e recolhe lotes. Consumidores nunca são observers do `WineBatch`.

A transferência de custódia é uma escolha controlada por proprietário atual e novo proprietário. Isto representa aceitação segura de entrega. Depois da transferência, atores anteriores não retêm automaticamente visibilidade sobre novos estados privados, salvo se forem explicitamente stakeholders noutro contrato.

Canton acrescenta privacidade por subtransação e necessidade de conhecimento. Parties sem envolvimento numa transação não recebem todos os detalhes. Assim, Quinta do Vale e Sandeman não conseguem ver lotes privados não relacionados entre si apenas por pertencerem à mesma rede.

O consumidor vê apenas:

- QR da garrafa.
- Origem, data de vindima e casta.
- Estado de certificação.
- Hash do certificado.
- Eventos públicos de alto nível.

O consumidor não vê:

- Notas de fermentação ou envelhecimento.
- Entradas individuais de sensores IoT.
- CSV bruto de temperatura.
- Condições comerciais, margens, preços ou receitas.
