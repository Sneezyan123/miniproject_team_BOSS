import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import requestService from '../services/requestService';

const RequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLogistician = user?.role === 3;

  const getPriorityLabel = (priority) => {
    const labels = {
      low: 'Низький',
      medium: 'Середній',
      high: 'Високий',
      critical: 'Критичний'
    };
    return labels[priority] || priority;
  };

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await requestService.getRequestById(id);
      setRequest(data);
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to load request');
      console.error('Error fetching request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      await requestService.updateRequestStatus(id, status);
      navigate('/requests');
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Ви впевнені, що хочете видалити цей запит?')) {
      try {
        await requestService.deleteRequest(id);
        navigate('/requests');
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={() => navigate('/requests')}
          className="mt-4 text-green-600 hover:text-green-700"
        >
          ← Повернутися до списку
        </button>
      </div>
    );
  }

  if (!request) {
    return <div className="container mx-auto px-4 py-8">Request not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Запит #{request.id}</h1>
              <p className="text-sm text-gray-500">
                Створено: {new Date(request.created_at).toLocaleString('uk-UA')}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/requests')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Назад
              </button>
              {(isLogistician || request.user_id === user.id) && 
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Видалити запит
                </button>
              }
              {isLogistician && request.items.some(item => item.status === 'pending') && (
                <>
                  <button
                    onClick={() => handleStatusChange('approved')}
                    className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Схвалити всі
                  </button>
                  <button
                    onClick={() => handleStatusChange('rejected')}
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Відхилити всі
                  </button>
                </>
              )}
            </div>
          </div>

          {request.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Опис</h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-md">{request.description}</p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold mb-4">Запитані предмети</h2>
            <div className="space-y-4">
              {request.items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.equipment?.img_url || '/default-equipment.jpg'}
                        alt={item.equipment_name}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => {
                          e.target.src = '/default-equipment.jpg';
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{item.equipment?.name || 'Unknown Equipment'}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.equipment?.description}
                          </p>
                          <div className="mt-2">
                            <span className="text-sm font-medium text-gray-700">
                              Кількість: 
                            </span>
                            <span className="ml-2 text-sm text-gray-900">
                              {item.quantity} од.
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm
                            ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              item.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.status === 'pending' ? 'В очікуванні' :
                             item.status === 'approved' ? 'Схвалено' : 'Відхилено'}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded-full
                            ${item.priority === 'low' ? 'bg-gray-100 text-gray-800' :
                              item.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                              item.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {getPriorityLabel(item.priority)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsPage;
