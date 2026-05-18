import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import '../styles/auth.css';

export function Register({ onNavigateLogin, onNavigateHome }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Cadastro realizado:', { fullName, email, password, role });
    alert('Cadastro realizado com sucesso! Redirecionando para o login.');
    onNavigateLogin(); 
  };

  return (
    <div className="auth-container">
      <button onClick={onNavigateHome} className="btn-back-home">
        &larr; Voltar para a Página Inicial
      </button>

      <div className="auth-card">
        <div className="auth-header">
          <h2>Criar Conta</h2>
          <p>Escolha o seu perfil para se cadastrar.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <Input
            label="Nome Completo"
            id="fullName"
            placeholder="Ex: Maria Silva"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Endereço de E-mail"
            id="email"
            type="email"
            placeholder="nome@clinicacare.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Seleção do Tipo de Usuário com as novas classes do auth.css */}
          <div className="input-group">
            <label className="select-label">Eu sou um:</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="select-field"
            >
              <option value="patient">Paciente</option>
              <option value="doctor">Médico(a)</option>
            </select>
          </div>

          <Input
            label="Senha"
            id="password"
            type="password"
            placeholder="Mínimo de 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button text="Finalizar Cadastro" type="submit" />
        </form>

        <div className="auth-footer">
          <p>
            Já possui uma conta?{' '}
            <button onClick={onNavigateLogin}>
              Fazer Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}