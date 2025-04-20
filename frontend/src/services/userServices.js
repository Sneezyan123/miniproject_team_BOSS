import apiService from './apiService';

export const getCurrentUserProfile = async () => {
  return apiService.get('/user/profile');
};

export const updateProfile = async (profileData) => {
  return apiService.put('/user/profile', profileData);
};

export const changePassword = async (passwordData) => {
  return apiService.post('/user/change-password', passwordData);
};

// Якщо вам потрібен default export, можете додати:
export default {
  getCurrentUserProfile,
  updateProfile,
  changePassword
};