import { ReactNode } from 'react';

export interface CreateOptionItemProps {
  icon: ReactNode;
  label: string;
  handlePress: () => void;
}
