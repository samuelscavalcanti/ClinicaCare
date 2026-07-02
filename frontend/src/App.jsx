import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DashMedico } from './pages/DashMedico';
import { DashPaciente } from './pages/DashPaciente';
import { api } from './services/api';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  // Verify active session on mount
  useEffect(() => {
    const user = api.auth.getCurrentUser();
    const token = localStorage.getItem('token');
    if (user && token) {
      if (user.role === 'doctor') {
        setCurrentScreen('dashMedico');
      } else {
        setCurrentScreen('dashPaciente');
      }
    }
  }, []);

  return (
    <div>
      {currentScreen === 'home' && (
        <Home 
          onNavigateToLogin={() => setCurrentScreen('login')} 
          onNavigateToRegister={() => setCurrentScreen('register')} 
          onLoginSuccess={(dashboardType) => setCurrentScreen(dashboardType)}
        />
      )}
      {currentScreen === 'login' && (
        <Login 
          onNavigateRegister={() => setCurrentScreen('register')} 
          onNavigateHome={() => setCurrentScreen('home')} 
          onLoginSuccess={(dashboardType) => setCurrentScreen(dashboardType)}
        />
      )}
      {currentScreen === 'register' && (
        <Register 
          onNavigateLogin={() => setCurrentScreen('login')} 
          onNavigateHome={() => setCurrentScreen('home')} 
          onRegisterSuccess={(dashboardType) => setCurrentScreen(dashboardType)}
        />
      )}
      {currentScreen === 'dashMedico' && (
        <DashMedico 
          onLogout={() => setCurrentScreen('home')} 
        />
      )}
      {currentScreen === 'dashPaciente' && (
        <DashPaciente 
          onLogout={() => setCurrentScreen('home')} 
        />
      )}
    </div>
  );
}

export default App;