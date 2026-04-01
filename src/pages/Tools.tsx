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
          <Button onClick={() => navigate('/add-tool')} className="rounded-full">
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
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
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

              <div className="flex gap-3 pt-4">
                <Button
                  variant="danger"
                  className="flex-1"
                  onClick={() => {
                    deleteTool(selectedTool.id);
                    setSelectedTool(null);
                  }}
                >
                  <Trash2 className="w-5 h-5 mr-2" /> Eliminar
                </Button>
                <Button
                  className="flex-[2]"
                  onClick={() => navigate(`/new-rental/${selectedTool.id}`)}
                >
                  Iniciar Alquiler
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
