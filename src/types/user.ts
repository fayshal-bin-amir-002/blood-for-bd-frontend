export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IJwtUser {
  phone: string;
  id: string;
  role: UserRole;
  isDonor: boolean;
  iat?: number;
  exp?: number;
}

export type IUser = {
  id: string;
  phone: string;
  role: UserRole;
  isDonor: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
};
