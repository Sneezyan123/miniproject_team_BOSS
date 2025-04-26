import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import equipmentService from "../services/equipmentService";
import { useAuth } from '../context/AuthContext';
import CreateEquipmentModal from "../components/equipment/CreateEquipmentModal";

const StoragePage = () => {
  const { isAuthenticated, user: authUser } = useAuth();
  const navigate = useNavigate();
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    weapon: false,
    humanitarian: false,
    vehicle: false
  });
  const [quantityFilter, setQuantityFilter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLogistician = isAuthenticated && (authUser?.role === 3 || authUser?.role === "logistician");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchWeapons();
  }, [isAuthenticated, navigate]);

  const fetchWeapons = async () => {
    try {
      const data = await equipmentService.getFreeEquipment();
      setWeapons(data);
      setLoading(false);
    } catch (err) {
      setError("No equipment found");
      setLoading(false);
    }
  };

  const handleFilterChange = (purpose) => {
    setFilters(prev => ({
      ...prev,
      [purpose]: !prev[purpose]
    }));
  };

  const filteredWeapons = weapons.filter(weapon => {
    const activeFilters = Object.entries(filters).filter(([_, isActive]) => isActive);
    const passesTypeFilter = activeFilters.length === 0 || filters[weapon.purpose];
    
    const passesQuantityFilter = weapon.quantity >= quantityFilter;

    return passesTypeFilter && passesQuantityFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="p-6 flex min-h-[calc(100vh-4rem)]">
        {/* Filters Section */}
        <aside className="w-1/4 bg-white shadow-md rounded-lg p-4 mr-6">
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
        </aside>

        {/* Inventory Section */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Пошук"
              className="border border-gray-300 rounded-md px-4 py-2 w-1/2"
            />
            <div className="flex space-x-2">
              {isLogistician && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors"
                >
                  Додати спорядження
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p>Loading weapons...</p>
            ) : error ? (
              <p className="">{error}</p>
            ) : filteredWeapons.length === 0 ? (
              <p>No equipment found</p>
            ) : (
              filteredWeapons.map((weapon) => (
                <div 
                  key={weapon.id} 
                  className={`bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow ${
                    weapon.quantity === 0 ? 'opacity-50 grayscale' : ''
                  }`}
                  onClick={() => navigate(`/storage/${weapon.id}`)}
                >
                  <img
                    src={weapon.img_url || "/default-weapon.jpg"}
                    alt={weapon.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                    onError={(e) => {
                      e.target.src = "/default-weapon.jpg";
                      e.target.onerror = null;
                    }}
                  />
                  <div className="under">
                  <p className="text-sm text-gray-500 q">{weapon.quantity}</p>
                  <div className="under-text">
                    <h3 className="font-bold">{weapon.name}</h3>
                    <p className="text-sm text-gray-500">{weapon.description}</p>
                    <p className="text-sm text-gray-500">Purpose: {weapon.purpose}</p>
                  </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <CreateEquipmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={fetchWeapons}
          />
        </main>
      </div>
    </div>
  );
};

export default StoragePage;
