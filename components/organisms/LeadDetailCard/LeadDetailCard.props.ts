import { ScreenOptionType } from '@organisms/bottom-sheet-Navigator-Screen/screen.props';

export interface LeadDetailCardProps {
  id?: number;
  title: string;
  phoneNumber: number;
  leadId: number;
  createdAt?: string;
  email: string;
  optionType?: ScreenOptionType;
}
export enum LeadStatusTypes {
  NEW = 1,
  CONTACTED = 2,
  QUALIFIED = 3,
  UNQUALIFIED = 4,
}
export enum LeadStageType {
  INITIAL = 1,
  PROPOSED = 2,
  NEGOTIATION = 3,
  CLOSEWON = 4,
  CLOSELOST = 5,
}

export interface ModalType {
  leadChange: boolean;
  closeWinLost: boolean;
  negotiation: boolean;
}
