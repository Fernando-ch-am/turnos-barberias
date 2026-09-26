# Módulos del sistema — Turnos Barberías

Listado de módulos a desarrollar en el repositorio, mapeados 1 a 1 con las entidades del esquema de base de datos y con la arquitectura en capas definida (Routes → Controllers → Services → Repositories → DTOs).

| # | Módulo | Entidad(es) principal(es) | Operaciones |
|---|--------|---------------------------|-------------|
| 1 | **auth** | `usuario` | Registro (con rol), login, emisión/verificación de JWT, middleware de restricción por rol |
| 2 | **usuarios** | `usuario` | Consulta y edición del perfil propio |
| 3 | **establecimientos** | `peluqueria` | Alta de establecimiento (vinculado al usuario dueño), edición, activar/desactivar, consulta pública |
| 4 | **servicios** | `servicios` | Alta, edición y baja lógica (`activo`) de servicios por establecimiento, consulta pública con precio y duración |
| 5 | **horarios** | `horarios` | Configuración de días/horas de atención por establecimiento, validación de superposición |
| 6 | **turnos** | `turno` | Cálculo de disponibilidad (cruzando `horarios` + `turno` existentes), creación de reserva, consulta propia/agenda completa, cancelación, cambio de estado |
| 7 | **reseñas** | `reseñas` | Alta de reseña (validada contra `turno_id` completado), consulta pública por establecimiento |

## Decisiones de diseño

- **`auth` se separa de `usuarios`**: el login, la emisión/verificación de JWT y el hashing de contraseñas tienen una responsabilidad distinta al CRUD de perfil, por lo que se modelan como módulos independientes.
- Cada módulo se implementa como una carpeta propia dentro del backend, con su propio `routes/`, `controller/`, `service/`, `repository/` y `dto/`, siguiendo la arquitectura en capas definida para el proyecto.

## Estructura de carpetas (backend)

```
backend/
├── auth/
│   ├── routes/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── dto/
├── usuarios/
├── establecimientos/
├── servicios/
├── horarios/
├── turnos/
└── resenas/
```
