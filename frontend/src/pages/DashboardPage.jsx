import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <h1>Особистий кабінет</h1>
      <p>Вітаємо, {user?.username}!</p>
    </div>
  );
};

export default DashboardPage;