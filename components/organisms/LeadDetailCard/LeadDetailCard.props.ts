import { GeneralList } from "@type/redux/slices/general";
import { RefObject } from "react";
import { Swipeable } from "react-native-gesture-handler";

export interface LeadDetailCardProps {
  id?: number;
  title: string;
  whatsAppNumber: number;
  phoneNumber: number;
  channelList: GeneralList[];
  leadList: GeneralList[];
  StageList: GeneralList[];
  onDelete: () => void;
  onEdit: () => void;
  LeadDetails: string[];
  mailID: string;
  dateTime: string;
  closeSwipeAble: () => void;
  setSwipeAbleRef: (ref: RefObject<Swipeable>) => void;
  selectedCard: number | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>;
  cardIndex: number;
  setModal: (value: boolean) => void;
  modal: boolean;
  setModalType: any;
  modalType: ModalType;
  leadStatusId?: number;
  leadChannelId?: number;
  leadConversionId?: number;
  leadCardId: number;
  currentId: number;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  handleGetLeadsData: () => void;
  setLeadId: (value: number) => void;
  leadId: number;
  assignTo?: number;
}
export enum LeadStatusTypes {
  CONTACTED = 2,
  QUALIFIED = 3,
  UNQUALIFIED = 4,
}
export enum LeadStageType {
  NEGOTIATION = 3,
  CLOSEWON = 4,
  CLOSELOST = 5,
}

export interface ModalType {
  leadChange: boolean;
  closeWinLost: boolean;
  negotiation: boolean;
}
