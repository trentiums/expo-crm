export interface LeadInfoProps {
  data: LeadInfo;
}

export interface LeadInfo {
  phone?: number;
  email?: string;
  services: number[];
  stage: number;
  channel: number;
  assignedTo?: number;
}
