import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userServices from '../services/userServices';
import ChangePasswordModal from '../components/profile/ChangePasswordModal';
import EditProfileModal from '../components/profile/EditProfileModal';

const UserProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await userServices.getCurrentUserProfile();
      setProfile(data);
    } catch (err) {
      setError('Failed to load profile');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!profile && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">
              Особистий кабінет
            </div>
            <div className="mt-4">
              <img
                src={profile?.avatar || '/default-avatar.png'}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover border-4 border-green-200"
              />
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-medium">{profile?.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Роль</label>
                <p className="font-medium">
                  {profile?.role === 'user' ? 'Військовослужбовець' : 
                   profile?.role === 'logistician' ? 'Логіст' : 'Адміністратор'}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Редагувати профіль
              </button>
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                Змінити пароль
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 transition-colors"
              >
                Вийти з аккаунту
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onProfileUpdate={fetchProfile}
      />
    </div>
  );
};

export default UserProfilePage;
