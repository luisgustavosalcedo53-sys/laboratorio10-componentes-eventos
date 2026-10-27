import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Plus, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { validarProducto } from '@/lib/validacion'
import type { CamposProducto, ErroresProducto } from '@/lib/validacion'
import type { Producto } from '@/data/productos'

const vacio: CamposProducto = { descripcion: '', precio: '', categoria: '' }

export function RegistroProducto({ onRegistrar, onLimpiar }: {
  onRegistrar: (producto: Omit<Producto, 'codigo'>) => void
  onLimpiar: () => void
}) {
  const [campos, setCampos] = useState<CamposProducto>(vacio)
  const [errores, setErrores] = useState<ErroresProducto>({})
  const descripcionRef = useRef<HTMLInputElement>(null)

  function cambiar(campo: keyof CamposProducto, valor: string) {
    setCampos(anterior => ({ ...anterior, [campo]: valor }))
    setErrores(anterior => ({ ...anterior, [campo]: undefined }))
    onLimpiar()
  }

  function registrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nuevosErrores = validarProducto(campos)
    setErrores(nuevosErrores)
    onLimpiar()
    if (Object.keys(nuevosErrores).length > 0) {
      const primerCampo = Object.keys(nuevosErrores)[0]
      event.currentTarget.querySelector<HTMLInputElement>(`#${primerCampo}`)?.focus()
      return
    }
    onRegistrar({ descripcion: campos.descripcion.trim(), precio: Number(campos.precio), categoria: campos.categoria.trim() })
    setCampos(vacio)
    setErrores({})
    descripcionRef.current?.focus()
  }

  function limpiar() {
    setCampos(vacio)
    setErrores({})
    onLimpiar()
    descripcionRef.current?.focus()
  }

  return <Card className="h-fit gap-5 rounded-2xl border-slate-200 shadow-sm">
    <CardHeader>
      <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700"><Plus className="size-5" aria-hidden="true" /></div>
      <CardTitle className="text-xl">Registrar producto</CardTitle>
      <CardDescription>Añade un producto a tu catálogo de esta sesión.</CardDescription>
    </CardHeader>
    <CardContent>
      <form noValidate onSubmit={registrar} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="descripcion">Descripción <span aria-hidden="true" className="text-teal-700">*</span></Label>
          <Input ref={descripcionRef} id="descripcion" placeholder="Ej. Café molido 250 g" value={campos.descripcion} onChange={e => cambiar('descripcion', e.target.value)} aria-required="true" aria-invalid={!!errores.descripcion} aria-describedby={errores.descripcion ? 'error-descripcion' : 'ayuda-descripcion'} className="h-11" />
          {errores.descripcion ? <p id="error-descripcion" role="alert" className="text-sm text-red-700">{errores.descripcion}</p> : <p id="ayuda-descripcion" className="text-xs text-slate-500">Mínimo 3 caracteres.</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="precio">Precio de venta (S/) <span aria-hidden="true" className="text-teal-700">*</span></Label>
          <Input id="precio" type="number" min="0" step="any" inputMode="decimal" placeholder="0.00" value={campos.precio} onChange={e => cambiar('precio', e.target.value)} aria-required="true" aria-invalid={!!errores.precio} aria-describedby={errores.precio ? 'error-precio' : undefined} className="h-11" />
          {errores.precio && <p id="error-precio" role="alert" className="text-sm text-red-700">{errores.precio}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoria">Categoría <span aria-hidden="true" className="text-teal-700">*</span></Label>
          <Input id="categoria" list="categorias" placeholder="Ej. Abarrotes" value={campos.categoria} onChange={e => cambiar('categoria', e.target.value)} aria-required="true" aria-invalid={!!errores.categoria} aria-describedby={errores.categoria ? 'error-categoria' : undefined} className="h-11" />
          <datalist id="categorias"><option value="Bebidas" /><option value="Abarrotes" /><option value="Lácteos" /><option value="Cuidado personal" /><option value="Limpieza" /></datalist>
          {errores.categoria && <p id="error-categoria" role="alert" className="text-sm text-red-700">{errores.categoria}</p>}
        </div>
        <p className="text-xs leading-relaxed text-slate-500">Todos los campos son obligatorios. El código se genera automáticamente.</p>
        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-5">
          <Button type="submit" className="h-11 flex-1 bg-teal-700 hover:bg-teal-800"><Plus aria-hidden="true" />Registrar producto</Button>
          <Button type="button" variant="outline" className="h-11" onClick={limpiar}><RotateCcw aria-hidden="true" />Limpiar</Button>
        </div>
      </form>
    </CardContent>
  </Card>
}
