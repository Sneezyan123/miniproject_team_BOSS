import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UnitsPage = () => {
  const { user } = useAuth();
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Військові підрозділи</h1>
        {user?.role === 'admin' && (
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Додати підрозділ
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Units List */}
        <div className="md:col-span-1 bg-white rounded-lg shadow p-4">
          <div className="space-y-4">
            {units.map(unit => (
              <div
                key={unit.id}
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedUnit?.id === unit.id ? 'bg-green-50 border-green-500' : 'bg-gray-50'
                }`}
                onClick={() => setSelectedUnit(unit)}
              >
                <h3 className="font-semibold">{unit.name}</h3>
                <p className="text-sm text-gray-600">{unit.code}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Unit Details */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-4">
          {selectedUnit ? (
            <div>
              <h2 className="text-xl font-bold mb-4">{selectedUnit.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Командир</p>
                  <p className="font-medium">{selectedUnit.commander}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Розташування</p>
                  <p className="font-medium">{selectedUnit.location}</p>
                </div>
                {/* Map placeholder */}
                <div className="col-span-2 h-64 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Виберіть підрозділ для перегляду деталей</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitsPage;
