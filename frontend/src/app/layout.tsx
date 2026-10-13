import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Turnos Barberías',
  description: 'Reservá turnos en peluquerías y barberías.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
