import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TOKEN_ADMIN } from './auth.service';

// Un guard decide si una petición puede pasar o no.
// Este solo deja pasar si la petición trae el token del administrador:
//   Authorization: Bearer guapinol-admin-token
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const peticion = context.switchToHttp().getRequest();
    const authorization = peticion.headers['authorization'];

    if (authorization === 'Bearer ' + TOKEN_ADMIN) {
      return true;
    }

    // Si no trae el token, devolver error 401
    throw new UnauthorizedException('Debe iniciar sesión como administrador');
  }
}
