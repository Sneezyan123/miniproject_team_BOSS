import React, { useState } from 'react';
import equipmentService from '../../services/equipmentService';

const CreateEquipmentModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    img_url: '',
    purpose: 'weapon',
    detailed_description: '',
    quantity: 0
  });

  const [descriptionMode, setDescriptionMode] = useState('manual');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateAIDescription = async () => {
    try {
      setIsGeneratingAI(true);
      const response = await equipmentService.generateAIDescription({
        name: formData.name,
        description: formData.description,
        purpose: formData.purpose
      });
      setFormData(prev => ({
        ...prev,
        detailed_description: response.detailed_description
      }));
    } catch (error) {
      console.error('Error generating AI description:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      await equipmentService.createEquipment(formData);
      onSuccess();
      onClose();
      setFormData({
        name: '',
        description: '',
        img_url: '',
        purpose: 'weapon',
        quantity: 0
      });
    } catch (error) {
      console.error('Error creating equipment:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
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
            <div className="mb-2">
              <select
                value={descriptionMode}
                onChange={(e) => setDescriptionMode(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="manual">Написати самостійно</option>
                <option value="ai">Згенерувати за допомогою ШІ</option>
              </select>
            </div>

            {descriptionMode === 'manual' ? (
              <textarea
                name="detailed_description"
                value={formData.detailed_description || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="5"
                placeholder="Введіть детальний опис спорядження..."
              />
            ) : (
              <div>
                <button
                  type="button"
                  onClick={generateAIDescription}
                  disabled={isGeneratingAI || !formData.name}
                  className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {isGeneratingAI ? 'Генерування...' : 'Згенерувати опис'}
                </button>
                {formData.detailed_description && (
                  <textarea
                    name="detailed_description"
                    value={formData.detailed_description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="5"
                  />
                )}
              </div>
            )}
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
