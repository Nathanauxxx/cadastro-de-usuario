# Frontend Angular - Sistema de Cadastro de Usuários

Este é o frontend desenvolvido em Angular 17 com Angular Material para gerenciamento de usuários.

## 🚀 Funcionalidades

- ✅ **Login com JWT** - Autenticação segura
- ✅ **Listar Usuários** - Visualização em tabela com Material Design
- ✅ **Criar Usuário** - Formulário com validações
- ✅ **Editar Usuário** - Atualização de dados
- ✅ **Deletar Usuário** - Remoção com confirmação
- ✅ **Paginação** - Navegação eficiente entre páginas
- ✅ **Filtro/Busca** - Pesquisa em tempo real com debounce
- ✅ **Validação** - Formulários reativos com validação completa
- ✅ **Guards** - Proteção de rotas autenticadas
- ✅ **Interceptors** - Injeção automática de token JWT

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

## 🔧 Instalação

1. Navegue até a pasta do projeto:
```bash
cd frontend-angular
```

2. Instale as dependências:
```bash
npm install
```

## ▶️ Executando o Projeto

Execute o servidor de desenvolvimento:
```bash
npm start
```

ou

```bash
ng serve
```

Navegue para `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer arquivo fonte.

## 🏗️ Build

Para criar o build de produção:
```bash
ng build
```

Os arquivos de build serão armazenados no diretório `dist/`.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── confirm-dialog/     # Dialog de confirmação
│   │   ├── login/              # Componente de login
│   │   ├── navbar/             # Barra de navegação
│   │   ├── usuario-form/       # Formulário de usuário
│   │   └── usuario-list/       # Lista de usuários
│   ├── guards/
│   │   └── auth.guard.ts       # Guard de autenticação
│   ├── interceptors/
│   │   └── jwt.interceptor.ts  # Interceptor JWT
│   ├── models/
│   │   └── usuario.model.ts    # Modelos de dados
│   ├── services/
│   │   ├── auth.service.ts     # Serviço de autenticação
│   │   └── usuario.service.ts  # Serviço de usuários
│   ├── app-routing.module.ts   # Configuração de rotas
│   ├── app.module.ts           # Módulo principal
│   └── app.component.*         # Componente raiz
├── assets/                     # Recursos estáticos
├── index.html                  # HTML principal
├── main.ts                     # Ponto de entrada
└── styles.css                  # Estilos globais
```

## 🎨 Tecnologias Utilizadas

- **Angular 17** - Framework principal
- **Angular Material** - Biblioteca de componentes UI
- **RxJS** - Programação reativa
- **TypeScript** - Linguagem de programação
- **HttpClient** - Cliente HTTP para comunicação com API

## 🔐 Autenticação

O sistema utiliza autenticação JWT (JSON Web Token). O token é armazenado no localStorage e automaticamente incluído em todas as requisições HTTP através do `JwtInterceptor`.

### Fluxo de Autenticação:
1. Usuário faz login com email e senha
2. Backend retorna token JWT
3. Token é armazenado no localStorage
4. Interceptor adiciona token no header das requisições
5. Guard protege rotas que requerem autenticação

## 🌐 Integração com Backend

A aplicação está configurada para se comunicar com o backend em:
```
http://localhost:8080/api
```

Para alterar a URL base, edite os arquivos:
- `src/app/services/usuario.service.ts`
- `src/app/services/auth.service.ts`

## 📝 Endpoints Utilizados

### Autenticação
- `POST /api/auth/login` - Login de usuário

### Usuários
- `GET /api/usuarios/page` - Lista paginada de usuários
- `GET /api/usuarios/{id}` - Busca usuário por ID
- `POST /api/usuarios` - Cria novo usuário
- `PUT /api/usuarios/{id}` - Atualiza usuário
- `DELETE /api/usuarios/{id}` - Deleta usuário
- `GET /api/usuarios/buscar?nome={nome}` - Busca por nome

## ⚠️ Observações Importantes

1. **CORS**: Certifique-se de que o backend está configurado para aceitar requisições do frontend
2. **JWT**: O token JWT expira após um tempo configurado no backend
3. **Senha**: No modo de edição, a senha é opcional (deixe em branco para manter a atual)

## 🛠️ Comandos Úteis

- `ng serve` - Inicia servidor de desenvolvimento
- `ng build` - Cria build de produção
- `ng test` - Executa testes unitários
- `ng lint` - Analisa código
- `ng generate component nome` - Gera novo componente

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela (desktop, tablet e mobile).

## 🐛 Troubleshooting

### Erro de CORS
Se encontrar erros de CORS, adicione no backend:
```java
@CrossOrigin(origins = "http://localhost:4200")
```

### Token Expirado
Se o token expirar, o usuário será redirecionado automaticamente para a tela de login.

### Porta 4200 em uso
Se a porta 4200 estiver em uso, execute:
```bash
ng serve --port 4201
```

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
