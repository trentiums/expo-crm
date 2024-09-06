import { UserRole } from '@type/api/auth';

export interface User {
  name: string;
  email: string;
  userRole: UserRole | undefined;
  userId: number;
  token: string;
}
