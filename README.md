# 🏥 ClinicaCare

Sistema de gestão para clínicas médicas, com cadastro e autenticação de usuários, gerenciamento de médicos e agendamento de consultas.

## 📌 Integrantes do Grupo

- Davi Vieira
- Samuel Schneweiss
- Nathália Brito
- Sthefany Abreu
- João Antônio

## 📖 Descrição

O **ClinicaCare** é uma aplicação web para gestão de clínicas médicas, desenvolvida com **frontend em React/Vite** e **backend em Node.js/Express**. O objetivo do sistema é otimizar processos e centralizar as informações de uma clínica, oferecendo:

- Cadastro e autenticação de usuários (pacientes e médicos), com senhas criptografadas e autenticação via **JWT**;
- Painéis (dashboards) distintos para **médicos** e **pacientes**;
- Agendamento, edição e cancelamento de consultas;
- Listagem de médicos disponíveis por especialidade;
- Persistência dos dados em **MongoDB (Atlas)**, com **fallback automático para um banco mock em memória** (salvo em disco em JSON) caso a conexão com o MongoDB não esteja disponível — o que facilita rodar e testar o projeto sem depender de infraestrutura externa.

## 🚀 Tecnologias Utilizadas

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) — framework para criação da API REST
- [Mongoose](https://mongoosejs.com/) / [MongoDB](https://www.mongodb.com/) — banco de dados
- [JSON Web Token (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken) — autenticação
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) — hash de senhas
- [dotenv](https://www.npmjs.com/package/dotenv) — variáveis de ambiente
- [cors](https://www.npmjs.com/package/cors)
- [nodemon](https://www.npmjs.com/package/nodemon) — reinício automático em desenvolvimento

### Frontend
- [React](https://react.dev/) (v19)
- [Vite](https://vitejs.dev/) — build tool e servidor de desenvolvimento
- [React Router DOM](https://reactrouter.com/) — navegação entre páginas
- [ESLint](https://eslint.org/) — padronização e qualidade de código
- CSS puro (arquivos organizados por página/componente)

## 📁 Estrutura do Projeto

```
ClinicaCare-main/
│
├── backend/                      # API REST (Node.js + Express)
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js             # Conexão com MongoDB (com fallback para mock)
│   │   │   └── mockDb.js         # Banco de dados mock em memória (persistido em JSON)
│   │   ├── controllers/
│   │   │   ├── authController.js         # Registro e login
│   │   │   ├── appointmentController.js  # CRUD de consultas
│   │   │   └── userController.js         # Listagem de médicos
│   │   ├── middleware/
│   │   │   └── authMiddleware.js # Proteção de rotas via JWT (protect / doctorOnly)
│   │   ├── models/
│   │   │   ├── User.js           # Schema de usuário (Mongoose)
│   │   │   └── Appointment.js    # Schema de consulta (Mongoose)
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── appointmentRoutes.js
│   │   │   └── userRoutes.js
│   │   └── server.js             # Ponto de entrada da aplicação
│   ├── test-api.js               # Script auxiliar de testes da API
│   ├── .env                      # Variáveis de ambiente (PORT, MONGO_URI, JWT_SECRET)
│   └── package.json
│
├── frontend/                     # Aplicação React (Vite)
│   ├── src/
│   │   ├── components/           # Componentes reutilizáveis (Button, Input, AppointmentDetail...)
│   │   ├── constants/
│   │   │   └── specialties       # Lista de especialidades médicas
│   │   ├── pages/                # Telas: Home, Login, Register, DashMedico, DashPaciente
│   │   ├── services/
│   │   │   └── api.js            # Camada de comunicação com a API (fetch + JWT)
│   │   ├── styles/                # Arquivos CSS por tela/componente
│   │   ├── App.jsx               # Componente raiz / roteamento entre telas
│   │   └── main.jsx              # Ponto de entrada do React
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── package.json                  # Configuração auxiliar na raiz do repositório
```

## 🔌 Endpoints da API

Base URL: `http://localhost:3000/api`

### Autenticação (`/api/auth`) — Públicas

| Método | Rota             | Descrição                                             |
|--------|------------------|--------------------------------------------------------|
| POST   | `/auth/register` | Cadastra um novo usuário (paciente ou médico)          |
| POST   | `/auth/login`    | Autentica o usuário e retorna um token JWT              |

**Corpo esperado — `POST /auth/register`:**
```json
{
  "name": "Nome do usuário",
  "email": "usuario@email.com",
  "password": "senha123",
  "role": "patient | doctor",
  "specialty": "Especialidade (obrigatório apenas se role = doctor)"
}
```

**Corpo esperado — `POST /auth/login`:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```
> Observação: por conveniência de testes, o login também aceita `medico`/`123` e `paciente`/`123` como credenciais rápidas, criando contas de demonstração automaticamente caso não existam.

### Usuários (`/api/users`) — Privadas (requer token JWT)

| Método | Rota             | Descrição                                        |
|--------|------------------|----------------------------------------------------|
| GET    | `/users/doctors` | Lista todos os médicos cadastrados (nome e especialidade) |

### Consultas (`/api/appointments`) — Privadas (requer token JWT)

| Método | Rota                  | Descrição                                                                 |
|--------|-----------------------|-----------------------------------------------------------------------------|
| GET    | `/appointments`       | Lista as consultas. Médicos veem todas; pacientes veem apenas as próprias  |
| POST   | `/appointments`       | Cria uma nova consulta                                                     |
| PUT    | `/appointments/:id`   | Atualiza uma consulta existente                                            |
| DELETE | `/appointments/:id`   | Remove uma consulta                                                        |

**Corpo esperado — `POST /appointments`:**
```json
{
  "paciente": "Nome do paciente",
  "medico": "Nome do médico",
  "especialidade": "Especialidade",
  "data": "AAAA-MM-DD",
  "hora": "HH:MM",
  "status": "Agendada | Concluída | Cancelada",
  "tipo": "Primeira Vez | Retorno",
  "local": "Local do atendimento"
}
```

> Todas as rotas privadas exigem o header:
> `Authorization: Bearer <token>`

## 🗄️ Modelagem do Banco de Dados

O banco de dados é acessado via **MongoDB/Mongoose**, com duas entidades principais:

### `User` (usuários)

| Campo       | Tipo    | Regras                                         |
|-------------|---------|--------------------------------------------------|
| `name`      | String  | Obrigatório                                       |
| `email`     | String  | Obrigatório, único, armazenado em minúsculas      |
| `password`  | String  | Obrigatório, mínimo de 6 caracteres, criptografado com bcrypt antes de salvar |
| `role`      | String  | `patient` (padrão) ou `doctor`                    |
| `specialty` | String  | Especialidade médica (relevante apenas quando `role = doctor`) |
| `createdAt` / `updatedAt` | Date | Gerados automaticamente (`timestamps`) |

### `Appointment` (consultas)

| Campo           | Tipo   | Regras                                              |
|------------------|--------|--------------------------------------------------------|
| `paciente`       | String | Obrigatório — nome do paciente                          |
| `medico`         | String | Obrigatório — nome do médico                             |
| `especialidade`  | String | Obrigatório                                              |
| `data`           | String | Obrigatório                                              |
| `hora`           | String | Obrigatório                                              |
| `status`         | String | `Agendada` (padrão) / `Concluída` / `Cancelada`          |
| `tipo`           | String | Padrão: `Primeira Vez`                                    |
| `local`          | String | Padrão: `Consultório Principal`                            |
| `patientId`      | String | Referência ao `_id` do usuário paciente (quando encontrado) |
| `doctorId`       | String | Referência ao `_id` do usuário médico (quando encontrado)   |
| `createdAt` / `updatedAt` | Date | Gerados automaticamente (`timestamps`) |

### Relacionamentos

- Um **User** com `role = "doctor"` pode estar associado a **várias** `Appointment` (relação 1:N via `doctorId`).
- Um **User** com `role = "patient"` pode estar associado a **várias** `Appointment` (relação 1:N via `patientId`).
- Os campos `paciente` e `medico` em `Appointment` guardam o nome em texto (desnormalizado), enquanto `patientId`/`doctorId` guardam a referência ao usuário correspondente, quando existente — permitindo que a consulta funcione mesmo que o nome não corresponda exatamente a um usuário cadastrado.

> 💾 **Modo mock:** caso a conexão com o MongoDB Atlas falhe na inicialização, o backend ativa automaticamente um banco de dados em memória (`src/config/mockDb.js`), que replica a mesma estrutura de dados acima e persiste os registros em um arquivo JSON local, permitindo rodar o projeto sem depender de um banco externo.

## ▶️ Instruções para Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18 ou superior recomendado)
- npm (instalado junto com o Node.js)
- Conexão com um banco MongoDB (opcional — o backend usa um banco mock local automaticamente caso não consiga conectar)

### 1. Clonar o repositório
```bash
git clone <https://github.com/samuelscavalcanti/ClinicaCare>
cd ClinicaCare-main
```

### 2. Rodar o Backend
```bash
cd backend
npm install
```

Configure o arquivo `.env` na pasta `backend/` com as seguintes variáveis:
```env
PORT=3000
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta
```
> Se `MONGO_URI` não for informado ou a conexão falhar, o servidor sobe normalmente usando o banco mock em memória.

Iniciar o servidor:
```bash
npm run dev    # modo desenvolvimento (com nodemon)
# ou
npm start      # modo produção
```
O backend ficará disponível em `http://localhost:3000`.

### 3. Rodar o Frontend
Em outro terminal:
```bash
cd frontend
npm install
npm install react-icons
npm run dev
```
O frontend ficará disponível em `http://localhost:5173` (porta padrão do Vite).

> ⚠️ A URL da API está fixada em `http://localhost:3000/api` no arquivo `frontend/src/services/api.js`. Certifique-se de que o backend esteja rodando nessa porta antes de usar o frontend.

### 4. Acessando a aplicação
- Acesse `http://localhost:5173` no navegador.
- Cadastre um novo usuário (paciente ou médico) na tela de registro, ou utilize as credenciais rápidas de teste:
  - **Médico:** email `usuario@medico.com` / senha `123456`
  - **Paciente:** email `usuario@paciente.com` / senha `123456`
