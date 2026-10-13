# Módulos del backend

Cada módulo (`auth`, `usuarios`, `establecimientos`, `servicios`, `horarios`, `turnos`, `resenas`) vive en su propia carpeta y sigue la arquitectura en capas **Routes → Controllers → Services → Repositories → DTOs**.

| Capa | Responsabilidad |
|---|---|
| `routes/` | Define los endpoints, aplica middlewares (`validate`, auth/rol) y delega en el controller. |
| `controller/` | Lee la request, llama al service y arma la respuesta HTTP. Sin lógica de negocio. |
| `service/` | Reglas de negocio. Lanza `AppError` ante casos inválidos. No conoce Express ni SQL. |
| `repository/` | Único lugar que habla con la base (`pool` / `withTransaction` de `config/db.ts`). |
| `dto/` | Schemas de zod para validar entradas y los tipos TypeScript derivados. |

## Convenciones

- Nombres de archivo: `<modulo>.<capa>.ts` (por ejemplo `servicios.service.ts`).
- Cada módulo exporta su router y se monta en `src/routes/index.ts`: `apiRouter.use('/servicios', serviciosRouter)`.
- Errores: `throw AppError.notFound('...')`, etc. El formato de respuesta es siempre `{ "error": { "message", "details"? } }`.
- Validación: `validate({ body: schema })` en la ruta; los schemas viven en `dto/`.
- Las operaciones que deban ser atómicas (por ejemplo crear un turno) usan `withTransaction`.
