import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { RentalCard } from '../components/RentalCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Modal } from '../components/ui/Modal';
import { ClientInfoCard } from '../components/ClientInfoCard';
import { Button } from '../components/ui/Button';
import { Alquiler } from '../types';
import { formatDate, formatCurrency } from '../utils';
import { Camera, CheckCircle2, History } from 'lucide-react';

export const Rentals: React.FC = () => {
  const { rentals, updateRental } = useAppContext();
  const [selectedRental, setSelectedRental] = useState<Alquiler | null>(null);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnPhoto, setReturnPhoto] = useState<string | null>(null);

  const handleReturn = () => {
    if (selectedRental && returnPhoto) {
      updateRental({
        ...selectedRental,
        entregado: true,
        fotoEstadoDevolucion: returnPhoto,
      });
      setIsReturnModalOpen(false);
      setSelectedRental(null);
      setReturnPhoto(null);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Historial de Alquileres"
        subtitle="Gestión de entregas y devoluciones"
      />

      {rentals.length === 0 ? (
        <EmptyState
          title="No hay alquileres"
          description="Aún no se ha registrado ningún alquiler de herramientas."
          icon={<History className="w-12 h-12 text-gray-400" />}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {rentals.map((rental) => (
            <RentalCard
              key={rental.id}
              rental={rental}
              onClick={() => setSelectedRental(rental)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedRental}
        onClose={() => setSelectedRental(null)}
        title={`Detalle Alquiler ${selectedRental?.id}`}
        mobileBottomSheet
        footer={selectedRental && !selectedRental.entregado ? (
          <Button
            fullWidth
            size="lg"
            onClick={() => setIsReturnModalOpen(true)}
          >
            Registrar Devolución
          </Button>
        ) : undefined}
      >
        {selectedRental && (
          <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                selectedRental.entregado ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {selectedRental.entregado ? 'Herramienta Devuelta' : 'Alquiler Activo'}
              </span>
              <p className="text-sm text-gray-500">ID: {selectedRental.id}</p>
            </div>

            <section className="space-y-4">
              <h4 className="font-bold text-gray-900 border-l-4 border-blue-600 pl-3">Información del Cliente</h4>
              <ClientInfoCard client={selectedRental.cliente} />
            </section>

            <section className="space-y-4">
              <h4 className="font-bold text-gray-900 border-l-4 border-blue-600 pl-3">Herramienta Alquilada</h4>
              <div className="flex flex-col sm:flex-row gap-4 bg-gray-50 p-4 rounded-2xl">
                <img
                  src={selectedRental.herramienta.foto}
                  className="w-full h-48 sm:w-24 sm:h-24 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h5 className="font-bold text-lg">{selectedRental.herramienta.nombre}</h5>
                  <p className="text-gray-500">{selectedRental.herramienta.marca} {selectedRental.herramienta.modelo}</p>
                  <p className="text-blue-600 font-bold mt-1">{formatCurrency(selectedRental.herramienta.precio)} / día</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h4 className="font-bold text-gray-900 border-l-4 border-blue-600 pl-3">Estado de Entrega</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Fecha: {formatDate(selectedRental.fechaInicio)}</p>
                <img
                  src={selectedRental.fotoEstadoEntrega}
                  className="w-full h-56 sm:h-48 rounded-2xl object-cover border"
                  referrerPolicy="no-referrer"
                />
              </div>
            </section>

            {selectedRental.entregado && selectedRental.fotoEstadoDevolucion && (
              <section className="space-y-4">
                <h4 className="font-bold text-gray-900 border-l-4 border-green-600 pl-3">Estado de Devolución</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Fecha: {formatDate(selectedRental.fechaFin)}</p>
                  <img
                    src={selectedRental.fotoEstadoDevolucion}
                    className="w-full h-56 sm:h-48 rounded-2xl object-cover border"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </section>
            )}
          </div>
        )}
      </Modal>

      {/* Return Confirmation Modal */}
      <Modal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        title="Registrar Devolución"
        mobileBottomSheet
        footer={(
          <div className="flex flex-col md:flex-row gap-3">
            <Button variant="outline" fullWidth onClick={() => setIsReturnModalOpen(false)}>
              Cancelar
            </Button>
            <Button fullWidth disabled={!returnPhoto} onClick={handleReturn}>
              Confirmar Devolución
            </Button>
          </div>
        )}
      >
        <div className="space-y-6">
          <p className="text-gray-600">
            Para finalizar el alquiler, debe cargar una fotografía que corrobore el estado actual de la herramienta.
          </p>

          <div
            className={`aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
              returnPhoto ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            }`}
            onClick={() => setReturnPhoto('https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400')}
          >
            {returnPhoto ? (
              <div className="relative w-full h-full">
                <img src={returnPhoto} className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>
            ) : (
              <>
                <Camera className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-500">Click para simular captura</span>
              </>
            )}
          </div>

        </div>
      </Modal>
    </div>
  );
};
