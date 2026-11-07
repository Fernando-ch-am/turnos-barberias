import { Router } from 'express';
import { requireAuth, requireRole } from '../../../shared/middlewares/auth';
import { validate } from '../../../shared/middlewares/validate';
import { cambiarEstadoSchema, crearTurnoSchema } from '../dto/turnos.dto';
import * as controller from '../controller/turnos.controller';

export const turnosRouter = Router();

// Pública: cualquiera puede ver qué horarios hay libres.
turnosRouter.get('/disponibilidad', controller.disponibilidad);

// Cliente
turnosRouter.post('/', requireAuth, requireRole('cliente'), validate({ body: crearTurnoSchema }), controller.crear);
turnosRouter.get('/mios', requireAuth, requireRole('cliente'), controller.misTurnos);

// Profesional
turnosRouter.get('/agenda', requireAuth, requireRole('profesional'), controller.agenda);
turnosRouter.patch(
  '/:id/estado',
  requireAuth,
  requireRole('profesional'),
  validate({ body: cambiarEstadoSchema }),
  controller.cambiarEstado,
);

// Cliente (dueño del turno) o profesional (dueño del local): el service verifica a cuál corresponde.
turnosRouter.patch('/:id/cancelar', requireAuth, controller.cancelar);
