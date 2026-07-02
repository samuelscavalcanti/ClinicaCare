const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
 
const DATA_FILE = path.join(__dirname, 'mockData.json');

const users = [];
const appointments = [];

const attachUserMethods = (user) => ({
  ...user,
  matchPassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
});

const persist = () => {
  try {
    const plainUsers = users.map(({ matchPassword, ...rest }) => rest);
    fs.writeFileSync(DATA_FILE, JSON.stringify({ users: plainUsers, appointments }, null, 2));
  } catch (error) {
    console.warn('⚠️ Não foi possível salvar o banco de dados em memória no disco:', error.message);
  }
};

const loadFromDisk = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      (parsed.users || []).forEach(u => users.push(attachUserMethods(u)));
      (parsed.appointments || []).forEach(a => appointments.push(a));
      console.log(`💾 Banco Mock carregado do disco: ${users.length} usuário(s), ${appointments.length} consulta(s).`);
    }
  } catch (error) {
    console.warn('⚠️ Não foi possível carregar o banco de dados em memória do disco:', error.message);
  }
};

loadFromDisk();

const mockUser = {
  findOne: async (query) => {
    if (query.email) {
      return users.find(u => u.email.toLowerCase() === query.email.toLowerCase()) || null;
    }
    if (query.name) {
      // Name search (regex style or exact match)
      const nameQuery = query.name.$regex ? query.name.source : query.name;
      return users.find(u => u.name.toLowerCase() === nameQuery.toLowerCase()) || null;
    }
    return null;
  },
  findById: async (id) => {
    const user = users.find(u => u._id === id.toString());
    if (user) {
      return {
        ...user,
        select: function(fields) {
          if (fields.includes('-password')) {
            const { password, ...rest } = user;
            return rest;
          }
          return user;
        }
      };
    }
    return null;
  },
  find: async (query = {}) => {
    let filtered = [...users];
    if (query.role) {
      filtered = filtered.filter(u => u.role === query.role);
    }
    return filtered;
  },
  create: async (userData) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const newUser = {
      _id: Math.random().toString(36).substring(2, 9),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'patient',
      specialty: userData.specialty || '',
      matchPassword: async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      }
    };
    users.push(newUser);
    persist();
    return newUser;
  }
};

const mockAppointment = {
  find: async (query) => {
    let filtered = [...appointments];
    if (query.$or) {
      const patientId = query.$or[0].patientId;
      const pacienteName = query.$or[1].paciente;
      filtered = appointments.filter(a => 
        (patientId && a.patientId?.toString() === patientId.toString()) || 
        (pacienteName && a.paciente.toLowerCase() === pacienteName.toLowerCase())
      );
    }
    
    // Return with helper functions (like sort)
    return {
      sort: () => {
        return filtered.sort((a, b) => {
          const dateComp = a.data.localeCompare(b.data);
          if (dateComp !== 0) return dateComp;
          return a.hora.localeCompare(b.hora);
        });
      },
      filtered
    };
  },
  findById: async (id) => {
    const app = appointments.find(a => a._id === id);
    if (!app) return null;
    return {
      ...app,
      save: async function() {
        const idx = appointments.findIndex(a => a._id === id);
        if (idx !== -1) {
          appointments[idx] = this;
          persist();
        }
        return this;
      },
      deleteOne: async function() {
        const idx = appointments.findIndex(a => a._id === id);
        if (idx !== -1) {
          appointments.splice(idx, 1);
          persist();
        }
      }
    };
  },
  create: async (appData) => {
    const newApp = {
      _id: Math.random().toString(36).substring(2, 9),
      ...appData,
      patientId: appData.patientId ? appData.patientId.toString() : undefined,
      doctorId: appData.doctorId ? appData.doctorId.toString() : undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    appointments.push(newApp);
    persist();
    return newApp;
  }
};

module.exports = {
  mockUser,
  mockAppointment,
  users,
  appointments
};
