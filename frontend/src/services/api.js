const API_URL = 'http://localhost:3000/api';

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Algo deu errado');
  }

  return data;
};

export const api = {
  auth: {
    login: async (email, password) => {
      const data = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        specialty: data.specialty
      }));
      return data;
    },
    register: async (name, email, password, role, specialty) => {
      const data = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role, specialty }),
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        specialty: data.specialty
      }));
      return data;
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    getCurrentUser: () => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
  },
  appointments: {
    getAll: async () => {
      return await request('/appointments');
    },
    create: async (appointmentData) => {
      return await request('/appointments', {
        method: 'POST',
        body: JSON.stringify(appointmentData),
      });
    },
    update: async (id, appointmentData) => {
      return await request(`/appointments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(appointmentData),
      });
    },
    delete: async (id) => {
      return await request(`/appointments/${id}`, {
        method: 'DELETE',
      });
    }
  },
  users: {
    getDoctors: async () => {
      return await request('/users/doctors');
    }
  }
};
