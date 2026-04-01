import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, History, Wrench, PlusCircle, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/rentals', icon: History, label: 'Alquileres' },
    { path: '/tools', icon: Wrench, label: 'Herramientas' },
    { path: '/add-tool', icon: PlusCircle, label: 'Cargar Stock' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40 h-16 items-center px-8">
        <div className="flex items-center gap-2 mr-12">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Alquiler de Herramientas</span>
        </div>
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 font-medium transition-colors ${
                location.pathname === item.path ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 h-20 flex items-center justify-around px-4 pb-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              location.pathname === item.path ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};
