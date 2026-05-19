import React from 'react';
import '../styles/Home.css'; 

export function Home({ onNavigateToLogin, onNavigateToRegister }) {
  return (
    <div className="home-wrapper">
      <nav className="home-navbar">
        <div className="navbar-logo">
          <h1>ClinicaCare</h1>
        </div>
        <div className="navbar-links">
          <button onClick={onNavigateToLogin} className="nav-item">Login</button>
          <button onClick={onNavigateToRegister} className="btn-primary-small">Criar Conta</button>
        </div>
      </nav>

      <main className="home-main">
        <section className="hero-section">
          <h2 className="hero-title">Gestão clínica,<br/>simplificada e elegante.</h2>
          <p className="hero-subtitle">
            Centralize agendas, prontuários e a rotina da sua equipe em uma interface pensada para o bem-estar do seu fluxo de trabalho.
          </p>
          <div className="hero-actions">
            <button onClick={onNavigateToLogin} className="btn-primary-large">
              Fazer Login
            </button>
            <button onClick={onNavigateToRegister} className="btn-secondary-large">
              Criar Conta
            </button>
          </div>
        </section>

        <section className="features-section-minimal">
          <div className="feature-item">
            <h3>Agendamento Fluido</h3>
            <p>Organize horários e evite conflitos de forma natural e sem fricção.</p>
          </div>
          <div className="feature-item">
            <h3>Prontuários Integrados</h3>
            <p>Tenha o histórico do paciente sempre à mão, com segurança e clareza.</p>
          </div>
          <div className="feature-item">
            <h3>Controle de Escalas</h3>
            <p>Gerencie a disponibilidade da equipe médica com total precisão.</p>
          </div>
        </section>
      </main>

      <footer className="home-minimal-footer fade-in-delay-2">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">ClinicaCare</span>
            <p>Design focado no cuidado e na usabilidade.</p>
          </div>
          <div className="footer-links-group">
            <a href="#">Sobre</a>
            <a href="https://wa.me/5583987789549" target="_blank" rel="noreferrer" title="WhatsApp: Doutora Nathalia">Contato (Dra. Nathalia)</a>
            <a href="#">Privacidade</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-text">© 2026 ClinicaCare. Projeto acadêmico.</span>
        </div>
      </footer>
    </div>
  );
}