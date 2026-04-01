import { Herramienta, Cliente, Alquiler } from '../types';

export const MOCK_TOOLS: Herramienta[] = [
  {
    id: '1',
    nombre: 'Taladro Percutor',
    marca: 'DeWalt',
    modelo: 'DCD776',
    foto: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400',
    categoria: 'Eléctricas',
    precio: 1500,
    stock: 5,
  },
  {
    id: '2',
    nombre: 'Amoladora Angular',
    marca: 'Bosch',
    modelo: 'GWS 700',
    foto: 'https://images.unsplash.com/photo-1530124560676-587cad321376?auto=format&fit=crop&q=80&w=400',
    categoria: 'Eléctricas',
    precio: 1200,
    stock: 3,
  },
  {
    id: '3',
    nombre: 'Motosierra a Nafta',
    marca: 'Stihl',
    modelo: 'MS 170',
    foto: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?auto=format&fit=crop&q=80&w=400',
    categoria: 'Jardinería',
    precio: 3500,
    stock: 0,
  },
  {
    id: '4',
    nombre: 'Nivel Láser',
    marca: 'Stanley',
    modelo: 'Cubix',
    foto: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=400',
    categoria: 'Medición',
    precio: 2000,
    stock: 4,
  },
];

export const MOCK_CLIENTS: Cliente[] = [
  {
    id: 'c1',
    nombre: 'Juan Pérez',
    dni: '35.123.456',
    direccion: 'Av. Siempre Viva 742',
    telefono: '11 4444-5555',
    email: 'juan.perez@email.com',
    fechaNacimiento: '1990-05-15',
    fotoCliente: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    fotoDni: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400',
    fotoBoletaServicio: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400',
  },
];

export const MOCK_RENTALS: Alquiler[] = [
  {
    id: 'ALQ-001',
    herramienta: MOCK_TOOLS[0],
    cliente: MOCK_CLIENTS[0],
    fechaInicio: '2024-03-20T10:00:00',
    fechaFin: '2024-03-25T18:00:00',
    fotoEstadoEntrega: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400',
    entregado: false,
  },
];
