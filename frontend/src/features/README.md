# Features del frontend

Una carpeta por módulo, con los mismos nombres que en el backend (`auth`, `usuarios`, `establecimientos`, `servicios`, `horarios`, `turnos`, `resenas`).

- `src/app/`: rutas y páginas (App Router de Next.js). Las páginas arman la pantalla usando lo que exporta cada feature.
- `src/features/<modulo>/`: componentes, hooks, llamadas a la API y tipos propios de ese módulo.
- `src/components/ui/`: componentes genéricos reutilizables (botón, input, modal...).
- `src/components/layout/`: estructura común (header, navegación, footer).
- `src/lib/api.ts`: cliente base (`apiFetch`) para llamar al backend.
