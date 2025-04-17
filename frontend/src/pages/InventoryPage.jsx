import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import inventoryService from '../services/inventoryService';
import { Link } from 'react-router-dom';
import "./page.css";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const categories = [
    'Зброя',
    'Боєприпаси',
    'Медикаменти',
    'Спорядження',
    'Транспорт'
  ];

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await inventoryService.getAllItems();
        setInventory(data);
      } catch (err) {
        setError('Failed to load inventory');
        console.error('Error fetching inventory:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="inv container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Інвентар</h1>
        <div className="flex gap-4">
          {user?.role === 'admin' && (
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
              Додати предмет
            </button>
          )}
          <Link 
            to="/requests/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Запит на спорядження
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Filters */}
        <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Фільтри</h2>
          <div className="space-y-4">
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-2">
                <input type="checkbox" className="rounded text-green-600" />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Inventory List */}
        <div className="md:col-span-3">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p>Завантаження...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : inventory.length === 0 ? (
              <p>Немає предметів в інвентарі</p>
            ) : (
              inventory.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                  <img 
                    src={item.image_url || '/default-item.png'} 
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-4" 
                  />
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">Кількість: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Категорія: {item.category}</p>
                  <p className="text-sm text-gray-600">Локація: {item.location}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
