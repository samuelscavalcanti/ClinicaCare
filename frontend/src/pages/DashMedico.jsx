import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import '../styles/DashMedico.css';
import {
  FaEdit,
  FaTrash,
  FaUserMd,
  FaSignOutAlt,
  FaSearch,
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
  FaSave,
  FaPlusCircle,
  FaTimes,
  FaChevronRight
} from 'react-icons/fa';
import { AppointmentDetail } from '../components/AppointmentDetail';

export function DashMedico({ onLogout }) {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ _id: null, paciente: '', data: '', hora: '', status: 'Agendada', tipo: 'Primeira Vez' });
  const [searchTerm, setSearchTerm] = useState('');

  // Currently selected appointment, shown on the detail page when set
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Fetch appointments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await api.appointments.getAll();
        setConsultas(data);
      } catch (err) {
        console.error('Erro ao buscar consultas:', err);
      } finally {
        setLoading(false);
      }
    };

    const user = api.auth.getCurrentUser();
    setCurrentUser(user);
    fetchAppointments();
  }, []);

  const agendadasCount = consultas.filter(c => c.status === 'Agendada').length;
  const concluidasCount = consultas.filter(c => c.status === 'Concluída').length;
  const canceladasCount = consultas.filter(c => c.status === 'Cancelada').length;

  const filteredConsultas = consultas.filter(c => 
    c.paciente.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.data.includes(searchTerm)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const updated = await api.appointments.update(formData._id, formData);
        setConsultas(consultas.map(c => c._id === formData._id ? updated : c));
        setIsEditing(false);
      } else {
        const created = await api.appointments.create(formData);
        setConsultas([...consultas, created]);
      }
      setFormData({ _id: null, paciente: '', data: '', hora: '', status: 'Agendada', tipo: 'Primeira Vez' });
    } catch (err) {
      alert(err.message || 'Erro ao processar consulta.');
    }
  };

  const handleEdit = (consulta) => {
    setFormData(consulta);
    setIsEditing(true);
    setSelectedAppointment(null);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Tem certeza que deseja remover permanentemente este registro?')) {
      try {
        await api.appointments.delete(id);
        setConsultas(consultas.filter(c => c._id !== id));
        setSelectedAppointment(null);
      } catch (err) {
        alert(err.message || 'Erro ao remover consulta.');
      }
    }
  };

  const handleLogout = () => {
    api.auth.logout();
    onLogout();
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="dash-wrapper fade-in">
      <header className="dash-header">
        <div className="dash-header-left">
          <h1 className="dash-logo">ClinicaCare</h1>
          <span className="dash-role-badge"><FaUserMd /> Área do Médico</span>
        </div>
        <div className="dash-user-section">
          <span className="user-greeting">Olá, <strong>Dr(a). {currentUser?.name || 'Médico(a)'}</strong></span>
          <button className="btn-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Encerrar Sessão
          </button>
        </div>
      </header>

      <main className="dash-main">
        {loading ? (
          <div className="empty-state">
            <div className="spinner" style={{ fontSize: '32px', marginBottom: '16px' }}>🔄</div>
            <strong>Carregando dados...</strong>
            <p>Conectando ao banco de dados ClinicaCare.</p>
          </div>
        ) : selectedAppointment ? (
          <AppointmentDetail
            appointment={selectedAppointment}
            role="doctor"
            onBack={() => setSelectedAppointment(null)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon icon-blue"><FaCalendarCheck /></div>
                <div className="metric-info">
                  <h4>Consultas Agendadas</h4>
                  <span>{agendadasCount}</span>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon icon-green"><FaCheckCircle /></div>
                <div className="metric-info">
                  <h4>Atendimentos Concluídos</h4>
                  <span>{concluidasCount}</span>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon icon-red"><FaTimesCircle /></div>
                <div className="metric-info">
                  <h4>Cancelamentos</h4>
                  <span>{canceladasCount}</span>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon icon-purple"><FaUsers /></div>
                <div className="metric-info">
                  <h4>Total de Pacientes</h4>
                  <span>{consultas.length}</span>
                </div>
              </div>
            </div>

            <div className="dash-layout">
              <aside className="content-card">
                <div className="card-header">
                  <h3>{isEditing ? 'Editar Registro' : 'Novo Agendamento'}</h3>
                </div>
                <form onSubmit={handleSubmit} className="dash-form">
                  <div className="form-group">
                    <label>Nome do Paciente</label>
                    <input type="text" name="paciente" value={formData.paciente} onChange={handleInputChange} placeholder="Ex: Maria Joaquina" required />
                  </div>
                  
                  <div className="row">
                    <div className="form-group">
                      <label>Data</label>
                      <input type="date" name="data" value={formData.data} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label>Hora</label>
                      <input type="time" name="hora" value={formData.hora} onChange={handleInputChange} required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Tipo de Consulta</label>
                    <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
                      <option value="Primeira Vez">Primeira Vez</option>
                      <option value="Retorno">Retorno</option>
                      <option value="Exame">Exame</option>
                      <option value="Cirurgia">Cirurgia</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status Atual</label>
                    <select name="status" value={formData.status} onChange={handleInputChange}>
                      <option value="Agendada">Agendada</option>
                      <option value="Concluída">Concluída</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      {isEditing ? <><FaSave /> Salvar Edição</> : <><FaPlusCircle /> Confirmar Agenda</>}
                    </button>
                    {isEditing && (
                      <button 
                        type="button" 
                        className="btn-secondary" 
                        onClick={() => {
                          setIsEditing(false); 
                          setFormData({ _id: null, paciente: '', data: '', hora: '', status: 'Agendada', tipo: 'Primeira Vez' });
                        }}
                      >
                        <FaTimes /> Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </aside>

              <section className="content-card">
                <div className="card-header">
                  <h3>Agenda Geral</h3>
                  <div className="search-bar" style={{ marginBottom: 0 }}>
                    <div className="search-input-wrap">
                      <FaSearch className="search-input-icon" />
                      <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Buscar paciente ou data..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="list-container">
                  {filteredConsultas.length === 0 ? (
                    <div className="empty-state">
                      <div style={{ fontSize: '32px', marginBottom: '16px' }}>🔍</div>
                      <strong>Nenhum resultado</strong>
                      <p>Não encontramos consultas correspondentes à busca.</p>
                    </div>
                  ) : (
                    filteredConsultas.map(c => (
                      <div key={c._id} className="list-item">
                        <div className="item-main" onClick={() => setSelectedAppointment(c)} title="Ver detalhes da consulta">
                          <div className="item-avatar">{getInitials(c.paciente)}</div>
                          <div className="item-details">
                            <strong>{c.paciente}</strong>
                            <span>
                              <span className={`badge ${c.status.toLowerCase()}`}>{c.status}</span>
                              • {c.data.split('-').reverse().join('/')} às {c.hora} • {c.tipo}
                            </span>
                          </div>
                        </div>
                        <div className="item-actions">
                          <button className="btn-icon" onClick={(e) => { e.stopPropagation(); handleEdit(c); }}>
                            <FaEdit /> Editar
                          </button>
                          <button
                            className="btn-icon danger"
                            onClick={(e) => { e.stopPropagation(); handleDelete(c._id); }}
                          >
                            <FaTrash /> Remover
                          </button>
                          <button
                            className="btn-icon-chevron"
                            onClick={(e) => { e.stopPropagation(); setSelectedAppointment(c); }}
                            title="Ver detalhes"
                          >
                            <FaChevronRight />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}