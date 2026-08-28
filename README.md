# Turnos Barberías

Plataforma web para la gestión y reserva de turnos en peluquerías y barberías.

**Estado del proyecto:** Propuesta inicial — 1.ª Entrega del Trabajo Final Integrador
**Modalidad:** Desarrollo web Full Stack
**Equipo:** Fernando Chacón, Elias Carulla, Nicolás González
**Fecha de esta entrega:** 30/08/2026
**Fecha estimada de entrega final:** 14/11/2026

---

## 1. Descripción general

Turnos Barberías es una plataforma web orientada a facilitar la gestión de turnos entre clientes y peluquerías/barberías.

El sistema permitirá que los clientes busquen establecimientos, consulten los servicios disponibles, visualicen horarios y reserven turnos online. Por otro lado, los propietarios o profesionales podrán registrar y administrar su establecimiento, configurar los servicios ofrecidos, establecer sus horarios de atención y gestionar las reservas recibidas.

El sistema contará con distintos roles de usuario y aplicará reglas de negocio para garantizar la consistencia de las reservas, evitando conflictos como la asignación de dos clientes al mismo horario.

## 2. Problemática

**Actores afectados:** dueños y profesionales de peluquerías/barberías de pequeña escala, y sus clientes.

**Contexto y origen del problema:** actualmente, muchos pequeños establecimientos gestionan sus turnos mediante canales informales (WhatsApp, llamadas telefónicas, redes sociales o agendas físicas). Esto no es una limitación tecnológica del rubro sino una ineficiencia tolerada: el proceso funciona, pero de forma manual, dispersa y propensa a errores.

**Impacto medible:**
- Tiempo perdido por el profesional coordinando turnos manualmente vía mensajes (varios intercambios por cada reserva).
- Turnos duplicados o solapados por falta de una agenda centralizada, con la consecuente pérdida de tiempo y mala experiencia del cliente.
- Ausencia de historial de reservas, lo que dificulta el seguimiento de clientes recurrentes y la toma de decisiones del negocio.
- Pérdida de potenciales clientes nuevos que no encuentran fácilmente información centralizada de horarios, servicios y precios.

**¿Admite una solución tecnológica?** Sí: se trata de un proceso de coordinación e información que puede centralizarse y automatizarse, reduciendo el costo de tiempo y el margen de error humano, sin requerir cambios de fondo en cómo opera el negocio.

**Validación del problema:**
- El problema ocurre actualmente en establecimientos que no usan software de gestión.
- Existen soluciones parciales (agendas de WhatsApp, planillas, redes sociales) que no resuelven la centralización ni evitan duplicados.
- Es técnicamente factible de resolver con el stack y los tiempos disponibles para la cursada (ver secciones 9 y 12).

## 3. Actores y necesidades

### Cliente
Necesita encontrar un establecimiento, conocer servicios/precios/disponibilidad y reservar sin fricción, además de poder gestionar y consultar sus propios turnos.

- Registrarse e iniciar sesión.
- Buscar peluquerías y barberías, y consultar su información.
- Consultar servicios, duración y precios.
- Visualizar disponibilidad y reservar un turno.
- Consultar sus reservas, su historial y cancelar según las reglas establecidas.
- Calificar y reseñar servicios ya realizados.

### Profesional
Necesita digitalizar su agenda, evitar conflictos de horarios y tener visibilidad de sus reservas y clientes.

- Registrarse como profesional y crear/administrar su establecimiento.
- Configurar los servicios ofrecidos y los horarios de atención.
- Consultar su agenda y gestionar las reservas recibidas.
- Actualizar el estado de los turnos.
- Consultar la información de sus clientes asociada a las reservas.

## 4. Propuesta de valor

Centralizar en una única plataforma web la relación entre clientes y peluquerías/barberías, reemplazando la coordinación manual por un sistema con reglas de negocio que garanticen consistencia (sin turnos duplicados), disponibilidad visible en tiempo real y un historial accesible tanto para el cliente como para el profesional.

## 5. Objetivos del proyecto

### Objetivo general
Diseñar y desarrollar una aplicación web Full Stack que permita gestionar de manera centralizada las agendas y reservas de peluquerías y barberías, alcanzando un MVP funcional y desplegado antes del 14/11/2026.

### Objetivos específicos (medibles)
1. Implementar autenticación y autorización basada en JWT, soportando los dos roles definidos (Cliente y Profesional), verificable mediante pruebas de acceso restringido por rol.
2. Desarrollar una API REST que cubra los 6 módulos del dominio (usuarios, establecimientos, servicios, horarios, turnos y reseñas), con un mínimo de 25 endpoints documentados.
3. Diseñar e implementar una base de datos relacional en PostgreSQL con al menos 6 entidades vinculadas mediante claves foráneas.
4. Garantizar mediante reglas de negocio que el 100% de las reservas creadas respeten la disponibilidad horaria configurada, sin permitir solapamientos de turnos para un mismo establecimiento.
5. Desarrollar interfaces responsivas, validadas en al menos 3 anchos de pantalla (mobile, tablet y escritorio).
6. Implementar operaciones CRUD completas (alta, baja, modificación y consulta) para establecimientos, servicios y turnos.
7. Aplicar validaciones tanto en frontend como en backend para el 100% de los formularios de la aplicación (registro, servicios, horarios y reservas).
8. Desplegar al menos un componente principal (frontend, backend o base de datos) en un servicio cloud accesible públicamente antes del 14/11/2026.
9. Cumplir con las tres instancias de entrega de la hoja de ruta de la asignatura (30/08, 27/09 y 14/11) en tiempo y forma.
10. Documentar en el repositorio la arquitectura, el modelo de datos y las instrucciones de instalación y uso del sistema.

## 6. Alcance

### 6.1. Alcance del MVP

El MVP contempla las funcionalidades necesarias para que el sistema sea funcional en un escenario real básico, detalladas a continuación por módulo.

**Gestión de usuarios**
- Registro de usuario con email y contraseña, seleccionando el rol (Cliente o Profesional).
- Inicio y cierre de sesión mediante autenticación JWT.
- Edición de datos básicos del perfil propio.
- Restricción de operaciones según el rol del usuario autenticado.

**Gestión de establecimientos**
- Registro de una peluquería/barbería por parte de un profesional, con nombre, descripción, dirección y teléfono.
- Edición de la información del establecimiento por su propietario.
- Activación/desactivación del establecimiento (un establecimiento inactivo no recibe nuevas reservas).
- Consulta pública de establecimientos disponibles, con su información básica.

**Gestión de servicios**
- Alta de un servicio asociado a un establecimiento, con nombre, descripción, precio y duración.
- Modificación de un servicio existente.
- Baja lógica de un servicio (un servicio inactivo no puede recibir nuevas reservas, pero se conserva en el historial).
- Consulta de los servicios de un establecimiento, con precio y duración visibles para el cliente.

**Gestión de horarios**
- Configuración de días y horarios de atención por establecimiento.
- Validación de que no existan horarios superpuestos para un mismo período.
- Cálculo de disponibilidad real combinando horario de atención y turnos ya reservados.

**Gestión de turnos**
- Consulta de disponibilidad de un establecimiento para un servicio y fecha determinados.
- Creación de una reserva, verificando que el horario esté disponible, dentro del horario de atención y en una fecha futura.
- Consulta de reservas propias (por el cliente) o de la agenda completa (por el profesional).
- Cancelación de una reserva según las reglas de negocio, liberando nuevamente el horario.
- Cambio de estado de una reserva (pendiente, confirmada, completada, cancelada) por parte del profesional.
- Conservación de un historial de turnos finalizados o cancelados.

**Reseñas**
- Calificación (puntaje) y comentario sobre un establecimiento, habilitados solo para clientes que hayan completado un turno allí.
- Restricción de una reseña por turno completado.
- Consulta pública de las reseñas de un establecimiento.

### 6.2. Funcionalidades de ampliación

Se implementarán únicamente si el avance del proyecto lo permite, sin comprometer las entregas principales:

- **Chat cliente-profesional:** mensajería asociada a una reserva, para consultas puntuales entre ambas partes.
- **Notificaciones:** avisos ante creación, confirmación o cancelación de un turno.
- **Favoritos:** posibilidad de que un cliente marque establecimientos preferidos para acceso rápido.
- **Estadísticas para profesionales:** métricas básicas de reservas y servicios más solicitados.
- **Filtros y búsqueda avanzada:** búsqueda de establecimientos por zona, servicio o disponibilidad horaria.

### 6.3. Fuera de alcance

Explícitamente no forman parte de este proyecto, ni del MVP ni de las ampliaciones: pagos online, aplicaciones móviles nativas, panel de administración multi-negocio (franquicias) y soporte multi-idioma.

## 7. Análisis de competencia y diferenciación

**Competidores directos:** plataformas de reserva de turnos ya existentes en el mercado (por ejemplo Fresha, Booksy o Treatwell), orientadas a peluquerías, barberías y centros de estética, que ofrecen agenda online, gestión de servicios y, en algunos casos, cobro anticipado.

**Competidores indirectos:** los canales informales actualmente usados por los establecimientos locales — WhatsApp, Instagram/redes sociales y agendas físicas — que compiten por resolver la misma necesidad sin ser soluciones de software dedicadas.

**Variables de comparación:**

| Variable | Competidores directos | Solución propuesta |
|---|---|---|
| Precio | Suscripciones mensuales, muchas veces en USD | Pensada para pequeños comercios locales, sin costo de licencia durante el desarrollo académico |
| Funcionalidades | Muy completas, a veces excesivas para un comercio chico | Foco en lo esencial: agenda, servicios y reservas sin fricción |
| Experiencia de uso | Orientada a mercados con alto volumen de usuarios | Adaptada a establecimientos pequeños de una ciudad como Ushuaia |
| Tecnología/soporte | Plataformas cerradas, sin posibilidad de adaptación | Código propio, adaptable a necesidades puntuales del negocio |
| Escalabilidad | Alta, pensada para cadenas | Suficiente para el escenario real de uno o pocos establecimientos por instancia |

**Diferenciadores:** menor curva de aprendizaje para comercios chicos, sin costos de suscripción en esta etapa, y posibilidad de ajustar el sistema a necesidades locales específicas que una plataforma genérica no contempla.

**Riesgo competitivo y mitigación:** si un competidor directo lanzara una versión gratuita, la diferenciación pasaría por la simplicidad de uso y la posibilidad de adaptación a pedido, algo que las plataformas genéricas no ofrecen fácilmente.

## 8. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | Next.js + TypeScript |
| Backend | Node.js + Express.js |
| API | REST |
| Base de datos | PostgreSQL |
| Servicio de base de datos | Supabase |
| Autenticación | JWT |
| Control de versiones | Git / GitHub |
| Gestión de proyecto | GitHub Projects |
| Hosting Frontend | Vercel |
| Hosting Backend | Render / Railway |
| IDE | Visual Studio Code |

### Justificación

- **Frontend (Next.js + TypeScript):** el equipo ya tiene experiencia con React, y Next.js aporta las herramientas necesarias (ruteo, renderizado, integración con TypeScript) para construir una aplicación web moderna sin sumar curva de aprendizaje significativa.
- **Backend (Node.js + Express):** permite unificar el lenguaje (JavaScript/TypeScript) entre frontend y backend, y su modelo de I/O no bloqueante es adecuado para un sistema con múltiples consultas de disponibilidad concurrentes. Además, permite trabajar explícitamente los conceptos vistos en la cursada: rutas, controllers, services, repositories, DTOs y middleware.
- **Base de datos (PostgreSQL):** el dominio es fuertemente relacional (usuarios, establecimientos, servicios, horarios y turnos vinculados entre sí, con necesidad de integridad transaccional para evitar reservas duplicadas), por lo que una base relacional es la opción más adecuada frente a una no relacional.
- **Despliegue (Vercel / Render-Railway / Supabase):** son servicios PaaS gratuitos en sus planes iniciales, lo que reduce la complejidad operativa y se ajusta a la escala real del proyecto (un número acotado de establecimientos y usuarios durante la cursada), evitando sobreingeniería.

### Arquitectura general

```
┌─────────────────────────────┐
│          CLIENTE            │
│       Navegador Web         │
└──────────────┬──────────────┘
               │ HTTPS / REST
               ▼
┌─────────────────────────────┐
│          FRONTEND           │
│      Next.js + TypeScript   │
└──────────────┬──────────────┘
               │ HTTP
               ▼
┌─────────────────────────────┐
│           BACKEND            │
│      Node.js + Express       │
│  Routes → Controllers →      │
│  Services → Repositories     │
└──────────────┬──────────────┘
               │ SQL
               ▼
┌─────────────────────────────┐
│    PostgreSQL (Supabase)     │
└─────────────────────────────┘
```

> El modelo de datos detallado, el listado definitivo de módulos y la estructura del repositorio se presentarán en la **2.ª Entrega (Diseño y Módulos)**, conforme a la hoja de ruta de la asignatura.

## 9. Reglas de negocio principales

- Un horario no puede ser reservado por dos clientes simultáneamente.
- Una reserva debe estar asociada a un cliente autenticado, un establecimiento y un servicio activo.
- No se permiten reservas en fechas pasadas ni fuera del horario de atención configurado.
- Una reserva cancelada libera nuevamente el horario.
- Un establecimiento o servicio inactivo no puede recibir nuevas reservas.
- Un cliente solo puede reseñar un establecimiento si completó un turno allí, y como máximo una vez por turno.
- El email de cada usuario debe ser único, y cada usuario solo puede operar sobre sus propios recursos.

## 10. Plan de trabajo

### Entregables por etapa

| Etapa | Período | Entregable |
|---|---|---|
| 1 — Propuesta | hasta 30/08/2026 | Este documento: problemática, alcance, stack y repositorio declarado |
| 2 — Diseño y módulos | 31/08 — 27/09/2026 | Modelo de base de datos, listado definitivo de módulos y estructura del repositorio |
| 3 — Desarrollo | 28/09 — 14/11/2026 | Incrementos funcionales (auth, establecimientos, servicios/horarios, turnos, reseñas), testing y despliegue |
| 4 — Entrega final | 14/11/2026 | Repositorio completo, aplicación desplegada, informe y video explicativo |
| 5 — Defensa oral | Mesa de examen | Presentación y defensa ante el comité |

### Estimación de tiempos (etapa de desarrollo)

División orientativa en incrementos semanales: base del sistema y configuración de entornos (semanas 1-2), autenticación y roles (semana 3), establecimientos (semanas 4-5), servicios y horarios (semanas 6-7), turnos y prevención de solapamientos (semanas 8-9), reseñas (semana 10), testing/seguridad/despliegue (semanas 11-12) y, si el tiempo lo permite, funcionalidades de ampliación (semanas 13+).

### Riesgos iniciales y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Subestimar la complejidad de la lógica de disponibilidad/solapamiento de turnos | Priorizar este módulo temprano en el cronograma y cubrirlo con pruebas específicas |
| Dependencia de servicios cloud gratuitos con límites de uso | Elegir proveedores con planes free conocidos (Vercel, Render/Railway, Supabase) y monitorear límites |
| Coordinación entre los 3 integrantes del equipo | Uso de GitHub Projects, ramas de trabajo y reuniones periódicas de seguimiento |
| Alcance sobredimensionado para los plazos académicos | Separación explícita entre MVP y funcionalidades de ampliación (sección 6) |

### Criterios de éxito

El MVP se considerará cumplido cuando: un profesional pueda registrar su establecimiento, servicios y horarios; un cliente pueda registrarse, buscar un establecimiento y reservar un turno sin posibilidad de solapamiento; el sistema mantenga un historial consultable de reservas; y al menos un componente esté desplegado y accesible públicamente.

## 11. Viabilidad del proyecto

**Viabilidad técnica:** el stack elegido (Next.js, Node/Express, PostgreSQL) es conocido por el equipo, lo que reduce el riesgo de retrasos por curva de aprendizaje. La dependencia principal es Supabase como proveedor de PostgreSQL; en caso de limitaciones, es reemplazable por otro proveedor de PostgreSQL sin cambiar el modelo de datos.

**Viabilidad operativa:** el sistema está pensado para un escenario real de adopción por parte de un establecimiento chico (uno o pocos profesionales), sin requerir infraestructura propia ni conocimientos técnicos para su uso diario, lo que facilita su mantenimiento y adopción dentro del contexto académico.

**Viabilidad temporal:** el alcance del MVP (sección 6.1) fue definido explícitamente para ser alcanzable entre el 28/09 y el 14/11/2026, dejando las funcionalidades de ampliación como objetivo secundario condicionado al avance real del desarrollo.

## 12. Repositorio GitHub

Todo el proyecto se centraliza en un único repositorio de GitHub, que incluirá el código fuente (frontend/backend), los scripts de base de datos y la documentación e informes de cada entrega.

Repositorio: https://github.com/Fernando-ch-am/turnos-barberias.git

## 13. Gestión del proyecto

El desarrollo se organizará utilizando Git, GitHub y GitHub Projects, con ramas de trabajo, issues, pull requests y commits descriptivos, siguiendo una metodología iterativa dividida en incrementos pequeños y verificables. La revisión del tutor se utilizará como instancia de validación de alcance, arquitectura y avances.

## 14. Estado del proyecto

Actualmente el proyecto se encuentra en etapa de propuesta y planificación (1.ª Entrega). Las decisiones de arquitectura, modelo de datos y alcance definitivo podrán ajustarse durante la 2.ª Entrega, en conjunto con el tutor.

## Licencia

Proyecto académico desarrollado en el marco del Trabajo Final Integrador de la Tecnicatura Universitaria en Programación de la UTN.