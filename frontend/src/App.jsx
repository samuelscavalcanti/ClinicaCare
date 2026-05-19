import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DashMedico } from './pages/DashMedico';
import { DashPaciente } from './pages/DashPaciente';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  return (
    <div>
      {currentScreen === 'home' && (
        <Home 
          onNavigateToLogin={() => setCurrentScreen('login')} 
          onNavigateToRegister={() => setCurrentScreen('register')} 
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