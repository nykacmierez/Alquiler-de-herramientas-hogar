import React from 'react';
import { Link } from 'react-router-dom';
import { History, Wrench, PlusCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from '../components/ui/Card';

export const Home: React.FC = () => {
  const actions = [
    {
      title: 'Historial de Alquileres',
      description: 'Ver gestiones pasadas y activas',
      icon: History,
      color: 'bg-blue-500',
      path: '/rentals',
    },
    {
      title: 'Herramientas',
      description: 'Explorar catálogo y alquilar',
      icon: Wrench,
      color: 'bg-indigo-500',
      path: '/tools',
    },
    {
      title: 'Carga de Stock',
      description: 'Agregar nuevas herramientas',
      icon: PlusCircle,
      color: 'bg-emerald-500',
      path: '/add-tool',
    },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Panel de Gestión
        </h1>
        <p className="text-gray-500">Bienvenido al sistema de alquiler de herramientas.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <motion.div
            key={action.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={action.path}>
              <Card className="p-6 h-full flex flex-col group">
                <div className={`${action.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h2>
                <p className="text-gray-500 mb-6 flex-1">{action.description}</p>
                <div className="flex items-center text-blue-600 font-bold">
                  Acceder <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <section className="bg-blue-600 rounded-3xl p-8 text-white overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Resumen del día</h2>
          <p className="opacity-90 mb-6">Tienes 3 alquileres que vencen hoy.</p>
          <Link to="/rentals">
            <button className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition-colors">
              Ver Alquileres
            </button>
          </Link>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Wrench className="w-64 h-64 rotate-12" />
        </div>
      </section>
    </div>
  );
};
