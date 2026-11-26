'use client';

import { useEffect, useState } from 'react';

// CONTRATO DE SESIÓN (a coordinar con Integrante 2, que hace el login):
// al iniciar sesión se guardan en localStorage
//   "token"   -> el JWT que devuelve el backend
//   "usuario" -> JSON { id, nombre, rol }  con rol = 'cliente' | 'profesional'
// Si Integrante 2 usa otras claves, solo hay que cambiar las dos constantes de abajo.
const CLAVE_TOKEN = 'token';
const CLAVE_USUARIO = 'usuario';

export type Rol = 'cliente' | 'profesional';

export interface Usuario {
  id: number;
  nombre: string;
  rol: Rol;
}

export interface Sesion {
  token: string;
  usuario: Usuario;
}

export function leerSesion(): Sesion | null {
  try {
    const token = localStorage.getItem(CLAVE_TOKEN);
    const usuario = localStorage.getItem(CLAVE_USUARIO);
    if (!token || !usuario) return null;
    return { token, usuario: JSON.parse(usuario) as Usuario };
  } catch {
    return null;
  }
}

export function cerrarSesion(): void {
  localStorage.removeItem(CLAVE_TOKEN);
  localStorage.removeItem(CLAVE_USUARIO);
}

/**
 * Hook para las pantallas. Devuelve:
 *  - cargando: true hasta que se lee localStorage (en el servidor no existe, por eso se hace en useEffect)
 *  - sesion: la sesión o null si no hay nadie logueado
 */
export function useSesion(): { cargando: boolean; sesion: Sesion | null } {
  const [estado, setEstado] = useState<{ cargando: boolean; sesion: Sesion | null }>({
    cargando: true,
    sesion: null,
  });

  useEffect(() => {
    setEstado({ cargando: false, sesion: leerSesion() });
  }, []);

  return estado;
}
