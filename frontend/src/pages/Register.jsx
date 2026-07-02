import React, { useState } from 'react';
import { FaArrowLeft, FaUser, FaUserMd, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/api';
import { SPECIALTIES } from '../constants/specialties';
import '../styles/auth.css';

export function Register({ onNavigateLogin, onNavigateHome, onRegisterSuccess }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [specialty, setSpecialty] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await api.auth.register(fullName, email, password, role, specialty);
      // Cadastro feito: entra direto no sistema, sem precisar logar de novo.
      onRegisterSuccess(data.role === 'doctor' ? 'dashMedico' : 'dashPaciente');
    } catch (err) {
      alert(err.message || 'Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <div className="auth-container">
      <button onClick={onNavigateHome} className="btn-back-home">
        <FaArrowLeft /> Voltar para a Página Inicial
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

          {/* Seleção do Tipo de Usuário, em formato de cartões clicáveis */}
          <div className="input-group">
            <label className="select-label">Eu sou um:</label>
            <div className="role-toggle">
              <button
                type="button"
                className={`role-toggle-option ${role === 'patient' ? 'active' : ''}`}
                onClick={() => setRole('patient')}
              >
                <FaUser /> Paciente
              </button>
              <button
                type="button"
                className={`role-toggle-option ${role === 'doctor' ? 'active' : ''}`}
                onClick={() => setRole('doctor')}
              >
                <FaUserMd /> Médico(a)
              </button>
            </div>
          </div>

          {role === 'doctor' && (
            <div className="input-group">
              <label className="select-label">Especialidade Médica</label>
              <select
                className="select-field"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
              >
                <option value="" disabled>Selecione sua especialidade</option>
                {SPECIALTIES.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          )}

          <Input
            label="Senha"
            id="password"
            type="password"
            placeholder="Mínimo de 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button text={<><FaUserPlus /> Finalizar Cadastro</>} type="submit" />
        </form>

        <div className="auth-footer">
          <p>
            Já possui uma conta?{' '}
            <button onClick={onNavigateLogin}>
              <FaSignInAlt /> Fazer Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
