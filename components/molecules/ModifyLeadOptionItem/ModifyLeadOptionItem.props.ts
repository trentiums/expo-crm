import { ReactNode } from 'react';

export interface ModifyLeadOptionItemProps {
  icon: ReactNode;
  label: string;
  handlePress: () => void;
  canNavigate?: boolean;
}
