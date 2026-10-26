// Modelo de un producto del catálogo
export interface Producto {
  id: number;
  nombre: string;
  linea: string;
  categoria: string;
  material: string;
  precio: number;
  foto: string;
  disponible: boolean;
}
