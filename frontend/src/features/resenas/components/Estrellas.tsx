// Estrellas de solo lectura: ★ llenas y ☆ vacías hasta 5.
export function Estrellas({ valor, grande = false }: { valor: number; grande?: boolean }) {
  const llenas = Math.round(valor);
  return (
    <span className={grande ? 'estrellas estrellas--grande' : 'estrellas'} aria-label={`${valor} de 5`}>
      {'★'.repeat(llenas)}
      {'☆'.repeat(5 - llenas)}
    </span>
  );
}
