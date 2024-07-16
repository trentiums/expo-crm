import { ReactNode } from 'react';

export interface DashboardLeadsCardProps {
  icon?: ReactNode;
  title: string;
  leads: number;
  scoreColor: string;
}
