export enum StatusCode {
  Unauthorized = 401,
  Success = 200,
}

export interface ApiResponse {
  status: boolean;
  message?: string;
}
export enum AddLeadTabBar {
  BASICINFO = "Basic",
  COMPANYINFO = "Company",
  LEADDETAILS = "Lead",
}

export enum AddLeadNavigationType {
  BASIC = "Basic",
  COMPANY = "Company",
  LEAD = "Lead",
}
