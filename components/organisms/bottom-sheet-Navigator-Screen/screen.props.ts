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

export type ModifyLeadOptionProps = {
  changeSnapPoints: (points: string[]) => void;
  handleBottomSheetClose?: () => void;
  navigation: any;
  leadId?: number;
  optionType: ScreenOptionType;
};

export enum ScreenOptionType {
  DEFAULT = 'default',
  DASHBOARD = 'dashboard',
  LEAD = 'lead',
}

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

export type LeadStageListProps = {
  changeSnapPoints: (points: string[]) => void;
  handleBottomSheetClose?: () => void;
  leadId?: number;
  navigation: any;
};

export type LeadStageListItemProps = {
  name: string;
  id: number;
};

export type MediaDocumentType = { uri: string; name: string; mimeType: string };

export type LeadStageChangeProps = {
  changeSnapPoints: (points: string[]) => void;
  handleBottomSheetClose?: () => void;
  navigation: any;
  leadId?: number;
  route?: any;
};

export type LeadChannelListProps = {
  changeSnapPoints: (points: string[]) => void;
  handleBottomSheetClose?: () => void;
  leadId?: number;
};

export type LanguageListProps = {
  changeSnapPoints: (points: string[]) => void;
  handleBottomSheetClose?: () => void;
};
