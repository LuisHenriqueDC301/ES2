# Pedidos API

API REST construída com Spring Boot, Hibernate e banco H2 em memória.

## Pré-requisitos

- Java 17+
- Maven 3.8+

## Como rodar

O projeto usa um `settings.xml` local para ignorar mirrors corporativos do Maven e baixar as dependências direto do Maven Central.

```bash
cd pedidos-api
mvn -s .mvn/settings.xml spring-boot:run
```

A aplicação sobe em `http://localhost:8080`.

## Console H2

Banco em memória acessível em `http://localhost:8080/h2-console`

| Campo | Valor |
|---|---|
| JDBC URL | `jdbc:h2:mem:pedidosdb` |
| Username | `sa` |
| Password | _(vazio)_ |

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

#### Eletrônicos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/produtos/eletronicos` | Lista eletrônicos |
| POST | `/produtos/eletronicos` | Cadastra eletrônico |

Body exemplo:
```json
{
  "nome": "Notebook",
  "preco": 3500.00,
  "estoque": 10,
  "voltagem": 110
}
```

#### Perecíveis

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/produtos/pereciveis` | Lista perecíveis |
| POST | `/produtos/pereciveis` | Cadastra perecível |

Body exemplo:
```json
{
  "nome": "Leite",
  "preco": 5.50,
  "estoque": 100,
  "dataValidade": "2026-12-31"
}
```

---

### Pedidos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/pedidos` | Lista todos os pedidos |
| GET | `/pedidos/{id}` | Consulta pedido por ID |
| POST | `/pedidos` | Cadastra pedido |
| POST | `/pedidos/{id}/itens` | Adiciona item ao pedido |

Body para cadastrar pedido:
```json
{}
```

Body para adicionar item:
```json
{
  "produtoId": 1,
  "qtde": 2
}
```

O `valorTotal` do pedido é recalculado automaticamente ao adicionar itens.
