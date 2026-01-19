# API de Cadastro de Usuários

API REST desenvolvida com Spring Boot e PostgreSQL para gerenciamento de usuários.

## 🚀 Tecnologias

- Java 25
- Spring Boot 3.5.9
- PostgreSQL
- Spring Data JPA
- Lombok
- Maven

## 📋 Pré-requisitos

- Java 25
- PostgreSQL instalado e rodando
- Maven

## 🔧 Configuração do Banco de Dados

1. Crie um banco de dados no PostgreSQL:
```sql
CREATE DATABASE cadastro_db;
```

2. Configure as credenciais no arquivo `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/cadastro_db
spring.datasource.username=postgres
spring.datasource.password=postgres
```

## 🏃‍♂️ Executando o Projeto

```bash
mvn spring-boot:run
```

A aplicação estará disponível em: `http://localhost:8080`

## 📚 Endpoints da API

### Listar todos os usuários
```
GET /api/usuarios
```

### Buscar usuário por ID
```
GET /api/usuarios/{id}
```

### Buscar usuário por email
```
GET /api/usuarios/email/{email}
```

### Criar novo usuário
```
POST /api/usuarios
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 98765-4321"
}
```

### Atualizar usuário
```
PUT /api/usuarios/{id}
Content-Type: application/json

{
  "nome": "João Silva Atualizado",
  "email": "joao@email.com",
  "telefone": "(11) 98765-4321"
}
```

### Deletar usuário
```
DELETE /api/usuarios/{id}
```

## 📦 Modelo de Dados

### Usuario
- `id` (Long) - Identificador único
- `nome` (String) - Nome do usuário
- `email` (String) - Email único do usuário
- `telefone` (String) - Telefone de contato
- `dataCadastro` (LocalDateTime) - Data de criação
- `dataAtualizacao` (LocalDateTime) - Data da última atualização

## 🧪 Testando a API

Você pode testar a API usando ferramentas como:
- Postman
- Insomnia
- cURL

Exemplo com cURL:
```bash
# Criar usuário
curl -X POST http://localhost:8080/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","email":"joao@email.com","telefone":"(11) 98765-4321"}'

# Listar usuários
curl http://localhost:8080/api/usuarios
```
