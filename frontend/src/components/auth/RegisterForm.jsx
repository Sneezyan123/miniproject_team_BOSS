import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { validateRegistrationForm } from '../../utils/validation';
import Input from '../common/Input';
import Button from '../common/Button';

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    militaryUnit: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));

    // Очищаємо попередню помилку для поля
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationResult = validateRegistrationForm(userData);
    
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    try {
      await register(userData);
      navigate('/login');
    } catch (error) {
      setErrors({ submit: error.message || 'Помилка реєстрації' });
    }
  };

  return (
    <div className="register-form">
      <h2 className="text-2xl mb-4 text-center">Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          label="Ім'я користувача"
          value={userData.username}
          onChange={handleChange}
          error={errors.username}
          required
        />
        <Input
          type="email"
          name="email"
          label="Електронна пошта"
          value={userData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <Input
          type="password"
          name="password"
          label="Пароль"
          value={userData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          label="Підтвердження паролю"
          value={userData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />
        <Input
          type="text"
          name="militaryUnit"
          label="Військова частина"
          value={userData.militaryUnit}
          onChange={handleChange}
          error={errors.militaryUnit}
        />
        {errors.submit && <p className="text-red-500 mb-4">{errors.submit}</p>}
        <Button type="submit" className="w-full">
          Зареєструватися
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;