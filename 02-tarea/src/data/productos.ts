export interface Producto {
  codigo: number
  descripcion: string
  precio: number
  categoria: string
}

export const productosIniciales: Producto[] = [
  { codigo: 1, descripcion: 'Coca cola', precio: 2.33, categoria: 'Bebidas' },
  { codigo: 2, descripcion: 'Fanta', precio: 1.70, categoria: 'Bebidas' },
  { codigo: 3, descripcion: 'Arroz extra 1 kg', precio: 4.50, categoria: 'Abarrotes' },
  { codigo: 4, descripcion: 'Leche evaporada', precio: 4.20, categoria: 'Lácteos' },
  { codigo: 5, descripcion: 'Jabón de manos', precio: 3.80, categoria: 'Cuidado personal' },
]

export const moneda = (precio: number) => new Intl.NumberFormat('es-PE', {
  style: 'currency', currency: 'PEN',
}).format(precio)
