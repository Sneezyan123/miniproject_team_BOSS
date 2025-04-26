import apiService from './apiService';

const inventoryService = {
  getAllItems: async () => {
    return apiService.get('/inventory');
  },

  getItemsByCategory: async (category) => {
    return apiService.get(`/inventory/category/${category}`);
  },

  getUserItems: async () => {
    return apiService.get('/equipment/user/equipment');
  },
};

export default inventoryService;
