import React, { useState, useEffect } from 'react';
import userServices from '../../services/userServices';

const EditProfileModal = ({ isOpen, onClose, profile, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    email: '',
    avatar_url: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        email: profile.email || '',
        avatar_url: profile.avatar_url || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userServices.updateProfile(formData);
      onProfileUpdate();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Редагування профілю</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL аватару
            </label>
            <input
              type="url"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="https://example.com/avatar.jpg"
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

export default EditProfileModal;
