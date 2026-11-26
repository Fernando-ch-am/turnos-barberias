/**
 * Le agrega `user` al Request de Express.
 *
 * CONTRATO CON EL MÓDULO AUTH (Integrante 2): el middleware de autenticación deja
 * en `req.user` el usuario que viene dentro del JWT: { id, rol }.
 */
export type Rol = 'cliente' | 'profesional';

export interface UsuarioAutenticado {
  id: number;
  rol: Rol;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: UsuarioAutenticado;
    }
  }
}
