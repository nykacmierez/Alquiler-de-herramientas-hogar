import React from 'react';
import { Herramienta } from '../types';
import { Card } from './ui/Card';
import { formatCurrency } from '../utils';
import { Tag } from 'lucide-react';

interface ToolCardProps {
  tool: Herramienta;
  onClick?: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  return (
    <Card onClick={onClick} className="flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={tool.foto}
          alt={tool.nombre}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-blue-600 shadow-sm">
          {tool.categoria}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{tool.nombre}</h3>
          <span className="text-blue-600 font-bold">{formatCurrency(tool.precio)}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {tool.marca} • {tool.modelo}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Tag className="w-3 h-3 mr-1" />
            Stock: {tool.stock}
          </div>
          <div className="text-xs font-medium text-blue-600">Ver detalles</div>
        </div>
      </div>
    </Card>
  );
};
