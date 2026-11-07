import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import type { Rol } from '../../types/express';
import { AppError } from '../errors/AppError';

/**
 * TEMPORAL — Este archivo lo reemplaza o amplía el módulo `auth` (Integrante 2).
 * Está acá para que turnos y reseñas se puedan usar y probar sin esperar el login.
 *
 * Contrato que tiene que respetar el login:
 *   - El JWT se firma con JWT_SECRET y lleva en el payload { id: number, rol: 'cliente' | 'profesional' }.
 *   - El cliente lo manda en el header:  Authorization: Bearer <token>
 */
export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw AppError.unauthorized('Falta el token de acceso');

  try {
    const payload = jwt.verify(header.slice('Bearer '.length), env.JWT_SECRET) as jwt.JwtPayload;
    const id = Number(payload.id);
    const rol = payload.rol;
    if (!Number.isInteger(id) || (rol !== 'cliente' && rol !== 'profesional')) {
      throw new Error('payload inválido');
    }
    req.user = { id, rol };
    next();
  } catch {
    throw AppError.unauthorized('Token inválido o vencido');
  }
};

/** Deja pasar solo a los usuarios con alguno de los roles indicados (usar después de requireAuth). */
export const requireRole =
  (...roles: Rol[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) throw AppError.unauthorized();
    if (!roles.includes(req.user.rol)) {
      throw AppError.forbidden('Tu rol no puede realizar esta acción');
    }
    next();
  };
