import React, { useState } from 'react';
import '../styles/DashMedico.css';

export function DashMedico({ onLogout }) {
  const [consultas, setConsultas] = useState([
    { id: 1, paciente: 'João Carlos Silva', data: '2026-05-20', hora: '14:00', status: 'Agendada', tipo: 'Retorno' },
    { id: 2, paciente: 'Maria Souza Ramos', data: '2026-05-21', hora: '09:30', status: 'Concluída', tipo: 'Primeira Vez' },
    { id: 3, paciente: 'Pedro Almeida', data: '2026-05-22', hora: '16:15', status: 'Cancelada', tipo: 'Exame' },
    { id: 4, paciente: 'Ana Beatriz', data: '2026-05-20', hora: '10:00', status: 'Agendada', tipo: 'Primeira Vez' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ id: null, paciente: '', data: '', hora: '', status: 'Agendada', tipo: 'Primeira Vez' });
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setConsultas(consultas.map(c => c.id === formData.id ? formData : c));
      setIsEditing(false);
    } else {
      setConsultas([...consultas, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: null, paciente: '', data: '', hora: '', status: 'Agendada', tipo: 'Primeira Vez' });
  };

  const handleEdit = (consulta) => {
    setFormData(consulta);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if(window.confirm('Tem certeza que deseja remover permanentemente este registro?')) {
      setConsultas(consultas.filter(c => c.id !== id));
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="dash-wrapper fade-in">
      <header className="dash-header">
        <div className="dash-header-left">
          <h1 className="dash-logo">ClinicaCare</h1>
          <span className="dash-role-badge">Painel Médico</span>
        </div>
        <div className="dash-user-section">
          <span className="user-greeting">Olá, <strong>Dr(a). Médico(a)</strong></span>
          <button className="btn-logout" onClick={onLogout}>Encerrar Sessão</button>
        </div>
      </header>

      <main className="dash-main">
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon icon-blue">📅</div>
            <div className="metric-info">
              <h4>Consultas Agendadas</h4>
              <span>{agendadasCount}</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon icon-green">✓</div>
            <div className="metric-info">
              <h4>Atendimentos Concluídos</h4>
              <span>{concluidasCount}</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon icon-red">✕</div>
            <div className="metric-info">
              <h4>Cancelamentos</h4>
              <span>{canceladasCount}</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon icon-purple">👥</div>
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
                <button type="submit" className="btn-primary">{isEditing ? 'Salvar Edição' : 'Confirmar Agenda'}</button>
                {isEditing && <button type="button" className="btn-secondary" onClick={() => {setIsEditing(false); setFormData({ id: null, paciente: '', data: '', hora: '', status: 'Agendada', tipo: 'Primeira Vez' });}}>Cancelar</button>}
              </div>
            </form>
          </aside>

          <section className="content-card">
            <div className="card-header">
              <h3>Agenda Geral</h3>
              <div className="search-bar" style={{ marginBottom: 0 }}>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Buscar paciente ou data..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                  <div key={c.id} className="list-item">
                    <div className="item-main">
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
                      <button className="btn-icon" onClick={() => handleEdit(c)}>Editar</button>
                      <button className="btn-icon danger" onClick={() => handleDelete(c.id)}>Remover</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
