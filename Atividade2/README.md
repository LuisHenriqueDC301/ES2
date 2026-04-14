# Sistema de Pedidos

Sistema simples de gerenciamento de pedidos e produtos.

## Tecnologias

**Backend**
- Java 17
- Spring Boot 3.2
- Spring Data JPA
- MySQL (via Docker)

**Frontend**
- React 19
- TypeScript
- Tailwind CSS 4
- Vite
- React Router DOM

## Pré-requisitos

- Java 17+
- Docker e Docker Compose
- Node.js + Yarn

## Como rodar

### 1. Banco de dados

```bash
cd pedidos-api
docker-compose up -d
```

### 2. Backend

```bash
cd pedidos-api
cp src/main/resources/application.properties.example src/main/resources/application.properties
./mvnw spring-boot:run
```

> Se o Maven da máquina estiver configurado com mirrors corporativos, use o settings local:
> ```bash
> mvn -s .mvn/settings.xml spring-boot:run
> ```

Roda em `http://localhost:8080`.

### 3. Frontend

```bash
cd frontend/sistema-pedidos
yarn
yarn dev
```

Roda em `http://localhost:5173`.

A URL do backend é configurada via `.env`:

```
VITE_BACKEND_URL=http://localhost:8080
```

### Parar o banco

```bash
cd pedidos-api
docker-compose down
```

> Os dados ficam persistidos no volume Docker entre restarts.
