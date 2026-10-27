# Verificación técnica

Resultados obtenidos al ejecutar el proyecto en este equipo. Estas comprobaciones no reemplazan las capturas ni el informe del alumno.

| Comprobación | Resultado |
|---|---|
| Django `manage.py check` | Sin incidencias |
| Django `manage.py test` | 3 pruebas aprobadas: JSON, CORS y rechazo de POST |
| React del procedimiento | 2 pruebas aprobadas: carga de datos y error del servicio |
| Compilación del procedimiento | Correcta |
| TypeScript y compilación Vite | Correctos |
| Playwright con Edge | 12 escenarios aprobados |
| Consumo real de Django en navegador | Tabla con Coca cola y Fanta |
| Vista de escritorio a 1440 px | Formulario y catálogo en dos columnas |
| Vista móvil a 390 px | Secciones apiladas y tabla con desplazamiento interno |

Las pruebas de Playwright están en `02-tarea/tests/productos.spec.ts` y se pueden repetir con `npm test`. Incluyen los escenarios obligatorios de la guía, además de códigos únicos, ausencia de peticiones a un backend y restauración de los datos iniciales al recargar.

Create React App informa dependencias obsoletas y vulnerabilidades transitivas de su herramienta de desarrollo. Se conserva por fidelidad al procedimiento y para ejecución local. La tarea final se implementó de forma independiente con Vite. No se aplicó `npm audit fix --force`, que podría romper el proyecto del procedimiento.
