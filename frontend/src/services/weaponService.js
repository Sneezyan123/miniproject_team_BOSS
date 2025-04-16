import apiService from './apiService';

export const getAllWeapons = async () => {
  return apiService.get('/weapons');
};

export const createWeapon = async (weaponData) => {
  return apiService.post('/weapons', weaponData);
};

export const deleteWeapon = async (weaponId) => {
  return apiService.delete(`/weapons/${weaponId}`);
};
