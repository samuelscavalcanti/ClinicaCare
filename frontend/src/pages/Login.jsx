import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import '../styles/auth.css';

export function Login({ onNavigateRegister, onNavigateHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Dados de login enviados:', { email, password });
    alert('Login enviado! (A integração com o Dashboard do seu colega acontecerá aqui)');
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
            label="Endereço de E-mail"
            id="email"
            type="email"
            placeholder="seu-nome@clinicacare.com"
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