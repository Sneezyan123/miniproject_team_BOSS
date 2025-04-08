import React from 'react';
import { Outlet } from 'react-router-dom';
import MainMenu from '../navigation/MainMenu';
import Footer from '../common/Footer';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <MainMenu />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;