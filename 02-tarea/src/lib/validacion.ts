export interface CamposProducto { descripcion: string; precio: string; categoria: string }
export type ErroresProducto = Partial<Record<keyof CamposProducto, string>>

export function validarProducto(campos: CamposProducto): ErroresProducto {
  const errores: ErroresProducto = {}
  if (campos.descripcion.trim().length < 3) errores.descripcion = 'Escribe una descripción de al menos 3 caracteres.'
  if (!campos.precio.trim() || !Number.isFinite(Number(campos.precio)) || Number(campos.precio) <= 0) {
    errores.precio = 'Ingresa un precio válido mayor que cero.'
  }
  if (!campos.categoria.trim()) errores.categoria = 'Ingresa la categoría del producto.'
  return errores
}
