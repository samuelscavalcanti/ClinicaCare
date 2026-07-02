import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import '../styles/DashMedico.css'; 
import {
  FaUser,
  FaSignOutAlt,
  FaUserMd,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTimesCircle,
  FaCalendarPlus,
  FaPlus,
  FaStar,
  FaFileMedicalAlt,
  FaChevronRight
} from 'react-icons/fa';
import { AppointmentDetail } from '../components/AppointmentDetail';

const EMPTY_FORM = {
  especialidade: '',
  medico: '',
  medicoId: '',
  data: '',
  hora: '',
  tipo: 'Primeira Vez',
  local: 'Sala 102 - Andar 1'
};

export function DashPaciente({ onLogout }) {
  const [minhasConsultas, setMinhasConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // States for scheduling a new appointment
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);

  // Doctors available to choose from when scheduling (item: list, not free text)
  const [doctors, setDoctors] = useState([]);
  const [specialtyFilter, setSpecialtyFilter] = useState('Todas');

  // Currently selected appointment, shown on the detail page when set
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchMyAppointments = async () => {
    try {
      const data = await api.appointments.getAll();
      setMinhasConsultas(data);
    } catch (err) {
      console.error('Erro ao buscar consultas do paciente:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const data = await api.users.getDoctors();
      setDoctors(data);
    } catch (err) {
      console.error('Erro ao buscar médicos:', err);
    }
  };

  useEffect(() => {
    const user = api.auth.getCurrentUser();
    setCurrentUser(user);
    fetchMyAppointments();
    fetchDoctors();
  }, []);

  const handleLogout = () => {
    api.auth.logout();
    onLogout();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // When the patient picks a doctor from the list, the specialty is shown
  // automatically (read-only) — no need to type it.
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const chosenDoctor = doctors.find(d => d._id === doctorId);
    setFormData(prev => ({
      ...prev,
      medicoId: doctorId,
      medico: chosenDoctor ? chosenDoctor.name : '',
      especialidade: chosenDoctor ? chosenDoctor.specialty : ''
    }));
  };

  const specialtiesAvailable = ['Todas', ...new Set(doctors.map(d => d.specialty))];
  const filteredDoctors = specialtyFilter === 'Todas'
    ? doctors
    : doctors.filter(d => d.specialty === specialtyFilter);

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.appointments.create({
        ...formData,
        status: 'Agendada'
      });
      alert('Consulta agendada com sucesso!');
      setShowForm(false);
      setFormData(EMPTY_FORM);
      setSpecialtyFilter('Todas');
      fetchMyAppointments();
    } catch (err) {
      alert(err.message || 'Erro ao agendar consulta. Tente novamente.');
    }
  };

  const handleCancelAppointment = async (id) => {
    if (window.confirm('Deseja realmente cancelar este agendamento?')) {
      try {
        // We can either update status to 'Cancelada' or delete it.
        // Let's update status to 'Cancelada' to keep it in the history
        await api.appointments.update(id, { status: 'Cancelada' });
        alert('Consulta cancelada com sucesso.');
        setSelectedAppointment(null);
        fetchMyAppointments();
      } catch (err) {
        alert(err.message || 'Erro ao cancelar consulta.');
      }
    }
  };

  const proximaConsulta = minhasConsultas.find(c => c.status === 'Agendada');

  return (
    <div className="dash-wrapper fade-in">
      <header className="dash-header">
        <div className="dash-header-left">
          <h1 className="dash-logo">ClinicaCare</h1>
          <span className="dash-role-badge"><FaUser /> Área do Paciente</span>
        </div>
        <div className="dash-user-section">
          <span className="user-greeting">Olá, <strong>{currentUser?.name || 'Paciente'}</strong></span>
          <button className="btn-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Sair da Conta
          </button>
        </div>
      </header>

      <main className="dash-main">
        {loading ? (
          <div className="empty-state" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="spinner" style={{ fontSize: '32px', marginBottom: '16px' }}>🔄</div>
            <strong>Carregando dados...</strong>
            <p>Carregando histórico de consultas do banco de dados.</p>
          </div>
        ) : selectedAppointment ? (
          <AppointmentDetail
            appointment={selectedAppointment}
            role="patient"
            onBack={() => setSelectedAppointment(null)}
            onCancel={handleCancelAppointment}
          />
        ) : (
          <div className="dash-layout single-col" style={{ maxWidth: '900px', margin: '0 auto' }}>
            
            {/* Form de Novo Agendamento */}
            {showForm && (
              <div className="content-card fade-in" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div className="card-header">
                  <h3><FaCalendarPlus /> Agendar Nova Consulta</h3>
                </div>
                <form onSubmit={handleScheduleSubmit} className="dash-form">
                  <div className="row">
                    <div className="form-group">
                      <label>Filtrar por Especialidade</label>
                      <select
                        value={specialtyFilter}
                        onChange={(e) => setSpecialtyFilter(e.target.value)}
                      >
                        {specialtiesAvailable.map(esp => (
                          <option key={esp} value={esp}>{esp}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Especialidade Selecionada</label>
                      <input
                        type="text"
                        value={formData.especialidade}
                        placeholder="Selecione um médico ao lado"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Médico(a)</label>
                    {doctors.length === 0 ? (
                      <div className="empty-state" style={{ padding: '16px' }}>
                        <p style={{ margin: 0 }}>Nenhum médico cadastrado no momento. Tente novamente mais tarde.</p>
                      </div>
                    ) : (
                      <select
                        name="medicoId"
                        value={formData.medicoId}
                        onChange={handleDoctorChange}
                        required
                      >
                        <option value="" disabled>Selecione um médico(a)</option>
                        {filteredDoctors.map(doc => (
                          <option key={doc._id} value={doc._id}>
                            Dr(a). {doc.name} — {doc.specialty}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="row">
                    <div className="form-group">
                      <label>Data</label>
                      <input 
                        type="date" 
                        name="data" 
                        value={formData.data} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Hora</label>
                      <input 
                        type="time" 
                        name="hora" 
                        value={formData.hora} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-actions" style={{ marginTop: '16px' }}>
                    <button type="submit" className="btn-primary" disabled={!formData.medicoId}>
                      <FaCalendarPlus /> Confirmar Agendamento
                    </button>
                    <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                      <FaTimesCircle /> Voltar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Banner de Próxima Consulta */}
            {!showForm && (
              proximaConsulta ? (
                <div
                  className="content-card next-appointment-card"
                  style={{ background: '#0f172a', color: 'white', borderColor: 'transparent' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                    <div onClick={() => setSelectedAppointment(proximaConsulta)} style={{ cursor: 'pointer', flex: 1, minWidth: '200px' }}>
                      <h3 style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Sua Próxima Consulta</h3>
                      <h2 style={{ fontSize: '28px', margin: '0 0 16px 0', fontWeight: '700' }}>{proximaConsulta.especialidade}</h2>
                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FaUserMd style={{ fontSize: '18px' }} />
                          <span>{proximaConsulta.medico}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FaCalendarAlt style={{ fontSize: '18px' }} />
                          <span>{proximaConsulta.data.split('-').reverse().join('/')} às {proximaConsulta.hora}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FaMapMarkerAlt style={{ fontSize: '18px' }} />
                          <span>{proximaConsulta.local || 'Sala de Atendimento'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button 
                        className="btn-secondary" 
                        style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }} 
                        onClick={(e) => { e.stopPropagation(); handleCancelAppointment(proximaConsulta._id); }}
                      >
                        <FaTimesCircle /> Cancelar Consulta
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="content-card" style={{ background: '#f8fafc', textAlign: 'center', padding: '40px' }}>
                  <div style={{ fontSize: '36px', marginBottom: '16px', color: '#f59e0b' }}><FaStar /></div>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-main)' }}>Sua saúde está em dia!</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Você não possui consultas futuras agendadas.</p>
                  <button className="btn-primary" onClick={() => setShowForm(true)} style={{ maxWidth: '260px', margin: '0 auto' }}>
                    <FaCalendarPlus /> Agendar Nova Consulta
                  </button>
                </div>
              )
            )}

            {/* Histórico na Linha do Tempo */}
            <div className="content-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ margin: 0 }}>Histórico de Atendimentos</h3>
                {!showForm && proximaConsulta && (
                  <button className="btn-primary" onClick={() => setShowForm(true)} style={{ padding: '8px 16px', fontSize: '14px', flex: 'none' }}>
                    <FaPlus /> Agendar Outra
                  </button>
                )}
              </div>
              <div className="patient-timeline">
                {minhasConsultas.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                    Nenhuma consulta registrada no seu histórico.
                  </div>
                ) : (
                  minhasConsultas.map(c => (
                    <div key={c._id} className="timeline-item">
                      <div
                        className="timeline-card"
                        onClick={() => setSelectedAppointment(c)}
                        title="Ver detalhes da consulta"
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', gap: '8px' }}>
                          <strong style={{ fontSize: '16px', color: 'var(--text-main)' }}>{c.especialidade}</strong>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className={`badge ${c.status.toLowerCase()}`}>{c.status}</span>
                            <FaChevronRight style={{ color: 'var(--text-muted)', fontSize: '12px' }} />
                          </div>
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span><FaUserMd style={{ marginRight: '6px' }} />Com {c.medico}</span>
                          <span><FaCalendarAlt style={{ marginRight: '6px' }} />{c.data.split('-').reverse().join('/')} • {c.hora}</span>
                          {c.status === 'Concluída' && (
                            <a
                              href="#"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert('Visualização de laudos em desenvolvimento.'); }}
                              style={{ color: 'var(--primary)', marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', fontWeight: '500' }}
                            >
                              <FaFileMedicalAlt /> Ver receituário / Laudo
                            </a>
                          )}
                          {c.status === 'Agendada' && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleCancelAppointment(c._id); }} 
                              style={{ 
                                alignSelf: 'flex-start',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: 'none', 
                                border: 'none', 
                                color: 'var(--danger, #dc2626)', 
                                padding: 0, 
                                marginTop: '8px', 
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: '500'
                              }}
                            >
                              <FaTimesCircle /> Cancelar Consulta
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
