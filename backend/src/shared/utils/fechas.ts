/**
 * Utilidades de fechas y horas para turnos. Son funciones puras (no tocan la base),
 * así que se pueden probar solas.
 *
 * Convenciones del proyecto:
 *   - Fecha:  'AAAA-MM-DD'  (columna DATE)
 *   - Hora:   'HH:MM'       (columna TIME)
 *   - Día de la semana: ISO, 1 = lunes ... 7 = domingo  (columna horario.dia)
 */

// Zona horaria del negocio. Argentina no usa horario de verano (siempre UTC-3).
// El servidor en Render/Railway corre en UTC, por eso "ahora" se calcula acá y no con la hora del servidor.
export const ZONA_HORARIA = 'America/Argentina/Ushuaia';

/** 'HH:MM' -> minutos desde las 00:00. */
export function horaAMinutos(hora: string): number {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

/** Minutos desde las 00:00 -> 'HH:MM'. */
export function minutosAHora(minutos: number): string {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Suma minutos a una hora 'HH:MM'. Devuelve null si se pasa de las 24:00. */
export function sumarMinutos(hora: string, minutos: number): string | null {
  const total = horaAMinutos(hora) + minutos;
  return total >= 24 * 60 ? null : minutosAHora(total);
}

/** ¿La cadena es una fecha real? ('2026-02-31' no lo es). */
export function esFechaValida(fecha: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return false;
  const [y, m, d] = fecha.split('-').map(Number);
  const f = new Date(Date.UTC(y, m - 1, d));
  return f.getUTCFullYear() === y && f.getUTCMonth() === m - 1 && f.getUTCDate() === d;
}

/** Día de la semana ISO (1 = lunes ... 7 = domingo) de una fecha 'AAAA-MM-DD'. */
export function diaDeSemanaISO(fecha: string): number {
  const [y, m, d] = fecha.split('-').map(Number);
  const dia = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 = domingo ... 6 = sábado
  return dia === 0 ? 7 : dia;
}

/** Fecha y hora actuales en la zona horaria del negocio. */
export function ahoraLocal(ahora: Date = new Date()): { fecha: string; hora: string } {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: ZONA_HORARIA,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(ahora);
  const get = (tipo: string) => partes.find((p) => p.type === tipo)!.value;
  return { fecha: `${get('year')}-${get('month')}-${get('day')}`, hora: `${get('hour')}:${get('minute')}` };
}

/** Minutos que faltan desde `ahora` hasta el inicio del turno (negativo si ya empezó). */
export function minutosHastaTurno(fecha: string, hora: string, ahora: Date = new Date()): number {
  const actual = ahoraLocal(ahora);
  const aMinutosAbsolutos = (f: string, h: string) => {
    const [y, m, d] = f.split('-').map(Number);
    return Date.UTC(y, m - 1, d) / 60000 + horaAMinutos(h);
  };
  return aMinutosAbsolutos(fecha, hora) - aMinutosAbsolutos(actual.fecha, actual.hora);
}
