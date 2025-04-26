import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import inventoryService from '../services/inventoryService';
import { Link, useNavigate } from 'react-router-dom';
import "./page.css";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    weapon: false,
    humanitarian: false,
    vehicle: false
  });
  const [quantityFilter, setQuantityFilter] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await inventoryService.getUserItems();
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

  const handleFilterChange = (purpose) => {
    setFilters(prev => ({
      ...prev,
      [purpose]: !prev[purpose]
    }));
  };

  const filteredInventory = inventory.filter(item => {
    // First apply purpose filters
    const activeFilters = Object.entries(filters).filter(([_, isActive]) => isActive);
    const passesTypeFilter = activeFilters.length === 0 || filters[item.equipment?.purpose];
    
    // Then apply quantity filter
    const passesQuantityFilter = item.quantity >= quantityFilter;

    return passesTypeFilter && passesQuantityFilter;
  });

  return (
    <div className="inv container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Мій інвентар</h1>
        <div className="flex gap-4">
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
          <h2 className="text-lg font-bold mb-4">Фільтри</h2>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Категорії</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.weapon}
                  onChange={() => handleFilterChange('weapon')}
                  className="form-checkbox text-green-600"
                />
                <span>Зброя</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.humanitarian}
                  onChange={() => handleFilterChange('humanitarian')}
                  className="form-checkbox text-green-600"
                />
                <span>Гуманітарне спорядження</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.vehicle}
                  onChange={() => handleFilterChange('vehicle')}
                  className="form-checkbox text-green-600"
                />
                <span>Транспорт</span>
              </label>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Кількість</h3>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="10"
                value={quantityFilter}
                onChange={(e) => setQuantityFilter(Number(e.target.value))}
                className="w-full mt-2"
              />
              <span className="text-sm">{quantityFilter}+</span>
            </div>
          </div>
        </div>

        {/* Inventory List */}
        <div className="md:col-span-3">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p>Завантаження...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredInventory.length === 0 ? (
              <p>У вас немає предметів в інвентарі</p>
            ) : (
              filteredInventory.map(item => (
                <div 
                  key={item.id} 
                  className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/storage/${item.equipment?.id}`)}
                >
                  <img 
                    src={item.equipment?.img_url || '/default-item.png'} 
                    alt={item.equipment?.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                    onError={(e) => {
                      e.target.src = "/default-item.png";
                      e.target.onerror = null;
                    }}
                  />
                  <div className="under">
                    <p className="text-sm text-gray-500 q">{item.quantity}</p>
                    <div className="under-text">
                      <h3 className="font-bold">{item.equipment?.name}</h3>
                      <p className="text-sm text-gray-500">{item.equipment?.description}</p>
                      <p className="text-sm text-gray-500">Призначення: {item.equipment?.purpose}</p>
                      {item.equipment?.detailed_description && (
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                          {item.equipment?.detailed_description}
                        </p>
                      )}
                    </div>
                  </div>
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
