import type { Metadata } from 'next';
import { Cabecera } from '@/components/layout/Cabecera';
import './globals.css';

export const metadata: Metadata = {
  title: 'Turnos Barberías',
  description: 'Reservá turnos en peluquerías y barberías.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* En el App Router el <head> del layout es el lugar correcto: la regla de ESLint es de pages/ */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Cabecera />
        {children}
      </body>
    </html>
  );
}