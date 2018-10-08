import { UserRole } from 'user/models/user-role.enum';

export interface JWTPayload {
  email: string;
  role: UserRole;
  iat?: Date;
}
