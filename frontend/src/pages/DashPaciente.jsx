import React from 'react';
import '../styles/DashMedico.css'; 

export function DashPaciente({ onLogout }) {
  const minhasConsultas = [
    { id: 1, especialidade: 'Cardiologia', medico: 'Dr. Roberto', data: '2026-05-20', hora: '14:00', status: 'Agendada', local: 'Sala 102 - Andar 1' },
    { id: 2, especialidade: 'Clínica Geral', medico: 'Dra. Ana', data: '2026-05-10', hora: '09:30', status: 'Concluída', local: 'Sala 205 - Andar 2' },
    { id: 3, especialidade: 'Nutrição', medico: 'Dra. Silva', data: '2026-04-05', hora: '11:00', status: 'Concluída', local: 'Sala 301 - Andar 3' },
  ];

  const proximaConsulta = minhasConsultas.find(c => c.status === 'Agendada');

  return (
    <div className="dash-wrapper fade-in">
      <header className="dash-header">
        <div className="dash-header-left">
          <h1 className="dash-logo">ClinicaCare</h1>
          <span className="dash-role-badge">Área do Paciente</span>
        </div>
        <div className="dash-user-section">
          <span className="user-greeting">Olá, <strong>Paciente</strong></span>
          <button className="btn-logout" onClick={onLogout}>Sair da Conta</button>
        </div>
      </header>

      <main className="dash-main">
        <div className="dash-layout single-col" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Banner de Próxima Consulta */}
          {proximaConsulta ? (
            <div className="content-card" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white', borderColor: 'transparent' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <h3 style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Sua Próxima Consulta</h3>
                  <h2 style={{ fontSize: '28px', margin: '0 0 16px 0', fontWeight: '700' }}>{proximaConsulta.especialidade}</h2>
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>👨‍⚕️</span>
                      <span>{proximaConsulta.medico}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>📅</span>
                      <span>{proximaConsulta.data.split('-').reverse().join('/')} às {proximaConsulta.hora}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>📍</span>
                      <span>{proximaConsulta.local}</span>
                    </div>
                  </div>
                </div>
                <div>
                   <button className="btn-secondary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }} onClick={() => alert('Para reagendamentos, entre em contato com a clínica.')}>Preciso Reagendar</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="content-card" style={{ background: '#f8fafc', textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🌟</div>
              <h3 style={{ fontSize: '18px', color: 'var(--text-main)' }}>Sua saúde está em dia!</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Você não possui consultas futuras agendadas.</p>
              <button className="btn-primary" onClick={() => alert('Função de agendamento online em breve!')} style={{ maxWidth: '250px' }}>Agendar Nova Consulta</button>
            </div>
          )}

          {/* Histórico na Linha do Tempo */}
          <div className="content-card">
            <div className="card-header">
              <h3>Histórico de Atendimentos</h3>
            </div>
            <div className="patient-timeline">
              {minhasConsultas.map(c => (
                <div key={c.id} className="timeline-item">
                  <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '16px', color: 'var(--text-main)' }}>{c.especialidade}</strong>
                      <span className={`badge ${c.status.toLowerCase()}`}>{c.status}</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span>Com {c.medico}</span>
                      <span>{c.data.split('-').reverse().join('/')} • {c.hora}</span>
                      {c.status === 'Concluída' && (
                        <a href="#" style={{ color: 'var(--primary)', marginTop: '8px', display: 'inline-block', textDecoration: 'none', fontWeight: '500' }}>Ver receituário / Laudo →</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
