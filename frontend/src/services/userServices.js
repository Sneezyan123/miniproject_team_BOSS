import apiService from './apiService';

export const getCurrentUserProfile = async () => {
  return apiService.get('/users/profile');
};

export const updateProfile = async (profileData) => {
  return apiService.put('/users/profile', profileData);
};

export const changePassword = async (passwordData) => {
  return apiService.post('/users/change-password', passwordData);
};

// Якщо вам потрібен default export, можете додати:
export default {
  getCurrentUserProfile,
  updateProfile,
  changePassword
};