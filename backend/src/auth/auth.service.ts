import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './login.dto';

// Datos del administrador (por ahora fijos, sin base de datos)
const USUARIO_ADMIN = 'admin';
const PASSWORD_ADMIN = 'guapinol123';

// Token que recibe el administrador al iniciar sesión.
// Se exporta porque el guard lo usa para revisar las peticiones.
export const TOKEN_ADMIN = 'guapinol-admin-token';

@Injectable()
export class AuthService {
  login(datos: LoginDto) {
    // Si el usuario o la contraseña no coinciden, devolver error 401
    if (datos.usuario !== USUARIO_ADMIN || datos.password !== PASSWORD_ADMIN) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    return { token: TOKEN_ADMIN };
  }
}
