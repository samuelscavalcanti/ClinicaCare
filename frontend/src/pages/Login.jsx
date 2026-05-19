import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import '../styles/auth.css';

export function Login({ onNavigateRegister, onNavigateHome, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = email.trim().toLowerCase();
    if (user === 'medico' && password === '123') {
      onLoginSuccess('dashMedico');
    } else if (user === 'paciente' && password === '123') {
      onLoginSuccess('dashPaciente');
    } else {
      alert('Credenciais inválidas. Tente medico/123 ou paciente/123');
    }
  };

  return (
    <div className="auth-container">
      <button onClick={onNavigateHome} className="btn-back-home">
        &larr; Voltar para a Página Inicial
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
            placeholder="Digite 'medico' ou 'paciente'"
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

          <Button text="Entrar no Sistema" type="submit" />
        </form>

        <div className="auth-footer">
          <p>
            Não tem uma conta?{' '}
            <button onClick={onNavigateRegister}>
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}