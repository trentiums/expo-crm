import { ReactNode } from 'react';

export type CreateOptionProps = {
  changeSnapPoints: (points: string[]) => void;
  handleBottomSheetClose?: () => void;
};

export type CreateOptionItemProps = {
  label: string;
  icon: ReactNode;
  route: string;
};
export interface LeadSortFilterItemProp {
  id: number;
  title: string;
  filters: {
    sort_order: number;
    order_by: number;
  };
}

export type ModifyLeadOptionProps = {
  changeSnapPoints: (points: string[]) => void;
  handleBottomSheetClose?: () => void;
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
  handleBottomSheetClose?: () => void;
  leadId?: number;
};

export type AssignedUsersListItemProps = {
  title: string;
  id: number;
};

export type LeadStatusListProps = {
  handleBottomSheetClose?: () => void;
  leadId?: number;
  navigation: any;
};

export type LeadStatusListItemProps = {
  name: string;
  id: number;
};

export type LeadStatusChangeProps = {
  changeSnapPoints: (points: string[]) => void;
  handleBottomSheetClose?: () => void;
  navigation: any;
  leadId?: number;
  route?: any;
};

export enum FunctionType {
  DELETE = 'delete',
}

export type MediaDocumentType = { uri: string; name: string; mimeType: string };
