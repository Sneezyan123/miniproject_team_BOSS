import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './routes/PrivateRoute';
import StoragePage from './pages/StoragePage';
import InventoryPage from './pages/InventoryPage';
import RequestsPage from './pages/RequestsPage';
import RequestFormPage from './pages/RequestFormPage';
import EquipmentDetailPage from './pages/EquipmentDetailPage';
import RequestDetailsPage from './pages/RequestDetailsPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route 
          path="dashboard" 
          element={ 
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />
        <Route path="storage" element={<StoragePage/>}/>
        <Route path="storage/:id" element={<EquipmentDetailPage />} />
        <Route 
          path="inventory" 
          element={
            <PrivateRoute>
              <InventoryPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="requests" 
          element={
            <PrivateRoute>
              <RequestsPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="requests/new" 
          element={
            <PrivateRoute>
              <RequestFormPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="requests/:id" 
          element={
            <PrivateRoute>
              <RequestDetailsPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="profile" 
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;