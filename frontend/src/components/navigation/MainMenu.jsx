import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import tridentLogo from '../../assets/images/logo.png'; // Make sure your logo is here

const MainMenu = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="main-menu">
      <div className="nav-container">
        <div className="logo-section">
          <img src={tridentLogo} alt="Тризуб" className="logo-image" />
          <Link to="/" className="app-name">App name</Link>
        </div>
        
        <div className="nav-links">
          <Link to="/storage">Склад</Link>
          <Link to="/support">Технічна підтримка</Link>
        </div>
        
        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="login-button">Панель</Link>
              <button onClick={logout} className="login-button">Вийти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-button">Увійти</Link>
              <Link to="/register" className="register-button">Зареєструватися</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainMenu;