import React from 'react';

import '../styles/Home.css'; 

export function Home({ onNavigateToLogin, onNavigateToRegister }) {
  return (
    <div className="home-container">
      
      <nav className="home-nav">
        <h1 className="home-logo">ClinicaCare</h1>
        <div className="nav-actions">
          <button onClick={onNavigateToLogin} className="btn-login-ghost">
            Entrar
          </button>
          <button onClick={onNavigateToRegister} className="btn-register-solid">
            Cadastrar-se
          </button>
        </div>
      </nav>

      <header className="home-header">
        <h2>Gestão digital otimizada para clínicas médicas</h2>
        <p>
          Elimine planilhas manuais, previna conflitos de horários e proteja os dados dos seus pacientes em uma única plataforma limpa e intuitiva.
        </p>
      </header>

      <section className="features-section">
        <h3>Nossas Funcionalidades</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Gestão de Pacientes</h4>
            <p>Sistema CRUD completo para cadastrar, buscar e atualizar informações de pacientes com facilidade.</p>
          </div>
          <div className="feature-card">
            <h4>Diretório de Médicos</h4>
            <p>Controle de escalas profissionais, especialidades médicas e dados de contato da equipe ativa.</p>
          </div>
          <div className="feature-card">
            <h4>Agendamento Inteligente</h4>
            <p>Marque, remarque ou cancele consultas de forma dinâmica, eliminando problemas de duplicidade.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <h3>Entre em Contato com o Suporte</h3>
        <p>Tem alguma dúvida? Fale com a nossa equipe de engenharia e desenvolvimento.</p>
        <span className="contact-info">suporte@clinicacare.com | (83) 9999-9999</span>
        <p className="copyright">&copy; 2026 ClinicaCare. Desenvolvido por Acadêmicos de Sistemas de Informação.</p>
      </footer>

    </div>
  );
}