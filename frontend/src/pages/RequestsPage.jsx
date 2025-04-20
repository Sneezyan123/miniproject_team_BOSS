import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import requestService from '../services/requestService';
import { useAuth } from '../context/AuthContext';
import RequestList from '../components/requests/RequestList';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();
  const isLogistician = user?.role === 3 || user?.role === "logistician";

  useEffect(() => {
    fetchRequests();
  }, [isLogistician]);

  const fetchRequests = async () => {
    try {
      let data;
      if (isLogistician) {
        data = await requestService.getPendingRequests();
      } else {
        data = await requestService.getMyRequests();
      }
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (requestId, status) => {
    try {
      await requestService.updateRequestStatus(requestId, status);
      fetchRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.items.some(item => item.status === filter);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isLogistician ? 'Запити на розгляді' : 'Мої запити'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isLogistician 
              ? 'Керуйте запитами від військовослужбовців'
              : 'Переглядайте статус ваших запитів на спорядження'}
          </p>
        </div>
        {!isLogistician && (
          <Link 
            to="/requests/new"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Новий запит
          </Link>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex p-4 border-b border-gray-200 bg-gray-50">
          {['all', 'pending', 'approved', 'rejected'].map(filterOption => (
            <button
              key={filterOption}
              className={`px-4 py-2 rounded-md mr-2 transition-colors ${
                filter === filterOption 
                  ? 'bg-green-600 text-white shadow-sm' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setFilter(filterOption)}
            >
              {filterOption === 'all' ? 'Всі' :
               filterOption === 'pending' ? 'В очікуванні' :
               filterOption === 'approved' ? 'Схвалені' : 'Відхилені'}
            </button>
          ))}
        </div>

        <div className="p-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="mx-auto h-12 w-12" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <p className="text-gray-500">Немає запитів</p>
              {!isLogistician && (
                <Link 
                  to="/requests/new"
                  className="text-green-600 hover:text-green-700 mt-2 inline-block"
                >
                  Створити новий запит
                </Link>
              )}
            </div>
          ) : (
            <RequestList 
              requests={filteredRequests}
              onStatusChange={handleStatusChange}
              isLogistician={isLogistician}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
