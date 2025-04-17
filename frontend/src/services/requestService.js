import apiService from './apiService';

const requestService = {
  createRequest: async (requestData) => {
    return apiService.post('/requests', requestData);
  },

  getMyRequests: async () => {
    return apiService.get('/requests/my');
  },

  getPendingRequests: async () => {
    return apiService.get('/requests/pending');
  },

  updateRequestStatus: async (requestId, status) => {
    return apiService.put(`/requests/${requestId}`, { status });
  }
};

export default requestService;
