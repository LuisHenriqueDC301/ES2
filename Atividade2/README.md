# Sistema de Pedidos

Sistema simples de gerenciamento de pedidos e produtos.

## Tecnologias

**Backend**

- Java 17
- Spring Boot 3.2
- Spring Data JPA
- MySQL

**Frontend**

- React 19
- TypeScript
- Tailwind CSS 4
- Vite
- React Router DOM

## Pré-requisitos

- Java 17+
- Maven
- Yarn

## Como rodar

### Backend

Antes de rodar, configure a senha do banco em `pedidos-api/src/main/resources/application.properties`. A senha foi enviada no comentário do envio.

```bash
cd pedidos-api
./mvnw spring-boot:run
```

Roda em `http://localhost:8080`. O banco MySQL já está configurado no `application.properties`.

### Frontend

```bash
cd frontend/sistema-pedidos
yarn
yarn dev
```

Roda em `http://localhost:5173`. A URL do backend é configurada em `.env`:

```
VITE_BACKEND_URL=http://localhost:8080
```
