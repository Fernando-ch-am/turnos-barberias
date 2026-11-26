import { AppError } from '../../../shared/errors/AppError';
import type { CrearResenaDTO, ResenaResponseDTO, ResenasPeluqueriaDTO } from '../dto/resenas.dto';
import * as resenasRepo from '../repository/resenas.repository';
import * as turnosRepo from '../../turnos/repository/turnos.repository';

export async function crearResena(usuarioId: number, data: CrearResenaDTO): Promise<ResenaResponseDTO> {
  const turno = await turnosRepo.buscarPorId(data.turnoId);

  if (!turno) throw AppError.notFound('El turno no existe');
  if (turno.usuario_id !== usuarioId) throw AppError.forbidden('Solo podés reseñar tus propios turnos');
  if (turno.estado !== 'completado') throw AppError.conflict('Solo se pueden reseñar turnos completados');

  const existente = await resenasRepo.buscarPorTurnoId(data.turnoId);
  if (existente) throw AppError.conflict('Este turno ya tiene una reseña');

  try {
    return await resenasRepo.crear(data);
  } catch (error) {
    // 23505 = violación de UNIQUE de Postgres. Pasa si dos pedidos llegan a la vez y la tabla
    // tiene UNIQUE (turno_id) (ver docs/migraciones/001_ajustes_mvp.sql).
    if ((error as { code?: string }).code === '23505') {
      throw AppError.conflict('Este turno ya tiene una reseña');
    }
    throw error;
  }
}

export async function listarPorPeluqueria(peluqueriaId: number): Promise<ResenasPeluqueriaDTO> {
  const [resumen, resenas] = await Promise.all([
    resenasRepo.resumenPorPeluqueria(peluqueriaId),
    resenasRepo.listarPorPeluqueria(peluqueriaId),
  ]);
  return { promedio: resumen.promedio, total: resumen.total, resenas };
}
