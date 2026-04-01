import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ToolCard } from '../components/ToolCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Herramienta } from '../types';
import { Search, Filter, Plus, Trash2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Tools: React.FC = () => {
  const { tools, deleteTool } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedTool, setSelectedTool] = useState<Herramienta | null>(null);

  const categories = ['Todas', ...new Set(tools.map((t) => t.categoria))];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.marca.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || tool.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Catálogo de Herramientas"
        subtitle="Gestiona y alquila tus equipos"
        action={
          <Button onClick={() => navigate('/add-tool')} className="w-full md:w-auto rounded-full">
            <Plus className="w-5 h-5 mr-1" /> Nuevo
          </Button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Buscar por nombre o marca..."
            className="pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full md:w-64 shrink-0">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onClick={() => setSelectedTool(tool)}
          />
        ))}
      </div>

      {/* Tool Detail Modal */}
      <Modal
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        title="Detalle de Herramienta"
        mobileBottomSheet
        footer={selectedTool ? (
          <div className="flex flex-col md:flex-row gap-3">
            <Button
              variant="danger"
              fullWidth
              onClick={() => {
                deleteTool(selectedTool.id);
                setSelectedTool(null);
              }}
            >
              <Trash2 className="w-5 h-5 mr-2" /> Eliminar
            </Button>
            <Button
              fullWidth
              onClick={() => navigate(`/new-rental/${selectedTool.id}`)}
            >
              Iniciar Alquiler
            </Button>
          </div>
        ) : undefined}
      >
        {selectedTool && (
          <div className="space-y-6">
            <img
              src={selectedTool.foto}
              alt={selectedTool.nombre}
              className="w-full h-64 object-cover rounded-2xl shadow-sm"
              referrerPolicy="no-referrer"
            />

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedTool.nombre}</h3>
                  <p className="text-gray-500">{selectedTool.marca} • {selectedTool.modelo}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">${selectedTool.precio}</p>
                  <p className="text-xs text-gray-400">por día</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Categoría</p>
                  <p className="font-semibold">{selectedTool.categoria}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Stock Disponible</p>
                  <p className="font-semibold">{selectedTool.stock} unidades</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
