export enum UserRole {
  'Admin' = 1,
  'CompanyAdmin' = 2,
  'CompanyStaff' = 3,
}

export interface LoginParams {
  email: string;
  password: string;
}
export interface ForgotPasswordParams {
  email: string;
}

export interface LoginDataResponse {
  name: string;
  email: string;
  user_role: UserRole;
  id: number;
  token: string;
}

export interface LoginResponse {
  status: boolean;
  message?: string;
  data: LoginDataResponse;
}
export interface BasicInfoFormValuesType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
}
export interface CompanyInformationFromValueTypes {
  companyName: string;
  companySize?: number;
  webSite: string;
}
export interface LeadInformationFromValuesType {
  source?: number;
  product: string;
  budget?: number;
  timeFrame?: string;
  comments: string;
  dealAmount: number;
  winCloseReason: string;
  dealCloseDate: Date;
  selectedChannel: number;
  selectedLead: number;
  selectedStage: number;
  selectedServices: number[];
  assignTo?: number;
}
