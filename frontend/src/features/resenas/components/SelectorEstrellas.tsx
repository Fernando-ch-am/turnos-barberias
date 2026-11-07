'use client';

// Estrellas clickeables para elegir la calificación de 1 a 5.
interface Props {
  valor: number;
  onChange: (valor: number) => void;
}

export function SelectorEstrellas({ valor, onChange }: Props) {
  return (
    <div role="radiogroup" aria-label="Calificación">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={valor === n}
          aria-label={`${n} estrella${n > 1 ? 's' : ''}`}
          className={n <= valor ? 'estrella-boton estrella-boton--llena' : 'estrella-boton'}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
