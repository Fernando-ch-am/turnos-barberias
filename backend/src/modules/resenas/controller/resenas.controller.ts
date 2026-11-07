import type { Request, Response } from 'express';
import { AppError } from '../../../shared/errors/AppError';
import { peluqueriaIdParamSchema } from '../dto/resenas.dto';
import * as resenasService from '../service/resenas.service';

// POST /api/resenas
export async function crear(req: Request, res: Response) {
  if (!req.user) throw AppError.unauthorized();

  const resena = await resenasService.crearResena(req.user.id, req.body);
  res.status(201).json(resena);
}

// GET /api/resenas/peluqueria/:peluqueriaId
export async function listarPorPeluqueria(req: Request, res: Response) {
  const { peluqueriaId } = peluqueriaIdParamSchema.parse(req.params);

  res.json(await resenasService.listarPorPeluqueria(peluqueriaId));
}
