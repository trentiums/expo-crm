import { ReactNode } from 'react';

export type MenuOptionsItemProps = {
  label: string;
  icon: ReactNode;
  handlePress: () => void;
  rightContainer?: () => JSX.Element;
};
