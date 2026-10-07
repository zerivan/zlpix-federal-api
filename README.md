# ZLPix Federal API

API pública comunitária de resultados da Loteria Federal, disponibilizada para uso por desenvolvedores e utilizada pelo ZLPix Premiado.

## Novidade — atualização automática a cada 5 minutos

A API passou por um ajuste de confiabilidade e agora verifica a fonte da Caixa **a cada 5 minutos**.

A atualização também recebeu uma proteção importante: se a fonte retornar erro, resposta incompleta ou dados incompatíveis, o arquivo atual **não é substituído**. Assim, uma falha temporária da fonte não derruba nem corrompe a API pública.

O endpoint continua disponível no mesmo endereço:

https://zerivan.github.io/zlpix-federal-api/api/federal.json

## Fonte dos dados

Os dados são obtidos automaticamente do serviço público de resultados da Caixa Econômica Federal:

https://servicebus2.caixa.gov.br/portaldeloterias/api/federal

Este projeto funciona como uma camada pública de distribuição/cache dos dados recebidos da Caixa. **Não é uma API oficial da Caixa Econômica Federal e não representa a Caixa.**

## Endpoint público

Resultado mais recente:

https://zerivan.github.io/zlpix-federal-api/api/federal.json

Exemplo JavaScript:

```javascript
const resposta = await fetch(
  "https://zerivan.github.io/zlpix-federal-api/api/federal.json"
);

const federal = await resposta.json();

console.log(federal.numero);
console.log(federal.dataApuracao);
console.log(federal.listaDezenas);
```

Exemplo Python:

```python
import requests

url = "https://zerivan.github.io/zlpix-federal-api/api/federal.json"

federal = requests.get(url, timeout=10).json()

print(federal["numero"])
print(federal["dataApuracao"])
print(federal["listaDezenas"])
```

## Atualização

O repositório utiliza GitHub Actions para consultar a fonte da Caixa **a cada 5 minutos** e atualizar o arquivo:

```
api/federal.json
```

Antes de substituir o arquivo, o motor valida a resposta recebida. Em caso de falha ou resposta inválida, a versão anterior é preservada.

Também é possível executar a atualização manualmente pelo workflow do GitHub Actions.

## Estrutura principal

```
api/
  federal.json

scripts/
  atualizar-federal.js

.github/
  workflows/
    atualizar.yml
```

## Uso por desenvolvedores

A API pode ser consumida diretamente por aplicações web, backends, scripts e outros projetos que precisem dos resultados da Loteria Federal.

Não é necessária chave de API para consultar o endpoint público deste projeto.

## Descoberta sobre as modalidades

A consulta à fonte da Caixa utiliza o nome da modalidade no endereço da API. Assim, para consultar outra modalidade na origem, o identificador do jogo pode ser alterado conforme a modalidade desejada.

Exemplo do conceito:

```
federal   → Federal
megasena  → Mega-Sena
quina     → Quina
lotofacil → Lotofácil
```

No ZLPix Federal API, cada modalidade deverá ser publicada e validada separadamente. A modalidade **Federal** é a primeira implementação disponível.

Essa separação permite ampliar o projeto para outros resultados da Caixa sem alterar o mecanismo de distribuição já criado.

Para informações oficiais, regras, resultados e serviços da Caixa, consulte diretamente os canais oficiais da Caixa Econômica Federal.

## Licença e responsabilidade

Este repositório é um projeto comunitário independente. O uso dos dados por aplicações de terceiros é responsabilidade de seus respectivos desenvolvedores.

Ao consumir esta API, recomenda-se tratar alterações no formato dos dados da fonte como possibilidade e validar os campos utilizados pela aplicação.
