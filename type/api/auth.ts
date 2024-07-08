export enum userRole {
  'Admin' = 1,
  'CompanyAdmin' = 2,
  'CompanyStaff' = 3,
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginDataResponse {
  name: string;
  email: string;
  user_role: userRole;
  id: number;
  token: string;
}

export interface LoginResponse {
  status: boolean;
  message?: string;
  data: LoginDataResponse;
}
