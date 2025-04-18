import React, { useState } from 'react';
import equipmentService from '../../services/equipmentService';

const CreateEquipmentModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    img_url: '',
    purpose: 'weapon'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await equipmentService.createEquipment(formData);
      onSuccess();
      onClose();
      setFormData({
        name: '',
        description: '',
        img_url: '',
        purpose: 'weapon'
      });
    } catch (error) {
      console.error('Error creating equipment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Додати нове спорядження</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Назва</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Опис</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">URL зображення</label>
            <input
              type="text"
              name="img_url"
              value={formData.img_url}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Призначення</label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="weapon">Зброя</option>
              <option value="humanitarian">Гуманітарне спорядження</option>
              <option value="vehicle">Транспорт</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Створити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEquipmentModal;
