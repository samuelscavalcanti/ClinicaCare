import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

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
        />
      )}
      {currentScreen === 'register' && (
        <Register 
          onNavigateLogin={() => setCurrentScreen('login')} 
          onNavigateHome={() => setCurrentScreen('home')} 
        />
      )}
    </div>
  );
}

export default App;