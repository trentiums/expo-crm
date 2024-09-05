import { ReactNode } from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export type AddOptionProps = {
  setSnapPoints: (snapPoints: Array<number | string>) => void;
};

export type AddOptionItemProps = {
  label: string;
  icon: ReactNode;
  navigationScreen: string;
};
