import React, { useState, useEffect } from 'react';
import equipmentService from '../../services/equipmentService';

const EditEquipmentModal = ({ isOpen, onClose, onSuccess, equipment }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    img_url: '',
    purpose: '',
    detailed_description: '',
    quantity: 0
  });

  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name || '',
        description: equipment.description || '',
        img_url: equipment.img_url || '',
        purpose: equipment.purpose || 'weapon',
        detailed_description: equipment.detailed_description || '',
        quantity: equipment.quantity || 0
      });
    }
  }, [equipment]);

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
      await equipmentService.updateEquipment(equipment.id, formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating equipment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Редагувати спорядження</h2>
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

          <div className="mb-4">
            <label className="block mb-2">Кількість</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Детальний опис</label>
            <textarea
              name="detailed_description"
              value={formData.detailed_description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="5"
            />
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
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEquipmentModal;
