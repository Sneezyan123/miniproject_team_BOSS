import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import requestService from '../services/requestService';
import equipmentService from '../services/equipmentService';

const priorityStyles = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
  critical: 'bg-orange-100 text-orange-800'
};

const RequestFormPage = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEquipment) return;

    try {
      await requestService.createRequest({
        equipment_id: selectedEquipment.id,
        quantity,
        description,
        priority
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
                onClick={() => setSelectedEquipment(item)}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedEquipment?.id === item.id ? 'border-green-500 bg-green-50' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image_url || '/default-item.png'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
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
            {selectedEquipment && (
              <div className="mb-4">
                <h3 className="font-medium">Вибране спорядження:</h3>
                <p>{selectedEquipment.name}</p>
              </div>
            )}

            <div>
              <label className="block mb-2">Кількість</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Пріоритет</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`w-full p-2 border rounded ${priorityStyles[priority]}`}
              >
                <option value="low" className={priorityStyles.low}>Низький</option>
                <option value="medium" className={priorityStyles.medium}>Середній</option>
                <option value="high" className={priorityStyles.high}>Високий</option>
                <option value="critical" className={priorityStyles.critical}>Критичний</option>
              </select>
            </div>

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
              disabled={!selectedEquipment}
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
