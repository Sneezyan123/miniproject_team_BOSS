import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import requestService from '../services/requestService';
import equipmentService from '../services/equipmentService';

const priorityStyles = {
  low: {
    bg: 'bg-green-50',
    text: 'text-green-800',
    border: 'border-green-200'
  },
  medium: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-800',
    border: 'border-yellow-200'
  },
  high: {
    bg: 'bg-orange-50',
    text: 'text-orange-800',
    border: 'border-orange-200'
  },
  critical: {
    bg: 'bg-red-50',
    text: 'text-red-800',
    border: 'border-red-200'
  }
};

const RequestFormPage = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const data = await equipmentService.getFreeEquipment();
        setEquipment(data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  const handleAddItem = (item) => {
    const existingItem = selectedItems.find(
      selected => selected.equipment_id === item.id
    );

    if (existingItem) {
      return;
    }

    setSelectedItems(prev => [...prev, {
      equipment_id: item.id,
      equipment_name: item.name,
      quantity: 1
    }]);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    setSelectedItems(prev => prev.map((item, i) => {
      if (i !== index) return item;
      
      // Знаходимо максимальну доступну кількість
      const equipmentItem = equipment.find(e => e.id === item.equipment_id);
      const maxQuantity = equipmentItem ? equipmentItem.quantity : 1;
      
      // Якщо введене значення більше за максимальне, встановлюємо максимальне
      if (field === 'quantity' && value > maxQuantity) {
        value = maxQuantity;
      }
      
      return { ...item, [field]: value };
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;

    try {
      await requestService.createRequest({
        description,
        priority,
        items: selectedItems.map(item => ({
          equipment_id: item.equipment_id,
          quantity: item.quantity
        }))
      });
      navigate('/requests');
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  if (loading) return <div>Завантаження...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Запит на постачання</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Equipment Selection */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Виберіть спорядження</h2>
          <div className="grid gap-4">
            {equipment.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleAddItem(item)}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm font-medium text-green-700">
                      Доступна кількість: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Form */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Деталі запиту</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block mb-2">Пріоритет запиту</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`w-full p-2 border rounded ${priorityStyles[priority].bg} ${priorityStyles[priority].text} ${priorityStyles[priority].border}`}
              >
                <option value="low" className={`${priorityStyles.low.bg} ${priorityStyles.low.text}`}>Низький</option>
                <option value="medium" className={`${priorityStyles.medium.bg} ${priorityStyles.medium.text}`}>Середній</option>
                <option value="high" className={`${priorityStyles.high.bg} ${priorityStyles.high.text}`}>Високий</option>
                <option value="critical" className={`${priorityStyles.critical.bg} ${priorityStyles.critical.text}`}>Критичний</option>
              </select>
            </div>

            {selectedItems.map((item, index) => (
              <div key={index} className="mb-4 border p-4 rounded">
                <h3 className="font-medium">{item.equipment_name}</h3>
                <div className="flex gap-4 mt-2">
                  <div>
                    <label className="block mb-2">Кількість</label>
                    <input
                      type="number"
                      min="1"
                      max={equipment.find(e => e.id === item.equipment_id)?.quantity || 1}
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                      className="w-full p-2 border rounded"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Максимально доступно: {equipment.find(e => e.id === item.equipment_id)?.quantity || 0}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="mt-2 text-red-600"
                >
                  Видалити
                </button>
              </div>
            ))}

            <div>
              <label className="block mb-2">Опис/Обґрунтування</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              />
            </div>

            <button
              type="submit"
              disabled={selectedItems.length === 0}
              className="w-full bg-green-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
            >
              Відправити запит
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestFormPage;
