import { Router } from 'express';
import { pool } from '../config/db';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Verifica la conexión con PostgreSQL (Supabase).
apiRouter.get('/health/db', async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ status: 'ok' });
});

// Cada módulo monta su router acá. Ejemplo:
//   import { serviciosRouter } from '../modules/servicios/routes/servicios.routes';
//   apiRouter.use('/servicios', serviciosRouter);
