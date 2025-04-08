import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../services/authService';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    position: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      console.log(credentials);
      const userData = await login(credentials);
      authLogin(userData);
      navigate('/dashboard');
    } catch (err) {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-50 p-8 rounded-lg shadow-sm max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Увійдіть в акаунт</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ваш email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ваш пароль"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="position" className="block text-gray-700 mb-2">Посада</label>
            <input
              type="text"
              id="position"
              name="position"
              placeholder="Логіст/Військовослужбовець"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={credentials.position}
              onChange={handleChange}
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-green-900 hover:bg-green-800 text-white py-2 px-4 rounded-md transition-colors"
          >
            Увійти
          </button>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
              Забули пароль?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;