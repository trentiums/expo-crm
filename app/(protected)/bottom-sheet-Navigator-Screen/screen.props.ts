import { Dispatch, ReactNode, SetStateAction } from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export type AddOptionProps = {
  setSnapPoints: Dispatch<SetStateAction<string[]>>;
};

export type AddOptionItemProps = {
  label: string;
  icon: ReactNode;
  navigationScreen: string;
};
