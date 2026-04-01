import React, { createContext, useContext, useState, useEffect } from 'react';
import { Herramienta, Alquiler } from '../types';
import { MOCK_TOOLS, MOCK_RENTALS } from '../data/mockData';

interface AppContextType {
  tools: Herramienta[];
  rentals: Alquiler[];
  addTool: (tool: Omit<Herramienta, 'id'>) => void;
  updateTool: (tool: Herramienta) => void;
  deleteTool: (id: string) => void;
  addRental: (rental: Omit<Alquiler, 'id'>) => void;
  updateRental: (rental: Alquiler) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tools, setTools] = useState<Herramienta[]>(MOCK_TOOLS);
  const [rentals, setRentals] = useState<Alquiler[]>(MOCK_RENTALS);

  const addTool = (tool: Omit<Herramienta, 'id'>) => {
    const newTool = { ...tool, id: Math.random().toString(36).substr(2, 9) };
    setTools([...tools, newTool]);
  };

  const updateTool = (updatedTool: Herramienta) => {
    setTools(tools.map((t) => (t.id === updatedTool.id ? updatedTool : t)));
  };

  const deleteTool = (id: string) => {
    setTools(tools.filter((t) => t.id !== id));
  };

  const addRental = (rental: Omit<Alquiler, 'id'>) => {
    const newRental = { ...rental, id: `ALQ-${Math.floor(1000 + Math.random() * 9000)}` };
    setRentals([newRental, ...rentals]);
  };

  const updateRental = (updatedRental: Alquiler) => {
    setRentals(rentals.map((r) => (r.id === updatedRental.id ? updatedRental : r)));
  };

  return (
    <AppContext.Provider value={{ tools, rentals, addTool, updateTool, deleteTool, addRental, updateRental }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
