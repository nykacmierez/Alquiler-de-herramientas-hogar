import React from 'react';
import { Alquiler } from '../types';
import { Card } from './ui/Card';
import { formatDate } from '../utils';
import { Calendar, User, Wrench, ChevronRight } from 'lucide-react';

interface RentalCardProps {
  rental: Alquiler;
  onClick?: () => void;
}

export const RentalCard: React.FC<RentalCardProps> = ({ rental, onClick }) => {
  return (
    <Card onClick={onClick} className="p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
          <img
            src={rental.herramienta.foto}
            alt={rental.herramienta.nombre}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 truncate">{rental.herramienta.nombre}</h3>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
              rental.entregado ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {rental.entregado ? 'Devuelto' : 'Activo'}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <User className="w-3 h-3 mr-1" />
            <span className="truncate">{rental.cliente.nombre}</span>
          </div>
          <div className="flex items-center text-xs text-gray-400 mt-1">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{formatDate(rental.fechaInicio)}</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </div>
    </Card>
  );
};
