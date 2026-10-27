# Laboratorio 10 Componentes y eventos

Implementación de las dos partes del laboratorio: procedimiento React con Django y tarea React con Vite, Hooks, shadcn/ui y Tailwind CSS. El informe y las evidencias se completan por separado siguiendo `GUIA-DE-EVIDENCIAS.md`.

## Proyectos

| Carpeta | Finalidad | Dirección local |
|---|---|---|
| `01-procedimiento/backend` | API Django de productos con CORS | http://127.0.0.1:8000/api/producto/ |
| `01-procedimiento/lab10` | React con componentes de clase y consumo de API | http://127.0.0.1:3000 |
| `02-tarea` | Catálogo con registro, validaciones y datos en memoria | http://127.0.0.1:5173 |

## Ejecución en Visual Studio Code

Abre `Laboratorio10.code-workspace`. En el menú **Terminal → Ejecutar tarea**, selecciona el servidor que necesites. Los tres servidores pueden ejecutarse a la vez porque usan puertos diferentes. Para detener una ejecución en su terminal, presiona Ctrl+C.

También puedes usar tres terminales independientes desde la raíz del repositorio:

```powershell
cd 01-procedimiento/backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```

```powershell
cd 01-procedimiento/lab10
npm ci
npm start
```

```powershell
cd 02-tarea
npm ci
npm run dev
```

En este equipo las dependencias ya se instalaron: no repitas `venv`, `pip install` o `npm ci` para cada captura. Al descargar el repositorio en otro equipo, instala Node.js compatible con Vite y Python 3.13, y ejecuta los comandos completos. Los archivos `package-lock.json` fijan las versiones de JavaScript.

## Pruebas y compilación

Backend:

```powershell
cd 01-procedimiento/backend
.\.venv\Scripts\python.exe manage.py check
.\.venv\Scripts\python.exe manage.py test
```

Procedimiento React:

```powershell
cd 01-procedimiento/lab10
npm test -- --watchAll=false --runInBand
npm run build
```

Tarea:

```powershell
cd 02-tarea
npm run build
npm test
```

Las pruebas de la tarea usan Playwright con Microsoft Edge instalado. Verifican cinco filas iniciales, registro válido, actualización sin navegación, códigos únicos, descripción vacía/corta, precios vacío/cero/negativo, categoría vacía, limpieza, mensajes, datos temporales y distribución móvil. Playwright inicia Vite si no está activo.

## Código principal

- `backend/productos/views.py`: devuelve los dos productos de ejemplo solicitados.
- `backend/config/settings.py`: instala y configura CORS.
- `lab10/src/App.js`: constructor, consulta HTTP, estado de carga, errores y tabla.
- `02-tarea/src/data/productos.ts`: modelo y cinco productos iniciales.
- `02-tarea/src/App.tsx`: estado compartido, códigos únicos y confirmación.
- `02-tarea/src/components/RegistroProducto.tsx`: campos controlados, registro y limpieza.
- `02-tarea/src/lib/validacion.ts`: reglas de descripción, precio y categoría.
- `02-tarea/src/components/ListadoProductos.tsx`: tabla de shadcn/ui.
- `02-tarea/src/components/ui`: componentes de shadcn/ui incorporados desde su registro oficial.

## Compatibilidad con la guía

El procedimiento conserva Create React App porque la guía lo solicita. Su ecosistema está obsoleto y presenta advertencias de dependencias; se mantiene como ejercicio local. La tarea utiliza Vite y las tecnologías actuales que exige su sección.

Se sustituyó `componentWillMount` por `componentDidMount`, `MIDDLEWARE_CLASSES` por `MIDDLEWARE` y `CORS_ORIGIN_ALLOW_ALL` por `CORS_ALLOW_ALL_ORIGINS`. CORS se permite para todos los orígenes solo en la práctica local; esta configuración no es para producción.

La tarea funciona sin backend. Los nuevos registros viven únicamente en el estado de React y se pierden al recargar. No se usa localStorage ni una base de datos.

Referencias: [ciclo de vida de React](https://react.dev/reference/react/Component), [retirada de Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app), [shadcn/ui](https://ui.shadcn.com/docs/installation/vite), [django-cors-headers](https://pypi.org/project/django-cors-headers/).

## Publicación en GitHub

Repositorio público: https://github.com/luisgustavosalcedo53-sys/laboratorio10-componentes-eventos

El repositorio incluye ambos proyectos y excluye `node_modules`, `.venv`, cachés, compilaciones y ajustes locales del equipo. El documento original y las capturas del alumno no se incluyen.
