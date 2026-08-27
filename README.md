# Turnos Barberías

Plataforma web para la gestión y reserva de turnos en peluquerías y barberías.

> **Estado del proyecto:** Propuesta inicial — Trabajo Final Integrador
> **Modalidad:** Desarrollo web Full Stack
> **Equipo:** Fernando Chacón, Elias Carulla, Nicolas Gonzalez
> **Fecha estimada de entrega final:** 14/11/2026

---

## 1. Descripción general

**Turnos Barberías** es una plataforma web orientada a facilitar la gestión de turnos entre clientes y peluquerías/barberías.

El sistema permitirá que los clientes puedan buscar establecimientos, consultar los servicios disponibles, visualizar horarios disponibles y reservar turnos de manera online.

Por otro lado, los propietarios o profesionales podrán registrar y administrar su establecimiento, configurar los servicios ofrecidos, establecer sus horarios de atención y gestionar las reservas recibidas.

El sistema contará con diferentes roles de usuario y aplicará reglas de negocio para garantizar la consistencia de las reservas, evitando conflictos como la asignación de dos clientes al mismo horario.

Como funcionalidad de ampliación, se contempla incorporar un sistema de mensajería interna entre clientes y profesionales asociado a las reservas.

### Objetivo principal

Desarrollar una solución web que permita digitalizar y centralizar la gestión de turnos de peluquerías y barberías, reduciendo la gestión manual y facilitando tanto la reserva para los clientes como la administración de la agenda para los profesionales.

---

# 2. Problemática

Actualmente, muchos pequeños establecimientos de peluquería y barbería gestionan sus turnos mediante canales informales como WhatsApp, llamadas telefónicas, redes sociales o agendas físicas.

Esta modalidad puede generar diferentes problemas:

* Dificultad para conocer los horarios realmente disponibles.
* Intercambio constante de mensajes para coordinar un turno.
* Posibilidad de reservar accidentalmente un mismo horario para dos clientes.
* Falta de una agenda centralizada.
* Dificultad para administrar cancelaciones y cambios.
* Falta de historial de reservas.
* Poca información centralizada sobre servicios y precios.
* Dificultad para que nuevos clientes encuentren establecimientos disponibles.
* Ausencia de un mecanismo integrado de reseñas y calificaciones.

---

# 3. Solución propuesta

Se propone desarrollar una plataforma web que centralice la relación entre clientes y peluquerías/barberías.

El cliente podrá:

1. Registrarse e iniciar sesión.
2. Buscar peluquerías y barberías.
3. Consultar información del establecimiento.
4. Consultar servicios, duración y precios.
5. Visualizar disponibilidad.
6. Reservar un turno.
7. Consultar sus reservas.
8. Cancelar una reserva según las reglas establecidas.
9. Consultar su historial.
10. Calificar y reseñar servicios realizados.

El profesional podrá:

1. Registrarse como profesional.
2. Crear y administrar su establecimiento.
3. Configurar los servicios ofrecidos.
4. Configurar horarios de atención.
5. Consultar su agenda.
6. Gestionar las reservas.
7. Actualizar el estado de los turnos.
8. Consultar información de sus clientes asociada a las reservas.

Como funcionalidad de ampliación, se contempla:

* Chat entre cliente y profesional.
* Notificaciones.
* Favoritos.
* Estadísticas del establecimiento.
* Mejoras avanzadas en búsqueda y filtros.

---

# 4. Objetivos del proyecto

## Objetivo general

Diseñar y desarrollar una aplicación web Full Stack que permita gestionar de manera centralizada las agendas y reservas de peluquerías y barberías.

## Objetivos específicos

* Implementar autenticación y autorización de usuarios.
* Aplicar diferentes roles y permisos.
* Desarrollar una API para la comunicación entre frontend y backend.
* Diseñar e implementar una base de datos relacional.
* Implementar reglas de negocio para la gestión de reservas.
* Evitar conflictos y reservas duplicadas.
* Desarrollar interfaces web responsivas.
* Implementar operaciones CRUD.
* Aplicar validaciones en frontend y backend.
* Implementar manejo de errores.
* Aplicar una arquitectura organizada por responsabilidades.
* Utilizar control de versiones mediante Git.
* Realizar el despliegue de los componentes principales en servicios cloud.
* Documentar el funcionamiento y la arquitectura del sistema.
* Adquirir experiencia práctica en desarrollo Full Stack.

---

# 5. Alcance

## 5.1. Alcance del MVP

El MVP contempla las funcionalidades necesarias para que el sistema sea funcional y pueda utilizarse en un escenario real básico.

### Gestión de usuarios

* Registro.
* Inicio de sesión.
* Cierre de sesión.
* Gestión básica del perfil.
* Roles de usuario.

### Gestión de establecimientos

* Registro de peluquería/barbería.
* Edición de información.
* Activación/desactivación del establecimiento.
* Información básica del establecimiento.

### Gestión de servicios

* Alta de servicios.
* Modificación de servicios.
* Eliminación lógica de servicios.
* Nombre.
* Descripción.
* Precio.
* Duración.

### Gestión de horarios

* Configuración de días de atención.
* Horarios de apertura y cierre.
* Gestión de disponibilidad.
* Validación de horarios superpuestos.

### Gestión de turnos

* Consulta de disponibilidad.
* Creación de reservas.
* Consulta de reservas.
* Cancelación.
* Cambio de estado.
* Historial de turnos.
* Prevención de reservas duplicadas.

### Reseñas

* Calificación del establecimiento/profesional.
* Comentario.
* Consulta de reseñas.
* Restricción de reseñas a clientes que hayan realizado un turno.

---

## 5.2. Funcionalidades de ampliación

Estas funcionalidades se implementarán únicamente si el avance del proyecto permite incorporarlas sin comprometer las entregas principales.

* Chat cliente-profesional.
* Mensajería en tiempo real.
* Notificaciones.
* Sistema de favoritos.
* Estadísticas para profesionales.
* Filtros avanzados.
* Mejoras de búsqueda.
* Recordatorios de turnos.
* Panel administrativo.

Estas funcionalidades no forman parte de los requisitos mínimos necesarios para considerar funcional el MVP.

---

# 6. Usuarios y roles

El sistema contará inicialmente con dos roles principales.

## Cliente

Puede:

* Registrarse.
* Iniciar sesión.
* Consultar establecimientos.
* Consultar servicios.
* Consultar disponibilidad.
* Reservar turnos.
* Consultar sus reservas.
* Cancelar reservas según las reglas del sistema.
* Consultar historial.
* Realizar reseñas cuando corresponda.

## Profesional

Puede:

* Registrarse.
* Crear su establecimiento.
* Administrar la información del establecimiento.
* Crear y administrar servicios.
* Configurar horarios.
* Consultar su agenda.
* Gestionar reservas.
* Actualizar el estado de los turnos.
* Consultar información relacionada con sus reservas.

---

# 7. Tecnologías

La siguiente es la propuesta tecnológica inicial. Podrá ajustarse en conjunto con el tutor durante la etapa de arquitectura.

| Capa                      | Tecnología                                                        |
| ------------------------- | ----------------------------------------------------------------- |
| Frontend                  | Next.js                                                           |
| Lenguaje frontend         | TypeScript                                                        |
| Backend                   | Node.js                                                           |
| Framework backend         | Express.js                                                        |
| API                       | REST                                                              |
| Base de datos             | PostgreSQL                                                        |
| Servicio de base de datos | Supabase                                                          |
| Autenticación             | JWT / mecanismo de autenticación definido durante la arquitectura |
| Control de versiones      | Git / GitHub                                                      |
| Gestión de proyecto       | GitHub Projects                                                   |
| Hosting Frontend          | Vercel                                                            |
| Hosting Backend           | Render / Railway                                                  |
| IDE                       | Visual Studio Code                                                |

### Justificación inicial

Se propone utilizar **Next.js** para el frontend por su integración con React, TypeScript y las herramientas necesarias para construir una aplicación web moderna.

Para el backend se propone **Node.js + Express.js**, permitiendo desarrollar una API REST separada y trabajar explícitamente los conceptos de:

* Rutas.
* Controllers.
* Services.
* Business Logic.
* Repositories.
* DTOs.
* Validaciones.
* Middleware.
* Autenticación.
* Manejo de errores.

Se utilizará **PostgreSQL** como base de datos debido a la naturaleza relacional del dominio y a la necesidad de manejar relaciones entre usuarios, establecimientos, servicios, horarios y reservas.

**Supabase** se propone inicialmente como proveedor de PostgreSQL y servicios asociados.

El frontend podrá desplegarse en **Vercel**, mientras que el backend podrá desplegarse en **Render o Railway**, sujeto a la evaluación de costos, límites y facilidad de configuración.

---

# 8. Arquitectura propuesta

El sistema se organizará siguiendo una arquitectura por capas para separar responsabilidades.

```text
┌─────────────────────────────┐
│          CLIENTE            │
│       Navegador Web         │
└──────────────┬──────────────┘
               │
               │ HTTPS / REST
               ▼
┌─────────────────────────────┐
│          FRONTEND           │
│          Next.js            │
│         TypeScript          │
└──────────────┬──────────────┘
               │
               │ HTTP
               ▼
┌─────────────────────────────┐
│           BACKEND           │
│      Node.js + Express      │
│                             │
│ Routes                      │
│ Controllers                 │
│ Services / Business Logic   │
│ Repositories                │
│ DTOs / Validations           │
│ Middleware                  │
└──────────────┬──────────────┘
               │
               │ SQL
               ▼
┌─────────────────────────────┐
│         PostgreSQL          │
│          Supabase           │
└─────────────────────────────┘
```

---

# 9. Business Logic

Uno de los objetivos técnicos principales del proyecto será implementar correctamente la lógica de negocio en el backend.

La lógica de negocio será responsable de controlar que las operaciones cumplan las reglas del dominio antes de modificar la información almacenada.

Por ejemplo, una reserva no consistirá únicamente en insertar un registro en la base de datos.

El backend deberá comprobar:

```text
Solicitud de reserva
        ↓
Usuario autenticado
        ↓
¿El establecimiento existe?
        ↓
¿Está activo?
        ↓
¿El servicio existe?
        ↓
¿El servicio está activo?
        ↓
¿El profesional ofrece ese servicio?
        ↓
¿La fecha es válida?
        ↓
¿Está dentro del horario de atención?
        ↓
¿Existe disponibilidad?
        ↓
¿Existe otro turno en ese horario?
        ↓
       NO
        ↓
Crear reserva
```

## Principales reglas de negocio

### Reservas

* Un horario no puede ser reservado por dos clientes simultáneamente.
* Una reserva debe pertenecer a un cliente autenticado.
* Una reserva debe estar asociada a un establecimiento.
* Una reserva debe tener un servicio.
* La duración del servicio debe utilizarse para determinar la ocupación del horario.
* No se podrán realizar reservas en fechas pasadas.
* No se podrán realizar reservas fuera del horario configurado.
* Una reserva cancelada deberá liberar nuevamente el horario.
* Los estados de una reserva deberán respetar las transiciones permitidas.

### Servicios

* Un servicio debe tener nombre.
* Un servicio debe tener una duración válida.
* El precio debe ser igual o mayor a cero.
* Un servicio inactivo no podrá recibir nuevas reservas.
* Un servicio debe pertenecer a un establecimiento.

### Horarios

* Un establecimiento no podrá tener horarios superpuestos para un mismo período.
* Los horarios de atención deberán ser válidos.
* Una reserva deberá respetar los horarios configurados.
* Un horario ocupado no deberá aparecer como disponible para nuevos clientes.

### Usuarios

* El email debe ser único.
* Un usuario solamente podrá modificar sus propios datos.
* Las operaciones disponibles dependerán del rol.
* Un cliente no podrá acceder a recursos administrativos de un profesional.
* Un profesional no podrá modificar establecimientos pertenecientes a otro profesional.

### Reseñas

* Solo podrán realizar reseñas los clientes que hayan realizado un turno.
* La reserva asociada deberá encontrarse en un estado que permita la reseña.
* Un cliente no podrá realizar múltiples reseñas sobre la misma reserva.
* La calificación deberá encontrarse dentro del rango establecido.

### Chat

En caso de implementarse:

* Una conversación deberá estar asociada a usuarios autorizados.
* Un usuario no podrá acceder a conversaciones ajenas.
* Los mensajes deberán estar asociados a una conversación.
* El sistema deberá registrar fecha y hora de cada mensaje.

---

# 10. Requerimientos funcionales

| ID    | Descripción                                                                       |
| ----- | --------------------------------------------------------------------------------- |
| RF-01 | El sistema deberá permitir registrar nuevos usuarios.                             |
| RF-02 | El sistema deberá permitir iniciar y cerrar sesión.                               |
| RF-03 | El sistema deberá permitir diferenciar usuarios según su rol.                     |
| RF-04 | El sistema deberá permitir a un profesional registrar un establecimiento.         |
| RF-05 | El sistema deberá permitir editar la información del establecimiento.             |
| RF-06 | El sistema deberá permitir crear servicios asociados a un establecimiento.        |
| RF-07 | El sistema deberá permitir modificar y desactivar servicios.                      |
| RF-08 | El sistema deberá permitir configurar horarios de atención.                       |
| RF-09 | El sistema deberá permitir consultar establecimientos disponibles.                |
| RF-10 | El sistema deberá permitir consultar los servicios de un establecimiento.         |
| RF-11 | El sistema deberá permitir consultar horarios disponibles.                        |
| RF-12 | El sistema deberá permitir realizar reservas.                                     |
| RF-13 | El sistema deberá impedir reservas incompatibles con la disponibilidad existente. |
| RF-14 | El sistema deberá permitir consultar las reservas del cliente.                    |
| RF-15 | El sistema deberá permitir a los profesionales consultar su agenda.               |
| RF-16 | El sistema deberá permitir cancelar reservas según las reglas definidas.          |
| RF-17 | El sistema deberá permitir modificar el estado de una reserva.                    |
| RF-18 | El sistema deberá conservar un historial de reservas.                             |
| RF-19 | El sistema deberá permitir a clientes habilitados realizar reseñas.               |
| RF-20 | El sistema deberá permitir consultar las reseñas de un establecimiento.           |
| RF-21 | El sistema deberá validar los datos ingresados tanto en frontend como backend.    |
| RF-22 | El sistema deberá restringir el acceso a recursos según el rol del usuario.       |
| RF-23 | El sistema deberá proporcionar una API REST para la comunicación con el frontend. |
| RF-24 | El sistema deberá manejar errores y devolver respuestas apropiadas desde la API.  |

### Requerimientos funcionales de ampliación

| ID    | Descripción                                                              |
| ----- | ------------------------------------------------------------------------ |
| RF-25 | El sistema podrá permitir conversaciones entre clientes y profesionales. |
| RF-26 | El sistema podrá actualizar mensajes en tiempo real.                     |
| RF-27 | El sistema podrá enviar notificaciones relacionadas con reservas.        |
| RF-28 | El sistema podrá permitir marcar establecimientos como favoritos.        |
| RF-29 | El sistema podrá proporcionar estadísticas básicas a los profesionales.  |

---

# 11. Requerimientos no funcionales

| ID     | Descripción                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------- |
| RNF-01 | La aplicación deberá ser accesible desde navegadores web modernos.                                              |
| RNF-02 | La interfaz deberá ser responsive para dispositivos móviles, tablets y escritorio.                              |
| RNF-03 | La comunicación entre frontend y backend deberá realizarse mediante HTTPS en producción.                        |
| RNF-04 | Las credenciales y datos sensibles deberán almacenarse utilizando mecanismos seguros.                           |
| RNF-05 | El backend deberá validar los datos recibidos independientemente de las validaciones realizadas en el frontend. |
| RNF-06 | La aplicación deberá controlar los permisos de acceso a los recursos.                                           |
| RNF-07 | El sistema deberá utilizar variables de entorno para información sensible y configuración.                      |
| RNF-08 | El código deberá mantenerse organizado y separado por responsabilidades.                                        |
| RNF-09 | El proyecto deberá utilizar Git para el control de versiones.                                                   |
| RNF-10 | El sistema deberá contar con documentación técnica básica para instalación y utilización.                       |
| RNF-11 | Al menos un componente principal deberá encontrarse desplegado en un servicio online.                           |
| RNF-12 | El sistema deberá contemplar mecanismos adecuados de manejo de errores.                                         |

---

# 12. Reglas de negocio

### RN-01 — Unicidad de usuario

No podrá existir más de un usuario registrado con el mismo email.

### RN-02 — Propiedad de recursos

Un usuario solamente podrá modificar recursos que le pertenezcan o sobre los cuales tenga autorización.

### RN-03 — Disponibilidad

Un turno solamente podrá reservarse si el horario se encuentra disponible.

### RN-04 — Prevención de doble reserva

El sistema deberá impedir que dos reservas ocupen el mismo recurso y período de tiempo.

### RN-05 — Horario de atención

No podrán generarse reservas fuera de los horarios de atención configurados.

### RN-06 — Fechas

No se permitirán reservas correspondientes a fechas pasadas.

### RN-07 — Servicio activo

Un servicio desactivado no podrá utilizarse para nuevas reservas.

### RN-08 — Establecimiento activo

Un establecimiento desactivado no podrá recibir nuevas reservas.

### RN-09 — Cancelación

Una reserva solamente podrá cancelarse si se encuentra en un estado compatible con dicha operación.

### RN-10 — Historial

Las reservas finalizadas o canceladas deberán conservarse como historial.

### RN-11 — Reseñas

Un cliente solamente podrá realizar una reseña cuando cumpla las condiciones establecidas para la reserva correspondiente.

### RN-12 — Seguridad

Las operaciones protegidas deberán requerir autenticación y autorización.

---

# 13. Modelo de datos inicial

El modelo podrá modificarse durante la segunda entrega, luego de la revisión del tutor.

## Entidades principales

### User

Representa a los usuarios registrados.

| Campo         | Tipo      | Descripción                           |
| ------------- | --------- | ------------------------------------- |
| id            | UUID      | Identificador                         |
| name          | VARCHAR   | Nombre                                |
| email         | VARCHAR   | Email único                           |
| password_hash | VARCHAR   | Contraseña almacenada de forma segura |
| role          | ENUM      | CLIENT / PROFESSIONAL                 |
| created_at    | TIMESTAMP | Fecha de creación                     |
| updated_at    | TIMESTAMP | Última modificación                   |

### Business

Representa una peluquería o barbería.

| Campo       | Tipo      | Descripción             |
| ----------- | --------- | ----------------------- |
| id          | UUID      | Identificador           |
| owner_id    | UUID      | Profesional propietario |
| name        | VARCHAR   | Nombre comercial        |
| description | TEXT      | Descripción             |
| address     | VARCHAR   | Dirección               |
| phone       | VARCHAR   | Teléfono                |
| active      | BOOLEAN   | Estado                  |
| created_at  | TIMESTAMP | Fecha de creación       |
| updated_at  | TIMESTAMP | Última modificación     |

### Service

Representa un servicio ofrecido por un establecimiento.

| Campo            | Tipo      | Descripción         |
| ---------------- | --------- | ------------------- |
| id               | UUID      | Identificador       |
| business_id      | UUID      | Establecimiento     |
| name             | VARCHAR   | Nombre              |
| description      | TEXT      | Descripción         |
| duration_minutes | INTEGER   | Duración            |
| price            | DECIMAL   | Precio              |
| active           | BOOLEAN   | Estado              |
| created_at       | TIMESTAMP | Fecha de creación   |
| updated_at       | TIMESTAMP | Última modificación |

### BusinessHour

Representa los horarios de atención.

| Campo       | Tipo    | Descripción      |
| ----------- | ------- | ---------------- |
| id          | UUID    | Identificador    |
| business_id | UUID    | Establecimiento  |
| day_of_week | INTEGER | Día de la semana |
| open_time   | TIME    | Hora de apertura |
| close_time  | TIME    | Hora de cierre   |
| active      | BOOLEAN | Estado           |

### Appointment

Representa un turno reservado.

| Campo            | Tipo      | Descripción                                 |
| ---------------- | --------- | ------------------------------------------- |
| id               | UUID      | Identificador                               |
| client_id        | UUID      | Cliente                                     |
| business_id      | UUID      | Establecimiento                             |
| service_id       | UUID      | Servicio                                    |
| start_at         | TIMESTAMP | Inicio del turno                            |
| end_at           | TIMESTAMP | Fin del turno                               |
| status           | ENUM      | PENDING / CONFIRMED / COMPLETED / CANCELLED |
| price_at_booking | DECIMAL   | Precio registrado al reservar               |
| created_at       | TIMESTAMP | Fecha de creación                           |
| updated_at       | TIMESTAMP | Última modificación                         |

### Review

Representa una reseña realizada por un cliente.

| Campo          | Tipo      | Descripción       |
| -------------- | --------- | ----------------- |
| id             | UUID      | Identificador     |
| appointment_id | UUID      | Turno asociado    |
| client_id      | UUID      | Cliente           |
| business_id    | UUID      | Establecimiento   |
| rating         | INTEGER   | Calificación      |
| comment        | TEXT      | Comentario        |
| created_at     | TIMESTAMP | Fecha de creación |

### Conversation

Entidad prevista para la funcionalidad de chat.

| Campo           | Tipo      | Descripción       |
| --------------- | --------- | ----------------- |
| id              | UUID      | Identificador     |
| client_id       | UUID      | Cliente           |
| professional_id | UUID      | Profesional       |
| appointment_id  | UUID      | Turno relacionado |
| created_at      | TIMESTAMP | Fecha de creación |

### Message

Entidad prevista para la funcionalidad de chat.

| Campo           | Tipo      | Descripción       |
| --------------- | --------- | ----------------- |
| id              | UUID      | Identificador     |
| conversation_id | UUID      | Conversación      |
| sender_id       | UUID      | Usuario que envía |
| content         | TEXT      | Contenido         |
| created_at      | TIMESTAMP | Fecha y hora      |

---

# 14. Relaciones principales

```text
User
 │
 ├───────────────┐
 │               │
 │               ▼
 │            Business
 │               │
 │       ┌───────┴────────┐
 │       │                │
 │       ▼                ▼
 │    Service        BusinessHour
 │       │
 │       │
 ▼       ▼
Appointment
 │
 ├──────────────► Review
 │
 └──────────────► Conversation
                         │
                         ▼
                      Message
```

Relaciones principales:

* Un **Professional** puede administrar un establecimiento.
* Un **Business** puede tener múltiples servicios.
* Un **Business** puede tener múltiples horarios.
* Un **Client** puede tener múltiples reservas.
* Un **Business** puede tener múltiples reservas.
* Un **Service** puede estar asociado a múltiples reservas.
* Una **Appointment** puede tener una reseña.
* Una **Conversation** puede contener múltiples mensajes.

---

# 15. Casos de uso principales

## CU-01 — Registrar usuario

**Actor:** Usuario no registrado.

**Precondición:** El email no se encuentra registrado.

**Flujo principal:**

1. El usuario accede a la pantalla de registro.
2. Ingresa sus datos.
3. Selecciona el tipo de cuenta correspondiente.
4. El sistema valida los datos.
5. El sistema verifica que el email sea único.
6. Se crea la cuenta.
7. El sistema informa que el registro fue exitoso.

**Flujos alternativos:**

* Email existente.
* Datos incompletos.
* Formato de email inválido.
* Contraseña que no cumple las condiciones establecidas.

---

## CU-02 — Iniciar sesión

**Actor:** Usuario registrado.

**Flujo principal:**

1. El usuario ingresa email y contraseña.
2. El backend valida las credenciales.
3. El sistema genera la sesión correspondiente.
4. El usuario accede a las funcionalidades permitidas según su rol.

---

## CU-03 — Registrar establecimiento

**Actor:** Profesional.

**Precondición:** El profesional está autenticado.

**Flujo principal:**

1. El profesional accede a la creación de establecimiento.
2. Completa nombre, descripción, dirección y datos de contacto.
3. El sistema valida los datos.
4. Se crea el establecimiento.
5. El establecimiento queda asociado al profesional.

---

## CU-04 — Crear servicio

**Actor:** Profesional.

**Precondición:** Existe un establecimiento perteneciente al profesional.

**Flujo principal:**

1. El profesional selecciona su establecimiento.
2. Selecciona "Nuevo servicio".
3. Ingresa nombre, descripción, precio y duración.
4. El sistema valida los datos.
5. Se crea el servicio.

---

## CU-05 — Configurar horarios

**Actor:** Profesional.

**Precondición:** Existe un establecimiento.

**Flujo principal:**

1. El profesional accede a la configuración de horarios.
2. Selecciona un día.
3. Define horario de apertura y cierre.
4. El sistema valida que los horarios sean válidos.
5. El sistema guarda la configuración.

---

## CU-06 — Buscar establecimiento

**Actor:** Cliente.

**Flujo principal:**

1. El cliente accede a la búsqueda.
2. El sistema muestra establecimientos disponibles.
3. El cliente puede consultar la información.
4. Selecciona un establecimiento.
5. El sistema muestra servicios y disponibilidad.

---

## CU-07 — Reservar turno

**Actor:** Cliente.

**Precondición:** El cliente está autenticado.

**Flujo principal:**

1. El cliente selecciona un establecimiento.
2. Selecciona un servicio.
3. Consulta los horarios disponibles.
4. Selecciona una fecha y horario.
5. El frontend envía la solicitud al backend.
6. El backend ejecuta las validaciones de negocio.
7. Se verifica la disponibilidad.
8. Se crea la reserva.
9. El sistema confirma el turno.

**Flujos alternativos:**

* El horario dejó de estar disponible.
* El horario está fuera de la jornada.
* El servicio fue desactivado.
* La fecha es inválida.
* El usuario no está autenticado.

---

## CU-08 — Gestionar reservas

**Actor:** Profesional.

**Flujo principal:**

1. El profesional accede a su agenda.
2. El sistema muestra las reservas.
3. El profesional selecciona una reserva.
4. Puede realizar las acciones permitidas.
5. El sistema valida la operación.
6. Se actualiza el estado de la reserva.

---

## CU-09 — Cancelar reserva

**Actor:** Cliente / Profesional.

**Flujo principal:**

1. El usuario selecciona una reserva.
2. Solicita cancelar.
3. El backend verifica que la cancelación esté permitida.
4. Se actualiza el estado.
5. El horario vuelve a estar disponible.

---

## CU-10 — Crear reseña

**Actor:** Cliente.

**Precondición:** El cliente realizó un turno que cumple las condiciones necesarias.

**Flujo principal:**

1. El cliente accede a su historial.
2. Selecciona un turno completado.
3. Ingresa una puntuación y comentario.
4. El backend valida que pueda realizar la reseña.
5. Se registra la reseña.

---

## CU-11 — Enviar mensaje

**Actor:** Cliente / Profesional.

**Precondición:** Existe una conversación autorizada.

**Flujo principal:**

1. El usuario accede a la conversación.
2. Escribe un mensaje.
3. El frontend envía el mensaje al backend.
4. El backend valida los permisos.
5. Se almacena el mensaje.
6. El destinatario recibe/visualiza el nuevo mensaje.

> Este caso de uso pertenece a la funcionalidad de ampliación.

---

# 16. Estructura del repositorio

Se utilizará un único repositorio de GitHub para centralizar todo el proyecto.

```text
turnos-barberias/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── dto/
│   │   ├── middleware/
│   │   ├── validations/
│   │   ├── config/
│   │   └── utils/
│   ├── tests/
│   ├── package.json
│   └── ...
│
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── README.md
│
├── docs/
│   ├── architecture/
│   ├── diagrams/
│   ├── entregas/
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

---

# 17. API Backend propuesta

La API REST será organizada por recursos.

Ejemplos iniciales:

```text
/api/auth
/api/users
/api/businesses
/api/services
/api/business-hours
/api/appointments
/api/reviews
/api/conversations
/api/messages
```

Ejemplos de operaciones:

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/businesses
POST   /api/businesses
GET    /api/businesses/:id
PUT    /api/businesses/:id

GET    /api/businesses/:id/services
POST   /api/businesses/:id/services

GET    /api/businesses/:id/availability

POST   /api/appointments
GET    /api/appointments
GET    /api/appointments/:id
PATCH  /api/appointments/:id/status
PATCH  /api/appointments/:id/cancel

POST   /api/appointments/:id/review
GET    /api/businesses/:id/reviews
```

Los endpoints definitivos se establecerán durante la etapa de arquitectura.

---

# 18. Validaciones y seguridad

El sistema contemplará validaciones en dos niveles.

## Frontend

Se validarán:

* Campos obligatorios.
* Formatos.
* Valores permitidos.
* Datos visibles para el usuario.

## Backend

El backend será responsable de validar nuevamente la información y ejecutar las reglas de negocio.

Esto permitirá evitar que un usuario pueda saltarse las restricciones enviando solicitudes directamente a la API.

Se contemplan inicialmente:

* Autenticación.
* Autorización por roles.
* Validación de datos.
* Manejo seguro de contraseñas.
* Variables de entorno.
* HTTPS en producción.
* Protección de recursos privados.
* Manejo centralizado de errores.

---

# 19. Despliegue

El proyecto deberá contar con componentes desplegados en servicios online.

Propuesta inicial:

```text
Frontend
Next.js
   │
   ▼
Vercel

Backend
Node.js + Express
   │
   ▼
Render / Railway

Database
PostgreSQL
   │
   ▼
Supabase
```

El objetivo es disponer de una versión funcional accesible mediante Internet antes de la entrega final.

---

# 20. Gestión del proyecto

El desarrollo se organizará utilizando:

* Git.
* GitHub.
* GitHub Projects.
* Issues.
* Pull Requests.
* Ramas de trabajo.
* Commits descriptivos.

Se intentará mantener una metodología de trabajo iterativa, dividiendo el proyecto en funcionalidades pequeñas y entregables verificables.

La revisión del tutor será utilizada como instancia de validación de alcance, arquitectura y avances.

---

# 21. Plan de trabajo

## Etapa 1 — Propuesta

**Hasta el 30/08/2026**

Objetivos:

* Definir problemática.
* Definir solución.
* Definir alcance.
* Definir tecnologías.
* Crear repositorio.
* Crear README inicial.
* Presentar propuesta al tutor.

---

## Etapa 2 — Arquitectura y módulos

**31/08/2026 — 27/09/2026**

Objetivos:

* Diseñar modelo de datos.
* Definir relaciones.
* Definir módulos.
* Diseñar arquitectura.
* Definir endpoints principales.
* Definir reglas de negocio.
* Crear estructura inicial del proyecto.
* Validar diseño con el tutor.
* Presentar segunda entrega.

---

## Etapa 3 — Desarrollo

**28/09/2026 — 14/11/2026**

El desarrollo se dividirá en incrementos.

### Incremento 1 — Base del sistema

* Configuración del repositorio.
* Backend.
* Frontend.
* Base de datos.
* Configuración de entornos.
* Conexión frontend/backend.
* Conexión backend/base de datos.

### Incremento 2 — Autenticación

* Registro.
* Login.
* Roles.
* Protección de rutas.
* Middleware de autenticación.

### Incremento 3 — Establecimientos

* CRUD de establecimientos.
* Perfil.
* Activación/desactivación.

### Incremento 4 — Servicios y horarios

* CRUD de servicios.
* Configuración de horarios.
* Validaciones.

### Incremento 5 — Reservas

* Disponibilidad.
* Creación de turnos.
* Cancelaciones.
* Estados.
* Prevención de doble reserva.

### Incremento 6 — Reseñas

* Registro.
* Validación.
* Visualización.

### Incremento 7 — Calidad y producción

* Testing.
* Manejo de errores.
* Seguridad.
* Optimización.
* Documentación.
* Despliegue.

### Incremento 8 — Funcionalidades de ampliación

Si el MVP se encuentra estable:

* Chat.
* Notificaciones.
* Favoritos.
* Estadísticas.

---

# 22. Entrega final

**Fecha máxima: 14/11/2026**

La entrega final contemplará:

* Código fuente completo.
* Repositorio GitHub.
* Base de datos.
* Scripts/migraciones.
* Documentación.
* Informe final.
* Aplicación desplegada.
* Video explicativo.
* Evidencia del funcionamiento.
* Preparación para defensa oral.

El video explicativo será preferentemente realizado en inglés.

---

# 23. Criterios de calidad

Durante el desarrollo se buscará aplicar:

* Separación de responsabilidades.
* Código limpio.
* Principios SOLID cuando sean aplicables.
* Validación de entradas.
* Manejo de errores.
* Control de acceso.
* Reutilización de componentes.
* Nombres descriptivos.
* Commits claros.
* Documentación.
* Pruebas de funcionalidades críticas.

Se priorizará especialmente la calidad de las operaciones relacionadas con reservas, ya que constituyen una parte central de la lógica del sistema.

---

# 24. Estado del proyecto

Actualmente el proyecto se encuentra en etapa de **propuesta y planificación**.

Las decisiones relacionadas con arquitectura, modelo de datos, tecnologías y alcance podrán modificarse durante las revisiones con el tutor.

Este README constituye una **propuesta inicial para la primera entrega** y será actualizado progresivamente durante el desarrollo del Trabajo Final Integrador.

---

## Licencia

Proyecto académico desarrollado en el marco del Trabajo Final Integrador de la Tecnicatura Universitaria en Programación de la UTN.