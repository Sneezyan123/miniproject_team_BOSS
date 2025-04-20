import React, { useState } from 'react';
import userServices from '../../services/userServices';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setPasswords(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('Нові паролі не співпадають');
      return;
    }

    try {
      await userServices.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      onClose();
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Зміна паролю</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Поточний пароль
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Новий пароль
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Підтвердження нового паролю
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
