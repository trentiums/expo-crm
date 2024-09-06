import { ReactNode } from 'react';

export interface BSCreateOptionItemProps {
  icon: ReactNode;
  label: string;
  handlePress: () => void;
}
