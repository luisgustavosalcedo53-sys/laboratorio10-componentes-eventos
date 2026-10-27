import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { moneda } from '@/data/productos'
import type { Producto } from '@/data/productos'

export function ListadoProductos({ productos }: { productos: Producto[] }) {
  return <Card className="gap-5 overflow-hidden rounded-2xl border-slate-200 shadow-sm">
    <CardHeader className="flex flex-wrap items-start justify-between gap-3">
      <div><CardTitle className="text-xl">Catálogo de productos</CardTitle><CardDescription className="mt-2">Consulta los registros disponibles.</CardDescription></div>
      <span className="shrink-0 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">{productos.length} productos</span>
    </CardHeader>
    <CardContent className="px-0">
      <Table>
        <TableCaption className="px-6 text-left text-xs">Los nuevos registros se muestran aquí sin recargar la página.</TableCaption>
        <TableHeader className="bg-slate-50"><TableRow>
          <TableHead className="pl-6">Código</TableHead><TableHead>Descripción</TableHead><TableHead>Categoría</TableHead><TableHead className="pr-6 text-right">Precio</TableHead>
        </TableRow></TableHeader>
        <TableBody>{productos.map(producto => <TableRow key={producto.codigo}>
          <TableCell className="py-5 pl-6 font-mono text-xs text-slate-500">{String(producto.codigo).padStart(3, '0')}</TableCell>
          <TableCell className="max-w-64 min-w-36 font-medium whitespace-normal break-words">{producto.descripcion}</TableCell>
          <TableCell><span className="inline-block max-w-48 rounded-md bg-slate-100 px-2 py-1 text-xs whitespace-normal break-words text-slate-600">{producto.categoria}</span></TableCell>
          <TableCell className="pr-6 text-right font-semibold tabular-nums">{moneda(producto.precio)}</TableCell>
        </TableRow>)}</TableBody>
      </Table>
    </CardContent>
  </Card>
}
