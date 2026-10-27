# Evidencias del laboratorio 10

Esta guía indica qué capturar y qué explicar. El informe original no se ha modificado. Toma tus propias capturas de la ejecución real, con la barra de direcciones o el nombre del archivo visible.

## Parte 1 Procedimiento con Django y React

1. **Creación y estructura.** En VS Code, expande `01-procedimiento`. Muestra `lab10/package.json`, donde aparecen React y react-scripts, y las carpetas `backend` y `lab10`. El frontend se creó con Create React App, como pide el procedimiento.
2. **API de Django creada.** Abre `http://127.0.0.1:8000/api/producto/`. Captura el JSON con Coca cola, Fanta y los campos `codigo`, `descripcion`, `precio`. Esta captura corresponde al espacio «Muestra tu api de django creada» de la guía. Complementa con `backend/productos/views.py` y `backend/config/urls.py` en VS Code.
3. **CORS.** Captura `backend/config/settings.py`: `corsheaders` en `INSTALLED_APPS`, `CorsMiddleware` antes de `CommonMiddleware` y `CORS_ALLOW_ALL_ORIGINS = True`. Explica que se permite el acceso desde el puerto de React en esta práctica local. `requirements.txt` acredita la dependencia instalada.
4. **Consumo del servicio.** En `lab10/src/App.js`, captura el constructor, `componentDidMount`, `fetch` y `setState`. Explica que Django devuelve JSON y React lo incorpora al estado.
5. **Tabla desde Django.** Abre `http://127.0.0.1:3000`, espera la carga y captura la tabla con sus dos productos. Complementa con `mostrarTabla()` y el `.map()` del archivo `App.js`.
6. **Mensaje de carga.** Abre las herramientas del navegador (F12), pestaña Network/Red; activa una velocidad lenta, como Slow 3G, y pulsa «Volver a consultar». Captura «recuperando datos...» antes de recibir la respuesta. Después devuelve la velocidad a «No throttling/Sin limitación». Captura también el estado `recuperado` y la condición dentro de `render()`. No se introdujo un retraso artificial en la aplicación.

La guía utiliza `componentWillMount`, `MIDDLEWARE_CLASSES` y `CORS_ORIGIN_ALLOW_ALL`. La implementación usa sus equivalentes vigentes: `componentDidMount`, `MIDDLEWARE` y `CORS_ALLOW_ALL_ORIGINS`. Conserva esta aclaración al describir el procedimiento.

## Parte 2 Tarea con Vite y datos simulados

Abre `http://127.0.0.1:5173`. Esta aplicación es independiente de Django: funciona aunque cierres el backend. Los productos nuevos se pierden al recargar.

| Evidencia | Acción que debes realizar | Qué debe verse |
|---|---|---|
| T1. Tecnologías y organización | Abre `02-tarea` en VS Code | `package.json`, `vite.config.ts`, `components.json`, carpetas `components/ui`, `data` y `lib` |
| T2. Vista inicial | Recarga la página | Título «Gestión de productos», formulario y cinco filas con código, descripción, categoría y precio |
| T3. Datos iniciales | Abre `src/data/productos.ts` | Los cinco objetos de ejemplo y sus cuatro campos |
| T4. Registro válido | Escribe «Café molido», precio `12.50`, categoría «Abarrotes», y pulsa Registrar producto | Sexta fila, código `006`, mensaje de confirmación y formulario vacío |
| T5. Código único | Registra «Pan integral», precio `6.50`, categoría «Abarrotes» | Séptima fila con código `007`, distinto del anterior |
| T6. Campos vacíos | Pulsa Registrar producto sin llenar nada | Tres mensajes de validación; la tabla conserva su número de filas |
| T7. Descripción corta | Escribe `ab`, precio `5`, categoría «Bebidas» y registra | Error de descripción de al menos 3 caracteres; no aparece una fila nueva |
| T8. Precio vacío | Escribe una descripción válida y categoría; deja el precio vacío | Error de precio obligatorio y mayor que cero |
| T9. Precio cero | Cambia el precio a `0` y registra | Error de precio; no se incorpora el producto |
| T10. Precio negativo | Cambia el precio a `-1` y registra | Error de precio; no se incorpora el producto |
| T11. Categoría vacía | Completa descripción y precio válidos, borra categoría y registra | Mensaje de categoría obligatoria |
| T12. Limpiar | Con campos llenos y/o errores visibles, pulsa Limpiar | Campos vacíos, errores retirados y tabla sin cambios. Conviene capturar antes y después |
| T13. Hooks y eventos | Abre `src/App.tsx` y `src/components/RegistroProducto.tsx` | `useState`, `useRef`, `onChange`, `onSubmit`, `onClick`, validación y actualización funcional del estado |
| T14. Componentes reutilizables | Abre `RegistroProducto.tsx` y `ListadoProductos.tsx` | Uso de Button, Input, Label, Card y Table importados desde `components/ui` |
| T15. Datos temporales | Tras registrar un producto, recarga | Regresan las cinco filas iniciales; el aviso explica que no existe persistencia |
| T16. Vista adaptable | Usa el modo de dispositivo de F12 a 390 px | Formulario y catálogo apilados; la tabla se desplaza horizontalmente dentro de su contenedor |
| T17. Pruebas | Ejecuta las tareas de prueba descritas en README | Resultados reales de las pruebas, sin errores |
| T18. Repositorio | Cuando esté publicado, abre el repositorio en GitHub | URL real, carpetas de ambos proyectos y README |

Para probar los errores de manera aislada, deja válidos los demás campos. No necesitas repetir capturas idénticas; puedes agrupar los resultados en una tabla de pruebas del informe, siempre que el docente permita esa presentación.

## Cómo redactar el proceso

Sigue el mismo orden: creación del proyecto, API, CORS, consumo con React, carga condicional, creación de la tarea con Vite, instalación de shadcn/ui y Tailwind, datos iniciales, listado, formulario, validación, actualización del estado y pruebas.

Explica estas ideas con tus palabras:

- `useState` conserva productos y campos; al actualizarlo, React vuelve a representar la interfaz.
- `onChange` mantiene los campos controlados; `onSubmit` impide la recarga mediante `preventDefault` y valida los datos; `onClick` implementa Limpiar.
- `useRef` conserva el siguiente código entre renderizados. Se incrementa solo después de validar, y no se reinicia al limpiar.
- `setProductos(actuales => [...actuales, nuevo])` crea un nuevo arreglo sin modificar el anterior.
- `trim()` impide aceptar espacios como descripción o categoría; el precio debe ser finito y mayor que cero.
- La tarea final no tiene `fetch`, base de datos ni almacenamiento permanente. El procedimiento sí consume Django.

## Observaciones y conclusiones

En observaciones, puedes documentar los cambios de nombres de APIs antiguas, la diferencia entre ambas partes y el comportamiento temporal de los datos. Escribe únicamente dificultades que hayas comprobado; no inventes problemas ni resultados.

En conclusiones, describe qué aprendiste sobre componentes, eventos, validaciones y actualización del estado. Explica por qué el prototipo en memoria no sustituye una aplicación con persistencia y por qué se necesita CORS al consumir Django desde otro puerto.

El texto guía del campus virtual no está adjunto; revisa esa fuente por tu cuenta si el docente exige incorporarla al fundamento teórico. Completa también tus datos de alumno, grupo y fecha.
