import {  ReactNode } from 'react';

export type CreateOptionProps = {
  changeSnapPoints: (points: string[]) => void;
};

export type CreateOptionItemProps = {
  label: string;
  icon: ReactNode;
  route: string;
};
