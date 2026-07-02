const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { dbConfig } = require('../config/db');
const { mockAppointment, mockUser } = require('../config/mockDb');

const getAppointmentModel = () => dbConfig.isMock ? mockAppointment : Appointment;
const getUserModel = () => dbConfig.isMock ? mockUser : User;

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    let appointments;
    const AppointmentModel = getAppointmentModel();

    if (req.user.role === 'doctor') {
      // Doctors see all appointments
      const resFind = await AppointmentModel.find({});
      // Mock db returns the direct object with sort function, real Mongoose returns query
      appointments = typeof resFind.sort === 'function' ? resFind.sort() : await AppointmentModel.find({}).sort({ data: 1, hora: 1 });
    } else {
      // Patients see only their own appointments
      const query = {
        $or: [
          { patientId: req.user._id },
          { paciente: req.user.name }
        ]
      };
      const resFind = await AppointmentModel.find(query);
      appointments = typeof resFind.sort === 'function' ? resFind.sort() : await AppointmentModel.find(query).sort({ data: 1, hora: 1 });
    }

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    const { paciente, medico, especialidade, data, hora, status, tipo, local } = req.body;
    const AppointmentModel = getAppointmentModel();
    const UserModel = getUserModel();

    let appointmentData = {
      data,
      hora,
      status: status || 'Agendada',
      tipo: tipo || 'Primeira Vez',
      local: local || 'Sala de Atendimento'
    };

    if (req.user.role === 'doctor') {
      // Doctor is creating the appointment
      if (!paciente) {
        return res.status(400).json({ message: 'Nome do paciente é obrigatório' });
      }
      appointmentData.paciente = paciente;
      appointmentData.medico = req.user.name;
      appointmentData.especialidade = req.user.specialty || 'Clínica Geral';
      appointmentData.doctorId = req.user._id;

      // Try to link to an existing patient if they are registered
      const patientUser = await UserModel.findOne({ name: { $regex: new RegExp(`^${paciente.trim()}$`, 'i') }, role: 'patient' });
      if (patientUser) {
        appointmentData.patientId = patientUser._id;
      }
    } else {
      // Patient is scheduling
      appointmentData.paciente = req.user.name;
      appointmentData.patientId = req.user._id;
      appointmentData.medico = medico || 'Dr. Roberto';
      appointmentData.especialidade = especialidade || 'Clínica Geral';
      appointmentData.local = local || 'Consultório Principal';
      if (req.body.doctorId) {
        appointmentData.doctorId = req.body.doctorId;
      }
    }

    const newAppointment = await AppointmentModel.create(appointmentData);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    const AppointmentModel = getAppointmentModel();
    const UserModel = getUserModel();
    const appointment = await AppointmentModel.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Consulta não encontrada' });
    }

    // Authorization check
    if (req.user.role === 'patient' && 
        appointment.patientId?.toString() !== req.user._id.toString() &&
        appointment.paciente !== req.user.name) {
      return res.status(403).json({ message: 'Não autorizado a editar esta consulta' });
    }

    // Update fields
    const fieldsToUpdate = [
      'paciente', 'medico', 'especialidade', 'data', 'hora', 'status', 'tipo', 'local'
    ];

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        appointment[field] = req.body[field];
      }
    });

    // If a doctor updates the patient name, try to re-link patientId
    if (req.user.role === 'doctor' && req.body.paciente) {
      const patientUser = await UserModel.findOne({ name: { $regex: new RegExp(`^${req.body.paciente.trim()}$`, 'i') }, role: 'patient' });
      if (patientUser) {
        appointment.patientId = patientUser._id;
      } else {
        appointment.patientId = undefined;
      }
    }

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res) => {
  try {
    const AppointmentModel = getAppointmentModel();
    const appointment = await AppointmentModel.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Consulta não encontrada' });
    }

    // Authorization check
    if (req.user.role === 'patient' && 
        appointment.patientId?.toString() !== req.user._id.toString() &&
        appointment.paciente !== req.user.name) {
      return res.status(403).json({ message: 'Não autorizado a remover esta consulta' });
    }

    await appointment.deleteOne();
    res.json({ message: 'Consulta removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
