import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RequestList = ({ requests = [], onStatusChange, isLogistician }) => {
  const navigate = useNavigate();

  const statusColors = {
    pending: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      icon: (
        <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    approved: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200',
      icon: (
        <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    rejected: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: (
        <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
  };

  const priorityColors = {
    low: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200'
    },
    medium: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      border: 'border-yellow-200'
    },
    high: {
      bg: 'bg-orange-50',
      text: 'text-orange-800',
      border: 'border-orange-200'
    },
    critical: {
      bg: 'bg-red-50',
      text: 'text-red-800',
      border: 'border-red-200'
    }
  };

  const getStatusStyle = (status) => {
    return statusColors[status] || statusColors.pending;
  };

  const getPriorityStyle = (priority) => {
    return priorityColors[priority] || priorityColors.medium;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      low: 'Низький',
      medium: 'Середній',
      high: 'Високий',
      critical: 'Критичний'
    };
    return labels[priority] || priority;
  };

  return (
    <div className="space-y-4">
      {requests.map((request) => {
        const priorityStyle = getPriorityStyle(request.priority);
        return (
          <div 
            key={request.id} 
            className={`border-2 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${priorityStyle.bg} ${priorityStyle.border}`}
            onClick={() => navigate(`/requests/${request.id}`)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 rounded-full p-3">
                    <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Запит #{request.id}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(request.created_at).toLocaleDateString('uk-UA', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {request.description && (
                <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-md">
                  {request.description}
                </p>
              )}

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Запитані предмети:</h4>
                <div className="space-y-2">
                  {request.items?.map((item) => {
                    const statusStyle = getStatusStyle(item.status);
                    const priorityStyle = getPriorityStyle(item.priority);
                    
                    return (
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-3 rounded-md ${statusStyle.bg} ${statusStyle.border} border`}
                      >
                        <div className="flex items-center space-x-3">
                          {statusStyle.icon}
                          <span className="font-medium">{item.equipment?.name || 'Unknown Equipment'}</span>
                          <span className="text-sm text-gray-600">Кількість: {item.quantity}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${statusStyle.text}`}>
                            {item.status === 'pending' ? 'В очікуванні' :
                             item.status === 'approved' ? 'Схвалено' : 'Відхилено'}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${priorityStyle.bg} ${priorityStyle.text}`}>
                            {getPriorityLabel(item.priority)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestList;
