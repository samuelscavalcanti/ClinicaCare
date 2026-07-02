const http = require('http');

const API_URL = 'http://localhost:3000';
let token = '';
let createdAppointmentId = '';

const makeRequest = (method, path, body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const url = `${API_URL}${path}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, data: parsedData });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

async function runTests() {
  console.log('🏁 Iniciando testes da API do ClinicaCare...');

  try {
    // 1. Health check
    console.log('\nTesting Health Check...');
    const health = await makeRequest('GET', '/');
    console.log(`Status: ${health.status}`, health.data);

    // 2. Register patient
    console.log('\nTesting Register (Paciente)...');
    const regPatient = await makeRequest('POST', '/api/auth/register', {
      name: 'Paciente Teste Script',
      email: 'script.paciente@clinicacare.com',
      password: 'senha123password',
      role: 'patient'
    });
    console.log(`Status: ${regPatient.status}`, regPatient.data);

    // 3. Login
    console.log('\nTesting Login...');
    const loginRes = await makeRequest('POST', '/api/auth/login', {
      email: 'script.paciente@clinicacare.com',
      password: 'senha123password'
    });
    console.log(`Status: ${loginRes.status}`);
    if (loginRes.data && loginRes.data.token) {
      token = loginRes.data.token;
      console.log('✅ Token obtido com sucesso!');
    } else {
      console.log('❌ Falha ao obter token', loginRes.data);
      return;
    }

    // 4. Create appointment
    console.log('\nTesting Create Appointment...');
    const newAppointment = await makeRequest('POST', '/api/appointments', {
      medico: 'Dr. Roberto Script',
      especialidade: 'Cardiologia',
      data: '2026-06-25',
      hora: '14:30',
      tipo: 'Primeira Vez',
      local: 'Sala 101'
    });
    console.log(`Status: ${newAppointment.status}`, newAppointment.data);
    if (newAppointment.data && newAppointment.data._id) {
      createdAppointmentId = newAppointment.data._id;
      console.log(`✅ Consulta criada com ID: ${createdAppointmentId}`);
    }

    // 5. Get appointments
    console.log('\nTesting Get Appointments...');
    const getApps = await makeRequest('GET', '/api/appointments');
    console.log(`Status: ${getApps.status}, Total consultas encontradas: ${getApps.data.length || 0}`);

    if (createdAppointmentId) {
      // 6. Update appointment
      console.log('\nTesting Update Appointment...');
      const updateRes = await makeRequest('PUT', `/api/appointments/${createdAppointmentId}`, {
        status: 'Concluída',
        local: 'Sala 202 - Nova Sala'
      });
      console.log(`Status: ${updateRes.status}`, updateRes.data);

      // 7. Delete appointment
      console.log('\nTesting Delete Appointment...');
      const deleteRes = await makeRequest('DELETE', `/api/appointments/${createdAppointmentId}`);
      console.log(`Status: ${deleteRes.status}`, deleteRes.data);
    }

    console.log('\n🎉 Todos os testes de API foram executados com sucesso!');
  } catch (error) {
    console.error('\n❌ Erro durante a execução dos testes:', error);
  }
}

// Give server time to boot or assume it is running when this script executes
runTests();
