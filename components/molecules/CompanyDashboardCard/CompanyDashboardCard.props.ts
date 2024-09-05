export interface CompanyDashboardCardProps {
  name: string;
  leads: Leads[];
  leadsCount: number;
}
export interface Leads {
  title: string;
  value: number;
  bgColor: string;
  color: string;
}
