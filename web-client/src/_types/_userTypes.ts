export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type UserType = {
  id: string;
  name: string;
  email: string;
  roles: Roles[];
};
