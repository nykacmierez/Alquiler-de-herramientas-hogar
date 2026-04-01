import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Camera, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NewRental: React.FC = () => {
  const { toolId } = useParams();
  const { tools, addRental } = useAppContext();
  const navigate = useNavigate();
  const tool = tools.find((t) => t.id === toolId);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Cliente
    nombre: '',
    dni: '',
    direccion: '',
    telefono: '',
    email: '',
    fechaNacimiento: '',
    // Fotos
    fotoCliente: '',
    fotoDni: '',
    fotoBoletaServicio: '',
    fotoReciboSueldo: '',
    fotoEstadoEntrega: '',
    // Pago
    numeroTarjeta: '',
    vencimientoTarjeta: '',
    // Alquiler
    fechaFin: '',
    firma: '',
  });

  if (!tool) return <div>Herramienta no encontrada</div>;

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    addRental({
      herramienta: tool,
      cliente: {
        id: Math.random().toString(36).substr(2, 9),
        nombre: formData.nombre,
        dni: formData.dni,
        direccion: formData.direccion,
        telefono: formData.telefono,
        email: formData.email,
        fechaNacimiento: formData.fechaNacimiento,
        fotoCliente: formData.fotoCliente || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        fotoDni: formData.fotoDni || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400',
        fotoBoletaServicio: formData.fotoBoletaServicio || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400',
        numeroTarjetaCredito: formData.numeroTarjeta,
        vencimientoTarjeta: formData.vencimientoTarjeta,
        firmaCliente: formData.firma,
      },
      fechaInicio: new Date().toISOString(),
      fechaFin: formData.fechaFin,
      fotoEstadoEntrega: formData.fotoEstadoEntrega || tool.foto,
      entregado: false,
    });
    navigate('/rentals');
  };

  const PhotoUpload = ({ label, field, value }: { label: string, field: string, value: string }) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700 ml-1">{label}</label>
      <div
        className={`aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
          value ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
        }`}
        onClick={() => setFormData({ ...formData, [field]: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400' })}
      >
        {value ? (
          <img src={value} className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" />
        ) : (
          <>
            <Camera className="w-8 h-8 text-gray-400 mb-1" />
            <span className="text-xs font-medium text-gray-500">Capturar foto</span>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nuevo Alquiler</h1>
      </div>

      <div className="mb-8 flex justify-between px-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-1/3 h-1.5 rounded-full mx-1 transition-all ${
              step >= s ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card className="p-6 space-y-4">
              <h2 className="text-lg font-bold mb-4">Datos del Cliente</h2>
              <Input
                label="Nombre Completo"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="DNI"
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                />
                <Input
                  label="Teléfono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                label="Dirección"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              />
              <Input
                label="Fecha de Nacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
              />
            </Card>
            <Button fullWidth size="lg" onClick={nextStep}>
              Siguiente <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card className="p-6 space-y-6">
              <h2 className="text-lg font-bold mb-4">Documentación y Fotos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <PhotoUpload label="Foto del Cliente" field="fotoCliente" value={formData.fotoCliente} />
                <PhotoUpload label="Foto DNI" field="fotoDni" value={formData.fotoDni} />
                <PhotoUpload label="Boleta de Servicio" field="fotoBoletaServicio" value={formData.fotoBoletaServicio} />
                <PhotoUpload label="Recibo de Sueldo (Opcional)" field="fotoReciboSueldo" value={formData.fotoReciboSueldo} />
              </div>
              <PhotoUpload label="Estado de la Herramienta (Entrega)" field="fotoEstadoEntrega" value={formData.fotoEstadoEntrega} />
            </Card>
            <div className="flex gap-3">
              <Button variant="outline" fullWidth size="lg" onClick={prevStep}>
                Anterior
              </Button>
              <Button fullWidth size="lg" onClick={nextStep}>
                Siguiente <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card className="p-6 space-y-6">
              <h2 className="text-lg font-bold mb-4">Finalizar Alquiler</h2>

              <div className="space-y-4">
                <Input
                  label="Fecha de Devolución"
                  type="date"
                  value={formData.fechaFin}
                  onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                />

                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-sm text-blue-800 font-medium">Herramienta: {tool.nombre}</p>
                  <p className="text-xs text-blue-600">Precio total se calculará al finalizar.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 ml-1">Firma del Cliente</label>
                  <div className="h-32 rounded-2xl border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                    <span className="text-gray-400 text-sm italic">Área de firma preparada</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Tarjeta Crédito (Opcional)"
                    placeholder="**** **** **** ****"
                    value={formData.numeroTarjeta}
                    onChange={(e) => setFormData({ ...formData, numeroTarjeta: e.target.value })}
                  />
                  <Input
                    label="Vencimiento"
                    placeholder="MM/AA"
                    value={formData.vencimientoTarjeta}
                    onChange={(e) => setFormData({ ...formData, vencimientoTarjeta: e.target.value })}
                  />
                </div>
              </div>
            </Card>
            <div className="flex gap-3">
              <Button variant="outline" fullWidth size="lg" onClick={prevStep}>
                Anterior
              </Button>
              <Button fullWidth size="lg" onClick={handleSubmit}>
                <Check className="w-5 h-5 mr-2" /> Finalizar y Entregar
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
