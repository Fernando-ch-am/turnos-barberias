// Utilidades de fecha para las pantallas. Trabajan con textos 'AAAA-MM-DD' para evitar
// los problemas de zona horaria de new Date('2026-11-05') (que lo interpreta como UTC).

const SEMANA = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const SEMANA_LARGA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function aFecha(texto: string): Date {
  const [anio, mes, dia] = texto.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

function aTexto(fecha: Date): string {
  const mm = String(fecha.getMonth() + 1).padStart(2, '0');
  const dd = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mm}-${dd}`;
}

// Hoy según el reloj del navegador (para el cliente en Argentina coincide con la hora local).
export function hoy(): string {
  return aTexto(new Date());
}

export function sumarDias(texto: string, dias: number): string {
  const fecha = aFecha(texto);
  fecha.setDate(fecha.getDate() + dias);
  return aTexto(fecha);
}

export function proximosDias(cantidad: number): string[] {
  const inicio = hoy();
  return Array.from({ length: cantidad }, (_, i) => sumarDias(inicio, i));
}

export function etiquetaDia(texto: string): { semana: string; numero: number } {
  const fecha = aFecha(texto);
  return { semana: SEMANA[fecha.getDay()], numero: fecha.getDate() };
}

// 'AAAA-MM-DD' -> 'jueves 5 nov'
export function fechaLarga(texto: string): string {
  const fecha = aFecha(texto);
  return `${SEMANA_LARGA[fecha.getDay()]} ${fecha.getDate()} ${MESES[fecha.getMonth()]}`;
}

export function formatearPrecio(precio: number | null): string {
  if (precio === null) return '';
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio);
}
