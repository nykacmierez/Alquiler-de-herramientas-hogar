export interface Herramienta {
  id: string;
  nombre: string;
  marca: string;
  modelo: string;
  foto: string;
  categoria: string;
  precio: number;
  stock: number;
}

export interface Cliente {
  id: string;
  nombre: string;
  dni: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  fotoCliente: string;
  fotoDni: string;
  fotoBoletaServicio: string;
  fotoReciboSueldo?: string;
  numeroTarjetaCredito?: string;
  vencimientoTarjeta?: string;
  firmaCliente?: string;
}

export interface Alquiler {
  id: string;
  herramienta: Herramienta;
  cliente: Cliente;
  fechaInicio: string;
  fechaFin: string;
  fotoEstadoEntrega: string;
  fotoEstadoDevolucion?: string;
  entregado: boolean;
}
