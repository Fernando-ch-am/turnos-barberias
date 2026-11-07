import type { Request, Response } from 'express';
import { AppError } from '../../../shared/errors/AppError';
import {
  agendaQuerySchema,
  cambiarEstadoSchema,
  disponibilidadQuerySchema,
  idParamSchema,
  misTurnosQuerySchema,
} from '../dto/turnos.dto';
import * as turnosService from '../service/turnos.service';

// El middleware requireAuth ya dejó al usuario en req.user; esto es solo por seguridad de tipos.
function usuarioActual(req: Request) {
  if (!req.user) throw AppError.unauthorized();
  return req.user;
}

// GET /api/turnos/disponibilidad?peluqueriaId=&servicioId=&fecha=
export async function disponibilidad(req: Request, res: Response) {
  const query = disponibilidadQuerySchema.parse(req.query);
  res.json(await turnosService.obtenerDisponibilidad(query));
}

// POST /api/turnos
export async function crear(req: Request, res: Response) {
  const turno = await turnosService.crearTurno(usuarioActual(req).id, req.body);
  res.status(201).json(turno);
}

// GET /api/turnos/mios?estado=
export async function misTurnos(req: Request, res: Response) {
  const { estado } = misTurnosQuerySchema.parse(req.query);
  res.json(await turnosService.listarMisTurnos(usuarioActual(req).id, estado));
}

// GET /api/turnos/agenda?fecha=&peluqueriaId=
export async function agenda(req: Request, res: Response) {
  const filtros = agendaQuerySchema.parse(req.query);
  res.json(await turnosService.listarAgenda(usuarioActual(req).id, filtros));
}

// PATCH /api/turnos/:id/cancelar
export async function cancelar(req: Request, res: Response) {
  const { id } = idParamSchema.parse(req.params);
  res.json(await turnosService.cancelarTurno(usuarioActual(req), id));
}

// PATCH /api/turnos/:id/estado
export async function cambiarEstado(req: Request, res: Response) {
  const { id } = idParamSchema.parse(req.params);
  const { estado } = cambiarEstadoSchema.parse(req.body);
  res.json(await turnosService.cambiarEstado(usuarioActual(req), id, estado));
}
