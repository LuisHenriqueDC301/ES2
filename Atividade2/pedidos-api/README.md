# Pedidos API

API REST construída com Spring Boot, Hibernate e MySQL (via Docker).

## Pré-requisitos

- Java 17+
- Docker e Docker Compose

## Configuração

O arquivo `application.properties` está no `.gitignore`. Crie o seu a partir do exemplo:

```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

## Como rodar

**1. Sobe o banco MySQL:**
```bash
docker-compose up -d
```

**2. Roda a API:**
```bash
./mvnw spring-boot:run
```

> Se o Maven da máquina estiver configurado com mirrors corporativos, use o settings local:
> ```bash
> mvn -s .mvn/settings.xml spring-boot:run
> ```

A aplicação sobe em `http://localhost:8080`.

**Para parar o banco:**
```bash
docker-compose down
```

> Os dados ficam persistidos no volume Docker entre restarts.

---

## Endpoints

### Produtos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/produtos` | Lista todos os produtos |
| GET | `/produtos/{id}` | Consulta produto por ID |
| POST | `/produtos` | Cadastra produto base |
| PUT | `/produtos/{id}` | Altera produto |
| DELETE | `/produtos/{id}` | Exclui produto |

Body exemplo:
```json
{ "nome": "Camiseta", "preco": 49.90, "estoque": 50 }
```

#### Eletrônicos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/produtos/eletronicos` | Lista eletrônicos |
| POST | `/produtos/eletronicos` | Cadastra eletrônico |

Body exemplo:
```json
{ "nome": "Notebook", "preco": 3500.00, "estoque": 10, "voltagem": 110 }
```

#### Perecíveis

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/produtos/pereciveis` | Lista perecíveis |
| POST | `/produtos/pereciveis` | Cadastra perecível |

Body exemplo:
```json
{ "nome": "Leite", "preco": 5.50, "estoque": 100, "dataValidade": "2026-12-31" }
```

---

### Pedidos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/pedidos` | Lista todos os pedidos |
| GET | `/pedidos/{id}` | Consulta pedido por ID |
| POST | `/pedidos` | Cadastra pedido |
| POST | `/pedidos/{id}/itens` | Adiciona item ao pedido |

Body para adicionar item:
```json
{ "produtoId": 1, "qtde": 2 }
```

O `valorTotal` do pedido é recalculado automaticamente ao adicionar itens.

---

## Exemplos com curl

```bash
# Cadastrar eletrônico
curl -X POST http://localhost:8080/produtos/eletronicos \
  -H "Content-Type: application/json" \
  -d '{"nome": "Notebook", "preco": 3500.00, "estoque": 10, "voltagem": 110}'

# Cadastrar perecível
curl -X POST http://localhost:8080/produtos/pereciveis \
  -H "Content-Type: application/json" \
  -d '{"nome": "Leite", "preco": 5.50, "estoque": 100, "dataValidade": "2026-12-31"}'

# Criar pedido
curl -X POST http://localhost:8080/pedidos \
  -H "Content-Type: application/json" \
  -d '{}'

# Adicionar item ao pedido
curl -X POST http://localhost:8080/pedidos/1/itens \
  -H "Content-Type: application/json" \
  -d '{"produtoId": 1, "qtde": 2}'
```
