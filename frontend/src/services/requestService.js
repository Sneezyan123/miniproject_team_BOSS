import apiService from './apiService';

const requestService = {
  createRequest: async (requestData) => {
    return await apiService.post('/requests', requestData);
  },

  getMyRequests: async () => {
    return await apiService.get('/requests/my');
  },

  getPendingRequests: async () => {
    return await apiService.get('/requests/pending');
  },

  updateRequestStatus: async (requestId, status) => {
    return await apiService.put(`/requests/${requestId}`, { status });
  },

  getRequestById: async (requestId) => {
    try {
      const response = await apiService.get(`/requests/${requestId}`);
      return response;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Request not found');
      }
      throw error;
    }
  }
};

export default requestService;
