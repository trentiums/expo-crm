import { Dispatch, ReactNode, SetStateAction } from 'react';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export type AddOptionProps = {
  setSnapPoints: Dispatch<SetStateAction<string[]>>;
};

export type CreateOptionItemProps = {
  label: string;
  icon: ReactNode;
  route: string;
};
