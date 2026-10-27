import { useRef, useState } from 'react'
import { Boxes, CheckCircle2, Info, Layers3, Package, Plus } from 'lucide-react'
import { RegistroProducto } from '@/components/RegistroProducto'
import { ListadoProductos } from '@/components/ListadoProductos'
import { productosIniciales } from '@/data/productos'
import type { Producto } from '@/data/productos'

export default function App() {
  const [productos, setProductos] = useState<Producto[]>(() => productosIniciales.map(p => ({ ...p })))
  const [confirmacion, setConfirmacion] = useState('')
  // Secuencia compartida por toda la sesión: no se reinicia al limpiar el formulario.
  const siguienteCodigo = useRef(Math.max(...productosIniciales.map(p => p.codigo)) + 1)

  function registrarProducto(datos: Omit<Producto, 'codigo'>) {
    const nuevo: Producto = { ...datos, codigo: siguienteCodigo.current++ }
    setProductos(actuales => [...actuales, nuevo])
    setConfirmacion(`Producto «${nuevo.descripcion}» registrado correctamente con código ${String(nuevo.codigo).padStart(3, '0')}.`)
  }

  const estadisticas = [
    { titulo: 'Productos en catálogo', valor: productos.length, icono: Package },
    { titulo: 'Categorías', valor: new Set(productos.map(p => p.categoria.toLocaleLowerCase('es'))).size, icono: Layers3 },
    { titulo: 'Agregados en esta sesión', valor: productos.length - productosIniciales.length, icono: Plus },
  ]

  return <div className="min-h-screen bg-[#f5f7fa] text-slate-900">
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 md:px-8">
        <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-teal-700 text-white"><Boxes className="size-6" aria-hidden="true" /></div>
          <div><p className="text-base font-bold tracking-tight">Catálogo comercial</p><p className="text-xs text-slate-500">Administración de productos</p></div></div>
        <span className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">Laboratorio 10</span>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-5 py-9 md:px-8 md:py-11">
      <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-teal-700">CATÁLOGO / PRODUCTOS</p>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Gestión de productos</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">Consulta tu catálogo y registra nuevos productos en un solo lugar.</p>
      <div className="my-7 grid gap-3 sm:grid-cols-3">{estadisticas.map(({ titulo, valor, icono: Icono }) =>
        <div key={titulo} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4">
          <div className="rounded-lg bg-slate-50 p-3 text-teal-700"><Icono className="size-5" aria-hidden="true" /></div>
          <div><p className="text-2xl font-semibold tabular-nums">{valor}</p><p className="text-xs text-slate-500">{titulo}</p></div>
        </div>)}</div>
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200/70 bg-amber-50/60 px-4 py-3 text-sm text-amber-900">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" /><p><strong>Modo de práctica.</strong> Los cambios son temporales: al recargar la página se restauran los cinco productos iniciales.</p>
      </div>
      <div role="status" aria-live="polite" aria-atomic="true">{confirmacion && <div className="mb-6 flex items-start gap-2 rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900"><CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />{confirmacion}</div>}</div>
      <div className="grid items-start gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <RegistroProducto onRegistrar={registrarProducto} onLimpiar={() => setConfirmacion('')} />
        <ListadoProductos productos={productos} />
      </div>
      <footer className="mt-9 border-t border-slate-200 pt-5 text-xs text-slate-500">Desarrollo de aplicaciones empresariales · Componentes y eventos</footer>
    </main>
  </div>
}
