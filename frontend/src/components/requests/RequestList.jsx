import React from 'react';
import { useAuth } from '../../context/AuthContext';

const RequestList = ({ requests, onStatusChange }) => {
  const { user } = useAuth();
  const isLogistician = user?.role === 'logistician';

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div key={request.id} className="border rounded-lg p-4 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{request.equipment_name}</h3>
              <p className="text-sm text-gray-600">Кількість: {request.quantity}</p>
              {request.description && (
                <p className="text-sm text-gray-600">{request.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-sm ${statusColors[request.status]}`}>
                {request.status}
              </span>
              {isLogistician && request.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onStatusChange(request.id, 'approved')}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Схвалити
                  </button>
                  <button
                    onClick={() => onStatusChange(request.id, 'rejected')}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Відхилити
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestList;
