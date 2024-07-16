import { userRole } from 'src/type/api/auth';

export interface User {
  name: string;
  email: string;
  userRole: userRole | undefined;
  userId: number;
  token: string;
}
