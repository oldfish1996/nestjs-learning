import { SetMetadata } from '@nestjs/common';

export enum Role {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

export const Roles = (...args: Role[]) => SetMetadata('roles', args);
