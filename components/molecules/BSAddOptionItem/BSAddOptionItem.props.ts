import { ReactNode } from 'react';

export interface BSAddOptionItemProps {
  icon: ReactNode;
  label: string;
  handlePress: () => void;
}
