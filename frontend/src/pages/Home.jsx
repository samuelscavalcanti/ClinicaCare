import React, { useState } from 'react';
import {
  FaSignInAlt,
  FaUserPlus,
  FaWhatsapp,
  FaCalendarCheck,
  FaFileMedicalAlt,
  FaUserClock,
  FaLock,
  FaEnvelope,
  FaArrowRight
} from 'react-icons/fa';
import { api } from '../services/api';
import '../styles/Home.css'; 

export function Home({ onNavigateToLogin, onNavigateToRegister, onLoginSuccess }) {
  const [quickEmail, setQuickEmail] = useState('');
  const [quickPassword, setQuickPassword] = useState('');
  const [quickError, setQuickError] = useState('');
  const [quickLoading, setQuickLoading] = useState(false);

  const handleQuickLogin = async (event) => {
    event.preventDefault();
    setQuickError('');
    setQuickLoading(true);
    try {
      const data = await api.auth.login(quickEmail, quickPassword);
      onLoginSuccess(data.role === 'doctor' ? 'dashMedico' : 'dashPaciente');
    } catch (err) {
      setQuickError(err.message || 'Erro ao realizar login. Tente novamente.');
    } finally {
      setQuickLoading(false);
    }
  };

  return (
    <div className="home-wrapper">
      <nav className="home-navbar">
        <div className="navbar-logo">
          <h1>ClinicaCare</h1>
        </div>
        <div className="navbar-links">
          <button onClick={onNavigateToLogin} className="nav-item">
            <FaSignInAlt /> Login
          </button>
          <button onClick={onNavigateToRegister} className="btn-primary-small">
            <FaUserPlus /> Criar Conta
          </button>
        </div>
      </nav>

      <main className="home-main">
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <h2 className="hero-title">Gestão clínica,<br/>simplificada e elegante.</h2>
              <p className="hero-subtitle">
                Centralize agendas, prontuários e a rotina da sua equipe em uma interface pensada para o bem-estar do seu fluxo de trabalho.
              </p>
              <div className="hero-actions">
                <button onClick={onNavigateToLogin} className="btn-primary-large">
                 Fazer Login
                </button>
                <button onClick={onNavigateToRegister} className="btn-secondary-large">
                  <FaUserPlus /> Criar Conta
                </button>
              </div>
            </div>

            <div className="hero-login-card">
              <h3> Acesso Rápido</h3>
              <p className="hero-login-subtitle">Entre direto por aqui, sem precisar trocar de página.</p>

              <form className="quick-login-form" onSubmit={handleQuickLogin}>
                <div className="quick-input-wrap">
                  <FaEnvelope className="quick-input-icon" />
                  <input
                    type="text"
                    placeholder="E-mail"
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="quick-input-wrap">
                  <FaLock className="quick-input-icon" />
                  <input
                    type="password"
                    placeholder="Senha"
                    value={quickPassword}
                    onChange={(e) => setQuickPassword(e.target.value)}
                    required
                  />
                </div>

                {quickError && <p className="quick-login-error">{quickError}</p>}

                <button type="submit" className="btn-primary-large quick-login-submit" disabled={quickLoading}>
                  {quickLoading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>

              <p className="quick-login-hint">
                Ainda não tem conta?{' '}
                <button type="button" onClick={onNavigateToRegister}>
                  Cadastre-se
                </button>
              </p>
            </div>
          </div>
        </section>

        <section className="features-section-minimal">
          <div className="feature-item">
            <div className="feature-icon"><FaCalendarCheck /></div>
            <h3>Agendamento Fluido</h3>
            <p>Organize horários e evite conflitos de forma natural e sem fricção.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><FaFileMedicalAlt /></div>
            <h3>Prontuários Integrados</h3>
            <p>Tenha o histórico do paciente sempre à mão, com segurança e clareza.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><FaUserClock /></div>
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
            <a href="https://wa.me/5583987789549" target="_blank" rel="noreferrer" title="WhatsApp: Doutora Nathalia">
              <FaWhatsapp /> Contato (Dra. Nathalia)
            </a>
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
