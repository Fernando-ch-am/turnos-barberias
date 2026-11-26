import 'dotenv/config';
import jwt from 'jsonwebtoken';

const [idTexto, rol, nombre = 'Usuario de prueba'] = process.argv.slice(2);
const id = Number(idTexto);

if (!Number.isInteger(id) || id <= 0 || (rol !== 'cliente' && rol !== 'profesional')) {
  console.error('Uso: npx tsx scripts/dev-token.ts <id> <cliente|profesional> [nombre]');
  process.exit(1);
}

const secreto = process.env.JWT_SECRET;
if (!secreto) {
  console.error('Falta JWT_SECRET en backend/.env');
  process.exit(1);
}

const token = jwt.sign({ id, rol }, secreto, { expiresIn: '8h' });

console.log('Pegá esto en la consola del navegador:\n');
console.log(`localStorage.setItem('token', '${token}');`);
console.log(`localStorage.setItem('usuario', '${JSON.stringify({ id, nombre, rol })}');`);