import axios from 'axios';

const API_URL = "http://localhost:8000/user";  // Changed from 0.0.0.0 to localhost

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data) {
      // If token exists in response, store it
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    }
    throw new Error('Invalid response from server');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data.detail || 'Email already exists');
    }
    throw new Error('Помилка реєстрації');
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Store only the user data consistently
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Помилка входу');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userJson = localStorage.getItem('user');
  
  if (userJson) {
    try {
      const userData = JSON.parse(userJson);
      return userData.user || userData;
    } catch (error) {
      console.error('Помилка парсингу даних користувача', error);
      return null;
    }
  }
  
  return null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};