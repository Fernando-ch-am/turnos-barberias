import { Router } from 'express';
import { pool } from '../config/db';
import { resenasRouter } from '../modules/resenas/routes/resenas.routes';
import { turnosRouter } from '../modules/turnos/routes/turnos.routes';

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
apiRouter.use('/turnos', turnosRouter);
apiRouter.use('/resenas', resenasRouter);
