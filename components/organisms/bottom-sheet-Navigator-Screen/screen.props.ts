import { Dispatch, ReactNode, SetStateAction } from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export type AddOptionProps = {
  changeSnapPoints: (points: string[]) => void;
};

export type CreateOptionItemProps = {
  label: string;
  icon: ReactNode;
  route: string;
};
