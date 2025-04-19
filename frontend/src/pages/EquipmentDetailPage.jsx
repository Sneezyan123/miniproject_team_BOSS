import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import equipmentService from '../services/equipmentService';
import { useAuth } from '../context/AuthContext';

const EquipmentDetailPage = () => {
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const data = await equipmentService.getEquipmentById(id);
        setEquipment(data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!equipment) {
    return <div className="container mx-auto px-4 py-8">Equipment not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Column */}
          <div>
            <img
              className="w-full h-64 object-cover rounded-lg mb-4"
              src={equipment.img_url || '/default-equipment.jpg'}
              alt={equipment.name}
              onError={(e) => {
                e.target.src = '/default-equipment.jpg';
                e.target.onerror = null;
              }}
            />
            <h1 className="text-xl font-bold text-gray-900 mb-2">{equipment.name}</h1>
            <div className="mb-2">
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                {equipment.purpose}
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-sm">{equipment.description}</p>
            <div className="mb-4">
              <span className="font-bold text-sm">Кількість:</span>
              <span className="ml-2 text-sm">{equipment.quantity}</span>
            </div>

            {user?.role === 'user' && (
              <button 
                onClick={() => navigate(`/requests/new?equipmentId=${equipment.id}`)}
                className="bg-green-600 text-white w-full px-3 py-1.5 rounded text-sm hover:bg-green-700"
              >
                Запросити спорядження
              </button>
            )}
          </div>

          {/* Right Column - Detailed Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Детальна інформація</h2>
            <div className="prose max-w-none">
              {equipment.detailed_description ? (
                <p className="text-gray-700 text-sm whitespace-pre-line">{equipment.detailed_description}</p>
              ) : (
                <p className="text-gray-500 italic text-sm">Детальний опис відсутній</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetailPage;
