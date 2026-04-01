import React from 'react';
import { Cliente } from '../types';
import { Card } from './ui/Card';
import { Phone, Mail, MapPin, CreditCard } from 'lucide-react';

interface ClientInfoCardProps {
  client: Cliente;
}

export const ClientInfoCard: React.FC<ClientInfoCardProps> = ({ client }) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <img
          src={client.fotoCliente}
          alt={client.nombre}
          className="w-20 h-20 rounded-2xl object-cover border-4 border-blue-50"
          referrerPolicy="no-referrer"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900">{client.nombre}</h3>
          <p className="text-gray-500">DNI: {client.dni}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Phone className="w-4 h-4 text-blue-600" />
          </div>
          <span>{client.telefono}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <span className="truncate">{client.email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <div className="bg-blue-50 p-2 rounded-lg">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <span>{client.direccion}</span>
        </div>
        {client.numeroTarjetaCredito && (
          <div className="flex items-center gap-3 text-gray-600">
            <div className="bg-blue-50 p-2 rounded-lg">
              <CreditCard className="w-4 h-4 text-blue-600" />
            </div>
            <span>**** **** **** {client.numeroTarjetaCredito.slice(-4)}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900">Documentación</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-gray-500">DNI</p>
            <img src={client.fotoDni} className="rounded-lg h-40 sm:h-24 w-full object-cover border" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Boleta Servicio</p>
            <img src={client.fotoBoletaServicio} className="rounded-lg h-40 sm:h-24 w-full object-cover border" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </Card>
  );
};
