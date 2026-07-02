import React from 'react';
import {
  FaArrowLeft,
  FaUserMd,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaStethoscope,
  FaTimesCircle,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaHourglassHalf,
  FaBan,
  FaClipboardList
} from 'react-icons/fa';

const statusIcon = (status) => {
  switch (status) {
    case 'Concluída':
      return <FaCheckCircle />;
    case 'Cancelada':
      return <FaBan />;
    default:
      return <FaHourglassHalf />;
  }
};

export function AppointmentDetail({ appointment, role, onBack, onCancel, onEdit, onDelete }) {
  if (!appointment) return null;

  const dataFormatada = appointment.data ? appointment.data.split('-').reverse().join('/') : '—';

  return (
    <div className="dash-layout single-col" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button className="detail-back-btn" onClick={onBack}>
        <FaArrowLeft /> Voltar
      </button>

      <div className="content-card detail-hero">
        <div className="detail-hero-top">
          <span className={`badge ${(appointment.status || '').toLowerCase()}`}>
            {statusIcon(appointment.status)} {appointment.status}
          </span>
          <h2 className="detail-title">
            <FaStethoscope /> {appointment.especialidade || 'Consulta'}
          </h2>
        </div>

        <div className="detail-grid">
          <div className="detail-field">
            <span className="detail-label"><FaUserMd /> Médico(a)</span>
            <strong>{appointment.medico}</strong>
          </div>
          <div className="detail-field">
            <span className="detail-label"><FaUser /> Paciente</span>
            <strong>{appointment.paciente}</strong>
          </div>
          <div className="detail-field">
            <span className="detail-label"><FaCalendarAlt /> Data</span>
            <strong>{dataFormatada}</strong>
          </div>
          <div className="detail-field">
            <span className="detail-label"><FaClock /> Horário</span>
            <strong>{appointment.hora}</strong>
          </div>
          <div className="detail-field">
            <span className="detail-label"><FaMapMarkerAlt /> Local</span>
            <strong>{appointment.local || 'Não informado'}</strong>
          </div>
          <div className="detail-field">
            <span className="detail-label"><FaClipboardList /> Tipo de Consulta</span>
            <strong>{appointment.tipo || 'Não informado'}</strong>
          </div>
        </div>

        <div className="detail-actions">
          {role === 'patient' && appointment.status === 'Agendada' && (
            <button className="btn-secondary btn-danger-outline" onClick={() => onCancel(appointment._id)}>
              <FaTimesCircle /> Cancelar Consulta
            </button>
          )}

          {role === 'doctor' && (
            <>
              <button className="btn-primary" onClick={() => onEdit(appointment)}>
                <FaEdit /> Editar Consulta
              </button>
              <button className="btn-secondary btn-danger-outline" onClick={() => onDelete(appointment._id)}>
                <FaTrash /> Remover Consulta
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
