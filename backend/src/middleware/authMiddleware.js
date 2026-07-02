const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { dbConfig } = require('../config/db');
const { mockUser } = require('../config/mockDb');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clinicacare_secret_token_key_123!');

      const UserModel = dbConfig.isMock ? mockUser : User;
      const user = await UserModel.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'Não autorizado, usuário não encontrado' });
      }

      // Get user from the token (exclude password)
      req.user = dbConfig.isMock ? user.select('-password') : user;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Não autorizado, token inválido' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado, sem token' });
  }
};

// Check if user is a doctor
const doctorOnly = (req, res, next) => {
  if (req.user && req.user.role === 'doctor') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado: Apenas médicos podem acessar este recurso' });
  }
};

module.exports = { protect, doctorOnly };
