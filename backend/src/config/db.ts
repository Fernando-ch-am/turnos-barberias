import { Pool, type PoolClient } from 'pg';
import { env } from './env';

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.DB_SSL ? { rejectUnauthorized: false } : false,
});

/**
 * Ejecuta `fn` dentro de una transacción (BEGIN / COMMIT, con ROLLBACK ante error).
 * Pensado para operaciones que deben ser atómicas, como crear un turno
 * verificando antes que el horario siga libre.
 */
export async function withTransaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
