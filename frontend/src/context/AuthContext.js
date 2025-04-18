import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, logout, isAuthenticated } from '../services/authService';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  const login = (userData) => {
    // If we receive the combined token+user object, extract just the user
    const userToStore = userData.user || userData;
    setUser(userToStore);
    setAuthenticated(true);
  };

  const performLogout = () => {
    logout();
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: authenticated, 
        login, 
        logout: performLogout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};