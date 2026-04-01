import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { Camera, Check } from 'lucide-react';

export const AddTool: React.FC = () => {
  const { addTool } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    marca: '',
    modelo: '',
    categoria: '',
    precio: '',
    stock: '',
    foto: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTool({
      nombre: formData.nombre,
      marca: formData.marca,
      modelo: formData.modelo,
      categoria: formData.categoria,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      foto: formData.foto || 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&q=80&w=400',
    });
    navigate('/tools');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <SectionHeader
        title="Cargar Stock"
        subtitle="Agrega una nueva herramienta al catálogo"
      />

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div
              className="aspect-video rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all overflow-hidden"
              onClick={() => setFormData({ ...formData, foto: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400' })}
            >
              {formData.foto ? (
                <img src={formData.foto} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <>
                  <Camera className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-500">Click para subir fotografía</span>
                </>
              )}
            </div>

            <Input
              label="Nombre de la herramienta"
              placeholder="Ej: Taladro Percutor"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Marca"
                placeholder="Ej: DeWalt"
                required
                value={formData.marca}
                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
              />
              <Input
                label="Modelo"
                placeholder="Ej: DCD776"
                required
                value={formData.modelo}
                onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
              />
            </div>

            <Input
              label="Categoría"
              placeholder="Ej: Eléctricas, Jardinería..."
              required
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Precio por día ($)"
                type="number"
                placeholder="0.00"
                required
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              />
              <Input
                label="Stock inicial"
                type="number"
                placeholder="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" fullWidth type="button" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button fullWidth type="submit">
              <Check className="w-5 h-5 mr-2" /> Guardar Herramienta
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
