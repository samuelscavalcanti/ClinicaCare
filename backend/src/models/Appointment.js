const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  paciente: {
    type: String,
    required: [true, 'Nome do paciente é obrigatório']
  },
  medico: {
    type: String,
    required: [true, 'Nome do médico é obrigatório']
  },
  especialidade: {
    type: String,
    required: [true, 'Especialidade médica é obrigatória']
  },
  data: {
    type: String,
    required: [true, 'Data é obrigatória']
  },
  hora: {
    type: String,
    required: [true, 'Hora é obrigatória']
  },
  status: {
    type: String,
    enum: ['Agendada', 'Concluída', 'Cancelada'],
    default: 'Agendada'
  },
  tipo: {
    type: String,
    default: 'Primeira Vez'
  },
  local: {
    type: String,
    default: 'Consultório Principal'
  },
  patientId: {
    type: String
  },
  doctorId: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
