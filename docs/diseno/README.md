# Diseño del frontend (mockups)

Capturas del diseño de las pantallas, en versión mobile y desktop. Son una referencia visual, no un requisito cerrado: algunas pantallas muestran funciones que están fuera del alcance del MVP (seña con Mercado Pago, puntos de fidelización, login con Google/Apple, mapa en tiempo real).

| Pantalla | Archivos | Módulo relacionado |
|---|---|---|
| Explorar / listado de barberías | `explorar-mobile`, `explorar-desktop` | establecimientos (listado público) y servicios (precio y duración) |
| Reservar turno | `reservar-turno-mobile`, `reservar-turno-desktop` | turnos, horarios y servicios |
| Mis turnos e historial | `mis-turnos-mobile`, `mis-turnos-desktop` | turnos y reseñas |
| Login | `login-mobile` | auth |
| Registro de cliente | `registro-cliente-mobile` | auth y usuarios |
| Registro de barbería | `registro-barberia-mobile` | auth y establecimientos |
| Perfil | `perfil-mobile`, `perfil-desktop` | usuarios |

## Pantallas sin diseño todavía

- ABM de servicios (vista profesional)
- Configuración de horarios de atención
- Agenda del profesional

## Diferencias con el modelo de datos

- El diseño muestra "barbero a cargo", pero no existe esa entidad: los horarios y turnos dependen del establecimiento.
- `servicio.descripcion` es `VARCHAR(45)` y los textos del diseño son más largos.
