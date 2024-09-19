import { UserRole } from './auth';

export interface UserListParams {
  page?: number;
  search?: string;
  user_id?: number;
}
export interface User {
  id: number;
  name: string;
  email: string;
  user_role: UserRole;
  created_at: string;
}
export interface UserListResponse {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: User[];
  };
}
export interface SaveUserParams {
  name: string;
  email: string;
  password: string;
}
export interface DeleteUserParams {
  user_id: number | string;
}
export interface UpdateUserParams {
  user_id: number;
  name: string;
  email: string;
  password: string;
}
export interface UserStateType {
  id: number;
  name: string;
  email: string;
  userRole: number;
  createdAt: string;
}
export interface UserDetailsParams {
  user_id: number | any;
}

export interface UserDetailsResponse {
  status: boolean;
  data: User;
  message: string;
}
export interface AssignUserListResponse {
  status: boolean;
  message: string;
  data: AssignUser[];
}

export interface AssignUser {
  id: number;
  name: string;
}
export interface AssignUserState {
  id: number;
  title: string;
}

export interface ChangePasswordParams {
  old_password: string;
  password: string;
  password_confirmation: string;
}
export interface AssignLeadToUserParams {
  lead_id: number;
  assign_to_user_id: number;
}
