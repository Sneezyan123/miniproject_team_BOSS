import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    delivered: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Запити на постачання</h1>
        <Link 
          to="/requests/new"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Новий запит
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b border-gray-200">
          {['Всі', 'В очікуванні', 'Схвалені', 'Відхилені'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 ${filter === tab.toLowerCase() ? 'bg-gray-100' : ''}`}
              onClick={() => setFilter(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4">
          {requests.length === 0 ? (
            <p className="text-center text-gray-500">Немає запитів</p>
          ) : (
            <div className="space-y-4">
              {requests.map(request => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{request.item}</h3>
                      <p className="text-sm text-gray-600">
                        Кількість: {request.quantity}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-sm ${statusColors[request.status]}`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
