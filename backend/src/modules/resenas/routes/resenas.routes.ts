import { Router } from 'express';
import { requireAuth, requireRole } from '../../../shared/middlewares/auth';
import { validate } from '../../../shared/middlewares/validate';
import { crearResenaSchema } from '../dto/resenas.dto';
import * as controller from '../controller/resenas.controller';

export const resenasRouter = Router();

// Pública: las reseñas de una peluquería las puede ver cualquiera.
resenasRouter.get('/peluqueria/:peluqueriaId', controller.listarPorPeluqueria);

// Solo un cliente logueado puede reseñar (y solo un turno suyo ya completado: lo controla el service).
resenasRouter.post('/', requireAuth, requireRole('cliente'), validate({ body: crearResenaSchema }), controller.crear);
