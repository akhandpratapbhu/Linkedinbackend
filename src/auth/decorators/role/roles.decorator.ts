import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/auth/models/role.enum';
export const roles_key='roles';
export const Roles = (...roles: Role[]) => SetMetadata(roles_key, roles);
