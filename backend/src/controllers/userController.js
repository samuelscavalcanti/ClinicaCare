const User = require('../models/User');
const { dbConfig } = require('../config/db');
const { mockUser } = require('../config/mockDb');

const getUserModel = () => dbConfig.isMock ? mockUser : User;

// @desc    Get all registered doctors (id, name, specialty) so patients
//          can choose one by name from a list instead of typing it
// @route   GET /api/users/doctors
// @access  Private
const getDoctors = async (req, res) => {
  try {
    const UserModel = getUserModel();
    const doctors = await UserModel.find({ role: 'doctor' });

    const result = doctors
      .map(d => ({
        _id: d._id,
        name: d.name,
        specialty: d.specialty || 'Clínica Geral'
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDoctors
};
