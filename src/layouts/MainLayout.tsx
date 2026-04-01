import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0 md:pt-16">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <Outlet />
      </main>
    </div>
  );
};
