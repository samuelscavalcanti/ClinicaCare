import React, { useState } from 'react';
import { FaArrowLeft, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/api';
import '../styles/auth.css';

export function Login({ onNavigateRegister, onNavigateHome, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await api.auth.login(email, password);
      if (data.role === 'doctor') {
        onLoginSuccess('dashMedico');
      } else {
        onLoginSuccess('dashPaciente');
      }
    } catch (err) {
      alert(err.message || 'Erro ao realizar login. Tente novamente.');
    }
  };

  return (
    <div className="auth-container">
      <button onClick={onNavigateHome} className="btn-back-home">
        <FaArrowLeft /> Voltar para a Página Inicial
      </button>

      <div className="auth-card">
        <div className="auth-header">
          <h2>ClinicaCare</h2>
          <p>Olá! Faça login para acessar sua área profissional.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            label="Usuário (medico ou paciente)"
            id="email"
            type="text"
            placeholder="Insira seu e-mail."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Senha"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button text={<><FaSignInAlt /> Entrar no Sistema</>} type="submit" />
        </form>

        <div className="auth-footer">
          <p>
            Não tem uma conta?{' '}
            <button onClick={onNavigateRegister}>
              <FaUserPlus /> Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
