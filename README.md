# 🏥 ClinicaCare

## 📌 Integrantes do Grupo

- Samuel Schneweiss
- Davi Vieira
- Nathália Brito
- Sthefany Abreu
- João Antônio

---

## 💡 Descrição da Ideia do Sistema

O **ClinicaCare** é um sistema desenvolvido para digitalizar e otimizar a gestão de clínicas médicas, substituindo processos manuais e descentralizados por uma plataforma moderna, organizada e eficiente.

A proposta do sistema é centralizar informações de pacientes, médicos e consultas, reduzindo erros, evitando conflitos de horários e facilitando o gerenciamento da rotina clínica.

---

## ⚙️ Funcionalidades do Sistema

### 👤 Gestão de Pacientes

- Cadastro de pacientes
- Busca de pacientes
- Atualização de dados
- Exclusão de registros

### 🩺 Gestão de Médicos

- Cadastro de médicos
- Listagem de profissionais
- Atualização de especialidades e informações
- Exclusão de registros

### 📅 Gestão de Consultas

- Agendamento de consultas
- Listagem de consultas
- Remarcação de atendimentos
- Cancelamento de consultas
- Controle de status das consultas

### 🔐 Segurança

- Cadastro de usuários
- Login no sistema
- Controle de acesso

---

## 🧱 Entidades Principais

### Paciente
Armazena informações pessoais e de contato dos pacientes.

### Médico
Armazena dados profissionais, especialidade e registro médico.

### Consulta
Registra data, horário, status e relacionamento entre paciente e médico.

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- React
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express

### Banco de Dados

- MongoDB
- Mongoose

### Arquitetura

- API RESTful

---

## 🖥️ Telas Desenvolvidas

### 🏠 Home

Página inicial responsável por apresentar o sistema, seus benefícios e funcionalidades, proporcionando uma visão geral da solução para os usuários.

### 🔐 Login e Cadastro

Tela destinada à autenticação de usuários e criação de novas contas.

### 📊 Dashboard

Painel principal com acesso rápido às funcionalidades do sistema.

### 👤 Pacientes

Tela para cadastro, consulta, edição e exclusão de pacientes.

### 🩺 Médicos

Tela para gerenciamento completo dos médicos da clínica.

### 📅 Consultas

Tela para agendamento, visualização, remarcação e cancelamento de consultas.

---

## ✨ Diferenciais do Sistema

### 📊 Gestão Digital Otimizada para Clínicas Médicas

Centralize as informações da sua clínica em um só lugar e tenha mais controle sobre sua rotina. Reduza processos manuais, ganhe agilidade e mantenha tudo organizado de forma simples e segura.

### 👤 Gestão de Pacientes

Cadastre, consulte e atualize informações dos pacientes com facilidade. Tenha acesso rápido aos dados necessários para oferecer um atendimento mais eficiente e organizado.

### 🩺 Diretório de Médicos

Mantenha as informações dos profissionais sempre organizadas e atualizadas. Encontre rapidamente especialidades e dados importantes para uma gestão mais prática da equipe.

### 📅 Agendamento Inteligente

Organize consultas com mais eficiência e evite conflitos de horários. Gerencie agendamentos, remarcações e cancelamentos de forma rápida e sem complicações.

---

## 📁 Organização das Pastas do Projeto

```text
clinica-care/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── routes/
│   │   └── App.js
│   │
│   └── package.json
│
└── README.md
```

---

## 🚀 Instruções para Rodar o Projeto

### 1️⃣ Clonar o Repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2️⃣ Executar o Backend

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Configurar o Arquivo .env

```env
MONGO_URI=sua_string_de_conexao
PORT=3000
```

### 4️⃣ Executar o Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📌 Considerações Finais

O ClinicaCare foi desenvolvido com foco em organização, praticidade e eficiência na gestão de clínicas médicas. A solução busca facilitar o gerenciamento de pacientes, médicos e consultas, proporcionando uma experiência mais moderna e organizada para profissionais da saúde e seus pacientes.
