import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/models/role.enum';
import { roles_key } from 'src/auth/decorators/role/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles || requiredRoles.length === 0) {
      // If no roles are required, access is granted
      return true;
    }
  
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const existingUser=user.existingUser

  
    // Check if the user object and roles property exist
    if (!user || !existingUser.role) {
      return false; // Deny access if user object or roles are missing
    }
  
    // Check if the user has any of the required roles
    const hasRequiredRole = requiredRoles.some(role => existingUser.role.includes(role));
    return hasRequiredRole;
  }
  
}
