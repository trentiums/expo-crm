import { ReactNode } from 'react';
import { SwitchProps } from 'react-native';

export interface CustomSwitchProps extends SwitchProps {
  onToggle: (value: boolean) => void;
  toggle: boolean;
  circleIcon?: () => ReactNode;
}
