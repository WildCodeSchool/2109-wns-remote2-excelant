import { registerEnumType } from 'type-graphql';

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const registerRoles = () =>
  registerEnumType(Roles, {
    name: 'Roles',
    description: 'User roles',
  });
