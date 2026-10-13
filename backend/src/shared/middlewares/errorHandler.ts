import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

/**
 * Formato único de error de la API:
 * { "error": { "message": string, "details"?: unknown } }
 */
export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    error: { message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` },
  });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: { message: 'Datos inválidos', details: err.flatten().fieldErrors },
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: { message: err.message, details: err.details },
    });
    return;
  }

  console.error(err);
  res.status(500).json({ error: { message: 'Error interno del servidor' } });
};
