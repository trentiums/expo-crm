import { ReactNode } from 'react';

export type CreateOptionProps = {
  changeSnapPoints: (points: string[]) => void;
  changeRoute?: () => void;
};

export type CreateOptionItemProps = {
  label: string;
  icon: ReactNode;
  route: string;
};

export type ModifyLeadOptionProps = {
  changeSnapPoints: (points: string[]) => void;
  changeRoute?: () => void;
  navigation: any;
  leadId?: number;
};

export type ModifyLeadOptionItemProps = {
  label: string;
  icon: ReactNode;
  route?: string;
  bottomSheetRoute?: string;
  functionType?: FunctionType;
};

export type AssignedUsersListProps = {
  changeRoute?: () => void;
  leadId?: number;
};

export type AssignedUsersListItemProps = {
  title: string;
  id: number;
};

export type LeadStatusListProps = {
  changeRoute?: () => void;
  leadId?: number;
  navigation: any;
};

export type LeadStatusListItemProps = {
  name: string;
  id: number;
};

export type LeadStatusChangeProps = {
  changeSnapPoints: (points: string[]) => void;
  changeRoute?: () => void;
  navigation: any;
  leadId?: number;
  route?: any;
};

export enum FunctionType {
  DELETE = 'delete',
}
