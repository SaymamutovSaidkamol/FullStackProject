import { SetMetadata } from '@nestjs/common';
import { RoleUser } from 'src/enums/enums';

export const ROLE_KEY = 'roles';
const Roles = (...roles: RoleUser[]) => SetMetadata(ROLE_KEY, roles);
console.log(Roles);

export { Roles };
