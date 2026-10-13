import type { RequestHandler } from 'express';
import type { ZodTypeAny } from 'zod';

interface ValidationSchemas {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
}

/**
 * Valida body, params y/o query con zod. Si algo es inválido lanza un ZodError,
 * que el errorHandler responde como 400. El body validado reemplaza a req.body
 * (con los tipos y defaults de zod); params y query solo se validan.
 */
export const validate =
  (schemas: ValidationSchemas): RequestHandler =>
  (req, _res, next) => {
    if (schemas.body) req.body = schemas.body.parse(req.body);
    if (schemas.params) schemas.params.parse(req.params);
    if (schemas.query) schemas.query.parse(req.query);
    next();
  };
